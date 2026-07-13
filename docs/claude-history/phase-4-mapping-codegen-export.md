## Mapping-/Action-Zuweisung (ABGESCHLOSSEN)
Phase 3 hat das Fundament gelegt (stabile ps-IDs + Persistenz + Multi-Projekt);
darauf aufbauend ist die "Click & Connect"-Wertschöpfung jetzt VOLLSTÄNDIG: dem
ausgewählten Element echte Aktionen zuweisen und in mappings (jsonb) speichern.
Komplett umgesetzt und ruhend auf den stabilen ps-IDs aus Phase 3.0:
- Aktion zuweisen / konfigurieren / "Übernehmen" wirkt nur in den Draft (Code- +
  mappings-State + ps-ID-Anker); Persistenz ausschließlich über den großen,
  bewussten "Speichern"-Button (saveProject) — kein Auto-Save (Riegel-Test).
- Sichtbarer Dirty-Indikator (großer Button + kleiner Punkt am Projektnamen, aus
  DEMSELBEN kombinierten dirty über code UND mappings); klare Benennung
  ("Übernehmen" vs. "Speichern") löst die frühere Doppeldeutigkeit auf.
- Navigations-Guards (wechseln / neu / löschen + beforeunload) gegen das
  kombinierte dirty.
- Vollständiges Weg-C-Sicherheitsnetz für verwaiste Mappings: anzeigen + löschen
  + neu verknüpfen (Details in den Scheibe-1/2-Blöcken unten).

Nächster großer Schritt: Code-Generierung (Phase 4, Cheerio) — die erfassten
Mappings ins echte Output-HTML backen (Redirect/Payment-Trigger wirklich
verdrahten), bisher erfassen wir nur die ABSICHT. Danach Hosting (Phase 6), das
zugleich die Funnel-Vision freischaltet (siehe Zukunftsrichtung).

### Mapping-Schritt 1 — Redirect-Aktion (Absicht erfassen) (ABGESCHLOSSEN)
Status: fertig. Die erste Hälfte der Mappings steht — Absicht erfassen + im UI
anzeigen + persistieren. Konkret umgesetzt:
- Aktion zuweisen / konfigurieren / übernehmen im ActionPanel; Persistenz in die
  DB ausschließlich über den großen "Speichern"-Button (saveProject).
- Sichtbarer Dirty-Indikator: bei ungespeicherten Änderungen wird der große
  Button orange + "Ungespeicherte Änderungen" / "Speichern •", nach erfolgreichem
  Speichern zurück auf neutrales Blau (gespeist aus DEMSELBEN kombinierten dirty
  wie der kleine Punkt am Projektnamen).
- Die Kachel-Aktion heißt "Übernehmen" und wirkt NUR in den Draft (Code-State +
  mappings-State + ps-ID-Anker), schreibt NIE in die DB — klar abgegrenzt vom
  großen "Speichern"-Button. Löst die frühere "Speichern"-Doppeldeutigkeit auf.
- Navigations-Guards (Projekt wechseln / neu / löschen) greifen gegen das
  KOMBINIERTE dirty (code UND mappings); ein beforeunload-Guard warnt zusätzlich
  vor F5/Tab-Schließen bei ungespeicherten Änderungen.

ERSTE Hälfte der Mappings: Aktion zuweisen + konfigurieren + speichern + im UI
anzeigen. Das echte AUSFÜHREN (Button feuert wirklich) gehört NICHT hierher,
sondern in den separaten Code-Gen-Schritt danach (Phase 4, Cheerio). Strikt
trennen — dieser Schritt erfasst nur die ABSICHT, er verdrahtet noch nichts.

Scope (Owner-Entscheidungen):
- Erstes Primitiv: "Redirect bei Klick" (URL-Weiterleitung). Deckt bewusst Stripe
  Payment Link, PayPal-Link und generische Links in EINEM Aktionstyp ab.
- Weitere Aktionstypen (Webhook = POST, Tracking-Events) sind spätere Kacheln,
  nicht jetzt.
- Weg-C-Netz (verwaiste Mappings) BEWUSST abgetrennt: kommt als unmittelbar
  nächster kleiner Schritt NACH der funktionierenden Speicher-/Ladestrecke.

