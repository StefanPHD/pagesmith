# Phase 11.11 — Import-Bereinigung: DER AKTIVE STAND, ARCHIVIERT

**WAS DIESE DATEI WAR:** der steuernde Stand der Phase 11.11 — das, was jeweils galt, nicht
das, was geworden ist. **Sie hiess bis zum Phasenende `docs/aktiver-stand.md`** und war das
Pflicht-Gate ("Auftrag 0") jeder Sitzung, die an der Phase arbeitete.

**ZEITRAUM UND UMFANG:** angelegt am 2026-09-21, archiviert am 2026-09-22 — **die Phase hat
zwei Tage gedauert**, über DREISSIG Commits. FÜNF Scheiben, alle gebaut und live bestätigt,
in Bau-Reihenfolge: **11.11a** der Sandbox-Wächter (`4efa94b`), **11.11d** die eigenen
Bausteine (`0b9bd7f`), **11.11b** Erkennung und Anzeige (`6d6ab42`), **11.11c** das Entfernen
fremder Pixel auf Klick (`bcd3c5a`), **11.11e** die Bündelung der Fundliste (`aad143e`).
Dazwischen ZWEI Anbieter-Crawls und EINE Live-Messung ohne Zeile Code. ZEHN Vermerke,
**32** bindende Entscheidungen, NEUN Vorrats-Einträge, EIN Hebungs-Kandidat.
**DIE BUCHSTABEN TRAGEN KEINE REIHENFOLGE** — 11.11d ist vor 11.11b gebaut worden, und der
Grund steht im Zuschnitt.

**DER MESSWERT NACH docs/arbeitsweise.md, ABSCHNITT 2b** (GEMESSEN am Repo, CC, 2026-09-22,
`git log --numstat`; Summen aus Einfügungen und Löschungen):

| Phase | Spanne | `docs/` | `src/` | Verhältnis docs : src |
|---|---|---|---|---|
| **11.11** | `b57d9a6^..88650e6` | **4 472** | **6 828** | **0,65 : 1** |
| 11.6 (Vorphase) | `7be1e9a^..b4e40d4` | 1 058 | 1 713 | 0,62 : 1 |
| 11.13 | `023eb5a^..7a6a5f6` | 6 407 | 7 192 | 0,89 : 1 |
| 11.12 | `a7fe5fe^..cd0b344` | **1 206** | 784 | **1,54 : 1** |

**DIE SPANNE ENDET VOR DEN PHASENENDE-COMMITS**, und das ist die Hausform und keine Wahl
dieser Runde: Bei 11.6 und 11.13 endet sie ebenso am letzten Scheiben-Commit, weil der Kopf
IN dem Commit geschrieben wird, der ihn sonst mitzählen müsste. **MIT der Hebung (`c3b849a`)
wären es 4 808 zu 6 828, also 0,70 : 1** — die Zahl steht hier, damit niemand sie für einen
Messfehler hält, wenn er die Spanne anders zieht.
**ZWEI DER DREISSIG COMMITS SIND PHASENFREMD** und in den 4 472 enthalten: `c9a561f` (die
Werkzeug-Regel zum CRLF-Instrument, 60 Zeilen in docs/immer-beachten.md) und `01ff48b` (der
Vollzug des Änderungsantrags an docs/arbeitsweise.md, Abschnitt 4b, 10 Zeilen). Ohne sie
wären es 4 402 Zeilen und 0,64 : 1.
**DAS VERHÄLTNIS IST EINMAL GESTIEGEN, NICHT ZWEIMAL IN FOLGE** (1,54 → 0,89 → 0,62 →
**0,65**); der Befund der Arbeitsweise tritt NICHT ein.
**DIE WERTE DER VORPHASEN SIND NACHGEMESSEN UND NICHT ÜBERNOMMEN WORDEN — UND EINER GEHT
NICHT AUF:** Der Archivkopf der Phase 11.13 führt für 11.12 **1 165** Zeilen in `docs/` und
**1,49 : 1**; an derselben dort genannten Spanne misst diese Runde **1 206** und
**1,54 : 1** (auch mit Umbenennungs-Erkennung, drei Varianten geprüft). **DIE DIFFERENZ VON
41 ZEILEN IST NICHT AUFGEKLÄRT, UND SIE WIRD HIER NICHT WEGGERECHNET.** 11.13 (0,89) und
11.6 (0,62) sind dagegen auf die Zeile reproduziert. **Für die Reihe ist es folgenlos:**
Beide Werte für 11.12 liegen weit über 0,89, die Richtung ändert sich nicht.
**IN DER SPANNE FÜHRT GIT KEINE DATEI ALS BINÄR** — `src/lib/mappings.ts` mit ihrem NUL-Byte
ist in dieser Phase nicht angefasst worden und verfälscht die Summe deshalb nicht.

**WIE SIE ENDETE:** Ihr Marker steht auf `[x]`, und das heisst **BAU-FERTIG** — nicht "die
Import-Bereinigung ist fertig". **WAS AM HAKEN UNBEWIESEN IST, STEHT AN DER ROADMAP-ZEILE
11.11** (docs/roadmap.md) und wird hier NICHT verdoppelt; der tragende Punkt: **auf der
einzigen echten Seite, an der die Erkennung gemessen worden ist, hat die Signaturliste
KEINEN EINZIGEN Anbieter erkannt.**
**ZWEI WERKZEUG-FEHLGRIFFE SIND IN DIESER PHASE PROTOKOLLIERT, BEIDE OHNE SCHADEN — sie
stehen hier benannt und ziehen KEINE Regeländerung nach sich:** (1) Zweimal ist ein
Ganz-Datei-Schreiber an einer HILFSDATEI angesetzt worden — `perl -i` an
`src/components/PublishView.tsx` in 11.11d (VERMERK P11.11-23) und `sed -i` an der
Wegwerf-Probe der E2-Messung in 11.11e (VERMERK P11.11-42); dort wurde aus der
Versionsverwaltung wiederhergestellt, hier war die Datei eine Wegwerf-Datei, und in KEINEM
Commit ist davon etwas gelandet. Ob die Werkzeug-Regel um den Fall der Hilfs- und
Wegwerf-Datei geschärft wird, ist im Vermerk ausdrücklich NICHT entschieden. (2) Die
Nachricht des Hebungs-Commits `c3b849a` ist zunächst als PowerShell-Here-String angesetzt
worden statt per Bash-Heredoc und **vor dem Push berichtigt** — die committete Nachricht
trägt reines LF und keinen Artefakt-Rest (GEMESSEN, CC, 2026-09-22); die Ansage des
Fehlgriffs selbst ist eine ANGABE DES AUFTRAGS dieser Runde und am Repo nicht prüfbar.

**DAS PROTOKOLL DER HEBUNG — 2026-09-22, EIN COMMIT (`c3b849a`).** An jeder gehobenen Stelle
steht ein Zeiger; ohne ihn wäre ein umgezogener Eintrag von einem nie dagewesenen nicht zu
unterscheiden. **DIE BILANZ IST VOR DER ARCHIVIERUNG AM BESTAND DER ZIELDATEIEN GEGENGEPRÜFT
WORDEN — je Eintrag am ZIELORT, nicht gegen die Liste der Hebungs-Runde** (docs/arbeitsweise.md,
Phasenende: "Eine Liste, die von derselben Runde stammt wie die Verschiebung, bestätigt sich
selbst"). **42 EINTRÄGE, alle vier Klassen gehen auf** (GEMESSEN, CC, 2026-09-22):
- **ZWEI NACH docs/immer-beachten.md**, als datierte ERGÄNZUNGEN an einer bestehenden Regel
  und KEINE neue Regel: **ENTSCHEIDUNG P11.11-9** (dritter Satz — jeder neue Rahmen mit
  Kundencode bekommt denselben Sandbox-Wächter) an der Regel "Importierter User-Code läuft
  NUR im sandboxed iframe …", und **ENTSCHEIDUNG P11.11-24** (eine Meldung über einen Text
  wird aus dem aktuellen Text abgeleitet) an der Regel "ABLEITEN STATT LÖSCHEN
  (projekt-spezifischer View-State)". **GEGENPROBE:** je Marke genau EIN Treffer, beide
  innerhalb ihrer Zielregel gelegen (Position gegen Regelanfang und nächste Regel gemessen,
  leerraum-tolerant über `perl -0777`); Positivkontrolle an den zwei Regeltiteln, die wegen
  des Verzeichnisses erwartungsgemäss je ZWEIMAL stehen, Negativkontrolle NULL.
  **DER GRUND FÜR DIE ERGÄNZUNGS-FORM:** CLAUDE.md steht über ihrer Warnschwelle, und eine
  Ergänzung an der Regel, die den Gegenstand ohnehin trägt, ist die billigere und die
  auffindbarere Form.
- **SIEBEN INS BACKLOG** — **VORRAT P11.11-2, -3, -4, -6, -7, -8 und -9**, nach
  docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.11 gehoben (2026-09-22) —
  sieben Vorrats-Einträge und ein Restsatz", je unter ihrer Ursprungs-Nummer. **DAZU EIN
  EINTRAG OHNE EIGENE NUMMER:** der Restsatz aus VORRAT P11.11-5 ("ob Meta doppelt zählt,
  ist ungemessen"), dessen übriger Gegenstand mit der Scheibe 11.11d erledigt ist — **wer nur
  den offenen Vorrat sichtet, findet ihn nicht.** **GEGENPROBE:** alle acht als eigene
  Einträge im Abschnitt nachgewiesen; Negativkontrolle NULL, der Stub jener Datei in
  CLAUDE.md im selben Zug nachgezogen.
  **KEIN EINZIGER VORRATS-EINTRAG DIESER PHASE TRÄGT EINEN TRIGGER**, und jeder sagt das an
  seinem Abschnitt selbst — **nach docs/offene-punkte.md ist deshalb NICHTS gegangen.** Das
  zweiteilige Kriterium (benennbarer Trigger UND "geht sonst still kaputt") hat hier gar
  nicht getrennt. **ZWEI BESTEHENDE POSTEN JENER DATEI SIND TROTZDEM ANGEFASST**, als Zeiger
  bzw. Sachkorrektur und nicht als Neuaufnahme — "UNSER EINWILLIGUNGS-DIALOG KANN EIN FREMDES
  CMP ÜBERFAHREN" und "DER EINWILLIGUNGS-HOOK IST AN KEINER … STELLE BESCHRIEBEN"; **beide
  bleiben OFFEN.**
- **DREI GESTRICHEN, je mit dem Beleg der Erledigung am Eintrag:** **VORRAT P11.11-1**
  (erledigt mit 11.11a, `4efa94b`), **VORRAT P11.11-5** (erledigt mit 11.11d, `0b9bd7f`) und
  **HEBUNGS-KANDIDAT P11.11-1** (eingelöst mit der Neufassung des Pflicht-Stopps für
  docs/ziel-befunde.md in CLAUDE.md). **GEGENPROBE:** Titel und Beleg stehen je am Eintrag,
  beide Commit-Hashes existieren (`git cat-file -t`). **BEIM HEBUNGS-KANDIDATEN LAUTET DER
  BELEG "dieser Commit" UND NENNT KEINEN HASH** — gemeint ist der Hebungs-Commit `c3b849a`;
  dass er die Neufassung trägt, ist an seinem Diff nachgeprüft (CC, 2026-09-22). **Dieser
  Satz ist der Ersatz für den fehlenden Hash**, denn "dieser Commit" löst sich nur auf,
  solange jemand weiss, in welchem Commit der Satz entstanden ist.
- **DREISSIG BLEIBEN IM ARCHIV** — die übrigen Entscheidungen, mit einem SAMMELVERMERK
  "NICHT GEHOBEN" am Kopf ihres Abschnitts statt dreissig Einzelzeigern. **GESTRICHEN SIND
  SIE DAMIT NICHT: sie gelten, solange der Code steht.** Sie beschreiben, WIE der Code
  DIESER Phase gebaut ist — die fünf Klassen der Erkennung, die drei Parkformen, die
  Reihenfolge eigen-vor-fremd, die Bauform des Entfernens, die Freigaben je Plan, die
  Bündelung nach Host. **GEGENPROBE:** 32 Entscheidungs-Überschriften im Abschnitt, davon
  ZWEI mit Einzelzeiger "→ GEHOBEN 2026-09-22" (P11.11-9 und P11.11-24) — bleiben 30.
- **WAS SCHRITT 1 NICHT ERLEDIGT HAT:** Der Posten "DIE PRÄMISSE VON PUNKT (a) DES
  DATENKLASSEN-BLOCKS IST TOT" (docs/offene-punkte.md) hat mit dieser Phase seinen Trigger
  feuern sehen und ist **NICHT ANGEFASST** — an ihm selbst ist nichts falsch, und was er
  offenlässt, ist mehr als eine Sachkorrektur.

**ALTE ZEIGER AUF `docs/aktiver-stand.md` MEINEN NICHT IMMER DIESE DATEI**, sondern je nach
Alter eine frühere Standdatei — der Pfad trug je Phase eine andere (docs/immer-beachten.md,
EINE ABLAGE MIT HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE). **WELCHE ZEIGER DIESE
PHASE MEINEN, IST GEMESSEN (CC, 2026-09-22)**, Achse `docs/aktiver-stand\.md` über CLAUDE.md
und alle verfolgten Dateien in `docs/`, je Treffer der Kontext auf `11\.11` geprüft:
- **IN `docs/` UND CLAUDE.md GENAU DREI**, alle mit der Archivierung nachgezogen: die zwei
  im Zusatz vom 2026-09-21 an der Polish-Liste in docs/claude-history/backlog-polish.md
  (Entscheidung P11.11-2 und Designfrage D3) und der D4-Zeiger in der Roadmap-Zeile 11.11,
  der mit dem Kollabieren jener Zeile entfallen ist.
- **IN `src/` ELF**, in einem EIGENEN `chore`-Commit auf diesen Archivpfad nachzuziehen:
  sechs `beleg`-Felder in `src/lib/foreign-signatures.ts` und je ein Kommentar in
  `foreign-scan.test.ts`, `foreign-signatures.test.ts`, `foreign-strip.test.ts`,
  `own-blocks-waechter.test.ts` und `CodeImporter.test.tsx`. **SIE SIND IN DIESEM COMMIT
  NOCH TOT** — er fasst nur `docs/` und CLAUDE.md an; wer zwischen beiden Commits sucht,
  findet den alten Pfad nicht mehr.
- **VIER WEITERE ZEIGER IN `src/` MEINEN FRÜHERE STANDDATEIEN** und sind im offenen Punkt
  "ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI" geführt; sie sind in
  dieser Runde ausdrücklich NICHT angefasst worden.

**DER SATZ IM KOPF DES RUMPFES, DASS SIE DEN NAMEN `docs/aktiver-stand.md` "BIS ZUM
PHASENENDE" BEHÄLT, BLEIBT STEHEN.** Er ist ein Zeitdokument und war richtig, als er
geschrieben wurde; sonst ist am Rumpf nichts umformuliert. **Dasselbe gilt für die drei
datierten Zählzeilen des Rumpfes und für den Satz, mit dem sie am 2026-09-21 abgebrochen
worden sind:** sie sind alt und nicht falsch.

---

## Der Rumpf, wie er am Phasenende stand

**WAS DIESE DATEI IST:** der steuernde Stand der laufenden Phase 11.11 — das, was jeweils
gilt, nicht das, was geworden ist. Sie heisst `docs/aktiver-stand.md` und behält diesen
Namen bis zum Phasenende; an ihm hängt der Verfahrensslot ("existiert sie nicht, läuft
keine Phase — oder die Phase steht in ihrer ersten Aufklärung").

**SIE IST AB JETZT DAS PFLICHT-GATE ("Auftrag 0") JEDES BAU- UND AUFKLÄRUNGS-PROMPTS
DIESER PHASE.** Sie wird ZUERST gelesen — vor dem Plan, nicht während des Baus.

**IHR VORRANG IST ENG UND GILT NUR NACH INNEN:** Wo sie einer FRÜHEREN Fassung aus DIESER
Phase widerspricht, gilt sie. **Gegenüber docs/immer-beachten.md und docs/arbeitsweise.md
hat sie KEINEN Vorrang** — jene Dateien stehen über ihr, und eine Standdatei kann eine
Dauerregel weder lockern noch überschreiben.

**ANGELEGT AM 2026-09-21**, mit der ersten Tatsache der Phase: dem Bericht der
Aufklärungs-Runde desselben Tages. Das ist der vorgesehene Zeitpunkt
(docs/arbeitsweise.md, Die Standdatei, "Wann sie entsteht": "sobald die erste Tatsache der
Phase einen Ort braucht — in der Regel mit dem Ergebnis der ersten Aufklärung"; GELESEN,
CC, 2026-09-21).

**DER GEGENSTAND DER PHASE STEHT NICHT HIER, SONDERN AN DER ROADMAP-ZEILE 11.11**
(docs/roadmap.md) — dort im Volltext, mit Begründung, Auflagen und Provenienz. **Hier steht
bewusst KEINE Abschrift:** Zwei Fassungen desselben Gegenstands laufen auseinander, und die
Roadmap-Zeile ist die, an der die Entscheidungen getroffen worden sind. Was diese Datei
trägt, ist der am Bestand GEMESSENE Stand und das, was über eine Scheibe hinaus bindet.

**STAND AM 2026-09-21:** EIN Vermerk (P11.11-1, die erste Aufklärung) · EINE bindende
Entscheidung (P11.11-2) · FÜNF offene Designfragen (D1 bis D5) · VIER Vorrats-Einträge ·
KEIN Hebungs-Kandidat. **KEINE Scheibe zugeschnitten, KEINE Zeile Code geschrieben.** Der
Marker der Roadmap-Zeile 11.11 steht auf `[ ]`.

**FORTGESCHRIEBEN AM 2026-09-21, ZWEITE RUNDE DESSELBEN TAGES — DIE ZEILE DARÜBER IST DER
STAND DER ERSTEN RUNDE und wird nicht überschrieben, weil beide dasselbe Datum tragen und
eine ersetzte Zahl dann nicht mehr von einer falschen zu unterscheiden wäre.** STAND JETZT:
EIN Vermerk (P11.11-1) · **SECHS** bindende Entscheidungen (P11.11-2 bis P11.11-7) · die
fünf Designfragen D1 bis D5 sind **BEANTWORTET** und tragen je einen Zeiger auf ihre
Entscheidung · VIER Vorrats-Einträge · KEIN Hebungs-Kandidat. **DREI SCHEIBEN SIND
ZUGESCHNITTEN (11.11a, 11.11b, 11.11c), der Schnitt 11.11a im Detail** — Abschnitt 9.
**NOCH IMMER KEINE ZEILE CODE**, und der Marker der Roadmap-Zeile 11.11 steht unverändert
auf `[ ]`.

**FORTGESCHRIEBEN AM 2026-09-21, DRITTE RUNDE DESSELBEN TAGES — die zwei Zeilen darüber
bleiben als Stand ihrer Runde stehen, aus demselben Grund wie oben.** STAND JETZT: **ZWEI**
Vermerke (P11.11-1 die Aufklärung, P11.11-8 die gebaute Scheibe 11.11a) · **SIEBEN**
bindende Entscheidungen (P11.11-2 bis P11.11-7 und P11.11-9) · die fünf Designfragen bleiben
beantwortet · VIER Vorrats-Einträge, davon **P11.11-1 ERLEDIGT** und auf Titel plus Beleg
gekürzt · KEIN Hebungs-Kandidat. **DIE SCHEIBE 11.11a IST GEBAUT UND LIVE BESTÄTIGT**
(Bau-Commit `4efa94b`), ihr Zuschnitt ist verdichtet; 11.11b und 11.11c stehen aus. Der
Marker der Roadmap-Zeile 11.11 steht weiterhin auf `[ ]` — er gehört zum Phasenende, nicht
zur Scheibe.

**AB DER VIERTEN RUNDE DESSELBEN TAGES TRÄGT DIESER KOPF KEINE ZÄHLZEILE MEHR
(ARCHITEKT-VORGABE, 2026-09-21).** Die drei Zeilen darüber bleiben wörtlich stehen — sie
sind datiert und damit **alt und nicht falsch**. **DER GRUND FÜR DEN ABBRUCH DER BAUFORM IST
AN DIESER DATEI EINGETRETEN UND NICHT VORSORGLICH:** Seit der dritten Runde sind die
Entscheidungen P11.11-10 bis P11.11-12, P11.11-14 und P11.11-15, die Vermerke P11.11-13 und
P11.11-16 und der Vorrats-Eintrag P11.11-5 hinzugekommen, **ohne dass eine der drei Zeilen
nachgezogen worden wäre** — eine Zählzeile hält sich nur, solange jemand hinter ihr
herläuft, und der Nachzug ist selbst eine Änderung (docs/immer-beachten.md, EINE DATEI, DIE
IHRE EIGENE GRÖSSE IM PRÄSENS NENNT, ERZEUGT EINEN KREISLAUF AUS NACHZÜGEN). **WER DEN STAND
BRAUCHT, LIEST DIE ABSCHNITTE ODER MISST IHN** — die `###`-Überschriften je Gattung sind die
Achse. **WAS EINE RUNDE GETAN HAT, STEHT IN IHREM VERMERK**, nicht hier.

**DIE NUMMERNFORM IST `P11.11-n`** und wird hier weder neu entschieden noch neu begründet:
Sie ist seit dem 2026-09-17 Bauform JEDER Standdatei (docs/arbeitsweise.md, Die
Standdatei: "Jede Nummer trägt das Präfix ihrer Phase: `P<Phase>-n`, Buchstabe vorn";
GELESEN, CC, 2026-09-21). Vermerke, Entscheidungen, Vorrats-Einträge und
Hebungs-Kandidaten zählen unabhängig voneinander. **Die Designfragen zählen eigens mit
`D<n>`** — sie sind keine Entscheidungen und dürfen mit keiner verwechselt werden.

**PROTOKOLL DER HEBUNG (2026-09-22, SCHRITT 1 DES PHASENENDES).** Jeder Eintrag dieser Datei
trägt seit heute sein ZIEL an seinem Abschnitt; die dreissig nicht gehobenen Entscheidungen
tragen einen SAMMELVERMERK am Kopf ihres Abschnitts statt dreissig Einzelzeiger.
**DIE BILANZ — 42 EINTRÄGE, am Bestand nachgezählt (CC, 2026-09-22):**
· **2 → docs/immer-beachten.md** als datierte ERGÄNZUNGEN an bestehenden Regeln, KEINE neue
  Regel: ENTSCHEIDUNG P11.11-9 (dritter Satz) und ENTSCHEIDUNG P11.11-24.
· **7 → docs/claude-history/backlog-polish.md**, eigener datierter Abschnitt am Dateiende:
  VORRAT P11.11-2, -3, -4, -6, -7, -8, -9. **Dazu EIN Eintrag ohne eigene Nummer** — der
  Restsatz aus VORRAT P11.11-5.
· **2 GESTRICHEN, Gegenstand erledigt, je mit Beleg am Eintrag:** VORRAT P11.11-1 (Scheibe
  11.11a) und VORRAT P11.11-5 (Scheibe 11.11d).
· **30 BLEIBEN IM ARCHIV** — die übrigen Entscheidungen, Sammelvermerk "NICHT GEHOBEN".
· **1 GESTRICHEN, weil eingelöst:** HEBUNGS-KANDIDAT P11.11-1, mit der Neufassung des
  Pflicht-Stopps in CLAUDE.md.
**NACH docs/offene-punkte.md IST NICHTS GEGANGEN, UND DAS IST EIN BEFUND UND KEIN
VERSÄUMNIS:** Das Kriterium ist zweiteilig — benennbarer Trigger UND "geht sonst still
kaputt" —, und **KEIN EINZIGER VORRATS-EINTRAG DIESER PHASE TRÄGT EINEN TRIGGER**; jeder
sagt das an seinem Abschnitt selbst. **ZWEI BESTEHENDE POSTEN JENER DATEI SIND TROTZDEM
ANGEFASST**, aber als Zeiger bzw. Sachkorrektur und nicht als Neuaufnahme: "UNSER
EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN" und "DER EINWILLIGUNGS-HOOK IST AN
KEINER … STELLE BESCHRIEBEN". **Beide bleiben OFFEN.**
**WAS SCHRITT 1 NICHT ERLEDIGT HAT, mit Umfang:** Der Posten "DIE PRÄMISSE VON PUNKT (a) DES
DATENKLASSEN-BLOCKS IST TOT" (docs/offene-punkte.md) hat mit dieser Runde seinen Trigger
feuern sehen. **ER IST NICHT ANGEFASST** — an ihm selbst ist nichts falsch (seine zwei
Messungen gelten, am Repo nachgeprüft CC, 2026-09-22), und was er offenlässt, ist mehr als
eine Sachkorrektur: das Nachziehen des Punktes (a) im Datenklassen-Block wäre eine VIERTE
Stelle in jener Datei und führt der Posten ausdrücklich ohne Empfehlung; die zweite Hälfte
ist eine MESSUNG am gebauten Google-Transport und keine Doku-Arbeit.

---

## Abschnitts-Verzeichnis

Jeder Eintrag ist der wörtliche Anfang seiner Überschrift, ohne Marke — damit "lies
Abschnitt X plus das Verzeichnis" eine belegbare Aussage über den Umfang ist. Eine
Überschrift steht in dieser Datei damit ZWEIMAL, und die erste Fundstelle ist der
Verzeichnis-Eintrag (docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN
EINER DATEI MIT VERZEICHNIS NICHT). Wer bearbeitet, ankert entsprechend.

1. Abschnitts-Verzeichnis
2. Gegenstand und Ausgangslage
3. Entscheidungen, die über ihre Scheibe hinaus binden
4. Die offenen Designfragen
5. Wie diese Datei fortgeschrieben wird
6. Vermerke
7. Vorrat — gemeldet, nicht gebaut
8. Hebungs-Kandidaten
9. Zuschnitt — die drei Scheiben

**DER NEUNTE EINTRAG STEHT HINTEN UND NICHT AN SEINEM SACHLICHEN PLATZ**, und das ist
Absicht: Eine Einfügung in der Mitte verschiebt jede Nummer darunter, und jeder Zeiger der
Form "Abschnitt 5" zeigte danach auf etwas anderes. Dieselbe Bauform wie in
docs/immer-beachten.md ("Eine neue Regel wird HINTEN angefügt … Nichts wird umsortiert").

---

## Gegenstand und Ausgangslage

**DER GEGENSTAND STEHT AN DER ROADMAP-ZEILE 11.11** (docs/roadmap.md), Punkt (a); die
Entscheidung "erkennen und melden, entfernen nur auf Klick des Betreibers" dort unter (c),
die Unterscheidung zwischen Pixel und CMP unter (d), die beiden ausdrücklich offenen Punkte
unter (e) und die Ausschlüsse unter (f). **NICHTS DAVON WIRD HIER WIEDERHOLT.**

**WAS AM BESTAND GEMESSEN IST, STEHT IM VERMERK P11.11-1** — die fünf Stationen des
Import-Pfads mit Datei und Symbol, die Abwesenheit jeder entfernenden Operation, und die
Stelle, an der der importierte Text noch unverändert vorliegt. Das ist die Grundlage, auf
der die Designfrage D2 ("wann und wo die Erkennung läuft") überhaupt beantwortbar wird.

**DREI ANGABEN DER ROADMAP-ZEILE WAREN AM 2026-09-21 ÜBERHOLT** und sind im selben Zug
ERSETZT worden, nicht gestempelt (docs/arbeitsweise.md, Was mit einem falschen Satz
geschieht). Was ersetzt wurde und warum, steht im Vermerk P11.11-1; **der heutige Wortlaut
der Zeile ist der gültige**, diese Datei führt keine zweite Fassung davon.

---

## Entscheidungen, die über ihre Scheibe hinaus binden

**ZUR NUMMERIERUNG, damit niemand eine Lücke sucht, die keine ist:** Die
Entscheidungs-Zählung dieser Phase beginnt bei **2** — P11.11-1 ist beim Anlegen der Datei
an den Vermerk gegangen. Sie wird ab hier **lückenlos fortgeführt** (P11.11-3 und folgende)
statt auf 1 zurückgesetzt; eine Rücksetzung erzeugte zwei Einträge mit derselben Nummer,
und ein Zeiger "Entscheidung P11.11-2" träfe dann zwei Stellen.

**SAMMELVERMERK DER HEBUNG (2026-09-22) — NICHT GEHOBEN: DREISSIG VON ZWEIUNDDREISSIG
ENTSCHEIDUNGEN BLEIBEN IM ARCHIV.** Sie tragen KEINEN Einzelzeiger; dieser Vermerk gilt
ihnen allen. **DER GRUND:** Sie beschreiben, WIE DER CODE DIESER PHASE GEBAUT IST — die
Klassen der Erkennung, die Parkformen, die Reihenfolge eigen-vor-fremd, die Bauform des
Entfernens, die Freigaben je Plan, die Bündelung nach Host. Projektweit ist davon nichts.
**GESTRICHEN SIND SIE DAMIT NICHT, UND DER SATZ GEHÖRT HIERHER** (docs/arbeitsweise.md,
Phasenende, Schritt 1): **sie gelten, solange der Code steht.** Wer an der Erkennung, am
Entfernen oder an der Fundliste arbeitet, liest sie hier — nicht in
docs/immer-beachten.md, wo sie nie standen.
**ZWEI SIND GEHOBEN und tragen je einen eigenen Zeiger an ihrem Abschnitt: P11.11-9** (der
Sandbox-Wächter je Rahmen) **und P11.11-24** (eine Meldung über einen Text wird aus dem
aktuellen Text abgeleitet). **BEIDE SIND ERGÄNZUNGEN AN EINER BESTEHENDEN DAUERREGEL UND
KEINE NEUE REGEL** — die Datei steht über ihrer Warnschwelle (docs/offene-punkte.md,
CLAUDE.md NÄHERT SICH DEM LADELIMIT), und eine Ergänzung an der Regel, die den Gegenstand
schon trägt, ist dort die billigere und die auffindbarere Form.

### ENTSCHEIDUNG P11.11-2 — DIE ZUORDNUNG DES BACKLOG-EINTRAGS: DIE ERKENNUNG GEHÖRT ZU 11.11, DIE SICHERHEITS-ACHSE BLEIBT IM BACKLOG

**DER EINTRAG:** "IMPORTIERTES HTML KANN BELIEBIGE SKRIPTE MITBRINGEN, AM CONSENT VORBEI",
docs/claude-history/backlog-polish.md, Abschnitt "Polish-Liste (gesammelt für einen
späteren, separaten Aufräum-Durchgang)". Er ist am 2026-08-04 gemessen und als OFFEN
geführt. **Roadmap-Zeile und Eintrag verweisen einander NICHT** — GEMESSEN am Dateitext
(CC, 2026-09-21): die Zeile nennt weder den Dateinamen noch den Eintragstitel, der Eintrag
weder "11.11" noch "Import-Bereinigung".

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21), ZWEI HÄLFTEN:**

**(1) DIE ERKENNUNGS- UND ANZEIGE-HÄLFTE GEHÖRT ZU 11.11.** Der Eintrag verlangt als
"ERSTER SCHRITT" eine Entscheidung zwischen zwei Vorhaben — "ob dem Betreiber angezeigt
wird, WAS sein HTML mitbringt (Erkennung, kein Eingriff), oder ob überhaupt gefiltert
wird" —, und schliesst mit "KEINE MASSNAHME VORSCHLAGEN, bevor das entschieden ist".
**DIESE ENTSCHEIDUNG IST GEFALLEN:** an der Roadmap-Zeile 11.11 unter (c), zugunsten der
Anzeige (OWNER-ENTSCHEIDUNG 2026-09-14, GELESEN CC, 2026-09-21). Der Eintrag wartet damit
nicht mehr auf das, worauf er zu warten sagt.

**(2) DIE SICHERHEITS-ACHSE BLEIBT IM BACKLOG UND WIRD VON 11.11 NICHT EINGELÖST.** Gemeint
sind die zwei Sätze des Eintrags, die über die Anzeige hinausgehen: "ein Sanitizer
existiert an keiner Stelle des Pfades" und die als VERMUTUNG gekennzeichnete Frage, ob ein
Skript auf der Kunden-Domain an App-Sitzungen herankäme ("BEIDES ZU PRÜFEN").
**DER GRUND, und ohne ihn wird die Trennung beim nächsten Zuschnitt wieder eingezogen:**
11.11 ist eine ANZEIGE-Phase. Ihre Entscheidung (c) lautet, nichts ohne Klick des
Betreibers zu entfernen; eine Sicherheits-Phase daraus zu machen hiesse, gegen ebendiese
Entscheidung zu bauen. **Eine Phase, die beides trüge, trüge keine Entscheidung.**

**DIE GRENZE DIESER ZUORDNUNG GEHÖRT DAZU:** Der Eintrag spricht von "beliebigen
Skripten", die Roadmap-Zeile unter (a) von "bekannten Tracking-Pixeln und
Einwilligungs-Werkzeugen". **Die Erkennungs-Hälfte des Eintrags ist damit BREITER als der
heutige Gegenstand von 11.11.** Wieweit sie eingelöst wird, ist die Designfrage D3 und
hier NICHT entschieden.

**WAS DARAUS FOLGT — UND WAS NICHT:** Der Eintrag wird NICHT gestrichen und NICHT
umgeschrieben; er bekommt am 2026-09-21 einen datierten Zusatz, der auf diese Entscheidung
zeigt. **Ob die Sicherheits-Achse je eine eigene Phase bekommt, ist hier nicht entschieden
und ausdrücklich keine Empfehlung.**

**PROVENIENZ:** Die Zuordnung ist ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Der Wortlaut des
Eintrags und der Roadmap-Zeile GELESEN (CC, 2026-09-21); die Abwesenheit gegenseitiger
Verweise GEMESSEN am Dateitext (CC, 2026-09-21), Achsen `11\.11` und
`import-bereinigung` über alle verfolgten Dateien, mit Positivkontrolle auf `11\.10` und
`11\.12`.

### ENTSCHEIDUNG P11.11-3 — DIE REICHWEITE: JEDES SCRIPT WIRD ANGEZEIGT, ENTFERNEN GIBT ES NUR BEI BEKANNTEN PIXELN

**DIE ENTSCHEIDUNG (OWNER, 2026-09-21) — sie beantwortet D3 und legt drei Klassen fest:**
- **ANGEZEIGT WIRD JEDES `<script>` IM IMPORTIERTEN TEXT.** Nicht nur die bekannten.
- **BEKANNTE WERDEN MARKIERT** — als Pixel oder als CMP.
- **ENTFERNEN WIRD NUR BEI EINEM BEKANNTEN PIXEL ANGEBOTEN.** Ein CMP bekommt einen
  ANBINDUNGS-HINWEIS und **kein** Entfernen. Ein unbekanntes Script wird **angezeigt, ohne
  jede Handlung**.

**DER GRUND, und er ist der eigentliche Inhalt dieser Entscheidung:** Eine Erkennungsliste
altert (so die Roadmap-Zeile 11.11 unter (e)). **WER NUR BEKANNTES ANZEIGT, LÄSST SIE STILL
ALTERN** — ein Tracker, den die Liste nicht kennt, erscheint dann nirgends, und niemand
erfährt je, dass die Liste veraltet ist. Wer JEDES Script anzeigt, macht das Veralten
SICHTBAR: der unbekannte Tracker steht in der Liste, nur ohne Marke. **UND DIE
GEGENRICHTUNG trägt die dritte Klasse:** Ein unbekanntes Script kann Teil der Seite selbst
sein — ein Slider, ein Formular, eine Animation. Ihm eine Entfernen-Handlung anzubieten
hiesse, einen Klick auf etwas anzubieten, das niemand gemeint hat.

**DIE SIGNAL-GRENZE (ARCHITEKT, 2026-09-21), und ohne sie kippt die erste Hälfte in ihr
Gegenteil:** **NUR FUNDE MIT EINER HANDLUNG DÜRFEN LEUCHTEN** — ein bekanntes Pixel und die
Kollision aus P11.11-4. **EIN UNBEKANNTES SCRIPT LEUCHTET NIE.** Grund: die Dauerregel EIN
SIGNAL LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN (docs/immer-beachten.md). Jede
importierte Seite trägt Scripte; ein Signal, das bei jeder Seite leuchtet, ist
Signal-Ermüdung und damit wertlos für den Fall, der zählt. **ANZEIGEN UND LEUCHTEN SIND
ZWEI VERSCHIEDENE DINGE** — wer sie zusammenzieht, baut entweder eine blinde Liste oder
eine Dauerwarnung.

**WEN SIE BINDET:** den Zuschnitt der Scheibe 11.11b (was in der Liste steht) und der
Scheibe 11.11c (was eine Handlung bekommt), und jede spätere Runde, die der Erkennung eine
Klasse hinzufügt.

**PROVENIENZ:** Die drei Klassen sind OWNER-ENTSCHEIDUNG 2026-09-21. Die Signal-Grenze ist
ARCHITEKT-ENTSCHEIDUNG desselben Tages; die Dauerregel, auf die sie sich stützt, GELESEN
(CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-4 — DIE KOLLISION EIGENER DIALOG GEGEN FREMDES CMP WIRD ANGEZEIGT, NICHT GELÖST

**DIE ENTSCHEIDUNG (OWNER, 2026-09-21):** Die Scheibe 11.11b zeigt an, wenn **beides
zugleich** zutrifft — der eigene Einwilligungs-Dialog ist eingeschaltet **UND** im
importierten HTML steht ein fremdes CMP.

**ES IST EIN SIGNAL, KEINE LÖSUNG, und dieser Satz ist die ganze Grenze der Entscheidung:**
Der offene Punkt UNSER EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN — ZWEI WEGE,
DIE GETRENNT BLEIBEN (docs/offene-punkte.md) **BLEIBT OFFEN**. Er wird hier **benannt, nicht
geändert**, und diese Phase löst ihn NICHT ein. Wer die Anzeige für die Behebung hält,
streicht einen Posten, der weiter besteht — die zwei Wege jenes Postens (der asynchron
gesetzte Fremd-Hook und `write()`, das einem gesetzten Fremd-Hook nicht ausweicht) sind von
einer Anzeige im Editor unberührt.

**WARUM SIE TROTZDEM ETWAS WERT IST:** Der Betreiber ist heute der Einzige, der beides
sehen kann — den Schalter in seinen Einstellungen und das CMP in seinem HTML —, und niemand
zeigt ihm, dass die zwei zusammen ein Problem ergeben. Die Anzeige verlegt das Wissen
dorthin, wo die Handlung liegt.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-21. Dass der offene Punkt aus Vorrat (2) und
(12) der Phase 11.5 stammt und einen anderen Gegenstand hat als die Kollisionsanzeige,
GELESEN an docs/offene-punkte.md (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-5 — ORT UND LEBENSDAUER: IM BROWSER, REIN LESEND, ABGELEITET STATT GESPEICHERT

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21) — sie beantwortet D2 und D5 gemeinsam, weil die
zwei Fragen dieselbe Antwort haben:**
- **DER ORT:** Die Erkennung läuft **im Browser**, **rein lesend**, im **bereits zerlegten
  Dokument des Import-Pfads** — also an dem `DOMParser`-Dokument, das `annotateAndDetect`
  (`src/lib/detect.ts`) ohnehin erzeugt. Kein zweiter Parse, kein Server-Weg.
- **DIE LEBENSDAUER:** Ein Fund wird **ABGELEITET, NIE GESPEICHERT.** **KEINE Migration,
  KEINE Server-Action, KEIN Mitglied im Einstellungs-Blob.**

**DREI GRÜNDE, in dieser Reihenfolge:**
- **KEIN SERVER-SEITIGES HTML-PARSING** — Dauerregel (docs/immer-beachten.md); die
  server-seitige Injektion ist eine reine String-Op und soll es bleiben.
- **DAS DOKUMENT IST INERT.** Ein `DOMParser`-Dokument führt nichts aus; eine Erkennung
  darin kann fremden Code lesen, ohne ihn laufen zu lassen. **DIE KEHRSEITE GEHÖRT DAZU und
  bindet die Scheibe 11.11c:** In einem inerten Dokument ist `<noscript>` ein gewöhnliches
  Element mit Kindern (Dauerregel EIN `DOMParser`-DOKUMENT PARST MIT AUSGESCHALTETEM
  SKRIPTING …).
- **DIE ERKENNUNG SIEHT DEN AKTUELLEN CODE, NICHT DEN IMPORT-MOMENT.** Ein gespeicherter
  Fund veraltete, sobald der Betreiber den Text ändert — und zwar still. Ein abgeleiteter
  Fund kann das nicht: Er entsteht bei jedem Lauf neu aus dem, was gerade dasteht.

**WAS DAMIT AUSGESCHLOSSEN IST, und es ist mehr als eine Ablage-Frage:** Ohne Persistenz
gibt es keinen Fund-Zustand, der beim Projektwechsel leaken könnte (Dauerregel ABLEITEN
STATT LÖSCHEN), kein neues Mitglied, das für `dirty` unsichtbar wäre (offener Punkt
`settingsEqual` IST EINE ALLOWLIST), und keinen server-vergebenen Wert in einem
client-besessenen Blob.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Dass `annotateAndDetect` ein
`DOMParser`-Dokument erzeugt und der Import-Pfad keinen Server-Parse kennt, ist GEMESSEN am
Code (Vermerk P11.11-1, Stationen (b) und (e)).

### ENTSCHEIDUNG P11.11-6 — D4 IST OHNE MESSUNG GESCHLOSSEN, UND `settings.customPixel` WIRD NIE ALS CMP-ORT ANGEBOTEN

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Die Frage D4 — ob `settings.customPixel` ein
fremdes CMP tragen kann — wird **GESCHLOSSEN, OHNE sie zu messen.**

**DER GRUND IST EIN VERFAHRENS-GRUND UND KEIN SACHURTEIL:** Die Frage trug **nur** die
Begründung der Entscheidung (c) der Roadmap-Zeile 11.11 — und **die trägt seit `b57d9a6`
ohne sie.** Dort steht seither: Ein automatisches Entfernen beim Import nähme jedem
Betreiber, der sein CMP heute im importierten Text stehen hat, genau dieses CMP; das gilt,
**ob es daneben einen zweiten Weg gibt oder nicht**. Eine Frage, an der keine Entscheidung
mehr hängt, wird nicht gemessen, nur weil sie interessant ist.

**DIE FOLGE FÜR DAS PRODUKT, und sie ist der bindende Teil: 11.11 SCHLÄGT
`settings.customPixel` NIE ALS ORT FÜR EIN CMP VOR.** Kein Hinweistext, kein Vorschlag,
keine Handlung, die dorthin führt.

**DER GRUND DAFÜR IST EINE ABLEITUNG UND AUSDRÜCKLICH KEINE MESSUNG:** Das Feld läuft hinter
seinem eigenen Einwilligungs-Schlüssel — `buildCustomPixelRuntime` fragt `__psCustomOk`,
und das fragt `__psConsent("custom")` (GEMESSEN am Code, s. D4). **Ein CMP dort SÄSSE HINTER
DER EINWILLIGUNG, DIE ES ERST EINHOLEN SOLL.** Ob das in der Praxis bricht, ist NICHT
gemessen; für einen Vorschlag reicht die Ableitung aus, für eine Behauptung über das
Verhalten nicht.

**WAS OFFEN BLEIBT:** Ob ein Betreiber ein CMP dort HINEINSCHREIBEN kann, ist damit weder
verneint noch bejaht. Diese Phase führt ihn nur nicht dorthin.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Der Wortlaut der Roadmap-Zeile seit
`b57d9a6` GELESEN (CC, 2026-09-21); der Einwilligungs-Schlüssel und der Aufrufweg GEMESSEN
am Code (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-7 — DIE ERKENNUNGSBASIS IST EINE VERSIONIERTE SIGNATURLISTE IN EINER REINEN DATEI MIT EIGENEN TESTS

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21) — sie beantwortet D1:** Erkannt wird über eine
**versionierte Liste bekannter Signaturen** — Script-Adressen und typische Inline-Aufrufe —,
abgelegt in einer **REINEN Datei** (kein React, kein Server, keine IO) **mit eigenen
Tests**.

**WARUM EINE LISTE TROTZ DES BEKANNTEN EINWANDS:** Die Roadmap-Zeile 11.11 hält unter (e)
fest, dass eine Liste altert. **DAS BLEIBT WAHR — UND P11.11-3 NIMMT IHM DIE SPITZE:** Weil
JEDES Script angezeigt wird, macht das Veralten der Liste sich als **fehlende Marke**
bemerkbar und nicht als Abwesenheit. **Die Liste entscheidet dann über die MARKIERUNG und
über die HANDLUNG, nicht mehr über die SICHTBARKEIT** — und genau das war der Einwand.

**WARUM EINE REINE DATEI MIT EIGENEN TESTS:** Eine Signatur ist ein WORTLAUT, und ein
Wortlaut-Wächter bekommt seine Erwartung aus der Entscheidung, nie aus dem Code (Dauerregel
EIN WÄCHTER ÜBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE). In einer reinen
Datei ist das prüfbar; in eine Komponente eingestreut wäre es das nicht.

**WAS HIER NICHT ENTSCHIEDEN IST:** welche Signaturen die Liste beim ersten Bau trägt, und
in welcher Form eine Signatur geschrieben wird. Das entscheidet der Zuschnitt der Scheibe
11.11b.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21; der Einwand gegen Listen GELESEN an der
Roadmap-Zeile 11.11, (e) (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-9 — DIE SANDBOX-WERTELISTE IST JE RAHMEN ABSCHLIESSEND, UND JEDER NEUE RAHMEN BEKOMMT DENSELBEN WÄCHTER

**→ GEHOBEN 2026-09-22 — ihr DRITTER Satz ("JEDER NEUE RAHMEN, DER IMPORTIERTEN ODER
ERZEUGTEN KUNDENCODE RENDERT, BEKOMMT DENSELBEN WÄCHTER") steht seither als datierte
ERGÄNZUNG an der Dauerregel "Importierter User-Code läuft NUR im sandboxed iframe …"
(docs/immer-beachten.md), mit der Bedingung ihres Entfallens und einem Zeiger auf das Archiv
dieser Phase. KEINE NEUE REGEL — eine Ergänzung an der Regel, aus der die zwei
Sicherheits-Werte ohnehin stammen.
DER REST DIESER ENTSCHEIDUNG BLEIBT HIER und ist NICHT gehoben: die zwei konkreten
Wertelisten je Rahmen, die Herkunft jedes Werts und der Befund, dass die zwei Popup-Werte
EINGEFRORENER BESTAND mit ungemessener Notwendigkeit sind. Das ist Bestand dieses Codes und
keine projektweite Regel.**

**HERKUNFT:** Sie stand als E1 im Zuschnitt der Scheibe 11.11a und ist beim
Abschluss-Vermerk aus ihm HERAUSGELÖST worden, weil sie über ihre Scheibe hinaus bindet
(docs/arbeitsweise.md, "Beim Abschluss-Vermerk wird der Zuschnitt verdichtet"). Am
Zuschnitt steht an ihrer Fundstelle ein Zeiger.

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Die `sandbox`-Werteliste ist je Rahmen
ABSCHLIESSEND, nicht eine Mindestmenge.
- **Bearbeiten-Rahmen (`title="preview"`): genau `{allow-scripts}`.**
- **Vorschau-Rahmen (`title="functional-preview"`): genau `{allow-scripts, allow-popups,
  allow-popups-to-escape-sandbox}`.**

**DIE HERKUNFT JEDES WERTS, und sie geht aus dem Code nicht hervor:**
- `allow-scripts` und das VERBOT von `allow-same-origin` kommen aus der Dauerregel
  "Importierter User-Code läuft NUR im sandboxed iframe …" (docs/immer-beachten.md). **Das
  ist die SICHERHEITS-Achse und nicht verhandelbar.**
- `allow-popups` und `allow-popups-to-escape-sandbox` am Vorschau-Rahmen sind
  **EINGEFRORENER BESTAND. IHRE NOTWENDIGKEIT IST UNGEMESSEN** — der Kommentar am Rahmen
  nennt als Grund einen echten Top-Level-Tab bei `window.open`, gemessen ist das nicht.

**WAS DARAUS FÜR JEDE SPÄTERE RUNDE FOLGT — die drei Sätze sind der bindende Teil:**
- **WER EINEN DER ZWEI POPUP-WERTE ENTFERNT, BRAUCHT EINE MESSUNG.** Eine Vermutung genügt
  nicht, weil der heutige Grund selbst keine ist.
- **WER EINEN WERT HINZUFÜGT, BRAUCHT EINE ENTSCHEIDUNG. JEDE ERWEITERUNG EINER SANDBOX IST
  EINE LOCKERUNG**, und sie soll sichtbar getroffen werden statt eingeschoben.
- **JEDER NEUE RAHMEN, DER IMPORTIERTEN ODER ERZEUGTEN KUNDENCODE RENDERT, BEKOMMT
  DENSELBEN WÄCHTER** — dieselben vier Zusicherungen und eine eigene abschliessende Liste.
  Die Regel gilt jedem solchen Rahmen, nicht nur den zwei bekannten.

**DER PREIS IST BENANNT:** Der Abschluss-Lauf wird bei JEDER Erweiterung rot. **Das ist die
Absicht, nicht sein Mangel** — ohne ihn fängt kein Lauf einen hinzugefügten Wert, und genau
das ist am 2026-09-21 mit der Mutation M5 GEMESSEN worden (nur S4 bzw. nur V4 fielen;
ohne die abschliessende Liste wäre die Zahl NULL gewesen).

**DIE ERWARTUNG WIRD AUS DIESER ENTSCHEIDUNG GESCHRIEBEN, NIE AUS DEM PRODUKTIVCODE
ABGELESEN** (docs/immer-beachten.md, EIN WÄCHTER ÜBER DIE SPALTENLISTE BEKOMMT SEINE
ERWARTUNG NIE AUS DEM CODE). Ein Import machte den Wächter zum SPIEGEL, der jede Änderung
bestätigt, statt sie zu fangen.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Der M5-Befund GEMESSEN am eigenen Lauf
(CC, 2026-09-21, Vermerk P11.11-8); dass die zwei Popup-Werte ungemessen sind, ist am Repo
erhoben (kein Messwert dazu, nur der Kommentar am Rahmen).

### ENTSCHEIDUNG P11.11-10 — EIGENE BAUSTEINE IM IMPORTIERTEN TEXT SIND EINE EIGENE KLASSE, UND SIE BLOCKIEREN DAS VERÖFFENTLICHEN

**DIE ENTSCHEIDUNG (OWNER, 2026-09-21):** Findet die Erkennung einen Baustein, den
Pagesmith selbst erzeugt hat, gilt die Klasse **"eigen"**. Sie wird **NIE als fremdes Pixel
angezeigt und NIE als fremdes zum Entfernen angeboten.** Je Scheibe:
- **11.11b zeigt sie und WARNT.**
- **11.11c entfernt sie auf Klick.**
- **VERÖFFENTLICHEN WIRD VERWEIGERT, solange eigene Bausteine aus einem früheren Export im
  Text stehen.**

**DER GRUND — und er ist ein Schadens-Grund, kein Ordnungs-Grund: DOPPELTE CONVERSIONS SIND
STILLER DATENVERLUST.** Niemand sieht einen Fehler; die Zahlen sind falsch, und sie sehen
richtig aus. Deshalb ist das Veröffentlichen die Stelle, an der es abbricht, und nicht eine
Warnung, die man wegklickt.

**AUFLAGE (ARCHITEKT, 2026-09-21) — DER PUBLISH-RIEGEL WIRD ERST GEBAUT, WENN EINE
LIVE-MESSUNG DAS VERDOPPELN BESTÄTIGT.** Der Befund darunter (Vorrat P11.11-5) ist eine
ABLEITUNG aus dem Code und an keiner Seite gemessen. **Ein Riegel, der das Veröffentlichen
verweigert, ist die härteste Handlung dieser Phase; er darf nicht auf einer Ableitung
ruhen.** Anzeigen und Warnen (11.11b) sind davon NICHT betroffen — sie kosten nichts, wenn
die Ableitung falsch ist.

**WAS DIE KLASSE "EIGEN" ERKENNBAR MACHT, steht nicht hier, sondern im Bestand:** die
`id`-Konstanten der Blöcke (Vermerk P11.11-1 und der Aufklärungsbericht vom 2026-09-21
nennen sie je mit Datei und Symbol). **EINE LÜCKE GEHÖRT AN DIESE ENTSCHEIDUNG, weil sie sie
begrenzt: DAS WIRING-SCRIPT TRÄGT KEINE KENNUNG** (GEMESSEN, CC, 2026-09-21) — die Klasse
"eigen" erreicht es heute nicht. Wie es erkennbar wird, ist eine Plan-Frage (Vorrat
P11.11-5).

**DIE AUFLAGE IST AM 2026-09-21 ERFÜLLT** — durch die Live-Messung in VERMERK P11.11-16.
**Der Wortlaut der Auflage oben bleibt unangetastet**, weil er die Bedingung trägt, unter
der sie erfüllt wurde; dieser Satz tritt DANEBEN. Was die Messung zeigt: Eine unter einem
neuen Projekt ausgelieferte re-importierte Seite schreibt ihre Conversions in das
URSPRUNGS-Projekt, und mit eigener Verdrahtung zählt ein Klick in beiden — mit
verschiedenen Ereignis-Kennungen. **Der Riegel darf damit gebaut werden;** gebaut wird er
in der Scheibe 11.11d.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-21; die Auflage ARCHITEKT-ENTSCHEIDUNG desselben
Tages. Die fehlende Kennung des Wiring-Scripts GEMESSEN am Code (CC, 2026-09-21). Die
Einlösung der Auflage: OWNER-MESSUNG (LIVE, 2026-09-21), s. VERMERK P11.11-16.

### ENTSCHEIDUNG P11.11-11 — DER ERSTE WURF DER SIGNATURLISTE: FÜNF ZIELE UND SECHS CMPs, JEDE SIGNATUR PER CRAWL BELEGT

**DIE ENTSCHEIDUNG (OWNER, 2026-09-21) — der erste Wurf der Liste aus P11.11-7 trägt elf
Anbieter:**
- **DIE FÜNF FAN-OUT-ZIELE**, mit den Zielwerten, wie `TRACKING_TARGETS`
  (`src/lib/settings.ts`) sie führt: `meta`, `pinterest`, `tiktok`, `linkedin`, `google`.
- **SECHS CMPs:** Cookiebot, Usercentrics, OneTrust, CookieYes, consentmanager, Klaro.

**JEDE SIGNATUR WIRD PER CRAWL GEGEN DIE ANBIETER-DOKUMENTATION BELEGT — KEINE AUS DEM
GEDÄCHTNIS.** Das ist keine Formalie: Eine Signatur ist eine Aussage über ein FREMDES
System, und die dauerhaften Regeln dieses Projekts lassen dafür nur zwei Quellen zu —
gelesen (mit Fundstelle und Datum) oder gemessen. Eine erfundene Adresse erzeugt einen
Fehltreffer, und ein Fehltreffer bietet in 11.11c fremden Code zum Entfernen an.

**WARUM DER CRAWL NICHT OPTIONAL IST — DER BESTAND TRÄGT FAST NICHTS** (GEMESSEN am Repo,
CC, 2026-09-21; Einzelheiten im Aufklärungsbericht desselben Tages und nicht hier
verdoppelt): Im Produktivcode steht **genau EINE** Anbieter-Adresse
(`connect.facebook.net/en_US/fbevents.js`, `src/lib/tracking/meta.ts`) und **genau EIN**
globaler Anbieter-Name (`fbq`). Über CMPs weiss das Repo **nichts als zwei Prosa-Nennungen
in Abschluss-Archiven** — keine Adresse, keine Signatur. **Zehn der elf Anbieter sind im
Bestand also gar nicht vertreten.**

**WAS HIER NICHT ENTSCHIEDEN IST:** in welcher FORM eine Signatur geschrieben wird (Adresse,
globaler Name, Inline-Muster) und wie viele je Anbieter. Das entscheidet die Crawl-Runde
zusammen mit dem Plan 11.11b.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-21. Die Zielwerte GELESEN an `TRACKING_TARGETS`
(CC, 2026-09-21); der dünne Bestand an Anbieter-Wissen GEMESSEN am Repo (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-12 — DIE BAUFORM DER SCHEIBE 11.11b, ZEHN SÄTZE

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21).** Jeder Satz bindet den Plan 11.11b; wo er auf
einer Messung ruht, steht sie dabei.

1. **EINE REINE FUNKTION AUF DEM DOKUMENT, unmittelbar nach dem Parse und VOR
   `stabilizeDoc`.** Das ist die einzige Stelle, an der das Dokument unberührt vorliegt
   (GEMESSEN am Code, CC, 2026-09-21).
2. **EIGENER FEHLERFANG.** Ein Wurf der Erkennung **leert die Vorschau NICHT**, und
   **"fehlgeschlagen" ist von "nichts gefunden" unterscheidbar.** Der bestehende `catch` in
   `annotateAndDetect` gibt `{ html: "", elements: [] }` zurück — ein Wurf der Erkennung
   darf da nicht hineinlaufen.
3. **VIER KLASSEN:** `eigen` · bekanntes Pixel · bekanntes CMP · unbekannt. Die vierte ist
   die aus P11.11-3; die erste kommt mit P11.11-10 dazu.
4. **REINE DATENBLÖCKE WERDEN NICHT GELISTET** — `application/ld+json` und
   `application/json`. Sie führen keinen Code aus; sie in einer Liste zu führen, die von
   Tracking handelt, wäre Rauschen.
5. **`type="text/plain"` ERSCHEINT MIT DEM ZUSATZ "wartet auf fremdes CMP", UND DIE ADRESSE
   KANN IN `data-src` STEHEN.** GEMESSEN (CC, 2026-09-21): Bei einem so geparkten Script
   liefert `getAttribute("src")` `null`; ein Erkenner allein über `src` sähe es als adresslos.
6. **RÜCKFALL-ELEMENTE ZÄHLEN ZUM ANBIETER, ERKANNT ÜBER IHRE ADRESSE, NICHT ÜBER IHREN
   PLATZ.** GEMESSEN (CC, 2026-09-21): Steht ein `<noscript>` im `head`, **leert der Parser
   es** — das `<img>` bzw. `<iframe>` landet im `body`, das `noscript` bleibt leer zurück.
   Wer über den Platz erkennt, verliert den Head-Fall.
7. **INLINE-HANDLER NUR MIT BEKANNTEM ANBIETER-AUFRUF.** `onclick` und Verwandte sind als
   Attribut lesbar (GEMESSEN); gelistet wird nur, was einen Namen aus der Signaturliste
   trägt — sonst stünde jede Schaltfläche der Seite in der Liste.
8. **DIE KOLLISION LIEST DEN ENTWURFS-STAND DES SCHALTERS UND STEHT AM SCHALTER.**
   `getConsentDialog(settings)` in `CodeImporter.tsx` reicht den Wert als Prop an
   `PublishView`; `settings` ist der Entwurf, nicht `savedSettings` (GEMESSEN, CC,
   2026-09-21). Die Anzeige gehört dorthin, wo der Betreiber den Schalter bedient.
9. **DIE LISTE STEHT IM BEREICH BAUEN** — dort, wo die Element-Erkennung heute schon
   angezeigt wird.
10. **KEIN NEUES SIGNAL IN DER REITERZEILE; HERVORHEBUNG NUR INNERHALB DER LISTE.** Heute
    trägt die Reiterzeile **genau ein** Signal (`measureSignal`, GEMESSEN); ein zweites
    wäre Signal-Ermüdung und träfe ausserdem eine dokumentweite Bestandsabfrage. Die
    Signal-Grenze aus P11.11-3 bleibt unberührt.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21, auf der Aufklärung desselben Tages. Die
vier als GEMESSEN gekennzeichneten Angaben stammen aus jener Runde (Code-Messungen und die
jsdom-Probe); sie sind hier als Begründung zitiert und nicht neu erhoben.

### ENTSCHEIDUNG P11.11-14 — DER PFLICHT-STOPP FÜR docs/ziel-befunde.md IST BEI BROWSER-TAG-RECHERCHE GEZIELT STATT VOLL ZU ERFÜLLEN

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** **In DIESER Phase** gilt der Pflicht-Stopp für
`docs/ziel-befunde.md` als erfüllt, wenn die Datei **mit einer BENANNTEN ACHSE und einer
POSITIVKONTROLLE durchsucht** und jeder Treffer im Wortlaut gelesen wurde — **nicht erst bei
Vollladung.**

**DER GRUND IST EIN MESSWERT, KEIN UNBEHAGEN:** Die Datei ist **549 237 Bytes / 7 749
Zeilen** (GEMESSEN, CC, 2026-09-21). Der freie Kontext einer CC-Sitzung lag zu Rundenbeginn
bei **196k Token** (abgelesen an `/context`, OWNER-seitig sichtbar). **DIE UMRECHNUNG VON
BYTES IN TOKEN IST EINE SCHÄTZUNG UND KEIN MESSWERT** — sie liegt für deutschen Fliesstext
grob bei 150k. Ein Vollladen hätte den Crawl, für den die Lesung geschieht, unmöglich
gemacht.

**DASS DIE GEZIELTE FORM HIER TRÄGT, IST NICHT VORAUSGESETZT, SONDERN DAS ERGEBNIS:** Die
Suche ergab fünf Treffer in zwei Zusammenhängen, und die Datei trägt über die Browser-Tags
nahezu nichts (VERMERK P11.11-13). **Wäre das Ergebnis dicht gewesen, hätte die Entscheidung
anders ausfallen müssen.**

**DIE GRENZE, UND OHNE SIE IST DIESE ENTSCHEIDUNG EINE LOCKERUNG DURCH DIE HINTERTÜR:**
- **SIE ÄNDERT DEN PFLICHT-STOPP IN CLAUDE.md NICHT.** Eine Standdatei kann eine
  Projektregel weder lockern noch überschreiben — das steht im Kopf dieser Datei.
- **SIE GILT NUR FÜR DIE BROWSER-TAG-RECHERCHE.** Wer an einer SERVER-Schnittstelle
  arbeitet — Adapter, Nutzlast, Statuscodes, Live-Test-Anleitung —, lädt die Datei wie
  bisher: **dort ist sie dicht, und genau dafür ist sie geschrieben.**

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Dateigrösse und Trefferzahl GEMESSEN
(CC, 2026-09-21); der freie Kontext ist eine ABLESUNG, die Token-Umrechnung eine SCHÄTZUNG.

### ENTSCHEIDUNG P11.11-15 — OHNE BELEG KEINE SIGNATUR

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** **Ein Anbieter, dessen Einbau-Dokumentation
nicht belegbar ist, bekommt im ersten Wurf KEINE Signatur.** Sein Tag bleibt unerkannt und
erscheint als **unbekanntes Script** — mit allem, was daran hängt: angezeigt, nicht
markiert, ohne Handlung, ohne Leuchten.

**DER GRUND — und er ist der Grund, aus dem Entscheidung P11.11-3 so geschnitten ist:**
**EINE LÜCKE SCHWEIGT DORT NICHT STILL.** Weil JEDES Script angezeigt wird, steht das Tag
eines unbelegten Anbieters trotzdem in der Liste, nur ohne Marke — das Fehlen ist sichtbar.
**EIN GERATENES ETIKETT WÄRE DIE TEURERE SEITE:** Bei einem Pixel führt die Marke zum
Angebot, es zu ENTFERNEN, und ein Fehltreffer bietet dann fremden Code zum Löschen an, den
niemand gemeint hat.

**DIE OWNER-LISTE AUS ENTSCHEIDUNG P11.11-11 BLEIBT DAS ZIEL** — elf Anbieter. Diese
Entscheidung senkt sie nicht, sie regelt den Zwischenzustand: **Was nicht belegt ist, wird
BENANNT statt geraten.**

**DIE ABLAGE, damit die Belege nicht an drei Orten landen:**
- **BROWSER-TAG-BEFUNDE DER FÜNF ZIELE → docs/ziel-befunde.md, je Ziel ein EIGENER TEIL**
  in dessen bestehendem Abschnitt (Weg 5 aus CLAUDE.md, "Wohin ein neuer Satz gehört").
- **CMP-BEFUNDE → VERMERKE DIESER DATEI**, später je Eintrag als Beleg an der Signaturdatei
  aus Entscheidung P11.11-7.
- **KEINE NEUE DOKU-DATEI** — das wäre Weg 8 und verlangte eine Owner-Entscheidung.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21; die Begründung stützt sich auf
Entscheidung P11.11-3 und die Roadmap-Zeile 11.11, (e), beide GELESEN (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-18 — EIN URTEIL, OHNE PARSER: EIN REINES PRÄDIKAT ÜBER DEN TEXT

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Die Frage "enthält dieser Text
Pagesmith-Bausteine?" wird von **EINEM** Prädikat beantwortet — einer **reinen
String-Prüfung in einer reinen Datei**, ohne Parser.

**VIER VERBRAUCHER, EIN URTEIL:** die Anzeige · die `disabled`-Bedingung des
Veröffentlichen-Knopfes · der Server-Riegel in `publishProject` · der Export-/Kopier-Riegel.

**DER GRUND, zweiteilig:**
- **DER SERVER ZERLEGT KEIN HTML** — Dauerregel KEIN SERVER-SEITIGES HTML-PARSING
  (docs/immer-beachten.md). Ein Prädikat, das der Server braucht, kann also kein
  DOM-Prädikat sein.
- **ZWEI VERFAHREN FÜR EINE FRAGE LAUFEN AUSEINANDER.** Ein DOM-Urteil im Client neben einem
  String-Urteil auf dem Server wäre genau die Konstellation "kein drittes Urteil", die der
  Leer-Riegel bereits vermeidet.

**PRÄZEDENZ: `emptyPublishVariant`** (`src/lib/hosting/variant.ts`) — reines Prädikat, reine
Datei, von Server UND Client benutzt, Meldungen am selben Ort, weil `actions.ts`
`"use server"` trägt (Vermerk P11.11-17, Punkt (i)). Diese Entscheidung baut dieselbe Form
ein zweites Mal und erfindet nichts Neues.

**DIE MERKMALE:** die `id`-Werte unserer Blöcke · die zwei Host-Tags · und für das
Wiring-Script, das **KEINE `id` trägt**, der Aufruf `getElementById("pagesmith-mappings")`.

**DIE MERKMALE SIND VOLLSTÄNDIG, UND DAS IST GEMESSEN, NICHT ANGENOMMEN:** Der ausgelieferte
Text trägt GENAU ACHT `<script>`-Knoten, sieben mit `id`, einer ohne — Vermerk P11.11-17,
Punkt (f). Es gibt keinen neunten Knoten, den ein Merkmal verfehlen könnte.

**DIE ZWEI HOST-TAGS BLEIBEN IN DER MERKMALS-LISTE, OBWOHL SIE IM AUSGELIEFERTEN TEXT KEIN
ELEMENT SIND** (Vermerk P11.11-17, Punkt (g)): Sie sind billig, sie sind eindeutig, und der
Fall, in dem ein Betreiber einen LAUFZEIT-Baum importiert, ist ausdrücklich ungemessen
statt ausgeschlossen. **Wer sie streicht, streicht eine Absicherung gegen einen Zustand, den
niemand vermessen hat.**

**DIE QUELLE IST EINE: DAS PRÄDIKAT BEZIEHT DIE MERKMALE AUS DEN PRODUKTIV-KONSTANTEN.** Ein
zweites Literal neben der Konstante wäre die zweite Wahrheit, die bei der nächsten
Umbenennung still auseinanderläuft.

**DIE ERWARTUNG IM TEST WIRD DAGEGEN AUS DIESER ENTSCHEIDUNG GETIPPT, NIE AUS DEM CODE
ABGELESEN** — Dauerregel EIN WÄCHTER ÜBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS
DEM CODE. Ein Import machte den Wächter zum SPIEGEL, der jeden Tippfehler bestätigt.

**DIE FOLGE FÜR DEN ZUSCHNITT:** Das Grundgerüst der Erkennung **am zerlegten Dokument**
(ENTSCHEIDUNG P11.11-12, Satz 1: eine reine Funktion auf dem Dokument vor `stabilizeDoc`)
entsteht **NICHT in 11.11d, sondern mit 11.11b.** 11.11d braucht es nicht: ihr Gegenstand
sind die EIGENEN Bausteine, und die sind am Text erkennbar. Der Eintrag 11.11d in Abschnitt
9 ist entsprechend richtiggestellt.

**WAS HIER NICHT ENTSCHIEDEN IST:** ob das Prädikat zusätzlich eine LISTE der Fundstellen
liefert oder nur einen Wahrheitswert. Die Nachbedingung aus ENTSCHEIDUNG P11.11-19 verlangt
eine Fundstelle in der Meldung; welche Gestalt das Prädikat dafür bekommt, entscheidet der
Plan.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die Vollständigkeit der Merkmale und die
fehlende `id` des Wiring-Scripts GEMESSEN (CC, 2026-09-21, Vermerk P11.11-17); die Präzedenz
GELESEN am Code (CC, 2026-09-21); die zwei Dauerregeln GELESEN (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-19 — DAS ENTFERNEN: PER DOM, MIT DEM LEERRAUM, UND MIT EINER NACHBEDINGUNG

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21), vier Sätze:**

1. **ES LÄUFT PER DOM-DURCHLAUF.** Mit jedem Block wird ein unmittelbar vorangehender
   **reiner Leerraum-Textknoten** mitgenommen. **KOMMENTARE BLEIBEN.**
2. **ES ÄNDERT NUR DEN EDITOR-TEXT.** Gespeichert wird erst beim Speichern — der Klick
   entfernt, er schreibt nicht in die Datenbank.
3. **AM ROHEN TEXT NORMALISIERT ES**, wie Speichern und Zuweisen es ohnehin tun.
4. **NACHBEDINGUNG:** Danach meldet das Prädikat aus ENTSCHEIDUNG P11.11-18 **nichts mehr.**
   Kann es das nicht, **nennt die Meldung die verbleibende Fundstelle.**

**ZU (1) — DER LEERRAUM IST GEMESSEN UND KOSTET FAST NICHTS:** Von acht Knoten trägt GENAU
EINER einen vorangehenden reinen Leerraum-Textknoten, 5 Bytes (Vermerk P11.11-17, Punkt
(d)). **DIE REGEL BLEIBT TROTZDEM, und der Grund ist nicht die Byte-Zahl:** Sie hängt an der
STELLUNG des Blocks, nicht an seiner Zahl. Ein künftiger Erzeuger, der seinen Block anders
einhängt, produziert mehr davon; eine Regel, die erst dann eingeführt wird, kommt zu spät.

**ZU (1) — WARUM KOMMENTARE BLEIBEN:** Ein Kommentar ist Text des Betreibers, solange nichts
das Gegenteil beweist. Ihn mitzunehmen hiesse, auf einen Klick "entferne UNSERE Bausteine"
fremden Text zu löschen.

**ZU (3) — DAS IST GEMESSEN UND KEIN VERSPRECHEN:** Der erste Round-Trip über einen rohen
Import ändert den Text (2 959 B -> 2 939 B an der Fixture), jeder weitere nicht mehr; und
`stabilizeIds` ist an allen drei Proben idempotent (Vermerk P11.11-17, Punkte (a) und (b)).
**Der Betreiber bekommt die Normalisierung also genau einmal, und er bekäme sie ohnehin beim
nächsten Speichern.** Das ist der Prüfstein 1 aus Abschnitt 9, beantwortet: Der Einwand ist
richtig, sein Preis ist einmalig und fällt sowieso an.

**ZU (3) — DIE ÄNDERUNG AM RESTTEXT IST GEMESSEN NULL:** Das Ergebnis des Entfernens war
BYTE-GLEICH zu "derselbe Text minus genau die `outerHTML` der Knoten", Byte-Differenz 27 043
gegen Blocksumme 27 043 (Vermerk P11.11-17, Punkt (c)). **Ausser den Blöcken ändert sich
nichts.**

**ZU (4) — DER GRUND IST DER GANZE SATZ: EIN RIEGEL, DEN KEIN KNOPF LÖSEN KANN, IST EIN
TOTER ZUSTAND.** Verweigert das Veröffentlichen, solange das Prädikat meldet, und meldet das
Prädikat nach dem Entfernen weiter, dann ist das Projekt unveröffentlichbar und der einzige
angebotene Ausweg wirkungslos. **DER FALL IST GEMESSEN UND NICHT ERFUNDEN:** Eine Kennung in
einem KOMMENTAR überlebt den DOM-Durchlauf, und das Prädikat findet sie weiter (Vermerk
P11.11-17, Punkt (e)). Deshalb nennt die Meldung dann die Fundstelle — der Betreiber kann
sie von Hand entfernen, und er weiss wo.

**WEN SIE BINDET:** den Plan der Scheibe 11.11d und jede spätere Runde, die dem
ausgelieferten Text einen Baustein hinzufügt — sie erbt die Nachbedingung.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die vier Messungen, auf die sie sich
stützt, sind GEMESSEN an der Sonde (CC, 2026-09-21, Vermerk P11.11-17).

### ENTSCHEIDUNG P11.11-20 — DER RIEGEL PRÜFT DEN QUELLTEXT BEIDER VARIANTEN, UND ER ERFASST AUCH DEN EXPORT

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21), drei Sätze:**

1. **ER PRÜFT DEN QUELLTEXT BEIDER VARIANTEN.** Der Server bekommt dafür den **Quelltext von
   B mit, symmetrisch zu A.**
2. **EIN ZÄHLEN AM FUNKTIONALEN DOKUMENT IST VERWORFEN.**
3. **EXPORT UND KOPIEREN WERDEN MIT DERSELBEN MELDUNG VERWEIGERT.**

**ZU (1) — WARUM DER QUELLTEXT UND NICHT DAS ERZEUGTE DOKUMENT:** Das erzeugte Dokument
trägt unsere Blöcke IMMER — es ist der Erzeuger, der sie einbaut. Die Frage "hat der
Betreiber ALTE Blöcke im Text?" lässt sich daran gar nicht stellen.

**ZU (1) — DIE HEUTIGE LÜCKE IST GEMESSEN:** `snapshot.html` trägt den Quelltext der
Variante A; für B reisen NUR `functionalHtml` und `mappings` (Vermerk P11.11-17, Punkt (h)).
**Ohne die Erweiterung prüfte der Server B gar nicht** — und ein Publish schreibt BEIDE
Varianten in EINEM atomaren Write.

**ZU (2) — DER GRUND IST EINE MESSUNG, KEINE ERWÄGUNG:** In Zustand 1 der Re-Import-Messung
stand **jeder alte Block GENAU EINMAL** da (`pagesmith-mappings` 1, `pagesmith-consent` 1,
`__ps_pve` 1 — VERMERK P11.11-16). Ein Riegel, der "mehr als einmal" zählt, hätte dort
NICHTS gemeldet — und genau dort fielen die Conversions ins falsche Projekt. **Die Zählung
ist also nicht bloss unscharf, sie verfehlt den gemessenen Schadensfall vollständig.**

**ZU (3) — DAS IST EINE ERWEITERUNG DER OWNER-ENTSCHEIDUNG P11.11-10 AUF DEN EXPORT, UND SIE
IST ARCHITEKT; DER OWNER KANN WIDERSPRECHEN.** P11.11-10 spricht vom Veröffentlichen. **DER
GRUND FÜR DIE ERWEITERUNG:** Der Export erzeugt über GENAU DENSELBEN Weg dasselbe Dokument
(Vermerk P11.11-17, Grenzen) — er verdoppelt also identisch. Ein Riegel nur am Publish
liesse den Weg offen, der den Schadensfall der Messung überhaupt erst hergestellt hat: Der
Aufbau in VERMERK P11.11-16 beginnt mit **"Sein Export wird heruntergeladen"**.

**ZU (3) — DER PREIS IST BENANNT:** `handleExportDownload` hat heute KEINEN Fehlerkanal
(Vermerk P11.11-17, Grenzen). Der Riegel braucht dort einen; ihn zu bauen ist Teil der
Scheibe und kein Nebenbei.

**WAS DIESE ENTSCHEIDUNG NICHT TUT:** Sie ändert am Leer-Riegel nichts. Sie tritt DANEBEN,
mit derselben Bauform und an derselben Stelle der Kette — vor dem Label-Block, damit eine
Ablehnung nichts schreibt.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die Signatur und die fehlende B-Hälfte
GELESEN am Code (CC, 2026-09-21); die Zählwerte aus Zustand 1 sind OWNER-MESSUNGEN (LIVE,
2026-09-21, VERMERK P11.11-16) und von CC nicht geprüft.

### ENTSCHEIDUNG P11.11-21 — DIE OBERFLÄCHE: WARNUNG UND EIN KNOPF IM BEREICH BAUEN, ROT OHNE `truncate`

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):**
- **Warnung im Bereich BAUEN, unter dem Import-Feld.**
- **EIN Knopf: "Pagesmith-Bausteine entfernen".**
- **Roter Text OHNE die Klasse `truncate`.**
- **KEIN Signal in der Reiterzeile.**

**DIE KLASSE `truncate` IST AUSGESCHLOSSEN, UND DAS IST KEINE GESTALTUNGSFRAGE:** Der
Selektor `span.truncate.text-red-600` bezeichnet in
`src/components/CodeImporter.test.tsx` den ZENTRALEN Fehlerkanal — einmal als
Abwesenheits-Zusicherung, einmal als Positiv-Zusicherung, bei der `querySelector` den ERSTEN
Treffer in Dokumentreihenfolge liefert (Vermerk P11.11-17, Punkt (k)). **Ein roter Text mit
beiden Klassen bräche beide Läufe, und der zweite bräche STILL — er bekäme einfach den
falschen Satz.**

**KEIN SIGNAL IN DER REITERZEILE:** Die Reiterzeile trägt heute GENAU EIN Signal
(`measureSignal`); ein zweites wäre Signal-Ermüdung. Das ist Satz 10 der ENTSCHEIDUNG
P11.11-12, hier unverändert übernommen und nicht neu begründet.

**WAS HIER NICHT ENTSCHIEDEN IST UND DER PLAN ENTSCHEIDEN MUSS:** ob die Warnung INNERHALB
des einklappbaren Code-Eingabe-Blocks steht oder DARUNTER, ausserhalb. Der Block wird vom
Zen-Modus per `display:none` versteckt; eine Warnung darin wäre im eingeklappten Zustand
unsichtbar — **und der Zen-Modus klappt bei einem Import-Ereignis automatisch ein, also
genau in dem Moment, in dem die Warnung entsteht.** Die Testumgebung wertet kein CSS aus
(Dauerregel), ein Test würde den Unterschied also NICHT sehen.
**ENTSCHIEDEN AM 2026-09-21 → ENTSCHEIDUNG P11.11-22, Punkt (b): AUSSERHALB, direkt
darunter.** Der Fragetext bleibt stehen, weil er den Grund trägt; ohne ihn liest sich die
Platzierung wie eine Geschmacksfrage.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die Test-Falle GELESEN am Code (CC,
2026-09-21); das eine Signal der Reiterzeile ist die Angabe aus ENTSCHEIDUNG P11.11-12 und
in dieser Runde nicht neu erhoben; das Zen-Verhalten GELESEN am Code (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-22 — DIE FREIGABEN ZUM PLAN DER SCHEIBE 11.11d

**SIE STEHT VOR DEM BAU UND NICHT DANACH** — sieben Punkte, die der Plan offengelassen oder
als blockiert gemeldet hat. Der Byte-Wächter unter (g) ist der Grund für den Zeitpunkt: Sein
Vorher-Wert ist nach der ersten Zeile Produktivcode nicht mehr herstellbar
(docs/immer-beachten.md, EIN VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT).

**(a) DER SCOPE-WÄCHTER WIRD FÜR GENAU ZWEI ZEILEN GEHOBEN (ARCHITEKT, 2026-09-21).**
`export` an `MAPPINGS_SCRIPT_ID` (`src/lib/generate.ts`) und an `SCRIPT_ID`
(`src/lib/analytics/pageview-emitter.ts`) — **Weg (A) aus dem Plan.** Je Datei ändert sich
**GENAU EINE Zeile**, und zwar um das Wort `export`; die Kopfkommentare werden NICHT
angefasst. **Die drei anderen Wege sind mit ihrem Grund verworfen:**
- **(B) beide Konstanten in eine neue reine Datei ziehen und zurückimportieren** — fasst die
  geschützten Dateien **MEHR** an als (A) und verlangt zusätzlich eine neue Datei, also
  Weg 8 aus CLAUDE.md und damit eine Owner-Entscheidung.
- **(C) die zwei Literale im Prädikat neu tippen** — bricht ENTSCHEIDUNG P11.11-18 ("eine
  Quelle") und ist **nicht absicherbar**: Ein Wächter kann eine modul-private Konstante
  nicht lesen, die zweite Quelle bliebe ungedeckt und liefe bei der nächsten Umbenennung
  still auseinander.
- **(D) die zwei Merkmale weglassen** — für die ERKENNUNG fiele nichts aus, weil
  `generateFunctional` Consent-Gate, Datenblock und Wiring **immer zusammen** anhängt; **für
  das ENTFERNEN wäre es ein STILLER Fehlschlag:** Der Mapping-Block bliebe stehen, und die
  Nachbedingung aus P11.11-19 meldete trotzdem "sauber", weil das Prädikat ihn nicht sieht.
**WAS AN DEN KOPFKOMMENTAREN AUFFÄLLT — geprüft, nicht geändert:** Der Kommentar über
`MAPPINGS_SCRIPT_ID` nennt das Wiring-Script als Verbraucher. Mit dem Export kommt ein
zweiter dazu; der Satz wird dadurch **unvollständig, nicht falsch**. `SCRIPT_ID` trägt gar
keinen eigenen Kommentar.

**(b) DIE PLATZIERUNG: AUSSERHALB DES EINKLAPPBAREN CODE-BLOCKS, DIREKT DARUNTER
(ARCHITEKT, 2026-09-21).** **DER GRUND IST EIN ZEITPUNKT, KEIN GESCHMACK:**
`autoCollapseOnImport` klappt den Block bei einem Import-Ereignis ein — **also genau im
Moment, in dem die Warnung entsteht.** Innen wäre sie damit im häufigsten Fall unsichtbar,
und **kein Test würde es melden**, weil die Testumgebung kein CSS auswertet. Die offene
Plan-Frage an ENTSCHEIDUNG P11.11-21 ist damit geschlossen; dort steht der Zeiger.

**(c) `__ps_sbx` (`PREVIEW_STORAGE_SHIM_ID`) IST EIN MERKMAL.** **ER KANN IN EINEM EXPORT
STRUKTURELL NICHT VORKOMMEN** — der Vorschau-Riegel hängt an den zwei Vorschau-Memos und
NICHT an `generateFunctional` (Entscheidung P11.12-2). **Er steht trotzdem in der Liste, und
zwar aus demselben Grund wie die zwei Host-Tags:** Er kostet nichts, er ist eindeutig, und
er deckt den Fall, dass ein Betreiber aus dem Vorschau-Rahmen kopiert — ein Zustand, der
**ungemessen** ist und nicht ausgeschlossen. **Am Merkmal steht der Satz, warum er im
Normalfall nie anschlägt**, sonst hält die nächste Runde sein Schweigen für einen Defekt.

**(d) DIE VERWEIGERUNGS-MELDUNG NENNT DIE VARIANTE**, nach dem Muster der drei
`EMPTY_*`-Konstanten: ohne Variante B der neutrale Satz, mit B der varianten-spezifische,
und ein eigener Satz, wenn BEIDE Varianten Blöcke tragen. **DER GRUND IST EINE LÜCKE DER
OBERFLÄCHE:** Die Warnung im Bereich BAUEN zeigt nur die **aktive** Variante. Liegt der Fund
in der inaktiven, sähe der Betreiber eine Sperre ohne sichtbare Ursache — er müsste raten,
welche Variante gemeint ist. **Ohne die Variantenangabe wäre der Riegel derselbe tote
Zustand, den P11.11-19 mit ihrer Nachbedingung ausschliesst**, nur auf einer anderen Achse.

**(e) DIE WORTLAUTE SIND OWNER-FREIGABE 2026-09-21** — Warnung, Knopf, vier
Publish-Meldungen, Export-Meldung und der Rest-Satz. **Sie sind gegen die dokumentweiten
Abwesenheits-Zusicherungen geprüft, und das ist GEMESSEN (CC, 2026-09-21):** 26 Achsen aus
`src/components/CodeImporter.test.tsx` und `src/components/TargetCard.test.tsx` — darunter
`%`, `gerettet`, `mindestens`, `NaN`, `undefined`, `noch nicht veröffentlicht`,
`über beide Varianten` — gegen alle acht Wortlaute: **NULL Treffer, keine Kollision.**
Gemessen ist ausserdem, dass **keine Fixture** der zwei Dateien eines der neun Merkmale
trägt; **kein Bestandstest sieht die Warnung also überhaupt.**

**(f) GRENZE — DIE HISTORIE DER ÜBRIGEN KENNUNGEN IST NICHT ERHOBEN.** Erhoben ist allein
die Mapping-Kennung (Vermerk P11.11-17, Punkt (j)). Ob die sechs anderen `id`-Werte oder die
zwei Host-Tags je anders hiessen, ist **nicht gemessen**. **DAS IST TRAGBAR, und der Grund
gehört dazu:** `MAPPINGS_SCRIPT_ID` steht seit `380d9be` (2026-06-23) unverändert, und
`generateFunctional` hängt den Datenblock an **jeden** Export mit Laufzeit-Mappings.
**Jeder Export seit dem ersten trägt damit ein Merkmal, das das Prädikat kennt** — eine
frühere Kennung anderswo könnte also höchstens eine Fundstelle, nie den ganzen Fund
verfehlen. **WAS SIE NICHT DECKT:** das Entfernen. Bliebe ein unbekannt benannter Block
stehen, meldete die Nachbedingung ihn NICHT, weil das Prädikat ihn nicht kennt.

**(g) DER VORHER-WERT DES BYTE-WÄCHTERS, ERHOBEN VOR DER ERSTEN ZEILE PRODUKTIVCODE**
(GEMESSEN an der Sonde, CC, 2026-09-21; zweiter Lauf im selben Prozess byte-gleich, der
erzeugte Text ist also deterministisch):

Aufbau — ein SAUBERES Projekt ohne jeden eigenen Baustein:
`<!DOCTYPE html><html lang="de"><head><title>Waechter</title></head><body><h1 data-pagesmith-id="ps-aaaaaa">Titel</h1><button data-pagesmith-id="ps-bbbbbb">Kaufen</button></body></html>`
· Mappings: `redirect` auf `ps-bbbbbb` nach `https://example.com/checkout`,
`openInNewTab: false`, plus `track` mit `event: "Lead"` · Optionen:
`metaPixelId "1234567890"`, `trackingKey "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"`,
`capiProxyUrl "/api/e"`, `consentTargets ["meta","analytics"]` · Emitter mit demselben
Schlüssel, `"bar"`, `{ appearance: { theme: "auto" }, text: "standard", language: "de" }`.

| Artefakt | Bytes | sha256 |
|---|---|---|
| `generateFunctional(…, "export", …)` | **13 250** | `b6ee842b2a6652ff50f7e827ccefeaef615cdadc1b0b342b67645e0a33a471e6` |
| danach `injectPageViewEmitter(…)` | **27 158** | `70a86db8444cbbd988913373fc7b0c63959ab80050066a333af9048ef1a89d46` |

**WAS DER WÄCHTER LEISTET UND WAS NICHT:** Er nagelt fest, dass die zwei `export`-Wörter aus
(a) den ausgelieferten Text **nicht anfassen**. Er sagt NICHTS über eine reale Kundenseite —
der Aufbau ist eine Sonde. **Wird er rot, ist das ein STOPP und keine Anpassung des
Sollwerts**; ein nachgezogener Sollwert wäre genau der Spiegel, den P11.11-18 verbietet.

**PROVENIENZ:** (a) bis (d) und (f) ARCHITEKT-ENTSCHEIDUNG 2026-09-21; (e) OWNER-FREIGABE
2026-09-21, die Kollisionsprüfung GEMESSEN am Repo (CC, 2026-09-21); (g) GEMESSEN an der
Sonde (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-24 — EINE MELDUNG ÜBER EINEN TEXT WIRD AUS DEM AKTUELLEN TEXT ABGELEITET; EIN GESPEICHERTER ZUSTAND SAGT HÖCHSTENS "ES GAB EINEN VERSUCH"

**→ GEHOBEN 2026-09-22 — ihre drei Sätze stehen seither als datierte ERGÄNZUNG an der
Dauerregel "ABLEITEN STATT LÖSCHEN (projekt-spezifischer View-State)"
(docs/immer-beachten.md), mit der Bedingung ihres Entfallens und einem Zeiger auf das Archiv
dieser Phase. KEINE NEUE REGEL, und der Grund steht in dieser Entscheidung selbst: Sie IST
die Anwendung jener Dauerregel — neu ist allein ihr dritter Satz, der Fall der Meldung über
einen VERGANGENEN Versuch. Eine eigene Regel daneben hätte die Achse ein zweites Mal
geführt.
DER BEFUND UND SEINE MESSUNG BLEIBEN HIER** (U9/U10 vor der Korrektur rot, M7a/M7b machen je
einen wieder rot) **— die Ergänzung trägt ihn verdichtet.**

**HERKUNFT:** Sie stand nicht im Zuschnitt der Scheibe 11.11d, sondern ist im Review jener
Scheibe als Korrektur K2 entstanden. Sie bindet über die Scheibe hinaus und steht deshalb
hier statt am Zuschnitt (docs/arbeitsweise.md, "Beim Abschluss-Vermerk wird der Zuschnitt
verdichtet").

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21), drei Sätze:**
1. **Eine Meldung, die eine Aussage über den TEXT macht, wird aus dem AKTUELLEN Text
   abgeleitet** — nie aus einem Zustand, den ein Handler einmal gesetzt hat.
2. **Ein gespeicherter Zustand darf höchstens sagen "ein Versuch hat stattgefunden", nie
   "das Problem besteht".**
3. **Behauptet eine Meldung etwas über einen VERGANGENEN Versuch, braucht sie zusätzlich
   einen Anker, der sagt, ob jener Versuch noch DIESEN Text meint.**

**DER BEFUND IST GEMESSEN, NICHT ERWOGEN** (CC, 2026-09-21): Die erste Fassung der Scheibe
11.11d hielt die zwei Meldungen als fertige Sätze im State. Sie überlebten damit jedes
Entfernen VON HAND im Editor — die zwei Läufe U9 und U10 waren vor der Korrektur ROT, nach
ihr grün. **Die WARNUNG daneben war vom ersten Tag an richtig, weil sie abgeleitet war;
derselbe Bildschirm zeigte also gleichzeitig eine korrekte und eine veraltete Aussage über
denselben Text.**

**ZU (3) — WARUM EIN BLOSSES FLAG DORT ZU SCHWACH IST:** Der Satz "Nicht alles liess sich
automatisch entfernen" ist eine Aussage über einen Versuch. Nach einem GEGLÜCKTEN Entfernen
und einem NEU eingefügten Export behauptete ein blosses Flag einen Fehlschlag, den es nie
gab. Gebaut ist deshalb ein Vergleich gegen den Text, den jener Versuch ERZEUGT hat; die
Export-Meldung braucht das nicht, weil sie eine Aussage über den JETZIGEN Zustand ist und
mit dem Prädikat immer wahr ist, wenn sie steht.

**WEN SIE BINDET:** jede spätere Runde, die dem Editor eine Meldung über seinen Inhalt gibt
— die Scheiben 11.11b und 11.11c ausdrücklich eingeschlossen, deren Listen und Hinweise
denselben Gegenstand haben.

**SIE IST DIE ANWENDUNG EINER DAUERREGEL, KEINE NEUE:** ABLEITEN STATT LÖSCHEN
(docs/immer-beachten.md) sagt dasselbe für projekt-spezifischen View-State. **NEU IST DER
DRITTE SATZ** — jene Regel kennt den Fall nicht, dass eine Meldung ausdrücklich über einen
vergangenen Versuch spricht und deshalb weder rein abgeleitet noch rein gespeichert sein
kann.

**DIE BEDINGUNG DES ENTFALLENS IST FORMULIERBAR UND HEUTE NICHT ERFÜLLT:** Sie entfällt,
sobald ein Gate eine Meldung, die einen Zustand behauptet, gegen ihre Quelle prüft. Ein
solches gibt es nicht — gefangen hat den Fall ein Review, und danach zwei eigens dafür
geschriebene Läufe.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21 im Review der Scheibe 11.11d. Der Befund
GEMESSEN am eigenen Lauf (CC, 2026-09-21): U9 und U10 vor der Korrektur rot, danach grün;
die Mutationen M7a und M7b machen je genau einen der beiden wieder rot.

### ENTSCHEIDUNG P11.11-26 — EIGEN VOR FREMD, MIT DER KNOTENAUSWAHL AUS 11.11d

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Die Erkennung prüft einen Knoten **ZUERST auf
"eigen"**, und zwar mit **DERSELBEN Knotenauswahl wie das Entfernen aus 11.11d** — eine
Quelle, keine zweite. Erst was nicht eigen ist, wird gegen die fremden Signaturen gehalten.

**DER GRUND IST EIN GEMESSENER FEHLTREFFER UND KEINE ORDNUNGSFRAGE:** Unser eigenes
Wiring-Script trägt `connect.facebook.net` und `fbq`-Aufrufe **als Zeichenketten** (VERMERK
P11.11-17, Punkt (g): beide stehen im ausgelieferten Text nur innerhalb unserer eigenen
Scripte). **In umgekehrter Reihenfolge meldete die Erkennung unseren eigenen Baustein als
fremdes Meta-Pixel** — und ein fremdes Pixel bekommt nach ENTSCHEIDUNG P11.11-3 ein
Entfernen-Angebot. Der Fehltreffer wäre also nicht bloss hässlich, er böte einen Klick an,
der den falschen Knoten trifft.

**DIE GRENZE:** "Dieselbe Knotenauswahl" heisst DIESELBE FUNKTION, nicht dieselbe Logik
noch einmal geschrieben. Eine Kopie wäre die zweite Wahrheit, die ENTSCHEIDUNG P11.11-18
für das Prädikat bereits ausschliesst. **WIE das technisch geschieht, entscheidet der Plan**
— hier ist nur festgelegt, DASS es eine Quelle bleibt.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Dass unser Wiring-Script die zwei
Meta-Merkmale als Zeichenketten trägt, ist GEMESSEN (VERMERK P11.11-17, Punkt (g)).

### ENTSCHEIDUNG P11.11-27 — DER TAG MANAGER IST EIN CONTAINER: EIGENES ETIKETT, NIE ZUM ENTFERNEN

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Ein Tag Manager wird mit einem **EIGENEN
Etikett "Container"** erkannt, **NIE zum Entfernen angeboten**, und trägt einen Hinweis,
dass er **weitere Tags nachladen kann**.

**ZWEI GRÜNDE, und der zweite ist der härtere:**
- **ER IST KEIN PIXEL.** ENTSCHEIDUNG P11.11-3 bietet Entfernen ausschliesslich bei einem
  bekannten PIXEL an. Ein Container unter dieselbe Handlung zu stellen hiesse, jene
  Entscheidung stillschweigend zu erweitern.
- **SEIN ENTFERNEN KANN EINE FREMDE SEITE BRECHEN.** Was ein Container lädt, weiss nur der
  Betreiber; darin kann alles stecken, vom Tracking bis zur Funktion der Seite.

**DIE DRITTE KLASSE IST DAMIT KEINE ERFINDUNG, SONDERN DIE FOLGE:** Neben "bekanntes Pixel"
und "bekanntes CMP" tritt "Container" — mit Etikett, ohne Handlung. **Die Klassenzahl der
ENTSCHEIDUNG P11.11-12, Satz 3, wächst dadurch von VIER auf FÜNF** (`eigen` · Pixel · CMP ·
**Container** · unbekannt). Jener Satz wird NICHT umgeschrieben; dieser Satz tritt daneben.

**DER HINWEIS IST DIE EIGENTLICHE LEISTUNG:** Ein Container ist der einzige Fund, bei dem
die Liste dem Betreiber sagen muss, dass sie **unvollständig sein kann** — was der Container
nachlädt, steht nicht im importierten Text und kann von keiner Erkennung gesehen werden.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21, auf dem Befund des Crawls 2 (VERMERK
P11.11-25 und docs/ziel-befunde.md, Google-Abschnitt, Teil (ct)).

### ENTSCHEIDUNG P11.11-28 — DER ONETRUST-BELEG ZÄHLT FÜR DAS ETIKETT; COOKIEYES BEKOMMT BEIDE BELEGTEN HOSTS

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21), zwei Hälften:**
- **ONETRUST:** Die an EINER Installation abgelesene Adresse (VERMERK P11.11-25, "WAS
  STATTDESSEN TRÄGT") gilt als **Beleg im Sinne von ENTSCHEIDUNG P11.11-15** — **NUR für
  das Etikett.**
- **COOKIEYES:** Die Signatur trägt **BEIDE belegten Hosts** — `cdn.cookieyes.com` und
  `cdn-cookieyes.com`.

**WARUM DAS BEI ONETRUST TRAGBAR IST, OBWOHL P11.11-15 EINE DOKU-LESUNG MEINT:** Der Grund
jener Entscheidung ist der Schaden eines Fehltreffers — **ein Fehltreffer bietet fremden
Code zum Löschen an**. **BEI EINEM CMP HÄNGT KEIN ENTFERNEN AM ETIKETT** (ENTSCHEIDUNG
P11.11-3: CMP bekommt einen Anbindungs-Hinweis und kein Entfernen). Der Schaden, gegen den
P11.11-15 schützt, kann hier also gar nicht eintreten; was bleibt, ist ein falsches Etikett
an einem Script, das ohnehin angezeigt wird.

**DIE GRENZE, UND SIE IST ENG:** Diese Lockerung gilt **nur** dem Etikett und **nur** bei
CMPs. **Ein an einer Installation abgelesenes PIXEL bekäme damit KEINE Signatur** — dort
hängt das Entfernen daran, und P11.11-15 gilt unverändert.

**WARUM COOKIEYES ZWEI HOSTS BEKOMMT:** Die Doku des Anbieters widerspricht sich — der
Fliesstext der CSP-Seite schreibt `cdn.cookieyes.com` mit PUNKT, die Direktiven-Tabelle
derselben Seite `cdn-cookieyes.com` mit BINDESTRICH (VERMERK P11.11-25). **Beide sind
belegt, und keiner ist widerlegt.** Sich für einen zu entscheiden hiesse, die Hälfte der
Installationen zu verfehlen; **die Divergenz wird ABGEBILDET, nicht aufgelöst.**

**WAS AUSDRÜCKLICH NICHT MITENTSCHIEDEN IST:** das Pfadmuster `client_data/(.*)/script.js`.
Ob die Signatur es zusätzlich führt, entscheidet der Plan — ein Zusammensetzen von Host und
Pfad zu einer URL wäre eine FOLGERUNG und bleibt verboten (VERMERK P11.11-25).

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die OneTrust-Adresse ist GEMESSEN am DOM
einer ausgelieferten Seite (CC, 2026-09-21); die zwei CookieYes-Hosts sind GELESEN an der
CSP-Seite des Anbieters (CC, 2026-09-21). Beides in VERMERK P11.11-25.

### ENTSCHEIDUNG P11.11-29 — BILD- UND IFRAME-TAGS MIT BEKANNTER ADRESSE WERDEN ERKANNT, AUCH OHNE SCRIPT DANEBEN

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** `<img>` und `<iframe>` mit einer **bekannten
Adresse** werden erkannt und gelistet — **auch dann, wenn kein Script desselben Anbieters
daneben steht.** **UNBEKANNTE Bilder und iframes erscheinen NICHT.**

**DER GRUND IST EIN BEFUND DES CRAWLS 2 UND KEINE VORSICHT:** Meta und Pinterest erlauben
ausdrücklich, ein Ziel **allein als Bild-Tag** einzubauen — Pinterest wörtlich: "if you
choose you can include only the image tag event code without JavaScript. In this case you do
not need the base code" (docs/ziel-befunde.md, Pinterest-Abschnitt, Teil (ab)); Meta mit dem
eigenen Abschnitt "Das Pixel mit einem IMG-Tag installieren" (ebenda, Meta-Abschnitt, Teil
(g)). **EINE ERKENNUNG ALLEIN ÜBER `<script>`-KNOTEN SÄHE EINE SOLCHE SEITE NICHT** — das
Ziel wäre aktiv, und die Liste behauptete, es sei keines da.

**DIE ASYMMETRIE ZU DEN SCRIPTEN IST ABSICHT UND MUSS BENANNT SEIN, weil sie der
ENTSCHEIDUNG P11.11-3 zu widersprechen scheint:** Dort wird JEDES Script angezeigt, auch das
unbekannte. **HIER NICHT.** Der Grund ist die Grundmenge: Eine Seite trägt eine Handvoll
Scripte und beliebig viele Bilder. Jedes Bild zu listen machte die Liste unlesbar und
verfehlte ihren Zweck; die Sichtbarkeit des Veralterns, die P11.11-3 trägt, leisten die
Scripte bereits.

**WAS DARAUS FOLGT UND WAS NICHT:** Erkannt heisst **gelistet und etikettiert**. Ob ein
Bild-Tag in 11.11c ein Entfernen-Angebot bekommt, ist **hier NICHT entschieden** — das ist
Prüfstein 2 jener Scheibe (Abschnitt 9), und er ist dort ausdrücklich offen.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die zwei Anbieter-Sätze GELESEN
(CC, 2026-09-21), Fundstellen wie genannt.

### ENTSCHEIDUNG P11.11-30 — GEPARKT WIRD IN DREI BELEGTEN FORMEN, UND DIE ADRESSE STEHT AN DREI ORTEN

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Als GEPARKT gilt ein Script in den **belegten
Formen** — `type="text/plain"` · `data-cookieyes` **ohne** Typwechsel · `class="cmplazyload"`
—, und die Adresse wird an **drei** Orten gesucht: `src`, `data-src`, `data-cmp-src`.

**JEDE FORM HAT IHREN BELEG, und die Aufzählung ist genau deshalb keine Vermutung:**
- `type="text/plain"` — Cookiebot, Usercentrics, Klaro (VERMERK P11.11-13) und
  consentmanager (VERMERK P11.11-25).
- `data-cookieyes` **ohne Typwechsel** — CookieYes (VERMERK P11.11-25). **DAS IST DIE
  ABWEICHUNG, DIE DIE AUFZÄHLUNG NÖTIG MACHT:** Wer nur auf `type="text/plain"` prüft, hält
  ein von CookieYes geparktes Script für ein laufendes.
- `class="cmplazyload"` — consentmanager (VERMERK P11.11-25); dort tritt sie ZUSÄTZLICH zum
  Typwechsel auf.
- Die Adresse: `src` bei Cookiebot, Usercentrics und CookieYes; `data-src` bei Klaro;
  `data-cmp-src` bei consentmanager.

**DAS BESTÄTIGT SATZ 5 DER ENTSCHEIDUNG P11.11-12 UND ERWEITERT IHN:** Jener nennt
`data-src` und ist GEMESSEN (`getAttribute("src")` liefert `null`). **Hinzu kommt
`data-cmp-src` als dritter Ort** — bei consentmanager gemessen wäre zu viel gesagt: er ist
GELESEN.

**DIE GRENZE:** Die Liste ist **abschliessend für das, was belegt ist**, nicht für das, was
es gibt. Ein CMP mit einer vierten Parkform erschiene als laufendes Script mit unbekannter
Adresse — angezeigt, ohne Marke. **Das ist der von ENTSCHEIDUNG P11.11-15 gewollte Ausgang
und kein Defekt.**

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21, auf den Belegen der VERMERKE P11.11-13
und P11.11-25; der `data-src`-Befund ist GEMESSEN (ENTSCHEIDUNG P11.11-12, Satz 5), alles
Übrige GELESEN.

### ENTSCHEIDUNG P11.11-31 — 11.11b BLEIBT REIN LESEND

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Die Scheibe 11.11b **zeigt an, erkennt und
meldet die Kollision — sonst nichts.** **Das Entfernen fremder Pixel ist 11.11c.**

**SIE WIEDERHOLT DEN ZUSCHNITT NICHT, SIE SCHÜTZT IHN:** Abschnitt 9 sagt bereits "nur
lesend". **DER WORTLAUT DES ZITATS IST AM 2026-09-22 AN DIE FUNDSTELLE ANGEGLICHEN** — er
stand als "NUR LESEND" da und war es bis zur Verdichtung der Scheibe 11.11b (`68721a5`)
auch; seither heisst es dort klein. **Der Inhalt ist unberührt, korrigiert ist der
SUCHANKER:** Eine wörtliche Suche nach der Grossschreibung fand die Fundstelle nicht mehr
(GEMESSEN, CC, 2026-09-22), und ein Zeiger, der ins Leere greift, zwingt zum Suchen statt
zum Lesen. **DER GRUND FÜR DIE EIGENE ENTSCHEIDUNG IST DER DRUCK, DER MIT A1 BIS A5
ENTSTANDEN IST:** Diese Runde hat der Erkennung eine fünfte Klasse, drei Parkformen, zwei
Adress-Orte und die Bild-Tags hinzugefügt. **Je genauer die Erkennung wird, desto
naheliegender wird es, "dann kann sie es auch gleich entfernen" —** und genau dort bräche
die Trennung, an der die Roadmap-Auflage "keine Veränderung des gespeicherten importierten
Texts ohne seinen Klick" hängt.

**WAS DAS FÜR DEN PLAN HEISST, in einem Satz:** Kein Schreibpfad, kein Knopf mit Wirkung auf
den Text, keine vorbereitende Mutation "für später". **Der Scope-Wächter der Scheibe ist die
Prüfung dieser Entscheidung, nicht eine Formalie daneben.**

**WAS SIE AUSDRÜCKLICH NICHT VERBIETET:** die 11.11d-Warnung und ihren Knopf. Die stehen
bereits und verändern den Text auf Klick — **sie gehören zu 11.11d und sind von dieser
Entscheidung unberührt.**

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21; der Zuschnitt-Satz GELESEN in Abschnitt 9
dieser Datei, die Roadmap-Auflage GELESEN an der Roadmap-Zeile 11.11 (CC, 2026-09-21).

### ENTSCHEIDUNG P11.11-32 — DIE FREIGABEN ZUM PLAN DER SCHEIBE 11.11b

**SIE STEHT VOR DEM BAU UND NICHT DANACH** — sechs Punkte, die der Plan offengelassen, als
Owner-Frage gemeldet oder erst im Bau entschieden hätte. Dieselbe Bauform wie ENTSCHEIDUNG
P11.11-22 zur Scheibe 11.11d.

**(a) DER `export` AN `collectOwnNodes` (`src/lib/own-blocks-strip.ts`) IST FREIGEGEBEN.**
Er ist die einzige Änderung an einer geschützten Datei und umfasst GENAU EIN WORT. **DER
GRUND IST ENTSCHEIDUNG P11.11-26:** Die Erkennung muss "eigen" mit DERSELBEN Knotenauswahl
prüfen wie das Entfernen, und jede andere Form wäre eine zweite Wahrheit — ein eigenes
Prädikat daneben, eine Kopie der Auswahl oder ein neu getipptes Merkmal. **DIE
NEBENWIRKUNG IST GEMESSEN UND KEINE:** Zur Laufzeit erreichen nur `src/lib/mappings.ts` und
`src/components/CodeImporter.tsx` die Datei `detect.ts`; `actions.ts`, `generate.ts` und
`event-names.ts` importieren `mappings.ts` ALLE `import type` (GEMESSEN am Repo, CC,
2026-09-21). **Kein Server-Modul zieht damit den DOM-Code aus `own-blocks-strip.ts` mit** —
die Invariante, für die 11.11d die zwei Dateien überhaupt getrennt hat, bleibt gewahrt.
Präzedenz: P11.11-22, Punkt (a).

**(b) DER GOOGLE-TAG BLEIBT IN 11.11b DIE KLASSE `pixel`.** **IN DIESER SCHEIBE IST DAS
FOLGENLOS**, weil die Klasse allein das Etikett setzt und 11.11b keine Handlung anbietet
(ENTSCHEIDUNG P11.11-31). **OB ER IN 11.11c ENTFERNT WERDEN DARF, IST EINE OWNER-FRAGE UND
GEHÖRT IN DEN PLAN 11.11c** — und der Grund gehört dazu, sonst wird die Frage dort als
erledigt gelesen: **derselbe Tag trägt auch Analytics.** Die Doku des Anbieters nennt für
`gtag.js` ausdrücklich Google Ads, Analytics, Campaign Manager, Display & Video 360 und
Search Ads 360 (docs/ziel-befunde.md, Google-Abschnitt, Teil (cs)). **Ein Entfernen nähme
dem Betreiber möglicherweise seine Analytics mit, nicht nur unser Ziel.**

**(c) DIE GRUPPIERUNG DER FUNDLISTE IST ZWEIGETEILT.** **BEKANNTE Anbieter werden JE
ANBIETER gezeigt, mit der ZAHL der Fundstellen; UNBEKANNTE JE KNOTEN**, mit der Adresse
oder — bei einem Script ohne Adresse — dem Wort `Inline-Skript` und einem kurzen Ausschnitt.
**DER GRUND IST DIE GRUNDMENGE, nicht der Geschmack:** Ein Basiscode plus drei
Ereigniszeilen desselben Pixels sind VIER Knoten und EINE Tatsache; vier Zeilen zu zeigen
verdeckt sie. Bei einem UNBEKANNTEN Script gibt es dagegen keinen Anbieter, nach dem man
gruppieren könnte — dort ist der Knoten die einzige Einheit, die es gibt.

**(d) EIN KNOTEN MIT MEHREREN ANBIETERN WIRD ALLEN ZUGEORDNET, UND EINE ADRESSE GEHT VOR
EINEM NAMEN.** Trifft eine bekannte ADRESSE, entscheidet sie allein. Treffen nur NAMEN
mehrerer Anbieter — ein Inline-Script, das `fbq(` und `gtag(` ruft —, wird der Knoten
ALLEN zugeordnet und als EIN Fund mit mehreren Anbietern gezeigt. **DER GRUND: DER ERSTE
TREFFER IST EINE WILLKÜR.** Wer nur ihn zählt, macht die Reihenfolge der Signaturliste zur
Produktaussage; ein Inline-Script mit zwei Pixeln erschiene dann als eines, und welches
gewinnt, hinge an der Sortierung. **Die Adresse geht vor, weil sie das härtere Merkmal
ist:** Sie steht in einem Attribut, das nur ein Anbieter belegen kann, während ein Name im
Rumpf jedes beliebigen Scripts stehen darf.

**(e) DER SATZ IN `src/components/PublishView.tsx` WIRD ERSETZT.** Heute steht dort "Ein
bereits eingebundenes Consent-Management wird nicht erkannt — …". **MIT DER ERKENNUNG WIRD
ER FALSCH**, und ein falscher Satz zwei Bildschirme neben einer Liste, die das Gegenteil
zeigt, ist teurer als eine fehlende Warnung. Er ist von KEINEM Test gedeckt (GEMESSEN, CC,
2026-09-21: Achse `nicht erkannt` über die drei Komponenten-Testdateien, NULL Treffer) —
der Ersatz kippt also keinen Bestandslauf, und **genau deshalb braucht er einen eigenen
Test, der das Verschwinden des alten Satzes festnagelt.**

**(f) DIE ELF WORTLAUTE SIND FREIGEGEBEN (OWNER, 2026-09-21).** Sie stehen im Bau-Prompt
dieses Tages im Wortlaut; **die Freigabe ist OWNER, weil der Owner diesen Prompt
weiterreicht.** Sie sind gegen die vier dokumentweiten Abwesenheits-Zusicherungen aus
`src/components/CodeImporter.test.tsx` (`/%/`, `/gerettet/i`, `/mindestens/`, `/NaN/`) und
gegen die dreifache Heading-Abfrage `"Tracking-Pixel"` geprüft: **NULL Treffer in beide
Richtungen** (GEMESSEN, CC, 2026-09-21). **DIE SCHREIBUNG IST DURCHGEHEND "SKRIPTE"** — die
Form "Scripte" kommt weder in der Oberfläche noch in einem Test vor.
**WAS DIE PRÜFUNG NICHT DECKT UND WAS DESHALB EINE AUFLAGE BLEIBT:** Der AUSSCHNITT eines
unbekannten Inline-Scripts ist Text des Betreibers und kann jede dieser vier Nadeln
tragen. Heute fällt das nicht auf, weil KEINE Fixture in
`src/components/CodeImporter.test.tsx` ein `<script`, `<img`, `<iframe` oder `<noscript`
enthält (GEMESSEN, NULL Treffer) und die vier Zusicherungen ohne `initialCode` rendern.
**WER DIESER DATEI EINE FIXTURE MIT FREMDEM SCRIPT GIBT, PRÜFT ZUERST DIESE VIER ZEILEN.**

**PROVENIENZ:** (a) bis (e) ARCHITEKT-ENTSCHEIDUNG 2026-09-21, (f) OWNER-FREIGABE desselben
Tages. Die Messungen zum Modulgraphen, zur Testabdeckung des alten Satzes und zur
Wortlaut-Kollision sind GEMESSEN am Repo (CC, 2026-09-21); die Mehrprodukt-Eigenschaft des
Google-Tags ist GELESEN (docs/ziel-befunde.md, Google-Abschnitt, Teil (cs)).

### ENTSCHEIDUNG P11.11-34 — DER GOOGLE-TAG WIRD ZUM ENTFERNEN ANGEBOTEN, MIT EINEM HINWEIS AUF SEINE WEITEREN PRODUKTE

**DIE ENTSCHEIDUNG (OWNER, 2026-09-21):** Der Google-Tag (`gtag.js`) bleibt die Klasse
`pixel` und bekommt in der Scheibe 11.11c ein **Entfernen-Angebot wie jedes andere bekannte
Pixel** — **mit einem Hinweis am Knopf, dass derselbe Tag auch Google Analytics und weitere
Google-Produkte tragen kann.**

**SIE SCHLIESST DEN PRÜFSTEIN 6 DER SCHEIBE 11.11c** (Abschnitt 9), der die Frage
ausdrücklich als OWNER-ENTSCHEIDUNG vor dem Bau ausgewiesen hat; dort steht der Zeiger. Sie
ändert an ENTSCHEIDUNG P11.11-3 nichts — ein bekanntes Pixel bekommt ein Entfernen-Angebot,
und der Google-Tag ist eines.

**ZWEI WEGE SIND VERWORFEN, je mit ihrem Grund:**
- **"NIE ENTFERNEN"** — dann bliebe ein Tag stehen, der **doppelt zählende Ads-Conversions**
  erzeugt, und der Betreiber hätte für genau den Fall, um dessentwillen diese Phase gebaut
  wird, keine Handlung. Der Schaden, gegen den 11.11 antritt, bliebe unberührt.
- **"NUR BEI AUSSCHLIESSLICH WERBE-KENNUNGEN ENTFERNEN"** — verlangt eine **DEUTUNG DER
  KENNUNGEN** (`AW-`, `G-`, `DC-`, `GT-` und was sonst noch) **und einen weiteren Crawl**,
  um sie zu belegen. Beides ist Arbeit, die diese Scheibe nicht trägt; und eine Deutung, die
  falsch liegt, verweigert dem Betreiber die Handlung stillschweigend.

**DER HINWEIS IST DER PREIS DIESER WAHL UND KEIN SCHMUCK:** Die Doku des Anbieters nennt für
`gtag.js` ausdrücklich Google Ads, Analytics, Campaign Manager, Display & Video 360 und
Search Ads 360 (docs/ziel-befunde.md, Google-Abschnitt, Teil (cs)). **Ein Klick kann dem
Betreiber also mehr nehmen als unser Ziel.** Der Hinweis verlegt die Entscheidung dorthin,
wo sie hingehört — zu dem, der weiss, was sein Tag trägt. **Er behauptet nichts über DIESEN
Tag**, weil die Kennung nicht gedeutet wird; er sagt, was der Tag tragen KANN.

**WAS SIE NICHT BERÜHRT:** ENTSCHEIDUNG P11.11-27. Der **Tag Manager** (`gtm.js`) ist ein
CONTAINER und bleibt vom Entfernen ausgeschlossen. **Die zwei Bausteine tragen denselben
Host und verschiedene Pfade** (VERMERK P11.11-25); wer sie zusammenzieht, bietet einen
Container zum Entfernen an.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-21. Die Mehrprodukt-Eigenschaft des Google-Tags
ist GELESEN (docs/ziel-befunde.md, Google-Abschnitt, Teil (cs)); dass eine Deutung der
Kennungen im Repo nicht belegt ist, ist der Stand des Crawls 2 (VERMERK P11.11-25) und keine
neue Messung.

### ENTSCHEIDUNG P11.11-35 — DIE BAUFORM DES ENTFERNENS IN DER SCHEIBE 11.11c, FÜNF SÄTZE

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21).** Jeder Satz bindet den Plan 11.11c.

**(a) EIN KLICK ENTFERNT EINEN GANZEN FUND, ALSO ALLE SEINE FUNDSTELLEN** — Script,
Rückfall-Bild, Rückfall-iframe. **CONTAINER UND CMP BEKOMMEN NIE EINEN KNOPF** (ENTSCHEIDUNG
P11.11-3 für das CMP, ENTSCHEIDUNG P11.11-27 für den Container). **GRUND:** Die Anzeige
gruppiert einen bekannten Anbieter als EINEN Fund mit der Zahl seiner Fundstellen
(ENTSCHEIDUNG P11.11-32, Punkt (c)); ein Knopf, der nur eine davon nähme, liesse ein
Rückfall-Bild stehen, **und das zählt weiter** (Prüfstein 2 der Scheibe, Abschnitt 9).

**(b) ENTFERNT WERDEN NUR GANZE KNOTEN, NIE TEILE EINES TEXTES. INLINE-HANDLER BLEIBEN
UNBERÜHRT** und werden als von Hand zu löschen genannt. **GRUND: EIN ATTRIBUT TRÄGT OFT AUCH
CODE DES BETREIBERS** — ein `onclick`, das `fbq(` ruft, ruft daneben meist noch etwas
anderes. Aus ihm den Anbieter-Aufruf herauszuschneiden hiesse, **fremden Text zu
bearbeiten**, und das ist genau der Fehltreffer, vor dem die Roadmap-Zeile 11.11 unter (e)
warnt.

**(c) DAS ENTFERNEN NUTZT DIESELBE ZUORDNUNG KNOTEN → FUND WIE DIE ANZEIGE — EINE QUELLE.**
**GRUND:** Sonst verschwindet beim Klick auf einen Fund etwas anderes, als angezeigt war.
**DIESELBE FIGUR WIE ENTSCHEIDUNG P11.11-26** (eigen vor fremd mit DERSELBEN Knotenauswahl)
und wie ENTSCHEIDUNG P11.11-18 (ein Urteil, nicht zwei) — eine zweite Suche wäre die zweite
Wahrheit, die bei der nächsten Signatur still auseinanderläuft.

**(d) DER KNOPF TRÄGT EINEN NAMEN, DER "aus dem Code" ENTHÄLT.** **GRUND:** "Entfernen",
"Meta entfernen" und "Ja, Meta entfernen" bezeichnen im Einstellungsbereich bereits das
Entfernen der EIGENEN Pixel-Konfiguration; **derselbe Name für eine andere Wirkung** ist die
Dauerregel ZWEI BEDIENELEMENTE MIT
GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM
(docs/immer-beachten.md). **Der Name wird also in der OBERFLÄCHE unterschieden, nicht per
`aria-label` in der Abfrage** — jene Regel verbietet genau das.

**(e) WIE IN 11.11d: DAS ENTFERNEN ÄNDERT NUR DEN EDITOR-TEXT; GESPEICHERT WIRD BEIM
SPEICHERN.** **NACH DEM ENTFERNEN WIRD AUS DEM AKTUELLEN TEXT NEU ERKANNT** (ENTSCHEIDUNG
P11.11-24), **und was bleibt, wird genannt.** **GRUND:** Satz 2 von ENTSCHEIDUNG P11.11-19
für die erste Hälfte; für die zweite der gemessene Befund K2 der Scheibe 11.11d — eine
Meldung, die als fertiger Satz im State liegt, überlebt jedes Entfernen von Hand und steht
veraltet neben einer abgeleiteten Anzeige derselben Sache.

**WAS HIER NICHT ENTSCHIEDEN IST:** der Umgang mit dem zurückbleibenden `<noscript>`
(Prüfstein 3), das Entfernen-Angebot an einem Bild-Tag OHNE Script (Prüfstein 2, dort
ausdrücklich offen), der Klick auf einen Knoten mit MEHREREN Anbietern (Prüfstein 4) und die
Frage, ob GEPARKTE Pixel wie laufende entfernt werden. **Das entscheidet der Plan 11.11c.**

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Die vier zitierten Entscheidungen und die
Dauerregel GELESEN (CC, 2026-09-21); der K2-Befund ist GEMESSEN (VERMERK P11.11-23).
**DIE NAMENSKOLLISION IST IN DIESER RUNDE NEU AM CODE GEMESSEN** (CC, 2026-09-21):
`src/components/TargetCard.tsx` rendert `` `${config.name} entfernen` `` und
`` `Ja, ${config.name} entfernen` ``, mit `name: "Meta"` bzw. `"Google"` aus
`src/lib/tracking/target-cards.ts`; `src/components/DomainManager.tsx` rendert ausserdem ein
blosses "Entfernen" je Domain-Zeile. **DER AUFTRAG DIESER RUNDE ZEIGTE DAFÜR AUF VERMERK
P11.11-17 — DORT STEHT ES NICHT** (aufgeschlagen, CC, 2026-09-21: jener Vermerk führt unter
(k) die `span.truncate`-Falle, keine Knopfnamen). Der Zeiger ist deshalb durch die Messung
ERSETZT und nicht übernommen (docs/immer-beachten.md, EIN ZEIGER AUF EINE NUMMERIERTE ABLAGE
KANN AUS PLAUSIBILITÄT ENTSTEHEN STATT AUS NACHSEHEN).

### ENTSCHEIDUNG P11.11-36 — DIE FREIGABEN ZUM PLAN DER SCHEIBE 11.11c

**SIE STEHT VOR DEM BAU UND NICHT DANACH** — fünf Punkte, die der Plan als Freigabe gemeldet
oder als Entscheidung ohne Deckung ausgewiesen hat. Dieselbe Bauform wie die ENTSCHEIDUNGEN
P11.11-22 (zu 11.11d) und P11.11-32 (zu 11.11b). **Die Texte unter (F3) sind OWNER-FREIGABE,
die übrigen vier ARCHITEKT.**

**(F1) DER GRUPPENSCHLÜSSEL BEKOMMT EINE DRITTE ACHSE: `traeger` ("knoten" gegen
"handler").** **DAS IST EINE ERWEITERUNG VON ENTSCHEIDUNG P11.11-32, PUNKT (c), und wird als
solche benannt statt eingeschoben:** Aus einer Zeile werden zwei, wo ein `<script>` und ein
Inline-Handler desselben Anbieters zusammentreffen. **DER GRUND IST DER, DEN DER
PARKZUSTAND SCHON TRÄGT** — er steht im Schlüssel, damit jede Gruppe darin EINHEITLICH ist.
Mit 11.11c entsteht derselbe Fall ein zweites Mal: Ein Knopf an einer gemischten Gruppe
entfernte nur einen Teil ihrer Fundstellen, und der Handarbeits-Hinweis gälte nur für den
anderen.

**(F2) KANDIDAT (A) — ES WIRD NICHTS AUFGERÄUMT.** `stripForeignGroup` entfernt die Knoten
des Fundes plus den unmittelbar vorangehenden reinen Leerraum-Textknoten, **sonst nichts**.
**DREI GRÜNDE, und der erste trägt allein:**
- **DAS LEERE `<noscript>` IM `head` ENTSTEHT BEI JEDEM RUNDLAUF, ALSO SCHON BEIM
  SPEICHERN** — GEMESSEN im Plan dieser Scheibe (G2 (ii), CC, 2026-09-21, Projekt-jsdom
  29.1.1): Ein Parse-plus-Serialisieren OHNE jeden Eingriff liefert
  `<noscript></noscript>` im `head` und das `<img>` im `body`, und der zweite Rundlauf ist
  byte-gleich. **11.11c verursacht diesen Zustand nicht; es soll ihn deshalb auch nicht
  beseitigen.**
- **(B) — dokumentweit leere `<noscript>` entfernen — TRÄGT BEIDE FÄLLE, TRIFFT ABER AUCH
  FREMDE LEERE HÜLLEN**, die mit unserem Fund nichts zu tun haben.
- **(B-schmal) UND (C) TRAGEN DEN `head`-FALL GEMESSEN NICHT:** Dort hat der Parser das
  `<img>` aus dem `<noscript>` HERAUSGEHOBEN, bevor irgendeine Logik es sieht —
  `img.closest("noscript")` liefert `null`, `parentElement` ist der `body`. Beide Kandidaten
  lassen das leere `<noscript>` stehen (GEMESSEN, CC, 2026-09-21; der vorab gesetzte
  Sollwert 0 war in beiden Fällen falsch, IST = 1).
**DIE ANBIETER-KOMMENTARE BLEIBEN EBENFALLS** (`<!-- Meta Pixel Code -->` und sein
Gegenstück, GEMESSEN im selben Lauf) — das ist Satz 1 der ENTSCHEIDUNG P11.11-19, hier
unverändert übernommen und nicht neu begründet.

**(F3) DIE VIER WORTLAUTE SIND OWNER-FREIGABE 2026-09-21.** Sie stehen im Bau-Prompt dieses
Tages im Wortlaut; **die Freigabe ist OWNER, weil der Owner diesen Prompt weiterreicht.**
Jeder wird gegen die vier dokumentweiten Abwesenheits-Zusicherungen aus
`src/components/CodeImporter.test.tsx` (`/%/`, `/gerettet/i`, `/mindestens/`, `/NaN/`) und
gegen `SK10` (die Form "Scripte" kommt nicht vor) geprüft. **EINE KOLLISION WIRD GEMELDET,
NICHT DURCH EINE TEXT-ANPASSUNG BESEITIGT** — ein angepasster Text wäre eine Owner-Freigabe,
die niemand erteilt hat.

**(F4) DER GOOGLE-HINWEIS BEKOMMT SEINEN TRÄGER IN `foreign-scan.ts`, NICHT AM
SIGNATUR-EINTRAG — KEINE HEBUNG DES SCOPE-WÄCHTERS.** Eine Zuordnung Anbietername →
Hinweis, **plus ein STRUKTUR-WÄCHTER**, der jeden ihrer Schlüssel gegen
`FOREIGN_SIGNATURES.map(s => s.anbieter)` hält. **DAS ZWEITE LITERAL IST DAMIT GEDECKT:**
Eine Umbenennung des Anbieters macht den Wächter rot. Der Strukturwächter darf die Liste
lesen — das ist die im Kopf von `foreign-signatures.ts` benannte Ausnahme von "die Erwartung
wird nie von dort importiert". **Die saubere Form wäre ein `hinweis`-Feld am Eintrag; sie
verlangt eine Hebung für `foreign-signatures.ts`, und die ist NICHT erteilt.**

**(F5) EIN BILD-FUND OHNE SCRIPT DANEBEN BEKOMMT EINEN KNOPF.** Er ist ein ganzer Knoten der
Klasse `pixel`, und Meta wie Pinterest dokumentieren den Bild-Tag als **eigenen Einbauweg**
(ENTSCHEIDUNG P11.11-29). **DAMIT IST PRÜFSTEIN 2 DER SCHEIBE 11.11c ENTSCHIEDEN**, den
jene Entscheidung ausdrücklich offengelassen hat.

**PROVENIENZ:** (F1), (F2), (F4) und (F5) ARCHITEKT-ENTSCHEIDUNG 2026-09-21, (F3)
OWNER-FREIGABE desselben Tages. Die fünf Messungen unter (F2) sind GEMESSEN an einer Sonde
mit der Projekt-jsdom (CC, 2026-09-21), in einem Wegwerf-Verzeichnis AUSSERHALB des Repos.

### ENTSCHEIDUNG P11.11-37 — DIE SCHEIBE 11.11e: DIE FUNDLISTE WIRD NACH HOST GEBÜNDELT, NICHT NACH PFAD GEFILTERT

**DIE ENTSCHEIDUNG (OWNER, 2026-09-21):**
- **ERKANNTE FUNDE STEHEN IMMER OFFEN OBEN.**
- **DARUNTER, EINGEKLAPPT, "Weitere Skripte (N)":** je **HOST** eine eigene, aufklappbare
  Gruppe, sortiert nach **Anzahl aufsteigend**; die Inline-Skripte als **eigene Gruppe**.
- **NICHTS WIRD AUSGEBLENDET.**

**DER ANLASS IST EINE MESSUNG AN EINER ECHTEN SEITE UND KEINE ERWÄGUNG** (OWNER-TEST,
2026-09-21): Eine reale WordPress-Seite trug **136 Skripte**, davon rund **130** Seiten- und
Theme-Code. Die Fundliste ist damit in ihrer heutigen Gestalt unlesbar — nicht falsch,
sondern unbenutzbar.

**VERWORFEN: TECHNISCHE PFADE AUSBLENDEN.** **DER GRUND STEHT AUF DERSELBEN SEITE:** Dort
lief `https://…/wp-content/plugins/digistore/digistore.js`. **EIN PFAD-FILTER HÄTTE EINEN
TRACKER VERSTECKT** — und zwar still, weil eine ausgeblendete Zeile keine Spur hinterlässt.
Das ist genau der Ausgang, den ENTSCHEIDUNG P11.11-3 verhindern soll: Wer nur Bekanntes
zeigt, lässt die Liste still altern. **Bündeln macht die Liste kurz, ohne etwas
wegzunehmen; Filtern macht sie kurz, indem es etwas wegnimmt.**

**OFFEN FÜR DEN PLAN 11.11e, hier ausdrücklich NICHT entschieden:** Skripte ohne Host
(relative Adresse) · was die Zahl der Überschrift zählt (Hosts, Skripte oder Gruppen) · die
Texte (OWNER).

**REIHENFOLGE: 11.11e KOMMT NACH 11.11c UND VOR DEM PHASENENDE.** Sie setzt 11.11c voraus,
weil die Knöpfe an den erkannten Funden hängen und die Bündelung darunter liegt.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-21. Die Zahlen (136 Skripte, rund 130
Seiten-/Theme-Code) und der Digistore-Pfad sind **OWNER-ANGABEN aus der angezeigten Liste**,
von CC nicht geprüft.

### ENTSCHEIDUNG P11.11-38 — EIN AUFRUF IN SEITEN-CODE WIRD NICHT ENTFERNT; ENTFERNBAR IST NUR, WAS DIE LADE-ADRESSE TRÄGT

**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-09-21):** Ein **Inline-Script** ist nur dann
entfernbar, wenn **sein Rumpf eine bekannte ADRESSE seines Anbieters enthält** — dann ist
es der Basiscode, der das Script des Anbieters lädt. **Wird es NUR über einen NAMEN
erkannt, ist es ein AUFRUF IN SEITEN-CODE:** kein Knopf, von Hand zu löschen.

**DER GRUND IST DIE FEHLERKLASSE VON P11.11-35, Satz (b), EINE EBENE GRÖSSER:** KI-erzeugte
Seiten bündeln Formular- und Menülogik oft in **EINEM** Script, in dem irgendwo ein
`fbq('track', …)` steht. **Ein Klick auf "Meta" hätte diese Logik gelöscht.** Dort war es
ein Attribut, das auch Code des Betreibers trägt; hier ist es ein ganzes Script. Der
Unterschied ist die Grösse des Schadens, nicht seine Art.

**DIE FOLGE FÜR GOOGLE, und sie ist gewollt:** Der **Konfigurations-Schnipsel**
(`window.dataLayer = …; function gtag(){…}; gtag('js', …); gtag('config', …)`) trägt keine
Adresse und wird damit zum **Aufruf**. Entfernbar ist allein das **Lade-Script**
(`<script async src="…/gtag/js?id=…">`). **OHNE LADE-SCRIPT WIRKT DER SCHNIPSEL NICHT** —
er ruft eine Funktion, die niemand mehr definiert nachlädt; der Betreiber kann den Rest von
Hand wegnehmen, und bis dahin schadet er nicht.

**DIE GRENZE, OHNE DIE DIE REGEL MEHR VERSPRICHT ALS SIE HÄLT: Ein Script, das Basiscode
UND eigene Logik MISCHT, wird GANZ entfernt.** Es trägt die Adresse, also gilt es als
Basiscode — und seine mitgeschriebene Logik geht mit. **Das ist bewusst so und nicht
abgefangen:** Wer Anbieter-Basiscode und eigene Logik in einen Knoten legt, hat sie
untrennbar gemacht; ein Werkzeug, das das auseinanderschnitte, bearbeitete fremden Text.

**DER BEFUND AUS DER VORMESSUNG (V1), GELESEN an docs/ziel-befunde.md, CC, 2026-09-21 —
gezielt nach ENTSCHEIDUNG P11.11-14, Achse `connect\.facebook\.net|s\.pinimg\.com|
analytics\.tiktok\.com|snap\.licdn\.com|googletagmanager\.com`, Positivkontrolle
`Browser-Tag-Lesung 2026-09-21` mit fünf Treffern:**
- **meta — JA.** `https://connect.facebook.net/en_US/fbevents.js` steht im Basiscode als
  Argument `v` und wird zur Laufzeit per `insertBefore` eingehängt (Meta-Abschnitt, Teil
  (g), Punkt (a)).
- **tiktok — JA.** `https://analytics.tiktok.com/i18n/pixel/events.js` ist im Basiscode der
  Variablen `i` zugewiesen (TikTok-Abschnitt, Teil (i), Punkt (a)).
- **pinterest — JA.** `https://s.pinimg.com/ct/core.js` wird im Basiscode als Argument der
  sofort ausgeführten Funktion übergeben (Pinterest-Abschnitt, Teil (ab), Punkt (a)).
- **linkedin — JA.** `https://snap.licdn.com/li.lms-analytics/insight.min.js` steht als
  `b.src = "…"` im Basiscode (LinkedIn-Abschnitt, Teil (am), Punkt (a)).
- **google — JA, WIE ERWARTET GETRENNT.** Die Adresse steht im **Lade-Script** als
  `<script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID">`; der
  **Konfigurations-Schnipsel** trägt nur `window.dataLayer`, `function gtag(){…}`,
  `gtag('js', …)` und `gtag('config', …)` — **keine Adresse** (Google-Abschnitt, Teil (cs),
  Punkte (a) und (b)).
**ALLE VIER BASISCODES TRAGEN IHRE LADE-ADRESSE IM RUMPF. KEINE ABWEICHUNG, KEIN STOPP.**

**ZWEI FOLGEN, DIE AUS DEMSELBEN BEFUND KOMMEN UND NICHT VERSCHWIEGEN WERDEN:**
- **DER ERSTE VON LINKEDINS ZWEI SCRIPT-BLÖCKEN TRÄGT KEINE ADRESSE** — er setzt
  `_linkedin_partner_id` und `window._linkedin_data_partner_ids` (Teil (am), Punkt (b)).
  **Er gilt damit als AUFRUF und bleibt stehen**, während der Lade-Block entfernt wird.
- **EREIGNISZEILEN BLEIBEN EBENFALLS STEHEN.** Ein `fbq('track','Lead')` in einem eigenen
  Inline-Script trägt keine Adresse. **Das ist der gewollte Ausgang** — genau so eine Zeile
  steht in KI-Seiten mitten in fremder Logik —, und der gemeinsame Hinweis sagt es dem
  Betreiber.

**DER HINWEIS AM FUND WIRD ZUSAMMENGELEGT:** Handler und Aufruf tragen ab jetzt **denselben**
Satz. **DER GRUND:** Es ist dieselbe Auskunft — hier steckt ein Aufruf in Code, der auch
anderes enthalten kann, und er wird nicht automatisch entfernt. Zwei Wortlaute für eine
Aussage liefen auseinander. **WORTLAUT, OWNER-FREIGABE 2026-09-21** (der Owner reicht den
Prompt weiter): *„Dieser Aufruf steckt in Code der Seite, der auch anderes enthalten kann,
und wird nicht automatisch entfernt. Bitte von Hand löschen."*

**WEN SIE BINDET:** den Bau der Scheibe 11.11c und jede spätere Runde, die der Erkennung
einen Träger oder einer Signatur einen Namen hinzufügt.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21, der Wortlaut OWNER-FREIGABE desselben
Tages. Der V1-Befund ist GELESEN an docs/ziel-befunde.md (CC, 2026-09-21), Fundstellen je
Anbieter wie genannt; **nichts davon ist an einer echten Seite gemessen.** Dass KI-Seiten
ihre Logik in einem Script bündeln, ist die Begründung der Entscheidung und **keine
Messung**.

**ERGÄNZT AM 2026-09-21 — EINE ADRESSE IM RUMPF ZÄHLT SCHON FÜR DIE ERKENNUNG, NICHT ERST
FÜR DEN TRÄGER.** Der Text darüber bleibt wörtlich; dieser Absatz tritt DANEBEN und
schliesst eine Lücke, die erst eine zweite Messung gezeigt hat.

**DER BEFUND (V2) — GEMESSEN an einer Wegwerf-Probe mit dem ECHTEN `collectForeignHits`
und der Projekt-jsdom (CC, 2026-09-21), fünf Blöcke, alle fünf Sollwerte vorher als
Ableitung festgelegt und getroffen:**

| Block | Treffer | Träger | Name im Block? | Adresse im Rumpf? |
|---|---|---|---|---|
| meta | `[Meta]` | knoten | ja | ja |
| tiktok | `[TikTok]` | knoten | ja | ja |
| pinterest | `[Pinterest]` | knoten | ja | ja |
| linkedin, Block 1 (Partner-Kennung) | `[LinkedIn]` | **aufruf** | ja | nein |
| **linkedin, Block 2 (LADER)** | **KEINE** | — | **nein** | **ja** |

**DER LADE-BLOCK VON LINKEDIN TRÄGT SEINE ADRESSE UND BLEIBT TROTZDEM UNBEKANNT.** Er
setzt `window.lintrk` als Zuweisung (`window.lintrk = function(a,b){…}`) und übergibt es
als Argument (`})(window.lintrk);`) — **die Signatur sucht `lintrk(` mit Klammer, und die
steht dort nirgends.** `_linkedin_partner_id` steht im ANDEREN Block.

**WAS DARAUS FOLGT, UND DESHALB IST ES KEINE KOSMETIK:** Der Betreiber sähe den Lader als
**„Inline-Skript" ohne Marke und ohne Knopf**. Ein Klick auf „LinkedIn" nähme dann nur das
Rückfall-Bild mit — **der Lader bliebe stehen, und das Pixel liefe weiter.** Genau den
stillen Ausgang soll diese Phase verhindern.

**DIE REGEL:** Eine bekannte Adresse im **RUMPF** eines Inline-Scripts zählt als
**ADRESS-TREFFER** — gleichrangig mit der Adresse im Attribut und **VOR den Namen**
(dieselbe Rangfolge wie in ENTSCHEIDUNG P11.11-32, Punkt (d): die Adresse ist das härtere
Merkmal). Der Träger bleibt damit folgerichtig **„knoten"**; an der Entscheidung darüber
ändert sich nichts, sie bekommt nur eine zweite Quelle für dasselbe Urteil.

**DER EIGEN-FILTER BLEIBT DER ERSTE SCHRITT, und das ist die Auflage, ohne die diese
Erweiterung gefährlich wäre:** **UNSER Wiring-Script trägt `connect.facebook.net` als
Zeichenkette im Rumpf** (GEMESSEN, VERMERK P11.11-17, Punkt (g)). Ohne den Vorrang von
ENTSCHEIDUNG P11.11-26 würde es durch diese Erweiterung zum **fremden Meta-Pixel mit
Entfernen-Knopf** — ein Klick träfe dann unseren eigenen Baustein.

**DIE GRENZE DER MESSUNG GEHÖRT DAZU:** docs/ziel-befunde.md zitiert die Blöcke **NICHT
wörtlich**; sie zerlegt sie in die Teile (a) Adresse und (b) globale Namen. Die fünf
Blöcke der Probe sind daraus **NACHGEBAUT**, Bestandteil für Bestandteil. **Ein echter
Anbieter-Schnipsel ist damit nicht gemessen** — was gemessen ist, ist der Bau aus den
belegten Bestandteilen.

**PROVENIENZ:** ARCHITEKT-ENTSCHEIDUNG 2026-09-21. Der V2-Befund ist GEMESSEN an der
Wegwerf-Probe (CC, 2026-09-21); die Bestandteile der Blöcke sind GELESEN an
docs/ziel-befunde.md, Teile (g), (i), (ab) und (am), je Punkte (a) und (b).

### ENTSCHEIDUNG P11.11-40 — DIE ZWEI KANDIDATEN GEHÖREN IN DIE SCHEIBE 11.11e: DER ORTSHINWEIS UND DIE ORDNUNG NACH ANBIETER

**DIE ENTSCHEIDUNG (OWNER, 2026-09-22):** Die zwei Kandidaten, die am Eintrag 11.11e in
Abschnitt 9 als **AUSDRÜCKLICH NICHT ENTSCHIEDEN** stehen, werden in die Scheibe 11.11e
**AUFGENOMMEN**:
- **DER ORTSHINWEIS AN AUFRUF- UND HANDLER-ZEILEN.**
- **DIE ORDNUNG DER BEKANNTEN FUNDE NACH ANBIETER.**

**DER UMFANG DER SCHEIBE 11.11e IST DAMIT DREITEILIG** — die Bündelung nach Host aus
ENTSCHEIDUNG P11.11-37 plus diese zwei. **Jener Eintrag wird NICHT umgeschrieben**; an der
Fundstelle der zwei Kandidaten steht ein Zeiger hierher, und ihr Fragetext bleibt, weil er
den Gegenstand und seine Auflagen trägt.

**WARUM SIE ZUSAMMEN IN EINE SCHEIBE GEHÖREN UND NICHT IN ZWEI:** Beide sortieren
DIESELBE Liste. Der zweite Kandidat sagt das selbst ("sie berührt die Bündelung aus
ENTSCHEIDUNG P11.11-37, weil beide dieselbe Liste sortieren"). Zwei Scheiben an einer
Sortierung hätten zweimal denselben Bestandslauf angefasst und beim zweiten Mal gegen
einen Zustand gebaut, den die erste erzeugt hat.

**DIE TEXTE SIND NICHT TEIL DIESER ENTSCHEIDUNG.** Der Owner legt sie **nach dem Plan**
fest — die Überschrift der eingeklappten Gruppe, die Gruppe ohne Host, die Inline-Gruppe,
die Aufklapp-Bedienung und der Ortshinweis. **Der Plan schlägt sie vor und kennzeichnet
jeden Vorschlag als solchen**; eine im Bau gewählte Formulierung wäre eine
Owner-Freigabe, die niemand erteilt hat (dieselbe Bauform wie ENTSCHEIDUNG P11.11-36,
Punkt (F3)).

**EINE AUFLAGE REIST MIT DEM ORTSHINWEIS UND WIRD HIER NICHT ENTSCHIEDEN** (→ ENTSCHEIDUNG
P11.11-41, wo sie am 2026-09-22 entschieden ist)**:** Ein Ausschnitt
ist **Text des Betreibers** und kann jede der vier dokumentweiten Abwesenheits-Nadeln aus
`src/components/CodeImporter.test.tsx` tragen (ENTSCHEIDUNG P11.11-32, Punkt (f)). Ob ein
Ausschnitt an einem BEKANNTEN Fund dieselbe Auflage trägt wie am unbekannten, ist ein
Gate des Plans und nicht dieser Entscheidung.

**WAS SIE NICHT ÄNDERT:** die Reichweite der Scheibe. **11.11e ORDNET UND BÜNDELT, SIE
ERKENNT NICHTS ANDERS** — die Erkennung bleibt im Verhalten unverändert, und nichts wird
ausgeblendet (ENTSCHEIDUNG P11.11-37). Ein Ortshinweis ist eine ANZEIGE an einem Fund, den
es schon gibt; eine Ordnung ist eine Reihenfolge derselben Funde.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG **2026-09-22**, im Chat bestätigt, bevor der Bau-Prompt
weitergereicht wurde. Die zwei Kandidaten und ihre Belege sind OWNER-ANGABEN aus dem
Live-Test der Scheibe 11.11c (2026-09-21) und stehen unverändert an ihrer Fundstelle in
Abschnitt 9; **von CC ist keiner von beiden gemessen.**
**DAS DATUM IST AM 2026-09-22 RICHTIGGESTELLT UND NICHT GESTEMPELT:** Es stand zunächst auf
dem 2026-09-21, weil der Bau-Prompt es so nannte; die Bestätigung fiel auf den 2026-09-22
(OWNER-ANGABE). **Der 2026-09-21 am Live-Test bleibt stehen** — er datiert die Kandidaten,
nicht die Entscheidung über sie, und wer beide gleichsetzt, datiert einen Befund auf den Tag
seiner Verwertung.

### ENTSCHEIDUNG P11.11-41 — DIE FREIGABEN ZUM PLAN DER SCHEIBE 11.11e

**SIE STEHT VOR DEM BAU UND NICHT DANACH** — dieselbe Bauform wie die ENTSCHEIDUNGEN
P11.11-22 (zu 11.11d), P11.11-32 (zu 11.11b) und P11.11-36 (zu 11.11c). **Die Punkte (H)
bis (J) sind OWNER-FREIGABE, die übrigen ARCHITEKT.**

**(A) DER HOST WIRD ÜBER `new URL` GEWONNEN, UND JEDER DER SECHS FÄLLE HAT SEINEN AUSGANG**
(ARCHITEKT, 2026-09-22). Absolut → `hostname`; protokoll-relativ (`//…`) → mit
vorangestelltem `https:` als absolut behandelt; relativ, ungültig, `data:` und `blob:` →
**EINE Gruppe ohne Domain**. **DER GRUND IST JE FALL EIN GEMESSENER** (CC, 2026-09-22,
Wegwerf-Probe ausserhalb des Repos): Der Parser normalisiert die Gross-/Kleinschreibung
selbst (`CDN.Example.COM` → `cdn.example.com`), er WIRFT bei relativ und ungültig — das ist
das Erkennungsmerkmal —, und er wirft **NICHT** bei `data:`/`blob:`, sondern liefert einen
**LEEREN** Host. **Ohne den eigens abgefangenen Leerfall entstünde eine namenlose Gruppe**,
und die sähe auf dem Bildschirm aus wie ein Leerraum.

**(B) DER WEG ÜBER EINE SENTINEL-BASIS IST VERWORFEN** (ARCHITEKT, 2026-09-22). **GEMESSEN:**
`new URL("/pfad", "https://x.invalid/")` löst still auf den Sentinel-Host auf, und `::::`
ebenso. Eine relative Adresse landete damit in einer Gruppe, die nach einem Host aussieht,
den es nicht gibt — **ein stiller Fehlbefund statt einer ehrlichen Auskunft.**

**(C) DER PORT GEHÖRT NICHT IN DEN SCHLÜSSEL** (ARCHITEKT, 2026-09-22): `hostname`, nicht
`host`. **GRUND:** Die Bündelung will kurze Listen; `example.com` und `example.com:8443` als
zwei Gruppen zu führen verlängert sie ohne Erkenntnisgewinn für den Betreiber.

**(D) `www.` BLEIBT GETRENNT** (ARCHITEKT, 2026-09-22). **GRUND:** Es sind verschiedene
Hosts, und eine Bündelung, die sie vereinigt, **behauptet mehr, als sie weiss** — sie kann
nicht wissen, ob dahinter derselbe Betreiber steht. **Der Preis ist benannt:** Eine Seite,
die von beiden lädt, zeigt zwei Gruppen.

**(E) DIE BÜNDELUNG LIEGT IN `src/lib/foreign-scan.ts`, KEINE NEUE DATEI** (ARCHITEKT,
2026-09-22). **GRUND:** `ausschnittVon` ist dort modul-privat und wird für den Ortshinweis
gebraucht — **in derselben Datei ist er ohne Hebung erreichbar.** Eine neue Datei wäre Weg 8
aus CLAUDE.md und verlangte eine Owner-Entscheidung (Präzedenz: P11.11-22, Punkt (a)).
**DIESE SCHEIBE BRAUCHT DAMIT KEINE EINZIGE HEBUNG** — wie 11.11c und anders als 11.11b (ein
Wort) und 11.11d (zwei Wörter).

**(F) EINGEKLAPPT WIRD MIT `<details>`/`<summary>`** (ARCHITEKT, 2026-09-22). **GRUND, und er
ist der tragende dieser Scheibe: ES IST DER EINZIGE KANDIDAT, DER "NICHTS WIRD AUSGEBLENDET"
AM DOM BELEGBAR MACHT** — die Kinder stehen im Dokument, der Zustand ist das `open`-Attribut.
Bedingtes Rendern hätte die Einträge aus dem DOM genommen; ein Test könnte dann
**"gebündelt" nicht mehr von "ausgeblendet" unterscheiden**, und genau das ist die Zusage aus
ENTSCHEIDUNG P11.11-37. **GEMESSEN (CC, 2026-09-22, Wegwerf-Probe in der Projekt-jsdom):** Ein
`<summary>` zählt **NICHT** als Rolle `button` — `queryAllByRole("button")` findet allein den
echten Knopf; `<details>` trägt die Rolle `group`; ein Klick auf das `<summary>` dreht `open`
auch in jsdom. **Die sechs `role="group"`-Abfragen der Bestandsdatei sind alle mit
`{ name: "Variante" }` qualifiziert** und damit unberührt (GEMESSEN).

**(G) DER AUFKLAPP-ZUSTAND STIRBT AM `key`, DER AM PROJEKT HÄNGT** (ARCHITEKT, 2026-09-22).
**GRUND:** Ein Zustand, der dort liegt, wo seine Lebensdauer endet, braucht keinen
Aufräum-Aufruf — Präzedenz ist die Ziel-Karte, deren Zugangsdaten-Zustände beim
Projektwechsel über ihren `key` sterben. Ein unkontrolliertes `<details>` ohne diesen `key`
überlebte den Wechsel, weil React nach Position abgleicht.

**(H) DIE ÄUSSERE ZAHL BLEIBT UNVERÄNDERT** (OWNER, 2026-09-22): sie zählt weiter FUNDE.
**GRUND:** Der Bestandslauf SK2 nagelt die Überschrift wörtlich fest, und jede Umdeutung der
Zahl wäre eine zweite Wahrheit neben der inneren. **"Weitere Skripte (N)" ZÄHLT SKRIPTE**,
nicht Gruppen — so liest es der Wortlaut, den ENTSCHEIDUNG P11.11-37 selbst vorgibt.

**(I) DER ORTSHINWEIS IST DER AUSSCHNITT DER ERSTEN FUNDSTELLE, NEBEN DER
FUNDSTELLEN-ZAHL** (OWNER/ARCHITEKT, 2026-09-22). **DER PREIS IST BENANNT UND GEWOLLT:** Hat
eine Gruppe mehrere Fundstellen, nennt der Ausschnitt **eine** — die Zahl daneben sagt, dass
es mehr sind. Alle Ausschnitte zu zeigen machte eine Gruppe mit sieben Fundstellen zu sieben
Zeilen und damit genau so lang, wie die Bündelung sie kurz machen wollte.
**DIE AUFLAGE AUS ENTSCHEIDUNG P11.11-40 IST DAMIT ENTSCHIEDEN:** Ein Ausschnitt an einem
BEKANNTEN Fund trägt **dieselbe** Auflage wie am unbekannten — er ist Betreiber-Text, wird
als TEXT gerendert und nie als HTML, und wer einem Nadel-Lauf eine Fixture mit fremdem
Script gibt, prüft zuerst die vier Nadeln.

**(J) DIE ORDNUNG FOLGT DER SIGNATURLISTE, INNERHALB EINES ANBIETERS knoten → aufruf →
handler** (ARCHITEKT, 2026-09-22). **GRUND:** Die Reihenfolge der Signaturliste ist im
Bestand **schon** die Konvention für die Anbieter INNERHALB eines Fundes —
`trefferUeberAdressen` und `trefferUeberNamen` filtern über `FOREIGN_SIGNATURES`, ausdrücklich
damit die Folge reproduzierbar ist. Dieselbe Achse zweimal gleich zu ordnen erklärt sich
selbst; alphabetisch wäre eine zweite Ordnungs-Wahrheit daneben. **Bei einem Fund mit
mehreren Anbietern entscheidet der erste.**

**(K) DER EINGEKLAPPTE BEREICH ERSCHEINT NUR BEI MINDESTENS EINEM UNBEKANNTEN FUND**
(ARCHITEKT, 2026-09-22). **DAS IST EINE AUFLAGE AN DEN BAU UND KEINE
GESTALTUNGSFRAGE:** `SK4` fordert innerhalb der Liste **null** Knöpfe, `SK12` **genau
einen** — zwei ZÄHL-Zusicherungen. **GEMESSEN (CC, 2026-09-22): keine der beiden Fixturen
trägt ein unbekanntes Script**, und nach Punkt (F) zählt ein `<summary>` ohnehin nicht als
Knopf; die Auflage ist damit die zweite Sicherung und nicht die einzige. Sie steht
trotzdem, weil eine Sektion mit `(0)` eine Auskunft über nichts wäre.

**PROVENIENZ:** (A) bis (G) und (J), (K) ARCHITEKT-ENTSCHEIDUNG 2026-09-22, (H) und (I)
OWNER-FREIGABE desselben Tages — der Owner reicht den Bau-Prompt nach Ankündigung im Chat
weiter. Die Messungen zu (A), (B), (C) und (F) sind GEMESSEN an Wegwerf-Proben (CC,
2026-09-22), die zu (K) und zu den `role="group"`-Abfragen am Repo (CC, 2026-09-22).

---

## Die offenen Designfragen

**ALLE FÜNF SIND AM 2026-09-21 ENTSCHIEDEN — der Fragetext bleibt trotzdem stehen, und das
ist Absicht:** Er sagt, WAS offen war und WARUM, und ohne ihn liest sich eine Entscheidung
wie eine Selbstverständlichkeit. Je Frage steht unten ein Zeiger auf die Entscheidung, die
sie schliesst. **BIS ZU DIESER RUNDE STAND HIER: "KEINE DAVON IST ENTSCHIEDEN, UND KEINE
TRÄGT EINE EMPFEHLUNG."** Sie stehen hier, damit
ein Zuschnitt sie nicht unbemerkt mitentscheidet. D1 und D2 sind aus der Roadmap-Zeile
11.11, Punkt (e), übernommen — dort sind sie ausdrücklich als offen ausgewiesen; D3 bis D5
sind am 2026-09-21 hinzugekommen.

**D1 — WORAN ERKANNT WIRD.** Roadmap-Zeile 11.11, (e), erster Punkt: "Eine Erkennung an
Namen und Adressen ist eine Liste, die altert, und ein Fehltreffer bietet fremden Code zum
Entfernen an, den niemand gemeint hat — ein Klick darauf entfernt ihn. DAS ENTSCHEIDET DER
ZUSCHNITT, nicht diese Zeile." (GELESEN, CC, 2026-09-21.)
**ENTSCHIEDEN 2026-09-21 → Entscheidung P11.11-7:** eine versionierte Signaturliste
(Script-Adressen, typische Inline-Aufrufe) in einer REINEN Datei mit eigenen Tests. Der
Einwand gegen Listen bleibt wahr; P11.11-3 nimmt ihm die Spitze, weil die Liste über die
MARKIERUNG entscheidet und nicht über die SICHTBARKEIT.

**D2 — WANN UND WO DIE ERKENNUNG LÄUFT.** Roadmap-Zeile 11.11, (e), zweiter Punkt: "beim
Import, beim Speichern oder beim Veröffentlichen … IN DER RUNDE, DIE DIESE ZEILE ANLEGT,
NICHT ERHOBEN." **DER BESTAND DAZU IST INZWISCHEN ERHOBEN und steht im Vermerk P11.11-1** —
die fünf Stationen, ihre Symbole, und die Stelle, an der der Text noch unverändert
vorliegt. **Die FRAGE bleibt trotzdem offen:** Der Bestand sagt, WO eine Erkennung sitzen
KÖNNTE, nicht, wo sie sitzen SOLL.
**ENTSCHIEDEN 2026-09-21 → Entscheidung P11.11-5:** im Browser, rein lesend, im bereits
zerlegten Dokument des Import-Pfads (`annotateAndDetect`). Kein zweiter Parse, kein
Server-Weg.

**D3 — DIE REICHWEITE.** Nur bekannte Pixel und CMPs (so der Gegenstand (a) der
Roadmap-Zeile), oder jedes `<script>` mit einer Kennzeichnung der bekannten (so die
Reichweite des Backlog-Eintrags, "beliebige Skripte"). **Die beiden Mengen fallen
auseinander**, und die Entscheidung P11.11-2 stellt das fest, ohne es zu entscheiden.
**ENTSCHIEDEN 2026-09-21 → Entscheidung P11.11-3:** angezeigt wird JEDES Script, bekannte
werden markiert, Entfernen gibt es NUR bei einem bekannten Pixel, ein CMP bekommt einen
Anbindungs-Hinweis, ein unbekanntes Script keine Handlung — und nur Funde MIT Handlung
dürfen leuchten.

**D4 — KANN `settings.customPixel` EIN FREMDES CMP TRAGEN?** **UNGEKLÄRT, am Code zu
messen.** Die Frage entsteht, weil das Feld seit Phase 11.6 existiert und Betreiber-Code
trägt (Vermerk P11.11-1, dritte Ersetzung). **ZWEI DINGE SIND HEUTE GEMESSEN und machen
die Frage überhaupt zu einer** (GEMESSEN am Code, CC, 2026-09-21):
- **DAS FELD HAT EINEN EIGENEN EINWILLIGUNGS-SCHLÜSSEL.** `CUSTOM_CONSENT_TARGET`
  (`src/lib/tracking/consent.ts`) trägt den Wert `custom`; er ist KEIN `TrackingTarget`
  und gelangt nicht in die Ziel-Ableitung (`src/lib/tracking/consent-targets.ts`, Kommentar
  im Wortlaut: "`custom` ist KEIN TrackingTarget und kann aus der Ziel-Ableitung nicht …").
- **DIE REIHENFOLGE VON HOOK-SETZEN UND ERSTER GATE-ABFRAGE.** `buildCustomPixelRuntime`
  (`src/lib/tracking/custom-pixel.ts`) ruft `__psCustomRun` bei `DOMContentLoaded` —
  beziehungsweise sofort, wenn `document.readyState` nicht `"loading"` ist —, und
  `__psCustomRun` bricht ab, solange `__psCustomOk()` falsch ist; jenes fragt
  `__psConsent("custom")` und ist fail-closed, wenn das Gate fehlt.
**WAS DARAUS FOLGT, IST NICHT ERHOBEN UND WIRD HIER NICHT BEHAUPTET** — weder, dass ein CMP
in diesem Feld funktionieren würde, noch, dass es das nicht täte. Die Frage gehört an einen
Zuschnitt, der sie MISST.
**ENTSCHIEDEN 2026-09-21 → Entscheidung P11.11-6, und zwar OHNE MESSUNG:** Die Frage trug
nur die Begründung der Entscheidung (c) der Roadmap-Zeile, und die trägt seit `b57d9a6`
ohne sie. **Der Satz darüber — "Die Frage gehört an einen Zuschnitt, der sie MISST" — ist
damit überholt und bleibt als Zeitdokument stehen:** Gemessen wird sie nicht, weil keine
Entscheidung mehr an ihr hängt. Die Folge fürs Produkt: 11.11 schlägt
`settings.customPixel` NIE als Ort für ein CMP vor.

**D5 — IST EIN FUND EIN ABGELEITETER ZUSTAND ODER WIRD ER PERSISTIERT?** Beide Wege sind
im Bestand vorgezeichnet und tragen verschiedene Auflagen: Ein abgeleiteter Zustand fällt
unter die Dauerregel ABLEITEN STATT LÖSCHEN (projekt-spezifischer View-State), ein
persistierter unter SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB und unter
den offenen Punkt `settingsEqual` IST EINE ALLOWLIST. **KEINE Auswahl.**
**ENTSCHIEDEN 2026-09-21 → Entscheidung P11.11-5:** ABGELEITET, nie gespeichert — keine
Migration, keine Server-Action, kein Mitglied im Einstellungs-Blob. Damit fallen beide oben
genannten Auflagen weg, weil es den Zustand nicht gibt, an dem sie hingen.

---

## Wie diese Datei fortgeschrieben wird

**FORTGESCHRIEBEN WIRD** mit dem Abschluss-Vermerk einer Scheibe, nach dem Live-Test, im
selben Zug wie die Verdichtung des Zuschnitts (docs/arbeitsweise.md, Die Standdatei;
GELESEN, CC, 2026-09-21).

**PROVENIENZ AN JEDER ANGABE:** gemessen (am Repo oder live, mit Datum), gelesen (mit
Quelle) oder als Owner- bzw. Architekten-Angabe gekennzeichnet. **Als Ort steht der
SYMBOLNAME, nie eine Zeilennummer** — sie altert mit dem nächsten Commit.

**DIE LÜCKEN-REGEL:** Ein Vermerk ohne Commit-Nummer ist der jüngste, noch nicht
committete. Es darf immer nur EINE Lücke geben — stehen zwei da, ist etwas
liegengeblieben; geschlossen wird sie in Auftrag 0 der nächsten Runde. **P11.11-1 ist
KEINE solche Lücke:** Er trägt den Grund für den fehlenden Bau-Commit an sich selbst.

**TITEL-ZITATE OHNE MARKE.** Wer eine Überschrift dieser Datei zitiert — etwa beim
Verdichten eines abgelaufenen Zuschnitts —, schreibt sie ohne die Überschriften-Marke,
sonst kollidiert das Zitat dauerhaft mit jeder künftigen gleichlautenden Überschrift
(docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
VERZEICHNIS NICHT, Zusatz vom 2026-08-27).

**TEILUNG IST AUSGESCHLOSSEN, SOLANGE DIESE DATEI UNTER 4000 ZEILEN BLEIBT** — ein Verbot,
keine Schwelle (docs/arbeitsweise.md, Die Standdatei). **HIER STAND BIS ZUM 2026-09-21 EINE
ZAHL ÜBER DIE EIGENE GRÖSSE, UND SIE WAR SCHON BEIM SCHREIBEN FALSCH** ("Sie hat heute keine
300", bei knapp 400 Zeilen). Sie ist ersetzt und nicht nachgezogen worden: Eine Datei, die
ihre eigene Grösse im Präsens nennt, erzeugt einen Kreislauf aus Nachzügen, und der Nachzug
ist selbst eine Änderung (docs/immer-beachten.md, EINE DATEI, DIE IHRE EIGENE GRÖSSE IM
PRÄSENS NENNT, ERZEUGT EINEN KREISLAUF AUS NACHZÜGEN). **Wer wissen will, ob die Schwelle
erreicht ist, misst — `wc -l`.**

---

## Vermerke

### VERMERK P11.11-1 — DIE ERSTE AUFKLÄRUNG (2026-09-21)

**KEINE SCHEIBE, KEIN BAU, KEIN BAU-COMMIT — und der Grund steht hier, nicht in einem
Bericht:** Die Runde war eine READ-ONLY-Aufklärung über sieben Aufträge (Pflicht-Gate,
Repo-Stand, Roadmap-Zeile, Backlog-Bezug, Import-Pfad am Code, bestehende Wächter,
Nachbarschaft). Sie hat keine Datei angelegt, geändert oder verschoben; es gibt deshalb
nichts zu committen. Ihr Bericht liegt in KEINER Datei — was davon weiterträgt, steht in
diesem Vermerk und in der Entscheidung P11.11-2.

**REPO-STAND ZUM ZEITPUNKT DER MESSUNGEN:** HEAD `6b3c12a`, Arbeitsbaum sauber
(`git status --short` leer). GEMESSEN (CC, 2026-09-21).

**DIE FÜNF STATIONEN DES IMPORT-PFADS — GEMESSEN am Code (CC, 2026-09-21), je Datei und
Symbol:**

**(a) EINGANG — DREI WEGE, ALLE IN `setCode`.** In `src/components/CodeImporter.tsx`:
das `<textarea>` über `onChange` (sein `onPaste` setzt nur die Upload-Meldung zurück und
ruft `autoCollapseOnImport`) · der Datei-Upload über das versteckte `<input type="file">`
und `importFile` · der Drag-Drop über `onDrop`, der die ERSTE Datei an **dieselbe**
`importFile` gibt. `importFile` prüft mit `validateUploadFile` (`src/lib/upload.ts`) VOR
dem Lesen zwei Schranken — Typ (`text/html` oder Endung `.html`) und Grösse
(`MAX_UPLOAD_BYTES`) — und liest dann per `FileReader.readAsText` in `setCode`.
**KEIN Server-Upload, KEINE zweite Verarbeitungskette.**

**(b) ZERLEGUNG — `annotateAndDetect` UND `stabilizeIds`** (beide `src/lib/detect.ts`).
Beide sind DOMParser-Round-Trips mit demselben Kern `stabilizeDoc`, der
`data-pagesmith-id` an die Kandidaten des `LINKABLE_SELECTOR` schreibt; `collectElements`
liest danach read-only. **DER UNTERSCHIED IST DIE INJEKTION:** `annotateAndDetect` hängt
zusätzlich `HIGHLIGHT_STYLE` in den `head` und `LISTENER_SCRIPT` an den `body` — das ist
der VORSCHAU-Pfad; `stabilizeIds` tut beides NICHT — das ist der SPEICHER-Pfad. Beide
serialisieren als `<!DOCTYPE html>` plus `documentElement.outerHTML`.

**(c) SPEICHERUNG — DREI ORTE.** `projects.html` über `saveProject`, `projects.html_b`
über `saveVariantB` bzw. `createVariantB`, `projects.published_content` (jsonb) über
`publishProject` — alle in `src/app/projects/actions.ts`. **ROH WIRD NIRGENDS
GESPEICHERT:** Der Client übergibt in `handleSave` (`CodeImporter.tsx`) `stabilizeIds(code)`,
nicht den Rohtext; der gespeicherte Text trägt damit immer die ps-IDs und die
Normalisierung des Round-Trips. Der Server verändert den übergebenen String nicht.

**(d) VORSCHAU — ZWEI RAHMEN, ZWEI SANDBOX-PROFILE**, beide in `CodeImporter.tsx`: der
Edit-Rahmen (`key="ps-edit"`, dauerhaft gemountet, per Klasse versteckt) mit
`sandbox="allow-scripts"` · der funktionale Rahmen (`key="ps-functional"`, nur im
Vorschau-Modus im DOM) mit `sandbox="allow-scripts allow-popups
allow-popups-to-escape-sandbox"`. **`allow-same-origin` ist an BEIDEN aus.**
**DER RIEGEL DER PHASE 11.12 SITZT AN BEIDEN:** `withPreviewStorageShim`
(`src/lib/preview-storage-shim.ts`) setzt `buildPreviewStorageShimScript()` mit der
Kennung `PREVIEW_STORAGE_SHIM_ID` als ersten Knoten in den `head` (Anker `HEAD_START`,
Einsetzpunkt über `headInsertIndex`); ohne `<head>` kommt die Eingabe byte-gleich zurück.
Er wird an den zwei Memos angewandt, NICHT in `generateFunctional` — so die Entscheidung
P11.12-2, im Kommentar an beiden Stellen vermerkt.

**(e) VERÖFFENTLICHUNG, EXPORT UND AUSLIEFERUNG.** Erzeuger für BEIDE Auslieferwege ist
`generateFunctional(html, mappings, "export", options)` (`src/lib/generate.ts`), gerufen
über `buildDocumentFor` (`CodeImporter.tsx`); der EINZIGE Unterschied zwischen Export und
Publish ist `capiProxyUrl` (absolut gegen relativ). Im Modus `"export"` kommen hinzu: der
Text-Bake über `textContent`, der Href-Bake an `<a>` samt gemergtem `rel`, und drei
Script-Knoten am Ende des `body` in fester Reihenfolge — Consent-Gate
(`CONSENT_SCRIPT_ID`, `buildConsentRuntimes`), JSON-Datenblock (`MAPPINGS_SCRIPT_ID`, `<`
als `<` maskiert) und Wiring-Script (`buildWiringScript`). **NUR AUF DEM
PUBLISH-WEG** kommt danach `injectPageViewEmitter`
(`src/lib/analytics/pageview-emitter.ts`) dazu — eine REINE STRING-OP, kein Parser: letztes
`</body>` per `lastIndexOf` auf dem Lowercase-Klon. Ausgeliefert wird der gespeicherte Text
UNVERÄNDERT durch `GET` in `src/app/app-serve/route.ts`.

**AN KEINER DER FÜNF STATIONEN WIRD EIN ELEMENT ENTFERNT — GEMESSEN, NICHT ERSCHLOSSEN**
(CC, 2026-09-21). **ACHSE, in einer Zeile und ohne Umbruch zu lesen:**
`\.remove\(\)|removeChild|removeAttribute|replaceWith|innerHTML\s*=|outerHTML\s*=`
über `src/lib/detect.ts`, `src/lib/generate.ts`,
`src/lib/analytics/pageview-emitter.ts`, `src/lib/preview-storage-shim.ts` und
`src/lib/export.ts` — **NULL TREFFER**. **POSITIVKONTROLLE im selben Lauf:** dieselbe Achse
über ganz `src/` trifft, unter anderem in `src/components/CodeImporter.tsx`,
`src/lib/tracking/consent-choice.ts` und `src/lib/tracking/custom-pixel.ts`. Ohne die
Positivkontrolle wäre ein echter Nicht-Treffer von einem kaputten Instrument nicht zu
unterscheiden.

**DER IMPORTIERTE TEXT LIEGT NUR AN EINER STELLE UNVERÄNDERT VOR:** zwischen `setCode` und
dem ersten Verbraucher, also im `code`-Zustand (und in seinem entprellten Zwilling) und im
`<textarea>`. **JEDER Verbraucher danach normalisiert** — `annotateAndDetect`,
`stabilizeIds` und `generateFunctional` sind alle DOMParser-Round-Trips. **FÜR D2 IST DAS
DIE TRAGENDE ANGABE:** Eine Erkennung, die den Text nicht verändern darf, hat vor dem
ersten Round-Trip einen anderen Gegenstand als danach.

**DREI ANGABEN DER ROADMAP-ZEILE 11.11 WAREN AM 2026-09-21 ÜBERHOLT** und sind in derselben
Runde ERSETZT worden (docs/arbeitsweise.md, Was mit einem falschen Satz geschieht). **Die
AUSSAGEN der Zeile bleiben in allen drei Fällen stehen; überholt waren ihre
TATSACHENANGABEN** — die Fehlerklasse EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG
FALSCH WIRD (docs/immer-beachten.md):
- **DIE AUFRUFER DES GATES.** Die Zeile nannte unter (b) zwei — `pageview-emitter.ts` und
  `meta.ts`. **Es sind seit Phase 11.6 DREI**; dazu `src/lib/tracking/custom-pixel.ts`, das
  in `__psCustomOk` `__psConsent(CUSTOM_CONSENT_TARGET)` ruft. GEMESSEN am Repo (CC,
  2026-09-21), Achse `__psConsentAll|__psConsent\b` über `src/` ohne Testdateien, mit
  Positivkontrolle über dieselbe Achse MIT Testdateien. **Die Aussage "nur UNSER Code fragt
  das Gate" ist unberührt** und steht weiter.
- **DIE PRÄMISSE UNTER (c).** Die Zeile begründete ihren ersten Grund damit, dass die
  Projekt-Einstellungen "kein Feld für fremden Code" tragen, und nannte vier Mitglieder von
  `ProjectSettings`. **Es sind seit Phase 11.6 FÜNF** — `pixels`, `capi`, `hosting`,
  `consent` und `customPixel` (`src/lib/settings.ts`), und `customPixel.code` ist
  ausdrücklich Betreiber-Code, gelesen von `getCustomPixelCode`. GEMESSEN am Code (CC,
  2026-09-21). **WAS DARAUS FOLGT, IST OFFEN und steht als D4** — ob das Feld ein CMP
  tragen KANN, ist weder behauptet noch bestritten. **DIE ENTSCHEIDUNG (c) SELBST IST NICHT
  ANGETASTET**, und ihr erster Grund trägt weiter: Ein automatisches Entfernen nähme jedem
  Betreiber, der sein CMP heute im importierten Text stehen hat, genau dieses CMP — und das
  ist unabhängig davon, ob es daneben noch einen zweiten Weg gibt (ARCHITEKT-ANGABE,
  2026-09-21).
- **DER PFAD-ZEIGER AUF VORRAT (13) DER PHASE 11.5.** Der Klammerzusatz lautete "heute in
  docs/aktiver-stand.md" und zeigte seit dem Phasenende 11.5 ins Leere — GEMESSEN am Repo
  (CC, 2026-09-21): der Pfad existierte zum Zeitpunkt der Messung nicht. **DER HEUTIGE ORT
  IST EIN ANDERER, ALS EINE NAHELIEGENDE VERMUTUNG ERGIBT, und das ist der Grund, warum er
  eigens gemessen wurde:** Der ungekürzte Wortlaut steht im Archiv
  `docs/claude-history/phase-11.5-einwilligung.md`, Abschnitt "9. Vorrat — gemeldet, nicht
  gebaut", unter der Nummer (13), mit dem Zeiger "GEHOBEN 2026-09-16 nach
  docs/claude-history/backlog-polish.md, unter der Nummer (13)"; **geführt wird der
  Gegenstand seither im BACKLOG, NICHT als offener Punkt.** Der offene Punkt UNSER
  EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN — ZWEI WEGE, DIE GETRENNT BLEIBEN
  (docs/offene-punkte.md) stammt ausweislich seines eigenen Kopfes aus **Vorrat (2) und
  (12)** derselben Phase und hat einen anderen Gegenstand. **Wer die beiden zusammenzieht,
  zeigt auf einen existierenden, aber falschen Eintrag.**
  **DIE FEHLERKLASSE DES ALTEN ZEIGERS STEHT IN DERSELBEN KLAMMER, DIE SIE ERKLÄRT** —
  EINE ABLAGE MIT HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE
  (docs/immer-beachten.md); die Zeile nennt die Regel und ist ihr trotzdem erlegen.

**DIE GRENZEN DIESER AUFKLÄRUNG — sie stehen im Wortlaut, weil sie beim nächsten Lesen
sonst zur Vollständigkeit werden:**
- **WAS EIN FREMDES SCRIPT AUF EINER SEITE TATSÄCHLICH SENDET, IST NICHT GEMESSEN.** Die
  Aufklärung hat den PFAD vermessen, nicht die WIRKUNG. Die Roadmap-Zeile sagt dasselbe
  über ihren eigenen ersten Befund ("eine ABLEITUNG und an keiner Seite gemessen"), und
  diese Runde hat daran nichts geändert.
- **`src/app/app-serve/route.test.ts` IST NICHT IM DETAIL ERHOBEN.** Die Datei existiert;
  was sie zusichert, ist in dieser Runde nicht gelesen worden. Wer die Auslieferung
  anfasst, erhebt es zuerst.

**PROVENIENZ:** alle Angaben dieses Vermerks GEMESSEN am Repo bzw. am Code (CC,
2026-09-21), Achsen wie an der jeweiligen Stelle genannt; die Wortlaute der Roadmap-Zeile
und des Backlog-Eintrags GELESEN (CC, 2026-09-21). **KEIN Bau-Commit** — die Runde hat
nichts geschrieben; der Commit, der DIESE Datei anlegt, ist ein Doku-Commit und kein
Bau-Commit.

### VERMERK P11.11-8 — SCHEIBE 11.11a: DER SANDBOX-WÄCHTER (2026-09-21)

**GEBAUT UND LIVE BESTÄTIGT. BAU-COMMIT `4efa94b`** — EINE Datei,
`src/components/CodeImporter.test.tsx`, 163 Einfügungen, NULL Löschungen. **KEIN
Produktivcode:** `src/components/CodeImporter.tsx` trägt vor wie nach dem Bau den sha256
`0992cea94895c83c35a4dcc52b6d83b60c969ed0b40d4b013734f04671e03d8c` — nach JEDER der zehn
Mutations-Rücknahmen einzeln geprüft, nicht nur am Ende.

**WAS GEBAUT IST:** Ein `describe`-Block mit ACHT Läufen, vier je Rahmen (S1–S4 für den
Bearbeiten-Rahmen `title="preview"`, V1–V4 für den Vorschau-Rahmen
`title="functional-preview"`): das Attribut `sandbox` existiert · `allow-same-origin` fehlt
· `allow-scripts` ist vorhanden · die Werteliste ist ABSCHLIESSEND. Gelesen wird über
`getAttribute`, kleingeschrieben, an Leerraum getrennt, leere Einträge verworfen.

**WARUM NICHT ÜBER `iframe.sandbox` — GEMESSEN, nicht erwogen** (CC, 2026-09-21, jsdom
29.1.1, dieselbe Fassung, die vitest über `environment: "jsdom"` zieht): Die Eigenschaft ist
dort `undefined`; es gibt KEIN `DOMTokenList`. Ein Lauf der Form
`frame.sandbox?.contains(...)` wäre TRIVIAL WAHR gewesen und nie rot geworden
(docs/immer-beachten.md, EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, Fall (2)).
**Das ist der Grund für die Bauform, und er steht auch im Kommentar am Wächter selbst.**

**TESTZAHL: 1946 VORHER, 1954 NACHHER**, 88 Dateien vorher wie nachher, alle grün.
Differenz **+8** — exakt die acht neuen Läufe, keine neue Testdatei.

**DIE VIER GATES, alle grün** (CC, 2026-09-21): `tsc --noEmit` exit 0 · `npm run lint`
exit 0, 0 errors / 1 warning (dieselbe vorbestehende in `consent.test.ts`, ausserhalb dieser
Scheibe) · `vitest run` 88 Dateien und 1954 Tests · `npm run build` exit 0.

**ZEHN PFLICHT-MUTATIONEN, FÜNF JE RAHMEN — JEDE WURDE ROT, UND JEDE GENAU WIE
VORHERGESAGT.** Die Vorhersagen standen VOR dem jeweiligen Lauf und sind gegen den dann
aktuellen Bestand neu abgeleitet worden (docs/immer-beachten.md, EINE
MUTATIONS-VORHERSAGE WIRD VOR DEM LAUF GEGEN DEN AKTUELLEN TESTBESTAND AKTUALISIERT):
- **M1** (`allow-same-origin` hinzugefügt) -> S2 + S4 bzw. V2 + V4, zwei Fehlerklassen
  ("verbotener Wert in der Liste" und "Werteliste weicht ab").
- **M2** (derselbe Wert in GROSSBUCHSTABEN) -> dieselben Läufe, dieselben Klassen. **DAS
  IST DIE EIGENTLICHE PROBE:** Ein Wächter ohne das Kleinschreiben wäre hier GRÜN geblieben.
- **M3** (Attribut ganz entfernt) -> ALLE VIER Läufe des Rahmens. **S2/V2 fallen dabei über
  ihre Positivkontrolle**, nicht trivial — ohne sie wären sie unter M3 grün geblieben, weil
  eine leere Liste den verbotenen Wert nicht enthält.
- **M4** (`allow-scripts` entfernt) -> am Bearbeiten-Rahmen S2 + S3 + S4 (das Attribut
  bleibt, aber leer), am Vorschau-Rahmen V3 + V4 (die zwei Popup-Werte bleiben stehen).
- **M5** (`allow-top-navigation` hinzugefügt) -> **NUR S4 bzw. NUR V4.** **DAS IST DER
  GEMESSENE BELEG FÜR DIE ABSCHLIESSENDE LISTE:** Ohne sie hätte ein hinzugefügter Wert
  NULL Läufe rot gemacht.
**KEINE Mutation blieb grün, KEINE traf mehr als vorhergesagt, KEIN Bestandstest fiel.**

**DER LIVE-NACHWEIS (OWNER-ANGABEN, 2026-09-21) — von CC nicht prüfbar:**
- **REGRESSION BESTANDEN:** Das Markieren im Bearbeiten-Rahmen funktioniert; eine
  Weiterleitung öffnet im Vorschau-Rahmen einen neuen Tab. Beide Rahmen tun also weiterhin,
  wofür ihre Sandbox-Werte da sind.
- **DAS `sandbox`-ATTRIBUT STEHT AN BEIDEN RAHMEN EXAKT SO, WIE ENTSCHIEDEN.**
- **DIE TRENNUNG VOM APP-URSPRUNG IST BELEGT, UND ZWAR AN DER WIRKUNG:** In BEIDEN Rahmen
  wirft der Zugriff auf `parent.document` einen `SecurityError`, und `origin` ergibt
  `"null"`. **DAS IST DIE ACHSE, DIE DER WÄCHTER SELBST NICHT MESSEN KANN** — er prüft ein
  Attribut, dieser Schritt prüft seine Wirkung.

**BROWSER: VOM OWNER NICHT ANGEGEBEN.** Der Satz steht hier statt einer Vermutung; ohne ihn
läse die nächste Runde den Nachweis als browser-übergreifend.

**DIE GRENZEN DIESES NACHWEISES — sie stehen im Wortlaut, weil sie beim nächsten Lesen
sonst zur Vollständigkeit werden:**
- **DIE WIRKUNG IST IN EINEM BROWSER GEMESSEN.** Welcher, ist nicht angegeben; die übrigen
  sind UNGEMESSEN. Der Editor läuft im Browser des Betreibers.
- **DIE ZEHN MUTATIONEN LIEFEN GEGEN DIE EINE TESTDATEI**, nicht gegen die volle Suite.
  "Kein Bestandstest fiel" ist damit INNERHALB dieser Datei gemessen; für die übrige Suite
  liegt nur ein Lauf OHNE Mutation vor (Gate 3).
- **DIE NOTWENDIGKEIT DER ZWEI POPUP-WERTE BLEIBT UNGEMESSEN.** Der Wächter nagelt sie
  fest, er begründet sie nicht. Wer einen davon entfernen will, braucht eine Messung —
  s. Entscheidung P11.11-9.

**PROVENIENZ:** Bau-Commit, Dateiumfang, sha256, Testzahlen, Gates und die zehn
Mutationsergebnisse GEMESSEN am eigenen Lauf (CC, 2026-09-21); der jsdom-Befund ebenso, am
Werkzeug. Der Live-Nachweis und das Fehlen der Browser-Angabe sind OWNER-ANGABEN vom
2026-09-21.

### VERMERK P11.11-13 — CRAWL 1: DIE CMPs (2026-09-21)

**KEIN BAU-COMMIT — GRUND: CRAWL.** Die Runde hat fremde Dokumentation gelesen und keine
Zeile Code erzeugt. Alles Folgende ist **GELESEN** an der Anbieter-Doku am 2026-09-21,
nichts davon ist gemessen.

**VON ELF ANBIETERN AUS ENTSCHEIDUNG P11.11-11 SIND DREI ZU ENDE GELESEN**, einer
teilweise, sieben stehen aus.

**Cookiebot — (a) bis (e):**
- **(a)** `https://consent.cookiebot.com/uc.js` mit `data-cbid="<domain-group-id>"`,
  Script-`id="Cookiebot"`; alternativ `…/uc.js?cbid=<id>`. Cookie-Declaration:
  `https://consent.cookiebot.com/<id>/cd.js`, Script-`id="CookieDeclaration"`.
  **Die `uc.js`-Adresse steht im FLIESSTEXT, die vollständigen Tags NUR IM BEISPIEL.**
- **(b)** Globales Objekt `Cookiebot` mit `consent.necessary` · `consent.preferences` ·
  `consent.statistics` · `consent.marketing` · `consent.method` · `consented` · `declined` ·
  `hasResponse` · `doNotTrack`. FLIESSTEXT (Eigenschafts-Tabelle).
- **(c)** **nicht gefunden**; Reichweite: die zwei gelesenen Seiten.
- **(d)** `type="text/plain"` plus `data-cookieconsent="preferences|statistics|marketing"`
  (kommagetrennt). **Die Adresse bleibt in `src`.** FLIESSTEXT, Beispiel bestätigt.
  `__tcfapi` **nicht gefunden**; Reichweite wie oben.
- **(e)** Script-Tag; daneben genannt: Google Tag Manager, WordPress-Plugin, und ein
  automatisches Blockieren als Alternative zur Auszeichnung.
- **QUELLE:** www.cookiebot.com/en/developer/ ("Developer Resources — Cookiebot
  Installation — Cookiebot™", Abschnitt "Cookiebot Developer Resources") und
  www.cookiebot.com/en/manual-implementation/ ("Cookiebot Set Up Guide — How to Install
  Cookiebot CMP", Schritte 3 und 4), beide 2026-09-21.

**Usercentrics — (a) bis (e):**
- **(a)** `https://app.usercentrics.eu/browser-ui/latest/loader.js`,
  Script-`id="usercentrics-cmp"`, `data-settings-id="<id>"`; TCF-Variante zusätzlich
  `data-tcf-enabled`; Geolocation-Variante mit `ruleset-id` STATT `data-settings-id`;
  Entwurfs-Variante mit `data-version="preview"` und `data-disable-tracking`. **Frühere
  Script-Tags, ausdrücklich weiter unterstützt: `bundle.js` und `bundle_legacy.js`.**
  **Die Tags stehen NUR IM BEISPIEL; die Endpunkt-Tabelle steht im FLIESSTEXT** und nennt
  `app.usercentrics.eu` · `api.usercentrics.eu` · `aggregator.service.usercentrics.eu` ·
  `consents.usercentrics.eu` · `consent-api.service.consent.usercentrics.eu`.
- **(b)** `window.UC_UI_DOMAINS` (FLIESSTEXT und Beispiel). **Der globale Name der
  Browser-UI-API ist im gelesenen Umfang NICHT ausgeschrieben.**
- **(c)** **nicht gefunden.** Die Doku nennt `noscript` nur als etwas, das der BETREIBER
  blocken muss — kein eigenes Rückfall-Element des Anbieters.
- **(d)** `type="text/plain"` plus `data-usercentrics="Name Data Processing Service"`.
  **Die Adresse bleibt in `src`.** FLIESSTEXT. Daneben ein automatischer Weg ("Smart Data
  Protector"). TCF: eigener Abschnitt "TCF 2.2 Implementation" und das Attribut
  `data-tcf-enabled`; **`__tcfapi` selbst nicht gefunden**, Reichweite: die drei
  geöffneten Seiten.
- **(e)** Script-Tag; daneben Google Tag Manager über eine eigene Vorlage.
- **QUELLE:** docs.usercentrics.com ("Web CMP v2"), Abschnitte "Browser UI →
  Implementation", "White labeling URLs" und "Guide for scripts that are directly
  integrated into your website", 2026-09-21.

**Klaro — (a) bis (e):**
- **(a)** `https://cdn.kiprotect.com/klaro/v0.7/klaro.js` mit `data-config="klaroConfig"`;
  daneben `klaro-no-css.js`, `klaro.min.css`, `klaro.css`. **NUR IM BEISPIEL.**
- **(b)** `window.klaroConfig` (FLIESSTEXT und Beispiel). Eine "Javascript API" ist als
  eigener Abschnitt geführt und NICHT geöffnet.
- **(c)** **nicht gefunden**; Reichweite: die gelesene Seite.
- **(d)** `type="text/plain"` plus `data-type="application/javascript"` plus
  `data-name="<app>"`; **bei EXTERNEN Scripten wird `src` zu `data-src` umbenannt.**
  FLIESSTEXT, Beispiel bestätigt. Ausdrücklich auch für Bilder und Tracking-Pixel.
  `__tcfapi` **nicht gefunden**.
- **(e)** Script-Tag (Open-Source-Fassung); die gehostete Fassung über einen
  Installations-Assistenten nach Anmeldung.
- **QUELLE:** klaro.org/docs/getting-started ("Getting started | Klaro! Documentation",
  Schritte 2 und 3), 2026-09-21.

**OneTrust — NUR (b):** Globales Objekt `OneTrust` mit `Close()` · `AllowAll()` ·
`RejectAll()` · `ToggleInfoDisplay()` · `LoadBanner()` ·
`InsertScript(url, selector, callback, options, groupId, async)`; dazu das DOM-Element
`onetrust-consent-sdk` und das Cookie `OptanonAlertBoxClosed`. FLIESSTEXT.
**QUELLE:** developer.onetrust.com/onetrust/docs/javascript-api ("Web CMP JavaScript
Methods"), 2026-09-21.
**(a), (c), (d), (e) NICHT GEFUNDEN — mit Reichweite:** Die erreichte öffentliche
Entwickler-Doku ist REST-API-zentriert (Endpunkte zum Veröffentlichen und Herunterladen des
Scripts, nicht der Einbau-Leitfaden); ihre Navigation führte ausschliesslich auf
API-Referenzen. **Es ist KEINE Anmeldeschranke ausgelöst und KEINE Zustimmung erteilt
worden.**

**GELESENER UMFANG:** Cookiebot zwei Seiten · Usercentrics vier Seiten (Einstieg,
`#/browser-cmp`, `#/browser-ui?id=implementation`, `#/direct-implementation-guide`) · Klaro
eine Seite · OneTrust drei Seiten, davon zwei ohne Ertrag.

**GESEHEN, NICHT GEÖFFNET — UND ZWAR AUS BUDGETGRÜNDEN, NICHT AUS EINEM SACHLICHEN
AUSSCHLUSS.** Der Satz steht so, weil die Dauerregel DIE LISTE "GESEHEN, NICHT GEÖFFNET"
IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT genau den begründeten Ausschluss als
Fehlerquelle führt — hier gibt es keinen Grund ausser dem Kontext, und **jede dieser Seiten
kann einen Befund tragen**: Cookiebot `/en/help/`, die GTM- und WordPress-Leitfäden, die
JavaScript-SDK-Seite · Usercentrics `#/tcf2`, `#/smart-data-protector`, `#/v2-embeddings`,
`#/cmp-v2-ui-api`, `#/browser-sdk`, die GTM-Seite · Klaro "Contextual Consent", "Google Tag
Manager (& Consent Mode v2)", "Integration Overview", "Testing", "Annotated configuration",
"Javascript API".

**WAS OFFEN BLEIBT:** OneTrust (a) und (c) bis (e) · CookieYes vollständig — die
Dokumentations-Navigation hat die Einbau- bzw. Blockier-Seite im gelesenen Umfang nicht
hergegeben · consentmanager vollständig, nicht begonnen · **die fünf Fan-Out-Ziele
vollständig, nicht begonnen.**

**EIN QUERBEFUND, DER AUSDRÜCKLICH NICHT FÜR META ZÄHLT:** Die Usercentrics-Seite zeigt als
Beispiel ein Meta-Pixel-Snippet mit `connect.facebook.net/en_US/fbevents.js`,
`fbq('init', …)` und `fbq('track','PageView')`. **Das ist Usercentrics' Wiedergabe, nicht
Metas Doku.** Er ersetzt den Meta-Crawl nicht und darf nicht als Beleg für `meta` zitiert
werden.

**EIN MUSTER ÜBER DIE DREI FERTIGEN CMPs, OHNE VERALLGEMEINERUNG AUF DIE ÜBRIGEN:** Alle
drei parken über `type="text/plain"` und verlangen ein eigenes Attribut für Kategorie oder
Dienstnamen. **SIE UNTERSCHEIDEN SICH DARIN, WO DIE ADRESSE LIEGT** — Cookiebot und
Usercentrics lassen sie in `src`, **Klaro verschiebt sie nach `data-src`.** Das bestätigt
Entscheidung P11.11-12, Satz 5, an einem zweiten Fall.

**WAS docs/ziel-befunde.md ÜBER DIE BROWSER-TAGS DER FÜNF ZIELE TRÄGT: NAHEZU NICHTS.**
GEMESSEN am Dateitext (CC, 2026-09-21), **Achse**
`noscript|Browser-Tag|Basis-?Code|base code|Snippet|fbq|ttq|pintrk|gtag|lintrk|_linkedin|connect\.facebook|analytics\.tiktok|s\.pinimg|snap\.licdn|googletagmanager|script src|<script`,
**Positivkontrolle** `Conversions API` mit 44 Treffern. **Ergebnis: fünf Treffer in zwei
Zusammenhängen.** Für `meta`, `tiktok` und `pinterest` **nichts**; für `google` nur die
gtag-GESTALT `AW-<id>/<label>` als Form der Kennung in der Nutzlast des SERVER-Aufrufs, also
nichts zum Browser-Tag. **DIE EINZIGE ZITIERBARE ANGABE STEHT BEI LINKEDIN, Teil (y):**
`window._linkedin_event_id` vor dem Insight Tag und `event_id` im `lintrk`-Aufruf — **zwei
globale Namen, keine Script-Adresse, kein noscript.** **FOLGE: Alle fünf Ziele müssen
gecrawlt werden.**

**PROVENIENZ:** Alle Anbieter-Angaben GELESEN an der jeweils genannten Quelle (CC,
2026-09-21); der Befund über docs/ziel-befunde.md GEMESSEN am Dateitext (CC, 2026-09-21).
**KEIN Bau-Commit.**

### VERMERK P11.11-16 — DIE RE-IMPORT-MESSUNG (OWNER, LIVE, 2026-09-21)

**KEIN BAU-COMMIT — GRUND: MESSUNG.** Die Runde hat nichts gebaut.
**ALLE ZAHLEN UND KENNUNGEN SIND OWNER-ANGABEN aus einem Live-Lauf vom 2026-09-21; CC hat
sie nicht geprüft.** Was darüber hinausgeht, ist je Satz als ARCHITEKT-ABLEITUNG
gekennzeichnet.

**DER AUFBAU:** Projekt A wird veröffentlicht und trägt eine Track-Aktion. Sein Export wird
heruntergeladen, in ein NEUES Projekt B importiert und dort veröffentlicht.

**ZUSTAND 1 — B OHNE EIGENE VERDRAHTUNG.** Im ausgelieferten Text: `pagesmith-mappings`
**1** · `pagesmith-consent` **1** · `__ps_pve` **1** · `__ps_cns` **0** ·
`document.scripts` **4**. **Ein Klick erzeugt ZWEI Anfragen an `/api/e`**, beide mit
`trackingKey 454ef50a-5038-4397-8997-317c8acf0e92` (**Projekt A**) und derselben
`eventID 023de9b0-9f97-4f41-a24c-7fa8f554fe6b`.

**ZUSTAND 2 — B MIT EINER META-AKTION AUF DEMSELBEN BUTTON, NEU VERÖFFENTLICHT.** **Ein
Klick erzeugt DREI Anfragen:** einmal `trackingKey a3a76b35-36ce-4662-83bd-06c50f2e19ad`
(**Projekt B**, `cns {meta: true}`, `eventID 702980ae-7588-41f6-9cc0-f6273bbc0d6e`) und
zweimal den `trackingKey` von **A** mit
`eventID aaf9d549-5fc9-423d-9cd8-6dc738e46ff6`.

**WAS GEMESSEN IST — und das ist der Kern:**
- **EINE UNTER B AUSGELIEFERTE SEITE SCHREIBT IHRE CONVERSIONS IN PROJEKT A**, und zwar
  **auch dann, wenn in B gar nichts verdrahtet ist.**
- **MIT Verdrahtung in B erzeugt EIN Klick ZWEI Conversions — eine in A, eine in B —, mit
  VERSCHIEDENEN `eventID`s.** Eine Deduplizierung über die Kennung greift dort also nicht.

**DIE DEUTUNG, JE ALS ARCHITEKT-ABLEITUNG (2026-09-21) UND NICHT ALS MESSUNG:**
- **DIE PAARE MIT GLEICHER `eventID` SIND KEINE VERDOPPLUNG.** Sie sind Conversion plus
  Adblocker-Bestätigung — dieselbe Kennung ist dort die Bauform, nicht der Fehler. **Wer
  die zwei Anfragen aus Zustand 1 als doppelte Conversion liest, zählt falsch.**
- **DAS FEHLEN EINER BESTÄTIGUNG FÜR B in Zustand 2 passt zum `foreign`-Zweig in
  `__psMetaInit`** — findet der Bootstrap ein vorhandenes `fbq`, löst er zu `"foreign"` auf
  und verwirft die Bestätigungen. **ABLEITUNG, nicht gemessen.**

**WAS UNGEMESSEN BLEIBT:** **ob META doppelt zählt.** Das hängt an den Pixel-IDs von A und
B, und die sind in diesem Lauf nicht erhoben. Der Lauf zeigt die EIGENE Ablage, nicht die
des Anbieters.

**WAS DER VERMERK EINLÖST:** Die Auflage an ENTSCHEIDUNG P11.11-10 — der Publish-Riegel
erst nach einer Live-Messung des Verdoppelns — ist damit **ERFÜLLT**. Der Befund aus VORRAT
P11.11-5 war eine Ableitung; er ist jetzt an der eigenen Ablage belegt.

**PROVENIENZ:** Aufbau, Zählwerte, Kennungen und Anfragezahlen sind **OWNER-ANGABEN (LIVE,
2026-09-21)**; die vier Deutungssätze sind **ARCHITEKT-ABLEITUNGEN desselben Tages**. **KEIN
Bau-Commit.**

### VERMERK P11.11-17 — AUFKLÄRUNG 11.11d (2026-09-21)

**KEIN BAU-COMMIT — GRUND: AUFKLÄRUNG.** Die Runde hat gemessen und festgehalten; es ist
keine Zeile Produktivcode entstanden. Alles Folgende ist **GEMESSEN am Repo bzw. an einer
Sonde mit dem ECHTEN `src/lib/detect.ts` und der Projekt-jsdom** (CC, 2026-09-21); die Sonde
lag in einem Wegwerf-Verzeichnis AUSSERHALB des Repos.

**(a) `stabilizeIds` IST IDEMPOTENT — DREI PROBEN, ALLE BYTE-GLEICH.**
`stabilizeIds(stabilizeIds(x))` ergab in allen drei Fällen denselben sha256 und dieselbe
Bytezahl wie `stabilizeIds(x)`:
- die Fixture `src/lib/__fixtures__/sample-landingpage.html` (roh 2 959 B) -> 3 809 B;
- ein von `generateFunctional(…, "export")` ERZEUGTES Dokument, nicht nachgebaut -> 16 899 B;
- dasselbe Dokument mit Kommentaren und Leerraum zwischen den eigenen Blöcken -> 16 972 B.

**(b) DER RUNDLAUF OHNE EINGRIFF IST BYTE-GLEICH — ABER ERST AB DEM ZWEITEN.** Ein
publish-naher Text (Export plus `injectPageViewEmitter`, Dialog "bar") kam durch
Parse-plus-Serialisierung BYTE-GLEICH zurück (30 864 B, gleicher sha256), und ein zweiter
Rundlauf ebenso. **DER ROHE IMPORT DAGEGEN NICHT:** die Fixture ging als 2 959 B hinein und
als 2 939 B heraus; der ZWEITE Rundlauf war dann byte-gleich. **Das ist der Prüfstein 1 des
Zuschnitts, gemessen:** Der erste Round-Trip normalisiert, jeder weitere nicht mehr.

**(c) EIN ENTFERNEN PER DOM ÄNDERT AUSSER DEN BLÖCKEN NICHTS.** Aus dem normalisierten Text
wurden die eigenen Knoten entfernt und das Ergebnis gegen "derselbe Text MINUS genau die
`outerHTML`-Zeichenketten der Knoten" gehalten: **BYTE-GLEICH**, gleicher sha256. Die
Byte-Differenz betrug **27 043** und die Summe der acht Block-`outerHTML` ebenfalls
**27 043**.

**(d) ZURÜCK BLEIBT LEERRAUM — UND ZWAR WENIGER, ALS MAN ERWARTET.** Von den ACHT Knoten
trägt **GENAU EINER** einen unmittelbar vorangehenden reinen Leerraum-Textknoten
(`pagesmith-consent`, `"\n  \n\n"`, 5 B); die übrigen sieben folgen direkt auf einen
Element-Knoten. Variante "Block plus Leerraum davor" ergab 3 816 B gegen 3 821 B, also
**5 Bytes Unterschied**. Beide Ergebnisse sind rundlauf-stabil und `stabilizeIds`-stabil.

**(e) DIE NACHBEDINGUNG IST IM NORMALFALL ERFÜLLBAR UND IM KOMMENTAR-FALL NICHT.** Nach dem
Entfernen meldete eine reine String-Prüfung über die Merkmale NICHTS mehr. Wurde vorher
`<!-- id="pagesmith-mappings" alter Rest -->` in den Text gesetzt, meldete sie danach
`id="pagesmith-mappings"` weiter — der Kommentar bleibt stehen, und der DOM-Durchlauf
erreicht ihn nicht.

**(f) DER AUSGELIEFERTE TEXT TRÄGT GENAU ACHT `<script>`-KNOTEN UND KEIN EINZIGES
`<script src=…>`.** SIEBEN tragen eine `id` — `pagesmith-consent`, `pagesmith-mappings`,
`__ps_cnr`, `__ps_clb`, `__ps_crv`, `__ps_cns`, `__ps_pve` —, **EINER trägt keine: das
Wiring-Script.** Das ist die gemessene Grundlage dafür, dass die Merkmale aus
ENTSCHEIDUNG P11.11-18 vollständig sind: Jeder eigene Baustein im ausgelieferten Text IST
einer dieser acht Knoten.

**(g) LAUFZEIT-KNOTEN SIND IM AUSGELIEFERTEN TEXT NICHT ALS EIGEN ERKENNBAR — UND DIE
DIALOG-HOSTS AUCH NICHT.** Im selben Dokument kommt `<pagesmith-bar` **NULL** mal vor;
`pagesmith-bar` steht ZWEIMAL, beide Male als Zeichenkette INNERHALB von `__ps_clb`.
`connect.facebook.net` steht zweimal und `__psCustomLoad` zweimal, ebenfalls nur als
Zeichenketten in unseren eigenen Scripten. **DIE FOLGE, und sie weicht vom berichteten Stand
ab:** Das Meta-Script, der Custom-Pixel-Knoten UND der Dialog-Host entstehen alle erst zur
LAUFZEIT per `createElement`. Sie sind im ausgelieferten Text keine eigenen Knoten und
brauchen deshalb weder ein Merkmal noch ein Entfernen — was der Betreiber re-importiert,
ist der QUELLTEXT, nicht der Laufzeit-Baum. **GRENZE:** Ob ein Betreiber über ein Werkzeug
an den LAUFZEIT-Baum kommt (etwa ein "Speichern unter", das den gerenderten Stand
serialisiert), ist NICHT gemessen; die Dauerregel EIN LIVE-NACHWEIS ÜBER AUSGELIEFERTEN TEXT
MISST IM GELADENEN DOKUMENT führt für Chrome den gegenteiligen Befund, und er ist hier nicht
nachgeprüft.

**(h) `publishProject` BEKOMMT DEN QUELLTEXT DER VARIANTE A, FÜR B NICHT.** Die Signatur
(`src/app/projects/actions.ts`) lautet
`publishProject(projectId, functionalHtml, snapshot: { html, mappings, settings }, variantB?: { functionalHtml, mappings })`.
Der EINZIGE Produktiv-Aufrufer ist `handlePublish` (`src/components/CodeImporter.tsx`) und
gibt `{ html: pairA.html, mappings: pairA.mappings, settings }` mit — `pairA.html` ist der
Editor-Quelltext. **Für B reist NUR das erzeugte Dokument und die Mapping-Liste.**

**(i) DER LEER-RIEGEL SITZT IN `emptyPublishVariant` (`src/lib/hosting/variant.ts`) UND IST
DER PRÄZEDENZFALL.** Er ist ein reines Prädikat in einer reinen Datei ohne `server-only`,
wird vom SERVER (in `publishProject`, VOR dem Label-Block, damit eine Ablehnung nichts
schreibt) UND vom CLIENT (`emptyPublishTarget` in `CodeImporter.tsx`, von dort als Prop an
`PublishView`, wo es den Knopf sperrt) benutzt, und seine drei Meldungen
(`EMPTY_PUBLISH_MESSAGE`, `EMPTY_VARIANT_A_MESSAGE`, `EMPTY_VARIANT_B_MESSAGE`) liegen in
DERSELBEN reinen Datei — ausdrücklich, weil `actions.ts` `"use server"` trägt und dort keine
Konstante exportiert werden darf. Die Auswahl der Meldung trifft der Aufrufer, nicht das
Prädikat.

**(j) DIE KENNUNG DES MAPPING-BLOCKS HIESS NIE ANDERS.** `MAPPINGS_SCRIPT_ID` steht seit
seiner Einführung am 2026-06-23 (Commit `380d9be`) unverändert auf `"pagesmith-mappings"` —
über alle VIERZEHN Commits, die `src/lib/generate.ts` berühren, je am committeten Objekt
abgelesen. **METHODE:** `git log -p --all` über die Datei, Achse `MAPPINGS_SCRIPT_ID =`, mit
Kontextzeile; sie findet GENAU EINE hinzufügende Zeile und KEINE entfernende.
**POSITIVKONTROLLE im selben Lauf:** Dieselbe Methode über `src/lib/hosting/host.ts` mit der
Achse `pgsm\.site|publayer\.net` zeigt in Commit `e4602f1` die entfernende Zeile
`-const SERVING_SUFFIXES = [".pgsm.site", ".lvh.me"];` — die Methode erkennt eine Umbenennung
also. Ohne sie wäre ein echter Nicht-Treffer von einem untauglichen Instrument nicht zu
unterscheiden.

**(k) DIE TEST-FALLE STEHT ZWEIMAL IN `src/components/CodeImporter.test.tsx`, UND SIE HAT
ZWEI RICHTUNGEN.** Der Selektor `span.truncate.text-red-600` bezeichnet den ZENTRALEN
Fehlerkanal in der Preview-Kopfzeile:
- im Lauf "WAECHTER zweite Render-Stelle: createVariantB-Fehler ist OHNE Variante B sichtbar"
  als ABWESENHEITS-Zusicherung (`…).toBeNull()`) — ein NEUER roter Text mit beiden Klassen
  macht ihn rot;
- im Lauf "TEST 2 (Invariante ii): ein SPEICHERN-Fehler bleibt im zentralen Kanal" als
  POSITIV-Zusicherung — `querySelector` liefert den ERSTEN Treffer in Dokumentreihenfolge,
  ein zweites passendes Element davor liesse `textContent` den falschen Satz tragen.

**DIE GRENZEN DIESER AUFKLÄRUNG — sie stehen im Wortlaut, weil sie beim nächsten Lesen sonst
zur Vollständigkeit werden:**
- **DIE FOLGE DER ERZEUGER-GESTALTEN ÜBER DIE HISTORIE IST NUR FÜR DIE MAPPING-KENNUNG
  ERHOBEN.** Für die übrigen sechs `id`-Werte und die zwei Host-Tags ist NICHT gemessen, ob
  sie je anders hiessen. Ein re-importierter Export aus einer früheren Fassung könnte eine
  Kennung tragen, die das heutige Prädikat nicht kennt.
- **GEMESSEN IST EINE SONDE, KEINE ECHTE KUNDENSEITE.** Grundlage ist die Projekt-Fixture
  plus die eigenen Erzeuger, in jsdom. Was eine reale, von einem KI-Werkzeug erzeugte Seite
  beim Rundlauf tut, ist damit nicht erhoben.
- **DER EXPORT-PFAD IST AM CODE BESTÄTIGT, NICHT LIVE.** `handleExportDownload` und
  `handleExportCopy` rufen beide `buildExportDocument()` -> `buildDocumentFor` ->
  `generateFunctional(html, mappings, "export", …)`; der EINZIGE Unterschied zum Publish ist
  `capiProxyUrl` (absolut gegen relativ), und `generateFunctional` erzeugt Consent-Gate,
  Datenblock und Wiring-Script UNBEDINGT. **Der Export verdoppelt damit wie der Publish** —
  das ist am Code abgelesen, nicht an einer heruntergeladenen Datei gemessen.
- **`handleExportDownload` HAT HEUTE KEINEN FEHLERKANAL.** `handleExportCopy` hat einen
  (`copyStatus`, Werte "copied" und "error"); der Download hat keinen. Das ist der Grund,
  warum ENTSCHEIDUNG P11.11-20 den Export-Riegel nicht einfach an einen bestehenden Kanal
  hängen kann.

**PROVENIENZ:** (a) bis (g) GEMESSEN an der Sonde (CC, 2026-09-21), (h), (i) und (k) GELESEN
am Code (CC, 2026-09-21), (j) GEMESSEN an der Git-Historie mit Positivkontrolle (CC,
2026-09-21). **KEIN Bau-Commit.**

### VERMERK P11.11-23 — SCHEIBE 11.11d: EIGENE BAUSTEINE (2026-09-21)

**GEBAUT UND LIVE BESTÄTIGT. BAU-COMMIT `0b9bd7f`** — ZWÖLF Dateien, 1 659 Einfügungen,
FÜNF Löschungen; fünf Dateien neu (`src/lib/own-blocks.ts`, `own-blocks-strip.ts` und die
drei Testdateien `own-blocks.test.ts`, `own-blocks-strip.test.ts`,
`own-blocks-waechter.test.ts`).

**WAS GEBAUT IST, in einem Satz je Schritt:** ein reines String-Prädikat über zwölf
Merkmale aus den Produktiv-Konstanten (`hasOwnBlocks`, `ownBlockFindings`,
`ownBlocksPublishTarget`) · ein DOM-Durchlauf, der alle Vorkommen samt vorangehendem reinen
Leerraum-Textknoten entfernt und die Nachbedingung selbst prüft (`stripOwnBlocks`) · der
Server-Riegel in `publishProject`, ans Ende der Tor-Kette und VOR den Label-Block gesetzt ·
der Export- und Kopier-Riegel · die Warnung samt Knopf im Bereich BAUEN, ausserhalb des
einklappbaren Code-Blocks.

**DIE ZWEI GESCHÜTZTEN ERZEUGER SIND MIT JE EINEM WORT BERÜHRT** — `export` an
`MAPPINGS_SCRIPT_ID` und an `SCRIPT_ID`, `git diff --numstat` je `1 1`, Zeilenzahl und
Kopfkommentare unverändert (Entscheidung P11.11-22, Punkt (a)).

**TESTZAHL: 1954 VORHER, 1996 NACHHER**, 88 Dateien vorher, 91 nachher, alle grün.
Differenz **+42** — 12 in `own-blocks.test.ts`, 9 in `own-blocks-strip.test.ts`, 4 im
Byte-Wächter, +12 in `CodeImporter.test.tsx`, +5 in `publish.test.ts`.

**DIE VIER GATES, alle grün** (CC, 2026-09-21): `tsc --noEmit` exit 0 · `eslint` 0 errors /
1 Warnung (dieselbe vorbestehende in `consent.test.ts`, ausserhalb dieser Scheibe) ·
`vitest run` 91 Dateien und 1996 Tests · `next build` exit 0.

**DER BYTE-WÄCHTER: VORHER = NACHHER.** Der vor der ersten Zeile Produktivcode erhobene
Sollwert (Entscheidung P11.11-22, Punkt (g)) steht unverändert — `generateFunctional("export")`
13 250 B / sha256 `b6ee842b…33a471e6`, danach `injectPageViewEmitter` 27 158 B / sha256
`70a86db8…8ef1a89d46`. **Die zwei `export`-Wörter fassen den ausgelieferten Text also nicht
an, und das ist gemessen statt behauptet.**

**SIEBEN PFLICHT-MUTATIONEN, JEDE ROT UND JEDE GENAU WIE VORHERGESAGT.** Die Vorhersagen
standen VOR dem jeweiligen Lauf und sind gegen den dann aktuellen Bestand neu abgeleitet
worden (docs/immer-beachten.md, EINE MUTATIONS-VORHERSAGE WIRD VOR DEM LAUF GEGEN DEN
AKTUELLEN TESTBESTAND AKTUALISIERT). **M5 UND M7 SIND GETEILT GEFAHREN** — eine Mutation,
die zwei Achsen zugleich bewegt, sagt nicht, welche gedeckt ist:
- **M1** (Wiring-Token aus der Nadel-Liste) -> P1 + P5. **P2 und P3 blieben GRÜN**, weil ein
  ECHTES Dokument die übrigen acht Merkmale mitführt. **Das ist selbst der Befund:** Das
  Wiring-Merkmal ist allein von einer synthetischen Fixture gedeckt und in keinem realen
  Dokument isolierbar; der Satz steht im Kommentar an P1.
- **M2** (Server-Riegel prüft nur A) -> R2 + R2b.
- **M3** (Entfernen ohne die Leerraum-Regel) -> **nur S2**, ein Einzelstück; benannt im
  Kommentar an S2.
- **M4** (`rest` ungeprüft leer) -> S5 + U8. **S4 blieb grün**, weil `rest` im Normalfall
  ohnehin leer ist.
- **M5a/M5b** (Download- bzw. Kopier-Riegel weg) -> nur U5 bzw. nur U6.
- **M6** (zurück auf `getElementById`) -> **nur S9**, ein Einzelstück.
- **M7a/M7b** (Export- bzw. Rest-Meldung wieder am gespeicherten Zustand) -> nur U9 bzw.
  nur U10.
**KEINE Mutation blieb grün, KEINE traf mehr als vorhergesagt, KEIN Bestandstest fiel.**

**ZWEI FEHLER FIELEN ERST IM REVIEW AUF, und sie gehören hierher, weil der Bau sie beide
für fertig hielt:**
- **K1 — `collectOwnNodes` holte je Kennung nur das ERSTE Element** (`getElementById`). Ein
  Quelltext, der einen Block DOPPELT trägt — der Re-Import eines Re-Imports —, behielt das
  zweite. Die Nachbedingung meldete es zwar, aber als Handarbeit, obwohl der Knopf es hätte
  entfernen können. **Ein Ausweg, der den Betreiber zur Handarbeit schickt, ist kein
  Ausweg.** Korrigiert über einen Durchlauf über `[id]` gegen die Konstanten; Wächter ist
  S9, die Mutation M6 macht ihn wieder rot.
- **K2 — DIE ZWEI MELDUNGEN VERALTETEN, UND DAS IST GEMESSEN:** Export-Meldung und
  Rest-Meldung lagen als fertige Sätze im State und überlebten jedes Entfernen VON HAND.
  **U9 und U10 waren vor der Korrektur ROT** — der Befund steht damit nicht als Ableitung
  da. Am Code war die Ursache je Symbol ablesbar: `ownBlocksInActive` war abgeleitet, die
  zwei anderen waren States, gesetzt allein in den Handlern und geleert allein in
  `applyZenForLoadedCode`; **kein Pfad hing an einer Textänderung.** Die bindende Folge
  steht als ENTSCHEIDUNG P11.11-24.

**DER LIVE-NACHWEIS (OWNER-ANGABEN, 2026-09-21, Chrome, Vercel-Status "Ready") — von CC
nicht prüfbar:**
- **REGRESSION BESTANDEN.** Sauberes Projekt: keine Warnung, Export und Kopieren laufen, und
  die Anfragen tragen nur den eigenen `trackingKey`.
- **DER ALTFALL, Projekt B mit re-importiertem Export:** Die Warnung ist sichtbar **bei
  eingeklapptem Code-Block** — damit ist die Platzierung aus Entscheidung P11.11-22, Punkt
  (b), an der Wirkung belegt und nicht nur am Argument. Veröffentlichen ist gesperrt und
  nennt den Grund; Export und Kopieren werden mit der Export-Meldung verweigert. **Nach
  "Pagesmith-Bausteine entfernen" sind alle drei Sperren weg.**
- **NACH SPEICHERN UND VERÖFFENTLICHEN:** im ausgelieferten Text `pagesmith-mappings` **1**,
  `pagesmith-consent` **1**, `__ps_pve` **1**. Ein Klick erzeugt **ZWEI** Anfragen, beide mit
  `trackingKey a3a76b35-36ce-4662-83bd-06c50f2e19ad` (**Projekt B**) und beide mit
  `eventID b232145b-853f-4c9a-81ca-09a25f3ff1eb`; die zweite trägt `obs "__ps_browser"`.
  **Der Schlüssel von Projekt A (`454ef50a-…`) kommt nicht mehr vor.**

**WAS DAMIT GEMESSEN IST, WAS VERMERK P11.11-16 NOCH ALS ABLEITUNG FÜHRTE:** Jener Vermerk
deutete das Paar mit gleicher `eventID` als Conversion plus Adblocker-Bestätigung und
kennzeichnete den Satz ausdrücklich als ARCHITEKT-ABLEITUNG. **Er ist jetzt belegt, und
zwar am Kennzeichen:** Die zweite Anfrage trägt `obs "__ps_browser"`. **VERMERK P11.11-16
WIRD NICHT UMGESCHRIEBEN** — er ist als Aussage seiner Runde richtig, und dieser Satz tritt
DANEBEN.

**BEOBACHTET, NICHT KAUSAL BELEGT:** Vor dem Entfernen fehlte die Bestätigung für Projekt B,
danach ist sie da. Das passt zur Deutung über den `foreign`-Zweig in `__psMetaInit` (Vermerk
P11.11-16) — **belegt ist der Zusammenhang damit nicht**, nur die Beobachtung.

**DIE GRENZEN DIESES NACHWEISES — sie stehen im Wortlaut, weil sie beim nächsten Lesen
sonst zur Vollständigkeit werden:**
- **NUR CHROME.** Die übrigen Browser sind UNGEMESSEN. Der Editor läuft im Browser des
  Betreibers.
- **BAUSTEINE IN VARIANTE B UND DAS ENTFERNEN VON HAND SIND NUR DURCH TESTS GEDECKT, NICHT
  LIVE** — R2, R2b und U4c für die Variante, U9 und U10 für die Handarbeit.
- **DIE HISTORIE DER ÜBRIGEN KENNUNGEN IST NICHT ERHOBEN** (Entscheidung P11.11-22, Punkt
  (f)). Erhoben ist allein die Mapping-Kennung.

**WAS BEWUSST NICHT NACHGEHOLT WIRD, mit Grund:** der Live-Nachweis für Variante B und für
das Entfernen von Hand. **Beides ist durch Tests gedeckt, und an einem Live-Wert dazu hängt
keine spätere Handlung** — es gäbe nichts, was eine Zahl von dort entscheiden würde. Ein
Nachweis ohne Konsequenz ist Arbeit, kein Beleg.

**EIN WERKZEUG-FEHLER IM LAUF, protokolliert statt verschwiegen:** An
`src/components/PublishView.tsx` ist versehentlich `perl -i` angesetzt worden — ein
Ganz-Datei-Schreiber, den die Werkzeug-Regel verbietet. **`git diff` war dafür BLIND** (kein
Inhalts-Diff); sichtbar wurde es allein an `git ls-files --eol` (`w/lf` -> `w/crlf`). Die
Datei ist aus der Versionsverwaltung wiederhergestellt (sha256 identisch zum HEAD-Objekt,
CR 0) und die Änderung danach mit dem Editier-Werkzeug neu eingetragen; **im Commit ist
davon nichts gelandet.**

**PROVENIENZ:** Bau-Commit, Dateiumfang, Testzahlen, Gates, Byte-Wächter und die sieben
Mutationsergebnisse GEMESSEN am eigenen Lauf (CC, 2026-09-21); der K2-Befund ebenso (U9/U10
vor der Korrektur rot). Der Live-Nachweis und der Browser sind OWNER-ANGABEN vom 2026-09-21.

### VERMERK P11.11-25 — CRAWL 2: DIE FÜNF BROWSER-TAGS UND DREI WEITERE CMPs (2026-09-21)

**KEIN BAU-COMMIT — GRUND: CRAWL.** Die Runde hat fremde Dokumentation gelesen und keine
Zeile Code erzeugt. Sie hat GENAU ZWEI Dateien geändert, beide Doku:
docs/ziel-befunde.md und diese hier.

**DER VORRANG IST EINGEHALTEN UND DAS IST DER WICHTIGSTE SATZ DIESES VERMERKS: DIE FÜNF
BROWSER-TAGS SIND SAUBER ZU ENDE GELESEN**, bevor ein CMP angefasst wurde. Von den
NACHGEORDNETEN drei sind ZWEI zu Ende gelesen (CookieYes, consentmanager) und einer bleibt
unvollständig (OneTrust).

**WO DIE ZIEL-BEFUNDE STEHEN — JE ZIEL EIN ZEIGER, der Volltext steht dort und wird hier
NICHT verdoppelt** (so Entscheidung P11.11-15, Ablage). Alle fünf in docs/ziel-befunde.md,
je ein NEUER Teil im bestehenden Abschnitt des Ziels, Überschrift jeweils
"Browser-Tag-Lesung 2026-09-21 (Crawl 2 der Phase 11.11)":
- **meta** → Abschnitt "Meta (Conversions API)", Teil **(g)**.
- **pinterest** → Abschnitt "Pinterest (Conversions API)", Teil **(ab)**.
- **tiktok** → Abschnitt "TikTok (Events API 2.0)", Teil **(i)**.
- **linkedin** → Abschnitt "LinkedIn (Conversions API)", Teil **(am)**.
- **google** → Abschnitt "Google (Google Ads Conversions · GA4)", Teile **(cs)** und
  **(ct)**.

**GOOGLE HAT ZWEI BUCHSTABEN BEKOMMEN UND NICHT EINEN, UND DAS IST EIN BEFUND UND KEINE
ABLAGE-LAUNE:** Der Anbieter liefert für dasselbe Ziel ZWEI Browser-Bausteine mit
verschiedenen Pfaden, verschiedenen charakteristischen Aufrufen und verschiedenem
Rückfall-Element — Google-Tag (`/gtag/js`, kein Rückfall gefunden) gegen Tag Manager
(`/gtm.js`, Rückfall als `<iframe>`). **Der HOST ist bei beiden derselbe
(`www.googletagmanager.com`); eine Signatur allein auf den Host könnte sie nicht
unterscheiden.**

**DREI BEFUNDE ÜBER DIE FÜNF ZIELE, DIE DEN ZUSCHNITT DER SCHEIBE 11.11b BERÜHREN und
deshalb hier stehen statt nur in der Befund-Datei:**
- **ZWEI ZIELE HABEN IM GELESENEN UMFANG KEINEN `noscript`-RÜCKFALL** — der Google-Tag
  (gtag) und TikTok, beide als Nicht-Treffer mit benannter Achse. **KEINE ENTWARNUNG:** Die
  Reichweite ist je zwei gelesene Seiten. Satz 6 der ENTSCHEIDUNG P11.11-12 ("Rückfall-
  Elemente zählen zum Anbieter, erkannt über ihre ADRESSE") bleibt davon unberührt — er
  wird nur bei diesen beiden Zielen nichts zu tun haben.
- **DER RÜCKFALL IST NICHT IMMER EIN `<img>`.** Der Tag Manager benutzt ein `<iframe>` auf
  `…/ns.html?id=GTM-…`. Wer den Rückfall nur als Bild-Element sucht, übersieht ihn.
- **BEI META UND PINTEREST IST DAS BILD-TAG EIN EIGENER, VOM ANBIETER DOKUMENTIERTER
  EINBAUWEG OHNE JEDES `<script>`.** Pinterest sagt es wörtlich ("if you choose you can
  include only the image tag event code without JavaScript. In this case you do not need
  the base code"), Meta ebenso ("Das Pixel mit einem IMG-Tag installieren"). **FOLGE FÜR
  11.11b: Eine Seite kann ein Ziel tragen, ohne ein einziges Script dafür zu haben** — eine
  Erkennung allein über `<script>`-Knoten sähe sie nicht. **DAS IST HIER NUR FESTGESTELLT;
  ob 11.11b `<img>`-Knoten überhaupt untersucht, ist NICHT entschieden.**

**DIE CMP-BEFUNDE — HIER IM VOLLTEXT, weil Entscheidung P11.11-15 sie in die Vermerke
dieser Datei legt.** Alles GELESEN an der jeweils genannten Quelle am 2026-09-21, sofern
nicht ausdrücklich anders gekennzeichnet; **nichts davon ist gemessen**, mit der einen
benannten Ausnahme bei OneTrust.

**CookieYes — (a) bis (e):**
- **(a)** **KEINE VOLLSTÄNDIGE ADRESSE IN DER DOKU.** Zwei Bruchstücke, aus zwei Seiten:
  der HOST aus der CSP-Seite (`*.cookieyes.com` und `cdn.cookieyes.com` im FLIESSTEXT,
  `cdn-cookieyes.com` in der Direktiven-TABELLE und im Beispiel-`<meta>`) und das
  PFAD-MUSTER `client_data/(.*)/script.js` aus der WP-Rocket-Seite (FLIESSTEXT, als
  Ausschluss-Eintrag). **DIE DOKU WIDERSPRICHT SICH BEIM HOST** — einmal mit PUNKT
  (`cdn.cookieyes.com`), einmal mit BINDESTRICH (`cdn-cookieyes.com`), auf derselben Seite.
  **DAS IST NICHT AUFGELÖST.** Die beiden Bruchstücke zu einer URL zusammenzusetzen wäre
  eine FOLGERUNG und ist hier ausdrücklich NICHT getan.
- **(b)** `getCkyConsent()` bzw. `window.getCkyConsent` (FLIESSTEXT und Beispiel), mit dem
  Rückgabeobjekt `{activeLaw, categories{necessary,functional,analytics,performance,
  advertisement}, isUserActionCompleted, consentID, languageCode}`. Ereignisse am
  `document`: `cookieyes_banner_load` und `cookieyes_consent_update` (Beispiel),
  `cookieyes_banner_loaded` (FLIESSTEXT). Dazu zwei Zeichenfolgen aus der WP-Rocket-Seite:
  `cookie-law-info` und `_ckyGcm`.
- **(c)** **nicht gefunden**; Reichweite: die sechs gelesenen Seiten.
- **(d)** **DIE ABWEICHUNG VON ALLEN ANDEREN GELESENEN CMPs, UND SIE IST DER TRAGENDE
  BEFUND ZU DIESEM ANBIETER:** Geparkt wird über das ATTRIBUT
  `data-cookieyes="cookieyes-analytics"` (bzw. `-performance`, `-functional`) — **EIN
  `type="text/plain"` WIRD NICHT GENANNT, UND DIE ADRESSE BLEIBT IN `src`.** Das Beispiel
  der Doku zeigt ein unverändertes `<script async data-cookieyes="cookieyes-analytics"
  src="https://www.googletagmanager.com/gtag/js?id=…">`. FLIESSTEXT, Beispiel bestätigt.
  Daneben ein Weg ohne jede Codeänderung ("Script URL Pattern" im Dashboard) und ein
  ereignisgesteuerter Weg über die zwei Ereignisse aus (b). Die Kategorien heissen
  ausweislich des Fliesstextes `functional`, `performance`, `analytics`, `advertisement`.
  `__tcfapi` **nicht gefunden**, obwohl die TCF-Seite im Umfang liegt und CookieYes sich
  dort als IAB-zertifizierte CMP bezeichnet; Reichweite: die sechs gelesenen Seiten.
- **(e)** Script-Tag im `<head>`; **der Code selbst steht NICHT in der Doku**, sondern ist
  aus dem Dashboard zu holen ("Advanced Settings"). Daneben CMS- und Shop-Wege (WordPress,
  Shopify, Wix, Squarespace, …) und Google Tag Manager.
- **QUELLE:** www.cookieyes.com/documentation/cookie-banner-on-an-html-website/ ·
  /documentation/add-cookie-banner-to-website/ · /documentation/implement-prior-consent-
  using-cookieyes/ · /documentation/content-security-policy/ · /documentation/exclude-
  cookieyes-script-from-wp-rocket-plugin/ · /documentation/retrieving-consent-data-using-
  api-getckyconsent/ · /documentation/iab-tcf-v2-2-compliance-with-cookieyes/, alle
  2026-09-21.

**consentmanager — (a) bis (e):**
- **(a)** ZWEI Hosts mit je eigenem Pfad, beide aus dem abgedruckten Stub-Code:
  `https://delivery.consentmanager.net/delivery/cmp.php?id=<cmp_id>&h=<href>&<cmp_params>
  &l=<lang>&o=<zeitstempel>` und
  `https://cdn.consentmanager.net/delivery/cmp_<lang>.min.js`. Die Hosts stehen als
  `window.cmp_host` und `window.cmp_cdn` im Code und sind damit **im Quelltext einer
  Kundenseite änderbar** — der Anbieter bietet ausdrücklich White-Label-Adressen an.
  **NUR IM BEISPIEL.**
- **(b)** Sehr viele, und sie sind alle im Stub sichtbar: `window.cmp_id` ·
  `window.cmp_params` · `window.cmp_host` · `window.cmp_cdn` · `window.gdprAppliesGlobally`
  · `cmp_getlang` · `window.cmp_setlang` · `window.cmp_addFrame` · `window.cmp_rc` ·
  `window.cmp_stub` · `window.cmp_msghandler` · `window.cmp_setStub`. Dazu die drei
  Stub-Namen `__cmp`, `__tcfapi`, `__uspapi` und die drei unsichtbaren Rahmen
  `__cmpLocator`, `__uspapiLocator`, `__tcfapiLocator`. Die eigenen Scripte tragen
  `data-cmp-ab="1"`. **NUR IM BEISPIEL.**
- **(c)** **nicht gefunden**; Reichweite: die fünf gelesenen Seiten.
- **(d)** `type="text/plain"` **UND** `class="cmplazyload"` **UND** `data-cmp-src="…"` —
  **die Adresse WANDERT aus `src` heraus**, wie bei Klaro und anders als bei Cookiebot und
  Usercentrics. Kategorie/Zweck über `data-cmp-vendor="<id>"` und/oder
  `data-cmp-purpose="<id>"`, beide kommagetrennt und beide mit dem Sonderwert `*`. Bei
  einem `<iframe>` kommt `src="about:blank"` hinzu; bei `<link>` heisst das Attribut
  `data-cmp-href`. Ausdrücklich ebenso anwendbar auf `picture`, `video`, `source`,
  `object`, `embed`. Dazu ein ganzer Satz weiterer Attribute (`data-cmp-hide`,
  `data-cmp-preview…`, `data-cmp-ab`, `data-cmp-block`). FLIESSTEXT, Beispiele bestätigen.
  **`__tcfapi` WIRD BEREITGESTELLT — ALS EINZIGES DER VIER BISHER GELESENEN CMPs
  BELEGT:** `window.cmp_setStub("__tcfapi")` steht im Stub, mit dem Kommentar "remove this
  line to remove IAB TCF v2 support".
- **(e)** Script-Tag direkt in der Seite — beim MANUELLEN Blockieren "directly after the
  `<body>` element", beim AUTOMATISCHEN "directly after the `<head>` element" und dann
  zwingend als erster Code der Seite. Daneben Tag Manager (Google, Tealium, Adobe), rund
  zwanzig CMS- und Shop-Wege und ein App-SDK.
  **EINE GRENZE, DIE MITMUSS:** Auf der Seite "Standard Integration" ist der eigentliche
  CMP-Code **als BILD eingebunden** und über `textContent` nicht lesbar. Der oben zitierte
  Code stammt deshalb von der Entwickler-Seite "Adjusting the stub code" — er ist dort
  ausdrücklich eine UMFORMULIERTE Fassung ("you can reformat your stub code as follows"),
  und **ob der aus dem Dashboard ausgegebene Code zeichengleich dieselbe Gestalt hat, ist
  NICHT erhoben.**
- **QUELLE:** www.consentmanager.net/en/help/getting-started/6-integrating-the-code/ ·
  /help/integration/standard-integration/ · /en/help/getting-started/7-blocking-third-
  party-codes-and-cookies/ · /help/integration/how-to-block-third-party-codes-cookies-if-
  no-consent-is-given/ · /en/help/developer-reference/adjusting-the-stub-code/, alle
  2026-09-21.

**OneTrust — DIE IN VERMERK P11.11-13 OFFENEN PUNKTE BLEIBEN IN DER DOKU OFFEN, UND EIN
ANDERER WEG HAT (a) UND (b) TROTZDEM GELIEFERT.**
- **DER DOKU-WEG IST ZU ENDE GEGANGEN UND HAT NICHTS ERGEBEN.** Drei weitere Seiten des
  öffentlichen Entwicklerportals gelesen (s. Umfang) — sie sind REST-API-zentriert wie
  schon in Crawl 1; die "Environment URLs" führen ausschliesslich Anwendungs- und
  API-Hosts (`app*.onetrust.com`, `privacyportal*.onetrust.com`), **keinen Auslieferungs-
  Host für ein Browser-Tag.** Der einzige Verweis, der den Einbau verspricht ("Quick Start
  Guide: Website Scripts"), zeigt auf `my.onetrust.com` und **endet an einer
  ANMELDESCHRANKE**. Dort ist abgebrochen worden; **es ist KEINE Anmeldung versucht und
  KEINE Zustimmung erteilt worden.**
- **WAS STATTDESSEN TRÄGT — UND ES IST KEINE DOKU-LESUNG, SONDERN EINE MESSUNG AN EINER
  AUSGELIEFERTEN SEITE (GEMESSEN am DOM von developer.onetrust.com, CC, 2026-09-21):** Die
  Doku-Seite des Anbieters setzt seine eigene CMP ein. Im Dokument stehen
  `<script src="https://cdn.cookielaw.org/consent/<domain-script-id>/otSDKStub.js"
  type="text/javascript" charset="UTF-8" data-domain-script="<dieselbe id>">` und,
  nachgeladen, `https://cdn.cookielaw.org/scripttemplates/202602.1.0/otBannerSdk.js`. Zur
  Laufzeit vorhanden: `OneTrust` (Objekt), `OneTrustStub` (Objekt), `OptanonWrapper`
  (Funktion), `OptanonActiveGroups` (Zeichenkette) und das DOM-Element mit der Kennung
  `onetrust-consent-sdk`.
  **DREI GRENZEN, OHNE DIE DIESER ABSATZ MEHR BEHAUPTET ALS ER TRÄGT:** (1) Das ist EINE
  Installation und keine Aussage des Anbieters darüber, was er ausliefert — eine andere
  Kundenseite kann anders aussehen. (2) Der Wert von `data-domain-script` ist die Kennung
  JENER Seite und keine Signatur. (3) Der Pfadbestandteil `202602.1.0` ist eine
  VERSIONSANGABE und altert; tauglich als Signatur ist der Host `cdn.cookielaw.org`, nicht
  der volle Pfad.
- **(c) UND (d) BLEIBEN NICHT GEFUNDEN**, auch nach der Messung: Auf jener Seite gibt es
  NULL `<noscript>`-Elemente, NULL `<script type="text/plain">` und NULL Elemente mit einer
  `optanon-category`-Klasse (GEMESSEN, CC, 2026-09-21). **DAS IST KEINE AUSSAGE DARÜBER,
  WIE ONETRUST FREMDE SCRIPTE PARKT** — die gemessene Seite parkt schlicht keine.
- **`__tcfapi` IST AUF JENER SEITE `undefined`** (GEMESSEN). **DAS SAGT NICHTS ÜBER
  OneTrust**, sondern über die Konfiguration dieser einen Installation.
- **(e)** aus derselben Messung ABLEITBAR (Script-Tag im Dokument), **aus der Doku
  weiterhin nicht belegt.**
- **QUELLE (Doku):** developer.onetrust.com/onetrust/reference/automating-cmp-operations-
  using-onetrust-apis · /onetrust/docs/onetrust-sdk-reference ·
  /onetrust/reference/url-variables-for-apis-sdks, alle 2026-09-21. **QUELLE (Messung):**
  das ausgelieferte Dokument von developer.onetrust.com, 2026-09-21.

**DER GELESENE UMFANG DER CMP-HÄLFTE (2026-09-21):** CookieYes SIEBEN Seiten (zwei
Kategorie-Übersichten und die fünf oben zitierten Artikel) · consentmanager SIEBEN Seiten
(die Startseite der Hilfe, die Übersichten "Integration" und "Getting started" sowie die
fünf oben zitierten Artikel) · OneTrust DREI Seiten plus EINE abgebrochene an der
Anmeldeschranke.

**GESEHEN, NICHT GEÖFFNET — UND ZWAR AUS BUDGETGRÜNDEN, NICHT AUS EINEM SACHLICHEN
AUSSCHLUSS.** Der Satz steht so, weil die Dauerregel DIE LISTE "GESEHEN, NICHT GEÖFFNET"
IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT genau den begründeten Ausschluss als
Fehlerquelle führt:
· **CookieYes:** `/documentation/how-to-prevent-fetch-and-xmlhttprequest-overrides-in-
  cookieyes/` (der naheliegendste Ort für eine Aussage darüber, was der Lader zur Laufzeit
  am Dokument ändert), `/documentation/events-on-cookie-banner-load/`,
  `/documentation/events-on-cookie-banner-interactions/`, `/documentation/custom-data-
  layer/`, `/documentation/subdomain-consent-sharing/`, die GCM- und
  GTM-Integrationsseiten, `/developer-use-cases/`.
· **consentmanager:** `/help/developer-reference/javascript-api/`, `/cmp-events/`,
  `/checking-consent-for-a-vendor/`, `/general-api/`, `/automatic-blocking-of-codes-and-
  cookies/`, `/custom-html-code/` sowie `/help/integration/using-a-synchronous-cmp-code/`
  und `/using-the-cmp-with-amp-websites/`. **Die synchrone und die AMP-Fassung sind die
  naheliegendsten Orte für eine ZWEITE Gestalt des Einbau-Codes; die JavaScript-API für
  weitere globale Namen.**
· **OneTrust:** der gesamte SDK-Referenzbaum für Mobile, OTT/CTV und Web-Formulare —
  sachlich: andere Plattformen; `/onetrust/docs/cmp-global-opt-out` und
  `/onetrust/reference/creating-a-new-cookie-runner-script` — BUDGET-AUSSCHLUSS.

**WAS NACH CRAWL 2 OFFEN BLEIBT — die Rest-Liste der Entscheidung P11.11-11, ehrlich:**
- **KEIN Fan-Out-Ziel bleibt offen.** Alle fünf sind zu Ende gelesen.
- **Klaro** ist seit Crawl 1 belegt (VERMERK P11.11-13), **Cookiebot** und
  **Usercentrics** ebenso — **DIESE DREI WERDEN HIER NICHT WIEDERHOLT**, ihre Befunde
  stehen unverändert dort.
- **OneTrust bleibt der einzige unvollständige Anbieter:** (c) und (d) sind nicht
  gefunden, (a), (b) und (e) ruhen auf einer MESSUNG an einer einzelnen Installation statt
  auf der Doku. **Nach Entscheidung P11.11-15 heisst das: OneTrust bekommt im ersten Wurf
  KEINE Signatur, ODER eine, die ausdrücklich auf dieser Messung ruht — das entscheidet
  der Plan 11.11b und NICHT dieser Vermerk.**

**DIE TABELLE — ANBIETER × (a) BIS (e).** Vier Werte: **belegt** (im Fliesstext) · **nur im
Beispiel** · **nicht gefunden** (mit Reichweite am jeweiligen Befund) · **nicht gefahren**
(war nicht Gegenstand). **(d) UND (e) SIND BEI DEN FÜNF ZIELEN "NICHT GEFAHREN" UND NICHT
"NICHT GEFUNDEN"** — der Auftrag hat sie ausdrücklich nur für CMPs erhoben; wer die Spalten
gleichsetzt, liest eine nicht gestellte Frage als unbeantwortet.

| Anbieter | (a) Adresse | (b) Namen/Aufrufe | (c) noscript | (d) Parken | (e) Einbauweg |
|---|---|---|---|---|---|
| meta | nur im Beispiel | belegt (`fbq`, `fbq('track','PageView')`); Rest nur im Beispiel | nur im Beispiel; die zweite Gestalt belegt | nicht gefahren | nicht gefahren |
| pinterest | nur im Beispiel | nur im Beispiel | nur im Beispiel; die Auflage "in zwei Stellen" belegt | nicht gefahren | nicht gefahren |
| tiktok | nur im Beispiel | belegt (`ttq.load`, `ttq.page`, `ttq.track`); Rest nur im Beispiel | nicht gefunden | nicht gefahren | nicht gefahren |
| linkedin | nur im Beispiel | belegt (`_linkedin_event_id`, `lintrk`); Rest nur im Beispiel | nur im Beispiel; das Bild-Pixel als eigener Weg belegt | nicht gefahren | nicht gefahren |
| google · gtag | nur im Beispiel (Host daneben belegt) | belegt (die fünf Befehle, `send_to`) | nicht gefunden | nicht gefahren | nicht gefahren |
| google · Tag Manager | nur im Beispiel | nur im Beispiel | nur im Beispiel | nicht gefahren | nicht gefahren |
| CookieYes | belegt, aber UNVOLLSTÄNDIG (Host und Pfadmuster getrennt, Host widersprüchlich) | belegt | nicht gefunden | belegt | belegt |
| consentmanager | nur im Beispiel | nur im Beispiel | nicht gefunden | belegt | belegt |
| OneTrust | nicht gefunden in der Doku; GEMESSEN an einer Installation | Doku: belegt (Crawl 1); Messung ergänzt vier Namen | nicht gefunden | nicht gefunden | Doku: nicht gefunden; aus der Messung ableitbar |

**Cookiebot, Usercentrics und Klaro stehen NICHT in dieser Tabelle** — ihre Zeilen stünden
sonst zweimal da und liefen mit VERMERK P11.11-13 auseinander.

**PROVENIENZ:** Alle Anbieter-Angaben GELESEN an der jeweils genannten Quelle (CC,
2026-09-21), durchgehend über `textContent` und über das Hauptelement bzw. den
Artikel-Rumpf. Die OneTrust-Angaben unter "WAS STATTDESSEN TRÄGT" sind GEMESSEN am DOM
einer ausgelieferten Seite (CC, 2026-09-21) und ausdrücklich keine Doku-Lesung. **KEIN
Aufruf gegen eine Schnittstelle, keine Anmeldung, keine Eingabe, kein Download.** **KEIN
Bau-Commit.**

### VERMERK P11.11-33 — SCHEIBE 11.11b: ERKENNUNG UND ANZEIGE (2026-09-21)

**GEBAUT UND LIVE BESTÄTIGT. BAU-COMMIT `6d6ab42`** — ELF Dateien, 1 730 Einfügungen,
VIERZEHN Löschungen; fünf Dateien neu (`src/lib/foreign-signatures.ts`,
`src/lib/foreign-scan.ts` und die drei Testdateien `foreign-signatures.test.ts`,
`foreign-scan.test.ts`, `detect.foreign.test.ts`).

**WAS GEBAUT IST, in einem Satz je Schritt:** eine versionierte Signaturliste mit ZWÖLF
Einträgen für die elf Anbieter aus ENTSCHEIDUNG P11.11-11, jeder mit seinem Beleg im
Datensatz · eine reine Erkennung auf dem bereits zerlegten Dokument, unmittelbar nach dem
Parse und VOR `stabilizeDoc`, mit eigenem Fehlerfang · die Fundliste als Block (4) im
Bereich BAUEN, ausserhalb des einklappbaren Code-Blocks · der Kollisionshinweis am
Einwilligungs-Schalter in `PublishView.tsx`, dazu der Ersatz des überholten Satzes.

**DIE EINZIGE ÄNDERUNG AN EINER GESCHÜTZTEN DATEI IST EIN WORT** — `export` an
`collectOwnNodes` (`src/lib/own-blocks-strip.ts`), `git diff --numstat` `1 1`, Freigabe
ENTSCHEIDUNG P11.11-32, Punkt (a). **DIE SHA256 DER NEUN GESCHÜTZTEN DATEIEN SIND VORHER
GLEICH NACHHER** — `ingest.ts` · `resolve.ts` · `proxy.ts` · `app-serve/route.ts` ·
`generate.ts` · `pageview-emitter.ts` · `actions.ts` · `own-blocks.ts`, und
`own-blocks-strip.ts` mit genau jener einen Zeile.

**TESTZAHL: 1 996 VORHER, 2 038 NACHHER**, 91 Dateien vorher, 94 nachher, alle grün.
Differenz **+42** — 6 in `foreign-signatures.test.ts`, 21 in `foreign-scan.test.ts`, 2 im
neuen `detect.foreign.test.ts`, +2 in `detect.test.ts`, +11 in `CodeImporter.test.tsx`.

**DIE VIER GATES, alle grün** (CC, 2026-09-21): `tsc --noEmit` exit 0 · `eslint` 0 errors /
1 Warnung (dieselbe vorbestehende in `consent.test.ts`, ausserhalb dieser Scheibe) ·
`vitest run` 94 Dateien und 2 038 Tests · `next build` exit 0.

**DER BYTE-WÄCHTER W1–W4 IST GRÜN** und einzeln nachgefahren. Sein Sollwert ist der vor der
ersten Zeile Produktivcode der Scheibe 11.11d erhobene (ENTSCHEIDUNG P11.11-22, Punkt (g));
**diese Scheibe hat KEINEN zweiten angelegt** — ein zweiter Sollwert wäre die zweite
Wahrheit, die P11.11-18 verbietet.

**ELF PFLICHT-MUTATIONEN, JEDE ROT UND JEDE GENAU WIE VORHERGESAGT.** Die Vorhersagen
standen VOR dem jeweiligen Lauf und sind gegen den dann aktuellen Bestand neu abgeleitet
worden (docs/immer-beachten.md, EINE MUTATIONS-VORHERSAGE WIRD VOR DEM LAUF GEGEN DEN
AKTUELLEN TESTBESTAND AKTUALISIERT). **M3, M4 UND M5 SIND GETEILT GEFAHREN** — eine
Mutation, die zwei Achsen zugleich bewegt, sagt nicht, welche gedeckt ist:
- **M1** (eigen-Riegel weg) -> nur S1. **M2** (Parkform ignoriert) -> S2, S3, S4, S5 **und
  S15**, eine Klasse. **M3a/M3b** (`data-src` bzw. `data-cmp-src` nicht gelesen) -> S3 bzw.
  S4. **M4a/M4b** (`img` bzw. `iframe` nicht gelesen) -> S6 + S7 bzw. S7.
- **M5a** (Container als Pixel) -> F3, S9, SK4. **M6** (eigener `try/catch` weg) -> E-A +
  E-B. **M7** (unbekanntes Script leuchtet) -> SK5. **M9** (nur der erste Treffer zählt) ->
  S12. **M11** (zurück auf den ersten nicht-leeren Adress-Ort) -> S20 + S21.
- **M10 STEHT IN KEINEM AUFTRAG UND IST ERGÄNZT WORDEN** (Ausschnitt per
  `dangerouslySetInnerHTML`) -> SK11. Ohne ihn wäre SK11 eine Abwesenheits-Behauptung ohne
  Positivkontrolle.
- **M8 BEWEGT ZWEI ACHSEN UND IST AN DER GEBAUTEN GESTALT NICHT TEILBAR** — die Kollision
  hängt am selben `consentDialog`-Prop wie die Radiogruppe. Das ist VOR dem Lauf gesagt und
  in zwei Klassen vorhergesagt worden, die Zahl in (B) ausdrücklich offen: (A) SK7, (B) UI2
  und SK8. **SK8 fiel über seine Positivkontrolle**, gehört also in (B) und nicht in (A).
- **M5b IST NICHT FAHRBAR, UND ZWAR ALS FOLGE DER ENTSCHEIDUNG, NICHT ALS LÜCKE:** Ein
  Container mit Entfernen-Angebot lässt sich in 11.11b nicht mutieren, weil diese Scheibe
  gar keine Handlung anbietet (ENTSCHEIDUNG P11.11-31). Eine zu bauen, nur um sie zu
  mutieren, verstiesse gegen ebendiese Entscheidung. **WEITERGEREICHT AN 11.11c**, s. den
  Prüfstein 5 in Abschnitt 9.
**KEINE Mutation blieb grün, KEINE traf mehr als vorhergesagt, KEIN Bestandstest fiel** —
ausser den zwei geplanten `toEqual`-Erweiterungen in `detect.test.ts`, die das neue
Pflichtfeld `scan` aufnehmen.

**DIE REVIEW-KORREKTUR K1 — SIE IST DER WICHTIGSTE EINZELBEFUND DIESER SCHEIBE.** Die erste
Fassung von `adresseVon` nahm den **ERSTEN nicht-leeren** Wert aus `src`, `data-src`,
`data-cmp-src`. **consentmanager parkt ein `<iframe>`, indem es `src="about:blank"` setzt
und die echte Adresse nach `data-cmp-src` verschiebt** (VERMERK P11.11-25, consentmanager
(d)). Ein so geparkter Tag-Manager-Container hätte damit die Adresse `about:blank`
getragen, **KEINE Signatur getroffen und wäre GAR NICHT ERSCHIENEN** — unbekannte iframes
werden nach ENTSCHEIDUNG P11.11-29 bewusst nicht gelistet. **DAS WÄRE EIN STILLER
FEHLSCHLAG GEWESEN: kein Fund, kein Hinweis, nichts, woran es auffiele.** Gebaut ist
seither `adressenVon`: alle drei Orte werden gelesen, `about:blank` wird als Platzhalter
verworfen, und die Signatur-Treffer sind die VEREINIGUNG über alle Kandidaten; für die
Kennung eines UNBEKANNTEN Scripts gilt der erste. Wächter sind S20 und S21, die Mutation
M11 macht beide wieder rot. **DIE ZWEI LÄUFE HEISSEN S20 UND S21 UND NICHT S16/S17**, wie
der Auftrag sie nannte: jene Nummern waren in der Datei bereits vergeben, und zwei Läufe
desselben Namens wären ein Anker, der zwei Stellen trifft.

**DIE ZWEITE REVIEW-KORREKTUR K2 IST EINE KOMMENTAR-KORREKTUR:** Der Docblock an
`FOREIGN_LIST_HEADING` behauptete einen Platzhalter `{n}`, den die Zeichenkette nicht
trägt. Er sagt jetzt, WO die Zahl angehängt wird (Block (4) in `CodeImporter.tsx`) und dass
sie **FUNDE zählt, nicht FUNDSTELLEN** — ein bekannter Anbieter ist EIN Fund, auch mit drei
Fundstellen. Der Wortlaut der Überschrift ist unberührt.

**DER LIVE-NACHWEIS (OWNER-ANGABEN, 2026-09-21, Chrome, Vercel-Status "Ready") — von CC
nicht prüfbar:**
- **REGRESSION BESTANDEN.** Ein sauberes Projekt zeigt "Skripte und Tags im Code (0)" mit
  "Keine Skripte oder Tags gefunden."; Editor, Vorschau, Speichern und Export sind
  unverändert. Das bereinigte Projekt B zeigt keine Warnung und **keinen Fehlfund**.
- **EIGEN VOR FREMD, AN DER WIRKUNG BELEGT:** Beim Re-Import der Export-Datei von Projekt A
  — mit unserem Meta-Wiring darin — erscheint die Warnung aus 11.11d, und **die Fundliste
  zeigt (0), kein Meta.** Das ist der Live-Beleg für ENTSCHEIDUNG P11.11-26; ohne sie stünde
  unser eigener Baustein dort als fremdes Pixel.
- **DIE TESTSEITE: "Skripte und Tags im Code (6)"** — Meta (Fremdes Pixel, 2 Fundstellen) ·
  Google Tag Manager (Tag-Container, 2 Fundstellen, mit Nachlade-Hinweis) · Cookiebot
  (Einwilligungs-Werkzeug, 1 Fundstelle, mit CMP-Hinweis) · Pinterest (Fremdes Pixel,
  1 Fundstelle) · Google Tag Manager (Tag-Container, 1 Fundstelle, **"wartet auf
  Einwilligung"**) · ein Inline-Skript mit Ausschnitt. **`application/ld+json` ist NICHT
  gelistet, und es gibt KEINEN Entfernen-Knopf.** Die zwei Tag-Manager-Zeilen sind der
  Live-Beleg dafür, dass der Parkzustand die Gruppe teilt.
- **DIE KOLLISION:** Bei "Leiste" erscheint der Hinweis, bei "Aus" verschwindet er; **nach
  dem Löschen der Cookiebot-Zeile verschwindet er von selbst**, und die Überschrift zeigt
  (5). Der Ersatzsatz steht in PublishView.

**DER AUFBAU DER TESTSEITE, so weit die Funde ihn tragen** — er steht hier und nicht als
Zeiger auf einen Chat-Stand, weil ein Zeiger dorthin für niemanden auflösbar ist: ein
Meta-Pixel mit zwei Fundstellen, ein Google-Tag-Manager-Container mit zwei ungeparkten
Fundstellen, ein DRITTES Tag-Manager-Vorkommen in einer belegten Parkform, ein
Cookiebot-Script, ein Pinterest-Baustein, ein unbekanntes Inline-Skript und ein
`application/ld+json`-Datenblock. **WELCHER BAUSTEIN IM `head` UND WELCHER IM `body` STAND,
IST IN DER OWNER-MELDUNG NICHT ENTHALTEN UND WIRD HIER NICHT ERFUNDEN.** Für die ERKENNUNG
ist das folgenlos — sie geht über die Adresse und nicht über den Platz (ENTSCHEIDUNG
P11.11-12, Satz 6) —; **für eine WIEDERHOLUNG des Laufs fehlt die Angabe**, und für das
ENTFERNEN in 11.11c wäre sie der Unterschied (Prüfstein 3 in Abschnitt 9).

**DIE GRENZEN DIESES NACHWEISES — sie stehen im Wortlaut, weil sie beim nächsten Lesen
sonst zur Vollständigkeit werden:**
- **NUR CHROME.** Die übrigen Browser sind UNGEMESSEN. Der Editor läuft im Browser des
  Betreibers.
- **"ERKENNUNG FEHLGESCHLAGEN" IST LIVE NICHT HERSTELLBAR** und allein im Test gedeckt
  (E-A, E-B in `detect.foreign.test.ts`, Mutation M6). Der Ausgang `failed` verlangt einen
  Wurf der Erkennung, und den gibt es im gebauten Code nicht.
- **DASS DER ALTE PUBLISHVIEW-SATZ FEHLT, IST DURCH DEN TEST GEDECKT (SK9), LIVE ABER NICHT
  EIGENS BESTÄTIGT.** Bestätigt ist live nur, dass der ERSATZSATZ dasteht.
- **DIE KOLLISION LIEST NUR DIE AKTIVE VARIANTE.** Ein CMP allein in Variante B löst KEINEN
  Hinweis aus. S. VORRAT P11.11-7.
- **DIE HISTORIE DER SIGNATUREN IST NICHT ERHOBEN:** Ob ein Anbieter seine Adresse je
  geändert hat, ist an keiner Stelle gemessen. Eine Signatur altert still.

**PROVENIENZ:** Bau-Commit, Dateiumfang, Testzahlen, Gates, Byte-Wächter, die sha256 der
neun geschützten Dateien und die elf Mutationsergebnisse GEMESSEN am eigenen Lauf (CC,
2026-09-21); der K1-Befund ebenso (S20 und S21 fallen unter M11). Der Live-Nachweis, der
Browser und der Vercel-Status sind OWNER-ANGABEN vom 2026-09-21.

### VERMERK P11.11-39 — SCHEIBE 11.11c: FREMDE PIXEL AUF KLICK ENTFERNEN (2026-09-21)

**GEBAUT UND LIVE BESTÄTIGT. BAU-COMMIT `bcd3c5a`** — ACHT Dateien, 2 243 Einfügungen,
106 Löschungen; vier Dateien neu (`src/lib/foreign-strip.ts`, `foreign-strip.test.ts`,
`foreign-strip-wurf.test.ts` und die Fixture
`src/lib/__fixtures__/foreign-tags-testseite.html`).

**WAS GEBAUT IST, in einem Satz je Schritt:** der Durchlauf von `foreign-scan.ts` ist
GEHALBIERT — `collectForeignHits` liest, `scanForeignTags` verdichtet, `stripForeignGroup`
entfernt, und alle drei sehen DIESELBEN Knoten (ENTSCHEIDUNG P11.11-35, Satz (c)) · der
Fund trägt drei neue Felder (`schluessel`, `traeger`, `entfernbar`), der Gruppenschlüssel
eine dritte Achse · je entfernbarem Fund ein Knopf in der Fundliste, dazu der
Google-Hinweis, der Handarbeits-Hinweis und die Rest-Meldung.

**DIE ZEHN GESCHÜTZTEN DATEIEN UND `detect.ts` SIND VORHER GLEICH NACHHER** (sha256, nach
JEDER Mutations-Rücknahme einzeln geprüft, nicht nur am Ende): `ingest.ts f93bd615…` ·
`resolve.ts 061552cc…` · `proxy.ts 8a4bca17…` · `app-serve/route.ts 2e02abb9…` ·
`generate.ts 7e5c26f1…` · `pageview-emitter.ts b26cb778…` · `actions.ts 87741fa8…` ·
`own-blocks.ts e92898ca…` · `own-blocks-strip.ts 7b0bbb3c…` · `foreign-signatures.ts
b9b9651d…` · `detect.ts 1ae5855d…`. **DIESE SCHEIBE HAT KEINE EINZIGE HEBUNG GEBRAUCHT** —
anders als 11.11d (zwei Wörter) und 11.11b (ein Wort).

**TESTZAHL: 2 038 VORHER, 2 086 NACHHER**, 94 Dateien vorher, 96 nachher, alle grün.

**DIE VIER GATES, alle grün** (CC, 2026-09-21): `tsc --noEmit` exit 0 · `eslint` 0 errors /
1 Warnung (dieselbe vorbestehende in `consent.test.ts`, ausserhalb dieser Scheibe) ·
`vitest run` 96 Dateien und 2 086 Tests · `next build` exit 0. **DER BYTE-WÄCHTER W1–W4 IST
GRÜN** gegen den Sollwert aus ENTSCHEIDUNG P11.11-22, Punkt (g); **ein zweiter Sollwert ist
NICHT angelegt worden.**

**ELF PFLICHT-MUTATIONEN IN DER LETZTEN RUNDE, JEDE ROT.** Die Vorhersagen standen VOR dem
jeweiligen Lauf und sind gegen den dann aktuellen Bestand NEU abgeleitet worden
(docs/immer-beachten.md, EINE MUTATIONS-VORHERSAGE WIRD VOR DEM LAUF GEGEN DEN AKTUELLEN
TESTBESTAND AKTUALISIERT):
- **M9** (Rumpf-Adresse zählt nicht für die Erkennung) -> 7, exakt vorhergesagt.
- **M1** (eigen-Riegel fällt) -> S1 + F8. **DER KRITISCHE LAUF DIESER SCHEIBE:** Unser
  Wiring trägt `connect.facebook.net` im Rumpf und würde ohne den Vorrang aus
  ENTSCHEIDUNG P11.11-26 zum fremden Meta-Pixel MIT Knopf.
- **M8** (Träger immer "knoten") -> 12 statt 11, der Zusatztreffer in derselben Klasse.
- **M2** (`entfernbar` ignoriert die Klassen) -> 5, exakt vorhergesagt.
- **M3b** (Strip bildet seinen Schlüssel selbst) -> nur F20.
- **M4** (Riegel gegen Nicht-Knoten fällt) -> 3, exakt vorhergesagt.
- **M5a** (Bild ohne `<noscript>` übersprungen) -> 7 statt 8; F23 fiel nicht, sein Bild
  sitzt in einer body-`<noscript>` und gehört der anderen Achse.
- **M5b** (Bild mit `<noscript>` übersprungen) -> 3 statt 1.
- **M6** und **M6b** (Hinweis-Zuordnung geleert bzw. Schlüssel umbenannt) -> je 2.
- **M7** (Rest-Meldung ohne Anker) -> nur SK19.
**KEINE Mutation blieb grün. KEIN Bestandstest fiel ohne Mutation.**

**ZWEI BEFUNDE AUS DEN MUTATIONEN, DIE KEINE CODE-FEHLER WAREN, SONDERN TEST-BEFUNDE — und
sie gehören hierher, weil beide eine Zusicherung betrafen, die AUS DEM FALSCHEN GRUND grün
war:**
- **F7 UND DIE FÜNFTE ZEILE VON S24 PRÜFTEN DIE KLASSEN-REGEL NICHT MEHR.** Ihre Fixtures
  waren durch den dritten Träger zu "aufruf" geworden; `entfernbar === false` kam damit
  schon vom TRÄGER, und `every` statt `some` war ungedeckt. GEMESSEN an M2, unter der F7
  als einziger der fünf vorhergesagten Läufe nicht mehr fiel. Beide Fixtures sind ersetzt
  (Dauerregel EIN GRÜNER TEST IST KEIN BELEG, DASS DER GRUND SEINER GRÜNHEIT DERSELBE
  GEBLIEBEN IST).
- **F10 WAR EIN EINZELSTÜCK UND IST KEINES MEHR.** Unter M5b fiel zunächst nur er; seit die
  Testseite LinkedIns Rückfall-Bild in einer body-`<noscript>` trägt, fallen drei. Sein
  Kommentar ist richtiggestellt.

**DIE ZWEI KORREKTUREN AUS DEM REVIEW — JE MIT DEM SCHADEN, DEN SIE VERHINDERN. SIE SIND
DER EIGENTLICHE ERTRAG DIESER SCHEIBE:**

**(1) AUFRUF IN SEITEN-CODE (ENTSCHEIDUNG P11.11-38).** Ein Inline-Script ist nur entfernbar,
wenn sein Rumpf eine bekannte LADE-Adresse trägt; wird es nur über einen NAMEN erkannt, ist
es ein Aufruf in Seiten-Code und bekommt keinen Knopf. **DER SCHADEN, DEN DAS VERHINDERT:**
KI-erzeugte Seiten bündeln Formular- und Menülogik oft in EINEM Script, in dem irgendwo ein
`fbq('track', …)` steht. **EIN KLICK AUF „META" HÄTTE DIESE LOGIK GELÖSCHT.** Es ist die
Fehlerklasse von P11.11-35, Satz (b), eine Ebene grösser: dort ein Attribut, hier ein ganzes
Script.

**(2) EINE ADRESSE IM RUMPF ZÄHLT SCHON FÜR DIE ERKENNUNG** (Ergänzung an ENTSCHEIDUNG
P11.11-38, auf dem GEMESSENEN Befund V2). **DER SCHADEN, DEN DAS VERHINDERT:** LinkedIns
LADE-Block setzt `window.lintrk` als Zuweisung und übergibt es als Argument — `lintrk(` mit
Klammer steht dort nirgends, `_linkedin_partner_id` steht im ANDEREN Block. **ER WAR
UNERKANNT**, erschien als „Inline-Skript" ohne Marke und ohne Knopf, und **ein Klick auf
„LinkedIn" hätte nur das Rückfall-Bild genommen — sein Pixel liefe weiter.**

**DIE LINKEDIN-LÜCKE BESTAND IN DER ANZEIGE SEIT DEM BAU-COMMIT VON 11.11b (`6d6ab42`).**
Sie ist kein Fehler dieser Scheibe, sondern einer, den erst das Entfernen SICHTBAR gemacht
hat: Solange nichts zu klicken war, kostete ein unerkannter Lader nur eine fehlende Marke.
**VERMERK P11.11-33 WIRD NICHT UMGESCHRIEBEN** — er ist als Aussage seiner Runde richtig,
und dieser Satz tritt DANEBEN.

**DIE REST-MELDUNG HÄNGT AM GEKLICKTEN FUND, und sie ist allein über die FEHLERAUSGÄNGE von
`stripForeignGroup` erreichbar.** Auf dem geglückten Weg kann sie nicht erscheinen: Die
Funktion nimmt ALLE Knoten ihres Schlüssels (GEMESSEN, Lauf F16, für JEDEN entfernbaren Fund
der Testseite). **DIE VERLEGUNG AN DEN NACHBARN IST ZURÜCKGENOMMEN** — dort steht bereits
der Handarbeits-Hinweis mit derselben Aufforderung.

**EINE RICHTIGSTELLUNG AM `rest`-WERT GEHÖRT DAZU, und sie war ein Kommentar-Fehler im
eigenen Code:** Der Kopf von `foreign-strip.ts` sagte von Anfang an, `rest` sei auf allen
Fehlerausgängen das, was auf der EINGABE gefunden wird — **implementiert war ein festes
`rest: 0`.** Gebaut ist jetzt EIN Ausgang: `rest` wird immer auf dem Text gezählt, DEN DIE
FUNKTION ZURÜCKGIBT. **DIE EINE AUSNAHME IST BENANNT:** Wirft die Knotenauswahl selbst, kann
auch nicht gezählt werden; dort heisst die 0 „nicht zählbar" und nicht „sauber" (Läufe W-A
und W-B).

**DER LIVE-NACHWEIS (OWNER-ANGABEN, 2026-09-21, Chrome, Vercel-Status „Ready") — von CC
nicht prüfbar:**
- **REGRESSION BESTANDEN.** Sauberes Projekt: „Skripte und Tags im Code (0)", kein Knopf;
  Speichern, Vorschau und Export unverändert.
- **RE-IMPORT DES EXPORTS VON PROJEKT A:** die 11.11d-Warnung steht, **kein Meta-Fund, kein
  Knopf.** Das ist der Live-Beleg für ENTSCHEIDUNG P11.11-26 unter der neuen Regel — genau
  die Achse, die M1 prüft.
- **DIE TESTSEITE: „Skripte und Tags im Code (12)"** — ELF bekannte Funde und EIN unbekanntes
  Inline-Skript, **genau VIER Entfernen-Knöpfe** (Meta, Google-Tag, LinkedIn, Pinterest),
  alle Hinweise wie festgelegt, **`application/ld+json` nicht gelistet, kein Rot, kein Signal
  in der Reiterzeile.**
- **DIE VIER KLICKS, jeweils auf frisch eingefügter Testseite:**
  · **Meta** -> Basiscode weg; **das Seiten-Script mit `menue-offen` unverändert**;
    Aufruf- und Handler-Zeile bleiben stehen.
  · **Google-Tag** -> Lade-Script weg; die Konfigurations-Zeile und BEIDE
    Tag-Manager-Zeilen bleiben.
  · **LinkedIn** -> Lade-Block weg, Partner-Block bleibt, `snap.licdn.com` nicht mehr im
    Code.
  · **Pinterest** -> Bild weg.
- **HANDLER VON HAND GELÖSCHT** -> seine Zeile verschwindet von selbst. Das ist die
  abgeleitete Hälfte aus ENTSCHEIDUNG P11.11-24 an der Wirkung.
- **SPEICHERN UND VERÖFFENTLICHEN OHNE SPERRE, die Live-Seite lädt.**

**DIE GRENZEN DIESES NACHWEISES — sie stehen im Wortlaut, weil sie beim nächsten Lesen sonst
zur Vollständigkeit werden:**
- **NUR CHROME.** Die übrigen Browser sind UNGEMESSEN. Der Editor läuft im Browser des
  Betreibers.
- **DIE V2-BLÖCKE UND DIE TESTSEITE SIND AUS DEN BELEGEN NACHGEBAUT.** docs/ziel-befunde.md
  zitiert die Basiscodes nicht wörtlich, sondern zerlegt sie in die Teile (a) und (b).
  **KEIN ECHTER ANBIETER-SCHNIPSEL IST GEMESSEN**; gemessen ist der Bau aus den belegten
  Bestandteilen.
- **DIE REST-MELDUNG UND DIE FEHLERAUSGÄNGE SIND NUR IM TEST GEDECKT** — live ist der
  Zustand nicht herstellbar.
- **EIN SCRIPT, DAS BASISCODE UND EIGENE LOGIK MISCHT, WIRD GANZ ENTFERNT.** Das ist die
  Grenze aus ENTSCHEIDUNG P11.11-38 und kein Mangel: Wer beides in einen Knoten legt, hat es
  untrennbar gemacht. **DIE REGEL KANN EINEN LADER NICHT VON EINER BLOSSEN ERWÄHNUNG DER
  LADE-ADRESSE TRENNEN** — wer die Adresse als Text führt, bekommt das Etikett und einen
  Knopf.

**PROVENIENZ:** Bau-Commit, Dateiumfang, Testzahlen, Gates, Byte-Wächter, die sha256 der zehn
geschützten Dateien und die elf Mutationsergebnisse GEMESSEN am eigenen Lauf (CC,
2026-09-21); der V2-Befund GEMESSEN an einer Wegwerf-Probe desselben Tages, die nach dem Lauf
gelöscht worden ist. Der Live-Nachweis, der Browser und der Vercel-Status sind OWNER-ANGABEN
vom 2026-09-21.

### VERMERK P11.11-42 — SCHEIBE 11.11e: DIE FUNDLISTE NACH HOST BÜNDELN (2026-09-22)

**GEBAUT UND LIVE BESTÄTIGT. BAU-COMMIT `aad143e`** — VIER Dateien, 880 Einfügungen,
28 Löschungen; **KEINE neue Datei.**

**WAS GEBAUT IST, in einem Satz je Schritt:** `hostVon` und `buildForeignView` als reine
Umformung in `src/lib/foreign-scan.ts` — sie ORDNET und BÜNDELT, sie erkennt nichts anders ·
ein additives Feld `ausschnitt` an der Variante `bekannt`, gesetzt nur an `aufruf` und
`handler` · die eingeklappte Sektion als LETZTES `<li>` der bestehenden Liste, mit
`<details>`/`<summary>` und einem `key` am Projekt · der Ortshinweis neben der
Fundstellen-Zahl · `setForeignStrip(null)` in `applyZenForLoadedCode`.

**DIE ZWÖLF GESCHÜTZTEN DATEIEN SIND VORHER GLEICH NACHHER** (sha256, nach JEDER
Mutations-Rücknahme einzeln geprüft, nicht nur am Ende): `ingest.ts f93bd615…` ·
`resolve.ts 061552cc…` · `proxy.ts 8a4bca17…` · `app-serve/route.ts 2e02abb9…` ·
`generate.ts 7e5c26f1…` · `pageview-emitter.ts b26cb778…` · `actions.ts 87741fa8…` ·
`own-blocks.ts e92898ca…` · `own-blocks-strip.ts 7b0bbb3c…` · `foreign-signatures.ts
b9b9651d…` · `detect.ts 1ae5855d…` · `foreign-strip.ts 403551df…`. **DIESE SCHEIBE HAT
KEINE EINZIGE HEBUNG GEBRAUCHT** — wie 11.11c und anders als 11.11b (ein Wort) und 11.11d
(zwei Wörter); der Grund steht in ENTSCHEIDUNG P11.11-41, Punkt (E). **Auch
`collectForeignHits`, `anbieterFuer`, `traegerFuer` und `foreignGroupKey` sind
ZEICHENGLEICH** — der Diff von `foreign-scan.ts` berührt keine ihrer Zeilen.

**TESTZAHL: 2 086 VORHER, 2 100 NACHHER**, 96 Dateien vorher wie nachher, alle grün.
Differenz **+14** — 7 in `foreign-scan.test.ts` (S32–S38), 7 in `CodeImporter.test.tsx`
(SK20–SK26). **Keine neue Testdatei.**

**DIE VIER GATES, alle grün** (CC, 2026-09-22): `tsc --noEmit` exit 0 · `eslint` 0 errors /
1 Warnung (dieselbe vorbestehende in `consent.test.ts`, ausserhalb dieser Scheibe) ·
`vitest run` 96 Dateien und 2 100 Tests · `next build` exit 0. **DER BYTE-WÄCHTER W1–W4 IST
GRÜN** gegen den Sollwert aus ENTSCHEIDUNG P11.11-22, Punkt (g); **ein zweiter Sollwert ist
NICHT angelegt worden.**

**DER E2-BEFUND — GEMESSEN VOR DEM BAU an einer Wegwerf-Probe in der Projekt-jsdom (CC,
2026-09-22), und er trägt die Entscheidung (F):** Ein `<summary>` zählt **NICHT** als Rolle
`button` — `queryAllByRole("button")` fand allein den echten Knopf daneben; `<details>`
trägt die Rolle `group`; ein Klick auf das `<summary>` dreht `open` auch in jsdom; die
Kinder stehen im DOM und sind per `getByText` auffindbar. **DIE FOLGE, und sie ist der
Grund, warum kein STOPP eingetreten ist:** Die zwei ZÄHL-Zusicherungen SK4 (null Knöpfe)
und SK12 (genau einer) sind von einem `<summary>` unberührt. Die Auflage (K) — Sektion nur
bei mindestens einem unbekannten Fund — ist damit die ZWEITE Sicherung und nicht die
einzige; sie steht trotzdem. **Nachgemessen im selben Lauf:** Die sechs
`role="group"`-Abfragen der Bestandsdatei sind alle mit `{ name: "Variante" }` qualifiziert
und damit unberührt.

**ACHT PFLICHT-MUTATIONEN, M6 IN DREI TEILE GETEILT — ZEHN LÄUFE, JEDER ROT.** Die
Vorhersagen standen VOR dem jeweiligen Lauf und sind gegen den dann aktuellen Bestand NEU
abgeleitet worden (docs/immer-beachten.md, EINE MUTATIONS-VORHERSAGE WIRD VOR DEM LAUF
GEGEN DEN AKTUELLEN TESTBESTAND AKTUALISIERT):
- **M1** (`ohne-domain`-Gruppe übersprungen) -> 6: S34, S35, SK20, SK21, SK22, SK24. Klasse
  und Menge exakt vorhergesagt; die Zahl war ausdrücklich offen gelassen ("mindestens
  sechs").
- **M2** (Sortierung absteigend) -> nur S33, exakt.
- **M3** (`open` fest, Einklappen nur per CSS) -> **3 statt 2**: SK20, SK22 **und SK24**.
  **DER ÜBERSCHUSS IST DECKUNG UND KEINE KASKADE** — alle drei melden dieselbe Klasse
  (`open` ist true, wo false stehen müsste). Die Vorhersage war zu eng, und zwar in die
  Richtung, die die Dauerregel als systematisch führt.
- **M4** (zusätzliches `<details>` um die ganze Liste) -> **erst 4, dann 2**; s. unten.
- **M5** (`key` am Projekt entfernt) -> nur SK24, exakt.
- **M6a/M6b** (`ausschnitt` am `handler` bzw. am `aufruf` auf null) -> je 2: S37 und SK26,
  dieselbe Klasse.
- **M6c** (der JSX-Block des Ortshinweises entfernt) -> nur SK26. **S37 BLIEB GRÜN, WIE
  VORHERGESAGT** — das Feld ist unberührt, allein das Rendern fehlt.
- **M7** (Sortierung der bekannten Funde entfällt) -> nur S36, exakt.
- **M8** (`setForeignStrip(null)` fehlt) -> nur SK25, exakt.
**KEINE Mutation blieb grün. KEIN Bestandstest fiel ohne Mutation.**

**DIE KASKADE UNTER M4 UND IHRE BEHEBUNG AN DER WURZEL — der lehrreiche Lauf dieser
Scheibe:** Im ersten Anlauf fielen VIER Läufe statt des einen vorhergesagten. **VOR JEDER
REPARATUR IST GEPRÜFT WORDEN, OB DIE ZUSATZTREFFER DIESELBE FEHLERKLASSE MELDEN** — sie
taten es NICHT: SK22 und SK24 fielen mit "expected false to be true", weil der Test-Helfer
`sektion()` als "das erste `details` in der Liste" formuliert war und unter der Mutation
**das falsche Element** griff. **Das ist eine Kaskade, keine Abdeckung** (Dauerregel
MUTATIONSPROBEN …, Lektion (g)). **BEHOBEN IST DIE WURZEL, NICHT DIE ASSERTION:** Der
Helfer benennt die Sektion jetzt über ihre Überschrift
(`getByText(/^Weitere Skripte \(/).closest("details")`). Danach fielen unter M4 **zwei**
Läufe, SK21 und SK23, und beide melden dieselbe Klasse. Die Nachschärfung steht mit ihrem
Grund im Kommentar des Helfers.

**DREI EINZELSTÜCKE SIND ALS SOLCHE BENANNT** (Dauerregel MUTATIONSPROBEN …, Lektion (f)):
SK24 (fällt allein unter M5), SK25 (allein unter M8) und SK26 (allein unter M6c). **SK26
IST IM BAU ERGÄNZT WORDEN UND STAND IN KEINEM AUFTRAG:** Der Plan deckte den Ortshinweis
nur auf DATENEBENE (S37); das Rendern wäre ungedeckt geblieben, und ein entfernter
JSX-Block hätte S37 nicht rot gemacht.

**DER LIVE-NACHWEIS (OWNER-ANGABEN, 2026-09-22, Chrome, Vercel-Status "Ready") — von CC
nicht prüfbar:**
- **REGRESSION BESTANDEN.** Sauberes Projekt: "(0)", **keine Sektion**. Die Testseite:
  **"(12)"**, die **drei Meta-Zeilen direkt untereinander** — die Ordnung nach Anbieter an
  der Wirkung belegt —, **Ortshinweise an den zwei Zeilen ohne Knopf**
  (`querySelector('#menue')` bzw. `fbq('track','Lead')`), **Cookiebot zuletzt**,
  **"Weitere Skripte (1)" → "Inline-Skripte (1)"**, und der **Pinterest-Knopf wirkt**
  (Zähler 12 → 11).
- **DER HAUPTFALL, DIE ECHTE WORDPRESS-SEITE:** **vorher (136), nachher (136)** — **die
  äussere Zahl ist unverändert**, wie Punkt (H) es festlegt. Darunter **"Weitere Skripte
  (136)"**, und die 136 Skripte stehen in **SIEBEN Gruppen**, aufsteigend sortiert: oben
  unter anderem `accounts.google.com` (1), `api.traqqr.io` (1),
  `www.digistore24-scripts.com` (1), unten die **Seiten-Domain (108)** und die
  **Inline-Skripte (22)**. **`…/wp-content/plugins/digistore/digistore.js` STEHT IN DER
  GRUPPE DER SEITEN-DOMAIN** — genau der Tracker, den ein Pfad-Filter versteckt hätte
  (ENTSCHEIDUNG P11.11-37), an der Wirkung belegt. **DIE ECHTE SEITE LIEGT NICHT IM REPO.**
- **PROJEKTWECHSEL:** die Sektion ist danach **wieder zu** — der `key` aus Punkt (G) an der
  Wirkung.

**EIN BEFUND, DER NICHT IM AUFTRAG STAND UND DER WICHTIGSTE DIESES LAUFS IST: AUF DER
ECHTEN SEITE HAT DIE SIGNATURLISTE KEINEN EINZIGEN ANBIETER ERKANNT.** Die äussere Zahl
(136) ist gleich der Zahl der unbekannten Skripte (136) — es gibt also **null bekannte
Funde**. **DAS IST DER GEWOLLTE AUSGANG UND KEIN DEFEKT**, und der Satz gehört hierher,
sonst liest die nächste Runde ihn als Fehlermeldung: Weil JEDES Script angezeigt wird
(ENTSCHEIDUNG P11.11-3), macht sich das Veralten der Liste als **fehlende Marke** bemerkbar
statt als Abwesenheit. **Der Gegenstand ist geführt** — VORRAT P11.11-8 nennt fünf auf
DERSELBEN Seite gemessene Lücken (Universal Analytics, ActiveCampaign, Digistore24,
Trustpilot, Deadline Funnel) und hält fest, dass eine Aufnahme je Anbieter einen eigenen
Crawl kostet. **Die Bündelung macht die Lücke erst sichtbar**: 136 Zeilen ohne Marke
liessen sich nicht lesen, sieben Gruppen schon.

**EINE BEOBACHTUNG ÜBER DIESE PHASE, benannt und nicht bewertet:** In 11.11 ist **ZWEIMAL**
ein Ganz-Datei-Schreiber an einer HILFSDATEI benutzt worden — `perl -i` an
`src/components/PublishView.tsx` in der Scheibe 11.11d (VERMERK P11.11-23) und `sed -i` an
der Wegwerf-Probe der E2-Messung in dieser Scheibe. **BEIDE MALE OHNE SCHADEN:** Dort wurde
aus der Versionsverwaltung wiederhergestellt und mit dem Editier-Werkzeug neu eingetragen,
hier war die Datei eine Wegwerf-Datei und ist gelöscht; in KEINEM Commit ist davon etwas
gelandet (CR 0, `git status` leer). **HIER STEHT NUR DIE BEOBACHTUNG. Ob die Werkzeug-Regel
um den Fall der Hilfs- und Wegwerf-Datei geschärft wird, ist eine Frage der Hebung und hier
ausdrücklich NICHT entschieden — KEINE EMPFEHLUNG.**

**DIE GRENZEN DIESES NACHWEISES — sie stehen im Wortlaut, weil sie beim nächsten Lesen
sonst zur Vollständigkeit werden:**
- **NUR CHROME.** Die übrigen Browser sind UNGEMESSEN. Der Editor läuft im Browser des
  Betreibers.
- **DIE GRUPPENZAHL IST AN EINER EINZIGEN ECHTEN SEITE GEMESSEN.** Sieben Gruppen für 136
  Skripte ist ein Wert dieser Seite, keine Eigenschaft der Bündelung. Ob die Liste auf einer
  anderen realen Seite ähnlich kurz wird, ist **nicht erhoben** — eine Seite, deren Skripte
  über dreissig Hosts verteilt sind, ergäbe dreissig Gruppen.
- **DIE ZWEITACHSE DER SORTIERUNG IST LIVE NICHT GEPRÜFT.** Bei gleicher Gruppengrösse
  entscheidet der Titel; auf der echten Seite ist nicht erhoben, ob zwei Gruppen dieselbe
  Grösse hatten. Gedeckt ist sie allein durch S33.
- **DIE ORTSHINWEISE SIND AN ZWEI ZEILEN GEMESSEN**, nicht an allen möglichen Trägern.

**PROVENIENZ:** Bau-Commit, Dateiumfang, Testzahlen, Gates, Byte-Wächter, die sha256 der
zwölf geschützten Dateien, der E2-Befund und die zehn Mutationsergebnisse GEMESSEN am
eigenen Lauf (CC, 2026-09-22). Der Live-Nachweis, die Zahlen der echten Seite, der Browser
und der Vercel-Status sind OWNER-ANGABEN vom 2026-09-22; **die echte Seite ist von CC nie
gesehen worden.** Die Beobachtung über die zwei Ganz-Datei-Schreiber ist am Repo und an den
zwei Vermerken erhoben (CC, 2026-09-22).

---

## Vorrat — gemeldet, nicht gebaut

**WAS HIER STEHT, IST GEMELDET UND NICHT GEBAUT.** Ein Eintrag hier ist kein Auftrag und
keine Empfehlung. Alle stammen aus den Aufklärungen vom 2026-09-21 und sind am Repo
gemessen.

**ZUR NUMMERIERUNG, damit niemand danebengreift:** Die Vorrats-Einträge zählen in einer
EIGENEN Reihe ab 1 — anders als Vermerke und Entscheidungen, die sich eine Reihe teilen
(s. den Hinweis am Kopf des Entscheidungs-Abschnitts). "Vorrat P11.11-2" und "Entscheidung
P11.11-2" sind deshalb ZWEI verschiedene Einträge; **wer auf einen zeigt, nennt die Gattung
mit.**

### VORRAT P11.11-1 — DIE SANDBOX-ATTRIBUTE BEIDER VORSCHAU-RAHMEN SICHERT KEIN TEST

**→ ZIEL DER HEBUNG (2026-09-22): GESTRICHEN, GEGENSTAND ERLEDIGT.** Er geht NICHT ins
Backlog und nicht nach docs/offene-punkte.md; der Beleg der Erledigung steht hier am Eintrag,
Titel und Beleg bleiben als Spur.

**ERLEDIGT AM 2026-09-21 MIT DER SCHEIBE 11.11a** — Bau-Commit `4efa94b`, Nachweis in
VERMERK P11.11-8, die bindende Folge in ENTSCHEIDUNG P11.11-9. Seither sichern acht Läufe
in `src/components/CodeImporter.test.tsx` beide Rahmen; der Schutz ruht nicht mehr allein
auf Kommentaren. **Titel und Beleg bleiben stehen, der Rumpf ist gekürzt** — die Messung,
die ihn trug (Achse `sandbox` über die Testdatei, NULL Treffer), ist im Vermerk erhalten.

### VORRAT P11.11-2 — DIE DREI EINGANGSWEGE SIND UNGETESTET

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer. **ZIEL "SONST": KEIN TRIGGER** —
das zweiteilige Kriterium verlangt Trigger UND "geht sonst still kaputt".

Dass Paste, Datei-Upload und Drag-Drop ALLE in `setCode` münden, ist am Code sichtbar und
von KEINEM Test zugesichert (GEMESSEN, CC, 2026-09-21: kein Test in
`src/components/CodeImporter.test.tsx` fährt einen der drei Wege). Gedeckt ist allein die
Validierung davor — `src/lib/upload.test.ts` für `validateUploadFile`, sechs Fälle.
**KEIN TRIGGER benannt.**

### VORRAT P11.11-3 — DAS VERHALTEN DES ROUND-TRIPS GEGENÜBER FREMDEN `<script>`-ELEMENTEN IST UNGETESTET, IN BEIDE RICHTUNGEN

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer. **ZIEL "SONST": KEIN TRIGGER.**

**GEMESSEN (CC, 2026-09-21):** Die Achse `fremd|foreign|<script` über `src/lib/detect.test.ts`
trifft EINE Zeile, und die prüft die EIGENE Listener-Injektion. **Kein Test sichert zu, dass
ein fremdes `<script>` den Round-Trip unverändert übersteht — und keiner, dass es entfernt
würde.** Beide Richtungen sind offen.

**WARUM DIE ZWEITE RICHTUNG MITGEHÖRT:** Ein Test nur für "wird nicht entfernt" wäre eine
Abwesenheits-Behauptung und würde hohl, sobald sein Gegenstand verschwindet
(docs/immer-beachten.md, EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL). Wer hier
baut, liest jene Regel zuerst.

### VORRAT P11.11-4 — DASS `saveProject` DEN HTML-INHALT UNVERÄNDERT SCHREIBT, SICHERT KEIN TEST

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer. **ZIEL "SONST": KEIN TRIGGER.**

Gedeckt sind am Speicherweg die Eigentums-Achse (die IDOR-Fälle in
`src/app/projects/actions.test.ts`) und das Varianten-Ziel (die zwei Riegel-Tests in
`src/components/CodeImporter.test.tsx`, "Speichern bei aktiver Variante B ruft
saveVariantB" und seine Gegenprobe). **NICHT gedeckt ist der INHALT:** dass der übergebene
HTML-String unverändert in die Spalte geht. GEMESSEN (CC, 2026-09-21).

### VORRAT P11.11-5 — EIN WIEDER IMPORTIERTER EXPORT TRÜGE DIE EIGENEN BLÖCKE DOPPELT, UND DAS BRICHT EINE TRAGENDE ENTSCHEIDUNG

**→ ZIEL DER HEBUNG (2026-09-22): GESTRICHEN, GEGENSTAND ERLEDIGT — MIT ZWEI AUSNAHMEN AUS
SEINEM RUMPF, UND SIE SIND DER GRUND, WARUM DIESER EINTRAG NICHT EINFACH ABGEHAKT WIRD:**
· Der Satz **"OB META DOPPELT ZÄHLT, BLEIBT UNGEMESSEN"** ist **nach
docs/claude-history/backlog-polish.md GEHOBEN**, Abschnitt "Aus Phase 11.11 gehoben
(2026-09-22)", als Eintrag OHNE eigene Vorrats-Nummer. **Wer nur den offenen Vorrat sichtet,
findet ihn nicht.**
· Der **Änderungsantrag an docs/arbeitsweise.md, Abschnitt 4b, IST VOLLZOGEN** — jener Text
sagt seither, die Idempotenz ruhe auf dem Riegel aus 11.11d statt auf der Annahme allein
(GELESEN, CC, 2026-09-22). **ERLEDIGT, kein Ziel mehr nötig.**

**ERLEDIGT AM 2026-09-21 MIT DER SCHEIBE 11.11d** — Bau-Commit `0b9bd7f`, Nachweis in
VERMERK P11.11-23, die bindenden Folgen in den ENTSCHEIDUNGEN P11.11-18, P11.11-19,
P11.11-20 und P11.11-24. Seither findet ein reines String-Prädikat die eigenen Bausteine,
ein Knopf entfernt sie, und Veröffentlichen wie Export verweigern, solange der Quelltext sie
trägt. **Titel und Beleg bleiben stehen, der Rumpf ist gekürzt** — was ihn trug, ist an drei
Orten erhalten: die Code-Messung am unbedingten Erzeuger in VERMERK P11.11-1, die
Live-Messung des Verdoppelns in VERMERK P11.11-16 und der Live-Nachweis der Behebung in
VERMERK P11.11-23.

**DIE PLAN-FRAGE DES RUMPFES IST BEANTWORTET:** Das Wiring-Script trägt weiterhin KEINE
`id`; erkannt wird es über ein INHALTSMERKMAL — den Aufruf `getElementById("…")` auf den
Datenblock, aus der Kennungs-Konstante zusammengesetzt. **Eine neue `id` ist damit nicht
nötig gewesen, und der Differenz-Nachweis am ausgelieferten Text entfiel** (der Byte-Wächter
belegt, dass er byte-gleich blieb).

**ZWEI SÄTZE DES ALTEN RUMPFES SIND MIT IHM NICHT ERLEDIGT und stehen deshalb hier weiter:**
- **OB META DOPPELT ZÄHLT, BLEIBT UNGEMESSEN.** Belegt ist die EIGENE Ablage; die Zahlen des
  Anbieters sind in keinem Lauf erhoben worden.
- **DER ÄNDERUNGSANTRAG AN docs/arbeitsweise.md, Abschnitt 4b, IST ANGENOMMEN**
  (OWNER, 2026-09-21) und wird im unmittelbar folgenden Commit vollzogen: Die Prämisse "der
  Client erzeugt den Emitter nie" war durch den Re-Import widerlegt; der Punkt sagt seither,
  dass die Idempotenz auf dem Riegel aus 11.11d ruht statt auf der Annahme allein.

### VORRAT P11.11-6 — DIE MODUL-GRENZE, DIE `own-blocks-strip.ts` VOM SERVER FERNHÄLT, IST NICHT ABGESICHERT

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer. **ZIEL "SONST": KEIN TRIGGER** —
der Eintrag sagt selbst, warum keiner benennbar ist. **AM EINTRAG DORT STEHT ZUSÄTZLICH EIN
LÖSUNGSWEG, DEN ES HIER NOCH NICHT GAB** (ARCHITEKT-VORSCHLAG 2026-09-22, UNGEPRÜFT, KEINE
EMPFEHLUNG): `import "client-only"` an `own-blocks-strip.ts`, spiegelbildlich zu
`server-only`, damit ein Server-Import beim BUILD laut wird statt still. Ob das in diesem
Setup trägt, ist offen; Kandidat für eine kleine eigene Scheibe.

**DER ZUSTAND HEUTE IST IN ORDNUNG, und das ist GEMESSEN (CC, 2026-09-21):** Zur Laufzeit
erreichen `detect.ts` nur `src/lib/mappings.ts` (Wert: `MAX_LABEL`) und
`src/components/CodeImporter.tsx`; `mappings.ts` wiederum erreichen zur Laufzeit nur
`ActionPanel.tsx` und `CodeImporter.tsx` — beide Client. `src/app/projects/actions.ts`
(`"use server"`), `src/lib/generate.ts` und `src/lib/tracking/event-names.ts` importieren
`mappings.ts` ALLE `import type`, und eine type-only-Kante ist zur Laufzeit gelöscht.
**Kein Server-Modul erreicht `detect.ts`.**

**WAS KIPPT, WENN SICH DAS ÄNDERT:** Seit der Scheibe 11.11b importiert `detect.ts` die
Datei `own-blocks-strip.ts` (für `collectOwnNodes`, ENTSCHEIDUNG P11.11-26). **Value-
importiert irgendwann EIN Server-Modul `mappings.ts` oder `detect.ts`, reist der DOM-Code
aus `own-blocks-strip.ts` mit** — und damit fällt genau die Trennung, für die 11.11d die
zwei Dateien angelegt hat (Kopfkommentar von `own-blocks.ts`: "darf deshalb KEIN DOM
tragen").

**DER SCHADEN IST HEUTE KLEIN UND DER BEFUND TROTZDEM WERT, AUFGESCHRIEBEN ZU WERDEN:**
`own-blocks-strip.ts` ist gegen einen Server-Lauf gehärtet — `DOMParser` nur INNERHALB von
`stripOwnBlocks` hinter einem `typeof`-Guard, `Node.TEXT_NODE` bewusst als die Zahl 3,
`CSS.escape` bewusst vermieden (alles im Dateikopf begründet). Es stürzt also nichts ab.
**WAS FEHLT, IST DER WÄCHTER:** Es gibt keinen Lauf und kein Gate, das die Kante meldet.

**KEIN TRIGGER BENANNT**, und das ist Absicht: Der Fall tritt nicht zu einem Zeitpunkt ein,
sondern mit einer Zeile, die jemand schreibt, ohne sie als Grenzübertritt zu erkennen.

### VORRAT P11.11-7 — DIE KOLLISIONSANZEIGE LIEST NUR DIE AKTIVE VARIANTE

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer. **ZIEL "SONST": KEIN TRIGGER.**
**SEIN GEGENSTAND STEHT SEIT DEM 2026-09-22 AUSSERDEM ALS GRENZE AM OFFENEN PUNKT** "UNSER
EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN" (docs/offene-punkte.md) — dort als
Grenze der neuen Anzeige, hier als der Befund selbst.

**DER BEFUND (GEMESSEN am gebauten Stand, CC, 2026-09-21):** `foreignCmp` wird in
`CodeImporter.tsx` aus `foreignScan` abgeleitet, und jener Scan läuft über
`debouncedCode` — also über den Text der AKTIVEN Variante. **Steht ein fremdes CMP allein
in Variante B, während A aktiv ist, erscheint der Kollisionshinweis NICHT** — auch dann
nicht, wenn der eigene Einwilligungs-Dialog eingeschaltet ist.

**DER GRUND, WARUM DAS HEUTE SO GEBAUT IST UND KEIN VERSEHEN:** Die ganze Scheibe 11.11b
arbeitet am Editor-Text, und der Editor zeigt eine Variante. Die Fundliste im Bereich
BAUEN hat dieselbe Grenze; sie ist dort harmlos, weil der Betreiber sieht, welche Variante
er gerade bearbeitet.

**WARUM ES AN DER KOLLISION TROTZDEM WIEGT:** Der Hinweis steht im Bereich
VERÖFFENTLICHEN, am Einwilligungs-Schalter — und **der Schalter gilt BEIDEN Varianten**.
Der Betreiber trifft dort eine Entscheidung für die ganze Seite und bekommt eine Auskunft,
die nur die halbe Seite gesehen hat. **Dieselbe Asymmetrie hat 11.11d bereits einmal
gekostet**: Dort nennt die Verweigerungs-Meldung eigens die Variante, weil die Warnung im
Bereich BAUEN nur die aktive zeigt (ENTSCHEIDUNG P11.11-22, Punkt (d)).

**WAS ES NICHT IST:** kein Fehlalarm und kein falscher Hinweis — der Hinweis, der
erscheint, ist immer richtig. Es fehlt einer, der erscheinen könnte.

**KEIN TRIGGER BENANNT.** Der Fall tritt nicht zu einem Zeitpunkt ein, sondern beim ersten
Betreiber, der ein CMP ausschliesslich in seine B-Variante schreibt — und ob das je
vorkommt, ist nicht erhoben.

### VORRAT P11.11-8 — DIE SIGNATURLISTE HAT LÜCKEN, UND EINE ECHTE SEITE HAT FÜNF DAVON AUF EINMAL GEZEIGT

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer. **ZIEL "SONST": KEIN TRIGGER.**

**DER BEFUND (OWNER-ANGABE aus der angezeigten Fundliste, 2026-09-21; NICHT von CC
gemessen und an keiner Anbieter-Doku belegt):** Auf derselben echten WordPress-Seite, die
ENTSCHEIDUNG P11.11-37 ausgelöst hat, liefen **Universal Analytics**
(`GoogleAnalyticsObject`), **ActiveCampaign** (`trackcmp`), **Digistore24**, **Trustpilot**
und **Deadline Funnel**. **KEINER DAVON IST ERKANNT** — alle fünf standen als unbekannte
Skripte in der Liste.

**DAS IST DER GEWOLLTE AUSGANG UND KEIN DEFEKT**, und der Satz gehört hierher, sonst liest
die nächste Runde den Eintrag als Fehlermeldung: Weil JEDES Script angezeigt wird
(ENTSCHEIDUNG P11.11-3), macht sich das Veralten der Liste als **fehlende Marke** bemerkbar
statt als Abwesenheit. **Genau das ist hier eingetreten — die Lücke hat sich selbst
gezeigt.**

**WAS EINE AUFNAHME KOSTET:** Jede Signatur braucht ihren Beleg je Anbieter
(ENTSCHEIDUNG P11.11-15, OHNE BELEG KEINE SIGNATUR), also **einen eigenen Crawl**. Eine aus
der angezeigten Adresse abgelesene Signatur wäre eine Messung an EINER Installation; sie
zählte nach ENTSCHEIDUNG P11.11-28 allein für ein CMP-Etikett und ausdrücklich **nicht für
ein Pixel**, an dem ein Entfernen hängt.

**GEHÖRT NICHT IN DIESE PHASE.** Der Zuschnitt der Phase 11.11 nennt elf Anbieter
(ENTSCHEIDUNG P11.11-11); fünf weitere aufzunehmen ist eine eigene Arbeit mit einem eigenen
Crawl. **KEIN TRIGGER BENANNT.**

### VORRAT P11.11-9 — DIE VORSCHAU FLACKERT BEI JEDER CODE-ÄNDERUNG

**→ GEHOBEN 2026-09-22 nach docs/claude-history/backlog-polish.md**, Abschnitt "Aus Phase
11.11 gehoben (2026-09-22)", unter der Ursprungs-Nummer — **so, wie dieser Eintrag es selbst
vorsieht** ("BEIM PHASENENDE GEHT DER EINTRAG IN DEN BACKLOG"). **DIE AUFLAGE AUS
ENTSCHEIDUNG P11.11-9 IST AM BACKLOG-EINTRAG MITGEREIST** und steht seit demselben Tag
zusätzlich als Ergänzung an der Dauerregel "Importierter User-Code läuft NUR im sandboxed
iframe …" (docs/immer-beachten.md) — sie hängt damit nicht mehr allein an diesem Eintrag.

**DER BEFUND (OWNER-BEOBACHTUNG, 2026-09-22):** Die Vorschau flackert bei jeder
Code-Änderung. **AUFGEFALLEN IST ES BEIM ENTFERNEN** — dort ändert EIN Klick den Text auf
einen Schlag, und das Flackern hat einen sichtbaren Auslöser.

**DIE URSACHE IST EINE ABLEITUNG UND KEINE MESSUNG (ARCHITEKT, 2026-09-22):** Jede
Code-Änderung ersetzt den `srcDoc` des Rahmens, und der Rahmen lädt daraufhin neu. **BEIM
TIPPEN GESCHIEHT DASSELBE, nur unauffällig** — dort kommt die Änderung entprellt und in
kleinen Schritten, und niemand schreibt das Flackern einem Ereignis zu. **DER KLICK HAT
ALSO NICHTS NEUES ERZEUGT, ER HAT ETWAS BESTEHENDES SICHTBAR GEMACHT.**

**EIN AUSBLENDEN DER LISTENZEILE BEHÖBE ES NICHT**, und der Satz gehört an den Anfang,
damit die nächste Runde nicht an der falschen Stelle sucht: Das Flackern hängt am RAHMEN
und an seinem Neuladen, nicht an der Fundliste daneben.

**DER LÖSUNGSWEG (ARCHITEKT, 2026-09-22) — GENANNT, NICHT ENTSCHIEDEN:** den neuen Stand
**unsichtbar laden und erst nach dem `load`-Ereignis gegen den alten tauschen.** **WARUM
DIESER UND KEIN ZUSCHNITT AM SYMPTOM:** Er ist STRUKTURELL — er überlebt ein Redesign der
Oberfläche, weil er am Ladevorgang ansetzt und nicht an dem, was gerade darüber steht.
**ER IST EIN VORSCHLAG UND KEINE EMPFEHLUNG**; welchen Preis er hat (ein zweiter Rahmen im
Baum, doppelter Speicher während des Tauschs), ist nicht erhoben.

**EINE AUFLAGE REIST MIT UND IST DER TEUERSTE SATZ DIESES EINTRAGS: JEDE ÄNDERUNG AN DEN
RAHMEN FÄLLT UNTER ENTSCHEIDUNG P11.11-9.** Jene verlangt für **JEDEN neuen Rahmen, der
importierten oder erzeugten Kundencode rendert**, denselben Sandbox-Wächter — dieselben
vier Zusicherungen und eine eigene ABSCHLIESSENDE Werteliste. **Ein zweiter, unsichtbarer
Rahmen ist ein solcher Rahmen.** Wer ihn ohne Wächter baut, hebt die Zusicherung auf, ohne
dass ein Gate rot wird.

**KEIN TRIGGER BENANNT, UND DAS IST BEGRÜNDET:** Es geht nichts still kaputt. Das Flackern
ist sichtbar, es kostet keine Daten, und es fällt auf, sobald jemand hinsieht. **BEIM
PHASENENDE GEHT DER EINTRAG IN DEN BACKLOG** (docs/claude-history/backlog-polish.md) und
nicht nach docs/offene-punkte.md — das zweiteilige Kriterium verlangt benennbaren Trigger
UND "geht sonst still kaputt", und hier trifft keines von beidem zu.

**PROVENIENZ:** Die Beobachtung ist OWNER-ANGABE vom 2026-09-22 und **von CC nicht
gemessen**. Die Ursache ist eine ARCHITEKT-ABLEITUNG desselben Tages, **nicht am Code
erhoben**. Der Lösungsweg ist ein ARCHITEKT-VORSCHLAG, **nicht entschieden**. Die Auflage
aus ENTSCHEIDUNG P11.11-9 ist GELESEN (CC, 2026-09-22).

---

## Hebungs-Kandidaten

**ZUR NUMMERIERUNG:** Die Hebungs-Kandidaten zählen in einer EIGENEN Reihe ab 1 — wie der
Vorrat und anders als Vermerke und Entscheidungen, die sich eine Reihe teilen. Wer auf einen
zeigt, nennt die Gattung mit.

**BIS ZUM CRAWL 1 STAND HIER "KEINE"** — aus der Aufklärung vom 2026-09-21 war nichts
hervorgegangen, das eine Dauerregel oder eine Änderung an docs/arbeitsweise.md getragen
hätte. Der Crawl desselben Tages hat einen ergeben.

### HEBUNGS-KANDIDAT P11.11-1 — DER PFLICHT-STOPP FÜR docs/ziel-befunde.md IST IN EINER CC-SITZUNG MIT CRAWL NICHT VOLLSTÄNDIG ERFÜLLBAR

**→ ZIEL DER HEBUNG (2026-09-22): ERLEDIGT UND GESTRICHEN — DER PFLICHT-STOPP IST NEU
GEFASST.** OWNER-ENTSCHEIDUNG nach Sicht des Wortlauts: Der Pflicht-Stopp in CLAUDE.md,
Abschnitt "Anbieter-Befunde der Fan-Out-Ziele", ist so gefasst, dass er ERFÜLLBAR ist —
**Vollladung bleibt für Zuschnitt, Adapter und Live-Test-Anleitung**, und **für Recherche,
deren freier Kontext sie nicht trägt, genügt eine GEZIELTE SUCHE über die Abschnitte des
Ziels mit benannter Achse und Positivkontrolle, im ersten Satz des Berichts ausgewiesen.**
**DAMIT IST DIE SPANNUNG, DIE DIESER KANDIDAT FESTSTELLT, AUFGELÖST** — und zwar auf der
Achse, die er selbst als offen benannt hat ("ob der Pflicht-Stopp in CLAUDE.md eine Form für
'gezielt statt voll' bekommt"). **Die zwei anderen Wege, die er offenliess, sind damit NICHT
entschieden:** weder wird daraus eine Dauerregel in docs/immer-beachten.md, noch wird
docs/ziel-befunde.md geteilt. **KEINE EMPFEHLUNG dazu.**
**WAS DER KANDIDAT WARNEND SAGT, IST IN DIE NEUE FASSUNG MITGENOMMEN:** Der Pflicht-Stopp
ist nicht Ballast, und die gezielte Form trägt nur, WENN IHR ERGEBNIS DÜNN IST — das steht
dort als Grenze, damit die Lockerung keine durch die Hintertür wird.
**BELEG: dieser Commit.**

**DIE AUSSAGE:** Eine Sitzung, die `docs/ziel-befunde.md` vollständig lädt UND anschliessend
crawlt, gibt es nicht — die Datei allein füllt den freien Kontext weitgehend aus. **Der
Pflicht-Stopp und die Crawl-Regel verlangen damit zusammen etwas, das in EINER Sitzung nicht
beides geht.**

**DER BELEG:** 549 237 Bytes gegen 196k freie Token zu Rundenbeginn (Grösse GEMESSEN, freier
Kontext ABGELESEN, die Umrechnung eine SCHÄTZUNG — s. Entscheidung P11.11-14).

**WARUM ES EIN KANDIDAT IST UND KEINE REGEL:** Die Entscheidung P11.11-14 löst den Fall
**für diese Phase und nur für die Browser-Tag-Achse.** Ob daraus eine Dauerregel wird, ob
der Pflicht-Stopp in CLAUDE.md eine Form für "gezielt statt voll" bekommt, oder ob die Datei
selbst geteilt gehört, **ist hier NICHT entschieden. KEINE EMPFEHLUNG.**

**WAS DABEI NICHT ÜBERSEHEN WERDEN DARF:** Der Pflicht-Stopp ist nicht Ballast. Er ist
entstanden, weil eine überholte Fassung einmal einen Plan getragen hat; wer ihn lockert,
nimmt genau diesen Schutz zurück. **Der Kandidat stellt die Spannung fest, er löst sie
nicht auf.**

---

## Zuschnitt — die drei Scheiben

**DIE PHASE ZERFÄLLT SEIT DEM 2026-09-21 IN FÜNF SCHEIBEN, und die Trennlinie ist, WAS SIE
ANFASSEN.** Hier stand "DREI", dann "VIER"; die vierte (11.11d) und die fünfte (11.11e,
ENTSCHEIDUNG P11.11-37) sind an diesem Tag hinzugekommen. **DIE ZAHL WIRD IN DIESEM SATZ
FORTGESCHRIEBEN UND NIRGENDS SONST** — sie steht damit an genau einer Stelle, und die
vorigen Fassungen bleiben als Spur lesbar.
**DIE ÜBERSCHRIFT DIESES ABSCHNITTS SAGT WEITERHIN "die drei Scheiben", UND DAS BLEIBT SO:**
Sie ist der Anker, den Eintrag 9 des Abschnitts-Verzeichnisses wörtlich zitiert, und eine
Umbenennung machte jeden Zeiger der Form "Abschnitt 9" und jedes Titel-Zitat halb falsch
(docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
VERZEICHNIS NICHT). **Wer die Zahl im Titel liest, liest eine ANKER-Zeichenkette, keine
Angabe** — die Angabe steht in diesem Satz.

- **11.11a — SANDBOX-WÄCHTER.** Ein ADDITIVER Test, der die Dauerregel Importierter
  User-Code läuft NUR im sandboxed iframe an jedem Rahmen festnagelt. **KEIN
  Produktivcode.** Sie steht VORAN, weil sie die einzige Scheibe ist, die einen
  bestehenden Schutz sichert, statt einen neuen zu bauen — und weil ihr Gegenstand
  (Vorrat P11.11-1) ohne sie weiter allein auf Kommentaren ruht.
- **11.11b — ERKENNUNG UND ANZEIGE. GEBAUT UND LIVE BESTÄTIGT; VERDICHTET AM 2026-09-21
  MIT DEM ABSCHLUSS-VERMERK P11.11-33** (docs/arbeitsweise.md, "Beim Abschluss-Vermerk wird
  der Zuschnitt verdichtet"). Was hier stand und wohin es gegangen ist — die Titel ohne
  Marke zitiert, damit eine Überschriften-Suche sie nicht trifft:
  - **Der Gegenstand** — nur lesend, Signaturliste, die Klassen, die Kollisionsanzeige, die
    Ableitung am Import-Dokument. **ABGELAUFEN:** gebaut, Bau-Commit `6d6ab42`, Umfang und
    Live-Nachweis in VERMERK P11.11-33.
  - **"IHRE BAUFORM STEHT IN ZEHN SÄTZEN IN ENTSCHEIDUNG P11.11-12"** samt dem Zusatz, dass
    die sechs Entscheidungen P11.11-26 bis P11.11-31 DANEBEN treten und zwei von ihnen
    einen jener Sätze erweitern. **BLEIBT** — und zwar nicht als Rückblick: Jene sechzehn
    Sätze binden **11.11c** genauso, denn das Entfernen setzt dieselben Klassen, dieselben
    Parkformen und dieselbe Reihenfolge eigen-vor-fremd voraus.
  - **Die Crawl-Auflage** ("VOR IHREM PLAN STEHT EINE CRAWL-RUNDE", Crawl 1, Crawl 2, die
    frische Sitzung nach ENTSCHEIDUNG P11.11-14). **ABGELAUFEN ALS AUFLAGE:** beide Crawls
    sind gefahren, die Befunde stehen in den VERMERKEN P11.11-13 und P11.11-25 und je Ziel
    als eigener Teil in docs/ziel-befunde.md. **WAS DAVON BLEIBT, IST EIN ZUSTAND UND KEINE
    AUFGABE:** Von den elf Anbietern trägt **OneTrust** seine Adresse aus einer MESSUNG an
    einer einzelnen Installation statt aus der Doku (ENTSCHEIDUNG P11.11-28), und die
    Tabelle am Ende des VERMERKS P11.11-25 sagt je Anbieter, welche der fünf Fragen offen
    blieb. **Wer einen zwölften Anbieter aufnimmt, fährt den Crawl erneut** — die Auflage
    aus ENTSCHEIDUNG P11.11-15 gilt jeder künftigen Signatur, nicht nur dem ersten Wurf.
  - **Der Auflösungs-Satz vom 2026-09-21** ("IHR ANTEIL AN DEN EIGENEN BAUSTEINEN IST NACH
    11.11d GEWANDERT"). **ABGELAUFEN:** 11.11d ist gebaut, und mit dieser Scheibe ist auch
    das Grundgerüst am zerlegten Dokument gebaut. Die Klassenzahl ist seit ENTSCHEIDUNG
    P11.11-27 **FÜNF** — `eigen` · Pixel · CMP · Container · unbekannt.

  **WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST HERAUSGELÖST UND STEHT NICHT MEHR HIER:** die
  sechs Entscheidungen **P11.11-26 bis P11.11-31** (aus der Runde vor dem Plan) und die
  sechs Freigaben **P11.11-32** (aus der Runde vor dem Bau). Die zwei Review-Korrekturen K1
  und K2 sind **KEINE Entscheidungen geworden** und das mit Grund: K1 ist die Umsetzung von
  ENTSCHEIDUNG P11.11-30 an einem Fall, den jene Entscheidung schon nennt, K2 war ein
  falscher Kommentar. **Beide stehen am Ort der Handlung** — im Docblock von `adressenVon`
  bzw. von `FOREIGN_LIST_HEADING` — und im Abschluss-Vermerk; **ein Test ist der stärkere
  Anker als eine Regel** (S20, S21 und die Mutation M11).
- **11.11c — HANDLUNGEN. GEBAUT UND LIVE BESTÄTIGT; VERDICHTET AM 2026-09-21 MIT DEM
  ABSCHLUSS-VERMERK P11.11-39** (docs/arbeitsweise.md, "Beim Abschluss-Vermerk wird der
  Zuschnitt verdichtet"). Was hier stand und wohin es gegangen ist — die Titel ohne Marke
  zitiert, damit eine Überschriften-Suche sie nicht trifft:
  - **Der Gegenstand** — Entfernen auf Klick bei einem bekannten Pixel, der
    Anbindungs-Hinweis beim CMP. **ABGELAUFEN:** gebaut, Bau-Commit `bcd3c5a`, Umfang und
    Live-Nachweis in VERMERK P11.11-39.
  - **Der Teil über die EIGENEN Bausteine und den Publish-Riegel** samt der Auflage, ihn
    erst nach einer Live-Messung zu bauen. **ABGELAUFEN:** Er ist mit dem Auflösungs-Satz
    nach 11.11d gewandert, dort gebaut (`0b9bd7f`), und die Auflage ist mit VERMERK
    P11.11-16 eingelöst.
  - **"DIE EINZIGE SCHEIBE, DIE DEN GESPEICHERTEN TEXT VERÄNDERT"** samt dem Satz, dass er
    seit der Teilung nicht mehr ausschliesslich gilt. **BLEIBT ALS SACHVERHALT, ABGELAUFEN
    ALS ABGRENZUNG:** Es sind jetzt ZWEI Scheiben, 11.11c und 11.11d, und die
    Roadmap-Auflage "keine Veränderung des gespeicherten importierten Texts ohne seinen
    Klick" greift bei beiden. **Eingelöst ist sie in 11.11c dadurch, dass der Klick nur den
    EDITOR-Text ändert** (ENTSCHEIDUNG P11.11-35, Satz (e)).
  - **Der Auflösungs-Satz vom 2026-09-21** ("IHR ANTEIL AN DEN EIGENEN BAUSTEINEN IST NACH
    11.11d GEWANDERT"). **BLEIBT** — er löst die Zeiger auf, die den alten Umfang meinen,
    und stirbt nicht mit dem Bau.

  **WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST HERAUSGELÖST UND STEHT NICHT MEHR HIER:** die
  Bauform des Entfernens in fünf Sätzen (**ENTSCHEIDUNG P11.11-35**), die sechs Freigaben
  zum Plan (**P11.11-36**), der Google-Tag mit seinem Hinweis (**P11.11-34**) und der
  Aufruf in Seiten-Code samt der Regel, dass eine Lade-Adresse im Rumpf schon für die
  Erkennung zählt (**P11.11-38**). **DIE ZWEI REVIEW-KORREKTUREN K1 UND K2 DER BAU-RUNDE
  SIND DAGEGEN ENTSCHEIDUNGEN GEWORDEN** — anders als in 11.11b, wo beide am Ort der
  Handlung blieben: Sie ändern, WAS entfernt wird, und nicht nur, wie es geschrieben ist.
- **11.11d — EIGENE BAUSTEINE** (ARCHITEKT, 2026-09-21). **GEBAUT UND LIVE BESTÄTIGT;
  VERDICHTET AM 2026-09-21 MIT DEM ABSCHLUSS-VERMERK P11.11-23** (docs/arbeitsweise.md,
  "Beim Abschluss-Vermerk wird der Zuschnitt verdichtet"). Was hier stand und wohin es
  gegangen ist — die Titel ohne Marke zitiert, damit eine Überschriften-Suche sie nicht
  trifft:
  - **Der Gegenstand** — Erkennen der Klasse `eigen` über UNSERE Konstanten, Warnen,
    Entfernen auf Klick, Veröffentlichen verweigern. **ABGELAUFEN:** gebaut, Bau-Commit
    `0b9bd7f`, Umfang und Live-Nachweis in VERMERK P11.11-23.
  - **Die Richtigstellung vom 2026-09-21** ("DAS GRUNDGERÜST AM ZERLEGTEN DOKUMENT ENTSTEHT
    MIT 11.11b, NICHT HIER"). **BLEIBT**, und zwar als Anweisung: Sie bindet die Scheibe
    11.11b, die aussteht. Ihre Begründung steht in ENTSCHEIDUNG P11.11-18.
  - **"REIHENFOLGE: 11.11d STEHT VOR CRAWL 2 UND VOR 11.11b"** samt dem Satz, dass die
    Buchstaben keine Reihenfolge tragen. **BLEIBT** — die erste Hälfte ist eingelöst, die
    zweite gilt der ganzen Phase.
  - **"DER GRUND, zweiteilig"** (keine fremde Signatur nötig; ein GEMESSENER Datenfehler
    statt einer Ableitung). **ABGELAUFEN ALS BEGRÜNDUNG DER VORZIEHUNG** — sie ist
    vollzogen. Der gemessene Datenfehler selbst steht in VERMERK P11.11-16.
  - **Der Zeiger auf die zwei Prüfsteine der Scheibe 11.11c.** **ABGELAUFEN, ABER NUR ZUR
    HÄLFTE, und die andere Hälfte ist der Befund:** Prüfstein 1 (der Round-Trip normalisiert
    den ganzen Editor-Text) ist eingelöst und gemessen — die Normalisierung tritt genau
    einmal ein und fiele beim nächsten Speichern ohnehin an (VERMERK P11.11-17, Punkte (a)
    und (b)). **PRÜFSTEIN 2 (`<noscript>`-Gegenstück) HAT IN 11.11d GAR NICHT GEGRIFFEN**,
    weil KEINER unserer eigenen Blöcke ein Rückfall-Element trägt. **Er gilt unverändert
    für 11.11c**, wo fremde Pixel entfernt werden, und ist dort NICHT erledigt.

  **WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST HERAUSGELÖST UND STEHT NICHT MEHR HIER:** das
  eine Urteil ohne Parser (**ENTSCHEIDUNG P11.11-18**), die Bauform des Entfernens samt
  Nachbedingung (**P11.11-19**), der Riegel auf dem Quelltext BEIDER Varianten und am Export
  (**P11.11-20**), die Oberfläche (**P11.11-21**), die sieben Freigaben zum Plan
  (**P11.11-22**) und die Ableitung der Meldungen aus dem aktuellen Text (**P11.11-24**, im
  Review entstanden und in keinem Zuschnitt vorgesehen gewesen).
- **11.11e — DIE FUNDLISTE NACH HOST BÜNDELN. GEBAUT UND LIVE BESTÄTIGT; VERDICHTET AM
  2026-09-22 MIT DEM ABSCHLUSS-VERMERK P11.11-42** (docs/arbeitsweise.md, "Beim
  Abschluss-Vermerk wird der Zuschnitt verdichtet"). Was hier stand und wohin es gegangen
  ist — die Titel ohne Marke zitiert, damit eine Überschriften-Suche sie nicht trifft:
  - **Der Gegenstand** — erkannte Funde offen oben, darunter eingeklappt "Weitere Skripte
    (N)", je HOST eine aufklappbare Gruppe, nach Anzahl aufsteigend, die Inline-Skripte als
    eigene Gruppe. **ABGELAUFEN:** gebaut, Bau-Commit `aad143e`, Umfang und Live-Nachweis
    in VERMERK P11.11-42.
  - **"NICHTS WIRD AUSGEBLENDET"** samt dem Anlass (eine echte Seite mit 136 Skripten) und
    dem verworfenen Pfad-Filter. **BLEIBT ALS ZUSAGE, ABGELAUFEN ALS BEGRÜNDUNG DER
    SCHEIBE:** Der Volltext mit Gründen und Provenienz steht unverändert in **ENTSCHEIDUNG
    P11.11-37** und wird hier nicht verdoppelt. **Die Zusage selbst ist seit dem Bau am DOM
    BELEGBAR** — `<details>` hält die Einträge im Dokument (ENTSCHEIDUNG P11.11-41, Punkt
    (F)), und SK20 nagelt es fest. **Der Digistore-Pfad steht live in seiner Gruppe**, nicht
    verborgen; das ist der Beleg an der Wirkung.
  - **"REIHENFOLGE: nach 11.11c, vor dem Phasenende"**. **ABGELAUFEN:** vollzogen.
  - **Die drei offenen Plan-Fragen** (Skripte ohne Host · was die Zahl der Überschrift zählt
    · die Texte). **ABGELAUFEN:** alle drei sind in **ENTSCHEIDUNG P11.11-41** entschieden —
    die Punkte (A) bis (D) für den Host, (H) für die zwei Zahlen, (H) und die Wortlaute im
    Bau-Prompt für die Texte.
  - **Die zwei Kandidaten aus dem Live-Test der Scheibe 11.11c** (kein Ortshinweis an
    Aufruf- und Handler-Zeilen · Zeilen desselben Anbieters stehen verstreut). **ABGELAUFEN
    ALS OFFENE FRAGE, GEBAUT ALS BEIDES:** aufgenommen mit **ENTSCHEIDUNG P11.11-40**,
    ausgestaltet in **P11.11-41**, Punkte (I) und (J), live belegt in VERMERK P11.11-42 —
    die drei Meta-Zeilen stehen untereinander, und die zwei Zeilen ohne Knopf tragen ihren
    Ausschnitt. **Ihr Fragetext ist mit dieser Verdichtung entfallen; sein Gegenstand und
    seine Auflage stehen vollständig in den zwei Entscheidungen**, und ein zweites Mal
    dasselbe hier liefe mit ihnen auseinander.

  **WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST HERAUSGELÖST UND STEHT NICHT MEHR HIER:** die
  Bündelung samt ihrem Anlass und dem verworfenen Filter (**ENTSCHEIDUNG P11.11-37**), die
  Aufnahme der zwei Kandidaten (**P11.11-40**) und die elf Freigaben zum Plan
  (**P11.11-41**). **KEINE REVIEW-KORREKTUR IST EINE ENTSCHEIDUNG GEWORDEN**, und das mit
  Grund: Die einzige Korrektur der Bau-Runde betraf einen TEST-HELFER, der unter einer
  Mutation das falsche Element griff — sie steht am Ort der Handlung, im Kommentar des
  Helfers, und im Abschluss-Vermerk. **Ein Test ist der stärkere Anker als eine Regel.**
  **EIN LAUF IST IM BAU ERGÄNZT WORDEN UND STAND IN KEINEM AUFTRAG:** SK26 deckt das
  RENDERN des Ortshinweises; ohne ihn wäre allein die Datenebene gedeckt gewesen.

**ZWEI PRÜFSTEINE FÜR DEN PLAN DER SCHEIBE 11.11c, und sie stehen SCHON HIER, weil beide
den Zuschnitt entscheiden und nicht erst den Bau:**
1. **EIN ENTFERNEN ÜBER EINEN `DOMParser`-DURCHLAUF NORMALISIERT DEN GANZEN EDITOR-TEXT,
   NICHT NUR DIE FUNDSTELLE.** Der Round-Trip schreibt Doctype, Tag-Schreibung und
   Attribut-Quoting neu; der Betreiber bekäme eine Datei zurück, die an tausend Stellen
   anders aussieht, obwohl er ein Script entfernt hat. **Wer das erst im Bau merkt, hat die
   Scheibe falsch geschnitten.**
2. **EIN META-PIXEL TRÄGT EIN `<noscript>`-GEGENSTÜCK**, und im inerten Dokument ist
   `<noscript>` ein gewöhnliches Element MIT KINDERN (Dauerregel EIN `DOMParser`-DOKUMENT
   PARST MIT AUSGESCHALTETEM SKRIPTING — WER KNOTEN DARAUS IN EINE LEBENDE SEITE ÜBERNIMMT
   …). Ein Entfernen, das nur das `<script>` nimmt, lässt das Rückfall-Bild stehen — und das
   zählt weiter.
   **ENTSCHIEDEN AM 2026-09-21 → ENTSCHEIDUNG P11.11-36, Punkt (F5):** Das Rückfall-Element
   gehört zum Fund und geht mit ihm; **und ein Bild-Fund OHNE Script daneben bekommt einen
   eigenen Knopf.** Die Frage, die ENTSCHEIDUNG P11.11-29 hierher verwiesen hat, ist damit
   beantwortet.
3. **DER PLATZ DES `<noscript>` ENTSCHEIDET, WAS BEIM ENTFERNEN ZURÜCKBLEIBT** (GEMESSEN
   an einer Sonde, CC, 2026-09-21, jsdom 29.1.1, im Plan der Scheibe 11.11b unter G4):
   Steht das `<noscript>` im **`head`**, ist es nach dem Parse **LEER** (`childElementCount
   = 0`), und sein `<img>` liegt im **`body`**; steht es im **`body`**, bleibt das `<img>`
   sein Kind. **FÜR DIE ERKENNUNG IST DAS FOLGENLOS** — beide Fälle findet ein
   dokumentweites `querySelectorAll("img, iframe")`, und genau deshalb erkennt 11.11b über
   die ADRESSE und nicht über den Platz (ENTSCHEIDUNG P11.11-12, Satz 6). **FÜR DAS
   ENTFERNEN IST ES NICHT FOLGENLOS:** Wer im `head`-Fall nur das `<img>` nimmt, lässt ein
   leeres `<noscript>` stehen; wer im `body`-Fall das `<noscript>` nimmt, nimmt das `<img>`
   mit. **Zwei Fälle, zwei Ergebnisse — und der Zuschnitt muss sagen, welches gewollt ist.**
   **ENTSCHIEDEN AM 2026-09-21 → ENTSCHEIDUNG P11.11-36, Punkt (F2): KANDIDAT (A), es wird
   NICHTS aufgeräumt.** Der Fragetext bleibt stehen, weil er den Grund trägt. **Der
   tragende Befund steht dort und nicht hier:** Das leere `<noscript>` im `head` entsteht
   bei JEDEM Rundlauf, also schon beim Speichern — 11.11c verursacht es nicht.
4. **EIN KNOTEN KANN MEHREREN ANBIETERN GEHÖREN**, und 11.11b zeigt ihn genau so an
   (ENTSCHEIDUNG P11.11-32, Punkt (d)). **FÜR DAS ENTFERNEN IST DAS EINE OFFENE FRAGE:** Ein
   Inline-Script, das `fbq(` UND `gtag(` ruft, lässt sich nicht "für einen Anbieter"
   entfernen — es geht ganz oder gar nicht. **Ein Klick "Meta entfernen", der ausserdem
   Google mitnimmt, ist genau der Fehltreffer, vor dem die Roadmap-Zeile 11.11 unter (e)
   warnt.** Wie 11.11c damit umgeht — den Knoten gar nicht anbieten, warnen, oder eine
   andere Form —, ist hier NICHT entschieden.
   **ENTSCHIEDEN AM 2026-09-21 → ENTSCHEIDUNG P11.11-35, Satz (d), UND P11.11-38:** Der
   Knopf **NENNT ALLE** beteiligten Anbieter ("Meta und Google-Tag aus dem Code
   entfernen") — damit ist der Klick keine Willkür mehr, sondern sagt, was er tut. **UND
   DER FALL AUS DEM FRAGETEXT KOMMT SEIT P11.11-38 GAR NICHT MEHR VOR:** Ein Inline-Script,
   das `fbq(` UND `gtag(` ruft, trägt keine Lade-Adresse, ist ein AUFRUF und bekommt
   überhaupt keinen Knopf. Mehrere Anbieter an EINEM Knopf gibt es nur noch, wo ZWEI
   Lade-Adressen in einem Script stehen — dort ist es die Grenze aus P11.11-38 und gewollt.
   Der Fragetext bleibt stehen, weil er den Fehltreffer benennt, gegen den beides gebaut
   ist.

5. **EIN CONTAINER WIRD NIE ZUM ENTFERNEN ANGEBOTEN** (ENTSCHEIDUNG P11.11-27). **ER STEHT
   HIER, WEIL DIE MUTATION, DIE IHN PRÜFEN WÜRDE, IN 11.11b NICHT FAHRBAR WAR:** M5b
   ("Container mit Entfernen-Angebot") setzt eine Handlung voraus, die jene Scheibe per
   ENTSCHEIDUNG P11.11-31 gar nicht hat — sie ist als NICHT FAHRBAR protokolliert und
   hierher weitergereicht (VERMERK P11.11-33). **11.11c IST DIE ERSTE SCHEIBE, IN DER SIE
   FAHRBAR IST, und sie ist dort PFLICHT:** Bis dahin ist die Zusicherung "kein Entfernen
   am Container" von KEINEM Lauf gedeckt, der rot werden könnte.
   **ERLEDIGT AM 2026-09-21 → VERMERK P11.11-39:** Die Mutation ist als **M2** gefahren und
   **ROT** geworden — fünf Läufe, darunter der Bestandslauf `SK4` aus 11.11b, der genau
   diese Zusicherung trägt. Die Regel selbst liegt seither als `entfernbar` in
   `foreign-scan.ts` (ENTSCHEIDUNG P11.11-36, Punkt (F1)-Umfeld) und nicht im JSX.
6. **DIE OWNER-FRAGE ZUM GOOGLE-TAG GEHÖRT IN DEN PLAN 11.11c, NICHT IN DEN BAU**
   (ENTSCHEIDUNG P11.11-32, Punkt (b)). Der Google-Tag trägt die Klasse `pixel`, und ein
   Pixel bekommt nach ENTSCHEIDUNG P11.11-3 ein Entfernen-Angebot. **DERSELBE TAG BEDIENT
   ABER AUCH ANALYTICS, Campaign Manager, Display & Video 360 und Search Ads 360**
   (docs/ziel-befunde.md, Google-Abschnitt, Teil (cs)). **Ein Klick "entfernen" nähme dem
   Betreiber möglicherweise seine Analytics mit, nicht nur unser Ziel.** In 11.11b war das
   folgenlos — die Klasse setzte allein das Etikett. **IN 11.11c IST ES EINE
   OWNER-ENTSCHEIDUNG und keine Code-Frage**, und sie fällt VOR dem Bau.
   **ENTSCHIEDEN AM 2026-09-21 → ENTSCHEIDUNG P11.11-34: Der Google-Tag WIRD zum Entfernen
   angeboten, mit einem Hinweis am Knopf, dass derselbe Tag auch Google Analytics und
   weitere Google-Produkte tragen kann.** Der Fragetext bleibt stehen, weil er den Grund
   trägt; ohne ihn liest sich das Angebot wie eine Selbstverständlichkeit. **Der Tag
   Manager ist davon NICHT berührt** (ENTSCHEIDUNG P11.11-27).

**HIER STAND "ZWEI PRÜFSTEINE", UND DIE ÜBERSCHRIFT DES ABSATZES BLEIBT SO** — sie wird
zitiert, und eine Umbenennung machte jedes Zitat halb falsch (docs/immer-beachten.md, EIN
ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT). **Es sind seit
dem 2026-09-21 SECHS**; die Angabe steht in diesem Satz, nicht im Titel. Hier stand
zwischenzeitlich "VIER" — die Prüfsteine 5 und 6 sind mit dem Abschluss der Scheibe 11.11b
dazugekommen, weil beide erst dort entstanden sind: der eine aus einer nicht fahrbaren
Mutation, der andere aus einer Freigabe, die die Frage ausdrücklich weiterreicht.

**DIE REIHENFOLGE a → b → c IST NICHT BELIEBIG**, aber auch nicht zwingend: a ist von b und
c unabhängig und könnte jederzeit laufen; **c setzt b voraus**, weil es ohne Fund nichts zu
entfernen gibt. Wann gebaut wird, ist hier NICHT entschieden.

### ZUSCHNITT DER SCHEIBE 11.11a — DER SANDBOX-WÄCHTER

**VERDICHTET AM 2026-09-21 MIT DEM ABSCHLUSS-VERMERK P11.11-8** (docs/arbeitsweise.md,
"Beim Abschluss-Vermerk wird der Zuschnitt verdichtet"). Was hier stand und wohin es
gegangen ist — die Titel ohne Marke zitiert, damit eine Überschriften-Suche sie nicht
trifft:

- **"WAS SIE BAUT"** nannte die drei Zusicherungen. **ABGELAUFEN:** Sie sind gebaut und
  stehen als S1–S4 und V1–V4 in `src/components/CodeImporter.test.tsx`; der Umfang steht in
  VERMERK P11.11-8.
- **Die Invariante "NUR TESTDATEIEN. KEIN PRODUKTIVCODE"** war eine Anweisung an DIESE
  Scheibe. **ABGELAUFEN UND EINGELÖST:** VERMERK P11.11-8 führt den sha256 von
  `src/components/CodeImporter.tsx` vor und nach dem Bau als identisch.
- **Die drei Bauform-Invarianten — gerendertes Attribut statt Quelltext · Vergleich ohne
  Rücksicht auf Gross-/Kleinschreibung · getrennte Werte statt Teilzeichenkette.**
  **ABGELAUFEN ALS ANWEISUNG, ERHALTEN AM ORT DER HANDLUNG:** Alle drei stehen mit ihrer
  Begründung im Kommentarkopf des Wächters selbst — einschliesslich des Satzes, dass die
  Case-Insensitivität eine ABLEITUNG aus der Spezifikation ist und KEINE Messung, und
  einschliesslich des gemessenen jsdom-Befunds, der die Bauform erzwingt. **Ein Test ist
  der stärkere Anker als ein Zuschnitt, der abläuft.**
- **"WAS SIE AUSDRÜCKLICH NICHT TUT"** — kein Rahmen geändert, keiner hinzugefügt, keine
  Aussage über den echten Browser. **ABGELAUFEN BIS AUF DIE LETZTE HÄLFTE**, und die steht
  jetzt zweimal dort, wo sie gebraucht wird: als Grenze im Kommentar des Wächters und als
  Grenze in VERMERK P11.11-8.

**WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST HERAUSGELÖST UND STEHT NICHT MEHR HIER:** die
abschliessende Werteliste je Rahmen samt der Herkunft jedes Werts und der Auflage an jede
spätere Runde — **jetzt ENTSCHEIDUNG P11.11-9** im Abschnitt "Entscheidungen, die über ihre
Scheibe hinaus binden". Sie hiess im Zuschnitt **E1**; dieser Zeiger löst den alten Namen
auf.

---
