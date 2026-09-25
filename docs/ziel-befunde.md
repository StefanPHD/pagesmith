# ZIEL-BEFUNDE — VERZEICHNIS und KONVENTIONEN der Fan-Out-Ziele

**WAS DIESE DATEI IST — SEIT DEM 2026-09-22 ETWAS ANDERES ALS VORHER:** Sie ist das
VERZEICHNIS der Ziel-Dateien und der Ort ihrer KONVENTIONEN. **SIE TRÄGT SELBST KEINEN
EINZIGEN BEFUND MEHR.** Die gemessenen und gelesenen Befunde — wie die Schnittstelle des
Anbieters sich TATSÄCHLICH verhält: welche Felder sie verlangt, was sie ablehnt, was sie
stillschweigend annimmt, welche Statuscodes und Rumpfformen sie kennt, und mit welchem
Instrument sich das live nachprüfen lässt — stehen **JE ZIEL IN EINER EIGENEN DATEI UNTER
`docs/ziel-befunde/`**.
**DER GRUND DER AUFTEILUNG WAR EIN MESSWERT UND KEIN UNBEHAGEN:** Die Sammel-Datei war für
die VOLLLADUNG zu gross geworden, die der Pflicht-Stopp vor einem Zuschnitt verlangt. **DIE
PFLICHT IST DAMIT NICHT GELOCKERT, SONDERN WIEDER ERFÜLLBAR** — sie gilt seither der Datei
des Ziels. Die Abschnitte sind ZEICHENGLEICH herübergegangen; jede Ziel-Datei trägt in
ihrem Kopf die Prüfsumme über den übernommenen Text.

**WAS SIE NICHT IST:** Sie trägt KEINE Regeln — die stehen in docs/immer-beachten.md. Sie
trägt KEINE Entscheidungen und KEINE Auflagen — die stehen an der jeweiligen
Roadmap-Zeile in CLAUDE.md. Und sie ist KEIN Zuschnitt: sie sagt, was ist, nicht was zu
bauen ist. Wer hier eine Regel oder eine Entscheidung einträgt, macht aus einem Befund
eine Vorgabe, die niemand beschlossen hat.

**DER AUSLÖSER — es lädt NICHTS davon automatisch:** Wer an einem Fan-Out-Ziel arbeitet,
lädt ZUERST **die Datei des Ziels** unter `docs/ziel-befunde/`, dazu **diesen Kopf** —
bei Zuschnitt, Adapter, Anbieter-Recherche oder Live-Test-Anleitung.
**DIESE DATEI ALLEIN GENÜGT NICHT, und der Satz steht hier, weil der Fehlgriff nicht
auffiele:** Sie trägt keinen Befund; wer nur sie lädt, hat den Pflicht-Stopp dem ANSCHEIN
nach erfüllt und nichts gelesen. Wer ohne die Ziel-Datei recherchiert, erhebt ein zweites
Mal, was dort schon steht — und wer ohne sie eine Live-Test-Anleitung schreibt, nennt
womöglich eine untaugliche Sonde.

**PROVENIENZ-PFLICHT AN JEDER ANGABE, ohne Ausnahme:** GEMESSEN (mit Datum und
Instrument) · GELESEN (mit Quelle und Datum) · FOLGERUNG (als solche gekennzeichnet).
Eine Angabe ohne Provenienz ist hier nicht schreibbar. Keine Angabe wird von GELESEN auf
GEMESSEN gehoben, weil sie plausibel klingt oder weil ein anderes Ziel live bewiesen ist.

**SIE WIRD NICHT ARCHIVIERT:** Anders als eine Standdatei (docs/aktiver-stand.md) gehört
sie keiner Phase. Ein Anbieter-Befund überlebt die Phase, in der er erhoben wurde — er
gilt, bis der Anbieter sein Verhalten ändert, und dann wird er neu gemessen, nicht
weggeräumt.

