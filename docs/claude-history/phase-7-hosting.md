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
  (publayer.net) — App bleibt pagesmith.app. Bösartiges User-HTML kann die App-Origin
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
*.publayer.net (Wildcard teilt Registrable Domain) -> auf publayer.net NIEMALS app-relevante
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
Maxlänge) vor dem Lookup (Injection/Sub-Sub-Schutz). eTLD+1-Isolation: publayer.net setzt
keine App-Cookies.

Ziel: ein gespeichertes+publiziertes Projekt ist unter einer *.publayer.net-URL als echte
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
  isServingHost(host). Serving-Suffixe .publayer.net (Prod) UND .lvh.me (lokal) -> LABEL-Match
  fork-frei (meinprojekt.publayer.net == meinprojekt.lvh.me:3000). STRIKTE Label-Validierung
  ^[a-z0-9-]{1,63}$ VOR jedem Lookup: Punkt/Sonderzeichen/verschachtelte Sub-Subdomain
  (foo.bar.publayer.net) -> null -> 404, kein Lookup (Label-Injection-Schutz).
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
  Live-URL aus NEXT_PUBLIC_HOSTING_DOMAIN (Dev lvh.me:3000, Prod publayer.net) + Label gebaut.
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
- Middleware: publayer.net-Host -> rewrite auf /app-serve, KEIN /login-Redirect; App-Host
  anonym auf geschützten Pfad -> weiter /login (Auth-Gate intakt); App-Host setzt Cookies,
  publayer.net nicht.
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
unter *.publayer.net, sondern unter der EIGENEN Domain des Marketers (Zielnutzer kauft
wöchentlich neue Domains für Rapid Testing). Konzept + Entscheidungen unten; Bau in
den vier 7c-Scheiben (siehe Roadmap). Jede Entscheidung MIT Begründung, damit heutige
Schnittführung die späteren Scheiben nicht versperrt.

- MODELL: Kunden-Domain per Vercel-API unserem Vercel-Projekt hinzufügen; Vercel macht
  Cert-Provisioning + Edge-Routing, wir lösen den eingehenden Host serverseitig zum
  Projekt auf. SSL an die Plattform delegiert (kein eigenes ACME) — gleiche
  Delegations-Entscheidung wie in der Phase-7-Owner-Direktive, jetzt umgesetzt.
- MIDDLEWARE-INVERSION (Kern-Entscheidung): Die Host-Verzweigung kippt von "ist
  Serving-Host?" (7a: Suffix-Match auf publayer.net/lvh.me) auf "ist APP-Host?" (Allowlist:
  pagesmith.app, www, die *.vercel.app-Preview-Hosts, localhost/Dev). ALLES andere fällt
  in den Serving-Zweig -> publayer.net UND beliebige Custom-Domains teilen denselben Pfad,
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
  App UND von anderen Kunden (stärker als die geteilte *.publayer.net-Wildcard, die
  Registrable Domain teilt und deshalb die "auf publayer.net NIE App-Cookies"-Grenze
  brauchte). Regel "auf Nicht-App-Hosts NIE App-Cookies/Auth-State" gilt unverändert
  und deckt Custom-Domains ohne Zusatzarbeit mit ab.
- DATENMODELL additiv: die bestehende `domains`-Tabelle bekommt NULLBARE Spalten
  (custom_host text, GLOBAL UNIQUE; ein Status-Feld; das von Vercel gelieferte
  DNS-Recordset). publayer.net-Zeilen lassen die neuen Spalten null. Lookup fallweise:
  publayer.net-Host -> per Label (7a-Pfad unverändert); Custom-Host -> per custom_host
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
  (b) publayer.net-Serving darf durch die Inversion NICHT brechen -> diskriminierender
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
- Diskriminierende Wächter grün: publayer-Label serviert weiter (der Pfad, den die
  Inversion anfasst); Custom-Host -> Serving-Zweig/kein Auth; Passthrough exakt
  (/api/e|/api/capi, jetzt AUCH für Custom-Domains); App-API-Leak-Gegenprobe
  (Custom-Host + andere /api-Route -> KEIN Passthrough); bare publayer.net kippt bewusst
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


