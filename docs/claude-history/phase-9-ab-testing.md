# Phase 9 — A/B-Testing (ausgelagerte Historie)

Volle Herleitung, Entscheidungen, Tests und Live-Verifikation der GEBAUTEN Phase-9-Arbeit,
aus der Root-CLAUDE.md ausgelagert. Umfang (chronologisch): Scheibe 9a (Varianten-Authoring),
9b-1 (Split in der Serve-Route + Cookie + Aktivierungs-Flag), 9b-1p (UI-Politur), 9b-2
(variant in Ingest und Persist), 9c-1 (Auswertung je Variante) und 9c-2 (Lauf-Abgrenzung) —
alle SECHS ABGESCHLOSSEN und live bewiesen (2026-07-27 bis 2026-07-29). Diese Datei wurde am
2026-07-30 hierher ausgelagert.

Der aktive Ist-Stand (Migrationsstand, events-Schema, ab_test_active/ab_test_started_at,
RPC get_variant_counts) steht WEITERHIN in der Root unter "## Aktueller
DB-/Analytics-Stand" bzw. "## Offene Punkte"; acht dauerhafte Regeln aus dieser Phase wurden
VOR der Auslagerung generalisiert in die Root gehoben — sechs unter "## Immer beachten"
(Mutationsproben/Live-Test-Instrumente, Darstellungs-Ehrlichkeit bei Vergleichszahlen ohne
Signifikanzrechnung, Host-only-Cookies auf Wildcard-Domains, Set-Cookie-vs-Cache,
serverseitig gelesene Cookie-Werte als client-kontrollierte Eingabe, Anlegen und Befüllen
additiver Spalten getrennt halten) und zwei unter "## Offene Punkte" (Cookie-Doku-Schnipsel
für die Kunden-Datenschutzerklärung, Ergänzung am Datenklassen-Grenze-Eintrag) — und werden
HIER NICHT wiederholt. Diese Datei trägt die BEGRÜNDUNG dazu, nicht den aktuellen Zustand.

Zwei Abschnitte am Ende dieser Datei sind KEINE A/B-Arbeit, reisen aber bewusst mit: die
Fix-Scheibe safeAction (Client-Fehlerbehandlung) und der Leere-Variante-Riegel (Publish
verweigert leeren Inhalt) hängen an Code bzw. Datenmodell dieser Phase (Editor-Aufrufe der
Varianten-Sektion bzw. das Variante-B-Publish) und hatten keine eigene History-Datei, in die
sie sonst gehört hätten.

## Aktiver Stand — Phase 9 (A/B-Testing)
Zwei Varianten je Projekt, hälftiger Split, stabile Zuordnung pro Besuch. Bewusst MINIMAL:
keine Gewichtung, keine Signifikanzrechnung, keine Multi-Varianten. Die future-roadmap hält
fest, dass der Seiten-Level-Split mit zwei published-Blobs funktioniert und die
JSON-Sektions-Architektur (Spur B) NICHT braucht — das ist der Schnitt.

### Grundsatzentscheidungen (heute entschieden, Bau in 9b/9c)
- STICKINESS = FIRST-PARTY SESSION-COOKIE auf der Serving-Domain, Wert ausschliesslich
  'a' oder 'b' — KEINE ID, kein Zeitstempel, kein Profil. AUSGESCHLOSSEN: localStorage/
  sessionStorage (fallen rechtlich unter dieselbe TTDSG-§25-Logik UND sind client-seitig,
  also ZU SPÄT für einen Server-Split — das HTML ist längst raus); IP/UA-Hash (zöge die
  30-Tage-Retentionspflicht herein, s. Manifest Tier 2, und wäre bei mobilen IPs instabil).
  EHRLICHE EINORDNUNG (KEINE Rechtsberatung): die Einstufung als "unbedingt erforderlich"
  (TTDSG §25(2) Nr. 2) ist für ein reines Varianten-Cookie vertretbar — der Nutzer hat DIESE
  Seite angefordert, das Cookie liefert sie nur konsistent —, aber NICHT risikofrei:
  Aufsichtsbehörden können A/B-Tests als Betreiber-Optimierung werten, dann wäre Einwilligung
  nötig, was das Feature bricht (der Split muss VOR dem ersten Rendern fallen). Vor dem
  öffentlichen Launch anwaltlich klären. PRODUKTPFLICHT: Pagesmith stellt dem Kunden einen
  fertigen Doku-Schnipsel (Cookie-Name, Zweck, Lebensdauer) für dessen Datenschutzerklärung
  bereit.
- SPLIT LIEGT KOMPLETT IN DER SERVE-ROUTE (KORRIGIERT 2026-07-27, die frühere
  Fassung sah eine Middleware-Zuweisung per Header vor — sie ist am Code und an
  einer Messung widerlegt): Die Serve-Route hat ALLES, was der Split braucht: das
  Cookie steht im Request (sie liest bereits request.headers), das Projekt lädt
  sie ohnehin, und das Response-Objekt gehört ihr (new Response mit eigenem
  Header-Objekt) -> Set-Cookie und Cache-Control sind dort ohne Umbau setzbar.
  Der Split ist bei uns KEIN Routing-Problem: beide Varianten kommen aus DEMSELBEN
  published_content DERSELBEN Route. Die Middleware bleibt UNBERÜHRT.
  DER EINZIGE GRUND, der für die Middleware gesprochen hätte, war die Frage, ob
  die Route bei CDN-Cache-Hits übersprungen wird — GEMESSEN und ausgeschlossen
  (s. nächstes Bullet). Ein Würfelwurf in der Middleware liefe zudem für JEDES
  Projekt, auch für die grosse Mehrheit ohne Test.
- CACHING-GATE: BESTANDEN (GEMESSEN 2026-07-27, curl gegen eine veröffentlichte
  Seite, drei Aufrufe inkl. einem nach 60s Pause): Cache-Control: public,
  max-age=0, must-revalidate · Age: 0 · X-Vercel-Cache: MISS bei ALLEN Aufrufen ·
  x-vercel-id ändert sich jedes Mal. Die Serve-Route läuft bei JEDEM
  Besucher-Request, das CDN fängt nichts ab. Am Code passt das zusammen:
  app-serve/route.ts trägt export const dynamic = "force-dynamic" und setzt heute
  KEINEN eigenen Cache-Control-Header.
  TROTZDEM SETZT 9b BEI AKTIVEM TEST "Cache-Control: private, no-store" — und der
  Grund ist NICHT primär das Vercel-CDN, sondern das Cookie: die heutige Antwort
  ist als "public" ausgewiesen, und eine als public markierte Antwort MIT
  Set-Cookie ist die klassische Konstellation, in der ein geteilter Zwischen-Cache
  Antwort samt Cookie speichert und mehreren Besuchern DENSELBEN Bucket gibt.
  must-revalidate verhindert das praktisch; "private, no-store" macht es
  strukturell unmöglich. NUR bei aktivem Test — Projekte ohne Test behalten ihre
  heutigen Header unverändert (Invariante: kein Verhaltenswechsel für Bestand).
  OFFENER MESSPUNKT für den 9b-1-Live-Test: dieselbe Header-Trias
  (x-vercel-cache / age / cache-control) einmal MIT gesetztem Cookie prüfen — es
  gibt heute keine Serving-Antwort mit Set-Cookie, also keinen Präzedenzfall.
- VARIANTE IN DER ANALYTIK = EIGENE additive, NULLABLE Spalte auf events. NIEMALS in source
  (source = Beobachtungs-ORT, s. "## Immer beachten"). Der SERVER liest die Variante aus dem
  mitgesendeten First-Party-Cookie (der Beacon geht auf dieselbe Domain) -> kein client-freies
  Feld, gleiche Achsen-Hygiene wie bei source. Export-Download auf fremder Domain: kein Cookie
  -> variant bleibt NULL (bekannter, bereits dokumentierter schwächerer Fall). Die Spalte gilt
  AUCH für __ps_pageview-Zeilen -> 9c bekommt Nenner (Besucher je Variante) und Zähler
  (Conversions je Variante) aus derselben Tabelle. ORDERING: die Spalte kommt MIT dem Split
  (9b), NICHT danach — sonst entstehen während der ersten Testphase Events ohne Zuordnung
  (vermeidbarer Bestandsdaten-Skew, Lektion aus Scheibe B).

### Scheibe 9a — Varianten-Authoring (KEIN Split) — ABGESCHLOSSEN, deployt, Migration 0016 gelaufen (html_b/mappings_b + CHECK projects_variant_b_pair), live bewiesen.
- ZWECK: ein Projekt kann eine zweite Variante tragen, bearbeiten und veröffentlichen. Die
  Live-URL liefert weiterhin AUSSCHLIESSLICH A. Ohne zweiten Inhalt gibt es nichts zu splitten.
- AUTHORING-ENTSCHEIDUNG (bewusstes Duplikat statt verfrühter Abstraktion): zweites Slot-Paar
  ADDITIV auf der Projektzeile — html_b, mappings_b, beide NULLABLE. BEGRÜNDUNG: echte Varianten
  brauchen zwei (html, mappings)-Paare, weil Mappings an den data-pagesmith-id-Element-IDs des
  JEWEILIGEN HTML hängen. Die saubere Lösung wäre die pages-Tabelle ("Projekt = N Seiten"), die
  laut future-roadmap strikt NACH Spur B kommt. Bei EXAKT ZWEI Fällen ist ein benanntes Duplikat
  billiger und ehrlicher als eine Abstraktion auf Verdacht (gleiches Muster wie der permanente
  /api/capi-Alias: benannte Ausnahme statt Umbau). BEI EINEM DRITTEN FALL wird dieses Modell
  durch die pages-Tabelle ERSETZT, nicht erweitert.
- VERWORFEN: (a) Variante B ohne Click&Connect (fertiges HTML einfügen) — bricht das
  Kernversprechen, B wäre "tot"; (b) A einfrieren und den Editor-Zustand als B nehmen —
  mentales Modell unklar ("welche bearbeite ich gerade?").
- PUBLISHED-SEITE (Empfehlung, Stufe-1-Gate): published_content ist SERVER-geschrieben (NICHT
  client-autoritativ wie settings) -> Variante B als zusätzlicher KEY im bestehenden jsonb statt
  als neue Spalte. Additiv, kein Migrationsbedarf auf der Publish-Seite, EIN atomarer
  Publish-Write.
  FALLE (dieselbe Klasse wie der trackingKey-in-settings-Bug): ersetzt publishProject
  published_content GANZHEITLICH, löscht ein Publish von A die veröffentlichte Variante B
  STILL — kein Fehler, die Live-Seite läuft weiter, nur B ist weg. Stufe 1 MUSS am echten Code
  belegen, WIE published_content geschrieben wird, und den Erhalt beider Keys als Invariante
  ausweisen.
- AKTIVIERUNG (Prinzip jetzt, Bau erst 9b): "Test läuft" wird NICHT aus der blossen Existenz
  von html_b abgeleitet — sonst wäre "Test stoppen" nur durch LÖSCHEN von B möglich
  (Datenverlust als Bedienschritt). 9b bekommt ein explizites, additives Flag. In 9a wird
  NICHTS aktiviert.
- SERVE-PFAD UNBERÜHRT: die Serve-Route liest weiterhin den A-Key. Ohne aktiven Test liefert
  ein Projekt IMMER A — fail-safe by default, auch wenn B existiert.
- EDITOR: ein A/B-Umschalter; der Editor arbeitet immer auf GENAU EINER Variante. ABLEITEN
  STATT LÖSCHEN gilt doppelt: (i) der Umschalter ist projekt-abgeleiteter View-State und wird
  beim Projektladen am kanonischen Chokepoint aus dem GELADENEN Projekt abgeleitet, nicht nur
  zurückgesetzt; (ii) beim Umschalten müssen ALLE aus html/mappings abgeleiteten Zustände
  (erkannte Elemente, Mapping-Anzeige, Orphan-/Weg-C-Netz, dirty-Tracking) auf die aktive
  Variante NEU abgeleitet werden. Ein stehengebliebener A-Zustand über B-HTML zeigt Mappings
  auf Element-IDs, die es dort nicht gibt.
- INVARIANTEN: (i) Projekte OHNE B verhalten sich byte-gleich wie heute (Serve, Publish,
  Export, Tracking, Statistik); (ii) ein Publish von A zerstört B nicht und umgekehrt;
  (iii) trackingKey und PageView-Emitter-Injektion gelten pro PROJEKT, nicht pro Variante —
  beide Varianten tragen denselben Key; (iv) KEIN Split, KEINE Cookie-Logik, KEINE
  events-Änderung in 9a.
- STUFE-1-GATES (am echten Code zu klären, VOR dem Plan): (1) wie schreibt publishProject
  published_content — ganzheitlich oder feldweise? (2) welche Stellen im CodeImporter leiten
  Zustand aus html/mappings ab — vollständige Liste, damit der Umschalter keine vergisst;
  (3) was exportiert "Projekt exportieren" bei zwei Varianten? ENTSCHEIDUNG: die im Editor
  AKTIVE Variante, im UI explizit benannt.
- DEMOBAR / LIVE-TEST: (a) Projekt mit Variante B anlegen, B eigenes HTML + eigenes Mapping
  geben, publishen -> published_content trägt BEIDE Keys (SQL-Gegenprobe); (b) die Live-URL
  zeigt weiterhin A; (c) Umschalten A<->B im Editor zeigt jeweils die richtigen Elemente und
  Mappings, kein Orphan-Rauschen; (d) REGRESSIONSPROBE: ein Projekt OHNE B verhält sich
  unverändert (publishen, serven, Conversion tracken).
