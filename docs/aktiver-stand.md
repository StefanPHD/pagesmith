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
- Zuschnitt Scheibe 13-1
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

## Zuschnitt Scheibe 13-1

**ABGESCHLOSSEN AM 2026-09-28 — Bau-Commit `434dc86`, Live-Test bestanden; Abschluss-Vermerk
P13-35.**
- Der Zuschnitt ist verdichtet: Hier stehen nur noch die Entscheidungen, Setzungen und
  Invarianten, die über die Scheibe hinaus binden, dazu die Vermerke der Scheibe.
- Was gestrichen ist und wo sein Inhalt steht: Vermerk P13-35, Punkt (8).

### Owner-Entscheidungen zur Scheibe 13-1

PROVENIENZ beider: OWNER-ENTSCHEIDUNG 2026-09-28, übermittelt im Auftrag der Zuschnitt-Runde
desselben Tages. BINDEND.

**Entscheidung P13-16 — ZU JEDER ZIELADRESSE GEHÖRT PFLICHT EINE DANKE-SEITE.** Ohne
Danke-Seite ist kein Ziel speicherbar.

**Entscheidung P13-17 — ERREICHEN DIE DATEN DIE ADRESSE NICHT, BLEIBT DAS FORMULAR STEHEN.**
Fälle: ein Blocker, keine Verbindung. Das Formular bleibt, eine eigene Meldung erscheint, der
Besucher kann erneut senden.
VERWORFEN: trotzdem zur Danke-Seite. GRUND: der Verwerfungsgrund von Entscheidung P12.5-47 der
Phase 12.5 — "mit Danke-Seite wirkte es funktionsfähig, während Leads verschwinden".

### Architekten-Setzungen zur Scheibe 13-1

PROVENIENZ aller vier: ARCHITEKTEN-SETZUNG 2026-09-28, übermittelt im Auftrag der
Zuschnitt-Runde desselben Tages. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.

**Setzung P13-18 — DER SCHNITT: 13-1 UND 13-1b.** 13-1 trägt Laufzeit und Konfiguration; 13-1b
trägt den Testknopf im Editor.
GRUND: Eine falsche Adresse fängt das Signal aus Setzung P13-21 nicht; das soll 13-1b leisten.

**Setzung P13-19 — VERSAND ALS `application/x-www-form-urlencoded` AUS DEN FORMULARFELDERN.**
GRUND: docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befunde (t) (die Form wird mit
`Access-Control-Allow-Origin: *` angenommen), (v) (`text/plain` kommt als EIN ungeparstes Feld
`value` an), (w) (ein mehrfach vorkommender Name bleibt als Liste erhalten). GRENZE: gemessen an
EINEM Empfänger (Make, Zone eu2); Brevo und systeme.io sind ungemessen (Setzung P13-10).

**Setzung P13-20 — DER EDITOR BIETET EIN ZIEL NUR FÜR FORMULARE AN, DIE KEINE EIGENE FREMDE
ZIELADRESSE UND KEIN DATEI-FELD TRAGEN.**
GRUND: Setzung P13-5 (Formulare mit eigener `action` bleiben unberührt; Datei-Felder sind nicht
Teil der ersten Scheibe).
GRENZE:
- Was "fremd" heisst, legt Setzung P13-31 fest, gebaut in `formTargetCheck`: eine ABSOLUTE
  Adresse in `action` oder `formaction`. Relativ, `#` und leer zählen nicht.
- Das "eigene Skript" aus Setzung P13-5 bleibt am Code ohne Merkmal (Vermerk P13-1, Punkt (4)).
  Ein Inline-`onsubmit` ist nur ein Hinweis (Setzung P13-31).

**Setzung P13-21 — DAS SIGNAL "ERREICHT / NICHT ERREICHT": DER AUFRUF LÄUFT IM MODUS
`no-cors`; "ERREICHT" GILT NUR, WENN ER AUFGELÖST IST UND `r.type === 'opaque'` TRÄGT.** Jeder
andere Ausgang gilt als "nicht erreicht" und führt zu Entscheidung P13-17: ein Fehler, der Typ
`basic`, jeder andere oder unerwartete Typ.
PROVENIENZ: ARCHITEKTEN-SETZUNG 2026-09-28, in dieser Fassung nach der G0-Messung der Planrunde
(Vermerk P13-22). Dieselbe Setzung legt den Testknopf der Scheibe 13-1b auf den Modus `cors`.
Die frühere Fassung dieser Setzung nannte den Modus des Testknopfs nicht.
GRUND: Es wird positiv auf den EINEN Erfolgszustand geprüft, statt Fehlerbilder aufzuzählen —
fail-closed. Ein falsches "nicht erreicht" kostet einen erneuten Klick; ein falsches "erreicht"
kostet still den Lead.
WIDERLEGT, DIE FASSUNG VOR DER MESSUNG: "Ein Blocker lässt den Aufruf im Modus `no-cors`
scheitern; aufgelöst heisst erreicht". Beleg: Vermerk P13-22, N3 — uBlock Origin Lite leitet auf
eine lokale Datei um, der Aufruf löst mit Typ `basic` und Status 200 auf.
GRENZEN:
- Gemessen an einem Browser, einem Blocker und einer Umleitungsregel.
- Der harte Block (`net::ERR_BLOCKED_BY_CLIENT`) ist ABGELEITET — als Netzfehler, also Wurf —,
  nicht gemessen.
- Ein Blocker, der selbst eine `opaque`-Antwort erzeugt, ist nicht ausgeschlossen.
- An der Make-Adresse ist `opaque` im Erfolgsfall GEMESSEN (B0, Vermerk P13-35, Punkt (0)):
  `OK opaque 0` und ein Eingang bei Make; ein Browser, eine Zone (eu2).
- Eine falsche Adresse fängt dieses Signal nicht (Setzung P13-18; Beleg:
  docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befund (ac)).