### Scheibe 7c-2 — Custom-Domains Ende-zu-Ende (ABGESCHLOSSEN, live verifiziert)
Aus der Root-CLAUDE.md ausgelagert, nachdem die Familie 2a/2b/2c/Entfernen vollständig und
in PRODUKTION bewiesen war. Der Root-Titel trug bis zuletzt "in Arbeit" — das war beim
Auslagern nicht mehr zutreffend: Custom-Domain-Registrierung (Add, DNS-Anzeige,
Status-Polling, Entfernen) ist Ende-zu-Ende live; der letzte Beweis war ein echter
Produktions-Smoke, bei dem test.thrty.store über die deployte Produktions-URL hinzugefügt
und dort in Sekunden als "Live" bestätigt wurde (belegt, dass VERCEL_API_TOKEN/
VERCEL_PROJECT_ID auch in Vercels eigener Serverless-Runtime greifen, nicht nur lokal).

VORAUSSETZUNGEN, die in dieser Scheibe schon standen und ANDERSWO dokumentiert sind (hier
nicht doppelt): der XFH-Trust-Boundary-Vollbeweis (s. "7c-2-GATE" oben) und der
7c-1-Serving-Kern (s. "Scheibe 7c-1" oben). Die AKTIVEN Regeln aus diesem Block (PostgREST-
{data,error} + echte PKs, NEXT_PUBLIC_-Redeploy-Pflicht, Host-Quelle fürs Branching,
Ableiten-statt-Hardcoden) wurden VOR der Auslagerung in die Root-Sektionen "Immer beachten"
bzw. "Offene Punkte" (isAppHost-Platzhalter, Hobby-50-Domain-Decke) gehoben und gelten dort
weiter — sie stehen unten nur noch als historischer Kontext.

### 7c-2 — Entscheidungen (Vercel-Domains-API)
- ZWEI GETRENNTE FLOWS (nicht verwechseln): (a) *.pgsm.site = UNSERE
  Wildcard-Serving-Domain -> MUSS per Nameserver-Delegation an Vercel (das
  Wildcard-Cert braucht DNS-Kontrolle bei Vercel); (b) Kunden-Custom-Domains =
  Apex (A-Record) / Subdomain (CNAME, PROJEKTSPEZIFISCHER Wert) bzw.
  TXT-Besitznachweis, falls die Domain schon auf einem anderen Vercel-Account liegt.
- PLAN: Hobby fürs MVP. Hobby deckelt bei 50 Custom-Domains PRO PROJEKT, geteilt über
  ALLE Kunden -> der Per-User-Cap hat DOPPELrolle (Abuse-Schutz + Schutz der geteilten
  Decke); MVP-Richtwert 3/User. Pro-Upgrade VOR echter Skalierung.
- DNS-WERTE dynamisch aus Vercels Antwort/Config PRO DOMAIN lesen, NIE hardcoden
  (CNAME-Ziel ist projektspezifisch; auch die Wildcard-Nameserver EXAKT aus dem
  Vercel-Dashboard nehmen, nicht generische ns1/ns2 annehmen).
- TOKEN-EHRLICHKEIT: Vercel-Tokens sind team-scoped, KEIN per-Endpoint-Scope auf unserem
  Tier. "Maximal scoped" = dedizierter Team-Token, server-only wie service_role, PLUS
  eigenes Mutations-Audit-Log als tragende Kontrolle (Defense-in-Depth-Ehrlichkeit).
- VERIFICATION vs CONFIGURATION bestätigt: die API liefert `verified` (Besitz) +
  `misconfigured` (DNS/Cert) getrennt -> das Zwei-Zustand-Statusmodell war richtig.
- 7c-2a KONKRET (nächster Schritt): pgsm.site-Nameserver auf die von Vercel angezeigten
  umstellen; pgsm.site (Apex) + *.pgsm.site (Wildcard) im Projekt anlegen. Reversibel;
  pgsm.site hat aktuell keine Records -> saubere Delegation. Live-URL-Bau muss
  env-abhängig sein (Dev <label>.lvh.me:3000 / Prod <label>.pgsm.site). pagesmith.app
  bleibt UNBERÜHRT.
- SERVING-DOMAIN FINAL (gekauft): publayer.net (Apex + Wildcard *.publayer.net).
  ERSETZT den bisherigen Arbeitsnamen "pgsm.site" in diesem Block/der Roadmap — überall,
  wo oben pgsm.site steht, gilt jetzt publayer.net. Bewusst GETRENNT von der Brand-/App-
  Domain -> Shared-Reputation-Blast-Radius eingedämmt (Security-Manifest): wird eine
  Kundenseite geflaggt, bleibt die App-/Marken-Domain unberührt.
- Wildcard *.publayer.net erzwingt NAMESERVER-DELEGATION an Vercel (das Wildcard-Cert
  braucht DNS-Kontrolle bei Vercel). Die Nameserver EXAKT aus dem Vercel-Dashboard
  nehmen, nie generisch (ns1/ns2) annehmen.
