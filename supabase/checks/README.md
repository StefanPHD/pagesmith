# supabase/checks — wiederkehrende Messproben

**Dieser Ordner ist KEIN Migrationsverzeichnis.** Die Dateien hier werden **manuell im
Supabase-SQL-Editor** ausgeführt, wenn eine Frage zu beantworten ist. Sie laufen **nie**
als Migration, sie werden **nie** automatisch angewandt, und sie tragen sich **nicht** in
`schema_migrations` ein. Wer eine Datei hier für eine Migration hält, sucht im falschen
Ordner — Migrationen liegen in `supabase/migrations/` und sind durchnummeriert.

**DER SQL-EDITOR IST DER NORMALFALL, NICHT DIE EINZIGE UMGEBUNG.** Eine Probe darf einen
Teil gegen den **REST-Endpunkt** fahren, **wenn die gemessene Frage eine PostgREST-Frage
ist** — dann sagt sie das in ihrem Kopf unter `WANN`, und der Grund gehört dazu: **Wer eine
PostgREST-Frage im SQL-Editor misst, beantwortet eine andere.** Der eine Weg ist aus dem
anderen nicht zu erschliessen; es sind zwei Systeme, und gemessen wird das, gegen das man
spricht.

## Warum es diesen Ordner gibt

Diese Proben wurden bei jedem Live-Test **neu getippt**. Genau dabei ist am 2026-07-27 ein
`and custom_host is null` im JOIN durchgerutscht: ein Projekt mit Custom-Domain wurde
fälschlich als divergent gemeldet, und die Fehlersuche lief ins Leere, bis der Browser den
Fehlalarm widerlegte. Eine geprüfte, versionierte Query ersetzt das frische Tippen — und
der Kopfkommentar trägt die Falle mit, statt dass sie jedes Mal neu gefunden werden muss.

## Harte Regel: keine Probe fasst echte Daten an

**DER ZWECK, unverändert:** Eine Probe MISST einen Zustand. Wer sie fährt, soll nichts
verlieren können — kein "nur kurz zum Reparieren". Wer etwas reparieren will, tut das
bewusst und einzeln, nicht aus einer Datei, die "Probe" heißt.

**DER MECHANISMUS — zwei zulässige Bauformen, und nur diese zwei:**

1. **Ausschließlich lesend.** Nur `select`. Kein `insert`, `update`, `delete`, `alter`,
   `create`, `drop`, `truncate`. Das ist der Normalfall.
2. **Schreibend AUSSCHLIESSLICH an einem WEGWERF-OBJEKT**, das die Datei SELBST wieder
   entfernt. Dann gilt zusätzlich, alles drei: das Wegwerf-Objekt trägt einen erkennbaren
   eigenen Namen und berührt keine bestehende Tabelle · das AUFRÄUMEN ist ein
   ausgewiesener Pflicht-Teil der Datei, nicht auskommentiert und nicht "später" · und
   dahinter steht eine GEGENPROBE, die zeigt, dass es weg ist.

**DIE AUFLAGE AN JEDE DATEI DER ZWEITEN BAUFORM:** Sie sagt es in ihrem KOPF, als
benannte `FALLE`. Wer eine Prüfdatei öffnet und "nur lesend" annimmt, weil der Ordner es
sagt, soll im ersten Absatz merken, dass diese anders ist — nicht in der Mitte des
Skripts.

**HIER STEHT BEWUSST KEINE ZAHL.** Nicht "eine Ausnahme", nicht "zwei". Beschrieben wird
die KLASSE, nicht ihre Größe: eine Zahl ist beim nächsten Fall wieder falsch, und sie
wird dann nicht nachgezogen, weil niemand sie sucht.

