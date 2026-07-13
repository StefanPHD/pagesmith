## Phase 5 — In-Place Copywriting, Scheibe 1: Engine + funktionale Vorschau
Zweiter Modus neben dem Link-Mapping: der Marketer überschreibt Texte (<h1>..<h6>,
<p>) direkt für schnelle A/B-Tests am Wording. Kein Modell-Umbau — ein
Text-Override ist nur ein NEUER Mapping-Typ
{ elementId: ps-id, type: "text", config: { content: string } } auf der
BESTEHENDEN Infrastruktur (anchorMappingTarget, Weg-C-Orphan-Netz, JSON-Datenblock,
generateFunctional). Das type-diskriminierte Mapping-Modell bewährt sich damit ein
ZWEITES Mal (nach dem Redirect-Zweig): neuer Aktionstyp = neuer Union-Zweig, keine
Antastung der Redirect-Form.

Owner-Entscheidungen (Scheibe 1, endgültig):
- NUR reine Textelemente als Kandidaten anbieten: <h1>..<h6> und <p>, gefiltert auf
  KEINE Kind-Elemente (nur reiner Text / harmlose Inline wie <br>). Verschachtelte
  Elemente (<p>...<strong>...</a>...) werden in dieser Scheibe NICHT angeboten — ein
  textContent-Überschreiben würde das Kind-Markup zerstören. Rich-Text /
  verschachtelte Texte bleiben BEWUSST ein späteres Slice.
- Kategorientrennung: ein bereits als Link/Button erkanntes Element ist KEIN
  Text-Kandidat (auch wenn es nur Text enthält). Text ist eine EIGENE
  Detektions-Kategorie, kein Überlapp mit den interaktiven Elementen.
- Scheibe 1 liefert: Engine-Erweiterung + funktionale VORSCHAU (Text live editierbar,
  Änderung sofort im Vorschau-iframe sichtbar). Der EXPORT folgt als eigene Scheibe.

Export-Richtung (für die Folge-Scheibe dokumentiert, NICHT jetzt bauen):
- Geänderter Text wird im EXPORT DIREKT in den DOM geschrieben (das <h1> enthält im
  Output schon den neuen Text), NICHT per Laufzeit-JS injiziert -> gut für SEO, kein
  FOUC/Flackern, funktioniert ohne JS. Das ist das "Vorschau-JS vs. Export-direkt-DOM"-
  Muster eine Ebene über der Link-Lektion: beim Link ist Laufzeit-JS zwingend
  (Klick = Laufzeit), beim Text nicht (der Inhalt steht von Anfang an fest).

Architektur (Scheibe 1):
- Detektion: neue Sammel-/Filter-Logik für reine Textelemente — eigene Kategorie,
  typ-agnostische ps-id-Verankerung wie gehabt (dieselbe ID-Mechanik wie bei den
  interaktiven Elementen, nur ein anderer Kandidaten-Filter).
- generateFunctional: verzweigt PRO Mapping nach type — "redirect" -> Click-Wiring
  wie bisher; "text" -> im VORSCHAU-Modus textContent des Elements per ps-id ersetzen.
  EINE Engine mit type-Verzweigung, KEINE zweite parallele Engine.
- UI: select Textelement -> Textfeld mit AKTUELLEM Inhalt vorbefüllt -> überschreiben
  -> Übernehmen (Draft) -> großes Speichern (DB). Exakt das
  "select/config/Übernehmen/Speichern"-Muster wie beim Link, nur config = Text statt
  URL. Die "Übernehmen wirkt nur in den Draft, einziger DB-Write ist Speichern"-
  Invariante gilt unverändert.
- Orphan-Netz + Anker: müssen für type:"text" GENAUSO greifen wie für Links
  (gelöschtes Textelement -> verwaiste Verknüpfung, anzeigen/löschen/re-link).
  findOrphans/anchorMappingTarget arbeiten typ-agnostisch auf ps-ids -> sollte
  automatisch tragen, beim Bau aber VERIFIZIEREN (nicht blind annehmen).

Verbindliche Leitplanken: Link-Mapping, Detektion der interaktiven Elemente,
Selektions-Brücke, Highlighting, Dirty-Tracking, Weg-C-Netz, der bestehende Export
sowie Auth/RLS bleiben UNBERÜHRT. Sandbox unverändert (Edit-iframe allow-scripts;
funktionales iframe allow-scripts + popups wie gehabt). allow-same-origin in beiden
Modi weiterhin AUS.

