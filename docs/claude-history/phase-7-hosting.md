## Phase 7 — Hosting & Go-Live
Größter Charakterwechsel: Pagesmith wird HOST/Plattform, nicht mehr nur Werkzeug —
serviert fremde Seiten unter fremden Domains. Wert-Schalter: macht das Produkt
end-to-end nutzbar, schaltet Funnel-Vision + First-Party-Adblocker-Resistenz + die
Phase-6-Dedup-Kirsche (verknüpfte Domain) frei.

Owner-Entscheidungen (endgültig):
- Zuschnitt: erst auf Pagesmith-eTLD+1-URL serven; Vercel-Custom-Domain-API als spätere
  Schicht, sobald Serving bombenfest.
- STRIKTE eTLD+1-ISOLATION (Sandbox-Prinzip auf die Serving-Schicht übertragen):
  gehostete (fremde/KI-generierte) Seiten laufen auf SEPARATER Registrable Domain
  (pgsm.site) — App bleibt pagesmith.app. Bösartiges User-HTML kann die App-Origin
  strukturell nie erreichen (kein same-site zu Auth/Cookies).
- SSL/Custom-Domains an Vercel Domains API delegieren (kein eigenes ACME) — später (7b+).
- Serving: dynamisch (generateFunctional serve-Modus) + Edge-Cache SPÄTER; in 7a noch
  OHNE Cache (immer frisch aus published_content). REGEL: sobald Caching dazukommt,
  landet die Publish-Invalidierung (revalidateTag pro Projekt/Domain) IN DERSELBEN
  Scheibe — nie Cache ohne Invalidierung (sonst stiller "mein Publish wirkt nicht"-Bug).
- Draft/Publish ADDITIV: bestehende html/mappings BLEIBEN Draft/Arbeitszustand; NEU
  published_content jsonb beim Publish. KEINE Migration bestehender Spalten in
  draft_content (vermeidet Live-Daten-Migration). WICHTIG (Bau-Realität, siehe 7a):
  published_content speichert das beim Publish CLIENT-generierte funktionale HTML
  (das fertig verdrahtete Dokument) PLUS einen {html,mappings,settings,publishedAt}-
  Snapshot fürs Re-Publish/7b — NICHT nur einen Rohsnapshot, den der Server rendert.
- Cheerio: reserviert für serve-seitige HTML-Transformation (7b: Beacon-Endpoint auf
  same-origin umschreiben). Trennung: Editor=DOMParser (Client), Serving=Cheerio (Server).

BEWUSSTE GRENZEN (geloggt, nicht jetzt gelöst): Kunde-gegen-Kunde same-site auf
*.pgsm.site (Wildcard teilt Registrable Domain) -> auf pgsm.site NIEMALS app-relevante
Cookies/Auth-State; gehostete Seiten berühren keinen Plattform-Auth. Phishing/Malware-
Takedown (Seite schnell abschalten), Content-Moderation, Kosten-Deckelung unter Ad-Last,
Serving-Rate-Limiting -> spätere Härtung.

### Scheibe 7a — "Seite lebt" (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commits: "feat(hosting): serve published projects on
*.pgsm.site (label lookup, isolated origin)" + "fix(hosting): derive publish state from
settings.hosting on project load". Pipeline grün. Live (via lvh.me, echter Host-Header):
publizierte Seite lädt autark unter <label>.lvh.me:3000 OHNE Login-Redirect
(Middleware-Host-Verzweigung vor updateSession greift); Redirect/Text-Wiring funktional;
Draft != Live (Editor-Änderung ohne Re-Publish ändert Live-URL nicht); Idempotenz (2x
publish = gleiche URL, eine domains-Row); Guards (unbekanntes Label -> 404, /app-serve
am App-Host -> 404, App-Auth intakt); Security-Header (nosniff, X-Frame-Options DENY,
Referrer-Policy) auf der Serve-Response.

