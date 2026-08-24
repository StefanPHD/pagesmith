# AKTIVER STAND — PHASE 11.2 (GOOGLE)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.2. Sie ist
angelegt am 2026-08-24. Existiert sie, läuft eine Phase; wird sie am Phasenende
gehoben und archiviert, verschwindet sie wieder. Verfahren: docs/arbeitsweise.md.

## Verzeichnis der Abschnitte

Die Einträge dieses Verzeichnisses tragen bewusst KEINE `##`-Marke, damit eine
Suche nach einer Überschrift nicht zuerst hier landet — s. die Regel "EIN ANKER,
DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" in
docs/immer-beachten.md.

· Pflicht-Gate — diese Datei zuerst
· Gegenstand der Phase
· Was den Zuschnitt bindet
· Fortschreibungs-Regeln
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

### (2) Die Herkunft — als Zeiger, nicht als Kopie

docs/roadmap.md, Eintrag 11.2 ("Google"), Marker `[ ]`. Dort steht der Volltext
mit Auflagen, Richtigstellungen, einem Vorbehalt und einer Owner-Entscheidung.

DIE AUFLAGE, UND SIE IST DER ZWECK DIESES ZEIGERS: Wer den Eintrag liest, liest
den KOPF NIE OHNE den Richtigstellungs-Block darunter. Der Kopf trägt zwei
Angaben, die dort ausdrücklich als überholt bzw. als unvollständig begründet
eingestuft sind.

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

## Entscheidungen, die über ihre Scheibe hinaus binden

(noch keine)

## Vorrat (gemeldet, nicht gebaut)

Drei Befunde, alle GEMELDET am 2026-08-24, alle NICHT gebaut und NICHT
entschieden. KEINE EMPFEHLUNG zu keinem von ihnen.

1. **DER EINWILLIGUNGS-DRAHT FÜHRT KEINEN GOOGLE-SCHLÜSSEL.** Das Feld `cns`
   trägt heute `meta`, `tiktok` und `linkedin` — KEIN `google`. ZWEI QUELLEN,
   GETRENNT GENANNT, weil sie zwar dasselbe sagen, aber verschieden gewonnen
   sind: GEMESSEN AM CODE (CC, 2026-08-24) — der Beacon-Bau in
   src/lib/tracking/meta.ts setzt genau diese drei Schlüssel; und GEMESSEN AN DER
   LIVE-NUTZLAST (OWNER, 2026-08-24) — im beobachteten Beacon trug `cns` diese
   drei. Was `consentAllows` für ein Ziel OHNE Schlüssel tut, ist NICHT GEPRÜFT.
2. **KEINE STELLE IM REPO ZERLEGT EINEN QUERY-STRING.** GEMESSEN in der
   Aufklärung vom 2026-08-24 (Achse: src/**/*.ts und *.tsx ohne Testdateien,
   Begriffe `URLSearchParams`, `location.search`, `searchParams`): kein Treffer.
   Ein Google-Adapter bräuchte das, um die Klick-Kennung aus der URL zu lösen.
3. **EIN ADAPTER HAT KEINEN RÜCKKANAL.** GEMESSEN am Code, 2026-08-24: Der Typ
   `Forwarder` (src/lib/capi/ingest.ts, Zeilen 220–227) gibt `Promise<void>`
   zurück. Ein Adapter, der ein Ereignis verwirft, kann das nicht melden. Für ein
   Ziel, das OHNE Klick-Kennung nichts senden kann, wäre die Verwerfung
   UNSICHTBAR.

## Hebungs-Kandidaten

(noch leer)
