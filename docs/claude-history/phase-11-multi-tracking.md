# Phase 11 — Multi-Tracking / Server-Side Fan-Out (ausgelagerte Historie)

Volle Herleitung, Entscheidungen, Tests und Live-Verifikation der GEBAUTEN
Phase-11-Arbeit, aus der aktiven Standdatei ausgelagert. Umfang (chronologisch):
ZWÖLF Scheiben — (1) Umstellung der Geheimnis-Tabelle auf (Projekt, Ziel), (2) das
geteilte Consent-Gate, (3) der PageView-Emitter hinter dem Gate, (4) die Naht des
Meta-Forwards, (5) das Einwilligungs-Signal reist zum Server, (6) die Zugangsdaten je
Ziel (zwei Hälften), (7) die Auflösung trägt mehrere Ziele, (8) der Beacon verlässt
Metas Laufzeit, (9) die Einwilligung je Ziel (zwei Hälften), (10) der Adapter für das
zweite Ziel, (11) die Karte fragt nach der richtigen Kennung, (12) Pinterest sendet —
**alle zwölf abgeschlossen (2026-08-05 bis 2026-08-10), elf davon live bewiesen; die
zehnte ausdrücklich OHNE eigenen Live-Nachweis, ihr Adapter wurde erst von der
zwölften gerufen.** Ausgelagert am 2026-08-10.

Der aktive Ist-Stand (Migrationsstand bis 0022, `project_secrets`, RLS-Lage,
Indizes, Funktionen) steht WEITERHIN in der Root unter "## Aktueller
DB-/Analytics-Stand" bzw. "## Offene Punkte". ZWÖLF dauerhafte Regeln aus dieser Phase
sind VOR der Auslagerung generalisiert nach CLAUDE.md, "## Immer beachten", gehoben
worden, dazu drei Mutations-Lektionen und ein Punkt zu Abwesenheits-Behauptungen —
**sie werden HIER NICHT wiederholt.** Diese Datei trägt die BEGRÜNDUNG, nicht den
aktuellen Zustand.

**WAS MITREIST, OBWOHL ES KEINE FERTIGE ARBEIT IST:** die VERSCHOBENE dreizehnte
Scheibe (Testknopf) samt ihrer Aufklärung und ihren drei entschiedenen Auflagen, die
EINUNDDREISSIG Backlog-Kandidaten dieser Phase (von denen KEIN EINZIGER in
`backlog-polish.md` steht), die FÜNFUNDZWANZIG nicht gehobenen Lektionen und der
Arbeitsvorrat am ersten Adapter. **Ohne diese Datei gäbe es sie nirgends mehr.**

---

## Der Einstieg für die nächste Sitzung

**WAS ERREICHT IST, in drei Sätzen.** Die Fan-Out-Struktur steht: Ein zweites Ziel
wird tatsächlich beliefert, live bewiesen gegen ein echtes fremdes System (drei von
drei Ereignissen im Anzeigenkonto des Anbieters, Quelle "API", unter dem übersetzten
Namen). Auflösung über mehrere Ziele in EINER Abfragerunde, Einwilligung JE ZIEL,
Oberfläche je Plattform und ein nebenläufiger Fan-Out mit EIGENEM Deckel je Empfänger
sind gebaut, mutationsgeprüft und live bestätigt. Der erste Empfänger verhält sich
dabei unverändert — das ist die tragende Zusage der Phase, und sie hat gehalten.

**WAS OFFEN IST.** Die weiteren Ziele (TikTok, Google, LinkedIn, Custom-Pixel), das
Tracking-Testmodus-Modul und der Testknopf. **SIE SIND WIEDERHOLUNGEN DESSELBEN
HANDGRIFFS, KEIN NEUES FUNDAMENT:** Ein weiteres Ziel ist ein Adapter, ein Eintrag in
`dispatchForward`, ein Zielwert im CHECK `project_secrets_target_valid`, ein Eintrag in
`TRACKING_TARGETS`/`CONSENT_KEY_BY_TARGET`/`LEGACY_CONSENT_ROLE`/`TARGET_CARDS` — und
ein Live-Test. Alles, was daran schwierig war, ist einmal gemacht.

**WO DER ARBEITSVORRAT STEHT.** Vier fällige Punkte am ERSTEN Adapter, s. "## Der
Arbeitsvorrat — vier fällige Punkte am ersten Adapter". Einer davon ist als **Tier 1**
im Security-Manifest eingestuft und bindet den nächsten Eingriff in
`capi/meta-forward.ts`.

**DIE AUFLAGEN, DIE WEITERGELTEN** (Herleitung jeweils weiter unten):
1. **EIN DRITTES ZIEL ERZWINGT EINE ENTSCHEIDUNG, KEINE KOPIE.** Die Adapter sind
   bewusst NICHT abstrahiert; die Abstraktion entsteht beim DRITTEN Fall. Zwei Fälle
   zeigen, WAS verschieden ist — erst der dritte zeigt, was gleich bleibt.
2. **DER CONSENT-SCHLÜSSEL DES ZWEITEN ZIELS IST EINE EINBAHNSTRASSE.** Er steht in
   ausgeliefertem Code und in fremden Betreiber-Konfigurationen. Er gehört als
   Konstante nach `tracking/consent.ts` (wie der von Meta) — **fällig, nicht getan.**
3. **DIE GENERISCHE ACTION-CONSENT-CHECKBOX** (jede Aktion gated, nicht nur Tracking)
   muss auf DEMSELBEN Mechanismus laufen. Ein zweites Urteil darf nicht entstehen.
4. **JEDES ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT.** Der CHECK bleibt eng
   gefasst — der beabsichtigte Preis ist der sichtbare Moment, in dem ein Ziel real
   wird.
5. **DIE DREI AUFLAGEN DES TESTKNOPFES** sind entschieden und werden nicht neu
   verhandelt (s. "## Die dreizehnte Scheibe").
6. **KEIN LIVE-TEST OHNE DEN PFLICHT-STOPP:** Vor jedem Live-Test eines Ziels prüfen,
   ob der Consent-Schlüssel dieses Ziels im ausgelieferten Quelltext steht. Fehlt er,
   ist ein ausbleibender Forward KORREKTES Verhalten und kein Befund über den Adapter.

---