**ÄLTERE KOMMENTARE IN ANGEWANDTEN MIGRATIONEN ZITIEREN DIE FRÜHERE FASSUNG** ("dieser
Ordner darf ausschliesslich lesen"). **Sie bleiben als ZEITDOKUMENT stehen** — angewandte
Migrationen werden nicht nachträglich umgeschrieben, auch kein Kommentar. Wer dort auf den
alten Wortlaut trifft, liest ihn als Aussage über seinen Tag, nicht über heute.

Das gilt auch umgekehrt: die **mutierenden** Runbook-Befehle (Kill-Switch sperren und
entsperren) stehen bewusst **nicht** hier, sondern in `CLAUDE.md` unter „KILL-SWITCH —
SQL-RUNBOOK". Sie gehören dorthin, weil diese Datei in jeder Session geladen wird und im
Ernstfall auffindbar sein muss.

## Platzhalter

Wo eine Probe ein bestimmtes Projekt braucht, steht `<PROJEKT_UUID>` im Text — deutlich
markiert und im Kopfkommentar unter `PLATZHALTER` benannt. **Es stehen keine echten
Projekt-IDs, Labels oder Tokens in diesen Dateien.**

Eine Probe, die gegen den REST-Endpunkt misst, braucht zwei weitere Angaben: eine
**Basis-Adresse** und ein **Zugangsdatum**. Für die Basis-Adresse gilt dasselbe wie für
`<PROJEKT_UUID>` — Platzhalter im Text, benannt unter `PLATZHALTER`.
**DAS ZUGANGSDATUM STEHT NIE IN DER DATEI UND NIE IN DER KOMMANDOZEILE.** Die Datei sagt
stattdessen, wie es **ohne Anzeige** in eine Umgebungsvariable eingelesen wird — eine
Zuweisung auf der Kommandozeile landet in der Shell-Historie und ist deshalb kein Schutz,
sondern nur ein anderer Ablageort. Der Satz darüber wird dadurch **verschärft, nicht
aufgeweicht**: Er hält das Zugangsdatum aus der Datei heraus, dieser Absatz zusätzlich aus
dem bequemen Weg daneben.

## Aufbau jeder Datei

Jede `.sql` beginnt mit einem Kopfkommentar aus festen Feldern:

| Feld | Bedeutung |
|---|---|
| `ZWECK` | was die Probe beantwortet |
| `ERWARTUNG` | das erwartete Ergebnis, konkret (z. B. „0 Zeilen" / „nur 'ok'") — oder „KEINE", s. unten |
| `WANN` | bei welchem Anlass sie gefahren wird |
| `PLATZHALTER` | einzusetzende Werte, oder „keine" |
| `FALLE` | bekannte Fehlbedienung, falls es eine gibt |
| `VERIFIZIERT` | Datum, an dem die Query zuletzt gegen echte Daten lief |

`VERIFIZIERT` ist kein Schmuck: eine Probe, die seit Monaten niemand gefahren hat, kann
gegen ein zwischenzeitlich geändertes Schema laufen und still Unsinn liefern. Wer eine
Probe fährt, zieht das Datum nach.

**`ERWARTUNG` DARF „KEINE" TRAGEN — aber nur in EINEM Fall**, und der Unterschied gehört
benannt: Eine Probe, die einen BEKANNTEN Zustand bestätigt, trägt ihr erwartetes Ergebnis;
eine Probe, die eine OFFENE FRAGE ENTSCHEIDET, hat keins. Letztere führt dann je Messung
die möglichen **Ausgänge mit ihrer Bedeutung** auf, statt einen davon zum Soll zu erklären.
**EINE PROBE MIT ERWARTUNG PRÜFT; EINE OHNE MISST.** Wer beides vermischt, liest ein
Messergebnis als „bestanden" oder „durchgefallen" — und hat die Antwort damit vergeben,
bevor er sie hatte.

## Die Proben

| Datei | Beantwortet |
|---|---|
| `domain-divergenz.sql` | Stimmen `settings.hosting.label` und die `domains`-Label-Zeile überein? |
| `domain-mehrfach-label.sql` | Hat ein Projekt mehr als eine Label-Zeile? |
| `published-content-keys.sql` | Trägt `published_content` das erwartete Key-Set (Schema-Drift)? |
| `variant-b-konsistenz.sql` | Liegen die Text-Overrides von A und B im richtigen Slot? |
| `ab-test-flag.sql` | Läuft ein A/B-Test, ohne dass es etwas Auslieferbares gibt? |
| `adblock-loss-gegenprobe.sql` | Rechnet `get_adblock_loss` richtig (unabhängiger zweiter Weg)? |
| `db-stand.sql` | Wie sieht das `public`-Schema wirklich aus (Migrationen, Spalten, RLS, Indizes, Funktionen)? |
| `restore-drill.sql` | Übersteht der Event-Trigger `ensure_rls` einen Supabase-Restore, oder muss er manuell nachgezogen werden? |
| `project-secrets-target-check.sql` | Welche Zielwerte lässt `project_secrets` heute zu (Constraint im Wortlaut), und ist die zugehörige Migration protokolliert? |
| `upsert-arbiter-probe.sql` | Genügt PostgREST für ein `upsert` ein UNIQUE-Constraint, oder verlangt es den Primärschlüssel — und kollidieren zwei Zeilen mit `NULL` in einer Konflikt-Spalte? |
| `bedingte-schreibung-probe.sql` | Was meldet PostgREST bei einer bedingten Schreibung zurück — bei null Treffern, mit `count`, und bei Singular-Anforderung? |
