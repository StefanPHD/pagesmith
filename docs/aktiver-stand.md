# Phase 11.12 — Vorschau-Blocker: Aufklärung und Reparatur: DER AKTIVE STAND

**WAS DIESE DATEI IST:** der steuernde Stand der laufenden Phase 11.12 — das, was jeweils
gilt, nicht das, was geworden ist. Sie heisst `docs/aktiver-stand.md` und behält diesen
Namen bis zum Phasenende; an ihm hängt der Verfahrensslot ("existiert sie nicht, läuft
keine Phase").

**SIE IST AB JETZT DAS PFLICHT-GATE ("Auftrag 0") JEDES BAU- UND AUFKLÄRUNGS-PROMPTS
DIESER PHASE.** Sie wird ZUERST gelesen — vor dem Plan, nicht während des Baus.

**IHR VORRANG IST ENG UND GILT NUR NACH INNEN:** Wo sie einer FRÜHEREN Fassung aus DIESER
Phase widerspricht, gilt sie. **Gegenüber docs/immer-beachten.md und docs/arbeitsweise.md
hat sie KEINEN Vorrang** — jene Dateien stehen über ihr, und eine Standdatei kann eine
Dauerregel weder lockern noch überschreiben. Einen weitergehenden Vorrang kennt
docs/arbeitsweise.md nicht (GELESEN, CC, 2026-09-17); wer ihn hier hineinliest, macht aus
einem Arbeitsstand eine Regelquelle.

**ANGELEGT AM 2026-09-17**, vor der ersten Handlung der Phase — **und genau das steht als
Hebungs-Kandidat P11.12-1 zur Änderung an.**

**STAND NACH DER SCHEIBE 11.12a (2026-09-17):** ZWEI Vermerke (P11.12-1 Aufklärung,
P11.12-2 die gebaute Scheibe) · ZWEI bindende Entscheidungen · VIER Vorrats-Einträge ·
ZWEI Hebungs-Kandidaten. Der Zuschnitt der Scheibe 11.12a ist **abgelaufen und verdichtet**.
**GEBAUT UND LIVE BESTÄTIGT IST DIE SCHEIBE 11.12a** (Bau-Commit `c3b068f`); der Marker der
Roadmap-Zeile 11.12 steht weiterhin auf `[ ]` — er gehört zum Phasenende, nicht zur Scheibe.

**DAS PROTOKOLL DER HEBUNG — 2026-09-17, RUNDE 1 DES PHASENENDES.** Nichts ist umbenannt
oder gelöscht; das ist Runde 2. An jeder gehobenen Stelle steht ein Zeiger — ohne ihn wäre
ein umgezogener Eintrag von einem nie dagewesenen nicht zu unterscheiden.
- **VORRAT — VIER EINTRÄGE, 2 / 2 / 0.** Als offene Punkte gehoben: **P11.12-1** und
  **P11.12-3**, nach docs/offene-punkte.md, Abschnitt "AUS DEM PHASENENDE 11.12 GEHOBEN
  (2026-09-17)", je mit Stub in CLAUDE.md. Ins Backlog: **P11.12-2** und **P11.12-4**, nach
  docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.12 gehoben (2026-09-17)".
  **GESTRICHEN IST KEINER** — kein Eintrag hat seinen Gegenstand verloren.
  DAS KRITERIUM WAR ZWEITEILIG (benennbarer Trigger UND „geht sonst still kaputt") und hat
  scharf getrennt: P11.12-2 trägt keine stille Kaputtheit (das Verhalten bleibt richtig),
  P11.12-4 verweigert einen Trigger im eigenen Text.
- **HEBUNGS-KANDIDATEN — ZWEI, beide ins Backlog** als ÄNDERUNGSANTRÄGE an
  docs/arbeitsweise.md in Wartestellung, neben denen der Phasen 11.3 und 11.5. **KEINE
  Regeln.** Entschieden werden sie vom Owner.
- **ENTSCHEIDUNGEN — ZWEI, KEINE GEHOBEN.** Beide sind am ORT DER HANDLUNG verankert: der
  Kopfkommentar von `src/lib/preview-storage-shim.ts` trägt P11.12-1 zweimal und P11.12-2
  im Abwesenheits-Absatz, und der Wächter T1 wird bei einer Verletzung von P11.12-2 rot
  (GEMESSEN am Code, CC, 2026-09-17). Sie bleiben im Archiv der Phase; an ihrem Eintrag
  steht der Zeiger "→ NICHT GEHOBEN 2026-09-17" mit diesem Grund.

**docs/immer-beachten.md IST UNBERÜHRT, UND DAS IST KEINE AUSLASSUNG.** Aus dieser Phase ist
keine Dauerregel entstanden: Was dauerhaft bindet, bindet den RIEGEL — und der ist genau ein
Baustein an genau zwei Aufrufstellen, nicht ein projektweites Prinzip. Eine Regel dorthin
hätte einen Gegenstand beschrieben, den es nur einmal gibt. Beim Durchgehen der Standdatei
ist nichts gefunden worden, das eine Dauerregel sein müsste.

**SIE IST NICHT GETEILT, UND SIE DARF ES HEUTE NICHT SEIN.** docs/arbeitsweise.md, Die
Standdatei: "UNTERHALB VON 4000 ZEILEN WIRD NICHT GETEILT" — ein Verbot, keine Schwelle
(GELESEN, CC, 2026-09-17). Archiv und Vorratsdatei entstehen erst mit einem Schnitt, und
der ist eine eigene zugeschnittene Arbeit. Eine Phase, die nie geteilt wird, hat sie nie.

---

## Abschnitts-Verzeichnis

Jeder Eintrag ist der wörtliche Anfang seiner Überschrift, ohne Marke — damit "lies
Abschnitt X plus das Verzeichnis" eine belegbare Aussage über den Umfang ist. Eine
Überschrift steht in dieser Datei damit ZWEIMAL, und die erste Fundstelle ist der
Verzeichnis-Eintrag (docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN
EINER DATEI MIT VERZEICHNIS NICHT). Wer bearbeitet, ankert entsprechend.

1. Abschnitts-Verzeichnis
2. Gegenstand und Ausgangslage
3. Was den Zuschnitt bindet
4. Die offenen Fragen der Aufklärung
5. Wie diese Datei fortgeschrieben wird
6. Die Nummernform — entschieden: P11.12-n
7. Zuschnitt der Scheibe 11.12a — ABGELAUFEN, verdichtet am 2026-09-17
8. Vermerke
9. Entscheidungen, die über ihre Scheibe hinaus binden
10. Vorrat — gemeldet, nicht gebaut
11. Hebungs-Kandidaten

---

## Gegenstand und Ausgangslage

**QUELLE DIESES ABSCHNITTS IST AUSSCHLIESSLICH docs/roadmap.md, Roadmap-Zeile 11.12**
(GELESEN im Volltext, CC, 2026-09-17). Was dort nicht steht, steht auch hier nicht; die
Provenienz-Angaben sind die der Roadmap-Zeile und werden nicht verstärkt.

**(a) DAS SYMPTOM.** Eine importierte Seite blinkt im Rahmen auf und bleibt leer — im
Editor wie in der Vorschau. Live wird sie korrekt dargestellt. Die Konsole meldet im
Kontext `about:srcdoc` einen SecurityError beim Lesen von `document.cookie`, mit dem
Hinweis, das Dokument sei sandboxed und trage `allow-same-origin` nicht; derselbe Fehler
erscheint zusätzlich als UNCAUGHT. Eine Anfrage derselben Seite scheitert an einer
CORS-Regel mit Ursprung `null`.
PROVENIENZ (aus der Roadmap-Zeile übernommen): OWNER-ANGABE vom 2026-09-14, abgelesen an
der Konsole im Rahmen der Vorschau. **Den Konsolen-Auszug hat CC nicht gesehen.**

**(b) WAS AM CODE DAZU PASST.** Beide Rahmen in `CodeImporter`
(`src/components/CodeImporter.tsx`) laden den Text über `srcDoc` und tragen einen
Sandkasten ohne `allow-same-origin` — der Editor-Rahmen `sandbox="allow-scripts"`, die
funktionale Vorschau `sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"`.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-14), Angabe der Roadmap-Zeile.

**(c) UNSER CODE ERKLÄRT DEN WURF NICHT.** Der einzige Zugriff auf `document.cookie` in
dem, was wir in die Rahmen bringen, steht in `buildCapiBeaconStatement`
(`src/lib/tracking/meta.ts`) — innerhalb eines `try` und erst beim Feuern eines Klicks.
Einen ungefangenen Wurf beim Laden kann er nicht erzeugen, und im Editor-Rahmen gibt es ihn
gar nicht.
PROVENIENZ: die Zuordnung am Konsolen-Auszug ABGELESEN (Owner/Architekt, 2026-09-14), von
CC nicht eingesehen; die Code-Aussage AM CODE GESTÜTZT, NICHT BEWIESEN (CC, 2026-09-14).
**Der Unterschied ist der tragende Teil: gestützt heisst, dass unser Code den Wurf nicht
erklärt — nicht, dass fremder Code ihn nachweislich erzeugt.**

**(d) DIE SCHWERE.** Wer die Seite nicht sieht, kann nichts verdrahten — weder Texte noch
Knöpfe. Das ist der Kern-Loop des Produkts. PROVENIENZ: ARCHITEKT-ANGABE 2026-09-14.

**(e) DER TRIGGER, UND ER IST KEIN WUNSCH: DER ERSTE FREMDE NUTZER.** Heute testet der
Owner allein und kommt am Editor vorbei; ein fremder Nutzer kann das nicht. Der Trigger
hängt an derselben Bedingung wie CLAUDE.md, "## Modus", dort am zweiten der drei Trigger:
"das erste FREMDE Nutzerkonto legt ein Projekt an". PROVENIENZ: ARCHITEKT-ANGABE
2026-09-14; der Trigger-Absatz in CLAUDE.md GELESEN (CC, 2026-09-14).

**(f) EINE GRENZE, DIE AUS DER PHASE 11.5 HERÜBERREICHT.** Die Live-Nachweise der Scheiben
11.5a bis 11.5d liefen auf Seiten, die im Rahmen funktionieren. **Ob eine Seite, die dort
stirbt, live anders auf unsere Einwilligungs-Bausteine reagiert, ist UNGEMESSEN.**
PROVENIENZ: ARCHITEKT-ANGABE 2026-09-14.

**WAS DIE ROADMAP-ZEILE AUSDRÜCKLICH NICHT TUT und was deshalb auch hier nicht steht:** Sie
schneidet nichts zu, sie terminiert nichts, und sie schlägt keine Reparatur vor. Ihr Punkt
(e) sagt: "DER ZUSCHNITT ENTSTEHT ERST NACH EINER AUFKLÄRUNG. DIESE ZEILE ENTSCHEIDET
NICHT, WIE REPARIERT WIRD."

---

## Was den Zuschnitt bindet

**(B1) DIE SANDBOX-REGEL — WÖRTLICH.** docs/immer-beachten.md führt sie als Dauerregel;
sie lädt unbedingt in jeder Sitzung. Der Wortlaut (GELESEN am Repo, CC, 2026-09-17):

> Importierter User-Code läuft NUR im sandboxed iframe (sandbox="allow-scripts",
> niemals allow-same-origin), nie ungesandboxt.

**SIE IST KEINE EMPFEHLUNG UND STEHT IN DIESER PHASE NICHT ZUR DISPOSITION.** Die
Roadmap-Zeile 11.12 nennt sie unter (d) ausdrücklich als das, was NICHT der Weg ist, und
begründet es: fremdem Code Zugriff auf den Ursprung der Anwendung zu geben; ein
`srcDoc`-Dokument erbt ohne Sandkasten den Ursprung der einbettenden Seite
(Plattform-Aussage, in jener Runde NICHT gemessen). Am Editor-Rahmen steht dieselbe Auflage
zusätzlich als Kommentar im Code (Angabe der Roadmap-Zeile, GEMESSEN CC, 2026-09-14).
**JEDER ZUSCHNITT DIESER PHASE HÄLT DIESE REGEL EIN.** Eine Aufklärung, die mit ihrer
Lockerung endet, hat die Frage verfehlt, nicht beantwortet.

**(B2) DIE REIHENFOLGE UND DER RANG DER AUFKLÄRUNG.** 11.12 → 11.13 → 11.6 → 11.11. Die
Aufklärung entscheidet den ZUSCHNITT, nicht das OB. Kein Ausweichen auf eine andere Phase,
falls 11.12 sich als schwer erweist.
PROVENIENZ: **OWNER-ENTSCHEIDUNG 2026-09-16, am 2026-09-17 im Chat bestätigt, am Repo nicht
belegt.**
**WARUM SIE HIER STEHT UND NICHT IN DER ROADMAP:** Die Roadmap-Zeile 11.12 trägt sie NICHT.
Ihr Punkt (g) sagt im Gegenteil: "DIE NUMMER TRÄGT KEINE REIHENFOLGE … Wann diese Phase
gebaut wird, ist hier NICHT entschieden." **Das ist kein Widerspruch, sondern eine Lücke:**
Jene Zeile entscheidet die Reihenfolge nicht, sie bestreitet sie auch nicht. Wer beides
zusammenzieht, hält die Owner-Entscheidung für widerlegt. GEMESSEN am Repo (CC, 2026-09-17,
Achse: die vier Nummern paarweise und `Reihenfolge` neben einer der vier, über alle
verfolgten Dateien, mit Positivkontrolle auf die Nummernform) — **die Reihenfolge selbst
steht im Repo an keiner Stelle.** Die Achse hat GENAU EINEN Treffer, und er sagt etwas
anderes: die Roadmap-Zeile 11.6 führt dieselbe Figur wie 11.12 unter (g) — "DIE NUMMER
TRÄGT KEINE REIHENFOLGE: 11.6 steht hinter 11.5, weil davor nur vier Nummern frei waren".
**Das ist kein Gegenbeleg, sondern dieselbe Lücke ein zweites Mal** — und der Treffer steht
hier, weil ein unterschlagener Treffer aus einem Nicht-Treffer eine stärkere Aussage macht,
als die Messung hergibt.

**(B3) WAS DIE PHASE NICHT IST.** Sie gehört nicht zur Phase 11.5 und ist kein Teil ihrer
Scheiben (Angabe der Roadmap-Zeile 11.12, GELESEN CC, 2026-09-17). Nichts über diese
laufende Phase geht in CLAUDE.md; dort steht allein die Stub-Zeile mit ihrem Marker
(docs/arbeitsweise.md, Die Standdatei).

---

## Die offenen Fragen der Aufklärung

**DIES SIND FRAGEN, KEINE WEGE.** Sie stehen OHNE Rangfolge und OHNE Empfehlung; die
Reihenfolge der Aufzählung ist keine Wertung. Der Wortlaut der vier Fragen bleibt, wie er
angetreten ist — nachgezogen wird ihr STAND.

**DER STAND AM 2026-09-17, je mit Zeiger:**
- **(F1) BEANTWORTET** — VERMERK P11.12-1, Teil A. Der Ladeweg ändert den Ursprung nicht.
- **(F2) FÜR DIE BETROFFENE SEITE GESTÜTZT, ALLGEMEIN OFFEN** — VERMERK P11.12-2. Dass jene
  Seite nach dem Riegel rendert, ist live bestätigt; dass der Wurf bei ANDEREN Seiten den
  Aufbau abbricht, bleibt ungemessen.
- **(F3) BEANTWORTET UND GEBAUT** — VERMERK P11.12-2, Scheibe 11.12a. Mit den zwei
  gemessenen Grenzen: der Riegel ist aufzählend und über den Prototyp umgehbar.
- **(F4) OFFEN — UND SIE IST NICHT DURCH (F3) GEGENSTANDSLOS GEWORDEN.** Der Riegel ist kein
  zweiter Vorschau-Weg, sondern ein Abfangen INNERHALB des bestehenden; er nimmt der Frage
  den Druck, nicht den Gegenstand. Verengt ist sie allein auf der Ladeweg-Achse (Teil A,
  gemessen: `blob:` verhält sich wie `srcdoc`) — jeder andere denkbare Weg ist unberührt.
  Ebenso offen bleibt die Nebenfrage darunter, was eine Seite verliert, die auf ihren
  Ursprung angewiesen ist; Vorrat P11.12-1 ist der Beleg, dass etwas verlorengeht.

Was eine künftige Runde daraus macht — welche sie aufgreift, in welcher Tiefe, mit welchem
Instrument —, ist hier NICHT entschieden.

**(F1) Verhält sich ein `srcdoc`-Rahmen anders** als ein Rahmen, der seinen Inhalt auf
einem anderen Weg bekommt?

**(F2) Bricht der Wurf wirklich den Aufbau ab, oder ist er nur laut?** Das Symptom
("blinkt auf und bleibt leer") und der Wurf sind bisher NEBENEINANDER beobachtet worden;
dass der eine den anderen verursacht, ist an keiner Stelle gemessen.

**(F3) Lassen sich die origin-gebundenen Zugriffe abfangen, bevor fremder Code sie
erreicht?** Die Roadmap-Zeile 11.12 führt dieselbe Frage unter (e) — "ob der Wurf
abzufangen ist, ohne den Sandkasten zu öffnen" — und lässt sie offen.

**(F4) Ist ein zweiter Vorschau-Weg denkbar, der die Sandbox-Regel (B1) einhält?**

**EINE FRAGE, DIE DIE ROADMAP-ZEILE UNTER (e) DANEBEN STELLT und die hier nicht verloren
gehen soll:** was eine Seite verliert, die auf ihren Ursprung angewiesen ist.

PROVENIENZ dieses Abschnitts: (F1) bis (F4) sind die Fragen des Auftrags, unter dem diese
Datei angelegt worden ist — ARCHITEKT-ANGABE 2026-09-17, im Repo nicht belegt. Die
Teilsätze zu (F3) und die Nebenfrage sind der Roadmap-Zeile 11.12, Punkt (e), entnommen
(GELESEN, CC, 2026-09-17). Der Zusatz zu (F2) ist eine ABLEITUNG aus der Provenienzlage
unter Gegenstand und Ausgangslage, Punkt (a) und (c) — keine Messung.

---

## Wie diese Datei fortgeschrieben wird

**FORTGESCHRIEBEN WIRD** mit dem Abschluss-Vermerk einer Scheibe, nach dem Live-Test, im
selben Zug wie die Verdichtung des Zuschnitts (docs/arbeitsweise.md, Die Standdatei;
GELESEN, CC, 2026-09-17).

**PROVENIENZ AN JEDER ANGABE:** gemessen (am Repo oder live, mit Datum), gelesen (mit
Quelle) oder als Owner- bzw. Architekten-Angabe gekennzeichnet. **Als Ort steht der
SYMBOLNAME, nie eine Zeilennummer** — sie altert mit dem nächsten Commit.

**DIE LÜCKEN-REGEL:** Ein Vermerk ohne Commit-Nummer ist der jüngste, noch nicht
committete. Es darf immer nur EINE Lücke geben — stehen zwei da, ist etwas
liegengeblieben; geschlossen wird sie in Auftrag 0 der nächsten Runde.

**TITEL-ZITATE OHNE MARKE.** Wer eine Überschrift dieser Datei zitiert — etwa beim
Verdichten eines abgelaufenen Zuschnitts —, schreibt sie ohne die Überschriften-Marke, sonst
kollidiert das Zitat dauerhaft mit jeder künftigen gleichlautenden Überschrift
(docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
VERZEICHNIS NICHT, Zusatz vom 2026-08-27).

---

## Die Nummernform — entschieden: P11.12-n

**DIE ENTSCHEIDUNG:** Vermerke, Vorrats-Einträge, Entscheidungen und Hebungs-Kandidaten
dieser Phase tragen die Form **`P11.12-n`** — Buchstabe vorn, dann die Phasennummer, dann
die laufende Zahl. Also VERMERK P11.12-1, Vorrat P11.12-1, Entscheidung P11.12-1,
Hebungs-Kandidat P11.12-1. Die vier Zählungen laufen unabhängig voneinander, wie bisher.
PROVENIENZ: **ARCHITEKT-SETZUNG 2026-09-17, ohne Owner-Einwand.**

**DER GRUND, ZWEITEILIG.** (1) Die PHASENNUMMER wird nie neu vergeben. Ein Zeiger auf
`P11.12-1` bleibt deshalb auch nach der Archivierung eindeutig und löst über das Archiv
der Phase auf — er stirbt nicht mit dem Umzug der Datei. (2) Die alten toten Zeiger
bleiben TOT statt falsch, weil diese Phase ihre Nummern nie erreicht. Ein toter Zeiger
zwingt zum Suchen, ein falscher nicht.

**WARUM DER BUCHSTABE VORNE STEHT UND NICHT DIE ZIFFER — GEMESSEN (CC, 2026-09-17), mit
Negativkontrolle:** Eine Suche nach `VERMERK 11` trifft die Zeile `VERMERK 11.12-1` mit,
und eine Suche nach `VERMERK 1` trifft beide plus `VERMERK 1` selbst; die Kontrollsuche
nach `VERMERK 2` bleibt leer. **Ohne führenden Buchstaben wäre die Kollision also nicht
beseitigt, sondern verschoben** — jeder Zeiger dieser Phase würde bei einer Präfix-Suche
nach den alten Nummern mitgefunden. Mit `P` davor entsteht kein solcher Treffer.

**VERWORFEN, je mit dem Grund:** eine Zählung ab 1 wie bisher — sie kollidiert, und zwar
sofort beim ersten Vermerk · ein Zählbeginn oberhalb aller belegten Nummern — er hilft
GENAU EINMAL und lässt die nächste Standdatei dasselbe Problem neu lösen · das Nachziehen
der bestehenden Zeiger auf ihren Archivpfad — in ANGEWANDTEN Migrationen ist es nie
heilbar (docs/immer-beachten.md, ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH
UMGESCHRIEBEN), und drei solche Zeiger stehen dort.

**DIE GRENZE, UND SIE IST TRAGEND:** Diese Entscheidung gilt **DIESER PHASE**. Ob die Form
zur Bauform JEDER Standdatei wird, ist hier NICHT entschieden — das wäre ein
ÄNDERUNGSANTRAG an docs/arbeitsweise.md und damit Weg 7 (CLAUDE.md, "## Aktive
Dokumente"). Wer sie ohne diesen Antrag verallgemeinert, ändert das Verfahren an einer
Standdatei vorbei.

**DER BEFUND, DER DIE ENTSCHEIDUNG TRÄGT, BLEIBT STEHEN:**

**DER BEFUND — GEMESSEN am Repo (CC, 2026-09-17).** Achse: jede verfolgte Datei, der Pfad
`docs/aktiver-stand.md` mit einer Nummernform (`VERMERK n`, `Vorrat (n)` bzw.
`Vorrats-Eintrag n`, `Entscheidung (n)`, `Hebungs-Kandidat n`) in derselben Zeile oder bis
zu zwei Zeilen davor oder danach; Positivkontrolle gegen einen im Bestand benannten Treffer
und Negativkontrolle mit einer erfundenen Nummernform, beide im selben Lauf. **Belegt sind
Zeiger auf VERMERK 1, 3, 5, 6, 10, 14 und 16 · Vorrat (13) und (28) · Vorrats-Eintrag 5, 6,
12, 40, 41, 42 und 50 · Entscheidung (2), (5) und (12) · Hebungs-Kandidat 2 und 6.**

**WAS DAS HEUTE BEDEUTET — UND WAS NICHT.** Solange diese Datei keine Nummer trägt, bleiben
jene Zeiger TOT; sie zwingen zum Suchen. Sie werden FALSCH in dem Moment, in dem eine Nummer
dieser Datei eine von ihnen erreicht — dann trifft der Zeiger einen existierenden, aber
falschen Eintrag, und nichts meldet es. Der Posten ZEIGER AUF docs/aktiver-stand.md MEINEN
EINE FRÜHERE STANDDATEI … (docs/offene-punkte.md) beschreibt genau diesen Mechanismus; sein
Trigger ist mit dem Anlegen dieser Datei EINGETRETEN. **Er verlangt keine Handlung und
trifft keine Wahl: "KEINE EMPFEHLUNG, ob, wann und in welcher Reihenfolge sie nachgezogen
werden."** (GELESEN im Volltext, CC, 2026-09-17.)

**MIT DER FORM `P11.12-n` TRITT DER ZWEITE FALL NICHT EIN.** Die Zeiger bleiben tot; nichts
an ihnen wird nachgezogen, und der Posten in docs/offene-punkte.md bleibt unberührt.

---

## Zuschnitt der Scheibe 11.12a — ABGELAUFEN, verdichtet am 2026-09-17

**DIE SCHEIBE IST GEBAUT UND LIVE BESTÄTIGT** (VERMERK P11.12-2). Der Zuschnitt hat damit
seinen Zweck erfüllt; was über die Scheibe hinaus bindet, steht unter Entscheidungen —
P11.12-1 und P11.12-2 — und wird hier NICHT wiederholt.

**WAS ABGELAUFEN IST** (Titel ohne Marke, damit das Protokoll weiter gegen etwas misst und
eine Überschriften-Suche sie nicht trifft):
- GEGENSTAND — der Riegel für `document.cookie`, `localStorage`, `sessionStorage` in beiden
  Editor-Rahmen.
- DER WÄCHTER-TEST TRÄGT ZWEI BEHAUPTUNGEN — Riegel abwesend in Export und Veröffentlichung
  mit Positivkontrolle in beiden Rahmen; Editor-Brücke dort ebenfalls abwesend. Beides
  gebaut als T1 und T2.
- OFFENE PLAN-FRAGEN — FRAGEN, KEINE VORGABEN. Alle drei sind unten geschlossen.
- AUSDRÜCKLICH NICHT TEIL DIESER SCHEIBE — Netzanfragen mit Ursprung `null`, andere Browser
  als Chromium, jede Änderung an `generateFunctional`, der Kommentarkopf von
  `src/lib/generate.ts`. Alle vier sind eingehalten; die ersten beiden stehen als Vorrat
  P11.12-1 und P11.12-4, der letzte als Vorrat P11.12-2.
- STATUS — „zugeschnitten, nicht freigegeben und nicht gebaut". Überholt.

**DIE DREI OFFENEN PLAN-FRAGEN, JE MIT ANTWORT UND FUNDSTELLE:**

**(1) Wird `indexedDB` mit ersetzt?** **NEIN.** Gemessen: `indexedDB`, `IDBFactory`, `idb`
haben in ganz `src/` null Fundstellen — nichts von uns braucht es. Ein halber Ersatz wäre
schlechter als keiner: Code, der ihn feature-detected und später an einer kaputten
Transaktion scheitert, scheitert unklarer als Code, der sofort den `SecurityError` sieht.
PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-17; die Messung CC, 2026-09-17.
FUNDSTELLE: Grenze (1) im Kopfkommentar von `src/lib/preview-storage-shim.ts`; die
verbleibende Lücke als Vorrat P11.12-3.

**(2) In welcher Reihenfolge steht der Riegel zum Varianten-Marker?** **Sie berühren
einander nicht** — der Marker hängt hinter `</html>`, der Riegel sitzt im `<head>`.
Tragend ist etwas anderes, das die Frage nicht vorhersah: **der Riegel setzt NACH
`editPreviewHtml` an**, weil ein Bestandstest in `src/lib/generate.test.ts` dessen
Rückgabewert als byte-gleich zu `previewHtml + editVariantMarker(…)` festnagelt. Ein
Eingriff IN jene Funktion hätte ihn gebrochen.
FUNDSTELLE: der Kommentar am `editHtml`-Memo in `src/components/CodeImporter.tsx`.
**DIE FRAGE HAT ZUSÄTZLICH EINEN WEG AUSGESCHLOSSEN:** Ein zweiter DOMParser-Rundlauf zöge
den Marker von hinter `</html>` INNERHALB des Dokuments — er bliebe auffindbar, seine
begründete Position wäre still zerstört. Das ist der Grund gegen den Parser, nicht die
Rechenzeit.

**(3) Wie verhalten sich unsere Einwilligungs-Bausteine in der Vorschau mit Speicher im
Arbeitsspeicher?** **DIE FRAGE HAT EINE LEERE MENGE ALS GEGENSTAND.** In der Vorschau steht
KEIN Baustein von uns, der Speicher anfasst: `generateFunctional` hängt allein
`CONSENT_SCRIPT_ID` und `buildConsentRuntimes()` ein — das reine Urteil über
`window.pagesmithConsent`, ohne Speicher-Zugriff. Die speicher-anfassenden Blöcke
(`buildConsentRestoreScript` als einziger `localStorage`-Träger, dazu `consent-bar`,
`consent-modal`, `consent-setter`) kommen ausschliesslich über `injectPageViewEmitter`,
dessen einziger Produktiv-Aufrufer in `src/app/projects/actions.ts` steht — dem
Veröffentlichungs-Pfad.
GEMESSEN am Code (CC, 2026-09-17); LIVE BESTÄTIGT (OWNER-ANGABE 2026-09-17, Schritt 9).
**DIE EINZIGE STELLE, DIE SICH ÜBERHAUPT ÄNDERT:** `buildCapiBeaconStatement`
(`src/lib/tracking/meta.ts`) liest `_fbp` aus `document.cookie` beim Klick, in `try/catch`.
Vorher warf der Zugriff und der `catch` schluckte; jetzt wirft er nicht, und der Wert ist
leer, weil ihn niemand gesetzt hat. Das Ergebnis ist identisch.
**DIE ABLAGE-ENTSCHEIDUNG DAHINTER IST IM VOLLTEXT AUFGESCHLAGEN WORDEN** (anders als beim
Zuschnitt, der sie nur als Stub-Angabe führte): docs/claude-history/phase-11.5-einwilligung.md,
Entscheidung (7) — DER SPEICHER IST localStorage, ORIGIN-GEBUNDEN. Sie bindet „jede Scheibe
dieser Phase", also der Phase 11.5; die Scheibe 11.12a ändert den Ort des Speichers nicht.
FOLGE FÜR DIE ROADMAP-ZEILE 11.13: als datierter Nachtrag dort eingetragen.

---

## Vermerke

**DIE NUMMERN LAUFEN DURCH — auch über Vermerke, die zu KEINER Scheibe gehören.** Der erste
Eintrag hier ist ein AUFKLÄRUNGS-Vermerk: die Phase hat mit einer Aufklärungs-Runde
begonnen, die keine Scheibe hervorgebracht hat. Die Überschrift dieses Abschnitts lautet
deshalb "Vermerke" und nicht "Scheiben-Vermerke"; abgeschlossene Scheiben-Vermerke treten
unter derselben Zählung hinten an.

### VERMERK P11.12-1 — Aufklärung, 2026-09-17

**KEIN COMMIT-HASH, UND DAS IST KEINE LÜCKE IM SINNE DER LÜCKEN-REGEL.** Die Runde war
READ-ONLY und hat nichts am Repo geändert; es gibt keinen Commit, der hier fehlen könnte.
Die Lücken-Regel meint einen Vermerk, dessen Bau-Commit noch aussteht — dieser Fall ist ein
anderer und schliesst sich nicht.

**INSTRUMENT:** Chromium/Chrome 153.0.0.0 (Playwright, Windows), Wirtsseite `about:blank`,
Rahmen je Probe mit `sandbox="allow-scripts"`, ohne Netz und ohne fremde Seite. Je Probe
war die Erwartung VOR dem Lauf angesagt; alle sechs Erwartungen sind eingetroffen.

**A — F1 IST BEANTWORTET: DER LADEWEG ÄNDERT DEN URSPRUNG NICHT.** Ein Rahmen mit
`blob:`-URL verhält sich zeichengleich zu einem mit `srcdoc`: `location.origin` ist in
beiden `"null"`, und `document.cookie`, `localStorage`, `sessionStorage` sowie
`indexedDB.open` werfen in beiden dieselben Fehler. Der Ursprung kommt vom
Sandkasten-Attribut, nicht vom Ladeweg. **Ein Wechsel des Ladewegs allein löst das Symptom
nicht.** GEMESSEN (CC, 2026-09-17, Proben M1 und M2).
Der Wortlaut der Fehler deckt sich mit der Owner-Meldung vom 2026-09-14
(`SecurityError … The document is sandboxed and lacks the 'allow-same-origin'`) — bei
`indexedDB` ist er ein ANDERER (`access to the Indexed Database API is denied in this
context`), es ist also nicht eine Meldung, sondern zwei.

**B — F2 IST NICHT BEANTWORTET, SONDERN UMFORMULIERT: "LAUT" UND "ABBRECHEND" SIND KEINE
ALTERNATIVEN.** Derselbe ungefangene Wurf ist beides, je nachdem, wo der Seitenaufbau
steht. Liegt er in einem SPÄTEREN Skript, läuft er (gemessene Ausgabe: der Text erscheint);
liegt er im SELBEN Skript hinter dem Wurf, entfällt er, und der Rahmen bleibt leer.
GEMESSEN (CC, 2026-09-17, Proben M4a und M4b).
**OB DIE SEITE DES OWNERS DARAN STIRBT, BLEIBT UNGEMESSEN.** Belegt ist, dass ein
Mechanismus existiert, der das beobachtete Bild erzeugen KANN — nicht, dass er es erzeugt
hat. Die Frage aus Gegenstand und Ausgangslage, Punkt (a), ist damit nicht geschlossen.

**C — F3: DER RIEGEL TRÄGT, UND SEINE GRENZEN SIND GEMESSEN.** Ein erstes Skript im head,
das `document.cookie` per `Object.defineProperty` am `document` und
`localStorage`/`sessionStorage` per `Object.defineProperty` am `window` durch Speicher im
Arbeitsspeicher ersetzt: alle drei Definitionen gelangen ohne Wurf, der danach laufende
Code wirft nicht mehr, und Lesen nach Schreiben liefert den geschriebenen Wert.
ZWEI GEMESSENE GRENZEN, die zusammengehören:
- **ER IST AUFZÄHLEND, KEINE FLÄCHE.** `indexedDB` war nicht ersetzt und wirft im selben
  Lauf unverändert weiter. Jede nicht aufgezählte ursprungsgebundene Schnittstelle bleibt
  offen.
- **ER IST ÜBER DEN PROTOTYP UMGEHBAR.**
  `Object.getOwnPropertyDescriptor(Document.prototype, "cookie").get.call(document)` wirft
  wieder `SecurityError`, Getter wie Setter.
GEMESSEN (CC, 2026-09-17, Proben M3 und M5). Nebenbefund derselben Probe, ungefragt
erhoben: ein im Rahmen frisch erzeugter verschachtelter Rahmen liefert
`contentDocument === null` — der Sandkasten vererbt sich, und die Fehlerklasse wechselt
von `SecurityError` zu `TypeError`.

**D — VORSCHAU UND AUSLIEFERUNG TEILEN DEN HAUPTWEG.** `generateFunctional`
(`src/lib/generate.ts`) ist EINE Engine mit drei Modi (`GenerateMode`); Export-Download und
`publishProject` laufen BEIDE über `buildDocumentFor` (`src/components/CodeImporter.tsx`)
mit mode `"export"`, der Server erzeugt nichts. Die Wege trennen sich an VIER Stellen,
alle innerhalb derselben Funktion: der Bake-Zweig für Text und Redirect · der
Tabellen-Filter je Modus · die Bedingung, ob überhaupt Skripte injiziert werden · und das
als Literal in den ausgelieferten Text gebackene `MODE`, das dort zur Laufzeit
Link-Containment und auxclick-Tracking steuert. Ausserhalb der Engine trennt nur
`annotateAndDetect` (`src/lib/detect.ts`), das allein für Editor und Vorschau läuft.
**DER EINZIGE WÄCHTER AUF DIESER ACHSE** ist der Test ARTEFAKT-RIEGEL: der Varianten-Marker
landet NIE im Export- oder Publish-Dokument (`src/components/CodeImporter.test.tsx`).
**DASS DIE EDITOR-BRÜCKE DEN EXPORT NICHT ERREICHT, IST EIN NEBENEFFEKT DER QUELLENWAHL** —
der Export baut aus `debouncedCode`, nicht aus `previewHtml`. Kein Test behauptet ihre
Abwesenheit; wer die Export-Quelle umstellt, macht nichts rot (docs/immer-beachten.md, NUR
EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT IST KEINER).
GEMESSEN am Repo (CC, 2026-09-17).

**E — KEIN EIGENER RAHMEN-CODE HÄNGT AM URSPRUNG.** Beide Richtungen der Brücke senden mit
`targetOrigin` `"*"`. Der Editor prüft die QUELLE (`e.source` gegen das `contentWindow` des
Rahmens) und den Nachrichtentyp; der Rahmen prüft allein den Typ. Beide Seiten tragen den
Grund als Kommentar: der Rahmen läuft ohne `allow-same-origin`, `event.origin` ist
`"null"`. **Ein anderer Ladeweg ändert daran nichts** — siehe Teil A. GEMESSEN am Repo
(CC, 2026-09-17).

**F — DIE GRENZEN DER MESSUNG, und sie gehören zum Befund:**
- **Nur Chromium 153.** Firefox und WebKit sind nicht gemessen.
- **Wirtsseite `about:blank`**, deren Ursprung selbst schon opak ist. Für M1, M3, M4 und M5
  ohne Belang, weil dort der RAHMEN gemessen wird. **Für M2 ist es eine echte Grenze:** die
  Blob-Adresse lautete `blob:null/…`; wie sie auf einem `https`-Wirt aussieht und ob dort
  etwas abweicht, ist NICHT gemessen.
- **Keine echte Kundenseite.** Alle Proben sind konstruierte Minimalfälle.
- **Netz und CORS mit Ursprung `null` sind UNGEMESSEN** — das hätte Netz gebraucht und war
  ausgeschlossen.

### VERMERK P11.12-2 — Scheibe 11.12a, Kompatibilitäts-Riegel, 2026-09-17

**BAU-COMMIT `c3b068f`** (`feat(editor): Kompatibilitäts-Riegel für Speicherzugriffe in den
Vorschau-Rahmen (11.12a)`; am `git log` ABGELESEN, CC, 2026-09-17). Vier Dateien, 755
Einfügungen / 23 Löschungen; zwei neu: `src/lib/preview-storage-shim.ts` und seine
Testdatei. Keine Migration.

**GEBAUT:** `withPreviewStorageShim` setzt `buildPreviewStorageShimScript()` als ersten
Knoten in den `<head>` der zwei Editor-`srcDoc`. Ersetzt werden `document.cookie`,
`localStorage` und `sessionStorage` durch Speicher im Arbeitsspeicher. Beide
`sandbox`-Attribute sind zeichengleich geblieben.

**GATES (GEMESSEN, CC, 2026-09-17):** `tsc --noEmit` grün · `eslint` 0 Fehler (1 Warnung
vorbestehend in `src/lib/tracking/consent.test.ts`, nicht berührt) · `vitest`
**1762 → 1790**, 82 → 83 Dateien; +28 = 26 Läufe der neuen Testdatei plus T1 und T2 ·
`next build` erfolgreich.

**MUTATIONSPROBEN — sieben, je mit Vorhersage VOR dem Lauf** (GEMESSEN, CC, 2026-09-17):

| Mutation | Vorhersage | Ergebnis |
|---|---|---|
| Mu1 Riegel in `buildDocumentFor` | T1, Abwesenheits-Hälfte | 1 Lauf: T1 |
| Mu2 Riegel aus `editHtml` | T1, Positivkontroll-Hälfte | 1 Lauf: T1 |
| Mu3 Export-Quelle → `previewHtml` | T2, evtl. Zusatztreffer | 1 Lauf: T2, keine Kaskade |
| Mu4 Riegel ans Ende | mehrere Positions- und Byte-Läufe | **2 — Abweichung** |
| Mu4 nach Verschärfung | alle sieben Positions-Läufe | 7, exakt |
| Mu5 Lookahead entfernt | der `<header>`-Lauf | 1 Lauf |
| Mu6 Scanner → `indexOf(">")` | 2 Läufe | **1 — Abweichung** |
| Mu7 Kennung gewürfelt | 2 Riegel-Läufe + Bestandstest | **2, Bestandstest grün — Abweichung** |

**DREI ABWEICHUNGEN, JE UNTERSUCHT:**
- **Mu4:** Fünf Positions-Läufe behaupteten nur „hinter `<head>`" — das erfüllt ein Anhängen
  am Dateiende auch. **Die Assertions waren zu schwach; behoben wurde die WURZEL** (eine
  Obergrenze je Lauf), nicht die Mutation.
- **Mu6:** Ein vorzeitiges `>` im `<html>`-Attribut verschiebt den Anker nur nach vorn, aber
  weiterhin VOR `<head` — die Einsetzung landet zufällig richtig. Der N1-Gegenstück-Lauf ist
  für diese Mutation **kein Diskriminator, sondern eine Regressions-Verankerung.**
- **Mu7:** Der Bestandstest *Text-Mapping-Aenderung bei unveraendertem Code erzeugt KEIN
  neues srcDoc* blieb GRÜN. Ursache: Das `editHtml`-Memo rechnet bei unveränderten Deps nicht
  neu und liefert den zwischengespeicherten String. **Der Bestandstest deckt den
  Determinismus also NICHT; das trägt allein der neue Determinismus-Lauf.** Die zwei
  Kommentare, die das Gegenteil behaupteten, sind im selben Commit richtiggestellt.

**T2 IST EIN EINZELSTÜCK:** Unter Mu3 fiel im gesamten Bestand von 1790 Läufen **nur T2**
(GEMESSEN, CC, 2026-09-17). Er schliesst damit die Lücke aus VERMERK P11.12-1, Teil D. Der
Hinweis steht nach Lektion (f) in seinem Kommentar.

**N1 — DIE MESSUNG, DIE EINE ERWARTUNG UMKEHRTE** (GEMESSEN, Chromium 153, CC, 2026-09-17):
Der Serialisierer dieses Browsers escaped in Attributwerten auch `<` und `>` — `a>b` wird zu
`a&gt;b`, `"` zu `&quot;`. Ein naives `indexOf(">")` wäre auf dem normalisierten Pfad DIESES
Browsers also zufällig sicher gewesen. **Der gebaute Scanner verlässt sich nicht darauf:**
der Editor läuft im Browser des Betreibers, und der `catch`-Pfad von `generateFunctional`
liefert rohes HTML, in dem ein `>` im Attributwert unescaped stehen kann.

**PROBE N4 — im echten Sandkasten** (Chromium 153, `about:blank`, kein Netz, Ablage
`.playwright-mcp/` vor dem ersten Aufruf als ignoriert geprüft). Verwendet wurde der echte
Riegel-Block und der von der echten Funktion berechnete Einsetz-Index; die Rekonstruktion ist
als zeichengleich zum Funktionsergebnis verifiziert. Drei Fälle — (a) `<head lang="de">`,
(b) `<header>` im body, (c) `<head data-x="a&gt;b">`. **Jede Erwartung getroffen, in allen
drei:** `document.compatMode === "CSS1Compat"` (kein Quirks-Mode) · `document.scripts[0].id
=== "__ps_sbx"` · head-Attribute erhalten (`lang="de"` bzw. `data-x` liest zurück als `a>b`)
· `<header>` unversehrt · `document.cookie` liefert `sid=42; b=2` · `localStorage`/
`sessionStorage` lesen nach Schreiben · `Object.keys` → `["k"]` und `JSON.stringify` →
`{"k":"v"}` ohne Wurf · **`indexedDB.open` wirft weiter (`SecurityError`, erwartet)** · null
ungefangene Fehler.

**LIVE-TEST — OWNER-ANGABE 2026-09-17, Deployment als „Ready" verifiziert:**
- **Regression 1–5 bestanden.** Schritt 5 am veröffentlichten Dokument über `view-source`:
  `__ps_sbx` **0 Funde**; Gegenprobe `pagesmith-mappings` **2 Funde**. Die Gegenprobe trennt
  „nicht da" von „falsch gesucht".
- **Schritt 6/7: die am 2026-09-14 leere Seite rendert vollständig** — im Editier- wie im
  Vorschau-Rahmen.
- **Schritt 8:** die `SecurityError` zu `cookie`, `localStorage` und `sessionStorage` sind
  verschwunden.
- **Schritt 9:** der Einwilligungs-Dialog erscheint in der Vorschau nicht — wie erwartet,
  eine Nicht-Änderung.

**DIE VORHER-KONSOLE (Pflicht-Stopp N6), OWNER-ANGABE, vor dem Deploy im Kontext
`about:srcdoc` als Text gesichert — WÖRTLICH:**

```
vendors.69eb8c81da1864d5.js:5 SecurityError: Failed to read the 'cookie' property from
'Document': The document is sandboxed and lacks the 'allow-same-origin' flag.
    at Object.get (vendors.69eb8c81da1864d5.js:17:95053)
    at page.6394180d7a82e9d6.js:1:52332
    at aB (vendors.69eb8c81da1864d5.js:1:391637)
    at sU (vendors.69eb8c81da1864d5.js:1:420630)
    at sP (vendors.69eb8c81da1864d5.js:1:403486)
    at r5 (vendors.69eb8c81da1864d5.js:1:352440)
    at vendors.69eb8c81da1864d5.js:1:419076
    at sB (vendors.69eb8c81da1864d5.js:1:419082)
    at sk (vendors.69eb8c81da1864d5.js:1:402489)
    at E (vendors.69eb8c81da1864d5.js:1:683029)
vendors.69eb8c81da1864d5.js:1 Uncaught SecurityError: Failed to read the 'cookie'
property from 'Document': The document is sandboxed and lacks the 'allow-same-origin' flag.
o380824.ingest.us.se…t.react%2F10.47.0:1 Failed to load resource: the server responded
with a status of 403 ()
```

**OHNE DIESEN VORHER-WERT WÄRE DER NACHWEIS NICHT HERSTELLBAR GEWESEN** — nach dem Deploy
gibt es den Zustand nicht mehr (docs/immer-beachten.md, EIN VORHER-WERT WIRD VOR DEM DEPLOY
GESICHERT).

**EINORDNUNG DES STAPELS, je mit Provenienz:**
- **Dass der Wurf im React-Rendern einer Next.js-Seite fällt und den Baum abbaut:
  ARCHITEKT-ABLEITUNG aus dem Stapel (2026-09-17).** Durch Schritt 6/7 **GESTÜTZT, nicht
  einzeln gemessen** — belegt ist, dass die Seite nach dem Riegel rendert, nicht, dass genau
  dieser Abbau-Weg der Grund war. Damit ist die Frage (F2) — ob der Wurf den Aufbau abbricht
  — für DIESE Seite gestützt und nicht mehr offen wie in VERMERK P11.12-1, Teil B; für
  andere Seiten bleibt sie es.
- **Die 403 ist eine Anfrage an den Fehlerdienst der Seite** (Sentry, **am Dateinamen
  ABGELESEN**, nicht gemessen). Sie ist ein Beleg für Vorrat P11.12-1 — Netzanfragen mit
  Ursprung `null` — und **bleibt nach dem Deploy bestehen, sofern der Owner nichts
  Gegenteiliges meldet. DAS IST NICHT EINZELN GEPRÜFT**; Schritt 8 hat allein auf die drei
  Speicher-Würfe gesehen.
- **`indexedDB`: in der Vorher-Konsole kein Treffer.** GRENZE, die mitmuss: Nach dem Absturz
  lief kein weiterer Code — ein späterer Zugriff wäre verdeckt gewesen. Der Nicht-Treffer
  belegt also nicht, dass die Seite `indexedDB` nicht anfasst.

**GRENZEN DIESES VERMERKS:** **ein Browser** (Chromium 153; Firefox und WebKit sind
ungemessen — Vorrat P11.12-4) und **eine Seite** (die vom 2026-09-14). Dass der Riegel
andere sterbende Seiten rettet, ist damit nicht belegt.

---

## Entscheidungen, die über ihre Scheibe hinaus binden

Was den Zuschnitt ausserdem bindet, steht unter Was den Zuschnitt bindet und stammt NICHT
aus dieser Phase: (B1) ist eine Dauerregel, (B2) eine Owner-Entscheidung von 2026-09-16,
(B3) eine Angabe der Roadmap-Zeile. **Sie gehören deshalb nicht hierher** — dieser
Abschnitt trägt, was IN dieser Phase entschieden wird und über seine Scheibe hinaus bindet.

### Entscheidung P11.12-1 — Der Weg ist ein Kompatibilitäts-Riegel, KEINE Sicherheitsschicht

**DIE ENTSCHEIDUNG:** Der Weg ist ein Riegel an der SPITZE des head, der
`document.cookie`, `localStorage` und `sessionStorage` durch Speicher im Arbeitsspeicher
ersetzt. Er gilt NUR den zwei Rahmen des Editors.

**ER IST EIN KOMPATIBILITÄTS-MITTEL UND KEINE SICHERHEITSSCHICHT. Die Grenze bleibt der
Sandkasten (B1)** — der Riegel verschiebt sie nicht und soll es nicht.

**DARAUS FOLGT, DASS SEINE UMGEHBARKEIT KEIN MANGEL IST, und dieser Satz ist der
eigentliche Inhalt der Entscheidung:** Wer den Riegel über den Prototyp-Getter umgeht
(VERMERK P11.12-1, Teil C), bekommt **den Fehler, nicht den Zugang** — der Sandkasten
antwortet wie zuvor. Es gibt nichts zu erbeuten, was ohne Riegel verschlossen wäre. Wer
das übersieht, hält eine gemessene Umgehbarkeit für ein Loch und baut Abwehr gegen einen
Angreifer, der nichts gewinnen kann.

**DIE GRENZE:** Der Riegel ist AUFZÄHLEND (VERMERK P11.12-1, Teil C). Er deckt, was in ihm
steht, und sonst nichts.

**WANN SIE KIPPT:** sobald der Riegel je als SCHUTZ verstanden oder AUSGELIEFERT werden
soll. Beides zöge eine andere Bauform und eine andere Prüfung nach sich; dann ist diese
Entscheidung neu zu treffen und nicht fortzuschreiben.

PROVENIENZ: **ARCHITEKT-ENTSCHEIDUNG 2026-09-17** auf Grundlage von VERMERK P11.12-1.
**→ NICHT GEHOBEN 2026-09-17.** Sie ist am ORT DER HANDLUNG verankert: der Kopfkommentar von
`src/lib/preview-storage-shim.ts` trägt sie zweimal — als „KEINE SICHERHEITSSCHICHT" und am
Rückfall-Absatz von `withPreviewStorageShim` (GEMESSEN am Code, CC, 2026-09-17). Wer den
Riegel anfasst, liest sie dort; eine Dauerregel erreichte ihn nicht besser. Sie bleibt im
Archiv der Phase.

### Entscheidung P11.12-2 — Der Riegel entsteht AUSSERHALB von generateFunctional

**DIE ENTSCHEIDUNG:** Der Riegel wird NICHT in `generateFunctional` erzeugt. Der Export-
und Veröffentlichungsweg ruft ihn nie — **die Trennung entsteht durch die BAUART, nicht
durch eine Modus-Verzweigung.**

**DER GRUND, ZWEITEILIG.** (1) Was einmal im ausgelieferten Text steht, bekommen wir nicht
mehr herunter (docs/immer-beachten.md, WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE
EINBAHNSTRASSE). (2) Alle drei Modi teilen EINE Engine (VERMERK P11.12-1, Teil D) — eine
Verzweigung IN ihr wäre eine Zeile, die jemand später als Vereinfachung entfernt, und der
Riegel stünde auf jeder Kundenseite. Eine Bauart, die den Weg gar nicht erst kennt, kann
diesen Fehler nicht machen.

**EIN WÄCHTER-TEST IST PFLICHT, KEINE ZUGABE:** Er behauptet die ABWESENHEIT des Riegels im
Export- UND im Veröffentlichungsdokument und trägt eine POSITIVKONTROLLE in beiden Rahmen.
Ohne die Kontrolle wäre ein echter Nicht-Treffer von einem kaputt gewordenen Wächter nicht
zu unterscheiden (docs/immer-beachten.md, MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE,
Lektion (d)).

**WARUM DIE BAUART ALLEIN NICHT GENÜGT:** Genau so ist heute die Editor-Brücke vom Export
getrennt — als Nebeneffekt der Quellenwahl, ohne Test, und nichts wird rot, wenn sich die
Quelle ändert (VERMERK P11.12-1, Teil D). Diese Entscheidung wiederholt das nicht.

PROVENIENZ: **ARCHITEKT-ENTSCHEIDUNG 2026-09-17** auf Grundlage von VERMERK P11.12-1.
**→ NICHT GEHOBEN 2026-09-17.** Sie ist am ORT DER HANDLUNG verankert: im
Abwesenheits-Absatz des Kopfkommentars von `src/lib/preview-storage-shim.ts` und im
Wächter T1 (`src/components/CodeImporter.test.tsx`), der bei ihrer Verletzung rot wird
(GEMESSEN am Code, CC, 2026-09-17). **Ein Test ist der stärkere Anker als eine Regel** —
er meldet sich von selbst. Sie bleibt im Archiv der Phase.

---

## Vorrat — gemeldet, nicht gebaut

**Vorrat P11.12-1 — NETZANFRAGEN MIT URSPRUNG `null` SIND IN DER VORSCHAU NICHT LÖSBAR.**
Eine Seite, die ihren Inhalt von einer fremden Schnittstelle nachlädt, bleibt im Rahmen
leer, weil der Ursprung opak ist und die Gegenstelle die Anfrage ablehnt. Der Riegel der
Scheibe 11.12a erreicht das NICHT — er ersetzt Speicher-Schnittstellen, keine Netzwege.
**HEUTE UNGEMESSEN:** Die CORS-Ablehnung stammt aus der Owner-Meldung vom 2026-09-14
(Gegenstand und Ausgangslage, Punkt (a)); die Aufklärungs-Runde vom 2026-09-17 hat Netz
ausdrücklich ausgeschlossen und dazu nichts erhoben. Ob und wie viele importierte Seiten
das betrifft, ist ebenfalls nicht erhoben.
PROVENIENZ: die Ablehnung OWNER-ANGABE 2026-09-14; dass der Riegel sie nicht erreicht, ist
eine ABLEITUNG aus seinem Gegenstand (CC, 2026-09-17), keine Messung.
**→ GEHOBEN 2026-09-17, docs/offene-punkte.md, NETZANFRAGEN MIT URSPRUNG `null` SIND IN DER
VORSCHAU NICHT LÖSBAR.** Grund: benennbarer Trigger UND geht still kaputt — der Betreiber
sieht einen leeren Rahmen ohne Meldung.

**Vorrat P11.12-2 — DER KOPFKOMMENTAR VON `src/lib/generate.ts` BEGRÜNDET DAS
PREVIEW-CONTAINMENT FALSCH.** Er sagt, das `srcDoc`-iframe erbe unsere Origin, und nennt
weiter unten die "srcDoc-Basis (unsere Origin)" als das, wogegen nicht navigiert werden
darf. **GEMESSEN ist `location.origin === "null"`** (VERMERK P11.12-1, Teil A): Der Rahmen
erbt unsere Origin gerade NICHT, weil der Sandkasten `allow-same-origin` nicht trägt.
**DAS VERHALTEN BLEIBT RICHTIG — falsch ist die BEGRÜNDUNG.** Das Containment hat weiterhin
einen guten Grund (eine Navigation im Rahmen ersetzt die Vorschau); er steht nur nicht
dort. Genau die Konstellation aus docs/immer-beachten.md, EIN KOMMENTAR IST EINE
BEHAUPTUNG, KEINE EIGENSCHAFT — UND ER VERMEHRT SICH.
**NICHT REPARIERT**, und der Zuschnitt der Scheibe 11.12a schliesst den Kommentarkopf
ausdrücklich aus.
**ERGÄNZT 2026-09-17 — DIE RICHTIGE FASSUNG STEHT BEREITS IM BESTAND, UND ZWAR ÄLTER:**
docs/claude-history/phase-4-mapping-codegen-export.md formuliert dieselbe Sache korrekt —
„srcDoc erbt die Basis-URL der Elternseite". **Basis-URL, nicht Origin.** Der Kommentarkopf
von `src/lib/generate.ts` hat die Angabe beim Abschreiben VERSCHÄRFT. Das ist die Figur aus
docs/immer-beachten.md, EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT — UND ER
VERMEHRT SICH: nicht eine Angabe alterte, sondern eine Kopie wurde stärker als ihr Original.
**Wer diesen Posten abarbeitet, hat die Formulierung damit schon** und muss sie nicht neu
erfinden.
PROVENIENZ: der Kommentar GELESEN am Repo, der Ursprungswert GEMESSEN (CC, 2026-09-17); die
Fundstelle in der Phase-4-Historie GELESEN (CC, 2026-09-17, Plan-Befund G8).
**→ GEHOBEN 2026-09-17, docs/claude-history/backlog-polish.md, Aus Phase 11.12 gehoben
(2026-09-17).** Grund: KEINE stille Kaputtheit — das Verhalten bleibt richtig, falsch ist
allein die Begründung. Doku-Hygiene, kein offener Punkt.

**Vorrat P11.12-3 — `indexedDB` WIRFT IM RAHMEN WEITER.** Der Riegel deckt es
ausdrücklich nicht (ARCHITEKT-ENTSCHEIDUNG 2026-09-17); gemessen ist, dass `indexedDB.open`
im Sandkasten weiterhin einen `SecurityError` wirft — mit einem ANDEREN Wortlaut als bei
`cookie` und `localStorage` (`access to the Indexed Database API is denied in this context`).
Eine importierte Seite, die `indexedDB` beim Laden anfasst, stirbt in der Vorschau weiter.
**TRIGGER:** die erste reale Seite, die in der Vorschau NACHWEISLICH an `indexedDB` stirbt.
**VORBEREITETER SCHRITT, falls er eintritt:** eine Attrappe, deren `open()` nicht wirft,
sondern den asynchronen Fehlerweg bedient (`onerror`). **ABLEITUNG, NICHT GEMESSEN** — ob
eine Bibliothek ohne Fehlerpfad dann HÄNGT statt zu sterben, ist offen, und ein Hänger ist
schwerer zu finden als ein Wurf.
**WAS HEUTE NICHT BELEGT IST:** dass irgendeine reale Seite es überhaupt anfasst. Der
Nicht-Treffer in der Vorher-Konsole (VERMERK P11.12-2) taugt dafür nicht — nach dem Absturz
lief kein weiterer Code.
PROVENIENZ: die Entscheidung ARCHITEKT 2026-09-17; der Wurf GEMESSEN (CC, 2026-09-17,
Proben M1 und N4); der vorbereitete Schritt eine ABLEITUNG.
**→ GEHOBEN 2026-09-17, docs/offene-punkte.md, `indexedDB` WIRFT IM VORSCHAU-RAHMEN
WEITER.** Grund: benennbarer Trigger steht im Eintrag selbst UND geht still kaputt — dasselbe
leere Bild wie vor der Scheibe, aus einer anderen Ursache.

**Vorrat P11.12-4 — FIREFOX UND WEBKIT SIND FÜR DEN RIEGEL UNGEMESSEN.** Alles, was über
den Riegel gemessen ist — die Serialisierung der Attributwerte (N1), das Verhalten im
Sandkasten (N4), der Live-Test —, stammt aus **Chromium 153**. Der Editor läuft im Browser
des Betreibers.
**WAS DARAN HÄNGT, und es ist mehr als eine Vollständigkeits-Lücke:** Die N1-Messung zeigte,
dass Chromium `<` und `>` in Attributwerten escaped. **Ob ein anderer Browser das tut, ist
nicht erhoben.** Der gebaute Scanner ist genau deshalb quote-bewusst und nicht auf diese
Eigenschaft gebaut — die Vorsorge ist da, ihr Anlass aber ungemessen.
**KEIN TRIGGER BENANNT**, und das ist Absicht: ein erfundener liesse den Posten als
terminiert aussehen. Er wird fällig, wenn ein Betreiber einen anderen Browser meldet oder
jemand die Messung nachholt.
PROVENIENZ: die Browser-Angabe GEMESSEN (CC, 2026-09-17); dass andere Browser abweichen
KÖNNTEN, ist eine ABLEITUNG aus der Plattform-Vielfalt, keine Messung.
**→ GEHOBEN 2026-09-17, docs/claude-history/backlog-polish.md, Aus Phase 11.12 gehoben
(2026-09-17).** Grund: KEIN benennbarer Trigger — der Eintrag verweigert ihn im eigenen Text,
und ein erfundener liesse den Posten als terminiert aussehen.

---

## Hebungs-Kandidaten

**BEIDE SIND ÄNDERUNGSANTRÄGE AN docs/arbeitsweise.md UND KEINE REGELN.** Sie stehen in
Wartestellung; **entschieden werden sie vom Owner am Phasenende** (Weg 7, CLAUDE.md,
"## Aktive Dokumente"). Bis dahin ändert sich am Verfahren nichts.

### Hebungs-Kandidat P11.12-1 — WANN DIE STANDDATEI ENTSTEHT

**DER WORTLAUT HEUTE** (docs/arbeitsweise.md, Die Standdatei, Absatz „Wann sie entsteht"):
„bei der ersten Handlung der Phase — vor der ersten Aufklärung, vor der ersten
Konzept-Runde, vor der ersten Bau-Freigabe."

**DER ANTRAG:** Sie entsteht, **sobald die erste Tatsache einen Ort braucht** — in der Regel
mit dem ERGEBNIS der ersten Aufklärung, nicht davor.

**DER BELEG IST DIESE PHASE:** Die Datei ist am 2026-09-17 LEER angelegt worden, vor der
Aufklärung. Sie trug danach einen Zuschnitt-Abschnitt mit drei offenen Plan-Fragen, von
denen die dritte eine leere Menge als Gegenstand hatte, und einen Abschnitt zur Nummernform,
der ohne Einträge nichts steuerte. **Das hat eine Korrekturrunde ohne Produktfortschritt
gekostet.**

**DIE GRENZE, OHNE DIE DER ANTRAG DAS GATE BESCHÄDIGT:** Das Auftrag-0-Gate bleibt scharf.
Während einer ersten Aufklärung existiert die Datei nicht — und die Aufklärung **schreibt
nichts**, sie berichtet. „Existiert sie nicht, läuft keine Phase" bleibt wahr, weil eine
Phase mit ihrer ersten Tatsache beginnt, nicht mit ihrem ersten Prompt.

PROVENIENZ: **OWNER-KORREKTUR 2026-09-17.** Der Verlauf dieser Phase ist am Repo ablesbar
(Commits `a7fe5fe` und die Doku-Runde davor); dass die Runde „ohne Produktfortschritt" war,
ist eine Wertung des Owners, keine Messung.
**→ GEHOBEN 2026-09-17, docs/claude-history/backlog-polish.md, Aus Phase 11.12 gehoben
(2026-09-17).** Als ÄNDERUNGSANTRAG in Wartestellung, neben denen der Phasen 11.3 und 11.5 —
KEINE Regel; docs/arbeitsweise.md ist unberührt.

### Hebungs-Kandidat P11.12-2 — DIE NUMMERNFORM MIT PHASEN-PRÄFIX ALS BAUFORM

**DER ANTRAG:** `P<Phase>-n` wird die Nummernform JEDER Standdatei, nicht nur dieser.

**DER BELEG IST DIESE PHASE:** Sie führt VERMERK P11.12-1 und P11.12-2, vier Vorrats-Einträge
und zwei Kandidaten — **ohne eine einzige Kollision mit den toten Zeigern**, die
docs/offene-punkte.md unter ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI …
führt. Die belegten Alt-Nummern (VERMERK 1, 3, 5, 6, 10, 14, 16 · Vorrat 5, 6, 12, 13, 28,
40, 41, 42, 50 · Entscheidung 2, 5, 12 · Hebungs-Kandidat 2, 6) sind von dieser Phase
unerreichbar geblieben; die Zeiger sind tot statt falsch.

**WAS DER ANTRAG NICHT LEISTET:** Er heilt keinen bestehenden Zeiger. Die vierzehn bleiben
tot, und in angewandten Migrationen bleiben sie es für immer.

**DIE GRENZE, DIE AM ABSCHNITT DIE NUMMERNFORM SCHON STEHT:** Die Entscheidung von 2026-09-17
gilt DIESER Phase. Erst dieser Antrag würde sie verallgemeinern — wer sie ohne ihn
übernimmt, ändert das Verfahren an einer Standdatei vorbei.

PROVENIENZ: ARCHITEKT-SETZUNG 2026-09-17 für diese Phase; der Antrag auf Verallgemeinerung
ARCHITEKT 2026-09-17. Die Kollisionsfreiheit ist GEMESSEN (CC, 2026-09-17, s. den Abschnitt
Die Nummernform — entschieden: P11.12-n).
**→ GEHOBEN 2026-09-17, docs/claude-history/backlog-polish.md, Aus Phase 11.12 gehoben
(2026-09-17).** Als ÄNDERUNGSANTRAG in Wartestellung — KEINE Regel.