### Scheibe 1b — UX-Politur: Override-Anzeige + Listen-Filter
Zwei reine Anzeige-/View-State-Verfeinerungen auf Scheibe 1 obendrauf. KEIN
Daten-/Engine-/Detektions-Eingriff, nichts wird persistiert, kein dirty-Effekt.
Leitplanke: element.text (Detektions-Original) bleibt unangetastet, ebenso Engine,
Mapping-Modell, Orphan-Netz, Selektions-Brücke.

1) Override-Text-Anzeige (Konsistenz Vorschau ↔ Liste ↔ Header):
- Liste "Erkannte Elemente" UND ActionPanel-Header zeigen für ein Textelement den
  ÜBERSCHRIEBENEN Text, wann immer ein Text-Mapping existiert (Draft ODER
  gespeichert) — sonst den Detektions-Originaltext. EIN konsistenter
  Ableitungs-Pfad, KEIN Sonderfall "nur bei dirty".
- Reine Anzeige-Ableitung: element.text bleibt der Fallback UND die Vorbefüllung,
  falls das Mapping entfernt wird. Die 60-Zeichen-Truncation gilt für den
  angezeigten Text gleichermaßen.
- Effekt: Vorschau (Engine setzt textContent), Liste und Header ziehen an einem
  Strang — derselbe Override ist überall sichtbar, sofort.

2) Elementlisten-Filter (gegen "Scroll-Schwindel"):
- Drei Pillen über der "Erkannte Elemente"-Liste: "Alle (X)" / "Interaktiv (Y)" /
  "Texte (Z)". Interaktiv = Buttons + Links + Forms zusammen. Klick reduziert die
  Liste sofort auf die Kategorie.
- Filter wirkt NUR auf die Elementliste. Die "Verwaiste Verknüpfungen"-Sektion
  bleibt UNBERÜHRT (Orphans sind kategorie-übergreifend wichtig).
- Aktive Auswahl bleibt ERHALTEN, auch wenn das gewählte Element weggefiltert wird
  (nur unsichtbar — Selektion/Brücke/Highlighting werden NICHT gelöst). Zurück auf
  "Alle" (oder die passende Kategorie) -> wieder sichtbar und weiterhin ausgewählt.
- Reiner View-State, nichts persistiert, kein dirty-Effekt.

### Scheibe 1b — Live-Patch-Versuch revertiert: Lektion (für die saubere Neu-Umsetzung)
KONTEXT: Der Versuch, Text-Overrides ohne iframe-Reload "live" zu patchen, wurde
KOMPLETT revertiert (6 Commits c1b66b5…dcbc440, zurück auf fdc3994). Aktueller,
stabiler Stand: Text-"Übernehmen" löst einen EHRLICHEN Edit-iframe-Reload aus (Seite
springt hoch, bleibt oben). Brücke, Selektion, Override-in-beiden-Modi (deklaratives
srcDoc-Prop + generateFunctional("edit")-Einbacken), Filter, displayTextFor-Deriver:
alle intakt.

