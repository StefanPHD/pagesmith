# Phase 13 — E-Mail-/ESP-Webhooks: DER AKTIVE STAND

**PFLICHT-GATE:** Diese Datei ist ab ihrer Anlage (2026-09-28) das Pflicht-Gate ("Auftrag 0")
jedes Bau- und Aufklärungs-Prompts der Phase 13 (CLAUDE.md, "## Aktiver Stand — Verfahren ab
Phase 10"). Verfahren: docs/arbeitsweise.md, "Die Standdatei".

**GEGENSTAND:** Roadmap-Zeile 13 (docs/roadmap.md). Die erste Arbeit der Phase ist der Datenweg
der Formulare samt Danke-Seite (Entscheidung P12.5-47 der Phase 12.5; hier Entscheidung P13-2
und Setzung P13-5). "Webhooks auf Performance-Events" aus dem Grundtext der Zeile ist ein
anderer Gegenstand und eine spätere Scheibe (Setzung P13-9).

**NUMMERN:** eine durchlaufende Reihe `P13-n` über alle Gattungen, Gattung vorn (Vermerk P13-1,
Entscheidung P13-2, Setzung P13-5 …) — dieselbe Form wie in den Phasen 11.9 und 12.5. Nummern
werden nie neu vergeben.

**ZWEI KLASSEN VON FESTLEGUNGEN, GETRENNT GEFÜHRT:** OWNER-ENTSCHEIDUNG (bindend) und
ARCHITEKTEN-SETZUNG (revidierbar). Eine Setzung trägt je Grund und Grenze.

**FORM:** nur harte Angaben, je mit Fundstelle (Symbolname, nie Zeilennummer) und Provenienz.

## Abschnitte der Standdatei 13

- Aufklärung zur Phase 13 vom 2026-09-28
- Owner-Entscheidungen zur Phase 13 vom 2026-09-28
- Architekten-Setzungen zur Phase 13 vom 2026-09-28
- Noch nicht geschnittene Arbeit
- Vorrat (gemeldet, nicht gebaut)

## Aufklärung zur Phase 13 vom 2026-09-28

**Vermerk P13-1 — erste Aufklärung der Phase 13 (KEIN BAU, daher kein Bau-Commit: die
Aufklärung war read-only und hat keine Zeile Code und keine Datei erzeugt; CC, 2026-09-28, HEAD
`78136ab`).** KLASSEN: GELESEN AM CODE = am Repo gelesen, nicht live gemessen · ABGELEITET =
aus Code oder Spezifikation geschlossen, nicht gemessen · NICHT ENTSCHEIDBAR = am Repo nicht zu
beantworten. KEIN BEFUND DIESES VERMERKS IST LIVE GEMESSEN.

(1) RICHTUNG DER ROADMAP-ZEILE 13 (GELESEN, docs/roadmap.md, Zeile 13).
    · Grundtext: "Pagesmith wird KEIN Versender … stattdessen Webhooks auf Performance-Events,
      der Kunde behält seinen bestehenden ESP" — Richtung: wir senden an den Kunden.
    · Die dorthin verwiesene Lesart (b) der Phase 11.6 — "ein SERVER-seitiger Empfänger mit
      KUNDENEIGENEM Endpunkt" mit SSRF-Schutz, Instanz-Achse, dynamischem Nutzlast-Mapping —
      ist ebenfalls ausgehend.
    · "Ein ESP sendet an uns" steht in der Zeile nicht. Anbieter nennt sie keine.
    · Nachtrag 2026-09-26: erste Scheibe ist die Danke-Seite (Vorrat P12.5-29). Nachtrag
      2026-09-28: die Kollision mit (I4) der Scheibe 1b (1c als ABLEITUNG) und der
      Owner-Einwand "Nutzer wollen die Danke-Seite im Tool eintragen, nicht im
      Formular-Code".
    DREI GEMELDETE WIDERSPRÜCHE (ABGELEITET, in der Aufklärung nicht aufgelöst):
    (a) Der Grundtext nennt "Performance-Events", Entscheidung P12.5-47 nennt "FORMULAR-DATEN,
        ESP-WEBHOOKS"; ob das derselbe Gegenstand ist, sagt keine Zeile. — aufgelöst durch
        Setzung P13-9.
    (b) Der Verwerfungsgrund von P12.5-47 ("wirkte funktionsfähig, während Leads
        verschwinden") trifft eine erste Scheibe, die die Danke-Seite OHNE Datenweg baut. —
        aufgelöst durch Setzung P13-5.
    (c) "Datenspeicherung" (P12.5-47) steht neben der Festlegung vom 2026-08-15 im offenen
        Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE": keine fremden
        Nutzer-Identitäten in der eigenen Datenbank. — aufgelöst durch Entscheidung P13-2
        ("keine Ablage bei Pagesmith").

(2) VORBESTAND (GELESEN AM CODE).
    · KEIN Mapping-Typ für Formulare oder Webhooks: `Mapping` (src/lib/mappings.ts) kennt genau
      `redirect`, `text`, `track`; dazu ein Kommentar "Kuenftig analog z.B. | { type:
      "webhook"; … }". Achse `webhook` über src/: nur dieser Kommentar und ein
      Fixture-Kommentar (src/lib/__fixtures__/sample-landingpage.html).
    · KEIN Code liest Feldwerte eines Formulars. Achse `FormData|\.elements\b|input\[|
      serialize.*form` über src/ ohne Testdateien: nur Selektoren. POSITIVKONTROLLE derselben
      Suche: `BUTTON_SELECTOR` (src/lib/detect.ts) trifft mit `input[type="submit"]`.
    · Im Bestand der Doku (GELESEN): docs/claude-history/phase-2-3-foundation.md, "Universal
      Webhook (Zapier / Make) … Formulardaten direkt an eine vom User hinterlegte Webhook-URL
      … KEINE Direkt-Connectoren pro Anbieter"; docs/claude-history/future-roadmap.md,
      "Formular-Handling, nahe am künftigen Webhook-Primitiv (POST bei Submit)" und "Pagesmith
      speichert HEUTE KEINE Lead-PII".

(3) DER SUBMIT-WEG (GELESEN AM CODE, `buildWiringScript`, src/lib/generate.ts). Die Symbole
    `actionOwner`, `isSubmitButton`, `submittedForms` existieren dort.
    · Ein Listener `submit` an `document`, CAPTURE-Phase, in den Modi "export" und "preview",
      nicht in "edit". Im Export existiert er nur, wenn `injectScripts` wahr ist
      (`generateFunctional`).
    · Er nimmt `e.target`, verlangt `tagName === "FORM"`, prüft die Sperre `submittedForms`
      (einmal je Formular und Seitenleben), holt die Aktionen per `data-pagesmith-id`, führt
      AUSSCHLIESSLICH `track` aus (`trackAll`). KEIN `preventDefault`. Eine Weiterleitung
      führt ein Formular nicht aus.
    · Ein Formular gilt als abgeschickt, sobald `submit` eintrifft — auch nach einem
      `preventDefault` (Test S6) oder `stopPropagation` (Test S7) des Betreibers.
    · Klick-Weg: ein `<form>` ist nie Eigentümer eines Klicks (E4/E5), ein Absende-Button wird
      auf null gesetzt (E8/E9, `isSubmitButton`: BUTTON oder INPUT, `el.form` gesetzt, `type`
      "submit" oder "image").
    · `action`, `method`, `target` des Formulars liest und ändert der Code nicht.
    (I4) BEIDER SCHEIBEN IM WORTLAUT (Archiv der Phase 12.5):
    · Scheibe 1b: "Die Formular-Aktion des Betreibers (Ziel, Methode, Absenden) wird durch
      einen Track nicht verändert — kein preventDefault für einen Track." Wächter S1
      (src/lib/generate.test.ts), Mutation N5.
    · Scheibe 1c: "Das native Abschicken des Betreibers bleibt unberührt; kein preventDefault
      von uns." Wächter U1, Mutation M7; U0 Positivkontrolle.
    · "R1" ist im Archiv der Phase 12.5 NICHT als Wortlaut definiert; es steht nur im Namen
      des Tests S8 ("… (R1)"), dessen Kommentar Entscheidung P12.5-23 nennt.

(4) GRENZEN EINER BUBBLE-HYPOTHESE (ABGELEITET aus der HTML-Spezifikation, NICHT GELESEN;
    Frage des Architekten: ein zweiter Listener in der Bubble-Phase, der `defaultPrevented`
    prüft und nur dann greift).
    · Ein Bubble-Listener an `document` läuft NACH: Capture-Handlern, Handlern am Formular
      (Target-Phase), Inline-`onsubmit`, Bubble-Handlern der Vorfahren, FRÜHER registrierten
      `document`-Bubble-Handlern.
    · Er läuft VOR: SPÄTER registrierten `document`-Bubble-Handlern (unser Skript steht am
      Ende von `body`, `generateFunctional`; spätere Bindungen aus `DOMContentLoaded`/`defer`
      liegen dahinter) und allen `window`-Bubble-Handlern. Was diese tun, sieht er nicht.
    · `requestSubmit()` löst `submit` aus; `form.submit()` löst KEIN `submit` aus — weder der
      heutige noch ein zweiter Listener sehen es.
    · NICHT ENTSCHEIDBAR am Code: das Zusammenspiel mit nachlaufenden AJAX-Handlern (Live-
      bzw. Probe-Achse).

(5) DIE AUSNAHME-LISTE DER DAUERREGEL "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR
    LAUFZEIT EINEN FREMDEN KNOTEN AN" (GELESEN, docs/immer-beachten.md). Die Regel verbietet
    Änderungen an Stil, Klasse, Attribut, Scroll-Position, Fokus fremder Knoten — ein weiterer
    Listener an `document` und ein `preventDefault` auf `submit` ändern keines davon. Die
    Liste des ausdrücklich Nicht-Erfassten nennt aber genau "die drei Wiring-Listener an
    `document` (click, auxclick, submit) samt `preventDefault` beim Redirect". Ein vierter
    Listener oder ein `preventDefault` beim Abschicken steht NICHT darin. BEFUND: vom Wortlaut
    nicht erfasst, von der Aufzählung nicht gedeckt — dieselbe Lage, in der Entscheidung
    P12.5-27 der Phase 12.5 die Liste nachgezogen hat.

(6) EXPORT-PFAD UND FREIGABEN (GELESEN AM CODE).
    · Exporte beaconen an die absolute Adresse aus `getCapiProxyUrl` (src/components/
      CodeImporter.tsx, `${NEXT_PUBLIC_APP_URL}/api/e`), gehostete Seiten relativ an `/api/e`;
      `text/plain`-Blob per `sendBeacon`.
    · CORS am Ingest (`CORS_HEADERS`, src/lib/capi/ingest.ts): `Access-Control-Allow-Origin: *`,
      `POST, OPTIONS`, `Content-Type`.
    · APP-HOST: `updateSession` (src/lib/supabase/middleware.ts) gibt ohne Sitzung nur
      `/login`, `/api/capi*` und exakt `/api/e` frei; alles andere geht auf `/login`.
    · SERVING-HOST: `proxy` (src/proxy.ts) lässt nur `/api/e` und `/api/capi` durch, alles
      andere wird auf `/app-serve` umgeschrieben.
    · FOLGE (ABGELEITET): ein neuer öffentlicher Endpunkt bei uns bräuchte Freigaben in BEIDEN
      Dateien — Kern-Dateien, HISTORIE-CHECK. Exporte sind nach der Einbahnstrassen-Regel nicht
      nachzuziehen; den PageView-Emitter spritzt nur `publishProject` ein.

(7) KEINE ERKENNUNG VON EINGABEFELDERN (GELESEN AM CODE). `CANDIDATE_SELECTOR`
    (src/lib/detect.ts) = `BUTTON_SELECTOR`, `form`, `a[href]`; `TEXT_SELECTOR` = h1–h6, p.
    Eingabefelder bekommen keine ps-ID; `DetectedElement` kennt die Felder eines Formulars
    nicht. `input type=file`: Achse `type="file"|type=file|'file'|"file"` über src/lib ohne
    Testdateien — 0 Treffer; POSITIVKONTROLLE derselben Achse mit `submit` trifft
    `BUTTON_SELECTOR`.

(8) WAS DIE EINWILLIGUNGS-SCHLÜSSEL GATEN (GELESEN AM CODE). Sieben Schlüssel in
    `ALL_CONSENT_KEYS` (src/lib/tracking/consent-targets.ts): meta, pinterest, tiktok,
    linkedin, google, analytics, custom. Achse `__psConsent(|__psConsentAll(|consentAllows(|
    allowedTargets(` über src/ ohne Testdateien — Treffer ausschliesslich im Tracking:
    `__psMetaFire` (src/lib/tracking/meta.ts), der Fan-Out am Ingest (`consentAllows`,
    `allowedTargets`), der PageView-Emitter (analytics), `__psCustomOk` (custom). Weiterleitung
    und Abschicken sind NICHT gegatet. Gruppen (`CONSENT_GROUP_KEYS`,
    src/lib/tracking/consent-choice.ts): "Messung" = analytics, "Werbung" = alle übrigen
    einschliesslich custom.

(9) DIE VIER DIFFERENZ-NACHWEISE DES KLICK-SKRIPTS (GELESEN AM CODE; Entscheidung P12.5-14 der
    Phase 12.5).
    · W1' und W2' — src/lib/own-blocks-waechter.test.ts, Block "Byte-Waechter: der
      ausgelieferte Text eines SAUBEREN Projekts".
    · T1 — src/lib/tracking/consent-setter.test.ts ("… plus GENAU E1–E9").
    · T9 — src/lib/tracking/custom-pixel.test.ts ("… plus GENAU E1–E9").
    Jeder pinnt den Text aus `generateFunctional(…, "export")` als Vorher-Wert plus genau die
    Einsetzungen E1–E9, je Datei eigens abgetippt; E6 ist der Submit-Listener, zusammengesetzt
    (`E6_VOR`, Track-Text, `E6_NACH`). JEDE Änderung am Submit-Weg berührt alle vier. NICHT
    berührt: T10 in src/lib/tracking/custom-pixel.test.ts (anderer Block).

(10) IM BESTAND GENANNTE ESP UND WERKZEUGE (GELESEN; Achse: zwanzig Anbieternamen über
     docs/roadmap.md, docs/claude-history/future-roadmap.md,
     docs/claude-history/backlog-polish.md, docs/claude-history/phase-2-3-foundation.md und
     CLAUDE.md): Klaviyo, Mailchimp, ActiveCampaign, Zapier, Make
     (docs/claude-history/phase-2-3-foundation.md). ActiveCampaign zusätzlich als nicht
     erkannte Signatur (Vorrat P11.11-8 der Phase 11.11) — eine Erkennungslücke, kein
     ESP-Anschluss. docs/claude-history/future-roadmap.md nennt keinen Anbieter.

(11) DER STOPP-PUNKT DER AUFKLÄRUNG — Feldwerte im Query-String reisen über `eventSourceUrl` an
     `/api/e` und an drei Adapter (ABGELEITET, NICHT GEMESSEN). Volltext, Grenzen und Trigger:
     docs/offene-punkte.md, Eintrag "DIE SEITENADRESSE REIST SAMT QUERY AN UNSEREN SERVER UND
     AN DREI ZIELE — WAS IM QUERY STEHT, REIST MIT" (Entscheidung P13-3). Hier nicht
     verdoppelt.

## Owner-Entscheidungen zur Phase 13 vom 2026-09-28

PROVENIENZ aller fünf: OWNER-ENTSCHEIDUNG 2026-09-28 — P13-2 bis P13-4 übermittelt im Auftrag
der Doku-Runde desselben Tages, P13-7 im Auftrag der Korrektur-Runde desselben Tages, P13-15 im
Auftrag der Anbieter-Lesung Make desselben Tages. BINDEND.

**Entscheidung P13-2 — DER DATENWEG DER FORMULARE IST BROWSER-DIREKT.** Der Browser schickt die
Formularfelder DIREKT an eine Adresse, die der Nutzer im Tool einträgt — eine generische
Webhook-Adresse (Make, Zapier) oder der Formular-Endpunkt eines ESP. Unser Server sieht keinen
Klartext; es gibt keine Ablage bei Pagesmith.
VERWORFEN: (a) die Weiterleitung über unseren Server; (b) das native Abschicken an die
eingetragene Adresse mit der Danke-Seite beim Empfänger.

**Entscheidung P13-3 — DER STOPP-PUNKT DER AUFKLÄRUNG WIRD ALS OFFENER PUNKT GEFÜHRT;** die
Behebung liegt vor echtem Traffic. Ort: docs/offene-punkte.md, Eintrag "DIE SEITENADRESSE
REIST SAMT QUERY AN UNSEREN SERVER UND AN DREI ZIELE — WAS IM QUERY STEHT, REIST MIT".

**Entscheidung P13-4 — TESTEMPFÄNGER SIND VORHANDEN:** Make, Brevo, systeme.io, je als Konto
des Owners. (OWNER-ANGABE; am Repo nicht belegbar.)

**Entscheidung P13-7 — DIE HASH-AUFLAGE VOM 2026-08-19 GILT FÜR TRACKING-ZIELE UND UNSEREN
SERVER; FORMULARINHALTE AN DIE EINGETRAGENE ADRESSE REISEN IM KLARTEXT — UND AUSSCHLIESSLICH
DORTHIN.**
DIE REICHWEITE: Die Auflage vom 2026-08-19 im offenen Punkt "DATENKLASSEN-GRENZE VOR DER
ERSTEN PII-SCHEIBE" ("E-MAIL UND TELEFON: im Browser gehasht (SHA-256), der eigene Server
sieht KEINEN Klartext") gilt für Daten an Tracking-Ziele und an unseren Server.
Formularinhalte, die unser ausgeliefertes Skript an die vom Betreiber eingetragene Adresse
schickt (Entscheidung P13-2), reisen im Klartext.
DAS BINDENDE GEGENSTÜCK: Formularinhalte gehen AUSSCHLIESSLICH an die eingetragene Adresse —
nie an `/api/e`, nie an ein Tracking-Ziel, nie in unsere Datenbank, nie in unsere Logs. Die
Bau-Scheibe beweist das mit einem Test.
DER TRIGGER DER DATENKLASSEN-GRENZE IST DAMIT EINGETRETEN; diese Entscheidung ist seine
Bewertung für Phase 13. Nachgetragen am Punkt selbst (docs/offene-punkte.md, Ergänzung vom
2026-09-28) und im Stub in CLAUDE.md.
DIE GRENZE: Die Klarstellung betrifft AUSSCHLIESSLICH Formularinhalte an die eingetragene
Adresse. Für Match-Felder an Tracking-Ziele gilt die Auflage unverändert.
EIN BEZUG, ABGELEITET (CC, 2026-09-28), KEINE ENTSCHEIDUNG: Gerieten Formularinhalte in die
Seitenadresse — etwa als Query einer Danke-Seite —, reisten sie über `eventSourceUrl` an
`/api/e` und an drei Ziele, und das Gegenstück bräche (docs/offene-punkte.md, "DIE
SEITENADRESSE REIST SAMT QUERY AN UNSEREN SERVER UND AN DREI ZIELE — WAS IM QUERY STEHT,
REIST MIT").

**Entscheidung P13-15 — DIE BEFUNDE ÜBER FORMULAR-EMPFÄNGER STEHEN IN EINER NEUEN DATEI:
docs/formular-empfaenger-befunde.md.** Sie beantwortet die offene Frage des Ablageorts aus
Arbeit P13-11 (Weg 8, "Keine neue Datei ohne Owner-Entscheidung"). Die Datei trägt Kopf,
vorläufigen Fragenkatalog und je Empfänger einen Abschnitt; in CLAUDE.md, "## Aktive
Dokumente", steht ein Eintrag. Die Liste "WOHIN EIN NEUER SATZ GEHÖRT" ist NICHT angefasst —
dafür folgt ein eigener Änderungsantrag.

## Architekten-Setzungen zur Phase 13 vom 2026-09-28

PROVENIENZ aller fünf: ARCHITEKTEN-SETZUNG 2026-09-28, übermittelt im Auftrag der Doku-Runde
desselben Tages; P13-6 in der Fassung der Korrektur-Runde desselben Tages. REVIDIERBAR; ein
Owner-Widerspruch hebt jede auf.

**Setzung P13-5 — DIE ERSTE SCHEIBE: NUR AUSDRÜCKLICH VERSEHENE FORMULARE, DATENWEG UND
DANKE-SEITE NUR ZUSAMMEN.** Erfasst sind allein Formulare, die der Nutzer im Tool ausdrücklich
mit einem Ziel versieht. Datenweg und Danke-Seite kommen nur zusammen, nie die Danke-Seite
allein. Formulare mit eigener `action` oder eigenem Skript bleiben unberührt. Datei-Felder sind
nicht Teil der ersten Scheibe.
GRUND: der Verwerfungsgrund von Entscheidung P12.5-47 ("mit Danke-Seite wirkte es
funktionsfähig, während Leads verschwinden"); Widerspruch (b) in Vermerk P13-1, Punkt (1).
GRENZE: Wie ein Formular mit "eigenem Skript" erkannt wird, ist nicht festgelegt — am Code gibt
es dafür kein Merkmal (Vermerk P13-1, Punkt (4)).

**Setzung P13-6 — DIE EINGETRAGENE ADRESSE IST KEIN GEHEIMNIS UND GEHÖRT NICHT NACH
project_secrets.** Sie steht öffentlich im ausgelieferten Text.
FOLGE FÜR DEN OFFENEN PUNKT "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets
BLEIBT": Trigger (i) TRITT MIT PHASE 13 EIN — er nennt "insbesondere die Phase 13, falls sie
kundeneigene Endpunkte vorsieht", und Entscheidung P13-2 sieht sie vor. DIE NEUBEWERTUNG
ERGIBT: Die Eindeutigkeit auf (project_id, target) bleibt unberührt, weil die Adressen nicht
in project_secrets liegen. Nachgetragen am Punkt selbst (docs/offene-punkte.md, Ergänzung vom
2026-09-28) und im Stub in CLAUDE.md.
GRENZE: Die Neubewertung kippt, sobald ein Weg über unseren Server gewählt wird.

**Setzung P13-8 — EINWILLIGUNG.** Das Abschicken an die eigene Adresse des Betreibers ist kein
Tracking und liegt ausserhalb des Einwilligungs-Gates.
GRUND: die Haltung "Wir sind Werkzeug, nicht Aufsicht" (docs/arbeitsweise.md, 4b, "Haltung").
GRENZE: Ein Owner-Widerspruch bleibt möglich. Befund dazu: Vermerk P13-1, Punkt (8) — heute
gatet kein Schlüssel etwas ausserhalb des Trackings.

**Setzung P13-9 — "WEBHOOKS AUF PERFORMANCE-EVENTS" IST EIN ANDERER GEGENSTAND** (Grundtext der
Roadmap-Zeile 13) und eine spätere Scheibe. Die dorthin verwiesene Lesart (b) der Phase 11.6
bleibt dort.

**Setzung P13-10 — ERSTER TESTEMPFÄNGER IST MAKE** (generische Adresse); Brevo und systeme.io
danach als Gegenprobe für ESP-Formular-Endpunkte.

## Noch nicht geschnittene Arbeit

**Arbeit P13-11 — ANBIETER-LESUNG MAKE VOR JEDER ANBINDUNG** (Dauerregel "EIN NEUER ANBIETER
WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN UND DIE BEFUNDE
VERORTET SIND …", docs/immer-beachten.md). Formular-Empfänger sind eine neue Anbieter-Klasse;
sie bekommt einen eigenen Fragenkatalog, abgeleitet aus dem Zuschnitt und als VORLÄUFIG
gekennzeichnet. OFFEN, OWNER-ENTSCHEIDUNG VOR DER LESUNG: der ABLAGEORT der Befunde über
Formular-Empfänger — sie sind weder Fan-Out-Ziel noch Plattform-Anbieter, also Weg 8 ("Keins
davon → nachfragen. Keine neue Datei ohne Owner-Entscheidung", docs/arbeitsweise.md, "Wohin ein
neuer Satz gehört"). PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-28.
ABLAGEORT ENTSCHIEDEN durch Entscheidung P13-15. ERGEBNIS (CC, 2026-09-28): die Lesung ist
ausgeführt und abgelegt in docs/formular-empfaenger-befunde.md — vorläufiger Fragenkatalog
K1 bis K7, Abschnitt "Make", Befunde (a) bis (r), Messkandidaten M1 bis M11. KEINE Angabe
darin ist gemessen; offen nach der Lesung u. a. CORS und Preflight (Befund (f)), `text/plain`
(Befund (a)) und der Status bei ausgeschaltetem Szenario (Befund (i)).

**Arbeit P13-12 — BEKANNTE SCHWÄCHEN DES WEGS, die Lesung oder Plan beantworten müssen**
(ARCHITEKTEN-SETZUNG 2026-09-28; jede Schwäche ABGELEITET, keine gemessen):
· Die Zustellung ist vom Browser aus nicht bestätigbar — bei falscher Adresse erscheint die
  Danke-Seite trotzdem.
· Ob Werbeblocker die fremde Adresse blockieren, ist ungemessen.
· Die öffentliche Adresse ist spam-anfällig.
· Einbahnstrasse und Neu-Veröffentlichen: was im ausgelieferten Text steht, bekommt man nicht
  zurück, und eine Änderung wirkt erst nach erneutem Veröffentlichen (docs/immer-beachten.md,
  "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE …"; docs/offene-punkte.md,
  "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST").

**Arbeit P13-13 — AUFLAGEN AN DEN ZUSCHNITT** (ARCHITEKTEN-SETZUNG 2026-09-28):
· (I4) der Scheibe 1c der Phase 12.5 ausdrücklich für den neuen Aktionstyp abgrenzen.
· Die Ausnahme-Liste der Dauerregel "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT
  EINEN FREMDEN KNOTEN AN" nachziehen (Vermerk P13-1, Punkt (5)).
· Eine Einsetzung in ALLEN vier Differenz-Nachweisen (Vermerk P13-1, Punkt (9); Entscheidung
  P12.5-14 der Phase 12.5).
· Die Frage "Mapping-Typ oder Einstellung" beantworten. Fällt sie auf den Einstellungs-Blob,
  greift der offene Punkt "`settingsEqual` IST EINE ALLOWLIST — JEDES NEUE MITGLIED DES
  EINSTELLUNGS-BLOBS IST FÜR dirty UNSICHTBAR BY DEFAULT …".

## Vorrat (gemeldet, nicht gebaut)

**Vorrat P13-14 — EIN POST-FORMULAR OHNE `action` AUF EINER GEHOSTETEN SEITE LÄUFT MIT SEINEM
RUMPF IN DIE VERCEL-ROUTE `/app-serve`** (ABGELEITET am Code, CC, 2026-09-28; NICHT gemessen).
`proxy` (src/proxy.ts) schreibt auf dem Serving-Host jeden Pfad ausser `/api/e` und `/api/capi`
auf `/app-serve` um; die Serve-Route (src/app/app-serve/route.ts) exportiert nur `GET`. Der
Rumpf des Abschickens — bei einem Datei-Feld Datei-Bytes — erreicht damit eine Vercel-Route.
UNGEMESSEN: der Antwortcode (erwartet 405, Kenntnis des Next-Verhaltens, nicht gelesen) und ob
die Plattform den Rumpf überhaupt annimmt. BEZUG: Dauerregel "MEDIENBYTES LAUFEN NIE ÜBER
UNSERE VERCEL-ROUTEN — UND DAS GILT FÜR JEDE AUSLIEFERUNG VON DATEI-BYTES, NICHT NUR FÜR MEDIEN"
(docs/immer-beachten.md). KEIN TRIGGER GESETZT.
