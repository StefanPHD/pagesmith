## Phase 6 — Server-Side Tracking (CAPI)
Charakterwechsel: erster echter Server-Code (Next.js API-Route mit Logik), erstes
echtes Secret (Meta-CAPI-Access-Token, NICHT NEXT_PUBLIC, nie in Browser/Export),
erstmals Multi-Tenant-Secret-Storage (Token pro Marketer/Projekt in der DB, nicht .env).

Pfad-Entscheidung (Owner, endgültig): CAPI-Proxy JETZT auf der Pagesmith-Domain
bauen (NICHT Hosting zuerst). Begründung: ein Pagesmith-Domain-Proxy liefert den
Kern-Wert ab Tag 1 — bessere Match-Quality, Event-Dedup (Browser-Pixel + CAPI mit
gemeinsamer event_id, Metas empfohlenes Setup), Resilienz gegen verlorene
Browser-Events (iOS-ITP, Pixel-JS-Ausfall).

Hosting-Nuance (bewusst dokumentiert): VOLLE Adblocker-Resistenz braucht einen
First-Party-Endpoint auf DERSELBEN Domain wie die Seite -> das liefert erst Phase 7
(Hosting/Custom Domains). Bis dahin ist der Proxy third-party (pagesmith-Domain);
der Server-Side-Wert ist schon jetzt da, die Adblocker-Resistenz reift mit Phase 7
zur Endform. Trade-off: ein selbst-gehosteter Export hängt fürs Tracking zur
Laufzeit an Pagesmiths Server ("telefoniert nach Hause") — mit Hosting natürlich,
davor eine Kopplung.

Consent-Gate ist KEIN optionales Advanced-Feature: im DACH-Raum ist
Tracking-vor-Consent rechtlich scharf. Die erste echte Tracking-Scheibe muss
mindestens consent-gate-FÄHIG feuern (Hook "erst nach Consent-Signal"); volle
Cookiebot/Usercentrics-Integration ist eine spätere Scheibe.

Secret-Storage (offene Bau-Entscheidung, beim Proxy-Slice klären): der CAPI-Token
liegt pro Projekt server-seitig — server-only-Pfad (eigene Tabelle, nur über
Server-Session lesbar, RLS) ODER Verschlüsselung at rest. Die service_role-Frage
wird hier erstmals echt -> bewusst entscheiden, nicht reflexhaft.

OMNICHANNEL-AUSBLICK (Owner-Direktive): Pagesmith wird Omnichannel-Tracking-Plattform.
Nach Meta folgen Google, TikTok, Pinterest und ein "Custom Pixel Code" (rohes Snippet).
Architektur-Konsequenz JETZT (Form, KEINE Maschinerie — "Abstraktion erst bei 2+ Fällen"):
- settings ist plattform-GENESTET: settings.pixels.<platform>.<config>. Meta =
  settings.pixels.meta.pixelId. Custom-Code-Plattform später = settings.pixels.custom.code
  (andere Shape erlaubt). KEINE flachen metaPixelId-Keys, nie Migration pro Plattform.
- Meta-Feuer-/Injektions-Logik als isolierte Einheit (Plattform #2 = parallele Einheit,
  kein Umbau). KEINE generische Registry, solange nur Meta existiert.
BEWUSST AUFGESCHOBEN (an Plattform #2, 2+ Fälle): Fan-out (ein Intent -> alle Pixel, mit
Event-Taxonomie-Mapping) vs. Per-Plattform-Event. Deshalb bleibt TrackConfig plattform-
AGNOSTISCHER Intent ohne platform-Feld -> am wenigsten festlegend, beides später additiv.
BEGRIFFSTRENNUNG: "Custom Event" = Event mit freiem Namen (fbq trackCustom), 1b-Sache.
"Custom Pixel Code" = ganze Plattform unter pixels.custom, spätere Scheibe. Nicht verwechseln.

Decomposition (Owner-bestätigt):
- Scheibe 0 — (elementId, type)-Compound-Key-Migration (STRUKTURELL, kein Feature). JETZT.
- [x] Scheibe 1a — Mehr-Aktion strukturell: track-Union-Zweig + Panel mehr-aktionsfähig
        + Wiring-byId->Array + vier latente Fixes. Stub-Firing, Meta zuerst. ABGESCHLOSSEN (live).
- [x] Scheibe 1b — Meta-Pixel-Semantik: settings-jsonb-Blob (Migration 0004,
  plattform-genestet) + projektweite Meta-Pixel-ID-UI + TrackConfig {event,value?,
  currency?,isCustom?} + Standard-Event-Dropdown (+ Custom-Zweig) + value/currency
  dynamisch + stub->fbq mit eventID + Consent-Hook (gated auch init) + Base-Pixel im
  Export OHNE Auto-PageView. ABGESCHLOSSEN (live). Damit ist Scheibe 1 (Tracking-Tile +
  echtes Meta-Pixel) KOMPLETT.
- [x] Scheibe 2a — Secret-Plumbing: project_tokens-Tabelle (server-only, RLS SELECT-gesperrt),
  write-only maskierte Token-UI, trackingKey (öffentlich, in settings), capiTokenSet-Boolean
  (settings, für Indikator), service_role-Read-Helper. Token-WRITE via service_role NACH
  explizitem Ownership-Gate (write-only-Sperre lässt authenticated-Upsert am RETURNING-Read
  scheitern). KEIN Forward. ABGESCHLOSSEN (live).
- [x] Scheibe 2b-i — CAPI-Route: anonyme cross-origin API-Route, trackingKey->Config-Resolver
  (pixelId+token serverseitig), Meta-Graph-CAPI-Forward mit event_id. KEIN Client/Beacon/
  Wiring. ABGESCHLOSSEN (live, Server-Event bei Meta verarbeitet). Nächster Schritt: 2b-ii
  (Client-Beacon + Dedup).