- VERIFIZIERT (live, 2026-07-27):
  - REGRESSION / INVARIANTE (i) (GEMESSEN, zuerst geprüft): Bestandsprojekt OHNE B ->
    speichern, publishen, Live-URL, Conversion — alles unverändert; Toolbar ohne
    Umschalter. SQL-Key-Set von published_content exakt {html,mappings,publishedAt,settings}
    -> kein Schema-Drift.
  - PUBLISH MIT B (GEMESSEN): alle sechs Prüffelder true — hat_b, hat_b_mappings, pc_hat_a,
    pc_hat_b, emitter_a, emitter_b. Damit belegt: variantB liegt als ADDITIVER
    Geschwister-Key im jsonb (Invariante iii), der PageView-Emitter steckt in BEIDEN
    Varianten (Invariante iv — sonst verschwänden B's PageViews still, sobald 9b splittet),
    und die Live-URL zeigt trotzdem A (Invariante vi, fail-safe by default).
  - EXPORT (GEMESSEN): Button schaltet dynamisch auf "Variante B exportieren" und liefert
    B's Inhalt — der Wurzeltausch schlägt bis in den Export durch, weil dieser aus
    debouncedCode baut.
  - ENTFERNEN + RIEGEL (GEMESSEN): B entfernen bei AKTIVER Variante B -> der Editor fällt
    sofort auf A zurück (nicht auf leer). SQL: hat_b=false, hat_b_mappings=false (Gleichlauf,
    CHECK), pc_hat_a=true, pc_hat_b=false, emitter_a=true, emitter_b=NULL. A unangetastet.
  - KEINE KONTAMINATION (GEMESSEN, SQL): beide Varianten tragen ihren Text-Override im
    richtigen Slot — mappings trägt A's Wortlaut, mappings_b B's, beide am SELBEN
    Element-Anker. Invariante (ii) unter echtem Traffic bestätigt.
  - DIRTY-GUARD (GEMESSEN, nebenbei): eine unbestätigte A-Änderung wurde beim Umschalten
    korrekt verworfen — der B4-Guard hält live.
- NACHTRAG — LIVE GEFUNDENER BUG UND FIX (2026-07-27, stale Edit-Canvas):
  SYMPTOM: nach einem Variantenwechsel zeigte das Live-Preview im Modus "Editieren" weiter
  die ZULETZT BEARBEITETE Variante (in beide Richtungen); Vorschau, Export, Publish und
  Serve waren korrekt.
  URSACHE (zwei Schichten): (1) srcDoc ist ein STRING — React schreibt das Attribut nur bei
  WERT-Änderung; (2) createVariantB kopiert byte-genau und eine reine Text-Änderung lässt
  den Code unangetastet -> A und B tragen denselben HTML-String. Zusätzlich gibt
  editPreviewHtml bei fehlendem Text-Override previewHtml BYTE-IDENTISCH zurück
  (Kurzschluss) — das Ergebnis hängt dann gar nicht am mappings-Inhalt. Folge: kein Reload,
  und im Canvas überlebte der per PS_SET_TEXT imperativ gepatchte DOM.
  FIX (zwei Teile, die NUR ZUSAMMEN wirken): activeVariant als Memo-Dep (der Memo LÄUFT) +
  ein Varianten-Marker als String-Anhängung am Ende des edit-srcDoc (es kommt ein ANDERER
  String heraus). Der Marker sitzt im edit-Wrapper und NICHT in generateFunctional, sonst
  geriete er in Export- und Publish-Artefakte; ein Artefakt-Test nagelt das fest (mit
  Positiv-Gegenprobe, sonst prüfte er die Abwesenheit eines nie erzeugten Strings).
  mappings bleibt bewusst KEINE Dep — das ist die Phase-5-Wurzel-Entkopplung (kein
  Reload-Sprung beim Tippen).
  ZWISCHENSTAND, DER NICHT GEREICHT HÄTTE (wichtig für später): der erste Fix hatte NUR die
  Dep. Er hätte den Bug INTERMITTENT gemacht — behoben, wenn die Varianten beim Umschalten
  schon divergierten (nach Seiten-Reload), weiter kaputt, wenn die Divergenz erst DANACH
  durch Editieren entstand. Gefunden durch einen Reproduktionstest, der die SEQUENZ statt
  nur die Datenlage abbildet.
  VERIFIZIERT (live, 2026-07-27): Umschalten zeigt in BEIDEN Richtungen sofort die richtige
  Variante, ohne Umweg über die Vorschau; auch am frisch kopierten Projekt ohne jeden
  Text-Override (der Startzustand, der den Bug auslöste). Die Phase-5-Eigenschaft hält:
  Text ändern + übernehmen erzeugt KEINEN Reload-Sprung. Der Marker taucht im Export NICHT
  auf.
- STAND: 9b ist KOMPLETT — 9b-1 (Split + Cookie), 9b-1p (UI-Politur) und 9b-2 (variant in
  Ingest und Persist), alle live bewiesen. -> 9c (Auswertung je Variante) ist mit 9c-1 und
  9c-2 seit 2026-07-29 EBENFALLS komplett; damit ist die Phase abgeschlossen.

### Scheibe 9b-1 — Split + Cookie + Aktivierung (ABGESCHLOSSEN — live bewiesen (2026-07-27), Migration 0017 gelaufen)
Erste Hälfte von 9b: die Live-URL liefert erstmals BEIDE Varianten. Die
Varianten-Dimension in events (Schreibpfad) ist ausdrücklich 9b-2. Grund für den
Schnitt: 9b berührt ZWEI Kern-Pfade (Serve und Ingest) — beide in einer Scheibe
anzufassen ist mehr Risiko als nötig.

- MIGRATION 0017 (BEIDE Spalten auf einmal, damit es keinen zweiten
  Migrationsschritt gibt — die events-Spalte wird aber erst in 9b-2 beschrieben):
  - projects.ab_test_active boolean NOT NULL DEFAULT false. EIGENE SPALTE, NICHT
    in settings: settings ist CLIENT-autoritativ und wird von saveProject
    GANZHEITLICH ersetzt (2b-0-Lektion) — ein server-relevanter Schalter dort
    stürbe beim nächsten Client-Save.
  - CHECK projects_ab_test_needs_variant_b:
    check (not ab_test_active or html_b is not null)
    "Der Test kann nur aktiv sein, wenn B existiert." STRUKTURELL statt per
    Konvention: vergisst removeVariantB das Flag, schlägt die DB LAUT fehl statt
    still einen Test laufen zu lassen, dessen Variante es nicht mehr gibt.
    Gleiche Denkfigur wie projects_variant_b_pair.
  - events.variant text NULLABLE + CHECK (variant is null or variant in ('a','b')).
    Additiv, KEIN Backfill, KEIN Index (nirgends gematcht; 9c aggregiert über
    project_id). Wird in 9b-1 NICHT geschrieben — die Spalte kommt mit, damit 9b-2
    keine zweite Migration braucht.
- BUCKET-ZUWEISUNG: Cookie vorhanden und gültig -> dieser Bucket. Sonst
  Münzwurf (hälftig), Ergebnis per Set-Cookie festhalten. KEINE Identität, kein
  Hash, kein Zeitstempel — nur 'a' oder 'b'.
- COOKIE-ATTRIBUTE (die Host-Frage ist die kritische):
  - HOST-ONLY: das Domain-Attribut wird NICHT gesetzt. Mit Domain=.publayer.net
    gälte das Cookie für ALLE Kundenprojekte auf der Wildcard — ein Besucher, der
    bei Projekt X in Bucket B landet, bekäme bei Projekt Y ebenfalls B. Das wäre
    stille Cross-Tenant-Kopplung der Messung, und wegen der Wildcard-Subdomains
    der Normalfall, nicht der Sonderfall. Host-only heisst: ein Projekt, ein Host,
    saubere Isolation.
  - HttpOnly: der Client braucht den Wert nie — das Cookie fährt beim /api/e-Beacon
    automatisch mit (first-party, gleicher Host). Kein Grund, es JS zugänglich zu
    machen.
  - Secure, SameSite=Lax (die Ad-Klick-Navigation ist top-level -> Lax reicht),
    Path=/, KEIN Max-Age (Session-Cookie, s. Grundsatzentscheidung).
  - Name namespaced nach bestehendem Muster (__ps_*).
- FALLE — "AKTIV" HEISST NICHT "VERÖFFENTLICHT" (am Datenmodell hergeleitet): Der
  CHECK garantiert, dass B als ENTWURF existiert (html_b), NICHT dass B
  VERÖFFENTLICHT ist. Wer B anlegt und den Test aktiviert, OHNE neu zu publishen,
  hat ab_test_active = true, aber KEINEN variantB-Key in published_content — die
  Serve-Route würfelte Besucher in einen Bucket, der ins Leere greift. ZWEI
  Massnahmen, bewusst beide:
  (1) Die Aktivierungs-Action verweigert mit klarer Meldung, wenn published_content
      keinen variantB-Key trägt ("Variante B ist noch nicht veröffentlicht — erst
      veröffentlichen, dann den Test starten").
  (2) Die Serve-Route fällt trotzdem auf A zurück, wenn der Bucket B ist und kein
      variantB-Key existiert. Defense-in-Depth: die Route trifft nie eine Annahme
      über den Publish-Zustand.
- KILL-SWITCH HAT VORRANG: ein gesperrtes Projekt liefert 451 — kein Split, kein
  Cookie, keine Variantenwahl. Der blocked-Check bleibt VOR jeder Varianten-Logik.
- DEAKTIVIEREN: das Flag ist die AUTORITÄT, nicht das Cookie. Ist der Test aus,
  liefert die Route IMMER A — auch wenn im Browser noch ein Cookie aus einem
  früheren Test liegt. Fail-safe by default, gleiche Logik wie in 9a.
- UI: ein Schalter in der bestehenden Varianten-Sektion (Test starten / Test
  stoppen), sichtbar nur wenn B existiert. Der Zustand wird aus dem GELADENEN
  Projekt ABGELEITET (ab_test_active), nicht lokal gehalten — "ABLEITEN STATT
  LÖSCHEN". Klartext dazu: "Test stoppen" löscht NICHTS (das ist "Variante B
  entfernen"), es schaltet nur den Split ab.
- INVARIANTEN: (i) Projekte OHNE aktiven Test verhalten sich byte-gleich wie heute
  (gleiche Antwort, gleiche Header, kein Cookie); (ii) der Kill-Switch bleibt
  vorrangig und unverändert; (iii) Middleware, Ingest, events, CAPI-Pfad und
  Publish-Pfad werden NICHT angefasst; (iv) das Cookie ist host-only und trägt
  ausschliesslich 'a' oder 'b'; (v) ohne veröffentlichte Variante B liefert die
  Route A.
- DEMOBAR / LIVE-TEST: (a) REGRESSION zuerst — Projekt ohne Test: Antwort und
  Header unverändert, KEIN Set-Cookie; (b) Test starten, Seite in einem frischen
  Inkognito-Fenster laden -> Variante notieren, Cookie im DevTools prüfen
  (host-only, HttpOnly, Secure, Session); (c) Reload -> DIESELBE Variante
  (Stickiness); (d) zweites Inkognito-Fenster -> über mehrere Fenster hinweg
  tauchen BEIDE Varianten auf; (e) Header-Probe mit gesetztem Cookie
  (x-vercel-cache / age / cache-control — der offene Messpunkt aus den
  Grundsatzentscheidungen); (f) Test stoppen -> alle Aufrufe liefern wieder A,
  auch mit altem Cookie im Browser; (g) Kill-Switch-Gegenprobe: gesperrtes Projekt
  -> 451, kein Cookie.
- VERIFIZIERT (live, 2026-07-27):
  - REGRESSION / INVARIANTE (i) (GEMESSEN, zuerst geprüft): Live-Seite ohne aktiven Test
    liefert die Bestands-Header (public, max-age=0, must-revalidate) und KEIN Set-Cookie.
  - RIEGEL (GEMESSEN): Aktivierung bei nicht veröffentlichter Variante B wird verweigert,
    es wird nichts geschrieben.
  - COOKIE-ATTRIBUTE (GEMESSEN, DevTools): __Host-ps_v ist host-only, HttpOnly, Secure,
    SameSite=Lax, Session — kein Domain, kein Max-Age.
  - CACHE-HEADER BEI AKTIVEM SPLIT (GEMESSEN): mit Cookie liefert die Antwort exakt
    "Cache-Control: private, no-store". Der offene Messpunkt aus den
    Grundsatzentscheidungen ist damit positiv beschieden.
  - STICKINESS (GEMESSEN): derselbe Besucher bleibt stabil auf seiner Variante.
  - FLAG SCHLÄGT COOKIE (GEMESSEN, Invariante iii): bei inaktivem Test liefert die Route
    ausnahmslos A — auch mit vorhandenem b-Cookie im Browser.
  - KILL-SWITCH (GEMESSEN, Invariante ii): gesperrtes Projekt mit aktivem Test -> 451,
    KEIN Set-Cookie; nach Entsperren wieder 200.
  - VORBEDINGUNG FÜR 9b-2 (GEMESSEN, nicht angenommen): das HttpOnly-Cookie __Host-ps_v
    fährt beim /api/e-Beacon im Request-Header MIT (DevTools -> Network -> /api/e). Der
    Ingest kann die Variante damit server-seitig aus dem Cookie lesen; 9b-2 braucht dafür
    keinen Ersatzweg.
- SCHEIBE 9b-1p — UI-POLITUR (ABGESCHLOSSEN — live bewiesen 2026-07-27):
  (1) FEHLER-KANAL DER VARIANTEN-SEKTION IST DER FALSCHE (am Code erhoben):
      handleToggleAbTest, handleCreateVariantB und handleRemoveVariantB schreiben
      in den ZENTRALEN saveError/saveStatus-Kanal, der an genau EINER Stelle
      gerendert wird — in der Kopfzeile der Live-Preview-Zone, neben dem
      Speichern-Button, mit "truncate". Der Schalter steht aber im
      Einstellungs-Panel: die Meldung erscheint weit entfernt vom geklickten
      Button UND wird dort abgeschnitten (nur per title-Tooltip lesbar).
      ENTSCHEIDUNG: eigener lokaler State für die Varianten-Sektion nach dem
      ETABLIERTEN Muster (<state>Error + <state>Status wie capiTokenError /
      publishError; 6 von 8 Sektionen machen es bereits so — die beiden
      Ausreisser sind genau diese 9a/9b-1-Handler). Gerendert direkt in der
      Varianten-Sektion, OHNE truncate.
      saveError bleibt UNANGETASTET: es hat neun Schreiber, darunter Speichern,
      Projektwechsel, Löschen und Umbenennen — ein Umhängen wäre invasiv, ein
      eigener State ist additiv.
  (2) FEHLENDE INFORMATION "IST VARIANTE B VERÖFFENTLICHT?" (KEIN
      Button-State-Bug — am Code bestätigt): der Publish-Indikator speist sich
      aus settings.hosting.label und ist PROJEKTWEIT; er ist inhaltlich korrekt
      und beantwortet nur eine andere Frage als der Riegel. Es fehlt eine
      Information, kein Zustand.
      DATENWEG — ENTSCHIEDEN: eine eigene kleine Read-Action nach dem
      getEventCounts-Muster (Session-Check -> Query -> {data,error} -> sicherer
      Leer-Wert). Sie liest published_content SERVERSEITIG und gibt nur ein
      Boolean zurück; das Urteil fällt DORT das geteilte Prädikat
      deliverableVariantB (variant.ts) — dasselbe wie im Serve-Pfad und in
      setAbTestActive, KEIN drittes Urteil.
      VERWORFEN, mit Grund: (a) JSON-Pfad-Selektion im loadProject-Select — es
      gibt im ganzen Projekt keinen PostgREST-Präzedenzfall dafür, und ein
      published_content->variantB->>html zöge das KOMPLETTE B-HTML in den
      Ladepfad (schlimmer als der Blob-Verzicht, den die Randbedingung schützt);
      zudem wanderte das Auslieferbarkeits-Urteil in den Client. (c) Rückgabe
      aus publishProject als ALLEINIGE Quelle — bricht bei Reload und
      Projektwechsel ("ABLEITEN STATT LÖSCHEN"). (d) abgeleitete Spalte beim
      Publish — zweiter Wahrheitsträger neben published_content, müsste
      publishProject anfassen (bislang durch beide 9er-Scheiben byte-identisch)
      und wäre per CHECK über einen jsonb-Pfad kaum absicherbar; nach dem
      9b-1-Befund (zwei divergierende Urteile) die falsche Richtung.
      ABLEITUNG: Effect auf [projectId] mit cancelled-Guard wie eventCounts /
      adblockLoss, plus Refetch nach erfolgreichem Publish und nach
      removeVariantB. Kein lokal angenommener Wert.
      ORT: in der VARIANTEN-SEKTION beim Test-Schalter — dort greift der Riegel,
      dort gehört die Information hin. Die projektweite Publish-Statuszeile
      bleibt UNVERÄNDERT (sie ist korrekt).
      BERATEND, NICHT SPERREND: der Hinweis erklärt vorab, was der Riegel sonst
      erst nach dem Klick sagt — der Button wird NICHT deaktiviert. Autorität
      bleibt der SERVER-Riegel in setAbTestActive. Grund: ein fehlgeschlagener
      oder noch laufender Ladevorgang darf keine Aktion sperren, die
      funktionieren würde; ist der Wert nicht ermittelbar (null), wird KEIN
      Hinweis gezeigt und nichts behauptet.
  INVARIANTE für beide Punkte: für Projekte OHNE Variante B ändert sich am UI
  NICHTS (hasVariantB ist das etablierte Gate).
  NICHT IN DIESER RUNDE (erhoben, gehört zu 9c): die Statistik-Sektion
  (get_event_counts) und die Adblocker-Kachel (get_adblock_loss) aggregieren
  PROJEKTWEIT. Sobald 9b-2 events.variant füllt, wären Zahlen je Variante
  möglich; die Gesamtzahl wäre dann uninformativ, aber nicht falsch. Das ist
  9c-Gebiet und wird HIER nicht angefasst.
  VERIFIZIERT (live, 2026-07-27):
  - REGRESSION (GEMESSEN, zuerst geprüft): Projekt ohne Variante B zeigt keine
    neuen Elemente; der zentrale saveError-Kanal ist unberührt.
  - RIEGEL-MELDUNG AM RICHTIGEN ORT (GEMESSEN): die Verweigerung erscheint jetzt
    in der Varianten-Sektion direkt beim geklickten Button und ungekürzt — nicht
    mehr abgeschnitten in der Preview-Kopfzeile.
  - HINWEIS + REFETCH (GEMESSEN): bei nicht veröffentlichter Variante B steht
    der Hinweis vorab in der Sektion; nach dem Publish verschwindet er OHNE
    Reload (Refetch-Punkt 2), nach "Variante B entfernen" und erneutem Anlegen
    ist er wieder da (Refetch-Punkt 1 + unbedingte Abfrage).
  - KEIN LEAK (GEMESSEN): ein Projektwechsel mit stehendem Varianten-Fehler
    zeigt ihn im neuen Projekt nicht mehr.
  - NACHTRAG (live gefunden, im selben Zug behoben): Hinweis und Riegel-Fehler
    waren gleichzeitig sichtbar und zeigten denselben Satz doppelt. Gelöst mit
    EINEM Anzeigeslot und Priorität Fehler vor Hinweis — strukturell, nicht per
    Textvergleich.
  - NICHT LIVE AUSLÖSBAR (bewusst vermerkt): der "Variante B existiert
    bereits"-Fall ist im Browser praktisch nicht provozierbar, weil der
    Anlege-Button nach dem ersten Klick zum Umschalter wird. Der Fall existiert
    trotzdem (zwei offene Tabs desselben Projekts) — der Server-Guard fängt ihn,
    der Unit-Wächter deckt die Anzeige ab. Nachweis bleibt der Test, nicht der
    Live-Blick.
- 9b-2 (variant in Ingest und Persist): ABGESCHLOSSEN, live bewiesen 2026-07-29.
  Herleitung, Entscheidungen und Messergebnis stehen GENAU EINMAL in
  "### Scheibe 9b-2" direkt unten — dort wird gepflegt, hier steht nur der Status.

### Scheibe 9b-2 — variant in Ingest und Persist (ABGESCHLOSSEN — live bewiesen 2026-07-29, Commit 24a1c58, KEINE Migration)
Zweite Hälfte von 9b: die Varianten-Dimension wird GESCHRIEBEN. Seit 9b-1 lieferte die
Live-URL beide Varianten aus, aber jede Event-Zeile trug weiterhin variant NULL — 9c hätte
nichts zu aggregieren gehabt.
STATUS: gebaut, live bewiesen. Die Bullets unten sind die HERLEITUNG (Stand der
Entscheidung VOR dem Bau) und bleiben inhaltlich stehen — einschliesslich der als KANDIDAT
markierten Punkte, die die Bau-Stufe am Code erhoben hat; was Bau und Live-Test daran
präzisiert haben, steht im VERIFIZIERT-Block am Ende. Gleiche Trennung wie bei der
Leere-Variante-Riegel-Scheibe: Entscheidungsgrundlage und Messergebnis bleiben
unterscheidbar.

- GATE — ENTSCHIEDEN: geschrieben wird variant NUR bei aktivem Test (ab_test_active).
  ZWEI Begründungen, beide tragend (keine ist Beiwerk):
  (a) variant ist DIESELBE WERTKLASSE WIE source: die Werte sind PERMANENT und werden nie
      nachträglich transformiert -> sie müssen ab Zeile 1 stimmen. Eine Zeile mit
      variant='b' bei inaktivem Test BEHAUPTET eine Auslieferung, die 9b-1 live widerlegt
      hat ("FLAG SCHLÄGT COOKIE": bei inaktivem Test liefert die Route ausnahmslos A).
      Nicht nachträglich heilbar.
  (b) NULL GRENZT DEN TESTZEITRAUM AB. Ohne Gate wäre "variant is not null" bedeutungslos:
      Zeilen von VOR und NACH dem Test wären von Zeilen WÄHRENDDESSEN nicht
      unterscheidbar.
- VERWORFEN, je mit Grund:
  (a) ROH SCHREIBEN, IN 9c FILTERN: scheitert an Gate-Begründung (a). Korrektheit gehört
      an die SCHREIBZEIT — ein Filter in der Auswertung repariert keine Zeile, die eine
      Auslieferung behauptet.
  (b) SERVE SPIEGELN, BEI INAKTIVEM TEST 'a' SCHREIBEN: färbte JEDES Projekt, auch die
      grosse Mehrheit ohne jeden Test — 'a' hiesse dort "der einzige Inhalt, den es gibt"
      statt "Bucket A eines laufenden Tests", also zwei Bedeutungen in EINER Spalte.
      Zusätzlich liefen nach Testende neue A-Zeilen in den NENNER des bereits
      abgeschlossenen Tests.
- BEKANNTER PREIS DES GATES (steht hier, damit er in 9c nicht als Bug gemeldet wird): Wird
  der Test gestoppt, WÄHREND eine Sitzung läuft, ist der PageView bereits mit 'b'
  protokolliert, die danach eintreffende Conversion aber NULL -> die Conversion-Rate wird
  UNTERSCHÄTZT. Der Fehler ist EINSEITIG und auf die zum Stopp-Zeitpunkt LAUFENDEN
  Sitzungen BEGRENZT. Ohne Gate wäre die Fehlzuordnung UNBEGRENZT — jeder wiederkehrende
  Besucher mit Session-Cookie trüge sie weiter.
- INVARIANTE — DER INGEST WEIST NIE ZU, ER LIEST NUR: Der Münzwurf bleibt AUSSCHLIESSLICH
  in der Serve-Route (Grundsatzentscheidung "SPLIT LIEGT KOMPLETT IN DER SERVE-ROUTE").
  Fall "Test aktiv, aber KEIN Cookie im Request" (die Seite wurde vor der Aktivierung
  ausgeliefert) -> NULL, KEIN Würfeln im Ingest. Sonst gäbe es eine ZWEITE
  Zuweisungs-Autorität, und zwei Autoritäten können divergieren.
- DER COOKIE-WERT IST CLIENT-KONTROLLIERTE EINGABE: HttpOnly schützt vor JS IM BROWSER,
  NICHT vor einem gefälschten Cookie-Header. Ungeprüft durchgereicht bricht der Wert am
  CHECK events_variant_valid — und weil persistEvent in after() läuft, ist das KEIN Fehler
  nach aussen, sondern eine STILL verlorene Event-Zeile. Validierung VOR dem Persist ist
  damit Pflicht, nicht Defensive. Sie läuft über das GETEILTE Prädikat aus der reinen Datei
  src/lib/hosting/variant.ts — dieselbe Datei, die schon Serve-Pfad und Aktivierungs-Riegel
  bedient (s. 9b-1p, deliverableVariantB). KEIN zweiter Cookie-Parser und KEINE zweite
  Wertliste im Ingest — "kein drittes Urteil". AM CODE ZU PRÜFEN (hier NICHT gesetzt): ob
  9b-1 dort bereits ein passendes Prädikat für den COOKIE-WERT hinterlassen hat oder ob es
  additiv entsteht.
- GESCHRIEBEN WIRD AUF BEIDEN ZEILEN — der SERVER-Zeile UND der BROWSER-Bestätigungszeile
  (source='browser'). BEGRÜNDUNG: variant ist eine Eigenschaft der BEOBACHTUNG, genau wie
  source — sie hält fest, was das Cookie IM MOMENT DIESER BEOBACHTUNG sagte; sie ist KEINE
  Aussage über die eventID. Die Bestätigungszeile wegzulassen verbaut eine Verlustrate JE
  VARIANTE.
- persistEvent BEKOMMT variant ALS PFLICHTPARAMETER vom Typ 'a'|'b'|null, KEIN Default.
  Dieselbe Denkfigur wie bei source: jede Aufrufstelle MUSS entscheiden, und NULL ist dann
  eine getroffene Entscheidung statt einer Auslassung.
- REIHENFOLGE UNVERÄNDERT: 400-Guard vor jedem DB-Zugriff, danach der EXPLIZITE
  blocked-Zweig, ERST DANN die Varianten-Logik. Ein gesperrtes Projekt persistiert nicht —
  dort gibt es keine Varianten-Frage. Massgeblich bleiben die Regeln unter "## Immer
  beachten": INGEST-204-CONTAINMENT und KILL-SWITCH ALS EXPLIZITER, FAIL-CLOSED ZWEIG.
- RESOLVER — KANDIDAT, KEIN BEFUND: naheliegend ist eine ADDITIVE Erweiterung um
  ab_test_active im SELBEN Select (Präzedenzfall: das blocked-Feld aus Scheibe 2a). Der
  IST-ZUSTAND des Resolvers ist in DIESER Runde NICHT erhoben worden; die Stufe 1 des Baus
  prüft ihn am Code, bevor sie ihn festschreibt.
  NEBENBEI, bewusst NICHT behoben: der Name getCapiConfigByTrackingKey driftet mit jedem
  solchen Feld weiter von seinem Inhalt weg. KEIN Umbenennen auf dem heissesten Pfad.
- KEINE MIGRATION in 9b-2: events.variant samt CHECK kam bereits mit 0017 ("ANLEGEN UND
  BEFÜLLEN NICHT VERSCHMELZEN"). 9b-2 ist reine Anwendungslogik.
- BEKANNTE SCHWÄCHERE FÄLLE (vollständig, damit keiner später als Bug auftaucht):
  (a) EXPORT-DOWNLOAD AUF FREMDER DOMAIN: kein Cookie -> NULL. Bereits in den
      Grundsatzentscheidungen oben festgehalten, hier nur als Bestandteil der Liste.
  (b) COOKIE-VERWEIGERNDER BROWSER: sieht B, meldet NULL und würfelt beim nächsten Request
      neu. BEWUSST NICHT REPARIERT — die Variante ins ausgelieferte HTML zu backen wäre ein
      CLIENT-GESENDETES Analytik-Feld und bräche die Marker-Hygiene (s. "## Immer
      beachten", TRACKING-source).
  (c) NULL IST NACH 9b-2 MEHRDEUTIG: kein Test / kein Cookie / ungültiges Cookie / fremde
      Domain. Für 9c genügt die Lesart "gehört zu keiner Testbeobachtung"; eine
      MESSQUALITÄTS-Kennzahl je Variante bräuchte mehr, als die Spalte trägt.
- KEIN BACKFILL für die seit 9b-1 (2026-07-27) entstandenen Zeilen mit variant NULL. Sie
  sind ehrlich unzuordenbar — ein Backfill wäre geraten, und geratene Werte in einer
  permanenten Spalte sind genau das, was Gate-Begründung (a) verhindert.
- VORGABE FÜR 9c — LAUF-ABGRENZUNG (jetzt entschieden, GEBAUT WIRD SIE IN 9c):
  BEFUND: Auch MIT Gate grenzt NULL nur EINEN Testzeitraum ab. Stoppt der Kunde den Test,
  ändert Variante B und startet erneut, sind die Zeilen BEIDER LÄUFE ununterscheidbar — 9c
  aggregierte über zwei verschiedene B-Inhalte, und der Kunde hat keinen Weg zu einem
  sauberen Neustart (Events sind aus dem UI nicht löschbar).
  ENTSCHEIDUNG: Die Semantik gilt ab jetzt, gebaut wird sie in 9c — 9b-2 bleibt
  migrationsfrei und EINZWECKIG (der Ingest ist der Pfad JEDES Besuchers; derselbe Grund,
  aus dem 9b überhaupt in 9b-1/9b-2 geschnitten wurde).
  KANDIDAT (ausdrücklich KANDIDAT, hier NICHT gesetzt): nullable ab_test_started_at auf
  projects, gesetzt von setAbTestActive; 9c filtert created_at >= started_at; NULL
  degradiert sauber auf das heutige Verhalten. 9c prüft das am Code.
- AUS DEM BAU (am Code erhoben, was in der Entscheidungsrunde KANDIDAT war):
  Der RESOLVER-Kandidat trägt — aber er liegt in src/lib/capi/token.ts, NICHT in config.ts
  (dort stehen nur zwei Meta-Konstanten). Der blocked-Präzedenzfall ist real: ab_test_active
  reitet jetzt in DERSELBEN Projektion mit ("id, settings, blocked_at, ab_test_active"),
  KEINE zweite Query. Der Name getCapiConfigByTrackingKey driftet damit weiter von seinem
  Inhalt weg — bewusst NICHT umbenannt auf dem heissesten Pfad.
  Das COOKIE-PRÄDIKAT musste NICHT gebaut werden: parseVariantCookie existierte bereits aus
  9b-1 und bildet einen beliebigen rohen Cookie-Header auf 'a'|'b'|null ab (Müllwert,
  Mehrfachvorkommen, fehlend -> null). variant.ts wurde deshalb NICHT angefasst — die
  stärkste Form von "kein drittes Urteil": es wurde nichts additiv gebaut, sondern das
  bestehende Prädikat mitbenutzt.
  NEUER TEST-WÄCHTER (nicht geplant, im Bau entstanden): eine Assertion auf die
  Select-Zeichenkette. Der Builder-Mock gibt sich mit JEDER Select-Liste zufrieden — ein
  Tippfehler im Spaltennamen wäre von keinem Test gedeckt gewesen und in Produktion NICHT
  harmlos: PostgREST-Fehler -> Resolver returnt null -> Persist UND CAPI-Forward stehen für
  ALLE Projekte still, ohne dass irgendwo etwas rot wird.
- VERIFIZIERT (live, 2026-07-29), Commit 24a1c58; Tests 606 -> 625 in 39 Dateien, Pipeline
  vierfach grün (tsc, lint, vitest, build):
  - REGRESSION ZUERST (GEMESSEN, Schritt 1 — SEPARAT gefahren): ein Projekt OHNE aktiven
    A/B-Test wurde als bestanden quittiert; es verhält sich unverändert.
    EHRLICHE GRENZE DIESER QUITTUNG: die Rückmeldung weist die Schritte 1-8 GESAMMELT als
    bestanden aus. EINZELNE Detailwerte für Schritt 1 (Zeilenzahl, Meta-Bestätigung) sind
    nicht ausgewiesen und werden hier deshalb auch nicht behauptet. Belegt ist: separat
    gefahren, Projekt ohne aktiven Test, bestanden.
  - KEIN AKTIVER TEST -> NULL (GEMESSEN, Schritte 5 und 6): nach dem Stoppen des Tests
    schreibt ein neuer Besucher variant NULL (5); ein Fenster, das noch das alte b-Cookie
    hält, ebenfalls NULL (6).
    "FLAG SCHLÄGT COOKIE" GILT DAMIT AUCH AUF DEM SCHREIBPFAD — und das ist die eigentliche
    9b-2-Aussage: in 9b-1 war der Satz nur für den SERVE-Pfad bewiesen (die Route liefert
    bei inaktivem Test ausnahmslos A). Dass auch der INGEST bei inaktivem Test nichts
    zuschreibt, war vorher offen; genau daran hängt die Bedeutung von NULL als Abgrenzung
    des Testzeitraums.
    ABGRENZUNG (AUFGELÖST, aber erhaltenswert): Schritte 5/6 messen ein Projekt, dessen Test
    GESTOPPT wurde — nicht ein Projekt, das nie einen Test hatte. Derselbe Codepfad
    (abTestActive false), aber NICHT dasselbe Szenario. BEIDE sind inzwischen gemessen: das
    "nie aktiv"-Szenario durch die Regression (Schritt 1, oben), das "gestoppt"-Szenario
    hier. Die Unterscheidung bleibt stehen, weil sie bei der nächsten Änderung an diesem
    Gate wieder gebraucht wird.
  - AKTIVER TEST, BEIDE ZEILEN (GEMESSEN, Schritte 2-4; die Quittung fasst 1-8): bei aktivem
    Test schreiben __ps_pageview UND Conversion die Variante (a bzw. b) — auf der
    SERVER-Zeile UND auf der BROWSER-Bestätigungszeile. Damit hat 9c Nenner (Besucher je
    Variante) und Zähler (Conversions je Variante) aus derselben Tabelle, und eine
    Verlustrate JE VARIANTE ist überhaupt erst berechenbar.
    META (GEMESSEN, im selben Block): Events BEIDER Varianten kommen im Events Manager an,
    das Dedup über die geteilte eventID greift. Der Forward hat den Umbau der
    schedulePersist-Signatur also überlebt — eine vorhandene events-Zeile hätte das NICHT
    belegt (Phase-8-Lektion 'Bad signature': die Zeilen liefen sauber weiter, während bei
    Meta nichts ankam).
  - COOKIE-ATTRIBUTE (DevTools, Schritt 2): __Host-ps_v, Wert 'a', host-only, HttpOnly,
    Secure, SameSite=Lax, Session. KEIN neuer Befund — die Wiederholung der 9b-1-Messung;
    sie steht hier, weil derselbe Cookie jetzt eine zweite Aufgabe trägt (Serve liest ihn
    UND Ingest liest ihn).
  - GEFÄLSCHTER COOKIE-HEADER (GEMESSEN, Schritt 7) — der wichtigste Nachweis der Runde,
    weil HttpOnly vor JS im Browser schützt, NICHT vor einem gesetzten Cookie-Header:
    fake-1 (Cookie __Host-ps_v=zzz) -> GENAU EINE Zeile, variant NULL. Beide Hälften zählen:
    der Müllwert wird verworfen UND die Zeile geht nicht verloren (ungeprüft durchgereicht
    bräche sie am CHECK events_variant_valid — in after(), also lautlos).
    fake-2 (Cookie b) -> variant 'b'. Ohne diese Gegenprobe bewiese die NULL-Zeile nur, dass
    Cookies generell ignoriert werden.
    fake-5 (gar kein Cookie-Header) -> variant NULL, kein Würfeln.
  - ALIAS-PARITÄT (GEMESSEN, Schritt 8): fake-3 gegen /api/capi mit Cookie b -> variant 'b',
    identisch zu /api/e. Der permanente Alt-Export-Alias trägt die Varianten-Dimension mit.
  - KILL-SWITCH, ZWEI ACHSEN (GEMESSEN, Schritt 9 — getrennt festgehalten, weil sie
    getrennt gehören):
    INGEST: gesperrtes Projekt -> HTTP 204 UND 0 Zeilen für fake-4. Die 204 ist BEABSICHTIGT
    (204-Containment / Enumeration-Schutz), kein Mangel. POSITIVKONTROLLE steht: derselbe
    trackingKey hat kurz zuvor bei fake-1/2/5 Zeilen geschrieben — "keine Treffer" und
    "falsch gesucht" sind damit unterscheidbar.
    SERVE: die gesperrte Seite liefert die statische Erklärseite ("Seite deaktiviert — Diese
    Seite wurde aufgrund von Richtlinienverstößen deaktiviert").
  - REVERSIBILITÄT (GEMESSEN): nach dem Entsperren, 2026-07-29 08:27:25 UTC, wurden
    Server- UND Browser-Event mit Variante 'b' geschrieben. Die Kette läuft inklusive
    Varianten-Dimension wieder an.
  - AUFRÄUMEN: delete auf fake-1..fake-5 ausgeführt (fake-4 hatte nie eine Zeile). Die
    9b-2-Zeilen der Live-Session sind eigene Testdaten, keine Kundendaten.
  - WAS DER NACHWEIS NICHT ZEIGT (ausdrücklich, damit es niemand später als Lücke
    "entdeckt"):
    (a) Der Fall "Test AKTIV, Seite wurde VOR der Aktivierung ausgeliefert" (Cookie fehlt,
        obwohl der Test läuft) ist live nicht isolierbar — er verlangt eine Sitzung über den
        Aktivierungszeitpunkt hinweg. Abgedeckt ist er nur als Unit (V4: kein Cookie ->
        NULL, kein Würfeln).
    (b) KEINE Aussage über die VERTEILUNG unter echtem Traffic — das ist 9c-Gebiet.

### Scheibe 9c — Auswertung je Variante — VOLLSTÄNDIG: 9c-1 (live bewiesen 2026-07-29, Commit 8844798, Migration 0019) + 9c-2 (live bewiesen 2026-07-29, Commit da94afd, Migration 0020). MIT 9c IST PHASE 9 ABGESCHLOSSEN.
Die letzte Scheibe der Phase: aus den seit 9b-2 zugeordneten Zeilen wird eine Aussage.
DER SCHNITT (in der Stufe 1 vorgeschlagen, vor dem Bau entschieden):
- 9c-1 — AUSWERTUNG je Variante, OHNE Lauf-Abgrenzung. Migration 0019 legt AUSSCHLIESSLICH
  eine neue Lese-RPC an, dazu Read-Action und eigene UI-Sektion. ABGESCHLOSSEN.
- 9c-2 — LAUF-ABGRENZUNG (Zeitstempel beim Teststart, Zeitfilter in der Auswertung).
  ABGESCHLOSSEN, Migration 0020.
WARUM DIESE LINIE UND NICHT "DATENWEG GEGEN DARSTELLUNG" (die naheliegendere): eine erste
Scheibe aus Migration + Action + RPC wäre NICHT DEMOBAR gewesen — man hätte sie nur im
SQL-Editor gesehen, und eine Scheibe ohne demobare Wirkung ist kein guter Schnitt. Die
gewählte Linie trennt stattdessen nach RISIKO-ASYMMETRIE: 9c-1 fasst KEINE bestehende
Tabelle an (ein Fehlschlag ist ein Code-Revert, die RPC bliebe ungenutzt liegen), 9c-2
fasst die Projektzeile UND den Owner-Schreibpfad der Aktivierung an. Diese beiden Risiken
zu bündeln wäre dieselbe Bündelung, aus der 9b in 9b-1/9b-2 geschnitten wurde.
MÖGLICH WURDE DIE TRENNUNG DURCH J8: "Zeitstempel NULL -> alle Zeilen mit Variante" war von
Anfang an das dokumentierte Zielverhalten, nicht eine Übergangskrücke. 9c-1 liefert genau
das, 9c-2 verschärft es — kein Wegwerf-Code.
STATUS: Die Bullets unten sind die HERLEITUNG (Stand der Entscheidung VOR dem Bau) und
bleiben inhaltlich stehen, einschliesslich der OFFENEN PRÜFUNGEN — was der Bau daran
erhoben hat, steht im "AUS DEM BAU"-Block, was der Live-Test gemessen hat, im
VERIFIZIERT-Block. Gleiche Trennung wie bei 9b-2.
DIESE RUNDE HAT NICHTS AM CODE ERHOBEN. Alles, was am Code zu klären ist, steht unten
gesammelt als OFFENE PRÜFUNG — kein Dateipfad, keine Funktionssignatur, keine
Migrationsnummer wird hier als Tatsache behauptet. (Anlass: in 9b-2 stand ein geratener
Dateipfad in der Vorgabe und war falsch; der Bau hat ihn korrigiert.)

- ZWECK: Conversions je Variante, gegen Seitenaufrufe je Variante. Zähler und Nenner
  kommen seit 9b-2 aus DERSELBEN Tabelle — das war der Grund, die Varianten-Dimension
  auch auf die PageView-Zeilen zu schreiben, und dieser Grund wird hier eingelöst.
- DER NENNER SIND SEITENAUFRUFE, NICHT BESUCHER — ENTSCHIEDEN. Es gibt keine
  Besucher-Identität, und zwar an drei Stellen bewusst nicht: Fingerprinting ist
  entschieden nicht gebaut, ein IP/UA-Hash zöge die 30-Tage-Retentionspflicht herein
  (Manifest Tier 2), und das __Host-ps_v-Cookie trägt ausschliesslich 'a'/'b' — keine ID,
  kein Zeitstempel (Grundsatzentscheidung oben).
  RIEGEL, ausdrücklich benannt, weil er wie eine Kleinigkeit aussieht: eine "anonyme
  Zufalls-ID" im Cookie wäre ein fingerprint-artiges Merkmal und löste die
  DATENKLASSEN-GRENZE aus (s. "## Offene Punkte"). Sie ist damit KEINE 9c-Option, sondern
  eine eigene Scheibe, die eine vorherige Entscheidung braucht.
  EHRLICHER PREIS, zweistufig — die zweite Stufe ist die unangenehmere:
  (a) NIVEAUFEHLER: ein Besucher, der dreimal lädt, zählt dreimal. Der Nenner ist zu gross,
      die Rate zu klein.
  (b) CONFOUNDER — der Befund, nicht die Vermutung: weil der Nenner Seitenaufrufe zählt
      und es keine Besucher-Identität gibt, geht JEDER Unterschied im Reload-Verhalten
      zwischen den Varianten ungefiltert in die Rate ein. Dass dieser Kanal offensteht,
      folgt zwingend aus diesen beiden Tatsachen. Ungemessen ist allein, OB und WODURCH er
      sich im konkreten Test auswirkt. BEISPIEL für einen solchen Mechanismus (illustrativ,
      nicht behauptet): würde eine verwirrende Variante öfter neu geladen, stiege ihr
      Nenner und ihre Rate sänke, ohne dass die Conversion-Wahrscheinlichkeit gesunken
      wäre.
      (a) verschiebt beide Seiten gleichmässig und kürzt sich im Vergleich weitgehend
      heraus; (b) tut das NICHT. Ohne Besucher-Identität ist das nicht auflösbar — es wird
      benannt, nicht wegdefiniert.
  WORTWAHL, verbindlich: "Conversions je Seitenaufruf", NIE "Conversion-Rate je Besucher".
  Dieselbe Disziplin wie "nur server-seitig erfasst" statt "gerettet" — die Bezugsgrösse
  steht im Namen, sonst liest der Nutzer eine Zahl, die es nicht gibt.
- FORM DER ZAHL — ENTSCHIEDEN: eine TABELLE JE EVENT-TYP, die Varianten nebeneinander.
  GRUND: TrackConfig.event ist ein FREIER Nutzer-String; ein Projekt KANN damit mehrere
  Conversion-Arten führen. Die Form ist die natürliche Fortsetzung der bestehenden
  (event_type, count)-Gestalt und fällt bei genau EINER Conversion-Art auf einen einzigen
  Eintrag zusammen — sie kostet also nichts, wo sie nicht gebraucht wird.
  VERWORFEN: (a) EINE Sammelkennzahl über alle Conversions — summierte Purchase und Lead
  sind keine Grösse, sondern eine Zahl, die auf nichts antwortet; (b) der Nutzer wählt ein
  PRIMÄR-EVENT — braucht eine Einstellung, einen Speicherort und UI für einen Bedarf, den
  heute niemand gemeldet hat. Bleibt möglich, sobald er auftritt.
- NEUE RPC STATT ERWEITERUNG — ENTSCHIEDEN: die bestehende Zähl-RPC bekommt KEINE
  Varianten-Spalte. Ihre Rückgabeform zu ändern bräche ihren Aufrufer auf einem LIVE
  gelesenen Pfad; der Präzedenzfall zeigt den anderen Weg — die Verlustraten-RPC kam
  ebenfalls ADDITIV daneben statt als Erweiterung.
  DIVERGENZ-RIEGEL (der Preis dieser Entscheidung, deshalb hier und nicht im Plan): es
  entstehen ZWEI Funktionen mit überlappender Frage an DIESELBE Tabelle. Identische
  Filtersemantik ist Pflicht — dieselbe Einschränkung auf den Beobachtungs-Ort 'server';
  driftet sie, zeigen zwei Sektionen desselben Dashboards unvereinbare Zahlen, und keiner
  von beiden ist anzusehen, wer recht hat. ABGESICHERT WIRD DAS PER TEST: die Summe über
  alle Varianten OHNE Zeitfilter muss die projektweite Zahl DERSELBEN Event-Art treffen.
  Aggregat gegen Gruppierung ist strukturell ein anderer Weg zum selben Wert, also keine
  Tautologie.
  SECURITY INVOKER, stable, search_path gesetzt — als DEFINER lieferte die RPC Zahlen über
  ALLE Tenants, weil sie die RLS des Aufrufers umginge. Nicht verhandelbar; im
  Migrations-Volltext ist das die Klausel, auf die zuerst geschaut wird.
- LAUF-DELIMITER — DIE MIGRATION, DIE 9b-2 SICH GESPART HAT. Die Herleitung ("warum
  überhaupt") steht in der 9b-2-Sektion unter "VORGABE FÜR 9c" und wird hier NICHT
  wiederholt; hier steht nur, was dort noch nicht entschieden war:
  GESETZT WIRD BEIM START des Tests. Beim STOPP bleibt die Spalte UNVERÄNDERT — sonst
  verschwänden die Zahlen genau in dem Moment, in dem der Nutzer sie liest (er stoppt, um
  das Ergebnis anzusehen).
  KEIN CHECK "aktiv impliziert Zeitstempel gesetzt", obwohl das die etablierte Denkfigur
  der Phase wäre (projects_variant_b_pair, projects_ab_test_needs_variant_b): er zwänge
  einen BACKFILL für die bereits aktive Zeile, und ein gerateter Zeitwert in einer
  permanenten Spalte ist genau das, was 9b-2 beim Backfill abgelehnt hat. NULL degradiert
  stattdessen sauber auf "alle Zeilen mit Variante" — so war es dort bereits festgelegt.
  BENANNTES FENSTER, nicht repariert: zwischen Migration und Deploy (Migration zuerst,
  fail-closed) kann eine Aktivierung mit ALTEM Code laufen -> der Zeitstempel bliebe NULL,
  der Lauf wäre nicht abgegrenzt. Dauer: Minuten, und heute betrifft es ausschliesslich
  eigene Projekte. Das ist der Preis der Reihenfolge-Regel, nicht ein Fehler in ihr.
- NEUSTART — ENTSCHIEDEN: ein erneuter Start ÜBERSCHREIBT den Zeitstempel; die Zahlen des
  vorigen Laufs sind danach nicht mehr ausgewiesen. Das IST der Zweck (ein sauberer Lauf),
  aus Nutzersicht aber ein Verlust — deshalb steht ein HINWEIS VOR dem Klick, nicht danach.
  GRENZE, die der Hinweis NICHT überschreiten darf: es wird NICHTS gelöscht, die Zeilen
  bleiben vollständig in events. Ein Hinweis, der Datenverlust behauptet, wäre falsch und
  erzeugt Angst vor einer harmlosen Aktion; er sagt, dass die ANZEIGE neu beginnt.
  VERWORFEN: (a) nie überschreiben — dann ist ein sauberer zweiter Test unmöglich und der
  ganze Zweck der Spalte verfehlt; (b) eine Lauf-HISTORIE mit mehreren Läufen — Abstraktion
  auf Verdacht, dieselbe Erwägung wie beim bewussten Varianten-Duplikat in 9a. Tritt ein
  dritter Bedarf auf, wird das Modell ERSETZT, nicht erweitert.
- WAS 9c AUSDRÜCKLICH NICHT BAUT, je mit Grund:
  (a) KEINE SIGNIFIKANZRECHNUNG — steht so in den Grundsatzentscheidungen oben.
      ABER: zwischen "rechnet keine Signifikanz" und "stellt zwei Zahlen so dar, als wäre
      eine besser" liegt der eigentliche Produktschaden. Die Zielgruppe trifft mit diesen
      Zahlen BUDGET-Entscheidungen; eine Darstellung, die einen Sieger suggeriert, ist
      schlimmer als gar keine Auswertung, weil sie Vertrauen erzeugt, das sie nicht deckt.
      DARAUS: ABSOLUTWERTE PRIMÄR, Rate sekundär. "12 von 340" ist ehrlich; eine Prozentzahl
      ALLEIN verdeckt die BEZUGSGRÖSSE — bei kleinen Zahlen wie bei grossen, das Problem
      wächst sich mit Traffic nicht aus. KEINE
      Sieger-Auszeichnung, KEINE Ampelfarben, KEINE Formulierung, die eine Variante vorne
      sieht.
      AUCH VERWORFEN: eine SCHWELLE ("unter N Aufrufen keine Rate anzeigen"). Sie wäre ein
      verstecktes statistisches Urteil mit willkürlicher Konstante — und die Konstante wäre
      nicht begründbar, ohne genau die Rechnung anzustellen, die wir nicht anstellen.
      Absolutwerte leisten dasselbe ehrlicher und kostenlos: "1 von 3" ENTHÄLT die
      Bezugsgrösse, "33 %" nicht.
  (b) KEINE VERLUSTRATE JE VARIANTE, obwohl 9b-2 die Bestätigungszeilen bewusst
      mitbeschrieben hat und sie damit möglich WÄRE. GRUND: sie verzerrt den A/B-Vergleich
      NICHT — der läuft auf server-beobachteten Zeilen, und die sind adblocker-unabhängig;
      genau das ist das Produktversprechen. Die Möglichkeit bleibt bestehen (die Daten sind
      da), die Scheibe braucht sie nicht.
  (c) KEINE UNIQUES — s. den Nenner-Punkt oben und die Datenklassen-Grenze.
  (d) KEIN INDEX auf der Varianten-Spalte. Niedrige Kardinalität (zwei Werte plus NULL),
      und der Projektfilter trägt über den bestehenden Index — die Ausgangslage steht im
      Ist-Stand-Block. Falls es je langsam wird: MESSEN, dann entscheiden. Ein Index auf
      Verdacht ist Schreiblast auf dem Ingest-Pfad ohne belegten Nutzen.
- DARSTELLUNG:
  EIGENE SEKTION mit ausgewiesenem ZEITRAUM ("seit Teststart am ..."). Die bestehenden
  projektweiten Kacheln bleiben UNBERÜHRT — dass sie projektweit aggregieren, ist im
  9b-1p-Block bereits festgehalten.
  GRUND FÜR DIE TRENNUNG, konkret: stünde eine projektweite Gesamtzahl neben den
  Varianten-Zahlen, fragte der Nutzer zu Recht, warum das nicht aufgeht — es sind ZWEI
  Fragen über ZWEI Zeiträume. Getrennte Sektionen sagen das; geteilte Spalten laden zum
  Addieren ein und produzieren einen Support-Fall aus einer korrekten Anzeige.
  SICHTBAR, sobald der Zeitstempel gesetzt ist — NICHT nur solange der Test AKTIV ist,
  sonst verschwänden die Ergebnisse beim Stoppen. Der Zustand wird aus dem GELADENEN
  Projekt ABGELEITET, nicht lokal gehalten ("ABLEITEN STATT LÖSCHEN").
  ZEILEN OHNE ZUORDNUNG innerhalb des Fensters (cookie-verweigernder Browser,
  Export-Download auf fremder Domain, Seite vor der Aktivierung ausgeliefert — die Fälle
  sind in der 9b-2-Sektion aufgezählt) werden EIGENS ausgewiesen — unaufdringlich und NUR
  dann, wenn ihre Zahl nicht null ist. Der Record legt das LAYOUT nicht fest (ob der
  Ausweis neben den Varianten oder darunter steht, entscheidet die Gestaltung). Er ist das
  EINZIGE Signal über Messverluste, das der Nutzer überhaupt hat; ihn wegzulassen hiesse,
  den Nenner stillschweigend zu beschönigen.
  "LEER" UND "NICHT LADBAR" DÜRFEN NICHT GLEICH AUSSEHEN. Der Backlog-Punkt dazu verweist
  ausdrücklich auf diese Scheibe (docs/claude-history/backlog-polish.md) — er wird HIER
  eingelöst, nicht ein weiteres Mal verschoben. Damit hängt ein Fehlerkanal am Aufruf ->
  safeAction ist Pflicht, gleiche Achse wie beim Ladeeffekt im DomainManager (s. "## Immer
  beachten", CLIENT-SEITIGE SERVER-ACTION-AUFRUFE): nicht wer den Aufruf auslöst
  entscheidet, sondern ob eine Meldung zu zeigen ist.
- OFFENE PRÜFUNGEN FÜR DIE STUFE 1 (ausdrücklich KEINE Befunde — in dieser Runde wurde
  nichts am Code erhoben; die Stufe 1 misst jede einzelne, bevor sie plant):
  (1) Wie behandelt die bestehende Statistik-Sektion die PageView-Zeile heute — wird sie
      angezeigt oder gefiltert? Davon hängt ab, ob der NENNER heute überhaupt schon
      sichtbar ist und ob 9c ihn erstmals zeigt.
  (2) Wie ist die bestehende Zähl-RPC genau geschnitten, und wer ruft sie auf? Erst das
      belegt, dass eine Erweiterung ihren Aufrufer bräche (die Annahme, auf der die
      Entscheidung "neue RPC" steht).
  (3) Wo liegt die Aktivierungs-Action und was schreibt sie heute? Der Zeitstempel wird
      dort gesetzt; ob das additiv möglich ist, ist am Code zu klären.
  (4) Hat die Statistik-Sektion heute einen Fehlerkanal — oder entsteht er mit dieser
      Scheibe neu?
  (5) Die tatsächlich nächste freie Migrationsnummer ist am Verzeichnis ABZULEITEN, NIE
      hartzukodieren. Eine hier notierte Nummer veraltete mit der nächsten Migration und
      überschriebe dann eine bestehende Datei.
- AUS DEM BAU (9c-1; getrennt vom Messblock, weil es Bau-Ergebnisse sind, keine
  Live-Messwerte):
  DIE OFFENEN PRÜFUNGEN, beantwortet: (1) die PageView-Zeile wird von der bestehenden
  Statistik-Sektion ANGEZEIGT, nicht gefiltert (Anzeige-Mapping auf "PageViews") -> 9c-1
  macht den Nenner NICHT erstmals sichtbar, es TEILT ihn auf. (2) Der Bruch-Beleg für
  "neue RPC statt Erweiterung" trägt doppelt: SEMANTISCH (am Code erhoben) bräche eine
  Varianten-Spalte die bestehende Liste — sie erzwänge mehrere Zeilen je event_type, und die
  Liste schlüsselt je event_type; MECHANISCH kann "create or replace function" den
  Rückgabetyp nicht ändern (DOKUMENTIERTE POSTGRES-REGEL, NICHT an diesem Repo gemessen —
  die Markierung zählt, weil die 9c-2-Skizze auf derselben Regel aufbaut: dort ist "replace"
  zulässig, weil der Rückgabetyp gleich bleibt). (3) Der Zeitstempel
  ist additiv in die Aktivierungs-Action schreibbar (ein Feld mehr im bestehenden Patch),
  kein CHECK und kein Trigger hängt daran — das ist 9c-2-Material. (4) Die Statistik-Sektion
  hatte KEINEN Fehlerkanal. (5) Die Nummer wurde am Verzeichnis abgeleitet: 0019.
  DIE SQL-PORTIERUNG LIEGT IM TESTFILE, abweichend vom Präzedenzfall (die
  Verlustraten-Portierung ist ein Modul unter lib/analytics). BEGRÜNDUNG: ein Modul in
  einem PRODUKTIVverzeichnis, das nur ein Test importiert, liest sich für jeden späteren
  Leser wie Produktivcode. Bewusste Abweichung — festgehalten, damit der Nächste nicht zwei
  Muster ohne Entscheidung vorfindet.
  DIE MIGRATIONS-WÄCHTER PRÜFEN ÜBERWIEGEND ABWESENHEIT (kein security definer, kein
  Tabellen-DDL, kein Index) und haben deshalb eine EIGENE POSITIVKONTROLLE bekommen: eine
  eingefügte definer-Klausel und eine entfernte search_path-Zeile machen sie nachweislich
  rot. Ohne sie sähen ein Nicht-Treffer und ein kaputter Wächter identisch aus — und das
  trifft ausgerechnet die Klausel, an der die Mandanten-Trennung hängt.
  DER WÄCHTER SCHLÄGT AUCH BEI EINEM NACHGESTELLTEN KOMMENTAR AN, der das Wort enthält
  (die Kommentar-Entfernung verwirft nur Zeilen, die MIT "--" beginnen). Bewusst so
  belassen: bei einer Sicherheitsklausel ist ein Fehlalarm billig, ein stiller Durchlass
  nicht.
  LEKTION AUS EINER MUTATION, DIE NICHT ROT WURDE: die Sparse-Fall-Mutation war im ersten
  Anlauf ZU SCHWACH (sie behielt die Drei-Spalten-Form) — sie liess vier ANDERE Tests rot
  werden, aber genau den gemeinten nicht. Das hätte als bestandene Probe durchgehen können.
  Nachgeschärft, bis sie den Fehlermodus wirklich erzeugt. VERALLGEMEINERT: eine Mutation,
  die nicht rot wird, kann ein SCHLECHTES MODELL DES FEHLERS sein statt eines hohlen Tests.
  Beides muss unterschieden werden, und beides erfordert Anhalten.
- VERIFIZIERT (live, 2026-07-29), Commit 8844798, Migration 0019 gelaufen (Protokollzeile in
  schema_migrations mit applied_at bestätigt, Deployment "Ready"); Tests 625 -> 647 in 40
  Dateien, Pipeline vierfach grün:
  - REGRESSION ZUERST (GEMESSEN, Schritt 1): Projekt OHNE Varianten -> Statistik-Liste und
    Adblocker-Kachel unverändert, KEINE neue Sektion. Die SQL-Gegenprobe (rohe Gruppierung,
    struktureller Gegenweg zur RPC) stimmt exakt mit der Anzeige überein.
  - ZAHLEN JE VARIANTE (SQL-GEMESSEN mit filter-Aggregaten, Schritte 2-5): PageViews A=2,
    B=6, ohne=39 (gesamt 47); Purchase A=1, B=2, ohne=32 (gesamt 35). Das UI zeigte dazu
    PageViews A=2/B=6, Purchase A=1/B=2, "Purchase: A 1 von 2 (50.0 %) · B 2 von 6
    (33.3 %)" und "Ohne Varianten-Zuordnung: 71 Events".
  - DIVERGENZ-RIEGEL (GEMESSEN, Schritt 4 — der Kernnachweis der Scheibe): 2+6+39 = 47 und
    1+2+32 = 35; beide Summen treffen die Bestandskacheln EXAKT. Aggregat gegen Gruppierung,
    also keine Tautologie.
  - DER RIEGEL ÜBERLEBT EINE DATENÄNDERUNG (ZWEITE ABLESUNG, SPÄTER, NUR AUS DEM UI —
    KEINE eigene SQL-Gegenprobe, deshalb ausdrücklich so gekennzeichnet): Bestandskachel
    PageViews 48, Purchase 35; Sektion PageViews A=2/B=7, Purchase A=1/B=2, "A 1 von 2
    (50.0 %) · B 2 von 7 (28.6 %)", ohne Zuordnung weiterhin 71. Zwischen beiden Ablesungen
    ist TRAFFIC gelaufen (B von 6 auf 7, gesamt von 47 auf 48), und der Riegel geht trotzdem
    auf: 2+7+39 = 48 — diese Summe ist GERECHNET aus den UI-Zahlen, nicht gemessen. Ein
    Riegel, der eine Datenänderung überlebt, ist stärker als einer auf einem Standbild.
  - DARSTELLUNG (GEMESSEN): "Ohne Varianten-Zuordnung: 71 Events" ist die SUMME über alle
    Event-Arten (39+32), nicht je Event-Art aufgeschlüsselt. Der Ratenblock zeigt NUR
    Purchase, nicht PageViews -> die Trennung Nenner/Zähler über die geteilte Konstante
    greift live.
  - FEHLERKANAL, ISOLIERT (GEMESSEN, Schritt 6 mit korrigierter Instrumentierung, s. unten):
    Funktion per "alter function" umbenannt, Seite neu geladen -> in der Sektion steht "Die
    Auswertung konnte nicht geladen werden — bitte Seite neu laden.", am RICHTIGEN Ort und
    nicht in der Preview-Kopfzeile. Die beiden Bestandskacheln lieferten im selben Moment
    unverändert Zahlen -> der Ausfall war ISOLIERT. Zurückbenannt, neu geladen -> Zahlen
    wieder da (Positivkontrolle; ohne sie bewiese die Meldung nur, dass irgendetwas kaputt
    war).
  - MANDANTEN-GEGENPROBE, BEIDE HÄLFTEN (GEMESSEN, Schritt 7): fremder JWT -> 0 Zeilen;
    unmittelbar danach eigener JWT -> Zahlen. Die Tenant-Isolation unter SECURITY INVOKER
    ist damit BEWIESEN, nicht behauptet — und die zweite Hälfte ist der Grund, warum die
    Null etwas bedeutet.
  - KILL-SWITCH-RANDPROBE (GEMESSEN, Schritt 8): gesperrtes Projekt -> Live-URL weiterhin
    451 mit Erklärseite; die Auswertung im Editor bleibt lesbar. 9c-1 ist ein reiner
    Lesepfad und ändert am Kill-Switch nichts.
  - INSTRUMENTIERUNGS-BEFUND — DER LIVE-SCHRITT WAR FALSCH, NICHT DER CODE:
    Der ursprüngliche Schritt 6 ("DevTools offline, dann Projektwechsel") KONNTE den neuen
    Fehlerkanal gar nicht auslösen. Am Code erhoben: offline scheitert ZUERST der
    Projekt-Load, der Wechsel-Handler kehrt früh zurück, projectId bleibt stehen — und der
    Lade-Effekt der neuen Sektion hängt allein an dieser Dependency. Sichtbar wurde deshalb
    der ZENTRALE saveError-Kanal in der Preview-Kopfzeile, nicht die Sektion.
    KEIN CODEFEHLER: der Kanal wirkt, wenn der Projekt-Load GELINGT und nur die
    Auswertungs-Abfrage scheitert; zusätzlich belegt ihn die Mutation M4 im Test (Ersatzwert
    auf einen Leer-Wert geändert -> der Fehlerkanal-Test wurde rot). Ersetzt durch:
    Funktion umbenennen, Seite neu laden, zurückbenennen.
    VERALLGEMEINERUNG, die hier stehen muss: EIN GROBES INSTRUMENT NIMMT OFT DIE
    VORBEDINGUNG DESSEN MIT, WAS ES PRÜFEN SOLL. Das ist in Phase 9 zum ZWEITEN Mal
    aufgetreten — zuvor las sich das erwartete 204 am Ingest wie ein fehlendes 451 am
    Serve-Pfad. Bei JEDEM Live-Schritt ist zu fragen, welche Voraussetzung das gewählte
    Instrument mitreisst.
  - BACKLOG-STAND (kein Messwert, aber hier festzuhalten): "leer vs. nicht ladbar" ist für
    die NEUE Sektion EINGELÖST und für die BESTANDSKACHELN weiterhin OFFEN. Deren
    .catch()-auf-Leer-Wert-Verhalten wurde bewusst nicht angefasst — ein live bewiesener
    Pfad wird nicht ohne Anlass umgebaut. Der Backlog-Eintrag bleibt für sie stehen.
  - WAS DER NACHWEIS NICHT ZEIGT (ausdrücklich):
    (a) Die Rate ist "je Seitenaufruf", NICHT je Besucher. Der Confounder aus der Herleitung
        oben bleibt unberührt und ungemessen.
    (b) "Ohne Zuordnung: 71" wird HEUTE von ALTZEILEN aus der Zeit vor 9b-2 dominiert (kein
        Backfill, bewusst). Als MESSVERLUST-Signal ist die Zahl damit derzeit UNBRAUCHBAR.
        Erst der Zeitfilter aus 9c-2 schneidet die Altzeilen weg und macht sie zu einem
        echten Signal. Das ist eine GEMESSENE Bestätigung des Nutzens von 9c-2 — nicht mehr
        nur eine Herleitung.
    (c) KEINE Aussage über die Verteilung unter echtem Traffic.
    (d) Die zweite Ablesung ist eine reine UI-Ablesung OHNE eigene SQL-Gegenprobe.
- AUS DEM BAU (9c-2; getrennt vom Messblock, weil es Bau-Ergebnisse sind, keine
  Live-Messwerte):
  ZWEI MUTATIONEN WURDEN NICHT ROT — aus VERSCHIEDENEN Gründen, und die Unterscheidung
  ist der eigentliche Ertrag dieser Scheibe:
  (a) SCHLECHTES MODELL DES FEHLERS: Die Mutation, die den is-null-Zweig aus der
      TS-PORTIERUNG entfernte, blieb grün. Grund: JS kennt keine dreiwertige Logik —
      ("…" < null) ist false, die Zeile BLEIBT; SQL wirft sie bei einem Vergleich gegen
      NULL HERAUS. Die Portierung kann den Fehlermodus gar nicht erzeugen.
      VERALLGEMEINERT — und das ist der Satz, der über diese Scheibe hinausreicht: WO
      EINE ENTSCHEIDUNG AN DREIWERTIGER LOGIK HÄNGT, IST EINE TS-PORTIERUNG BLIND. Dann
      tragen ein Datei-Wächter am SQL plus der Live-Test den Beweis, nicht der Unit-Test.
      (HEBUNGS-KANDIDAT für "## Immer beachten", s. den Auslagerungs-Vermerk unten.)
  (b) HOHLER WÄCHTER: Die Mutation, die die Spaltenreferenz aus dem Funktionskörper
      entfernte, blieb ebenfalls grün — der Wächter-Ausschnitt lief bis DATEIENDE und
      traf den DATEINAMEN in der Protokollzeile statt der Spaltenreferenz im Körper.
      Behoben wurde die WURZEL, nicht die Assertion: ein gemeinsamer, am schliessenden
      $$; begrenzter Körper-Ausschnitt mit EIGENER Positivkontrolle (er darf die
      Protokollzeile nicht enthalten, den Körper schon). Dabei zeigte sich, dass die
      9c-1-Wächter denselben zu weiten Ausschnitt hatten — sie hängen jetzt am selben
      Helfer.
  DER REFETCH FEHLTE ZUNÄCHST. Die Beschriftung sprang beim Start sofort (der Zeitstempel
  kommt aus der Action-Antwort), die Zahlen nicht (der Lade-Effekt hängt an [projectId],
  und die ändert sich beim Starten nicht). Ergebnis wäre ein ENGERES Fenster über WEITEREN
  Zahlen gewesen.
  KORREKTUR DER STUFE-1-ANALYSE, ausdrücklich: dort stand, diese Richtung sei STRUKTURELL
  ausgeschlossen (die DB sei die Quelle, die Beschriftung könne nur älter sein). Das galt
  VOR der Entscheidung, den Zeitstempel aus der Action zurückzugeben. Sie ist jetzt durch
  einen REFETCH-PUNKT geschlossen — das ist eine SCHWÄCHERE Zusage als "strukturell
  unmöglich", und sie muss als solche stehen.
  HYDRATION, BENANNT STATT GEBAUT: die lokale Datumsformatierung der Zeitraum-Beschriftung
  ist nur deshalb kollisionsfrei, weil das Einstellungs-Panel im ersten Render geschlossen
  ist — die Sektion liegt im Server-HTML gar nicht im Baum. Das ist ein NEBENEFFEKT, kein
  Schutz. Kommentiert an BEIDEN Stellen (Beschriftung und Panel-Gate), weil wer den
  Panel-Default umstellt, den Kommentar drüben nicht liest. Mount-Flag,
  suppressHydrationWarning und eine fest gesetzte Zeitzone wurden geprüft und verworfen.
  BENANNTES, NICHT REPARIERTES VERHALTEN: wird Variante B nach einem Lauf ENTFERNT, bleibt
  der Zeitstempel stehen und die Auswertung sichtbar. Richtig so — die Messung hat
  stattgefunden, die Zeilen sind echt. Als Test abgedeckt, KEIN Live-Schritt (am
  Testprojekt destruktiv).
- VERIFIZIERT — 9c-2 (live, 2026-07-29), Commit da94afd, Migration 0020 gelaufen
  (schema_migrations auf 0020 bestätigt, Deployment "Ready"); Tests 647 -> 671 in 40
  Dateien, Pipeline vierfach grün:
  - REGRESSION ZUERST (GEMESSEN, Schritte 1-3): Alt-Projekt mit ab_test_started_at NULL ->
    die Varianten-Sektion bleibt SICHTBAR (K4-B, der Legacy-Fall), ihre Zahlen treffen
    EXAKT die UNGEFILTERTEN Aggregate (K3 — der Filter degradiert, statt alles zu
    verschlucken), und die Beschriftung lautet "Ohne Zeitabgrenzung". Die Bestandskacheln
    stimmen 1:1 mit den rohen Gruppen-Queries (K7).
  - ZEITFILTER — DER KERNNACHWEIS (GEMESSEN, Schritt 6): dieselbe Aggregation zweimal.
    MIT Zeitfilter 2 PageViews und 2 Purchases (der frische Lauf). OHNE Zeitfilter 9
    PageViews, 4 Purchases und 71 NULL-Events (39 PageViews / 32 Purchases). DIE DIFFERENZ
    ist der Beweis, nicht die Anzeige: läge alles im Fenster, wäre ein entfernter Filter
    nicht unterscheidbar.
  - DAS ALTZEILEN-RAUSCHEN IST WEG (GEMESSEN, Schritt 7): variant IS NULL AND created_at
    >= started_at = 0 -> die Zeile "Ohne Varianten-Zuordnung" wird im UI NICHT gerendert
    (J13). Genau die 71 aus 9c-1, die dort als unbrauchbares Signal ausgewiesen waren,
    fallen aus dem Lauf heraus — der in 9c-1 nur hergeleitete Nutzen des Delimiters ist
    damit GEMESSEN.
  - REFETCH OHNE RELOAD (GEMESSEN, Schritte 5/8/9): START -> die Anzeige springt SOFORT auf
    "Noch keine Daten in diesem Testlauf." mit "Zeitraum: seit Teststart am …". STOPP ->
    ab_test_started_at in der DB unverändert, die Sektion bleibt sichtbar, und die
    Beschriftung BEHÄLT den Zeitstempel (K2; ein "?? null" im Handler hätte ihn hier
    gewischt). NEUSTART -> neuer Zeitstempel > alter.
  - EIN NEUSTART LÖSCHT NICHTS (GEMESSEN, Schritt 9): die Zahl der Zeilen mit Variante
    blieb ÜBER den Neustart hinweg unverändert (21 zum Zeitpunkt dieser Messung). Tragend
    ist der VORHER-NACHHER-Vergleich, nicht der Absolutwert.
  - UHREN (GEMESSEN, Schritt 4): extract(epoch from (now() - ab_test_started_at)) =
    +36,33 Sekunden, KEIN negativer Versatz.
    WAS DAS ZEIGT UND WAS NICHT: gemessen wird die SUMME aus Uhrenversatz und Bedienzeit,
    nicht der Versatz allein. Ein positiver Wert in Sekundenhöhe belegt nur, dass keine
    GROBE Abweichung vorliegt; negativ wäre das rote Signal gewesen (App-Uhr vor der
    DB-Uhr -> die ersten Ereignisse eines Laufs fielen aus dem Fenster).
  - MANDANTEN (GEMESSEN, Schritt 10): fremder JWT (authenticated) -> 0 Zeilen;
    Positivkontrolle -> Zeilen.
    EHRLICHE EINORDNUNG, die dazugehört: die Positivkontrolle lief als SUPERUSER und
    belegt damit nur, dass die Funktion überhaupt Zeilen liefert. Dass der
    AUTHENTIFIZIERTE OWNER sie sieht, belegt das Dashboard selbst (Schritte 1-3, 5, 6) —
    es liest über die Session des Nutzers. Beide Hälften liegen vor, aber auf ZWEI
    verschiedenen Wegen; als EIN Beweis darf das nicht gelesen werden.
  - KILL-SWITCH-RANDPROBE (GEMESSEN, Schritt 11): gesperrtes Projekt -> Live-URL 451, das
    Dashboard inklusive Varianten-Auswertung bleibt lesbar (reiner Lesepfad).
  - NACHTRAG-QUERY (GEMESSEN zu einem SPÄTEREN Zeitpunkt als Schritt 9 — deshalb NICHT mit
    den Zahlen oben verrechenbar): server __ps_pageview 12, server Purchase 6, browser
    Purchase 6.
    WAS SIE ZEIGT: die BROWSER-Bestätigungszeilen tragen tatsächlich eine Variante — die
    9b-2-Entscheidung ("geschrieben wird auf BEIDEN Zeilen") ist damit unabhängig
    nachgemessen. Und die Struktur stimmt: __ps_pageview erscheint NUR server-seitig,
    Purchase server UND browser; PageViews bekommen kein Bestätigungs-Beacon.
    WAS SIE NICHT ZEIGT: eine Rekonstruktion der 21 aus Schritt 9. Zahlen VERSCHIEDENER
    Zeitpunkte rückwärts zu verrechnen wäre unzulässig und wird hier NICHT versucht — die
    21 hatte genau eine Aufgabe (belegen, dass ein Neustart nichts löscht), und dafür
    zählt der Vorher-Nachher-Vergleich.
  - WAS DER NACHWEIS NICHT ZEIGT (ausdrücklich):
    (a) Die Rate bleibt "je Seitenaufruf", NICHT je Besucher — der Confounder aus dem
        Entscheidungs-Record ist unberührt und ungemessen.
    (b) KEINE Aussage über die Verteilung unter echtem Traffic.
    (c) Der Uhren-Vergleich misst Versatz PLUS Bedienzeit, nicht den Versatz allein.
    (d) Der Fall "zweiter Tab" (Beschriftung älter als das Fenster) bleibt möglich und ist
        gutartig: ein Reload heilt ihn.
- FÄLLIG GEWORDEN, NICHT IN DIESER RUNDE ERLEDIGT:
  (1) AUSLAGERUNG DES PHASE-9-BLOCKS nach docs/claude-history/phase-9-ab-testing.md. Sie
      läuft in ZWEI GETRENNTEN Runden, und die Reihenfolge ist UMGEKEHRT zur früheren
      Beschreibung: ZUERST die HEBUNG dauerhaft gültiger Regeln nach "## Immer beachten"
      (Ermessenssache, Stefan entscheidet je Kandidat), DANACH die rein MECHANISCHE
      Verschiebung des Rests — ohne Verdichten, ohne Umformulieren. Grund für die
      Reihenfolge: was gehoben werden soll, muss noch am Ort seiner Herleitung stehen,
      wenn darüber entschieden wird. HEBUNGS-KANDIDAT, benannt: der Satz zur dreiwertigen
      Logik aus dem "AUS DEM BAU"-Block oben.
  (2) PROBENLAUF supabase/checks/db-stand.sql. "## Aktueller DB-/Analytics-Stand" trägt
      seit 9c-1 zwei markierte Nachträge UND ist durch 0020 an weiteren Stellen veraltet
      (Migrationsstand, Funktionszahl, Spaltenliste projects). EIN Lauf deckt alles ab; er
      ist eine EIGENE Runde. Hier werden bewusst KEINE neuen Werte hineingeschrieben — ein
      geratener Ist-Zustand wäre schlimmer als ein als veraltet markierter.

### Fix-Scheibe safeAction — Client-Fehlerbehandlung (ABGESCHLOSSEN — live bewiesen 2026-07-27, Commit bd05e34)
WARUM DIESER ABSCHNITT HIER STEHT (sonst wirkt er später deplatziert): Die Scheibe ist
KEINE A/B-Arbeit. Sie steht hier, weil es keine History-Datei zur Client-Fehlerbehandlung
gibt und eine neue für eine einzelne Scheibe Wildwuchs wäre; bei der nach 9c fälligen
Phase-9-Auslagerung reist der Abschnitt mit, und die thematische Entscheidung fällt dann
EINMAL statt zweimal.
- WAS GEBAUT WURDE: src/lib/safe-action.ts (reine Datei, bewusst OHNE server-only, damit
  client-importierbar). Exporte: safeAction, actionThrew, ACTION_THROW_MESSAGE,
  SAVE_THROW_MESSAGE. Die Dauerregel steht in "## Immer beachten"
  ("CLIENT-SEITIGE SERVER-ACTION-AUFRUFE").
- GEMESSENER BESTAND (2026-07-28, am Code erhoben): 24 Server-Action-Aufrufe aus
  Client-Code, 0 unbehandelt. Drei Muster:
  (1) Handler mit Busy-/Fehlerzustand -> safeAction: 15x CodeImporter.tsx, dazu
      DomainManager.tsx loadList (via handleAdd/onChanged) und handleManualCheck.
  (2) Lade-Effekt MIT Fehlerkanal -> safeAction: DomainManager.tsx Projektwechsel-Load
      (zeigt "Laden fehlgeschlagen", bewusst getrennt vom Leerzustand).
  (3) Lade-Effekt OHNE Fehlerkanal: CodeImporter.tsx 3x via .catch() auf den Leer-Wert,
      DomainManager.tsx Auto-Poll via safeAction. BEIDE Formen sind nach der Dauerregel
      zulässig — hier hängt kein UI-Zustand am Aufruf.
  Muster (2) ist der Grund, warum die Regel nicht an "Handler vs. Effekt" hängt.
  login/page.tsx ruft KEINE Server-Action, sondern direkt den Browser-Supabase-Client —
  liegt außerhalb des Musters.
- TESTS: 13 (7 Unit in safe-action.test.ts, 6 Integration in CodeImporter.test.tsx).
  HERVORZUHEBEN, weil es eine TAUTOLOGIE VERMEIDET: Der Secret-Test lässt den Fehler den
  Token im Klartext TRAGEN und prüft alle fünf console-Methoden per String(a), NICHT per
  JSON.stringify — letzteres liefert auf einem Error-Objekt "{}", und der Test wäre hohl
  durchgelaufen.
- VERIFIZIERT (live, 2026-07-27): Offline-Test in Produktion (DevTools offline, Speichern)
  — die Meldung erscheint, der Button ist wieder klickbar, der zweite Versuch gelingt OHNE
  Reload. Das ist der Kernbeweis: der blockierte Zweitversuch war der schwerste Teil des
  Befunds.
- WAS DER NACHWEIS NICHT ZEIGT (ausdrücklich): DomainManager.test.tsx enthält KEINEN
  Wurf-Test — die 6 gewrappten Aufrufe dort sind nur durch den Unit-Test von safeAction
  selbst gedeckt, nicht durch einen Integrationstest an ihrem eigenen UI-Fehlerkanal. Ein
  Live-Test der Domain-Pfade unter Wurf ist nicht protokolliert.
- HINWEIS ZUR NUMMERIERUNG: Code und Tests tragen Vermerke der Form "AUFLAGE n" /
  "Invariante n". Diese Nummern stammen aus dem Stufe-1-Plan der Bau-Session und sind im
  Repo NICHT auflösbar (am 2026-07-28 repo-weit gesucht, kein Dokument gefunden); ihre
  Zählung deckt sich NICHT mit den Auflagen (1)/(2)/(3) des zurückgezogenen Offenen Punkts.
  Die Nebenbedingungen (i)-(iii) der Dauerregel in "## Immer beachten" sind die inhaltlich
  gültige Fassung — sie ERSETZEN die Code-Nummerierung nicht und sind nicht deckungsgleich
  mit ihr.

### Scheibe Leere-Variante-Riegel — Publish verweigert leeren Inhalt (ABGESCHLOSSEN — live bewiesen 2026-07-28, Commit 5d1ce25)
WARUM DIESER ABSCHNITT HIER STEHT: Die Scheibe ist KEINE A/B-Arbeit — sie repariert einen
Publish-Befund. Sie steht hier, weil sie an publishProject UND am Varianten-Modell hängt
(beide Varianten werden in EINEM Write publiziert) und bei der nach 9c fälligen
Phase-9-Auslagerung mitreist. Gleiche Erwägung wie beim safeAction-Abschnitt darüber: die
thematische Entscheidung fällt dann EINMAL statt zweimal.
STATUS: gebaut, live bewiesen, Offener Punkt zurückgezogen. B1-B7 unten sind die
HERLEITUNG (Stand der Entscheidung vor dem Bau) und bleiben inhaltlich stehen; was der Bau
und der Live-Test daran präzisiert haben, steht im VERIFIZIERT-Block am Ende — nicht in
B1-B7 eingearbeitet, damit Entscheidungsgrundlage und Messergebnis unterscheidbar bleiben.

- B1 — BEFUND UND ENTSCHIEDENE RICHTUNG
  BEFUND: Der SERVER macht aus einem leeren Eingang eine NICHT-leere Ausgabe —
  injectPageViewEmitter liefert bei leerem Input den reinen Emitter (~716 Zeichen: 680
  GEMESSEN am Template mit leerem Key-Literal, +38 für den JSON-kodierten
  UUID-trackingKey; die 716 sind gerechnet, nicht gemessen). Die Nicht-Leer-Prüfung
  greift dadurch ins Leere: sie sieht nur noch das Ergebnis der Injektion.
  ENTSCHIEDEN: Riegel auf dem EINGEHENDEN functionalHtml BEIDER Varianten, VOR der
  Emitter-Injektion. Fail-closed. Er prüft damit exakt den String, der publiziert wird —
  zwischen Prüfung und Write liegt nichts als die Injektion selbst.
  VERWORFEN, je mit Grund (damit niemand sie als "einfacher" wiederentdeckt):
  (a) PRÜFUNG GEGEN DIE PROJEKTZEILE (owned.html / owned.html_b): GEMESSEN widerlegt —
      Publish läuft UNABHÄNGIG von Save (handlePublish ruft weder saveProject noch
      saveVariantB), die Zeile ist zum Publish-Zeitpunkt nicht verlässlich. Der Riegel
      entschiede in BEIDE Richtungen falsch: leerer Draft mit gefüllter Zeile würde
      DURCHGELASSEN, gefüllter Draft mit leerer Zeile FÄLSCHLICH BLOCKIERT. Zusätzlich
      unbrauchbar, weil html_b = "" erlaubt ist — die Zeile darf selbst leer sein.
  (b) PRÜFUNG AUF DEM ROH-HTML (snapshot.html + neues Feld für B): prüft NICHT den String,
      der geschrieben wird. Zwischen Roh-HTML und functionalHtml sitzt generateFunctional
      auf dem CLIENT — und genau diese Naht (Client baut, Server speichert blind) ist die,
      an der der Befund entstand. Dazu eine Signaturänderung und damit ein
      Deploy-Skew-Fall (alter Tab schickt das neue Feld nicht -> fail-closed-Ablehnung
      eines gesunden Publishes), den die entschiedene Richtung gar nicht erst erzeugt.
  (c) BEIDES PRÜFEN: löst zusätzlich ein Problem, das niemand gemeldet hat. Die
      Absicherung, um die es dabei ginge, leistet der Äquivalenz-Test (B2/Auflage 2)
      billiger und schärfer — ein Test wird BEIM BAUEN rot, eine Laufzeitprüfung erst
      BEIM NUTZER.
  (d) NUR DEN CLIENT-BUTTON REPARIEREN: ließe den Server fail-open; jeder Weg an der UI
      vorbei (alter Tab, Direktaufruf der Action) publizierte weiter leer. Autorität ist
      der SERVER-Riegel.
- B2 — TRAGENDE PRÄMISSE (GEMESSEN, nicht angenommen)
  generateFunctional gibt bei leerem ODER whitespace-only Roh-HTML "" zurück. Die Prüfung
  steht als ERSTE Anweisung im Rumpf — VOR dem SSR-Guard, VOR dem DOMParser, VOR der
  Meta-Injektion. Sie greift damit AUCH bei konfigurierter Pixel-ID: ein leeres Projekt mit
  Pixel erzeugt KEIN nicht-leeres Dokument.
  DARAUS FOLGT DIE ÄQUIVALENZ: leerer Roh-Input GENAU DANN, wenn leeres funktionales
  Dokument. Sie ist der Grund, warum CLIENT-Guard (prüft Roh-HTML) und SERVER-Riegel (prüft
  functionalHtml) EIN Urteil sind und nicht zwei — trotz unterschiedlicher Eingaben.
  SIE IST FRAGIL: Verschiebt jemand diese eine Zeile unter die Meta-Injektion, bricht die
  Äquivalenz STILL, und die Begründung für Invariante (v) fällt mit ihr. Deshalb wird sie
  per Test FESTGENAGELT, nicht behauptet.
- B3 — SECHS AUFLAGEN (alle sechs sind Teil der Entscheidung, keine Empfehlungen)
  (1) PLATZIERUNG: Der Riegel sitzt NACH dem Ownership-Gate und NACH dem
      hasVariantB-Guard, aber VOR dem Label-Block. Grund, der über Stil hinausgeht: der
      Label-Block SCHREIBT bereits (insertDomainLabel / assignDomainLabel). Läge der
      Riegel danach, hinterließe ein ABGELEHNTER Publish eine frische domains-Zeile — eine
      Live-URL, die nie Inhalt bekommt. EIN TEST MISST DAS, NICHT DER KOMMENTAR (Assertion:
      nach einer Ablehnung existiert keine Label-Zeile).
  (2) DER ÄQUIVALENZ-TEST IST PFLICHT, nicht optional — s. B2. Er muss rot werden, wenn die
      Leer-Prüfung in generateFunctional unter die Meta-Injektion wandert.
  (3) DER CLIENT-GUARD SPERRT, ER BERÄT NICHT. KEIN Widerspruch zu 9b-1p: dort war der
      Hinweis BERATEND, weil sein Wert aus einem ASYNCHRONEN Server-Read kam und ein
      hängender Ladevorgang keine funktionierende Aktion sperren darf. HIER ist der Wert
      lokaler State, synchron, immer bekannt — es gibt keinen "unbekannt"-Zustand.
      Autorität bleibt trotzdem der SERVER: der Button ist Komfort, der Riegel ist die
      Garantie. Dazu ein Hinweistext, der benennt, WELCHE Variante leer ist — ohne ihn ist
      ein grauer Button bei gefülltem Editor (Fall: A leer, B aktiv) unerklärlich.
  (4) DER RIEGEL SPIEGELT DIE WRITE-BEDINGUNG. Geschrieben wird B NUR bei
      hasVariantB && variantB. Prüft der Riegel B unabhängig davon, lehnt er einen
      LEGITIMEN Publish ab: ein Client, der noch ein variantB im Zustand hält, während die
      Spalte bereits null ist (gerade entfernte Variante, alter Tab), würde blockiert,
      obwohl sein B gar nicht geschrieben würde. Beide Stellen nutzen DIESELBE Bedingung —
      am besten dasselbe const. EIGENER TEST: hasVariantB false + Client schickt leeres
      variantB -> Publish GELINGT.
  (5) DIE PAAR-ABLEITUNG WIRD GETEILT, NICHT DUPLIZIERT. pairA/pairB werden heute INNERHALB
      von handlePublish abgeleitet; der Button braucht dieselben Werte. Eine zweite
      Ableitung für die disabled-Bedingung wären ZWEI Stellen, die "welche Variante trägt
      was" beantworten — exakt die Konstellation, aus der der 9b-1-Befund kam. Hochziehen
      in einen geteilten Memo, handlePublish nutzt denselben.
      ZU DEKLARIEREN (Verhaltensänderung, nicht stillschweigend einführen): der Memo hängt
      an debouncedCode, der Button damit auch — heute liest er das ungedebouncte code.
      Beide Richtungen sind sicher (Button wird spät frei oder spät gesperrt, der Server
      bleibt Autorität), aber es IST eine Änderung und wird benannt.
  (6) DER MELDUNGSTEXT NENNT DEN AUSWEG. Ein Projekt mit leerem html_b ist nach dem Fix
      KOMPLETT unveröffentlichbar — auch A. Das ist richtig fail-closed, aber der Owner
      muss wissen wohin: B FÜLLEN ODER B ENTFERNEN. Ein Text, der nur "Variante B ist leer"
      sagt, produziert einen Support-Fall.
- B4 — GESCHÜTZTE INVARIANTEN
  (i)   EIN Publish schreibt BEIDE Varianten in EINEM atomaren Write; ein ABGELEHNTER
        Publish schreibt GAR NICHTS.
  (ii)  Für Projekte OHNE B bleibt das published_content-Key-Set byte-gleich (kein
        Schema-Drift).
  (iii) Der Label-Block bleibt unangetastet — s. Auflage (1).
  (iv)  KEIN server-seitiges HTML-Parsing, KEINE neue Dependency: die Prüfung ist typeof +
        trim.
  (v)   EIN geteiltes Prädikat aus der REINEN Datei, KEIN drittes Urteil. Dieselbe Regel
        gilt für ALLE VIER Stellen: Serve A, Serve B, Aktivierungs-Riegel, Publish.
  (vi)  FAIL-CLOSED: Lässt sich nicht sicher feststellen, dass Inhalt existiert, wird
        abgelehnt — nicht durchgelassen.
  (vii) Prädikat UND Meldungstexte gehören in die REINE Datei, nicht in die
        "use server"-Datei (7c-2c-ReferenceError).
- B5 — EHRLICHE GRENZE (steht hier, damit sie nicht später als Lücke "entdeckt" wird)
  Der Guard stellt STRING-Leere fest, NICHT visuelle Leere. Nicht abgedeckt und auch nach
  dem Fix durchgelassen: "<div></div>", ein reiner Kommentar, Inhalt mit display:none,
  Inhalt der erst durch JS entstünde. Das lückenlos zu entscheiden verlangte PARSING (per
  Dauerregel ausgeschlossen) PLUS RENDERING (eine Headless-Browser-Abhängigkeit auf dem
  Publish-Pfad) — beides ist die falsche Antwort auf diesen Befund.
  WAS DER GUARD LEISTET, PRÄZISE: er schließt den Fall, in dem der SERVER SELBST aus einem
  leeren Eingang eine nicht-leere Ausgabe macht. Das ist der gemeldete Befund — NICHT MEHR.
- B6 — BESTANDSDATEN: GEMESSEN 2026-07-28, KEINE FUNDE
  Zwei NUR LESENDE Blöcke im SQL-Editor gefahren, VOR dem Bau — danach wäre nicht mehr
  unterscheidbar, ob eine Zeile alt oder neu ist.
  - Bereits veröffentlichte, praktisch leere Seiten: KEINE. Zwei Treffer der bewusst
    großzügigen Längenschwelle (924 und 1019 Zeichen) sind FALSCHPOSITIVE — bei ~716
    Zeichen Emitter bleiben ~208 bzw. ~303 Zeichen echter Nutzerinhalt, und die Auszüge
    zeigen Titel, Überschrift und Button. Kleine Testseiten, keine leeren.
  - Projekte mit html_b = "" (die der neue Riegel KOMPLETT aussperren würde): KEINE.
  FOLGE: Die Scheibe ist reine VORWÄRTSSICHERUNG. Kein Aufräumteil, kein Reparaturweg,
  kein neuer Offener Punkt. Falls je eine kaputte Zeile auftaucht: der operative Notweg
  existiert OHNE neuen Code — published_content für das Projekt auf null setzen, dann
  liefert der Serve-Pfad 404 statt einer leeren Seite (für einen Besucher der ehrlichere
  Zustand). OPS-EINGRIFF, KEIN FEATURE.
- B7 — KEINE MIGRATION
  Reine Anwendungslogik plus Tests: kein Schema, keine Spalte, kein Constraint, keine
  Policy, keine Funktion. Damit greifen WEDER die Protokoll-Pflicht ab 0018 NOCH die
  Backup-Wiedervorlage — beide hängen an einer AUSGEFÜHRTEN Migration, nicht an einem
  Deploy. Die nächste freie Nummer bleibt 0019.
- VERIFIZIERT (live, 2026-07-28), Commit 5d1ce25; Tests 579 -> 606 in unverändert 38 Dateien:
  - REGRESSION ZUERST (GEMESSEN): Projekt OHNE Variante B publisht unverändert. Projekt
    mit BEIDEN Varianten gefüllt publisht ebenfalls, und die Live-URL zeigt weiterhin A.
  - CLIENT-GUARD, ALLE DREI MELDUNGSTEXTE LIVE GESEHEN, jeder im richtigen Fall (GEMESSEN):
    ohne Variante B der neutrale Satz; bei leerer Variante A der A-Text; bei leerer
    Variante B der B-Text INKLUSIVE Ausweg ("oder entferne sie"). Der Button ist in allen
    drei Fällen gesperrt.
    DAS BELEGT MEHR ALS DIE TEXTE: ein Guard, der nur die AKTIVE Variante kennt (das alte
    code.trim()), könnte den A-Text bei aktiver Variante B gar nicht erzeugen. Die drei
    Texte im richtigen Fall sind damit der Live-Nachweis, dass das Prädikat über
    pairA/pairB läuft und nicht über code.
  - A/B-KETTE (GEMESSEN): Test gestartet, PC liefert B, mobiles Safari liefert A,
    Stickiness hält je Gerät. Der Fix hebelt den 9b-1-Riegel nicht von hinten aus.
  - KILL-SWITCH (GEMESSEN): gesperrtes Projekt weiterhin 451.
  - BESTANDSPROBE NACH DEM DEPLOY (GEMESSEN): unverändert nur die zwei bekannten
    Falschpositive (924 / 1019 Zeichen, beide mit echtem Nutzerinhalt), KEINE neue Zeile.
  - MOUNT-FENSTER (GEMESSEN): der Debounce-Effekt aus Auflage (5) ist im Browser nicht
    sichtbar — bei einem gefüllten Projekt erscheint beim Öffnen des Panels kein
    Leer-Hinweis.
  - NICHT LIVE AUSLÖSBAR — DER SERVER-RIEGEL (ausdrücklich vermerkt, damit es niemand
    später als Lücke "entdeckt"):
    Der Server-Riegel wurde live NICHT ausgeführt. Der Client-Guard sperrt den Button,
    bevor ein Request entstehen kann. Ein Versuch, ihn per DevTools zu umgehen
    (disabled-Attribut entfernt, dann geklickt), erzeugte KEINEN Request — kein
    Netzwerkeintrag, keine Textänderung, keine Console-Meldung.
    URSACHE UNGEKLÄRT, ABER NICHT IN DER APP (am Code erhoben 2026-07-28): handlePublish
    trägt KEINEN Leer-Guard (einziger früher Return ist if (!projectId) return, aus
    Phase 7a), der Button trägt onClick direkt, type="button", es gibt keinen
    Capture-Handler, kein inert/fieldset, kein pointer-events-none, keine Eltern-Handler
    und keine periodische Re-Render-Quelle. Am Code kann der Klick den Handler nur
    erreichen. Die verbleibenden Kandidaten liegen in der MESSMETHODE (React stellt
    disabled beim Re-Render wieder her; ein Klick auf einen disabled-Button erzeugt gar
    kein Event) — VERMUTUNG, NICHT GEMESSEN, und ausdrücklich als solche vermerkt.
    FOLGE FÜR DIE MESSUNG: Die Domains-Query nach der "Ablehnung" liefert null Zeilen, ist
    aber KEINE Positivkontrolle — es kam kein Request an, die Null ist trivial wahr.
    WOFÜR DER SERVER-RIEGEL DANN DA IST: für den Fall, den der Browser nach dem Deploy
    nicht mehr herstellen kann — ein Tab, der VOR dem Deploy geöffnet wurde, trägt das alte
    Bundle mit dem alten code.trim()-Guard, lässt den Klick durch und trifft auf den neuen
    Server. Dazu jeder Weg an der UI vorbei.
    BELEGT IST ER DURCH TEST UND MUTATION, nicht durch den Live-Blick: sechs neue
    Unit-Tests in publish.test.ts — vier auf dem Ablehnungspfad (T1/T2/T3/T5) und zwei als
    Positiv-Gegenprobe (T4 Regression, T10 Write-Bedingung), ohne die die vier eine
    Tautologie wären —, und die Platzierung vor dem Label-Block durch eine scharfe
    Mutationsprobe — mit hinter den Label-Block verschobenem Riegel erschien die Label-Zeile
    p-9lwm0k, also genau der reale Schaden. Nachweis bleibt der Test, nicht der Live-Blick —
    gleiches Muster wie der 9b-1p-Fall "Variante B existiert bereits".
  - PRÄZISIERUNG ZU B2 (aus dem Bau, gemessen): Der PIXEL ist NICHT der eigentliche Hebel
    der Äquivalenz. Bei leerem HTML gibt es keine data-pagesmith-id-Anker, die
    Mapping-Tabelle bleibt leer, und im Export-Modus injiziert generateFunctional ohnehin
    keine Scripts. Was ohne den frühen Leer-Ausstieg herauskäme, ist das leere
    Dokument-SKELETT (<!DOCTYPE html><html><head></head><body></body></html>) — nicht-leer
    genug, um die Äquivalenz zu brechen. Die Pixel-Fixtures sind Gürtel und Hosenträger;
    der Hebel ist der frühe Ausstieg. Die Mutationsprobe hat das gezeigt: erst als der
    Ausstieg GANZ entfernt wurde, wurden alle sechs Leer-Fixtures rot (eine erste, zu
    schwache Mutation ließ die Prüfung kurzschließen und blieb grün).
  - AUFLÖSUNG DER T8-OFFENHEIT (aus dem Bau): Der Zustand "A leer, B aktiv" ist über die UI
    NICHT erzeugbar (der Speichern-Button sperrt bei leerer aktiver Variante), über den
    LADEPFAD aber sehr wohl — weder html noch html_b tragen eine Nicht-Leer-Bedingung. T8
    modelliert deshalb eine reale DB-Zeile und erzeugt den Zustand durch einen ECHTEN
    UI-Klick, nicht durch geseedeten internen State.