- FALLSTRICK (build-zeit-inlined): NEXT_PUBLIC_HOSTING_DOMAIN wird zur BUILD-ZEIT ins
  Client-Bundle inlined -> die env in Vercel zu setzen reicht NICHT, es braucht einen
  REDEPLOY. Sonst trägt das Bundle still den alten Wert (Live-Link fehlt, OHNE
  Fehlermeldung).
- BRAND-/APP-DOMAIN weiterhin OFFEN -> isAppHost trägt pagesmith.app als PLATZHALTER.
  Beim Brand-Domain-Kauf in EINEM überlegten Schritt umstellen (isAppHost-Allowlist +
  NEXT_PUBLIC_APP_URL + Doku). OFFENER PUNKT — nicht vergessen.
- SHARED-REPUTATION wird mit 7c-2a live -> Kill-Switch (Manifest Tier 0) vor 7c-2b
  einplanen.
- 7c-2a ABGESCHLOSSEN — publayer.net LIVE, Prod-Serving bewiesen:
- SERVING-DOMAIN final: publayer.net (Apex + Wildcard), gekauft UND live. Getrennt von
  der weiterhin offenen Brand-/App-Domain (Platzhalter pagesmith.app in isAppHost bleibt
  vorerst bestehen -> offener Punkt für später).
- BEWIESEN in Prod: der komplette Serving-Zweig (Middleware-Inversion -> Rewrite ->
  Serve-Route -> servingSuffixes -> published_content) läuft über die echte HTTPS-Domain,
  nicht nur lokal simuliert. Schließt die letzte aus 7c-1 offen gebliebene
  Verifikationslücke (Serving war in Prod vorher nicht erreichbar, da keine echte
  Serving-Domain existierte).
- STOLPERSTEIN (Lektion, bleibt stehen): NEXT_PUBLIC_-Variablen sind BUILD-ZEIT-inlined.
  Env in Vercel setzen OHNE Redeploy ändert das laufende Bundle NICHT -> nach jeder
  Änderung an NEXT_PUBLIC_HOSTING_DOMAIN ist ein REDEPLOY PFLICHT.
- CODE-FIX unterwegs entdeckt & behoben: SERVING_SUFFIXES war hardcoded
  (.pgsm.site/.lvh.me), NICHT env-gekoppelt -> hätte auf publayer.net STILL 404 erzeugt
  (extractLabel=null -> falscher Dispatch auf byCustomHost). Auf EINE Quelle vereinheitlicht
  (servingSuffixes() aus NEXT_PUBLIC_HOSTING_DOMAIN), .lvh.me bleibt hart codierter
  env-unabhängiger Dev-Fallback; Härtung gegen Tippfehler (führende Punkte/trailing
  slash/Whitespace); Dispatch-Guard-Test gegen Rückfall.
- NEBENFUND (separater offener Punkt, KEIN 7c-2a-Blocker): beim Live-Test feuerte der
  CLIENT-seitige fbq-Pixel-Call für Purchase-Events NICHT (kein Netzwerk-Request im
  Browser), während der SERVER-CAPI-Pfad einwandfrei läuft (Meta Events Manager zeigt
  "Kauf"-Events, Quelle "Server", korrekt verarbeitet, mehrfach bestätigt). Dedup
  (Browser+Server, gleiche eventID) daher NOCH NICHT bewiesen -> aktuell nichts zu
  deduplizieren, da nur eine Quelle ankommt. Eigene kleine Untersuchung, nicht Teil von
  7c-2a.
