# AKTIVER STAND — PHASE 11.8 (AUTORISIERUNGSSCHICHT)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.8. Sie ist
angelegt am 2026-08-25. Existiert sie, läuft diese Phase; wird sie am Phasenende
gehoben und archiviert, verschwindet sie wieder. Verfahren: docs/arbeitsweise.md.

**WARUM SIE EINEN ZUSATZ IM NAMEN TRÄGT UND docs/aktiver-stand.md NICHT:** Jene Datei
gehört Phase 11.2 und behält ihren Namen, weil acht Zeiger im Quellcode ihn wörtlich
zitieren — GEMESSEN am Repo (CC, 2026-08-25; Achse: src/** über *.ts und *.tsx,
Suchbegriff "docs/aktiver-stand.md"): vier in src/lib/capi/google-click-ids.ts, drei in
src/lib/capi/google-payload.ts, einer in src/lib/capi/google-click-ids.test.ts. Ein
Umbenennen machte alle acht tot, und heilbar wäre das nur mit einer Quelldatei-Änderung
— also einem feat-Commit für einen Doku-Vorgang.
**DIE FOLGE FÜR DIESE DATEI, und sie ist der Preis der Entscheidung:** Der Name weicht
von der Konvention der ersten Standdatei ab. Wer nach "der Standdatei" sucht, findet die
andere zuerst.

## Verzeichnis der Abschnitte

Die Einträge dieses Verzeichnisses tragen bewusst KEINE `##`-Marke, damit eine Suche
nach einer Überschrift nicht zuerst hier landet — s. die Regel "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" in docs/immer-beachten.md.

· Pflicht-Gate — diese Datei zuerst
· Der pausierte Stand von Phase 11.2
· Gegenstand der Phase
· Was den Zuschnitt bindet
· Fortschreibungs-Regeln
· Scheibe 11.8a — Chiffrieren und Dechiffrieren als reine Datei
· Abgeschlossene Scheiben-Vermerke
· Entscheidungen, die über ihre Scheibe hinaus binden
· Vorrat (gemeldet, nicht gebaut)
· Hebungs-Kandidaten

## Pflicht-Gate — diese Datei zuerst

AB JETZT IST DIESE DATEI DAS PFLICHT-GATE JEDES BAU- UND AUFKLÄRUNGS-PROMPTS DIESER
PHASE ("Auftrag 0"): Sie wird ZUERST gelesen — vor dem Plan, nicht während des Baus. Wer
ohne sie arbeitet, arbeitet gegen einen Stand, den er nicht kennt, und die Abweichung
fällt erst auf, wenn ein Zuschnitt darauf bauen will und ins Leere greift.

**DAS GATE IN CLAUDE.md NENNT DIESEN NAMEN NICHT** — es nennt docs/aktiver-stand.md, und
das ist Absicht (der Owner wollte für den Zwei-Phasen-Fall keine Regel in der
Projektanweisung). Erreicht wird diese Datei über den WEITERLEITUNGS-VERMERK ganz oben
in jener. **Wer den Vermerk überliest, arbeitet an 11.8 mit dem Stand von 11.2, und
nichts wird rot.** Das ist die bekannte Schwachstelle dieser Konstruktion und steht hier,
damit sie nicht erst im Schadensfall benannt wird.

Sie ERSETZT KEINE der unbedingt geladenen Dateien (CLAUDE.md, docs/immer-beachten.md)
und keinen der auslöser-geladenen Pflicht-Stopps (docs/db-stand.md und docs/db-regeln.md
bei Schema/Policies/RPC/Analytics-Lesepfad, docs/plattform-befunde.md bei Migrationen und
bei Arbeit am Geheimnis-Speicher, docs/ziel-befunde.md und docs/ziel-fragenkatalog.md bei
Arbeit an einem Fan-Out-Ziel). Sie tritt DANEBEN.

## Der pausierte Stand von Phase 11.2

**docs/aktiver-stand.md TRÄGT DEN STEUERNDEN STAND VON PHASE 11.2, DIE SEIT DEM
2026-08-25 PAUSIERT.** Sie ist NICHT abgeschlossen und NICHT archiviert; ihr Inhalt ist
gültig und wird bei der Rückkehr weitergeführt.

**DER ZEIGER ZEIGT IN BEIDE RICHTUNGEN, und das ist kein Schmuck:** Jene Datei trägt ganz
oben einen Weiterleitungs-Vermerk hierher, diese hier den Rückverweis dorthin. Fehlte
eine der beiden Richtungen, fände nur die eine Datei die andere — und welche das wäre,
hinge davon ab, wo eine Sitzung zufällig einsteigt.

**WAS DORT NACHZUSEHEN IST, WÄHREND 11.8 LÄUFT:** Die Scheibe 11.2a ist gebaut (Vermerk 2,
Commit 6653f37) und hat **KEINEN LIVE-NACHWEIS** — der Vermerk hält ausdrücklich fest,
dass die nächste Scheibe ihn nachschuldet. Diese Schuld wandert NICHT auf 11.8 über: Sie
gehört der Transport-Scheibe von 11.2, und 11.8 baut keinen Transport.

**WAS AB HEUTE MEHRDEUTIG IST:** Ein Verweis der Form "Vorrat, Eintrag 3" oder "Vermerk 2"
trifft ohne Dateinamen zwei Standdateien. Verweise nennen deshalb die DATEI mit. Die acht
bestehenden Zeiger im Quellcode tun das bereits.

## Gegenstand der Phase

Die Ablage und die Erneuerung MEHRWERTIGER Zugangsdaten — gemeinsames Fundament von
Phase 11.1 (LinkedIn) und Phase 11.2 (Google). Wer sie für eine der beiden Zeilen allein
zuschneidet, baut sie überangepasst und ein zweites Mal.

**DER VOLLTEXT STEHT NICHT HIER, SONDERN AN docs/roadmap.md, Eintrag 11.8** — mit dem
Schema-Risiko, der Eigentums-Auflage, den zwei Blockern, dem Zugangsmodell und den
Nachträgen aus vier Doku-Läufen. Er wird hier NICHT verdoppelt; zwei Fassungen liefen
auseinander.

**DIE DREI ENTSCHEIDUNGEN VOM 2026-08-25** — im Anwendungscode chiffrieren statt Supabase
Vault · den bestehenden Geheimnis-Speicher erweitern statt forken · die Eigentums-Achse
offenhalten — stehen ebenfalls dort, im Block "ENTSCHIEDEN AM 2026-08-25 (OWNER) — DREI
ENTSCHEIDUNGEN ZUM GEHEIMNIS-SPEICHER". **HIER STEHT NUR DER ZEIGER.** Wer sie ändert,
ändert sie dort.

## Was den Zuschnitt bindet

Zeiger mit je einem Satz Wirkung. KEINE Volltexte, KEINE Zitate.

- **DIE DREI ENTSCHEIDUNGEN** (docs/roadmap.md, Eintrag 11.8, Block vom 2026-08-25). Sie
  legen das Verfahren, die Tabelle und die Schlüsselform fest; ein Zuschnitt, der eine
  davon umgeht, baut an ihnen vorbei.
- **DER OFFENE PUNKT "DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT"**
  (docs/offene-punkte.md). Sein Trigger ist der erste FREMDE Kunde — er sperrt diese
  Phase NICHT, aber seine Frage (2) berührt die Form der Nutzlast und damit die erste
  Scheibe.
- **DIE ANBIETER-BEFUNDE ZU SUPABASE** (docs/plattform-befunde.md, Abschnitt "Supabase
  (Postgres · Auth · RLS · Vault · Backups)"). PFLICHT-STOPP, sobald Schema, Migration
  oder Geheimnis-Speicher berührt werden — zusammen mit docs/db-stand.md und
  docs/db-regeln.md.
- **DIE ZWEI BLOCKER AUS DEM ROADMAP-EINTRAG** — der Träger des Zugangsdatums bei Google
  (kleiner geworden, nicht erledigt) und die strukturell unmögliche Ablauf-Überwachung
  bei LinkedIn. Beide betreffen den OAuth-Teil, nicht die erste Scheibe.
- **DIE SIEBEN-TAGE-FRIST IM TESTING-ZUSTAND** (docs/roadmap.md, Eintrag 11.8). Sie
  gehört als PFLICHT-HINWEIS in jede Live-Test-Anleitung dieser Phase, sobald es eine
  gibt — sonst wird ein abgelaufenes Zugangsdatum als Defekt gejagt.

## Fortschreibungs-Regeln

- VERMERK-NUMMERN SIND STABIL und werden NIE neu vergeben. Ein neuer Vermerk tritt
  HINTEN an. Nichts wird umsortiert, nichts nachnummeriert.
- ES DARF IMMER NUR EINE LÜCKE GEBEN: genau ein Vermerk ohne Commit-Nummer — der
  jüngste, noch nicht committete. Eine zweite Lücke heisst, dass ein Commit fehlt oder
  ein Vermerk nie einen bekommen hat; beides wird aufgelöst, bevor ein weiterer Vermerk
  entsteht.
- JEDE ANGABE TRÄGT PROVENIENZ, und zwar als eines von beiden: GEMESSEN (mit Datum) oder
  GELESEN (mit Quelle). Eine Angabe ohne Provenienz gilt als ungeprüft und trägt keinen
  Plan.
- ALS ORT STEHT DER SYMBOLNAME, NIE EINE ZEILENNUMMER.
- **NEU GEGENÜBER DER ERSTEN STANDDATEI, weil es zwei gibt:** Jeder Verweis von aussen
  nennt den DATEINAMEN mit. "Vorrat, Eintrag 3" allein ist mehrdeutig.

## Scheibe 11.8a — Chiffrieren und Dechiffrieren als reine Datei

**VOLLZOGEN AM 2026-08-25, Commit 4b2ec09. DER ZUSCHNITT IST AB HIER VERDICHTET** — was
mit dem Vollzug abgelaufen ist, steht nicht mehr hier. Der Maßstab, gegen den er misst,
ist Vermerk 1 weiter unten.

**WAS ABGELAUFEN IST, damit die Streichung erkennbar bleibt und nicht als Versehen:** der
Einleitungssatz des Zuschnitts · "### Der Gegenstand" · VIER der fünf Punkte aus "### Was
ausdrücklich NICHT drin war" (DIE SPALTE · DIE MIGRATION · JEDER AUFRUFER · DIE WANDERUNG
DER VIER BESTEHENDEN ZIELE) · "### Der Beweis und seine Grenze", der WÖRTLICH in Vermerk 1
aufgegangen ist und dort und nur dort steht.

**WAS ZEICHENGLEICH STEHEN BLEIBT UND WARUM:** "### Warum dieser Schnitt und nicht das
Schema zuerst" und "### Die tragende Invariante" — der Kommentarkopf von
`src/lib/secrets/cipher.ts` zitiert BEIDE. GEMESSEN am ganzen Repo (CC, 2026-08-25; Achse:
alle Dateien ausser .git, node_modules, .next, .playwright-mcp; gesucht wurde nach dem
Dateinamen dieser Standdatei, nach jedem der sechs Unterabschnitts-Titel und nach je einem
markanten Satz daraus): **es gibt GENAU EINEN Zeiger von aussen in diesen Zuschnitt**, und
das ist jener Kommentarkopf. Wer einen der beiden umformuliert, macht ihn tot.

### Warum dieser Schnitt und nicht das Schema zuerst

**DIE VERSCHLÜSSELUNG IST DIE EINZIGE STELLE, AN DER EIN FEHLER STILL IST. Ein falsches
Schema fällt beim ersten Zugriff auf, ein kaputter OAuth-Fluss beim ersten Klick — ein
schwaches Verfahren fällt NIE auf.**

Das ist der ganze Grund für die Reihenfolge. Ein Schema-Fehler ist laut und billig; ein
Verfahrensfehler ist leise und teuer, und er wird erst sichtbar, wenn jemand von aussen
die Chiffrate liest — also genau dann, wenn es zu spät ist.

### Die Frage, die diese Scheibe ENTSCHEIDEN MUSSTE — BEANTWORTET AM 2026-08-25

**TRÄGT EIN CHIFFRAT SEINE SCHLÜSSEL-HERKUNFT MIT? — JA.** Beantwortet mit KANDIDAT K2:
eine VERGEBENE KENNUNG im Kopf des Chiffrats, gebunden als mitauthentisierte Zusatzdaten.
K3 (ein Fingerabdruck des Schlüssels) ist VERWORFEN — er ist eine dauerhafte Eigenschaft
des Chiffrats, erlaubt Zuordnung über Produktion, Entwicklung und Backups hinweg und
kostet eine Ableitung auf dem späteren Ingest-Lesepfad.

**WO DIE ANTWORT STEHT — DREI ORTE, und keiner ersetzt die anderen:** die volle Begründung
im Kommentarkopf von `src/lib/secrets/cipher.ts` (dort auch, warum nicht K3 und warum
nicht T1) · die Fassung selbst im Commit 4b2ec09 · die RESTGEFAHR, die aus der Antwort
folgt, als Entscheidung (1) unter "## Entscheidungen, die über ihre Scheibe hinaus binden"
weiter unten.

**WARUM DIE FRAGE HIER STEHEN BLEIBT, obwohl sie beantwortet ist:** Sie ist der Grund,
aus dem es die Kennung überhaupt gibt. Ohne sie steht die Entscheidung (1) als
Formvorschrift da, deren Zweck niemand mehr kennt — und eine Regel ohne ihren Zweck wird
bei der nächsten Aufräumrunde gestrichen.

PROVENIENZ: OWNER/ARCHITEKT-ENTSCHEIDUNG 2026-08-25, getroffen auf den Kandidaten des
Plans zu dieser Scheibe. KEINE Messung — die Wahl zwischen K1 bis K5 ist eine Entscheidung
und kein Befund.

### Was ausdrücklich NICHT drin war — was davon WEITER bindet

- **DER PRIMÄRSCHLÜSSEL.** Die Entscheidung (3) verlangt einen künstlichen Schlüssel und
  eine nullbare project_id. Das ist ein Eingriff in den Schlüssel einer Tabelle, die
  LAUFENDE Geheimnisse trägt, und gehört nicht in dieselbe Scheibe wie ein neues
  Verfahren.

**DIE VIER ÜBRIGEN PUNKTE SIND MIT DEM VOLLZUG ABGELAUFEN** — DIE SPALTE · DIE MIGRATION ·
JEDER AUFRUFER · DIE WANDERUNG DER VIER BESTEHENDEN ZIELE. Sie sagten, was NICHT in DIESE
Scheibe gehört, und die Scheibe ist gebaut. **IHRE BINDENDEN RESTE SIND NICHT
VERLORENGEGANGEN, sondern stehen anderswo — hier steht, wo:** der Pflicht-Stopp für
docs/db-stand.md, docs/db-regeln.md und docs/plattform-befunde.md oben unter "## Was den
Zuschnitt bindet" · der Aufrufer-Riegel unverändert unter "### Die tragende Invariante" ·
die Wanderung als Vorrat, Eintrag 1.

### Die tragende Invariante

**Nach dieser Scheibe verhält sich die Anwendung EXAKT wie vorher — an jedem Pfad, für
jedes Projekt.** Die Datei hat im Produktivcode KEINEN Aufrufer; nur ihre Tests rufen
sie. Das ist der Prüfstein jeder Änderung dieser Scheibe: Wer einen Aufrufer hinzufügt,
hat nicht mehr diese Scheibe gebaut.

## Abgeschlossene Scheiben-Vermerke

### Vermerk 1 — Scheibe 11.8a, Commit 4b2ec09 (2026-08-25)

**WAS GEBAUT WURDE:** EINE reine Quelldatei `src/lib/secrets/cipher.ts` mit
`encryptSecret` und `decryptSecret`, dazu `src/lib/secrets/cipher.test.ts` mit **21
Tests**. **KEIN AUFRUFER IM PRODUKTIVCODE** — GEMESSEN (CC, 2026-08-25; Achse: `src/`
über *.ts und *.tsx, gesucht nach dem Modulpfad und nach beiden Funktionsnamen, ausserhalb
von `src/lib/secrets/`): kein Treffer. Kein Schema, keine Migration, keine Spalte, kein
OAuth, kein UI. Der Commit umfasst DREI Dateien: die beiden neuen plus einen additiven
Eintrag in `.env.local.example`; `package.json` und `package-lock.json` sind unberührt
(GEMESSEN, `git diff --stat` über beide: null Zeilen).

**DIE VIER GATES, alle grün, VOR dem Diff gefahren:** `tsc --noEmit` (Exit 0) · `lint`
(0 Fehler; die eine Warnung liegt vorbestehend in `tracking/consent.test.ts` und wurde
nicht angefasst) · `vitest run` · `build` (Exit 0, dieselben sechs Routen wie vorher).
**Testzahl vorher/nachher, GEMESSEN:** 60 Dateien / 1158 Tests -> 61 Dateien / 1179 Tests.
Kein Bestandstest ist geändert worden, keiner wurde rot.

**DER BEWEIS UND SEINE GRENZE** — dieser Block ist WÖRTLICH aus dem Zuschnitt hierher
gewandert und steht seither nur noch hier:

> Der Beweis dieser Scheibe sind TESTS. **EINEN LIVE-TEST GIBT ES NICHT**, weil nichts
> gesendet und nichts gespeichert wird.
>
> **DAS IST EINE AUSNAHME VON EINER DAUERHAFTEN REGEL UND WIRD DESHALB HIER BENANNT:**
> "Jede Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung"
> (docs/immer-beachten.md). Sie gilt unverändert weiter und hat an dieser Scheibe keinen
> Gegenstand. **DIE ERSTE SCHEIBE MIT EINEM DATENPFAD SCHULDET IHN NACH.**
>
> **DIESE SCHULD IST NICHT DIESELBE WIE DIE VON 11.2a.** Jene gehört der
> Transport-Scheibe von 11.2 und wandert nicht hierher. Wer beide zusammenzieht, hält
> eine für erledigt, sobald die andere eingelöst ist.

**DIE VIER MUTATIONSPROBEN.** Jede wurde VOR dem Lauf angesagt, gefahren und
zurückgenommen; der Commit trägt keine. GEMESSEN am eigenen Lauf (CC, 2026-08-25).

- **M1 — Nonce fest statt zufällig.** VORHERSAGE: nur die Verschiedenheits-Klasse, EIN
  Test. ERGEBNIS: 1 von 21 rot, genau der vorhergesagte. Deckungsgleich, kein Überschuss.
- **M2 — Authentisierung entwertet** (Dechiffrieren auf reinen Strombetrieb
  zurückgestuft, Etikett ignoriert). VORHERSAGE: die gesamte Manipulations-Klasse plus der
  Falsch-Schlüssel-Test, plus — ausdrücklich mit angesagt — der Fehlerpfad-Test als Folge,
  weil dessen Aufbau auf einer scheiternden Entschlüsselung ruht. Also SECHS. ERGEBNIS:
  6 von 21 rot, exakt diese sechs.
  **DAS IST DIE TRAGENDE PROBE, und sie gehört ausgeschrieben: Rundlauf, leerer Klartext,
  Nicht-ASCII und OAuth-Grössenordnung blieben GRÜN. EIN GRÜNER RUNDLAUF SAGT ÜBER DEN
  SCHUTZ NICHTS** — das ist am Repo BEWIESEN, nicht behauptet.
- **M3 — Fehlerform verwässert** (`auth_failed` auf `no_key` umgebogen; die Gestalt genau
  des Ausgangs, den der Zuschnitt als schlimmsten benennt). VORHERSAGE: die
  Unterscheidbarkeits-Klasse, FÜNF Tests; der Fehlender-Schlüssel-Test bleibt grün, weil
  er echtes `no_key` prüft. ERGEBNIS: 5 von 21 rot, exakt diese fünf. Die vier
  Zusatztreffer gegenüber "nur der Falsch-Schlüssel-Test" melden DIESELBE Fehlerklasse
  (ein Fehlschlag berichtet die falsche Art) — Deckung, keine Kaskade.
- **M5 — Kennung nicht als Zusatzdaten gebunden** (`setAAD` in beiden Funktionen
  entfernt). VORHERSAGE: genau EIN Test, der Kopf-Manipulations-Test. ERGEBNIS: 1 von 21
  rot, genau dieser. **Damit ist belegt, dass er ein Einzelstück ist** — der Kommentar,
  der ihn als solchen benennt, war eine Vorhersage und ist jetzt eine Messung.

**DER BEFUND ZUM MUTATIONSMODELL, und er ist VORAB gemessen und nicht nachträglich
erklärt:** Das naheliegendere Modell für M2 — das Etikett gar nicht setzen — wäre ein
SCHLECHTES Modell gewesen. In einer Wegwerf-Probe VOR der Probe (CC, 2026-08-25, direkt
gegen `node:crypto`) wirft die Laufzeit dann bei JEDEM Aufruf, auch beim gültigen; die
Mutation hätte den Rundlauf mitgerissen und damit genau die Achse zerstört, die sie messen
soll. Gewählt wurde deshalb die Rückstufung auf Strombetrieb, die den Rundlauf grün lässt.
Das ist die Lektion (b) aus "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE" in der Anwendung
davor statt danach.

**DAS NUL-BYTE — ein Vorgang, kein Nebensatz.** Beim Schreiben der Testdatei ist in der
Ausgabeform-Prüfung ein LITERALES NUL-BYTE entstanden. **Alle 21 Tests waren damit grün,
`tsc` und `lint` ebenfalls.** Sichtbar wurde es allein bei einer Byte-Kontrolle der neu
geschriebenen Dateien; behoben ist es durch die Escape-Form, und die Byte-Kontrolle danach
zeigt NUL 0, CR 0, UTF-8 gültig. SELBST GEFUNDEN UND GEMELDET, nicht von einem Gate.
GEMESSEN am eigenen Lauf (CC, 2026-08-25). Die Verallgemeinerung steht NICHT hier, sondern
als Hebungs-Kandidat (1) weiter unten.

**DIE ZAHLKORREKTUR AUS STUFE 1.** Der Plan zu dieser Scheibe nannte "`import
\"server-only\"` — 32 Dateien" und führte `capi/google-payload.ts` als Beleg. **Beides war
falsch.** Die damalige Suche zählte Kommentar-Erwähnungen und `vi.mock`-Zeilen mit; jene
Datei ist ausdrücklich REIN und trägt einen Kopfsatz, der das schützt. NEU GEMESSEN (CC,
2026-08-25; Achse: `src/`, Zeilenanfang `import "server-only";`): **VIERZEHN
Produktivdateien, keine Testdatei.** **DIE ENTSCHEIDUNG ÄNDERT SICH DADURCH NICHT** — sie
ruhte auf der Achse "berührt die Datei ein Geheimnis", nicht auf der Zahl. Die Zahl stand
trotzdem als MESSUNG da und war keine.

**PROVENIENZ DIESES VERMERKS, je Angabe:** Commit-Nummer, Dateizahl, Testzahlen,
Gate-Ergebnisse, die vier Mutationsergebnisse, der Wegwerf-Befund zum Mutationsmodell, das
NUL-Byte und die Zahlkorrektur sind **GEMESSEN am eigenen Lauf (CC, 2026-08-25)**. Die
Wahl von K2 und T2 ist **OWNER/ARCHITEKT-ENTSCHEIDUNG (2026-08-25)**. **KEINE Messung an
einer laufenden Datenbank und kein Aufruf gegen eine fremde Schnittstelle** — diese
Scheibe berührt beides nicht.

## Entscheidungen, die über ihre Scheibe hinaus binden

Die drei bindenden Entscheidungen zum Geheimnis-Speicher stehen an docs/roadmap.md,
Eintrag 11.8, Block vom 2026-08-25, und werden hier NICHT verdoppelt. Was hier steht, ist
HIER entschieden worden.

1. **EINE KENNUNG WIRD NIE FÜR EINEN ANDEREN SCHLÜSSELWERT WIEDERVERWENDET.** Ein neuer
   Schlüssel bekommt eine NEUE Kennung; der alte bleibt zum Lesen stehen, bis nichts mehr
   unter ihm liegt.
   **DER GRUND:** Wer den Wert unter derselben Kennung austauscht, erzeugt genau die
   Verwechslung, die die Kennung verhindern soll — und sie fällt auf `auth_failed` zurück,
   also auf die Ununterscheidbarkeit zwischen "falscher Schlüssel" und "verändertes
   Chiffrat", die zu beseitigen ihr ganzer Zweck war. Die Kennung wäre dann eine Form ohne
   Wirkung: sie steht im Chiffrat, wird nachgeschlagen, findet einen Schlüssel — und der
   ist der falsche.
   **DIE GRENZE, UND SIE IST DER TRAGENDE TEIL DIESES EINTRAGS:** Der Code prüft, was er
   SEHEN kann — eine Konfiguration, die DIESELBE Kennung zweimal aufführt, wird abgewiesen
   (`readKeyMap` -> `bad_key`; ein Test deckt es). Er kann NICHT sehen, dass eine Kennung
   GESTERN einen anderen Wert trug. **Das ist eine Aussage über die ZEIT, und sie trägt
   allein diese Regel.** Wer sie für vom Code gedeckt hält, hält einen Ausschnitt für das
   Ganze.
   **WEN SIE BINDET:** jede spätere Runde, die einen Schlüssel wechselt — und die
   TRANSPORT-SCHEIBE, sobald sie Chiffrate erzeugt. Sie bindet ausserdem den Betrieb: die
   Umgebungsvariablen führen die Kennungen, nicht der Code.
   **WORAUF SIE RUHT:** auf der Antwort auf die Frage des Zuschnitts (s. "### Die Frage,
   die diese Scheibe ENTSCHEIDEN MUSSTE" oben). Ohne jene Frage ist diese Regel eine
   Formvorschrift ohne Zweck.
   PROVENIENZ: OWNER/ARCHITEKT-ENTSCHEIDUNG 2026-08-25. Dass der Code die
   Zeit-Achse nicht sehen kann, ist GEMESSEN am gebauten Stand (CC, 2026-08-25, Commit
   4b2ec09).

## Vorrat (gemeldet, nicht gebaut)

1. **DIE VIER BESTEHENDEN ZIELE TRAGEN IHR GEHEIMNIS HEUTE ALS KLARTEXT.** GEMESSEN am
   Migrations-SQL (CC, 2026-08-25, im Rahmen der Primärschlüssel-Prüfung dieser Phase):
   `project_secrets` trägt `secret text not null` als Skalar, und der Kommentar an dieser
   Spalte sagt es ausdrücklich — "KLARTEXT, wie in project_tokens. Tragende Kontrolle ist
   die ISOLATION (eigene Tabelle + RLS ohne jede Policy), NICHT Verschluesselung."
   **WAS SICH MIT DEN ENTSCHEIDUNGEN (1) UND (2) ÄNDERT:** Aus einem Dauerzustand wird ein
   ÜBERGANGSZUSTAND MIT ENDE. Die additive Form — neue Spalte neben dem Skalar, CHECK auf
   genau eines von beiden — macht ihn strukturell sichtbar, und jedes Ziel wandert
   einzeln.
   **WAS SICH NICHT ÄNDERT: DIE WANDERUNG IST NICHT ZUGESCHNITTEN UND NICHT TERMINIERT.**
   Sie ist keine Scheibe dieser Phase, kein Plan und kein Termin — sie ist GEMELDET.
   **KEINE EMPFEHLUNG**, weder zum Zeitpunkt noch zur Reihenfolge der vier Ziele.
   PROVENIENZ: der Klartext-Zustand GEMESSEN am Migrations-SQL (2026-08-25); die Folge
   aus den Entscheidungen ist eine ABLEITUNG aus docs/roadmap.md, Eintrag 11.8, Block vom
   2026-08-25 — keine Messung.

## Hebungs-Kandidaten

1. **EIN NEU GESCHRIEBENES ARTEFAKT KANN EIN NUL-BYTE TRAGEN, UND KEIN GATE MELDET ES.**
   BEFUND: Beim Schreiben von `src/lib/secrets/cipher.test.ts` ist ein literales NUL-Byte
   entstanden. Alle 21 Tests, `tsc` und `lint` waren damit GRÜN; sichtbar wurde es allein
   bei einer Byte-Kontrolle der neu geschriebenen Dateien. GEMESSEN am eigenen Lauf (CC,
   2026-08-25).
   GRUND FÜR DIE HEBUNG: Die bestehende Regel "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER
   UMGEBUNG STILL DAS CR" (docs/immer-beachten.md) kennt diese Fehlerklasse — samt der
   Gegenrichtung, in der ein NUL-Byte `grep` "Binary file … matches" melden lässt — nur an
   BEARBEITETEN Dateien. Hier ist sie beim NEUSCHREIBEN entstanden, also an einem Ort, den
   der Wortlaut jener Regel nicht adressiert: Sie verlangt nach dem Schreiben `git status`
   und den Ausschluss leerer Diffs — bei einer NEUEN Datei sagt beides nichts.
   WARUM ES EIN KANDIDAT IST UND KEIN SONDERFALL: Das hat mit Krypto und mit diesem
   Zuschnitt nichts zu tun. Es ist eine Eigenschaft JEDES erzeugten Artefakts, und die
   erste Scheibe jeder Phase erzeugt welche.
   **NICHT ENTSCHIEDEN:** ob das ein Zusatz zur bestehenden Regel wird oder eine eigene ·
   ob die Byte-Kontrolle eine Auflage an jede neue Datei wird · welchen Umfang sie hätte.
   KEINE EMPFEHLUNG.

2. **DER RÜCKNAHME-NACHWEIS EINER MUTATION SETZT EINE VERFOLGTE DATEI VORAUS.**
   BEFUND: Die vier Mutationsproben dieser Scheibe liefen auf einer Datei, die zu diesem
   Zeitpunkt UNTRACKED war. `git status` und `git diff --numstat` zeigen eine gesetzte
   oder zurückgenommene Mutation darin NICHT — sie melden nur "diese Datei ist neu".
   GEMESSEN am eigenen Lauf (CC, 2026-08-25).
   GRUND FÜR DIE HEBUNG: Die Regel nennt den Nachweis ("nach der Rücknahme IMMER
   `git status` prüfen und leere Diffs ausdrücklich ausschliessen"), **ohne seine
   Voraussetzung zu nennen**. Wer ihn befolgt, hält eine Prüfung für bestanden, die gar
   nicht stattgefunden hat — dieselbe Figur wie "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF
   DREI WEISEN HOHL", nur am Werkzeug statt am Test.
   WAS STATTDESSEN GETRAGEN HAT: ein INHALTLICHER Nachweis — Suche nach dem
   Mutations-Marker in beiden Dateien plus Byte-Kontrolle auf CR, NUL und Kodierung.
   WARUM ES EIN KANDIDAT IST: Jede erste Scheibe einer Phase baut NEUE Dateien, und genau
   dort ist der vorgesehene Nachweis blind. Das trifft die Bauform "reine Datei ohne
   Aufrufer", die in diesem Projekt inzwischen mehrfach als erste Scheibe vorkommt.
   **NICHT ENTSCHIEDEN:** ob die bestehende Regel ergänzt wird oder ob der inhaltliche
   Nachweis eine eigene Auflage bekommt · ob ein `git add -N` vor der Mutationsrunde der
   bessere Weg wäre (er machte die Datei verfolgt, ohne sie zu committen) — das ist
   GENANNT, NICHT empfohlen und NICHT gemessen.
