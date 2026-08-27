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
· Scheibe 11.8b — Das Schema der Geheimnis-Tabelle, in EINEM Zug
· Scheibe 11.8c — Die Form der mehrwertigen Nutzlast, als eigener Ort
· Scheibe 11.8d — Der Autorisierungs-Start
· Scheibe 11.8e — Rückkehr und Ablage
· Scheibe 11.8f — Der fünfte Zielwert im CHECK
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

## Scheibe 11.8b — Das Schema der Geheimnis-Tabelle, in EINEM Zug

**VOLLZOGEN AM 2026-08-26, Commits a8435e1 (Bau) und 00b6ade (Doku). DIE MIGRATION IST
GEFAHREN, DER LIVE-TEST IST BESTANDEN. DER ZUSCHNITT IST AB HIER VERDICHTET** — was mit
dem Vollzug abgelaufen ist, steht nicht mehr hier. Der Maßstab, gegen den er misst, ist
Vermerk 2 weiter unten.

**DIE ZITAT-PRÜFUNG VOR DER VERDICHTUNG, und sie fällt ANDERS AUS ALS BEI 11.8a:**
GEMESSEN am ganzen Repo (CC, 2026-08-26; Achse: alle Dateien ausser .git, node_modules,
.next, .playwright-mcp; gesucht wurde nach dem Dateinamen dieser Standdatei, nach jedem
der ZEHN Unterabschnitts-Titel dieses Zuschnitts und nach je einem markanten Satz daraus):
**KEIN EINZIGER Unterabschnitt dieses Zuschnitts wird von aussen zitiert.** Insbesondere
nennt der Kopf von `supabase/migrations/0025_project_secrets_schema.sql` WEDER diese Datei
NOCH einen ihrer Titel — er trägt seine Begründungen SELBST.
**DER UNTERSCHIED ZU 11.8a GEHÖRT DAZU, sonst liest jemand die Streichung als
Nachlässigkeit:** Dort ZEIGT `src/lib/secrets/cipher.ts` auf zwei Unterabschnitte, und
genau deshalb bleiben die zeichengleich stehen. Hier ist die Begründung IN das Artefakt
gewandert, statt aus ihm heraus zu zeigen — es gibt nichts, was durch eine Streichung tot
würde.
**ZWEI FUNDSTELLEN SEHEN WIE ZITATE AUS UND SIND KEINE, weil sie in die ANDERE Richtung
zeigen:** `supabase/migrations/0021_project_secrets.sql` trägt "der sichtbare Moment, in
dem ein Ziel real wird" und `docs/db-stand.md` trägt "Wer hier später einen Index
ergänzt" — **der Zuschnitt zitierte SIE**, nicht umgekehrt. Wer die Richtung nicht prüft,
hält eine eigene Anleihe für eine fremde Abhängigkeit und streicht nie etwas.

**WAS ABGELAUFEN IST, damit die Streichung erkennbar bleibt und nicht als Versehen:**
"### Der Gegenstand" · "### Die tragende Invariante" · "### Warum EIN Zug und nicht zwei" ·
"### Warum jetzt und nicht später" · "### Was die Probe trägt und was NICHT" ·
"### Was der Plan entscheiden muss und dieser Zuschnitt NICHT entscheidet" ·
"### Der Beweis: der LIVE-TEST — und er ist der erste dieser Phase" ·
"### Der Rückfallplan — er entschärft die Migration und ist KEINE Erlaubnis" · dazu DREI
der vier Punkte aus "### Was ausdrücklich NICHT drin ist" und die Provenienz-Zeile des
Zuschnitts.

**WO IHRE BINDENDEN RESTE LIEGEN — hier steht, wo, damit die Streichung nichts mitnimmt:**
- **Die fünf Achsen, ihre Reihenfolge, ihre SECHS Zwänge, das
  Constraint-statt-Index-Argument samt GELESEN-Provenienz UND seiner Grenze, die
  Idempotenz je Achse, das Abbruch-Verhalten, das lock_timeout und die Vor- und
  Nachprüfungen** stehen im KOPF von `supabase/migrations/0025_project_secrets_schema.sql`
  — ausführlicher, als sie je hier standen.
- **Die tragende Invariante** steht dort ebenfalls, und schärfer: "ZU KEINEM ZEITPUNKT",
  mit Z6 als benanntem Grund für die Reihenfolge.
- **Die Vorher-Werte, die Nachher-Werte und der Live-Test** stehen in Vermerk 2.
- **Die Backup-Fenster-Begründung** ist eine REGEL und steht in docs/db-regeln.md,
  "BACKUP-WIEDERVORLAGE HÄNGT AN MIGRATIONEN" — sie war hier nur angewandt.
- **Die sieben Zeilen je Ziel** stehen unverändert im Vorrat, Eintrag 2.
- **Der Rückfallplan** steht im Kopf von 0025 und in der Owner-Anleitung; sein Verbot
  ("keine Erlaubnis, die Zeilen vorher zu löschen") war eine Auflage an DIESEN Lauf und
  ist mit ihm abgelaufen. Die Falle dahinter fängt Probe 0 in
  supabase/checks/project-secrets-umstellung.sql unverändert weiter ab.

### Die offene Frage des Zuschnitts — VERORTET, NICHT BEANTWORTET

Der Zuschnitt führte GENAU EINE offene Frage: **was aus dem Löschpfad wird, wenn
`project_id` nullbar ist.** Sie ist **NICHT beantwortet** — wie der Löschpfad aussehen
soll, ist weiterhin nicht entschieden. Sie ist **VERORTET**, und hier steht, wo, damit sie
nicht als heimatlos offen stehenbleibt:

- **docs/offene-punkte.md, Eintrag "EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER
  KASKADE"** — der Volltext: die drei Antworten (Projektlöschung · Nutzerlöschung · wer sie
  je entfernen könnte), die vier gemessenen Fundstellen im Produktivcode, die
  Unterscheidung vertagt-gegen-offen und die vier NICHT gewählten Kandidaten.
- **CLAUDE.md, "## Offene Punkte"** — Titel und Trigger als Stub-Zeile.
- **Die Datenbank selbst** — als Spaltenkommentar auf `project_secrets.project_id`
  (0025, Schritt S6b). Er überlebt einen Rebuild, den ein Repo-Kommentar nicht überlebt.

**DER TRIGGER, wörtlich:** die erste Zeile mit `project_id IS NULL` — also der erste
Schreibpfad, der die Eigentums-Achse BENUTZT, statt sie offenzuhalten.
**WAS DER EINTRAG AUSDRÜCKLICH SAGT und was hier nicht verschwiegen wird:** Heute meldet
NICHTS den Eintritt. Der Zustand ist der Sache nach vertagt und der Beobachtung nach
offen; der Eintrag IST die Anzeige.

### Was 11.8b ausdrücklich NICHT enthielt — der EINE Punkt, der weiter bindet

**DER TITEL IST BEWUSST ANDERS FORMULIERT ALS DER GLEICHNAMIGE BEI 11.8a**, obwohl beide
dasselbe tun: Stünden sie zeichengleich da, träfe eine Suche nach dem Text zwei
Überschriften, und die erste wäre systematisch die falsche (s. "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" in docs/immer-beachten.md). Der
Absatz "WAS ABGELAUFEN IST" unter "## Scheibe 11.8a" zitiert den Titel von 11.8a wörtlich.

- **DER AUFRUFER DER CHIFFRIER-DATEI.** Er machte aus einer reinen Datei einen Pfad, und
  der Pfad wäre der Ingest. Die tragende Invariante von 11.8a gilt unverändert weiter.
  **DIESER PUNKT BINDET ALS EINZIGER ÜBER DIE SCHEIBE HINAUS, und er bindet genau die
  NÄCHSTE:** `src/lib/secrets/cipher.ts` hat im Produktivcode bis heute keinen Aufrufer.
  0025 hat den PLATZ für die Nutzlast geschaffen und ihn NICHT gefüllt — `secret_enc` ist
  in allen sieben Zeilen leer (GEMESSEN, s. Vermerk 2, `mit_chiffrat = 0`). Die
  Transport-Scheibe ist die, die beides zusammenführt; wer sie zuschneidet, bricht diese
  Invariante ABSICHTLICH und schreibt das hin.

**DIE DREI ÜBRIGEN PUNKTE SIND MIT DEM VOLLZUG ABGELAUFEN** — DIE WANDERUNG DER VIER
BESTEHENDEN ZIELE · 'google' IM target-CHECK · JEDE ÄNDERUNG AN `setCapiToken`. Sie
sagten, was NICHT in DIESE Scheibe gehört, und die Scheibe ist gebaut. **IHRE BINDENDEN
RESTE SIND NICHT VERLORENGEGANGEN, sondern stehen anderswo — hier steht, wo:** die
Wanderung als Vorrat, Eintrag 1 · die Constraint-Erweiterung je Ziel als dauerhafte Regel
in docs/immer-beachten.md, "JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE
CONSTRAINT-ERWEITERUNG MIT" · der Riegel um `setCapiToken` war eine Auflage an den
Live-Test dieser Scheibe und ist mit seinem Bestehen erledigt.

### Was diese Migration an docs/db-stand.md veraltet

**DIESER ABSCHNITT WIRD ALS EINZIGER NICHT VERDICHTET, UND DAS IST DER GRUND: er ist keine
abgelaufene Zuschnitt-Begründung, sondern eine NOCH NICHT ERLEDIGTE NACHZIEH-PFLICHT.**
Läuft er ab, verschwindet die einzige Stelle, die sagt, WAS in docs/db-stand.md überholt
ist. Er bleibt stehen, bis jene Datei fortgeschrieben ist.

**KEINE KOLLISION, aber eine Folge, und sie gehört benannt, damit sie niemand für einen
Widerspruch hält:** docs/db-stand.md trägt **FÜNF** Angaben, die nach dieser Migration
überholt sind. **Sie stehen hier als abzählbare Liste, weil dieser Abschnitt eine
NACHZIEH-PFLICHT ist und jemand sie abarbeiten wird** — wer eine Liste abarbeitet, die eine
falsche Zahl nennt, hört bei dieser Zahl auf:

1. **DIE ZEILE "TABELLE public.project_secrets"** führt den Primärschlüssel als das PAAR
   (project_id, target) — er liegt jetzt auf `id`.
2. **DIESELBE ZEILE** führt `secret` als NOT NULL — die Bedingung ist gelöst.
3. **DIE INDEX-ZEILE** sagt "AUSSER dem PK KEIN Index" — es sind jetzt ZWEI. Und der Satz
   daneben, der PK trage "genau den Zugriff des Lesepfads", gilt ab jetzt dem
   UNIQUE-Constraint, nicht dem Primärschlüssel.
4. **DIE FOOTGUN-ZEILE "PRIMÄRSCHLÜSSEL, DIE NICHT 'id' HEISSEN"** führt `project_secrets`
   mit dem PAAR. **DIESE IST DIE TEUERSTE DER FÜNF:** Eine Warnliste, die einen falschen
   Eintrag trägt, erzeugt genau den Fehler, vor dem sie warnt. Der Eintrag gehört RAUS,
   nicht korrigiert — die Tabelle heisst ab jetzt nicht mehr dazu.
5. **DIE ZEILE "MIGRATIONSSTAND"** endet bei 0024; 0025 ist seit dem 2026-08-26 angewandt
   und protokolliert.

**DAZU, und ausdrücklich NICHT als sechster Punkt gezählt:** Die Spaltenaufzählung in
Punkt 1 führt FÜNF Spalten — es sind jetzt SIEBEN (`id`, `secret_enc`). Ob das eine eigene
Angabe ist oder ein Teil der ersten, ist Geschmack und wird hier nicht entschieden; wer
Punkt 1 abarbeitet, sieht es ohnehin.

**KEINE DIESER FÜNF WIRD AUS DIESER SCHEIBE FORTGESCHRIEBEN**, sondern ausschliesslich aus
einer MESSUNG nach dem Lauf — so verlangt es jene Datei selbst.

**DIE MESSUNG LIEGT SEIT DEM 2026-08-26 VOR** (Owner; die Werte stehen in Vermerk 2). Das
Nachziehen von docs/db-stand.md ist damit MÖGLICH und in dieser Runde bewusst NICHT
geschehen — es ist ein eigener Vorgang an einer eigenen Datei.

**DIESE LISTE NANNTE BIS ZUM 2026-08-26 NUR DREI ANGABEN, und dass sie unvollständig WAR,
ist selbst der Befund** (GEMESSEN am Text von docs/db-stand.md, CC, 2026-08-26). Sie ist
am selben Tag auf FÜNF **ERSETZT** worden und ausdrücklich NICHT gestempelt. **DER GRUND
LIEGT IM CHARAKTER DES ABSCHNITTS, nicht in der Grösse des Fehlers:** Eine
Zustandsbeschreibung darf mit einem Stempel danebenstehen und altern — eine ABZUARBEITENDE
LISTE nicht, weil ihre Zahl das Abbruchkriterium dessen ist, der sie abarbeitet. Wer die
alte Fassung mit "drei" gelesen hätte, hätte bei Punkt 3 aufgehört und die Footgun-Zeile
stehen lassen, also ausgerechnet die teuerste.

**EINE DIESER ANGABEN IST MEHR ALS EINE ZUSTANDSANGABE:** "Wer hier später einen Index
ergänzt, sollte vorher einen Zugriff nennen können, der ihn braucht." **Der Zugriff ist
nennbar** — der Arbiter des upsert (`on_conflict` auf beide Spalten, GEMESSEN 2026-08-25,
am 2026-08-26 im Live-Test bestätigt) und die Gleichheit auf beiden Spalten im Lesepfad
(`getCapiConfigByTrackingKey`).

## Scheibe 11.8c — Die Form der mehrwertigen Nutzlast, als eigener Ort

**VOLLZOGEN AM 2026-08-26, Commit 8532e59. DER ZUSCHNITT IST AB HIER VERDICHTET** — was
mit dem Vollzug abgelaufen ist, steht nicht mehr hier. Der Maßstab, gegen den er misst,
ist Vermerk 3 weiter unten.

**DIE ZITAT-PRÜFUNG VOR DER VERDICHTUNG, UND SIE FÄLLT ANDERS AUS ALS BEI 11.8a UND
11.8b — DESHALB BLEIBT HIER MEHR STEHEN.** GEMESSEN am ganzen Repo (CC, 2026-08-26;
Achse: alle Dateien ausser .git, node_modules, .next, .playwright-mcp; gesucht nach dem
Dateinamen dieser Standdatei, nach jedem der SIEBEN Unterabschnitts-Titel dieses
Zuschnitts und nach den Auflagen-Nummern):

- **KEIN Unterabschnitts-TITEL wird von aussen zitiert** — sieben Titel, null Treffer.
- **ABER DIE AUFLAGEN WERDEN ES, UND ZWAR ÜBER IHRE NUMMER:** `oauth-payload.ts` und
  `oauth-payload.test.ts` berufen sich NEUNMAL auf "Auflage (1)" bzw. "Auflage (3)" —
  unter anderem in zwei `describe`-Namen der Testdatei. **Eine Nummer ist ein Zeiger wie
  ein Titel; sie ist nur schlechter zu suchen.**
- **DIE RICHTUNG, und sie ist hier die entscheidende Messung:** `oauth-payload.ts:20-21`
  sagt wörtlich, die drei Auflagen stünden dort "**und nicht nur in
  docs/aktiver-stand-11.8.md**". **Der Code behauptet also die Existenz dieser Kopie.**
  Wer sie streicht, macht einen Satz im Produktivcode falsch — und zwar still, weil kein
  Gate einen Kommentar prüft.
