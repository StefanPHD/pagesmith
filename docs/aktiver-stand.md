# Phase 10 — Workspace-Reorganisation (laufende Phase)

Aktiver Stand der GERADE LAUFENDEN Phase 10: Entscheidungen, Gründe, verworfene
Alternativen, Invarianten und offene Punkte. Diese Datei wird während der Phase
fortgeschrieben und ist der Pflicht-Einstieg jedes Bau- und Aufklärungs-Prompts
("Auftrag 0"). Sie beschreibt eine OFFENE Phase. Angelegt am 2026-07-31, vor der
ersten Zeile Code (Kadenz: Gedächtnis zuerst). Was GEBAUT und live verifiziert
ist, steht ausschließlich unter "### Abgeschlossene Scheiben" — jeder andere
Abschnitt beschreibt Absicht, keinen Bau- oder Verifikationsstand.

Der aktive Ist-Stand des SYSTEMS (Migrationsstand, events-Schema, Policies, RPCs,
Indizes) steht WEITERHIN in der Root unter "## Aktueller DB-/Analytics-Stand"; die
dauerhaft geltenden Regeln unter "## Immer beachten" bzw. "## Code-Qualität …" —
sie gelten hier unverändert und werden NICHT wiederholt. Diese Datei trägt, was
NUR für Phase 10 gilt: den Schnitt, die Begründung und die Grenzen. Am Phasenende
wird sie nach dem Muster der bestehenden Historien-Dateien mit einem Archiv-Kopf
versehen, nach `docs/claude-history/phase-10-workspace.md` umbenannt und hier
gelöscht. Das Verfahren steht verbindlich in der Root-CLAUDE.md unter
"## Aktiver Stand — Verfahren ab Phase 10" (lädt jede Session automatisch); der
ausführliche Ablauf zusätzlich in `docs/claude-history/arbeitsweise.md`,
Abschnitt "Phasenende ab Phase 10".

## Aktiver Stand — Phase 10 (Workspace-Reorganisation)

Reine Informationsarchitektur. KEIN neues Backend-Feature, KEINE Migration, KEIN
neuer Datenpfad. Die heute auf EINER Fläche liegenden Einstellungsbereiche
(Hosting/Domain, Tracking, A/B-Testing, Analytics) werden entlang des
Produkt-Loops getrennt, BEVOR Phase 11 einen weiteren Pixel-Typ hinzufügt und
denselben Bereich erneut überlädt.

Der Auslöser ist am Code messbar, nicht bloß Geschmack: Das Einstellungs-Panel
liegt als gewöhnliches Flex-Kind im Dokumentfluss (`src/components/CodeImporter.tsx:1936`,
im Flex-Column-Container `:1709`) und steht in der DOM-Reihenfolge VOR dem
Drei-Zonen-Workspace (`:2661`). Beim Aufklappen wird seine volle Höhe in den Fluss
eingerechnet und schiebt Workspace samt Edit-iframe (`:2939`, `min-h-[32rem]` bei
`:2948`) nach unten aus dem Sichtfeld. Der auslösende Button bleibt dabei oben in
der Toolbar (`:1793`) sichtbar. Das Panel hat weder Höhendeckel noch eigenen
Scroll-Container und stapelt sechs Abschnitte plus `DomainManager`.

### Gemessene Tatsachen, auf denen die Entscheidungen ruhen

Alle Zeilenangaben am echten Code erhoben (2026-07-31), nicht aus einem Bericht
übernommen. Sie tragen Entscheidungen — wer sie ändert, prüft die Entscheidung mit.

- **T1 — Der gesamte Zustand von `CodeImporter.tsx` ist dort deklariert.** 46
  `useState`, 5 `useRef`, 9 `useMemo`, alle im Komponenten-Rumpf zwischen `:182`
  und `:806`. Kein eigener Hook, keine ausgelagerte Zustandsdatei. Ein Aus- und
  Wiedereinhängen NUR des Einstellungs-Teilbaums (`:1936`–`:2570`) verliert davon
  NICHTS — dieser Zustand lebt im Elternteil, der dabei gemountet bleibt.