WICHTIGE ARCHITEKTUR-REALITÄT (Fund beim Bau): Die Engine ist CLIENT-ONLY
(generateFunctional bricht serverseitig ab, DOMParser-Guard generate.ts:224; jsdom nur
Test-Dep, Cheerio erst 7b). Serverseitiges Rendern ist NICHT möglich -> published_content
speichert das beim Publish CLIENT-generierte funktionale HTML (via generateFunctional
("export"), saveProject-Muster "Client generiert, Server speichert") + Snapshot
{html,mappings,settings,publishedAt} fürs Re-Publish/7b. Serve-Route liefert VERBATIM aus
(kein Server-DOM, generate.ts unangetastet). Merksatz: serverseitige HTML-Ausgabe geht
nur über beim-Publish-generierten gespeicherten String, nicht über Laufzeit-Rendering.

SICHERHEIT/ARCHITEKTUR-Notizen 7a: domains-RLS owner-scoped (Labels sind öffentliche
URLs, keine totale SELECT-Sperre nötig) -> Publish-Write über authenticated-Client mit
RLS (kein service_role beim Schreiben; die 2a-RETURNING-Falle tritt nicht auf, weil der
Owner legitimes SELECT hat), service_role NUR beim anonymen Serving-Read (nur project_id/
published_content, kein Draft/Token/Owner-Leak). Label strikt validiert ([a-z0-9-],
Maxlänge) vor dem Lookup (Injection/Sub-Sub-Schutz). eTLD+1-Isolation: pgsm.site setzt
keine App-Cookies.

Ziel: ein gespeichertes+publiziertes Projekt ist unter einer *.pgsm.site-URL als echte
funktionale Seite erreichbar (Wiring/Redirect feuern). KEINE Custom-Domains, KEIN
Cache, KEIN same-origin-CAPI-Rewrite (das ist 7b), KEINE Publish-UI-Politur.

Schlüssel-Insight (hält 7a klein) + KORREKTUR ggü. Original-Notiz: Die Engine ist
CLIENT-ONLY (generate.ts:224 DOMParser-Guard: `if (typeof DOMParser === "undefined")
return html`; jsdom ist devDependency, NICHT Runtime; kein Cheerio). Serverseitiges
Rendern ist damit NICHT möglich — eine Serve-Route (Node, kein DOM) bekäme das rohe html
UNVERÄNDERT zurück (kein Wiring). AUFLÖSUNG (saveProject-Muster: Client stabilisiert/
generiert → Server speichert nur): das funktionale HTML wird beim PUBLISH CLIENT-seitig
erzeugt (generateFunctional("export"), identisch zu handleExportDownload) und in
published_content gespeichert; die Serve-Route liefert es VERBATIM aus. KEIN Server-DOM,
KEINE neue Runtime-Dependency, generate.ts BLEIBT UNANGETASTET (Reuse des export-Modus,
kein neuer serve-Modus). LEKTION: Engine ist client-only → serverseitige HTML-Ausgabe
geht nur über beim-Publish-generierten + gespeicherten String, nicht über
Laufzeit-Rendering (7b Cheerio-Rewrite operiert ebenfalls auf dem gespeicherten String).

Architektur (umgesetzt):
- Migration 0006: (a) neue Tabelle domains(label text PK = Lookup-Key, project_id fk
  projects on delete cascade, created_at; Index auf project_id). RLS an, OWNER-SCOPED
  (nicht total gesperrt wie project_tokens — Labels sind ÖFFENTLICHE URLs, kein Secret):
  SELECT/INSERT/UPDATE für authenticated über Projekt-Ownership-Subquery
  (exists projects p where p.id=project_id and p.user_id=auth.uid()). KEINE anon-Policy
  -> kein Enumerieren; Serving-READ via service_role (bypassed RLS). BEWUSSTER Unterschied
  zu 2a: weil der Owner ein legitimes SELECT hat, tritt die 2a-"RETURNING-Read-back scheitert
  an der SELECT-Sperre"-Falle NICHT auf -> Publish-Write läuft über den authenticated-Client
  (kein service_role beim Schreiben, nur beim Serving-Read) -> mehr DB-Defense.
  (b) projects.published_content jsonb default null.
