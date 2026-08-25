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

Die erste Scheibe der Phase baut EINE REINE DATEI und verdrahtet nichts. Sie ist bewusst
so geschnitten, dass an der Datenbank NICHTS geschieht — keine Spalte, keine Migration,
kein Aufrufer.

### Der Gegenstand

**EINE reine Datei mit Chiffrieren und Dechiffrieren.** Kein Schema, keine Migration,
kein Aufrufer, kein UI, kein OAuth. Bewiesen durch Tests.

### Warum dieser Schnitt und nicht das Schema zuerst

**DIE VERSCHLÜSSELUNG IST DIE EINZIGE STELLE, AN DER EIN FEHLER STILL IST. Ein falsches
Schema fällt beim ersten Zugriff auf, ein kaputter OAuth-Fluss beim ersten Klick — ein
schwaches Verfahren fällt NIE auf.**

Das ist der ganze Grund für die Reihenfolge. Ein Schema-Fehler ist laut und billig; ein
Verfahrensfehler ist leise und teuer, und er wird erst sichtbar, wenn jemand von aussen
die Chiffrate liest — also genau dann, wenn es zu spät ist.

### Die Frage, die diese Scheibe ENTSCHEIDEN MUSS und die der Zuschnitt NICHT entscheidet

**TRÄGT EIN CHIFFRAT SEINE SCHLÜSSEL-HERKUNFT MIT?**

Der offene Punkt "DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT"
(docs/offene-punkte.md) führt unter (2) den Schlüsselwechsel. Ein Wechsel OHNE Übergang
macht jedes bestehende Zugangsdatum in derselben Sekunde wertlos; ein Wechsel MIT
Übergang verlangt, dass ein Chiffrat sagen kann, unter welchem Schlüssel es entstanden
ist.

**DAS IST EINE ENTSCHEIDUNG ÜBER DIE FORM DER NUTZLAST UND FÄLLT DAMIT IN DIESE SCHEIBE,
NICHT IN DEN OFFENEN PUNKT.** Wer sie vertagt, baut eine Form, die einen Schlüsselwechsel
später nur noch mit einer Migration auf ECHTEN GEHEIMNISSEN zulässt.

**DER ZUSCHNITT BENENNT SIE UND ENTSCHEIDET SIE NICHT.** Sie gehört in den Plan der
Scheibe, mit Begründung und Alternativen — nicht hierher.

### Was ausdrücklich NICHT drin ist, je mit seinem Grund

- **DIE SPALTE.** Eine Spalte ohne Verfahren wäre ein Behälter für etwas, dessen Form
  noch nicht entschieden ist (s. die Frage oben). Die Reihenfolge ist Absicht.
- **DIE MIGRATION.** Sie folgt der Spalte und teilt deren Grund. Zusätzlich gilt: Wer
  eine Migration schreibt, löst den Pflicht-Stopp von docs/db-stand.md, docs/db-regeln.md
  und docs/plattform-befunde.md aus — das ist eine eigene Runde, keine Beigabe.
- **DER PRIMÄRSCHLÜSSEL.** Die Entscheidung (3) verlangt einen künstlichen Schlüssel und
  eine nullbare project_id. Das ist ein Eingriff in den Schlüssel einer Tabelle, die
  LAUFENDE Geheimnisse trägt, und gehört nicht in dieselbe Scheibe wie ein neues
  Verfahren.
- **JEDER AUFRUFER.** Ein Aufrufer machte aus einer reinen Datei einen Pfad, und der
  Pfad wäre der Ingest — der meistgetroffene der Plattform.
- **DIE WANDERUNG DER VIER BESTEHENDEN ZIELE.** Sie steht im Vorrat, ist nicht
  zugeschnitten und nicht terminiert.

### Die tragende Invariante

**Nach dieser Scheibe verhält sich die Anwendung EXAKT wie vorher — an jedem Pfad, für
jedes Projekt.** Die Datei hat im Produktivcode KEINEN Aufrufer; nur ihre Tests rufen
sie. Das ist der Prüfstein jeder Änderung dieser Scheibe: Wer einen Aufrufer hinzufügt,
hat nicht mehr diese Scheibe gebaut.

### Der Beweis und seine Grenze

Der Beweis dieser Scheibe sind TESTS. **EINEN LIVE-TEST GIBT ES NICHT**, weil nichts
gesendet und nichts gespeichert wird.

**DAS IST EINE AUSNAHME VON EINER DAUERHAFTEN REGEL UND WIRD DESHALB HIER BENANNT:** "Jede
Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung"
(docs/immer-beachten.md). Sie gilt unverändert weiter und hat an dieser Scheibe keinen
Gegenstand. **DIE ERSTE SCHEIBE MIT EINEM DATENPFAD SCHULDET IHN NACH.**

**DIESE SCHULD IST NICHT DIESELBE WIE DIE VON 11.2a.** Jene gehört der Transport-Scheibe
von 11.2 und wandert nicht hierher. Wer beide zusammenzieht, hält eine für erledigt,
sobald die andere eingelöst ist.

## Abgeschlossene Scheiben-Vermerke

Noch keiner. Der erste entsteht mit dem Bau-Commit der Scheibe 11.8a.

## Entscheidungen, die über ihre Scheibe hinaus binden

Noch keine, die HIER entschieden worden wäre. Die drei bindenden Entscheidungen zum
Geheimnis-Speicher stehen an docs/roadmap.md, Eintrag 11.8, Block vom 2026-08-25, und
werden hier NICHT verdoppelt.

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

Noch keiner.