BEZUG, KEINE ENTSCHEIDUNG: ebenda, Befunde (x) und (ad) — im Modus `cors` ist die
Standardantwort lesbar, und eine 410 wirft.

### G0-Messung der Planrunde

**Vermerk P13-22 — DER AUSGANG EINES `no-cors`-AUFRUFS UNTER BLOCKER UND OFFLINE** (GEMESSEN,
Browser, 2026-09-28; OWNER-ANGABE aus Konsole und Netzwerk-Tab; Einzeiler von CC). Ort war eine
veröffentlichte Seite unter publayer.net, Google Chrome 153.0.8010.53 (64-Bit), uBlock Origin
Lite (MV3), Filtermodus "Vollständig", Standard-Filterlisten. Jeder Aufruf lief als `POST` mit
`mode: 'no-cors'`, `keepalive: true` und einem Rumpf aus `URLSearchParams`; ausgegeben wurden
`r.type` und `r.status`.
- N3 — `https://ad.doubleclick.net/pagesmith-probe`, Blocker EIN: Konsole `OK basic 200`. Im
  Netzwerk-Tab 307 (Internal Redirect), danach 200 auf `noop.txt`. Der Blocker sperrt nicht hart,
  er leitet auf eine lokale Ersatzdatei um — der Aufruf LÖST AUF.
- N4 — dieselbe Adresse, Blocker AUS (Positivkontrolle zu N3): Konsole `OK opaque 0`. Im
  Netzwerk-Tab 404 bzw. `net::ERR_ABORTED`.
- N7 — die Make-Adresse, DevTools "Offline": Konsole `FEHLER TypeError Failed to fetch`. Im
  Netzwerk-Tab `net::ERR_INTERNET_DISCONNECTED`; bei Make kein Eingang.

Was die Make-Adresse selbst betrifft (N1, N2, N5, N6, und der erste Lauf "N3" an der Make-Adresse
unter Blocker), steht in docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befunde (ac) bis
(ae).
FOLGE: Setzung P13-21 in der heutigen Fassung.
GRENZE: ein Browser, ein Blocker. `r.type` ist in N1–N6 nicht ausgegeben worden.

### Invarianten der Scheibe 13-1

Sie binden über die Scheibe hinaus: Jede spätere Änderung am Formular-Ziel oder am Submit-Weg
misst sich daran. PROVENIENZ: ARCHITEKT 2026-09-28, Auftrag der Zuschnitt-Runde. Seit dem
Abschluss steht je Invariante ihr WÄCHTER dabei. Die Tests F…/G…/K… stehen in
src/lib/form-target.test.ts, F8 in src/app/projects/publish.test.ts, F14/F15 in
src/components/CodeImporter.test.tsx.
- I1 Formularinhalte gehen AUSSCHLIESSLICH an die eingetragene Adresse — nie an `/api/e`, nie an
  ein Tracking-Ziel, nie in unsere Datenbank oder unsere Logs (Entscheidung P13-7).
  WÄCHTER: F1 (einziger Test, der einen Weg an `/api/e` fängt; Mutation M-I1); dahinter die
  Laufzeit-Wache G1–G6 (keine Sendung bei kaputter Konfiguration, G3 allein für den gleichen
  Ursprung).
  GRENZE: Am Beacon ist I1 live NICHT gezeigt (Vermerk P13-35, Punkt (7)).
- I2 Keine Feldwerte in der Adresse der Danke-Seite — und damit nie in `eventSourceUrl`.
  WÄCHTER: F2, dazu F1, F3a, F3e, F3f, K3b, F9 (Mutation M-I2).
- I3 Zur Danke-Seite nur bei `r.type === "opaque"` (Setzung P13-21); sonst bleibt das Formular,
  eine eigene Meldung erscheint, ein erneuter Versuch ist möglich (Entscheidung P13-17).
  WÄCHTER: F3b, F3d, K3c (Mutation M-I3), dazu F3c (Wurf).
- I4 Formulare OHNE Ziel verhalten sich unverändert.
  DIE ABGRENZUNG IM WORTLAUT (ARCHITEKT 2026-09-28, Vorschlag der Planrunde, übernommen im
  Bau-Auftrag): "(I4) der Scheiben 1b und 1c gelten für Formulare OHNE Formular-Ziel
  unverändert (Wächter S1, U1). Für ein Formular MIT Ziel ersetzt unser `preventDefault` das
  native Abschicken: `action`, `method` und `target` des Betreibers wirken dann nicht mehr; die
  Daten gehen an die eingetragene Adresse, die Navigation an die Danke-Seite (Scheibe 13-1,
  I3)."
  WÄCHTER: S1, S4, S6, S7, U1 (src/lib/generate.test.ts), F5.
- I5 Projekte ohne ein Formular-Ziel bekommen byte-gleichen ausgelieferten Text — sie TRÄGT
  (seit dem Bau kein Kandidat mehr).
  WÄCHTER: W1′, W2′, T1, T9 (Mutation M-I5 fängt genau diese vier und F6b).
  LIVE GEMESSEN: Vermerk P13-35, Punkt (6), L1.
- I6 Kein fremder Knoten wird verändert (Stil, Klasse, Attribut, Scroll-Position, Fokus); die
  Meldung lebt im eigenen Schattenbaum.
  WÄCHTER: F10.
  Die zwei Eingriffe, die die Dauerregel ausdrücklich ausnimmt, stehen seit Entscheidung
  P13-24 in ihrer Ausnahme-Liste.
- I7 Adresse und Danke-Seite gehen nur über `embedInScript` in Script-Rohtext (der Datenblock,
  Setzung P13-28).
  WÄCHTER: F7.
- I8 Ein ungültiger oder unbekannter Wert lässt das Veröffentlichen laut abbrechen.
  WÄCHTER: F8 (Mutation N-B).
  Die BERECHTIGUNG eines Formulars prüft allein der Client (G5 im Vermerk P13-33).
