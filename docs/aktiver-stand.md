# Aktiver Stand — Phase 11 (Multi-Tracking / Server-Side Fan-Out)

Angelegt am 2026-08-11, auf dem Stand von HEAD `102f4a0`. Die Phase läuft; der
Marker in CLAUDE.md, "## Roadmap & aktueller Stand", steht auf `[~]`.

---

## 1. Was diese Datei ist

Der aktive Stand der LAUFENDEN Phase 11 — das, was gerade gilt, nicht das, was
geworden ist.

**PFLICHT-GATE:** Jede Session, die an dieser Phase arbeitet, liest sie ZUERST
("Auftrag 0"). Das ist kein Vorschlag; die Auflage steht in CLAUDE.md,
"## Aktiver Stand — Verfahren ab Phase 10".

**SIE WIRD NICHT AUTOMATISCH GELADEN.** Nur CLAUDE.md ist in jeder Session da;
diese Datei muss aufgeschlagen werden.

**SIE IST KEINE QUELLE FÜR CODEZUSTÄNDE.** Sie nennt Dateien und Symbolnamen als
ORTE, an denen zu messen ist — nie Zeilennummern, nie Signaturen, nie Testzahlen.
Was tatsächlich im Code steht, wird am Repo erhoben, nicht hier abgelesen; für
Schema und Analytics-Lesepfad gilt derselbe Vorrang zugunsten von
`docs/db-stand.md` und der laufenden DB.

**AM PHASENENDE WIRD SIE GEHOBEN, ARCHIVIERT UND GELÖSCHT.** Der Ablauf steht in
`docs/arbeitsweise.md`, "### Phasenende ab Phase 10 (leichte Archivierung)".
Existiert sie nicht, läuft keine Phase.

---

## 2. Wo die Phase steht

**STAND 2026-08-12:** Eine VIERTE Scheibe ist erledigt und steht als jüngste in
Abschnitt 3 — die BESCHRIFTUNG der Verlust-Kachel. Sie ändert ausschliesslich TEXT;
an Zielen, Struktur, Berechnung und Zahlen ändert sich durch sie NICHTS. **Der Stand
vom 2026-08-11 darunter bleibt in jedem Wort gültig** und wird deshalb nicht
überschrieben — er ist als Aussage über JENEN Tag richtig.

**STAND 2026-08-11:** DREI Scheiben sind erledigt und stehen in Abschnitt 3 —
TikTok als drittes Ziel (live bewiesen), die Extraktion des Schwärz-Primitivs und
der Log-Leak am Meta-Adapter (live bestätigt). **TIKTOK IST DAMIT KEIN OFFENER
POSTEN MEHR** und aus der Liste unten herausgenommen; **GEBAUT UND TATSÄCHLICH
BELIEFERT SIND JETZT DREI ZIELE.** Die beiden übrigen Ziele sind davon UNBERÜHRT —
keine Neubewertung, nur der Stand.

**DIE STRUKTUR IST ERLEDIGT.** Was gebaut, geprüft und live bewiesen ist, steht in
CLAUDE.md an der Phase-11-Zeile; die volle Herleitung in
`docs/claude-history/phase-11-multi-tracking.md`, dort besonders "## Der Einstieg
für die nächste Sitzung" und "## Die zwölf Scheiben". Beides wird hier NICHT
wiederholt.

**DIE OFFENEN ZIELE SIND KEINE KLASSE — SIE WERDEN EINZELN GELESEN.** Bis zum
2026-08-11 stand hier und in CLAUDE.md, die damals drei offenen Ziele seien
"Wiederholungen desselben Handgriffs, kein neues Fundament". Diese Aussage hatte
KEIN EINZIGES GEPRÜFTES MITGLIED; die Befunde darunter lösen sie je Ziel auf. **EINES
DER DREI HAT SICH SEITHER ALS WIEDERHOLUNG ERWIESEN — durch den BAU, nicht durch die
Behauptung.**

**PROVENIENZ DER BEIDEN VERBLIEBENEN ZIEL-BEFUNDE — sie ist einheitlich, und sie ist
SCHWACH:** Anbieter-Recherche des Architekten vom **2026-08-11 an FREMDER
DOKUMENTATION** — **NICHT am Code gemessen, NICHT live bestätigt, kein Aufruf gegen
ein echtes System.**
**DASS TIKTOK GEBAUT UND LIVE BEWIESEN IST, WERTET SIE NICHT AUF.** LinkedIn und
Google sind unverändert unbelegt; dass ein Nachbar-Posten den ganzen Weg bis zur
Produktion gegangen ist, ändert an ihrem Rang nichts. Wer das verwechselt, plant
einen Bau auf einer Doku-Lesung.

**DER OFFENE UMFANG, fünf Posten mit VERSCHIEDENEM Rang:**

1. **LINKEDIN — KEINE WIEDERHOLUNG.** Die Kennung ist eine Conversion-Regel-URN
   und gilt **JE EREIGNISTYP**, nicht je Projekt. **OWNER-ENTSCHEIDUNG vom
   2026-08-11:** Zuordnung Ereignisname -> URN (Option B), damit Kunden auf
   Conversion-Typen optimieren können. Das berührt, **WIE EIN EREIGNIS BESCHRIEBEN
   WIRD**, und ist damit eine PRODUKTÄNDERUNG, keine Adapter-Wiederholung.
   Weitere Abweichungen (Provenienz oben): Zeit in MILLISEKUNDEN (Meta: Sekunden) ·
   Betrag als Zeichenkette · Erfolg ist 201 · DREI Fehlerwege mit ZWEI
   verschiedenen Rumpfformen · ein Versions-Header, dessen Wert ein Datum ist und
   der abgeschaltet wird · als Identität nur die IP, NUR IPv4, der User-Agent zählt
   dort nicht · kein Testmodus gefunden — **ein Nicht-Treffer, KEIN Beweis der
   Abwesenheit**.
   Immerhin: das Zugangsdatum ist ein nicht ablaufendes Token aus dem Campaign
   Manager und passt in die Geheimnis-Tabelle.
2. **GOOGLE — ZWEI ZIELE, NICHT EINS, und keines davon zugeschnitten.** Google Ads
   Conversions und GA4 sind verschiedene Produkte mit verschiedenen Schnittstellen
   und Semantiken. Der bisherige Weg für Offline-Conversions ist für NEUE Zugänge
   seit Mitte Juni 2026 geschlossen; der Nachfolger ist für den relevanten Fall
   allowlist-only und verlangt einen OAuth-Fluss mit Verifizierung — also eine
   **AUTORISIERUNGSSCHICHT, keinen Tabelleneintrag**. Der GA4-Weg verlangt eine
   Besucher-Kennung aus einem Cookie, das dieses Produkt nicht setzt, und liefert
   ohnehin keine Ads-Conversion.
   Dazu ein bereits am **2026-08-03** benanntes **SCHEMA-RISIKO**: mehrwertige
   Anmeldungen passen nicht auf ein Geheimnis pro Zeile; im Ernstfall eine ZWEITE
   Migration auf der Geheimnis-Tabelle.
   **FOLGE: Google bekommt eine eigene KONZEPT-Runde, KEINE Scheibe.**
3. **DAS TRACKING-TESTMODUS-MODUL** (`test_event_code`). Klein, eigenständig;
   Kontext in `docs/claude-history/future-roadmap.md`, "Tracking-Testmodus für
   Kunden".
4. **DER TESTKNOPF — KEINE SCHEIBE.** Mehrere einzeln beweisbare Teile plus eine
   unentschiedene VORFRAGE (was überhaupt aufgerufen wird). Ohne deren Antwort hat
   kein Zuschnitt einen Gegenstand. Auflagen, Messbefunde und Begründung:
   `docs/claude-history/phase-11-multi-tracking.md`, "## Die dreizehnte Scheibe —
   Der Testknopf (VERSCHOBEN, Owner 2026-08-10)".
5. **CUSTOM-PIXEL — KEINE WIEDERHOLUNG, SONDERN EINE EIGENE ARCHITEKTUR-SCHEIBE.**
   Ungeklärt ist ZUERST, was es überhaupt ist: ein CLIENT-seitiges Snippet (dann
   gar kein Fan-Out-Ziel) oder ein SERVER-seitiger Empfänger mit kundeneigenem
   Endpunkt (dann hängen Fragen daran, die kein anderes Ziel stellt). Der Zuschnitt
   entsteht NACH dieser Klärung. Ausformuliert an der Phase-11-Zeile in CLAUDE.md.

**ZWEI AUFLAGEN GELTEN FÜR JEDES ZIEL, DAS GEBAUT WIRD, unverändert:** "ein drittes
Ziel erzwingt eine Entscheidung, keine Kopie" steht im Einstiegs-Block der
Historien-Datei; die Auflage, dass jedes weitere Ziel seine EIGENE
Constraint-Erweiterung mitbringt, steht in `docs/db-stand.md`, "## Aktueller
DB-/Analytics-Stand (Ist-Zustand, kein Konzept)", beim CHECK
`project_secrets_target_valid` — dort wird sie gepflegt, im Einstiegs-Block wird
sie nur berichtet.

**VERMERK ZUR DIVERGENZ — er gehört zwingend hierher, und er betrifft seit dem
2026-08-11 ZWEI Stellen desselben Blocks.** Der Einstiegs-Block in
`docs/claude-history/phase-11-multi-tracking.md` führt (1) Custom-Pixel zusammen
mit den drei Zielen als Wiederholung und (2) auch die drei Ziele selbst als
"Wiederholungen desselben Handgriffs". **BEIDES IST ÜBERHOLT.** Der Block wird
trotzdem NICHT korrigiert: Er liegt in einer Historien-Datei, und Historie wird
hier nicht nachträglich umgeschrieben — er ist ein Bericht vom 2026-08-10 und als
solcher richtig. **DIESE Datei steuert.** Wer beide liest, folgt dieser hier.

**DIE ROHFASSUNG HAT DIESER FORMULIERUNG AM 2026-08-03 NAMENTLICH WIDERSPROCHEN —
und der Einspruch stand ACHT TAGE unbeachtet.** In
`docs/claude-history/phase-11-multi-tracking-rohfassung.md`, Abschnitt "## Fragen,
die der Bau beantworten MUSS", Punkt (e), steht: *"Die fünf Ziele sind NICHT fünf
Kopien desselben Musters; jedes bringt eigene Pflichtfelder mit. Die
Roadmap-Formulierung 'additive Fan-Out-Ziele' (CLAUDE.md, Roadmap-Zeile Phase 11)
verdeckt das."* Die zitierte Zeile blieb bis zum 2026-08-11 unverändert.
**WARUM DAS HIERHER GEHÖRT:** Es erklärt, warum die Information im Repo LAG und
trotzdem nicht GEWIRKT hat — sie lag in der Datei, die ausdrücklich als "wird
nicht gepflegt, NICHT der Einstieg" geführt wird, und fehlte in der kuratierten
Fassung. Als Kandidat festgehalten in Abschnitt 6.

---

## 3. Die abgeschlossenen Scheiben — STABILE NUMMERN, KEINE CHRONOLOGIE

**DIE NUMMER IST EIN STABILER BEZEICHNER UND WIRD NIE NEU VERGEBEN.** Ein neuer
Vermerk tritt HINTEN an, auch wenn er der jüngste ist. **DER GRUND IST TEUER
BEZAHLT:** Eine Nachnummerierung hat in dieser Phase bereits lebende Verweise
getötet, und die Reparatur kostete zwei Runden.
**DIE REIHENFOLGE IM TEXT SAGT DAMIT NICHTS MEHR ÜBER DAS ALTER.** Wer sie als
Lesehilfe benutzt, liest das Falsche — die Position eines Vermerks ist seit dem
Wegfall der Nachnummerierung eine Frage seiner Entstehung, nicht seines Rangs.
**DIE AUTORITÄT IST DIE COMMIT-KETTE:** Entstanden sind sie in der Reihenfolge
`0291448` -> `91dbfe7` -> `86e6911` -> `9ad3080` -> `81b544f` -> `6ef7d2f` -> `70cc265`
-> `ca321c3` -> `724edd3` -> `6e1be7a` -> `c0bfd50`. Sie wächst mit jeder Scheibe, und ihr
LETZTES GLIED ist der jüngste COMMITTETE Vermerk.
**DIE LÜCKE GEHÖRT ZUR REGEL, sonst greift sie im wichtigsten Moment nicht:** Ein
Vermerk, der in der Kette NICHT vorkommt, ist noch nicht committet — und damit per
Konstruktion der jüngste. **Wer den heutigen Stand sucht, sieht ZUERST dort nach.**
Welcher das ist, sagt der Vermerk selbst: Er führt seinen ausstehenden Commit als
offenen Punkt, und dort wird die Nummer nachgetragen — womit er in die Kette
einrückt und die Lücke wandert.
**WARUM DIE COMMITS UND NICHT DAS DATUM — der Grund ist mit der vierten Scheibe eher
STÄRKER geworden, nicht schwächer:** Die ersten drei sind am selben Tag fertig
geworden, das Datum trennte sie also gar nicht. Die vierte stammt vom Folgetag und
liesse sich am Datum einordnen — aber eine Regel, die nur solange trägt, wie die
Scheiben auf verschiedene Tage fallen, ist keine.

---

### 3.1 DIE BESCHRIFTUNG DER VERLUST-KACHEL — ERLEDIGT (2026-08-12)

**Commit:** `9ad3080`.

**WAS GEÄNDERT WURDE — AUSSCHLIESSLICH TEXT:** Die Verlust-Kachel (`MeasureView` in
`src/components/`) trägt eine Hinweiszeile, die den gemessenen ANBIETER benennt. Dazu
eine Testdefinition über beide Zustände der Kachel. **Sonst nichts.**

**WAS AUSDRÜCKLICH NICHT GEÄNDERT WURDE, und der Satz gehört hierher, weil eine
Kachel-Scheibe genau danach aussieht:** KEINE Berechnung, KEIN Schwellwert, KEIN
Zustand, KEINE Anzeige-Bedingung. Die RPC, ihre TS-Spiegelung, der Lesepfad und jede
Migration blieben unberührt. **Die Zahl ist dieselbe wie vorher** — sie war nie
falsch, nur ihre Überschrift war zu breit.

**DER GEMESSENE GRUND (2026-08-12, read-only am Code):** Der ZÄHLER entsteht aus einer
Browser-Bestätigung, und die hängt am `onload` von **Metas Script-Element**. Ohne
Metas Kennung existiert die Bestätigungs-Maschinerie gar nicht — dann entsteht NIE
eine browser-Zeile, und die Kachel bleibt dauerhaft im Neutral-Status. Die Zahl ist
damit die Blockrate GENAU EINES Anbieters.
**WARUM DAS ERST JETZT EINE FALSCHE BESCHRIFTUNG IST:** Mit EINEM Ziel war
"Adblocker-Verlust" dasselbe wie "Blockrate dieses Anbieters". Seit ein Projekt bis zu
drei Ziele trägt, klingt die Überschrift breiter, als die Zahl deckt — **und sie steht
in der OBERFLÄCHE, nicht in einer Doku.**

**DIE ZEILE STEHT AUSSERHALB DER VERZWEIGUNG, und das war eine Entscheidung, keine
Bequemlichkeit:** Der Neutral-Status ("Warte auf erste Bestätigung") war über den
GRUND genauso stumm wie die Zahl. Dieselbe eine Zeile erklärt jetzt auch das
Schweigen. Eine zweite, eigene Zeile für den Neutral-Fall wäre eine Zeile mehr in
einer Seitenspalte gewesen, in der Wachstum anderes verdrängt.

**DER ANBIETER-NAME KOMMT AUS `TARGET_CARDS`** (`src/components/TargetCard.tsx`),
nicht als Literal: Der Zugriff ist gegen `Record<TrackingTarget, …>` compiler-geprüft.
Wird das Ziel umbenannt, ist die Zeile ein BUILD-Fehler statt einer Beschriftung, die
still auf einen Anbieter zeigt, den es nicht mehr gibt.

**KEIN LIVE-TEST — UND DAS IST KEINE LÜCKE, SONDERN DIE FOLGE DES ZUSCHNITTS:** Ein
Live-Test beweist Verhalten. Hier hat sich keines geändert: kein Rechenweg, kein
Zustand, keine Bedingung, kein Request. Was sich geändert hat, ist ein Textknoten —
und dass er gerendert wird, ist im Test beweisbar.
**WAS DAMIT UNBEWIESEN BLEIBT, ausdrücklich:** wie die Zeile AUSSIEHT. Die
Testumgebung wertet kein CSS aus; Abstand, Position und Verdrängung in der
Seitenspalte sind Live-Test-Achsen und wurden NICHT gemessen. Der Test ist eine
STRUKTUR- und TEXT-Zusicherung.

**DIE PROBEN:** Zwei Mutationsproben mit vorab notierter Vorhersage, beide ohne
Abweichung — die Zeile entfernt (beide Fälle fallen), die Zeile in den Zahlen-Zweig
verschoben (**genau der Neutral-Fall fällt**). Die zweite ist der Ertrag: Sie belegt,
dass der Neutral-Fall der EINZIGE Wächter dieser Fehlerklasse ist und keine
Verdopplung — der Befund steht im Kommentar des Tests, damit ihn niemand später als
redundant entfernt.

**AUSDRÜCKLICH NICHT BEHOBEN:** dass bei ABGELEHNTER Einwilligung für dieses Ziel der
Nenner ohne den Zähler wächst. Das ist ein DEFEKT, keine Beschriftung, und er braucht
eine Ziel-Dimension auf den Ereignissen — verortet in Abschnitt 7.3 (c) und an der
Phase-8-Zeile in CLAUDE.md. **Hier wurde nur der Text wahr.**

---

### 3.2 TIKTOK ALS DRITTES FAN-OUT-ZIEL — ERLEDIGT UND LIVE BEWIESEN (2026-08-11)

**Commits:** `86e6911` (Bau), `8ff598a` (Richtigstellung der Consent-Schlüssel-
Begründung).

**WAS GEBAUT WURDE:** der Adapter (`forwardToTiktok` in
`src/lib/capi/tiktok-forward.ts`), die sechs Vokabular-Stellen, die Migration `0023`
und zwanzig Tests; dazu vier geplante Mutationsproben plus eine Gegenprobe, alle mit
vorab notierter Vorhersage und ohne Abweichung.
**WO DIE ANBIETER-FORM STEHT:** im KOPF DES ADAPTERS — Endpunkt, Auth-Kopfzeile,
Rumpfform, Feldnamen, Zeiteinheit, beide Antwortformen, drei Fehlercodes und die
sechs Stellen, an denen dieser Adapter anders ist als die beiden bestehenden. Sie
wird hier NICHT wiederholt; der Code ist dafür die Quelle, nicht diese Datei.

**DER LIVE-TEST — GEMESSEN am 2026-08-11** gegen die DEPLOYTE Produktion, Testmodus
des Anbieters aktiv, publizierte Seite, echter Besucher-Kontext:

- **MIGRATION 0023 — eingespielt und gemessen:** Einfügen mit dem neuen Zielwert
  ANGENOMMEN, Einfügen mit einem Tippfehler mit **23514** ABGEWIESEN, die
  Constraint-Definition trägt drei Zielwerte im Wortlaut. Probe-Zeilen entfernt,
  Gegenprobe null. **Die Annahme allein hätte nichts bewiesen** — bei einem
  Constraint, der alles durchlässt, sähe sie identisch aus.
- **REGRESSION:** Meta und Pinterest unverändert, beide Forwards im Log, und **kein**
  TikTok-Forward vor dem Hinterlegen der Zugangsdaten.
- **DER EINWILLIGUNGS-SCHLÜSSEL:** nach dem Republish im ausgelieferten Quelltext
  nachgewiesen. **Die tragende Zeichenfolge ist die Abfrage im Beacon-Rumpf, nicht
  das Feld allein** — das Feld beweist nur, dass irgendein Draht existiert.
