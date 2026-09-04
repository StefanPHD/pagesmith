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
· Der Transport — Scheibe 4 des Schnitts der Phase 11.2
· Die Klammer um die Erneuerung — Schritt 1b-1 der Scheibe 1b des Schnitts der Phase 11.2
· Die Rettung am Beacon — Scheibe 1b-2a des Schritts 1b-2 der Scheibe 1b
· Die Ampel an der Ziel-Karte — Scheibe 11.2b
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

**EINE ZWEITE SPERRE, ANGETRETEN AM 2026-09-02: AUF DEM GOOGLE-ADS-KONTO EXISTIERT KEIN
ECHTER ANZEIGENKLICK.**

**SIE STEHT HIER UND NICHT IM ABSCHNITT "Was den Zuschnitt bindet" — aus demselben Grund wie
die Sperre darüber**, und die Verortungs-Zeile dort gilt für beide: Wer eine Sperre dieser
Phase sucht, sucht sie in "### (1) Der Gegenstand".

**DER ZUSTAND — OWNER-ANGABE 2026-09-02:** Das verwendete Google-Ads-Konto ist ein reines
**Entwickler-/Testkonto**. Es laufen **keine aktiven kostenpflichtigen Kampagnen**, und es hat
folglich **nie einen echten Anzeigenklick gegeben**. **KEINE Messung an einer
Google-Oberfläche** — weder an der Kampagnen-Ansicht noch an einem Bericht.

**SIE DECKT SICH MIT DEM GEMESSENEN FEHLERGRUND, IST ABER NICHT DURCH IHN BEWIESEN — UND
BEIDES GEHÖRT HIN.** Messung E hat für die Anfrage vom 2026-09-01
`PROCESSING_ERROR_REASON_INVALID_GCLID` zurückbekommen (docs/ziel-befunde.md, Google-Abschnitt,
Teil (cb)). Das ist mit dieser Sperre **verträglich**, aber es belegt sie nicht: Der Fehlergrund
sagt, dass **die gesendete Kennung** ungültig war — er sagt nichts darüber, ob auf dem Konto je
ein Klick stattgefunden hat. **Zwei Angaben, die zueinander passen, sind nicht dieselbe
Angabe.**

**DIE FOLGE, UND SIE IST DER GRUND, WARUM DAS EINE SPERRE IST UND KEIN HINWEIS:** Ein OFFLINE
CONVERSION IMPORT ruht **vollständig** auf der Klick-Kennung. **Ohne einen echten Klick gibt es
keine gültige Kennung, und ohne gültige Kennung kann strukturell nichts verbucht werden** —
unabhängig davon, wie die Conversion-Aktion im Konto zugeschnitten ist, und unabhängig davon,
ob unser Transport fehlerfrei arbeitet. **Selbst ein in jeder Hinsicht richtiger Transport
verbuchte nichts.**

**ÜBER DEN ZUSTAND DES TRANSPORTS SAGT DIESE SPERRE AUSDRÜCKLICH NICHTS, und dieser Absatz
steht hier, damit niemand ihr mehr entnimmt, als sie trägt.** Was gemessen ist: Der Transport
erreicht Google, wird authentifiziert, und die Nutzlast passiert Parse- und semantische Schicht
(VERMERK 10, (c); docs/ziel-befunde.md, Teil (ca)). Was **nicht** gemessen ist und in (cb)/(i)
ausdrücklich als ungemessen geführt wird: **ob `"WEB"` fachlich richtig ist** und **ob
`productDestinationId` auf die richtige Conversion-Action zeigt**. **"Der Transport arbeitet
fehlerfrei" wäre also eine Behauptung über zwei ungemessene Achsen** und steht deshalb nirgends.
**DIE AUSSAGE DER SPERRE WIRD DADURCH NICHT SCHWÄCHER, und das ist der Punkt:** Sie trifft den
**NACHWEIS**, nicht die Baubarkeit, und sie trifft ihn **unabhängig** vom Zustand des
Transports. Ob er fehlerfrei ist oder nicht, ist für sie gleichgültig — ohne gültige
Klick-Kennung verbucht auch ein fehlerfreier Transport nichts.

**WAS DAMIT GESPERRT IST — DREI DINGE, EINZELN:**
· **DER NACHWEIS EINER VERBUCHTEN CONVERSION.** VERMERK 10, Abschnitt (f), führt ihn als
  offen; er bleibt es, und zwar aus einem Grund, der **nicht** am Code liegt.
· **DIE MESSUNG DES AUTO-TAGGINGS** — Vorrats-Eintrag 4, Satz "DIE ERSTE MESSUNG NIMMT SIE
  MIT". Ohne Klick hängt Google keinen Query-String an, den man lesen könnte.
· **DIE ENTSCHEIDUNG ÜBER DIE TAG-HYPOTHESE** vom 2026-09-01. Solange jeder Aufruf schon an
  der Klick-Kennung scheitert, kommt kein Datensatz an einer etwaigen zweiten Prüfung an.

**WAS AUSDRÜCKLICH NICHT GESPERRT IST:** der Bau. Scheibe 1b und jede weitere Arbeit an
Transport, Erneuerung und Oberfläche sind davon **unberührt** — die Sperre trifft den
**NACHWEIS**, nicht die Baubarkeit. Wer sie als Baustopp liest, liest sie falsch.

**AUSDRÜCKLICH KEINE EMPFEHLUNG**, wie sie aufzulösen wäre — weder eine Kampagne noch ein
anderer Kontozuschnitt noch ein Verzicht auf den Nachweis ist hier vorgeschlagen.

PROVENIENZ: OWNER-ANGABE 2026-09-02, aus erster Hand. **KEINE Messung.** Der Fehlergrund, mit
dem sie sich deckt, ist GEMESSEN 2026-09-02 (OWNER) und steht in docs/ziel-befunde.md,
Teil (cb); die Verträglichkeit der beiden ist eine **FOLGE**, keine zweite Beobachtung.

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
- **EIN RANG-WECHSEL GEGENÜBER DER NICHT GEWÄHLTEN GESTALT:** eventSource ist
  hier PFLICHT (bei Multi-Source optional). Wer den einen Zuschnitt aus dem
  anderen ableitet, erbt genau die falsche Hälfte. Bis zum 2026-09-01 standen
  hier ZWEI — an diesem Tag ist die eventSource-Hälfte BESTÄTIGT und die zweite
  ("transactionId dagegen OPTIONAL, dort Pflicht") WIDERLEGT worden, gemessen;
  s. docs/ziel-befunde.md, Teil (ca).

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

### Vollzogen — was im Zuschnitt der Scheibe 2 stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH AB, aus demselben Grund wie bei Scheibe 3 und der
Fix-Scheibe:** "### Vollzogen — was hier stand und wohin es gegangen ist" steht in dieser
Datei bereits zweimal und ist als Hausform über Standdateien hinweg Hebungs-Kandidat 5.

VERDICHTET AM 2026-08-31, nach dem Bau-Commit `6dc7e27` und dem bestätigten Live-Test.
Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen. VIER
Unterabschnitte sind entfallen:

- **"Woraus Scheibe 2 besteht"** nannte den Gegenstand und den GEMESSENEN Befund, dass
  `settings.pixels.google` über die Oberfläche gar nicht entstehen könne. **BEIDES HAT
  SEINEN GEGENSTAND VERLOREN:** Der Befund beschrieb den Zustand VOR der Scheibe, und der
  ist behoben — der Text verglich ab da mit nichts. **SEINE ZWEI BEFUNDE SIND NICHT
  VERSCHWUNDEN:** Dass `RULES_TARGET` auf ein Ziel verdrahtet war, ist mit
  `eventAxisTargets` erledigt und am Code dokumentiert; dass die Karte KEINEN
  Zielnamen-Zweig trägt, steht unverändert als Festlegung (2) des Zuschnitts der Scheibe 3
  und gilt dort weiter.
- **"Was Scheibe 2 ausdrücklich NICHT entscheidet"** führte vier Posten. **DREI SIND
  ENTSCHIEDEN:** der Feldname `pixelId` bleibt (ARCHITEKT, 2026-08-31, mit dem
  Präzedenzfall `adAccountId` am Verbraucher); die Leerraum-Achse der Kundennummer regelt
  Festlegung (6); `settingsEqual` trägt unverändert und ist nicht angefasst worden. **EINER
  BLEIBT OFFEN UND HAT EINEN EIGENEN ORT:** ob die Schnittstelle die erreichbaren Konten
  aufzählen kann — docs/offene-punkte.md, "WAS GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT",
  Trigger "der Zuschnitt der Scheibe 4".
- **DIE ZWEI GATES FÜR STUFE 1** (die zwei Nicht-Auslieferungs-Zeilen · der geteilte
  `setPixelId`) waren Aufträge an den Bau-Plan und sind beantwortet: Das erste durch den
  Adapter-Term in `TargetCard.tsx`, das zweite durch die erschöpfende Zuordnung
  `NORMALIZE_PIXEL_ID`. **IHRE BEFUNDE LEBEN AM CODE WEITER**, in den Kommentarköpfen
  beider Stellen — dort, wo die nächste Runde sie liest.
- **"Die Beweis-Achse"** und **"Der Scope — und wo er zum STOPP wird"** sind mit dem
  Vollzug abgelaufen; was tatsächlich gemessen und was angefasst wurde, steht in VERMERK 9.
  **DREI SÄTZE SIND GERETTET UND NICHT VERLOREN:** dass live auf KEIN einzelnes Tor
  zurückzuführen ist, warum nichts hinausgeht (VERMERK 9, "Was der Live-Test nicht zeigt")
  · dass die Schuld aus VERMERK 2 weiterwandert (ebenda) · und der Satz, dass der
  Schema-STOPP **der Detektor für Trigger (ii)** ist — er steht als GRENZE an Festlegung (2)
  und gilt für jede künftige Ablage-Frage.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen:** die sechs Festlegungen. Sie sind GRÜNDE und GRENZEN, keine
Anweisungen, und jede bindet über diese Scheibe hinaus — (1) und (6) die Ablage und die
Umformung, (2) die Ablage-Entscheidung samt ihrer Grenze, (3) die Consent-Folge, (4) die
Zuordnung der Fremdkonto-Frage zu Scheibe 4, (5) die Nicht-Prüfung der Form.


### Sechs Festlegungen des Zuschnitts der Scheibe 2

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

**PRÄZISIERT AM 2026-08-31, UND ZWAR IN ZWEI PUNKTEN, DIE DER TEXT DARÜBER OFFENLIESS.**
Beide sind GEMESSEN am Code (CC, 2026-08-31) und der erste zusätzlich LIVE bestätigt
(OWNER, 2026-08-31, Schritt 7 des Live-Tests, s. VERMERK 9):
· **`isTargetDeliverable` IST EIN ODER — DIE KUNDENNUMMER ALLEIN REICHT.** Es braucht
  weder beide Kennungsformen noch die Conversion-Regel. Umgekehrt reicht auch die
  Conversion-Regel allein. **Der Absatz oben sagt "sobald EINE der beiden Kennungsformen
  belegt ist" und ist damit richtig; was er nicht sagte, ist, WELCHE der beiden im
  Regelfall zuerst da ist** — und das ist die Kundennummer, weil sie auf der Karte steht.
  **LIVE BESTÄTIGT:** Der Owner hatte NUR die Kundennummer hinterlegt, und die Seite trug
  den Schlüssel.
· **DAS MEMO LIEST `settings`, NICHT `savedSettings`.** **AUSLÖSER DER CONSENT-FOLGE IST
  DAMIT DIE EINGABE, NICHT DAS SPEICHERN.** Ein noch nicht gespeicherter Wert bringt den
  Schlüssel bereits in den Publish. Das ist am Memo ausdrücklich begründet (es beschreibt,
  was in DIESES Dokument hineingeht, und das Dokument wird aus demselben laufenden Stand
  gebaut) — **es ist kein Versehen, aber es verschiebt den Zeitpunkt um einen Schritt nach
  vorn**, und wer die Folge am Speichern festmacht, sucht sie an der falschen Stelle.
**WAS SICH DADURCH NICHT ÄNDERT:** die zwei Folgen darüber. Der Vorteil für Scheibe 4 und
die Auflage für Phase 11.5 gelten unverändert — nur früher, als der Text sie beschrieb.

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

**(6) DIE KUNDENNUMMER WIRD AN DER EINGABE NORMALISIERT.**
**WAS FÄLLT: BINDESTRICHE UND LEERRAUM. SONST NICHTS.** Keine Prüfung, keine Ablehnung,
keine Bedingung. **Was nach dem Entfernen dasteht, geht unverändert durch — auch wenn es
keine Ziffernfolge ist.** Ein Wert, der danach nicht numerisch ist, wird gesendet und vom
Anbieter abgewiesen; das ist derselbe Ausgang wie ohne diese Festlegung und ausdrücklich
gewollt.
**WO: AN DER EINGABE.** Der reine Bauer bleibt unberührt — `buildIngestEventsRequest`
normalisiert nicht und soll das nicht ändern. Das ist der zweite Halbsatz von
Vorrats-Eintrag 7, wörtlich übernommen und nicht neu entschieden.
**NUR DIE KUNDENNUMMER.** Für `productDestinationId` ist **nicht gelesen**, ob der Anbieter
sie je mit Trennzeichen anzeigt. **Was nicht erhoben ist, wird nicht mitbehandelt** — eine
Normalisierung auf Verdacht wäre genau die erfundene Transformation, gegen die Festlegung (5)
auf der Prüf-Achse argumentiert.
**SICHTBARKEIT IST PFLICHT UND NICHT KOSMETIK:** Der gespeicherte Wert muss der sein, den
das Feld zeigt. **Es darf keinen unsichtbaren Unterschied zwischen Getipptem und
Gespeichertem geben.** WANN das geschieht — beim Tippen, beim Verlassen des Feldes, beim
Speichern — ist Sache des Bau-Plans; **DASS es sichtbar ist, ist die Festlegung.**

**GRUND:** **Google Ads zeigt Kundennummern MIT Bindestrichen an**, und ein Betreiber
schreibt ab, was er sieht. Ohne Normalisierung entsteht ein **STILLER Fehlschlag** — die
Anfrage wird abgewiesen, niemand sieht etwas, die Conversion fehlt. **Scheibe 2 baut keinen
Transport und damit keine Rückmeldung, die ihn auffinge**; die Beschriftung wäre in dieser
Scheibe die einzige Auskunft, und eine Beschriftung ist eine Auskunft, kein Riegel.

**DIE MESSLÜCKE, UND WARUM SIE HIER NICHT ENTSCHEIDET:** Dass die BINDESTRICHE der Grund der
Abweisung waren, ist **NICHT isoliert gemessen** (docs/ziel-befunde.md, Teil (bt)).
**Normalisiert wird nicht, WEIL wir es wissen, sondern weil der Ausgang UNTER BEIDEN
MÖGLICHKEITEN gleich gut ist:** Waren die Bindestriche der Grund, rettet es den Fall; waren
sie es nicht, ist eine Ziffernfolge ohne Bindestriche **immer noch genau das, was die
gelesene Doku verlangt** (Teil (j): "accountId, productDestinationId — Zeichenkette mit
Ziffern, in Anführungszeichen"). **Dieselbe Figur wie beim Deuter in
`src/lib/oauth/google-refresh.ts`** — richtig unter beiden Auslegungen, statt richtig unter
der einen, die man für wahrscheinlicher hält.

**EINE ZURÜCKGEZOGENE GEGENFASSUNG GEHÖRT IN DEN TEXT, SONST WIRD DIESE FESTLEGUNG ALS
MEINUNGSWECHSEL GELESEN:** Erwogen worden war das Gegenteil — keine Normalisierung im Code,
die Form nur im Platzhalter und im Hinweistext der Karte. **Ihre Begründung war eine
Asymmetrie:** eine falsche Normalisierung schreibe einen veränderten Wert in die Datenbank,
"und niemand sieht mehr, was der Betreiber getippt hat". **SIE IST WIDERLEGT, NICHT
ÜBERSTIMMT:** Das Argument trifft eine **VERSTECKTE** Transformation, also eine
server-seitige Umformung. **Hier ist es ein EINGABEFELD, und der gespeicherte Wert steht
sichtbar darin** — genau deshalb ist die Sichtbarkeit oben Pflicht und nicht Kosmetik. **Die
Asymmetrie gibt es unter dieser Bauform nicht.**
**DAZU EIN PRÄZEDENZFALL IM HAUS:** `setPixelId` (src/lib/settings.ts) **trimmt bereits**.
Eine Normalisierung an der Eingabe ist gebaut — nur eine schwächere.
PROVENIENZ: ARCHITEKTEN-/OWNER-ENTSCHEIDUNG 2026-08-31. Keine Messung.

**GRENZE:** Sie sagt, **DASS** und **WAS** normalisiert wird — **nicht WO im Code**. Das ist
das Gate unten.
**ZWEI STELLEN DIESES ZUSCHNITTS WERDEN DADURCH ENGER, UND BEIDE BLEIBEN WÖRTLICH STEHEN:**
· Die **GRENZE von Festlegung (5)** sagt, der Zuschnitt sage nichts über einen TRIM, das sei
  Sache des Bau-Plans. **Das gilt unverändert für `productDestinationId` und für "leer heisst
  nicht gesetzt".** Für die KUNDENNUMMER ist die Leerraum-Achse mit (6) entschieden. **(5)
  wird dadurch nicht falsch** — sie spricht von PRÜFEN, (6) von VERÄNDERN, und die beiden
  sind nicht dasselbe: **das eine weist ab, das andere formt um.**
· Der Eintrag "TRIM UND LEER-BEHANDLUNG DER ZWEI KENNUNGEN" in "Was Scheibe 2 ausdrücklich
  NICHT entscheidet" ist im selben Zug **auf seinen verbliebenen Gegenstand verengt** worden.
**EIN UNTERSCHIED, DER BEIM BAUEN ZÄHLT UND SONST ÜBERSEHEN WIRD:** `setPixelId` trimmt
**AUSSEN**. (6) verlangt mehr — ein eingefügtes "123 456 7890" trägt Leerraum **INNEN**, und
den entfernt kein Trim. **Wer (6) für erledigt hält, weil schon getrimmt wird, hat sie nicht
gebaut.**

## Der Transport — Scheibe 4 des Schnitts der Phase 11.2

**DIE KURZFORM WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT:** "Scheibe 4" meint
die vierte Scheibe des Schnitts, in den die Phase 11.2 am 2026-08-28 zerlegt worden ist
(bindende Entscheidung (6)) — den Transport. **SIE IST NICHT DIE "SCHEIBE 4" DER PHASE 11**,
und diese Abgrenzung steht hier, weil beide Namen im Repo vorkommen: Jene ist die Naht des
Meta-Forwards, abgeschlossen am 2026-08-06, und `src/lib/capi/ingest.ts` zitiert sie an zwei
Stellen im Kommentarkopf ("SEIT PHASE 11 SCHEIBE 4 NICHT MEHR VON HIER AUS"). Wer eine
Fundstelle "Scheibe 4" liest, prüft zuerst, welche Phase gemeint ist.

**SIE IST DIE LETZTE SCHEIBE DES SCHNITTS, UND SIE IST ENTSPERRT.** Die GRENZE der bindenden
Entscheidung (6) lautet "Zwingend ist NUR 4 nach 1a, 2 und 3"; alle drei stehen (VERMERK 6,
VERMERK 7, VERMERK 9). **1b bleibt offen und ist für diese Scheibe nicht zwingend** — was
das für das PRODUKT heisst und nicht nur für den Schnitt, steht in Festlegung (4).

**PROVENIENZ DES GANZEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
ARCHITEKT, 2026-09-01. Keine Messung.** Jede mit GEMESSEN gekennzeichnete Angabe stammt aus
den Aufklärungsrunden vom 2026-09-01 (CC, am Repo, mit Positivkontrolle je Achse); jede mit
GELESEN gekennzeichnete steht mit ihrer Fundstelle in docs/ziel-befunde.md und wird hier
**nicht verdoppelt** — zweimal geschrieben liefe sie auseinander.

### Was Scheibe 4 ist

**Ein Ereignis von einer gehosteten Kundenseite erreicht Google.** Damit sendet das fünfte
Fan-Out-Ziel, und die Phase 11.2 hat ihren Gegenstand eingelöst.

**DER TITEL WEICHT ABSICHTLICH VON DEM DER SCHEIBE 1a AB** ("### Was sie ist") **UND VON DEM
DER SCHEIBE 3** ("### Was Scheibe 3 ist"): Zwei zeichengleiche `###`-Überschriften in
DERSELBEN Datei machen jeden Such-Anker mehrdeutig, und der erste Treffer wäre systematisch
der falsche (docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER
DATEI MIT VERZEICHNIS NICHT").

### Vollzogen — was im Zuschnitt der Scheibe 4 stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH AB, aus demselben Grund wie bei Scheibe 3, der Fix-Scheibe und
Scheibe 2:** "Vollzogen — was hier stand und wohin es gegangen ist" steht in dieser Datei
bereits zweimal und ist als Hausform über Standdateien hinweg Hebungs-Kandidat 5.
**DAS ZITAT STEHT HIER OHNE `###`-MARKE**, anders als in den drei älteren Blöcken derselben
Art — die Auflage dazu steht in docs/immer-beachten.md am Ende von "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" (Zusatz 2026-08-27). Die drei älteren
sind NICHT nachgezogen worden; das wäre eine eigene Arbeit.

VERDICHTET AM 2026-09-01, nach den Bau-Commits `26caa38` und `84e9fca` und dem bestätigten
Live-Test. Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen.
EINE Festlegung und ZWEI Unterabschnitte sind entfallen. **JEDES DER DREI STÜCKE TAUCHT IN
VERMERK 10 WIEDER AUF — das ist die Bedingung, unter der überhaupt gestrichen werden durfte:
Der Zuschnitt ist der Maßstab, gegen den der Vermerk misst, und der Verlauf ist kein Ersatz
(er wird beim Pflicht-Gate nicht gelesen).**

- **Festlegung (7), "TOR D FÄLLT"** wies an, `'google'` in `TARGETS_WITH_ADAPTER` aufzunehmen
  und `FORWARDER_BY_TARGET` seinen Eintrag zu geben. **Beides ist gebaut und sagt sich am Code
  selbst** — die Zeile in `src/lib/tracking/target-adapters.ts` trägt den Satz "UND DIESE ZEILE
  IST TOR D" in ihrem eigenen Kommentar. **WO ES WIEDER AUFTAUCHT:** VERMERK 10, Abschnitt (a),
  einschliesslich der Einlösung der GRENZE aus Festlegung (6) der Scheibe 3 ("Scheibe 4 zahlt
  ihn").
  **SEINE EINE FORTWIRKENDE ZEILE IST NICHT VERSCHWUNDEN:** "KEIN PARALLELER PFAD" ist die
  bindende Entscheidung (8) und steht dort unverändert; sie war hier nur zitiert.
- **"Die drei Wächter, die gegenstandslos werden — je mit ihrem Ersatz"** nannte `TOR 2`,
  `W-google` und `T15` samt der Gestalt ihres jeweiligen Ersatzes. **Alle drei sind ersetzt**
  (GEMESSEN am Repo, CC, 2026-09-01), und jeder Ersatz trägt seine Begründung im eigenen
  Kommentarkopf — dort, wo die nächste Runde sie liest. **WO ES WIEDER AUFTAUCHT:** VERMERK 10,
  Abschnitt (a), mit den drei Fundstellen.
  **DER SCHLUSSABSATZ ("DAZU, UND ES IST KEIN AUFTRAG") WAR EIN AUFTRAG AN DEN BAU-PROMPT** —
  die zwei Quelltext-Wächter auf ihre Reichweite zu prüfen. Er ist mit dem Bau abgelaufen; die
  Grenze eines Quelltext-Wächters steht dauerhaft in docs/immer-beachten.md, "EIN WÄCHTER ÜBER
  QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG".
- **"Die Beweis-Achse der Scheibe 4 — drei Schulden in einem Durchlauf"** war die ANLEITUNG für
  den Live-Test: die drei Schulden, Schritt 0 (Neu-Verbinden), der Start-Host, die Regression
  zuerst, und "WAS DER NACHWEIS NICHT ZEIGT — DREI". **Sie ist gefahren.** **WO ES WIEDER
  AUFTAUCHT:** VERMERK 10 — die drei Schulden einzeln als eingelöst in Abschnitt (b), die
  gefahrenen Schritte im Protokoll, und die Liste "was der Nachweis nicht zeigt" in
  Abschnitt (f), dort um drei weitere Posten ERWEITERT.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im Zweifel
stehengelassen:** die sechs verbliebenen Festlegungen, der Messbefund zu `eventID`, die
Korrektur des Architekten, die Ausschluss-Liste und "1b als Folgetask". Sie sind GRÜNDE,
BEFUNDE und GRENZEN, keine Anweisungen, und jede bindet über diese Scheibe hinaus —
insbesondere (2) TRANSIT-ONLY für das Erneuerungs-Token, (5) die Wahl von `eventSource` und
`transactionId` samt ihren Grenzen, (6) die Bauform und die TRANSIT-ONLY-Invariante, und die
fünf Vorbedingungen von 1b.
**SACHKORREKTUR 2026-09-02 — HIER STAND "drei Vorbedingungen von 1b". ERSETZT.** Es waren
schon damals VIER (die vierte war nicht nummeriert), und seit dem 2026-09-02 sind es FÜNF.
**DIE BEGRÜNDUNG STEHT NICHT HIER, SONDERN EINMAL IM 1b-ABSCHNITT** ("SACHKORREKTUR
2026-09-02 — DIE ZAHL IM TITEL") — dieselbe Zahl an drei Orten dreimal zu begründen liefe
auseinander. GEMESSEN am Dateitext (CC, 2026-09-02).

### Sieben Festlegungen des Zuschnitts der Scheibe 4

**(7) IST AM 2026-09-01 ENTFALLEN — s. "Vollzogen" darüber. DIE ZAHL IM TITEL BLEIBT UND DIE
ÜBRIGEN NUMMERN WERDEN NICHT NEU VERGEBEN:** Der Titel beschreibt den Zuschnitt, wie er
gefallen ist, und eine Umnummerierung machte jeden bestehenden Verweis auf eine Festlegung
dieses Zuschnitts still falsch. Es ist dieselbe Disziplin wie bei den Vermerk-Nummern.

**(1) DER LESEPFAD LIEGT IN `getCapiConfigByTrackingKey`, NICHT IM ADAPTER.**
Die zweite Datenbank-Runde jener Funktion (`src/lib/capi/token.ts`) selektiert zusätzlich
`secret_enc`; die Paarungsschleife verzweigt **JE ZEILE** nach Geheimnis-Klasse — Klartext in
`secret` wie bisher, Chiffrat in `secret_enc` über den neuen Weg. **KEINE zusätzliche
Datenbank-Runde**: die Zahl bleibt bei ZWEI im Request plus dem Persist im `after()`.
**GRUND:** Die Frage "hat dieses Ziel ein brauchbares Zugangsdatum" wird heute an **genau
einer Stelle für alle Ziele** beantwortet. Eine zweite Instanz derselben Frage — im Adapter,
im Handler oder in einem Vorlauf — liefe auseinander; es ist dieselbe Figur wie `domains`
gegen `settings.hosting.label` (docs/immer-beachten.md, "DIE domains-ZEILE IST DIE ALLEINIGE
WAHRHEIT ÜBER 'IST DIESES PROJEKT LIVE?'").
**GRENZE, UND SIE WIRD BEWUSST IN KAUF GENOMMEN:** Die Krypto-Arbeit fällt damit **VOR dem
Consent-Gate** an — auch für ein Ziel, dessen Einwilligung im Draht fehlt und das gleich
darauf aus `allowedTargets` (src/lib/capi/ingest.ts) herausfällt. Der Preis ist Rechenzeit
auf dem meistgetroffenen Pfad der Plattform, und er wird gezahlt, weil die Alternative eine
zweite Wahrheit wäre.
**WAS DIE GRENZE NICHT SAGT:** Sie ist **nicht gemessen**. Wie teuer eine Dechiffrierung je
Beacon ist, hat niemand erhoben; hier steht, dass der Aufwand anfällt, nicht wie gross er
ist.

**(2) NUR DAS ZUGANGSDATUM VERLÄSST DEN RESOLVER.**
Das **Erneuerungs-Token** aus der entschlüsselten Nutzlast wird **nie** an `ResolvedTarget`
gehängt, **nie** an einen Adapter gereicht, **nie** geloggt. Es wird gelesen, verworfen und
existiert für die Dauer der Auflösung.
**GRUND:** Ein Zugangsdatum stirbt nach einer Stunde, ein Erneuerungs-Token ist ein
DAUERHAFTES Geheimnis. Es in eine Adapter-Signatur zu legen hiesse, es auf einen Pfad zu
setzen, der bei **jedem Besucher jeder Kundenseite** läuft — und jeder künftige Adapter
bekäme es mitgeliefert, ohne es zu brauchen.
**GRENZE:** Die Festlegung gilt der SIGNATUR und dem LOG. Sie sagt nichts darüber, wie lange
der Wert im Arbeitsspeicher lebt; das ist eine Eigenschaft der Laufzeit und hier nicht
geregelt.

**(3) UHR 1 IST DER RIEGEL, UHR 2 KOMMT NICHT VOR.**
Ist `accessTokenExpiresAt` überschritten, entsteht **kein** `ResolvedTarget` — fail-closed,
in der Gestalt des bestehenden `if (!token) continue`. Ein Ziel ohne lebendes Zugangsdatum
ist damit ununterscheidbar von einem Ziel ohne Zugangsdatum, und das ist der Punkt: Der
bestehende Pfad kennt diesen Ausgang schon.
**KEIN VORLAUF VON `REFRESH_LEAD_SECONDS`. GRUND:** Der Vorlauf existiert, um früh zu
**ERNEUERN** (Festlegung 1 der Scheibe 1a). Der Transport erneuert nicht; ein noch fünf
Minuten gültiges Zugangsdatum zu verwerfen hätte **keinen Gegenwert** — es entstünde nur ein
Ereignis weniger. Geprüft wird `expiresAt <= now`.
**RESTRISIKO, BENANNT UND NICHT GEBAUT:** Ein Zugangsdatum, das **während des Fluges** stirbt,
liefert eine 401 vom Anbieter. Das ist ein **geloggter Fehlschlag, kein Bruch** — die 204
bleibt, der Handler läuft zu Ende, und der Betreiber sieht nichts (Ursache (3) des offenen
Punktes "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN").

**A-4 IST DAMIT AUFGELÖST, OHNE ANGEFASST ZU WERDEN — und dieser Absatz ist der wichtigste
der Festlegung.**
Die Entscheidung **A-4** (s. "Die Entscheidungen vom 2026-08-29") führt als GRENZE: "FÜR
EINEN AUFRUFER AUF DEM TRANSPORTWEG WÄRE SIE ES NICHT — dort könnte noch gesendet werden,
solange Uhr 1 läuft. Wer den Transport baut, prüft diese Zuordnung neu."
**DIE PRÜFUNG IST HIERMIT ERFOLGT, UND IHR ERGEBNIS IST: DIE FALLE HAT KEINEN GEGENSTAND.**
A-4 beschreibt die **Reihenfolge INNERHALB von `refreshAccessToken`** (src/lib/oauth/
token-refresh.ts) — Uhr 2 vor Uhr 1. **Der Transport ruft diese Funktion nicht** (Festlegung
(3) und der Ausschluss unten). Ob das Erneuerungs-Token tot ist, ändert **nichts** daran, ob
mit dem vorhandenen Zugangsdatum gesendet werden kann; die beiden Fragen berühren einander
nur, wenn dieselbe Funktion beide beantwortet.
**WAS DARAUS FOLGT UND WAS AUSDRÜCKLICH NICHT:** `T3b` (src/lib/oauth/token-refresh.test.ts)
bleibt **gültig und unverändert** — er misst die Beweis-Route, und für die ist die Auskunft
weiterhin die ehrliche. Der Kommentar an Schritt (6) in `token-refresh.ts` **bleibt stehen**;
er hat den Bau dieser Scheibe geleitet und ist damit eingelöst, nicht überholt.

**(4) DIE FOLGE VON KANDIDAT 1 GEHÖRT IN DEN ZUSCHNITT, NICHT IN EINE FUSSNOTE.**
**Das Zugangsdatum lebt 3599 Sekunden** (GEMESSEN 2026-08-28, OWNER, Messung C —
docs/ziel-befunde.md, Google-Abschnitt, Teil (bw)). Ohne Erneuerung auf dem Transportweg und
ohne Scheibe 1b sendet ein Projekt an Google **NUR innerhalb einer Stunde** nach dem
Verbinden oder nach einem Druck auf die Beweis-Route.
**DANACH IST URSACHE (4) EINGETRETEN** — der offene Punkt "EIN ZIEL KANN KONFIGURIERT SEIN
UND TROTZDEM NICHT SENDEN" (docs/offene-punkte.md) führt sie als "DER ZUGANG BRICHT OHNE
ZUTUN DES KUNDEN — ABLAUF ODER WIDERRUF", **in ihrer stummen Form**: Die Karte sagt
"Zugangsdaten hinterlegt", es geht nichts hinaus, und niemand handelt, weil niemand etwas tut.
**PRÄZISIERUNG 2026-09-02 — ERGÄNZT UND NICHT ERSETZT: DER SATZ DARÜBER IST NICHT FALSCH.**
Zu eng ist nicht seine Aussage, sondern ihr Geltungsbereich. **STUMM IST DIE OBERFLÄCHE,
NICHT DER BETRIEB** — die Karte schweigt (`listConfiguredTargets` selektiert nur `target`),
das Server-Log nicht (`usableTokenFromRow` schreibt eine Zeile je Beacon). GEMESSEN am Code
(CC, 2026-09-02); Volltext als Vorrats-Eintrag 42 und 43, hier nur der Zeiger.
**DER SATZ, DER MIT MUSS: 1b IST FÜR DAS PRODUKT NICHT OPTIONAL, NUR FÜR DIESE SCHEIBE.** Der
Schnitt erlaubt 4 ohne 1b — das ist eine Aussage über die BAUBARKEIT, nicht über die
Brauchbarkeit. **Wer das übersieht, hält Google nach dem Live-Test für fertig und hat ein
Ziel gebaut, das eine Stunde am Tag sendet.**

**(5) DIE NUTZLAST — DIE KETTE STEHT SEIT SCHEIBE 11.2a UND BEKOMMT HIER IHREN AUFRUFER.**
`extractGoogleClickIds(body.eventSourceUrl)` (src/lib/capi/google-click-ids.ts) →
`buildGoogleEvent` → `buildIngestEventsRequest` (beide src/lib/capi/google-payload.ts), dann
ein POST mit der Kopfzeile `Authorization` und dem Wert `Bearer ` + Zugangsdatum (GEMESSEN
2026-08-28, OWNER, Messung A — Teile (bj) bis (bm)). **Ohne Klick-Kennung entsteht kein
Event** — bindende Entscheidung (3), unverändert.
Die fünf Zuordnungen, je mit ihrem Grund:
· **`operatingAccountId` ← `entry.config.pixelId`.** Seit Scheibe 2 trägt der Slot für
  `'google'` die Google-Ads-Kundennummer, an der Eingabe über `NORMALIZE_PIXEL_ID`
  normalisiert (VERMERK 9).
· **`productDestinationId` ← `entry.conversionRules?.[event]`**, über einen Auflöser in der
  Gestalt von `resolveRuleUrn` (src/lib/capi/linkedin-forward.ts). **Keine Regel für dieses
  Ereignis → kein Ziel → kein Versand.** GRUND: Die Kennung gilt je Conversion-Action und
  damit faktisch je Ereignistyp (GELESEN, Teil (k)/C3) — ohne sie gibt es keine Adresse, an
  die geliefert werden könnte. Es ist dieselbe Klasse wie Riegel 3 des LinkedIn-Adapters.
· **`eventSource` ← eine BENANNTE KONSTANTE IM ADAPTER, Wert `"WEB"`.**
  **PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-01.** Keine Messung.
  **GRUND:** Pagesmith verarbeitet Web-Traffic; der Vorbau an den Aufrufer-Schnittstellen —
  ein Feld im Beacon-Rumpf, ein Wert am `ResolvedTarget`, eine Einstellung in der Oberfläche
  — wird damit gespart.
  **BINDENDE ENTSCHEIDUNG (2) BLEIBT GEWAHRT, und der Satz gehört dazu, sonst liest die
  nächste Runde hier einen Verstoss:** Jene verbietet die Wahl **IN DER BAU-FUNKTION** —
  "unsichtbar für jeden Aufrufer". `buildGoogleEvent` nimmt den Wert weiterhin als Parameter
  entgegen und setzt keinen Vorgabewert; **die Konstante IST der Aufrufer**, und sie steht
  sichtbar im Adapter.
  **GRENZE, WÖRTLICH AN DIE KONSTANTE ZU SCHREIBEN:** Gemessen ist der **TYP**, nicht der
  **WERT** — `eventSource` ist ein Enum, `"WEB"` ist ein gültiges Mitglied (GEMESSEN
  2026-08-28, OWNER, Teil (br)). **Ein syntaktisch gültiges Enum-Mitglied kann fachlich falsch
  sein, und die Schnittstelle meldet das nicht.** Die Mitgliedermenge ist nicht einmal erhoben.
  **Verlangt der Live-Test ein anderes Mitglied, wird die Konstante angepasst** — sie ist
  genau dafür benannt und liegt an einer Stelle.
· **`transactionId` WIRD GESENDET, WERT = `eventID`.**
  **ERSETZT AM 2026-09-01.** Hier stand: "`transactionId` WIRD NICHT GESENDET", begründet
  damit, dass das Feld in der Offline-Gestalt OPTIONAL sei (GELESEN, Teil (l)/D5) und
  `eventID` dafür einzusetzen **geraten** wäre. **DIE PRÄMISSE IST WIDERLEGT: In der
  Offline-Gestalt ist `transactionId` PFLICHT** (GEMESSEN 2026-09-01, OWNER,
  docs/ziel-befunde.md, Teil (ca)) — ein Aufruf ohne das Feld wird mit
  `REQUIRED_FIELD_MISSING` abgewiesen, ein sonst zeichengleicher mit dem Feld liefert 200.
  **ZWEI unabhängige gelesene Stellen sagten das Gegenteil**, (l)/D5 und (w)/D2; beide
  bleiben stehen und tragen jetzt einen Zeiger auf (ca).
  **DER ALTE WORTLAUT IST ERSETZT UND NICHT DANEBENGESTELLT**, weil er eine BAU-ANWEISUNG
  für eine laufende Scheibe ist — zwei Anweisungen nebeneinander wären eine Falle für den,
  der baut.

  **GRUND FÜR DEN WERT — OWNER-/ARCHITEKTEN-ENTSCHEIDUNG 2026-09-01, nach Kandidatenlage.
  KEINE Messung, eine Festlegung.**
  **DIE FEHLRICHTUNGEN SIND UNSYMMETRISCH, und das entscheidet:** Ein **frischer Wert je
  Aufruf** irrte Richtung **ÜBERZÄHLUNG** — eine Beacon-Wiederholung erzeugte zwei
  Transaktionen, und überzählte Conversions lenken Gebote und kosten den Kunden Geld.
  **`eventID` irrt Richtung UNTERZÄHLUNG.** Eine Conversion zu wenig ist der billigere
  Fehler.
  **DAZU, UND ES IST DER ZWEITE TRAGENDE GRUND:** Meta dedupliziert **bereits über genau
  diesen Schlüssel**. Zwei verschiedene Dedup-Achsen für dasselbe Ereignis wären eine
  Divergenz, die niemand pflegt — und die erst auffiele, wenn zwei Ziele verschieden zählen.

  **GRENZE, ZWEITEILIG:**
  · **WIDERSPRUCH 4 IST DAMIT SCHARF** (docs/ziel-befunde.md, Teil (y), fortgeschrieben in
    (ca)/(f)): Was bei einem doppelten `transactionId` geschieht, ist unaufgelöst — Stelle A
    sagt Zusammenführung, Stelle B Verwerfung unter ERROR, **beide sind Lesungen**. **Gilt
    Stelle B, verfällt der Datensatz, statt zusammengeführt zu werden — der Preis wäre
    grösser als "eine Conversion zu wenig".** **DAS ÄNDERT DIE WAHL NICHT**, weil ein
    frischer Wert auch unter Stelle B schlechter wäre: dort verfiele ein Datensatz, hier
    entstünde eine erfundene zweite Conversion.
  · **DIE WIEDERHOLUNGS-ACHSE IST GEMESSEN UND OFFEN ZUGLEICH** — s. den Messbefund
    "Wiederholt sich `eventID`?" weiter unten in diesem Abschnitt.
· **`x-goog-user-project` WIRD NICHT GESENDET.** GRUND: **ungemessen in beide Richtungen.**
  Die Kopfzeile fehlte in allen sieben Aufrufen der Messung B1, und die semantische Prüfung
  wurde erreicht — **das ist ausdrücklich KEIN Schluss auf Entbehrlichkeit** (Teil (bu)), aber
  es ist auch kein Beleg dafür, dass sie nötig wäre. Kein Vorbau auf Verdacht.

**(6) DER ADAPTER IST EINE NEUE DATEI, IN DER BAUFORM VON `linkedin-forward.ts`.**
Das `try` beginnt **VOR** dem Nutzlast-Bau und umschliesst die Riegel — nicht erst beim
Netzruf wie bei `forwardToMeta`. **GRUND:** Der jüngste Adapter ist die vorsichtigere Bauform;
bei ihm kann keine Zeile des Nutzlast-Baus das 204-Containment brechen, während `meta` diese
Zusage über eine Auflage im Kommentarkopf trägt ("WER VOR DEM try EINE ZEILE ERGÄNZT, DIE
WERFEN KANN, BRICHT DAS 204-CONTAINMENT DES AUFRUFERS"). Eine Auflage ist schwächer als eine
Struktur.
**EIGENE TIMEOUT-KONSTANTE, 3000 ms**, wie bei allen vier bestehenden Adaptern (GEMESSEN am
Repo, CC, 2026-09-01: `META_FORWARD_TIMEOUT_MS`, `PINTEREST_FORWARD_TIMEOUT_MS`,
`TIKTOK_FORWARD_TIMEOUT_MS`, `LINKEDIN_FORWARD_TIMEOUT_MS`, alle `3_000`).
**KEIN gemeinsamer Deckel, kein `Promise.race`, kein geteiltes Abbruchsignal** — die Auflage
steht am Fan-Out in `src/lib/capi/ingest.ts` und gilt unverändert. Fire-and-log, kein Wurf
nach aussen.

**TRANSIT-ONLY ALS INVARIANTE DIESER SCHEIBE (OWNER, 2026-09-01, STRIKT):**
Die Klick-Kennung geht **in die Nutzlast und sonst nirgendwohin** — kein Feld in `events`,
keine Logzeile, kein Fehlerpfad, der sie trägt, und **KEIN Zurückspiegeln des
Anbieter-Rumpfes**. **Geloggt wird der GRUND, nie der WERT.**
**GRUND:** Die dritte Datenklasse (OWNER-ENTSCHEIDUNG 2026-08-28, docs/offene-punkte.md,
"DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE") verlangt genau das, und der offene Punkt
hält ausdrücklich fest, dass die Auflage für die Klick-Kennung bis hierher "NOCH KEIN
GELEBTER STAND, SONDERN EINE VORGABE AN DIE TRANSPORT-SCHEIBE" war. **Mit dieser Scheibe wird
sie gelebter Stand oder gar nicht.**
**DAS VERBOT DES ZURÜCKSPIEGELNS IST DER TEIL, DER SONST DURCHRUTSCHT:** Drei der vier
bestehenden Adapter deuten den Anbieter-Rumpf und schreiben Teile davon ins Log
(`describeMetaError`, `describeErrorBody`, `describeLinkedinError`). Ein Anbieter kann den
verletzenden Wert zurückspiegeln — und der wäre hier die Klick-Kennung. Das Sicherheits-Manifest
führt dieselbe Klasse bereits als Tier-1-Item ("META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM
ZURÜCK"). **Hier wird sie nicht wiederholt, sondern von vornherein ausgeschlossen.**

### Wiederholt sich `eventID`? — ein Messbefund, der die Wahl aus Festlegung (5) trägt

**WARUM DIESER BEFUND HIERHER GEHÖRT UND NICHT IN EINEN VERMERK:** Festlegung (5) setzt
`eventID` als `transactionId` ein. Diese Wahl ist nur so gut wie die Antwort auf eine
einzige Frage — **kann derselbe Wert zweimal am Ingest ankommen?** Ohne sie ist die
Festlegung eine Vermutung.

**GEMESSEN AM LAUFENDEN BESTAND (OWNER, 2026-09-01):**
**541 Server-Zeilen · 541 verschiedene `event_id` · NULL Doppel.**
**POSITIVKONTROLLE:** Die Zahl 541 ist deutlich von null verschieden — die Abfrage hat
ihren Suchraum erreicht. Ohne sie wäre "keine Doppel" von "keine Zeilen gesehen" nicht zu
unterscheiden (docs/immer-beachten.md, Lektion (d) an "MUTATIONSPROBEN UND
LIVE-TEST-INSTRUMENTE").

**WAS DAS TRÄGT — ZWEIERLEI, UND DAS ZWEITE WIEGT SCHWERER:**
· **`eventID` ist als `transactionId` brauchbar.** Das ist der Anlass der Messung.
· **DIE ADBLOCKER-VERLUSTRATE STEHT AUF SAUBERER GRUNDLAGE.** Ihr Nenner zählt
  **Server-Zeilen**, nicht verschiedene `event_id` (`get_adblock_loss`); eine Wiederholung
  verschöbe sie. **Keine ist je aufgetreten.** Dieser Teil des Befunds ist der wertvollere,
  weil ihn niemand gesucht hat: Er belegt eine Produktzahl, die seit Phase 8 angezeigt wird
  und deren Grundlage bis heute ungemessen war.

**DIE GRENZE, UND SIE IST NICHT KLEIN:** Das sind **541 Zeilen aus EIGEN-Traffic bei EINEM
Betreiber**. `sendBeacon`-Wiederholung und bfcache bleiben **Plattform-Eigenschaften**, die
unter fremdem Traffic, anderen Browsern und schlechteren Netzen auftreten können.
**ABWESENHEIT ÜBER 541 ZEILEN IST KEIN BEWEIS FÜR DIE ZUKUNFT** — sie ist der Unterschied
zwischen "ungemessen" und "gemessen, keine Treffer", und genau als dieser Unterschied ist
sie hier abgelegt.
**DIE MÖGLICHKEIT STEHT IM REPO SELBST**, seit Phase 8: `supabase/migrations/0011_events.sql`
begründet das Fehlen eines Unique-Constraints auf `event_id` unter anderem damit, dass "ein
sendBeacon-Retry schon heute doppeln" könne. Diese Messung widerlegt das nicht — sie sagt,
dass es in 541 Fällen nicht geschehen ist.

**WAS AM CODE GEKLÄRT IST (GEMESSEN am Repo, CC, 2026-09-01)** — und diese Hälfte braucht
keine Stichprobe:
· **Klick, Reload, Zurück-Navigation und zwei Mappings erzeugen JE EIGENE WERTE.** `eidStmt`
  (src/lib/tracking/meta.ts) liegt **INNERHALB** von `__psMetaFire` und wird bei jedem Fire
  neu ausgewertet — `crypto.randomUUID()`, mit einem Rückfall aus `Date.now()` und
  `Math.random()`.
· **DER BESTÄTIGUNGS-BEACON TRÄGT DIESELBE `eventID`** — das ist sein Zweck, er trägt den
  Verlustraten-Join. **ER ERREICHT DEN FAN-OUT ABER NICHT:** der frühe `return` im Zweig
  `isBrowserConfirm` von `handleIngest` (src/lib/capi/ingest.ts) sperrt ihn **strukturell**
  ab, nicht über einen Term in einer Bedingung. **DAS IST DIE ENTSCHEIDENDE HÄLFTE** — ohne
  sie käme jeder Wert garantiert zweimal am Adapter an, und die Wahl aus Festlegung (5) wäre
  von vornherein falsch.

### Eine Korrektur des Architekten, die den Gegenstand dieser Scheibe verschiebt

**SIE STEHT IM ZUSCHNITT UND NICHT IN EINER FUSSNOTE, WEIL SIE TRAGEND IST.**

**ES HIESS IN DER ZUSCHNITT-RUNDE, KANDIDAT 1 VERMEIDE EINEN ZWEITEN DECHIFFRIER-LESER. DAS
IST FALSCH.** Den abgelegten Stand zu **lesen** HEISST zu **dechiffrieren**:
`project_secrets.secret_enc` gibt ohne `decryptSecret` (src/lib/secrets/cipher.ts) und
`parseOAuthPayload` (src/lib/secrets/oauth-payload.ts) **kein Zugangsdatum her**.

**WAS KANDIDAT 1 TATSÄCHLICH VERMEIDET, IST DIE ERNEUERUNG — NICHT DIE ENTSCHLÜSSELUNG.** Der
zweite Dechiffrier-Leser entsteht **so oder so** und ist der Gegenstand dieser Scheibe. Bis
zum 2026-09-01 hatte `decryptSecret` **genau einen** Aufrufer im Produktivcode:
`refreshAccessToken` (GEMESSEN am Repo, CC, 2026-09-01; Suchmuster `decryptSecret`, Suchraum
`src/` rekursiv binärsicher, Positivkontrolle über `encryptSecret` mit zwei Produktiv-Aufrufern).
**Mit dieser Scheibe sind es zwei.**

**WARUM DAS FESTGEHALTEN WIRD, OBWOHL DIE ENTSCHEIDUNG UNVERÄNDERT BLEIBT:** Wer den falschen
Satz glaubt, sucht beim Bauen nach einem Weg, der ohne Entschlüsselung auskommt — und findet
keinen. Und er liest den Ersatz für den Wächter `T15` als Verschärfung, wo er in Wahrheit eine
**Verschiebung der Achse** ist: von "dieser Pfad entschlüsselt nicht" zu "dieser Pfad
entschlüsselt, erneuert aber nie".

### Was ausdrücklich NICHT zu dieser Scheibe gehört, je mit Grund

· **DIE FREMDKONTO-MESSUNG.** Was Google bei einer Kundennummer tut, für die das Zugangsdatum
  nicht autorisiert ist, braucht **einen echten Aufruf mit gültigem Zugangsdatum und fremder
  Kundennummer** — also eine Messung **NACH** dem Transport, nicht in ihm. Der offene Punkt
  "WAS GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT, IST UNGELESEN UND UNGEMESSEN" trägt seit dem
  2026-09-01 einen Vermerk mit dem neuen Trigger.
· **1b UND DIE OBERGRENZE FÜR `retry`.** Beides berührt der Transport **nicht mehr, seit er
  nicht erneuert** — Vorrats-Eintrag 10 hängt an einem Aufrufer von `refreshAccessToken`, und
  diese Scheibe erzeugt keinen. Die Folge für das PRODUKT steht in Festlegung (4) und
  verschwindet dadurch nicht.
· **DIE MESSUNG DES `eventSource`-WERTES.** **Bauen geht ohne sie**: Die Konstante ist benannt
  und liegt an einer Stelle, eine Korrektur ist ein Wort. Die Sperre der bindenden
  Entscheidung (2) ist damit nicht gefallen, sondern umgangen — und das steht an der Konstante.
· **`ensureTrackingKey`.** Ohne Tracking-Schlüssel erreicht **kein Beacon** den Ingest; der
  fehlende Schlüssel erzeugt auf dem Transportweg **gar keinen Verkehr**, nicht nur keinen
  sichtbaren. **Der Unterschied ist der ganze Grund für den Ausschluss:** Ein Zustand, der
  nichts erzeugt, kann nichts stillschweigend falsch machen. Der Vorrats-Eintrag 13 trägt
  seit dem 2026-09-01 einen Vermerk dazu, samt der Bedingung, unter der das kippt.
· **KEINE MIGRATION.** `secret_enc` existiert seit 0025, `'google'` steht seit 0026 im CHECK
  `project_secrets_target_valid`, und der CHECK `project_secrets_secret_genau_eines` hält
  unverändert. **Die Regel "JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE
  CONSTRAINT-ERWEITERUNG MIT" ist für dieses Ziel bereits eingelöst** — der Zielwert ist mit
  0026 dazugekommen.

### 1b als Folgetask — nicht geschnitten, mit fünf Vorbedingungen

**ZEIGER 2026-09-03 — 1b-1 IST GESCHNITTEN. DER TITEL DARÜBER BLEIBT WÖRTLICH STEHEN, UND
SEINE ANGABE "nicht geschnitten" IST DAMIT FÜR DIE ERSTE HÄLFTE ÜBERHOLT.**
**1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) UND 1b-2 (der Takt).** "1b" ohne Suffix
meint weiterhin das PAKET, und **1b-2 IST NICHT GESCHNITTEN**; der Nachtrag dazu steht am
Ende der bindenden Entscheidung (7).
**WARUM DER TITEL NICHT NACHGEZOGEN WIRD:** Er wird zitiert — aus dieser Datei (der
Verdichtungs-Block "Vollzogen — was im Zuschnitt der Scheibe 4 stand" und VERMERK 10,
Abschnitt (g)) und aus Vorrats-Eintrag 44. **Eine Umformulierung machte diese Zeiger tot,
und ein toter Zeiger fällt an keinem Gate auf.**
**WO DER ZUSCHNITT STEHT:** im Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
Scheibe 1b des Schnitts der Phase 11.2", unmittelbar vor den abgeschlossenen
Scheiben-Vermerken. **HIER STEHT KEIN VOLLTEXT UND KEINE ZUSAMMENFASSUNG SEINES INHALTS** —
zwei Fassungen liefen auseinander.

**DIESER ABSCHNITT BLEIBT, UND ZWAR VOLLSTÄNDIG, WEIL SEINE FÜNF VORBEDINGUNGEN WEITER
BINDEN. WELCHE AN WELCHEM SCHRITT HÄNGT, JE EINZELN:**
· **(i) DIE AUSLÖSER-FREQUENZ DER PLATTFORM BINDET 1b-2.** 1b-1 fragt nicht nach einem Takt
  und löst sie nicht ein.
  ZEIGER 2026-09-03: (i) ist gegenstandslos geworden — der Vermerk steht am Ende jener
  Vorbedingung.
· **(v) DIE ERREICHBARKEIT FÜR EINEN MASCHINELLEN AUFRUFER BINDET EBENFALLS 1b-2** — und
  zwar nur, soweit dessen Takt von AUSSEN kommt. 1b-1 lässt die Beweis-Route unverändert
  hinter Sitzung und Eigentums-Gate.
· **(ii) UND (iii) SIND IN DER AUFZÄHLUNG DES ZUSCHNITTS BENANNT, MIT VERSCHIEDENEM AUSGANG:
  (iii), die Obergrenze für `retry`, IST IN 1b-1 AUFGENOMMEN** — sie steht dort unter "Was
  hineingehört — drei Stücke". **(ii), der Nebenläufigkeits-Riegel, IST BEGRÜNDET VERTAGT**
  — der Grund steht unter "Was ausdrücklich draussen bleibt, je mit seinem Grund" und liegt
  in der Form des Riegels, die erst der Takt festlegt.
· **(iv) STEHT UNVERÄNDERT NEBEN BEIDEN SCHRITTEN**, wie sie es schon nach ihrem eigenen
  Wortlaut tut: Der Statuswechsel auf "In Produktion" ist eine Arbeit am Anbieter-Konto und
  keine am Code.
**WER AUS "1b-1 IST GESCHNITTEN" LIEST, DIESER ABSCHNITT SEI ERLEDIGT, LIEST IHN FALSCH.**

**NACHTRAG 2026-09-03 — 1b-2 IST SEIT HEUTE ZUR HÄLFTE GESCHNITTEN. DER SATZ "1b-2 IST NICHT
GESCHNITTEN" WEITER OBEN BLEIBT WÖRTLICH STEHEN und ist als Aussage über seinen Zeitpunkt
richtig; dieser Nachtrag tritt DANEBEN.**
**DER TAKT WIRD IN ZWEI SCHEIBEN GEBAUT: 1b-2a (die Rettung) UND 1b-2b (der Riegel).**
**1b-2a IST GESCHNITTEN, 1b-2b NICHT.** Damit ist 1b-2 weder offen noch erledigt, sondern
halb — und **genau diese Lage hat in dieser Datei bisher keinen Namen gehabt.**
**WO DER ZUSCHNITT STEHT:** im Abschnitt "Die Rettung am Beacon — Scheibe 1b-2a des Schritts
1b-2 der Scheibe 1b", unmittelbar vor den abgeschlossenen Scheiben-Vermerken. **HIER STEHT
KEIN VOLLTEXT UND KEINE ZUSAMMENFASSUNG SEINES INHALTS** — zwei Fassungen liefen
auseinander.
**ES ENTSTEHT KEINE NEUE NUMMER NEBEN 1b:** 1b-2a und 1b-2b sind Scheiben INNERHALB des
Schritts 1b-2, keine dritten Schritte. **Der Satz "1b entsteht in ZWEI SCHRITTEN" am Ende der
bindenden Entscheidung (7) bleibt damit wörtlich wahr**, und die dortige Zeigerzeile führt
hierher zurück.
**WARUM DER VOLLE NACHTRAG HIER STEHT UND NICHT DORT:** Dieser Abschnitt ist der
meistgelesene der beiden Orte — er ist das Pflicht-Gate jedes 1b-Zuschnitts. Eine
Doppelfassung an beiden Stellen liefe auseinander; die Entscheidung (7) trägt deshalb nur
einen Zeiger.
PROVENIENZ: ARCHITEKTEN-FESTLEGUNG 2026-09-03 auf Owner-Entscheidung desselben Tages. Keine
Messung.

**DIESELBE ÜBERHOLTE ANGABE STEHT NOCH EINMAL IM ERSTEN ABSATZ DARUNTER** ("SEIN ZUSCHNITT
IST OFFEN"). **SIE BLEIBT EBENFALLS WÖRTLICH STEHEN und ist als Aussage über den 2026-09-01
richtig**; dieser Zeiger gilt für beide Stellen. **ER STEHT DESHALB DAVOR UND NICHT DANEBEN**
— wer den Abschnitt von oben liest, hat die Auflösung, bevor er auf den Satz trifft.
PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Keine Messung.

**DER OWNER HAT 1b ALS UNMITTELBAREN FOLGETASK BESTÄTIGT; SEIN ZUSCHNITT IST OFFEN.**
**PROVENIENZ: ARCHITEKTEN-EINORDNUNG 2026-09-01, auf Owner-Bestätigung. Keine Messung.**
Dieser Abschnitt schneidet nichts zu — er hält fest, **was vor einem Zuschnitt zu klären ist**.

**SACHKORREKTUR 2026-09-02 — DIE ZAHL IM TITEL. ERSETZT, NICHT GESTEMPELT.** Hier stand "mit
drei Vorbedingungen", und dieselbe Zahl stand an ZWEI weiteren Stellen dieser Datei
(VERMERK 10, Abschnitt (g), und der Verdichtungs-Block "Vollzogen — was im Zuschnitt der
Scheibe 4 stand"). **DER ABSCHNITT FÜHRTE VIER:** Die vierte trug die Wörter "EINE
VORBEDINGUNG" wörtlich und die Einstufung "DIE UNBEQUEMSTE" — sie war als einzige NICHT
nummeriert und fiel deshalb durch jede Zählung.
**DIE ZAHL WIRD IN EINEM SCHRITT AUF FÜNF GESETZT, NICHT AUF VIER.** Gemessen waren vier;
die fünfte ist in DERSELBEN Runde nachgetragen worden (s. (v)). Eine Zwischenstufe "vier"
wäre beim Verlassen dieser Runde bereits wieder falsch gewesen.
**DIE REPARATUR IST DIE NUMMER, NICHT DIE ZAHL:** Jede Vorbedingung trägt ab jetzt eine, und
die Liste zählt sich damit selbst. **Der Text der vierten ist WÖRTLICH unverändert; sie hat
nur ihre Nummer bekommen.**
**DASS DIE ZAHL IM TITEL ÜBERHAUPT STEHENBLEIBT, IST HIER NICHT ENTSCHIEDEN WORDEN.** Diese
Datei führt an zwei anderen Köpfen den Grundsatz "KEINE STÜCKZAHL IN DIESEM KOPF, UND ES
KOMMT KEINE ZURÜCK" (die Köpfe von "Entscheidungen, die über ihre Scheibe hinaus binden" und
von "Vorrat"), und dieser Titel widerspricht ihm. **DIE ENTSCHEIDUNG DARÜBER IST EINE EIGENE
UND STEHT AUS** — hier ist die Zahl richtiggestellt, nicht die Bauform.

**"DREI VORBEDINGUNGEN" IST IN DIESER DATEI MEHRDEUTIG, UND DAS WAR ES SCHON VOR DIESER
KORREKTUR:** VERMERK 3 und VERMERK 4 führen EIGENE Aufzählungen unter der Überschrift
"WELCHE VORBEDINGUNGEN DER TRANSPORT-SCHEIBE DAVON NICHT BERÜHRT SIND — DREI …" bzw.
"— VIER …". Das sind ANDERE Vorbedingungen, und sie gehören der SCHEIBE 4, nicht 1b; **GENAU
EINE ist in beiden Mengen enthalten, die Sieben-Tage-Frist.** **EIN ZITAT DER FORM "die drei
Vorbedingungen" OHNE ABSCHNITTSANGABE TRIFFT NICHT EINDEUTIG.**
**DIE PROVENIENZ-ZEILE VON VERMERK 3 ("Die drei Vorbedingungen sind GEMESSEN am Dateitext")
IST DAVON NICHT BERÜHRT UND BLEIBT WÖRTLICH** — sie zählt JENE Menge und ist für sie richtig.
**PROVENIENZ: GEMESSEN am Dateitext (CC, 2026-09-02)** — Achse: formale Suche über das Repo
nach "drei Vorbedingung", "vier Vorbedingung", "Vorbedingungen von 1b" und "Vorbedingungen
eines 1b" über *.md, *.ts und *.tsx, VIER Treffer, alle in dieser Datei. Gegenprobe auf die
Überschrift "1b als Folgetask": DREI Treffer, davon zwei KURZFORM-Zitate OHNE Zahl — die
Titeländerung macht also keinen Zeiger tot.

**(i) OB DIE PLATTFORM EINEN AUSLÖSER HERGIBT, DER HÄUFIGER ALS STÜNDLICH LÄUFT.**
**UNGEMESSEN — UND ZWAR OHNE JEDE VORARBEIT.**
**SACHKORREKTUR 2026-09-02, ERSETZT UND NICHT GESTEMPELT.** Hier stand: "Instrument:
docs/plattform-befunde.md **plus eine eigene Messung** — die Befund-Datei allein trägt eine
Doku-Lesung, und eine Doku-Lesung ist keine Messung."
**DIE BEFUND-DATEI TRÄGT ZU DIESER FRAGE NICHTS.** GEMESSEN am Dateitext (CC, 2026-09-02):
docs/plattform-befunde.md hat **keinen Vercel-Abschnitt**; ihr "Verzeichnis der Abschnitte"
führt GENAU EINEN Eintrag, "Supabase (Postgres · Auth · RLS · Vault · Backups)". Eine Suche
über die Datei nach "cron", "Zeitplan" und "stündlich" trifft EINE Stelle, und die liegt im
Supabase-Abschnitt (Teil (m), ein zitiertes `cron.schedule`-Beispiel aus der Vault-Doku, dort
selbst als "EIN BEISPIEL, KEINE REGEL" eingestuft).
**DAS INSTRUMENT IST ALSO NICHT SCHWÄCHER ALS BESCHRIEBEN, SONDERN NICHT VORHANDEN:** Die
abschnittsweise Anbieter-Lesung für die Plattform-Klasse, zu der dieser Auslöser gehört,
**STEHT KOMPLETT AUS** — sie ist nie gefahren worden, und es gibt keinen Ort, an dem ihre
Befunde lägen. Die Auflage dafür steht in docs/immer-beachten.md, "EIN NEUER ANBIETER WIRD
ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN UND DIE BEFUNDE VERORTET
SIND — UND DAS GILT FÜR JEDE ANBIETER-KLASSE, NICHT NUR FÜR FAN-OUT-ZIELE".
**DER UNTERSCHIED IST DER GANZE PUNKT UND KEINE SPITZFINDIGKEIT:** Wer eine SCHWÄCHERE
Antwort erwartet, schlägt nach, findet nichts, hält es für ein Suchproblem und gibt auf.
**Wer weiss, dass es KEINE gibt, plant die Lesung ein.**
**KEINE EMPFEHLUNG**, welche Anbieter-Seiten zu lesen wären oder ob für diese Klasse ein
eigener Fragenkatalog entsteht — beides ist eine eigene Entscheidung.
**WAS AM REPO ENTSCHEIDBAR IST UND HIER NUR DEN RAHMEN ABSTECKT:** Heute ist KEIN Auslöser
irgendeiner Frequenz eingerichtet — es gibt keine `vercel.json`, eine formale Suche über
`src/`, `next.config.ts` und `package.json` nach "cron", "crons" und "CRON_SECRET"
(case-insensitiv) trifft nichts, und `supabase/` trägt nur `checks`, `manual` und
`migrations`, keine Edge Function und keinen Treffer auf `pg_cron` oder `pg_net`. **DAS
BEANTWORTET DIE FRAGE NICHT** — es sagt, was NICHT eingerichtet ist, nicht, was die Plattform
HERGIBT. GEMESSEN am Repo (CC, 2026-09-02).
**DER ARCHITEKT HAT HIERZU EINE ERINNERUNG UND KEINEN BEFUND; SIE WIRD AUSDRÜCKLICH NICHT ALS
PRÄMISSE GEFÜHRT.** Der Satz steht hier, weil eine unbelegte Erinnerung sonst beim nächsten
Lesen wie ein Stand aussieht — und weil an dieser Zahl der ganze Zuschnitt von 1b hängt: Ein
Auslöser, der seltener läuft als das Zugangsdatum lebt, löst das Problem nicht.

**NACHGETRAGEN 2026-09-02 — DIE ANBIETER-LESUNG IST GEFAHREN. DIE ABSÄTZE DARÜBER BLEIBEN
WÖRTLICH STEHEN**, einschliesslich der Sachkorrektur zum Instrument: Sie beschreibt den Zustand
VOR dieser Lesung und ist als Zeitdokument richtig. **Was sich ändert, ist nicht ihr Wortlaut,
sondern der Zustand der Vorbedingung.**
**DER VOLLTEXT STEHT NICHT HIER, SONDERN IN docs/plattform-befunde.md** — Abschnitt "Vercel",
Teile (a) bis (g), und Abschnitt "Supabase", Teile (ab) bis (ag). **Zweimal geschrieben liefe
es auseinander;** was hier steht, ist der Zeiger plus die eine Folge je Anbieter.

· **VERCEL SCHEIDET AUF DEM HEUTIGEN TARIF AUS.** Hobby erlaubt **einmal pro Tag**, und
  häufigere Ausdrücke **scheitern beim Deploy**; die Auslösezeit ist zusätzlich auf ±59 Minuten
  ungenau. Gegen ein Zugangsdatum, das **3599 Sekunden** lebt (Festlegung (4) dieser Scheibe),
  trägt das nicht. Pro und Enterprise erlauben einmal pro Minute. **Zeiger:**
  docs/plattform-befunde.md, "Vercel", Teil (a) — dort auch die Falle der Übersichtsseite, die
  Minuten-Granularität ohne Tarif-Vorbehalt zeigt.
· **SUPABASE TRÄGT DIE FREQUENZ.** Supabase Cron (pg_cron) reicht von **jeder Sekunde bis
  einmal im Jahr**; der HTTP-Weg nach aussen läuft über `pg_net`. **Zeiger:**
  docs/plattform-befunde.md, "Supabase", Teile (ac) bis (af) — dort auch die Versions-
  Vorbedingung der Sekunden-Granularität und die Rechte-Lage von `pg_net`.

**DIE VORBEDINGUNG IST DAMIT NICHT ERLEDIGT, SONDERN VERSCHOBEN — UND DIESER ABSATZ IST DER
WICHTIGERE TEIL DES NACHTRAGS:** **ALLES AN DIESER LESUNG IST GELESEN, NICHTS IST GEMESSEN.**
Der Satz "eine Doku-Lesung ist keine Messung" gilt unverändert; er ist durch diesen Nachtrag
nicht eingelöst, sondern bestätigt. **WAS EINE MESSUNG WÄRE, IST HIER NICHT ZU ENTSCHEIDEN**,
und es wird auch kein Anbieter ausgewählt: "Vercel scheidet aus" ist eine Aussage über einen
gelesenen Tarif, keine Wahl zugunsten des anderen.

**DREI EIGENSCHAFTEN AUS DIESER LESUNG BINDEN EINEN ZUSCHNITT — ALS ZEIGER, NICHT ALS KOPIE:**
· **DOPPELTE LÄUFE SIND VORGESEHEN**, und verpasste ebenso; der Anbieter verlangt Idempotenz.
  docs/plattform-befunde.md, "Vercel", Teil (c), Punkt 3 — dort auch Punkt 4, die Nebenläufigkeit,
  die der Anbieter als Problem des Aufrufers führt. **Das berührt Vorbedingung (ii) und
  Vorrats-Eintrag 9;** ausgewertet wird es hier nicht, und der dortige Trigger ist NICHT
  eingetreten.
· **KEINE WIEDERHOLUNG BEI FEHLSCHLAG.** Ebenda, Punkt 2. **Das berührt Vorbedingung (iii) und
  Vorrats-Eintrag 10** — die Obergrenze für `retry` bekäme damit auf der Vercel-Seite keinen
  Helfer.
· **`pg_net` IST BETA, UND SEINE SIGNATUREN KÖNNEN SICH ÄNDERN.** docs/plattform-befunde.md,
  "Supabase", Teil (ae) — dort auch Zeitlimit, Commit-Bindung, unlogged tables und die Grenze
  von 200 Anfragen je Sekunde.

**KEIN ZUSCHNITT. DIE VORBEDINGUNG BLEIBT OFFEN; ihr Zustand ist ein anderer.**
PROVENIENZ: **GELESEN 2026-09-02** (CC, Browser-Werkzeug, `textContent`), zwölf Vercel- und
vier Supabase-Seiten, Umfang je Seite in den genannten Abschnitten. **KEINE Messung an einer
Schnittstelle, keine am eigenen Dashboard, keine an dieser Datenbank.**

**VERMERK 2026-09-03 — DIESE VORBEDINGUNG BINDET 1b-2 NICHT MEHR. SIE IST GEGENSTANDSLOS
GEWORDEN, NICHT FALSCH. DER GESAMTE TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN,
EINSCHLIESSLICH DER GEFAHRENEN PLATTFORM-LESUNG UND IHRER BEFUNDE.**
**DER GRUND IN EINEM SATZ:** Der Takt ist VERKEHRSGETAKTET (OWNER-ENTSCHEIDUNG 2026-09-03) —
die Erneuerung hängt am eintreffenden Beacon. **ES GIBT KEINEN ZEITPLAN, DESSEN FREQUENZ ZU
KLÄREN WÄRE.** Die Frage hat damit keinen Adressaten mehr; sie ist nicht beantwortet und
nicht widerlegt, sondern gegenstandslos.

**WARUM DAS DER TEUERSTE DER DREI HEUTE NACHGEZOGENEN PUNKTE IST — DIESER SATZ TRÄGT DEN
GANZEN VERMERK:** Der Absatz oben ordnet eine **ARBEIT** an. Er sagt, die abschnittsweise
Anbieter-Lesung für diese Plattform-Klasse "STEHT KOMPLETT AUS", und er sagt ausdrücklich:
"Wer weiss, dass es KEINE gibt, **plant die Lesung ein**." **WER IHN OHNE DIESEN VERMERK
LIEST, PLANT SIE EIN UND STELLT ERST DANACH FEST, DASS DIE FRAGE KEINEN ADRESSATEN MEHR
HAT.**
**EINE GEGENSTANDSLOSE ARBEITSANWEISUNG SCHICKT DIE NÄCHSTE RUNDE LOS — SIE IST TEURER ALS
EINE ÜBERHOLTE BESCHREIBUNG.** Eine Beschreibung liest man falsch; eine Anweisung führt man
aus. Es ist dieselbe Klasse wie die fünfte überholte Angabe in VERMERK 10, Abschnitt (b)
("DAS IST EINE ARBEITSANWEISUNG FÜR EINE ERLEDIGTE ARBEIT und die teuerste der fünf").

**WAS AUSDRÜCKLICH BLEIBT UND NICHT GESTRICHEN WIRD — DIE PLATTFORM-LESUNG VOM 2026-09-02
SAMT IHREN BEFUNDEN:** die zwei Spiegelstriche wenige Zeilen darüber (Vercel · Supabase), die
drei Eigenschaften, die einen Zuschnitt binden, und die Zeiger nach
docs/plattform-befunde.md. **HIER STEHT KEINE ZAHL UND KEIN BEFUND IM WORTLAUT**, und das ist
Absicht: Sie stehen im selben Abschnitt darüber und im Volltext in docs/plattform-befunde.md
— **eine dritte Fassung liefe neben beiden auseinander.**
**SIE ÜBERLEBEN DIE TAKT-WAHL, und das ist der Grund für ihr Stehenbleiben:** Sobald
IRGENDETWAS in diesem Projekt einen Zeitplan braucht — gleich für welchen Gegenstand —, wird
genau das wieder gebraucht. **Die Lesung ein zweites Mal zu fahren wäre der Preis für eine
Streichung, die nichts einbringt.**

**DIE BEDINGUNG, UNTER DER (i) WIEDER BINDET:** der erste Zuschnitt in diesem Projekt, der
einen **ZEITGETAKTETEN** Auslöser vorsieht — **gleich für welchen Gegenstand**, nicht nur für
die Erneuerung.

**VORBEDINGUNG (v) IST DAVON NICHT BETROFFEN, und das gehört hierher, weil beide an DERSELBEN
Wahl hängen und nur EINE von ihr entwertet wird:** Sie trägt ihre Einschränkung selbst — "und
zwar nur, soweit dessen Takt von AUSSEN kommt" (s. den Zeiger-Block am Kopf dieses
Abschnitts) —, und der Takt kommt **nicht** von aussen. Ein verkehrsgetakteter Auslöser läuft
im selben Prozess und stellt keine Anfrage; die Umleitung aus `updateSession` trifft ihn
nicht. **(v) bleibt damit inhaltlich richtig und wird durch die Wahl schlicht nicht ausgelöst
— das ist etwas anderes als gegenstandslos.**

PROVENIENZ: ARCHITEKTEN-FESTLEGUNG 2026-09-03 auf Owner-Entscheidung desselben Tages. Keine
Messung.

**(ii) VORRATS-EINTRAG 9 WIRD UNTER EINEM AUTOMATISMUS SCHARF.** "KEIN
NEBENLÄUFIGKEITS-RIEGEL BEI DER ERNEUERUNG" ist heute harmlos, weil ein Mensch klickt; sein
eigener TRIGGER nennt "ein Auslöser (Scheibe 1b), der die Funktion nachweislich nebenläufig
ruft". Die **zweite Achse** jenes Eintrags — Ausstellungs- und Schreibreihenfolge können
divergieren — ist ausdrücklich **UNGEMESSEN**.

**(iii) VORRATS-EINTRAG 10 EBENSO.** "`retry` HAT KEINE OBERGRENZE, UND SCHEIBE 1b MUSS EINE
LIEFERN" trägt den Zuschnitt von 1b als seinen Trigger. Drei Ausgänge können dauerhaft sein
und trotzdem `retry` melden; unter einem Automatismus ist das eine Schleife, die je Durchlauf
einen echten Erneuerungsruf verbraucht.

**(iv) DAZU EINE VORBEDINGUNG, DIE KEIN CODE IST — UND SIE IST DIE UNBEQUEMSTE:** Im
Publishing-Status "Testing" stirbt das **ERNEUERUNGS**-Token nach **sieben Tagen**.
**EIN PERFEKTER AUTOMATISMUS HÄLT DAS ZUGANGSDATUM EINE WOCHE AM LEBEN UND FÄLLT DANN
TROTZDEM AUS.** Der Statuswechsel auf "In Produktion" mit Googles Verifizierung steht
**NEBEN** 1b, **nicht in ihm** — es ist eine Arbeit am Anbieter-Konto und keine am Code.
**Wer 1b baut und diesen Satz überliest, hat nach sieben Tagen denselben stummen Ausfall wie
ohne 1b, nur später.**
**DER TEXT DIESER VORBEDINGUNG IST AM 2026-09-02 WÖRTLICH UNVERÄNDERT GEBLIEBEN; SIE HAT NUR
IHRE NUMMER BEKOMMEN** (s. die Sachkorrektur am Kopf dieses Abschnitts).
**DIE FRIST IST NICHT NUR GELESEN — VERMERK 6, Ableitung 3, FINDET SIE AN EIGENEN DATEN
WIEDER:** Der Abstand der beiden Uhren beträgt dort **601 200 Sekunden, sieben Tage minus
eine Stunde** — reine Arithmetik auf ZWEI GEMESSENEN Werten aus unserem eigenen Fluss.
**WER NUR DEN SATZ OBEN LIEST, HÄLT DIE FRIST FÜR EINE REINE DOKU-ANGABE UND DAMIT FÜR
SCHWÄCHER BELEGT, ALS SIE IST.** Dort steht auch, was daran NICHT auflösbar ist (ob die
Rohwerte 3599/604799 oder 3600/604800 lauten). **VERMERK 6 IST DAFÜR NICHT ANGEFASST WORDEN.**
PROVENIENZ: die Frist selbst **GELESEN 2026-08-25** (docs/ziel-befunde.md, Google-Abschnitt,
Teil (af)); die Wiederfindung an eigenen Daten **GERECHNET** auf zwei Werten, die am
2026-08-29 (OWNER) an der ausgelieferten Anwendung GEMESSEN worden sind — keine dritte
Beobachtung.

**NACHTRAG 2026-09-03 — DIE FRIST HAT JETZT EIN KONKRETES DATUM AN UNSEREN EIGENEN DATEN.
DER TEXT DER VORBEDINGUNG DARÜBER BLEIBT WÖRTLICH STEHEN; dieser Nachtrag tritt DANEBEN.**
**AUS DEM LIVE-TEST DES SCHRITTS 1b-1** (GEMESSEN 2026-09-03, OWNER; s. VERMERK 11,
Abschnitt (b)): `accessTokenExpiresAt` **1788431623**, `refreshTokenExpiresAt.epochSeconds`
**1788868675**, Abstand **437 052 Sekunden**.
**ERSETZT AM 2026-09-04 — DER TERMIN IST ÜBERHOLT. HIER STAND: "DAS ERNEUERUNGS-TOKEN
STIRBT AM 2026-09-08 GEGEN 11:58 UTC."**
**DER NEUE TERMIN: 2026-09-11, 07:26:58 UTC (09:26:58 Ortszeit)** — aus
`refreshTokenExpiresAt.epochSeconds` **1789111618**, GEMESSEN 2026-09-04 (OWNER) beim
Live-Test der Scheibe 11.2b; s. VERMERK 13, Abschnitt (b).
**WARUM ER SICH VERSCHOBEN HAT, UND ES IST KEIN MESSFEHLER: ZWEI NEU-VERBINDUNGEN HABEN DIE
FRIST ZURÜCKGESETZT.** Das Neu-Verbinden ersetzt die Nutzlast GANZHEITLICH
(`toOAuthPayload` → `formatOAuthPayload` → `encryptSecret` → Upsert), und die zweite Uhr
beginnt damit neu.
**DAS IST KEIN WIDERSPRUCH ZU VERMERK 5, und der Satz gehört zwingend dazu:** Jener misst
die EINLÖSUNG — die Erneuerung verlängert die zweite Uhr NICHT, sie läuft weiter. Dieser
misst das NEU-VERBINDEN. **Zwei verschiedene Vorgänge, zwei verschiedene Wirkungen;** wer
sie zusammenzieht, hält einen der beiden Befunde für widerlegt.
**ERSETZT UND NICHT GESTEMPELT, und der Grund ist der RANG dieser Zeile:** Sie ist ein
TERMIN, kein Zeitdokument. Ein Stempel liesse zwei Daten nebeneinander stehen — und wer
das falsche nimmt, **wartet am 8.9. auf einen Ausfall, der nicht kommt, und hält die Karte
für kaputt.**
**DIE ZWEI MESSWERTE DES 2026-09-03 DARÜBER BLEIBEN WÖRTLICH STEHEN.** Sie sind eine
Beobachtung jenes Tages und als solche unverändert richtig; überholt ist allein, was aus
ihnen für die ZUKUNFT gefolgert wurde.
PROVENIENZ: der Wert **GEMESSEN 2026-09-04 (OWNER)**; Datum und Ortszeit **GERECHNET**
(CC, 2026-09-04) und ausdrücklich nicht übernommen.
**SACHKORREKTUR AN DER VORGABE DIESER RUNDE, GERECHNET STATT ÜBERNOMMEN:** Die Vorgabe
nannte "gegen 12:07 UTC". `1788868675` ist **2026-09-08T11:57:55Z** — rund neun Minuten
früher. Die Zahl ist hier NEU GERECHNET und nicht abgeschrieben worden; die vorgegebene ist
nicht übernommen.
**DIE ABWEICHUNG ZU VERMERK 6 IST KEIN WIDERSPRUCH, und das gehört zwingend dazu:** Dort
betrug der Abstand der beiden Uhren **601 200 Sekunden** (sieben Tage minus eine Stunde),
weil UNMITTELBAR NACH DEM VERBINDEN gemessen wurde — beide Uhren waren frisch. **Hier steht
ein ÄLTERES Erneuerungs-Token neben einem frischen Zugangsdatum**, und der Abstand
schrumpft entsprechend: 601 200 minus 437 052 sind 164 148 Sekunden, also **rund 1,9 Tage**.
Der Abstand der beiden Uhren ist damit **kein Messwert über die Frist, sondern über das
ALTER des Erneuerungs-Tokens** — wer ihn als Frist liest, liest ihn falsch.
**DIE UNSCHÄRFE AUS VERMERK 6 TRÄGT DAS DATUM MIT:** Ob die Rohwerte 3599/604799 oder
3600/604800 lauten, ist **NICHT auflösbar** — die Antwort des Anbieters wird nicht geloggt,
und das bleibt so. Das Datum ist auf die Sekunde gerechnet und auf diese Unschärfe hin zu
lesen.
**KEINE EMPFEHLUNG**, was vor dem TERMIN zu geschehen hat — weder ein Neu-Verbinden noch
ein Statuswechsel ist hier vorgeschlagen. (Hier stand "vor dem 2026-09-08"; das Datum ist
mit der Ersetzung oben weg, **und es kommt hier keines zurück** — ein zweites Datum im
selben Block wäre genau die Doppelung, die diese Runde beseitigt hat.) Die Vorbedingung selbst bleibt, was sie ist: eine
Arbeit am ANBIETER-KONTO und keine am Code.
PROVENIENZ: die zwei Werte **GEMESSEN 2026-09-03 (OWNER)**; Abstand, Datum und die
Differenz zu VERMERK 6 **GERECHNET** (CC, 2026-09-03) — keine zweite Beobachtung.

**(v) DIE BEWEIS-ROUTE IST FÜR EINEN MASCHINELLEN AUFRUFER HEUTE NICHT ERREICHBAR — ZEIGER,
KEINE KOPIE.**
Der Volltext steht in docs/offene-punkte.md, Eintrag "DIE MIDDLEWARE LEITET API-ROUTEN AUF
EINE HTML-SEITE UM"; sein Trigger lautet dort wörtlich "der erste programmatische Aufrufer
einer API-Route, **spätestens Scheibe 1b**". **ER WIRD HIER NICHT VERDOPPELT** — zwei
Fassungen liefen auseinander.
**WAS DER ZEIGER TRAGEN MUSS, DAMIT ER OHNE DEN VOLLTEXT BRAUCHBAR IST:** Ein Aufruf gegen
`/api/oauth/google/refresh` **OHNE SITZUNG** endet in einer Umleitung auf `/login`, und dort
antwortet Next mit **405**; der Handler wird nicht erreicht. **FOLGE: EIN MASCHINELLER
AUSLÖSER KANN DIE BESTEHENDE BEWEIS-ROUTE NICHT ERREICHEN.**
**DAS IST KEINE RANDBEDINGUNG, SONDERN EIN RIEGEL VOR DEM ZUSCHNITT:** Vorbedingung (i) fragt
danach, OB es einen Auslöser gibt; dieser Punkt sagt, dass ein solcher Auslöser am HEUTIGEN
Weg scheitert, **gleich wie oft er läuft**. Wer (i) beantwortet und diesen Punkt nicht liest,
hat die halbe Frage beantwortet.
**HIER STEHT AUSDRÜCKLICH KEINE EMPFEHLUNG**, wie die Umleitung zu umgehen oder der Zugang
anders zu bauen wäre; der Eintrag selbst führt dazu ebenfalls keine.
**WARUM ER BIS HEUTE NICHT IM 1b-ABSCHNITT STAND:** Er ist am 2026-08-29 aus dem Live-Test
der Scheibe 1a entstanden und dort verortet worden, dieser Abschnitt ist am 2026-09-01
geschrieben worden. **BEIDE TEXTE WAREN FÜR SICH VOLLSTÄNDIG; DIE VERBINDUNG FEHLTE.**
PROVENIENZ: die Umleitung **GEMESSEN LIVE (Stefan, 2026-08-29**, Schritt 5 des Live-Tests der
Scheibe 1a — s. den Eintrag). Dass der Trigger jenes Punktes auf 1b zeigt und im 1b-Abschnitt
nicht genannt war, ist **GEMESSEN am Dateitext (CC, 2026-09-02)**. Die Folge für einen
maschinellen Auslöser ist eine **ABLEITUNG** aus der gemessenen Umleitung, keine zweite
Messung.

**WAS AN 1b UNGEMESSEN BLEIBT — AN EINER STELLE, ALS ZEIGER (2026-09-02).**
**DIESE LISTE FÜHRT NICHTS NEUES EIN.** Jeder Posten steht anderswo im Volltext; hier steht
er, damit der nächste Zuschnitt ihn an EINER Stelle findet statt in vier Dateien. **WER EINEN
POSTEN BRAUCHT, LIEST IHN DORT** — eine zweite Fassung liefe auseinander.
· **DIE AUSLÖSER-FREQUENZ DER PLATTFORM.** Vorbedingung (i) in diesem Abschnitt; dort steht
  auch, dass es zu ihr KEINE abgelegte Anbieter-Lesung gibt.
  **VERMERK 2026-09-03 — DIESER POSTEN IST IN BEIDEN HÄLFTEN ÜBERHOLT, UND ZWAR SEIT ZWEI
  VERSCHIEDENEN TAGEN. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK
  TRITT DANEBEN.**
  **ERSTE HÄLFTE — DER POSTEN SELBST, ÜBERHOLT SEIT HEUTE:** Der Takt ist verkehrsgetaktet
  (OWNER-ENTSCHEIDUNG 2026-09-03), es gibt keinen Zeitplan, dessen Frequenz zu klären wäre.
  Die Frage ist damit **gegenstandslos** — nicht beantwortet und nicht widerlegt. Der
  Volltext samt der Bedingung, unter der sie wieder bindet, steht im Vermerk am Ende von
  Vorbedingung (i).
  **ZWEITE HÄLFTE — DER NEBENSATZ, FALSCH SEIT DEM 2026-09-02:** "dort steht auch, dass es zu
  ihr KEINE abgelegte Anbieter-Lesung gibt" traf auf den Tag zu, an dem diese Liste entstand,
  und **wurde am SELBEN Tag von der gefahrenen Lesung überholt** (zwölf Vercel- und vier
  Supabase-Seiten, GELESEN 2026-09-02). Der Nachtrag dazu steht seither an (i); **diese Liste
  ist damals nicht mitgezogen worden.**
  **WARUM BEIDE HÄLFTEN IN EINEM VERMERK STEHEN UND NICHT NUR DIE ERSTE:** Wer nur die
  überholte Frage auflöste, machte den Nebensatz zur Falle — der Posten sähe behandelt aus,
  und die falsche Angabe stünde weiter da. Es ist genau der Fall, den
  docs/immer-beachten.md unter "WER EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE
  ZUR FALLE" führt.
  **DER POSTEN WIRD NICHT GESTRICHEN UND NICHT UMFORMULIERT.** Die Liste sagt von sich
  selbst, dass sie nichts Neues einführt und jeder Posten anderswo im Volltext steht — dann
  gehört auch seine Auflösung dorthin und nicht hierher.
  PROVENIENZ: die erste Hälfte eine ARCHITEKTEN-FESTLEGUNG 2026-09-03 auf Owner-Entscheidung
  desselben Tages; dass die zweite seit dem 2026-09-02 falsch ist, ist **GEMESSEN am
  Dateitext** (CC, 2026-09-03) — der Nachtrag an (i) und diese Zeile tragen dasselbe Datum.
· **OB GOOGLE EIN VORHERIGES ZUGANGSDATUM BEI AUSSTELLUNG EINES NEUEN ENTWERTET.**
  Vorrats-Eintrag 9, ZWEITE Achse ("AUSSTELLUNGS- UND SCHREIBREIHENFOLGE KÖNNEN DIVERGIEREN")
  — dort ausdrücklich als UNGEMESSEN geführt; derselbe Sachverhalt steht als ACHSE 2 im
  Kommentarkopf von src/lib/oauth/token-refresh.ts.
· **WAS GOOGLE NACH ABLAUF DER SIEBEN-TAGE-FRIST ANTWORTET** — Statuscode, Rumpfform, und ob
  überhaupt `invalid_grant`. docs/ziel-befunde.md, Teil (bz) ("DER FEHLERCODE FÜR EIN TOTES
  ERNEUERUNGS-TOKEN IST UNGEMESSEN"); Teil (bd) hält `invalid_grant` GELESEN fest, aber für
  den CODE-TAUSCH und NICHT für die ERNEUERUNG.
· **OB `refresh_token_expires_in` NACH EINEM STATUSWECHSEL WEITER GELIEFERT WIRD.**
  docs/ziel-befunde.md, Teil (bx) — dort ausdrücklich offen, mit dem Satz "WER SIE TRENNEN
  WILL, BRAUCHT DIESELBE MESSUNG NACH DER VERIFIZIERUNG".
**WAS DIESE LISTE NICHT IST: eine Reihenfolge, eine Auswahl, oder eine Aussage darüber,
welcher Posten vor einem Zuschnitt zwingend beantwortet sein muss.** Sie führt zusammen, was
ungemessen ist; entschieden ist damit nichts.
PROVENIENZ: reine ZUSAMMENFÜHRUNG bestehender Angaben, GEMESSEN am Dateitext (CC,
2026-09-02). **Keine der vier Angaben ist hier neu erhoben**, und keine ist umformuliert.

## Die Klammer um die Erneuerung — Schritt 1b-1 der Scheibe 1b des Schnitts der Phase 11.2

**DIE KURZFORM WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT:** **"1b" OHNE SUFFIX
MEINT DAS ARBEITSPAKET** — den automatischen Auslöser, wie ihn die bindende
Entscheidung (6) als zweite Hälfte der Nummer 1 des Schnitts führt. **1b ENTSTEHT IN ZWEI
SCHRITTEN: 1b-1 (die Klammer, DIESER Abschnitt) und 1b-2 (der Takt).**
**DIE BEIDEN SCHRITTE TRAGEN IHR SUFFIX AUSNAHMSLOS. EIN ZITAT DER FORM "SCHEIBE 1b" OHNE
SUFFIX MEINT DAS PAKET UND NIE EINE HÄLFTE** — das gilt für die bestehenden Zitate in dieser
Datei, in docs/offene-punkte.md und in den Trigger-Wortlauten des Vorrats, und sie sind
deshalb ausdrücklich NICHT nachgezogen worden.
**ES GIBT KEINE SCHEIBE 1c.** Wer eine sucht, sucht einen Namen, der nie vergeben wurde.
**1b-1 IST NICHT DIE SCHEIBE 1a:** jene ist gebaut und live bewiesen (VERMERK 6) und trägt
ihren eigenen Abschnitt weiter oben. Wie bei den vier Zuschnitten davor steht deshalb der
INHALT im Titel und die Kurzform dahinter.

**PROVENIENZ — SIE WIRD HIER GETRENNT GEFÜHRT, WEIL SONST EIN NAME, DEN DER ARCHITEKT
VERGEBEN HAT, EINE OWNER-PROVENIENZ BEKÄME:**
· **OWNER-ENTSCHEIDUNG 2026-09-03:** dass der Takt in DIESEM Schritt **NICHT gebaut wird.**
· **ARCHITEKTEN-FESTLEGUNG 2026-09-03:** die **Benennung 1b-1 / 1b-2** und der **Verzicht auf
  eine Scheibe 1c**. Sie ist auf eine CC-Meldung derselben Runde gefallen.
· **PROVENIENZ DES ÜBRIGEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
  ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Keine Messung.** Jede mit GEMESSEN
  gekennzeichnete Angabe stammt aus der Aufklärungsrunde vom 2026-09-03 (CC, am Repo).

### Was Schritt 1b-1 ist

**Eine Klammer JE PROJEKT um `refreshAccessToken` (src/lib/oauth/token-refresh.ts), in einer
REINEN Datei — kein `"use server"` —, deren Autorisierung beim AUFRUFER liegt.** Sie
beantwortet für EIN Projekt die Frage "erneuern, und was ist dabei herausgekommen", und sie
beantwortet sie **ohne jeden Auslöser**.

**DER TITEL WEICHT ABSICHTLICH VON DENEN DER VIER ANDEREN ZUSCHNITTE AB** ("Was sie ist",
"Was Scheibe 3 ist", "Was diese Fix-Scheibe ist", "Was Scheibe 4 ist"): Zwei zeichengleiche
`###`-Überschriften in DERSELBEN Datei machen jeden Such-Anker mehrdeutig, und der erste
Treffer wäre systematisch der falsche (docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT").

**WAS ER NICHT IST — UND DIESER SATZ STEHT GANZ VORN, WEIL ER DIE GRÖSSTE ERWARTUNG AN EINE
ARBEIT MIT DIESER NUMMER BRICHT: 1b-1 BAUT KEINEN AUSLÖSER.** Kein Zeitplan, kein Haken am
Verkehr, kein Aufruf aus `after()`. **DER TAKT IST DER ZWEITE SCHRITT, 1b-2** —
OWNER-ENTSCHEIDUNG 2026-09-03, dass er in diesem Schritt nicht gebaut wird.
**WER 1b-1 BAUT UND DANACH ERWARTET, DASS EIN ZUGANGSDATUM VON SELBST AM LEBEN BLEIBT, HAT
DIESELBE LAGE WIE NACH 1a:** Das Werkzeug ist gebaut, und niemand ruft es. Die Aussage aus
VERMERK 10, Abschnitt (g) — ein Projekt sendet an Google nur innerhalb einer Stunde —
**bleibt nach 1b-1 wahr.**
**DAS IST KEIN WIDERSPRUCH ZUR GRENZE DER BINDENDEN ENTSCHEIDUNG (7), SONDERN IHRE
ANWENDUNG:** "1b löst das eigentliche Problem" bleibt wahr und meint das PAKET; "1a ALLEIN
HÄLT KEINEN ZUGANG AM LEBEN — eine Funktion, die niemand ruft, erneuert nichts" **gilt für
1b-1 gleichlautend.** Der Nachtrag dazu steht am Ende jener Entscheidung und wird hier NICHT
verdoppelt.

### Vollzogen — was im Zuschnitt des Schritts 1b-1 stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH AB, aus demselben Grund wie bei Scheibe 3, der Fix-Scheibe,
Scheibe 2 und Scheibe 4:** "Vollzogen — was hier stand und wohin es gegangen ist" steht in
dieser Datei bereits zweimal und ist als Hausform über Standdateien hinweg
Hebungs-Kandidat 5. **DIE ZITATE UNTEN STEHEN OHNE `###`-MARKE** — die Auflage aus
docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
VERZEICHNIS NICHT" (Zusatz 2026-08-27): Ein Titel-Zitat mit Marke kollidierte für immer mit
jeder künftigen Überschrift desselben Wortlauts.

VERDICHTET AM 2026-09-03, nach dem Bau-Commit `6bc01ed` und dem Live-Test. Hier standen die
ANWEISUNGEN FÜR den Schritt; sie sind mit dem Vollzug abgelaufen. DREI Unterabschnitte sind
entfallen. **JEDES DER DREI STÜCKE TAUCHT IN VERMERK 11 WIEDER AUF — das ist die Bedingung,
unter der überhaupt gestrichen werden durfte:** Der Zuschnitt ist der Maßstab, gegen den der
Vermerk misst, und der Verlauf ist kein Ersatz (er wird beim Pflicht-Gate nicht gelesen).

- **"Was hineingehört — drei Stücke"** nannte die Klammer, die Obergrenze aus
  Vorrats-Eintrag 10 und die Umverdrahtung der Beweis-Route. **Alle drei sind gebaut und
  sagen sich am Code selbst.** **WO ES WIEDER AUFTAUCHT:** VERMERK 11, Abschnitt (a), in
  Symbolen — einschliesslich der Angabe, dass `attempts` NICHT nach aussen geht.
  **SEINE EINE FORTWIRKENDE ZEILE IST NICHT VERSCHWUNDEN:** Dass der Riegel aus
  Vorbedingung (v) weder berührt noch umgangen wird — die Route bleibt POST, bleibt hinter
  Sitzung und Eigentums-Gate —, steht als Live-Schritt 5 in VERMERK 11, Abschnitt (b), und
  ist dort GEMESSEN statt zugesagt.
- **"Die offene Entwurfsfrage — 'Obergrenze' hat drei Lesarten"** legte drei Lesarten vor
  und entschied keine. **SIE IST ENTSCHIEDEN** (OWNER, 2026-09-03): gebaut ist die
  WIEDERHOLUNG MIT DECKEL INNERHALB EINES AUFRUFS. **WO ES WIEDER AUFTAUCHT:** VERMERK 11,
  Abschnitt (a) — dort steht auch der Grund, warum die dritte Lesart im Scope NICHT BAUBAR
  ist, und **dieser Grund bindet über den Schritt hinaus**: `unexpected` bündelt dauerhafte
  und vorübergehende Fälle, und die Angabe, die sie trennte, wird in `token-refresh.ts`
  verworfen. Wer die Klassifikation später angeht, findet die Vorbedingung dort.
- **"Die Beweis-Achse des Schritts 1b-1"** war die ANLEITUNG für den Live-Test — die
  bestehende Route, `fetch` aus dem eingeloggten Tab, kein Bedienelement. **Sie ist
  gefahren.** **WO ES WIEDER AUFTAUCHT:** VERMERK 11, Abschnitt (b) mit den fünf Schritten,
  und Abschnitt (c) mit dem, was sie NICHT gezeigt hat — dort um den Befund erweitert, dass
  der Nachweis eine REGRESSION ist und keine Erneuerung.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen:** die drei Befunde, die Form je Projekt samt ihrem Grund, die
Ausschlüsse mit ihren Gründen, die vier Invarianten und "Was dieser Zuschnitt offen lässt".
Sie sind GRÜNDE, BEFUNDE und GRENZEN, keine Anweisungen, und **jede von ihnen bindet
1b-2** — die Befunde tragen die Takt-Wahl, die Ausschlüsse sagen, was dort erst fällig
wird, und die Invarianten gelten dem gebauten Zustand, nicht dem Bauvorgang.

### Die drei Befunde, die diesen Zuschnitt tragen

**GEMESSEN am Repo (CC, 2026-09-03), Aufklärungsrunde desselben Tages.** Als Ort steht der
SYMBOLNAME und nie eine Zeilennummer — Fortschreibungs-Regel dieser Datei.

**(1) DER ABLAUFZEITPUNKT STECKT IM CHIFFRAT, IN KEINER SPALTE.**
`accessTokenExpiresAt` ist ein Feld der Nutzlast `OAuthPayload`
(src/lib/secrets/oauth-payload.ts). Sichtbar wird es ausschliesslich über `decryptSecret`
(src/lib/secrets/cipher.ts) und `parseOAuthPayload`; `project_secrets` trägt dafür KEINE
Spalte.
**FOLGE, UND SIE IST DER GRUND FÜR DIE FORM DIESES SCHRITTS:** Ein Zeitplan IN DER DATENBANK
kann nicht entscheiden, **WELCHES** Projekt fällig ist — er kann nur "alle anstossen". Eine
SQL-Auswahl verlangte eine KLARTEXT-SPALTE neben dem Chiffrat, also **eine zweite Wahrheit
über denselben Zeitpunkt**; es ist dieselbe Figur wie `domains` gegen
`settings.hosting.label` (docs/immer-beachten.md, "DIE domains-ZEILE IST DIE ALLEINIGE
WAHRHEIT ÜBER 'IST DIESES PROJEKT LIVE?'").

**(2) `refreshAccessToken` IST EINE BIBLIOTHEKSFUNKTION.**
Die Beweis-Route (src/app/api/oauth/google/refresh/route.ts) ist ihr **einziger Aufrufer —
nicht ihr einziger MÖGLICHER**. Die Umleitung, die aus `updateSession`
(src/lib/supabase/middleware.ts) stammt, trifft **HTTP-Aufrufe VON AUSSEN**; ein Aufrufer im
selben Prozess stellt gar keine Anfrage und läuft an ihr vorbei.
**FOLGE: VORBEDINGUNG (v) SPERRT DIE ZEITGETAKTETE AUSLÖSER-FAMILIE UND DAMIT EINEN TEIL VON
1b-2 — NICHT DIESEN SCHRITT.** Wer sie als Riegel vor 1b-1 liest, hält eine
Bibliotheksfunktion für eine Route.
ZEIGER 2026-09-03: Was diese Sperre nach der Takt-Wahl noch trifft, steht im Vermerk am Ende
von Vorbedingung (i), Abschnitt "1b als Folgetask".

**(3) `usableTokenFromRow` DECHIFFRIERT BEI JEDEM BEACON UND PRÜFT DIE UHR — GIBT DEN
ZEITPUNKT ABER NICHT HERAUS.**
Die Funktion (src/lib/capi/token.ts, modul-privat) liest die Nutzlast, prüft Uhr 1 über
`hasUsableAccessToken` und gibt `string | null` zurück.
**DIE INFORMATION, DIE EIN ZEITPLAN TEUER BESCHAFFEN MÜSSTE, FÄLLT DORT OHNEHIN AN.**
**WAS DARAUS FOLGT, IST HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN:** Der Befund gehört zum TAKT
und damit zu 1b-2, nicht zur Klammer. **KEINE EMPFEHLUNG.**

### Der Gegenstand — eine Klammer je Projekt

**DIE FORM IST "JE PROJEKT" UND NICHT "SWEEP", und der Grund gehört hinein, sonst wird sie
beim nächsten Umbau als willkürlich gelesen:**
**Ein verkehrsgetakteter Auslöser kennt genau EIN Projekt; ein Sweep ist eine SCHLEIFE über
die Klammer. Umgekehrt gilt es nicht** — aus einem Sweep lässt sich kein Ein-Projekt-Aufruf
herausschneiden, ohne ihn neu zu bauen.
**DIE FORM JE PROJEKT IST DAMIT DIE EINZIGE, DIE BEIDE TAKT-FAMILIEN OFFENHÄLT, ZWISCHEN
DENEN 1b-2 ZU WÄHLEN HAT — und genau das ist der Zweck der vertagten Takt-Wahl.** Wer hier
einen Sweep baut, hat die Wahl getroffen, die 1b-2 treffen soll, und zwar unsichtbar.

**REINE DATEI, KEIN `"use server"`. AUTORISIERUNG BEIM AUFRUFER.** Dieselbe Arbeitsteilung,
in der `refreshAccessToken` selbst schon steht (s. den Abschnitt "Was sie ist" der
Scheibe 1a: "sie prüft KEIN Eigentum"), und derselbe Preis: **Wer sie ohne Eigentums-Gate
ruft, hat kein Eigentums-Gate, und nichts wird davon rot.**

### Was ausdrücklich draussen bleibt, je mit seinem Grund

· **JEDER AUSLÖSER** — kein `pg_cron`, kein `pg_net`, keine `vercel.json`, keine
  GitHub-Action, kein Aufruf aus `after()`. **OWNER-ENTSCHEIDUNG 2026-09-03: Der Takt wird
  in diesem Schritt NICHT gebaut; er ist der Gegenstand von 1b-2.**
· **DER NEBENLÄUFIGKEITS-RIEGEL (Vorrats-Eintrag 9). ZWEI GRÜNDE, UND DER ZWEITE TRÄGT:**
  **(a)** Sein Trigger verlangt einen Auslöser, der die Funktion **NACHWEISLICH nebenläufig
  ruft** — ein auslöserloser Schritt erfüllt ihn nicht. **1b-2 KANN IHN ERFÜLLEN, 1b-1
  NICHT.**
  **(b)** **DIE FORM DES RIEGELS HÄNGT AM GRAD DER NEBENLÄUFIGKEIT, UND DEN LEGT ERST DER
  TAKT FEST:** Ein Riegel im Prozessspeicher trägt für einen Sweep mit zwei Läufen und trägt
  NICHT, wenn der Verkehr ihn auslöst. **Vor der Takt-Wahl gebaut, wäre er auf Verdacht
  gebaut.**
· **JEDE MIGRATION UND JEDE NEUE SPALTE AN `project_secrets`**, insbesondere **KEINE
  KLARTEXT-SPALTE FÜR DEN ABLAUFZEITPUNKT.** Das ist die SWEEP-Frage aus Befund (1), und sie
  existiert **nur in der zeitgetakteten Familie**.
· **VORRATS-EINTRAG 42 · VORRATS-EINTRAG 43 · VORRATS-EINTRAG 44** — je mit eigenem Vermerk
  an ihrer Stelle, hier nicht verdoppelt.
· **VORBEDINGUNG (iv), DIE SIEBEN-TAGE-FRIST.** Sie ist **Arbeit am Anbieter-Konto und kein
  Code**; sie steht NEBEN **beiden Schritten** und in keinem von ihnen.
· **src/lib/vercel/client.ts UND src/lib/oauth/google-token.ts.**
  **GRUND, UND ER SPART ARBEIT:** Der offene Punkt "DER DECKEL ENDET VOR DEM LESEN DES
  RUMPFES — ZWEI DATEIEN" (docs/offene-punkte.md) betrifft genau diese beiden. **KEINE von
  ihnen liegt auf dem Erneuerungs-Pfad**, und `exchangeRefreshToken`
  (src/lib/oauth/google-refresh.ts) trägt das richtige Muster samt zwei Wächtern bereits
  (Entscheidung B-4). **Sein Trigger "spätestens mit dem ersten automatischen Aufrufer"
  tritt durch 1b-1 NICHT scharf ein** — dieser Schritt erzeugt keinen. **MIT 1b-2 IST DAS
  NEU ZU PRÜFEN**, und zwar dort und nicht hier.

### Die geschützten Invarianten dieses Zuschnitts

**(I-1) `src/lib/capi/ingest.ts` UND `src/lib/capi/token.ts` BLEIBEN UNBERÜHRT.** Berührt
der Schritt den Gegenstand ihrer Kommentarköpfe, werden diese **GEPRÜFT UND GEMELDET, NICHT
GEÄNDERT.**
**(I-2) `"use server"`-DATEIEN EXPORTIEREN AUSSCHLIESSLICH ASYNC-FUNKTIONEN** — deshalb ist
die Klammer eine REINE Datei (docs/immer-beachten.md, "'USE SERVER'-DATEIEN").
**(I-3) REINE FUNKTION, AUTORISIERUNG DAVOR.** Ownership-Prüfung beim Aufrufer,
Geschäftslogik dahinter, sauber getrennt.
**(I-4) DER ACHSE-2-KOMMENTARKOPF VON `src/lib/oauth/token-refresh.ts` BLEIBT UND WIRD NICHT
ABGESCHWÄCHT.** Er trägt den ungemessenen Sachverhalt aus Vorrats-Eintrag 9, zweite Achse;
eine Klammer davor macht ihn nicht kleiner.

### Was dieser Zuschnitt offen lässt

**AN EINER STELLE, DAMIT DER NÄCHSTE ZUSCHNITT ES NICHT IN VIER DATEIEN SUCHT:**
· **DER TAKT SELBST — Schritt 1b-2.**
· **DIE FRAGE, WELCHE PROJEKTE FÄLLIG SIND.** Sie hängt an Befund (1) und **existiert nur in
  der zeitgetakteten Familie** — ein verkehrsgetakteter Auslöser stellt sie gar nicht.
**WAS DIESE LISTE NICHT IST: eine Reihenfolge, eine Auswahl, oder eine Aussage darüber,
welcher Posten vor 1b-2 zwingend beantwortet sein muss.**

## Die Rettung am Beacon — Scheibe 1b-2a des Schritts 1b-2 der Scheibe 1b

**DIE NOMENKLATUR WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT:** **1b-2 IST DER
TAKT** — der zweite der beiden Schritte, in die die Scheibe 1b zerlegt ist. **ER WIRD IN
ZWEI SCHEIBEN GEBAUT: 1b-2a (die Rettung, DIESE hier) und 1b-2b (der Riegel).**
**ES ENTSTEHT KEINE NEUE NUMMER NEBEN 1b.** Der Satz "1b entsteht in ZWEI SCHRITTEN"
(Nachtrag am Ende der bindenden Entscheidung (7)) **bleibt damit wörtlich wahr und wird
NICHT ein zweites Mal angefasst**: 1b-2a und 1b-2b sind Scheiben INNERHALB des Schritts
1b-2, keine dritten Schritte. **ES GIBT WEITERHIN KEINE SCHEIBE 1c.**
**DIE SUFFIX-DISZIPLIN AUS 1b-1 GILT UNVERÄNDERT UND WÄCHST UM EINE EBENE:** "1b" ohne
Suffix meint das PAKET, "1b-2" den TAKT als ganzen, "1b-2a" und "1b-2b" die beiden
Scheiben. **Ein Zitat ohne Suffix meint nie eine Hälfte.**

**PROVENIENZ — GETRENNT GEFÜHRT, aus demselben Grund wie bei 1b-1:**
· **OWNER-GO 2026-09-03** für den Zuschnitt dieser Scheibe, dazu der Maßstab unter "Warum
  die Vorsorge die Rettung erst tragfähig macht".
· **ARCHITEKTEN-FESTLEGUNG 2026-09-03:** die Benennung 1b-2a / 1b-2b und die Aussage, dass
  daneben keine neue Nummer entsteht.
· **PROVENIENZ DES ÜBRIGEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
  ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Keine Messung.** Jede mit GEMESSEN
  gekennzeichnete Angabe stammt aus der Aufklärungsrunde vom 2026-09-03 (CC, am Repo).

### Was Scheibe 1b-2a ist

**DER TAKT IST DER VERKEHR** (OWNER-ENTSCHEIDUNG 2026-09-03). Die Erneuerung hängt am
Ingest-Pfad und an keinem Zeitplan: Ein eintreffender Beacon, dessen Zugangsdatum tot oder
im Vorlauf ist, löst sie aus. **DAMIT IST DIE ZEITGETAKTETE AUSLÖSER-FAMILIE NICHT GEWÄHLT,
SONDERN GAR NICHT MEHR IM SPIEL** — und mit ihr fallen die Fragen, die nur sie stellt: die
Auslöser-Frequenz der Plattform, die Frage, welche Projekte fällig sind, und die
Erreichbarkeit einer Route für einen maschinellen Aufrufer.
**DIE ERSTE VON IHNEN IST EINE BENANNTE VORBEDINGUNG UND DAMIT GEGENSTANDSLOS GEWORDEN:
(i) im Abschnitt "1b als Folgetask"** — der Vermerk dazu steht dort am Ende jener
Vorbedingung, samt der Bedingung, unter der sie wieder bindet. **Hier steht nur der Zeiger;
der Volltext bleibt an (i).**

**DER TITEL WEICHT ABSICHTLICH VON DEM DER SCHEIBE 1b-1 AB** ("Die Klammer um die
Erneuerung — Schritt 1b-1 …"): Zwei ähnlich gebaute `##`-Überschriften in DERSELBEN Datei
machen jeden Such-Anker mehrdeutig, und der erste Treffer wäre systematisch der falsche
(docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
VERZEICHNIS NICHT").

**WAS SIE NICHT IST:** der Riegel. Der Nebenläufigkeits-Riegel ist **1b-2b**, und warum er
eine eigene Scheibe sein DARF statt einer vergessenen Auflage, steht unten unter "Warum die
Vorsorge die Rettung erst tragfähig macht" — es ist der Kern dieses Zuschnitts.

### Vollzogen — was im Zuschnitt der Scheibe 1b-2a stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH AB, aus demselben Grund wie bei Scheibe 3, der
Fix-Scheibe, Scheibe 2, Scheibe 4 und Schritt 1b-1:** "Vollzogen — was hier stand und
wohin es gegangen ist" steht in dieser Datei bereits zweimal und ist als Hausform über
Standdateien hinweg Hebungs-Kandidat 5. **DIE ZITATE UNTEN STEHEN OHNE `###`-MARKE** —
die Auflage aus docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN
EINER DATEI MIT VERZEICHNIS NICHT" (Zusatz 2026-08-27): Ein Titel-Zitat mit Marke
kollidierte für immer mit jeder künftigen Überschrift desselben Wortlauts.

VERDICHTET AM 2026-09-03, nach dem Bau-Commit `d57d50c` und dem bestätigten Live-Test.
Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen. VIER
Unterabschnitte sind entfallen. **JEDES DER VIER STÜCKE TAUCHT IN VERMERK 12 WIEDER AUF
— das ist die Bedingung, unter der überhaupt gestrichen werden durfte:** Der Zuschnitt
ist der Maßstab, gegen den der Vermerk misst, und der Verlauf ist kein Ersatz (er wird
beim Pflicht-Gate nicht gelesen).

- **"Der Gegenstand — vier Lagen statt zwei"** nannte die vier Lagen und was je Lage
  geschieht. **Gebaut, und der Code sagt es jetzt selbst** — `RowResolution`,
  `hasLiveRefreshToken` und die Paarungsschleife in `capi/token.ts`. **WO ES WIEDER
  AUFTAUCHT:** VERMERK 12, Abschnitt (a), in Symbolen und mit der Lagen-Tabelle,
  einschliesslich des Satzes "ERNEUERBAR HEISST NICHT SENDEFÄHIG".
  **SEINE EINE FORTWIRKENDE ZEILE IST NICHT VERSCHWUNDEN:** Dass **"UHR 2 UNBEKANNT"
  NIE ALS ABGELAUFEN GILT**, ist Festlegung 5 der Scheibe 1a — ÜBERNOMMEN, nicht neu
  erfunden — und steht unverändert an ihrer Stelle weiter oben sowie am Prädikat
  `hasLiveRefreshToken` selbst.
- **"Das dritte Stück — der Wurf bei der Registrierung"** trug den gemessenen Befund
  (das `try` liegt IM Callback, der `after()`-Aufruf stand ungeschützt, keine der sechs
  Attrappen kann werfen) und die Begründung, warum er in DIESE Scheibe gehört.
  **Beides ist eingelöst**: `scheduleAfter` deckt BEIDE Registrierungen, und der
  Kommentarkopf von `schedulePersist` ist richtiggestellt. **WO ES WIEDER AUFTAUCHT:**
  VERMERK 12, Abschnitt (a) für den Bau und Abschnitt (e) für die Attrappen-Blindheit;
  der Befund selbst steht unverändert als **Vorrats-Eintrag 35** samt seinem neuen
  Vermerk, und die Begründung lebt am Code, im Kopf von `scheduleAfter`.
- **"Die Test-Falle, die der Plan behandeln muss"** war eine ANWEISUNG an den Plan —
  achtzehn Ganz-Objekt-Vergleiche, `toEqual` ignoriert `undefined`, zehn mockende
  Dateien. **Sie ist behandelt: `renewable` ist ein PFLICHTFELD.** **WO ES WIEDER
  AUFTAUCHT:** VERMERK 12, Abschnitt (e) — dort **beide Hälften** der Falle, die
  achtzehn und die zehn, samt der Entscheidung, die Fixtures und nicht den Handler zu
  reparieren. **DIE GEMESSENE EIGENSCHAFT SELBST IST DAMIT NICHT VERLOREN:** Sie steht
  zusätzlich am Feld `renewable` in `capi/token.ts`, an einem der achtzehn Läufe und im
  Wächter **R7**.
- **"Zwei Entwurfsfragen, vorgelegt und nicht entschieden"** legte zwei Fragen vor und
  entschied keine. **BEIDE SIND ENTSCHIEDEN** (OWNER, 2026-09-03): **(1) Der Resolver
  MELDET, der Handler HANDELT** — Form 1; **(2) der Inline-Weg bekommt DENSELBEN Deckel
  wie der Hintergrund-Weg**, `runRefresh` unverändert, **keine zweite Konstante**.
  **WO ES WIEDER AUFTAUCHT:** VERMERK 12, Abschnitt (a) für die gebaute Form und
  Abschnitt (g) für die Kopplung.
  **DER GRUND GEGEN DIE ANDERE FORM BINDET ÜBER DIE SCHEIBE HINAUS UND WIRD DESHALB
  HIER FESTGEHALTEN:** Ein erneuernder Resolver hätte den Wächter **`T15-ERSATZ`** rot
  gemacht — jenen, der `capi/token.ts` jeden Import aus `/oauth/` verbietet — und damit
  die Zusicherung getroffen, auf der **vier Festlegungen der Scheibe 4** ruhen. Wer die
  Frage später neu aufmacht, findet den Preis hier.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen:** der Kopf des Abschnitts samt Nomenklatur und Suffix-Disziplin,
"Was Scheibe 1b-2a ist", die zwei Befunde, "Warum die Vorsorge die Rettung erst
tragfähig macht", die Ausschlüsse mit ihren Gründen, die sechs Invarianten und "Was
diese Scheibe offen lässt". Sie sind GRÜNDE, BEFUNDE und GRENZEN, keine Anweisungen,
und jede von ihnen bindet **1b-2b** — die Befunde tragen die Anordnung, die Ausschlüsse
sagen, was dort erst fällig wird, und die Invarianten gelten dem gebauten Zustand, nicht
dem Bauvorgang.

**EIN STÜCK IST GESTRICHEN, DAS NICHT NUR ABGELAUFEN, SONDERN FALSCH WAR — UND DAS WIRD
HIER BENANNT STATT VERWISCHT:**
- **"Die Beweis-Achse der Scheibe 1b-2a"** war die ANLEITUNG für den Live-Test. Sie ist
  gefahren. **IHRE TRAGENDE ZEILE WAR AM GEBAUTEN CODE FALSCH:** "Bleibt sie nach der
  Wartezeit aus und geht die Conversion hinaus, ist die Scheibe bewiesen; steht sie da,
  ist sie es nicht." **Die Fehlerzeile steht im Rettungsfall NOTWENDIG da** — der
  `console.error` liegt VOR der Verzweigung. **WO ES WIEDER AUFTAUCHT:** VERMERK 12,
  Abschnitt (c), vollständig und mit dem Grund, warum die Anleitung einen Erfolg als
  Fehlschlag angekündigt hat. **DIE STREICHUNG IST KEINE KORREKTUR DER AUSSAGE, SONDERN
  DAS ABLAUFEN DER ANLEITUNG;** die Aussage selbst ist im Vermerk als Fehlgriff
  festgehalten, damit die nächste Runde die Achse nicht ein zweites Mal falsch setzt.
  **AUCH DIE ZWEITE UNTAUGLICHE HÄLFTE STEHT DORT:** die erwartete
  `[oauth/token-refresh] ok`-Zeile ist ein `console.info` und liegt an einer anderen
  Log-Ebene als die Fehlerzeile — **ihre Abwesenheit war nie ein Befund.**

### Die zwei Befunde, die diesen Zuschnitt tragen

**GEMESSEN am Repo (CC, 2026-09-03).** Als Ort steht der SYMBOLNAME und nie eine
Zeilennummer — Fortschreibungs-Regel dieser Datei.

**(1) DER INGEST WARTET HEUTE SCHON VOR DER 204 AUF EXTERNE AUFRUFE.**
`handleIngest` (src/lib/capi/ingest.ts) hält den Fan-Out unter `await Promise.allSettled`;
die Adapter starten GLEICHZEITIG, jeder trägt seinen EIGENEN Deckel (drei Sekunden je
Adapter), und **die 204 steht DAHINTER**. Der Kommentar an jener Stelle sagt es
ausdrücklich: das `await` sei "kein Versehen", und wer es entferne, baue eine eigene,
spätere Änderung unangekündigt mit ein.
**FOLGE: EINE ERNEUERUNG IM ANFRAGE-WEG IST KEINE NEUE KLASSE VON EINGRIFF.** Sie fügt dem
Pfad keine Eigenschaft hinzu, die er nicht schon hätte.
**WAS BLEIBT, UND ES GEHÖRT IN DENSELBEN ATEMZUG:** Sie liegt **SERIELL** zum Fan-Out, nicht
parallel — die Erneuerung muss durch sein, bevor der Adapter das Zugangsdatum bekommt.
**Die Gesamtwartezeit ist damit Summe statt Maximum**, und das ist der einzige Punkt, an dem
dieser Eingriff die bestehende Anordnung verlässt.
**DIESER BEFUND HAT EINE ARCHITEKTEN-EINSCHÄTZUNG WIDERLEGT, und das gehört hinein, sonst
sieht der Zuschnitt aus, als sei er immer so gedacht gewesen:** Der Preis eines Eingriffs im
Anfrage-Weg war **zu hoch angesetzt** worden — angenommen war ein Pfad, der heute auf nichts
Externes wartet. Er wartet.

**(2) BEIDE UHREN LIEGEN IN DERSELBEN NUTZLAST, UND SIE LIEGEN DORT SCHON ENTSCHLÜSSELT.**
`usableTokenFromRow` (src/lib/capi/token.ts, modul-privat) ist **der einzige Ort im
Resolver, an dem eine `OAuthPayload` existiert**, und sie hat **genau EINEN Aufrufer**
(`getCapiConfigByTrackingKey`). Dort liegen `accessTokenExpiresAt` UND
`refreshTokenExpiresAt` nebeneinander vor. **Geprüft wird heute nur Uhr 1**
(`hasUsableAccessToken`); **Uhr 2 wird auf diesem Pfad nie gelesen.**
**FOLGE: "ERNEUERBAR" VON "ENDGÜLTIG TOT" ZU TRENNEN KOSTET KEINEN ZUSÄTZLICHEN NETZ- ODER
DATENBANK-ZUGRIFF.** Die Angabe fällt ohnehin an; sie wird heute nur weggeworfen.
**DAS IST DIE EINLÖSUNG DES DRITTEN BEFUNDS AUS 1b-1**, der genau das offenliess: "DIE
INFORMATION, DIE EIN ZEITPLAN TEUER BESCHAFFEN MÜSSTE, FÄLLT DORT OHNEHIN AN. WAS DARAUS
FOLGT, IST HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN … Der Befund gehört zum TAKT."

### Die eine Festlegung, die aus dem verdichteten Gegenstand gerettet ist

**"UHR 2 UNBEKANNT" GILT NIE ALS ABGELAUFEN.** Das ist **Festlegung 5 der Scheibe 1a**,
ÜBERNOMMEN und nicht neu erfunden: Von zwei unbelegten Möglichkeiten wird die gewählt, deren
Fehlgriff der billigere ist — ein überflüssiger Netzaufruf gegen einen
Kunden-Autorisierungsfluss, den niemand gebraucht hätte. **Ein Zugangsdatum mit unbekannter
zweiter Uhr landet damit in einer der beiden ERNEUERBAR-Lagen, nie in der vierten.**

**SIE STEHT ALS EIGENER UNTERABSCHNITT DA, WEIL DER ABSCHNITT, IN DEM SIE STAND,
VERDICHTET IST** (s. den Vollzogen-Block darüber). Sie ist KEINE Anweisung an den Bau,
sondern eine übernommene Festlegung — und sie bindet jeden künftigen Leser der zweiten
Uhr, nicht nur diese Scheibe. **AM CODE STEHT SIE ZUSÄTZLICH**, am Prädikat
`hasLiveRefreshToken` in `capi/token.ts`; zwei Orte, weil der eine beim Zuschneiden und
der andere beim Bauen gelesen wird.

### Warum die Vorsorge die Rettung erst tragfähig macht

**DIESER ABSCHNITT IST DER KERN DES ZUSCHNITTS UND NICHT EINE BEGRÜNDUNG NEBENBEI.**

**OHNE DIE VORSORGE ERREICHT JEDES TRAFFICSTARKE PROJEKT STÜNDLICH DEN INLINE-FALL** — und
dann laufen **alle gleichzeitig eintreffenden Beacons hinein**. Aus einem seltenen Fall
würde ein regelmässiger, und der Nebenläufigkeits-Riegel wäre keine vertagte Frage mehr,
sondern eine Vorbedingung.
**MIT DER VORSORGE BLEIBT DER INLINE-FALL STRUKTURELL DEM PROJEKT VORBEHALTEN, DAS
STUNDENLANGE LÜCKEN HAT** — also genau dem, bei dem kaum jemand gleichzeitig ankommt.
**DIE NEBENLÄUFIGKEIT WIRD NICHT DURCH MASCHINERIE KLEINER, SONDERN DURCH DEN ZUSCHNITT.**
Das ist der Grund, warum der Riegel eine EIGENE Scheibe sein DARF und keine vergessene
Auflage ist: Er wird nicht verschoben, weil er unbequem wäre, sondern weil die Anordnung
seinen Anwendungsfall selbst verkleinert.

**DER MASSSTAB DAHINTER (OWNER, 2026-09-03), und er entscheidet die Lagen-Zuordnung oben:
WER WENIG TRAFFIC HAT, BRAUCHT JEDE CONVERSION.** Ein Projekt mit EINER Conversion pro Tag
hat ein totes Zugangsdatum, wenn sein Beacon eintrifft — **und dieser Beacon IST die
Conversion.** Ihn nach der Antwort zu erneuern hiesse, ihn zu verlieren und beim nächsten
Mal bereit zu sein, das aber erst in vierundzwanzig Stunden. **Deshalb steht der tote Fall
INLINE und nicht im Hintergrund.**

### Was diese Scheibe ausdrücklich nicht baut, je mit Grund

· **DER RIEGEL UND JEDE MIGRATION — SCHEIBE 1b-2b.**
  **TRIGGER: der erste FREMDE Traffic auf ein Projekt mit Google-Ziel, spätestens vor einem
  Beta-Launch.**
  **EINE AUFLAGE MUSS MIT, und ohne sie beginnt jene Scheibe mit einer Lücke, die sie für
  geschlossen hält:** Vor 1b-2b sind **ZWEI** Dinge nachzuholen — die **Anbieter-Lesung**
  nach docs/db-regeln.md ("WER DB-CODE ANFASST, LEGT DIE GELESENE ANBIETER-DOKU ALS
  PROVENIENZ VOR"), und die Frage, **ob PostgREST bei einer bedingten Schreibung verlässlich
  meldet, ob eine Zeile getroffen wurde**. **BEIDES FEHLT HEUTE** — GEMESSEN am Repo (CC,
  2026-09-03): Im Produktivcode gibt es **kein Muster für eine Bedingungs-Schreibung** (das
  einzige `update` mit Rückgabe filtert auf Identität und Eigentum, nicht auf einen
  ZUSTAND), und docs/plattform-befunde.md sagt **zum Schreibverhalten von PostgREST nichts**
  (Nicht-Treffer mit benannter Reichweite).
  **EIN KANDIDAT, DER DIESE FRAGE UMGEHT — ALS KANDIDAT UND NICHT ALS WAHL:** ein Anspruch
  über einen **EINDEUTIGKEITS-BRUCH** statt über eine Bedingungs-Schreibung. Es ist dieselbe
  Figur wie bei `assignDomainLabel` (src/app/projects/actions.ts) und `persistDomainRow`
  (src/lib/domains/register.ts): Der Verlierer bekommt einen **FEHLERCODE** und keinen
  Zeilenzähler — eine Auskunft, die PostgREST nicht erst zusagen muss. **ENTSCHIEDEN IST DAS
  NICHT.**

  **VERMERK 2026-09-03 — DER TRIGGER WAR AN DER FALSCHEN ACHSE FORMULIERT. DER TEXT
  DARÜBER BLEIBT WÖRTLICH STEHEN; DIESER VERMERK TRITT DANEBEN UND ERSETZT DEN TRIGGER.**
  Gesetzt am 2026-09-03 (ARCHITEKT), **korrigiert am selben Tag auf OWNER-EINWAND.**
  **DER FEHLER IN EINEM SATZ: "FREMDER TRAFFIC" IST DIE BEDINGUNG, UNTER DER DER FALL
  HÄUFIG WIRD, NICHT DIE, UNTER DER ER MÖGLICH WIRD.** Die App wird fertig gebaut und vom
  Owner selbst getestet, **BEVOR** sie jemand anderes bekommt — ein Riegel, der erst mit
  fremdem Traffic entsteht, **schöbe eine bekannte Lücke bewusst in den Live-Betrieb.**
  **DER NEUE TRIGGER: VOR DEM ABSCHLUSS DER PHASE 11.2.**
  **DIE EINORDNUNG GEHÖRT DAZU, damit die Lücke weder unter- noch überschätzt wird:**
  **ES IST KEIN ISOLATIONSLECK** — kein Tenant sieht Daten eines anderen. **DER SCHADEN
  WÄRE EIN VERLORENER ZUGANG:** Entwertete Google bei Ausstellung eines neuen
  Zugangsdatums das vorherige, hinterliesse ein spät schreibender Lauf ein **TOTES Token
  mit einem Ablaufzeitpunkt in der ZUKUNFT** — der Resolver hielte es für brauchbar und
  erneuerte **nie**. **Das ist genau der stumme Fehlzustand, gegen den diese Phase gebaut
  wird.**
  **OB GOOGLE SO VERFÄHRT, IST UNGEMESSEN** (Vorrats-Eintrag 9, zweite Achse:
  "AUSSTELLUNGS- UND SCHREIBREIHENFOLGE KÖNNEN DIVERGIEREN"). **DER RIEGEL IST UNABHÄNGIG
  DAVON RICHTIG, WIE DIE MESSUNG AUSFIELE** — er kostet wenig und deckt einen Fall, den
  niemand beobachten kann, solange er nicht eintritt.
  PROVENIENZ: **OWNER-EINWAND 2026-09-03, vom Architekten angenommen.** Keine Messung.

  **VERMERK 2026-09-04 — DIE ERSTE DER ZWEI NACHHOLUNGEN LIEGT VOR, DIE ZWEITE STEHT AUS
  UND HAT SEIT HEUTE EINEN ORT. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER
  VERMERK TRITT DANEBEN UND ÄNDERT AN DER AUFLAGE NICHTS.**
  **ERSTE NACHHOLUNG — DIE ANBIETER-LESUNG NACH docs/db-regeln.md: GEFAHREN UND ABGELEGT.**
  GELESEN 2026-09-04 (CC), elf Adressen. **DER VOLLTEXT STEHT NICHT HIER**, sondern in
  docs/plattform-befunde.md, Abschnitt "Supabase", LAUF 3, Teile **(ah) bis (ar)** — mit den
  drei Angaben, die die vierte Regel verlangt (Datum · Fundstelle · Folge für den Bau), im
  Kopf jenes Laufs.
  **ZWEITE NACHHOLUNG — DIE FRAGE NACH DER RÜCKMELDUNG EINER BEDINGTEN SCHREIBUNG: STEHT
  AUS.** Sie hat seit dem 2026-09-04 einen eigenen Ort: docs/offene-punkte.md, Eintrag "DIE
  RÜCKMELDUNG EINER BEDINGTEN SCHREIBUNG ÜBER PostgREST IST UNGEMESSEN", Trigger "der
  Zuschnitt der Scheibe 1b-2b". **DIE DREI FRAGEN STEHEN DORT UND WERDEN HIER NICHT
  WIEDERHOLT.**
  **WAS DIE LESUNG FÜR DEN RIEGEL HERGIBT UND WAS NICHT — ZWEI SÄTZE, DER VOLLTEXT LIEGT AN
  DEN GENANNTEN ORTEN:** Sie trägt für die **Fehlerform** eines Eindeutigkeits-Bruchs
  (23505 → 409, Rumpfform dokumentiert) und für **Transaktion und Isolation**. Sie trägt
  **NICHT** für die Rückmeldung einer bedingten Schreibung — was ein `update` meldet, das
  null Zeilen trifft, ist an keiner gelesenen Stelle beantwortet.
  **DIE GRENZE, DIE MITMUSS: ATOMAR HEISST NICHT SICHER.** Garantiert ist **EINE** Anweisung,
  **EINE** Transaktion, **READ COMMITTED** — was zwei GLEICHZEITIGE bedingte Schreibungen
  darunter tun, ist **bei diesem Anbieter nicht zu holen**; die Antwort liegt in der
  PostgreSQL-eigenen Dokumentation. **WER DAS ÜBERLIEST, HÄLT DIE NEBENLÄUFIGKEIT FÜR
  GEKLÄRT UND BAUT OHNE SIE WEITER** — und genau das ist die Frage, für die dieser Riegel
  überhaupt gebaut wird.
  **WARUM DIESE GRENZE HIER STEHT, OBWOHL SIE IM LAUF 3 SCHON STEHT — die Doppelung ist
  Absicht und hat einen Präzedenzfall in DIESER Datei:** Die bindende Entscheidung (5) sagt
  über sich selbst, sie stehe an ihrem Ort, weil sie "beim Zuschneiden der Transport-Scheibe
  unübersehbar sein" muss. Dasselbe gilt hier: **Diese Datei ist das Pflicht-Gate jedes
  Zuschnitts, docs/plattform-befunde.md wird nur auf ihren eigenen Auslöser hin geladen.**
  Wer 1b-2b zuschneidet und nur hier liest, muss die Grenze trotzdem sehen. **DIE HERLEITUNG
  WIRD NICHT VERDOPPELT** — sie steht als dritte Grenze in LAUF 3, Teil (aq).
  PROVENIENZ: **ARCHITEKTEN-VERMERK 2026-09-04** auf der Lesung desselben Tages. Die Lesung
  selbst ist GELESEN (CC, 2026-09-04); dass die zweite Nachholung aussteht, ist eine FOLGE
  aus ihrem Ergebnis und **keine Messung**.

· **VORRATS-EINTRAG 42, DIE DROSSELUNG.** **Nach dieser Scheibe bleibt als Ursache der
  Fehlerzeile nur noch das TOTE ERNEUERUNGS-TOKEN — und das behebt kein Code.** Der Eintrag
  wird damit nicht kleiner, sondern wechselt seinen Gegenstand; sein Vermerk hält es fest.
· **VORRATS-EINTRAG 44** (kein Bedienelement an der Beweis-Route) — unberührt.
· **VORBEDINGUNG (iv), DIE SIEBEN-TAGE-FRIST.** Arbeit am Anbieter-Konto, kein Code; sie
  steht neben dieser Scheibe wie neben allen davor.
· **JEDE ÄNDERUNG AN `runRefresh`, `token-refresh.ts` UND `google-refresh.ts`.** Die Klammer
  aus 1b-1 wird GERUFEN, nicht angefasst.
· **JEDE ERWEITERUNG DES RUMPFES DER BEWEIS-ROUTE.** Sie bleibt, was sie ist.

### Die geschützten Invarianten dieser Scheibe

**(I-1) DAS 204-CONTAINMENT GILT IN JEDEM NEUEN PFAD, AUCH IM INLINE-FALL.** Eine
Erneuerung, die wirft, darf die 204 nicht kippen. Der Grund steht in
docs/immer-beachten.md: Ein 500 oder ein Body leakte den Gültigkeitszustand des
`trackingKey` an einen anonymen Aufrufer.
**(I-2) DER KILL-SWITCH BLEIBT EIN EIGENER ZWEIG VOR PERSIST UND FORWARD.** **Ein gesperrtes
Projekt erneuert nichts** — weder inline noch im Hintergrund.
**(I-3) DAS ERNEUERUNGS-TOKEN VERLÄSST DEN RESOLVER NICHT.** **Der Rückgabetyp ist der
Mechanismus, nicht die Zusage:** Wer ihn erweitert, muss DREI Typen anfassen, und genau das
ist der Schutz.
**(I-4) KEINE `projectId` IN DEN LOGZEILEN DES RESOLVERS.** Dieser Pfad läuft bei JEDEM
Besucher JEDER Kundenseite; eine Projekt-Kennung je Beacon wäre eine Datenerhebung, die
niemand beschlossen hat.
**(I-5) FÜR DIE VIER KLARTEXT-ZIELE IST DIE ÄNDERUNG WIRKUNGSLOS.** Dort existiert **keine
Nutzlast und keine Uhr** — meta, pinterest, tiktok und linkedin tragen ihr Geheimnis in der
Klartext-Spalte und laufen an der Entschlüsselung vorbei.
**(I-6) KEIN NEBENLÄUFIGKEITS-RIEGEL IN DIESER SCHEIBE.** Ein "kleiner Riegel nebenbei" ist
ein **VERSTOSS, KEIN BONUS**.

### Was diese Scheibe offen lässt

· **DER RIEGEL — SCHEIBE 1b-2b**, samt der zwei nachzuholenden Vorarbeiten oben.
· **OB GOOGLE EIN VORHERIGES ZUGANGSDATUM BEI AUSSTELLUNG EINES NEUEN ENTWERTET** —
  Vorrats-Eintrag 9, ZWEITE Achse, **UNGEMESSEN**. **UNTER MEHRFACHER ERNEUERUNG WIRD SIE
  SCHÄRFER**, und deshalb steht sie hier und nicht nur dort: Ein verkehrsgetakteter Auslöser
  erneuert häufiger als ein Mensch, der eine Route drückt.
· **WAS GOOGLE NACH ABLAUF DER SIEBEN-TAGE-FRIST ANTWORTET** — Statuscode, Rumpfform, und ob
  überhaupt `invalid_grant`. Ungemessen; der Zeiger steht in docs/ziel-befunde.md.
**WAS DIESE LISTE NICHT IST: eine Reihenfolge, eine Auswahl, oder eine Aussage darüber,
welcher Posten vor 1b-2b zwingend beantwortet sein muss.**

## Die Ampel an der Ziel-Karte — Scheibe 11.2b

**DIE NOMENKLATUR WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT, und sie ist
dieses Mal wichtiger als bei allen Zuschnitten davor: DIESE SCHEIBE GEHÖRT NICHT ZUM
SCHNITT DER PHASE 11.2.** Der Schnitt (bindende Entscheidung (6)) hat **1a, 1b, 2, 3
und 4** — mehr nicht, und der Nachtrag am Ende der Entscheidung (7) sagt ausdrücklich:
"DIE AUFZÄHLUNG IN (6) BEHÄLT IHRE FÜNF STÜCKE, WEIL KEIN SECHSTES DAZUKOMMT."
**SIE BEKOMMT DESHALB IHRE NUMMER AUF DER ANDEREN ACHSE, DIE DIESE DATEI OHNEHIN
FÜHRT:** der PHASEN-Achse, auf der schon **Scheibe 11.2a** liegt (die zwei reinen
Funktionen, abgeschlossen). **11.2b ist die zweite Scheibe dieser Achse.**
**11.2b IST NICHT 1b.** Die beiden Bezeichner sehen einander ähnlich und meinen
Verschiedenes: **1b ist der automatische AUSLÖSER** (in 1b-1 und 1b-2 zerlegt, 1b-2 in
1b-2a und 1b-2b), **11.2b ist die SICHTBARKEIT DES ZUSTANDS.** Wie bei jedem Zuschnitt
dieser Datei steht deshalb der INHALT im Titel und die Kurzform dahinter.
**EIN ZITAT DER FORM "Scheibe 11.2b" TRÄGT SEIN PRÄFIX AUSNAHMSLOS** — dieselbe
Suffix-Disziplin wie bei 1b, aus demselben Grund, und der Vorrats-Eintrag 47 hält
bereits fest, dass das nackte Kürzel im Repo nicht eindeutig ist.

**PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Keine Messung.** Jede mit
GEMESSEN gekennzeichnete Angabe stammt aus der Aufklärungsrunde vom 2026-09-03 (CC, am
Repo). Als Ort steht der SYMBOLNAME und nie eine Zeilennummer — Fortschreibungs-Regel
dieser Datei.

### Vollzogen — was im Zuschnitt der Scheibe 11.2b stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH AB, aus demselben Grund wie bei Scheibe 3, der
Fix-Scheibe, Scheibe 2, Scheibe 4, Schritt 1b-1 und Scheibe 1b-2a:** "Vollzogen — was
hier stand und wohin es gegangen ist" steht in dieser Datei bereits zweimal und ist als
Hausform über Standdateien hinweg Hebungs-Kandidat 5. **DIE ZITATE UNTEN STEHEN OHNE
`###`-MARKE** — die Auflage aus docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" (Zusatz 2026-08-27).

VERDICHTET AM 2026-09-04, nach dem Bau-Commit `7288f90` und dem bestätigten Live-Test.
Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen. DREI
Unterabschnitte sind entfallen. **JEDES DER DREI STÜCKE TAUCHT IN VERMERK 13 WIEDER AUF
— das ist die Bedingung, unter der überhaupt gestrichen werden durfte:** Der Zuschnitt
ist der Maßstab, gegen den der Vermerk misst, und der Verlauf ist kein Ersatz (er wird
beim Pflicht-Gate nicht gelesen).

- **"Der Gegenstand der Scheibe 11.2b — eine Aktion, die rechnet, und eine Karte, die
  zeigt"** nannte den Gegenstand in zwei Zeilen. **Gebaut, und der Code sagt es jetzt
  selbst** — `listTargetCredentialStates`, `credentialStateFrom` und die dritte Zeile an
  der Karte. **WO ES WIEDER AUFTAUCHT:** VERMERK 13, Abschnitt (a), in Symbolen.
  **SEINE EINE FORTWIRKENDE ZEILE IST NICHT VERSCHWUNDEN:** Die OWNER-ENTSCHEIDUNG vom
  2026-09-03, **Ausfall UND Vorwarnung** statt nur des einen, ist der Grund, warum die
  Lagen-Liste darunter SECHS Stück führt und nicht fünf — sie steht dort weiter.
- **"Zwei Entwurfsfragen der Scheibe 11.2b, vorgelegt und nicht entschieden"** legte zwei
  Fragen vor und entschied keine. **BEIDE SIND ENTSCHIEDEN** (OWNER, 2026-09-04):
  **(1) eine ZWEITE Aktion**, `listConfiguredTargets` bleibt wörtlich; **(2) das
  Uhr-Prädikat bekommt eine DRITTE Instanz**, der Bestand bleibt unangetastet.
  **WO ES WIEDER AUFTAUCHT:** VERMERK 13, Abschnitt (a), und — als Preis der jeweils
  anderen Wahl — Abschnitt (d).
  **DER GRUND GEGEN DIE JEWEILS ANDERE FORM BINDET ÜBER DIE SCHEIBE HINAUS UND WIRD
  DESHALB HIER FESTGEHALTEN:** Eine Erweiterung der Nachbar-Aktion hätte den Lauf öffnen
  müssen, der ihre Spaltenliste auf `["target"]` festnagelt — also genau den Wächter der
  Geheimnis-Disziplin. Und eine Entdoppelung des Prädikats hätte `src/lib/capi/token.ts`
  UND `src/lib/oauth/token-refresh.ts` angefasst, beide unter Scope-Schutz.
  **AUSDRÜCKLICH NICHT DER GRUND: ein Quelltext-Wächter.** `T15-ERSATZ` verbietet
  `capi/token.ts` nur Importe aus `/oauth/` und nennt `secrets/` als erlaubte Nachbarn.
  **Wer die Entdoppelung später angeht, findet den Preis bei den Invarianten und nicht
  bei einem Test.**
- **"Die Beweis-Achse der Scheibe 11.2b"** war die ANLEITUNG für den Live-Test — Karte
  laden, gegen die Beweis-Route halten, und der Termin der toten Lage. **Sie ist
  gefahren.** **WO ES WIEDER AUFTAUCHT:** VERMERK 13, Abschnitt (b) mit den sieben
  Schritten und dem Abgleich auf die Sekunde, und Abschnitt (f) mit dem, was sie NICHT
  gezeigt hat.
  **IHRE TERMIN-ANGABE IST MIT DER STREICHUNG NICHT VERLOREN, SONDERN NACHGEZOGEN:** Sie
  nannte den 2026-09-08; der Termin ist mit zwei Neu-Verbindungen überholt und steht
  **an EINER Stelle** korrigiert — im Nachtrag zu Vorbedingung (iv), Abschnitt "1b als
  Folgetask". **DIE TOTE LAGE IST DAMIT WEITERHIN UNGEPRÜFT** (VERMERK 13, Abschnitt (f)).

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen:** der Befund, der den Zuschnitt umgedreht hat · die zwei Befunde
zum Verzicht auf Persistenz · die zwei Todesarten samt ihrer Grenze · die sechs Lagen mit
ihren Gründen · die mitgenommene Schwäche · die tragende Invariante an neuem Ort · die
sechs geschützten Invarianten · die Ausschlüsse mit ihren Triggern. Sie sind GRÜNDE,
BEFUNDE und GRENZEN, keine Anweisungen, und jede von ihnen bindet über diese Scheibe
hinaus — insbesondere die zweite Todesart, deren Trigger noch aussteht, und die
Invariante (I-1), an der jeder künftige Rückgabetyp dieser Achse gemessen wird.

### Der Befund, der diesen Zuschnitt umgedreht hat

**ER STEHT VORN, WEIL ER EINE ARCHITEKTEN-ANGABE WIDERLEGT — und zwar eine aus DIESER
Datei, vom selben Tag.**

**VORRATS-EINTRAG 50 SAGT, DIE VORWARNUNG SEI DIE TEURERE HÄLFTE**, weil der
Ablaufzeitpunkt im Chiffrat steckt und die Datenbank den Schlüssel nicht hat — und
schliesst daraus, sie hänge "an DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
AUSLÖSER".

**DER ERSTE HALBSATZ STIMMT, DER SCHLUSS NICHT. EINE SERVERAKTION HAT DEN SCHLÜSSEL.**
Sie kann genau das tun, was `usableTokenFromRow` (src/lib/capi/token.ts) bei jedem
Beacon tut — die Zeile lesen, entschlüsseln, beide Uhren prüfen —, nur eben **beim Laden
des Dashboards und abseits jedes Beacons**.

**DER SATZ GALT FÜR EINEN ZEITPLAN IN POSTGRES UND IST UNGEPRÜFT AUF DIE OBERFLÄCHE
ÜBERTRAGEN WORDEN.** Befund (1) des Zuschnitts zu Schritt 1b-1 sagt, ein Zeitplan IN DER
DATENBANK könne nicht entscheiden, WELCHES Projekt fällig ist — dort trifft es zu, weil
Postgres den Chiffrier-Schlüssel nicht hat. **Eine Serveraktion ist kein Zeitplan in der
Datenbank.** Der Preis der Vorwarnung fällt damit weg, und mit ihm die Reihenfolge, in
der Eintrag 50 die zwei Hälften sortiert hat.
**EINTRAG 50 BEKOMMT DAZU EINEN EIGENEN VERMERK** — dort, nicht hier; zweimal
geschrieben liefe es auseinander.

### Die zwei Befunde, die den Verzicht auf Persistenz tragen

**GEMESSEN am Repo (CC, 2026-09-03).**

**(1) ES GIBT IM REPO KEINEN FALL, IN DEM DER INGEST-PFAD EINEN ZUSTAND SCHREIBT, DEN
DIE OBERFLÄCHE LIEST.** Der Ingest schreibt genau eine Tabelle — `events`, über
`persistEvent` (src/lib/analytics/persist.ts), im `after()`. Die Oberfläche liest sie
über drei RPCs (`get_event_counts`, `get_adblock_loss`, `get_variant_counts`).
**ABER `events` IST KEIN ZUSTAND, SONDERN EIN KUMULATIVER EREIGNISSTROM:** `event_id`
trägt bewusst KEINEN Unique-Constraint (die geteilte browser/server-Kennung IST der
Verlustraten-Join), und es gibt **keinen Reset** — kein `delete` auf `events` im
Produktivcode.
**FOLGE: Ein gespeicherter Ausfall-Zustand wäre ein NEU ERFUNDENES MUSTER**, und zwar
auf dem meistgetroffenen Pfad der Plattform.

**(2) DAS RÜCKSETZEN WÄRE NICHT STRUKTURELL ERZWUNGEN.** Ein Upsert setzt beim Konflikt
**nur die genannten Spalten**; eine nicht genannte bliebe stehen. Das ist keine
Vermutung, sondern der Grund, aus dem `secret: null` in der Callback-Route
(src/app/api/oauth/google/callback/route.ts) **ausdrücklich im Rumpf steht** — der
Kommentar dort sagt es, und `refreshAccessToken` (src/lib/oauth/token-refresh.ts) trägt
denselben Satz an seiner Ablage.
**ES SIND ZWEI SCHREIBSTELLEN**, nicht eine: der Callback und die Erneuerung. Ein
Zustand müsste an **beiden** genannt werden, und eine vergessene Stelle wäre **still**.

**DIE FOLGE, UND SIE IST DER GANZE GEWINN DIESES ZUSCHNITTS: OHNE PERSISTENZ ENTFALLEN
MIGRATION, DROSSELUNG, RÜCKSETZEN — UND DIE ANBIETER-LESUNGS-PFLICHT.** Jene (vierte
Regel in docs/db-regeln.md) hat als Auslöser Migration, Schema, Policy/RLS, RPC bzw.
DB-Funktion, Analytics-Lesepfad, search_path, Advisor-Befunde und Backup/PITR. **KEINER
davon tritt ein.** Wer diese Scheibe später mit Persistenz baut, löst sie **alle vier**
wieder aus.

### Die zwei Todesarten — und die Trennung ist der Kern

· **ABGELAUFEN NACH EIGENER UHR.** Der Zeitpunkt steht in der Nutzlast
  (`refreshTokenExpiresAt` in src/lib/secrets/oauth-payload.ts), **exakt und ohne
  Netzruf ablesbar**. Kein Schreibvorgang nötig.
  **DAS RÜCKSETZEN IST HIER STRUKTURELL ERZWUNGEN**, und das ist der Unterschied zu
  jeder gespeicherten Fassung: Das Neu-Verbinden ersetzt die Nutzlast **GANZHEITLICH**
  (`toOAuthPayload` → `formatOAuthPayload` → `encryptSecret` → Upsert). **Es gibt
  nichts, was überleben könnte.**
  **DAS IST DER FALL, DER AN DEM TERMIN EINTRITT, DEN DER NACHTRAG ZU VORBEDINGUNG (iv)
  FÜHRT** (Abschnitt "1b als Folgetask").
  **HIER STEHT BEWUSST KEIN DATUM MEHR.** Bis zum 2026-09-04 stand hier der 2026-09-08 —
  **dieselbe Angabe an einem zweiten Ort**, und genau das ist schiefgegangen: Zwei
  Neu-Verbindungen haben die Frist zurückgesetzt, (iv) ist nachgezogen worden, und diese
  Stelle wäre stehengeblieben. **Zwei Orte mit demselben Datum laufen auseinander, sobald
  einer nachgezogen wird; ein Zeiger nicht.**
· **WIDERRUFEN** (Passwortwechsel, entzogene Rechte). Die Uhr steht in der **Zukunft**,
  das Token ist trotzdem tot; erfahrbar **nur beim Versuch**. **NUR DIESE HÄLFTE
  BRÄUCHTE PERSISTENZ, UND SIE BLEIBT DRAUSSEN.**

**DIE GRENZE DAZU, GEMESSEN am Code (CC, 2026-09-03) — und sie ist präziser gefasst als
die Vorlage dieses Zuschnitts, weil der Code zwei Wege kennt und nicht einen:**
`refreshAccessToken` liefert `dead`/**`refresh_token_expired`** aus **UNSERER** Uhr,
**ohne Netzruf**, wenn `refreshTokenExpiresAt.kind === "at"` und überschritten ist. Es
liefert `dead`/**`invalid_grant`** aus der **ANBIETER-Antwort**.
**FOLGE: Sobald der Anbieter überhaupt gefragt wird, sind "abgelaufen" und "widerrufen"
am Rückgabewert NICHT trennbar** — beide münden in `invalid_grant`. **Unsere eigene Uhr
trennt nur den Fall, den sie selbst kennt**; bei `{kind:"unknown"}` trennt sie gar
nichts. **Genau deshalb kann die Karte die widerrufene Verbindung nicht anzeigen, ohne
sie zu speichern.**

### Die Lagen, die die Karte tragen muss — SECHS, nicht zwei

**SIE SIND SECHS UND NICHT FÜNF, WEIL DER OWNER AM 2026-09-03 BEIDES VERLANGT HAT —
AUSFALL UND VORWARNUNG.** Der Satz stand im verdichteten Abschnitt "Der Gegenstand" und
ist hierher gerettet: Ohne ihn liest die nächste Runde die zweite Lage als Zutat und
streicht sie beim ersten Aufräumen.

· **LEBT, MIT ABLAUFDATUM.**
· **LÄUFT BALD AB** (die Vorwarnung).
· **TOT SEIT BEKANNTEM ZEITPUNKT.**
· **ABLAUFZEITPUNKT UNBEKANNT.**
· **KLARTEXT-ZIEL OHNE JEDE UHR** — die vier anderen Anbieter.
· **ZEILE UNLESBAR.**

**DIE VIERTE IST DIE, DIE MAN WEGLÄSST, UND DESHALB STEHT IHR GRUND HIER:** Ob Google
nach dem Statuswechsel auf "In Produktion" weiter einen Ablaufzeitpunkt liefert, ist
**UNGEMESSEN** — Zeiger: docs/ziel-befunde.md, Teil (bx), der die Frage ausdrücklich
offen lässt ("WER SIE TRENNEN WILL, BRAUCHT DIESELBE MESSUNG NACH DER VERIFIZIERUNG").
Die Nutzlast kennt dafür den Zustand `{kind:"unknown"}`.
**FEHLT DIE LAGE, ZEIGT DIE KARTE NACH DER VERIFIZIERUNG STILLSCHWEIGEND "ALLES GUT" FÜR
EINEN ZUSTAND, ÜBER DEN SIE NICHTS WEISS — genau der Fehler, den diese Scheibe behebt.**

**DIE SECHSTE EBENSO:** Ein **kaputtes Chiffrat** ist etwas anderes als ein
**abgelaufener Zugang**, und beides etwas anderes als **"nicht konfiguriert"**. Der
Resolver hält die drei heute schon auseinander (fünf Dechiffrier-Zustände, zwei
Lese-Zustände, die zwei Uhren); die Oberfläche kennt nur zwei Zustände.

### Die mitgenommene Schwäche, mit Grund

`listConfiguredTargets` (src/app/projects/actions.ts) antwortet auf **JEDEN** Fehler —
fehlende Sitzung, fremdes Projekt, Datenbankfehler — mit einer **LEEREN LISTE**, und die
Karte liest daraus **"nicht konfiguriert"**. **DIE STELLE BENENNT DAS HEUTE SCHON
SELBST**, im Kommentar an der Statuszeile in `TargetCard` — samt dem Satz, dass ein
vierter Zustand dort nicht ehrlich abzuleiten sei, weil der Unterschied in der Aktion
entsteht.

**DAS IST DIESELBE KRANKHEIT, DIE DIESE SCHEIBE BEHANDELT: Die Oberfläche behauptet
einen Zustand, den sie nicht kennt.**

**WARUM SIE MITKOMMT UND NICHT EIGENS GESCHNITTEN WIRD:** Wir fassen diese Kette
ohnehin an. **Sie stehen zu lassen hiesse, neben einer Anzeige, die Genauigkeit
verspricht, eine Anzeige zu behalten, die bei einem Datenbankfehler fröhlich "nicht
konfiguriert" sagt.**

### Die tragende Invariante an neuem Ort

**DIE AKTION ENTSCHLÜSSELT UND IST DAMIT DER DRITTE ORT IM PRODUKTIVCODE, AN DEM EINE
NUTZLAST EXISTIERT.** GEMESSEN am Repo (CC, 2026-09-03): `parseOAuthPayload` hat heute
**GENAU ZWEI** Produktiv-Aufrufer — `usableTokenFromRow` (src/lib/capi/token.ts) und
`refreshAccessToken` (src/lib/oauth/token-refresh.ts). **Mit dieser Scheibe sind es
drei.**

**IHR RÜCKGABETYP DARF KEIN GEHEIMNIS TRAGEN KÖNNEN — weder Zugangs- noch
Erneuerungs-Token.** Dieselbe Regel wie im Resolver, **und dort wird sie nicht durch eine
Zusage gehalten, sondern durch den TYP**: `RowResolution` ist eine geschlossene Union mit
benannten Feldern, und keines nimmt ein zweites Geheimnis auf. **HIER GENAUSO.** Eine
Zusage im Kommentar wäre an dieser Stelle das Schwächere — der Resolver zeigt, wie es
geht.

### Die geschützten Invarianten der Scheibe 11.2b

**DER TITEL WEICHT ABSICHTLICH VON DEM DES ZUSCHNITTS ZU SCHRITT 1b-1 AB** ("Die
geschützten Invarianten dieses Zuschnitts"): Zwei zeichengleiche `###`-Überschriften in
DERSELBEN Datei machen jeden Such-Anker mehrdeutig, und der erste Treffer wäre
systematisch der falsche (docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT,
IST ES IN EINER DATEI MIT VERZEICHNIS NICHT").

**(I-1) KEIN GRÜN, KEIN HAKEN, KEIN PUNKT AN DER KONFIGURIERTEN KARTE.** Die Regel steht
im Code, an der Statusfläche in `TargetCard`, und trägt ihre Begründung: **Grün heisst in
der Bildsprache jeder Oberfläche "läuft"** — genau die Aussage, die dort nicht gehalten
wird. Ein Test hält die Grenze.
**DASS DIESE SCHEIBE EINE AMPEL HEISST, HEBT SIE NICHT AUF** — sie schafft die
Voraussetzung, unter der eine Aussage überhaupt gehalten werden könnte, und entscheidet
nichts über Farben.
**(I-2) DER EIGENTUMS-GATE-VORLAUF BLEIBT:** erst die Sitzung am authenticated-Client,
**dann** der Admin-Client. `project_secrets` trägt RLS **ohne jede Policy** — anders ist
die Tabelle nicht lesbar, und die Reihenfolge ist in `listConfiguredTargets` als HARTE
INVARIANTE ausgeschrieben.
**(I-3) DER INGEST-PFAD WIRD NICHT ANGEFASST** — kein `src/lib/capi/token.ts`, kein
`src/lib/capi/ingest.ts`.
**(I-4) `token-refresh.ts`, `google-refresh.ts` UND `refresh-run.ts` BLEIBEN UNBERÜHRT.**
**(I-5) KEINE MIGRATION, KEINE SPALTE, KEIN SCHREIBVORGANG.**

### Was die Scheibe 11.2b ausdrücklich nicht baut, je mit Grund

**DER TITEL WEICHT ABSICHTLICH VON DEM DES ZUSCHNITTS DER SCHEIBE 1b-2a AB** ("Was diese
Scheibe ausdrücklich nicht baut, je mit Grund") — aus demselben Grund wie bei den
Invarianten darüber: Ein zeichengleicher Titel machte jeden Such-Anker mehrdeutig.

· **DIE WIDERRUFENE VERBINDUNG.** Sie ist am Rückgabewert nicht von "abgelaufen" zu
  trennen (s. die Grenze oben) und bräuchte als einzige Lage **Persistenz**.
  **TRIGGER: die erste Messung, die `invalid_grant` bei LEBENDER Uhr zeigt** — erst dann
  ist der Fall überhaupt beobachtet und nicht nur gedacht.
· **JEDE BENACHRICHTIGUNG AUSSERHALB DER OBERFLÄCHE** — keine E-Mail, kein Webhook, kein
  Log-Kanal. Die Scheibe macht einen Zustand sichtbar, sie stellt ihn niemandem zu.
· **JEDE PERSISTENZ.** Der Grund steht oben in den zwei Befunden und ist der
  Kern dieses Zuschnitts.

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

### VERMERK 9 (Commit 6dc7e27) — DIE SCHEIBE 2 IST GEBAUT UND LIVE BEWIESEN

**DER COMMIT** ist am Repo ermittelt (CC, 2026-08-31): eine Suche über die
Commit-Botschaft **und** zwei unabhängige `-S`-Gegenproben auf Zeichenfolgen, die dieser
Diff erst eingeführt hat (`NORMALIZE_PIXEL_ID`, `eventAxisTargets`, beide über
`src/lib/settings.ts`) — **je genau ein Treffer, `6dc7e27`.**

**WAS GEBAUT WURDE:** `settings.pixels.google` kann über die Oberfläche entstehen — die
Karte trägt ein öffentliches Feld für die **Kundennummer**, die Ereignis-Achse einen
zweiten Block für die **`productDestinationId`**. **KEIN NEUES FELD im Typ:** beide
Kennungen belegen die zwei vorhandenen Slots, `settingsEqual` ist unverändert. Die
Kundennummer wird an der EINGABE normalisiert (`NORMALIZE_PIXEL_ID`, erschöpfend über
`TrackingTarget`, der Trim bleibt DAVOR); die Ereignis-Achse führt zwei Ziele, ihre
Ordnung ist aus `TRACKING_TARGETS` ABGELEITET (`eventAxisTargets`); die label-gebundene
Nicht-Auslieferungs-Zeile hängt zusätzlich am Adapter. **Suite: 70 Dateien, 1436 Tests**
(vorher 70/1421). Alle vier Gates waren vor dem Commit grün.

**DREI BESTANDSLÄUFE SIND UMGESCHRIEBEN, NICHT REPARIERT** — sie hielten die Zusicherung
"Google hat kein öffentliches Feld", und genau die hebt diese Scheibe auf:
`tracking/target-cards.test.ts` ("fuehrt EIN oeffentliches und KEIN Geheimnis-Feld"),
`TargetCard.test.tsx` (aus "T-A2 (TOR 1, Daten-Seite)" wurde "die Google-Karte fuehrt
GENAU EIN Eingabefeld") und dort der `else`-Zweig von "JEDES Ziel". **Jeder nennt im
Kommentar die aufgehobene Zusicherung**; der dritte zusätzlich den WECHSEL DES TRÄGERS —
die Zeile unterblieb bis hierher, WEIL das Label fehlte, seither, WEIL der Adapter-Term
davorsteht. Ohne diesen Satz wäre derselbe grüne Test aus einem anderen Grund grün.

---

**DER LIVE-TEST — GEMESSEN 2026-08-31 vom OWNER, an der ausgelieferten Anwendung.**
Deployment vorher als "Ready" bestätigt.

- **0, die Regression:** Die Meta-Karte unverändert — Feld, Platzhalter, Statuszeile.
- **1:** Das Feld "Google-Ads-Kundennummer" erscheint; die Regel-Blöcke stehen in der
  Ordnung **LinkedIn, Google**.
- **2:** Die Normalisierung ist **im Feld sichtbar** — Bindestriche fallen beim Tippen.
  Der Cursor verhält sich unauffällig.
- **3:** Die Dirty-Gegenprobe greift: "Ungespeicherte Änderungen" erscheint, der
  Projektwechsel fragt nach, der Wert überlebt Speichern und Wechsel.
- **4:** Google- und LinkedIn-Regeln speichern getrennt.
- **5:** Kein Geheimnis-Feld; Verbinden und Trennen unverändert.
- **6:** Bei verbundener Instanz ohne Kundennummer steht **NUR** der Adapter-Hinweis.
- **7:** **DER CONSENT-VERGLEICH IST GEFAHREN UND BESTANDEN.** Die VORHER veröffentlichte
  Seite trug den Schlüssel `"google"` NICHT; nach dem Veröffentlichen mit hinterlegter
  Kundennummer trägt sie ihn.

**WAS SCHRITT 7 ZUSÄTZLICH BELEGT, und es steht in keiner Beweis-Achse:** Der Owner hatte
**NUR die Kundennummer** hinterlegt. Damit ist **am ausgelieferten Artefakt** bestätigt,
was am Code gemessen war — `isTargetDeliverable` ist ein **ODER**, und die Kundennummer
ALLEIN reicht. **Festlegung (3) ist live eingelöst und nicht nur benannt.**

---

**WAS DER LIVE-TEST NICHT ZEIGT:**
- **WELCHES TOR HÄLT.** Tor B und Tor D sind **je für sich hinreichend**; ein
  ausbleibendes Ereignis sieht unter beiden identisch aus. Das leisten **allein** "TOR 2"
  in `capi/token.test.ts` und `W-google` in `capi/fan-out.test.ts` — **beide aus Scheibe
  3, beide unverändert.**
- **DASS EINE ECHTE KUNDENNUMMER VOM ANBIETER ANGENOMMEN WIRD.** Kein Transport.
- **VERMERK 2 IST NICHT GETILGT.** `buildGoogleEvent` und `extractGoogleClickIds` haben
  weiterhin keinen Aufrufer im Produktivcode. **Die Schuld wandert an Scheibe 4.**

---

**DER STAND DES SCHNITTS, UND ER STEUERT DIE NÄCHSTE SITZUNG:** **1a, 2 und 3 stehen.**
Die GRENZE der bindenden Entscheidung (6) lautet "Zwingend ist NUR 4 nach 1a, 2 und 3" —
**SCHEIBE 4 IST DAMIT ENTSPERRT.** **1b bleibt offen und ist für 4 nicht zwingend.**

---

**DIE MUTATIONSPROBEN — DREI, je mit Vorhersage VOR dem Lauf, danach zurückgenommen:**
- **Die Normalisierung entfernt.** Vorhergesagt: zwei Läufe. **Gefallen: ACHT.**
- **Sie auf alle Ziele ausgeweitet.** Vorhergesagt: einer. **Gefallen: ZWEI.** Die vorab
  benannte Überschuss-KLASSE ("Bestands-Fixtures mit Trennzeichen bei einem anderen
  Ziel") war **LEER**, wie nach der Fixture-Korrektur angesagt.
- **`'google'` in `TARGETS_WITH_ADAPTER`.** Vorhergesagt und gefallen: **genau
  `W-google`.** Kein Überschuss.

**BEIDE ÜBERSCHÜSSE SIND GEPRÜFT UND NICHT VERBUCHT — ES IST DECKUNG, KEINE KASKADE**
(Lektion (g) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"): Alle Zusatztreffer melden
DIESELBE Assertion-Gestalt, einmal an der reinen Funktion und einmal am Bedienweg —
wörtlich `expected '987-654-3210' to be '9876543210'` und Verwandte.

**DIE URSACHE IST BENENNBAR, UND SIE IST NEU:** Die Vorhersagen stammten aus **Stufe 1**,
und der Testbestand ist seither um Läufe gewachsen, **die dieselbe Achse messen**. **Eine
Vorhersage über einen gewachsenen Bestand ist systematisch zu niedrig.**
**DER STRUKTURELLE AUSLÖSER GEHÖRT DAZU, sonst liest sich der Befund als Unachtsamkeit:**
Der Bau-Prompt sagte "mit den Vorhersagen aus Stufe 1", statt sie vor dem Lauf gegen den
aktuellen Bestand aktualisieren zu lassen. **In der Fix-Scheibe hat CC genau das getan —
dort stand keine solche Vorgabe.** Der Hebungs-Kandidat dazu steht unten.
**KEINE ZAHL WIRD IN docs/immer-beachten.md NACHGEZOGEN** — das ist Doku-Arbeit mit
eigenem Trigger (Vorrats-Eintrag 20).

---

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, die Commit-Nummer und der
Objekt-Nachweis GEMESSEN am Repo bzw. an den Läufen vom 2026-08-31 (CC). Die Live-Werte
GEMESSEN 2026-08-31 (OWNER) an der ausgelieferten Anwendung. Die Mutationsergebnisse
GEMESSEN an denselben Läufen. Dass Schritt 7 das ODER in `isTargetDeliverable` belegt, ist
eine FOLGE aus dem Zustand, den der Owner hergestellt hat, plus der Code-Messung — keine
zweite Beobachtung. Die Entsperrung der Scheibe 4 ist eine FOLGE aus der GRENZE der
bindenden Entscheidung (6), keine Messung.

### VERMERK 10 (Bau-Commits 26caa38, 84e9fca) — DIE SCHEIBE 4 IST GEBAUT UND LIVE BEWIESEN

**DIE ZWEI COMMITS SIND AM REPO ERMITTELT** (CC, 2026-09-01), nicht aus einem Prompt
übernommen — je eine Suche über die Commit-Botschaft **und zwei unabhängige `-S`-Gegenproben**
auf Zeichenfolgen, die der jeweilige Diff erst eingeführt hat, **je genau ein Treffer**:
· **`26caa38`** (`feat(capi)`) — der Transport. Gegenproben: `export async function
  forwardToGoogle` und `GOOGLE_INGEST_ENDPOINT` über `src/lib/capi/google-forward.ts`, dazu
  `function hasUsableAccessToken` über `src/lib/capi/token.ts`.
· **`84e9fca`** (`fix(capi)`) — `transactionId`. Gegenprobe: `transactionId: eventID` über
  `src/lib/capi/google-forward.ts`.
**IM KOPF STEHEN DIE BAU-COMMITS UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** — der ist
ein `docs(claude)`-Commit und entsteht erst mit dieser Runde. **DIE BEZEICHNUNG IST ABSICHT:**
VERMERK 6 führt im Kopf den Commit des VERMERKS und nennt den Bau-Commit im Rumpf, VERMERK 9
führt im Kopf den BAU-Commit. Beide Bauformen stehen in dieser Datei nebeneinander; hier ist
das Wort "Bau-Commits" hinzugesetzt, damit an diesem Kopf nicht geraten werden muss. **Die
Hausform selbst wird dadurch nicht entschieden.**

---

**(a) WAS GEBAUT IST — IN SYMBOLEN, GEMESSEN am Repo (CC, 2026-09-01).**

Der Transport-Commit fasste NEUN Dateien an, ZWEI davon neu (`src/lib/capi/google-forward.ts`
und seine Testdatei).

· **DER LESEPFAD FÜR BEIDE GEHEIMNIS-KLASSEN LIEGT IN `getCapiConfigByTrackingKey`**
  (`src/lib/capi/token.ts`) — Festlegung (1), unverändert eingelöst. Die Geheimnis-Abfrage
  selektiert seither `("target, secret, secret_enc")`; **das ist EINE SPALTE, KEINE zweite
  Datenbank-Runde**, die Zahl bleibt bei ZWEI im Request plus dem Persist im `after()`.
· **`usableTokenFromRow`** (ebenda, modul-privat) verzweigt **JE ZEILE** nach Geheimnis-Klasse:
  Klartext in `secret` wie bisher, Chiffrat in `secret_enc` über `decryptSecret` und
  `parseOAuthPayload`. Der Grund einer unbrauchbaren Zeile wird als `decrypt_<kind>` bzw.
  `parse_<kind>` geloggt — **ein Mitglied UNSERER Union, kein Fremdtext.**
· **DAS MODUL-PRIVATE PRÄDIKAT FÜR UHR 1 HEISST `hasUsableAccessToken`** (ebenda) und prüft
  `expiresAtSeconds > nowSeconds` — **fail-closed, kein Vorlauf**, Festlegung (3). Ein Ziel
  mit toter Uhr 1 erzeugt kein `ResolvedTarget` und ist damit von einem Ziel ohne Zugangsdatum
  ununterscheidbar.
· **TOR D IST GEFALLEN:** `'google'` steht in `TARGETS_WITH_ADAPTER`
  (`src/lib/tracking/target-adapters.ts`), und die Zeile trägt den Satz "UND DIESE ZEILE IST
  TOR D" in ihrem eigenen Kommentar. **DAMIT IST DIE GRENZE DER FESTLEGUNG (6) DER SCHEIBE 3
  EINGELÖST** — dort hiess es, Scheibe 4 zahle diesen Preis; er ist gezahlt und nicht umgangen.
· **`FORWARDER_BY_TARGET`** (`src/lib/capi/ingest.ts`) hat seinen `google`-Eintrag. Er reicht
  VIER von SECHS Argumenten weiter und benennt `entry.config.pixelId` am Verbraucher in
  `operatingAccountId` um, ohne den Slot in `CapiConfig` anzutasten. **KEIN PARALLELER PFAD** —
  bindende Entscheidung (8), unverändert.
· **`forwardToGoogle`** (`src/lib/capi/google-forward.ts`) in der Bauform von
  `linkedin-forward.ts`: das `try` beginnt VOR dem Nutzlast-Bau und umschliesst die drei
  Riegel; eigene Timeout-Konstante `GOOGLE_FORWARD_TIMEOUT_MS` mit 3000 ms; **der
  Anbieter-Rumpf wird NICHT gelesen** — kein `res.text()`, kein `res.json()`, keine
  `describe*`-Funktion.
· **`transactionId` = `eventID`** (Commit `84e9fca`), **unbedingt gesetzt**, nicht über ein
  Spread-Muster. Das Feld ist bei der Offline-Gestalt PFLICHT (GEMESSEN 2026-09-01, OWNER,
  Messung D — docs/ziel-befunde.md, Google-Abschnitt, Teil (ca)).

**DIE DREI WÄCHTER AUS DEM VERDICHTETEN ZUSCHNITT SIND ERSETZT, KEINER GESTRICHEN** (GEMESSEN
am Repo, CC, 2026-09-01):
· **`TOR 2`** (`src/lib/capi/token.test.ts`) steht unter demselben Namen und misst ab jetzt
  "Zeile OHNE brauchbares Geheimnis in BEIDEN Spalten"; die abgelaufene Hälfte seiner
  Vorhersage ist in seinem Kommentar ausdrücklich als abgelaufen benannt. Daneben steht
  "TOR 2, POSITIVKONTROLLE".
· **`W-google`** (`src/lib/capi/fan-out.test.ts`) läuft jetzt durch den Zweig "das aufgelöste
  Ziel erreicht GENAU seinen Adapter, die anderen NICHT"; **der Ersatz für die zweite Hälfte
  ist der eigene Lauf `W-REST`.**
· **`T15`** hat einen benannten Ersatz bekommen: **`T15-ERSATZ: der Ingest-Pfad
  ENTSCHLUESSELT, ERNEUERT ABER NIE`** (`src/lib/capi/token.test.ts`). Der ursprüngliche `T15`
  in `src/lib/oauth/token-refresh.test.ts` steht unverändert und trägt seine Grenze an sich
  selbst.

**SUITE:** 71 Dateien / **1457** Tests (vorher 70/1436, VERMERK 9). Alle vier Gates waren vor
jedem der beiden Commits grün. **DIE AUFTEILUNG DES ZUWACHSES AUF DIE ZWEI COMMITS IST EINE
ABLEITUNG AUS ZWEI GEMESSENEN ENDPUNKTEN**, keine dritte Messung: Der Fix-Commit hat die Zahl
nicht verändert (1457 vor und nach), also fällt der ganze Zuwachs auf `26caa38`.

---

**(b) DIE DREI SCHULDEN — EINZELN, UND JEDE IST EINGELÖST.**

**DER LIVE-TEST — GEMESSEN 2026-09-01 vom OWNER, an der ausgelieferten Anwendung.**

· **Schritt 0, Neu-Verbinden:** beide Uhren zurückgesetzt.
· **Schritt 1, die Regression:** ein Klartext-Ziel (Meta) läuft **unverändert** und
  dedupliziert sauber.
· **Schritt 2, der Transport mit einer VON HAND GESETZTEN `gclid`:** durchgelaufen, **KEINE
  Fehlerzeile im Vercel-Log.**
· **Schritt 3, der Mehr-Schritte-Fall:** auf der Folgeseite fehlt die `gclid`, **es entsteht
  kein Ereignis.**
· **Schritt 5, die Positivkontrolle:** `[capi] Google forward skipped: no_click_id` im
  Wortlaut im Log.

**SACHKORREKTUR 2026-09-02 — DIE HERKUNFT DER KLICK-KENNUNG. ERSETZT, NICHT GESTEMPELT, UND
SIE GILT FÜR JEDE STELLE DIESER DATEI, DIE SCHRITT 2 ODER SCHRITT 3 BESCHREIBT.**

**OWNER-ANGABE 2026-09-02:** Die Klick-Kennungen des Live-Tests waren **VON HAND IN DIE
BROWSERZEILE GESETZT** und **STAMMEN AUS KEINEM KLICK**. Schritt 3 benutzte dieselbe von Hand
gesetzte Adresse, nicht einen zweiten Anzeigenklick.

**ES WAREN ZWEI WERTE IM EINSATZ, UND SIE WERDEN NICHT ZUGEORDNET:** **`EAIaIQobChMI`** und
**`Tester-123`** — beide vollständig, kein gekürztes Zitat. **WELCHER WERT ZU WELCHEM
ADAPTER-AUFRUF GEHÖRT, IST NICHT REKONSTRUIERBAR** (OWNER-ANGABE 2026-09-02).
**DASS BEIDE WERTE OHNE ZUORDNUNG DASTEHEN, IST DIE HALTBARERE FASSUNG, UND DER GRUND GEHÖRT
DAZU:** Eine Zuordnung, die niemand belegen kann, wäre eine erfundene Genauigkeit — und die
tragende Aussage braucht sie nicht. **Sie gilt unter JEDER Lesart: von Hand gesetzt, aus keinem
Klick.** Wer hier später einen einzelnen Wert einsetzt, legt eine Zuordnung fest, für die es
keine Grundlage gibt.

**WAS BEWIESEN BLEIBT, BLEIBT BEWIESEN — und dieser Absatz steht VOR dem, was fällt, damit die
Korrektur nicht als Relativierung des ganzen Nachweises gelesen wird:** Der Transport
funktioniert. Der Adapter baut die Nutzlast, `extractGoogleClickIds` findet die Kennung,
`buildGoogleEvent` verwirft **nicht**, der Netzruf geht hinaus. **Die Positivkontrolle aus
Schritt 5 ist unberührt** — sie hängt an der ABWESENHEIT einer Kennung und nicht an deren
Herkunft. **Schuld 1 und Schuld 2 sind unberührt.** Der Befund aus Schritt 3 ist unberührt:
`location.href` trägt die Kennung nach einem Seitenwechsel nicht mehr, und das ist eine
Eigenschaft des Browsers, die nicht davon abhängt, wer den Query-String geschrieben hat.

**WAS FÄLLT, IST AUSSCHLIESSLICH DIE QUALIFIZIERUNG DER KENNUNG ALS ECHT** — und damit die
Aussage, der Pfad sei je mit einem **gültigen Klick** durchlaufen worden. Er ist es nicht.

**DIE ZWEITE FOLGE IST GRÖSSER ALS DIE ERSTE UND STEHT DESHALB EIGENS DA: DAS AUTO-TAGGING IST
NICHT GEMESSEN.** Der Query-String stammt nicht von Google, sondern vom Owner. Was Schritt 2
über die Parameternamen belegt, ist damit eine Aussage über **UNSERE Extraktion gegen einen
selbst gesetzten Wert** — also dieselbe Achse wie die Messung vom 2026-08-24 (VERMERK 1), nur
diesmal über den vollständigen Produktivpfad. **Über die Schreibung der Parameter, die GOOGLE
anhängt, sagt der Durchlauf nichts.** Vorrats-Eintrag 4 ist im selben Zug berichtigt.

**PROVENIENZ:** OWNER-ANGABE 2026-09-02, aus erster Hand. **KEINE Messung** — weder an einer
Google-Oberfläche noch an einem Log. Die Live-Werte der Schritte selbst bleiben GEMESSEN
2026-09-01 (OWNER); korrigiert ist die **Herkunft der Eingabe**, nicht die Beobachtung.

**SCHULD 1 — DER EIGENE NACHWEIS DIESER SCHEIBE: EINGELÖST.** Ein Ereignis von einer
gehosteten Kundenseite erreicht Google. Damit sendet das fünfte Fan-Out-Ziel.

**SCHULD 2 — DIE SCHULD AUS VERMERK 2: EINGELÖST.** `buildGoogleEvent` und
`extractGoogleClickIds` (Scheibe 11.2a, Commit `6653f37`) hatten seit dem **2026-08-25 KEINEN
Aufrufer im Produktivcode**; nur ihre Tests riefen sie. Die Schuld ist über VERMERK 6, 7 und 9
mitgewandert und **endet hier**: Beide laufen jetzt im Produktivpfad, und Schritt 2 hat sie
gefahren. **DAS IST EINE ABLEITUNG AUS ZWEI LOGZEILEN UND KEINE ABLESUNG DER NUTZLAST:** Hätte
`extractGoogleClickIds` nichts gefunden, verwürfe `buildGoogleEvent` mit `no_click_id`, und die
Zeile aus Schritt 5 stünde auch in Schritt 2. Sie steht dort nicht, und eine Fehlerzeile
ebenfalls nicht — also ist eine Nutzlast MIT Kennung hinausgegangen.

**SCHULD 3 — DIE RESTLÜCKE AUS VERMERK 1: DIE ZWEITE HÄLFTE IST EINGELÖST, DIE ERSTE NICHT.**
· **ERSTE HÄLFTE — dass eine ECHTE `gclid` denselben Weg nimmt wie der selbstgesetzte Testwert
  vom 2026-08-24: WEITERHIN OFFEN.**
  **SACHKORREKTUR 2026-09-02 — ERSETZT, NICHT GESTEMPELT.** Hier stand "**: JA.** Schritt 2 hat
  sie über eine echte Anzeige erzeugt, nicht von Hand eingetippt." **Das trifft nicht zu** —
  s. die Sachkorrektur zur Herkunft der Klick-Kennung in Abschnitt (b) oben. Die Kennung war
  von Hand gesetzt; **es hat keinen Anzeigenklick gegeben.**
  **WAS SCHRITT 2 STATTDESSEN EINGELÖST HAT, und es ist nicht nichts:** Der selbstgesetzte
  Wert hat zum ersten Mal den **VOLLSTÄNDIGEN PRODUKTIVPFAD** durchlaufen — Beacon,
  `extractGoogleClickIds`, `buildGoogleEvent`, Adapter, Netzruf. VERMERK 1 hatte nur gemessen,
  dass er im `eventSourceUrl` **ankommt**. **Die Restlücke ist damit kleiner geworden, nicht
  geschlossen.**
· **ZWEITE HÄLFTE — ob die Kennung auf einer Seite mit MEHREREN SCHRITTEN überlebt: NEIN**, und
  das ist ein Befund und kein Fehlschlag. S. Abschnitt (e). **VON DER SACHKORREKTUR UNBERÜHRT:**
  Dass `location.href` nach einem Seitenwechsel den Query-String nicht mehr trägt, hängt nicht
  daran, wer ihn geschrieben hat.

**EIN NEBENBEFUND AUS SCHRITT 2, DER VORRATS-EINTRAG 4 BERÜHRT — ABLEITUNG, KEINE MESSUNG AM
PARAMETERNAMEN:** Jener Eintrag hält fest, dass die schreibungssensitive, kleingeschriebene
Wahl der URL-Parameternamen (`gclid` · `gbraid` · `wbraid`) sich **auf nichts Gelesenes**
stützt, und schliesst mit "DIE ERSTE MESSUNG NIMMT SIE MIT". VERMERK 3 und VERMERK 4 haben
ausdrücklich festgehalten, dass die Messungen A und B1 sie NICHT eingelöst haben (beide haben
keinen Query-String benutzt). **SCHRITT 2 HAT EINEN BENUTZT — ABER EINEN VON HAND GESETZTEN,
NICHT DEN, DEN GOOGLE ANHÄNGT.**
**SACHKORREKTUR 2026-09-02 — ERSETZT, NICHT GESTEMPELT.** Hier stand "den, den Google selbst
angehängt hat." Das trifft nicht zu; s. die Sachkorrektur zur Herkunft der Klick-Kennung in
Abschnitt (b) oben.
**WAS VON DEM NEBENBEFUND BLEIBT:** Aus der Abwesenheit von `no_click_id` folgt weiterhin,
dass **mindestens einer der drei kleingeschriebenen Namen getroffen hat** — nur ist das jetzt
eine Aussage über **UNSERE Extraktion gegen einen selbst gesetzten Wert** und **nicht** über
Googles Auto-Tagging. **WELCHER der drei getroffen hat, ist nach wie vor NICHT GEMESSEN**, und
über die zwei übrigen sagt der Durchlauf nichts.
**WAS NICHT MEHR BLEIBT:** Der Satz "DIE ERSTE MESSUNG NIMMT SIE MIT" aus Vorrats-Eintrag 4
ist damit **NICHT** eingelöst — auf der Auto-Tagging-Achse steht der Eintrag unverändert da,
wo er am 2026-08-25 stand. **Vorrats-Eintrag 4 ist im selben Zug berichtigt.**

---

**(c) DIE VIERTE ACHSE: EIN ZUGANGSDATUM AUS DEM IN 11.8 GEBAUTEN FLUSS TRÄGT AN DIESER
SCHNITTSTELLE.**

**SIE IST NICHT DURCH DEN GEGLÜCKTEN DURCHLAUF BELEGT, SONDERN DURCH DIE ART DES VORHERIGEN
FEHLSCHLAGS** — und dieser Satz ist der ganze Inhalt des Abschnitts: Der geglückte Durchlauf
erzeugt **KEINE Logzeile**, aus der sich ein Statuscode ablesen liesse. Belegen kann nur der
Aufruf, der gescheitert ist.

**DER BEFUND:** **EIN** Adapter-Aufruf aus dem Live-Test der Scheibe 4 endete mit **HTTP 400**
(Aufruf 1 in Teil (ca); im eigenen Log als `[capi] Google forward failed: HTTP 400`). **400 IST
WEDER 401 NOCH 403.** Der Anbieter ordnet `UNAUTHENTICATED` einer 401 und `PERMISSION_DENIED`
einer 403 zu (GELESEN, Google-Abschnitt); die Anfrage ist also an der Authentifizierung
**vorbeigekommen** und erst an einem Feld ihres Rumpfes gescheitert.

**DER UNBESTIMMTE ARTIKEL IST EINE SACHKORREKTUR VOM 2026-09-02, ERSETZT UND NICHT
GESTEMPELT.** Hier stand "**Der** Adapter-Aufruf", also im bestimmten Singular. **DER
LIVE-TEST HAT MEHR ALS EINEN ERZEUGT:** Schritt 2 protokolliert ausdrücklich "KEINE
Fehlerzeile im Vercel-Log", dieser hier eine 400 — **zwei verschiedene Aufrufe**, und die
Owner-Angabe vom 2026-09-02 (zwei von Hand gesetzte Klick-Kennungen, keine Zuordnung) bestätigt
es. **DER BESTIMMTE ARTIKEL BEHAUPTETE, ES HABE NUR EINEN GEGEBEN.**
**DIE ABLEITUNG DIESES ABSCHNITTS IST DAVON UNBERÜHRT UND WIRD NICHT SCHWÄCHER:** Sie ruht auf
dem **Statuscode** dieses einen gescheiterten Aufrufs — 400 statt 401 oder 403 —, und der ist
unabhängig davon, wie viele Aufrufe daneben liefen. **Ein zweiter, geglückter Aufruf spricht
für dieselbe Aussage, nicht gegen sie.**

**PROVENIENZ: ABLEITUNG AUS DEM STATUSCODE. KEINE EIGENE MESSUNG** — es ist kein Aufruf
gefahren worden, dessen Zweck diese Frage war.

**WAS DAMIT EINGELÖST IST: GRENZE 3 IN TEIL (bm).** Sie lautete: "DAS ZUGANGSDATUM STAMMT AUS
DEM OAUTH-PLAYGROUND DES ANBIETERS, NICHT AUS UNSEREM FLUSS. … Ob ein Zugangsdatum aus dem in
Phase 11.8 gebauten Fluss an dieser Schnittstelle ebenso trägt, ist NICHT gemessen." **Es
trägt.**

**WAS DAMIT NICHT EINGELÖST IST, und die Trennung ist scharf:** Der Befund sagt, dass das
Zugangsdatum **authentifiziert** und für die **eigene** Kundennummer nicht mit 403 abgewiesen
wird. Über eine **fremde** Kundennummer sagt er nichts — das ist eine eigene Achse und ein
eigener offener Punkt.

---

**(d) DIE POSITIVKONTROLLE IST DER TRAGENDE TEIL DIESES NACHWEISES, NICHT SEINE FUSSNOTE.**

**DER ADAPTER LIEFERT BEI ERFOLG KEINE LOGZEILE.** Er liest den Anbieter-Rumpf bewusst nicht
(TRANSIT-ONLY); ein 200 erzeugt nichts, ein Nicht-2xx nur den nackten Statuscode. **DER
ERFOLGSBELEG IST DAMIT EIN SCHWEIGEN — und Schweigen ist von "gar kein Verkehr" nicht zu
unterscheiden.** Ein Beacon, der den Ingest nie erreicht, ein Consent-Riegel, der fail-closed
verwirft, ein Ziel, das gar nicht aufgelöst wurde: alle drei sehen im Log **identisch** aus wie
ein geglückter Forward.

**SCHRITT 5 HAT DAS GETRENNT.** Derselbe Weg, dieselbe Seite, nur ohne `gclid` — und im Log
steht `[capi] Google forward skipped: no_click_id` im Wortlaut. Das beweist, dass der Adapter
**erreicht wird**: Diese Zeile entsteht INNERHALB von `forwardToGoogle`, hinter dem Consent-Gate,
hinter der Auflösung und hinter zwei Riegeln.

**OHNE SCHRITT 5 WÄRE DER NACHWEIS AUS SCHRITT 2 NICHT BELASTBAR GEWESEN.** Er ist eine
Abwesenheits-Beobachtung, und eine solche ohne Positivkontrolle ist von einem kaputten
Instrument nicht zu unterscheiden — docs/immer-beachten.md, Lektion (d) an "MUTATIONSPROBEN UND
LIVE-TEST-INSTRUMENTE", und die Auflage aus "BEVOR EIN ERGEBNIS BEURTEILT WIRD …", Teil (a):
ein Mitläufer im SELBEN Lauf, dessen Soll-Ausgang VORHER feststeht.

---

**(e) SCHRITT 3 IST DER `no_click_id`-RIEGEL — NICHT TRANSIT-ONLY. DIE EINORDNUNG WIRD HIER
KORRIGIERT.**

**TRANSIT-ONLY VERBIETET, DIE KENNUNG ABZULEGEN.** In Schritt 3 ist **gar keine da** — es gibt
nichts, was abzulegen wäre. Wer den Schritt als Beleg für TRANSIT-ONLY protokolliert, schreibt
einer Invariante einen Nachweis zu, den sie nicht erbracht hat, und hält eine ANDERE für
geprüft.

**DIE KETTE, GLIED FÜR GLIED:** Der Browser reicht die `gclid` beim Wechsel auf eine Folgeseite
nicht weiter · `location.href` trägt sie zur Conversion-Zeit nicht mehr · der Beacon setzt
`eventSourceUrl` aus genau diesem `location.href` (`buildCapiBeaconStatement`,
`src/lib/tracking/meta.ts`) · `extractGoogleClickIds` findet keinen der drei Parameter ·
`buildGoogleEvent` verwirft mit `no_click_id` · der Adapter kehrt vor dem Netzruf zurück.

**DIE PRODUKTEIGENSCHAFT DAHINTER, und sie ist grösser als diese Scheibe: CONVERSIONS AUF
FOLGESEITEN SIND FÜR GOOGLE HEUTE NICHT MESSBAR.** Ein Funnel, dessen Conversion nicht auf der
Landepage stattfindet, erzeugt bei diesem Ziel nichts. **DAS IST KEIN DEFEKT DIESER SCHEIBE** —
es ist die Folge der gewählten Gestalt (OFFLINE CONVERSION IMPORT auf Basis der Klick-Kennungen)
und der Auflage TRANSIT-ONLY zusammen. Als eigener Vorrats-Eintrag verortet.

---

**(f) WAS DER NACHWEIS NICHT ZEIGT — SECHS, EINZELN.**

· **OB IM GOOGLE-ADS-KONTO EINE CONVERSION VERBUCHT WIRD.** Ein 200 belegt die **ANNAHME der
  Anfrage**, nicht eine verbuchte Conversion; die Zuordnung läuft **asynchron** und ist an
  diesem Endpunkt nicht beobachtbar. Messung D hat eine **erfundene** `gclid` ("Tester-123")
  mit 200 angenommen bekommen — die Schnittstelle prüft die Form der Klick-Kennung beim
  Einliefern nicht (Teil (ca)/(e)). **Diese Achse braucht ein anderes Instrument — und es
  sind ZWEI, nicht eines.**
  **SACHKORREKTUR 2026-09-02, ERSETZT UND NICHT GESTEMPELT.** Hier stand "**Diese Achse
  braucht ein anderes Instrument: die Oberfläche des Kontos.**" **DAS NENNT EIN INSTRUMENT, WO
  ES ZWEI GIBT.**
  · **DER DIAGNOSTIK-ENDPUNKT `requestStatus:retrieve`** beantwortet, **was mit dem Datensatz
    geschehen ist** — und er hat es getan: Messung E (docs/ziel-befunde.md, Teil (cb)) hat für
    genau diese Anfrage `FAILED` und `PROCESSING_ERROR_REASON_INVALID_GCLID` zurückbekommen.
    **Die Achse war also nicht unerreichbar, sondern nur nicht abgefragt.**
  · **DIE OBERFLÄCHE DES KONTOS** bleibt für die **andere Hälfte** unersetzt, und deshalb
    bleibt sie hier stehen: **Ob eine Conversion tatsächlich verbucht UND ZUGEORDNET wurde,
    sagt auch ein `SUCCESS` nicht.** Der Diagnostik-Endpunkt meldet Verarbeitung, nicht
    Verbuchung.
  **PROVENIENZ:** GEMESSEN 2026-09-02 (OWNER), Messung E. Dass die Oberfläche für die zweite
  Hälfte unersetzt bleibt, ist eine **ABLEITUNG** aus der gelesenen Bedeutung von `SUCCESS`
  ((p)/H5), **keine Messung** — ein `SUCCESS` ist an diesem Konto nie beobachtet worden.
· **OB `"WEB"` FACHLICH RICHTIG IST.** Gemessen ist der TYP (Enum) und die ANNAHME des Wertes,
  nicht die Zuordnung. Ein fachlich falsches Enum-Mitglied wird nicht gemeldet.
· **OB `x-goog-user-project` ENTBEHRLICH IST.** Ein erfolgreicher Aufruf ohne die Kopfzeile ist
  **kein** Beleg — eine Projekt- oder Kontingentprüfung kann hinter dem liegen, was erreicht
  wurde (Teil (bu), Grenze 2 in (bm)).
· **WAS BEI EINER FREMDEN KUNDENNUMMER GESCHIEHT.** Der Durchlauf benutzt die **eigene**.
  Eigener offener Punkt, Trigger mit diesem Nachweis EINGETRETEN.
· **WAS BEI EINEM DOPPELTEN `transactionId` GESCHIEHT.** **Widerspruch 4 ist mit dem Einbau
  SCHARF** (Teil (y), fortgeschrieben in (ca)/(f)): Eine Stelle sagt Zusammenführung, eine
  andere Verwerfung unter ERROR, **beide sind Lesungen**. Bis zum Einbau war er ohne Gegenstand,
  weil das Feld nicht gesendet wurde. Das Instrument ist benannt und **nicht gefahren**.
· **OB `eventID` UNTER FREMDEM TRAFFIC JE DOPPELT ANKOMMT.** 541 Server-Zeilen ohne ein
  einziges Doppel (GEMESSEN 2026-09-01, OWNER) sind "gemessen, keine Treffer" — **kein Beweis
  für die Zukunft**; `sendBeacon`-Wiederholung und bfcache bleiben Plattform-Eigenschaften.

---

**(g) 1b IST FÜR DAS PRODUKT NICHT OPTIONAL — NUR FÜR DEN SCHNITT.**

**Das Zugangsdatum lebt 3599 Sekunden** (GEMESSEN 2026-08-28, OWNER, Messung C — Teil (bw)).
Der Transport **erneuert nicht** (Festlegungen (2) und (3), und der Wächter `T15-ERSATZ` hält
es fest). **OHNE 1b SENDET EIN PROJEKT AN GOOGLE NUR INNERHALB EINER STUNDE nach dem Verbinden
oder nach einem Druck auf die Beweis-Route.** Danach ist Ursache (4) des offenen Punktes "EIN
ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN" eingetreten, **in ihrer stummen Form**:
Die Karte sagt "Zugangsdaten hinterlegt", es geht nichts hinaus, und niemand handelt, weil
niemand etwas tut.

**WER DIESEN VERMERK ALS "GOOGLE IST FERTIG" LIEST, HAT EIN ZIEL, DAS EINE STUNDE AM TAG
SENDET.** Der Schnitt erlaubt 4 ohne 1b — das ist eine Aussage über die BAUBARKEIT, nicht über
die Brauchbarkeit. **Die Roadmap-Zeile 11.2 bleibt offen.** Die **fünf** Vorbedingungen eines
1b-Zuschnitts stehen im Abschnitt "1b als Folgetask".

**SACHKORREKTUR 2026-09-02 — DIE ZAHL UND EIN WORT. ERSETZT, NICHT GESTEMPELT.** Hier stand
"Die **drei** Vorbedingungen eines 1b-Zuschnitts stehen **unverändert** im Abschnitt". Beides
trifft nicht mehr zu: Der Abschnitt führte schon damals VIER (die vierte war nicht
nummeriert), und mit der Runde vom 2026-09-02 sind es FÜNF. **Das Wort "unverändert" ist
ERSATZLOS ENTFALLEN** — es behauptet Stillstand über einen Abschnitt, der sich geändert hat,
und wäre ab dieser Runde eine falsche Entwarnung für jeden, der dort nicht nachsieht.
**DIE AUSSAGE DIESES ABSCHNITTS IST DAVON UNBERÜHRT:** 1b bleibt für das Produkt nicht
optional. **DIE BEGRÜNDUNG DER ZAHL STEHT EINMAL IM 1b-ABSCHNITT** und wird hier nicht
verdoppelt. GEMESSEN am Dateitext (CC, 2026-09-02).

**PRÄZISIERUNG 2026-09-02 ZU "in ihrer stummen Form" — ERGÄNZT UND NICHT ERSETZT: DER SATZ
DARÜBER IST NICHT FALSCH.** Zu eng ist nicht seine Aussage, sondern ihr Geltungsbereich.
**STUMM IST DIE OBERFLÄCHE, NICHT DER BETRIEB.** GEMESSEN am Code (CC, 2026-09-02):
`listConfiguredTargets` (src/app/projects/actions.ts) selektiert aus `project_secrets`
ausschliesslich `target` — die Karte sagt "Zugangsdaten hinterlegt", solange die Zeile
existiert, unabhängig von jedem Ablauf. **DAS SERVER-LOG SCHWEIGT DAGEGEN NICHT:**
`usableTokenFromRow` (src/lib/capi/token.ts) schreibt bei toter Uhr 1 eine Zeile JE BEACON.
**WARUM DAS HIER STEHT UND NICHT NUR IM VORRAT:** Aus "stumm" folgt sonst, es gebe nichts zu
beobachten — und damit keine Live-Test-Achse für 1b. Die gibt es. Volltext als
Vorrats-Eintrag 42 und 43; hier nur der Zeiger.

---

**(h) EIN WERKZEUG-BEFUND AUS DER BAU-RUNDE — DER DRITTE FALL AN DERSELBEN ACHSE.**

**GEMESSEN am eigenen Lauf (CC, 2026-09-01): `python3` EXISTIERT AUF DIESER MASCHINE NICHT.**
Der Aufruf läuft in die Windows-Store-Weiterleitung; **sie MELDET etwas und SCHREIBT NICHTS.**

**WARUM DAS ZÄHLT UND NICHT BLOSS UNBEQUEM IST:** Eine Mutation, die auf diesem Weg in eine
Datei eingefügt wird, **entsteht gar nicht**. Der Lauf danach misst dann den UNVERÄNDERTEN
Bestand — und meldet entweder "kein Test gefallen" (was wie ein hohler Test aussieht) oder eine
**andere Fehlerklasse** als die vorhergesagte. Es ist der Fall aus docs/immer-beachten.md,
Lektion (b) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE": **die Mutation ist ein SCHLECHTES
MODELL des Fehlers**, nicht der Test hohl. Wer die zwei verwechselt, "repariert" einen Test,
dem nichts fehlt.

**ES IST DER DRITTE FALL AN DERSELBEN ACHSE** — nach `sed -i`, das still das CR strippt, und
`grep` ohne `-a`, das eine Datei mit NUL-Byte still übergeht. **DIE GEMEINSAME ACHSE: Ein
Werkzeug verändert oder verhindert etwas, ohne dass ein Gate es meldet.**

**WOHIN DER BEFUND GEHÖRT, IST HIER NICHT ENTSCHIEDEN — VORSCHLAG JA, ENTSCHEIDUNG NEIN.**
· **FÜR EINEN ABSATZ AN DER BESTEHENDEN WERKZEUG-REGEL** ("WERKZEUG-REGEL: sed -i STRIPPT IN
  DIESER UMGEBUNG STILL DAS CR") spricht, dass ihre Reichweite ausdrücklich **die Wirkung** ist
  und nicht das Kommando im Titel — "Wer sein Werkzeug hier nicht findet, ist nicht ausgenommen"
  —, und dass dort bereits die Gegenrichtung steht.
· **FÜR DEN VORRAT** spricht, dass es sich um eine **Eigenschaft dieser MASCHINE** handelt und
  nicht um eine Eigenschaft des Vorgehens; sie kann sich mit einer Installation ändern, und eine
  dauerhafte Regel über einen wechselbaren Zustand altert still.
**HIER STEHT KEINE EMPFEHLUNG.** Der Befund selbst gilt unabhängig davon: **Wer eine Mutation
setzt, prüft ihre ANWESENHEIT in der Datei, bevor er den Lauf beurteilt.**

---

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, die zwei Commit-Nummern, die
Symbolnamen und der Zustand der drei Wächter GEMESSEN am Repo bzw. an den Läufen vom
2026-09-01 (CC). Die Live-Werte der Schritte 0 bis 5 GEMESSEN 2026-09-01 (OWNER) an der
ausgelieferten Anwendung. **ABLEITUNGEN, ausdrücklich als solche gekennzeichnet und nicht als
Beobachtung:** die vierte Achse in (c) (aus dem Statuscode), die Einlösung von Schuld 2 (aus
zwei Logzeilen), der Nebenbefund zu Vorrats-Eintrag 4 (ebenso), und die Aufteilung des
Test-Zuwachses auf die zwei Commits (aus zwei gemessenen Endpunkten). Die Einordnung von
Schritt 3 in (e) ist eine ARCHITEKTEN-KORREKTUR vom 2026-09-01. Der Werkzeug-Befund in (h) ist
GEMESSEN am eigenen Lauf (CC, 2026-09-01).

### VERMERK 11 (Bau-Commit 6bc01ed) — DER SCHRITT 1b-1 IST GEBAUT UND LIVE GEPRÜFT

**DER COMMIT IST AM REPO ERMITTELT** (CC, 2026-09-03, `git log`), nicht aus einem Prompt
übernommen: `6bc01ed` (`feat(oauth)`), voller Hash
`6bc01edbacd9bc37ae45aeb8822a9e519533effd`.
**IM KOPF STEHT DER BAU-COMMIT UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** — die
Bauform von VERMERK 10, aus demselben Grund: Der Vermerk-Commit ist ein `docs(claude)` und
entsteht erst mit dieser Runde. **DIE DATEI HAT DAMIT KEINE LÜCKE.**

**DER TITEL SAGT "LIVE GEPRÜFT" UND NICHT "LIVE BEWIESEN", anders als die VERMERKE 6 bis
10.** Das ist keine Bescheidenheit, sondern der Befund aus Abschnitt (c): Der Live-Test hat
eine REGRESSION belegt und die Klammer selbst nicht erreicht.

---

**(a) WAS GEBAUT IST — IN SYMBOLEN, GEMESSEN am Repo (CC, 2026-09-03).**

Der Bau-Commit fasste FÜNF Dateien an, ZWEI davon neu.

· **`runRefresh`** (`src/lib/oauth/refresh-run.ts`, neu) — die Klammer. REINE Datei, KEINE
  Direktive; sie erbt `server-only` über den Import von `token-refresh.ts`, und ihr Kopf
  benennt das (dieselbe Bauform wie `connect-return.ts`). Sie wiederholt **ausschliesslich
  bei `kind:"retry"`** und höchstens `REFRESH_MAX_ATTEMPTS` mal; jeder andere Ausgang kehrt
  sofort zurück. Bei erschöpftem Deckel eine Zeile
  `[oauth/refresh-run] exhausted { projectId, target, attempts }`.
· **`REFRESH_MAX_ATTEMPTS = 3` — GESETZT, NICHT GEMESSEN**, als benannte Konstante an EINER
  Stelle, damit ihre Änderung ein sichtbarer Diff ist.
· **`RefreshRunResult = { outcome, attempts }`.** `outcome` ist der Ausgang von
  `refreshAccessToken`, UNVERÄNDERT — die Klammer deutet nichts um.
· **DIE BEWEIS-ROUTE IST UMVERDRAHTET** (`src/app/api/oauth/google/refresh/route.ts`): zwei
  Stellen, Import und Aufruf. **Alles bis zum Eigentums-Gate ist zeichengleich**, Rumpf und
  Statuscodes ebenso; `attempts` geht NICHT nach aussen.
· **`T15b`** (`src/lib/oauth/token-refresh.test.ts`) — der Wächter über die Umverdrahtung,
  mit seiner Grenze an sich selbst. **`T15` ist unangetastet.**

**EIN AUSSCHLUSS, DER ALS GEBAUTE INVARIANTE IM KOPF DER KLAMMER STEHT: EIN WURF IST KEIN
AUSGANG.** Kein `try/catch` um den Aufruf, keine Umdeutung eines Wurfs in einen
retry-Ausgang, keine Wiederholung nach einem Wurf. **DER GRUND: Die Schleife zählt
RÜCKGABEN**, und eine Schleife ist genau die Stelle, an der ein Wurf versehentlich zu einem
erfundenen Ausgang wird — dann meldete die Klammer "nochmal versuchen" für einen Zustand,
über den sie nichts weiss. Test **K6** hält es fest.

**WAS VERWORFEN IST, UND DER GRUND BINDET ÜBER DIESEN SCHRITT HINAUS:** die dritte Lesart
der Obergrenze — eine EHRLICHERE AUSGANGS-KLASSIFIKATION, die `retry` nur dort meldet, wo
Wiederholen etwas ändern kann. **SIE IST IM SCOPE NICHT BAUBAR** (GEMESSEN am Code, CC,
2026-09-03): Vier der fünf retry-Gründe sind aus der Bauform als vorübergehend erkennbar,
der fünfte nicht — **`unexpected` bündelt** ein 4xx≠`invalid_grant` (darunter dauerhafte
Fälle wie `invalid_client` und vorübergehende wie 429) UND eine unbrauchbare 2xx-Antwort;
die einzige Angabe, die sie trennte (der Statuscode bzw. der fehlende Feldname), wird in
`token-refresh.ts` **geloggt und verworfen**. Eine Klassifikation ohne diese Angabe wäre
ERFUNDEN. **BAUBAR WIRD SIE ERST, WENN `token-refresh.ts` DEN STATUS IM ERGEBNIS TRÄGT** —
also mit einer Änderung an jener Datei, und die stand unter Scope-Schutz.

**DIE VIER GATES WAREN VOR DEM COMMIT GRÜN** (`tsc --noEmit`, `eslint`, `vitest run`,
`next build`). **SUITE: 72 Dateien / 1465 Tests** (vorher 71/1457, VERMERK 10) — **eine
Datei und acht Läufe mehr**, kein Bestandstest gefallen oder verändert. `eslint` meldet 0
Fehler und die eine Bestands-Warnung aus Vorrats-Eintrag 26.

---

**(b) DER LIVE-NACHWEIS — GEMESSEN 2026-09-03 vom OWNER**, fünf Schritte per `fetch` aus dem
eingeloggten Tab (der Preis aus Entscheidung P3).

· **Schritt 1, die Regression:** HTTP 200,
  `{"state":"ok","accessTokenExpiresAt":1788431623,`
  `"refreshTokenExpiresAt":{"kind":"at","epochSeconds":1788868675}}`.
  **GENAU DREI FELDER, KEIN `attempts`** — die Zusage "kein neues Rumpf-Feld" ist am
  ausgelieferten Stand eingelöst.
· **Schritt 2, unmittelbar danach:** identischer Rumpf, **`accessTokenExpiresAt`
  UNVERÄNDERT**.
· **Schritt 3, fremdes Projekt:** HTTP 404.
· **Schritt 4, formwidrige Kennung:** HTTP 404, `{"error":"not_found"}`.
· **Schritt 5, ohne Sitzung:** Umleitung auf `/login`, dort **405**, leerer Rumpf. **Das ist
  korrektes Verhalten und kein Befund** — der offene Punkt "DIE MIDDLEWARE LEITET API-ROUTEN
  AUF EINE HTML-SEITE UM" beschreibt genau das, und sein Sachverhalt ist durch 1b-1 nicht
  eingetreten.

**WAS SCHRITT 3 UND 4 TRAGEN, und es ist der sicherheitsrelevante Teil:** Die Reihenfolge
**Form → Sitzung → Eigentum → KLAMMER → Funktion** hält am ausgelieferten Stand. Ein
`state`-Rumpf statt eines 404 hätte geheissen, die Klammer läuft VOR dem Gate — und das Gate
ist die einzige Isolationsschicht dieses Pfades.

---

**(c) WAS DER LIVE-TEST NICHT GEZEIGT HAT — DIESER ABSCHNITT IST DER WICHTIGERE UND STEHT
DESHALB NICHT ALS FUSSNOTE.**

· **ES IST KEINE ERNEUERUNG NACHGEWIESEN. DER NACHWEIS IST EINE REGRESSION.**
  **SCHRITT 2 IST BELEGT ÜBER DEN FRÜHEN AUSGANG "reichte noch":** Nach Schritt 1 trug das
  Zugangsdatum noch rund eine Stunde, also weit mehr als den Vorlauf von 300 Sekunden; der
  identische Rumpf ist genau das erwartete Bild.
  **FÜR SCHRITT 1 IST ES AM RÜCKGABEWERT NICHT ENTSCHEIDBAR, UND DIESE PRÄZISIERUNG GEHÖRT
  HIERHER, WEIL SIE SONST BEIM NÄCHSTEN LESEN ALS GEKLÄRT GILT:** `refreshAccessToken`
  liefert für "erneuert" und für "reichte noch" **denselben `kind:"ok"`** und trennt die
  zwei Fälle nicht (Festlegung des Ergebnistyps, T2 in `token-refresh.test.ts` pinnt es).
  **DER SCHLÜSSEL, DER ES AUFLÖSTE, IST NICHT PROTOKOLLIERT — DIE UHRZEIT DES AUFRUFS**
  (GERECHNET auf den zwei gemessenen Werten, CC, 2026-09-03): Hätte Schritt 1 erneuert,
  wäre er **exakt um 2026-09-03T09:33:44Z** gelaufen (`accessTokenExpiresAt` minus 3599 s);
  hätte er nicht erneuert, irgendwann **vor 2026-09-03T10:28:43Z**. Lief er merklich nach
  09:33:44Z, war es keine Erneuerung.
  **DIE AUSSAGE DIESES PUNKTES IST VON DER OFFENEN FRAGE UNBERÜHRT: NACHGEWIESEN IST EINE
  ERNEUERUNG IN KEINEM DER BEIDEN FÄLLE** — denn der Rückgabewert trennt sie nicht. Wer
  einen Erneuerungs-Nachweis braucht, braucht ein anderes Instrument als diese Route.
· **DASS DIE KLAMMER IM DEPLOYTEN PFAD LIEGT, IST NICHT GEZEIGT.** Der Erfolgsfall
  durchläuft sie in EINEM Versuch und hinterlässt **keine Spur** — weder im Rumpf noch im
  Log. **Ihre Anwesenheit belegen allein `T15b` und `K1` bis `K6`**, und die laufen gegen
  Attrappen.
· **DASS DIE OBERGRENZE GREIFT, IST NICHT GEZEIGT.** Dazu bräuchte es einen echten,
  wiederholten `retry` von Google — nicht herstellbar. Die Zeile
  `[oauth/refresh-run] exhausted` ist im Vercel-Log **nie erschienen**.
· **KEIN BEDIENELEMENT, KEIN NEUER ZUGANG.** Der Schritt hat der Oberfläche nichts
  hinzugefügt; Vorrats-Eintrag 44 gilt unverändert weiter.

---

**(d) DER WORKER-BEFUND — EIGENER ABSCHNITT, WEIL ER DER WERTVOLLSTE POSTEN DIESER RUNDE
IST.**

**GEMESSEN am eigenen Lauf (CC, 2026-09-03), Pflicht-Mutation "Obergrenze ausbauen":** Aus
einem dauerhaften `retry`-Mock wird ohne Deckel eine ENDLOSSCHLEIFE. Der Test-Läufer meldet
die betroffene Datei dann **WEDER ALS `passed` NOCH ALS `failed`** — sie **verschwindet**,
und der Fehlschlag ist nur an der DIFFERENZ zählbar: **72 Dateien gemeldet, 71 gezählt; 1
failed + 1454 passed von 1465, es fehlen genau die ZEHN Läufe von
`src/app/api/oauth/google/refresh/route.test.ts`.** Daneben steht ein
`Worker exited unexpectedly` unter "Unhandled Errors" — an einer Stelle, die man beim
Überfliegen für Lärm hält.

**EINE VERSCHWUNDENE TESTDATEI SIEHT HARMLOSER AUS ALS EIN ROTER TEST.** Das ist der Kern:
Ein roter Test zwingt zum Hinsehen, eine fehlende Datei nicht — und die Schlusszeile
"1 failed" liest sich wie ein sauber eingegrenzter Treffer.

**DIE VORHERSAGE LAUTETE "Timeout" UND WAR IN DER KLASSE RICHTIG, IN DER GESTALT ZU ENG.**
Angesagt war vor dem Lauf: "K4 fällt; zusätzlich endet R6 nicht" — die Klasse "der Deckel
greift nicht" ist getroffen, die GESTALT des zweiten Treffers ist eine andere als
vorhergesagt.
**DIE ZUSATZTREFFER SIND GEPRÜFT UND ALS DECKUNG EINGEORDNET, NICHT ALS KASKADE**
(docs/immer-beachten.md, Lektion (g) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"): Beide
melden dieselbe Fehlerklasse, und der zweite ist die direkte Wirkung derselben Mutation über
einen zweiten Pfad — kein Folgeschaden aus einem fremden Testzustand.

**DIE ÜBRIGEN VIER MUTATIONEN TRAFEN GENAU DIE VORHERGESAGTEN LÄUFE, OHNE ÜBERSCHUSS:**
Umverdrahtung zurückdrehen → nur `T15b` (**und alle zehn Läufe in `route.test.ts` blieben
grün — der vorhergesagte Befund, jetzt gemessen statt hergeleitet**); Wiederholung auch bei
`dead` → nur `K2`; `target` hart `'google'` → nur `K5`; das `catch` einbauen → nur `K6`.

---

**(e) DREI WEITERE BEFUNDE AUS DER RUNDE.**

· **`LC_ALL=C grep -P` LÄUFT IN DIESER UMGEBUNG NICHT** — es meldet
  "`-P supports only unibyte and UTF-8 locales`" und liefert KEINE Trefferzeilen. **Wer die
  leere Ausgabe als "sauber" liest, hat nichts gemessen.** Gewechselt auf `tr` und eine
  direkte Zeichen-Suche, mit Positivkontrolle. **ES IST DER VIERTE FALL DERSELBEN ACHSE** —
  neben `grep -c $'\r'` (Hebungs-Kandidat 6), `grep -qP '\x00'` (Vorrats-Eintrag 33) und
  `python3` (VERMERK 10, Abschnitt (h)). GEMESSEN am eigenen Lauf (CC, 2026-09-03).
· **DIE HAUSREGEL IST "KEINE UMLAUTE", NICHT "ASCII-ONLY".** GEMESSEN am Bestand (CC,
  2026-09-03): `token-refresh.ts`, `google-refresh.ts`, `google-token.ts` und
  `route.ts` tragen ausschliesslich Geviertstriche und Mittelpunkte als Nicht-ASCII, keinen
  einzigen Umlaut. Die ASCII-Auflage stammte aus dem Plan dieser Runde und war ZU ENG;
  **RICHTIGGESTELLT, nicht gestempelt.** Die Kontrolle hat dabei gearbeitet: Im ersten Wurf
  stand ein "Auslöser" in der Klammer und ist vor dem Commit gefallen.
· **DIE RÜCKNAHME EINER MUTATION LIEF ÜBER `cp` — EINEN GANZ-DATEI-SCHREIBER.** Die
  Byte-Kontrolle danach war deshalb Pflicht und nicht Kür (docs/immer-beachten.md,
  "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG STILL DAS CR", Absatz zur Reichweite):
  CR 0, NUL 0. Der Objekt-Nachweis am committeten Objekt (`git show HEAD:<pfad>`) ergab für
  alle fünf Dateien ebenfalls CR 0 und NUL 0.

---

**(f) ZWEI ÜBERHOLTE STELLEN — GEMELDET UND NICHT GEÄNDERT.** Beide standen in dieser Runde
unter Scope-Schutz; ihre Richtigstellung ist eine EIGENE Arbeit und hier ausdrücklich NICHT
vollzogen.

· **`src/lib/oauth/token-refresh.ts`, Kopf:** "DER HEUTIGE AUFRUFER IST
  src/app/api/oauth/google/refresh/route.ts" und "Der einzige Aufrufer ist eine Route, die
  ein Mensch ausloest". **Der heutige Aufrufer ist die KLAMMER**; die Route ruft sie, nicht
  mehr die Funktion. Der zweite Satz bleibt in seiner SACHE richtig — es löst weiterhin ein
  Mensch aus —, nur nicht mehr in seiner Kette.
· **VERMERK 6 in dieser Datei:** "DER EINZIGE AUFRUFER IST DIE BEWEIS-ROUTE. Kein
  Automatismus, kein Aufrufer auf dem Ingest-Pfad; **ein Quelltext-Wächter in
  token-refresh.test.ts hält das fest**". **DER WÄCHTER T15 HAT DEN ERSTEN HALBSATZ NIE
  GEPRÜFT** — er liest ausschliesslich `ingest.ts` (GEMESSEN am Test, CC, 2026-09-03). Die
  Aussage "die Route ist der einzige Aufrufer" wäre mit der Umverdrahtung falsch geworden,
  **ohne dass irgendetwas rot wird**; genau diese Lücke schliesst `T15b` seit dieser Runde.
  **DIE RICHTIGSTELLUNG AN VERMERK 6 IST NICHT VOLLZOGEN und wird hier als Posten benannt,
  nicht nebenbei erledigt.**

---

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, der Commit-Hash, die
Symbolnamen und die Mutationsergebnisse GEMESSEN am Repo bzw. an den Läufen vom 2026-09-03
(CC). Die fünf Live-Werte GEMESSEN 2026-09-03 (OWNER) an der ausgelieferten Anwendung.
**ABLEITUNGEN, ausdrücklich als solche gekennzeichnet und nicht als Beobachtung:** die zwei
Uhrzeiten in (c) (GERECHNET auf `accessTokenExpiresAt` und dem Vorlauf), die Einordnung von
Schritt 2 als früher Ausgang, und die Nicht-Baubarkeit der dritten Lesart (aus dem gelesenen
Ergebnistyp). Der Worker-Befund in (d) ist GEMESSEN am eigenen Lauf.

### VERMERK 12 (Bau-Commit d57d50c) — DIE SCHEIBE 1b-2a IST GEBAUT UND LIVE BEWIESEN

**DER COMMIT IST AM REPO ERMITTELT** (CC, 2026-09-03), nicht aus einem Prompt
übernommen: `d57d50c` (`feat(capi)`), voller Hash
`d57d50c84a7a90905ad151b3c74a25fd90ed8aaf`. **VIER unabhängige `-S`-Gegenproben** auf
Zeichenfolgen, die dieser Diff erst eingeführt hat — `REFRESH_SIGNAL_LEAD_SECONDS`,
`hasLiveRefreshToken`, `resolveRefreshedTarget`, `scheduleAfter` —, **je genau ein
Treffer, alle derselbe Commit.**
**IM KOPF STEHT DER BAU-COMMIT UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** —
die Bauform von VERMERK 10 und 11, aus demselben Grund: Der Vermerk-Commit ist ein
`docs(claude)` und entsteht erst mit dieser Runde. **DIE DATEI HAT DAMIT KEINE LÜCKE.**

**DER TITEL SAGT "LIVE BEWIESEN" UND NICHT "LIVE GEPRÜFT", anders als VERMERK 11** —
und der Unterschied ist begründet, nicht rhetorisch: Dort belegte der Nachweis eine
REGRESSION und erreichte die Klammer nicht. Hier ist die Erneuerung **am
ausgelieferten Stand gelaufen und persistiert**, und sie ist an einer von ihr
unabhängigen zweiten Beobachtung belegt (Abschnitt (c)).

---

**(a) WAS GEBAUT IST — IN SYMBOLEN, GEMESSEN am Repo (CC, 2026-09-03).**

Der Bau-Commit fasste **VIERZEHN** Dateien an, **EINE davon neu**
(`src/lib/capi/ingest.refresh.test.ts`). **ZEHN der dreizehn geänderten sind
Fixture-Nachzüge** — der Grund steht in Abschnitt (e).

· **`RowResolution`** (`src/lib/capi/token.ts`, modul-privat) — eine **benannte,
  geschlossene Summe** an der Stelle, an der `usableTokenFromRow` bis hierher
  `string | null` lieferte: `{kind:"usable"; token; inLead}` · `{kind:"renewable"}` ·
  `{kind:"unusable"}`. **DIE AUSSAGE DES ALTEN RÜCKGABETYPS IST DIESELBE GEBLIEBEN**
  und steht am Code: Keines der Felder nimmt ein zweites Geheimnis auf, und ab dem
  `return` zeigt kein Bezeichner mehr auf `refreshToken` oder
  `refreshTokenExpiresAt`.
· **`hasLiveRefreshToken`** (ebenda, modul-privat) — die Trennung "erneuerbar" gegen
  "endgültig tot". `{kind:"unknown"}` gilt **nie** als überschritten (Festlegung 5 der
  Scheibe 1a, übernommen); `epochSeconds === now` gilt als überschritten,
  fail-closed. **ES IST EINE ZWEITE INSTANZ DERSELBEN BEDINGUNG**, die inline in
  `refreshAccessToken` (Schritt (6)) steht — nicht entdoppelt, weil eine gemeinsame
  Quelle einen Import in eine Datei verlangte, die diese Scheibe **ruft und nicht
  anfasst**. Der Satz steht am Prädikat.
· **`REFRESH_SIGNAL_LEAD_SECONDS = 300`** (ebenda) — die Melde-Schwelle als eigene
  Konstante. **Exportiert ausschliesslich für den Kopplungs-Wächter**, im
  Produktivcode nur in dieser Datei gelesen; der Satz steht an der Konstante.
· **`RenewableTarget`** und das Feld **`renewable: RenewableTarget[]`** an
  `TrackingKeyResolution` — **NICHT optional.** Es trägt Zielname, öffentliche
  Kennung, Zuordnung und die **Lage** (`"expired"` bzw. `"lead"`), **kein Geheimnis**.
· **DIE VIER LAGEN, wie sie der Resolver seither bildet** (die Bauanweisung dazu ist
  mit dem Vollzug verdichtet, s. den Vollzogen-Block am Zuschnitt):
  **BRAUCHBAR** → nur `targets` · **IM VORLAUF** → `targets` **und** `renewable`
  mit `lage:"lead"` · **TOT, UHR 2 LEBT** → nur `renewable` mit `lage:"expired"` ·
  **ENDGÜLTIG TOT** → keine der beiden. **ERNEUERBAR HEISST NICHT SENDEFÄHIG:** Eine
  Zeile mit toter Uhr 1 erzeugt weiterhin **kein** `ResolvedTarget`.
· **`resolveRefreshedTarget`** (ebenda, exportiert) — die schmale Nach-Auflösung:
  **EINE** Runde auf `project_secrets`, `{ data, error }` destrukturiert, fail-closed
  auf `null`, wirft nie. **SIE IST DIE DRITTE DATENBANK-RUNDE DES REQUESTS UND FÄLLT
  AUSSCHLIESSLICH IM RETTUNGSFALL AN** — der Preis ist am Code benannt, und der
  Live-Nachweis zeigt ihn ausbleiben, wo er nicht gebraucht wird (Abschnitt (b)).
· **DIE ZWEI ZWEIGE IN `src/lib/capi/ingest.ts`:** die **VORSORGE** nach dem
  Confirm-Zweig und **vor** der Forward-Wache, in `after()` — ohne Consent-Gate, weil
  eine Erneuerung die Anmeldedaten des BETREIBERS sendet und kein Besucher-Merkmal;
  die **RETTUNG** **innerhalb** der Forward-Wache und **nach** dem Consent-Gate, mit
  `runRefresh` und der Nach-Auflösung, seriell vor dem Fan-Out.
· **DIE GEÖFFNETE FORWARD-WACHE** (ebenda) — aus `targets.length > 0` ist
  `targets.length > 0 || rettbar.length > 0` geworden. **DAS IST DER INVASIVSTE PUNKT
  DER SCHEIBE**, und der Grund steht dort: Ein Projekt, dessen einziges Ziel gerade tot
  ist, hat `targets.length === 0`; mit der alten Wache liefe die Rettung **nie**, und
  weder ein Compiler noch ein Bestandstest sähe es.
· **`allowedTargets` IST GENERISCH GEWORDEN** über
  `<T extends { target: ResolvedTarget["target"] }>` — dieselbe Entscheidung, dieselbe
  Funktion, zwei Mengen. **KEIN neuer Typ-Import**: Die Schranke ist ein indizierter
  Zugriff auf einen ohnehin importierten Typ, damit die Zusage im Kopf der Datei
  ("importiert von lib/settings.ts jetzt gar nichts mehr") wahr bleibt.
· **`scheduleAfter`** (ebenda) — der Schutz der `after()`-**REGISTRIERUNG**, benutzt von
  **BEIDEN** Registrierungen, der neuen dieser Scheibe **und** der bestehenden in
  `schedulePersist`. Der `catch` **loggt** über `errorName`; ein Wurf verschwindet
  nicht. **DER KOMMENTARKOPF VON `schedulePersist` IST IM SELBEN ZUG RICHTIGGESTELLT**
  — er behauptete diese Deckung, ohne sie zu haben, und der Satz steht dort, dass er
  es tat.
· **`U1`** (`src/lib/capi/token.test.ts`) — der Kopplungs-Wächter, s. Abschnitt (g).

**EINE ZAHL IM KOMMENTARKOPF VON `usableTokenFromRow` IST IM BAU RICHTIGGESTELLT WORDEN,
NICHT GESTEMPELT — UND SIE STEHT AN EINER ZWEITEN STELLE UNVERÄNDERT WEITER. DAS IST EIN
GEMELDETER BEFUND, KEINE ERLEDIGUNG:**
Der Kopf sagte, wer das Erneuerungs-Token nach aussen tragen wolle, müsse **DREI Typen**
anfassen. **GEMESSEN am Repo (CC, 2026-09-03): es genügen ZWEI**, auf zwei unabhängigen
Wegen — der Rückgabetyp hier **plus** `CapiConfig` (dann bleibt `ResolvedTarget`
unberührt, es trägt `config` nur), **oder** der Rückgabetyp hier **plus**
`ResolvedTarget` (dann bleibt `CapiConfig` unberührt). Dazu kommt je das Objektliteral in
der Paarungsschleife, und das ist kein Typ.
**DER SCHUTZ BLEIBT REAL UND WIRD NICHT KLEINGEREDET:** Zwei sichtbare Änderungen an
einer geteilten Datei sind weiterhin etwas anderes als eine Zeile in einer inline
ausgepackten Nutzlast. **WARUM DIE KORREKTUR ÜBERHAUPT NÖTIG WAR: EINE ZU STARKE
BEGRÜNDUNG IST EINE EINLADUNG, DIE REGEL BEIM NÄCHSTEN UMBAU ALS ÜBERTRIEBEN ZU LESEN** —
eine Zahl, die beim Nachzählen nicht stimmt, entwertet den Satz, den sie tragen soll.
**DIE ZWEITE STELLE IST INVARIANTE (I-3) DIESES ZUSCHNITTS**, weiter unten: "Wer ihn
erweitert, muss DREI Typen anfassen, und genau das ist der Schutz." **SIE IST NICHT
ANGETASTET WORDEN, und das ist Scope und kein Urteil** — diese Runde verdichtet den
Zuschnitt und lässt die Invarianten im Zweifel stehen. **DIE INVARIANTE SELBST BLEIBT
GÜLTIG; ÜBERHOLT IST IHR BELEG** (docs/immer-beachten.md, "EINE REGEL KANN GÜLTIG
BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD" — dort mit der Auflage, ihn RICHTIGZUSTELLEN und
nicht zu stempeln, sobald jemand die Stelle ohnehin öffnet). **WER SIE ÖFFNET, ZIEHT SIE
NACH.**
· **`T15`** (`src/lib/oauth/token-refresh.test.ts`) und **`T15-ERSATZ`**
  (`src/lib/capi/token.test.ts`) tragen **neue Titel und unveränderte Zusicherungen** —
  s. Abschnitt (c), letzter Absatz.

**DIE VIER GATES WAREN VOR DEM COMMIT GRÜN** (`tsc --noEmit`, `eslint`, `vitest run`,
`next build`). **SUITE: 73 Dateien / 1487 Läufe** (vorher 72/1465, VERMERK 11) — **eine
Datei und ZWEIUNDZWANZIG Läufe mehr.** `eslint` meldet 0 Fehler und die eine
Bestands-Warnung aus Vorrats-Eintrag 26; zwei von der Bau-Runde selbst erzeugte
Warnungen sind **vor** dem Gate behoben worden.

---

**(b) DER LIVE-NACHWEIS — GEMESSEN 2026-09-03 vom OWNER**, an der ausgelieferten
Anwendung. **Die Uhrzeiten sind die des Vercel-Logs.**

· **16:47:01, Pageview:** `[capi/resolve] secret unusable`, `reason`
  `access_token_expired`. **KEINE Rettung** — ein Pageview ist nicht forwardable, und
  die Rettung liegt hinter `isForwardable`.
· **16:47:07, Conversion (ZWEI Beacons):** dieselbe Zeile — **und HIER lief die
  Rettung.**
· **16:50:53, Conversion:** **KEINE Fehlerzeile mehr**, nur
  `Google forward skipped: no_click_id`. Die Invocation zeigt **ZWEI Supabase-GETs und
  einen POST** — die zwei Resolver-Runden plus den Persist, **KEINE dritte Leserunde.**
· **16:55:36, Conversion mit `gclid`:** **der Google-Adapter SCHWEIGT.** Kein
  `forward failed`, kein `skipped`.
· **POSITIVKONTROLLE ohne `gclid`:** `skipped: no_click_id` im Wortlaut.

---

**(c) WAS DEN BEWEIS TRÄGT — UND WARUM DIE FEHLERZEILE ZUM ERFOLG GEHÖRT UND NICHT
GEGEN IHN. DIESER ABSCHNITT IST DER WICHTIGSTE DES VERMERKS.**

**DER `console.error` STEHT VOR DER VERZWEIGUNG UND WIRD IN BEIDEN FÄLLEN
GESCHRIEBEN.** Was die Fälle trennt, ist der `reason`:
`access_termopen`-artige Verwechslungen sind hier ausgeschlossen, weil die zwei Werte
selbstvergeben sind — **`access_token_expired` heisst "erneuerbar"** und mündet in
`kind:"renewable"`, **`refresh_token_expired` heisst "endgültig tot"** und mündet in
`kind:"unusable"`.

**DER BEWEIS IST DESHALB NICHT DAS AUSBLEIBEN DER ZEILE AM AUSLÖSENDEN BEACON, SONDERN
AM FOLGENDEN.** Um **16:50:53** hält der Resolver den Token für brauchbar — der frische
Ablauf steht in der Zeile, die Erneuerung ist also **gelaufen UND persistiert**. **Die
ausbleibende dritte Leserunde belegt das unabhängig**: zwei GETs plus ein POST heisst,
dass `resolveRefreshedTarget` nicht gebraucht wurde, weil schon die reguläre Auflösung
ein brauchbares Zugangsdatum fand.
**ZWEI UNABHÄNGIGE BEOBACHTUNGEN AN DERSELBEN INVOCATION**, und keine davon ist eine
Abwesenheits-Behauptung allein: die eine ist das Ausbleiben der Zeile, die andere die
Zahl der Datenbank-Zugriffe. Dazu tritt **16:55:36** mit dem schweigenden Adapter und
die Positivkontrolle ohne `gclid`.

**DASS ES DIE RETTUNG WAR UND NICHT DIE VORSORGE, IST AM KONTROLLFLUSS ENTSCHIEDEN:**
Um 16:47:07 war Uhr 1 **tot** (`access_token_expired`), das Ziel lag also in
`rettbar` und nicht in `vorsorge` — die Vorsorge greift ausschliesslich im
Vorlauf-Band eines **lebenden** Zugangsdatums.

**DIE ARCHITEKTEN-ANLEITUNG WAR AN DIESER STELLE FALSCH UND HAT EINEN ERFOLG ALS
FEHLSCHLAG ANGEKÜNDIGT.** Sie hatte die Beweis-Achse aus dem Zuschnitt übernommen —
"bleibt sie aus und geht die Conversion hinaus, ist die Scheibe bewiesen; steht sie da,
ist sie es nicht" —, **ohne den gebauten Code dagegen zu halten.** Am gebauten Code
steht die Zeile im Rettungsfall **notwendig** da.
**GEMELDET, damit die nächste Runde die Achse nicht ein zweites Mal falsch setzt.** Es
ist der Fall der Regel "EINE ANLEITUNG, DIE EINE VORAUSSETZUNG NICHT NENNT, ERZEUGT
EINE FALSCHE ENTWARNUNG" (docs/immer-beachten.md) **in seiner Umkehrung**: Sie hat
keine falsche Entwarnung erzeugt, sondern einen **falschen Alarm** — und der ist die
billigere Fehlerrichtung, weil er zum Hinsehen zwingt statt davon abzuhalten.

**ZUR ERWARTETEN `[oauth/token-refresh] ok`-ZEILE: SIE IST EIN `console.info` UND IN
EINER ERROR-GEFILTERTEN ANSICHT NICHT SICHTBAR. IHRE ABWESENHEIT IST KEIN BEFUND** —
und die Anleitung hätte sie **nicht als Kriterium führen dürfen**, weil sie an einer
**anderen Log-Ebene** liegt als die Fehlerzeile. Zwei Kriterien auf zwei Ebenen in
einer Anleitung, die nur eine Ebene zeigt, sind kein Kriterium, sondern eine Falle.

**DIE ZWEI QUELLTEXT-WÄCHTER SIND IM SELBEN ZUG NACHGEZOGEN — TITEL UND ERKLÄRTEXT,
KEINE EINZIGE ZUSICHERUNG:**
· **`T15`** hiess "KEIN AUFRUFER AUF DEM INGEST-PFAD" und heisst jetzt "DER INGEST GEHT
  ÜBER DIE KLAMMER UND NICHT AN IHR VORBEI". **Der Titel war falsch geworden** — der
  Ingest erneuert seit dieser Scheibe. **Seine zwei Behauptungen und seine
  Positivkontrolle sind unangetastet**, und ihre Aussage ist dieselbe geblieben: Ein
  Handler, der die Funktion direkt riefe, umginge die Obergrenze der Klammer.
· **`T15-ERSATZ`** hiess "der Ingest-Pfad ENTSCHLÜSSELT, ERNEUERT ABER NIE" und heisst
  jetzt "token.ts ENTSCHLÜSSELT, ERNEUERT ABER NIE — DIE ERNEUERUNG LIEGT IM HANDLER".
  **Fünf Zusicherungen unangetastet.** Er las immer schon nur `token.ts`; falsch war
  seine PFAD-Aussage, nicht sein Gegenstand.
· **BEIDE TRAGEN DEN SATZ, WAS SIE VORHER ZUGESICHERT HABEN.** Wer nur den Titel
  ändert, löscht die Spur — dann stünde ein richtiger Satz an einer Stelle, an der er
  vorher falsch war, und nichts sagte, dass er es je war.

---

**(d) ZWEI EIGENSCHAFTEN, DIE ERST DIE MESSUNG SICHTBAR GEMACHT HAT.**

· **EIN CONVERSION-BEACON-PAAR HINTERLÄSST AUCH IM ERFOLGSFALL EINE FEHLERZEILE.** Der
  Bestätigungs-Beacon (`source` `browser`) durchläuft den Resolver — dort entsteht die
  Zeile — und kehrt **VOR** dem Forward-Zweig zurück; er sieht den alten Token und
  **rettet nicht**. **WELCHE DER BEIDEN ZEILEN UM 16:47:07 DAS WAR, IST AM LOG NICHT
  ENTSCHEIDBAR**; dass es so sein **muss**, folgt aus dem Kontrollfluss.
  **ABLEITUNG, KEINE MESSUNG.**
  **DIE FOLGE STEHT IM VORRAT UND NICHT HIER:** Vorrats-Eintrag 42 trägt seit dieser
  Runde einen Vermerk, weil seine bisherige Fassung genau diesen Fall nicht kannte.
· **EIN PROJEKT MIT NUR PAGEVIEWS WIRD NICHT GERETTET UND NICHT VORGESORGT.**
  "Erneuerbar, tot" landet in `rettbar`, und `rettbar` wird **ausschliesslich** in der
  Forward-Wache abgearbeitet — hinter `isForwardable`.
  **KEIN DEFEKT, und der Grund gehört dazu:** Es steht dabei **keine Conversion auf dem
  Spiel**, und die **erste** Conversion rettet. Der Zustand kostet also nichts, was
  jemand vermissen könnte.
  **ABER: DIE BENENNUNG IST WEITER ALS DIE SACHE.** Der Testplan-Lauf heisst "PageView
  rettet nicht, sorgt aber vor" — und vorsorgen tut er **NUR im Vorlauf-Band**, nicht
  bei totem Token. **Der Lauf selbst ist richtig; sein NAME behauptet mehr.** Als
  eigener Vorrats-Eintrag verortet.

---

**(e) DER BLINDFLECK — EIGENER ABSCHNITT, WEIL ER DER WERTVOLLSTE POSTEN DIESER RUNDE
IST.**

Nach dem Bau von `token.ts` und `ingest.ts` fielen **91 Läufe in 9 Dateien**, **alle
mit EINER Ursache**: `ingest.ts` las `resolution.renewable.filter`, und die neun
Dateien, die `@/lib/capi/token` mocken, **bauen ihre Auflösung selbst** — ihre Fixtures
trugen kein `renewable`.

**DAS PFLICHTFELD HAT DIE VORHERGESAGTE FALLE IN EINEN FEHLSCHLAG VERWANDELT STATT IN
EIN SCHWEIGEN.** Die Falle hat zwei Hälften, und beide sind dieselbe gemessene
Eigenschaft:
· **DIE ACHTZEHN GANZ-OBJEKT-VERGLEICHE** in `token.test.ts` pinnen die vollständige
  Auflösung mit `toEqual`, und **`toEqual` ignoriert einen Schlüssel mit dem Wert
  `undefined` auf jeder Ebene** (GEMESSEN 2026-08-18). Ein optionales, im Normalfall
  leeres Feld wäre an **allen achtzehn** still vorbeigegangen.
· **DIE ZEHN MOCKENDEN DATEIEN** bestimmen die Form selbst; ein neues Feld erscheint in
  keiner ihrer Fixtures. Ein optionales Feld wäre in **allen neun**, die den Handler
  tatsächlich fahren, grün geblieben.
**MIT EINEM PFLICHTFELD IST BEIDES LAUT GEWORDEN:** die achtzehn als bewusst
nachgezogene Vergleiche, die neun als Fehlschlag beim ersten Lauf.

**REPARIERT WURDEN DIE FIXTURES, NICHT DER HANDLER.** Ein Vorgabewert (`?? []`) wäre
defensiver Code gegen einen Zustand, den der Typ verbietet — **und er hätte neun
Attrappen dauerhaft in einer Gestalt grün gelassen, die der Resolver nicht erzeugen
kann.** Das ist die Regel "TESTDATEN UND TEST-SEQUENZ MÜSSEN DEN PRODUKTIVEN PFAD
TREFFEN" (docs/immer-beachten.md).
**JEDE NACHGEZOGENE FIXTURE TRÄGT DEN GRUND IM KOMMENTAR**, und wo das leere Array
**tragend** ist, steht das eigens dabei: in `fan-out.test.ts` die Zeiten (eine Rettung
läge seriell davor), in `ingest.timeout.test.ts` der gemessene Deckel, in
`ingest.persist.test.ts` die Zahl der Registrierungen.

**DIE ACHTZEHN SIND EXPLIZIT NACHGEZOGEN — KEIN `objectContaining`.** Das hätte aus
einem Ganz-Objekt-Vergleich einen Teil-Vergleich gemacht und **genau die Zusicherung
mitgenommen**, die diese achtzehn seit Scheibe 2b-i tragen. An einem von ihnen steht
der Absatz, warum das Feld auch leer dasteht; der Wächter dagegen ist **R7**.

---

**(f) DIE MUTATIONS-STREUUNG ALS DATENPUNKT.**

**SECHS Mutationen, je mit Vorhersage VOR dem Lauf, danach zurückgenommen; keine ist im
Bau-Commit.** Vier trafen genau die vorhergesagten Läufe: "erneuerbar, tot wie
endgültig tot" → R1/R4/R5/R6 · "Vorsorge-Lage entfernt" → **genau R2** · "Schutz der
Registrierung ausgebaut" → **genau H9**, und **alle sechs bestehenden
`ingest.*.test.ts` blieben grün** · "Schwelle über den Vorlauf" → **genau U1**.

**ZWEIMAL WAR DIE KLASSE RICHTIG UND DIE AUFZÄHLUNG DANEBEN:**
· **ZU BREIT** — "Uhr-2-Prüfung umgedreht": vorhergesagt sechs, gefallen **fünf**.
  **R8 fiel nicht, und er konnte nicht fallen:** Er prüft die Zeile
  `[capi/resolve] secret unusable` und die **Abwesenheit der `projectId`**, nicht den
  `reason`. Die Mutation wechselt nur den `reason`. **Der Test ist nicht hohl; die
  Vorhersage hatte ihn an einer Achse festgemacht, die er nicht misst.**
· **ZU ENG** — "Kill-Switch hinter die Erneuerung": vorhergesagt vier, gefallen
  **fünf**. `ingest.forwardable` kam hinzu, mit **demselben Assert-Gegenstand**
  (`persistEvent` nicht gerufen) und damit **derselben Fehlerklasse**. Ausgeschlossen
  worden war er, weil nur auf `fetch` geschaut wurde.
**BEIDE ÜBERSCHÜSSE SIND VOR JEDER REPARATUR GEPRÜFT UND ALS DECKUNG EINGEORDNET,
NICHT ALS KASKADE** (Lektion (g) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE").

**DIE STREUUNG WAR NICHT EINSEITIG — UND DAS IST DER EIGENTLICHE POSTEN DIESES
ABSCHNITTS.** Das weicht von der in docs/immer-beachten.md protokollierten Reihe ab
("EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN": sechs Fälle, davon
fünf zu eng), deren **Einseitigkeit dort ausdrücklich als Hinweis auf eine
SYSTEMATISCHE Ursache** geführt wird.
**EIN GEGENBEISPIEL WIDERLEGT SIE NICHT — ES IST EIN DATENPUNKT UND GEHÖRT ALS SOLCHER
NOTIERT.** Zwei Fälle in einer Runde, in beide Richtungen, sagen weder, dass die
systematische Ursache weg ist, noch dass sie nie bestand. **HIER WIRD KEINE ZAHL IN
docs/immer-beachten.md NACHGEZOGEN**; jene Datei führt ihre eigene datierte Zählung,
und eine zweite daneben wäre bei jedem Zuwachs neu falsch (dieselbe Erwägung wie in
Vorrats-Eintrag 20 und 32).

**ZWEI LÄUFE SIND ALS EINZELSTÜCKE GEKENNZEICHNET** (Lektion (f) ebenda), je mit der
gemessenen Zahl im Kommentar: **R2** trägt die Vorsorge-Lage allein, **H9** den
Registrierungs-Schutz allein — **1 von 1487.** Der Satz steht dort, damit sie niemand
als redundant entfernt und dabei die einzige Abdeckung mitnimmt.

**NACH JEDER RÜCKNAHME GEPRÜFT:** Mutations-Marker 0, `git status` unverändert,
`git diff --numstat` identisch zum Stand davor — **keine leeren Diffs.** **Jede
Mutation wurde VOR dem Lauf auf ihre ANWESENHEIT in der Datei geprüft** (VERMERK 10,
Abschnitt (h): eine nicht entstandene Mutation misst den unveränderten Bestand).

---

**(g) DIE KOPPLUNG SCHWELLE / VORLAUF.**

Die Melde-Schwelle (`REFRESH_SIGNAL_LEAD_SECONDS`, `capi/token.ts`) und der
Erneuerungs-Vorlauf (`REFRESH_LEAD_SECONDS`, `oauth/token-refresh.ts`) tragen **denselben
Wert und sind nicht dieselbe Zahl**: Der Vorlauf sagt "ab hier wird ERNEUERT", die
Schwelle "ab hier wird GEMELDET".

**DIE RELATION IST BINDEND: SCHWELLE <= VORLAUF.** Die zwei Fehlerrichtungen sind
**ungleich teuer**, und das entscheidet sie:
· **SCHWELLE <= VORLAUF IST SELBSTBEGRENZEND.** Jedes Signal führt zu einer echten
  Erneuerung, die Zeile bekommt einen frischen Ablauf, und das Signal hört auf. Das
  Fenster ist **nicht die Länge des Vorlaufs**, sondern die Zeit bis zur ERSTEN
  erfolgreichen Erneuerung.
· **SCHWELLE > VORLAUF IST SELBSTWIEDERHOLEND.** Im Band zwischen beiden gibt die
  Erneuerung "reichte noch" zurück **OHNE zu schreiben**; die Zeile bleibt unverändert,
  und **JEDER folgende Beacon löst dasselbe Nichts erneut aus** — eine Datenbank-Runde
  plus Entschlüsselung je Besucher, **STILL: keine Logzeile, kein roter Test, keine
  Spur.**
· **Zu klein ist harmlos**, weil die Rettung den Rest auffängt. **Zu gross ist eine
  Kostenvervielfachung auf dem meistgetroffenen Pfad der Plattform.**

**DER WÄCHTER IST `U1`** (`token.test.ts`): Er importiert **beide** Zahlen — eine
Testdatei darf aus `/oauth/` importieren, `T15-ERSATZ` liest den Quelltext von
`token.ts` und nicht den der Tests — und behauptet die Relation.
**SEINE GRENZE TRÄGT ER AN SICH SELBST: ER BINDET DIE RELATION, NICHT DIE GLEICHHEIT,
UND ER SAGT NICHTS DARÜBER, OB EINE DER BEIDEN ZAHLEN RICHTIG GEWÄHLT IST.** Er fängt
den Umbau, nicht den Entwurf. **Die sechste Mutationsprobe hat ihn eigens geprüft** —
Schwelle auf 301, **genau U1** gefallen.

---

**(h) WAS DER LIVE-TEST NICHT GEZEIGT HAT.**

· **KEINE VERBUCHTE CONVERSION.** Auf dem Konto existiert **kein echter Anzeigenklick**
  (die zweite Sperre der Phase, s. "### (1) Der Gegenstand"). Der Nachweis belegt den
  **Transport**, nicht die **Verbuchung** — und diese Grenze liegt **nicht am Code**.
· **NICHT, DASS DIE OBERGRENZE GREIFT.** Dazu bräuchte es einen echten, wiederholten
  `retry` des Anbieters — nicht herstellbar. `[oauth/refresh-run] exhausted` ist im Log
  **nicht erschienen**.
· **NICHT DIE NEBENLÄUFIGKEIT.** Zwei gleichzeitig eintreffende Beacons desselben
  Projekts sind nicht gefahren worden; Invariante (I-6) verbietet den Riegel, und die
  zweite Achse von Vorrats-Eintrag 9 bleibt **UNGEMESSEN** — **unter einem
  verkehrsgetakteten Auslöser wird sie schärfer.**
· **NICHT DIE UNGEDROSSELTE WIEDERHOLUNG.** Ein Ziel mit lebender Uhr 2 und **dauerhaft
  scheiternder** Erneuerung ruft **je Beacon** den Anbieter und schreibt eine Zeile
  **MIT `projectId`** — geschrieben in `refresh-run.ts` und in der Funktion darunter,
  also **ausserhalb dieser Scheibe** und ausserhalb der Zusage (I-4). Der Satz steht am
  Code, an der Rettung; **es ist der schärfste Trigger für 1b-2b.**
· **NICHT, OB `"WEB"` FACHLICH RICHTIG IST** und **nicht, was bei einer FREMDEN
  Kundennummer geschieht** — beides unverändert offen und von dieser Scheibe nicht
  berührt.

---

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, der Commit-Hash samt der
vier `-S`-Gegenproben, die Symbolnamen, die Mutationsergebnisse und der Byte-/
Objekt-Nachweis **GEMESSEN am Repo bzw. an den Läufen vom 2026-09-03 (CC)**. Die fünf
Live-Beobachtungen **GEMESSEN 2026-09-03 (OWNER)** an der ausgelieferten Anwendung.
**ABLEITUNGEN, ausdrücklich als solche gekennzeichnet und nicht als Beobachtung:** dass
eine der zwei Zeilen um 16:47:07 vom Bestätigungs-Beacon stammt (aus dem Kontrollfluss,
Abschnitt (d)) · dass um 16:47:07 die Rettung und nicht die Vorsorge lief (ebenso) ·
dass die ausbleibende dritte Leserunde die Persistenz der Erneuerung belegt (aus der
Zahl der Datenbank-Zugriffe, Abschnitt (c)). Die Einordnung der Anleitung als falsch
ist eine **ARCHITEKTEN-KORREKTUR vom 2026-09-03**, gestützt auf den gebauten Code.

### VERMERK 13 (Bau-Commit 7288f90) — DIE SCHEIBE 11.2b IST GEBAUT UND LIVE BEWIESEN

**DER COMMIT IST AM REPO ERMITTELT** (CC, 2026-09-04, `git log`), nicht aus einem Prompt
übernommen: `7288f90` (`feat(ui)`), voller Hash
`7288f9084b75d910ab47007570dbe86eab24c958`.
**DREI `-S`-GEGENPROBEN, UND EINE TAUGT NICHT — DAS GEHÖRT DAZU:**
`CREDENTIAL_EXPIRY_WARN_SECONDS` und `listTargetCredentialStates` treffen **je genau
einen** Commit, und es ist dieser. **`STATUS_UNKNOWN` TRIFFT ZWEI** — daneben `eeeef6f`,
einen Doku-Commit des Google-Crawls, in dem die Zeichenfolge als Anbieter-Befund steht.
**Als Gegenprobe ist sie damit untauglich**, und sie steht hier, damit die nächste Runde
sie nicht für eine dritte Bestätigung hält. Die Zuordnung ruht auf den zwei anderen.
**IM KOPF STEHT DER BAU-COMMIT UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** — die
Bauform von VERMERK 10, 11 und 12, aus demselben Grund: Der Vermerk-Commit ist ein
`docs(claude)` und entsteht erst mit dieser Runde. **DIE DATEI HAT DAMIT KEINE LÜCKE.**

**DER TITEL SAGT "LIVE BEWIESEN", wie VERMERK 12 und anders als VERMERK 11**, und der
Unterschied ist begründet: Der Nachweis hat die Anzeige nicht nur gesehen, sondern gegen
eine von ihr **unabhängige zweite Quelle** gehalten — und die stimmte **auf die
Sekunde** (Abschnitt (b)).

---

**(a) WAS GEBAUT IST — IN SYMBOLEN, GEMESSEN am Repo (CC, 2026-09-04).**

Der Bau-Commit fasste **NEUN** Dateien an, **ZWEI davon neu**
(`src/lib/tracking/credential-state.ts` und seine Testdatei).

· **`credentialStateFrom`** (`src/lib/tracking/credential-state.ts`, neu) — die eine
  Berechnung. Sie bildet die **SECHS Lagen** aus einer bereits klassifizierten Zeile;
  `{kind:"unknown"}` wird **ausdrücklich und negativ** geprüft, `epochSeconds === now`
  gilt als überschritten (fail-closed). Beides ist ÜBERNOMMEN, nicht neu erfunden.
· **`CREDENTIAL_EXPIRY_WARN_SECONDS = 172_800`** (ebenda) — die Vorwarn-Schwelle,
  **GESETZT UND NICHT GEMESSEN**, mit den zwei Ungleichungen an der Konstante. Bauform
  und Grund wie bei `REFRESH_MAX_ATTEMPTS`.
· **`TargetCredentialState`** (ebenda) — die geschlossene Union. **KEIN einziger freier
  String**: nur `kind`-Literale, zwei Zahlen und ein `reason`, der aus den
  Fehlzuständen von `DecryptResult` und `ParsePayloadResult` **abgeleitet** ist. Kommt
  dort ein Zustand hinzu, wird die Zuordnung ein Compiler-Fehler statt eines stillen
  Rückfalls.
· **`resolveConfigured`** (ebenda) — die **VORRANGREGEL**: Bei Widerspruch gewinnt die
  Unsicherheit. **Sie gilt in beide Richtungen**, also auch dann, wenn die erste Quelle
  nichts meldet und die zweite scheitert.
· **`classifyCredentialRow`** (`src/app/projects/actions.ts`, modul-privat) —
  entschlüsselt und liest die Nutzlast. **Zugangsdatum und Erneuerungs-Token enden mit
  ihrem `return`;** der Rückgabetyp trägt ausschliesslich die zweite Uhr.
· **`listTargetCredentialStates`** (ebenda, exportiert) — die zweite Aktion. Gate-Muster
  der drei Nachbarinnen (Sitzung → Eigentum am authenticated-Client → Admin-Client),
  **EINE** Runde für alle Ziele, selektiert `("target, secret_enc")` — **`secret` NIE**.
  Ihr Fehlerkanal trägt einen **benannten** Grund und keinen DB-Text.
· **`describeCredentialState`** und die **dritte Zeile** (`src/components/TargetCard.tsx`)
  — sie steht **neben** `statusText`, nicht darin; dieselbe Hausform wie der
  Folgenlosigkeits-Hinweis, und aus demselben Grund.
· **DER VIERTE STATUSZWEIG** (ebenda): `STATUS_UNKNOWN`, und `ConfiguredState` ist auf
  `boolean | null | "unknown"` erweitert. **Das ist der Ausgang, den die mitgenommene
  Schwäche bis hierher nicht hatte.**
· **`MeasureView.tsx`** reicht die zweite Quelle durch und rechnet je Karte um;
  **`CodeImporter.tsx`** lädt beide Aktionen **gebündelt** (`Promise.all`) auf der
  unveränderten Achse `[projectId]` und führt die Lage bei Speichern und Trennen nach —
  **entfernen statt raten.**
· **`listConfiguredTargets` IST WÖRTLICH UNVERÄNDERT**, samt ihren sechs Läufen und dem
  Wächter auf ihrer Spaltenliste. Der Diff an `actions.ts` ist **rein additiv**
  (138 Einfügungen, **0 Löschungen**).

**DIE VIER GATES WAREN VOR DEM COMMIT GRÜN** (`tsc --noEmit`, `eslint`, `vitest run`,
`next build`). **SUITE: 74 Dateien / 1525 Läufe** (vorher 73/1487, VERMERK 12) — eine
Datei und **achtunddreissig** Läufe mehr, **kein Bestandstest gefallen**. `eslint` meldet
0 Fehler und die eine Bestands-Warnung aus Vorrats-Eintrag 26.

---

**(b) DER LIVE-NACHWEIS — GEMESSEN 2026-09-03/04 vom OWNER**, an der ausgelieferten
Anwendung, sieben Schritte.

· **Regression:** Meta und die übrigen Fan-Out-Ziele zeigen **KEINE Ablaufzeile**.
  **(I-7) hält damit am ausgelieferten Stand und nicht nur im Test** — das ist der
  Schritt, den die Tests nicht leisten können.
· **Google, lebender Zugang:** "Zugang gültig bis **10.9.2026, 15:22:21**"; nach einem
  Neu-Verbinden "**11.9.2026, 09:26:58**".
· **DER ABGLEICH GEGEN DIE BEWEIS-ROUTE — DER TRAGENDE SCHRITT:**
  `refreshTokenExpiresAt.epochSeconds` **1789111618** = **11.9.2026, 09:26:58** Ortszeit,
  **AUF DIE SEKUNDE identisch mit dem Kartentext**. `accessTokenExpiresAt` **1788510418**
  lag rund eine Stunde voraus.
  **DIE KARTE ZEIGT UHR 2 — GEMESSEN UND NICHT ABGELEITET.** Hätte sie Uhr 1 gezeigt,
  stünde dort ein Zeitpunkt in **einer Stunde** statt in **sieben Tagen**; die zwei sind
  am Kartentext nicht zu verwechseln.
· **Trennen:** die Zeile verschwindet **rückstandslos**, die Karte steht auf "Nicht
  konfiguriert".
· **Neu verbinden:** die Zeile ist wieder da, mit frischem Datum.
· **Kein Grün, kein Haken, kein Punkt** — in allen gesehenen Zuständen.

---

**(c) DREI BEFUNDE AUS DEN ZAHLEN, je mit Provenienz.**

· **DIE SIEBEN-TAGE-FRIST IST EIN DRITTES MAL AN EIGENEN DATEN WIEDERGEFUNDEN.** Der
  Abstand der beiden Uhren **in EINER Antwort** beträgt **601 200 Sekunden** — sieben
  Tage minus eine Stunde, **derselbe Wert wie in VERMERK 6 und aus demselben Grund**
  (unmittelbar nach dem Verbinden gemessen, beide Uhren frisch).
  **WAS ER NICHT AUFLÖST, und dieser Satz gehört zwingend dazu:** Die Unschärfe aus
  VERMERK 6 — ob die Rohwerte **3599/604799** oder **3600/604800** lauten — **bleibt
  ungelöst.** Beide Annahmen ergeben denselben Abstand von 601 200 (GERECHNET, CC,
  2026-09-04: `a − 3599 + 604799 = r` **und** `a − 3600 + 604800 = r`, beide exakt).
  **Der Abstand kann die Frage strukturell nicht beantworten** — wer ihn dafür hält,
  liest eine Differenz als Paar.
  PROVENIENZ: **GERECHNET** auf zwei am 2026-09-04 (OWNER) gemessenen Werten. Keine
  dritte Beobachtung.
· **DER TERMIN AUS DEM NACHTRAG AN VORBEDINGUNG (iv) IST ÜBERHOLT UND NACHGEZOGEN.** Dort
  stand der **2026-09-08 gegen 11:58 UTC**; **zwei Neu-Verbindungen haben die Frist
  zurückgesetzt**, und der Termin ist jetzt der **2026-09-11, 07:26:58 UTC** (09:26:58
  Ortszeit).
  **WER DAS NICHT NACHZIEHT, WARTET AM 8.9. AUF EINEN AUSFALL, DER NICHT KOMMT, UND HÄLT
  DIE KARTE FÜR KAPUTT.** Nachgezogen ist er **an EINER Stelle** — im Nachtrag zu (iv),
  ERSETZT und nicht gestempelt, weil es ein TERMIN ist und kein Zeitdokument.
  **EINE ZWEITE STELLE NANNTE DASSELBE DATUM** ("Die zwei Todesarten" in diesem
  Zuschnitt); sie trägt seit dieser Runde einen **ZEIGER statt eines Datums**. Eine
  dritte stand in der Beweis-Achse und ist mit der Verdichtung entfallen.
  PROVENIENZ: der Wert **GEMESSEN 2026-09-04 (OWNER)**, Datum und Ortszeit **GERECHNET**
  (CC, 2026-09-04).
· **DASS DAS NEU-VERBINDEN DIE FRIST ZURÜCKSETZT, IST JETZT GEMESSEN UND NICHT MEHR
  ABGELEITET.** Zweimal beobachtet.
  **DIE ZWEI BEOBACHTUNGEN SIND NICHT GLEICH STARK, und das wird hier getrennt statt
  geglättet:** Für die **zweite** liegen BEIDE Rohwerte vor, und die Arithmetik schliesst
  exakt — der Verbindungszeitpunkt plus sieben Tage minus eine Sekunde ergibt genau
  `1789111618`. Für die **erste** ist nur der **KARTENTEXT** protokolliert
  ("10.9.2026, 15:22:21"); ihr Rohwert ist mit dem zweiten Verbinden **überschrieben und
  nicht mehr zu beschaffen**. Sie ist mit einem Sieben-Tage-Reset **verträglich**, aber
  nicht gerechnet — **zwei Angaben, die zueinander passen, sind nicht dieselbe Angabe.**
  **ES IST DIESELBE KLASSE WIE VORRATS-EINTRAG 40:** ein Wert, der einmal und flüchtig
  existiert und aus keiner Quelle wiederzubeschaffen ist, sobald ihn niemand aufschreibt.
  **DAS IST KEIN WIDERSPRUCH ZU VERMERK 5**, und ohne diesen Satz liest die nächste Runde
  einen: Jener misst die **EINLÖSUNG** — die Erneuerung verlängert die zweite Uhr NICHT,
  sie läuft weiter. Dieser misst das **NEU-VERBINDEN**, das die Nutzlast GANZHEITLICH
  ersetzt. **Zwei verschiedene Vorgänge.** Der Befund BESTÄTIGT damit, was die erste
  Todesart dieses Zuschnitts behauptet ("Es gibt nichts, was überleben könnte") — er
  widerlegt sie nicht.

---

**(d) DIE LADEKLASSE DER NEUEN DATEI — EINE KORREKTUR AN DER ARCHITEKTEN-VORGABE.**

**DER PLAN VERLANGTE `server-only` ODER DAS ERBEN DERSELBEN MARKE. GEBAUT IST SIE OHNE
JEDE DIREKTIVE**, mit ausschliesslich `import type` — und die werden beim Bauen gelöscht.

**DER GRUND IST KEINE BEQUEMLICHKEIT, SONDERN DIE ZWEI SEITEN, AUF DENEN SIE LÄUFT:** Die
Ableitungen (`resolveConfigured`, `credentialStateFor`, `withoutTarget`) laufen im
**BROWSER** — in `MeasureView` und im Container; die Klassifikation läuft im **SERVER**,
in der Aktion. **EINE `server-only`-FESSEL HÄTTE DIE KARTE AUSGESPERRT.** Es ist dieselbe
Lage wie bei `tracking/target-cards.ts` und `tracking/target-readiness.ts`, und es ist
dieselbe Antwort.

**DER WARNSATZ GEHÖRT MIT, UND ER STEHT AUCH AM CODE:** **Wer dort einen WERT-Import aus
`secrets/` ergänzt, zieht `server-only` in das Client-Bündel und bricht die Karte — OHNE
dass ein Test es meldet.** Die Testumgebung ersetzt `server-only` durch ein leeres Modul;
der Bruch erschiene erst im Browser.

**WAS DIE VORGABE RICHTIG GESEHEN HAT und was hier nicht zurückgenommen wird:** Die Datei
liest eine `OAuthPayload`-Struktur, und die Untergrenzen-Erwägung aus dem Kopf von
`oauth-payload.ts` ("server-only einzusetzen, wo rein gereicht hätte, ist NIE ein
Verstoss") ist die richtige Richtung des Irrtums — **sie gilt nur dort nicht, wo die
strengere Klasse einen Konsumenten aussperrt.** Genau das ist hier der Fall.

---

**(e) DIE MUTATION M2 — UNERWARTETES GRÜN IST EIN BEFUND.**

**SECHS Mutationen, je mit Vorhersage VOR dem Lauf, danach zurückgenommen; keine ist im
Bau-Commit.** Fünf trafen genau die vorhergesagten Läufe: "unknown wie lebt" → A5/A9/B9 ·
"Klartext-Ziel bekommt eine Uhr" → A6/A9/B6 (Berechnung) und C2/C3 (Karte) ·
"Fehlerfall wieder zur leeren Liste" → **genau B5, 1 von 1525** · "Admin-Client vor das
Gate" → B1/B2 · "Vorrangregel umgedreht" → E3/E3b/E3-TYP.

**M2 LAG DANEBEN, UND ZWAR ZU BREIT:** Vorhergesagt waren **drei** Läufe (A3, A4, C4),
gefallen sind **zwei**. **C4 SETZT DIE LAGE ALS LITERAL AN DER KARTE** und durchläuft
`credentialStateFrom` überhaupt nicht — die Mutation erreichte seine Achse nicht.
**DER LAUF IST NICHT HOHL, DIE VORHERSAGE WAR ES**, und zwar an genau der Trennung
**Berechnung gegen Karte**, die bei M1 richtig angesagt und hier vergessen wurde.
**NICHTS REPARIERT.** Die Karten-Achse deckt **M3b** eigens ab; (I-7) ist seither auf
beiden Achsen einzeln bewacht.

**EINORDNUNG:** Es ist der **zweite** protokollierte Fall "zu breit" nach **R8**
(VERMERK 12, Abschnitt (f)). Die Reihe in docs/immer-beachten.md ist überwiegend **zu
eng**; **KEINE ZAHL WIRD DORT NACHGEZOGEN** — jene Datei führt ihre eigene datierte
Zählung, und eine zweite daneben wäre bei jedem Zuwachs neu falsch (dieselbe Erwägung wie
in Vorrats-Eintrag 20 und 32).

**JEDE MUTATION WURDE VOR DEM LAUF AUF IHRE ANWESENHEIT IN DER DATEI GEPRÜFT** (VERMERK
10, Abschnitt (h)). **NACH JEDER RÜCKNAHME GEPRÜFT:** Mutations-Marker 0, `git status`
unverändert bei neun Einträgen, keine leeren Diffs.

---

**(f) WAS DER LIVE-TEST NICHT GEZEIGT HAT.**

· **DIE VORWARNUNG.** Sie verlangt einen Zugang mit **weniger als 48 Stunden**
  Restlaufzeit — beim Test lagen sieben Tage an. **Nicht herstellbar ohne Warten.**
· **OB DIE SCHWELLE RICHTIG GEWÄHLT IST.** 48 Stunden sind **GESETZT, NICHT GEMESSEN**;
  der Wächter bindet die **Relation** zu `REFRESH_SIGNAL_LEAD_SECONDS`, nicht den Wert.
  Er fängt den Umbau, nicht den Entwurf.
· **OB DER ANGEZEIGTE ZEITPUNKT DER IST, DEN GOOGLE FÜHRT.** Er stammt aus **UNSERER**
  Nutzlast, gerechnet aus `receivedAt + refresh_token_expires_in`. Der Abgleich auf die
  Sekunde belegt, dass **Karte und Beweis-Route dieselbe Zahl lesen** — nicht, dass der
  Anbieter dieselbe Sekunde meint (docs/ziel-befunde.md, Teil (bx)).
· **DIE LAGEN `unreadable` UND `unknown_expiry`.** Beide verlangen ein kaputtes Chiffrat
  bzw. eine Antwort ohne Ablauffeld; von aussen nicht steuerbar. Sie tragen allein die
  Läufe A7, A8, B9 und B10.
· **DASS DIE VORRANGREGEL GREIFT.** Ein Scheitern der Aktion ist live nicht sinnvoll zu
  erzeugen; das leisten allein E3/E3b und die Mutation, die sie umdreht.
· **DIE ABWESENHEIT EINES HYDRATIONS-FEHLERS IN ANDEREN ZEITZONEN.** Geprüft ist eine.
· **DIE TOTE LAGE.** Sie war für den 2026-09-08 vorgesehen und ist mit den zwei
  Neu-Verbindungen auf den **2026-09-11** gewandert (s. (c)). **Sie bleibt der einzige
  Fall dieser Scheibe, den niemand herstellen kann** — er hängt an einer Frist des
  Anbieters, nicht an unserem Code.

---

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, der Commit-Hash samt der drei
`-S`-Gegenproben, die Symbolnamen, die Mutationsergebnisse und der Byte-/Objekt-Nachweis
**GEMESSEN am Repo bzw. an den Läufen vom 2026-09-04 (CC)**. Die Live-Beobachtungen
**GEMESSEN 2026-09-03/04 (OWNER)** an der ausgelieferten Anwendung.
**ABLEITUNGEN UND RECHNUNGEN, ausdrücklich als solche gekennzeichnet und nicht als
Beobachtung:** die Datums- und Ortszeit-Angaben aus den zwei Epochenwerten, der Abstand
von 601 200 Sekunden, die Unauflösbarkeit des Rohwert-Paares, und die Verträglichkeit der
ERSTEN Neu-Verbindung mit einem Sieben-Tage-Reset. Die Einordnung von M2 ist eine
**CC-BEOBACHTUNG am eigenen Lauf** vom 2026-09-04.

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
ZEIGER 2026-09-03: 1b entsteht in ZWEI SCHRITTEN — der NACHTRAG dazu steht EINMAL, am Ende
der Entscheidung (7), und wird hier nicht verdoppelt.

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

NACHTRAG 2026-09-03 — 1b ENTSTEHT IN ZWEI SCHRITTEN. DIE WORTLAUTE VON (6) UND (7) BLEIBEN
UNANGETASTET UND SIND WAHR; DIESER NACHTRAG TRITT DANEBEN UND STEHT NUR HIER. Die
Entscheidung (6) trägt eine einzeilige Zeigerzeile hierher — zweimal geschrieben liefe es
auseinander.
KEIN STEMPEL, UND DAS IST DIE ERSTE ANGABE: **Der MECHANISMUS hat sich nicht geändert, nur
die ZAHL DER SCHRITTE.** Ein Stempel behauptete einen überholten Satz, und es gibt keinen.
· **DIE ZERLEGUNG: 1b-1** die Klammer um `refreshAccessToken` — geschnitten am 2026-09-03,
  Volltext im Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der Scheibe 1b des
  Schnitts der Phase 11.2". **1b-2** der Takt — nicht geschnitten.
· **DIE AUFZÄHLUNG IN (6) BEHÄLT IHRE FÜNF STÜCKE, WEIL KEIN SECHSTES DAZUKOMMT.** 1b-1 und
  1b-2 sind Schritte INNERHALB des Stücks 1b, keine weiteren Stücke. **ES GIBT KEINE
  SCHEIBE 1c.** Der Satz "DIE AUFZÄHLUNG OBEN TRÄGT VIER NUMMERN UND FÜNF STÜCKE" bleibt
  richtig, ebenso die GRENZE "Zwingend ist NUR 4 nach 1a, 2 und 3".
· **DIE ANGABEN "1b den automatischen Auslöser" IN (6) UND "der automatische Auslöser (1b)"
  IN (7) SIND UNTER DIESER ZERLEGUNG WAHR** und lediglich unvollständig: Sie beschreiben das
  PAKET, und das Paket IST der Auslöser. **EIN ZITAT DER FORM "SCHEIBE 1b" OHNE SUFFIX MEINT
  DAS PAKET UND NIE EINE HÄLFTE**; die beiden Schritte tragen ihr Suffix ausnahmslos.
· **DIE FOLGE, DIE OHNE DIESEN NACHTRAG FEHLT — UND SIE IST DIE TEUERSTE: DIE GRENZE DIESER
  ENTSCHEIDUNG GILT FÜR 1b-1 GLEICHLAUTEND.** "1a ALLEIN HÄLT KEINEN ZUGANG AM LEBEN — eine
  Funktion, die niemand ruft, erneuert nichts": **Nach 1b-1 hält ebenso wenig ein
  Zugangsdatum von selbst**, denn die Klammer hat so wenig einen Aufrufer wie die Funktion
  darunter. **ERST 1b-2 LÖST DAS PROBLEM, AUF DAS SICH DER SATZ "1b löst das eigentliche
  Problem" BEZIEHT.** Wer 1b-1 abschliesst und 1b-2 vertagt, steht genau dort, wovor diese
  GRENZE warnt — eine Ebene höher.
· **WARUM DER SATZ "1b löst das eigentliche Problem" STEHEN BLEIBT:** Er ist die einzige
  Stelle im Repo, die sagt, WANN der Fehlzustand beseitigt ist. Mit einem eigenständigen
  Geschwister-Namen wäre er FALSCH geworden, und diese Auskunft stünde danach nirgends mehr.
PROVENIENZ: ARCHITEKTEN-FESTLEGUNG 2026-09-03, auf CC-Meldung derselben Runde. Keine
Messung.
ZEIGER 2026-09-03: 1b-2 ist inzwischen ZUR HÄLFTE geschnitten — 1b-2a steht, 1b-2b nicht.
Der NACHTRAG dazu steht am Kopf von "1b als Folgetask" und wird hier NICHT verdoppelt: zwei
Fassungen derselben Tatsache liefen auseinander.

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

   **VERMERK 2026-09-02 — "DIE ERSTE MESSUNG NIMMT SIE MIT" IST NICHT EINGELÖST. DER EINTRAG
   SCHRUMPFT NICHT UND ENTFÄLLT NICHT; ALLE DREI NAMEN BLEIBEN UNGEPRÜFT.** Der Text darüber
   bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN.
   **ER ERSETZT DEN VERMERK VOM 2026-09-01 VOLLSTÄNDIG**, und zwar als SACHKORREKTUR: Jener
   sagte, der Eintrag schrumpfe "von drei ungeprüften Namen auf zwei", weil Schritt 2 des
   Live-Tests der Scheibe 4 einen Query-String benutzt habe — "den, den GOOGLE SELBST an die
   Ziel-URL gehängt hat, über eine echte Anzeige und nicht von Hand eingetippt". **DIE
   PRÄMISSE TRIFFT NICHT ZU.**
   **OWNER-ANGABE 2026-09-02:** Die Klick-Kennungen des Live-Tests waren **von Hand in die
   Browserzeile gesetzt** und stammen aus keinem Klick; im Einsatz waren **zwei** Werte
   (`EAIaIQobChMI` und `Tester-123`), und **welcher zu welchem Adapter-Aufruf gehört, ist nicht
   rekonstruierbar**. Volltext der Korrektur: VERMERK 10, Abschnitt (b), "SACHKORREKTUR
   2026-09-02 — DIE HERKUNFT DER KLICK-KENNUNG".
   **FÜR DIESEN EINTRAG IST DIE ZUORDNUNG GLEICHGÜLTIG:** Beide Werte sind von Hand gesetzt,
   also misst der Durchlauf in beiden Fällen die eigene Extraktion und nicht Googles
   Auto-Tagging.
   **WAS BISHER GALT UND ZWEIMAL AUSDRÜCKLICH FESTGEHALTEN WORDEN IST — UNVERÄNDERT:** VERMERK
   3 und VERMERK 4 führen diesen Eintrag je als UNBERÜHRT; Messung A und Messung B1 haben
   **keinen Query-String benutzt**, sondern eine Kopfzeile und einen Rumpf gesetzt.
   **DAS GILT JETZT AUCH FÜR SCHRITT 2 — auf der Achse dieses Eintrags.** Ein von Hand
   gesetzter Query-String misst **UNSERE EXTRAKTION**, nicht **GOOGLES AUTO-TAGGING**. Genau
   diese Achse führt der Eintrag als "WEDER einen Befund NOCH einen Nicht-Treffer mit benannter
   Reichweite", und dabei bleibt es.
   **WAS SCHRITT 2 TROTZDEM HERGIBT — UND ES IST EINE ABLEITUNG AUS ZWEI LOGZEILEN, KEINE
   ABLESUNG DER NUTZLAST:** Hätte `extractGoogleClickIds` keinen der drei
   schreibungssensitiven Namen getroffen, verwürfe `buildGoogleEvent` mit `no_click_id`, und
   die Zeile `[capi] Google forward skipped: no_click_id` stünde im Log — sie steht dort im
   Schritt 5 und in Schritt 2 **nicht**, und eine Fehlerzeile ebenfalls nicht.
   **MINDESTENS EINER DER DREI KLEINGESCHRIEBENEN NAMEN HAT ALSO GETROFFEN — den Wert, den der
   OWNER GETIPPT HAT.** Das ist eine Aussage über die Extraktion und über nichts sonst.
   **DIE GRENZE IST DER EIGENTLICHE INHALT DIESES VERMERKS: WELCHER der drei getroffen hat,
   ist NICHT GEMESSEN.** Das Log nennt keinen Namen — es nennt bei Erfolg gar nichts —, und die
   Nutzlast ist nicht abgelesen worden. **ÜBER DIE ZWEI ÜBRIGEN SAGT DER DURCHLAUF NICHTS.**
   **EIN ABSATZ DES ALTEN VERMERKS IST ERSATZLOS ENTFALLEN, und das gehört benannt:** Er
   erklärte, warum ein einzelner Durchlauf nur EINEN der drei Namen mitnehmen könne — "Ein
   Anzeigenklick hängt in aller Regel EINEN der drei an". **Der Satz setzte einen Anzeigenklick
   voraus, den es nicht gegeben hat**, und beschrieb damit ein Instrument, das nie im Einsatz
   war.
   **WAS OFFEN BLEIBT UND WARUM DER EINTRAG STEHEN BLEIBT:** Für **ALLE DREI** Namen stützt
   sich die Schreibung weiterhin auf **nichts Gelesenes und nichts Gemessenes**. Der im Eintrag
   benannte Fehlerweg gilt unverändert: Ein exakter Vergleich kann nur VERFEHLEN, und ein
   Verfehlen ist als fehlende Conversion sichtbar — aber eben nur, wenn jemand hinsieht.
   **DER SATZ "DIE ERSTE MESSUNG NIMMT SIE MIT" WARTET DAMIT WEITER**, und er wartet auf
   dasselbe wie am 2026-08-25: einen Durchlauf mit einem Query-String, den **GOOGLE** geschrieben
   hat. Der ist an die Sperre "AUF DEM KONTO EXISTIERT KEIN ECHTER ANZEIGENKLICK" gebunden, s.
   den Abschnitt "Gegenstand der Phase".
   PROVENIENZ, JE TEIL: Die Korrektur der Prämisse ist eine **OWNER-ANGABE 2026-09-02**, keine
   Messung. Die Ableitung aus den zwei Logzeilen bleibt eine **ABLEITUNG** (Live-Werte GEMESSEN
   2026-09-01, OWNER; die Ableitung CC, 2026-09-01), **KEINE Ablesung der gesendeten Nutzlast,
   KEINE Messung am Parameternamen selbst**. Dass VERMERK 3 und 4 den Eintrag als unberührt
   führen, ist GEMESSEN am Dateitext (CC, 2026-09-01).
   **DIE STREICHUNG DES EINTRAGS IST HIER NICHT ENTSCHIEDEN UND WIRD ES AUCH NICHT** — er
   ist nur kleiner geworden.

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

   **VERMERK 2026-09-01 — DER ADRESSAT DIESES EINTRAGS IST VORBEI. DER EINTRAG IST NICHT
   FALSCH; ER HAT NIEMANDEN MEHR, AN DEN ER SICH RICHTET.** Der Text darüber bleibt ZEICHEN
   FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN.
   **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-01):** Die Transport-Scheibe ist gebaut
   (Bau-Commits `26caa38` und `84e9fca`, s. VERMERK 10) und hat **KEINES der drei Felder
   aufgegriffen**:
   · **`consent`** — die Anfrage trägt keines. Der Kommentarkopf von
     `IngestEventsRequest` (src/lib/capi/google-payload.ts) führt es unverändert unter den
     vier bewusst fehlenden Hüllen-Feldern und zeigt für die offene Frage auf **genau diesen
     Eintrag**.
   · **`reference` / `destinationReferences`** — `buildIngestEventsRequest` (ebenda) baut
     **GENAU EIN** `destinations`-Element und reicht keine Referenzen durch.
   · **`eventName`** — `GoogleEvent` (ebenda) führt das Feld nicht, und `buildGoogleEvent`
     setzt es nicht.
   **WARUM DAS EIN POSTEN IST UND KEINE ERLEDIGUNG:** Der Eintrag war ausdrücklich
   geschrieben worden, damit die drei Felder "nicht zwischen die Scheiben fallen" — "Diese
   Scheibe baut sie nicht, und die Transport-Scheibe hätte keinen Anlass, nach ihnen zu
   suchen." **DIE TRANSPORT-SCHEIBE IST VORBEI, UND SIE HAT TATSÄCHLICH NICHT NACH IHNEN
   GESUCHT.** Ein Eintrag, dessen Adressat abgelaufen ist, wird von niemandem mehr gelesen —
   er sieht bei jeder Durchsicht so aus, als warte er noch, und wartet auf nichts.
   **EIN EINTRAG OHNE ADRESSATEN BRAUCHT EINEN NEUEN TRIGGER ODER ENTFÄLLT. ER BEKOMMT
   TRIGGER — ENTSCHIEDEN (ARCHITEKT, 2026-09-01).**
   **DREI TRIGGER STATT EINEM — je Feld einer, weil die drei nichts miteinander zu tun haben
   ausser ihrer Herkunft aus derselben Hülle.** Jeder ist am Repo bzw. an einer gelesenen
   Stelle begründet, und die Begründung ist der Grund, aus dem der Trigger gilt:
   · **`consent`** → **Phase 11.5 (Einwilligungs-Dialog).** GRUND: Solange kein Dialog
     existiert, gibt es kein Einwilligungs-URTEIL, das man weiterreichen könnte; der Draht
     füllt heute ohne Betreiber-Hook alle Schlüssel auf `true` (`__psConsentAll`). Erst mit
     einem Dialog wird die Frage "muss das Feld gefüllt werden" überhaupt entscheidbar. Die
     Auflage, dass `"google"` im Dialog zu führen ist, steht bereits an Festlegung (3) des
     Zuschnitts der Scheibe 2.
   · **`reference` / `destinationReferences`** → **der ZWEITE Empfänger in EINER Anfrage.**
     GRUND: Der Eintrag nennt diesen Zeitpunkt selbst ("Beim zweiten Empfänger wird es fällig
     und ist dann erzwungen eindeutig"), und der Zustand ist am Code messbar — heute genau
     ein `destinations`-Element.
   · **`eventName`** → **GA4 als eigenes Ziel.** GRUND: Das Feld ist "für Google Ads
     optional, Pflicht nur für GA4" (GELESEN, Teil (w)/F1), und **GA4 ist im Produktivcode
     kein Ziel** (GEMESSEN am Repo, CC, 2026-09-01: kein Adapter, kein Eintrag in
     `TRACKING_TARGETS`, die Treffer auf "GA4" liegen ausschliesslich in Kommentaren und
     Doku-Zeigern). Die Roadmap-Zeile 11.2 führt GA4 als zweites Produkt neben Google Ads.
   **DER EINTRAG HAT AB JETZT DREI TRIGGER, UND ER ENTFÄLLT ERST, WENN ALLE DREI EINGETRETEN
   UND ABGEARBEITET SIND. EIN EINZELNER EINGETRETENER TRIGGER NIMMT IHN NICHT HERAUS.**
   Ohne diesen Satz liest die erste Runde, die einen der drei erreicht, den ganzen Eintrag als
   fällig und danach als erledigt — und die zwei übrigen Felder fielen still weg, also genau
   das, wogegen der Eintrag ursprünglich geschrieben wurde.
   **WAS DIESER VERMERK AUSDRÜCKLICH NICHT TUT:** Er streicht nichts und empfiehlt keines der
   drei Felder zum Bau. **KEINE EMPFEHLUNG.** Ein Trigger sagt, WANN die Frage fällig wird —
   nicht, wie sie zu beantworten ist.
   PROVENIENZ: Der Nicht-Bau der drei Felder GEMESSEN am Repo (CC, 2026-09-01). Dass der
   Adressat vorbei ist, ist eine FOLGE aus dem Wortlaut des Eintrags und dem Vollzug der
   Scheibe 4. **Die drei Trigger sind eine ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-01, getroffen
   auf drei ABLEITUNGEN, die je an einer gemessenen bzw. gelesenen Stelle begründet sind** —
   die Ableitungen stehen oben zeichengleich, wie sie vor der Entscheidung dastanden; geändert
   hat sich ihr RANG, nicht ihr Inhalt.

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

   **VERMERK 2026-09-01, SACHKORRIGIERT AM 2026-09-02 — DER TRIGGER IST EINGETRETEN, UND DIE
   FRAGE IST NUR IN EINER RICHTUNG BEANTWORTET.** Der Text darüber bleibt ZEICHEN FÜR ZEICHEN
   stehen; dieser Vermerk tritt DANEBEN.
   **WAS AM 2026-09-02 ERSETZT WORDEN IST:** Die Überschrift sagte "DIE FRAGE IST BEANTWORTET.
   DIESER EINTRAG HAT SEINEN GEGENSTAND VOLLSTÄNDIG ABGEARBEITET", und der erste Spiegelstrich
   qualifizierte die Kennung als ECHT und ihren Weg als "über eine echte Anzeige". **DIE
   PRÄMISSE TRIFFT NICHT ZU** — OWNER-ANGABE 2026-09-02, Volltext in VERMERK 10, Abschnitt (b),
   "SACHKORREKTUR 2026-09-02 — DIE HERKUNFT DER KLICK-KENNUNG".
   **DER TRIGGER LAUTETE "die Transport-Scheibe — jetzt für die verbliebene Frage nach dem
   INHALT der URL".** Die Scheibe ist gebaut und live bewiesen (VERMERK 10), und die Frage ist
   damit so weit beantwortet — GEMESSEN 2026-09-01 (OWNER), an der ausgelieferten Anwendung:
   · **LANDEPAGE: DIE KENNUNG IST DA — BEI EINEM VON HAND GESETZTEN WERT.** Schritt 2 — die
     gehostete Seite mit von Hand gesetztem Query-String aufgerufen, die Conversion auf
     derselben Seite ausgelöst: durchgelaufen, keine Fehlerzeile, kein `no_click_id`.
     **DAS IST NEU GEGENÜBER VERMERK 1 und nicht nichts:** Dort war gemessen, dass der Wert im
     `eventSourceUrl` **ankommt**; hier durchläuft er zum ersten Mal den **VOLLSTÄNDIGEN
     PRODUKTIVPFAD** bis zum Netzruf.
     **DIE ERSTE HÄLFTE DER RESTLÜCKE AUS VERMERK 1 IST DAMIT NICHT EINGELÖST:** Ob eine
     **ECHTE** `gclid` denselben Weg nimmt, ist weiterhin **NICHT GEPRÜFT**. Sie ist kleiner
     geworden, nicht geschlossen.
   · **FOLGESEITE: SIE IST WEG.** Schritt 3 — dieselbe von Hand gesetzte Adresse, die
     Conversion erst nach einem Seitenwechsel: `location.href` trägt die Kennung zur
     Conversion-Zeit nicht mehr,
     und es entsteht kein Ereignis. **Damit ist die ZWEITE Hälfte eingelöst** — die, die
     dieser Eintrag als "auf einer Seite mit mehreren Schritten ist `location.href` zur
     Conversion-Zeit eine andere URL als beim Einstieg" formuliert hatte.
   **DIE ZWEI ZEIGER, damit nichts hier ein zweites Mal geschrieben wird:** Das Protokoll
   beider Schritte und die Einlösung der drei Schulden stehen in **VERMERK 10, Abschnitt (b)**.
   Die **FOLGE der zweiten Hälfte** — dass Conversions auf Folgeseiten für Google heute nicht
   messbar sind und die naheliegende Abhilfe durch TRANSIT-ONLY versperrt ist — ist als
   **Vorrats-Eintrag 39** verortet, samt ihrem Bezug zu Phase 17 und zur dritten Datenklasse.
   **Zweimal geschrieben liefe es auseinander.**
   **WAS DIESER VERMERK NICHT TUT — UND DAS IST DER GRUND, WARUM ER DANEBEN STEHT STATT DEN
   EINTRAG ZU ERSETZEN: OB DER EINTRAG DAMIT ENTFÄLLT, IST HIER NICHT ENTSCHIEDEN UND WIRD ES
   NICHT.** Er hat seinen Gegenstand abgearbeitet — das ist etwas anderes, als überflüssig zu
   sein. **Zwei Gründe sprechen dagegen, ihn beiläufig zu streichen**, und keiner davon wird
   hier abgewogen: Sein GEMESSENER Teil (`eventSourceUrl` erreicht jeden Adapter über
   `CapiRequestBody`; drei der vier Adapter lesen sie, LinkedIn nicht) ist der Maßstab für
   jeden künftigen Adapter, der die URL braucht — und die Bauform dieses Vorrats hat bei
   Eintrag 7, 15 und 16 jeweils **die Messung als Grund für das Stehenbleiben** genannt.
   **DIE STREICHUNG IST EINE EIGENE ENTSCHEIDUNG.**
   PROVENIENZ: Die Live-Werte der Schritte 2 und 3 GEMESSEN 2026-09-01 (OWNER) an der
   ausgelieferten Anwendung. Dass der Trigger damit eingetreten ist, ist eine FOLGE aus seinem
   Wortlaut. **KEINE Ablesung der gesendeten Nutzlast.**

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
   · **DIE ENTSCHEIDUNG TRÄGT EINE FESTLEGUNG, UND ZWAR DIE SECHSTE DES ZUSCHNITTS DER
     SCHEIBE 2** ("DIE KUNDENNUMMER WIRD AN DER EINGABE NORMALISIERT", 2026-08-31). Was sie
     sagt — Bindestriche und Leerraum fallen, sonst nichts, an der Eingabe, nur die
     Kundennummer, sichtbar — steht **dort und nicht hier**; zweimal geschrieben liefe es
     auseinander.
   · **EINE GEGENFASSUNG IST ERWOGEN UND ZURÜCKGEZOGEN WORDEN, und sie gehört festgehalten,
     damit niemand sie für ungeprüft hält und neu vorbringt:** Sie hätte das Gegenteil gesagt
     — keine Normalisierung im Code, die Form nur im Platzhalter und im Hinweistext der
     Karte. **Ihre Begründung war eine Asymmetrie:** eine falsche Normalisierung schreibe
     einen veränderten Wert in die Datenbank, und niemand sehe mehr, was der Betreiber
     getippt hat.
     **SIE IST WIDERLEGT, NICHT ÜBERSTIMMT** (ARCHITEKT, 2026-08-31): Das Argument trifft
     eine **VERSTECKTE** Transformation, also eine server-seitige Umformung. Hier ist es ein
     **Eingabefeld**, und der gespeicherte Wert steht sichtbar darin. Dazu ein Präzedenzfall
     im Haus — `setPixelId` trimmt bereits, eine Normalisierung an der Eingabe ist gebaut,
     nur eine schwächere. **Die volle Herleitung steht an Festlegung (6) selbst.**
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

   **ERLEDIGT AM 2026-08-31 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN SEINER MESSUNG UND
   SEINER GRENZE.** Bauform wie bei Eintrag 15: ein eigener datierter Absatz UNTER dem
   unveränderten Eintrag, mit Datum, Grund und dem, was ihn eingelöst hat.
   **WAS IHN EINLÖST:** Der Eintrag sagte "Der Ort für die Normalisierung ist die Stelle,
   an der der Betreiber die Nummer eingibt; **die gibt es heute nicht**." **ES GIBT SIE
   JETZT, UND DORT WIRD NORMALISIERT** — `NORMALIZE_PIXEL_ID` in `src/lib/settings.ts`,
   gerufen aus `setPixelId`, also im Schreibpfad der Eingabe. Bau-Commit `6dc7e27`, live
   bestätigt (VERMERK 9, Schritt 2: die Bindestriche fallen sichtbar im Feld).
   **DER ZWEITE HALBSATZ DES TITELS IST EINGEHALTEN:** `buildIngestEventsRequest`
   normalisiert weiterhin nicht und ist nicht angefasst worden.
   **WARUM DER EINTRAG NICHT GELÖSCHT WIRD — ZWEI GRÜNDE, und der zweite wiegt schwerer:**
   (1) Seine MESSUNG (Teil (bt): `INVALID_NUMBER_FORMAT` auf `account_id`) ist der Beleg,
   auf dem die Umformung überhaupt ruht. (2) Seine GRENZE — dass **nicht isoliert gemessen
   ist, ob die Bindestriche der Grund der Abweisung waren** — ist der MASSSTAB für jede
   spätere Frage an dieser Achse, etwa den Schrägstrich aus Eintrag 28 oder den
   Zeichenvorrat aus Eintrag 29. **Ein gelöschter Eintrag nähme beide mit.**
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

   **VERMERK 2026-09-03 — DER ZUSCHNITT DES SCHRITTS 1b-1 NIMMT DIESEN EINTRAG BEGRÜNDET
   NICHT AUF. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT
   DANEBEN.**
   **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
   der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
   OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
   **DER TRIGGER IST NICHT EINGETRETEN, UND ZWAR AN BEIDEN HÄLFTEN:** Eine Rotation ist
   bei keinem Anbieter dieses Rahmens gemessen worden, und **1b-1 baut KEINEN AUSLÖSER** —
   die Funktion wird also von nichts nachweislich nebenläufig gerufen. **MIT 1b-2 KANN ER
   EINTRETEN; DORT IST ER NEU ZU PRÜFEN.**
   **DER ZWEITE GRUND IST DER TRAGENDE, und er steht ausgeschrieben im Zuschnitt** (dort
   unter "Was ausdrücklich draussen bleibt, je mit seinem Grund"): **Die FORM des Riegels
   hängt am GRAD der Nebenläufigkeit, und den legt erst der TAKT fest — also 1b-2.** Ein
   Riegel im Prozessspeicher trägt für einen Sweep mit zwei Läufen und trägt nicht, wenn der
   Verkehr ihn auslöst. **Vor der Takt-Wahl gebaut, wäre er auf Verdacht gebaut.**
   **DIE ZWEITE ACHSE DIESES EINTRAGS IST DAVON UNBERÜHRT UND BLEIBT UNGEMESSEN** — ob der
   Anbieter ein vorheriges Zugangsdatum bei Ausstellung eines neuen entwertet. Der
   Zuschnitt führt sie ausdrücklich als geschützte Invariante: **der ACHSE-2-Kommentarkopf
   von src/lib/oauth/token-refresh.ts bleibt und wird nicht abgeschwächt.**
   **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT.** Sein Trigger steht wörtlich
   wie zuvor; was hinzukommt, ist die Auskunft, dass er in 1b-1 **geprüft und begründet
   vertagt** worden ist — und ein geprüft vertagter Posten sieht in einem Repo sonst genauso
   aus wie ein übersehener, nämlich wie nichts.
   PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO; die Zerlegung in zwei
   Schritte eine ARCHITEKTEN-FESTLEGUNG desselben Tages. Keine Messung.

   **ZWEITER VERMERK 2026-09-03 — DER EINTRAG BLEIBT VERTAGT, ABER SEINE ZWEITE ACHSE WIRD
   UNTER SCHEIBE 1b-2a SCHÄRFER. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN.**
   **WARUM DAS AN DEN EINTRAG GEHÖRT UND NICHT NUR IN DEN ZUSCHNITT:** Wer diesen Posten in
   einem Jahr aufschlägt, liest hier zuerst — und der Vermerk oben sagt "geprüft und
   begründet vertagt". Ohne diesen Zusatz liest er eine Vertagung, deren Gewicht sich
   seither geändert hat, als unveränderten Stand.
   **DIE ERSTE ACHSE (DIE ROTATION) IST UNBERÜHRT:** Google rotiert das Erneuerungs-Token
   nicht (GEMESSEN 2026-08-28, OWNER, Messung C), und daran ändert ein häufigerer Aufruf
   nichts.
   **DIE ZWEITE ACHSE (AUSSTELLUNGS- UND SCHREIBREIHENFOLGE) WIRD SCHÄRFER, UND ZWAR AUS
   EINEM BENENNBAREN GRUND:** Sie ist eine Aussage über NEBENLÄUFIGE Läufe, und
   Nebenläufigkeit war bisher nur durch zwei gleichzeitige Klicks eines Menschen
   herstellbar. **EIN VERKEHRSGETAKTETER AUSLÖSER ERNEUERT HÄUFIGER ALS EIN MENSCH, DER EINE
   ROUTE DRÜCKT** — und mehrere Beacons können denselben Moment treffen. **Was daran
   UNGEMESSEN ist, bleibt ungemessen:** ob der Anbieter ein vorheriges Zugangsdatum bei
   Ausstellung eines neuen entwertet. Nur die Wahrscheinlichkeit, dem Fall zu begegnen,
   steigt.
   **DER TRIGGER BLEIBT WÖRTLICH STEHEN, UND ER IST WEITERHIN NICHT EINGETRETEN:** 1b-2a
   baut **KEINEN** Riegel (Invariante (I-6) jenes Zuschnitts), und "ein Auslöser, der die
   Funktion nachweislich nebenläufig ruft" ist mit ihr noch nicht nachgewiesen, sondern
   nur wahrscheinlicher geworden. **DER RIEGEL IST SCHEIBE 1b-2b**, und ihr eigener Trigger
   steht dort.
   **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT. KEINE EMPFEHLUNG**, welche
   Form ein Riegel bekäme.
   PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Dass die zweite Achse unter
   häufigerer Erneuerung schärfer wird, ist eine **ABLEITUNG** aus dem gewählten Takt,
   **keine Messung** — es ist kein nebenläufiger Lauf beobachtet worden.

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

    **VERMERK 2026-09-03 — TRIGGER EINGETRETEN, UND DIESER EINTRAG LIEGT IN 1b-1. DER
    TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt **die Obergrenze aus diesem Eintrag
    als eines von drei Stücken, die hineingehören.**
    **DIE OBERGRENZE LIEGT IN 1b-1 UND NICHT IN 1b-2, und dieser Satz gehört hierher, weil
    die naheliegende Zuordnung die andere wäre:** Sie hängt an der KLAMMER und nicht am
    Takt — der Ausgang `retry` entsteht in der Funktion darunter, und die Klammer ist die
    erste Stelle, die zählen kann.
    **WAS DER ZUSCHNITT NICHT TUT, und das ist der Grund für diesen Vermerk: ER SAGT NICHT,
    WELCHE GESTALT SIE BEKOMMT.** Er trägt dafür eine eigene offene Entwurfsfrage mit DREI
    Lesarten — Wiederholung mit Deckel INNERHALB eines Aufrufs · ein persistierter Zähler
    ÜBER Aufrufe hinweg · eine ehrlichere AUSGANGS-KLASSIFIKATION, die `retry` nur dort
    meldet, wo Wiederholen etwas ändern kann. **Die zweite fällt aus 1b-1** (sie braucht
    Zustand und Wissen über den Takt); **zwischen der ersten und der dritten entscheidet der
    Architekt am Plan.**
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT:** Ein eingetretener Trigger
    ist kein Vollzug, und der Satz "Sie soll sie auch nicht kennen: eine Bibliotheksfunktion
    ohne Aufrufer kann nicht wissen, wie oft sie schon lief" ist **der Maßstab, an dem die
    Gestalt der Obergrenze zu messen ist** — die Klammer bekommt einen Aufrufer, die
    Bibliotheksfunktion darunter nicht.
    PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
    Existenz des Zuschnitts (CC, 2026-09-03). Die drei Lesarten sind ein
    ARCHITEKTEN-ZUSCHNITT vom 2026-09-03, die Zerlegung in zwei Schritte eine
    ARCHITEKTEN-FESTLEGUNG desselben Tages; keine Messung.

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

    **VERMERK 2026-09-01 ZUM ZWEITEN SPIEGELSTRICH (`ensureTrackingKey`) — DER
    URSPRUNGSTEXT WIRD NICHT UMGESCHRIEBEN, DIESER VERMERK TRITT DANEBEN.**
    Der Ursprung führt den Posten als "VORBEDINGUNG der Transport-Scheibe".
    **SCHEIBE 4 BEHEBT IHN NICHT**, und der Grund gehört dazu, sonst gilt er als übersehen:
    **Ohne Tracking-Schlüssel erreicht kein Beacon den Ingest** — `getCapiConfigByTrackingKey`
    (src/lib/capi/token.ts) kehrt bei leerem Schlüssel ohne Datenbank-Runde zurück, und ein
    Projekt ohne Schlüssel trägt auch keinen ausgelieferten Emitter, der einen senden könnte.
    **ES ENTSTEHT ALSO GAR KEIN VERKEHR, NICHT NUR KEIN SICHTBARER.** Ein Zustand, der nichts
    erzeugt, kann nichts stillschweigend falsch machen; das ist der Unterschied zu einem
    Posten, der still Conversions verliert.
    **DIE BEDINGUNG, UNTER DER DAS KIPPT:** eine Scheibe, die **OHNE Veröffentlichung sendet**
    — **Phase 11.4, der Testknopf**. Dort löst ein Betreiber den Versand von Hand aus, und der
    Weg über den ausgelieferten Emitter entfällt; ab da ist ein fehlender Schlüssel kein
    leiser Zustand mehr, sondern ein Fehlschlag mit Auslöser.
    **EIN GEMESSENER ZUSATZ (CC, 2026-09-01), der die Prämisse "ohne Publish kein Schlüssel"
    enger fasst als bisher angenommen:** Eine `domains`-Zeile KANN **ohne** `publishProject`
    entstehen — `persistDomainRow` (src/lib/domains/register.ts) legt sie an, erreichbar über
    `registerCustomDomain` und die Server-Action `addCustomDomain`
    (src/app/projects/domain-actions.ts), und **diese Kette berührt `publishProject` an keiner
    Stelle**. ACHSE: `from("domains")` über `src/` rekursiv, binärsicher, Testdateien
    gefiltert — zwölf Fundstellen, davon DREI `insert`; zwei davon (`assignDomainLabel`,
    `insertDomainLabel`) haben ausschliesslich `publishProject` als Aufrufer, die dritte nicht.
    Positivkontrolle: dieselbe Achse führt die Aufrufer-Kette je Symbol lückenlos.
    **WAS DER ZUSATZ NICHT SAGT:** `ensureTrackingKey` läuft **weiterhin nur** in
    `setCapiToken` und `publishProject` (GEMESSEN am Repo, CC, 2026-09-01). Die
    Custom-Domain-Zeile setzt **keinen** Tracking-Schlüssel — der Zusatz benennt eine
    `domains`-Zeile ohne Publish, **nicht** einen Schlüssel ohne Publish. Wer beides
    zusammenzieht, liest hier eine Behebung, die nicht dasteht.

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

    **NACHTRAG 2026-08-31 — DER ERSTE TRIGGER IST EINGETRETEN UND DER EINTRAG IST
    ERLEDIGT.** Scheibe 2 hat `src/lib/settings.ts` geöffnet, und der Beleg ist im selben
    Zug korrigiert worden: Der Kommentar über `settingsEqual` behauptete, der
    Speichern-Knopf bleibe inaktiv. **DIE FUNKTION SELBST IST NICHT ANGEFASST WORDEN** —
    Festlegung (1) ist gerade so gewählt, dass sie unverändert trägt.
    **DER EINTRAG BLEIBT STEHEN, WEIL ER DIE MESSUNG TRÄGT:** dass `dirty` nicht im
    `disabled` steht und der Verlust an den drei ausbleibenden Warnungen hängt. Die
    Unterscheidung stellt sich bei der nächsten Dirty-Frage wieder, und dann ist der
    Unterschied zwischen "gemessen" und "nie geprüft" die ganze Auskunft.

28. **DER SCHRÄGSTRICH FÄLLT NICHT — UND DAS IST KONFORM, KEIN DEFEKT.**
    **GEMESSEN LIVE (OWNER, 2026-08-31):** Ein `/` im Kundennummer-Feld bleibt stehen.
    Festlegung (6) sagt "Bindestriche und Leerraum, SONST NICHTS", und Festlegung (5)
    prüft keine Form — beides greift hier genau so, wie es dasteht.
    **DIE UNTERSCHEIDUNG, DIE DEN FILTER RECHTFERTIGT UND DEN SCHRÄGSTRICH AUSSCHLIESST:**
    Bindestriche fallen, **WEIL Google Ads Kundennummern MIT Bindestrichen ANZEIGT** — der
    Betreiber schreibt ab, was er sieht, und die Umformung heilt ein KOPIER-Artefakt. Für
    Schrägstriche gibt es keine solche Grundlage; sie wären ein TIPPFEHLER.
    **DEN FILTER "ZU VERVOLLSTÄNDIGEN" HIESSE, AUF EINER UNGEMESSENEN ACHSE ZU RATEN** —
    genau das, wogegen Festlegung (5) argumentiert. **Der Eintrag steht hier, damit die
    nächste Runde ihn nicht als Lücke aufräumt.**
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine gemessene Anzeigekonvention des Anbieters, die ein ANDERES Trennzeichen
    führt.

29. **EINE GRENZE AM ZEICHENVORRAT DER NORMALISIERUNG.**
    `[-\s]` trifft den **ASCII-Bindestrich**; `\s` deckt auch das **geschützte
    Leerzeichen** ab. **EIN GEDANKENSTRICH AUS EINER FREMDEN QUELLE FÄLLT NICHT** — weder
    Halbgeviert- noch Geviertstrich sind ASCII-Bindestriche.
    **OB DAS JE VORKOMMT, IST UNGEMESSEN.** Als GRENZE notiert und nicht gebaut: Ein
    breiterer Zeichenvorrat wäre dieselbe Ratearbeit wie beim Schrägstrich oben.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: ein beobachteter Fall — ein Betreiber, dessen Kundennummer nach dem Eintragen
    einen Strich behält.

30. **DER `never`-KOMMENTAR IN `TargetCard.test.tsx` IST ÜBERHOLT — UND WAR ES SCHON VOR
    DIESER RUNDE.**
    Er sagt, im `else`-Zweig von "JEDES Ziel" verenge TypeScript `target` auf `never`,
    "seit 11.1f deckt sich diese Union mit `TrackingTarget`".
    **GEMESSEN am Repo (CC, 2026-08-31):** Seit Scheibe 3 hat `TARGETS_WITH_ADAPTER` VIER
    Mitglieder und `TRACKING_TARGETS` FÜNF; der Zweig verengt auf `'google'`, nicht auf
    `never`. **Der Satz war also schon vor Scheibe 2 falsch** — diese Runde hat ihn nur
    sichtbar gemacht, weil sie den Nachbarzweig umgeschrieben hat.
    **ES IST EINE TATSACHENBEHAUPTUNG ÜBER DEN COMPILER, KEINE ZUSAGE DES TESTS** — der
    Lauf misst unverändert das Richtige. Deshalb nicht in derselben Runde korrigiert: Eine
    Kommentar-Sachkorrektur gehört nicht in den Diff eines Baus.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die `src/components/TargetCard.test.tsx` ohnehin öffnet.

31. **DAS `aria-label`-MUSTER AN DER EREIGNIS-ACHSE IST DATEN, KEIN MECHANISMUS.**
    **DER BEFUND:** Mit zwei Zielen auf derselben Ereignisliste tragen zwei Eingabefelder
    denselben zugänglichen Namen ("Lead") und schreiben in VERSCHIEDENE Ziel-Slots — die
    Lage aus "ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
    OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM" (docs/immer-beachten.md). Aufgelöst ist sie
    durch ein ziel-präfixiertes `aria-label`, nach der Hausform der Karten.
    **EIN DRITTES ZIEL AUF DIESER ACHSE ERBT DAS MUSTER NICHT VON SELBST.** Der Ausdruck
    baut den Namen aus `TARGET_CARDS[…].name` und wächst damit mit — **aber nur, solange
    die Namen unterscheidbar bleiben.** Zwei Ziele mit gleichem Kartennamen erzeugten
    dieselbe Mehrdeutigkeit erneut, und **kein Test hielte das** (der bestehende prüft
    genau zwei benannte Felder).
    **GEMELDET, DAMIT ES NICHT ALS GELÖST GILT.** Nicht gebaut, keine Empfehlung.
    TRIGGER: ein drittes Ziel mit Ereignis-Achse, ODER zwei Ziele mit gleichlautendem
    Kartennamen.

32. **VERMERK AN VORRATS-EINTRAG 20 — DIE URSACHE, NICHT DIE ZAHL.**
    Jener Eintrag hält fest, dass eine Mutations-Vorhersage zu eng war, und ordnet den Fall
    in die Reihe der Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN"
    ein. **MIT SCHEIBE 2 SIND ZWEI WEITERE FÄLLE AUFGETRETEN, BEIDE IN DERSELBEN RICHTUNG**
    (zu eng), beide als DECKUNG und nicht als Kaskade geprüft — die Einzelheiten stehen in
    VERMERK 9 und werden hier nicht verdoppelt.
    **HIER STEHT KEINE FALLZAHL, UND DAS IST ABSICHT:** Eintrag 20 führt bewusst keine, die
    Regel selbst führt eine datierte, und eine dritte Zahl daneben würde bei jedem Zuwachs
    neu falsch — dieselbe Bauform, die in dieser Datei mehrfach protokolliert
    kaputtgegangen ist.
    **WAS NEU IST UND DEN VERMERK RECHTFERTIGT: DIE URSACHE IST ERSTMALS BENENNBAR.** Sie
    ist nicht Unachtsamkeit, sondern eine übernommene Vorhersage über einen INZWISCHEN
    GEWACHSENEN Testbestand. Der Hebungs-Kandidat dazu steht unten.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: derselbe wie bei Eintrag 20 — die nächste Hebung an docs/immer-beachten.md,
    die jene Regel ohnehin berührt.

33. **DAS INSTRUMENT ZUM AUFFINDEN EINES NUL-BYTES IST EIN ANDERES ALS DAS ZUM SUCHEN
    DARIN — UND DIE EINE HÄLFTE DIESES EINTRAGS STEHT SCHON IN docs/immer-beachten.md.**
    **DIE ERSTE HÄLFTE IST BESTÄTIGUNG, NICHT BEFUND, UND DAS STEHT ZUERST:** Dass `grep`
    OHNE `-a` bei einer Datei mit NUL-Byte "Binary file … matches" meldet **STATT** der
    Trefferzeilen — und die Datei damit still aus jeder Achse fällt —, steht bereits in
    docs/immer-beachten.md, in der Regel "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG
    STILL DAS CR", Absatz "DIE GEGENRICHTUNG GEHÖRT DAZU", dort mit derselben Fundstelle
    (`src/lib/mappings.ts`) und GEMESSEN am 2026-08-13. **ERNEUT GEMESSEN (CC, 2026-09-01):**
    Die Datei trägt **genau ein** NUL-Byte (`tr -dc '\000' < … | wc -c` → 1); `grep -na` findet
    darin `isValidRedirectUrl` in Zeile 44, `grep -n` meldet stattdessen die Binärzeile.
    **DIE ZWEITE HÄLFTE IST NEU UND IST DER EIGENTLICHE INHALT DIESES EINTRAGS: DAS
    NAHELIEGENDE SUCHINSTRUMENT FINDET DIE DATEI GAR NICHT.** Ein Lauf über `src/` mit
    `grep -qP '\x00'` je Datei lieferte **NULL** Treffer; derselbe Lauf mit
    `tr -dc '\000' | wc -c` fand `src/lib/mappings.ts`. GEMESSEN (CC, 2026-09-01), beide
    Läufe im selben Durchgang, derselbe Suchraum.
    **WARUM DAS TEUER IST:** Die Abwesenheit war vom WERKZEUG erzeugt, nicht vom Gegenstand —
    genau die Klasse, die docs/immer-beachten.md als "EINE ABWESENHEIT KANN VOM WERKZEUG
    ERZEUGT SEIN, NICHT VOM GEGENSTAND" führt. Ohne den zweiten Griff wäre "im Repo liegt kein
    NUL-Byte" als Befund protokolliert worden, **mit benannter Reichweite, sauber ausgewiesen
    und trotzdem falsch**.
    **DER VORSCHLAG — UND ER IST EIN VORSCHLAG, KEINE ENTSCHEIDUNG:** Ein **ABSATZ** an der
    bestehenden Werkzeug-Regel, nicht ein eigener. Zwei Gründe: Die erste Hälfte steht dort
    schon und würde als eigener Eintrag ein zweites Mal behauptet; und der neue Teil ist die
    **Vervollständigung** desselben Befundes — er sagt, WOMIT man die Datei findet, die jener
    Absatz beschreibt.
    **DIE GEGENREDE GEHÖRT DAZU:** Die 11.8er-Regel oben ist die sachlich nähere (sie handelt
    von der werkzeug-erzeugten ABWESENHEIT), und ein Absatz an der sed-Regel legte den Befund
    an die entferntere. **NICHT ENTSCHIEDEN**, an welcher der beiden er landet.
    **DER BEZUG ZU HEBUNGS-KANDIDAT 6 GEHÖRT MIT:** Jener stellt dieselbe Ablage-Frage für die
    Byte-Kontrolle (`tr` gegen `grep -c $'\r'`) und lässt sie ebenfalls offen. **Wer einen von
    beiden hebt, liest den anderen mit** — es ist dieselbe Werkzeug-Achse, und zwei getrennt
    getroffene Entscheidungen darüber liefen auseinander.
    GEMELDET 2026-09-01, NICHT GEBAUT.

34. **EIN ZEILENWEISER KOMMENTAR-FILTER IST BEI MEHRZEILIGEN BLÖCKEN UNTAUGLICH.**
    Er erkennt einen Kommentar an seinem **ZEILENANFANG**. Die Fortsetzungszeilen eines
    `{/* … */}`-Blocks beginnen mit **Fliesstext** und zählen deshalb als Code — ein Vergleich
    zweier Fassungen "ohne Kommentare" meldet dann eine Code-Änderung, die es nicht gibt, oder
    verdeckt eine, die es gibt.
    **DER ERSATZ:** beide Fassungen **OHNE Kommentare** vergleichen — also den Kommentar
    entfernen statt die Zeile zu übergehen —, **mit einer künstlichen Code-Änderung als
    POSITIVKONTROLLE**. Ohne die Positivkontrolle ist ein leerer Vergleich nicht von einem
    kaputten Vergleich zu unterscheiden; es ist der Fall der Lektion (d) an "MUTATIONSPROBEN
    UND LIVE-TEST-INSTRUMENTE" (docs/immer-beachten.md), nur am Diff statt am Test.
    **WARUM DER EINTRAG ÜBERHAUPT NÖTIG IST — DAS IST SEIN GANZER ZWECK:** Der Befund ist
    bisher **NUR in der Commit-Botschaft von `3efa01b` verwahrt**. Eine Commit-Botschaft wird
    nicht gelesen, wenn jemand das nächste Mal zwei Fassungen vergleicht; sie ist ein
    Zeitdokument und kein Nachschlagewerk. **Ohne diesen Eintrag wird dasselbe Instrument
    wieder gebaut und liefert wieder eine falsche Auskunft.**
    GEMELDET 2026-09-01, NICHT GEBAUT. KEINE EMPFEHLUNG, ob daraus eine Regel wird.

35. **DER KOMMENTARKOPF VON `schedulePersist` DECKT DEN CODE NICHT.**
    **GEMESSEN am Code (CC, 2026-09-01):** Der Kopf von `schedulePersist`
    (src/lib/capi/ingest.ts) sagt, sein `try/catch` sei "die zweite Schicht, falls die
    Registrierung/der Aufruf selbst wirft". **Am Code liegt das `try` INNERHALB des an
    `after()` übergebenen Callbacks**; der Aufruf `after(...)` selbst steht **ungeschützt**, und
    `handleIngest` trägt an dieser Stelle kein umschliessendes `try`. Wirft die Registrierung,
    verlässt der Wurf die Funktion.
    **KEIN TEST DECKT DAS:** Alle sechs `ingest.*.test.ts` mocken `next/server` mit einem
    `after`, das die Callbacks nur einsammelt — **die Registrierung kann dort gar nicht
    werfen.** GEMESSEN am Repo (CC, 2026-09-01).
    **DIES IST EINE AUSSAGE ÜBER DEN KOMMENTAR, NICHT ÜBER DIE EINTRITTSWAHRSCHEINLICHKEIT.**
    Ob der Fall je eintritt, ist nicht erhoben und wird hier nicht behauptet. Es ist der Fall
    der Regel "EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT" (docs/immer-beachten.md):
    Die Selbstbeschreibung ist zu weit, und sie lädt dazu ein, eine Achse für gedeckt zu halten
    und keinen Test dafür zu schreiben.
    **KEIN VORSCHLAG** — weder eine Umschliessung noch eine Kommentar-Korrektur ist hier
    vorgeschlagen.
    GEMELDET 2026-09-01, NICHT GEBAUT.

    **VERMERK 2026-09-03 — DIESER EINTRAG WIRD IN SCHEIBE 1b-2a AUFGENOMMEN. DER TEXT
    DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    Der Zuschnitt steht (s. den Abschnitt "Die Rettung am Beacon — Scheibe 1b-2a des
    Schritts 1b-2 der Scheibe 1b") und führt ihn dort als **DRITTES STÜCK** — sowohl der
    Schutz der Registrierung als auch die Richtigstellung des Kommentarkopfes.
    **DER GRUND FÜR DIE AUFNAHME IST NICHT, DASS DER POSTEN REIF WÄRE, SONDERN WO ER
    LIEGT:** 1b-2a hängt eine **ZWEITE** `after()`-Registrierung an dieselbe Stelle. **Eine
    Scheibe, die eine bekannte Lücke in genau dem Mechanismus stehen lässt, den sie gerade
    benutzt, hat den Scope-Schutz gegen die Sache gewendet, die er schützen soll.**
    **WAS DAMIT ZUR AUFLAGE WIRD:** Der Schutz gilt der NEUEN Registrierung **UND** der
    bestehenden in `schedulePersist` — eine Scheibe, die nur ihre eigene absichert, liesse
    die ältere Lücke als die unauffälligere zurück.
    **DER EINTRAG WIRD NICHT ABGEHAKT.** Er ist gemeldet und aufgenommen, nicht gebaut; sein
    Satz "KEIN VORSCHLAG" bleibt für den Zeitraum bis zum Bau richtig.
    **WAS SEIN "Ob der Fall je eintritt, ist nicht erhoben" ANGEHT:** Es bleibt unerhoben,
    und die Aufnahme ändert daran nichts. Gebaut wird gegen die **fehlende Deckung**, nicht
    gegen eine beobachtete Häufigkeit.
    PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Der Code-Befund ist der
    unveränderte aus dem Eintrag oben, am 2026-09-03 erneut am Code bestätigt (CC).

    **ZWEITER VERMERK 2026-09-03 — VOLLZOGEN MIT SCHEIBE 1b-2a. DER TEXT DARÜBER BLEIBT
    ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **WAS GEBAUT IST:** `scheduleAfter` (src/lib/capi/ingest.ts) umschliesst den
    `after()`-Aufruf und fängt den Wurf bei der **REGISTRIERUNG** — für die NEUE
    Registrierung der Scheibe **UND** für die bestehende in `schedulePersist`. Der `catch`
    **loggt** über `errorName`; ein Wurf verschwindet nicht. **DER KOMMENTARKOPF VON
    `schedulePersist` IST IM SELBEN ZUG RICHTIGGESTELLT** und trägt den Satz, dass er
    diese Deckung behauptet hat, ohne sie zu haben. Bau-Commit `d57d50c`, s. VERMERK 12,
    Abschnitt (a).
    **DER BEFUND DIESES EINTRAGS IST DAMIT NICHT NUR BEHOBEN, SONDERN GEMESSEN:** Die
    Pflicht-Mutation "Schutz der Registrierung ausbauen" hat **genau EINEN** Lauf fallen
    lassen — **H9** in `ingest.refresh.test.ts`, 1 von 1487 — und **alle sechs bestehenden
    `ingest.*.test.ts` blieben grün.** Das ist die Aussage dieses Eintrags ("KEIN TEST
    DECKT DAS", weil die sammelnde `after`-Attrappe nicht werfen kann) **gemessen statt
    hergeleitet**; H9 trägt dafür eine eigene, umschaltbare Attrappe, die wirft.
    **DER EINTRAG WIRD NICHT ABGEHAKT, UND DAS IST DIE BAUFORM DIESER DATEI, KEINE
    UNENTSCHLOSSENHEIT:** Der Vorrat kennt kein Abhaken. Er kennt einen **eigenen
    datierten Absatz UNTER dem unveränderten Eintrag** — so bei Eintrag 15 ("ERLEDIGT AM
    2026-08-29 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN DER MESSUNG") und bei
    Eintrag 7 ("ERLEDIGT AM 2026-08-31"). **Diese Runde folgt ihr.**
    **WARUM DER EINTRAG STEHEN BLEIBT — ZWEI GRÜNDE, und der zweite wiegt schwerer:**
    (1) Seine **MESSUNG** — dass das `try` IM Callback liegt und alle sechs Attrappen die
    Registrierung gar nicht werfen lassen können — ist der Beleg, auf dem der Schutz
    überhaupt ruht. (2) Seine **BLINDHEITS-AUSSAGE über die Attrappen** ist der MASSSTAB
    für jede künftige Frage an dieser Achse: Ein Mechanismus, den alle Tests durch eine
    sammelnde Attrappe ersetzen, ist an ihnen nicht messbar. **Ein gelöschter Eintrag
    nähme beide mit.**
    **WAS SEIN SATZ "KEIN VORSCHLAG" ANGEHT:** Er war für den Zeitraum bis zum Bau
    richtig und ist mit dem Bau abgelaufen — **nicht falsch geworden, sondern
    gegenstandslos.** Und sein "Ob der Fall je eintritt, ist nicht erhoben" gilt
    **unverändert**: Gebaut ist gegen die fehlende Deckung, nicht gegen eine beobachtete
    Häufigkeit; der Live-Test hat **keinen** Registrierungs-Wurf erzeugt.
    PROVENIENZ: der Bau GEMESSEN am Repo (CC, 2026-09-03), die Mutationsprobe am Lauf
    desselben Tages. Dass die Bauform dieser Datei kein Abhaken vorsieht, ist GEMESSEN am
    Dateitext (CC, 2026-09-03; Einträge 7 und 15).

36. **DIE ADAPTER REICHEN EINE KLICK-KENNUNG HEUTE SCHON DURCH — AUF EINER ANDEREN ACHSE ALS
    DER GEMESSENEN.**
    **GEMESSEN am Code (CC, 2026-09-01):** `eventSourceUrl` wird im Beacon-Bau
    (`buildCapiBeaconStatement`, src/lib/tracking/meta.ts) als **`location.href`** gesetzt —
    also die vollständige Adresse **einschliesslich Query-String**. `handleIngest` reicht den
    Rumpf unverändert an `dispatchForward` weiter, und **drei der vier Adapter lesen das Feld**:
    `forwardToMeta` als `event_source_url`, `forwardToPinterest` ebenso,
    `forwardToTiktok` als `page.url`. `forwardToLinkedin` liest es nicht.
    **FOLGE:** Ein `gclid` im Query-String einer gehosteten Kundenseite **reist heute schon
    mit** — an meta, pinterest und tiktok —, **UNBENANNT**, als Bestandteil einer Zeichenkette.
    Das gilt für **jeden** Klick-Parameter eines Werbenetzwerks, nicht nur für Googles.
    **DIE ABGRENZUNG GEHÖRT DAZU UND IST KEIN EINWAND GEGEN DEN BESTEHENDEN BEFUND:** Der
    offene Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (docs/offene-punkte.md,
    Block vom 2026-08-28, Punkt (a)) sagt "KEIN ADAPTER NIMMT HEUTE EINE KLICK-KENNUNG
    ENTGEGEN ODER REICHT EINE DURCH". **Das ist auf der Achse BENANNTER Kennungsfelder
    gemessen** — die dortige Achse nennt `gclid · gbraid · wbraid · fbclid · _fbc · ttclid ·
    li_fat_id — **und dort ist es richtig**: null Treffer in allen vier Adaptern, heute erneut
    bestätigt. **DIESER EINTRAG NENNT EINE ZWEITE ACHSE, KEINE KORREKTUR DER ERSTEN.**
    **OB DIE UNBENANNTE DURCHLEITUNG UNTER DIE DRITTE DATENKLASSE FÄLLT, IST HIER NICHT
    ENTSCHIEDEN.** Es ist eine **OWNER-Frage**, und sie wird in diesem Eintrag ausdrücklich
    nicht beantwortet und nicht vorbereitet.
    **WAS HEUTE GILT UND GEPRÜFT IST — und es ist der Teil, der die Auflage TRANSIT-ONLY auf
    ihren beiden anderen Hälften einlöst:** `persistEvent` (src/lib/analytics/persist.ts)
    schreibt die Kennung **nicht** — es schreibt genau fünf Werte, und keiner trägt sie. Und
    **keiner der 48 console-Aufrufe** im Produktivcode führt sie (GEMESSEN, CC, 2026-08-28,
    im offenen Punkt mit Achse und Positivkontrolle protokolliert; in dieser Runde **nicht**
    neu gezählt).
    GEMELDET 2026-09-01, NICHT GEBAUT. KEINE EMPFEHLUNG.

37. **DER `else`-ZWEIG IN `TargetCard.test.tsx` HAT SEIT SCHEIBE 4 KEINEN FALL MEHR — UND
    DERSELBE GRÜNE LAUF IST DURCH EINEN ANDEREN ZWEIG GRÜN.**
    **GEMESSEN am Repo (CC, 2026-09-01):** Der Lauf "JEDES Ziel: Daten-Seite und Oberflaeche
    sagen dasselbe ueber die Auslieferung" (`src/components/TargetCard.test.tsx`) verzweigt
    dreifach über `hasAdapter(target)` und `card.publicLabel !== undefined`. Seit Scheibe 4
    hat `TARGETS_WITH_ADAPTER` **FÜNF** Mitglieder und `TRACKING_TARGETS` ebenfalls fünf —
    **kein bekanntes Ziel ist mehr ohne Adapter.** Die Zuordnung heute: meta, pinterest,
    tiktok und **google** laufen in den ERSTEN Zweig (Adapter UND öffentliches Feld),
    linkedin in den ZWEITEN (Adapter, kein Feld), **in den `else`-Zweig KEINES.**
    **WAS DAMIT STILL AUFGEHÖRT HAT ZU MESSEN:** Jener Zweig trägt die Zusicherung aus der
    Auflage der Scheibe 11.1a — neben dem Folgenlosigkeits-Hinweis darf keine zweite Meldung
    stehen, die als Grund eine fehlende Kennung nennt — und benennt seine eigene
    Rot-Bedingung: "WIRD ROT, WENN: jemand den hasAdapter-Term in TargetCard entfernt."
    **DIESE BEDINGUNG IST HEUTE UNERFÜLLBAR.** Der Zweig läuft nie, also wird er nie rot.
    **ES IST DIE FEHLERKLASSE "EIN WÄCHTER OHNE GEGENSTAND GEHT AB DA IMMER AUF"**
    (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL",
    Weise (1)) — **und sie ist hier STILL:** Anders als bei einer Schleife, die kein `it()`
    erzeugt, läuft der Test weiter und bleibt grün; nichts zeigt an, dass eine Zusicherung
    aufgehört hat zu greifen.
    **WARUM ES NIEMANDEM AUFGEFALLEN IST — GEMESSEN am Commit:** Der Transport-Commit
    `26caa38` hat `src/components/TargetCard.test.tsx` **nicht angefasst** (neun Dateien, die
    Datei ist nicht darunter). **DIE GLEICHARTIGE STELLE IN `fan-out.test.ts` IST BEHANDELT
    WORDEN** — dort steht der Befund ausgeschrieben im Kommentar, und `W-REST` tritt an die
    Stelle des toten Zweigs. **Der Unterschied zwischen den beiden Stellen ist allein, dass
    die eine im Diff lag und die andere nicht.**
    **DAZU, UND ES IST EINE SELBSTHEILUNG:** **Vorrats-Eintrag 30** hält fest, der
    `never`-Kommentar in derselben Datei sei überholt — er behauptet, TypeScript verenge
    `target` im `else`-Zweig auf `never`, was seit Scheibe 3 (vier gegen fünf Mitglieder)
    falsch war. **MIT SCHEIBE 4 IST DIE AUSSAGE WIEDER WAHR:** `hasAdapter` ist ein
    Typprädikat (`target is TargetWithAdapter`), und die beiden Unionen decken sich wieder.
    **SEINE DATIERUNG HEILT SICH NICHT MIT:** Der Kommentar sagt "seit 11.1f", und das war
    zwischen Scheibe 3 und Scheibe 4 nicht durchgehend wahr. **Die Aussage stimmt, ihre
    Herkunftsangabe nicht.**
    **KEINE EMPFEHLUNG**, weder den Zweig zu entfernen noch ihn durch einen erfundenen
    Zielwert erreichbar zu machen. **Der Zweig ist die Zusicherung für das nächste Ziel ohne
    Empfänger** — dieselbe Erwägung, aus der er in `fan-out.test.ts` stehen geblieben ist.
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: die nächste Runde, die `src/components/TargetCard.test.tsx` ohnehin öffnet —
    dieselbe wie bei Eintrag 30, und beides gehört zusammen erledigt.

38. **DER KOPF DES GOOGLE-ABSCHNITTS IN docs/ziel-befunde.md SAGT "NICHTS IST GEMESSEN" — DAS
    IST SEIT MESSUNG A ÜBERHOLT UND WAR ES SCHON VOR DIESER SCHEIBE.**
    **DER WORTLAUT, GEMESSEN am Dateitext (CC, 2026-09-01):** "**HERKUNFT — ALLES IN DIESEM
    ABSCHNITT IST GELESEN, NICHTS IST GEMESSEN (2026-08-20):** Es ist KEIN Aufruf gegen eine
    Google-Schnittstelle gefahren worden — kein Token beschafft, kein Endpunkt angesprochen,
    keine Fehlerform erhoben."
    **WAS DAGEGEN STEHT:** Vier Messreihen gegen zwei Google-Endpunkte liegen inzwischen IM
    SELBEN ABSCHNITT — Messung A (Teile (bj) bis (bm)), Messung B1 ((bn) bis (bu)), Messung C
    ((bv) bis (bz)) und Messung D ((ca)). Jede von ihnen hat ein Token beschafft, einen
    Endpunkt angesprochen und Fehlerformen erhoben.
    **DIE AUSSAGE IST DATIERT UND DAMIT ALT, NICHT FALSCH** — sie trägt "(2026-08-20)" in
    ihrem eigenen Text und beschreibt den Stand jenes Tages zutreffend. Es ist dieselbe
    Bauform wie bei den Stückzahlen dieser Datei: **wer sie ohne ihr Datum liest, liest sie
    falsch; wer sie überschreibt, nimmt eine Messung mit.**
    **WAS SIE TROTZDEM GEFÄHRLICH MACHT:** Sie steht im **KOPF** des Abschnitts, also an der
    Stelle, die jeder zuerst liest, und sie ist als **HERKUNFT** ausgezeichnet — also als
    Aussage über den ganzen Abschnitt. Ein Leser, der den Pflicht-Stopp befolgt und die Datei
    vor einem Zuschnitt öffnet, nimmt aus dem ersten Absatz mit, dass hier nichts gemessen
    sei, und behandelt (ca) als Doku-Lesung.
    **NICHT GEÄNDERT, UND DAS IST SCOPE UND KEIN URTEIL:** docs/ziel-befunde.md liegt
    ausserhalb des Scopes dieser Runde. **KEINE EMPFEHLUNG**, ob der Kopf einen Vorbehalt
    daneben bekommt, ob er ersetzt wird oder ob es bei der Datierung bleibt.
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: die nächste Runde, die docs/ziel-befunde.md ohnehin öffnet — dieselbe wie bei
    Vorrats-Eintrag 12 und Hebungs-Kandidat 4, und alle drei gehören zusammen erledigt.

39. **CONVERSIONS AUF FOLGESEITEN SIND FÜR GOOGLE HEUTE NICHT MESSBAR — UND DIE NAHELIEGENDE
    ABHILFE IST DURCH TRANSIT-ONLY VERSPERRT.**
    **GEMESSEN LIVE (OWNER, 2026-09-01, Schritt 3 des Live-Tests der Scheibe 4):** Wird die
    gehostete Seite mit einer Klick-Kennung im Query-String aufgerufen und die Conversion erst
    auf einer FOLGESEITE ausgelöst, trägt `location.href` die Klick-Kennung nicht mehr,
    `extractGoogleClickIds` findet nichts, `buildGoogleEvent` verwirft mit `no_click_id`, und
    **es entsteht kein Ereignis.**
    **SACHKORREKTUR 2026-09-02 — ERSETZT, NICHT GESTEMPELT.** Hier stand "über eine echte
    Anzeige aufgerufen". Der Query-String war **von Hand gesetzt** (OWNER-ANGABE 2026-09-02;
    Volltext in VERMERK 10, Abschnitt (b)). **DER BEFUND IST DAVON UNBERÜHRT UND WIRD NICHT
    SCHWÄCHER:** Dass `location.href` nach einem Seitenwechsel den Query-String nicht mehr
    trägt, ist eine **Eigenschaft des Browsers** — sie hängt nicht daran, wer ihn geschrieben
    hat. Korrigiert ist die Herkunft der Eingabe, nicht die Beobachtung.
    **DAS IST KEIN DEFEKT DER SCHEIBE 4**, sondern die Folge der gewählten Gestalt: Der
    OFFLINE CONVERSION IMPORT ruht auf der Klick-Kennung, und "KEINE KLICK-KENNUNG, KEINE
    CONVERSION" ist als Eigenschaft der Gestalt schon in docs/roadmap.md, Eintrag 11.2
    festgehalten. **NEU IST NICHT DIE EIGENSCHAFT, SONDERN IHRE REICHWEITE:** Sie trifft nicht
    nur organischen Traffic und Direktaufrufe, sondern **jeden mehrschrittigen Funnel** — und
    das ist der Regelfall eines Media Buyers, nicht der Sonderfall.
    **DIE ABHILFE IST BENANNT UND VERSPERRT, und dieser Satz ist der eigentliche Inhalt des
    Eintrags:** Eine Kennung über Seitengrenzen zu tragen hiesse, sie zu **SPEICHERN** — in
    einem Cookie, im `sessionStorage`, in einer Serverzeile. **DIE AUFLAGE TRANSIT-ONLY ERLAUBT
    KEINE ABLAGE** (OWNER-ENTSCHEIDUNG 2026-08-28, dritte Datenklasse: "niemals in die
    Datenbank, niemals in ein Log, kein Hashen"; Fundstelle docs/offene-punkte.md,
    "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Block vom 2026-08-28).
    **WER DEN FUNNEL MESSBAR MACHEN WILL, ÖFFNET ALSO DIE DATENKLASSEN-FRAGE ERNEUT** — es ist
    keine Bau-Entscheidung, sondern eine OWNER-Entscheidung über die Reichweite von
    TRANSIT-ONLY. **HIER WIRD SIE NICHT VORBEREITET UND NICHT EMPFOHLEN.**
    **DER BEZUG ZU PHASE 17 GEHÖRT DAZU:** "Phase 17 — Multi-Page-Funnels" steht offen in der
    Roadmap. **Diese Scheibe hat gemessen, dass die beiden Vorhaben kollidieren** — ein
    Multi-Page-Funnel ohne getragene Klick-Kennung erzeugt für Google nichts, und mit ihr
    verlangt er eine Ablage, die heute verboten ist. **Wer Phase 17 zuschneidet, findet die
    Frage hier vor, statt sie neu zu entdecken.**
    **AUSDRÜCKLICH NICHT GESAGT:** dass TRANSIT-ONLY zu eng ist, dass ein Cookie zulässig
    wäre, oder dass ein anderes Ziel dasselbe Problem hätte. **KEINE EMPFEHLUNG.**
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: der Zuschnitt der Phase 17, ODER eine erneute Owner-Befassung mit der dritten
    Datenklasse — je nachdem, was zuerst eintritt.

40. **EINE MESSUNG WURDE MIT AUSGELASSENEM SCHLÜSSELWERT ABGELEGT — UND DER AUSGELASSENE WERT
    WAR DIE EINZIGE EINGABE DES DIAGNOSE-INSTRUMENTS.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-02), zwei unabhängige Suchläufe:** Der
    Erfolgsrumpf des 200er-Aufrufs der Messung D steht in docs/ziel-befunde.md, Teil (ca)/(a),
    als `{ "requestId": "…" }` — **mit drei Punkten an der Stelle des Wertes.** Eine Suche über
    den gesamten Google-Abschnitt nach UUID-artigen Zeichenfolgen findet dort **genau zwei**,
    und **beide sind Beispiele aus der Anbieter-Doku** ((o)/G5), keine eigenen Messwerte. Eine
    zweite, repo-weite Suche über das **gesamte Arbeitsverzeichnis rekursiv, ohne
    Dateityp-Filter**, nach der tatsächlichen Kennung liefert **null Treffer**.
    **Positivkontrolle:** Dieselbe UUID-Achse hat die zwei Doku-Beispiele erreicht, ist also
    nicht leer gelaufen.
    **WARUM DAS ZÄHLT, UND ES IST NICHT DIE ÜBLICHE GEHEIMNIS-FRAGE:** Der Statusabruf über
    `requestStatus:retrieve` nimmt **GENAU EINE** Eingabe — die `requestId` ((x)/G5). **Ohne
    sie ist der einzige Diagnostik-Kanal des Anbieters nicht adressierbar.** Die Doku macht
    daraus selbst eine Auflage: "Record the requestId returned" und "Capture and collect the
    request_id from each … response" ((o)/G5, GELESEN 2026-08-24). Der Wert war am 2026-09-02
    nur noch da, weil der Owner ihn in seinem eigenen Verlauf hatte; **aus dem Repo wäre er
    nicht mehr zu beschaffen gewesen.**
    **EINE `requestId` IST KEIN GEHEIMNIS.** Sie ist ein Vorgangs-Bezeichner ohne
    Zugriffswirkung; die Auslassung war keine Schwärzung, sondern eine Kürzung.
    **DER BEFUND GILT DEM ABLAGE-VERFAHREN, NICHT DIESER EINEN STELLE — und das ist der ganze
    Grund für den Eintrag:** Eine Kürzung mit "…" sieht in einem Protokoll wie Sorgfalt aus.
    Sie ist es dort, wo der Wert ein Geheimnis ist, und sie ist das Gegenteil davon, wo der
    Wert der **einzige Schlüssel zu einer späteren Nachfrage** ist. **Was die beiden Fälle
    trennt, steht heute nirgends.**
    **DIE ABGRENZUNG GEHÖRT ZWINGEND DAZU, SONST WIDERSPRICHT DIESER EINTRAG EINER
    ENTSCHEIDUNG DESSELBEN TAGES.** Am 2026-09-02 sind in docs/ziel-befunde.md, Teil (cb),
    **ZWEI Werte ABSICHTLICH nicht im Klartext abgelegt** worden — die Google-Ads-Kundennummer
    und die Conversion-Type-ID, beide maskiert (ARCHITEKTEN-ENTSCHEIDUNG 2026-09-02). Wer
    diesen Eintrag ohne die Abgrenzung liest, hält das für denselben Fehler.
    **DIE TRENNLINIE IST DIE BESCHAFFBARKEIT, NICHT DIE VERTRAULICHKEIT:**
    · **Eine `requestId` existiert EINMAL UND FLÜCHTIG.** Sie entsteht in einer Antwort, sie
      steht in keiner Oberfläche, und **ist sie einmal nicht aufgeschrieben, ist sie aus KEINER
      Quelle wiederzubeschaffen.** Ihr Verlust kostet das Instrument der nächsten Runde.
    · **Eine Kundennummer steht JEDERZEIT in der Oberfläche des Kontos**, ebenso die
      Conversion-Type-ID. Ihr Fehlen im Repo kostet einen Blick, nicht eine Messung.
    **IN EINEM SATZ: NICHT ABGELEGT WIRD, WAS JEDERZEIT ABLESBAR IST; ABGELEGT WIRD, WAS SONST
    VERSCHWINDET.** Das ist die Regel, die beide Fälle zugleich erklärt — und sie ist etwas
    anderes als "Geheimnisse werden geschwärzt", weil **keiner der drei Werte ein Geheimnis
    ist**.
    **KEINE EMPFEHLUNG** — weder eine Regel noch eine Auflage an künftige Messprotokolle ist
    hier vorgeschlagen, und (ca) ist **nicht** nachträglich befüllt worden.
    GEMELDET 2026-09-02, NICHT GEBAUT.
    PROVENIENZ: die zwei Suchläufe GEMESSEN am Repo (CC, 2026-09-02). Dass der Wert aus dem
    Verlauf des Owners stammt, ist eine **OWNER-ANGABE 2026-09-02**. Die Doku-Auflage ist
    GELESEN (s. (o)/G5).
    TRIGGER: die nächste Messung, deren Antwort einen Bezeichner für eine **spätere** Nachfrage
    trägt.

41. **`INVALID_GCLID` VERDECKT DIE TAG-HYPOTHESE — SIE IST WEDER BESTÄTIGT NOCH WIDERLEGT.**
    **DER VERDACHT VOM 2026-09-01 (OWNER):** Die im Google-Ads-Konto hinterlegte
    Conversion-Aktion könnte **tag-basiert** sein, während Pagesmith **kein Google-Tag
    ausliefert** — die Gestalt-Entscheidung schliesst eines ausdrücklich aus (s. "### (3) Der
    Vorbehalt der Owner-Entscheidung zur Gestalt").
    **WAS MESSUNG E DAZU SAGT — GEMESSEN 2026-09-02 (OWNER), docs/ziel-befunde.md,
    Teil (cb):** **NICHTS.** Die Anfrage vom 2026-09-01 ist mit
    `PROCESSING_ERROR_REASON_INVALID_GCLID` verworfen worden, `errorCounts` trägt **genau
    einen** Eintrag bei **einem** gesendeten Datensatz.
    **DER MECHANISMUS, DER DEN VERDACHT VERDECKT:** Ein Datensatz, dessen Klick-Kennung schon
    verworfen wird, **kommt an einer etwaigen zweiten Prüfung gar nicht erst an**. Ob nach
    einer gültigen Kennung ein ZWEITER Grund käme, ist an dieser Antwort **nicht zu sehen** —
    sie konnte nur einen Grund haben.
    **WER AUS DEM EINEN ZURÜCKGEGEBENEN GRUND SCHLIESST, ES GEBE NUR DIESEN, SCHLIESST AUS
    EINER ANTWORT, DIE NUR EINEN GRUND HABEN KONNTE.** Das ist der Satz, der diesen Eintrag
    trägt, und er ist der Grund, warum er neben Messung E steht statt in ihr aufzugehen: Ein
    erledigt aussehender Verdacht wird nicht wieder aufgenommen.
    **DIE VERBINDUNG ZUR SPERRE, und sie macht den Eintrag unauflösbar-bis-auf-weiteres:**
    Solange auf dem Konto kein echter Anzeigenklick existiert (s. die zweite Sperre in
    "### (1) Der Gegenstand"), **gibt es keine gültige Klick-Kennung**, mit der man die zweite
    Prüfung überhaupt erreichen könnte. **Der Verdacht hängt an derselben Sperre wie der
    Nachweis.**
    **KEINE EMPFEHLUNG**, und ausdrücklich keine Aussage darüber, ob die Conversion-Aktion
    tag-basiert IST — der Zuschnitt der Aktion im Kundenkonto ist **nicht erhoben**.
    GEMELDET 2026-09-02, NICHT GEBAUT.
    PROVENIENZ: Der Fehlergrund GEMESSEN 2026-09-02 (OWNER). Der Verdacht ist eine
    **OWNER-ANGABE 2026-09-01**. Dass der eine den anderen verdeckt, ist eine **FOLGE** aus
    dem Fast-Fail-Verhalten und der Einzahl des `errorCounts`-Eintrags, **keine Messung**.
    TRIGGER: der erste Aufruf mit einer **gültigen** Klick-Kennung — also derselbe wie das
    Fallen der Sperre.

    **ERGÄNZT 2026-09-02 NACH DEM DOKU-LAUF 8 — DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN
    STEHEN UND IST RICHTIG; ER WAR NUR UNVOLLSTÄNDIG.** Zwei Dinge treten hinzu, und das
    zweite ist das schwerere.
    · **DER VERDECKTE ZWEITE GRUND HAT JETZT EINEN ZWEITEN, DOKUMENTIERTEN KANDIDATEN NEBEN
      DER TAG-HYPOTHESE: DIE `UPLOAD_CLICKS`-AUFLAGE.** GELESEN 2026-09-02
      (docs/ziel-befunde.md, Google-Abschnitt, Teil (cc)/(b);
      `/devguides/events/send-events`, Doku-Stand 2026-08-18): "For Google Ads offline
      conversions or enhanced conversions for leads, the productDestinationId must be the ID
      of a Google Ads conversion action with type set to **UPLOAD_CLICKS**."
      **DER EINTRAG NANNTE BISHER NUR EINEN KANDIDATEN.** Es sind zwei, und sie schliessen
      einander nicht aus. **OB DIE SCHNITTSTELLE EINE AKTION FALSCHEN TYPS ÜBERHAUPT ABLEHNT,
      IST UNGEMESSEN** — die Doku sagt "must be", nicht, was bei einem Verstoss geschieht.
    · **DER VERDECKUNGS-MECHANISMUS GREIFT EINE STUFE FRÜHER, ALS DIESER EINTRAG ANNIMMT.**
      Der Text oben sagt, der Datensatz komme "an einer etwaigen zweiten Prüfung gar nicht
      erst an". **Das ist richtig und noch zu schwach:** Unser Fehlergrund ist ein
      **DEKODIER-Fehler**, nicht ein Zuordnungs-Fehler — GELESEN 2026-09-02, Teil (cc)/(a):
      `PROCESSING_ERROR_REASON_INVALID_GCLID` heisst wörtlich "The google click ID could not
      be decoded", während der Zuordnungs-Fehler ein eigener Enum-Wert ist
      (`PROCESSING_ERROR_REASON_INVALID_CLICK`, "The event can't be attributed to a click").
      **EIN DATENSATZ, DESSEN KENNUNG NICHT EINMAL DEKODIERT WERDEN KANN, ERREICHT WEDER DIE
      ZUORDNUNG NOCH EINE PRÜFUNG DER CONVERSION-AKTION.** Verdeckt ist also nicht ein
      zweiter Grund hinter einem ersten, sondern **alles, was hinter der Dekodierung liegt**.
    **WAS SICH DADURCH NICHT ÄNDERT — UND DAS IST DER GRUND, WARUM HIER ERGÄNZT UND NICHT
    ERSETZT WIRD:** Der Eintrag bleibt in seiner Aussage unberührt. Die Tag-Hypothese ist
    weiterhin **weder bestätigt noch widerlegt**, der Satz über die Antwort, die nur einen
    Grund haben konnte, gilt unverändert, und **der TRIGGER bleibt wörtlich stehen**.
    PROVENIENZ: beide Zusätze **GELESEN 2026-09-02** (Doku-Lauf 8, s. Teil (cc)); dass der
    Dekodier-Fehler vor der Zuordnung liegt, ist eine **ABLEITUNG** aus den zwei gelesenen
    Enum-Beschreibungen, **keine Messung**.

42. **DER RESOLVER SCHREIBT BEI TOTEM ZUGANGSDATUM EINE FEHLERZEILE JE BESUCHER,
    UNGEDROSSELT.** GEMESSEN am Code (CC, 2026-09-02): `usableTokenFromRow`
    (src/lib/capi/token.ts, modul-privat) schreibt bei toter Uhr 1
    `console.error("[capi/resolve] secret unusable", …)` mit dem `reason`
    `access_token_expired` und gibt `null` zurück.
    **DER KOMMENTARKOPF DERSELBEN FUNKTION BENENNT DIE LAGE BEREITS SELBST** — "Es gibt KEINE
    Drosselung. Ein Projekt mit kaputtem Chiffrat schreibt eine Zeile PRO BESUCHER" —,
    allerdings am Fall des KAPUTTEN CHIFFRATS; **die tote Uhr 1 liegt auf demselben Weg und
    ist dort nicht genannt.**
    **DIE ZEILE NENNT KEIN PROJEKT.** Sie trägt den Ziel-Namen und einen SELBSTVERGEBENEN
    Grund; die `projectId` fehlt absichtlich, und der Kommentar begründet das mit dem Pfad
    selbst — er läuft bei JEDEM Besucher JEDER Kundenseite, und eine Projekt-Kennung je
    Beacon wäre eine Datenerhebung, die niemand beschlossen hat.
    **WARUM DAS ZÄHLT — IN ZWEI RICHTUNGEN, UND BEIDE GEHÖREN HIN:**
    · **ES IST HEUTE DIE EINZIGE BEOBACHTBARE SIGNATUR DES BRUCHS**, den Scheibe 1b beheben
      soll — also die Live-Test-Achse für 1b. Sie ist eine ANWESENHEIT und keine Abwesenheit,
      anders als der Erfolgsbeleg des Adapters, der nach VERMERK 10, Abschnitt (d), ein
      SCHWEIGEN ist; und sie ist im Wortlaut von allen drei Adapter-Zeilen unterscheidbar.
      **SIE ORDNET SICH ABER KEINEM PRÜFLING ZU**, weil sie kein Projekt nennt — wer mit ihr
      misst, misst über alle Projekte zugleich.
    · **ES IST UNBEGRENZTES SCHREIBEN AUF DEM MEISTGETROFFENEN PFAD DER PLATTFORM.** Nach
      Ablauf der Stunde erzeugt jeder Besucher jeder Seite eines betroffenen Projekts eine
      Fehlerzeile, ohne Zählung und ohne Ende.
    **KEIN VORSCHLAG ZUR DROSSELUNG**, und ausdrücklich auch keiner dazu, ob die `projectId`
    hineingehörte. GEMELDET 2026-09-02, NICHT GEBAUT.
    TRIGGER: der Zuschnitt der Scheibe 1b — er berührt beide Richtungen zugleich.

    **VERMERK 2026-09-03 — TRIGGER EINGETRETEN, UND 1b-1 SCHLIESST DIESEN EINTRAG
    AUSDRÜCKLICH AUS. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK
    TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt diesen Eintrag unter "Was
    ausdrücklich draussen bleibt, je mit seinem Grund".
    **BEIDE RICHTUNGEN BLEIBEN DAMIT OFFEN, UND SIE BLEIBEN ES AUS VERSCHIEDENEN GRÜNDEN:**
    Die **Drosselung** ist nicht Gegenstand der Klammer — sie liegt auf dem Ingest-Pfad, und
    1b-1 hält `src/lib/capi/ingest.ts` und `src/lib/capi/token.ts` ausdrücklich unberührt.
    Die **Live-Test-Achse** wird von der Klammer nicht gebraucht: Der Nachweis von 1b-1
    läuft über die bestehende Beweis-Route, nicht über die Fehlerzeile.
    **WAS DAS FÜR 1b-2 HEISST UND HIER NUR BENANNT WIRD:** Die Zeile bleibt die einzige
    beobachtbare Signatur des Bruchs, den ein Takt beheben soll — **und sie ordnet sich
    weiterhin keinem Prüfling zu**, weil sie kein Projekt nennt.
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT. KEINE EMPFEHLUNG** — weder zur
    Drosselung noch dazu, ob die `projectId` hineingehörte.
    PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
    Existenz des Zuschnitts (CC, 2026-09-03). Der Ausschluss ist ein ARCHITEKTEN-ZUSCHNITT
    vom 2026-09-03, die Zerlegung in zwei Schritte eine ARCHITEKTEN-FESTLEGUNG desselben
    Tages; keine Messung.

    **ZWEITER VERMERK 2026-09-03 — SCHEIBE 1b-2a NIMMT DIESEN EINTRAG EBENFALLS NICHT AUF,
    ABER SIE ÄNDERT SEINEN GEGENSTAND. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN.**
    Der Zuschnitt steht (s. den Abschnitt "Die Rettung am Beacon — Scheibe 1b-2a des
    Schritts 1b-2 der Scheibe 1b") und führt ihn dort unter "Was diese Scheibe ausdrücklich
    nicht baut, je mit Grund".
    **WAS SICH ÄNDERT, IST DIE URSACHE DER ZEILE UND NICHT IHRE HÄUFIGKEIT:** Heute schreibt
    `usableTokenFromRow` sie, sobald das Zugangsdatum tot ist — und tot ist es nach einer
    Stunde ohne Erneuerung, also regelmässig. **NACH 1b-2a BLEIBT ALS URSACHE NUR NOCH DAS
    TOTE ERNEUERUNGS-TOKEN**, denn ein erneuerbarer Zugang wird dann erneuert, statt eine
    Zeile zu erzeugen.
    **UND GENAU DAS MACHT DEN POSTEN NICHT KLEINER, SONDERN ANDERS — der Satz gehört hierher,
    sonst liest die nächste Runde ihn als halb erledigt: EIN TOTES ERNEUERUNGS-TOKEN BEHEBT
    KEIN CODE.** Es verlangt eine Neu-Autorisierung durch den Kunden. Die Fehlerzeile
    beschreibt danach einen Zustand, der **bis zu einer Handlung ausserhalb des Systems
    bestehen bleibt** — sie wird damit seltener, aber JEDE einzelne wiegt schwerer, und
    ungedrosselt ist sie weiterhin.
    **DER EINTRAG BLEIBT OFFEN, WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN TRIGGER
    STEHT WÖRTLICH WIE ZUVOR.** **KEINE EMPFEHLUNG** — weder zur Drosselung noch dazu, ob
    die `projectId` hineingehörte.
    PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Dass nach 1b-2a nur noch das
    tote Erneuerungs-Token als Ursache bleibt, ist eine **ABLEITUNG** aus den vier Lagen
    jenes Zuschnitts, **keine Messung** — gebaut ist nichts.

    **DRITTER VERMERK 2026-09-03 — DIE ZEILE VERSCHWINDET NICHT, SIE WIRD SELTEN. DIE
    ABLEITUNG DES ZWEITEN VERMERKS WAR ZU WEIT, UND DAS WIRD HIER RICHTIGGESTELLT STATT
    GESTEMPELT.** Der Text darüber bleibt ZEICHEN FÜR ZEICHEN stehen; überholt ist eine
    ABLEITUNG, die dort ausdrücklich als solche gekennzeichnet ist.
    **WAS DER ZWEITE VERMERK SAGTE:** "NACH 1b-2a BLEIBT ALS URSACHE NUR NOCH DAS TOTE
    ERNEUERUNGS-TOKEN, denn ein erneuerbarer Zugang wird dann erneuert, statt eine Zeile zu
    erzeugen."
    **WAS AM GEBAUTEN CODE GILT (GEMESSEN, CC, 2026-09-03, und LIVE bestätigt, OWNER,
    2026-09-03 — s. VERMERK 12, Abschnitte (b) bis (d)): DER `console.error` STEHT VOR DER
    VERZWEIGUNG UND WIRD IN BEIDEN FÄLLEN GESCHRIEBEN.** Ein erneuerbarer Zugang wird
    erneuert **UND** erzeugt die Zeile. Was die Fälle trennt, ist allein der `reason`.
    **DREI URSACHEN STATT EINER, und sie sind verschieden schwer:**
    · **`access_token_expired` — DIE RETTUNG GREIFT.** Ein NORMALVORGANG. Er tritt je
      Projekt und Stunde höchstens einmal auf, nicht mehr je Besucher; **das ist die
      Verbesserung, und sie ist real.**
    · **`refresh_token_expired` — ECHTER AUSFALL**, den kein Code behebt. Er verlangt eine
      Neu-Autorisierung durch den Kunden und bleibt bis dahin bestehen.
    · **DER BESTÄTIGUNGS-BEACON ERZEUGT SIE AUCH IM ERFOLGSFALL.** Er durchläuft den
      Resolver, sieht den alten Token und kehrt VOR dem Forward-Zweig zurück — er rettet
      nicht. **Ein Conversion-Beacon-PAAR hinterlässt damit auch bei geglückter Rettung
      eine Fehlerzeile.** ABLEITUNG aus dem Kontrollfluss; am Log ist nicht entscheidbar,
      welche der zwei Zeilen um 16:47:07 von ihm stammte.
    **WAS SICH NICHT ÄNDERT UND WAS SCHLIMMER GEWORDEN IST:** Die Zeile ist **seltener**
    geworden — sie hängt nicht mehr an jedem Besucher einer abgelaufenen Stunde.
    **UNGEDROSSELT IST SIE WEITERHIN**, und der Fall, in dem sie es am teuersten ist, ist
    **derselbe geblieben**: ein Ziel mit lebender Uhr 2 und dauerhaft scheiternder
    Erneuerung schreibt sie je Beacon — und ruft dabei zusätzlich je Beacon den Anbieter.
    **DIE ZWEITE RICHTUNG DES EINTRAGS — die Live-Test-Achse — HAT SICH DAMIT VERSCHOBEN:**
    Die Zeile ist **nicht mehr die Signatur des Bruchs**, sie ist ab jetzt die Signatur
    **eines von drei Zuständen**. **Wer mit ihr misst, misst die Anwesenheit eines
    Wortes, nicht mehr die eines Defekts.** Der Live-Nachweis der Scheibe 1b-2a ist genau
    deshalb NICHT über sie geführt worden, sondern über den FOLGENDEN Beacon (VERMERK 12,
    Abschnitt (c)).
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN TRIGGER STEHT WÖRTLICH
    WIE ZUVOR. KEINE EMPFEHLUNG** — weder zur Drosselung noch dazu, ob die `projectId`
    hineingehörte.
    **DIE MEHRDEUTIGKEIT SELBST IST EIN EIGENER POSTEN GEWORDEN**, weil sie eine andere
    Frage stellt als dieser Eintrag: nicht "wie oft", sondern "was bedeutet sie".
    PROVENIENZ: der Code-Befund GEMESSEN (CC, 2026-09-03); die drei Ursachen sind eine
    **ABLEITUNG** aus dem Kontrollfluss, gestützt auf die Live-Beobachtungen vom
    2026-09-03 (OWNER). **Keine Messung der Häufigkeit** — sie ist nicht erhoben.

43. **"STUMM" GILT FÜR DIE OBERFLÄCHE, NICHT FÜR DEN BETRIEB.** Diese Datei sagt an ZWEI
    Stellen, der Ausfall nach Ablauf des Zugangsdatums sei "in ihrer stummen Form" —
    Festlegung (4) des Zuschnitts der Scheibe 4 und VERMERK 10, Abschnitt (g). **BEIDE
    BLEIBEN RICHTIG UND SIND DESHALB ERGÄNZT UND NICHT ERSETZT WORDEN;** zu eng ist nicht die
    Aussage, sondern ihr Geltungsbereich.
    GEMESSEN am Code (CC, 2026-09-02):
    · **DIE OBERFLÄCHE SCHWEIGT WIRKLICH.** `listConfiguredTargets`
      (src/app/projects/actions.ts) selektiert aus `project_secrets` ausschliesslich
      `target` — kein `secret_enc`, keine Uhr. Die Karte sagt "Zugangsdaten hinterlegt",
      solange die Zeile existiert, unabhängig von jedem Ablauf.
    · **DAS SERVER-LOG SCHWEIGT NICHT.** S. Vorrats-Eintrag 42; hier nicht verdoppelt.
    **WARUM DIE UNTERSCHEIDUNG FÜR EINEN ZUSCHNITT ZÄHLT:** Aus "stumm" folgt sonst, es gebe
    nichts zu beobachten — und damit keine Live-Test-Achse. **Die gibt es.**
    GEMELDET 2026-09-02, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: der Zuschnitt der Scheibe 1b, ODER jede Arbeit, die eine Anzeige des
    Ablauf-Zustands in der Oberfläche berührt.

44. **DIE BEWEIS-ROUTE HAT KEINEN AUFRUFER IN DER ANWENDUNG.** Diese Datei sagt an zwei
    Stellen "nach einem Druck auf die Beweis-Route" (Festlegung (4) des Zuschnitts der
    Scheibe 4 und VERMERK 10, Abschnitt (g)).
    GEMESSEN am Repo (CC, 2026-09-02; Achse: formale Suche über `src/` nach "oauth/google"
    ausserhalb von `src/app/api/oauth/`, dazu eine Suche nach "fetch" in `src/components/`;
    POSITIVKONTROLLE: dieselbe Suche findet den Verbinden-Weg): **Es gibt kein Bedienelement,
    das `/api/oauth/google/refresh` ruft.** Der einzige Oberflächen-Bezug zu einer
    Google-OAuth-Route steht in `src/components/TargetCard.tsx` und ruft
    `/api/oauth/google/start` — der Knopf "Google verbinden" bzw. "Google neu verbinden".
    **ES IST KEIN WIDERSPRUCH, SONDERN EINE ZU WEICHE FORMULIERUNG — UND DIESELBE DATEI KENNT
    DIE SACHE GENAUER:** Entscheidung **P3** (s. "Die Entscheidungen vom 2026-08-29") sagt
    wörtlich "DER PREIS IST BENANNT: Der Live-Test braucht einen `fetch` aus der eingeloggten
    Anwendung statt einer URL-Eingabe." **ZWEI STELLEN, ZWEI GENAUIGKEITEN; BEIM ZUSCHNITT
    ZÄHLT DIE GENAUERE.**
    **WAS AM CODE TRÄGT:** Die Stunde beginnt in der Praxis mit dem Verbinden bzw.
    Neu-Verbinden; die zweite genannte Quelle ist nur VON HAND erreichbar. **UND FÜR EINEN
    MASCHINELLEN AUFRUFER IST SIE GAR NICHT ERREICHBAR** — s. Vorbedingung (v) im Abschnitt
    "1b als Folgetask".
    GEMELDET 2026-09-02, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob ein Bedienelement entstehen
    sollte.
    TRIGGER: der Zuschnitt der Scheibe 1b, ODER die erste Arbeit, die den Ablauf-Zustand in
    der Oberfläche sichtbar macht.

    **VERMERK 2026-09-03 — DER ERSTE TRIGGER IST EINGETRETEN, UND 1b-1 SCHLIESST DIESEN
    EINTRAG AUSDRÜCKLICH AUS. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER
    VERMERK TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt diesen Eintrag unter "Was
    ausdrücklich draussen bleibt, je mit seinem Grund".
    **DIE BEWEIS-ROUTE BEKOMMT KEIN BEDIENELEMENT.** 1b-1 verdrahtet sie auf die Klammer um
    und macht sich damit demobar; **die Live-Test-Achse bleibt der `fetch` aus dem
    eingeloggten Tab** — der Preis, den Entscheidung P3 benannt hat. **ES ENTSTEHT KEIN
    NEUER ZUGANG:** Es kommt kein Pfad hinzu, es wechselt nur, was hinter dem bestehenden
    liegt.
    **DER BEFUND DIESES EINTRAGS GILT DAMIT UNVERÄNDERT WEITER:** Auch nach 1b-1 gibt es
    kein Bedienelement, das die Route ruft, und für einen maschinellen Aufrufer ist sie
    unverändert nicht erreichbar (Vorbedingung (v) im Abschnitt "1b als Folgetask", die dort
    1b-2 bindet).
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN ZWEITER TRIGGER IST
    UNBERÜHRT** — die erste Arbeit, die den Ablauf-Zustand in der Oberfläche sichtbar macht,
    steht aus. **KEINE EMPFEHLUNG.**
    PROVENIENZ: Dass der erste Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut
    und der Existenz des Zuschnitts (CC, 2026-09-03). Der Ausschluss ist ein
    ARCHITEKTEN-ZUSCHNITT vom 2026-09-03, die Zerlegung in zwei Schritte eine
    ARCHITEKTEN-FESTLEGUNG desselben Tages; keine Messung.

45. **DER BEREICH "VERÖFFENTLICHEN" FÜHRT BEI EINEM PROJEKT MIT VERBUNDENER CUSTOM-DOMAIN
    NUR DIE LABEL-URL, NICHT DIE CUSTOM-DOMAIN.**
    **ES IST KEIN SERVING-FEHLER, UND DIESER SATZ STEHT ZUERST:** Beide Adressen
    funktionieren. Die Seite ist unter der Label-URL **und** unter der Custom-Domain
    erreichbar; es geht nichts verloren und nichts 404t.
    **DER SCHADEN LIEGT IN DER ANZEIGE:** Wer die Live-Adresse von dort kopiert, **nimmt die
    falsche** — er trägt eine Adresse in eine Anzeige, in eine Übergabe oder in ein
    Dokument, die nicht die ist, unter der die Seite laufen soll.
    **PROVENIENZ: OWNER-BEOBACHTUNG 2026-09-02. NICHT GEMESSEN, NICHT AM CODE GEPRÜFT.** Es
    ist weder erhoben, welche Stelle die angezeigte Adresse baut, noch ob die Beobachtung
    für jedes Projekt mit Custom-Domain gilt oder nur für das beobachtete. **Wer sie
    aufgreift, misst sie zuerst.**
    GEMELDET 2026-09-03, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder dazu, welche der beiden
    Adressen führen sollte, noch dazu, ob beide zu zeigen wären.
    TRIGGER: die nächste Arbeit am Bereich "Veröffentlichen".

46. **DIE NUTZLAST VON HANDAUFRUF 3 DER MESSUNG D IST NUR RELATIONAL PROTOKOLLIERT — VIER
    FELDER SIND NICHT AUFLÖSBAR.**
    **DER BEFUND:** Das Protokoll beschreibt Aufruf 3 als "sonst zeichengleich zu 3" und
    Aufruf 3 seinerseits über Aufruf 2. **Eine Kette aus Verweisen endet damit nicht bei
    einem Wert**, und vier Felder der gesendeten Nutzlast lassen sich heute nicht mehr
    bestimmen.
    **ES IST DIESELBE KLASSE WIE VORRATS-EINTRAG 40, und darin liegt der Grund für diesen
    Eintrag: EIN PROTOKOLL, DAS AUF EINEN VORGÄNGER ZEIGT STATT SEINEN GEGENSTAND ZU NENNEN,
    IST NICHT WIEDERVERWENDBAR.** Jener Eintrag hält denselben Mechanismus an einer
    ausgelassenen `requestId` fest — dort fehlt der Wert, hier steht an seiner Stelle ein
    Zeiger. **Der Ausgang ist derselbe: Die Messung ist nicht nachzubauen, und ihre Aussage
    ist an keinem Feld nachzuprüfen.**
    **PROVENIENZ: OWNER-BEOBACHTUNG 2026-09-02. NICHT GEMESSEN, NICHT AM CODE GEPRÜFT.** Es
    ist in dieser Runde **kein** Abgleich am Dateitext gefahren worden — weder darüber,
    welche vier Felder es sind, noch darüber, wie viele Aufrufe der Messung D relational
    beschrieben sind. **Wer den Eintrag aufgreift, erhebt beides zuerst.**
    GEMELDET 2026-09-03, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder eine Auflage an künftige
    Messprotokolle noch eine nachträgliche Befüllung ist hier vorgeschlagen.
    TRIGGER: die nächste Messung mit einem Bezeichner für eine spätere Nachfrage.

47. **DAS TOKEN "1b" IST IM REPO NICHT EINDEUTIG — ZWEI NUMMERIERUNGEN TEILEN DIE KÜRZEL
    1a, 1b UND 1c.**
    Neben dem Schnitt der Phase 11.2 führt `docs/claude-history/future-roadmap.md` unter
    **Säule 1** eine EIGENE Aufzählung — **(1a)** llms.txt · **(1b)** Schema.org/JSON-LD ·
    **(1c)** Zwischenschritt (manuelle JSON-LD-Injektion) —, und `docs/roadmap.md` zitiert
    daraus. **ES SIND DREI KOLLIDIERENDE KÜRZEL, NICHT NUR DAS EINE, NACH DEM GESUCHT
    WURDE.**
    **WAS HEUTE TRÄGT UND WARUM DAS KEIN ZUFALL BLEIBEN DARF: EINDEUTIG WIRD DIE ANGABE
    ALLEIN DURCH DAS WORT DAVOR.** "Scheibe 1b" bzw. "Schritt 1b-1" trifft; **das nackte
    "1b" trifft beide Nummerierungen.** Wer den Suffix- und Präfix-Gebrauch für Kosmetik
    hält und ihn beim nächsten Aufräumen kürzt, **erzeugt die Mehrdeutigkeit, die es heute
    nicht gibt.**
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob eine der beiden Nummerierungen
    umbenannt wird — die fremde liegt in einem ARCHIV und in der ROADMAP, und beide sind
    ausserhalb jedes heutigen Scopes.
    TRIGGER: die nächste Arbeit an Säule 1 der Zukunfts-Roadmap, ODER die erste Umbenennung
    an einer der beiden Nummerierungen.
    PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-03; Achse: rekursive Suche über `*.md`,
    `*.ts` und `*.tsx`, binärsicher, mit Positivkontrolle über die 22 `11.1c`-Treffer).
    Dass die Kollision heute folgenlos ist, ist eine ABLEITUNG aus dem Sprachgebrauch, keine
    zweite Messung.

48. **DIE FEHLERZEILE IST MEHRDEUTIG GEWORDEN — DERSELBE WORTLAUT UND DIESELBE LOG-EBENE
    TRAGEN JETZT ZWEI ZUSTÄNDE.**
    **GEMESSEN am Code (CC, 2026-09-03), LIVE bestätigt (OWNER, 2026-09-03):**
    `usableTokenFromRow` (src/lib/capi/token.ts) schreibt bei toter Uhr 1 unverändert
    `console.error("[capi/resolve] secret unusable", …)`. **Der Aufruf steht VOR der
    Verzweigung und wird in BEIDEN Fällen geschrieben;** was sie trennt, ist allein der
    `reason`:
    · **`access_token_expired` IST EIN NORMALVORGANG.** Uhr 2 lebt, das Ziel landet in
      `renewable`, **die Rettung greift** — und die Conversion geht hinaus.
    · **`refresh_token_expired` IST EIN ECHTER AUSFALL.** Uhr 2 ist überschritten, es gibt
      keinen Weg zurück ausser einer **Neu-Autorisierung durch den Kunden**. **KEIN CODE
      BEHEBT DAS.**
    **DIE SCHEIBE HAT DIE ZEILE SELTENER GEMACHT UND IHRE BEDEUTUNG MEHRDEUTIG.** Das ist
    kein Widerspruch, sondern der ganze Posten: Vor 1b-2a bezeichnete sie **nur** den
    Bruch, und `console.error` war dafür die richtige Ebene. **Jetzt bezeichnet sie ihn in
    der Hälfte der Fälle** — in der anderen Hälfte bezeichnet sie einen Vorgang, der
    funktioniert hat.
    **DER SCHADEN IST EINE GEWÖHNUNG, KEIN DEFEKT — und darin liegt seine Tücke:** Wer die
    Zeile regelmässig sieht und regelmässig feststellt, dass alles läuft, hört auf, den
    `reason` zu lesen. **Dann steht der echte Ausfall im selben Gewand da wie der
    Normalvorgang.**
    **EINE DRITTE QUELLE KOMMT DAZU UND MACHT DIE GEWÖHNUNG WAHRSCHEINLICHER:** Der
    Bestätigungs-Beacon erzeugt die Zeile **auch im Erfolgsfall** (VERMERK 12, Abschnitt
    (d)) — ein Conversion-Beacon-Paar hinterlässt sie also selbst dann, wenn die Rettung
    geglückt ist.
    **KEINE EMPFEHLUNG zur Log-Ebene oder zum Wortlaut.** Weder eine Herabstufung des
    Normalfalls auf `console.info` noch eine Umbenennung noch eine zweite Zeile ist hier
    vorgeschlagen — jede davon berührt den meistgetroffenen Pfad der Plattform und ist eine
    eigene Entscheidung.
    **DIE ABGRENZUNG ZU VORRATS-EINTRAG 42 GEHÖRT DAZU, sonst liest die nächste Runde zwei
    Fassungen derselben Sache:** Jener fragt **WIE OFT** die Zeile entsteht (ungedrosselt,
    je Besucher) und führt sie als Live-Test-Achse. **Dieser fragt, WAS SIE BEDEUTET.**
    Zwei verschiedene Fragen an derselben Zeile; 42 trägt seit dem 2026-09-03 einen
    Vermerk, der die Verschiebung seiner zweiten Richtung festhält.
    GEMELDET 2026-09-03, NICHT GEBAUT.
    TRIGGER, wörtlich vom Owner: **sobald Logs überflogen statt gelesen werden** — dann
    wird aus einer harmlosen Gewöhnung eine übersehene Neu-Autorisierung.
    PROVENIENZ: **OWNER-BEOBACHTUNG und ARCHITEKTEN-EINORDNUNG 2026-09-03**, am Code
    bestätigt (CC, 2026-09-03). Die Häufigkeit der beiden Fälle ist **nicht erhoben**.

49. **DIE BENENNUNG EINES TESTLAUFS IST WEITER ALS DIE SACHE — "PageView rettet nicht,
    sorgt aber vor".**
    Der Lauf **H7** in `src/lib/capi/ingest.refresh.test.ts` trägt diesen Namen. **DER LAUF
    SELBST IST RICHTIG** und misst, was er messen soll: Ein nicht forwardbares Ereignis löst
    **keine** Rettung aus, wohl aber die Vorsorge.
    **SEIN NAME BEHAUPTET MEHR, ALS BEI TOTEM TOKEN GESCHIEHT.** "Erneuerbar, tot" landet in
    `rettbar`, und `rettbar` wird **ausschliesslich innerhalb der Forward-Wache**
    abgearbeitet — also hinter `isForwardable`. **Ein Projekt, das nur Pageviews erzeugt,
    wird weder gerettet noch vorgesorgt**; vorgesorgt wird **nur im Vorlauf-Band eines
    lebenden Zugangsdatums**. Der Name legt eine Vorsorge nahe, die in genau dem Fall
    ausbleibt, den der Lauf im Titel führt.
    **ES IST KEIN DEFEKT, UND DER GRUND GEHÖRT DAZU, sonst wird der Eintrag grösser gelesen
    als er ist:** Es steht dabei **keine Conversion auf dem Spiel** — ein Pageview forwardet
    ohnehin nicht —, und **die erste Conversion rettet**. Der Zustand kostet nichts, was
    jemand vermissen könnte. **Volltext der Einordnung: VERMERK 12, Abschnitt (d).**
    **WARUM DAS ÜBERHAUPT EIN POSTEN IST:** Ein Testname wird gelesen, wenn niemand den
    Testkörper liest — beim Überfliegen einer Suite, beim Suchen nach Abdeckung, beim
    Streichen vermeintlich redundanter Läufe. **Eine zu weite Selbstbeschreibung lädt dazu
    ein, eine Achse für gedeckt zu halten und keinen Test dafür zu schreiben**
    (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL", die
    vierte Weise: der Testkommentar behauptet eine Garantie, die sein Test nicht deckt).
    **HIER IST ES DER NAME STATT DES KOMMENTARS — dieselbe Achse, eine Stelle davor.**
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, wie der Lauf heissen sollte, und
    ausdrücklich keine, den Zuschnitt zu ändern.
    TRIGGER: die nächste Arbeit an `src/lib/capi/ingest.refresh.test.ts`.
    PROVENIENZ: GEMESSEN am Code (CC, 2026-09-03); die Einordnung ist eine
    ARCHITEKTEN-BEOBACHTUNG desselben Tages.

50. **STIRBT DAS ERNEUERUNGS-TOKEN, IST DER AUSFALL FÜR NIEMANDEN SICHTBAR.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-03):** Die Oberfläche sagt weiterhin
    "Zugangsdaten hinterlegt": `listConfiguredTargets` (src/app/projects/actions.ts)
    selektiert aus `project_secrets` ausschliesslich `target` — **keine Uhr, kein
    `secret_enc`** (dieselbe Messung wie in Vorrats-Eintrag 43). Die Seite läuft, und
    **die Conversions verschwinden still.**
    **DER EINZIGE ORT, AN DEM DER ZUSTAND HEUTE ERSCHEINT, IST EINE LOGZEILE** —
    `[capi/resolve] secret unusable` mit dem `reason` `refresh_token_expired`
    (`usableTokenFromRow`, src/lib/capi/token.ts). **Die sieht kein Kunde, und der
    Betreiber muss sie SUCHEN.**

    **DER VORSCHLAG KOMMT VOM OWNER (2026-09-03) UND IST HIER ABGELEGT, NICHT
    ZUGESCHNITTEN:** eine Anzeige im Dashboard, die den Kunden zur Neu-Autorisierung
    auffordert.

    **ER ZERFÄLLT IN ZWEI DINGE MIT SEHR UNTERSCHIEDLICHEM PREIS, UND DIESE TRENNUNG IST
    DER EIGENTLICHE INHALT DIESES EINTRAGS** — wer sie nicht mitliest, schneidet beide
    als eine Arbeit zu und bezahlt für die billigere den Preis der teureren:
    · **DIE AUSFALLMELDUNG ("die Verbindung ist tot") IST DIE BILLIGERE.** Der Zustand
      wird **HEUTE SCHON ERKANNT**: `hasLiveRefreshToken` (ebenda, modul-privat) trifft
      die Unterscheidung an **genau einer Stelle** — GEMESSEN am Repo (CC, 2026-09-03):
      eine Definition, ein Aufrufer —, und der Resolver schreibt bereits eine Zeile mit
      `refresh_token_expired`. **WAS FEHLT, IST EIN WEG VON DORT IN DIE OBERFLÄCHE.**
    · **UND DER RESOLVER DARF IHN NICHT SELBST GEHEN.** Er führt die `projectId`
      **bewusst nicht** — Invariante **(I-4)** der Scheibe 1b-2a, und der Grund steht am
      Kopf von `usableTokenFromRow`: Dieser Pfad läuft bei JEDEM Besucher JEDER
      Kundenseite, und eine Projekt-Kennung je Beacon wäre eine Datenerhebung, die
      niemand beschlossen hat. GEMESSEN (CC, 2026-09-03): **keine** der Logzeilen des
      Resolvers trägt eine. **Ein Zuschnitt, der den Weg über den Resolver nimmt, bricht
      diese Invariante — und zwar an der teuersten Stelle des Systems.**
    · **DIE VORWARNUNG ("läuft in drei Tagen ab") IST DIE TEURERE.** Sie braucht den
      **Ablaufzeitpunkt**, und der steckt im Chiffrat: **keine Spalte, keine
      SQL-Abfrage, die Datenbank hat den Schlüssel nicht.** GEMESSEN am Repo (CC,
      2026-09-03): Keine Migration legt eine Ablauf-Spalte auf `project_secrets` an.
      **SIE HÄNGT DAMIT AN DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
      AUSLÖSER** — Befund (1) des Zuschnitts zu Schritt 1b-1, "DER ABLAUFZEITPUNKT
      STECKT IM CHIFFRAT, IN KEINER SPALTE". Dass es dieselbe Frage ist, ist eine
      **ABLEITUNG** aus jenem Befund und keine Messung.

    **DIE VORBEDINGUNG, DIE JEDER ZUSCHNITT DER VORWARNUNG ZUERST BEANTWORTEN MUSS —
    UNGEMESSEN:** Ob Google nach dem Statuswechsel auf "In Produktion" überhaupt noch
    einen Ablaufzeitpunkt für das Erneuerungs-Token mitliefert. **Der Zeiger steht in
    docs/ziel-befunde.md, Teil (bx)**, und er ist dort ausdrücklich offen gelassen: Beide
    Erklärungen tragen die Beobachtung gleich gut, und "WER SIE TRENNEN WILL, BRAUCHT
    DIESELBE MESSUNG NACH DER VERIFIZIERUNG."
    **OHNE IHN KANN KEINE ANZEIGE VORHERSAGEN, DASS ETWAS AUSLÄUFT — sie kann nur melden,
    dass es bereits kaputt ist.** Wer die Vorwarnung ohne diese Messung zuschneidet, baut
    eine Anzeige, die im Produktivbetrieb **keine Datengrundlage** hat.

    **WAS ZUR LEBENSDAUER BEKANNT IST, JE MIT PROVENIENZ UND NICHT VERMISCHT:**
    · **GEMESSEN:** Im Publishing-Status "Testing" lebt das Erneuerungs-Token **sieben
      Tage** — Vorbedingung (iv) im Abschnitt "1b als Folgetask", an eigenen Daten
      wiedergefunden (VERMERK 6, Ableitung 3, und der Nachtrag vom 2026-09-03 mit dem
      konkreten Datum).
    · **ABLEITUNG, NICHT LESUNG — UND DIESE KENNZEICHNUNG IST GEGENÜBER DER VORLAGE
      DIESER RUNDE VERSCHÄRFT:** Dass nach dem Statuswechsel die Frist entfällt und das
      Token dann nur noch durch Ereignisse stirbt, ist **die UMKEHRUNG einer gelesenen
      Bedingung**, nicht die gelesene Bedingung selbst. Gelesen ist ausschliesslich der
      Satz des Anbieters über den **Testing**-Zustand ("…publishing status of 'Testing'
      is issued a refresh token expiring in 7 days", docs/ziel-befunde.md, Teil (af)).
      **Aus "im Zustand A gilt X" folgt nicht "ausserhalb von A gilt X nicht"** — das ist
      genau der Schluss, den Teil (bx) für die Nachbaraussage schon einmal gezogen und
      dann als **widerlegt** protokolliert hat.
      **KEIN Aufruf, keine Beobachtung.** Wer diese Angabe als GELESEN zitiert, zitiert
      eine Folgerung als Quelle.

    **DER NEBENEFFEKT, DER DEN EINTRAG MIT 48 VERBINDET:** Eine Ausfallmeldung im
    Dashboard löste das Log-Problem **an der Wurzel** — niemand müsste mehr nach
    `refresh_token_expired` filtern, und die Gewöhnung an die mehrdeutige Fehlerzeile
    hätte keinen Gegenstand mehr.
    **DIE ABGRENZUNG GEHÖRT DAZU, sonst laufen zwei Fassungen derselben Sache
    nebeneinander: 48 fragt, WAS DIE LOGZEILE BEDEUTET. Dieser Eintrag fragt, WO DER
    ZUSTAND STATTDESSEN ERSCHEINEN SOLLTE.** Zwei verschiedene Fragen an demselben
    Zustand.

    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, wie die Anzeige aussähe, wo sie sässe,
    oder welcher der beiden Teile zuerst käme.
    TRIGGER: die nächste Arbeit an der Ziel-Karte, **ODER** der Statuswechsel auf
    "In Produktion", **ODER** der erste Kunde mit einer Google-Verbindung.
    PROVENIENZ: **OWNER-VORSCHLAG 2026-09-03**; die Code-Aussagen **GEMESSEN am Repo**
    (CC, 2026-09-03, Aufklärungsrunde desselben Tages); dass die Vorwarnung an derselben
    Frage hängt wie der Zeitplan, ist eine **ABLEITUNG** aus Befund (1) des
    1b-1-Zuschnitts und keine Messung; die Einordnung der Statuswechsel-Angabe als
    Ableitung statt Lesung ist **GEMESSEN am Dateitext** (CC, 2026-09-03, an
    docs/ziel-befunde.md, Teile (af) und (bx)).

    **VERMERK 2026-09-03 — DIE TRENNUNG DIESES EINTRAGS IST ÜBERHOLT UND DURCH EINE
    ANDERE ERSETZT. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK
    TRITT DANEBEN. DER TRIGGER IST UNANGETASTET.**
    **WAS ÜBERHOLT IST — GENAU EINE ACHSE, NICHT DER GANZE EINTRAG:** die Sortierung in
    **"billige Ausfallmeldung / teure Vorwarnung"**. Sie ruhte auf dem Schluss, die
    Vorwarnung hänge "an DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
    AUSLÖSER".
    **DER GRUND, WARUM SIE FÄLLT (ARCHITEKTEN-BEFUND 2026-09-03): EINE SERVERAKTION HAT
    DEN CHIFFRIER-SCHLÜSSEL.** Der erste Halbsatz des Eintrags stimmt weiterhin — der
    Ablaufzeitpunkt steckt im Chiffrat, und die **Datenbank** hat den Schlüssel nicht.
    **Der Schluss stimmt nicht:** Eine Aktion kann dasselbe tun wie `usableTokenFromRow`
    (src/lib/capi/token.ts) — lesen, entschlüsseln, beide Uhren prüfen —, beim Laden des
    Dashboards und abseits jedes Beacons. **Der Satz galt einem ZEITPLAN IN POSTGRES und
    ist ungeprüft auf die OBERFLÄCHE übertragen worden.**
    **DIE TRENNUNG, DIE AN IHRE STELLE TRITT, LÄUFT AUF EINER ANDEREN ACHSE:**
    **ABGELAUFEN NACH EIGENER UHR** gegen **WIDERRUFEN**. Die erste steht in der Nutzlast
    und braucht keinen Schreibvorgang; die zweite ist nur beim Versuch erfahrbar und
    bräuchte als einzige Lage Persistenz. **Volltext im Abschnitt "Die Ampel an der
    Ziel-Karte — Scheibe 11.2b"**, dort unter "Die zwei Todesarten" — hier NICHT
    verdoppelt.
    **DIE ERSTE HÄLFTE DIESES EINTRAGS WIRD MIT SCHEIBE 11.2b GEBAUT.** Sie umfasst nach
    der neuen Trennung **beide** ursprünglich getrennten Anzeigen: Ausfall **und**
    Vorwarnung (OWNER-ENTSCHEIDUNG 2026-09-03). Was der Eintrag als "die teurere" führte,
    ist es nicht.
    **DIE ZWEITE HÄLFTE BLEIBT OFFEN UND BEHÄLT IHREN EIGENEN TRIGGER:** die
    **widerrufene** Verbindung. Sie ist am Rückgabewert der Erneuerung nicht von
    "abgelaufen" zu trennen — beide münden in `invalid_grant`, sobald der Anbieter
    gefragt wird — und steht im Zuschnitt der Scheibe 11.2b unter "Was die Scheibe 11.2b
    ausdrücklich nicht baut, je mit Grund", mit dem Trigger "die erste Messung, die
    `invalid_grant` bei LEBENDER Uhr zeigt".
    **WAS AM EINTRAG UNBERÜHRT BLEIBT UND WEITER TRÄGT:** der Befund selbst (der Ausfall
    ist für niemanden sichtbar), die drei gemessenen Code-Aussagen, die Invariante (I-4)
    als Riegel gegen den Weg über den Resolver, die ungemessene Vorbedingung aus Teil
    (bx), die Abgrenzung zu Eintrag 48 — **und sein TRIGGER, wörtlich wie zuvor.**
    **DER EINTRAG WIRD NICHT ABGEHAKT.** Ein Zuschnitt ist kein Vollzug; abgehakt wird
    hier ohnehin nicht (s. die Bauform an den Einträgen 7, 15 und 35).
    PROVENIENZ: **ARCHITEKTEN-BEFUND 2026-09-03**, auf Owner-GO; die Code-Aussage, dass
    eine Serveraktion entschlüsseln kann, ist **GEMESSEN am Repo** (CC, 2026-09-03) — die
    Chiffrier-Kennung wird aus der Umgebung gelesen, nicht aus der Datenbank. **Keine
    Messung an einer Oberfläche.**

    **ZWEITER VERMERK 2026-09-04 — DIE ERSTE HÄLFTE IST GEBAUT UND LIVE BEWIESEN. DER
    TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **WAS GEBAUT IST:** Die Scheibe 11.2b (Bau-Commit `7288f90`, s. VERMERK 13) zeigt den
    Ausfall **und** die Vorwarnung an der Ziel-Karte. Der Weg von `hasLiveRefreshToken` in
    die Oberfläche, den dieser Eintrag als "WAS FEHLT" benennt, ist gebaut — **aber NICHT
    über den Resolver**, sondern über eine eigene Serveraktion
    (`listTargetCredentialStates`), die beim Laden des Dashboards liest, entschlüsselt und
    Uhr 2 deutet.
    **DIE INVARIANTE (I-4) IST DAMIT EINGEHALTEN UND NICHT UMGANGEN**, und das ist genau
    der Punkt, den dieser Eintrag selbst als den teuersten benennt: Der Resolver führt
    weiterhin **keine `projectId`**, er ist mit keiner Zeile angefasst worden, und der
    Ingest-Pfad läuft unverändert. Der Weg in die Oberfläche geht **neben** ihm her.
    **WAS DER EINTRAG RICHTIG GESEHEN HAT — die Ausfallmeldung war die billigere Hälfte:**
    Der Zustand wurde bereits erkannt; gefehlt hat allein der Weg. **WORIN ER SICH IRRTE,
    steht schon im Vermerk vom 2026-09-03 darüber** und ist mit dieser Scheibe eingelöst:
    Die Vorwarnung war **nicht** die teurere — eine Serveraktion hat den
    Chiffrier-Schlüssel, und damit fiel die Klartext-Spalten-Frage weg.
    **DIE ZWEITE HÄLFTE BLEIBT OFFEN UND BEHÄLT IHREN EIGENEN TRIGGER:** die **WIDERRUFENE**
    Verbindung. Sie ist am Rückgabewert der Erneuerung nicht von "abgelaufen" zu trennen —
    beide münden in `invalid_grant`, sobald der Anbieter gefragt wird — und bräuchte als
    einzige Lage **Persistenz**. Ihr Trigger steht im Zuschnitt der Scheibe 11.2b unter
    "Was die Scheibe 11.2b ausdrücklich nicht baut, je mit Grund": **die erste Messung, die
    `invalid_grant` bei LEBENDER Uhr zeigt.**
    **DIE UNGEMESSENE VORBEDINGUNG AUS TEIL (bx) IST DAVON UNBERÜHRT UND GILT WEITER:** Ob
    Google nach dem Statuswechsel auf "In Produktion" überhaupt noch einen Ablaufzeitpunkt
    liefert, ist **nicht gemessen**. Trägt er keinen, greift die Vorwarn-Schwelle nie, und
    die Karte steht auf `unknown_expiry`. **Das ist gebaut und kein Defekt** — aber es
    heisst, dass die Vorwarnung im Produktivbetrieb ihre Datengrundlage verlieren kann.
    **DER EINTRAG WIRD NICHT ABGEHAKT, UND DAS IST DIE BAUFORM DIESER DATEI, KEINE
    UNENTSCHLOSSENHEIT:** Der Vorrat kennt kein Abhaken; er kennt einen eigenen datierten
    Absatz UNTER dem unveränderten Eintrag — so bei Eintrag 7, 15 und 35. **Diese Runde
    folgt ihr.** **SEIN TRIGGER STEHT WÖRTLICH WIE ZUVOR**, und zwei seiner drei Hälften
    sind unverändert offen: der Statuswechsel auf "In Produktion" und der erste Kunde mit
    einer Google-Verbindung.
    **WARUM ER STEHEN BLEIBT — ZWEI GRÜNDE, und der zweite wiegt schwerer:** (1) Seine
    **MESSUNG**, dass `listConfiguredTargets` ausschliesslich `target` selektiert, ist der
    Beleg, auf dem die zweite Aktion überhaupt ruht. (2) Seine **TRENNUNG der zwei Hälften**
    ist der Maßstab für die verbliebene: Wer die widerrufene Verbindung später zuschneidet,
    findet hier, warum sie als einzige Persistenz braucht — und warum der Weg über den
    Resolver auch dann versperrt bleibt.
    PROVENIENZ: der Bau **GEMESSEN am Repo** (CC, 2026-09-04); der Live-Nachweis
    **GEMESSEN 2026-09-03/04 (OWNER)**, s. VERMERK 13, Abschnitt (b). Dass (I-4)
    eingehalten ist, ist **GEMESSEN am Diff** (`src/lib/capi/**` liegt nicht darin), keine
    Zusage.

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

7. **EINE MUTATIONS-VORHERSAGE WIRD VOR DEM LAUF GEGEN DEN AKTUELLEN TESTBESTAND
   AKTUALISIERT** (angetreten 2026-08-31, aus zwei Fällen der Scheibe 2).
   **DIE AUSSAGE:** Eine Vorhersage, die aus einer FRÜHEREN Stufe übernommen wird, ist
   **systematisch zu eng** — zwischen ihrer Formulierung und dem Lauf entstehen Tests, die
   DIESELBE Achse messen. Wer sie unverändert übernimmt, sagt einen Bestand voraus, den es
   zum Zeitpunkt der Vorhersage noch nicht gab.
   **DER BEFUND (GEMESSEN am eigenen Lauf, CC, 2026-08-31):** Zwei Pflicht-Mutationen der
   Scheibe 2 trafen mehr als vorhergesagt — zwei gegen acht, einer gegen zwei. **Beide
   Male DECKUNG und keine Kaskade**; die Zusatztreffer waren Läufe, die im Bau derselben
   Runde entstanden sind und dieselbe Assertion-Gestalt tragen.
   **DER STRUKTURELLE AUSLÖSER GEHÖRT ZUR AUSSAGE, sonst liest sie sich als Ermahnung zur
   Sorgfalt:** Der Bau-Prompt gab die Vorhersagen wörtlich vor ("mit den Vorhersagen aus
   Stufe 1"), statt sie vor dem Lauf gegen den aktuellen Bestand aktualisieren zu lassen.
   **IN DER FIX-SCHEIBE HAT CC GENAU DAS GETAN** — dort stand keine solche Vorgabe, und
   eine Vorhersage wurde VOR dem Lauf korrigiert, weil ein zweiter Lauf denselben Zweig
   durchläuft (VERMERK 8, erste Mutationsprobe). **Dasselbe Verfahren, zwei Ausgänge, und
   der Unterschied lag im Prompt.**

   **DIE NACHBARSCHAFT — DIE FRAGE, NICHT IHRE ANTWORT.** Die Regel "EINE
   MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN" (docs/immer-beachten.md) ist
   im Volltext gelesen (CC, 2026-08-31). Sie lautet: Unerwartetes ROT ist genauso ein
   Befund wie unerwartetes Grün; beide Abweichungen werden VOR jeder Reparatur untersucht;
   BELEG sechsmal in einer Phase, davon fünfmal zu eng; und die einseitige Streuung ist die
   eigentliche Aussage.
   **WAS FÜR EINEN ABSATZ AN IHR SPRICHT:** Sie führt bereits die einseitige Streuung und
   nennt sie ausdrücklich ein Zeichen für eine SYSTEMATISCHE Ursache. Diese Aussage
   BENENNT eine solche Ursache — sie ist die Antwort auf eine Frage, die jene Regel selbst
   stellt. Eine eigene Regel daneben zerschnitte Frage und Antwort.
   **WAS FÜR EINE EIGENE SPRICHT:** Die bestehende sagt, eine Vorhersage KÖNNE falsch sein,
   und verlangt, die Abweichung zu UNTERSUCHEN. Diese sagt, WANN sie es systematisch ist,
   und verlangt etwas anderes — eine HANDLUNG VOR dem Lauf statt einer Untersuchung
   danach. **Ein Absatz an einer Regel, deren operative Anweisung nachgelagert ist, feuert
   im richtigen Moment nicht.**
   **NICHT ENTSCHIEDEN, und ohne diesen Satz stellt die Hebung eine Regel neben eine, die
   dieselbe Achse führt, und dann greift keine mehr richtig:** ob es ein ABSATZ wird oder
   eine EIGENE Regel. KEINE EMPFEHLUNG.
   **GILT UNABHÄNGIG VON DIESER ENTSCHEIDUNG UND AB SOFORT:** Eine übernommene Vorhersage
   wird vor dem Lauf gegen den aktuellen Bestand geprüft. Die Ablage-Frage betrifft, WO die
   Regel steht, nicht OB sie befolgt wird.
   GEMELDET 2026-08-31, NICHT GEBAUT.
   PROVENIENZ: Die zwei Fälle GEMESSEN am eigenen Lauf (CC, 2026-08-31). Der Volltext der
   Nachbarregel GELESEN in docs/immer-beachten.md (CC, 2026-08-31). Dass der Prompt der
   strukturelle Auslöser war, ist eine ABLEITUNG aus dem Vergleich mit der Fix-Scheibe,
   keine Messung.