- I10 Der Versand hängt an keinem Einwilligungs-Tor (Setzung P13-8).
  WÄCHTER: F9.

### Owner-Entscheidungen vor dem Bau der Scheibe 13-1

PROVENIENZ beider: OWNER-ENTSCHEIDUNG 2026-09-28, übermittelt im Bau-Auftrag der Scheibe 13-1.
BINDEND.

**Entscheidung P13-23 — 13-1 BAUT STRENG: EIN ZIEL NUR FÜR FORMULARE, DEREN EINGABEFELDER ALLE
EINEN NAMEN TRAGEN.**
- Die automatische Benennung unbenannter Felder ist die nächste Scheibe 13-1c (Arbeit P13-34).
  Sie nimmt den Namen aus der `id`, sonst aus Beschriftung oder Platzhalter, ohne das HTML zu
  ändern, und zeigt im Editor die ankommenden Namen.
- GRUND (Planrunde, G2): Ein Feld ohne `name` nimmt `FormData` nicht mit. Ohne diese Grenze
  käme bei Make ein leerer oder unvollständiger Rumpf an, während die Danke-Seite erscheint —
  der Fall aus Entscheidung P12.5-47.

**Entscheidung P13-24 — DIE AUSNAHME-LISTE DER DAUERREGEL "KEIN BAUSTEIN DES AUSGELIEFERTEN
TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN …" WIRD UM ZWEI EINGRIFFE ERWEITERT.**
- Erstens das `preventDefault` im submit-Listener bei einem Formular mit eingetragenem Ziel.
- Zweitens das Anhängen des Host-Elements der eigenen Formular-Meldung an `body`.
- Vollzogen im selben Commit wie dieser Eintrag: Kern (docs/immer-beachten.md) und Volltext
  (docs/immer-beachten-herleitung.md, datierte Ergänzung vom 2026-09-28). Der Titel der Regel
  ist unverändert; ihr Verzeichnis-Eintrag in der Herleitung trägt nur den Titel und bleibt
  deshalb stehen.

### Architekten-Setzungen aus der Planrunde der Scheibe 13-1

PROVENIENZ aller: ARCHITEKTEN-SETZUNG 2026-09-28, aus dem Plan der Planrunde (CC) übernommen im
Bau-Auftrag desselben Tages. REVIDIERBAR; ein Owner-Widerspruch hebt jede auf.

**Setzung P13-25 — DIE KONFIGURATION IST EIN MAPPING-TYP `"formTarget"` MIT `endpoint` UND
`thanksUrl`.** Das Mapping sitzt am `<form>`.
- GRUND:
  - Das Ziel gehört zu EINEM Element und zu EINER Variante (`mappings`/`mappings_b`).
  - Verwaiste Ziele fängt das Weg-C-Netz (`findOrphans`).
  - `publishProject` prüft Mappings bereits über beide Varianten (`alleMappings`).
  - Der Einstellungs-Blob müsste einen Element-Verweis nachbauen und löste den Trigger von
    "`settingsEqual` IST EINE ALLOWLIST …" aus.
- NAMEN:
  - Nicht `"webhook"`: kollidiert mit Setzung P13-9.
  - Nicht `"form"`: verwechselbar mit `DetectedElement.type`.
  - Kein Feld `url`: Die Anzeige verwaister Mappings in `CodeImporter` liest `m.config.url`
    und bliebe sonst still als "Weiterleitung" stehen; ohne `url` meldet es der Compiler.
- KEINE MIGRATION, NACH DOKUMENTSTAND:
  - `projects.mappings` ist `jsonb` ohne Typ-Prüfung (supabase/migrations/0001_projects.sql).
  - docs/db-stand.md führt für `projects` genau zwei Constraints und nur
    `set_updated_at`-Row-Trigger.
  - Die Prüfung am Live-Stand ist Teil von B0.

**Setzung P13-26 — BEI EINEM FORMULAR MIT ZIEL ZÄHLT DER TRACK ERST BEI "ERREICHT".** Einmal je
Formular und Seitenleben, auch nach einem erneuten Versuch.
- GRUND: Ein Lead-Ereignis für einen verlorenen Lead verfälscht die Optimierung des Netzwerks
  (Grundsatz "nur anbieten, was wirkt", Entscheidung P12.5-47).
- VORBILD für "Track, dann sofort navigieren": der Klick-Redirect in `buildWiringScript`.

**Setzung P13-27 — DIE MELDUNG STEHT IN DER PROJEKTSPRACHE, MIT DER ANREDE DER DEUTSCHEN TEXTE
DES EINWILLIGUNGS-DIALOGS ("du").** Sie behauptet weder Ursache noch Ergebnis.
- Quelle der Sprache: `getConsentLanguage`.
- Ein unbekannter Wert lässt das Veröffentlichen laut abbrechen, sobald ein Formular-Ziel
  besteht (I8).

**Setzung P13-28 — DER MAPPING-DATENBLOCK GEHT ÜBER `embedInScript`.** Heute steht dort dieselbe
Bauform ohne Namen.
- Die Ausgabe ist per Definition zeichengleich; W1′, W2′, T1 und T9 pinnen sie.
- Damit gilt I7 wörtlich.
- Der Kommentar in src/lib/script-embed.ts ("Jene Stelle bleibt UNBERUEHRT") ist nachzuziehen.

**Setzung P13-29 — DIE WERTREGELN.**
- `endpoint`:
  - nur `https:`, weil `http` auf einer https-Seite als Mixed Content scheitert;
  - nicht auf eigenen Hosts. Abgeleitet aus der Umgebung: der Hosting-Domäne und ihren
    Unterdomänen sowie dem App-Host. Dort löst ein `no-cors`-Aufruf mit Typ `basic` auf und
    gälte als "nie erreicht".
- `thanksUrl`: nur absolute `http:`/`https:`-Adresse. Eine relative Adresse zeigte auf einer
  gehosteten Seite dieselbe Seite noch einmal, weil `proxy` jeden Pfad auf die pfadblinde
  Serve-Route umschreibt.