- NEBENFUND AUFGELÖST: Der Client-Pixel feuerte nicht, weil META SELBST das Event ablehnte
  (Browser-Konsole: "is unavailable on this website due to it's traffic permission
  settings"), NICHT wegen Adblocker oder Code-Bug. fbevents.js lud sauber (Status 200) und
  der generierte fbq('track','Purchase',…)-Call war korrekt verdrahtet (Selector-Match,
  value als Zahl, MODE=export). Ursache: Metas "Traffic Permissions"-Allow-List auf dem
  Pixel-Konto enthielt publayer.net nicht -> Meta verwarf das Browser-Event lautlos. KEIN
  Code-Fix nötig — die Ursache lag vollständig im Meta-Business-Konto. CAPI (server-seitig,
  per Access-Token authentifiziert) unterliegt dieser Traffic-Permission NICHT, deshalb
  liefen die Server-Events durchgehend korrekt. NACH Eintragen von publayer.net in die
  Allow-List: Client-Pixel feuert (tr/-Request, Status 200), Dedup funktioniert (siehe 7c-4).
- SUPPORT-/TROUBLESHOOTING-HINWEIS (Zukunft): Kunden mit einer aktiven Meta-Traffic-
  Permissions-Allow-List MÜSSEN ihre Pagesmith-Serving-Domain (publayer.net bzw. ihre
  Custom-Domain) dort eintragen, sonst bleiben Browser-Events lautlos aus, während CAPI
  weiterläuft — exakt dieses Symptom (Server-Events OK, Browser-Pixel stumm, Konsole meldet
  "traffic permission settings") ist ein KONTO-Setup-Punkt, KEIN Pagesmith-Bug.
- 7c-2a UND 7c-4 VOLLSTÄNDIG ABGESCHLOSSEN und live verifiziert auf publayer.net: alle fünf
  Bausteine bewiesen auf echter Domain — Serving, /api/e-Passthrough, Client-Pixel,
  Server-CAPI und Dedup (identische eventID, beide "Verarbeitet").
- NÄCHSTER SCHRITT: Kill-Switch (Security-Manifest Tier 0) VOR 7c-2b — ab jetzt servieren
  echte Domains öffentlich, das Shared-Reputation-Risiko ist REAL (nicht mehr theoretisch).

### 7c-2b — Add-Domain-Mutation: Konzept & Entscheidungen
- SCOPE DIESER SCHEIBE: NUR die Add-Domain-Mutation selbst (Vercel-Call + Persistenz +
  Ownership-Gate + Per-User-Cap + Rate-Limit + Audit-Log). Verify/Status-Polling + die
  dazugehörige UX (DNS-Anweisungen anzeigen, verified/misconfigured-Status) bleibt bewusst
  7c-2c — gleiche Schnittführung wie ursprünglich geplant, nicht aufgeweicht. Grund: eine
  Scheibe bleibt demobar und prüfbar, wenn sie EINE Verantwortung trägt; Mutation und
  Status-Polling sind zwei getrennte Zustandsmaschinen und werden nicht vermischt.
- SELBST-KORREKTUR (Ehrlichkeit vor Bequemlichkeit): Die frühere Aussage "Vercel-Tokens
  sind team-scoped, kein per-Endpoint-Scope" (oben im 7c-2-Entscheidungsblock unter
  TOKEN-EHRLICHKEIT) war eine UNVERIFIZIERTE Annahme aus der ersten 7c-2-Konzeptphase — bei
  Nachprüfung zeigt Vercels aktuelle CLI-Doku, dass projekt-gebundene Tokens inzwischen
  existieren (vercel tokens create kann einen Token erzeugen, der nur auf EIN Projekt wirkt,
  reduziert Blast-Radius bei Leak). ENTSCHEIDUNG: projekt-gebundener Token wird verwendet
  (Least-Privilege, Security-Manifest-konform). Exakte CLI-Syntax beim Bau gegen die AKTUELLE
  Vercel-Doku prüfen, NICHT aus dieser Doku-Zeile übernehmen (Config-Fakten veralten).
- ZWEI-ZUSTAND-MODELL EMPIRISCH BESTÄTIGT (nicht nur theoretisch): Ein Vercel-Community-
  Bericht zeigt, dass die POST-Antwort beim Domain-Hinzufügen `verified: true` liefern kann,
  OBWOHL die DNS-Konfiguration noch nicht steht. Das `verified`-Feld aus der Add-Response ist
  damit NICHT vertrauenswürdig für den echten Status — nur der separate GET-Config-Check
  (misconfigured-Feld, Teil von 7c-2c) ist die verlässliche Quelle. Rechtfertigt rückwirkend
  das von Anfang an geplante Zwei-Zustand-Modell (Verification vs. Configuration).