WARUM REVERTIERT: Der imperative srcdoc-Umbau (iframeRef.current.srcdoc =
editPreviewHtml(...)) erzeugte ein KORRUPTES iframe-Dokument — das injizierte
Brücken-Skript wurde abgeschnitten ("Uncaught SyntaxError: Unexpected end of input at
about:srcdoc"), dazu hunderte 403/CORS auf /_next/static/chunks aus origin 'null'
(Next-Referenzen ins srcdoc geraten). Folge: die Brücke lief NIE -> keine Selektion,
kein Highlighting, un-gemappte Klicks navigierten zur Login-Maske. Der deklarative
srcDoc-PROP hatte das nie: React setzt das Attribut sauber als GANZES; imperatives
Zusammenstückeln in der Sandbox tut es nicht. (Stale Cache war ausgeschlossen — harter
Neustart + .next gelöscht half nicht.)

DIE LEKTION (das Wichtige): Die IDEE war richtig — den Reload AN DER WURZEL vermeiden,
statt den Scroll-Sprung zu kaschieren —, nur der MECHANISMUS war falsch. Scroll-
Restoration, instant-Nachsetzen, Lade-Overlay und Orphan-Freeze waren allesamt
Pflaster auf einer Wunde, die der Reload selbst schlägt. Der saubere Weg für die
Neu-Umsetzung (NICHT heute bauen):
- Edit-iframe bleibt DEKLARATIV per srcDoc-Prop gerendert (nie wieder imperativ
  anfassen). srcDoc hängt NUR vom CODE ab.
- Eine Text-Override-Änderung fasst srcDoc NICHT an, sondern schickt dem laufenden
  iframe eine postMessage über die bestehende Brücke (z.B. PS_SET_TEXT
  { elementId, content }) -> ein Skript IM iframe setzt textContent per ps-id. Kein
  Reload, kein Sprung, kein Overlay nötig. ADDITIVER message-Handler (wie
  SET_SELECTED_ID/ELEMENT_CLICKED) — die risikoärmste Operation, die Brücke überlebt
  das nachweislich.
- Reload-Fall (Code-Änderung/Projektwechsel): das frisch erzeugte srcDoc bäckt die
  Overrides weiterhin per generateFunctional("edit") ein (= Override-in-beiden-Modi,
  bleibt). Bei Reload via eingebackenem HTML, zwischen Reloads via postMessage-Patch —
  beide Wege, dasselbe Ergebnis, kein Divergieren.
- WICHTIG: JEDE Stelle, die ein PRÄSENTES Text-Mapping erzeugt/ändert/entfernt, muss
  PS_SET_TEXT posten (Übernehmen + Entfernen + Text-Orphan-Relink) — sonst divergiert
  das stehende iframe von Liste/Header. Dieser "Relink-Fund" war die einzige
  inhaltlich wertvolle Erkenntnis aus dem revertierten Versuch.
- UNTERSCHIED zum gescheiterten Versuch: damals ZWEI riskante Änderungen gleichzeitig
  (Mapping-Entkopplung UND imperatives srcdoc). Sauber ist NUR additiv eine
  postMessage, srcDoc-Rendering komplett unangetastet.

### Scheibe 3 — Text-Live-Patch: Reload-Sprung an der Wurzel eliminiert (ABGESCHLOSSEN, live getestet)
Status: fertig, LIVE getestet, Commit "feat(edit): live-patch text overrides via
PS_SET_TEXT". Pipeline grün (tsc/lint/build + Tests: srcDoc-Stabilität, Reload-Bake,
PS_SET_TEXT-Handler, Post-Sites). Browser-Verifikation aller drei Post-Stellen:
Übernehmen patcht live ohne Sprung/Flackern, Scroll-Position bleibt; Entfernen stellt
den Original-Detektionstext live wieder her; Text-Orphan-Relink legt die Waisen-Config
live aufs gewählte Ziel (Waisenzahl fällt korrekt). Erster-Override- bzw. Relink-Reload
(ps-id-Einbrennen in den Code) tritt EINMALIG auf und ist akzeptiert (Bake = Quelle der
Wahrheit), kein Bug. Entkopplung bestätigt: srcDoc hängt nur am Code (useMemo-Dep
[previewHtml], bewusste exhaustive-deps-Ausnahme); Live-Änderungen fließen additiv über
PS_SET_TEXT an die unveränderte Brücke. Preview-iframe bewusst außer Scope (reloadet wie
bisher).

KLARSTELLUNG (Relink-Richtung, war ein Erwartungs-Stolperstein im Live-Test):
"Verknüpfen mit …" stempelt die CONFIG DER WAISE auf das GEWÄHLTE Zielelement — nicht
den Zieltext auf die Waise. Das Ziel zeigt danach den Waisen-Override. Korrektes,
beabsichtigtes Verhalten.

Setzt die saubere Neu-Umsetzung aus dem revertierten Versuch um (NICHT der alte
imperative Weg). Ziel: „Übernehmen" eines Text-Overrides im Edit-Modus löst KEINEN
iframe-Reload mehr aus -> kein Scroll-Sprung. Der Override wird live per postMessage
gepatcht statt durch srcDoc-Neubau.

Owner-Entscheidungen (endgültig):
- SCOPE strikt nur Edit-iframe. Das funktionale Preview-iframe bleibt UNANGETASTET
  (kein ref, kein PS_SET_TEXT) und reloadet wie bisher beim Rüberschalten — im
  „Ergebnis ansehen"-Kontext akzeptabel; schützt die bewusste No-ref-Entscheidung.