**FORTSCHREIBUNG:** Je Ziel eine eigene DATEI unter `docs/ziel-befunde/`. **EIN NEUES ZIEL
BEKOMMT DATEI UND VERZEICHNIS-ZEILE IM SELBEN ZUG** — wer nur die Zeile anlegt, erzeugt
einen Eintrag ohne Datei; wer nur die Datei anlegt, eine Datei, die niemand findet, und
beides fällt an keinem Gate auf. Neue Ziele werden HINTEN angefügt, nichts wird umsortiert,
nichts neu nummeriert. Die Verzeichnis-Zeile nennt die Überschrift des Ziels wörtlich,
nicht beschrieben.

**FORTSCHREIBUNG, ZWEITER FALL — EIN WEITERES MESSPROTOKOLL ZU EINEM BESTEHENDEN
ZIEL** (Konvention angewandt und niedergeschrieben am 2026-08-17, als das
zweite LinkedIn-Protokoll dazukam): Wird zu einem Ziel ERNEUT gemessen, entsteht KEINE
neue Ziel-Datei und kein zweiter Eintrag im Verzeichnis — das Verzeichnis führt
Ziele, nicht Protokolle. Statt dessen kommt **HINTEN IN DIE DATEI DES ZIELS** eine
eigene, DATIERTE Unterüberschrift dazu, die ihre Herkunft (Instrument, Zahl der Läufe,
Bedingungen des Laufs) im Kopf nennt.
DIE BUCHSTABEN LAUFEN ÜBER ALLE PROTOKOLLE EINES ZIELS FORT UND BEGINNEN NIE NEU. GRUND,
und er ist der ganze Punkt dieser Konvention: Auf die Buchstaben wird von AUSSEN verwiesen
— aus CLAUDE.md, aus docs/roadmap.md, aus docs/offene-punkte.md, aus mehreren Dateien in
docs/claude-history/ und AUS DEM PRODUKTIVCODE UND DEN TESTDATEIEN UNTER src/ —, und diese
Verweise nennen den Buchstaben, nicht das Datum. Ein zweites "(a)" für dasselbe Ziel macht
jeden dieser Verweise mehrdeutig, ohne dass irgendwo etwas rot wird.
DIE AUFZÄHLUNG DER HERKUNFTSORTE STAND BIS ZUM 2026-09-22 AUF ZWEI DAVON UND WAR DAMIT ZU
ENG; sie ist RICHTIGGESTELLT und nicht gestempelt — eine zu kurze Liste lädt dazu ein,
einen bestehenden Zeiger für nicht vorhanden zu halten und ihn beim Umbauen zu übersehen.
**HIER STEHT BEWUSST KEINE ZAHL:** Die Menge wächst mit jedem Zeiger, und eine Zahl wäre
beim nächsten veraltet. Wer den heutigen Stand braucht, misst ihn.
EIN ÄLTERER TEIL WIRD DABEI NICHT UMGESCHRIEBEN: Widerlegt oder ergänzt ein neues
Protokoll einen alten Teil, bleibt dessen Wortlaut stehen und bekommt einen VORBEHALT, der
auf den neuen Buchstaben zeigt (Muster: der Vorbehalt an (b), der auf (i) zeigt).

**WAS NACH (z) KOMMT — DOPPELBUCHSTABEN: (aa), (ab), (ac) … BIS (az), DANN (ba)**
(Konvention entschieden und niedergeschrieben am 2026-08-25, als der Google-Abschnitt mit
dem dritten Lauf über (z) hinauswuchs). SIE SETZT DIE KONVENTION DARÜBER FORT UND ERSETZT
SIE NICHT: Jene sagt, DASS die Buchstaben über alle Protokolle eines Ziels fortlaufen und
nie neu beginnen — diese sagt, WIE sie fortlaufen, wenn das Alphabet zu Ende ist.
DIE FORM: Auf (z) folgt (aa), dann (ab), (ac) und so fort bis (az). NACH (az) KOMMT (ba),
dann (bb). Der Satz über (az) steht hier ausdrücklich, damit dieselbe Frage dort nicht ein
zweites Mal gestellt werden muss — sie ist einmal beantwortet, nicht einmal je Grenze.
SIE GILT FÜR JEDES ZIEL, NICHT NUR FÜR GOOGLE. Pinterest und LinkedIn laufen auf dieselbe
Grenze zu; eine Konvention, die nur den ersten Fall regelt, ist beim zweiten wieder eine
offene Frage.
VIER FORMEN SIND ERWOGEN UND ABGELEHNT WORDEN. Die Ablehnungen stehen hier, weil sie sonst
beim nächsten Mal neu verhandelt werden:
· (a2), (b2) — ABGELEHNT WEGEN DER EINZIGEN REPO-PRÄZEDENZ, NICHT TROTZ IHR: (d2) in
  docs/claude-history/backlog-polish.md bezeichnet eine EINFÜGUNG zwischen (d) und (e).
  Dieselbe Form für einen unabhängigen NEUEN Teil zu benutzen, gäbe ihr die gegenteilige
  Bedeutung.