## Das beschlossene Consent-Modell (Owner-Entscheidung, 2026-08-03)

**Provenienz: Owner-Entscheidung zu Phasenbeginn, unverändert bis zum Phasenende.**

- **EIN URTEIL, NICHT N URTEILE.** Die Auswertungsregel steht GENAU EINMAL, in
  `tracking/consent.ts` (`buildConsentRuntime`). Es gibt zwei Einfügestellen
  (`generate.ts` für das Wiring-Dokument, `pageview-emitter.ts` für die publizierte
  Seite ohne Wiring), aber nur EINE Implementierung.
- **DIE TRENNLINIE IST NICHT DIE DATENFORM, SONDERN EINE FRAGE: HAT SICH DER BETREIBER
  ÜBERHAUPT GEÄUSSERT?** nichts gesetzt → ERLAUBT · Funktion → aufrufen, ein Wurf →
  VERBOTEN · direkt gesetzter Wert → direkt auswerten · GENAU `true` → erlaubt · Objekt
  → der Ziel-Schlüssel muss GENAU `true` sein · alles übrige → VERBOTEN.
- **GENAU `true` STATT TRUTHY, auch bei Schlüsselwerten.** Truthy wieder zuzulassen
  wäre die Wiederholung genau des Fehlers, der diese Scheibe ausgelöst hat (die
  frühere Auswertung machte per `!!` aus JEDEM Objekt ein "erlaubt").
- **FAIL-CLOSED IST ABSICHT, NICHT HÄRTE.** Fail-closed heisst, der Betreiber MERKT es
  — sein Tracking hört auf. Fail-open heisst, niemand merkt es.
- **DER NAMENSRAUM MISCHT KATEGORIE UND ANBIETER, UND DAS IST ABSICHT.** Pro Anbieter
  ist FEINER als pro Kategorie, und feiner ist für dieses Produkt richtig. Zwei falsche
  "Reparaturen": wer auf Kategorien harmonisiert, verliert die Granularität; wer
  `marketing` NEBEN `meta` stellt, erzeugt zwei Urteile für dieselbe Sache.

---

## Die vier Naht-Entscheidungen (vierte Scheibe, Owner 2026-08-06)

1. **KEINE ABSTRAKTION: EINE DATEI, EINE FUNKTION, DER ANBIETER IM NAMEN.** Kein
   Interface, keine Registry, kein gemeinsames Modell.
2. **DIE RÜCKGABEFORM BLEIBT UNVERÄNDERT; DAS LOGGING LIEGT IN DER NAHT.** `Promise<void>`,
   geloggt wird im Adapter, nicht beim Aufrufer.
3. **DIE GRENZE: DIE NAHT BEKOMMT FERTIGE NEUTRALE WERTE, KEIN REQUEST-OBJEKT.** IP und
   User-Agent werden im Handler ermittelt; der Adapter kennt kein HTTP, sondern das
   Vokabular seines Anbieters.
4. **DAS GATE GEHÖRT DEM HANDLER, NICHT DEM ADAPTER.** `isForwardable` bleibt im
   Ingest.

**DIESE VIER HABEN DIE GANZE PHASE GETRAGEN und sind am Ende bestätigt worden:** Die
zehnte Scheibe hat sie beim zweiten Adapter wörtlich wiederholt, und die zwölfte hat
gezeigt, warum (3) richtig war — die Abbildung der Konfigurationsform liegt beim
AUFRUFER, nicht im Adapter.

---

## Die Anbieter-Befunde zum zweiten Ziel — AUFGENOMMEN 2026-08-08, GEPRÜFT ERST 2026-08-10

**PROVENIENZ: Anbieter-Doku-Lesung, KEINE Messung — bis zur zwölften Scheibe.** Die
Handmessung vom 2026-08-07 betraf AUSSCHLIESSLICH den Fehler-Rumpf bei ungültigem
Geheimnis. **Der Erfolgs-Rumpf war nie gemessen worden**, und genau er trägt die
Auswertung im Adapter.

**WAS ÜBER DEN EINEN ANBIETER HINAUS GILT — und das ist die Antwort auf die Frage, ob
die nächste Sitzung diese Befunde für weitere Ziele brauchen kann:**

- **AN FÜNF STELLEN SIEHT ES GLEICH AUS UND IST ES NICHT.** (1) FEHLERWEGE: der eine
  verzweigt auf `res.ok`, der andere meldet eine abgelehnte Nutzlast mit
  ERFOLGSSTATUS. (2) DER TYP DES WERTES: Zahl gegen Zeichenkette. (3) DAS
  IDENTITÄTS-PAAR: jede Hälfte einzeln weglassbar gegen "beide oder keiner". (4) DER
  ORT DES TESTMODUS: Nutzlast gegen Query-String. (5) `action_source`: `"website"`
  gegen `"web"`.
  **DER SATZ, DER SIE TRÄGT: EIN GEMEINSAMES MODELL HÄTTE AN JEDER DIESER FÜNF STELLEN
  DAS FALSCHE VEREINHEITLICHT — UND ZWAR SO, DASS ES BEIM LESEN RICHTIG AUSSIEHT.**
  Das ist die verallgemeinerbare Aussage: **Bei jedem weiteren Ziel ist zuerst zu
  fragen, wo es NUR SO AUSSIEHT wie die bestehenden.**
- **EINE ÜBERSETZUNGSTABELLE GEHÖRT AN DIE NAHT IHRES ZIELS, nicht in den geteilten
  Pfad.** Jedes Ziel bringt sein eigenes Vokabular mit; eine zentrale Abbildung beträfe
  die anderen mit.
- **DIE ZUORDNUNGEN STAMMEN AUS DER ZWECKSPALTE, NICHT AUS NAMENSÄHNLICHKEIT.** Bei
  sechs von acht Paaren decken sich die Namen ohnehin, bei zweien nicht
  (`Purchase → checkout`, `CompleteRegistration → signup`). Eine Abbildung aus
  Ähnlichkeit wäre hier die teuerste gewesen: als Erfolg zurück, unter falscher
  Bedeutung.
- **EINE `Map` STATT EINES OBJEKTLITERALS IST EINE SICHERHEITSENTSCHEIDUNG.** Der Name
  kommt aus dem anonymen Beacon; ein Nachschlagen auf einem Objektliteral liefert für
  `constructor`/`toString` einen wahrheitsfähigen Wert aus `Object.prototype`.
