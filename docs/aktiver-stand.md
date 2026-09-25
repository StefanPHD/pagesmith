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
- Scheibe 1b — Formular-Track am Abschicken
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

**ABGESCHLOSSEN AM 2026-09-25 — Bau-Commit `5f1f4bf`, Live-Test bestanden; Abschluss-Vermerk
P12.5-20.** Der Zuschnitt ist verdichtet: Hier stehen nur noch die Invarianten und
Entscheidungen, die über die Scheibe hinaus binden, dazu die Vermerke und der Vorrat der
Scheibe. Was gestrichen ist und wo sein Inhalt steht: Vermerk P12.5-20, Punkt (7).

**INVARIANTEN, DIE ÜBER DIE SCHEIBE HINAUS BINDEN** (ARCHITEKT, Plan-Auftrag 2026-09-25,
wörtlich; Nummern wie im Plan):
- (I1) Die Editor-Auswahl trifft weiter das innerste markierte Element.
  WÄCHTER: T8 in src/lib/detect.test.ts (Mutation M5, Vermerk P12.5-20).
- (I2) Pro Klick höchstens EINE Aktion — die des innersten Elements, das eine Aktion trägt.
  Nie zwei (doppelte Conversion unter geteilter eventID wäre die Folge).
  LESART (CC im Plan, 2026-09-25): die Aktionen EINES Elements — ein Element mit `redirect`
  und `track` führt beide aus; je Element und Typ gibt es höchstens ein Mapping
  (`upsertMapping`, src/lib/mappings.ts, GELESEN). WÄCHTER: T5 in src/lib/generate.test.ts
  (Mutation M2).
- (I3) Die Form des Datenblocks { elementId, type, config } und das Attribut
  data-pagesmith-id bleiben unverändert; bereits veröffentlichte Datenblöcke bleiben gültig.
GRUND DES BLEIBENS (CC, Verdichtung 2026-09-25): Die drei beschreiben Eigenschaften der
Editor-Brücke (`LISTENER_SCRIPT`), des ausgelieferten Wirings (`buildWiringScript`) und des
Datenblocks, auf die spätere Arbeit trifft — das Editor-Gerüst (Entscheidung P12.5-7) an der
Brücke, ein zweiter Änderungstyp (Kandidat K1, Vermerk P12.5-8, Punkt (7)) am Datenblock.

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

**Entscheidung P12.5-14 (D1 des Plans) — DIFFERENZ-NACHWEIS STATT BYTE-GLEICHHEIT.** Das
Wiring-Script ist an VIER Stellen byte-genau festgeschrieben: W1' und W2'
(src/lib/own-blocks-waechter.test.ts), T1 (src/lib/tracking/consent-setter.test.ts), T9
(src/lib/tracking/custom-pixel.test.ts); T1 und T9 kraft Entscheidung P12.5-19. Alle vier sind
seit Bau-Commit `5f1f4bf` Differenz-Nachweise nach docs/immer-beachten.md, "WO EINE
BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD, TRITT EIN DIFFERENZ-NACHWEIS AN IHRE STELLE …": Die
Sollwerte sind die UNVERÄNDERTEN Vorher-Werte; die Einsetzungen E1–E3 stehen in jeder der drei
Dateien eigens abgetippt, nicht aus dem Code abgelesen; geprüft werden ihre Anzahl, die
Gleichheit nach dem Entfernen in Bytes und sha256 und die Abweichung ohne das Entfernen.
BINDET JEDE KÜNFTIGE ÄNDERUNG AM ERZEUGTEN TEXT: Sollwerte und Einsetzungen werden nie aus dem
Bau nachgezogen; eine weitere bewusste Änderung braucht eine eigene Entscheidung und eine
eigene benannte Einsetzung, in ALLEN vier Nachweisen (so auch der Kopf von
src/lib/own-blocks-waechter.test.ts, Bau-Commit `5f1f4bf`). GRUND: Ein aus dem Bau abgelesener
Sollwert wäre der Spiegel, den Entscheidung P11.11-18 der Phase 11.11 verbietet; ohne
Textänderung war die Korrektur nicht zu bauen — der Datenblock ist durch (I3) gesperrt, ein
zweites Script änderte den Text ebenso. PROVENIENZ: ARCHITEKT, 2026-09-25.