- **ZUM VERGLEICH DIE GEGENRICHTUNG, die bei 11.8b zweimal auftrat:** Der Zuschnitt
  zitiert seinerseits `0021_project_secrets.sql` und `docs/ziel-befunde.md`. Diese Zeiger
  sterben durch eine Streichung HIER nicht — sie zeigen nach draussen.

**FOLGE: "### Die drei Auflagen aus der Entscheidung" BLEIBT STEHEN** und ist der einzige
Unterabschnitt dieser Scheibe, dessen Überleben von AUSSEN erzwungen wird.

**WAS ABGELAUFEN IST, damit die Streichung erkennbar bleibt und nicht als Versehen:**
"### Der Gegenstand — eine reine Datei für die Form" ·
"### Die drei Fragen, die der Plan entscheidet und dieser Zuschnitt nicht" ·
"### Die tragende Invariante von 11.8c" ·
"### Der Beweis von 11.8c — Tests, und warum kein Live-Test" ·
"### Was 11.8c ausdrücklich ausschliesst, je mit Grund" ·
"### Der Pflicht-Hinweis der Phase — hier ohne Gegenstand" · und die Provenienz-Zeile
des Zuschnitts.

**WO IHRE BINDENDEN RESTE LIEGEN:**
- **Die Entscheidung für den eigenen Ort, ihre Begründung und die zwei verworfenen
  Alternativen** stehen im KOPF von `src/lib/secrets/oauth-payload.ts`, ausführlicher als
  hier — dazu die Fassungsmarken, der absolute Zeitpunkt, die Ablehnung unbekannter
  Felder und die Fehlerform, je mit Grund.
- **Der Gegeneinwand aus dem A/B-Präzedenzfall** steht in Vermerk 3; er ist die einzige
  Angabe des Zuschnitts, die im Code KEINEN Ort hat.
- **Die tragende Invariante** ist mit dem Vollzug zur MESSUNG geworden und steht als
  solche in Vermerk 3 (kein Aufrufer im Produktivcode, GEMESSEN).
- **Der Beweis und seine Grenze** stehen in Vermerk 3, samt der Schuld-Zuordnung.
- **Die Ausschlüsse** waren Auflagen an DIESEN Bau und sind mit ihm abgelaufen; der
  Aufrufer-Riegel lebt in der Invariante weiter.
- **Der Pflicht-Hinweis zur Sieben-Tage-Frist** gehört der PHASE, nicht dieser Scheibe —
  er steht unverändert an docs/roadmap.md, Eintrag 11.8, und greift bei der ersten
  Scheibe mit einer Live-Anleitung.

### Die drei Fragen des Zuschnitts — BEANTWORTET, und hier steht WO

Der Zuschnitt führte drei Fragen ausdrücklich als offen. **Alle drei sind am 2026-08-26
im Plan entschieden und im Bau umgesetzt worden**; keine steht mehr offen, und keine wird
hier verdoppelt:

- **WELCHE FELDER DIE NUTZLAST TRÄGT** → **VIER**, fester Satz. Die Felder selbst stehen
  am Typ `OAuthPayload` in `src/lib/secrets/oauth-payload.ts`, die Begründung für das
  vierte (die Zwei-Uhren-Lage) im Kommentar darüber, die Belege in docs/ziel-befunde.md.
  **Kurzfassung samt der Entscheidung gegen den Zugriffsbereich: Vermerk 3.**
- **OB DIE FORM IHRE EIGENE FASSUNGSMARKE TRÄGT** → **JA, zwei Marken auf zwei Achsen.**
  Begründung im Dateikopf unter "WARUM ZWEI FASSUNGSMARKEN". **Was daran über die Scheibe
  hinaus bindet, steht als Entscheidung (2) unter "## Entscheidungen, die über ihre
  Scheibe hinaus binden".**
- **WAS BEIM LESEN EINER UNBEKANNTEN ODER KAPUTTEN FORM GESCHIEHT** → **ein
  diskriminiertes Ergebnis, kein Wurf**, mit `unknown_version` und `bad_format` als
  getrennten Ausgängen. Begründung im Dateikopf unter "WIRFT NIE"; die harte Auflage
  liegt auf der Lese-Seite (Ingest-204-Containment).

### Die drei Auflagen aus der Entscheidung

Sie folgen aus der Begründung oben und stehen deshalb wörtlich hier, nicht als
Erschliessung:

1. **SIE WEISS NICHTS VON CHIFFRIERUNG.** Sie importiert die Chiffrier-Datei NICHT und
   wird von ihr NICHT importiert. Die beiden treffen sich erst bei einem späteren
   Aufrufer. **Das ist die Isolation, um derentwillen es diesen Ort überhaupt gibt** — wer
   einen der beiden Importe legt, hat die Entscheidung rückgängig gemacht, ohne sie
   anzufassen.
2. **SIE IST DER EINZIGE ORT, AN DEM DIE FORM FESTGELEGT WIRD.** Wer später einen ZWEITEN
   Weg baut, der Felder in die Spalte schreibt, hat die Entscheidung gebrochen — **und das
   ist der Prüfstein dieser Scheibe.** Nicht "die Datei existiert", sondern "sie ist die
   einzige".
3. **DIE ZEICHENKETTE MUSS DURCH DIE CHIFFRIER-DATEI PASSEN.** Deren Rundlauf ist gegen
   einen Klartext in der Grössenordnung einer OAuth-Nutzlast gemessen (Vermerk 1). **Der
   Zeichenvorrat der AUSGABE ist dort geregelt, der der EINGABE nicht** — was die Form
   erzeugt, muss ein gültiger Klartext sein. Diese Auflage ist die einzige der drei, die
   eine Eigenschaft an einem FREMDEN Stück Code prüft; sie gehört deshalb in die Tests
   dieser Scheibe und nicht in ein Kommentarversprechen.

## Scheibe 11.8d — Der Autorisierungs-Start

**VOLLZOGEN AM 2026-08-27, Commit c70bc07. DER LIVE-TEST IST BESTANDEN. DER ZUSCHNITT IST
AB HIER VERDICHTET** — was mit dem Vollzug abgelaufen ist, steht nicht mehr hier. Der
Maßstab, gegen den er misst, ist Vermerk 4 weiter unten.

**DER OAUTH-FLUSS WAR ALS EINE SCHEIBE GEFÜHRT UND IST IN ZWEI GETEILT** (ARCHITEKT,
2026-08-27): 11.8d endet, BEVOR Google zurückkehrt; 11.8e beginnt dort. **Dieser Satz
bleibt stehen, weil er die Herkunft von 11.8e ist** — ohne ihn steht jene Scheibe ohne
Grund da.

**DIE ZITAT-PRÜFUNG VOR DER VERDICHTUNG.** GEMESSEN am ganzen Repo (CC, 2026-08-27; Achse:
alle Dateien ausser .git, node_modules, .next, .playwright-mcp; gesucht nach jedem der ACHT
Unterabschnitts-Titel dieses Zuschnitts und nach dem Dateinamen dieser Standdatei):
- **GENAU EIN Titel wird von aussen zitiert** — "### Die drei Invarianten, die 11.8d
  unberührt lässt", zitiert vom Zuschnitt 11.8e. Er bleibt deshalb stehen; das Zitat wäre
  sonst tot.
- **DER PRODUKTIVCODE ZITIERT NUR DIE `##`-ÜBERSCHRIFTEN**, nicht die Unterabschnitte:
  `src/lib/oauth/google-authorize.ts` nennt die Datei, `src/app/api/oauth/google/start/route.ts`
  nennt "## Scheibe 11.8d" und "## Scheibe 11.8e". Beide überleben die Verdichtung.
- Die übrigen SIEBEN Titel haben **null** Treffer von aussen.

**WAS ABGELAUFEN IST, damit die Streichung erkennbar bleibt und nicht als Versehen:**
"### Der Gegenstand von 11.8d" · "### Wo der Schnitt liegt" ·
"### Was 11.8d ausdrücklich ausschliesst" ·
"### Der Beweis — der Live-Test und seine EINE Achse" ·
"### Eine ungemessene Annahme, die als solche stehen bleibt" ·
"### Was der Plan entscheidet und dieser Zuschnitt NICHT" · und die Provenienz-Zeile des
Zuschnitts.