- src/lib/hosting/host.ts (rein, DB-frei, unit-getestet): extractLabel(host) +
  isServingHost(host). Serving-Suffixe .pgsm.site (Prod) UND .lvh.me (lokal) -> LABEL-Match
  fork-frei (meinprojekt.pgsm.site == meinprojekt.lvh.me:3000). STRIKTE Label-Validierung
  ^[a-z0-9-]{1,63}$ VOR jedem Lookup: Punkt/Sonderzeichen/verschachtelte Sub-Subdomain
  (foo.bar.pgsm.site) -> null -> 404, kein Lookup (Label-Injection-Schutz).
- src/middleware.ts (Entry, KEIN middleware->proxy-Rename): ZUERST auf Host verzweigen.
  isServingHost -> NextResponse.rewrite auf /app-serve -> RETURN (Auth-Gate übersprungen,
  KEINE App-Cookies, KEIN DB-Call). App-Host -> updateSession() BYTE-IDENTISCH wie bisher.
  Weil die Verzweigung im Entry (nicht in updateSession) liegt, bleiben die bestehenden
  Auth-Tests (testen updateSession direkt, Host localhost) OHNE Änderung grün.
- src/lib/hosting/resolve.ts (server-only, wie token.ts): getPublishedHtmlByLabel(label)
  über service_role, ZWEI-Schritt: domains.label -> project_id -> projects.published_content
  -> .html. Selektiert NUR project_id + published_content — NIE html/mappings/settings/token.
- Serve-Route src/app/app-serve/route.ts (runtime "nodejs"): Host-Label extrahieren ->
  Guard !isServingHost -> 404 (direkter App-Host-Zugriff auf /app-serve neutralisiert, kein
  Bypass) -> getPublishedHtmlByLabel -> published_content.html als text/html. Unbekanntes
  Label / published_content null -> 404. SERVIERT NUR published_content, nie Draft
  (html/mappings werden gar nicht abgefragt). Live != Editor-Zustand.
- Security-Header auf der Serve-Response: nosniff, X-Frame-Options DENY, Referrer-Policy
  strict-origin-when-cross-origin. KEIN striktes CSP (bräche Pixel/Beacon).
- publishProject(projectId, functionalHtml, snapshot) (Owner-Session-Server-Action,
  IDOR-geprüft wie setCapiToken: Ownership-Gate über authenticated-Client): funktionalHtml
  ist CLIENT-generiert (Server hat kein DOM). published_content = { html: functionalHtml,
  mappings, settings, publishedAt }. domains-Row sicherstellen (Auto-Label = slug+Random,
  Kollisions-Retry). IDEMPOTENZ: bestehendes Label (in settings.hosting.label) wird
  wiederverwendet -> Re-Publish erzeugt KEINE zweite domains-Row und KEINEN neuen Label
  (Live-URL bleibt stabil). Label in settings.hosting gespiegelt (öffentlich, client-lesbar,
  wie trackingKey in settings.capi) -> Owner sieht die Live-URL ohne domains-SELECT.
  Live-URL aus NEXT_PUBLIC_HOSTING_DOMAIN (Dev lvh.me:3000, Prod pgsm.site) + Label gebaut.
- /app-serve ist NUR via interne Rewrite erreichbar/sinnvoll: kein Bypass zu App-Daten
  (nur published_content by label; Guard + owner-freie Projektion). Direkt-Zugriff
  App-Host -> 404/neutral.

Lokales Testen: lvh.me (*.lvh.me -> 127.0.0.1), echter Host-Header, kein hosts-Editing,
kein Code-Fallback. Label-Lookup macht es fork-frei.

Diskriminierende Tests (Pflicht):
- Serve-Route: bekanntes Label -> published_content-HTML (funktional); unbekanntes Label
  -> 404; Projekt ohne published_content -> 404.