**Setzung P13-30 — IN VORSCHAU UND EDIT ENTSTEHT KEINE FORMULAR-ZIEL-LAUFZEIT.** Die
Modus-Sperre sitzt im Erzeuger, dieselbe Bauform wie Entscheidung P11.6-6, Teil (d).
- GRUND: Im Vorschau-Rahmen ohne `allow-forms` entsteht kein `submit` (Vermerk P12.5-22).
- Senden erzeugte echte Leads aus der Arbeit des Betreibers.
- Navigieren verletzte das Containment.
- Geprüft wird über den Testknopf (13-1b).

**Setzung P13-31 — DIE AUSSCHLÜSSE UND DER HINWEIS.**
- Kein Angebot eines Ziels bei:
  - einer eigenen fremden absoluten Zieladresse (`action` am Formular oder `formaction` an
    einem Absende-Element);
  - einem Datei-Feld;
  - `method="dialog"`;
  - einem UNBENANNTEN Eingabefeld (Entscheidung P13-23).
- Ein Inline-`onsubmit` ist KEIN Ausschluss, sondern ein Hinweis im Panel.
  - GRUND: Gerade tote KI-Formulare tragen es.
  - Ein Ausschluss träfe nur die erkennbare Hälfte fremder Skripte; per `addEventListener`
    gebundene bleiben unsichtbar.

**Setzung P13-32 — ZEITLIMIT `FORM_TARGET_TIMEOUT_MS` = 10 000 (SETZUNG, NICHT GEMESSEN).**
- Nach Ablauf erscheint die Meldung, und die Sperre wird frei.
- Der Aufruf wird NICHT abgebrochen: Ein später "erreicht" navigiert noch.
- GRUND: Ein doppelter Lead ist besser als ein verlorener. Ohne Limit verschluckte die Sperre
  jeden weiteren Klick.
- Gemessen ist bisher nur eine Make-Antwort nach rund 0,2 s (docs/formular-empfaenger-befunde.md,
  Abschnitt "Make", Befund (aa)).

### Befunde der Planrunde (G1–G8)

**Vermerk P13-33 — WAS DER PLAN AM CODE GEFUNDEN HAT** (GELESEN AM CODE, CC, 2026-09-28, HEAD
`fbffe3b`; nichts davon live gemessen). Fundstellen als Symbolnamen.

- (G1) `Mapping` (src/lib/mappings.ts) ist eine Union aus `redirect`, `text` und `track`.
  - FALLEN, DIE DER COMPILER NICHT MELDET:
    - `configEqual` endet mit `return false`. Ein neuer Typ ohne eigenen Zweig wäre DAUERHAFT
      dirty.
    - `isRelinkTarget` (src/components/CodeImporter.tsx) liesse ein Formular-Ziel auf Button
      oder Link zu.
    - Die Anzeige verwaister Mappings in `CodeImporter` liest `m.config.url`.
  - Der Compiler meldet dagegen die Relink-Verzweigung in `CodeImporter`, sobald die neue
    Config kein `openInNewTab` trägt.
  - `saveProject` prüft Mappings nicht. Das einzige Server-Tor für Mapping-Werte ist
    `publishProject` (`zeileKaputt` über `alleMappings`).
- (G2) Das Panel für Formulare ist der Zweig `element.type === "form"` in `ElementActions`
  (src/components/ActionPanel.tsx).
  - Der Absende-Button bekommt über `submitFormOf` (src/lib/generate.ts) Hinweis und Link.
    Die Funktion wird mit `previewHtml` aufgerufen; gesucht wird per `getAttribute`-Vergleich.
  - Die Berechtigung wird nach demselben Muster erhoben: DOMParser auf demselben `previewHtml`,
    Felder über `form.elements`, also auch mit `form=`-Attribut.
  - `CANDIDATE_SELECTOR` (src/lib/detect.ts) erfasst `form`; Eingabefelder bekommen keine ps-ID.
- (G3) Der submit-Listener in `buildWiringScript` läuft in der Capture-Phase an `document`,
  prüft `FORM` und die Sperre `submittedForms`, dann `trackAll`, ohne `preventDefault`.
  - Die Einsetzung steht direkt hinter der `FORM`-Prüfung und VOR der Sperre `submittedForms`.
    Stünde sie dahinter, verhinderte die Sperre den erneuten Versuch.
  - `preventDefault` kommt ZUERST, auch während eines laufenden Versands. Sonst schickte ein
    zweiter Klick nativ ab, bei `GET` mit den Werten in der Adresse — I2 wäre gebrochen.
  - `form.submit()` löst kein `submit` aus und bleibt unsichtbar; das ist die Grenze aus
    Setzung P13-5.
  - Ein Capture-Handler des Betreibers an `window` mit `stopPropagation` hält uns an; das ist
    eine Grenze.
  - Ein Bubble-Listener mit Prüfung auf `defaultPrevented` ist VERWORFEN: `stopPropagation` am
    Formular liesse den nativen Versand durch (I2).
- (G4) I5 trägt, Vorbild ist der Custom-Pixel in `buildWiringScript`: Laufzeit und Einsetzung
  sind "" ohne Formular-Ziel in der gefilterten Tabelle bzw. ausserhalb von "export".
  - Die vier Differenz-Nachweise W1′, W2′ (src/lib/own-blocks-waechter.test.ts), T1
    (src/lib/tracking/consent-setter.test.ts) und T9 (src/lib/tracking/custom-pixel.test.ts)
    bleiben unverändert und werden zu Wächtern von I5.
  - Mit einem Ziel ist `injectScripts` in `generateFunctional` immer wahr.
