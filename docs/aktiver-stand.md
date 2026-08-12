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
`0291448` -> `91dbfe7` -> `86e6911` -> `9ad3080`. Sie wächst mit jeder Scheibe, und
ihr LETZTES GLIED ist der jüngste COMMITTETE Vermerk.
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

**Commit:** steht bei Abfassung dieses Vermerks noch aus (Stufe 2 ist abgeschlossen,
die Freigabe nicht erteilt). **Wer ihn nachträgt, trägt die Nummer hier ein.**

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
- **"KONFIGURIERT" HEISST AN ZWEI ORTEN VERSCHIEDENES** (`listConfiguredTargets` in
  `src/app/projects/actions.ts` gegen die Paarung in `getCapiConfigByTrackingKey`,
  `src/lib/capi/token.ts`): GEMESSEN am Repo (2026-08-12) — die Oberfläche leitet
  "konfiguriert" ALLEIN aus der Anwesenheit einer Zeile in der Geheimnis-Tabelle ab; der
  Forward nimmt nur auf, wer Zugangsdaten UND eine gesetzte Kennung trägt. **Was still
  kaputtgeht:** Ein Ziel mit hinterlegten Zugangsdaten, aber ohne Kennung steht in der
  Karte als "Zugangsdaten hinterlegt" und wird nie beliefert — ohne Meldung, ohne
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