- [x] Scheibe 2b-ii — Client-Beacon/Dedup: navigator.sendBeacon an /api/capi neben fbq,
  hinter demselben psConsent, mit GETEILTER eventID, text/plain-Blob, absoluter
  env-abgeleiteter proxyURL im Export. ABGESCHLOSSEN (Mechanik live; Dedup-Sichtbarkeit
  -> Phase 7). Alle Scheiben (0,1a,1b,2a,2b-i,2b-ii) sind jetzt [x].
- Scheibe 3 — Consent-Gate.

### Scheibe 0 — (elementId, type)-Compound-Key-Migration (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert (No-Regression-Smoke: Redirects, Text-Live-Patch,
Waisen-Netz, Dirty/Guards, Badges — alle unverändert). Commit
"refactor(mappings): key on (elementId, type) for multi-action support". Pipeline grün
(tsc/lint/build + diskriminierendes Zwei-Mapping-Fixture: upsert/find/remove/equal auf
(elementId,type)). Reiner Code-Schlüssel-Wechsel, KEINE DB-Migration, kein Verhalten
geändert. Der alte Test "upsert/remove per elementId, unabhängig vom Typ" (kodierte das
type-agnostische Keying) wurde durch die Compound-Key-Fälle ersetzt — invertierte
Assertion, nicht aufgeweicht. Same-(id,type)-Replace-Pfad (Redirect-URL neu setzen ->
Länge bleibt 1, config aktualisiert) bleibt getestet grün abgedeckt.
findMapping-Missbrauch im Relink-Überschreib-Schutz wurde auf
some(m => m.elementId === target) umgestellt (heute verhaltensgleich; in Scheibe 1
typ-aware zu machen).

Ziel: den Identitäts-/Lookup-Schlüssel der Mappings von elementId auf
(elementId, type) umstellen, mit NULL Verhaltensänderung für die heutigen
Redirect-/Text-Features. Voraussetzung für Tracking (Redirect UND Tracking auf
EINEM Element). Setzt den seit dem Redirect-Schritt in mappings.ts notierten
Kommentar um.

Warum risikoarm: Redirect- und Text-Kandidaten sind DISJUNKT -> heute trägt KEIN
Element zwei Mappings -> unter (elementId, type) KEINE Kollision in bestehenden
Daten. Folge: KEINE DB-Migration, KEINE Datentransformation, Lade-Pfad unverändert
— reiner Code-Schlüssel-Wechsel, sicherer noch als 3.3 (das Live-Daten anfasste).

Betroffen (nur src/lib/mappings.ts + Aufrufer + Tests):
- upsertMapping: matcht/ersetzt auf (elementId, type) statt nur elementId; sonst append.
- findMapping(mappings, elementId, type): typisierter Single-Lookup. Plus Badge-Bedarf
  "hat Element IRGENDEINE Aktion?" als some(m => m.elementId === id).
- removeMapping(mappings, elementId, type): entfernt genau den (elementId, type)-Eintrag.
- mappingsEqual: mengenbasiert pro (elementId, type) statt pro elementId. Dirty:
  zweites Mapping (gleiche id, anderer Typ) = dirty; Umsortieren != dirty.
- displayTextFor: findet das (id, "text")-Mapping (Logik unverändert, nur Schlüssel).
- findOrphans: ps-id-Präsenz, typ-agnostisch -> beim Bau VERIFIZIEREN, dass es N
  Mappings pro ps-id trägt (mehrere Orphans pro fehlender id), auch wenn das erst
  mit Tracking auftritt.
- generate.ts (Engine): flache Iteration + Typ-Verzweigung -> sollte UNBERÜHRT sein;
  VERIFIZIEREN, dass keine Ein-Mapping-pro-Element-Annahme existiert.
- CodeImporter.tsx: Aufrufer übergeben den intendierten type; selectedMapping-Ableitung
  bleibt UI-seitig Ein-Aktion (kein zweiter Slot, kein Tile -> UI sieht IDENTISCH aus).

Diskriminierende Tests (Pflicht — sonst hohl, weil heute kein Element zwei Mappings
hat): SYNTHETISCHES Fixture mit zwei Mappings unterschiedlichen Typs auf EINEM
elementId:
- upsert(redirect auf id) verändert ein text-Mapping auf derselben id NICHT (umgekehrt ebenso).
- findMapping(id,"redirect") != findMapping(id,"text").
- remove(id,"redirect") lässt das text-Mapping auf id intakt.
- mappingsEqual: {redirect+text auf id} != {nur redirect auf id}; Umsortieren == gleich.
- Gegenprobe: ALLE bestehenden Redirect-/Text-Tests bleiben OHNE Änderung grün (eine
  nötige Test-Änderung = Signal für ungewollte Verhaltensänderung -> melden, nicht
  still anpassen).

Leitplanken: NUR mappings.ts + Aufrufer + Tests. KEINE DB-Migration. KEIN UI-Feature
(Tile/zweiter Slot erst in Scheibe 1). Engine, Detektion/Brücke, Export,
Orphan-Netz-Verhalten, Auth/RLS unverändert.

### Scheibe 1 — Checkliste: vier latente "ein Mapping pro Element"-Stellen (aus Scheibe-0-Verifikation)
Diese vier Stellen nehmen heute "1 Mapping/Element" an und kollabieren still bei zwei
Mappings/id. In Scheibe 0 BEWUSST nicht angefasst (heute unerreichbar, disjunkte
Kategorien). Scheibe 1 MUSS sie adressieren, sobald ein Element redirect+tracking trägt:
1. generate.ts:67-68 — byId[elementId] = mapping kollabiert aufs letzte Mapping. KRITISCH:
   das Wiring-Script braucht für redirect+tracking auf EINEM Element BEIDE Mappings ->
   byId muss auf ein ARRAY pro id (alle Aktionen der id), der Click-Handler iteriert sie.
   ACHTUNG Reihenfolge/Navigation: das Tracking-Event muss VOR der Weiterleitung feuern
   bzw. navigationssicher gesendet werden (sendBeacon / fbq-Beacon), sonst killt die
   Navigation den in-flight Request.
