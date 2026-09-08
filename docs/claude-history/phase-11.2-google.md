# ARCHIV — PHASE 11.2 (GOOGLE): ZUSCHNITTE UND VERMERKE


**═══ ABSCHLUSS — DIE PHASE 11.2 IST BEENDET, DIE STEUERDATEI UND DER VORRAT SIND GELÖSCHT
(2026-09-08) ═══**

**DIESER BLOCK IST DER EINSTIEG FÜR JEDEN, DER EINEM ZEIGER AUF EINE DATEI FOLGT, DIE ES
NICHT MEHR GIBT.** Er steht deshalb im Kopf und nicht am Dateiende.

**DIE PHASE 11.2 (GOOGLE ADS) IST AM 2026-09-08 ABGESCHLOSSEN. IHR MARKER STEHT AUF `[x]`.**
**WAS `[x]` HIER HEISST, UND ZWAR AUSDRÜCKLICH NICHT MEHR: ES HEISST BAU-FERTIG.** Es heisst
NICHT "alle Fragen beantwortet" und NICHT "Google funktioniert" — die WIRKUNG AUF DIE GEBOTE
ist ungemessen; bewiesen ist der Weg bis zur VERBUCHUNG beim Anbieter, nicht bis zur Wirkung.
**DIE VOLLE AUFLAGE STEHT IN docs/roadmap.md, Eintrag 11.2, im "NACHTRAG 2026-09-08, DRITTER
DES TAGES — DER ABSCHLUSS"** und wird hier NICHT verdoppelt; zwei Fassungen liefen
auseinander.

**DIE ZWEI GELÖSCHTEN DATEIEN, MIT IHREN NAMEN:**
· **`docs/aktiver-stand.md`** — die STEUERDATEI der Phase, das Pflicht-Gate ("Auftrag 0").
· **`docs/aktiver-stand-vorrat.md`** — der VORRAT, 66 Einträge.
**SIE SIND AUS DEM ARBEITSBAUM GELÖSCHT, NICHT AUS DER HISTORIE.** Der vollständige Text
beider Dateien steht unverändert im Commit

    dae49f6e7cdb992a45f24dbb5b207354cc17906e   (kurz: dae49f6)

und ist von dort jederzeit lesbar:

    git show dae49f6:docs/aktiver-stand.md
    git show dae49f6:docs/aktiver-stand-vorrat.md

**DER HASH STEHT HIER, WEIL EINE HISTORIE OHNE IHN THEORETISCH ERREICHBAR UND PRAKTISCH
NICHT IST — niemand sucht einen Commit, den keiner aufgeschrieben hat.**

**DAS PROTOKOLL DER HEBUNG — WAS WOHIN GEGANGEN IST, JE KLASSE:**
· **DIE SIEBEN RESTE DER ROADMAP-ZEILE:** FÜNF nach `docs/offene-punkte.md`, je mit Stub in
  `CLAUDE.md`. Posten (7) an die ROADMAP-ZEILE 11.5, wo die Entscheidung fällt. Posten (8)
  GESTRICHEN, weil er als offener Punkt bereits in `docs/ziel-befunde.md` geführt wird.
· **DER VORRAT, 66 EINTRÄGE:** VIERZEHN nach `docs/offene-punkte.md`, FÜNFZIG nach
  `docs/claude-history/backlog-polish.md` (Abschnitt "Aus Phase 11.2 gehoben (2026-09-08)"),
  ZWEI gestrichen. **DAS KRITERIUM WAR ZWEITEILIG** — benennbarer Trigger UND "geht sonst
  STILL kaputt"; nach dem Trigger allein wären es FÜNFUNDFÜNFZIG gewesen.
· **DIE ELF HEBUNGS-KANDIDATEN:** ACHT als Dauerregeln nach `docs/immer-beachten.md`, EINER
  (Kandidat 4) ins Backlog, weil er keine Regel ist, sondern eine Verortungs-Aufgabe. ZWEI
  liegen als KOPIE in dieser Datei — s. den nächsten Punkt.
· **DIE NEUNZEHN BINDENDEN ENTSCHEIDUNGEN:** DREI als Dauerregeln nach
  `docs/immer-beachten.md`, SECHZEHN in diese Datei, Abschnitt "Die bindenden Entscheidungen
  der Phase 11.2, aus der Steuerdatei übernommen". **KEINE hat ihren Gegenstand verloren.**

**DIE ZWEI KANDIDATEN-KOPIEN UND WARUM SIE DEN VOLLZUG ÜBERLEBEN MÜSSEN:** Sie liegen in
dieser Datei im Abschnitt **"## Zwei Hebungs-Kandidaten der Phase 11.2, die den Vollzug
überleben müssen"**, mit ihren Nummern 10 und 11.
· **KANDIDAT 10** trägt den **angenommenen Änderungsantrag** an `docs/arbeitsweise.md` und
  an die Marker-Legende in `CLAUDE.md` (OWNER-ENTSCHEIDUNG 2026-09-08). **SEIN VOLLZUG IST
  AUSSTEHEND** und war ausdrücklich NACH diesem Phasenende terminiert — insbesondere Teil
  (D), der `docs/arbeitsweise.md` betrifft und sie bis dahin sperrt. Er ist in der
  KORRIGIERTEN Fassung übernommen (Teil (B) trägt seit dem 2026-09-08 zwei Bedingungen,
  nicht eine).
· **KANDIDAT 11** ist die gerettete Prinzip-Hälfte der bindenden Entscheidung (B).
**OHNE DIESE KOPIEN WÄREN BEIDE MIT DER STEUERDATEI VERSCHWUNDEN.**

**EIN TOTER PFAD, DER NIE GEHEILT WERDEN DARF — UND ER LIEGT IM PRODUKTIVCODE:**
`supabase/migrations/0027_project_secrets_version.sql` zeigt in ihrem Kopfkommentar auf
`docs/aktiver-stand.md`, Abschnitt **"Der Riegel gegen die verlorene Schreibung"**.
**DER ANKER ÜBERLEBT — jener Abschnitt liegt als Zuschnitt in DIESER Datei. NUR DER PFAD
STIRBT.**
**ER WIRD NICHT NACHGEZOGEN, UND ZWAR NIE:** "ANGEWANDTE MIGRATIONEN WERDEN NICHT
NACHTRÄGLICH UMGESCHRIEBEN, auch nicht ein Kommentar" (`docs/immer-beachten.md`). Die Regel
gewinnt gegen jeden Aufräum-Wunsch.
**ES IST DERSELBE MECHANISMUS, DER `docs/aktiver-stand-11.8.md` ZWÖLF TAGE LIEGEN LIESS —
HIER ABER OHNE AUSWEG: dort war das Nachziehen ein `docs`-Commit, hier ist es verboten.**

**DAS UMBENENNEN, DAS NICHT NÖTIG WAR:** Diese Datei trägt ihren **ENDNAMEN VON ANFANG AN**
— seit ihrer Entstehung am 2026-09-08, mitten in der laufenden Phase. **DAMIT ENTFIEL AM
PHASENENDE JEDES UMBENENNEN, UND MIT IHM DIE FEHLERKLASSE, DIE BEI DER PHASE 11.8 ZWÖLF TAGE
GEKOSTET HAT** — dort zitierten sechs Quelldateien einen Pfad im Kommentarkopf, und die
Standdatei blieb deshalb ausserhalb des Archiv-Ordners liegen, bis der Umzug in einer eigenen
Runde nachgeholt wurde. **DER ENDNAME VON ANFANG AN IST DIE ANTWORT AUF GENAU DIESEN FALL,
und diese Runde ist ihr Beleg: Es war kein `git mv` nötig.**

**DIE SUCHE NACH RETTENSWERTEM IST BEENDET — NACH VIER DURCHSICHTEN UND DREI ACHSEN.**
Vor dem Löschen ist die Steuerdatei viermal daraufhin durchgegangen worden, was in ihr steht
und **nirgends sonst**. Sieben Stücke sind gerettet worden: die ungeprüften
Festlegungs-Blöcke, die Kopplungs-Zahl, die 437 052 Sekunden, die Byte-Aufstellung, der
allgemeine Fall zweier paralleler Phasen, die Zwei-Orte-Auflage am Roadmap-Kopf und die Frage
"ob es bei elf bleibt".
**GEFAHREN WURDEN DREI ACHSEN:** (1) die Abschnitte der Datei, einzeln · (2) alle Zahlen mit
Tausender-Trenner und alle sechsstelligen Zahlen · (3) alle Zeilen mit einem Auflagen- oder
Offenheits-Marker (`NICHT ENTSCHIEDEN`, `STEHT AUS`, `IST UNGEMESSEN`, `IST NICHT GEPRÜFT`,
`AUFLAGE`, `PFLICHT-STOPP`, `BLEIBT OFFEN`, `IST NICHT ERHOBEN`, `NICHT AUFLÖSBAR`, `KEINE
EMPFEHLUNG`).
**NICHT GEFAHREN WURDEN VIER:** Datumsangaben · Symbol- und Dateinamen im Fliesstext ·
Anbieter-Fundstellen der Form `(xy)` · Zitate fremder Wortlaute.
**DIE ZAHL IST KEIN PRÜFUMFANG.** Jede NEUE Achse hat neu getroffen; die Ausbeute ging nicht
gegen null. **WER SPÄTER ETWAS VERMISST, MUSS WISSEN, WO NICHT GESUCHT WURDE — deshalb stehen
die vier ungefahrenen Achsen hier.**
**WARUM DIE SUCHE TROTZDEM BEENDET WURDE, und der Grund ist nicht Erschöpfung:** `git rm`
löscht aus dem ARBEITSBAUM, nicht aus der HISTORIE. **WAS JETZT FEHLT, IST REKONSTRUIERBAR,
NICHT VERLOREN** — der Hash oben ist der Weg dorthin. **DAS IST DER UNTERSCHIED ZWISCHEN
"GEHT VERLOREN" UND "LÄDT NICHT MEHR":** Gerettet wurde, was eine spätere Instanz BRAUCHT,
OHNE DANACH ZU SUCHEN — Auflagen, die beim Lesen dieses Archivs greifen müssen, und
Herleitungen, die eine Entscheidung tragen. Für alles Übrige reicht der Zeiger.

**DER VERFAHRENSSLOT IST WIEDER FREI:** "Existiert `docs/aktiver-stand.md` nicht, läuft
aktuell keine Phase" (`CLAUDE.md`). **DAS IST SEIT DEM 2026-09-08 WIEDER DER FALL** — zum
ersten Mal seit Wochen.

**═══ ENDE DES ABSCHLUSS-BLOCKS ═══**

**WAS DIESE DATEI IST:** Das Archiv der Phase 11.2. Sie trägt die ELF abgelaufenen
Scheiben-Zuschnitte und die abgeschlossenen Scheiben-Vermerke dieser Phase, im
Wortlaut und in der Reihenfolge, in der sie entstanden sind.
**HIER STAND EINE STÜCKZAHL FÜR DIE VERMERKE, UND ES KOMMT KEINE ZURÜCK:** Sie war mit
VERMERK 16 am 2026-09-08 neu falsch. Die Vermerke sind nummeriert und zählen sich damit
selbst; eine Zahl daneben ist eine zweite Wahrheit, die bei jedem Abschluss-Vermerk neu
nachzuziehen wäre. **DIE ZAHL DER ZUSCHNITTE BLEIBT**, weil sie mit dem Schnitt
abgeschlossen ist und nicht mitwächst.

**SIE IST KEIN STEUERNDES DOKUMENT.** Was heute gilt — der Rahmen der Phase, die
bindenden Entscheidungen, die offene Arbeit 1b, der Vorrat, die Hebungs-Kandidaten —
steht NICHT hier. **DIE STEUERDATEI IST `docs/aktiver-stand.md`**, und sie bleibt das
Pflicht-Gate jedes Bau- und Aufklärungs-Prompts dieser Phase.

**WORAUF SIE ZEIGT UND WAS AUF SIE ZEIGT:** In der Steuerdatei stehen unter
"## Register — was diese Datei nicht mehr trägt" ein Register der elf Zuschnitte und
eines der Vermerke. Beide führen je Eintrag den wörtlichen Titelanfang und
diese Datei als Ziel. **Wer einen Zuschnitt oder einen Vermerk sucht, findet über das
Register hierher — und nur so**; ohne das Register wüsste eine Sitzung, die nur die
Steuerdatei liest, nicht einmal, DASS es etwas nachzusehen gibt.