- **DIE KENNUNG IM ENDPUNKT-PFAD WIRD KODIERT.** Der Betreiber kann jeden Text als
  Kennung eintragen; ein Wert mit `/`, `?` oder `#` veränderte sonst Pfad und Query.

**GEPRÜFT AM 2026-08-10 (Live-Test der zwölften Scheibe): DIE TRANSKRIPTION HAT
GEHALTEN.** Endpunkt, Feldnamen, Zeiteinheit, Identitäts-Paar und Übersetzung stimmten
sämtlich. **Es gab KEINE Abweichung** — der seltenere Ausgang, und er ist als solcher
vermerkt, nicht als Selbstverständlichkeit.

---

## Die zwölf Scheiben

### Scheibe 1 — Die Geheimnis-Tabelle trägt (Projekt, Ziel) (ABGESCHLOSSEN, live 2026-08-05, Migration 0021)
Umstellung von `project_tokens` auf `project_secrets` mit dem PAAR `(project_id,
target)` als Primärschlüssel, **ohne jede Verhaltensänderung**. Katalog-Prüfung,
Nachhol-Lauf, Code, Live-Test. **RLS aktiv, KEINE EINZIGE Policy** — die Tabelle ist
damit das reinste Beispiel der Regel "GRANTS SCHÜTZEN NICHTS": für `anon` und
`authenticated` vollständig verschlossen, obwohl beide per Grant volle DML-Rechte
haben. Die einzige Schreib-Autorisierung liegt im Ownership-Gate der Server-Actions.
**Der Doppelschreib in die Alt-Tabelle bleibt als Rollback-Reserve** — neue Tabelle
ZUERST, damit bei einem Abbruch der LIVE-Pfad den korrekten Wert liest.