- **DER FAN-OUT:** alle DREI Ziele im selben Lauf im Log.
- **DER NACHWEIS BEIM ANBIETER:** Das Ereignis erscheint im Testmodus-Tab als
  **STANDARD-Ereignis** unter dem erwarteten Namen, mit übereinstimmender
  Ereignis-Kennung, Wert, Währung, IP und User-Agent. **Keine Custom-Kennzeichnung.**
  **EINE UNTERSCHEIDUNG, DIE MITMUSS, weil sie schon einmal zu einer Fehllesung
  geführt hat:** Die Angabe zur INTEGRATIONSART („von Hand geschrieben") steht bei
  JEDEM unserer Ereignisse, auch bei den nachweislich standardisierten. **Sie ist
  NICHT die Custom-Kennzeichnung** — die steht als Suffix am Titel. Wer die beiden
  verwechselt, liest ein Standard-Ereignis als Custom.
- **DER ADAPTER SCHWEIGT BEIM ERFOLG:** keine Zeile im Log, also `code 0`.
- **DIE GEGENPROBE mit absichtlich falschem Zugangsdatum:** genau EINE Zeile — HTTP
  401, der Fehlercode lesbar, die Anbieter-Meldung unbereinigt weitergereicht (kein
  Wort erreicht die Schwärzungs-Grenze), die **Vorgangs-Kennung GESCHWÄRZT**, und das
  Zugangsdatum erscheint **nirgends**.
  **DAS IST EINE POSITIVKONTROLLE DER SCHWÄRZUNG IM ECHTEN BETRIEB, und sie ist mehr
  wert als der Erfolgsfall:** Beim ersten Adapter blieb die Schwärzung im Live-Test
  STUMM — die Meldung trug keine Folge über der Grenze, und der Nachweis hing allein
  am Echo-Test. Hier hat sie sichtbar gefeuert.

**WAS DER LIVE-TEST NICHT GEZEIGT HAT:** die RÜCKSPIEGELUNG unserer eigenen Eingabe.
Sie ist am 2026-08-11 an einem ANDEREN Fehlerweg gemessen; im Live-Lauf trat dieser
Weg nicht ein. **Die Schwärzung dagegen ist live belegt** — beides gehört
auseinandergehalten.

**UNGEKLÄRT, unverändert aus dem Zuschnitt übernommen und NICHT durch diesen
Abschluss erledigt:** der vollständige Umfang des Fehlercode-Bereichs (drei Codes
sind gemessen, wie viele es gibt, ist unbekannt) · die vollständige Liste der
Standard-Ereignisnamen beim Anbieter und die Abbildung unserer Namen darauf · **ob
Ereignisse ohne E-Mail und Telefonnummer für die ATTRIBUTION zählen** (der Test-Tab
warnt, sie würden „nur mit Manual Advanced Matching gezählt"; ob damit eine ZÄHLUNG
gemeint ist oder die Attribution insgesamt, ist am Text nicht entscheidbar — eine
Frage an den ANBIETER, keine an den Code).
**RECHERCHIERT, unverändert:** Die Match-Qualität ist mit IP und User-Agent allein
strukturell niedrig und steuert beim Anbieter den Zugang zu Optimierungszielen —
eine Erwartungs-Frage an den Betreiber, kein Baufehler.

---

### 3.3 DIE EXTRAKTION DES SCHWÄRZ-PRIMITIVS — ERLEDIGT (2026-08-11)

**Commit:** `91dbfe7`. **KEIN LIVE-TEST, und das ist keine Lücke:** Die Scheibe
ändert kein Verhalten; ihr Beweis ist die ZEICHENGLEICHHEIT des verschobenen Rumpfes
plus die unverändert grünen Tests des ersten Adapters.

**WAS GEBAUT WURDE:** `redactOpaque` und die zwei Konstanten, an denen es hängt, sind
aus `src/lib/capi/meta-forward.ts` in die REINE Datei `src/lib/redact.ts` gezogen
worden — **der Funktionsrumpf zeichengleich, per `diff` belegt**; die einzige
Abweichung ist das Schlüsselwort `export`. Ein zeichengleich verschobener reiner
Rumpf kann sein Verhalten nicht ändern.
**WAS NICHT MITWANDERTE:** die drei Aufbereitungen und die zwei Deckel-Konstanten.
Sie tragen METAS POLITIK — welches Feld wie behandelt wird —, und die ist je Adapter
verschieden. **Geteilt wird das WERKZEUG, nicht die Politik.**
**ACHT CHARAKTERISIERUNGEN** halten das heutige Verhalten fest (Mindestlänge
beidseitig der Grenze, der Zeichenvorrat als Teil der Grenze, Globalität, Wurf bei
Nicht-Strings, Leerwerte, und dass das Primitiv NICHT kappt); vier Mutationsproben
trafen exakt die vorhergesagten Tests.
**DAS ZWEITE ZIEL BENUTZT DIE DATEI BEWUSST NICHT:** Seine eigene Fassung ist an
sechs Achsen ungedeckt, ein Umzug wäre heute ein unbeobachteter Eingriff. Die
Auflösungs-Bedingung steht im Kopf der neuen Datei — s. auch den Vorrats-Punkt dazu.

---

### 3.4 DER LOG-LEAK AM META-ADAPTER — ERLEDIGT UND LIVE BESTÄTIGT (2026-08-11)

**ERLEDIGT UND LIVE BESTÄTIGT (2026-08-11).** Einstufung: Tier 1 im
Security-Manifest, Item "META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK"
(CLAUDE.md, "### Tier 1 — Vor echtem Ad-Traffic / Spend"; Vollfassung in
`docs/claude-history/security-manifest-full.md`). Gegenstand war
`describeMetaError` in `src/lib/capi/meta-forward.ts`.

**DER ZUSCHNITT STAND BIS HIERHER AN DIESER STELLE ALS ANFORDERUNGSLISTE.** Er ist
mit dem Abschluss ABGELAUFEN und durch diesen Vermerk ersetzt; was er verlangte,
steht jetzt als das, was tatsächlich entstand. Was über die Scheibe hinaus BINDET,
steht in Abschnitt 4 und ist NICHT verdichtet worden.

**WAS GEBAUT WURDE** (Commit `0291448`):

- Der Nicht-JSON-Ausgang gibt den Antwort-Rumpf nicht mehr aus; an seine Stelle
  treten Status, Content-Type und Länge. Der Content-Type ist SELBST Fremdtext
  (eine Kopfzeile ist frei belegbar) und läuft deshalb durch dieselbe Schwärzung.
- Metas Fehlermeldung wird geschwärzt und DANACH gekappt — in dieser Reihenfolge.
- Die enum-artigen Felder (Code, Subcode, Typ) tragen einen harten kurzen Deckel.
- `fbtrace_id` bleibt ungeschwärzt und wird nur längenbegrenzt; Begründung und
  Auflage unverändert in Abschnitt 4 (a).
- Die Schwärzung ist eine EIGENE Fassung, im Code als bewusstes Duplikat samt
  Auflösungs-Bedingung benannt. Der zweite Adapter blieb byte-identisch.
- Der Kommentar, der Metas Fehlermeldung für unbedenklich erklärte, ist ersatzlos
  verschwunden.
- Acht neue Tests, darunter der Echo-Test und sein Zwilling; vier einzeln
  gefahrene Mutationsproben, keine blieb grün.

Fundstellen: `redactOpaque`, `asProviderText`, `asProviderEnum`, `asTraceId` und
`describeMetaError` in `src/lib/capi/meta-forward.ts`; Tests in
`src/lib/capi/meta-forward.test.ts`.

**DER LIVE-TEST — GEMESSEN am 2026-08-11** an der DEPLOYTEN Produktion, mit einem
ERFUNDENEN Geheimnis in einem Wegwerf-Projekt (Messweg: Beacon gegen die
Produktions-URL, Ablesung in den Laufzeit-Protokollen):

- Regression: Projekt ohne Zugangsdaten -> leere 204, Analytics-Zeile entsteht,
  KEINE Meta-Zeile im Log.
- Positivkontrolle des Kanals: `[capi] Meta forward failed: HTTP 400` erschien.
- Befund, zweite Zeile: `code=190 subcode=- type=OAuthException
  fbtrace=AvPfcUKv2bh3UhS0-vNDCXs msg=Invalid OAuth access token - Cannot parse
  access token`
- Das erfundene Geheimnis erschien nirgends.

**DIE FBTRACE-MESSUNG UND WAS SIE BELEGT — 23 Zeichen** (gemessen am selben Lauf):
Das liegt UNTER dem harten Deckel von 64, der Bezeichner kam also VOLLSTÄNDIG
durch — und zugleich ÜBER der Schwärzungs-Grenze von 20. Der Bindestrich gehört
zum Zeichenvorrat der Schwärzung, es ist damit EINE zusammenhängende Folge.
**Ohne die Ausnahme aus Abschnitt 4 (a) stünde dort `<redacted>`.** Die
Entscheidung war eine Abwägung; sie ist jetzt live BELEGT statt nur begründet — im
ersten echten Fehlerfall wäre der einzige Wert verschwunden, mit dem man den
Anbieter-Support ansprechen kann.

**WAS DER LIVE-TEST NICHT GEZEIGT HAT — der wichtigere Teil dieses Vermerks:**

- **DIE SCHWÄRZUNG IST LIVE GAR NICHT ANGESPRUNGEN.** Die gemessene Meldung
  enthielt keine Folge über der Grenze. Der Lauf belegt, dass die DIAGNOSE
  überlebt und nichts regressiert ist — er belegt NICHT, dass die Schwärzung
  wirkt. Das tut allein der Echo-Test in `src/lib/capi/meta-forward.test.ts`.
- **DER BEOBACHTETE FEHLERWEG WAR EIN BESTIMMTER:** der Anbieter konnte das
  Zugangsdatum nicht PARSEN. Ein formal gültiges, aber falsches Geheimnis oder die
  Beanstandung eines anderen Parameters kann anders ausfallen. **EINE BEOBACHTUNG
  IST KEINE ALLAUSSAGE:** Wer daraus "der Anbieter spiegelt nicht zurück" macht,
  liefert die Begründung, diese Massnahme später auszubauen.
- **DER NICHT-JSON-AUSGANG IST LIVE NICHT ERZWINGBAR** — er verlangt eine
  nicht-JSON-Antwort des Anbieters. Er bleibt allein durch die Tests zum
  Nicht-JSON-Ausgang und zum Containment gedeckt: als LÜCKE vermerkt, NICHT als
  bestanden.

**DIE ZWEI NACHZUZIEHENDEN BELEGE SIND VOLLZOGEN — beide Achsen, wie verlangt**
(geprüft am 2026-08-12 am Bestand): Der `describe`-Name in
`src/lib/capi/ingest.persist.test.ts` nennt die Schwärzung, nicht mehr "sanitized"
(nachgezogen im Bau-Commit). Der Eintrag "CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN
PAAR" in CLAUDE.md nennt weder "sanitized" noch die Ingest-Datei, sondern die
Schwärzung nach FORM und `src/lib/capi/meta-forward.ts` (nachgezogen im unmittelbar
folgenden Commit).
**HIER STAND EIN VERWEIS AUF EINEN EIGENEN ABSCHNITT 5 mit der Anforderungsliste.**
Der Abschnitt ist am 2026-08-12 aufgelöst, weil beide Punkte vollzogen sind und seine
Überschrift ("dieser Scheibe") mit der vierten Scheibe mehrdeutig wurde. **Der Verweis
ist deshalb nicht bloss entfernt, sondern durch den Vollzug ERSETZT:** Eine blosse
Streichung hätte eine Zusage verschwinden lassen, ohne zu sagen, ob sie eingelöst
wurde — und eine stehengelassene Nummer hätte nach der Nachnummerierung noch
AUFGELÖST, nur auf den Vorrat.

**AUSDRÜCKLICH NICHT IN DIESER SCHEIBE — unverändert offen:** die Kodierung der
Kennung im Endpunkt-Pfad, die Wurffreiheit des Nutzlast-Baus, die dritte
Trimm-Kopie (alle drei im Vorrat, Abschnitt 5), der Testknopf und weitere Ziele
(beide in Abschnitt 2).

---

### 3.5 DER BENANNTE ZUSTAND ENTSTEHT — SCHEIBE A DER VEREINHEITLICHUNG, ERLEDIGT (2026-08-12)

**WARUM DIESER VERMERK UNTEN STEHT UND NICHT OBEN, entgegen der Regel "jüngste
zuerst" am Kopf dieses Abschnitts:** Eine Einordnung als neue 3.1 verlangte, die
vier bestehenden Vermerke nachzunummerieren — und das tötete SECHS lebende Verweise
in dieser Datei (die Lesehilfe am Abschnittskopf, zwei Vorrats-Punkte, die
Verortung 7.3 (d) und zwei Querverweise innerhalb der Vorrats-Punkte). Genau diese
Fehlerklasse ist in dieser Phase schon einmal eingetreten und zwei Runden lang
repariert worden. **Die Reihenfolge-Regel bleibt für die vier bestehenden Vermerke
gültig; sie ist hier zugunsten stabiler Nummern zurückgestellt, nicht aufgehoben.**

**Commit:** `81b544f` — NACHGETRAGEN am 2026-08-13, wie es der Satz an dieser Stelle
verlangte. Hier stand bis dahin, der Commit stehe noch aus; das war als Aussage über
jenen Tag richtig und ist es seit der Freigabe nicht mehr. **Der Nachtrag ist nicht
Kosmetik:** Ein Vermerk ohne Nummer gilt nach der Regel am Abschnittskopf als der
JÜNGSTE (die Lücke in der Kette), und mit einem weiteren Vermerk darunter zeigte
diese Lücke auf die falsche Scheibe.

**WAS GEBAUT WURDE — ZWEI NEUE DATEIEN, KEINE BESTEHENDE GEÄNDERT:** der benannte
Zustand samt seinen zwei einzeln verwendbaren Prädikaten (`targetReadiness`,
`hasPixelId`, `hasSecret` in `src/lib/tracking/target-readiness.ts`) und die
zugehörige Testdatei. **NEUN Tests** (T1–T9); die Suite wächst von 1037 auf 1046,
die Zahl der Testdateien von 54 auf 55. Alle vier Gates grün (tsc, lint, vitest,
build).

**DER ZUSTAND HAT KEINEN KONSUMENTEN, und das ist der Zuschnitt, kein Versäumnis:**
Die Datei wird von NICHTS importiert. Die Anwendung verhält sich nach dieser Scheibe
zeichengleich wie vorher.

**KEIN DRITTES URTEIL — die tragende Grenze, und sie ist eingehalten:** Die Datei
NIMMT die drei Tatsachen ENTGEGEN und behauptet über kein Ziel etwas. Sie enthält
keine Ziel-Liste, keinen Record über Ziele und keinen Vergleich gegen einen
Zielwert. Der Grund steht im Dateikopf: Beide heutigen Quellen sind für eine reine
Datei unerreichbar — die eine liegt in einer Client-Komponente, die Server-Actions
importiert, die andere in einem Handler, der server-only-Module zieht.

**ZWEI ENTSCHEIDUNGEN, DIE IM CODE BEGRÜNDET STEHEN:**
- **Der Zustand nennt ALLE fehlenden Teile, nicht einen Grund** — damit entfällt jede
  Rangfolge. Der Bestand gibt keine her: Die einzige Reihenfolge im Repo steht im
  Auflösungs-Pfad und ist dort ausdrücklich mit ABFRAGE-ÖKONOMIE begründet, nicht mit
  Vorrang. Der erste Konsument, der eine Rangfolge bräuchte, entsteht in Scheibe B.
- **Die Adapter-Tatsache ist eine Eigenschaft des BUILDS, nicht des Projekts** —
  Kennung und Zugangsdatum stammen aus den Daten eines Projekts, "hat dieses Ziel
  einen Adapter" ändert sich nur mit einem Deploy. Wer sie später in den
  Einstellungen oder in der Geheimnis-Tabelle sucht, sucht am falschen Ort.

**EIN GEMESSENER NEBENBEFUND, der beim Bau sichtbar wurde und im Bestand liegt:**
Die beiden Leer-Regeln sind ASYMMETRISCH. Die Kennung läuft durch `getPixelId` und
ist getrimmt — ein Wert aus reinem Leerraum gilt als abwesend. Das Zugangsdatum wird
im Auflösungs-Pfad NICHT getrimmt — ein Geheimnis aus reinem Leerraum gilt dort als
VORHANDEN. **Das ist kein Fehler dieser Scheibe, sondern der abgebildete Bestand**,
und T6 nagelt ihn samt Begründung fest. Wer die beiden "harmonisiert", ändert
Verhalten, ohne es zu merken.

**DIE FÜNF MUTATIONSPROBEN — alle mit Vorab-Ansage, alle ohne Abweichung im
Ergebnis** (2026-08-12, je genau eine Achse, nach jeder Probe Rücknahme und
Prüfsummen-Abgleich, weil `git diff` neue Dateien nicht sieht):
M1 Lieferfähigkeits-Bedingung aufgeweicht → sechs Tests, alle derselben Klasse ·
M2 Trim der Kennung entfernt → zwei · M3 Leer-Prüfung des Zugangsdatums auf reine
Existenz → zwei · M4 Adapter-Teil aus der Sammlung → **genau einer** ·
M5 Nutzlast auf die leere Menge → fünf.

**WAS DIE PROBEN AN EINER ZUSAGE KORRIGIERT HABEN, und das ist der Ertrag, den man
sonst verlöre:** Der Zuschnitt nahm an, T9 trage die Fehlerklasse "der Zustand
kollabiert auf einen Wahrheitswert" ALLEIN. **M5 hat das widerlegt** — es fielen
fünf Tests. Der Kommentar an T9 ist deshalb auf das Gemessene berichtigt: Er ist
nicht der einzige Wächter, aber der einzige Test, der ZWEI Fehl-Zustände
MITEINANDER vergleicht. **Umgekehrt ist T7 durch M4 als echtes Einzelstück BELEGT**
und trägt den Vermerk. Bei T8 ist die Aussage bewusst schwächer gefasst: Sie beruht
auf der Abdeckung, nicht auf einer Probe — seine Fehlerklasse entsteht erst mit
einem Konsumenten und ist als Ein-Achsen-Mutation hier gar nicht herstellbar.
**DIE ZEIGER AUF T7, T8 UND T9 SIND SEIT DEM 2026-08-13 TOT** (s. Abschnitt 3.12): Diese
sieben Tests liefen über die Zusammensetzung und sind mit ihr entfallen. **Der Absatz
bleibt unverändert** — er ist ein Bericht über jene Runde, und seine Lehre (ob ein Test
ein Einzelstück ist, sagt die Messung und nicht der Zuschnitt) überdauert die Tests, an
denen sie gewonnen wurde. **T5 und T6 gibt es weiter, unverändert.**

**KEIN LIVE-TEST, UND DAS IST KEINE LÜCKE:** Ein Live-Test beweist Verhalten; hier
hat sich keines geändert, weil es keinen Aufrufer gibt. Was in Scheibe B live zu
prüfen ist, steht dort.

**SCHEIBE C IST KEIN ÜBERNEHMEN, SONDERN EIN QUELLE-SCHAFFEN — dieser Befund gehört
zwingend hierher, weil der Zuschnitt sie sonst für die kleinste der vier hält:**
Bei B und D gibt es je eine bestehende Ableitung, die auf den neuen Zustand
umgestellt wird. Bei C gibt es das NICHT. Die Adapter-Tatsache hat nach dieser
Scheibe unverändert ZWEI Träger — das Feld `hasAdapter` in `TARGET_CARDS`
(`src/components/TargetCard.tsx`) und die Ziel-Zweige in `dispatchForward`
(`src/lib/capi/ingest.ts`) —, und **beide bestehen fort**. Der neue Zustand nimmt
die Tatsache entgegen; er bezieht sie nicht. **OFFEN und in dieser Scheibe NICHT
entschieden ist, ob sich daraus überhaupt eine gemeinsame Quelle machen lässt, ohne
den Ingest-Pfad anzufassen.** Solange das offen ist, ist C keine kleine Scheibe und
kein Nachziehen — sie ist die einzige der vier, die eine neue Wahrheitsquelle
erzeugen muss, statt eine bestehende umzuhängen.

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** dass irgendein Konsument den
Zustand benutzt (es gibt keinen) · dass die drei Teile mit den Quellen
übereinstimmen, aus denen sie später gespeist werden (getestet sind Eingaben, nicht
Herkünfte) · dass der Defekt behoben ist (T3 bildet ihn ab, behebt ihn nicht — die
beiden divergierenden Urteile stehen unverändert) · irgendetwas über Darstellung
oder Wortlaut (es gibt keine Ansicht).

---

### 3.6 DIE PAARUNG BENUTZT DIE GETEILTEN PRÄDIKATE — SCHEIBE B1 DER VEREINHEITLICHUNG, ERLEDIGT (2026-08-13)

**Commit:** `6ef7d2f` (GEMESSEN am Repo, 2026-08-13, `git log`). Damit steht in
Abschnitt 3 **keine Lücke mehr** — alle sechs Vermerke tragen ihre Nummer.

**B1 HEISST NICHT „DEFEKT BEHOBEN", und dieser Satz steht bewusst zuerst:** Nach dieser
Scheibe divergieren die beiden Urteile UNVERÄNDERT weiter — die Oberflächen-Ableitung
meldet konfiguriert, sobald eine Geheimnis-Zeile existiert, der Auflösungs-Pfad verlangt
Kennung UND Zugangsdatum. **Geteilt ist allein die SPRACHE der Bedingungen.** Die
Invariante (6) des Zuschnitts („Urteil 1 und 2 beantworten die Frage über DIESELBEN
Funktionen") ist erst nach B2 erfüllt. Der Vorrats-Punkt „'KONFIGURIERT' HEISST AN ZWEI
ORTEN VERSCHIEDENES" in Abschnitt 5 bleibt deshalb **unberührt stehen**.

**WAS GEBAUT WURDE — DREI DATEIEN, KEIN NEUES VERHALTEN:**
- `hasSecret` (`src/lib/tracking/target-readiness.ts`) trägt jetzt ein TYP-PRÄDIKAT
  (`secret is string`) statt `boolean`. **Rumpf und Kommentare zeichengleich.**
  **GEMESSEN (2026-08-13):** Beide Fassungen einzeln nach JavaScript übersetzt und
  verglichen — der erzeugte Code ist BYTE-IDENTISCH (gleiche Prüfsumme). Die
  Verfeinerung erspart dem Aufrufer eine Zusicherung, die noch einmal behauptete, was
  das Prädikat gerade entschieden hat.
- `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`) bezieht BEIDE Bedingungen aus
  jener Datei: `hasPixelId` im Kennungs-Filter, `hasSecret` in der Geheimnis-Schleife.
  **ERSETZT, NICHT ERGÄNZT** — es steht dort keine eigene Ausformulierung mehr daneben.
- Drei Tests (N1, N2, N3) in `src/lib/capi/token.test.ts`. Die Suite wächst von 1046 auf
  1049, die Zahl der Testdateien bleibt 55. Alle vier Gates grün (tsc, lint, vitest,
  build).

**WAS AUSDRÜCKLICH NICHT ANGEFASST WURDE:** die zweite Abfrage samt ihrem
`in(target, …)`-Filter, die Reihenfolge Kennung-Filter → Früh-Ausstieg →
Geheimnis-Abfrage, die Zahl der Abfragen (weiterhin GENAU ZWEI), der Kill-Switch-Zweig.
**`targetReadiness` selbst hat auch nach B1 KEINEN Konsumenten** — importiert werden nur
die beiden Prädikate. Der Grund ist am Kontrollfluss belegt und keine Auslassung: Die
Zusammensetzung verlangt als dritten Teil den Adapter, den diese server-only-Datei nicht
kennt, und für ein Ziel OHNE Kennung wird der Geheimnis-Wert dort gar nicht erst geholt.
**Der erste Konsument entsteht in C.**

**DER ERTRAG DIESER SCHEIBE IST EINE WIDERLEGTE ANNAHME, nicht der Umbau** — und sie
steht hier, weil ein widerlegter Befund ein ERGEBNIS ist und kein Makel:

Der Zuschnitt trug als gemessenen Befund, die Verhaltensneutralität sei auf einer Achse
UNBEWACHT: Eine formale Suche über `src/` nach einer Fixture mit leerer Zeichenkette als
Geheimnis hatte KEINEN Treffer ergeben (GEMESSEN am 2026-08-12), und daraus war
geschlossen worden, eine Aufweichung von `hasSecret` liesse „ein Ziel mit leerem
Zugangsdatum in den Forward laufen". **Die Mutationsproben M2 und M3 (GEMESSEN am
2026-08-13) haben das widerlegt:** Der eigens dafür gebaute Test N1 blieb GRÜN. Ursache
ist ein ZWEITER, unabhängiger Riegel tiefer im selben Pfad — die Paarung verwirft falsy
Werte ohnehin (`if (!token) continue` in `getCapiConfigByTrackingKey`). Ein leeres
Zugangsdatum wird also auch dann kein Empfänger, wenn das Prädikat vollständig kaputt
ist.

**DIE LEHRE, die den Fall überdauert: EINE SUCHE OHNE TREFFER BELEGT EINE LÜCKE ERST,
WENN DER PFAD DANEBEN MITGELESEN IST.** Die Suche war korrekt ausgeführt; falsch war der
Schluss von der fehlenden Fixture auf die fehlende Deckung.

**WAS DARAUS FOLGTE — N3, und er ist mutationsbelegt:** Die Achse wird von einer ANDEREN
Fixture bewacht als angenommen. Ein TRUTHY Nicht-String (die Zahl 42) passiert den
Falsy-Riegel und wird heute allein von `hasSecret` verworfen. **GEMESSEN (M5 am
2026-08-13, Prädikat auf reine Existenz aufgeweicht): N3 fällt, dazu T4 und T6 in
`target-readiness.test.ts` — drei Tests, eine Fehlerklasse; N1, N2 und der
Nachbar-Test „Token null" bleiben grün.** N3 ist damit der EINZIGE Test, der eine
Aufweichung des geteilten Prädikats auf der token-Seite sichtbar macht; das steht in
seinem Kommentar, damit ihn niemand als Variante von N1 entfernt.
**N1 BLEIBT TROTZDEM** — seine Zusicherung ist wahr und stand vorher nirgends im Repo;
er sichert das ERGEBNIS des Pfades, nicht die Bedingung, aus der es folgt. Sein
Kommentar ist auf das Gemessene berichtigt und verweist für die Achse auf N3. Dieselbe
Behandlung wie bei T9 in Abschnitt 3.5.

**DIE FÜNF PROBEN — alle mit Vorab-Ansage** (2026-08-13, je genau eine Achse, nach jeder
Probe Rücknahme, Prüfsummen-Abgleich und `git status` mit Ausschluss leerer Diffs):
M1 Kennungs-Prädikat umgekehrt → **neun** Tests, alle in derselben Datei, alle derselben
Klasse, keine Abweichung · M2 Prädikat auf reine Existenz → **Abweichung, s. oben** ·
M3 Nicht-Leere-Prüfung entfernt → zwei, wie nach M2 korrigiert angesagt · M4 Trim
ergänzt → zwei (T6 und N2), keine Abweichung · M5 (nach dem Nachzug) → drei, keine
Abweichung. Gegenprobe unverändert → alles grün.
**DER ÜBERSCHUSS BEI M2 UND M3 IST ABDECKUNG, KEINE KASKADE:** T4 fiel zusätzlich zu T6
und meldet wörtlich dieselbe Klasse („ein leeres Zugangsdatum gilt als vorhanden") an
einer zweiten Fixture.

**DIE LIVE-KONTROLLE IST GEFAHREN UND BESTANDEN — GEMESSEN (Live, 2026-08-13, Lauf des
Architekten gegen die deployte Produktion; nicht von mir beobachtet, sondern berichtet).**
Hier stand bis zum Lauf, sie stehe aus; das war als Aussage über jenen Zeitpunkt richtig.
Der Fall hatte seinen Soll-Ausgang VORHER festgelegt: ein vollständig eingerichtetes Ziel
forwardet weiter. **WORAUF DAS ERGEBNIS RUHT, in drei Teilen:**
- Auslösung auf der PRODUKTIONS-URL, nicht lokal; `/api/e` antwortete **204**.
- Am kontrollierten Ziel **keine Fehlerzeile** im Laufzeitprotokoll. **Diese Abwesenheit
  ist hier ein Beleg und nicht bloss ein Schweigen — und der Grund gehört zwingend
  dazu:** Derselbe Log-Kanal hat im SELBEN Lauf nachweislich geschrieben, nämlich für ein
  anderes Ziel (s. den Block darunter). Ohne diesen Mitläufer wären „nichts passiert" und
  „der Kanal schreibt gar nicht" nicht zu unterscheiden gewesen.
- Das **Server-Ereignis kam im Werkzeug des Anbieters an**, zugeordnet über die
  **EREIGNIS-KENNUNG** — nicht über die Uhrzeit. Die Uhrzeit trennt zwei Auslösungen in
  derselben Minute nicht und sagt bei einem deduplizierten Paar nicht, welche Hälfte man
  vor sich hat.

**DIE FOLGERUNG, ENG GEFASST:** Die Übernahme der beiden Bedingungen ist **für ein
vollständig eingerichtetes Ziel verhaltensneutral**. **NICHT belegt** ist damit
irgendetwas über die anderen Ziele, über die Oberfläche oder über den Defekt — der Lauf
hatte EINEN Gegenstand, und eine Prüfung mit einem Gegenstand sagt über die übrigen
nichts.

**DER BELEG, DEN NIEMAND GEPLANT HAT — GEMESSEN (Live, 2026-08-13, derselbe Lauf,
berichtet):** Im selben Lauf hat ein ANDERES Ziel einen Fehler erzeugt, weil sein
Zugangsdatum ungültig war. **Die Logzeile trug die Kennung GESCHWÄRZT.**

**WARUM DAS MEHR WERT IST ALS JEDE FIXTURE:** Eine Fixture prüft die Schwärzung gegen
einen Rumpf, den wir selbst geschrieben haben — sie kann nur enthalten, woran der Autor
gedacht hat. Hier hat die Schwärzung gegen einen **ECHTEN fremden Fehler-Rumpf**
gehalten, und zwar in einem Lauf, der zu einem **anderen Zweck** gefahren wurde. Ein
Beleg, den niemand hergestellt hat, ist kein Artefakt des Aufbaus.

**ZWEI GRENZEN, ohne die der Beleg überdehnt wird:**
- Er deckt **EINEN Fehlerweg EINES Anbieters**. Über die übrigen Fehlerwege desselben
  Anbieters und über die anderen Adapter sagt er **nichts** — eine Prüfung mit einem
  Gegenstand sagt über die übrigen nichts.
- Dass jenes Zugangsdatum ungültig ist, ist ein **Zustand eines TESTPROJEKTS**, kein
  Befund über den Code. Beides gehört getrennt: der Code hat sich richtig verhalten, die
  Konfiguration war kaputt.

**ES WAR DER DRITTE ADAPTER, UND DAMIT IST DIES DIE ZWEITE LIVE-INSTANZ** (berichtet,
nicht von mir beobachtet — dieselbe Provenienz wie der Rest dieses Blocks). Die ERSTE
steht in Abschnitt 3.2, **„TIKTOK ALS DRITTES FAN-OUT-ZIEL"** (Nummer UND Titel, damit
der Zeiger eine Nachnummerierung übersteht): die Gegenprobe vom 2026-08-11 mit
absichtlich falschem Zugangsdatum, HTTP 401, Vorgangs-Kennung geschwärzt. **3.2 bleibt
unberührt** — der Beleg tritt daneben, er wird dort nicht nachgetragen.

**DER ZUGEWINN IST ALLEIN DIE UNGEPLANTHEIT, NICHT DER LIVE-CHARAKTER.** Den hatte die
Gegenprobe schon; sie lief gegen dasselbe echte fremde System. Neu ist, dass **niemand
die Lage hergestellt hat**: Der Lauf hatte einen anderen Zweck, das Zugangsdatum war
nicht absichtlich falsch, und die Schwärzung hat trotzdem gehalten. Wer den Unterschied
verwischt, zählt eine Wiederholung als neuen Beweis.

**WAS DADURCH NICHT BELEGT IST, und es bleibt im Rang unverändert:** Der ZWEITE Adapter
hat **weiterhin keine Live-Beobachtung** seiner Schwärzung. Der Vorrats-Punkt „SECHS
UNGEDECKTE ACHSEN AM SCHWÄRZ-PRIMITIV DES ZWEITEN ADAPTERS" steht unangetastet — dieser
Beleg berührt ihn nicht, weder stärkend noch schwächend.

**HIER WURDE EINMAL MEHR BEHAUPTET, ALS DER BESTAND HERGAB — und dieser Absatz ist der
wertvollste Teil des Eintrags, weil er sonst niemandem auffiele.** Der Zuschnitt dieses
Belegs führte als Begründung, die Schwärzung des dritten Adapters sei „bisher gegen
selbst gebaute Rümpfe geprüft" gewesen; daraus hätte sich die ERSTE Live-Bestätigung
überhaupt ergeben. **Die Nachprüfung am Bestand hat das gefangen:** 3.2 trägt die
Gegenprobe vom 2026-08-11 und nennt sie dort ausdrücklich eine „Positivkontrolle der
Schwärzung im echten Betrieb". Die Formulierung ist deshalb auf die tragfähige Hälfte
zurückgenommen worden, BEVOR sie in die Datei kam. **Ohne diesen Absatz läse sich der
Block, als hätte nie jemand danebengelegen** — und die nächste Behauptung dieser Art
hätte kein Vorbild, an dem sie sich prüft.

**WARUM DIESER BELEG HIER STEHT UND NICHT IN 3.2, wo die Schwärzung entstanden ist:**
Eine abgeschlossene Scheibe wird nicht umgeschrieben. Derselbe Grundsatz hat schon die
Aufzählung der sechs Vokabular-Stellen aus 3.2 herausgehalten (s. Abschnitt 5) — der
Beleg tritt DANEBEN, mit eigener Provenienz, an der Scheibe, deren Lauf ihn erzeugt hat.
3.2 bleibt unberührt.

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** dass der Defekt behoben ist (s. oben —
die beiden Urteile divergieren weiter) · dass `targetReadiness` benutzt wird (es gibt
keinen Konsumenten) · irgendetwas über die Oberfläche, das Consent-Memo oder die
Adapter-Achse (B2, D und C) · was geschähe, wenn ein Nicht-String bis in einen Adapter
liefe (UNGEMESSEN, s. den Vorrats-Punkt) · dass die hinterlegten Zugangsdaten
FUNKTIONIEREN.

---

### 3.7 DIE KARTE SAGT, DASS EIN ZIEL NICHT BELIEFERT WIRD — SCHEIBE B2, ERLEDIGT (2026-08-13)

**Commit:** `70cc265` (GEMESSEN am Repo, 2026-08-13, `git log`). Damit steht in
Abschnitt 3 **keine Lücke mehr** — alle sieben Vermerke tragen ihre Nummer.

**DER DEFEKT IST FÜR DIE ANZEIGE BEHOBEN, FÜR DIE STRUKTUR NICHT.** Ein Ziel mit
hinterlegten Zugangsdaten, aber ohne Kennung sagt jetzt selbst, dass an es nichts
gesendet wird. **Was NICHT erledigt ist:** Die Frage „ist dieses Ziel lieferfähig"
wird weiterhin an mehreren Orten beantwortet; geteilt ist die BEDINGUNG (`hasPixelId`),
nicht das URTEIL. **Invariante (6) aus 7.5 — „Urteil 1 und 2 beantworten die Frage über
DIESELBEN Funktionen" — ist erst nach C und D erfüllt.**

**WAS GEBAUT WURDE — VIER DATEIEN, REIN ADDITIV** (GEMESSEN am Repo, 2026-08-13:
`git diff --numstat` weist in ALLEN vier Dateien **null gelöschte Zeilen** aus — es
wurde nichts ersetzt, nur eingefügt):
- `TargetCard` (`src/components/TargetCard.tsx`): die Pflicht-Prop `savedPixelId`, die
  Bedingung `configured === true && !hasPixelId(savedPixelId)`, die Zeile — und der
  benannte Text `noDeliveryText`.
- `MeasureView` (`src/components/MeasureView.tsx`): `savedPixelIdFor` als zweite
  Skalar-Funktion, reine Durchreichung. **Kein Blob** — die Entscheidung „nur Skalare
  herein" im Kopf jener Datei bleibt gültig und wird bestätigt.
- `CodeImporter` (`src/components/CodeImporter.tsx`): EINE Prop-Zeile, gebildet aus
  `savedSettings` statt `settings`. **Kein neuer Zustand, kein neuer Effekt, keine
  neue Abfrage, keine neue Action.**
- Sechs Tests (K1–K6) plus die neue Prop in allen bestehenden Aufrufstellen. Suite
  1049 → **1055**, Testdateien unverändert 55, alle vier Gates grün.

**DIE ZEILE STEHT NEBEN DEM STATUS, NICHT IN IHM** — die Karte hatte diese Trennung
schon getroffen (Status = ZUGANGSDATEN, eigene Zeile = AUSLIEFERUNG), und der
entschiedene Wortlaut „Zugangsdaten hinterlegt" bleibt damit unverhandelt. **INVARIANTE
(8) IST AM DIFF BELEGT:** Statustext, seine drei Zweige, die Klassen, der Platzhalter
und der Entfernen-Knopf tragen **keine einzige** geänderte Zeile.

**DER TEXT ZITIERT DIE BESTEHENDE FELD-BESCHRIFTUNG, statt ein eigenes Wort zu
erfinden** (Owner-Vorgabe). Der Grund steht an der Fundstelle: Ein fest verdrahtetes
Wort widerspräche der Karte, auf der die Zeile steht, sobald ein Ziel sein Feld anders
nennt — **und das ist bereits eingetreten**, das zweite Ziel fragt nach der
Anzeigenkonto-Kennung und nicht nach einer Pixel-ID. Der Text ist eine benannte,
exportierte Funktion; die Tests RUFEN sie auf, statt eine Zeichenkette abzuschreiben.

**DIE ENTSCHEIDENDE WAHL: DAS URTEIL LIEST DEN GESPEICHERTEN WERT, NICHT DEN
GETIPPTEN.** Am laufenden Wert wäre die Zeile in genau den zwei Fällen falsch, in denen
jemand gerade handelt — beim Tippen eine falsche ENTWARNUNG für ein Ziel, das weiterhin
nichts empfängt, beim Löschen ein falscher ALARM für eines, das unverändert beliefert
wird. **GEMESSEN am Code (2026-08-13):** Der gespeicherte Stand existiert seit Scheibe
1b als Dirty-Baseline (`savedSettings` in `CodeImporter`), wird an denselben Punkten
reseedet wie `savedMappings` und **im Erfolgszweig des Speicherns nachgeführt** — die
Zeile korrigiert sich damit im selben Durchgang wie das Speichern, nicht erst beim
Projektwechsel.

**DIE GRENZE, die an der Fundstelle steht und hier wiederholt wird, weil sie die Wahl
trägt:** Der gespeicherte Stand ist ein **SPIEGEL**, nicht die Datenbank. Ein zweiter
Tab macht ihn stumm veraltet. Er ist der beste Stellvertreter OHNE neue Abfrage, und er
benutzt dieselbe Bauform, die das Projekt für den Publish-Zustand längst einsetzt. Als
eigener Punkt im Vorrat verzeichnet.

