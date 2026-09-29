# Phase 13.6 — Formular-Relay (Lead-Relay): DER AKTIVE STAND

**PFLICHT-GATE:** Diese Datei ist ab ihrer Anlage (2026-09-29) das Pflicht-Gate ("Auftrag 0")
jedes Bau- und Aufklärungs-Prompts der Phase 13.6 (CLAUDE.md, "## Aktiver Stand — Verfahren ab
Phase 10"). Verfahren: docs/arbeitsweise.md, "Die Standdatei".

**GEGENSTAND:** Roadmap-Zeile 13.6 (docs/roadmap.md). Richtung, Grund, "NICHT ENTSCHIEDEN",
Fahrplan-Entwurf, Einordnung und Prüfliste stehen dort und werden hier NICHT abgeschrieben.
UNVERÄNDERT IN KRAFT, bis der Owner die Datenklassen-Regel neu fasst: Entscheidungen P13-2 und
P13-7 der Phase 13 (Archiv docs/claude-history/phase-13-formular-ziel.md). Diese Datei ändert
keine von beiden.
NACHGETRAGEN 2026-09-29: Für den RELAY-WEG ist die Datenklassen-Regel neu gefasst
(Owner-Entscheidung P13.6-16); für den Datensparmodus gelten P13-2 und P13-7 weiter.

**NUMMERN:** eine durchlaufende Reihe `P13.6-n` über alle Gattungen, Gattung vorn (Vermerk
P13.6-1, Owner-Angabe P13.6-2, Setzung P13.6-3 …). Nummern sind stabil und werden nie neu
vergeben; ein neuer Eintrag tritt hinten an. Wer auf einen Eintrag zeigt, nennt die PHASE 13.6
mit ("Vorrat P13.6-7 der Phase 13.6"), nicht nur den Pfad dieser Datei.

**ZWEI KLASSEN VON FESTLEGUNGEN, GETRENNT GEFÜHRT:** OWNER-ENTSCHEIDUNG bzw. OWNER-ANGABE
(bindend) und ARCHITEKTEN-SETZUNG (revidierbar). Eine Setzung trägt je Grund und Grenze.

**FORM:** nur harte Angaben, je mit Fundstelle (Symbolname oder wörtlicher Anker, keine
Zeilennummer) und Provenienz. KLASSEN: GELESEN AM CODE = am Repo gelesen, nicht live gemessen ·
GEMESSEN AM REPO = mit einem Werkzeug am Repo erhoben (Suche, git-Verlauf) · ABGELEITET = aus
Code oder Spezifikation geschlossen, nicht gemessen · NICHT ENTSCHEIDBAR = am Repo nicht zu
beantworten.

## Abschnitte der Standdatei 13.6

- Aufklärung A1 zur Phase 13.6 vom 2026-09-29
- Aufklärung A2 zur Phase 13.6 vom 2026-09-29
- Owner-Angaben zur Phase 13.6 vom 2026-09-29
- Architekten-Setzungen zur Phase 13.6 vom 2026-09-29
- Zuschnitt Scheibe 13.6-1
- Zuschnitt Scheibe 13.6-2
- Noch nicht geschnittene Arbeit
- Vorrat (gemeldet, nicht gebaut)

## Aufklärung A1 zur Phase 13.6 vom 2026-09-29

**Vermerk P13.6-1 — erste Aufklärung der Phase 13.6, A1: personenbezogene Daten heute,
Andockstelle eines Relay-Endpunkts, Lead-Ereignis (KEIN BAU, daher kein Bau-Commit: die
Aufklärung war read-only und hat keine Zeile Code und keine Datei im Repo erzeugt; CC,
2026-09-29, HEAD `a3797d9`).** Jede Angabe unten ist GELESEN AM CODE am Stand `a3797d9`, soweit
nicht anders gekennzeichnet. KEIN BEFUND DIESES VERMERKS IST LIVE GEMESSEN.

(1) WAS DER INGEST ANNIMMT (`handleIngest`, src/lib/capi/ingest.ts).
    · Aus dem Rumpf: `trackingKey`, `eventID`, `event`, `value`, `currency`, `isCustom`,
      `eventSourceUrl` (= `location.href`, gesetzt in `buildCapiBeaconStatement`,
      src/lib/tracking/meta.ts), `_fbp` (im BROWSER aus dem Cookie gelesen, ebenda), das
      Einwilligungs-Feld `cns` (`CONSENT_WIRE_FIELD`, src/lib/tracking/consent-wire.ts) und der
      Bestätigungs-Marker `obs`.
    · Aus Request-Köpfen: die IP über `x-vercel-forwarded-for`, sonst `x-real-ip`, nie
      `x-forwarded-for` (`resolveClientIp`); der User-Agent aus `user-agent`; der Kopf `cookie`
      nur bei aktivem A/B-Test (`parseVariantCookie`). IP und User-Agent werden NUR innerhalb der
      Forward-Bedingung gelesen (forwardbares Ereignis und mindestens ein erlaubtes Ziel).
    · Ein Referer wird nicht gelesen (GEMESSEN AM REPO: Suche `referer|referrer` über
      src/lib/capi/, 0 Treffer).
    · `fbc` ist kein Cookie: `forwardToMeta` (src/lib/capi/meta-forward.ts) bildet es
      serverseitig aus einem `fbclid` in der Adresse.
    · Der PageView trägt nur `{trackingKey, eventID, event}` (`buildPageViewScript`,
      src/lib/analytics/pageview-emitter.ts) und ist nicht forwardbar (`isForwardable`).

(2) WAS JE ZIEL UNSEREN SERVER VERLÄSST — die Ziele aus `FORWARDER_BY_TARGET`
    (src/lib/capi/ingest.ts). ALLES IM KLARTEXT; KEIN ADAPTER HASHT.

| Ziel | IP | User-Agent | Seitenadresse | Klick-Kennung | `_fbp` | IP eingeführt (Commit, Datum) |
|---|---|---|---|---|---|---|
| meta | `client_ip_address`, falls vorhanden | `client_user_agent` | `event_source_url` (fremde Kennungen entfernt) | `fbc` aus `fbclid` | ja | `bf87545`, 2026-07-03 |
| pinterest | `client_ip_address`, nur als PAAR mit dem User-Agent, sonst kein Versand | ja | `event_source_url` | `user_data.click_id` = `epik` | nein | Adapter `b82fa77`, verdrahtet `a6deeb7`, 2026-08-10 |
| tiktok | `user.ip`, nur als PAAR | `user.user_agent` | `page.url` | `user.ttclid` | nein | `86e6911`, 2026-08-11 |
| linkedin | `userIds` mit `PLAINTEXT_IP_ADDRESS`, nur IPv4 | nein | nein (nur `li_fat_id` daraus gelesen) | `li_fat_id` | nein | `a4e680c`, 2026-08-19 |
| google | `landingPageDeviceInfo.ipAddress`, nur wenn eine Google-Klick-Kennung vorliegt | ja, ebenso | nein | `gclid`/`gbraid`/`wbraid` | nein | `883993d`, 2026-09-24 (Transport seit `26caa38`, 2026-09-01) |

    Fundstellen: `forwardToMeta`, `forwardToPinterest`, `forwardToTiktok`, `forwardToLinkedin`,
    `forwardToGoogle` in den gleichnamigen Dateien unter src/lib/capi/.
    Die Commit-Spalte ist GEMESSEN AM REPO (`git log -S` je Adapter bzw. je Verdrahtung in
    ingest.ts). EIN COMMIT-DATUM IST KEIN DEPLOY-DATUM; die Deploys sind nicht erhoben.
    ABWEICHUNG VON DER ÜBERGABE: "seit 2026-08-19 an alle vier" deckt sich mit den
    Commit-Daten von meta, pinterest, tiktok und linkedin; heute sind es FÜNF Ziele — google
    erhält die IP seit `883993d`.

(3) KEIN HASH-HELFER IM CODE (GEMESSEN AM REPO, CC, 2026-09-29): `createHash`,
    `subtle.digest`, `subtle`, `sha256`, `SHA-256`, `createHmac` je 0 Treffer über src/
    ausserhalb der Tests; Positivkontrolle `randomUUID` 3 Dateien. Kein Adapter sendet eine
    gehashte E-Mail oder Telefonnummer; der Kommentar in `forwardToPinterest` sagt es
    ausdrücklich ("Wir haben weder em noch hashed_maids").

(4) WAS PERSISTIERT UND WAS GELOGGT WIRD.
    · `persistEvent` (src/lib/analytics/persist.ts) schreibt `project_id`, `event_type` (auf 64
      Zeichen gekappt), `event_id`, `source`, `variant` — keine IP, kein User-Agent, keine
      Adresse, keine Kennung.
    · Keine Logzeile auf dem Ingest-Pfad trägt IP, User-Agent, Adresse, `_fbp`, eine
      Klick-Kennung oder einen Rumpfwert: `scheduleAfter`, `schedulePersist`, der
      Refresh-Zweig in `handleIngest` (Label und `errorName`), `persistEvent` (Fehlercode,
      `errorName`), der Resolver in src/lib/capi/token.ts (`{target, reason}`), je Adapter
      Status-, Skip- und Erfolgszeilen. Mit `projectId` loggen src/lib/oauth/refresh-run.ts und
      src/lib/oauth/token-refresh.ts.
    · Fremdtext aus der Anbieter-Antwort: meta, tiktok und linkedin über `redactOpaque`
      (src/lib/redact.ts), pinterest über `sanitizeProviderText` (nicht gelesen, s. Vorrat
      P13.6-10), google liest den Rumpf nicht.
    · NICHT ENTSCHEIDBAR: ob ein Anbieter eine gesendete IP, einen User-Agent oder eine Adresse
      in seinen Fehlertext zurückspiegelt und die Schwärzung nach Form das fängt; was die
      Plattform-Logs von Vercel ablegen.

(5) DIE ANDOCKSTELLEN EINES RELAY-ENDPUNKTS.
    · SERVING-HOST (Label und Custom-Domain): Die Ausnahme-Liste in `proxy` (src/proxy.ts) ist
      EXAKT — `path === "/api/e" || path === "/api/capi"`. Jeder andere Pfad wird auf
      `/app-serve` umgeschrieben; die Serve-Route (src/app/app-serve/route.ts) exportiert nur
      `GET`. Ein `POST /api/<neu>` erreicht damit keine eigene Route; die Antwort 405 ist
      ABGELEITET, nicht gemessen. Für eine eigene Route muss diese Liste erweitert werden.
    · APP-HOST (`isAppHost`, src/lib/hosting/host.ts: die Menge `APP_HOSTS` oder
      `*.vercel.app`): `updateSession` (src/lib/supabase/middleware.ts). `isPublicRoute` ist
      `/login`, `startsWith("/api/capi")` (PRÄFIX) oder `/api/e` (exakt). Ein neuer Pfad ohne
      Sitzung wird auf `/login` umgeleitet — der offene Punkt "DIE MIDDLEWARE LEITET API-ROUTEN
      AUF EINE HTML-SEITE UM" (docs/offene-punkte.md). Ein Besucher hat nie eine Sitzung; der
      Pfad müsste in `isPublicRoute`.

(6) EXPORTIERTE, FREMD GEHOSTETE SEITEN.
    · Sie beaconen ABSOLUT an `${NEXT_PUBLIC_APP_URL}/api/e` (`getCapiProxyUrl`,
      src/lib/capi/proxy.ts; `buildExportDocument` in src/components/CodeImporter.tsx);
      gehostete Seiten RELATIV an `/api/e` (Veröffentlichungspfad in CodeImporter.tsx).
    · Die CORS-Köpfe des Ingest (`CORS_HEADERS`, src/lib/capi/ingest.ts):
      `Access-Control-Allow-Origin: *`, Methoden `POST, OPTIONS`, Kopf `Content-Type`.
    · ABGELEITET: Soll eine exportierte Seite die Antwort eines Relay-Aufrufs LESEN, braucht die
      Antwort einen CORS-Kopf und der Aufruf darf nicht `no-cors` sein; mit einem einfachen
      Content-Type entfällt der Preflight, JSON verlangt einen `OPTIONS`-Handler. Eine gehostete
      Seite ruft same-origin.
    · DER BESTAND STEHT EINEM RELAY AUF DEM EIGENEN HOST ENTGEGEN: `formTargetProblem`
      (src/lib/form-target.ts) verweigert eigene Hosts (Setzung P13-29 der Phase 13), und die
      Laufzeit-Wache in `buildFormTargetRuntime` verweigert eine Zieladresse auf dem Ursprung
      der Seite (Wächter G3 in src/lib/form-target.test.ts).

(7) DIE KONFIGURATION EINES FORMULAR-ZIELS UND WAS EIN BETRIEBSART-FELD BERÜHRT.
    · Ort: ein Mapping `{elementId, type: "formTarget", config: FormTargetConfig}` mit
      `endpoint`, `thanksUrl`, `fieldNames?` (src/lib/mappings.ts), gespeichert in
      `projects.mappings` bzw. `projects.mappings_b` (jsonb; `ProjectRow`,
      src/app/projects/actions.ts) — NICHT im Einstellungs-Blob.
    · `configEqual` hinter `mappingsEqual` (src/lib/mappings.ts) zählt im formTarget-Zweig die
      Felder einzeln auf; ohne neuen Term wäre ein reiner Wechsel der Betriebsart nicht dirty
      und ginge beim Speichern still verloren.
    · `settingsEqual` (src/lib/settings.ts) wird nur berührt, wenn die Betriebsart projektweit
      in `settings` läge.
    · FEHLENDER LESER: `formTargetProblem` meldet "shape" nur für `endpoint` und `thanksUrl`;
      ein unbekannter Wert der Betriebsart fiele dort durch (Dauerregel "EIN UNBEKANNTER
      KONFIGURATIONSWERT BRICHT LAUT AB …").
    · AUSGELIEFERTER DATENBLOCK: `generateFunctional` (src/lib/generate.ts) entfernt aus der
      Konfiguration nur `fieldNames`; ein neues Feld ginge standardmässig in den
      ausgelieferten Text.
    · JE VARIANTE: Es gibt zwei Mapping-Sätze; die Betriebsart läge je Variante.

(8) DIE eventID UND DAS PAAR SERVER + BROWSER.
    · Die eventID entsteht im BROWSER, in `__psMetaFire` (Text aus `buildMetaRuntime`,
      src/lib/tracking/meta.ts): `crypto.randomUUID()`, sonst eine Ersatzform — einmal je
      Auslösung, geteilt von `fbq(…, {eventID})` und dem Beacon.
    · Der Formular-Track feuert erst in `onReached`, also bei `r.type === "opaque"`, einmal je
      Formular und Seitenleben (`buildWiringScript`, src/lib/generate.ts; Setzung P13-26 der
      Phase 13).
    · Das Paar: der Beacon mit der eventID an `/api/e` (persistiert als `source='server'`,
      ausgeleitet) · `fbq` mit derselben eventID an das Meta-Pixel · die Pixel-Bestätigung
      (`obs`) mit derselben eventID, persistiert als `source='browser'`, OHNE Weiterleitung
      (Bestätigungs-Zweig in `handleIngest`).

(9) WO DAS EINWILLIGUNGS-URTEIL SITZT.
    · Im BROWSER: `__psConsent` bzw. `__psConsentAll` in `__psMetaFire`; ohne Zustimmung
      entsteht kein Beacon.
    · Im INGEST: `allowedTargets` (src/lib/capi/ingest.ts) liest `cns` aus dem Rumpf.
    · BEI FEHLENDEM `cns` (`wireAbsent`) passiert NUR das Ziel mit `LEGACY_CONSENT_ROLE`
      (src/lib/tracking/consent-targets.ts) — heute meta; alle übrigen sind gesperrt. Ein
      serverseitig erzeugtes Ereignis ohne dieses Feld ginge also an meta, ohne dass der
      Besucher gefragt wurde (ABGELEITET).
    · Setzung P13-8 der Phase 13 (kein Einwilligungs-Tor für das Abschicken an die
      Betreiber-Adresse) deckt den Transit, nicht ein daraus abgeleitetes Tracking-Ereignis.

(10) DEDUP-KANDIDATEN FÜR EIN RELAY-EREIGNIS — KANDIDATEN, KEINE AUSWAHL (ABGELEITET).
    · K1: Der Browser erzeugt die eventID VOR dem Relay-Aufruf und schickt sie mit; Server und
      `fbq` tragen dieselbe. Heute entsteht sie erst nach "erreicht".
    · K2: Das Relay-Ereignis ERSETZT den `/api/e`-Beacon desselben Absendens — sonst zwei
      Server-Ereignisse mit derselben eventID und zwei `source='server'`-Zeilen, und die
      Verlustrate paart über die eventID.
    · K3: Der Ereignisname stimmt mit dem `fbq`-Namen überein. Ob der Anbieter über eventID
      plus Name dedupliziert, ist eine FRAGE AN DIE ZIEL-BEFUNDE.
    · GRENZE: Für pinterest, tiktok, linkedin und google gibt es kein Browser-Ereignis von uns;
      das Custom-Pixel sieht die eventID nicht (Kommentar an der Ereigniszeile in
      src/lib/tracking/custom-pixel.ts: "sie sieht also weder `cfg` noch `eid`"). google und linkedin nehmen die eventID als
      `transactionId` bzw. `eventId`; was sie damit tun, ist eine FRAGE AN DIE ZIEL-BEFUNDE.

(11) DIE PRÜFLISTE DER ROADMAP-ZEILE 13.6 — WAS EIN WEG ÜBER UNSEREN SERVER BRÄCHE (ABGELEITET).
    · GRENZE DER SETZUNG P13-6 DER PHASE 13: Liegt für einen nativen Anbieter ein
      Kunden-API-Schlüssel bei uns, ist er ein Geheimnis; er gehört in die Geheimnis-Ablage, und
      mehrere Empfänger desselben Typs je Projekt träfen die Eindeutigkeit (project_id, target).
      Eine blosse Webhook-Adresse bliebe öffentlich, stünde im Relay aber nicht mehr im
      ausgelieferten Text.
    · INVARIANTE I1 DER PHASE 13: "nie in unsere Logs" bräche schon dadurch, dass der Klartext
      durch unsere Funktion läuft, nicht erst durch eine Zeile unseres Codes; "nie an `/api/e`"
      bräche, sobald das Relay den Ingest-Pfad teilt. Test F1 und die Laufzeit-Wache G1–G6
      (G3: eigener Ursprung) würden rot bzw. wären neu zu fassen.
    · SETZUNG P13-49 DER PHASE 13: Sie bleibt wörtlich wahr, solange nur Namen gespeichert
      werden; die Werte unter diesen Namen passieren aber unseren Server. Der Bezug auf P13-7
      ("nie in unsere Datenbank") trägt dann allein auf dem Versprechen "Transit ohne
      Speicherung", und das ist keine Garantie des Codes — Plattform-Logs und Fehlerpfade
      liegen ausserhalb.

(12) EINE BERICHTIGUNG DES A1-BERICHTS (CC, 2026-09-29, beim Anlegen dieser Datei): Der Bericht
    sagte zu B-1, Custom-Domains und `vercel.app` kämen "im Archiv nicht vor". Das galt dem
    ARCHIV der Phase 13; im BESTAND steht seit dem 2026-09-28 am offenen Punkt
    "isAppHost-PLATZHALTER" (docs/offene-punkte.md, Ergänzung vom 2026-09-28), dass
    `ownFormTargetDomains` die Menge hinter `isAppHost` samt `*.vercel.app` nicht liest. Neu an
    B-1 sind die Lesung gegen P13-7 und der Teil über Custom-Domains (Vorrat P13.6-6).

## Aufklärung A2 zur Phase 13.6 vom 2026-09-29

**Vermerk P13.6-19 — Aufklärung A2 der Phase 13.6: Sicherheits-Infrastruktur, Datenbank,
Geheimnisse (KEIN BAU, daher kein Bau-Commit: die Aufklärung war read-only und hat keine Zeile
Code und keine Datei im Repo erzeugt; CC, 2026-09-29, HEAD `6f8ef1a`).** Jede Angabe ist
GELESEN AM CODE am Stand `6f8ef1a`, soweit nicht anders gekennzeichnet. KEIN BEFUND DIESES
VERMERKS IST LIVE GEMESSEN. Geladen waren docs/db-stand.md und docs/db-regeln.md vollständig,
aus docs/plattform-befunde.md die Abschnitte Supabase und Vercel vollständig. Die Supabase-Doku
selbst ist in A2 NICHT gelesen worden; jede Anbieter-Angabe unten stammt aus den datierten
Läufen jener Datei und gilt für einen Bau als UNGEPRÜFT (docs/db-regeln.md, vierte Regel).

(1) RATENBEGRENZUNG UND BOT-SCHUTZ.
    · Die EINZIGE Ratenbegrenzung: `countRecentAttempts` (src/lib/domains/audit.ts) zählt
      `audit_logs` je `user_id` und `action` im Fenster von 1 Stunde; genutzt in
      src/lib/domains/register.ts (`RATE_LIMIT_PER_HOUR = 5`, action `domain_add_attempt`),
      fail-closed bei DB-Fehler. Die Zählgrundlage ist der angemeldete Nutzer.
    · `handleIngest` (`/api/e`, `/api/capi`) trägt KEINE Begrenzung (GEMESSEN AM REPO: Suche
      `rate.?limit|audit_logs|RATE_LIMIT` ausserhalb der Tests trifft nur src/lib/domains).
    · KEIN Bot-Schutz (GEMESSEN AM REPO: `honeypot|captcha|turnstile|recaptcha|hcaptcha`
      0 Treffer ausserhalb der Tests).

(2) DIE VERÖFFENTLICHTE FASSUNG. `publishProject` (src/app/projects/actions.ts) schreibt
    `projects.published_content` = `{ html, mappings, settings, publishedAt }`, bei Variante B
    zusätzlich `variantB: { html, mappings }`. Die formTarget-Konfiguration (`endpoint`,
    `thanksUrl`, `fieldNames`) ist dort als JSON lesbar, getrennt vom HTML und je Variante.
    · `formTargetProblem` und `formTargetNamesProblem` laufen in `publishProject` über
      `alleMappings` (A und B), im Editor als Export-Riegel und im `ActionPanel`.
    · `saveProject` schreibt `mappings` UNGEPRÜFT — kein `formTargetProblem` im Speicherpfad.
    · Der Export (`handleExportDownload`, src/components/CodeImporter.tsx) baut die Datei aus
      dem Editor-Zustand und ruft keinen Server; für einen Export gibt es KEINE serverseitige
      Fassung.

(3) ZUORDNUNG UND KILL-SWITCH.
    · Der Ingest ordnet über `getCapiConfigByTrackingKey` (src/lib/capi/token.ts) zu:
      `projects` über `tracking_key`.
    · KANDIDAT (ABGELEITET) für ein Relay: trackingKey plus die Formular-Kennung
      (`data-pagesmith-id`, die `buildWiringScript` schon liest) als Schlüssel in
      `published_content.mappings`. Bei A/B ist der Mapping-Satz offen: der Varianten-Cookie
      existiert nur auf gehosteten Seiten und wird nur bei aktivem Test gelesen
      (`parseVariantCookie`).
    · `blocked_at`: die Serve-Route (`resolvePublished`, src/lib/hosting/resolve.ts) prüft
      `domains.blocked_at` UND `projects.blocked_at`; der Ingest prüft nur
      `projects.blocked_at` (im Resolver), mit eigenem Zweig vor Persist und Forward.
    · SPANNUNG, ABGELEITET: Die 204-für-alles-Antwort des Ingest verbirgt den Zustand eines
      Schlüssels (Dauerregel "INGEST-204-CONTAINMENT"); ein Relay, das dem Besucher einen
      Fehler zeigt, gibt zwangsläufig Zustand preis. Setzung P13.6-21 regelt sie
      (revidierbar).

(4) SERVERSEITIGE AUFRUFE (SSRF-ACHSE).
    · Zehn Server-Aufrufe: fünf Adapter, zwei OAuth (src/lib/oauth/google-token.ts,
      google-refresh.ts), drei in src/lib/vercel/client.ts. ALLE HOSTS SIND KONSTANTEN; kein
      Servercode ruft eine vom Client gelieferte Adresse auf.
    · KEIN `fetch` setzt `redirect:` (GEMESSEN AM REPO, 0 Treffer); es gilt der Standard der
      Fetch-Spezifikation (Weiterleitungen folgen) — ABGELEITET aus der Spezifikation, nicht
      gelesen, nicht gemessen.
    · KEINE Prüfung auf private Adressbereiche, Loopback oder Metadaten-Dienste (GEMESSEN AM
      REPO: `169.254|isPrivate|192.168|::ffff|dns.lookup` 0 Treffer). `isLoopbackOrEmpty`
      (src/lib/capi/ingest.ts) prüft allein die Besucher-IP.
    · `formTargetProblem` schützt heute nur einen Aufruf im BROWSER.
    · Die Meta-Pixel-ID steht unkodiert im Graph-Pfad — das trägt bereits
      docs/claude-history/backlog-polish.md, Eintrag "DER ERSTE ADAPTER SETZT DIE KENNUNG OHNE
      KODIERUNG IN DEN PFAD"; hier nur der Zeiger.

(5) project_secrets — AUS docs/db-stand.md; DAS IST EIN DOKUMENT UND KEINE HEUTIGE MESSUNG.
    Messdaten je Angabe:
    · Spalten: `project_id` (nullbar), `target`, `secret`, `created_at`, `updated_at`,
      `secret_enc`, `id`, `secret_version`, `test_event_code`, `test_mode_expires_at` —
      GEMESSEN 2026-08-26 (erste sieben), 2026-09-05/09 (`secret_version`), 2026-09-09
      (die zwei Testspalten).
    · Primärschlüssel `id`; Eindeutigkeit über `project_secrets_project_id_target_key`,
      UNIQUE NULLS NOT DISTINCT (project_id, target) — GEMESSEN 2026-08-26.
    · CHECK `project_secrets_target_valid` mit fünf Werten (meta, pinterest, tiktok, linkedin,
      google) — LIVE ABGELESEN 2026-08-27; `project_secrets_secret_genau_eines` — GEMESSEN
      2026-08-26; `project_secrets_test_mode_je_ziel` — LIVE ABGELESEN 2026-09-10.
    · RLS aktiv, NULL Policies — zuletzt abgelesen 2026-09-09; volle DML-Grants für anon,
      authenticated, service_role — GEMESSEN 2026-08-05.

(6) DIE CHIFFRE (src/lib/secrets/cipher.ts). AES-256-GCM aus node:crypto; Form
    `v1.<kennung>.<nonce>.<etikett>.<chiffrat>`, der Kopf als mitauthentisierte Zusatzdaten;
    Schlüssel aus `SECRET_ENC_KEYS` (je `kennung:base64`, 32 Bytes), aktiv nach
    `SECRET_ENC_ACTIVE_KEY_ID`.
    · Chiffriert schreiben die OAuth-Rückkehr (src/app/api/oauth/google/callback/route.ts) und
      src/lib/oauth/token-refresh.ts nach `secret_enc`.
    · Eingefügte Zugangsdaten schreibt `setCapiToken` IM KLARTEXT nach `secret`, über den
      Admin-Client nach dem Ownership-Gate.
    · Gelesen wird über service_role (Resolver in src/lib/capi/token.ts, token-refresh.ts,
      actions.ts).

(7) ZEITLIMITS JE AUFRUF: Adapter 3 000 ms · OAuth 8 000 ms · Vercel 8 000 ms · Persist-Insert
    3 000 ms · Formular-Ziel im Browser 10 000 ms (`FORM_TARGET_TIMEOUT_MS`). `after()` trägt
    nur Persist und vorsorgliche Erneuerung (`scheduleAfter`); die Forwards werden in der
    Anfrage erwartet.

(8) GELESENE VERCEL-BEFUNDE (docs/plattform-befunde.md, Vercel, Teil (d), GELESEN 2026-09-02):
    maximale Laufzeit Hobby 300 s, Pro 300 s Standard und 800 s maximal · Concurrency
    "Auto-scales up to 30,000 (Hobby and Pro)" · Hobby: 1 Mio. Aufrufe, 4 CPU-Stunden; bei
    Überschreitung Wartezeit bis zu 30 Tage · Laufzeit-Logs 1 Stunde (Hobby), 1 Tag (Pro).
    OB VERCEL RÜMPFE, QUERY ODER IP PROTOKOLLIERT: NICHT GELESEN. Zu Firewall oder
    Ratenbegrenzung der Plattform: nichts gelesen ("Attack Challenge Mode" nur als Titel
    eines nicht geöffneten Changelog-Eintrags, Vercel, Teil (e)).

(9) DIE LOG-HELFER SIND KEIN FILTER FÜR PERSONENBEZOGENE DATEN.
    · `errorName` (src/lib/errors.ts) gibt nur `err.name` aus; getestet (errors.test.ts).
    · `redactOpaque` (src/lib/redact.ts) ersetzt Folgen ab 20 Zeichen aus `[A-Za-z0-9_-]`;
      getestet (redact.test.ts).
    · `sanitizeProviderText` (`forwardToPinterest`) dasselbe Muster (`PINTEREST_OPAQUE_MIN` =
      20), dazu Kappung auf 200 Zeichen — damit ist Vorrat P13.6-10 beantwortet.
    · Eine E-Mail-Adresse, eine Telefonnummer, ein Name, eine IP oder ein User-Agent
      überstehen beide Schwärzungen (ABGELEITET aus dem Muster). Getragen hat bisher allein
      die BAUFORM: den Anbieter-Rumpf gar nicht lesen (wie `forwardToGoogle`) und nur Status
      und eigenes Vokabular loggen.

(10) AVV — FUNDSTELLEN, KEINE RECHTLICHE BEWERTUNG.
    · CLAUDE.md, Tier 0, "SUBPROZESSOR-DPAs + Kunden-DPA … BINDET-AN: öffentlicher Launch mit
      echten Kundendaten"; Vollfassung in docs/claude-history/security-manifest-full.md (RISIKO
      DSGVO Art. 28; AVV-Generator ein Post-Launch-Feature).
    · docs/offene-punkte.md, "DATENKLASSEN-GRENZE …", Festlegung vom 2026-08-15: die
      Rechtsgrundlage liegt beim Kunden, die Pflicht wird "VERTRAGLICH zugewiesen und bindet
      damit an den bestehenden Tier-0-Blocker".
    · Roadmap-Zeile 13.6, Fahrplan (2) "Anwalt und AVV" und die Hypothese zu IP und
      Browserkennung — Vermerk P13.6-1 belegt am Code, dass beide heute im Klartext an fünf
      Ziele gehen.
    · Roadmap-Zeile 15: "Subprozessor-/Kunden-DPA ist KEIN Bau-Auftrag, sondern ein
      juristisches Dokument".

## Owner-Angaben zur Phase 13.6 vom 2026-09-29

**Owner-Angabe P13.6-2 — EIN UPGRADE DES VERCEL-TARIFS AUF PRO IST, WENN NÖTIG, FREIGEGEBEN.**
PROVENIENZ: OWNER-ANGABE 2026-09-29, übermittelt im Auftrag der Anlage-Runde dieser Datei.
BINDEND.
- DER BEFUND, AUF DEN SIE ANTWORTET, IST GELESEN, NICHT NUR ANGEGEBEN: Der Hobby-Tarif ist auf
  nicht-kommerzielle, persönliche Nutzung beschränkt — GELESEN 2026-09-02 an der
  Fair-Use-Seite des Anbieters, docs/plattform-befunde.md, Vercel-Abschnitt, Teil (g). Der
  Auftrag nannte ihn "nicht von uns gelesen"; der Bestand trägt die Lesung.
- FOLGE FÜR DEN ZUSCHNITT (ARCHITEKT 2026-09-29): Die Grenzen des Hobby-Tarifs sind für das
  Relay keine Festlegung.
- BEZUG, NICHT ABGESCHRIEBEN: Teil (g) benennt die Kopplung an die Wiedervorlage des Tier-0-Items
  "KOSTEN-CIRCUIT-BREAKER" (CLAUDE.md, "## Security Manifest & Launch Blocker"). Die Dauerregel
  "MEDIENBYTES LAUFEN NIE ÜBER UNSERE VERCEL-ROUTEN …" (docs/immer-beachten.md) entfällt nach
  ihrem eigenen Wortlaut nicht durch einen Wechsel auf Pro allein.
- KEIN OFFENER PUNKT, KEIN STUB IN CLAUDE.md, KEIN NACHTRAG AN TEIL (g) (ARCHITEKT 2026-09-29).
  GRUND: Die OWNER-ENTSCHEIDUNG vom 2026-09-02 in docs/plattform-befunde.md, Vercel-Abschnitt,
  Teil (g) — der Befund steht bewusst allein dort, nicht in CLAUDE.md — gilt; und
  docs/plattform-befunde.md trägt laut CLAUDE.md keine Entscheidungen, die Upgrade-Freigabe ist
  eine. Sie steht allein hier. Die Owner-Frage, die bis zur Anlage-Runde an dieser Stelle offen
  stand, ist damit GESCHLOSSEN.

**Owner-Entscheidung P13.6-13 — DIE FUNKTIONALE VORSCHAU IM EDITOR SENDET NIE ECHTE EREIGNISSE —
WEDER AN `/api/e` NOCH AN EIN ZIEL.**
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-29, übermittelt im Auftrag der Runde "Vorschau,
Vercel-Befunde, Reihenfolge". BINDEND.
- GRUND: Klicks beim Gestalten liefen sonst als Conversions in Messung und Gebotsoptimierung der
  Kampagnen des Betreibers. Tracking wird an der veröffentlichten Seite geprüft.
- VERWORFEN: "nur bei eingeschaltetem Testmodus" — der Testmodus isoliert nicht bei jedem Ziel,
  linkedin und google haben keinen (Dauerregel "SICHTBARKEIT STATT ISOLATION — EIN TESTMODUS
  BELEGT DIE ANKUNFT BEIM ANBIETER, NICHT DASS DESSEN ZAHLEN UNBERÜHRT BLEIBEN").
- VERWORFEN: "die Vorschau sendet echt".
- GRENZE — DER HEUTIGE SCHUTZ IST EIN NEBENEFFEKT: Die Vorschau der Produktions-App baut ihren
  Beacon mit `getCapiProxyUrl`, und das liefert dort `http://localhost:3000/api/e` (Vorrat
  P13.6-12 der Phase 13.6, Punkt (a)). Gesichert ist damit allein, dass der Beacon nicht an
  unseren Produktions-Server geht; ob er anderswo etwas bewirkt, ist am Code NICHT ENTSCHEIDBAR
  (ebenda, Punkt (b)). Der Auftrag sagte "sendet nur deshalb nicht erfolgreich"; der Bestand
  trägt nur die schwächere Aussage.
- AUFLAGE AN DIE UMSETZUNG: ein Wächter-Test, der rot wird, wenn die Vorschau einen Beacon baut
  oder feuert (Dauerregel "NUR EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT IST
  KEINER").
- BEZUG, NUR ZITIERT: docs/claude-history/backlog-polish.md, Eintrag "P11.6-3 — DIE VORSCHAU
  FEUERT ECHTE EREIGNISSE …"; der Eintrag bleibt unverändert.
- REICHWEITE, AM WORTLAUT GELESEN (CC, 2026-09-29), OFFEN ZUR BESTÄTIGUNG: "an ein Ziel" trifft
  wörtlich auch das Browser-Pixel `fbq`, das die Vorschau heute feuert — seit Phase 4 als
  "akzeptierte Marketer-eigene-Vorschau-Verschmutzung" geführt
  (docs/claude-history/phase-4-mapping-codegen-export.md). Den Custom-Baustein nimmt Entscheidung
  P11.6-6 (d) der Phase 11.6 bereits aus der Vorschau heraus. Ob die Entscheidung das `fbq` der
  Vorschau mit meint, sagt ihr Wortlaut nicht ausdrücklich; der Zuschnitt fragt es ab.
  BEANTWORTET 2026-09-29 (ARCHITEKT): Setzung P13.6-38 der Phase 13.6 — `fbq` und der Lader sind
  mitgemeint.
- EBENFALLS ABGELEITET: Die Entscheidung gilt dem Editor, nicht der Umgebung — auch die lokale
  Vorschau (`next dev`) baut den Beacon heute und schickt ihn an den lokalen Server.

**Owner-Entscheidung P13.6-16 — NEUFASSUNG DER DATENKLASSEN-REGEL FÜR FORMULARINHALTE IM RELAY:
TRANSIT JA — NIE GESPEICHERT, NIE GELOGGT, NIE AN `/api/e`, NIE AN EIN TRACKING-ZIEL.**
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-29, übermittelt im Auftrag der Runde "Neufassung der
Datenklassen-Regel, Aufklärung A2, Setzungen". BINDEND.
- DIE REGEL: Im Relay dürfen Formularinhalte unseren Server durchlaufen (Transit). Sie werden
  nie gespeichert (keine Datenbank), nie geloggt (keine eigene Logzeile mit Inhalt), gehen nie
  an `/api/e` und nie an ein Tracking-Ziel.
- SPEICHERUNG — etwa ein Lead-Postfach — IST DAMIT NICHT ERLAUBT; sie kommt als eigener
  späterer Schritt mit eigener Owner-Entscheidung.
- NICHT ENTSCHIEDEN: ob eine gehashte E-Mail als Match-Feld an Tracking-Ziele gehen darf. Das
  fällt mit der Fan-Out-Scheibe (Roadmap-Zeile 13.6, Block "ANPASSUNGEN AN DEN
  FAN-OUT-ZIELEN"; im Archiv der Phase 13 als E4 geführt).
- IM BROWSER-DIREKTEN WEG (DATENSPARMODUS) gelten Entscheidungen P13-2 und P13-7 der Phase 13
  unverändert.
- GRENZE — WAS AN DIE STELLE DER BISHERIGEN BEGRÜNDUNG TRITT: Die Auflage "eine
  KLARTEXT-Angabe darf den eigenen Server NIE erreichen" (docs/offene-punkte.md,
  "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE": im Text vom 2026-08-15 samt der Begründung
  "Der Leck-Pfad ist NICHT die Datenbank, sondern das LOG", präzisiert am 2026-08-19 für
  E-Mail und Telefon) wird für FORMULARINHALTE IM RELAY ersetzt durch zwei Bedingungen:
  (1) eine Bauform, in der der Relay-Code den Rumpf nur zum Weiterleiten liest und nur Status
      und eigenes Vokabular loggt, gesichert durch einen Wächter-Test;
  (2) eine Lesung, was Vercel protokolliert (Rümpfe, Query, IP), VOR dem ersten Relay-Code
      (Arbeit P13.6-26 der Phase 13.6).
  Für TRACKING-MERKMALE gilt die Auflage unverändert.
- ABWEICHUNG VOM AUFTRAG, GEMELDET (CC): Der Auftrag nannte die Auflage "vom 2026-08-19,
  begründet mit dem Log". Im Bestand steht die Log-Begründung im Text vom 2026-08-15; der
  2026-08-19 präzisiert die Auflage für E-Mail und Telefon. Beide Daten stehen deshalb oben.
- BEZUG: Die Ergänzung am offenen Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE"
  (docs/offene-punkte.md, 2026-09-29) und der Nachtrag an der Roadmap-Zeile 13.6 vom 2026-09-29
  zeigen hierher.

**Owner-Entscheidung P13.6-17 — STUFE 1 DES RELAYS: DIE RELAY-BASIS OHNE KUNDEN-SCHLÜSSEL.**
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-29 (Wortlaut "Relay-Basis"), dieselbe Runde. BINDEND.
- AUSLEGUNG DES ARCHITEKTEN, AUSDRÜCKLICH ZUR KORREKTUR OFFEN: Zustellung nur an bekannte
  Webhook-Dienste über eine feste Host-Liste (etwa Make, Zapier); beliebige https-Adressen
  bleiben im Datensparmodus. 1-Klick-Anbindungen nativer Anbieter folgen später.
- BEZUG (CC, GELESEN AM BESTAND): docs/formular-empfaenger-befunde.md trägt einen Abschnitt
  "Make" mit Lesung und Messung vom 2026-09-28; einen Abschnitt "Zapier" trägt sie nicht. Die
  Host-Liste ist deshalb eine eigene Arbeit (Arbeit P13.6-27 der Phase 13.6).

**Owner-Entscheidung P13.6-18 — DAS RELAY WIRD FÜR FREMDE NUTZER ERST FREIGESCHALTET, WENN EIN
KUNDEN-AVV STEHT.**
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-29, dieselbe Runde. BINDEND.
- Der Owner baut und testet vorher selbst; vor dem ersten fremden Nutzer steht der AVV.
- BEZUG: Tier-0-Item "SUBPROZESSOR-DPAs + Kunden-DPA" (CLAUDE.md, "## Security Manifest &
  Launch Blocker"); die Fundstellen stehen in Vermerk P13.6-19, Punkt (10).

## Architekten-Setzungen zur Phase 13.6 vom 2026-09-29

PROVENIENZ von P13.6-3 und P13.6-4: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der
Anlage-Runde dieser Datei. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf. (Bis zur Runde
"Vorschau, Vercel-Befunde, Reihenfolge" stand hier "beider"; P13.6-14 trägt ihre eigene
Provenienz.)

**Setzung P13.6-3 — DIE ERSTE BAU-SCHEIBE DER PHASE 13.6 SCHLIESST B-1 UND B-2, VOR JEDEM
RELAY-CODE.**
- GRUND: P13-7 der Phase 13 gilt jetzt, und beide Wege widersprechen ihr unter Bedingungen
  (Vorrat P13.6-6 und P13.6-7); die Reparatur braucht keinen Relay-Code.
- GRENZE: Der Zuschnitt fällt erst nach einer Messung. Kandidat für B-2, NICHT entschieden:
  Formulare mit Ziel bekommen beim Erzeugen `method="post"`.
- BEZUG ZUM KANDIDATEN (CC, 2026-09-29; ABGELEITET, KEINE ENTSCHEIDUNG): Mit `method="post"`
  stünden die Feldwerte beim nativen Rückfall nicht mehr im Query, der RUMPF liefe aber in die
  Serve-Route — der Fall von Vorrat P13-14 der Phase 13 (heute in
  docs/claude-history/backlog-polish.md). Er erreichte damit weiterhin unseren Server.
- ZWEITER KANDIDAT FÜR B-2 (ARCHITEKT 2026-09-29), NICHT ENTSCHIEDEN: Beim Erzeugen bekommt ein
  Formular mit Ziel die eingetragene Adresse als `action`, samt `method="post"`. Dann gehen die
  Felder auch beim nativen Rückfall allein an diese Adresse. PREIS: Der Besucher landet auf der
  Antwortseite des Empfängers statt auf der Danke-Seite.
- DAS VERHÄLTNIS ZUM ZWEITEN KANDIDATEN UND SETZUNG P13-31 DER PHASE 13 — GEPRÜFT AM WORTLAUT
  UND AM CODE (CC, 2026-09-29, Stand `a3797d9`), GEMELDET, NICHT ENTSCHIEDEN:
  (a) DER WORTLAUT trifft den Bestand des Betreibers: "Kein Angebot eines Ziels bei einer
      eigenen fremden absoluten Zieladresse (`action` am Formular oder `formaction` an einem
      Absende-Element)". GELESEN AM CODE: Die Prüfung (`formTargetCheck`, src/lib/form-target.ts)
      liest die Attribute aus dem Quelltext des Editors — alle Aufrufer in
      src/components/CodeImporter.tsx übergeben `debouncedCode` bzw. die Paare aus
      `publishPairs`, die aus `debouncedCode` und dem Zwischenspeicher der anderen Variante
      stammen. Eine beim Erzeugen gesetzte `action` stünde nur im ausgelieferten Text; die
      Prüfung sähe sie nicht, und ihr Wortlaut stünde ihr nicht entgegen.
  (b) EINE LÜCKE DES KANDIDATEN, ABGELEITET AUS DER HTML-SPEZIFIKATION (NICHT GELESEN, NICHT
      GEMESSEN): Ein `formaction` oder `formmethod` am auslösenden Absende-Element geht der
      `action` bzw. `method` des Formulars vor. P13-31 schliesst nur eine ABSOLUTE `formaction`
      aus (`isAbsoluteAddress`); eine relative oder leere bleibt zulässig. Trägt der Knopf eine
      solche, führte der native Rückfall trotz gesetzter `action` wieder an die eigene
      Seitenadresse, und `formmethod="get"` stellte das Query wieder her.
  (c) Die Erzeugungs-Schreibvorgänge von `generateFunctional` sind von der Dauerregel "KEIN
      BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN …"
      ausdrücklich ausgenommen; der Editor-Quelltext bliebe unberührt (Invariante J1 der Phase
      13). Die Abgrenzung von I4 der Phase 13 ("`action`, `method` und `target` des Betreibers
      wirken dann nicht mehr") beschreibt heute das `preventDefault`; ob sie eine
      überschriebene `action` im ausgelieferten Text mitträgt, ist eine Frage des Zuschnitts.

**Setzung P13.6-4 — EIN SERVERSEITIG ERZEUGTES EREIGNIS TRÄGT NIE EIN FEHLENDES
EINWILLIGUNGSFELD, SONDERN IMMER EIN AUSDRÜCKLICHES URTEIL.**
- GRUND: Bei fehlendem `cns` lässt `LEGACY_CONSENT_ROLE` meta durch, ohne dass der Besucher
  gefragt wurde (Vermerk P13.6-1, Punkt (9)).
- GRENZE: Woher das Urteil kommt, entscheidet der Zuschnitt.

**Setzung P13.6-14 — DIE REIHENFOLGE: SCHEIBE 1 SCHLIESST B-1 UND B-2, SCHEIBE 2 SETZT
OWNER-ENTSCHEIDUNG P13.6-13 UM, ERST DANACH WIRD `NEXT_PUBLIC_APP_URL` IN VERCEL KORRIGIERT.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der Runde "Vorschau,
Vercel-Befunde, Reihenfolge". REVIDIERBAR.
- Setzung P13.6-3 bleibt unverändert: Scheibe 1 schliesst B-1 und B-2.
- Scheibe 2 setzt Owner-Entscheidung P13.6-13 um (die Vorschau sendet nie).
- Danach die Korrektur von `NEXT_PUBLIC_APP_URL` in Vercel, mit Redeploy (Dauerregel
  "NEXT_PUBLIC_-REDEPLOY-PFLICHT") und Kontrolle am Export: eine neu exportierte Datei trägt die
  neue Adresse, eine alte trägt noch `localhost`.
- GRUND: Die Korrektur schaltet die Vorschau-Ereignisse ein, solange Scheibe 2 fehlt (Vorrat
  P13.6-12 der Phase 13.6, Punkt (b)).
- GRENZE: Exporte bleiben bis dahin ohne Server-Tracking; heute exportiert niemand ausser dem
  Owner (ebenda, "Heute kein fremder Nutzer").
- OFFEN, ENTSCHEIDET DER ARCHITEKT BEIM KORREKTURSCHRITT: der Wert — Kandidat
  `https://pagesmith-delta.vercel.app`, der als OAuth-Rückkehr registrierte Host (OWNER-ANGABE
  2026-08-26, docs/offene-punkte.md, "DIE ZWEI REGISTRIERTEN WEITERLEITUNGS-ADRESSEN LIEGEN
  AUSSERHALB DES REPOS"), als Adresse der Produktions-App NICHT gemessen · der Preview-Scope —
  dieselbe Adresse (Exporte aus Vorschau-Deployments beaconen dann an den Produktions-Ingest)
  gegen leer lassen (kein Beacon, Warnung auf der Konsole, `getCapiProxyUrl` fail-loud).
- FORTGESCHRIEBEN 2026-09-29 (ARCHITEKT, Runde "Neufassung der Datenklassen-Regel, Aufklärung
  A2, Setzungen"; der Text darüber bleibt stehen): DIE REIHENFOLGE IST
  Scheibe 1 (B-1/B-2) → Scheibe 2 (die Vorschau sendet nie) → Korrektur von
  `NEXT_PUBLIC_APP_URL` → Lesung, was Vercel protokolliert (Arbeit P13.6-26) → erster
  Relay-Zuschnitt. GRUND für die Lesung vor dem Zuschnitt: sie ist Bedingung (2) der
  Owner-Entscheidung P13.6-16.

PROVENIENZ von P13.6-20 bis P13.6-25: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag
der Runde "Neufassung der Datenklassen-Regel, Aufklärung A2, Setzungen". REVIDIERBAR.

**Setzung P13.6-20 — DAS RELAY GILT NUR FÜR VERÖFFENTLICHTE, GEHOSTETE SEITEN; DIE ZIELADRESSE
KOMMT AUSSCHLIESSLICH AUS `published_content`.**
- Bestimmt über trackingKey und Formular-Kennung — nie aus der Anfrage, nie aus dem Entwurf.
  Exporte bleiben browser-direkt.
- GRUND: Für Exporte gibt es keine geprüfte Serverfassung, und der Entwurf (`saveProject`) ist
  ungeprüft; `published_content` ist der beim Veröffentlichen geprüfte Stand (Vermerk
  P13.6-19, Punkt (2)).
- GRENZE: Welcher Mapping-Satz bei A/B gilt, klärt der Zuschnitt. Dazu Vorrat P13.6-30:
  `published_content.mappings` ist der Stand des Clients.

**Setzung P13.6-21 — DEM BESUCHER WERDEN GENAU ZWEI ZUSTÄNDE GEMELDET: "ZUGESTELLT" UND "NICHT
ZUGESTELLT".**
- "zugestellt": der Empfänger antwortet mit Erfolg. "nicht zugestellt": alles andere —
  unbekannt, gesperrt, abgelehnt, Zeitlimit.
- GRUND: Sperre und unbekannter Schlüssel bleiben ununterscheidbar, im Sinne der Dauerregel
  "INGEST-204-CONTAINMENT" (Vermerk P13.6-19, Punkt (3)).
- GRENZE: Was als "Erfolg" eines Empfängers gilt, legt der Zuschnitt je Empfänger fest.

**Setzung P13.6-22 — DER SERVER WIEDERHOLT NIE; DAS FORMULAR BLEIBT STEHEN; DAS SERVER-ZEITLIMIT
LIEGT UNTER `FORM_TARGET_TIMEOUT_MS`.**
- GRUND: Eine Wiederholung setzte eine Ablage voraus, die Owner-Entscheidung P13.6-16
  ausschliesst; bei "nicht zugestellt" bleibt das Formular stehen (Entscheidung P13-17 der
  Phase 13). Liegt das Server-Zeitlimit über dem Browser-Limit (10 000 ms, Vermerk P13.6-19,
  Punkt (7)), meldet der Browser "nicht zugestellt", während der Server noch zustellt, und ein
  zweiter Versuch erzeugt einen doppelten Lead.
- GRENZE: Der Wert des Server-Zeitlimits ist nicht gesetzt; er fällt im Zuschnitt.

**Setzung P13.6-23 — DER SCHUTZ DES RELAY-ENDPUNKTS GEHÖRT IN 13.6, VOR DEN ERSTEN FREMDEN
NUTZER.**
- Ratenbegrenzung JE PROJEKT (nicht je IP — das hiesse, IPs abzulegen; Festlegung vom
  2026-08-15 in docs/offene-punkte.md, "DATENKLASSEN-GRENZE …") · Host-Liste statt offener
  Adresse · ein eigener fail-closed-Zweig für den Kill-Switch (Dauerregel "KILL-SWITCH ALS
  EXPLIZITER, FAIL-CLOSED ZWEIG"). Phase 14 bleibt für `/api/e`.
- GRUND: Heute gibt es keine Ratenbegrenzung ohne angemeldeten Nutzer und keinen Bot-Schutz
  (Vermerk P13.6-19, Punkt (1)); ein offener Endpunkt mit Kunden-Adressen ohne Schutz wäre die
  SSRF-Achse aus Punkt (4).
- GRENZE: Wie je Projekt gezählt wird (Datenbank, Plattform, anderes), ist nicht entschieden;
  eine Plattform-Firewall ist nicht gelesen (Punkt (8)).

**Setzung P13.6-24 — EINWILLIGUNG: DER TRANSIT AN DEN BETREIBER BRAUCHT KEINE; EIN DARAUS
ABGELEITETES TRACKING-EREIGNIS TRÄGT DAS URTEIL AUS DEM BROWSER.**
- GRUND: Setzung P13-8 der Phase 13 (das Abschicken an die eigene Adresse des Betreibers ist
  kein Tracking) und Setzung P13.6-4 (nie ein fehlendes Einwilligungsfeld).
- GRENZE: Wie das Urteil aus dem Browser zum Relay-Aufruf kommt, entscheidet der Zuschnitt.

**Setzung P13.6-25 — KUNDEN-SCHLÜSSEL LIEGEN, WENN SIE MIT EINER SPÄTEREN STUFE KOMMEN, NUR
CHIFFRIERT NACH DEM OAUTH-MUSTER, EINER JE ANBIETER UND PROJEKT.**
- GRUND: Das OAuth-Muster chiffriert nach `secret_enc` (Vermerk P13.6-19, Punkt (6)); einer je
  Anbieter und Projekt hält die Eindeutigkeit (project_id, target) (offener Punkt "DER
  PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT", Trigger (i)).
- GRENZE: Vorher ist der offene Punkt "DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT"
  zu lösen. Ein neuer Anbieter-Zielwert verlangt eine Migration am CHECK
  `project_secrets_target_valid` (Dauerregel "JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE
  CONSTRAINT-ERWEITERUNG MIT …").

## Zuschnitt Scheibe 13.6-1

**ABGESCHLOSSEN AM 2026-09-29 — Bau-Commit `9fae014`, Live-Test bestanden; Abschluss-Vermerk
P13.6-37.**
- GEGENSTAND: "Rückfall ohne Skript und eigene Hosts", die erste Bau-Scheibe der Phase 13.6
  (Setzungen P13.6-3 und P13.6-14). Sie schliesst B-2 (Vorrat P13.6-7) und B-1 (Vorrat P13.6-6).
- Der Zuschnitt ist verdichtet: Hier stehen nur noch die Setzungen und Grenzen, die über die
  Scheibe hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist und wo sein Inhalt steht: Vermerk P13.6-37, Punkt (9).

### Messung zur Scheibe 13.6-1

**Vermerk P13.6-31 — DER NATIVE RÜCKFALL EINES FORMULARS MIT ZIEL OHNE JAVASCRIPT** (GEMESSEN,
OWNER, live, 2026-09-29; Chrome mit ausgeschaltetem JavaScript, Browserversion nicht angegeben;
gehostete Testseite mit Formular-Ziel).
- Nach dem Abschicken steht in der Adresszeile
  `https://testseite-formular-voll-z-vyz7eh.publayer.net/?name=Stefan&email=test%40example.com&nachricht=Keine&interesse=kurs&interesse=beratung`.
- Es bleibt dieselbe Seite; keine Danke-Seite. Im Make-Verlauf kein Eintrag.
- FOLGE: Vorrat P13.6-7 der Phase 13.6 (B-2) ist in seiner Prämisse gemessen — die Feldwerte
  stehen im Query, der Lead ist verloren.
- NICHT GEMESSEN: wie oft ein Besucher schneller abschickt, als das Skript lädt.

### Architekten-Setzungen zur Scheibe 13.6-1

PROVENIENZ aller drei: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der
Zuschnitt-Runde der Scheibe 13.6-1. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.

**Setzung P13.6-32 — B-2: EIN FORMULAR MIT ZIEL TRÄGT IM AUSGELIEFERTEN TEXT DIE EINGETRAGENE
ADRESSE ALS `action`, DAZU `method="post"` UND `enctype="application/x-www-form-urlencoded"`.**
- Gesetzt beim Erzeugen; dieselbe Form wie der Versand im Skript (Setzung P13-19 der Phase 13).
- FOLGE: Der native Rückfall geht allein an die eingetragene Adresse; der Lead kommt an.
- PREIS: Der Besucher sieht im Rückfall die Antwortseite des Empfängers statt der Danke-Seite.
- VERWORFEN: `method="post"` allein. GRUND: Der Rumpf landete dann in unserer Serve-Route (Vorrat
  P13-14 der Phase 13), der Lead ginge verloren.
- Damit ist von den zwei Kandidaten aus Setzung P13.6-3 der zweite gewählt.

**Setzung P13.6-33 — DIE ANGEBOTSREGEL: TRÄGT EIN ABSENDE-ELEMENT `formaction` ODER
`formmethod`, BEKOMMT DAS FORMULAR KEIN ZIEL.**
- Das gilt auch für einen Bild-Knopf (`<input type="image">`).
- Ein bestehendes Ziel an einem solchen Formular sperrt Veröffentlichen und Export.
- GRUND: Beide Attribute heben die Zusage aus Setzung P13.6-32 auf.
- `formenctype`, `formtarget` und `formnovalidate` heben sie nach der Angabe des Auftrags nicht
  auf und sperren nicht.
  ERSETZT für `formenctype`: Setzung P13.6-36, F1/F2 — `formenctype` sperrt mit jedem Wert.
- NIMMT AUF: Vorrat P13-61 der Phase 13 (docs/claude-history/backlog-polish.md, Abschnitt "Aus
  Phase 13 gehoben (2026-09-29) …": der Bild-Knopf) samt der Doppelantwort `formTargetCheck`
  gegen `deriveFormFieldNames` (src/lib/form-target.ts).
  ERLEDIGT durch Bau-Commit `9fae014`: Vermerk P13.6-37, Punkt (8).

**Setzung P13.6-34 — B-1: `*.vercel.app` GEHÖRT ZU DEN EIGENEN HOSTS; BEIM VERÖFFENTLICHEN
VERWEIGERT DER SERVER ZUSÄTZLICH EINE ZIELADRESSE AUF DER CUSTOM-DOMAIN IRGENDEINES PROJEKTS.**
- `*.vercel.app` kommt in die Eigen-Liste (`ownFormTargetDomains`, src/lib/form-target.ts).
- Die Prüfung auf Custom-Domains läuft beim Veröffentlichen serverseitig.
- Der Export behält die clientseitige Prüfung; er hat keinen Server.

### Grenzen der Scheibe 13.6-1

- Bereits veröffentlichte Seiten und Exporte ändern sich erst durch Neu-Veröffentlichen bzw.
  Neu-Export (Dauerregel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY").
- Seiten ohne Formular-Ziel bleiben byte-gleich.

### Planrunde der Scheibe 13.6-1

**Vermerk P13.6-35 — DREI MESSUNGEN DER PLANRUNDE** (GEMESSEN, CC, 2026-09-29, HEAD `a154665`;
Planrunde der Scheibe 13.6-1).
- M-a — Google Chrome 154.0.0.0 (User-Agent, über Playwright), Seite `about:blank`, Formular per
  `innerHTML`: `form.elements` trägt keinen Bild-Knopf (`<input type="image">`), weder im
  Formular noch ausserhalb über `form=`; Ergebnis `INPUT:text:a,BUTTON:submit:b`. Für beide
  Bild-Knöpfe gilt `el.form === form`. Die Prämisse von Vorrat P13-61 der Phase 13 ist damit
  gemessen.
- M-b — jsdom 29.1.1 (Node), dieselbe Probe: dasselbe Ergebnis. Die Unit-Tests sehen dieselbe
  Lücke wie der Browser.
- M-c — Node und Chrome 154: `new URL("https://a.publayer.net./x").hostname` ergibt
  `"a.publayer.net."`; der Punkt am Ende bleibt stehen.
  BEFUND (ABGELEITET, am Code): `isOwnHost` (src/lib/form-target.ts) vergleicht mit
  `h === d || h.endsWith("." + d)`; eine Zieladresse mit Punkt am Ende umging damit die
  Eigen-Prüfung. Ob Vercel eine solche Anfrage an unser Deployment leitet, ist UNGEMESSEN.
- GRENZE: je ein Browser, eine jsdom-Fassung; die Proben standen in keiner Datei des Repos.

**Setzung P13.6-36 — DIE ENTSCHEIDUNGEN ZU DEN FRAGEN F1 BIS F8 DER PLANRUNDE.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Bau-Auftrag der Scheibe 13.6-1.
REVIDIERBAR; ein Owner-Widerspruch hebt sie auf.
- F1, F2 — `formaction`, `formmethod` und `formenctype` an einem Absende-Element sperren, JEDER
  mit JEDEM Wert; `formtarget` und `formnovalidate` sperren nicht. GRUND für `formenctype`:
  `text/plain` kommt bei Make als EIN ungeparstes Feld an (docs/formular-empfaenger-befunde.md,
  Abschnitt "Make", Befund (v)). Damit ist die Angabe zu `formenctype` in Setzung P13.6-33
  ersetzt; der Satz dort bleibt als Stand vor der Planrunde stehen.
- F3 — `target` bleibt unangetastet; `accept-charset="UTF-8"` wird zusätzlich gesetzt.
- F4 — `*.vercel.app` wird vollständig gesperrt.
- F5 — `isOwnHost` normalisiert den Host (Kleinschreibung, Punkt am Ende entfernt), im Client wie
  im Server.
- F6 — Invariante I7 der Phase 13 regelt die Einbettung in Script-Rohtext und bleibt. Die
  Adresse steht zusätzlich im `action`-Attribut, maskiert durch den Serialisierer; Wächter ist
  Test F7b.
- F7 — Der Admin-Client in `publishProject` ist freigegeben (Kandidat A der Planrunde) unter
  diesen Bedingungen: er entsteht erst nach dem Eigentums-Gate und nur, wenn mindestens ein
  Formular-Ziel besteht (beide Varianten); die Hosts werden normalisiert und danach streng
  geprüft (nur `[a-z0-9.-]`, nicht leer), ein anderer Host bricht ab, BEVOR eine Abfrage läuft;
  die Abfrage liest nur `custom_host`, mit `.in(…)` und `.limit(1)`; `{data, error}` getrennt
  ausgewertet, ein Fehler bricht ab und gilt nie als "erlaubt"; alles vor dem Schreiben des
  Labels.
- F8 — Die drei Kommentare aus Vorrat P13.6-8 der Phase 13.6 werden in dieser Scheibe
  berichtigt; die Messungen stehen in Vermerk P13.6-35.
- GRENZEN, BENANNT:
  - Im Rückfall ohne Skript sieht der Besucher die Antwort des Empfängers; das Formular bleibt
    nicht stehen. Invariante I3 und Entscheidung P13-17 der Phase 13 galten nie dem Rückfall.
  - Ein eigenes `onsubmit`-Skript des Betreibers, das `form.action` liest, sendet künftig an die
    eingetragene Adresse statt an die eigene Seite.
  - Die Sperre für Attribute an Absende-Elementen wirkt nur im Client; der Server parst kein
    HTML.
  - Der Export prüft Custom-Domains nicht.
  - Der native Versand eines Exports folgt dem Zeichensatz aus `accept-charset`.

### Abschluss der Scheibe 13.6-1

**Vermerk P13.6-37 — ABSCHLUSS DER SCHEIBE 13.6-1 (RÜCKFALL OHNE SKRIPT UND EIGENE HOSTS).
Bau-Commit `9fae014`** ("feat(form-target): Rückfall ohne Skript geht an die Zieladresse, eigene
Hosts gesperrt"). LIVE-TEST BESTANDEN.

(0) PROVENIENZ DER PUNKTE (1) BIS (3): GEMESSEN, OWNER, live, 2026-09-29, Chrome (Version nicht
    angegeben). Die Rückmeldung nennt je Messung Bytes und sha256, jeweils zweimal gleich; das
    Instrument nennt sie nicht.

(1) L0/L1 — SEITE OHNE FORMULAR-ZIEL:
    · vor dem Push: 30493 Bytes, sha256
      `40c83cb36a543162717af8a01143246ed139d2cbfa7373f7888c39ca848f37e5`;
    · nach Deploy und Neu-Veröffentlichen: identisch.
    Seiten ohne Formular-Ziel sind damit live byte-gleich.

(2) TESTSEITE MIT FORMULAR-ZIEL:
    · vor dem Push: 23637 Bytes, sha256
      `803e469523b17bb46a69e427743d691194c36be1b80a7d11b488accd247834f2`;
    · nach dem Neu-Veröffentlichen: 23786 Bytes, sha256
      `7e5ff9b8790e54dc0359a5d3ab60c3ade7bd3e817043d104aa2f44c0aa2e639f`.
    · GERECHNET (ARCHITEKT), NICHT GEMESSEN: Die Differenz von 149 Bytes entspricht genau den vier
      Attributen — `action` 68, `method` 14, `enctype` 44, `accept-charset` 23.
    · NACHGEZÄHLT (CC, 2026-09-29): 23786 − 23637 = 149 = 68 + 14 + 44 + 23. ` method="post"` = 14,
      ` enctype="application/x-www-form-urlencoded"` = 44, ` accept-charset="UTF-8"` = 23 Bytes,
      am Wortlaut gezählt. ` action=""` ohne Adresse = 10 Bytes; die 68 setzen eine Adresse von
      58 Bytes voraus, und die Adresse steht nicht im Bestand — dieser Teil ist NICHT nachgezählt.

(3) DIE SCHRITTE:
    · L2 — mit JavaScript, vor dem Neu-Veröffentlichen: Danke-Seite, Eingang bei Make mit
      korrekten Daten.
    · L3 — nach dem Neu-Veröffentlichen: `action` = die eingetragene Make-Adresse (hier nur als
      `hook.eu2.make.com/icdb…`), `method` = `post`, `enctype` =
      `application/x-www-form-urlencoded`, `accept-charset` = `UTF-8`.
    · L4 — ohne JavaScript: Die Adresszeile zeigt die Make-Adresse, keine Feldwerte im Query der
      eigenen Seite; Bildschirm schwarz mit "Accepted" statt Danke-Seite; Make-Eintrag mit
      `name`, `email`, `nachricht` und `interesse` als Liste mit beiden Werten (`kurs`,
      `beratung`). Gegenstück zu Vermerk P13.6-31.
    · L5 — mit JavaScript nach dem Neu-Veröffentlichen: Danke-Seite, ein Eingang bei Make.
    · L6 — `formenctype` am Absende-Knopf: Meldung "Ein Absende-Knopf hat eigene Angaben zum
      Absenden …", Veröffentlichen und Export gesperrt. Zieladresse
      `https://irgendwas.vercel.app/x`: "Bitte eine https-Adresse eingeben, die nicht auf
      Pagesmith zeigt", Übernehmen nicht möglich; das bestehende gültige Ziel blieb,
      Veröffentlichen ging.
    · L7 — der Export trägt im `<form>`-Tag `action`, `method`, `enctype`, `accept-charset`.

(4) BAU (CC, 2026-09-29, am Stand vor dem Commit `9fae014`; die Gates danach erneut):
    · Vorher-Wert für B2-J2, erhoben an `5b1ddc7` vor der ersten Code-Änderung (Sonde ausserhalb
      des Repos, `generateFunctional` im Modus "export"): 16574 Bytes, sha256
      `6eeede3eef1459c50a7c6815cf4861a97b2c2897ddb4e311b89625ad304e5598`. Der Test trägt ihn als
      Konstante und ist grün.
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, 1 Warnung in
      src/lib/tracking/consent.test.ts (von der Scheibe nicht berührt); `vitest run` 99 Dateien,
      2546 Tests (vorher 2497); `next build` exit 0.
    · Mutationen, volle Suite, Vorhersage je exakt getroffen: M1 (`action` nicht gesetzt) 9 rot ·
      M2 (`method` nicht gesetzt) 8 · M3 (`formaction` nicht erkannt) 5 · M4 (`vercel.app` fehlt)
      4 · M5 (strenge Host-Prüfung entfällt) 3 · M6 (Punkt am Ende bleibt) 7 · M-I5′ (Attribute an
      jedes Formular) 4 — dabei W1′, W2′, T1, T9 grün, wie vorhergesagt.

(5) ABWEICHUNGEN VOM PLAN, IM BAU DEKLARIERT:
    · F7 wurde unerwartet rot: Die Zeichenprüfung traf den gequoteten `action`-Wert, kein
      Ausbruch (drei Scripts wie ohne Ziel). F7 prüft seither den Text ab dem Datenblock; die
      Attribut-Seite bewacht F7b.
    · Ein Host ausserhalb von `[a-z0-9.-]` bekommt eine eigene Meldung
      (`FORM_TARGET_HOST_UNCHECKABLE_MESSAGE`), nicht die bestehende Form-Meldung — jene nennte
      eine falsche Ursache.
    · Die Abfrage auf Custom-Domains steht hinter ALLEN billigen Prüfungen (Wert, Namensliste,
      Sprache).
    · Ein Absende-Element mit absolutem `formaction` bleibt bei "foreign-action", eines mit
      `formmethod="dialog"` bei "dialog"; die Urteile aus 13-1 bleiben zeichengleich.
    · Zusätzliche Tests ausserhalb des Plans: B2d, P3b, A4-CI, B2-CI.

(6) WÄCHTER, je Festlegung (Tests in src/lib/form-target.test.ts, "PT"
    src/app/projects/publish.test.ts, "CI" src/components/CodeImporter.test.tsx):
    · Setzung P13.6-32 und F3 (die vier Attribute, `target` bleibt, nur "export"): B2a, B2b, B2c,
      B2d, F6b′, N-Diff′, F7b, B2-CI (CI).
    · Seiten ohne Formular-Ziel byte-gleich: B2-J1, B2-J2 samt Positivkontrolle. W1′, W2′, T1 und
      T9 tragen KEIN `<form>`-Element und sehen diese Stelle nicht (M-I5′).
    · Setzung P13.6-33 mit F1/F2: A1, A2, A3, A4; A4-CI (CI).
    · Setzung P13.6-34 mit F4: V1, die Umgebungsliste; F8-Zeile "*.vercel.app" (PT).
    · F5: P4 (Client); F8-Zeile "Punkt am Ende", P4 (Server) (PT).
    · F7: P1, P2, P3, P3b, P5 (PT); `formTargetEndpointHost` (acht Fälle).

(7) GRENZEN, als Grenzen benannt:
    · NICHT live geprüft, nur im Test: die Sperre einer Custom-Domain als Zieladresse und die
      strenge Host-Prüfung beim Veröffentlichen (P1, P5).
    · Nicht gemessen: wie oft ein Besucher abschickt, bevor das Skript geladen ist; ob Vercel eine
      Adresse mit Punkt am Ende an uns leitet; Firefox und Safari; ein anderer Empfänger als Make
      eu2.
    · Die Meldung zur vercel.app-Sperre sagt "zeigt auf Pagesmith" auch für fremde
      vercel.app-Adressen — der benannte Preis von F4 (Setzung P13.6-36), kein eigener Posten.

(8) ERLEDIGT durch `9fae014`:
    · Vorrat P13.6-6 (B-1), P13.6-7 (B-2) und P13.6-8 (die drei Kommentare) — je mit Zeile am
      Eintrag.
    · Vorrat P13-61 der Phase 13 (docs/claude-history/backlog-polish.md): Der gemeinsame Helfer
      `formControlsWithImages` (src/lib/form-target.ts) ersetzt die Doppelantwort; ein Bild-Knopf
      zählt in `formTargetCheck` (Tests A2). DAS BACKLOG IST HIER NICHT GEÄNDERT; das Phasenende
      trägt es nach.

(9) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN — Anweisungen, die mit der Scheibe
    abgelaufen sind:
    · der Satz "Zugeschnitten am 2026-09-29; der Plan folgt in einer eigenen Runde." aus dem
      GEGENSTAND; der Gegenstand selbst steht im Abschluss-Kopf des Zuschnitts;
    · der Absatz "ORT, DEKLARIERT (CC, 2026-09-29)": Der Zuschnitt steht als eigener Abschnitt
      nach der Hausform der Phase 13 (Commit `ed13b93`) statt unter "Noch nicht geschnittene
      Arbeit", wie der Auftrag der Zuschnitt-Runde es nannte;
    · aus "Grenzen der Scheibe 13.6-1" die Zeile "Kein Relay-Code.";
    · der Absatz "ZWEI NUMMERN STATT EINER, DEKLARIERT (CC, 2026-09-29)" vor Vermerk P13.6-35:
      Messungen (CC) und Entscheidungen (Architekt) stehen als zwei Klassen unter P13.6-35 und
      P13.6-36, obwohl der Auftrag eine Nummer nannte.
    STEHEN GEBLIEBEN: Vermerk P13.6-31, Setzungen P13.6-32, P13.6-33 und P13.6-34, die Grenzen
    zum Neu-Veröffentlichen und zur Byte-Gleichheit, Vermerk P13.6-35 (Code-Kommentare in
    src/lib/form-target.ts zeigen darauf) und Setzung P13.6-36 samt Grenzen. An P13.6-33 steht je
    ein Auflösungs-Satz: `formenctype` ist durch P13.6-36 ersetzt, P13-61 ist erledigt.

## Zuschnitt Scheibe 13.6-2

**GEGENSTAND:** "Die Vorschau sendet nie" — die zweite Bau-Scheibe der Phase 13.6. Sie setzt
Owner-Entscheidung P13.6-13 um, in der Reihenfolge der Setzung P13.6-14. Zugeschnitten am
2026-09-29; der Plan folgt in einer eigenen Runde.

### Architekten-Setzungen zur Scheibe 13.6-2

PROVENIENZ aller vier: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der
Zuschnitt-Runde der Scheibe 13.6-2. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf. Die
Abgleiche mit dem Code sind CC, GELESEN AM CODE am Stand `9f57f24`, nicht live gemessen.

**Setzung P13.6-38 — REICHWEITE: "NIE" UMFASST JEDEN SENDEWEG, DEN PAGESMITH IN DIE VORSCHAU
EINBAUT.**
- Gemeint sind: Server-Beacon und Pixel-Bestätigung an `/api/e`, der Meta-Pixel (Lader
  `fbevents.js` und `fbq`), der Seitenaufruf, der Custom-Pixel der Phase 11.6 und
  Browser-Tags weiterer Ziele.
- GRUND: Der Grund der Owner-Entscheidung P13.6-13 — Klicks beim Gestalten landeten als
  Conversions in Messung und Gebotsoptimierung — trifft jeden dieser Wege gleich.
- Damit ist die an P13.6-13 offene Reichweitenfrage beantwortet. FOLGE (CC, ABGELEITET): Die
  "akzeptierte Marketer-eigene-Vorschau-Verschmutzung" der Phase 4
  (docs/claude-history/phase-4-mapping-codegen-export.md) ist damit aufgehoben; das Archiv bleibt
  unverändert.
- ABGLEICH MIT DEM CODE (CC), damit die Reichweite nicht für mehr gelesen wird, als sie heute
  trifft:
  · In die Vorschau (`generateFunctional` im Modus "preview", gerufen im Memo `functionalHtml`,
    src/components/CodeImporter.tsx) baut Pagesmith heute genau EINE Sende-Einheit: die
    Meta-Laufzeit (`buildMetaRuntime`, src/lib/tracking/meta.ts) — Lader, `fbq`, Beacon und
    Bestätigung, ausgelöst durch den Klick auf ein Element mit Track-Aktion.
  · Der Seitenaufruf kommt NICHT in die Vorschau: `buildPageViewScript` entsteht allein in
    `injectPageViewEmitter`, und dessen einziger Produktiv-Aufrufer ist `publishProject`.
  · Der Custom-Pixel kommt NICHT in die Vorschau: Entscheidung P11.6-6 (d) der Phase 11.6, gebaut
    in `generateFunctional`, Wächter T13 in src/lib/tracking/custom-pixel.test.ts.
  · Browser-Tags weiterer Ziele gibt es nicht; pinterest, tiktok, linkedin und google erreicht
    die Vorschau nur über den Beacon und den Fan-Out im Ingest (Vermerk P13.6-1, Punkte (2) und
    (10)).
  · Das Formular-Ziel sendet in der Vorschau nicht; seine Laufzeit entsteht nur im Modus
    "export" (Setzung P13-30 der Phase 13).
  Die Setzung gilt trotzdem in voller Breite: Sie bindet auch jeden Weg, der später in die
  Vorschau käme.

**Setzung P13.6-39 — GRENZE: SKRIPTE IM IMPORTIERTEN HTML DES BETREIBERS ERFASST DIE ENTSCHEIDUNG
NICHT; DIE OBERFLÄCHE WIRD NICHT ABGESCHALTET.**
- Wir fassen fremden Code nicht an; die Import-Bereinigung der Phase 11.11 zeigt solche Skripte
  an.
- Nicht abgeschaltet werden: Weiterleitungen, Textersetzungen und der Einwilligungs-Dialog, wie
  gestaltet.
- ABWEICHUNG, GEMELDET (CC): Der Einwilligungs-Dialog erscheint heute in der Vorschau NICHT.
  Leiste oder Modal, Wiederherstellung, Widerruf und Setzer entstehen allein in
  `injectPageViewEmitter` beim Veröffentlichen; `generateFunctional` hängt nur das Gate ein
  (`CONSENT_SCRIPT_ID`, `buildConsentRuntimes`). Derselbe Befund steht als Nachtrag vom
  2026-09-17 im Archiv der Phase 11.13 ("Weder der Editier- noch der Vorschau-Rahmen zeigt den
  Einwilligungs-Dialog"), und eine Vorschau des Dialogs im Editor war dort ausgeschlossen. Am
  Dialog hat diese Scheibe nichts zu erhalten; was sie in der Vorschau erhält, sind
  Weiterleitungen und Textersetzungen.
- GEMELDET, NICHT ENTSCHIEDEN (CC, ABGELEITET): Pagesmith-Bausteine aus einem FRÜHEREN Export,
  die im importierten HTML stehen (Klasse "eigen" der Phase 11.11), sind von uns erzeugte
  Sendewege, stehen aber im HTML des Betreibers. Nach dieser Grenze erfasst die Entscheidung sie
  nicht. Das Memo `functionalHtml` fragt `hasOwnBlocks` nicht; solche Bausteine laufen in der
  Vorschau und senden an das Projekt, aus dem sie exportiert wurden. Veröffentlichen und Export
  sind in diesem Zustand gesperrt, die Vorschau nicht.

**Setzung P13.6-40 — BINDUNG: VERÖFFENTLICHTE SEITEN UND EXPORTE BLEIBEN BYTE-GLEICH; DER SCHUTZ
BEKOMMT EINEN WÄCHTER-TEST.**
- Nachweis gegen einen Vorher-Wert, erhoben vor der ersten Code-Änderung.
- Wächter nach der Dauerregel "NUR EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT
  IST KEINER": Heute besteht der Schutz nur als Nebeneffekt der falschen `NEXT_PUBLIC_APP_URL`
  (Vorrat P13.6-12 der Phase 13.6).
- ABGLEICH MIT DEM CODE (CC): Auch dieser Nebeneffekt deckt nur Beacon und Bestätigung. Lader und
  `fbq` hängen allein an der Pixel-ID (`buildMetaRuntime`); wo eine gesetzt ist, sind sie in der
  Vorschau heute gebaut und werden beim Track-Klick gerufen. Ob `fbevents.js` im Rahmen lädt und
  bei Meta etwas ankommt, ist NICHT gemessen.

**Setzung P13.6-41 — FOLGE: ERST NACH DIESER SCHEIBE WIRD `NEXT_PUBLIC_APP_URL` KORRIGIERT.**
- Bestätigt die Reihenfolge der Setzung P13.6-14; dort steht der Grund.

### Grenzen der Scheibe 13.6-2

- Veröffentlichte Seiten und Exporte ändern sich nicht (Setzung P13.6-40).
- Die Entscheidung gilt dem Editor, nicht der Umgebung — auch die lokale Vorschau (`next dev`)
  ist gemeint (Owner-Entscheidung P13.6-13, "EBENFALLS ABGELEITET").
- Tracking ist im Editor nicht mehr zu prüfen; geprüft wird an der veröffentlichten Seite
  (Grund der Owner-Entscheidung P13.6-13).

## Noch nicht geschnittene Arbeit

**Arbeit P13.6-5 — AUFKLÄRUNG A2: SICHERHEITS-INFRASTRUKTUR, DATENBANK, GEHEIMNISSE**
(ARCHITEKT 2026-09-29; die Fragen aus dem A1-Bericht, CC, 2026-09-29). Zu beantworten:
- Rate-Limiting und Bot-Schutz des neuen Endpunkts; Abgrenzung zu Phase 14 (Per-Tenant-
  Rate-Limiting auf /api/e + /api/capi).
- SSRF-Schutz bei Kunden-Adressen, samt B-1 (Vorrat P13.6-6).
- Verwahrung von Kunden-API-Schlüsseln, der Chiffrier-Schlüssel, `project_secrets` — Trigger
  (i) des offenen Punktes "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets
  BLEIBT", der CHECK `project_secrets_target_valid`, die Grant-Vorgabe ab dem 30.10.2026. Dafür
  werden docs/db-stand.md und docs/db-regeln.md geladen (Pflicht-Stopp in CLAUDE.md); A1 hat
  sie nicht geladen.
- Laufzeit, Timeouts und Concurrency eines Relay-Aufrufs, der auf eine Anbieter-Antwort wartet.
- AVV.
- DURCHGEFÜHRT 2026-09-29: Vermerk P13.6-19 der Phase 13.6 (read-only).

**Arbeit P13.6-26 — LESUNG: WAS VERCEL PROTOKOLLIERT (RÜMPFE, QUERY, IP)** (ARCHITEKT
2026-09-29). VORBEDINGUNG des ersten Relay-Codes — Bedingung (2) der Owner-Entscheidung
P13.6-16. Heute nicht gelesen (Vermerk P13.6-19, Punkt (8)). Die Methode ist die der Dauerregel
"ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN …"; der Befund geht nach
docs/plattform-befunde.md, Vercel-Abschnitt.

**Arbeit P13.6-27 — DIE HOST-LISTE DER WEBHOOK-DIENSTE (RECHERCHE)** (ARCHITEKT 2026-09-29).
Grundlage der Stufe 1 (Owner-Entscheidung P13.6-17). BEZUG: docs/formular-empfaenger-befunde.md
— Make ist dort gelesen und gemessen, Zapier nicht. Neue Befunde gehen in jene Datei (Dauerregel
"EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN …").

## Vorrat (gemeldet, nicht gebaut)

**Vorrat P13.6-6 — B-1: DIE EIGEN-LISTE DER FORMULAR-ZIELE KENNT KEINE CUSTOM-DOMAINS UND KEIN
`*.vercel.app` — EINE ZIELADRESSE DORTHIN TRÄGT FORMULARINHALTE IN UNSER DEPLOYMENT**
(ABGELEITET am Code, CC, 2026-09-29, Stand `a3797d9`; NICHT gemessen). GEGEN Entscheidung P13-7
der Phase 13, unter einer Bedingung.
- Befund: `ownFormTargetDomains` (src/lib/form-target.ts) liefert `lvh.me`,
  `NEXT_PUBLIC_HOSTING_DOMAIN` samt Unterdomänen und den Host von `NEXT_PUBLIC_APP_URL`. Die
  Laufzeit-Wache in `buildFormTargetRuntime` vergleicht nur mit dem Ursprung der Seite selbst.
- Die Bedingung: Der Betreiber trägt eine Adresse auf einer Custom-Domain ein, die Pagesmith
  ausliefert (auch einer eines anderen Projekts), oder auf einem `*.vercel.app`-Host (App-Host
  nach `isAppHost`).
- Folge: Der Rumpf aus `URLSearchParams` erreicht unser Deployment — im Serving-Zweig über die
  Umschreibung auf die Serve-Route oder auf `/api/e` (`handleIngest` antwortet mit 400, weil
  `JSON.parse` scheitert), auf `*.vercel.app` über `updateSession` mit Umleitung auf `/login`.
- Unser Code persistiert und loggt auf keinem dieser Wege etwas. NICHT ENTSCHEIDBAR: ob Vercel
  den Rumpf ablegt.
- BEZUG: offener Punkt "isAppHost-PLATZHALTER" (docs/offene-punkte.md, Ergänzung vom
  2026-09-28) — dort steht der `*.vercel.app`-Teil bereits, in der Lesung "eigene Hosts";
  Vorrat P13-39 der Phase 13 (die doppelte Lesung der Hosting-Domäne). Neu hier: die Lesung
  gegen P13-7 und die Custom-Domains.
- GESETZT ALS ERSTE BAU-SCHEIBE: Setzung P13.6-3.
- ZUGESCHNITTEN am 2026-09-29: Abschnitt "Zuschnitt Scheibe 13.6-1" (Setzung P13.6-34).
- ERLEDIGT 2026-09-29, Bau-Commit `9fae014`: `*.vercel.app` in der Eigen-Liste, Prüfung auf
  Custom-Domains in `publishProject`. Die Custom-Domain-Sperre ist nur im Test belegt, nicht live
  (Vermerk P13.6-37, Punkt (7)).

**Vorrat P13.6-7 — B-2: DER NATIVE RÜCKFALL EINES FORMULARS MIT ZIEL SCHICKT AN DIE EIGENE
SEITENADRESSE — BEI GET STEHEN DIE FELDWERTE IM QUERY UND REISEN VON DORT WEITER**
(ABGELEITET am Code, CC, 2026-09-29, Stand `a3797d9`; NICHT gemessen). GEGEN Entscheidung P13-7
der Phase 13, unter einer Bedingung.
- Befund: Ein Formular mit Ziel trägt keine fremde absolute `action` (Setzung P13-31 der Phase
  13). Ruft der submit-Listener aus `buildWiringScript` (src/lib/generate.ts) kein
  `preventDefault`, schickt der Browser nativ an die eigene Seitenadresse — auf einer
  gehosteten Seite unsere Serve-Route. Beim Default `method=GET` stehen die Feldwerte im Query
  dieser Anfrage.
- Die Bedingung — wann der Listener nicht greift: JavaScript aus oder unser Skript läuft nicht
  (ABGELEITET); `form.submit()` löst kein `submit` aus, und ein Capture-Handler des Betreibers
  an `window` mit `stopPropagation` hält uns an (Roadmap-Zeile 13, Punkt (7) der Liste beim
  Haken).
- Folge: Löst die neu geladene Seite danach einen Klick-Track aus, trägt `eventSourceUrl:
  location.href` die Werte an `/api/e` und an meta, pinterest und tiktok;
  `stripForeignClickIds` entfernt nur fremde Klick-Kennungen.
- Unser Code persistiert und loggt die Adresse nicht (`persistEvent`, Serve-Route ohne
  `console`). NICHT ENTSCHEIDBAR: was die Plattform-Logs von Vercel mit dem Query tun.
- Invariante I2 der Phase 13 deckt nur die Adresse der Danke-Seite, nicht diesen Weg.
- BEZUG: offener Punkt "DIE SEITENADRESSE REIST SAMT QUERY AN UNSEREN SERVER UND AN DREI ZIELE
  — WAS IM QUERY STEHT, REIST MIT" (docs/offene-punkte.md, Ergänzung vom 2026-09-29);
  Nachtrag an der Roadmap-Zeile 13 vom 2026-09-29.
- GESETZT ALS ERSTE BAU-SCHEIBE: Setzung P13.6-3.
- GEMESSEN 2026-09-29: Vermerk P13.6-31. ZUGESCHNITTEN am 2026-09-29: Abschnitt "Zuschnitt
  Scheibe 13.6-1" (Setzungen P13.6-32 und P13.6-33).
- ERLEDIGT 2026-09-29, Bau-Commit `9fae014`: Der Rückfall ohne JavaScript geht an die
  eingetragene Adresse, live gemessen (Vermerk P13.6-37, Punkt (3), L4). Neu veröffentlicht werden
  muss jede Seite mit Formular-Ziel; bis dahin gilt der Befund für sie weiter.

**Vorrat P13.6-8 — DREI KOMMENTARE IN src/ NENNEN "DIE STANDDATEI" OHNE PHASE ODER "I1 BIS I10",
OBWOHL I9 ENTFALLEN IST** (GELESEN AM CODE, CC, 2026-09-29). NUR GEMELDET, NICHT ANGEFASST.
- Kopfkommentar von src/lib/form-target.ts: "stehen in der Standdatei der Phase 13 (Zuschnitt
  Scheibe 13-1): Invarianten I1 bis I10" — die Phase ist genannt, "I1 bis I10" ist falsch.
- src/lib/form-target.test.ts, Kopf des Blocks "FORMULAR-ZIEL (Phase 13, Scheibe 13-1)": "der
  Massstab sind die Invarianten I1–I10 im Zuschnitt 13-1 der Standdatei" — ohne Phase, und
  "I1–I10".
- src/lib/form-target.test.ts, Kopf des Blocks "SCHEIBE 13-1c — AUTOMATISCHE BENENNUNG DER
  FORMULARFELDER": "im Zuschnitt 13-1c der Standdatei" — ohne Phase.
- Folge: Seit dem Anlegen dieser Datei trägt der Pfad docs/aktiver-stand.md die Phase 13.6;
  ein Kommentar ohne Phase zeigt damit auf eine falsche Datei (Dauerregel "EINE ABLAGE MIT
  HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE …").
- BEZUG: Der Kopf des Archivs der Phase 13 führt dieselben drei Stellen als "GEMELDET, NICHT
  ANGEFASST" und löst sie über Phase bzw. Scheibe auf jenes Archiv auf.
- KEIN TRIGGER GESETZT.
- ERLEDIGT 2026-09-29, Bau-Commit `9fae014` (Setzung P13.6-36, F8): alle drei Kommentare nennen
  "I1 bis I8 und I10" bzw. J1–J9 mit Phase 13 und Archivpfad.

**Vorrat P13.6-9 — ZWEI LISTEN DESSELBEN GEGENSTANDS: DIE DURCHGELASSENEN API-PFADE**
(GELESEN AM CODE, CC, 2026-09-29).
- `proxy` (src/proxy.ts) lässt `/api/e` und `/api/capi` EXAKT durch; `isPublicRoute` in
  `updateSession` (src/lib/supabase/middleware.ts) nimmt `/api/capi` als PRÄFIX und `/api/e`
  exakt.
- Heute folgenlos; ein neuer öffentlicher Pfad muss in beide Listen, und nichts wird rot, wenn
  er in einer fehlt.
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-10 — `sanitizeProviderText` IN `forwardToPinterest` IST UNGEPRÜFT**
(CC, 2026-09-29). Die Aussage in Vermerk P13.6-1, Punkt (4), dass pinterest Fremdtext über
diesen Helfer loggt, ist GELESEN am Aufruf; sein Rumpf ist nicht gelesen. Ob er ein
zurückgespiegeltes Besucher-Merkmal schwärzt, ist offen.
- KEIN TRIGGER GESETZT.
- BEANTWORTET 2026-09-29 (Vermerk P13.6-19 der Phase 13.6, Punkt (9)): Der Rumpf ist gelesen —
  dasselbe Muster wie `redactOpaque` (Folgen ab 20 Zeichen aus `[A-Za-z0-9_-]`), dazu Kappung
  auf 200 Zeichen. Ein zurückgespiegeltes Besucher-Merkmal wie IP oder User-Agent überstünde
  es (ABGELEITET aus dem Muster).

**Vorrat P13.6-11 — DREI FRAGEN, DIE AM CODE NICHT ENTSCHEIDBAR SIND** (CC, 2026-09-29).
- Der Wert von `NEXT_PUBLIC_APP_URL` in Produktion — und damit, ob exportierte Beacons durch
  `updateSession` oder durch den Serving-Zweig laufen. Er steht in der Vercel-Umgebung, nicht im
  Repo. BEZUG: Der offene Punkt "isAppHost-PLATZHALTER" sagt "In Prod heute harmlos (nur
  *.vercel.app ist relevant)"; das ist keine Messung dieses Wertes.
  BEANTWORTET 2026-09-29: Vorrat P13.6-12 der Phase 13.6 (eingebackener Wert
  `http://localhost:3000`, gemessen am Export).
- Ob Vercel Rümpfe, Query oder IP in seinen Logs ablegt.
- Ob `auth.getUser()` in `updateSession` ohne Sitzungs-Cookie einen Netzruf kostet.
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-12 — `NEXT_PUBLIC_APP_URL` IST IN PRODUCTION `http://localhost:3000` — DIE BEACONS
EXPORTIERTER SEITEN ERREICHEN UNSEREN SERVER NIE** (2026-09-29).
- BEFUND, GEMESSEN (OWNER, live, 2026-09-29): Eine aus der Produktions-App exportierte Seite
  trägt `navigator.sendBeacon("http://localhost:3000/api/e", …)`.
- URSACHE, OWNER-ANGABE (2026-09-29): Die lokale `.env.local` wurde als Ganzes in Vercel
  importiert; Production trägt deshalb `NEXT_PUBLIC_APP_URL=http://localhost:3000`.
- FOLGE, ABGELEITET (nicht gemessen): Die Beacons exportierter Seiten erreichen unseren Server
  nie — keine Server-Ereignisse, kein Forward, keine Bestätigungszeile. Das Browser-Pixel
  feuert weiter; deshalb fällt es nicht auf. Bereits exportierte Dateien behalten die Adresse
  (Dauerregel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY"). Heute kein fremder
  Nutzer, kein Schaden ausser an den eigenen Exporten des Owners.
- BEZUG: Vermerk P13.6-1, Punkt (6) (exportierte Seiten beaconen absolut an
  `NEXT_PUBLIC_APP_URL`, über `getCapiProxyUrl`); Vorrat P13.6-6 (B-1: `ownFormTargetDomains`
  liest den Host dieses Werts). Die Messung beantwortet für den EXPORT die erste Frage von
  Vorrat P13.6-11.
- AUS DER AUFKLÄRUNG DERSELBEN RUNDE (CC, 2026-09-29, HEAD `9df051a`; GELESEN AM CODE bzw.
  GEMESSEN AM REPO), damit die Korrektur nicht ohne sie geschnitten wird:
  (a) Der Wert hat genau ZWEI Leser: `getCapiProxyUrl` (src/lib/capi/proxy.ts) und
      `ownFormTargetDomains` (src/lib/form-target.ts). `getCapiProxyUrl` speist den EXPORT
      (`buildExportDocument`) UND die FUNKTIONALE VORSCHAU des Editors (`generateFunctional`
      mit Modus "preview" in src/components/CodeImporter.tsx); die Vorschau baut den Beacon
      samt Bestätigung (`buildMetaRuntime`). OAuth-Rückkehr (`GOOGLE_OAUTH_REDIRECT_URI`),
      Cookies und `isAppHost` hängen NICHT daran.
  (b) ABGELEITET: Nach der Korrektur schickt jeder Track-Klick in der funktionalen Vorschau der
      Produktions-App einen echten Beacon an `/api/e` — Zeilen in `events` und ein Forward an
      jedes konfigurierte Ziel. Was der Beacon der Vorschau heute an `http://localhost:3000`
      bewirkt, ist am Code NICHT ENTSCHEIDBAR (Browser-Regeln für lokale Adressen; ein
      laufender lokaler Server). BEZUG: docs/claude-history/backlog-polish.md, Eintrag
      "P11.6-3 — DIE VORSCHAU FEUERT ECHTE EREIGNISSE …".
  (c) GEMESSEN AM REPO, NUR NAMEN (`cut -d= -f1`): `.env.local` trägt u. a.
      `META_TEST_EVENT_CODE`, `GOOGLE_OAUTH_REDIRECT_URI`, `SECRET_ENC_KEYS`,
      `SECRET_ENC_ACTIVE_KEY_ID` und `NEXT_PUBLIC_HOSTING_DOMAIN` (lokaler Wert `lvh.me:3000`).
      Ob Vercel Production diese Werte seit dem Import trägt, ist am Repo NICHT ENTSCHEIDBAR;
      das prüft der Owner im Dashboard. Betroffen wären der offene Punkt "DER CODE TRÄGT EINEN
      DEPLOYMENT-WEITEN TESTMODUS-HEBEL …" und die OAuth-Rückkehr (offener Punkt "DIE ZWEI
      REGISTRIERTEN WEITERLEITUNGS-ADRESSEN LIEGEN AUSSERHALB DES REPOS").
- STATUS: Die Korrektur in Vercel ist AUSGESETZT, bis die Leser des Werts und die übrigen
  Namen aus (c) geklärt sind (Auftrag der Runde vom 2026-09-29).
- KEIN TRIGGER GESETZT.
- NACHGEZOGEN 2026-09-29 (Runde "Vorschau, Vercel-Befunde, Reihenfolge"):
  (d) DIE NAMEN IN VERCEL — OWNER-ANGABE 2026-09-29, aus dem Dashboard kopiert, nur Namen; der
      Umgebungs-Scope je Name ist daraus nicht ersichtlich: `SECRET_ENC_ACTIVE_KEY_ID`,
      `SECRET_ENC_KEYS`, `GOOGLE_OAUTH_REDIRECT_URI`, `GOOGLE_OAUTH_CLIENT_SECRET`,
      `GOOGLE_OAUTH_CLIENT_ID`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`,
      `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `POSTGRES_URL`, `POSTGRES_PRISMA_URL`,
      `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`,
      `POSTGRES_DATABASE`, `SUPABASE_URL`, `SUPABASE_JWT_SECRET`, `SUPABASE_ANON_KEY`,
      `VERCEL_PROJECT_ID`, `VERCEL_API_TOKEN`, `NEXT_PUBLIC_HOSTING_DOMAIN`,
      `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
      `NEXT_PUBLIC_APP_URL`.
      ABGLEICH MIT DEM CODE (CC, gegen die Liste der gelesenen Namen aus der Aufklärung vom
      2026-09-29): Jeder Name, den der Code braucht, steht darin. Es fehlen nur Namen, deren
      Fehlen gewollt oder folgenlos ist — `META_TEST_EVENT_CODE`, `TIKTOK_TEST_EVENT_CODE`
      (sollen in Production fehlen), `META_GRAPH_VERSION` (Rückfall `v25.0` in
      src/lib/capi/config.ts), `NEXT_PUBLIC_ABUSE_CONTACT` (bewusst leer, CLAUDE.md, Tier 0).
      Gegen `.env.local` fehlen `META_TEST_EVENT_CODE` und `VERCEL_TEAM_ID` (vom Code nicht
      gelesen); dreizehn Namen stehen darin, die `.env.local` nicht trägt — Vorrat P13.6-15
      der Phase 13.6. Der Bestand in Vercel ist also nicht deckungsgleich mit `.env.local`.
  (e) DIE TESTMODUS-CODES: `META_TEST_EVENT_CODE` und `TIKTOK_TEST_EVENT_CODE` stehen nicht in
      der Liste. OWNER-ANGABE 2026-09-29: vor einigen Wochen entfernt. Deckt sich mit dem
      offenen Punkt "DER CODE TRÄGT EINEN DEPLOYMENT-WEITEN TESTMODUS-HEBEL …" ("In Vercel sind
      beide Variablen seit dem 2026-09-11 gelöscht", OWNER-ANGABE); dort die Ergänzung vom
      2026-09-29.
  (f) `NEXT_PUBLIC_HOSTING_DOMAIN` — die Frage aus (c) ist so gut wie aufgelöst, ABGELEITET, nicht
      gemessen: Vercel baut bei jedem Push auf `main` neu (docs/arbeitsweise.md, "Hosting +
      Deploy via `push → main`"), und am 2026-09-28 lief eine veröffentlichte Seite unter
      publayer.net (Vermerk P13-22 der Phase 13). Ein lokaler Wert (`lvh.me:3000`) hätte das
      gehostete Ausliefern seit dem Import gebrochen (`extractLabel`,
      src/lib/hosting/host.ts). FOLGE FÜR DEN KORREKTURSCHRITT: Ein Redeploy backt keinen
      Hosting-Wert neu ein, der nicht schon eingebacken ist.
  (g) `GOOGLE_OAUTH_REDIRECT_URI`: Wert ungelesen. Die Probe ist das nächste Google-Verbinden —
      der Zugang des Testprojekts läuft "um den 2026-10-01" ab (docs/offene-punkte.md, "DIE
      SIEBEN-TAGE-FRIST UND DER STATUSWECHSEL AUF "IN PRODUKTION""). Landet der Owner nach der
      Zustimmung in der App, stimmt der Wert.
  (h) Die erste Frage aus Vorrat P13.6-11 der Phase 13.6 (der Wert von `NEXT_PUBLIC_APP_URL` in
      Produktion) ist mit diesem Eintrag beantwortet; dort steht der Rückverweis.
  STATUS, NACHGEZOGEN: Die Korrektur folgt erst nach Scheibe 2 (Setzung P13.6-14 der Phase
  13.6). Der Satz "AUSGESETZT, bis … geklärt" darüber beschreibt den Stand vor dieser Runde.

**Vorrat P13.6-15 — IM DEPLOYMENT LIEGEN GEHEIMNISSE, DIE DER CODE NICHT LIEST — DARUNTER SOLCHE
MIT DIREKTEM DATENBANKZUGANG** (2026-09-29).
- DIE NAMEN (OWNER-ANGABE, Vorrat P13.6-12, Punkt (d)): `POSTGRES_URL`, `POSTGRES_PRISMA_URL`,
  `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`,
  `POSTGRES_DATABASE`, `SUPABASE_JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
  `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- NICHT GELESEN (GEMESSEN AM REPO, CC, 2026-09-29, HEAD `b366336`): `git grep -w` über alle
  verfolgten Dateien ausser docs/ und Markdown — 0 Treffer für jeden der dreizehn Namen.
  `-w`, weil `SUPABASE_URL` und `SUPABASE_ANON_KEY` Teil der gelesenen Namen
  `NEXT_PUBLIC_SUPABASE_URL` bzw. `NEXT_PUBLIC_SUPABASE_ANON_KEY` sind. POSITIVKONTROLLE:
  `NEXT_PUBLIC_SUPABASE_URL` trifft mit derselben Suche sieben Dateien.
- HERKUNFT, ABGELEITET (ARCHITEKT), NICHT GEPRÜFT: nach dem Muster der Namen die
  Vercel-Supabase-Integration.
- WARUM ER HIER STEHT (ARCHITEKT 2026-09-29, EINORDNUNG, nicht geprüft): `POSTGRES_PASSWORD`,
  `POSTGRES_URL*` und `SUPABASE_JWT_SECRET` sind Geheimnisse mit direktem Datenbankzugang; sie
  liegen im Deployment, ohne gebraucht zu werden. Die Regel "Ausschliesslich über den Supabase-JS-Client
  … Keine direkte PostgreSQL-Verbindung" (CLAUDE.md, "## Code-Qualität …", Block A) bindet den
  Code, nicht das, was im Deployment bereitliegt.
- HEUTE KEINE HANDLUNG. KANDIDATEN FÜR SPÄTER, NICHT ENTSCHIEDEN: entfernen · oder bewusst
  lassen, falls die Integration sie verwaltet.
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-28 — DER KOPFKOMMENTAR VON `cipher.ts` BEHAUPTET, SIE HABE IM PRODUKTIVCODE
KEINEN AUFRUFER; ES GIBT FÜNF** (GELESEN AM CODE, CC, 2026-09-29, Stand `6f8ef1a`). NUR
GEMELDET, NICHT ANGEFASST.
- Der Kopf von src/lib/secrets/cipher.ts sagt "SIE HAT IM PRODUKTIVCODE HEUTE KEINEN
  AUFRUFER — nur ihre Tests rufen sie".
- Aufrufe (GEMESSEN AM REPO, Suche `encryptSecret(|decryptSecret(` ausserhalb der Tests):
  `encryptSecret` in src/app/api/oauth/google/callback/route.ts und
  src/lib/oauth/token-refresh.ts; `decryptSecret` in src/lib/capi/token.ts,
  src/lib/oauth/token-refresh.ts und src/app/projects/actions.ts.
- BEZUG: Dauerregel "EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT — UND ER VERMEHRT
  SICH".
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-29 — DER INGEST PRÜFT `domains.blocked_at` NICHT, DIE SERVE-ROUTE SCHON**
(GELESEN AM CODE, CC, 2026-09-29, Stand `6f8ef1a`).
- `resolvePublished` (src/lib/hosting/resolve.ts) prüft `domains.blocked_at` und
  `projects.blocked_at`; `getCapiConfigByTrackingKey` (src/lib/capi/token.ts) liest allein
  `projects.blocked_at`.
- DIE SERVE-HÄLFTE STEHT SCHON IM BESTAND — HIER NUR DER ZEIGER: CLAUDE.md, Tier 0,
  "KILL-SWITCH" ("domains.blocked_at additiv vorbereitet + im Serve-Check schon mitgeprüft,
  operativ noch nicht gesetzt"), und die Vollfassung in
  docs/claude-history/security-manifest-full.md ("Sie wird heute von KEINEM Code-Pfad
  geschrieben; operativ ist sie nicht in Gebrauch"). NEU ist allein die Ingest-Hälfte: Wird
  `domains.blocked_at` einmal gesetzt, liefert die Serve-Route 451, der Ingest nimmt Beacons
  derselben Seite weiter an (ABGELEITET).
- BEZUG: Setzung P13.6-23 (ein eigener fail-closed-Zweig im Relay).
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-30 — `published_content.mappings` IST DER STAND DES CLIENTS; DER SERVER KANN NICHT
PRÜFEN, OB ER ZUM AUSGELIEFERTEN HTML PASST** (GELESEN AM CODE, CC, 2026-09-29, Stand
`6f8ef1a`).
- `publishProject` (src/app/projects/actions.ts) nimmt `functionalHtml` und `snapshot.mappings`
  vom Client entgegen und legt beide ab; das HTML entsteht im Client (`generateFunctional`).
- Der Server parst kein HTML (Dauerregel "KEIN SERVER-SEITIGES HTML-PARSING") und kann den
  Datenblock im HTML deshalb nicht gegen `mappings` halten (ABGELEITET).
- BEZUG: Setzung P13.6-20 — ein Relay, das die Adresse aus `published_content.mappings` liest,
  vertraut darauf, dass beide übereinstimmen.
- KEIN TRIGGER GESETZT.