- Wurzel-Entkopplung: Edit-srcDoc hängt ab jetzt NUR vom Code ab (nicht mehr von
  Text-Mappings). Es wird nur bei Code-Änderung neu erzeugt; beim Neu-Erzeugen
  bäckt es die AKTUELLEN Overrides weiter per generateFunctional("edit") ein
  (Override-überlebt-Reload bleibt). Die Dependency-Auslassung der Text-Mappings
  ist BEWUSST und im Code kommentiert (live-Änderungen fließen über PS_SET_TEXT,
  Code-Änderung backt den aktuellen Stand neu).
- Live-Pfad: eine Text-Mutation fasst srcDoc NICHT an, sondern postet dem laufenden
  Edit-iframe PS_SET_TEXT { elementId, content }; ein ADDITIVER Handler im
  Brücken-Skript setzt textContent per data-pagesmith-id. Additiv wie
  SET_SELECTED_ID/ELEMENT_CLICKED — srcDoc-Rendering bleibt komplett deklarativ,
  NIE wieder imperatives iframeRef.current.srcdoc.
- Relink-Fund (Vollständigkeit der Sende-Stellen, kritisch): JEDE Mutation eines
  PRÄSENTEN Text-Mappings muss posten, sonst divergiert das stehende iframe von
  Liste/Header. Drei Stellen: Übernehmen -> {id, neuer Text}; Entfernen -> {id,
  ORIGINAL-Detektionstext} (Entfernen = live zurück auf das Original, nicht den
  Override stehen lassen); Text-Orphan-Relink -> {neues Zielelement, Text}.
- Nur Text: PS_SET_TEXT feuert ausschließlich bei type:"text"-Mutationen.
  Redirect-Assign bleibt unberührt und reloadet weiter (nicht Teil dieser Scheibe).
- Erster-Override-Reload akzeptiert: schreibt „Übernehmen" beim ersten Override
  eines noch nicht verankerten Elements die ps-id in den Code, reloadet dieses
  EINE Mal (Code ändert sich -> Bake greift). Kein Bug, wird NICHT bekämpft. Die
  A/B-Iteration danach (am verankerten Element) ist durchgängig live.

Zwei-Quellen-Invariante: Reload -> eingebackenes HTML; zwischen Reloads ->
PS_SET_TEXT-Patch. Beide vom selben Mapping-Stand gespeist -> kein Divergieren.
Edit-Modus behält die Lade-Zeit-Text-Wiring (injectScripts greift für non-export);
PS_SET_TEXT kommt additiv obendrauf, ersetzt sie NICHT.

Unterschied zum revertierten Fehlschlag: damals ZWEI riskante Änderungen gleichzeitig
(Entkopplung UND imperatives srcdoc). Hier bleibt srcDoc deklarativ unangetastet;
nur ein additiver Message-Handler + drei Posts kommen hinzu.

Verbindliche Leitplanken: Selektions-Brücke (Klick/Highlight/Handshake), detect.ts-
Brückenstruktur, Redirect-Pfad, Export (Scheibe 2), Preview-iframe, Auth/RLS bleiben
UNBERÜHRT. Sandbox unverändert (Edit allow-scripts; allow-same-origin in beiden aus).
Die Brücke wird NUR additiv um einen PS_SET_TEXT-Case erweitert, ihre bestehende
Logik nicht umgebaut.

Tests (diskriminierend, Pflicht-Minimum):
- srcDoc-Stabilität: Text-Mapping-Änderung bei UNVERÄNDERTEM Code erzeugt KEIN neues
  Edit-srcDoc (Gegenprobe: Code-Änderung erzeugt ein neues).
- Reload-Fall: bei Code-Änderung enthält das frische Edit-srcDoc den aktuellen
  Override (Bake greift weiter).
- PS_SET_TEXT-Handler (Brücke, falls isoliert testbar): setzt textContent per ps-id,
  ignoriert unbekannte id ohne Throw.
- Falls die Post-Sites in einer testbaren Einheit liegen: Übernehmen/Entfernen/Relink
  lösen je einen Post aus; Entfernen trägt den Original-Text.