- **T2 — Die beiden Kind-Komponenten halten jeweils EIGENEN lokalen Zustand.**
  - `src/components/DomainManager.tsx`, auf DREI Ebenen: **Container** 6
    `useState` (`:26`, `:27`, `:28`, `:29`, `:32`, `:34`); **je Domain-Zeile**
    (`DomainRow`) 6 `useState` + 1 `useRef` (`:173`, `:174`, `:175`, `:178`,
    `:179`, `:180`; Ref `:176`); **je kopierbarem Wert** (`CopyValue`) 1
    `useState` (`:419`).
  - `src/components/ActionPanel.tsx`, 10 `useState`, kein `useRef`, kein
    `useMemo`. Die exportierte Komponente selbst (`:46`) hält KEINEN Zustand; er
    liegt in den Unter-Komponenten und damit **je ausgewähltem Element**, weil
    `ElementActions` auf die ps-ID gekeyt ist (`:69`): `RedirectActions` 3
    (`:158`, `:160`, `:161`), `TextActions` 2 (`:224`, `:227`), `TrackActions` 5
    (`:535`, `:545`, `:546`, `:547`, `:550`).
- **T3 — Die beiden liegen unterschiedlich zum Settings-Gate.** Das Gate ist
  `{isSettingsOpen && (` bei `:1936`; der Zustand startet deterministisch `false`
  (`:275`), der Block endet `:2570`. `DomainManager` wird bei `:2568`
  gerendert — INNERHALB. `ActionPanel` wird bei `:2988` gerendert, im
  Workspace-Container (`:2661`) — AUSSERHALB. Der Settings-Umbau berührt
  `ActionPanel` daher nicht.
- **T4 — Beim Mounten von `DomainManager` starten drei Dinge.** Listenladen
  (`DomainManager.tsx:53`–`:72`, Aufruf `listProjectDomains` `:58`), ein
  Status-Check je Domain-Zeile (`:203`–`:215`, Aufruf `checkDomainStatusAction`
  `:207`) und ein wiederkehrendes Poll-Intervall von **60 Sekunden**
  (`AUTO_POLL_MS = 60_000` `:22`, `setInterval` `:78`). Das Settings-Gate `:1936`
  ist die EINZIGE Mount-Grenze von `DomainManager` selbst — der Aufruf bei `:2568`
  trägt keine weitere Bedingung.
  DREI PRÄZISIERUNGEN, die die Aussage nicht umstoßen, aber ihre Reichweite
  begrenzen: (1) Listenladen und Poll-Effect tragen je einen frühen
  `if (!projectId) return` (`:54`, `:77`) — bei ungespeichertem Projekt startet
  beim Mount also nichts; `projectId` ist die LAUF-Bedingung, das Gate die
  MOUNT-Grenze. (2) Für `DomainRow` ist das Gate NICHT die einzige Mount-Grenze:
  die Zeilen entstehen erst mit der geladenen Liste (`:144`, `:146`–`:153`), der
  Status-Check je Zeile folgt also dem Listenladen, statt gleichzeitig mit ihm zu
  starten. (3) Das Intervall selbst läuft durchgehend, überspringt aber seine
  Ticks, solange der Tab unsichtbar ist (`document.hidden`, `:79`) — bei
  SICHTBAREM Tab tickt es, auch wenn gerade ausschließlich im Bauen-Bereich
  gearbeitet wird. Genau dieser Fall trägt die Zweistufigkeit in Entscheidung 3.
- **T5 — `settingsEqual` vergleicht ausschließlich die Meta-Pixel-ID.**
  `src/lib/settings.ts:125`–`:127`, ein einziger Vergleich. `dirty` liest ihn bei
  `CodeImporter.tsx:714`–`:717`. CAPI-Zustand und Hosting gehen damit NICHT in
  `dirty` ein — im Code begründet (`settings.ts:117`–`:124`): beide werden von
  ihren eigenen Sofort-Persist-Actions geschrieben und danach in `settings` UND
  `savedSettings` gespiegelt; ohne den Ausschluss gäbe es einen false-dirty-Alarm.
  FÜR PHASE 10 RELEVANT, weil die Bereiche Veröffentlichen und Messen genau diese
  beiden Zweige bedienen: Wer dort Zustand anfasst, fasst Zustand an, der am
  Speichern-Button vorbei persistiert wird.
