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

## 3. Die laufende Scheibe: der Log-Leak am Meta-Adapter

**EINSTUFUNG:** Tier 1 im Security-Manifest, Item "META-FEHLERLOG SPIEGELT DAS
ZUGANGSDATUM ZURÜCK" (CLAUDE.md, "### Tier 1 — Vor echtem Ad-Traffic / Spend";
Vollfassung in `docs/claude-history/security-manifest-full.md`). Gegenstand ist
`describeMetaError` in `src/lib/capi/meta-forward.ts`.

**DER ZUSCHNITT — als ANFORDERUNG, nicht als Code. Was heute an diesen Stellen
steht, ist vor dem Bau am Repo zu messen:**

- **DER NICHT-JSON-AUSGANG GIBT DEN ANTWORT-RUMPF NICHT MEHR AUS.** An seine Stelle
  treten Angaben ÜBER die Antwort: Status, Content-Type, Länge.
- **IM ENVELOPE-AUSGANG WIRD DIE FEHLERMELDUNG DES ANBIETERS GESCHWÄRZT.**
- **DIE ENUM-ARTIGEN FELDER** (Code, Subcode, Typ) **WERDEN HART BEGRENZT.**
- **`fbtrace_id` BLEIBT UNGESCHWÄRZT** und wird nur längenbegrenzt — Begründung
  und Auflage in Abschnitt 4 (a).
- **DER META-ADAPTER BEKOMMT EINE EIGENE, BENANNTE SCHWÄRZUNG.** Sie entsteht in
  `src/lib/capi/meta-forward.ts` und wird dort als BEWUSSTES DUPLIKAT kenntlich
  gemacht — mit dem, was sie dupliziert, und der Bedingung, unter der das Duplikat
  aufgelöst wird. **DER ZWEITE ADAPTER WIRD IN DIESER SCHEIBE NICHT ANGEFASST:
  kein Import, kein Byte.** Hier stand bis zum 2026-08-11 das Gegenteil (das
  Primitiv wandere in eine geteilte Datei, die bestehenden Tests des zweiten
  Adapters seien der Wächter dafür); die Herleitung dieser Umkehr steht in
  Abschnitt 4 (d).
- **DER KOMMENTAR, DER DIE FEHLERMELDUNG DES ANBIETERS FÜR UNBEDENKLICH ERKLÄRT,
  WIRD ERSETZT** — s. Abschnitt 4 (b).
- **DER NEUE TEST IST DAS EIGENTLICHE ERGEBNIS DER SCHEIBE:** eine Fixture, in der
  die ANBIETER-ANTWORT das Zugangsdatum ZURÜCKSPIEGELT, mit benannter
  Positivkontrolle — plus ein ZWILLING, der behauptet, dass die Diagnosefelder
  noch DA sind. Ohne den Zwilling wäre eine Schwärzung, die alles frisst,
  ununterscheidbar von einer, die trifft.

**AUSDRÜCKLICH NICHT IN DIESER SCHEIBE:** die Kodierung der Kennung im
Endpunkt-Pfad, die Wurffreiheit des Nutzlast-Baus, die dritte Trimm-Kopie, der
Testknopf, weitere Ziele. Die ersten drei stehen als Vorrat in Abschnitt 6.

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

Die vier fälligen Punkte am ersten Adapter und das Gegenstück bei den
Deckelwerten stehen ausformuliert in
`docs/claude-history/phase-11-multi-tracking.md`, "## Der Arbeitsvorrat — vier
fällige Punkte am ersten Adapter" — hier nur der Zeiger, keine Kopie.
