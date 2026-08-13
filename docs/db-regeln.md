# DB-/Migrations-Regeln — ausgelagert aus CLAUDE.md, "## Immer beachten"

## Was diese Datei ist

Die dauerhaft gültigen REGELN für Arbeit an Migrationen, DB-Funktionen und Backups.
**SIE WIRD NICHT AUTOMATISCH GELADEN.** Nur CLAUDE.md ist in jeder Session da; diese
Datei muss aufgeschlagen werden.

**PFLICHT-STOPP, KEINE EMPFEHLUNG — derselbe Auslöser wie bei `docs/db-stand.md`:** Wer
eine Migration schreibt oder am Schema, an Policies, an einem RPC oder am
Analytics-Lesepfad arbeitet, LÄDT diese Datei ZUERST — vor dem Plan, nicht während des
Baus. Die Auflage steht in CLAUDE.md, "## Aktueller DB-/Analytics-Stand".

**DIE GRENZE ZU `docs/db-stand.md`, und sie ist der Grund für zwei Dateien statt einer:**
Diese hier trägt REGELN — was zu tun und zu lassen ist, dauerhaft. Jene trägt den
GEMESSENEN ZUSTAND — Migrationsstand, Tabellen, Policies, Grants, Funktionen — und wird
ausschliesslich aus einer Messung fortgeschrieben, nie aus einer Regel. **BEIDE WERDEN
ZUSAMMEN GELADEN:** Eine Regel ohne den Zustand plant gegen ein Schema, das man nicht
kennt; ein Zustand ohne die Regeln sagt nicht, was man mit ihm tun darf.

**HERKUNFT UND UNVERSEHRTHEIT:** Die drei Blöcke unten stammen aus CLAUDE.md,
"## Immer beachten", und sind **ZEICHENGLEICH** übernommen — kein Wort umformuliert, kein
Satz gekürzt, kein Kommentar ergänzt, die Reihenfolge ist die des Ursprungs. Der Umzug ist
per Prüfsumme über alle drei Blöcke nachgewiesen. **Wer hier etwas ändert, ändert eine
Regel, die vorher jede Session gelesen wurde** — das ist kein Redaktionsvorgang.

## Die drei Regeln

- DB-FUNKTIONEN + SEARCH_PATH (Advisor-Regel, präzisiert nach Messung 2026-07-28): Jede neue
  DB-Funktion bekommt eine FIXIERTE search_path-Klausel (sonst flaggt der Supabase-Advisor
  "Function Search Path Mutable"). WELCHER Wert, hängt vom SICHERHEITSMODUS ab:
  - SECURITY INVOKER (Normalfall): `set search_path = public`. Body zusätzlich voll
    qualifizieren (public.tabelle).
  - SECURITY DEFINER: `set search_path = pg_catalog` — der MINIMALE Pfad, NICHT public. Grund:
    eine DEFINER-Funktion läuft mit Owner-Rechten; löst sie unqualifizierte Namen über public
    auf, kann ein dort angelegtes Objekt die Auflösung kapern. Alles ausserhalb von pg_catalog
    im Body voll qualifizieren.
  GEMESSENER IST-ZUSTAND, der NICHT "korrigiert" werden darf (2026-07-28): rls_auto_enable —
  die EINZIGE SECURITY-DEFINER-Funktion im System — trägt search_path=pg_catalog. Das ist
  korrekt. Die frühere Fassung dieser Regel sagte pauschal "gilt für SECURITY INVOKER wie
  DEFINER" und hätte beim Rebuild aus supabase/manual/rls_auto_enable.sql zu einer "Korrektur"
  auf public eingeladen — das hätte die einzige Sicherheitsfunktion des Systems STILL
  geschwächt, mit der Doku als Rückendeckung. Bei jedem Rebuild bleibt der Byte-Abgleich gegen
  pg_get_functiondef Pflicht (s. "## Offene Punkte").
