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

### Was drin ist

- **DIE MIGRATION:** Die CHECK-Bedingung `project_secrets_target_valid` auf
  `public.project_secrets` wird um das vierte Ziel erweitert. GEMESSEN am Repo
  (2026-08-17): Sie steht heute auf `check (target in ('meta', 'pinterest', 'tiktok'))`,
  zuletzt gesetzt in `supabase/migrations/0023_project_secrets_tiktok.sql`; die höchste
  vorhandene Migrationsnummer ist 0023. Die NUMMER der neuen Datei wird aus dem
  Verzeichnis ABGELEITET, nicht aus dieser Zeile abgeschrieben — sie kann veraltet sein,
  sobald irgendeine andere Migration dazukommt.
  AUFLAGE, die den Schnitt trägt: Jedes Ziel bringt seine EIGENE Constraint-Erweiterung
  mit (CLAUDE.md, Roadmap-Zeile 11.1). Ausführung im Supabase-SQL-Editor VOR dem
  Code-Deploy, fail-closed — erst das Ziel erlauben, dann den Schreiber ausliefern; die
  umgekehrte Reihenfolge liesse einen Betreiber beim Speichern in eine CHECK-Verletzung
  laufen. Die Bauform (Katalog-Guard im DO-Block, Drop+Add in EINER Transaktion,
  Protokoll-Eintrag als letzte Anweisung, Positivkontrolle nach dem Einspielen) steht in
  0023 und wird übernommen, nicht neu erfunden.
  PFLICHT VOR DEM PLAN: docs/db-stand.md und docs/db-regeln.md laden — das ist der
  Pflicht-Stopp aus CLAUDE.md und keine Empfehlung.
- **EIN SCHREIBPFAD FÜR DAS ZUGANGSDATUM,** nach dem Muster des bestehenden Token-Flows
  (`setCapiToken` in `src/app/projects/actions.ts`, GEMESSEN am Repo 2026-08-17): reine
  Funktion, Ownership-Prüfung DAVOR, Geschäftslogik DAHINTER — damit eine spätere
  MCP-Schicht denselben geprüften Kern über einen anderen Eingang nutzen kann. WRITE-ONLY:
  auch der Owner liest den Wert nie zurück; die Tabelle trägt keine SELECT-Policy, und das
  ist die tragende Schicht, nicht die Grants.
- **OBERFLÄCHE — DER BEDARF, NICHT DIE BAUFORM:** Der Betreiber braucht einen Ort, an dem
  er das Zugangsdatum eingeben kann, und eine Anzeige *hinterlegt / nicht hinterlegt*.
  OB das ein vierter Eintrag im bestehenden Karten-System ist oder etwas anderes, ist HIER
  NICHT entschieden — es hängt an der offenen Frage (1). Anlass, GEMESSEN am Repo
  (2026-08-17): `TARGET_CARDS` (`src/lib/tracking/target-adapters.ts`) trägt ein Merkmal
  `hasAdapter` und ist im Kommentar derselben Datei ausdrücklich als TEILMENGE von
  `TRACKING_TARGETS` beschrieben; ob ein Ziel OHNE Adapter dort überhaupt eine Karte
  bekommt, ist damit NICHT beantwortet.
  DIE GRENZE, die diesen Punkt hält: Ohne diesen Ort ist die Scheibe NICHT DEMOBAR — ein
  Schreibpfad ohne Eingabe hat keinen Nachweis. Der Bedarf ist also Teil der Scheibe, die
  Bauform ist es noch nicht.
- **DER ZUSTAND WIRD AUS DER GEHEIMNIS-TABELLE ABGELEITET,** nicht aus dem
  Einstellungs-Blob — aus DERSELBEN Zeile, die später auch der Forward-Pfad liest. Zwei
  Wahrheiten werden damit zu einer. Der Blob ist CLIENT-besessen und wird beim Speichern
  ganzheitlich ersetzt; ein daraus abgeleiteter Zustand überlebt nur, solange der Client
  ihn zurückspiegelt.

### Was ausdrücklich NICHT drin ist, je mit seinem Grund

- **KEIN ADAPTER, KEIN FORWARD, KEIN EINTRAG IM FAN-OUT.** Ohne die
  Conversion-Regel-Kennung ist das Ziel nicht sendefähig — ein Adapter hätte nichts, wohin
  er sendet.
- **KEINE ENTSCHEIDUNG ÜBER DIE ABLAGE DER REGEL-KENNUNG.** Sie gilt JE EREIGNISTYP, und
  der Einstellungs-Blob ist CLIENT-besessen. Das ist Trigger (ii) der
  Primärschlüssel-Entscheidung (CLAUDE.md, "## Offene Punkte") und gehört in eine EIGENE
  Runde, nicht als Nebenzeile hierher.