Datenmodell: Mapping = { elementId: ps-id, type: "redirect", config: { url,
openInNewTab } }. Array in der bestehenden mappings-jsonb-Spalte (aus 3.2).
KEINE Migration nötig. type ist Diskriminator (config je Typ gekapselt) -> weitere
Aktionstypen kommen als eigene Union-Zweige dazu, ohne die Redirect-Form anzufassen.

Schlüssel-Notiz (bewusst, NICHT jetzt umbauen): findMapping/upsertMapping
schlüsseln vorerst NUR über elementId (ein Mapping pro Element). Für Redirect-only
korrekt. Sobald ein Tracking-Typ "Redirect + Tracking auf EINEM Element" erlaubt,
wird der Schlüssel auf (elementId, type) umgestellt. Als Code-Kommentar in
src/lib/mappings.ts festgehalten.

Persistenz: saveProject speichert Mappings zusammen mit html, loadProject lädt
beide. RLS-/Projekt-Logik aus 3.2/3.3 unverändert.

Verbindliche Edge-Cases / Landminen:
- Dirty-Tracking umfasst ab jetzt CODE UND MAPPINGS. Sonst stiller Verlust beim
  Projektwechsel, weil Mapping-Änderungen den Code nicht anfassen.
- Beim Zuweisen eines Mappings wird stabilisiert und die ps-ID sofort in den Code
  zurückgespiegelt (wie beim Speichern), damit der Anker dauerhaft ist und Tippen
  das frische Mapping nicht verwaisen lässt. Für ein fabrikneues Element (noch
  keine ps-ID im Code) erzeugt der separate Parse eine ANDERE Zufalls-ID als die
  Preview -> kanonische ID wird per INDEX auf dem stabilisierten HTML ausgerichtet
  (idempotent, gleiche Kandidaten-Reihenfolge), statt der Preview-ID blind zu
  vertrauen.
- mappingsEqual vergleicht MENGENBASIERT (pro elementId), nie positionsabhängig:
  Umsortieren ist NICHT dirty, URL-/Options-Änderung + Add/Remove sind dirty.
- Speichern im URL-Formular ist gesperrt, solange die URL nicht http(s)-gültig ist
  (kein Persistieren kaputter URLs).
- Preview bleibt selektions-only: KEIN echter Redirect, sandbox="allow-scripts"
  unverändert, NIE allow-same-origin.

UI: ActionPanel (bisher nur Text) bekommt die Zuweisung. Verknüpfte Elemente
bekommen ein Badge in der Erkannte-Elemente-Liste.

Phase-Stand & nächster Schritt: Mappings erste Hälfte (Intent erfassen) steht.
Als Nächstes folgt das BISHER VERSCHOBENE Weg-C-Netz (verwaiste Mappings sichtbar
machen: gespeicherte ps-ID nicht mehr im Code -> Mapping als "verwaist" anzeigen,
nicht still reparieren), danach die Code-Generierung (Phase 4, Cheerio).

### Mapping-Schritt 2 — Weg-C-Netz (verwaiste Mappings), Scheibe 1 (ABGESCHLOSSEN)
Status: fertig, Pipeline grün (npm test inkl. findOrphans-Tests, tsc, lint, build).
Verwaiste Mappings werden ABGELEITET erkannt (findOrphans in src/lib/mappings.ts,
unit-getestet) und in einer eigenen, immer sichtbaren Sektion "Verwaiste
Verknüpfungen (N)" (nur bei N>0, über den drei Zonen) mit gespeicherter Konfig
(Typ + URL) + Löschen angezeigt. Konkret umgesetzt:
- Flash-Guard via debouncedCode === code: Orphans werden erst berechnet, wenn die
  Elementliste den AKTUELLEN Code widerspiegelt (kein Initial-Lade-Flackern,
  hydration-safe, kein neues Flag — irrt sicher Richtung "nichts zeigen").
- Verwaiste AUSWAHL degradiert graceful: zeigt selectedElementId auf keine aktuelle
  ps-ID mehr, wird sie wie "nichts ausgewählt" behandelt (ActionPanel-Hinweistext,
  kein stale Redirect-Formular, kein Throw) — war bereits durch die abgeleitete
  selectedElement-Logik abgedeckt.