- DOMAIN-NORMALISIERUNG (vor JEDEM weiteren Schritt: Ownership-Gate, Cap, Vercel-Call):
  Trim, lowercase, Protokoll (http://, https://) und trailing slash strippen. HARTE GRENZEN
  (Normalisieren ≠ Umdeuten): KEIN automatisches Strippen von "www." — www.kunde.de und
  kunde.de sind zwei verschiedene DNS-Einträge mit unterschiedlichen Anweisungen (CNAME vs.
  A-Record), die Nutzer-Eingabe muss unverändert durchgereicht werden. Führende
  "*."-Wildcard-Präfixe werden HART ABGELEHNT (das ist ein legitimer Use-Case für UNSERE
  Serving-Domain, kein Use-Case für eine einzelne Kunden-Landingpage). Lokale Regex ist nur
  ein billiger Vorfilter gegen offensichtlichen Unsinn/Injection (Leerzeichen, Sonderzeichen,
  ".."), NICHT der Wahrheits-Anker für Domain-Gültigkeit — die eigentliche Autorität bleibt
  Vercels eigene 400-Antwort. IDN/Umlaut-Domains sind eine bekannte, bewusst nicht behandelte
  Lücke (nicht jetzt lösen, nur vermerkt).
- FEHLER-MAPPING — EMPIRISCH KORRIGIERT (ursprünglicher Plan sagte "400 = existiert bereits
  auf diesem Projekt -> Heilung"; das war eine unverifizierte Doku-Lesart, durch echten
  Doppel-Add-Call widerlegt): Der Owner-Retry (Domain existiert bereits auf UNSEREM Projekt)
  liefert real HTTP 409 mit error.code "domain_already_in_use", NICHT 400. Diskriminator:
  409 + error.code === "domain_already_in_use" + die im Body mitgelieferte projectId ===
  unsere VERCEL_PROJECT_ID -> HEILEN. Jedes andere 409 (fremdes Konto) -> Konflikt zeigen,
  NICHT heilen. Der dokumentierte 400 bleibt als generischer "Domain ungültig"-Fehler, ist
  aber NICHT mehr der Heilungsauslöser. 403 = kein Zugriff auf die Domain -> Fehler an Nutzer.
- VERIFIED:TRUE EMPIRISCH BESTÄTIGT WERTLOS: Live reproduziert — eine nie besessene, DNS-lose
  Domain lieferte beim Add sofort verified:true, keine Challenge. Bestätigt den
  Community-Befund aus der Konzeptphase als eigenes Beobachtungsergebnis, nicht nur zitierte
  Fremdquelle. Persistenz bleibt entsprechend: immer status:'pending'.
- IDEMPOTENZ & HEILUNG (eng begrenzt, KEINE allgemeine Sync-Engine): Wenn Vercel den oben
  korrigierten 409 (error.code "domain_already_in_use" + eigene projectId) meldet, weil die
  Domain bereits auf UNSEREM Projekt existiert (z.B. nach einer fehlgeschlagenen
  DB-Transaktion beim vorigen Versuch), holt derselbe Mutations-Aufruf den aktuellen
  Vercel-Zustand nach und schreibt/heilt die eigene DB-Zeile damit -> ein erneuter
  Add-Versuch des rechtmäßigen Owners wird NICHT blockiert. Das ist ein einziger, eng
  begrenzter Zweig INNERHALB der Mutation, kein Hintergrund-Job/Cron. Das tatsächliche
  Vercel-Verhalten ist inzwischen EMPIRISCH BESTÄTIGT (echter Doppel-Add gegen dieselbe
  Domain: Add #1 -> 200, Add #2 -> 409 "domain_already_in_use" mit eigener projectId im
  Body) — die Verzweigung wird auf diesen realen Diskriminator verdrahtet, nicht auf die
  ursprünglich vermutete 400-Lesart. Doku war Ausgangspunkt, Instrument war Beweis.
  RENNBEDINGUNG: zwei parallele Add-Versuche desselben Users werden vom bestehenden
  Partial-Unique-Index auf domains.custom_host (aus 7c-1) auf DB-Ebene gefangen; der Code
  behandelt diese Constraint-Verletzung als "parallel bereits geschrieben, aktuellen Stand
  neu lesen", NICHT als harten Absturz.
- RATE-LIMITING (erstes Rate-Limiting im gesamten Projekt, ehrlich als Netto-neue Arbeit
  behandelt — im Security-Manifest bisher nur für /api/e|/api/capi als "geplant" vermerkt,
  hier zuerst für die Domain-Mutation gebaut): KEINE zweite Zähl-Infrastruktur — nutzt das
  ohnehin verpflichtende Audit-Log (Actor + Zeitpunkt jeder Mutation) direkt als Datenquelle
  ("zähle Einträge dieses Users der letzten Stunde"). Kein Redis/Queue auf Verdacht
  (Skalierungs-Manifest-Prinzip). Zählt ALLE Versuche (auch abgelehnte: ungültige Domain,
  Cap erreicht, 409-Konflikt), nicht nur erfolgreiche — jeder Versuch kostet
  Aufmerksamkeit/API-Kontingent. Richtwert: max. 5 Registrierungsversuche/Stunde/User.
- VOLLSTÄNDIGE MUTATIONS-REIHENFOLGE (billig -> teuer sortiert):
  1. Ownership-Gate (gehört project_id dem userId?)
  2. Normalisierung + Formvalidierung (inkl. Wildcard-Ablehnung)
  3. Lokaler DB-Kollisionscheck (fremder Owner -> Fehler; eigener Owner bereits vorhanden ->
     Heilungspfad)
  4. Rate-Limit-Check (Audit-Log-Query)
  5. Per-User-Hard-Cap-Check (schützt Vercels/Hobby-Kontingent, wie in der 7c-2-
     Grundentscheidung verankert)
  6. Vercel-API-Call MIT striktem Timeout (Skalierungs-Manifest: jeder externe Call braucht
     ein Timeout)
  7. Fehler-Mapping (400-eigenes-Projekt -> heilen; 409 -> Konflikt zeigen; sonst ->
     generischer Fehler)
  8. Persistenz (custom_host + roher verification-Block aus Vercels Antwort, Status erstmal
     "pending" — NICHT aus dem unzuverlässigen verified-Flag abgeleitet) + Audit-Log-Eintrag
     (Actor + Zeit + Domain).
- 7c-2b ABGESCHLOSSEN — Add-Domain-Mutation gebaut UND live gegen echtes Vercel + echtes
  Supabase (publayer.net-Projekt) verifiziert. Pipeline grün (326 Tests, tsc, eslint,
  next build). Dateien: Migration 0009 (domains.{verification_status(+CHECK),verification,
  vercel_synced_at} + audit_logs, RLS OHNE jede Policy -> append-only, nur service_role);
  src/lib/domains/{normalize,audit,register}.ts; src/lib/vercel/client.ts;
  src/app/projects/domain-actions.ts (dünne "use server"-Session-Schicht); HOSTNAME_RE aus
  hosting/host.ts wiederverwendet.
- STRUKTUR (wie beschlossen): die reine (userId, params)-Mutation lebt in
  src/lib/domains/register.ts MIT `import "server-only"` und OHNE "use server" — sonst wäre
  der userId-Parameter eine client-wählbare Server-Action (Bypass). Die "use server"-Schicht
  (domain-actions) reicht nur die Session-userId herein; MCP (Phase 10) hängt sich mit
  EIGENER Autorisierung an denselben Eingang. Ownership-Gate = expliziter
  user_id-Vergleich via Admin-Client (session-unabhängig), KEIN privilegierter Write davor.
- LIVE-BEWEIS (drei Pfade, echte Infrastruktur): (1) neue Domain -> success, DB-Zeile
  verification_status='pending' (NICHT aus verified:true abgeleitet), verification=null
  (Vercel gab keine Challenge — deckt sich mit dem "verified:true wertlos"-Befund);
  (2) gleiche Domain erneut -> lokale Idempotenz already_registered_self (KEIN Vercel-Call,
  healed:false); (3) "lost transaction" simuliert (DB-Zeile gelöscht, Vercel behält Domain)
  -> 409 domain_already_in_use + eigene projectId -> HEILUNG healed:true, DB-Zeile
  nachgeholt. Audit-Verlauf exakt success -> already_registered_self -> healed, JE genau ein
  Eintrag pro Aufruf. Cleanup rückstandsfrei (Vercel 404, DB leer, Wegwerf-Route + temporäre
  Middleware-Test-Ausnahme rückgängig).
- OFFENE PUNKTE (bewusst, kein Blocker): vercel_synced_at wird beim Insert NOCH NICHT
  gesetzt (bleibt null) -> das schreibt der Config-Poll in 7c-2c. Der echte
  Verify/Configuration-Status (misconfigured) + die DNS-Anweisungs-UX bleiben 7c-2c
  (Scope gehalten). Der VERCEL_API_TOKEN ist projekt-gebunden (Least-Privilege, empirisch
  bestätigt: teamId für Lese-/Schreib-Calls nicht nötig -> wird nicht gesendet).
- NÄCHSTER SCHRITT: 7c-2c (Config-Status-Polling verified/misconfigured + DNS-Anweisungs-UX,
  setzt vercel_synced_at). Security-Manifest Tier 1: VERCEL-TOKEN-Scope + Domain-Mutations-
  Audit-Log ist mit dieser Scheibe erfüllt (Audit-Log gebaut, Token projekt-scoped).

### 7c-2c — DNS-Anweisungs-UX: Konzept & Entscheidungen
- ZIELGRUPPEN-CHARAKTER (prägt jede Entscheidung dieser Scheibe): Erste Scheibe im gesamten
  Projekt, deren primärer Nutzer NICHT der Betreiber, sondern der technisch unbedarfte
  Marketer ist — er muss bei seinem Registrar (IONOS, GoDaddy, Namecheap…) ohne Hilfe die
  richtigen DNS-Zeilen eintragen. Erfolg misst sich daran, ob das OHNE Support-Rückfrage
  gelingt, nicht nur daran, dass der Code funktioniert.
- SCOPE DIESER SCHEIBE: DNS-Records anzeigen (dynamisch aus Vercel, nie hardcoded) +
  Status-Check/Refresh + verständliche, abgeleitete Fehlerzustände. AUSSERHALB des Scopes:
  die POST-.../verify-TXT-Challenge für den Fall "Domain liegt auf fremdem Vercel-Account"
  (Randfall, eigene Scheibe falls je gebraucht); jegliche automatische Serving-Umschaltung
  (bereits durch 7c-1-Middleware-Inversion + 7c-2a-Custom-Host-Lookup abgedeckt — sobald
  misconfigured:false, ist die Domain ohne weiteren Code live-fähig).
- DATENQUELLE — GET .../domains/{domain}/config (empirisch aus aktueller Vercel-Doku,
  Response-Shape bestätigt): liefert configuredBy (CNAME|A|http|dns-01|null), misconfigured
  (bool), recommendedCNAME (Array {rank,value:string}, rank=1 bevorzugt), recommendedIPv4
  (Array {rank,value:string[]} — value ist SELBST ein Array, bei rank=1 können MEHRERE IPs
  zurückkommen, ALLE müssen als A-Records angezeigt werden, nicht nur die erste). NICHTS wird
  hardcoded — die DNS-Werte sind projektspezifisch und dynamisch (Community-Beleg: z.B.
  xyz.vercel-dns-016.com statt eines generischen Werts). Exakte Endpunkt-/Feldnamen beim Bau
  nochmal gegen die dann aktuelle Vercel-Doku pinnen (Config-Fakten veralten).
- APEX VS. SUBDOMAIN — VOLLAUTOMATISCH, KEIN MANUELLER SCHALTER: Die UI erkennt anhand der
  gespeicherten Domain selbst (Label-Struktur, kein "." vor der Registrable-Domain = Apex),
  ob sie den A-Record-Block (recommendedIPv4) oder den CNAME-Block (recommendedCNAME)
  prominent zeigt. Der Nutzer wählt nicht selbst, welche Anleitung für ihn gilt — das wäre
  eine unnötige Fehlerquelle.
- FEINAUFLÖSUNG DER ZUSTÄNDE (aus configuredBy+misconfigured ABGELEITET, da Vercels API kein
  explizites "Konflikt"-Feld liefert — die Granularität entsteht aus der Kombination, nicht
  aus einem direkt gelieferten Wert):
  1. configuredBy:null + misconfigured:true -> "Wir sehen noch gar nichts" (Nutzer hat
     vermutlich noch nichts eingetragen, ODER Propagation läuft noch) -> "warte auf dich /
     warte aufs Internet"-Botschaft.
  2. configuredBy:"CNAME" ODER "A" + misconfigured:true -> "Wir sehen etwas, aber es ist
     falsch" (ein Record existiert, passt aber nicht zu unserem Projekt, z.B. veralteter
     Eintrag) -> Nutzer muss AKTIV etwas löschen/korrigieren, nicht nur warten. Das ist der
     Fall, der sonst zum stillen Support-Albtraum wird (Nutzer wartet ewig auf einen Zustand,
     der von allein nie grün wird).
  3. configuredBy:"http" -> eigener, benennbarer Zustand: Domain läuft vermutlich über einen
     Proxy/CDN (z.B. Cloudflare) davor -> spezifisch benennen statt generisch "falsch
     konfiguriert".
  Grund für diese Aufschlüsselung: Support-Prävention. Ein pauschales "warte" bei Fall 2
  lässt den Nutzer auf etwas warten, das nie von selbst eintritt.