- **T6 — Die lokalisierte Datumsausgabe ist nur wegen des geschlossenen Gates
  kollisionsfrei.** `CodeImporter.tsx:2443`
  (`new Date(abTestStartedAt).toLocaleString("de-DE")`) ist die EINZIGE
  `toLocale*`/`Intl.`-Verwendung im gesamten Produktivcode. Ihre Gate-Kette:
  `:2402` (`projectId && showVariantCounts`) innerhalb von `:1936`
  (`isSettingsOpen`). Entscheidend ist, dass nur das ÄUSSERE Gate garantiert zu
  ist: `projectId` (`:185`) und `abTestStartedAt` (`:234`, über
  `showVariantCounts` `:774`) sind server-geseedet und können im ersten Render
  beide wahr sein. Der Code dokumentiert das an zwei Stellen selbst (`:261`–`:274`
  am State, `:2426`–`:2438` an der Fundstelle).
  ZWEITE FUNDSTELLE DERSELBEN KLASSE: `formatRelative` (`:3003`–`:3012`) liest
  `Date.now()` und ist nur deshalb sicher, weil das Projekt-Menü ebenfalls
  geschlossen startet (`isProjectMenuOpen` `:330`, Gate `:1855`). Kein
  Locale-Aufruf, aber dieselbe Abhängigkeit — deshalb spricht I2 von ZEIT- ODER
  LOCALE-abhängigen Werten und nicht nur von Formatierung.

### Entscheidungen

**1. Schnittkriterium: der Produkt-Loop — Bauen / Veröffentlichen / Messen.**
Die Bereiche folgen dem, was der Nutzer TUT, nicht dem, woraus das System besteht.
*Verworfen — Schnitt nach System-Objekt* (Domain / Tracking / A-B / Analytics):
Phase 11 hängt TikTok, Google, Pinterest, LinkedIn und Custom-Pixel an denselben
Bereich; ein objektbasierter Schnitt wäre unmittelbar nach seiner Einführung
wieder überladen — also genau das Problem, das diese Phase löst, nur eine Ebene
tiefer. *Verworfen — Schnitt nach Nutzungshäufigkeit:* das Kriterium verschiebt
sich mit jedem neuen Feature und mit jedem Nutzertyp; eine Ordnung, die sich unter
der Hand ändert, ist keine Ordnung, sondern eine Momentaufnahme.

**2. Navigationsform: eigene Fläche außerhalb des Dokumentflusses.**
Der Drei-Zonen-Workspace bleibt permanent sichtbar UND permanent gemountet.
Veröffentlichen und Messen liegen auf einer eigenen Fläche AUSSERHALB des
Dokumentflusses, mit eigenem Scroll-Container; umgeschaltet wird INNERHALB dieser
Fläche. Grund ist der oben gemessene Auslöser: das Panel als Flex-Kind im Fluss
verdrängt Workspace und iframe nach unten.
*Verworfen — eigene Routen:* Eine Route-Navigation unmountet den Container. Von
den 46 State-Werten hängen **13** an den `initial*`-Props (12 direkt zugewiesen:
`:182`, `:185`, `:187`, `:190`, `:194`, `:195`, `:200`, `:202`, `:222`, `:224`,
`:230`, `:235`; dazu `isInputCollapsed` `:351`–`:353`, abgeleitet aus
`initialCode`) — sie fielen auf die Props des SEITENAUFRUFS zurück, und die
stammen aus dem Server-Render von `src/app/page.tsx:39`–`:49`, also aus dem beim
Seitenaufruf geladenen Projekt. Die übrigen **33** fielen auf ihre literalen
Startwerte zurück. Ungespeicherter Entwurf, ein zwischenzeitlich gewechseltes
Projekt (`handleSwitch` `:1604`) und die aktive Variante (`:221`, fiele auf `"a"`)
gingen verloren — und `beforeunload` (`:723`–`:731`) feuert bei einer
Client-Navigation nicht, es gäbe also nicht einmal eine Warnung. Der teuerste
Einzelfall wäre ein ungespeicherter B-Entwurf: nach dem Rückfall auf `"a"` legt
der Wurzeltausch A-Inhalt unter B-Erwartung.
*Verworfen — Accordion:* Die Collapse-Semantik ist in dieser Datei bereits durch
den Zen-Modus belegt (`isInputCollapsed` `:351`, `userExpandedManually` `:358`) —
zwei Auf-/Zuklapp-Idiome mit verschiedener Bedeutung auf einer Oberfläche sind
eine Bedienfalle. Und der Inhalt bliebe im Fluss, das Kernproblem also ungelöst.