**WO IHRE BINDENDEN RESTE LIEGEN — hier steht, wo, damit die Streichung nichts mitnimmt:**
- **Der Gegenstand und der Schnittgrund** stehen im Kopf von
  `src/app/api/oauth/google/start/route.ts` ("WAS DIESE ROUTE TUT — und mehr nicht", "WAS
  SIE AUSDRÜCKLICH NICHT TUT"), ausführlicher als hier.
- **Die Ausschlüsse** waren Auflagen an DIESEN Bau und sind mit ihm abgelaufen; ihr
  bleibender Teil ist der Aufrufer-Riegel, und der lebt unverändert unter "### Die drei
  Invarianten" weiter — bewacht von den Tests T24 bis T26.
- **Der Beweis und seine EINE Achse** stehen in Vermerk 4, samt dem, was ein Erfolg dort
  belegt und was er ausdrücklich nicht belegt.
- **DIE UNGEMESSENE ANNAHME IST GEFALLEN** — der Browser nimmt das `__Host-`-Cookie auf
  `http://localhost` an. Sie ist damit keine Annahme mehr, sondern eine MESSUNG, und steht
  als solche in Vermerk 4, samt ihrer Grenze. **Genau deshalb steht sie hier nicht mehr:
  eine Annahme, die still zur Tatsache wird, ist von einer vergessenen nicht zu
  unterscheiden.**
- **Was der Plan entschied** — der Pfad der Route, der Scope-String, Name, Lebensdauer und
  Form des State-Cookies — steht jetzt IM CODE, mit Begründung an jeder Konstanten
  (`src/lib/oauth/google-authorize.ts`). Ein zweiter Ort wäre eine zweite Wahrheit.

### Die fünf Entscheidungen, die über die Scheibe hinaus binden

1. **DAS STATE-COOKIE TRÄGT ZWEI DINGE — den Zufallswert UND die Projekt-Kennung. Der
   `state`-Parameter in der URL trägt NUR den Zufallswert.**
   **DER GRUND:** Was durch eine FREMDE Weiterleitung reist, ist manipulierbar. Die
   Projekt-Kennung darf nie über Google laufen — sonst entscheidet der Rückkehrer, an
   welches Projekt das Zugangsdatum gebunden wird.
2. **`SameSite=Lax`, NICHT `Strict` — und der Grund gehört dazu, weil `Strict` wie die
   sicherere Wahl aussieht:** Die Rückkehr von Google ist eine TOP-LEVEL-NAVIGATION VON
   EINER FREMDEN SEITE. Bei `Strict` sendet der Browser das Cookie nicht mit, und der
   Callback wiese eine KORREKTE Autorisierung ab. **Die strengere Einstellung erzeugt hier
   also einen Fehlschlag, der wie ein Angriff aussieht.**
3. **`__Host-`-PRÄFIX, HOST-ONLY, `HttpOnly`, KURZLEBIG.**
   **DER PRÄFIX IST EINE DURCHSETZUNG, KEINE ZUSAGE:** `__Host-` erzwingt host-only, Pfad
   `/` und `Secure` — der BROWSER verwirft das Cookie, wenn eines der drei fehlt. Ein
   Server, der dasselbe verspricht, verspricht es nur.
   **WAS ES SCHÜTZT:** Der State ist das EINZIGE, was den Callback an genau DIESE
   Autorisierung bindet. Ohne host-only könnte ein auf einer SUBDOMAIN des App-Hosts
   gesetztes Cookie den State auf dem App-Host überschreiben — der Callback prüfte dann
   gegen einen untergeschobenen Wert. **Das ist Schutz gegen SITZUNGS-UNTERSCHIEBUNG im
   OAuth-Fluss, NICHT gegen Mandanten-Kopplung.**
   **DIE ABGRENZUNG, UND SIE IST DER WICHTIGERE TEIL: ES IST NICHT DIESELBE BEGRÜNDUNG WIE
   BEI `__Host-ps_v`.** Die Regel "HOST-ONLY-COOKIES AUF GETEILTEN WILDCARD-DOMAINS"
   (docs/immer-beachten.md) ruht AUSSCHLIESSLICH darauf, dass publayer.net als Wildcard
   alle Kundenprojekte trägt; ihr Schaden ist CROSS-TENANT, ihr Schutzgut die MESSUNG. Auf
   dem App-Host gibt es kein Projekt Y. **GLEICHE BAUFORM, ANDERER GRUND — wer sie
   zusammenzieht, streicht die eine, wenn die andere entfällt.**
   **DASS IM REPO KEINE FUNDSTELLE `__Host-` AUF DEM APP-HOST BEGRÜNDET, IST GEMESSEN**
   (CC, 2026-08-27; Achse: ganzes Repo ausser .git, node_modules, .next, .playwright-mcp,
   gesucht nach `__Host-`, host-only, hostonly, Domain-Attribut, nach den Cookie-Setzern im
   Produktivcode und nach "App-Host" zusammen mit "Cookie"): Alle sieben Fundstellen von
   `__Host-` meinen das Varianten-Cookie der SERVING-Domain; die Session-Cookies des
   App-Hosts reichen ihre Attribute unverändert aus `@supabase/ssr` durch (`setAll` in
   `src/lib/supabase/middleware.ts` und `src/lib/supabase/server.ts`), ohne ein Wort zu
   Domain-Attribut oder Präfix. **DIE REICHWEITE DIESES NICHT-TREFFERS GEHÖRT DAZU: Er
   sagt NICHT, dass es keinen Grund gäbe — er sagt, dass im Repo keiner aufgeschrieben
   ist.** Der Grund oben ist damit der erste.
4. **DIE OWNERSHIP DES PROJEKTS WIRD VOR DEM START GEPRÜFT, nicht erst bei der Ablage.**
   Sonst bindet ein angemeldeter Nutzer ein Zugangsdatum an ein FREMDES Projekt — und die
   Prüfung käme erst, wenn der Zugang schon beschafft ist.
5. **`GOOGLE_OAUTH_REDIRECT_URI` WIRD GELESEN, NIE AUS DEM ANFRAGE-HOST ABGELEITET.** Die
   Begründung steht in docs/roadmap.md, Eintrag 11.8, Block vom 2026-08-27, und wird hier
   **NICHT verdoppelt**.

### Die drei Invarianten, die 11.8d unberührt lässt

**ES SIND DREI AUSSAGEN, NICHT EINE — und sie sehen beim Lesen wie eine aus.** Sie bekommen
hier je einen NAMEN, damit beim späteren Vermerk prüfbar ist, WELCHE gefallen ist:

- **AUFRUFER-RIEGEL CIPHER** — `src/lib/secrets/cipher.ts` hat im PRODUKTIVCODE keinen
  Aufrufer; nur ihre Tests rufen sie. Wortlaut: `## Scheibe 11.8a` →
  `### Die tragende Invariante` (dort die tragende Invariante jener Scheibe).
- **AUFRUFER-RIEGEL FORM** — `src/lib/secrets/oauth-payload.ts` hat im PRODUKTIVCODE keinen
  Aufrufer. Wortlaut: `## Scheibe 11.8c`, Abschnitt "WO IHRE BINDENDEN RESTE LIEGEN"
  ("Die tragende Invariante ist mit dem Vollzug zur MESSUNG geworden"), ausgeschrieben in
  Vermerk 3.
- **IMPORT-RIEGEL** — die zwei Dateien importieren einander NICHT. Wortlaut:
  `## Scheibe 11.8c` → `### Die drei Auflagen aus der Entscheidung`, Punkt 1 ("Sie
  importiert die Chiffrier-Datei NICHT und wird von ihr NICHT importiert").

**IN 11.8d BLEIBEN ALLE DREI UNBERÜHRT.** Sie fallen erst in 11.8e, und dort mit Ansage.
**WARUM DIE TRENNUNG NICHT PEDANTERIE IST:** "Keinen Aufrufer haben" ist eine Aussage über
den ÜBRIGEN Produktivcode, "einander nicht importieren" eine über die BEZIEHUNG der zwei
Dateien. Sie können einzeln fallen — ein dritter Aufrufer bräche die zwei Riegel, ohne den
Import-Riegel anzutasten.
**DER PRÜFSTEIN DIESER SCHEIBE BLEIBT DERSELBE:** Wer einen der beiden Importe legt, hat
nicht mehr 11.8d gebaut.

PROVENIENZ DES VERBLIEBENEN ZUSCHNITTS: Die Teilung in zwei Scheiben, die fünf
Entscheidungen und die Benennung der drei Invarianten sind **ARCHITEKTEN-VORGABE vom
2026-08-27**. Die Zitat-Prüfung ist **GEMESSEN am Repo (CC, 2026-08-27)**. Die
Anbieter-Angaben, auf die die Entscheidungen sich stützen, sind **GELESEN**
(docs/ziel-befunde.md, Google-Abschnitt, Teile (at) bis (ay)) und ausdrücklich NICHT
gemessen.

## Scheibe 11.8e — Rückkehr und Ablage

**ZUGESCHNITTEN AM 2026-08-27, NICHT GEBAUT.** Auch hier gibt es keinen Vermerk, kein
Ergebnis und keine Messung.

### Der Gegenstand von 11.8e

Die Callback-Route: Prüfung des `state` gegen das Cookie · Tausch des Codes gegen
Zugangs- und Erneuerungs-Token · Nutzlast über `oauth-payload` · Chiffrat über `cipher` ·
Ablage in `project_secrets.secret_enc`.

### Die Auflage, die diese Scheibe definiert

**HIER TREFFEN SICH DIE ZWEI REINEN DATEIEN ZUM ERSTEN MAL IM PRODUKTIVCODE.** Dass bis
heute keine die andere importiert, ist **NICHT die tragende Invariante von 11.8c**, sondern
deren **Auflage (1)** — der IMPORT-RIEGEL. Die drei Namen und ihre Fundstellen stehen an
11.8d unter "### Die drei Invarianten, die 11.8d unberührt lässt" und werden hier NICHT
verdoppelt.

**11.8e BRICHT ALLE DREI: AUFRUFER-RIEGEL CIPHER, AUFRUFER-RIEGEL FORM UND IMPORT-RIEGEL.**
Die Callback-Route ruft beide Dateien auf, und die Nutzlast geht durch die Chiffrierung —
damit hat jede der zwei einen Aufrufer im Produktivcode, und die Isolation der beiden
voneinander endet.
**EIN BRUCH MIT ANSAGE IST ETWAS ANDERES ALS EIN BEILÄUFIGER, DESHALB STEHT ER HIER.**

**DIE ANSAGE WAR BISHER UNVOLLSTÄNDIG, UND DAS IST DER TEIL, DER SONST ÜBERSEHEN WIRD:**
Der Satz im Zuschnitt von 11.8b ("wer sie zuschneidet, bricht diese Invariante ABSICHTLICH
und schreibt das hin") kündigt **GENAU EINEN** der drei Brüche an — den AUFRUFER-RIEGEL
CIPHER. Am Text ist das entscheidbar: Jener Absatz benennt "die tragende Invariante von
11.8a", schreibt sie als "`cipher.ts` hat im Produktivcode bis heute keinen Aufrufer" aus
und nennt `oauth-payload.ts` mit keinem Wort. **FÜR DIE ZWEI ANDEREN ERGING NIE EINE
ANSAGE. SIE ERGEHT HIERMIT.** Ohne diesen Satz sieht der Bruch später vollständig
vorweggenommen aus, und niemand prüft, ob zwei davon unbemerkt geschahen.

**ZUM AUSDRUCK "TRANSPORT-SCHEIBE" IN JENEM SATZ — UNGEKLÄRT, UND ER BLEIBT ES:** Der
BESCHREIBUNG nach passt er auf 11.8e ("die beides zusammenführt" — die Chiffrier-Datei und
den von 0025 geschaffenen, leeren Platz `project_secrets.secret_enc`). Dem NAMEN nach ist
er MEHRDEUTIG: dieselbe Datei meint an VIER anderen Stellen ausdrücklich die
"Transport-Scheibe **von 11.2**", also die Scheibe, die den Live-Nachweis von 11.2a
nachschuldet. **11.8e stützt sich auf die BESCHREIBUNG, nicht auf den NAMEN.** Die vier
Stellen werden NICHT angefasst; die Mehrdeutigkeit ist GEMELDET, nicht behoben.

### Das Eigentum — OWNER-ENTSCHEIDUNG, 2026-08-27

**DAS ZUGANGSDATUM WIRD MIT GESETZTER `project_id` ABGELEGT.**
**DER GRUND:** Eine Zeile mit `project_id IS NULL` läge AUSSERHALB JEDER KASKADE — weder
Projekt- noch Nutzerlöschung erfasst sie, und kein Pfad der Anwendung kann sie lesen oder
löschen (docs/offene-punkte.md, "EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE").
**DER DORTIGE TRIGGER TRITT MIT DIESER WAHL AUSDRÜCKLICH NICHT EIN** — er lautet "die
erste Zeile mit `project_id IS NULL`", und diese Scheibe erzeugt keine.
**DIE GRENZE, und sie ist der Teil, der sonst übersehen wird:** Damit ist die Entscheidung
über eine NUTZER-Achse NICHT getroffen, sondern VERTAGT. Die nullbare Spalte bleibt als
benannte billige Absicherung stehen. **Fällig wird die Entscheidung, BEVOR der erste
FREMDE Kunde ein Zugangsdatum ablegt.** Ein Kunde mit mehreren Projekten autorisiert bis
dahin JE PROJEKT.

### Zwei Vorbedingungen, ohne die der Live-Test scheitert

· **`SECRET_ENC_KEYS` UND `SECRET_ENC_ACTIVE_KEY_ID` MÜSSEN GESETZT SEIN — lokal UND in
  Vercel. SIE SIND SELBST ZU ERZEUGEN; kein Anbieter liefert sie.**
  **DIE GENAUE FORM — Länge, Kodierung, Trennung zweier Schlüssel in einem Wert — IST AN
  `src/lib/secrets/cipher.ts` ZU MESSEN, NICHT ANZUNEHMEN.** Sie steht in keinem Dokument,
  und **hier steht sie bewusst auch nicht**: eine abgeschriebene Form wäre eine zweite
  Wahrheit neben dem Code, der sie durchsetzt.
  **WAS LOKAL CHIFFRIERT WURDE, IST IN PRODUKTION NICHT LESBAR:** Der Wert, unter dem
  autorisiert wird, muss der sein, unter dem gelesen wird.
· **IM PUBLISHING-STATUS "TESTING" LEBEN ERNEUERUNGS-TOKEN SIEBEN TAGE.** Das gehört in
  JEDE Live-Test-Anleitung dieser Phase — sonst wird ein abgelaufenes Token als Fehler
  gejagt und die Suche beginnt am falschen Ende. Der Pflicht-Hinweis der Phase steht an
  docs/roadmap.md, Eintrag 11.8; **11.8e ist die erste Scheibe, an der er einen Gegenstand
  hat.**

### Was 11.8e ausdrücklich ausschliesst

**DER AUFRUF GEGEN `events:ingest`.** Der TRÄGER des Zugangsdatums für diesen Endpunkt ist
**NICHT GEMESSEN** — gegen eine ungemessene Methode wird nicht geplant. Der Blocker ist an
docs/roadmap.md, Eintrag 11.8, als KLEINER GEWORDEN und NICHT ERLEDIGT vermerkt.

PROVENIENZ DIESES ZUSCHNITTS: Der Gegenstand, die Auflage zur Invariante, die zwei
Vorbedingungen und der Ausschluss sind **ARCHITEKTEN-VORGABE vom 2026-08-27**. Die
Eigentums-Wahl ist **OWNER-ENTSCHEIDUNG vom 2026-08-27**. Die Sieben-Tage-Frist ist
**GELESEN** (docs/ziel-befunde.md, Google-Abschnitt) und ausdrücklich NICHT gemessen.
**NICHTS ist gebaut, NICHTS ist gegen eine Google-Schnittstelle gemessen, und an der
laufenden Datenbank ist für diesen Zuschnitt nichts erhoben.**

### Nachtrag 2026-08-27 — sechs Ergänzungen aus zwei Doku-Läufen und aus 11.8f

**WARUM ER ANGEFÜGT UND NICHT EINGEARBEITET IST:** Der Zuschnitt darüber ist am 2026-08-27
geschrieben worden — VOR den Doku-Läufen 5 und 6 und VOR dem Vollzug von 11.8f. **Er ist
richtig geblieben; er wusste sechs Dinge noch nicht.** Kein Satz von ihm ist umformuliert
worden. Wer wissen will, was der Zuschnitt am Tag seiner Entstehung sagte, liest ihn
oben; was seither dazugekommen ist, steht hier.

**E1 — DIE ERSTE SPERRE IST GEFALLEN, UND SIE STAND NIE IN DIESEM ZUSCHNITT.**
Die Aufklärungsrunde zu 11.8e hatte an Gate G1 gemessen, dass `'google'` im CHECK
`project_secrets_target_valid` FEHLT — 11.8e war damit blockiert, denn ohne den Zielwert
kann keine Zeile abgelegt werden. **Vollzogen ist das NICHT hier, sondern in einer eigenen
Scheibe: 11.8f, Migration `0026_project_secrets_google.sql`, Commit 9133bcc, gefahren und
gegengeprobt am 2026-08-27 (Vermerk 5).**
**DER SATZ STEHT HIER, WEIL DIE SPERRE HIER GESUCHT WIRD:** Sie ist in der Aufklärung zu
DIESER Scheibe aufgedeckt worden, und der Zuschnitt darüber führt sie mit keinem Wort. Wer
sie im 11.8e-Text sucht, findet nichts und hält sie für offen. **Die Vorbedingung ist
erfüllt; hier ist nichts mehr zu tun.**

**E2 — DIE UMRECHNUNG DES ABLAUFS, UND DER BEZUGSPUNKT IST EINE ENTSCHEIDUNG UND KEINE
LESUNG.**
`expires_in` ist eine **RESTDAUER IN SEKUNDEN**, kein Zeitpunkt — GELESEN 2026-08-27
(docs/ziel-befunde.md, Google-Abschnitt, Lauf 6, Teil (ba)). `OAuthPayload.accessTokenExpiresAt`
verlangt einen **ABSOLUTEN** Wert; die Umrechnung liegt beim AUFRUFER, und der Kopf von
`src/lib/secrets/oauth-payload.ts` sieht sie ausdrücklich dort vor. **Der Aufrufer ist ab
11.8e die Callback-Route.**
**ENTSCHEIDUNG (ARCHITEKT, 2026-08-27): GERECHNET WIRD AB EMPFANG DER ANTWORT**, nicht ab
einem angenommenen Ausstellungszeitpunkt.
**DER GRUND GEHÖRT DAZU, sonst sieht die Wahl beliebig aus: DER BEZUGSPUNKT DER RESTDAUER
IST NICHT GELESEN.** Ob sie ab Ausstellung oder ab Empfang zählt, sagt keine gelesene
Seite (Lauf 6 weist es als Lücke 1 aus). Ab Empfang zu rechnen ist die **konservative**
Richtung: Der Zugang gilt dann eher zu früh als zu spät als abgelaufen. **Die Abweichung
ist die Laufzeit des Aufrufs** — und ein zu früh erneuerter Zugang kostet einen Aufruf, ein
zu spät erneuerter kostet einen fehlgeschlagenen Forward.

**E3 — EIN AUSGANG, DEN DER ZUSCHNITT NICHT KENNT: EINE ANTWORT OHNE `refresh_token`.**
GELESEN 2026-08-27 (Lauf 6, Teil (bb)): Das Feld kommt **NUR** bei `access_type=offline`,
und der Anbieter sagt es an drei Stellen. **11.8d SETZT den Parameter — damit ist die
Antwort aber nicht GARANTIERT**, und `p1` VERLANGT das Feld (`refreshToken` ist Pflicht und
darf nicht leer sein).
**DIE AUFLAGE AN DEN PLAN: Dieser Ausgang wird behandelt, und er darf NICHT als Erfolg
abgelegt werden.**
**WARUM DAS SCHÄRFER IST ALS EIN GEWÖHNLICHER FEHLERFALL:** Ein Zugang ohne
Erneuerungs-Token ist nach dem Ablauf des Zugangsdatums **tot**, und **niemand merkt es**,
bis irgendwann ein Forward scheitert. Als Erfolg abgelegt sähe die Zeile in der Oberfläche
aus wie jede andere konfigurierte — das ist genau die Klasse "konfiguriert und sendet
trotzdem nicht", die docs/offene-punkte.md bereits als eigenen Eintrag führt.
**WAS DER PLAN ENTSCHEIDET UND DIESER NACHTRAG NICHT:** was der Betreiber in diesem Fall
sieht, und ob überhaupt etwas abgelegt wird.

**E4 — DIE VERWEIGERUNG DURCH DEN NUTZER IST DER NORMALFALL, NICHT DER RAND.**
GELESEN 2026-08-27 (Lauf 6, Teil (be)): Lehnt der Nutzer ab, kehrt Google mit einem
**`error`-Parameter** an die Weiterleitungs-Adresse zurück. Der gelesene Wert ist
`access_denied` — **und die Seite schreibt selbst "e.g."**, es ist also ein BEISPIEL und
keine abschliessende Werteliste.
**FOLGE: Der Plan behandelt JEDEN `error`-Wert, nicht nur den einen.** Wer gegen
`access_denied` vergleicht, prüft gegen ein Beispiel — und jeder andere Wert fiele in den
Erfolgszweig.

**E5 — DIE REIHENFOLGE DER PRÜFUNGEN: `error` ZUERST, DANN `state`.**
**WAS ZURÜCKGENOMMEN WIRD (ARCHITEKT, 2026-08-27):** Der Plan-Prompt vom 2026-08-27 gab als
Prüfstein vor, der `state` werde geprüft, BEVOR die Route irgendetwas anderes tut. **Diese
Vorgabe gilt nicht mehr.** Es ist eine Sachkorrektur, kein Mechanismuswechsel.
**DER GRUND: OB GOOGLE BEI EINER VERWEIGERUNG DEN `state` MITSCHICKT, IST NICHT GELESEN** —
Lauf 6 weist es ausdrücklich als Lücke 3 aus; die Beispiel-URL der Anbieter-Seite zeigt ihn
nicht, und keine Zeile sagt es. **Prüft die Route `state` zuerst, weist sie eine ganz
normale Ablehnung als Sitzungsfehler ab:** Der Nutzer klickt "Nein" und bekommt eine
Meldung über einen Manipulationsverdacht.
**DIE NEUE REIHENFOLGE: `error` — dann `state` — dann alles Weitere.**
**WAS SICH DABEI NICHT ÄNDERT, UND DER SATZ MUSS DASTEHEN: VOR DEM CODE-TAUSCH STEHT DIE
`state`-PRÜFUNG WEITERHIN.** Das ist die Stelle, an der sie zählt. Ein `error`-Zweig holt
kein Token, tauscht nichts und schreibt nichts — **die Sicherheitsaussage der Scheibe
bleibt unberührt**, und die Entscheidung (1) an 11.8d (die Projekt-Kennung reist nie über
Google) ist von dieser Umstellung nicht berührt.
**DIE PFLICHT SELBST IST BEIM ANBIETER GELESEN** (Lauf 6, Teil (be), wörtlich): "Before
handling the OAuth 2.0 response on the server, you should confirm that the state received
from Google matches the state sent in the authorization request."

**E6 — EINE AUFLAGE, DIE IM BESTAND NIRGENDS STEHT: KEINE ANTWORTPARAMETER IN DER
ADRESSZEILE STEHEN LASSEN.**
GELESEN 2026-08-27 (Lauf 6, Teil (be)): Der Anbieter verlangt, der Server solle die Anfrage
zuerst verarbeiten und **dann auf eine URL OHNE die Antwortparameter weiterleiten**. Der
Grund, den er nennt: Skripte auf einer gerenderten Seite können die URL lesen, und der
**`Referer`-Header** kann den Autorisierungs-Code an fremde Ressourcen weitergeben.
**DAS GILT FÜR JEDEN AUSGANG DER ROUTE, AUCH DIE FEHLERAUSGÄNGE** — auch ein `error`-Wert
soll nicht in der Adresszeile stehenbleiben.
**DASS DIE AUFLAGE IM BESTAND FEHLT, IST GEMESSEN** (CC, 2026-08-27; Achse: die
Zeichenketten `Referer`, `Referrer` und "redirect to another URL" im Google-Abschnitt von
docs/ziel-befunde.md): NULL Treffer vor Lauf 6. **Sie ist neu, nicht übersehen.**

PROVENIENZ DIESES NACHTRAGS, je Angabe: **E1** ist **GEMESSEN** (Gate G1 der Aufklärung, CC,
2026-08-27) und **VOLLZOGEN** (Owner, 2026-08-27, SQL-Editor; s. Vermerk 5). Die
Anbieter-Angaben in **E2 bis E6** sind **GELESEN am 2026-08-27** (docs/ziel-befunde.md,
Google-Abschnitt, Lauf 6, Teile (ba), (bb) und (be)) und ausdrücklich **NICHT gemessen** —
es ist kein Aufruf gegen eine Google-Schnittstelle gefahren. Der Bezugspunkt in **E2** und
die Reihenfolge in **E5** sind **ARCHITEKTEN-ENTSCHEIDUNGEN vom 2026-08-27**. Der
Nicht-Treffer in **E6** ist **GEMESSEN am Repo (CC, 2026-08-27)**. **NICHTS ist gebaut.**

## Scheibe 11.8f — Der fünfte Zielwert im CHECK

**VOLLZOGEN AM 2026-08-27, Commit 9133bcc. DIE MIGRATION IST GEFAHREN, DIE GEGENPROBE IST
BESTANDEN. DER ZUSCHNITT IST AB HIER VERDICHTET** — was mit dem Vollzug abgelaufen ist,
steht nicht mehr hier. Der Maßstab, gegen den er misst, ist Vermerk 5 weiter unten.

**SIE STEHT HINTER 11.8e UND IST VOR IHR GELAUFEN — und dieser Satz bleibt stehen, weil die
Reihenfolge in dieser Datei sonst als Ablauf gelesen wird.** Die Position ist NUMERISCH
(a, b, c, d, e, f) und sagt über den Zeitpunkt nichts. **Seit dem 2026-08-27 ist der
Unterschied kein Plan mehr, sondern ein Zustand: 11.8f IST vollzogen, 11.8e ist es NICHT.**
Wer die Datei von oben nach unten als Fahrplan liest, hält 11.8e für die nächste offene
Scheibe und 11.8f für die übernächste — und beides ist falsch herum. **DER SATZ BLEIBT,
SOLANGE 11.8e UNGEBAUT IST.**

**HERKUNFT DIESER SCHEIBE, und sie bleibt stehen, weil sie erklärt, warum es sie gibt:**
Sie ist aus einer Aufklärung zu 11.8e entstanden, nicht geplant gewesen. Gate G1 jener
Runde (CC, 2026-08-27) hat gemessen, dass der Zielwert fehlt; damit war 11.8e **blockiert**,
und die Aufteilung ist die Antwort darauf. **ARCHITEKTEN-ENTSCHEIDUNG vom 2026-08-27.**

**DIE ZITAT-PRÜFUNG VOR DER VERDICHTUNG.** GEMESSEN am ganzen Repo (CC, 2026-08-27; Achse:
alle Dateien ausser .git, node_modules, .next, .playwright-mcp; gesucht nach jedem der NEUN
Unterabschnitts-Titel dieses Zuschnitts): **KEIN EINZIGER wird von aussen zitiert** — alle
neun haben ihren einzigen Treffer in dieser Datei. `0026_project_secrets_google.sql` und
die Probe nennen die Scheibe **11.8f** als Namen, nicht einen ihrer Unterabschnitte.
**EINE STELLE WÄRE DURCH DIE VERDICHTUNG DOCH TOT GEWORDEN, und sie ist im selben Zug
behoben:** Der Warnsatz oben verwies auf einen Titel, der jetzt abläuft. Der Verweis ist
entfernt, statt auf eine gestrichene Überschrift zu zeigen.

**WAS ABGELAUFEN IST, damit die Streichung erkennbar bleibt und nicht als Versehen** — acht
Unterabschnitte, hier ohne die Marke `###` aufgezählt, damit eine Suche nach einer
Überschrift nicht zuerst in dieser Liste landet (Hebungs-Kandidat 8, in eigener Sache
angewandt): Der Gegenstand von 11.8f · Die Bauform, dreimal gelebt · Der Befund und seine
Provenienz · Was ohne sie passiert · Die Einordnung als vorhergesagter Fall · Was 11.8f
ausdrücklich ausschliesst · Die Reihenfolge als Auflage · Der Beweis in zwei Richtungen ·
dazu die Provenienz-Zeile des Zuschnitts.

**WO IHRE BINDENDEN RESTE LIEGEN — hier steht, wo, damit die Streichung nichts mitnimmt:**
- **Der Gegenstand, die Bauform, die Reihenfolge-Auflage und die Einordnung** stehen im KOPF
  von `supabase/migrations/0026_project_secrets_google.sql`, ausführlicher als sie je hier
  standen — einschliesslich des Punktes, den keine der vier Vorgänger-Dateien trägt: **was
  der Katalog-Guard NICHT leistet.** Eine angewandte Migration wird nicht umgeschrieben; der
  Kopf ist damit der haltbarere Ort.
- **Der Befund** — dass `'google'` fehlte — ist mit dem Lauf **erledigt**. Vorher- und
  Nachher-Wortlaut stehen in Vermerk 5, den heutigen Stand trägt `docs/db-stand.md`.
- **Was ohne sie passiert wäre** ist gegenstandslos: sie ist gelaufen.
- **Der Beweis in zwei Richtungen** steht in Vermerk 5, samt dem, was jede Richtung
  ausschliesst — und samt der offenen Angabe, die dabei geschlossen wurde.
- **Die Anleitung zur Gegenprobe** lebt in `supabase/checks/project-secrets-target-check.sql`
  weiter, FALLE (2), in der Transaktions-Form. Sie ist wiederverwendbar; ein sechstes Ziel
  braucht sie unverändert.

### Warum eine EIGENE Scheibe und nicht der erste Schritt von 11.8e

**DER ERSTE GRUND IST DIE ZWEIDEUTIGKEIT EINES GO.** Eine Migration wird im SQL-Editor
gefahren, ein Code-Stand wird gepusht — zwei Vorgänge, zwei Zeitpunkte, zwei Hände. Steckt
beides in EINER Scheibe, hängt an einem einzigen GO zweierlei, und **geht dazwischen etwas
schief, ist der Stand nicht mehr eindeutig**: Migration gelaufen und Code nicht? Umgekehrt?
Als eigene Scheibe hat sie ihren **eigenen Vermerk** und ihren **eigenen Beweis**, und der
Stand ist an beiden ablesbar. **0022, 0023 und 0024 sind genau so gelaufen** — jede eine
eigene Migration mit eigenem Vollzug.

**DER ZWEITE GRUND IST DIE RICHTUNG DES SCHADENS.** Der erweiterte CHECK ist **ohne Code,
der ihn nutzt, ein NO-OP** — er erlaubt einen Wert, den niemand schreibt. Jetzt gefahren
ist er also **gefahrlos**. Die umgekehrte Reihenfolge — Code zuerst — wäre **FAIL-OPEN**:
Der Schreibpfad liefe gegen eine Datenbank, die den Wert nicht kennt, und scheiterte im
laufenden Betrieb statt im Editor.

**WAS DIESER ABSCHNITT ÜBER 11.8f HINAUS BINDET, und deshalb steht er als einziger noch
hier:** Die zwei Gründe gelten JEDER künftigen Scheibe, die eine Migration und den Code
dazu trägt — nicht nur dieser. Sie sind am 2026-08-27 zum ersten Mal ausgeschrieben worden;
0022 bis 0024 sind ihnen gefolgt, ohne dass jemand sie benannt hatte.

PROVENIENZ DES VERBLIEBENEN ZUSCHNITTS: Die Aufteilung in eine eigene Scheibe und ihre
zwei Gründe sind **ARCHITEKTEN-ENTSCHEIDUNG vom 2026-08-27**. Die Zitat-Prüfung ist
**GEMESSEN am Repo (CC, 2026-08-27)**. Der Vollzug selbst — der Lauf, die Gegenprobe und
alle Messwerte — steht in Vermerk 5 und ist **GEMESSEN (Owner, 2026-08-27, SQL-Editor)**.

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

**ZUSATZ VOM 2026-08-26 — DER ABSATZ DARÜBER BLEIBT WÖRTLICH UND WIRD NICHT ERSETZT.** Er
ist das Protokoll seines Tages, und an jenem Tag hat die Escape-Form die Datei
tatsächlich sauber bekommen; die Byte-Kontrolle danach zeigte NUL 0. **WAS DER ZUSATZ
HINZUFÜGT, IST EINE MESSUNG VON EINEM ANDEREN TAG, KEINE KORREKTUR VON JENEM.**

**BEIM ZWEITEN ANLAUF HAT DIE ESCAPE-FORM NICHT GETRAGEN.** In Scheibe 11.8c ist dieselbe
Fehlerklasse erneut aufgetreten (fünf NUL-Bytes in `oauth-payload.test.ts`, alle vier
Gates grün). **Der Reparaturversuch nach genau diesem Rezept — die Escape-Form — wurde auf
demselben Schreibweg INTERPRETIERT:** Auf der Platte standen danach wieder echte
Leerzeichen und echte NUL-Bytes. **AUF DIESEM WEG ÜBERLEBT WEDER DAS LITERALE
SONDERZEICHEN NOCH SEIN ESCAPE.** GEMESSEN am eigenen Lauf (CC, 2026-08-26), zweimal
hintereinander.

**WAS TRÄGT: das Zeichen im Code BAUEN statt es hinzuschreiben** — `String.fromCharCode`.
Reines ASCII, an dem kein Werkzeug etwas umdeuten kann, weil es nichts zu deuten gibt. Die
Fundstelle steht in `src/lib/secrets/oauth-payload.test.ts`, samt der Geschichte beider
Anläufe.

**WARUM DAS HIER STEHT UND NICHT NUR AM KANDIDATEN:** Wer den Absatz darüber liest, hält
die Escape-Form für das Rezept — er hat ja gerade gelesen, dass sie funktioniert hat. Der
Zusatz muss dort stehen, wo der falsche Schluss entsteht, nicht nur dort, wo die Lehre
abgelegt ist.

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

### Vermerk 2 — Scheibe 11.8b, Commits a8435e1 und 00b6ade (2026-08-26)

**WAS GEBAUT WURDE:** EINE Migration, `supabase/migrations/0025_project_secrets_schema.sql`
(460 Zeilen), die fünf Achsen an `public.project_secrets` in EINEM `do`-Block setzt, mit
einem `lock_timeout` davor und dem Protokoll-Insert als letzter Anweisung. **ZWEI COMMITS,
GETRENNT NACH DER COMMIT-KONVENTION und nicht aus Ordnungsliebe:** `a8435e1` (feat(db),
nur die Migration) und `00b6ade` (docs(claude), CLAUDE.md +3 und docs/offene-punkte.md
+56). Beide gepusht. Die Trennung folgt "docs(claude)-Commits bleiben GETRENNT von
feat/fix-Commits" — eine Doku-Änderung im Feature-Commit ist später nicht mehr auffindbar.

**KEIN CODE, KEINE TESTDATEI, KEINE BESTEHENDE MIGRATION BERÜHRT** — GEMESSEN am Diff
(CC, 2026-08-26): drei Dateien im Vorgang, `git status --porcelain` ohne Treffer auf
`src/`, auf `*.test.*` oder auf `supabase/migrations/002[1-4]`. **Die vier Gates waren
grün** (`tsc --noEmit` · `lint`, 0 Fehler, die eine Warnung liegt vorbestehend in
`tracking/consent.test.ts` · `vitest run` · `build`), und **die Testzahl ist mit 61
Dateien / 1179 Tests exakt der Stand aus Vermerk 1** — das ist der eigentliche Beleg des
Absatzes: an Tests und Code hat diese Scheibe nichts getan.

**DIE MIGRATION IST GEFAHREN. Sie lief DURCH — kein Abbruch, keine
Sperr-Zeitüberschreitung.** GEMESSEN (Owner, 2026-08-26).

**DIE VORHER-WERTE, vor dem Lauf erhoben, weil sie danach nicht mehr herstellbar sind:**
V0 — `0024` vom 2026-08-17 vorhanden, `0025` nicht. V1 — `zeilen 7`, `ohne_secret 0`,
Fingerabdruck `459685c7…`; je Ziel meta 4 · linkedin 2 · tiktok 1. V2 — Primärschlüssel
auf dem PAAR (project_id, target), `secret` NOT NULL, KEINE Spalte `id`, KEINE Spalte
`secret_enc`. V3 — PostgreSQL **17.6**.

**DIE NACHHER-WERTE, alle fünf Achsen EINZELN abgelesen:**
- **N1 (Achsen 1, 2, 4a, 4b):** `secret_enc text` YES · `secret text` YES · `project_id
  uuid` YES · `id uuid` NO mit `gen_random_uuid()` als Default.
- **N2 (Achsen 3, 4a, 5):** `project_secrets_pkey` als PRIMARY KEY (id), und **genau ein**
  Constraint mit `contype = 'p'` · `project_secrets_project_id_target_key` als **UNIQUE
  NULLS NOT DISTINCT (project_id, target)** — **der Wortlaut steht da**, und er war die
  benannte Falle: ohne ihn wäre die Eigentums-Achse nicht offen, sondern nur nullbar ·
  `project_secrets_secret_genau_eines` als CHECK · `project_secrets_target_valid` und der
  Fremdschlüssel unverändert.
- **N3:** genau ZWEI Indizes. **Und schärfer als verlangt:** der Unique-Index trägt
  `NULLS NOT DISTINCT` auch im Definitionstext, nicht nur am Constraint — damit ist die
  Achse auf zwei unabhängigen Sichten belegt statt auf einer.
- **N4:** `zeilen 7` · `ohne_secret 0` · `mit_chiffrat 0` · `ohne_projekt 0` ·
  `verschiedene_ids 7` · **Fingerabdruck IDENTISCH zu V1**.
- **N5:** `0025` protokolliert, `applied_at 2026-08-26 07:18:41`.

**DIE EINZIGE POSTGRES-ANNAHME DIESER MIGRATION IST NACHGEMESSEN STATT GEGLAUBT.** Der
Kopf der Datei führte sie ausdrücklich als "NICHT gemessen und NICHT gelesen": dass ein
`add column ... not null default gen_random_uuid()` die Bestandszeilen mit VERSCHIEDENEN
Werten füllt. **`verschiedene_ids = 7`** — der Default hat jede der sieben Zeilen mit
einem eigenen Wert versehen. Die Annahme ist damit keine mehr. **Das ist der Grund, warum
sie überhaupt in der Datei stand**: eine benannte Annahme bekommt eine Nachmessung, eine
unbenannte bekommt keine.

**DER FINGERABDRUCK IST IDENTISCH — die sieben Geheimnisse haben den Lauf UNVERÄNDERT
überstanden, belegt und nicht angenommen.** Die Gegenprobe trägt aus einem benannten
Grund ZWEI Zahlen nebeneinander: Verlöre eine Zeile ihr `secret`, entfiele `md5(NULL)`
lautlos aus dem `string_agg` — der Fingerabdruck änderte sich, während `zeilen` weiterhin
7 zeigte. Erst `ohne_secret = 0` daneben trennt "ein Wert hat sich geändert" von "ein Wert
ist verschwunden". Beide trafen ihre Erwartung.

**EIN NEBENBEFUND SCHLIESST EINE ANGABE, DIE DER PLAN ALS OFFEN FÜHRTE:** Der
Fremdschlüssel heisst **`project_secrets_project_id_fkey`**. Der Plan führte den Namen als
am Repo NICHT entscheidbar — 0021 deklariert ihn inline über `references`, und
docs/db-stand.md nennt ihn ohne Namen. Jetzt ist er **GEMESSEN** (Owner, 2026-08-26). Die
Migration hat ihn nicht angefasst; die Angabe fiel bei N2 ab.

#### Der LIVE-TEST — er schliesst die Achse, die keine Probe schliessen konnte

**GEMESSEN vom Owner am 2026-08-26.**

**DIE REGRESSION:** Zweimal für dasselbe Paar gespeichert. Ergebnis: **EINE Zeile**, `id`
**a2b63840 unverändert**, Länge **14 → 28**, `updated_at` gewandert, `created_at`
unverändert. Damit sind vier Dinge einzeln belegt: der Arbiter greift (eine Zeile statt
zwei) · es war ein UPDATE und kein Löschen-und-Neu (die `id` bleibt) · der zweite Wert
steht drin (die Länge) · der Trigger `project_secrets_set_updated_at` lebt weiter.

**DER TRAGENDE TEIL, und er ist STÄRKER ALS GEPLANT:** `created_at` trägt den
**2026-08-13**. Die aktualisierte Zeile ist ein **BESTANDSDATENSATZ AUS DER ZEIT VOR DER
MIGRATION** — kein frisch angelegter, an dem ein Insert dasselbe Bild ergäbe. Der Upsert
hat sie AKTUALISIERT, obwohl `setCapiToken` den künstlichen Schlüssel nicht kennt und
nicht mitsendet. **Der Zuschnitt hatte nur "eine Zeile, zweiter Wert drin" verlangt; was
tatsächlich gemessen wurde, deckt zusätzlich den Übergang vom alten in den neuen
Schlüssel.**

**DIE FOLGE:** supabase-js erzeugt den Arbiter genau so, wie PostgREST ihn braucht. Die
Supabase-JS-Aussage "Primary keys must be included in values to use upsert" trifft diesen
Fall NICHT. **Das war die Achse, von der der Zuschnitt sagte, nur der Live-Test könne sie
schliessen** — eine zweite Probe hätte wieder PostgREST gemessen und wäre an der Frage
vorbeigelaufen.

**DER LESEPFAD:** Conversion am 2026-08-26 um 09:51:55 ausgelöst; Server- und
Browser-Ereignis kommen an und werden über die geteilte eventID dedupliziert.

**DAMIT IST DIE SCHULD AUS 11.8a EINGELÖST** — "DIE ERSTE SCHEIBE MIT EINEM DATENPFAD
SCHULDET IHN NACH". **NICHT eingelöst ist die von 11.2a**; jene gehört der
Transport-Scheibe von 11.2 und wandert nicht hierher. Wer beide zusammenzieht, hält eine
für erledigt, sobald die andere eingelöst ist.

**PROVENIENZ DIESES VERMERKS, je Angabe:** Die Vorher- und Nachher-Werte, der Durchlauf
ohne Abbruch, der gesamte Live-Test und der Name des Fremdschlüssels sind **GEMESSEN
(Owner, 2026-08-26)**. Die Commit-Nummern, die Dateizahl, der Diff-Umfang, die
Gate-Ergebnisse und die Testzahl sind **GEMESSEN am eigenen Lauf (CC, 2026-08-26)**. Die
Deutung des `created_at`-Befundes als "Bestandsdatensatz aus der Zeit vor der Migration"
ist eine **ABLEITUNG** aus dem gemessenen Datum, keine eigene Messung. **KEIN Aufruf gegen
eine fremde Schnittstelle durch CC** — der Anbieter-Abgleich im Lesepfad lief beim Owner.

### Vermerk 3 — Scheibe 11.8c, Commit 8532e59 (2026-08-26)

**WAS GEBAUT WURDE:** ZWEI neue Dateien — `src/lib/secrets/oauth-payload.ts` (383 Zeilen)
mit `formatOAuthPayload` und `parseOAuthPayload`, dazu `oauth-payload.test.ts` (488
Zeilen) mit **43 Tests**. **KEIN AUFRUFER IM PRODUKTIVCODE** — GEMESSEN (CC, 2026-08-26;
Achse: `src/` über *.ts und *.tsx, gesucht nach dem Modulpfad und nach beiden
Funktionsnamen ausserhalb der zwei neuen Dateien): kein Treffer. Keine bestehende Datei
geändert (`git diff --stat` leer), `package.json` unberührt, keine Migration, kein OAuth,
kein Netz.

**DIE VIER GATES, alle grün:** `tsc --noEmit` (Exit 0) · `lint` (0 Fehler; die eine
Warnung liegt vorbestehend in `tracking/consent.test.ts`) · `vitest run` · `build` (Exit
0, dieselben sechs Routen). **Testzahl vorher/nachher, GEMESSEN: 61 Dateien / 1179 Tests
-> 62 Dateien / 1222 Tests.** Kein Bestandstest ist geändert worden, keiner wurde rot.

**DIE DREI FRAGEN DES ZUSCHNITTS, ENTSCHIEDEN — kurz; die Begründungen stehen im Kopf von
`oauth-payload.ts` und werden hier NICHT verdoppelt:**

- **DER FELDSATZ IST FEST, mit VIER Feldern** — Zugangsdatum, sein Ablauf,
  Erneuerungs-Token, dessen Ablauf. **Das vierte war im Zuschnitt nicht vorgesehen** und
  kam aus dem Plan: Die Zwei-Uhren-Lage ist bei BEIDEN gelesenen Anbietern belegt (Google
  eine Stunde gegen sieben Tage im Testing, LinkedIn zwei Monate gegen zwölf). Ein
  einzelnes Ablauf-Feld könnte "abgelaufen, aber erneuerbar" nicht von "endgültig weg"
  trennen. **Der Zugriffsbereich gehört NICHT dazu** — er wird zum Senden nicht gebraucht
  und ist je Ziel im Code festgelegt, nicht je Zeile. **UNBEKANNTE FELDER WERDEN ZUR
  LAUFZEIT ABGEWIESEN**, weil TypeScript überzählige Eigenschaften nur an
  Objekt-Literalen prüft.
- **ZWEI FASSUNGSMARKEN AUF ZWEI ACHSEN** — `p1` in der Nutzlast, `v1` im Chiffrat. Was
  daran über diese Scheibe hinaus bindet, steht als Entscheidung (2) weiter unten.
- **DISKRIMINIERTES ERGEBNIS, KEIN WURF**, in beiden Richtungen; `unknown_version` und
  `bad_format` sind getrennte Ausgänge. Die harte Auflage liegt auf der LESE-Seite: der
  spätere Lesepfad ist der Ingest, und dort gilt das 204-Containment.

**DIE LADEKLASSE IST `server-only`, UND DER TRAGENDE GRUND IST DER ZWEITE:** Die
Zweck-Achse allein (`redact.ts` entfernt Geheimnisse und ist rein — diese Datei macht sie
haltbar) lädt zu der Gegenrede ein, die Datei sehe ja nur Zeichenketten. **DIE KLASSE IST
EINE UNTERGRENZE: sie einzusetzen, wo rein gereicht hätte, ist NIE ein Verstoss —
umgekehrt schon.** Bei einer Datei, die Zugangsdaten formt, ist das die richtige Richtung
des Irrtums. **Dieser Satz ist das, was die Klasse gegen eine spätere Aufräumrunde hält**;
ohne ihn liest sie jemand als zu streng und entfernt sie. Ein Test (T14) bewacht die
Marke, weil ihr Entfernen durch kein Gate fiele.

**DIE FÜNF MUTATIONSPROBEN.** Jede wurde VOR dem Lauf angesagt, gefahren und
zurückgenommen; der Commit trägt keine. GEMESSEN am eigenen Lauf (CC, 2026-08-26). **Die
Rücknahme ist INHALTLICH nachgewiesen — die Dateien waren untracked, `git status` hätte
nur "neu" gemeldet** (das ist Hebungs-Kandidat 2 in der Anwendung): Prüfsumme identisch
zur Sicherung vor der ersten Mutation, null Vorkommen der Marker.

- **M5 — die Ablehnung unbekannter Felder entfernt.** VORHERSAGE: T15 und T15c, T15b
  bleibt grün. ERGEBNIS: 2 von 43 rot, genau diese. Deckungsgleich. **Das ist die
  Pflicht-Probe: die Auflage, an der die Owner-Entscheidung hängt, hat damit einen
  Wächter und ist kein Kommentar.**
- **M2 — Fassungsprüfung beim Lesen ignoriert.** VORHERSAGE: T10 und T10c, T10b grün.
  ERGEBNIS: 2 rot, genau diese. Deckungsgleich.
- **M4 — "unbekannt" auf denselben Ausgang wie ein fehlender Wert.** VORHERSAGE: nur T2.
  ERGEBNIS: 1 rot, genau dieser. Deckungsgleich.
- **M1 — die Feld-Neutralisierung entfernt (base64url als Durchreiche).** VORHERSAGE: nur
  die Trennzeichen-Klasse, also T6 und T3b. **ERGEBNIS: DREI rot — T6, T7 und T3b, also
  EINER MEHR als vorhergesagt.**
  **GEPRÜFT STATT VERBUCHT, wie es die Regel verlangt:** Melden alle drei dieselbe
  Fehlerklasse? Ja. Die Mutation entfernt EINE Schutzmassnahme, die ZWEI Eigenschaften
  trägt — Trennzeichen-Sicherheit UND ASCII-Sicherheit. T6 scheitert an der Teilezahl, T7
  am Zeichenvorrat, T3b an beidem; alle drei enden in `bad_format`. **Das ist Deckung,
  keine Kaskade.**
  **DIE VORHERSAGE WAR ZU ENG, und das ist der Befund:** Es war nur die Separator-Achse
  benannt und übersehen, dass base64url zugleich die ASCII-Sicherheit trägt, die Auflage
  (3) verlangt. **UNERWARTETES ROT IST GENAUSO EIN BEFUND WIE UNERWARTETES GRÜN** — es
  fällt nur seltener auf, weil Rot nach Erfolg aussieht.
- **M3 — die Teilezahl-Prüfung beim Lesen entfernt.** VORHERSAGE: die `bad_format`-Klasse,
  ausdrücklich als Klasse und nicht als Zahl. **ERGEBNIS: DREI der VIER T4-Fälle rot —
  "zu viele Teile" BLIEB GRÜN. Das war der eigentliche Fund dieser Runde.**
  **DIE URSACHE WURDE UNTERSCHIEDEN, BEVOR ETWAS VERSTÄRKT WURDE:** Es waren KEINE anderen
  Tests rot als die gemeinten — also kein Zeichen für ein schlechtes Mutationsmodell. Der
  Test prüfte schlicht nichts Relevantes: Sein Eingabewert `p1.aaa.bbb.ccc.ddd.eee`
  scheitert ohnehin am unbrauchbaren Ablauf im dritten Teil. **Die Teilezahl war nie sein
  Prüfgegenstand.**
  **REPARIERT IST DIE WURZEL — DER EINGABEWERT — UND NICHT DIE ZUSICHERUNG.** T4b hängt
  jetzt einen sechsten Teil an einen GÜLTIGEN Fünfteiler; unter derselben, noch gesetzten
  Mutation fiel er sofort. **Wer stattdessen die Zusicherung anpasst, macht den Test zur
  gebauten Lösung passend und bucht eine Tautologie.** **Ohne diese Probe wäre eine
  angehängte Nutzlast still ignoriert worden.**

**ZWEI TESTS SIND GEGENÜBER DEM PLAN DAZUGEKOMMEN, und der Grund gehört dazu:** T6 und T7
stehen als EIGENE, REINE Wächter da. Im Plan hing die Trennzeichen-Klasse nur an T3b —
einem Test, der durch `cipher.ts` läuft. **Bräche die, fiele T3b aus dem FALSCHEN Grund.**
Ein Test, der nur über einen Dritten prüft, prüft den Dritten mit.

**DER BEWEIS UND SEINE GRENZE:** Der Beweis dieser Scheibe sind TESTS. **EINEN LIVE-TEST
GIBT ES NICHT**, weil nichts gesendet und nichts gespeichert wird. Die Regel "Jede
Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung"
(docs/immer-beachten.md) gilt unverändert weiter und hat an dieser Scheibe keinen
Gegenstand. **DIE SCHULD IST NICHT OFFEN: Sie ist mit Scheibe 11.8b am 2026-08-26
eingelöst worden (Vermerk 2). Wer sie hier erneut aufmacht, verdoppelt sie.** Die Schuld
von 11.2a gehört weiterhin der Transport-Scheibe von 11.2.

**DIE GEGENPROBE AM COMMITTETEN BLOB — und sie ist neu in diesem Projekt:** NUL und CR
sind nicht nur am Arbeitsbaum geprüft worden, sondern an den Objekten selbst
(`git show HEAD:<pfad>`): beide Dateien NUL 0, CR 0, Bytezahl identisch zum Arbeitsbaum
(17 557 und 21 949). **BEI EINER FEHLERKLASSE, DIE IN DIESER PHASE DREIMAL DURCH ALLE VIER
GATES GERUTSCHT IST, BEWEIST DER ARBEITSBAUM NUR, WAS AUF DER PLATTE LIEGT — NICHT, WAS
GEPACKT WURDE.** Die zwei Wege können auseinanderlaufen (Zeilenende-Filter, Attribute),
und genau dann ist der Arbeitsbaum die falsche Sicht.

**DER GEGENEINWAND ZUM ZUSCHNITT, hier festgehalten, weil er im Code keinen Ort hat**
(ARCHITEKT, 2026-08-26): Bei A/B ist entschieden worden, dass bei EXAKT ZWEI Fällen ein
benanntes Duplikat billiger und ehrlicher ist als eine Abstraktion auf Verdacht — und
heute gibt es EINEN Fall (Google; LinkedIn kommt, ist aber nicht da). Die Entscheidung
fiel trotzdem für den eigenen Ort, **weil hier nicht ABSTRAHIERT, sondern GETRENNT wird:
zwei Dinge, die verschieden altern — die Verschlüsselung nie, die Form mit jedem
Anbieter.** Er ist NICHT ausgeräumt, sondern abgewogen.

**PROVENIENZ DIESES VERMERKS, je Angabe:** Commit-Nummer, Dateizahl, Zeilenzahlen,
Testzahlen, Gate-Ergebnisse, die fünf Mutationsergebnisse, der Nicht-Treffer bei der
Aufrufer-Suche, die Zitat-Prüfung und die Blob-Gegenprobe sind **GEMESSEN am eigenen Lauf
(CC, 2026-08-26)**. Die Entscheidung für den eigenen Ort ist **OWNER (2026-08-26)**, die
Wahl der Ladeklasse und der Gegeneinwand sind **OWNER/ARCHITEKT (2026-08-26)**. Die
Anbieter-Angaben zu den Fristen sind **GELESEN** (docs/ziel-befunde.md, Google-Teil (ab)
und (an), LinkedIn-Teil (w)) und ausdrücklich NICHT gemessen. **KEINE Messung an einer
laufenden Datenbank und kein Aufruf gegen eine fremde Schnittstelle** — diese Scheibe
berührt beides nicht.

### Vermerk 4 — Scheibe 11.8d, Commit c70bc07 (2026-08-27)

**WAS GEBAUT WURDE:** DREI neue Dateien, **800 Zeilen** — `src/lib/oauth/google-authorize.ts`
(die reine Hälfte: Adresse, Zufallswert, Cookie, Umgebungslesung),
`src/app/api/oauth/google/start/route.ts` (die dünne Route) und
`src/lib/oauth/google-authorize.test.ts` mit **30 Tests**. **KEINE BESTEHENDE DATEI
BERÜHRT** — GEMESSEN (CC, 2026-08-27): `git diff --stat` vor dem Commit leer, drei
Einträge in `git status --porcelain --untracked-files=all`, kein vierter.

**DIE VIER GATES, alle grün, VOR dem Diff gefahren:** `tsc --noEmit` (Exit 0) · `lint`
(0 Fehler; die eine Warnung liegt vorbestehend in `tracking/consent.test.ts` und wurde
nicht angefasst) · `vitest run` · `build` (Exit 0, jetzt SIEBEN Routen statt sechs — neu
`ƒ /api/oauth/google/start`). **Testzahl vorher/nachher, GEMESSEN: 62 Dateien / 1222 Tests
-> 63 Dateien / 1252 Tests.** Kein Bestandstest ist geändert worden, keiner wurde rot.

#### Der LIVE-TEST — sieben Schritte, alle bestanden

**GEMESSEN vom OWNER am 2026-08-27.**

1. **REGRESSION ZUERST:** eine bestehende Seite lädt, `/api/e` meldet **204**. Nichts an
   der Auslieferung hat sich geändert.
2. **Googles Zustimmungsbildschirm wird erreicht.**
3. **`access_type=offline` und `prompt=consent` stehen in der Adresse,
   `include_granted_scopes` fehlt.**
4. **`__Host-ps_oauth` ist gesetzt** — HttpOnly, Secure, `SameSite=Lax`, die
   Projekt-Kennung im Wert.
5. **Die Projekt-Kennung steht weder in der Adresse noch im `state`.**
6. **Fremde UND ungültige Kennung liefern BEIDE HTTP 404 "Projekt nicht gefunden."** —
   von aussen nicht unterscheidbar, wie vorgesehen.
7. **Fehlende Client-Kennung: HTTP 500**, dazu eine Log-Zeile mit dem **NAMEN**
   `GOOGLE_OAUTH_CLIENT_ID` — **ohne Wert**.

**WAS SCHRITT 2 BEWEIST, und es ist mehr als ein bestandener Schritt: DREI EXTERN
GEHALTENE WERTE SIND AUF EINMAL BESTÄTIGT, die kein Gate im Repo abgleicht** — die
Client-Kennung, der Scope-String und die zeichengenaue Weiterleitungs-Adresse. Kein Test
und kein Build kann eine dieser drei prüfen; sie leben in der Cloud-Konsole und in der
Umgebung. **Das ist der Grund, warum diese Scheibe überhaupt einen Live-Test hat.**

**SCHRITT 5 IST DIE LIVE-SEITE DER TRAGENDEN ZUSICHERUNG.** Die Testseite ist
Mutationsprobe M2 (s. unten); erst beide zusammen decken sie — der Test beweist, dass der
Code sie hält, der Live-Schritt, dass sie beim echten Anbieter ankommt.

#### Die ungemessene Annahme des Zuschnitts IST GEFALLEN

**DER BROWSER NIMMT DAS `__Host-`-COOKIE AUF `http://localhost` AN.** Der Zuschnitt führte
das als **ANGENOMMEN und ausdrücklich NICHT GEMESSEN** (Architekt und Owner, 2026-08-27);
seit Schritt 4 ist es **GEMESSEN (Owner, 2026-08-27)**.

**DASS DAS HIER AUSDRÜCKLICH STEHT, IST DER PUNKT: Eine Annahme, die still zur Tatsache
wird, ist von einer vergessenen nicht zu unterscheiden.** Wer den Zuschnitt nach der
Verdichtung liest, findet sie dort nicht mehr — er muss hier sehen, dass sie eingelöst und
nicht übergangen wurde.

**IHRE GRENZE GEHÖRT DAZU UND WIRD NICHT KLEINGEREDET:** Gemessen ist sie **im Browser des
Owners**, nicht über Browser-Familien hinweg. Sie ist damit für DIESEN Testweg belegt und
nicht als allgemeine Eigenschaft.

**WAS DAMIT AUCH ERLEDIGT IST:** Die Kommentar-Fundstelle am Symbol `VARIANT_COOKIE_NAME`
in `src/lib/hosting/variant.ts`, die dieselbe Annahme trägt, ist nicht mehr die einzige
Stütze. Sie bleibt, was sie war — eine Behauptung; die Messung steht jetzt daneben.

#### Die zwei Pflicht-Mutationen und die zwei Verifikations-Mutationen

Jede wurde VOR dem Lauf angesagt, gefahren und zurückgenommen; der Commit trägt keine.
GEMESSEN am eigenen Lauf (CC, 2026-08-27). **Die Rücknahme ist INHALTLICH nachgewiesen —
die Dateien waren untracked, `git status` hätte nur "neu" gemeldet** (das ist
Hebungs-Kandidat 2 in der Anwendung): `sha256sum -c` gegen die vor der ersten Mutation
gesicherten Prüfsummen, dreimal OK, plus die Suche nach den Mutations-Markern.

- **M2 — die Projekt-Kennung reist zusätzlich in der URL** (umgesetzt als der realistische
  Fehlgriff: der Cookie-WERT als `state`). VORHERSAGE: genau ZWEI — T4 und T4b, beide
  derselben Fehlerklasse. ERGEBNIS: **2 von 30 rot, exakt diese zwei.** Deckungsgleich.
  **DAS IST DIE TRAGENDE PROBE:** An ihr hängt Entscheidung (1) des Zuschnitts, und sie
  ist damit ein Wächter statt eines Kommentars.
- **M3 — `SameSite=Lax` auf `Strict`.** VORHERSAGE: genau EINER, T12. ERGEBNIS: **1 von 30
  rot, genau dieser.** Damit ist T12 als Einzelstück belegt.
- **V-E1 — `prompt=consent` entfernt.** VORHERSAGE: genau T7. ERGEBNIS: **1 rot, genau
  dieser.**
- **V-E2 — `include_granted_scopes=true` hinzugefügt.** VORHERSAGE: genau T8. ERGEBNIS:
  **1 rot, genau dieser.** **Diese Probe hat einen eigenen Zweck:** Sie beweist, dass der
  Abwesenheits-Test T8 **NICHT trivial wahr** ist — er prüft gegen die tatsächlich gebaute
  Adresse, nicht gegen eine Liste, in der der Name gar nicht vorkommen könnte.

#### Ein hohler Test, VOR der Mutation selbst gefunden — und die Wurzel repariert

**T4 WAR TRIVIAL WAHR.** Er behauptete "die Projekt-Kennung kommt in der Adresse nirgends
vor" — aber `buildAuthorizeUrl` **nahm die Kennung gar nicht entgegen**. Es gab nichts, was
hätte durchsickern können; der Test konnte nicht fallen. Das ist Fall (2) aus "EINE
ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL" (docs/immer-beachten.md).

**REPARIERT IST DIE WURZEL, NICHT DIE ZUSICHERUNG.** Die reine Datei hat eine
Zusammensetzungs-Funktion `buildAuthorizeStart` bekommen: Sie erzeugt den Zufallswert
selbst, baut die Adresse NUR damit und das Cookie mit Zufall UND Kennung. **Damit ist die
Kennung am Ort des URL-Baus im Scope, und die Abwesenheit wird eine ECHTE Aussage.**
**DER ZWEITE GEWINN, und er ist der grössere:** Die Route sieht den Zufallswert gar nicht
mehr und kann den bequemen Fehlgriff nicht machen.

**OHNE DIESEN FUND WÄRE M2 GRÜN GEBLIEBEN**, und es wäre eine Deckung protokolliert
worden, die es nicht gibt. Der Befund fiel beim Nachlesen des eigenen Tests an, nicht durch
ein Gate.

#### Was der Live-Test NICHT zeigt — ausdrücklich

- **OB EINE WIEDERHOLTE AUTORISIERUNG EIN ERNEUERUNGS-TOKEN LIEFERT.** `prompt=consent`
  macht die Frage für den Bau UNSCHÄDLICH, beantwortet sie aber NICHT. Sie bleibt eine
  MESSFRAGE (docs/ziel-befunde.md, Google-Abschnitt, Teil (av)); das Instrument steht dort.
- **OB DER CODE-TAUSCH FUNKTIONIERT.** Die Rückkehr lief ins Leere, wie vorgesehen — der
  Autorisierungs-Code wurde nicht eingelöst.
- **OB EIN CHIFFRAT ENTSTEHT.** Diese Scheibe schreibt keine Zeile.

**ALLE DREI GEHÖREN 11.8e.** Wer eines davon diesem Vermerk zurechnet, hält die
Scheibengrenze für eine Lücke.

**DIE GEGENPROBE AM COMMITTETEN BLOB:** NUL und CR sind nicht nur am Arbeitsbaum geprüft
worden, sondern an den Objekten selbst (`git show HEAD:<pfad>`): alle drei Dateien NUL 0,
CR 0, UTF-8 gültig, Bytezahl identisch zum Arbeitsbaum (14 040 · 6 313 · 15 101). Bei einer
Fehlerklasse, die in dieser Phase dreimal durch alle vier Gates gerutscht ist, beweist der
Arbeitsbaum nur, was auf der Platte liegt — nicht, was gepackt wurde.

**PROVENIENZ DIESES VERMERKS, je Angabe:** Der gesamte Live-Test einschliesslich der
Cookie-Annahme auf `http://localhost` ist **GEMESSEN (Owner, 2026-08-27)**. Die
Commit-Nummer, die Dateizahl, die Zeilenzahl, die Testzahlen, die Gate-Ergebnisse, die vier
Mutationsergebnisse, die Zitat-Prüfung und die Blob-Gegenprobe sind **GEMESSEN am eigenen
Lauf (CC, 2026-08-27)**. Die Setzung von `prompt=consent` und das Weglassen von
`include_granted_scopes` sind **ARCHITEKTEN-ENTSCHEIDUNG (2026-08-27)**. Die
Anbieter-Angaben sind **GELESEN** (docs/ziel-befunde.md, Google-Abschnitt, Teile (at) bis
(ay)) und ausdrücklich NICHT gemessen. **KEINE Messung an einer laufenden Datenbank; der
einzige Aufruf gegen eine fremde Schnittstelle lief beim Owner im Browser, nicht durch CC.**

### Vermerk 5 — Scheibe 11.8f, Commit 9133bcc (2026-08-27)

**WAS GEBAUT WURDE:** EINE neue Migration,
`supabase/migrations/0026_project_secrets_google.sql`, die den CHECK
`project_secrets_target_valid` von VIER auf FÜNF Zielwerte setzt — Katalog-Guard auf
`conname` UND `conrelid`, `drop` + `add` in EINEM `do`-Block, Protokoll-Insert als letzte
Anweisung ausserhalb des Blocks. Dazu die Umstellung der Anleitung in
`supabase/checks/project-secrets-target-check.sql`. **ZWEI Dateien, kein Code, keine
Testdatei** — GEMESSEN am Diff (CC, 2026-08-27): zwei Einträge in
`git status --porcelain --untracked-files=all`, kein dritter.

**KEINE PIPELINE-GATES — und das ist kein Versäumnis, sondern gegenstandslos:** Diese
Scheibe berührt kein TypeScript und keinen Test. `tsc`, `lint`, `vitest` und `build`
wurden nicht gefahren und hätten nichts gemessen.

**DIE DREI LESE-ABFRAGEN DER PROBE SIND UNVERÄNDERT** — GEMESSEN am Diff: jede `+`- und
`-`-Zeile beginnt mit `--`, es ist ausschliesslich Kommentar geändert worden.

#### Der LAUF — sieben Schritte, alle bestanden

**GEMESSEN vom OWNER am 2026-08-27 im Supabase-SQL-Editor.**

1. **Probe 1 VOR dem Lauf: GENAU EINE Zeile, VIER Werte** (`meta`, `pinterest`, `tiktok`,
   `linkedin`).
2. **0026 lief fehlerfrei durch** — "Success. No rows returned".
3. **Probe 1 NACH dem Lauf: GENAU EINE Zeile, FÜNF Werte**, `'google'` im Wortlaut.
4. **(b)** `'googel'` **abgewiesen mit 23514 (check_violation) unter
   `project_secrets_target_valid`.** **(a)** `'google'` **angenommen**, per `rollback`
   wieder weg.
5. **Probe 2:** 0026 als jüngster Eintrag im Protokoll.
6. **Probe 3:** keine bleibende Zeile mit `'google'`.

**WAS SCHRITT 3 BEWEIST UND LEICHT ALS FORMSACHE GELESEN WIRD — es ist die ZEILENZAHL,
nicht der Wortlaut:** Sie schliesst den DOPPEL-CONSTRAINT-FALL aus. Das ist der eine
Fehlzustand, bei dem **der Lauf Erfolg meldet, der Protokoll-Eintrag entsteht, nichts rot
wird — und `'google'` trotzdem abgewiesen bliebe**, weil der Katalog-Guard bei einem
falschen Namen nicht gegriffen hätte und der alte Constraint danebenstünde. **Er ist damit
GEMESSEN ausgeschlossen und nicht erschlossen.** Der Kopf von 0026 beschreibt ihn; erst
diese eine Zahl entkräftet ihn.

**WAS SCHRITT 4b BEWEIST:** Nur die ABWEISUNGSRICHTUNG zeigt, dass der Constraint WIRKT.
**Ein `drop` ohne `add` hätte an Schritt 3 identisch ausgesehen** — `'google'` ginge durch,
und zwar deshalb, weil gar nichts mehr prüfte. Eine Probe, die nur den Erfolg misst, kann
einen entfernten Schutz nicht von einem erweiterten unterscheiden.

**DER ÜBERGANG IST DIESMAL GEMESSEN, NICHT ABGELEITET — und das ist der Unterschied zum
Lauf vom 2026-08-17.** Jene Messung trug eine ausdrückliche Grenze: *„Migration und Deploy
waren zum Messzeitpunkt BEREITS eingespielt, ein Ausgangswert VOR dem Lauf wurde also nicht
abgelesen. Gemessen ist, dass der Constraint HEUTE so lautet und wirkt — NICHT, dass 0024
den Übergang bewirkt hat."* **Hier wurde Probe 1 VOR und NACH dem Lauf gefahren** (Schritte
1 und 3), vier Werte gegen fünf. **Die Grenze, die dort galt, gilt für 0026 NICHT** — der
Übergang selbst ist belegt.

#### Eine offene Angabe ist geschlossen worden

**DER SUPABASE-SQL-EDITOR ZEIGT DEN CONSTRAINT-NAMEN IN DER FEHLERMELDUNG.**

Die Probe führte das ausdrücklich als **NICHT GEMESSEN** — *„ob der Editor den Namen zeigt,
ist nicht gemessen"* —, und die Erwartung war deshalb so formuliert, dass sie **ohne** den
Namen prüfbar blieb: `23514` genügte. **Seit Schritt 4b ist es GEMESSEN (Owner,
2026-08-27):** Die Meldung nannte `project_secrets_target_valid`.

**DASS DAS HIER STEHT, IST DER PUNKT — es ist dieselbe Figur wie bei der Cookie-Annahme in
Vermerk 4:** Eine Angabe, die als ungemessen ausgewiesen war und still zur Tatsache wird,
ist von einer vergessenen nicht zu unterscheiden. Die Probe ist im selben Zug nachgezogen.

**IHRE GRENZE GEHÖRT DAZU:** Gemessen ist es **im Supabase-SQL-Editor**, nicht über andere
Zugänge hinweg. Über `psql`, den JS-Client oder ein anderes Werkzeug sagt der Befund
NICHTS.

#### Was mit diesem Lauf sonst noch gilt

**DAS AUTOMATISCHE TAGES-BACKUP IST BIS ZUM NÄCHSTEN SNAPSHOT NICHT MEHR CODE-KOMPATIBEL**
— ein Restore in diesem Fenster brauchte ein manuelles Nachziehen von 0026
(docs/db-regeln.md, "BACKUP-WIEDERVORLAGE HÄNGT AN MIGRATIONEN, NICHT AM KALENDER"). Bei
einer additiven CHECK-Erweiterung ist das Fenster billig; **es ist trotzdem eines**, und es
steht hier, weil es sonst nirgends stünde.

#### Was der Lauf NICHT zeigt — ausdrücklich

- **OB 11.8e FUNKTIONIERT.** Diese Scheibe erlaubt einen Wert, den bis dahin **niemand
  schreibt**. Es gibt keinen Code, der `'google'` in `project_secrets` ablegt.
- **SIE RÄUMT DIE ANDERE BLOCKADE NICHT AUS.** Die Antwortfelder des Token-Tauschs sind
  weiterhin **ungemessen** (Gate G7 der Aufklärung zu 11.8e; docs/ziel-befunde.md,
  Google-Abschnitt, Teil (ay) nennt die Anfrage, nicht die Antwort). **11.8e bleibt
  blockiert**, und wer 0026 für die Freigabe hält, hat eine von zwei Sperren gelöst.

**PROVENIENZ DIESES VERMERKS, je Angabe:** Der gesamte Lauf — die sieben Schritte, die
Vorher- und Nachher-Werte, die Zeilenzahl, die Abweisung mit 23514 und der Constraint-Name
in der Fehlermeldung — ist **GEMESSEN (Owner, 2026-08-27, Supabase-SQL-Editor)**. Die
Commit-Nummer, der Diff-Umfang, die Zitat-Prüfung und der Nachweis, dass nur Kommentare der
Probe geändert wurden, sind **GEMESSEN am eigenen Lauf (CC, 2026-08-27)**. Die Aufteilung
in eine eigene Scheibe ist **ARCHITEKTEN-ENTSCHEIDUNG (2026-08-27)**. Die Backup-Folge ist
eine **ABLEITUNG** aus der Regel in docs/db-regeln.md und keine Messung. **KEIN Aufruf
gegen eine fremde Schnittstelle; CC hat die Datenbank zu keinem Zeitpunkt berührt — der
gesamte Lauf fand beim Owner statt.**

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

2. **EINE FASSUNGSMARKE DER NUTZLAST WIRD NIE FÜR EINE ANDERE FELDMENGE WIEDERVERWENDET.**
   Ändert sich der Feldsatz, bekommt die Form eine NEUE Marke; `p1` bleibt für immer die
   Feldmenge vom 2026-08-26.
   **WARUM DAS HIER STEHT UND NICHT NUR IM DATEIKOPF:** Der Kopf von
   `src/lib/secrets/oauth-payload.ts` erklärt ausführlich, WARUM es zwei Marken gibt —
   `p1` in der Nutzlast, `v1` im Chiffrat, auf zwei Achsen, die sich unabhängig bewegen.
   **Das ist im Code nachzulesen und braucht keinen zweiten Ort.** Was der Code NICHT
   sagen kann, ist die Aussage über die ZEIT: Er weist eine unbekannte Marke ab
   (`unknown_version`), aber er kann nicht sehen, dass `p1` GESTERN eine andere Feldmenge
   bezeichnet hat. **Ein unter derselben Marke geänderter Feldsatz wird nicht abgewiesen —
   er wird falsch gedeutet, und der Leser bekommt ein einwandfreies "ok".**
   **DER PRÜFSTEIN, an dem dieser Eintrag hängt und die zwei anderen Entscheidungen der
   Scheibe nicht:** Muss eine spätere Runde ihn kennen, um nichts kaputtzumachen? Ja — und
   zwar in einem Moment, den der Code nicht bewachen kann.
   **WEN SIE BINDET:** jede spätere Runde, die ein Feld hinzufügt, entfernt oder umdeutet;
   und ausdrücklich auch die, die eine DRITTE Marke einführen oder eine der zwei entfernen
   will — sie muss vorher wissen, dass die zwei auf VERSCHIEDENEN Achsen sitzen und nicht
   redundant sind.
   **ES IST DIESELBE DENKFIGUR WIE ENTSCHEIDUNG (1) DARÜBER, nur an der anderen Marke:**
   dort der Schlüssel, hier die Feldmenge. Beide Male ist es eine Aussage über die Zeit,
   und beide Male fällt sie auf einen ununterscheidbaren Ausgang zurück, wenn man sie
   bricht.
   PROVENIENZ: die zwei Marken sind OWNER-ENTSCHEIDUNG (2026-08-26) und im Bau umgesetzt
   (Commit 8532e59); dass der Code die Zeit-Achse nicht sehen kann, ist GEMESSEN am
   gebauten Stand (CC, 2026-08-26). Die Erhebung ZU EINER BINDENDEN ENTSCHEIDUNG ist
   ARCHITEKT (2026-08-26).
   **WAS AUSDRÜCKLICH NICHT HIERHER GEHOBEN WURDE, und der Satz gehört dazu, damit die
   Auswahl nachvollziehbar bleibt:** Die zwei anderen Entscheidungen dieser Scheibe — der
   FESTE FELDSATZ mit der Ablehnung unbekannter Felder und das DISKRIMINIERTE ERGEBNIS —
   binden ebenfalls über die Scheibe hinaus, stehen aber bereits an zwei dauerhaften Orten:
   im Kopf von `oauth-payload.ts` UND als Auflagen (2) und (3) im Zuschnitt, der nicht
   abgelaufen ist. Ein dritter Ort wäre eine zweite Wahrheit, die neben den beiden altert.

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

2. **`pinterest` STEHT IM target-CHECK UND TRÄGT NULL ZEILEN.** GEMESSEN (Owner,
   2026-08-25, im Zuge der Zeilenzählung für den Zuschnitt der Scheibe 11.8b): linkedin 2
   · meta 4 · tiktok 1 · **pinterest 0**.
   **WAS AM REPO NICHT ENTSCHEIDBAR IST:** ob das Ziel NIE konfiguriert war oder ob eine
   Zeile wieder entfernt wurde. Beide Zustände sehen heute identisch aus — die Tabelle
   führt kein Protokoll, und `removeCapiToken` löscht die Zeile ersatzlos.
   **FALLS ERSTERES:** Dann hätte der Pinterest-Adapter **nie live gesendet** und trüge
   eine offene LIVE-TEST-SCHULD — an einem Ziel, das im CHECK steht und damit
   konfigurierbar aussieht.
   **GEMELDET, NICHT GEPRÜFT.** Es ist keine Scheibe, kein Plan und kein Termin; die
   Prüfung wäre eine eigene Arbeit (Anbieter-Oberfläche oder Ereignis-Protokoll), und ich
   habe sie nicht gefahren. **KEINE EMPFEHLUNG**, weder zum Zeitpunkt noch dazu, was aus
   dem Befund folgen sollte.
   PROVENIENZ: die Zeilenzahlen GEMESSEN (Owner, 2026-08-25); die Folgerung "dann nie live
   gesendet" ist eine ABLEITUNG und ausdrücklich keine Messung.

3. **BEIDE ABLAUFZEITPUNKTE STECKEN IM CHIFFRAT.** Die Nutzlast trägt sie als Felder
   (`accessTokenExpiresAt` und `refreshTokenExpiresAt` in `src/lib/secrets/oauth-payload.ts`),
   und die Nutzlast geht verschlüsselt in `project_secrets.secret_enc`.
   **`project_secrets` TRÄGT KEINE ABLAUF-SPALTE** — GEMESSEN (CC, 2026-08-27): die sieben
   Spalten sind `project_id`, `target`, `secret`, `created_at`, `updated_at`, `secret_enc`,
   `id`; eine Suche über `0021_project_secrets.sql` und `0025_project_secrets_schema.sql`
   nach einer Ablauf-Spalte liefert keinen Treffer.
   **DIE FOLGE, und sie ist der ganze Eintrag:** Eine Überwachung, die wissen will, WELCHE
   Zugänge demnächst ablaufen, müsste **JEDE Zeile entschlüsseln**. Es gibt keine Spalte,
   über die sich das filtern oder sortieren liesse.
   **DAS IST KEIN ENTWURFSFEHLER, SONDERN DIE ANDERE SEITE EINER ENTSCHEIDUNG:** Der
   Ablauf steht in der Nutzlast, weil sie der eine Ort der Form ist; eine zweite,
   unverschlüsselte Kopie in einer Spalte wäre eine zweite Wahrheit, die neben dem Chiffrat
   altert.
   **HEUTE KEIN PROBLEM, UND AUSDRÜCKLICH KEIN BAUAUFTRAG.** Es gibt keine Überwachung, die
   das bräuchte, und keine Zeile mit einem Chiffrat.
   **WARUM DAS HIER STEHT UND NICHT ALS OFFENER PUNKT:** Ein offener Punkt braucht einen
   TRIGGER, und für diesen ist keiner benennbar, der nicht erfunden wäre. "Falls es je
   nötig wird" ist genau die Formulierung, die docs/offene-punkte.md nicht zulässt.
   PROVENIENZ: die fehlende Spalte und der Feldsatz der Nutzlast sind **GEMESSEN am Repo
   (CC, 2026-08-27)**, erhoben als Gate G9 der Aufklärungsrunde zu 11.8e. Die Folge für
   eine Überwachung ist eine **ABLEITUNG** daraus und keine Messung.

4. **EINE ANGABE OHNE AUFFINDBARE PROVENIENZ — "eine Stunde".** Der Kommentar über
   `OAuthPayload` in `src/lib/secrets/oauth-payload.ts` begründet den vierten Feldplatz mit
   der Zwei-Uhren-Lage und sagt dabei, **Google gebe dem Zugangsdatum "eine Stunde"**.
   **IM BESTAND IST DAFÜR KEINE QUELLE AUFFINDBAR** — GEMESSEN (CC, 2026-08-27; Achse: der
   Google-Abschnitt von docs/ziel-befunde.md, gesucht nach `Stunde`, `3600`, `one hour`,
   `60 Minuten`): kein Treffer, der die Lebensdauer des ZUGANGS-Tokens beträfe; die Treffer
   liegen sämtlich bei anderem (Rückfallfenster, Diagnostik-Verzögerung, GA-Fristen). Die
   einzige Zahl auf der in Lauf 6 gelesenen Seite ist **ein Beispielwert von 3920 Sekunden**,
   und das ist keine Stunde.
   **AUSDRÜCKLICH: SIE IST NICHT WIDERLEGT.** Sie kann aus einer Quelle stammen, die niemand
   in diese Datei geschrieben hat. Der Befund ist eine fehlende PROVENIENZ, kein falscher
   Satz — und die Unterscheidung ist der ganze Grund, warum dieser Eintrag im Vorrat steht
   und nicht als Richtigstellung gefahren wurde.
   **SIE TRÄGT AUCH NICHTS:** Die Zwei-Uhren-Lage ist über LinkedIn unabhängig belegt (zwei
   Monate gegen zwölf), und die Zahl wird an keiner Stelle verrechnet — kein Code liest sie,
   keine Entscheidung ruht auf ihr.
   **DER PRÜFPUNKT, und er ist der Grund, warum hier kein Trigger erfunden wird:** 11.8e
   rechnet den realen Ablauf aus `expires_in` (s. E2 im Nachtrag zu 11.8e). **Wer das baut,
   sieht den echten Wert** — und in diesem Moment bekommt die Angabe entweder eine Quelle
   oder sie verschwindet. Es braucht dafür keine eigene Arbeit.
   **KEINE EMPFEHLUNG**, was mit dem Satz zu geschehen hat; die Datei ist in der Runde, die
   diesen Eintrag erzeugt hat, ausdrücklich nicht angefasst worden.
   PROVENIENZ: der Nicht-Treffer ist **GEMESSEN am Repo (CC, 2026-08-27)** mit der Achse
   oben; dass die Angabe nichts trägt, ist eine **ABLEITUNG** (kein Aufrufer, keine
   Verrechnung) und keine Messung.

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

   **FORTGESCHRIEBEN AM 2026-08-26 — DER KANDIDAT IST ZUM ZWEITEN MAL EINGETRETEN UND HAT
   SICH VERSCHÄRFT. Der Text darüber bleibt unverändert; hier steht, was dazugekommen
   ist.** In Scheibe 11.8c sind beim Schreiben von `oauth-payload.test.ts` FÜNF NUL-Bytes
   entstanden — wieder aus Zeichen, die niemand als Sonderzeichen geschrieben hatte, und
   wieder mit allen VIER Gates grün. GEMESSEN am eigenen Lauf (CC, 2026-08-26).

   **ERSTE VERSCHÄRFUNG — DIE NAHELIEGENDE BEHEBUNG TRÄGT NICHT.** Der Kandidat beschrieb
   bisher eine FEHLERKLASSE. Jetzt beschreibt er zusätzlich, dass das Mittel, das Vermerk 1
   als Behebung protokolliert — die ESCAPE-FORM —, auf demselben Schreibweg INTERPRETIERT
   wird: Der Reparaturversuch setzte die Zeichen erneut ein, Leerzeichen wie NUL-Bytes.
   **AUF DIESEM WEG ÜBERLEBT WEDER DAS LITERALE SONDERZEICHEN NOCH SEIN ESCAPE.** Was
   trägt, ist das Zeichen im Code zu BAUEN statt es hinzuschreiben (`String.fromCharCode`).
   **EIN BEFUND ÜBER DIE BEHEBUNG WIEGT SCHWERER ALS EINER ÜBER DIE FEHLERKLASSE:** Wer die
   Klasse kennt und zum falschen Mittel greift, hält den Fall für erledigt — und hat dann
   eine Datei, die zweimal geprüft und zweimal falsch ist. Der datierte Zusatz an Vermerk 1
   sagt dasselbe an der Stelle, an der der falsche Schluss entsteht.

   **ZWEITE VERSCHÄRFUNG — DIE KONTROLLE AM ARBEITSBAUM GENÜGT NICHT ALS NACHWEIS.** Sie
   belegt, was auf der Platte liegt, nicht, was in die Objektdatenbank gepackt wurde; die
   zwei Wege können auseinanderlaufen. Der Nachweis gehört ans COMMITTETE OBJEKT
   (`git show HEAD:<pfad>`), und genau so ist er in Vermerk 3 geführt.

   **WAS DAMIT WEITERHIN NICHT ENTSCHIEDEN IST** — die drei Punkte oben gelten unverändert,
   und ZWEI kommen dazu: ob die Auflage das MITTEL vorschreibt (bauen statt schreiben) oder
   nur die KONTROLLE · und ob die Kontrolle am Arbeitsbaum oder am Objekt zu führen ist.
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

3. **EIN GUARD, DER AUF EINEN NAMEN PRÜFT, DEN ES NACH DEM LAUF WIEDER GIBT, IST KEIN
   GUARD, SONDERN EINE FALLE.**
   BEFUND: Der freigegebene Plan zu 11.8b sah für den Drop des alten Primärschlüssels
   einen Katalog-Guard auf `conname = 'project_secrets_pkey'` vor — die Bauform, die 0016,
   0022, 0023 und 0024 an dieser Stelle alle tragen. Nach der Migration existiert wieder
   ein Constraint DIESES Namens, nur eben auf `id`. **Ein zweiter Lauf hätte den NEUEN
   Primärschlüssel gedroppt und die Tabelle ohne Schlüssel zurückgelassen, und zwar
   STILL:** ein `drop constraint` mit passendem Namen scheitert nicht, er tut genau das,
   was dasteht. Gefallen beim Bauen, VOR dem Lauf (GEMESSEN am eigenen Lauf, CC,
   2026-08-26).
   WAS STATTDESSEN TRÄGT: auf die SACHE prüfen statt auf den Namen — hier ein
   Primärschlüssel, der die Spalte `project_id` ENTHÄLT; den gibt es genau solange, wie
   der alte steht. ZWEITER GEWINN, der ohne die Korrektur nicht entstanden wäre: der Name
   des alten Schlüssels wird jetzt ABGELESEN statt angenommen — 0021 deklariert ihn inline
   und benennt ihn nirgends, "project_secrets_pkey" war Konvention und keine Messung.
   WARUM ES EIN KANDIDAT IST UND KEIN SONDERFALL: Das hat mit dieser Migration nichts zu
   tun. Es trifft JEDEN Guard, dessen Gegenstand nach dem Lauf unter DEMSELBEN Namen
   wieder existiert — also genau die Umkehrung dessen, wofür Guards da sind. Die
   bestehende Idempotenz-Auflage des Projekts kennt den Katalog-Guard, aber nicht die
   Frage, ob sein Anker den Vorher- vom Nachher-Zustand überhaupt TRENNT.
   ABGRENZUNG, die dazugehört: Die Regel "EINE VORBEDINGUNG, DIE AUCH DER ALTE ZUSTAND
   ERFÜLLT, IST KEINE VORBEDINGUNG" (docs/immer-beachten.md) beschreibt dieselbe Denkfigur
   am TEST-Anker. Hier steht sie am MIGRATIONS-Guard, und die Richtung ist umgekehrt: dort
   erfüllt der ALTE Zustand die Bedingung mit, hier der NEUE.
   **NICHT ENTSCHIEDEN:** ob das eine eigene Regel wird oder ein Absatz an der bestehenden
   Idempotenz-Auflage · ob daraus eine Auflage an jeden künftigen Katalog-Guard folgt.
   KEINE EMPFEHLUNG.

4. **EIN REGRESSIONSSCHRITT DARF DIE VORAUSSETZUNG DES SCHRITTS DANACH NICHT ZERSTÖREN.**
   BEFUND: Die Live-Test-Anleitung zu 11.8b verlangte in Schritt 3, an einem
   KONFIGURIERTEN Ziel zweimal ein Geheimnis zu speichern, und in Schritt 6, dass
   DASSELBE Ziel weiter sendet. Nach Schritt 3 trug es einen Testwert; der Anbieter lehnte
   ab, und der Server-Forward kam nicht an. GEMESSEN am eigenen Lauf (Owner, 2026-08-26).
   WARUM DAS SCHLIMMER IST ALS EIN AUSGEFALLENER SCHRITT: **"Nichts kommt vom Server an"
   sieht bei einem kaputten Lesepfad EXAKT so aus wie bei einem ungültigen Zugangsdatum.**
   Die Beobachtung trennt die beiden nicht. Der Schritt hätte als Fehlschlag gelten können,
   ohne etwas gezeigt zu haben — und die Suche hätte am falschen Ende begonnen.
   DIE REPARATUR IST EINE ZEILE und hat im Nachlauf getragen: **der ZWEITE Wert ist der
   ECHTE.** Dann prüft der Regressionsschritt dieselbe Sache wie zuvor, und der Bestand ist
   hinterher intakt.
   **DER FEHLER LAG IN DER ANLEITUNG, NICHT IN DER AUSFÜHRUNG** (ARCHITEKT, 2026-08-26).
   WARUM ES EIN KANDIDAT IST: Es ist dieselbe Klasse wie die bestehende Lektion (c) an
   "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE" (docs/immer-beachten.md) — ein Schritt
   reisst die Voraussetzung dessen mit, was er prüfen soll —, aber an einer anderen Achse:
   dort tut es das INSTRUMENT, hier die REIHENFOLGE zweier Schritte. Eine Anleitung kann
   aus lauter tauglichen Schritten bestehen und trotzdem in der falschen Reihenfolge
   stehen.
   **NICHT ENTSCHIEDEN:** ob das eine eigene Regel wird oder ein Absatz an jener Lektion ·
   ob daraus eine Auflage an jede Live-Anleitung folgt, die einen Schreibschritt vor einen
   Wirkungsschritt stellt. KEINE EMPFEHLUNG.

5. **EINE PROBE GEGEN DIESELBE SCHICHT KANN EINE FRAGE ÜBER EINE ANDERE SCHICHT NICHT
   SCHLIESSEN.**
   BEFUND, zweimal in dieser Phase eingetreten: Die Probe vom 2026-08-25
   (supabase/checks/upsert-arbiter-probe.sql) hat gegen den REST-Endpunkt gemessen und
   damit **PostgREST**. Offen blieb, ob **supabase-js** denselben Arbiter erzeugt — und
   eine ZWEITE Probe hätte wieder PostgREST gemessen und wäre an der Frage vorbeigelaufen.
   Geschlossen hat sie erst der LIVE-TEST am 2026-08-26, weil dort **der Client selbst den
   Aufruf baut**.
   **DAS UMGEKEHRTE GILT AUCH, und es gehört dazu, sonst liest sich die Regel als "immer
   möglichst weit aussen messen":** Wer die PostgREST-Frage im SQL-Editor misst,
   beantwortet ebenfalls eine andere — er misst dann Postgres. Genau deshalb lief jene
   Probe gegen den Endpunkt und NICHT im Editor. Die Regel sagt nicht "weiter aussen",
   sondern "an der Schicht, über die die Frage gestellt ist".
   WARUM ES EIN KANDIDAT IST: Es ist kein Supabase-Sonderfall. Zwischen unserem Code und
   jeder fremden Wirkung liegen mehrere Schichten — Client, Protokoll-Schicht, Datenbank,
   Anbieter —, und ein Instrument misst immer nur die, gegen die es spricht. Ein Ergebnis
   von der falschen Schicht sieht dabei aus wie eine Antwort.
   ABGRENZUNG ZUR BESTEHENDEN REGEL: Lektion (c) an "MUTATIONSPROBEN UND
   LIVE-TEST-INSTRUMENTE" (docs/immer-beachten.md) fragt, ob ein Mittel zu GROB ist und die
   Voraussetzung des Geprüften mitreisst. Diese hier fragt, ob es an der RICHTIGEN SCHICHT
   ansetzt. Ein Instrument kann fein sein, sauber greifen, ein klares Ergebnis liefern —
   und trotzdem etwas anderes gemessen haben, als gefragt war.
   ABGRENZUNG ZU KANDIDAT (4) darüber: Jener betrifft die REIHENFOLGE zweier Schritte,
   dieser den ORT der Messung. Drei Achsen mit demselben Ausgang — ein Ergebnis, das wie
   eine Antwort aussieht und keine ist.
   **NICHT ENTSCHIEDEN:** eigene Regel oder Absatz an der bestehenden. KEINE EMPFEHLUNG.

6. **EIN WÄCHTER ÜBER QUELLTEXT MUSS SAGEN, WAS ER NICHT TRENNEN KANN.**
   BEFUND: Die erste Fassung des Import-Wächters aus Scheibe 11.8c prüfte den ROHTEXT der
   Produktivdatei und wurde rot — an einer PROSA-Erwähnung im eigenen Kommentar. Der Kopf
   von `oauth-payload.ts` NENNT `encryptSecret`; er muss es, weil Auflage (3) ohne den
   Namen nicht erklärbar ist. GEMESSEN am eigenen Lauf (CC, 2026-08-26).
   WAS DER FEHLER WAR: **Auflage (1) ist eine Aussage über den IMPORT-GRAPHEN, nicht über
   das VOKABULAR.** Ein Textwächter kann BEDEUTUNG nicht von ERWÄHNUNG trennen — er sieht
   nur Zeichen. Der Wächter filtert jetzt reine Kommentarzeilen und prüft zusätzlich die
   `require`-Form; die GRENZE dieser Filterung steht an ihm selbst.
   WARUM ES EIN KANDIDAT IST: Das trifft jeden Wächter, der Quelltext durchsucht statt
   einen Graphen zu befragen — und davon gibt es in diesem Projekt mehrere (die
   Abwesenheits-Wächter auf Migrations-SQL, die Wortlaut-Prüfungen an erzeugten
   Artefakten). **ER MUSS IN DIE STRENGE RICHTUNG IRREN:** lieber ein Fehlalarm, den
   jemand prüft, als ein Durchlassen, das niemand sieht. Und **seine Grenze gehört an ihn
   selbst**, sonst hält die nächste Runde einen Fehlalarm für einen Befund — oder, teurer,
   baut ihn stillschweigend weicher, bis er nichts mehr fängt.
   ABGRENZUNG ZU KANDIDAT (3): Jener betrifft einen Guard, dessen ANKER den Vorher- vom
   Nachher-Zustand nicht trennt. Dieser betrifft einen Wächter, dessen MEDIUM Bedeutung
   von Erwähnung nicht trennt. Zwei verschiedene Blindheiten, derselbe Ausgang — eine
   Prüfung, die etwas anderes misst, als sie behauptet.
   **NICHT ENTSCHIEDEN:** eigene Regel oder Absatz an einer bestehenden · ob daraus eine
   Auflage an jeden künftigen Textwächter folgt, seine Grenze mitzuschreiben. KEINE
   EMPFEHLUNG.

7. **EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND.**
   BEFUND: Beim Anbieter-Crawl vom 2026-08-27 lieferte `innerText` den HTTP/REST-Reiter der
   gelesenen Seite NICHT — die Sprach-Reiter halten den nicht aktiven Inhalt ausserhalb des
   sichtbaren Textes. Die Suche nach dem Token-Endpunkt ergab **null Treffer**. Erst
   `textContent` (**115 157 statt 40 271 Zeichen**) förderte ihn zutage. GEMESSEN am eigenen
   Lauf (CC, 2026-08-27).
   WARUM ES TEUER GEWESEN WÄRE: Ohne den zweiten Griff wäre "steht dort nicht" als Befund
   protokolliert worden — **mit benannter Reichweite, sauber ausgewiesen, und trotzdem
   falsch.** Die Reichweitenangabe hätte den Fehler nicht gefangen, sondern ihm Autorität
   gegeben.
   ABGRENZUNG ZUR BESTEHENDEN LEKTION (d) AN "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"
   (docs/immer-beachten.md): Jene verlangt für einen Abwesenheits-WÄCHTER eine
   POSITIVKONTROLLE, damit ein echter Nicht-Treffer von einem kaputten Wächter zu
   unterscheiden ist. Hier ist der Wächter in Ordnung — **das INSTRUMENT erzeugt die
   Abwesenheit.** Verwandte Denkfigur, andere Achse.
   VERWANDT AUCH MIT DER GEGENRICHTUNG IN "WERKZEUG-REGEL: sed -i STRIPPT ... STILL DAS CR"
   ("EIN WERKZEUG KANN AUCH EINEN BEFUND ERZEUGEN, DEN DER GEGENSTAND NICHT HERGIBT"):
   dort ein Treffer, den es nicht gibt — hier ein Nicht-Treffer, den es nicht gibt.
   WARUM ES EIN KANDIDAT IST UND KEIN CRAWL-SONDERFALL: Es trifft jedes Werkzeug, das einen
   AUSSCHNITT liefert, wo man den Gegenstand vermutet — eine Oberflächen-Abfrage, ein
   Reiter, ein gefilterter Log, ein `grep` über eine Datei mit Sonderbytes.
   **NICHT ENTSCHIEDEN:** ob daraus eine Auflage an jede Abwesenheits-Aussage folgt, das
   Instrument zu wechseln, bevor sie gilt · ob die bestehende Werkzeug-Regel den Absatz
   bekommt oder es eine eigene wird. KEINE EMPFEHLUNG.

8. **EINE TITEL-KOLLISION WIRD AUCH GEGEN ZITATE GEPRÜFT, NICHT NUR GEGEN LEBENDE
   ÜBERSCHRIFTEN.**
   BEFUND: Beim Auflösen der zwei zeichengleichen `###`-Titel am 2026-08-27 fand eine
   Volltitel-Suche je **DREI** Fundstellen, nicht zwei: die zwei Überschriften **plus ein
   bis zwei ZITATE** in den Verdichtungs-Listen abgeschlossener Scheiben. GEMESSEN am Repo
   (CC, 2026-08-27).
   WAS DARAUS FOLGT: Hätte man je EINE Überschrift umbenannt — die naheliegende, minimale
   Reparatur —, träfe eine Suche nach dem Titel **weiterhin zuerst das Zitat**. Die
   Kollision wäre kleiner, aber nicht weg.
   WARUM ZITATE SICH ANDERS VERHALTEN ALS ÜBERSCHRIFTEN: Ein Zitat eines ABGELAUFENEN
   Titels bleibt für immer stehen — es ist die Spur der Streichung und darf nicht
   verschwinden. Es kollidiert also dauerhaft mit jeder künftigen Überschrift desselben
   Wortlauts. **Je mehr Scheiben verdichtet werden, desto mehr solcher Zitate gibt es.**
   ABGRENZUNG ZUR BESTEHENDEN REGEL "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER
   DATEI MIT VERZEICHNIS NICHT" (docs/immer-beachten.md): Jene nennt das VERZEICHNIS als
   Quelle des zweiten Vorkommens. Hier ist die Quelle die VERDICHTUNGS-LISTE — ein
   Mechanismus, den jene Regel nicht kennt, weil er erst mit der Verdichtungs-Praxis
   entstanden ist.
   **NICHT ENTSCHIEDEN:** ob das ein Absatz an jener Regel wird oder eine eigene · ob die
   Prüfung "gegen Zitate, nicht nur gegen Überschriften" eine Auflage an jede Umbenennung
   wird. KEINE EMPFEHLUNG.