2. Orphan-Render-Key key={m.elementId} (CodeImporter:885) -> key={`${m.elementId}-${m.type}`}
   (sonst React-Key-Kollision bei zwei Orphans gleicher id).
3. Badge-Map<id,type> -> muss mehrere Aktionen pro Element tragen (heute last-wins).
4. Relink-Überschreib-Schutz some(m => m.elementId === target) -> typ-aware
   (&& m.type === orphanType), sonst Fehlalarm-Warnung, obwohl zwei Typen koexistieren dürfen.

### Scheibe 1a — Mehr-Aktion strukturell (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commit "feat(actions): multi-action per element
(redirect + track stub), structural". Pipeline grün (tsc/lint/build + diskriminierende
Tests: [redirect,track] beide im Wiring & Stub-vor-Navigation via invocationCallOrder,
configEqual-track-Branch dirty-korrekt, Doppel-Orphan-Render ohne Key-Kollaps,
Mehr-Aktion-Badge, typ-aware Relink-Überschreib-Schutz, Single-Redirect bit-identisch,
Text-Pfad regress-frei). Browser-Verifikation: Mehr-Aktion-Element zeigt beide Badges
(🔗+🎯); [pagesmith track]-Stub loggt garantiert VOR der Navigation; Track-only loggt
ohne wegzunavigieren; Doppel-Waisen-Netz trennt die Karten isoliert; KEIN Dirty-Fehlalarm
bei Reload (configEqual greift). Single-Redirect + Text-Live-Patch (Scheibe 3) unverändert.

Alle vier latenten Checklisten-Stellen eingelöst (byId->Array mit Track-vor-Redirect;
Orphan-Render-Key ${id}-${type}; Badge Map<id,Set<type>> deterministisch geordnet;
Relink-Überschreib-Schutz typ-aware). Drei TS-erzwungene Folgefunde mitgenommen
(configEqual-track-Zweig, Orphan-Karten-track-Anzeige, Relink-track-Konstruktion).

1a-ZWISCHENSTAND (wird in 1b ersetzt): der Track-Stub (console.log "[pagesmith track]
<event>") landet bewusst auch im EXPORT-Output — beweist die Wiring-Naht. 1b ersetzt
ihn durch echtes fbq + Pixel-Snippet.

Ziel: ein interaktives Element kann Redirect UND Track tragen, end-to-end (Panel,
Wiring, Orphan-Netz, Badge, Dirty) — OHNE Meta-Semantik. Beweist die Mehr-Aktion,
die der Compound-Key (Scheibe 0) ermöglicht.

Schlüssel-Insight: Text- und interaktive Kandidaten sind DISJUNKT -> "Mehr-Aktion"
heißt IMMER nur Redirect+Track auf einem INTERAKTIVEN Element. Text-Pfad
(displayTextFor, PS_SET_TEXT-Live-Patch, Brücke) bleibt KOMPLETT unberührt.

Owner-Entscheidungen (endgültig):
- Meta zuerst (Google ist eine spätere parallele Branch).
- 1a/1b-Split: 1a strukturell (Stub-Firing), 1b echte Meta-Semantik.
- track-Config minimal: { type:"track", config:{ event:string } }. KEINE value/currency/
  Pixel-ID in 1a (das ist 1b).
- Firing in 1a = navigationssicherer Stub (console.log "[pagesmith track] <event>"),
  KEIN fbq. Macht die Klick-Ordnung live sichtbar.
- Klick-Ordnung ist STRUKTURELL: Track-Aktionen feuern VOR der Redirect-Navigation.
  (Die Beacon-Überlebensfrage bei async-fbq ist bewusst 1b.)
- Panel-Layout: interaktiver Zweig zeigt zwei gestapelte Sektionen
  (Weiterleitung / Tracking), je unabhängig zuweisbar/entfernbar. Text-Zweig
  unverändert Ein-Aktion.

Vier latente Stellen (aus der Checkliste) werden HIER eingelöst:
1. generate.ts byId -> Array pro id; Click-Handler iteriert; Track vor Redirect.
   Single-Action-Redirect-Pfad MUSS bit-identisch bleiben.
2. Orphan-Render-Key -> `${m.elementId}-${m.type}`.
3. Badge trägt mehrere Aktionen pro Element (kein last-wins).
4. Relink-Überschreib-Schutz typ-aware (&& m.type === orphanType).

Diskriminierende Tests (Pflicht):
- Element mit [redirect, track]: Wiring enthält BEIDE; bei Klick feuert der Track-Stub
  VOR der Redirect-Navigation (Reihenfolge). Heute erst erreichbar -> echter Beweis.
- Single-Action-Redirect unverändert (bestehende preview/export-Redirect-Tests grün
  ohne inhaltliche Änderung).
- Zwei Orphans gleicher id rendern ohne Key-Kollision.
- Badge korrekt bei Mehr-Aktion-Element.
- Relink eines redirect-Orphans auf ein Element mit track -> KEINE Fehlalarm-Warnung.
- Text-Pfad unverändert (displayTextFor + PS_SET_TEXT-Live-Patch regress-frei).

Leitplanken: KEINE Meta-Semantik (fbq/Pixel-ID/value/currency) in 1a. detect.ts/Brücke
unberührt (track bindet an bereits erkannte interaktive Elemente). Text-Pfad, Auth/RLS,
Sandbox unberührt. KEINE DB-Migration.

### Scheibe 1b — Meta-Pixel-Semantik (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert, produktionsreif. Commit "feat(tracking): real Meta
pixel (settings blob, events, eventID, consent hook)". Pipeline grün (tsc/lint/build +
Tests: settings-Roundtrip, configEqual value/currency/isCustom, Export-init-genau-einmal-
ohne-PageView, trackCustom, value-vs-nicht-value-Event, keine-ID->kein-fbq, psConsent==false->
nichts). Browser-Verifikation via Network-Tab (das verlässliche Instrument): fbevents.js +
facebook.com/tr feuern mit korrekter Pixel-ID und eventID; Settings-Persistenz + Cross-
Projekt-Isolation live bestätigt; CONSENT-GATE-BEWEIS 100%: bei window.pagesmithConsent=
()=>false KEIN Request an connect.facebook.net (Script-Load selbst gegate-t, nicht nur init).