**3. Zustandsheimat und Mount-Disziplin.**
Der Zustand von `CodeImporter` bleibt im Container; Veröffentlichen und Messen
werden reine Kind-Komponenten ohne eigenen Projekt-Zustand.
ABER: `DomainManager` hält eigenen Zustand (T2) und liegt im Bereich
Veröffentlichen. Deshalb gilt **zweistufig**:
- Die Fläche als GANZES wird beim Schließen abgebaut. Das ist exakt die heutige
  Panel-Grenze (`:1936`) — unverändertes Verhalten, inklusive des Neuladens beim
  nächsten Öffnen (T4) und des Verlusts einer halb getippten Eingabe
  (`DomainManager.tsx:27`). Bewusst hingenommen und hier festgehalten, damit es
  später nicht als NEU gilt.
- INNERHALB der geöffneten Fläche wird zwischen den Bereichen nur VERSTECKT, nie
  ausgehängt.

Grund für die Zweistufigkeit — nicht weglassen: Bliebe die Fläche dauerhaft
gemountet, liefe das 60-Sekunden-Poll-Intervall dauerhaft gegen einen EXTERNEN
Anbieter (Vercel), auch während ausschließlich im Bauen-Bereich gearbeitet wird;
die `document.hidden`-Pause (T4, Präzisierung 3) greift dabei nicht, weil der Tab
ja sichtbar ist. Der Bereichswechsel ist NEU und darf nichts kosten; die
Flächengrenze existiert HEUTE SCHON und bleibt, wie sie ist.

**DIE LADE-EFFEKTE BLEIBEN IM CONTAINER — sie wandern NICHT in die extrahierten
Bereiche.** Vier Lade-Effekte in `CodeImporter.tsx` feuern heute beim MOUNT DES
CONTAINERS, also beim Seitenaufruf und vollständig unabhängig vom Settings-Gate:
`getEventCounts` (`:617`, deps `[projectId]`), `getAdblockLoss` (`:635`, deps
`[projectId]`), `getVariantCounts` (`:660`, deps `[projectId, variantCountsTick]`)
und `getVariantBPublished` (`:693`, deps `[projectId, variantBPublishTick]`).
Keiner davon liest `isSettingsOpen`. Sie befüllen `eventCounts` (`:304`),
`adblockLoss` (`:307`), `variantCounts` (`:312`) und `variantBPublished` (`:251`) —
also ausschließlich Zustände der beiden Bereiche, die diese Phase extrahiert.
Genau deshalb sind sie die naheliegendste Drift-Stelle: Ladelogik wandert
intuitiv mit ihrer Anzeige mit. Lägen sie künftig in einer Komponente, die erst
mit der Fläche mountet, feuerten sie erst beim ERSTEN ÖFFNEN statt beim
Seitenaufruf — eine Verhaltensänderung, die I6 ausschließt. Effekte und Zustände
bleiben daher im Container; die Bereiche bekommen die fertigen Werte als Props.
(Ob ein Server-Call entsteht, hängt zusätzlich an `projectId`: bei `null`
lösen alle vier auf einen Leerwert auf, ohne die Action zu rufen — `:616`,
`:634`, `:658`, `:692`. Das ändert nichts am Mount-Zeitpunkt, um den es hier
geht.)

**DAUERHAFTE REGEL daraus (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende):** Eine Komponente mit eigenem Zustand darf nicht hinter einem
Umschalter liegen, der sie aushängt — entweder sie wird versteckt statt
ausgehängt, oder ihr Zustand wird hochgezogen. Gilt auch für `ActionPanel`
(`:2988`), falls eine spätere UX-Runde ihn verschiebt; heute liegt er außerhalb
des Gates (T3) und ist von dieser Phase nicht betroffen.

