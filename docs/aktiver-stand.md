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

**ANGELEGT AM 2026-09-17**, vor der ersten Handlung der Phase. **FORTGESCHRIEBEN AM
2026-09-17** nach der Aufklärungs-Runde desselben Tages: sie trägt seither VERMERK
P11.12-1, die Entscheidungen P11.12-1 und P11.12-2, den Zuschnitt der Scheibe 11.12a und
zwei Vorrats-Einträge. **GEBAUT IST NICHTS** — die Scheibe ist zugeschnitten, nicht
freigegeben. Hebungs-Kandidaten gibt es keine.

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
7. Zuschnitt der Scheibe 11.12a
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
Reihenfolge der Aufzählung ist keine Wertung. Keine von ihnen ist heute beantwortet, und
keine ist heute als beantwortbar erwiesen. Was eine Aufklärungs-Runde daraus macht —
welche sie aufgreift, in welcher Tiefe, mit welchem Instrument —, ist hier NICHT
entschieden.

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

## Zuschnitt der Scheibe 11.12a

**GEGENSTAND:** ein Kompatibilitäts-Riegel für `document.cookie`, `localStorage` und
`sessionStorage`, wirksam im Editor-Rahmen UND in der funktionalen Vorschau, gebaut nach
den Entscheidungen P11.12-1 und P11.12-2. Dazu der Wächter-Test aus P11.12-2.

**DER WÄCHTER-TEST TRÄGT ZWEI BEHAUPTUNGEN, und die zweite ist eine Zugabe, die der
Aufklärungs-Befund erzwingt:**
1. Der Riegel ist im Export- UND im Veröffentlichungsdokument ABWESEND, mit
   Positivkontrolle in beiden Rahmen.
2. Die Editor-Brücke ist dort ebenfalls abwesend — `LISTENER_SCRIPT` und
   `HIGHLIGHT_STYLE` (`src/lib/detect.ts`). **Diese Abwesenheit ist heute durch KEINEN
   Test gedeckt** (VERMERK P11.12-1, Teil D); sie ruht allein auf der Quellenwahl des
   Export-Pfades. Die Scheibe, die ohnehin einen Abwesenheits-Wächter baut, nimmt sie mit.

**OFFENE PLAN-FRAGEN — FRAGEN, KEINE VORGABEN.** Sie sind im Bau-Plan zu beantworten, hier
ist keine beantwortet und keine bevorzugt:
- Wird `indexedDB` mit ersetzt oder nicht? Der Riegel ist aufzählend (P11.12-1), und
  `indexedDB` ist die eine gemessene Achse, die er heute nicht deckt.
- In welcher Reihenfolge steht der Riegel zum Varianten-Marker, der als String NACH
  `</html>` angehängt wird (`editVariantMarker`, `src/lib/generate.ts`)?
- Wie verhalten sich UNSERE eigenen Einwilligungs-Bausteine in der Vorschau, wenn
  darunter ein Speicher im Arbeitsspeicher liegt statt der echten Ablage? Der
  Einwilligungs-Zustand wird im `localStorage` gehalten (docs/claude-history/phase-11.5-einwilligung.md,
  bindende Entscheidung zur Ablage — GELESEN als Stub-Angabe in CLAUDE.md, CC,
  2026-09-17; der Volltext ist in dieser Runde NICHT aufgeschlagen).

**AUSDRÜCKLICH NICHT TEIL DIESER SCHEIBE:** Netzanfragen mit Ursprung `null` und ihre
CORS-Ablehnung (Vorrat P11.12-1) · andere Browser als Chromium · jede Änderung an
`generateFunctional` · der Kommentarkopf von `src/lib/generate.ts` (Vorrat P11.12-2).

**STATUS:** zugeschnitten am 2026-09-17, **nicht freigegeben und nicht gebaut**.
PROVENIENZ: ARCHITEKT-ZUSCHNITT 2026-09-17 auf Grundlage von VERMERK P11.12-1.

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
PROVENIENZ: der Kommentar GELESEN am Repo, der Ursprungswert GEMESSEN (CC, 2026-09-17).

---

## Hebungs-Kandidaten

*Leer — am 2026-09-17 ist kein Kandidat angetreten.*