Mess-Lektion (wichtig, dokumentiert): der scheinbare "PS_PIXEL_ID-Blocker" war eine
Mess-Illusion, kein Code-Bug. Drei Confounds gleichzeitig: (1) view-source: führt kein JS
aus -> totes Messfeld; (2) das Pixel feuert im sandboxed iframe (allow-scripts ohne
allow-same-origin, opaque origin) -> der Meta Pixel Helper auf der Top-Seite kann
strukturell nicht hineinsehen; (3) init ist lazy-on-click hinter psConsent, und die
getesteten Elemente trugen Redirects (Wegnavigation vor Helper-Refresh). Die Variablen-
Referenz var PS_PIXEL_ID + fbq("init",PS_PIXEL_ID) ist valides, verhaltensidentisches JS
(var-gehoistet) -> Inlinen hätte nichts geändert. Grundwahrheit kam aus dem Network-Tab
(Preserve log), nicht aus erneutem Code-Lesen. Verstärkt die Methode: Instrument schlägt
Code-Re-Read; tote/abgeschirmte Messpunkte erkennen, bevor man "fixt".

Konsequenz fürs Live-Testen von Tracking: NIE über view-source oder das Sandbox-Preview-
iframe messen. Immer den exportierten File direkt öffnen + Network-Tab (Preserve log,
Filter facebook); für den Pixel-Helper ein Track-only-Element OHNE Redirect (button, kein
a[href]) verwenden.

Ersetzt den 1a-Stub durch echtes Meta-Pixel. Erste echte externe Integration, erste
Schema-Migration seit 0003.

Owner-Entscheidungen (endgültig):
- Persistenz: settings jsonb auf projects (Migration 0004, default '{}'), plattform-
  genestet settings.pixels.meta.pixelId. Pixel-ID ist NICHT secret (öffentlich) ->
  plain gespeichert, kein Secret-Storage (das bleibt Scheibe 2 / CAPI-Token).
- Event-Modell: Standard-Event-Dropdown (Purchase, Lead, InitiateCheckout, AddToCart,
  ViewContent, CompleteRegistration, Contact, Subscribe, ...) + "Custom…"-Option ->
  freies Textfeld -> fbq trackCustom. Optional value/currency, dynamisch nur bei
  wert-tragenden Events eingeblendet. TrackConfig additiv: {event, isCustom?, value?, currency?}.
  configEqual deckt ALLE Felder ab (sonst Dirty-Fehlalarm wie der 1a-configEqual-Fund).
- Navigationssicheres Senden: fbq mit eventID feuern, dann NORMAL navigieren, dem
  sendBeacon vertrauen. KEIN Navigations-Defer (Redirect-Latenz zu Stripe nicht
  künstlich verschlechtern). CAPI (Scheibe 2) ist der finale Datenverlust-Backstop.
- eventID: pro Fire client-seitig erzeugt (crypto.randomUUID + Fallback), an fbq als
  {eventID} übergeben. Tut in 1b funktional nichts -> ist die Dedup-Naht für Scheibe 2
  (Browser- und CAPI-Event teilen dieselbe eventID).
- Consent-Hook psConsent(): EIN Chokepoint, gated init UND Events (fbq('init') setzt
  _fbp-Cookie -> Cookie-vor-Consent ist selbst der DSGVO-Verstoß). 1b-Default permissiv
  (feuert); Scheibe 3 verdrahtet echtes Consent + flippt Default. Doku-Caveat: 1b-Export
  NICHT auf echten EU-Traffic vor Scheibe 3.
- Base-Pixel: einmal pro Seite, geguarded durch gesetzte meta.pixelId (keine ID ->
  kein Snippet, Track-Aktionen no-op mit console.warn). fbq('init', id) OHNE Default-
  PageView (kein ungate-tes Load-Event; 1b bleibt strikt on-click). Page-Load-Events
  sind eine spätere consent-saubere Scheibe.

Build-Reihenfolge (Risiko zuerst): Migration 0004 + settings read/write (save/loadProject
+ projects/actions.ts) + minimale Pixel-ID-UI ZUERST verifizieren; dann Event-Modell +
Wiring-Swap.

Diskriminierende Tests (Pflicht):
- settings-Roundtrip: Pixel-ID speichern -> laden -> persistiert; Projektwechsel isoliert
  (kein Leak zwischen Projekten).
- configEqual: zwei track gleicher id, nur value (oder currency, oder isCustom) verschieden
  -> dirty. Gegenprobe gleich -> gleich.
- Export mit meta.pixelId: Output enthält fbq('init', id) GENAU EINMAL, KEIN
  'track','PageView' (Auto-PageView raus), Klick-Event als fbq('track',event,{...},{eventID}).
- Custom-Event: fbq trackCustom mit freiem Namen.
- value-Event (Purchase) vs nicht-value-Event (Lead): value/currency nur bei value-Event im Output.
- Keine Pixel-ID -> kein fbq im Export, Track-Aktion no-op (console.warn).
- Consent-Hook: psConsent()==false -> weder init noch Event im Laufzeit-Effekt.
- Single-Redirect + Text-Pfad (Scheibe 3) unverändert.

