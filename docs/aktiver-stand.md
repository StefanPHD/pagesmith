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

**STAND 2026-08-11:** Die Scheibe „Log-Leak am Meta-Adapter" ist ERLEDIGT und live
bestätigt (Abschnitt 3). Der offene Umfang darunter ist davon UNBERÜHRT — jene
Scheibe war eine Härtung am ERSTEN Adapter und kein Posten dieser Liste. Keine
Neubewertung, nur der Stand.

**DIE STRUKTUR IST ERLEDIGT, DIE WIEDERHOLUNGEN SIND OFFEN.** Was gebaut, geprüft
und live bewiesen ist, steht in CLAUDE.md an der Phase-11-Zeile; die volle
Herleitung in `docs/claude-history/phase-11-multi-tracking.md`, dort besonders
"## Der Einstieg für die nächste Sitzung" und "## Die zwölf Scheiben". Beides
wird hier NICHT wiederholt.

**DER OFFENE UMFANG, vier Posten mit VERSCHIEDENEM Rang:**

1. **DREI ADAPTER-ZIELE — TikTok, Google, LinkedIn.** Echte Wiederholungen
   desselben Handgriffs: Adapter, Eintrag in der Zuordnung, Zielwert im CHECK,
   Live-Test. Kein neues Fundament. Die Auflage "ein drittes Ziel erzwingt eine
   Entscheidung, keine Kopie" steht im Einstiegs-Block der Historien-Datei; die
   Auflage, dass jedes weitere Ziel seine EIGENE Constraint-Erweiterung mitbringt,
   steht in `docs/db-stand.md`, "## Aktueller DB-/Analytics-Stand (Ist-Zustand,
   kein Konzept)", beim CHECK `project_secrets_target_valid` — dort wird sie
   gepflegt, im Einstiegs-Block wird sie nur berichtet. Beide gelten unverändert.
2. **DAS TRACKING-TESTMODUS-MODUL** (`test_event_code`). Klein, eigenständig;
   Kontext in `docs/claude-history/future-roadmap.md`, "Tracking-Testmodus für
   Kunden".
3. **DER TESTKNOPF — KEINE SCHEIBE.** Mehrere einzeln beweisbare Teile plus eine
   unentschiedene VORFRAGE (was überhaupt aufgerufen wird). Ohne deren Antwort hat
   kein Zuschnitt einen Gegenstand. Auflagen, Messbefunde und Begründung:
   `docs/claude-history/phase-11-multi-tracking.md`, "## Die dreizehnte Scheibe —
   Der Testknopf (VERSCHOBEN, Owner 2026-08-10)".
4. **CUSTOM-PIXEL — KEINE WIEDERHOLUNG, SONDERN EINE EIGENE ARCHITEKTUR-SCHEIBE.**
   Ungeklärt ist ZUERST, was es überhaupt ist: ein CLIENT-seitiges Snippet (dann
   gar kein Fan-Out-Ziel) oder ein SERVER-seitiger Empfänger mit kundeneigenem
   Endpunkt (dann hängen Fragen daran, die kein anderes Ziel stellt). Der Zuschnitt
   entsteht NACH dieser Klärung. Ausformuliert an der Phase-11-Zeile in CLAUDE.md.

**VERMERK ZUR DIVERGENZ — er gehört zwingend hierher.** Der Einstiegs-Block in
`docs/claude-history/phase-11-multi-tracking.md` führt Custom-Pixel weiterhin
zusammen mit den drei Zielen als Wiederholung. **Das ist ÜBERHOLT.** Der Block
wird trotzdem NICHT korrigiert: Er liegt in einer Historien-Datei, und Historie
wird hier nicht nachträglich umgeschrieben — sie ist ein Bericht vom 2026-08-10
und als solcher richtig. **Ab heute steuert DIESE Datei.** Wer beide liest, folgt
dieser hier; die deckungsgleiche Fassung steht ausserdem an der Phase-11-Zeile in
CLAUDE.md.

---

## 3. Die ABGESCHLOSSENE Scheibe: der Log-Leak am Meta-Adapter

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

**ZU ABSCHNITT 5:** Der describe-Name ist im Bau-Commit nachgezogen; der Satz in
CLAUDE.md wird mit dem unmittelbar folgenden Commit richtiggestellt, beide Achsen
zusammen.