- Orphans überleben Speichern/Laden (saveProject reicht das ganze mappings-Array,
  nichts wird still fallengelassen). Löschen mutiert den State -> dirty -> der
  große "Speichern"-Button persistiert (kein Auto-Save, kein Re-Link, kein Raten).

Scope (Owner-Entscheidung): Scheibe 1 = ANZEIGEN + LÖSCHEN. Neu-Verknüpfen
(Re-Link) ist BEWUSST auf einen unmittelbaren Folgeschritt vertagt (Scheibe 2).

Was ein verwaistes Mapping ist:
- Ein Mapping verweist über seine ps-ID auf ein Element. Ändert sich der Code so,
  dass diese ps-ID nicht mehr vorkommt (Seite neu generiert, Element gelöscht,
  komplett neue Version eingefügt), zeigt das Mapping ins Leere -> verwaist.
- Begründung Weg C: NICHT still löschen (Datenverlust), NICHT still neu-verknüpfen
  (falsches Raten, gleiche Fehlerklasse wie früher die positionsbasierten IDs),
  sondern SICHTBAR machen und den Menschen entscheiden lassen.

Architektur-Prinzip:
- Verwaisungs-Status wird ABGELEITET, nicht gespeichert (wie dirty). Kein
  orphaned-Flag, keine DB-Migration. Reine Funktion aus (Mappings, aktuell
  erkannte Element-ps-IDs).

Verbindliche Landminen:
- KEIN Initial-Lade-Flackern: Beim Laden ist die Elementliste ~300ms leer
  (Debounce). Orphans dürfen NICHT gegen diese noch-nicht-geparste leere Liste
  berechnet werden, sonst blinkt kurz "alles verwaist". Erst berechnen, nachdem
  der aktuelle Code mindestens einmal echt geparst wurde.
- NIEMALS automatisch reparieren. (Re-Link kommt später und ist dann
  ausschließlich vom Menschen ausgelöst, kein Raten.)
- Orphans überleben Speichern/Laden: ein verwaistes Mapping wird beim Speichern
  NICHT heimlich fallengelassen, sondern wie jedes andere Mapping persistiert.
  Nur explizites Löschen entfernt es.
- Reines Erkennen ändert die Mappings nicht (nicht dirty). Erst Löschen mutiert
  das Mappings-Array -> dirty -> Speichern nötig (konsistent zum Modell).

UI: Verwaiste Mappings können KEIN Element-Badge tragen (Element fehlt ja). Eigene
sichtbare Sektion "Verwaiste Verknüpfungen (N)", nur wenn N>0; je Eintrag die
gespeicherte Konfiguration (URL/Typ) + Löschen (mit Bestätigung, da die
gespeicherte URL verloren geht).

Zukunfts-Anschluss: Dasselbe Orphan-Muster wird später vom Funnel wiederverwendet
(verwaister funnel_step, wenn eine Zielseite gelöscht wurde).

Scheibe 1 schließt das Weg-C-Netz für die Anzeige+Löschen-Stufe ab; Re-Link
(Scheibe 2) folgt — siehe Polish-/Folge-Liste.

### Weg-C-Netz Scheibe 2 — Re-Link (verwaiste Aktion neu verknüpfen) (ERLEDIGT)
Status: fertig, Pipeline grün (npm test inkl. neuer Anker-Tests, tsc, lint, build).
Damit ist das GESAMTE Weg-C-Netz ABGESCHLOSSEN: anzeigen + löschen + neu
verknüpfen. Konkret umgesetzt:
- Re-Link per "Verknüpfen mit …"-Dropdown direkt auf der Orphan-Karte (kein
  modaler Pick-Modus, kein Vorschau-Klick-Flow).
- Geteilte reine anchorMappingTarget-Logik in detect.ts: dieselbe ps-ID-Anker-
  Mechanik für Assign UND Re-Link (kein Duplikat) — jetzt isoliert unit-getestet
  (diskriminierender Test: Anker auf das ZWEITE Element liefert dessen ID).
- Überschreib-Schutz via window.confirm VOR dem Schreiben (Ziel hat schon eine
  Aktion -> "ersetzen?"). Nie still überschreiben.