Leitplanken: NUR Meta (pixels.meta) — KEIN Google/TikTok/Custom-Code-Build, nur die
Nest-Form. Kein platform-Feld in TrackConfig. detect.ts/Brücke + Text-Pfad unberührt.
RLS: settings-Spalte auf bereits geschützter projects-Zeile -> bestehende Policies
decken sie, KEINE neue Policy nötig (verifizieren).

### Scheibe 2a — Secret-Plumbing (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commits: "feat(capi): secret token storage
(server-only, RLS, write-only UI)" + "fix(capi): write token via service_role after
explicit ownership check (RLS write-only stands)". Pipeline grün (168 Tests inkl.
IDOR-Spy-Regressionstest). Browser-/DB-Verifikation: Token nie im Client-Payload/Quelltext
(0 Treffer); Row via service_role im Dashboard sichtbar; SELECT als authenticated -> 0
Zeilen (write-only-Sperre real); Projektwechsel isoliert (kein Leak); FK-cascade-Delete
löscht Token-Row atomar; UI-Sperre bei ungespeichertem Projekt greift.

WICHTIGE ARCHITEKTUR-VERSCHIEBUNG (bewusster Trade-off, NICHT schludern):
Der project_tokens-WRITE läuft über service_role (createAdminClient), NICHT über den
authenticated-SSR-Client. Grund: die write-only-SELECT-Sperre (kein SELECT für
authenticated) lässt den authenticated-Upsert am impliziten RETURNING/SELECT-Read
scheitern ("new row violates RLS for project_tokens" — die Meldung zeigt auf die
Tabelle, verletzt ist aber der Read-back). return=minimal löst das in dieser
PostgREST-Konstellation NACHWEISLICH nicht (BUILD-MARKER-Test bewies: Header gesetzt,
Fehler bleibt). service_role bypassed RLS -> sauber, ohne Header-Trick.

FOLGE: Die Write-Autorisierung liegt jetzt AUSSCHLIESSLICH in der App-Schicht, nicht
mehr in der DB-Policy (WITH CHECK ist umgangen, weil service_role sie bypassed). Das
entfernt EINE Defense-in-Depth-Schicht. Die Ownership-Prüfung ist damit das HEILIGSTE
Gate der Anwendung. Zwei Regeln, deren Bruch die Sicherheit LAUTLOS aushebelt:
1. Die Ownership-Prüfung (select id from projects where id=projectId and user_id=user.id)
   MUSS über den AUTHENTICATED-SSR-Client laufen (RLS-gebunden). Mit dem Admin-Client
   geprüft wäre sie wertlos (bypassed RLS -> sieht jede Zeile).
2. createAdminClient() darf im Nicht-Owner-Pfad NICHT erreichbar sein: Early-return VOR
   jeder Admin-Zeile. Der RLS-Bypass ist physisch unerreichbar ohne bestandenes Gate.
WÄCHTER: Der IDOR-Regressionstest (Spy: Admin-Upsert not.toHaveBeenCalled bei fremder
project_id, nicht nur "wirft error") bewacht beide Regeln und darf NIE entfernt/
aufgeweicht werden.

DEBUG-LEKTION (Instrument schlägt Code-Re-Read, unter Druck bestätigt):
Vier plausible Hypothesen zerbrachen nacheinander am Log (fehlende Session / falscher
Client / Waisen-Row-Update / falsche user_id) — inkl. Claudes eigener Wetten. Gelöst
hat NICHT die klügste Hypothese, sondern schrittweises Instrumentieren, bis der
Widerspruch nur eine Erklärung zuließ: pro-Operation-STEP-Logs isolierten die
verletzende Query (token-upsert, nicht settings/ownership), der auth.uid()-vs-user_id-
Log widerlegte den user_id-Verdacht, der BUILD-MARKER trennte "Fix greift nicht" von
"stale build". Regel verschärft: bei jeder plausiblen Bug-Hypothese ZUERST das billige
Instrument (gezielter Log/Network-Tab/DB-Query), das die Hypothese diskriminiert, BEVOR
gefixt wird. Tote/abgeschirmte Messpunkte (view-source, sandbox-iframe, stale build)
als solche erkennen.

Charakterwechsel-Vorbereitung: erster echter Secret-Storage. Der CAPI-Token (anders als
die öffentliche Pixel-ID) ist geheim, lebt server-only, erreicht den Client NIE.

Owner-Entscheidungen (endgültig):
- Privilegierter Read = service_role, STRENG server-only (process.env in der API-Route/
  server-Modul). Bounded, legitime Ausnahme zur "nie service_role"-Regel (die war MVP-
  Default gegen Client-Leak/Commit). KEIN pg_net/in-DB-HTTP.
- Token at rest: separate Tabelle project_tokens, PLAINTEXT vorerst + klarer
  Härtungs-Kommentar (spätere Verschlüsselung). Tragende Kontrolle = ISOLATION
  (separate Tabelle + RLS SELECT-Sperre), nicht Verschlüsselung.

Design (aus dem Architektur-Review):
- project_tokens(project_id fk on delete cascade, user_id, meta_capi_token text,
  created_at, updated_at). RLS AN.
- RLS-Policies: KEIN SELECT für anon/authenticated (write-only, Token nie lesbar,
  auch nicht vom Owner). INSERT + UPDATE mit WITH CHECK (auth.uid() = user_id) ->
  Owner setzt nur eigene Zeile (Upsert, on conflict). service_role bypassed RLS ->
  Event-Read-Pfad.
- WRITE über Owner-Session (SSR-Client, Rolle authenticated, RLS greift). Nur der
  spätere Event-READ (2b) über service_role. Zwei Clients, zwei Pfade.
- trackingKey: öffentlicher Zufalls-Key pro Projekt, in settings (client-lesbar,
  wird in den Export gebacken). NICHT in project_tokens. Auflösung
  trackingKey -> project_id -> token (service_role).
