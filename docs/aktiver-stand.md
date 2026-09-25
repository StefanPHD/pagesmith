# Phase 12.5 — Medien: DER AKTIVE STAND

**PFLICHT-GATE:** Diese Datei ist ab ihrer Anlage (2026-09-25) das Pflicht-Gate ("Auftrag 0")
jedes Bau- und Aufklärungs-Prompts der Phase 12.5 (CLAUDE.md, "## Aktiver Stand — Verfahren
ab Phase 10"). Verfahren: docs/arbeitsweise.md, "Die Standdatei".

**GEGENSTAND:** Roadmap-Zeile 12.5 (docs/roadmap.md) — Medien (Bilder, SVG, Video,
Hintergrundbilder) im importierten Kunden-HTML erkennen und ändern, in drei Stufen
(Entscheidung P12.5-3). Die erste Scheibe ist die Schatten-Korrektur (Entscheidung P12.5-2);
sie ist zugleich Vorbedingung der Phase 12.

**NUMMERN:** eine durchlaufende Reihe `P12.5-n` über alle Gattungen, Gattung vorn (Entscheidung
P12.5-1, Vermerk P12.5-8 …) — dieselbe Form wie in der Phase 11.9.

**FORM (OWNER-VORGABE 2026-09-25, Roadmap-Zeile 11.9):** nur harte Angaben, je mit Fundstelle
(Symbolname) und Provenienz.

## Abschnitte der Standdatei 12.5

- Owner-Entscheidungen zur Phase 12.5 vom 2026-09-25
- Aufklärung zur Phase 12.5 vom 2026-09-25
- Die Schatten-Probe vom 2026-09-25
- Scheibe 1 — Schatten-Korrektur
- Register der Phase 12.5
- Nächster Schritt der Phase 12.5

## Owner-Entscheidungen zur Phase 12.5 vom 2026-09-25

PROVENIENZ aller sieben: OWNER-ENTSCHEIDUNG 2026-09-25, übermittelt im Auftrag der Doku-Runde
desselben Tages. Wo eine Entscheidung eine Tatsache nennt, steht ihre Fundstelle daneben.

**Entscheidung P12.5-1 — DIE MEDIEN-PHASE WIRD AUFGENOMMEN, ALS PHASE 12.5.** Reihenfolge des
Baus: Schatten-Korrektur -> Medien Stufe 1 -> Rich-Text (Phase 12). Die Zeile steht in
docs/roadmap.md VOR der Zeile 12; die Reihenfolge der Zeilen ist eine Ablage, kein Bauplan
(docs/roadmap.md, Eintrag 11.10, Punkt (d)) — der Bauplan ist dieser Satz.

**Entscheidung P12.5-2 — DIE SCHATTEN-KORREKTUR IST SCHEIBE 1 DER PHASE 12.5** und
Vorbedingung der Phasen 12.5 und 12. Befund: Vermerk P12.5-9.

**Entscheidung P12.5-3 — DREI STUFEN.**
- Stufe 1, ohne neue Infrastruktur: Erkennung von `img`, `picture`, inline-`svg`, `video`,
  `background-image`; Änderung NUR VORHANDENER Medien-Elemente (`src`, `alt`, `poster`,
  Video-Schalter); bei stark abweichendem Seitenverhältnis eine Warnung statt eines Zwangs; ein
  Hinweis auf kaputte relative Pfade.
- Stufe 2, Uploads: Speicher, Umwandlung, Ursprungs-Isolation, Missbrauch, Löschregel; davor
  eine Anbieter-Lesung (Supabase Storage oder ein neuer Anbieter).
- Stufe 3: Asset-Bibliothek, SVG-Farben einbrennen, ZIP-Export, neu eingefügte Einbettungen —
  die Einwilligung wird dann UNSERE Frage.

**Entscheidung P12.5-4 — GRENZEN DER VISION, ALS BEFUND.**
- Serverseitiges SVG-Bereinigen per DOMPurify kollidiert mit der Dauerregel "KEIN
  SERVER-SEITIGES HTML-PARSING" (docs/immer-beachten.md); die Gefahr liegt im URSPRUNG des
  Speichers, nicht in der Seite.
- Ein neuer Speicher-Anbieter nur nach einer Lesung (docs/immer-beachten.md, "EIN NEUER
  ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN …").
- Uploads sind eine neue Missbrauchsklasse: Der Kill-Switch sperrt heute keine Dateien — er
  wirkt in der Serve-Route und im Ingest (`resolvePublished` in src/lib/hosting/resolve.ts,
  CLAUDE.md, Tier 0 "KILL-SWITCH"), und eine Datei-Route gibt es nicht (Vermerk P12.5-8,
  Punkt (9)). Ein gelöschtes Asset bricht ausgelieferte Seiten still (ABLEITUNG aus
  docs/immer-beachten.md, "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY").
- YouTube- und Vimeo-Einbettungen berühren die Einwilligung.
- KI-Markierungen gehören zu Phase 18 und werden nicht vorgebaut. (Der Begriff steht sonst
  nirgends im Repo; Phase 18 ist der MCP-Server, docs/roadmap.md.)

**Entscheidung P12.5-5 — MEDIENBYTES LAUFEN NIE ÜBER UNSERE VERCEL-ROUTEN.** BINDEND ÜBER DIE
PHASE HINAUS. Grund: Der Hobby-Tarif stoppt hart statt zu berechnen (CLAUDE.md, Tier 0
"KOSTEN-CIRCUIT-BREAKER": "der Schaden wäre ein harter Stopp statt einer Rechnung") — und zwar
für alle Kundenseiten zugleich (ABLEITUNG: alle Serving-Hosts laufen durch dieselbe
Anwendung, src/proxy.ts); und die Fair-Use-Seite führt "Media hosting for hot-linking" unter
"Never fair use" (docs/plattform-befunde.md, Abschnitt "Vercel (Hosting · Ausspielung · Deploy
· zeitgesteuerte Auslöser)", Teil (g); GELESEN 2026-09-02, Doku-Stand 2026-07-29).

**Entscheidung P12.5-6 — "RICH-TEXT ZUERST" IST VERWORFEN.** Rich-Text verlangt die schwerere
Senken-Entscheidung (heute schreibt die Engine über `textContent`, `generateFunctional` in
src/lib/generate.ts) und profitiert von einem Modell, das den zweiten Änderungstyp schon kennt.

**Entscheidung P12.5-7 — DAS EDITOR-GERÜST IST EINE EIGENE SCHEIBE,** NACH der
Schatten-Korrektur und VOR der ersten Medien-Oberfläche: linke Spalte in Reitern (Elemente als
Standard, Code, Skripte); rechte Spalte strikt kontextuell zum gewählten Element, ohne Auswahl
ein Hinweis; globale Einstellungen (Einwilligung, Einstellungen, Veröffentlichen) aus den
Spalten in eine Kopfleiste bzw. ein Modal. NUR Struktur, keine Optik — die Oberfläche wird
später neu gestaltet, strukturelle Lösungen überleben das. NICHT mit der Schatten-Korrektur
bündeln. Grund: jeder neue Werkzeugsatz landete sonst im gestapelten Layout und würde zweimal
gebaut. Die genaue Form entsteht im Zuschnitt nach einem Blick in den Code.

## Aufklärung zur Phase 12.5 vom 2026-09-25

**Vermerk P12.5-8 — erste Aufklärung zu Phase 12 und den Medien (KEIN BAU, daher kein
Bau-Commit: die Aufklärung war read-only und hat keine Zeile Code erzeugt; CC, 2026-09-25,
HEAD `c172e17`).** Alle Angaben GEMESSEN am Repo, soweit nicht anders gekennzeichnet.

(1) ERKENNUNG (src/lib/detect.ts): Kandidaten sind `CANDIDATE_SELECTOR` (Buttons einschliesslich
    `[role="button"]` und `input[type="image"]`, `form`, `a[href]`) und `TEXT_SELECTOR`
    (`h1`–`h6`, `p`), zusammen `LINKABLE_SELECTOR`. `classify` ordnet mit Vorrang
    button > form > link > text; Text nur, wenn `isPureText` gilt (kein Kind-Element ausser
    `<br>`). Kennung: Attribut `data-pagesmith-id`, Format `PS_ID_RE`. `stabilizeIds` schreibt
    sie beim Speichern (`handleSave`, src/components/CodeImporter.tsx) an JEDEN klassifizierten
    Kandidaten; `anchorMappingTarget` gleicht eine frische ID über den Listen-Index ab. Die
    Konstante `PAGESMITH_ID_ATTR` steht zweimal: detect.ts und src/lib/generate.ts.
(2) ABLAGE: eine Text-Änderung ist ein Mapping `{ elementId, type: "text", config: { content } }`
    (`Mapping`, src/lib/mappings.ts) in `projects.mappings` bzw. `mappings_b` (Migrationen 0001,
    0016), gespeichert über `saveProject`/`saveVariantB` (src/app/projects/actions.ts); beim
    Veröffentlichen zusätzlich in `published_content.mappings` (`publishProject`). NICHT im
    Einstellungs-Blob.
(3) WIRKUNG: im Editor `postTextPatch` -> Nachricht `PS_SET_TEXT` -> Handler in `LISTENER_SCRIPT`
    setzt `textContent`; nach einem Neuladen bäckt `editPreviewHtml` die Overrides ein. Vorschau:
    Text-Schleife in `buildWiringScript` (`MODE !== "export"`). Export und Veröffentlichen laufen
    über `buildDocumentFor` -> `generateFunctional(..., "export")`, das den Text als
    `textContent` ins DOM bäckt; die Serve-Route liefert `published_content.html` unverändert
    (`GET`, src/app/app-serve/route.ts).
(4) DER EXPORT-FILTER IST EIN NEGATIV-AUSSCHLUSS: `mode === "export"` -> `m.type !== "text"`
    (Tabelle in `generateFunctional`). Ein neuer Mapping-Typ käme dort in den ausgelieferten
    Datenblock `pagesmith-mappings` und löste bei einer sonst statischen Seite Scripts aus
    (`injectScripts`). `configEqual` (mappings.ts) liefert für einen Typ ohne eigenen Zweig
    `false` -> dauerhaft dirty.
(5) MEDIEN IM BESTAND: `img`, `picture`/`source`, inline-`svg`, `video`, `iframe`,
    `background-image` und Tailwind-Klassen mit einer URL in eckigen Klammern sind KEINE
    Kandidaten (zur Schreibweise s. Punkt (13)). Ausnahmen: `input[type="image"]`
    und jedes Element mit `role="button"` sind Button-Kandidaten. Die Import-Bereinigung
    (`scanForeignTags`, src/lib/foreign-scan.ts) erfasst `img`/`iframe` nur mit BEKANNTER
    Tracking-Adresse (Entscheidung P11.11-29 der Phase 11.11); YouTube und Vimeo stehen in keiner
    Signatur (src/lib/foreign-signatures.ts). Achse: `srcset|poster|background-image|bg-\[url|
    "IMG"|"VIDEO"|"SVG"|"iframe"|picture|"source"` über src/ ohne Tests und Fixtures — ein
    Kommentar-Treffer; Positivkontrolle `input[type="image"]` in `BUTTON_SELECTOR`.
(6) RELATIVE PFADE: kein `<base>`-Handling im Code (Achse `<base|baseURI|base href` über src/:
    0; Positivkontrolle `<head`: Treffer). Der srcDoc-Rahmen erbt die Basis-URL der App
    (docs/claude-history/phase-4-mapping-codegen-export.md); der Matcher in src/proxy.ts schliesst
    Bilddateien aus. Dass ein relativer Pfad in Vorschau und Hosting bricht, ist ABGELEITET,
    nicht gemessen.
(7) KANDIDATEN FÜR EINEN ZWEITEN ÄNDERUNGSTYP — KEINE WAHL:
    K1 neuer Zweig im Mapping-Modell (`mappings`/`mappings_b`), Export-Bake per `setAttribute`
       analog zum href-Bake, Vorschau-Nachricht analog zu `PS_SET_TEXT`. Preis: neue Kandidaten
       erzeugen den Schatten-Fall aus Vermerk P12.5-9; `configEqual` braucht einen Zweig; der
       Export-Filter aus (4) braucht einen Ausschluss; die URL-Senke eine Prüfung wie
       `isValidRedirectUrl`.
    K2 Schreiben in den Code (Präzedenz `stabilizeIds`). Preis: kein Weg-C-Netz, kein Entfernen
       zurück aufs Original, jede Änderung lädt den Edit-Rahmen neu.
    K3 Ablage im Einstellungs-Blob. Preis: löst den offenen Punkt "`settingsEqual` IST EINE
       ALLOWLIST …" aus; das Blob gilt je Projekt, nicht je Variante.
    K4 eigene Spalte oder Tabelle (mit Stufe 2). Preis: Migration, Pflicht-Stopp
       docs/db-stand.md und docs/db-regeln.md, RLS; ab dem 30.10.2026 der offene Punkt "DIE
       GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026".
(8) SUPABASE STORAGE IST UNGENUTZT: Achse `\.storage\b|storage\.from|bucket|storage\.objects|
    storage\.buckets` über src/ und supabase/ — kein Storage-Treffer; Positivkontrolle: das
    Muster trifft "Bucket" im A/B-Code. docs/db-stand.md und docs/db-regeln.md: `storage|bucket`
    0 (Positivkontrolle `published_content|projects`: 16). Einziger Upload-Pfad ist der
    HTML-Import (`validateUploadFile`, src/lib/upload.ts; `FileReader` -> `setCode`), kein
    Server-Upload.
(9) SERVE-PFAD NUR HTML: kein `next/image` in src/ ausser dem Matcher-Kommentar in src/proxy.ts;
    next.config.ts trägt `images.unoptimized: true`; keine Route streamt Datei-Bytes (Achse
    `new Response\(|ReadableStream|arrayBuffer\(|new Blob|\.stream\(`; Positivkontrolle: die
    Serve-Route trifft).
(10) EIGENE MARKIERUNGEN IM AUSGELIEFERTEN TEXT: `data-pagesmith-id` an jedem Kandidaten; die
    Script-IDs `pagesmith-mappings` (`MAPPINGS_SCRIPT_ID`), `pagesmith-consent`, `__ps_pve`,
    `__ps_cns`, `__ps_cnr`, `__ps_clb` bzw. `__ps_cmo`, `__ps_crv`; das Wiring-Script ohne id. Ein
    `data-ps-*`-Attribut gibt es nicht. Der Riegel `hasOwnBlocks` (src/lib/own-blocks.ts) sucht
    Teilstrings (`OWN_BLOCK_NEEDLES`); `data-pagesmith-id` ist keine Nadel, ein neues Attribut
    löst ihn nur aus, wenn sein Text eine Nadel enthält.
(11) EINWILLIGUNG: fremde Einbettungen bleiben unberührt — kein Zugriff auf fremde iframes in
    src/lib/tracking und src/lib/analytics; Dauerregel "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES
    FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN". `ALL_CONSENT_KEYS` trägt sieben Schlüssel (fünf
    Ziele, `analytics`, `custom`); `custom` (`CUSTOM_CONSENT_TARGET`, src/lib/tracking/consent.ts)
    ist kein `TrackingTarget`, hinten angehängt, Gruppe "Werbung" (`CONSENT_GROUP_KEYS`), mit
    eigenem `__psConsent`-Aufruf.
(12) ZUR PHASE 12 (Befund steht an der Roadmap-Zeile 12): `isPureText` schliesst jedes
    `h1`–`h6`/`p` mit Kind-Element ausser `<br>` aus (Tests in src/lib/detect.test.ts: "<p> MIT
    Kind-Element (<strong>) ist KEIN Textkandidat", "ein <p> mit Kindern bekommt KEINE ps-ID").
(13) EINE TAILWIND-KLASSE IM DOKU-TEXT BRICHT DEN BUILD — GEMESSEN (CC, 2026-09-25, beim
    Anlegen dieser Datei): Stand hier die Tailwind-Schreibweise eines Hintergrundbilds, also
    "bg-" gefolgt von einer URL mit Platzhalter in eckigen Klammern, als Literal, scheiterte
    `next build` mit "Module not found: Can't resolve '...'" in src/app/globals.css — Tailwind
    hat die Zeichenkette aus docs/ als Klasse erzeugt, und Turbopack versuchte, den Platzhalter
    als Datei aufzulösen. Nach dem Umschreiben lief der Build durch. tsc, lint und vitest blieben
    dabei grün. FOLGE FÜR JEDEN TEXT DIESER PHASE, der Medien beschreibt: eine solche Klasse nie
    als Literal in eine Datei schreiben, die Tailwind scannt; welche Dateien das sind, ist NICHT
    erhoben (docs/ war es nachweislich).

## Die Schatten-Probe vom 2026-09-25

**Vermerk P12.5-9 — EIN MARKIERTES KIND VERDECKT DIE AKTION SEINES ELTERNELEMENTS (KEIN BAU,
daher kein Bau-Commit: eine Live-Probe des Owners, dazu eine Ablesung am Code).**

(1) GEMESSEN — OWNER, LIVE, 2026-09-25 (von CC nicht prüfbar): Testprojekt "Schatten Test",
    Seite schatten-test-9llxkn.publayer.net. HTML: ein `<a href="#unten">` mit einem `<h2>` und
    freiem Text "Rand-Bereich"; Track-Aktion "Lead" am `<a>`.
    · Klick auf den Rand-Bereich: `POST /api/e`, 204, event "Lead", eventID
      067b6aa6-a424-4825-af78-9625a5b93182, `cns` {meta:true}.
    · Klick auf das `<h2>`: KEIN Request an `/api/e`.
    · Editor: das `<h2>` ist einzeln wählbar (nur "Text bearbeiten"); das `<a>` nur über den
      freien Rand oder die Liste "Erkannte Elemente"; die Markierung rahmt dann den ganzen Link.
(2) DER MECHANISMUS AM CODE (GEMESSEN am Repo, CC, 2026-09-25): Das ausgelieferte Wiring sucht
    mit `t.closest("[data-pagesmith-id]")` das INNERSTE markierte Element (`buildWiringScript`,
    src/lib/generate.ts); die Editor-Brücke ebenso (`LISTENER_SCRIPT`, src/lib/detect.ts).
    `stabilizeIds` markiert jeden reinen Text-Kandidaten, also auch ein `<h2>` im Link. Für das
    `<h2>` liefert `byId` keine Aktion (Text-Mappings stehen im Export nicht in der Tabelle).
(3) ABGELEITET, NICHT GEMESSEN:
    · Ein `<button>` mit Redirect verlöre bei einem Klick auf ein markiertes Kind auch den
      Redirect — ein `<button>` hat kein gebackenes `href`, auf das die Navigation zurückfiele
      (href-Bake nur für `<a>`, `generateFunctional`).
    · In der funktionalen Vorschau schluckt das Containment den Klick
      (`MODE === "preview" && t.closest("a[href]")` -> `preventDefault`).
    · Ob die Navigation auf `#unten` beim Klick auf das `<h2>` stattfand, sagt die Probe nicht.
(4) WIRKUNG EINER KORREKTUR: erst nach erneutem Veröffentlichen — die Serve-Route liefert den
    gespeicherten Text (docs/immer-beachten.md, "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM
    DEPLOY"). Heruntergeladene Exporte bleiben unverändert. Dass nichts auf das Nachziehen
    hinweist, ist der offene Punkt "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN
    IST".

## Scheibe 1 — Schatten-Korrektur

**ZIEL** (Entscheidung P12.5-2; Befund: Vermerk P12.5-9): Trägt das innerste markierte
Element keine Klick-Aktion (`track` oder `redirect`), löst ein Klick zur Laufzeit die Aktion
des nächsten markierten Vorfahren aus, der eine trägt. Die Editor-Auswahl bleibt beim
innersten Element — das `<h2>` bleibt einzeln bearbeitbar. Die Korrektur liegt allein in
`buildWiringScript` (src/lib/generate.ts); `LISTENER_SCRIPT` (src/lib/detect.ts) bleibt
unverändert. PROVENIENZ: Plan- und Bau-Auftrag des Architekten, 2026-09-25.

**INVARIANTEN** (ARCHITEKT, Plan-Auftrag 2026-09-25, wörtlich):
- (I1) Die Editor-Auswahl trifft weiter das innerste markierte Element.
- (I2) Pro Klick höchstens EINE Aktion — die des innersten Elements, das eine Aktion trägt.
  Nie zwei (doppelte Conversion unter geteilter eventID wäre die Folge).
  LESART (CC im Plan, 2026-09-25): die Aktionen EINES Elements — ein Element mit `redirect`
  und `track` führt beide aus; je Element und Typ gibt es höchstens ein Mapping
  (`upsertMapping`, src/lib/mappings.ts, GELESEN).
- (I3) Die Form des Datenblocks { elementId, type, config } und das Attribut
  data-pagesmith-id bleiben unverändert; bereits veröffentlichte Datenblöcke bleiben gültig.
- (I4) Eine Seite ohne Laufzeit-Aktion bekommt weiter KEIN Skript.
- (I5) Ein Klick direkt auf das Element mit Aktion verhält sich wie heute.
- (I6) ingest.ts, resolve.ts, proxy.ts, app-serve/route.ts und alles unter src/lib/capi/ und
  src/lib/tracking/ bleiben unberührt — auch nicht "nur schnell".
  AUSNAHME für genau zwei Testdateien: Entscheidung P12.5-19.

**Vermerk P12.5-13 — DER BYTE-WÄCHTER PINNT DAS KLICK-SKRIPT (Gate G8 des Plans; GEMESSEN, CC,
2026-09-25, HEAD `0529e02`).** Die Tests W1 und W2 in src/lib/own-blocks-waechter.test.ts
vergleichen Bytes und sha256 des Dokuments aus `generateFunctional(…, "export")` bzw. danach
`injectPageViewEmitter` mit den Sollwerten aus Entscheidung P11.11-22, Punkt (g), der Phase
11.11: 13 250 B / sha256 `b6ee842b…33a471e6` und 27 158 B / sha256 `70a86db8…8ef1a89d46`. Die
Sonde trägt `redirect` und `track` an einem `<button>`; das Dokument enthält damit das
Wiring-Script aus `buildWiringScript` samt auxclick-Zweig, und JEDE Änderung am Klick-Skript
macht W1/W2 rot. Der Kopf des Wächters: "WIRD ER ROT, IST DAS EIN STOPP UND KEINE ANPASSUNG
DES SOLLWERTS." Lauf `vitest run src/lib/own-blocks-waechter.test.ts`: 4 von 4 grün.
Festgeschrieben ist das Klick-Skript an VIER Stellen in DREI Testdateien: neben W1 und W2 auch
T1 in src/lib/tracking/consent-setter.test.ts (14 160 B / sha256 `a953b21e…c04faa`) und T9 in
src/lib/tracking/custom-pixel.test.ts (zwei Fixtures: 5 819 B / `89f6fa2f4435374b` und
12 964 B / `70107cb1b2934e75`, sha256 auf 16 Zeichen gekürzt). Beide werden mit den
Einsetzungen E1–E3 rot, ohne jede Mutation (GEMESSEN, CC, 2026-09-25). Inventur aller
Testdateien mit Hash oder Bytezählung und Ursache der früheren Fehlmeldung: Vermerk P12.5-18.
Die Nadel
`WIRING_NEEDLE` (src/lib/own-blocks.ts) ist `getElementById("pagesmith-mappings")`; diese
Zeile des Skripts bleibt unberührt.

**Entscheidung P12.5-14 (D1 des Plans) — DIFFERENZ-NACHWEIS STATT BYTE-GLEICHHEIT.** W1 und W2
werden nach docs/immer-beachten.md, "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD, TRITT EIN
DIFFERENZ-NACHWEIS AN IHRE STELLE …" umgestellt. Die Sollwerte bleiben UNVERÄNDERT und sind
der Vorher-Wert; die Korrektur wird als reine EINSETZUNG gebaut, deren Wortlaut der Test aus
dem freigegebenen Plan tippt, nicht aus dem Code; der Kopf des Wächters wird im selben Commit
neu gefasst. GRUND: Ein aus dem Bau abgelesener Sollwert wäre der Spiegel, den Entscheidung
P11.11-18 der Phase 11.11 verbietet; ohne Textänderung ist die Korrektur nicht zu bauen — der
Datenblock ist durch (I3) gesperrt, ein zweites Script änderte den Text ebenso. PROVENIENZ:
ARCHITEKT, 2026-09-25.

**Entscheidung P12.5-15 (D2 des Plans) — FORMULARE BLEIBEN EXAKT WIE HEUTE.** Die Suche nach
oben läuft nicht in ein `<form>` hinein: erreicht sie ein FORM, endet sie mit null. Ein
direkter Treffer auf das `<form>` (`closest` liefert es selbst) bleibt unverändert. GRUND: Der
Befund aus Vorrat P12.5-17 deutet auf heutige Überzählung; die Scheibe weitet ihn nicht aus.
PROVENIENZ: ARCHITEKT, 2026-09-25.
AUSLEGUNG IM BAU (CC, 2026-09-25): Ein direkter Treffer auf ein `<form>` OHNE Klick-Aktion
läuft ebenfalls nicht weiter nach oben — sonst löste ein Klick in ein Formular ohne Aktion,
das in einem Element mit Aktion liegt, künftig dessen Aktion aus, und das Formular verhielte
sich anders als heute.

**Entscheidung P12.5-16 (D3 des Plans) — P11.12-2 WIRD NICHT MITGENOMMEN.** GRUND: Die falsche
Begründung steht in src/lib/generate.ts ZWEIMAL — im Kopfkommentar von `buildWiringScript`
ausserhalb des Scripts und im Kommentar INNERHALB des ausgelieferten Scripts ("srcDoc-Basis
(unsere Origin)"). Die innere zu ändern ist eine Ersetzung und bricht die reine Einsetzung
(Entscheidung P12.5-14); nur die äussere zu ändern fiele unter docs/immer-beachten.md, "WER
EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE". PROVENIENZ: Vorschlag CC im
Plan, ARCHITEKT-Entscheidung 2026-09-25.

**Vorrat P12.5-17 — DER TRACK EINES FORMULARS FEUERT BEI JEDEM KLICK AUF EIN UNMARKIERTES
KIND.** ABGELEITET am Code (CC, 2026-09-25), UNGEMESSEN. Der Click-Listener in
`buildWiringScript` (src/lib/generate.ts) sucht `t.closest("[data-pagesmith-id]")`. Ein
Eingabefeld ist kein Kandidat (`CANDIDATE_SELECTOR`, src/lib/detect.ts: Buttons, `form`,
`a[href]`) und trägt keine Kennung; `form` ist Kandidat und wird markiert (`stabilizeDoc`). Ein
Klick in das Feld findet also das `<form>` und führt dessen `track` aus. Ein Formular bekommt
die Slots `redirect` und `track` wie jedes Element ausser Text (`ActionPanel`,
src/components/ActionPanel.tsx). Folge, falls es zutrifft: möglicherweise falsche Conversions
— gezählt wird der Klick ins Feld, nicht das Absenden. TRIGGER: die nächste Messung nach
Scheibe 1.

**Vermerk P12.5-18 — INVENTUR DER TESTDATEIEN MIT HASH ODER BYTEZÄHLUNG, UND WARUM G8 SIE
VERFEHLT HAT (GEMESSEN, CC, 2026-09-25, im Bau der Scheibe).**
(1) URSACHE DER FEHLMELDUNG IN G8: Die Suche
`toMatchSnapshot|toMatchInlineSnapshot|sha256|createHash|subtle.digest` über src/ lief mit
`| head` und gab zehn Zeilen aus; die zehn Zeilen stammten aus zwei Dateien
(src/lib/analytics/pageview-emitter.resend.test.ts, src/lib/own-blocks-waechter.test.ts). Die
übrigen Treffer, darunter die zwei weiteren Pins, lagen jenseits der Kappung. Die gemeldete
Abwesenheit hat das Werkzeug erzeugt, nicht der Code.
(2) DIE SUCHE OHNE KAPPUNG: Achse `createHash|subtle.digest|sha256|byteLength|BASELINE` über
alle `*.test.ts`/`*.test.tsx` unter src/ — acht Dateien. DREI davon tragen die VIER Pins des
Klick-Skripts, jeweils ein fester Byte- und sha256-Wert eines Dokuments aus
`generateFunctional(…, "export")`: W1 und W2 (src/lib/own-blocks-waechter.test.ts), T1
(src/lib/tracking/consent-setter.test.ts), T9 mit zwei Fixtures
(src/lib/tracking/custom-pixel.test.ts). Die übrigen FÜNF pinnen es nicht:
- src/lib/analytics/pageview-emitter.resend.test.ts, N8: fester Wert über
  `buildPageViewScript` allein, kein Wiring-Script.
- src/lib/tracking/consent-store.test.ts, R3: fester Wert über `buildConsentDenyScript` allein
  (selbst ein Differenz-Nachweis seit Phase 11.6).
- src/lib/foreign-strip.test.ts: `byteLength` nur als DIFFERENZ zweier Texte desselben Laufs,
  kein fester Wert.
- src/lib/own-blocks-strip.test.ts: ebenso, eine Byte-Differenz desselben Laufs.
- src/lib/tracking/consent-revoke.test.ts: der Treffer steht nur in einem Kommentar (der dort
  gestrichene Wächter W0).
(3) DIE GEGENPROBE: Die Mutation M1 ändert E1, das in JEDEM Wiring-Script steht — in jedem
Modus, auch vor dem Ausstieg für "edit". Unter M1 wurden an Byte-Tests genau W1', W2', T1 und
T9 rot; keine der fünf übrigen Dateien.
(4) PROBE (CC, 2026-09-25, im Scratchpad, nicht im Repo; Fixtures zeichengleich aus T1 und T9):
Nach Entfernen von E1–E3 ist der Text an allen drei Fixtures byte- und sha-gleich zum
jeweiligen Sollwert, ohne Entfernung weicht er ab (roh je 1 052 B mehr).

**Entscheidung P12.5-19 (Entscheidung zum STOPP im Bau, A mit A1) — DER DIFFERENZ-NACHWEIS AUCH
AN T1 UND T9.** (I6) wird AUSSCHLIESSLICH für zwei Testdateien aufgehoben:
src/lib/tracking/consent-setter.test.ts (T1) und src/lib/tracking/custom-pixel.test.ts (T9).
Produktionscode unter src/lib/tracking/ und src/lib/capi/ bleibt gesperrt. T1 und T9 werden
wie W1'/W2' zum Differenz-Nachweis: Sollwerte UNVERÄNDERT, die Einsetzungen E1–E3 in JEDER
Datei eigens abgetippt, ihre Anzahl vorher genannt, nach Entfernung gleich dem Sollwert in Bytes
und sha256, ohne Entfernung abweichend; die Köpfe beider Tests werden, soweit sie das Pinnen
beschreiben, im selben Zug angepasst. GRUND: Ohne Umstellung bleiben beide Tests rot (B); neue
Sollwerte aus dem Bau wären der Spiegel aus Entscheidung P11.11-18 der Phase 11.11 (C); die
Probe aus Vermerk P12.5-18, Punkt (4), zeigt, dass der Nachweis dort aufgeht. Je Datei eine
eigene Abschrift (A1) statt einer gemeinsamen Hilfsdatei (A2): jede Abschrift wird für sich
gegen den Code geprüft, ein Auseinanderlaufen macht den betroffenen Test rot — und eine neue
Datei verlangte eine eigene Owner-Entscheidung. PROVENIENZ: ARCHITEKT, 2026-09-25.

## Register der Phase 12.5

Je Eintrag Zieldatei und wörtlicher Titelanfang; Titel ohne Überschriften-Marke.

POSTEN IN docs/offene-punkte.md, DEREN TRIGGER DIESE PHASE AUSLÖSEN KANN (Titel und Trigger
wörtlich im Stub in CLAUDE.md, "## Offene Punkte"):
- "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST" — bereits eingetreten; jede
  Korrektur dieser Phase wirkt erst nach erneutem Veröffentlichen (Vermerk P12.5-9, Punkt (4)).
- "`settingsEqual` IST EINE ALLOWLIST …" — bei einer Ablage im Einstellungs-Blob (Kandidat K3).
- "DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026" — bei einer neuen Tabelle in public
  (Kandidat K4, Stufe 2).
- "DIE IDOR-WÄCHTER SIND NAMENTLICH — EINE NEUE SERVER-ACTION IST UNGESCHÜTZT BY DEFAULT …" —
  bei einer neuen Server-Action (etwa für Uploads, Stufe 2).
- "DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER PROJEKTREGEL AB" — bei einer neuen
  DB-Funktion oder RPC (Stufe 2).
- "DIE MIDDLEWARE LEITET API-ROUTEN AUF EINE HTML-SEITE UM" — bei einem programmatischen
  Aufrufer einer neuen API-Route (Stufe 2).
- "COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH" — falls eingefügte
  Einbettungen Cookies setzen (Stufe 3).

POSTEN IM BACKLOG, DIE DIE SCHATTEN-KORREKTUR BERÜHRT (docs/claude-history/backlog-polish.md):
- "ELEMENTLISTE: VERSCHACHTELTE ELEMENTE ERSCHEINEN ALS DOPPEL-EINTRAG." — die WARNUNG dort: das
  Konstrukt "<a> umschliesst <button>" trägt den href-Bake- und auxclick-Pfad; wer dedupliziert,
  kann ihn still brechen.
- "(P11.12-2) DER KOPFKOMMENTAR VON `src/lib/generate.ts` BEGRÜNDET DAS PREVIEW-CONTAINMENT
  FALSCH." — dieselbe Datei.

VORRAT DIESER PHASE, DIREKT IM BACKLOG ABGELEGT (docs/claude-history/backlog-polish.md,
Abschnitt "Aus Phase 12.5 vorgemerkt (2026-09-25) …"): P12.5-10, P12.5-11, P12.5-12.

## Nächster Schritt der Phase 12.5

Der Bau der Scheibe 1 — Schatten-Korrektur (Abschnitt "Scheibe 1 — Schatten-Korrektur"),
danach ihr Live-Test durch den Owner.