- Dropdown verschwindet bei 0 aktuellen Elementen -> nur Löschen; die Waisen
  bleiben als Netz erhalten (kein stilles Verwerfen).
- Self-Resolving über den abgeleiteten findOrphans-Status: nach Re-Link ist die
  ps-ID wieder im Code -> Eintrag verlässt die gelbe Sektion, Badge erscheint am
  Ziel. Mutiert State (+ ggf. code) -> dirty -> großer Speichern-Button, kein
  Auto-Save.

Scope (Owner-Entscheidung): Verwaiste Verknüpfung per Dropdown DIREKT auf der
Orphan-Karte einem aktuellen Element neu zuweisen ("Verknüpfen mit …"). KEIN
modaler Pick-Modus, KEIN Vorschau-Klick-Modus.

Was Re-Link ist:
- Nimmt die gespeicherte Konfiguration eines verwaisten Mappings und legt sie auf
  ein vom USER gewähltes aktuelles Element; der alte Orphan-Eintrag wird entfernt.
- Use-Case: Seite neu generiert -> Button hat neue ps-ID -> gespeicherte URL nicht
  neu tippen müssen.

Architektur (Wiederverwendung, kaum neue Logik):
- Re-Link = (1) Config auf das gewählte Element upserten via DERSELBEN Anker-Logik
  wie handleAssignMapping (stabilizeIds + Index-Ausrichtung für frische Elemente +
  Rückspiegelung der ps-ID in den Code) + (2) alten Orphan via removeMapping
  entfernen. Beide Bausteine existieren bereits und sind getestet.
- Self-resolving: sobald die Config auf einem lebenden Element liegt, sieht
  findOrphans dessen ps-ID -> nicht mehr verwaist -> Eintrag verschwindet aus der
  gelben Sektion, Badge erscheint am neuen Element (Status ist abgeleitet).

Weg-C-Grundsatz (unverändert gültig):
- Der Mensch wählt das Ziel. NIE automatisch raten/zuordnen (keine
  Textähnlichkeit, kein Auto-Andocken).

UI:
- Jede Orphan-Karte bekommt neben "Löschen" ein Dropdown "Verknüpfen mit …",
  gefüllt mit den AKTUELL erkannten Elementen (Label = Tag + Textauszug).
- Wenn 0 aktuelle Elemente existieren: Dropdown ausblenden/deaktivieren (nichts
  zum Verknüpfen) -> nur Löschen möglich.

Verbindliche Edge-Cases:
- Überschreib-Schutz: Hat das gewählte Zielelement BEREITS ein Mapping -> vorher
  bestätigen ("Element hat bereits eine Aktion — ersetzen?"). Nie still
  überschreiben.
- Re-Link mutiert mappings (+ ggf. code durch ps-ID-Rückspiegelung) -> dirty ->
  großer Speichern-Button. KEIN Auto-Save.

Scheibe 2 schließt das Weg-C-Netz ab (Anzeigen + Löschen + Re-Link).

## Code-Gen Scheibe 1 — Engine + funktionale Vorschau
Wendepunkt: Bisher erfasst Pagesmith nur die ABSICHT (Mapping-Spezifikation), die
Vorschau ist selektions-only. Code-Gen macht aus der Spezifikation echtes
VERHALTEN — funktionales HTML, in dem die Buttons wirklich feuern. Das ist das
Tor zu Phase 6 (Hosting): erst wenn die Einzelseite real feuert, lohnt das
Ausliefern.

Owner-Entscheidungen (endgültig):
- Output-Mechanismus: EIN injiziertes Laufzeit-Script verdrahtet ALLE Elemente
  einheitlich (erweiterbar auf Webhook/Tracking als spätere Handler). KEIN
  statischer href-Sonderweg in dieser Scheibe — ein Mechanismus, nicht zwei.
- Erste Scheibe liefert: funktionale VORSCHAU im Editor (Button feuert wirklich).
  Export (Download/Copy) ist BEWUSST der unmittelbare Folgeschritt, NICHT jetzt.