**⚠ DIE FESTLEGUNGS-BLÖCKE DER ELF ZUSCHNITTE SIND UNGEPRÜFT — LIES DAS, BEVOR DU EINEN VON
IHNEN ALS BINDEND LIEST.**
**OB IHRE "FESTLEGUNGS"-BLÖCKE NOCH BINDEN ODER ABGELAUFEN SIND, IST NICHT GEPRÜFT** —
weder von CC noch vom Architekten; **der Volltext ist ungelesen.** Die Zuschnitte sind mit
**254 785 B (37,4 % der damaligen Steuerdatei) die grösste Klasse** gewesen, obwohl alle elf
verdichtet sind (GEMESSEN, CC, 2026-09-07: jeder der elf trägt einen Abschnitt "Vollzogen —
…" bzw. "… ist verdichtet"). **Die grössten Einzelblöcke sind "Sechs Festlegungen des
Zuschnitts der Scheibe 2" (18 030 B) und "Sieben Festlegungen des Zuschnitts der Scheibe 4"
(14 023 B).**
**WARUM DAS HIER IM KOPF STEHT UND NICHT IRGENDWO SONST:** Die elf Zuschnitte liegen in
DIESER Datei und werden weiter gelesen. **WER EINEN FESTLEGUNGS-BLOCK ALS BINDEND LIEST,
MUSS VORHER WISSEN, DASS DAS UNGEPRÜFT IST.** Eine Festlegung, die längst abgelaufen ist,
sieht im Archiv genauso aus wie eine, die noch trägt — nichts im Text unterscheidet sie.
**WAS DIE AUFLAGE WAR, UNTER DER SIE HIERHERKAMEN:** "DIE ZUSCHNITTE WERDEN UNVERÄNDERT
VERSCHOBEN UND NICHT BEURTEILT. Kein Satz wird gestrichen, keiner umformuliert, keiner
gehoben." **WER SIE SPÄTER BEURTEILT, TUT DAS ALS EIGENE ARBEIT** — das ist keine Vertagung
aus Bequemlichkeit: Eine Beurteilung verlangt die Lesung von 254 785 Bytes, und sie im selben
Zug mit einem Schnitt zu erledigen hiesse, ZWEI ACHSEN GLEICHZEITIG ZU BEWEGEN; danach wäre
am Ergebnis nicht mehr zu sehen, ob eine Aussage verschoben oder verändert worden ist.
**PROVENIENZ:** GEMESSEN am Repo (CC, 2026-09-07). Wörtlich übernommen am 2026-09-08 aus
`docs/aktiver-stand.md`, Abschnitt "Die Grenze dieses Zuschnitts — die Zuschnitte werden
verschoben, nicht beurteilt", **vor deren Löschung** — die Aussage stand bis dahin
ausschliesslich dort und wäre mit der Datei verschwunden.

**⚠ UND EINE ZWEITE, TEURERE FRAGE AN DIESELBEN ZUSCHNITTE — SIE IST NICHT DIESELBE WIE DIE
DARÜBER, UND DIE UNTERSCHEIDUNG IST DER GANZE PUNKT.**
Der Block darüber fragt, ob die Festlegungs-Blöcke der elf Zuschnitte noch **BINDEN** oder
abgelaufen sind. **DIESER HIER FRAGT, OB ES WEITERE BINDENDE ENTSCHEIDUNGEN GIBT, DIE NIE
ERHOBEN WURDEN.**
**OB ES BEI ELF BLEIBT, IST NICHT GEPRÜFT.** Beim Schnitt vom 2026-09-08 sind genau ZWEI
Abschnitte als "bindet über die Scheibe hinaus" erkannt und aus den Zuschnitten
herausgelöst worden — **weil ihre TITEL die Aussage tragen** ("Die Entscheidungen vom
2026-08-29 — ACHT, und sie binden über diese Scheibe hinaus" und "Drei Entscheidungen, die
nach den sechs Festlegungen gefallen sind — sie binden gleich"). **Ob in den übrigen NEUN
Zuschnitten weitere bindende Entscheidungen ohne einen solchen Titel stecken, ist NICHT
ERHOBEN.**
**WARUM DAS DIE TEURERE DER BEIDEN FRAGEN IST, und der Satz stammt aus dem Block selbst:**
Wäre beim Schnitt mechanisch getrennt worden, wäre der Schaden **still** gewesen — der
Schnitt hätte funktioniert, die Gates wären grün gewesen, **"und die nächste Scheibe wäre
gegen Entscheidungen gebaut worden, die sie nicht mehr findet."** Genau diese Lage besteht
für die neun ungeprüften Zuschnitte fort: Eine bindende Entscheidung, die niemand als solche
erkannt hat, liegt in einer Datei, die als ABGELAUFENES geführt wird — und wer nach ihr
sucht, sucht sie an einem Ort, an dem er sie nicht erwartet.
**PROVENIENZ:** Die zwei erkannten Abschnitte sind GEMESSEN am Repo (CC, 2026-09-07), ihre
Titel wörtlich geprüft. Dass die übrigen neun **nicht** erhoben sind, ist eine Aussage über
den Prüfumfang jener Messung und ausdrücklich kein Nicht-Treffer. Wörtlich übernommen am
2026-09-08 aus `docs/aktiver-stand.md`, Abschnitt "Die elf Entscheidungen, die heute am
falschen Ort stehen", **vor deren Löschung** — die Aussage stand bis dahin ausschliesslich
dort.

**AUSDRÜCKLICH NICHT ENTSCHIEDEN: DER ALLGEMEINE FALL ZWEIER PARALLELER PHASEN.**
Diese Phase lief zeitweise NEBEN der Phase 11.8, und beide führten eine eigene Standdatei,
einen eigenen Vorrat und ein eigenes Pflicht-Gate. **DIE PARALLELITÄT IST ZWEIMAL
VORGEKOMMEN UND NIE GEREGELT WORDEN.**
**DER VERMERK, DER SIE BESCHRIEB, BESCHRIEB EINEN EINZELFALL UND KEINE REGEL.** Er hielt
fest, welche Datei welchen Stand trägt, dass ein Verweis der Form "Vorrat, Eintrag 3" ohne
Dateinamen ZWEI Standdateien trifft, und dass nichts davon nachgezogen worden ist.
**WER DARAUS EIN VERFAHREN ABLEITET, LEITET AUS EINEM EINZELFALL AB — UND DER EINZELFALL
SIEHT OHNE DIESE WARNUNG WIE EIN PRÄZEDENZFALL AUS.**
**WARUM DAS HIER STEHT UND NICHT IN docs/arbeitsweise.md:** Dort stünde ein VERFAHREN, wo
der Text selbst sagt, es sei ein Einzelfall. Ausserdem ist jene Datei bis zum Vollzug des
angenommenen Änderungsantrags gesperrt (Teil (D), s. Hebungs-Kandidat 10 weiter unten in
dieser Datei).
**PROVENIENZ:** OWNER-/ARCHITEKTEN-ENTSCHEIDUNG 2026-08-27. Wörtlich übernommen am
2026-09-08 aus dem Kopf von `docs/aktiver-stand.md`, VERMERK 2026-08-27, **vor deren
Löschung** — jener Text sagte über sich selbst, er sei "die einzige Stelle im Repo, an der
das steht", und eine Gegenprobe am Repo (CC, 2026-09-08) hat das bestätigt.

**WOHER SIE STAMMT:** Herausgeschnitten am 2026-09-08 aus `docs/aktiver-stand.md`,
Stand `57c9231` (9 967 Zeilen, 702 038 B). Es ist Schritt 2 der Teilung, deren Zuschnitt
in der Steuerdatei unter "## Die Teilung der Standdatei — Zuschnitt in drei Schritten"
steht.

**DER INHALT IST ZEICHENGLEICH ÜBERNOMMEN.** Kein Satz umformuliert, keine Überschrift
umbenannt, keine Nummer neu vergeben, nichts umsortiert. Belegt per Prüfsumme über die
zwei übernommenen Bereiche, erhoben VOR dem Eingriff an `git show HEAD:docs/aktiver-stand.md`
und nach dem Schreiben an dieser Datei gegengeprüft:

· die elf Zuschnitte (Quellzeilen 426–4029 OHNE die drei herausgelösten Blöcke, 3 091
  Zeilen, 217 042 B)
  sha256 = 73fa7aa6de5c535371fc850aae6464803e6f23aaa652dc41667ffc93645f80d3
· die fünfzehn Vermerke (Quellzeilen 4030–6433, 2 404 Zeilen, 156 839 B)
  sha256 = 639fe1eda798af4834a4c99a227a0e35513643dae06e6a9a258f274d3b385d2d

**DREI BLÖCKE SIND NICHT MITGEWANDERT** — sie waren nicht abgelaufen und stehen heute in
der Steuerdatei. An jeder der drei Stellen steht unten ein Zeiger, der sagt, was dort
stand und wohin es gegangen ist. **OHNE IHN WÄRE NICHT ZU UNTERSCHEIDEN, OB ETWAS
UMGEZOGEN ODER NIE DA GEWESEN IST.**

**SIE LIEGT UNTER `docs/claude-history/`, WÄHREND IHRE PHASE LÄUFT — ALS EINZIGE DATEI
DIESES ORDNERS, UND DAS IST ABSICHT.** Sie trägt ihren ENDNAMEN von Anfang an, also
jenen, den sie am Phasenende ohnehin bekäme. Damit entfällt das Umbenennen am
Phasenende, und mit ihm die Fehlerklasse, die
`docs/claude-history/phase-11.8-autorisierungsschicht.md` bis heute
festhält: Dort zitieren sechs Quelldateien einen Pfad, weshalb jene Datei ihren
Zwischennamen behalten musste.
**STEMPEL 2026-09-08 — DER SATZ DARÜBER BLEIBT WÖRTLICH:** Jene Datei ist an diesem Tag
umgezogen, die Fehlerklasse ist damit behoben statt offen; die volle Auflösung steht in
ihrem Kopf. **DER ENDNAME VON ANFANG AN BLEIBT DIE RICHTIGE ANTWORT** — er erspart genau
den Umzug, den jene Datei nachholen musste.
**SIE WÄCHST WEITER**: Jeder künftige Abschluss-Vermerk
dieser Phase wird hier angefügt, nicht in der Steuerdatei. **WER AUS DEM ORDNERNAMEN
SCHLIESST, DIE PHASE SEI ABGESCHLOSSEN, LIEST FALSCH** — der Marker der Phase 11.2 steht
in CLAUDE.md, und er steht auf `[ ]`.

**WARNUNG FÜR JEDEN, DER IN DIESER DATEI AUF EINE ÜBERSCHRIFT ANKERT — ZWEI TITEL SIND
ZEICHENGLEICH:** `### Vollzogen — was hier stand und wohin es gegangen ist` steht
ZWEIMAL, einmal im Zuschnitt "Scheibe 11.2a" und einmal im Zuschnitt "Die Erneuerung des
Zugangsdatums — Scheibe 1a". **DER ERSTE TREFFER EINER SUCHE IST SYSTEMATISCH DER EINE
VON BEIDEN, UND WELCHER, IST AN DER SUCHE NICHT ZU SEHEN.** Die beiden sind hier
zusammengetroffen, weil sie in der Quelldatei bereits nebeneinander standen; mitgewandert
ist die Kollision, nicht entstanden. Es gilt "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN
EINER DATEI MIT VERZEICHNIS NICHT" (docs/immer-beachten.md): Wer hier bearbeitet, ankert
NICHT auf diese Überschrift, sondern auf den umgebenden Zuschnitt-Titel — und benutzt das
Editier-Werkzeug.

**DIE NUMMERN SIND STABIL UND WERDEN NIE NEU VERGEBEN.** Vermerke 1–15 tragen hier
dieselben Nummern wie zuvor; Vorrat (1–59) und Hebungs-Kandidaten (1–8) liegen in ihren
eigenen Dateien und behalten ihre Nummern ebenfalls — über alle drei Dateien hinweg.

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

### HERAUSGELÖST — die acht Entscheidungen vom 2026-08-29

**WAS HIER STAND:** der Abschnitt "Die Entscheidungen vom 2026-08-29 — ACHT, und sie
binden über diese Scheibe hinaus" (68 Zeilen, 4 908 B), mit den Entscheidungen P1, P2,
P3, A-3, A-4, B-1, B-2, B-3 und der neunten Änderung B-4.

**WOHIN ES GEGANGEN IST:** in die Steuerdatei `docs/aktiver-stand.md`, Abschnitt
"Entscheidungen, die über ihre Scheibe hinaus binden", dort hinten angefügt. **Wortlaut
und Überschrift unverändert.**

**WARUM:** Der Abschnitt sagt in seinem eigenen Titel, dass er über seine Scheibe hinaus
bindet. Das Archiv trägt Abgelaufenes; eine bindende Entscheidung ist das Gegenteil
davon. Wäre sie mit dem Zuschnitt gewandert, läge sie in der Datei, die per Definition
nicht mehr gilt — und die nächste Scheibe wäre gegen Entscheidungen gebaut worden, die
sie nicht mehr findet. **Nichts hätte das gemeldet.**

**DIESER ZEIGER IST NEUER TEXT** und liegt ausserhalb der Prüfsumme über die Zuschnitte.

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

### HERAUSGELÖST — die drei Entscheidungen nach den sechs Festlegungen

**WAS HIER STAND:** der Abschnitt "Drei Entscheidungen, die nach den sechs Festlegungen
gefallen sind — sie binden gleich" (70 Zeilen, 4 947 B), mit den Entscheidungen (A) der
Verbinden-Weg ist nicht vorablade-fähig, (B) die Ergebniscodes als drei Fälle statt
dreizehn Texten, (C) `GOOGLE_TARGET` bleibt routen-lokal.

**WOHIN ES GEGANGEN IST:** in die Steuerdatei `docs/aktiver-stand.md`, Abschnitt
"Entscheidungen, die über ihre Scheibe hinaus binden", dort hinten angefügt. **Wortlaut
und Überschrift unverändert.**

**WARUM:** derselbe Grund wie beim Block darüber — der Titel sagt "sie binden gleich".
Eine bindende Entscheidung gehört nicht in ein Archiv abgelaufener Anweisungen.

**DIESER ZEIGER IST NEUER TEXT** und liegt ausserhalb der Prüfsumme über die Zuschnitte.

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

### HERAUSGELÖST — "1b als Folgetask" mit seinen fünf Vorbedingungen

**WAS HIER STAND:** der Abschnitt "1b als Folgetask — nicht geschnitten, mit fünf
Vorbedingungen" (375 Zeilen, 27 888 B) — der grösste Einzelblock der elf Zuschnitte.

**WOHIN ES GEGANGEN IST:** in die Steuerdatei `docs/aktiver-stand.md`, als eigener
Abschnitt "## Die offene Arbeit 1b — der herausgelöste Block aus dem Transport-Zuschnitt".
**Wortlaut und Überschrift unverändert**; die `##`-Zeile darüber ist eine neue Klammer und
nicht der Titel des Blocks.

**WARUM:** Er steht formal unter dem Transport-Zuschnitt, beschreibt aber ausdrücklich
NICHT Geschnittenes, sondern die fünf Vorbedingungen einer noch nicht geschnittenen
Arbeit. **Er ist nicht abgelaufen** — er ist das einzige Stück offener Arbeit, das
innerhalb eines abgelaufenen Zuschnitts lag.

**DIESER ZEIGER IST NEUER TEXT** und liegt ausserhalb der Prüfsumme über die Zuschnitte.

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
  2026-09-03): Im Produktivcode gibt es **kein Muster für eine Bedingungs-Schreibung** (die
  ZWEI `update` mit Rückgabe — `saveProject` und `saveVariantB` — filtern auf Identität und
  Eigentum, nicht auf einen
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

  **ZWEITER VERMERK 2026-09-04 — BEIDE NACHHOLUNGEN LIEGEN JETZT VOR. DER TEXT DARÜBER
  BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN. DIE AUFLAGE IST DAMIT
  EINGELÖST UND NICHT AUFGEHOBEN.**
  **DIE ZWEITE NACHHOLUNG — DIE FRAGE NACH DER RÜCKMELDUNG EINER BEDINGTEN SCHREIBUNG:
  GEMESSEN.** **GEMESSEN 2026-09-04 (OWNER), ACHT Aufrufe gegen den echten Endpunkt**, mit
  Sichtbarkeits-Beleg vor der ersten Schreibung und unabhängiger Gegenlesung danach.
  **DER VOLLTEXT STEHT NICHT HIER**, sondern an zwei Orten: der geschlossene Eintrag "DIE
  RÜCKMELDUNG EINER BEDINGTEN SCHREIBUNG ÜBER PostgREST IST UNGEMESSEN" in
  docs/offene-punkte.md, und das Protokoll je Messung im Feld `VERIFIZIERT` von
  `supabase/checks/bedingte-schreibung-probe.sql`.
  **WAS DER RIEGEL DAMIT HAT — EINE AUSKUNFT DARÜBER, OB ER GEGRIFFEN HAT, AUF DREI
  WEGEN:** die Kopfzeile `Content-Range` schon im VORGABEFALL, die Länge der Menge unter
  `return=representation`, und `406`/`PGRST116` unter Singular-Anforderung; `count` zählt
  dabei die **BETROFFENEN** Zeilen und nicht die Tabelle.
  **WAS ER WEITERHIN NICHT HAT, UND DIESER SATZ IST DER GRUND FÜR DIESEN VERMERK: DIE
  NEBENLÄUFIGKEIT IST NICHT GEMESSEN.** Zwei gleichzeitige bedingte Schreibungen sind
  **nicht gefahren worden**. **"ATOMAR HEISST NICHT SICHER" STEHT UNBERÜHRT AN DERSELBEN
  STELLE WIE VOR DER MESSUNG** (docs/plattform-befunde.md, LAUF 3, Grenze 3) — die Messung
  hat die **AUSKUNFT** beantwortet, nicht das **WETTLAUF-VERHALTEN**.
  **WER AUS "DIE VORARBEITEN SIND ERLEDIGT" LIEST, DIE NEBENLÄUFIGKEIT SEI GEKLÄRT, LIEST
  FALSCH.** Es sind zwei verschiedene Fragen an derselben Schreibung: die eine, was sie
  MELDET, die andere, was zwei von ihnen EINANDER tun.
  PROVENIENZ: die Messung **GEMESSEN 2026-09-04 (OWNER)**; dieser Vermerk ein
  **ARCHITEKTEN-VERMERK** desselben Tages. Dass die Nebenläufigkeit unberührt bleibt, ist
  eine **FOLGE** aus dem Zuschnitt der Probe (sie fährt acht Aufrufe nacheinander) und
  **keine zweite Messung**.

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

## Der Riegel gegen die verlorene Schreibung — Scheibe 1b-2b des Schritts 1b-2 der Scheibe 1b

**DIE NOMENKLATUR IST AN IHREM ORT AUFGELÖST UND WIRD HIER NICHT WIEDERHOLT:** "1b" ohne
Suffix meint das PAKET, "1b-2" den TAKT, "1b-2a" und "1b-2b" die beiden Scheiben INNERHALB
des Schritts 1b-2. Der Volltext steht im Kopf des Abschnitts "Die Rettung am Beacon —
Scheibe 1b-2a des Schritts 1b-2 der Scheibe 1b"; zweimal geschrieben liefe er auseinander.
**ES ENTSTEHT KEINE NEUE NUMMER NEBEN 1b, UND ES GIBT WEITERHIN KEINE SCHEIBE 1c.**
**MIT DIESER SCHEIBE IST DER SCHRITT 1b-2 VOLLSTÄNDIG GESCHNITTEN** — der Nachtrag am Kopf
des Abschnitts "1b als Folgetask" sagt, 1b-2 sei "weder offen noch erledigt, sondern halb";
diese Hälfte ist die zweite.

**DER TITEL WEICHT ABSICHTLICH VON DENEN DER VIER ANDEREN ZUSCHNITTE DIESER FAMILIE AB**
("Die Klammer um die Erneuerung …", "Die Rettung am Beacon …", "Die Ampel an der Ziel-Karte
…"): Zwei ähnlich gebaute `##`-Überschriften in DERSELBEN Datei machen jeden Such-Anker
mehrdeutig, und der erste Treffer wäre systematisch der falsche (docs/immer-beachten.md,
"EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT").
**DIE TITEL-ZITATE IN DIESEM ABSCHNITT STEHEN OHNE `###`-MARKE** — die Auflage aus dem
Zusatz vom 2026-08-27 zu derselben Regel.

**PROVENIENZ — GETRENNT GEFÜHRT, aus demselben Grund wie bei 1b-1 und 1b-2a:**
· **OWNER-GO 2026-09-04** für den Zuschnitt dieser Scheibe.
· **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-04:** die Wahl der Klartext-Spalte `secret_version`
  gegen jede Uhr-basierte Bedingung, und die Verwerfung des Eindeutigkeits-Bruch-Kandidaten.
· **PROVENIENZ DES ÜBRIGEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
  ARCHITEKTEN-ZUSCHNITT 2026-09-04, auf Owner-GO. Keine Messung.**
  **EINE SAMMEL-PROVENIENZ FÜR DIE GEMESSENEN ANGABEN STEHT HIER AUSDRÜCKLICH NICHT, UND
  DER GRUND IST DER FALL SELBST:** Die erste Fassung dieses Kopfes schrieb ALLE mit
  GEMESSEN gekennzeichneten Angaben der Aufklärungsrunde desselben Tages zu — **für VIER
  von ihnen traf das nicht zu; sie sind erst in der Doku-Runde erhoben worden.** Eine
  Herkunft, die für einen Teil der Menge stimmt, ist nicht schwächer als eine richtige,
  **sondern falsch** — und sie ist die gefährlichere Bauform, weil an ihr nichts rot wird.
  **JEDE GEMESSENE ANGABE TRÄGT IHRE HERKUNFT AB JETZT AN SICH SELBST**, samt der Runde,
  in der sie erhoben wurde. Als Ort steht der SYMBOLNAME und nie eine Zeilennummer —
  Fortschreibungs-Regel dieser Datei.

### Was die Scheibe 1b-2b ist

**Zwei gleichzeitige Erneuerungsläufe schreiben heute dieselbe Zeile in `project_secrets`,
und jeder schreibt UNBEDINGT.** Der Schreibpfad ist der Upsert in `refreshAccessToken`
(src/lib/oauth/token-refresh.ts) mit `onConflict` auf `project_id,target`. **DER SPÄTERE
SCHREIBER GEWINNT — unabhängig davon, wer das jüngere Zugangsdatum hält.** Diese Scheibe
setzt an genau diese Stelle einen Riegel.

**ES IST KEIN ISOLATIONSLECK, UND DIESER SATZ STEHT ZUERST:** Kein Tenant sieht Daten eines
anderen. **DER SCHADEN WÄRE EIN VERLORENER ZUGANG:** Entwertete Google bei Ausstellung eines
neuen Zugangsdatums das vorherige, hinterliesse ein spät schreibender Lauf ein **TOTES Token
mit einem Ablaufzeitpunkt in der ZUKUNFT** — der Resolver hielte es für brauchbar und
erneuerte **nie**. **Das ist genau der stumme Fehlzustand, gegen den diese Phase gebaut
wird.**

**OB GOOGLE SO VERFÄHRT, IST UNGEMESSEN** — Vorrats-Eintrag 9, ZWEITE Achse ("AUSSTELLUNGS-
UND SCHREIBREIHENFOLGE KÖNNEN DIVERGIEREN"), dort ausdrücklich als ungemessen geführt, und
derselbe Sachverhalt steht als ACHSE 2 im Kommentarkopf von src/lib/oauth/token-refresh.ts.
**DER RIEGEL IST UNABHÄNGIG DAVON RICHTIG, WIE DIE MESSUNG AUSFIELE** — er kostet wenig und
deckt einen Fall, den niemand beobachten kann, solange er nicht eintritt.
**DER VORRATS-EINTRAG 9 IST IN DIESER RUNDE NICHT ANGEFASST WORDEN**, und das ist Scope und
kein Urteil: Sein Vermerk entsteht mit dem Abschluss-Vermerk dieser Scheibe, nicht mit ihrem
Zuschnitt.

### Der Befund, der die Form des Riegels entscheidet

**GEMESSEN am Repo (CC, 2026-09-04), Aufklärungsrunde desselben Tages: ZUGANGSDATUM,
ERNEUERUNGS-TOKEN UND ABLAUFZEITPUNKT LIEGEN GEMEINSAM ALS CHIFFRAT IN `secret_enc`. Es gibt
für keines der drei eine KLARTEXT-SPALTE.** Sichtbar werden sie ausschliesslich über
`decryptSecret` (src/lib/secrets/cipher.ts) und `parseOAuthPayload`
(src/lib/secrets/oauth-payload.ts).

**DARAUS FOLGEN ZWEI DINGE, UND SIE SCHLIESSEN DIE BEIDEN NAHELIEGENDEN BAUFORMEN AUS:**
· **EINE BEDINGUNGS-SCHREIBUNG GEGEN DEN HEUTIGEN ZUSTAND IST UNMÖGLICH.** Die Datenbank
  kann nicht in das Chiffrat hineinvergleichen; es gibt kein Feld, gegen das ein Filter
  laufen könnte.
· **EIN ANSPRUCH ÜBER EINEN EINDEUTIGKEITS-BRUCH HAT KEINE QUELLE.** Die einzige
  Eindeutigkeit auf der Tabelle ist `project_secrets_project_id_target_key` auf
  `(project_id, target)` — **und diese Zeile EXISTIERT bereits, wenn eine Erneuerung
  läuft.** `refreshAccessToken` liest sie, bevor es schreibt; ein zweiter Schreiber
  kollidiert also nie, er überschreibt.

**DAMIT IST EIN KANDIDAT ENTSCHIEDEN, DEN DIESE DATEI BISHER OFFEN FÜHRTE**, und das gehört
hierher, weil ein verworfener Kandidat sonst wie ein übersehener aussieht: Der Zuschnitt der
Scheibe 1b-2a nennt unter "Was diese Scheibe ausdrücklich nicht baut, je mit Grund" einen
"Anspruch über einen EINDEUTIGKEITS-BRUCH statt über eine Bedingungs-Schreibung" — als
Kandidat und mit dem Satz "ENTSCHIEDEN IST DAS NICHT". **ER IST HIERMIT ENTSCHIEDEN, UND
ZWAR VERWORFEN**, aus dem Grund im zweiten Spiegelstrich darüber. **Der Wortlaut jenes
Kandidaten bleibt an seiner Stelle wörtlich stehen** — er war als Aussage über seinen Tag
richtig.

**DIE DRITTE VORAUSSETZUNG IST SEIT DEM 2026-09-04 ERFÜLLT UND WIRD HIER NUR GEZEIGT, NICHT
VERDOPPELT:** Dass eine bedingte Schreibung über PostgREST verlässlich meldet, ob sie
gegriffen hat, ist **GEMESSEN 2026-09-04 (OWNER), acht Aufrufe gegen den echten Endpunkt**.
Die drei Wege und ihre Grenzen stehen im geschlossenen Eintrag "DIE RÜCKMELDUNG EINER
BEDINGTEN SCHREIBUNG ÜBER PostgREST IST UNGEMESSEN" (docs/offene-punkte.md) und im Feld
`VERIFIZIERT` von supabase/checks/bedingte-schreibung-probe.sql. **WELCHER DER DREI WEGE
GEWÄHLT WIRD, IST HIER NICHT ENTSCHIEDEN** — das ist Sache des Bau-Plans, und die Messung
sagt es von sich selbst ("KEINE EMPFEHLUNG, WELCHER DER DREI WEGE DER RIEGEL WIRD").

### Die Entscheidung zur Klartext-Spalte

**GEWÄHLT: EINE ADDITIVE SPALTE `secret_version` (integer, not null, default 0) UND EIN
VERGLEICH-UND-SCHREIBE GEGEN DEN GELESENEN WERT.**

**DER TYP IST AM 2026-09-05 VON `bigint` AUF `integer` NACHGEZOGEN — SACHKORREKTUR, KEIN
STEMPEL. DER GRUND STEHT AN GENAU EINER STELLE UND WIRD HIER NICHT VERDOPPELT:** am ersten
Stück unter "Was gebaut wird — fünf Stücke". **DIESE ZEILE IST DIE ZWEITE FUNDSTELLE
DERSELBEN ANGABE**, und sie ist in dieser Runde eigens gesucht worden — eine halb
korrigierte Aussage ist gefährlicher als eine ganz falsche, weil danach niemand mehr die
andere Hälfte nachliest (docs/immer-beachten.md, "WER EINE HÄLFTE EINER AUSSAGE KORRIGIERT,
MACHT DIE ANDERE ZUR FALLE").
GEMESSEN am Dateitext (CC, 2026-09-05, Doku-Runde; Achse: `bigint` über den ganzen
Riegel-Abschnitt): **ZWEI** Fundstellen der Typ-Angabe, beide nachgezogen — die dritte und
vierte Nennung stehen im Begründungs-Absatz jenes Stücks und meinen den ALTEN Typ
ausdrücklich als solchen. **Positivkontrolle:** dieselbe Achse trifft ausserhalb dieses
Abschnitts die `bigint`-Rückgabetypen dreier Migrationen, läuft also nicht leer.
**DIE ÜBRIGEN DREI ANGABEN DIESER ZEILE — additiv, `not null`, `default 0` — SIND
UNVERÄNDERT.**

**DER GRUND, DER TRÄGT — `secret_version` HÄNGT AN KEINER UHR UND HAT KEIN GEGENSTÜCK IM
CHIFFRAT.** Ein Klartext-Ablaufzeitpunkt oder eine Klartext-Ausstellungszeit wäre eine
**ZWEITE WAHRHEIT über einen Wert, der schon im Chiffrat steht** — und die Ampel aus der
Scheibe 11.2b rechnet ihn heute genau von dort aus: `classifyCredentialRow`
(src/app/projects/actions.ts) dechiffriert und liest die Nutzlast, `credentialStateFrom`
(src/lib/tracking/credential-state.ts) bildet daraus die Lage
(**GEMESSEN am Repo, CC, 2026-09-04, Doku-Runde**).
Es ist dieselbe Figur wie `domains` gegen `settings.hosting.label`
(docs/immer-beachten.md, "DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT ÜBER 'IST DIESES
PROJEKT LIVE?'"). **Ein Zähler hat diese Figur nicht: er beschreibt nichts, was anderswo
schon beschrieben wäre.**

**DER ZWEITE GRUND — DIE AUFLÖSUNG DER UHR REICHT FÜR DAS ENGSTE RENNEN NICHT.** Google
liefert `expires_in` als **ganze Sekunden**. Zwei Läufe in derselben Sekunde erzeugen
denselben Ablaufzeitpunkt; ein Vergleich darauf **versagte im ENGSTEN Rennen — also genau
dort, wo der Riegel gebraucht wird — UND SÄHE DABEI AUS, ALS HÄTTE ER GEGRIFFEN.**
**PROVENIENZ DIESER ZWEITEN BEGRÜNDUNG: die Sekunden-Auflösung von `expires_in` ist GELESEN
und NICHT GEMESSEN.** Wer sie als Messwert zitiert, zitiert eine Doku-Lesung.

**DER BEFUND (1) DES ZUSCHNITTS ZU SCHRITT 1b-1 WIRD DAMIT NICHT GEBROCHEN, SONDERN
EINGELÖST**, und dieser Absatz steht hier, damit die nächste Runde in der neuen Spalte
keinen Verstoss liest: Jener Befund ("DER ABLAUFZEITPUNKT STECKT IM CHIFFRAT, IN KEINER
SPALTE") argumentiert gegen eine **KLARTEXT-SPALTE NEBEN DEM CHIFFRAT** — gegen eine zweite
Wahrheit über DENSELBEN Zeitpunkt. **`secret_version` ist keine.** Der gleichlautende
Ausschluss in "Was ausdrücklich draussen bleibt, je mit seinem Grund" (Zuschnitt 1b-1) nennt
ausdrücklich "KEINE KLARTEXT-SPALTE FÜR DEN ABLAUFZEITPUNKT" und band ohnehin nur jenen
Schritt.

### Was gebaut wird — fünf Stücke

**DIE ZAHL IM TITEL STAND BIS ZUM 2026-09-05 AUF VIER UND IST NACHGEZOGEN, NICHT
GESTEMPELT** — sie beschreibt eine Aufzählung, die unmittelbar darunter steht, und zwei
Zahlen nebeneinander liessen den Leser die falsche nehmen. **DASS SIE ÜBERHAUPT IM TITEL
STEHT, IST HIER NICHT ENTSCHIEDEN WORDEN:** Diese Datei führt an zwei Köpfen den Grundsatz
"KEINE STÜCKZAHL IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK", und dieser Titel widerspricht
ihm — dieselbe Lage wie beim Titel des Abschnitts "1b als Folgetask", wo sie ebenfalls
ausdrücklich aussteht. **Hier ist die Zahl richtiggestellt, nicht die Bauform.**
GEMESSEN am Dateitext (CC, 2026-09-05, Doku-Runde): Der Titel wird von KEINER Stelle im
Repo zitiert; das Nachziehen macht keinen Zeiger tot.

· **DIE MIGRATION AUF `public.project_secrets`, ADDITIV:** `secret_version integer not null
  default 0`. **DIE NUMMER IST DIE NÄCHSTE FREIE** — sie steht hier ausdrücklich nicht,
  weil eine geratene Nummer beim Bau still danebengreift. **KEIN BACKFILL; DER DEFAULT
  TRÄGT.**
  **DER TYP IST AM 2026-09-05 VON `bigint` AUF `integer` GEÄNDERT WORDEN, UND DER GRUND
  MUSS MIT, sonst wird er beim nächsten Aufräumen als Verengung zurückgedreht:** Ob
  PostgREST einen `bigint` als JSON-ZAHL oder als ZEICHENKETTE ausliefert, ist in diesem
  Projekt **UNGELESEN UND UNGEMESSEN** (BEFUND der Stufe 1, CC, 2026-09-05). Bei einer
  Zeichenkette ergäbe "gelesener Wert + 1" eine **VERKETTUNG statt einer Summe** — der
  Riegel schriebe **still** eine falsche Version, und nichts würde davon rot. `int4` ist
  unzweideutig eine Zahl. **DIE FRAGE WIRD DAMIT BESEITIGT UND NICHT ABGESICHERT**; das
  ist der Unterschied zu einer defensiven Umwandlung, und er ist der ganze Punkt.
  **DER PREIS IST BENANNT UND KLEIN:** Zwei Milliarden Erneuerungen auf EINER Zeile
  erreicht niemand.
  PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-05 auf dem Befund der Stufe 1. Dass die
  Auslieferungsform ungemessen ist, ist ein **NICHT-BEFUND MIT BENANNTER REICHWEITE**
  (docs/plattform-befunde.md, LAUF 3 — dort ist zur Typ-Auslieferung nichts gelesen), keine
  Messung an der Schnittstelle.
· **`secret_version` UND `id` WERDEN BEIM LESEN DER ZEILE MITGELADEN UND BIS ZUR SCHREIBUNG
  DURCHGEREICHT.** Lesen und Schreiben liegen beide INNERHALB von `refreshAccessToken`
  (**GEMESSEN am Repo, CC, 2026-09-04, Doku-Runde**) — es entsteht damit **keine** neue
  Schnittstelle und **kein** neuer Parameter an einem Aufrufer.
  **`id` IST AM 2026-09-05 DAZUGEKOMMEN**, und ihr Grund steht am Filter darunter.
· **DER ERNEUERUNGS-UPSERT WIRD AUF EIN BEDINGTES `update` UMGESTELLT:** Filter auf `id`,
  `project_id`, `target` **UND** `secret_version` = gelesener Wert; gesetzt werden
  `secret_enc` und `secret_version` = gelesener Wert + 1. **DIE RÜCKMELDUNG WIRD
  AUSGEWERTET.**
  **DIE `id` IM FILTER IST AM 2026-09-05 DAZUGEKOMMEN, UND SIE SCHLIESST EINEN FALL, DEN
  DIE ZAHL ALLEIN NICHT SIEHT:** Ein Vergleich allein auf `secret_version` unterscheidet
  eine **NEU ANGELEGTE** Zeile nicht von der gelesenen. Nach Trennen und Neu-Verbinden
  trägt die neue Zeile den Default `0` — und ein Lauf, der `0` gelesen hatte, **gewänne
  gegen sie** und überschriebe das frisch verbundene Zugangsdatum mit dem aus dem alten,
  entfernten Zugang. **MIT DER `id` VERGLEICHT DER RIEGEL ZEILEN-IDENTITÄT UND
  VERSIONSSTAND**, nicht nur eine Zahl.
  **`project_id` UND `target` BLEIBEN TROTZDEM IM FILTER:** Redundanz auf einer
  Geheimnis-Tabelle ist Absicht, nicht Nachlässigkeit — sie kostet nichts und hält den
  Filter auch dann auf der Zeile DIESES Projekts, wenn die `id` je aus einer anderen
  Quelle käme.
  PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-05. Der Fall selbst ist **AM
  KONTROLLFLUSS ABGELESEN** (Fall B aus Gate G6 der Stufe 1, CC, 2026-09-05) und
  **NICHT GEMESSEN** — es ist kein solcher Lauf beobachtet worden.
· **DER RÜCKMELDUNGS-WEG IST DIE MENGENLÄNGE UNTER `return=representation`** — Weg 2 der
  Messung vom 2026-09-04 (OWNER, acht Aufrufe; Protokoll im Feld `VERIFIZIERT` von
  `supabase/checks/bedingte-schreibung-probe.sql`, Messung M-4): Null-Treffer eine LEERE
  Menge, Ein-Treffer eine Menge aus EINEM Objekt.
  **GRUND: die wenigsten beweglichen Teile und keine Kopfzeilen-Auswertung.**
  **WARUM NICHT WEG 3 (`406`/`PGRST116` unter Singular-Anforderung), und das ist der
  tragende Teil dieser Wahl: ER LEGTE EINEN NORMALEN AUSGANG IN DEN FEHLERKANAL.** Ein
  verlorenes Rennen ist **kein Fehler** — und derselbe Code kann auch anderswoher kommen,
  womit der Riegel eine fremde Ursache als sein eigenes Ergebnis läse.
  **WEG 1 (die Kopfzeile im Vorgabefall) IST MIT DEM INSTALLIERTEN CLIENT NICHT
  ERREICHBAR** — GEMESSEN am Paket (CC, 2026-09-05): der Zähler wird nur bei gesetzter
  Zähl-Präferenz überhaupt gelesen, und der aufgelöste Wert trägt keine Kopfzeilen.
  **WEG 4 (der Zähler) IST ERREICHBAR UND NICHT GEWÄHLT.**
  **ZWEI AUFLAGEN GEHÖREN ZUM WEG UND SIND KEINE FUSSNOTE:**
  **(1) DIE RÜCKGABE-SPALTENLISTE NENNT AUSSCHLIESSLICH DIE VERSIONS-SPALTE — ES REIST
  KEIN CHIFFRAT ZURÜCK.** Eine Rückgabe ohne Spaltenliste holte die ganze Zeile, also auch
  `secret_enc`, in den Prozessspeicher eines Pfades, der es gerade erst hinausgeschrieben
  hat.
  **(2) DER FEHLER WIRD VOR DER MENGE GEPRÜFT.** Bei einem Fehler ist die Menge leer, und
  **"Datenbank kaputt" darf nie als "Rennen verloren" gedeutet werden** — der eine Ausgang
  holt einen Betreiber an die Zeile, der andere verwirft schweigend.
  PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-05 auf der Messung vom 2026-09-04 (OWNER)
  und der Paket-Messung vom 2026-09-05 (CC).
· **DER VERLIERER-ZWEIG:** null Treffer → **das eigene Zugangsdatum wird VERWORFEN, nicht
  geschrieben.** **Kein Wurf, kein Abbruch des umgebenden Pfades.** Sein AUSGANG ist seit
  dem 2026-09-05 entschieden — s. den Abschnitt
  "Was aus den zwei offenen Fragen geworden ist".
· **DER DEFENSIVE RIEGEL AN DER GELESENEN VERSION — DAS FÜNFTE STÜCK, NEU AM 2026-09-05.**
  Ist der gelesene Wert **keine ganze Zahl**, wird **fail-closed** abgebrochen, über einen
  **ADDITIVEN** Grund am **bestehenden** `misconfigured`-Ausgang — kein neuer Zustand, nur
  ein neues Mitglied einer Union, die heute schon elf trägt.
  **ER BLEIBT, OBWOHL DAS ERSTE STÜCK DEN FALL BESEITIGEN SOLL, und das ist der Grund für
  seinen eigenen Punkt:** Ein Wächter, der nichts kostet und den Fall fängt, den es nach
  der Typwahl **nicht mehr geben dürfte**, ist billiger als die Frage, ob die Typwahl
  wirklich überall trägt. **Er ist die zweite Schicht und nicht die erste.**
  PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-05. Keine Messung.

### Die Grenze des Riegels

**ER VERHINDERT DIE VERLORENE SCHREIBUNG, NICHT DIE FALSCHE REIHENFOLGE.** Gewinnt der
früher ausgestellte Lauf das Rennen, steht **sein** Token in der Zeile — der Riegel sorgt
dafür, dass genau ein Lauf schreibt, nicht dafür, dass der richtige es tut.

**KEIN VERFÜGBARES MITTEL LÖST DAS.** Dafür bräuchte es Googles **Ausstellungs-Reihenfolge**,
und die geben **weder unsere Uhr noch unsere Empfangszeit** her.

**DIE ZWEITE GRENZE, NEU AM 2026-09-05: DER RIEGEL DECKT DEN ERNEUERUNGSPFAD, NICHT DEN
CALLBACK.**
Verbindet der Betreiber **neu**, während ein Erneuerungslauf zwischen dem Lesen und dem
Schreiben steht, schreibt der Callback das Chiffrat **ohne Zähler-Sprung** — der
Erneuerungslauf trifft danach seine Bedingung und **überschreibt das frisch verbundene
Zugangsdatum**. **DER RIEGEL GREIFT NICHT UND MELDET ERFOLG.**
**DIE `id` AUS DEM FILTER FÄNGT DIESEN FALL NICHT**, und der Satz gehört hierher, weil sie
den NACHBARFALL fängt: Beim Neu-Verbinden **ohne** vorheriges Trennen bleibt es dieselbe
Zeile mit derselben `id`. Sie trennt "andere Zeile" von "gelesene Zeile"; sie trennt nicht
"ein anderer hat dazwischen geschrieben".
**WIE WAHRSCHEINLICH DAS IST, IST NICHT ERHOBEN** und wird hier nicht geschätzt.
**BEMERKENSWERT IST ALLEIN:** Der Callback ist die **einzige** Stelle, an der ein **MENSCH**
und ein **VERKEHRSGETAKTETER AUTOMATISMUS** dieselbe Zeile gleichzeitig anfassen können.
**WARUM SIE HIER STEHT UND NICHT ALS AUSSCHLUSS:** Ein Ausschluss sagt, was nicht gebaut
wird; eine Grenze sagt, was der Gebaute **nicht leistet**. Wer nur die Ausschluss-Liste
liest, hält den Riegel für dicht.
PROVENIENZ: **GEMESSEN am Repo (CC, 2026-09-05, Gate G4 der Stufe 1)** — der Schreibvorgang
der Callback-Route ist ein `upsert` mit Konflikt-Auflösung auf `(project_id, target)` und
trifft damit auch eine BESTEHENDE Zeile; dass dieser Fall real ist, steht in dieser Datei
bereits (VERMERK 13, Abschnitt (c), zwei Neu-Verbindungen). Die Folge daraus ist eine
**ABLEITUNG** aus dem Kontrollfluss und **keine zweite Beobachtung**.

**DIE NEBENLÄUFIGKEIT BLEIBT UNGEMESSEN.** **"ATOMAR HEISST NICHT SICHER"**
(docs/plattform-befunde.md, LAUF 3, Grenze 3) steht **unberührt**; die Messung vom
2026-09-04 hat die **AUSKUNFT** beantwortet, nicht das **WETTLAUF-VERHALTEN**. **WER AUS
DIESEM ZUSCHNITT LIEST, DIE NEBENLÄUFIGKEIT SEI GEKLÄRT, LIEST FALSCH.**

### Was die Scheibe 1b-2b ausdrücklich nicht baut, je mit Grund

· **DIE ERST-ANLAGE DER ZEILE.** Der Upsert im OAuth-Callback
  (src/app/api/oauth/google/callback/route.ts) und die Anlage über `setCapiToken`
  (src/app/projects/actions.ts) bleiben **unberührt**: Bei der ERST-Anlage gibt es **keine
  Zeile, gegen die verglichen werden könnte**, und **keine Nebenläufigkeit zweier
  Erneuerungen**.
  **DIE BEGRÜNDUNG IST AM 2026-09-05 AUF DAS ZURÜCKGESCHNITTEN WORDEN, WAS SIE TRÄGT —
  SACHKORREKTUR, KEIN STEMPEL.** Sie lautete "**Dort** gibt es keine Zeile, gegen die
  verglichen werden könnte" und sprach damit vom AUFRUF; **das ist am Code nicht wahr**.
  **GEMESSEN am Repo (CC, 2026-09-05, Gate G4 der Stufe 1):** Der Callback-Aufruf ist ein
  `upsert` mit Konflikt-Auflösung auf `(project_id, target)` und trifft damit **AUCH EINE
  BESTEHENDE ZEILE** — der Fall ist real und in dieser Datei bereits belegt (das
  Neu-Verbinden ersetzt die Nutzlast ganzheitlich, s. VERMERK 13, Abschnitt (c)).
  **WARUM DIE HALBE BEGRÜNDUNG GEFÄHRLICHER WAR ALS GAR KEINE:** Sie liest sich wie eine
  Prüfung, und wer sie glaubt, sucht die Lücke nicht mehr. Ihr fehlender Teil steht seit
  dieser Runde als **ZWEITE GRENZE** unter "Die Grenze des Riegels".
  **DER POSTEN BLEIBT EIN AUSSCHLUSS, und das ist keine Verlegenheit, sondern eine
  Bauform-Aussage:** Ein Zähler-Sprung im Callback ist eine **EIGENE Entscheidung mit
  EIGENER Bauform** — ein Upsert kann "alt + 1" gar nicht ausdrücken, **ohne vorher zu
  lesen**. Er ist als Vorrats-Eintrag verortet und **hier NICHT entschieden**.
  PROVENIENZ: die Korrektur GEMESSEN am Repo (CC, 2026-09-05); der Wortlaut vor der
  Korrektur ist gegen `git show HEAD:docs/aktiver-stand.md` geprüft und stand dort
  (CC, 2026-09-05).
· **JEDE ÄNDERUNG AN `runRefresh`, `refresh-run.ts` UND DER BEWEIS-ROUTE.** Die Klammer aus
  1b-1 wird **GERUFEN, nicht angefasst**; der Wert wird durchgereicht, die
  Wiederholungslogik bleibt.
· **EINE ZWEITE WAHRHEIT ÜBER ABLAUF ODER AUSSTELLUNG.** Kein Klartext-Ablaufzeitpunkt,
  keine Klartext-Ausstellungszeit. **Wer das später will, baut eine andere Scheibe und
  beantwortet zuerst, welche der beiden Quellen dann führt.**
· **DIE DROSSELUNG DER FEHLERZEILE (Vorrats-Eintrag 42) UND IHRE MEHRDEUTIGKEIT
  (Vorrats-Eintrag 48).** **ABER — UND DAS IST EINE AUFLAGE UND KEIN HINWEIS: DER
  VERLIERER-ZWEIG BEKOMMT EINE EIGENE, UNTERSCHEIDBARE LOG-ZEILE.** Er darf den Wortlaut
  des Resolvers **NICHT ERBEN** — dieser lautet `[capi/resolve] secret unusable` und steht
  DREIMAL in `src/lib/capi/token.ts` (**GEMESSEN am Repo, CC, 2026-09-04, Doku-Runde**);
  sonst hätte dieselbe Zeile eine **VIERTE** Ursache, und Vorrats-Eintrag 48 führt schon
  drei.
· **ALLES ZUM TRANSPORT** · **die WIDERRUFENE Verbindung** (zweite Hälfte von
  Vorrats-Eintrag 50, mit eigenem Trigger) · **DER FORWARD-VERDACHT — UND ER HAT IN DIESER
  DATEI WEDER EINE NUMMER NOCH EINEN EINTRAG.** **GEMESSEN am Dateitext (CC, 2026-09-04,
  Doku-Runde), VOR dem Entstehen dieses Absatzes**, Achse über docs/aktiver-stand.md im
  Volltext, case-insensitiv: "Forward-Verdacht" · "Fan-Out" neben "feuert" ·
  "ausschliesslich Google" · "nur Google" · "feuert"/"feuern" — **KEIN Treffer, der den
  Verdacht führt.** Positivkontrolle: dieselbe Achse fördert an "feuert" SIEBEN Stellen
  AUSSERHALB dieses Abschnitts zutage, sie läuft also nicht leer.
  **DIE ACHSE TRIFFT SEITHER IHRE EIGENE BESCHREIBUNG, und das gehört dazu, sonst zählt die
  nächste Runde nach und kommt auf eine andere Zahl:** Die Suchbegriffe stehen jetzt in
  DIESEN Zeilen. Wer nachmisst, zieht die Treffer dieses Absatzes ab.
  **ER IST GEMELDET UND NIRGENDS ABGELEGT; diese Scheibe legt ihn NICHT ab**, das wäre eine
  eigene Arbeit.

### Was aus den zwei offenen Fragen geworden ist

**DIESER ABSCHNITT HIESS BIS ZUM 2026-09-05 "Zwei offene Fragen für den Stufe-1-Prompt —
hier NICHT beantwortet" UND FÜHRTE BEIDE ALS OFFEN. BEIDE SIND BEANTWORTET; DER ABSCHNITT
IST ERSETZT UND NICHT GESTEMPELT.** Der Grund ist seine WIRKUNG und nicht seine Genauigkeit:
**Ein Abschnitt, der Beantwortetes als offen führt, lässt die nächste Instanz dieselbe Frage
erneut stellen** — er kostet also eine Runde und nicht nur eine Zeile.
GEMESSEN am Dateitext (CC, 2026-09-05, Doku-Runde): Der alte Titel wurde von **KEINER**
Stelle im Repo zitiert — die Umbenennung macht keinen Zeiger tot. **Ein NAMENSVETTER in
einer fremden Datei bleibt unberührt** und ist keiner: docs/claude-history/phase-11.1-linkedin.md
führt einen eigenen Abschnitt "Zwei offene Fragen — FRAGEN, kein Befund" samt eigenem
Zeiger; er stirbt bei einer Umbenennung HIER nicht (die Trennung von Zeiger und Namensvetter
steht als Prüfverfahren an Hebungs-Kandidat 5).

· **DIE OFFENE ANGEL IST BEANTWORTET: ERNEUERT WIRD AUSSCHLIESSLICH AUS DER EIGENEN UHR.**
  Eine **ABLEHNUNG DURCH DEN ANBIETER** löst auf **KEINEM** Pfad eine Erneuerung aus.
  **DREI BELEGE, GEMESSEN am Repo (CC, 2026-09-05, Gate G1 der Stufe 1):** Der Google-Adapter
  liest den Anbieter-Rumpf nicht und gibt bei einem Nicht-2xx nichts zurück · der Typ des
  Empfängers kann strukturell nichts melden (Vorrats-Eintrag 3, Ebene 1) · das Ergebnis des
  Fan-Outs wird am Aufrufort **weder gebunden noch gelesen**, und unmittelbar danach steht
  die leere 204. Es gibt hinter dem Fan-Out **keinen** Aufruf der Klammer.
  **DIE FOLGE, UND SIE GEHÖRT IN DEN ABSCHLUSS-VERMERK: DER RIEGEL DECKT GENAU DIE LÄUFE,
  DIE AUS DER UHR ENTSTEHEN** — die Vorsorge und die Rettung. Ein abgelehntes Zugangsdatum
  erzeugt heute **keinen zweiten Erneuerungslauf** und damit auch **keine zweite
  Schreibung**. **DER NUTZEN IST AUF DIE UHR-ACHSE BEGRENZT.**
  **DAS IST EIN BEFUND UND KEINE EMPFEHLUNG, UND ER ÄNDERT AM ZUSCHNITT NICHTS** — die
  Frage war von Anfang an als eine gestellt, die den ABSCHLUSS-VERMERK bewegt und nicht den
  Zuschnitt.
· **DER AUSGANG DES VERLIERER-ZWEIGES IST ENTSCHIEDEN: DER BESTEHENDE `ok`-AUSGANG**, mit
  den Zeitpunkten aus der **eigenen, verworfenen** Nutzlast. **KEIN fünfter Zustand.**
  **DER TRAGENDE GRUND STAND IN KEINEM DER FÜNF KANDIDATEN: JEDER ANDERE AUSGANG WÄRE EINE
  REGRESSION.** Heute schreibt der Verlierer, der Aufrufer auf dem Ingest-Pfad liest die
  Zeile danach **neu** und findet ein brauchbares Zugangsdatum — **der Beacon sendet**.
  Unter jedem Nicht-`ok`-Ausgang **überspringt** derselbe Aufrufer, und **eine Conversion,
  die heute durchgeht, ginge verloren. STILL.**
  GEMESSEN am Repo (CC, 2026-09-05, Gate G2 der Stufe 1): Die Verzweigung liegt im
  Ingest-Handler und überspringt **jeden** Ausgang ausser `ok`.
  **DER PREIS WIRD BEZAHLT UND NICHT WEGDEFINIERT: `ok` BEDEUTET AB JETZT "EIN BRAUCHBARES
  ZUGANGSDATUM WURDE BESCHAFFT" UND NICHT MEHR "ES STEHT IN DER ZEILE".** Das ist eine
  **VERENGUNG** einer bestehenden Zusage, und sie ist unsichtbar, solange niemand sie
  aufschreibt. **AUFLAGE AN DEN BAU: SIE GEHÖRT IN DEN TYP-KOMMENTAR DES ERGEBNISTYPS.**
  **WAS DAGEGEN SPRACH UND WARUM ES NICHT TRÄGT:** Die Beweis-Route berichtet dann zwei
  Ablaufzeitpunkte, die der Verlierer **nicht gelesen** hat. Sie hat **keinen Aufrufer in
  der Anwendung** (Vorrats-Eintrag 44), und ihr Kommentarkopf wird in dieser Scheibe
  **GEPRÜFT UND GEMELDET, nicht geändert** — sie steht unter Scope-Schutz.
  **DIE VIER VERWORFENEN KANDIDATEN, je ein Satz und ausdrücklich nicht ausgeschrieben:**
  `retry` führte den Verlierer in die **Wiederholung bis zum Deckel** · `dead` und
  `misconfigured` wären **sachlich falsch** — nichts ist tot, nichts fehlkonfiguriert · ein
  **fünfter Zustand** trüge die Regression oben und **ohne Begründungs-Feld zusätzlich einen
  Typfehler in einer geschützten Datei**.
  PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-05 auf den Gates der Stufe 1. Die
  Code-Aussagen sind GEMESSEN am Repo (CC, 2026-09-05); dass jeder andere Ausgang eine
  Regression wäre, ist eine **ABLEITUNG** aus jener Verzweigung und **keine zweite
  Beobachtung**.

### Dieser Zuschnitt ist verdichtet — was abgelaufen ist und was bleibt

**DIE SCHEIBE IST GEBAUT UND LIVE BEWIESEN (VERMERK 14). MIT DEM VERMERK SIND DIE
ANWEISUNGEN DIESES ZUSCHNITTS ABGELAUFEN; DIE ENTSCHEIDUNGEN SIND ES NICHT.** Verdichtet
am 2026-09-05 (CC, Doku-Runde) auf Architekten-Auftrag.

**WAS ABGELAUFEN IST — die drei gestrichenen Abschnitte, im Titel zitiert, damit die
Streichung nachweisbar bleibt** (die Zitate stehen ohne `###`-Marke, Auflage aus
docs/immer-beachten.md, Zusatz vom 2026-08-27 zu "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST
ES IN EINER DATEI MIT VERZEICHNIS NICHT"):

· **Die geschützten Invarianten der Scheibe 1b-2b** — sieben Auflagen an den BAU, alle
  eingelöst und in VERMERK 14 einzeln quittiert. **KEINE VON IHNEN GEHT VERLOREN, und
  deshalb steht hier ihr Träger und nicht nur ihr Name:** (I-2), (I-3), (I-4), (I-6) und
  (I-7) sind WÖRTLICHE Zitate aus docs/immer-beachten.md bzw. docs/db-regeln.md und gelten
  dort unverändert weiter; (I-1) trägt seit dem Bau der Kommentarkopf des Schreibvorgangs
  **und** die Läufe T16 und H12; (I-5) trägt der Achse-2-Block im Kopf von
  src/lib/oauth/token-refresh.ts, der in dieser Scheibe ergänzt und an keiner Stelle
  abgeschwächt worden ist.
· **Der Testplan und was er nicht zeigt** — eine Bauanweisung an vier Testachsen. Alle vier
  sind gebaut, und die Läufe tragen ihre Begründung seither an sich selbst. Was der Plan
  über die **Nebenläufigkeit** sagte, ist NICHT mit ihm entfallen: es steht doppelt, im
  Abschnitt "Die Grenze des Riegels" und in VERMERK 14 unter dem, was der Live-Test nicht
  gezeigt hat.
· **Das Zeitfenster dieser Scheibe** — ein PFLICHT-STOPP für die Tests DIESER Scheibe; sie
  sind gefahren, der Termin lag davor. **DER TERMIN SELBST IST NICHT GESTRICHEN:** Er stand
  schon dort ausdrücklich nur als Zeiger, und sein einziger Volltext liegt unverändert im
  Nachtrag zu Vorbedingung (iv), Abschnitt "1b als Folgetask".

**WAS BLEIBT UND WARUM — die sieben übrigen Abschnitte sind KEINE Anweisungen, sondern
Entscheidungen und Befunde, an denen die nächste Arbeit misst:** die Verwerfung des
Eindeutigkeits-Bruch-Kandidaten · **die Entscheidung zur Klartext-Spalte samt ihrem Grund**
· **die vier Filter mit ihrem Grund** und die Typwahl `integer` · **beide Grenzen des
Riegels** · die Ausschlüsse samt dem gemessenen Nicht-Befund zum Forward-Verdacht · **die
Verengung von `ok`** und der Ausgang des Verlierer-Zweiges.
**SIE SIND NICHT ANGETASTET WORDEN** — die Verdichtung hat gestrichen, nicht umgeschrieben.

## Der Schlüssel kommt aus der Spalte — eine zweite Fix-Scheibe ausserhalb des Schnitts

**SIE IST KEINE SCHEIBE DES SCHNITTS, UND DAS IST DER ERSTE SATZ, WEIL ER SONST FALSCH
ERSCHLOSSEN WIRD.** Der Schnitt der Phase 11.2 (bindende Entscheidung (6)) hat **1a, 1b, 2,
3 und 4** — mehr nicht; der Nachtrag am Ende der Entscheidung (7) sagt ausdrücklich, die
Aufzählung behalte ihre fünf Stücke. **SIE LIEGT AUCH NICHT AUF DER PHASEN-ACHSE**, auf der
11.2a und 11.2b liegen. **SIE HAT KEINE NUMMER UND BEKOMMT KEINE** — dieselbe Einordnung
wie bei der Fix-Scheibe zur Rückkehr in das gestartete Projekt, und aus demselben Grund:
Sie behebt einen Defekt, der beim Bauen einer anderen Scheibe sichtbar geworden ist.
**OB SIE STATTDESSEN EINE NUMMER AUF DER PHASEN-ACHSE BEKÄME (11.2c), IST HIER NICHT
ENTSCHIEDEN UND AUSDRÜCKLICH NICHT VORGESCHLAGEN** — das wäre eine eigene Festlegung.

**DER TITEL WEICHT ABSICHTLICH VON DEM DER ERSTEN FIX-SCHEIBE AB** ("Die Rückkehr in das
gestartete Projekt — eine mitgereiste Fix-Scheibe"): Zwei ähnlich gebaute `##`-Überschriften
in DERSELBEN Datei machen jeden Such-Anker mehrdeutig, und der erste Treffer wäre
systematisch der falsche (docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES
IN EINER DATEI MIT VERZEICHNIS NICHT"). **DIE TITEL-ZITATE IN DIESEM ABSCHNITT STEHEN OHNE
`###`-MARKE** — die Auflage aus dem Zusatz vom 2026-08-27 zu derselben Regel.
**DIE GRENZE DER KOLLISIONSPRÜFUNG GEHÖRT DAZU, sonst wird sie stärker gelesen, als sie
ist:** Der volle Titel und seine führende Wortgruppe sind in dieser Datei **einmalig**; das
Bruchstück "Fix-Scheibe" ist es **nicht**. Wer auf das Bruchstück ankert, trifft weiterhin
mehrdeutig — die Eindeutigkeit hängt an der führenden Wortgruppe.
PROVENIENZ DER KOLLISIONSPRÜFUNG: **GEMESSEN am Dateitext (CC, 2026-09-07, Doku-Runde)**,
Achse: der volle Titel, die führende Wortgruppe und die Bruchstücke "Fix-Scheibe",
"mitgereiste" und "ausserhalb des Schnitts" über die ganze Datei, case-insensitiv, gegen
Überschriften UND gegen Titel-Zitate in Verdichtungs-Listen. **POSITIVKONTROLLE:** dieselbe
Achse trifft "Fix-Scheibe" siebenundzwanzigmal und "mitgereiste" dreimal, sie läuft nicht
leer.

**PROVENIENZ — GETRENNT GEFÜHRT, aus demselben Grund wie bei 1b-1, 1b-2a und 1b-2b:**
· **OWNER-GO 2026-09-07** für diesen Zuschnitt.
· **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07** für die Wahl unter vier Wegen (s. den Abschnitt
  dazu unten), gefallen auf der Aufklärung desselben Tages.
· **PROVENIENZ DES ÜBRIGEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
  ARCHITEKTEN-ZUSCHNITT 2026-09-07, auf Owner-GO. Keine Messung.**
  **EINE SAMMEL-PROVENIENZ FÜR DIE GEMESSENEN ANGABEN STEHT HIER AUSDRÜCKLICH NICHT** —
  dieselbe Auflage, die der Zuschnitt der Scheibe 1b-2b sich selbst gegeben hat, nachdem
  eine Sammel-Herkunft dort für vier Angaben nicht zutraf. **JEDE GEMESSENE ANGABE TRÄGT
  IHRE HERKUNFT AN SICH SELBST**, samt Erheber, Datum und Runde. Als Ort steht der
  SYMBOLNAME und nie eine Zeilennummer — Fortschreibungs-Regel dieser Datei.

### Woran diese Scheibe ansetzt

**DER ERZEUGER DES DOKUMENTS LIEST DEN EINSTELLUNGS-BLOB, DIE AUFLÖSUNG LIEST DIE SPALTE —
UND DER GOOGLE-WEG BEFÜLLT NUR DIE SPALTE.** Ein Projekt, das ausschliesslich über den
Google-Autorisierungs-Fluss konfiguriert wurde, trägt deshalb **keinen Conversion-Beacon im
veröffentlichten Text**.

**DIE KETTE, GLIED FÜR GLIED — GEMESSEN am Repo (CC, 2026-09-07, Aufklärungsrunde):**
`setCapiToken` (src/app/projects/actions.ts) bricht für ein Ziel **ohne Geheimnis-Feld VOR
jedem Datenbank-Zugriff** ab; `'google'` ist ein solches Ziel · der Verbinden-Weg der Karte
führt stattdessen über die Start-Route, und die Rückkehr-Route fasst `projects`
ausschliesslich lesend an und ruft `ensureTrackingKey` **nicht** · `ensureTrackingKey` läuft
damit nur in `setCapiToken` und in `publishProject`, und `publishProject` schreibt den Wert
**allein in die Spalte** — sein Settings-Patch geht über `setHostingState`, und die Funktion
fasst den `capi`-Zweig nicht an · die zwei Erzeuger des Dokuments — der Vorschau-Memo und
`buildDocumentFor` (beide src/components/CodeImporter.tsx) — lesen über `getTrackingKey`
den **Blob** · `buildCapiBeaconStatement` (src/lib/tracking/meta.ts) kehrt bei leerem
Schlüssel mit einer **leeren Zeichenkette** zurück, und ohne Meta-Pixel entsteht dann
überhaupt keine Laufzeit.

**DIE SEITE SIEHT FUNKTIONIEREND AUS, UND DAS IST DER GRUND, WARUM DER FEHLZUSTAND STILL
IST.** Der PageView-Emitter wird **server-seitig** injiziert und bezieht seinen Schlüssel
aus der **Spalte** (`injectPageViewEmitter`, gerufen in `publishProject`). **Die Ansicht
zeigt also Verkehr, während jede Conversion fehlt.** GEMESSEN am Repo (CC, 2026-09-07).

**ES IST KEIN ISOLATIONSLECK, UND DIESER SATZ STEHT ZUERST:** Kein Tenant sieht Daten eines
anderen, kein Geheimnis verlässt den Server. **DER SCHADEN IST EINE TOTE SEITE BEI
LAUFENDEM ANZEIGENBUDGET** — der Betreiber bezahlt Klicks, die Karte sagt "Zugangsdaten
hinterlegt", die Ansicht zeigt Aufrufe, und es wird nichts gemessen.
**HEUTE TRIFFT ES NIEMANDEN AUSSER DEN OWNER** (OWNER-ANGABE 2026-09-07: keine Kunden, nur
eigene Testprojekte). **Das ist eine Aussage über den Zeitpunkt und keine über die
Schwere** — mit dem ersten fremden Nutzer ist es dieselbe Lage ohne diesen Satz.

### Der Bestand, gemessen

**GEMESSEN 2026-09-07 (OWNER), SQL-Editor**, über alle Projekte:
· **VIER von FÜNFZEHN** Projekten tragen eine **gefüllte Spalte** und einen **leeren
  Blob-Wert** — das ist die betroffene Menge.
· **SIEBEN** tragen **beide**.
· **VIER** tragen **keinen von beiden**.
· **KEINES** trägt **nur den Blob**.
· **DIE DIVERGENZ-PROBE — beide gefüllt, aber verschieden — LIEFERT KEINE ZEILE.**

**WAS DIE LETZTE ZEILE TRÄGT UND WARUM SIE EIGENS DASTEHT:** Sie ist der Grund, warum diese
Scheibe eine **Ableitung** bauen darf und keine **Zusammenführung**. Gäbe es divergente
Zeilen, wäre vorher zu entscheiden, welcher der beiden Werte gilt; es gibt sie nicht.
**DAS IST EIN BEFUND ÜBER HEUTE UND KEINE ZUSICHERUNG ÜBER MORGEN** — die Divergenz kann
weiterhin entstehen, solange vier Stellen den Blob-Wert schreiben.

**DIE VIER ZAHLEN SUMMIEREN SICH AUF FÜNFZEHN, und dass sie es tun, ist die
Positivkontrolle der Erhebung** — eine unvollständige Aufteilung wäre an der Summe
sichtbar geworden. **ABLEITUNG, KEINE ZWEITE MESSUNG.**

### Was diese Scheibe baut — vier Stücke

**DIE ZAHL IM TITEL STAND BIS ZUM 2026-09-07 AUF DREI UND IST NACHGEZOGEN, NICHT
GESTEMPELT** — sie beschreibt eine Aufzählung, die unmittelbar darunter steht, und zwei
Zahlen nebeneinander liessen den Leser die falsche nehmen. **DASS SIE ÜBERHAUPT IM TITEL
STEHT, IST HIER NICHT ENTSCHIEDEN WORDEN:** Diese Datei führt an zwei Köpfen den Grundsatz
"KEINE STÜCKZAHL IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK", und dieser Titel widerspricht
ihm — dieselbe Lage wie beim Titel "Was gebaut wird — fünf Stücke" des Zuschnitts der
Scheibe 1b-2b, wo sie ebenfalls ausdrücklich aussteht. **Hier ist die Zahl
richtiggestellt, nicht die Bauform.**
GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde): Der Titel wird von KEINER Stelle im Repo
zitiert; das Nachziehen macht keinen Zeiger tot. ACHSE: der volle Titel und das
Bruchstück "drei Stücke" über das ganze Repo, case-insensitiv, gegen Überschriften UND
gegen Titel-Zitate. **POSITIVKONTROLLE:** dieselbe Achse trifft das Bruchstück siebenmal
— es gehört dort durchweg zum ANDEREN Titel "Was hineingehört — drei Stücke" der Scheibe
1b-1 und zu dessen Verdichtungs-Zitaten; sie läuft nicht leer. **DER KÜNFTIGE WORTLAUT
KOLLIDIERT MIT KEINER ÜBERSCHRIFT** (dieselbe Achse auf "vier Stücke": ein einziger
Treffer, und der ist ein Verdichtungs-Satz zur Scheibe 1b-2a, keine Überschrift).

· **`loadProject` (src/app/projects/actions.ts) BEKOMMT DIE SPALTE IN DIE PROJEKTION UND IN
  DEN RÜCKGABETYP `ProjectRow`** — in der Bauform der bestehenden server-autoritativen
  Nachbarn. **DER PRÄZEDENZFALL STEHT IM SELBEN TYP UND WIRD NICHT ERFUNDEN:** `ab_test_active`
  ist ebenfalls server-autoritativ, hat eine eigene Spalte und liegt in dieser Projektion;
  sein Kommentar sagt wörtlich, warum er **nicht** in den Einstellungs-Blob gehört — er
  würde beim nächsten Speichern still zurückgesetzt. **GEMESSEN am Repo (CC, 2026-09-07).**
· **DER CLIENT HÄLT DEN WERT IN EINEM EIGENEN ZUSTAND NEBEN `settings` UND `savedSettings`.**
  **ER WIRD AN JEDEM SAAT-PUNKT AM SELBEN ORT NEU GESETZT WIE SIE — DAS IST EINE AUFLAGE UND
  KEIN HINWEIS.** Ohne sie trüge Projekt B den Schlüssel von A, und das Dokument ginge an das
  falsche Projekt. **DIE SAAT-PUNKTE SIND VIER, NICHT ZWEI — GEMESSEN am Repo (CC,
  2026-09-07):** die Erstbelegung aus den Props, `resetToEmpty`, der Projektwechsel in
  `handleSwitch` und der Nachrück-Zweig nach dem Löschen (alle src/components/CodeImporter.tsx).
  **WER NUR DIE ZWEI LADE-PFADE BEDIENT, LÄSST DEN LEERZUSTAND UND DIE ERSTBELEGUNG OFFEN.**
· **DIE ZWEI VERBRAUCHER LESEN AUS DIESEM ZUSTAND STATT ÜBER `getTrackingKey`** — der
  Vorschau-Memo und `buildDocumentFor`. **Es sind genau diese zwei und keine weiteren:**
  Die übrigen Lesungen von `getTrackingKey` im Produktivcode reichen den Wert
  ausschliesslich an sich selbst zurück — in `removeCapiToken` und in **EINEM** Handler
  der Karten-Rückmeldung, `handleCredentialsRemoved`, der ihn **ZWEIMAL** liest — und
  speisen kein Dokument. **GEMESSEN am Repo (CC, 2026-09-07), Achse: alle Vorkommen von
  `getTrackingKey` und jeder direkte Blob-Zugriff auf das Feld über src/, Testdateien
  mitgezählt; POSITIVKONTROLLE: dieselbe Achse trifft die Definition in
  src/lib/settings.ts.**
  **HIER STAND "DEN ZWEI CLIENT-HANDLERN DER KARTEN-RÜCKMELDUNG", UND DAS IST
  RICHTIGGESTELLT — ES SIND EIN HANDLER UND ZWEI AUFRUFE** (GEMESSEN am Repo, CC,
  2026-09-07, Stufe 1). **DER SATZ WAR ALS AUSSAGE ÜBER LESUNGEN RICHTIG UND HAT DEN
  PUNKT TROTZDEM VERDECKT, und das ist der teurere Teil dieser Korrektur:**
  `handleCredentialsSaved` ruft `getTrackingKey` **GAR NICHT** — er bekommt den Schlüssel
  als Argument vom Server und **SCHREIBT** ihn. Wer nur die Lesungen zählt, sieht ihn
  nicht; **GENAU JENER SCHREIBVORGANG SPEIST HEUTE DAS DOKUMENT.** Die alte Fassung führte
  damit zu dem Schluss, an den Karten-Handlern sei nichts zu tun. **DAS IST DIE WURZEL DES
  VIERTEN STÜCKS DARUNTER.**
· **`handleCredentialsSaved` (src/components/CodeImporter.tsx) SETZT ZUSÄTZLICH DEN NEUEN
  ZUSTAND.** **GEMESSEN am Repo (CC, 2026-09-07, Stufe 1):** Dieser Handler bekommt den
  Schlüssel als Argument vom Server und schreibt ihn heute in den Einstellungs-Blob — und
  **GENAU DIESER SCHREIBVORGANG MACHT DAS DOKUMENT UNMITTELBAR NACH DEM ERSTEN SETZEN
  EINES META-ZUGANGSDATUMS BEACON-FÄHIG.** Der Kommentar über dem Handler sagt es wörtlich.
  **OHNE DAS VIERTE STÜCK ERZEUGT DIESE SCHEIBE AUF DEM META-PFAD GENAU DEN FEHLZUSTAND,
  DEN SIE AUF DEM GOOGLE-PFAD BEHEBT:** kein Beacon zwischen dem Setzen des Zugangsdatums
  und dem nächsten Laden. **EINE REPARATUR, DIE EINE REGRESSION EINBAUT, WIRD NICHT
  GEBAUT.**
  **DIE ACHSE IST EINE ANDERE ALS BEI DEN VIER SAAT-PUNKTEN, und ohne diesen Satz sucht
  man den Punkt in der falschen Liste:** Jene schützen gegen ein **LEAK ZWISCHEN
  PROJEKTEN**, dieser gegen einen **VERALTETEN ZUSTAND IM SELBEN PROJEKT**. Der Zuschnitt
  kannte den Punkt nicht, weil seine Aufzählung auf die Leak-Achse zugeschnitten war —
  **und auf DER ist sie vollständig.**
  **DAS BLOB-SCHREIBEN BLEIBT BESTEHEN.** Sein Abbau ist Vorrat 55 und nicht diese Scheibe.
  **EINE NEBENWIRKUNG, DIE MITMUSS:** Damit heilt der **META**-Pfad zugleich die
  Erst-Anlage — `setCapiToken` legt die Spalte an und gibt den Wert zurück. **DER
  GOOGLE-PFAD TUT DAS NICHT**; für ihn gilt die Grenze weiter unten unverändert.
  PROVENIENZ: **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07** auf der Stufe 1 desselben Tages,
  **OWNER-GO 2026-09-07.**

### Warum Weg C und nicht A, B oder D

**DIESER ABSCHNITT STEHT IM ZUSCHNITT UND NICHT IN EINER FUSSNOTE, WEIL EIN VERWORFENER WEG
SONST WIE EIN ÜBERSEHENER AUSSIEHT.** Vier Wege lagen vor; **PROVENIENZ DER WAHL:
ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07 auf der Aufklärung desselben Tages, Owner-GO
2026-09-07.**

· **WEG A — die Rückkehr-Route ruft `ensureTrackingKey`** und schreibt den Wert. **VERWORFEN
  AN DER SACHE, NICHT AN EINEM LESART-STREIT:** Er legt die server-vergebene Identität in
  den Einstellungs-Blob, und **ein Client-Save ohne den Wert leert sie wieder** — der Blob
  wird ganzheitlich ersetzt, ohne Read-Merge. **Eine Reparatur, die derselbe
  Speichervorgang aufhebt, ist keine.** Dass der Verlust real ist und nicht hergeleitet,
  hält ein Bestandslauf fest: der KONTRAST-Lauf in src/app/projects/actions.test.ts, der
  ausdrücklich als "rot-Beweis" führt, dass ein key-loses Client-`settings` ein
  server-eigenes Feld entfernt.
· **WEG B — `publishProject` schreibt den Wert auch in den Blob.** **VERWORFEN AUS DEMSELBEN
  GRUND**, und zusätzlich, weil der Client das Dokument **VOR** dem Server-Schreiben baut:
  das erste Publish nach der Änderung trüge weiterhin keinen Beacon.
· **WEG D — eine eigene Server-Action liefert den Schlüssel.** **VERWORFEN AM FEHLERKANAL:**
  Sie brächte einen **ZWEITEN** Kanal, der auf dieselbe Weise scheitern kann wie seine
  Nachbar-Aktion — und ein leerer Wert für "konnte nicht lesen" erzeugt **STILL keinen
  Beacon**, also genau den Bug, den diese Scheibe behebt. **Weg C holt den Wert dort, wo das
  Projekt ohnehin geladen wird: EIN Kanal, EIN Fehlerfall.**

**WAS AN DER VERWERFUNG VON A UND B AUSDRÜCKLICH NICHT HÄNGT:** die Frage, ob sie die Regel
"SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB" (docs/immer-beachten.md)
**brechen**. **DIE FRAGE IST AM CODE NICHT ENTSCHEIDBAR UND WIRD HIER NICHT ENTSCHIEDEN** —
sie hat zwei am Bestand belegbare Lesarten, und beide führen zu derselben Wahl. **Der Grund
oben trägt ohne sie.**

### Der Weg in den Client — eine neue Prop, und was sie kostet

**DIESE WAHL IST NICHT DIESELBE WIE DIE ZWISCHEN A, B, C UND D, und deshalb steht sie in
einem eigenen Abschnitt daneben:** Jene entschied, WOHER der Schlüssel kommt — aus der
Zeile, die ohnehin geladen wird. Diese entscheidet, WIE er von dort in die Komponente
gelangt. Die Stufe 1 hat sie offengelassen und drei Kandidaten mit Kosten vorgelegt.
**PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07 auf der Stufe 1 desselben Tages,
OWNER-GO 2026-09-07.**

**ENTSCHIEDEN: EINE NEUE PROP.** **GRUND:** die Bauform des server-autoritativen Nachbarn
im selben Typ — derselbe Präzedenzfall, der schon das erste Stück trägt.

· **VERWORFEN — DER WERT REIST IM BESTEHENDEN EINSTELLUNGS-BLOB-PROP.** Er baut die
  Blob-Abhängigkeit an einer **NEUEN** Stelle wieder auf, statt sie abzubauen, und ein
  späterer Client-Save legte die server-eigene Identität **dauerhaft** in den Blob.
  **DAMIT IST ER INHALTLICH DERSELBE WEG B, DEN DIESER ZUSCHNITT BEREITS VERWORFEN HAT** —
  nur eine Ebene weiter vorn. Er hätte den Vorzug gehabt, die dreizehn Läufe unten grün zu
  lassen; **genau das ist der Grund, ihm zu misstrauen** — er bliebe grün, weil er den
  Blob-Weg konserviert.
· **VERWORFEN — NACHLADEN BEIM MONTIEREN.** **WEG D UNTER ANDEREM NAMEN**, und am selben
  Fehlerkanal verworfen: ein zweiter Kanal, dessen leerer Wert still keinen Beacon erzeugt.

**DER PREIS WIRD BENANNT UND NICHT VERSCHWIEGEN: DREIZEHN BESTANDSLÄUFE BRECHEN.**
**GEMESSEN am Repo (CC, 2026-09-07, Stufe 1).** Sie seeden den Schlüssel heute über den
Einstellungs-Blob und prüfen **genau das erzeugte Dokument** — nach der Umstellung liest
der Erzeuger den Blob nicht mehr, der Schlüssel ist leer, und ohne Schlüssel entsteht kein
Beacon-Rumpf.
**SIE WERDEN NACHGEZOGEN, NICHT ANGEPASST BIS GRÜN:** derselbe Wert, nur über den Kanal,
der ihn nach dieser Scheibe trägt. **ES BLEIBT EINE ÄNDERUNG AN DREIZEHN BESTANDSLÄUFEN
UND GEHÖRT AUSDRÜCKLICH FREIGEGEBEN**, nicht nebenbei getan.

**EIN BEFUND, DER DAZUGEHÖRT UND SONST NIEMANDEM AUFFÄLLT:** Ein Lauf jener Gruppe ist die
**Abwesenheits-Behauptung ohne Schlüssel** — er behauptet, dass ohne Kennung UND ohne
Tracking-Schlüssel gar nichts im Text steht. **ER BLEIBT GRÜN UND SÄHE DADURCH STÄRKER AUS
STATT SCHWÄCHER**, während seine Nachbarn fallen. Das ist die erste Weise aus
docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL": sein
Gegenstand verschwindet aus dem Pfad, und die Behauptung geht ab da immer auf.
**ER WIRD BEIM BAU EIGENS ANGESEHEN** — nicht als Nebenprodukt der Suite, sondern als
benannter Schritt.

### Was der Zuschnitt ausdrücklich nicht baut, je mit Grund

· **DEN TOTEN BLOB-WERT ABRÄUMEN.** Nach dieser Scheibe liest ihn **kein Dokument-Erzeuger**
  mehr, und **vier Stellen schreiben ihn weiter**. **DERSELBE ZUSTAND EXISTIERT BEREITS beim
  Nachbarfeld `tokenSet` im selben Unterobjekt**, und der Bestand benennt ihn dort selbst
  als eigene Runde. **Beide zusammen abzuräumen IST diese eigene Runde und nicht diese
  Scheibe.** Als eigener Vorrats-Eintrag verortet.
· **DIE ERST-ANLAGE — ENTSCHIEDEN: SIE WIRD NICHT GEBAUT.** Ein neu angelegtes, nie
  gespeichertes Projekt trägt **weder Spalte noch Blob** — `ensureTrackingKey` läuft im
  Insert-Zweig von `saveProject` **nicht** (GEMESSEN am Repo, CC, 2026-09-07).
  **HIER STAND, DAS SEI EINE OFFENE FRAGE AN DEN STUFE-1-PROMPT; SIE IST BEANTWORTET.**
  PROVENIENZ: **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07** auf der Stufe 1 desselben Tages,
  **OWNER-GO 2026-09-07.**
  **EINE KORREKTUR AN DER KANDIDATEN-LISTE DER STUFE 1 GEHÖRT DAZU, sonst greift eine
  spätere Runde danach:** Der Kandidat "nach dem ersten Speichern nachladen" **LIEFERT
  NICHTS**. Der Insert-Zweig ruft `ensureTrackingKey` nicht, **die Spalte ist danach
  LEER** — ein Nachladen ergäbe einen leeren Schlüssel. **ER KOSTET EINEN RUNDLAUF UND
  BRINGT KEINEN WERT.**
  **GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde), ACHSE:** alle Aufrufer von
  `ensureTrackingKey` über src/, der Insert-Payload von `saveProject`, sein Ergebnistyp,
  und die Gegenprobe auf einen DB-seitigen Füllmechanismus (Vorgabewert, Trigger,
  Funktion auf der Spalte) über supabase/. **ERGEBNIS:** zwei Produktiv-Aufrufer, beide
  ausserhalb von `saveProject`; kein Vorgabewert, kein Trigger, keine Funktion. **DIE
  MIGRATION, DIE DIE SPALTE ANLEGT, SAGT ES SELBST:** Projekte ohne Key bleiben leer, die
  Identität entsteht lazy bei Publish oder beim Setzen des Zugangsdatums.
  **POSITIVKONTROLLE:** dieselbe Achse fördert für andere Gegenstände sehr wohl Trigger
  auf derselben Tabelle zutage; sie läuft nicht leer.
  **DIE ZWEI ÜBRIGEN KANDIDATEN BERÜHREN GESCHÜTZTE DATEIEN** — den Speicher- bzw. den
  Veröffentlichungs-Pfad — **und sind eigene Entscheidungen, hier nicht getroffen.**
  **DIE GRENZE, DIE DARAUS FOLGT:** Ein **FRISCH ANGELEGTES** Projekt braucht auf dem
  **GOOGLE**-Pfad weiterhin **veröffentlichen → neu laden → erneut veröffentlichen**. Auf
  dem **META**-Pfad nicht — dort greift das vierte Stück, weil das Setzen des
  Zugangsdatums die Spalte anlegt und den Wert zurückgibt.
· **EINE ANZEIGE, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST.** Der offene Punkt
  gleichen Namens (CLAUDE.md, "## Offene Punkte") trägt diese Frage mit **eingetretenem**
  Trigger. **Keiner der vier Wege berührt ihn**, und dieser hier auch nicht.
· **JEDE ÄNDERUNG AN DER OAUTH-RÜCKKEHR-ROUTE, AN `setCapiToken`, AN `publishProject` UND AM
  INGEST-PFAD.** Die drei ersten sind die Schreiber, der vierte ist der Leser der Spalte;
  diese Scheibe fasst keinen von ihnen an.
· **EIN BACKFILL.** **Weg C heilt beim nächsten Projektladen** — für jedes Projekt, das eine
  Spalte trägt. Ein Backfill wäre zudem eine Datenänderung und damit eine eigene Arbeit mit
  eigenem Pflicht-Stopp.

### Die zwei Grenzen, die mitmüssen

· **DIE VIER PROJEKTE OHNE BEIDE WERTE HEILT DIESE SCHEIBE NICHT** — dort ist nichts
  abzuleiten. Sie bekommen ihren Schlüssel **beim ersten Publish**; weil der Client das
  Dokument **VOR** dem Server-Schreiben baut, trägt **genau dieses erste Publish noch keinen
  Beacon. Erst das zweite — UND NUR MIT EINEM NEULADEN DAZWISCHEN.** **DAS IST KEIN DEFEKT
  DIESER SCHEIBE, SONDERN DIE REIHENFOLGE DES BESTANDS** — und es ist der einzige Fall, in
  dem der Betreiber zweimal veröffentlichen muss.
  **HIER STAND "ERST DAS ZWEITE" OHNE DEN NACHSATZ, UND DAS LAS SICH ZU OPTIMISTISCH.**
  **GEMESSEN am Repo (CC, 2026-09-07, Stufe 1):** Der Ergebnistyp von `publishProject`
  trägt den Schlüssel **NICHT**, und der neue Zustand wird beim **LADEN** gesät, nicht beim
  Veröffentlichen. **EIN ZWEITES PUBLISH IN DERSELBEN SITZUNG TRÄGT ALSO WEITERHIN KEINEN
  BEACON.**
  **DAS IST HEUTE GENAUSO UND KEINE VERSCHLECHTERUNG DURCH DIESE SCHEIBE** — die zweite
  Grenze darunter sagt es bereits richtig; korrigiert ist allein diese erste, die es
  verschwieg. **DER GEBRAUCHTE ABLAUF HEISST DAMIT: veröffentlichen, neu laden, erneut
  veröffentlichen.**
· **BEREITS VERÖFFENTLICHTE SEITEN WERDEN VON KEINEM DEPLOY REPARIERT.** Nötig ist: **das
  Projekt einmal laden, dann neu veröffentlichen.** **EIN PUBLISH AUS EINER SITZUNG, DIE VOR
  DEM DEPLOY GELADEN WURDE, TRÄGT DEN ALTEN, KEY-LOSEN ZUSTAND** — der Zustand wird beim
  Laden gesät, nicht beim Veröffentlichen. Es ist dieselbe Klasse wie
  docs/immer-beachten.md, "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY".

### Diese Scheibe ist verdichtet — was von diesem Zuschnitt bleibt

**DIE SCHEIBE IST GEBAUT UND LIVE BEWIESEN (VERMERK 15). MIT DEM VERMERK SIND DIE
ANWEISUNGEN DIESES ZUSCHNITTS ABGELAUFEN; DIE ENTSCHEIDUNGEN SIND ES NICHT.** Verdichtet
am 2026-09-07 (CC, Doku-Runde) auf Architekten-Auftrag.
**DER TITEL WEICHT ABSICHTLICH VON DEM DER 1b-2b-VERDICHTUNG AB** ("Dieser Zuschnitt ist
verdichtet — was abgelaufen ist und was bleibt"): Zwei zeichengleiche `###`-Überschriften
in DERSELBEN Datei machten jeden Such-Anker mehrdeutig, und der erste Treffer wäre
systematisch der falsche. GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde), ACHSE: beide
Wortgruppen dieses Titels über docs/, case-insensitiv — **null Treffer**;
**POSITIVKONTROLLE:** dieselbe Achse trifft die 1b-2b-Fassung an ihrer Überschrift, sie
läuft nicht leer.

**WAS ABGELAUFEN IST — die drei gestrichenen Abschnitte, im Titel zitiert, damit die
Streichung nachweisbar bleibt** (die Zitate stehen ohne `###`-Marke, Auflage aus
docs/immer-beachten.md, Zusatz vom 2026-08-27 zu "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST
ES IN EINER DATEI MIT VERZEICHNIS NICHT"):

· **Fünf Invarianten, die diese Scheibe schützt** — Auflagen an den BAU, alle eingelöst und
  in VERMERK 15 einzeln quittiert. **KEINE VON IHNEN GEHT VERLOREN, und deshalb steht hier
  ihr Träger und nicht nur ihr Name:** (I-1) trägt der Lauf der Projektions-Zusicherung in
  src/app/projects/actions.test.ts selbst — er vergleicht weiterhin EXAKT, und die zwei
  Nachbar-Zusicherungen stehen unangetastet daneben; (I-2) trägt der Kommentar am vierten
  Stück in `handleCredentialsSaved`, der das Fortbestehen des Blob-Schreibens ausdrücklich
  festhält, samt der Messung in VERMERK 15; (I-3) tragen die vier nummerierten
  Saat-Punkt-Kommentare in src/components/CodeImporter.tsx **und** die Läufe K3, K4 und K5;
  (I-4) trägt die Tatsache, dass die Spalte auf diesem Pfad **nur gelesen** wird — belegt
  im Scope-Nachweis des Vermerks; (I-5) ist gegenstandslos, es gab keine Migration.
· **Das Fixture-Gate — gelaufen, und was es ergeben hat** — ein GATE vor dem Bau. Es ist
  gefahren, und **seine Messung ist nicht mit ihm gestrichen:** sie steht vollständig in
  VERMERK 15, Abschnitt (a), samt Achse, Positivkontrolle, der Präzisierung neun
  Anweisungen gegen zehn Fixture-Objekte und dem Mitbefund zur unverbrauchten Attrappe.
  **Der Satz, der den Abschnitt trug, steht dort ebenfalls:** das Gate hat am richtigen Ort
  gefragt und die falsche Menge getroffen.
· **Die sieben Läufe und ihre Rot-Bedingung** — eine Bauanweisung an sieben Testachsen.
  Alle sieben sind gebaut, und **jeder Lauf trägt seine Rot-Bedingung seither an sich
  selbst**, im Testkommentar. Was der Plan über die **Memo-Abhängigkeit** sagte, ist NICHT
  mit ihm entfallen: der gemessene Befund steht in VERMERK 15, Abschnitt (e), und der
  Kommentar am Vorschau-Memo trägt ihn im Code.

**WAS BLEIBT UND WARUM — die sieben übrigen Abschnitte sind KEINE Anweisungen, sondern
Entscheidungen und Befunde, an denen die nächste Arbeit misst:** der Befund, woran die
Scheibe ansetzt · **der gemessene Bestand der fünfzehn Projekte** · **die Wahl von Weg C
samt Grund und die Verwerfung von A, B und D** · **die Wahl der neuen Prop samt ihrem Preis
von dreizehn Bestandsläufen** · die Ausschlüsse samt **der Entscheidung zur Erst-Anlage**
und der Korrektur an ihrer Kandidaten-Liste · **die zwei Grenzen**.
**SIE SIND NICHT ANGETASTET WORDEN** — die Verdichtung hat gestrichen, nicht umgeschrieben.

**EINE ABWEICHUNG VOM AUFTRAG, AUSDRÜCKLICH DEKLARIERT:** Der Abschnitt "Was diese Scheibe
baut — vier Stücke" ist eine Bauanweisung und wäre nach dem Wortlaut des Auftrags
abgelaufen. **ER BLEIBT**, aus zwei Gründen. **Der erste ist der Präzedenzfall:** Die
Verdichtung der Scheibe 1b-2b hat den gleichartigen Abschnitt "Was gebaut wird — fünf
Stücke" ebenfalls stehen lassen und nur Invarianten, Testplan und Zeitfenster gestrichen
(GEMESSEN am Repo, CC, 2026-09-07). **Der zweite wiegt schwerer:** Das vierte Stück trägt
die einzige Ausformulierung der Achsen-Trennung — Leak zwischen Projekten gegen veralteten
Zustand im selben Projekt —, und die bindet über diese Scheibe hinaus. Wer sie streicht,
nimmt den Grund mit, aus dem der Handler den Zustand überhaupt setzt.

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

**NACHTRAG 2026-09-07 — WER DIE ZWEI LÜCKEN AUS "WAS DIE MESSUNG NICHT ZEIGT" SEITHER
GESCHLOSSEN HAT. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN.**

**WARUM ERGÄNZT UND NICHT RICHTIGGESTELLT:** Dieser Vermerk ist ein **abgeschlossener
Scheiben-Vermerk**, und die zwei Spiegelstriche beschreiben die **GRENZE SEINER EIGENEN
MESSUNG** vom 2026-08-24. Als solche sind sie **unverändert wahr** — jene Messung zeigt
beides bis heute nicht. Wer sie umschriebe, machte aus einer richtigen Grenzangabe eine
Zustandsbeschreibung und nähme dem Vermerk seine Datierbarkeit.

· **ZWEITER SPIEGELSTRICH (Seite mit MEHREREN SCHRITTEN): GESCHLOSSEN, Ergebnis NEIN** — die
  Kennung überlebt die Navigation nicht. **GEMESSEN 2026-09-01 (OWNER)**, an der
  ausgelieferten Anwendung. Fundstelle: VERMERK 10, Abschnitt (b), Schritt 3 und SCHULD 3.
  **EIN GEMESSENES NEIN SCHLIESST DIE LÜCKE — verlangt war eine MESSUNG, kein günstiger
  Ausgang.**
· **ERSTER SPIEGELSTRICH (ECHTE Klick-Kennung): GESCHLOSSEN, Ergebnis JA** — eine echte, vom
  Anbieter vergebene Kennung hat den vollständigen Produktivpfad bis zum Netzruf genommen.
  **GEMESSEN 2026-09-07 (OWNER)**, am Vercel-Log des eigenen Dienstes, abgelegt als MESSUNG F
  in docs/ziel-befunde.md, Google-Abschnitt, Teil (cd). **Dass die Kennung ECHT war, ist eine
  OWNER-ANGABE 2026-09-07.**
  **DREI GRENZEN AUS (cd) GEHÖREN DAZU:** der **Statuscode** des Einlieferungs-Aufrufs war
  **nicht ablesbar** · die Zuordnung zu der beim Anbieter angenommenen Einlieferung ist eine
  **ABLEITUNG** · **welcher** der drei Kennungs-Parameter getroffen hat, ist **ungemessen**.
  **KEINE DER DREI BERÜHRT DEN WORTLAUT DES SPIEGELSTRICHS** — er fragt nach dem WEG, nicht
  nach der Antwort des Anbieters und nicht nach dem Parameternamen.

**UNBERÜHRT BLEIBT DER BLOCK "DIE GRENZE DES TRANSPORTS"** darüber: Dass eventSourceUrl nicht
persistiert wird, ist eine Aussage über den Code und von diesen zwei Messungen nicht berührt.
**Vorrats-Eintrag 59 hat sie am 2026-09-07 auf zwei unabhängigen Achsen bestätigt** (GEMESSEN
am Code, CC) — die Kennung lebt ausschliesslich im Transit.

**PROVENIENZ DIESES NACHTRAGS:** die zwei Messungen wie benannt (OWNER, 2026-09-01 bzw.
2026-09-07). Dass sie genau die zwei Spiegelstriche treffen, ist eine **ABLEITUNG** aus deren
Wortlaut, **keine dritte Messung** (CC, 2026-09-07, Doku-Runde).

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
  docs/claude-history/phase-11.8-autorisierungsschicht.md und in docs/roadmap.md,
  Eintrag 11.8; sie wird hier NICHT
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

**SCHULD 3 — DIE RESTLÜCKE AUS VERMERK 1: BEIDE HÄLFTEN SIND EINGELÖST.**

**SACHKORREKTUR 2026-09-07 — ERSETZT, NICHT GESTEMPELT, in der Bauform der Sachkorrekturen
vom 2026-09-02 in diesem Abschnitt.** Hier stand "**DIE ZWEITE HÄLFTE IST EINGELÖST, DIE ERSTE
NICHT.**" Das ist seit dem 2026-09-07 überholt. **Ersetzt und nicht gestempelt, weil diese
Zeile ein ZUSTAND ist:** Ein Stempel liesse zwei Zustände nebeneinander stehen, und wer den
falschen nähme, hielte eine geschlossene Lücke für offen und plante eine Messung ein, die
gefahren ist.

· **ERSTE HÄLFTE — dass eine ECHTE `gclid` denselben Weg nimmt wie der selbstgesetzte Testwert
  vom 2026-08-24: EINGELÖST SEIT DEM 2026-09-07.**
  **SACHKORREKTUR 2026-09-07 — ERSETZT, NICHT GESTEMPELT.** Hier stand "**WEITERHIN OFFEN.**"
  Der Beleg steht am Ende dieses Spiegelstrichs.
  **DIE SACHKORREKTUR VOM 2026-09-02 DARUNTER BLEIBT WÖRTLICH STEHEN UND WIRD NICHT
  AUFGEHOBEN, und dieser Satz ist der wichtigste dieser Änderung:** Sie betrifft den Lauf vom
  **2026-09-01** und stellt richtig, dass DESSEN Kennung von Hand gesetzt war. Eingelöst hat
  die Hälfte ein **ANDERER Lauf an einem ANDEREN Tag**. Wer die neue Kopfzeile als Rücknahme
  jener Korrektur liest, hält den Lauf vom 2026-09-01 rückwirkend für einen Anzeigenklick — und
  genau das ist er nicht.
  **SACHKORREKTUR 2026-09-02 — ERSETZT, NICHT GESTEMPELT.** Hier stand "**: JA.** Schritt 2 hat
  sie über eine echte Anzeige erzeugt, nicht von Hand eingetippt." **Das trifft nicht zu** —
  s. die Sachkorrektur zur Herkunft der Klick-Kennung in Abschnitt (b) oben. Die Kennung war
  von Hand gesetzt; **es hat keinen Anzeigenklick gegeben.**
  **WAS SCHRITT 2 STATTDESSEN EINGELÖST HAT, und es ist nicht nichts:** Der selbstgesetzte
  Wert hat zum ersten Mal den **VOLLSTÄNDIGEN PRODUKTIVPFAD** durchlaufen — Beacon,
  `extractGoogleClickIds`, `buildGoogleEvent`, Adapter, Netzruf. VERMERK 1 hatte nur gemessen,
  dass er im `eventSourceUrl` **ankommt**. **Die Restlücke ist damit kleiner geworden, nicht
  geschlossen.**
  **WAS SIE AM 2026-09-07 GESCHLOSSEN HAT — GEMESSEN 2026-09-07 (OWNER), am Vercel-Log des
  eigenen Dienstes:** Ein Conversion-Beacon von einer Landepage, die mit einer **ECHTEN, vom
  Anbieter vergebenen Klick-Kennung** in der Adresse geöffnet worden war, hat den
  Erneuerungsweg und danach den Google-Adapter durchlaufen. Abgelegt als **MESSUNG F** in
  docs/ziel-befunde.md, Google-Abschnitt, **Teil (cd)**. **Dass die Kennung eine ECHTE war, ist
  eine OWNER-ANGABE 2026-09-07 und keine eigene Messung.**
  **DREI GRENZEN GEHÖREN AN DIESE EINLÖSUNG, sie stehen in (cd) selbst:** der **Statuscode**
  des Einlieferungs-Aufrufs war **nicht ablesbar** — das Werkzeug zeigt ihn nur in einer
  kostenpflichtigen Stufe · die Zuordnung zu der beim Anbieter angenommenen Einlieferung
  desselben Tages ist eine **ABLEITUNG**, keine Messung; niemand hat die zwei Seiten über eine
  gemeinsame Kennung verbunden · **welcher** der drei Kennungs-Parameter getroffen hat, ist
  **ungemessen**.
  **KEINE DER DREI BERÜHRT DEN WORTLAUT DIESER HÄLFTE:** Gefragt war, ob eine ECHTE Kennung
  **denselben Weg nimmt** — nicht, wie der Anbieter antwortet, und nicht, welcher
  Parametername trägt. **Wer eine der drei als Einwand gegen die Einlösung führt, beantwortet
  eine andere Frage.**
· **ZWEITE HÄLFTE — ob die Kennung auf einer Seite mit MEHREREN SCHRITTEN überlebt: NEIN**, und
  das ist ein Befund und kein Fehlschlag. S. Abschnitt (e). **VON DER SACHKORREKTUR UNBERÜHRT:**
  Dass `location.href` nach einem Seitenwechsel den Query-String nicht mehr trägt, hängt nicht
  daran, wer ihn geschrieben hat.
  **NACHGETRAGEN 2026-09-07, weil diese Hälfte von aussen als BEDINGUNG zitiert wird
  (docs/roadmap.md, Eintrag 11.2, Rückkehr-Bedingung des Stempels vom 2026-08-25): EIN
  GEMESSENES NEIN ERFÜLLT DIE BEDINGUNG.** Sie verlangt, dass die Lücke **GEMESSEN** ist, nicht
  dass sie günstig ausfällt. **PROVENIENZ dieser Hälfte, wörtlich: GEMESSEN 2026-09-01 (OWNER),
  an der ausgelieferten Anwendung.** Dass ein NEIN die Bedingung erfüllt, ist eine **ABLEITUNG**
  aus deren Wortlaut (CC, 2026-09-07, Doku-Runde), keine zweite Messung.

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

**NACHGETRAGEN 2026-09-08 — DIE ACHSE ZU DEN ZWEI WERTEN AUS SCHRITT 1, GERETTET AUS
docs/aktiver-stand.md VOR IHRER LÖSCHUNG.** Der Text darüber ist unverändert; dieser
Nachtrag tritt DANEBEN und steht HIER und nicht am Abschluss-Block, weil er die zwei
Rohwerte deutet, die drei Zeilen höher stehen — eine Herleitung gehört an ihre Messung.

**DER ABSTAND DER ZWEI UHREN BETRÄGT 437 052 SEKUNDEN** (`1788868675` minus `1788431623`;
GERECHNET, CC, 2026-09-03, keine dritte Beobachtung).

**DIE HERLEITUNG, DIE DEN WERT ERST BRAUCHBAR MACHT, UND OHNE DIE ER IN DIE IRRE FÜHRT: DER
ABSTAND IST KEIN MESSWERT ÜBER DIE FRIST, SONDERN ÜBER DAS ALTER DES ERNEUERUNGS-TOKENS.**
Wer ihn als Frist liest, liest ihn falsch.
**DER VERGLEICH, DER DAS ZEIGT:** In VERMERK 6 betrug derselbe Abstand **601 200 Sekunden**
— sieben Tage minus eine Stunde —, weil dort UNMITTELBAR NACH DEM VERBINDEN gemessen wurde
und beide Uhren frisch waren. Hier steht ein **ÄLTERES** Erneuerungs-Token neben einem
**frischen** Zugangsdatum, und der Abstand schrumpft entsprechend: 601 200 minus 437 052
sind **164 148 Sekunden**, also **rund 1,9 Tage** — genau das Alter, das das
Erneuerungs-Token zum Zeitpunkt dieser Messung hatte.
**DAS IST KEIN WIDERSPRUCH ZU VERMERK 6**, und der Satz gehört zwingend dazu: Jener misst
die EINLÖSUNG — die Erneuerung verlängert die zweite Uhr NICHT, sie läuft weiter. Dieser
misst einen späteren Zeitpunkt derselben zweiten Uhr. Zwei verschiedene Vorgänge, zwei
verschiedene Wirkungen; wer sie zusammenzieht, hält einen der beiden Befunde für widerlegt.

**WOZU DAS NACH DEM PHASENENDE NOCH GEBRAUCHT WIRD, und das ist der Grund für die Rettung:**
Der gehobene offene Punkt "DIE SIEBEN-TAGE-FRIST UND DER STATUSWECHSEL AUF 'IN PRODUKTION'"
(docs/offene-punkte.md) nennt nur den **TERMIN**. **WER IHN DURCH NEU-VERBINDEN VERSCHIEBT,
BRAUCHT DIESE HERLEITUNG, UM ZU VERSTEHEN, WAS ER DANACH MISST** — ohne sie ist der Termin
eine Zahl ohne Achse, und der nächste gemessene Abstand sieht wie ein Widerspruch aus.
**DER TERMIN SELBST STEHT HIER NICHT** und wird nicht verdoppelt; er ist am 2026-09-04
ersetzt worden und liegt an jenem offenen Punkt.

**DIE UNSCHÄRFE AUS VERMERK 6 TRÄGT MIT:** Ob die Rohwerte der Frist 3599/604799 oder
3600/604800 lauten, ist **NICHT auflösbar** — die Antwort des Anbieters wird nicht geloggt,
und das bleibt so.
PROVENIENZ: die zwei Werte **GEMESSEN 2026-09-03 (OWNER)**, sie stehen unverändert oben.
Abstand, Differenz und die Einordnung als Alters-Messung sind **GERECHNET bzw. ABGELEITET**
(CC, 2026-09-03), keine zweite Beobachtung. Übernommen aus docs/aktiver-stand.md, Abschnitt
"1b als Folgetask", Vorbedingung (iv), am 2026-09-08 vor deren Löschung.
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

### VERMERK 14 (Bau-Commit 2eae9ca) — DIE SCHEIBE 1b-2b IST GEBAUT UND LIVE BEWIESEN

**DER COMMIT IST AM REPO ERMITTELT** (CC, 2026-09-05, `git log`), nicht aus einem Prompt
übernommen: `2eae9ca` (`feat(oauth)`), voller Hash
`2eae9cab541f65d31abac1e77df02db16f6c3c8c`.
**FÜNF `-S`-GEGENPROBEN, UND EINE TAUGT NICHT — DAS GEHÖRT DAZU, es ist dieselbe Lage wie
bei `STATUS_UNKNOWN` in VERMERK 13:** `write_zero_rows`, `write_threw`,
`write_returned_error` und `bad_row` treffen **je genau einen** Commit, und es ist dieser.
**`secret_version` TRIFFT DREI** — daneben `a0f0c86` und `6d9ae65`, die zwei Doku-Commits
des Zuschnitts, in denen die Zeichenfolge als PROSA steht. **Als Gegenprobe ist sie damit
untauglich**, und sie steht hier, damit die nächste Runde sie nicht für eine fünfte
Bestätigung hält. Die Zuordnung ruht auf den vier anderen.
**IM KOPF STEHT DER BAU-COMMIT UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** — die
Bauform von VERMERK 10 bis 13, aus demselben Grund: Der Vermerk-Commit ist ein
`docs(claude)` und entsteht erst mit dieser Runde. **DIE DATEI HAT DAMIT KEINE LÜCKE.**

**DER TITEL SAGT "LIVE BEWIESEN", wie VERMERK 12 und 13**, und der Unterschied zu VERMERK
11 ist begründet: Der Nachweis hat den Zähler nicht nur stehen sehen, sondern gegen einen
**vor dem Deploy gesicherten Ausgangswert** gehalten — und der Sprung war **genau eins**
(Abschnitt (c)).

---

**(a) WAS GEBAUT IST — IN SYMBOLEN, GEMESSEN am Repo (CC, 2026-09-05).**

Der Bau-Commit fasste **VIER** Dateien an, **EINE davon neu**
(`supabase/migrations/0027_project_secrets_version.sql`); 928 Einfügungen, 65 Löschungen.

· **`refreshAccessToken`** (`src/lib/oauth/token-refresh.ts`) — der Gegenstand. Die Lesung
  holt seither `secret_enc, secret_version, id`; aus dem unbedingten `upsert` ist ein
  bedingtes `update` geworden, mit **VIER** Filtern (`id`, `project_id`, `target`,
  `secret_version`) und dem Sprung `gelesen + 1`. Die Rückgabe-Spaltenliste nennt
  **ausschliesslich** die Versions-Spalte — es reist kein Chiffrat zurück.
· **`RefreshMisconfiguredReason`** (ebenda) — **ADDITIV** um `bad_row` erweitert. Der Name
  nennt die ZEILE und nicht den Zähler, weil der Zweig **beide** neuen Felder prüft; ein
  Name, der nur die Version nennt, liesse den Schlüssel ungeprüft AUSSEHEN. Er steht neben
  dem bestehenden `no_row` derselben Union. **KEIN fünfter Zustand am Ergebnistyp.**
· **DIE VERENGUNG VON `ok`** steht im Docblock des Ergebnistyps, wörtlich: `ok` heisst ab
  jetzt "ein brauchbares Zugangsdatum wurde beschafft" und nicht mehr "es steht in der
  Zeile". **Das war die Auflage des Zuschnitts an den Bau, und sie ist dort eingelöst, wo
  ein Aufrufer sie liest.**
· **DER ACHSE-2-KOMMENTARKOPF** (ebenda) — **RICHTIGGESTELLT, NICHT GESTEMPELT**: Der Satz
  "KEIN NEBENLAEUFIGKEITS-RIEGEL" war als Aussage über seinen Tag richtig und ist seit
  dieser Scheibe falsch. **ACHSE 1 STEHT ZEICHEN FÜR ZEICHEN UNVERÄNDERT**, ACHSE 2 ist
  ERGÄNZT und an keiner Stelle abgeschwächt — samt beiden Grenzen des Riegels.
· **ZWEI LOG-WORTLAUTE STATT EINEM** — `write_threw` (der Aufruf hat GEWORFEN) und
  `write_returned_error` (er hat einen Fehler ZURÜCKGEGEBEN). **Beide nennen die
  BEOBACHTUNG und keine Ursache; der Rückgabewert ist bei beiden unverändert
  `misconfigured`/`write_failed`.** Sie standen im ersten Bau unter dem IDENTISCHEN
  Wortlaut `[oauth/token-refresh] write` — der Befund von Vorrats-Eintrag 48, neu erzeugt,
  und in der Korrektur-Runde desselben Commits behoben.
· **`write_zero_rows` LÄUFT AUF `console.info`, NICHT AUF `console.error`** — entschieden
  und nicht übernommen. **DER ERSTE GRUND TRÄGT ALLEIN: nach unserer eigenen Entscheidung
  ist ein verlorenes Rennen kein Fehler**, genau deshalb liefert der Zweig `ok`. Dazu
  feuert die Zeile unter dem verkehrsgetakteten Auslöser **ungedrosselt je Beacon**
  (Vorrats-Eintrag 42) und machte den Fehlerkanal für die zwei Fälle unbrauchbar, die
  wirklich einen Betreiber brauchen. **DIE DROSSELUNG IST NICHT GEBAUT und bleibt
  ausgeschlossen** — diese Entscheidung räumt die Zeile aus dem Fehlerkanal, sie macht sie
  nicht seltener.
· **`leseZeile`** (`src/lib/oauth/token-refresh.test.ts`, neu) — der gemeinsame Bauer der
  gelesenen Zeile. **Er ist aus einem gemessenen Fehlschlag entstanden**, s. Abschnitt (d).
· **VIER NEUE LÄUFE** in derselben Datei — **T25** (die vier Filter als sortierte MENGE,
  der Sprung genau eins, keine Chiffrat-Rückgabe) · **T26** (der Verlierer: genau EIN
  Schreibversuch, `ok`, kein Wurf, eigene Logzeile auf dem richtigen Kanal) · **T27** (die
  Spaltenliste der LESUNG, die vierte Testachse) · **T28** (eine Zeile ohne
  `secret_version` oder ohne `id` kommt nicht durch, ohne Netzruf und ohne Schreibvorgang).
  Dazu **H12** in `src/lib/capi/ingest.refresh.test.ts` — ein verlorenes Rennen bricht den
  Ingest nicht ab.
· **DIE MIGRATION 0027** legt **EINE** additive Spalte an, sonst nichts: **keine Policy,
  kein Backfill, kein Index, kein `updated_at`.** Der Katalog-Guard prüft die **SACHE**
  (`add column if not exists` auf genau diese Spalte), keinen Constraint-Namen.

**DIE VIER GATES WAREN VOR DEM COMMIT GRÜN** (`tsc --noEmit`, `eslint`, `vitest run`,
`next build`). **SUITE: 74 Dateien / 1530 Läufe** (vorher 74/1525, VERMERK 13) — **fünf**
Läufe mehr, **keine neue Testdatei**, **kein Bestandstest gefallen**. `eslint` meldet 0
Fehler und die eine Bestands-Warnung aus Vorrats-Eintrag 26.

**DER BYTE-NACHWEIS IST AM COMMITTETEN OBJEKT GEFÜHRT UND NICHT AM ARBEITSBAUM** — die
Auflage aus docs/immer-beachten.md, "EIN NACHWEIS AN EINER NEUEN DATEI IST BLIND": Bei
`0027` war die Datei bis zum `git add` UNTRACKED, und dort tragen `git status` und
`git diff --numstat` nichts. Über `git show HEAD:<pfad>` gemessen (CC, 2026-09-05): alle
vier Dateien **CR 0, NUL 0**; in den zwei `src/lib/oauth/`-Dateien **null Umlaute** (die
Auflage ihres Kopfes); **kein Mutations-Rest** im Commit.

---

**(b) DIE MIGRATION UND DIE ABLESUNGEN VOR DEM DEPLOY — GEMESSEN 2026-09-05 vom OWNER,
SQL-Editor.**

**0027 IST ANGEWANDT: 2026-09-05 09:04:02 UTC**, der Protokoll-Eintrag in
`schema_migrations` ist vorhanden. **DIE REIHENFOLGE (I-7) IST EINGEHALTEN — Migration,
Ablesung, Vorher-Wert, dann Deploy.**

· **DER WORTLAUT AUS `information_schema`, abgelesen und nicht die blosse Anwesenheit:**
  `data_type` **integer** · `is_nullable` **NO** · `column_default` **0** · **GENAU EINE
  Zeile.** Alle vier Angaben trafen die Erwartung.
  **WARUM DER WORTLAUT UND NICHT DIE ANWESENHEIT — der Grund steht schon im Kopf der
  Migration und wird hier nicht verdoppelt, nur quittiert:** `if not exists` prüft den
  NAMEN, nicht Typ und Bedingungen; eine abweichende Spalte hätte die Migration mit
  ERFOLG melden lassen.
· **POLICIES AUF `project_secrets`: 0.** Die Gegenkontrolle zu (I-2) — die Migration legt
  keine an, und die leere Liste ist die tragende Kontrolle dieser Tabelle.
· **DER VORHER-WERT, VOR DEM DEPLOY GESICHERT:** `id`
  **8447287a-8e73-44d4-867e-4461ba3eaea4** · `secret_version` **0** · `updated_at`
  **2026-09-04 07:26:59.882078+00**.
  **OHNE DIESEN SCHRITT WÄRE DER NACHWEIS IN (c) NICHT MEHR HERSTELLBAR GEWESEN** — der
  erste Beacon nach dem Deploy kann den Zähler bereits erhöht haben
  (docs/immer-beachten.md, "EIN VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT").

---

**(c) DER LIVE-NACHWEIS — GEMESSEN 2026-09-05 vom OWNER**, an der ausgelieferten
Anwendung.

**DIE REIHENFOLGE IST UMGEKEHRT WORDEN, UND DAS GEHÖRT IN DEN VERMERK UND NICHT IN EINE
FUSSNOTE:** Die Anleitung sah **Schritt 3 (die Regression) zuerst** vor. **SEINE
VORBEDINGUNG IST EIN GÜLTIGES ZUGANGSDATUM — und das war tot.** In diesen Zustand kommt
man nur über eine Erneuerung zurück, also über Schritt 4. **ERST 4, DANN 3.**
**ES IST GENAU DIE FIGUR AUS docs/immer-beachten.md, "EIN LIVE-TEST-SCHRITT SETZT EINEN
ZUSTAND DES PRÜFLINGS VORAUS":** Wer Schritt 3 auf einem toten Zugangsdatum gefahren
hätte, hätte einen Fehlschlag gemessen, der keiner ist.

· **SCHRITT 4 — DER GEWINNER.** Ein **Conversion**-Beacon (Ereignis "Lead",
  `isCustom` false). Im Log zuerst
  `[capi/resolve] secret unusable {target: google, reason: access_token_expired}`,
  **danach** `[oauth/token-refresh] ok`.
  In der Zeile danach: **`secret_version` 1** (vorher 0 — **SPRUNG GENAU EINS**),
  `updated_at` **2026-09-05 09:32:17.370263+00**, **`id` unverändert**.
  **`updated_at` IST MITGELAUFEN, OBWOHL DER SCHREIBVORGANG DAS FELD NICHT SETZT** — der
  Trigger `project_secrets_set_updated_at` hat gefeuert. **Das ist die Live-Bestätigung
  einer Annahme, die bis dahin eine Katalog-Messung war** (`tgenabled = 'O'`, GEMESSEN
  2026-08-26): der Bau verlässt sich darauf, dass er das Feld weglassen darf.
· **SCHRITT 3 — DIE REGRESSION, NACH Schritt 4 gefahren.** Leere **204** auf `/api/e`, im
  Log **KEIN** `[oauth/token-refresh]`, `secret_version` bleibt **1**, `updated_at` bleibt
  **09:32:17**.
· **KEINE DER VIER FEHLERZEILEN IST JE ERSCHIENEN:** `write_zero_rows` · `bad_row` ·
  `write_threw` · `write_returned_error`.

**WAS DIE BEIDEN SCHRITTE ZUSAMMEN ZEIGEN UND KEINER ALLEIN — der eigentliche Nachweis
dieser Scheibe:** **Schritt 4 zeigt, dass die Bedingung greift, WENN geschrieben wird;
Schritt 3, dass OHNE Erneuerung gar nicht erst geschrieben wird.** Hielte nur einer,
wüsste niemand, ob der Riegel wirkt oder ob der Pfad nie läuft. **Es ist dieselbe
Denkfigur wie die dritte Weise in docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG
WIRD AUF DREI WEISEN HOHL": "blockiert" und "läuft gar nicht" sehen von aussen gleich
aus.**

**DER PRÜFSCHRITT 4e IST AUSGELASSEN** — ein zweiter Lauf mit einem Sprung auf 2.
**ARCHITEKTEN-ENTSCHEIDUNG 2026-09-05:** Schritt 3 und 4 zusammen führen den Nachweis
bereits, und 4e hätte keine Entscheidung geändert. **DAS STEHT HIER, DAMIT DIE AUSLASSUNG
NICHT WIE EINE VERGESSENE AUSSIEHT** — ein nicht gefahrener Schritt, den niemand als
Entscheidung protokolliert, liest sich in einem Jahr wie eine Lücke.

---

**(d) DIE MUTATIONEN — ZWEI REIHEN, UND DIE ZWEITE IST DER EIGENTLICHE BEFUND.**

**ERSTE REIHE (Bau, 2026-09-05): NEUN Mutationen**, je mit Vorhersage vor dem Lauf,
danach zurückgenommen; keine ist im Commit. **ZWEI VORHERSAGEN LAGEN DANEBEN, BEIDE ZU
BREIT** — und die eine davon ist der Grund für `leseZeile`:

· **DER FIXTURE-FEHLSCHLAG.** Fünf Bestandsläufe (T5, T6, T6b, T6c, T6d) brachen auf einer
  **nicht vorhergesagten Achse**: Sieben Handfixtures bauten ihre Zeile mit **nur**
  `secret_enc`. Nach 0027 ist `secret_version` integer NOT NULL und `id` uuid NOT NULL —
  **eine solche Zeile kann die Datenbank nicht liefern.** Die Fixtures stellten damit einen
  Zustand her, den der produktive Pfad nicht erzeugt (docs/immer-beachten.md, "TESTDATEN
  UND TEST-SEQUENZ MÜSSEN DEN PRODUKTIVEN PFAD TREFFEN"), und fielen am defensiven Riegel
  aus. **FÜNF WURDEN ROT, ZWEI NICHT** — und die zwei stillen sind der Grund für den
  gemeinsamen Bauer statt sieben nachgezogener Literale: sie wären ab jetzt die Falle für
  den nächsten, der eine Fixture kopiert. **KEINE ASSERTION IST ANGEFASST WORDEN; alle
  sieben liefern ihr ALTES Ergebnis.**
· **EINE MUTATION WAR DAS SCHLECHTE MODELL, NICHT DER TEST** — die zweite Ursache aus
  Lektion (b) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE", und sie ist selten
  protokolliert: Ein neu ergänzter T16-Fall erreichte den Verlierer-Zweig nicht, weil ein
  früherer Fall desselben Laufs den Anbieter-Mock auf einem Zustand stehen liess, der VOR
  dem Schreibvorgang zurückkehrt. **Behoben wurde die MUTATION bzw. ihr Fall, nicht die
  Zusicherung.**

**ZWEITE REIHE (Korrektur-Runde, 2026-09-05): SECHS Mutationen, NEU GEFAHREN, und der
Grund für die Wiederholung ist eine Regel und keine Vorsicht:** Die Ergebnisse der ersten
Reihe lagen nach einer Kontext-Verdichtung nur noch als **PROTOKOLL** vor. **EIN
PROTOKOLLIERTES ERGEBNIS IST EIN DOKUMENT, KEINE MESSUNG** — und darunter lag die
Pflicht-Mutation an Achse 2. Die sechs decken: der Versions-Term aus dem Filter · **der
Verlierer-Zweig schreibt trotzdem (PFLICHT)** · der Sprung auf `+0` · im Verlierer-Zweig
werfen statt zurückgeben · die Spaltenliste der Lesung · die `id` aus dem Filter.

**SECHS VON SECHS VORHERSAGEN GETROFFEN, KEINE ABWEICHUNG IN EINE DER BEIDEN RICHTUNGEN.**
Fünf trafen **genau einen** Lauf; die sechste ("der Verlierer wirft") traf **T26 und
T16**, und die Zusatztreffer-Prüfung ist **am Ergebnis** gemacht worden und nicht
angenommen: beide meldeten **denselben Fehler im Wortlaut**. **Dieselbe Fehlerklasse, also
DECKUNG und keine Kaskade** (Lektion (g) ebenda).

**T25 IST DAMIT EIN EINZELSTÜCK FÜR VIER FEHLERKLASSEN**, gemessen und nicht vermutet:
Versions-Term, `id`, Sprung `+0` und Rückgabe-Spaltenliste fielen **je allein** auf ihn.
**DIE ZWEI FILTER-KLASSEN SIND AM UNIT-TEST ÜBERHAUPT NUR DORT ERREICHBAR** — die Attrappe
führt genau EINE Zeile, ein fehlender Filter ändert an ihrem Ergebnis nichts. Es steht in
seinem Kommentar (Lektion (f)); ebenso bei **T22**, wo die Deckung an der **FIXTURE**
hängt und nicht an der Assertion.

**JEDE MUTATION WURDE VOR DEM LAUF AUF IHRE ANWESENHEIT IN DER DATEI GEPRÜFT** (VERMERK
10, Abschnitt (h)). **NACH JEDER RÜCKNAHME GEPRÜFT:** `git status` unverändert bei vier
Einträgen, `git diff --numstat` ohne leeren Diff, CR/NUL 0, und ein `diff` gegen einen
Schnappschuss ausserhalb des Repos — **der ausschliesslich Argument von `diff` war und nie
Quelle eines Schreibvorgangs.**

---

**(e) WAS DER LIVE-TEST NICHT GEZEIGT HAT.**

· **DER VERLIERER-ZWEIG. SEQUENZIELL NICHT HERSTELLBAR.** Zwei Läufe nacheinander erzeugen
  nie ein verlorenes Rennen — der zweite liest die ERHÖHTE Version und gewinnt ebenfalls.
  **DASS `write_zero_rows` NIE ERSCHIEN, IST KEIN NACHWEIS**, sondern die erwartete Folge
  daraus. **IHN DECKEN T26, T16 UND H12 — SONST NICHTS.**
· **DIE ECHTE NEBENLÄUFIGKEIT.** Kein Nachweis dieser Scheibe hat zwei gleichzeitige
  bedingte Schreibungen gefahren. **"ATOMAR HEISST NICHT SICHER"**
  (docs/plattform-befunde.md, LAUF 3, Grenze 3) steht **UNBERÜHRT**; die Messung vom
  2026-09-04 hat die AUSKUNFT beantwortet, nicht das WETTLAUF-VERHALTEN.
· **DIE ZWEITE GRENZE — DER CALLBACK.** Von **keinem** Schritt berührt. Sie steht als
  Grenze im Zuschnitt und als Vorrats-Eintrag 53; **der Riegel greift dort nicht und würde
  Erfolg melden.**
· **DIE VIER FEHLERZEILEN.** Keine ist erschienen, und keine war herstellbar. Ihre
  Abdeckung liegt allein bei T22, T26 und T28.

---

**(f) DREI BEOBACHTUNGEN, DIE AN BESTEHENDE POSTEN GEHEN — je als ZEIGER und
ausdrücklich NICHT als Änderung an jenen Einträgen.**

· **VORRATS-EINTRAG 48 BEKOMMT EINE WEITERE LESART.** Jener Eintrag führt drei Bedeutungen
  desselben Wortlauts. **IM FELD BEOBACHTET (OWNER, 2026-09-05) IST EINE VIERTE LAGE: die
  Resolver-Zeile stand unmittelbar VOR EINEM ERFOLG** — `access_token_expired`, und
  danach `[oauth/token-refresh] ok`. **Das ist genau die Gewöhnung, die jener Eintrag als
  seinen eigentlichen Schaden benennt**, jetzt an einer Beobachtung statt an einer
  Herleitung. **DER EINTRAG SELBST IST NICHT ANGEFASST** — er trägt sein eigenes Datum,
  und diese Runde schreibt ihm keine zweite Wahrheit hinein.
· **VORRATS-EINTRAG 49 IST IM FELD BESTÄTIGT.** **Ein PageView löste die Erneuerung NICHT
  aus, ein Conversion-Beacon schon** (OWNER, 2026-09-05). Genau das behauptet jener
  Eintrag am Code. **DIE FOLGE FÜR ANLEITUNGEN GEHÖRT DAZU UND IST TEURER ALS DIE
  BESTÄTIGUNG:** Die Live-Anleitung sagte zuerst nur "einen Beacon" — **das war zu
  unbestimmt, und der erste Versuch mass deshalb nichts.** Eine Anleitung, die den
  EREIGNISTYP nicht nennt, misst auf diesem Pfad einen Fehlschlag, der keiner ist.
· **DIE ZEILE `[capi] Google forward skipped: no destination for event` IST ABGELEGT UND
  NICHT GEDEUTET.** Sie gehört zum Transport-Schritt. **KEINE ABLEITUNG, KEINE VERMUTUNG —
  ausdrücklich auch keine über den Forward-Verdacht.** Sie steht hier, damit sie nicht
  verlorengeht, und nicht, damit jemand sie auslegt.

---

**PROVENIENZ, JE TEIL:** Der Commit-Hash samt der fünf `-S`-Gegenproben, der Umfang, die
Symbolnamen, die Gate-Ergebnisse, die Testzahl, die Mutationsergebnisse beider Reihen und
der Byte-/Objekt-Nachweis **GEMESSEN am Repo bzw. an den Läufen vom 2026-09-05 (CC)**.
Die Ablesungen aus dem SQL-Editor und alle Live-Beobachtungen **GEMESSEN 2026-09-05
(OWNER)**.
**ENTSCHEIDUNGEN, ausdrücklich als solche und nicht als Messung:** die Ebene von
`write_zero_rows`, die zwei getrennten `write`-Wortlaute und die Auslassung des
Prüfschritts 4e — **ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-05**.
**ABLEITUNGEN, ausdrücklich als solche gekennzeichnet und nicht als Beobachtung:** dass
der Sprung von 0 auf 1 die Bedingung des Filters belegt (die Zahl ist gemessen, ihre
Deutung ist abgeleitet), und dass die zwei Schritte zusammen mehr zeigen als einzeln.
**WAS AUSDRÜCKLICH KEINE MESSUNG IST:** die Abwesenheit der vier Fehlerzeilen — sie ist
eine ABWESENHEIT ohne Positivkontrolle und trägt nichts (docs/immer-beachten.md, Lektion
(d) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE").

### VERMERK 15 (Bau-Commit bf73b85) — DIE SCHEIBE "Der Schlüssel kommt aus der Spalte" IST GEBAUT UND LIVE BEWIESEN

**DER COMMIT IST AM REPO ERMITTELT** (CC, 2026-09-07, `git log`), nicht aus einem Prompt
übernommen: `bf73b85` (`feat(projects)`), voller Hash
`bf73b85ef478751a0234fae960ec5cffa3fa923a`.
**SIEBEN `-S`-GEGENPROBEN, UND EINE TAUGT NICHT — dieselbe Lage wie bei `secret_version` in
VERMERK 14:** `initialTrackingKey`, `nextTrackingKey`, `setTrackingKey`, `D1_KEY`,
`tk-aus-der-spalte` und `tk-nachgerueckt` treffen **je genau einen** Commit, und es ist
dieser. **`tracking_key` TRIFFT ACHTZEHN** — die Spalte ist seit 2b-0 im Repo und wandert
durch jede Migration und jeden Pfad, der sie liest. **Als Gegenprobe ist sie damit
untauglich**, und sie steht hier, damit die nächste Runde sie nicht für eine siebte
Bestätigung hält. Die Zuordnung ruht auf den sechs anderen.
**IM KOPF STEHT DER BAU-COMMIT UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** — die
Bauform von VERMERK 10 bis 14.

**DER TITEL SAGT "LIVE BEWIESEN"**, und der Beleg ist ein **vor dem Deploy gesicherter**
Vorher-Text gegen den Nachher-Text derselben Seite (Abschnitt (b)) — nicht das blosse
Vorhandensein eines Beacons.

---

**(a) WAS GEBAUT IST — IN SYMBOLEN, GEMESSEN am Repo (CC, 2026-09-07).**

Der Bau-Commit fasste **FÜNF** Dateien an, **KEINE davon neu**; 426 Einfügungen, 12
Löschungen.

· **`loadProject` und `ProjectRow`** (`src/app/projects/actions.ts`) — die Projektion und
  der Rückgabetyp wachsen **ADDITIV** um `tracking_key`, in der Bauform des
  server-autoritativen Nachbarn `ab_test_active` im selben Typ.
· **`initialTrackingKey`** — eine neue Prop, in `src/app/page.tsx` verdrahtet, in der
  Bauform der Nachbar-Prop `initialAbTestActive`.
· **DER ZUSTAND `trackingKey`** (`src/components/CodeImporter.tsx`) — neben `settings` und
  `savedSettings`, **ohne** Dirty-Baseline (er ist nicht editierbar und geht in keinen
  Speicher-Payload). Gesetzt an **allen VIER** Saat-Punkten, je am selben Ort wie
  `setSettings`: die Erstbelegung aus den Props, `resetToEmpty`, `handleSwitch` und der
  Nachrück-Zweig in `handleDelete`. **Jeder trägt seinen Zähler im Kommentar** ("SAAT-PUNKT
  n von 4"), damit ein vergessener beim nächsten Umbau auffällt.
· **DIE ZWEI VERBRAUCHER** (ebenda) — der Vorschau-Memo `functionalHtml` und
  `buildDocumentFor` lesen aus dem Zustand statt über `getTrackingKey`. Die Dep-Liste des
  Memos wächst um `trackingKey`.
· **DAS VIERTE STÜCK** (ebenda) — `handleCredentialsSaved` setzt den Zustand zusätzlich,
  aus dem Wert, den die Server-Action zurückgibt. **DAS BLOB-SCHREIBEN DORT IST UNVERÄNDERT
  GEBLIEBEN.** Der Parameter hiess `trackingKey` und ist zu `nextTrackingKey` **umbenannt**
  — reiner Namenswechsel; ohne ihn stünde dort `setTrackingKey(trackingKey)` und läse sich
  wie eine Selbstzuweisung.
· **DIE DREIZEHN NACHGEZOGENEN BESTANDSLÄUFE** — zwei im Block "Scheibe 7b" und elf im
  Block "Scheibe D1". Der Schlüssel ist aus dem Einstellungs-Blob in die neue Prop gezogen:
  **derselbe Wert, anderer Kanal.** `D1_TK` behält `tokenSet` (andere Achse, Vorrats-Eintrag
  55); der Schlüssel reist als `D1_KEY` über einen Parameter mit **Vorgabe**, und nur der
  Lauf ohne Schlüssel übergibt sichtbar `""`.
  **KEINE ASSERTION IST ANGEFASST WORDEN, und das ist am Diff belegt und nicht behauptet:**
  Der gesamte Diff von `CodeImporter.test.tsx` enthält **keine einzige Zeile mit `expect`**;
  gelöscht sind **vier** Zeilen (die zwei Blob-Schlüssel, die Helfer-Signatur und der
  Aufruf des Lauf-ohne-Schlüssel). **Alle dreizehn bekommen damit ihr ALTES Ergebnis
  zurück, nicht ein neues.**
· **SECHS NEUE LÄUFE** (`K1` bis `K6`, ebenda) — der Beacon bei gefüllter Spalte und leerem
  Blob · der leere Wert als Gegenrichtung · der Projektwechsel, gemessen über **Export UND
  Vorschau** · der Leerzustand · der Nachrück-Zweig · das vierte Stück. **Der siebte Lauf
  liegt woanders:** die exakte Projektions-Zusicherung in `src/app/projects/actions.test.ts`,
  additiv gewachsen, Vergleich weiterhin **exakt**, die zwei Nachbar-Zusicherungen
  unangetastet.

**DAS FIXTURE-GATE IST VOR DEM BAU GEFAHREN — GEMESSEN am Repo (CC, 2026-09-07, Stufe 1),
und die Messung steht hier, weil ihr Abschnitt im Zuschnitt mit dieser Runde gestrichen
ist.** ACHSE: alle Vorkommen von `loadProject` in `CodeImporter.test.tsx` und
`TargetCard.test.tsx`, je Lauf befragt, ob seine Zusicherungen das erzeugte Dokument, einen
Beacon oder den Schlüssel betreffen. **POSITIVKONTROLLE:** dieselbe Achse fördert in beiden
Dateien die Default-Attrappe des Laders zutage; sie läuft nicht leer.
**ERGEBNIS: KEINE der Fixturen prüft eines der drei.** Geprüft werden Pixel-Eingabe,
Zugangsdaten-Indikator, Hosting-Link, Varianten-Fehler, Domain-Feld, Kartenstatus und
Fehlercode. **Sie brechen also nicht daran, dass ein Feld in der Attrappe fehlt** — der
Lader ist dort untypisiert gemockt.
**DIE ZAHL IST PRÄZISIERT, NICHT KORRIGIERT — DIE NEUN WAR RICHTIG:** Es sind **NEUN
Anweisungen** und **ZEHN Fixture-Objekte**, weil eine Anweisung zwei verkettet.
**EIN MITBEFUND, DEN DAS GATE NICHT VERLANGT HAT:** Eine der Attrappen wird **gar nicht
verbraucht** — der Lauf "AUFLAGE B — LEAK: ein Varianten-Fehler ist nach dem
Projektwechsel WEG" setzt sie und klickt danach "+ Neues Projekt" statt zu wechseln. **KEIN
HANDLUNGSBEDARF**; er steht hier, damit niemand aus der blossen Anwesenheit einer Attrappe
auf Deckung schliesst.
**DER SATZ, DER DAS GATE TRÄGT: ES HAT AM RICHTIGEN ORT GEFRAGT UND DIE FALSCHE MENGE
GETROFFEN.** Es hat den Bruch nicht gefunden, sondern ausgeschlossen, dass er dort liegt —
die dreizehn brechenden Läufe seeden über den Blob, nicht über eine Attrappe. **Ohne die
Erhebung hätte der Bau die neun für die gefährdete Menge gehalten.** Es ist die Klasse, die
**Vorrats-Eintrag 15** führt; **jener wird ZITIERT, nicht geändert.**

**DIE VIER GATES WAREN VOR DEM COMMIT GRÜN** (`tsc --noEmit`, `eslint`, `vitest run`,
`next build`). **SUITE: 74 Dateien / 1536 Läufe** (vorher 74/1530, VERMERK 14) — **sechs**
Läufe mehr, **keine neue Testdatei**, **kein Bestandstest gefallen**. Die Vorher-Zahl ist
**am echten HEAD gemessen** (`git stash`-Rundlauf, CC, 2026-09-07), nicht aus VERMERK 14
abgeschrieben. `eslint` meldet 0 Fehler und die eine Bestands-Warnung aus Vorrats-Eintrag
26. **CR und NUL am COMMITTETEN OBJEKT gemessen** (`git show HEAD:<pfad>`, CC,
2026-09-07): alle fünf Dateien **0/0**.

---

**(b) DER LIVE-NACHWEIS — GEMESSEN 2026-09-07 vom OWNER**, an der ausgelieferten Anwendung.
**Prüfling:** Projekt `8e14611a-444d-4e49-94cb-4268e1e1690a`, erwarteter Schlüssel
`ee456ae4-0f10-418b-9905-8f6666e4c481`.

· **DER AUSGELIEFERTE TEXT, VORHER GEGEN NACHHER — und der Vorher-Beleg war VOR dem Deploy
  gesichert, sonst wäre er nicht mehr herstellbar** (docs/immer-beachten.md, "EIN
  VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT"). **VORHER** stand im Klick-Pfad
  ausschliesslich eine `console.warn`-Zeile — **kein `navigator.sendBeacon`, kein
  Einwilligungs-Feld**. Der PageView-Emitter trug den Schlüssel aus der Spalte, **und genau
  deshalb sah die Seite funktionierend aus.** **NACHHER** trägt der Klick-Pfad den
  vollständigen Beacon samt Einwilligungs-Feld, und der Schlüssel steht im Text.
· **DER MITLÄUFER** — ein Projekt mit **beiden** Werten, im selben Lauf geprüft. Sein
  Soll-Ausgang stand **vorher** fest: unverändert ein Beacon. **Eingetreten.**
· **DIE DREI BEACONS DES PRÜFLINGS, mit Zeitstempel und Ereignisnamen AUS DEM PAYLOAD:**
  **11:12:52** PageView · **11:12:56** PageView (Netzwerk-Tab offen, Payload abgelesen:
  `event` `"__ps_pageview"`) · **11:13:29** Conversion (Payload: `event` `"Purchase"`,
  `value` 9, `currency` `"EUR"`, Einwilligungs-Feld mit gesetztem Google-Schlüssel,
  `isCustom` false).
· **DIE KETTE AM CONVERSION-BEACON LIEF VOLLSTÄNDIG DURCH:** Der Resolver meldete
  `access_token_expired`, danach ein Token-Aufruf beim Anbieter, danach die bedingte
  Schreibung, danach `[oauth/token-refresh] ok` mit der `projectId` des Prüflings — und
  danach der Google-Adapter.
  **DAMIT IST DER RIEGEL DER SCHEIBE 1b-2b EIN ZWEITES MAL IM FELD GELAUFEN**, auf einem
  dritten Projekt. **Das steht hier als ZEIGER und ist ausdrücklich KEINE Änderung an
  VERMERK 14.**
· **DER ADAPTER MELDETE `no destination for event`. DAS IST KEIN DEFEKT UND KEINE
  KLICK-KENNUNGS-FRAGE:** Die Prüfung auf eine Conversion-Regel läuft **VOR** der
  Klick-Kennung; dem Projekt fehlt die Zuordnung des Ereignisses zu einer Conversion-Aktion.
  **Konfiguration, kein Code.**

---

**(c) EINE ABGELÖSTE VORBEOBACHTUNG — sie gehört hinein, damit niemand sie später für einen
Widerspruch hält.**

Ein früherer Lauf desselben Tages (**10:35**) endete am Resolver, **ohne Erneuerung**. **DER
EREIGNISNAME WURDE DAMALS NICHT ABGELESEN.** Die Rekonstruktion des Owners spricht für einen
PageView (ein Seitenaufruf eine Sekunde davor, identischer Ablauf wie 11:12:52).
**DAS IST EINE ABLEITUNG UND KEINE MESSUNG — der Payload existiert nicht mehr.**
**SIE IST FOLGENLOS:** Die Läufe von 11:12 und 11:13 messen dieselbe Achse sauber und lösen
sie ab.

**EINE WIDERLEGTE DEUTUNG DES ARCHITEKTEN, ausdrücklich als solche.** Die Vermutung lautete,
die fehlende Klick-Kennung habe die Erneuerung verhindert. **GEMESSEN am Repo (CC,
2026-09-07, Aufklärungsrunde):** Die Klick-Kennung wird erst **IM ADAPTER** gelesen, weit
hinter der Rettung — ACHSE: alle Vorkommen der drei Klick-Kennungs-Namen und von
`eventSourceUrl` über `src/`, Testdateien ausgenommen; **POSITIVKONTROLLE:** dieselbe Achse
trifft die drei `google-*`-Dateien mehrfach, sie läuft nicht leer. **DIE TRENNENDE ACHSE IST
DIE FORWARDBARKEIT** — ein PageView fällt an der Forward-Wache heraus.
**VORRATS-EINTRAG 49 UND VERMERK 12, ABSCHNITT (b), FÜHREN DEN FALL BEREITS; beide werden
ZITIERT, nicht geändert. Kein neuer Posten.**

**EINE AUFLAGE AN JEDE KÜNFTIGE LIVE-ANLEITUNG, und sie ist der teuerste Befund dieses
Laufs: WER EINEN BEACON PRÜFT, LIEST DEN EREIGNISNAMEN AUS DEM PAYLOAD AB** — nicht nur den
Statuscode. Der 10:35-Lauf war hinterher **nicht mehr deutbar**, weil genau diese Angabe
fehlte, und **die Anleitung hatte sie nicht verlangt**. Ein Statuscode auf dem Ingest-Pfad
ist ohnehin in jedem Fall dieselbe leere Antwort (204-Containment).
**OB DAS EINE DAUERREGEL WIRD, IST HIER NICHT ENTSCHIEDEN.**

---

**(d) DREI ZEIGER AN BESTEHENDE POSTEN — ausdrücklich KEINE Änderung an jenen Einträgen.**

· **DER OFFENE PUNKT "DIE PROJEKTWAHL ÜBERLEBT KEIN NEULADEN" (CLAUDE.md) HAT DIESEN
  LIVE-TEST VERFÄLSCHT.** Sein Trigger nennt den ersten **fremden** Nutzer mit mehr als
  einem Projekt; **getroffen hat er den OWNER, in einer MESSUNG.** Nach einem Neuladen stand
  ein anderes Projekt im Editor, und zwei inhaltsgleiche Projekte machten es unsichtbar —
  **der erste Publish traf den falschen Prüfling.** **DER POSTEN IST DAMIT NICHT MEHR NUR
  EIN ZUKUNFTSRISIKO.**
· **DIE `console.warn`-ZEILE STEHT UNMITTELBAR NEBEN DEM FEUERNDEN BEACON** und spricht von
  "nicht konfiguriert", während gesendet wird. **BESTAND, nicht von dieser Scheibe erzeugt.**
  → **Vorrats-Eintrag 56.**
· **EIN BESTANDSLAUF DER DREIZEHNER-GRUPPE HAT NUR RELATIVE ZUSICHERUNGEN** und geht auch
  dann auf, wenn beide verglichenen Wege nichts tragen. **Er ist bei einer Mutationsprobe
  dieser Runde als einziger nicht gefallen, obwohl vorhergesagt.** → **Vorrats-Eintrag 57.**

---

**(e) DIE MEMO-ABHÄNGIGKEIT DES VORSCHAU-MEMOS IST VORSORGE OHNE WÄCHTER — GEMESSEN, MIT
UNTERSCHIEDENER URSACHE.**

**Ihre Mutation blieb GRÜN** (die ganze Suite; CC, 2026-09-07). **Das ist nicht "der Test
prüft nichts" und nicht "die Mutation ist ein schlechtes Modell", sondern die dritte
Ursache — eine VERDECKUNG** (docs/immer-beachten.md, Lektion (b) an "MUTATIONSPROBEN UND
LIVE-TEST-INSTRUMENTE"): `settings` steht in derselben Dep-Liste und bekommt an **jedem**
Saat-Punkt eine **neue Objekt-Referenz**; das Memo rechnet ohnehin neu, und die fehlende Dep
kann nie sichtbar werden.
**DIE GEGENPROBE TRENNT ES SAUBER:** Wird stattdessen der **Vorschau-KONSUMENT** auf den
Blob zurückgedreht, fällt **genau** die Zusicherung in K3, die über die Vorschau misst. Der
Messpunkt ist also der Wächter des zweiten **Konsumenten**, nicht der Dep-Liste.
**DIE DEP BLEIBT STEHEN:** Sie ist richtig und wird **tragend**, sobald jemand `settings`
memoisiert oder aus der Liste nimmt. **KEIN GATE MELDET SIE** — die Lint-Regel läuft als
Warnung, und der Lint-Befehl dieses Projekts kennt keine Obergrenze für Warnungen.
**ZWEI KOMMENTARE, DIE DAS GEGENTEIL BEHAUPTETEN, SIND IM SELBEN COMMIT BERICHTIGT** — ein
Kommentar, der eine Garantie behauptet, die sein Test nicht deckt, ist die vierte Weise aus
"EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL".

---

**(f) WAS DER LIVE-TEST NICHT GEZEIGT HAT.**

· **Ob Google die Conversion VERBUCHT.** Der Adapter wurde erreicht; was danach geschieht,
  ist eine andere Achse mit einem anderen Instrument.
· **Die drei übrigen betroffenen Projekte.** Geprüft ist **eines**; die anderen heilen nach
  derselben Mechanik — **ABLEITUNG, keine Messung.**
· **Die vier Projekte ohne beide Werte.** Für sie gilt die erste Grenze des Zuschnitts
  unverändert.
· **Das vierte Stück.** Der Prüfling ist ein Google-Projekt; die Sofort-Wirkung nach dem
  Setzen eines Zugangsdatums deckt im Bestand **nur ein Lauf gegen Attrappen** (K6).

---

**(g) ZWEI KOMMENTARKÖPFE SIND GEPRÜFT UND GEMELDET, NICHT GEÄNDERT.** Der
Spiegelungs-Kommentar über `projectIdRef` in `src/components/CodeImporter.tsx` sagt
weiterhin, `settings.capi.trackingKey` speise Vorschau und Publish-Dokument — **das trifft
seit diesem Commit nicht mehr zu**. Der Docblock von `getTrackingKey` in
`src/lib/settings.ts` ist als Beschreibung der Funktion unverändert wahr. **Beide gehören
zur Abräum-Runde von Vorrats-Eintrag 55** und sind bewusst nicht in dieser Scheibe
nachgezogen worden.

**`docs/db-stand.md` IST GEPRÜFT UND NICHT GEÄNDERT WORDEN** (CC, 2026-09-07, Doku-Runde).
ACHSE: alle Vorkommen von `tracking_key` und `trackingKey` über die Datei.
**ERGEBNIS: ZWEI Fundstellen, beide reine Schema-Aussagen** — die Spaltenzeile der Tabelle
und der partielle Unique-Index. **Keine davon sagt etwas über die KONSUMENTEN der Spalte**,
und damit ist keine durch diese Scheibe unwahr geworden. **POSITIVKONTROLLE:** dieselbe
Achse trifft beide Stellen; sie läuft nicht leer.

---

**PROVENIENZ, JE TEIL:** Der Commit-Hash samt der sieben `-S`-Gegenproben, der Umfang, die
Symbolnamen, die Gate-Ergebnisse, die Testzahl vorher und nachher, das Fixture-Gate, die
Mutationsergebnisse und der Byte-/Objekt-Nachweis **GEMESSEN am Repo bzw. an den Läufen vom
2026-09-07 (CC)**. Die Prüfung von `docs/db-stand.md` und die Kollisionsprüfungen dieser
Runde **GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde)**.
Alle Live-Beobachtungen samt Zeitstempeln und Payload-Feldern **GEMESSEN 2026-09-07
(OWNER)**.
**ENTSCHEIDUNGEN, ausdrücklich als solche und nicht als Messung:** die Umbenennung des
Handler-Parameters und der Verzicht auf eigene Läufe für die zwei Kommentarköpfe —
**ARCHITEKTEN-/CC-ENTSCHEIDUNGEN 2026-09-07**.
**ABLEITUNGEN, ausdrücklich als solche gekennzeichnet und nicht als Beobachtung:** die
Rekonstruktion des 10:35-Laufs als PageView und die Aussage, dass die drei übrigen
betroffenen Projekte nach derselben Mechanik heilen.
**WAS AUSDRÜCKLICH KEINE MESSUNG IST:** dass der Google-Adapter die Conversion tatsächlich
zustellt — der Lauf endete mit `no destination for event`, und was der Anbieter danach tut,
hat dieser Test nicht angesehen.

---

### VERMERK 16 (Bau-Commits 57c9231, eeac5dd, 25119b7) — DIE TEILUNG DER STANDDATEI IST VOLLZOGEN

**DIE COMMITS SIND AM REPO ERMITTELT** (CC, 2026-09-08, `git log` und `git show --stat`),
nicht aus einem Prompt übernommen:
· `57c9231` (2026-09-07, `docs(claude)`) — **SCHRITT 1, der Zuschnitt.** EINE Datei,
  330 Einfügungen, 0 Löschungen. Rein additiv, keine Zeile verschoben.
· `eeac5dd` (2026-09-08, `docs(claude)`) — **SCHRITT 2, der Schnitt.** FÜNF Dateien,
  8 743 Einfügungen, 8 221 Löschungen. `docs/aktiver-stand.md` verliert 8 571 Zeilen; die
  zwei neuen Dateien entstehen mit 5 612 bzw. 2 615 Zeilen; `CLAUDE.md` und
  `docs/arbeitsweise.md` werden im SELBEN Commit nachgezogen.
· `25119b7` (2026-09-08, `docs(claude)`) — **SCHRITT 3, die Zeiger.** ELF Dateien unter
  `src/`, 48 Einfügungen, 38 Löschungen, **ausschliesslich Kommentarzeilen**.
**EIN VIERTER COMMIT DESSELBEN TAGES GEHÖRT DAZU UND IST KEIN SCHRITT DER TEILUNG:**
`b1f91bd` (`docs(claude)`, EINE Datei, 91/42) hat die Ladbarkeit gemessen und den falschen
Massstab richtiggestellt. Er steht zwischen Schritt 2 und Schritt 3, weil seine Messung erst
an der geschnittenen Datei möglich war.
**IM KOPF STEHEN DIE BAU-COMMITS UND AUSDRÜCKLICH NICHT DER COMMIT DIESES VERMERKS** — die
Bauform von VERMERK 10 bis 15.

**DER TITEL SAGT "VOLLZOGEN" UND NICHT "ERLEDIGT"**, und der Unterschied steht in
Abschnitt (f): Drei Dinge sind bewusst nicht geheilt.

---

**(a) WAS GEBAUT IST — GEMESSEN am Repo (CC, 2026-09-08).**

**AUS EINER DATEI SIND DREI GEWORDEN.** `docs/aktiver-stand.md` war vor dem Schnitt
**702 038 B / 9 967 Zeilen** (Stand `57c9231`); der Anlass des ganzen Vorhabens war ihre
Grösse von **680 598 B / 9 637 Zeilen** am 2026-09-07, also VOR dem Zuschnitt, der sie
selbst noch einmal wachsen liess.

· **`docs/aktiver-stand.md` — die STEUERDATEI.** Behält ihren Namen; er steht in `CLAUDE.md`
  und in `docs/arbeitsweise.md` als Verfahrensslot und wird aus 88 Stellen ausserhalb der
  Datei zitiert. Sie trägt den Rahmen, die bindenden Entscheidungen, "1b als Folgetask",
  die Hebungs-Kandidaten und die DREI REGISTER.
· **`docs/claude-history/phase-11.2-google.md` — das ARCHIV.** Die elf abgelaufenen
  Zuschnitte und die fünfzehn Vermerke. **Sie trägt ihren ENDNAMEN von Anfang an** und liegt
  damit als einzige Datei jenes Ordners bei einer LAUFENDEN Phase.
· **`docs/aktiver-stand-vorrat.md` — der VORRAT**, alle 59 Einträge. **Kein Archiv**: Er
  wird am Phasenende GEHOBEN und danach GELÖSCHT, nicht archiviert.

**DIE DREI REGISTER SIND DER GRUND, WARUM DIE TEILUNG KEINE BLOSSE VERLAGERUNG IST.** Ohne
sie wüsste eine Sitzung, die nur die Steuerdatei liest, nicht einmal, DASS es etwas
nachzusehen gibt.

---

**(b) DER NACHWEIS, DASS ZEICHENGLEICH VERSCHOBEN WORDEN IST — DREI GEHASHTE BEREICHE,
SECHS ERHEBUNGEN.**

Jeder Bereich ist **VOR dem Eingriff** an `git show HEAD:docs/aktiver-stand.md` erhoben und
**nach dem Schreiben** an der Zieldatei gegengeprüft worden — drei Bereiche mal zwei
Erhebungen:

· die elf Zuschnitte (Quellzeilen 426–4029 OHNE die drei herausgelösten Blöcke, 3 091
  Zeilen, 217 042 B)
  `sha256 = 73fa7aa6de5c535371fc850aae6464803e6f23aaa652dc41667ffc93645f80d3`
· die fünfzehn Vermerke (Quellzeilen 4030–6433, 2 404 Zeilen, 156 839 B)
  `sha256 = 639fe1eda798af4834a4c99a227a0e35513643dae06e6a9a258f274d3b385d2d`
· der Vorrat (Quellzeilen 6758–9324, 2 567 Zeilen, 194 271 B)
  `sha256 = 17ded6bc996cc772cb958bcc2954b9b1b014066ef235d8be471d82b9de8fc01e`

**WAS DIESE SECHS ERHEBUNGEN BELEGEN UND WAS NICHT:** Sie belegen, dass die verschobenen
Bereiche BYTE-GLEICH angekommen sind. Sie belegen **NICHT**, dass nichts vergessen wurde —
dafür trägt jede der zwei neuen Dateien die Zeilenbereiche der Quelle in ihrem Kopf, und die
drei Register sind die Gegenprobe auf Vollständigkeit.

**DREI BLÖCKE SIND BEWUSST NICHT MITGEWANDERT**, weil sie nicht abgelaufen waren: die zwei
Entscheidungs-Blöcke aus den Zuschnitten der Scheiben 1a und 3 (zusammen elf bindende
Entscheidungen) und "1b als Folgetask". **WÄRE MECHANISCH GESCHNITTEN WORDEN, WÄRE DER
SCHADEN STILL GEWESEN:** Elf bindende Entscheidungen lägen in der Datei, die per Definition
Abgelaufenes trägt; der Schnitt hätte funktioniert, die Gates wären grün gewesen, und die
nächste Scheibe wäre gegen Entscheidungen gebaut worden, die sie nicht mehr findet.

---

**(c) DIE LADBARKEIT IST GEMESSEN — UND SIE WAR NIE DER ENGPASS.**

**GEMESSEN (OWNER, /context, 2026-09-08, frische Sitzung):** Basislinie beim Sitzungsstart
**145,8k Token**, nach der vollständigen Lesung der Steuerdatei **248,6k**; Fenster **1M**,
danach **25 %** belegt und **715,2k frei**. Gelesen wurde die Datei bei **148 817 B /
2 102 Zeilen**.
**DIE DIFFERENZ VON 102,8k IST EINE OBERGRENZE UND KEIN DATEIWERT** — sie liegt vollständig
in der Kategorie "Messages" und bündelt VIER Dinge: Datei, Prompt, Bericht und Denken.
**Abgeleitet rund 80k für die Datei allein.**

**DER ENGPASS WAR DIE WERKZEUG-AUSGABEGRENZE VON 30 000 ZEICHEN, NICHT DAS KONTEXTFENSTER.**
Die geschnittene Datei brauchte **SECHS Lesestücke** (grösstes 29 033 B, GEMESSEN CC,
2026-09-08); die ungeteilte mit 680 598 B hätte **rund VIERUNDZWANZIG** gebraucht (RECHNUNG,
untere Schranke 23; die Stücke enden an Zeilengrenzen).
**DIE FORMULIERUNG "SIE PASST NICHT MEHR IN DEN KONTEXT" WÄRE ZU STARK GEWESEN — richtig ist
"sie war nicht mehr in EINEM ZUG lesbar".** Der Schnitt bleibt richtig aus dem präziseren
Grund: **Ein Pflicht-Gate, das vierundzwanzig Werkzeugaufrufe verlangt, füllt niemand
vollständig aus — und der Ausfall sieht aus wie Sorgfalt**, weil brav gemeldet wird, was
gelesen wurde.

**DER MASSSTAB DES ZUSCHNITTS WAR DER FALSCHE, und das war ein Fehler des Architekten, kein
Messfehler:** Er verglich mit **110 664 B** und **126 574 B** — beides Werte für eine
**@-IMPORT-LADUNG BEIM SITZUNGSSTART** und beide über `docs/immer-beachten.md`. Die
Steuerdatei lädt **nicht** per @-Import, sie wird über Auftrag 0 GELESEN. Zwei Mechanismen;
eine Zahl aus dem einen belegt nichts über den anderen.
**NEBENBEFUND DERSELBEN MESSUNG:** `docs/immer-beachten.md` lädt bei **126 574 B**
vollständig (OWNER, /context, 2026-09-08). Der bisher höchste gemessene Wert war
**110 664 B** (2026-08-21).

**NACHGETRAGEN 2026-09-08 — DIE BYTE-AUFSTELLUNG, DIE FEHLENDE HÄLFTE DIESER MESSUNG.**
Gerettet aus `docs/aktiver-stand.md`, Abschnitt "Was die Steuerdatei behält, und was das
wiegt", **vor deren Löschung** — sie stand bis dahin ausschliesslich dort. Der Ladbarkeits-
Block darüber sagt, was die Datei WOG; diese Aufstellung sagt, WORAUS.

**DIE FÜNF BLÖCKE, DIE IN DER STEUERDATEI BLIEBEN — GEMESSEN (CC, 2026-09-07), je an den
Zeilengrenzen VOR dem Eingriff:**
· Kopf + Abschnitts-Verzeichnis — **4 576 B**
· der Rahmen (Pflicht-Gate · Gegenstand der Phase · Was den Zuschnitt bindet ·
  Fortschreibungs-Regeln) — **23 204 B**
· "Entscheidungen, die über ihre Scheibe hinaus binden" — **23 174 B**
· "Hebungs-Kandidaten" — **23 749 B**
· "1b als Folgetask" — **27 887 B**
**DIE ZWEI UMGEZOGENEN ENTSCHEIDUNGS-BLÖCKE:** 4 907 B + 4 946 B = **9 853 B** (GEMESSEN,
CC, 2026-09-07).
**DIE DREI REGISTER: 10 349 B** (GEMESSEN, CC, 2026-09-08, am gebauten Abschnitt).
**DIE ADDITIONEN, ausdrücklich als ADDITION und nicht als Messung:** die fünf Blöcke ergeben
**102 590 B**, mit den zwei umgezogenen **112 443 B**, mit den Registern und dem
Teilungs-Zuschnitt **rund 144 000 B**. **GEMESSEN war die Steuerdatei nach dem Schnitt
148 817 B** — es gilt die Messung, nicht die Addition, und die **Differenz von rund 5 000 B**
ist der Text, den der Schnitt selbst erzeugt hat (die Register-Köpfe, die Klammer um "1b als
Folgetask", die Herkunfts-Zeilen der zwei umgezogenen Blöcke).

**DIE ZWEI SELBSTMESSUNGEN DES TEILUNGS-ZUSCHNITTS SIND BEWUSST NICHT MITGENOMMEN** —
18 611 B, 20 910 B und die gerundeten 21 000 B. Sie messen einen ABSCHNITT, den es nach dem
Löschen der Steuerdatei nicht mehr gibt, und sie sind genau der Fall, den Hebungs-Kandidat 9
beschreibt ("EINE DATEI, DIE IHRE EIGENE GRÖSSE IM PRÄSENS NENNT, ERZEUGT EINEN KREISLAUF
AUS NACHZÜGEN"). Sie hier zu wiederholen hiesse, eine Selbstangabe an einen Ort zu tragen,
an dem sie nicht einmal mehr ihren Gegenstand hat.

**DER GRUND FÜR DIESE RETTUNG IST NICHT DER, DEN DER BLOCK ÜBER SICH SELBST SAGT — und
dieser Absatz muss stehen, sonst sucht die nächste Instanz nach einem Massstab für eine Datei,
die es nicht gibt.** Der Block nannte sich "der MASSSTAB, gegen den die nächste Verdichtung
misst". **DIESER ZWECK STIRBT MIT DER STEUERDATEI.**
**WAS IHN TRÄGT, IST EIN ANDERER: Er ist die einzige Herleitung, WIE SICH 680 598 B AUF DIE
KLASSEN VERTEILT HABEN** — **Zuschnitte 37,4 %, Vorrat 28,5 %, Vermerke 23,0 %.**
**GENAU DIESE VERTEILUNG HAT DEN SCHNITT ENTSCHIEDEN:** Er lief entlang der **FUNKTION** und
nicht entlang der **ZEIT**, weil die **Vermerke nicht die Masse waren** — das war die
Ausgangsannahme des Architekten, und diese Aufstellung hat sie gekippt.
**DIE NÄCHSTE PHASE, DIE ZU GROSS WIRD, STEHT VOR DERSELBEN FRAGE; ohne die Zahlen ist die
Antwort wieder eine Vermutung.**

---

**(d) DIE ZEIGER — GEMESSEN 20, NICHT DIE 27 DES ZUSCHNITTS.**

Der Zuschnitt nannte 27 als **untere Schranke** aus dem Messbericht vom 2026-09-07 und
sagte ausdrücklich "DIE ZAHL IST KEIN PRÜFUMFANG". Die Neumessung (CC, 2026-09-08, über
`git ls-files`, drei Achsen: Pfadnennung · Kennungen · Titel-Zitate) ergibt **20 Zeiger im
Produktivcode**, die auf einen ausgewanderten Anker zeigten. **Alle 20 sind nachgezogen**,
dazu **3 in Testdateien**.

**DIE DIFFERENZ VON SIEBEN IST VOLLSTÄNDIG AUFGELÖST:**
· **EINER war nie falsch** — `src/lib/oauth/token-refresh.ts` zeigt auf die **bindende
  Entscheidung (7)**, und die ist in die STEUERDATEI gezogen, nicht ausgewandert.
· **SECHS nennen gar keine Datei** (Vorrats-Einträge 7, 9, 35, 42, 48, 53 als blosse
  Kennung). **Sie waren nie falsch und sind es auch jetzt nicht: Register 3 routet sie
  weiter — dafür sind die Register gebaut.** Ein Dateiname wäre dort eine ERGÄNZUNG, keine
  Adress-Korrektur.

**JEDER ANKER IST VOR DEM SCHREIBEN AM TEXT DER ZIELDATEI AUFGELÖST WORDEN. KEINER GING INS
LEERE.**

**DER TOTE ANKER "Warum sie zuerst kommt" HAT EINE ZWEISTUFIGE ADRESSE BEKOMMEN**, und sie
ist nicht Höflichkeit, sondern Notwendigkeit: Der Unterabschnitts-Titel
"Vollzogen — was hier stand und wohin es gegangen ist" steht in dieser Datei **zweimal
zeichengleich als echte Überschrift**. Eine einstufige Adresse hätte systematisch die
falsche von beiden getroffen. Aufgenommen ist zudem der **volle** entfallene Titel — er
lautet "Warum sie zuerst kommt — und dieser Grund bindet"; die Kurzform traf auch im Archiv
nur unscharf.

---

**(e) ZWEI EINSICHTEN AUS DEM ZUSCHNITT, DIE MIT IHM ABLAUFEN UND DESHALB HIER STEHEN.**
Sie sind aus dem verdichteten Abschnitt der Steuerdatei entfallen; **nur weil sie hier
stehen, durften sie dort weg.**

· **DIE REIHENFOLGE WAR KEINE BEQUEMLICHKEIT: VOR SCHRITT 2 WEISS NIEMAND, WOHIN DIE ZEIGER
  ZEIGEN.** Ein Zeiger, der auf eine noch nicht existierende Datei umgestellt wird, ist
  nicht "vorbereitet", sondern falsch — und zwar **still**, weil kein Gate einen Pfad in
  einem Kommentar prüft.
· **DER ZWISCHENZUSTAND NACH SCHRITT 2 IST LESBAR FALSCH, DER NACH EINEM VORGEZOGENEN
  SCHRITT 3 WÄRE ES NICHT.** Ein Zeiger, der nach Schritt 2 noch auf die Steuerdatei zeigt,
  ist falsch, aber er trifft eine EXISTIERENDE Datei mit einem REGISTER, das sagt, wo der
  Anker jetzt liegt. **Das ist der Grund, warum die Zeiger zuletzt kommen** — und derselbe
  Grund trägt heute die zwei bewusst nicht geheilten Zeiger aus (f).

**DIE NACHZUG-LISTEN SIND EINGELÖST:** Der Zuschnitt benannte SECHS Stellen in
`docs/arbeitsweise.md` und DREI in `CLAUDE.md`. Alle neun sind in `eeac5dd` nachgezogen
worden, im SELBEN Commit wie der Schnitt.

---

**(f) WAS AUSDRÜCKLICH NICHT GEHEILT IST — DREI DINGE, EINZELN.**

· **`supabase/migrations/0027_project_secrets_version.sql` zeigt weiter auf
  `docs/aktiver-stand.md`.** Der Anker ist ins Archiv gewandert; der Zeiger bleibt trotzdem
  stehen, weil **"ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN"**
  (`docs/immer-beachten.md`) den Fall wörtlich nennt — "auch nur einen Kommentar". **Die
  Regel gewinnt gegen den Scope einer Doku-Runde.** Der Zeiger ist lesbar falsch: Er trifft
  eine existierende Datei mit Registern.
· **45 PFAD-ZEIGER IN DER GEPFLEGTEN DOKU SIND NICHT NACHGEZOGEN** (GEMESSEN, CC,
  2026-09-08). Bewusst vertagt; der Bau hat Vorrang. Als **Vorrats-Eintrag 61** abgelegt.
· **DER ZWEITE TOTE ANKER IST IN DIESER RUNDE GEHEILT, ABER NICHT IN SCHRITT 3.** Der
  Zuschnitt nahm an, er sei "mit dem Schnitt ins Archiv gewandert". **DAS TRAF NICHT ZU:**
  Er sass in der bindenden Entscheidung (7) und ist mit ihr in die STEUERDATEI gezogen, also
  in die Gegenrichtung der Annahme. Schritt 3 hatte jene Datei im Scope ausgeschlossen und
  hat ihn deshalb stehengelassen; nachgezogen ist er im Commit dieses Vermerks.

**EINE VIERTE SACHE, DIE KEINE LÜCKE IST UND HIER STEHT, DAMIT SIE NICHT FÜR EINE GEHALTEN
WIRD:** Ob die "Festlegungs"-Blöcke der elf archivierten Zuschnitte noch binden oder
abgelaufen sind, **ist weiterhin nicht geprüft**. Der Zuschnitt hat das als eigene Arbeit
ausgewiesen und die Zuschnitte unverändert verschoben statt beurteilt — zwei Achsen
gleichzeitig zu bewegen hätte danach unentscheidbar gemacht, ob eine Aussage verschoben oder
verändert worden ist.

---

**PROVENIENZ, JE TEIL:** Die vier Commit-Hashes, ihre Datei- und Zeilenzahlen, die
Dateigrössen, die Zeigerzahlen und die sechs Lesestücke sind **GEMESSEN am Repo (CC,
2026-09-08)**. Die drei `sha256`-Werte sind aus den Köpfen der zwei Zieldateien übernommen
und stammen aus `eeac5dd`; sie sind hier **NICHT neu erhoben**.
Die vier `/context`-Werte und der Nebenbefund zu `docs/immer-beachten.md` sind **GEMESSEN
(OWNER, /context, 2026-09-08)**.
**RECHNUNGEN, ausdrücklich als solche:** die rund vierundzwanzig Lesestücke für 680 598 B
und die rund 80k für die Datei allein.
**ENTSCHEIDUNGEN, ausdrücklich als solche und nicht als Messung:** die Nicht-Heilung der
Migration 0027 (nach geltender Regel) und die Vertagung der 45 Doku-Zeiger
(ARCHITEKT, 2026-09-08).
**WAS AUSDRÜCKLICH KEINE MESSUNG IST:** dass die Steuerdatei bei jeder künftigen Grösse und
in jeder Umgebung in einem Zug lesbar bleibt — gemessen ist EIN Lauf, an EINER Maschine, mit
DIESEM Werkzeugstand.


## Die bindenden Entscheidungen der Phase 11.2, aus der Steuerdatei übernommen

**WOHER SIE KOMMEN:** Aus docs/aktiver-stand.md, Abschnitt "Entscheidungen, die über ihre
Scheibe hinaus binden", beim Phasenende am 2026-09-08. **DER TEXT IST ZEICHENGLEICH
ÜBERNOMMEN** — kein Wort umformuliert, keine Nummer neu vergeben.

**ES WAREN NEUNZEHN — DREI SIND NACH docs/immer-beachten.md GEHOBEN, SECHZEHN STEHEN HIER.**
Die drei sind (4) "DER EINWILLIGUNGS-RIEGEL IST FAIL-CLOSED UND ERREICHT BESTEHENDE SEITEN
NICHT", P3 "die Beweis-Route ist POST, nicht GET" und (A) "DER VERBINDEN-WEG IST NICHT
VORABLADE-FÄHIG". **P3 UND (A) STEHEN TROTZDEM UNTEN MIT** — sie liegen in Blöcken, die
zeichengleich übernommen werden, und ein Herausschneiden wäre eine Umformulierung. Wer sie
als Regel braucht, findet sie in docs/immer-beachten.md; hier stehen sie in ihrem
ursprünglichen Zusammenhang.

**EIN BEFUND, DER ZUR HEBUNG GEHÖRT UND SONST NIRGENDS STEHT: KEINE DER NEUNZEHN HAT IHREN
GEGENSTAND VERLOREN.** Bei den Vorrats-Einträgen derselben Phase waren fünf erledigt; hier
keine. **DAS IST STRUKTURELL UND KEIN ZUFALL:** Eine bindende Entscheidung beschreibt, WIE
gebaut wurde. Sie kann überholt werden, aber sie wird nicht gegenstandslos, solange der Code
steht. **Wer bei dieser Liste Streichungen erwartet, erwartet die Fehlerklasse der falschen
Liste.**

**DIE ÜBERSCHRIFTEN DER DREI ÜBERNOMMENEN BLÖCKE SIND HIER NEU GESETZT**, und das ist
Absicht: Ihre Originaltitel stehen anderswo in dieser Datei bereits als Zitat, und eine
zeichengleiche Überschrift daneben machte jede Überschriften-Suche mehrdeutig (Regel "EIN
ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT"). Die
Originaltitel sind unten je OHNE Marke zitiert.

### Sieben der acht nummerierten Entscheidungen

**DIE ACHTE, (4), STEHT NICHT HIER** — sie ist als Regel nach docs/immer-beachten.md
gehoben, weil sie keinen Google-Sonderfall beschreibt, sondern eine Eigenschaft, die bei
JEDEM weiteren Fan-Out-Ziel eintritt. Ihre Nummer bleibt frei und wird nicht neu vergeben.

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
erneuert nichts. Wer 1a abschliesst und 1b vertagt, hat den Fehlzustand NICHT beseitigt,
sondern nur das Werkzeug dagegen gebaut — er steht in
docs/claude-history/phase-11.2-google.md, Zuschnitt "Die Erneuerung des Zugangsdatums —
Scheibe 1a des Schnitts der Phase 11.2", Unterabschnitt "Vollzogen — was hier stand und
wohin es gegangen ist", dort als entfallener Unterabschnitt "Warum sie zuerst kommt — und
dieser Grund bindet" zitiert.
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

### Die Klammer um die zwei umgezogenen Blöcke

Originaltitel, ohne Marke zitiert: "Zwei Blöcke, die am 2026-09-08 aus abgelaufenen
Zuschnitten hierher gezogen sind".

### Zwei Blöcke, die am 2026-09-08 aus abgelaufenen Zuschnitten hierher gezogen sind

**WARUM SIE HIER STEHEN:** Beide sagen in ihrem EIGENEN TITEL, dass sie über ihre Scheibe
hinaus binden — der eine "und sie binden über diese Scheibe hinaus", der andere "sie binden
gleich". Ihre Zuschnitte sind abgelaufen und nach docs/claude-history/phase-11.2-google.md
gewandert. **WÄREN DIE BLÖCKE MITGEWANDERT, LÄGEN ELF BINDENDE ENTSCHEIDUNGEN IN DER DATEI,
DIE PER DEFINITION ABGELAUFENES TRÄGT** — der Schnitt hätte funktioniert, die Gates wären
grün gewesen, und die nächste Scheibe wäre gegen Entscheidungen gebaut worden, die sie
nicht mehr findet. An beiden Fundstellen im Archiv steht ein Zeiger, der sagt, was dort
stand und wohin es gegangen ist.

**WORTLAUT UND ÜBERSCHRIFT SIND UNVERÄNDERT**, und die blockeigene Nummerierung (P1 bis B-4
bzw. (A) bis (C)) ist es ebenfalls. **SIE LÄUFT NEBEN DER NUMMERIERUNG (1) BIS (8) DIESES
ABSCHNITTS HER UND WIRD NICHT IN SIE EINGEFÜGT** — "Die Nummern sind stabil und werden nie
neu vergeben" gilt für beide Reihen, und eine Umnummerierung machte jeden Zeiger von aussen
tot. **WER AUF EINE DIESER ENTSCHEIDUNGEN ZEIGT, NENNT IHREN BLOCK MIT**; "Entscheidung (A)"
allein ist in diesem Abschnitt seit dem 2026-09-08 nicht mehr eindeutig.

**HERKUNFT DES ERSTEN BLOCKS:** aus dem Zuschnitt "Die Erneuerung des Zugangsdatums —
Scheibe 1a des Schnitts der Phase 11.2".

### Der Block vom 2026-08-29, hierher übernommen

Originaltitel, ohne Marke zitiert: "Die Entscheidungen vom 2026-08-29 — ACHT, und sie
binden über diese Scheibe hinaus".
**P3 IST ZUSÄTZLICH ALS REGEL GEHOBEN** (docs/immer-beachten.md) — der Grund, warum eine
schreibende Route mit fremdem Endpunkt kein GET sein darf, gilt für jede solche Route und
nicht nur für diese. Der Text bleibt hier unverändert stehen.

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

**HERKUNFT DES ZWEITEN BLOCKS:** aus dem Zuschnitt "Google als reguläres Ziel in der
Oberfläche — Scheibe 3 des Schnitts der Phase 11.2".

### Der Block der drei späteren Entscheidungen, hierher übernommen

Originaltitel, ohne Marke zitiert: "Drei Entscheidungen, die nach den sechs Festlegungen
gefallen sind — sie binden gleich".
**(A) IST ZUSÄTZLICH ALS REGEL GEHOBEN** (docs/immer-beachten.md) — ihr tragender Grund ist
ein Produkt-Argument und kein OAuth-Detail. Der Text bleibt hier unverändert stehen.
**(B) BLEIBT UNGETEILT HIER**, obwohl ihre erste Hälfte ein Prinzip ist. Eine Halbierung
wäre eine Umformulierung; stattdessen ist sie als HEBUNGS-KANDIDAT 11 angelegt und unten in
diesem Archiv mitkopiert.

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

## Zwei Hebungs-Kandidaten der Phase 11.2, die den Vollzug überleben müssen

**WARUM SIE HIER STEHEN UND NICHT GEHOBEN SIND:** Beide sagen etwas, das ERST NACH diesem
Phasenende entschieden wird. Sie lägen sonst allein in docs/aktiver-stand.md — und die wird
in Schritt 2 gelöscht. **DIESE KOPIE IST DER GRUND, WARUM SIE DAS ÜBERLEBEN.**
**DER TEXT IST ZEICHENGLEICH ÜBERNOMMEN**, einschliesslich der Nummern 10 und 11; sie sind
die der Kandidatenliste jener Datei und werden nicht neu vergeben.
**KANDIDAT 10 IST IN DER KORRIGIERTEN FASSUNG ÜBERNOMMEN** — sein Teil (B) ist am
2026-09-08 sachkorrigiert worden (der erste Ausgang trägt zwei Bedingungen, nicht eine).
**Der Vollzug seines Antrags an docs/arbeitsweise.md steht weiterhin AUS**; er ist nach
diesem Phasenende terminiert.

10. **EIN PHASENENDE, DAS AUF DAS LETZTE TODO WARTET, TRITT NIE EIN — UND DIE HEBUNG "NACH
    ERMESSEN" WIRD ÜBERSPRUNGEN** (angetreten 2026-09-08).
    **DIESER EINTRAG IST EIN ANGENOMMENER ÄNDERUNGSANTRAG an docs/arbeitsweise.md und
    CLAUDE.md — OWNER-ENTSCHEIDUNG 2026-09-08 auf Antrag des Architekten desselben Tages.
    DER VOLLZUG IST AUSSTEHEND.** Er steht hier abgelegt und nicht dort gebaut; warum, sagt
    die Reihenfolge am Ende.

    **(A) DAS KRITERIUM FÜR `[x]` — NEU, UND ES GEHÖRT IN DIE MARKER-LEGENDE IN CLAUDE.md.**
    Nicht in die Arbeitsweise: Die Legende steht in der Projektanweisung und wird nicht
    verdoppelt.
    **EINE PHASE GEHT AUF `[x]`, WENN KEIN CODE MEHR ZU SCHREIBEN IST.** Externe
    Abhängigkeiten — Messungen, Arbeit an einem Fremdkonto, Owner-Entscheidungen — halten
    sie NICHT offen, sondern werden GEHOBEN.
    **DIE AUFLAGE, OHNE DIE `[x]` UNZULÄSSIG IST:** Ist zum Zeitpunkt des `[x]` etwas
    PRODUKTRELEVANTES unbewiesen, sagt die Roadmap-Zeile es AUSDRÜCKLICH — dieselbe Bauform
    wie beim `[~]`, wo beide Hälften benannt sein müssen.
    **DER GRUND FÜR DIE AUFLAGE, und ohne ihn wird sie beim nächsten Aufräumen als
    Formalie gestrichen:** `[x]` liest sich als "funktioniert". Bei Phase 11.2 ist die
    WIRKUNG AUF DIE GEBOTE ungemessen — also das Produktversprechen selbst.

    **(B) DIE HEBUNG WIRD PFLICHT STATT ERMESSEN, UND SIE SORTIERT NACH DREI ZIELEN STATT
    EINEM.** Wortlaut ALT in docs/arbeitsweise.md, Abschnitt "Phasenende":
    "**1. Hebung (nach Ermessen):**". NEU: Pflicht, mit drei Ausgängen —
    · **benennbarer Trigger UND "geht sonst STILL kaputt"** → docs/offene-punkte.md, plus
      Stub-Zeile in CLAUDE.md;
    · **sonst** → docs/claude-history/backlog-polish.md, ans Dateiende unter eine
      EIGENE datierte Überschrift;
    · **Gegenstand erledigt** → GESTRICHEN (s. Teil C).
    **DER GRUND, DASS EIN ZIEL NICHT REICHT:** docs/offene-punkte.md verlangt einen
    TRIGGER; "falls es je nötig wird" ist dort ausdrücklich unzulässig. Wer alles dorthin
    hebt, muss Trigger erfinden — oder er hebt gar nicht.
    **DER ERSTE AUSGANG TRÄGT SEIT DEM 2026-09-08 ZWEI BEDINGUNGEN, NICHT EINE — SACHKORREKTUR,
    KEIN STEMPEL. HIER STAND:** "· **mit Trigger** → docs/offene-punkte.md, plus Stub-Zeile in
    CLAUDE.md; · **ohne Trigger** → docs/claude-history/backlog-polish.md …" **DAS WAR ZU GROB,
    UND EIN STEMPEL LIESSE ZWEI KRITERIEN NEBENEINANDER STEHEN**, von denen das falsche eine
    Datei flutet, die jede Sitzung lädt.
    **DER TRIGGER ALLEIN TRENNT NICHT.** docs/offene-punkte.md sagt in ihrem eigenen Kopf,
    sie sei "Kein Backlog-Ersatz" und "hier steht nur, was sonst STILL kaputtgeht". Fast
    jeder Vorrats-Eintrag trägt einen Trigger; eine Aufräumarbeit mit dem Trigger "die
    nächste Runde, die diese Datei ohnehin öffnet" geht nicht still kaputt, sie wartet.
    **DER BELEG, GEMESSEN AN DER HEBUNG DER PHASE 11.2 (CC, 2026-09-08):** Von 66
    Vorrats-Einträgen hätten nach dem Trigger allein **FÜNFUNDFÜNFZIG** nach
    docs/offene-punkte.md gehen müssen; nach beiden Bedingungen sind es **VIERZEHN**.
    **DIE DIFFERENZ VON 41 WÄREN AUFRÄUMPOSTEN GEWESEN, JE MIT EINER STUB-ZEILE IN
    CLAUDE.md** — also in der Datei, die JEDE Sitzung lädt, und die einen eigenen offenen
    Punkt dazu führt ("CLAUDE.md NÄHERT SICH DEM LADELIMIT"). **Die grobe Fassung hätte den
    Posten ausgelöst, den sie nicht kennt.**
    **GEMESSEN an der Runde vom 2026-09-08 (Phasenende 11.8, CC):** Von SIEBEN
    Vorrats-Einträgen der Phase 11.8 trug **EINER** einen Trigger. **DIESE ZAHL BLEIBT UND
    IST NICHT DER BELEG FÜR DIE KORREKTUR** — bei sieben Einträgen fielen beide Kriterien
    zufällig zusammen; erst 66 haben sie auseinandergezogen.

    **(C) DER AUSGANG, DEN DIE ARBEITSWEISE NICHT KENNT.** Was seinen GEGENSTAND verloren
    hat, wird **GESTRICHEN und nicht umgezogen** — mit dem **BELEG DER ERLEDIGUNG AM
    ZEIGER**, damit erkennbar bleibt, dass gestrichen wurde WEIL erledigt und nicht, weil
    jemand aufgeräumt hat.
    **GEMESSEN an dieser Runde:** **DREI** der sieben, je durch eine spätere Scheibe
    gegenstandslos geworden.
    **DIE LÜCKE, DIE DAS SCHLIESST:** Die Arbeitsweise hat heute ACHT Wege HINEIN und EINEN
    hinaus, und der greift nur bei Dauerregeln.

    **(D) DER 11.8-VERMERK IN docs/arbeitsweise.md FÄLLT MIT DEM UMZUG.** Sie nennt an
    mindestens zwei Stellen die "Fehlerklasse, die docs/aktiver-stand-11.8.md festhält" —
    als Begründung dafür, dass ein Archiv seinen ENDNAMEN von Anfang an trägt.
    **DIE BEGRÜNDUNG BLEIBT RICHTIG, DER ZUSTAND NICHT:** Die Fehlerklasse ist nach dem
    Umzug BEHOBEN, nicht offen, und der Pfad zeigt woandershin.
    **DIE GENAUEN FUNDSTELLEN SIND NICHT GEZÄHLT** — "mindestens zwei" ist eine untere
    Schranke und kein Prüfumfang; sie werden beim Vollzug gemessen.

    **DER BELEG, DER DEN ANTRAG TRÄGT UND DER GRUND, WARUM ER REIF IST:** Bei Phase 11.1
    sind **NEUN** Einträge am Phasenende nicht gehoben worden, bei Phase 11.8 **ELF**.
    **ZWEIMAL IN FOLGE ist der Schritt "nach Ermessen" ÜBERSPRUNGEN und der "mechanische"
    ausgeführt worden.** Das ist kein Einzelfall, sondern die Bauform: Ein Schritt, der im
    Ermessen steht und keinen Nachweis verlangt, wird von einer Runde, die abschliessen
    will, zuverlässig übergangen — und nichts wird davon rot.

    **DIE REIHENFOLGE DES VOLLZUGS, UND SIE IST TEIL DER ENTSCHEIDUNG: ERST die zwei
    Phasenenden (11.8, dann 11.2), DANN der Antrag.** Die Arbeitsweise während eines
    laufenden Phasenendes zu ändern erzeugt einen Zustand, in dem Repo und Projektanweisung
    Verschiedenes über das sagen, was gerade läuft.
    **VOLLZUG AN BEIDEN ORTEN IM SELBEN ZUG** — Repo-Datei und Projektanweisung; **der
    zweite Ort wird aus der COMMITTETEN Datei kopiert, nicht aus dem Chat.**

    **WAS DIESER EINTRAG NICHT IST:** kein Vollzug, keine Änderung an docs/arbeitsweise.md
    oder an der Marker-Legende, und keine Aussage darüber, wann die zwei Phasenenden
    abgeschlossen sind.
    PROVENIENZ: **OWNER-ENTSCHEIDUNG 2026-09-08**, Antrag des Architekten desselben Tages.
    Die Zahlen SIEBEN, EINER und DREI sind **GEMESSEN** (CC, 2026-09-08, an dieser Runde);
    NEUN und ELF sind **GELESEN** (CLAUDE.md bzw. der Kopf von
    docs/claude-history/phase-11.8-autorisierungsschicht.md).
    Der Vollzug ist **AUSSTEHEND**.

    **STEMPEL 2026-09-08 — DER ANTRAG IST VOLLZOGEN. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR
    ZEICHEN STEHEN.** Er wird NICHT gestrichen: Das Archiv ist ein Zeitdokument, und er
    trägt die **Herleitung** des Antrags — die Belege, die ihn getragen haben, stehen
    nirgends sonst so beieinander. Der Satz "Der Vollzug ist AUSSTEHEND" ist als Aussage
    über SEINEN Tag richtig und wird von diesem Stempel abgelöst, nicht ersetzt.
    **DIE VIER TEILE, JE MIT IHREM ORT:**
    · **(A) DAS `[x]`-KRITERIUM → CLAUDE.md, "## Roadmap & aktueller Stand"**, unmittelbar
      hinter der Marker-Legende, beginnend mit "WANN [x] GESETZT WIRD — DAS KRITERIUM".
    · **(B) DIE HEBUNG WIRD PFLICHT → docs/arbeitsweise.md, "### Phasenende"**. Der
      Wortlaut "**1. Hebung (nach Ermessen):**" ist ersetzt durch "**1. Hebung
      (PFLICHT):**", die drei Ziele stehen darunter, je mit ihrem Kriterium.
    · **(C) DER AUSGANG → docs/arbeitsweise.md, "### Wie ein Satz wieder herausgeht"**, als
      "EIN ZWEITER AUSGANG, DEN DIESER ABSCHNITT BIS ZUM 2026-09-08 NICHT KANNTE".
    · **(D) DER 11.8-VERMERK → docs/arbeitsweise.md, "### Die Standdatei"**, am
      Archiv-Spiegelstrich.
    **EINE ANGABE DES ANTRAGS IST BEIM VOLLZUG GEMESSEN UND DABEI KLEINER GEWORDEN, NICHT
    GRÖSSER:** Teil (D) sagt, docs/arbeitsweise.md nenne die Fehlerklasse "an mindestens
    zwei Stellen", und hält ausdrücklich fest, die Fundstellen seien nicht gezählt und die
    Zahl kein Prüfumfang. **GEMESSEN am Dateitext (CC, 2026-09-08): ES IST GENAU EINE** —
    ein einziges Vorkommen, über zwei Zeilen umgebrochen (der Pfad in der einen, die
    Wendung "Fehlerklasse, die" in der anderen). **Die untere Schranke war zu hoch, und
    genau deshalb stand sie unter Vorbehalt.** Der Antragstext bleibt unverändert; er hat
    seine eigene Unschärfe benannt, und die Messung hat sie aufgelöst.
    **EIN FÜNFTER TEIL IST HINZUGEKOMMEN, DER NICHT IM ANTRAG STAND — (E), DIE STUB-ACHSE.**
    Sie ist in der Sitzung vom 2026-09-08 aus einer Aufklärungs-Runde entstanden und steht
    in docs/arbeitsweise.md, "### Phasenende", am Ende des Abschnitts.
    **SIE IST SCHWÄCHER BELEGT ALS DIE VIER DES ANTRAGS, UND DAS STEHT AN IHR SELBST:** Die
    vier ruhen auf Messungen (55 gegen 14, neun und elf ungehobene Einträge, drei von
    sieben erledigt). **(E) RUHT AUF EINEM ÜBERGEWICHT** — 6 unbeobachtet gegen 2
    beobachtet und 2 gemischt, in einer Stichprobe der zehn jüngsten Bestands-Stubs
    (GEMESSEN, CC, 2026-09-08). **Deshalb ist sie als FRAGE formuliert und nicht als
    Auflage**, und ein `[x]` oder ein Stub wird an ihr nicht abgelehnt.
    **WAS DER VOLLZUG NICHT GETAN HAT:** Er hat die Abschnittsnummern der Arbeitsweise
    nicht angetastet, nichts umsortiert und keinen internen Querverweis verändert.
    PROVENIENZ DIESES STEMPELS: der Vollzug ist **GEMESSEN an dieser Runde** (CC,
    2026-09-08); die Fundstellen-Korrektur zu (D) ist **GEMESSEN am Dateitext** (CC,
    2026-09-08). Die Reihenfolge — erst die zwei Phasenenden, dann der Antrag — ist
    eingehalten: Phasenende 11.8 in den Commits `33e335b` und `81767b2`, Phasenende 11.2 in
    `dae49f6` und `003e65f`, dieser Vollzug danach.

11. **EINE KARTE, DIE NACH EINEM GESCHEITERTEN VORGANG UNVERÄNDERT IHREN AUSGANGSZUSTAND
    ZEIGT, IST DIE STILLE FEHLKLASSE** (angetreten 2026-09-08, beim Phasenende der Phase
    11.2 aus der bindenden Entscheidung (B) herausgehoben).
    **DER WORTLAUT, UM DEN ES GEHT — ZITAT aus Entscheidung (B), "DIE ERGEBNISCODES GEHÖREN
    IN DIESE SCHEIBE — ALS DREI FÄLLE, NICHT ALS DREIZEHN TEXTE":** "Der Erfolgsfall trägt
    sich selbst, die zwölf anderen nicht. **Eine Karte, die nach einem gescheiterten
    Verbinden unverändert 'Nicht konfiguriert' sagt, IST die stille Fehlklasse, die diese
    Scheibe beseitigen soll** — der Betreiber hätte gehandelt, nichts wäre geschehen, und
    nichts sagte es ihm."
    **WARUM KANDIDAT:** Der Satz beschreibt KEINEN Google-Sonderfall und keine Eigenschaft
    des OAuth-Callbacks. Er beschreibt eine Klasse von Oberflächen-Fehlern, die bei JEDEM
    Vorgang eintritt, der ausserhalb der Anwendung stattfindet und mit einem Zustandswechsel
    zurückkommt — jede künftige Autorisierung, jede Anbindung mit Rücksprung, jeder
    Bestätigungs-Fluss. **Der Nutzer hat gehandelt; das Produkt sieht danach aus wie vorher.**
    **WO DIE ENTSCHEIDUNG LIEGT, AUS DER ER STAMMT:** docs/claude-history/phase-11.2-google.md,
    Abschnitt "Die bindenden Entscheidungen der Phase 11.2, aus der Steuerdatei übernommen",
    Block "Drei Entscheidungen, die nach den sechs Festlegungen gefallen sind", Entscheidung
    (B). **SIE IST DORT UNGETEILT ABGELEGT UND WIRD NICHT ZERSCHNITTEN** — ihre zweite
    Hälfte (dreizehn Callback-Codes auf drei Fälle) ist Google-spezifisch, und eine
    Halbierung wäre eine Umformulierung.
    **NICHT ENTSCHIEDEN:** ob daraus eine eigene Regel wird oder ein Absatz an "EIN SIGNAL
    LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN" bzw. an "WELCHE REGEL WANN GREIFT"
    (beide docs/immer-beachten.md). **Für einen Absatz spricht**, dass jene zwei Regeln
    dieselbe Achse führen — wann ein Zustand angezeigt wird. **Für eine eigene spricht**,
    dass beide vom SIGNAL handeln, also von einer Anzeige, die etwas MELDET; hier geht es um
    eine Karte, die nichts meldet und dadurch falsch informiert. **KEINE EMPFEHLUNG.**
    **WARUM ER ÜBERHAUPT ANGELEGT WIRD:** Die Entscheidung (B) wandert mit dem Phasenende ins
    Archiv. Ohne diesen Kandidaten verschwände der Prinzip-Teil dorthin mit — und ein Archiv
    wird nicht gelesen, wenn man eine Regel sucht.
    **ER WANDERT IN SCHRITT 2 WIE KANDIDAT 10 ALS KOPIE INS ARCHIV**, damit er das Löschen
    der Steuerdatei überlebt.
    GEMELDET 2026-09-08, NICHT GEHOBEN.
    PROVENIENZ: Das Zitat ist WÖRTLICH aus Entscheidung (B); dass sein erster Teil kein
    Google-Sonderfall ist, ist eine ABLEITUNG aus seinem eigenen Wortlaut und keine Messung.
    Die Nummer 11 ist vor der Vergabe auf Kollision geprüft (CC, 2026-09-08: die Liste führte
    1 bis 10).
