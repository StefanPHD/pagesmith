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

**ZEITSTAND DIESES ABSATZES: VOR den Bau-Scheiben, GELÖST DURCH 10b-1.** Er
beschreibt den Auslöser der Phase im Präsens und bleibt als Begründung stehen —
seine Zeilennummern und sein Befund gelten für den Stand vor 10a-1. Seit Commit
`e2a1add` liegt die Fläche außerhalb des Dokumentflusses und verdrängt nichts mehr.

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

**ZEITSTAND DIESES ABSCHNITTS UND DER ENTSCHEIDUNGEN DARUNTER.** Die Zeilenangaben
wurden am 2026-07-31 **VOR den Bau-Scheiben** erhoben und waren damals korrekt.
Durch 10a-1, 10a-2 und 10b-1 sind die Angaben zu **`CodeImporter.tsx`** überholt
(Beispiel: das Panel-Gate stand `:1936`, steht heute `:1888`). Sie werden **BEWUSST
nicht nachgezogen**: Dieser Abschnitt dokumentiert, **WARUM** entschieden wurde,
nicht **WO** etwas steht — und die stehende Regel verbietet ohnehin, eine
Zeilennummer aus einem Dokument in einen Prompt zu übernehmen. **Jede frische
Messung am Code schlägt jede Angabe hier.**
**SEIT 10b-2 GILT DASSELBE FÜR `DomainManager.tsx` — die frühere Fassung dieses
Absatzes ("NUR `CodeImporter.tsx` ist betroffen … die Angaben zu `DomainManager.tsx`
gelten unverändert") ist damit ÜBERHOLT und wurde ERSETZT, nicht ergänzt.** 10b-2 hat
dort einen 16-zeiligen Auflagen-Kommentar über den State-Block gesetzt; ALLE Angaben
darunter verschieben sich um **+16** (gemessen: der State-Block stand `:26`–`:34`,
steht heute `:42`–`:50`; der Lade-Effect stand `:53`, steht `:69`; der Poll-Effect
stand `:76`, steht `:92`; der Status-Effect je Zeile stand `:203`, steht `:219`).
Die Zitate in T2/T4 und in den Scheiben-Vermerken bleiben stehen — sie sind
Zeitdokument; korrigiert wird hier, nicht dort.
**Unverändert gültig** sind allein die Angaben zu `ActionPanel.tsx` (T2),
`src/lib/settings.ts` (T5) und `src/app/page.tsx` (Entscheidung 2): diese drei
Dateien hat KEINE Bau-Scheibe der Phase angefasst.
**LEHRE FÜR KÜNFTIGE RECORDS (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende):** Der haltbare Anker ist der **SYMBOLNAME**
(`applyZenForLoadedCode`, `settingsEqual`, `statusBadge`), nicht die Zeile. Namen
überleben Refactorings, Zeilennummern nicht.

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

**FORM DER FLÄCHE — entschieden vor 10b-1 (ergänzt, ersetzt nichts oben).**
**Drawer von rechts, volle Höhe, fixiert, mit eigenem Scroll-Container.** Grund:
Der Inhalt ist hoch — sechs Abschnitte plus je Domain eine DNS-Tabelle; volle Höhe
trägt das, ein Höhendeckel an einem Toolbar-Anker nicht. Der Workspace bleibt beim
Öffnen und Schließen exakt an seinem Platz.
*Verworfen — Overlay unter der Toolbar* (das Muster des Projekt-Dropdowns,
`:1856`): trägt technisch, ist aber für einen Inhalt dieser Höhe, verankert an
einem kleinen Knopf, schief.
*Verworfen — Modal:* blockiert den Workspace vollständig und braucht Fokusfalle
und Escape-Behandlung — mehr Maschinerie, als eine reine Umstellung will.

**PRÄZISIERUNG zur Formulierung "permanent sichtbar" weiter oben:** Gemeint war
und ist **NICHT VERDRÄNGT**. Ein Drawer verdeckt den Workspace teilweise, solange
er offen ist; das ist hingenommen und hier benannt, damit es später nicht als
Abweichung gelesen wird. **"Permanent gemountet" bleibt dagegen hart und
unverändert.**

**ZWEI BEREICHE, nicht drei:** Bauen IST der Workspace und liegt nicht auf der
Fläche. Umgeschaltet wird zwischen Veröffentlichen und Messen.

**MOUNT-FOLGE, die I6 in 10b-1 trägt:** Weil innerhalb der Fläche nur VERSTECKT
wird (I1), sind beide Bereiche gemountet, sobald die Fläche offen ist.
`DomainManager` mountet damit **exakt wie heute** — beim Öffnen der Fläche,
unabhängig vom aktiven Bereich. Der Bereichswechsel selbst löst **KEINEN**
Server-Aufruf aus.

Der Umschaltzustand ist **neuer View-State** und liegt nach Entscheidung 3 im
Container, wie `isSettingsOpen`.

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

**ALLGEMEINE FORM DAVON (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende):** Ein wiederkehrender Aufruf gegen einen externen Dienst wird an die
Sichtbarkeit des **BEREICHS** gebunden, der ihn braucht, nicht an die des **Tabs**.
Die `document.hidden`-Pause greift nicht, wenn der Nutzer im selben Tab anderswo
arbeitet. (Der Absatz darüber ist der konkrete Fall und bleibt als Beleg stehen.)

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
  **(Kandidat für die Hebung nach "## Immer beachten" am Phasenende — die Regel
  gilt unabhängig von Phase 10: sie ist eine Hydration-Regel, keine
  Workspace-Regel.)**
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
  **KLARSTELLUNG, WAS "VERHALTEN" HIER MEINT (ergänzt vor 10b-1; I6 selbst bleibt
  im Wortlaut unverändert, weil 10a-1 und 10a-2 sich darauf berufen).** Gemeint
  sind: dieselben Bedienelemente, dieselben Aktionen, dieselben Server-Aufrufe zu
  denselben Zeitpunkten, dieselben Zustandsübergänge — und vor allem KEINE neue
  Produktfähigkeit. NICHT gemeint sind Position und Sichtbarkeit der Fläche sowie
  die Existenz eines Bereichs-Umschalters: Genau das wird in 10b-1 NACH ABSICHT
  anders, es ist der Zweck der Scheibe und kein Verstoß. Für 10a-1 und 10a-2 galt
  und gilt I6 unverändert im engeren Sinn — dort war jede Differenz außer der
  Abschnitts-Reihenfolge (10a-1) bzw. gar keine (10a-2) ausgeschlossen.
  Ohne diese Klarstellung läse sich 10b-1 wörtlich als dreifacher Verstoß gegen
  die eigene Invariante; die ursprüngliche Formulierung war zu weit.

### Scheiben-Schnitt der Phase

Fünf Scheiben, in dieser Reihenfolge:

| Scheibe | Inhalt | Stand |
|---|---|---|
| **10a-1** | Bereich MESSEN extrahieren | **abgeschlossen** (s. unten) |
| **10a-2** | Bereich VERÖFFENTLICHEN extrahieren | **abgeschlossen** (s. unten) |
| **10b-1** | Die Fläche: Drawer rechts, aus dem Dokumentfluss, eigener Scroll-Container, Bereichswechsel innerhalb (versteckend) | **abgeschlossen** (s. unten) |
| **10b-2** | Mount-Disziplin `DomainManager`: der Zustand über den Projektwechsel (s. Backlog) | **abgeschlossen** (s. unten) |
| **10c** | I3 — die Zustandssignale an der Navigation | offen |

**ORDNUNGSPRINZIP — zuerst die Eingriffe, deren Ergebnis man vorher kennt, dann die
sichtbaren.** Bei 10a-1 und 10a-2 lautet der Nachweis "unverändert" — der billigste
Beweis, den es gibt: die Bestandstests müssen grün bleiben, mehr ist nicht zu zeigen.
Erst 10b-1 ändert etwas Sichtbares, und es tut das dann auf sauber geschnittenen
Komponenten statt in einer Monolith-Datei. Extraktion und Navigation sind zwei
Wirkungen mit VERSCHIEDENEN Risikoprofilen; zusammen gebaut wäre bei einem Fehlschlag
nicht unterscheidbar, welche der beiden ihn verursacht hat.

**WARUM 10b GETEILT IST — dieselbe Logik eine Ebene tiefer.** 10b-1 ändert Position
und Sichtbarkeit; 10b-2 ändert einen Zustands-LEBENSZYKLUS und ist damit eine
DEKLARATIONSPFLICHTIGE Verhaltensänderung, die I6 nicht deckt. Zusammen gebaut wäre
bei einem Fehlschlag wiederum nicht unterscheidbar, welche der beiden ihn verursacht
hat. **10b-2 folgt unmittelbar auf 10b-1** — es ist keine Vertagung, sondern eine
Trennung der Nachweise.

**VERHÄLTNIS ZU I6 — damit 10c später nicht als Verstoß gelesen wird.** I6 ("kein
Verhalten ändert sich") bindet **10a-1, 10a-2 und 10b-1** — für 10b-1 in der Lesart
der KLARSTELLUNG bei I6 (Position, Sichtbarkeit und der Umschalter sind nach Absicht
neu und kein Verstoß). **10b-2 bindet es NICHT**, s. den Absatz darüber. **10c ist per Konstruktion
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

#### Scheibe 10a-2 — Bereich VERÖFFENTLICHEN extrahiert (ABGESCHLOSSEN, live verifiziert 2026-07-31)

Zweite und letzte Extraktions-Scheibe. Commit `ef106a6`. Tests **672 -> 672**, **NULL
geänderte Tests** — `CodeImporter.test.tsx` war nicht im Diff (der Commit trägt genau
zwei Dateien: `CodeImporter.tsx` 23/249 und `PublishView.tsx` 329/0). Alle vier
Pipeline-Gates grün: `tsc --noEmit`, `lint`, `vitest run`, `build`.

**Was gebaut wurde.** `src/components/PublishView.tsx` trägt Veröffentlichen
(Publish-Button, Live-URL, Hinweis-Slot, Statuszeile), Variante B (A/B-Test-Schalter
UND Entfernen) und die Domain-Verwaltung. **20 Props** — und **kein einziger neu
geschriebener Rückruf**: alle drei Handler und der Setter werden unverändert
durchgereicht (das unterscheidet 10a-2 von 10a-1, wo `onMetaPixelIdChange` eine neue
Inline-Funktion brauchte). Kein Hook, kein `settings`, kein Import aus
`src/lib/settings.ts`, kein umschließendes Element (Fragment). **Zeilenidentisch
geblieben** (je per Byte-Vergleich gegen den Vorzustand belegt): die drei Handler
`handlePublish`, `handleToggleAbTest`, `handleRemoveVariantB`, der gesamte
Ableitungsblock und die vier Lade-Effekte. **Reihenfolge im Panel unverändert** — die
drei Abschnitte standen nach 10a-1 bereits konsekutiv, es gab nichts umzusortieren.

**Zwei Entscheidungen, mit Grund.**
- **`DomainManager` wird von `PublishView` selbst importiert und gerendert (Weg 1).**
  Verworfen wurde der Slot über den Container: sein einziger Vorteil wäre, in 10b ein
  EINZELNES Kind auszuhängen — also genau das, was die dauerhafte Regel aus 10a-1
  verbietet, und obendrein unsichtbar für den, der die Komponente liest.
- **`emptyPublishTarget` geht ROH hinein** (`"a" | "b" | null`) statt als fertig
  berechnetes `publishDisabled`. Dadurch bleibt die `disabled`-Bedingung wörtlich im
  JSX stehen und erzeugt keine Diff-Zeile. Eine Verschmälerung der Schnittstellen
  gehört in eine eigene Runde, nicht nebenbei in einen Refactor, dessen ganzer Wert an
  der Enge des Nachweises hängt.

**NACHGESCHÄRFTE REGEL (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende) — ersetzt die Fassung aus 10a-1, die notwendig, aber nicht
hinreichend war.** Eine Ableitung wandert NUR mit in die Ansicht, wenn sie
ausschließlich von dieser Ansicht gelesen wird **UND ihre Eingänge ebenfalls
mitwandern oder ohnehin Props sind**. `publishNotice` erfüllt die erste Bedingung,
nicht die zweite: es hängt über `emptyPublishMessage` und `emptyPublishTarget` an
`publishPairs`, und das liest `handlePublish`. Bei 10a-2 wanderte deshalb **KEINE
einzige** Ableitung mit, bei 10a-1 waren es vier — VERÖFFENTLICHEN hängt über
`publishPairs` und `settings` tiefer in BAUEN, als MESSEN es tat.

**Mutationsproben.** Drei mit Schreibwirkung, alle rot: `onPublish` ↔
`onRemoveVariantB` (**9** rot), `onToggleAbTest` ↔ `onRemoveVariantB` (**11** rot),
`variantBusy` ↔ `variantBRemoveConfirming` (**3** rot). **Ausdrücklich NICHT per
Mutation geprüft:** die String-Props `hostingLabel`, `liveUrl`, `activeVariantLabel` —
ihre Verwechslung erzeugt keinen falschen Schreibvorgang, sondern eine falsche
Anzeige, und wurde über die Live-Schritte abgedeckt.

**Live bestätigt (zwölf Schritte, Stefan).** Keine Hydration-Warnung; Reihenfolge und
Trennlinien unverändert; Erstveröffentlichung mit aufrufbarer Live-URL; Re-Publish
transportiert die Änderung; Publish-Riegel mit genau einem Hinweis; A/B-Test starten
und stoppen inklusive stehenbleibendem Zeitstempel; Verweigerungspfad bei
unveröffentlichter Variante B; Abbrechen-Pfad; echtes Entfernen bei aktiver Variante B
mit Rückfall auf A-Inhalt; Domain-Liste lädt beim erneuten Öffnen neu.

**BEFUND, DER DIE ARCHITEKTUR-ENTSCHEIDUNG BESTÄTIGT.** Beim Projektwechsel bleiben
**Eingabefeld und Add-Fehlermeldung** des `DomainManager` stehen (`input`
`DomainManager.tsx:27`, `addError` `:29` — beide haben keinen an `projectId`
gebundenen Schreibpfad). Der Container HAT einen Rücksetz-Mechanismus für genau diesen
Fall — `applyZenForLoadedCode` setzt beim Projektwechsel die projekt-ungebundenen
View-Zustände zurück —, aber er **endet an der Komponentengrenze**, weil
`DomainManager` seinen Zustand selbst hält. Genau deshalb verlangt Entscheidung 3, dass
die neuen Bereiche reine Kinder OHNE eigenen Zustand sind: damit Rücksetzungen
sichtbare Zuweisungen bleiben statt stillschweigend auszubleiben. `DomainManager` ist
die GEERBTE Ausnahme von dieser Regel — und dort tritt der Fehler auf. **Von 10a-2
nicht verursacht:** Commit `ef106a6` enthält `DomainManager.tsx` nicht, und die
Bedingung über seinem Aufruf ist unverändert (vorher wie nachher allein
`isSettingsOpen`). Details, Umfang und Fix-Kandidat: Backlog-Eintrag
"DOMAINMANAGER BEHÄLT EINGABE UND FEHLERMELDUNG ÜBER DEN PROJEKTWECHSEL".

**NÄCHSTE SCHEIBE: 10b — die Fläche aus dem Dokumentfluss nehmen, eigener
Scroll-Container, Bereichswechsel innerhalb.**

#### Scheibe 10b-1 — Einstellungen als Drawer mit Bereichs-Reitern (ABGESCHLOSSEN, live verifiziert 2026-07-31)

Erste Scheibe der Phase mit sichtbarer Wirkung. Commit `e2a1add`. Tests
**672 -> 675**, **NULL geänderte Bestands-Assertionen** (die Testdatei trägt 96
Einfügungen und 0 Löschungen). Alle vier Pipeline-Gates grün: `tsc --noEmit`,
`lint`, `vitest run`, `build`.

**Was gebaut wurde.** Das Einstellungs-Panel ist ein **Drawer von rechts** —
`fixed inset-y-0 right-0 z-20 w-[30rem] max-w-full overflow-y-auto`. Darin zwei
Bereiche (**Messen**, **Live**) über eine Reiterzeile, umgeschaltet **VERSTECKEND
per Tailwind-Klasse** nach dem Muster des Edit-iframes — weder das HTML-Attribut
`hidden` noch `aria-hidden`, weil beide den Teilbaum aus dem Accessibility-Tree
nähmen und die bestehenden `getByRole`-Abfragen bräche. Neuer View-State
`drawerArea` neben `previewMode`, **projekt-ungebunden und bewusst NICHT in
`applyZenForLoadedCode`**. `MeasureView`, `PublishView`, `DomainManager` und
`ActionPanel` sind **nicht im Diff**; die Props beider Bereiche sind unverändert.
Die vier Lade-Effekte sind **zeilenidentisch** (Byte-Vergleich gegen den
Vorzustand, Versatz nur durch die sieben neuen State-Zeilen).

**KANDIDAT FÜR DIE HEBUNG nach "## Immer beachten" am Phasenende — der Satz oben
zum Versteck-Mechanismus:** weder das HTML-Attribut `hidden` noch `aria-hidden`,
weil beide den Teilbaum aus dem Accessibility-Tree nehmen und `getByRole` per
Default danach filtert. Gilt für jede künftige Versteck-Stelle, nicht nur für
diese; der Fehler wäre ein Schwall roter Bestandstests ohne erkennbare Ursache.

**I6 in der geklärten Lesart gehalten:** dieselben Aktionen, dieselben
Server-Aufrufe zu denselben Zeitpunkten, keine neue Produktfähigkeit. Nach
Absicht neu sind Position, Sichtbarkeit und die Reiter.

**DAS SCHLIESSKREUZ IST EINE AUSGLEICHSMASSNAHME, keine neue Fähigkeit.** Der
Drawer ist `fixed`, der Toolbar-Schalter nicht — bei gescrollter Seite wäre der
einzige Schließweg aus dem Sichtfeld gewandert. **Das Problem entsteht durch diese
Scheibe, das Element gleicht es aus.** Live bestätigt (Schritt 11). Bewusst NICHT
dazu: Escape-Handler, Fokusfalle, Backdrop-Klick.

**ALLGEMEINE FORM DAVON (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende):** Wer ein Element aus dem Dokumentfluss nimmt (`fixed` oder
`absolute`), prüft, ob der **BEDIENWEG** dorthin mitscrollt. Das fixierte Element
bleibt stehen, sein Auslöser nicht — bei gescrollter Seite kann der einzige Zugang
aus dem Sichtfeld wandern. (Der Absatz darüber ist der konkrete Fall und bleibt als
Beleg stehen.)

**BENENNUNG DER BEREICHE — entschieden und damit erledigt: "Messen" und "Live".**
Grund für *Live* statt *Veröffentlichen*: Ein gleichnamiger Reiter neben dem
Publish-Knopf hätte zwei Bedienelemente mit **identischem Namen und verschiedener
Wirkung** ergeben. Acht bestehende Abfragen hätten den Reiter mitgefunden; bei
einem bereits veröffentlichten Projekt (der Knopf heißt dann „Erneut
veröffentlichen") hätte eine Abfrage **nur noch den Reiter** getroffen und still
das falsche Element geklickt. *Verworfen wurden `aria-label` und `role="tab"`:*
beide hätten die ABFRAGEN eindeutig gemacht und zwei gleichnamige Bedienelemente
auf dem Bildschirm stehen lassen — das Instrument justiert statt der Sache.
„Live" deckt außerdem alle drei Abschnitte des Bereichs, „Veröffentlichen" nur
einen.
**DAZU ein gemessener Nebenbefund:** In der laufenden App trägt eine verbundene
Domain ein Status-Abzeichen mit dem exakten Text **„Live"** im selben Reiter —
`DomainManager.tsx:478` (`statusBadge`), gerendert als `<span>` bei `:259`–`:261`,
**keine Button-Rolle**. Räumlich und optisch klar getrennt, deshalb hingenommen —
aber festgehalten, damit es bei künftigen Abfragen bekannt ist. Die neuen Tests
adressieren die Reiter deshalb über **verankerte Rollen-Abfragen**
(`getByRole("button", { name: /^Live$/ })`).

**DAUERHAFTE REGEL daraus (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende):** Zwei Bedienelemente mit **gleichem Namen und verschiedener Wirkung**
sind ein **OBERFLÄCHEN**-Problem, kein Testproblem. Wird eine Testabfrage
mehrdeutig, ist **zuerst die Oberfläche zu prüfen** — nicht die Abfrage eindeutig
zu machen. Genau das war hier die Entscheidung: `aria-label` und `role="tab"`
hätten die Abfragen repariert und die Doppeldeutigkeit auf dem Bildschirm stehen
lassen.

**DAUERHAFTER PRÜFSCHRITT daraus (Kandidat für die Hebung nach "## Immer beachten"
am Phasenende):** Ein neues Bedienelement kann bestehende Abfragen auf **zwei**
Weisen brechen — es macht sie **mehrdeutig**, ODER es kippt eine Behauptung über
die **ABWESENHEIT** eines Textes (`not.toContain`, `queryBy… toBeNull` und
Verwandte). **Beides VOR dem Bau prüfen, nicht danach.** In dieser Scheibe fand die
erste Prüfung acht gefährdete Abfragen; die zweite fand keine, aber erst nachdem
66 Negativ-Behauptungen einzeln durchgesehen waren — ohne den ausdrücklichen
Prüfschritt wäre sie gar nicht gefahren worden.

**BEFUND ZUR TESTABDECKUNG, DER DIE SCHEIBE ÜBERDAUERT.** Zwei der drei
Mutationen — *Versteck-Bedingung an beiden Hüllen entfernt* und *die beiden
Reiter-`onClick` vertauscht* — werden **ausschließlich vom neuen Struktur-Test
gefangen**; die übrigen 90 Tests laufen dabei grün durch. **Zwei Fehlerklassen
hängen damit an EINEM Test.** Wer ihn später als redundant empfindet, entfernt die
einzige Abdeckung dieser beiden Fälle. Der Test sichert **Struktur, NICHT
Sichtbarkeit** — jsdom wertet die Klasse nicht aus (in Stufe 1 gemessen: kein
Stylesheet in `vitest.config.ts`, `display` einer `.hidden`-Klasse ist `block`,
`checkVisibility` fehlt). Die Sichtbarkeit selbst ist ausschließlich live
nachweisbar und wurde in den Schritten 2 und 3 bestätigt. Die dritte Mutation
(Verstecken → bedingtes Rendern) traf **36 Tests**.

**KANDIDAT FÜR DIE HEBUNG nach "## Immer beachten" am Phasenende — die Messung
oben zur Testumgebung:** kein Stylesheet in `vitest.config.ts`, `display` einer
`.hidden`-Klasse ist in jsdom `block` wie ohne Klasse, `checkVisibility` fehlt.
Das ist eine dauerhafte Eigenschaft des Setups, nicht der Phase: sie entscheidet,
was ein Test überhaupt behaupten darf, und verhindert Tests, die nur so aussehen,
als prüften sie Sichtbarkeit.

**Live bestätigt (dreizehn Schritte, Stefan).** Keine Hydration-Warnung; je Reiter
ausschließlich die zugehörigen Abschnitte; keine Verdrängung des Workspace beim
Öffnen und Schließen; Seiten-Scrollposition unberührt; der Drawer scrollt intern;
Auswahl, Highlighting und Scrollposition im Vorschau-iframe bleiben erhalten;
Reiterwechsel ohne jede Netzwerk-Anfrage; Schließen und erneutes Öffnen lädt die
Domain-Liste wie zuvor; beide Bereiche voll bedienbar; Schließkreuz nach
Seiten-Scroll erreichbar; schmales Fenster bedienbar; Projekt-Dropdown nicht
verdeckt.

**GESTALTUNGS-BEFUND AUS DEM LIVE-TEST — KEIN FEHLER.** Der erste Abschnitt im
Live-Reiter trägt seine Trennlinien-Klassen selbst (`PublishView.tsx:85`,
`mt-4 border-t border-gray-200 pt-4`) und zeigt sie im Drawer **freistehend über
„Veröffentlichen"**. Der Owner beurteilt das als **GEWINN**: Die Linie trennt die
Reiterzeile klar vom Inhalt und wirkt luftiger. Im Messen-Reiter fehlt sie, weil
`MeasureView`s erster Knoten (`:140`, die Überschrift „Tracking-Pixel") diese
Klassen bewusst nicht trägt — dort wirkt es gedrängter.
**ZIEL, aber NICHT durch Duplizieren:** Die Linie gehört **nicht zusätzlich** in
`MeasureView`. Sie trennt die REITERZEILE vom Inhalt und ist damit eine Eigenschaft
des **DRAWERS**, nicht der Bereiche. Richtige Umsetzung: eine Trennlinie **unter der
Reiterzeile im Drawer**, und die Klassen verschwinden dafür aus
`PublishView.tsx:85`. Eine Stelle statt zwei — und keine Ansicht trägt Wissen über
ihre Position im Drawer, was bei einem dritten Bereich oder einer Umsortierung
sonst sofort wieder falsch wäre.
**TRIGGER: Scheibe 10c.** Sie arbeitet ohnehin an der Reiterzeile, weil dort die
Zustandssignale aus I3 hinkommen — dieselbe Fläche, ein Eingriff.

**NÄCHSTE SCHEIBE: 10b-2 — Mount-Disziplin `DomainManager`.**

#### Scheibe 10b-2 — Projektwechsel als Mount-Grenze für `DomainManager` (ABGESCHLOSSEN, live verifiziert 2026-08-01)

Commit `4abefdc`. Tests **675 -> 678** (677 im Bau-Commit, +1 im Nachtrag-Commit),
**NULL geänderte Bestands-Assertionen**. Alle vier Pipeline-Gates grün:
`tsc --noEmit`, `lint`, `vitest run`, `build`.
**DEKLARIERTE VERHALTENSÄNDERUNG — I6 deckt sie NICHT, das ist der Zweck der
Scheibe.**

**Was gebaut wurde.** `key={projectId}` an der `DomainManager`-Aufrufstelle in
`PublishView`. **Zahl und Zeitpunkt der Server-Aufrufe sind unverändert** — beide
Effekte in `DomainManager` hingen ohnehin an `[projectId]`, der Remount ersetzt
einen deps-Neulauf durch einen Mount-Lauf im selben Commit. Geändert hat sich das
FENSTER, in dem alte Daten stehen: von „bis die neuen eintreffen" auf „gar nicht" —
und beim Wechsel auf ein ungespeichertes Projekt von „dauerhaft" auf „gar nicht".
*Verworfen — ein `projectId`-Riegel je Aktion:* ließe eine tote Liste mit toten
Knöpfen stehen und müsste bei jeder künftigen Zeilen-Aktion erneut angebracht
werden. *Verworfen — ein Wechselzähler als Key* (der einzige Weg, auch `null -> null`
zu unterscheiden): er hätte eine FÜNFTE Zuweisung an die vier `setProjectId`-Stellen
gehängt — genau der fehlende gemeinsame Chokepoint, der als eigener Backlog-Eintrag
geführt wird. Ein Fix, der die bekannte Divergenzquelle erweitert, macht es
schlechter.

**GRENZE, bewusst offen.** `null -> null` (zwei neue Projekte nacheinander) ist KEIN
Key-Wechsel — React koerziert `null` zum konstanten String-Key `"null"` (gemessen).
Heute folgenlos, weil im Null-Zustand JEDER Schreibpfad gesperrt ist. **Diese
Bedingung trägt den ganzen Schutz** und steht deshalb als Auflage über dem
State-Block von `DomainManager`, dort, wo jemand einen neuen Zustand ergänzen würde.

**RESTRISIKO.** Der Schutz ist eine MOUNT-Eigenschaft, kein Riegel in der Aktion:
`handleRemove` trägt weiterhin keine Kontextprüfung, `DomainRow` kennt `projectId`
weiterhin nicht. Die veraltete Zeile ist nicht mehr erreichbar, weil sie nicht mehr
EXISTIERT — nicht, weil ihr Knopf abgesichert wäre. Wird der Remount später
aufgehoben, ist die Lücke still zurück: kein Typfehler, kein roter Build.

**WAS DIE DREI TESTS TRAGEN — und was NICHT (gemessen, nicht angenommen).** Die
Mount-Grenze sichern allein die Tests A (veraltete Liste) und B (Eingabe +
Fehlermeldung); beide werden rot, sobald der Key fällt. Test C (Übergang
`null -> echte ID`, Argument = neue id) bleibt bei entferntem Key **GRÜN** — er
sichert die DEPS-KETTE, nicht die Mount-Grenze. Das steht so in seinem Kommentar,
damit ihn niemand als Key-Wächter liest. Rot wird C, wenn der frühe Return im
Lade-Effect fällt.

**BEFUND ZUM INSTRUMENT (Kandidat für die Hebung nach "## Immer beachten" am
Phasenende).** Server-Actions erscheinen im Netzwerk-Tab als **POST auf die
Seiten-URL**, NICHT unter ihrem Namen: der Klartextname steht nur als
Sourcemap-Argument im Bundle (`createServerReference(<opake id>, callServer, …,
"listProjectDomains")`), gesendet wird die opake ID im `next-action`-Header. Alle
Actions einer Seite sehen in der Namensspalte identisch aus.
**FOLGE FÜR JEDE LIVE-ANLEITUNG:** „im Netzwerk-Tab nach `<Action>` suchen" ist eine
UNTAUGLICHE Sonde und erzeugt falsche Entwarnung. Tauglich sind: POSTs auf die
Seiten-URL zählen, der `next-action`-Header — oder, schärfer, die Nachstellung im
Test. **Genau dieser Fall ist in Live-Schritt 6 eingetreten:** kein Eintrag sichtbar,
Aufruf nachweislich erfolgt.

**BEFUND ZUM WERKZEUG (ebenfalls Hebungs-Kandidat).** Die CRLF-Falle trifft auch die
RÜCKNAHME einer Mutation, nicht nur das Schreiben. Eine `sed`-Rücknahme hinterließ
`CodeImporter.tsx` als geändert bei inhaltlich LEEREM Diff; ohne die Zählung im
Scope-Wächter („genau drei Einträge") wäre eine vierte Datei in den Commit gewandert.
Der Mutationszyklus — setzen, messen, zurücknehmen — ist ebenso werkzeuggefährdet wie
das Schreiben selbst.

**Live bestätigt (sieben Schritte, Stefan).** Veraltete Domain-Zeile verschwindet
sofort; Eingabe und Fehlermeldung werden beim Projektwechsel zurückgesetzt;
`null -> null` verhält sich wie dokumentiert; der getippte Text überlebt den
REITERwechsel und stirbt beim PROJEKTwechsel (die richtige Achse); Klick auf das
bereits aktive Projekt setzt nichts zurück; kein doppeltes Poll-Intervall über zwei
Minuten gegen Vercel, Cooldown arbeitet normal. **Schritt 6 über die Nachstellung im
Test bestätigt, NICHT über die Browser-Beobachtung** — s. Befund zum Instrument.

**NÄCHSTE SCHEIBE: 10c — I3, die Zustandssignale an der Reiterzeile, plus die
Trennlinie unter die Reiterzeile (aus 10b-1).**

### Ausdrücklich NICHT in dieser Phase

- Extraktion des Bauen-Bereichs (Entscheidung 5).
- Zusammenführung der drei Projekt-Ladepfade (`handleSwitch`, `handleDelete`,
  `resetToEmpty` in `src/components/CodeImporter.tsx`) — eigener Backlog-Eintrag.
  BEWUSST OHNE ZEILENANGABEN (umgestellt 2026-08-01, Nachtrag zu 10b-2): die
  früheren Nummern waren nach drei Bau-Scheiben falsch, und heutige wären es nach
  den nächsten drei wieder. Der haltbare Anker ist der SYMBOLNAME — s. den
  Zeitstand-Block oben.
- Der Zen-Modus-Paste-Bug (I4).
- Phase-11-Inhalte: kein weiterer Pixel-Typ, kein Fan-Out-Ziel, kein
  Consent-Mechanismus (Entscheidung 6 ist Anordnung, kein Bau).
- UI-Feinpolitur.

### Noch offen — gehört in die Stufe-1-Planung

- Die Umsetzung von I3.