- POLLING-STRATEGIE (zwei Ebenen, Client UND Server — Client-Schutz ist UX, Server-Schutz
  ist die eigentliche Absicherung, gleiche Lehre wie bei 7c-2b):
  - CLIENT: manueller "Status prüfen"-Button + sparsames Auto-Intervall (60s), gestoppt via
    Page Visibility API sobald der Tab inaktiv ist. Button nach Klick für 10s gesperrt
    (visueller Cooldown) gegen ungeduldiges Wiederholt-Klicken.
  - SERVER (die tragende Kontrolle, NICHT nur die Client-Geste): der bestehende
    vercel_synced_at-Zeitstempel (aus 7c-2b, bisher ungenutzt) wird zur Bremse: ist die
    letzte Prüfung jünger als 15-20s, liefert der Endpunkt den zwischengespeicherten DB-Stand
    statt erneut gegen Vercel zu fragen — UNABHÄNGIG davon, welcher Tab/Client/Skript fragt.
    Schützt gegen (a) direkten Skript-Missbrauch, der den Client-Cooldown umgeht, UND (b) das
    harmlose, aber reale Mehrfach-Tab-Problem (mehrere offene Tabs derselben Domain-Seite =
    Vielfaches an Poll-Traffic ohne böse Absicht). Keine neue Infrastruktur — nutzt eine
    bereits existierende, bisher ungenutzte Spalte.
