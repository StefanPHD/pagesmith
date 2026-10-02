# Phase 13.7 — Sicherheit & Datenintegrität: DER AKTIVE STAND

**PFLICHT-GATE:** Diese Datei ist ab ihrer Anlage (2026-10-02) das Pflicht-Gate ("Auftrag 0")
jedes Bau- und Aufklärungs-Prompts der Phase 13.7 (CLAUDE.md, "## Aktiver Stand — Verfahren ab
Phase 10"). Verfahren: docs/arbeitsweise.md, "Die Standdatei".

**GEGENSTAND:** Roadmap-Zeile 13.7 (docs/roadmap.md) — dort stehen das Bedrohungsmodell mit
seinen sechs Klassen, Anlass, Abgrenzung, die aus Phase 13.6 zugewiesenen Vorrats-Einträge und
die Eingaben aus dem Phasenende 13.6. Sie werden hier NICHT abgeschrieben. Die Basis, nicht der
Ersatz: das Sicherheits-Manifest (CLAUDE.md, "## Security Manifest & Launch Blocker";
Vollfassung docs/claude-history/security-manifest-full.md).

**NUMMERN:** eine durchlaufende Reihe `P13.7-n` über alle Gattungen, Gattung vorn (Vermerk
P13.7-1, Vorrat P13.7-2 …). Nummern sind stabil und werden nie neu vergeben; ein neuer Eintrag
tritt hinten an. Wer auf einen Eintrag zeigt, nennt die PHASE 13.7 mit ("Vorrat P13.7-2 der
Phase 13.7"), nicht nur den Pfad dieser Datei. Die Kennungen INNERHALB des Vermerks P13.7-1
(Befunde A1 … N23, Punkte U1 … U8, Kandidaten K1 … K10) sind LOKAL zu diesem Vermerk; ein
Zeiger lautet "Vermerk P13.7-1, Befund B2, der Phase 13.7".

**FORM:** nur harte Angaben, je mit Fundstelle (Symbolname oder wörtlicher Anker, keine
Zeilennummer) und Provenienz. KLASSEN: GELESEN AM CODE = am Repo gelesen, nicht live gemessen ·
GEMESSEN AM REPO = mit einem Werkzeug am Repo erhoben (Suche, git) · GELESEN = aus einem
Dokument des Bestands oder einer Anbieter-Doku, Quelle genannt · ABGELEITET = geschlossen, nicht
gemessen · NICHT ENTSCHEIDBAR = am Repo nicht zu beantworten · GERECHNET = Rechnung aus
genannten Werten.

## Abschnitte der Standdatei 13.7

- Erste Aufklärung zur Phase 13.7 vom 2026-10-02
- Vermerke, Entscheidungen und Zuschnitte ab dem 2026-10-02
- Noch nicht geschnittene Arbeit
- Vorrat (gemeldet, nicht gebaut)

---

## Erste Aufklärung zur Phase 13.7 vom 2026-10-02

**Vermerk P13.7-1 — ERSTE AUFKLÄRUNG DER PHASE 13.7 (read-only). KEIN BAU-COMMIT: Die Aufklärung
war read-only und hat keine Zeile Code und keine Datei erzeugt; CC, 2026-10-02, Code-Stand
`c18fd55`.** Material dieses Vermerks ist der Bericht jener Runde (drei Teile), hier verdichtet.
KEIN BEFUND DIESES VERMERKS IST LIVE GEMESSEN.

(0) UMFANG DER LESUNG.
    · Voll gelesen: docs/claude-history/security-manifest-full.md, docs/db-stand.md,
      docs/db-regeln.md.
    · Gezielt gelesen: docs/roadmap.md, Zeilen 13.6 bis 14; im Archiv der Phase 13.6
      (docs/claude-history/phase-13.6-formular-relay.md) die Einträge P13.6-2, -18, -19, -96,
      -106, -112, -121, -126, -129, -131; in docs/offene-punkte.md die Posten "DAS RELAY LÄUFT
      FÜR JEDEN NUTZER …" und "VOR DEM ERSTEN FREMDEN NUTZER FEHLT EIN ABNAHME-TESTPROTOKOLL …".
    · docs/plattform-befunde.md NICHT voll geladen: gezielte Suche mit den Achsen
      `truncate|maintain|signup|sign up|email confirm|auth rate|rate limits` (Positivkontrolle:
      `truncate` trifft eine Zeile in anderem Zusammenhang), dazu Vercel-Abschnitt, Teile (d)
      und (w) bis (z), im Wortlaut.
    · Die Supabase-Doku ist NICHT gelesen: jede Anbieter-Angabe über Supabase gilt als
      UNGEPRÜFT (docs/db-regeln.md, vierte Regel). docs/arbeitsweise.md war in der Aufklärung
      nicht geladen; das Plan-Gate "Missbrauch und stiller Verlust" ist nur über den Zeiger der
      Roadmap-Zeile bekannt.

(1) DIE ZEIGER DER ROADMAP-ZEILE 13.7, STAND AM CODE `c18fd55`.
    · Vermerk P13.6-106 (Anlass): behoben mit Code-Commit `1256f0e` (Roadmap-Zeile 13.6).
      `saveProject` (src/app/projects/actions.ts) liefert im Insert-Zweig den `trackingKey`;
      der Editor übernimmt ihn (`setTrackingKey`, src/components/CodeImporter.tsx). GELESEN AM
      CODE; live nicht geprüft.
    · Vermerk P13.6-112 (Anlass): geschlossen durch Migration 0031 (`revoke insert, update`;
      `grant update` auf sieben Spalten); die Wirkung ist GEMESSEN (Owner, docs/db-stand.md,
      ROLLEN-GRANTS). Rest: Befund N22.
    · Arbeit P13.6-113 (Abgrenzung): erledigt (Vermerk P13.6-130 der Phase 13.6); der
      Abgrenzungssatz der Zeile ist damit ein Zeitdokument.
    · Vorrat P13.6-96: trifft zu — Befunde A4, A5.
    · Vorrat P13.6-121: trifft zu — Befund B3.
    · Vorrat P13.6-126: trifft zu — Befund B5.
    · Vorrat P13.6-129: trifft zu für projects, domains, project_tokens — Befunde N22, N2.
    · Vorrat P13.6-131: trifft zu — Befund N8; weitere Divergenzen N7, N9, N10, N11.
    · Offener Punkt "DAS RELAY LÄUFT FÜR JEDEN NUTZER …": trifft zu. `relay`
      (src/lib/relay/relay.ts) prüft Host, Formular-Kennung, Content-Type, Ziel, Datensparmodus,
      Host-Liste (`RELAY_HOSTS`: `hook.eu2.make.com`, `hooks.zapier.com`) und Rate — keinen
      Nutzer, kein Projekt-Recht, keinen Tarif. GELESEN AM CODE; `generateFunctional` ist dazu
      nicht gelesen.
    · Owner-Angabe P13.6-2 (Vercel-Pro freigegeben; Hobby nicht-kommerziell, Vercel-Teil (g)):
      steht als Angabe; CLAUDE.md, Tech-Stack, führt "Vercel-Plan: HOBBY". Bezug: Befund A1.
    · Offener Punkt "VOR DEM ERSTEN FREMDEN NUTZER FEHLT EIN ABNAHME-TESTPROTOKOLL …":
      unverändert offen (Stub in CLAUDE.md).

(2) DIE BEFUNDE. Je Kennung: Gegenstand, Fundstelle, Provenienz.

    ANONYME ANGREIFER
    · A1 — KOSTEN- UND STILLSTANDS-ANGRIFF AUF ALLE KUNDENSEITEN. `handleIngest`
      (src/lib/capi/ingest.ts) und die Serve-Route (`GET`, src/app/app-serve/route.ts) tragen
      kein Limit; Hobby: 1 Mio. Funktionsaufrufe, 1 Mio. Edge-Requests, bei Überschreitung
      "wait until 30 days have passed"; alle Serving-Hosts laufen durch eine Anwendung. Folge:
      rund 1 Mio. anonyme Anfragen legen alle Kundenseiten bis zu 30 Tage still. GELESEN AM CODE
      (Limits fehlen) · GELESEN (docs/plattform-befunde.md, Vercel, Teil (d)) · Folge ABGELEITET.
      Auf Hobby frei: eine WAF-Ratenregel je Projekt und Attack Mode — GELESEN (Vercel, Teile
      (w), (z)); ob ein 429 als Funktionsaufruf zählt, ist offen (Teil (x); Punkt U3).
    · A2 — GEFÄLSCHTE CONVERSIONS VON JEDERMANN. Der `trackingKey` ist öffentlich;
      `handleIngest` übernimmt `event`, `value`, `currency`, `eventSourceUrl`, `_fbp` aus dem
      Rumpf und leitet mit den Zugangsdaten des Betreibers weiter; kein Origin-Check
      (`CORS_HEADERS`, `*`), kein Limit. GELESEN AM CODE. Folge — verfälschte Gebotsoptimierung,
      verfälschtes Dashboard (`events` ohne Unique auf `event_id`) — ABGELEITET.
    · A3 — SPEICHERWACHSTUM. `persistEvent` (src/lib/analytics/persist.ts) kürzt nur
      `event_type` auf 64; `event_id` ohne Grenze. GELESEN AM CODE. Folge — Aufblähen von
      `events` bis zum Spend-Cap und damit der offene Punkt "JEDE STÖRUNG DER DATENBANK IST EIN
      TOTALAUSFALL …" — ABGELEITET.
    · A4 — FORMULAR-SPAM. Kein Bot-Schutz: GEMESSEN AM REPO (Suche
      `honeypot|captcha|turnstile|recaptcha|hcaptcha` in src/ 0 Treffer; Positivkontrolle trifft
      das Archiv 13.6). Über das Relay allein `countRelayHit` (src/lib/relay/rate-limit.ts), 120
      je 60 s je Projekt. Bis zu 172 800 Spam-Leads je Tag an Make/Zapier des Kunden (GERECHNET,
      120 × 1440). Direktweg, Export und Rückfall ohne Skript ohne jede Bremse (GELESEN AM CODE).
    · A5 — LEAD-VERLUST DURCH ERSCHÖPFTES LIMIT. Das Limit gilt je Projekt, nicht je Besucher;
      darüber `notDelivered` mit 502 (relay.ts), der Besucher sieht eine Meldung (`relayBranch`,
      src/lib/form-target.ts); der Betreiber erfährt es nur über `console.warn`, Laufzeit-Log auf
      Hobby 1 h (GELESEN, Vercel, Teil (d)). GELESEN AM CODE; dass ein Bot echte Leads aussperrt,
      ist ABGELEITET.
    · A6 — KONTEN IN MASSEN. `signUp` offen aus dem Browser (src/app/login/page.tsx);
      E-Mail-Bestätigung aus (Manifest Tier 0, offen); kein CAPTCHA. GELESEN AM CODE.
      Supabase-Auth-Grenzwerte NICHT GELESEN (Punkt U1).
    · A7 — VERSTÄRKUNG ÜBER INLINE-ERNEUERUNG. Ein forwardbarer Beacon auf ein Projekt mit
      abgelaufenem Google-Zugangsdatum löst `runRefresh` (src/lib/oauth/refresh-run.ts) im
      Request aus: bis zu `REFRESH_MAX_ATTEMPTS` (3) Versuche zu je `REFRESH_TIMEOUT_MS` (8000);
      bei `dead` schreibt src/lib/oauth/token-refresh.ts nichts. GELESEN AM CODE. Dass jeder
      solche Beacon Google erneut fragt, ist ABGELEITET. Verwandt:
      docs/claude-history/backlog-polish.md, "DER RESOLVER SCHREIBT BEI TOTEM ZUGANGSDATUM …".

    DER UNEHRLICHE BETREIBER
    · B1 — PLATTFORM-EIGENE DOMAINS ALS CUSTOM-DOMAIN. `normalizeDomain`
      (src/lib/domains/normalize.ts) weist App-Hosts, die Serving-Domain samt Apex und
      `*.vercel.app` nicht zurück; `addDomainToVercel` (src/lib/vercel/client.ts) wertet 409
      `domain_already_in_use` mit eigener projectId als `already_on_project`, und
      `registerCustomDomain` (src/lib/domains/register.ts) legt dann die Zeile an. GELESEN AM
      CODE. Folgen ABGELEITET: (1) eine am eigenen Vercel-Projekt hängende Domain, etwa der Apex
      der Serving-Domain, gerät in die `domains`-Zeile eines fremden Projekts und liefert über
      `custom_host` dessen Seite (`extractLabel` erkennt den Apex nicht als Label); (2)
      `removeCustomDomain` ruft auf sie `removeDomainFromVercel` und hängt sie vom
      Vercel-Projekt ab. UNGEMESSEN UND UNGELESEN: Vercels Antwort für die eigenen Domains,
      und welche Domains am Projekt hängen (Punkt U2).
      GESCHLOSSEN 2026-10-02 mit der Scheibe "K2a", Bau-Commit `ed20fab` (Vermerk P13.7-33).
      Rest: eine schon bestehende reservierte Zeile wird weiter ausgeliefert (Vorrat P13.7-32).
    · B2 — ÜBERNAHME EINER VERWAISTEN CUSTOM-DOMAIN. `deleteProject`
      (src/app/projects/actions.ts) löscht allein in der Datenbank (Nutzer-Client; authenticated
      trägt DELETE auf `projects`, docs/db-stand.md); die Kaskade aus 0006 entfernt die
      `domains`-Zeile; Vercel wird nicht gerufen (`handleDelete`,
      src/components/CodeImporter.tsx, ruft nur `deleteProject`). GELESEN AM CODE. GEMESSEN in
      Phase 7 (docs/claude-history/phase-7-hosting.md, Live-Beweis 7c-2, Fall (3)): genau dieser
      Zustand ("DB-Zeile gelöscht, Vercel behält Domain") ergibt 409 mit eigener projectId und
      damit "healed". ABGELEITET: Ein anderes Konto registriert dieselbe Domain und wird
      bedient, solange der DNS des Vorbesitzers auf uns zeigt. Im Bestand nicht vermerkt
      gefunden (GEMESSEN AM REPO: Suche in docs/offene-punkte.md,
      docs/claude-history/backlog-polish.md, docs/claude-history/phase-7-hosting.md).
      GESCHLOSSEN 2026-10-02 mit der Scheibe "K2b", Bau-Commit `2a69571` (Vermerk P13.7-39).
      Rest: Eine Konto-Löschung im Supabase-Dashboard oder Hand-SQL umgeht den Riegel
      (supabase/checks/verwaiste-domains.sql, FALLE (4)); eine vom Owner bei Vercel entfernte
      Domain kann jedes Konto neu anlegen (Vorrat P13.7-37).
    · B3 — SPERREN AUSHEBELN. Vorrat P13.6-121: der Insert-Zweig von `saveProject` prüft keine
      Sperre (`blocked_at` in src/app/projects/actions.ts und src/lib/domains/ allein als
      Kommentar; GEMESSEN AM REPO, die Positivkontrolle trifft den Kommentar in `saveProject`).
      Es gibt keinen Sperrbegriff je Nutzer (GELESEN AM CODE). `removeCustomDomain`
      (src/lib/domains/remove.ts) prüft keine Sperre — die Custom-Domain eines gesperrten
      Projekts ist lösbar und an ein neues hängbar (ABGELEITET). Dazu die Konto-Neuanlage (A6).
      Das Runbook sperrt allein `projects` (CLAUDE.md, "KILL-SWITCH — SQL-RUNBOOK").
    · B4 — PHISHING AUF UNSERER DOMAIN. Beliebiges HTML/JS wird unter `<slug>-<6>.publayer.net`
      ausgeliefert; den Slug wählt der Betreiber über den Projektnamen (`slugForLabel(owned.name)`
      in `assignDomainLabel`, src/app/projects/actions.ts). Keine Inhaltsprüfung, kein
      Safe-Browsing (Tier 1 offen), kein security.txt (`public/.well-known` fehlt), kein
      Abuse-Kontakt (`NEXT_PUBLIC_ABUSE_CONTACT` leer laut CLAUDE.md). `publishProject` prüft
      `snapshot.html` und `snapshot.mappings`, liefert aber das clientgelieferte
      `functionalHtml` aus, ohne Abgleich. `thanksUrl` und Weiterleitungen sind frei wählbare
      Ziele. GELESEN AM CODE.
    · B5 — GRABSTEIN. Vorrat P13.6-126: `domains.project_id … on delete cascade` (0006);
      `assignDomainLabel` würfelt `slugForLabel` + `randomLabelSuffix` (`Math.random`,
      src/lib/hosting/host.ts) neu. GELESEN AM CODE.
      TEILWEISE 2026-10-02: Der Zufallsteil kommt seit der Scheibe "K2b" aus
      `crypto.getRandomValues` (Bau-Commit `2a69571`, Vermerk P13.7-39). Der Grabstein ist
      nicht gebaut: Vorrat P13.7-37.
    · B6 — FREMDE DATEN: keine IDOR-Lücke in den 26 Exporten der drei "use server"-Dateien
      (src/app/projects/actions.ts, src/app/projects/domain-actions.ts, src/app/auth/actions.ts)
      gefunden; Massstab: Eigentums-Gate je Funktion. Die Übernahme eines `tracking_key` ist seit
      0031 geschlossen. GELESEN AM CODE. Grenze: offener Punkt "DIE IDOR-WÄCHTER SIND NAMENTLICH
      …".
    · B7 — RESSOURCEN. Das HTML beim Veröffentlichen trägt im Code keine Grössengrenze
      (`publishProject`); next.config.ts setzt keine; die Next-Grenze für Server-Aktionen ist
      NICHT GELESEN (Punkt U6). ABGELEITET: data-URIs laufen als Teil des HTML über die
      Serve-Route; die Dauerregel "MEDIENBYTES LAUFEN NIE ÜBER UNSERE VERCEL-ROUTEN …" nimmt
      "das HTML der Seite" ausdrücklich aus.

    GESTOHLENE ZUGÄNGE
    · C1 — KUNDENKONTO. Kein MFA im Code; Login-Grenzwerte nicht gebaut (Tier 1 offen). GELESEN
      AM CODE. ABGELEITET: Ein Angreifer stellt die Adresse eines Formular-Ziels auf einen
      eigenen Make-Webhook um (die Host-Liste erlaubt jede Adresse auf dem Host) und
      veröffentlicht neu — die Leads fliessen ab, ohne Signal an den Betreiber.
      Anbieter-Zugangsdaten sind nicht auslesbar: write-only, `listTargetCredentialStates`
      liefert nur Zustände (GELESEN AM CODE).
    · C2 — ANBIETER-ZUGANGSDATEN IM KLARTEXT: `project_secrets.secret` (`setCapiToken`),
      `project_tokens.meta_capi_token` (Doppelschreibung); `secret_enc` AES-256-GCM (OAuth,
      src/lib/secrets/cipher.ts). GELESEN AM CODE. Bezug: Manifest-Item ENCRYPTION-AT-REST;
      offener Punkt "DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT".
    · C3 — PLATTFORM-KONTEN. `SUPABASE_SERVICE_ROLE_KEY`, `VERCEL_API_TOKEN` und
      `SECRET_ENC_KEYS` liegen in der Vercel-Umgebung (GELESEN: .env.local.example, ohne Werte).
      Umfang des Vercel-Tokens NICHT ENTSCHEIDBAR (Manifest "TEILERFÜLLT"); die CI ist kein
      Merge-Gate (.github/workflows/ci.yml, Kopf); ob ein Push auf main deployt, ist NICHT
      ENTSCHEIDBAR (Punkt U4).

    DATENABFLUSS
    · D1 — IP, User-Agent und Seitenadresse samt Query gehen an die Ziele: offener Punkt "DIE
      SEITENADRESSE REIST SAMT QUERY …". Zeiger.
    · D2 — Ob Vercel Relay-Rümpfe ablegt, ist offen: offener Punkt "DAS RELAY LÄUFT FÜR JEDEN
      NUTZER …", (a). Zeiger; Punkt U7.
    · D3 — LOGS. Relay, Ingest und Adapter loggen Status, eigenes Vokabular oder `errorName`;
      `listProjectDomains` loggt `error.message` der Datenbank; `audit_logs.detail` speichert
      `e.message` (`registerCustomDomain`, `removeCustomDomain`). Personenbezogene Daten in den
      gesichteten Logzeilen nicht gefunden (GEMESSEN AM REPO: Suche über `console.*` mit
      `message|body|detail|err`).
    · D4 — "nie geloggt" gilt unserem Code, nicht der Plattform (Dauerregel "FORMULARINHALTE IM
      RELAY SIND TRANSIT …"). GELESEN.

    LIEFERKETTE
    · E1 — `fbevents.js` wird von `connect.facebook.net` auf Kundenseiten geladen (Lader in
      src/lib/tracking/meta.ts); das Custom-Pixel ist Betreiber-Code; ausgelieferte Seiten
      tragen bewusst keinen CSP (`SECURITY_HEADERS`, src/app/app-serve/route.ts). GELESEN AM CODE.
    · E2 — GitHub-Actions per Tag (`@v4`), nicht per SHA (.github/workflows/ci.yml);
      .github/dependabot.yml nimmt das Ökosystem github-actions aus; next, react, react-dom exakt
      gepinnt; die supabase-Pakete mit `^` über den Lockfile, die CI mit `npm ci`. GELESEN AM
      CODE. Ob Vercel mit dem Lockfile baut: NICHT ENTSCHEIDBAR.

    STILLER DATENVERLUST
    · F1 — Sammelverweis auf A5, B2 und A7.
    · F2 — Der Ingest liest die Ziele aus dem Entwurf (`projects.settings`), nicht aus
      `published_content` (`getCapiConfigByTrackingKey`, src/lib/capi/token.ts). GELESEN AM CODE.
      ABGELEITET: Wer im Editor eine Pixel-ID entfernt und speichert, beendet die Weiterleitung
      der Live-Seite ohne Neuveröffentlichung. Ob das unter "NICHTS ZEIGT AN, DASS DER
      VERÖFFENTLICHTE STAND NACHZUZIEHEN IST" vermerkt ist: nicht geprüft.
    · F3 — `saveProject` ersetzt `settings` ganz, ohne Versions- oder Zeitbedingung. GELESEN AM
      CODE. ABGELEITET: zwei Tabs überschreiben sich, eine Einstellung verschwindet ohne Signal.
    · F4 — Fehler von `persistEvent` und gescheiterte Weiterleitungen erscheinen allein als
      `console.error`; Laufzeit-Log auf Hobby 1 h (GELESEN, Vercel, Teil (d)). GELESEN AM CODE.
    · F5 — `deleteProject` kaskadiert `events`, `project_secrets`, `project_tokens`,
      `relay_rate_counters` und `domains` (on delete cascade in 0005, 0006, 0011, 0021, 0030),
      ohne Rückfrage zu Custom-Domains. GELESEN AM CODE.
      GESCHLOSSEN 2026-10-02 FÜR CUSTOM-DOMAINS mit der Scheibe "K2b", Bau-Commit `2a69571`
      (Vermerk P13.7-39): `deleteProject` verweigert, solange eine `custom_host`-Zeile besteht.
      Die Kaskade auf die übrigen Tabellen bleibt (Vorrat P13.7-10).
    · F6 — Bekannte offene Punkte: "IM BROWSER-DIREKTEN WEG ERSCHEINT …", Punkt (10) an
      "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" (abgeschalteter Zap meldet "zugestellt"),
      "JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL …", dazu der Hobby-Stopp (A1). Zeiger.
    · F7 — Serve- und Ingest-Abfragen ohne Zeitlimit: `abortSignal` 0 Treffer in
      src/lib/hosting/resolve.ts und src/lib/capi/token.ts (Positivkontrolle:
      src/lib/relay/resolve-relay.ts 2, src/lib/analytics/persist.ts 1); kein `maxDuration` in
      src/ (0 Treffer). GEMESSEN AM REPO. ABGELEITET: Hängt Supabase, hängen die Funktionen bis
      zur Plattform-Höchstdauer.

    NEBENBEFUNDE AUS DEN AUFTRÄGEN 1 BIS 3 DER AUFKLÄRUNG
    · N1 — Der Zeitpunkt der Roadmap-Zeile 13.7 nennt zwei Ereignisse ("VOR DEM ERSTEN FREMDEN
      NUTZER BZW. VOR DEM LAUNCH"): das erste fremde Konto (CLAUDE.md, "## Modus") und den
      öffentlichen Launch (Roadmap-Zeile 15); ein eigenes Abschlusskriterium nennt die Zeile
      nicht. Den ersten Moment verankert docs/roadmap.md nirgends (offener Punkt "VOR DEM
      ERSTEN FREMDEN NUTZER FEHLT EIN ABNAHME-TESTPROTOKOLL …", Befund vom 2026-09-28), und der
      Owner kontrolliert ihn nicht (A6). GELESEN.
    · N2 — Die Überschrift von Vorrat P13.6-129 im Archiv der Phase 13.6 nennt "TRUNCATE,
      REFERENCES UND TRIGGER" ohne MAINTAIN; die Roadmap-Zeile 13.7 nennt alle vier. GELESEN.
    · N3 — Manifest-Items, deren Status in der Vollfassung nicht "erfüllt" ist oder fehlt
      (Tier in Klammern): E-MAIL-BESTÄTIGUNG (0) · KOSTEN-CIRCUIT-BREAKER (0, "SUPABASE ERLEDIGT
      … / VERCEL strukturell gedeckelt") · ABUSE-KANAL + security.txt (0) · SUBPROZESSOR-DPAs +
      Kunden-DPA (0) · PER-TENANT-RATE-LIMITING (1) · LOGIN-BRUTE-FORCE (1) · SAFE-BROWSING (1) ·
      SHARED-REPUTATION publayer.net (1) · ENCRYPTION-AT-REST CAPI-Token (1, OFFEN im Zusatz vom
      2026-08-25) · VERCEL-TOKEN + Domain-Audit-Log (1, TEILERFÜLLT) · META-FEHLERLOG (1, kein
      Statuswort) · LOGGING-LEAK (2, kein Statuswort) · BACKUPS + Restore-Drill (2, TEILWEISE
      ERLEDIGT) · DATA-RETENTION (2) · MCP-SICHERHEIT (2). Erfüllt: KILL-SWITCH (mit seiner Grenze
      B3), LEAKED-PASSWORD-PROTECTION, DEPENDABOT, DEPENDABOT-MELDUNGEN. BINDET-AN je Item steht
      in der Vollfassung. GELESEN.
    · N4 — META-FEHLERLOG: Das RISIKO-Feld beider Fassungen ("loggt den ROHEN Antwort-Rumpf")
      ist überholt — `describeMetaError` (src/lib/capi/meta-forward.ts) loggt ohne JSON nur
      Status, Content-Type (`asProviderEnum`) und Länge, `msg` über `asProviderText`
      (`redactOpaque`). GELESEN AM CODE.
    · N5 — META-FEHLERLOG: Sein BINDET-AN ("das erste Projekt, das ein Zugangsdatum dieses
      Anbieters trägt") ist eingetreten — docs/db-stand.md, `project_secrets`: meta 5 Zeilen
      (GEMESSEN 2026-09-10, Owner); CLAUDE.md führt meta als live sendend. GELESEN.
    · N6 — Ohne ausdrücklichen Status in BEIDEN Fassungen sind nach der Lesung vom 2026-10-02
      zehn Items: E-MAIL-BESTÄTIGUNG, ABUSE-KANAL, SUBPROZESSOR-DPAs, PER-TENANT-RATE-LIMITING,
      LOGIN-BRUTE-FORCE, SAFE-BROWSING, SHARED-REPUTATION, LOGGING-LEAK, DATA-RETENTION,
      MCP-SICHERHEIT. CLAUDE.md sagt "ELF"; eine Liste dazu liegt nicht im Repo (GEMESSEN AM
      REPO: Suche über docs/ und CLAUDE.md trifft nur den Satz und Vorrat P13.6-131). Punkt U8.
    · N7 — KILL-SWITCH: Vollfassung "ERLEDIGT", CLAUDE.md "GEBAUT, LIVE VERIFIZIERT" — Wortlaut
      verschieden. Die Vollfassung zeigte im Selbst-Entsperrungs-Absatz auf
      "(docs/aktiver-stand.md)"; der Pfad ist im Commit dieser Datei auf das Archiv der Phase
      13.6 umgestellt. GELESEN.
    · N8 — VERCEL-TOKEN: Vollfassung "TEILERFÜLLT (Stand 2026-07-28)", CLAUDE.md ohne Status —
      Vorrat P13.6-131. GELESEN.
    · N9 — META-FEHLERLOG: CLAUDE.md "OFFEN", Vollfassung ohne Statuswort ("TRAGENDE KONTROLLE:
      HEUTE KEINE") — die Gegenrichtung zu N8. GELESEN.
    · N10 — BACKUPS: Vollfassung "DRILL GEFAHREN UND BESTANDEN 2026-07-30", CLAUDE.md "DRILL
      WEITERHIN OFFEN" und "(1) DER DRILL IST NICHT GEFAHREN"; docs/db-stand.md, BACKUPS, sagt
      wie CLAUDE.md "weiterhin nicht gefahren". GELESEN.
    · N11 — DATA-RETENTION: BINDET-AN verschieden im Wortlaut — Vollfassung "nicht mehr ‚Phase
      8' …", CLAUDE.md "Phase 8. — Präzisierung …"; kein Status. GELESEN.
    · N12 — `updateSession` (src/lib/supabase/middleware.ts) ruft auf dem App-Host bei JEDER
      Anfrage `supabase.auth.getUser()`, vor der Prüfung `isPublicRoute` — auch für `/api/e` und
      `/api/capi`, die absolute Exporte treffen. GELESEN AM CODE; die Kosten je Beacon sind
      ABGELEITET.
    · N13 — `proxy` (src/proxy.ts) schreibt auf einem Serving-Host jeden Pfad ausser `/api/e`,
      `/api/capi` und `RELAY_PATH` auf `/app-serve` um; jeder Pfad liefert dieselbe Seite.
      GELESEN AM CODE.
    · N14 — Der Ingest prüft allein `projects.blocked_at` (`getCapiConfigByTrackingKey`), nicht
      `domains.blocked_at`; Serve (`resolvePublished`) und Relay (`lookupRelayProject`) prüfen
      beide. GELESEN AM CODE.
    · N15 — Der Ingest trägt im Code keine Grössengrenze (`await request.text()` in
      `handleIngest`) und antwortet mit CORS `*` (`CORS_HEADERS`). GELESEN AM CODE; die Grenze
      der Plattform ist nicht gelesen.
    · N16 — `/api/f` auf dem App-Host: `proxy` → `updateSession` → nicht öffentlich →
      Umleitung auf `/login`; offener Punkt "DIE MIDDLEWARE LEITET API-ROUTEN AUF EINE
      HTML-SEITE UM". GELESEN AM CODE.
    · N17 — Supabase (PostgREST, Auth, GraphQL) ist mit dem Anon-Schlüssel aus dem Bundle eine
      öffentliche Fläche, getragen von der RLS; Auth-Grenzwerte und Registrierungs-Schalter
      NICHT GELESEN (Punkt U1).
    · N18 — Updates und Deletes über den Nutzer-Client melden ohne Treffer Erfolg:
      `renameProject`, `deleteProject`, `createVariantB` (Update ohne `.select`), das letzte
      Update in `removeCapiToken` (alle src/app/projects/actions.ts). Die Dauerregel "EIN
      SCHREIBWEG ÜBER DEN ADMIN-CLIENT …" greift dort nicht (kein Admin-Client). GELESEN AM CODE.
    · N19 — Anonyme Schreibwege über den Admin-Client: `persistEvent`, die Aktualisierung in
      `refreshAccessToken` (src/lib/oauth/token-refresh.ts; gefiltert, Versions-Riegel,
      `.select`), `relay_rate_hit` über `countRelayHit`. Ein Eigentums-Gate eines Nutzers gibt
      es dort nicht; ob die Dauerregel "EIN SCHREIBWEG ÜBER DEN ADMIN-CLIENT …" dort greifen
      soll, ist am Wortlaut NICHT ENTSCHEIDBAR. GELESEN AM CODE.
    · N20 — Die OAuth-Rückkehr (`GET`, src/app/api/oauth/google/callback/route.ts) schreibt
      (Upsert auf `project_secrets`) und ruft Google — formale Kollision mit der Dauerregel
      "EINE ROUTE, DIE SCHREIBT ODER EINEN FREMDEN ENDPUNKT RUFT, IST NIEMALS EIN GET". Bei OAuth
      bauartbedingt; `statesMatch` fängt ein Vorabladen ohne Fluss ab. Eine benannte Ausnahme
      steht weder in der Regel noch in ihrer Herleitung (GEMESSEN AM REPO,
      docs/immer-beachten-herleitung.md). GELESEN AM CODE.
    · N21 — `POST` /api/oauth/google/refresh (src/app/api/oauth/google/refresh/route.ts) ruft
      `runRefresh` und damit Google, ohne Rate-Limit je Nutzer. GELESEN AM CODE.
    · N22 — Rechte über die Policies hinaus: `events`, `audit_logs`, `schema_migrations`,
      `project_secrets` tragen laut docs/db-stand.md "volle DML" (GEMESSEN 2026-08-05), die
      Einzelrechte D/x/t/m sind dort nicht gemessen; `relay_rate_counters`: `revoke all … from
      anon, authenticated` (0030), daraus D/x/t/m entzogen ABGELEITET, gemessen nur s/i/u/d;
      DELETE auf `projects` bleibt für authenticated (Kaskade: B2, F5). GELESEN.
    · N23 — Kein Weg eines Server-Geheimnisses ins Client-Bundle: die Leser (src/lib/supabase/
      admin.ts, src/lib/secrets/cipher.ts, src/lib/oauth/google-token.ts,
      src/lib/vercel/client.ts, src/lib/capi/config.ts, src/lib/capi/tiktok-forward.ts) tragen
      `import "server-only"`; keine Datei mit `"use client"` importiert sie. GEMESSEN AM REPO;
      der einzige Treffer, ein Kommentar in src/components/TargetCard.tsx, ist die
      Positivkontrolle.

    Ausserdem aus Auftrag 3 (b): `checkDomainStatus` — Vorrat P13.7-2.

(3) AM CODE NICHT ENTSCHEIDBAR — ACHT PUNKTE.
    · U1 — ob die Registrierung im Supabase-Dashboard geschlossen ist, und welche
      Auth-Grenzwerte gelten.
    · U2 — wie Vercel für die eigenen Domains antwortet, und welche Domains am Vercel-Projekt
      hängen.
    · U3 — ob ein 429 der WAF als Funktionsaufruf zählt.
    · U4 — der Umfang des Vercel-Tokens und der Deploy-Weg.
    · U5 — ob die RLS bei TRUNCATE greift, und welche Wege ausser PostgREST TRUNCATE auslösen
      können (Supabase- und Postgres-Doku nicht gelesen).
    · U6 — die Body-Grenze für Server-Aktionen in Next.
    · U7 — ob Vercel Rümpfe ablegt.
    · U8 — worauf die Zahl "ELF" in CLAUDE.md ("## Security Manifest & Launch Blocker") ruht.

(4) KANDIDATEN FÜR DEN ZUSCHNITT — KEINE AUSWAHL, KEINE REIHENFOLGE. Die Reihenfolge dieser
    Liste trägt keinen Rang. Je Kandidat: Gegenstand, die Befunde, die er trägt, und die
    Live-Messung, die CC nicht erbringen kann.
    · K1 — FLUT- UND KOSTENSCHUTZ DER ÖFFENTLICHEN EINGÄNGE: WAF-Ratenregel bzw. Attack Mode
      (Konfiguration, kein Code), ein Limit je Mandant auf `/api/e`; berührt die Roadmap-Zeile 14.
      Trägt A1, A2, A3. Live: ob ein WAF-429 als Aufruf zählt (U3); die Wirkung auf echtem
      Traffic.
    · K2 — DOMAIN-LEBENSZYKLUS: plattform-eigene Domains als Custom-Domain abweisen;
      `deleteProject` mit Custom-Domain; Grabstein (Vorrat P13.6-126); Label-Vergabe ins Audit
      (offener Punkt "LABEL-VERGABE IST UNPROTOKOLLIERT"); berührt Vorrat P13.7-2. Trägt B1, B2,
      B5, F1 (über B2). Live: die Vercel-Antwort für eigene Domains (U2). AUFLAGE, WÖRTLICH:
      Messung der Vercel-Antwort für eigene Domains nur an einem Wegwerf-Projekt, nie an der
      Produktion. GRUND: Ein Fehlversuch entfernt die echte Domain (B1, Folge (2)).
    · K3 — SPERRE JE KONTO: ein Sperrbegriff je Nutzer, geprüft in `saveProject` (Insert),
      `publishProject`, `registerCustomDomain`, `removeCustomDomain`; das Runbook ergänzen. Trägt
      B3. Live: sperren, dann ein neues Projekt bzw. einen Domain-Umzug versuchen.
    · K4 — REGISTRIERUNG UND KONTO: E-Mail-Bestätigung, Registrierung schliessen oder auf
      Einladung, Login-Grenzwerte (zuerst die Supabase-Doku lesen). Trägt A6, B3, C1, N17. Live:
      Dashboard-Einstellungen (Owner); U1.
    · K5 — FORMULAR: SPAM UND RELAY-FREISCHALTUNG (Vorrat P13.6-96; offener Punkt "DAS RELAY
      LÄUFT FÜR JEDEN NUTZER …"); dieselbe Code-Fläche (src/lib/relay/relay.ts,
      src/lib/form-target.ts). Trägt A4, A5, C1, F1 (über A5). Live: Spam-Proben gegen Relay und
      Direktweg; der Zapier-Monat (offener Punkt "ZAPIER: DIE MESSKANDIDATEN ZM4, ZM5 UND ZM7 …").
    · K6 — DB-RECHTE IN DER TIEFE (Vorrat P13.6-129): die Probe auf alle Tabellen erweitern,
      D/x/t/m entziehen. Trägt N22. Live: die erweiterte Abfrage (8) aus
      supabase/checks/spaltenrechte.sql im SQL-Editor.
    · K7 — MANIFEST-ABGLEICH (Vorrat P13.6-131 und die Divergenzen), nur Doku. Trägt N3 bis N11.
      Live: der Drill-Stand (Owner-Angabe), der Status META-FEHLERLOG (Owner-Entscheidung).
    · K8 — SIGNALE FÜR STILLEN VERLUST. Trägt F2, F3, F4, F7. Live: das Verhalten bei hängender
      Datenbank; Speichern aus mehreren Tabs.
    · K9 — LIEFERKETTE: Actions per SHA, Ökosystem github-actions, Branch-Schutz, Deploy-Weg —
      weitgehend Konfiguration. Trägt E1, E2. Live: Vercel- und GitHub-Einstellungen (Owner).
    · K10 — DATENABFLUSS: eingefügte Zugangsdaten chiffrieren, die Query-Weitergabe, die
      AVV-Fragen — hängt an offenen Punkten mit eigenen Triggern. Trägt C2, D1, D2. Live: AVV und
      DPA (juristisch).

---

## Vermerke, Entscheidungen und Zuschnitte ab dem 2026-10-02

**Vermerk P13.7-24 — DIE REGISTRIERUNG IST GESCHLOSSEN (OWNER-MESSUNG 2026-10-02). KEIN
BAU-COMMIT: eine Einstellung im Supabase-Dashboard, keine Zeile Code.**
- MESSUNG (OWNER, 2026-10-02; NICHT von CC gemessen): Supabase, Authentication → Sign In /
  Providers → "Allow new users to sign up" steht AUS. Ein Registrierungsversuch ergibt "Signups
  not allowed for this instance". POSITIVKONTROLLE: Die Anmeldung des Owners funktioniert.
- AM CODE (GELESEN AM CODE, CC, 2026-10-02, Code-Stand `7e14e07`): Die Anwendung kennt genau zwei
  Auth-Eingänge, `signInWithPassword` und `signUp` (src/app/login/page.tsx). Die Oberfläche
  bietet "signup" weiter an; der Schalter wirkt beim Anbieter, nicht im Code.
- FOLGE FÜR DIE BEFUNDE DES VERMERKS P13.7-1 (ABGELEITET), solange der Schalter AUS steht:
  · A6 (Konten in Massen) ist über `signUp` nicht erreichbar.
  · Jeder Befund, der ein EIGENES Konto des Angreifers voraussetzt, ist für Fremde nicht
    erreichbar: B1 bis B3, dazu ebenso B4 (Phishing auf unserer Domain), B5 (Grabstein), B6 und
    B7 — alle setzen ein Konto voraus, das veröffentlicht oder Domains anlegt.
  · C1 (gestohlenes Kundenkonto) ist nur TEILWEISE erfasst: Fremde Kundenkonten gibt es nicht,
    das Konto des Owners bleibt ein Ziel. C1 ist damit nicht unerreichbar.
  · UNBERÜHRT bleiben die anonymen Befunde A1 bis A5 und A7 — sie brauchen kein Konto.
- ZUORDNUNG: Befund N1 des Vermerks P13.7-1 (Vorrat P13.7-12 der Phase 13.7) sagt, den Moment
  "erstes fremdes Konto" kontrolliere der Owner nicht (A6). Für die Dauer dieser Einstellung trifft
  das nicht mehr zu: Der Moment "erster fremder Nutzer" ist das WIEDEREINSCHALTEN. N1 bleibt als
  Befund vom 2026-10-02 (Code-Stand `c18fd55`) stehen; seine Aussage über den Zeitpunkt der
  Roadmap-Zeile 13.7 (zwei Ereignisse, kein Abschlusskriterium) ist davon nicht berührt.
- GRENZEN:
  · Der Schalter liegt AUSSERHALB DES REPOS. Nichts im Code meldet ein Umlegen, und kein Test
    wird davon rot.
  · Ob weitere Wege der Konto-Anlage bestehen — Einladung oder Anlage über das Dashboard, die
    Admin-Schnittstelle mit service_role, OTP oder OAuth-Anbieter mit Konto-Anlage —, ist NICHT
    GELESEN (Supabase-Doku nicht gelesen) und NICHT GEMESSEN. Über den Anon-Schlüssel ist
    ausschliesslich der geprüfte `signUp`-Weg belegt. Ein fremdes Konto, das der Owner selbst
    anlegt, ist ebenfalls ein "erster fremder Nutzer".
- BEZUG: Kandidat K4 (Vermerk P13.7-1) — "Registrierung schliessen" ist damit als Einstellung
  vollzogen; E-Mail-Bestätigung und Login-Grenzwerte sind davon nicht berührt.

**Entscheidung P13.7-25 — REIHENFOLGE DER NÄCHSTEN ARBEIT.**
- OWNER-ENTSCHEIDUNG 2026-10-02 (Angabe aus dem Auftrag): erst die Dependabot-Meldung sichten,
  dann "K2a" = Befund B1 plus Vorrat P13.7-2. Die Bezeichnung "K2a" stand bis dahin nicht im
  Bestand; sie meint die Teilmenge von Kandidat K2 (Vermerk P13.7-1) aus Befund B1
  (plattform-eigene Domains als Custom-Domain) und Vorrat P13.7-2 (`checkDomainStatus`).
- ARCHITEKTEN-SETZUNG 2026-10-02, revidierbar: Davor kommt die Scheibe "Abhängigkeiten"
  (Zuschnitt P13.7-27).
- Die Sichtung ist erfolgt: Vermerk P13.7-26.

**Vermerk P13.7-26 — DEPENDABOT-SICHTUNG: MELDUNG 45 (undici) UND DER STAND VON `npm audit`. KEIN
BAU-COMMIT: Aufklärung, read-only; CC, 2026-10-02, Code-Stand `7e14e07`.**
- DIE MELDUNG: Nr. 45, undici, "TLS certificate validation bypass via dropped connect options in
  BalancedPool", Schweregrad high, Einstufung "Development", package-lock.json — OWNER-ANGABE aus
  der GitHub-Oberfläche (2026-10-02). Die Nummer ist von CC nicht bestätigt (`gh` nicht
  installiert, die Liste liegt nicht im Repo).
- KETTE (GEMESSEN AM REPO, `npm ls undici --all`): genau eine Kopie, `jsdom@29.1.1` →
  `undici@7.29.0`. Im Lockfile `"node_modules/undici"` mit `"dev": true`; jsdom verlangt
  `"undici": "^7.25.0"` und ist selbst dev (devDependencies `"jsdom": "^29.1.1"`; vitest 4.1.11
  verlangt `jsdom: *` als Peer). Die Einstufung "Development" ist am Lockfile bestätigt.
- ERREICHBARKEIT:
  · Suche `undici|BalancedPool` (ohne Gross-/Kleinschreibung) über das Repo ohne node_modules,
    .next, .git und Lockfile: 0 Treffer. POSITIVKONTROLLE: dasselbe Werkzeug trifft
    `node_modules/undici` im Lockfile (2). GEMESSEN AM REPO.
  · jsdom ist ausserhalb der Doku allein `environment: "jsdom"` in `vitest.config.ts` — die
    Testumgebung.
  · Lokaler Build (`.next`, BUILD_ID vom 2026-10-02 08:54, Commit-Bindung nicht geprüft): undici
    in 0 `.js`-Dateien unter `.next/server` (Kontrolle: `supabase` in 49); in 0 von 15
    `.nft.json` (Kontrolle: alle 15 nennen `node_modules/next/`). In zwei geprüften `.map`-Dateien
    steht undici nur in Kommentaren. Es ist der LOKALE Build, nicht das Vercel-Deployment.
  · Next bringt eigene undici-Kopien mit, die nicht im Lockfile stehen und die Dependabot nicht
    sieht: `next/dist/compiled/@edge-runtime/primitives/fetch.js` trägt `undici@6.21.0` —
    ausserhalb des Advisory-Bereichs. `next/dist/compiled/@vercel/blob/index.cjs` trägt eine
    Kopie ohne Versions-String (Version NICHT ENTSCHEIDBAR; Aufrufer `upload-trace` aus
    `cli/next-dev.js` und `build/index.js`). Die undici-Version der Node-Laufzeit auf Vercel ist
    am Repo NICHT ENTSCHEIDBAR.
  · ERGEBNIS: Kein Pfad unseres Codes erzeugt einen `BalancedPool`; die gemeldete Kopie wird
    allein in der Testumgebung gebraucht. Ein erreichbarer Produktivpfad ist NICHT GEFUNDEN — ein
    Nicht-Treffer mit benannter Reichweite (die Suchen oben), keine Aussage über das Deployment.
- BEHOBENE FASSUNG (GELESEN, `npm audit --json`; GitHub Advisory Database, GHSA-w293-vg96-wgc3,
  veröffentlicht 2026-09-29): betroffen `>=7.24.1 <7.29.1`, behoben ab 7.29.1 (im 8er-Zweig ab
  8.10.2). `npm audit` führt für undici neun weitere Advisories, alle mit der Obergrenze
  `<7.29.1`. Registry (GEMESSEN, `npm view`): 7.29.1 und 7.30.0 existieren, beide innerhalb von
  `^7.25.0`; undici@7.29.1 trägt keine eigenen Abhängigkeiten, Engines `node >=20.18.1`
  unverändert.
- NEBENBEFUND — `npm audit` (GEMESSEN, CC, 2026-10-02) meldet DREI Positionen, 1 kritisch und
  2 hoch, nicht null:
  · next 16.3.5, kritisch: GHSA-vcvr-r3jv-pc5j, "Remote Code Execution in next/og ImageResponse",
    betroffen `>=16.2.0 <16.3.6`, `fixAvailable` 16.3.8. Erste Probe auf Erreichbarkeit:
    `next/og|ImageResponse` in src/ und next.config.ts 0 Treffer (Kontrolle: `next/server` trifft
    src/proxy.ts). Eine vollständige Sichtung ist das nicht.
  · brace-expansion, hoch (DoS-Advisories, zwei Knoten): 1.1.18 unter eslint → minimatch 3.1.5
    (`^1.1.7`) und 5.0.9 unter eslint-config-next → typescript-eslint →
    @typescript-eslint/typescript-estree → minimatch 10.2.5 (`^5.0.5`); beide `"dev": true`.
  · undici, hoch: die Meldung oben.
- ZÄHLUNG: npm zählt je Paket (3), Dependabot je Advisory und Manifest. Für undici allein sind
  bis zu zehn Meldungen zu erwarten — ABGELEITET, nicht abgelesen. Die Dependabot-Zahl von heute
  ist von CC nicht erhoben.
- FOLGE FÜR DAS MANIFEST: Der Stand "NULL OFFEN" des Items DEPENDABOT-MELDUNGEN (beide Fassungen,
  2026-09-14) war überholt. Weil die Korrektur die Statuszeile berührt, ist sie dem Architekten
  vorgelegt worden; vollzogen im Commit dieses Vermerks nach ARCHITEKTEN-ENTSCHEIDUNG 2026-10-02:
  neue Statuszeile und neuer ZUSTAND in beiden Fassungen, "RUHENDER POSTEN … kein offener"
  entfällt in beiden (in der Vollfassung auch im BINDET-AN-Feld), BINDET-AN "DIE NÄCHSTE MELDUNG"
  bleibt; in der Vollfassung dazu TRAGENDE KONTROLLE und EHRLICHE EINORDNUNG berichtigt. Nach
  bestätigtem Live-Test der Scheibe "Abhängigkeiten" geht das Item auf den ruhenden Posten zurück
  (Auftrag des Architekten, 2026-10-02).
  DER ZEIGER IN docs/roadmap.md, Roadmap-Zeile 11.10, Punkt (b), zitiert den alten Titel
  "DEPENDABOT-MELDUNGEN GESICHTET (2026-09-12)". Er ist beschreibend und bleibt stehen; er löst
  über den Wortanfang "DEPENDABOT-MELDUNGEN" auf, und die Erreichbarkeits-Prüfung je Paket, auf
  die er zeigt, steht seit dem 2026-09-22 in docs/claude-md-herleitung.md und in der Vollfassung.

**Zuschnitt P13.7-27 — SCHEIBE "ABHÄNGIGKEITEN". ABGELAUFEN mit Vermerk P13.7-28 (2026-10-02),
verdichtet in derselben Runde.**
- BINDET ÜBER DIE SCHEIBE HINAUS: nichts (ARCHITEKTEN-SETZUNG 2026-10-02).
- WAS ABGELAUFEN IST, und wo es steht: der UMFANG (undici im jsdom-Bereich, brace-expansion in den
  bestehenden Bereichen, next auf eine behobene Patch-Fassung) · die ZIELVERSION next 16.3.8 samt
  Grund · die BINDENDEN PRÜFUNGEN (Routen-Tabelle zeichengleich, zwei Hosts je mit eigener Seite)
  samt der Lesart zu "alle ƒ" · die AUSSCHLÜSSE (jsdom 30, `overrides`, andere Upgrades). Inhalt
  und Ergebnis: Vermerk P13.7-28, Punkte (1) bis (3). Der Wortlaut vor der Verdichtung steht unter
  Commit `f93f1ed`.

**Vermerk P13.7-28 — ABSCHLUSS DER SCHEIBE "ABHÄNGIGKEITEN". Bau-Commit `5567d14`
(`chore(deps): next 16.3.8, undici 7.30.0, brace-expansion — Advisories geschlossen`),
2026-10-02.**

(1) GEBAUT, GEGEN DEN ZUSCHNITT P13.7-27 (GEMESSEN AM REPO, CC, 2026-10-02):
    · undici 7.29.0 → 7.30.0 — `npm update` nimmt die höchste Fassung in `^7.25.0`; der
      Zuschnitt verlangte ≥7.29.1. brace-expansion 1.1.18 → 1.1.21 und 5.0.9 → 5.0.12.
    · next 16.3.5 → 16.3.8, exakt gepinnt; `@next/env` und die acht `@next/swc-*` im
      Gleichlauf. `eslint-config-next` und `@next/eslint-plugin-next` bleiben auf 16.2.9.
    · ZIELVERSION 16.3.8 (ARCHITEKT, 2026-10-02): die einzige Fassung, die alle bekannten
      Advisories schliesst — GHSA-vcvr-r3jv-pc5j und sieben weitere laut Release-Text v16.3.8
      (GELESEN über die GitHub-API, 2026-10-02); ein späterer Sprung bräuchte eine zweite
      Live-Regression. Die sieben standen am 2026-10-02 nicht im globalen Advisory-Verzeichnis
      und nicht in `npm audit`; ob 16.3.5 von ihnen betroffen war, ist NICHT ENTSCHEIDBAR.
      GHSA-vcvr war nach erster Probe nicht erreichbar (`next/og|ImageResponse` 0 Treffer).
    · NICHT GEBAUT, wie zugeschnitten: jsdom 30, `overrides`, andere Upgrades.

(2) BAU-NACHWEIS (GEMESSEN, CC, 2026-10-02):
    · Mengennachweis je Schritt — Vergleich je Schlüssel in `packages` und der übrigen obersten
      Felder des Lockfiles, je Lauf mit einer Köder-Änderung als Positivkontrolle: Schritt 1
      (`npm update undici brace-expansion`) genau 3 Einträge, Schritt 2
      (`npm install next@16.3.8 --save-exact`) genau 11 (Root, `next`, `@next/env`, acht
      `@next/swc-*`), gesamt 14 = Soll. package.json: genau eine Zeile.
    · `npm audit`: vorher 3 Positionen (1 kritisch, 2 hoch), nachher 0.
    · Versionsprobe: `next` 16.3.8 in node_modules; Build-Zeile `▲ Next.js 16.3.8 (Turbopack)`.
    · Routen-Tabelle zeichengleich, sha256 `bf8bc323…e664` vorher und nachher (Gegenprobe mit
      einer veränderten Kopie: `cmp` meldet den Unterschied): acht `ƒ`, zwei `○` (`/_not-found`,
      `/login`). "Alle ƒ" traf schon vorher nicht zu; tragend ist "zeichengleich" — LESART
      BESTÄTIGT (ARCHITEKT, 2026-10-02).
    · Proxy-Laufzeit: `functions-config-manifest.json`, `/_middleware.runtime` = `nodejs` vorher
      und nachher, das Manifest als Ganzes gleich; `middleware-manifest.json` 0/0;
      `middleware.js` plus `.nft.json` vorhanden; kein `server/edge/`.
    · Gates: `tsc --noEmit` 0 · `lint` 0 Fehler, 1 bekannte Warnung (`consent.test.ts`) ·
      `vitest run` 102 Dateien / 2797 Tests vorher wie nachher · `build` 0. Byte-Kontrolle:
      package.json 35 LF, Lockfile 8694 LF, CR = 0, je wie vorher.

(3) LIVE-TEST (OWNER, 2026-10-02 — alle Angaben OWNER-ANGABEN, nicht von CC gemessen):
    · V1 — A/B aus, kein Einwilligungs-Dialog, kein Fan-Out-Ziel, auf beiden Testprojekten.
    · V2 — beide Projekte nach Editor-Neuladen neu veröffentlicht, danach nichts geändert.
    · V3 (vor dem Push) und N2/N3 (nach dem Deploy), je zweimal per
      `fetch(location.href,{cache:'no-store'})`: Make-Seite 20007 Bytes, sha256
      `e283fa67a19f336a03290ca7e1132e0b292bbc27975bc6cd5196c3c03cf91500`; Zapier-Seite
      19999 Bytes, sha256 `824c1bbc0354fc2b795201c8459bc17733d76b28d0742a0039033d4a9016ffa8` —
      vorher = nachher, die zwei Seiten verschieden. Das ist die bindende Prüfung "zwei Hosts je
      mit eigener Seite".
    · N0 — Production-Deployment `5567d14` auf main, Ready (Ablesung Vercel).
    · N1 — Anmeldung, Editor, Make-Seite wie gewohnt; eine erfundene Subdomain antwortet 404.
    · N4 — Seitenaufrufe der Make-Seite +1.
    · N5 — `/api/e`: unbekannter Schlüssel → 204, Rumpf 0; Pflichtfeld fehlt → 400, Rumpf 0.
    · N6 — Relay auf der Make-Seite: `/api/f` 204, Danke-Seite, Lauf "N6" in Make.
    · N7 — Speichern und Veröffentlichen ohne Fehler.

(4) BEZUGSWERT-ABGLEICH (GEMESSEN AM REPO, CC, 2026-10-02 — Suche nach den vollen sha256 im
    Archiv der Phase 13.6, docs/claude-history/phase-13.6-formular-relay.md): BEIDE WERTE SIND
    DIE DORTIGEN BEZUGSWERTE, Bytes und sha256 zeichengleich.
    · Make: Vermerk P13.6-89, Punkt (3) (L1, 20007 Bytes, voller sha256), als Bezugspunkt
      gesetzt in Setzung P13.6-100, (5), und erneut gemessen in Vermerk P13.6-103, Punkte (2)
      und (3).
    · Zapier: Vermerk P13.6-103, Punkt (4) (L2, 19999 Bytes, voller sha256).
    · ABGELEITET: Neu-Veröffentlichen unter 16.3.5 (V2) und Ausliefern unter 16.3.8 (N2/N3)
      ergeben denselben Text wie beim Phasenende 13.6.

(5) GRENZEN (OWNER): nur Chrome · Cookie `__Host-ps_v` nicht geprüft (kein A/B aktiv) ·
    Kill-Switch nicht geprüft · Meta-Weiterleitung nicht geprüft (Code unverändert) · Persist
    nur über den Seitenaufruf-Zähler belegt. DAZU (CC, GEMESSEN AM REPO): `after()` ist in allen
    Ingest-Tests gemockt (`vi.mock("next/server", …)`); sein Verhalten unter 16.3.8 belegt
    allein N4. Server Actions belegt allein N7.

(6) DEPENDABOT NACH DEM PUSH: 0 offene Meldungen (OWNER-ABLESUNG 2026-10-02).
    BEOBACHTUNG (CC, 2026-10-02, Push-Ausgaben): Beim Push von `f93f1ed` und von `5567d14`
    meldete GitHub je "1 vulnerability … (1 high)" mit Verweis auf `dependabot/45`, während
    `npm audit` vor dem Bau drei Positionen führte, darunter next kritisch. Dependabot zählte die
    next- und brace-expansion-Advisories zu diesem Zeitpunkt nicht. URSACHE NICHT ERHOBEN; dass
    beim Push von `5567d14` der neue Scan noch nicht gelaufen war, ist ABGELEITET. Der Fall
    belegt die Auflage des Manifest-Items DEPENDABOT-MELDUNGEN, die Dependabot-Zahl NEBEN
    `npm audit` zu lesen.

(7) NACHGEZOGEN IN DER DOKU-RUNDE DIESES VERMERKS: Manifest-Item DEPENDABOT-MELDUNGEN, beide
    Fassungen, zurück auf den ruhenden Posten · Regel "DAS ETIKETT IM NEXT-BUILD-OUTPUT …", Kern
    und Herleitung, auf 16.3.8 · docs/arbeitsweise.md, Abschnitt 4a, auf 16.3.8
    (Änderungsantrag angenommen, OWNER 2026-10-02). NICHT nachgezogen, weil Zeitdokumente:
    docs/roadmap.md, Zeile 11.10; docs/claude-md-herleitung.md; der gestrichene Punkt "WARUM DIE
    ZWEI NEXT-MELDUNGEN …" in der Vollfassung des Manifests; Vermerk P13.7-26 dieser
    Datei. AUSSERHALB DES REPOS, von CC nicht prüfbar: die Projektanweisung
    "Next.js 16.3.5" (Roadmap-Zeile 11.10).

(8) DEPLOY-WEG (OWNER-ABLESUNG Vercel, 2026-10-02): Push auf main → Production-Deployment;
    Dependabot-Branches → Preview-Deployments.
    · Punkt U4 des Vermerks P13.7-1 ist zur Hälfte beantwortet: der Deploy-Weg. Offen bleibt
      der Umfang des Vercel-Tokens.
    · Befund C3: "ob ein Push auf main deployt, ist NICHT ENTSCHEIDBAR" ist beantwortet — er
      deployt. Offen bleiben der Umfang des Vercel-Tokens und dass die CI kein Merge-Gate ist;
      Vorrat P13.7-7 bleibt mit diesem Rest stehen.
    · ABGELEITET, NICHT GELESEN: Ob ein Production-Deployment auf das Ergebnis der CI wartet,
      ist eine Einstellung bei Vercel bzw. GitHub; ohne sie geht ein Push auf main in Produktion,
      auch wenn die CI rot ist. Bezug: Kandidat K9, Vorrat P13.7-30.

**Zuschnitt P13.7-31 — SCHEIBE "K2a": RESERVIERTE HOSTS UND `checkDomainStatus`. ABGELAUFEN mit
Vermerk P13.7-33 (2026-10-02), verdichtet in derselben Runde.**
- BINDET ÜBER DIE SCHEIBE HINAUS (ARCHITEKTEN-ENTSCHEIDUNGEN 2026-10-02):
  · E1 — QUELLE: `isReservedHost` (src/lib/hosting/host.ts) liest `servingSuffixes()`,
    `APP_HOSTS` und `PLATFORM_SUFFIXES` — die Mengen des Proxys, an der LABEL-GRENZE, NICHT
    `isAppHost` (exakt) und NICHT `ownFormTargetDomains` (src/lib/form-target.ts; zweites Urteil,
    folgt `APP_HOSTS` nicht). Die Abweichung beider Urteile bleibt der offene Punkt
    "isAppHost-PLATZHALTER". Ein weiterer Plattform-Suffix kommt nur mit Lesung oder Messung
    hinein, nicht auf Verdacht.
  · E2 — LEERE ENV: fail-closed. Fehlt `NEXT_PUBLIC_HOSTING_DOMAIN`, gilt jeder Host als
    reserviert.
  · E3 — Jede Domain am Vercel-Projekt ist vom Prädikat erfasst ODER durch genau eine
    `domains`-Zeile gedeckt. Gilt vor jedem Deploy, der das Prädikat oder die Domainliste berührt.
  · DIE LIVE-AUFLAGE gilt weiter, auch für K2b: Live nie mit dem Apex der Serving-Domain, einem
    App-Host oder einer am Vercel-Projekt hängenden Domain; Proben nur mit einer nicht vergebenen
    Subdomain der Serving-Domain; eine versehentlich entstandene `domains`-Zeile wird per SQL
    gelöscht, nie über "Entfernen" in der App.
- WAS ABGELAUFEN IST, und wo es steht: der Befund zur Quelle (App-Hosts fest codiert, zwei
  bestehende Urteile), die Ansatzstellen in register, remove und status, der Serve-Pfad (Label
  gewinnt; Apex und verschachtelte Namen gehen in den `custom_host`-Pfad — daher der ganze
  Teilbaum), die Supabase-Lesung zu `update`/`.select`, der Meldungstext, die Abgrenzung zu K2b.
  Inhalt und Ergebnis: Vermerk P13.7-33. Der Wortlaut vor der Verdichtung steht unter Commit
  `0ebeca6`.

**Vermerk P13.7-33 — ABSCHLUSS DER SCHEIBE "K2a". Bau-Commit `ed20fab` (`feat(domains):
reservierte Hosts abweisen; Domain-Status meldet Update ohne Treffer`), 2026-10-02.**

(1) GEBAUT, GEGEN DEN ZUSCHNITT P13.7-31 (GELESEN AM CODE, CC, 2026-10-02):
    · `isReservedHost` in src/lib/hosting/host.ts; die Härtung der Variable ist dafür als
      `cleanedHostingDomainEnv` aus `servingSuffixes` herausgezogen (Logik zeichengleich).
      `PLATFORM_SUFFIXES = ["vercel.app"]`.
    · `registerCustomDomain`: Prüfung nach `normalizeDomain`, vor dem lokalen Kollisionscheck;
      Grund `reserved_host`, Meldung "Diese Domain kann hier nicht verbunden werden.".
    · `removeCustomDomain`: Prüfung nach dem Serving-Row-Schutz, vor Rate-Limit und Vercel;
      Meldung "Diese Domain kann hier nicht entfernt werden."; die Zeile bleibt.
    · `checkDomainStatus`: Prüfung nach dem Eigentums-Gate, vor der Cache-Bremse, Antwort
      `not_found`; Update mit `.select("label")`, kein Treffer → `internal_error`; an den Client
      allein "Status konnte nicht geprueft werden.", geloggt allein `errorName`.
    · Audit: je Aufruf genau ein Eintrag; neues Ergebnis `rejected_reserved_host`.
    · Neu: supabase/checks/reservierte-hosts.sql (Q0 bis Q4; Q4 prüft die Deckung nach E3).
    · TESTS: In register.test.ts, remove.test.ts und status.test.ts setzt je ein `beforeEach` auf
      Dateiebene die Serving-Domain — die Testumgebung trägt sie nicht (GEMESSEN, CC, mit
      Positivkontrolle), und unter E2 wäre sonst jeder Host reserviert. Kein bestehender
      Testrumpf ist geändert; geändert ist allein die angekündigte Fixture in status.test.ts
      (`then` liefert `data`). ARCHITEKTEN-FREIGABE 2026-10-02, Option (1); verworfen: die Setzung
      in vitest.config.ts (wirkt auf alle Testdateien).

(2) BAU-NACHWEIS (GEMESSEN, CC, 2026-10-02):
    · Vor dem Eingriff in den Produktionscode, nach der Env-Setzung: 31 bestehende Tests der drei
      Dateien grün (register 15, remove 9, status 7).
    · Mutationen, je einzeln, Vorhersage = Ergebnis in allen sieben Fällen: (a) blosses
      `endsWith` → T3 · (b) Gleichheit entfernt → T1, T2, T4, T5, T6, R1, M1, S1 (alle
      Apex-/Gleichheits-Fälle, keine Kaskade) · (c) Prüfung in remove entfernt → M1, M2, E2 ·
      (d) Trefferprüfung in status entfernt → S2 · (e) Prüfung in register hinter Schritt 3 → R3
      · (f) Prüfung in status entfernt → S1, S1b, E2 · (g) fail-open bei leerer Env → T8 und die
      drei E2-Fälle. Rücknahme belegt per Suche nach den Markern (0 Treffer, Positivkontrolle 1).
    · Gates: `tsc --noEmit` 0 · `lint` 0 Fehler, 1 bekannte Warnung (`consent.test.ts`) ·
      `vitest run` 102 Dateien, 2797 → 2819 Tests (+22) · `build` 0, Routen-Tabelle unverändert.
      Byte-Kontrolle: alle neun Dateien LF, CR = 0; die neue SQL-Datei am committeten Objekt
      geprüft (CR = 0, LF = 112, NUL = 0).

(3) LIVE-TEST (OWNER, 2026-10-02 — alle Angaben OWNER-ANGABEN, nicht von CC gemessen):
    · E3 VOR DEM DEPLOY: Owner-SQL — genau eine `custom_host`-Zeile (`thr-ty.com`, Label
      `thr-ty-com-aoyh8o`, verified), keine reservierte.
    · N0 — Production-Deployment `ed20fab`, Ready.
    · N1 — App und Make-Seite unverändert.
    · N2 — `zz-k2a-probe-7x3q.publayer.net` hinzufügen → "Diese Domain kann hier nicht verbunden
      werden.".
    · N3 — Vercel-Domainliste unverändert, vier Einträge.
    · N4 — `thr-ty.com` im eigenen Projekt erneut hinzufügen → keine Ablehnung; Audit
      `already_registered_self` zweimal (09:50:33 und 09:50:43 UTC). Die Oberfläche gibt dabei
      keine Rückmeldung, das Feld leert sich (Vorrat P13.7-35).
    · N5 — Status `thr-ty.com` → "Live — DNS korrekt, TLS-Zertifikat aktiv", kein Fehler.
    · N6 — Bestandsprobe: Q0 1, Q1 0, Q2 0, Q3a und Q3b je `meinpublayer.net` und `kunde.de`
      false, alle übrigen true; Q4 `thr-ty.com` 1; Probe-Zeilen 0; Audit
      `zz-k2a-probe-7x3q.publayer.net` `rejected_reserved_host` (09:47:24 UTC).

(4) WAS DIE BEOBACHTUNGEN TRAGEN (ABGELEITET, CC, 2026-10-02, am Code `ed20fab`):
    · DER PRODUKTIONSWERT VON `NEXT_PUBLIC_HOSTING_DOMAIN`: in Vercel als "Sensitive" nicht
      ablesbar (Owner, 2026-10-02). Er ist dreifach eingegrenzt:
      – N4 schliesst fail-closed aus: Unter E2 wäre auch `thr-ty.com` abgelehnt worden. Die
        Variable ist also gesetzt.
      – N2: Die Probe kann nur über den Serving-Suffix reserviert sein — `lvh.me`, `APP_HOSTS`
        und `vercel.app` treffen sie nicht. Der Wert endet also an einer Label-Grenze von
        `zz-k2a-probe-7x3q.publayer.net`.
      – N1: `extractLabel` liefert ein Label nur, wenn ein Suffix aus `servingSuffixes()`
        zutrifft und der Rest `LABEL_RE` (`^[a-z0-9-]{1,63}$`, ohne Punkt) erfüllt. Für
        "<label>.publayer.net" leistet das allein der Suffix ".publayer.net"; mit ".net" bliebe
        "<label>.publayer" mit Punkt, ein Suffix ohne Punkt davor trifft nicht. Ohne ihn fiele
        der Host in den `custom_host`-Pfad und antwortete 404. Damit ist der bereinigte Wert
        `publayer.net` — VORAUSGESETZT, die Make-Seite liegt unter einem Label von
        publayer.net und nicht auf einer Custom-Domain (Owner-Angabe der Phase 13.6, hier von
        CC nicht geprüft).
      Gegen denselben Build gemessen: N1 und N2 laufen im Deployment `ed20fab`; der Wert wird
      beim Build eingesetzt (Kopfkommentar von `ownFormTargetDomains`, GELESEN, NICHT GEMESSEN).
    · Punkt U2 des Vermerks P13.7-1 ist zur Hälfte beantwortet: welche Domains am Projekt hängen
      (vier, Owner-Ablesung). Vercels Antwort für die eigenen Domains bleibt UNGEMESSEN; sie
      wird durch das Prädikat nicht mehr erfragt.
    · N5 zeigt, dass `checkDomainStatus` live `ok: true` geliefert hat — die Oberfläche zeigt die
      Meldung nur dann. Ob dabei der Update-Pfad mit `.select` lief oder die Cache-Bremse griff,
      trennt N5 nicht; `vercel_synced_at` vor und nach dem Klick ist nicht abgelesen.
    · N6: Ob die Datei supabase/checks/reservierte-hosts.sql selbst lief oder die in der Runde
      vorgelegte Zusammenfassung in EINER Anweisung (zeichengleiche Vergleichsausdrücke, andere
      Zusammensetzung), ist nicht angegeben. Die Syntax der DATEI ist nur im ersten Fall belegt.
      Ihr Kopffeld VERIFIZIERT steht noch auf "noch nie gegen echte Daten gefahren".

(5) GRENZEN: Entfernen mit reserviertem Host live nicht geprüft (Live-Auflage; belegt allein durch
    M1 und M2) · fail-closed (E2) live nicht geprüft (allein T8 und die E2-Fälle) · nur Chrome ·
    ein geänderter Env-Wert wirkt erst nach einem Redeploy (`NEXT_PUBLIC_*` wird beim Build
    eingesetzt — GELESEN, NICHT GEMESSEN).

(6) FOLGEN: Befund B1 des Vermerks P13.7-1 ist GESCHLOSSEN; der Rest — eine schon bestehende
    reservierte Zeile wird weiter ausgeliefert — ist Vorrat P13.7-32 (Bestand heute: keine, N6).
    Vorrat P13.7-2 ist ERLEDIGT.

**Zuschnitt P13.7-36 — SCHEIBE "K2b": LÖSCHEN MIT CUSTOM-DOMAIN, KEINE ÜBERNAHME BEI 409 MIT
EIGENER projectId, KRYPTOGRAFISCHER LABEL-ZUFALL. OWNER-ENTSCHEIDUNG 2026-10-02 ("so wie
vorgeschlagen", Auswahl im Chat); Formulierung CC. ABGELAUFEN mit Vermerk P13.7-39 (2026-10-02),
verdichtet in derselben Runde.**
- BINDET ÜBER DIE SCHEIBE HINAUS (OWNER und ARCHITEKT, 2026-10-02): (1) bis (3) samt D2, D3 und
  D5 unten; E1 bis E3 und die Live-Auflage des Zuschnitts P13.7-31 gelten weiter. Die Ausnahme
  D6 von der Live-Auflage (allein `k2b-probe.thr-ty.com`) ist mit L3 des Vermerks P13.7-39
  verbraucht und gilt nicht weiter.
- (1) LÖSCHEN NUR OHNE CUSTOM-DOMAIN. `deleteProject` (src/app/projects/actions.ts) verweigert
  serverseitig, solange das Projekt eine `domains`-Zeile mit `custom_host` trägt; ist das nicht
  lesbar, verweigert es ebenfalls (fail-closed). Die Meldung ist neutral ("Bitte entferne
  zuerst die verbundene Domain.") und behauptet keine weitere Ursache. Die Label-Zeile
  (`custom_host` null) hält das Löschen nicht auf. GRUND: Befunde B2 und F5 des Vermerks P13.7-1.
  · D2 — Die Prüfung läuft über den Admin-Client, gefiltert auf `projects.user_id` =
    Sitzungsnutzer, nur als Anzahl; das Delete selbst bleibt beim Nutzer-Client. Grund: Unter
    `domains_select_own` wären "keine Zeile vorhanden" und "keine Zeile sichtbar" nicht zu
    trennen; der Filter auf `user_id` verhindert, dass die Prüfung über ein fremdes Projekt
    etwas verrät.
  · D3 — Bei einem Lesefehler und beim Fehlschlag des Delete lautet die Meldung "Projekt konnte
    nicht gelöscht werden."; geloggt wird `errorName`, nie das rohe `error.message`.
- (2) KEINE ÜBERNAHME BEI 409 MIT EIGENER projectId. Antwortet Vercel beim Hinzufügen mit 409
  `domain_already_in_use` und der projectId UNSERES Vercel-Projekts (`already_on_project` in
  `addDomainToVercel`, src/lib/vercel/client.ts), legt `registerCustomDomain`
  (src/lib/domains/register.ts) KEINE Zeile mehr an: Ablehnung, genau ein Audit-Eintrag, kein
  weiterer Vercel-Aufruf. Verwaiste Domains räumt der Owner von Hand auf.
  PREIS (OWNER, angenommen): Ein Betreiber, der seine eigene Zeile durch einen Fehler verliert,
  kann sich nicht mehr selbst heilen.
  GRUND (ABGELEITET): Über genau diesen Zweig übernahm bis K2b jedes Konto eine verwaiste Domain
  (Befund B2; der Zustand ist in Phase 7 gemessen, ebenda). Ohne ihn ist eine verwaiste Domain
  über die App für kein Konto mehr erreichbar, gleich aus welcher Quelle sie stammt.
  KEHRT EINE ENTSCHEIDUNG DER PHASE 7 UM (D1 unten): docs/claude-history/phase-7-hosting.md,
  Abschnitt "7c-2b — Add-Domain-Mutation: Konzept & Entscheidungen". Das Archiv bleibt als
  Zeitdokument unverändert; die Umkehr steht HIER.
  ALT, wörtlich: "IDEMPOTENZ & HEILUNG (eng begrenzt, KEINE allgemeine Sync-Engine): Wenn Vercel
  den oben korrigierten 409 (error.code "domain_already_in_use" + eigene projectId) meldet, weil
  die Domain bereits auf UNSEREM Projekt existiert (z.B. nach einer fehlgeschlagenen
  DB-Transaktion beim vorigen Versuch), holt derselbe Mutations-Aufruf den aktuellen
  Vercel-Zustand nach und schreibt/heilt die eigene DB-Zeile damit -> ein erneuter Add-Versuch
  des rechtmäßigen Owners wird NICHT blockiert." Dazu im Punkt "FEHLER-MAPPING" desselben
  Abschnitts: "409 + error.code === "domain_already_in_use" + die im Body mitgelieferte projectId
  === unsere VERCEL_PROJECT_ID -> HEILEN."
  NEU: 409 + `domain_already_in_use` + eigene projectId -> ABLEHNEN: keine `domains`-Zeile, kein
  weiterer Vercel-Aufruf, genau ein Audit-Eintrag `rejected_already_on_project`, neutrale
  Meldung. Der Zweig unterscheidet nicht, ob die Domain einem rechtmässigen Besitzer gehört; eine
  verwaiste Domain räumt der Owner von Hand auf (Vercel-Dashboard). Ein erneuter Add-Versuch nach
  verlorener Zeile WIRD blockiert. Eine Rückkehr der Selbstheilung ohne Übernahme-Lücke: Vorrat
  P13.7-38.
  · D1 — die Umkehr oben, bestätigt wie im Plan vorgelegt (ARCHITEKT, 2026-10-02).
  · D5 — Audit-Ausgang des abgelehnten Zweigs: `rejected_already_on_project`.
- (3) KRYPTOGRAFISCHER LABEL-ZUFALL. `randomLabelSuffix` (src/lib/hosting/host.ts) bezieht den
  Zufallsteil aus einer kryptografischen Quelle statt aus `Math.random`; Alphabet und Länge
  bleiben ([a-z0-9], 6 Zeichen). Teil von Befund B5.
- WAS ABGELAUFEN IST, und wo es steht: der Gegenstand (Befunde B2, F5, der Heil-Pfad, der
  Zufallsteil aus B5) · die Ausschlüsse Grabstein und Serve-Riegel samt Gründen — sie stehen an
  Vorrat P13.7-37 und P13.7-32, beide mit dem Trigger "Hebung am Phasenende 13.7" · D4 (`healed`
  entfällt; die Mocks in zwei bestehenden Testdateien angepasst) · D6 und D7 (der Live-Weg) ·
  "DANACH" (jetzt unter "Noch nicht geschnittene Arbeit"). Inhalt und Ergebnis: Vermerk
  P13.7-39. Der Wortlaut vor der Verdichtung steht unter Commit `c6d5e5e`.

**Vermerk P13.7-39 — ABSCHLUSS DER SCHEIBE "K2b". Bau-Commit `2a69571` (`feat(domains): Projekt
mit Custom-Domain nicht löschbar; keine Übernahme verwaister Domains; Label-Zufall
kryptografisch`), 2026-10-02.**

(1) GEBAUT, GEGEN DEN ZUSCHNITT P13.7-36 (GELESEN AM CODE, CC, 2026-10-02, `git show 2a69571`):
    · `deleteProject`: Prüfung nach `getUser()`, vor dem Delete, über den Admin-Client (`domains`
      mit `projects!inner(user_id)`, Filter auf `project_id`, `projects.user_id` und
      `custom_host` nicht null, nur die Anzahl). Lesefehler, Wurf oder keine Anzahl → "Projekt
      konnte nicht gelöscht werden."; Anzahl > 0 → "Bitte entferne zuerst die verbundene
      Domain."; ein Fehlschlag des Delete → derselbe neutrale Text, geloggt `errorName`.
    · `registerCustomDomain`: Zweig `already_on_project` → "Domain konnte nicht registriert
      werden.", Audit `rejected_already_on_project`, keine Zeile, kein weiterer Vercel-Aufruf;
      in die Persistenz führt allein `kind === "ok"`. `healed` entfällt samt den Audit-Ausgängen
      `healed` und `healed_race`. `addDomainToVercel` (src/lib/vercel/client.ts) liefert für
      `already_on_project` kein Domain-Objekt mehr.
    · `randomLabelSuffix`: `globalThis.crypto.getRandomValues`, Bytes ab 252 verworfen
      (Gleichverteilung), Alphabet und Länge unverändert; kein `node:crypto` (die Datei liegt
      auch im Client-Bundle).
    · Tests: neu src/app/projects/delete-project.test.ts; geändert register.test.ts,
      host.test.ts, CodeImporter.test.tsx, TargetCard.test.tsx. Neu die Probe
      supabase/checks/verwaiste-domains.sql samt README-Zeile. 11 Dateien (`git show --stat`).

(2) BAU-NACHWEIS: Der Bau-Bericht der Scheibe (Mutationen, Gate-Zahlen) steht NICHT im Bestand.
    NACHGEMESSEN (CC, 2026-10-02, am Stand `72afa1b`; `git diff --stat 2a69571 72afa1b` nennt
    allein drei Dateien unter supabase/checks/): `vitest run` 103 Dateien, 2829 Tests, grün
    (nach K2a: 102 / 2819) · `next build` exit 0.

(3) LIVE-TEST (OWNER, 2026-10-02 — alle Angaben OWNER-ANGABEN, nicht von CC gemessen):
    · N1 — Bestandsprobe: V0 = 6; V1 leer; V2 drei Namen erfasst, `thr-ty.com` gedeckt.
    · L1 — Wegwerf-Projekt W1, veröffentlicht als `w1-loschtest-ex1udz.publayer.net`, gelöscht;
      keine Reste.
    · L2 — W2 (`d300be7a-…`) mit der per SQL angelegten Probe-Zeile `k2b-delete-probe.invalid`
      (D7): Löschen → "Bitte entferne zuerst die verbundene Domain.", das Projekt blieb. Zeile
      per SQL entfernt (Rest 0); danach Löschen erfolgreich. BEOBACHTUNG: Die Meldung bleibt nach
      dem erfolgreichen Löschen stehen und erscheint im nächsten Projekt, bis neu geladen wird
      (Vorrat P13.7-40).
    · L3 — W3 (D6): `k2b-probe.thr-ty.com` hinzugefügt → "Wartet auf DNS"; Vercel fünf Einträge
      ("Invalid Configuration"); Zeile `k2b-probe-thr-ty-com-80tmfl`. Zeile per SQL gelöscht;
      erneut hinzugefügt → "Domain konnte nicht registriert werden."; Zählung `k2b-probe` 0,
      `thr-ty` 1; V1 genau ein Eintrag `rejected_already_on_project`, 13:32:51 UTC; V0 6 → 8.
      V2 mit fünf Namen: allein `k2b-probe.thr-ty.com` VERWAIST (Positivkontrolle der Probe).
      Aufgeräumt: `k2b-probe.thr-ty.com` bei Vercel entfernt, wieder vier Einträge, V2 sauber;
      W3 gelöscht.
    · VORFALL in L3: Ein Lauf mit dem unersetzten Platzhalter `<SERVING_DOMAIN>` zeigte
      `publayer.net` und `*.publayer.net` als VERWAIST. Ursache am Abfragetext belegt; nichts
      war verwaist. Repariert mit Commit `72afa1b` (Punkt (5)).
    · L4 — App wie gewohnt; die Make-Seite lädt; `thr-ty.com` "Live — DNS korrekt,
      TLS-Zertifikat aktiv".

(4) WAS DIE BEOBACHTUNGEN TRAGEN (ABGELEITET, CC, 2026-10-02, am Code `2a69571`):
    · L3 misst Vercels Antwort auf eine bereits an unserem Projekt hängende Domain: weiterhin
      409 mit eigener projectId wie in Phase 7 (docs/claude-history/phase-7-hosting.md,
      Live-Beweis 7c-2, Fall (3)). Belegt durch den Audit-Ausgang `rejected_already_on_project`
      — ihn schreibt allein der Zweig `already_on_project` —, NICHT durch die Meldung: denselben
      Text "Domain konnte nicht registriert werden." trägt in `registerCustomDomain` ein zweiter
      Zweig (GEMESSEN AM REPO, zwei Treffer).
    · Punkt U2 des Vermerks P13.7-1 ("wie Vercel für die eigenen Domains antwortet") bleibt
      UNGEMESSEN: L3 betrifft eine Kunden-Subdomain, nicht die Plattform-Domains.
    · L2 belegt den Riegel an einer per SQL erfundenen Zeile, L1 das unveränderte Löschen ohne
      Custom-Domain. Den fail-closed-Zweig (Lesefehler) belegt allein der Test.

(5) DIE PROBEN SIND REPARIERT — Commit `72afa1b` (`fix(checks): Proben ohne Platzhalter für die
    Serving-Domain, mit Selbsttest`), 2026-10-02, CC:
    · supabase/checks/verwaiste-domains.sql und reservierte-hosts.sql tragen `publayer.net` fest;
      der Kopf nennt die Bindung an `NEXT_PUBLIC_HOSTING_DOMAIN` (Production) und ihre Grenze:
      in Vercel "Sensitive", eingegrenzt über N1, N2 und N4 des Vermerks P13.7-33, Punkt (4) —
      ABGELEITET, nicht abgelesen. Der Prompt der Runde nannte allein N2; der Bestand trägt drei.
    · SELBSTTEST je Block mit Reservierungs-Liste (V2, V3, Q1, Q2, Q4): Erfasst die Liste
      `publayer.net`, `*.publayer.net` oder `pagesmith-delta.vercel.app` nicht, liefert der Block
      genau eine Zeile `PROBE DEFEKT …` und keine Datenzeile.
    · V2 prüft die vier heute bekannten Vercel-Namen als festen Block (`publayer.net`,
      `*.publayer.net`, `pagesmith-delta.vercel.app`, `thr-ty.com`; die Namen aus dem Auftrag der
      Runde, die Anzahl vier aus Vermerk P13.7-33, N3); V3 prüft einen weiteren Namen an genau
      einer markierten Einsetzstelle und meldet einen unersetzten Platzhalter als `PLATZHALTER
      NICHT ERSETZT`. Q4 nutzt denselben festen Block.
    · NACHWEIS (GEMESSEN, CC, 2026-10-02): in PGlite 0.5.8 (Postgres 18.3, im Scratchpad, nicht im
      Repo) gegen Attrappen-Tabellen `domains` und `audit_logs`, je Block einzeln, die Datei
      unverändert, die Mutation nur im eingelesenen Text. Vorhersage = Ergebnis in allen Läufen:
      ohne Mutation V2 drei `erfasst` und `thr-ty.com` `gedeckt`, V3 `PLATZHALTER NICHT ERSETZT`,
      Q1 und Q2 0, Q4 `thr-ty.com` 1, Q3a/Q3b wie im Kopf · M1 (`publayer.net` aus den Listen
      entfernt), M2 (`<SERVING_DOMAIN>` statt `publayer.net` — der Vorfall) und M3 (`vercel.app`
      entfernt): V2, V3, Q1, Q2, Q4 je genau eine Zeile `PROBE DEFEKT …`; V0, V1, Q0, Q3a, Q3b
      unverändert · M4 (M1 und der Riegel `where st.ok` entfernt): V2 zeigt `publayer.net` und
      `*.publayer.net` als VERWAIST — die Form des Vorfalls, also trägt der Riegel. POSITIV-
      KONTROLLEN: V3 mit `k2b-probe.thr-ty.com` → VERWAIST, mit `THR-TY.COM.` → gedeckt; eine
      Attrappen-Zeile `X.Publayer.Net.` erscheint in Q1 und Q2.
    · GRENZE: Postgres 18.3 in WASM, nicht die Supabase-Datenbank; die Fassung ohne Platzhalter
      lief noch nie gegen echte Daten (Kopffeld VERIFIZIERT beider Dateien).

(6) GRENZEN (OWNER): Die Zufallsquelle der Labels ist allein im Test belegt (H1 in
    src/lib/hosting/host.test.ts) · nur Chrome.

(7) RUNBOOK-SZENARIO: Diese Scheibe schafft eine Handlung des Owners im Betrieb — das Aufräumen
    einer verwaisten Domain. Szenario (i) in docs/ADMIN_RUNBOOK.md, GEÜBT mit L3.

(8) FOLGEN: Befund B2 des Vermerks P13.7-1 ist GESCHLOSSEN, Befund F5 für Custom-Domains; B5 ist
    zum Teil (Zufallsteil) erledigt. Vorrat P13.7-34 ist zur Hälfte erledigt (src/lib/vercel/
    client.ts, Kopfkommentar, mit `2a69571`). Neu: Vorrat P13.7-40; aus der Runbook-Anlage dazu
    Vorrat P13.7-42 (Entscheidung P13.7-41).

**Entscheidung P13.7-41 — ADMIN-RUNBOOK UND ADMIN-AGENT. OWNER-ENTSCHEIDUNGEN 2026-10-02 (Auswahl
im Chat; übermittelt im Auftrag der Doku-Runde).**
- RUNBOOK: Es entsteht in der Phase 13.7 als docs/ADMIN_RUNBOOK.md (Name wörtlich vom Owner);
  jede Scheibe trägt ihre Szenarien ein. Angelegt in der Doku-Runde dieses Eintrags mit vier
  Szenarien aus Gemessenem. Die Kadenz und die Wege in docs/arbeitsweise.md sind dafür ergänzt
  (Änderungsantrag ANGENOMMEN, OWNER 2026-10-02); CLAUDE.md spiegelt die Wege.
- ADMIN-AGENT: eine eigene Phase nach 13.7, nur lesend und mit Vorschlägen — Roadmap-Zeile
  13.10 (docs/roadmap.md).
- KEIN UMZUG DER KILL-SWITCH-BEFEHLE (OWNER-ENTSCHEIDUNG 2026-10-02, nach Vorlage durch CC unter
  Stopp-Bedingung S3): Sie bleiben in CLAUDE.md ("KILL-SWITCH — SQL-RUNBOOK"); die Begründung des
  Bestands trägt — CLAUDE.md lädt jede Sitzung. Sie steht an drei Stellen: CLAUDE.md, Kopf von
  "## Security Manifest & Launch Blocker"; der Runbook-Block selbst ("bewusst hier in der
  Root-Doku statt in separater Datei"); supabase/checks/README.md. Szenario (iv) des Runbooks
  verweist dorthin.
- KONVENTION "EINE QUELLE JE BEFEHL" BESTÄTIGT (OWNER, 2026-10-02), mit dem Zusatz: Verweist ein
  Szenario auf eine Quelle, die REGEL 1 nicht erfüllt, steht das sichtbar am Szenario. Szenario
  (iv) trägt das: Die Sperr-Befehle haben zwei Einsetzstellen (Referenz und Ziel); der Umbau auf
  eine Stelle steht mit K3 an — Vorrat P13.7-42.

**Zuschnitt P13.7-43 — SCHEIBE "SUPABASE-PAKETE" (Gegenstand von Vorrat P13.7-29).
ARCHITEKTEN-ENTSCHEIDUNGEN 2026-10-02 (E1 bis E3, Angabe aus dem Auftrag); Formulierung CC.
Muster: Scheibe "Abhängigkeiten" (Zuschnitt P13.7-27, Vermerk P13.7-28).**
- UMFANG: `@supabase/ssr` 0.12.0 → 0.12.7 und `@supabase/supabase-js` 2.108.2 → 2.117.2; mit ziehen
  die fünf exakt gepinnten Unterpakete (`auth-js`, `functions-js`, `postgrest-js`, `realtime-js`,
  `storage-js`) 2.108.2 → 2.117.2 und `@supabase/phoenix` 0.4.2 → 0.4.5. Unverändert bleiben
  `cookie` 1.1.1, `iceberg-js` 0.8.1 und `tslib` 2.8.1 (je die höchste bzw. einzige Fassung im
  Bereich; GEMESSEN, `npm view`, CC, 2026-10-02).
- ZIELVERSIONEN 0.12.7 und 2.117.2: die Fassungen der Dependabot-PRs (#22 bzw. #26), zugleich die
  höchsten im Bereich und das dist-tag `latest` (GEMESSEN, `npm view`, CC, 2026-10-02).
- (E1) LOKAL STATT GITHUB-MERGE, weil (a) die PRs #22 und #26 sich in denselben Lockfile-Einträgen
  überschneiden — `@supabase/ssr` 0.12.7 verlangt als Peer `@supabase/supabase-js` `^2.114.0`, schon
  #22 allein zieht supabase-js samt Unterpaketen auf 2.117.2 — und (b) nur lokal Mengennachweis und
  vier Gates vor dem Push laufen (die CI ist kein Merge-Gate). Die PRs werden danach geschlossen bzw.
  schliessen sich selbst.
  RICHTIGGESTELLT (ARCHITEKT, 2026-10-02): Die frühere Begründung "gebaut auf einem Stand vor
  5567d14, Lockfile veraltet" war falsch. GEMESSEN (CC, 2026-10-02, `git ls-remote`, `git fetch` der
  zwei Commits, `git log`): `c5ca072` (#22, ssr) hat den Elternteil `5567d14` (08:30:17 UTC, 2,5
  Minuten nach `5567d14`); `daef240` (#26, supabase-js) hat den Elternteil `2a69571`;
  `git log 5567d14..HEAD -- package.json package-lock.json` liefert 0 Commits. Beide PR-Lockfiles
  bauen auf dem heutigen auf.
- (E2) VARIANTE R: Untergrenzen in package.json auf `^0.12.7` und `^2.117.2`. SOLL: package.json
  genau 2 Zeilen, Lockfile genau 9 Einträge (Root-Eintrag, ssr, supabase-js, fünf Unterpakete,
  phoenix). ZUSATZKONTROLLE: unser Lockfile gegen `c5ca072:package-lock.json` — genau 1 Unterschied,
  der Root-Eintrag (dort `^2.108.2` für supabase-js). Grund für R: der Peer `^2.114.0` von ssr 0.12.7
  und der Node-Boden (unten) stehen an der Untergrenze, statt dass der Bereich eine Kombination
  zulässt, die beides verletzt.
- (E3) PFLICHT-STOPP VOR DEM PUSH DES BAU-COMMITS: Die Node.js-Fassung in Vercel ist ≥ 22
  (OWNER-ABLESUNG ausstehend). GRUND: supabase-js und alle fünf Unterpakete verlangen ab 2.110.0
  `node >=22.0.0`, vorher `>=20.0.0` (GEMESSEN, `npm view … engines`; GELESEN, Release v2.110.0
  "drop Node.js 20 support", #2482). Lokal v24.16.0, CI `node-version: '24'`; package.json trägt kein
  `engines`-Feld, npm warnt nur. Die Fassung bei Vercel ist am Repo NICHT ENTSCHEIDBAR.
  RÜCKFALL-VARIANTE FÜR NODE 20: `@supabase/ssr` bleibt 0.12.0, `@supabase/supabase-js` höchstens
  2.109.0 — schon ssr 0.12.1 verlangt supabase-js `^2.110.3` (GEMESSEN, `npm view`).
- LESUNG (2026-10-02, CC): GitHub-Releases supabase/supabase-js v2.109.0 bis v2.117.2 und
  supabase/ssr v0.12.1 bis v0.12.7, dazu die PR-Beschreibungen ssr #246, #275, #283, #294 und
  supabase-js #2504, #2580, #2587, #2698; supabase.com/docs/reference/javascript/select und
  guides/auth/server-side/creating-a-client (Next.js). Ergebnis: keine Laufzeitänderung an count/head,
  `!inner`, `.select` nach `update` und der Form `{ data, error }`; Laufzeitänderungen allein in auth
  (`signOut` löscht die lokale Sitzung auch bei Fehlschlag, 5xx trägt die Server-Meldung, verlorene
  Erneuerung gegen einen anderen Tab liefert die gespeicherte Sitzung) und `maybeSingle` mit
  `throwOnError` (in src/ 0 Treffer). Kein Test fährt echten Supabase-Code (19 Testdateien mocken ihn;
  GEMESSEN AM REPO) — für das Verhalten der Pakete tragen allein `tsc`, `build` und der Live-Test.
- AUSDRÜCKLICH NICHT: next, react, andere Pakete, Code-Änderungen.
- BINDET ÜBER DIE SCHEIBE HINAUS: nichts.
- RUNBOOK: Die Scheibe schafft keine Betriebs-Handlung — das sagt der Abschluss-Vermerk in einem
  Satz.

---

## Noch nicht geschnittene Arbeit

Der Zuschnitt der übrigen Phase steht aus; ihn entscheidet der Architekt. Abgeschlossen sind seit
dem 2026-10-02 die Scheiben "Abhängigkeiten" (Vermerk P13.7-28), "K2a" (Vermerk P13.7-33) und
"K2b" (Vermerk P13.7-39). Als Nächstes die Scheibe zu Vorrat P13.7-29 (die zwei
Supabase-Versions-PRs), geschnitten als Zuschnitt P13.7-43, danach Kandidat K1 (ARCHITEKT, 2026-10-02, Auftrag der Doku-Runde zu
Vermerk P13.7-39). Der Grabstein (Vorrat P13.7-37) und der Serve-Riegel (Vorrat P13.7-32) gehen an
die Hebung am Phasenende 13.7. Die Kandidaten stehen im Vermerk P13.7-1, Punkt (4); der Vorrat
darunter.

---

## Vorrat (gemeldet, nicht gebaut)

**Vorrat P13.7-2 — `checkDomainStatus` MELDET EIN UPDATE OHNE TREFFER ALS ERFOLG UND GIBT
FEHLERTEXT AN DEN CLIENT. ERLEDIGT 2026-10-02.**
- BELEG: Bau-Commit `ed20fab` (Scheibe "K2a", Vermerk P13.7-33): Update mit `.select("label")`,
  kein Treffer → `internal_error`; an den Client allein ein neutraler Text, geloggt allein
  `errorName`. Mutation (d) — Trefferprüfung entfernt — macht Test S2 rot. Live N5: `ok: true`
  auf `thr-ty.com` (mit der Grenze aus Vermerk P13.7-33, Punkt (4)).
- Der Befund im Wortlaut vor der Erledigung steht unter Commit `ed20fab`.

Die folgenden Einträge tragen je einen Befund des Vermerks P13.7-1, der keinen Kandidaten K1 bis
K10 trägt. Der Befund steht dort im Wortlaut der Verdichtung und wird hier nicht wiederholt.
KEIN TRIGGER GESETZT, bei keinem.

**Vorrat P13.7-3 — A7: VERSTÄRKUNG ÜBER INLINE-ERNEUERUNG** (anonymer Beacon löst Google-Aufrufe
aus). Vermerk P13.7-1, Befund A7.

**Vorrat P13.7-4 — B4: PHISHING AUF UNSERER DOMAIN** (beliebiges HTML, Slug aus dem Projektnamen,
kein Safe-Browsing, kein security.txt; `functionalHtml` ohne Abgleich). Vermerk P13.7-1,
Befund B4.

**Vorrat P13.7-5 — B6: FREMDE DATEN — KEINE IDOR-LÜCKE GEFUNDEN** (Nicht-Treffer mit benanntem
Massstab; keine Handlung). Vermerk P13.7-1, Befund B6.

**Vorrat P13.7-6 — B7: RESSOURCEN — KEINE GRÖSSENGRENZE BEIM VERÖFFENTLICHEN.** Vermerk P13.7-1,
Befund B7.

**Vorrat P13.7-7 — C3: PLATTFORM-KONTEN** (Umfang des Vercel-Tokens, CI kein Merge-Gate,
Deploy-Weg). Vermerk P13.7-1, Befund C3.

**Vorrat P13.7-8 — D3: LOGS** (`error.message` in `listProjectDomains`, `e.message` in
`audit_logs.detail`). Vermerk P13.7-1, Befund D3.

**Vorrat P13.7-9 — D4: "NIE GELOGGT" GILT UNSEREM CODE, NICHT DER PLATTFORM.** Vermerk P13.7-1,
Befund D4.

**Vorrat P13.7-10 — F5: `deleteProject` KASKADIERT OHNE RÜCKFRAGE ZU CUSTOM-DOMAINS.** Vermerk
P13.7-1, Befund F5.
→ 2026-10-02: Für Custom-Domains Gegenstand des Zuschnitts P13.7-36, (1). Die Kaskade auf die
übrigen Tabellen bleibt.
→ 2026-10-02: Für Custom-Domains gebaut und live geprüft (Bau-Commit `2a69571`, Vermerk
P13.7-39, L2). Offen bleibt die Kaskade auf die übrigen Tabellen.

**Vorrat P13.7-11 — F6: BEKANNTE OFFENE PUNKTE DES STILLEN VERLUSTS** (Zeiger). Vermerk P13.7-1,
Befund F6.

**Vorrat P13.7-12 — N1: DER ZEITPUNKT DER ROADMAP-ZEILE 13.7 NENNT ZWEI EREIGNISSE.** Vermerk
P13.7-1, Befund N1.

**Vorrat P13.7-13 — N2: DIE ÜBERSCHRIFT VON VORRAT P13.6-129 IM ARCHIV NENNT MAINTAIN NICHT.**
Vermerk P13.7-1, Befund N2.

**Vorrat P13.7-14 — N12: `updateSession` RUFT `getUser()` AUCH FÜR DIE INGEST-PFADE AUF DEM
APP-HOST.** Vermerk P13.7-1, Befund N12.

**Vorrat P13.7-15 — N13: JEDER PFAD EINES SERVING-HOSTS LIEFERT DIESELBE SEITE.** Vermerk
P13.7-1, Befund N13.

**Vorrat P13.7-16 — N14: DER INGEST PRÜFT `domains.blocked_at` NICHT.** Vermerk P13.7-1,
Befund N14.

**Vorrat P13.7-17 — N15: DER INGEST TRÄGT IM CODE KEINE GRÖSSENGRENZE.** Vermerk P13.7-1,
Befund N15.

**Vorrat P13.7-18 — N16: `/api/f` AUF DEM APP-HOST LEITET AUF `/login` UM** (Zeiger auf den
offenen Punkt). Vermerk P13.7-1, Befund N16.

**Vorrat P13.7-19 — N18: UPDATES UND DELETES ÜBER DEN NUTZER-CLIENT MELDEN OHNE TREFFER ERFOLG.**
Vermerk P13.7-1, Befund N18.

**Vorrat P13.7-20 — N19: ANONYME SCHREIBWEGE ÜBER DEN ADMIN-CLIENT — REICHWEITE DER DAUERREGEL
OFFEN.** Vermerk P13.7-1, Befund N19.

**Vorrat P13.7-21 — N20: DIE OAUTH-RÜCKKEHR IST EIN SCHREIBENDES GET.** Vermerk P13.7-1,
Befund N20.

**Vorrat P13.7-22 — N21: DIE ERNEUERUNGS-ROUTE TRÄGT KEIN RATE-LIMIT JE NUTZER.** Vermerk
P13.7-1, Befund N21.

**Vorrat P13.7-23 — N23: KEIN WEG EINES SERVER-GEHEIMNISSES INS CLIENT-BUNDLE** (Nicht-Treffer
mit Positivkontrolle; keine Handlung). Vermerk P13.7-1, Befund N23.

**Vorrat P13.7-29 — ZWEI DEPENDABOT-VERSIONS-PRS FÜR LAUFZEIT-PAKETE STEHEN UNGEMERGT.**
- BEFUND (OWNER-ABLESUNG in der Vercel-Liste, 2026-10-02): `@supabase/ssr` 0.12.0 → 0.12.7 und
  `@supabase/supabase-js` 2.108.2 → 2.117.2, je als Preview-Deployment eines Dependabot-Branches;
  nicht gemergt. Von CC nicht gesehen (die PR-Liste liegt nicht im Repo, `gh` ist nicht
  installiert).
- EINORDNUNG: Beide sind Laufzeit-Pakete — Auth und Sitzung, in package.json unter
  `dependencies` (GELESEN AM CODE). Beide Zielfassungen liegen in den Bereichen von package.json
  (`^0.12.0`, `^2.108.2`; ABGELEITET). .github/dependabot.yml nimmt sie nicht aus — ausgenommen
  sind Major-Sprünge und vier exakt gepinnte Pakete (GELESEN AM CODE).
- AUFLAGE (ARCHITEKT, 2026-10-02): Merge nur als eigene Scheibe mit Live-Regression.
- TRIGGER (NACHGEZOGEN 2026-10-02, ARCHITEKT): eine eigene kleine Scheibe direkt nach K2b
  (Zuschnitt P13.7-36), nach dem Muster der Scheibe "Abhängigkeiten" (Zuschnitt P13.7-27) —
  ODER früher, falls Dependabot eine Sicherheitsmeldung zu einem der beiden Pakete erhebt.
  Vorher: "der nächste Zuschnitt nach K2a (Entscheidung P13.7-25)".
- → 2026-10-02: TRIGGER EINGETRETEN mit dem Abschluss von K2b (Vermerk P13.7-39); als nächste
  Scheibe gesetzt ("Noch nicht geschnittene Arbeit").
- → 2026-10-02: GESCHNITTEN als Scheibe "Supabase-Pakete" (Zuschnitt P13.7-43). Die PRs sind #22
  (ssr) und #26 (supabase-js); die Begründung "gebaut auf einem Stand vor 5567d14" ist dort
  richtiggestellt.

**Vorrat P13.7-30 — FRAGE ZU K9: LAUFEN PREVIEW-DEPLOYMENTS MIT DENSELBEN GEHEIMNISSEN UND
DERSELBEN DATENBANK WIE PRODUCTION?**
- ANLASS: Vermerk P13.7-28, Punkt (8) — Dependabot-Branches erzeugen Preview-Deployments.
- STAND: Am Repo NICHT ENTSCHEIDBAR. Welche Umgebungsvariablen Production und Preview tragen,
  steht in den Vercel-Einstellungen; nötig ist eine OWNER-ABLESUNG dort.
- WARUM ES ZÄHLT (ABGELEITET): Trägt Preview die Werte der Produktion für
  `SUPABASE_SERVICE_ROLE_KEY`, `SECRET_ENC_KEYS` oder `VERCEL_API_TOKEN`, läuft der Code jedes
  Dependabot-Branches — samt fremdem Paket-Code — mit den Geheimnissen der Produktion und gegen
  ihre Datenbank. Bezug: Befunde C3 und E2 des Vermerks P13.7-1.
- BEZUG: Kandidat K9 (Vermerk P13.7-1).
- KEIN TRIGGER GESETZT.

**Vorrat P13.7-32 — EIN RESERVIERTER `custom_host`, DER SCHON IN `domains` STEHT, WIRD WEITER
AUSGELIEFERT.**
- BEFUND (GELESEN AM CODE, CC, 2026-10-02, Code-Stand `92ec719`): Das Prädikat `isReservedHost`
  des Zuschnitts P13.7-31 greift in register, remove und status — nicht im Serve-Pfad. `GET`
  (src/app/app-serve/route.ts) liefert für einen Host, bei dem `extractLabel` null liefert, über
  `getPublishedHtmlByCustomHost` aus; der Apex der Serving-Domain fällt in diesen Pfad. Eine vor dem
  Deploy angelegte Zeile mit reserviertem `custom_host` wirkt damit fort (Befund B1, Folge (1), des
  Vermerks P13.7-1), wird aber in der App weder entfernbar noch prüfbar.
- HEUTE: Die Bestandsprobe supabase/checks/reservierte-hosts.sql vor dem Deploy (Zuschnitt
  P13.7-31, E3); ein Fund wird per SQL gelöscht, nie über "Entfernen" in der App.
- KANDIDAT: ein Riegel im Serve-Pfad (und im Relay, das ebenso verzweigt).
- TRIGGER (NACHGEZOGEN 2026-10-02, Zuschnitt P13.7-36): die Hebung am Phasenende 13.7. Grund:
  Seit K2a entsteht keine reservierte Zeile, und gemessen existiert keine (Vermerk P13.7-33).
  Vorher: "der Zuschnitt K2b".

**Vorrat P13.7-34 — ZWEI KOMMENTARKÖPFE IM DOMAIN-PFAD SIND UNGENAU.**
- BEFUND (GELESEN AM CODE, CC, 2026-10-02, Code-Stand `ed20fab`), beides schon vor K2a so:
  · src/lib/domains/normalize.ts, Kopfkommentar: "Laeuft VOR jedem weiteren Schritt der
    Add-Domain-Mutation (Ownership, Cap, Vercel-Call)". In `registerCustomDomain` läuft das
    Eigentums-Gate VOR `normalizeDomain`.
  · src/lib/vercel/client.ts, Kopfkommentar: "Der Aufrufer (lib/domains/register,
    lib/domains/status) sichert Autorisierung, Cap, Rate-Limit und Persistenz." `removeCustomDomain`
    (src/lib/domains/remove.ts) ruft `removeDomainFromVercel` und fehlt in der Aufzählung.
- HERKUNFT: Prüfung der Kommentarköpfe unberührter Dateien im Bau der Scheibe "K2a" (Vermerk
  P13.7-33); dort gemeldet, nicht geändert.
- TRIGGER: der nächste Eingriff in eine der beiden Dateien.
- → 2026-10-02: ZUR HÄLFTE ERLEDIGT. Der Kopfkommentar von src/lib/vercel/client.ts nennt seit
  `2a69571` "lib/domains/register, lib/domains/remove, lib/domains/status" (GELESEN AM CODE, CC,
  `git show 2a69571`). Offen bleibt src/lib/domains/normalize.ts.

**Vorrat P13.7-35 — DIE DOMAIN-VERWALTUNG GIBT BEI `already_registered_self` KEINE RÜCKMELDUNG.**
- BEFUND: Live N4 der Scheibe "K2a" (OWNER, 2026-10-02): Erneutes Hinzufügen von `thr-ty.com` im
  eigenen Projekt — das Feld leert sich, kein Text. Am Code (GELESEN AM CODE, CC, 2026-10-02):
  `registerCustomDomain` liefert `{ ok: true, status: "pending", healed: false }`; `handleAdd`
  (src/components/DomainManager.tsx) leert bei `res.ok` das Feld und lädt die Liste neu, ohne
  Meldung.
  → 2026-10-02: Seit `2a69571` lautet das Ergebnis `{ ok: true, status: "pending" }` — `healed`
  entfällt (Zuschnitt P13.7-36, D4). Der Befund bleibt.
- TRIGGER: das UI-Redesign.

**Vorrat P13.7-37 — B5: DER GRABSTEIN FÜR LABELS UND DOMAINS IST NICHT GEBAUT.**
- BEFUND: Vermerk P13.7-1, Befund B5; Vorrat P13.6-126 der Phase 13.6.
- AUS K2b AUSGENOMMEN (Zuschnitt P13.7-36): Dort kommt nur der Zufallsteil der Labels aus
  kryptografischem Zufall; die Wiedervergabe eines Labels ist damit praktisch unmöglich
  (Begründung des Zuschnitts).
- GRENZE DIESER BEGRÜNDUNG (ABGELEITET, CC, 2026-10-02, am Code `882367b`): Sie trägt für
  LABELS. Eine Custom-Domain hat keinen Zufallsteil — nach `removeCustomDomain`
  (src/lib/domains/remove.ts) ist sie weder in `domains` noch bei Vercel, und jedes Konto kann
  sie neu anlegen (`registerCustomDomain`); zeigt der DNS des Vorbesitzers noch auf uns, wird
  das neue Projekt dort ausgeliefert. Ob das zum Grabstein gehört, entscheidet die Hebung.
- TRIGGER: die Hebung am Phasenende 13.7.

**Vorrat P13.7-38 — WRITE-AHEAD: DIE `domains`-ZEILE VOR DEM VERCEL-AUFRUF ALS "ANGEFRAGT"
ANLEGEN.**
- ANLASS: Zuschnitt P13.7-36, (2), mit D1 — seit K2b kann sich ein Betreiber, der seine Zeile
  durch einen Fehler nach erfolgreichem Vercel-Aufruf verliert, nicht mehr selbst heilen.
- KANDIDAT (ARCHITEKT, 2026-10-02): `registerCustomDomain` legt die Zeile VOR dem Vercel-Aufruf
  als "angefragt" an. Dann trägt die Zeile selbst den Nachweis, dass DIESES Projekt die Domain
  angefragt hat; ein späteres 409 mit eigener projectId kann für genau dieses Projekt wieder
  heilen, ohne dass ein anderes Konto die Domain übernehmen kann.
- AM BESTAND (GELESEN AM CODE, CC, 2026-10-02): `verification_status` trägt seit Migration 0009
  einen CHECK auf `pending`, `verified`, `misconfigured` (oder NULL); ein eigener Wert
  "angefragt" verlangte eine Migration. Ob stattdessen ein bestehender Wert oder eine eigene
  Spalte trägt, entscheidet der Zuschnitt.
- TRIGGER: der erste Support-Fall eines ausgesperrten Betreibers, ODER das Wiedereinschalten der
  Registrierung (Vermerk P13.7-24).

**Vorrat P13.7-40 — DIE FEHLERMELDUNG DES EDITORS BLEIBT NACH ERFOLGREICHEM LÖSCHEN STEHEN UND
ERSCHEINT IM NÄCHSTEN PROJEKT.**
- BEFUND: Live L2 der Scheibe "K2b" (OWNER, 2026-10-02): Nach "Bitte entferne zuerst die
  verbundene Domain." und dem anschliessend erfolgreichen Löschen bleibt die Meldung stehen und
  erscheint im nächsten Projekt, bis neu geladen wird.
- AM CODE (GELESEN AM CODE, CC, 2026-10-02, Code-Stand `2a69571`): `handleDelete`
  (src/components/CodeImporter.tsx) setzt im Fehlerzweig `setSaveError` und `setSaveStatus`; der
  Erfolgszweig setzt beides nicht zurück. Dass die Meldung daher stammt, ist ABGELEITET.
- BEZUG: die Dauerregeln "AUFRÄUMEN AM ANFANG EINER SITZUNG, NICHT AN IHREM ENDE" und "ABLEITEN
  STATT LÖSCHEN" (docs/immer-beachten.md).
- TRIGGER: der nächste Eingriff in src/components/CodeImporter.tsx oder das UI-Redesign.

**Vorrat P13.7-42 — DIE KILL-SWITCH-BEFEHLE IN CLAUDE.md AUF EINE EINSETZSTELLE UMBAUEN, DANACH
ÜBEN.**
- BEFUND (GELESEN, CC, 2026-10-02): Jeder der drei Sperr-Befehle in CLAUDE.md ("KILL-SWITCH —
  SQL-RUNBOOK") trägt zwei Einsetzstellen — die Referenz (`<ref>` in `blocked_reason`) und das
  Ziel (`<PROJECT_UUID>`, `<LABEL>` oder `<HOST>`). Damit verstösst er gegen REGEL 1 von
  docs/ADMIN_RUNBOOK.md (höchstens EINE markierte Stelle); Szenario (iv) weist es aus.
- AUFTRAG (OWNER, 2026-10-02): auf EINE Einsetzstelle umbauen und danach live üben; die Befehle
  bleiben in CLAUDE.md (Entscheidung P13.7-41). Beide Fassungen des Manifests bleiben dabei
  deckungsgleich, wo der Status berührt ist.
- TRIGGER: der Zuschnitt K3 (Sperre je Konto; Kandidat K3 des Vermerks P13.7-1 — dort steht
  "das Runbook ergänzen").

**Vorrat P13.7-44 — `count ?? 0` IN DER CAP-ABFRAGE UND IN `countRecentAttempts` IST FAIL-OPEN.**
- BEFUND (GELESEN AM CODE, CC, 2026-10-02, Code-Stand `24516f2`): Die Cap-Abfrage in
  `registerCustomDomain` (src/lib/domains/register.ts, Schritt 5) vergleicht `(count ?? 0) >=
  CAP_PER_USER`; `countRecentAttempts` (src/lib/domains/audit.ts) gibt `count ?? 0` zurück, und
  daran hängt das Rate-Limit beim Hinzufügen und Entfernen. Liefert die Abfrage ohne Fehler kein
  `count`, wären Obergrenze und Rate-Limit ohne Signal aufgehoben (ABGELEITET). `deleteProject`
  (src/app/projects/actions.ts) ist in derselben Lage fail-closed: ohne Zahl verweigert es.
- HERKUNFT: Plan der Scheibe "Supabase-Pakete" (Zuschnitt P13.7-43), Nebenbefund NB-4.
- TRIGGER (ARCHITEKT, 2026-10-02): der nächste Eingriff in src/lib/domains/register.ts oder
  src/lib/domains/audit.ts, spätestens der Zuschnitt K1.

**Vorrat P13.7-45 — `setAll` VERWIRFT DIE CACHE-HEADER, DIE DER SUPABASE-LEITFADEN VERLANGT.**
- BEFUND (GELESEN AM CODE, CC, 2026-10-02, Code-Stand `24516f2`): `updateSession`
  (src/lib/supabase/middleware.ts) und `createClient` (src/lib/supabase/server.ts) deklarieren
  `setAll(cookiesToSet)` ohne den zweiten Parameter und übernehmen die Cache-Header nicht.
- GELESEN (2026-10-02, supabase.com/docs/guides/auth/server-side/creating-a-client, Next.js,
  Abschnitt "Hook up proxy"): `setAll(cookiesToSet, headers)`; wer eine andere Antwort zurückgibt,
  kopiert Cookies und die Header `cache-control`, `expires`, `pragma`. Die Typen von `@supabase/ssr`
  0.12.0 tragen den Parameter bereits (node_modules, `types.d.ts`); die Scheibe ändert daran nichts.
- BEZUG: Dauerregel "SET-COOKIE UND EINE ALS ÖFFENTLICH/CACHEBAR MARKIERTE ANTWORT VERTRAGEN SICH
  NICHT" (docs/immer-beachten.md). Ob eine Antwort mit Sitzungs-Cookie heute zwischengespeichert
  wird, ist NICHT GEMESSEN.
- HERKUNFT: Plan der Scheibe "Supabase-Pakete" (Zuschnitt P13.7-43), Nebenbefund NB-2.
- TRIGGER (ARCHITEKT, 2026-10-02): die Bewertung vor dem Wiedereinschalten der Registrierung
  (Vermerk P13.7-24); spätestens der nächste Zuschnitt nach der Scheibe "Supabase-Pakete".

**Vorrat P13.7-46 — DER LEITFADEN EMPFIEHLT IM PROXY `getClaims()` STATT `getUser()`.**
- GELESEN (2026-10-02, supabase.com/docs/guides/auth/server-side/creating-a-client, Next.js): Der
  Proxy erneuert das Auth-Token über `supabase.auth.getClaims()`. `updateSession`
  (src/lib/supabase/middleware.ts) ruft `getUser()` (GELESEN AM CODE, Code-Stand `24516f2`).
- BEZUG: Befund N12 des Vermerks P13.7-1, Vorrat P13.7-14 der Phase 13.7.
- HERKUNFT: Plan der Scheibe "Supabase-Pakete" (Zuschnitt P13.7-43), Nebenbefund NB-3.
- TRIGGER (ARCHITEKT, 2026-10-02): derselbe wie bei Vorrat P13.7-14 — dort steht keiner gesetzt;
  der Eintrag geht mit jenem.

**Vorrat P13.7-47 — VIER OFFENE DEPENDABOT-PRS FÜR ENTWICKLUNGS-PAKETE.**
- BEFUND (GEMESSEN, CC, 2026-10-02, `git ls-remote origin`): Branches und `merge`-Refs für #9
  (`@tailwindcss/postcss` 4.3.3), #11 (`tailwindcss` 4.3.3), #16 (`@testing-library/react` 16.3.3)
  und #23 (`@testing-library/dom` 10.4.2). Dass die vier offen sind, ist aus den `merge`-Refs
  ABGELEITET; die PR-Liste selbst ist nicht gelesen (`gh` nicht installiert).
- HERKUNFT: Plan der Scheibe "Supabase-Pakete" (Zuschnitt P13.7-43), Nebenbefund NB-1.
- TRIGGER (ARCHITEKT, 2026-10-02): die Hebung am Phasenende 13.7.