- Serviert NIE draft (html/mappings): Test mit abweichendem draft vs published ->
  Output == published.
- Middleware: pgsm.site-Host -> rewrite auf /app-serve, KEIN /login-Redirect; App-Host
  anonym auf geschützten Pfad -> weiter /login (Auth-Gate intakt); App-Host setzt Cookies,
  pgsm.site nicht.
- Publish-Action: Ownership-Fail (fremde project_id) -> error, kein published_content/
  domains-Write; Happy-Path -> Snapshot + domains-Row + URL.
- Security-Header auf Serve-Response vorhanden.
- domains-Lookup via service_role gibt nur project_id-Ebene, kein Owner-Leak.

Leitplanken: eTLD+1-Isolation strukturell; kein Cache/kein CAPI-Rewrite/keine
Custom-Domain in 7a; Editor/Text-Pfad/Redirect-Engine/2b-Route unberührt (nur neuer
serve-Ausgang). service_role server-only.

### Scheibe 7b — First-Party-Ingest auf gehosteten Seiten (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert (lvh.me). Commit "feat(hosting): first-party ingest
/api/e on hosted pages (relative beacon, surgical api passthrough)". Pipeline grün.
Live-Beweise:
- First-Party same-origin: Beacon auf der gehosteten Subdomain geht relativ an /api/e
  (kein absolutes Host im Browser) -> 204. Adblocker-Resistenz eingelöst.
- Export-Divergenz: exportierte Datei nutzt weiter die ABSOLUTE ${NEXT_PUBLIC_APP_URL}/api/e
  (Erreichbarkeit auf Fremd-Server). Publish=relativ, Export=absolut, nebeneinander bewiesen.
- Alias-Parität: POST /api/capi schlägt im geteilten Handler auf (nicht von Middleware
  blockiert), verhält sich identisch zu /api/e. Alte ausgelieferte Exporte tracken weiter.