**Entscheidung P12.5-15 (D2 des Plans) — FORMULARE BLEIBEN EXAKT WIE HEUTE.** Die Suche nach
oben läuft nicht in ein `<form>` hinein: erreicht sie ein FORM, endet sie mit null. Ein
direkter Treffer auf das `<form>` (`closest` liefert es selbst) bleibt unverändert. GRUND: Der
Befund aus Vorrat P12.5-17 deutet auf heutige Überzählung; die Scheibe weitet ihn nicht aus.
PROVENIENZ: ARCHITEKT, 2026-09-25. "HEUTE" meint den Stand vor Bau-Commit `5f1f4bf`.
AUSLEGUNG IM BAU (CC, 2026-09-25): Ein direkter Treffer auf ein `<form>` OHNE Klick-Aktion
läuft ebenfalls nicht weiter nach oben — sonst löste ein Klick in ein Formular ohne Aktion,
das in einem Element mit Aktion liegt, künftig dessen Aktion aus, und das Formular verhielte
sich anders als heute.
GEBAUT als die zwei FORM-Zeilen in `actionOwner` (`buildWiringScript`, src/lib/generate.ts).
WÄCHTER in src/lib/generate.test.ts: T10 (Mutation M6a), T10b (Mutation M6b), dazu
"T10 BESTAND" als Festschreibung des Verhaltens vor der Scheibe, ausdrücklich kein Soll.
VERHÄLTNIS ZU ENTSCHEIDUNG P12.5-21 (CC, 2026-09-25; STEHEN GELASSEN, NICHT ERSETZT): Vorrat
P12.5-17 ist gemessen und entschieden. Die Entscheidung löst mit dem Bau der Scheibe 1b
genau EINEN Satz dieser Entscheidung ab — "Ein direkter Treffer auf das `<form>` … bleibt
unverändert": Ein Klick innerhalb eines Formulars löst dessen Aktion dann nicht mehr aus, und
"T10 BESTAND" wird ersetzt. Der FORM-HALT BLEIBT und bindet über Scheibe 1b hinaus: Ohne ihn
liefe ein Klick auf ein markiertes Kind ohne Aktion in einem Formular (etwa "Formular-Text")
aus dem Formular hinaus zu einem umschliessenden Element mit Aktion. Bis zum Bau-Commit der
Scheibe 1b gilt diese Entscheidung unverändert, weil der Code sie trägt.
MIT SCHEIBE 1b IST DIE FORM-ZEILE NACH DEM HOCHSCHRITT DOPPELT GETRAGEN (GEMESSEN, CC,
2026-09-25): Die Mutation M6a allein wird fachlich nicht rot; M6a zusammen mit N2 (E4 entfernt)
macht T10 und "Regression Scheibe 1: Klick auf 'Formular-Text' im Formular mit Track -> 0"
rot, die mit N2 allein grün bleiben. M6a gilt damit nur zusammen mit N2 (Entscheidung
P12.5-32; Vermerk P12.5-31, Punkt (6)). Die Start-Prüfung trägt weiter allein: M6b macht T10b
rot.