- (G5) Die Wertprüfung sitzt an drei Stellen: im Panel (Speichern gesperrt), im Tor in
  `publishProject` hinter `zeileKaputt` und im Export-Riegel im Client (Muster
  `ownBlocksInActive`).
  - Die Berechtigung braucht DOM und läuft deshalb nur im Client (Dauerregel "KEIN
    SERVER-SEITIGES HTML-PARSING").
  - `proxy` schreibt auf dem Serving-Host jeden Pfad um. Die Route in
    src/app/app-serve/route.ts exportiert nur `GET` und liest den Pfad nicht.
- (G6) Der Vorschau-Rahmen trägt `allow-scripts allow-popups allow-popups-to-escape-sandbox`,
  kein `allow-forms` (`CodeImporter`). Der Export läuft über `buildDocumentFor` im Modus
  "export" und trägt das Ziel.
- (G7) Im Wiring gibt es keinen Baustein mit Schattenbaum. Vorbild ist die Leiste
  (`buildConsentBarScript`, src/lib/tracking/consent-bar.ts): Host per `createElement`,
  `attachShadow`, Texte per `textContent`, Strings über `embedInScript`,
  `body.appendChild(host)`.
- (G8) Keine neue Server-Action; der Trigger von "DIE IDOR-WÄCHTER SIND NAMENTLICH …" tritt
  nicht ein. Keine Migration (Setzung P13-25).

### Abschluss der Scheibe 13-1

**Vermerk P13-35 — ABSCHLUSS DER SCHEIBE 13-1 (FORMULAR-ZIEL MIT DANKE-SEITE). Bau-Commit
`434dc86`** ("feat(forms): Formular-Ziel mit Danke-Seite (Phase 13, Scheibe 13-1)").
Doku-Commits der Scheibe: `29a07b0` (Zuschnitt), `fbffe3b` (G0), `ab4681d` (vor dem Bau:
Entscheidungen P13-23/P13-24, Setzungen P13-25 bis P13-32, Dauerregel).

(0) B0 — VOR DEM ERSTEN CODE (OWNER, 2026-09-28):
    · Konsole einer veröffentlichten Seite unter publayer.net, Blocker AUS: `OK opaque 0`,
      Eingang `probe: b0` bei Make.
    · SQL-Editor, `pg_constraint` auf `public.projects`:
      - `projects_pkey` PRIMARY KEY (id)
      - `projects_user_id_fkey` FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE
        CASCADE
      - `projects_ab_test_needs_variant_b` CHECK (((NOT ab_test_active) OR (html_b IS NOT
        NULL)))
      - `projects_variant_b_pair` CHECK (((html_b IS NULL) = (mappings_b IS NULL)))
    · KEIN CHECK auf `mappings` — die Aussage "keine Migration" (Setzung P13-25) ist damit am
      Live-Stand gemessen.
(1) GEBAUT (GEMESSEN am Repo, CC, 2026-09-28):
    · src/lib/form-target.ts (neu):
      - `formTargetProblem` und `ownFormTargetDomains` — die Werte.
      - `formTargetCheck` — die Berechtigung, DOMParser, Felder über `form.elements`.
      - `formTargetDocumentProblem` und `formTargetDocumentMessage` — die Riegel im Editor.
      - `buildFormTargetRuntime` — Versand, Laufzeit-Wache, Zeitlimit
        `FORM_TARGET_TIMEOUT_MS`, Sperre, Meldung im Host `pagesmith-form-notice`.
      - die drei Meldungskonstanten.
    · src/lib/mappings.ts: Union-Zweig `"formTarget"` mit `FormTargetConfig { endpoint,
      thanksUrl }` und der Zweig in `configEqual`.
    · src/lib/generate.ts, in `buildWiringScript`:
      - der neue Parameter `formTargetLanguage`;
      - Einsetzung R1 (der Baustein) hinter `metaRuntime`;
      - Einsetzung B1 im submit-Listener hinter der FORM-Prüfung, VOR der Sperre
        `submittedForms`.
    · src/lib/generate.ts, in `generateFunctional`: Option `formTargetLanguage`, Sperre auf
      "export" und ein Formular-Ziel in der gefilterten Tabelle, Datenblock über
      `embedInScript`.
    · src/lib/script-embed.ts: nur der Kommentar zur Datenblock-Stelle.
    · src/app/projects/actions.ts: das Tor in `publishProject` hinter `zeileKaputt` (Werte, dann
      Sprache).
    · src/components/ActionPanel.tsx: `FormTargetActions` im Formular-Zweig; Knöpfe "Ziel
      übernehmen", "Eingabe abbrechen", "Ziel bearbeiten", "Ziel entfernen".
    · src/components/CodeImporter.tsx:
      - `handleAssignFormTarget` und das Memo `selectedFormTarget`;
      - die Riegel `formTargetPublishProblem` (in `handlePublish` und im Anzeigeslot) und
        `formTargetExportProblem` (Download, Kopieren, `exportBlockedMessage`);
      - `formTargetLanguage` in `buildDocumentFor`;
      - `isRelinkTarget`, Relink-Verzweigung und Karte verwaister Mappings für den neuen Typ.
(2) GATES (CC, 2026-09-28):
    · `tsc --noEmit` exit 0 · `eslint` 0 Fehler, 1 vorbestehende Warnung
      (src/lib/tracking/consent.test.ts) · `next build` exit 0.
    · `vitest run` 99 Dateien, 2446 Tests grün. Zählweg: vorher 98/2362, nach dem Bau
      99/2439, nach der Nachschärfung (Punkt (4)) 99/2446.
    · Byte-Kontrolle am committeten Objekt:
      - src/lib/form-target.ts CR 0, LF 514, NUL 0.
      - src/lib/form-target.test.ts CR 0, LF 720, NUL 0.
      - Die übrigen `i/lf`, CR 0.
      - src/lib/mappings.ts trägt `i/-text` wegen eines vorbestehenden NUL (Vorrat P13-37).
(3) MUTATIONEN (CC, 2026-09-28; jede Vorhersage vor dem Lauf gegen den aktuellen Bestand).
    Die Pflicht-Mutationen liefen je über die volle Suite, alle wie vorhergesagt:
    · M-I1 (`navigator.sendBeacon("/api/e", body)` nach dem Rumpf-Bau) → F1, F9.
    · M-I2 (`thanksUrl + "?" + body`) → F1, F2, F3a, F3e, F3f, K3b, F9.
    · M-I3 (Prüfung auf `opaque` → `r`) → F3b, F3d, K3c; F3c bleibt grün (vorhergesagt).
    · M-I5 (Sperre `table.some(formTarget)` entfernt) → W1′, W2′, T1, T9, F6b, kein
      Überschuss.
    · M-T (Zeitlimit entfernt) → K3a, K3b.
    · M-G (Ursprungsprüfung der Laufzeit-Wache entfernt) → NUR G3.
    Freiwillig, nur über die betroffene Datei:
    · N-A (`thanksUrl` in `configEqual`) → F12.
    · N-B (Tor in `publishProject`) → die 7 F8-Fälle ohne Positivkontrolle.
    · N-C (Sperrprüfung vor `preventDefault`) → F4 und F6b. F6b ist eine KASKADE: Er pinnt den
      Wortlaut von B1, in den die Mutation schreibt — nicht die Sperre; F4 fällt aus eigenem
      Grund.
    · N-D (`isRelinkTarget`-Zweig) → F14.
    Alle Rücknahmen geprüft: 0 Marker, Suche mit Positivkontrolle.
(4) NACHSCHÄRFUNG VOR DEM GO (ARCHITEKT, 2026-09-28): die Laufzeit-Wache in
    `__psFormTargetSend`, VOR Rumpf-Bau und `fetch`.
    · Zieladresse: keine Zeichenkette, kein `https://`-Präfix, nicht zu parsen, oder derselbe
      Ursprung wie die Seite → `fail()`, nichts gesendet.
    · Danke-Seite: keine Zeichenkette oder weder `http://` noch `https://` → ebenso.
    · ABWEICHUNG VOM WORTLAUT, DEKLARIERT: Das Präfix wird am getrimmten Wert und ohne
      Gross/Klein geprüft. Das Tor parst mit `new URL` und nimmt " https://…" und "HTTPS://…"
      an; eine strengere Laufzeit verweigerte sie lautlos.
    · Tests G0 (Positivkontrolle) bis G6.
(5) ABWEICHUNGEN IM BAU (im Baubericht deklariert):
    · Die Meldungskonstanten stehen in form-target.ts, nicht in settings.ts.
    · PublishView.tsx ist unberührt, der Knopf bleibt klickbar. Der Riegel sitzt in
      `handlePublish`; die Meldung steht vorher schon als Hinweis im Anzeigeslot.
    · Die Meldung sitzt OBEN, weil die Einwilligungs-Leiste unten mit derselben Stapel-Ebene
      sitzt. Ihre Texte sind reines ASCII ("Ausblenden"/"Dismiss").
    · "Eingabefeld" (Entscheidung P13-23): `input` ausser submit/button/reset/image/hidden,
      dazu `select` und `textarea`. Ein Name aus Leerraum gilt als leer; auch deaktivierte
      Felder zählen.
    · `formaction`/`formmethod="dialog"` an Absende-Elementen und die protokoll-relative
      Adresse `//x` zählen wie `action`/`method`.
    · Das Server-Tor prüft auch verwaiste Ziele; der Riegel im Client nur Ziele mit `<form>` im
      Dokument.
    · F12 steht in form-target.test.ts. R1 in F6b kommt aus dem Erzeuger, B1 und D1 sind
      getippt.
    · Werkzeug: Ein Python-Ersetzungsversuch brach vor dem Schreiben ab. Ein überflüssiger
      Anker-Test in publish.test.ts wurde angelegt und zurückgenommen, der Diff war danach
      leer.
(6) LIVE-TEST — GEMESSEN, OWNER, LIVE, 2026-09-28. Aufbau ABWEICHEND von der Anleitung:
    TESTAUFBAU:
    · R: ein bestehendes Projekt mit E-Mail-Feld, veröffentlicht, OHNE Formular-Track.
    · Z: ein neues Projekt aus test-formular-13-1.html mit zwei Formularen. Beide tragen einen
      Track "Lead".
      - Formular A: name, email, nachricht, Checkbox-Gruppe "interesse"; bekommt das Ziel.
      - Formular B: `action` https://example.com/, `method` post, Feld email_b; ohne Ziel.
    · Danke-Seite in L2: https://danke-seite.de.
    · Meta-Pixel und Tracking-Schlüssel erst ab dem Nachtest N-A gesetzt.
    · V1 (A/B-Betrieb): nicht gemeldet.
    I5 LIVE — V2 (vor dem Push), L1.1 (nach dem Deploy) und L1.3 (nach Neu-Veröffentlichen),
    Live-Seite R, je Script Bytes und sha256 der Tag-Form. In allen DREI Zuständen identisch:
      pagesmith-consent    790  854831d25209b54ec1df0f4f27d9d8594748772624e09fda1d99a87abcce9253
      pagesmith-mappings   203  b50768c9725f427494615cc5dac1648b4553a1a02509c2819d577861e9934a48
      (ohne id)          14766  f87034c89e8d7343ca7419dfa1bba346db5b8cb41d18b8ace2b251dbf7366244
      __ps_pve             806  02390d820fe7427b2c858f7f3ec7c3bd59dc34f54d9e70b5d924e8640c2ad41b
    WEITERE ERGEBNISSE:
    · L1.4, Formular B: schickt nativ an example.com, keine Meldung.
    · L1.5: keine events (ohne Pixel und Schlüssel).
    · L2: Vorher `[]`. Speichern ohne bzw. mit ungültiger Danke-Seite gesperrt, mit Meldung.
      Danach genau ein `formTarget` in `mappings`; neu veröffentlicht; Laufzeit im Live-Text
      (`true`).
    · L3: Navigation auf die Danke-Seite. Bei Make kam "interesse" als Liste mit beiden Werten
      an — M9 (docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befund (w)) am echten
      Formular bestätigt. events: keine (ohne Pixel), ersetzt durch N-A.
    · L4, Offline: Das Formular bleibt samt Werten, Meldung oben, keine Navigation. Wieder
      online: genau ein Eingang bei Make.
    · L5, uBlock Origin Lite "Vollständig": nicht blockiert, Navigation und Make-Eingang.
    · L6, Doppelklick: genau ein Eingang bei Make.
    · L7: `[true, true, "PAGESMITH-FORM-NOTICE"]`.
    · L8 und N-C: Meldung oben lesbar, "Ausblenden" wirkt; bei 360 px und gescrollter Seite oben
      fixiert.
    · L9, WIE AUSGEFÜHRT: Gemessen wurde die native Pflichtfeld-Prüfung des Browsers — NICHT
      der geplante Schritt. Der geplante Riegel ist N-B.
    · N-A (Pixel und Schlüssel gesetzt, `tracking_key` vorhanden):
      - Die `/api/e`-Anfrage stand im Netzwerk-Tab und überlebte die Navigation; ihr PAYLOAD
        WAR NICHT LESBAR (sendBeacon, text/plain).
      - Einzel-Absendung: genau EIN Paar server+browser mit gleicher `event_id` (645c32c6-…).
      - Doppelklick: genau EIN weiteres Paar (1097c5a2-…).
    · N-B: ein unbenanntes Feld in A → Veröffentlichen gesperrt, das Panel nennt das Feld.
    · N-C, Panel B: Hinweis "kein Ziel möglich: eigene Zieladresse (action oder formaction)".
(7) GRENZEN DER MESSUNG:
    · Das Paar für ein Formular OHNE Ziel (L1.5) ist live NICHT gezeigt. I4 ruht dort auf S1,
      S4, S6, S7, U1 und F5; live gezeigt ist nur das native Abschicken (L1.4).
    · I1 AM BEACON ist live NICHT gezeigt, weil der Payload nicht lesbar war. I1 ruht dort
      allein auf F1 (samt M-I1).
    · Die Überdeckung der Einwilligungs-Leiste durch die Meldung ist UNGEPRÜFT (nicht
      gemeldet).
    · Ein Browser (Google Chrome 153.0.8010.53), ein Blocker (uBlock Origin Lite), ein Empfänger
      (Make, Zone eu2). Der A/B-Betrieb ist nicht gemeldet (V1).
    · Der Riegel im Editor (N-B) ist live gezeigt, das Server-Tor bei ungültigen Werten nur im
      Test (F8).
    WIRKUNG: erst nach erneutem Veröffentlichen; heruntergeladene Exporte bleiben unverändert.
(8) VERDICHTUNG DES ZUSCHNITTS (CC, 2026-09-28) — GESTRICHEN, weil mit der Scheibe abgelaufen,
    mit ihrem Inhalt:
    · GEGENSTAND: "'Formular-Ziel mit Danke-Seite' — der Datenweg aus Entscheidung P13-2 samt
      Danke-Seite, für Formulare, die der Nutzer im Tool ausdrücklich mit einem Ziel versieht
      (Setzung P13-5). Zugeschnitten am 2026-09-28; der Plan folgt in einer eigenen Runde." —
      erfüllt, Punkte (1) und (6).
    · Aus I5 das Wort "KANDIDAT" und der Satz "Trägt der Code das nicht, sagt der Plan, warum."
      — erledigt: I5 trägt (Punkte (3) und (6)).
    · I9 "Ingest, Proxy, Middleware, Serve-Route und Adapter bleiben unberührt." — Scope-Riegel;
      eingehalten (Bau-Commit `434dc86`, zehn Dateien, keine davon).
    · Der Satz "Der Massstab für Plan, Bau und Protokoll." vor den Invarianten — ersetzt durch
      die Wächter je Invariante.
    · Der Abschnitt mit den Auflagen aus Arbeit P13-13 und der Volltext der Arbeit P13-13 selbst:
      - "(I4) ausdrücklich abgrenzen" — erledigt, an I4.
      - "die Ausnahme-Liste der Dauerregel … nachziehen" — erledigt (Entscheidung P13-24,
        Commit `ab4681d`).
      - "eine Einsetzung in ALLEN vier Differenz-Nachweisen … falls I5 nicht trägt" —
        GEGENSTANDSLOS, I5 trägt; die vier Nachweise sind unverändert.
      - "die Frage 'Mapping-Typ oder Einstellung' beantworten" — Setzung P13-25; der Trigger von
        "`settingsEqual` IST EINE ALLOWLIST …" tritt damit nicht ein.
    GEBLIEBEN:
    · Entscheidungen P13-16, P13-17, P13-23, P13-24.
    · Setzungen P13-18 bis P13-21 und P13-25 bis P13-32; an P13-21 die Grenze zum Erfolgsfall an
      der Make-Adresse durch B0 ersetzt.
    · Die Vermerke P13-22 und P13-33.
    · Die Invarianten I1 bis I8 und I10, je mit Wächter.

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
MESSUNG (CC mit Owner, 2026-09-28): docs/formular-empfaenger-befunde.md, Abschnitt "Make",
Unterüberschrift "Messung 2026-09-28", Befunde (s) bis (ab). Offen geführt ist dort ein
WIDERSPRUCH: Befund (z) (Szenario AUS → 200 und Queue) steht gegen eine Doku-Aussage in
Befund (i).

**Arbeit P13-12 — BEKANNTE SCHWÄCHEN DES WEGS, die Lesung oder Plan beantworten müssen**
(ARCHITEKTEN-SETZUNG 2026-09-28; jede Schwäche ABGELEITET, keine gemessen):
· Die Zustellung ist vom Browser aus nicht bestätigbar — bei falscher Adresse erscheint die
  Danke-Seite trotzdem.
  → BEFUND, KEIN ENTSCHEID: docs/formular-empfaenger-befunde.md, Abschnitt "Make", (x), (y),
  (z).
· Ob Werbeblocker die fremde Adresse blockieren, ist ungemessen.
  → BEFUND, KEIN ENTSCHEID: ebenda, (ab) — am Listentext, nicht im Browser.
· Die öffentliche Adresse ist spam-anfällig.
· Einbahnstrasse und Neu-Veröffentlichen: was im ausgelieferten Text steht, bekommt man nicht
  zurück, und eine Änderung wirkt erst nach erneutem Veröffentlichen (docs/immer-beachten.md,
  "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE …"; docs/offene-punkte.md,
  "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST").

**Arbeit P13-13 — AUFLAGEN AN DEN ZUSCHNITT** (ARCHITEKTEN-SETZUNG 2026-09-28) — ERLEDIGT mit
Scheibe 13-1. Gegenstand: vier Auflagen an den ersten Zuschnitt. BELEG DER ERLEDIGUNG: Vermerk
P13-35, Punkt (8).

**Arbeit P13-34 — SCHEIBE 13-1c: AUTOMATISCHE BENENNUNG UNBENANNTER FELDER** (OWNER-ENTSCHEIDUNG
2026-09-28, Entscheidung P13-23).
- Ein Feld ohne `name` bekommt seinen Namen beim Versand aus der `id`, sonst aus Beschriftung
  oder Platzhalter.
- Das HTML wird dabei nicht geändert.
- Der Editor zeigt die ankommenden Namen.
- Bis dahin gilt die strenge Grenze aus 13-1: ein Ziel nur, wenn alle Eingabefelder benannt
  sind.

**Arbeit P13-36 — SCHEIBE 13-1b: DER TESTKNOPF IM EDITOR** (Setzungen P13-18 und P13-21;
ARCHITEKTEN-SETZUNG 2026-09-28).
- Er leistet, was die Laufzeit nicht kann: eine falsche Adresse erkennen. Im Modus `no-cors`
  ist eine 410 unsichtbar (docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befund (ac)).
- Der Testknopf läuft im Modus `cors` (Setzung P13-21); dort wirft die 410 (ebenda, Befund
  (ad)).
- REIHENFOLGE ZWISCHEN 13-1b UND 13-1c (Arbeit P13-34): NICHT ENTSCHIEDEN.

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
FOLGE AUS SCHEIBE 13-1: Ein Formular MIT Ziel läuft nicht mehr hinein — unser
`preventDefault` ersetzt das native Abschicken. Für Formulare OHNE Ziel gilt der Eintrag
unverändert.

**Vorrat P13-37 — IN `mappingsEqual` STEHT EIN LITERALES NUL-BYTE ALS TRENNER; DER KOMMENTAR
DARÜBER NENNT EIN LEERZEICHEN** (GEMESSEN, CC, 2026-09-28).
- Befund: In src/lib/mappings.ts ist der Schlüssel `${m.elementId}<NUL>${m.type}`. `tr -cd
  '\000' | wc -c` ergibt 1, in HEAD vor und nach `434dc86`. `git ls-files --eol` meldet
  `i/-text`.
- Folge: Werkzeuge, die Text erwarten, behandeln die Datei als binär, und ein Lese-Werkzeug
  zeigt das NUL als Leerzeichen — so ist es in der Planrunde übersehen worden.
- Scheibe 13-1 hat das NUL erhalten, nicht verursacht.
- BEZUG: die Dauerregeln "EIN NACHWEIS AN EINER NEUEN DATEI IST BLIND …" und "`grep` TAUGT IN
  DIESER UMGEBUNG WEDER FÜR DAS CR NOCH FÜR DAS NUL …" (docs/immer-beachten.md).
- WER DIE DATEI ANFASST: Byte-Kontrolle einschliesslich NUL.
- KEIN TRIGGER GESETZT.

**Vorrat P13-38 — OHNE EINGESCHALTETEN EINWILLIGUNGS-DIALOG IST DIE SPRACHE DER
FORMULAR-MELDUNG NICHT WÄHLBAR** (GELESEN AM CODE, CC, 2026-09-28).
- Befund: `PublishView` (src/components/PublishView.tsx) zeigt die Sprach-Wahl nur, wenn der
  Dialog "bar" oder "modal" ist.
- `getConsentLanguage` liefert bei fehlendem Wert "de".
- Die Meldung des Formular-Ziels nimmt ihre Sprache aus derselben Quelle (Setzung P13-27). Eine
  englische Seite ohne Dialog zeigt die Meldung deutsch.
- Die Behebung braucht PublishView, das in Scheibe 13-1 unberührt blieb.
- KEIN TRIGGER GESETZT.

**Vorrat P13-39 — `ownFormTargetDomains` LIEST DIE HOSTING-DOMÄNE EIN ZWEITES MAL NEBEN
`host.ts`** (GELESEN AM CODE, CC, 2026-09-28).
- Befund: src/lib/form-target.ts liest NEXT_PUBLIC_HOSTING_DOMAIN mit eigener Bereinigung und
  trägt das feste "lvh.me". Dieselben Aufgaben erfüllen in src/lib/hosting/host.ts
  `servingSuffixes` und `FALLBACK_SUFFIX` (nicht exportiert).
- host.ts ist eine Kern-Datei und blieb deshalb unberührt.
- Ändert sich die Bereinigung an einer der beiden Stellen, laufen sie still auseinander.
- GEMILDERT, nicht aufgehoben: Die Laufzeit-Wache verweigert eine Zieladresse auf dem
  Ursprung der Seite selbst (G3), unabhängig von jeder Umgebung.
- BEZUG: offener Punkt "isAppHost-PLATZHALTER" (docs/offene-punkte.md, Ergänzung vom
  2026-09-28).
- KEIN TRIGGER GESETZT.
