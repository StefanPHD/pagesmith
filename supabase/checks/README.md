# supabase/checks — wiederkehrende Messproben

**Dieser Ordner ist KEIN Migrationsverzeichnis.** Die Dateien hier werden **manuell im
Supabase-SQL-Editor** ausgeführt, wenn eine Frage zu beantworten ist. Sie laufen **nie**
als Migration, sie werden **nie** automatisch angewandt, und sie tragen sich **nicht** in
`schema_migrations` ein. Wer eine Datei hier für eine Migration hält, sucht im falschen
Ordner — Migrationen liegen in `supabase/migrations/` und sind durchnummeriert.

## Warum es diesen Ordner gibt

Diese Proben wurden bei jedem Live-Test **neu getippt**. Genau dabei ist am 2026-07-27 ein
`and custom_host is null` im JOIN durchgerutscht: ein Projekt mit Custom-Domain wurde
fälschlich als divergent gemeldet, und die Fehlersuche lief ins Leere, bis der Browser den
Fehlalarm widerlegte. Eine geprüfte, versionierte Query ersetzt das frische Tippen — und
der Kopfkommentar trägt die Falle mit, statt dass sie jedes Mal neu gefunden werden muss.

## Harte Regel: nur lesend

Jede Datei hier enthält **ausschließlich** `select`. Kein `insert`, `update`, `delete`,
`alter`, `create`, `drop`, `truncate` — auch nicht "nur kurz zum Reparieren". Wer etwas
reparieren will, tut das bewusst und einzeln, nicht aus einer Datei, die "Probe" heißt.

Das gilt auch umgekehrt: die **mutierenden** Runbook-Befehle (Kill-Switch sperren und
entsperren) stehen bewusst **nicht** hier, sondern in `CLAUDE.md` unter „KILL-SWITCH —
SQL-RUNBOOK". Sie gehören dorthin, weil diese Datei in jeder Session geladen wird und im
Ernstfall auffindbar sein muss.

## Platzhalter

Wo eine Probe ein bestimmtes Projekt braucht, steht `<PROJEKT_UUID>` im Text — deutlich
markiert und im Kopfkommentar unter `PLATZHALTER` benannt. **Es stehen keine echten
Projekt-IDs, Labels oder Tokens in diesen Dateien.**

## Aufbau jeder Datei

Jede `.sql` beginnt mit einem Kopfkommentar aus festen Feldern:

| Feld | Bedeutung |
|---|---|
| `ZWECK` | was die Probe beantwortet |
| `ERWARTUNG` | das erwartete Ergebnis, konkret (z. B. „0 Zeilen" / „nur 'ok'") |
| `WANN` | bei welchem Anlass sie gefahren wird |
| `PLATZHALTER` | einzusetzende Werte, oder „keine" |
| `FALLE` | bekannte Fehlbedienung, falls es eine gibt |
| `VERIFIZIERT` | Datum, an dem die Query zuletzt gegen echte Daten lief |

`VERIFIZIERT` ist kein Schmuck: eine Probe, die seit Monaten niemand gefahren hat, kann
gegen ein zwischenzeitlich geändertes Schema laufen und still Unsinn liefern. Wer eine
Probe fährt, zieht das Datum nach.

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