**DIE ZWEI PROBEN — mit Vorab-Ansage, und die zweite hat eine Ansage widerlegt:**
- **M5** (Zeile in den falschen Zweig): **K1, K3, K5.** K2 und K4 blieben grün wie
  angesagt. **Von K5/K6 fiel nur K5** — K6 behauptet eine ABWESENHEIT und ist unter
  dieser Mutation trivial wahr, weil die Zeile in seiner Fixture auch im verschobenen
  Zweig fehlt. Innerhalb der angesagten Klasse, aber es engt K6s Reichweite ein: **Er
  unterscheidet nur die M6-Achse, nicht die Zweig-Achse.**
- **M6** (Urteil liest den laufenden Wert): **K5 UND K6 fielen — keiner von beiden ist
  hohl.** **ABWEICHUNG: K2 fiel mit**, obwohl ich es ausgeschlossen hatte. Ursache
  gemessen: K2 setzt allein `savedPixelId` und lässt `pixelId` auf dem Default, die
  beiden Werte sind dort also gegenläufig — meine Ansage („in K1–K4 sind beide gleich")
  galt für K1, K3, K4, nicht für K2. **Dieselbe Fehlerklasse, also Abdeckung und keine
  Kaskade.** Der Kommentar an der Fixture ist auf das Gemessene berichtigt: **DREI
  Tests bewachen diese Achse, nicht zwei.**
- Gegenprobe unverändert → alles grün.
**KEIN BESTANDSTEST IST GEFALLEN**, insbesondere nicht die drei bekannten Wächter
(verbotene Wörter, Grün-Verbot, Abwesenheit des Adapter-Hinweises) — die neue Zeile
läuft in deren Fixturen mit und kollidiert mit keinem.

**DER LIVE-TEST IST GEFAHREN UND BESTANDEN — GEMESSEN (Live, 2026-08-13, Lauf des
Architekten; berichtet, nicht von mir beobachtet).** Hier stand bis zum Lauf die
Ankündigung; sie war als Aussage über jenen Zeitpunkt richtig. **WAS DAS ERGEBNIS
TRÄGT, in fünf Teilen:**

- **DER AUSGANGSZUSTAND ÜBER DREI ZIELE, in einem Blick:** das vollständig
  eingerichtete Ziel **ohne** Zeile · das Ziel mit hinterlegten Zugangsdaten und ohne
  Kennung **mit** Zeile · das leere Ziel **ohne** Zeile. Erst die drei nebeneinander
  zeigen, dass die Zeile an BEIDEN Hälften der Bedingung hängt und nicht bloss an
  einer — ein Ziel allein hätte jede der drei Fehlbedingungen durchgelassen.
- **DIE BEIDEN UNGESPEICHERTEN RICHTUNGEN, EINZELN GEPRÜFT — der eigentliche Prüfling
  dieser Scheibe:** Eine getippte, NICHT gespeicherte Kennung ändert das Urteil
  **nicht**, die Zeile blieb stehen. Eine gelöschte, NICHT gespeicherte Kennung löst
  **keinen** Alarm aus, es erschien keine Zeile. **DIE NAIVE FASSUNG WÄRE HIER
  GESCHEITERT** — sie hätte im ersten Fall eine Entwarnung gegeben, während das Ziel
  weiterhin nichts empfängt, und im zweiten einen Ausfall behauptet, den es nicht gibt.
  Das ist der Grund, warum das Urteil den gespeicherten Stand liest, jetzt gemessen
  statt begründet.
- **DIE NACHFÜHRUNG NACH DEM SPEICHERN, in beide Richtungen und OHNE Projektwechsel:**
  Speichern der getippten Kennung → die Zeile verschwindet; Speichern der Löschung →
  die Zeile ist zurück. Das bestätigt live, was am Code gemessen war (der gespeicherte
  Stand wird im Erfolgszweig des Speicherns nachgeführt).
- **K3 LIVE:** Zugangsdaten entfernt → der Statustext springt auf „nicht konfiguriert",
  **und die Zeile verschwindet**. Ohne diesen Schritt bliebe offen, ob die Zeile an den
  Zugangsdaten hängt oder nur an der fehlenden Kennung.
- **DER KONTROLL-FALL, im selben Lauf und mit vorher festgelegtem Soll-Ausgang:** Das
  vollständig eingerichtete Ziel forwardet unverändert weiter, zugeordnet über die
  **EREIGNIS-KENNUNG**. **OHNE IHN WÄRE „KEINE ZEILE BEI DIESEM ZIEL" AUS ZWEI GRÜNDEN
  ERKLÄRBAR** — weil die Bedingung richtig verneint, oder weil die Zeile überhaupt nie
  erscheint. Erst der Mitläufer trennt das.

**DIE FOLGERUNG, ENG GEFASST:** Die Anzeige stimmt jetzt mit der Lieferfähigkeit
überein. **NICHT belegt** ist irgendetwas über die STRUKTUR, über Scheibe C oder über
Scheibe D.

**DER GEMESSENE TEXT IST ZUGLEICH DER BELEG FÜR DIE WORTLAUT-WAHL** (GEMESSEN, Live,
2026-08-13): Auf der Karte des zweiten Ziels erschien die Zeile mit dessen
**Anzeigenkonto-Kennung** — nicht mit einer Pixel-ID. **Damit ruht die Entscheidung
gegen ein fest verdrahtetes Wort nicht mehr auf einer Überlegung, sondern auf einer
Beobachtung:** Ein festes „Pixel-ID" wäre auf genau dieser Karte sichtbar falsch
gewesen, und zwar für jeden Betreiber, der sie öffnet.

**ZWEI ZEILEN, ZWEI NAMEN — festgehalten, weil die Bezeichnung im Live-Bericht bereits
EINMAL VERRUTSCHT IST.** Dort hiess die neue Zeile „Adapter-Hinweiszeile"; das ist der
Name der anderen. **Die Sache war korrekt beobachtet** — jene blieb stumm —, nur das
Wort war falsch. Die beiden sind:
- **DER FOLGENLOSIGKEITS-HINWEIS** („Auslieferung folgt — dieses Ziel sendet noch
  nicht."), gerendert unter `!config.hasAdapter` und gespeist aus dem Feld `hasAdapter`
  in `TARGET_CARDS` (`src/components/TargetCard.tsx`). Er beschreibt eine **Eigenschaft
  DIESES BUILDS** — gibt es für dieses Ziel überhaupt einen Empfänger? — und ist für
  alle Projekte gleich. **Heute unerreicht:** kein Ziel trägt `hasAdapter: false`.
  Gegenstand von Scheibe C.
- **DIE ZEILE ÜBER DIE AUSLIEFERUNG** (`noDeliveryText`, gerendert unter
  `configured === true && !hasPixelId(savedPixelId)`, dieselbe Datei). Sie beschreibt
  eine **Eigenschaft DIESES PROJEKTS** — fehlt hier die Kennung? — und ist je Projekt
  verschieden. Sie ist seit dieser Scheibe erreichbar und live gesehen.

**DER SATZ, DER MITMUSS:** Läuft dieselbe Bezeichnung für beide, liest jemand später
einen Vollzug für Scheibe C, den es nicht gibt — der Folgenlosigkeits-Hinweis ist durch
diesen Live-Test in KEINER Weise berührt worden, er kann es gar nicht sein.

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** dass die Anzeige die DATENBANK
spiegelt (sie spiegelt den zuletzt geladenen bzw. gespeicherten Stand) · irgendetwas
über die Adapter-Achse — der Folgenlosigkeits-Hinweis bleibt sein eigener, unerreichter
Zweig, und die Karte kann nach B2 **zwei** Zeilen über die Auslieferung tragen, deren
zweite Gegenstand von C ist. **HIER STAND "die erst C zu einer zusammenführt", und das
war ein Vorgriff:** Entschieden ist für C ausschliesslich, dass die ADAPTER-ACHSE
übergeht (Abschnitt 7.5). Ob daraus EINE Zeile wird, ist eine Produktentscheidung und
NICHT getroffen — die Karte hat ihre zwei Zeilen ausdrücklich getrennt, weil sie
verschiedene Sachen sagen, und diese Trennung trägt seit diesem Vermerk Namen. **Wer C
zuschneidet, darf den Halbsatz nicht als Auftrag lesen.** · irgendetwas über das
Consent-Memo (D) · dass
`targetReadiness` benutzt wird — benutzt ist `hasPixelId`, die Zusammensetzung hat
weiterhin keinen Konsumenten · dass die hinterlegten Zugangsdaten FUNKTIONIEREN · wie
die Zeile AUSSIEHT (die Testumgebung wertet kein CSS aus; Abstand, Umbruch und
Verdrängung sind Live-Test-Achsen).

---

### 3.8 DER WÄCHTER ÜBER DIE ADAPTER-ACHSE — SCHEIBE C1, ERLEDIGT (2026-08-13)

**Commit:** `ca321c3` (GEMESSEN am Repo, 2026-08-13, `git log`). **NACHGETRAGEN im
selben Zug wie 3.9, und der Grund gehört dazu:** Diese Zeile stand noch auf „steht
noch aus", obwohl der Commit längst existierte. Nach der Regel am Abschnittskopf heisst
eine fehlende Nummer „noch nicht committet — und damit per Konstruktion der jüngste";
mit einem committeten Vermerk darunter zeigte die Lücke auf die falsche Scheibe und
behauptete zugleich etwas Unwahres über diese hier. **Der Nachtrag hat keinen eigenen
Anlass gehabt** — C1 hat keinen Live-Test, mit dem er sich hätte bündeln können; genau
deshalb blieb er eine Runde liegen.

**WAS GEBAUT WURDE — AUSSCHLIESSLICH TESTS, KEIN PRODUKTIVCODE** (GEMESSEN am Repo,
2026-08-13: der Diff enthält genau zwei Dateien, beide mit `.test.` im Namen): der
Kreuzvergleich Ziel → Adapter in `src/lib/capi/fan-out.test.ts` — ein Lauf je Ziel
durch den Handler, erzeugt über `TRACKING_TARGETS`, mit einer über die Ziel-Union
erschöpfenden Spion-Zuordnung —, dazu erstmals ein Schalter für den dritten Adapter in
jener Datei, und die Berichtigung eines Kommentars in
`src/components/TargetCard.test.tsx`. Suite 1055 → **1059**, Testdateien unverändert
55, alle vier Gates grün.

**DER BELEG STATT DER BEHAUPTUNG — GEMESSEN (2026-08-13):** Die Mutationsprobe M1 (der
Ziel-Zweig des dritten Ziels entfernt) macht jetzt **genau einen** Test rot. **Vor C1
wäre sie VOLLSTÄNDIG GRÜN durchgelaufen.** Damit ist der Befund aus der
Aufklärungsrunde nicht mehr hergeleitet, sondern belegt — **und geschlossen**: Die
beiden Träger der Adapter-Tatsache konnten in EINEM Schritt auseinanderlaufen, ohne
dass irgendetwas rot wurde.

**WAS C1 NICHT TUT, und der Satz steht bewusst früh:** Es schafft **keine Quelle**. Die
Adapter-Tatsache wird weiterhin an ZWEI Orten behauptet — im Feld `hasAdapter` in
`TARGET_CARDS` und in den Ziel-Zweigen von `dispatchForward`. **Sie ist BEWACHT, nicht
BESEITIGT.** C2 steht aus, und **Invariante (6) aus Abschnitt 7.5 bleibt unerfüllt.**

---

**DER M3-BEFUND — EIGENSTÄNDIG, KEINE FUSSNOTE ZUR PROBE.**

**INVARIANTE 7 („ein unbekanntes Ziel sendet nichts") WIRD HEUTE VOM
EINWILLIGUNGS-GATE GETRAGEN, NICHT VOM ERSCHÖPFUNGS-REST** (GEMESSEN am Repo,
2026-08-13): `allowedTargets` schlägt den Consent-Schlüssel eines unbekannten Ziels in
`CONSENT_KEY_BY_TARGET` nach, findet nichts und verwirft es — **bevor `dispatchForward`
es sieht**. Die drei bekannten Ziele treffen je einen Zweig. **Es gibt damit heute
KEINE Eingabe, die den Rest hinter den Zweigen erreicht;** er ist eine zweite Linie,
die aus keiner Richtung angefahren werden kann.

**FOLGE FÜR C2, ausdrücklich:** Die Fail-Closed-Zusage hängt **NICHT** an dem
Kontrollfluss, den C2 ersetzt. Wer beim Umbau um den Erschöpfungs-Rest fürchtet,
fürchtet um die falsche Stelle — und wer ihn für den Träger der Zusage hält, baut die
Absicherung an einen Ort, der sie nie getragen hat.

**ZWEITE FOLGE, allgemeiner und über diese Phase hinaus: EIN UNERREICHBARER ZWEIG IST
VON KEINEM TEST DECKBAR — AUCH NICHT DURCH EINEN BESSEREN.** Wer für ihn einen Wächter
sucht, sucht etwas, das es nicht geben kann; was er finden kann, ist der Beleg der
Unerreichbarkeit.

---

**WARUM M3 GRÜN BLIEB — EINE DRITTE MÖGLICHKEIT, DIE IN DER VORGABE FEHLTE.**

Die Auflage kennt bei einem grün bleibenden Mutanten zwei Erklärungen: „der Test prüft
nichts" oder „die Mutation ist ein schlechtes Modell". **Hier trifft KEINE von beiden.**
Der Test prüft sehr wohl etwas, und die Mutation bildet den Fehler korrekt nach — **DER
GEGENSTAND IST AUS KEINER EINGABE ERREICHBAR.** Die Mutation misst damit eine
Eigenschaft des CODES, nicht eine des Wächters.

**DAS GEHÖRT BEIM NÄCHSTEN GRÜNEN MUTANTEN MITGELESEN:** Bevor ein grüner Mutant als
hohler Test gebucht wird, ist zu prüfen, ob die mutierte Stelle überhaupt anfahrbar
ist. Ein Wächter, der dafür erfunden wird, wäre ein Wächter über Nichts — und er sähe
aus wie Abdeckung.

**WAS AUSDRÜCKLICH NICHT GETAN WURDE:** das unbekannte Ziel am Einwilligungs-Gate
vorbeizuschleusen. Das wäre über eine Eigenheit des Schlüssel-Nachschlags möglich
gewesen. **Der Grund gegen den Griff gehört mit:** Er verankerte eine Sprachkuriosität
in einem Test, über den später jemand stolpert — und er machte aus einem sauberen
Befund („unerreichbar") eine Konstruktion, die nur im Test existiert.

---

**W4 MISST ETWAS ANDERES ALS BEAUFTRAGT, UND DAS WAR RICHTIG.** Beauftragt war ein Lauf
„Ziel ohne Adapter-Behauptung → kein Aufruf". **Am Handler wäre er trivial wahr aus dem
falschen Grund gewesen** — nicht weil der Verteiler schweigt, sondern weil das Ziel
schon vorher ausscheidet. W4 behauptet deshalb, was er misst: **das unbekannte Ziel
fällt am Einwilligungs-Gate**, mit einem bekannten Ziel als **Mitläufer im selben
Lauf**, dessen Spion feuert — ohne ihn wäre „kein Adapter gerufen" auch dann wahr, wenn
gar nichts stattgefunden hätte.

---

**DIE WIDERLEGTE SELBSTBESCHREIBUNG — EIGENER PUNKT, weil sie eine Klasse ist und kein
Einzelfall.** Der Kommentar am Bestandstest zum Folgenlosigkeits-Hinweis behauptete, er
werde rot, wenn ein Ziel ohne Adapter dazukommt. **GEMESSEN falsch (2026-08-13):** Rot
wird er erst, **nachdem** jemand das Fehlen erkannt und `hasAdapter: false` eingetragen
hat; er vergleicht eine Konstante mit sich selbst und sieht den Verteiler nie. **Die
Assertion bleibt unverändert** — sie deckt die Gegenrichtung (Behauptung entfernt,
während der Zweig steht) und die Oberflächen-Seite, und beides deckt der Kreuzvergleich
nicht. Berichtigt wurde die ZUSAGE, nicht der Test. Dieselbe Behandlung wie bei T9 in
Abschnitt 3.5 und bei N1 in Abschnitt 3.6.

---

**DIE ENTSCHEIDUNG ZU C2: SIE KOMMT.** *Begründung:* Von den vier Stellen, die
Ziel-Wissen tragen, binden **drei** erschöpfend über die Ziel-Union (`TARGET_CARDS`,
`CONSENT_KEY_BY_TARGET`, `LEGACY_CONSENT_ROLE`) — beim nächsten Ziel fragt dort der
Compiler. **Der Verteiler ist die eine, die schweigt.** C2 legt damit nichts an, das es
noch nicht gibt; es **entfernt eine Doppelung, die heute besteht**. Die Vorbau-Linie aus
Abschnitt 7.4 („keine Erweiterung ohne realen Konsumenten") greift deshalb nicht: Die
beiden Konsumenten existieren, sie widersprechen sich nur noch nicht.

**DIE BAUFORM IST ENTSCHIEDEN: DIE KARTE BEKOMMT DIE TATSACHE ALS PROP**, nicht durch
eigenen Zugriff auf die Liste. *Grund:* Nur so wird der heute **unerreichte**
Anzeige-Zweig beweisbar — ein Test übergibt schlicht „kein Adapter". Der andere Weg
zwänge zu einer Mutation von Modulzustand im Test, und die ist im Bestand bereits
begründet **verworfen** (sie koppelt sich an die Reihenfolge der Tests).

---

**ALS TRIGGER, NICHT ALS VORWURF:** Bleibt die Zusammensetzung `targetReadiness` auch
nach Scheibe D **ohne Konsumenten**, ist zu entscheiden, ob sie verfrüht war. **Nach C
wird das NICHT geprüft** — C braucht sie nicht, und eine Prüfung mitten in der Reihe
beantwortete die Frage zu früh.
**DIESER TRIGGER HAT AUSGELÖST UND IST ABGEARBEITET (2026-08-13, s. Abschnitt 3.12):** Die
Zusammensetzung ist gestrichen. Der Absatz bleibt wörtlich stehen — er ist die Herleitung
—, aber wer ihn heute als offenen Posten liest, liest ihn falsch.

---

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** dass die zweite Behauptung beseitigt
ist (sie besteht fort, bewacht) · dass Invariante (6) aus 7.5 erfüllt wäre (erst nach C
und D) · irgendetwas über den Erschöpfungs-Rest (s. den M3-Befund) · die fachliche
Richtigkeit eines Adapters, die Gültigkeit von Zugangsdaten oder die Annahme beim
Anbieter — die drei Adapter sind im neuen Block ausgeschaltet · die Nutzlast-Abbildung
des zweiten Ziels (das bleibt T10) · Fristen, Nebenläufigkeit und Containment (die
Blöcke darüber).
**KEIN LIVE-TEST, UND KEINER WÄRE MÖGLICH:** Es entstehen ausschliesslich Tests, kein
Verhalten ändert sich — und der Anzeige-Zweig ist unerreichbar, solange alle drei Ziele
einen Adapter tragen.

---

### 3.9 DIE ADAPTER-TATSACHE BEKOMMT EINE QUELLE — SCHEIBE C2, ERLEDIGT (2026-08-13)

**Commit:** `724edd3` (GEMESSEN am Repo, 2026-08-13, `git log`). Damit steht in
Abschnitt 3 **keine Lücke mehr** — alle neun Vermerke tragen ihre Nummer.

**DIE QUELLE EXISTIERT, UND BEIDE TRÄGER HABEN AUFGEHÖRT ZU BEHAUPTEN.** Die Tatsache
„bringt dieser Build für dieses Ziel einen Empfänger mit" steht seit dieser Scheibe
**einmal** — als Liste in einer reinen Datei (`TARGETS_WITH_ADAPTER` in
`src/lib/tracking/target-adapters.ts`), von beiden Seiten lesbar.
- **Träger 1 hat aufgehört:** Das Feld `hasAdapter` in `TARGET_CARDS` ist entfallen;
  jene Konfiguration beschreibt nur noch Beschriftungen. Die Karte bekommt die Tatsache
  als **PROP**, abgeleitet in `MeasureView` aus der Liste.
- **Träger 2 hat aufgehört:** Die drei Ziel-Vergleiche in `dispatchForward` sind
  entfallen, dazu die beiden lokalen Ziel-Konstanten und der `META_TARGET`-Import. An
  ihrer Stelle steht eine Zuordnung, deren Vollständigkeit der Compiler prüft.
Suite 1059 → **1061**, Testdateien unverändert 55, alle vier Gates grün.

**EIN VIERTES ZIEL OHNE ADAPTER BLEIBT MÖGLICH — und daran hing diese Scheibe.** Die
Zuordnung ist über die **Adapter-Union** erschöpfend, **nicht** über die Ziel-Union: Die
Liste ist eine TEILMENGE der Ziele. Ein neues Ziel, das nicht in sie aufgenommen wird,
verlangt keinen Eintrag — **und die Karte sagt dann von selbst, dass an dieses Ziel
nichts gesendet wird.** Wäre die Zuordnung über die Ziel-Union gebaut, müsste jedes Ziel
einen Empfänger haben; der Hinweis hätte keinen Fall mehr, den er beschreiben könnte.
**Der Unterschied steckt in einer einzigen Typ-Angabe**, und deshalb steht er hier.

**DER ANZEIGE-ZWEIG IST ZUM ERSTEN MAL BEWEISBAR.** Er war unerreichbar, solange die
Tatsache aus einem Modul-Objekt kam — der einzige Weg wäre eine Laufzeit-Mutation jenes
Objekts gewesen, und die ist im Bestand begründet verworfen. Seit die Tatsache eine Prop
ist, genügt ein Wert: **zwei neue Tests** prüfen ihn in beiden Richtungen. **Die alte
Verwerfung bleibt richtig; sie hat sich erledigt.**

**VIER FEHLERKLASSEN SIND JETZT BUILD-FEHLER UND HABEN DESHALB KEINEN TEST:** ein
fehlender Eintrag · ein überzähliger Eintrag · ein Wert in der Liste, den es als Ziel
nicht gibt · ein umbenanntes Ziel. **Der Grund steht an der Zuordnung im Code:** Ein Test
neben einem Compiler-Fehler prüft nichts und suggeriert, die Bindung hänge an ihm — wer
die Bindung später lockert, hielte den noch grünen Test für eine Absicherung.
**WAS WEITERHIN EINEN TEST BRAUCHT, WEIL ES KOMPILIERT:** die **Vertauschung** zweier
Einträge (der C1-Kreuzvergleich) und die Vertauschung der beiden Werte in der
Config-Umformung des zweiten Ziels (T10). Beide sind unverändert in Kraft.

**DER ERSCHÖPFUNGS-REST IST UNVERÄNDERT UNERREICHBAR** (Befund aus Abschnitt 3.8, gilt
wörtlich weiter): Jedes bekannte Ziel steht in der Liste, ein unbekanntes fällt schon am
Einwilligungs-Gate heraus. Er bleibt als **ausdrücklicher Nein-Zweig** der
Zugehörigkeits-Prüfung stehen — er hält die Zusage sichtbar und erspart an der
Nachschlag-Stelle eine Typ-Zusicherung, die genau das ein zweites Mal behauptete, was
die Prüfung entscheidet. **NEU IST EINE AUSSICHT, KEINE ÄNDERUNG:** Mit einem vierten
Ziel ohne Adapter wird er erreichbar — dessen Consent-Einträge erzwingt der Compiler, es
passiert also das Gate und fällt hier heraus.

**WAS NICHT ERLEDIGT IST:** **Invariante (6) aus Abschnitt 7.5 ist erst nach D erfüllt.**
C2 vereinheitlicht die ADAPTER-Achse; das Consent-Memo (Konsument 3) ist unangetastet.
**`targetReadiness` hat weiterhin KEINEN Konsumenten** — auch nicht den Adapter-Teil: C2
schafft eine eigene Quelle in einer eigenen Datei und rührt jene nicht an. **Der Trigger
aus Abschnitt 3.8 bleibt damit scharf:** Bleibt die Zusammensetzung auch nach D ohne
Konsumenten, ist zu entscheiden, ob sie verfrüht war.
**NACHGETRAGEN (2026-08-13): DER TRIGGER HAT AUSGELÖST — die Zusammensetzung ist
gestrichen, s. Abschnitt 3.12.** Der Satz darüber war als Aussage über jenen Zeitpunkt
richtig und bleibt stehen; „scharf" ist er seither nicht mehr.

---

**DIE FÜNF RICHTIGSTELLUNGEN — EIGENER PUNKT, weil sie der eigentliche Preis dieser
Scheibe waren.** C2 kostete wenig Code und machte fünf dokumentierte Belege falsch.
Keiner davon war eine Regel; alle waren Tatsachenangaben über den Code:
1. **`target-readiness.ts`, der Dateikopf:** „eine dritte Quelle neben den **beiden
   bestehenden**". **Die Regel steht wörtlich wie vorher** (eine Ziel-Liste gehört nicht
   in jene Datei); nachgezogen ist nur die Arithmetik.
2. **`target-readiness.ts`, an der Adapter-Tatsache:** „Ihre beiden heutigen Träger
   bleiben unverändert bestehen." **Beide gibt es nicht mehr.**
3. **`fan-out.test.ts`, der Kopf des C1-Wächters:** nannte die zwei Träger als bestehend.
   **NUR der Kommentar — keine Assertion wurde angefasst**, sie gelten unverändert, weil
   die Vertauschung weiterhin kompiliert.
4. **`TargetCard.test.tsx`:** „DIE ASSERTION HIER BLEIBT UNVERÄNDERT." War für C1 wahr,
   ist durch C2 falsch geworden — die Assertion prüfte ein Feld, das es nicht mehr gibt.
5. **`ingest.ts`, die Aufzählung der Fundstellen für Ziel-Wissen** — s. den eigenen
   Absatz darunter.

**DIE LEHRE, und sie ist älter als diese Scheibe: EINE REGEL KANN GÜLTIG BLEIBEN,
WÄHREND IHR BELEG ALTERT.** Ein Beleg ist eine Tatsachenbehauptung über den Code und
altert mit ihm; die Regel darüber altert nicht mit. **Der Preis eines Umbaus sind nicht
nur die Zeilen, die er ändert, sondern die Sätze, die er falsch macht** — und die findet
nur, wer vor dem Bau danach sucht.

**DIE NEUZÄHLUNG (GEMESSEN, 2026-08-13):** **ACHT** Stellen tragen einen Zielwert oder
eine ziel-geschlüsselte Aussage; die Aufzählung steht im Kopf der neuen Datei. **DIE
ALTE ZAHL WAR SECHS UND WAR SCHON DAMALS ZU NIEDRIG** — sie zählte
`CONSENT_KEY_BY_TARGET` und `LEGACY_CONSENT_ROLE` nicht mit, obwohl es beide seit der
neunten Scheibe gibt. C2 nimmt zwei Stellen weg und fügt eine hinzu; **dass die Zahl
trotzdem steigt, liegt an der Korrektur, nicht an dieser Scheibe.**
**NICHT MITKORRIGIERT, sondern gemeldet:** Der Vorrats-Punkt „DIE ZAHL ‚SECHS
VOKABULAR-STELLEN' IN ABSCHNITT 3.2" nennt ebenfalls eine Sechs — er zählt aber etwas
anderes (die Code-Stellen, die den Wert des DRITTEN Ziels tragen) und ist von dieser
Zählung nicht berührt.

---

**DIE VIER PROBEN — mit Vorab-Ansage, und ZWEI Ansagen waren zu eng:**
- **M1** (Eintrag entfernt): **BUILD-Fehler wie angesagt** — `TS2741: Property 'meta' is
  missing … but required in type Record<…>`. **Die Bindung hängt am Compiler, belegt.**
  **ABWEICHUNG:** Ich sagte „KEIN roter Test"; es fielen zusätzlich Tests. Grund:
  **`vitest` typprüft nicht** — zur Laufzeit fehlt der Eintrag dann schlicht. Die
  Stopp-Bedingung („roter Test STATT Build-Fehler") ist nicht eingetreten.
- **M2** (zwei Einträge vertauscht): `tsc` **grün** — die Vertauschung kompiliert, genau
  deshalb braucht sie einen Test. Gefallen sind die beiden C1-Läufe plus 47 weitere,
  **alle derselben Klasse** (das Meta-Bein erreicht Metas Adapter nicht). Abdeckung,
  keine Kaskade.
- **M3** (Zugehörigkeits-Prüfung invertiert): **alle drei C1-Läufe wie angesagt.**
  **ABWEICHUNG:** Ich sagte „`tsc` bleibt grün" — er wurde rot (`TS2349: Type 'never' has
  no call signatures`). Der Grund ist die Verengung selbst: Nach dem invertierten Riegel
  ist das Ziel im Rest `never`. **Ein Zugewinn, keine Schwäche** — dieselbe Achse doppelt
  gesichert.
- **M4** (Prop-Bedingung an der Karte umgekehrt): **genau die drei Karten-Tests, kein
  Treffer ausserhalb. Keine Abweichung.**
- **Gegenprobe unverändert → 1061/1061 grün.**

**DER LIVE-KONTROLLFALL IST GEFAHREN UND BESTANDEN — GEMESSEN (Live, 2026-08-13, Lauf
des Architekten; berichtet, nicht von mir beobachtet).** Hier stand bis zum Lauf die
Ankündigung; sie war als Aussage über jenen Zeitpunkt richtig. **WAS DAS ERGEBNIS
TRÄGT:**
- **Auslösung auf der PRODUKTIONS-URL**, der Ingest antwortete **204**.
- **Das Server-Ereignis kam beim Anbieter an UND WURDE MIT DEM BROWSER-BEIN
  ZUSAMMENGEFÜHRT** — der Anbieter führt beide als **dedupliziert**. **DER SATZ, DER
  MITMUSS:** Ohne ein passendes Server-Ereignis gäbe es nichts zu deduplizieren; **die
  Markierung ist damit der Beleg, dass die Weiterleitung angekommen ist**, und nicht
  bloss eine Anzeige über den Browser-Pixel.
- **Der zweite Beobachtungspunkt:** An **keiner** der drei Karten erschien der
  Folgenlosigkeits-Hinweis — die Ableitung aus der Liste verhält sich neutral.

**DIE FOLGERUNG, ENG GEFASST: C2 hat nichts verändert.** **NICHT belegt** ist
irgendetwas über ein Ziel OHNE Adapter (den Zustand gibt es nicht) oder über Scheibe D.

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** dass Invariante (6) erfüllt wäre (erst
nach D) · irgendetwas über das Consent-Memo · dass `targetReadiness` benutzt wird ·
irgendetwas über den Erschöpfungs-Rest (unverändert unerreichbar) · die Anzeige eines
Ziels ohne Adapter **im Betrieb** (den Zustand gibt es nicht; er ist nur im Test
herstellbar) · die fachliche Richtigkeit eines Adapters oder die Gültigkeit von
Zugangsdaten · ob die zwei Zeilen über die Auslieferung je eine werden.

---

### 3.10 DER WÄCHTER ÜBER DAS CONSENT-MEMO — SCHEIBE D1, ERLEDIGT (2026-08-13)

**Commit:** `6e1be7a` — **NACHGETRAGEN am 2026-08-13 im Zug der Scheibe D2, wie es der
Satz an dieser Stelle verlangte.** Hier stand bis dahin „STEHT AUS" und „die Kette endet
heute bei `724edd3`"; beides war als Aussage über jenen Zeitpunkt richtig und ist es seit
dem Push nicht mehr. **Der Nachtrag ist nicht Kosmetik:** Nach der Regel am
Abschnittskopf ist ein Vermerk ohne Nummer die Lücke in der Kette und damit der jüngste
— mit einem weiteren Vermerk darunter zeigte diese Lücke auf die falsche Scheibe und
behauptete zugleich etwas Unwahres über diese hier. **Dieselbe Fehlerklasse ist in dieser
Phase schon zweimal eingetreten** (3.5 und 3.8).
**EINE ABWEICHUNG VON DER COMMIT-KONVENTION GEHÖRT DAZU, weil sie im Verlauf sonst
niemandem auffällt:** `6e1be7a` trägt den Test-Block UND diesen Doku-Vermerk in EINEM
`test(ui)`-Commit. CLAUDE.md verlangt getrennte `docs(claude)`-Commits; die
Zusammenlegung war eine Owner-Anordnung nach ausdrücklichem Hinweis, keine Nachlässigkeit.

**WAS GEBAUT WURDE — AUSSCHLIESSLICH TESTS, KEIN PRODUKTIVCODE** (GEMESSEN am Repo,
2026-08-13: `git diff --numstat` weist **278 eingefügte und NULL gelöschte** Zeilen in
**genau einer** Datei aus, `src/components/CodeImporter.test.tsx`; `git diff
--name-only` liefert keine Datei ohne `.test.` im Namen): neun Tests (D-T1 bis D-T9),
die den Consent-Schlüsselsatz **durch die Komponente** prüfen. Suite 1061 → **1070**,
Testdateien unverändert 55, alle vier Gates grün (tsc, lint, vitest, build).

**DER BEFUND, DER D1 FÄLLIG GEMACHT HAT — GEMESSEN am Repo (2026-08-13, formale Suche):**
Die Ableitung vom Einstellungs-Stand zum Consent-Schlüsselsatz war von **KEINEM Test
gedeckt**. `consentTargets`, `__psConsentAll` und `cns` hatten in
`src/components/CodeImporter.test.tsx` **NULL Treffer**; Deckung bestand
**ausschliesslich** in `src/lib/generate.test.ts` — und dort wird die Liste **VON HAND
übergeben**. **Die Engine war bewacht, die Ableitung nicht.** Ein Fehler im Memo hätte
jede neu publizierte Seite Ziele verlieren lassen, ohne dass ein Test rot wird.

**DER PRÜFLINGS-WECHSEL IST DER GRUND FÜR DIE BAUFORM, nicht Bequemlichkeit:** Ein
Aufruf des Erzeugers mit selbst gebauter Liste beweist die ENGINE. Prüfling ist das
MEMO, und das läuft nur, wenn die Komponente läuft. **Genau diese Verwechslung ist der
Grund, warum die Achse trotz vorhandener Engine-Tests ungedeckt war** — sie sah gedeckt
aus.

---

**DAS ERGEBNIS VON M6 — DIE BEOBACHTUNG STEHT, DIE ZUSAGE DARÜBER IST
RICHTIGGESTELLT (2026-08-13, in der D2-Runde).** GEMESSEN (2026-08-13, `hasPixelId` in
`src/lib/tracking/target-readiness.ts` um den Trim gebracht, volle Suite):

- **`target-readiness.test.ts`: T4 und T5 fallen**, beide melden wörtlich dieselbe
  Klasse („ein Wert aus reinem Leerraum gilt als vorhanden"). **Abdeckung, keine
  Kaskade.**
- **`token.test.ts`: KEIN Treffer**, und das war **vorab angesagt und gemessen
  begründet** — `getCapiConfigByTrackingKey` ruft `hasPixelId(getPixelId(...))`, und
  `getPixelId` trimmt VORHER; die Aufweichung ist auf dieser Achse unsichtbar. **Damit
  ist die Ansage der Vorgabe („token.test.ts meldet auf seiner Achse") am Code
  widerlegt worden, BEVOR die Probe lief.**
- **`TargetCard.test.tsx`: KEIN Treffer** — gemessen trägt dort keine Fixture einen
  reinen Leerraum-Wert.
- **D-T6 UND D-T7 SIND GRÜN GEBLIEBEN.**

**DIE BEOBACHTUNGEN OBEN SIND UNVERÄNDERT RICHTIG. WAS FÄLLT, IST DIE ZUSAGE, DIE AUS
IHNEN GEZOGEN WURDE.** Hier stand als Überschrift „DAS ERGEBNIS VON M6 IST DIE BELEGTE
AUSGANGSLAGE FÜR D2 — und dieser Absatz ist der eigentliche Ertrag von D1", am letzten
Spiegelstrich „Das ist der Beleg: Das Memo folgt einer Änderung am geteilten Prädikat
heute NICHT. Die Prämisse von D2 trägt", und darunter „WAS DAS FÜR D2 BINDET: Dieselbe
Probe nach D2 muss das Gegenteil zeigen — D-T6 und D-T7 müssen dann MITFALLEN. Tun sie
es nicht, hat D2 die Übernahme nicht vollzogen, gleichgültig wie der Diff aussieht."

**GEMESSEN (D2-Runde, 2026-08-13): M6 IST AUF DIESER ACHSE IN KEINEM ZUSTAND
AUSSAGEFÄHIG.** `getPixelId` trimmt vor `hasPixelId`; die Whitespace-Achse liegt
**vollständig in `getPixelId`**, und D2 hat die nicht angefasst. Das Grünbleiben von
D-T6/D-T7 belegte deshalb **NICHT**, dass das Memo nicht folgt — es belegte nur, dass
**diese Mutation dort nichts zeigen kann**. Nach D2 ist M6 zeichengleich ausgegangen:
wieder nur T4 und T5, D-T6 und D-T7 wieder grün.

**DER GRUND STAND EINEN SPIEGELSTRICH WEITER OBEN UND WURDE NICHT ÜBERTRAGEN.** Die
Begründung für „`token.test.ts`: KEIN Treffer" ist wörtlich dieselbe wie die für
D-T6/D-T7 — dieselbe Komposition `hasPixelId(getPixelId(...))`. Sie war gemessen, sie
war aufgeschrieben, und sie wurde auf die Nachbar-Achse nicht angewandt.

**WAS AN DIE STELLE TRITT — M6b, in Abschnitt 3.11:** dieselbe Mutation, aber auf
**reine Existenz** aufgeweicht (`typeof x === "string"`) — die einzige Aufweichung, die
den Trim ÜBERLEBT, weil sie auch `""` durchlässt —, gefahren als
**Zwei-Zustands-Vergleich** gegen den Stand vor und nach D2. Sie trägt den Beleg, den
M6 nicht tragen konnte.

**DIE LEHRE, und sie ist der Ertrag dieser Richtigstellung: EINE ANSAGE, DIE EINE
MUTATION FÜR AUSSAGEFÄHIG HÄLT, OHNE DIE KOMPOSITION DAVOR ZU LESEN, MISST NICHTS — und
sie stand ZWEIMAL so im Auftrag** (in D1 und in D2). Vor jeder Mutations-Ansage ist zu
lesen, was zwischen der mutierten Funktion und dem Prüfling noch liegt.

---

**WARUM D1 VOR D2 LÄUFT — die Begründung des geteilten Zuschnitts:** Wer die Zeile mit
dem grössten Radius der Phase in demselben Schritt ändert, in dem er ihren ersten
Wächter schreibt, kann hinterher **nicht sagen, welche Achse gedeckt ist**. Das ist
wörtlich Mutations-Lektion (h) aus CLAUDE.md. **Der Radius ist gemessen, nicht
behauptet:** Der Schlüssel ist eine EINBAHNSTRASSE — ein publizierter Text trägt ihn,
ein Code-Deploy erreicht ihn nicht, und ein fehlender Schlüssel heisst beim Leser
fail-closed „nicht erlaubt" (`consentAllows` in `src/lib/tracking/consent-wire.ts`).

**DIE SIEBEN PROBEN — alle mit Vorab-Ansage, ALLE OHNE ABWEICHUNG** (2026-08-13, je
genau eine Achse, nach jeder Probe Rücknahme mit dem Editier-Werkzeug, danach `git
status` UND Prüfsummen-Abgleich gegen eine **vor der ersten Mutation** genommene
Referenz — die Lehre aus 3.9):
M1 ein Ziel übersprungen → **drei** (D-T1, D-T3, D-T5) · M2 auf ein festes Ziel
verdrahtet → **fünf** · M3 Ordnung umgekehrt → **drei** (nur die Fixturen mit mehr als
einem Schlüssel können eine Ordnung sehen) · M4 leere Liste umgangen → **genau einer**
· M5 eigener Schlüsselsatz im Publish-Zweig → **genau einer** · M6 s. oben · M7
Leere-Bedingung entfernt → **sieben**. Gegenprobe unverändert → **1070/1070 grün**.

**M7 IST EINE SIEBTE PROBE, DIE DIE VORGABE NICHT VERLANGT HAT, und der Grund gehört
dazu:** Unter M1 bis M6 fallen **D-T6 und D-T7 kein einziges Mal** — M6 sagt ihre
Grünheit sogar voraus. Ohne eine eigene Probe wären beide genau der Fall „grün
geblieben, also unbelegt", und ihre Kommentare hätten eine Wirksamkeit behauptet, die
keine Messung trägt.

**ZWEI EINZELSTÜCKE SIND BELEGT, EINE ALLEINSTELLUNG IST WIDERLEGT** — und alle drei
Vermerke stehen erst seit der jeweiligen Probe im Kommentar, nicht seit dem Zuschnitt:
- **D-T4 (M4): genau einer von 1070.** Einziger Wächter des Strukturbruchs bei leerer
  Liste.
- **D-T9 (M5): genau einer von 1070.** Kein anderer Test im Bestand vergleicht die
  beiden Auslieferwege miteinander.
- **D-T6/D-T7 (M7): KEIN Einzelstück** — sie fallen mit fünf weiteren derselben
  Klasse. **Der Kommentar sagt das jetzt so**, statt eine Alleinstellung zu
  unterstellen; dazu die Grenze, dass es am Memo **keine Mutation gibt, die nur den
  Trim trifft** — der Trim liegt in `getPixelId`, nicht dort.

**EIN GEMESSENER NEBENBEFUND AUS M4, der D-T8 im Nachhinein rechtfertigt:** Unter M4
blieb **D-T8 grün, obwohl seine Liste ebenfalls leer ist** — ohne Kennung UND ohne
Tracking-Schlüssel gibt `buildMetaRuntime` `""` zurück, die Liste erreicht den Text gar
nicht. **Das ist genau die Voraussetzung, die D-T8 behauptet**, und sie ist damit nicht
nur begründet, sondern an einer fremden Probe sichtbar geworden.

---

**DIE G3-MESSUNG — sie gehört hierher, weil sie einen Vorrats-Punkt auflöst** (GEMESSEN
am Repo, 2026-08-13): **Das Memo MUSS den LAUFENDEN Stand lesen.** `buildDocumentFor`
in `src/components/CodeImporter.tsx` liest im selben Ausdruck `getPixelId(settings,
"meta")` und `getTrackingKey(settings)` — der erzeugte Text entsteht also **aus
demselben laufenden Stand**. Läse das Memo den gespeicherten, trüge **ein und dasselbe
Dokument** eine Meta-Laufzeit und einen Draht, der nach ihr nie fragt. **Ein
gespeicherter Stand wäre hier ein DEFEKT, kein konservativerer Zustand** — der
Unterschied zur Karte aus B2 ist, dass jene beurteilt, was der SERVER später mit dem
GESPEICHERTEN Projekt tut, während das Memo beschreibt, was in DIESES Dokument
hineingeht.

**DAMIT IST DER VORRATS-PUNKT ZUM UNGESPEICHERTEN KENNUNGS-ZUSTAND in seinem Unterpunkt
zum Consent-Memo GEGENSTANDSLOS** — er ist in Abschnitt 5 **durch den Vollzug ersetzt,
nicht gestrichen**.

---

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** dass die Doppelung beseitigt ist — sie
besteht fort, das Memo trägt weiterhin seine EIGENE Ausformulierung der
Leere-Bedingung, **bewacht statt beseitigt**, genau wie bei C1 · dass **Invariante (6)
aus Abschnitt 7.5** erfüllt wäre — **sie bleibt bis D2 unerfüllt** · dass
`targetReadiness` benutzt wird (es gibt weiterhin keinen Konsumenten, und **der Trigger
aus Abschnitt 3.8 bleibt scharf**) · irgendetwas über die Byte-Gleichheit des erzeugten
Textes — das ist das Gate von D2 und hier nicht gefahren · irgendetwas über die
Oberfläche, die Adapter-Achse oder den Ingest · dass ein ausgelieferter Schlüsselsatz
beim Betreiber-Hook oder beim Leser richtig ANKOMMT (die Tests messen den erzeugten
Text, nicht seinen Empfang).
**KEIN LIVE-TEST, UND KEINER WÄRE MÖGLICH:** Es entstehen ausschliesslich Tests, kein
Verhalten ändert sich. Was live zu prüfen ist, gehört zu D2 und steht dort.

---

### 3.11 DAS CONSENT-MEMO BEZIEHT SEINE BEDINGUNG AUS DEM GETEILTEN PRÄDIKAT — SCHEIBE D2, ERLEDIGT (2026-08-13)

**Commit:** `c0bfd50` (GEMESSEN am Repo, 2026-08-13, `git log`). Hier stand bis dahin
„STEHT AUS" und „die Kette endet heute bei `6e1be7a`"; beides war als Aussage über jenen
Zeitpunkt richtig. **Damit steht in Abschnitt 3 KEINE Lücke mehr** — gezählt am 2026-08-13
über alle elf Vermerke: jeder trägt seinen Hash (3.2 und 3.4 in eigener Schreibweise —
„**Commits:**" bzw. im Fliesstext des Bau-Absatzes —, aber beide in der Kette).
**EINE ABWEICHUNG VON DER COMMIT-KONVENTION GEHÖRT DAZU, wie schon bei 3.10:** `c0bfd50`
trägt die Code-Änderung UND diesen Doku-Vermerk in EINEM `refactor(ui)`-Commit. CLAUDE.md
verlangt getrennte `docs(claude)`-Commits; die Zusammenlegung war eine Owner-Anordnung
nach ausdrücklichem Hinweis.

**WAS GEBAUT WURDE — EINE DATEI, EINE ERSETZTE ZEILE** (GEMESSEN am Repo, 2026-08-13:
`git diff --numstat` weist **18 eingefügte und EINE gelöschte** Zeile in
`src/components/CodeImporter.tsx` aus; `src/components/CodeImporter.test.tsx` steht
**nicht** im Diff, ebenso wenig `target-readiness.ts`, `generate.ts`, `TargetCard.tsx`,
`MeasureView.tsx`, `capi/ingest.ts`, `capi/token.ts`, `capi/fan-out.test.ts`): der Import
von `hasPixelId`, die Ersetzung des Vergleichs gegen die leere Zeichenkette durch
`hasPixelId(getPixelId(settings, t))`, und der Kommentar-Zusatz am bestehenden Block.
**Suite unverändert 1070**, Testdateien unverändert 55, alle vier Gates grün.

---

**DER BYTE-GLEICHHEITS-NACHWEIS — BEIDE HÄLFTEN, und die zweite trägt ohne die erste
nichts** (GEMESSEN, 2026-08-13, neun Konfigurationen je mit Export-Text UND
Publish-Argument = **18 Dateien**, erzeugt DURCH DIE KOMPONENTE):

- **ERSTE HÄLFTE — die Selbstkontrolle VOR der Änderung:** Derselbe Lauf zweimal in zwei
  Verzeichnisse, `diff -r` darüber → **leer**. **Ohne sie wäre der spätere leere
  Vergleich aus ZWEI Gründen erklärbar** — Wertgleichheit ODER ein Vergleich, der nie
  etwas findet.
- **EINE POSITIVKONTROLLE TRAT DAZU, die der Auftrag nicht verlangt hat:** Die 18 Dateien
  tragen **13 verschiedene Prüfsummen**. Die Matrix spannt also tatsächlich verschiedene
  Texte auf; hätte sie 18-mal denselben Text erzeugt, wäre auch der Selbstcheck leer
  gewesen und trotzdem wertlos. **Die fünf Dubletten sind erklärt und kein Mangel:**
  02/07/08 erzeugen denselben Schlüsselsatz `["meta"]` (die Leerraum- und die
  Leer-Kennung fallen beide heraus), und bei der Negativkontrolle ohne Tracking-Schlüssel
  sind Export- und Publish-Text **identisch** — ohne Beacon gibt es keine Proxy-URL, an
  der sich die beiden Wege sonst unterscheiden.
- **ZWEITE HÄLFTE — der Vergleich NACH der Änderung:** `diff -r` über alle 18 Dateien →
  **leer, exit 0**, gegengeprüft über die Prüfsummen (**alle 18 identisch**).
- **DAS INSTRUMENT WAR IN BEIDEN LÄUFEN DASSELBE:** Der Wegwerf-Lauf wurde vor der
  Änderung aus dem Baum genommen, byte-genau gesichert und danach byte-identisch
  zurückgeholt (`cmp` bestätigt). Ein neu getipptes Instrument hätte den Vergleich
  entwertet.

---

**DIE PROBE — UND SIE IST ANDERS AUSGEGANGEN, ALS DER AUFTRAG ANGESAGT HAT.** Der Auftrag
verlangte: „M6 erneut, identisch zur D1-Fassung … D-T6 und D-T7 MÜSSEN JETZT FALLEN".
**Das ist nicht eingetreten, und es KONNTE nicht eintreten** — der Grund war vor dem Lauf
angesagt und stand schon im D1-Vermerk:

- **M6 (Trim aus `hasPixelId` entfernt) nach D2: T4 und T5 in `target-readiness.test.ts`,
  sonst nichts. D-T6 und D-T7 GRÜN — zeichengleich zum D1-Ergebnis.**
- **URSACHE, GEMESSEN:** `getPixelId` trimmt VOR `hasPixelId`. Nach D2 lautet die
  Komposition im Memo `hasPixelId(getPixelId(...))` — **wörtlich dieselbe wie in
  `capi/token.ts`**, für die in D1 vorab angesagt und dann gemessen wurde, dass M6 dort
  unsichtbar ist. Eine whitespace-Kennung ist bei `hasPixelId` schon als `""` angekommen.
- **DAS IST DIE DRITTE ERKLÄRUNG FÜR EINEN GRÜNEN MUTANTEN, nicht die erste oder zweite:**
  Der Test prüft sehr wohl etwas, und die Übernahme ist vollzogen — **die MUTATION ist
  ein schlechtes Modell**. Sie misst eine Eigenschaft, die die Komposition verdeckt.
- **EIN BEFUND, DER OHNE DIESE PROBE NICHT SICHTBAR GEWESEN WÄRE:** Nach D2 speisen
  **D-T6 und D-T7 DENSELBEN Wert** in das Prädikat — beide Fixturen kollabieren durch
  `getPixelId` auf `""`. Die Whitespace-Achse liegt vollständig in `getPixelId`, und die
  hat D2 nicht angefasst. Die beiden Tests bleiben trotzdem getrennt richtig: Sie
  behaupten über die FIXTURE, nicht über den Prädikat-Eingang.

**M6b — DIE PROBE, DIE DEN ERTRAG TATSÄCHLICH TRÄGT** (hinzugenommen, weil M6 ihn nicht
tragen kann): `hasPixelId` auf **reine Existenz** aufgeweicht (`typeof x === "string"`) —
die einzige Aufweichung, die den Trim von `getPixelId` ÜBERLEBT, weil sie auch `""`
durchlässt. **GEMESSEN als ZWEI-ZUSTANDS-VERGLEICH, dieselbe Mutation gegen zwei
Code-Stände:**

- **M6b auf dem D2-Stand: 16 Tests rot**, darunter **D-T2, D-T3, D-T4, D-T5, D-T6, D-T7,
  D-T9**.
- **M6b auf dem Vor-D2-Stand** (Memo zurück auf den alten Wortlaut, Mutation unverändert):
  **9 Tests rot — die sieben D-Tests sind GRÜN.**
- **DIE DIFFERENZ IST EXAKT DIESE SIEBEN.** Die übrigen neun Treffer
  (`target-readiness.test.ts`, `token.test.ts`, `TargetCard.test.tsx`) sind in BEIDEN
  Zuständen identisch — sie hängen nicht am Memo.

**DAS IST DER ERTRAG VON D, GEMESSEN STATT BEHAUPTET:** Unter einer identischen Mutation
des geteilten Prädikats **folgt das Memo nach D2 und folgte vor D2 nicht.**
**DER ÜBERSCHUSS BEI M6b IST ABDECKUNG, KEINE KASKADE:** Angesagt waren die sieben plus
`target-readiness.test.ts`; getroffen wurden zusätzlich `token.test.ts` und
`TargetCard.test.tsx` — **die beiden anderen Konsumenten desselben Prädikats**, mit
wörtlich derselben Fehlerklasse („ein Ziel ohne Kennung gilt als vorhanden"). **Meine
Ansage war zu eng gezählt, und zwar wieder nach unten** — dieselbe einseitige Richtung,
vor der CLAUDE.md warnt.

---

**INVARIANTE (6) AUS ABSCHNITT 7.5 IST ERFÜLLT.** Alle Konsumenten beziehen ihre
Bedingungen jetzt aus denselben Funktionen: die Oberflächen-Ableitung und die Paarung über
`hasPixelId`/`hasSecret` (B1, B2), die Adapter-Achse über `TARGETS_WITH_ADAPTER` (C2), das
Consent-Memo über `hasPixelId` (D2). **Die vierteilige Reihe A–D ist damit abgeschlossen.**

**DER ERTRAG IST SCHMAL, UND DAS GEHÖRT IN DENSELBEN ATEMZUG:** Geteilt wird der
**Leere-Vergleich**, NICHT die Trim-Politik — beide Seiten liefen schon vor D2 durch
dieselbe Leseform `getPixelId`. **Wer D mit C2 gleichsetzt, überschätzt es:** C2 hat zwei
Träger einer Tatsache auf eine Quelle gebracht; D2 hat eine Bedingung an eine benannte
Funktion gehängt, die dieselbe Antwort gab. Der Gewinn ist die KOPPLUNG für künftige
Änderungen am Prädikat — belegt durch M6b —, nicht ein behobenes Verhalten.

**DIE GRENZE DER BYTE-GLEICHHEIT, und sie darf nicht überdehnt werden:** Sie gilt für
**jede Eingabe, die über `JSON.parse` aus dem Einstellungs-Blob entstehen kann**. Sie gilt
NICHT für ein handgebautes Objekt, dessen `trim()` etwas anderes als eine Zeichenkette
liefert — dort gäbe `getPixelId` entgegen seiner Typangabe einen Nicht-String zurück, den
die alte Fassung aufgenommen und die neue verworfen hätte. **Der Fall ist auf dem
produktiven Pfad unerreichbar** (JSON kennt keine Methoden, keine Getter, keine Proxies —
dasselbe Vertragsargument, das `consentAllows` in `tracking/consent-wire.ts` bereits
trägt), **und die Abweichung ginge in Richtung ÜBEREINSTIMMUNG mit dem Auflösungs-Pfad**,
der `hasPixelId` seit B1 benutzt. Sie ist deshalb als Grenze vermerkt und nicht als Risiko.

---

**OFFENE FRAGE — NICHT BEANTWORTET, WEIL SIE EINE OWNER-ENTSCHEIDUNG IST: DER TRIGGER AUS
ABSCHNITT 3.8 IST JETZT FÄLLIG.** Er lautete: „Bleibt die Zusammensetzung
`targetReadiness` auch nach Scheibe D **ohne Konsumenten**, ist zu entscheiden, ob sie
verfrüht war." **GEMESSEN am Repo (2026-08-13): Sie hat alle vier Scheiben ohne einen
einzigen Konsumenten überstanden** — importiert werden ausschliesslich die beiden
Prädikate `hasPixelId` und `hasSecret`. **Die Entscheidung fällt nicht hier.** Was für sie
spricht und was gegen sie, ist in 3.5 und 3.6 bereits am Kontrollfluss belegt (die
server-only-Datei kennt den Adapter nicht; für ein Ziel ohne Kennung wird der
Geheimnis-Wert gar nicht erst geholt).
**SIE IST INZWISCHEN GEFALLEN (Owner, 2026-08-13): die Zusammensetzung ist GESTRICHEN,
s. Abschnitt 3.12.** Der Absatz bleibt stehen, weil er die Frage in ihrer offenen Form
festhält — wer nur ihn liest, hält sie für unbeantwortet.

---

**DIE LIVE-KONTROLLE IST GEFAHREN UND BESTANDEN — GEMESSEN (Live, 2026-08-13, Lauf des
Architekten gegen die deployte Produktion; berichtet, nicht von mir beobachtet).** Hier
stand bis zum Lauf die Ankündigung („DER LIVE-TEST STEHT AUS UND IST PFLICHT … ohne ihn
bleibt D2 nicht live bewiesen"); sie war als Aussage über jenen Zeitpunkt richtig.
**WAS DAS ERGEBNIS TRÄGT, in vier Teilen:**

- **BEIDE PFLICHT-STOPPS EINGEHALTEN, und ohne sie wäre der Vergleich wertlos gewesen:**
  Der A/B-Betrieb wurde festgestellt und **beide Abrufe auf DIESELBE Variante
  festgenagelt** (Abschnitt 4 (f) — sonst misst man einen Variantenunterschied und liest
  ihn als Byte-Abweichung); **D2 wurde ISOLIERT deployt** (ein zweiter Bau im selben
  Deploy machte jede Abweichung unzuordenbar); und die Seite wurde **im Editor NEU
  VERÖFFENTLICHT** — der Schlüssel entsteht zur ERZEUGUNGSZEIT, ohne Republish misst der
  Lauf die alte Seite.
- **DER QUELLTEXT-VERGLEICH ÜBER DEN DEPLOY HINWEG: LEER.** **Das ist die Byte-Gleichheit
  am AUSGELIEFERTEN ARTEFAKT** — der Testlauf oben hatte sie nur an der KOMPONENTE
  gezeigt. Zwei verschiedene Gegenstände; der erste beweist den Erzeuger, dieser das, was
  beim Kunden liegt.
- **DER MITLÄUFER, und er trägt den Vergleich erst:** Ohne ihn wäre „leer" **auch dann
  wahr, wenn die Seite gar nicht neu erzeugt worden wäre**. Die Conversion kam an;
  Browser- und Server-Bein wurden über **DIESELBE EREIGNIS-KENNUNG** zusammengeführt —
  nicht über die Uhrzeit, die zwei Auslösungen in derselben Minute nicht trennt.
- **DIE BEOBACHTUNG, DIE NIEMAND GEPLANT HAT, und sie belegt eigenständig etwas:** Der
  Draht trug **NUR den Schlüssel des EINEN Ziels mit gesetzter Kennung**, nicht die
  Schlüssel aller eingerichteten Ziele. Das zweite Ziel hat **Zugangsdaten, aber keine
  Kennung** — und steht deshalb nicht im Draht. **Die Ableitung folgt im BETRIEB der
  Konfiguration**, an einem Projekt, das nicht dafür gebaut wurde. **GRENZE:** EIN
  Projekt, EINE Konfiguration; die übrigen acht der neun Konfigurationen bleiben
  Test-Achsen und sind durch diesen Lauf NICHT berührt.

**DIE FOLGERUNG, ENG GEFASST: D2 hat den ausgelieferten Text nicht verändert.** **NICHT
belegt** ist der Alt-Pfad — er ist im Betrieb nur mit einem Projekt GANZ OHNE Kennung
erreichbar, und dann forwardet ohnehin nichts — und nichts über die übrigen
Konfigurationen aus D1.

---

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** irgendetwas über die deployte Laufzeit
JENSEITS des einen gefahrenen Falls — **hier stand „der Live-Test steht aus", und das ist
seit dem Lauf überholt; überholt ist aber NUR die Ankündigung, nicht die Einschränkung:
der Lauf hatte EIN Projekt und EINE Konfiguration** · dass `targetReadiness` benutzt wird
(unverändert kein Konsument) · irgendetwas über die Oberfläche, die Adapter-Achse, den
Ingest oder das Schema · dass ein ausgelieferter Schlüsselsatz beim Betreiber-Hook oder
beim Leser ANKOMMT (gemessen ist der erzeugte Text, nicht sein Empfang) · dass die
hinterlegten Zugangsdaten FUNKTIONIEREN · dass der Defekt aus Abschnitt 5
(„'KONFIGURIERT' HEISST AN ZWEI ORTEN VERSCHIEDENES") in seiner strukturellen Hälfte
behoben wäre — **die Oberflächen-Ableitung fragt weiterhin nur nach der Zeilen-Existenz,
der Forward nach Kennung UND Zugangsdatum; geteilt sind die BEDINGUNGEN, nicht das
URTEIL** · ob die zwei Zeilen über die Auslieferung je eine werden.

---

### 3.12 DIE ZUSAMMENSETZUNG WIRD GESTRICHEN — ERLEDIGT (2026-08-13)

**Commit:** STEHT AUS. Nach der Regel am Kopf dieses Abschnitts ist dieser Vermerk damit
die Lücke in der Kette und per Konstruktion der jüngste; die Nummer wird hier
nachgetragen, sobald committet ist. Die Kette endet heute bei `1a83536`.

**DIE ENTSCHEIDUNG (Owner, 2026-08-13):** `targetReadiness` samt ihren drei Typen ist
**GESTRICHEN**. Die beiden Prädikate `hasPixelId` und `hasSecret` **BLEIBEN**.

**DER GEMESSENE GRUND (Repo, 2026-08-13, formale Suche über `src/`): VIER
Produktiv-Aufrufstellen für die Prädikate, NULL für die Zusammensetzung.** `hasPixelId`
drei (Karte, Auflösungs-Pfad, Consent-Memo), `hasSecret` eine (Geheimnis-Schleife). Die
Zusammensetzung hatte keinen Aufruf, keinen Import ausserhalb ihrer Datei, und ihre drei
exportierten Typen kamen nirgends sonst vor.

---

**WARUM SIE VERFRÜHT WAR — und dieser Absatz ist der eigentliche Ertrag, weil ohne ihn
der nächste Anlauf denselben Schnitt noch einmal macht. ZWEI GRÜNDE, und beide waren
schon in Scheibe A MESSBAR:**

1. **IHRE EINGABE-FORM VERLANGTE DEN GEHEIMNIS-WERT, den die Oberfläche nie hat und nie
   haben darf.** `ReadinessInput` nahm `secret: unknown` — den WERT. Die
   Oberflächen-Ableitung kennt aber nur einen Wahrheitswert aus der Zeilen-Existenz
   (`listConfiguredTargets` selektiert ausschliesslich die Ziel-Spalte). Ein
   Oberflächen-Konsument hätte also entweder einen zweiten Eingang gebraucht — oder einen
   Ersatzwert fabriziert und damit verdeckt behauptet, „Zeile existiert" heisse
   „nicht-leeres Geheimnis".
2. **DIE OBERFLÄCHE WAR DER EINZIGE ORT, DER JE ALLE DREI TEILE ZUGLEICH GEBRAUCHT
   HÄTTE.** Der Auflösungs-Pfad kann sie strukturell nicht zusammen befragen: Er ist
   server-only und kennt den Adapter nicht, und für ein Ziel OHNE Kennung holt er den
   Geheimnis-Wert aus Abfrage-Ökonomie gar nicht erst. **Der einzig mögliche Konsument
   war damit genau der, den Grund 1 ausschliesst.**

**BEIDES STAND SEIT SCHEIBE A IM REPO — ALS BEFUND FÜR SPÄTER NOTIERT, NICHT ALS ZWEIFEL
AM ZUSCHNITT GELESEN.** Grund 1 als Vorrats-Punkt („DER BENANNTE ZUSTAND NIMMT DEN
GEHEIMNIS-WERT ENTGEGEN, DEN DIE OBERFLÄCHE NIE HAT"), Grund 2 als Kontrollfluss-Notiz in
3.5 und im Kopf von `capi/token.ts`. **DAS IST DIE LEHRE, und sie ist grösser als dieser
Fall:** Ein Befund, der die TRAGFÄHIGKEIT eines Bauteils betrifft, wird nicht als
Arbeitsvorrat abgelegt — er gehört gegen den Zuschnitt gehalten, solange der noch
offen ist. Als Vorrat notiert wandert er an den Ort, den man erst NACH dem Bau liest.

**WAS 7.5 VERLANGT HAT, IST TROTZDEM ERFÜLLT — und das ist kein Widerspruch:** Die
Entscheidung dort lautete, „konfiguriert" werde ein BENANNTER ZUSTAND und kein
Wahrheitswert. **Geliefert haben das die PRÄDIKATE und die KARTE**, nicht die
Zusammensetzung: Ein Ziel mit Zugangsdaten und ohne Kennung sagt seit B2 selbst, dass an
es nichts gesendet wird — die Ununterscheidbarkeit, gegen die 7.5 stand, ist an der
Anzeige behoben. **7.5 UND ALLE VERMERKE 3.5 BIS 3.11 BLEIBEN GÜLTIG**; sie sind
Berichte über ihre Runden und werden nicht umgeschrieben.
**WAS 7.5 IM NACHHINEIN GENAU BENANNT HAT, und was nicht:** Der Satz „DREI TEILE, UND
JEDER HAT HEUTE EINEN REALEN KONSUMENTEN" war und ist **richtig** — er sagte etwas über
die TEILE. Falsch war der Schluss daraus auf die ZUSAMMENSETZUNG; drei Teile mit je einem
Konsumenten ergeben keinen Konsumenten für ihre Verknüpfung. **Der Satz wird deshalb
nicht angetastet.**

---

**DER BYTE-NACHWEIS FÜR DIE BEIDEN BLEIBENDEN PRÄDIKATE — er ersetzt hier den Live-Test**
(GEMESSEN, 2026-08-13): Der zusammenhängende Ausschnitt aus beiden Doku-Kommentaren und
beiden Funktionsrümpfen wurde vor und nach dem Schnitt in je eine Datei geschrieben;
**beide tragen dieselbe Prüfsumme `0a3b49b2…fa70f`, `diff` ist leer.** Der
Auflösungs-Pfad liegt auf dem meistgetroffenen Pfad der Plattform — was byte-gleich
bleibt, kann sich nicht anders verhalten. **T5 und T6 sind unverändert und grün.**

**DASS `tsc` UND `build` GRÜN SIND, IST HIER DER EIGENTLICHE BEWEIS DER
KONSUMENTENFREIHEIT** — nicht die Testzahl. Ein gelöschter Export, den irgendetwas
importiert, ist ein BUILD-Fehler; beide Gates liefen durch, und damit ist gemessen statt
behauptet, dass die Zusammensetzung nirgends gebraucht wurde. **Die Suite fiel um genau
die vorhergesagten sieben Tests: 1070 → 1063**, Testdateien unverändert 55.

**EINE KOPPLUNG IST DABEI SICHTBAR GEWORDEN, die man sonst erst beim Bruch bemerkt:**
`tracking/target-adapters.ts` **ZITIERT** den Absatz „KEIN DRITTES URTEIL" aus dem Kopf
dieser Datei WÖRTLICH, als Begründung dafür, dass die Adapter-Liste nicht dorthin gehört.
Der Absatz bleibt deshalb **unangetastet**, obwohl sein Beleg gealtert ist („die drei
Tatsachen" gibt es nicht mehr); die Alterung steht als eigener Satz daneben. **Wer ihn
umformuliert, lässt ein Zitat in einer anderen Datei ins Leere zeigen.**

---

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** irgendetwas über Verhalten — es hat
sich keines geändert, und ein Live-Test wäre gegenstandslos · dass die Prädikate richtig
sind (sie sind unverändert, nicht neu geprüft) · irgendetwas über die Oberfläche, den
Ingest, die Adapter-Achse oder das Schema · dass eine Zusammensetzung nie wieder nötig
wird — der Trigger samt Auflage steht im Vorrat.
**KEIN LIVE-TEST, UND KEINER WÄRE MÖGLICH:** Es entfällt ausschliesslich Code ohne
Konsumenten; der Byte-Nachweis oben ist der Ersatz, den der Auftrag dafür vorsah.

---

## 4. Was an Entscheidungen gefallen ist — bindet über die Scheibe hinaus

**(a) OWNER-ENTSCHEIDUNG: `fbtrace_id` BLEIBT UNGESCHWÄRZT, nur hart
längenbegrenzt.** GRUND, und er muss mit: Die belegte Echo-Achse ist der
Query-Parameter, in dem das Zugangsdatum reist; sie endet in der Fehlermeldung und
im Nicht-JSON-Rumpf, **NICHT in einem vom Anbieter erzeugten Trace-Bezeichner**.
Der Fehlschlag, um den es hier geht, ist STILL — wer ihn untersucht, braucht genau
diesen Trace. **AUFLAGE:** Die Ausnahme wird AN DER FUNDSTELLE IM CODE begründet,
und zwar mit DIESEM Grund — **nicht** mit "ist kein Secret". Eine Begründung, die
eine Unbedenklichkeit behauptet, ist genau der Satz, den diese Scheibe an anderer
Stelle ersetzt.

**(b) SCHWÄRZUNG STATT FELD-ALLOWLIST.** Eine Allowlist hilft nur, wenn das
gefährliche Feld ein UNERWÜNSCHTES ist. Hier ist die Fehlermeldung das gefährliche
UND das gewollte Feld — an ihr hängt die Lesbarkeit stiller Ablehnungen. Die
Schwärzung sucht eine FORM, kein bekanntes Geheimnis; sie muss nicht wissen,
wonach sie sucht. Ein Bereiniger, der das Geheimnis kennen müsste, wäre selbst
eine Stelle, an der es verlorengehen kann.

**(c) SECHSTER UNTERSCHIED ZWISCHEN DEN BEIDEN ADAPTERN.** Der zweite hat KEIN
Trace-Feld und schwärzt seine Felder deshalb gleichförmig. **Wer beim ersten
abschreibt, schwärzt ausgerechnet den Wert, dessen ganzer Zweck die
Undurchsichtigkeit ist.** Das reiht sich in die FÜNF bereits benannten Stellen
ein, an denen die Adapter gleich aussehen und es nicht sind (aufgezählt im Kopf
von `src/lib/capi/pinterest-forward.ts`).

**(d) DAS SCHWÄRZ-PRIMITIV WIRD NICHT GETEILT — UMGEKEHRT AM 2026-08-11 nach der
Aufklärung, nicht bloss präzisiert.** Hier stand, es wandere in eine geteilte
Datei, und die bestehenden Tests des zweiten Adapters seien der Wächter dafür,
dass sich dessen Verhalten dabei nicht ändert. **DIESE ZUSAGE TRÄGT NICHT.**

GEMESSEN am 2026-08-11 an `src/lib/capi/pinterest-forward.test.ts` (read-only,
alle Tests der Datei durchgesehen): Der Bestand sichert die Schwärzung als
TATSACHE — eine lange undurchsichtige Folge wird ersetzt — und den Durchlass
kurzer Anbieter-Texte. An SECHS Achsen sichert er NICHTS: die REIHENFOLGE von
Schwärzen und Kappen, die MINDESTLÄNGE, die Behandlung von NICHT-STRINGS, die von
LEERWERTEN, die KAPPUNG selbst und die GLOBALITÄT der Ersetzung.

**DIE SCHWERSTE DAVON IST DIE REIHENFOLGE, und sie allein trägt die Umkehr.**
Beobachtbar wird sie ausschliesslich dort, wo eine undurchsichtige Folge auf der
Kappungsgrenze LIEGT. Wird zuerst gekappt, bleibt von einer Folge, die kurz vor
der Grenze beginnt, ein Rest unterhalb der Mindestlänge stehen — er wird danach
NICHT mehr ersetzt und geht als TEIL-Leak hinaus. In keiner heutigen Fixture
überschreitet eine solche Folge die Grenze, **also lässt eine Vertauschung der
beiden Schritte jeden einzelnen Test grün.** Ein Bruch dieser Art ist genau die
Fehlerklasse, gegen die diese Scheibe gebaut ist.

**DARAUS KEHRT SICH DAS ARGUMENT UM.** Die in dieser Scheibe entstehende Fassung
bekommt Echo-Test, Zwilling und geteilte Mutationsproben und ist damit die BESSER
BEWACHTE. Die ungeschützte zu teilen hiesse, ihr die Autorität eines geteilten
Bauteils zu geben — und der zweite Adapter erbte künftige Änderungen an ihr, ohne
dass irgendetwas rot würde.

**DIE VEREINHEITLICHUNG FÄLLT NICHT WEG, SIE WIRD EINE EIGENE SCHEIBE** — mit
Charakterisierungs-Tests VOR dem Umzug, weil erst die beweisen, dass er nichts
geändert hat. Als Vorrat geführt in Abschnitt 5.

**UNBERÜHRT BLEIBT DIE URSPRÜNGLICHE AUSSAGE DIESES PUNKTES:** Die
Nicht-Zusammenlegung der FEHLERDEUTUNG gilt unverändert weiter; (a) und (c) sind
ihr Beleg. Die POLITIK — welches Feld wie behandelt wird — bleibt je Adapter
eigen, und sie ist nachweislich verschieden.

**(e) SIEBTER UNTERSCHIED: DER LEERWERT IST BEIM ZWEITEN ADAPTER EINE
VERZWEIGUNG, KEINE FORMATIERUNG.** Sein Bereiniger liefert für Nicht-Strings und
für Leerwerte einen Ersatzwert, und genau gegen diesen Ersatzwert entscheidet der
zweite Adapter, OB überhaupt eine Warn-Zeile entsteht. **Ein geteiltes Primitiv
hätte die Verzweigung des einen Adapters zur Eigenschaft des anderen gemacht:** Wer
den Ersatzwert im geteilten Werkzeug änderte, verschöbe drüben einen
Kontrollfluss, nicht eine Darstellung — und keiner der Tests, die dort etwas
behaupten, trüge diesen Zusammenhang im Namen. Der Punkt reiht sich in die fünf im
Kopf von `src/lib/capi/pinterest-forward.ts` benannten Stellen und in (c) ein; es
sind jetzt sieben.

**(f) VOR JEDER LIVE-KONTROLLE WIRD DER A/B-BETRIEB FESTGESTELLT — VERSCHÄRFTE
VORBEDINGUNG (2026-08-13).**

**DIE REGEL:** Vor jeder Live-Kontrolle ist festzustellen, **ob der A/B-Betrieb aktiv
ist**. Ist er es, wird **entweder abgeschaltet oder die AUSGELIEFERTE Variante
bestimmt** — und zwar **BEVOR** irgendein Ergebnis beurteilt wird.
**DER GRUND:** Die beiden Varianten tragen **getrennte Mapping-Sätze** und können
verschiedene Ereignisnamen und Beträge führen. Wer das nicht prüft, misst **eine
unbekannte Konfiguration** — und jedes Ergebnis, das dabei herauskommt, ist von einem
echten Befund nicht zu unterscheiden.

**DER ANLASS — GEMESSEN (Live, 2026-08-13):** Eine Änderung wurde an der EINEN Variante
vorgenommen, ausgeliefert wurde die ANDERE. Daraus entstand der Verdacht, der Editor
persistiere nicht bzw. der Erzeuger lasse Werte fallen — **über mehrere Hops hinweg,
mit einer Ursachen-Zuweisung, die keine Messung trug.** Aufgelöst hat es **eine einzige
Datenbank-Abfrage über BEIDE Mapping-Spalten**: Beide Sätze waren korrekt, verschieden,
und der Schalter stand an.

**DIE LEHRE, ausgeschrieben, weil sie über diesen Fall hinausgeht:** Der Verdacht nannte
einen **Fehlerort**, bevor eine **Messung** ihn eingegrenzt hatte. Die Kette hatte FÜNF
Hops; entlastet wurden VIER davon durch **ZWEI** Beobachtungen — den Quelltext der
ausgelieferten Seite und die Datenbank-Zeile. **Wer die Kette an einem Ende halbiert,
statt sie zu begehen, ist in zwei Schritten fertig.**

**KEIN FRÜHERES ERGEBNIS DIESER PHASE KIPPT DADURCH, und das ist GEPRÜFT, nicht
beruhigend gemeint:** Die bisherigen Live-Kontrollen hingen an der WEITERLEITUNG, und
die läuft in beiden Varianten. Der Variantenstand hätte an ihrem Ausgang nichts geändert
— er hätte nur, wie hier geschehen, eine falsche Fährte legen können.

**EINE BEOBACHTUNG AUS DEMSELBEN LAUF IST ZURÜCKGEZOGEN UND STEHT NIRGENDS ALS BEFUND:**
„ein Ereignis kam nur vom Browser an" — in dem, was tatsächlich vorlag, kam jenes
Ereignis nicht vor. **Auf ihr baut nichts auf**, und sie wird hier ausschliesslich
genannt, damit niemand sie später aus dem Gedächtnis wieder aufnimmt.

---

## 5. Vorrat — gemeldet, nicht in dieser Scheibe

Je ein Satz, Datei und Symbolname. **Keine Bewertung, kein Fix.**

- **KODIERUNG DER KENNUNG IM ENDPUNKT-PFAD:** `forwardToMeta` in
  `src/lib/capi/meta-forward.ts` setzt die Kennung anders in den Pfad ein als
  `forwardToPinterest` in `src/lib/capi/pinterest-forward.ts`.
- **WURFFREIHEIT DES NUTZLAST-BAUS:** Bei `forwardToMeta` liegt der Nutzlast- und
  URL-Bau ausserhalb des umschliessenden `try`; beim zweiten Adapter hält dieselbe
  Zusage an der ANORDNUNG.
- **VIERTE TRIMM-KOPIE:** `asString` steht in `src/lib/capi/ingest.ts`,
  `src/lib/capi/meta-forward.ts`, `src/lib/capi/pinterest-forward.ts` und seit dem
  dritten Ziel in `src/lib/capi/tiktok-forward.ts`. **Derselbe Punkt, eine Kopie
  mehr — kein neuer.**
- **ABWESENHEITS-TEST OHNE EIGENE POSITIVKONTROLLE:** in
  `src/lib/capi/ingest.timeout.test.ts` der Test, der die schnelle Antwort prüft —
  seine Behauptung über den Log-Kanal steht ohne Nachweis, dass dieser Kanal im
  selben Lauf etwas fangen würde.
- **DREI UNABHÄNGIGE KONSTANTEN DESSELBEN WERTES FÜR DIESELBE AUFGABE:**
  `META_ERROR_MSG_MAX` in `src/lib/capi/meta-forward.ts`, `PINTEREST_LOG_MAX` in
  `src/lib/capi/pinterest-forward.ts` und `TIKTOK_LOG_MAX` in
  `src/lib/capi/tiktok-forward.ts` — dazu drei gleichlautende Timeout-Deckel.
  **Derselbe Punkt, eine Zahl mehr — kein neuer.**
- **SECHS UNGEDECKTE ACHSEN AM SCHWÄRZ-PRIMITIV DES ZWEITEN ADAPTERS**
  (`sanitizeProviderText` in `src/lib/capi/pinterest-forward.ts`): Reihenfolge,
  Mindestlänge, Nicht-Strings, Leerwerte, Kappung, Globalität — Kandidat für eine
  EIGENE Scheibe mit Charakterisierungs-Tests VOR einer späteren Vereinheitlichung.
- **EIN TESTNAME BEHAUPTET DIE SCHWÄRZUNG FÜR EIN FELD, DAS SEINE FIXTURE NICHT
  DECKT:** `T12b` in `src/lib/capi/pinterest-forward.test.ts` nennt `error_message`
  und `warning_message`, seine Fixture trägt nur `warning_message`.
- **EINE KONSTANTE DECKT FÜNF FELDER AB:** `META_SHORT_MAX` in
  `src/lib/capi/meta-forward.ts` gilt für Code, Subcode, Typ, Trace-Bezeichner und
  Content-Type — wer sie für eines anhebt, hebt sie für alle; heute richtig, weil
  alle fünf kurz sind, aber eine Kopplung, die niemand bemerkt, bis eines sie
  sprengt.
- **DER NICHT-JSON-AUSGANG IST LIVE NICHT ERZWINGBAR** (er verlangt eine
  nicht-JSON-Antwort des Anbieters) und bleibt damit dauerhaft eine
  Test-only-Achse.
- **DIE VORGANGS-KENNUNG DES DRITTEN ANBIETERS WIRD IMMER GESCHWÄRZT**
  (`asLogShort` in `src/lib/capi/tiktok-forward.ts`): Sie ist strukturell eine lange
  undurchsichtige Folge und liegt in JEDEM Aufruf über der Grenze — das Feld liefert
  nie einen Wert und sieht trotzdem aus wie unterdrückte Information. Zwei Auswege,
  beide **UNENTSCHIEDEN**: das Feld weglassen, oder ihm eine benannte Ausnahme geben
  wie beim ersten Adapter. Letzteres braucht denselben GEMESSENEN Grund, der dort
  vorlag und hier fehlt — dass der Support dieses Anbieters ohne den Wert nicht
  arbeiten kann. **Die Entscheidung gegen die Ausnahme beim Bau war richtig und
  bleibt es; was fehlt, ist eine Messung.**
- **UNS FEHLT DIE INHALTS-KENNUNG, die der Anbieter erwartet** (`TrackConfig` in
  `src/lib/mappings.ts` trägt Wert und Währung, keine Inhalts-Kennung): Der Test-Tab
  beanstandet sie im Betrieb dauerhaft — bekannt und akzeptiert. **Gemessener
  Nebenbefund:** Der Anbieter leitet aus unseren zwei Feldern selbst ein Sammelfeld
  ab; dort läge die Kennung, wenn wir eine hätten.
- **EINE WARNUNG AN DER OBERFLÄCHE, dass ein frei benanntes Ereignis beim dritten
  Anbieter nicht optimierungsfähig ist** (`ActionPanel` in `src/components/`):
  eigener Bereich, eigene Produktfrage, kein Live-Nachweis nötig. **Die Messung, die
  sie belegt:** ein erfundener Name wird angenommen und als Custom geführt, und die
  Quittung sagt das nicht — nur die Oberfläche des Anbieters tut es.
- **DER GEHEIMNIS-PLATZHALTER IST BEI ZWEI ZIELKARTEN IDENTISCH**
  (`TARGET_CARDS` in `src/components/TargetCard.tsx`): für den Nutzer folgenlos, weil
  die BESCHRIFTUNGEN sich unterscheiden — für eine Testabfrage über den Platzhalter
  nicht.
- **DIE BETREIBER-DOKUMENTATION WÄCHST UM ZWEI PUNKTE** (kein Symbolname: dieses
  Dokument existiert im Repo noch nicht — verwandt ist der offene Posten
  "COOKIE-DOKU-SCHNIPSEL" in CLAUDE.md, "## Offene Punkte"): (1) dass Pagesmith
  KEINEN Einwilligungs-Dialog mitliefert und ohne einen ALLE Ziele als erlaubt
  gelten; (2) die GRENZE DER DEDUPLIZIERUNG in der belastbaren Fassung — unsere
  Deduplizierung führt Browser und Server über eine GETEILTE Ereignis-Kennung
  zusammen, und diese Zusage gilt für Ereignisse **AUS DIESEM BUILDER**; ein Tag,
  das zusätzlich über einen Tag-Manager oder ein Shop-System eingebunden ist,
  erzeugt Ereignisse mit FREMDEN Kennungen, die keine Deduplizierung
  zusammenführen kann — weder unsere noch die des Anbieters. **AUSDRÜCKLICH NICHT
  "zu 100 % Konfigurationsfehler":** Eine Absolutheits-Aussage wird vom ersten
  Gegenbeispiel widerlegt, und dann fällt die ganze Argumentation, obwohl sie im
  Kern stimmt.
- **DIE FAN-OUT-TESTS KENNEN DAS DRITTE ZIEL NICHT** (`src/lib/capi/fan-out.test.ts`):
  GEMESSEN am Repo (2026-08-12), formale Suche über die Datei nach dem Zielnamen —
  **NULL Treffer**. Abgebildet ist dort der Fan-Out mit ZWEI Empfängern; der Lauf mit
  DREI Zielen, den der Live-Test der Scheibe 3.2 gezeigt hat, hat im Bestand keinen
  Wächter. **Was still kaputtgeht:** eine Änderung an Nebenläufigkeit oder Containment,
  die erst ab dem DRITTEN Empfänger bricht, fällt keinem Test auf.
  **GRENZE ZUM PUNKT "DREI UNABHÄNGIGE KONSTANTEN" OBEN, sie ist ausdrücklich zu
  ziehen:** Jener sagt, dass eine ZAHL unbeobachtet ist (die Deckelwerte, deren
  Gleichheit ein Test faktisch unterstellt). Dieser sagt, dass ein ganzer EMPFÄNGER in
  der Datei nicht vorkommt. **Zwei verschiedene Lücken — keiner der beiden deckt den
  anderen.** Gemessener Beleg für die Trennung: die beiden Kommentare in jener Datei,
  die die Deckel-Annahme benennen, führen die Konstanten des ERSTEN und des ZWEITEN
  Adapters auf; die des dritten kommt dort nicht vor.
- **KEIN KREUZVERGLEICH BEIM ZWEITEN ZIEL** (`EVENT_MAP` in
  `src/lib/capi/pinterest-forward.ts`, Testbestand `src/lib/capi/pinterest-forward.test.ts`):
  GEMESSEN am Repo (2026-08-12), formale Suche über `src/` nach `META_STANDARD_EVENTS` —
  Treffer in `components/ActionPanel.tsx`, `lib/tracking/meta.ts`,
  `lib/capi/ingest.forwardable.test.ts` und `lib/capi/tiktok-forward.test.ts`, **nicht**
  in der Testdatei des zweiten Ziels. **Was still kaputtgeht:** Wächst unsere eigene
  Standardliste um einen neunten Namen, wird ausschliesslich `T11` rot — der Wächter des
  DRITTEN Ziels. Die Tabelle des zweiten bleibt stumm, und der neue Name ginge dort als
  nicht abgebildeter Name hinaus, unter einer Bedeutung, die niemand vergeben hat.
- **ZWEI DECKUNGSGLEICHE, UNABHÄNGIGE NORMALISIERUNGEN VOR DEM GETEILTEN PRIMITIV**
  (`asLogString` in `src/lib/capi/meta-forward.ts`, `normalizeProviderValue` in
  `src/lib/capi/tiktok-forward.ts`): GEMESSEN am Repo (2026-08-12) — gleiche
  Vorprüfung (fehlend, `null` und Leerwert werden zum Leer-Ergebnis), gleiche
  Umwandlung über `String`, gleicher Rückgabetyp, verschiedene Namen, zwei Dateien.
  **KEIN Test sichert ihre Gleichheit**; wer eine ändert, macht nichts rot. **Was still
  kaputtgeht:** Fiele an einer der beiden der Riegel weg, erreichte ein Nicht-String
  `redactOpaque` — das Primitiv ist ausdrücklich NICHT defensiv und wirft, und ein Wurf
  auf diesem Pfad bräche die garantierte leere 204.
  **DASSELBE MUSTER WIE DIE "VIERTE TRIMM-KOPIE" OBEN, ABER EIN ANDERER GEGENSTAND:**
  Dort geht es um `asString`, hier um die Normalisierung davor. Jener Punkt verzeichnet
  diese beiden NICHT.
- **"KONFIGURIERT" HEISST AN ZWEI ORTEN VERSCHIEDENES — HALB VOLLZOGEN (Scheibe B2,
  live bestanden 2026-08-13, s. Abschnitt 3.7).** Der Punkt wird **nicht gestrichen,
  sondern durch den Vollzug ersetzt**: Eine blosse Streichung liesse offen, ob er
  erledigt oder vergessen wurde — und sie verlöre die Hälfte, die noch offen ist.
  **BEHOBEN IST DIE SICHTBARE HÄLFTE:** Ein Ziel mit hinterlegten Zugangsdaten und ohne
  Kennung sagt jetzt selbst, dass an es nichts gesendet wird; die Anzeige stimmt mit der
  Lieferfähigkeit überein. **NICHT BEHOBEN IST DIE STRUKTURELLE:** Die Frage wird
  weiterhin an ZWEI ORTEN beantwortet — geteilt ist die BEDINGUNG (`hasPixelId`), nicht
  das URTEIL. **Invariante (6) aus Abschnitt 7.5 ist erst nach C und D erfüllt.**
  **WER HIER NUR "ERLEDIGT" LIEST, HÄLT DIE STRUKTUR FÜR AUFGERÄUMT** — sie ist es
  nicht, und genau deshalb steht der Punkt weiter hier statt in einem Abschluss.
  **DER URSPRÜNGLICHE BEFUND, unverändert, weil er die Herleitung trägt**
  (`listConfiguredTargets` in
  `src/app/projects/actions.ts` gegen die Paarung in `getCapiConfigByTrackingKey`,
  `src/lib/capi/token.ts`): GEMESSEN am Repo (2026-08-12) — die Oberfläche leitet
  "konfiguriert" ALLEIN aus der Anwesenheit einer Zeile in der Geheimnis-Tabelle ab; der
  Forward nimmt nur auf, wer Zugangsdaten UND eine gesetzte Kennung trägt. **Was still
  kaputtging:** Ein Ziel mit hinterlegten Zugangsdaten, aber ohne Kennung stand in der
  Karte als "Zugangsdaten hinterlegt" und wurde nie beliefert — ohne Meldung, ohne
  Logzeile, auf keinem Kanal sichtbar.
  **ABGRENZUNG, ohne die der Punkt als Widerspruch gelesen wird:** Der Kopf von
  `listConfiguredTargets` nennt als tragende Entscheidung, dass sie DIESELBE Quelle liest
  wie der Forward-Pfad. Das ist richtig — für das GEHEIMNIS, und damit für genau die
  HÄLFTE der Bedingung. Die Kennung kommt aus dem Einstellungs-Blob und ist von jener
  Zusage nicht erfasst. Ebenso richtig und ebenso halb bleibt das Beispiel in CLAUDE.md,
  "ABLEITEN STATT LÖSCHEN … AUS WELCHER QUELLE".
  **NICHT ZU VERWECHSELN mit der bereits im Code benannten Schwäche** (jeder Fehlschlag
  jener Ableitung liefert eine LEERE Liste, "kaputt" sieht aus wie "nichts
  konfiguriert"): Das ist die Achse LADEN, diese hier die Achse VOLLSTÄNDIGKEIT.
- **DIE ZAHL "SECHS VOKABULAR-STELLEN" IN ABSCHNITT 3.2 STEHT OHNE AUFZÄHLUNG.**
  REKONSTRUIERT am Repo (2026-08-12) ergeben sich sechs CODE-Stellen, die den Zielwert
  des dritten Ziels tragen: `TRACKING_TARGETS` (`src/lib/settings.ts`),
  `CONSENT_KEY_BY_TARGET` und `LEGACY_CONSENT_ROLE`
  (`src/lib/tracking/consent-targets.ts`), `TARGET_CARDS`
  (`src/components/TargetCard.tsx`), `TIKTOK_TARGET` und der zugehörige Zweig in
  `dispatchForward` (beide `src/lib/capi/ingest.ts`).
  **DIESE REKONSTRUKTION IST NICHT BELEGT, SONDERN ABGELEITET, und sie ist mehrdeutig:**
  Zählt man den Import des Adapters statt des Dispatch-Zweigs, oder rechnet man die
  Migration mit (die Abschnitt 3.2 SEPARAT nennt), kommt dieselbe Zahl mit anderer
  Aufteilung heraus. **Was still kaputtgeht:** Wer beim VIERTEN Ziel "die sechs Stellen"
  abarbeitet, ohne zu wissen, WELCHE sechs, trifft fünf und lässt eine aus — und keine
  davon wird rot; ein fehlender Eintrag heisst fail-closed "nicht erlaubt" oder "kein
  Adapter", beides lautlos.
  **WARUM HIER UND NICHT ALS KORREKTUR AN 3.2:** Eine abgeschlossene Scheibe wird nicht
  umgeschrieben. Die Aufzählung tritt DANEBEN, mit ihrer eigenen Provenienz.
- **EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN** (`dispatchForward` in
  `src/lib/capi/ingest.ts`, dazu `forwardToMeta`, `forwardToPinterest` und
  `forwardToTiktok`): GEMESSEN am Repo (2026-08-12) — die Zuordnung gibt `Promise<void>`
  zurück, und alle DREI Adapter tragen die Zusage "SIE GIBT NICHTS ZURUECK" wörtlich in
  ihrem Kopf. **Es gibt damit keinen Rückgabewert, der "für dieses Ereignis nicht
  abbildbar" von "gesendet" oder "fehlgeschlagen" unterscheiden könnte.**
  **Was still kaputtgeht:** Ein Ziel, das ein einzelnes Ereignis nicht abbilden kann,
  hat heute nur die Wahl zwischen Senden und stillem Nichtstun — beides sieht von aussen
  gleich aus.
  **DER PREIS IST GRÖSSER ALS EIN NEUES ZIEL, und deshalb steht er hier:** Ein Rückkanal
  berührt ALLE DREI bestehenden Adapter, nicht nur einen neu hinzukommenden. Er gehört
  zum Preis eines Ziels mit Kennung JE EREIGNISTYP (s. Abschnitt 7.5, "WAS NICHT GEBAUT
  WIRD").
- **DER IDENTITÄTS-RIEGEL IST NICHT BEI ALLEN DREI ADAPTERN GLEICH** (`forwardToMeta`,
  `forwardToPinterest`, `forwardToTiktok`): GEMESSEN am Repo (2026-08-12), formale Suche
  über die drei Adapter — ZWEI von ihnen brechen ohne IP **oder** ohne User-Agent ab,
  bevor irgendein Aufruf hinausgeht; **beim ersten kommt dieser Riegel NICHT vor**. Dort
  werden die beiden Felder nur konditional in die Nutzlast gesetzt, und der Aufruf geht
  trotzdem hinaus.
  **Was still kaputtgeht:** Wer die drei Adapter für gleich gebaut hält, liest aus dem
  Verhalten des einen eine Regel für die anderen — in beide Richtungen falsch. **Ob die
  Ungleichheit richtig oder falsch ist, ist hier NICHT entschieden**; gemeldet ist, dass
  sie besteht und nirgends als Unterschied benannt wird (die Liste der Adapter-
  Unterschiede im Kopf von `src/lib/capi/pinterest-forward.ts` führt sie nicht).
- **DAS ERGEBNIS DES FAN-OUTS WIRD VERWORFEN** (der Fan-Out in
  `src/lib/capi/ingest.ts`): GEMESSEN am Repo (2026-08-12) — das Sammel-Warten wird
  erwartet, sein RÜCKGABEWERT aber nirgends gelesen. Welcher Empfänger geliefert hat und
  welcher nicht, ist im Handler vorhanden und wird fallengelassen.
  **Was still kaputtgeht:** Es gibt keinen Ort, an dem ein dauerhaft ausfallender
  Empfänger auffiele — die Diagnose lebt allein in flüchtigen Logzeilen der einzelnen
  Adapter, und die tragen weder Projekt- noch Ereignis-Bezug.
  **DIE ZWEITE HÄLFTE DIESES BEFUNDES IST BEREITS VERZEICHNET UND WIRD HIER NUR
  VERWIESEN, NICHT WIEDERHOLT:** dass die Analytics-Zeile kein Ziel kennt, steht als
  BEFUND 4 in Abschnitt 7.1 und ist über Abschnitt 7.3 (b) und (c) an der Phase-8-Zeile
  in CLAUDE.md verortet (fehlende Ziel-Dimension auf den Ereignissen). **Neu ist allein
  der verworfene Rückgabewert** — er ist eine Aussage über den HANDLER, nicht über das
  Schema, und von jener Dimension unabhängig.
  **ERSTE INSTANZ, GEMESSEN (Live, 2026-08-13, berichtet) — ADDITIV, der Punkt darüber
  bleibt unverändert:** In einem realen Lauf hat ein Ziel dauerhaft NICHT geliefert. Das
  Einzige, was davon existierte, war eine flüchtige Logzeile ohne Projekt- und ohne
  Ereignis-Bezug; bemerkt wurde es NUR, weil jemand aus einem ANDEREN Grund ins
  Protokoll sah. **Damit beschreibt dieser Punkt keinen MÖGLICHEN, sondern einen
  EINGETRETENEN Zustand.** Die Ursache lag im Testprojekt (ein ungültiges Zugangsdatum)
  und nicht im Code — das ändert am Befund nichts: Er handelt davon, dass ein
  dauerhafter Ausfall **nirgends auffällt**, nicht davon, warum er eintrat.
- **ZWEI UNABHÄNGIGE RIEGEL AUF DERSELBEN ACHSE — DER ZWEITE DECKT DEN ERSTEN ZU**
  (`getCapiConfigByTrackingKey` in `src/lib/capi/token.ts`: `hasSecret` in der
  Geheimnis-Schleife und `if (!token) continue` in der Paarung darunter): GEMESSEN
  (Mutationsproben M2/M3 am 2026-08-13) — wird `hasSecret` aufgeweicht, fällt ein
  leeres oder `null`-Geheimnis trotzdem am Falsy-Riegel heraus.
  **DER RIEGEL BLEIBT, UND DIESER PUNKT BEANTRAGT NICHT SEINE ENTFERNUNG:** Er ist eine
  zweite, unabhängige Deckung auf dem meistgetroffenen Pfad der Plattform; ihn
  wegzunehmen wäre eine Verschlechterung. **Was still kaputtgeht, ist etwas anderes:**
  Jeder Test, der diese Achse über einen FALSY Wert prüft, ist blind gegen einen
  Fehler im ersten Riegel — er kann nicht rot werden, weil der zweite die Wirkung
  ohnehin verhindert. Wer hier künftig einen Wächter baut, wählt einen TRUTHY Wert
  (Muster: N3 in `src/lib/capi/token.test.ts`), sonst schreibt er sich eine Sicherheit
  auf, die es nicht gibt.
- **UNGEMESSEN: WAS EIN NICHT-STRING ALS ZUGANGSDATUM AUSLÖST, WENN ER DEN RESOLVER
  PASSIERT** (`CapiConfig.token` in `src/lib/capi/token.ts`): GEMESSEN ist nur die eine
  Hälfte — heute verwirft `hasSecret` jeden Nicht-String, und N3 hält das fest. Fiele
  diese Hälfte, stünde ein Wert in `CapiConfig.token`, dessen Vertrag eine Zeichenkette
  nennt, und er ginge in einen Adapter. **Was dort geschieht, ist NICHT gemessen:** ob
  etwas wirft, ob die garantierte leere 204 bricht, oder ob der Wert stillschweigend zu
  einer Zeichenkette wird. **DIE MESSUNG ENTSCHEIDET SEINEN RANG** — bricht die 204,
  ist es ein Containment-Bruch und gehört ins Manifest; wird der Wert nur gecastet, ist
  es eine Notiz. Ohne die Messung ist beides gleich plausibel, und der Punkt darf nicht
  nach dem schlimmeren Ausgang benannt werden.
  **ABGRENZUNG zum Punkt „ZWEI DECKUNGSGLEICHE, UNABHÄNGIGE NORMALISIERUNGEN" oben, die
  zwingend dazugehört:** Jener führt dieselbe FOLGE (ein Nicht-String erreicht
  `redactOpaque`, das Primitiv wirft, die 204 bricht) — aber mit einem anderen
  EINGANG, nämlich dem Wegfall einer Normalisierung IM Adapter, und für den
  FEHLERTEXT des Anbieters. Hier ist der Eingang der Resolver und der Gegenstand das
  ZUGANGSDATUM. Zwei Wege zu einer möglichen Wirkung; keiner deckt den anderen, und
  dass die Wirkung dort schon benannt ist, macht sie hier nicht gemessen.
- **`getPixelId` WIRFT BEI EINER NICHT-ZEICHENKETTEN-KENNUNG** (`getPixelId` in
  `src/lib/settings.ts`): Die Optional-Verkettung vor `.trim()` schützt gegen `null`
  und `undefined`, NICHT gegen eine Zahl — und der Einstellungs-Blob ist
  client-besessen und nicht typgesichert. **Was still kaputtgeht:** ein Wurf im
  Auflösungs-Pfad, BEVOR irgendein Forward stattfindet. `hasPixelId` nimmt bewusst
  `unknown` entgegen und wäre robust, kommt aber erst NACH `getPixelId` zum Zug.
  **UNGEMESSEN**, ob der Wurf im Ingest die leere 204 bricht — dieselbe offene Frage
  wie beim Punkt darüber, anderer Gegenstand.
- **GEGENSTANDSLOS — DURCH DEN VOLLZUG ERSETZT, NICHT GESTRICHEN (2026-08-13, s.
  Abschnitt 3.12): DIE EINGABE-FORM, DIE DEN GEHEIMNIS-WERT NAHM.** Sie ist mit der
  Zusammensetzung entfallen; `ReadinessInput` gibt es nicht mehr.
  **DER URSPRÜNGLICHE PUNKT, unverändert, weil er die Herleitung trägt:** „DER BENANNTE
  ZUSTAND NIMMT DEN GEHEIMNIS-WERT ENTGEGEN, DEN DIE OBERFLÄCHE NIE HAT
  (`ReadinessInput`): GEMESSEN am Repo (2026-08-13) — das Feld ist der WERT, und die
  Oberfläche darf ihn nach der Zuschnitts-Invariante nie sehen; sie hat nur einen
  Wahrheitswert aus der Zeilen-Existenz. Was still kaputtgeht: Scheibe C braucht dann
  entweder einen zweiten Eingang für bereits entschiedene Tatsachen — oder die Karte
  fabriziert einen Ersatzwert, und damit behauptet sie verdeckt ‚Zeile existiert heisst
  nicht-leeres Geheimnis', als Wert getarnt."
  **WARUM ERSETZT UND NICHT GESTRICHEN:** Dieser Punkt ist im Nachhinein die SCHÄRFSTE
  Begründung dafür, dass die Zusammensetzung verfrüht war — er hat den Konstruktionsfehler
  benannt, bevor jemand ihn so nannte. Eine Streichung nähme genau den Beleg mit, den ein
  künftiger Anlauf braucht. **DIE AUFLAGE, DIE ER HINTERLÄSST, steht als Bedingung am
  Trigger im Punkt weiter unten:** Eine neue Zusammensetzung darf den Geheimnis-WERT
  nicht verlangen.
- **„ZEILE EXISTIERT" GLEICH „WERT VORHANDEN" RUHT AUF DEM SCHREIBPFAD, NICHT AUF DEM
  SCHEMA** (`setCapiToken` in `src/app/projects/actions.ts` gegen
  `supabase/migrations/0021_project_secrets.sql`): GEMESSEN am Repo (2026-08-12) — die
  Spalte ist `not null`, und `not null` ist nicht `<> ''`; der einzige CHECK der Tabelle
  bindet `target`. Nicht-leer ist allein zugesichert, weil die Server-Action trimmt und
  bei leerem Ergebnis abbricht. **Was still kaputtgeht:** Jeder Schreibweg, der an
  dieser Action vorbeigeht — und über `service_role` ist das der einzige Weg, den es
  auf dieser Tabelle überhaupt gibt —, kann eine Zeile erzeugen, die die Oberfläche als
  konfiguriert meldet. Ein CHECK auf Nicht-Leere machte aus dem schwachen Argument das
  starke.
  **ABGRENZUNG zu „'KONFIGURIERT' HEISST AN ZWEI ORTEN VERSCHIEDENES" oben:** Jener
  Punkt handelt von ZWEI Urteilen, die verschiedene Dinge prüfen. Dieser handelt davon,
  worauf die eine Hälfte des einen Urteils überhaupt ruht. Jener bleibt unberührt.
- **DIE KARTE ZEIGT DEN UNGESPEICHERTEN KENNUNGS-ZUSTAND — GETEILT, WEIL NUR EIN TEIL
  ERLEDIGT IST** (`pixelIdFor` in `src/components/CodeImporter.tsx`, gereicht über
  `MeasureView` an `TargetCard`): GEMESSEN am Repo (2026-08-12) — die Karte liest den
  laufenden Einstellungs-Zustand, der Auflösungs-Pfad die persistierte Zeile. Der Punkt
  wird NICHT gestrichen, sondern in seine zwei Leser zerlegt; der Fundstellen-Zeiger
  deckte beide, das Risiko trug nur einer.
  - **ERLEDIGT (Scheibe B2, s. Abschnitt 3.7):** die Aussage über die AUSLIEFERUNG.
    Genau vor ihr warnte der Punkt („heute folgenlos, weil keine Anzeige eine Aussage
    über die AUSLIEFERUNG trifft — mit Scheibe B2 trifft eine"). Sie liest jetzt den
    GESPEICHERTEN Stand.
  - **NIE EIN DEFEKT GEWESEN, und das gehört dazu, sonst sucht jemand einen Fix:** das
    EINGABEFELD. Dass es zeigt, was gerade getippt wird, ist die einzig richtige
    Behandlung — es liest den laufenden Wert weiter, und das bleibt so.
  - **GEGENSTANDSLOS — DURCH DEN VOLLZUG ERSETZT, NICHT GESTRICHEN (Scheibe D1, s.
    Abschnitt 3.10):** die vermutete Optimistik im **Consent-Memo** (`consentTargets`
    in `src/components/CodeImporter.tsx`). **DER URSPRÜNGLICHE PUNKT, unverändert, weil
    er die Herleitung trägt:** „dieselbe Optimistik im Consent-Memo, das ebenfalls den
    laufenden Stand liest. Was still kaputtgeht, ist hier NICHT gemessen — der erzeugte
    Text entsteht im Publish-Pfad, der seinerseits aus dem laufenden Stand baut; ob
    laufend und gespeichert dort je auseinanderfallen, ist eine eigene Messung."
    **DIE MESSUNG IST GEFAHREN (GEMESSEN am Repo, 2026-08-13):** `buildDocumentFor`
    liest im selben Ausdruck `getPixelId(settings, "meta")` und
    `getTrackingKey(settings)` — der erzeugte Text entsteht aus **demselben laufenden
    Stand** wie der Schlüsselsatz. **Es gibt hier kein Auseinanderfallen, das gemessen
    werden könnte**; das Memo MUSS den laufenden Stand lesen, und ein gespeicherter
    wäre ein DEFEKT statt eines konservativeren Zustands.
    **WARUM ERSETZT UND NICHT GESTRICHEN:** Eine blosse Streichung liesse offen, ob der
    Punkt beantwortet oder vergessen wurde — und sie verlöre die Unterscheidung zur
    Karte aus B2, die aus demselben Zeiger stammt und dort sehr wohl ein Risiko trug.
    **DIE BEIDEN ANDEREN UNTERPUNKTE (Eingabefeld, Auslieferungs-Aussage) BLEIBEN
    UNBERÜHRT.**
- **DER GESPEICHERTE STAND IST EIN SPIEGEL, NICHT DIE DATENBANK** (`savedSettings` in
  `src/components/CodeImporter.tsx`, seit Scheibe B2 bis in `TargetCard` gereicht):
  GEMESSEN am Repo (2026-08-13) — er wird beim Laden aus der Projekt-Zeile geseedet und
  im Erfolgszweig des Speicherns nachgeführt; eine Bestätigung aus der Datenbank holt
  er nie. **Was still kaputtgeht:** Ein zweiter Tab, der dasselbe Projekt speichert,
  macht ihn stumm veraltet — die Zeile über die Auslieferung urteilte dann auf einem
  überholten Stand, ohne dass irgendwo etwas rot wird. Auflösbar nur mit einer neuen
  Abfrage, und die war in B2 ausdrücklich ausgeschlossen.
  **ABGRENZUNG zu den beiden Nachbarn, sonst liest sich das als dieselbe Sache:** Der
  Punkt darüber handelt von laufend gegen gespeichert (innerhalb des Clients), dieser
  von gespeichert gegen Datenbank. „'KONFIGURIERT' HEISST AN ZWEI ORTEN VERSCHIEDENES"
  handelt von zwei Urteilen über verschiedene Dinge. Drei Achsen, keine deckt eine
  andere. **PRÄZEDENZ, kein neues Risiko:** Dieselbe Bauform trägt seit Phase 7 der
  Publish-Zustand (`settings.hosting` als Spiegel der `domains`-Zeile) — dort ist die
  Wahrheitsquelle in CLAUDE.md ausdrücklich benannt.

- **EIN STANDARD-EREIGNIS OHNE BETRAGS-FELD — OFFENE PRODUKTFRAGE, KEIN BEFUND ÜBER
  EINEN FEHLER** (`META_VALUE_EVENTS` in `src/lib/tracking/meta.ts`, gelesen über
  `showValue` in `src/components/ActionPanel.tsx`): **GEMESSEN (Live, 2026-08-13):** Bei
  einem der Standard-Ereignisse lässt die Oberfläche **keinen Betrag eingeben** — das
  Feld erscheint nicht. **UNGEMESSEN ist zweierlei, und beides entscheidet den Rang:**
  ob das eine BEWUSSTE fachliche Einschränkung ist oder eine beiläufige Folge der
  Feld-Logik, **und** ob der Anbieter für dieses Ereignis überhaupt einen Wert annimmt.
  **Was still kaputtgeht, falls es beiläufig ist:** Der Betreiber kann für dieses
  Ereignis keinen Wert hinterlegen, bekommt dafür keine Begründung zu sehen, und in der
  Auswertung beim Anbieter fehlt der Umsatz — ohne dass irgendwo ein Fehler entsteht.
  **KEINE REPARATUR UND KEIN VORSCHLAG HIER:** Solange die zweite Provenienz fehlt, wäre
  jede Änderung eine Wette darauf, welcher der beiden Fälle vorliegt.
  **ABGRENZUNG zu den zwei Nachbarn, sonst liest es sich als dasselbe:** „UNS FEHLT DIE
  INHALTS-KENNUNG" handelt von einem Feld, das es im Modell GAR NICHT gibt; dieser Punkt
  von einem Feld, das es gibt und das für ein bestimmtes Ereignis nicht angeboten wird.
  Die „WARNUNG AN DER OBERFLÄCHE" betrifft FREI benannte Ereignisse — hier geht es um
  ein STANDARD-Ereignis.

- **DIE ZUSAMMENSETZUNG `targetReadiness` WAR VERFRÜHT UND IST GESTRICHEN — VOLLZOGEN
  (Owner-Entscheidung 2026-08-13, s. Abschnitt 3.12).** Der Punkt wird **nicht gestrichen,
  sondern durch den Vollzug ersetzt**: Eine blosse Streichung liesse offen, ob die Frage
  beantwortet oder vergessen wurde — und sie verlöre den TRIGGER, der als einziger
  verhindert, dass der nächste Anlauf denselben Schnitt noch einmal macht.
  **DER TRIGGER FÜR EINE NEUE ZUSAMMENSETZUNG, mit seiner Auflage:** Sie wird erst wieder
  fällig, wenn ein REALER Konsument existiert, der alle Teile ZUGLEICH braucht — und der
  einzige Ort, an dem das je der Fall gewesen wäre, ist die Oberfläche.
  **DIE AUFLAGE IST BINDEND UND KEIN Hinweis:** Ihre Eingabe-Form darf dann NICHT den
  Geheimnis-WERT verlangen. Genau daran ist die alte gescheitert — die Oberfläche hat
  den Wert nie und darf ihn nie haben; sie kennt nur einen Wahrheitswert aus der
  Zeilen-Existenz (s. den ersetzten Punkt weiter oben).
  **DIE BELEGE, DIE ZUR ENTSCHEIDUNG GEFÜHRT HABEN, bleiben unverändert stehen:**
  **WORTLAUT DES TRIGGERS (Abschnitt 3.8):** „Bleibt die Zusammensetzung `targetReadiness`
  auch nach Scheibe D **ohne Konsumenten**, ist zu entscheiden, ob sie verfrüht war. Nach C
  wird das NICHT geprüft — C braucht sie nicht, und eine Prüfung mitten in der Reihe
  beantwortete die Frage zu früh." **Die Reihe ist zu Ende, die Bedingung ist eingetreten.**
  **DIE BELEGE — GEMESSEN am Repo (2026-08-13, formale Suche über `src/`):**
  - **DIE BEIDEN PRÄDIKATE HABEN VIER PRODUKTIV-AUFRUFSTELLEN.** `hasPixelId` DREI: das
    Consent-Memo (`consentTargets` in `src/components/CodeImporter.tsx`, seit D2), die
    Auslieferungs-Zeile der Karte (`TargetCard` in `src/components/TargetCard.tsx`, seit
    B2) und der Kennungs-Filter im Auflösungs-Pfad (`getCapiConfigByTrackingKey` in
    `src/lib/capi/token.ts`, seit B1). `hasSecret` EINE: die Geheimnis-Schleife in
    derselben Funktion.
  - **DIE ZUSAMMENSETZUNG HAT NULL.** Kein Produktiv-Aufruf, kein Import ausserhalb ihrer
    eigenen Datei; auch ihre drei exportierten Typen (`ReadinessPart`, `TargetReadiness`,
    `ReadinessInput`) kommen nirgends sonst vor. Die drei Dateien, die aus
    `target-readiness.ts` importieren, holen sich **ausschliesslich die Prädikate**.
  - **WAS IHR WEGFALL BERÜHRTE:** die Funktion selbst, ihre drei Typen und **SIEBEN der
    neun Tests** ihrer Testdatei (T1, T2, T3, T4, T7, T8, T9 laufen über den
    `readiness`-Helfer). **NICHT berührt** wären T5 und T6 — sie prüfen die Prädikate
    direkt — und keine einzige Produktiv-Zeile. **Der Wegfall wäre eine reine
    Streichung**, kein Umbau.
  - **WAS IHR BLEIBEN BERÜHRT:** nichts am Verhalten, und das ist genau der Punkt. Sie
    kostet eine Datei, drei Typen und sieben Tests, die eine Zusammensetzung
    charakterisieren, die niemand aufruft. **Dagegen steht, was in 3.5 und 3.6 am
    KONTROLLFLUSS belegt ist** — und das ist kein Vorschlag, sondern die Fundstelle: Die
    server-only-Seite kennt den Adapter nicht, und für ein Ziel OHNE Kennung wird der
    Geheimnis-Wert dort gar nicht erst geholt; ein Konsument müsste also erst einen
    Zustand herstellen, den der heutige Pfad aus Abfrage-Ökonomie vermeidet.
  **DIE BEIDEN VORHERSAGEN OBEN SIND EINGETROFFEN (GEMESSEN, 2026-08-13):** Der Wegfall
  WAR eine reine Streichung — `tsc`, `vitest` und `build` blieben grün, keine
  Produktiv-Zeile ausserhalb der einen Datei musste angefasst werden, und die Suite fiel
  um genau die vorhergesagten sieben Tests (1070 → 1063).
  **WARUM DIESER PUNKT IM VORRAT STEHT UND NICHT IN 3.11 ALLEIN:** 3.11 nennt die Frage
  auch, aber als Teil eines SCHEIBEN-VERMERKS — und Scheiben-Vermerke sind
  abgeschlossene Historie, die am Phasenende archiviert wird. **Der Vorrat ist die Liste,
  die die nächste Sitzung liest.** **HIER STAND „und hier ist nichts entschieden" — das
  war bis zum 2026-08-13 richtig und ist es seither nicht mehr;** der Punkt trägt jetzt
  den Vollzug und den Trigger, nicht mehr die offene Frage. **Die beiden Stellen
  widersprechen sich nicht — diese hier ist die getragene.**

Die vier fälligen Punkte am ersten Adapter und das Gegenstück bei den
Deckelwerten stehen ausformuliert in
`docs/claude-history/phase-11-multi-tracking.md`, "## Der Arbeitsvorrat — vier
fällige Punkte am ersten Adapter" — hier nur der Zeiger, keine Kopie.

---

## 6. Hebungs-Kandidaten — aus ALLEN Scheiben dieser Phase

**SIE WERDEN JETZT NICHT GEHOBEN.** Die Hebung nach CLAUDE.md, "## Immer beachten",
ist Sache des PHASENENDES — hier stehen Kandidaten, keine Auswahl. Je Kandidat ein
Satz, der Beleg aus der Scheibe, aus der er stammt, und die Prüfung, ob eine
bestehende Regel ihn schon abdeckt (geprüft am 2026-08-11 durch Durchsicht von
"## Immer beachten"). **Die Zwischenüberschriften nennen die Herkunft.**

1. **EINE KAPPUNG IST KEINE MASKIERUNG:** Sie behält den ANFANG und begrenzt die
   LÄNGE, nicht den INHALT — ein Geheimnis am Anfang überlebt sie vollständig.
   *Beleg:* Beide Kappungen auf dem Meta-Fehlerpfad standen jahrelang da und haben
   nie etwas geschützt; die Aufklärung musste das erst herausarbeiten.
   *Abdeckung:* KEINE bestehende Regel sagt das.
2. **ERST SCHWÄRZEN, DANN KAPPEN:** Die umgekehrte Reihenfolge erzeugt ein
   TEIL-Leak bei einer Zeile, die bereinigt AUSSIEHT — ein Rest unterhalb der
   Mindestlänge entgeht der Schwärzung.
   *Beleg:* Mutationsprobe M3 fällt an genau einem Test; in keiner Bestands-Fixture
   des zweiten Adapters wäre sie aufgefallen.
   *Abdeckung:* KEINE bestehende Regel sagt das.
3. **EIN KOMMENTAR, DER ÜBER FREMDES VERHALTEN UNBEDENKLICHKEIT BEHAUPTET, IST
   KEINE EIGENSCHAFT DES CODES** — und er kann eine Schutzmassnahme aufhalten.
   *Beleg:* "Metas message ist Beschreibungstext (kein Secret)" stand über dem
   Feld, das den Leak trug, und las sich wie eine geprüfte Zusage.
   *Abdeckung:* TEILWEISE, aber auf einer anderen Achse — "EINE REGEL KANN GÜLTIG
   BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD" behandelt alternde Angaben über den
   EIGENEN Code; hier geht es um eine nie belegte Angabe über einen FREMDEN Dienst.
4. **EINE ABWESENHEITS-FIXTURE, DIE NICHTS DURCHSICKERBARES ENTHÄLT, MACHT IHRE
   BEHAUPTUNG TRIVIAL WAHR.**
   *Beleg:* Keine Meta-Fixture liess die Anbieter-Antwort das Zugangsdatum
   zurückspiegeln; die vorhandenen "kein Token im Log"-Zusicherungen konnten den
   Echo-Fall gar nicht fangen.
   *Abdeckung:* NAHE DRAN — "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN
   HOHL" führt unter (2) "SIE IST TRIVIAL WAHR", meint dort aber eine Vorbedingung
   TIEFER IM PFAD. Dies wäre eine VIERTE Weise (die Fixture selbst trägt den
   Gegenstand nicht) und gehört als Fall in jene Regel, nicht als eigene daneben.
5. **EINE SCHWÄRZUNG NACH FORM TRIFFT AUCH DAS, WAS FORMGLEICH UND GEWOLLT IST.**
   Die Ausnahme braucht dann einen EIGENEN NAMEN (kein Schalter-Argument) und einen
   EIGENEN TEST.
   *Beleg:* Der live gemessene Trace-Bezeichner ist 23 Zeichen lang und wäre von
   derselben Regel gefressen worden, die das Geheimnis fängt.
   *Abdeckung:* KEINE bestehende Regel sagt das.
6. **EIN LEAK-TEST WIRD NIE MIT EINEM ECHTEN GEHEIMNIS GEFAHREN.** Das Instrument
   trüge sonst genau den Schaden, den der Test verhindern soll: Hat die Massnahme
   ein Loch, IST der Beweis dafür der eingetretene Verlust. Ein formbasierter
   Schutz sieht ein echtes und ein formgleiches erfundenes Geheimnis ohnehin als
   DIESELBE Eingabe — der echte Wert misst denselben Pfad, nur mit
   Schadenspotenzial. Was ein echtes Geheimnis zusätzlich erreichte, sind TIEFERE
   Fehlerklassen des Anbieters; diese Beobachtung hat aber keinen Konsumenten,
   solange der Schutz nach FORM und nicht nach WISSEN arbeitet, und sie stellt sich
   im echten Betrieb von selbst ein.
   *Beleg:* Der Live-Lauf vom 2026-08-11 erreichte nur die Parse-Ablehnung; die
   Signatur-Ablehnung wäre nur mit einem echten Zugangsdatum erreichbar gewesen.
   *Abdeckung:* KEINE bestehende Regel sagt das.

**AUS DER AUFLÖSUNG DER "WIEDERHOLUNGEN" (2026-08-11), drei weitere Kandidaten:**

7. **EINE MENGEN-AUSSAGE WIRD NICHT DADURCH RICHTIG, DASS MAN EIN FALSCHES
   MITGLIED ENTFERNT.** Wer eine Menge korrigiert, prüft die VERBLEIBENDEN
   Mitglieder — sonst wird die Aussage präziser statt wahr.
   *Beleg:* Die Custom-Pixel-Korrektur vom 2026-08-11 nahm ein Mitglied heraus und
   zog sieben Fundstellen nach, ohne die drei übrigen zu prüfen; von diesen dreien
   trägt eines die Aussage nur halb und eines gar nicht.
   *Abdeckung:* NAHE VERWANDT, aber eine andere Achse — "WER EINE HÄLFTE EINER
   AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE" spricht von ZWEI Angaben in EINEM
   Satz; hier geht es um die MITGLIEDER einer Menge.
8. **EINE NICHTERWÄHNUNG IST KEINE ENTWARNUNG.** Hatte eine Prüfung EINEN
   Gegenstand, sagt sie über die übrigen nichts — auch nicht implizit.
   *Beleg:* Aus "nur LinkedIn bricht die Hülle" wurde geschlossen, TikTok passe.
   Die Auflage jener Prüfung lautete wörtlich, der Entwurf werde GEGEN DIE
   LINKEDIN-HÜLLE geprüft; über TikTok stand dort nie ein Hüllen-Befund.
   *Abdeckung:* KEINE deckt sie. Zwei stehen daneben: "EINE ABWESENHEITS-BEHAUPTUNG
   WIRD AUF DREI WEISEN HOHL" (über Tests) und "EINE ANLEITUNG, DIE EINE
   VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE ENTWARNUNG" (über Anleitungen) —
   keine über den GELTUNGSBEREICH einer Prüfung.
9. **ZWEIMAL IN FOLGE LAG DIE TRAGENDE AUSSAGE IN DER DATEI, DIE ALS "WIRD NICHT
   GEPFLEGT, NICHT DER EINSTIEG" GEFÜHRT WIRD** — und fehlte in der kuratierten
   Fassung. Das ist ein Befund über das KURATIONS-KRITERIUM, nicht über die
   Rohfassung.
   *Beleg:* der LinkedIn-Block (g)/(h) und der namentliche Einspruch gegen die
   Roadmap-Formulierung in (e); beide fehlen in
   `docs/claude-history/phase-11-multi-tracking.md`.
   *Abdeckung:* KEINE Regel sagt das. Der Zeiger auf die Rohfassung in CLAUDE.md,
   "## Detail-Archiv", nennt sie als Rückfall, "wenn man dort etwas VERMISST" — er
   sagt nichts darüber, WAS bei der Kuration verlorengeht.

**AUS DER BERICHTS-LÜCKE UND DER TIKTOK-MESSUNG (2026-08-11), zwei weitere:**

10. **EIN VERWEIS AUF DEN EIGENEN, NOCH NICHT FERTIGEN BERICHT IST EINE
    TATSACHENBEHAUPTUNG ÜBER EIN ARTEFAKT, DAS IM MOMENT DER BEHAUPTUNG NOCH NICHT
    EXISTIERT** ("steht oben", "s. Abschnitt X", "im Anhang"). Es ist die einzige
    Behauptungsklasse, die strukturell ungeprüft bleibt: Für alles andere gilt, dass
    eine Behauptung an ihrem Gegenstand geprüft wird — hier ist der Gegenstand der
    noch nicht abgeschickte Text.
    *Beleg:* Der Bericht zu Commit `b64a953` verwies auf einen Volltext-Diff, der im
    Antworttext nie stand. Vier andere Nachweise waren da (Scope,
    Überschriften-Identität, Hunk-Zahl, Secret-Probe) — und der einzige, den ein
    Review braucht, fehlte. **Ein Review, das aus Kennzahlen statt aus dem
    Gegenstand besteht, findet nicht statt; es sieht nur so aus.**
    *Die zwei Auswege:* Belege INLINE statt per Verweis — oder ein Abgleich der
    Umfangs-Ansage gegen den FERTIGEN Text, bevor er hinausgeht.
    *Abdeckung:* TEILWEISE. Die Vorlage-Regel ("DIFF-VORLAGE = GEZIELTE
    VERIFIKATION") kennt das Instrument ("Der Bericht beginnt mit einer
    UMFANGS-ANSAGE … damit ein fehlender Abschnitt beim LESEN auffällt") und einen
    verwandten Fall ("Nie als Datei-Anhang (kommt leer an)"). Sie benennt aber NICHT
    die Behauptungsklasse selbst und nicht, dass die Umfangs-Ansage GEGEN den
    fertigen Text zu prüfen ist statt gegen den Auftrag.
11. **EINE ERFOLGSQUITTUNG KANN BLIND SEIN FÜR DAS, WAS MAN MISST.** Antwortet ein
    fremdes System mit und ohne den gemessenen Bestandteil IDENTISCH, belegt seine
    Quittung nichts über diesen Bestandteil — es braucht eine Gegenprobe, die ihn
    weglässt.
    *Beleg:* Die Antwort des Anbieters war mit und ohne Nutzer-Objekt identisch;
    ohne die Gegenprobe wäre "IP und User-Agent genügen" aus dem falschen Grund für
    wahr gehalten worden.
    *Abdeckung:* KEINE deckt sie. Zwei stehen daneben, beide auf anderer Achse:
    "EINE VORBEDINGUNG, DIE AUCH DER ALTE ZUSTAND ERFÜLLT, IST KEINE VORBEDINGUNG"
    spricht von einem SELBSTGEWÄHLTEN Anker im Test, hier geht es um die Antwort
    eines FREMDEN Systems, auf die niemand Einfluss hat; "EINE
    ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL" spricht ausdrücklich von
    TESTS, hier von einer LIVE-MESSUNG.

**AUS DEN TIKTOK-FEHLERWEGEN (2026-08-11), zwei weitere — der erste ist der
wichtigste dieser Sitzung:**

12. **EIN MESSERGEBNIS ZÄHLT ERST, WENN IM SELBEN LAUF EIN AUFRUF MITLÄUFT, VON DEM
    MAN WEISS, WIE ER AUSGEHEN MUSS.** Ein Ergebnis, das aus ZWEI Gründen so
    aussehen kann wie beobachtet, ist kein Ergebnis, sondern eine Frage.
    *Beleg — FÜNF Fälle an EINEM Anbieter an EINEM Tag, alle mit derselben
    Ursache:* eine Nichterwähnung wurde als Entwarnung gelesen · eine
    Erfolgsquittung wurde für einen Identitäts-Nachweis gehalten, bis die
    Gegenprobe OHNE Nutzer-Objekt dieselbe Antwort lieferte · eine Probe lief mit
    einem Zugangsdatum, dessen Gültigkeit ungeprüft war, und mass etwas anderes als
    beabsichtigt · drei Fehler-Rümpfe schienen leer, weil das Werkzeug den
    Antwortstrom verbraucht hatte · zwei Fehlerarten schienen ununterscheidbar,
    weil derselbe Leser beide Male nichts lieferte.
    **IN VIER VON FÜNF FÄLLEN HAT ERST EINE KONTROLLE MIT BEKANNTEM SOLL-AUSGANG
    DEN FEHLER GEZEIGT** — nicht der Verdacht, nicht die Wiederholung.
    *Abdeckung — und die Frage "dieselbe Regel in weiterem Geltungsbereich oder
    eine eigene?" beantworte ich mit: EINE EIGENE.* Die Denkfigur ist dieselbe wie
    in "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL" und in der
    Mutations-Lektion "EIN WÄCHTER, DER ÜBERWIEGEND ABWESENHEIT PRÜFT, BRAUCHT EINE
    EIGENE POSITIVKONTROLLE" — aber beide adressieren einen Wächter im EIGENEN
    Code, den man selbst schreibt und dessen Kontrolle man in dieselbe Testdatei
    legt. Hier sind Instrument UND Gegenstand FREMD: Die Kontrolle muss im selben
    LAUF gegen dasselbe fremde System gehen, und ihr Soll-Ausgang muss VORHER
    feststehen, weil man ihn nicht herstellen kann. Am nächsten steht die
    Live-Test-Lektion "EIN GROBES LIVE-TEST-INSTRUMENT REISST OFT DIE VORAUSSETZUNG
    DESSEN MIT, WAS ES PRÜFEN SOLL" — die spricht vom INSTRUMENT, diese vom
    fehlenden MITLAUFENDEN NACHWEIS. *Kandidat 11 ist ein Sonderfall von diesem
    hier, Kandidat 8 teilweise; wer 12 hebt, prüft, ob 11 darin aufgeht.*
13. **EIN WERKZEUG KANN EINEN BEFUND ERZEUGEN, DEN DER GEGENSTAND NICHT HERGIBT.**
    Ein HTTP-Leser, der den Antwortstrom vorher selbst verbraucht, liefert einen
    leeren Rumpf — **ununterscheidbar von einem Anbieter, der keinen sendet.**
    *Beleg:* Dieselben drei Aufrufe lieferten mit einem rohen Werkzeug Rümpfe von
    117, 137 und 142 Bytes.
    **FOLGE, die mitmuss: Wo ein Messergebnis eine ABWESENHEIT ist, wird das
    WERKZEUG GEWECHSELT, bevor die Abwesenheit als Befund gilt.**
    *Abdeckung:* KEINE deckt sie. Die nächste ist die Werkzeug-Regel "sed -i
    STRIPPT IN DIESER UMGEBUNG STILL DAS CR" — sie handelt davon, dass ein Werkzeug
    den GEGENSTAND still verändert; hier verändert es das ERGEBNIS, ohne den
    Gegenstand anzufassen. Verwandt, gegenläufig, nicht dasselbe.

**AUS DEM BAU DES DRITTEN ZIELS (2026-08-11), vier weitere — die ersten drei hängen
zusammen und betreffen dieselbe Naht: eine Zusicherung, die an einer MENGE hängt:**

14. **WER EINE MENGE ERWEITERT, SUCHT AUCH NACH DEM NEUEN WERT ALS GEGENBEISPIEL.**
    Eine Strukturprüfung findet, wer über die Menge ITERIERT; sie findet NICHT, wer
    ein künftiges Mitglied bereits als "unbekannt" VERWENDET. Das ist eine eigene
    Suchachse — nach dem WERT, nicht nach der Form.
    *Beleg:* Ein Bestandstest benutzte den künftigen Zielnamen als Platzhalter für
    einen unbekannten Wert und wurde rot, ohne dass sich an dem geändert hätte, was
    er schützt. Meine Durchsicht hatte nach Struktur gesucht und ihn übersehen.
    *Abdeckung:* TEILWEISE. Der PFLICHT-PRÜFSCHRITT an "ZWEI BEDIENELEMENTE MIT
    GLEICHEM NAMEN…" nennt ZWEI Achsen (eine Abfrage wird mehrdeutig; eine
    Abwesenheits-Behauptung kippt) — beide über TEXT IN DER OBERFLÄCHE. Dies wäre
    eine DRITTE: ein WERT in einer Fixture.
15. **DIE MEHRDEUTIGKEITS-REGEL GILT AUCH FÜR DATEN-ELEMENTE, nicht nur für
    Bedienelemente.** Ein neuer Eintrag in einer Liste erzeugt ein neues Element und
    kann bestehende Abfragen genauso mehrdeutig machen wie ein neuer Knopf.
    *Beleg:* Eine Testabfrage setzte implizit "genau eine unkonfigurierte Karte"
    voraus und fiel mit "Found multiple elements".
    *Abdeckung:* JA, DER SACHE NACH — aber der GELTUNGSBEREICH der bestehenden Regel
    ist zu eng formuliert. Sie spricht von Bedienelementen und Texten; hier war es
    ein Datensatz, der ein weiteres Element rendert. **Kein neuer Kandidat, sondern
    eine Erweiterung des Geltungsbereichs jener Regel.**
16. **EINE TEST-ZUSICHERUNG, DIE VON EINER MENGE ABHÄNGT, BRICHT BEIM NÄCHSTEN
    MITGLIED WIEDER. DIE REPARATUR ENTFERNT DIE ABHÄNGIGKEIT, SIE ZIEHT SIE NICHT
    NACH.**
    *Beleg:* Ein synthetischer Wert wird nie real; ein Karten-Anker ist von der
    Kartenzahl unabhängig. Beide Reparaturen halten beim VIERTEN Ziel — eine
    Zählung ("genau zwei unkonfigurierte") hätte bei drei Zielen gegriffen und beim
    vierten erneut gebrochen.
    *Abdeckung:* KEINE Regel sagt das. Kandidat 7 spricht vom Korrigieren einer
    MENGEN-AUSSAGE, dieser vom Korrigieren einer davon ABHÄNGIGEN Zusicherung — und
    er nennt das Kriterium, an dem eine Reparatur zu messen ist.
17. **EIN KOMMENTAR VOM NACHBAREINTRAG WIRD ÜBERNOMMEN, NICHT GEPRÜFT.**
    *Beleg:* Die Begründung der Consent-Schlüssel war seit der neunten Scheibe
    falsch und wurde beim dritten Ziel unverändert weitergereicht — die REGEL stimmte
    weiter, der BELEG nicht, und niemand hat ihn am Code nachgesehen, weil er beim
    Nachbarn schon dastand.
    *Abdeckung:* NEIN, ER GEHT NICHT IN DER BESTEHENDEN REGEL AUF — und die Prüfung
    ist der Ertrag: "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD"
    beschreibt das ALTERN einer Angabe und verlangt, sie vor Gebrauch am heutigen
    Code zu prüfen. Dieser hier beschreibt den ÜBERTRAGUNGSWEG, auf dem ein bereits
    falscher Beleg sich VERMEHRT. Altern und Verbreiten sind zwei verschiedene
    Vorgänge; die zweite Kopie ist ab dem ersten Tag falsch.

**AUS DER SCHEMA-ENTSCHEIDUNG ZUM PRIMÄRSCHLÜSSEL (2026-08-12), einer — und er ist der
einzige Kandidat dieser Datei, der ZWEI verschiedene Zielorte hat:**

18. **MEHRERE KENNUNGEN JE ZIEL BRECHEN EINEN SCHLÜSSEL (PROJEKT, ZIEL) NICHT —
    MEHRERE EMPFÄNGER DESSELBEN TYPS JE PROJEKT BRECHEN IHN.** Zwei Achsen, die beim
    Lesen wie eine aussehen: Die eine vervielfacht die KENNUNG, die andere die
    EMPFÄNGER-INSTANZ. Wer sie zusammenzieht, hält einen Schlüssel für gebrochen,
    sobald irgendein Ziel mehr als eine Kennung braucht — und baut ein Schema um, dem
    nichts fehlt.
    *Beleg (GEMESSEN am Repo, 2026-08-12):* Die Trennung steht bereits im Code, sie
    musste nicht erfunden werden — die KENNUNG liegt ziel-geschlüsselt im
    Einstellungs-Blob (`ProjectSettings.pixels` in `src/lib/settings.ts`), das
    ZUGANGSDATUM in der Geheimnis-Tabelle mit einer Zeile je Ziel
    (`primary key (project_id, target)` in
    `supabase/migrations/0021_project_secrets.sql`), und der Auflösungs-Pfad führt
    beide erst am Ende zusammen (`getCapiConfigByTrackingKey` in
    `src/lib/capi/token.ts`). **WAS DEM BELEG FEHLT UND WAS ER TROTZDEM TRÄGT:** Diese
    Trennung ist NICHT als Schema-Prinzip gebaut worden, sondern aus dem Unterschied
    öffentlich/geheim (der Kommentar an der Pixel-ID sagt es wörtlich). Sie belegt also,
    dass die zwei Achsen im Code bereits AUSEINANDERLIEGEN — nicht, dass jemand sie je
    unterschieden hätte. Genau das ist der Grund, warum es die Regel braucht.
    *Abdeckung:* **KEINE bestehende Regel deckt sie, auch nicht teilweise** (formal
    geprüft am 2026-08-12 durch Suche über "## Immer beachten" nach Primärschlüssel,
    additiver Spalte und client-besessenem Blob). **DREI STEHEN DANEBEN, jede auf einer
    anderen Achse, und alle drei würden bei einer Stichwortsuche gefunden:**
    "POSTGREST-QUERIES + ECHTE PRIMÄRSCHLÜSSEL" verlangt, den ECHTEN Schlüssel
    nachzusehen statt ihn aus einem Feldnamen zu raten — sie handelt vom LESEN eines
    bestehenden Schlüssels, nicht davon, ob er unter einer neuen Anforderung hält.
    "ANLEGEN UND BEFÜLLEN EINER ADDITIVEN SPALTE NICHT VERSCHMELZEN" handelt von der
    REIHENFOLGE zweier Scheiben, nicht von Kardinalität. "TRACKING-source =
    BEOBACHTUNGS-ORT, NIE ZIEL" ist die nächste Verwandte — sie verbietet, ZWEI
    Bedeutungen in EINE Spalte zu legen, und spricht damit ebenfalls von Dimensionen;
    ihr Gegenstand ist aber die SEMANTIK einer Spalte, hier ist es die KARDINALITÄT
    eines Schlüssels. Ebenso wenig decken die Blob-Regeln ("SERVER-EIGENE IDENTITÄT NIE
    IN EINEN CLIENT-BESESSENEN BLOB", "ABLEITEN STATT LÖSCHEN … AUS WELCHER QUELLE"):
    Sie sagen, WO ein Wert liegen darf und aus welcher Quelle abzuleiten ist — nicht,
    wie viele Zeilen es von ihm geben darf.
    *Herkunft und Volltext:* Abschnitt 7.4, **"DER PRIMÄRSCHLÜSSEL DER
    GEHEIMNIS-TABELLE BLEIBT — ENTSCHIEDEN (Owner, 2026-08-12)"** (Nummer UND Titel,
    damit der Zeiger eine Nachnummerierung übersteht).
    **DIESER KANDIDAT HAT ZWEI ZIELORTE, UND SIE DÜRFEN NICHT ZUSAMMENFALLEN — sonst
    wandert am Phasenende nur die Hälfte:**
    - **NACH "## Immer beachten": die ZWEI-ACHSEN-UNTERSCHEIDUNG selbst.** Sie ist eine
      Regel über SCHEMATA und überdauert diese Phase; sie gilt für jeden künftigen
      Schlüssel der Form (Projekt, Ziel), nicht nur für die Geheimnis-Tabelle.
    - **NACH "## Offene Punkte": die BEIDEN TRIGGER aus 7.4**, in der dortigen Bauform
      (Trigger plus was sonst still kaputtgeht) — (i) die Custom-Pixel-Vorfrage fällt
      zugunsten eines SERVER-Empfängers mit kundeneigenem Endpunkt, (ii) es zeigt
      sich, dass die KENNUNG NICHT IN DEN EINSTELLUNGS-BLOB GEHÖRT — gleichgültig aus
      welchem Grund; Beispiele, und ausdrücklich KEINE abschliessende Liste: je Kennung
      ein EIGENES Zugangsdatum · die Kennung SELBST ein Geheimnis · server-autoritativ
      vergeben.
      **DER TRIGGER NENNT DEN GEGENSTAND, NICHT DEN ANLASS, und darauf kommt es an:**
      Eine Fassung "je Kennung ein eigenes Zugangsdatum" fängt den zweiten Kipp-Weg
      nicht — eine geheime oder server-autoritativ vergebene Kennung braucht KEIN
      eigenes Zugangsdatum, gehört aber trotzdem nicht in den client-besessenen Blob;
      dann stünden mehrere Zeilen mit demselben Ziel im selben Projekt, und der
      Schlüssel bricht, ohne dass der Trigger anschlägt. **Ein Trigger, der den
      wahrscheinlichsten Kipp-Fall seiner eigenen Prämisse nicht fängt, schlägt nie
      an.** Dieser zweite Kipp-Weg ist HERGELEITET aus dem gemessenen Kommentar an der
      Pixel-ID (öffentlich/geheim, GEMESSEN 2026-08-12) — NICHT selbst gemessen. **Mit
      ihnen wandert die GRENZE:** Dass die LinkedIn-URN eine KENNUNG ist und kein
      ZUGANGSDATUM, ist **GELESEN** (fremde Anbieter-Dokumentation, Recherche vom
      2026-08-11) und **NICHT gemessen**; kippt diese Lesart, fallen beide Achsen
      zusammen und die Entscheidung ist NEU zu treffen. Eine Trigger-Liste ohne diese
      Grenze läse sich, als wäre die Entscheidung gemessen abgesichert.
    **WARUM DIESER KANDIDAT ÜBERHAUPT HIER STEHT, obwohl 7.4 seine Warnung selbst
    trägt:** Der Phasenende-Ablauf liest DIESEN Abschnitt. Ein Posten, der nur in
    Abschnitt 7 vor seinem eigenen Verlust warnt, hängt daran, dass jemand ihn zufällig
    liest; hier ist er ein Mechanismus. **Und er ist besonders verlustgefährdet:** Eine
    unterbliebene Arbeit hinterlässt keine Spur im Code — nur dieser Text sagt, dass ein
    naheliegender Schema-Umbau geprüft und bewusst NICHT gemacht wurde.

**AUS DEM C2-LIVE-LAUF (2026-08-13), einer:**

19. **EIN VERDACHT, DER EINEN FEHLERORT NENNT, BEVOR EINE MESSUNG IHN EINGEGRENZT HAT,
    KOSTET DIE HOPS, DIE ER ÜBERSPRINGT.** Bei einer Kette aus mehreren Übergängen wird
    nicht am vermuteten Ende begonnen, sondern **halbiert**: zwei Beobachtungen an
    Stellen, die je die halbe Kette entlasten, schlagen jede Begehung.
    *Beleg:* Eine Änderung an der einen A/B-Variante, ausgeliefert war die andere. Die
    Kette hatte FÜNF Hops; VIER waren durch ZWEI Beobachtungen entlastet — den
    Quelltext der ausgelieferten Seite und die Datenbank-Zeile über BEIDE
    Mapping-Spalten. Der Verdacht hatte zuvor Editor und Erzeuger benannt, ohne Messung.
    *Abdeckung:* **KEINE bestehende Regel sagt das.** Zwei stehen daneben, beide auf
    anderer Achse: „EINE BILLIGE MESSUNG WIRD NICHT DURCH EINE HERLEITUNG ERSETZT"
    verlangt zu messen, sagt aber nichts über die REIHENFOLGE der Messpunkte; die
    Live-Test-Lektion „EIN GROBES INSTRUMENT REISST DIE VORAUSSETZUNG MIT" handelt vom
    Instrument, nicht von der Suchstrategie.
    *Herkunft und Volltext:* Abschnitt 4, **„(f) VOR JEDER LIVE-KONTROLLE WIRD DER
    A/B-BETRIEB FESTGESTELLT"** (Nummer UND Titel, damit der Zeiger eine
    Umnummerierung übersteht). **DIE VORBEDINGUNG SELBST GEHÖRT NICHT HIERHER, SONDERN
    DORTHIN:** Sie muss HEUTE wirken, nicht erst am Phasenende. Dieser Kandidat trägt
    allein die verallgemeinerte Lehre.

---

## 7. Beschlossen und verortet — NICHT in dieser Phase gebaut

**WAS DIESER ABSCHNITT IST:** Vorhaben, die am 2026-08-12 aus einer Aufklärung
entstanden sind, ENTSCHIEDEN wurden und einen ORT bekommen haben — aber in Phase 11
NICHT gebaut werden. **HIER WIRD KEINE SCHEIBE ERÖFFNET.**

**DREI DINGE WERDEN AUSEINANDERGEHALTEN und stehen deshalb in drei eigenen Blöcken:**
ein BEFUND ist eine Messung am Code, eine ENTSCHEIDUNG ist ein Owner-Beschluss mit
Datum, eine VERORTUNG ist die Angabe, WO das Vorhaben ab jetzt steht. Wer sie
zusammenzieht, liest eine Messung als Zusage oder einen Ort als Termin.

**AM PHASENENDE:** Dieser Abschnitt wird gehoben wie der Rest der Datei. Er kann dabei
nichts verlieren — jedes Vorhaben trägt unten seinen ORT, und alle diese Orte liegen
AUSSERHALB dieser Datei (CLAUDE.md bzw. Abschnitt 5). Diese Datei ist ihre
BEGRÜNDUNG, nicht ihr TRÄGER.

---

### 7.1 DIE VIER BEFUNDE — RANG: GEMESSEN

**PROVENIENZ, einheitlich für alle vier:** Read-only-Aufklärung am 2026-08-12, am
CODE erhoben (Erzeuger, Ingest, die drei Consent-Dateien, die Verlustraten-RPC samt
ihrer TS-Spiegelung, die Kachel). **KEIN Live-Test, KEIN Aufruf gegen ein echtes
System.** Für den Schema-Teil gilt der Vorrang von `docs/db-stand.md`.

**BEFUND 1 — PAGESMITH LIEFERT KEINEN EINWILLIGUNGS-DIALOG.** Der Betreiber-Hook wird
an zwei Stellen GELESEN und nirgends GESETZT; er ist fremder Betreiber-Code. Das
Gate-Snippet dagegen wird bei JEDEM Publish ausgeliefert. **Es gibt keinen Schalter
zum Abschalten, weil es nichts abzuschalten gibt.**

**BEFUND 2 — OHNE GESETZTEN HOOK GELTEN ALLE ZIELE ALS ERLAUBT.** Der
Auslieferungs-Zustand einer publizierten Seite ist damit: alle konfigurierten Ziele
werden beliefert, ohne dass je jemand gefragt wurde.
**DAS IST IM CODE AUSDRÜCKLICH ALS ENTSCHEIDUNG BEGRÜNDET** ("nichts gesetzt → er hat
nie entschieden"), und die Fail-Closed-Regel gilt bewusst dem URTEIL, nicht dessen
ABWESENHEIT. **BEFUND 2 WIDERSPRICHT IHR ALSO NICHT** — wer ihn so liest, hält eine
gewollte Asymmetrie für ein Loch und "repariert" sie.
**FOLGE FÜRS PRODUKT, und sie ist der eigentliche Ertrag dieses Befundes:**
"DSGVO-konform out-of-the-box" trifft heute NICHT zu. Konform wird es erst, wenn der
Betreiber selbst ein CMP einbaut und den Hook bedient.

**BEFUND 3 — DIE ADBLOCKER-KACHEL MISST DIE BLOCKRATE GENAU EINES ANBIETERS**, nicht
die unseres eigenen Beacons. Die Bestätigung hängt am Laden des Anbieter-Scripts;
ohne dessen Kennung entsteht NIE eine Browser-Zeile, und die Kachel bleibt dauerhaft
im Neutral-Status. Der SICHTBARE Text nennt weder einen Anbieter noch eine
Einwilligung.
**WARUM DER EIGENE KANAL DORT STRUKTURELL UNSICHTBAR IST:** Würde unser eigener
Beacon geblockt, entstünde WEDER die Server- NOCH die Browser-Zeile — der Fall fällt
aus Zähler UND Nenner heraus.

**BEFUND 4 — SEIT PHASE 11 KANN DIE KACHEL EINEN VERLUST ANZEIGEN, DEN ES NICHT
GIBT.** Wird EIN Ziel abgelehnt und ein anderes erlaubt, geht der Beacon hinaus und
die Server-Zeile entsteht, die Browser-Bestätigung bleibt aus: **Nenner wächst,
Zähler nicht.** Die Zahl steigt, obwohl nichts geblockt wurde — sie liest sich als
Adblocker-Verlust und ist eine Einwilligungs-Entscheidung. **Im Ein-Ziel-Pfad war das
unmöglich**, dort unterblieb ohne Einwilligung der ganze Beacon.
**HEUTE FÄLLT ES NICHT AUF**, weil kein Projekt ein CMP hat und deshalb nie etwas
abgelehnt wird; **mit einem Einwilligungs-Dialog WIRD ES REAL.** Das ist die Naht
zwischen diesem Befund und dem Vorhaben aus 7.3 (a).
**DIE SAUBERE BEHEBUNG BRAUCHT ZU WISSEN, OB DAS BETREFFENDE ZIEL JE EREIGNIS
EINGEWILLIGT WAR.** Die events-Tabelle trägt keine Ziel-Spalte — genau die "eigene
additive Spalte", die die Roadmap für Ziele vorsieht. **Deshalb ist das eine
Analytics-Arbeit und keine Consent-Arbeit.**

---

### 7.2 DIE VIER OWNER-ENTSCHEIDUNGEN — RANG: ENTSCHIEDEN (alle 2026-08-12)

**E1 — DIE ARCHITEKTUR BLEIBT FÜR DEN LAUNCH, WIE SIE IST:** EIN Ziel als Hybrid aus
Browser-Tag und Server-Forward, die übrigen als reiner Server-Fan-Out.
*Begründung:* Der Hauptanwendungsfall der Zielgruppe ist damit von Tag eins
vollständig abgedeckt; das Momentum wird nicht für eine Verbreiterung unterbrochen,
die kein Kunde heute verlangt.

**E2 — KEINE BEVORMUNDUNG, ABER EIN HINWEIS.** Der Betreiber entscheidet
eigenverantwortlich über seinen Einwilligungs-Dialog. **Wir weisen hin, wir erzwingen
nicht.**

**E3 — EIN EIGENER EINWILLIGUNGS-DIALOG WIRD GEBAUT, UND EIN FREMDER BLEIBT
EINBINDBAR.** Beides über DENSELBEN Hook — er ist produzentenneutral, und der
Konsument steht seit der zweiten Scheibe dieser Phase.

**E4 — DER HYBRID-SCHALTER JE KANAL bleibt VISION** und wird NICHT vorgezogen.

---

### 7.3 DIE VERORTUNG — WO JEDES VORHABEN AB JETZT STEHT

**(a) DER EINWILLIGUNGS-DIALOG → CLAUDE.md, "## Roadmap & aktueller Stand", NEUE
ZEILE "Phase 11.5 — Einwilligungs-Dialog".** Marker `[ ]`, eingeordnet NACH Phase 11
und VOR einem Beta-Launch mit fremden Nutzern. Die Zeile trägt Marker, Titel und die
BINDUNGEN; das Detail bleibt hier.
**ZUR NUMMER, damit niemand eine stille Umnummerierung vermutet:** `11.5` ist
gewählt, weil sie FREI ist (Präzedenz 4.5, 10.5). Es wurde KEINE bestehende Nummer
verschoben.

**(b) DIE AUFSCHLÜSSELUNG DER NUR SERVER-SEITIG ERFASSTEN CONVERSIONS JE ZIEL →
CLAUDE.md, Phase-8-Zeile**, als FÜNFTER Posten der dort geführten
Weiterentwicklungen: **IDEE OHNE TERMIN UND OHNE ZUSAGE.**
*Zur Wortwahl:* "gerettet" ist an dieser Kachel verboten (CLAUDE.md, "## Immer
beachten", "WORTWAHL DASHBOARD") — deshalb "nur server-seitig erfasst".

**(c) DIE BEHEBUNG VON BEFUND 4 → CLAUDE.md, Phase-8-Zeile**, als SECHSTER Posten, in
derselben Bauform: **IDEE OHNE TERMIN UND OHNE ZUSAGE.**
**WARUM DORT UND NICHT IN 11.5:** (b) und (c) brauchen DIESELBE fehlende Dimension
(die Ziel-Spalte auf den Ereignissen). Sie hängen an der Analytics-Familie, nicht am
Dialog — der Dialog macht Befund 4 nur SICHTBAR, er verursacht ihn nicht.
**DIE CHECKBOX DER PHASE 8 GEHT DADURCH NICHT WIEDER AUF.** Der Satz dort gilt für
beide wörtlich mit.

**(d) DIE KACHEL-BESCHRIFTUNG → GEBAUT, Abschnitt 3.1 (Commit `9ad3080`).** Sie stand
hier am 2026-08-12 als Vorrats-Punkt und war am selben Tag erledigt: Text und Test,
keine Architektur. **Sie bleibt trotzdem als eigener Eintrag stehen, statt aus der
Verortung zu verschwinden** — sonst sähe die Liste so aus, als sei sie nie beschlossen
worden, und der Unterschied zu (c) ginge mit ihr verloren: **(d) war eine
Beschriftung, die zu viel behauptet, (c) ist ein DEFEKT.** Die beiden dürfen auch im
Rückblick nicht zusammenfallen.

**(e) DIE BETREIBER-DOKUMENTATION → Abschnitt 5 dieser Datei (Vorrat).** Zwei Punkte:
der fehlende Einwilligungs-Dialog samt seiner Folge, und die GRENZE DER
DEDUPLIZIERUNG in der belastbaren, NICHT-absoluten Fassung.

**(f) DER HYBRID-SCHALTER JE KANAL → KEIN ORT, und das ist die Aussage.** Er bleibt
VISION (E4). Er bekommt bewusst KEINE Roadmap-Zeile, weil eine Zeile ihn zu einem
Posten machte, der abgearbeitet werden will.

---

### 7.4 DER PRIMÄRSCHLÜSSEL DER GEHEIMNIS-TABELLE BLEIBT — ENTSCHIEDEN (Owner, 2026-08-12)

**WARUM DIESER POSTEN EIN EIGENER UNTERABSCHNITT IST UND NICHT IN 7.1/7.2/7.3 STEHT —
der Grund gehört dazu, sonst sieht die Ablage nach Willkür aus:** 7.1 und 7.2 tragen
ihre Anzahl in der Überschrift ("DIE VIER BEFUNDE", "DIE VIER OWNER-ENTSCHEIDUNGEN"),
und beide Zahlen sind als Aussage über jene Erhebung richtig — ein fünfter Eintrag dort
machte sie falsch. 7.3 wiederum setzt voraus, dass jedes Vorhaben einen ORT AUSSERHALB
dieser Datei trägt; **dieser Posten hat keinen, weil er eine Entscheidung GEGEN einen
Umbau ist.** Er steht deshalb geschlossen hier, mit Befund, Entscheidung, Grenze und
Trigger in einem Block. **Die Drei-Block-Trennung von 7.1 bis 7.3 bleibt davon
unberührt.**

**FOLGE FÜRS PHASENENDE, und sie ist der Preis dieser Ablage:** Der Einleitungssatz von
Abschnitt 7 ("Er kann dabei nichts verlieren — jedes Vorhaben trägt unten seinen ORT")
gilt für 7.3. **Für 7.4 gilt er NICHT.** Wird dieser Posten am Phasenende nicht
ausdrücklich gehoben, geht er mit dieser Datei verloren — und mit ihm die Begründung,
warum ein naheliegender Schema-Umbau bewusst UNTERBLIEBEN ist. Eine unterbliebene
Arbeit hinterlässt keine Spur im Code; nur dieser Text sagt, dass sie geprüft wurde.

**DIE ENTSCHEIDUNG:** Der Primärschlüssel `(project_id, target)` auf `project_secrets`
BLEIBT. **Kein Umbau in dieser Phase.**

**DER BEFUND, DER SIE TRÄGT — ES SIND ZWEI ACHSEN, NICHT EINE.** Das ist der ganze
Ertrag dieser Runde: Wer sie zusammenzieht, hält den Primärschlüssel für gebrochen,
sobald irgendein Ziel mehr als eine Kennung braucht.

- **DIE KENNUNGS-ACHSE: mehrere Kennungen je Ziel, aber genau EIN Zugangsdatum je
  Ziel.** Der Fall ist LinkedIn — eine Conversion-Regel-URN JE EREIGNISTYP. **Sie
  berührt den Primärschlüssel NICHT:** Was sich vervielfacht, ist die KENNUNG, und die
  liegt gar nicht in der Geheimnis-Tabelle.
- **DIE INSTANZ-ACHSE: mehrere Empfänger DESSELBEN Typs je Projekt, jeder mit eigenem
  Endpunkt UND eigenem Geheimnis.** Der Fall ist Custom-Pixel in seiner
  Server-Empfänger-Lesart. **NUR SIE BRICHT IHN** — erst hier gibt es zwei Zeilen mit
  demselben `target` im selben Projekt.

**DIE TRENNUNG EXISTIERT BEREITS IM CODE, sie muss nicht erfunden werden** — GEMESSEN
am Repo (2026-08-12), Symbolnamen statt Zeilennummern:

- Die KENNUNG liegt im Einstellungs-Blob, ziel-geschlüsselt: `ProjectSettings.pixels`
  (`src/lib/settings.ts`) als `Partial<Record<TrackingTarget, { pixelId }>>`.
- Das ZUGANGSDATUM liegt in der Geheimnis-Tabelle, eine Zeile je Ziel:
  `primary key (project_id, target)` in `supabase/migrations/0021_project_secrets.sql`.
- Der Auflösungs-Pfad hält beide getrennt und führt sie erst am Ende zusammen
  (`getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`): die Kennungen je Ziel kommen
  aus dem Blob (`withPixel`), die Geheimnisse in EINER Runde aus der Tabelle, und die
  PAARUNG je Ziel nimmt nur auf, wer BEIDES trägt.

**DIE BEGRÜNDUNG, DREI STRÄNGE:**

1. **FÜR DIE INSTANZ-ACHSE EXISTIERT GENAU EIN KONSUMENT, UND DESSEN VORFRAGE IST
   UNGEKLÄRT.** Custom-Pixel ist in seiner ersten Lesart ein CLIENT-seitiges Snippet —
   dann ist es gar kein Fan-Out-Ziel, und **die Achse entfällt vollständig** (Abschnitt
   2, Posten 5). Ein Umbau heute entschiede eine Frage, die niemand gestellt hat.
2. **DIE PROJEKT-PRÄZEDENZ:** Abstraktion erst beim dritten Fall, davor ein BENANNTES
   Duplikat. Hier gibt es nicht einmal den zweiten Fall — es gibt einen möglichen.
3. **KEINE SCHEMA-ERWEITERUNG OHNE REALEN KONSUMENTEN UND SPEC.**

**DIE GRENZE — SIE STEHT HIER UND NICHT IN EINER FUSSNOTE, WEIL SIE DIE ENTSCHEIDUNG
TRÄGT:** Dass die LinkedIn-URN eine KENNUNG ist und kein ZUGANGSDATUM, ist **GELESEN**
(Anbieter-Recherche des Architekten vom 2026-08-11 an FREMDER DOKUMENTATION; die
Befunde stehen in Abschnitt 2, Posten 1) — **NICHT gemessen, NICHT live bestätigt, kein
Aufruf gegen ein echtes System.** **KIPPT DIESE LESART, FALLEN BEIDE ACHSEN ZUSAMMEN**,
und die Entscheidung ist NEU zu treffen — nicht nachzujustieren.

**DIE TRIGGER — GENAU ZWEI, JE EINZELN HINREICHEND, und ausdrücklich NICHT "falls es je
nötig wird":**

- **(i)** Die Custom-Pixel-Vorfrage fällt zugunsten eines SERVER-Empfängers mit
  kundeneigenem Endpunkt.
- **(ii)** Es zeigt sich, dass die KENNUNG NICHT IN DEN EINSTELLUNGS-BLOB GEHÖRT —
  gleichgültig, aus welchem Grund. Beispiele, und ausdrücklich KEINE abschliessende
  Liste: je Kennung ist ein EIGENES Zugangsdatum nötig · die Kennung ist SELBST ein
  Geheimnis · sie wird SERVER-AUTORITATIV vergeben.

**WARUM (ii) DEN GEGENSTAND NENNT UND NICHT DEN ANLASS — und warum die engere Fassung
("eine Messung zeigt, dass je Kennung ein EIGENES Zugangsdatum nötig ist") ersetzt werden
musste:** Der Beleg dieser Entscheidung ruht auf dem Unterschied ÖFFENTLICH/GEHEIM. Genau
daraus folgt ein ZWEITER Kipp-Weg, den die engere Fassung nicht fängt: **Ist die Kennung
SELBST ein Geheimnis oder wird sie SERVER-AUTORITATIV vergeben, braucht sie KEIN eigenes
Zugangsdatum** — sie gehört aber trotzdem nicht in den client-besessenen Blob. Dann
stünden mehrere Zeilen mit demselben Ziel im selben Projekt, **und der Primärschlüssel
bricht, OHNE dass der Trigger anschlägt.** **EIN TRIGGER, DER DEN WAHRSCHEINLICHSTEN
KIPP-FALL SEINER EIGENEN PRÄMISSE NICHT FÄNGT, SCHLÄGT NIE AN** — die Entscheidung wirkte
dann abgesichert, ohne es zu sein.
**PROVENIENZ DIESER AUFWEITUNG:** Der zweite Kipp-Weg ist **HERGELEITET** aus dem
gemessenen Kommentar an der Pixel-ID (öffentlich, kein Secret, Geheimnis liegt in der
Geheimnis-Tabelle — GEMESSEN am Repo, 2026-08-12). **Der Kipp-Weg selbst ist NICHT
gemessen**: gemessen ist die Trennung, abgeleitet ist, woran sie brechen kann.

**UNBERÜHRT, und das gehört dazu, sonst sucht es jemand an der falschen Stelle:** Die
Einwilligung fällt **JE ZIEL, nie je Ereignis** (`CONSENT_KEY_BY_TARGET` in
`src/lib/tracking/consent-targets.ts`, ausgewertet in `allowedTargets`,
`src/lib/capi/ingest.ts` — GEMESSEN am Repo, 2026-08-12). **Diese Achse berührt den
Draht nicht.**

**AUSDRÜCKLICH NICHT ENTSCHIEDEN:** Was "konfiguriert" heisst, wenn die Kennung JE
EREIGNISTYP gilt. Das bleibt OFFEN und ist der nächste Schritt derselben Runde — nicht
eine Folge dieser Entscheidung.
**NACHTRAG (2026-08-12): DIESER SCHRITT IST GETAN.** Die Antwort steht in 7.5; sie
beantwortet die Frage nicht durch eine Definition, sondern durch einen benannten
Zustand mit drei Teilen — und die Vollständigkeits-Achse, um die es hier ging, wird
ausdrücklich NICHT gebaut.

---

### 7.5 "KONFIGURIERT" WIRD EIN BENANNTER ZUSTAND — ENTSCHIEDEN (Owner, 2026-08-12)

**WARUM EIN EIGENER UNTERABSCHNITT, wie schon bei 7.4:** 7.1 und 7.2 tragen ihre Anzahl
in der Überschrift ("DIE VIER BEFUNDE", "DIE VIER OWNER-ENTSCHEIDUNGEN") — beide Zahlen
sind als Aussage über jene Erhebung richtig und dürfen nicht durch einen Nachtrag falsch
werden. 7.3 setzt einen ORT AUSSERHALB dieser Datei voraus, und den hat dieser Posten
heute NICHT: CLAUDE.md bekommt seine Zeile erst, wenn gebaut ist. **Die
Drei-Block-Trennung von 7.1 bis 7.3 bleibt unberührt**; dieser Posten trägt Befund,
Entscheidung, Auflage und Nicht-Gebautes geschlossen in sich.
**FOLGE FÜRS PHASENENDE, gleich wie bei 7.4:** Ohne ausdrückliche Hebung geht dieser
Posten mit dieser Datei verloren — samt der Begründung, warum vier Scheiben und nicht
eine.

---

**DER BEFUND — SECHS STELLEN, VIER BEDINGUNGEN.** GEMESSEN am Repo (2026-08-12),
Symbolnamen statt Zeilennummern. Sechs Stellen beantworten heute die Frage "ist dieses
Ziel konfiguriert bzw. lieferfähig", und sie prüfen dabei VIER verschiedene Dinge:

1. **`listConfiguredTargets`** (`src/app/projects/actions.ts`) — Bedingung: es existiert
   eine Zeile in der Geheimnis-Tabelle mit diesem Ziel; unbekannte Werte fallen durch die
   Ziel-Prüfung, jeder Fehlerzustand liefert eine LEERE Liste. **Die Kennung geht NICHT
   ein.** → **ANZEIGE** (speist den Statustext der Karte).
2. **`getCapiConfigByTrackingKey`** (`src/lib/capi/token.ts`), dort die PAARUNG —
   Bedingung: die Kennung des Ziels ist nicht leer **UND** es existiert ein nicht-leeres
   Geheimnis. Nur wer BEIDES trägt, wird Empfänger. → **WIRKUNG.**
3. **Das Consent-Memo `consentTargets`** (`src/components/CodeImporter.tsx`) —
   Bedingung: die Kennung des Ziels ist nicht leer, abgebildet über
   `CONSENT_KEY_BY_TARGET`. **Das Zugangsdatum geht NICHT ein.** → **WIRKUNG**, und die
   folgenreichste: Es entscheidet, welche Einwilligungs-Schlüssel in den AUSGELIEFERTEN
   Text gebacken werden.
4. **`dispatchForward`** (`src/lib/capi/ingest.ts`) — Bedingung: das Ziel trifft einen
   der drei Adapter-Zweige; jedes andere fällt still auf den Erschöpfungs-Rest. →
   **WIRKUNG.**
5. **`TARGET_CARDS[...].hasAdapter`** (`src/components/TargetCard.tsx`) — Bedingung: ein
   statisches Datenfeld je Ziel; heute tragen alle drei `true`, der Zweig ist damit
   unerreicht. → **ANZEIGE.**
6. **Das Meta-Kennungs-Gate im Erzeuger** (`getPixelId` für Meta, gereicht an
   `generateFunctional` in `src/components/CodeImporter.tsx`) — Bedingung: Metas Kennung
   ist nicht leer; sonst kein Meta-Snippet und die Track-Aktion ist ein no-op. →
   **WIRKUNG**, aber nur für EIN Ziel.

**DIE VIER BEDINGUNGEN, damit die Liste nicht als sechsfache Wiederholung gelesen wird:**
Geheimnis vorhanden (1) · Kennung vorhanden (3, 6) · Kennung UND Geheimnis (2) · Adapter
vorhanden (4, 5).

**ZWEI ABGRENZUNGEN GEHÖREN ZWINGEND DAZU:**

- **`allowedTargets`** (`src/lib/capi/ingest.ts`) **STEHT DANEBEN UND WIRD NICHT
  MITGEZÄHLT.** Sie beantwortet eine ANDERE Frage: die EINWILLIGUNG je Ziel, nicht die
  Konfiguration. Wer sie in die Liste zieht, vereinheitlicht zwei Fragen zu einer — und
  das wäre genau der Fehler, gegen den dieser Posten steht.
- **DAS META-KENNUNGS-GATE (6) BLEIBT AUSSERHALB DER VEREINHEITLICHUNG.** Es entscheidet
  über die BROWSER-LAUFZEIT, nicht über den Server-Forward. Dass es bei den anderen
  Zielen kein Gegenstück hat, ist kein Versäumnis, sondern die HYBRID-FRAGE — und die ist
  als E4/E1 (7.2) ausdrücklich VISION und nicht vorgezogen. Es steht in der Liste, weil
  es die Frage faktisch beantwortet; es steht NICHT im Umbau, weil es sie für eine andere
  Achse beantwortet.

---

**DIE ENTSCHEIDUNG:** "Konfiguriert" wird ein **BENANNTER ZUSTAND**, kein Wahrheitswert.

**DIE BAUFORM HAT ZWEI PRÄZEDENZFÄLLE IM REPO, beide bewährt:** die Union des
Serve-Resolvers (`ServeResult` in `src/lib/hosting/resolve.ts`, GEMESSEN 2026-08-12: drei
Zweige `ok`/`blocked`/`notfound`) und das geteilte Auslieferbarkeits-Prädikat aus Phase 9
(`deliverableVariantB`/`nonEmptyHtml` in `src/lib/hosting/variant.ts`, gelesen von Serve-
und Publish-Pfad UND von der Oberfläche). **Der Zustand wird also nicht erfunden, sondern
nach vorhandenem Muster gebaut.**

**DREI TEILE, UND JEDER HAT HEUTE EINEN REALEN KONSUMENTEN** — das ist der Grund, warum
es genau diese drei sind und keine vierten: **Kennung vorhanden** (Konsumenten 3 und 6) ·
**Zugangsdatum vorhanden** (Konsument 1) · **Adapter vorhanden** (Konsumenten 4 und 5).
Der Zustand aus allen dreien ist, was Konsument 2 heute schon verlangt.

**VIER SCHEIBEN, IN DIESER REIHENFOLGE:**

- **A — DER ZUSTAND ENTSTEHT, OHNE EINEN EINZIGEN KONSUMENTEN.** In einer reinen Datei,
  mit Charakterisierungen, rein additiv: nichts ändert sich. *Begründung:* dieselbe wie
  bei "ANLEGEN UND BEFÜLLEN EINER ADDITIVEN SPALTE NICHT VERSCHMELZEN" (CLAUDE.md, "##
  Immer beachten") — die Logik lässt sich isoliert bauen und festnageln, BEVOR sie einen
  laufenden Pfad berührt.
- **B — DIE OBERFLÄCHEN-ABLEITUNG UND DIE PAARUNG GEHEN ÜBER** (Konsumenten 1 und 2).
  **DAS IST DIE SCHEIBE, DIE DEN BESTANDS-DEFEKT BEHEBT:** Ein Ziel mit hinterlegten
  Zugangsdaten, aber ohne Kennung steht heute als konfiguriert da und wird nie beliefert
  — ohne Meldung, auf keinem Kanal sichtbar (verzeichnet in Abschnitt 5,
  "'KONFIGURIERT' HEISST AN ZWEI ORTEN VERSCHIEDENES").
  **GEMESSEN (2026-08-12): DAFÜR IST KEINE NEUE ABFRAGE NÖTIG.** Die Karte bekommt die
  Kennung bereits als Eigenschaft und den Geheimnis-Zustand aus der Ableitung; **beide
  Hälften liegen dort nebeneinander und werden heute nur nicht zusammen befragt.**
- **C — DIE ADAPTER-ACHSE** (Konsumenten 4 und 5). *Begründung für die Trennung von B:*
  Sie berührt den INGEST-Pfad, B nicht.
- **D — DAS CONSENT-MEMO, ALLEIN UND ZULETZT** (Konsument 3), und **NUR mit einem
  BYTE-GLEICHHEITS-NACHWEIS auf dem erzeugten Text**. *Begründung:* Es ist die einzige
  Stelle, deren Fehler JEDE Kundenseite gleichzeitig trifft und die **kein Code-Deploy
  repariert** — der ausgelieferte Text ist bereits beim Kunden.

**WARUM VIER UND NICHT EINE:** Eine Änderung, die mehrere Achsen gleichzeitig bewegt, ist
kein Umbau-Schritt, sondern ein Umbau — hinterher sagt kein Test, welche Achse gedeckt
ist. Die Denkfigur steht als Mutations-Lektion (h) unter "## Immer beachten".

---

**DIE INVARIANTE — SIE GILT IN JEDER DER VIER SCHEIBEN, ALS AUFLAGE AN DEN ENTWURF:**

> **DER EINWILLIGUNGS-SCHLÜSSEL HÄNGT AN DER BLOSSEN ANWESENHEIT EINER KENNUNG, NIEMALS
> AN VOLLSTÄNDIGKEIT.** Kein Entwurf darf den Schlüssel eines Ziels von einem
> zusammengesetzten Zustand abhängig machen — die Bedingung für den Draht bleibt genau
> das eine Merkmal, das sie heute ist.

**DIE BEGRÜNDUNG MUSS MIT, sonst wird die Auflage beim ersten Vereinheitlichungs-Reflex
gebrochen:** Der Draht ist eine EINBAHNSTRASSE (ein publizierter Text trägt ihn, ein
Code-Deploy erreicht ihn nicht), und ein fehlender Schlüssel heisst fail-closed "nicht
erlaubt". **Verlöre ein Ziel seinen Schlüssel, weil es als "unvollständig" gilt, entstünde
aus einer TEILkonfiguration lautlos GAR KEINE Auslieferung** — auch für die Ereignisse,
deren Kennung sehr wohl hinterlegt ist. Der Schaden wäre auf keinem Kanal sichtbar und
durch ein Deploy nicht heilbar.

---

**WAS NICHT GEBAUT WIRD — DIE VOLLSTÄNDIGKEITS-ACHSE** ("Kennungen für ALLE Ereignisse
vorhanden"). *Grund:* **kein realer Konsument** — kein Ziel trägt heute eine Kennung je
Ereignistyp. **Dieselbe Linie wie die Primärschlüssel-Entscheidung in 7.4:** keine
Erweiterung ohne Konsumenten.

**TRIGGER, präzise und ausdrücklich NICHT "falls es je nötig wird":** sobald ein Ziel eine
Kennung JE EREIGNISTYP trägt.

**WAS DANN SOFORT GILT — festgehalten, damit es nicht neu erhoben werden muss** (GEMESSEN
am Repo, 2026-08-12):

- **DER NENNER IST DIE VEREINIGUNG DER TRACK-EREIGNISSE AUS BEIDEN VARIANTEN-MAPPINGS.**
  A und B laufen nachweislich auseinander: Der Umschalter tauscht die Wurzeln, eine
  Änderung schreibt in die aktive, und der Speicherpfad je Variante berührt die Spalten
  der anderen NICHT. **Nichts gleicht sie danach an, und KEINE Stelle im Produktivcode
  bildet ihre Vereinigung.** Ein Nenner, der nur A kennt, meldet vollständig, während
  beim halben Traffic nichts ankommt.
- **ES BRAUCHT DAFÜR KEINE ZUSÄTZLICHE DATENBANK-RUNDE.** Beide Mengen reisen bereits in
  derselben Projekt-Ladeantwort und liegen im Container — zwei Ebenen von der Karte
  entfernt.
- **"UNVOLLSTÄNDIG" IST AUS DER KONFIGURATION ZU RECHNEN, NIE AUS LAUFZEITDATEN.** Ein
  nicht beliefertes Ziel hinterlässt heute in KEINEM persistierten Datensatz eine Spur —
  wer die Antwort aus den Ereignissen ableiten wollte, leitete sie aus dem Nichts ab.
  Verwandt und getrennt zu halten: der verworfene Fan-Out-Rückgabewert und die fehlende
  Ziel-Dimension (Abschnitt 5 bzw. BEFUND 4 in 7.1).

---

**DIE VIER SCHEIBEN SIND GEBAUT — 7.5 IST ABGESCHLOSSEN (2026-08-13).** Je Scheibe der
Vermerk mit **Nummer UND Titel**, damit der Zeiger eine Nachnummerierung übersteht:

- **A** → **3.5, „DER BENANNTE ZUSTAND ENTSTEHT — SCHEIBE A DER VEREINHEITLICHUNG"**
  (`81b544f`).
- **B** → in ZWEI Scheiben zerlegt, wie es der Bau ergab: **3.6, „DIE PAARUNG BENUTZT DIE
  GETEILTEN PRÄDIKATE — SCHEIBE B1 DER VEREINHEITLICHUNG"** (`6ef7d2f`) und **3.7, „DIE
  KARTE SAGT, DASS EIN ZIEL NICHT BELIEFERT WIRD — SCHEIBE B2"** (`70cc265`).
- **C** → ebenfalls zweigeteilt: **3.8, „DER WÄCHTER ÜBER DIE ADAPTER-ACHSE — SCHEIBE C1"**
  (`ca321c3`) und **3.9, „DIE ADAPTER-TATSACHE BEKOMMT EINE QUELLE — SCHEIBE C2"**
  (`724edd3`).
- **D** → ebenso: **3.10, „DER WÄCHTER ÜBER DAS CONSENT-MEMO — SCHEIBE D1"** (`6e1be7a`)
  und **3.11, „DAS CONSENT-MEMO BEZIEHT SEINE BEDINGUNG AUS DEM GETEILTEN PRÄDIKAT —
  SCHEIBE D2"** (`c0bfd50`).

**DASS AUS VIER SCHEIBEN SIEBEN VERMERKE WURDEN, IST KEINE ABWEICHUNG VOM PLAN, SONDERN
SEINE ANWENDUNG:** Dieselbe Begründung, die oben „VIER UND NICHT EINE" trägt, hat B, C
und D im Bau je noch einmal geteilt — Wächter zuerst, Übernahme danach, damit hinterher
sagbar bleibt, welche Achse gedeckt ist.

**INVARIANTE (6) IST ERFÜLLT** (GEMESSEN am Repo, 2026-08-13, formale Suche über `src/`):
Alle Konsumenten beziehen ihre Bedingungen aus DENSELBEN Funktionen. `hasPixelId` hat
DREI Aufrufstellen — die Auslieferungs-Zeile der Karte (`TargetCard` in
`src/components/TargetCard.tsx`), der Kennungs-Filter im Auflösungs-Pfad
(`getCapiConfigByTrackingKey` in `src/lib/capi/token.ts`) und das Consent-Memo
(`consentTargets` in `src/components/CodeImporter.tsx`); `hasSecret` EINE, die
Geheimnis-Schleife in derselben Auflösungs-Funktion; die Adapter-Tatsache kommt aus der
einen Liste `TARGETS_WITH_ADAPTER` (`src/lib/tracking/target-adapters.ts`).
**`listConfiguredTargets` IST AUSDRÜCKLICH KEINE DIESER STELLEN** — sie ruft `hasPixelId`
NICHT und sieht die Kennung gar nicht an; sie liefert der Karte nur den
Geheimnis-Zustand, und die Karte legt die Kennung daneben. Wer dort eine Aufrufstelle
sucht, sucht am falschen Ort — und genau darauf beruht die Hälfte, die unten als offen
vermerkt ist.

**WAS DABEI NICHT ÜBERDEHNT WERDEN DARF, und dieser Satz MUSS mit:** Behoben ist der
BESTANDS-DEFEKT (B2 — ein Ziel mit Zugangsdaten und ohne Kennung sagt jetzt selbst, dass
an es nichts gesendet wird), und aufgelöst sind die ZWEI DOPPELUNGEN (C2 für die
Adapter-Tatsache, D2 für den Leere-Vergleich des Memos). **DIE VOLLSTÄNDIGKEITS-ACHSE IST
UNVERÄNDERT NICHT GEBAUT, und ihr TRIGGER oben steht unverändert.** „7.5 abgeschlossen"
heisst **NICHT**, dass eine Kennung JE EREIGNISTYP damit möglich wäre — für die gilt
weiterhin, was drei Absätze höher steht, samt dem Nenner aus beiden Varianten-Mappings.

**EINE HÄLFTE DES URSPRÜNGLICHEN BEFUNDES BLEIBT ZUDEM OFFEN, und sie ist im Vorrat
verzeichnet:** Geteilt sind die BEDINGUNGEN, nicht das URTEIL — `listConfiguredTargets`
fragt weiterhin nur nach der Existenz einer Geheimnis-Zeile, der Forward nach Kennung UND
Zugangsdatum. S. Abschnitt 5, „'KONFIGURIERT' HEISST AN ZWEI ORTEN VERSCHIEDENES".
