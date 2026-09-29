# Phase 13.6 — Formular-Relay (Lead-Relay): DER AKTIVE STAND

**PFLICHT-GATE:** Diese Datei ist ab ihrer Anlage (2026-09-29) das Pflicht-Gate ("Auftrag 0")
jedes Bau- und Aufklärungs-Prompts der Phase 13.6 (CLAUDE.md, "## Aktiver Stand — Verfahren ab
Phase 10"). Verfahren: docs/arbeitsweise.md, "Die Standdatei".

**GEGENSTAND:** Roadmap-Zeile 13.6 (docs/roadmap.md). Richtung, Grund, "NICHT ENTSCHIEDEN",
Fahrplan-Entwurf, Einordnung und Prüfliste stehen dort und werden hier NICHT abgeschrieben.
UNVERÄNDERT IN KRAFT, bis der Owner die Datenklassen-Regel neu fasst: Entscheidungen P13-2 und
P13-7 der Phase 13 (Archiv docs/claude-history/phase-13-formular-ziel.md). Diese Datei ändert
keine von beiden.

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
- Owner-Angaben zur Phase 13.6 vom 2026-09-29
- Architekten-Setzungen zur Phase 13.6 vom 2026-09-29
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

## Architekten-Setzungen zur Phase 13.6 vom 2026-09-29

PROVENIENZ beider: ARCHITEKTEN-SETZUNG 2026-09-29, übermittelt im Auftrag der Anlage-Runde
dieser Datei. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.

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

**Vorrat P13.6-11 — DREI FRAGEN, DIE AM CODE NICHT ENTSCHEIDBAR SIND** (CC, 2026-09-29).
- Der Wert von `NEXT_PUBLIC_APP_URL` in Produktion — und damit, ob exportierte Beacons durch
  `updateSession` oder durch den Serving-Zweig laufen. Er steht in der Vercel-Umgebung, nicht im
  Repo. BEZUG: Der offene Punkt "isAppHost-PLATZHALTER" sagt "In Prod heute harmlos (nur
  *.vercel.app ist relevant)"; das ist keine Messung dieses Wertes.
- Ob Vercel Rümpfe, Query oder IP in seinen Logs ablegt.
- Ob `auth.getUser()` in `updateSession` ohne Sitzungs-Cookie einen Netzruf kostet.
- KEIN TRIGGER GESETZT.