- capiTokenSet: nicht-sensibler Boolean in settings, zusammen mit dem Token geschrieben,
  für den maskierten "••• gesetzt"-UI-Indikator. Token selbst nie im Client.
- UI: write-only maskiertes Token-Feld in der bestehenden Einstellungen-Sektion
  (unter Meta-Pixel-ID). loadProject reicht NIE den Token zurück.
- service_role-Read-Helper (server-only Modul): getCapiTokenByTrackingKey(key) ->
  token|null. In 2a implementiert + getestet (mock), Consumer erst in 2b.

SECRETS-DISZIPLIN (kritisch, öffentlicher Push): SUPABASE_SERVICE_ROLE_KEY NUR in
.env.local (vorher .gitignore verifizieren), NUR in server-only-Modulen importiert,
NIE in Client-Komponente/Export. Extra git status vor dem Push.

Diskriminierende Tests (Pflicht):
- Token erreicht Client nie: loadProject/settings-Payload trägt NUR trackingKey +
  capiTokenSet, KEINEN Token. project_tokens wird von Client-Code nie selektiert.
- Write-Server-Action: Owner-Upsert schreibt Token in project_tokens + flippt
  capiTokenSet in settings.
- Read-Helper: gegebener trackingKey -> Token (service_role-Client gemockt).
- Projektwechsel: capiTokenSet-Indikator reseeded pro Projekt (kein Leak, wie
  settings/mappings).
- (Live, kein Repo-Harness): RLS-SELECT-Sperre real + service_role-Read real.

Leitplanken: KEIN Forward/Proxy-Route/Beacon/Meta-Call (das ist 2b). KEINE Änderung
am 1b-Pixel-Firing. detect.ts/Brücke, Text-Pfad, Redirect-Pfad unberührt. Migration
additiv (neue Tabelle), bestehende RLS/Policies unangetastet.

### Scheibe 2b-i — CAPI-Route (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commit "feat(capi): server-side CAPI forward route
(trackingKey->config, Meta Graph)" (bf87545) + "fix(auth): allow anonymous access to
/api/capi only (trackingKey is the guard)". Pipeline grün (188 Tests). LIVE-BEWEIS: ein
synthetischer curl/Invoke-RestMethod -> Event "Kauf" (event_id test-evt-002) im Meta-
Test-Events-Tab als "Server / Verarbeitet" sichtbar. Erste externe API-Integration der
App funktioniert: unser Server spricht korrekt mit Metas Graph-CAPI (Auth, Payload,
event_id, IP via Dev-Dummy, test_event_code). Route antwortet nur 204, nie Body/Token.

DREI bewusst geloggte Punkte aus diesem Bogen:

1. AUTH-GATE-REGEL (generische Prüfregel): Neue anonyme/öffentliche Route in einer
   ansonsten auth-gegateten App? ZUERST prüfen, ob das Middleware-Auth-Gate (src/
   middleware.ts, 3.1) sie durchlässt — sonst 302->/login statt Route. /api/capi wurde
   in updateSession als bewusst öffentlicher Pfad behandelt (analog /login, isPublicRoute),
   CHIRURGISCH nur /api/capi, nicht /api pauschal. Diskriminierender Test: anonym auf
   /api/capi -> kein Redirect; anonym auf anderen geschützten Pfad -> weiter Redirect.
   SICHERHEITSVERSCHIEBUNG: das Auth-Gate ist für /api/capi NICHT mehr der Wächter — der
   Wächter ist der trackingKey als Capability (unbekannter Key -> 204, kein Forward,
   kein Leak). Die Route trägt ihre Zugangskontrolle selbst.

2. TEST-SETUP-LEKTION (wiederkehrend, für 2b-ii + jeden künftigen CAPI-Test):
   trackingKey != Projekt-UUID. Der trackingKey liegt in settings.capi.trackingKey
   (lazy beim ersten Token-Set erzeugt, 2a). Ein falscher Key im Test -> Resolver null
   -> korrektes 204 OHNE Forward -> Server grün, Meta-Test-Tab leer. Das kostete einen
   Debug-Bogen; Symptom "Server 204, Meta leer" = zuerst trackingKey gegen
   'select settings->''capi''->>''trackingKey'' from projects where name=...' prüfen.

3. DIAGNOSE-HYGIENE: temporäre [capi-diag]-Logs (inkl. voller Meta-Response-Body) waren
   ein Instrument, nie committet, restlos entfernt (git grep 0 Treffer). Der reguläre
   sanitized Error-Log bleibt (nur "[capi] Meta forward failed: HTTP <status>", nie
   Token/access_token/Response-Body — 2a-Regel).

Erste externe Integration der App: unser Server ruft aktiv Metas Graph-CAPI auf.
NUR Route + Resolver — KEIN Client-Pfad, kein sendBeacon, kein Export-Wiring (das ist 2b-ii).

Owner-Entscheidungen (endgültig):
- Zuschnitt: 2b gesplittet, Route zuerst (isoliert die genuin neue "spricht-mit-Meta"-
  Risikoklasse; verifizierbar per synthetischem curl -> Meta-Test-Events, ohne Browser).
- pixelId serverseitig aufgelöst: 2a-Helper wächst zu getCapiConfigByTrackingKey ->
  { pixelId, token } (pixelId aus settings.pixels.meta.pixelId, token aus project_tokens,
  eine trackingKey-Auflösung). Client sendet die pixelId NIE.

Sicherheits-Muster (2a-Disziplin in neuer Form): anonymer cross-origin Endpoint, der
intern service_role nutzt. Autorisierung = trackingKey als CAPABILITY (kein Owner-Session
beim anonymen Besucher). Der Resolver ist die einzige Brücke public-key -> secret-token
und gibt den Token NIE in die Response. Route antwortet nur 204, nie Daten.

