# AKTIVER STAND — Phase 11.1 (LinkedIn als viertes Fan-Out-Ziel)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.1. Sie trägt den
Zuschnitt der Scheiben, die Entscheidungen, die über ihre Scheibe hinaus binden, den
gemeldeten Vorrat und — sobald etwas gebaut UND live geprüft ist — die Scheiben-Vermerke.
Angelegt am 2026-08-17, VOR der ersten Scheibe: erst das Gedächtnis, dann der Code.

**SIE IST DAS PFLICHT-GATE JEDES BAU- UND AUFKLÄRUNGS-PROMPTS DIESER PHASE** ("Auftrag
0"), zusammen mit CLAUDE.md und docs/immer-beachten.md. Das Verfahren dahinter steht in
CLAUDE.md, "## Aktiver Stand — Verfahren ab Phase 10"; das Detail zu Anlegen,
Fortschreiben und der Hebung am Phasenende in docs/arbeitsweise.md. Existiert diese Datei
nicht, läuft keine Phase — sie existiert also genau so lange, wie 11.1 offen ist, und
wandert am Phasenende ins Archiv.

**WAS SIE NICHT IST:** Sie beschreibt einen ZUSCHNITT, keinen Bestand. Der gemessene
Zustand der Datenbank steht in docs/db-stand.md, die dauerhaften Regeln in
docs/immer-beachten.md, die Anbieter-Befunde in docs/ziel-befunde.md. Wer hier eine Regel
einträgt, macht aus einem Zuschnitt eine Vorgabe, die keine Phase überlebt.

## Verzeichnis der Abschnitte

Der Zweck dieses Verzeichnisses ist eine BELEGBARE Umfangs-Ansage: "lies Abschnitt X plus
das Verzeichnis" ist damit eine prüfbare Aussage und keine Hoffnung. GRUND, und er ist
gemessen: Die Standdatei der Phase 11 wuchs auf rund 2 800 Zeilen, und JEDER Prompt
verlangte "lies sie vollständig" — eine Auflage, die mit der Länge unerfüllbar wird und
dann still nicht mehr erfüllt wird.

- ## Verzeichnis der Abschnitte
- ## Fortschreibungsregeln
- ## Gegenstand der Phase
- ## Scheibe 11.1a — Zugangsdatum ablegen
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
  (mit Quelle). Eine Angabe ohne Provenienz ist hier nicht schreibbar. Eine Aussage über
  bestehenden Code steht entweder als FRAGE oder trägt GEMESSEN mit Datum — nie als
  beiläufige Behauptung.
- **DER ORT IST DER SYMBOLNAME, NIE EINE ZEILENNUMMER.** Namen überleben Refactorings;
  eine falsche Zeilennummer ist teurer als keine, weil sie auf eine ANDERE Stelle zeigt,
  statt zum Suchen zu zwingen.
- **NICHTS WIRD UMSORTIERT.** Neue Abschnitte treten hinten an und bekommen eine Zeile im
  Verzeichnis.

## Gegenstand der Phase

**LinkedIn als VIERTES Fan-Out-Ziel.** Die drei bestehenden Ziele sind meta, pinterest und
tiktok (GEMESSEN am Repo, 2026-08-17: `TRACKING_TARGETS` in `src/lib/settings.ts`).

**DIE KENNUNGS-FRAGE IST ENTSCHIEDEN:** Gebaut wird auf die KLARTEXT-IP als
Identitäts-Merkmal. Ihre ANNAHME durch die Schnittstelle ist GEMESSEN (docs/ziel-befunde.md,
Abschnitt "LinkedIn (Conversions API)", Teil (i)). Ein Lesen von Eingabefeld-Werten ist
dafür NICHT erforderlich; der Befund dazu — und die Reichweite seines Nicht-Treffers —
steht an der Roadmap-Zeile 11.1 in CLAUDE.md.

## Scheibe 11.1a — Zugangsdatum ablegen

Die erste Scheibe legt das Zugangsdatum ab und macht sonst nichts. Sie ist bewusst so
geschnitten, dass sie am heissesten Pfad der Plattform NICHTS ändert.

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-17, nach dem bestätigten Live-Test. Hier standen die ANWEISUNGEN
FÜR die Scheibe: die Migration samt Bauform und der Auflage, dass jedes Ziel seine EIGENE
Constraint-Erweiterung mitbringt · der Schreibpfad nach dem Muster des Token-Flows · der
BEDARF an einem Ort für die Eingabe, mit offen gelassener Bauform · die Ableitung des
Zustands aus der Geheimnis-Tabelle statt aus dem Einstellungs-Blob. Sie sind mit dem
Vollzug abgelaufen.
WAS GEBAUT UND GEMESSEN WURDE, STEHT IN VERMERK 1 — und nur weil es dort steht, durfte es
hier weg. Zwei Dinge daraus sind KEINE Anweisung mehr, sondern Tatsachen über den
gebauten Code, und sie stehen deshalb dort: dass KEIN Schreibpfad entstehen musste
(`setCapiToken` war bereits ziel-generisch), und dass die Karte ohne öffentliches Feld
auskommt.
DIE ZWEI PFLICHT-STOPPS DIESER SCHEIBE (docs/db-stand.md + docs/db-regeln.md vor einer
Migration) waren keine Erfindung dieses Zuschnitts, sie stehen dauerhaft in CLAUDE.md und
gelten unabhängig von dieser Datei weiter.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe. Ihr Ort ist ab jetzt die Roadmap-Zeile 11.1 in CLAUDE.md bzw.
der Zuschnitt von 11.1b.

- **KEIN ADAPTER, KEIN FORWARD, KEIN EINTRAG IM FAN-OUT.** Ohne die
  Conversion-Regel-Kennung ist das Ziel nicht sendefähig — ein Adapter hätte nichts, wohin
  er sendet.
- **KEINE ENTSCHEIDUNG ÜBER DIE ABLAGE DER REGEL-KENNUNG.** Sie gilt JE EREIGNISTYP, und
  der Einstellungs-Blob ist CLIENT-besessen. Das ist Trigger (ii) der
  Primärschlüssel-Entscheidung (CLAUDE.md, "## Offene Punkte") und gehört in eine EIGENE
  Runde, nicht als Nebenzeile hierher.
- **KEIN EINWILLIGUNGS-VERHALTEN — UND DAS IST NICHT DASSELBE WIE "KEIN EINTRAG".**
  Ausgeschlossen war das VERHALTEN; der TYP-EINTRAG war strukturell erzwungen und ist
  gesetzt worden. VOLLZOGEN UND NACHZULESEN IN VERMERK 1, Punkt (a): welche Werte gesetzt
  sind, warum `false` dort NICHT "strenger als die Doktrin" heisst, und die Falle — ein
  heute folgenloser Eintrag wird in 11.1b wirksam, ohne dass sich an ihm etwas ändert und
  ohne dass irgendwo etwas rot wird.
- **KEINE BEHANDLUNG VON ABLAUF ODER WIDERRUF, KEIN BLEIBENDES SIGNAL.** Dass eine
  LinkedIn-Verbindung ohne Zutun des Kunden brechen kann, ist an der Roadmap-Zeile 11.1 als
  Befund festgehalten; OB und WIE das ein Signal bekommt, ist dort ausdrücklich nicht
  entschieden.
- **KEINE AUTORISIERUNGSSCHICHT.** Sie ist gemeinsames Fundament mit 11.2 und wäre, nur
  für LinkedIn gebaut, überangepasst.

### Die tragende Invariante

**Nach dieser Scheibe verhält sich ein Projekt MIT hinterlegtem LinkedIn-Zugangsdatum am
Ingest EXAKT wie eines ohne:** keine zusätzliche Abfrage, kein zusätzlicher Empfänger,
keine Änderung an der garantierten leeren 204. Sie ist der Prüfstein jeder Änderung dieser
Scheibe — wer sie bricht, hat nicht mehr diese Scheibe gebaut.

### Warum der Schnitt nichts verbaut

Ein Zugangsdatum ist ein SKALAR je (Projekt, Ziel) — genau die Form, die die Tabelle hält.
Mehrere KENNUNGEN je Ziel brechen den Schlüssel (project_id, target) NICHT; nur mehrere
EMPFÄNGER desselben Typs je Projekt täten es. Die beiden Achsen sehen beim Lesen wie eine
aus, und wer sie zusammenzieht, baut ein Schema um, dem nichts fehlt.

## Entscheidungen, die über ihre Scheibe hinaus binden

- **GEBAUT WIRD AUF DIE KLARTEXT-IP ALS KENNUNG; li_fat_id IST EINE EIGENE FOLGE-SCHEIBE**
  (Owner-Entscheidung, 2026-08-17).
  GRUND: Ein URL-Parameter wäre ein NEUER nutzerkontrollierter Wert auf dem Ingest-Pfad —
  genau der vierte 204-Kandidat, der im Backlog bisher als "betrifft Code, den es nicht
  gibt" geführt wird. Mit li_fat_id gäbe es ihn, und die Frage nach dem Containment wäre
  Teil dieser Scheibe statt einer eigenen.
  GRENZE, die die Entscheidung trägt: Die Reihenfolge verbaut nichts, weil `userIds` eine
  LISTE ist — ein zweites Merkmal tritt später neben das erste, es ersetzt es nicht
  (GELESEN am Schema des Anbieters, 2026-08-17).
- **DIE MATCH-QUALITÄT VON IP-ONLY IST VOR ECHTEM TRAFFIC PRINZIPIELL NICHT MESSBAR**
  (docs/ziel-befunde.md, Teil (h)): Die Conversions-Zählung des Anbieters steigt erst bei
  einer Zuordnung zu einer echten Person, die bei Testdaten nie eintritt.
  FOLGE FÜR JEDE LIVE-TEST-ANLEITUNG DIESER PHASE: Ein Live-Test kann "ANGEKOMMEN" zeigen,
  NIE "HAT GEWIRKT". Wer die Zählung als Sonde nimmt, meldet einen Fehlschlag, der keiner
  ist.

## Vorrat — gemeldet, nicht gebaut

Hier steht, was während einer Scheibe AUFFÄLLT, aber nicht zu ihr gehört: Beobachtungen,
Nebenbefunde und Kandidaten für eine spätere Runde. Kein Auftrag, keine Zusage, keine
Regel — und ausdrücklich nichts, was stillschweigend mitgebaut wird.

- **DAS VIERTE MITGLIED IN `TRACKING_TARGETS` KÖNNTE EINEN EINWILLIGUNGS-EINTRAG
  ERZWINGEN, DEN DIE SCHEIBE AUSSCHLIESST** (GEMESSEN am Repo, 2026-08-17; gemeldet beim
  Anlegen dieser Datei, NICHT entschieden): `CONSENT_KEY_BY_TARGET` und
  `LEGACY_CONSENT_ROLE` in `src/lib/tracking/consent-targets.ts` sind als
  `Record<TrackingTarget, …>` typisiert, und ein Kommentar in derselben Datei sagt, eine
  Erweiterung von `TRACKING_TARGETS` erzeuge dort einen Typfehler. Ob daraus folgt, dass
  die Scheibe einen Eintrag setzen MUSS — und ob ein Eintrag ohne Adapter überhaupt eine
  Wirkung hätte —, ist HIER NICHT entschieden; es berührt die offenen Fragen (2) und (3)
  und gehört in deren Beantwortung am Code.
  **ERLEDIGT MIT SCHEIBE 11.1a** (2026-08-17): Beide Fragen sind beantwortet, der Eintrag
  ist gesetzt. Der Wortlaut oben bleibt als Zeitdokument stehen; was daraus geworden ist,
  steht in Vermerk 1, Punkt (a) — einschliesslich der Antwort, dass der
  Einwilligungs-Zweig am WERT entscheidet.

- **DIE SUPABASE-DOKU WARNT VOR SCHEMA-ÄNDERUNGEN ÜBER DEN SQL-EDITOR — DER HINWEIS
  TRIFFT DIESES PROJEKT NICHT** (GELESEN 2026-08-17,
  `supabase.com/docs/guides/deployment/database-migrations`): Dort steht, Schema-Änderungen
  direkt an der entfernten Datenbank über den SQL-Editor oder den Table-Editor umgingen die
  Migrations-Historie und liessen `supabase db push` mit Sync-Fehlern scheitern.
  WARUM ER HIER TROTZDEM STEHT: Dieses Projekt hat KEINEN Migrations-Runner und soll keinen
  haben; Migrationen laufen bewusst manuell im SQL-Editor, und `db push` kommt nicht vor.
  Der Hinweis würde erst dann zutreffen, wenn jemand die CLI-Arbeitsweise einführte.
  Er steht hier, damit ihn niemand in einem halben Jahr neu herleitet und für einen Befund
  gegen die bestehende Reihenfolge-Regel hält. KEINE Empfehlung, KEINE Regel, kein Auftrag.

## Hebungs-Kandidaten

Hier steht, was am Phasenende zur Aufnahme in docs/immer-beachten.md, ins
Sicherheits-Manifest oder in eine der Zustandsdateien VORGESCHLAGEN wird — eine Regel wird
erst durch die Hebung wirksam, nicht durch den Eintrag hier. Jeder Kandidat nennt, WO er
hin soll und WELCHER Beleg ihn trägt.

- **EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT — DER
  ERSTE TREFFER IST SYSTEMATISCH DER FALSCHE.**
  WOHIN: `docs/immer-beachten.md`, als Ergänzung an „WERKZEUG-REGEL: sed -i STRIPPT IN
  DIESER UMGEBUNG STILL DAS CR". Jene Regel führt bereits die Gegenrichtung („EIN WERKZEUG
  KANN AUCH EINEN BEFUND ERZEUGEN, DEN DER GEGENSTAND NICHT HERGIBT"); dies ist der
  verwandte Fall auf derselben Achse — nicht das Werkzeug verfälscht das Ergebnis, sondern
  der ANKER trifft eine andere Stelle als die gemeinte.
  DER BEFUND (GEMESSEN am 2026-08-17, beim Verdichten genau dieser Datei): Eine Suche nach
  dem Text einer `##`-Überschrift traf den gleichnamigen Eintrag im ABSCHNITTS-VERZEICHNIS
  statt der Überschrift selbst. Die beiden Splice-Grenzen kehrten sich dadurch um, und die
  halbe Datei stand zweimal da. Wiederhergestellt wurde aus der Versionsverwaltung, die
  Änderung danach mit dem Editier-Werkzeug neu eingetragen.
  DIE URSACHE IST STRUKTURELL UND KEIN FEHLGRIFF, und genau das trägt die Hebung: Seit
  Standdateien ein Verzeichnis im Kopf tragen, steht JEDE Überschrift MINDESTENS ZWEIMAL in
  der Datei — und das Verzeichnis steht VORN. Wer die erste Fundstelle nimmt, nimmt damit
  systematisch die falsche, und zwar bei jeder Überschrift und in jeder solchen Datei.
  DIE REICHWEITE: Das Verzeichnis ist eine VORGABE für jede künftige Standdatei, keine
  Eigenart dieser einen. Dieselbe Struktur tragen `docs/immer-beachten.md` und
  `docs/ziel-befunde.md` — die Regel, die das Verzeichnis fordert, erzeugt die Falle also
  selbst.
  WAS AUSDRÜCKLICH NICHT DAZUGEHÖRT: eine Vorschrift, WIE stattdessen anzukern ist. Ob das
  Verzeichnis eine unterscheidbare Form bekommt, ob nach der LETZTEN statt der ersten
  Fundstelle gesucht wird oder ob es schlicht bei der Pflicht zum Editier-Werkzeug bleibt —
  das ist eine EIGENE Entscheidung und wird hier NICHT getroffen. Ein Kandidat, der die
  Lösung gleich mitliefert, nimmt sie der Hebung vorweg.

## Scheiben-Vermerke

Ein Vermerk entsteht NACH dem bestätigten Live-Test einer Scheibe, nicht nach dem grünen
Test und nicht nach dem Commit allein. Er trägt seine stabile Nummer (s.
Fortschreibungsregeln), was gebaut wurde, was gemessen wurde und die Commit-Nummer; der
jüngste, noch nicht committete Vermerk darf sie als EINZIGER offen lassen.

### 1 — Scheibe 11.1a: Zugangsdatum ablegen (Commit-Nummer offen)

**DIE LÜCKE IST BEABSICHTIGT:** Dieser Vermerk trägt keine Commit-Nummer, weil er der
jüngste und noch nicht committete ist. Es darf immer nur EINE solche Lücke geben.

**WAS GEBAUT WURDE.** `linkedin` ist ein `TrackingTarget` (`TRACKING_TARGETS` in
`src/lib/settings.ts`) und steht ausdrücklich NICHT in `TARGETS_WITH_ADAPTER`
(`src/lib/tracking/target-adapters.ts`) — das ist der Riegel der Scheibe, und ein eigener
Wächter (`src/lib/tracking/target-adapters.test.ts`) hält ihn. Migration 0024 erweitert
die CHECK-Bedingung `project_secrets_target_valid` um das vierte Ziel. Die Karte
(`TARGET_CARDS` in `src/components/TargetCard.tsx` — NICHT in `target-adapters.ts`, dort
liegen `TARGETS_WITH_ADAPTER` und `hasAdapter`) kommt ohne öffentliches Feld aus: die drei
`public*`-Felder sind optional geworden, und ihre ABWESENHEIT ist der Schalter. Auf einer
solchen Karte ist die Zeile über die Auslieferung unterdrückt — sie nennt eine fehlende
Kennung als Grund, während der wahre Grund der fehlende Empfänger ist.
**KEIN SCHREIBPFAD IST ENTSTANDEN:** `setCapiToken` (`src/app/projects/actions.ts`) war
seit Phase 11 Scheibe 6 bereits ziel-generisch. Der Zuschnitt hat etwas verlangt, das es
gab — der einzige Punkt, an dem der Bau KLEINER ausfiel als der Plan.

**WAS GEMESSEN IST (LIVE, 2026-08-17, vom Owner im SQL-Editor und im Browser):**
- Die Constraint-Definition im Wortlaut: `CHECK ((target = ANY (ARRAY['meta'::text,
  'pinterest'::text, 'tiktok'::text, 'linkedin'::text])))`.
- Das Protokoll trägt alle vier Ziel-Migrationen mit gefülltem `applied_at`: 0021
  (2026-08-05 06:41:30), 0022 (2026-08-07 10:14:37), 0023 (2026-08-11 15:58:43), 0024
  (2026-08-17 13:59:53).
- **DER CONSTRAINT WIRKT:** Ein Insert mit `'linkedn_falsch'` wurde mit **23514** unter dem
  Namen `project_secrets_target_valid` abgewiesen, ein Insert mit `'linkedin'` angenommen.
- **REGRESSION, DREIMAL GEFAHREN:** Meta-Ereignisse erscheinen im Events Manager als
  „Empfangen von: Server" — mit und ohne hinterlegtes LinkedIn-Zugangsdatum. Die tragende
  Invariante hält am lebenden System.
- **OBERFLÄCHE:** „Zugangsdaten hinterlegt" plus „Auslieferung folgt — dieses Ziel sendet
  noch nicht." KEINE Meldung über eine fehlende Kennung, KEIN öffentliches Feld.
  Gegenprobe: Entfernen schaltet zurück auf „Nicht konfiguriert".

**DIE EINSCHRÄNKUNG, OHNE DIE SICH DIESER VERMERK FALSCH LIEST — ER IST KEIN
VORHER/NACHHER-BELEG:** Migration und Deploy waren zu Testbeginn BEREITS eingespielt. Der
Schritt, der den Ausgangszustand VOR dem Lauf abliest, konnte deshalb nicht stattfinden.
GEMESSEN ist damit, dass der Constraint HEUTE wirkt und nicht alles durchlässt — und das
ist die wertvollere Hälfte, weil eine blosse Annahme bei einem Constraint, der alles
durchliesse, identisch aussähe. NICHT GEMESSEN ist, dass 0024 den Übergang BEWIRKT hat;
das ruht auf dem Protokoll-Eintrag und ist damit eine ABLEITUNG, kein Messwert.

**ZWEI FEHLERKLASSEN, DIE IM PROTOKOLL GLEICH AUSSEHEN** (GEMESSEN am Repo, 2026-08-17):
`project_secrets` trägt `primary key (project_id, target)` (0021), weshalb ein zweiter
Insert mit demselben Paar an einer SCHLÜSSEL-KOLLISION scheitert (23505) und NICHT an der
CHECK-Bedingung (23514) — wer die Bereinigung von Alt-Einträgen vor dem Lauf für einen
Teil der Constraint-Prüfung hält, verwechselt die beiden. Über den Produktivpfad tritt
23505 gar nicht auf, weil `setCapiToken` mit `onConflict: "project_id,target"` als Upsert
schreibt.

**ZWEI PUNKTE, DIE ÜBER DIESE SCHEIBE HINAUSREICHEN** — sie sind der Grund, warum dieser
Vermerk nicht nur Vollzug meldet:

**(a) DER EINWILLIGUNGS-EINTRAG IST HEUTE FOLGENLOS UND WIRD IN 11.1b WIRKSAM,** ohne dass
sich an ihm etwas ändert und ohne dass irgendwo etwas rot wird. Gesetzt sind
`CONSENT_KEY_BY_TARGET.linkedin = "linkedin"` und `LEGACY_CONSENT_ROLE.linkedin = false`
(`src/lib/tracking/consent-targets.ts`); beide Einträge sind vom Typ erzwungen (totale
Records über `TrackingTarget`) und zusätzlich von zwei Vollständigkeits-Wächtern in
`consent-targets.test.ts`.
DIE GRUNDLAGE DIESES PUNKTES IST DIE ANTWORT AUF DIE DRITTE OFFENE FRAGE, und sie fiel auf
die schwächere Seite (GEMESSEN am Code, 2026-08-17): Der Einwilligungs-Zweig
(`allowedTargets` in `src/lib/capi/ingest.ts`) entscheidet am **WERT**, nicht am fehlenden
Adapter — er läuft VOR `dispatchForward`, und der Adapter-Riegel `if (!hasAdapter(target))
return` liegt DAHINTER. Ein LinkedIn-Eintrag passiert das Gate also und fällt erst am
Verteiler heraus. Für 11.1a ist das folgenlos; für 11.1b ist es die Falle.
`false` HEISST DABEI NICHT „strenger als die Doktrin": Ohne Einwilligungs-Dialog wird der
Draht MIT allen Schlüsseln auf `true` gefüllt (`__psConsentAll` in
`src/lib/tracking/consent.ts`: `v === undefined` -> alle erlaubt), das Feld ist dann
vorhanden und erlaubend, und dieser Zweig wird gar nicht erreicht. Er verteilt ein ERBE an
Seiten, die älter sind als das Feld — und solche Seiten kann es für ein Ziel, das es erst
seit heute gibt, nicht geben.

**(b) DER AUSSCHLUSS „KEIN AUSGELIEFERTER CLIENT-CODE GEÄNDERT" HÄNGT AN VARIANTE C.**
GEMESSEN am Code (2026-08-17): Das Memo `consentTargets`
(`src/components/CodeImporter.tsx`) filtert auf eine gesetzte Kennung
(`TRACKING_TARGETS.filter(t => hasPixelId(getPixelId(settings, t)))`). Die Karte hat kein
Feld, um eine zu setzen -> LinkedIn erscheint in KEINEM ausgelieferten Text. Bekommt sie
in 11.1b eines, erscheint das Ziel im ausgelieferten Code JEDER Seite, die es benutzt —
und der Schlüssel ist eine EINBAHNSTRASSE: ein publizierter Text trägt ihn, ein
Code-Deploy erreicht ihn nicht.
HEUTE SICHERT DAS EIN KOMMENTAR AN DER RENDER-STELLE, UND EIN KOMMENTAR IST KEIN WÄCHTER.
Das ist kein Versäumnis dieser Scheibe, sondern ein benannter offener Punkt für den
Zuschnitt von 11.1b.

**WAS DER LIVE-TEST NICHT ZEIGEN KONNTE UND AUCH NICHT SOLLTE:** ob bei LinkedIn etwas
ankommt. Es geht nichts hin — das ist der Zweck der Scheibe.