**4. Die aktive Variante ist eine Achse ÜBER den Bereichen, keine Sektion.**
Der Umschalter bleibt in der Toolbar (`:1745`–`:1783`), die Test-Aktivierung
gehört zu Veröffentlichen, die Auswertung zu Messen. Grund: `activeVariant`
(`:221`) entscheidet, WORAN gerade gearbeitet wird, und wird an ganz
verschiedenen Stellen gelesen — `editHtml` (`:505`), `publishPairs` (`:803`),
Speicher-Verzweigung (`:1156`). Eine Variante, die man erst in einem Bereich
suchen müsste, wäre in den beiden anderen unsichtbar wirksam.

**5. Umfang dieser Phase: Messen und Veröffentlichen werden extrahiert, Bauen
NICHT.** Gründe für die Auslassung, alle drei: Am Bauen-Bereich hängt der gesamte
Handler-Block (`:872`–`:1706`); er darf nie unmounten (Entscheidung 2); und Phase
11 lädt ausschließlich in den Messen-/Tracking-Bereich, der Nutzen einer
Bauen-Extraktion wäre also nicht abrufbar. Eine spätere eigene Scheibe bleibt
möglich — sie ist aufgeschoben, nicht ausgeschlossen.

**6. Vorgriff auf Phase 11: reine ANORDNUNG, KEIN Vorbau.**
Der Tracking-Bereich wird so angeordnet, dass ein Consent-Gate auf
CONTAINER-Ebene sitzt und nicht je Ziel. Grund: Das heutige Consent-Gate
(`psConsent`) ist fest in die Meta-Pixel-Runtime eincodiert und kein
wiederverwendbares Attribut. Eine Fläche mit einer Tracking-Sektion PRO Netzwerk
legt strukturell fest, dass jedes Netzwerk seine eigene Consent-Prüfung bekommt —
genau die kopierte Prüfung, die der Design-Hinweis zu Phase 11 in der Root
ausdrücklich vermeiden will ("kein drittes Urteil"). Es wird nichts gebaut, kein
Interface angelegt, keine Spalte vorbereitet: die Anordnung soll die Entscheidung
nur nicht VORWEGNEHMEN.

### Invarianten der Phase

Werden in jedem Folge-Prompt wörtlich zitiert.

- **I1** Der Container bleibt gemountet, die Bereiche sind seine Kinder, keine
  eigenen Routen. Der Wechsel innerhalb der Fläche versteckt, er hängt nicht aus.
  Die Fläche selbst darf beim Schließen abgebaut werden.
- **I2** Kein Bereich, der beim ersten Rendern sichtbar ist, rendert ZEIT- ODER
  LOCALE-ABHÄNGIGE Werte. Die Fläche startet geschlossen. Zwei bekannte
  Fundstellen dieser Klasse: die lokalisierte Datumsausgabe in der
  Varianten-Auswertung (`src/components/CodeImporter.tsx:2443`) und
  `formatRelative` im Projekt-Menü (`:3003`–`:3012`, Gate `:1855`) — beide heute
  NUR deshalb sicher, weil ihr jeweiliges Gate geschlossen startet (`:275` bzw.
  `:330`).
- **I3** Die Trennung darf keinen Zustand verstecken. Pro Bereich wird benannt,
  welche Zustände aufmerksamkeitswürdig sind und wie sie an der Navigation SELBST
  sichtbar werden — "nicht besucht" und "in Ordnung" dürfen nicht gleich aussehen.
- **I4** Der Zen-Modus-Paste-Bug wird weder behoben noch verschlimmert. Seine
  Fundstellen (`:351`–`:353`, `:358`, `:892`–`:894`, `:1105`–`:1111`,
  `:2686`–`:2694`, s. `docs/claude-history/backlog-polish.md`) liegen alle
  AUSSERHALB des Einstellungs-Teilbaums; die einzige strukturelle Berührung ist
  `applyZenForLoadedCode` (`:899`–`:931`), das neben den Zen-Flags auch den
  projekt-ungebundenen View-State der Bereiche Veröffentlichen und Messen
  zurücksetzt (`:904`–`:930`).
- **I5** Varianten-Zahlen kommen aus derselben RPC wie heute
  (`get_variant_counts`, Aufruf `:659`). Kein zweiter Rechenweg für dieselbe
  Frage.
