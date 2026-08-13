---
name: supabase-doku
description: Supabase-Doku VOR dem Bau nachschlagen und die Lesung als Provenienz belegen (Datum, Fundstelle, Folge für den Bau). Nutze diesen Skill IMMER, wenn eine Migration, ein Schema, eine Policy oder RLS, ein RPC oder eine DB-Funktion, ein search_path, ein Advisor-Befund, ein Backup oder PITR, der Analytics-Lesepfad oder eine Abfrage des Supabase-JS-Clients berührt wird — auch wenn nur danach GEFRAGT wird und nichts gebaut werden soll, und gerade dann, wenn die Antwort schon bekannt scheint. Trainingswissen über Supabase ist regelmässig veraltet; ohne Lesung gilt jede Angabe als UNGEPRÜFT und trägt keinen Plan.
---

# Supabase-Doku — nachschlagen, bevor gebaut wird

## Wozu es diesen Skill gibt

Ein Agent beantwortet Supabase-Fragen bevorzugt aus dem Gedächtnis und schlägt die
Live-Doku nur in einer Minderheit der Fälle nach. Das fällt hier NICHT im Build auf:
Ein falscher Default, ein umgezogener Endpunkt oder eine gedrehte Policy-Semantik
erzeugt keinen Typfehler und keinen roten Test — es fällt in der laufenden Datenbank
auf, und dort ist es teuer.

Dieser Skill ist die Auslösung, nicht das Wissen. Er sagt, WANN nachzuschlagen ist,
WO, und in welcher Form das Ergebnis vorzulegen ist.

## Die Pflicht

Berührt eine Runde einen der Auslöser aus der Beschreibung, wird die aktuelle
Supabase-Doku zur berührten Sache AUFGESCHLAGEN — vor dem Plan, nicht während des
Baus. Danach stehen in der Rückgabe der Runde, an derselben Stelle wie die
Umfangs-Ansage, drei Angaben:

- **DATUM** der Lesung.
- **FUNDSTELLE** — Seite und Abschnitt, nicht "die Supabase-Doku".
- **FOLGE FÜR DEN BAU** — was sich daraus ändert. Auch "nichts", dann ausdrücklich.

**Keine Angabe aus dem Gedächtnis.** Wo keine Lesung stattgefunden hat, steht das da.
Eine Angabe ohne Provenienz gilt als UNGEPRÜFT.

Die verbindliche Fassung dieser Pflicht steht in `docs/db-regeln.md`, Regel
"WER DB-CODE ANFASST, LEGT DIE GELESENE ANBIETER-DOKU ALS PROVENIENZ VOR". Dieser
Skill wiederholt sie nicht, er löst sie aus.

## Die Quellen

Fünf Themen, je eine Seite. Jede URL wurde am 2026-08-13 aufgerufen und trägt ihr
Thema (Prüfung im Bau-Bericht derselben Runde).

| Thema | Seite |
|---|---|
| RLS und Policies | https://supabase.com/docs/guides/database/postgres/row-level-security |
| Funktionen und `search_path` | https://supabase.com/docs/guides/database/functions |
| Backups und PITR | https://supabase.com/docs/guides/platform/backups |
| Die Advisors | https://supabase.com/docs/guides/database/database-advisors |
| Abfrage-Semantik des JS-Clients | https://supabase.com/docs/reference/javascript/select |

**Die Liste ist ein Einstieg, keine Grenze.** Betrifft eine Runde etwas, das hier
nicht steht (Auth, Realtime, Storage, Edge Functions), wird die passende Seite
gesucht und mit derselben Provenienz vorgelegt. Was fehlt, ist kein Freibrief.

**Eine URL, die ins Leere zeigt, wird nicht überbrückt.** Ist eine Seite umgezogen
oder verschwunden, wird die neue gesucht, geprüft und die Tabelle hier korrigiert —
nicht eine "nahe" Seite genommen und so getan, als sei es dieselbe.

## Was dieser Skill NICHT tut

**Er ersetzt keine Messung.** Ein Doku-Befund ist GELESEN, kein Beweis. Er sagt, was
der Anbieter zusagt — nicht, was in dieser Datenbank gilt. Was hier gilt, wird im
SQL-Editor gemessen; der gemessene Ist-Zustand steht in `docs/db-stand.md`, und die
Proben liegen unter `supabase/checks/`.

Beides wird gebraucht und keins ersetzt das andere: Die Doku sagt, wie der Anbieter
sich verhält, die Messung, wie dieses Projekt dasteht. Wer nur liest, plant gegen ein
Schema, das er nicht kennt; wer nur misst, sieht nicht, dass sich der Anbieter unter
ihm bewegt hat.

**Er ersetzt die bestehenden Regeln nicht und wiederholt sie nicht.** Für Migrationen,
`search_path` und Backups gelten die drei Regeln in `docs/db-regeln.md`. Sie stehen
dort und nur dort.

**Widerspricht ein Doku-Befund einer dieser Regeln, wird die Regel NICHT geändert.**
Die Regeln tragen eigene Messungen an dieser Datenbank, teils mit ausdrücklichem
Verbot, sie zu "korrigieren". Ein Widerspruch wird VORGELEGT — mit beiden Seiten,
Datum und Fundstelle — und der Owner entscheidet. Eine stille Angleichung an die
Anbieter-Doku wäre genau der Fehler, gegen den die Regeln geschrieben wurden.

**Er entscheidet nichts über die laufende Datenbank.** Ob eine Migration angewandt
ist, steht weder in der Doku noch im Repo — das ist ausschliesslich eine Messung.