- MIGRATION IMMER VOR CODE-DEPLOY (fail-closed): Eine Migration läuft IMMER im SQL-Editor VOR
  dem zugehörigen Code-Deploy — sonst liest der neue Code eine Spalte/Funktion, die es noch
  nicht gibt (bei CAPI hätte das die laufende trackingKey-Auflösung gebrochen). Umgekehrt ist
  eine Migration OHNE den zugehörigen Code in der Regel ein No-op und damit gefahrlos. Detail:
  docs/claude-history/phase-8-analytics.md.
  PROTOKOLL-PFLICHT (ab 0018): JEDE künftige Migration schreibt als LETZTE Anweisung ihren
  eigenen Eintrag:
  ```sql
  insert into public.schema_migrations (version, filename, applied_at)
  values ('00XX', '00XX_name.sql', now()) on conflict (version) do nothing;
  ```
  AM ENDE, damit der Eintrag nur bei erfolgreichem Durchlauf entsteht — bricht die Migration
  vorher ab, gibt es keine Zeile, die einen nie vollzogenen Lauf behauptet. Zweck: "welche
  Migration ist gelaufen?" war bisher NICHT direkt messbar (nur die WIRKUNGEN waren es —
  Spalte da? Constraint da?), damit hing die Reihenfolge-Regel allein an Disziplin.
  ACHTUNG — PROTOKOLL, KEIN STEUERUNGSMECHANISMUS: Es gibt KEINEN Migrations-Runner, der aus
  schema_migrations liest, und es soll keinen geben. Wer die Tabelle als "hat schon
  gelaufen"-Gate missversteht, baut eine Automatik, die wir bewusst nicht haben — die
  Migrationen laufen weiterhin manuell im SQL-Editor, die Idempotenz-Guards in den Dateien
  selbst (if not exists, Katalog-Guard) bleiben die Absicherung gegen Doppelläufe.
- BACKUP-WIEDERVORLAGE HÄNGT AN MIGRATIONEN, NICHT AM KALENDER (dieselbe Naht wie
  "Migration vor Deploy", nur am anderen Ende) — NEU GEFASST 2026-07-29 nach dem
  Pro-Wechsel, NICHT gestrichen:
  WAS ENTFÄLLT: die Pflicht zum manuellen pg_dump nach jeder Migration. Supabase Pro zieht
  TÄGLICH automatisch (7 Tage Retention); ein Handlauf daneben wäre Arbeit ohne Zugewinn.
  WAS BLEIBT — und das war immer der eigentliche Kern der Regel: die WIRKRICHTUNG. Ein
  Backup wird nicht durch ALTER gefährlich, sondern dadurch, dass das SCHEMA seither
  weitergezogen ist; ein Restore liefert dann eine DB, die der deployte Code nicht bedienen
  kann. Automatische Backups nehmen diese Gefahr NICHT weg, sie verschieben sie nur: das
  jüngste Backup ist jetzt höchstens 24 h alt, kann aber trotzdem VOR einer Migration liegen,
  die seither gelaufen ist.
  DARAUS DIE HEUTIGE FASSUNG: Nach JEDER ausgeführten Migration gilt das automatische Backup
  als NICHT mehr code-kompatibel, bis der nächste tägliche Snapshot durch ist. In diesem
  Fenster ist ein Restore nur mit anschliessendem manuellen Nachziehen der Migration
  brauchbar. Wer in diesem Fenster eine riskante Operation fährt, zieht vorher EINEN
  manuellen Dump — nicht als Routine, sondern als Absicherung genau dieser Lücke.
  KEIN VERSTOSS GEGEN DIE DATENZUGRIFFS-REGEL: ein pg_dump ist ein OPS-Weg. Die Regel "nur
  über den Supabase-JS-Client" gilt für ANWENDUNGScode; wer sie auf Betriebswerkzeuge
  ausdehnt, verbietet sich das einzige Mittel, das dieses Fenster überhaupt absichert.
  Seit 0018 trägt jeder Dump schema_migrations IN SICH: der abgedeckte Stand steht im Backup
  selbst statt in einer Notiz daneben, die verlorengeht. Das gilt für automatische Backups
  genauso und ist der Grund, warum die Lücke überhaupt erkennbar ist.
  Ist-Stand (Tier, PITR-Loch, Drill): "## Security Manifest & Launch Blocker", BACKUPS —
  hier nur die Regel.

## Die vierte Regel — HIER entstanden, NICHT aus CLAUDE.md gehoben

