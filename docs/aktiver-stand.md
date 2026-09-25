# Phase 11.9 — GA4 als sechstes Fan-Out-Ziel: DER AKTIVE STAND

**PFLICHT-GATE:** Diese Datei ist ab ihrer Anlage (2026-09-25) das Pflicht-Gate ("Auftrag 0")
jedes Bau- und Aufklärungs-Prompts der Phase 11.9 (CLAUDE.md, "## Aktiver Stand — Verfahren
ab Phase 10"). Verfahren: docs/arbeitsweise.md, "Die Standdatei".

**GEGENSTAND:** Roadmap-Zeile 11.9 (docs/roadmap.md) — GA4 als sechstes Fan-Out-Ziel. Die
Zeile schneidet nichts zu und sagt nicht, ob GA4 gebaut wird; diese Datei auch nicht.

**NUMMERN:** eine durchlaufende Reihe `P11.9-n` über alle Gattungen, Gattung vorn (Entscheidung
P11.9-1, Vermerk P11.9-2 …). Grund: Im Archiv der Phase 11.7 steht "P11.7-2" viermal, je
Gattung einmal (VERMERK, Entscheidung, Vorrat, Zuschnitt-Frage; GEMESSEN am Repo, CC,
2026-09-25).

**FORM (OWNER-VORGABE 2026-09-25, Roadmap-Zeile 11.9):** nur harte Angaben, je mit Fundstelle
(Symbolname) und Provenienz.

## Abschnitte der Standdatei 11.9

- Entscheidung zum Ablauf der Phase 11.9
- Befunde der GA4-Aufklärung vom 2026-09-25
- Was den GA4-Bau bindet, ohne entschieden zu sein
- Owner-Fragen, fällig nach der GA4-Lesung
- Register der Phase 11.9
- Nächster Schritt der Phase 11.9

## Entscheidung zum Ablauf der Phase 11.9

**Entscheidung P11.9-1 — DIE GA4-ANBIETER-LESUNG KOMMT VOR JEDEM ZUSCHNITT UND VOR DER
DATENKLASSEN-FRAGE.** Die Phase wird weitergeführt.
GRUND: Die dritte Datenklasse entscheidet nach der HERKUNFT einer Kennung (docs/offene-punkte.md,
"DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Block vom 2026-08-28 und Teil (E2)); woher die
GA4-Kennung stammt, ist im Repo nicht gemessen (Vermerk P11.9-2, Punkt (5)).
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-25, übermittelt im Auftrag der Doku-Runde desselben Tages.

## Befunde der GA4-Aufklärung vom 2026-09-25

**Vermerk P11.9-2 — erste Aufklärung (KEIN BAU, daher kein Bau-Commit; read-only, CC,
2026-09-25, HEAD `912f70a`).** Alle Angaben GEMESSEN am Repo, soweit nicht anders gekennzeichnet.

(1) VORBEDINGUNG "DIE BESUCHER-KENNUNG" (Roadmap-Zeile 11.9) — NICHT ERFÜLLT. Keine Entscheidung
    im Repo. Achse: `GA4`, `Google Analytics`, `Measurement Protocol`, `measurement_id`,
    `measurementId`, `api_secret`, `apiSecret`, `_ga`, `client_id`, `clientId`, `Analytics 4`,
    `mp/collect` über docs/ und src/; Positivkontrolle: `GA4` trifft src/, `Measurement Protocol`
    trifft docs/. In src/ steht kein GA4-Code; einzige inhaltliche Stelle ist der Docblock von
    `buildIngestEventsRequest` (src/lib/capi/google-payload.ts): `eventName` "Pflicht nur fuer GA4".
(2) VORBEDINGUNG "DIE DATENKLASSEN-GRENZE IST BERÜHRT" — NICHT ERFÜLLT. Ob eine selbst vergebene,
    stabile Besucher-Kennung ein fingerprint-artiges Merkmal ist, ist eine offene OWNER-Frage:
    docs/claude-history/phase-11.7-anbieter-befunde.md, Zuschnitt-Frage P11.7-4; verdichtet in
    docs/claude-history/backlog-polish.md, "Zuschnitt-Fragen P11.7-4, P11.7-12 und P11.7-18 …".
(3) DER ZIELSCHLÜSSEL 'google' IST VERGEBEN — an Google Ads: `TRACKING_TARGETS`
    (src/lib/settings.ts), `CONSENT_KEY_BY_TARGET` mit `google: "google"`
    (src/lib/tracking/consent-targets.ts), CHECK `project_secrets_target_valid` (Punkt (9)).
(4) KEIN AUSGELIEFERTES GOOGLE-TAG. Der ausgelieferte Text lädt als einziges Anbieter-Tag
    `fbevents.js` (`buildMetaRuntime`, src/lib/tracking/meta.ts). Achse: die Tag-Adressen
    `s.pinimg.com`, `analytics.tiktok.com`, `snap.licdn.com`, `googletagmanager.com`, `gtag/js`,
    `googleadservices` über src/ ohne Tests — Treffer nur in der Fremd-Erkennung
    (src/lib/foreign-signatures.ts); Positivkontrolle: `connect.facebook.net` in `buildMetaRuntime`.
    Für Google Ads OWNER-ENTSCHEIDUNG 2026-08-24: "KEIN VON PAGESMITH AUSGELIEFERTES GOOGLE-TAG"
    (docs/roadmap.md, Eintrag 11.2). Grenze: der Betreiber-Snippet der Phase 11.6 kann beliebige
    Tags tragen.
(5) DIE EINZIGE REPO-QUELLE ZUR HERKUNFT DER client_id ist ZWEITHAND und UNGEMESSEN:
    docs/claude-history/phase-11-multi-tracking-rohfassung.md, "(f) GA4 — GEPRÜFT (2026-08-03)" —
    "Die `client_id` steckt im `_ga`-Cookie, das gtag setzt". GELESEN vom Architekten am
    2026-08-03 im Web; die Rohfassung wird nicht gepflegt (CLAUDE.md, "## Detail-Archiv").
    Daneben, ebenfalls nur GELESEN: docs/ziel-befunde/google.md, Teil (f) (2026-08-20): das
    Measurement Protocol verlangt "ZWEI SKALARE — api_secret und measurement_id", kein OAuth;
    ebenda, Lauf 1 (2026-08-24): für Google-Analytics-Ziele der Data Manager API "clientId, userId,
    appInstanceId", nicht als abschliessend belegt; ebenda, Lauf 9 (2026-09-11): "GA4 IST IN
    KEINER FORM GELESEN WORDEN".
(6) DAS EINZIGE COOKIE, DAS UNSER CODE AUF DER KUNDENSEITE SETZT: `__Host-ps_v`
    (`VARIANT_COOKIE_NAME`, `serializeVariantCookie`, src/lib/hosting/variant.ts), gesetzt im
    `GET` von src/app/app-serve/route.ts nur bei aktivem A/B-Split und Neuzuweisung; Wert `a`
    oder `b`, Session-Cookie, host-only. Die Einwilligung liegt in `localStorage`
    (`CONSENT_STORE_KEY`, src/lib/tracking/consent-store.ts). Achse: `Set-Cookie`,
    `cookies().set`, `.cookies.set`, `document.cookie =` über src/ ohne Tests; die übrigen
    Treffer (OAuth-State-Cookie, Supabase-Middleware) liegen auf dem App-Origin.
(7) VON tsc ERZWUNGEN bei einem sechsten Mitglied von `TrackingTarget` (tsconfig.json schliesst
    Tests ein): `NORMALIZE_PIXEL_ID`, `USES_EVENT_AXIS` (src/lib/settings.ts) ·
    `CONSENT_KEY_BY_TARGET`, `LEGACY_CONSENT_ROLE` (src/lib/tracking/consent-targets.ts) ·
    `TARGET_CARDS` (src/lib/tracking/target-cards.ts) · `CLICK_ID_TABLE`
    (src/lib/capi/click-id-strip.ts) · `requiresTestCode` (src/lib/tracking/credential-state.ts,
    switch mit `never`) · `testModeAnbieterAuskunft` (src/components/TargetCard.tsx, switch mit
    `never`) · in Tests `ERWARTUNG`, `WAECHTER` (click-id-strip.test.ts), `SPY_BY_TARGET`
    (fan-out.test.ts). NUR BEI AUFNAHME IN `TARGETS_WITH_ADAPTER`: `FORWARDER_BY_TARGET`
    (src/lib/capi/ingest.ts). Achse: `Record<…Target`, `satisfies …Target`, `: never =`,
    `in TrackingTarget`.
(8) NICHT ERZWUNGEN: `TARGETS_WITH_ADAPTER` (src/lib/tracking/target-adapters.ts) und
    `TARGETS_WITH_TEST_MODE` (credential-state.ts) als Teilmengen · der CHECK
    `project_secrets_target_valid` (eigene Migration) · der CHECK `project_secrets_test_mode_je_ziel`
    (0029, `else`-Zweig fail-closed) · `ALL_CONSENT_KEYS` und `CONSENT_GROUP_KEYS` (abgeleitet,
    Bindungen P11.9-3, P11.9-4) · die Namensliste in `onConsoleLog` (vitest.config.ts) · die
    route-lokalen `GOOGLE_TARGET` (src/app/api/oauth/google/callback/route.ts, …/refresh/route.ts)
    und `SUPPORTED_TARGETS` (src/lib/oauth/token-refresh.ts) · `TABELLE`
    (src/lib/capi/version-deadlines.test.ts) · Signatur "Google-Tag" und
    `FOREIGN_GOOGLE_TAG_NOTE` (src/lib/foreign-signatures.ts, src/lib/foreign-scan.ts) · die
    Testdatei je Adapter mit S10-Block. ROT WERDEN, aber nicht durch tsc: `G0`
    (consent-bar.test.ts), die Literale `SIEBEN` bzw. `ps1:…` in consent-bar-, consent-modal-,
    consent-revoke-, consent-store-, pageview-emitter.resend- und custom-pixel-Tests, "ist genau
    {google}" (target-cards.test.ts, falls das neue Ziel kein Geheimnis-Feld hat), der
    Träger-Test in consent-targets.test.ts.
(9) `project_secrets_target_valid`: letzte definierende Migration
    supabase/migrations/0026_project_secrets_google.sql, Werte meta, pinterest, tiktok, linkedin,
    google. docs/db-stand.md: LIVE ABGELESEN am 2026-08-27 (Owner), dieselben fünf Werte. Ob
    heute so angewandt, ist am Repo nicht entscheidbar.

## Was den GA4-Bau bindet, ohne entschieden zu sein

**Bindung P11.9-3 — `ALL_CONSENT_KEYS` SETZT EINEN SECHSTEN ZIEL-SCHLÜSSEL VOR `analytics` UND
`custom`.** Die Ableitung beginnt mit `...TRACKING_TARGETS.map(...)`; ihr Kommentar
(src/lib/tracking/consent-targets.ts) sagt, ein Wert vor `analytics` "verschoebe einen
bestehenden Wert und machte jeden früheren Byte-Vergleich wertlos". Der Zuschnitt entscheidet die
Reihenfolge (Frage P11.9-10).

**Bindung P11.9-4 — `CONSENT_GROUP_KEYS` LEGT JEDEN NEUEN SCHLÜSSEL STILL IN "Werbung".**
`ads: ALL_CONSENT_KEYS.filter((k) => k !== ANALYTICS_CONSENT_TARGET)`
(src/lib/tracking/consent-choice.ts). Rot wird allein der Test `G0` (consent-bar.test.ts); die
Gruppe ist Entscheidung (25) der Phase 11.5 (Frage P11.9-9).

**Bindung P11.9-5 — "cns FEHLT" ENTSCHEIDET NICHT `consentAllows`, SONDERN `allowedTargets`.**
Fehlt das Feld, lässt `allowedTargets` (src/lib/capi/ingest.ts) allein die Ziele mit
`LEGACY_CONSENT_ROLE` durch (heute nur meta); `consentAllows` (src/lib/tracking/consent-wire.ts)
wird in diesem Fall nicht gerufen. Ein neues Ziel trägt `LEGACY_CONSENT_ROLE: false`; der
Träger-Test in consent-targets.test.ts verlangt genau einen Träger.

## Owner-Fragen, fällig nach der GA4-Lesung

Keine davon ist vor der Lesung zu entscheiden (Entscheidung P11.9-1).

- **Frage P11.9-6 — DER WEG:** Measurement Protocol (zwei Skalare) oder Data Manager API
  (Allowlist, OAuth)? Material: docs/ziel-befunde/google.md, Teil (f).
- **Frage P11.9-7 — DIE HERKUNFT DER client_id:** (a) eigene, vom Produkt gesetzte Kennung — dann
  der Weg des fingerprint-artigen Merkmals (Vermerk P11.9-2, Punkt (2)); (b) `_ga` aus einem vom
  Betreiber selbst eingebundenen gtag — dann fremde Herkunft, Nähe zu Teil (E2); (c) keine.
- **Frage P11.9-8 — DIE IMPORT-BEREINIGUNG:** Bei (b) entfernt das Angebot "Google-Tag"
  (`FOREIGN_GOOGLE_TAG_NOTE`, src/lib/foreign-scan.ts) die Quelle der Kennung.
- **Frage P11.9-9 — DIE EINWILLIGUNGSGRUPPE:** "Messung" oder "Werbung" (Bindung P11.9-4)?
- **Frage P11.9-10 — DIE REIHENFOLGE IN `ALL_CONSENT_KEYS`** (Bindung P11.9-3).
- **Frage P11.9-11 — DER ZIELSCHLÜSSEL** in `TRACKING_TARGETS`, im CHECK und in
  `CONSENT_KEY_BY_TARGET`; alle drei sind Einbahnstrassen, 'google' ist vergeben (Vermerk P11.9-2,
  Punkt (3)).
- **Frage P11.9-12 — DER TESTMODUS:** `requiresTestCode` und `testModeAnbieterAuskunft`
  verlangen je einen Zweig; ein Befund dazu fehlt.

## Register der Phase 11.9

Je Eintrag Zieldatei und wörtlicher Titelanfang; Titel ohne Überschriften-Marke.

POSTEN, DEREN TRIGGER EIN GA4-ZUSCHNITT AUSLÖST:
- docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.2 gehoben (2026-09-08) —
  Vorrats-Punkte aus docs/aktiver-stand-vorrat.md", Eintrag 63: "DIE 110 ZEIGER AUF "11.2" IN DER
  GEPFLEGTEN DOKU SIND NICHT KLASSIFIZIERT." — Trigger "die erste Arbeit an GA4 — spätestens ein
  Zuschnitt der Zeile 11.9 —, ODER …".
- docs/claude-history/phase-11.7-anbieter-befunde.md, Vorrat P11.7-2: "DER HALBSATZ AN DER
  ROADMAP-ZEILE 11.9 TRÄGT DIE ENGERE BESCHREIBUNG …" — Trigger "der Zuschnitt von GA4";
  ERLEDIGT 2026-09-25 laut Sichtung IV desselben Archivs (datierter Nachtrag an der Zeile 11.9).

VORRAT DIESER PHASE, DIREKT IM BACKLOG ABGELEGT (docs/claude-history/backlog-polish.md,
Abschnitt "Nachtrag 2026-09-25 (Phase 11.9, erste Aufklärung) — zwei Kommentare …"):
- Vorrat P11.9-13: "DER KOMMENTAR AN `listConfiguredTargets` …" — Testknopf-Satz, Gate-Muster.
- Vorrat P11.9-14: "DIE FUNDSTELLEN-LISTE IN `src/lib/tracking/target-adapters.ts` …".

MATERIAL OHNE TRIGGER, ZUR VORBEDINGUNG 2:
- docs/claude-history/backlog-polish.md: "Zuschnitt-Fragen P11.7-4, P11.7-12 und P11.7-18 —
  `external_id` BZW. `externalIds` IST …" — "KEIN TRIGGER".

POSTEN IN docs/offene-punkte.md, DEREN TRIGGER DIESE PHASE AUSLÖSEN KANN (Titel und Trigger
wörtlich im Stub in CLAUDE.md, "## Offene Punkte"):
- "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" — Click-IDs, fingerprint-artige Merkmale.
- "DIE VERLUSTRATEN-AGGREGATION IST ZIEL-BLIND …" — ein weiteres Ziel mit Browser-Tag.
- "CONVERSIONS AUF FOLGESEITEN TRAGEN BEI KEINEM ZIEL EINE KLICK-KENNUNG …" — Befassung mit der
  dritten Datenklasse, Cookie-Weg.
- "KEINE KLICK-KENNUNG IST AN EINEM ECHTEN ANZEIGENKLICK GEPRÜFT …" — je Ziel.
- "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN …" — Ursachen (4) und (5).
- "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST" — bereits eingetreten.
- "DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT" — nicht-additive Migration.
- "DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026" — neue Tabelle in public.
- "DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER PROJEKTREGEL AB" — neue DB-Funktion.
- "COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH" — falls ein Cookie
  hinzukommt.
- "ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI …" — EINGETRETEN mit der
  Anlage dieser Datei; kein Abschnittstitel hier steht anderswo im Repo (GEMESSEN, CC,
  2026-09-25).

## Nächster Schritt der Phase 11.9

Die GA4-Anbieter-Lesung nach docs/immer-beachten.md, "ANBIETER-DOKUMENTATION WIRD
ABSCHNITTSWEISE GELESEN …". Ihre Fragen legt der Crawl-Prompt fest; diese Datei entwirft keine.