### Scheibe 2 — Text-Export: direkt-in-DOM-Bake (ABGESCHLOSSEN, live getestet)
Status: fertig, LIVE getestet, Commit 9dfd0bf. Pipeline grün (108 Tests inkl.
Bake+Gegenprobe, gemischte Disjunktheit, reine-Text-ohne-Script [Marker-basiert:
kein pagesmith-mappings, keine Wiring-Signatur], verwaistes Text-Mapping,
</script>-Senke), tsc/lint/build grün. Browser-Verifikation: im Export-QUELLTEXT
enthält das <h1> bereits den neuen Text (gebacken, kein FOUC/JS-Sprung); eine
reine-Text-Seite exportiert OHNE Datenblock und OHNE Wiring-Script — Text trotzdem
present, auch bei deaktiviertem JS; Redirect feuert weiter; verwaistes Text-Mapping
wird nicht gebacken. Umgesetzt NUR im export-Zweig von generate.ts (Bake-Schleife
auf demselben doc, textContent statt innerHTML, present.has-gefiltert; injectScripts-
Gate mode !== "export" || table.length > 0). Preview-Containment + Edit-Injektion
unberührt. Der alte "Export bleibt unberührt (no-op)"-Test (textOf == "Alt" kodierte
das Loch) wurde durch den Bake-Test ersetzt — Assertion invertiert, nicht aufgeweicht.

Schließt das funktionale Loch aus Scheibe 1: ein type:"text"-Override landet im
EXPORT als ECHTER DOM-Inhalt (das <h1> enthält im Export-Output schon den neuen
Text), nicht per Laufzeit-JS injiziert.

Owner-Entscheidungen (endgültig):
- Mechanismus: direkt-in-DOM-Bake. In generateFunctional(html, mappings, "export")
  wird pro präsentem Text-Mapping das Element per ps-id gefunden und
  element.textContent = config.content auf dem geparsten DOM gesetzt, VOR der
  Serialisierung. Grund: gut für SEO, kein FOUC/Flackern, funktioniert ohne JS.
- Trennung Bake vs. Laufzeit: Text-Mappings kommen im export-Modus NICHT in den
  JSON-Datenblock / das Wiring-Script. Nur Laufzeit-Typen (redirect, später
  Webhook/Tracking) bleiben dort. Folge: eine Seite mit AUSSCHLIESSLICH
  Text-Overrides exportiert als reines statisches HTML — KEIN injiziertes Script.
- Orphan-Filter gilt typ-agnostisch auch für Text: nur präsente Elemente backen;
  ein Text-Mapping ohne Element im Code bleibt verwaist (Weg-C), wird NICHT
  gebacken und erscheint NICHT im Output (gleiche abgeleitete "ps-id im Code?"-
  Logik wie findOrphans/Redirect).
- Disjunkte Mengen: Text-Kandidaten != interaktive Kandidaten, ein Mapping pro
  Element -> Bake-Pass (Text) und Wiring-Pass (Redirect) treffen NIE dasselbe
  Element. Keine Kollision.
- Senke ist textContent (NICHT innerHTML): ein Override mit <script>/Markup wird
  inerter Text, nicht ausgeführtes HTML. Konsistent zur bestehenden Senken-Lektion.

Architektur: EINE Engine, type-Verzweigung im export-Zweig — KEINE zweite parallele
Engine. Gleiche stabilisierte Quelle wie die Vorschau (Idempotenz: einmal parsen,
einmal serialisieren, kein Doppel-Bake). Preview-/Edit-Text-Verhalten und die
Brücke bleiben UNBERÜHRT (nur der export-Zweig wird erweitert).

Diskriminierende Tests (Pflicht, müssen gegenproben):
- Text-Override erscheint im Export-HTML als echter Inhalt (Element-textContent ==
  neuer Inhalt); Gegenprobe: der Originaltext ist für dieses Element NICHT mehr da.
- Text-Override steht im Export NICHT im JSON-Datenblock/Wiring (Gegenprobe gegen
  naives "in der Tabelle lassen").
- Reine-Text-Seite (nur Text-Overrides, kein Redirect) -> KEIN Wiring-Script im
  Output (ohne-JS-Eigenschaft).
- Redirect-Export UNVERÄNDERT: JSON-Datenblock + Wiring mit URL weiter vorhanden
  (Bestandstest bleibt grün).
- Verwaistes Text-Mapping (Element fehlt) -> nicht gebacken, nicht im Output.
- Preview-/Edit-Text-Verhalten unverändert (kein Regress der Live-Editierbarkeit).

Leitplanken: NUR der export-Zweig von generateFunctional + dessen Tests werden
angefasst. detect.ts/Brücke, CodeImporter, ActionPanel, der Redirect-Laufzeitpfad
und Preview/Edit-Text bleiben unberührt.