**WARUM SIE UNTER EINER EIGENEN ÜBERSCHRIFT STEHT, und das ist keine Formsache:** Der
Abschnitt darüber sagt zu, seine **drei** Blöcke seien zeichengleich aus CLAUDE.md
übernommen. Diese Regel stammt nicht von dort — sie ist am 2026-08-13 neu geschrieben
worden. Stünde sie unter jener Überschrift, wäre die Herkunftszusage falsch, und zwar
still: Niemand hätte einen Anlass, sie nachzuprüfen. Die drei Blöcke oben bleiben
unberührt und per Prüfsumme belegt.

- WER DB-CODE ANFASST, LEGT DIE GELESENE ANBIETER-DOKU ALS PROVENIENZ VOR (neu
  2026-08-13; AUSLÖSER: derselbe wie der Pflicht-Stopp — Migration, Schema, Policy/RLS,
  RPC bzw. DB-Funktion, Analytics-Lesepfad; dazu search_path, Advisor-Befunde und
  Backup/PITR): Vor dem Plan wird die AKTUELLE Supabase-Doku zur berührten Sache
  aufgeschlagen. Der Skill `.claude/skills/supabase-doku/SKILL.md` trägt die Quellen und
  löst die Regel aus; er ERSETZT sie nicht — fällt der Skill aus, gilt die Regel
  unverändert.
  DREI ANGABEN, und sie gehören zusammen: DATUM der Lesung · FUNDSTELLE (Seite und
  Abschnitt, NICHT "die Supabase-Doku") · FOLGE FÜR DEN BAU (was sich daraus ändert —
  auch "nichts", dann ausdrücklich).
  KEINE ANGABE AUS DEM GEDÄCHTNIS. Wo keine Lesung stattgefunden hat, steht das da; eine
  Angabe ohne Provenienz gilt als UNGEPRÜFT und trägt keinen Plan.
  DAS GATE — der Teil, ohne den die Regel ein Ehrenwort bleibt: Jede andere Pflicht in
  diesem Projekt hat einen Mechanismus, der von aussen sichtbar ist — ein Build-Fehler,
  ein roter Test, eine Prüfsumme, ein Stopp, der gelesen wird. Diese hier hat die
  VORLAGE: Trifft eine Runde den Auslöser, gehören die drei Angaben IN DIE VERLANGTE
  RÜCKGABE, an derselben Stelle wie die Umfangs-Ansage. Damit ist eine fehlende
  Provenienz beim Review SICHTBAR, statt im Kopf des Bauenden zu bleiben. Das ist der
  einzige Unterschied zwischen dieser Regel und einem guten Vorsatz.
  DER GRUND, ohne den die Regel beim ersten Zeitdruck fällt: Anbieter-Verhalten altert
  schneller als jedes Trainingswissen, und ein falscher Endpunkt, ein falscher Default
  oder eine gedrehte Policy-Semantik fällt hier NICHT im Build auf, sondern erst in der
  laufenden DB. Dieselbe Klasse hat in diesem Projekt schon zweimal zugeschlagen: der
  hardcodierte Serving-Suffix erzeugte auf der neuen Serving-Domain lautlose 404er
  (s. "ABLEITEN STATT HARDCODEN" in CLAUDE.md), und der für NEUE Zugänge geschlossene
  Google-Weg fiel ausschliesslich durch eine Doku-Lesung auf — aus dem Gedächtnis wäre
  eine Scheibe auf einen Weg zugeschnitten worden, den es für uns nicht mehr gibt
  (Roadmap-Zeile 11.2).
  SIE IST KEINE NEUE DISZIPLIN, SONDERN DIE BESTEHENDE AUF EINEN NEUEN GEGENSTAND:
  GEMESSEN/GELESEN mit Datum und Quelle gilt hier seit Phase 11 für Anbieter-Befunde.
  Diese Regel dehnt sie auf die Doku aus, die einem Bau VORAUSGEHT — sie erfindet kein
  Vokabular und keinen zweiten Weg.
  WIDERSPRICHT EIN DOKU-BEFUND EINER DER DREI REGELN OBEN, WIRD DIE REGEL NICHT
  GEÄNDERT: Jene tragen eigene Messungen an DIESER Datenbank, und eine davon verbietet
  ausdrücklich, den gemessenen Zustand zu "korrigieren". Der Widerspruch wird VORGELEGT
  (beide Seiten, Datum, Fundstelle), der Owner entscheidet. Eine stille Angleichung an
  die Anbieter-Doku wäre genau der Fehler, gegen den jene Regeln geschrieben wurden.