**AUSDRÜCKLICH NICHT IN DIESER SCHEIBE — unverändert offen:** die Kodierung der
Kennung im Endpunkt-Pfad, die Wurffreiheit des Nutzlast-Baus, die dritte
Trimm-Kopie (alle drei im Vorrat, Abschnitt 6), der Testknopf und weitere Ziele
(beide in Abschnitt 2).

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
geändert hat. Als Vorrat geführt in Abschnitt 6.

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

## 5. Was beim Abschluss dieser Scheibe mitzuziehen ist

**ZWEI BELEGE SIND FALSCH. Sie werden im Abschluss-Vermerk richtiggestellt — in
EINEM Zug mit dem Bau, wenn sie dadurch wahr werden; nicht vorher, nicht in einer
eigenen Runde.** (Die Regel dahinter: eine Regel kann gültig bleiben, während ihr
Beleg falsch wird — CLAUDE.md, "## Immer beachten".)

- **CLAUDE.md, "## Immer beachten", Eintrag "CAPI-TOKEN UND PIXEL-/DATASET-ID SIND
  EIN PAAR":** Der Schlusssatz dieses Eintrags nennt das Ops-Logging **"sanitized"**
  und verortet es in der **Ingest-Datei**. Beides ist zu prüfen und
  richtigzustellen — die Bereinigung gegen den Bestand an
  `src/lib/capi/meta-forward.ts` (`describeMetaError`), der Ort gegen die Naht, die
  seit der vierten Scheibe dort liegt. **Zwei Achsen, ein Satz** — wer nur eine
  korrigiert, macht die andere zur Falle.
- **`src/lib/capi/ingest.persist.test.ts`:** Der `describe`-Block zum
  Meta-Ablehnungs-Logging trägt dieselbe unzutreffende Zusage im NAMEN. Ein
  Testname, der eine Garantie behauptet, die sein Test nicht deckt, lädt dazu ein,
  eine Achse für gedeckt zu halten.

---

## 6. Vorrat — gemeldet, nicht in dieser Scheibe

Je ein Satz, Datei und Symbolname. **Keine Bewertung, kein Fix.**

- **KODIERUNG DER KENNUNG IM ENDPUNKT-PFAD:** `forwardToMeta` in
  `src/lib/capi/meta-forward.ts` setzt die Kennung anders in den Pfad ein als
  `forwardToPinterest` in `src/lib/capi/pinterest-forward.ts`.
- **WURFFREIHEIT DES NUTZLAST-BAUS:** Bei `forwardToMeta` liegt der Nutzlast- und
  URL-Bau ausserhalb des umschliessenden `try`; beim zweiten Adapter hält dieselbe
  Zusage an der ANORDNUNG.
- **DRITTE TRIMM-KOPIE:** `asString` steht in `src/lib/capi/ingest.ts`,
  `src/lib/capi/meta-forward.ts` und `src/lib/capi/pinterest-forward.ts`.
- **ABWESENHEITS-TEST OHNE EIGENE POSITIVKONTROLLE:** in
  `src/lib/capi/ingest.timeout.test.ts` der Test, der die schnelle Antwort prüft —
  seine Behauptung über den Log-Kanal steht ohne Nachweis, dass dieser Kanal im
  selben Lauf etwas fangen würde.
- **ZWEI UNABHÄNGIGE KONSTANTEN DESSELBEN WERTES FÜR DIESELBE AUFGABE:**
  `META_ERROR_MSG_MAX` in `src/lib/capi/meta-forward.ts` und `PINTEREST_LOG_MAX` in
  `src/lib/capi/pinterest-forward.ts`.
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

Die vier fälligen Punkte am ersten Adapter und das Gegenstück bei den
Deckelwerten stehen ausformuliert in
`docs/claude-history/phase-11-multi-tracking.md`, "## Der Arbeitsvorrat — vier
fällige Punkte am ersten Adapter" — hier nur der Zeiger, keine Kopie.

---

## 7. Hebungs-Kandidaten aus dieser Scheibe

**SIE WERDEN JETZT NICHT GEHOBEN.** Die Hebung nach CLAUDE.md, "## Immer beachten",
ist Sache des PHASENENDES — hier stehen Kandidaten, keine Auswahl. Je Kandidat ein
Satz, der Beleg aus dieser Scheibe und die Prüfung, ob eine bestehende Regel ihn
schon abdeckt (geprüft am 2026-08-11 durch Durchsicht von "## Immer beachten").

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