Architektur:
- Engine = REINE, unit-testbare Funktion: generateFunctional(html, mappings) ->
  funktionales HTML. Client-seitig (konsistent zur Detektion via DOMParser).
  KEIN Cheerio in dieser Scheibe — Cheerio ist erst die Serving-Schicht in
  Phase 6. Das ist die bewusste Neubewertung der alten "Cheerio für Phase 4"-Notiz
  (Roadmap): die Transformation lebt vorerst client-seitig wie Detektion/
  Stabilisierung, Cheerio kommt erst, wenn serverseitig ausgeliefert wird.
- Engine injiziert vor </body>: (a) eine Mapping-Tabelle als
  <script type="application/json"> und (b) ein kleines Wiring-Script, das pro
  data-pagesmith-id einen Click-Handler hängt (redirect: location.href, bzw.
  window.open bei openInNewTab).
- Nur Mappings einbacken, deren Element im HTML VORHANDEN ist. Verwaiste Mappings
  (Weg-C) werden im Output ignoriert -> Netz und Generator greifen nahtlos
  (gleiche abgeleitete "ps-ID im Code vorhanden?"-Logik wie findOrphans).

Funktionale Vorschau:
- GETRENNTER Modus vom editierenden Preview. Toggle "Editieren" / "Vorschau".
- Funktionaler Modus rendert das generierte HTML; Klick feuert echt.
- WICHTIG: funktionaler Modus injiziert NICHT die Selektions-Brücke; editierender
  Modus bleibt selektions-only. Beide koexistieren, vermischen sich nie.
- Umsetzung: zwei getrennte iframes, konditional gerendert (kein geteiltes srcDoc).
  Das Edit-iframe behält iframeRef + Brücke unverändert; beim Zurückschalten
  remountet es und der bestehende IFRAME_READY-Handshake re-synchronisiert die
  Auswahl. Das funktionale iframe trägt KEINEN ref -> die State->iframe-Effekte
  fassen es nicht an.

Verbindliche Landminen:
- Sicherheit: allow-same-origin bleibt in BEIDEN Modi AUS (User-HTML darf nie an
  unsere Origin — das ist die Grenze, die zählt). Edit-iframe: sandbox=
  "allow-scripts" (unverändert). Funktionales iframe: sandbox="allow-scripts
  allow-popups allow-popups-to-escape-sandbox" (Live-Test-Korrektur, siehe
  Unterabschnitt unten — die frühere "ohne escape-sandbox"-Empfehlung war zu
  vorsichtig und wurde widerlegt).
- URL-Kodierung: Mapping-Tabelle als JSON sicher einbetten (JSON.stringify) und
  jedes "<" als Unicode-Escape maskieren (das Zeichen "<" -> die sechs Zeichen
  Backslash-u-0-0-3-c), damit eine URL mit "</script>" nicht aus dem JSON-Block
  ausbricht. NIE User-URLs naiv in einen JS-String konkatenieren.
- Idempotenz: immer aus dem sauberen gespeicherten HTML generieren; kein doppeltes
  Einbacken/Stapeln von Scripts (nicht auf bereits generiertem Output erneut
  generieren).

### Vorschau vs. Export — Verhalten getrennt (Live-Test-Korrektur)
Live-Test deckte zwei Symptome mit EINER Wurzel auf: die funktionale Vorschau ist
ein srcDoc-iframe, und srcDoc erbt die Basis-URL der Elternseite (unsere Origin
localhost:3000).
- Symptom 1 (gemappter "selber Tab"-Redirect): location.href navigiert das iframe
  SELBST zur Ziel-URL; X-Frame-Options-Seiten (Google/Stripe) verweigern das
  Framing -> "Verbindung abgelehnt". In der EXPORT-Seite (Top-Level) ist genau
  dieses location.href korrekt — nur in der iframe-Vorschau nicht darstellbar.
- Symptom 2 (NICHT gemappter Link, z.B. href="#preis"): Default-Navigation gegen
  die srcDoc-Basis aufgelöst -> localhost:3000 -> unauth -> unsere Login-Maske
  erscheint IM iframe. KEIN Origin-Bruch (allow-same-origin aus, keine Cookies
  geleakt, Session intakt), aber ein Containment-Loch, das zu muss.