Route-Design:
- POST-Endpoint (z.B. src/app/api/capi/route.ts). Nimmt JSON/text-Blob:
  { trackingKey, eventID, event, value?, currency?, eventSourceUrl, isCustom?, _fbp? }.
- Resolver getCapiConfigByTrackingKey(key) -> {pixelId, token} | null (service_role,
  server-only). Unbekannter Key / fehlender Token -> sauberes 204 (bzw. 400), KEIN 500,
  KEIN Leak.
- Serverseitig gesetzt (NIE vom Client): event_time (Unix-Sek, Meta-7-Tage-Fenster);
  client_ip_address aus der PLATTFORM-VERTRAUTEN Quelle (Prod: Vercel-Header; Dev/::1
  sauber behandeln, nicht blind erstes x-forwarded-for-Glied -> spoofbar);
  client_user_agent aus dem Request-Header.
- Forward: POST graph.facebook.com/v{VERSION}/{pixelId}/events?access_token={token}.
  Payload: event_name=event (bzw. custom), event_time, event_id=eventID,
  action_source="website", event_source_url, user_data{client_ip_address,
  client_user_agent, fbp?}, custom_data{value?, currency?}. VERSION als env-Konstante.
- test_event_code: NUR anhängen, wenn env-Variable gesetzt (dev-only). NIE hartcodiert
  im Prod-Pfad.
- Forward wird AWAIT-et + Fehler geloggt (CAPI-Ablehnungen sonst unsichtbar), Route
  antwortet dem Client trotzdem schnell 204. KEIN Secret in Logs (weder Token noch
  sensible Meta-Response-Felder).
- CORS: text/plain-freundlich (kein Preflight nötig; 2b-ii nutzt sendBeacon).

Diskriminierende Tests (Pflicht, Meta-fetch gemockt):
- Happy-Path: gültiger trackingKey -> fetch an graph.facebook.com/.../{pixelId}/events
  mit access_token, event_id==eventID, action_source=website, IP/UA server-gesetzt.
- Resolver unbekannter Key -> KEIN Meta-fetch, sauberes 204/400, kein Throw/500.
- Token/Response NIE in der HTTP-Response an den Client (nur Status).
- event_time server-gesetzt (nicht aus Client-Payload übernommen, selbst wenn mitgeschickt).
- test_event_code: env gesetzt -> im Payload; env leer -> NICHT im Payload.
- (Live, kein Harness): curl -> echtes Event im Meta-Test-Events-Tab.

Leitplanken: KEIN Client/sendBeacon/Export-Wiring (2b-ii). generate.ts-Pixel-Firing (1b),
Text-Pfad, Redirect-Pfad, detect.ts/Brücke unberührt. service_role bleibt server-only.
Keine SELECT-Policy-Änderung an project_tokens.

2b-ii-LEITPLANKE (in route.ts als Kommentar verankert, HIER fürs Gedächtnis): der
Client-Beacon MUSS ein text/plain-Blob sein (sendBeacon, Blob type "text/plain"),
NIEMALS application/json. application/json macht aus dem simplen Beacon einen
preflight-pflichtigen Request; sendBeacon (fire-and-forget) kann keinen Preflight ->
stiller Ausfall, den die CORS-Header (Access-Control-Allow-Origin: * etc. auf der
204-Response) NICHT retten. Der text/plain-Body ist die tragende Kontrolle, die
Header sind nur Gürtel-und-Hosenträger. Dev-Dummy-IP (123.123.123.123) wird NUR bei
(loopback||leer) && gesetztem META_TEST_EVENT_CODE eingesetzt — eine echte Remote-IP
wird nie ersetzt, in Prod (Test-Code unset) bleibt die IP bei fehlender Quelle omitted.

BEWUSSTE SICHERHEITS-VERSCHIEBUNG (Auth-Gate-Ausnahme, analog zur 2a-service_role-
Verschiebung): Der anonyme cross-origin Endpoint /api/capi wird beim Bau in
src/lib/supabase/middleware.ts (updateSession) chirurgisch aus dem Auth-Gate
ausgenommen — als bewusst öffentlicher Pfad im SELBEN Muster wie /login
(isPublicRoute = isLoginRoute || path.startsWith("/api/capi")), NICHT über den
Matcher-Regex (der steuert Auth-Reichweite + Session-Refresh, fragilste Stelle) und
NICHT /api pauschal (künftige API-Routen bleiben hinter dem Gate). FOLGE: Für
/api/capi ist das Auth-Gate NICHT mehr der Wächter — der Wächter ist der trackingKey
als Capability (unbekannter Key -> 204, kein Forward, kein Leak; in 2b-i gebaut +
getestet). Korrekt und notwendig, weil der ausgelieferte Export den Endpoint immer
anonym aufruft; die Route trägt ihre Zugangskontrolle jetzt selbst. WÄCHTER:
diskriminierende middleware.test.ts (anonym+/api/capi -> kein Redirect; anonym+andere
API-Route -> weiter /login) hält fest, dass NUR dieser eine Pfad geöffnet ist.

### Scheibe 2b-ii — Client-Beacon / Dedup (ABGESCHLOSSEN, Mechanik verifiziert)
Status: fertig, Mechanik live verifiziert. Commit "feat(capi): dedup beacon alongside
pixel (shared eventID, text/plain, absolute endpoint)". Pipeline grün. Live-Beweis
(via npx serve -l 8080, echte http-Origin): Beacon feuert OHNE CORS-Block, Server
antwortet 204, Route baut korrekten Meta-Payload (test_event_code TOP-LEVEL neben data,
geteilte event_id, action_source website, IP/UA server-gesetzt), Meta EMPFÄNGT und
VERARBEITET den Server-Event (sichtbar als "Kauf/Conversions API" in der Pixel-Übersicht).
Browser-Pixel + CAPI-Beacon feuern parallel mit IDENTISCHER event_id.