· Zahlen ab (27) — ABGELEHNT: zwei Notationen in einem Abschnitt, und (1), (2) sind in
  diesen Dateien als Aufzählungsform bereits vergeben.
· EIN ZWEITER Ziel-Abschnitt für dasselbe Ziel, der wieder bei (a) beginnt — ABGELEHNT: Er
  bräche "Je Ziel ein eigener Abschnitt" und machte jedes bestehende Zitat der Form
  "Google-Abschnitt, Teil (x)" mehrdeutig.
· TITEL-ANKER statt Buchstaben — ABGELEHNT: längere Anker, die sich leichter ändern als ein
  Buchstabe.
ZUR SUCHBARKEIT, weil der Einwand naheliegt und falsch ist: Ein Suchmuster "(a)" MIT BEIDEN
KLAMMERN trifft "(aa)" NICHT. Die formale Suche unterscheidet die beiden, sofern beide
Klammern im Muster stehen — und die Verweis-Regel unten verlangt ohnehin ABSCHNITT PLUS
BUCHSTABEN, nicht den Buchstaben allein.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25. Der Befund, dass es bis dahin WEDER eine Regel
NOCH eine tragfähige Präzedenz gab, ist GEMESSEN am Repo (CC, 2026-08-25; Achse: *.md,
*.ts, *.tsx und *.sql ohne node_modules, Muster für Doppelbuchstaben- und Ziffernformen,
dazu eine Volltextsuche dieser Datei nach einer Erschöpfungs-Regel — zwei Treffer, beide
unbeteiligt). EINE LÜCKE DER MESSUNG GEHÖRT DAZU: docs/arbeitsweise.md ist NICHT
durchsucht worden, weil CLAUDE.md CC das Lesen jener Datei untersagt.

**EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND BUCHSTABEN — NIE DEN BUCHSTABEN ALLEIN**
(Konvention niedergeschrieben am 2026-08-20, als der zweite Ziel-Abschnitt dazukam). SIE
ERWEITERT DIE KONVENTION DARÜBER UND ERSETZT SIE NICHT: Jene bindet die Eindeutigkeit der
Buchstaben an den ZIEL-ABSCHNITT ("Ein zweites (a) im selben Ziel-Abschnitt macht jeden
dieser Verweise mehrdeutig") — über Ziel-Abschnitte hinweg dürfen sie sich also
wiederholen, und ein neuer Ziel-Abschnitt beginnt wieder bei (a).
DER GRUND, und er ist seit dem 2026-08-20 nicht mehr theoretisch: Es gibt dieselben
Buchstaben MEHRFACH in dieser Datei. Ein Verweis, der nur "(b)" nennt, zeigt damit auf
mehr als eine Stelle.
DIE FOLGE: Jeder Verweis von aussen — aus CLAUDE.md, aus docs/claude-history/* — nennt den
ABSCHNITT und den Buchstaben.
**WAS "ABSCHNITT" SEIT DEM 2026-09-22 MEINT — UND DIESER SATZ IST DER GRUND, WARUM DIESE
DATEI ÜBERHAUPT STEHENGEBLIEBEN IST:** Ein Verweis der Form "docs/ziel-befunde.md,
Abschnitt X, Teil (y)" **MEINT DIE DATEI DES ZIELS X** unter `docs/ziel-befunde/` — **er
bleibt damit GÜLTIG.** Die bestehenden Verweise sind bewusst **NICHT nachgezogen** worden;
sie landen hier, und der Stub des Ziels weiter unten löst sie auf. Wer KÜNFTIG verweist,
nennt gleich die Ziel-Datei.
DIE GRENZE, DIE MITMUSS: Diese Konvention gilt für KÜNFTIGE Verweise. Die bestehenden sind
am 2026-08-20 NICHT nachgezogen worden; ob und wann das geschieht, ist hier nicht
entschieden. Was still kaputtgeht, wenn es unterbleibt: Ein alter Verweis wird mehrdeutig,
sobald ein zweiter Abschnitt seinen Buchstaben vergibt — und kein Werkzeug meldet das.

## Verzeichnis der Abschnitte

- ## LinkedIn (Conversions API)
  - ### Abschnitts-Lesung 2026-09-11 der Conversions-API-Dokumentation — die Teile (aa)
    bis (al)
- ## Google (Google Ads Conversions · GA4)
  - ### Abschnitts-Lesung 2026-08-24 der Data-Manager-Dokumentation, LAUF 1 (Leitfaden und
    Betrieb) — die Teile (g) bis (s)
  - ### Acht Fragen ohne Katalog-Ort (2026-08-24)
  - ### Abschnitts-Lesung 2026-08-24 der Data-Manager-Dokumentation, LAUF 2 (die Referenz)
    — die Teile (t) bis (z)
  - ### Abschnitts-Lesung 2026-08-25 der OAuth- und Google-Ads-Politik-Dokumentation,
    LAUF 3 — die Teile (aa) bis (ai)
  - ### Abschnitts-Lesung 2026-08-25 der Data-Manager-Politik, LAUF 4 — die Teile (aj)
    bis (as)
  - ### Abschnitts-Lesung 2026-08-27 der OAuth-2.0-Dokumentation für
    Webserver-Anwendungen, LAUF 5 — die Teile (at) bis (ay)
  - ### Abschnitts-Lesung 2026-08-27 der OAuth-2.0-Dokumentation, LAUF 6 (die ANTWORTSEITE
    des Token-Tauschs) — die Teile (az) bis (bg)
  - ### Zugespitzter Doku-Lauf 2026-08-28 (LAUF 7) und MESSUNG A gegen events:ingest — die
    Teile (bh) bis (bm)
  - ### MESSUNG B1 gegen events:ingest (2026-08-28) — die Teile (bn) bis (bu)
  - ### MESSUNG C gegen den Token-Endpunkt (2026-08-28) — die Teile (bv) bis (bz)
  - ### MESSUNG D gegen events:ingest (2026-09-01) — der Teil (ca)
  - ### MESSUNG E gegen requestStatus:retrieve (2026-09-02) — der Teil (cb)
  - ### Abschnitts-Lesung 2026-09-02 zur Zuordnung ohne Klick-Kennung, LAUF 8 — der Teil (cc)
  - ### MESSUNG F am eigenen Dienst (2026-09-07) und ein Nicht-Treffer zur Oberfläche —
    die Teile (cd) und (ce)
  - ### MESSUNG G in der Google-Ads-Oberfläche (2026-09-07) — die Verbuchung, die Teile
    (cf) und (cg)
  - ### Abschnitts-Lesung 2026-09-11 der Offline-Conversion-Dokumentation zum Testmodus,
    LAUF 9 — die Teile (ch) bis (cr)
- ## Pinterest (Conversions API)
  - ### MESS-RUNDE 2026-09-10 gegen die Conversions API und die Anbieter-Oberfläche —
    die Teile (u) bis (z)
  - ### Ablesung an der Anbieter-Oberfläche (2026-09-10) — der Teil (aa)
- ## Meta (Conversions API)
  - ### Abschnitts-Lesung 2026-09-08 der Conversions-API-Dokumentation zum Testmodus —
    die Teile (a) bis (f)
- ## TikTok (Events API 2.0)
  - ### Abschnitts-Lesung 2026-09-08 der Events-API-2.0-Dokumentation zum Testmodus —
    die Teile (a) bis (g)
  - ### Beobachtung an der Test-Events-Ansicht des Werbekontos (2026-09-09) — der
    Teil (h)
- ## GA4 (Measurement Protocol)
  - ### Abschnitts-Lesung 2026-09-25 der Measurement-Protocol-Dokumentation — die Teile (a)
    bis (r)

**EINE ASYMMETRIE, DIE MIT DEM EINTRAG VOM 2026-08-24 ENTSTANDEN IST UND HIER BENANNT
STATT AUFGELÖST WIRD:** Dieses Verzeichnis führte bis dahin AUSSCHLIESSLICH die drei
`##`-Ziel-Abschnitte. Die beiden `###`-Zeilen darüber sind die ERSTEN Unterabschnitte
darin — **die MEHRZAHL der übrigen** (Messprotokolle, Nachträge, Abschnitts-Lesungen bei
LinkedIn und Pinterest) steht NICHT hier. Wer das Verzeichnis als vollständige Liste der
Unterabschnitte liest, liest falsch. OB DIE ÜBRIGEN NACHGEZOGEN WERDEN, IST HIER NICHT
ENTSCHIEDEN und war nicht Gegenstand des Eingriffs.
**HIER STAND EINE ZAHL — "die rund fünfzehn übrigen" —, UND SIE IST AM 2026-09-10
ERSATZLOS HERAUSGENOMMEN, NICHT NACHGEZOGEN.** Sie war zuletzt um drei zu niedrig.
**Ein Nachzug ist selbst eine Änderung und macht die Angabe erneut falsch**
(docs/immer-beachten.md, "EINE DATEI, DIE IHRE EIGENE GRÖSSE IM PRÄSENS NENNT, ERZEUGT
EINEN KREISLAUF AUS NACHZÜGEN"). Die Auskunft, auf die es ankommt, steht ohne Zahl
darüber: **nicht jeder Unterabschnitt wird geführt.** Wer die heutige Zahl braucht, misst
sie.

## LinkedIn (Conversions API)

**DER ABSCHNITT STEHT SEIT DEM 2026-09-22 IN `docs/ziel-befunde/linkedin.md`** —
zeichengleich herausgeschnitten, mit Prüfsumme im Kopf jener Datei. Ein Verweis der Form
"docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teil (x)" meint ihn dort und
bleibt gültig.

## Google (Google Ads Conversions · GA4)

**DER ABSCHNITT STEHT SEIT DEM 2026-09-22 IN `docs/ziel-befunde/google.md`** —
zeichengleich herausgeschnitten, mit Prüfsumme im Kopf jener Datei. Ein Verweis der Form
"docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teil (x)" meint
ihn dort und bleibt gültig.

## Pinterest (Conversions API)

**DER ABSCHNITT STEHT SEIT DEM 2026-09-22 IN `docs/ziel-befunde/pinterest.md`** —
zeichengleich herausgeschnitten, mit Prüfsumme im Kopf jener Datei. Ein Verweis der Form
"docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (x)" meint ihn dort und
bleibt gültig.

## Meta (Conversions API)

**DER ABSCHNITT STEHT SEIT DEM 2026-09-22 IN `docs/ziel-befunde/meta.md`** —
zeichengleich herausgeschnitten, mit Prüfsumme im Kopf jener Datei. Ein Verweis der Form
"docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)", Teil (x)" meint ihn dort und
bleibt gültig.

## TikTok (Events API 2.0)

**DER ABSCHNITT STEHT SEIT DEM 2026-09-22 IN `docs/ziel-befunde/tiktok.md`** —
zeichengleich herausgeschnitten, mit Prüfsumme im Kopf jener Datei. Ein Verweis der Form
"docs/ziel-befunde.md, Abschnitt "TikTok (Events API 2.0)", Teil (x)" meint ihn dort und
bleibt gültig.

## GA4 (Measurement Protocol)

**DIESES ZIEL STEHT SEIT SEINER ANLAGE AM 2026-09-25 IN `docs/ziel-befunde/ga4.md`** — neu
angelegt, nicht herausgeschnitten, deshalb ohne Prüfsumme; hier hat es nie einen Befund
getragen. Die älteren GA4-Angaben stehen in `docs/ziel-befunde/google.md`, Teil (f), und bleiben
dort als Zeitdokument (OWNER-ENTSCHEIDUNG 2026-09-25).