- **I6** Reine Umstellung: kein Verhalten ändert sich. Der Nachweis der Phase ist
  Regression, nicht neue Funktion. Klarstellung zur Mount-Disziplin: Die
  Flächengrenze bildet die heutige Panel-Grenze eins zu eins ab, deshalb ist das
  Neuladen beim Öffnen (T4) unverändertes Verhalten und KEINE
  deklarationspflichtige Änderung; der Bereichswechsel innerhalb der Fläche ist
  neu und hat kein Vorher-Verhalten, das erhalten werden müsste. AUSDRÜCKLICH VON
  I6 ERFASST: der ZEITPUNKT, zu dem die vier Lade-Effekte feuern — wandern sie in
  eine erst mit der Fläche mountende Komponente, verschiebt sich ihr Start vom
  Seitenaufruf auf das erste Öffnen, und das ist eine Verhaltensänderung, auch
  wenn am Ende dieselben Zahlen stehen (s. Entscheidung 3).

### Scheiben-Schnitt der Phase

Vier Scheiben, in dieser Reihenfolge:

| Scheibe | Inhalt | Stand |
|---|---|---|
| **10a-1** | Bereich MESSEN extrahieren | **abgeschlossen** (s. unten) |
| **10a-2** | Bereich VERÖFFENTLICHEN extrahieren | offen |
| **10b** | Die Fläche: aus dem Dokumentfluss nehmen, eigener Scroll-Container, Bereichswechsel innerhalb | offen |
| **10c** | I3 — die Zustandssignale an der Navigation | offen |

**ORDNUNGSPRINZIP — zuerst die Eingriffe, deren Ergebnis man vorher kennt, dann die
sichtbaren.** Bei 10a-1 und 10a-2 lautet der Nachweis "unverändert" — der billigste
Beweis, den es gibt: die Bestandstests müssen grün bleiben, mehr ist nicht zu zeigen.
Erst 10b ändert etwas Sichtbares, und es tut das dann auf sauber geschnittenen
Komponenten statt in einer Monolith-Datei. Extraktion und Navigation sind zwei
Wirkungen mit VERSCHIEDENEN Risikoprofilen; zusammen gebaut wäre bei einem Fehlschlag
nicht unterscheidbar, welche der beiden ihn verursacht hat.