**Entscheidung P12.5-16 (D3 des Plans) — P11.12-2 WIRD NICHT MITGENOMMEN.** GRUND: Die falsche
Begründung steht in src/lib/generate.ts ZWEIMAL — im Kopfkommentar von `buildWiringScript`
ausserhalb des Scripts und im Kommentar INNERHALB des ausgelieferten Scripts ("srcDoc-Basis
(unsere Origin)"). Die innere zu ändern ist eine Ersetzung und bricht die reine Einsetzung
(Entscheidung P12.5-14); nur die äussere zu ändern fiele unter docs/immer-beachten.md, "WER
EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE". PROVENIENZ: Vorschlag CC im
Plan, ARCHITEKT-Entscheidung 2026-09-25.
BINDET ÜBER DIE SCHEIBE HINAUS (CC, Verdichtung 2026-09-25): Wer den Backlog-Posten
"(P11.12-2) DER KOPFKOMMENTAR VON `src/lib/generate.ts` BEGRÜNDET DAS PREVIEW-CONTAINMENT
FALSCH." abarbeitet, ändert mit der inneren Stelle den ausgelieferten Text — die vier
Differenz-Nachweise (Entscheidung P12.5-14) werden dann rot, und die Änderung braucht eine
eigene Entscheidung.

**Vorrat P12.5-17 — DER TRACK EINES FORMULARS FEUERT BEI JEDEM KLICK AUF EIN UNMARKIERTES
KIND.** GEMESSEN (OWNER, LIVE, 2026-09-25, Messwerte unten) — ÜBERZÄHLUNG UND UNTERZÄHLUNG
BESTÄTIGT; überführt in Scheibe 1b (Entscheidung P12.5-21). Die Ableitung am Code (CC,
2026-09-25): Der Click-Listener in
`buildWiringScript` (src/lib/generate.ts) sucht `t.closest("[data-pagesmith-id]")`. Ein
Eingabefeld ist kein Kandidat (`CANDIDATE_SELECTOR`, src/lib/detect.ts: Buttons, `form`,
`a[href]`) und trägt keine Kennung; `form` ist Kandidat und wird markiert (`stabilizeDoc`). Ein
Klick in das Feld findet also das `<form>` und führt dessen `track` aus. Ein Formular bekommt
die Slots `redirect` und `track` wie jedes Element ausser Text (`ActionPanel`,
src/components/ActionPanel.tsx). Folge, falls es zutrifft: möglicherweise falsche Conversions
— gezählt wird der Klick ins Feld, nicht das Absenden. TRIGGER: die nächste Messung nach
Scheibe 1 — EINGETRETEN am 2026-09-25.
MESSWERTE — OWNER, LIVE, 2026-09-25, Seite "Schatten Test" (von CC nicht prüfbar). Aufbau:
`<form action="#unten">` mit `<p>Formular-Text</p>`, `<input type="email">`,
`<button type="submit">`; Track "Contact" am `<form>`, kein Mapping am Button; der Link mit
Track "Lead" unverändert.
· Positivkontrolle, Klick auf den Rand des Links: 2 Requests "Lead" (Paar).
· Klick ins E-Mail-Feld: 2 Requests "Contact". Zweiter und dritter Klick: je 2 weitere.
· Klick auf "Formular-Text": 0.
· Klick auf "Absenden": 0 Requests "Contact"; die Seite lädt neu, danach 1 Request
  "__ps_pageview" (eventID 3660437c-f6e5-48c4-835d-d739fa8b7a0a).
EINORDNUNG (CC, 2026-09-25): ÜBERZÄHLUNG — jeder Klick ins Feld zählt eine Conversion (drei
Klicks, drei); UNTERZÄHLUNG — das Abschicken selbst zählt keine. Der Klick auf
"Formular-Text" (0) entspricht dem FORM-Halt aus Entscheidung P12.5-15. Dass die je zwei
Requests "Contact" das Paar aus Beacon und Bestätigung sind (Vermerk P12.5-20, Punkt (5)), ist
nicht geöffnet, nur gezählt.

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
(I6) ist mit der Verdichtung aus dem Abschnitt gestrichen; sein Wortlaut steht in Vermerk
P12.5-20, Punkt (7).

**Vermerk P12.5-20 — ABSCHLUSS DER SCHEIBE 1 (SCHATTEN-KORREKTUR). Bau-Commit `5f1f4bf`**
("fix(generate): Klick auf markiertes Kind loest die Aktion des naechsten Vorfahren aus");
Doku-Commits der Scheibe `8cf167d` (Zuschnitt) und `3efdb43` (Pin-Inventur, Entscheidung
P12.5-19).
(1) GEBAUT (GEMESSEN am Repo, CC, 2026-09-25): In `buildWiringScript` (src/lib/generate.ts) drei
    Einsetzungen — E1, die lokalen Funktionen `hasClickAction` und `actionOwner` hinter der
    `byId`-Schleife; E2 und E3, je ein Aufruf `el = actionOwner(el);` im click- und im
    auxclick-Listener. `LISTENER_SCRIPT` (src/lib/detect.ts) unverändert. Tests in
    src/lib/generate.test.ts, Block "Schatten-Korrektur (Phase 12.5, Scheibe 1)": T1–T7, T7b,
    T10, "T10 BESTAND", T10b; in src/lib/detect.test.ts: T8 mit eigenem Seam.
(2) GATES (CC, 2026-09-25): `tsc --noEmit` exit 0 · `eslint` 0 Fehler, 1 vorbestehende Warnung
    (src/lib/tracking/consent.test.ts) · `vitest run` 98 Dateien, 2292 Tests grün, vorher
    2280 · `next build` exit 0.
(3) MUTATIONEN (CC, 2026-09-25; je volle Suite, Rücknahme per sha256 geprüft), fachlich rot:
    M1 (Rückfall auf das innerste markierte Element) -> T1, T4, T6, T7 · M2 (kein Halt am
    ersten Treffer) -> T5 · M3 (jeder Tabelleneintrag zählt als Aktion) -> NUR T6 · M4 (E3
    entfernt) -> NUR T7 · M5 (Brücke wählt das äussere Element) -> NUR T8 · M6a (FORM-Halt nach
    dem Hochschritt entfernt) -> NUR T10 · M6b (FORM-Halt am Start entfernt) -> NUR T10b. Jede
    Mutation in generate.ts macht zusätzlich die vier Differenz-Nachweise rot (W1', W2', T1,
    T9) — eine KASKADE, nicht als Treffer gezählt; M5 (detect.ts) hat keine. Alle sieben wie
    vorhergesagt, keine blieb grün. Die Suche nach weiteren Pins ohne Kappung fand keinen
    (Achsen und Positivkontrolle: Vermerk P12.5-18).
(4) LIVE-TEST — GEMESSEN, OWNER, LIVE, 2026-09-25, Seite "Schatten Test" (von CC nicht
    prüfbar):
    · Neu veröffentlicht nach dem Deploy; eine Vorher-Kontrolle entfiel, weil die Seite schon
      neu veröffentlicht war. Seitenquelltext: "actionOwner" 3 Treffer.
    · R1 Linksklick Rand: 2 Requests `/api/e`, 204, "Lead". R2 Mittelklick Rand: 2 Requests,
      204. R3 Rechtsklick Rand: 0.
    · F1 Linksklick `<h2>`: 2 Requests, 204, "Lead", Sprung nach `#unten` erfolgt. F2
      Mittelklick `<h2>`: 2 Requests, 204. F3 Rechtsklick `<h2>`: 0.
    · Nachmessung an F1, beide Payloads geöffnet: gleiche eventID
      4946908c-5846-4842-99c6-09bc5f194433. Request 1 trägt `cns` {meta:true}, `_fbp`,
      `eventSourceUrl`, `isCustom`:false. Request 2 trägt `obs` "__ps_browser". R1, R2 und F2
      sind nur gezählt, nicht geöffnet.
    · Editor: Klick auf `<h2>` wählt das `<h2>` (nur "Text bearbeiten"); Klick auf den Rand
      wählt das `<a>`; in der Vorschau bleibt der Rahmen beim Klick auf das `<h2>` stehen.
    · OWNER-ANGABE: Bei Track-Ereignissen waren es schon immer zwei Requests, beim PageView
      einer.
(5) ZWEI REQUESTS JE TRACK-KLICK — KEIN NEUER BEFUND, SONDERN EIN FEHLER DER LIVE-ANLEITUNG.
    Plan und Live-Anleitung der Scheibe (CC, 2026-09-25) erwarteten "genau 1 Request"; das war
    falsch. Das Muster ist beschrieben — GELESEN am Repo, CC, 2026-09-25:
    · Code, src/lib/tracking/meta.ts: `buildCapiBeaconStatement` baut den Beacon mit
      `eventSourceUrl`, `isCustom`, dem Einwilligungsfeld (`CONSENT_WIRE_FIELD` = "cns",
      src/lib/tracking/consent-wire.ts) und `_fbp`; `buildPixelConfirmStatement` baut die
      Bestätigung mit derselben eventID (`eid`), dem echten Ereignisnamen und
      `obs` = `BROWSER_CONFIRM_MARKER` ("__ps_browser", src/lib/analytics/events.ts), ohne
      `value`/`currency`/`_fbp`/`eventSourceUrl`. Gesendet wird sie über `__psConfirm` in
      `buildMetaRuntime` — sofort bei Pixel-Zustand "ok", gepuffert bei "pending", verworfen
      bei "blocked"/"foreign" (`__psPixelResolve`).
    · Doku: docs/immer-beachten.md, "BESTÄTIGUNGEN/CONFIRMS NIE AN META FORWARDEN" — "Das
      Adblock-Bestätigungs-Beacon (source='browser') trägt DIESELBE eventID wie die echte
      Conversion".
    Die an F1 geöffneten Payloads stimmen mit diesen zwei Bauformen überein; einen Widerspruch
    zu Code oder Doku gibt es nicht. ABGELEITET, NICHT GEMESSEN: Bei blockiertem Meta-Pixel
    entsteht die Bestätigung nicht — dann ein Request je Track-Klick.
(6) GRENZEN DER MESSUNG:
    · Das Paar Beacon/Bestätigung ist NUR an F1 geöffnet; dass die je zwei Requests von R1, R2
      und F2 dasselbe Paar sind, ist nicht gezeigt, nur gezählt.
    · Die Vorher-Kontrolle ("actionOwner" 0 Treffer vor dem Neu-Veröffentlichen) entfiel. Das
      ist tragbar: "actionOwner" existierte vor dem Bau-Commit nirgends im Repo — GEMESSEN (CC,
      2026-09-25): `git grep "actionOwner"` auf `5f1f4bf^` 0 Treffer (Positivkontrolle
      `buildWiringScript` auf `5f1f4bf^`: Treffer), auf `5f1f4bf` Treffer in vier Dateien. Ein
      Text ohne die Korrektur kann die Zeichenkette nicht tragen.
    · Die Sprung-Frage aus Vermerk P12.5-9, Punkt (3), ist nur für den NEUEN Text beantwortet
      (F1: Sprung erfolgt); für den alten bleibt sie offen.
    · Welche weiteren Projekte seit dem Bau-Commit neu veröffentlicht sind, ist nicht erhoben.
    WIRKUNG: erst nach erneutem Veröffentlichen — die Serve-Route liefert den gespeicherten
    Text (Vermerk P12.5-9, Punkt (4)); jede nicht neu veröffentlichte Seite trägt weiter den
    Text ohne Korrektur. Heruntergeladene Exporte bleiben unverändert.
(7) VERDICHTUNG DES ZUSCHNITTS (CC, 2026-09-25) — GESTRICHEN, weil mit der Scheibe
    abgelaufen, mit ihrem Inhalt:
    · ZIEL: "Trägt das innerste markierte Element keine Klick-Aktion (`track` oder
      `redirect`), löst ein Klick zur Laufzeit die Aktion des nächsten markierten Vorfahren
      aus, der eine trägt. Die Editor-Auswahl bleibt beim innersten Element — das `<h2>`
      bleibt einzeln bearbeitbar. Die Korrektur liegt allein in `buildWiringScript`
      (src/lib/generate.ts); `LISTENER_SCRIPT` (src/lib/detect.ts) bleibt unverändert." —
      erfüllt, Punkte (1) und (4).
    · (I4) "Eine Seite ohne Laufzeit-Aktion bekommt weiter KEIN Skript." — Bestandsregel, steht
      am Ort der Handlung (`injectScripts` in `generateFunctional`; Test "REINE TEXTSEITE: kein
      Konsument -> KEIN Block, KEIN Script (Zusage unveraendert)" in src/lib/generate.test.ts).
    · (I5) "Ein Klick direkt auf das Element mit Aktion verhält sich wie heute." — relativ zum
      Stand vor der Scheibe; gedeckt durch T2 und die Bestandstests.
    · (I6) "ingest.ts, resolve.ts, proxy.ts, app-serve/route.ts und alles unter src/lib/capi/
      und src/lib/tracking/ bleiben unberührt — auch nicht 'nur schnell'." — Scope-Riegel der
      Scheibe; seine Ausnahme bleibt als Entscheidung P12.5-19 stehen. Eingehalten: Der
      Bau-Commit berührt unter src/lib/tracking/ nur die zwei freigegebenen Testdateien.
    · Aus Entscheidung P12.5-14 die Bau-Anweisungen ("der Test tippt den Wortlaut aus dem
      freigegebenen Plan", "der Kopf des Wächters wird im selben Commit neu gefasst") —
      ausgeführt im Bau-Commit; an ihrer Stelle steht dort jetzt der gebaute Zustand.
    GEBLIEBEN: (I1)–(I3) mit Grund · Entscheidungen P12.5-14, P12.5-15, P12.5-16 (mit einem
    Satz, der über die Scheibe hinaus bindet), P12.5-19 · Vermerke P12.5-13, P12.5-18 · Vorrat
    P12.5-17.

## Scheibe 1b — Formular-Track am Abschicken

**ZIEL** (Entscheidung P12.5-21; Befund: Vorrat P12.5-17): Der Track eines `<form>` zählt beim
Abschicken (Ereignis `submit`), nicht beim Klick; ein Klick innerhalb eines Formulars löst
dessen Aktion nicht mehr aus. Die Formular-Aktion des Betreibers bleibt unberührt. Der Plan
(Stufe 1) ist vorgelegt und am 2026-09-25 freigegeben, mit den Entscheidungen P12.5-23 bis
P12.5-27.

**Entscheidung P12.5-21 — DER FORMULAR-TRACK ZÄHLT BEIM ABSCHICKEN, NICHT BEIM KLICK.** Ein
Klick innerhalb eines Formulars löst dessen Aktion nicht mehr aus. Eigene Scheibe 1b, VOR
Scheibe 2 (Editor-Gerüst, Entscheidung P12.5-7). Die Formular-Aktion des Betreibers bleibt
unberührt. Die Weiterleitung an einem Formular wird nach dem Plan entschieden. VORAB
FREIGEGEBEN nach Entscheidung P12.5-14: Die vier Differenz-Nachweise (W1', W2', T1, T9)
werden um die neuen, benannten Einsetzungen erweitert, je eigene Abschrift (A1); die
Sollwerte bleiben unverändert; der Scope-Riegel wird dafür NUR für
src/lib/tracking/consent-setter.test.ts und src/lib/tracking/custom-pixel.test.ts aufgehoben,
wie in Entscheidung P12.5-19. GRUND: die Messung aus Vorrat P12.5-17 — Überzählung beim
Klick ins Feld, Unterzählung beim Abschicken. Verhältnis zu Entscheidung P12.5-15: dort.
PROVENIENZ: ARCHITEKT, 2026-09-25.

**Vermerk P12.5-22 — AUFKLÄRUNG ZUM PLAN DER SCHEIBE 1b (KEIN BAU, daher kein Bau-Commit: die
Aufklärung war read-only; CC, 2026-09-25, HEAD `e09aab8`).** GEMESSEN am Repo, soweit nicht
anders gekennzeichnet.
(1) EIN `submit`-LISTENER EXISTIERT NUR IN DER EDITOR-BRÜCKE: `LISTENER_SCRIPT`
    (src/lib/detect.ts) ruft im Capture `preventDefault`. Das ausgelieferte Wiring
    (`buildWiringScript`, src/lib/generate.ts) hat keinen. Achse `"submit"` über src/ ohne
    Tests: detect.ts (`BUTTON_SELECTOR`, `LISTENER_SCRIPT`) und zwei `type="submit"` in Seiten
    der App.
(2) WEITERLEITUNG AN EINEM FORMULAR: Das `ActionPanel` (src/components/ActionPanel.tsx) bietet
    jedem Element ausser Text die Slots `redirect` und `track`, also auch einem `<form>`. Der
    Redirect-Zweig im Click-Listener von `buildWiringScript` ruft `preventDefault` und
    navigiert (`location.href` bzw. `window.open`). ABGELEITET, NICHT GEMESSEN: Ein Klick in das
    Eingabefeld eines Formulars MIT Weiterleitung navigiert im Export sofort weg, in der
    Vorschau öffnet er einen Tab.
(3) DIE FUNKTIONALE VORSCHAU TRÄGT KEIN `allow-forms`: `sandbox="allow-scripts allow-popups
    allow-popups-to-escape-sandbox"` am Rahmen "functional-preview" (src/components/
    CodeImporter.tsx). NICHT GELESEN, Kenntnis der HTML-Spezifikation (UNGEPRÜFT): In einem
    solchen Rahmen bricht das Abschicken ab, bevor ein `submit`-Ereignis entsteht — ein Track
    beim Abschicken wäre in der Vorschau nicht vorführbar. Live prüfbar.
(4) TRANSPORT: `buildCapiBeaconStatement` (src/lib/tracking/meta.ts) sendet allein per
    `navigator.sendBeacon`, ohne `fetch`-Rückfall. `buildPixelConfirmStatement` sendet die
    Bestätigung per `sendBeacon` mit `fetch`-`keepalive`-Rückfall, aber nur im Pixel-Zustand
    "ok"; im Zustand "pending" puffert `__psConfirm` (`buildMetaRuntime`) in einer Variablen
    der Seite. ABGELEITET, NICHT GEMESSEN: Lädt die Seite neu, bevor fbevents geladen ist, geht
    die gepufferte Bestätigung verloren, und die Verlustrate zählt das Ereignis als Verlust.
    Dasselbe gilt schon heute für einen Klick mit Weiterleitung.
(5) TESTUMGEBUNG: jsdom 29.1.1 — `requestSubmit` (node_modules/jsdom/lib/jsdom/living/nodes/
    HTMLFormElement-impl.js) prüft die Gültigkeit statisch (`reportValidity` ruft
    `checkValidity`), feuert dann `submit` und meldet danach "not implemented"; eine
    Sandbox-Prüfung gibt es dort nicht. GELESEN am installierten Paket.
(6) SPERRE GEGEN DOPPELTES ABSCHICKEN: keine Vorlage je Element im Bestand; nächstverwandt ist
    das Einmal-Flag `__psFbReady` in `buildMetaRuntime`.

**SCOPE DES BAUS** (ARCHITEKT, Bau-Auftrag 2026-09-25): src/lib/generate.ts,
src/lib/generate.test.ts, src/lib/own-blocks-waechter.test.ts, src/components/ActionPanel.tsx,
dazu nach den Entscheidungen P12.5-19 und P12.5-21 src/lib/tracking/consent-setter.test.ts und
src/lib/tracking/custom-pixel.test.ts. Alles andere unberührt.

**INVARIANTEN** (ARCHITEKT, Plan-Auftrag 2026-09-25, wörtlich):
- (I1) Links und Buttons ausserhalb von Formularen verhalten sich wie nach Scheibe 1; alle
  Tests der Scheibe 1 bleiben grün.
  AUSNAHME (ARCHITEKT, Bau-Auftrag 2026-09-25): "T10 BESTAND" wird durch den Test S2 ersetzt
  (Klick ins Feld ergibt 0) — er hielt das Verhalten fest, das diese Scheibe beendet.
- (I2) Höchstens eine Conversion je Abschicken; keine Conversion durch einen Klick innerhalb
  eines Formulars.
  LESART (CC, 2026-09-25, aus Entscheidung P12.5-25): "keine Conversion durch einen Klick"
  meint die Aktion des FORMULARS. Ein Element im Formular mit EIGENER Aktion (etwa ein Knopf
  mit Track) feuert beim Klick weiter seine eigene.
- (I3) Die Form des Datenblocks und die Typnamen bleiben unverändert; veröffentlichte
  Datenblöcke bleiben gültig.
- (I4) Die Formular-Aktion des Betreibers (Ziel, Methode, Absenden) wird durch einen Track
  nicht verändert — kein preventDefault für einen Track.
- (I5) Eine Seite ohne Laufzeit-Aktion bekommt weiter kein Skript.
- (I6) ingest.ts, resolve.ts, proxy.ts, app-serve/route.ts und der Produktionscode unter
  src/lib/tracking/ und src/lib/capi/ bleiben unberührt. Die Editor-Brücke bleibt unberührt.

PROVENIENZ DER FOLGENDEN FÜNF ENTSCHEIDUNGEN: ARCHITEKT, Bau-Auftrag 2026-09-25, zum Plan der
Scheibe 1b (vorgelegt 2026-09-25, Buchstaben wie im Auftrag).

**Entscheidung P12.5-23 ((R) des Auftrags) — FORMULARE FÜHREN KEINE WEITERLEITUNG MEHR AUS,**
weder beim Klick noch beim Abschicken. Das `ActionPanel` bietet für ein `<form>` keinen
Redirect-Slot mehr an. AUFLAGE: Trägt ein `<form>` bereits eine Weiterleitung, bleibt sie im
`ActionPanel` SICHTBAR mit dem Hinweis, dass sie nicht mehr wirkt, und ist ENTFERNBAR; neu
anlegen geht nicht. (I3) bleibt: das Mapping bleibt gültige Daten. GRUND: Die Weiterleitung
navigiert heute schon beim Klick ins Feld weg (Vermerk P12.5-22, Punkt (2), ABGELEITET); die
Weiterleitung NACH dem Abschicken (R2 des Plans) gehört zu Phase 13 (E-Mail-/ESP-Webhooks),
weil erst dort entschieden wird, was mit den Formulardaten geschieht (Vorrat P12.5-29). R2
bräche zudem (I4): sie verlangt ein `preventDefault` und eine eigene Navigation.

**Entscheidung P12.5-24 ((S) des Auftrags) — EINE CONVERSION JE FORMULAR UND SEITENLEBEN.** Die
Sperre gegen doppeltes Abschicken gilt je Formular, nicht global, und liegt in der
Laufzeit-Closure, nicht als Attribut am Formular. GRUND (Plan): Ein Doppelklick auf
"Absenden" zählt einmal; ein Attribut am Formular fasste einen fremden Knoten an
(docs/immer-beachten.md, "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN
FREMDEN KNOTEN AN"). PREIS: Ein AJAX-Formular, das auf derselben Seite mehrfach legitim
abschickt, zählt einmal.

**Entscheidung P12.5-25 ((9) des Auftrags) — KNOPF MIT EIGENEM TRACK IN EINEM FORMULAR MIT TRACK:
ZWEI CONVERSIONS SIND KONFIGURIERTES VERHALTEN.** Der Klick auf den Knopf feuert dessen
Track, das Abschicken den des Formulars (Test S9 hält es fest). Ein Hinweis in der Oberfläche
ist für das Redesign vorgemerkt (docs/claude-history/backlog-polish.md, Vorrat P12.5-30).

**Entscheidung P12.5-26 ((A) des Auftrags) — src/components/ActionPanel.tsx IST IM SCOPE:** die
Texte "bei Klick" bzw. "beim Abschicken" nach Elementtyp, der Redirect-Slot nach Entscheidung
P12.5-23. GRUND: Die Texte "Feuert bei Klick ein Event", "Läuft bei Klick auf dieses Element"
und "Klick leitet auf eine URL weiter" (`TrackActions`, `RedirectActions`) sind für ein
Formular nach Scheibe 1b falsch.

**Entscheidung P12.5-27 ((D) des Auftrags) — DIE ERGÄNZUNG DER DAUERREGEL "KEIN BAUSTEIN DES
AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN" KOMMT IN DIE ABSCHLUSS-RUNDE
NACH DEM LIVE-TEST, NICHT JETZT.** Anlass: Die Regel führt als gewollt "die zwei
Wiring-Listener an `document`"; mit Scheibe 1b sind es drei (click, auxclick, submit). Der
`submit`-Listener ändert keine der fünf dort geschützten Eigenschaften.

**Vorrat P12.5-28 — DIE BESTÄTIGUNG DES PIXELS KANN BEI EINER NAVIGATION VERLOREN GEHEN; DIE
VERLUSTRATE FIELE DANN ZU HOCH AUS.** ABGELEITET am Code (CC, 2026-09-25), UNGEMESSEN; die
Fundstellen stehen in Vermerk P12.5-22, Punkt (4). Ist das Abschicken die erste Conversion
einer Seite, lädt fbevents erst in diesem Aufruf; `__psConfirm` puffert die Bestätigung im
Zustand "pending", und ein Neuladen verwirft den Puffer. Der Beacon selbst geht per
`sendBeacon` und ist davon nicht betroffen. Gilt ebenso für einen Klick mit Weiterleitung.
TRIGGER: der Live-Test der Scheibe 1b, Variante 3a (frisch geladene Seite, Abschicken als
erste Conversion).

**Vermerk P12.5-31 — BAU DER SCHEIBE 1b, STOPP VOR DEM CODE-COMMIT (CC, 2026-09-25, HEAD
`fcb0969`; Code im Arbeitsbaum, NICHT committet).** GEMESSEN am Repo.
(1) STOPP: Die Mutation M6a (FORM-Halt nach dem Hochschritt in `actionOwner` entfernt) wird
    fachlich NICHT rot; rot werden nur die vier Differenz-Nachweise (Kaskade). Vorab so
    vorhergesagt. Ursache ist eine VERDECKUNG DURCH KOMPOSITION, kein hohler Test: Erreicht
    die Suche ein `<form>` MIT Aktion, gibt `actionOwner` es ohne die Zeile zurück, und E4
    bzw. E5 setzen es auf null; ein `<form>` OHNE Aktion fängt die Start-Prüfung der Schleife
    ab. Die Zeile ist seit E4/E5 im Verhalten redundant. M6b (Start-Prüfung entfernt) wird
    weiter rot (T10b).
(2) E6 IST KEIN FESTER WORTLAUT: Der submit-Listener trägt die Track-Anweisung (`trackAll`),
    deren Text je Konfiguration anders lautet. Die vier Nachweise setzen E6 deshalb zusammen
    — Vorspann und Nachspann getippt, dazwischen der Text aus dem Track-Zweig des
    click-Listeners, einem Teil des alten Textes, den der sha256 nach dem Entfernen abdeckt.
(3) N8 (bestehende Formular-Weiterleitung verschwindet aus dem `ActionPanel`) ist nicht
    gefahren: Eine Testumgebung besteht (Testing Library, src/components/CodeImporter.test.tsx
    rendert das Panel), aber keine Datei im Scope kann den Test aufnehmen. Ohne
    Scope-Erweiterung geht die Auflage an den Live-Test.
(4) NICHT DETERMINISTISCH, NICHT VON DER MUTATION: Unter M2 fiel einmal
    src/lib/detect.test.ts, "verkraftet riesigen Input (~hunderttausende Knoten) ohne Crash";
    allein und im zweiten vollen Lauf unter M2 grün. `detect.ts` war nicht mutiert, und
    `detectElements` ruft `generate.ts` nicht. Vorgemerkt: docs/claude-history/backlog-polish.md,
    Vorrat P12.5-35.
(5) DIE BEZEICHNER DES EINGESETZTEN TRACK-TEXTES (`trackAll` in `buildWiringScript`) IM
    SUBMIT-LISTENER — je Konfiguration (GELESEN am Repo, CC, 2026-09-25). `trackAll` setzt
    zwei Anweisungen zusammen:
    · `metaTrackStatement` (src/lib/tracking/meta.ts), drei erreichbare Formen:
      ohne Pixel, ohne Laufzeit -> `console.warn(… + ((a.config && a.config.event) || ""))`,
      liest `console`, `a`; ohne Pixel, mit Laufzeit (Beacon) -> dieselbe Warnung plus
      `__psMetaFire(a.config);`, liest zusätzlich `__psMetaFire`; mit Pixel ->
      `__psMetaFire(a.config);`. Pixel ohne Laufzeit entsteht nicht: `buildMetaRuntime`
      liefert mit gesetzter Pixel-ID immer eine Laufzeit.
    · `customTrackStatement` (src/lib/tracking/custom-pixel.ts): ohne Ereigniszeile "";
      Ereigniszeile ohne Basis-Code -> `__psCustomFire(a.config && a.config.code);`;
      Ereigniszeile mit Basis-Code -> zusätzlich vorweg `__psCustomRun();`.
    Die Einwilligung ändert den Text von `trackAll` nicht; sie wirkt in `__psMetaFire` bzw.
    `__psCustomOk`. BEZEICHNER GESAMT: `a`, `console`, `__psMetaFire`, `__psCustomRun`,
    `__psCustomFire`. `a` deklariert der Submit-Listener selbst (`var a = actions[j];`).
    `__psMetaFire` (`buildMetaRuntime`), `__psCustomRun` und `__psCustomFire`
    (`buildCustomPixelRuntime`) sind Funktionsdeklarationen im Rumpf der IIFE (eingesetzt
    hinter `var MODE`) und damit in jedem ihrer Listener sichtbar; `console` ist global. KEIN
    Bezeichner, der nur im Klick-Listener existiert (`el`, `t`, `e` des Klicks, `redirect`,
    `url`) — kein Befund.
    TESTS JE PFAD: Meta mit Pixel — S1; Meta ohne Pixel mit Beacon — S11 (Positivkontrolle);
    Meta ohne Pixel ohne Laufzeit + Ereigniszeile — S12a; Ereigniszeile mit Basis-Code —
    S12b. MUTATION N9 (`a` im Submit-Listener umbenannt): fachlich rot S1, S2, S3, S4, S6, S7,
    S9, S11 (Positivkontrolle), S12a, S12b; Kaskade auf die vier Differenz-Nachweise.
(6) MESSUNG M6a + N2 (beide zugleich, volle Suite, Rücknahme per sha256 geprüft): fachlich rot
    S2, S3, S8 (die Menge von N2 allein) und DAZU T10 und "Regression Scheibe 1: Klick auf
    'Formular-Text' im Formular mit Track -> 0"; Kaskade auf die vier Differenz-Nachweise. Die
    zwei zusätzlichen Tests werden NUR in der Kombination rot — die Zeile trägt den FORM-Halt
    doppelt mit E4/E5.
(7) TESTZAHL nach S12a/S12b: 2306 (vorher 2304).

**Entscheidungen P12.5-32 bis P12.5-34 — ZUM STOPP IM BAU DER SCHEIBE 1b (ARCHITEKT,
2026-09-25):**
- **P12.5-32:** M6a, Option (a) — der FORM-Halt nach dem Hochschritt in `actionOwner` bleibt als
  doppelte Absicherung neben E4/E5. Eine Mutation dieser Zeile ist nur zusammen mit N2
  aussagekräftig (Vermerk P12.5-31, Punkt (6)).
- **P12.5-33:** N8 — die Auflage aus Entscheidung P12.5-23 (eine bestehende
  Formular-Weiterleitung bleibt im `ActionPanel` sichtbar und entfernbar) geht an den
  Live-Test; kein Scope-Ausbau für einen Test.
- **P12.5-34:** Vermerk P12.5-31 wird committet, der Code bleibt bis zur Freigabe im
  Arbeitsbaum.

**Vorrat P12.5-29 — WEITERLEITUNG NACH DEM ABSCHICKEN (R2 des Plans der Scheibe 1b).** Nach
Entscheidung P12.5-23 führt ein Formular keine Weiterleitung aus; eine Weiterleitung NACH dem
Abschicken verlangt ein `preventDefault` und eine eigene Navigation und bräche damit (I4) der
Scheibe 1b. TRIGGER: der Zuschnitt der Phase 13 (E-Mail-/ESP-Webhooks).

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
Abschnitt "Aus Phase 12.5 vorgemerkt (2026-09-25) — drei Befunde der ersten Aufklärung"):
P12.5-10, P12.5-11, P12.5-12; Abschnitt "Aus Phase 12.5 vorgemerkt (2026-09-25) — Scheibe 1b,
ein Oberflächen-Hinweis": P12.5-30; Abschnitt "Aus Phase 12.5 vorgemerkt (2026-09-25) —
Scheibe 1b, ein flackernder Test": P12.5-35.

## Nächster Schritt der Phase 12.5

Scheibe 1 ist abgeschlossen (Vermerk P12.5-20), der Formular-Befund gemessen (Vorrat
P12.5-17). Danach, in dieser Reihenfolge:
(1) Scheibe 1b — Formular-Track am Abschicken (Entscheidung P12.5-21): der Plan ist
    freigegeben (Entscheidungen P12.5-23 bis P12.5-27); Bau, Live-Test.
(2) Danach Scheibe 2, das Editor-Gerüst (Entscheidung P12.5-7).
Diese Datei entwirft keine von beiden.