- COPY-BUTTONS: jeder kopierte Wert wird vor dem Schreiben ins Clipboard strikt getrimmt
  (keine führenden/folgenden Leerzeichen) — ein kopiertes Leerzeichen vor einem CNAME-Wert
  ist eine reale, schwer auffindbare Fehlerquelle für einen Nicht-Techniker.
- REGISTRAR-TERMINOLOGIE-TABELLE: einfache Übersetzungshilfe für die gängigsten Anbieter
  (z.B. "Name" bei GoDaddy = "Host" bei IONOS = "@" für Apex bei anderen) — registrar-
  AGNOSTISCH bleiben (keine providerspezifischen Screenshots/Flows pflegen), aber die
  häufigste Verwirrungsquelle (unterschiedliche Feldnamen für dasselbe Konzept) direkt
  adressieren.
- BEKANNTE, BEWUSST NICHT BEHANDELTE GRENZE (CAA-Randfall): Falls ein Registrar bereits
  andere CAA-Records trägt, braucht Let's Encrypt einen zusätzlichen expliziten CAA-Eintrag
  für "letsencrypt.org" — sonst schlägt die Zertifikatsausstellung fehl, OHNE dass
  getDomainConfig das zwingend als klar benannte Ursache zeigt (bräuchte eine separate
  DNS-Abfrage außerhalb von Vercels Config-Endpunkt). Als SUPPORT-HINWEIS dokumentieren
  ("sieht alles richtig aus, klappt aber trotzdem nicht -> CAA-Records prüfen"), NICHT extra
  dafür bauen — seltener Randfall, eigene Abfrage-Infrastruktur nicht gerechtfertigt.