Entscheidung — Vorschau-Verhalten vom Export-Verhalten TRENNEN:
- generateFunctional bekommt mode: "export" | "preview" (Default "export").
- EXPORT (unverändert, echte Produktionslogik): nur gemappte Elemente; openInNewTab
  -> window.open, sonst location.href; un-gemappte Links behalten Default-Verhalten.
- VORSCHAU: (a) jede gemappte Weiterleitung öffnet IMMER escaped einen neuen Tab
  (window.open(url,'_blank')); openInNewTab wird in der Vorschau bewusst IGNORIERT,
  weil "selber Tab" im iframe nicht ehrlich zeigbar ist. (b) JEDER andere
  Link-Klick wird preventDefault-stummgeschaltet -> nie Navigation auf unsere Origin.
- Sandbox funktionales iframe: allow-scripts allow-popups
  allow-popups-to-escape-sandbox. Edit-iframe unverändert allow-scripts.
  allow-same-origin bleibt in BEIDEN aus.

Korrektur-Notiz (ehrlich): die vorige "Option 1 ohne escape-sandbox"-Empfehlung war
zu vorsichtig; der Live-Test hat sie widerlegt — OHNE escape-sandbox erbt der
geöffnete Tab die Sandbox, und ein echter Stripe/PayPal-Checkout bricht. Merksatz
bestätigt: die laufende App schlägt die statische Analyse. escape-sandbox betrifft
NUR die Popups (echte Top-Level-Tabs), nicht den Zugriff aufs Eltern-Origin -> hier
harmlos (eigene HTML im eigenen Browser). Beim späteren Ausliefern fremder Seiten an
Dritte neu bewerten (Phase 6).

Scheibe 1 = Engine (rein, getestet) + funktionale Vorschau. Export (Download/Copy)
folgt als unmittelbare Scheibe 2.

### HTML-Export (Scheibe — finaler Export der funktionalen Seite)
Export ist die Auslieferung der echten Engine-Ausgabe als Datei. Kern:
generateFunctional(code, mappings, "export") -> Datei. Engine + export-Modus sind
bereits gebaut und getestet (Gegenproben: gemappt feuert, un-gemappt unberührt,
openInNewTab respektiert). Dieses Slice liefert NUR noch die Ausgabe-Wege, keine
neue Transformations-Logik.

Owner-Entscheidungen (endgültig):
- Ausgabeart: BEIDES — großer Button "Projekt exportieren" (Download .html) +
  kleinerer "In Zwischenablage kopieren" daneben. Copy braucht EHRLICHES Feedback
  ("Kopiert" / Fehlerfall-Hinweis), kein stilles Nichts (clipboard kann
  fehlschlagen, z.B. fehlende Permission / unsicherer Kontext).
- Zustand: WYSIWYG — immer der aktuelle LIVE-Editor-Stand, UNABHÄNGIG vom
  Speichern. Kein Zwang, vorher zu speichern.
- KRITISCH (gleiche Quelle): aus DERSELBEN stabilisierten Quelle generieren, aus
  der auch die funktionale Vorschau baut (NICHT roher, unstabilisierter
  Textarea-Inhalt). Nur so decken sich die ps-ids im Export zeichen-genau mit den
  elementIds der Mappings — sonst liefe das Wiring ins Leere.
- Orphans: still rausfiltern (die Engine tut das ohnehin — gleiche abgeleitete
  "ps-id im Code vorhanden?"-Logik wie findOrphans), ABER ein unaufdringlicher
  Hinweis neben dem Button, NUR wenn offene Orphans existieren (count>0), mit
  Zahl. Gespeist aus der vorhandenen findOrphans-Logik, KEIN neuer Detektionsweg.
- Dateiinhalt: das vollständige Dokument aus generateFunctional("export") 1:1
  (DOCTYPE, head, User-HTML, vor </body> JSON-Datenblock + Wiring-Script). Kein
  zusätzliches Verpacken. Dateiname aus dem Projektnamen slugifiziert (Fallback
  "pagesmith-export.html").
- Vorschau-Garantie: Was in der Vorschau klickt, tut die exportierte Datei —
  gleiche Engine, gleiche Eingaben, nur mode kippt von "preview" auf "export".