### Scheibe 2 — Das geteilte Consent-Gate (ABGESCHLOSSEN, live 2026-08-05)
Die Einwilligungs-Auswertung wird aus der Meta-Laufzeit herausgezogen und liegt ab
hier in `tracking/consent.ts`. Sie hängt WEDER an der Pixel-ID NOCH an der
Mapping-Tabelle und wird von BEIDEN Konsumenten gefragt. **DIE GEFAHR, GEGEN DIE SIE
GEBAUT IST: eine KOPIERTE Consent-Prüfung pro Ziel** — dasselbe Muster, das das
Projekt anderswo konsequent vermeidet ("kein drittes Urteil").
**Zwei Hebungskandidaten aus dem Bau:** eine grün gebliebene Mutation ist ein BEFUND,
kein Anlass zur Reparatur (die Gegenmutation in die andere Richtung trennt "prüft
nichts" von "prüft eine andere Achse") · "blockiert" und "abgestürzt" sehen an einer
Abwesenheits-Assertion identisch aus.

### Scheibe 3 — Der PageView-Emitter hinter dem Gate (ABGESCHLOSSEN, live 2026-08-06)
Der Emitter fragt VOR dem Senden für den Schlüssel der eigenen Auswertung
(`ANALYTICS_CONSENT_TARGET`). **Sie trägt eine echte Verhaltensänderung** — sie kann
Seitenaufrufe unterdrücken, die vorher gezählt wurden; deshalb fuhr sie allein.
**Drei Lektionen:** eine Mutations-Vorhersage kann in BEIDE Richtungen falsch sein ·
ein Test, dessen Rot in die falsche Richtung zeigt, ist schlechter als einer, der
schweigt · eine Übertragung aus einem Präzedenzfall ist eine Vermutung, keine Messung.
**Ein Hebungskandidat aus dem Zuschnitt:** wer einen Befund aus einer DOKU-Stelle
übernimmt, muss prüfen, ob eine SEITHER gebaute Scheibe ihn berührt hat — die
Provenienz-Angabe schützt davor nicht.

### Scheibe 4 — Die Naht des Meta-Forwards (ABGESCHLOSSEN, live 2026-08-06)
Nutzlast-Bau, Zeiteinheit, Timeout-Gerüst und Fehlerdeutung wandern aus
`capi/ingest.ts` nach `capi/meta-forward.ts`. Der Handler entscheidet nur noch, OB
geforwardet wird. **Die vier Naht-Entscheidungen oben stammen von hier.**
**Vier Hebungskandidaten:** eine Anleitung, die eine Voraussetzung nicht nennt, erzeugt
eine falsche Entwarnung · eine billige Messung wird nicht durch eine Herleitung ersetzt
· ein Live-Test-Schritt setzt einen Zustand der Seite voraus · (der vierte war ein
zweiter Beleg für "Vorhersage in beide Richtungen falsch").
**HIER ENTSTAND DIE VORHERSAGE, DIE DIE ZEHNTE SCHEIBE EINGELÖST HAT:** *"Die dritte
Kopie kommt mit dem zweiten Ziel — und DANN wird die neutrale Datei richtig."*

### Die GESTRICHENE fünfte Scheibe — Der Forward löst sich von der Antwort (GESTRICHEN 2026-08-06)
Sie wurde zugeschnitten und **nicht gebaut, weil ihre BEGRÜNDUNG wegfiel** — nicht,
weil sie vertagt worden wäre. **PROVENIENZ: Vercel-/Next-Doku, gelesen 2026-08-06,
plus ZWEI Dashboard-Werte (Fluid Compute aktiv, Default Max Duration 300 s). KEINE
Messung am eigenen Ingest-Pfad.** `after()` verlängert dieselbe Invocation; unter Fluid
Compute pausiert die Active-CPU-Abrechnung während I/O; `waitUntil` sichert ABSCHLUSS
zu, nicht ERFOLG. **Der daraus folgende Prüfkandidat an der Regel `/API/E-SCHLANKHEIT`
ist am 2026-08-10 ENTSCHIEDEN worden** (die SOLL-Hälfte ist bedingt geworden, nicht
gestrichen) — er ist damit erledigt und reist nicht als offener Punkt mit.

### Scheibe 5 — Das Einwilligungs-Signal reist zum Server (ABGESCHLOSSEN, live 2026-08-06/07)
Vier Entscheidungen: **es reist das URTEIL, nicht der Rohzustand** · die
Alt-Seiten-Unterscheidung · die ENGE Form (ein Schlüssel auf einem Beacon) · der
Confirm-Beacon bleibt schmal.
**Drei benannte Punkte:** derselbe Schutz kann auf einem Pfad zweifach und auf einem
anderen einfach vorhanden sein — und der einfache ist der neue · eine Zahl, die gleich
bleibt, kann an einer Stelle steigen und an einer anderen nicht existieren · die erste
zu PESSIMISTISCHE Vorhersage der Phase.

### Scheibe 6 — Die Zugangsdaten je Ziel, zwei Hälften (ABGESCHLOSSEN, live 2026-08-07/08, Migration 0022)
**HÄLFTE A:** Ablage `pixels.<ziel>`, Server-Aktionen mit Ziel als Pflicht-Parameter,
CHECK-Erweiterung. **HÄLFTE B:** eine Karte je Plattform (`TargetCard`).
**Vier Entscheidungen:** eine Karte je Plattform · der Statuswortlaut ("Zugangsdaten
hinterlegt", NIE etwas über Wirkung) · der Testknopf bekommt seinen PLATZ, nicht seine
Funktion · fünf Dinge, die die Scheibe herstellt.
**DER STATUSWORTLAUT IST DIE WICHTIGSTE ERBSCHAFT:** Eine Karte behauptet mehr als eine
Listenzeile und darf deshalb WENIGER sagen. Der Ausfall aus der dritten Scheibe (Token
widerrufen, Anzeige grün, Forward tot) ist der Grund; ein Wortlaut-Wächter hält die
Grenze.
**Vier benannte Punkte:** eine abgeleitete Anzeige braucht einen Weg, nach einer
Mutation aufzufrischen · eine Vorbedingung, die auch der alte Zustand erfüllt, ist
keine · ein grüner Test ist kein Beleg, dass der Grund seiner Grünheit derselbe blieb ·
eine Zählung entlang EINER Achse ist bei einem Umbau systematisch zu niedrig.

### Scheibe 7 — Die Auflösung trägt mehrere Ziele (ABGESCHLOSSEN, live 2026-08-08)
`getCapiConfigByTrackingKey` liefert eine MENGE (`targets: ResolvedTarget[]`) statt
eines Einzelfelds. **Zwei Dinge daran sind Entscheidung:** der Feldname wurde
MITGEÄNDERT (sonst übernähme der Handler den neuen Typ still) · LEER statt `null` (die
Unterscheidung "kein Projekt" gegen "Projekt ohne Ziel" liegt jetzt auf zwei Ebenen,
und der Aufrufer MUSS auf die LÄNGE prüfen — ein leeres Array ist truthy).
**GENAU ZWEI Abfragen, unverändert:** `in(target, …)` statt `eq`, kein `maybeSingle()`.
**Der Fan-Out entsteht hier:** `allowed.map(...)` plus `Promise.allSettled`, jeder
Adapter mit EIGENEM Timeout-Gerüst. **KEIN `Promise.race`, KEIN gemeinsamer Wecker,
KEIN geteiltes AbortSignal.**
**Vier benannte Punkte:** der Compiler zeigt Folgefehler nacheinander, nicht
nebeneinander · eine Information zu haben heisst nicht, sie auf der richtigen Achse
ausgewertet zu haben · eine Mutation, die zwei Achsen gleichzeitig bewegt, ist ein
Umbau · ein Schutz, der sich nicht lautlos entfernen lässt, braucht keinen Test — aber
das muss geprüft sein.

### Scheibe 8 — Der Beacon verlässt Metas Laufzeit (ABGESCHLOSSEN, live 2026-08-08)
Der Conversion-Beacon hing bis dahin INNERHALB von Metas Gate; ein Projekt, das
server-seitig messen wollte, ohne Meta zu benutzen, sendete NICHTS. `buildMetaRuntime`
entscheidet ab hier selbst: ein Pixel ODER ein Beacon-Rumpf.
**Zwei benannte Punkte:** vier Kommentarstellen in zwei Dateien waren überholt · der
Zustand der steigenden, falschen Verlustrate (er entsteht nicht durch diese Scheibe,
wird von ihr aber sichtbar).

### Scheibe 9 — Die Einwilligung je Ziel, zwei Hälften (ABGESCHLOSSEN, live 2026-08-08)
**HÄLFTE A (Server):** `allowedTargets` als eigene, exportierte Funktion — die
Entscheidung muss EINZELN ROT FÄRBBAR bleiben. Zwei Zweige: Feld GANZ ABWESEND →
erlaubt ist genau das Ziel mit der ALTBESTANDS-ROLLE; Feld vorhanden → je Eintrag über
`consentAllows` mit dem Schlüssel DIESES Ziels.
**HÄLFTE B (Erzeuger):** EINE Ziehung, daraus die Oder-Kette und ein Draht-Objekt mit
einem Feld je Schlüssel.
**WARUM DIE ROLLE UND NICHT "alle erlaubt":** Bei EINEM Ziel hiess "abwesend"
tatsächlich "die Seite ist älter als das Feld". Bei N Zielen heisst es "über DIESES
Ziel wurde nie gefragt" — daraus ein Ja zu machen wäre ein Forward ohne Einwilligung.
**Drei benannte Punkte:** eine Regel kann richtig sein und nicht skalieren — der Bruch
zeigt sich an ihrer BEGRÜNDUNG · ein Anbietername als WERT ist etwas anderes als ein
Anbietername als SONDERFALL · eine Vorhersage, die ihre eigene Unschärfe benennt, ist
auch dann brauchbar, wenn sie danebenliegt.

### Scheibe 10 — Der Adapter für das zweite Ziel (ABGESCHLOSSEN 2026-08-09, OHNE LIVE-NACHWEIS)
`forwardToPinterest` in `capi/pinterest-forward.ts`, rein additiv, **von niemandem
gerufen**. **Ein Live-Nachweis war für sie nicht führbar** — das ist keine Nachlässigkeit,
sondern die Bauform; die erste Gelegenheit dazu war die zwölfte, und sie hat sie
genutzt.
**KEINE ABSTRAKTION, ZUM ZWEITEN MAL** — die fünf Stellen, an denen es gleich aussieht
und es nicht ist, stehen oben bei den Anbieter-Befunden.
**DER VERTRAG, in drei Sätzen, einer davon SCHÄRFER als beim ersten Adapter:** Sie
wirft nie, und die Zusage ist STRUKTURELL gehalten (vor dem `try` steht KEINE
Anweisung) · sie wird im Request erwartet · sie gibt nichts zurück.
**Vier benannte Punkte:** ein Schritt, der an ein Ereignis gekoppelt ist, fällt mit dem
Ereignis aus · ein Bereiniger, der das Geheimnis kennen MUSS, ist selbst eine Stelle,
an der es verlorengehen kann · eine Erlaubnis ist kein Auftrag · ein Import-Verbot ist
im Unit-Test nicht ehrlich prüfbar.

### Scheibe 11 — Die Karte fragt nach der richtigen Kennung (ABGESCHLOSSEN, live 2026-08-10, Commit `3b3ca98`)
Drei Zeichenketten: die Karte nannte die TAG-Kennung, der Adapter braucht die
ANZEIGENKONTO-Kennung. **Zwei verschiedene Nummern im selben Anbieter-Konto, und der
Unterschied ist für den Betreiber unsichtbar.**
**Zwei benannte Punkte:** eine dritte Fehlerkategorie bei Mutations-Vorhersagen — die
KASKADE (ein unverbrauchter `mockResolvedValueOnce`-Wert aus einem abgebrochenen Test
färbt Nachbartests rot) · wer eine Hälfte einer Aussage korrigiert, macht die andere
zur Falle.

### Scheibe 12 — Pinterest sendet (ABGESCHLOSSEN, live 2026-08-10, Commit `a6deeb7`)
EIN Zweig in `dispatchForward`, die Abbildung `CapiConfig → PinterestConfig`, und
`hasAdapter` umgelegt. **993 Tests vorher, 999 nachher; drei Tests waren OHNE den Zweig
rot** — die Abdeckung ist bewiesen, nicht behauptet.
**DER ZIELWERT STEHT LOKAL IM HANDLER, nicht neben dem ersten in der Auflösung:** Ein
Wert-Import von dort wäre in NEUN Testdateien `undefined` gewesen, der neue Zweig in
der gesamten Handler-Suite tot, und alles wäre grün geblieben. **Der Wächter ist der
TYP, nicht der Name.**
**DIE GEFÄHRLICHSTE STELLE IST DIE ABBILDUNG:** Der Compiler fängt die falsche FORM
(ein direktes Durchreichen bricht den Build), aber NICHT die vertauschten WERTE — beide
Felder sind Zeichenketten, und vertauscht stünde das GEHEIMNIS im Endpunkt-Pfad.
Dagegen gibt es genau einen Test (`T10` in `fan-out.test.ts`), und er ist dort als
Einzelstück benannt.
**LIVE (Meldung von Stefan, 2026-08-10, NICHT von mir gemessen):** Pflicht-Stopp
bestanden (beide Consent-Schlüssel im Quelltext), Ereignis dreimal ausgelöst, **drei
von drei im Anzeigenkonto angekommen** (Typ "Checkout", Quelle "API"), beim ersten
Anbieter unverändert das deduplizierte Paar, **keine der drei Log-Zeilen des zweiten
Adapters erschien**.
**DIE S5-RICHTIGSTELLUNG — eine als "GEMESSEN" markierte Aussage trug nicht:** Der Test
"Feld MIT VERBOT für Meta" galt als der einzige, der die Zuordnung mit einem
adapterlosen Ziel AUFRUFT, und es hiess, "es geht dann ein Aufruf hinaus". **In seinem
eigenen Fixture ging keiner hinaus** — ohne `user-agent` und öffentliche
Weiterleitungs-Adresse kehrt der zweite Adapter VOR jedem `fetch` zurück. Daraus die
bindende Auflage: **jedes Fixture, das einen Aufruf ans zweite Ziel erwartet ODER
ausschliesst, trägt das Identitäts-Paar.** Die Gegenprobe fand ZWEI weitere
Bestandstests derselben Bauart; danach fällt die teuerste Mutation mit FÜNF statt vier
Tests.
**Vier benannte Punkte:** ein Testkommentar kann eine Garantie behaupten, die sein Test
nicht deckt · ein Test kann ohne den Gegenstand grün sein, weil seine Aussage trivial
wahr ist · die Werkzeug-Regel gilt weiter als ihr Wortlaut (GEHOBEN am 2026-08-10) ·
Stille ist nur IM PAAR ein Befund.
**WAS DER LIVE-TEST NICHT BEWEIST:** die SEMANTIK (dass "Checkout" dort dasselbe
bedeutet wie "Purchase" hier — das entscheiden die Berichte des Anbieters über Tage) ·
dass der Deckel unter echter Netzlast greift · **dass ein Fehlerfall des zweiten
Anbieters richtig gedeutet wird — er ist NIE eingetreten.**

---

## Die dreizehnte Scheibe — Der Testknopf (VERSCHOBEN, Owner 2026-08-10)

**SIE WIRD NICHT GEBAUT UND NICHT GESTRICHEN.** Sie wandert in eine eigene Sitzung,
zusammen mit den weiteren Fan-Out-Zielen. **Die Begründung ist architektonisch, nicht
terminlich.**

**DIE DREI AUFLAGEN, seit der sechsten Scheibe entschieden, NICHT neu zu verhandeln:**
1. **ER HEISST "Zugangsdaten testen" UND MELDET "Verbindung & Token gültig".** Nie
   etwas über ZUSTELLUNG.
2. **SEIN ERGEBNIS IST FLÜCHTIG und wird NICHT persistiert.** Ein gespeichertes
   "gültig" ist ab der nächsten Sekunde eine Behauptung über die Vergangenheit.
3. **ER MELDET DIE RÜCKMELDUNG NEUTRAL** — ohne Deutung, welche Angabe falsch war —
   **und MASKIERT.**

**DIE AUFKLÄRUNG (am Code gemessen 2026-08-10, read-only) — vier Fehlanzeigen:**
- **KEIN LESEPFAD (Owner-Sitzung, Projekt, Ziel) → GEHEIMNIS.** Die `secret`-Spalte hat
  genau EINEN Leser: `getCapiConfigByTrackingKey`, autorisiert über den `trackingKey`,
  nicht über die Sitzung. `listConfiguredTargets` liest ausschliesslich `target`.
- **KEIN RÜCKKANAL AUS DEN ADAPTERN.** Beide geben `Promise<void>`;
  `evaluateSuccessBody`, `describeErrorBody`, `describeMetaError` und
  `sanitizeProviderText` tragen KEIN `export`.
- **KEIN AUFRUF OHNE VOLLSTÄNDIGES PAAR.**
- **KEINE MASKIERUNG IN RICHTUNG CLIENT.**

**DIE BEDINGUNG WAR VON ANFANG AN FALSCH BENANNT.** Sie lautete "er braucht Adapter,
die es hier nicht gibt". Beide Adapter existieren — und er ist KEINEN Schritt näher.
Sie war formuliert worden, als GAR KEIN Adapter existierte, und beschrieb damit, was
zufällig auch fehlte. **Die übertragbare Form ist am 2026-08-10 nach CLAUDE.md
gehoben.**

**DER SCHWERSTE BEFUND IST KEIN AUFWAND:** Ein Knopfdruck erzeugte beim ersten Anbieter
ein ECHTES Ereignis in den Daten des Kunden. **Beide Testmodi sind globale
Betriebsschalter der Instanz**, keine Eigenschaft eines Aufrufs — den einen zu setzen
legte den Verkehr ALLER Projekte in den Test-Tab. **Ein Knopf, der die Daten des Kunden
verschmutzt, ist schlechter als kein Knopf.** *Präzisierung: Das gilt, solange der
Aufruf ein EREIGNIS ist — es ist eine Folge der offenen VORFRAGE, keine Eigenschaft des
Knopfes.*

**DIE VORFRAGE, die keine Bau-Einheit ist und die niemand entschieden hat: WAS wird
überhaupt aufgerufen?** Ein Rückkanal aus den bestehenden Adaptern · ein eigener
Prüf-Aufruf je Anbieter (Preis: eine zweite Deutung derselben Antwort) · ein
anbieter-eigener Endpunkt ohne Ereignis (**ob es ihn gibt, steht nirgends und ist am
Code nicht entscheidbar**). **Ohne ihre Antwort hat kein Zuschnitt einen Gegenstand.**

**WAS SONST NOCH GEMESSEN IST:** Die FLÜCHTIGKEIT ist bereits gebaut, ohne dass jemand
sie für den Knopf gebaut hätte — die fünf Zustände von `TargetCard` leben im Mount, und
der endet am Projektwechsel (`key`) und am Abbau des Drawers. **Was fehlt, ist die
Zusicherung, dass das Ergebnis nirgends sonst landet** — ein dritter Rückruf bräche
Auflage (2). · **EINE NAHT ZUM PRÜFEN:** Der Wortlaut-Wächter verbietet "verbunden",
die vorgeschriebene Meldung heisst "Verbindung & Token gültig". **Gemessen: er schlüge
NICHT an** — aber zwei Wörter desselben Stamms, eines verboten, eines vorgeschrieben,
sind eine Stelle, an der später jemand stolpert.

**FÜNF EINZELN BEWEISBARE TEILE** (Lesepfad · Rückkanal · Maskierung in Richtung Client
· Oberfläche · die eine Aussage, die er macht) **plus die Vorfrage. Er ist keine
Scheibe.**

---

## Der Arbeitsvorrat — vier fällige Punkte am ersten Adapter

**DREI DAVON SIND AM ERSTEN ADAPTER, EINER IST EINE PHASENÜBERGREIFENDE SCHULD. Sie
sind der Grund, warum der nächste Eingriff in `capi/meta-forward.ts` gebündelt gehört.**

1. **DER LOG-LEAK — Tier 1 im Security-Manifest (eingestuft 2026-08-10).**
   `describeMetaError` gibt Metas `message` UNBEREINIGT aus und schreibt im
   Nicht-JSON-Fall `text.slice(0, 200)`. **Die Handmessung vom 2026-08-07 belegt, dass
   die Fehlerantwort auf ein defektes Token den übergebenen Token zurückspiegelt.** Der
   zweite Adapter hat dagegen `sanitizeProviderText` (erst schwärzen, dann kappen);
   der erste hat nichts. **BINDET-AN: das erste Projekt mit hinterlegtem Zugangsdatum.**
2. **DIE KENNUNG STEHT OHNE KODIERUNG IM PFAD.** Der zweite Adapter kodiert
   (`encodeURIComponent`), der erste nicht — und das öffentliche Feld hat **keine
   Eingabe-Prüfung und keinen Fehlerkanal**.
3. **DIE WURFFREIHEIT IST BEIM ERSTEN ADAPTER NUR FAKTISCH ERFÜLLT.** Sie hängt daran,
   dass der Body aus `JSON.parse` stammt und deshalb keine werfenden Getter trägt —
   also an einer Eigenschaft des AUFRUFERS. Beim zweiten hängt sie an der ANORDNUNG
   (vor dem `try` steht keine Anweisung) und hält auch dann, wenn jemand später eine
   Zeile ergänzt.
4. **DIE DRITTE TRIMM-KOPIE — jetzt fällig statt hypothetisch.** `asString` steht in
   `ingest.ts`, `meta-forward.ts` und `pinterest-forward.ts`; **kein Test sichert die
   Gleichheit der drei.** Das Protokoll der vierten Scheibe hat genau diesen Moment
   vorhergesagt: *"Die dritte Kopie kommt mit dem zweiten Ziel — und DANN wird die
   neutrale Datei richtig."* **Der Kandidat war eine Vorhersage; er ist jetzt ein
   Zustand.**

**DAZU DER DECKELWERT:** `META_FORWARD_TIMEOUT_MS` und `PINTEREST_FORWARD_TIMEOUT_MS`
stehen beide auf 3_000 und sind beide modul-privat. **Ihre Gleichheit ist Zufall der
Herkunft und von KEINER Stelle im Produktivcode behauptet** — es gibt keinen Ort, der
beide nebeneinander sieht. `T14` in `fan-out.test.ts` unterstellt sie faktisch und ist
im Kommentar entsprechend beschriftet.

---

## Die Backlog-Kandidaten dieser Phase — EINUNDDREISSIG, und KEINER steht im Backlog

**DER WUNDESTE PUNKT DES VERFAHRENS, und er ist gemessen, nicht befürchtet.** Formale
Suche über `docs/claude-history/backlog-polish.md` am 2026-08-10 nach den
unterscheidenden Begriffen (`asString`, `META_FORWARD_TIMEOUT_MS`, `Deckelwert`,
`Ziel-Vokabular`, `Republish`, `Fan-Out`, `modul-privat`, `project_secrets`,
`Pinterest`, `Trimm`): **NULL Treffer.** Die Consent-Treffer dort stammen sämtlich aus
VOR-Phase-11-Einträgen. **Der Übertrag steht seit der vierten Scheibe als Pflichtpunkt
aus und ist bis heute nicht erfolgt.**

**FÜNFZEHN Blöcke, einunddreissig Kandidaten:**

- **Aus der fünften Scheibe (2):** der gemeinsame Ablageort für Ziel-Namen · der
  zweite aus derselben Aufklärung.
- **Aus dem Zuschnitt der sechsten (1):** **DER BETREIBER ERFÄHRT NICHT, DASS EIN NEUES
  ZIEL ERST NACH DEM REPUBLISH WIRKT.** Ein vorhandenes Feld ohne den neuen Schlüssel
  ist ein VERBOT; eine vor der Einführung publizierte Seite bekommt nie einen Forward,
  bis sie neu veröffentlicht wird. **Fehlend ist nicht das Verhalten, sondern die
  MITTEILUNG.** *(Dieser ist der produktnächste der ganzen Liste.)*
- **Aus der sechsten, Hälfte A/B (3 + 4):** drei neue plus vier weitere aus der
  Hälfte B — Oberflächen- und Benennungs-Beobachtungen, ausdrücklich
  "BEOBACHTUNGEN, KEINE AUFTRÄGE".
- **Aus dem Bau der siebten (2):** `getMetaPixelId` hat keinen Aufrufer mehr, und ihr
  Kopfkommentar begründet einen Zustand, den es nicht mehr gibt · einige Testtitel und
  Kommentare tragen noch den alten Feldnamen.
- **Aus der achten (2):** vier überholte Kommentarstellen in zwei Dateien (plus die
  Namensfrage: zwei Symbole tragen Meta im Namen und decken eine Rolle ab) · **die
  steigende, falsche Verlustrate** (ein Zustand, den diese Scheibe nicht erzeugt, aber
  sichtbar macht).
- **Aus der neunten, Hälfte A (1 + eine AUFLAGE):** die zwei Fan-Out-Tests bekommen
  ihren Hinweis *(mit der zwölften erledigt)* · **die AUFLAGE: der Consent-Schlüssel
  wird zur Einbahnstrasse, sobald der Erzeuger ihn schreibt** — sie ist eingetreten und
  steht oben unter den weitergeltenden Auflagen.
- **Aus der Aufklärung zur Hälfte B (2):** die Wurf-Lücke ausserhalb der Absicherung ·
  der Array-Riegel existiert im Server-Leser, nicht in der Browser-Regel.
- **Aus der Aufklärung vom 2026-08-08 (2):** **der Deckelwert ist modul-privat und von
  aussen nicht lesbar** · **das Ziel-Vokabular hat vier unabhängige Kopien, eine davon
  ausserhalb jeder Prüfung** — der CHECK hat keinen Compiler und keinen Test und kann
  gegen alle drei anderen driften, ohne dass etwas rot wird. *(Seit der zwölften sind
  es SECHS Kopien; `PINTEREST_TARGET` ist dazugekommen.)*
- **Aus der Aufklärung zum Browser-Pfad (1):** zwei Testdateien decken Beacon und
  Bestätigung ab und führen den erzeugten Text NIE aus — von 146 Text-Behauptungen
  prüfen 103 Anwesenheit, 43 Abwesenheit, und 49 Ausführungen liegen in zwei ANDEREN
  Dateien. **Grenze: die Verhältnisse stimmen, die Absolutwerte sind eine Untergrenze.**
- **Aus der Aufklärung zur Einwilligung je Ziel (2):** zwei Verdichtungen tragen
  dieselbe Unterüberschrift (real aufgetreten: ein Gate griff zur falschen) · der
  zweite aus demselben Block.
- **Aus der Aufklärung vom 2026-08-10 (2):** die Umbenennung des öffentlichen Feldes
  (ausdrücklich NICHT in dieser Phase) · der zweite aus demselben Block.
- **Aus der Aufklärung zur Karte (2):** eine Eingabe-Prüfung für offensichtlich
  unmögliche Kennungen — **ausdrücklich KEINE Zusicherung über die Gültigkeit des
  Kontos** · der zweite aus demselben Block.
- **Aus dem Bau der elften (1 + 1 offener Punkt):** `CodeImporter.test.tsx` fehlt der
  Warn-Kommentar ihrer Schwester zur `clearAllMocks`-Falle, plus ein
  Verbrauchs-Nachweis für die Once-Warteschlange · *(der halb korrigierte Kommentarsatz
  ist mit der zwölften erledigt)*.
- **Aus dem Bau der zehnten (4):** die vier fälligen Punkte am ersten Adapter — sie
  stehen oben als Arbeitsvorrat und werden hier nicht doppelt geführt.

**WAS DARAUS FOLGT UND IN DIESER RUNDE NICHT GETAN WURDE:** Der Übertrag nach
`docs/claude-history/backlog-polish.md` ist **weiterhin offen**. Diese Datei ist ab
jetzt ihr einziger Ort — sie sind damit gerettet, aber nicht am richtigen Platz.

---

## Die fünfundzwanzig nicht gehobenen Lektionen

**Aus dem Hebungs-Bericht vom 2026-08-10.** Zwölf Regeln sind nach CLAUDE.md gehoben;
diese fünfundzwanzig sind es NICHT — teils weil sie Befunde statt Regeln sind, teils
weil sie an einen Anbieter oder ein Werkzeug gebunden bleiben, teils weil eine
bestehende Regel sie deckt. **Sie stehen hier vollständig, damit sie auffindbar
bleiben.**

**Nicht gehoben, aber Regel-Charakter (7):** eine Übertragung aus einem Präzedenzfall
ist eine Vermutung, keine Messung · wer einen Befund aus einer Doku-Stelle übernimmt,
prüft, ob eine seither gebaute Scheibe ihn berührt hat · ein Schritt, der an ein
Ereignis gekoppelt ist, fällt mit dem Ereignis aus · eine Erlaubnis ist kein Auftrag ·
ein Bereiniger, der das Geheimnis kennen muss, ist selbst eine Stelle, an der es
verlorengehen kann · Stille ist nur im Paar ein Befund · ein Anbietername als Wert ist
etwas anderes als ein Anbietername als Sonderfall.

**Nicht gehoben, Befunde (13):** der Compiler zeigt Folgefehler nacheinander · eine
Information zu haben heisst nicht, sie auf der richtigen Achse ausgewertet zu haben ·
ein Schutz, der sich nicht lautlos entfernen lässt, braucht keinen Test (gedeckt) ·
derselbe Schutz zweifach/einfach — der einfache ist der neue · eine Zahl, die gleich
bleibt, kann an einer Stelle steigen und an einer anderen nicht existieren · die erste
zu pessimistische Vorhersage der Phase · ein Test kann ohne den Gegenstand grün sein,
weil seine Aussage trivial wahr ist *(als Fall (2) in die neue Abwesenheits-Regel
aufgegangen)* · ein Import-Verbot ist im Unit-Test nicht ehrlich prüfbar · eine grün
gebliebene Mutation ist ein Befund (bereits gedeckt) · ein Test, dessen Rot in die
falsche Richtung zeigt · "Gemessene Ausgangslage" veraltet mit dem Erfolg der Phase ·
die fünf Stellen, an denen zwei Adapter gleich aussehen *(stehen oben bei den
Anbieter-Befunden)* · eine abgeleitete Anzeige braucht einen Weg, nach einer Mutation
aufzufrischen (halb gedeckt).

**In eine bestehende Regel aufgegangen (3):** wird der Gegenstand einer
Abwesenheits-Behauptung entfernt · "blockiert" und "abgestürzt" sehen an ihr identisch
aus · ein Testkommentar kann eine Garantie behaupten, die sein Test nicht deckt.

**Zwei weitere Positionen sind erledigt und reisen nur als Vermerk mit:** die
Werkzeug-Regel (gehoben am 2026-08-10) und der Prüfkandidat zur SOLL-Hälfte von
`/API/E-SCHLANKHEIT` (entschieden am 2026-08-10 — die SOLL-Hälfte ist bedingt geworden,
nicht gestrichen).

---

## Die Wanderungs-Kette — wie aus einer Scheibe zwölf wurden

**Die Standdatei führte eine Kette von Stempeln, die jede Umplanung sichtbar hielt,
ohne je einen früheren zu überschreiben. Sie ist hier verdichtet; ihr WERT lag darin,
dass die Bewegung lesbar blieb.**

Pinterest stand zu Phasenbeginn auf **Scheibe 1**. Es rückte auf 3 (Consent-Gate zuerst),
auf 4 (PageView-Emitter), auf 5, dann auf 6 (Zugangsdaten je Ziel), dann auf 9 —
**Auflösung (7) und Browser-Pfad (8) davor** —, und zuletzt auf **12**, nachdem aus der
einen offenen Scheibe VIER wurden (Owner, 2026-08-09).

**WAS DIE KETTE LEHRT, und es steht hier, weil es sonst mit ihr verschwindet:**
- **Die Verschiebungen entstanden NICHT aus schwankender Planung, sondern aus BEFUNDEN.**
  Der schärfste: der Conversion-Beacon existierte nur INNERHALB von Metas Gate — solange
  das so war, konnte ein zweites Ziel gar nicht beliefert werden, auch mit fertigem
  Adapter nicht.
- **Eine Vorbedingung, die vorher unbekannt war, ist kein Planungsfehler.** Der
  entsprechende Stempel sagt es wörtlich: *"wer daraus schliesst, dass die Planung
  schwankt, liest falsch — die Vorbedingung war vorher schlicht unbekannt."*
- **Die ELFTE war die erste Scheibe der Phase, die VOR einer früher zugeschnittenen
  fertig wurde.** Das ist kein Vorziehen: **die Nummer sagt, wovon eine Scheibe abhängt,
  nicht wann sie gebaut wird.**

---

## Was NICHT mitgewandert ist

**Ausdrücklich benannt, damit die Auslassung eine Entscheidung bleibt und kein
Versehen:**

- **Die Stempel-Ketten im Wortlaut.** Die Standdatei führte zu fast jedem Abschnitt
  eine Kette von "NACHGEZOGEN AM …"-Stempeln, die frühere Fassungen wörtlich
  stehenliessen. **Ihr Zweck war, die Bewegung WÄHREND der Phase lesbar zu halten** —
  für eine abgeschlossene Phase trägt das Ergebnis. Die Kette ist oben verdichtet.
- **Die Zuschnitte im Volltext.** Ein Zuschnitt ist ein Auftrag an einen Bau, der
  stattgefunden hat; sein Ertrag steht im Protokoll. **Wo ein Zuschnitt etwas
  entschieden hat, das über den Bau hinausgilt** (die drei Auflagen des Testknopfes, die
  vier Naht-Entscheidungen, das Consent-Modell), **ist es übernommen.**
- **Die gemessenen Ausgangslagen je Scheibe.** Sie beschreiben Zustände, die die Phase
  selbst abgeräumt hat. **Die eine Ausnahme sind die Anbieter-Befunde** — sie sind
  nicht Herleitung, sondern GRUNDLAGE, und stehen oben vollständig.
- **Die Diff-Vorlagen, Testzahlen je Runde und Mutationsprotokolle im Detail.** Sie
  stehen in den Commits, und die Commits sind über die genannten Hashes auffindbar.
- **Die Fragenkataloge an die Stufe-1-Pläne.** Sie sind beantwortet; die Antworten
  stehen in den Protokollen.

**WO ICH UNSICHER WAR, HABE ICH ÜBERTRAGEN:** die vollständige Backlog-Liste (auch die
Kandidaten, deren Gegenstand ich für erledigt halte — sie sind als solche markiert),
alle fünfundzwanzig nicht gehobenen Lektionen (auch die, die in einer Regel aufgegangen
sind) und die Anbieter-Befunde in voller Breite. **Der Fehler in diese Richtung ist
billig; der andere ist es nicht.**