### 7c-2 — Familie abgeschlossen (2a/2b/2c/Entfernen)
Die Custom-Domain-Familie ist Ende-zu-Ende in Produktion bewiesen: Add (7c-2b),
DNS-Anzeige + Status-Polling (7c-2c) und Entfernen. Zwei Lektionen aus dem Bauprozess,
festgehalten damit sie nicht nur im Chat-Verlauf stecken:
- LEKTION "Domain-Identität nie über ein angenommenes Feld annehmen": ein Bug entstand,
  weil Code eine Spalte "id" auf domains selektierte, obwohl der echte Primärschlüssel
  "label" ist (0006). PostgREST lehnte mit 42703 ab, der Code destrukturierte aber nur
  {data} statt {data, error} -> der Fehler wurde verschluckt, die UI zeigte still eine
  leere Liste statt eines Fehlers. REGEL: bei JEDER neuen Query den echten PK der
  Zieltabelle nachsehen, nie aus dem Feldnamen "id" annehmen; PostgREST-Queries IMMER
  {data, error} destrukturieren, nie nur {data}.
- LEKTION "Ein identischer Statuscode kann bewusst uninformativ sein" (aus 7c-2b, hier
  bestätigt wiederverwendet): Verifikation von Vercel-Mutationen (Add/Remove) muss über
  die NACHGELAGERTE Wirkung erfolgen (Vercel-Dashboard/echter Config-Abruf), nicht über
  den HTTP-Status allein, wo die API bewusst keine Rückschlüsse zulassen will (z.B. 204
  bei Kill-Switch, verified:true trotz fehlender DNS bei Vercel-Add).
- Custom-Domain-Registrierung (Add/DNS-Anzeige/Status/Entfernen) ist damit als Feature
  vollständig, Ende-zu-Ende, in Produktion bewiesen.
