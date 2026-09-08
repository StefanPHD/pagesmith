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
Kunde die Einrichtung seines eigenen Projekts prüfen, ohne die echten Zahlen zu berühren
und ohne dass irgendein anderes Projekt davon etwas merkt.

### Der Träger des Zustands ist eine FRIST, kein Boolean

**Aktiv heisst: der Ablaufzeitpunkt liegt in der Zukunft.** Nicht: ein Schalter steht auf
wahr.

**DER GRUND MUSS MIT, sonst wird die Frist beim nächsten Aufräumen als Umständlichkeit
gegen einen Boolean getauscht:** Ein vergessener Testmodus markiert ECHTE Käufe als Test.
Sie verschwinden lautlos aus der Optimierung des Anbieters, während das Werbebudget
weiterläuft. Der Schaden ist maximal genau dort, wo niemand hinsieht — es gibt keinen
Fehler, keine leere Seite, keine rote Zahl; es wird nur teurer und wirkungsloser.

**EINE FRIST LÄUFT VON ALLEIN AB. EIN BOOLEAN BLEIBT HÄNGEN.** Ein Boolean braucht eine
zweite Handlung desselben Menschen, der die erste vergessen hat — und die einzige
Erinnerung daran wäre eine Anzeige, die er ebenfalls nicht ansieht. Die Frist braucht
niemanden.

**DIESE FORDERUNG IST NICHT NEU UND NICHT HIER ERFUNDEN.** Sie steht seit der Vorplanung
als Design-Anforderung in docs/claude-history/future-roadmap.md, Abschnitt
"Tracking-Testmodus für Kunden", wörtlich: "kein stiller Dauer-Toggle — Auto-Ablauf nach
X Stunden und/oder unübersehbarer Dashboard-Banner". Diese Phase löst die erste Hälfte
ein; die zweite (der Banner) ist Sache der Oberflächen-Scheibe.

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

**EINE AUFLAGE AUS DERSELBEN STELLE IST BIS HEUTE OFFEN und gehört in den Zuschnitt der
meta-Hälfte, nicht in eine Fussnote:** Die Datei verlangt selbst, "Metas eigene Doku zur
Ausschluss-Regel von test_event_code aus der Optimierung nochmal [zu] verifizieren, nicht
nur aus dieser Einschätzung [zu] übernehmen". **Ob und wie ein so markiertes Ereignis aus
der Optimierung fällt, ist in diesem Repo nirgends GEMESSEN und nirgends mit Datum
GELESEN** (Nicht-Treffer, GEMESSEN am Repo, CC, 2026-09-08, Achse oben). Die Begründung
der Frist ruht damit auf einer Einschätzung, die ihre eigene Quelle als ungeprüft
bezeichnet.

### Die Lücke, die beim Zuschnitt der TikTok-Hälfte gebraucht wird

**docs/ziel-befunde.md HAT WEDER EINEN META- NOCH EINEN TIKTOK-ABSCHNITT** (GEMESSEN am
Dateitext, CC, 2026-09-08: die Datei trägt genau drei Ziel-Abschnitte — LinkedIn, Google,
Pinterest; eine Überschriften-Suche nach meta bzw. tiktok trifft null).

**DAS IST FÜR TIKTOK EINE ECHTE LÜCKE UND NICHT NUR EINE ABLAGE-FRAGE.** Die H1-Matrix in
docs/ziel-fragenkatalog.md führt TikToks Testmodus als **GEMESSEN** — wörtlich:
"`test_event_code` in der Nutzlast, wechselt pro Sitzung, gem". **Der Befund, auf den sich
das stützt, hat in docs/ziel-befunde.md keinen Ort.** Das Einzige, was im Repo dazu steht,
ist ein Kommentar in `src/lib/capi/tiktok-forward.ts`, der eine Messung "2026-08-11, im
Testmodus eines eigenen Werbekontos" nennt.

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

### Die Env-Variablen bleiben, und wer gewinnt

- **`META_TEST_EVENT_CODE`, `TIKTOK_TEST_EVENT_CODE` und `PINTEREST_TEST_MODE` bleiben
  unverändert bestehen.** Sie tragen den Eigenbetrieb des Owners und werden von dieser
  Phase nicht abgeschafft.
- **SIND BEIDE WEGE GESETZT, GEWINNT DER PROJEKT-ZUSTAND.** Der spezifischere Wert schlägt
  den deployment-weiten.

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

Noch keine. Der Abschnitt steht, damit die erste Entscheidung einen Ort hat und nicht in
einem Scheiben-Zuschnitt verschwindet.

## Vorrat — gemeldet, nicht gebaut

Noch leer. Was während der Phase auffällt und nicht in ihren Zuschnitt gehört, kommt
hierher — mit Provenienz und, wo einer benennbar ist, mit Trigger.

## Hebungs-Kandidaten

Noch leer. Hierher gehört, was am Phasenende in docs/immer-beachten.md, in CLAUDE.md oder
ins Backlog gehoben werden könnte — als KANDIDAT, ohne Auswahl.

## Scheiben-Vermerke

Noch keiner. Ein Vermerk entsteht erst, wenn eine Scheibe gebaut UND live geprüft ist —
nicht bei grünen Gates allein.
