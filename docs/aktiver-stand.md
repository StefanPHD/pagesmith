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

**Zuschnitt P13.7-31 — SCHEIBE "K2a": RESERVIERTE HOSTS UND `checkDomainStatus`. Doku-Runde,
2026-10-02, Code-Stand `92ec719`; der Bau folgt in eigener Runde.**
- GEGENSTAND: Befund B1 des Vermerks P13.7-1 (plattform-eigene Domains als Custom-Domain) und
  Vorrat P13.7-2 (`checkDomainStatus`). Bezeichnung "K2a": Entscheidung P13.7-25.
- DAS PRÄDIKAT: EIN reines Prädikat `isReservedHost` in src/lib/hosting/host.ts (reine Datei, kein
  "use server"). Abgleich an der LABEL-GRENZE: host == Eintrag ODER host endet auf "." + Eintrag.
  Eigene Normalisierung im Prädikat (Kleinschreibung, Punkte am Ende entfernt), weil remove und
  status den Host aus der Datenbank lesen, nicht aus `normalizeDomain`.
- QUELLE (E1, ARCHITEKTEN-ENTSCHEIDUNG 2026-10-02) — RICHTIGGESTELLT gegenüber dem ersten
  Zuschnitts-Entwurf, der "dieselben Env-abgeleiteten Serving-Suffixe und App-Hosts, die
  Proxy/Host-Logik schon nutzen — kein drittes Urteil" verlangte:
  · DER BEFUND, DER ES ERZWANG (GELESEN AM CODE, CC, 2026-10-02): Die App-Hosts des Proxys sind
    NICHT aus der Env abgeleitet — `APP_HOSTS` (src/lib/hosting/host.ts) ist eine fest codierte
    Menge (`pagesmith.app` als Platzhalter, `www.pagesmith.app`, `localhost`, `127.0.0.1`);
    `isAppHost` prüft sie mit EXAKTER Gleichheit plus `endsWith(".vercel.app")`. Aus der Env kommt
    allein `servingSuffixes()` (`NEXT_PUBLIC_HOSTING_DOMAIN` plus das feste `.lvh.me`; nicht
    exportiert). Ein ZWEITES, env-abgeleitetes Urteil besteht bereits: `ownFormTargetDomains` mit
    `isOwnHost` (src/lib/form-target.ts) — der Proxy nutzt es nicht.
  · DIE ENTSCHEIDUNG: Option (a). `isReservedHost` liest `servingSuffixes()`, `APP_HOSTS` und
    `PLATFORM_SUFFIXES = ["vercel.app"]`. `isAppHost` wird NICHT wörtlich wiederverwendet — die
    Label-Grenze reserviert auch Subdomains der App-Hosts, `isAppHost` prüft sie exakt.
    `ownFormTargetDomains` bleibt unberührt; die Abweichung beider Urteile ist der offene Punkt
    "isAppHost-PLATZHALTER" (Ergänzung vom 2026-09-28; Vorrat P13-39 der Phase 13).
  · `vercel.app` gehört dazu, weil unsere Deployment- und Alias-Adressen dort liegen; weitere
    Plattform-Suffixe (`vercel.dev`, `now.sh`, `vercel-dns.com`) sind weder gelesen noch gemessen
    und kommen nicht auf Verdacht hinein — an ihre Stelle tritt E3.
- LEERE ENV (E2, ARCHITEKTEN-ENTSCHEIDUNG 2026-10-02): FAIL-CLOSED. Fehlt
  `NEXT_PUBLIC_HOSTING_DOMAIN`, gilt JEDER Host als reserviert; der Server loggt das in eigenem
  Vokabular; der Client sieht den neutralen Ablehnungstext.
- ANSATZSTELLEN (GELESEN AM CODE, CC, 2026-10-02). Vercel wird im Domain-Pfad an genau drei Stellen
  gerufen (GEMESSEN AM REPO, Suche nach Importen von `@/lib/vercel/client`): `addDomainToVercel`
  (register.ts), `removeDomainFromVercel` (remove.ts), `getDomainConfig` (status.ts).
  · `registerCustomDomain`: Prüfung nach `normalizeDomain`, auf dessen Ergebnis, und VOR dem
    lokalen Kollisionscheck — sonst meldet eine bestehende reservierte Zeile desselben Projekts
    `already_registered_self` als Erfolg. Damit vor jedem Vercel-Aufruf.
  · `removeCustomDomain`: Prüfung nach dem Eigentums-Gate und der `custom_host`-Prüfung, vor
    Rate-Limit und Vercel-DELETE. Ein reservierter Host wird NIE an Vercel gegeben, auch wenn eine
    Zeile existiert; die Zeile BLEIBT stehen.
  · `checkDomainStatus`: Prüfung nach dem Eigentums-Gate, vor der Cache-Bremse; Antwort wie bei
    einer unbekannten Domain.
  · Je Aufruf weiter genau EIN Audit-Eintrag; neues Ergebnis `rejected_reserved_host`.
  · NICHT berührt: `assignDomainLabel` (ruft Vercel nicht, legt nur Label-Zeilen unter dem
    Serving-Suffix an) und `normalizeDomain` (remove und status laufen nicht durch sie).
- SERVE-PFAD (GELESEN AM CODE, CC, 2026-10-02): `GET` (src/app/app-serve/route.ts) fragt zuerst
  `extractLabel`; nur wenn es null liefert, gilt der `custom_host`-Lookup — das LABEL GEWINNT.
  `resolve-relay.ts` verzweigt ebenso. Der Apex der Serving-Domain und verschachtelte Namen
  (`a.b.<Serving-Domain>`) liefern bei `extractLabel` null und gehen in den `custom_host`-Pfad.
  DAHER wird der GANZE TEILBAUM der Serving-Domain reserviert, nicht nur der Apex. Eine
  `custom_host`-Zeile "<Label eines anderen>.<Serving-Domain>" würde nie ausgeliefert, löste aber
  Vercel-Aufrufe aus (Vercels Antwort dafür UNGEMESSEN, Punkt U2).