- **KEIN EINWILLIGUNGS-VERHALTEN — UND DAS IST NICHT DASSELBE WIE "KEIN EINTRAG".** Zwei
  Dinge, die beim Lesen wie eines aussehen und auseinandergehören:
  · AUSGESCHLOSSEN BLEIBT DAS VERHALTEN: Diese Scheibe baut und ändert KEIN
    Einwilligungs-Verhalten. Kein Zweig wird umgeschrieben, keine Auswertung erweitert,
    kein ausgelieferter Client-Code geändert.
  · NICHT AUSGESCHLOSSEN IST EIN TYP-EINTRAG, weil er strukturell erzwungen sein kann:
    Ein Eintrag in den totalen Zuordnungen `CONSENT_KEY_BY_TARGET` und
    `LEGACY_CONSENT_ROLE` (`src/lib/tracking/consent-targets.ts`) ist ZULÄSSIG, WENN der
    Compiler ihn verlangt. Er ist dann eine STRUKTURELLE PFLICHT, keine Entscheidung.
    GEMESSEN am Repo (2026-08-17): Beide sind als `Record<TrackingTarget, …>` typisiert,
    und ein Kommentar in derselben Datei behauptet, eine Erweiterung von
    `TRACKING_TARGETS` erzeuge dort einen Typfehler. FOLGERUNG aus der gemessenen
    Typform, NICHT selbst am Compiler geprüft: Ein `Record` über einer Vereinigung
    verlangt alle Mitglieder. Der Kommentar ist ein Suchhinweis, kein Beleg — geprüft
    wird im Plan.
  · WELCHEN WERT DER EINTRAG TRÄGT, IST HIER NICHT ENTSCHIEDEN. Er wird im Plan
    VORGELEGT, nicht im Bau gewählt.
  · DIE FALLE, ohne die dieser Punkt harmlos aussieht: Ein heute FOLGENLOSER Eintrag wird
    mit dem Adapter in 11.1b WIRKSAM — und zwar OHNE dass irgendwo etwas rot wird, weil
    sich am Eintrag selbst nichts ändert. Trägt er eine Semantik, die bei fehlender Angabe
    "erlaubt" bedeutet, entsteht in 11.1b ein Forward OHNE Einwilligung. Diese Figur ist
    im Projekt schon einmal aufgetreten: eine Regel, deren BEGRÜNDUNG beim zweiten Ziel
    nicht mehr trug, während ihr WORTLAUT korrekt blieb (docs/immer-beachten.md, "EINE
    REGEL KANN RICHTIG SEIN UND NICHT SKALIEREN").
  (Der Vorrats-Eintrag zu derselben Messung bleibt stehen — dort steht die Beobachtung,
  hier ihre Abgrenzung für diese Scheibe.)
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

### Drei offene Fragen — FRAGEN, kein Befund

Sie werden im Stufe-1-Prompt AM CODE beantwortet, nicht hier.

1. **Wie ist der Zustand einer Ziel-Karte heute zusammengesetzt, und kennt sie einen
   TEILZUSTAND ("Zugangsdatum ja, Kennung nein")?** Anlass für die Frage, GEMESSEN am Repo
   (2026-08-17): Es gibt `TARGET_CARDS` mit einem Merkmal `hasAdapter`
   (`src/lib/tracking/target-adapters.ts`), eine eigene Ableitung in
   `src/lib/tracking/target-readiness.ts` und daneben `listConfiguredTargets`
   (`src/app/projects/actions.ts`) — WELCHE davon den angezeigten Zustand bildet und ob
   eine von ihnen einen Teilzustand überhaupt darstellen kann, ist damit NICHT beantwortet.
2. **Wo überall steht die Menge der gültigen Ziele im Code** — einschliesslich der Stellen,
   die ein UNBEKANNTES Mitglied VERWENDEN, statt über die Menge zu iterieren? Eine
   Strukturprüfung findet nur die Iterierer. GEMESSEN ist bislang nur der Ausgangspunkt:
   `TRACKING_TARGETS` in `src/lib/settings.ts` und die CHECK-Bedingung in der Datenbank.
   AUSDRÜCKLICH KEINE ANTWORT: In `src/lib/tracking/target-adapters.ts` steht ein
   Kommentar, der eine Liste solcher Stellen nennt. Ein Kommentar ist eine BEHAUPTUNG,
   keine Eigenschaft — er ist ein Suchhinweis und wird geprüft, nicht abgeschrieben.
3. **Fällt der Einwilligungs-Zweig für ein Ziel OHNE Adapter tatsächlich vorher heraus —
   am Code, nicht laut Kommentar?**
   AUFLAGE, die aus der Abgrenzung oben folgt: Die Frage lautet nicht mehr nur OB, sondern
   zusätzlich WORAN der Zweig das entscheidet — am FEHLENDEN ADAPTER oder am
   EINWILLIGUNGS-WERT. **Nur die erste Antwort trägt den Ausschluss über 11.1b hinaus.**
   Entscheidet er am Wert, ist der heute folgenlose Eintrag genau die Falle, die oben
   beschrieben ist, und die Antwort gehört in den Plan, bevor der Eintrag gesetzt wird.

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

## Hebungs-Kandidaten

Hier steht, was am Phasenende zur Aufnahme in docs/immer-beachten.md, ins
Sicherheits-Manifest oder in eine der Zustandsdateien VORGESCHLAGEN wird — eine Regel wird
erst durch die Hebung wirksam, nicht durch den Eintrag hier. Jeder Kandidat nennt, WO er
hin soll und WELCHER Beleg ihn trägt.

(noch leer)

## Scheiben-Vermerke

Ein Vermerk entsteht NACH dem bestätigten Live-Test einer Scheibe, nicht nach dem grünen
Test und nicht nach dem Commit allein. Er trägt seine stabile Nummer (s.
Fortschreibungsregeln), was gebaut wurde, was gemessen wurde und die Commit-Nummer; der
jüngste, noch nicht committete Vermerk darf sie als EINZIGER offen lassen.

(noch leer — es ist nichts gebaut)
