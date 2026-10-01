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
- Zuschnitt Scheibe 13.6-3
- Zuschnitt Scheibe 13.6-4
- Zuschnitt Scheibe 13.6-5
- Zuschnitt Scheibe Zurück-Cache
- Zuschnitt Scheibe Zapier ins Relay
- Zuschnitt Scheibe Beacon bei Erstveröffentlichung
- Zuschnitt Scheibe Spaltenrechte
- Plattform-Schritte der Phase 13.6
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
- UMGESETZT 2026-09-29: Scheibe 13.6-2 der Phase 13.6, Bau-Commit `8be7bb3`, live bestanden
  (Vermerk P13.6-45). Die GRENZE und der Satz über die lokale Vorschau darüber beschreiben den
  Stand davor.

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
- BESTÄTIGT UND PRÄZISIERT 2026-09-29: Owner-Entscheidungen P13.6-54 (Betriebsart) und P13.6-55
  (Dienste der Stufe 1: Make und Zapier) der Phase 13.6. Die Auslegung darüber bleibt als Stand
  vor jener Runde stehen.

**Owner-Entscheidung P13.6-18 — DAS RELAY WIRD FÜR FREMDE NUTZER ERST FREIGESCHALTET, WENN EIN
KUNDEN-AVV STEHT.**
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-29, dieselbe Runde. BINDEND.
- Der Owner baut und testet vorher selbst; vor dem ersten fremden Nutzer steht der AVV.
- BEZUG: Tier-0-Item "SUBPROZESSOR-DPAs + Kunden-DPA" (CLAUDE.md, "## Security Manifest &
  Launch Blocker"); die Fundstellen stehen in Vermerk P13.6-19, Punkt (10).

PROVENIENZ von P13.6-54 und P13.6-55: OWNER-ENTSCHEIDUNG 2026-09-29, übermittelt im Auftrag der
Runde "Region festhalten, Owner-Entscheidungen Relay, Zuschnitt 13.6-3". BINDEND.

**Owner-Entscheidung P13.6-54 — BETRIEBSART: FÜR BEKANNTE WEBHOOK-DIENSTE IST DAS RELAY DER
STANDARD; DER DATENSPARMODUS IST JE ZIEL EIN SCHALTER.**
- Liegt die Zieladresse eines Formular-Ziels bei einem bekannten Webhook-Dienst der Host-Liste,
  gilt das Relay als Standard. Der Betreiber kann je Ziel den Datensparmodus (browser-direkt)
  einschalten.
- Zieladressen ausserhalb der Host-Liste bleiben browser-direkt.
- IM DATENSPARMODUS gelten Entscheidungen P13-2 und P13-7 der Phase 13 unverändert
  (Owner-Entscheidung P13.6-16).
- BEZUG, AM WORTLAUT GELESEN (CC, 2026-09-29), NICHT AUFGELÖST: Die Entscheidung nennt Exporte
  nicht. Setzung P13.6-20 beschränkt das Relay auf veröffentlichte, gehostete Seiten; ein
  Formular-Ziel in einem Export bliebe danach browser-direkt, auch bei einer Adresse der
  Host-Liste. Ob "Standard" so gemeint ist, sagt der Wortlaut nicht.
- GRENZE, AUSLEGUNG DES ARCHITEKTEN (2026-09-29, Setzung P13.6-59, Q11; dem Owner mitgeteilt):
  EXPORTE BLEIBEN BROWSER-DIREKT, auch wenn ihre Adresse auf der Host-Liste steht. Für einen
  Export gibt es weder eine geprüfte Serverfassung noch einen Host, aus dem das Relay das
  Projekt bestimmen könnte (Setzungen P13.6-20 und P13.6-57).

**Owner-Entscheidung P13.6-55 — DIENSTE DER STUFE 1: MAKE UND ZAPIER. EIN DIENST KOMMT ERST IN
DIE HOST-LISTE, WENN SEINE WEBHOOK-ADRESSEN GELESEN UND EINMAL LIVE GETESTET SIND.**
- Für Zapier steht beides aus (docs/formular-empfaenger-befunde.md trägt keinen Abschnitt
  "Zapier"; Arbeit P13.6-27).
- FOLGE, AM BESTAND GELESEN (CC, 2026-09-29): Für Make ist die Adresse erst für EINE Zone
  gemessen — `hook.eu2.make.com` (docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befund
  (s)). Welchen Host die Adressen der Zonen eu1, us1 und us2 tragen, steht auf keiner gelesenen
  Seite (ebenda, Befund (g); Messkandidat M8 teilweise offen). Nach dieser Entscheidung trägt die
  Host-Liste für Make deshalb heute allein `hook.eu2.make.com`.
- FORTGESCHRIEBEN 2026-09-30: Für Zapier ist die Lesung erledigt (docs/formular-empfaenger-befunde.md,
  Abschnitt "Zapier"); der Live-Test und damit die Aufnahme folgen gebündelt vor dem Launch —
  Owner-Entscheidung P13.6-90 der Phase 13.6. Der erste Punkt darüber beschreibt den Stand davor.
- FORTGESCHRIEBEN 2026-09-30 (Runde "Adresse verbergen: entschieden"): Die Bündelung ist
  revidiert — Owner-Entscheidung P13.6-97 der Phase 13.6 (Zapier jetzt). Die Bedingung dieser
  Entscheidung (gelesen UND einmal live getestet) gilt unverändert.
- ERFÜLLT FÜR ZAPIER 2026-10-01: gelesen (Abschnitt "Zapier" der Befund-Datei), live getestet vor
  dem Push (Vermerk P13.6-102 der Phase 13.6); `hooks.zapier.com` steht seit Bau-Commit
  `93230df` in `RELAY_HOSTS` (Vermerk P13.6-103). Für Make bleibt es bei der Zone eu2.

PROVENIENZ von P13.6-71: OWNER-ENTSCHEIDUNG 2026-09-30, übermittelt im Auftrag der
Abschluss-Runde der Scheibe 13.6-4. BINDEND. (Die Überschrift dieses Abschnitts nennt das
Anlagedatum der Datei; der Eintrag trägt sein eigenes.)

**Owner-Entscheidung P13.6-71 — NACH DER RÜCKKEHR ZUR FORMULARSEITE IST DAS FORMULAR WIEDER
ABSENDBAR. EIN ERNEUTES ABSENDEN WIRD ZUGESTELLT, ABER NICHT NOCH EINMAL GETRACKT.**
- Setzung P13-26 der Phase 13 ("einmal je Formular und Seitenleben") bleibt.
- GRUND: Ein Besucher, der zurückgeht, will meist etwas korrigieren; ein korrigierter Lead wiegt
  mehr als ein vermiedenes Duplikat.
- DER BEFUND, AUF DEN SIE ANTWORTET (GELESEN AM CODE, CC, 2026-09-30, Stand `3b631a2`):
  · Nach einem erfolgreichen Absenden wird die Sperre `__psFormTargetBusy` nicht gelöst —
    `free()` läuft allein über `fail()` (`__psFormTargetSend`, Text aus
    `buildFormTargetRuntime`, src/lib/form-target.ts), im Relay-Weg (Status 204) wie im
    direkten Weg (`opaque`). BESTAND SEIT `434dc86` (Scheibe 13-1 der Phase 13).
  · `preventDefault` steht im submit-Listener VOR dem Versand (`formTargetBranch`,
    src/lib/generate.ts); ein gesperrter Klick endet deshalb stumm — kein nativer Versand,
    kein fetch, keine Meldung.
  · Es gibt keinen `pageshow`-Handler (GEMESSEN AM REPO: 0 Treffer für `pageshow`,
    `persisted`, `pagehide` in src/ ausserhalb der Tests und im Live-Text; Positivkontrolle
    `keepalive`).
  · Kein Test legt das Verhalten nach Erfolg fest: F4 (src/lib/form-target.test.ts) gilt der
    Sperre WÄHREND eines Versands, K3a dem Zeitlimit.
  · ABGELEITET: Stellt der Browser die Seite beim Zurückgehen aus dem Zurück-Cache (bfcache)
    wieder her, lebt der Zustand weiter, die Sperre bleibt gesetzt, jeder Klick endet stumm.
    Mit dem Beobachteten in L1 (Vermerk P13.6-70, Punkt (3)) verträglich.
  · NICHT GEMESSEN: ob L1 tatsächlich ein bfcache-Fall war, und warum der zweite Versuch noch
    ging.
  · GEMESSEN 2026-09-30 (OWNER, nur Chrome): Vermerk P13.6-85 der Phase 13.6 — tot genau in den
    Runden mit Wiederherstellung aus dem Zurück-Cache, auf dem Relay-Weg und im Datensparmodus.
    Warum in L1 der zweite Versuch ging, bleibt ungemessen (ebenda, Punkt (7)).
- UMSETZUNG: Arbeit P13.6-72 der Phase 13.6.
  UMGESETZT 2026-09-30: Bau-Commit `29d0d22`, Live-Test bestanden (nur Chrome) — Vermerk
  P13.6-89 der Phase 13.6. "Nicht noch einmal getrackt" ist allein im Test belegt (ebenda,
  Punkt (8)).

PROVENIENZ von P13.6-90: OWNER-ENTSCHEIDUNG 2026-09-30, übermittelt im Auftrag der Runde "Zapier —
Anbieter-Lesung (Crawl-Bauform)". BINDEND. (Die Überschrift dieses Abschnitts nennt das
Anlagedatum der Datei; der Eintrag trägt sein eigenes.)

**Owner-Entscheidung P13.6-90 — ZAPIER: DIE ANBIETER-LESUNG JETZT; LIVE-TEST UND AUFNAHME IN DIE
HOST-LISTE GEBÜNDELT VOR DEM LAUNCH, IN EINEM BEZAHLTEN ZAPIER-MONAT ZUSAMMEN MIT DEM
ABNAHME-TESTPROTOKOLL.**
- Bis dahin steht Zapier NICHT in der Host-Liste (`RELAY_HOSTS`, src/lib/relay/hosts.ts):
  Owner-Entscheidung P13.6-55 verlangt Lesung UND Live-Test.
- Der browser-direkte Weg (Datensparmodus bzw. eine Adresse ausserhalb der Host-Liste) ist davon
  unberührt.
- BEZUG, NUR ZITIERT: offener Punkt "VOR DEM ERSTEN FREMDEN NUTZER FEHLT EIN
  ABNAHME-TESTPROTOKOLL FÜR DIE GANZE APP" (docs/offene-punkte.md).
- DER BELEG ZUR PREMIUM-FRAGE — OWNER-ANGABE 2026-09-30, Screenshot des Zap-Editors im
  Free-Konto (nicht im Repo): Das eingebaute Werkzeug "Webhooks" trägt das Etikett "Premium".
  Dass der Auslöser "Catch Hook" zu diesem Werkzeug gehört, war ABGELEITET (Architekt); die
  Lesung BESTÄTIGT es, gelesen, nicht gemessen — docs/formular-empfaenger-befunde.md, Abschnitt
  "Zapier", Befund (a).
- ABWEICHUNG VOM AUFTRAG, GEMELDET (CC): Der Auftrag nennt eine "als UNGEPRÜFT geführte
  Architekten-Erinnerung zur Premium-Frage". Der Bestand trägt keine (GEMESSEN AM REPO,
  2026-09-30, am Stand `2c32483`: `git grep -i premium -- docs` liefert sechs Treffer, fünf zu
  KlickTipp — vier im Abschnitt "KlickTipp" der Befund-Datei, einer im Archiv der Phase 13 — und
  einen in docs/ziel-befunde/tiktok.md; keiner zu Zapier. Die KlickTipp-Treffer sind zugleich die
  Positivkontrolle der Suche). Der Satz ist deshalb nicht übernommen.
- DIE LESUNG: docs/formular-empfaenger-befunde.md, Abschnitt "Zapier", Befunde (a) bis (p),
  Katalog-Abgleich und Messkandidaten ZM1 bis ZM7. Die Messkandidaten fallen in den gebündelten
  Monat.
- REVIDIERT 2026-09-30: Owner-Entscheidung P13.6-97 der Phase 13.6 — Zapier wird jetzt in Phase
  13.6 gebaut, der Zapier-Monat wird jetzt gebucht. Der Text darüber beschreibt den Stand davor.

PROVENIENZ von P13.6-94 und P13.6-97: OWNER-ENTSCHEIDUNG 2026-09-30, übermittelt im Auftrag der
Runde "Adresse verbergen: entschieden + Scheibe Zapier ins Relay" (Teil A). BINDEND. (Die
Überschrift dieses Abschnitts nennt das Anlagedatum der Datei; die Einträge tragen ihr eigenes.)

**Owner-Entscheidung P13.6-94 — V4: DIE EMPFÄNGER-ADRESSE BLEIBT IM AUSGELIEFERTEN TEXT
(`action`-ATTRIBUT UND DATENBLOCK); NICHTS WIRD GEBAUT.**
- ENTSCHEIDET Arbeit P13.6-91 der Phase 13.6 (Aufklärung "Adresse verbergen"); Kandidaten und
  Befunde stehen dort.
- GRÜNDE, WIE ÜBERMITTELT:
  · KOSTEN: V1+/V2+ verlangt `action` UND Datenblock, eine neu gefasste Laufzeit-Wache, eine
    dritte Antwortform bzw. einen Marker-Kontrakt und sechs ungemessene Browser-Verhalten.
    (CC, am Bestand: die sechs sind die MESSKANDIDATEN an Arbeit P13.6-91.)
  · NUTZEN GERING (ARCHITEKT, ABGELEITET am Code): Das Relay leitet den Rumpf unverändert weiter;
    ein öffentliches Formular erlaubt Müll-Leads auch über das Relay, gebremst nur durch die
    Ratenbegrenzung (120 je 60 s, Setzung P13.6-75, E3). Verbergen verhindert Spam im CRM nicht;
    es nähme allein den Umweg an Ratenbegrenzung und Kill-Switch vorbei und fremde
    Datenformate.
    (CC, am Code geprüft: `forward` in src/lib/relay/relay.ts reicht den Rumpf als Bytes weiter;
    einen Bot-Schutz gibt es nicht (Vermerk P13.6-19, Punkt (1)); das Relay nimmt allein
    `application/x-www-form-urlencoded` bis 64 KiB an (`isFormContentType`,
    `RELAY_MAX_BODY_BYTES`), ein direkter Aufrufer kann Zapier auch JSON oder XML schicken
    (Zapier, Befund (d)).)
  · "Deine Webhooks bleiben privat" wäre für Datensparmodus, Export, alte Seiten und gegenüber
    uns und Vercel falsch (Arbeit P13.6-91, Q7).
- FOLGE: Setzung P13-6 der Phase 13 ("die eingetragene Adresse ist kein Geheimnis") und Setzung
  P13.6-75, E8 (der Aussperr-Hebel bleibt hingenommen) stehen unverändert. Zapiers Rat "Treat it
  as a password" (Befund (c)) befolgt das Produkt bewusst nicht; die Betreiber-Seite trägt Vorrat
  P13.6-95.

**Owner-Entscheidung P13.6-97 — ZAPIER WIRD JETZT IN PHASE 13.6 GEBAUT; DER OWNER BUCHT EINEN
ZAPIER-MONAT ZUM LIVE-TEST, UND DIE MESSKANDIDATEN ZM1 BIS ZM7 LAUFEN IM SELBEN MONAT.**
- REVIDIERT Owner-Entscheidung P13.6-90 (Live-Test und Aufnahme gebündelt vor dem Launch).
- GRUND DES OWNERS: abschliessen statt heben; die Plattform kennenlernen.
- (CC, am Wortlaut von Owner-Entscheidung P13.6-55 gelesen, ABGELEITET, NICHT ENTSCHIEDEN): Ein
  Dienst kommt "erst in die Host-Liste, wenn seine Webhook-Adressen gelesen und einmal live
  getestet sind". Der Live-Test der Adresse selbst gehört damit VOR den Push, der
  `hooks.zapier.com` in `RELAY_HOSTS` aufnimmt; die Reihenfolge legt der Plan fest.
- OFFEN, VON DER ENTSCHEIDUNG NICHT GENANNT (CC): Owner-Entscheidung P13.6-90 bündelte den Monat
  zusätzlich mit dem Abnahme-Testprotokoll (offener Punkt "VOR DEM ERSTEN FREMDEN NUTZER FEHLT EIN
  ABNAHME-TESTPROTOKOLL FÜR DIE GANZE APP"). Ob diese Bündelung entfällt, sagt P13.6-97 nicht.
  BEANTWORTET (ARCHITEKT, übermittelt am 2026-10-01): Die Bündelung ist aufgehoben — Setzung
  P13.6-100 der Phase 13.6, (3).
- UMGESETZT 2026-10-01: Bau-Commit `93230df`, Live-Test bestanden (Vermerk P13.6-103 der Phase
  13.6). Von den Messkandidaten sind ZM1 bis ZM3 und ZM6 gemessen (Vermerk P13.6-102 und
  P13.6-103); ZM4, ZM5 und ZM7 trägt Arbeit P13.6-104 der Phase 13.6.

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
- FORTGESCHRIEBEN 2026-09-29 (ARCHITEKT, Runde "Lesung und Sonde zur Vercel-Protokollierung
  festhalten, Bauregeln, Region"; der Text darüber bleibt stehen): Scheibe 1, Scheibe 2, die
  Korrektur von `NEXT_PUBLIC_APP_URL` (Vermerk P13.6-47) und die Lesung (Arbeit P13.6-26) sind
  erledigt. DIE REIHENFOLGE IST JETZT: Region umstellen (Setzung P13.6-52) → erster
  Relay-Zuschnitt.
- FORTGESCHRIEBEN 2026-09-29 (Runde "Region festhalten, Owner-Entscheidungen Relay, Zuschnitt
  13.6-3"): Die Region ist umgestellt (Vermerk P13.6-53), der erste Relay-Zuschnitt steht
  (Abschnitt "Zuschnitt Scheibe 13.6-3"). Die weitere Reihenfolge der Stufe 1 trägt Setzung
  P13.6-56.
- FORTGESCHRIEBEN 2026-09-29 (Abschluss der Scheibe 13.6-3): 13.6-3 ist abgeschlossen (Vermerk
  P13.6-60). ALS NÄCHSTES STEHT 13.6-4 AN — der Anschluss im Seitenskript und der Schalter für
  den Datensparmodus (Setzung P13.6-56).
- FORTGESCHRIEBEN 2026-09-30 (ARCHITEKT, Abschluss der Scheibe 13.6-4): 13.6-4 ist
  abgeschlossen (Vermerk P13.6-70). DIE REIHENFOLGE IST JETZT: 13.6-5 Ratenbegrenzung → Scheibe
  "Zurück-Cache" (Arbeit P13.6-72) → Zapier. ALLE DREI VOR DEM ERSTEN FREMDEN NUTZER. Die
  Einschiebung der Scheibe "Zurück-Cache" ändert die Folge aus Setzung P13.6-56; deren Text
  bleibt als Stand vor dieser Runde stehen.
- NACHGETRAGEN 2026-09-30 (Abschluss der Scheibe 13.6-5; CC, keine neue Setzung): 13.6-5 ist
  abgeschlossen (Vermerk P13.6-81). Nach der Reihenfolge darüber steht die Scheibe
  "Zurück-Cache" (Arbeit P13.6-72) als Nächstes an.
- NACHGETRAGEN 2026-09-30 (Abschluss der Scheibe "Zurück-Cache"; CC, keine neue Setzung): Die
  Scheibe "Zurück-Cache" ist abgeschlossen (Vermerk P13.6-89). Nach der Reihenfolge darüber
  steht Zapier als Nächstes an.
- NACHGETRAGEN 2026-09-30 (Runde "Zapier — Anbieter-Lesung"; CC, keine neue Setzung): Die
  Zapier-Lesung ist erledigt; Live-Test und Aufnahme folgen gebündelt vor dem Launch —
  Owner-Entscheidung P13.6-90.
- NACHGETRAGEN 2026-09-30 (Runde "Adresse verbergen: entschieden"; CC, keine neue Setzung):
  Owner-Entscheidung P13.6-97 revidiert P13.6-90 — als Nächstes steht die Scheibe "Zapier ins
  Relay" an, mit Live-Test im gebuchten Zapier-Monat.
- NACHGETRAGEN 2026-10-01 (Runde "Scheibe Zapier ins Relay — Bau"; CC, keine neue Setzung):
  Zuschnitt und Plan stehen im Abschnitt "Zuschnitt Scheibe Zapier ins Relay"; Phase 0 des
  Live-Tests läuft VOR dem Push (Setzung P13.6-100 der Phase 13.6, (2)).
- NACHGETRAGEN 2026-10-01 (Abschluss der Scheibe "Zapier ins Relay"; CC, keine neue Setzung): Die
  Scheibe ist abgeschlossen (Vermerk P13.6-103). Die Reihenfolge darüber nennt danach keine
  weitere Scheibe; offen sind Arbeit P13.6-104 (Frist am Zapier-Monat) und Vorrat P13.6-105.
- NACHGETRAGEN 2026-10-01 (Runde "Beacon bei Erstveröffentlichung — Messvermerk, Zuschnitt,
  Plan"; CC, keine neue Setzung an dieser Stelle): Vorrat P13.6-105 ist gemessen (Vermerk
  P13.6-106) und als eigene Scheibe zugeschnitten, als nächste Scheibe der Phase und vor dem
  ersten fremden Nutzer (Setzung P13.6-107, Abschnitt "Zuschnitt Scheibe Beacon bei
  Erstveröffentlichung"). Arbeit P13.6-104 bleibt mit ihrer Frist daneben offen.
- NACHGETRAGEN 2026-10-01 (ARCHITEKT, übermittelt im Auftrag der Runde "Beacon bei
  Erstveröffentlichung — Fortsetzung"): NACH DIESER SCHEIBE, VOR ALLEM ANDEREN IN 13.6, die
  Sicherheits-Scheibe "Spaltenrechte" — Arbeit P13.6-113.
- NACHGETRAGEN 2026-10-01 (Abschluss der Scheibe "Beacon bei Erstveröffentlichung"; CC, keine
  neue Setzung): Die Scheibe ist abgeschlossen (Vermerk P13.6-114). Nach dem Nachtrag darüber
  steht als Nächstes die Sicherheits-Scheibe "Spaltenrechte" an — Arbeit P13.6-113; Arbeit
  P13.6-104 bleibt mit ihrer Frist daneben offen.
- NACHGETRAGEN 2026-10-01 (Runde "Scheibe Spaltenrechte — Zuschnitt und Plan"; CC, keine neue
  Setzung an dieser Stelle): Arbeit P13.6-113 ist zugeschnitten (Setzung P13.6-115, Abschnitt
  "Zuschnitt Scheibe Spaltenrechte"); der Plan steht im Bericht derselben Runde.
- NACHGETRAGEN 2026-10-01 (Abschluss der Scheibe "Spaltenrechte"; CC, keine neue Setzung): Die
  Scheibe ist abgeschlossen (Vermerk P13.6-130). Die Reihenfolge darüber nennt danach keine
  weitere Scheibe; offen bleibt Arbeit P13.6-104 mit ihrer Frist.

PROVENIENZ von P13.6-20 bis P13.6-25: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag
der Runde "Neufassung der Datenklassen-Regel, Aufklärung A2, Setzungen". REVIDIERBAR.

**Setzung P13.6-20 — DAS RELAY GILT NUR FÜR VERÖFFENTLICHTE, GEHOSTETE SEITEN; DIE ZIELADRESSE
KOMMT AUSSCHLIESSLICH AUS `published_content`.**
- Bestimmt über trackingKey und Formular-Kennung — nie aus der Anfrage, nie aus dem Entwurf.
  Exporte bleiben browser-direkt.
  ERSETZT DURCH P13.6-57 (ARCHITEKT 2026-09-29, Setzung P13.6-59, Q10): Das Projekt kommt aus
  dem Host, nicht aus einem Schlüssel. Der übrige Wortlaut dieser Setzung gilt unverändert.
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
  ENTSCHIEDEN 2026-09-30 (ARCHITEKT): gezählt wird in der Datenbank, eine Zeile je Projekt —
  Setzung P13.6-75, E1. Die Firewall: ebenda, E9.

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

PROVENIENZ von P13.6-48 bis P13.6-52: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der
Runde "Lesung und Sonde zur Vercel-Protokollierung festhalten, Bauregeln, Region". REVIDIERBAR;
ein Owner-Widerspruch hebt jede auf. Die Befunde, auf die sie sich stützen, stehen in
docs/plattform-befunde.md, Vercel-Abschnitt, Teile (i) bis (t) (Lesung und Sonde vom
2026-09-29), und Supabase-Abschnitt, Teil (au). P13.6-48 bis P13.6-51 sind die im Auftrag als
R1 bis R4 geführten Bauregeln des Relays.

**Setzung P13.6-48 (R1) — DER RELAY-AUFRUF TRÄGT KEINEN REFERER (`referrerPolicy: "no-referrer"`).**
- GRUND: Der Referer steht im Vercel-Log und trüge die volle Seitenadresse samt Query
  (GEMESSEN, Sonde vom 2026-09-29, docs/plattform-befunde.md, Vercel, Teil (r)).
- GRENZE: Die Regel gilt dem Relay-Aufruf. Die Beacons an `/api/e` und die Seitenanfrage selbst
  berührt sie nicht (offener Punkt "DIE SEITENADRESSE REIST SAMT QUERY …", Ergänzung vom
  2026-09-29).

**Setzung P13.6-49 (R2) — FORMULARWERTE STEHEN NIE IN PFAD ODER QUERY, NUR IM RUMPF.**
- GRUND: Search Params stehen im Klartext im Vercel-Log (GEMESSEN, ebenda, Teil (r)).
- GRENZE: Ob der Rumpf bei Vercel intern abgelegt wird, ist offen (Setzung P13.6-51); die
  Regel schützt vor dem sichtbaren Log, nicht vor der Plattform.

**Setzung P13.6-50 (R3) — DER RELAY-CODE GIBT DEN RUMPF NIE IN EINE LOGZEILE ODER EINE
FEHLERMELDUNG; JEDER FEHLER WIRD IM RELAY-PFAD GEFANGEN.**
- GRUND: Was bei einem Absturz ins Log gelangt, ist weder gelesen noch gemessen
  (docs/plattform-befunde.md, Vercel, Teile (m) und (q)).
- GESICHERT durch einen Wächter-Test (Dauerregel "NUR EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR
  ODER EIN NEBENEFFEKT IST KEINER"); er ist Bedingung (1) der Owner-Entscheidung P13.6-16.
- GRENZE: Wie der Wächter gebaut wird, entscheidet der Zuschnitt.

**Setzung P13.6-51 (R4) — OB VERCEL RÜMPFE INTERN ABLEGT, KLÄRT DIE AVV-ARBEIT ÜBER DEN DPA; BIS
DAHIN GILT "NIE IM LOG" FÜR UNSEREN CODE, NICHT FÜR DIE PLATTFORM.**
- GRUND: Weder die Lesung noch die Sonde entscheidet die Frage; die Dashboard-Suche fand nicht
  einmal den Query-Marker, der in der Detailansicht steht, ihr Nicht-Treffer beim Rumpf ist
  deshalb kein Beleg (docs/plattform-befunde.md, Vercel, Teile (l), (q) und (t)).
- BEZUG: Owner-Entscheidung P13.6-18 (das Relay für fremde Nutzer erst mit Kunden-AVV).
- GRENZE: Die Zusage "nie geloggt" aus Owner-Entscheidung P13.6-16 bleibt eine Zusage über
  unseren Code.

**Setzung P13.6-52 — REGION: DIE FUNKTIONSREGION WIRD VON `iad1` AUF FRANKFURT (`fra1`)
UMGESTELLT, ALS EIGENER PLATTFORM-SCHRITT VOR DEM ERSTEN RELAY-ZUSCHNITT.**
- GRUND: Supabase liegt in Frankfurt (OWNER-ANGABE, docs/plattform-befunde.md, Supabase, Teil
  (au)); die Funktion lief gemessen in `iad1` (Sonde, Vercel, Teil (r)). Jede
  Datenbankabfrage ging damit über den Atlantik, und Daten europäischer Besucher würden in den
  USA verarbeitet (ARCHITEKT, Begründung; nicht gemessen).
- GRENZE: Ob der Hobby-Tarif die Wahl erlaubt, prüft der Owner in den Einstellungen.
- VORHER-WERT: die gemessene Ausführung von `/api/e`, 145 ms, `iad1` (Sonde, ebenda).
  EINSCHRÄNKUNG, GELESEN AM CODE (CC): Die Sonde lief auf dem Abweisungs-Pfad — eine 400 vor
  jedem Datenbank-Zugriff (`handleIngest`, src/lib/capi/ingest.ts); die 145 ms enthalten keinen
  Datenbank-Umlauf. Ein Vergleich nach dem Umstellen braucht dieselbe Anfrageform, und für die
  Wirkung auf Datenbank-Umläufe braucht es eine Anfrage, die die Datenbank erreicht.
- UMGESETZT 2026-09-29, ohne Code-Commit (Plattform-Schritt): Vermerk P13.6-53 der Phase 13.6.
  Die GRENZE darüber ist damit beantwortet — der Hobby-Tarif lässt die Wahl der Region zu. Der
  VORHER-WERT von 145 ms ist nicht der Vergleichswert jenes Vermerks; dort sind vorher und
  nachher mit derselben Anfrageform gemessen, die die Datenbank erreicht.

PROVENIENZ von P13.6-56 und P13.6-57: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der
Runde "Region festhalten, Owner-Entscheidungen Relay, Zuschnitt 13.6-3". REVIDIERBAR; ein
Owner-Widerspruch hebt jede auf.

**Setzung P13.6-56 — DER SCHNITT DER STUFE 1: 13.6-3 RELAY-ENDPUNKT · 13.6-4 ANSCHLUSS IM
SEITENSKRIPT UND SCHALTER · 13.6-5 RATENBEGRENZUNG · ZAPIER ALS EIGENE KLEINE RUNDE.**
- 13.6-3: der Relay-Endpunkt auf dem Server, zunächst nur Make, OHNE Aufrufer in ausgelieferten
  Seiten.
- 13.6-4: der Anschluss im Seitenskript und der Schalter für den Datensparmodus
  (Owner-Entscheidung P13.6-54).
- 13.6-5: die Ratenbegrenzung je Projekt, vor dem ersten fremden Nutzer (Setzung P13.6-23).
- Zapier: nach Lesung und Live-Test (Owner-Entscheidung P13.6-55) als eigene kleine Runde.
- GRUND: Der heikelste Teil — Schutz, Weiterleitung, Logfreiheit — wird geprüft, bevor ein
  Besucher ihn erreicht.
- GRENZE: Zwischen 13.6-3 und 13.6-5 ist der Endpunkt öffentlich erreichbar, ohne
  Ratenbegrenzung. Er leitet dann nur an Adressen weiter, die in einer veröffentlichten Fassung
  stehen und auf der Host-Liste liegen; jeder kann solche Adressen ohnehin direkt aufrufen
  (ABGELEITET, CC). Heute gibt es keinen fremden Nutzer (CLAUDE.md, "## Modus").

**Setzung P13.6-57 — DAS RELAY BESTIMMT DAS PROJEKT AUS DEM HOST DER ANFRAGE, NICHT AUS EINEM
SCHLÜSSEL IM RUMPF.**
- Wie die Auslieferung: Label oder Custom-Domain des Hosts.
- GRUND: Damit gilt das Relay per Bauart nur für gehostete Seiten (Setzung P13.6-20), und kein
  Aufrufer kann ein fremdes Projekt adressieren.
- GRENZE: Ob der vorhandene Resolver unverändert wiederverwendbar ist, klärt der Plan.
- KOLLISION, GEMELDET, NICHT AUFGELÖST (CC, 2026-09-29): Setzung P13.6-20 sagt im ersten Punkt
  "Bestimmt über trackingKey und Formular-Kennung", und Vermerk P13.6-19, Punkt (3), führt
  trackingKey plus Formular-Kennung als KANDIDATEN. Diese Setzung ersetzt den trackingKey durch
  den Host. Welche Fassung gilt, entscheidet der Architekt; P13.6-20 ist hier nicht geändert.
  AUFGELÖST 2026-09-29 (ARCHITEKT, Setzung P13.6-59, Q10): Diese Setzung gilt; an P13.6-20 steht
  der Ersetzungs-Satz.
- GRENZE BEANTWORTET 2026-09-29 (Vermerk P13.6-58, G2): Der vorhandene Resolver ist NICHT
  unverändert wiederverwendbar; gewählt ist eine eigene Relay-Suche (Setzung P13.6-59, Q1).

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
  REVIDIERT 2026-10-01 (ARCHITEKT, Setzung P13.6-117 der Phase 13.6): `publishProject` nutzt den
  Admin-Client für die server-eigenen Schreibvorgänge IMMER, nach dem Eigentums-Gate. Die
  Bedingung "nur, wenn mindestens ein Formular-Ziel besteht" beschreibt den Stand davor.
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

**ABGESCHLOSSEN AM 2026-09-29 — Bau-Commit `8be7bb3`, Live-Test bestanden; Abschluss-Vermerk
P13.6-45.**
- GEGENSTAND: "Die Vorschau sendet nie" — die zweite Bau-Scheibe der Phase 13.6. Sie setzt
  Owner-Entscheidung P13.6-13 um, in der Reihenfolge der Setzung P13.6-14.
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen und Grenzen, die über die Scheibe
  hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist: Vermerk P13.6-45, Punkt (12).

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
  ERSETZT 2026-09-29 (ARCHITEKT, Setzung P13.6-43 der Phase 13.6, Punkt (1)): "Weiterleitungen
  und Textersetzungen bleiben in der Vorschau bedienbar"; der Dialog erscheint dort in keinem
  Rahmen.
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
  ENTSCHIEDEN 2026-09-29 (ARCHITEKT): nicht Teil der Scheibe; geführt als Vorrat P13.6-44 der
  Phase 13.6.

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
  GEMESSEN 2026-09-29 (OWNER, vor dem Push): `fbevents.js` lädt im Rahmen und sendet von dort;
  ob Meta die Ereignisse angenommen hat, bleibt ungemessen (Vermerk P13.6-45, Punkte (2) und
  (7)).

**Setzung P13.6-41 — FOLGE: ERST NACH DIESER SCHEIBE WIRD `NEXT_PUBLIC_APP_URL` KORRIGIERT.**
- Bestätigt die Reihenfolge der Setzung P13.6-14; dort steht der Grund.
- ERFÜLLT 2026-09-29: Die Scheibe ist abgeschlossen (Vermerk P13.6-45). Als Nächstes steht die
  Korrektur von `NEXT_PUBLIC_APP_URL` an (Vorrat P13.6-12 der Phase 13.6).

### Grenzen der Scheibe 13.6-2

- Veröffentlichte Seiten und Exporte ändern sich nicht (Setzung P13.6-40).
- Die Entscheidung gilt dem Editor, nicht der Umgebung — auch die lokale Vorschau (`next dev`)
  ist gemeint (Owner-Entscheidung P13.6-13, "EBENFALLS ABGELEITET").
- Tracking ist im Editor nicht mehr zu prüfen; geprüft wird an der veröffentlichten Seite
  (Grund der Owner-Entscheidung P13.6-13).

### Planrunde der Scheibe 13.6-2

**Vermerk P13.6-42 — BEFUNDE DER GATES G1 BIS G7 DER PLANRUNDE** (CC, 2026-09-29, HEAD
`f5d91f3`; Planrunde der Scheibe 13.6-2). GELESEN AM CODE, soweit nicht anders gekennzeichnet;
KEIN BEFUND DIESES VERMERKS IST LIVE GEMESSEN.
(1) DIE EINZIGE SENDE-EINHEIT DER VORSCHAU ist die Meta-Laufzeit (`buildMetaRuntime`,
    src/lib/tracking/meta.ts), die `buildWiringScript` (src/lib/generate.ts) in jedem Modus baut.
    Aufgerufen wird die Vorschau im Memo `functionalHtml` (src/components/CodeImporter.tsx) mit
    `metaPixelId`, `trackingKey`, `capiProxyUrl` (`getCapiProxyUrl`) und `consentTargets`. Vier
    Teile:
    · der Lader in `__psMetaInit` (Skript `https://connect.facebook.net/en_US/fbevents.js`);
    · `fbq("init")` und `fbq("track"/"trackCustom")`;
    · der Beacon (`buildCapiBeaconStatement`, `navigator.sendBeacon` an die Proxy-Adresse);
    · die Bestätigung (`buildPixelConfirmStatement`, `sendBeacon`, sonst `fetch` mit
      `keepalive`).
    Lader und `fbq` hängen allein an der Pixel-ID, Beacon und Bestätigung an Schlüssel und
    Proxy-Adresse.
(2) DER AUSLÖSER ist allein der Linksklick auf ein Element mit Track-Aktion (click-Listener in
    `buildWiringScript`). `auxclick` hängt nur im Export. Der submit-Listener hängt auch in der
    Vorschau; der Rahmen trägt aber kein `allow-forms`, dort entsteht deshalb kein `submit` —
    ABGELEITET aus der HTML-Spezifikation, nicht gemessen. Beim Laden sendet die Laufzeit nichts.
    Ohne Hook des Betreibers liefert `__psConsent` `true` (`buildConsentRuntime`,
    src/lib/tracking/consent.ts); die Vorschau fragt also niemanden.
(3) NICHT IN DER VORSCHAU: der Custom-Pixel (`generateFunctional` setzt `customPixelCode`
    ausserhalb von "export" leer; Wächter T13 in src/lib/tracking/custom-pixel.test.ts); das
    Formular-Ziel (Laufzeit nur in "export", Setzung P13-30 der Phase 13); der Seitenaufruf
    (`buildPageViewScript` entsteht allein in `injectPageViewEmitter`, einziger
    Produktiv-Aufrufer `publishProject`); Browser-Tags weiterer Ziele gibt es nicht. Der
    Editier-Rahmen ruft `generateFunctional` im Modus "edit" ohne Optionen (`editPreviewHtml`)
    und trägt damit keine Laufzeit.
(4) DER DIALOG erscheint in keinem Rahmen des Editors: seine Blöcke entstehen allein in
    `injectPageViewEmitter`; `generateFunctional` hängt nur das Gate ein (`CONSENT_SCRIPT_ID`,
    `buildConsentRuntimes`). Derselbe Befund: Archiv der Phase 11.13, Nachtrag vom 2026-09-17.
(5) DER RAHMEN UND DER RIEGEL UNTERBINDEN KEINEN SENDEWEG. Der Vorschau-Rahmen trägt
    `sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"` (Ursprung `null`,
    kein `allow-forms`). Der Riegel `withPreviewStorageShim` (src/lib/preview-storage-shim.ts)
    ersetzt nur `document.cookie`, `localStorage` und `sessionStorage`; `sendBeacon`, `fetch`
    und das Laden von Skripten berührt er nicht (Entscheidung P11.12-1 der Phase 11.12: keine
    Sicherheitsschicht). Die App setzt keine Content-Security-Policy (GEMESSEN AM REPO: Suche
    `Content-Security-Policy` über src/ und next.config.*, 0 Treffer). ABGELEITET, NICHT
    GEMESSEN: `fbevents.js` lädt im Rahmen. NICHT ENTSCHEIDBAR: ob Meta Ereignisse aus einem
    `null`-Ursprung annimmt; ob der Browser den Beacon an `http://localhost:3000` von einer
    öffentlichen Seite zulässt.
    GEMESSEN 2026-09-29 (OWNER, vor dem Push): `fbevents.js` lädt im Rahmen und sendet; die zwei
    Anfragen an `http://localhost:3000/api/e` schlugen fehl (Vermerk P13.6-45, Punkt (2)). Ob
    Meta annimmt, bleibt ungemessen.
(6) WEITERLEITUNG UND TEXTERSETZUNG hängen an Datenblock und Wiring, die in der Vorschau immer
    entstehen, nicht an der Meta-Laufzeit, dem Custom-Baustein oder dem Gate.
(7) SKRIPTE IM IMPORTIERTEN HTML laufen in beiden Rahmen: der `DOMParser`-Rundlauf behält sie.
    Dazu gehören alte Pagesmith-Bausteine aus einem früheren Export — das Memo `functionalHtml`
    fragt `hasOwnBlocks` nicht (ABGELEITET, nicht gemessen); s. Vorrat P13.6-44.
(8) BESTEHENDE TESTS, die die Scheibe berührt: T6 (src/lib/generate.test.ts) erwartet `fbq` in
    der Vorschau und wird beabsichtigt rot; die Vorschau-Hälfte von K3
    (src/components/CodeImporter.test.tsx) ebenso; der auxclick-Test "SCOPING: auxclick in
    PREVIEW feuert NICHT" und die Vorschau-Hälfte von K4 würden hohl. Die vier
    Differenz-Nachweise W1′, W2′, T1 und T9 laufen im Modus "export" und bleiben unberührt.

**Setzung P13.6-43 — DIE ENTSCHEIDUNGEN DER PLANRUNDE 13.6-2.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Bau-Auftrag der Scheibe 13.6-2.
REVIDIERBAR; ein Owner-Widerspruch hebt sie auf.
(1) DER STOPP DER PLANRUNDE IST AUFGEHOBEN. Die Stopp-Bedingung "keine Gestalt erhält den Dialog"
    griff dem Wortlaut nach, weil der Dialog in der Vorschau gar nicht erscheint. Die geschützte
    Invariante (iii) des Zuschnitts lautet: "Weiterleitungen und Textersetzungen bleiben in der
    Vorschau bedienbar." Die Prämisse zum Dialog war falsch; der Ausschluss einer
    Dialog-Vorschau aus der Phase 11.13 bleibt.
(2) GESTALT (a), GATUNG IN DER ENGINE: Die Meta-Laufzeit entsteht nur im Modus "export"; die
    Track-Anweisung ist in "preview" leer und erzeugt keine Warnung. GRUND: dieselbe Form wie
    Entscheidung P11.6-6 (d) der Phase 11.6 und Setzung P13-30 der Phase 13; ein strenger
    Wächter an Text und Verhalten ist möglich; src/lib/tracking/meta.ts bleibt unberührt.
    VERWORFEN: Gestalt (b), Bausteine bleiben mit leeren Sendestellen — der Eingriff läge in
    meta.ts mit ihren Byte-Zusagen, und ein Wächter am Text wäre nicht streng.
(3) DIE SPANNUNG ZU ENTSCHEIDUNG P11.12-2 DER PHASE 11.12 (keine Modus-Verzweigung in der
    Engine für den Riegel) trägt der Wächter-Test (W-P1 am Text, W-P2 am Verhalten), nicht die
    Bauart.
(4) DER EDITOR ÜBERGIBT DER VORSCHAU weder Pixel-ID noch Tracking-Schlüssel noch Beacon-Adresse.
    Über `consentTargets` entscheidet der Bau mit Beleg am Code. FOLGE, VORHERGESAGT: Bei den
    Mutationen "Beacon zurück" und "Lader und `fbq` zurück" bleibt der Wächter am Editor (W-E2E)
    grün; das ist keine Lücke — W-P1 und W-P2 tragen sie.
(5) ALTE PAGESMITH-BAUSTEINE IM IMPORTIERTEN HTML: nicht Teil der Scheibe, Vorrat P13.6-44.
(6) KEIN NEUER OBERFLÄCHENTEXT in der Vorschau. Der Satz für die Betreiber-Dokumentation folgt
    mit dem Abschluss-Vermerk.
    ERLEDIGT 2026-09-29: Punkt (7) am offenen Punkt "BETREIBER-DOKUMENTATION FEHLT — DREI
    PUNKTE" (docs/offene-punkte.md).
(7) Ob `fbevents.js` im Rahmen lädt und bei Meta ankommt, klärt der Live-Test (Vorher-Schritt).
    GEKLÄRT 2026-09-29, zur Hälfte: Er lädt und sendet; ob Meta annimmt, ist nicht gemessen
    (Vermerk P13.6-45, Punkt (7)).
(8) Ob `.env.local` auf die Produktions-Datenbank zeigt: keine Handlung — dort liegen nur eigene
    Testdaten des Owners.

### Abschluss der Scheibe 13.6-2

**Vermerk P13.6-45 — ABSCHLUSS DER SCHEIBE 13.6-2 (DIE VORSCHAU SENDET NIE). Bau-Commit
`8be7bb3`** ("feat(preview): Die Vorschau sendet nie — keine Meta-Laufzeit, keine
Tracking-Eingaben"). LIVE-TEST BESTANDEN.

(0) PROVENIENZ DER PUNKTE (1) BIS (5): GEMESSEN, OWNER, live, 2026-09-29, Chrome (Version nicht
    angegeben), übermittelt im Auftrag der Abschluss-Runde.

(1) V1/L1 — LIVE-SEITE:
    · vor dem Push: 30493 Bytes, sha256
      `40c83cb36a543162717af8a01143246ed139d2cbfa7373f7888c39ca848f37e5`;
    · nach Deploy und Neu-Veröffentlichen: identisch; je zweimal gleich gemessen.
    · GRENZE: Welche Seite gemessen wurde, ist nicht angegeben. Bytes und sha256 gleichen den
      Werten der "SEITE OHNE FORMULAR-ZIEL" in Vermerk P13.6-37, Punkt (1) (GEMESSEN AM
      BESTAND, CC: beide Werte zeichengleich). Trägt die Seite keine Meta-Laufzeit, belegt die
      Byte-Gleichheit MIT Tracking allein der Test W-B2, die Funktion live allein L4.
    · ABWEICHUNG VOM AUFTRAG, GEMELDET (CC): Der Auftrag nannte sie "Seite P0"; der Bestand führt
      sie als "L0/L1 — SEITE OHNE FORMULAR-ZIEL".

(2) V3 — VORSCHAU VOR DEM PUSH, Track-Klick:
    · im Netzwerk zwei Anfragen mit Initiator `fbevents.js`: eine mit dem Ereignis "Lead", eine
      mit "SubscribedButtonClick";
    · unter `api/e` zwei fehlgeschlagene Anfragen an `http://localhost:3000/api/e` — nach dem
      Code Beacon und Bestätigung (ABGELEITET, nicht einzeln erhoben).

(3) L2 — VORSCHAU NACH DEM DEPLOY, derselbe Klick: Filter "facebook" und "api/e" je ohne
    Treffer.

(4) L3 — Weiterleitung und Textersetzung funktionieren in der Vorschau.

(5) L4 — LIVE-SEITE:
    · `fbevents.js` geladen;
    · eine Anfrage an `/api/e` mit `event` "Lead", `eventID`
      `8297cf28-5666-4417-9817-8ed482125222`, `cns` mit allen fünf Zielen erlaubt;
    · eine Bestätigung mit derselben `eventID` und `obs` "__ps_browser"
      (`BROWSER_CONFIRM_MARKER`, src/lib/analytics/events.ts).
    · Tracking-Schlüssel und `_fbp`-Wert stehen bewusst nicht in dieser Datei.

(6) NICHT GEMELDET: V2 (Bytes und sha256 des Exports vor dem Push) und damit die
    Byte-Gleichheit des Exports live, dazu L5 (Metas Test-Ereignisse). Die Byte-Gleichheit des
    Exports belegt allein der Test W-B1.

(7) FRAGE Q5 DER PLANRUNDE BEANTWORTET: `fbevents.js` lädt im Vorschau-Rahmen (Ursprung `null`)
    und sendet von dort (Punkt (2)). Ob Meta die Ereignisse angenommen hat, ist nicht gemessen.
    Damit beantwortet: Vermerk P13.6-42, Punkt (5), und Setzung P13.6-43, Punkt (7).

(8) BAU (CC, 2026-09-29, am Stand vor dem Commit `8be7bb3`; die Gates danach erneut):
    · Vorher-Werte, erhoben an `038a6d2` vor der ersten Code-Änderung (Sonde ausserhalb des
      Repos, `jiti` mit jsdom 29.1.1): W-B1 (Export) 24078 Bytes, sha256
      `4917c6eb06523dc666b75d608288d28fc4ca723607ccc4dab8dc89ac4c575f5e`; W-B2
      (Veröffentlichung mit Dialog "bar") 37865 Bytes, sha256
      `33139d44144abc659d94ddece86ee5e873e7df5a4c6ce6bcf66e395ff913c79b`. Die Tests tragen sie als
      Konstanten. Sonde und Testumgebung stimmen überein: der Fixture-Block ist zeichengleich
      (sha256 des Blocks), und W-B lief am unveränderten Code grün.
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, 1 Warnung in
      src/lib/tracking/consent.test.ts (von der Scheibe nicht berührt); `vitest run` 99 Dateien,
      2554 Tests (vorher 2546); `next build` exit 0.
    · Mutationen, volle Suite, Vorhersage je vor dem Lauf: M1 (Beacon zurück) → W-P1, W-P2 ·
      M1a (Teilprobe: nur die Laufzeit, ohne Aufruf) → W-P1 · M2 (Lader und `fbq` zurück) →
      W-P1, W-P2 · M3 (Meta-Laufzeit in keinem Modus) → 101 rot, darunter W-B1 und W-B2 · M4
      (Custom-Gatung entfällt) → W-E2E, W-P1, W-P2, T13 · M5 (Memo im Modus "export") →
      W-E2E. Bei M1 und M2 blieb W-E2E grün, wie vorhergesagt (Setzung P13.6-43, Punkt (4)).
    · M3, ABWEICHUNG VON DER VORHERSAGE: T9 wurde rot, vorhergesagt war grün. Seine zweite
      Hälfte (`MIT_META`) trägt eine Pixel-ID und gehört damit zur Klasse "Export mit
      Meta-Laufzeit"; beim Plan war nur sein erster Aufruf gelesen. Alle 101 Roten gehören zu
      dieser Klasse.
    · M5, ZWEIMAL: Im ersten Lauf wurde W-E2E allein über die Ereigniszeile rot
      (`__psCustomFire`); ohne Ereigniszeile in der Vorlage wäre der Moduswechsel grün geblieben.
      Vor dem Commit bekam W-E2E deshalb die Zusicherung `var MODE = "preview"` (Positivkontrolle
      `var MODE = "export"` am Export desselben Renders); im zweiten Lauf wurde W-E2E an genau
      dieser Zusicherung rot.
    · Kurzprobe ausserhalb des Plans: K4 ohne `setTrackingKey("")` in `resetToEmpty` → rot.

(9) ABWEICHUNGEN VOM PLAN, IM BAU DEKLARIERT:
    · Die Engine-Tests stehen in der bestehenden src/lib/generate.test.ts, keine neue Datei.
    · Die Track-Anweisung ist nur in "preview" leer; "edit" bleibt byte-gleich.
    · K4 misst am Export: im neuen Kontext Code eingefügt, Track-Aktion über die Oberfläche.
    · W-E2E prüft zusätzlich die Modus-Konstante (Punkt (8), M5).
    · Berichtigt sind fünf Kommentarstellen in src/lib/generate.ts und zusätzlich der Absatz am
      Export in src/components/CodeImporter.tsx ("GENAU dieselben Eingaben wie die funktionale
      Vorschau …").

(10) WÄCHTER, je Festlegung (G = src/lib/generate.test.ts, CI =
    src/components/CodeImporter.test.tsx):
    · Setzung P13.6-40 (Export und Veröffentlichung byte-gleich): W-B1, W-B2 samt
      Positivkontrolle (G).
    · Setzung P13.6-38 mit P13.6-43 (2) (keine Meta-Laufzeit in der Vorschau): W-P1 (Text),
      W-P2 (Verhalten), je mit Positivkontrolle am Export (G).
    · Setzung P13.6-43 (4) (keine Tracking-Eingaben, Modus "preview"): W-E2E (CI).
    · Invariante (iii) nach P13.6-43 (1): W-P3 und T6 (G).
    · Entscheidung P11.6-6 (d) der Phase 11.6: T13, unverändert.

(11) GRENZEN, als Grenzen benannt:
    · nur Chrome;
    · ob Meta Ereignisse aus der Vorschau bis heute gezählt hat, ist nicht gemessen;
    · Skripte im HTML des Betreibers laufen in der Vorschau weiter (Setzung P13.6-39), darunter
      alte Pagesmith-Bausteine (Vorrat P13.6-44);
    · Metas automatische Ereignisse: Vorrat P13.6-46.

(12) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN: aus dem GEGENSTAND der Satz
    "Zugeschnitten am 2026-09-29; der Plan folgt in einer eigenen Runde."; der Gegenstand selbst
    steht im Abschluss-Kopf des Zuschnitts. Eine weitere Bau-Anweisung, die mit der Scheibe
    abgelaufen wäre, trug der Zuschnitt nicht.
    STEHEN GEBLIEBEN: Setzungen P13.6-38, P13.6-39, P13.6-40 und P13.6-41, die Grenzen der
    Scheibe, Vermerk P13.6-42 und Setzung P13.6-43. Je ein Auflösungs-Satz steht an P13.6-40,
    P13.6-41, P13.6-42 Punkt (5) und P13.6-43 Punkte (6) und (7).

(13) NACHGEZOGEN IN DIESEM COMMIT: Owner-Entscheidung P13.6-13 (UMGESETZT); Vorrat P13.6-12
    (Status); Punkt (7) am offenen Punkt "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE"
    (docs/offene-punkte.md) samt Stub-Zeile in CLAUDE.md.

## Zuschnitt Scheibe 13.6-3

**ABGESCHLOSSEN AM 2026-09-29 — Bau-Commit `aa05235`, Live-Test bestanden; Abschluss-Vermerk
P13.6-60.**
- GEGENSTAND: "Relay-Endpunkt" — die dritte Bau-Scheibe der Phase 13.6 und die erste der Stufe 1
  (Setzung P13.6-56). Ein öffentlicher Relay-Endpunkt auf dem Serving-Host:
  · Er bestimmt das Projekt aus dem Host der Anfrage (Setzung P13.6-57).
  · Er liest aus der VERÖFFENTLICHTEN Fassung das Formular-Ziel zur Formular-Kennung der Anfrage.
  · Er prüft den Host der Zieladresse gegen eine feste Host-Liste; in Stufe 1 steht dort nur Make
    (Owner-Entscheidung P13.6-55).
  · Er leitet die Felder weiter und meldet genau zwei Zustände (Setzung P13.6-21).
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen und Grenzen, die über die Scheibe
  hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist und wo sein Inhalt steht: Vermerk P13.6-60, Punkt (9).

### Grenzen der Scheibe 13.6-3

- Ohne Aufrufer in ausgelieferten Seiten erreicht der Endpunkt kein Besucher über unseren Code;
  er ist trotzdem öffentlich erreichbar (Setzung P13.6-56, GRENZE).
- Kein ausgelieferter Text ändert sich in dieser Scheibe.
- DER ENDPUNKT IST AB DEPLOY ÖFFENTLICH UND OHNE RATENBEGRENZUNG, BIS 13.6-5 (ARCHITEKT
  2026-09-29). Weiterleiten kann er nur an veröffentlichte Adressen der Host-Liste des aus dem
  Host bestimmten Projekts.

### Planrunde der Scheibe 13.6-3

**Vermerk P13.6-58 — BEFUNDE DER GATES G1 BIS G10 DER PLANRUNDE** (CC, 2026-09-29, HEAD
`8e6c1f2`). GELESEN AM CODE, soweit nicht anders gekennzeichnet; KEIN BEFUND DIESES VERMERKS
IST LIVE GEMESSEN. ABGELEITET heisst: aus einer Spezifikation oder dem Verhalten eines
Frameworks geschlossen, weder gelesen noch gemessen.
(1) G1 — ROUTE. Die Ausnahme-Liste in `proxy` (src/proxy.ts) ist exakt (`/api/e`, `/api/capi`);
    jeder andere Pfad geht an `/app-serve`, die nur `GET` kennt. Ein neuer Pfad braucht dort
    eine weitere exakte Gleichheit. Die Messung "POST /api/projects auf Serving-Host → 405"
    steht im Archiv der Phase 7 (docs/claude-history/phase-7-hosting.md, "Chirurgischer
    Passthrough"). Auf dem App-Host muss der Pfad NICHT erreichbar sein: `isPublicRoute`
    (src/lib/supabase/middleware.ts) bleibt unverändert, ein Aufruf ohne Sitzung wird dort auf
    `/login` umgeleitet, einer mit Sitzung erreicht die Route und wird dort als App-Host
    (`isAppHost`) abgewiesen. Eine gemeinsame Konstante für beide Listen (Vorrat P13.6-9) wäre
    falsch: sie öffnete den Pfad auf dem App-Host. Vorrat P13.6-9 bleibt.
(2) G2 — PROJEKT AUS DEM HOST. `resolvePublished` (src/lib/hosting/resolve.ts) ist nicht
    exportiert; die exportierten Funktionen liefern `ServeResult` mit `html` (und bei A/B
    `variantBHtml`), aber keine `mappings`. Die Projektion trägt sie (`published_content`
    ganz), gibt sie aber nicht heraus. Der Resolver ist damit NICHT unverändert
    wiederverwendbar. Kandidaten: K1 den Lookup in resolve.ts teilen (invasiv) · K2 eine eigene
    Relay-Suche mit derselben Projektion (resolve.ts unberührt) · K3 `ServeResult` erweitern
    (invasiv, bricht die Zusage "shape-gleich"). Client: der Admin-Client (service_role).
(3) G3 — A/B. Derselbe Split wie in der Auslieferung: `ab_test_active === true` und
    `deliverableVariantB` (src/lib/hosting/variant.ts). Das Flag ist die Autorität, nicht das
    Cookie (Archiv der Phase 9, "DEAKTIVIEREN"). ABGELEITET: Das Varianten-Cookie
    (`__Host-ps_v`, HttpOnly, Secure, SameSite=Lax, Path=/) geht bei einem same-origin-`fetch`
    mit (Standard `credentials: "same-origin"`).
(4) G4 — FORMULAR-KENNUNG. Format `PS_ID_RE` (`/^ps-[a-z0-9]{6}$/`, src/lib/detect.ts), nicht
    exportiert. Gesucht wird allein im Mapping-Satz des aus dem Host bestimmten Projekts
    (`elementId` und `type: "formTarget"`); eine globale Suche gibt es nicht. GRENZE: ein
    verwaistes Mapping (Formular nicht mehr im HTML) sieht der Server nicht (kein
    HTML-Parsing); seine Adresse hat `publishProject` trotzdem geprüft (alle `formTarget` in
    `alleMappings`).
(5) G5 — HOST-LISTE. Belegt ist allein `hook.eu2.make.com` (docs/formular-empfaenger-befunde.md,
    Abschnitt "Make", Befund (s)). Ein Muster (`*.make.com`, `hook.*.make.com`) liesse fremde
    Make-Dienste (Befund (ab): `email.gh-mail.make.com`) und ungelesene Zonen zu.
(6) G6 — WEITERLEITUNG. Die Form des Browser-Versands ist `application/x-www-form-urlencoded`
    aus `URLSearchParams(new FormData(…))` (`buildFormTargetRuntime`, src/lib/form-target.ts).
    Make: 200 "Accepted" = in der Warteschlange, nicht verarbeitet (Befund (d), gemessen (t)),
    auch bei Szenario AUS (Befund (z)); 410 bei unbekannter Kennung (Befund (y)); 400, 429 und
    500 gelesen, nicht gemessen; ein 3xx aus dem Modul "Webhook response" (Befund (e)); Rumpf
    bis 5 MB (Befund (c)); Standardantwort nach 0,095–0,230 s (Befund (aa)). EINE RUMPFGRENZE
    DER VERCEL-FUNKTIONEN STEHT NICHT IM BESTAND (docs/plattform-befunde.md, Vercel, Teil (d)
    zitiert Laufzeit, Nebenläufigkeit und Speicher). ABGELEITET: das Verhalten von Node-`fetch`
    bei `redirect: "manual"` (gibt den 3xx-Status zurück).
(7) G7 — ANTWORT. ABGELEITET: Next beantwortet eine nicht exportierte Methode mit 405. Sie sagt
    etwas über den Endpunkt, nicht über ein Projekt.
(8) G8 — LOGFREIHEIT. `errorName` (src/lib/errors.ts) gibt nur `err.name` aus. Die
    Detailansicht der Vercel-Logs führt "Outgoing Requests" (docs/plattform-befunde.md, Vercel,
    Teile (k) und (r)); die Make-Adresse samt Kennung erscheint damit im Log der Plattform. Ein
    Rumpf-Feld führt die Detailansicht nicht (Teil (r)).
(9) G9 — KILL-SWITCH. Die Auslieferung prüft `domains.blocked_at` und `projects.blocked_at`
    (resolve.ts); der Ingest nur den zweiten (Vorrat P13.6-29).
(10) G10 — MANDANTENTRENNUNG. Die Suche ist durch `.eq("id", domain.project_id)` auf ein Projekt
    beschränkt; ein Test braucht eine gefälschte Datenbank, die Filter WIRKLICH auswertet.
(11) DIE SUPABASE-DOKU-LESUNG DER PLANRUNDE (docs/db-regeln.md, vierte Regel; Skill
    `supabase-doku`) — DATUM 2026-09-29; FORM gezielte Suche mit `textContent` des
    `<main>`-Elements (Playwright), keine Volllesung. FUNDSTELLEN: JS-Referenz
    (supabase.com/docs/reference/javascript), Abschnitt `maybeSingle()` — "Query result must be
    zero or one row (e.g. using .limit(1)), otherwise this returns an error." · dieselbe Seite,
    "Response types" — "supabase-js always returns a data object (for success), and an error
    object (for unsuccessful requests)." · dieselbe Seite, Abschnitt `abortSignal(signal)` —
    "Set the AbortSignal for the fetch request. You can use this to set a timeout for the
    request." · Guide "Row Level Security", Abschnitt "Bypassing Row Level Security" — "A
    secret key authorizes access through the service_role Postgres role, which has the
    bypassrls attribute." FOLGE FÜR DEN BAU: `maybeSingle` mit mehr als einer Zeile ist ein
    Fehler und gilt als "nicht zugestellt"; `{data, error}` getrennt ausgewertet; jede Abfrage
    mit `abortSignal` und Zeitlimit (Muster `persistEvent`, src/lib/analytics/persist.ts); die
    Autorisierung trägt allein die Host-Bestimmung. Sonst nichts.

**Setzung P13.6-59 — DIE ENTSCHEIDUNGEN DER PLANRUNDE 13.6-3.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Bau-Auftrag der Scheibe 13.6-3.
REVIDIERBAR; ein Owner-Widerspruch hebt sie auf.
- Q1 — K2: eine eigene Relay-Suche mit derselben Projektion; die geteilten Prädikate
  (`deliverableVariantB`, `nonEmptyHtml`, `parseVariantCookie`) werden nur lesend
  wiederverwendet; ein Paritäts-Test (R-PARITY) hält die Urteile von Relay-Suche und Resolver
  zusammen. GRUND: Die Serve-Route wird für ein Refactoring nicht angefasst.
- Q2 — A/B BEI AKTIVEM TEST OHNE GÜLTIGES COOKIE: beide Mapping-Sätze durchsuchen; weiterleiten,
  wenn genau einer ein Ziel zur Kennung trägt oder beide dieselbe Adresse; bei zwei
  verschiedenen Adressen "nicht zugestellt". GRUND: A/B-Tests ändern fast immer Text, nicht
  das Formular-Ziel; fail-closed kostete echte Leads. Das Cookie wählt nur zwischen zwei
  veröffentlichten und geprüften Adressen desselben Projekts.
- Q3 — "zugestellt" 204, "nicht zugestellt" 502, je ohne Rumpf; 405 für andere Methoden ist
  hinnehmbar.
- Q4 — eine Logzeile je Fehlschlag, geschlossenes Vokabular, der Upstream-Status als Zahl.
- Q5 bis Q7 — Zeitlimits 1 500 ms je Abfrage und 5 000 ms für die Weiterleitung, eingehender
  Rumpf höchstens 64 KiB, die Kennung in der Query (`?f=`) — wie geplant.
- Q8 — UMLEITUNGEN: `redirect: "manual"`, NIE folgen; 2xx UND 3xx gelten als "zugestellt".
  GRUND: Ein 3xx von Make entsteht laut Befund (e) aus einem Antwort-Modul des Szenarios, also
  nach Empfang; als Fehlschlag gewertet entstünden doppelte Leads. GRENZE: gelesen, nicht
  gemessen; dass Node-`fetch` mit "manual" den 3xx-Status zurückgibt, ist ABGELEITET.
  GRENZE DER STUFE: Braucht ein Szenario mit Antwort-Modul länger als das Zeitlimit, meldet das
  Relay "nicht zugestellt", obwohl Make verarbeitet — ein erneutes Absenden erzeugt einen
  doppelten Lead. Messkandidat, offen; für die Betreiber-Dokumentation Punkt (8) am offenen
  Punkt "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" (docs/offene-punkte.md).
- Q9 — Die Make-Adresse in Vercels "Outgoing Requests" ist hinnehmbar (Setzung P13-6 der Phase
  13; seit Scheibe 13.6-1 steht sie ohnehin im `action`-Attribut).
- Q10 — An Setzung P13.6-20, erster Punkt: ersetzt durch P13.6-57. Der übrige Wortlaut bleibt.
- Q11 — Exporte bleiben browser-direkt, auch mit einer Adresse der Host-Liste; vermerkt als
  GRENZE an Owner-Entscheidung P13.6-54 (Auslegung des Architekten, dem Owner mitgeteilt).
- Q12 — Der Regions-Befund steht in docs/plattform-befunde.md, Vercel, Teil (u).
- Q13 — 405 bei nicht exportierten Methoden, das Verhalten von Node-`fetch` bei `redirect` und
  das Cookie bei same-origin sind ABGELEITET (Vermerk P13.6-58, Punkte (3), (6), (7)).

### Abschluss der Scheibe 13.6-3

**Vermerk P13.6-60 — ABSCHLUSS DER SCHEIBE 13.6-3 (RELAY-ENDPUNKT). Bau-Commit `aa05235`**
("feat(relay): Formular-Relay-Endpunkt /api/f — Stufe 1, nur Make eu2, noch ohne Aufrufer").
LIVE-TEST BESTANDEN.

(0) PROVENIENZ DER PUNKTE (1) BIS (6): GEMESSEN, OWNER, live, 2026-09-29, Chrome (Version nicht
    angegeben), Vercel-Logs (Detailansicht), übermittelt im Auftrag der Abschluss-Runde. Die
    Schritt-Bezeichnungen sind die der Owner-Fassung der Anleitung. Request-ID, Deployment-ID und
    Tracking-Schlüssel stehen bewusst nicht in dieser Datei; die Make-Adresse nur verkürzt.

(1) V1/L0 — TESTSEITE MIT FORMULAR-ZIEL:
    · vor dem Push: 18816 Bytes, sha256
      `71ccff7b92af0df4d050329bbb59ae25e7d8a5555b4def5f87d5d5ded37503bd`;
    · nach dem Deploy, OHNE Neu-Veröffentlichen: identisch; je zweimal gleich gemessen.
    · nach dem Deploy: normales Abschicken des Formulars → Danke-Seite, Eingang bei Make
      (browser-direkt, unverändert).

(2) V2 — die Formular-Kennung: `ps-i215n8`.

(3) V3 — VOR DEM PUSH: `POST /api/f?f=ps-i215n8` → 405, kein Eingang bei Make.
    · EINORDNUNG (CC, GELESEN AM CODE): Vor dem Bau-Commit lief ein unbekannter Pfad auf dem
      Serving-Host in die Serve-Route, die nur `GET` kennt (`proxy`, src/proxy.ts). Damit ist die
      in Vermerk P13.6-1, Punkt (5), als ABGELEITET geführte 405 für einen neuen Pfad gemessen.
      Die 405 für eine nicht exportierte Methode an `/api/f` NACH dem Bau (Vermerk P13.6-58,
      Punkt (7)) ist damit NICHT gemessen; sie bleibt ABGELEITET.

(4) L1 — NACH DEM DEPLOY, derselbe Aufruf mit `probe=relay-l1`:
    · Antwort 204; genau ein Eingang bei Make mit `probe` `relay-l1`.
    · Detailansicht `POST /api/f`: Search Params `f=ps-i215n8` · Middleware ohne ausgehende
      Anfrage · Function Invocation mit drei ausgehenden Anfragen (GET, GET, POST), das POST an
      `hook.eu2.make.com/icdb…` · kein Rumpf-Feld · keine Log-Meldung · KEINE Referer-Zeile ·
      Ausführung 492 ms · empfangen in `fra1`.
    · ZUORDNUNG DER ZWEI GET, ABGELEITET (CC, am Code), NICHT GEMESSEN: die zwei Abfragen der
      Relay-Suche (`domains`, dann `projects`; `lookupRelayProject`,
      src/lib/relay/resolve-relay.ts). Ihr Ziel-Host ist nicht gemeldet.
    · "Middleware ohne ausgehende Anfrage" deckt sich mit dem Code: Auf dem Serving-Host lässt
      `proxy` den Pfad durch, ohne `updateSession` (Gegenstück: docs/plattform-befunde.md,
      Vercel, Teil (s), App-Host mit Sitzungs-Cookie).
    · "Keine Log-Meldung" deckt sich mit dem Code: Der Erfolgsweg schreibt keine Zeile (Test R-OK).
    · SETZUNG P13.6-48 (R1) LIVE BESTÄTIGT, mit Grenze: Der Aufruf setzte
      `referrerPolicy: "no-referrer"`; die Sonde vom selben Tag ohne diese Angabe zeigte eine
      Referer-Zeile (docs/plattform-befunde.md, Vercel, Teil (r)). GRENZE: Die Sonde war eine
      andere Anfrage (`/api/e` aus der App); eine Kontrollanfrage an `/api/f` OHNE
      `no-referrer` ist nicht gemessen.

(5) L2 — erwartet "unbekannte Kennung": 502, kein Eingang bei Make; Log-Meldung
    `[relay] not delivered: bad-id` statt der erwarteten `unknown-id`.
    · URSACHE NICHT GEPRÜFT. Vermutung des Owners: "f=" stand doppelt in der Adresse, weil die
      Anleitung lautete "mit f=ps-zzz999 statt deiner Kennung".
    · ABGLEICH (CC, gemessen mit Node, 2026-09-29): `ps-zzz999` besteht `PS_ID_RE`
      (src/lib/detect.ts); `new URL("…/api/f?f=f=ps-zzz999").searchParams.get("f")` ergibt
      `"f=ps-zzz999"`, und das besteht `PS_ID_RE` nicht. Die Vermutung ist damit mit dem Code
      verträglich — was eingegeben wurde, ist nicht erhoben.
    · Der Weg `unknown-id` ist durch L3 live belegt.

(6) L3 und L4:
    · L3 — MANDANTENTRENNUNG: auf dem Host eines ANDEREN Projekts mit der Kennung `ps-i215n8` →
      502, kein Eingang bei Make, Log-Meldung `[relay] not delivered: unknown-id`.
    · L4 — KILL-SWITCH: Projekt per SQL gesperrt (`projects.blocked_at`) → die Seite zeigt die
      Sperrseite ("Diese Seite wurde aufgrund von Richtlinienverstößen deaktiviert." — der Satz
      steht wörtlich in `renderBlockedPage`, src/lib/hosting/blocked-page.ts), der Relay-Aufruf →
      502, kein Eingang bei Make. Entsperrt → die Seite ist wieder da.
    · NICHT GEMELDET: der Relay-Aufruf nach dem Entsperren; ein Mitläufer mit 204 im Lauf von L2
      und L3.

(7) BAU (CC, 2026-09-29, am Stand vor dem Commit `aa05235`):
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, 1 Warnung in
      src/lib/tracking/consent.test.ts (von der Scheibe nicht berührt); `vitest run` 101 Dateien,
      2675 Tests (vorher 99 Dateien, 2554 Tests); `next build` exit 0, Route `/api/f` gelistet.
    · Mutationen, volle Suite, Vorhersage je vor dem Lauf, ALLE GETROFFEN: M1 (Host-Liste
      umgangen) 10 rot · M2a (Rumpf im Nicht-2xx-Zweig geloggt) 6 · M2b (`err.message` statt
      `errorName`) 3 · M3 (beide Kill-Switch-Zweige entfallen) 6 · M4a (projektfremde Suche als
      Rückfall) 1, R-TENANT-1 an der ersten Zusicherung, eine fremde Zustellung · M4b (`eq("id")`
      entfällt) 2, R-TENANT-1 und -2 je an der POSITIVEN Zusicherung, die vorab benannte Kaskade
      über `maybeSingle` · M5 (`redirect: "follow"`) 6 · M6 (Timer der Weiterleitung entfällt) 1,
      per Test-Zeitlimit · M7 (ohne Cookie die erste Adresse) 1, R-AB4c.
    · M2a, VORHERSAGE VOR DEM LAUF NACHGEZOGEN: von 1 auf 6, weil R-NON2XX die Logzeile wörtlich
      prüft.
    · Byte-Kontrolle der sieben neuen Dateien am committeten Objekt: CR 0, CRLF 0, NUL 0.

(8) ABWEICHUNGEN VOM PLAN, IM BAU DEKLARIERT:
    · `allowedRelayEndpoint` (src/lib/relay/hosts.ts) liefert die geprüfte Adresse (`href`) oder
      null, statt eines Wahrheitswerts.
    · `lookupRelayProject` ist exportiert (für R-PARITY); `RelayTarget` liefert die Konfiguration,
      nicht die Adresse.
    · Q8, Ergänzung: Eine Antwort vom Typ `opaqueredirect` (Status 0) zählt als zugestellt, weil
      das Verhalten von Node-`fetch` bei `"manual"` ABGELEITET ist.
    · Kommentar in src/proxy.ts: drei Zeilen angefügt, keine geändert.
    · An src/proxy.test.ts liefen ein Heredoc und `sed -i` (Ganz-Datei-Schreiber); volle
      Byte-Kontrolle ohne Befund.
    · Tests über den Plan hinaus: R-ROUTE, R-SOURCE, R-SIZE-Positivkontrolle, R-REDIR mit
      `opaqueredirect`, R-DBERR (mehrdeutig, keine Liste, leeres HTML).

(9) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN — Anweisungen, die mit der Scheibe
    abgelaufen sind:
    · aus dem GEGENSTAND der Satz "Zugeschnitten am 2026-09-29; der Plan folgt in einer eigenen
      Runde."; der Gegenstand selbst steht im Abschluss-Kopf des Zuschnitts;
    · der Abschnitt "Bindend für die Scheibe 13.6-3" — eine Liste von Zeigern auf
      Owner-Entscheidungen P13.6-16, -17, -18, -54, -55 und Setzungen P13.6-20 bis -25, -48 bis
      -51, -56, -57; die Entscheidungen selbst stehen unverändert an ihrem Ort;
    · der Abschnitt "Ausser Scope der Scheibe 13.6-3" — Anschluss und Schalter (13.6-4),
      Ratenbegrenzung (13.6-5) und Zapier stehen in Setzung P13.6-56; "jedes Tracking-Ereignis
      vom Server" regeln Setzungen P13.6-4 und P13.6-24.
    STEHEN GEBLIEBEN: die drei Grenzen der Scheibe, darunter "ohne Ratenbegrenzung bis 13.6-5";
    Vermerk P13.6-58 und Setzung P13.6-59 samt Grenzen; Setzungen P13.6-56 und P13.6-57 an ihrem
    Ort unter den Architekten-Setzungen der Phase.

(10) GRENZEN, als Grenzen benannt:
    · NUR IM TEST BELEGT, nicht live: die Host-Liste und ihre Ränder, falsche Medientypen, der
      App-Host, die A/B-Wahl, die Zeitlimits, die Grössengrenze, eine echte Umleitung von Make.
    · ABGELEITET, weder im Test noch live: 405 für eine nicht exportierte Methode an `/api/f`,
      das Verhalten von Node-`fetch` bei `redirect: "manual"`, das Varianten-Cookie bei
      same-origin.
    · nur Chrome, eine Make-Zone (eu2), eine Testseite.
    · Der Endpunkt ist öffentlich und ohne Ratenbegrenzung bis 13.6-5 (Grenzen der Scheibe).

## Zuschnitt Scheibe 13.6-4

**ABGESCHLOSSEN AM 2026-09-30 — Bau-Commit `3b631a2`, Live-Test bestanden; Abschluss-Vermerk
P13.6-70.**
- GEGENSTAND: "Anschluss im Seitenskript und Datensparmodus" — die vierte Bau-Scheibe der
  Phase 13.6 und die zweite der Stufe 1 (Setzung P13.6-56).
  · Das Seitenskript einer GEHOSTETEN Seite schickt ein Formular mit Ziel an das Relay
    (`POST /api/f?f=<Kennung>`), wenn die Zieladresse auf der Host-Liste steht und das Ziel
    nicht im Datensparmodus ist.
  · "Zugestellt" (204) → Danke-Seite und Track wie bei "erreicht". Alles andere → das Formular
    bleibt mit der Meldung stehen (Entscheidung P13-17 der Phase 13).
  · Im Editor bekommt jedes Formular-Ziel einen Schalter für den Datensparmodus.
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen und Grenzen, die über die Scheibe
  hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist: Vermerk P13.6-70, Punkt (11).

### Architekten-Setzungen zur Scheibe 13.6-4

PROVENIENZ aller vier: ARCHITEKTEN-SETZUNG 2026-09-30, übermittelt im Auftrag der
Zuschnitt-Runde der Scheibe 13.6-4. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf. Wo
"(CC)" steht, ist die Formulierung bzw. die Ableitung von CC, nicht vom Architekten.

**Setzung P13.6-61 — BESTANDSZIELE: EIN FORMULAR-ZIEL OHNE ANGABE ZUM DATENSPARMODUS GEHT BEIM
NÄCHSTEN VERÖFFENTLICHEN AUF DAS RELAY ÜBER, SOFERN SEINE ADRESSE AUF DER HOST-LISTE STEHT.**
- GRUND: Das folgt aus Owner-Entscheidung P13.6-54 — für bekannte Webhook-Dienste ist das Relay
  der Standard.
- GRENZE: Bereits veröffentlichte Seiten ändern sich erst durch Neu-Veröffentlichen (Dauerregel
  "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY").
- ZUR REICHWEITE, GELESEN AM CODE (CC, Stand `3a06ea9`): Die Host-Liste trägt heute allein
  `hook.eu2.make.com` (`RELAY_HOSTS`, src/lib/relay/hosts.ts). Ein Ziel einer anderen Make-Zone
  oder eines anderen Dienstes bleibt browser-direkt (Owner-Entscheidung P13.6-54, zweiter
  Punkt).

**Setzung P13.6-62 — DAS RELAY VERWEIGERT EIN ZIEL IM DATENSPARMODUS.** Ergänzung an
src/lib/relay/relay.ts aus der Scheibe 13.6-3.
- GRUND: Sonst liefen Formularinhalte über unseren Server, obwohl der Betreiber genau das
  ausgeschlossen hat. Der Schalter gilt damit auch serverseitig.
- GRENZE, ABGELEITET (CC): Das Relay liest den Schalter aus der VERÖFFENTLICHTEN Fassung
  (Setzung P13.6-20). Ein Schalter, der gespeichert, aber nicht veröffentlicht ist, wirkt weder
  im Seitenskript noch im Relay; bis zum Neu-Veröffentlichen schickt die Seite weiter, wie sie
  veröffentlicht wurde.

**Setzung P13.6-63 — ZIEL, NICHT ZUSAGE: SEITEN, DEREN FORMULAR-ZIELE ALLE DIREKT SCHICKEN,
BLEIBEN BYTE-GLEICH ZU HEUTE.**
- GRUND (CC): Relay-Code gehört nur in den Text einer Seite, die ihn braucht (Dauerregel "WAS
  EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE …"); jede übrige Seite bleibt
  dann mit einem Byte-Nachweis prüfbar.
- GRENZE: Ob das erreichbar ist, klärt der Plan; weicht er ab, begründet er es.
- EINGESCHRÄNKT 2026-09-30 (ARCHITEKT, Setzung P13.6-86 der Phase 13.6): Für Seiten MIT
  Formular-Ziel ist das Ziel aufgegeben; Seiten OHNE Formular-Ziel bleiben byte-gleich. Der Titel
  beschreibt den Stand davor.

**Setzung P13.6-64 — DER RÜCKFALL OHNE SKRIPT BLEIBT UNVERÄNDERT** (`action` = eingetragene
Adresse samt Versandform, Setzung P13.6-32 der Scheibe 13.6-1).
- GRUND (CC): Ohne Skript gibt es keinen Relay-Aufruf; der Rückfall bringt den Lead an die
  eingetragene Adresse (Vermerk P13.6-37, Punkt (3), L4).
- GRENZE, ABGELEITET (CC): Auch ein Relay-Ziel schickt im Rückfall ohne Skript browser-direkt an
  den Empfänger, weil die Adresse im `action`-Attribut des ausgelieferten Textes steht. Der
  Schalter steuert allein den Weg MIT Skript.

### Ausser Scope der Scheibe 13.6-4

- eine Anzeige des Relay-Status für den Betreiber — ungebaut; sie steht an keiner anderen
  Stelle dieser Datei und bleibt deshalb hier stehen (Vermerk P13.6-70, Punkt (11)).

### Grenzen der Scheibe 13.6-4

- Bereits veröffentlichte Seiten ändern sich erst durch Neu-Veröffentlichen (Setzung P13.6-61).
- Exporte bleiben browser-direkt, auch mit einer Adresse der Host-Liste (Setzung P13.6-59, Q11).
- ABGELEITET (CC): Ab dieser Scheibe erreichen Besucher den Endpunkt über unseren Code; er bleibt
  ohne Ratenbegrenzung bis 13.6-5 (Grenzen der Scheibe 13.6-3). Heute gibt es keinen fremden
  Nutzer (CLAUDE.md, "## Modus"; Owner-Entscheidung P13.6-18).

### Planrunde der Scheibe 13.6-4

**Vermerk P13.6-65 — BEFUNDE DER GATES G1 BIS G8 DER PLANRUNDE** (CC, 2026-09-30, HEAD
`2f84d76`; Code-Stand `3a06ea9`). GELESEN AM CODE, soweit nicht anders gekennzeichnet; KEIN
BEFUND DIESES VERMERKS IST LIVE GEMESSEN.
(1) G1 — LAUFZEIT. Versand in `__psFormTargetSend` (Text aus `buildFormTargetRuntime`,
    src/lib/form-target.ts): Laufzeit-Wache, Rumpf `URLSearchParams(new FormData(f, submitter))`,
    Timer `FORM_TARGET_TIMEOUT_MS`, `fetch(cfg.endpoint, {method: "POST", mode: "no-cors",
    keepalive: true, body})`. "Erreicht" allein bei `r.type === "opaque"`; dann `onReached`
    gekapselt und `window.location.href = cfg.thanksUrl`, sonst `fail()` (Sperre frei, Meldung).
    Der Zweig im submit-Listener ist `formTargetBranch` in `buildWiringScript`
    (src/lib/generate.ts), vor der Sperre `submittedForms`. Ein Relay-Weg passt als EINE
    isolierbare Einsetzung (R2) hinter den Timer; Wache, Rumpf, Timer, Sperre, Meldung und
    `onReached` bleiben. Ohne Relay-Ziel bleibt der Text zeichengleich, wenn
    `buildFormTargetRuntime` ein Argument `withRelay` bekommt und der Datenblock das neue Feld
    entfernt wie heute `fieldNames`. Kein bestehender Test wird beabsichtigt rot: Die
    Engine-Tests übergeben kein Merkmal, und die Editor-Tests mit Formular-Ziel prüfen den
    Export oder die Riegel, keiner den Veröffentlichungs-Text.
(2) G1 — W-B2 WIRD EIN HOHLER PIN. W-B2 (src/lib/generate.test.ts) bildet die Veröffentlichung
    als `generateFunctional` OHNE Merkmal nach, und seine Vorlage trägt ein Ziel auf
    `hook.eu2.make.com`. Nach der Scheibe bliebe er grün, bildete den Veröffentlichungs-Weg aber
    nicht mehr ab (Dauerregel "EIN GRÜNER TEST IST KEIN BELEG, DASS DER GRUND SEINER GRÜNHEIT
    DERSELBE GEBLIEBEN IST").
(3) G2 — VERÖFFENTLICHEN GEGEN EXPORT. Heute unterscheidet sie allein das Argument
    `capiProxyUrl` von `buildDocumentFor` (src/components/CodeImporter.tsx): der Export über
    `buildExportDocument` mit `getCapiProxyUrl()`, das Veröffentlichen mit dem Literal
    `"/api/e"`. Ein ausdrückliches Merkmal gibt es nicht. Ein neuer Parameter an
    `buildDocumentFor` braucht weder die Serve-Route noch `publishProject`; das Server-Tor dort
    ruft `formTargetProblem` und erfasst ein neues Feld über src/lib/form-target.ts.
(4) G3 — KONFIGURATION. `FormTargetConfig` (src/lib/mappings.ts) trägt `endpoint`,
    `thanksUrl`, `fieldNames?`; `configEqual` zählt die Felder einzeln auf. `formTargetProblem`
    ist der Leser an vier Stellen: `publishProject`, `formTargetDocumentProblem` (Riegel),
    `FormTargetActions` (nur mit den Eingaben), `handleRelay`. Der Datenblock entfernt heute
    allein `fieldNames`.
(5) G3 — ZWEI SPEICHERWEGE VERLIEREN EIN NEUES FELD LAUTLOS. In `FormTargetActions`
    (src/components/ActionPanel.tsx) bauen `withNames`/`handleSubmit` und
    `handleConfirmNames` die Konfiguration aus `endpoint`, `thanksUrl` und `fieldNames` neu;
    `handleAssignFormTarget` (src/components/CodeImporter.tsx) ersetzt sie über `upsertMapping`
    als Ganzes. Ein "Neue Feldnamen bestätigen" stellte einen eingeschalteten Datensparmodus
    damit still auf Relay zurück.
(6) G3 — src/lib/mappings.ts trägt ein NUL-Byte (`i/-text`, Vorrat P13-37 der Phase 13); jede
    Änderung dort braucht die volle Byte-Kontrolle.
(7) G4 — EDITOR. `allowedRelayEndpoint` (src/lib/relay/hosts.ts) ist im Client importierbar: die
    Datei trägt kein `server-only` und importiert allein `normalizeFormTargetHost`. Der
    bisherige Erklärtext `FORM_TARGET_EXPLAIN` ("gehen die Felder direkt an deine Zieladresse")
    wird mit dem Relay-Standard falsch.
(8) G5 — RELAY. Die kleinste Ergänzung ist ein Zweig in `relay` (src/lib/relay/relay.ts) hinter
    der Werte-Prüfung und vor der Host-Liste, mit dem Vokabular-Eintrag "data-saver".
(9) G6 — DER AUFRUF. Relative Adresse `RELAY_PATH` mit `?f=<Kennung>`, derselbe Rumpf, `mode:
    "same-origin"`, `credentials: "same-origin"` (Varianten-Cookie), `redirect: "error"`,
    `referrerPolicy: "no-referrer"`, `keepalive: true`; derselbe Timer. "Zugestellt" allein bei
    Status 204. Die zwei Abfragen und die Weiterleitung des Servers liegen bei höchstens
    8 000 ms (Test R-TIME-REL); Upload und Kaltstart sind darin nicht enthalten.
(10) G7 — Der Track-Pfad (`onReached`, `submittedForms`, `__psMetaFire`) bleibt zeichengleich;
    nur der Auslöser wechselt von "opaque" auf 204.
(11) G8 — KOLLISIONEN, IN DER PLANRUNDE GEMELDET: Invariante I1, I3 und J9 der Phase 13 sowie
    Setzung P13-21 treffen den Relay-Weg in ihrem Wortlaut (Ziel `/api/f` statt der
    eingetragenen Adresse; "erreicht" bei 204 statt "opaque"). Aufgelöst durch Setzung P13.6-67.
    Dazu der A/B-Randfall: Bei aktivem Test ohne Cookie und gleicher Adresse in A und B liefert
    `resolveRelayTarget` (src/lib/relay/resolve-relay.ts) die Konfiguration aus A.

**Setzung P13.6-66 — DIE ENTSCHEIDUNGEN DER PLANRUNDE 13.6-4.**
PROVENIENZ: ARCHITEKTEN-SETZUNG, übermittelt im Bau-Auftrag der Scheibe 13.6-4 am 2026-09-30.
ABWEICHUNG, GEMELDET (CC): Der Auftrag datiert die Entscheidungen auf den 2026-09-29; die
Planrunde lief am 2026-09-30. REVIDIERBAR; ein Owner-Widerspruch hebt sie auf.
- Q1 — (a): Der A/B-Randfall bleibt fail-closed. Trägt bei aktivem Test ohne Cookie A den
  Datensparmodus und B nicht, verweigert das Relay die Anfrage der Seite B; der Besucher sieht
  die Meldung.
- Q2 — `dataSaver?: true` im Datenmodell (kein `false`; beim Ausschalten wird der Schlüssel
  entfernt). `"relay":true` ist die Marke im ausgelieferten Text. Sie ist ein KONTRAKT:
  Nachlegen geht, Herunternehmen nicht.
- Q3 — Der Schalter steht nur in der Eingabe-Ansicht und nur bei einer Adresse der Host-Liste.
  Ein verborgener gespeicherter Wert bleibt erhalten.
- Q5 — Der Live-Test misst die Dauer der Anfrage an `/api/f`.
  ZUR HÄLFTE ERFÜLLT 2026-09-30: gemeldet ist die Dauer der Funktion im Vercel-Log, nicht die
  Netzwerk-Dauer der Anfrage (Vermerk P13.6-70, Punkt (3)).
- Q6 — Die Nachzüge (Betreiber-Dokumentation; der offene Punkt "IM BROWSER-DIREKTEN WEG
  ERSCHEINT BEI FALSCHER ODER GELÖSCHTER ZIELADRESSE DIE DANKE-SEITE …") folgen mit dem
  Abschluss-Vermerk.
  ERLEDIGT 2026-09-30: Punkt (9) am offenen Punkt "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE"
  samt Stub-Zeile in CLAUDE.md; datierte Ergänzung am offenen Punkt "IM BROWSER-DIREKTEN WEG
  …" (docs/offene-punkte.md), Titel und Stub unverändert.
- Q7 — GRENZE: `referrerPolicy` ist nur in Chrome geprüft.
- Die zwei Speicherwege aus Vermerk P13.6-65, Punkt (5), führen `dataSaver` mit. W-B2 bleibt
  als Pin OHNE Merkmal stehen und sagt das in seinem Kommentar; W-B2R ist sein Zwilling mit
  Merkmal.

**Setzung P13.6-67 — NEUFASSUNG FÜR DEN RELAY-WEG: I1, I3, J9 UND P13-21 DER PHASE 13.**
PROVENIENZ: ARCHITEKTEN-SETZUNG (Q4), übermittelt im Bau-Auftrag der Scheibe 13.6-4 am
2026-09-30. REVIDIERBAR. Das Archiv der Phase 13 bleibt unverändert; das Phasenende hebt diese
Neufassung.
- Für Formular-Ziele im RELAY-WEG gilt statt I1: "Formularinhalte gehen ausschliesslich an die
  eingetragene Adresse — über das Relay (P13.6-16), nie an /api/e, nie an ein Tracking-Ziel,
  nie in unsere Datenbank oder Logs".
- Statt I3 und P13-21: "zur Danke-Seite nur bei Status 204 des Relays; sonst bleibt das
  Formular, eine Meldung erscheint, ein erneuter Versuch ist möglich".
- J9 gilt für Seiten ohne Relay-Ziel unverändert, für Seiten mit Relay-Ziel mit der Einsetzung
  R2 als einziger Änderung.
  NACHGETRAGEN 2026-09-30 (ARCHITEKT, Setzung P13.6-88 der Phase 13.6, (c)): Seit der Scheibe
  "Zurück-Cache" trägt die Laufzeit eine zweite Einsetzung, den `pageshow`-Listener aus Setzung
  P13.6-86 — auf allen drei Wegen. Der Satz darüber beschreibt den Stand davor.
- Im Datensparmodus und für Adressen ausserhalb der Host-Liste gelten I1, I3, J9 und P13-21
  unverändert.

**Owner-Entscheidung P13.6-68 — DIE OBERFLÄCHENTEXTE DER SCHEIBE 13.6-4.**
PROVENIENZ: OWNER-VORGABE, übermittelt im Bau-Auftrag der Scheibe 13.6-4 am 2026-09-30.
BINDEND für diese Scheibe; das Redesign darf sie neu fassen.
- Schalter: "Datensparmodus: direkt vom Browser senden, ohne Pagesmith-Server"
- Hilfetext: "Aus (empfohlen): Pagesmith leitet die Eingaben weiter und prüft, ob sie ankommen.
  Scheitert das, sieht der Besucher eine Meldung statt der Danke-Seite. An: Der Browser sendet
  direkt; ob die Eingaben ankommen, prüft dann niemand."
- Infozeile bei einer Adresse ausserhalb der Liste: "Diese Adresse beliefert der Browser direkt.
  Die Zustellprüfung über Pagesmith gibt es derzeit für Make-Webhooks der Region EU2."
- Anzeige-Zustand: "Zustellung: über Pagesmith, mit Prüfung" · "Zustellung: direkt vom Browser
  (Datensparmodus)" · "Zustellung: direkt vom Browser"
- Erklärtext der Kachel (`FORM_TARGET_EXPLAIN`): "Beim Absenden gehen die Eingaben an deine
  Zieladresse – bei unterstützten Diensten über Pagesmith mit Zustellprüfung, sonst direkt vom
  Browser – und der Besucher landet auf deiner Danke-Seite."

### Abschluss der Scheibe 13.6-4

**Vermerk P13.6-70 — ABSCHLUSS DER SCHEIBE 13.6-4 (ANSCHLUSS IM SEITENSKRIPT UND
DATENSPARMODUS). Bau-Commit `3b631a2`** ("feat(form-target): Formulare gehosteter Seiten
schicken über das Relay, Datensparmodus im Editor"); Vorrat-Commit `4e46d96`. LIVE-TEST
BESTANDEN.

(0) PROVENIENZ DER PUNKTE (1) BIS (6): GEMESSEN, OWNER, live, 2026-09-30, Chrome im
    Inkognito-Fenster (Version nicht angegeben), übermittelt im Auftrag der Abschluss-Runde.
    Bytes und sha256 über `fetch(location.href, {cache: 'no-store'})`, je zweimal gleich.
    Testseite `projekt-n-sy5bjj.publayer.net`, Formular `ps-i215n8`. Die Make-Adresse steht nur
    verkürzt (`hook.eu2.make.com/icdb…`); Request-ID und Tracking-Schlüssel stehen bewusst
    nicht in dieser Datei.

(1) V1/R1 — SEITE OHNE FORMULAR-ZIEL: 30493 Bytes, sha256
    `40c83cb36a543162717af8a01143246ed139d2cbfa7373f7888c39ca848f37e5`, vor dem Push und nach
    Deploy und Neu-Veröffentlichen identisch. Dieselben Werte wie in Vermerk P13.6-37, Punkt
    (1), und Vermerk P13.6-45, Punkt (1) (GEMESSEN AM BESTAND, CC).

(2) V2 UND R2 — TESTSEITE, alter Code, ohne Datensparmodus: 18816 Bytes, sha256
    `4f801fa8776f5e97ac584aa5ad887e457be89f7b362279cfec481d76412757e4`. Vor dem
    Neu-Veröffentlichen schickte die Seite nach dem Deploy weiter direkt an
    `hook.eu2.make.com`, keine Anfrage an `/api/f`, Danke-Seite, Eingang bei Make.
    · GEMESSEN AM BESTAND (CC): Vermerk P13.6-60, Punkt (1), führt für dieselbe Testseite
      ebenfalls 18816 Bytes, aber sha256 `71ccff7b…`. Gleiche Länge, anderer Hash; die Ursache
      ist nicht erhoben (Kandidat: Schlüssel-Reihenfolge des Datenblocks, Punkt (7)).

(3) L1 — NACH DEM NEU-VERÖFFENTLICHEN:
    · zweimal `POST /api/f?f=ps-i215n8` → 204, Danke-Seite, je ein Eingang bei Make;
    · Vercel "Function Invocation" 663 ms (erster Aufruf) und 187 ms (zweiter); die
      Netzwerk-Dauer der Anfragen ist NICHT gemeldet (Setzung P13.6-66, Q5);
    · keine Referer-Zeile bei `/api/f`, wohl bei `/api/e` — Setzung P13.6-48 (R1) damit auch am
      Aufruf aus dem Seitenskript bestätigt, nur in Chrome (Setzung P13.6-66, Q7);
    · AB DEM DRITTEN KLICK keine Reaktion, keine Anfrage. Wie der Owner zur Formularseite
      zurückkam, ist NICHT gemeldet. Befund und Entscheidung: Owner-Entscheidung P13.6-71.

(4) L2 — DER KERNFALL: Zieladresse `https://hook.eu2.make.com/` mit erfundener Kennung →
    `/api/f` 502; die Meldung "Wir konnten den Empfang deiner Angaben nicht sicherstellen.
    Bitte sende das Formular noch einmal." (der deutsche Text in `NOTICE_TEXTS`,
    src/lib/form-target.ts — GELESEN AM CODE, CC); keine Danke-Seite, kein Eingang bei Make.
    Mit der echten Adresse wieder zugestellt. Damit ist Setzung P13.6-67 live belegt: Eine
    falsche Make-Adresse zeigt dem Besucher die Meldung statt der Danke-Seite.

(5) DER DATENSPARMODUS:
    · L3 — an (über "Ziel bearbeiten" → Schalter → "Ziel übernehmen", Editor neu geladen,
      veröffentlicht): Anzeige "Zustellung: direkt vom Browser (Datensparmodus)"
      (`DELIVERY_DATA_SAVER`, src/components/ActionPanel.tsx); 18830 Bytes, sha256
      `c470da07588e7a6693f92dd747cb263cfef8415e4386ebf90ca3bab12cc80db9`; Versand direkt an
      `hook.eu2.make.com`, kein `/api/f`, Danke-Seite, Eingang bei Make.
    · L4 — im Datensparmodus aus der Konsole `POST /api/f` → 502, Vercel-Log
      `[relay] not delivered: data-saver`. Setzung P13.6-62 live belegt.
    · L5 — aus, neu veröffentlicht: 19876 Bytes, sha256
      `0621dc802fb60c02d1278ecb032ce1af25f75882f530f757b3da7b3fb3cd77b5`; Versand über
      `/api/f`, Danke-Seite, Eingang bei Make.

(6) L6 UND R3:
    · L6 — Adresse ausserhalb der Host-Liste: kein Schalter, die Infozeile im Wortlaut von
      Owner-Entscheidung P13.6-68.
    · R3 — der Export der Testseite trägt weder `/api/f` noch "relay" (Setzung P13.6-59, Q11).

(7) DER DIFFERENZ-NACHWEIS LIVE (GEMESSEN, CC, 2026-09-30, Aufklärung zu L3; Sonde und
    Seitentext ausserhalb des Repos):
    · Die Live-Seite, per `curl` zweimal geholt (Cache-Busting-Köpfe, unkomprimiert, `fra1`,
      kein `Set-Cookie`): 19876 Bytes, sha256 gleich L5.
    · Die Einsetzung R2 aus dem echten `buildFormTargetRuntime` (Differenz der Aufrufe mit und
      ohne `withRelay`, Zerlegung exakt, für `de` und `en` gleich): 1033 Bytes, im Live-Text
      genau einmal; die Marke `,"relay":true` (13 Bytes) genau einmal.
    · Beides entfernt: 18830 Bytes, aber ein anderer sha256 als L3. Positivkontrolle: ohne die
      Entfernung 1046 Bytes Unterschied.
    · Derselbe Datenblock in der Schlüssel-Reihenfolge nach Neu-Laden (`type`, `config`
      {`endpoint`, `thanksUrl`}, `elementId` statt `elementId`, `type`, `config`), neu kodiert
      über `embedInScript`: 18830 Bytes, sha256 GLEICH L3.
    · FOLGE: Die Datensparmodus-Seite ist live die Relay-Seite ohne die zwei Einsetzungen.
      Einziger weiterer Unterschied ist die Schlüssel-Reihenfolge — die Auflage der Dauerregel
      "EIN LIVE-NACHWEIS ÜBER AUSGELIEFERTEN TEXT MISST IM GELADENEN DOKUMENT …" (L3 nach
      Neu-Laden veröffentlicht, L5 direkt nach "Ziel übernehmen"; Vorrat P13-62 der Phase 13).
      Dass Postgres jsonb-Schlüssel so ordnet, ist ABGELEITET; getragen wird es durch den
      Hash-Treffer.
    · SUCHE mit Positivkontrollen: `dataSaver`, `Datensparmodus`, `fieldNames` je 0 im Live-Text
      und im rekonstruierten L3; ausserhalb von R2 steht allein die Marke; `/api/f`,
      `referrerPolicy`, `same-origin` nur in R2.

(8) V2 → L3 (+14 BYTES): UNGEKLÄRT, AUSSERHALB DES GENERATORS.
    · Ausgeschlossen durch den Diff von `3b631a2` (ohne Relay-Ziel ändert sich ausser
      Kommentaren nichts an der Ausgabe — GELESEN AM CODE, CC), den Test RT-10b
      (src/lib/form-target.test.ts) und den Nachweis in Punkt (7).
    · KEINE EINZELNE ZUSAMMENHÄNGENDE EINFÜGUNG (GEMESSEN, CC): jede 14-Byte-Streichung aus dem
      rekonstruierten L3, in beiden Schlüssel-Reihenfolgen, gegen V2 und gegen `71ccff7b…` —
      0 Treffer; Positivkontrolle: eine eingepflanzte Streichung wurde an ihrer Lage gefunden.
    · GELESEN AM CODE (CC), zur Einordnung: "Ziel übernehmen" (`handleAssignFormTarget`,
      src/components/CodeImporter.tsx) ruft `anchorMappingTarget` → `stabilizeIds`
      (src/lib/detect.ts): DOMParser, `stabilizeDoc`, Serialisierung über `outerHTML`.
      `generateFunctional` (src/lib/generate.ts) serialisiert auf DEMSELBEN Weg; Spuren der
      Normalform im Live-Text (etwa `required=""`) belegen deshalb nichts über den Editor-Code.
      `stabilizeDoc` setzt je Element 30 Bytes (` data-pagesmith-id="ps-…"`), nicht 14.
    · Kandidaten, KEINER BELEGT: Bearbeitungen im Schritt L2 an Code, Adresse oder
      Einstellungen; nicht-idempotentes Parsen. Keine spätere Handlung hängt daran; nicht
      weiter untersucht. Anlass von Hebungs-Kandidat P13.6-73.

(9) BAU: Gates und Mutationsproben des Bau-Commits stehen weder in dieser Datei noch im
    Material der Abschluss-Runde; sie werden hier nicht nachgetragen. Die Commit-Nachricht nennt
    "Seiten ohne Relay-Ziel bleiben byte-gleich gegen Vorher-Werte".

(10) GRENZEN, als Grenzen benannt:
    · nur Chrome, eine Make-Zone (eu2), eine Testseite; kein A/B live.
    · Die Danke-Seite der Testseite (`testdankeseite.irgendwas`) löst nicht auf (GEMESSEN, CC,
      nslookup, 2026-09-30: "Non-existent domain"); die "Danke-Seite" war eine Fehlerseite des
      Browsers. Die Navigation ist damit belegt, eine echte Danke-Seite nicht.
    · Die Netzwerk-Dauer von `/api/f` ist nicht gemessen (Punkt (3)).
    · Der A/B-Randfall (Setzung P13.6-66, Q1) ist live nicht geprüft.

(11) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN — Anweisungen, die mit der Scheibe
    abgelaufen sind:
    · aus dem GEGENSTAND der Satz "Zugeschnitten am 2026-09-30; der Plan folgt in einer eigenen
      Runde."; der Gegenstand selbst steht im Abschluss-Kopf des Zuschnitts;
    · der Abschnitt "Bindend für die Scheibe 13.6-4" — eine Liste von Zeigern auf
      Owner-Entscheidungen P13.6-16, -18, -54, -55 und Setzungen P13.6-20 bis -22, -48 bis -51
      und -59 (Q11); die Entscheidungen selbst stehen unverändert an ihrem Ort;
    · aus "Ausser Scope der Scheibe 13.6-4" drei Zeilen: die Ratenbegrenzung und Zapier stehen
      in Setzung P13.6-56 und an Setzung P13.6-14, "jedes Tracking-Ereignis vom Server" regeln
      Setzungen P13.6-4 und P13.6-24.
    STEHEN GEBLIEBEN: die Zeile "eine Anzeige des Relay-Status für den Betreiber" (sie steht an
    keiner anderen Stelle dieser Datei); die Setzungen P13.6-61 bis P13.6-64; die Grenzen der
    Scheibe; Vermerk P13.6-65, Setzungen P13.6-66 und P13.6-67 und Owner-Entscheidung P13.6-68.
    Je ein Auflösungs-Satz steht an Setzung P13.6-66, Q5 und Q6.

(12) NACHGEZOGEN IN DIESEM COMMIT: Punkt (9) am offenen Punkt "BETREIBER-DOKUMENTATION FEHLT —
    DREI PUNKTE" samt Stub-Zeile in CLAUDE.md; datierte Ergänzung am offenen Punkt "IM
    BROWSER-DIREKTEN WEG ERSCHEINT BEI FALSCHER ODER GELÖSCHTER ZIELADRESSE DIE DANKE-SEITE …"
    (docs/offene-punkte.md; Titel, Trigger und Stub unverändert, weil sie weiter zutreffen);
    Owner-Entscheidung P13.6-71, Arbeit P13.6-72, Hebungs-Kandidat P13.6-73; die Reihenfolge an
    Setzung P13.6-14; eine Ergänzung an Vorrat P13.6-69.

**Hebungs-Kandidat P13.6-73 — EIN VERGLEICHSWERT FÜR EINEN LIVE-BYTE-VERGLEICH WIRD UNMITTELBAR
VOR DEM VERGLICHENEN SCHRITT ERHOBEN, NACH DENSELBEN BEARBEITUNGSSCHRITTEN IM EDITOR — NICHT VOR
EINEM SCHRITT, DER DIE EINGABE VERÄNDERN KANN.**
PROVENIENZ: ARCHITEKT, übermittelt im Auftrag der Abschluss-Runde der Scheibe 13.6-4 am
2026-09-30. KANDIDAT für eine Dauerregel; ENTSCHEIDET DAS PHASENENDE.
- ANLASS: V2 wurde vor dem Schritt L2 erhoben, L2 veränderte die Eingabe, L3 wich um 14 Bytes ab,
  deren Ursache nicht mehr zu klären war (Vermerk P13.6-70, Punkt (8)).
- ENTFÄLLT, sobald ein Byte-Vergleich serverseitig gegen denselben Eingabestand läuft.
- BEZUG: Dauerregel "EIN LIVE-NACHWEIS ÜBER AUSGELIEFERTEN TEXT MISST IM GELADENEN DOKUMENT, NIE
  AN EINER GESPEICHERTEN DATEI" — ihre Herkunfts-Auflage (Mappings aus derselben Herkunft) ist
  die nächste Nachbarin; ebenso "EIN VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT …", die den
  frühesten Zeitpunkt setzt, während dieser Kandidat den spätesten setzt (Abgrenzung CC).
- NACHGETRAGEN 2026-10-01 (ARCHITEKT, übermittelt im Auftrag der Abschluss-Runde der Scheibe
  "Zapier ins Relay") — ZWEITER FALL: Ein NEUES Projekt, erstmals ohne Neuladen veröffentlicht,
  liefert einen Vorher-Wert mit anderer Eingabe — der Tracking-Schlüssel fehlte im Client.
  V-Z der Zapier-Testseite trug deshalb keine Meta-Laufzeit, die Seite nach Neuladen und
  Veröffentlichen schon; der Differenz-Nachweis ging erst per vollständiger Rückrechnung auf
  (Vermerk P13.6-103 der Phase 13.6, Punkte (4) und (7); Produktbefund: Vorrat P13.6-105).

## Zuschnitt Scheibe 13.6-5

**ABGESCHLOSSEN AM 2026-09-30 — Bau-Commit `fd1e089`, Live-Test bestanden; Abschluss-Vermerk
P13.6-81.**
- GEGENSTAND: "Ratenbegrenzung am Relay" — die fünfte Bau-Scheibe der Phase 13.6 und die
  dritte der Stufe 1 (Setzung P13.6-56). Das Relay (`POST /api/f`, `handleRelay`,
  src/lib/relay/relay.ts) bekommt eine Begrenzung JE PROJEKT (Setzung P13.6-23).
- ZWECK: Missbrauchsabwehr, nicht Durchsatzsteuerung. Die Schwelle wird auf Missbrauch
  kalibriert, nicht auf Erfolg — sonst fallen echte Leads weg (dieselbe Kalibrierung wie das
  Tier-1-Item "PER-TENANT-RATE-LIMITING" in CLAUDE.md, "## Security Manifest & Launch
  Blocker").
- ANBIETER-LESUNG DER SCHEIBE, 2026-09-30 (CC): docs/plattform-befunde.md, Supabase-Abschnitt,
  Teile (av) bis (bc) (Funktionsrechte, `search_path`, `rpc()` des JS-Clients, `INSERT … ON
  CONFLICT`, `date_bin`, `now()`), und Vercel-Abschnitt, Teile (v) bis (aa) (Firewall: Rate
  Limiting, Attack Mode, Preise). Doku-Aussagen, keine Messung. Dazu die Postgres-Lesung zum
  `search_path` an Owner-Entscheidung P13.6-76.
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen, Entscheidungen und Grenzen, die über
  die Scheibe hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist und wo sein Inhalt steht: Vermerk P13.6-81, Punkt (10).

### Architekten-Setzung zur Scheibe 13.6-5

PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-30, übermittelt im Auftrag der Zuschnitt-Runde der
Scheibe 13.6-5. REVIDIERBAR; ein Owner-Widerspruch hebt sie auf. Die Fundstellen hat CC am
Bestand geprüft (2026-09-30, HEAD `95f49bd`); wo "(CC)" steht, stammt die Angabe von CC.

**Setzung P13.6-74 — DIE GESCHÜTZTEN INVARIANTEN I1 BIS I8 DER SCHEIBE 13.6-5.** Der Plan
bestätigt jede einzeln oder meldet einen Konflikt.
- I1 — `/api/f` antwortet auf POST ausschliesslich mit den zwei Antworten des Bestands: 204
  "zugestellt", 502 "nicht zugestellt", je ohne Rumpf. Kein dritter Status, kein Rumpf, keine
  für "begrenzt" unterscheidbare Antwort. FUNDSTELLEN: Setzung P13.6-21 (dem Besucher genau zwei
  ZUSTÄNDE) und Setzung P13.6-59, Q3 (die zwei STATUSWERTE; 405 für andere Methoden
  hinnehmbar); `delivered` und `notDelivered` in src/lib/relay/relay.ts. (CC: P13.6-21 trägt die
  Zustände, die Zahlen stehen erst in Q3; die 405 für andere Methoden ist Bestand und keine
  Antwort des POST-Wegs.)
- I2 — Formularinhalte sind Transit: nie Datenbank, nie Log, nie `/api/e`, nie Tracking-Ziel —
  auch nicht im Zähler, auch nicht teilweise. FUNDSTELLEN: Owner-Entscheidung P13.6-16;
  Setzung P13.6-50 (R3).
- I3 — Keine IP, kein User-Agent, keine fremde Identität als Zählgrundlage in der Datenbank.
  FUNDSTELLE: docs/offene-punkte.md, "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE",
  Festlegung vom 2026-08-15 ("KEINE fremden Nutzer-Identitäten in der eigenen Datenbank … auch
  nicht als Pseudonym und auch nicht als Hash"), dazu die Präzisierung vom 2026-08-19 (die IP
  wird "NIEMALS in der Datenbank gespeichert, persistiert oder in ein Log geschrieben");
  Setzung P13.6-23 zitiert die Festlegung.
- I4 — Das Projekt kommt allein aus dem Host (Setzung P13.6-57), die Adresse allein aus
  `published_content` (Setzung P13.6-20); die Host-Liste (`RELAY_HOSTS`,
  src/lib/relay/hosts.ts; Owner-Entscheidung P13.6-55) bleibt unverändert.
- I5 — Der Kill-Switch bleibt eigener, fail-closed Zweig vor der Weiterleitung; die Begrenzung
  ersetzt ihn nicht und hängt nicht von ihm ab. FUNDSTELLEN: Dauerregel "KILL-SWITCH ALS
  EXPLIZITER, FAIL-CLOSED ZWEIG"; Setzung P13.6-23; die zwei Sperr-Zweige in
  `lookupRelayProject` (src/lib/relay/resolve-relay.ts).
- I6 — Setzungen P13.6-48 bis P13.6-51 (R1 bis R4) bleiben unverändert.
- I7 — Der ausgelieferte Text der Seiten ändert sich nicht. Braucht der Plan das: STOPP.
  BEZUG (CC): Dauerregeln "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE …"
  und "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY".
- I8 — Eine neue Tabelle bekommt RLS ausdrücklich. FUNDSTELLE: Dauerregel "GRANTS SCHÜTZEN
  NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT".

### Offene Frage der Scheibe 13.6-5

- B12 — UNBEANTWORTET; sie steht an keiner anderen Stelle dieser Datei und bleibt deshalb hier
  (Vermerk P13.6-81, Punkt (10)): Die Abgrenzung zu Phase 14 — was für `/api/e`
  wiederverwendbar wäre, ohne dass diese Scheibe `/api/e` anfasst; und ob die Scheibe einen
  offenen Punkt auslöst, dessen Trigger die nächste Arbeit an einer bestimmten Datei ist.
  BEKANNT SEIT DER SCHEIBE (CC, GELESEN AM CODE): `countRelayHit` (src/lib/relay/rate-limit.ts)
  und die RPC sind relay-eigen (Tabelle `relay_rate_counters`, Setzung P13.6-75, E12); eine
  Wiederverwendung für `/api/e` ist nicht vorbereitet. Ausgelöst hat die Scheibe den offenen
  Punkt "DER TITEL-ZEIGER IN supabase/checks/db-stand.sql IST UNGEPRÜFT" (erledigt am
  2026-09-30, Commit `cc8fc98`).

### Grenzen der Scheibe 13.6-5

- Die Begrenzung gilt allein `/api/f`; `/api/e` und `/api/capi` bleiben unbegrenzt (Phase 14,
  Tier-1-Item "PER-TENANT-RATE-LIMITING").
- Der Zähler-Ausfall ist fail-open (Setzung P13.6-75, E4); belegt nur im Test, nicht live.
- Zwei gleichzeitige Anfragen desselben Projekts sind nicht gemessen.
- 120 je 60 s ist eine SCHÄTZUNG ohne echten Verkehr (E3).
- Die Plattform-Ebene (Vorrat P13.6-78 bis P13.6-80) ist nicht gebaut; das Aufruf-Kontingent
  aller Kundenseiten schützt die Scheibe nicht (der Zähler läuft in der Funktion).
- Heute gibt es keinen fremden Nutzer (CLAUDE.md, "## Modus"; Owner-Entscheidung P13.6-18).

### Planrunde der Scheibe 13.6-5

**Setzung P13.6-75 — DIE ENTSCHEIDUNGEN DER PLANRUNDE 13.6-5 (E1 BIS E12).**
PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-30, übermittelt im Auftrag der Runde "Vermerk der
Planrunde + Anbieter-Lesung" der Scheibe 13.6-5. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.
Formulierung CC; wo "(CC)" steht, ist die Angabe von CC am Bestand bzw. am Code geprüft
(2026-09-30, HEAD `f3385ad`), GELESEN AM CODE, nicht live gemessen.
- KEIN BAU-COMMIT: Dies ist die Planrunde; es entsteht keine Zeile Code und keine Migration. Der
  Bau folgt in einer eigenen Runde.
- ABWEICHUNG, GEMELDET (CC): Der Auftrag nannte den Eintrag "Vermerk". Er trägt
  Architekten-Entscheidungen und steht deshalb in der Gattung "Setzung" (Kopf dieser Datei, "ZWEI
  KLASSEN VON FESTLEGUNGEN"), wie Setzung P13.6-59 der Planrunde 13.6-3.
- GRENZE DES EINTRAGS (CC): Der Befund-Bericht der Planrunde zu B1 bis B12 steht NICHT in dieser
  Datei. Hier steht nur, was die Entscheidungen selbst tragen.
- E1 — MECHANISMUS (b′): eine Zeile je Projekt, atomar erhöht per RPC
  (`insert … on conflict do update … returning`).
  AUFLAGE: Das Fenster läuft nur vorwärts. Eine Anfrage aus einem älteren Fenster erhöht den
  laufenden Zähler; sie setzt den Fensterbeginn nie zurück.
  GRUND DER AUFLAGE, ABGELEITET (ARCHITEKT), am Bestand NICHT belegt: `now()` ist die
  Startzeit der Transaktion. Schreibt eine Anfrage aus Fenster T nach einer aus Fenster T+1 fest,
  setzte der Entwurf den Fensterbeginn auf T zurück.
- E2 — STELLE: unmittelbar vor der Weiterleitung, nach allen Prüfungen. Gezählt wird nur, was
  weitergeleitet würde — der dritte Kandidat aus B7 (im Auftrag "V3"; die Bezeichnung steht nicht
  im Bestand). Die Projekt-Kennung kommt additiv ins ok-Ergebnis der Relay-Suche
  (src/lib/relay/resolve-relay.ts).
  (CC) Die Stelle ist heute `return forward(endpoint, body);` in `relay`
  (src/lib/relay/relay.ts), hinter "host-not-listed". Kein ok-Ergebnis in resolve-relay.ts trägt
  heute eine Projekt-Kennung (`lookupRelayProject`: `published`, `abTestActive`;
  `resolveRelayTarget`: `config`).
- E3 — SCHWELLE: 120 Anfragen je 60 s je Projekt, festes Fenster, keine Stundendecke.
  SCHÄTZUNG, kein Verkehr gemessen. Die Konstante liegt in src/lib/relay/ und wird durch einen
  Test festgenagelt.
- E4 — FEHLERFALL DES ZÄHLERS: fail-open. Die Anfrage wird weitergeleitet; eine eigene Logzeile
  im geschlossenen Vokabular meldet den Ausfall.
  GRUND: Realistische Einzelausfälle des Zählers sind Bau- oder Rechtefehler, keine Flut. Eine
  kaputte Schutzschicht darf keinen Lead kosten — ein falscher Treffer kostet einen Lead.
  (CC) Das einzige bestehende Zählmuster, `countRecentAttempts` (src/lib/domains/audit.ts), ist
  fail-closed (Vermerk P13.6-19, Punkt (1)); E4 weicht davon bewusst ab. Eine bindende
  Entscheidung, die fail-closed verlangt, trägt der Bestand nicht; der fail-closed-Zweig aus
  Setzung P13.6-23 gilt dem Kill-Switch (I5 der Setzung P13.6-74).
- E5 — BEGRENZT: `notDelivered("rate-limited")`, dieselbe 502 wie jedes "nicht zugestellt" (I1 der
  Setzung P13.6-74). Die Logzeile trägt keine Projekt-Kennung; eine je Anfrage. Das Vokabular aus
  Setzung P13.6-59, Q4 (`RelayFailReason`, src/lib/relay/relay.ts) bleibt geschlossen bis auf die
  neuen Einträge.
- E6 — ZEITLIMIT DES ZÄHLERS: 1 000 ms. Der Test R-TIME-REL (src/lib/relay/relay.test.ts) rechnet
  künftig mit drei Umläufen.
  (CC) Heute rechnet er `2 * RELAY_LOOKUP_TIMEOUT_MS + RELAY_FORWARD_TIMEOUT_MS` gegen
  `FORM_TARGET_TIMEOUT_MS`. GERECHNET, NICHT GEMESSEN: 2 × 1 500 + 1 000 + 5 000 = 9 000 ms, unter
  10 000 ms — Setzung P13.6-22 bleibt erfüllt.
- E7 — KEIN TOPF JE IP IM SPEICHER der Funktion. GRUND: Je Instanz ist er unzuverlässig
  (ABGELEITET, ARCHITEKT); eine Begrenzung je IP gehört, wenn überhaupt, auf die Plattform.
  BEZUG: Setzung P13.6-23 ("je Projekt, nicht je IP").
- E8 — DER AUSSPERR-HEBEL (B6) IST BEWUSST HINGENOMMEN.
  GRUND: Die Make-Adresse steht im ausgelieferten `action`-Attribut (Setzung P13.6-32; Setzung
  P13.6-59, Q9) — ein Angreifer kann Make ohne uns fluten. Der Hauptnutzen der Begrenzung ist
  ein anderer: Sie hält die bis zu 5 s langen Weiterleitungen (`RELAY_FORWARD_TIMEOUT_MS`) eines
  Projekts aus der geteilten Funktions-Kapazität. Das Kontingent des Betreibers bei Make schützt
  sie nur für Verkehr über das Relay.
  GRENZE: Die Sperre trifft ein Projekt und dauert höchstens bis zum Ende des Fensters.
- E9 — PLATTFORM-FIREWALL: in Teil B dieser Runde gelesen, NICHT Teil des Baus 13.6-5.
  GELESEN 2026-09-30: docs/plattform-befunde.md, Vercel, Teile (v) bis (aa).
- E10 — MANIFEST: Das Tier-1-Item "PER-TENANT-RATE-LIMITING" (CLAUDE.md, "## Security Manifest &
  Launch Blocker") bekommt `/api/f` beim Abschluss-Vermerk der Scheibe ergänzt — beide Fassungen
  im selben Commit (CLAUDE.md und docs/claude-history/security-manifest-full.md).
  ERLEDIGT 2026-09-30 im Commit des Abschluss-Vermerks P13.6-81; der Status des Items ist
  unverändert.
- E11 — PROBE: Eine Probe unter supabase/checks/ für Tabelle und RPC (RLS, Grants, EXECUTE) ist
  freigegeben.
  ERLEDIGT 2026-09-30: supabase/checks/relay-rate-counters.sql, gefahren (Vermerk P13.6-81,
  Punkt (2)).
- E12 — TABELLE: relay-eigen, `relay_rate_counters`.
- OFFEN, ENTSCHEIDET DER OWNER NACH TEIL B: der `search_path` der neuen RPC — die Projektregel
  (docs/db-regeln.md, "DB-FUNKTIONEN + SEARCH_PATH") gegen die Empfehlung des Anbieters (offener
  Punkt "DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER PROJEKTREGEL AB").
  DIE LESUNG DAZU (2026-09-30): docs/plattform-befunde.md, Supabase, Teil (aw). Die Frage ist
  weiter offen.
  ENTSCHIEDEN 2026-09-30 (OWNER): Owner-Entscheidung P13.6-76 der Phase 13.6. Die zwei Sätze
  darüber beschreiben den Stand davor.
- NICHT UNTER E1 BIS E12, GEMELDET (CC): B11 fragt zusätzlich nach INVOKER oder DEFINER, nach
  einem Index und nach dem Aufräumen alter Zeilen; B12 nach der Abgrenzung zu Phase 14 und nach
  einem offenen Punkt mit Datei-Trigger. Keine der zwölf Entscheidungen nennt sie.
  FÜR B11 ENTSCHIEDEN 2026-09-30 (ARCHITEKT): Setzung P13.6-77 der Phase 13.6. B12 bleibt
  unbeantwortet.
- ABGLEICH MIT DEN INVARIANTEN DER SETZUNG P13.6-74 (CC, am Wortlaut): Keine Entscheidung ändert
  den ausgelieferten Text (I7); die Zählgrundlage ist das Projekt, keine IP und kein User-Agent
  (I3); der Zähler trägt keinen Formularinhalt (I2); die Antwort bei Begrenzung ist die 502 des
  Bestands (I1). Einen Widerspruch zu einer bindenden Entscheidung dieser Datei hat CC nicht
  gefunden.

**Owner-Entscheidung P13.6-76 — `search_path`: NEUE DB-FUNKTIONEN BEKOMMEN `set search_path = ''`
UND EINEN VOLL QUALIFIZIERTEN RUMPF; BESTEHENDE BLEIBEN UNVERÄNDERT.**
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-30, übermittelt im Bau-Auftrag der Scheibe 13.6-5.
BINDEND. Sie gilt über die Scheibe hinaus für jede neue DB-Funktion.
- GRUND DES OWNERS: der ausdrückliche Härtungs-Standard des Anbieters; künftige, strengere
  Prüfungen treffen neue Funktionen nicht.
- BEFUND DAZU, DAMIT NIEMAND EINEN WARN-ZWANG ALS GRUND LIEST: Der heutige Lint 0011 akzeptiert
  auch `public` — er feuert allein, wenn KEIN `search_path` gesetzt ist (docs/plattform-befunde.md,
  Supabase, Teil (aw); GELESEN am Quelltext des Lints, Zweig `main`, nicht an der Fassung
  unseres Projekts). Die Entscheidung folgt einer Empfehlung, keiner Bedingung.
- DEFINER, GEPRÜFT VOR DEM ANPASSEN DER REGEL (CC, 2026-09-30): Der Grund der bisherigen
  DEFINER-Fassung (`pg_catalog`, "NICHT public", weil ein in public angelegtes Objekt die
  Auflösung kapern könnte) spricht nicht gegen `''`. GELESEN 2026-09-30,
  postgresql.org/docs/17/runtime-config-client.html, Abschnitt `search_path`: "If pg_catalog is
  not in the path then it will be searched before searching any of the path items." Beide
  Werte lassen das temporäre Schema für Relationen und Typen zuerst durchsuchen (ebenda); die
  Postgres-Doku empfiehlt für DEFINER `pg_temp` als letzten Eintrag
  (postgresql.org/docs/17/sql-createfunction.html, "Writing SECURITY DEFINER Functions Safely",
  GELESEN 2026-09-30). Das trifft `pg_catalog` und `''` gleich. Die Regel ist deshalb auch für
  neue DEFINER-Funktionen angepasst. Diese Lesung steht nicht in docs/plattform-befunde.md: der
  Commit war auf vier Dateien begrenzt; sie steht hier und in der Regel.
- UMGESETZT IM SELBEN COMMIT: Regel "DB-FUNKTIONEN + SEARCH_PATH" in docs/db-regeln.md neu
  gefasst (Titel unverändert; die Zusage "zeichengleich" im Kopf jener Datei ist dort
  eingeschränkt); offener Punkt "DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER
  PROJEKTREGEL AB" gestrichen samt Stub-Zeile in CLAUDE.md.
- GRENZE: Bestehende Funktionen (`get_event_counts`, `get_adblock_loss`, `get_variant_counts`,
  `set_updated_at` mit `public`; `rls_auto_enable` mit `pg_catalog`, docs/db-stand.md,
  FUNKTIONEN) sind nicht angefasst. Eine Umstellung ist nur als eigene, je Funktion geprüfte
  Scheibe zulässig.

**Setzung P13.6-77 — B11: DIE RPC IST SECURITY INVOKER; KEIN ZUSATZ-INDEX; KEIN AUFRÄUMEN.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-30, übermittelt im Bau-Auftrag der Scheibe 13.6-5.
REVIDIERBAR; ein Owner-Widerspruch hebt sie auf. Die Gründe formuliert CC; wo "(CC)" steht,
stammt die Angabe von CC.
- SECURITY INVOKER. GRUND (CC): Der einzige Aufrufer ist der Admin-Client; `service_role` trägt
  `bypassrls` (docs/plattform-befunde.md, Supabase, Teil (n)). Stünde EXECUTE doch einmal einer
  anderen Rolle offen, hielte die RLS der Tabelle ohne Policy die Schreibung auf (ebenda, Teil
  (ax), FOLGERUNG) — als DEFINER wäre das der Aussperr-Hebel ohne Relay.
- KEIN ZUSATZ-INDEX: Der Primärschlüssel auf `project_id` trägt den Konflikt-Arbiter des
  Upserts und jeden Zugriff. GRUND: Auflage "PROAKTIVE INDIZES" (CLAUDE.md, Block A) verlangt
  einen Index für eine Spalte in WHERE/Matching; das ist hier der Primärschlüssel selbst.
- KEIN AUFRÄUMEN: eine Zeile je Projekt, gelöscht per Kaskade mit dem Projekt. Die Zeilenzahl
  ist durch die Zahl der Projekte begrenzt (ABGELEITET, CC).

**Setzung P13.6-82 — DIE TABELLE `relay_rate_counters` TRÄGT GENAU DREI SPALTEN: `project_id`,
`window_start`, `hits`.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-30, übermittelt im Bau-Auftrag der Scheibe 13.6-5;
hier festgehalten in der Abschluss-Runde, weil sie bis dahin nur im Auftrag stand. REVIDIERBAR;
ein Owner-Widerspruch hebt sie auf.
- GRUND: Setzung P13.6-74, I2 (kein Formularinhalt im Zähler) und I3 (keine IP, kein
  User-Agent, keine fremde Identität als Zählgrundlage) — eine weitere Spalte wäre der Ort, an
  dem eine davon hineingeriete.
- SIE IST DIE QUELLE DER ERWARTUNG des Wächters W-MIG-COLS (src/lib/relay/rate-limit.test.ts);
  der Bau-Bericht meldete, dass die Spaltennamen bis dahin in keiner Datei des Bestands standen
  (Vermerk P13.6-81, Punkt (8)).

### Abschluss der Scheibe 13.6-5

**Vermerk P13.6-81 — ABSCHLUSS DER SCHEIBE 13.6-5 (RATENBEGRENZUNG AM RELAY). Bau-Commit
`fd1e089`** ("feat(relay): Ratenbegrenzung je Projekt am Formular-Relay (Scheibe 13.6-5)").
LIVE-TEST BESTANDEN.
Doku-Commits der Scheibe: `f3385ad` (Zuschnitt) · `9a2d75f` (Planrunde, E1–E12) · `99b5ba8`
(Anbieter-Lesung) · `f9aff31` (`search_path` `''`, Setzungen P13.6-76/-77, Vorrat P13.6-78 bis
-80) · `cc8fc98` (docs/db-stand.md nach 0030) · dieser Commit (Abschluss).

(0) PROVENIENZ DER PUNKTE (1) BIS (5): GEMESSEN, OWNER, live, 2026-09-30, Chrome (Version nicht
    angegeben), übermittelt im Auftrag der Abschluss-Runde. Request-ID, Deployment-ID, Projekt-
    Kennung und Tracking-Schlüssel stehen bewusst nicht in dieser Datei; die Make-Adresse nicht.

(1) MIGRATION 0030 — applied_at 2026-09-30 10:23:41.087615+00, eingespielt VOR dem Push. Die
    Einordnung in docs/db-stand.md (Commit `cc8fc98`) zieht daraus die Reihenfolge Migration vor
    Deploy.

(2) PROBE supabase/checks/relay-rate-counters.sql (SQL-Editor, Owner): (1) bis (10) wie erwartet.
    Im Wortlaut gemeldet: PostgreSQL 17.6 · `service_role` delete = true · `relay_rate_hit`
    proconfig `search_path=""` · Mitläufer `get_event_counts` `search_path=public`. Der Kopf der
    Probe trägt den Lauf seit dem Bau-Commit.

(3) S0 UND S1 — DEPLOYMENT UND BYTE-GLEICHHEIT (Setzung P13.6-74, I7):
    · S0: Deployment `fd1e089` "Ready".
    · S1: Testseite `projekt-n-sy5bjj.publayer.net`, `fetch` mit `no-store` und sha256, je
      zweimal: vor der Migration und nach dem Deploy je 19876 Bytes, sha256
      `0621dc802fb60c02d1278ecb032ce1af25f75882f530f757b3da7b3fb3cd77b5`. Nicht neu
      veröffentlicht. Gegenprobe an einer anderen Seite: 30493 Bytes, sha256 `40c83cb3…37e5`
      (abweichend).
    · GEMESSEN AM BESTAND (CC): Beide Werte der Testseite gleichen L5 in Vermerk P13.6-70,
      Punkt (5); die Gegenprobe gleicht der "SEITE OHNE FORMULAR-ZIEL" (Vermerk P13.6-70,
      Punkt (1)). Der ausgelieferte Text hat sich nicht geändert.

(4) S2 — REGRESSION, NORMALER VERSAND: Danke-Seite, Eingang bei Make; Zähler `hits` = 1,
    `window_start` 2026-09-30 10:36:00+00. Vercel-Detail `POST /api/f`: 204, `fra1`, Function
    760 ms, "External APIs" mit 4 Einträgen (GET, GET, POST, POST), keine `[relay]`-Zeile.
    · DIE ZAHL DER AUSGEHENDEN ANFRAGEN IST DAMIT GEMESSEN, nicht mehr abgeleitet (Bau-Bericht:
      "erwartet vier … ABGELEITET"). Die ZUORDNUNG — zwei Abfragen der Relay-Suche, die RPC,
      die Weiterleitung an Make — bleibt ABGELEITET am Code; die Ziel-Hosts sind nicht gemeldet.
    · Gegenüber Vermerk P13.6-60, Punkt (4) (drei ausgehende Anfragen: GET, GET, POST) ist das
      eine hinzugekommene POST.

(5) S3 BIS S5 — DIE GRENZE UND DAS FENSTER:
    · S3: Zähler per SQL auf `window_start` = `now()` + 1 Stunde, `hits` = 120. Versand: die
      Meldung "Wir konnten den Empfang deiner Angaben nicht sicherstellen. Bitte sende das
      Formular noch einmal." (der deutsche Text in `NOTICE_TEXTS`, src/lib/form-target.ts —
      derselbe wie in Vermerk P13.6-70, Punkt (4)), kein Eingang bei Make, Vercel-Log
      `[relay] not delivered: rate-limited` ohne Projekt-Kennung. Setzung P13.6-75, E5 live
      belegt.
    · S4: danach `hits` = 121, ein weiterer Versand `hits` = 122; `window_start` beide Male
      unverändert 2026-09-30 11:40:37.689752+00; die Meldung bleibt. Ein ÄLTERES Fenster erhöht
      den laufenden Zähler und setzt den Fensterbeginn nicht zurück — Setzung P13.6-75, E1,
      LIVE BELEGT.
    · S5: Zeile gelöscht; Versand: Danke-Seite, Eingang bei Make, `hits` = 1, `window_start`
      2026-09-30 10:46:00+00.

(6) BAU (CC, 2026-09-30, am Stand vor dem Commit `fd1e089`):
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, 1 Warnung in
      src/lib/tracking/consent.test.ts (von der Scheibe nicht berührt); `vitest run` 102 Dateien,
      2738 Tests (vorher 101 Dateien, 2709 Tests); `next build` exit 0, Route `/api/f` gelistet.
      Unmittelbar vor dem Commit erneut gefahren, dasselbe Ergebnis.
    · Mutationen gegen src/lib/relay (nur relay.test.ts und rate-limit.test.ts erreichen die
      mutierten Module, GEMESSEN per Suche), Vorhersage je vor dem Lauf, Rücknahme per sha256
      belegt: M1 (Zähler-Aufruf entfällt) 9 rot · M2 (Zählung vor den Ziel-Prüfungen) 3 · M3
      (`>=` statt `>`) 1 · M4a/b/c (fail-closed bei zurückgegebenem Fehler / Wurf / Zeitlimit)
      2 / 1 / 1 · M5 (Projekt-Kennung in der Logzeile) 1 · M7 (Monotonie entfernt) 1 · M8
      (`public` aus dem EXECUTE-Entzug) 1 · M9 (`search_path` `''` → `public`) 1 — alle wie
      vorhergesagt.
    · M6 (Zeitlimit entfällt ganz): vorhergesagt 1, rot 2 — R-RL-OK zusätzlich, beide am
      fehlenden Abbruch-Signal; dieselbe Klasse. M6 bewegte zwei Achsen und ist geteilt worden:
      M6a (nur das Rennen entfällt) 1 rot, über das Test-Zeitlimit · M6b (nur der Abbruch
      entfällt) 2 rot, am Signal — beide wie vorab angesagt.
    · Byte-Kontrolle der vier neuen Dateien am committeten Objekt: CR 0, CRLF 0, NUL 0.
      src/lib/relay/resolve-relay.ts lief über einen Ganz-Datei-Schreiber; volle Byte-Kontrolle
      und Suche nach zerstörten Zeichen ohne Befund.

(7) ABWEICHUNGEN VOM PLAN, IM BAU DEKLARIERT:
    · Der Befund-Bericht der Planrunde steht nicht im Bestand (Setzung P13.6-75, "GRENZE DES
      EINTRAGS"); M1 bis M6 und die Kennungen R-RL-* sind im Bau definiert.
    · Die Fensterlänge geht als Argument `p_window_seconds` an die RPC; die einzige Quelle ist
      `RELAY_RATE_WINDOW_SECONDS` (src/lib/relay/rate-limit.ts).
    · Die Zeile bei Zähler-Ausfall lautet `[relay] fail-open: rate-counter-failed`; scheitert
      danach die Weiterleitung, entstehen zwei Zeilen (Test "R-RL-FAIL (Grenze)").
    · Das Zeitlimit wirkt zweifach (Abbruch-Signal und Rennen gegen den Timer); eine Rückgabe
      ohne ganze Zahl gilt als Ausfall.
    · Migration: `set lock_timeout = '3s'`, keine Klammer `begin`/`commit`, die übrigen
      Vorgabe-Rechte von `service_role` nicht entzogen.
    · R-SRC erwartet seither genau eine Schreibung (den Zähler); R-SOURCE läuft über das
      Verzeichnis.

(8) DIE SPALTENLISTE STAND BIS ZU DIESER RUNDE NUR IM BAU-AUFTRAG; sie ist jetzt Setzung
    P13.6-82.

(9) GRENZEN, als Grenzen benannt:
    · fail-open (Setzung P13.6-75, E4) ist nur im Test belegt, nicht live.
    · Zwei gleichzeitige Anfragen sind nicht gemessen.
    · nur Chrome, eine Testseite, eine Make-Zone (eu2).
    · 120 je 60 s ist eine SCHÄTZUNG ohne echten Verkehr (E3).
    · Die Plattform-Ebene (Vorrat P13.6-78 bis P13.6-80) ist nicht gebaut.
    · Ein zweiter Versand im SELBEN Fenster ohne Eingriff (`hits` 2 aus 1) ist nicht gemeldet.
    · "4 ausgehende Anfragen" ist gemessen; ihre Zuordnung nicht (Punkt (4)).

(10) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN — Anweisungen und Fragen, die mit der
    Scheibe abgelaufen sind:
    · aus dem GEGENSTAND der Satz "Zugeschnitten am 2026-09-30; der Plan folgt in einer eigenen
      Runde." und die Zeile "RUNDENFORM wie bei 13.6-1 bis 13.6-4: Planrunde → Bau → Live-Test
      → Abschluss-Vermerk.";
    · der Abschnitt "Bindend für die Scheibe 13.6-5" — Zeiger auf Setzungen P13.6-23, P13.6-56,
      die Reihenfolge an P13.6-14 und Owner-Entscheidung P13.6-18; alle stehen unverändert an
      ihrem Ort, die GRENZE an P13.6-23 trägt dort ihren Auflösungs-Satz;
    · aus "Offene Fragen der Scheibe 13.6-5" die Fragen B1 bis B11, je entschieden in Setzung
      P13.6-75: B1 und B7 → E2 (Stelle, gezählt wird nur Weitergeleitetes) · B2 → E1 und
      Setzung P13.6-74, I3 · B3 → E1 · B4 → E9 und Vorrat P13.6-78 bis -80 · B5 und B6 → E8 ·
      B8 → E3 · B9 → E4 · B10 → E5 · B11 → Setzung P13.6-77, Owner-Entscheidung P13.6-76 und
      die Rechte in der Migration 0030; dazu der Kopfsatz "ALLE OFFEN …" samt Auflösungs-Satz.
      Die Überschrift heisst seither "Offene Frage der Scheibe 13.6-5";
    · der Abschnitt "Ausser Scope der Scheibe 13.6-5" — `/api/e`/`/api/capi` stehen an Phase 14
      und im Tier-1-Item, die Scheibe "Zurück-Cache" an Arbeit P13.6-72, Zapier und die
      Host-Liste an Owner-Entscheidung P13.6-55 und Arbeit P13.6-27, die Anzeige des
      Relay-Status unter "Ausser Scope der Scheibe 13.6-4", der ausgelieferte Text an Setzung
      P13.6-74, I7;
    · aus "Grenzen der Scheibe 13.6-5" der Satz "Bis zum Bau dieser Scheibe bleibt der Endpunkt
      öffentlich und ohne Ratenbegrenzung …" — mit dem Bau abgelaufen; die Grenzen stehen jetzt
      dort neu.
    STEHEN GEBLIEBEN: Setzungen P13.6-74, P13.6-75 (mit Auflösungs-Sätzen an E10 und E11),
    Owner-Entscheidung P13.6-76, Setzungen P13.6-77 und P13.6-82, Vorrat P13.6-78 bis P13.6-80,
    B12 (unbeantwortet, an keiner anderen Stelle) und die Grenzen der Scheibe.

(11) NACHGEZOGEN IN DIESEM COMMIT: das Tier-1-Item "PER-TENANT-RATE-LIMITING" in CLAUDE.md und
    docs/claude-history/security-manifest-full.md (Setzung P13.6-75, E10; Status unverändert);
    eine Zeile an Setzung P13.6-14. Die Roadmap-Zeile 13.6 führt die Scheibe nicht als
    ausstehend und ist nicht geändert.

## Zuschnitt Scheibe Zurück-Cache

**ABGESCHLOSSEN AM 2026-09-30 — Bau-Commit `29d0d22`, Live-Test bestanden (nur Chrome);
Abschluss-Vermerk P13.6-89.**
- GEGENSTAND: Arbeit P13.6-72 der Phase 13.6 — nach der Rückkehr aus dem Zurück-Cache ist das
  Formular wieder absendbar (Owner-Entscheidung P13.6-71). Reihenfolge: Setzung P13.6-14.
- BENENNUNG, DEKLARIERT (CC): Der Bestand führt die Scheibe ohne Nummer (Scheibe "Zurück-Cache",
  Setzung P13.6-14 und Arbeit P13.6-72); die Überschrift übernimmt diesen Namen und vergibt keine
  Nummer.
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen, Entscheidungen und Grenzen, die über
  die Scheibe hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist und wo sein Inhalt steht: Vermerk P13.6-89, Punkt (10).

### Messung zur Scheibe Zurück-Cache

**Vermerk P13.6-85 — DER TOTE KNOPF NACH "ZURÜCK" IST GEMESSEN: TOT GENAU IN DEN RUNDEN MIT
WIEDERHERSTELLUNG AUS DEM ZURÜCK-CACHE, AUF BEIDEN GEHOSTETEN WEGEN (NUR CHROME).** KEIN
BAU-COMMIT: Messrunde; im Repo ändert sich keine Zeile Code.

(0) PROVENIENZ DER PUNKTE (1) BIS (6): GEMESSEN, OWNER, live, 2026-09-30, Chrome 154.0.8037.58
    (Stable, 64-Bit), übermittelt im Auftrag der Runde "Scheibe Zurück-Cache — Messvermerk,
    Zuschnitt, Plan". Testseite `projekt-n-sy5bjj.publayer.net`, A/B aus, Formular ohne
    Track-Aktion. Danke-Seite neu `https://meta-test-5nlm3e.publayer.net/`, neu veröffentlicht,
    der Editor vorher neu geladen. Gefahren ist die Messanleitung in Arbeit P13.6-72.

(1) M1 — DevTools "Test back/forward cache": "Successfully served from back/forward cache."

(2) POSITIVKONTROLLE des Diskriminators `__probe`: gesetzt `'P1'`, nach F5 `undefined`.

(3) RUNDE 1 (Relay): Absenden → Danke-Seite, Make +1. Zurück: auf der Konsole "pageshow
    persisted=true" und die Chrome-Meldung "Navigation to https://projekt-n-sy5bjj.publayer.net/
    was restored from back/forward cache". Klick: nichts sichtbar, Make +0. Felder gefüllt.
    · ANOMALIE: `window.__probe` nach der Rückkehr `undefined`, vor dem Absenden `'P1'` — im
      Widerspruch zu den beiden anderen Anzeigen. URSACHE UNGEKLÄRT; Kandidat (ABGELEITET): die
      Konsole las in einem anderen Kontext.

(4) RUNDE 2 (Relay): nach F5 Absenden → Danke-Seite, Make +1. Zurück: "Navigated to
    https://projekt-n-sy5bjj.publayer.net/", keine pageshow-Zeile, `__probe` `undefined` — frisch
    geladen. Felder weiter gefüllt. Klick → Danke-Seite, Make +1.

(5) RUNDE C (Datensparmodus an, veröffentlicht): Absenden → Danke-Seite, Make +1. Zurück:
    `__probe` `'P1'`. Klick blockiert, Make +0. Danach Datensparmodus aus, neu veröffentlicht.
    NICHT GEMELDET: Chrome-Meldung und pageshow-Zeile dieser Runde.

(6) VORHER-WERT FÜR DEN BAU (Datensparmodus aus), zweimal identisch: 19882 Bytes, sha256
    `02705566721fce17c9afd95584147cfcb9b67196e7007b484e9c22c0759dde43`, Kopf `cache-control:
    public, max-age=0, must-revalidate`.
    · GRENZE (CC): Ob der Editor vor diesem letzten Veröffentlichen neu geladen wurde, ist nicht
      angegeben. Die Herkunfts-Auflage der Dauerregel "EIN LIVE-NACHWEIS ÜBER AUSGELIEFERTEN TEXT
      MISST IM GELADENEN DOKUMENT …" (Schlüssel-Reihenfolge des Datenblocks, Vermerk P13.6-70,
      Punkt (7)) ist für diesen Wert damit offen.
    · Der Kopf deckt sich mit der Messung vom 2026-07-27 (Archiv der Phase 9, "CACHING-GATE");
      nachgemessen ist er seither erst hier (GEMESSEN AM BESTAND, CC).
    · ERSETZT 2026-09-30 (Abschluss der Scheibe, Setzung P13.6-88, (d)): Als Vorher-Wert des
      Differenz-Nachweises gilt V0 aus Vermerk P13.6-89, Punkt (1) — 19882 Bytes, sha256
      `e6ae154fb4af32427b3d78a15e9171c5b14115fe26b56c4a467dadefe3c1972f`, erhoben nach Neuladen
      des Editors. Der Wert darüber bleibt als Messung stehen; zu seiner Herkunft ebenda,
      Punkt (5).

(7) ERGEBNIS:
    · Tot genau in den Runden mit Wiederherstellung aus dem Zurück-Cache: Runde 1 (Relay) und
      Runde C (Datensparmodus). Lebendig in Runde 2 (frisch geladen).
    · Der ABGELEITETE Befund der Owner-Entscheidung P13.6-71 ist damit GEMESSEN — nur Chrome.
    · GRENZE (CC): Für den Datensparmodus gibt es keine Runde ohne Wiederherstellung; "genau" ist
      dort nur einseitig belegt. Firefox, Safari und der Export sind nicht gemessen.
    · ZUR FRAGE AUS ARBEIT P13.6-72, warum in L1 der zweite Versuch noch ging (CC): Runde 2 zeigt,
      dass derselbe Ablauf mit einem frischen Laden zurückkehren kann. Warum Chrome dort nicht
      aus dem Cache wiederherstellte, ist nicht gemessen; L1 ist damit verträglich, nicht erklärt.
    · Die Felder tragen nach der Rückkehr ihre Werte — nach der Wiederherstellung (Runde 1) wie
      nach frischem Laden (Runde 2), nur Chrome.

(8) FOLGE FÜR DAS INSTRUMENT (ARCHITEKT): Diskriminator für spätere Live-Tests sind die
    Chrome-Meldung und die pageshow-Zeile, nicht `__probe` allein.
    · GRENZE (CC, ABGELEITET): Die pageshow-Zeile stammt aus einem Listener, den der Owner in der
      Konsole setzt; ein frisches Laden verwirft ihn. Ihr FEHLEN trennt deshalb "frisch geladen"
      nicht von "Listener fehlte". Tragend ist ihre ANWESENHEIT samt Wert — und die
      Chrome-Meldung.

### Architekten-Setzung zur Scheibe Zurück-Cache

PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-09-30, übermittelt im Auftrag der Runde "Scheibe
Zurück-Cache — Messvermerk, Zuschnitt, Plan". REVIDIERBAR; ein Owner-Widerspruch hebt sie auf.
Wo "(CC)" steht, stammt die Angabe von CC (GELESEN AM BESTAND bzw. AM CODE, HEAD `2fdd8ba`).

**Setzung P13.6-86 — GESTALT K2: EIN `pageshow`-LISTENER LÖST BEI `persisted` DIE SPERRE DES
FORMULAR-ZIELS; `submittedForms` BLEIBT UNBERÜHRT.**
- Owner-Entscheidung P13.6-71 wörtlich; Setzung P13-26 der Phase 13 bleibt.
- VERWORFEN K1 (die Sperre bei Erfolg vor der Navigation lösen): Zwischen Antwort und
  Seitenwechsel öffnete sich ein Fenster, in dem ein zweiter Klick erneut sendet; heute schützt
  die Sperre auch dort (Phase 13, Live-Schritt L6 "Doppelklick: genau ein Eingang").
- VERWORFEN K3 (Ausschluss vom Zurück-Cache über Köpfe der Serve-Route): trifft jede gehostete
  Seite, liegt auf einer anderen Schicht und erreicht Exporte nie.
- REICHWEITE: alle drei Wege — Relay, browser-direkt, Export. GRUND: Der Fehler ist auf beiden
  gehosteten Wegen gemessen (Vermerk P13.6-85).
- DAS ZIEL AUS SETZUNG P13.6-63 ("Direkt-Seiten byte-gleich") WIRD FÜR SEITEN MIT FORMULAR-ZIEL
  BEWUSST AUFGEGEBEN. Seiten OHNE Formular-Ziel bleiben byte-gleich.
- INVARIANTEN:
  (1) `submittedForms` wird durch die Wiederherstellung nie geleert.
  (2) Die Sperre wird nur bei `persisted` gelöst, nie beim ersten `pageshow` einer frisch
      geladenen Seite.
  (3) Kein neuer globaler Name.
  (4) Kein fremder Knoten wird berührt (Dauerregel "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST
      ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN …"); ihre Ausnahme-Liste wird beim Abschluss um den
      Listener am `window` ergänzt, alt/neu.
      NACHGETRAGEN 2026-09-30 (Abschluss, CC): Die Ergänzung ist NICHT vollzogen, sondern
      vorgelegt — die Herleitung trägt eine Abgrenzung, die gegen die Listen-Form spricht
      (Vermerk P13.6-89, Punkt (9)). Der erste Satz der Invariante ist im Bau belegt (ZC-7).
      ENTSCHIEDEN 2026-09-30 (ARCHITEKT): Kandidat (B) — der Listener steht in der Abgrenzung der
      Herleitung, nicht in der Liste; Nachtrag an Setzung P13.6-88, (e).
  (5) Der ausgelieferte Text ändert sich nur als isolierbare Einsetzung, mit Differenz-Nachweis.
  (6) Seiten ohne Formular-Ziel bleiben byte-gleich.
  (7) Relay, die zwei Antworten, die Ratenbegrenzung, `/api/e` und die Serve-Route bleiben
      unberührt.
  (8) Kein Cookie, kein Storage.
- AUSSER SCOPE: Cache-Köpfe (K3) · ein neuer Seitenaufruf nach der Wiederherstellung · Firefox
  und Safari live (die Lösung nutzt ein Standard-Ereignis; live gemessen ist nur Chrome).
- GRENZE, LIVE: Dass kein zweiter Track entsteht, ist live nicht zu zeigen — das Testformular
  trägt keine Track-Aktion. Belegt wird es im Test, mit Mutation.
- GRENZE (CC, ABGELEITET aus der Dauerregel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM
  DEPLOY"): Bereits veröffentlichte Seiten und Exporte ändern sich erst durch Neu-Veröffentlichen
  bzw. Neu-Export; bis dahin bleibt der Knopf dort nach einer Wiederherstellung tot.
- KOLLISIONEN, GEMELDET (CC). Mit einer Owner-Entscheidung dieser Datei hat CC keine gefunden;
  beide Stellen sind Architekten-Setzungen:
  · Setzung P13.6-63 — dort steht der Auflösungs-Satz.
  · Setzung P13.6-67, dritter Punkt: "J9 gilt … für Seiten mit Relay-Ziel mit der Einsetzung R2
    als einziger Änderung." Diese Scheibe bringt eine zweite Einsetzung, auf allen drei Wegen. J9
    selbst (Archiv der Phase 13) bestimmt sich über I1 bis I8 und I10 ("Die Laufzeit aus 13-1 und
    ihre Invarianten bleiben unverändert — das sind I1 bis I8 und I10"). NICHT AUFGELÖST;
    P13.6-67 ist hier nicht geändert.
    AUFGELÖST 2026-09-30 durch Setzung P13.6-88, (c): Der Auflösungs-Satz steht an P13.6-67.
  · Zu Invariante (4): Die Ergänzung der Ausnahme-Liste weitet eine Dauerregel aus; nach dem
    Kopf von docs/immer-beachten.md verlangt das zuerst docs/immer-beachten-herleitung.md.
    NACHGETRAGEN 2026-09-30: Die Herleitung ist geladen; der Befund steht in Vermerk P13.6-89,
    Punkt (9).

### Planrunde der Scheibe Zurück-Cache

**Setzung P13.6-88 — DIE ENTSCHEIDUNGEN DER PLANRUNDE ZURÜCK-CACHE (a BIS f).**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-30, übermittelt im Bau-Auftrag der Scheibe
"Zurück-Cache". REVIDIERBAR; ein Owner-Widerspruch hebt jede auf. Der Plan, auf den sie
antwortet (P1 bis P7), steht im Bericht der Planrunde, nicht in dieser Datei. Wo "(CC)" steht,
stammt die Angabe von CC (GELESEN AM BESTAND bzw. AM CODE, HEAD `d1bc52b`).
- (a) EIN BEI DER RÜCKKEHR NOCH OFFENER VERSAND — KANDIDAT A: Die Sperre wird bei `persisted`
  für alle Formulare geleert, auch wenn ein Versand noch offen ist. Ein Versand, der beim
  Verlassen der Seite noch lief, kann nach der Wiederherstellung zu einem zweiten Lead führen.
  GRUND: Das Ergebnis ist ein Duplikat, kein Verlust — Owner-Entscheidung P13.6-71 ("ein
  korrigierter Lead wiegt mehr als ein vermiedenes Duplikat"); dieselbe Doppelung besteht heute
  schon nach dem Zeitlimit; die Kandidaten B und C brächten mehr ausgelieferten Code für einen
  Fall, dessen Häufigkeit ungemessen ist.
  (CC) Die Doppelung nach dem Zeitlimit tragen im Test K3a (nach dem Limit schickt ein zweiter
  Klick erneut) zusammen mit K3b bzw. RT-4 (ein spätes "opaque" bzw. 204 navigiert noch)
  (src/lib/form-target.test.ts); Setzung P13.6-22 benennt dieselbe Doppelung am Server-Zeitlimit.
  GRENZE DER SCHEIBE: Ob der Browser eine Seite mit laufendem Aufruf überhaupt aus dem Cache
  wiederherstellt und ob dessen Promise danach noch aufgelöst wird, ist NICHT ENTSCHEIDBAR am
  Code und nicht gemessen.
- (b) DIE EINSETZUNG TRÄGT KEINEN KOMMENTAR IM AUSGELIEFERTEN TEXT. GRUND: Einbahnstrasse
  (Dauerregel "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE …"); kein Hinweis
  auf Interna auf Kundenseiten. Die Erklärung steht als Quelltext-Kommentar ausserhalb der
  Zeichenkette. Die Sperre wird für alle Formulare geleert (`.length = 0`).
- (c) AN SETZUNG P13.6-67, DRITTER PUNKT, steht der Auflösungs-Satz: Die Laufzeit trägt seit
  dieser Scheibe eine zweite Einsetzung (Setzung P13.6-86).
- (d) V0 VOR DEM PUSH IST PFLICHT-SCHRITT DER LIVE-ANLEITUNG: Editor neu laden, veröffentlichen,
  Bytes, sha256 und `cache-control` zweimal messen. GRUND (CC): Die Herkunft des Vorher-Werts aus
  Vermerk P13.6-85, Punkt (6), ist offen (Schlüssel-Reihenfolge des Datenblocks); Hebungs-Kandidat
  P13.6-73.
  ERLEDIGT 2026-09-30: V0 gemessen, Vermerk P13.6-89, Punkt (1).
- (e) DIE ERGÄNZUNG DER AUSNAHME-LISTE der Dauerregel "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES
  FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN …" um den `pageshow`-Listener am `window` ist
  ARCHITEKTEN-ENTSCHEIDUNG. Vollzug beim Abschluss, nach Laden von
  docs/immer-beachten-herleitung.md; die Passage alt/neu steht im Bericht jener Runde.
  NACHGETRAGEN 2026-09-30 (Abschluss, CC): NICHT VOLLZOGEN, VORGELEGT — Vermerk P13.6-89,
  Punkt (9).
  REVIDIERT 2026-09-30 (ARCHITEKT) ZU KANDIDAT (B): Der `pageshow`-Listener steht in der
  Abgrenzung der Herleitung neben dem `DOMContentLoaded`-Listener des Custom-Pixel-Laders — kein
  Wiring-Listener, am `window`, ändert keine der fünf Achsen, leert allein die eigene Sperre. Die
  Liste im Kern bleibt unverändert. GRUND: Präzedenz der Herleitung; die Liste führt, was wie ein
  Eingriff aussieht, und bekäme sonst zwei gleichartige Listener nach verschiedenen Kriterien.
  Vollzogen in docs/immer-beachten-herleitung.md (Ergänzung vom 2026-09-30 an jener Regel);
  Vermerk P13.6-89, Punkt (9).
- (f) DAS HARNESS RÄUMT PER SPION AUF: Die `pageshow`-Handler, die ein Test registriert, werden
  danach entfernt; dazu die Zusicherung, dass nach jedem Test kein `pageshow`-Handler übrig ist.
  GRUND (CC): `mount` wertet die Skripte per `window.eval` im gemeinsamen Test-Window aus;
  Listener sammelten sich sonst über Tests hinweg an.
  GEBAUT in `29d0d22` (src/lib/form-target.test.ts); seine Wirkung zeigt die Mutation M-f in
  Vermerk P13.6-89, Punkt (7).

### Abschluss der Scheibe Zurück-Cache

**Vermerk P13.6-89 — ABSCHLUSS DER SCHEIBE "ZURÜCK-CACHE" (DER KNOPF NACH "ZURÜCK"). Bau-Commit
`29d0d22`** ("fix(form-target): Formular nach Rueckkehr aus dem Zurueck-Cache wieder absendbar").
LIVE-TEST BESTANDEN, nur Chrome.
Doku-Commits der Scheibe: `d1bc52b` (Messung, Zuschnitt K2, Vorrat) · `be6d2a6` (Planrunde,
Setzungen a–f) · dieser Commit (Abschluss).

(0) PROVENIENZ DER PUNKTE (1) BIS (6): GEMESSEN, OWNER, live, 2026-09-30, Chrome 154.0.8037.58,
    übermittelt im Auftrag der Abschluss-Runde. Testseite `projekt-n-sy5bjj.publayer.net` wie in
    Vermerk P13.6-85. Instrument: der Konsolen-Block aus dem Bau-Bericht (`fetch` mit
    `no-store`, sha256 über die Rohbytes, die Einsetzung gezählt und entfernt, Vergleich gegen
    den Vorher-Wert, Positivkontrolle, Prüfung Text = Rohbytes); der Block steht nicht in dieser
    Datei. Die Einsetzung ist dieselbe Zeichenfolge wie die Konstante `K2` in
    src/lib/form-target.test.ts, 125 Bytes.

(1) V0 — VORHER-WERT, ALTER CODE (Pflicht-Schritt aus Setzung P13.6-88, (d)): Editor neu geladen,
    veröffentlicht, zweimal identisch: 19882 Bytes, sha256
    `e6ae154fb4af32427b3d78a15e9171c5b14115fe26b56c4a467dadefe3c1972f`, `cache-control: public,
    max-age=0, must-revalidate`.
    · V0 ERSETZT den Vorher-Wert aus Vermerk P13.6-85, Punkt (6) (`02705566…de43`): gleiche
      Länge, anderer sha256. URSACHE ABGELEITET, nicht gemessen: die Schlüssel-Reihenfolge des
      Datenblocks (Herkunfts-Auflage der Dauerregel "EIN LIVE-NACHWEIS ÜBER AUSGELIEFERTEN TEXT
      MISST IM GELADENEN DOKUMENT …").
    · Gegenprobe an einer Seite ohne Formular-Ziel: 30493 Bytes, sha256 `40c83cb3…37e5` —
      dieselben Werte wie in Vermerk P13.6-81, Punkt (3) (GEMESSEN AM BESTAND, CC).
    · Selbsttest des Blocks mit V0 als Vorher-Wert, gegen V0: `ohneGleichVorher` true,
      `positivkontrolle` false — am unveränderten Text schlägt die Kontrolle erwartungsgemäss
      nicht an.

(2) L0 — nach dem Deploy `29d0d22` ("Ready"), nicht neu veröffentlicht: identisch mit V0. Der
    Deploy allein ändert den ausgelieferten Text nicht (Dauerregel "EIN AUSGELIEFERTES ARTEFAKT
    ALTERT NICHT MIT DEM DEPLOY").

(3) L1 — DER DIFFERENZ-NACHWEIS (Invariante (5) der Setzung P13.6-86; Dauerregel "WO EINE
    BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD …", alle fünf Schritte): Editor neu geladen,
    veröffentlicht, zweimal identisch.
    · Einsetzung 125 Bytes, genau 1-mal.
    · Neu 20007 Bytes, sha256
      `e283fa67a19f336a03290ca7e1132e0b292bbc27975bc6cd5196c3c03cf91500`.
    · Ohne die Einsetzung 19882 Bytes, sha256 = V0 (`ohneGleichVorher` true);
      `positivkontrolle` true; `textGleichRoh` true.
    · Die Seite ohne Formular-Ziel, ebenfalls neu veröffentlicht: unverändert 30493 Bytes,
      `40c83cb3…37e5` — Invariante (6).

(4) L2 — RELAY: Absenden → Danke-Seite → Zurück. Auf der Konsole "pageshow persisted=true" und
    die Chrome-Meldung "Navigation to https://projekt-n-sy5bjj.publayer.net/ was restored from
    back/forward cache" — der Diskriminator aus Vermerk P13.6-85, Punkt (8). Klick → Danke-Seite;
    beide Leads bei Make. Vorher, im selben Ablauf: Klick stumm, Make +0 (ebenda, Punkt (3)).

(5) L3 — DATENSPARMODUS an, veröffentlicht:
    · Einsetzung 1-mal; neu 18961 Bytes, sha256 `4df59bd6…2827`; ohne die Einsetzung 18836
      Bytes, sha256 `72a8d93d…54ec` (beide sha256 gekürzt übermittelt). 18961 − 18836 = 125,
      die Länge der Einsetzung (gerechnet, CC). Einen Vorher-Wert für diesen Zustand gibt es
      nicht.
    · Nach "Zurück" beide Anzeigen wie in (4); Klick → Danke-Seite, Eingang bei Make.
    · ZURÜCKGESCHALTET — Editor neu geladen, Datensparmodus aus, veröffentlicht, OHNE erneutes
      Neuladen: 20007 Bytes, sha256
      `0538d070939aa654cbc21e4d169eace0c0c69b887c8e43e1abdcd9057e0c199b`; ohne die Einsetzung
      sha256 `02705566…de43` — zeichengleich mit dem Wert aus Vermerk P13.6-85, Punkt (6)
      (GEMESSEN AM BESTAND, CC).
    · ANGABE DES AUFTRAGS (ARCHITEKT), AM BESTAND NICHT PRÜFBAR: Das sei "exakt der Stand nach
      Runde C der Messung, der mit derselben Abfolge entstand" — reproduziert, im Einklang mit
      der Herkunfts-Auflage, keine neue Regel. Vermerk P13.6-85 trägt die Abfolge jener Runde
      nicht (Punkt (6), GRENZE: ob der Editor vorher neu geladen wurde, "ist nicht angegeben").

(6) L4 — Editor neu geladen, veröffentlicht: Einsetzung 125 Bytes, 1-mal; neu 20007 Bytes,
    sha256 = L1; ohne 19882 Bytes, sha256 = V0; `ohneGleichVorher` true, `positivkontrolle` true,
    `textGleichRoh` true, `cache-control` wie V0. KEINE ABWEICHUNG. Derselbe Code ergab damit je
    nach Herkunft der Mappings zwei sha256 derselben Länge (L3, zurückgeschaltet, gegen L4); nach
    Neuladen ist L1 reproduziert.

(7) BAU (CC, 2026-09-30, am Stand vor dem Commit `29d0d22`):
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, die eine bekannte Warnung in
      src/lib/tracking/consent.test.ts; `vitest run` 102 Dateien, 2746 Tests (vorher 2738);
      `next build` exit 0.
    · Geändert: src/lib/form-target.ts (die Einsetzung `PAGESHOW_RESET` in
      `buildFormTargetRuntime`), src/lib/form-target.test.ts (ZC-1 bis ZC-8, Harness-Spion aus
      Setzung P13.6-88, (f), nachgezogene Pins), src/lib/generate.test.ts (W-B1, W-B2, W-B2R).
      src/lib/generate.ts ist unverändert (sha256 `bf6a58cb…` vor und nach den Mutationen).
    · Mutationen, Vorhersage je vor dem Lauf gegen den aktuellen Bestand, Rücknahme per sha256
      belegt: M1 (Einsetzung entfällt) 14 rot · M2 (`persisted`-Prüfung entfernt) 9 — ZC-4 und
      ZC-5 (Invariante (2)) · M3 (`submittedForms` mitgeleert) 10 — ZC-1 bis ZC-3 am zweiten
      Track · M4 (Einsetzung nur im Relay-Weg) 8 · M5 (Einsetzung ungegatet im Wiring-Skript,
      src/lib/generate.ts nur für die Mutation) 8 — alle wie vorhergesagt. In M1 bis M3 sind je
      sieben Byte-Pins der Seiten mit Ziel enthalten, als Kaskade vorab angesagt.
    · M-f (nicht verlangt; das Aufräumen des Harness entfernt): vorhergesagt die Tests, die eine
      Seite mit Ziel mounten; rot wurden alle 182 der Datei. Ursache (GELESEN AM EIGENEN CODE):
      die modulweite Zählung `pageshowCalls` der Hülle — dieselbe Fehlerklasse, eine Kaskade
      (Lektion (g) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE").

(8) GRENZEN, als Grenzen benannt:
    · Nur Chrome 154. Safari und Firefox sind nicht gemessen (Setzung P13.6-86, AUSSER SCOPE);
      die Zurück-Runde dort steht am offenen Punkt "VOR DEM ERSTEN FREMDEN NUTZER FEHLT EIN
      ABNAHME-TESTPROTOKOLL FÜR DIE GANZE APP" (docs/offene-punkte.md).
    · Der Export ist nicht live gemessen, nur im Test (ZC-3).
    · "Kein zweiter Track" ist allein im Test belegt (ZC-1 bis ZC-3, M3): Das Testformular trägt
      keine Track-Aktion (Setzung P13.6-86, GRENZE, LIVE).
    · Der Randfall der Setzung P13.6-88, (a) (im Plan P2) ist hingenommen: Ein bei der Rückkehr
      noch offener Versand kann einen zweiten Lead erzeugen; ob Chrome eine solche Seite
      überhaupt wiederherstellt, ist ungemessen.
    · src/lib/generate.test.ts lässt einen `pageshow`-Listener auf dem gemeinsamen Test-Window
      stehen; der Harness-Spion gilt nur in src/lib/form-target.test.ts. Heute harmlos (CC,
      Bau-Bericht).
    · Bereits veröffentlichte Seiten und Exporte ändern sich erst durch Neu-Veröffentlichen bzw.
      Neu-Export (Setzung P13.6-86, GRENZE).
    · Eine Danke-Adresse ohne Seitenwechsel erfasst die Scheibe nicht (Vorrat P13.6-87).

(9) DIE DAUERREGEL — Setzung P13.6-88, (e): ZUERST VORGELEGT, DANN ENTSCHIEDEN — KANDIDAT (B)
    (ARCHITEKT, 2026-09-30; der Nachtrag an (e) trägt Grund und Wortlaut). Vollzogen in
    docs/immer-beachten-herleitung.md als datierte Ergänzung der Abgrenzung an der Regel; der
    Kern docs/immer-beachten.md und der Verzeichnis-Eintrag sind unverändert (der wörtliche
    Anfang der Regel ändert sich nicht). Der Befund, der zur Vorlage führte:
    · GELADEN: docs/immer-beachten-herleitung.md vollständig (CC, 2026-09-30).
    · WAS DAGEGEN SPRICHT (GELESEN AM BESTAND): An der Regel "KEIN BAUSTEIN DES AUSGELIEFERTEN
      TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN …" trägt die Herleitung eine ABGRENZUNG,
      "damit die Aufzählung nicht für vollständig gehalten wird": Der `DOMContentLoaded`-Listener
      des Custom-Pixel-Laders an `document` "ist kein Wiring-Listener, ändert keine der fünf
      Achsen und steht deshalb nicht in dieser Liste."
    · DER VERGLEICH (CC, ABGELEITET): Der `pageshow`-Listener ist kein Wiring-Listener an
      `document`, hängt an `window` und ändert keine der fünf Achsen — er leert allein die eigene
      Sperre. In der Liste stünden damit zwei gleichartige Listener nach zwei Kriterien.
    · ZUR WAHL STANDEN: (A) die Liste wie in (e) ergänzen und die Abgrenzung zum
      `DOMContentLoaded`-Listener im selben Zug mitziehen · (B) den `pageshow`-Listener in jene
      Abgrenzung der Herleitung aufnehmen, die Liste im Kern unverändert. ENTSCHIEDEN: (B).

(10) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN: im Kopf der Satz "ZUGESCHNITTEN AM
    2026-09-30 (ARCHITEKT); der Plan folgt in einer eigenen Runde." — mit dem Abschluss
    abgelaufen, ersetzt durch die Abschluss-Zeile. Sonst ist nichts abgelaufen: Die übrigen
    Anweisungen des Zuschnitts sind Teile bindender Setzungen und tragen jetzt einen Nachtrag
    statt einer Streichung.
    STEHEN GEBLIEBEN: Vermerk P13.6-85 (Punkt (6) mit dem Nachtrag "ERSETZT"), Setzung P13.6-86
    (Nachträge an Invariante (4) und an zwei Kollisionen), Setzung P13.6-88 (Nachträge an (d),
    (e) und (f)); an ihren Orten Owner-Entscheidung P13.6-71, Arbeit P13.6-72 und Vorrat
    P13.6-87.

(11) NACHGEZOGEN IN DIESEM COMMIT: Owner-Entscheidung P13.6-71 (umgesetzt), Setzung P13.6-14
    (als Nächstes Zapier), Arbeit P13.6-72 (erledigt); docs/offene-punkte.md, "VOR DEM ERSTEN
    FREMDEN NUTZER FEHLT EIN ABNAHME-TESTPROTOKOLL FÜR DIE GANZE APP" (die Zurück-Runde; Titel,
    Trigger und Stub in CLAUDE.md unverändert); docs/immer-beachten-herleitung.md, die
    Abgrenzung an der Regel "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN
    FREMDEN KNOTEN AN …" (Punkt (9)). Die Roadmap-Zeile 13.6 führt die Scheibe nicht als
    ausstehend und ist nicht geändert.

## Zuschnitt Scheibe Zapier ins Relay

**ABGESCHLOSSEN AM 2026-10-01 — Bau-Commit `93230df`, Live-Test bestanden (nur Chrome);
Abschluss-Vermerk P13.6-103.**
- GEGENSTAND: Owner-Entscheidung P13.6-97 der Phase 13.6 — `hooks.zapier.com` kommt in die
  Host-Liste des Relays (`RELAY_HOSTS`, src/lib/relay/hosts.ts), `zapier.com` nie. Sonst ändert
  sich am Relay nichts. Reihenfolge: Setzung P13.6-14.
- BEDINGUNG DER AUFNAHME: Owner-Entscheidung P13.6-55 (gelesen UND einmal live getestet). Die
  Lesung: docs/formular-empfaenger-befunde.md, Abschnitt "Zapier". Der Live-Test: Phase 0 der
  Anleitung, VOR dem Push (Setzung P13.6-100, (2)).
- BENENNUNG, DEKLARIERT (CC): wie bei der Scheibe "Zurück-Cache" ohne Nummer; die Überschrift
  übernimmt den Namen aus den Aufträgen.

### Planrunde der Scheibe Zapier ins Relay

**Vermerk P13.6-98 — DER PLAN "ZAPIER INS RELAY" (P1 BIS P7), VERDICHTET.**
PROVENIENZ: Bericht der Planrunde (CC, 2026-09-30, Sitzung nach Commit `87af209`; read-only,
Code-Stand `87af209`). DER BERICHT STAND IN KEINER DATEI DES REPOS: Er ist hier aus dem lokalen
Sitzungsprotokoll jener Runde übernommen (nicht im Repo) und verdichtet; seine Zeilennummern sind
durch Symbolnamen ersetzt. GELESEN AM CODE, soweit nicht anders gekennzeichnet; NICHTS DAVON IST
LIVE GEMESSEN. Die Antworten auf die neun offenen Fragen des Berichts: Owner-Entscheidung
P13.6-99 (Fragen 1 und 4) und Setzung P13.6-100 (Fragen 2, 3, 5 bis 9).
(1) SCOPE. Geändert: src/lib/relay/hosts.ts (Liste und Kopfkommentar, darin "Zapier folgt nach
    Lesung und Live-Test in einer eigenen Runde."), src/lib/relay/hosts.test.ts,
    src/lib/relay/relay.test.ts und src/lib/form-target.test.ts (je nur neue Tests),
    src/components/ActionPanel.tsx und src/components/CodeImporter.test.tsx (allein der
    Owner-Text, Owner-Entscheidung P13.6-99). UNBERÜHRT: src/lib/relay/relay.ts, rate-limit.ts,
    resolve-relay.ts, src/lib/form-target.ts (auch `normalizeFormTargetHost`),
    src/lib/generate.ts, `/api/e`, die Serve-Route, src/proxy.ts, alle Migrationen.
    `generateFunctional` (Relay-Weg und Marke) und der Schalter in `FormTargetActions` fragen
    dieselbe Prüfung (`allowedRelayEndpoint`); beide entstehen für Zapier ohne Codeänderung.
(2) P1 — DIE LISTE. `allowedRelayEndpoint`: nur `https:`, ohne Nutzerangaben, ohne eigenen Port,
    Host über `normalizeFormTargetHost` (Kleinschreibung, Punkt am Ende weg) EXAKT in
    `RELAY_HOSTS`; der Pfad wird nicht geprüft. Allein H1 (src/lib/relay/hosts.test.ts) hält die
    ganze Liste; kein Test trägt "zapier" (GEMESSEN AM REPO; erneut 2026-10-01 am Stand `87af209`:
    `git grep -i zapier -- src` trifft allein den Kopfkommentar von hosts.ts). Die Erwartung
    `["hook.eu2.make.com", "hooks.zapier.com"]` wird aus der Entscheidung getippt (P13.6-55;
    Abschnitt "Make", Befund (s); P13.6-97; Abschnitt "Zapier", Befund (b)), maschinell gegen die
    Befund-Datei geprüft, erst danach steht die Zeile in hosts.ts (Dauerregel "EIN WÄCHTER ÜBER
    DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE …"). H1 bleibt ein Test auf die
    EXAKTE Liste: jedes Mitglied braucht eine eigene Entscheidung. `zapier.com` nie: Der Pfad
    wird nicht geprüft, der Host trüge jede Seite von zapier.com (Zapier, Befund (b), FOLGE).
(3) P2 — TEXTE, DIE NUR MAKE NENNEN. `DATA_SAVER_UNLISTED_NOTE` (src/components/ActionPanel.tsx;
    Wortlaut aus Owner-Entscheidung P13.6-68, abgetippt in src/components/CodeImporter.test.tsx)
    wird mit der Aufnahme falsch → Owner-Entscheidung P13.6-99. Angepasst werden der Kopfkommentar
    von hosts.ts und der Testkopf von hosts.test.ts ("Stufe 1 ist allein die gemessene Make-Zone
    eu2"). Weiter zutreffend: der Platzhalter der Adress-Eingabe im `ActionPanel` und
    "(z. B. Make)" in src/lib/form-target.ts (Beispiele), `FORM_TARGET_EXPLAIN` ("unterstützten
    Diensten"), die 3xx-Regel in `forward` (mit Make begründet). Veraltet, ausser Scope: der Satz
    "In dieser Scheibe ruft es noch keine ausgelieferte Seite auf" im Kopf von
    src/lib/relay/relay.ts → Vorrat P13.6-101. Doku beim Abschluss (Setzung P13.6-100, (7)):
    docs/offene-punkte.md, Punkt (9) am Posten "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" und
    "BESTEHT WEITER" am Posten "IM BROWSER-DIREKTEN WEG ERSCHEINT BEI FALSCHER ODER GELÖSCHTER
    ZIELADRESSE DIE DANKE-SEITE …" (je "heute allein Make") — datierte Ergänzung, keine
    Umschreibung.
(4) P3 — ADRESSEN DER FORM `zapier.com/hooks/…` bleiben browser-direkt. Der Betreiber sieht heute
    den allgemeinen Hinweis und "Zustellung: direkt vom Browser", nicht den Grund. Kandidaten:
    (a) der Hinweis nennt die Adressform (ein Owner-Text) · (b) ein eigener Hinweis bei Host
    `zapier.com` (neue Verzweigung der Oberfläche) · (c) automatisch auf `hooks.zapier.com`
    umschreiben (dagegen: dass beide Formen gleich wirken, ist nicht gelesen; die Sammeladresse
    `…/a,b,c` gibt es nur auf `zapier.com`, Zapier, Befund (b); es änderte die Eingabe) · (d) nur
    Betreiber-Dokumentation. ENTSCHIEDEN: Owner-Entscheidung P13.6-99 — (a), dazu (d) beim
    Phasenende.
(5) P4 — BESTEHENDE SEITEN. Der Deploy ändert keinen ausgelieferten Text. Seiten mit einem Ziel
    auf `hooks.zapier.com` werden beim nächsten Neu-Veröffentlichen Relay-Seiten
    (Owner-Entscheidung P13.6-54; wie Setzung P13.6-61); ob es solche gibt, ist am Repo nicht
    entscheidbar. Ab dem Deploy, ABGELEITET: Die Anzeige im Editor springt auf "über Pagesmith,
    mit Prüfung", weil sie der Liste folgt, nicht dem veröffentlichten Text (Klasse des offenen
    Punktes "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST"); das Relay nimmt
    einen von Hand gebauten POST für ein noch direkt veröffentlichtes Zapier-Ziel an, mit
    Ratenbegrenzung (GRENZE an Setzung P13.6-56). MAKE-SEITEN BLEIBEN BYTE-GLEICH: am Code
    (dieselbe `href`, src/lib/generate.ts unberührt), im Test (RT-9, RT-10, RT-11, W-B1, W-B2,
    W-B2R ohne geänderte Konstante), live (Punkt (9), S2, L0, L1).
(6) P5 — WIE DAS RELAY ZAPIERS ANTWORTEN WERTET (`forward`: Rumpf verworfen, 2xx und 3xx → 204,
    sonst 502), je Befund im Abschnitt "Zapier": 200 mit JSON (e) → 204, "angenommen", nicht
    "verarbeitet" · 404 bei Zap aus oder gelöscht (f) → 502; im Zeitfenster davor 200 → 204 bei
    möglichem Verlust (Vorrat P13.6-92) · 429 (h) → 502, keine Wiederholung (Setzung P13.6-22) ·
    413 (j) → 502, praktisch nie (64 KiB gegen 10 MB) · ungültiger oder leerer Rumpf "ignoriert,
    trotzdem Erfolg" (d) → 204, ein falsches "zugestellt" · gehaltener Lauf (g) → Status
    ungelesen (ZM5) · 3xx (i) → 204, für Zapier nicht beschrieben. Eine Antwortzeit von Zapier
    steht auf keiner gelesenen Seite; ob das Zeitlimit von 5 000 ms kollidiert, ist NICHT
    ENTSCHEIDBAR (ZM2 misst die Zeit).
    NEBENBEFUND, BESTAND: Das Relay leitet an den Host MIT Punkt am Ende weiter —
    `allowedRelayEndpoint` gibt `url.href` zurück, und `new URL("https://HOOKS.ZAPIER.COM./x").href`
    ergibt `https://hooks.zapier.com./x` (GEMESSEN, Node 24.16.0, CC, 2026-10-01). Das gilt heute
    schon für Make; ob die Empfänger es annehmen, ist ungemessen → Setzung P13.6-100, (6).
(7) P6 — TESTS, Erwartungen getippt aus P13.6-55, P13.6-97 und Zapier, Befund (b):
    · H1 geändert — genau `["hook.eu2.make.com", "hooks.zapier.com"]`.
    · H2z — `https://hooks.zapier.com/hooks/catch/123456/abcde/` wird angenommen, `href` zurück.
    · H3z — `HOOKS.ZAPIER.COM.` wird angenommen.
    · H4z — je null: `zapier.com/hooks/catch/…` · die Sammeladresse `…/a,b` · `www.zapier.com` ·
      `x.hooks.zapier.com` · `xhooks.zapier.com` · `hooks.zapier.com.evil.test` · `http:` ·
      Port 8443.
    · R-Z1 — Zapier-Ziel: 204, genau ein `fetch` an die `href`.
    · R-Z2 — `zapier.com`-Adresse: 502 und KEIN `fetch` (der Beleg, dass `zapier.com` nicht über
      das Relay geht).
    · R-Z3 — 200 mit JSON → 204; 404, 429 und 413 → 502, je mit "`fetch` genau einmal" und
      "`upstream-status <n>`" im Log. Ohne diese Prüfung wäre die 502 schon grün, wenn die Adresse
      gar nicht auf der Liste steht.
    · RT-Z1 — veröffentlichte Seite mit Zapier-Ziel: Relay-Weg R2 und Marke D2 je genau einmal.
    · RT-Z2 — `zapier.com` bleibt direkt (`no-cors` an diese Adresse).
    · RT-Z3 — Differenz-Nachweis: Zapier-Relay-Seite = Vorher + R2 + D2. Vorher = dieselbe
      Eingabe mit dem HEUTIGEN Code (dann noch direkt), erhoben vor der ersten Code-Änderung, als
      Konstante; mit Positivkontrolle. (CC, GELESEN AM CODE: Die Einsetzung K2 der Scheibe
      "Zurück-Cache" steht auf allen drei Wegen und damit schon im Vorher-Wert; RT-11 rechnet
      dagegen von einem Wert VOR K2 aus.)
    · CI-Z — `hooks.zapier.com` zeigt den Schalter, `zapier.com` den Hinweis (mit dem Wortlaut aus
      Owner-Entscheidung P13.6-99).
(8) P6 — PFLICHT-MUTATIONEN, Vorhersage gegen den Bestand nach dem Bau, vor dem Lauf erneut
    geprüft:
    · MZ1 (Host fehlt) → H1, H2z, H3z, R-Z1, R-Z3, RT-Z1, RT-Z3, CI-Z.
    · MZ2 (`zapier.com` zusätzlich) → H1, H4z (`zapier.com`, Sammeladresse), R-Z2, RT-Z2, der
      Negativfall von CI-Z; grün bleibt H4z `www.zapier.com` (exakter Vergleich).
    · MZ3 (Normalisierung in hosts.ts umgangen, `url.hostname` direkt) → H3 und H3z, je nur der
      Fall mit Punkt am Ende, und die Positivkontrolle von R-LIST2; grün bleiben die Fälle mit
      Grossschreibung — der URL-Parser schreibt schon klein (GEMESSEN, Node). Die Abdeckung
      VERDECKT die Mutation (Lektion (b) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"); vorab
      angesagt.
    · MZ4 (Unterdomänen zugelassen) → H4 "Unterdomaene" (Make), H4z `x.hooks.zapier.com`; grün
      bleiben Präfix- und Suffix-Falle.
    · Dazu MZ5 (Vorgabe des Bau-Auftrags vom 2026-10-01): der neue Textteil fehlt im Hinweis →
      CI-Z rot.
    Gates: tsc, eslint, vitest, build. Die berührten Dateien tragen LF; src/lib/mappings.ts
    (NUL-Byte) wird nicht berührt.
(9) P7 — LIVE-ANLEITUNG, ENTWURF.
    VORBEDINGUNGEN: Zapier-Monat gebucht (Webhooks sind Premium, Zapier, Befund (a)) ·
    Chrome-Version notiert · A/B in beiden Projekten aus · Danke-Seite auf einer AUFLÖSBAREN
    Adresse (Vermerk P13.6-70, Punkt (10)) · ein EIGENES Zapier-Testprojekt (Setzung P13.6-100,
    (5)).
    PHASE 0 — ALTER CODE, VOR DEM PUSH (Owner-Entscheidung P13.6-55):
    · S0/ZM1 — Zap mit Catch Hook anlegen, Host und Form der Adresse ablesen (nur verkürzt
      notieren).
    · S1/ZM2a und ZM3 — `curl`-POST, urlencoded, fremder `Origin`, mit
      `interesse=kurs&interesse=beratung`: Status, Köpfe, Rumpf, `time_total`; im Zap "Test
      trigger": kommen die Felder einzeln an? MITLÄUFER: derselbe Aufruf an die Make-Adresse
      (Soll 200 "Accepted"). Variante: der Host mit Punkt am Ende, für Zapier UND Make (Setzung
      P13.6-100, (6)).
    · S2 — V0 der Make-Testseite: Editor neu laden, veröffentlichen, zweimal `fetch` mit
      `no-store`, sha256 und `cache-control`; Bezug 20007 Bytes, `e283fa67…1500` (Vermerk
      P13.6-89, Punkte (3) und (6)). Weicht V0 ab, gilt V0 (Hebungs-Kandidat P13.6-73).
      Gegenprobe: die Seite ohne Ziel (30493 Bytes, `40c83cb3…37e5`).
    · S3 — das Zapier-Projekt mit `hooks.zapier.com` veröffentlichen (es schickt noch direkt):
      V-Z, Bytes und sha256, zweimal; einmal absenden — "erreicht", Danke-Seite, Eingang im Zap.
      Zugleich ZM6 für `no-cors`; die CORS-Köpfe aus S1 (`curl -i`).
    PHASE 1 — NACH DEM DEPLOY:
    · L0 — beide Seiten ohne Neu-Veröffentlichen gleich V0 bzw. V-Z; die Zapier-Seite schickt
      weiter direkt.
    · L1 — Make-Regression: Editor neu laden, neu veröffentlichen, gleich V0; ein Absenden →
      Danke-Seite, Make +1.
    · L2 — Zapier-Projekt: Editor neu laden, neu veröffentlichen; Anzeige "über Pagesmith, mit
      Prüfung"; Differenz-Nachweis V-Z + R2 + D2 mit dem Konsolen-Block aus Vermerk P13.6-89,
      alle fünf Schritte. Positivkontrolle: die Zapier-Seite MUSS abweichen.
    · L3 — Relay-Runde: `/api/f` 204, Danke-Seite, Zap-Verlauf +1 mit Einzelfeldern (ZM2b), eine
      Checkbox-Gruppe (ZM3 über die Seite); Vercel-Log: ausgehend an `hooks.zapier.com`, keine
      Referer-Zeile, keine `[relay]`-Zeile.
    · L4 — Datensparmodus an, dann wieder aus: direkt an `hooks.zapier.com` mit `no-cors`;
      Danke-Seite, Eingang (ZM6).
    · L5 (optional) — ein Ziel `zapier.com/hooks/…`: Anzeige "direkt" und der Hinweis; kommt der
      Lead an?
    · L6/ZM4 — Zap aus: sofort `curl` und ein Relay-Absenden, nach mehreren Stunden erneut;
      Mitläufer ein laufender Zap (Soll 200). Dazu: Zap gelöscht, erfundene Kennung auf
      `hooks.zapier.com`, ein 3xx irgendwo?, eine Anfrage aus dem Zeitfenster nach dem
      Wiedereinschalten.
    · L7/ZM5 — am Monatsende bzw. im Free-Konto: Status und gehaltene Läufe (eigener Termin).
    · L8/ZM7 — uBlock Origin Lite (Aufbau wie N3 in Vermerk P13-22 der Phase 13) gegen den
      direkten Aufruf an `hooks.zapier.com`; Positivkontrolle: die doubleclick-Probe wird
      geblockt.
    Jede Beobachtung zählt nur mit ihrer Positivkontrolle bzw. ihrem Mitläufer.

PROVENIENZ von P13.6-99: OWNER-ENTSCHEIDUNG, übermittelt im Auftrag der Runde "Scheibe Zapier ins
Relay — Bau" (Teil A) am 2026-10-01; der Auftrag datiert sie auf den 2026-09-30. BINDEND.

**Owner-Entscheidung P13.6-99 — DER HINWEIS BEI EINER ADRESSE AUSSERHALB DER HOST-LISTE NENNT
ZAPIER MIT SEINER ADRESSFORM (P3, KANDIDAT (a)); DIE BETREIBER-DOKUMENTATION (d) KOMMT ZUSÄTZLICH
BEIM PHASENENDE.** Beantwortet die Fragen 1 und 4 des Plans (Vermerk P13.6-98).
- Im Hinweis `DATA_SAVER_UNLISTED_NOTE` (src/components/ActionPanel.tsx) wird die Zeichenfolge
  "derzeit für Make-Webhooks der Region EU2" ersetzt durch "derzeit für Make-Webhooks der Region
  EU2 und für Zapier-Webhooks, deren Adresse mit https://hooks.zapier.com beginnt". Sonst bleibt
  der Text.
- (CC, GELESEN AM CODE, Stand `87af209`): Die Zeichenfolge steht wörtlich in
  `DATA_SAVER_UNLISTED_NOTE` und abgetippt in src/components/CodeImporter.test.tsx. Der neue
  Wortlaut, zusammengesetzt aus Bestand und Ersetzung: "Diese Adresse beliefert der Browser
  direkt. Die Zustellprüfung über Pagesmith gibt es derzeit für Make-Webhooks der Region EU2 und
  für Zapier-Webhooks, deren Adresse mit https://hooks.zapier.com beginnt."
- ÄNDERT die Infozeile aus Owner-Entscheidung P13.6-68; die übrigen Texte jener Entscheidung
  bleiben.
- GEMELDET, NICHT ENTSCHIEDEN (CC, ABGELEITET am Code): Der Hinweis erscheint bei jeder Adresse,
  die `allowedRelayEndpoint` ablehnt. "deren Adresse mit https://hooks.zapier.com beginnt" trifft
  dem Wortlaut nach auch Adressen, die die Prüfung ablehnt — etwa
  `https://hooks.zapier.com.evil.test/…` (Suffix-Falle) oder `https://hooks.zapier.com:8443/…`
  (eigener Port). Bei ihnen stünde der Hinweis und nennte eine Form, die ihre Adresse zu erfüllen
  scheint. Eine echte Zapier-Adresse trägt nach allen gelesenen Beispielen keins von beiden
  (Zapier, Befund (b)).
- UMGESETZT 2026-10-01: Bau-Commit `93230df`; im Test belegt (CI-Z2, Mutation MZ5), live nicht
  gesehen (Vermerk P13.6-103, Punkt (10)). Die Betreiber-Dokumentation (d) steht weiter aus.

PROVENIENZ von P13.6-100: ARCHITEKTEN-SETZUNG, übermittelt im selben Auftrag am 2026-10-01; der
Auftrag datiert sie auf den 2026-09-30. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.

**Setzung P13.6-100 — DIE ANTWORTEN AUF DIE FRAGEN 2, 3 UND 5 BIS 9 DES PLANS (Vermerk P13.6-98).**
- (2) REIHENFOLGE: Phase 0 (ZM1, ZM2 und ZM3 per `curl`, alter Code) läuft VOR dem Push — die
  Lesart von Owner-Entscheidung P13.6-55 (die Ableitung an Owner-Entscheidung P13.6-97).
- (3) Die Bündelung mit dem Abnahme-Testprotokoll aus Owner-Entscheidung P13.6-90 ist
  AUFGEHOBEN; das Protokoll bleibt eigener offener Punkt vor dem ersten fremden Nutzer ("VOR DEM
  ERSTEN FREMDEN NUTZER FEHLT EIN ABNAHME-TESTPROTOKOLL FÜR DIE GANZE APP", docs/offene-punkte.md).
  GEMELDET (CC): Die Bündelung stand in einer OWNER-Entscheidung; ihre Aufhebung ist hier als
  Architekten-Setzung geführt, wie übermittelt.
- (5) Ein eigenes Zapier-Testprojekt; die Make-Testseite bleibt Bezugspunkt (Vermerk P13.6-89,
  Punkt (3): 20007 Bytes, `e283fa67…1500`).
- (6) Der Host mit Punkt am Ende wird in Phase 0 mitgemessen, für Zapier UND Make (Vermerk
  P13.6-98, Punkt (6)).
- (7) Die Ergänzungen an docs/offene-punkte.md ("heute allein Make") folgen beim Abschluss,
  datiert (Vermerk P13.6-98, Punkt (3)).
- (8) Der veraltete Satz im Kopf von src/lib/relay/relay.ts geht in den Vorrat: Vorrat P13.6-101.
- (9) Neue Tests in src/lib/relay/relay.test.ts und src/lib/form-target.test.ts liegen im Scope.

### Live-Test der Scheibe Zapier ins Relay

**Vermerk P13.6-102 — PHASE 0, ALTER CODE, VOR DEM PUSH: ZAPIER NIMMT DIE FORM DES RELAYS AN.**
KEIN BAU-COMMIT: Messrunde am alten Code (Stand `1428b33`, im Code gleich `87af209`).

(0) PROVENIENZ DER PUNKTE (1) BIS (4): GEMESSEN, OWNER, live, 2026-10-01, übermittelt im
    GO-Auftrag der Scheibe samt Nachtrag mit der vollständigen curl-Ausgabe. Instrument für (2):
    curl 8.14.1, Git Bash, schannel; die Befehle aus dem Bericht der Bau-Runde (urlencoded-Rumpf
    mit `interesse=kurs&interesse=beratung`, fremder `Origin`, je ein eigener `probe`-Wert).
    Vollständige Webhook-Adressen stehen bewusst nicht in dieser Datei.
    ZEITANGABEN: Maßgeblich ist der `Date`-Kopf der Antworten. Zapiers Oberfläche zeigt die Läufe
    mit dem Etikett "UTC", aber um +2 h gegenüber dem `Date`-Kopf (Lauf `zm2-z-ohne`: Oberfläche
    08:30:43, `Date`-Kopf 06:30:43 GMT). Zapier-Zeiten unten sind deshalb als
    OBERFLÄCHENANGABE gekennzeichnet. GRENZE (CC): Der Versatz ist an EINEM Lauf verglichen.

(1) S0/ZM1 — DIE ADRESSE: Die Catch-Hook-Adresse im Konto beginnt mit
    `https://hooks.zapier.com/hooks/catch/` (Form `…/catch/<Nutzer-ID>/<Kennung>/`). Der Host
    deckt sich mit Zapier, Befund (b) (docs/formular-empfaenger-befunde.md).

(2) S1/ZM2a UND ZM3 — VIER curl-AUFRUFE, `Date`-Köpfe 2026-10-01 06:30:42 bis 06:30:44 GMT:
    · Make ohne Punkt (MITLÄUFER): 200, `text/plain` "Accepted", `time_total` 0,340 s,
      `make-actual-status: 200`, `access-control-allow-origin: *`.
    · Zapier ohne Punkt: 200, `application/json` mit `attempt`, `id`, `request_id`, `status`
      "success"; 0,320 s; `x-zapier-hook-status: success`, `access-control-allow-origin: *`,
      `x-rate-limit-limit: 20000` (remaining 19999).
    · Zapier mit Punkt am Ende: gesendet `Host: hooks.zapier.com.` → 200, JSON "success", 0,270 s.
    · Make mit Punkt am Ende: gesendet `Host: hook.eu2.make.com.` → 200 "Accepted", 0,315 s.
    · EINGÄNGE: Zapier `zm2-z-ohne` (Oberflächenangabe 08:30:43) und `zm2-z-punkt`
      (Oberflächenangabe 08:30:44); Make `zm2-m-ohne` und `zm2-m-punkt`. Felder je einzeln,
      `interesse` bei beiden Empfängern als Liste `[kurs, beratung]`.
    · FOLGE: Der Punkt am Ende wird von beiden angenommen — GEMESSEN MIT curl; GRENZE: nicht mit
      Node-`fetch` vom Relay (Vermerk P13.6-98, Punkt (6)). Beide Antworten tragen
      `access-control-allow-origin: *`. GRENZE (CC): gemessen an der Antwort auf einen POST mit
      fremdem `Origin`; ein `OPTIONS`/Preflight ist nicht gemessen.
    · Damit beantwortet, für Zapier gemessen: ZM2a (Status, Köpfe, Rumpf, Zeit der Form des
      Relays), ZM3 (Mehrfachwerte als Liste); Zapier, Befunde (d) und (e), mit der Messung im
      Einklang. Offen von ZM2: der Teil über das Relay einer Testseite (ZM2b, Phase 1, L3).

(3) S2 — MAKE-TESTSEITE (Bezugspunkt): Editor neu geladen, veröffentlicht, zweimal: 20007
    Bytes, sha256 `e283fa67…1500`; ohne K2 `e6ae154f…972f`. GEMESSEN AM BESTAND (CC): gleich L1
    und V0 in Vermerk P13.6-89, Punkte (1) und (3). Der Bezugspunkt ist unverändert.

(4) S3 — ZAPIER-TESTPROJEKT `zapier-test-m21cev.publayer.net` (Setzung P13.6-100, (5)):
    Anzeige "Zustellung: direkt vom Browser"; zweimal 16841 Bytes, sha256
    `aab1a0432d204f915791e7a9f275feae3181d3c06a0eabee5a921af87e4a3364` (V-Z, Vorher-Wert für L2).
    Ein Absenden → Danke-Seite, Zapier-Eingang mit den Feldern (Oberflächenangabe 08:45:51).
    ZM6: Zapier nimmt den browser-direkten Aufruf (`no-cors`) an.

(5) EINORDNUNG (CC, ABGELEITET am Wortlaut): Owner-Entscheidung P13.6-55 verlangt vor der
    Aufnahme "gelesen und einmal live getestet"; nach der Lesart der Setzung P13.6-100, (2), ist
    das mit (1) und (2) VOR dem Push erfüllt.
    NICHT IN DIESEM COMMIT: der Nachtrag dieser Messungen im Abschnitt "Zapier" von
    docs/formular-empfaenger-befunde.md (Frage 7 des Plans nannte ihn; Setzung P13.6-100, (7),
    nennt allein docs/offene-punkte.md).
    NACHGETRAGEN 2026-10-01: Der Nachtrag ist erfolgt — docs/formular-empfaenger-befunde.md,
    Abschnitt "Zapier", Befunde (q) bis (x) (Vermerk P13.6-103, Punkt (12)).

### Abschluss der Scheibe Zapier ins Relay

**Vermerk P13.6-103 — ABSCHLUSS DER SCHEIBE "ZAPIER INS RELAY". Bau-Commit `93230df`**
("feat(relay): Zapier-Webhooks (hooks.zapier.com) auf die Relay-Host-Liste"). LIVE-TEST
BESTANDEN, nur Chrome — der Differenz-Nachweis in der Form der Bewertung unter Punkt (7).
Doku-Commits der Scheibe: `1428b33` (Planrunde, Owner-Text, Vorrat) · `bdee2c2` (Phase 0) ·
dieser Commit (Abschluss).

(0) PROVENIENZ DER PUNKTE (2) BIS (6), soweit nicht anders gekennzeichnet: GEMESSEN, OWNER, live,
    2026-10-01, Chrome 154 (Build nicht angegeben), übermittelt im Auftrag der Abschluss-Runde.
    Bytes und sha256 über den Konsolen-Block aus dem Bericht der Bau-Runde (Teil C; der Block
    steht nicht in dieser Datei), je zweimal gleich. Zapier-Testprojekt
    `zapier-test-m21cev.publayer.net`, Make-Testseite `projekt-n-sy5bjj.publayer.net`.
    Webhook-Adressen, Request-ID und Tracking-Schlüssel stehen bewusst nicht in dieser Datei.

(1) PHASE 0 — alter Code, vor dem Push: Vermerk P13.6-102 (Adresse, vier curl-Aufrufe samt Punkt
    am Ende, Make-Bezugspunkt, V-Z, ZM6).

(2) L0 — Deploy `93230df` "Ready", ohne Neu-Veröffentlichen:
    · Der Editor des Zapier-Projekts zeigt "Zustellung: über Pagesmith, mit Prüfung", während die
      Seite noch direkt schickt. Damit ist die ABGELEITETE Folge aus Vermerk P13.6-98, Punkt (5)
      (die Anzeige folgt der Liste, nicht dem veröffentlichten Text), GEMESSEN.
    · Make-Testseite: 20007 Bytes, `e283fa67…1500`, `ohneGleichVorher` true.
    · Zapier-Seite: zweimal 16841 Bytes, `aab1a043…3364` — gleich V-Z.

(3) L1 — MAKE-REGRESSION: Editor neu geladen, neu veröffentlicht, zweimal unverändert
    `e283fa67…1500`; Absenden → Danke-Seite, Eingang bei Make. Make-Seiten bleiben damit live
    byte-gleich (Vermerk P13.6-98, Punkt (5)).

(4) L2 — ZAPIER-PROJEKT, Editor neu geladen, veröffentlicht, der Block zweimal identisch:
    19999 Bytes, sha256 `824c1bbc0354fc2b795201c8459bc17733d76b28d0742a0039033d4a9016ffa8`;
    R2 1-mal, D2 1-mal, K2 1-mal; ohne R2 und D2 18953 Bytes, sha256
    `1d0e701f8fda6d47c071b66cdbf264cea67dc792b178b0799d197cab70e33675`; `ohneGleichVorher`
    false (erwartet waren 16841 Bytes), `textGleichRoh` true. (Die vollen sha256 hat CC am selben
    Tag per `curl` an der Live-Seite erhoben, siehe unten; die Owner-Werte lauteten gekürzt
    gleich.)
    AUFKLÄRUNG (CC, 2026-10-01, read-only; Texte im Scratchpad, nicht im Repo):
    · V-Z lag als Datei vor (16841 Bytes, `aab1a043…3364`, GEMESSEN per sha256). Die Live-Seite,
      zweimal per `curl` geholt (`Date` 07:26:24 und 07:26:25 GMT): je 19999 Bytes,
      `824c1bbc…ffa8`.
    · Zeilen-Diff des Live-Textes ohne R2 und D2 gegen V-Z (GEMESSEN): netto +2112 Bytes =
      die Meta-Laufzeit `function __psMetaFire(cfg) { … }` (1968 Bytes; nur der Beacon-Teil mit
      `__psConsent("meta")`, eventID und `sendBeacon("/api/e", …)`, kein `fbq(` — das Projekt
      trägt keine Pixel-ID) + viermal `__psMetaFire(a.config);` (je 36 Bytes) in den vier
      `if (a.type === "track")`-Zweigen des Wiring-Skripts + der Datenblock in anderer
      Schlüssel-Reihenfolge bei gleicher Länge (alt `elementId, type, config`, neu `type,
      config, elementId`).
    · RÜCKRECHNUNG (GEMESSEN): Meta-Laufzeit und die vier Aufrufe entfernt, die Datenblock-Zeile
      durch die alte ersetzt → 16841 Bytes, `aab1a043…3364`, zeichengleich mit V-Z.
      Positivkontrolle: ohne den Tausch der Datenblock-Zeile ungleich.
    · WOVON DER BAUSTEIN ABHÄNGT (GELESEN AM CODE): `generateFunctional` (src/lib/generate.ts)
      ruft im Modus "export" `buildMetaRuntime`; ohne Pixel-ID UND ohne Tracking-Schlüssel ist
      das Ergebnis leer, und `metaTrackStatement` lässt den Aufruf weg. In V-Z steht der
      Schlüssel genau einmal — im PageView-Emitter, den `publishProject` serverseitig einfügt
      (`injectPageViewEmitter`); im neuen Text zweimal (Emitter und Beacon) (GEMESSEN am Text).
    · KANDIDAT FÜR DIE URSACHE, ABGELEITET AM CODE, nicht gemessen: V-Z war die erste
      Veröffentlichung eines neuen Projekts ohne Neuladen; der Client kannte den Schlüssel noch
      nicht. Ob das Projekt vor S3 einen Schlüssel trug und ob der Editor vor S3 neu geladen
      wurde, ist nicht erhoben. Der Produktbefund dahinter: Vorrat P13.6-105.
    · Am Zapier-Bau liegt die Abweichung nicht: R2 und D2 stehen je genau einmal da.

(5) L3 — RELAY-RUNDE: Absenden → Danke-Seite, Zapier-Eingang mit den Feldern. Vercel-Detail
    `POST /api/f`, Host `zapier-test-m21cev`: 204, `fra1`, Function 678 ms, "External APIs" 4
    (GET, GET, POST, POST), keine `[relay]`-Zeile.
    · Die Zahl vier deckt sich mit Vermerk P13.6-81, Punkt (4); ihre ZUORDNUNG (zwei Abfragen der
      Relay-Suche, die Zähler-RPC, die Weiterleitung) bleibt ABGELEITET, die Ziel-Hosts sind nicht
      gemeldet. Damit ist nicht gemessen, dass die POST an `hooks.zapier.com` ging; belegt ist
      die Ankunft durch den Zapier-Eingang.
    · ZM2b (der Weg über das Relay einer Testseite) ist damit gemessen.

(6) L4 — DATENSPARMODUS: an → Anzeige "Zustellung: direkt vom Browser (Datensparmodus)",
    Danke-Seite, Zapier-Eingang. Ob dazwischen neu veröffentlicht wurde und ob der Versand direkt
    lief (Netzwerk), ist NICHT gemeldet; ZM6 trägt deshalb Vermerk P13.6-102, Punkt (4).
    · Danach aus: 19999 Bytes, `27ecda17…d2de` (gekürzt übermittelt). OWNER-ANGABE: unsicher,
      ob ein zweites Neuladen erfolgte.
    · AUFKLÄRUNG (CC, 2026-10-01, GEMESSEN per Rückrechnung): Allein der Datenblock des Textes von
      L2 in der Reihenfolge `elementId, type, config` ergibt 19999 Bytes, `27ecda17…d2de`, und
      ohne R2 und D2 `f9181478…c9ee` — beide gekürzten Owner-Werte getroffen. Der Text von L4
      selbst liegt nicht vor. Dieselbe Erscheinung wie in Vermerk P13.6-70, Punkt (7), und
      Vermerk P13.6-89, Punkt (5): direkt nach "Ziel übernehmen" eine andere Reihenfolge als nach
      dem Neuladen.
    · Um 07:26 GMT trug die Live-Seite wieder den Stand von L2 (Punkt (4)); ein späteres
      Veröffentlichen nach Neuladen ist damit ABGELEITET, vom Owner nicht gemeldet.

(7) BEWERTUNG DES DIFFERENZ-NACHWEISES — ARCHITEKT, übermittelt im Auftrag der Abschluss-Runde:
    BESTANDEN in der STÄRKEREN Form der vollständigen Rückrechnung (Punkt (4)). Die Zusage "nur
    R2 und D2" galt gegen ein V-Z mit anderer Eingabe (der Schlüssel fehlte im Client). Der
    Code-Nachweis RT-Z3 (src/lib/form-target.test.ts) und L1 (Make unverändert) stützen das.
    (CC) Die Auflage der Dauerregel "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD …" ist
    damit in einer anderen Form erfüllt als angesagt: Die Einsetzung ist gezählt und entfernt,
    der Rest aber erst nach Entfernen eines zweiten, benannten Bausteins und Rücktausch der
    Reihenfolge gleich V-Z. Die Dauerregel selbst ist nicht geändert.

(8) BAU (CC, 2026-10-01, am Stand vor dem Commit `93230df`):
    · Vorher-Wert für RT-Z3, erhoben vor der ersten Code-Änderung (Sonde ausserhalb des Repos,
      jiti 2.7.0 mit jsdom 29.1.1; Instrument-Kontrolle: dieselbe Sonde ergab `RT_V9`
      zeichengleich): 21687 Bytes, sha256 `a7906464…7dc6`; der Test trägt ihn als Konstante
      `RT_VZ`.
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, die eine bekannte Warnung in
      src/lib/tracking/consent.test.ts; `vitest run` 102 Dateien, 2769 Tests (vorher 2746);
      `next build` exit 0. Vor dem Commit erneut gefahren, dasselbe Ergebnis.
    · Mutationen, volle Suite, Vorhersage je vor dem Lauf gegen den aktuellen Bestand, Rücknahme
      per sha256 belegt, ALLE WIE VORHERGESAGT: MZ1 (Host fehlt) 14 rot — CI-Z2 an seiner
      Positivkontrolle · MZ2 (`zapier.com` zusätzlich) 6, H4z `www.zapier.com` grün · MZ3
      (Normalisierung umgangen) 4, H3z "Grossschreibung" grün — vom URL-Parser VERDECKT, vorab
      angesagt · MZ4 (Unterdomänen zugelassen) 2 · MZ5 (neuer Textteil fehlt) 2 — CI-S3 und
      CI-Z2.
    · Byte-Kontrolle der sechs Dateien am committeten Objekt: CR 0, NUL 0.

(9) ABWEICHUNGEN VOM PLAN, IM BAU DEKLARIERT:
    · H3z in drei Fälle geteilt (Grossschreibung, Punkt am Ende, beides), damit die Verdeckung
      bei MZ3 sichtbar wird; R-Z3 in zwei Tests (200 und 404/429/413); CI-Z als CI-Z1 und CI-Z2,
      CI-Z2 mit Positivkontrolle; RT-Z3 prüft zusätzlich K2 genau einmal.
    · Die erste maschinelle Prüfung der Erwartung von H1 hatte eine zu enge Achse (nur
      `https://<host>/`; Befund (s) des Abschnitts "Make" schreibt den Host in Backticks) und
      wurde mit korrigierter Achse wiederholt.
    · Eine Kommentarzeile in src/components/ActionPanel.tsx kam hinzu und wieder heraus (Scope
      "nur der Owner-Text"); netto ändert sich allein der Text.

(10) GRENZEN, als Grenzen benannt:
    · Der Punkt am Ende ist nur mit `curl` gemessen, nicht mit Node-`fetch` vom Relay (Vermerk
      P13.6-102, Punkt (2)).
    · Der Hinweistext für `zapier.com`-Adressen ist nur im Test belegt (CI-Z2); L5 ist nicht
      gefahren. Der Randfall an Owner-Entscheidung P13.6-99 ("GEMELDET, NICHT ENTSCHIEDEN")
      bleibt.
    · Nur Chrome.
    · ZM4, ZM5 und ZM7 sind offen — Arbeit P13.6-104.
    · Eine falsche oder gelöschte Zapier-Adresse über das Relay ist live nicht geprüft.
    · Die Ziel-Hosts der ausgehenden Anfragen in L3 sind nicht gemeldet (Punkt (5)).

(11) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN: im Kopf der Satz "ZUGESCHNITTEN UND
    GEPLANT AM 2026-09-30; DER BAU BEGINNT AM 2026-10-01." — mit dem Abschluss abgelaufen,
    ersetzt durch die Abschluss-Zeile. Sonst ist nichts abgelaufen.
    STEHEN GEBLIEBEN: der Gegenstand samt Bedingung der Aufnahme, Vermerk P13.6-98 (der Plan),
    Owner-Entscheidung P13.6-99, Setzung P13.6-100 und Vermerk P13.6-102 (mit einem Nachtrag).

(12) NACHGEZOGEN IN DIESEM COMMIT: Setzung P13.6-14; Owner-Entscheidungen P13.6-55, P13.6-97 und
    P13.6-99 (umgesetzt); Arbeit P13.6-27; Hebungs-Kandidat P13.6-73 (zweiter Fall); Vorrat
    P13.6-92; Vermerk P13.6-102, Punkt (5). NEU: Arbeit P13.6-104, Vorrat P13.6-105.
    docs/formular-empfaenger-befunde.md, Abschnitt "Zapier", Befunde (q) bis (x);
    docs/offene-punkte.md, datierte Ergänzungen an Punkt (9) des Postens "BETREIBER-DOKUMENTATION
    FEHLT — DREI PUNKTE" und am Posten "IM BROWSER-DIREKTEN WEG ERSCHEINT BEI FALSCHER ODER
    GELÖSCHTER ZIELADRESSE DIE DANKE-SEITE …" (Titel, Trigger und Stubs in CLAUDE.md
    unverändert — keiner der Stubs nennt "allein Make"). Die Roadmap-Zeile 13.6 ist nicht
    geändert.

## Zuschnitt Scheibe Beacon bei Erstveröffentlichung

**ABGESCHLOSSEN AM 2026-10-01 — Bau-Commit `1256f0e`, Live-Test bestanden (nur Chrome);
Abschluss-Vermerk P13.6-114.**
- GEGENSTAND: Vorrat P13.6-105 der Phase 13.6 — die erste Veröffentlichung eines neuen Projekts
  trägt den Conversion-Beacon, ohne dass der Betreiber den Editor neu laden muss.
- BENENNUNG, DEKLARIERT (CC): wie bei den Scheiben "Zurück-Cache" und "Zapier ins Relay" ohne
  Nummer; die Überschrift übernimmt den Namen aus dem Auftrag.
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen, Entscheidungen und Grenzen, die über
  die Scheibe hinaus binden, dazu die Vermerke der Scheibe. Was gestrichen ist: Vermerk
  P13.6-114, Punkt (9).

### Messung zur Scheibe Beacon bei Erstveröffentlichung

**Vermerk P13.6-106 — DIE ERSTE VERÖFFENTLICHUNG OHNE NEULADEN TRÄGT KEINEN CONVERSION-BEACON;
NACH NEULADEN UND ERNEUTEM VERÖFFENTLICHEN TRÄGT SIE IHN.** KEIN BAU-COMMIT: Messrunde; im Repo
ändert sich keine Zeile Code.

(0) PROVENIENZ DER PUNKTE (1) BIS (3): GEMESSEN, OWNER, live, 2026-10-01, Chrome 154 (Build nicht
    angegeben), übermittelt im Auftrag der Runde "Beacon bei Erstveröffentlichung — Messvermerk,
    Zuschnitt, Plan". Das Instrument (Zählung im Live-Text, Bytes) ist im Auftrag nicht
    beschrieben; ob je zweimal gemessen wurde, ist nicht angegeben. Tracking-Schlüssel stehen
    bewusst nicht in dieser Datei.

(1) DAS PRÜFSTÜCK: ein neues Projekt `test-beacon-fehler-lgsn6g.publayer.net`, HTML importiert,
    EINE Tracking-Aktion (Ereignis) auf einem Knopf, KEINE Pixel-ID, KEINE Zugangsdaten eines
    Ziels.

(2) B1 — erstes Veröffentlichen OHNE Neuladen: `__psMetaFire` 0-mal im Live-Text, 9720 Bytes.
    B2 — Editor neu geladen, erneut veröffentlicht: `__psMetaFire` 4-mal, 11796 Bytes.
    POSITIVKONTROLLE: B2 — derselbe Text-Weg trifft den Baustein, sobald der Schlüssel im Editor
    bekannt ist; die Null in B1 ist damit kein Fehlschlag des Instruments.

(3) GERECHNET (ARCHITEKT), NICHT ALS TEXT VERGLICHEN: 11796 − 9720 = 2076 = 1968 (die
    Meta-Laufzeit, Mass aus Vermerk P13.6-103, Punkt (4)) + 3 × 36 (die Aufrufe).
    · NACHGERECHNET (CC): 11796 − 9720 = 2076; 1968 + 108 = 2076.
    · GELESEN AM CODE (CC, Stand `0e34d8f`): Ohne Pixel-ID trägt `metaTrackStatement`
      (src/lib/tracking/meta.ts) die Warnzeile ohnehin; der Aufruf kommt als Zeilenumbruch, zwölf
      Leerzeichen und `__psMetaFire(a.config);` hinzu — 1 + 12 + 23 = 36 Bytes. Das
      Wiring-Skript (`buildWiringScript`, src/lib/generate.ts) trägt drei Track-Zweige; ein
      vierter steht allein in `formTargetBranch`, also nur bei einem Formular-Ziel. Drei
      Aufrufe sind damit mit einem Prüfstück OHNE Formular-Ziel verträglich (die Zapier-Seite in
      Vermerk P13.6-103 trug eines und viermal den Aufruf). Ob das Prüfstück ein Formular-Ziel
      trägt, ist nicht angegeben.
    · ABGELEITET (CC), NICHT NACHGEZÄHLT: 4 Vorkommen = die Definition `function
      __psMetaFire(cfg)` + 3 Aufrufe.
    · NACHGETRAGEN 2026-10-01: Owner-Angabe P13.6-111 der Phase 13.6 — das Prüfstück trägt
      KEIN Formular-Ziel. Die Zerlegung in drei Aufrufe ist damit gestützt; sie bleibt
      gerechnet, nicht als Text verglichen.

(4) ERGEBNIS: Vorrat P13.6-105 ist GEMESSEN — B1 gegen B2, mit B2 als Positivkontrolle. Gemessen
    ist die WIRKUNG (kein Baustein bei der ersten Veröffentlichung ohne Neuladen); der
    Mechanismus (der Schlüssel fehlt im Zustand des Editors) bleibt GELESEN AM CODE (Vorrat
    P13.6-105).

(5) GRENZEN: nur Chrome; ein Prüfstück; ohne Pixel-ID und ohne Zugangsdaten; ob nach B1 ein
    Klick ohne Server-Ereignis blieb, ist nicht gemessen (ABGELEITET aus dem fehlenden
    Baustein).

### Architekten-Setzung zur Scheibe Beacon bei Erstveröffentlichung

PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-10-01, übermittelt im Auftrag der Runde "Beacon bei
Erstveröffentlichung — Messvermerk, Zuschnitt, Plan". REVIDIERBAR; ein Owner-Widerspruch hebt
sie auf. Wo "(CC)" steht, stammt die Angabe von CC (GELESEN AM BESTAND bzw. AM CODE, HEAD
`0e34d8f`).

**Setzung P13.6-107 — DER ZUSCHNITT: DIE ERSTE VERÖFFENTLICHUNG EINES PROJEKTS TRÄGT DEN
CONVERSION-BEACON, OHNE DASS DER BETREIBER NEU LADEN MUSS.**
- EIGENE SCHEIBE IN 13.6, ALS NÄCHSTE; VORAUSSETZUNG VOR DEM ERSTEN FREMDEN NUTZER.
- INVARIANTEN:
  (1) `tracking_key` bleibt eigene, server-autoritative Spalte, nie in `settings`.
      FUNDSTELLE (CC): docs/arbeitsweise.md, 4b, "Identität"; Dauerregel "SERVER-EIGENE
      IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB".
  (2) `/api/e`, `/api/capi`, der Ingest und die 204-Regeln bleiben unberührt.
  (3) Für ein Projekt, dessen Schlüssel schon im Editor bekannt ist, ändert sich der erzeugte
      Text nicht (Byte-Gleichheit).
  (4) Kein zweiter Weg zur Schlüssel-Erzeugung, der mit `ensureTrackingKey` (src/lib/settings.ts)
      auseinanderlaufen kann ("kein drittes Urteil" — FUNDSTELLE (CC): docs/arbeitsweise.md,
      4b, dort am geteilten Auslieferbarkeits-Prädikat formuliert).
  (5) Relay, Formular-Ziel und Serve-Route bleiben unberührt.
- AUSSER SCOPE: der Weg über die Pixel-ID · ein Umbau des Google-Wegs (nur geprüft wird, ob
  derselbe Fehler dort wirkt — Befund, kein Bau) · Oberfläche.
- BEZUG (CC): Archiv der Phase 11.2 (docs/claude-history/phase-11.2-google.md), Abschnitt "Der
  Schlüssel kommt aus der Spalte": Dort ist die Erst-Anlage am 2026-09-07 ausdrücklich NICHT
  gebaut worden ("DIE ERST-ANLAGE — ENTSCHIEDEN: SIE WIRD NICHT GEBAUT"), und eine eigene
  Server-Action, die den Schlüssel liefert, ist dort als "WEG D" am Fehlerkanal verworfen. EINORDNUNG
  (CC): Jene Ausschluss-Entscheidung galt dem Zuschnitt der damaligen Scheibe; diese Setzung nimmt
  die Erst-Anlage jetzt als eigenen Gegenstand auf. Zur Verwerfung von "WEG D" nimmt der Plan
  Stellung, wo ein Kandidat ihr ähnelt.
  NACHGETRAGEN 2026-10-01: Die Entscheidung vom 2026-09-07 ist durch Owner-Entscheidung
  P13.6-110 der Phase 13.6 revidiert; die Stellungnahme zu "WEG D" steht in Setzung P13.6-109.
- UMGESETZT 2026-10-01: Bau-Commit `1256f0e`, Live-Test bestanden (nur Chrome) — Vermerk
  P13.6-114 der Phase 13.6; die Wächter je Invariante dort, Punkt (6). Der Befund zum Google-Weg
  aus AUSSER SCOPE steht in Vermerk P13.6-108, Punkt (2) (betroffen); für NEUE Projekte heilt
  ihn die Gestalt (a1) mit (Setzung P13.6-109, GRÜNDE), gebaut ist am Google-Weg nichts.

### Planrunde der Scheibe Beacon bei Erstveröffentlichung

**Vermerk P13.6-108 — DER PLAN (P1 BIS P6) UND DIE GATES G1 BIS G3, VERDICHTET.**
PROVENIENZ: Berichte zweier read-only Runden (CC, 2026-10-01; Planrunde am Stand `0e34d8f`, Gates
am Stand `3136962`). DIE BERICHTE STEHEN IN KEINER DATEI DES REPOS; hier verdichtet, Zeilennummern
durch Symbolnamen ersetzt. GELESEN AM CODE, soweit nicht anders gekennzeichnet; NICHTS DAVON IST
LIVE GEMESSEN.
(1) P1 — DIE LÜCKE. `saveProject` (src/app/projects/actions.ts) ist der EINZIGE Insert in
    `projects` (GEMESSEN AM REPO: ein `.insert(` über alle `from("projects")`); er schreibt keinen
    Schlüssel. Der Editor hält ihn im Zustand `trackingKey` (src/components/CodeImporter.tsx),
    gesät aus `initialTrackingKey` (src/app/page.tsx), `resetToEmpty`, `handleSwitch` und dem
    Nachrück-Zweig in `handleDelete`, dazu gesetzt in `handleCredentialsSaved` — nicht in
    `handleSave`, nicht in `handlePublish`. `handlePublish` erzeugt den Text über
    `buildDocumentFor` mit dem Wert des laufenden Renders; erst `publishProject` ruft
    `ensureTrackingKey` und schreibt die Spalte, und `PublishResult` trägt den Schlüssel nicht
    zurück. Deshalb fehlt der Beacon auch bei einem zweiten Veröffentlichen in derselben
    Sitzung.
(2) P2 — WER NOCH BETROFFEN IST. Ja: die erste Veröffentlichung (auch wiederholt in derselben
    Sitzung), der Export (derselbe Zustand; ein nie veröffentlichtes Projekt hat gar keinen
    Schlüssel), Variante B (derselbe Aufruf), der Google-Weg (die OAuth-Rückkehr ruft
    `ensureTrackingKey` ausdrücklich nicht; dass die Rückkehr den Editor neu lädt, ist
    ABGELEITET), ein Projekt nur mit Pixel-ID (zur Hälfte: `fbq` ohne Beacon; ausser Scope), ein
    vor dem ersten Veröffentlichen in einem zweiten Tab geladener Editor (Häufigkeit NICHT
    ENTSCHEIDBAR). Nein: die Vorschau (sendet nie, Scheibe 13.6-2), Projektwechsel und
    Nachrücken (lesen die Spalte), das Speichern von Zugangsdaten (heilt über
    `handleCredentialsSaved`, Test K6).
(3) P3 — KANDIDATEN: (a1) Schlüssel im Insert-Zweig von `saveProject` · (a2) Spalten-Default per
    Migration · (b) eigene Server-Action vor der Erzeugung · (c1) `publishProject` liefert den
    Schlüssel, der Client veröffentlicht erneut · (c2) der Server verweigert bei abweichendem
    Schlüssel und liefert ihn, der Client versucht einmal erneut · (d1) der Server setzt Laufzeit
    und Aufrufe selbst ein · (d2) Platzhalter im Client, Ersetzung auf dem Server · (e) Schlüssel
    beim Laden sicherstellen. Gewählt und verworfen: Setzung P13.6-109.
(4) P4 — BESTAND: drei lesende Abfragen für den Owner (Projekte ohne Schlüssel; veröffentlichte
    Seiten mit Track-Aktion ohne Beacon, Marker `eventSourceUrl` — er steht im ausgelieferten Text
    allein in `buildCapiBeaconStatement`, src/lib/tracking/meta.ts; Mitläufer das Prüfstück).
    Nicht gefahren. Bereits veröffentlichte Seiten heilt kein Kandidat; sie brauchen Neuladen und
    erneutes Veröffentlichen.
(5) P5/P6 — Tests und Live-Entwurf: im Bau-Bericht der Scheibe.
(6) G1 — Die Entscheidung "DIE ERST-ANLAGE — ENTSCHIEDEN: SIE WIRD NICHT GEBAUT" (Archiv der Phase
    11.2, Abschnitt "Der Schlüssel kommt aus der Spalte") trägt die Provenienz
    "ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07 … OWNER-GO 2026-09-07". Einen Sachgrund gegen die
    Erst-Anlage nennt das Archiv nicht; die Kandidaten am Speicher- und am Veröffentlichungs-Pfad
    führt es als "eigene Entscheidungen, hier nicht getroffen". Revidiert: Owner-Entscheidung
    P13.6-110.
(7) G2 — Spaltenrechte auf `projects`: Vermerk P13.6-112 (gemessen) und Arbeit P13.6-113.
(8) G3 — Insert und Erzeugung laufen in GETRENNTEN Handlern: `handlePublish` bricht ohne
    `projectId` ab (`if (!projectId) return;`), der Insert läuft allein in `handleSave`, und
    `setProjectId(result.id)` steht in dessen Erfolgszweig. Ein dort gesetzter Zustand ist beim
    späteren Klick auf "Veröffentlichen" gerendert.

**Setzung P13.6-109 — GESTALT (a1): DER SCHLÜSSEL ENTSTEHT IM INSERT-ZWEIG VON `saveProject`.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-10-01, übermittelt im Auftrag der Runde "Beacon bei
Erstveröffentlichung — Fortsetzung". REVIDIERBAR; ein Owner-Widerspruch hebt sie auf.
- GESTALT: Der Insert-Zweig von `saveProject` schreibt `tracking_key: ensureTrackingKey(null)` und
  liest ihn per `.select("id,tracking_key")` zurück; `SaveResult` bekommt ein additives Feld;
  `handleSave` setzt den Zustand `trackingKey`.
- GRÜNDE: keine Migration · keine zusätzliche Rundreise · ein einziger Erzeuger (Invariante (4)
  der Setzung P13.6-107) · heilt Export und Google-Weg für NEUE Projekte · keine neue
  Server-Action.
- VERWORFEN, je mit Grund: (a2) zweiter Erzeuger in der Datenbank und eine Migration · (b) "WEG D"
  des Archivs der Phase 11.2, eine neue Server-Action (offener Punkt "DIE IDOR-WÄCHTER SIND
  NAMENTLICH …") und der Wettlauf zweier Tabs · (c1) die Seite ist zeitweise ohne Beacon live ·
  (c2) invasiv in `publishProject` · (d2) ein neuer Kontrakt, und den Export heilt sie nicht ·
  (e) Schreiben im GET (Dauerregel "EINE ROUTE, DIE SCHREIBT ODER EINEN FREMDEN ENDPUNKT RUFT,
  IST NIEMALS EIN GET"). (CC) (d1) nennt der Auftrag nicht; der Plan führte gegen sie: ohne
  Parser nur über eine Server-Kopie der Laufzeit (ein zweiter Erzeuger) oder einen globalen
  Hook-Namen (ein Kontrakt), und der Text JEDER Seite änderte sich (gegen Invariante (3)).
- AUFLAGE, BEANTWORTET DURCH G3 (Vermerk P13.6-108, Punkt (8)): "Der Schlüssel aus dem Insert geht
  direkt an `buildDocumentFor`, wenn Insert und Erzeugung im selben Handler laufen" — sie laufen
  getrennt; die Auflage ist gegenstandslos, Mutation M2 entfällt.
- GRENZEN: Ein Editor, der vor dem ersten Speichern in einem zweiten Tab geladen war, kennt den
  Schlüssel nicht · Bestandsprojekte ohne Schlüssel (heute nur Testprojekte des Owners — ANGABE
  DES AUFTRAGS) heilen erst durch Neuladen und erneutes Veröffentlichen; KEIN Backfill, er wäre
  ein zweiter Erzeuger · bereits veröffentlichte Seiten und Exporte ändern sich erst durch
  Neu-Veröffentlichen bzw. Neu-Export.

**Owner-Entscheidung P13.6-110 — DIE ERST-ANLAGE DES SCHLÜSSELS WIRD GEBAUT; DIE ENTSCHEIDUNG VOM
2026-09-07 IST REVIDIERT.**
PROVENIENZ: OWNER-GO 2026-10-01, übermittelt im Auftrag der Runde "Beacon bei
Erstveröffentlichung — Fortsetzung". BINDEND.
- REVIDIERT: "DIE ERST-ANLAGE — ENTSCHIEDEN: SIE WIRD NICHT GEBAUT" (Architekten-Entscheidung mit
  Owner-GO vom 2026-09-07; Archiv der Phase 11.2, Abschnitt "Der Schlüssel kommt aus der Spalte").
- GRUND: Jede Erstveröffentlichung verliert still alle Conversions, live gemessen (Vermerk
  P13.6-106).
- DAS ARCHIV BLEIBT UNVERÄNDERT (Zeitdokument); der Zeiger steht hier.

**Owner-Angabe P13.6-111 — DAS PRÜFSTÜCK DES VERMERKS P13.6-106 TRÄGT KEIN FORMULAR-ZIEL, NUR DIE
TRACKING-AKTION.**
PROVENIENZ: OWNER-ANGABE 2026-10-01, übermittelt im selben Auftrag.
- FOLGE (CC): Drei Track-Zweige im Wiring-Skript, also drei Aufrufe (Vermerk P13.6-106, Punkt
  (3)); die Zerlegung 2076 = 1968 + 3 × 36 ist damit gestützt, weiter gerechnet und nicht als Text
  verglichen.

### Abschluss der Scheibe Beacon bei Erstveröffentlichung

**Vermerk P13.6-114 — ABSCHLUSS DER SCHEIBE "BEACON BEI ERSTVERÖFFENTLICHUNG". Bau-Commit
`1256f0e`** ("fix(tracking): Tracking-Schluessel beim Anlegen erzeugen, Beacon ab
Erstveroeffentlichung"). LIVE-TEST BESTANDEN, nur Chrome.
Doku-Commits der Scheibe: `3136962` (Messung, Zuschnitt) · `a882ae3` (Planrunde, Gestalt (a1),
Sicherheitsbefund Spaltenrechte) · dieser Commit (Abschluss).

(0) PROVENIENZ DER PUNKTE (1) BIS (4): GEMESSEN, OWNER, live, 2026-10-01, Chrome 154 (Build nicht
    angegeben), übermittelt im Auftrag der Abschluss-Runde. Gezählt und gemessen am Live-Text; das
    Instrument ist im Auftrag nicht beschrieben. Tracking-Schlüssel stehen bewusst nicht in dieser
    Datei.

(1) V0 — VOR DEM PUSH, Prüfstück `test-beacon-fehler`, Editor neu geladen, veröffentlicht,
    zweimal: 11796 Bytes, sha256
    `22c8a4116531e4c5bfc6bf74c0e9afec2f04975fadf6ced7ad2e55dbe1558b6b`; `eventSourceUrl` 1-mal,
    `__psMetaFire` 4-mal.
    · GEMESSEN AM BESTAND (CC): Bytes und `__psMetaFire` gleichen B2 in Vermerk P13.6-106, Punkt
      (2); einen sha256 trägt jener Vermerk nicht. Dass es dasselbe Prüfstück ist, ist nach Name
      und Werten ABGELEITET.

(2) L0 — nach dem Deploy `1256f0e` ("Ready"), ohne Neu-Veröffentlichen: gleich V0.
    L1 — Editor neu geladen, erneut veröffentlicht, zweimal: gleich V0. Invariante (3) der Setzung
    P13.6-107 ist damit live belegt — für ein Projekt, dessen Schlüssel im Editor bekannt ist,
    ändert sich der erzeugte Text nicht.

(3) L2 — DER KERNFALL: ein NEUES Projekt `test-beacon-fehler-neu-yqxidu.publayer.net`,
    Track-Aktion "Lead", keine Pixel-ID, keine Zugangsdaten, gespeichert und OHNE Neuladen
    veröffentlicht: `eventSourceUrl` 1-mal, `__psMetaFire` 4-mal, Schlüssel-Stellen 2, alle gleich.
    · Gegenstück zu B1 in Vermerk P13.6-106, Punkt (2) (0-mal `__psMetaFire`): Die erste
      Veröffentlichung ohne Neuladen trägt jetzt den Beacon.
    · ABGELEITET AM CODE (CC): Die eine Stelle setzt `publishProject` aus der Spalte ein (der
      PageView-Emitter, `injectPageViewEmitter`), die andere stammt aus dem Zustand des Editors,
      gesetzt in `handleSave` aus dem Ergebnis des Inserts. "Alle gleich" belegt damit live, dass
      der Editor den Wert der Spalte bekommen hat — kein zweiter, abweichender Schlüssel. Welche
      zwei Stellen gezählt wurden, ist nicht übermittelt.

(4) L3 — EIN KLICK auf der Seite aus (3), SQL über `events` und `domains` (letzte 15 Minuten, nur
    Zählungen): `Lead | server | 1`; Positivkontrolle `__ps_pageview | server | 1`. Das
    Conversion-Ereignis der ersten Veröffentlichung kommt damit am Server an.

(5) BAU (CC, 2026-10-01, am Stand vor dem Commit `1256f0e`):
    · Geändert, fünf Dateien (`git show --stat 1256f0e`): src/app/projects/actions.ts — der
      Insert-Zweig von `saveProject` schreibt `tracking_key: ensureTrackingKey(null)` und liest
      per `.select("id,tracking_key")` zurück, `SaveResult` trägt additiv `trackingKey?` ·
      src/components/CodeImporter.tsx — `handleSave` setzt den Zustand `trackingKey` nur, wenn das
      Ergebnis einen Schlüssel trägt (nur setzen, nie leeren) · src/lib/settings.ts — allein der
      Kommentar über `ensureTrackingKey` · src/app/projects/actions.test.ts und
      src/components/CodeImporter.test.tsx — neue Tests. Berichtigt sind dazu die Kommentare an
      `ProjectRow`, am Prop `initialTrackingKey` und "strukturell unerreichbar" am Update-Zweig
      in actions.test.ts.
    · Unberührt: `publishProject`, der Rumpf von `ensureTrackingKey`, generate.ts, meta.ts,
      ingest.ts, `/api/e`, `/api/capi`, src/lib/relay/, form-target.ts, die Serve-Route, proxy,
      alle Migrationen.
    · Vorher-Wert für BE-PIN, erhoben vor der ersten Code-Änderung: 10770 Bytes, sha256
      `9723ce7bac67b7e9645db004a545f52fa3f4e7baea26859ca618a532f7e8f471` (Konstanten `PIN_BYTES`
      und `PIN_SHA256` in src/components/CodeImporter.test.tsx).
    · BE-1 war am alten Code rot, an der Zusicherung auf `sendBeacon` — die Verankerung "vorher
      kein Beacon".
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, die eine bekannte Warnung in
      src/lib/tracking/consent.test.ts; `vitest run` 102 Dateien, 2776 Tests (vorher 102 Dateien,
      2769 Tests); `next build` exit 0. Vor dem Commit erneut gefahren, dasselbe Ergebnis.
    · Mutationen, volle Suite, Vorhersage je vor dem Lauf, Rücknahme per sha256 belegt
      (actions.ts `b514c516…`, CodeImporter.tsx `b06a5026…`), ALLE WIE VORHERGESAGT: M1 (die
      Setzung in `handleSave` entfällt) 1 rot — BE-1 · M3 (ein zweiter Erzeuger statt der
      Übergabe) 2 — S-INS-1, S-INS-2 · M4 (Insert ohne `tracking_key`, Rückgabe gesetzt) 3 —
      S-INS-1, S-INS-2, W-INV4 · M6 (`.select("id")`) 2 — S-INS-1, S-INS-2 · M7 (ein Ergebnis ohne
      Schlüssel leert den Zustand) 1 — BE-PIN-2. M2 ist entfallen: ihre Auflage ist durch G3
      gegenstandslos (Setzung P13.6-109).
    · Byte-Kontrolle der fünf Dateien am committeten Objekt: alle LF, CR 0, NUL 0.

(6) WÄCHTER, je Festlegung (A = src/app/projects/actions.test.ts, CI =
    src/components/CodeImporter.test.tsx):
    · Gegenstand der Setzung P13.6-107 (die erste Veröffentlichung trägt den Beacon): BE-1 (CI);
      S-INS-1 (A).
    · Invariante (1) — `tracking_key` bleibt eigene, server-autoritative Spalte: W-INV4 (A;
      Schreibstellen allein in actions.ts und allein aus `ensureTrackingKey`, kein Default auf
      der Spalte in den Migrationen).
    · Invarianten (2) und (5) — Ingest, Relay, Formular-Ziel und Serve-Route unberührt: der Scope
      des Bau-Commits, Punkt (5); kein eigener Test.
    · Invariante (3) — Byte-Gleichheit bei bekanntem Schlüssel: BE-PIN, BE-PIN-2 (CI); live L1.
    · Invariante (4) — kein zweiter Erzeuger: W-INV4 (`crypto.randomUUID` allein in
      `ensureTrackingKey`) und S-INS-2 (A).
    · Der Update-Zweig liefert keinen Schlüssel: S-INS-3 (A).

(7) ABWEICHUNG, IM BAU DEKLARIERT: `PIN_BYTES` in src/components/CodeImporter.test.tsx ist einmal
    mit `sed -i` gesetzt worden, einem Ganz-Datei-Schreiber; die volle Byte-Kontrolle danach ohne
    Befund (CR 0, CRLF 0, LF gleich Zeilenzahl, NUL 0; Diff rein additiv). Danach allein das
    Editier-Werkzeug. Die Erweiterung des Scopes auf den Kommentar in src/lib/settings.ts war im
    GO-Auftrag freigegeben.

(8) GRENZEN, als Grenzen benannt:
    · Ein Editor, der vor dem ersten Speichern in einem ZWEITEN Tab geladen war, kennt den
      Schlüssel nicht; veröffentlicht er ohne Neuladen, fehlt der Beacon weiter (Setzung
      P13.6-109, GRENZEN).
    · Projekte, die VOR dem Fix angelegt und nie veröffentlicht wurden, tragen keinen Schlüssel.
      Sie heilen durch Veröffentlichen, Neuladen und erneutes Veröffentlichen; kein Backfill
      (ebenda).
    · Bereits veröffentlichte Seiten ohne Beacon bleiben so bis zum Neu-Veröffentlichen, Exporte
      bis zum Neu-Export (Dauerregel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY").
    · Die Annahme bei Meta ist nicht geprüft: Das Prüfstück trägt keine Pixel-ID und keine
      Zugangsdaten. Belegt ist die `events`-Zeile `server`, kein Forward.
    · Nur Chrome.
    · Die Bestandsabfragen aus Plan P4 (Vermerk P13.6-108, Punkt (4)) sind nicht gemeldet.

(9) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN — mit der Scheibe abgelaufen: im Kopf
    der Satz "ZUGESCHNITTEN AM 2026-10-01 (ARCHITEKT); DER PLAN FOLGT IM BERICHT DERSELBEN RUNDE,
    NICHT IN DIESER DATEI." samt seinem Nachtrag vom selben Tag — ersetzt durch die
    Abschluss-Zeile; Plan und Gestalt, auf die der Nachtrag zeigte, stehen unverändert als
    Vermerk P13.6-108 und Setzung P13.6-109. Sonst ist nichts abgelaufen: Die übrigen Anweisungen
    des Zuschnitts sind Teile bindender Einträge und tragen einen Nachtrag statt einer Streichung
    (an Setzung P13.6-107 der Punkt "UMGESETZT", dort auch der Befund zum Google-Weg aus AUSSER
    SCOPE).
    STEHEN GEBLIEBEN: Vermerk P13.6-106, Setzung P13.6-107, Vermerk P13.6-108, Setzung P13.6-109,
    Owner-Entscheidung P13.6-110, Owner-Angabe P13.6-111. BINDEND bleiben P13.6-107, P13.6-109,
    P13.6-110 und P13.6-111.
    BEWUSST NICHT FESTGEHALTEN: der Ablauf der Gate-Runde G1 bis G3 über das in Vermerk P13.6-108
    Verdichtete hinaus — an ihm hängt keine spätere Handlung.

(10) NACHGEZOGEN IN DIESEM COMMIT: Setzung P13.6-14 (als Nächstes Arbeit P13.6-113); Vorrat
    P13.6-105 (erledigt); Arbeit P13.6-113 (Bezug zur Roadmap-Zeile 13.7); Vorrat P13.6-84
    (vollzogen). Im selben Commit, nicht aus dieser Scheibe: die Roadmap-Zeile 13.7 samt Stub in
    CLAUDE.md, der Punkt "Missbrauch und stiller Verlust" in docs/arbeitsweise.md und der
    ersetzte Satz in CLAUDE.md, "## Aktueller DB-/Analytics-Stand". Die Roadmap-Zeile 13.6 ist
    nicht geändert.

## Zuschnitt Scheibe Spaltenrechte

**ABGESCHLOSSEN AM 2026-10-01 — Code-Commit `6f66c44`, Migration 0031 eingespielt, Live-Test
bestanden (nur Chrome); Abschluss-Vermerk P13.6-130.**
- GEGENSTAND: Arbeit P13.6-113 der Phase 13.6 — die Sicherheits-Scheibe "Spaltenrechte". Befund:
  Vermerk P13.6-112. Reihenfolge: Setzung P13.6-14.
- BENENNUNG, DEKLARIERT (CC): wie bei den Scheiben "Zurück-Cache", "Zapier ins Relay" und
  "Beacon bei Erstveröffentlichung" ohne Nummer; die Überschrift übernimmt den Namen aus Arbeit
  P13.6-113.
- Der Zuschnitt ist verdichtet: Hier stehen die Setzungen, Entscheidungen und Grenzen, die über
  die Scheibe hinaus binden, dazu die Vermerke der Scheibe. Was gestrichen ist: Vermerk
  P13.6-130, Punkt (9).

### Architekten-Setzung zur Scheibe Spaltenrechte

PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-10-01, übermittelt im Auftrag der Runde "Scheibe
Spaltenrechte — Zuschnitt und Plan". REVIDIERBAR; ein Owner-Widerspruch hebt sie auf. Wo "(CC)"
steht, stammt die Angabe von CC (GELESEN AM BESTAND bzw. AM CODE, HEAD `03d4338`).

**Setzung P13.6-115 — DER ZUSCHNITT: KEINE ROLLE AUSSER DEM SERVER KANN EINE SERVER-EIGENE SPALTE
SCHREIBEN — IN KEINER TABELLE.**
- REICHWEITE: jede Tabelle, die eine Rolle per Policy schreiben darf, nicht nur `projects` (Arbeit
  P13.6-113, AUFTRAG).
- INVARIANTEN:
  (1) Speichern, Veröffentlichen, A/B-Aktivierung, Kill-Switch, Zugangsdaten und Domains
      funktionieren wie heute.
  (2) RLS bleibt aktiv; keine Policy wird gelockert.
  (3) `/api/e`, `/api/f`, Ingest, Relay und Serve-Route bleiben unberührt.
  (4) Kein ausgelieferter Text ändert sich.
  (5) Code vor Migration: erst der Code, der ohne die entzogenen Rechte auskommt — deployen,
      prüfen —, dann die Migration, dann erneut prüfen.
      GEÄNDERT 2026-10-01 (ARCHITEKT, Setzung P13.6-117; Regel: Owner-Entscheidung P13.6-120).
      Bis dahin lautete sie "Migration vor Code-Deploy."
- OFFENE FRAGEN: die Gates S1 bis S7 der Planrunde — S1 Inventar der Tabellen und Spalten
  (client-eigen gegen server-eigen) · S2 die Schreibwege jeder server-eigenen Spalte · S3 die
  Kandidaten (a) Spaltenrechte, (b) BEFORE-Trigger, (c) SECURITY-DEFINER-RPCs, (d) eigene Tabelle,
  je mit Kosten und der Folge für die Dauerregel "GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE
  TRAGENDE SCHICHT" · S4 die Anbieter-Lesung als Vorbedingung · S5 der Live-Beweis über PostgREST
  mit echter Sitzung · S6 das Plan-Gate "Missbrauch und stiller Verlust" · S7 die Tests. Die
  Antworten stehen im Bericht der Planrunde.
- FUNDSTELLEN (CC): Invariante (2) — Dauerregel "GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE
  TRAGENDE SCHICHT"; (4) — Dauerregel "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE
  EINBAHNSTRASSE …"; (5) — docs/db-regeln.md, "MIGRATION IMMER VOR CODE-DEPLOY"; der
  Kill-Switch — CLAUDE.md, Tier 0, samt Zusatz vom 2026-10-01; das Plan-Gate —
  docs/arbeitsweise.md, "Missbrauch und stiller Verlust" (Commit `03d4338`).
- BEZUG (CC): Roadmap-Zeile 13.7 (die Arbeit bleibt in 13.6, Abgrenzung dort); offener Punkt "DIE
  GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026" (docs/offene-punkte.md).
- KOLLISIONEN, GEMELDET, NICHT AUFGELÖST (CC, ABGELEITET am Wortlaut und am Code):
  · ZIEL GEGEN INVARIANTE (1): Das Kill-Switch-Runbook (CLAUDE.md, Tier 0, "SQL-RUNBOOK") setzt
    `blocked_at` im SQL-Editor, nicht über den Server. "Keine Rolle ausser dem Server" darf die
    Rolle des SQL-Editors nicht treffen, sonst bricht der Kill-Switch. Welche Rolle der
    SQL-Editor fährt, ist am Repo NICHT ENTSCHEIDBAR.
    BEANTWORTET 2026-10-01: Der SQL-Editor fährt `postgres` (Vermerk P13.6-118); die Gestalt
    entzieht Rechte allein anon und authenticated (Setzung P13.6-117).
  · INVARIANTE (5) GEGEN DIE WIRKRICHTUNG: Der heutige Code schreibt server-eigene Spalten über den
    Client mit Nutzer-Sitzung — etwa `publishProject` (src/app/projects/actions.ts) die Spalten
    `published_content` und `tracking_key`. Entzieht eine Migration der angemeldeten Rolle dieses
    Recht, bricht im Fenster zwischen Migration und Deploy der ALTE Code. Der Grund der Regel
    ("sonst liest der neue Code eine Spalte/Funktion, die es noch nicht gibt") trifft diesen Fall
    nicht, und ihr Satz "eine Migration OHNE den zugehörigen Code [ist] in der Regel ein No-op"
    gilt hier nicht. Berührt ist der offene Punkt "DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST
    UNGEREGELT"; ob ein Entzug von Rechten dort als "nicht-additiv" zählt, definiert der Eintrag
    nicht.
    AUFGELÖST 2026-10-01: Owner-Entscheidung P13.6-120 (die Regel ist präzisiert) und die
    Reihenfolge in Setzung P13.6-117; Invariante (5) ist entsprechend geändert. Der offene
    Punkt trägt eine datierte Ergänzung.
- UMGESETZT 2026-10-01: Code-Commit `6f66c44`, Migration 0031 eingespielt, Live-Test bestanden
  (nur Chrome) — Vermerk P13.6-130 der Phase 13.6; die Nachweise je Invariante dort, Punkt (6).

### Planrunde der Scheibe Spaltenrechte

**Vermerk P13.6-116 — DER PLAN "SPALTENRECHTE" (S1 BIS S7), VERDICHTET.**
PROVENIENZ: Bericht der Planrunde (CC, 2026-10-01, read-only, Code-Stand `03d4338`; Teil A jener
Runde ist Commit `498fd97`). DER BERICHT STAND IN KEINER DATEI DES REPOS; hier verdichtet,
Zeilennummern durch Symbolnamen bzw. Migrationsnamen ersetzt. GELESEN AM CODE bzw. AM BESTAND,
soweit nicht anders gekennzeichnet; NICHTS DAVON IST LIVE GEMESSEN. Eine Anbieter-Lesung hat in
jener Runde NICHT stattgefunden (Auftrag S4); jede Angabe über Postgres- oder PostgREST-Verhalten
ohne Fundstelle in docs/plattform-befunde.md ist UNGEPRÜFT.
(1) S1 — INVENTAR. RLS ist auf allen acht Tabellen in public aktiv (Migrationen; docs/db-stand.md).
    Schreib-Policies tragen nur drei Tabellen; keine Policy nennt eine Rolle (kein `TO`), für anon
    greift keine, weil `auth.uid()` leer ist (ABGELEITET):
    · `projects` — INSERT, UPDATE, DELETE, je `auth.uid() = user_id` (0001_projects).
    · `domains` — INSERT und UPDATE über einen EXISTS-Join auf das eigene Projekt, kein DELETE
      (0006_hosting).
    · `project_tokens` — INSERT und UPDATE; das WITH CHECK prüft NUR `user_id`, nicht, ob
      `project_id` dem Nutzer gehört (0005_project_tokens, Kommentar dort selbst).
    · `events` nur SELECT (0013_events_read); `audit_logs`, `schema_migrations`,
      `project_secrets`, `relay_rate_counters` keine Policy.
    Kein `grant`/`revoke` auf diese drei Tabellen in einer Migration; die Grants sind die
    Vorgabe-Grants auf Tabellen-Ebene (docs/db-stand.md, ROLLEN-GRANTS, GEMESSEN 2026-08-05).
    EINORDNUNG JE SPALTE:
    · `projects` CLIENT-EIGEN: `name`, `html`, `mappings`, `settings`, `html_b`, `mappings_b`
      (Schreiber `saveProject`, `saveVariantB`, `renameProject`, `createVariantB`; `settings` ist
      client-autoritativ — Dauerregel "SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN
      BLOB", docs/arbeitsweise.md, 4b, "Identität"). SERVER-EIGEN: `published_content` (der beim
      Veröffentlichen geprüfte Stand, Setzung P13.6-20), `tracking_key`, `ab_test_active`,
      `ab_test_started_at` (je als server-autoritativ kommentiert an `ProjectRow`,
      src/app/projects/actions.ts), `blocked_at`, `blocked_reason` (Kill-Switch, CLAUDE.md
      Tier 0), `id`, `created_at` (Vorgabewerte). SONDERFÄLLE: `user_id` ist an die Zeilen-Achse
      gebunden (WITH CHECK); `updated_at` setzt bei UPDATE der Trigger `projects_set_updated_at`.
    · `domains` (zehn Spalten): KEINE client-eigene. `label` würfelt der Server (`slugForLabel`
      plus `randomLabelSuffix`); `custom_host`, `verification_status`, `verification`,
      `vercel_synced_at`, `dns_config`, `apex_name` schreibt allein der Admin-Client
      (src/lib/domains/register.ts, status.ts); `blocked_at` hat keinen Code-Schreiber.
    · `project_tokens` (fünf Spalten): KEINE client-eigene; geschrieben allein über den
      Admin-Client, gelesen nirgends (Kopf von src/lib/supabase/admin.ts).
    NEBENBEFUND: Die Dauerregel "APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI" sagt, `project_tokens`
    trage "bewusst keine SELECT/UPDATE/DELETE-Policy"; 0005 legt `project_tokens_update_own` an,
    docs/db-stand.md führt zwei Policies (insert, update). Der Beleg der Regel ist für UPDATE falsch
    (Dauerregel "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD"). Mit Setzung
    P13.6-117 fällt die Policy weg; danach stimmt der Beleg wieder.
    NACHGETRAGEN 2026-10-01 (Abschluss der Scheibe): `project_tokens` trägt NULL Policies,
    GEMESSEN nach 0031 (Vermerk P13.6-130, Punkt (3)); die Herleitung der Dauerregel trägt den
    geprüften Beleg.
(2) S2 — SCHREIBWEGE DER SERVER-EIGENEN SPALTEN.
    · ÜBER DEN CLIENT MIT NUTZER-SITZUNG (`createClient`), alle in src/app/projects/actions.ts:
      `tracking_key` im Insert-Zweig von `saveProject`, in `setCapiToken` und in `publishProject`
      · `published_content` in `publishProject` und `removeVariantB` · `ab_test_active` in
      `setAbTestActive` und `removeVariantB` · `ab_test_started_at` in `setAbTestActive` ·
      `domains.label` in `assignDomainLabel` und `insertDomainLabel`.
    · ÜBER DEN ADMIN-CLIENT: `domains` Insert (`persistDomainRow`, register.ts), Update
      (`checkDomainStatus`, status.ts), Delete (`removeCustomDomain`, remove.ts);
      `project_tokens` Upsert und Delete (`setCapiToken`, `removeCapiToken`).
    · OHNE CODE-SCHREIBER: `projects.blocked_at`, `projects.blocked_reason`, `domains.blocked_at`
      — allein das SQL-Runbook (CLAUDE.md, Tier 0).
    · NEBENBEFUND: Der Heilungs-Zweig in `publishProject` vergibt das Label aus
      `settings.hosting.label` (`getHostingLabel`, src/lib/settings.ts: nur `trim`) über
      `insertDomainLabel`, wenn keine Label-Zeile besteht. `settings` schreibt der Client frei
      (`saveProject`); die Wahl eines Labels ist damit auch über die eigene Server-Action
      client-kontrolliert, unabhängig von Spaltenrechten.
(3) S3 — KANDIDATEN.
    · (a) SPALTENRECHTE: INSERT/UPDATE auf `projects` für anon und authenticated entziehen und
      spaltenweise neu gewähren (Insert: `user_id`, `name`, `html`, `mappings`, `settings`;
      Update: `name`, `html`, `mappings`, `settings`, `html_b`, `mappings_b`, `updated_at`);
      auf `domains` und `project_tokens` INSERT/UPDATE ganz entziehen. Code: die Schreibwege aus
      (2), erster Punkt, auf den Admin-Client nach dem Eigentums-Gate, mit `user_id`-Filter.
      Kosten: Setzung P13.6-36, F7 (Admin-Client nur bei Formular-Ziel) und die Wächter
      publish.test.ts "Scheibe 7a" ("KEIN service_role beteiligt") und P3b werden absichtlich rot;
      eine vergessene client-eigene Spalte bricht das Speichern laut (42501, ABGELEITET aus
      docs/plattform-befunde.md, Supabase, Teil (ap)). ZU LESEN: Tabellen-REVOKE gegen
      Spalten-GRANT; ob ein Trigger, der `updated_at` setzt, ein Recht braucht; ob eine später
      angelegte Spalte geschlossen beginnt. Die Dauerregel "GRANTS SCHÜTZEN NICHTS …" wird auf der
      Spalten-Achse unwahr; ihr Beleg ("volle DML-Rechte auf alle public-Tabellen") ist schon
      seit 0030 nicht mehr allgemein wahr (`relay_rate_counters`). 30.10.2026: nicht berührt,
      nur bestehende Tabellen.
    · (b) BEFORE-TRIGGER, der Änderungen server-eigener Spalten ausser für die Server-Rolle
      abweist: Rollen-Erkennung (`current_user`, `auth.role()`, JWT-Claims) ungelesen; nur als
      INVOKER trägt sie; die Rolle des SQL-Editors muss durch. Mit IS DISTINCT FROM passiert
      "gleicher Wert" (der Live-Beweis aus (5) trennt dann nicht); setzte der Trigger zurück statt
      zu werfen, entstünde stiller Verlust. Dieselben Code-Umzüge wie (a).
    · (c) SECURITY-DEFINER-RPCs: schliessen die Lücke allein nicht — der direkte Schreibweg bleibt;
      für authenticated ausführbar erlauben sie genau den verwehrten Schreibvorgang, nur für
      service_role sind sie dem Admin-Client gleich. CLAUDE.md, Block A (DEFINER nur mit
      Einzelfall-Begründung); Lints 0028/0029 (docs/plattform-befunde.md, Supabase, Teil (ax)).
    · (d) EIGENE TABELLE: berührt die Resolver in src/lib/hosting/resolve.ts,
      src/lib/relay/resolve-relay.ts, src/lib/capi/token.ts und `get_variant_counts` (gegen
      Invariante (3)); der CHECK `projects_ab_test_needs_variant_b` reicht nicht über zwei
      Tabellen; Backfill, nicht-additive Migration, geändertes Runbook; nach dem 30.10.2026
      ausdrückliche Grants (Teil (ay)).
    · REIHENFOLGE: Bei (a) und (b) bricht eine Migration vor dem Deploy den alten Code; die
      sichere Folge ist Code vor Migration.
(4) S4 — VORBEDINGUNG VOR DEM BAU (docs/db-regeln.md, vierte Regel), in jener Runde nicht
    gefahren: supabase.com/docs/guides/database/postgres/column-level-security ·
    …/database/postgres/roles · …/database/postgres/row-level-security (Abschnitt Grants) ·
    docs.postgrest.org: Authentication/User Impersonation; Tables and Views, Abschnitt "Update"
    (enthält das SET nur die Schlüssel des Rumpfes?) · postgresql.org/docs/17: sql-grant,
    sql-revoke, ddl-priv, sql-createtrigger (`UPDATE OF`). Bereits tragend: Supabase, Teile (ap),
    (ax), (ay) und Errors (#25) in docs/plattform-befunde.md.
(5) S5 — LIVE-BEWEIS, ENTWURF (PostgREST mit echter Sitzung, eigenes Testprojekt, Konsole der
    eingeloggten App). VORBEDINGUNGEN: Projekt-ID per SQL-Editor, nur lesend; `blocked_at` muss
    leer sein; Project-URL und anon-Key aus dem Dashboard (öffentlich; die App liest
    `NEXT_PUBLIC_SUPABASE_ANON_KEY`); der Vorher-Lauf VOR Deploy und Migration. Die Sitzung aus dem
    Cookie (`@supabase/ssr` 0.12.0, Präfix "base64-", ggf. gestückelt — GELESEN in
    node_modules). Drei PATCH an `projects?id=eq.<ID>&select=id` mit `Prefer:
    return=representation`; ausgegeben werden nur Status, Zeilenzahl, Fehlercode und ein
    Wahrheitswert, nie ein Schlüssel:
    · P (Positivkontrolle): `name` = heutiger Wert, mit Sitzung — vorher und nachher 200, 1 Zeile.
    · S (Prüfling): `blocked_at` = null (heutiger Wert), mit Sitzung — vorher 200, 1 Zeile (der
      PostgREST-Beleg für Vermerk P13.6-112); nachher 401/403, Code `42501` (ABGELEITET aus #25).
    · N (Negativkontrolle): dasselbe ohne Sitzung — vorher und nachher keine Zeile.
    · Gegenlesung: Name und `blocked_at` unverändert.
    Danach die Regression: Speichern, Veröffentlichen mit Byte-Vergleich (Invariante (4)), A/B
    starten und stoppen, Zugangsdaten, Domain-Status, Kill-Switch per Runbook sperren und
    entsperren.
(6) S6 — MISSBRAUCH UND STILLER VERLUST. HEUTE, der eigene Betreiber mit eigener Sitzung über
    PostgREST: Selbst-Entsperrung (`blocked_at`) · `published_content` am Riegel vorbei (eigene
    Bausteine, Leer-Riegel, Consent-Werte, Formular-Ziel) · Übernahme des `tracking_key` eines
    gelöschten Projekts · ein Wunsch-Label auf publayer.net (Phishing) oder das Label eines
    gelöschten Projekts · ein `custom_host` reserviert, mit gefälschtem `verification_status` —
    der echte Inhaber bekommt "bereits anderswo verknuepft" (`registerCustomDomain`,
    register.ts), Ratenbegrenzung und Audit-Log umgangen · `domains.blocked_at` geleert · eine
    `project_tokens`-Zeile auf eine fremde `project_id` (die UUID kommt in generate.ts,
    pageview-emitter.ts und meta.ts nicht vor; die Tabelle hat keinen Leser). JE KANDIDAT: (a)
    Missbrauch bleibt über den Heilungs-Zweig (Punkt (2)); Fehler laut statt still; neues Risiko
    ein Admin-Update ohne `user_id`-Filter · (b) wie (a), stiller Verlust beim Zurücksetzen ·
    (c) die Lücke bleibt · (d) Leser-Drift. JEDE GESTALT: Der Kill-Switch wirkt je Projekt; ein
    neues Projekt umgeht ihn (Vorrat P13.6-121).
(7) S7 — TESTS. vitest: Wächter auf die Nutzlast-Schlüssel jedes Schreibvorgangs über die
    Nutzer-Sitzung (Erwartung aus der Entscheidung, nicht aus dem Code), "Admin erst nach dem
    Gate" und `user_id`-Filter je umgezogener Aktion, Wächter über den Migrationstext (Muster
    W-MIG-COLS). SQL-Probe (Freigabe nötig): `has_column_privilege`/`has_table_privilege` je
    Rolle und Spalte, Policies, Schreibversuche als `set local role authenticated` mit rollback —
    allein die Postgres-Schicht. Live: allein die PostgREST-Schicht (5). MUTATIONEN: M1
    `blocked_at` in der Grant-Liste · M2 `publishProject` schreibt `tracking_key` wieder über die
    Nutzer-Sitzung · M3 Admin-Update ohne `user_id` · M4 Admin-Client vor dem Gate.
(8) OFFENE FRAGEN DES BERICHTS, je mit Antwort: Gestalt, `project_tokens`, Heilungs-Zweig, F7,
    Reihenfolge — Setzung P13.6-117; Rolle des SQL-Editors — Vermerk P13.6-118; Präzisierung der
    Dauerregel — Owner-Entscheidung P13.6-119; der Beleg der Append-only-Regel — Punkt (1),
    NEBENBEFUND; docs/db-stand.md ohne Spaltenrechte (Vermerk P13.6-112, Punkt (7)) — offen bis
    zum Abschluss der Scheibe.
    NACHGETRAGEN 2026-10-01: docs/db-stand.md ist im Abschluss-Commit der Scheibe aus der Messung
    nach 0031 nachgezogen (Vermerk P13.6-130, Punkt (10)).

**Setzung P13.6-117 — GESTALT (a) SPALTENRECHTE; SERVER-EIGENE SPALTEN SCHREIBT ALLEIN
service_role, NACH DEM EIGENTUMS-GATE UND MIT `user_id`-FILTER.**
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-10-01, übermittelt im Auftrag der Runde "Spaltenrechte — Plan
festhalten, Entscheidungen, Regel-Präzisierung". REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.
Wo "(CC)" steht, stammt die Angabe von CC (GELESEN AM BESTAND bzw. AM CODE, HEAD `498fd97`).
- GESTALT: Kandidat (a) aus Vermerk P13.6-116, Punkt (3).
- VERWORFEN: (b) — die Rollen-Erkennung wäre zu erraten, "gleicher Wert" passiert, Zurücksetzen
  wäre stiller Verlust · (c) — schliesst die Lücke allein nicht · (d) — verletzt Invariante (3),
  der CHECK über zwei Tabellen geht verloren.
- `domains` UND `project_tokens`: INSERT und UPDATE für anon und authenticated werden ENTZOGEN,
  ihre Schreib-Policies GELÖSCHT — keine der beiden trägt eine client-eigene Spalte. Ob
  `project_tokens` überhaupt gebraucht wird: Vorrat P13.6-122.
  (CC) Invariante (2) ("keine Policy wird gelockert") ist damit eingehalten — gelöscht werden
  Schreib-Policies, die Lesepolicy `domains_select_own` bleibt.
- DIE LABEL-VERGABE AUS `settings.hosting.label` (Heilungs-Zweig in `publishProject`) GEHÖRT IN
  DIESE SCHEIBE: Ein neues Label entsteht nie aus einem client-besessenen Wert.
  KOLLISION, GEMELDET, NICHT AUFGELÖST (CC, am Wortlaut): Die Dauerregel "DIE domains-ZEILE IST
  DIE ALLEINIGE WAHRHEIT ÜBER 'IST DIESES PROJEKT LIVE?'" sagt, `publishProject` stelle die Zeile
  "bei Bedarf mit dem ALTEN Label wieder her" — laufende Ads zeigten sonst auf die tote Adresse.
  Gelesen wird jenes ALTE Label heute aus `settings.hosting.label` (Vermerk P13.6-116, Punkt
  (2)). Ob die Wiederherstellung als "neues Label" gilt und woher das alte Label künftig kommt,
  entscheidet der Bau-Auftrag; die Dauerregel ist hier nicht geändert.
  AUFGELÖST 2026-10-01: Owner-Entscheidung P13.6-123 der Phase 13.6 — die Wiederherstellung
  vergibt ein NEUES Label; die Dauerregel ist im selben Commit angepasst.
- SETZUNG P13.6-36, F7 IST REVIDIERT: `publishProject` nutzt den Admin-Client für die
  server-eigenen Schreibvorgänge IMMER, nach dem Eigentums-Gate. (CC) Absichtlich rot werden damit
  publish.test.ts "Scheibe 7a" ("KEIN service_role beteiligt") und P3b.
- REIHENFOLGE: Code, der ohne die entzogenen Rechte auskommt → deployen, prüfen → Migration →
  prüfen. Invariante (5) der Setzung P13.6-115 ist entsprechend geändert. Die Regel dazu:
  Owner-Entscheidung P13.6-120.
- DER OFFENE PUNKT "DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT"
  (docs/offene-punkte.md) trägt eine datierte Ergänzung: wie diese Scheibe das Fenster regelt.
  ABWEICHUNG VOM AUFTRAG, GEMELDET (CC): Der Auftrag nennt den Trigger mit dieser Scheibe
  eingetreten. Am Bestand ist er dem Wortlaut nach schon mit 0025 eingetreten (Ergänzung vom
  2026-08-27 an jenem Punkt); die Migration dieser Scheibe ist geplant, nicht geschrieben und
  nicht gelaufen. Die Ergänzung sagt beides.
- UMGESETZT 2026-10-01: Code-Commit `6f66c44` (die Schreibwege), Migration 0031 (die Rechte), in
  der Reihenfolge dieser Setzung — Vermerk P13.6-130 der Phase 13.6.

**Vermerk P13.6-118 — DER SQL-EDITOR FÄHRT `postgres`.** KEIN BAU-COMMIT: Messung im SQL-Editor.
- GEMESSEN, OWNER, 2026-10-01, SQL-Editor, übermittelt im Auftrag derselben Runde:
  `current_user` = `session_user` = `postgres`. Die Abfrage selbst ist nicht übermittelt.
- FOLGE (ABGELEITET, ARCHITEKT): Das Kill-Switch-Runbook (CLAUDE.md, Tier 0) ist von einem
  Rechte-Entzug an anon und authenticated unberührt.
  ABWEICHUNG VOM AUFTRAG, GEMELDET (CC): Der Auftrag nennt die Folge "Lesung bestätigt". Eine
  Lesung dazu trägt der Bestand nicht (GEMESSEN AM REPO, 2026-10-01: Suche nach `session_user`,
  `current_user`, `superuser`, `rolsuper`, "table owner" über docs/plattform-befunde.md,
  docs/db-stand.md, docs/db-regeln.md und diese Datei — 0 Treffer; Positivkontrolle `bypassrls`
  in docs/plattform-befunde.md 2 Treffer). Ob `postgres` Eigner der Tabellen ist, ist nicht
  gemessen. Die Lesung gehört zur Vorbedingung aus Vermerk P13.6-116, Punkt (4).
  GELESEN 2026-10-01: docs/plattform-befunde.md, Supabase-Abschnitt, Teil (bg) — Dashboard-Abfragen
  laufen als `postgres`, laut RLS-Seite ist `postgres` auf Supabase Eigentümer mit `bypassrls`.
  Eigentümer und Attribute in DIESEM Projekt bleiben ungemessen (ebenda, Teil (bk)).
  NACHGETRAGEN 2026-10-01: GEMESSEN (Owner, SQL-Editor, Probe supabase/checks/spaltenrechte.sql,
  (1) und (2), vor 0031): `current_user` und `session_user` `postgres`; Eigentümer der drei
  Tabellen `postgres` mit rolsuper false und rolbypassrls true — Vermerk P13.6-130, Punkt (2).

PROVENIENZ von P13.6-119 und P13.6-120: OWNER-ENTSCHEIDUNG 2026-10-01, übermittelt im Auftrag der
Runde "Spaltenrechte — Plan festhalten, Entscheidungen, Regel-Präzisierung". BINDEND. Die Titel
beider Regeln bleiben unverändert.

**Owner-Entscheidung P13.6-119 — PRÄZISIERUNG DER DAUERREGEL "GRANTS SCHÜTZEN NICHTS — RLS IST DIE
EINZIGE TRAGENDE SCHICHT".**
- INHALT: RLS urteilt über Zeilen, nicht über Spalten; welche Spalten die angemeldete Rolle
  schreiben darf, tragen ausdrücklich gesetzte Spaltenrechte; die Standard-Rechte schützen
  weiterhin nichts.
- VOLLZUG ERST BEIM ABSCHLUSS DER SCHEIBE — die Präzisierung beschreibt den Zustand nach der
  Migration. Bis dahin steht sie nur hier; docs/immer-beachten.md und
  docs/immer-beachten-herleitung.md sind nicht geändert.
- (CC) Beim Vollzug berührt: der offene Punkt "DIE GRANT-VORGABE DER PLATTFORM KIPPT AM
  30.10.2026" ("Die Regel 'GRANTS SCHÜTZEN NICHTS …' bleibt unverändert richtig").
- VOLLZOGEN 2026-10-01 im Abschluss-Commit der Scheibe: Kern (docs/immer-beachten.md) neu
  gefasst, Titel unverändert, samt der Folge für künftige Spalten; in
  docs/immer-beachten-herleitung.md eine datierte Neufassung an der Regel, der Text davor bleibt
  als Stand davor. Herleitung vorher vollständig geladen (CC, 2026-10-01). Vermerk P13.6-130,
  Punkt (10). Der offene Punkt in docs/offene-punkte.md ist NICHT geändert (ausserhalb des
  Scopes jenes Commits); sein zitierter Satz ist dem Wortlaut nach überholt — gemeldet im Bericht
  der Runde. NACHGEZOGEN 2026-10-01: der Satz ist dort ersetzt (Vermerk P13.6-130, Punkt (10)).

**Owner-Entscheidung P13.6-120 — PRÄZISIERUNG DER REGEL "MIGRATION IMMER VOR CODE-DEPLOY".**
- INHALT: Sie gilt für Migrationen, die der Code braucht. Eine Migration, die Rechte entzieht und
  alten Code bräche, folgt dem Code — erst Code deployen und prüfen, der ohne das Recht auskommt,
  dann die Migration.
- VOLLZOGEN IM SELBEN COMMIT an jedem Ort, der die Regel trägt: docs/db-regeln.md (die Regel samt
  Kopf "HERKUNFT UND UNVERSEHRTHEIT"), docs/arbeitsweise.md (Kadenz und 4b), docs/offene-punkte.md
  ("DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT"). Die Liste der geprüften und
  NICHT geänderten Fundstellen steht im Bericht der Runde; die tragenden Gründe: Titel-Zeiger
  (CLAUDE.md, docs/immer-beachten.md, "COMMIT-KONVENTIONEN"), eingefrorene oder datierte Texte
  (docs/claude-md-herleitung.md, docs/immer-beachten-herleitung.md, docs/db-stand.md, Archive),
  angewandte Migrationen (Dauerregel "ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH
  UMGESCHRIEBEN").

### Bau-Entscheidungen der Scheibe Spaltenrechte

PROVENIENZ von P13.6-123 und P13.6-124: OWNER-ENTSCHEIDUNG bzw. OWNER-ANGABE 2026-10-01,
übermittelt im Auftrag der Runde "Spaltenrechte — Bau" (Teil A). BINDEND. Wo "(CC)" steht, hat CC
die Angabe am Bestand bzw. am Code geprüft (HEAD `38f502f`), GELESEN AM CODE, nicht live gemessen.

**Owner-Entscheidung P13.6-123 — FEHLT DIE domains-ZEILE EINES VERÖFFENTLICHTEN PROJEKTS, VERGIBT
DER SERVER BEI DER WIEDERHERSTELLUNG EIN NEUES LABEL ÜBER DENSELBEN ERZEUGER WIE BEIM ERSTEN
VERÖFFENTLICHEN. `settings.hosting.label` IST NIE QUELLE EINES NEUEN LABELS.**
- GRUND (OWNER): Das alte Label stammt aus einem client-besessenen Blob; ein Angreifer könnte das
  Label eines gelöschten fremden Projekts übernehmen.
- PREIS (OWNER): In diesem Fall ändert sich die Adresse; sie war ohnehin tot.
- AM CODE GEPRÜFT (CC):
  · Der Heilungs-Zweig in `publishProject` (src/app/projects/actions.ts) liest das Label aus
    `settings.hosting.label` über `getHostingLabel` (src/lib/settings.ts, nur `trim`) und legt es
    über `insertDomainLabel` an, wenn das Projekt keine Label-Zeile hat (Vermerk P13.6-116,
    Punkt (2), NEBENBEFUND). `settings` schreibt der Client frei (`saveProject`).
  · `domains.project_id` trägt `on delete cascade` (0006_hosting): Wird ein Projekt gelöscht,
    wird sein Label frei. Der Grund trägt damit am Code.
  · "Derselbe Erzeuger wie beim ersten Veröffentlichen" ist `assignDomainLabel`
    (`slugForLabel` aus dem Projektnamen plus `randomLabelSuffix`, bis zu sechs Versuche bei
    23505).
  · "Sie war ohnehin tot": Ohne Zeile findet die Auslieferung das Label nicht (Dauerregel "DIE
    domains-ZEILE IST DIE ALLEINIGE WAHRHEIT …"). ABGELEITET (CC): Bis heute belebte die
    Wiederherstellung die ALTE Adresse wieder, sofern das Label frei war; laufende Anzeigen, die
    auf sie zeigen, bleiben künftig tot. Der Preis trifft genau sie.
  · ABGELEITET (CC): Dieselbe Entscheidung schliesst auch das Wunsch-Label (etwa ein Label ohne
    Endung oder eines, das eine Marke nachahmt) über den eigenen Heilungs-Zweig — Vermerk
    P13.6-116, Punkt (6). Über PostgREST mit eigener Sitzung bleibt ein Wunsch-Label bis zur
    Migration der Scheibe möglich (Policy `domains_insert_own`).
- DIE DAUERREGEL "DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT ÜBER "IST DIESES PROJEKT LIVE?""
  IST IM SELBEN COMMIT ANGEPASST: Kern (docs/immer-beachten.md) neu gefasst, Titel unverändert;
  in docs/immer-beachten-herleitung.md eine datierte Neufassung an der Regel, der Text davor
  bleibt als Stand davor. Herleitung vorher vollständig geladen (CC, 2026-10-01). ALT/NEU im
  Bericht der Runde.
- GEMELDET, NICHT ENTSCHIEDEN (CC, GELESEN AM CODE): Der Hinweis bei `restored` in
  src/components/PublishView.tsx lautet "— Adresse war nicht mehr erreichbar und wurde
  wiederhergestellt." Nach dieser Entscheidung ist die Adresse eine neue; der Satz behauptet
  dann etwas Falsches. Vorrat P13.6-127 der Phase 13.6.
  ENTSCHIEDEN UND UMGESETZT 2026-10-01: Owner-Entscheidung P13.6-128, Code-Commit `6f66c44`.
- UMGESETZT 2026-10-01: Code-Commit `6f66c44`; live belegt — Vermerk P13.6-130, Punkt (4).

**Owner-Angabe P13.6-124 — DAS LABEL-SCHEMA "SLUG AUS DEM PROJEKTNAMEN + ZUFÄLLIGE ENDUNG"
BLEIBT.**
- GRUND (OWNER): Nutzer finden ohne Wiederholungsversuche eine freie Adresse; ein Wettbewerber
  zwang zu vielen Versuchen.
- FOLGE (OWNER): Ein Label ohne Endung ist nicht mehr erzeugbar.
- AM CODE GEPRÜFT (CC): Labels erzeugen zwei Stellen, beide mit Endung — `assignDomainLabel`
  (src/app/projects/actions.ts, Slug aus dem Projektnamen) und `persistDomainRow`
  (src/lib/domains/register.ts, Slug aus dem Custom-Host, für Custom-Domain-Zeilen). Der dritte
  Weg, der Heilungs-Zweig, übernimmt heute einen beliebigen Wert aus `settings`.
- GRENZE DER FOLGE (CC, ABGELEITET): Über die App gilt sie ab dem Deploy des Baus dieser Scheibe;
  über PostgREST mit eigener Sitzung erst nach der Migration der Scheibe (bis dahin erlaubt
  `domains_insert_own` jedes Label auf ein eigenes Projekt); über den SQL-Editor (`postgres`)
  bleibt jedes Label erzeugbar.

PROVENIENZ von P13.6-125: ARCHITEKTEN-SETZUNG 2026-10-01, übermittelt im Auftrag der Runde
"Spaltenrechte — Bau" (Teil A). REVIDIERBAR; ein Owner-Widerspruch hebt jede auf. Wo "(CC)" steht,
stammt die Angabe von CC (GELESEN AM BESTAND bzw. AM CODE, HEAD `38f502f`).

**Setzung P13.6-125 — DIE BAUENTSCHEIDUNGEN DER SCHEIBE SPALTENRECHTE.**
- GESTALT (a) BLEIBT, TROTZ DES SUPABASE-RATS GEGEN SPALTENRECHTE (docs/plattform-befunde.md,
  Supabase, Teil (bi)). GRUND: Der Rat zielt auf das Verbergen beim LESEN; die Scheibe entzieht
  nur Schreibrechte, SELECT bleibt. Ein Trigger (Kandidat (b)) kann still versagen, (a) scheitert
  laut.
  (CC, am Wortlaut von Teil (bi)): Der Rat selbst nennt keinen Grund; die zwei Einschränkungen,
  die die Seite nennt, gelten `select *` bzw. einer Spalte ohne Recht. Ob `.select()` ohne
  Spaltenliste nach dem Entzug unverändert geht, bleibt eine Messung (Teil (bk), Punkt 4) und
  gehört in die Live-Regression. "(b) kann still versagen": Setzung P13.6-117, VERWORFEN (b).
- GRANTOR-BEFUND (Teil (be)): Die Messung VOR der Migration (Eigentümer, Grantor, FORCE ROW LEVEL
  SECURITY, PUBLIC, Mitgliedschaften) und DANACH (wirksame Rechte) sind Pflicht-Schritte. GRUND:
  Ein still wirkungsloser Entzug ist die gefährlichste Form des Scheiterns.
  (CC) Teil (be), Falle 1: "A user can only revoke privileges that were granted directly by that
  user." — ein `revoke` eines Nicht-Grantors entzieht nichts.
- `saveProject` LEGT DAS PROJEKT ÜBER DEN ADMIN-CLIENT AN, `user_id` ALLEIN AUS DER
  SERVER-GEPRÜFTEN SITZUNG — EIN EINZIGER, ATOMARER SCHREIBVORGANG. GRUND: Ein getrenntes
  Nachschreiben des Schlüssels könnte scheitern und brächte den Beacon-Fehler zurück (Vermerk
  P13.6-106).
- `projects`: INSERT für anon und authenticated ganz entziehen, `projects_insert_own` löschen;
  UPDATE nur auf die client-eigenen Spalten `name`, `html`, `mappings`, `settings`, `html_b`,
  `mappings_b`, `updated_at`; DELETE und SELECT unverändert.
  (CC, gegen S1 und die echten Update-Rümpfe geprüft): Die sieben Spalten sind die
  client-eigenen aus Vermerk P13.6-116, Punkt (1), dazu `updated_at` (Teil (bf): der Code sendet
  es in jedem `.update(…)` auf `projects`). Die Update-Rümpfe, die über die Nutzer-Sitzung
  bleiben: `saveProject` (Update-Zweig) `html`, `mappings`, `settings`, `updated_at` ·
  `saveVariantB` `html_b`, `mappings_b`, `settings`, `updated_at` · `createVariantB` `html_b`,
  `mappings_b`, `updated_at` · `removeCapiToken` `settings`, `updated_at` · `renameProject`
  `name`. Jeder liegt in der Liste. Ausserhalb von src/app/projects/actions.ts schreibt kein Code
  `projects` über die Nutzer-Sitzung (GEMESSEN AM REPO: Suche `.from("projects")` über src/
  ausserhalb der Tests; die übrigen Treffer lesen). Die Rümpfe mit server-eigenen Spalten —
  `publishProject`, `setCapiToken`, `setAbTestActive`, `removeVariantB` — ziehen auf den
  Admin-Client.
- `domains` UND `project_tokens`: INSERT, UPDATE, DELETE für anon und authenticated entziehen,
  ihre Schreib-Policies löschen; SELECT unverändert.
  (CC) Die Schreib-Policies sind `domains_insert_own`, `domains_update_own` (0006_hosting),
  `project_tokens_insert_own`, `project_tokens_update_own` (0005_project_tokens); eine
  DELETE-Policy trägt keine der beiden Tabellen.
- VORRAT (Phase 13.7): gelöschte Labels dauerhaft sperren (Grabstein-Modell) — Vorrat P13.6-126
  der Phase 13.6.
- UMGESETZT 2026-10-01: Code-Commit `6f66c44`, Migration 0031. Der Grantor-Befund vor dem
  Einspielen ist erhoben und hat keine Stopp-Bedingung getroffen — Vermerk P13.6-130, Punkt (2).

PROVENIENZ von P13.6-128: OWNER-ENTSCHEIDUNG 2026-10-01, übermittelt im GO-Auftrag der Runde
"Spaltenrechte — Code-Teil" (Teil A). BINDEND.

**Owner-Entscheidung P13.6-128 — DER HINWEIS BEI `restored` LAUTET: "Die bisherige Adresse war
nicht mehr erreichbar. Deine Seite ist jetzt unter einer neuen Adresse veröffentlicht. Bitte
aktualisiere Links und Anzeigen."**
- ENTSCHEIDET Vorrat P13.6-127 der Phase 13.6.
- GRUND (OWNER): Der alte Text ("wiederhergestellt") liesse den Betreiber glauben, alte Links und
  Anzeigen funktionierten noch — stiller Verlust von Anzeigen-Verkehr.
- ORT (CC, GELESEN AM CODE, HEAD `a32592f`): der Zusatz in der Statuszeile von
  src/components/PublishView.tsx, sichtbar bei `publishStatus === "published"` und
  `publishRestored`. `PublishView.tsx` hat keine eigene Testdatei; seine Abdeckung liegt in
  src/components/CodeImporter.test.tsx.
- BEZUG: Owner-Entscheidung P13.6-123 (das neue Label) — der Hinweis benennt jetzt deren Preis.
- UMGESETZT 2026-10-01: Code-Commit `6f66c44`; Wächter RH-1 und RH-2
  (src/components/CodeImporter.test.tsx); live gesehen im Owner-Wortlaut — Vermerk P13.6-130,
  Punkt (4).

### Abschluss der Scheibe Spaltenrechte

**Vermerk P13.6-130 — ABSCHLUSS DER SCHEIBE "SPALTENRECHTE". Code-Commit `6f66c44`**
("fix(security): server-eigene Spalten nur noch ueber den Server schreiben"), Migration 0031
eingespielt. LIVE-TEST BESTANDEN, nur Chrome.
Doku-Commits der Scheibe: `498fd97` (Zuschnitt) · `a12c39a` (Plan, Gestalt (a), Regel
Migrationsreihenfolge) · `38f502f` (Anbieter-Lesung, docs/plattform-befunde.md, Supabase-Abschnitt,
LAUF 5, Teile (bd) bis (bk)) · `a32592f` (Label-Wiederherstellung, Bau-Entscheidungen) · `59a3435`
(Hinweistext, Vorrat Vorgabe-Rechte) · dieser Commit (Abschluss).

(0) PROVENIENZ DER PUNKTE (1) BIS (4): GEMESSEN, OWNER, 2026-10-01, im SQL-Editor bzw. live in
    Chrome (Version nicht angegeben), übermittelt im Auftrag der Abschluss-Runde als
    Zusammenfassung, nicht im Wortlaut. Instrumente: die Probe supabase/checks/spaltenrechte.sql
    (Abfragen (1) bis (10)) und der Konsolen-Block aus dem Bau-Bericht der Scheibe — PATCH über
    PostgREST mit der Sitzung aus dem Cookie, je mit dem heutigen Wert: P `name`, S `blocked_at`,
    K `tracking_key`, D `domains.label`, alle mit Sitzung; N `blocked_at` OHNE Sitzung; L Lesen
    ohne Spaltenliste; Gegenlesung von Name, `blocked_at` und Schlüssel. Der Block steht in
    keiner Datei des Repos. Projekt-Kennungen und Schlüssel stehen bewusst nicht in dieser Datei;
    das Wegwerf-Projekt der Schnittstellen-Läufe ist `578a0edd…`.
    DURCHGÄNGE: D1 alter Code, alte Rechte · D2 neuer Code (`6f66c44`), alte Rechte · M1 bis M4
    nach dem Einspielen von 0031.

(1) DIE SCHNITTSTELLE (PostgREST, echte Sitzung):
    · D1: P, S, K, D je 200, 1 Zeile · N 200, 0 Zeilen · L 200, 1 Zeile · Gegenlesung true.
      S ist der ERSTE PostgREST-Beleg zu Vermerk P13.6-112: Der eigene Betreiber konnte
      `blocked_at` schreiben. Geschrieben wurde der heutige Wert (null) — belegt ist die Annahme,
      kein Entsperren.
    · D2: wie D1. Der PostgREST-Weg blieb bis zur Migration offen; das ist die Reihenfolge der
      Owner-Entscheidung P13.6-120.
    · M3: P 200, 1 Zeile · S, K, D je 403, Code `42501` · N 401, `42501` · L 200, 1 Zeile ·
      Gegenlesung true.
    · EINORDNUNG (CC): P ist die Positivkontrolle — die Sitzung trägt, und eine gewährte Spalte
      bleibt schreibbar; ohne P wäre das 403 bei S von einer kaputten Sitzung nicht zu trennen. N
      antwortet nach 0031 anders als vorher (401 statt 200 mit 0 Zeilen): anon hat kein UPDATE
      mehr auf `projects`. L beantwortet docs/plattform-befunde.md, Supabase, Teil (bk), Punkt 4:
      Lesen ohne Spaltenliste geht nach dem Entzug unverändert. Punkt 3 jenes Teils
      (PostgREST nimmt allein die Rumpf-Schlüssel ins SET) stützt P nach 0031 — mit einer nicht
      gewährten Spalte im SET wäre P gescheitert (ABGELEITET, CC).

(2) DIE RECHTE VOR 0031 (D1, Probe): (1) `current_user` und `session_user` `postgres` · (2)
    Eigentümer der drei Tabellen `postgres`, rolsuper false, rolbypassrls true; relrowsecurity
    true, relforcerowsecurity false, je auf allen drei Tabellen · (3) relacl je Tabelle
    `postgres`, `anon`, `authenticated`, `service_role` je `arwdDxtm`, Grantor überall `postgres`,
    kein PUBLIC · (4) keine Spalten-ACL · (7) keine Mitgliedschaften · (9) neun Policies · (10)
    keine Zeile 0031. Nicht übermittelt: (5), (6), (8).
    · DER GRANTOR-BEFUND (Setzung P13.6-125): Grantor gleich `current_user`, kein PUBLIC, keine
      Mitgliedschaft — keine Stopp-Bedingung der Probe getroffen; 0031 durfte eingespielt werden.
    · NEBENBEFUND: `postgres` ist in diesem Projekt KEIN Superuser und trägt bypassrls. Damit sind
      Teil (bk), Punkte 1 und 5, in docs/plattform-befunde.md gemessen; jene Datei ist in diesem
      Commit nicht nachgezogen. NACHGEZOGEN 2026-10-01: docs/plattform-befunde.md, Supabase,
      Teil (bl) (Punkt (10)).

(3) DIE RECHTE NACH 0031: M1 — 0031 im SQL-Editor eingespielt, "Success", applied_at
    2026-10-01 12:55:40.274618+00. M2 (Probe): (3) anon und authenticated auf `domains` und
    `project_tokens` je `rDxtm`, auf `projects` `rdDxtm`; service_role unverändert `arwdDxtm` ·
    (4) authenticated UPDATE auf `name`, `html`, `mappings`, `updated_at`, `settings`, `html_b`,
    `mappings_b` · (9) vier Policies: `domains_select_own`, `projects_delete_own`,
    `projects_select_own`, `projects_update_own` · (10) eine Zeile 0031. Nicht übermittelt: (1),
    (2), (5) bis (8).
    · GEGEN DEN BLOCK "NACH DER MIGRATION" der Probe gehalten (CC): (3), (4), (9) und (10) treffen
      ihn. `project_tokens` trägt NULL Policies.
    · KÜRZEL (GELESEN 2026-10-01, CC, postgresql.org/docs/17/ddl-priv.html, Tabelle 5.1): `a`
      INSERT, `r` SELECT, `w` UPDATE, `d` DELETE, `D` TRUNCATE, `x` REFERENCES, `t` TRIGGER, `m`
      MAINTAIN.

(4) REGRESSION UND AUSGELIEFERTER TEXT:
    · Zwei Seiten, je Länge und sha256: die Make-Testseite 20007 / `e283fa67…1500`, die zweite
      30493 / `40c83cb3…37e5` — in D1, D2 und M4 je identisch. Die Einheit ist im Auftrag nicht
      genannt (die Anleitung verlangte Bytes); ob vor jeder Messung neu veröffentlicht wurde, ist
      nicht angegeben. Invariante (4) der Setzung P13.6-115 ist damit live belegt.
    · D2: ein neues Projekt — `gleicher_besitzer` true, Schlüssel gesetzt (so übermittelt; die
      Abfrage selbst ist nicht übermittelt) · Umbenennen, A/B (anlegen, veröffentlichen,
      starten, stoppen, entfernen), Zugangsdaten (setzen, entfernen) ohne Fehler · HEILUNG:
      Label-Zeile gelöscht, alte Adresse 404, Veröffentlichen ergab das neue Label
      `test-beacon-fehler-neu-qcgqmi` und den Hinweis im Owner-Wortlaut (Owner-Entscheidungen
      P13.6-123 und P13.6-128) · Kill-Switch per SQL: Sperrseite "Seite deaktiviert …",
      entsperrt lädt die Seite.
    · M4: Anlegen und Speichern, A/B, Zugangsdaten, Kill-Switch ohne Fehler.

(5) BAU (CC, aus dem Bau- und dem GO-Bericht der Scheibe):
    · Geändert, neun Dateien (`git show --stat 6f66c44`): src/app/projects/actions.ts — die
      Schreibvorgänge auf server-eigene Spalten (Insert in `saveProject`, `publishProject`,
      `setCapiToken`, `setAbTestActive`, `removeVariantB`, `assignDomainLabel`) über den
      Admin-Client nach dem Eigentums-Gate, mit `id`- und `user_id`-Filter und lautem Fehler,
      wenn keine Zeile getroffen ist; `insertDomainLabel` gestrichen, die Heilung vergibt ein
      neues Label über `assignDomainLabel` · src/components/PublishView.tsx — der Hinweis bei
      `restored` · supabase/migrations/0031_spaltenrechte.sql · supabase/checks/spaltenrechte.sql
      samt README-Zeile · die Tests in actions.test.ts, actions.targets.test.ts, publish.test.ts
      und CodeImporter.test.tsx.
    · Unberührt: generate.ts, meta.ts, form-target.ts, pageview-emitter.ts, ingest.ts, `/api/e`,
      `/api/capi`, `/api/f`, src/lib/relay/, die Serve-Route, proxy, alle älteren Migrationen.
    · Gates: `tsc --noEmit` exit 0; `eslint` 0 Fehler, die bekannte Warnung in
      src/lib/tracking/consent.test.ts; `vitest run` 2797 Tests (vor der Scheibe 2776, nach dem
      ersten Bau-Teil 2795); `next build` exit 0.
    · Mutationen, volle Suite, Vorhersage je vor dem Lauf, Rücknahme per sha256 belegt, ALLE WIE
      VORHERGESAGT: M1 (`user_id`-Filter an allen vier Admin-Updates entfernt) 5 rot — SR-P1,
      SR-A3 dreimal, SR-A4 · M2 (Admin-Client vor dem Gate in `publishProject`) 6 — 7a, P3, P3b,
      P5, SR-P3, SR-P4 · M2b (dasselbe in `setAbTestActive`) 1 — SR-A2 · M3 (`user_id` des
      Inserts aus dem Eingabewert) 1 — SR-A1 · M4 (Heilung aus `settings.hosting.label`) 2 —
      TEST 2, TEST 3 · M5 (`blocked_at` in der GRANT-Liste) 1 — MIG-1 · M6 (SELECT-Entzug in der
      Migration) 2 — MIG-2, MIG-3 · RH-M1 (der alte Hinweistext) 1 — RH-1.

(6) NACHWEISE JE INVARIANTE DER SETZUNG P13.6-115:
    · Gegenstand (keine Rolle ausser dem Server schreibt eine server-eigene Spalte): live M3 (S,
      K, D je 403/`42501`); Probe M2 (3) und (4); Tests MIG-1 bis MIG-5 über den Migrationstext.
    · (1) Speichern, Veröffentlichen, A/B, Kill-Switch, Zugangsdaten, Domains funktionieren:
      live D2 und M4; SR-A1 bis SR-A6, SR-P1 bis SR-P5. Der Domain-Status ist in M4 NICHT
      gemeldet.
    · (2) RLS bleibt aktiv, keine Policy gelockert: gelöscht sind allein Schreib-Policies (M2
      (9)); relrowsecurity ist VOR 0031 gemessen (D1 (2)), danach nicht übermittelt.
    · (3) `/api/e`, `/api/f`, Ingest, Relay, Serve-Route unberührt: der Scope des Code-Commits,
      Punkt (5); kein eigener Test.
    · (4) Kein ausgelieferter Text ändert sich: Punkt (4), erster Unterpunkt.
    · (5) Code vor Migration: D2 (neuer Code, alte Rechte) lief vor M1. Ein Deploy-Zeitstempel ist
      nicht übermittelt; die Reihenfolge folgt aus der Folge der Durchgänge (OWNER-ANGABE).

(7) ABWEICHUNGEN, im Bau deklariert und hier nur benannt: die Klammer `begin`/`commit` und der
    Prüfblock am Ende von 0031 · das Spalten-UPDATE allein an authenticated · `publishProject`
    erzeugt den Admin-Client lazy nach dem Gate · actions.targets.test.ts berührt · ein
    abgebrochener Heredoc-Anhang ohne Schreibwirkung, danach `cat >>` aus dem Scratchpad, Byte-
    Kontrolle ohne Befund.

(8) GRENZEN, als Grenzen benannt:
    · TRUNCATE, REFERENCES, TRIGGER und MAINTAIN bleiben für anon und authenticated auf allen drei
      Tabellen (GEMESSEN, M2 (3)). Dass sie über PostgREST nicht auslösbar sind, ist ANGABE DES
      AUFTRAGS; der Bestand trägt dazu allein einen Nicht-Treffer mit benannter Reichweite (Vorrat
      P13.6-129, ergänzt in diesem Commit).
    · Der Kill-Switch wirkt je Projekt; ein gesperrter Betreiber umgeht ihn mit einem neu
      angelegten Projekt (Vorrat P13.6-121).
    · Gelöschte Labels sind wieder vergebbar; das Grabstein-Modell ist offen (Vorrat P13.6-126).
    · Nur Chrome.
    · Nicht übermittelt: Abfrage (8) der Probe in beiden Läufen; die Vercel-Logs auf `42501` (M5
      des Live-Entwurfs); der Domain-Status in M4.
    · Die Lücke war vom 2026-10-01 bis zum Einspielen von 0031 über PostgREST offen, wie seit
      jeher; ob sie je genutzt wurde, ist nicht erhoben. Heute benutzt niemand ausser dem Owner
      das Produkt (CLAUDE.md, "## Modus").

(9) VERDICHTUNG DES ZUSCHNITTS (dieser Commit). GESTRICHEN — mit der Scheibe abgelaufen: im Kopf
    der Satz "ZUGESCHNITTEN AM 2026-10-01 (ARCHITEKT); DER PLAN FOLGT IM BERICHT DERSELBEN RUNDE,
    NICHT IN DIESER DATEI." samt seinen drei Nachträgen vom selben Tag — ersetzt durch die
    Abschluss-Zeile. Worauf die Nachträge zeigten, steht unverändert: der Plan als Vermerk
    P13.6-116, die Gestalt als Setzung P13.6-117, die Anbieter-Lesung in docs/plattform-befunde.md
    (Supabase, LAUF 5, Teile (bd) bis (bk); Doku-Commit `38f502f`), die Bau-Entscheidungen als
    P13.6-123, P13.6-124 und P13.6-125. Sonst ist nichts abgelaufen: Die übrigen Anweisungen des
    Zuschnitts sind Teile bindender Einträge und tragen einen Nachtrag statt einer Streichung.
    STEHEN GEBLIEBEN: Setzung P13.6-115, Vermerk P13.6-116, Setzung P13.6-117, Vermerk P13.6-118,
    Owner-Entscheidungen P13.6-119, P13.6-120, P13.6-123, Owner-Angabe P13.6-124, Setzung
    P13.6-125, Owner-Entscheidung P13.6-128. BINDEND bleiben P13.6-115, P13.6-117, P13.6-119,
    P13.6-120, P13.6-123, P13.6-124, P13.6-125 und P13.6-128.
    BEWUSST NICHT FESTGEHALTEN: der Ablauf der Live-Durchgänge über das in Punkt (0) bis (4)
    Verdichtete hinaus — an ihm hängt keine spätere Handlung.

(10) NACHGEZOGEN IN DIESEM COMMIT: Setzung P13.6-14 (Reihenfolge); Setzungen P13.6-115, P13.6-117,
    P13.6-125, Owner-Entscheidungen P13.6-119 (vollzogen), P13.6-123, P13.6-128 (umgesetzt);
    Vermerke P13.6-112, P13.6-116, P13.6-118; Arbeit P13.6-113 (erledigt); Vorrat P13.6-127
    (erledigt), Vorrat P13.6-129 (MAINTAIN und die Messung). Ausserhalb dieser Datei: die
    Dauerregel "GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT" (Kern und
    Herleitung, Owner-Entscheidung P13.6-119); in der Herleitung der geprüfte Beleg der Dauerregel
    "APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI" und die Auflösung des gemeldeten Punktes an "DIE
    domains-ZEILE IST DIE ALLEINIGE WAHRHEIT …"; der Kill-Switch in beiden Fassungen des
    Sicherheits-Manifests (der Zusatz vom 2026-10-01 ist durch die Sachkorrektur "Lücke
    geschlossen" ersetzt); docs/db-stand.md (Migrationsstand, Policies, Rollen-Grants,
    Spaltenrechte). NICHT geändert, gemeldet im Bericht der Runde: docs/plattform-befunde.md,
    Teil (bk); docs/offene-punkte.md, "DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026" und
    "DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT"; die Roadmap-Zeile 13.6.
    NACHGEZOGEN 2026-10-01 (Doku-Runde "Meldungen aus dem Abschluss Spaltenrechte"; CC):
    · Teil (bk): Die Provenienz der Punkte 1, 3, 4 und 5 steht in docs/plattform-befunde.md,
      Supabase-Abschnitt, neuer Teil (bl); (bk) selbst ist unverändert, Punkt 2 bleibt offen.
    · "DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026": Der überholte Satz über die Regel
      ist in docs/offene-punkte.md am Eintrag dieses Titels ersetzt; Titel und Trigger
      unverändert.
    · "DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT": Der Vollzug von 0031 und die
      offen bleibenden Fälle stehen in docs/offene-punkte.md an der Ergänzung vom 2026-10-01
      jenes Eintrags; der Punkt bleibt offen.
    · Eine vierte Meldung jener Runde stand hier nicht: der Beleg "publishProject instanziiert
      keinen service_role-Client" — richtiggestellt in
      docs/claude-history/security-manifest-full.md, Item "VERCEL-TOKEN maximal scoped +
      Domain-Mutations-AUDIT-LOG", und in docs/offene-punkte.md, "LABEL-VERGABE IST
      UNPROTOKOLLIERT".
    · Die Roadmap-Zeile 13.6 lag nicht im Auftrag jener Runde und ist nicht geändert.

## Plattform-Schritte der Phase 13.6

**Vermerk P13.6-47 — `NEXT_PUBLIC_APP_URL` KORRIGIERT; EXPORTE ERREICHEN DEN INGEST** (2026-09-29).
KEIN CODE-COMMIT: Der Schritt ist ein reiner Plattform-Schritt — eine Umgebungsvariable in
Vercel und ein Redeploy; im Repo ändert sich keine Zeile. Er schliesst Vorrat P13.6-12 der Phase
13.6 und folgt der Reihenfolge aus Setzung P13.6-14.

(1) DER SCHRITT — OWNER-ANGABE, 2026-09-29:
    · `NEXT_PUBLIC_APP_URL` in Vercel auf die Adresse der Produktions-App gesetzt:
      `https://pagesmith-delta.vercel.app` (abgelesen an der Adresszeile des Owners).
    · Redeploy ohne Build-Cache, Status "Ready" (Dauerregel "NEXT_PUBLIC_-REDEPLOY-PFLICHT").
    · NICHT ANGEGEBEN: welche Umgebungen (Production, Preview, Development) die Variable nun
      trägt. Die an Setzung P13.6-14 offene Frage nach dem Preview-Scope ist damit nicht
      beantwortet.

(2) GEMESSEN, OWNER, live, 2026-09-29:
    · Ein neuer Export trägt `navigator.sendBeacon("https://pagesmith-delta.vercel.app/api/e", …)`.
    · Die lokal geöffnete Exportdatei sendet beim Track-Klick an
      `https://pagesmith-delta.vercel.app/api/e`, Status 204, `event` "Lead", `eventID`
      `4b44778e-a793-41d2-a151-1f986b41e073`; dazu eine Bestätigung mit derselben `eventID` und
      `obs` "__ps_browser".
    · Supabase-SQL-Editor, Abfrage auf `events` nach dieser `event_id`: zwei Zeilen,
      `event_type` "Lead", einmal `source` "browser", einmal `source` "server".
    · Tracking-Schlüssel steht bewusst nicht in dieser Datei.

(3) GRENZEN:
    · Der Ursprung war eine lokale Datei (`file://`), kein fremder Host.
    · Die 204 belegt nichts über den Kill-Switch oder die Gültigkeit des Schlüssels (Dauerregel
      "INGEST-204-CONTAINMENT"); belegt hat die Annahme erst die `events`-Zeile `server`.
    · Ein Forward an ein Ziel ist nicht gemessen.
    · Früher exportierte Dateien tragen weiter `http://localhost:3000/api/e` und sind nur durch
      einen Neu-Export zu heilen (Dauerregel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM
      DEPLOY").

(4) ABGELEITET, NICHT GEMESSEN: `ownFormTargetDomains` (src/lib/form-target.ts) liest den Host
    von `NEXT_PUBLIC_APP_URL` und führt nach dem Redeploy `pagesmith-delta.vercel.app`. Die
    Sperre ändert das nicht: `vercel.app` steht dort seit Bau-Commit `9fae014` fest in der Liste
    (Setzung P13.6-36, F4).

**Vermerk P13.6-53 — DIE FUNKTIONSREGION IST AUF FRANKFURT (`fra1`) UMGESTELLT** (2026-09-29).
KEIN CODE-COMMIT: Der Schritt ist ein reiner Plattform-Schritt — eine Einstellung im
Vercel-Projekt und ein Redeploy; im Repo ändert sich keine Zeile. Er setzt Setzung P13.6-52 um.

(0) PROVENIENZ DER PUNKTE (1) BIS (3): GEMESSEN, OWNER, live, 2026-09-29, Vercel-Dashboard "Logs",
    übermittelt im Auftrag der Runde "Region festhalten, Owner-Entscheidungen Relay, Zuschnitt
    13.6-3".

(1) DIE MESSANFRAGE: aus der Konsole der App, dreimal `POST /api/e` mit einem NICHT
    EXISTIERENDEN Tracking-Schlüssel; Antwort je 204.
    ABGLEICH MIT DEM CODE (CC, GELESEN AM CODE am Stand `33ff5cc`): `handleIngest`
    (src/lib/capi/ingest.ts) ruft `getCapiConfigByTrackingKey` (src/lib/capi/token.ts); der
    Resolver macht GENAU EINE Abfrage (`projects` über `tracking_key`), findet keine Zeile und
    liefert null; `handleIngest` antwortet dann mit 204, VOR Persist und Forward. Die Angabe
    "ein Datenbank-Umlauf, kein Persist, kein Forward" trägt damit für den Funktions-Code.
    NICHT darin enthalten: Auf dem App-Host läuft vorher `updateSession`
    (src/lib/supabase/middleware.ts); mit Sitzungs-Cookie macht die Middleware eine Anfrage an
    den Supabase-Host (docs/plattform-befunde.md, Vercel, Teil (s)). Ob sie in die gemeldete
    Ausführungszeit fällt, ist nicht erhoben.

(2) VORHER UND NACHHER:
    · Vorher: je "Routed to Washington, D.C., USA (iad1)"; Ausführung 315 / 131 / 780 ms.
    · Umstellung auf Frankfurt (`fra1`) in den Projekt-Einstellungen, Redeploy, Status "Ready".
    · Nachher: keine "Routed"-Zeile mehr, "Received in Frankfurt, Germany (fra1)"; Ausführung
      45 / 69 / 557 ms.
    · GERECHNET (CC), NICHT GEMESSEN: Median vorher 315 ms, nachher 69 ms (je n = 3).

(3) REGRESSION: Die App und eine gehostete Seite laden normal; die Anmeldung bleibt bestehen.

(4) BELEGT DAMIT AUCH: Der Hobby-Tarif lässt die Wahl der Region zu — die GRENZE an Setzung
    P13.6-52 ist beantwortet.

(5) UNGEKLÄRT, NICHT UNTERSUCHT: Die dritte Anfrage war in beiden Läufen langsam (780 bzw.
    557 ms). Kein Verhalten hängt daran.

(6) GRENZEN: drei Anfragen je Lauf, eine Anfrageform (Abweisung eines unbekannten Schlüssels),
    Dashboard-Angaben; keine Aussage über den Weg mit Persist und Forward oder über die
    Serve-Route. Ob Daten europäischer Besucher damit nur in der EU verarbeitet werden, ist nicht
    gemessen — Empfang und Ausführung liegen in `fra1`, über die Plattform im Übrigen sagt die
    Messung nichts.

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
- ERLEDIGT 2026-09-29: Lesung (CC, 19 Seiten) und Sonde im Dashboard (Owner) stehen in
  docs/plattform-befunde.md, Vercel-Abschnitt, Teile (i) bis (q) (Lesung) und (r) bis (t)
  (Sonde); die Region des Supabase-Projekts im Supabase-Abschnitt, Teil (au). Die Bauregeln
  daraus: Setzungen P13.6-48 bis P13.6-51 der Phase 13.6; die Region: Setzung P13.6-52.
  OFFEN BLEIBT: ob Vercel Rümpfe intern ablegt (Setzung P13.6-51).

**Arbeit P13.6-27 — DIE HOST-LISTE DER WEBHOOK-DIENSTE (RECHERCHE)** (ARCHITEKT 2026-09-29).
Grundlage der Stufe 1 (Owner-Entscheidung P13.6-17). BEZUG: docs/formular-empfaenger-befunde.md
— Make ist dort gelesen und gemessen, Zapier nicht. Neue Befunde gehen in jene Datei (Dauerregel
"EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN …").
- BEZUG 2026-09-29: Owner-Entscheidung P13.6-55 der Phase 13.6 legt die Dienste der Stufe 1
  fest (Make und Zapier) und die Bedingung für die Aufnahme (gelesen und einmal live getestet).
  Offen bleiben Zapier ganz und für Make die Hosts der Zonen ausser eu2.
- ZAPIER GELESEN 2026-09-30 (CC): docs/formular-empfaenger-befunde.md, Abschnitt "Zapier",
  Befunde (a) bis (p), Katalog-Abgleich, Messkandidaten ZM1 bis ZM7. Live-Test und Aufnahme in die
  Host-Liste gebündelt vor dem Launch — Owner-Entscheidung P13.6-90 der Phase 13.6. Offen bleiben
  damit der Zapier-Live-Test und für Make die Hosts der Zonen ausser eu2.
- REVIDIERT 2026-09-30: Live-Test und Aufnahme jetzt — Owner-Entscheidung P13.6-97 der Phase
  13.6. Der Satz über "gebündelt vor dem Launch" darüber beschreibt den Stand davor.
- FÜR ZAPIER ERLEDIGT 2026-10-01: live getestet und aufgenommen (Vermerke P13.6-102 und P13.6-103
  der Phase 13.6). Offen bleiben die Hosts der Make-Zonen ausser eu2.

**Arbeit P13.6-72 — SCHEIBE "ZURÜCK-CACHE": DAS FORMULAR IST NACH DER RÜCKKEHR WIEDER
ABSENDBAR** (ARCHITEKT 2026-09-30, übermittelt im Auftrag der Abschluss-Runde der Scheibe
13.6-4). Setzt Owner-Entscheidung P13.6-71 um; Befund dort. Reihenfolge: Setzung P13.6-14. DIE
WAHL DER GESTALT TRIFFT DER PLAN JENER SCHEIBE.
- KANDIDATEN aus der Aufklärung vom 2026-09-30 (CC, ABGELEITET; keine Wahl):
  · K1 — die Sperre bei Erfolg vor der Navigation lösen. `submittedForms` bleibt, P13-26 damit
    wörtlich erhalten. PREIS: Zwischen Antwort und Seitenwechsel öffnet sich ein Fenster, in dem
    ein zweiter Klick erneut sendet; heute schützt die Sperre auch dort (Phase 13, Live-Schritt
    L6 "Doppelklick: genau ein Eingang").
  · K2 — ein `pageshow`-Handler leert bei `persisted` die Sperre. Das Fenster aus K1 bleibt zu.
    OFFEN: ob `submittedForms` mitgeleert wird — nach Owner-Entscheidung P13.6-71 NICHT (kein
    zweiter Track). Die Felder tragen nach der Rückkehr noch ihre Werte. Der Baustein stünde neu
    im ausgelieferten Text (Dauerregel "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE
    EINBAHNSTRASSE …").
  · K3 — die Seite vom Zurück-Cache ausschliessen (etwa über Cache-Köpfe der Serve-Route):
    trifft jede gehostete Seite, andere Schicht, nicht gelesen.
  · K4 — Status quo plus Betreiber-Dokumentation. Steht nach Owner-Entscheidung P13.6-71 nicht
    mehr zur Wahl; hier nur, damit die Liste vollständig ist.
- MESSANLEITUNG (Vorlage, CC, 2026-09-30):
  · VORBEDINGUNGEN: A/B aus; sha256 des Live-Stands notieren; Chrome-Version; DevTools mit
    "Preserve log", Zustand von "Disable cache" notieren (seine Wirkung auf den Zurück-Cache
    ist ungeprüft); DANKE-SEITE AUF EINE AUFLÖSBARE ADRESSE setzen und neu veröffentlichen —
    `testdankeseite.irgendwas` löst nicht auf (Vermerk P13.6-70, Punkt (10)), sonst misst man
    den Fehlerseiten-Fall; Make-Eingänge zählen.
  · M1 — DevTools → Application → Back/forward cache → "Test back/forward cache": Urteil und
    Gründe.
  · M2 — der Diskriminator: in der Konsole `window.__probe = 'P1'` und ein
    `pageshow`-Listener, der `e.persisted` ausgibt. Positivkontrolle: vorher `'P1'`, nach F5
    `undefined`. Dann dreimal: Absenden → Danke-Seite → Zurück; je Runde `window.__probe`
    (`'P1'` = aus dem Zurück-Cache, `undefined` = frisch geladen), die `pageshow`-Zeile, ob ein
    Klick eine Anfrage an `/api/f` erzeugt, Make-Eingänge. Vorhersage: ein stummer Klick genau
    in den Runden mit `'P1'`.
  · M3 — dasselbe im Datensparmodus (Anfrage an `hook.eu2.make.com`); Vorhersage: dasselbe
    Muster.
  · M4 (optional) — M2 einmal mit einer per Adresszeile geöffneten Seite, einmal aus dem Editor
    heraus geöffnet (Kandidat Opener-Beziehung).
- UNGEKLÄRT, NICHT GEMESSEN: warum in L1 der zweite Versuch noch ging. Kandidaten (ABGELEITET,
  Chrome-Doku NICHT gelesen): ein offener Aufruf zur Zeit der Navigation (Beacon des
  Seitenaufrufs, `fbevents.js`), eine Opener-Beziehung. Der eigene Relay- bzw. Direkt-Aufruf ist
  zur Navigationszeit abgeschlossen — navigiert wird erst im `then` (GELESEN AM CODE).
- NEBENWIRKUNG, ABGELEITET: Nach einer Wiederherstellung aus dem Zurück-Cache feuert auch kein
  neuer Seitenaufruf (`if (window.__ps_pv) return;` im Emitter).
- VOR DEM ERSTEN FREMDEN NUTZER (Setzung P13.6-14).
- GEMESSEN UND ZUGESCHNITTEN 2026-09-30: die Messung in Vermerk P13.6-85, die Gestalt K2 in
  Setzung P13.6-86 (Abschnitt "Zuschnitt Scheibe Zurück-Cache"). Die MESSANLEITUNG darüber ist
  gefahren; welcher Diskriminator für spätere Live-Tests gilt, steht in Vermerk P13.6-85,
  Punkt (8).
- ERLEDIGT 2026-09-30: gebaut (Bau-Commit `29d0d22`), Live-Test bestanden (nur Chrome) —
  Abschluss-Vermerk P13.6-89 der Phase 13.6. Die Sätze darüber beschreiben den Stand davor.

**Arbeit P13.6-91 — AUFKLÄRUNG "ADRESSE VERBERGEN": WAS ES KOSTET, DIE EMPFÄNGER-ADRESSE IM
RELAY-WEG AUS DEM AUSGELIEFERTEN TEXT ZU NEHMEN** (OWNER-AUFTRAG 2026-09-30). KEINE
BAU-ENTSCHEIDUNG. Die Aufklärung selbst ist read-only (Auftrag); was sie ergibt, trägt eine
spätere Runde hier ein.
- ANLASS: Zapier nennt die Adresse ein Geheimnis — "Treat it as a password or any other
  secret!" (docs/formular-empfaenger-befunde.md, Abschnitt "Zapier", Befund (c)); ein
  Schutzmittel für Catch Hook beschreibt dort keine gelesene Seite (ebenda).
- WO SIE HEUTE STEHT: im `action`-Attribut eines Formulars mit Ziel, auch im Relay-Weg
  (Setzungen P13.6-32 und P13.6-64).
  ERGÄNZT (CC, GELESEN AM CODE, HEAD `6f00872`): ebenso im Datenblock des Skripts, AUCH IM
  RELAY-WEG. `generateFunctional` (src/lib/generate.ts) entfernt aus der Konfiguration nur
  `fieldNames`, `dataSaver` und einen Schlüssel `relay` aus der Datenbank; `endpoint` bleibt. Die
  Laufzeit-Wache in `__psFormTargetSend` (Text aus `buildFormTargetRuntime`,
  src/lib/form-target.ts) liest `cfg.endpoint` VOR dem Relay-Zweig. Live verträglich damit:
  Vermerk P13.6-70, Punkt (7) — die Datensparmodus-Seite ist die Relay-Seite ohne die zwei
  Einsetzungen. ABWEICHUNG, GEMELDET: Befund (c) nennt den Datenblock nur für den
  Datensparmodus, der Auftrag nur das `action`-Attribut.
- DIE FOLGE, DIE DER AUFTRAG NENNT: Setzung P13.6-75, E8 — "ein Angreifer kann Make ohne uns
  fluten"; der Aussperr-Hebel ist deshalb bewusst hingenommen.
- GEGENPOSITION: Setzung P13-6 der Phase 13 ("DIE EINGETRAGENE ADRESSE IST KEIN GEHEIMNIS …";
  ihre GRENZE: "Die Neubewertung kippt, sobald ein Weg über unseren Server gewählt wird") und
  der Rückfall ohne Skript aus der Scheibe 13.6-1 (Setzung P13.6-32; live: Vermerk P13.6-37,
  Punkt (3), L4).
- REICHWEITE HEUTE (CC, GELESEN AM CODE): Zapier steht nicht in `RELAY_HOSTS`
  (src/lib/relay/hosts.ts; Owner-Entscheidung P13.6-90). Jede Zapier-Adresse geht bis zur
  Aufnahme browser-direkt, gleich was hier entschieden wird.
- ERGEBNIS DER AUFKLÄRUNG (CC, 2026-09-30, read-only, Code-Stand `6f00872`; verdichtet aus dem
  Bericht jener Runde, nachgetragen in der Runde "Adresse verbergen: entschieden"). GELESEN AM
  CODE, soweit nicht anders gekennzeichnet; NICHTS DAVON IST LIVE GEMESSEN.
  (Q1) WO DIE ADRESSE STEHT. Auf allen drei Wegen — Relay, Datensparmodus bzw. Adresse ausserhalb
       der Liste, Export — im `action`-Attribut (`generateFunctional`, Block "DER NATIVE
       RUECKFALL") UND im Datenblock (`config.endpoint`; `generateFunctional` entfernt nur
       `fieldNames`, `dataSaver`, `relay`). Die Laufzeit liest sie im Relay-Weg allein in der
       Wache von `__psFormTargetSend` (`https://`, anderer Ursprung), VOR dem Relay-Zweig;
       `relayBranch` selbst nutzt sie nicht. Im direkten Weg ist sie die Aufrufadresse. Das Relay
       braucht sie aus der Seite nicht: es liest sie aus `published_content`
       (`resolveRelayTarget`). Ausserhalb des ausgelieferten Textes: `published_content` und
       Vercels "Outgoing Requests" (Vermerk P13.6-60, Punkt (4)).
  (Q2) RÜCKFALL MIT `action` AUF `/api/f?f=<Kennung>`. Das Relay verlangt `POST`,
       `application/x-www-form-urlencoded` (Parameter nach `;` ignoriert, `isFormContentType`),
       `f` nach `PS_ID_RE`, höchstens 64 KiB; es antwortet 204 bzw. 502 ohne Rumpf, begrenzt,
       gesperrt und unbekannt einheitlich 502 (`delivered`, `notDelivered`). NICHT ENTSCHEIDBAR
       AM CODE: was der Browser beim nativen Versand sendet (Methode, Content-Type, Zeichensatz,
       ob die Query einer POST-`action` erhalten bleibt, ob das Cookie mitgeht) und was er bei
       einer 204 bzw. leeren 502 als Navigation zeigt.
  (Q3) "ZWEI ANTWORTEN". Wortlaut: Setzung P13.6-21, P13.6-59 Q3, P13.6-74 I1 ("Kein dritter
       Status" — als Invariante der Scheibe 13.6-5). Der GRUND (Ununterscheidbarkeit der
       Fehlschläge) ist vom Client unabhängig und hielte auch einen 303 auf `thanksUrl` bei
       Erfolg, wenn alle Fehlschläge gleich antworten; der Wortlaut kollidiert. HARTE GRENZE:
       `relayBranch` setzt `redirect: "error"` und wertet nur Status 204 — eine bestehende Seite,
       deren Aufruf das Relay für nativ hielte und mit 3xx beantwortete, zeigte die Meldung trotz
       Zustellung. Der Normalfall muss "fetch" bleiben. Unterscheidungs-Kandidaten: K-a ein Marker
       in der Query der neuen `action` (entscheidbar, aber Kontrakt) · K-b Fetch-Metadata-Köpfe
       bzw. `Accept` (Browser, nicht gelesen) · K-c ein eigener Kopf im Relay-Aufruf (verworfen:
       alte Seiten senden ihn nicht).
  (Q4) R1 (Setzung P13.6-48). Umgesetzt als `referrerPolicy: "no-referrer"` in `relayBranch`.
       Die Serve-Route setzt `Referrer-Policy: strict-origin-when-cross-origin`
       (`SECURITY_HEADERS`, src/app/app-serve/route.ts); am Formular setzt der Erzeuger keinen
       Referrer (`noreferrer` nur an `<a>`). Nicht entscheidbar: der Referer eines nativen
       Versands, ein eigenes `<meta name="referrer">` des Betreibers. Kandidaten: R-a
       `rel="noreferrer"` am Formular (Browser-Wirkung ungelesen) · R-b ein Meta-Element beim
       Erzeugen (wirkt auf jede Anfrage der Seite) · R-c der Kopf der Serve-Route (trifft jede
       gehostete Seite, per Deploy umkehrbar) · R-d hinnehmen.
  (Q5) Angebotsregel (P13.6-33/-36) bleibt nötig; `formtarget` bzw. `target` öffneten die
       Relay-Antwort anderswo. A/B: das Cookie setzt die Serve-Route per `Set-Cookie`, ob der
       native POST es trägt, ist nicht entscheidbar; ohne Cookie gilt P13.6-59 Q2. Custom-Domains
       trägt nur eine RELATIVE `action` (`proxy` lässt `RELAY_PATH` auf jedem Nicht-App-Host
       durch). Kill-Switch und Ratenbegrenzung griffen im nativen Weg erst mit `action` → Relay.
       Im nativen Weg gibt es weder "erreicht" noch einen Track (P13.6-4, P13.6-24).
  (Q6) Eine neue `action` ist eine ERSETZUNG, keine Einsetzung. Kandidat der Zusage: je
       Relay-Formular genau ein ` action="<A>"` durch ` action="<R>"` ersetzt, sonst kein Zeichen
       — Nachweis durch Rück-Ersetzung gegen den Vorher-Wert; Spannung: A in der Kodierung des
       Serialisierers stammte aus dem Ist-Wert. Die Streichung im Datenblock wäre eine
       Einsetzung mit vertauschten Rollen. Getroffene Pins: W-B2R (src/lib/generate.test.ts),
       RT-11 und bei geänderter Wache RT-13 (src/lib/form-target.test.ts).
  (Q7) Bestehende Seiten tragen die Adresse bis zum Neu-Veröffentlichen; wirklich verborgen
       wäre nur eine NEUE Adresse (Zapier: praktisch ein neuer Zap, Befund (b)). "Deine Webhooks
       bleiben privat" wäre falsch für Datensparmodus, Export, Adressen ausserhalb der Liste,
       alte Seiten und gegenüber uns und Vercel.
  (Q8) KANDIDATEN: V1 `action` → Relay mit Marker, nativ 303 auf die Danke-Seite (dritte
       Antwortform; Adresse bleibt im Datenblock) · V1+/V2+ dazu `endpoint` aus dem Datenblock
       und eine gegatete, neu gefasste Laufzeit-Wache (erst hier ist die Adresse heraus) · V2
       `action` → Relay, nativ die heutige Antwort (Anzeige nicht entscheidbar) · V3 ohne
       `action`-Rückfall (V3a: B-2 kehrt zurück, Vermerk P13.6-31; V3b: Rumpf an die
       Serve-Route, Vorrat P13-14) · V4 Status quo plus Betreiber-Dokumentation · V5 für
       "geheime" Dienste kein Datensparmodus (gegen Owner-Entscheidung P13.6-54) · V6 V1+/V2+
       nur für Zapier, zusammen mit seiner Aufnahme.
  MESSKANDIDATEN (keiner gemessen): die Browser-Form des nativen POSTs an eine relative
  `action` mit Query · die Anzeige bei 204 bzw. leerer 502 als Navigation · 303 nach POST · das
  Cookie beim nativen POST · der Referer beim nativen Versand · die Wirkung von
  `rel="noreferrer"` am Formular.
- ERLEDIGT 2026-09-30: entschieden durch Owner-Entscheidung P13.6-94 der Phase 13.6 (V4 —
  nichts wird gebaut). Die Punkte darüber beschreiben den Stand vor der Entscheidung.

**Arbeit P13.6-104 — ZAPIER: DIE OFFENEN MESSKANDIDATEN ZM4, ZM5 UND ZM7, VOR ABLAUF DES
ZAPIER-MONATS** (ARCHITEKT, übermittelt im Auftrag der Abschluss-Runde der Scheibe "Zapier ins
Relay" am 2026-10-01). Die Kandidaten stehen in docs/formular-empfaenger-befunde.md, Abschnitt
"Zapier", "Messkandidaten Zapier"; der Live-Entwurf in Vermerk P13.6-98, Punkt (9), L6 bis L8.
- ZM4 — Zap aus bzw. gelöscht: der Status sofort und nach mehreren Stunden (laut Doku erst 200,
  dann 404), dazu eine erfundene Kennung auf `hooks.zapier.com`, ein 3xx irgendwo, der Verbleib
  einer Anfrage aus dem Zeitfenster; Mitläufer ein laufender Zap (Soll 200). BEZUG: Vorrat
  P13.6-92 (im Zeitfenster meldet das Relay "zugestellt").
- ZM5 — gehaltene Läufe: Status und Verbleib bei erschöpftem Kontingent bzw. ohne Premium.
- ZM7 — Adblocker gegen den Direktweg (Datensparmodus) an `hooks.zapier.com`; Aufbau wie N3 in
  Vermerk P13-22 der Phase 13, Positivkontrolle die doubleclick-Probe.
- FRIST: vor Ablauf des Zapier-Monats. Buchungsdatum 2026-10-01 — ANGABE DES AUFTRAGS, im
  Bestand nicht belegt; belegt ist nur, dass Webhooks am 2026-10-01 im Konto liefen (Vermerk
  P13.6-102).
- UNBEOBACHTETER TRIGGER: Nichts im Repo und keine Anzeige meldet das Näherrücken der Frist;
  allein dieser Eintrag trägt sie. Verstreicht sie, fällt das nicht auf.
- GEMELDET, NICHT ENTSCHIEDEN (CC, ABGELEITET am Wortlaut des Messkandidaten): ZM5 lautet "nach
  dem Ende des Test-Monats bzw. im Free-Konto". Dieser Teil ist erst MIT oder NACH dem Ablauf
  messbar, nicht davor; vor Ablauf messbar ist allein das erschöpfte Kontingent.

PROVENIENZ von P13.6-112 und P13.6-113: Gate G2 der Scheibe "Beacon bei Erstveröffentlichung"
(Vermerk P13.6-108, Punkt (7)); Messung des Owners und Auftrag des Architekten, übermittelt im
Auftrag der Runde "Beacon bei Erstveröffentlichung — Fortsetzung" am 2026-10-01. Wo "(CC)" steht,
hat CC die Angabe am Bestand geprüft (HEAD `3136962`).

**Vermerk P13.6-112 — `projects` IST FÜR EINE ANGEMELDETE ROLLE SPALTENWEISE FREI SCHREIBBAR,
AUCH IN SERVER-EIGENEN SPALTEN.** KEIN BAU-COMMIT: Messrunde im SQL-Editor; im Repo ändert sich
keine Zeile Code.
(0) PROVENIENZ DER PUNKTE (1) BIS (4): GEMESSEN, OWNER, 2026-10-01, SQL-Editor, Postgres-Ebene;
    die Proben P-G2a bis P-G2d aus dem Gate-Bericht (CC) — sie stehen in keiner Datei des Repos.
    Die Ergebnisse sind als Zusammenfassung übermittelt, nicht im Wortlaut.
(1) P-G2a (`has_column_privilege`): anon, authenticated und service_role je true für INSERT und
    UPDATE auf `tracking_key`, UPDATE auf `blocked_at`, UPDATE auf `published_content`.
    GELESEN 2026-10-01 (CC, postgresql.org/docs/17/functions-info.html): die Funktion "succeeds
    either if the privilege is held for the whole table, or if there is a column-level grant" —
    sie unterscheidet Tabellen- und Spaltenrecht nicht.
(2) P-G2b: genau vier Policies auf `projects` (select, insert, update, delete je `_own`), allein
    `auth.uid() = user_id`.
(3) P-G2c: einziger Trigger auf `projects` ist `projects_set_updated_at`; sein `tgenabled` ist
    nicht übermittelt.
(4) P-G2d: `projects_tracking_key_key` UNIQUE, partiell (`tracking_key IS NOT NULL`).
(5) (CC, GELESEN AM BESTAND): Keine Migration trägt ein `grant` oder `revoke` auf `projects`; die
    Policies aus 0001 nennen keine Rolle (`create policy … for update using (auth.uid() =
    user_id) …`). Für anon greift die Policy deshalb nicht, weil `auth.uid()` dort leer ist —
    ABGELEITET, nicht gemessen. Wirksam schreibt also die angemeldete Rolle, und zwar jede Spalte
    ihrer EIGENEN Zeilen.
(6) FOLGEN, ABGELEITET, NICHT GEMESSEN:
    · `blocked_at`: Selbst-Entsperrung — der Kill-Switch (Tier 0) ist für den Betreiber des
      gesperrten Projekts aufhebbar (Zusatz vom 2026-10-01 in beiden Fassungen des
      Sicherheits-Manifests).
    · `published_content`: Schreiben am Veröffentlichungs-Riegel vorbei (Prüfung des
      Formular-Ziels, eigene Bausteine, Sperre der Custom-Domains in `publishProject`). Das Relay
      liest seine Zieladresse aus dieser Spalte (Setzung P13.6-20); vor der Weiterleitung prüft es
      selbst `formTargetProblem` gegen die Eigen-Liste, den Datensparmodus und die Host-Liste
      (`relay`, src/lib/relay/relay.ts — GELESEN AM CODE, CC), nicht aber die Sperre der
      Custom-Domains.
    · `tracking_key`: Übernahme eines frei gewordenen Schlüssels eines GELÖSCHTEN Projekts — er
      steht öffentlich in Exporten und ausgeliefertem Text; Beacons noch umlaufender Exporte
      landeten dann im Projekt des Übernehmenden und gingen mit IP, User-Agent und Seitenadresse
      fremder Besucher an dessen Ziele. Einen Schlüssel, den ein BESTEHENDES Projekt trägt,
      verhindert der eindeutige Index (Punkt (4)).
    · `ab_test_active`: ebenso direkt schreibbar.
(7) GRENZE: Der Schreibweg über PostgREST mit echter Sitzung ist NICHT ausgeführt; gemessen ist
    die Postgres-Ebene (Dauerregel "EINE PROBE GEGEN DIESELBE SCHICHT KANN EINE FRAGE ÜBER EINE
    ANDERE SCHICHT NICHT SCHLIESSEN"). docs/db-stand.md ist NICHT nachgezogen (Scope dieses
    Commits); die Spalten-Rechte stehen dort bisher nicht.
    NACHGETRAGEN 2026-10-01 (Abschluss der Scheibe "Spaltenrechte"): Der Schreibweg über
    PostgREST mit echter Sitzung ist ausgeführt — VOR 0031 nahm ein PATCH auf `blocked_at`,
    `tracking_key` und `domains.label` je an (200, 1 Zeile), DANACH je 403 mit `42501`. Das ist der
    PostgREST-Beleg für Punkt (1) und zugleich der Beleg seiner Behebung. docs/db-stand.md ist
    nachgezogen. Vermerk P13.6-130, Punkte (1) bis (3).

**Arbeit P13.6-113 — SICHERHEITS-SCHEIBE "SPALTENRECHTE": HÖCHSTE DRINGLICHKEIT, ALS NÄCHSTE NACH
DER SCHEIBE "BEACON BEI ERSTVERÖFFENTLICHUNG", VOR ALLEM ANDEREN IN 13.6** (ARCHITEKT 2026-10-01).
- BEFUND: Vermerk P13.6-112.
- AUFTRAG: SYSTEMATISCH ALLE Tabellen, die eine angemeldete Rolle per Policy schreiben darf, auf
  server-eigene Spalten prüfen — nicht nur `projects`.
  (CC, aus docs/db-stand.md, POLICIES, GEMESSEN 2026-08-05 — ein Dokument, keine heutige
  Messung): Schreib-Policies tragen `projects` (insert, update, delete), `domains` (insert,
  update) und `project_tokens` (insert, update); `events` trägt allein SELECT; `audit_logs`,
  `schema_migrations`, `project_secrets` und `relay_rate_counters` tragen keine Policy. Die
  Spalten von `domains` (etwa `blocked_at`, `custom_host`, `label`) und `project_tokens` sind
  danach Gegenstand der Prüfung.
- BEZUG: Zusatz vom 2026-10-01 am Kill-Switch in CLAUDE.md und in
  docs/claude-history/security-manifest-full.md (Status dort unverändert); Dauerregel "GRANTS
  SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT".
- VOR DEM PLAN PFLICHT: docs/db-stand.md, docs/db-regeln.md, die Supabase-Lesung (vierte Regel in
  docs/db-regeln.md).
- BEZUG 2026-10-01: Roadmap-Zeile 13.7 ("Sicherheit & Datenintegrität", angelegt am selben Tag).
  Diese Arbeit bleibt in 13.6 und geht nicht in jene Phase über (OWNER-ENTSCHEIDUNG 2026-10-01,
  Abgrenzung an jener Zeile).
- ZUGESCHNITTEN 2026-10-01: Setzung P13.6-115 der Phase 13.6 (Abschnitt "Zuschnitt Scheibe
  Spaltenrechte"); der Plan steht im Bericht jener Runde.
- PLAN UND GESTALT FESTGEHALTEN 2026-10-01: Vermerk P13.6-116 (Plan), Setzung P13.6-117 (Gestalt
  (a)), Owner-Entscheidungen P13.6-119 und P13.6-120 der Phase 13.6.
- ERLEDIGT 2026-10-01: Code-Commit `6f66c44`, Migration 0031 eingespielt, Live-Test bestanden
  (nur Chrome) — Vermerk P13.6-130 der Phase 13.6. Die Sätze darüber beschreiben den Stand davor.

## Vorrat (gemeldet, nicht gebaut)

PROVENIENZ von P13.6-105: ARCHITEKT, übermittelt im Auftrag der Abschluss-Runde der Scheibe
"Zapier ins Relay" am 2026-10-01; der Befund aus der Aufklärung jener Runde (CC). Er steht
WEGEN SEINER DRINGLICHKEIT OBEN in diesem Abschnitt (Auftrag); seine Nummer folgt der Reihe.

**Vorrat P13.6-105 — DIE ERSTE VERÖFFENTLICHUNG EINES NEUEN PROJEKTS TRÄGT KEINEN
CONVERSION-BEACON: SEITENAUFRUFE WERDEN GEZÄHLT, CONVERSIONS FEHLEN STILL.**
- GELESEN AM CODE (CC, Stand `93230df`):
  · `ensureTrackingKey` (src/lib/settings.ts) läuft allein in `setCapiToken` und
    `publishProject` (src/app/projects/actions.ts) (GEMESSEN AM REPO: `git grep` ausserhalb der
    Tests, zwei Aufrufe). Ein neues Projekt ohne gespeicherte Zugangsdaten bekommt seinen
    Schlüssel damit erst beim ersten Veröffentlichen.
  · Der Editor erzeugt den ausgelieferten Text mit dem Schlüssel aus seinem Zustand
    (`trackingKey` in src/components/CodeImporter.tsx). `setTrackingKey` steht beim
    Projektladen, beim Zurücksetzen, beim Nachrücken eines Projekts und nach dem Speichern von
    Zugangsdaten — NICHT in `handlePublish`.
  · Ohne Pixel-ID und ohne Schlüssel liefert `buildMetaRuntime` nichts, und
    `metaTrackStatement` lässt den Aufruf weg (`generateFunctional`, src/lib/generate.ts). Den
    PageView-Emitter fügt `publishProject` dagegen serverseitig mit dem Schlüssel aus der Spalte
    ein (`injectPageViewEmitter`).
- FOLGE, ABGELEITET: Die erste Veröffentlichung eines solchen Projekts zählt Seitenaufrufe; jede
  Track-Aktion bleibt ohne Server-Ereignis und ohne Fan-Out — bis der Editor neu geladen und
  erneut veröffentlicht wird. Nichts zeigt es an.
- AM TEXT VERTRÄGLICH GEMESSEN (CC, 2026-10-01): V-Z der Zapier-Testseite trägt den Schlüssel
  genau einmal, im Emitter; nach Neuladen und Veröffentlichen trägt die Seite zusätzlich die
  Meta-Laufzeit mit dem Beacon (Vermerk P13.6-103, Punkt (4)). Ob V-Z die erste Veröffentlichung
  ohne Neuladen war, ist nicht erhoben — der Mechanismus selbst ist NICHT gemessen.
- VERWANDT: Archiv der Phase 11.2 (docs/claude-history/phase-11.2-google.md), Abschnitt "Der
  Schlüssel kommt aus der Spalte" — dasselbe Bild für den Google-Weg ("Die Ansicht zeigt also
  Verkehr, während jede Conversion fehlt."); das Veröffentlichen ist dort kein Saat-Punkt.
- EINORDNUNG (ARCHITEKT): berührt das Kern-Verkaufsargument (Server-Side-Tracking; CLAUDE.md,
  "## Vision").
- TRIGGER: SOFORT — als nächster Schritt die Messung durch den Owner. Vorschlag des Instruments
  (CC, nicht entschieden): ein neues Projekt mit Track-Aktion, ohne Neuladen veröffentlichen, im
  Live-Text nach `__psMetaFire` suchen; danach neu laden, erneut veröffentlichen, erneut suchen.
  Positivkontrolle: ein bestehendes Projekt mit Schlüssel trägt `__psMetaFire`.
- GEMESSEN 2026-10-01 (OWNER): Vermerk P13.6-106 der Phase 13.6 — B1 (erste Veröffentlichung
  ohne Neuladen) 0-mal `__psMetaFire`, B2 (nach Neuladen) 4-mal; die Positivkontrolle ist B2 am
  selben Projekt statt eines bestehenden Projekts. ZUGESCHNITTEN 2026-10-01: Setzung P13.6-107
  (Abschnitt "Zuschnitt Scheibe Beacon bei Erstveröffentlichung"). "Der Mechanismus selbst ist
  NICHT gemessen" darüber beschreibt den Stand vor dieser Messung; gemessen ist seither die
  Wirkung, der Mechanismus bleibt am Code gelesen. Der TRIGGER "SOFORT — als nächster Schritt die
  Messung" ist damit erfüllt.
- GESTALT GESETZT 2026-10-01: Setzung P13.6-109 (a1) mit Owner-Entscheidung P13.6-110.
- ERLEDIGT 2026-10-01: Bau-Commit `1256f0e`, Live-Test bestanden (nur Chrome) — Abschluss-Vermerk
  P13.6-114 der Phase 13.6. Die erste Veröffentlichung eines NEUEN Projekts trägt den Beacon
  (ebenda, L2 und L3). Was weiter ohne Beacon bleibt — der zweite Tab, Projekte von vor dem Fix,
  bereits veröffentlichte Seiten und Exporte —, steht dort unter GRENZEN. Die Sätze darüber
  beschreiben den Stand davor.

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
  TEILWEISE BEANTWORTET 2026-09-29 (Sonde, Owner; docs/plattform-befunde.md, Vercel, Teile (r)
  bis (t)): Query und Referer stehen im Klartext in der Detailansicht, ein IP-Feld und ein
  Rumpf-Feld nicht. Ob Rümpfe oder IPs intern abgelegt werden, bleibt offen (Setzung P13.6-51
  der Phase 13.6).
- Ob `auth.getUser()` in `updateSession` ohne Sitzungs-Cookie einen Netzruf kostet.
  TEILWEISE GEMESSEN 2026-09-29 (Sonde, Owner; ebenda, Teil (s)): MIT Sitzungs-Cookie macht die
  Middleware eine ausgehende GET-Anfrage an den Supabase-Host. Ohne Cookie ist nicht gemessen;
  die Zuordnung zu `auth.getUser()` ist ABGELEITET.
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
- STATUS, NACHGEZOGEN 2026-09-29 (Abschluss der Scheibe 13.6-2): Die Vorbedingung
  "Vorschau-Scheibe" ist erfüllt (Vermerk P13.6-45 der Phase 13.6). ALS NÄCHSTES STEHT DIE
  KORREKTUR VON `NEXT_PUBLIC_APP_URL` AN; Wert und Preview-Scope entscheidet der Architekt beim
  Korrekturschritt (Setzung P13.6-14).
  Punkte (a) und (b) oben beschreiben den Stand davor: Seit Bau-Commit `8be7bb3` übergibt das
  Memo `functionalHtml` der Vorschau keine Beacon-Adresse mehr, und die Vorschau baut keinen
  Beacon. `getCapiProxyUrl` speist nur noch den Export; die Korrektur schaltet in der Vorschau
  nichts mehr ein.
- ERLEDIGT 2026-09-29, ohne Code-Commit (Plattform-Schritt): `NEXT_PUBLIC_APP_URL` trägt die
  Adresse der Produktions-App; ein neuer Export sendet an den Produktions-Ingest, gemessen bis in
  `events` (Vermerk P13.6-47 der Phase 13.6). Früher exportierte Dateien behalten `localhost`.

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

**Vorrat P13.6-44 — ALTE PAGESMITH-BAUSTEINE IM IMPORTIERTEN HTML SENDEN AUS DER VORSCHAU**
(CC, 2026-09-29, HEAD `f5d91f3`; ABGELEITET am Code, NICHT gemessen). Aufgenommen nach
Setzung P13.6-43, Punkt (5).
- Befund: Bausteine aus einem früheren Export (Klasse "eigen" der Phase 11.11) stehen im HTML des
  Betreibers. Der `DOMParser`-Rundlauf behält sie, und das Memo `functionalHtml`
  (src/components/CodeImporter.tsx) fragt `hasOwnBlocks` nicht; sie laufen in der Vorschau und
  senden an das Projekt, aus dem exportiert wurde.
- Was heute schützt: Die Import-Bereinigung zeigt sie an; Veröffentlichen und Export sind in
  diesem Zustand gesperrt.
- OFFEN: das Bearbeitungsfenster — solange sie im Code stehen, kann ein Klick in der Vorschau
  senden. Ob das auch im Editier-Rahmen gilt, ist nicht geprüft.
- GRENZE: Setzung P13.6-39 (Skripte im HTML des Betreibers erfasst Owner-Entscheidung P13.6-13
  nicht).
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-46 — METAS AUTOMATISCHE EREIGNISSE SIND AKTIV; OB DER AUTOMATISCHE ERWEITERTE
ABGLEICH FORMULARFELDER ÜBER UNSEREN PIXEL AN META SENDET, IST OFFEN** (2026-09-29).
- BEFUND, GEMESSEN (OWNER, live, 2026-09-29, in der Vorschau vor dem Deploy der Scheibe
  13.6-2): Nach einem Track-Klick sandte `fbevents.js` neben "Lead" von sich aus ein Ereignis
  "SubscribedButtonClick" (Vermerk P13.6-45 der Phase 13.6, Punkt (2)). Die automatischen
  Ereignisse des Pixels sind damit für diese Pixel-ID aktiv.
- FRAGE, ABGELEITET — NICHT GEMESSEN, NICHT GELESEN: Ist Metas automatischer erweiterter Abgleich
  eingeschaltet, liest `fbevents.js` Formularfelder (etwa eine E-Mail) und sendet sie gehasht an
  Meta — über den Pixel, den wir auf veröffentlichten Seiten laden (Lader in `__psMetaInit`,
  src/lib/tracking/meta.ts). Unser Code hasht und sendet selbst keine E-Mail (Vermerk P13.6-1,
  Punkt (3)); dieser Weg liefe allein über Metas Skript.
- BEZUG: Entscheidung P13-7 der Phase 13 (Archiv docs/claude-history/phase-13-formular-ziel.md);
  die nicht entschiedene Frage, ob eine gehashte E-Mail an Tracking-Ziele gehen darf
  (Owner-Entscheidung P13.6-16 der Phase 13.6, "NICHT ENTSCHIEDEN"; Roadmap-Zeile 13.6, Block
  "ANPASSUNGEN AN DEN FAN-OUT-ZIELEN").
- SEIT DER SCHEIBE 13.6-2 betrifft der Weg nicht mehr die Vorschau, sondern allein
  veröffentlichte Seiten und Exporte.
- TRIGGER: der Zuschnitt der Fan-Out-Scheibe (Roadmap-Zeile 13.6, Block "ANPASSUNGEN AN DEN
  FAN-OUT-ZIELEN"). KEINE HANDLUNG JETZT.

**Vorrat P13.6-69 — "ZIEL ÜBERNEHMEN" IM FORMULAR-ZIEL-PANEL SERIALISIERT DEN CODE DES PROJEKTS
NEU; STEHT ER NICHT IN NORMALFORM, WIRD DAS PROJEKT DIRTY, AUCH OHNE INHALTLICHE ÄNDERUNG**
(CC, 2026-09-30). BESTAND VOR DER SCHEIBE 13.6-4; gefunden bei der Mutation M6 jener Scheibe.
- BEFUND, GEMESSEN IM TEST (Sonde der Bau-Runde 13.6-4, nicht im Repo): Mit einem Code, der ein
  Leerzeichen vor ">" trägt (`action="#unten" >`), zeigt der Editor nach "Ziel übernehmen" ohne
  Wechsel eines Werts "Ungespeicherte Änderungen"; der danach gespeicherte Code steht ohne das
  Leerzeichen.
- MECHANISMUS, ABGELEITET, NICHT GELESEN: `dirty` (src/components/CodeImporter.tsx) vergleicht
  `code !== savedCode`; `handleAssignFormTarget` übernimmt das Ergebnis von
  `anchorMappingTarget` per `setCode`, wenn es vom Code abweicht. Ob die Neu-Serialisierung dort
  entsteht, ist nicht gelesen; ebenso nicht geprüft, ob andere Übernehmen-Wege (Weiterleitung,
  Track, Text) denselben Weg nehmen.
- FOLGE: nur eine falsche Anzeige "ungespeichert"; kein Datenverlust bekannt.
- MECHANISMUS GELESEN 2026-09-30 (CC, Stand `3b631a2`): `anchorMappingTarget` ruft
  `stabilizeIds` (src/lib/detect.ts) — DOMParser, `stabilizeDoc`, Serialisierung über
  `outerHTML` —, und `handleAssignFormTarget` übernimmt das Ergebnis, wenn es abweicht. Denselben
  Weg nehmen `handleAssignMapping`, `handleAssignTextMapping`, `handleAssignTrack` und das
  Neu-Verknüpfen. Weil `generateFunctional` auf demselben Weg serialisiert, ändert eine reine
  Normalisierung des Editor-Codes den veröffentlichten Text nur, wo neue Kennungen entstehen oder
  das Parsen nicht idempotent ist (ABGELEITET). Vermerk P13.6-70, Punkt (8).
- WIRKUNG AUF DIE TESTS: Der Test CI-S1 (src/components/CodeImporter.test.tsx) war dadurch in
  seiner Dirty-Hälfte hohl. An der Wurzel behoben im Bau-Commit `3b631a2`: CI-S1 nutzt den Code in
  der Serialisierungs-Normalform und verankert zuerst "Übernehmen ohne Wechsel ist nicht dirty".
- KEINE HANDLUNG JETZT. KEIN TRIGGER GESETZT.

PROVENIENZ von P13.6-78 bis P13.6-80: ARCHITEKT 2026-09-30, übermittelt im Bau-Auftrag der
Scheibe 13.6-5. Die Befunde stehen in docs/plattform-befunde.md, Vercel-Abschnitt, Teile (v)
bis (aa) (GELESEN 2026-09-30, keine Messung); wo "(CC)" steht, hat CC die Angabe am Bestand
geprüft.

**Vorrat P13.6-78 — EINE RATENREGEL DER VERCEL-FIREWALL JE IP, VOR DER FUNKTION.**
- BEFUND (Vercel, Teil (w)): Auf Hobby gibt es genau EINE Ratenregel je Projekt, gezählt nach IP
  oder JA4, festes Fenster von 10 s bis 10 min. Alle Serving-Hosts laufen durch dasselbe
  Vercel-Projekt; eine Regel ohne Bedingung auf den Hostnamen zählte je IP über alle
  Kundenseiten gemeinsam (FOLGERUNG, ebenda).
- EINORDNUNG DES ARCHITEKTEN: der einzige Schutz des Aufruf-Kontingents aller Kundenseiten.
  AM BESTAND NUR ZUM TEIL GETRAGEN (CC): Der Zähler der Scheibe 13.6-5 läuft in der Funktion
  und verhindert ihren Aufruf nicht (ABGELEITET). Ob eine mit 429 abgewiesene Anfrage eine
  Funktion auslöst oder als Edge Request zählt, steht auf keiner gelesenen Seite (Teil (x),
  Teil (aa), Punkt 1); für "Deny" folgt aus "does not reach your application", dass keine
  Funktion läuft (FOLGERUNG, Teil (x)). Attack Mode wehrt ebenfalls vor der Funktion ab (Teil
  (z); Vorrat P13.6-80) — "einziger" gilt deshalb für den Dauerbetrieb, nicht für den Notfall.
- OFFEN: der Einsatz überhaupt; die Pfade (`/api/f`, `/api/e`); das Verhältnis zum Grund von
  Setzung P13.6-23 ("nicht je IP — das hiesse, IPs abzulegen"): Die Zählung je IP läge beim
  Anbieter, nicht in unserer Datenbank (Teil (w), GRENZE); ob das die Festlegung vom 2026-08-15
  berührt, ist eine Auslegung und nicht entschieden.
- TRIGGER: vor dem ersten fremden Nutzer bzw. der Zuschnitt der Phase 14 — was früher eintritt.

**Vorrat P13.6-79 — `@vercel/firewall` (`checkRateLimit`) ALS ZÄHLWEG: FÜR DIE SCHEIBE 13.6-5
VERWORFEN.**
- GRÜNDE (ARCHITEKT): Die Konfiguration läge ausserhalb des Repos (eine Dashboard-Regel mit
  "Rate limit ID", Teil (y)); ob ein eigener `rateLimitKey` auf Hobby zulässig ist, ist
  ungelesen (Teil (y), Teil (aa), Punkt 2); die EINE Regel des Tarifs gehört der IP-Abwehr
  (Vorrat P13.6-78).
- BEZUG: Setzung P13.6-75, E1 (Zeile je Projekt in der Datenbank) bleibt der Zählweg.
- KEIN TRIGGER GESETZT.

**Vorrat P13.6-80 — "ATTACK MODE" ALS NOTFALL-HEBEL BEI EINER FLUT.**
- BEFUND (Vercel, Teil (z)): auf allen Tarifen frei; abgewiesene Anfragen zählen nicht gegen die
  Nutzungsgrenzen; eine API-Route ist nur innerhalb einer gültigen Challenge-Sitzung erreichbar.
  GELESEN, NICHT GEMESSEN.
- ABGELEITET, NICHT GEMESSEN: Der Relay-Aufruf einer geladenen Seite geht durch, weil der
  Besucher die Challenge beim Laden der Seite löst; ein `POST` ohne geladene Seite scheitert. Ob
  ein `keepalive`-Aufruf die Sitzung trägt, ist ungelesen und ungemessen (ebenda).
- KEIN TRIGGER GESETZT.

PROVENIENZ von P13.6-83 und P13.6-84: ARCHITEKT 2026-09-30, Befunde aus dem Abschluss der
Scheibe 13.6-5, übermittelt im Auftrag der Runde "Scheibe Zurück-Cache — Aufklärung" (Teil A).
Formulierung CC; wo "(CC)" steht, hat CC die Angabe am Bestand geprüft (2026-09-30, HEAD
`2c57463`).

**Vorrat P13.6-83 — DIE ERWARTUNGEN IN supabase/checks/db-stand.sql SIND SEIT MIGRATION 0030
VERALTET; DER NÄCHSTE LAUF MELDET FEHLALARME.**
- BEFUND (CC, GELESEN AM BESTAND): Drei Proben tragen eine Erwartung, die die Tabelle
  `relay_rate_counters` und die Funktion `relay_rate_hit` (0030) nicht kennt:
  · PROBE 4 (Tabellen, RLS-Status, Policy-Anzahl): "SIEBEN Tabellen", Policy-Zahlen für diese
    sieben, Summe ZEHN. Die achte Zeile erscheint ohne Erwartung. Die Summe bleibt nach der
    gemessenen Null an `relay_rate_counters` rechnerisch ZEHN (ABGELEITET).
  · PROBE 6 (Rollen-Grants): "volle DML-Rechte auf ALLE SIEBEN Tabellen" für anon,
    authenticated und service_role. Für `relay_rate_counters` ist das Gegenteil gemessen — anon
    und authenticated ohne DML (docs/db-stand.md, Absatz "DIE ACHTE TABELLE WEICHT DAVON AB …").
  · PROBE 8 (Funktionen in public): "FUENF".
- ABWEICHUNG VOM AUFTRAG, GEMELDET (CC): Der Auftrag nannte neben Probe 8 "die Zahlen der
  Tabellen- und Policy-Probe". Tabellen und Policies stehen in EINER Probe (4). Probe 6 nannte
  der Auftrag nicht; ihre Erwartung ist ebenso überholt.
- NICHT BETROFFEN (CC, GELESEN AM BESTAND): Proben 1 und 1b nennen bewusst keine Zahl; Proben 2
  und 7 fragen benannte Tabellen ohne `relay_rate_counters`; Probe 10 hat keine Erwartung; Probe
  9 (Event-Trigger) berührt 0030 nicht (ABGELEITET). GRENZFALL: Probe 3 fragt schema-weit, und
  ihre Erwartung nennt die drei Constraints aus 0030 nicht — sie ist aber auch sonst keine
  vollständige Liste (etwa `domains_pkey` fehlt dort). Ob sie einen Fehlalarm meldet, ist eine
  Lesart.
- docs/db-stand.md markiert die Gesamtzahlen als nicht nachgemessen: Nachträge vom 2026-09-30
  "DIE ZAHL SIEBEN IST SEIT 0030 NICHT MEHR RICHTIG …", "DIE GESAMTZAHL ZEHN IST NICHT
  NACHGEMESSEN" und "DIE ZAHL FÜNF OBEN IST NICHT NACHGEMESSEN".
- GEMELDET, NICHT ENTSCHIEDEN (CC): Der Kopf der Probe nennt als WANN "nach JEDER Migration, die
  Spalten, Constraints oder Policies beruehrt"; 0030 legt eine Tabelle mit drei Constraints an.
  Gefahren wurde nach 0030 statt dessen supabase/checks/relay-rate-counters.sql (Vermerk
  P13.6-81, Punkt (2)).
- TRIGGER: der nächste Lauf von supabase/checks/db-stand.sql — dann die Proben 4, 6 und 8 messen
  und ihre Erwartungen und docs/db-stand.md im selben Zug nachziehen.

**Vorrat P13.6-84 — CLAUDE.md, "## Aktueller DB-/Analytics-Stand": DER SATZ "WAS DAMIT OFFEN
IST UND HIER NICHT ENTSCHIEDEN WIRD …" FÜHRT EINE FRAGE ALS OFFEN, DIE SEIT `cc8fc98`
BEANTWORTET IST.**
- DER SATZ, WÖRTLICH: "WAS DAMIT OFFEN IST UND HIER NICHT ENTSCHIEDEN WIRD: Der Titel-Zeiger in
  db-stand.sql braucht die Titel weiterhin an einem auffindbaren Ort; ein Pfad-Zeiger auf diese
  Datei existiert nicht mehr."
- DER BELEG (CC, GELESEN AM BESTAND): Commit `cc8fc98` hat den offenen Punkt "DER TITEL-ZEIGER IN
  supabase/checks/db-stand.sql IST UNGEPRÜFT" samt Stub-Zeile in CLAUDE.md gestrichen; der Beleg
  steht am Eintrag gleichen Titels in docs/offene-punkte.md ("Er trägt": der Zeiger in PROBE 8
  trifft in docs/db-regeln.md genau eine Regel dieses Titels).
- GENAUER (CC): Überholt ist die Einordnung als OFFEN. Die zwei Sachaussagen des Satzes stehen
  weiter: Der Zeiger braucht den Titel an einem auffindbaren Ort, und db-stand.sql trägt keinen
  Pfad-Zeiger auf CLAUDE.md (GEMESSEN AM REPO, 2026-09-30: Suche "CLAUDE" in
  supabase/checks/db-stand.sql, 0 Treffer; Positivkontrolle: der Titel "DB-FUNKTIONEN +
  SEARCH_PATH" trifft dort einmal). Wer den Satz ändert, nimmt ihn ganz (Dauerregel "WER EINE
  HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE").
- WARUM NICHT JETZT: Eine Änderung an einer Aussage von CLAUDE.md verlangt zuerst das Laden von
  docs/claude-md-herleitung.md (Kopf von CLAUDE.md).
- TRIGGER: die nächste Runde, die ohnehin eine Aussage in CLAUDE.md ändert.
- TRIGGER EINGETRETEN 2026-10-01 (CC): Die Runde "Beacon bei Erstveröffentlichung — Fortsetzung"
  ändert eine Aussage in CLAUDE.md (Zusatz am Kill-Switch). NICHT VOLLZOGEN — der Auftrag jener
  Runde nennt diesen Posten nicht; vorgelegt im Bericht der Runde.
- VOLLZOGEN 2026-10-01 (Runde "Abschluss Beacon-Scheibe", Auftrag E): Der Satz in CLAUDE.md ist
  GANZ ersetzt — die zwei Sachaussagen stehen weiter, die Einordnung als OFFEN ist durch die
  Erledigung mit `cc8fc98` und den Zeiger auf den Beleg in docs/offene-punkte.md ersetzt.
  docs/claude-md-herleitung.md ist vorher vollständig geladen worden und ist NICHT geändert: Ihr
  Rumpf ist der eingefrorene Stand vom 2026-09-22 und trägt keinen eigenen Beleg zu diesem
  Satz. Die Messung "kein Pfad-Zeiger" ist am 2026-10-01 wiederholt (CC: Suche "CLAUDE" in
  supabase/checks/db-stand.sql 0 Treffer; Positivkontrolle "DB-FUNKTIONEN + SEARCH_PATH" dort
  1 Treffer, in docs/db-regeln.md als Regeltitel 1-mal). Die Sätze darüber beschreiben den Stand
  davor.

**Vorrat P13.6-87 — EINE DANKE-ADRESSE OHNE SEITENWECHSEL LÄSST DIE SPERRE DES FORMULAR-ZIELS OHNE
JEDES "ZURÜCK" STEHEN; DER KNOPF IST DANN TOT** (CC, Aufklärung zur Scheibe "Zurück-Cache" vom
2026-09-30, Q4; aufgenommen im Auftrag des Architekten vom selben Tag). ABGELEITET, NICHT
GEMESSEN.
- GELESEN AM CODE (Stand `2fdd8ba`): Bei Erfolg navigiert `__psFormTargetSend` über
  `window.location.href = cfg.thanksUrl`, ohne die Sperre zu lösen (Text aus
  `buildFormTargetRuntime`, src/lib/form-target.ts; Befund an Owner-Entscheidung P13.6-71).
  `formTargetProblem` verlangt für die Danke-Seite allein eine absolute http(s)-Adresse
  (`isValidRedirectUrl`); eine Adresse auf der eigenen Seite ist zulässig.
- ABGELEITET AUS DER HTML-SPEZIFIKATION, NICHT GELESEN: Unterscheidet sich die Danke-Adresse von
  der Seitenadresse nur im Fragment, oder lädt ihre Antwort kein neues Dokument, bleibt die Seite
  stehen — mit gesetzter Sperre. Jeder weitere Klick endet stumm.
- Die Gestalt K2 (Setzung P13.6-86) erfasst diesen Weg nicht: Ohne Seitenwechsel gibt es kein
  `pageshow` (ABGELEITET).
- TRIGGER: die nächste Arbeit an der Prüfung der Danke-Adresse, oder der erste Support-Fall
  "Knopf tot ohne Zurück".

PROVENIENZ von P13.6-92 und P13.6-93: OWNER-AUFTRAG 2026-09-30, Runde "Adresse verbergen" (Teil
A). Die Befunde stehen in docs/formular-empfaenger-befunde.md, Abschnitt "Zapier" (GELESEN
2026-09-30, keine Messung); wo "(CC)" steht, hat CC die Angabe am Bestand bzw. am Code geprüft
(HEAD `6f00872`).

**Vorrat P13.6-92 — ZAPIER ANTWORTET NACH DEM AUSSCHALTEN ODER LÖSCHEN EINES ZAPS BIS ZU
MEHREREN STUNDEN WEITER MIT ERFOLG; DAS RELAY MELDET DANN "ZUGESTELLT".**
- BEFUND (GELESEN, Befund (f)): "there is a system update delay of up to several hours before
  the 404 response takes effect, during which the URL will continue to return a 200 response."
  Die Doku widerspricht sich an dieser Stelle (ebenda: "We always return a success message for
  all webhooks …"). Ob eine Anfrage im Zeitfenster später verarbeitet wird, steht auf keiner
  gelesenen Seite (ebenda).
- FOLGE (CC, ABGELEITET am Code): `forward` (src/lib/relay/relay.ts) wertet allein den Status;
  2xx ergibt "zugestellt" (204), der Antwort-Rumpf wird verworfen. Der Besucher sähe die
  Danke-Seite.
- HEUTE OHNE WIRKUNG IM RELAY (CC): Zapier steht nicht in `RELAY_HOSTS` (Owner-Entscheidung
  P13.6-90). Im browser-direkten Weg gilt "erreicht" bei einer `opaque`-Antwort ohne Blick auf
  den Status (Setzung P13-21 der Phase 13); dort wäre auch die spätere 404 "erreicht"
  (ABGELEITET).
- "KEIN CODE-HEBEL" — ANGABE DES AUFTRAGS. Am Bestand (CC): Ob Zapiers Antwort-Rumpf im
  Zeitfenster anders aussieht als bei einem laufenden Zap, steht auf keiner gelesenen Seite
  (Befunde (e), (f)). Die Angabe ist damit weder belegt noch widerlegt.
- ZIEL BEIM PHASENENDE: Betreiber-Dokumentation (offener Punkt "BETREIBER-DOKUMENTATION FEHLT —
  DREI PUNKTE"). MESSUNG: Messkandidat ZM4 im gebündelten Zapier-Monat (Owner-Entscheidung
  P13.6-90).
- NACHGETRAGEN 2026-09-30: Mit Owner-Entscheidung P13.6-97 wird der Posten im Relay wirksam,
  sobald `hooks.zapier.com` in `RELAY_HOSTS` steht und eine Seite neu veröffentlicht ist; ZM4
  läuft im jetzt gebuchten Monat. "HEUTE OHNE WIRKUNG IM RELAY" darüber beschreibt den Stand
  davor.
- NACHGETRAGEN 2026-10-01: `hooks.zapier.com` steht seit Bau-Commit `93230df` in `RELAY_HOSTS`;
  wirksam für jede danach veröffentlichte Seite mit einem solchen Ziel (Vermerk P13.6-103 der
  Phase 13.6). Die Messung ZM4 trägt Arbeit P13.6-104 der Phase 13.6.

**Vorrat P13.6-93 — ZAPIER SPEICHERT NUR IN DEN USA, OHNE EU-OPTION.**
- BEFUND (GELESEN, Befund (l)): "Zapier hosts data in AWS servers located in the United States
  …" — "Is there an option to have my data stored only within the EU? Zapier does not support
  this option." Dazu Befund (k) (Aufbewahrung der Formularwerte im Konto des Betreibers) und
  Befund (m) (der DPA gilt zwischen Zapier und dem Betreiber; unseren Kunden-AVV ersetzt er
  nicht — FOLGERUNG ebenda).
- EINORDNUNG (ANGABE DES AUFTRAGS): eine Entscheidung des Betreibers, nach der Haltung "Wir sind
  Werkzeug, nicht Aufsicht" (docs/arbeitsweise.md, 4b, "Haltung"). (CC) Die Haltung ist dort am
  Beispiel der Einwilligung gefasst; ihre Anwendung auf den Datenstandort ist die Angabe des
  Auftrags.
- (CC) Die Transit-Zusage (Owner-Entscheidung P13.6-16) gilt unserem Server; über den Empfänger
  sagt sie nichts (Befund (k), FOLGERUNG).
- ZIEL BEIM PHASENENDE: Betreiber-Dokumentation und die AVV-Arbeit (Owner-Entscheidung
  P13.6-18).

PROVENIENZ von P13.6-95 und P13.6-96: OWNER-AUFTRAG 2026-09-30, Runde "Adresse verbergen:
entschieden + Scheibe Zapier ins Relay" (Teil A). Wo "(CC)" steht, hat CC die Angabe am Bestand
bzw. am Code geprüft (HEAD `5fadcff`).

**Vorrat P13.6-95 — DIE EMPFÄNGER-ADRESSE STEHT ÖFFENTLICH IN DER SEITE; DER BETREIBER MUSS DAS
WISSEN.**
- INHALT FÜR DIE BETREIBER-DOKUMENTATION: Die Adresse steht im ausgelieferten Text (Arbeit
  P13.6-91, Q1). Wer sie ersetzen will, braucht eine NEUE Adresse — bei Zapier praktisch einen
  neuen Zap (Zapier, Befund (b): die Adresse ändert sich nur bei Übergabe des Zaps) — und muss
  neu veröffentlichen (Dauerregel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY").
  Zapier rät, die Adresse wie ein Passwort zu behandeln (Befund (c)); unser Produkt tut das
  bewusst nicht (Owner-Entscheidung P13.6-94).
- ZIEL BEIM PHASENENDE: Betreiber-Dokumentation (offener Punkt "BETREIBER-DOKUMENTATION FEHLT —
  DREI PUNKTE").

**Vorrat P13.6-96 — SPAM-SCHUTZ FÜR FORMULARE (ETWA EIN UNSICHTBARES KÖDERFELD).**
- Eigenes Thema; soll jeden Empfänger schützen. Heute gibt es keinen Bot-Schutz (Vermerk
  P13.6-19, Punkt (1)); über das Relay bremst allein die Ratenbegrenzung (Setzung P13.6-75, E3).
- EIN KÖDERFELD ÄNDERT DEN AUSGELIEFERTEN TEXT (Dauerregel "WAS EINMAL IM AUSGELIEFERTEN TEXT
  STEHT, IST EINE EINBAHNSTRASSE …").
  ABWEICHUNG VOM AUFTRAG, GEMELDET (CC, ABGELEITET): Der Auftrag sagt "jede Gestalt ändert den
  ausgelieferten Text". Eine Prüfung allein im Relay änderte ihn nicht — sie erfasste aber nur den
  Relay-Weg, nicht Datensparmodus, Export und den Rückfall ohne Skript.
- (CC, GELESEN AM CODE, ABGELEITET): Das Relay reicht den Rumpf ungeparst weiter (`forward`,
  src/lib/relay/relay.ts), im direkten Weg geht er ohnehin unverändert an den Empfänger. Ein
  Köderfeld reiste deshalb als eigenes Feld bis zum Empfänger, solange nichts es entfernt; es
  entfernen hiesse, den Rumpf im Relay zu parsen.
- TRIGGER: vor dem ersten fremden Nutzer, oder der erste gemeldete Spam-Fall.
- NACHGETRAGEN 2026-10-01 (ARCHITEKT, übermittelt im Auftrag der Runde "Scheibe Zapier ins Relay
  — Bau", Teil A): KOPPLUNG MIT OWNER-ENTSCHEIDUNG P13.6-94. Ein Bot ohne Skript schickt an das
  `action`-Attribut und damit direkt zum Empfänger; eine Prüfung allein im Relay erreicht ihn
  nicht. Wer den Spam-Schutz zuschneidet, bewertet das Verbergen der Adresse mit. GESTALTEN:
  Köderfeld und Zeitfalle ohne Dritte; eine unsichtbare Prüfung eines Dritten (etwa Turnstile)
  verlangt Skript eines Dritten (Einwilligung; Dauerregel "WAS EINMAL IM AUSGELIEFERTEN TEXT
  STEHT, IST EINE EINBAHNSTRASSE …") und eine Server-Bestätigung, die nur der Relay-Weg hat.
  (CC, am Bestand) Die Adresse im `action`-Attribut: Arbeit P13.6-91, Q1; sie bleibt dort nach
  Owner-Entscheidung P13.6-94.

PROVENIENZ von P13.6-101: ARCHITEKT, Setzung P13.6-100, (8), übermittelt im Auftrag der Runde
"Scheibe Zapier ins Relay — Bau" (Teil A) am 2026-10-01. Befund aus dem Plan (Vermerk P13.6-98,
Punkt (3)).

**Vorrat P13.6-101 — DER KOPF VON src/lib/relay/relay.ts SAGT "IN DIESER SCHEIBE RUFT ES NOCH
KEINE AUSGELIEFERTE SEITE AUF"; SEIT DER SCHEIBE 13.6-4 RUFEN GEHOSTETE SEITEN DAS RELAY.**
- GELESEN AM CODE (CC, Stand `87af209`): Der Satz steht wörtlich im ersten Absatz des
  Kopfkommentars. Seit Bau-Commit `3b631a2` ruft der Relay-Weg (`relayBranch`, Text aus
  `buildFormTargetRuntime`, src/lib/form-target.ts) das Relay aus veröffentlichten Seiten;
  live: Vermerk P13.6-70, Punkt (3).
- BEZUG: Dauerregel "EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT — UND ER VERMEHRT SICH".
- TRIGGER: die nächste Runde, die src/lib/relay/relay.ts öffnet.

PROVENIENZ von P13.6-121 und P13.6-122: ARCHITEKT 2026-10-01, übermittelt im Auftrag der Runde
"Spaltenrechte — Plan festhalten, Entscheidungen, Regel-Präzisierung"; die Befunde aus dem Plan
(Vermerk P13.6-116). Wo "(CC)" steht, hat CC die Angabe am Bestand geprüft (HEAD `498fd97`).

**Vorrat P13.6-121 — DER KILL-SWITCH WIRKT JE PROJEKT; EIN NEU ANGELEGTES PROJEKT UMGEHT IHN.**
- BEFUND (Vermerk P13.6-116, Punkt (6)): Die Sperre sitzt auf `projects.blocked_at` bzw.
  `domains.blocked_at` (CLAUDE.md, Tier 0, "KILL-SWITCH"); ein gesperrter Betreiber legt ein neues
  Projekt an und veröffentlicht es. (CC, ABGELEITET am Code) Das Anlegen prüft keine Sperre:
  `saveProject` (src/app/projects/actions.ts) liest im Insert-Zweig keine Spalte `blocked_at`.
- ZIEL: Phase 13.7 (Roadmap-Zeile 13.7, Klasse "DER UNEHRLICHE BETREIBER — Sperren aushebeln").
- AUSSER SCOPE der Scheibe "Spaltenrechte".

**Vorrat P13.6-122 — OB `project_tokens` ÜBERHAUPT GEBRAUCHT WIRD.**
- BEFUND (Vermerk P13.6-116, Punkt (1)): Die Tabelle wird allein über den Admin-Client geschrieben
  (`setCapiToken`, `removeCapiToken`) und nirgends gelesen (Kopf von src/lib/supabase/admin.ts);
  der Kommentar in `setCapiToken` nennt sie "die Rollback-Reserve fuer die vorige Code-Fassung"
  (Doppelschreib seit Phase 11, Scheibe 1).
- (CC) Mit Setzung P13.6-117 verliert sie ihre Schreib-Policies; die Frage nach der Tabelle selbst
  bleibt.
- KEIN TRIGGER GESETZT.

PROVENIENZ von P13.6-126: ARCHITEKT 2026-10-01, Setzung P13.6-125, übermittelt im Auftrag der
Runde "Spaltenrechte — Bau" (Teil A). PROVENIENZ von P13.6-127: CC, dieselbe Runde, GELESEN AM
CODE (HEAD `38f502f`).

**Vorrat P13.6-126 — GELÖSCHTE LABELS DAUERHAFT SPERREN (GRABSTEIN-MODELL).**
- BEFUND (CC, GELESEN AM BESTAND): `domains.project_id` trägt `on delete cascade` (0006_hosting);
  mit dem Projekt verschwindet seine Label-Zeile, das Label ist danach wieder frei. Seit
  Owner-Entscheidung P13.6-123 übernimmt es der Heilungs-Zweig nicht mehr; der Erzeuger kann es
  aber zufällig neu würfeln, und über den SQL-Editor bleibt jedes Label setzbar (Owner-Angabe
  P13.6-124, GRENZE DER FOLGE).
- ZIEL: Phase 13.7 (Roadmap-Zeile 13.7).
- AUSSER SCOPE der Scheibe "Spaltenrechte".

**Vorrat P13.6-127 — DER HINWEIS "ADRESSE … WURDE WIEDERHERGESTELLT" STIMMT NACH OWNER-ENTSCHEIDUNG
P13.6-123 NICHT MEHR.**
- GELESEN AM CODE: `publishProject` liefert `restored: true`, wenn die Label-Zeile fehlte;
  src/components/PublishView.tsx zeigt dann "— Adresse war nicht mehr erreichbar und wurde
  wiederhergestellt." Der Kommentar an `PublishResult` (src/app/projects/actions.ts) sagt "MIT DEM
  ALTEN Label wiederhergestellt".
- FOLGE (ABGELEITET): Seit der Entscheidung ist die Adresse in diesem Fall eine NEUE. Der Satz
  behauptet eine Wiederherstellung derselben Adresse; der Betreiber, dessen Anzeigen auf die alte
  zeigen, liest daraus nicht, dass er sie umstellen muss.
- DER TEXT IST EIN OWNER-TEXT; PublishView.tsx liegt ausser Scope der Scheibe "Spaltenrechte".
- TRIGGER: die nächste Arbeit an src/components/PublishView.tsx, spätestens vor dem ersten fremden
  Nutzer.
- ENTSCHIEDEN 2026-10-01: Owner-Entscheidung P13.6-128 der Phase 13.6 (der neue Wortlaut); der
  Bau kommt im Code-Commit der Scheibe "Spaltenrechte". Die Sätze darüber beschreiben den Stand
  davor.
- ERLEDIGT 2026-10-01: Code-Commit `6f66c44` — Vermerk P13.6-130 der Phase 13.6, Punkt (4).

PROVENIENZ von P13.6-129: OWNER-AUFTRAG 2026-10-01, Runde "Spaltenrechte — Code-Teil" (Teil A);
der Befund aus dem Bau-Bericht derselben Scheibe (CC). Wo "(CC)" steht, hat CC die Angabe am
Bestand geprüft (HEAD `a32592f`).

**Vorrat P13.6-129 — TRUNCATE, REFERENCES UND TRIGGER FÜR anon UND authenticated AUF ALLEN TABELLEN
IN public PRÜFEN UND ENTZIEHEN.**
- BEFUND (Bau-Bericht der Scheibe "Spaltenrechte", Abweichungen, Punkt 4): Migration 0031
  entzieht nur INSERT, UPDATE und DELETE; TRUNCATE, REFERENCES und TRIGGER bleiben, wie sie sind.
  Ob die Vorgabe-Rechte sie für anon und authenticated tragen, ist NICHT gemessen (CC:
  docs/db-stand.md, ROLLEN-GRANTS, nennt "volle DML-Rechte", keine Einzelrechte).
- EINORDNUNG (AUFTRAG): über PostgREST nicht auslösbar, Verteidigung in der Tiefe. (CC) Am
  Bestand nicht belegt: Die gelesene PostgREST-Seite "Tables and Views" (docs/plattform-befunde.md,
  Supabase, Teil (bd), #24, ab "Insert" bis Dateiende) führt Insert, Update, Upsert, PUT und
  Delete und kein TRUNCATE — ein Nicht-Treffer mit dieser Reichweite, keine Aussage über die
  übrigen Seiten.
- MESSUNG: supabase/checks/spaltenrechte.sql, Abfrage (8) (die drei Tabellen der Scheibe); für
  ALLE Tabellen in public ist die Abfrage zu erweitern.
- ZIEL: Phase 13.7 (Roadmap-Zeile 13.7).
- AUSSER SCOPE der Scheibe "Spaltenrechte".
- ERGÄNZT 2026-10-01 (Abschluss der Scheibe "Spaltenrechte") — EIN VIERTES RECHT UND DIE MESSUNG.
  Titel und Text darüber bleiben stehen; der Satz "NICHT gemessen" gilt für die drei Tabellen der
  Scheibe nicht mehr.
  · GEMESSEN (Owner, SQL-Editor, Abfrage (3) der Probe, Katalog-ACL): VOR 0031 trugen anon und
    authenticated auf `projects`, `domains` und `project_tokens` je `arwdDxtm`, Grantor
    `postgres`. NACH 0031: auf `domains` und `project_tokens` je `rDxtm`, auf `projects` `rdDxtm`
    (Vermerk P13.6-130, Punkte (2) und (3)).
  · GELESEN 2026-10-01 (CC, postgresql.org/docs/17/ddl-priv.html, Tabelle 5.1 "ACL Privilege
    Abbreviations"): `D` TRUNCATE · `x` REFERENCES · `t` TRIGGER · `m` MAINTAIN. Neben den drei
    im Titel genannten Rechten bleibt damit auch MAINTAIN für anon und authenticated stehen.
  · Abfrage (8) — die Matrix je Spalte — ist in keinem der beiden Läufe übermittelt; gemessen sind
    die Rechte auf Tabellen-Ebene aus (3). Über die Tabellen ausserhalb der Scheibe sagt die
    Messung nichts.
  · "Über PostgREST nicht auslösbar" bleibt ANGABE DES AUFTRAGS (Abschluss-Runde 2026-10-01);
    der Bestand trägt dazu weiterhin allein den Nicht-Treffer mit der Reichweite darüber, und für
    MAINTAIN keinen.

PROVENIENZ von P13.6-131: ARCHITEKT, übermittelt im Auftrag der Runde "Nachzug zu cb56840" am
2026-10-01; der Befund aus der Runde "Meldungen aus dem Abschluss Spaltenrechte" (CC, Commit
`cb56840`). Wo "(CC)" steht, hat CC die Angabe am Bestand geprüft (HEAD `cb56840`).

**Vorrat P13.6-131 — MANIFEST-ITEM VERCEL-TOKEN: DIE VOLLFASSUNG TRÄGT EINEN STATUS, DIE
TIER-ÜBERSICHT IN CLAUDE.md KEINEN — ENTGEGEN DER DECKUNGSGLEICHHEIT DER FASSUNGEN.**
- BEFUND (CC, GELESEN AM BESTAND): docs/claude-history/security-manifest-full.md, Item
  "VERCEL-TOKEN maximal scoped + Domain-Mutations-AUDIT-LOG", trägt "TEILERFÜLLT (Stand
  2026-07-28)" und "BINDET-AN: 7c-2 (Vercel-Domains-API) — abgeschlossen; der Rest bindet an den
  Abuse-/Audit-Ausbau bzw. an öffentlichen Traffic." CLAUDE.md, "## Security Manifest & Launch
  Blocker", Tier 1, "VERCEL-TOKEN scoped + Domain-Mutations-AUDIT-LOG", trägt keinen Status und
  "BINDET-AN: 7c-2."
- GEGEN: CLAUDE.md, ebenda: "DER STATUS JE ITEM STEHT IN BEIDEN FASSUNGEN UND MUSS DECKUNGSGLEICH
  SEIN."
- (CC) Der Satz in CLAUDE.md, ebenda, "ELF ITEMS TRAGEN IN KEINER DER BEIDEN FASSUNGEN EINEN
  AUSDRÜCKLICHEN STATUS" erfasst diesen Fall nicht: Hier trägt EINE Fassung einen.
- NICHT ENTSCHIEDEN: welcher Status richtig ist.
- NICHT GEPRÜFT: ob weitere Items dieselbe Divergenz tragen.
- Status und Wortlaut beider Fassungen sind in der Runde, die diesen Eintrag anlegt, unberührt.
- TRIGGER: der Zuschnitt der Phase 13.7 — dort wird das Produkt gegen ein Bedrohungsmodell
  geprüft, und das Sicherheits-Manifest ist dessen Basis (Roadmap-Zeile 13.7).