**VERHÄLTNIS ZU I6 — damit 10c später nicht als Verstoß gelesen wird.** I6 ("kein
Verhalten ändert sich") bindet **10a-1, 10a-2 und 10b**. **10c ist per Konstruktion
eine Ergänzung**: Die Trennung nimmt der Oberfläche eine Sichtbarkeit, die die
einflächige Anordnung umsonst mitgeliefert hat — auf einer Fläche sah man jeden
Zustand beim Scrollen ohnehin. 10c stellt genau diese Sichtbarkeit wieder her. Das
ist beim Erreichen von 10c AUSDRÜCKLICH zu deklarieren und nicht stillschweigend
unter I6 durchlaufen zu lassen.

### Abgeschlossene Scheiben

#### Scheibe 10a-1 — Bereich MESSEN extrahiert (ABGESCHLOSSEN, live verifiziert 2026-07-31)

Erste Bau-Scheibe der Phase. Commit `6982dba`. Tests **671 -> 672**, keine
Bestands-Assertion geändert (die Testdatei trägt null gelöschte Zeilen). Alle vier
Pipeline-Gates grün: `tsc --noEmit`, `lint`, `vitest run`, `build`.

**Was gebaut wurde.** `src/components/MeasureView.tsx` trägt jetzt Tracking-Pixel
(Meta-Pixel-ID + CAPI-Token), Statistik (event_type-Counts + Adblocker-Verlust) und
Auswertung je Variante. **18 Props**, ausschließlich fertige Werte und schmale
Rückrufe — **weder `settings` noch `setSettings`**, kein Import aus
`src/lib/settings.ts`, **kein eigener Hook** (kein `useState`/`useEffect`/`useRef`/
`useMemo` in der Datei) und **kein umschließendes Element**: die Rückgabe ist ein
Fragment, der gerenderte DOM ändert sich daher außer in der Reihenfolge nicht. Die
vier Lade-Effekte sind **zeilenidentisch** im Container geblieben (Byte-Vergleich
gegen den Vorzustand: keine Differenz). Panel-Reihenfolge jetzt: Tracking-Pixel,
Statistik, Auswertung je Variante, Veröffentlichen, Variante B, Eigene Domain.

**Live bestätigt (neun Schritte, Stefan).** Keine Hydration-Warnung bei
geschlossenem Panel; Reihenfolge und Trennlinien wie geplant; Pixel-ID mit
Dirty-Punkt, Speichern und Reload; Token setzen und zweistufig entfernen inklusive
Abbrechen-Pfad; Statistik und Verlustrate korrekt (angezeigt: "mindestens 13 %");
Varianten-Auswertung je Variante getrennt; Projektwechsel reseedet ohne Leak aus dem
Vorprojekt.

**BEFUND AUS DER MUTATIONSPROBE, DER BESTEHEN BLEIBT — von 10a-1 nicht verursacht,
nur sichtbar gemacht.** Die einseitige Fehlverdrahtung des Token-Rückrufs (der
Klartext-Token flösse dann in `settings` und beim nächsten Speichern in eine Spalte,
die der Owner lesen kann — während der CAPI-Token bewusst in einer Tabelle ohne
SELECT-Policy liegt) wird heute NUR dadurch rot, dass die Setzen-Kette ausfällt: das
Eingabefeld bleibt leer, der Button bleibt `disabled`, die Action wird nie gerufen.
Der Schutz ist ein **NEBENEFFEKT der Button-Logik, kein benannter Wächter** — kein
Test behauptet, dass der Token nicht in `settings` landen darf. Wer die
`disabled`-Bedingung entfernt, entfernt unbemerkt die einzige Abdeckung dieses
Pfades. Eigener Backlog-Eintrag ("FEHLENDER WÄCHTER FÜR DEN TOKEN-PFAD").

**REGEL FÜR 10a-2, aus dieser Scheibe gewonnen.** Eine Ableitung wandert NUR mit in
die Ansicht, wenn sie AUSSCHLIESSLICH von dieser Ansicht gelesen wird. Bei 10a-1 traf
das auf `variantRows`, `hasVariantData`, `variantCountsFailed` und
`showVariantCounts` zu — sie sind mitsamt Erklärblock nach `MeasureView` gewandert.
`publishPairs` erfüllt die Bedingung NICHT (`handlePublish` liest es) und bleibt im
Container.

**BEOBACHTUNG BEIM PROJEKTWECHSEL.** Beim Wechsel ist ein sichtbarer, gestaffelter
Rückbau der Bereiche zu sehen; das Verhalten ist älter als diese Scheibe und wurde
durch die Umsortierung lediglich sichtbarer — **I6 bleibt gewahrt**, geändert hat
sich die Sichtbarkeit eines bestehenden Verhaltens, nicht das Verhalten. Gemessene
Ursache und Risiko: eigener Backlog-Eintrag ("GESTAFFELTER RÜCKBAU BEIM
PROJEKTWECHSEL").

**NÄCHSTE SCHEIBE: 10a-2 — Bereich VERÖFFENTLICHEN extrahieren.**

### Ausdrücklich NICHT in dieser Phase

- Extraktion des Bauen-Bereichs (Entscheidung 5).
- Zusammenführung der drei Projekt-Ladepfade (`handleSwitch` `:1604`–`:1612`,
  `handleDelete` `:1667`–`:1674`, `resetToEmpty` `:873`–`:880`) — eigener
  Backlog-Eintrag.
- Der Zen-Modus-Paste-Bug (I4).
- Phase-11-Inhalte: kein weiterer Pixel-Typ, kein Fan-Out-Ziel, kein
  Consent-Mechanismus (Entscheidung 6 ist Anordnung, kein Bau).
- UI-Feinpolitur.

### Noch offen — gehört in die Stufe-1-Planung

- Die konkrete Ausprägung der Fläche: Drawer, Overlay oder andere Form. In
  derselben Datei existiert bereits ein Overlay-Muster (Projekt-Dropdown `:1856`:
  `absolute … z-10 … max-h-96 overflow-y-auto`) — als vorhandenes Muster genannt,
  nicht als Auswahl.
- Die Benennung der Bereiche in der Oberfläche.
- Die Umsetzung von I3.