- Chirurgischer Passthrough (Security): POST /api/projects auf Serving-Host -> Rewrite auf
  /app-serve -> 405, KEIN Leak interner App-APIs auf die Kunden-Domain. Nur /api/e + /api/capi
  werden durchgelassen (exakter Match, nicht /api/* pauschal).
- App-Host-Sanity: Dashboard + Auth auf localhost:3000 unberührt.

Umsetzung: buildFunctionalDocument(capiProxyUrl) mit zwei Aufrufern (Export absolut /
Publish "/api/e"); Middleware-===-Passthrough vor dem /app-serve-Rewrite (next(), kein
updateSession/Cookies); geteilte Logik in lib/capi/ingest.ts, api/capi + api/e als
Re-Export derselben Funktionsreferenz (Identität getestet), /api/capi PERMANENTER Alias
für Alt-Exporte (nicht entfernen); isPublicRoute um exaktes /api/e erweitert (startsWith
wäre falsch -> bräche /api/etwas-anderes -> /login). meta.ts/Consent/eventID/text-plain
unberührt (nur URL-Wert).

REVISION ggü. früherer Notiz: KEIN Cheerio (bleibt reserviert; keine Runtime-Dep ohne
2+ Fälle). Grund: gehostetes HTML wird beim Publish CLIENT-generiert (7a-Realität), die
Engine ist über capiProxyUrl bereits parametrisiert -> die gehostete Variante wird beim
Publish mit RELATIVEM Ingest-Pfad (/api/e) generiert; Export-Download behält die absolute
${NEXT_PUBLIC_APP_URL}-URL. Es gibt keine serverseitige Injektions-Stelle -> nichts für
Cheerio zu tun.
Kernarbeit 7b: (a) Middleware lässt die Ingest-Pfade auf Serving-Hosts DURCH (vor dem
/app-serve-Rewrite; weiterhin ohne Auth, ohne App-Cookies); (b) neutrale Route /api/e mit
GETEILTER Handler-Logik aus 2b-i, /api/capi bleibt funktionaler Alias (alte Exporte).
Consent-Gate, text/plain, geteilte eventID: unverändert (nur der URL-Wert im Beacon
ändert sich). Ergebnis: Tracking gehosteter Seiten läuft same-origin = adblocker-resistent
(First-Party-Versprechen eingelöst).

## Phase 7c — Custom-Domains + Auto-SSL (Konzept & Entscheidungen)
Der härteste Brocken von Phase 7: Pagesmith serviert gehostete Seiten nicht mehr nur
unter *.pgsm.site, sondern unter der EIGENEN Domain des Marketers (Zielnutzer kauft
wöchentlich neue Domains für Rapid Testing). Konzept + Entscheidungen unten; Bau in
den vier 7c-Scheiben (siehe Roadmap). Jede Entscheidung MIT Begründung, damit heutige
Schnittführung die späteren Scheiben nicht versperrt.

- MODELL: Kunden-Domain per Vercel-API unserem Vercel-Projekt hinzufügen; Vercel macht
  Cert-Provisioning + Edge-Routing, wir lösen den eingehenden Host serverseitig zum
  Projekt auf. SSL an die Plattform delegiert (kein eigenes ACME) — gleiche
  Delegations-Entscheidung wie in der Phase-7-Owner-Direktive, jetzt umgesetzt.
- MIDDLEWARE-INVERSION (Kern-Entscheidung): Die Host-Verzweigung kippt von "ist
  Serving-Host?" (7a: Suffix-Match auf pgsm.site/lvh.me) auf "ist APP-Host?" (Allowlist:
  pagesmith.app, www, die *.vercel.app-Preview-Hosts, localhost/Dev). ALLES andere fällt
  in den Serving-Zweig -> pgsm.site UND beliebige Custom-Domains teilen denselben Pfad,
  ohne pro Domain eine Middleware-Regel. Begründung: eine offene Menge (Custom-Domains)
  lässt sich nicht per Suffix-Allowlist führen; die geschlossene Menge (unsere App-Hosts)
  schon. KEIN DB-Call im Edge (Middleware bleibt DB-frei wie in 7a); der Label-/Host-
  Lookup bleibt in der Node-Serve-Route. Unbekannter Host -> 404, KEINE App-Cookies,
  KEINE Auth. Konsequenz (Sicherheit): die App ist auf Nicht-App-Hosts strukturell
  unerreichbar -> kein Host-Spoof-Auth-Bypass. Der chirurgische /api/e|/api/capi-
  Passthrough (7b) hängt durch die Inversion am Serving-Zweig GENERELL -> First-Party-
  Ingest ist auf Custom-Domains automatisch same-origin/adblocker-resistent (EINE
  Änderung, nicht zwei getrennte).
- ISOLATION: jede Custom-Domain ist ein eigener eTLD+1 -> automatisch isoliert von der
  App UND von anderen Kunden (stärker als die geteilte *.pgsm.site-Wildcard, die
  Registrable Domain teilt und deshalb die "auf pgsm.site NIE App-Cookies"-Grenze
  brauchte). Regel "auf Nicht-App-Hosts NIE App-Cookies/Auth-State" gilt unverändert
  und deckt Custom-Domains ohne Zusatzarbeit mit ab.
- DATENMODELL additiv: die bestehende `domains`-Tabelle bekommt NULLBARE Spalten
  (custom_host text, GLOBAL UNIQUE; ein Status-Feld; das von Vercel gelieferte
  DNS-Recordset). pgsm.site-Zeilen lassen die neuen Spalten null. Lookup fallweise:
  pgsm.site-Host -> per Label (7a-Pfad unverändert); Custom-Host -> per custom_host
  EXAKT. KEINE Migration bestehender Zeilen (additive nullable Spalten, wie 7a
  published_content) -> keine Live-Daten-Transformation.
- EFFEKTIVER HOST (Sicherheit): sowohl der Serve-Lookup als auch der Middleware-Branch
  lesen den Host aus x-forwarded-host (Prod, von Vercels Edge gesetzt), Fallback auf den
  Host-Header (Dev ohne Proxy). Strikt validiert (Shape [a-z0-9-.], Länge) VOR jeder
  Nutzung (Injection-/Lookup-Schutz, wie die 7a-Label-Validierung). EINE Quelle für
  Branch UND Lookup -> kein Split-Brain (verschiedene Host-Quellen an Branch vs Lookup
  wären ein Bypass). Helfer in lib/hosting/host.ts, unit-testbar (neben extractLabel/
  isServingHost aus 7a). TRUST-BOUNDARY (explizit geloggt): x-forwarded-host wird NUR
  vertraut, weil die Serverless-Funktion ausschließlich hinter Vercels Edge erreichbar
  ist (Edge überschreibt einen client-gesetzten Header). Das wird per Instrument auf
  einem Vercel-Preview BESTÄTIGT (Header loggen), NICHT aus dem Gedächtnis angenommen
  (Instrument schlägt Vermutung — dieselbe Regel wie in 2a/2b).
- VERCEL-API-TOKEN = neues server-only Secret: `import "server-only"`, NIE im
  Client-Bundle, NIE committet, NIE in Migration/SQL-Editor. Gleiche Disziplin wie
  SUPABASE_SERVICE_ROLE_KEY (2a): nur in .env.local (vorher .gitignore verifizieren),
  nur in server-only-Modulen. Alle Vercel-Calls serverseitig.
- ADD-DOMAIN als reine (userId, params)-Funktion: Ownership-Gate DAVOR (heiligstes-Gate-
  Muster aus 2a; MCP-ready gemäß "Session-unabhängige Mutationen"-Constraint),
  Geschäftslogik (Vercel-Call + DB-Write) DAHINTER, sauber getrennt.
- VERCEL-ZWEI-ZUSTAND: Vercel meldet ZWEI unabhängige Zustände — Verification
  (Domain-Besitznachweis, i.d.R. TXT-Record) vs Configuration (DNS zeigt tatsächlich
  hierher / Cert steht). BEIDE gehören ins Statusmodell (eine Domain kann "verifiziert,
  aber fehlkonfiguriert" sein). Provisioning ist ASYNCHRON -> pollen/re-checken (7c-3);
  der Status wird aus Vercels Wahrheit ABGELEITET und DB-gecacht (Ableiten-statt-Löschen,
  konsistent zum projekt-spezifischen View-State-Prinzip).
- APEX + SUBDOMAIN beide unterstützen (Zielnutzer kauft ganze Domains, nicht nur
  Subdomains): DNS-Anweisungen fallweise generiert (Apex -> A-Record auf Vercels IP;
  Subdomain -> CNAME auf Vercels Target). Apex-CNAME-Flattening-Grenze mancher
  Registrare beachten (nicht jeder Registrar kann CNAME auf Apex). Exakte DNS-Werte +
  Vercel-API-Endpunkte gegen die AKTUELLE Vercel-Doku pinnen (NICHT aus dem Gedächtnis —
  Config-Fakten/IP-Targets veralten; gleiche "Config-Fakten nicht aus dem Kopf"-Regel
  wie beim DNS-Recordset).
- PER-USER-HARD-CAP (7c-2): eine Obergrenze pro User schützt Vercels Rate-/Domain-
  Limits. Prüfung in der Add-Domain-Mutation VOR dem Vercel-Call. Ehrlich geloggt:
  App-Layer-Check ist race-anfällig um ±1 (zwei parallele Adds); falls "truly hard"
  nötig, DB-Trigger/Constraint als spätere Option — für den MVP reicht der App-Check.
- KOSTEN/LIMITS geloggt: wöchentlich gekaufte Domains akkumulieren im Vercel-Projekt;
  Cleanup unbenutzter Domains + Rate-Limit-Handling sind spätere Härtung (nicht 7c-1).
- LANDMINEN:
  (a) App-Host-Allowlist-VOLLSTÄNDIGKEIT: die Preview-Hosts (*.vercel.app) NICHT
      vergessen, sonst landen eigene Deployments im Serving-Zweig -> 404 auf die eigene
      App. Absichern per Regressionstest.
  (b) pgsm.site-Serving darf durch die Inversion NICHT brechen -> diskriminierender
      Regressionstest (bekanntes Label serviert weiter, wie in 7a).
  (c) custom_host GLOBAL UNIQUE + Cross-User-Hijack: ein User darf keine fremde/schon
      belegte Domain beanspruchen. Kontrolle = Vercels Verification (real-world
      Besitznachweis) + Ownership-Gate auf der Mutation + der UNIQUE-Constraint.
  (d) x-forwarded-host-Trust-Boundary (siehe EFFEKTIVER HOST) per Preview-Instrument
      bestätigen.

### Scheibe 7c-1 — Serving-Kern (LOKAL ABGESCHLOSSEN, Prod-GATE offen)
Status: lokal vollständig, live getestet auf beiden Serving-Pfaden. Commits
"feat(hosting): 7c-1 middleware-inversion + custom_host serving" + "chore(hosting):
remove 7c-1 diagnostics and gate probe". Pipeline grün (269 Tests, tsc/lint/build).
Die Serving-Kette (Branch -> Rewrite -> Serve-Route -> Resolver) ist end-to-end lokal
grün für BEIDE Pfade (byLabel UND byCustomHost servieren published_content), die App
auf localhost bleibt unberührt.
- Umsetzung: additive Migration 0007 (domains.custom_host nullbar + partial-unique
  WHERE custom_host IS NOT NULL, Cross-User-Hijack-Riegel) live. resolveEffectiveHost
  (x-forwarded-host bevorzugt, host-Fallback, Port-Strip, strikte Shape-Validierung)
  + isAppHost (geschlossene Allowlist inkl. .vercel.app) als reine Funktionen
  unit-getestet. Middleware-Inversion DB-frei; host===null -> Serving-Zweig.
  app-serve-Dispatch (label ? byLabel : byCustomHost) über DIESELBE Host-Quelle wie
  die Middleware (kein Split-Brain). resolve.ts um getPublishedHtmlByCustomHost
  (Spiegel, gleiche Nur-project_id+published_content-Projektion) ergänzt.
- Diskriminierende Wächter grün: pgsm-Label serviert weiter (der Pfad, den die
  Inversion anfasst); Custom-Host -> Serving-Zweig/kein Auth; Passthrough exakt
  (/api/e|/api/capi, jetzt AUCH für Custom-Domains); App-API-Leak-Gegenprobe
  (Custom-Host + andere /api-Route -> KEIN Passthrough); bare pgsm.site kippt bewusst
  in den Serving-Zweig (Inversions-Folge, ein bestehender Test angepasst).
- LEKTION (Instrument schlägt Vermutung, in EINEM Bogen DOPPELT bestätigt): Beide
  404 der lokalen Sim waren TESTDATEN, kein Code-Bug. (a) lvh-Pfad: Tippfehler im
  Label (ef8dh9 statt publiziert ef6dh9). (b) custom-Pfad: es existierte gar keine
  domains-Zeile mit dem custom_host (Insert nie angekommen) -> der byCustomHost-Miss
  war KORREKTES Verhalten. Der [SERVE]-dispatch-Log bewies den korrekten Resolver +
  Port-Strip, BEVOR Code verdächtigt wurde. Sowohl CCs XFH-Verdacht als auch Claudes
  "lvh-Pfad regrediert"-Prämisse wurden vom Instrument WIDERLEGT. Regel bestätigt:
  billiges diskriminierendes Instrument (gezielter Log) vor jeder Code-Hypothese.
- OFFENES GATE (hart, Vorbedingung für 7c-2): Die host-basierte Auth-Inversion ruht
  auf der Annahme, dass Vercels Edge einen client-gefälschten x-forwarded-host
  überschreibt. Lokal NICHT prüfbar — es gibt keinen Edge-Proxy davor; ein lokaler
  curl mit gefälschtem Header zeigt den Fake erwartungsgemäß durchschlagen. Das
  beweist NUR den Parser, NICHT die Boundary. Deshalb NICHT als bewiesen verbucht.
  ERSTER SCHRITT in 7c-2 (sobald Vercel-Konto + erster Prod-/Preview-Deploy existiert):
  das Wegwerf-Edge-Instrument /api/_hostprobe erneut setzen (ruft die ECHTE
  resolveEffectiveHost/isAppHost, surfaced rawXForwardedHost/rawHost/effectiveHost/
  isApp, keine Secrets) und die curl-Matrix gegen die ECHTE Preview-URL fahren: #1
  normal, #2 gefälschter x-forwarded-host. GO nur, wenn die Edge den Fake verwirft
  (effectiveHost == echter Host). NO-GO -> die resolveEffectiveHost-Präzedenz (an
  EINER Stelle isoliert) revidieren, BEVOR die Vercel-Domains-API gebaut wird. Kein
  Weiterbau auf ungeklärter Boundary. Instrument nach dem Urteil wieder entfernen.

### 7c-2-GATE — Ergebnis: XFH-Trust-Boundary in Prod BEWIESEN (GO)
Status: das OFFENE GATE oben ist ERLEDIGT. Der Wegwerf-Probe /api/_hostprobe wurde auf
einem Vercel-Preview (voller 7c-1-Code) gesetzt, die curl-Matrix gefahren, das Urteil
gefällt, der Probe wieder entfernt (Commit "chore(hosting): remove 7c-2 gate host-probe";
grep 7c-2-GATE/_hostprobe = 0, Pipeline grün, alle 269 Tests/7c-1-Tests weiter grün).
- BEFUND: Vercels Edge ÜBERSCHREIBT einen client-gelieferten x-forwarded-host mit dem
  echten Host. Die Vercel-Doku SCHWIEG dazu (nur x-forwarded-FOR ist explizit
  spoofing-geschützt dokumentiert) -> GETESTET, nicht angenommen. Matrix-Ergebnis: #2
  (gefälscht x-forwarded-host: evil-attacker.example) UND #3 (gefälscht: pagesmith.app)
  wurden BEIDE zum echten Preview-Host überschrieben; effectiveHost war STETS der echte
  Host. Auch der RFC-7239-`forwarded`-Header ist Vercel-kontrolliert. -> Konsequenz:
  resolveEffectiveHost (Präzedenz x-forwarded-host ZUERST) ist in Prod sicher; die
  host-basierte Auth-Inversion steht auf bewiesenem Grund, kein Host-Spoof-Auth-Bypass.
- host-FALLBACK: reine Local-Dev-Bequemlichkeit (Dev ohne Edge-Proxy). In Prod moot —
  Vercel setzt x-forwarded-host IMMER, ein Angreifer kann den Fallback nicht erzwingen
  (er müsste x-forwarded-host WEGlassen, aber die Edge setzt ihn ohnehin).
- LEKTION (Instrument schlägt Vermutung, erneut bestätigt): die Doku-STILLE zu
  x-forwarded-host hätte die Trust-Boundary als ungeprüfte Annahme im Fundament
  hinterlassen. Kein Menge Code-Lesen hätte das aufgelöst — nur der Probe auf echter
  Vercel-Edge machte aus der Annahme eine Tatsache (dieselbe Regel wie 2a/2b/7c-1).
- OPS-STAND (Team-Gedächtnis): 7b + 7c-1 (+ der Gate-Cleanup) liegen auf Branch
  gate/7c-2-xfh; main ist DAHINTER (kennt weder 7b noch 7c-1). Ein ÜBERLEGTES Release
  nach main steht damit als eigene Entscheidung an — es ist KEIN Nebeneffekt des Gates
  und wurde bewusst nicht mit-gemerged. Vor 7c-2-Bau bzw. Prod-Nutzung klären.