BEWUSSTE TEST-GRENZE (kein Bug, in Phase 7 aufzulösen): Die Echtzeit-Nebeneinander-
Anzeige im Meta-"Events testen"-Tab (Browser+Server dedupliziert) war lokal NICHT
herstellbar. Ursache strukturell: der Test-Tab ordnet Events über event_source_url +
die pixel-verknüpfte Domain (thrty.store) zu; eine localhost:8080- (bzw. file://-)
Origin ist keine verknüpfte, öffentlich erreichbare Domain -> Event wird verarbeitet
(Übersicht), aber nicht in eine Test-Session geroutet. Der localhost-Test war immer nur
eine Annäherung an Prod. Die Dedup-SICHTBARKEIT ist erst mit Phase 7 (Hosting, verknüpfte
Domain) sauber verifizierbar -> dort als Abschlusstest von Phase 6 nachholen. Die
Dedup-FUNKTION selbst ist belegt: identische event_id in beiden Events + Meta verarbeitet
beide; Meta dedupliziert anhand der event_id, unabhängig von der Test-Tab-Anzeige.

DEBUG-LEKTIONEN dieses Bogens (Instrument schlägt Vermutung, mehrfach bestätigt):
- "Server 204, Meta-Test-Tab leer" ist eine WIEDERKEHRENDE Symptomklasse mit mehreren
  Config-Ursachen (NICHT Route-Bug): falscher trackingKey (2b-i), stale/alter
  test_event_code, test_event_code verschachtelt statt top-level, ODER file://-/
  fremde-Origin event_source_url. Reihenfolge beim Debuggen: erst Config
  (trackingKey/test_code/Origin) instrumentiert prüfen, DANN die Route.
- file:// ist ein Test-Artefakt-Generator: null-Origin -> CORS-Block beim Beacon;
  UND event_source_url=file:// -> Meta-Test-Tab-Routing scheitert. Lokal-Test IMMER
  über echte http-Origin (npx serve -l 8080 auf anderem Port als Next -> echter
  Cross-Origin-Test wie Prod), NIE per Doppelklick/file://.
- Die eigene Pixel-Übersicht ("empfangen von: Conversions API") ist der Beweis, dass
  der Server->Meta-Forward FUNKTIONIERT, unabhängig vom Test-Tab.

Das Finale von Phase 6, additiv-klein: im 1b-Meta-Wiring (__metaFire in meta.ts) neben
fbq ein navigator.sendBeacon an /api/capi. Danach: pro Klick ein Browser-Event (Pixel)
+ ein Server-Event (CAPI), die Meta über die geteilte eventID zu EINEM faltet.

Schlüssel-Insight (hält es klein): psConsent(), eventID-Erzeugung und Event-Daten
existieren bereits in __metaFire. Der Beacon hängt sich an die VORHANDENE ID und die
VORHANDENEN Werte an. Additiv: eine sendBeacon-Zeile im schon-consent-gegateten,
schon-eventID-tragenden Pfad. Kein Umbau, kein zweiter Consent-Check, keine zweite ID.

Vier kritische Invarianten:
1. EINE eventID für beide: dieselbe Variable, die fbq(…, {eventID}) bekommt, geht in den
   Beacon-Payload. NIEMALS ein zweites randomUUID. Zwei IDs = kein Dedup = Doppelzählung
   (stiller Datenqualitäts-Bug, kein Crash).
2. text/plain: Blob-type "text/plain", NIEMALS application/json (sonst Preflight ->
   sendBeacon kann nicht warten -> stiller Ausfall).
3. Beide hinter DEMSELBEN psConsent(): der Beacon im selben if(!psConsent())return-Block
   wie fbq. Kein eigener Consent-Zweig (sonst Server-Event ohne/mit Consent divergent ->
   DSGVO-Loch + Dedup-Bruch).
4. proxyURL absolut + env-abgeleitet + FAIL-LOUD: neue env NEXT_PUBLIC_APP_URL (Dev
   http://localhost:3000, Prod die Pagesmith-Domain). Beim Export wird die ABSOLUTE
   /api/capi-URL in die Datei gebacken (die ausgelieferte Seite läuft auf fremder Domain
   -> relativ zeigt ins Leere). Fehlt/leer die env -> KEIN Beacon + console.warn, KEIN
   Fallback auf einen relativen/kaputten Pfad (der in Dev grün ist und erst beim echten
   Marketer bricht).

_fbp: Best-Effort aus document.cookie mitgeben (Match-Quality). Beim ersten Klick evtl.
noch nicht gesetzt (lazy init im selben Klick) -> dann weglassen, NICHT verzögern. eventID
trägt das Dedup, _fbp ist Bonus.

Scope hart: Redirect-Pfad + Klick-Reihenfolge (Track vor Navigation, 1a) UNANGETASTET —
der Beacon reiht sich in den bestehenden Track-vor-Redirect-Block ein (sendBeacon ist
navigationssicher, überlebt die Weiterleitung — sein ganzer Vorteil). Edit-iframe bleibt
pixel- UND beacon-frei (kein Wiring im Edit-Modus, nur Vorschau/Export). Meta-Route (2b-i),
Text-Pfad, detect.ts/Brücke unberührt.

Diskriminierende Tests (Pflicht):
- Beacon feuert mit DERSELBEN eventID wie fbq (assert: sendBeacon-Payload.eventID ===
  das an fbq übergebene eventID — nicht nur "beide vorhanden", sondern IDENTISCH).
- Blob-type ist text/plain (nicht application/json).
- psConsent()==false -> WEDER fbq NOCH sendBeacon (beide im selben Gate).
- proxyURL: env gesetzt -> absoluter Export-URL im Wiring; env fehlt -> KEIN Beacon +
  warn, kein relativer Fallback.
- Redirect+Track: Beacon feuert, Redirect-Navigation unverändert, Reihenfolge intakt.
- Edit-iframe: kein Beacon/kein Pixel im Edit-Wiring.