- `checkDomainStatus` (Vorrat P13.7-2): Update mit `.select("label")`; kein Treffer → Fehler
  (Dauerregel "EIN SCHREIBWEG ÜBER DEN ADMIN-CLIENT …", Punkt (3)). Kein `error.message` und kein
  `e.message` an den Client — heute gehen dorthin der Lesefehler, der Update-Fehler und der Wurf
  im `catch` (GELESEN AM CODE); DomainManager zeigt sie nicht an, die Antwort der Server-Action
  trägt sie dennoch.
- SUPABASE-LESUNG (2026-10-02, https://supabase.com/docs/reference/javascript/update):
  · WÖRTLICH: "By default, updated rows are not returned. To return it, chain the call with
    `.select()` after filters."
  · NUR IN DER ZUSAMMENFASSUNG DES ABRUFWERKZEUGS, NICHT WÖRTLICH: Ohne Treffer endet der Aufruf
    ohne Fehler, `data` ist leer; zum Zurückgeben braucht es eine RLS-SELECT-Policy.
  · FOLGE: Prüfung auf leeres `data`. Der Policy-Hinweis greift beim Admin-Client nicht, weil
    service_role RLS umgeht (ABGELEITET). Vorbild im Repo: `refreshAccessToken`
    (src/lib/oauth/token-refresh.ts), `.update(…).select("secret_version")`.
- MELDUNGSTEXT der Ablehnung: neutral, behauptet weder Ursache noch Ergebnis über Vercel.
- BEDINGUNG VOR DEM DEPLOY (E3, ARCHITEKTEN-ENTSCHEIDUNG 2026-10-02): Jede Domain am
  Vercel-Projekt ist ENTWEDER vom Prädikat erfasst ODER durch genau eine `domains`-Zeile
  (`custom_host`) gedeckt. OWNER-ABLESUNG Vercel, 2026-10-02: `thr-ty.com`, `*.publayer.net`,
  `publayer.net`, `pagesmith-delta.vercel.app`. `thr-ty.com` ist vom Prädikat NICHT erfasst;
  seine Deckung durch eine Zeile misst der Owner (Stand dieses Eintrags: ausstehend). Dass die
  beiden publayer-Einträge erfasst sind, setzt `NEXT_PUBLIC_HOSTING_DOMAIN = publayer.net` in
  Production voraus — von CC nicht gemessen. Dazu die Bestandsprobe
  supabase/checks/reservierte-hosts.sql: kein reservierter `custom_host` in `domains` (Vorrat
  P13.7-32).
- NICHT IN DIESER SCHEIBE (K2b): B2, B5, F5 und der Heal-Pfad bei 409 mit eigener projectId.
- BINDENDE LIVE-AUFLAGE: Live NIE mit dem Apex der Serving-Domain, einem App-Host oder einer am
  Vercel-Projekt hängenden Domain testen. Probe nur mit einer nicht vergebenen Subdomain unter der
  Serving-Domain. Entsteht trotzdem eine `domains`-Zeile: per SQL löschen, NIE über "Entfernen" in
  der App.

---

## Noch nicht geschnittene Arbeit

Der Zuschnitt der übrigen Phase steht aus; ihn entscheidet der Architekt. Abgeschlossen ist seit
dem 2026-10-02 die Scheibe "Abhängigkeiten" (Vermerk P13.7-28); als nächste steht nach
Entscheidung P13.7-25 "K2a" an, zugeschnitten in Zuschnitt P13.7-31. Die Kandidaten stehen im
Vermerk P13.7-1, Punkt (4); der Vorrat darunter.

---

## Vorrat (gemeldet, nicht gebaut)

**Vorrat P13.7-2 — `checkDomainStatus` MELDET EIN UPDATE OHNE TREFFER ALS ERFOLG UND GIBT
FEHLERTEXT AN DEN CLIENT.**
- BEFUND (GELESEN AM CODE, `c18fd55`): `checkDomainStatus` (src/lib/domains/status.ts, gerufen
  über `checkDomainStatusAction`) aktualisiert `domains` (`dns_config`, `verification_status`,
  `vercel_synced_at`) mit `.eq("label", domainLabel)` ohne `.select` — ein Update ohne Treffer
  meldet Erfolg. Verstoss gegen Punkt (3) der Dauerregel "EIN SCHREIBWEG ÜBER DEN ADMIN-CLIENT
  SCHREIBT ERST NACH DEM EIGENTUMS-GATE …". Punkte (1) (Eigentum per `user_id`-Vergleich vor dem
  Schreiben) und (2) (Filter auf das `label` der geprüften Zeile) sind eingehalten; (4) betrifft
  die Funktion nicht.
- DAZU: Bei einem Datenbank-Fehler und im `catch` gibt sie `error.message` bzw. `e.message` als
  `error` an den Client zurück; `registerCustomDomain` und `removeCustomDomain` tun das nicht.
- BEZUG: Kandidat K2 (Vermerk P13.7-1) berührt dieselbe Datei.
- HERKUNFT: Vermerk P13.7-1, Auftrag 3 (b) der ersten Aufklärung (Positivkontrolle des Auftrags).
- KEIN TRIGGER GESETZT.

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
- TRIGGER: der nächste Zuschnitt nach K2a (Entscheidung P13.7-25), ODER früher, falls Dependabot
  eine Sicherheitsmeldung zu einem der beiden Pakete erhebt.

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
- TRIGGER: der Zuschnitt K2b.
