# ZIEL-BEFUNDE — GA4

**WOHER DIESE DATEI STAMMT:** NEU ANGELEGT am 2026-09-25 (OWNER-ENTSCHEIDUNG 2026-09-25: eigene
Datei statt docs/ziel-befunde/google.md — eigenes Ziel, und google.md trägt in einem Fenster von
rund 200k keine Volladung vor einem Crawl). Anders als die fünf übrigen Ziel-Dateien ist sie
NICHT aus docs/ziel-befunde.md herausgeschnitten und trägt deshalb KEINE Prüfsumme über einen
übernommenen Text.

**WAS VOR DIESER DATEI ÜBER GA4 IM REPO STAND — UND DORT STEHEN BLEIBT:**
docs/ziel-befunde/google.md, Teil (f) (GELESEN 2026-08-20) und die GA4-Angaben in dessen LAUF 1
(2026-08-24); docs/claude-history/phase-11-multi-tracking-rohfassung.md, "(f) GA4 — GEPRÜFT
(2026-08-03)". Beide sind ZWEITHAND und Zeitdokumente; sie werden hier GEPRÜFT, nicht
übernommen, und nicht umgeschrieben. Die Gegenüberstellung steht unten in Teil (r).

**DIE KONVENTIONEN STEHEN NICHT HIER, SONDERN IM KOPF VON docs/ziel-befunde.md** — Fortlauf der
Buchstaben über alle Protokolle dieses Ziels, Doppelbuchstaben nach (z), Provenienz-Pflicht,
Verweis-Regel "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND BUCHSTABEN — NIE DEN BUCHSTABEN
ALLEIN". Die Buchstaben dieser Datei beginnen bei (a) und haben mit den Buchstaben von
google.md nichts zu tun.

**WAS HIER NICHT STEHT:** KEINE Regeln, KEINE Entscheidungen, KEIN Zuschnitt. Sie sagt, was die
Anbieter-Dokumentation SAGT — nicht, was zu bauen ist, und nicht, was der Anbieter TUT. **ALLES
IN DIESER DATEI IST GELESEN; NICHTS IST GEMESSEN.** Kein Aufruf gegen eine Schnittstelle des
Anbieters, auch nicht gegen den Validierungs-Endpunkt.

**FORTSCHREIBUNG:** Ein weiteres Messprotokoll oder eine weitere Lesung zu DIESEM Ziel kommt
HINTEN in DIESE Datei, unter eine eigene DATIERTE Unterüberschrift; die Buchstaben laufen fort.

**KATALOG-NUMMERN:** Jeder Teil nennt die Frage aus docs/ziel-fragenkatalog.md, die er
beantwortet (A1 bis I5), und die Frage des Crawl-Auftrags vom 2026-09-25 (F1 bis F10, unten).
"Kein Katalog-Ort" heisst: keine der 41 Fragen trifft den Befund. Die Matrix des Katalogs ist
NICHT fortgeschrieben.

**DIE ZEHN FRAGEN DER LESUNG VOM 2026-09-25, VOR DEM LESEN FESTGELEGT (Crawl-Auftrag des
Owners, sinngemäss verkürzt):** F1 (tragend) Kennung(en) eines Ereignisses — Pflicht, Form; was
gilt für eine Kennung, die NICHT aus einem von gtag gesetzten Cookie stammt (Annahme, Nutzer-
und Sitzungszuordnung, Quelle/Kampagne, Sichtbarkeit in Berichten), welche Felder bestimmen
Sitzung und Quelle · F2 Zweck: nur Ergänzung zu gtag/GTM oder auch allein stehend · F3
Zugangsdaten: welche, wer erzeugt sie wo, Format, Lebensdauer, Widerruf, Geheimnis-Charakter ·
F4 Endpunkt, Methode, Rumpf, Statuscodes; 2xx trotz fehlerhaftem Ereignis? · F5 Validierungs-
oder Test-Instrument, was es zeigt und was nicht · F6 Einwilligungs-Signale · F7 Standort, IP,
User-Agent: woraus abgeleitet · F8 Grenzen: Rate, Grösse, Alter, reservierte Namen · F9 Data
Manager API: Nachfolger, Alternative oder Abkündigungspfad, Allowlist, Kennungen für GA4-Ziele ·
F10 Klick-Kennung, Verbindung zu Google Ads.

## GA4 (Measurement Protocol)

### Abschnitts-Lesung 2026-09-25 der Measurement-Protocol-Dokumentation — die Teile (a) bis (r)

**HERKUNFT (2026-09-25):** Eine ABSCHNITTS-LESUNG durch CC nach der Regel "ANBIETER-DOKUMENTATION
WIRD ABSCHNITTSWEISE GELESEN" (docs/immer-beachten.md). INSTRUMENT: Browser-Werkzeug
(Playwright-MCP), je Seite der `textContent` von `article.devsite-article` (Hilfe-Artikel:
`article`), durchlaufen mit einem eigenen Serialisierer, der Überschriften, Listen,
Tabellenzeilen und Code-Blöcke markiert, `script`/`style` auslässt; nie `innerText`. Der
Doku-Stand ist das "Last updated" der Seite. Mit `hl=en`. KEINE Anmeldung, KEINE Eingabe, KEIN
Download, KEIN Aufruf gegen eine Schnittstelle.

**DER GELESENE UMFANG.** Der Abschnitt ist die Gruppe "Send additional web/app data" der
GA4-Entwickler-Navigation plus der Knoten "Measurement Protocol" im Reiter "Reference" —
festgehalten VOR dem Lesen an der Navigation der Seite
developers.google.com/analytics/devguides/collection/protocol/ga4 (2026-09-25). Basis, wo nichts
anderes steht: developers.google.com/analytics/devguides/collection/protocol/ga4.
DER ABSCHNITT, VOLLSTÄNDIG (Titel wörtlich, Doku-Stand):
· S1 `/` — "Measurement Protocol" (2026-06-08)
· S2 `/sending-events` — "Send Measurement Protocol events to Google Analytics" (2026-09-18)
· S3 `/user-properties` — "Send user properties" (2026-09-18)
· S4 developers.google.com/analytics/devguides/collection/ga4/uid-data — "Send user-provided data
  using Measurement Protocol" (2026-08-19)
· S5 `/validating-events` — "Validate events" (2026-09-18)
· S6 `/verify-implementation` — "Verify implementation" (2026-06-15)
· S7 `/use-cases` — "Measurement protocol use cases" (2026-09-18)
· S8 `/troubleshooting` — "Troubleshooting" (2026-06-08)
· S9 `/reference` — "Measurement Protocol reference" (2026-09-18)
· S10 `/reference/events` — "Events" (2026-09-16)
· S11 `/changelog` — "Changelog" (2026-09-18)
DAZU, ÜBER FLIESSTEXT ERREICHT (nicht in der Navigation): S12 `/policy` — "Measurement Protocol,
SDK, and User ID Feature Policy" (2026-06-08), verlinkt am Ende von S1.
DIE VARIANTEN, UND SIE SIND DIE REITER DIESES ABSCHNITTS: Ein Plattform-Umschalter "Firebase /
gtag.js" steht im Text von S2, S3, S5, S6, S8 und S9; der URL-Parameter `client_type` liefert je
Variante eine ANDERE Serverseite (S9 leitete ohne Parameter auf `client_type=firebase` um). GELESEN ist je
Seite die Variante `gtag`; die Variante `firebase` ist je Seite GELADEN und zeilenweise gegen
`gtag` verglichen (S1 bis S12). Ergebnis: Unterschiede tragen S2, S3, S5, S6, S8 und S9, und sie
betreffen ausschliesslich die App-Kennungen (`firebase_app_id` statt `measurement_id`,
`app_instance_id` statt `client_id`, die Firebase-SDK-Methoden) und in S9 das Fehlen von
`user_agent` in der App-Variante. S4 unterscheidet sich nur in Inhaltsverzeichnis und
Reiter-Beschriftung; S1, S7, S10, S11 und S12 tragen keine Textzeile, die nur eine Variante hat.
S4 trägt zusätzlich drei Code-Reiter "Node.js / More"; ihr Inhalt ist allein Node.js, "More"
trägt keinen Text.
AUSSERHALB DES ABSCHNITTS, JE AN EINER FRAGE GEÖFFNET:
· F3: developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/
  properties.dataStreams.measurementProtocolSecrets — "REST Resource:
  properties.dataStreams.measurementProtocolSecrets" (2026-04-14).
· F9, Data Manager API, Basis developers.google.com/data-manager/api/devguides/events/analytics:
  D1 `/measurement-protocol/upgrade` — "Upgrade from Measurement Protocol to the Data Manager
  API" · D2 `/measurement-protocol/upgrade/steps` — "Steps to upgrade" · D3
  `/measurement-protocol/upgrade/field-mappings` — "Field mappings" · D4
  `/recommended-custom-events` — "Google Analytics recommended and custom events" · D5
  `/recommended-custom-events/send-events` — "Send events" · D6 `/online` — "Improve measurement
  for events with a transaction ID"; alle sechs mit Doku-Stand 2026-09-24.
· Hilfe-Artikel (support.google.com, ohne ausgewiesenen Doku-Stand): H1 analytics/answer/11397207
  "[GA4] Cookie usage on websites" · H2 analytics/answer/9191807 "About Analytics sessions" · H3
  tagmanager/answer/13802165 "Consent mode reference" · H4 analytics/answer/12002752 "[GA4]
  Collect granular location and device data" · H5 analytics/answer/13965727 "Conversions vs. key
  events in Google Analytics" · H6 analytics/answer/10597962 "Select attribution settings" · H7
  analytics/answer/7201382 "Monitor events in DebugView" · H8 analytics/answer/9213390 "Measure
  activity across platforms with User-ID".
· C1 developer.chrome.com/docs/extensions/how-to/integrate/google-analytics-4 — "Use Google
  Analytics" (Chrome Extensions); verlinkt aus S2. Sie weist "Last updated 2012-09-18 UTC" aus —
  ABGELESEN, und mit ihrem Inhalt (Manifest V3) nicht vereinbar; die Angabe wird nicht gedeutet.

**WAS NICHT VOLLSTÄNDIG IM WORTLAUT GELESEN IST — UND WIE ES STATTDESSEN ERFASST IST:**
· S10: Fliesstext und alle Parametertabellen gelesen; die 38 Code-Beispiele NICHT zeilenweise,
  sondern per Zählung: `"client_id"` 70, `app_instance_id` 6, `gclid` 0, `consent` 0, `user_id`
  0, `session_id` 0 (GEMESSEN an der Auszugsdatei, CC, 2026-09-25).
· D5: Fliesstext und Tabellen gelesen, die 15 Code-Blöcke nicht.
· Bilder ohne Text: das Sequenzdiagramm in S1 ("sequence diagram of measurement protocol"),
  das Realtime-Bild in S6, die Schaubilder in H3. GEMELDET, NICHT als leer gelesen.
· Die "Page Summary" jeder Seite ist eine maschinell erzeugte Zusammenfassung (Spark-Symbol) und
  wird NIRGENDS als Quelle benutzt — s. Teil (q).

**DIE SUCHEN HINTER JEDEM "NICHT GEFUNDEN" UNTEN — DAS INSTRUMENT:** eine ZWEITE Abholung
derselben Seiten (Server-HTML per `fetch`, zerlegt mit `DOMParser`, derselbe Serialisierer bzw.
bei Hilfe-Artikeln und C1 der `textContent` von `article` ohne `script`/`style`), Suche
case-insensitiv über den vollen Text einschliesslich Code. S1 lieferte im Server-HTML kein
`article.devsite-article`; für S1 läuft die Suche über den Auszug der Lesung. JEDER TREFFER IST IM
WORTLAUT GELESEN; die Zählungen stehen am jeweiligen Teil. GEMESSEN an den Auszugsdateien (CC,
2026-09-25).

**GESEHEN, NICHT GEÖFFNET — mit Grund, und gegen F1 bis F10 gehalten (Auflage "DIE LISTE
GESEHEN, NICHT GEÖFFNET IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT"):**
· ga-dev-tools.google/ga4/event-builder — GEÖFFNET wegen F5, aber NICHT LESBAR: "You must be
  logged in with Google for this demo." Keine Anmeldung. Es ist ein Werkzeug, kein Teil des
  Doku-Abschnitts; was S5 und S9 über es sagen, steht in Teil (i).
· Admin-API-Methoden `create`, `delete`, `get`, `list`, `patch` und die `v1alpha`-Fassungen —
  Verwaltung des Geheimnisses per API; F3 ("Widerruf") ist aus S8 und der Methodentabelle der
  Ressource beantwortet, die Lebensdauer trägt keiner der Titel.
· support 9445345 "Google signals", 10085872 "generating or renaming events", 9267572
  "audience conditions", 9268042/9269570 (Nutzereigenschaften), 11202874 "Google Analytics 360",
  11109416 "user engagement", 12229021 (eigene Parameter), adsense 9830725 (Zeitzone),
  analytics 2700409 "Policy for Google Analytics Advertising Features" (gilt laut S12 bei
  SDK-Einsatz) — kein Titel trägt eine der Fragen F1 bis F10.
· Tag-Manager-Seiten zu eingebauten Variablen und Vorlagen (tagmanager 7182738,
  /tag-platform/tag-manager/templates, /templates/api), developers.google.com/gtagjs/reference/
  api — sie beschreiben, wie man die client_id AUS gtag/GTM ausliest, nicht, wie das Protokoll
  eine andere behandelt.
· /analytics/devguides/collection/ga4/events, /item-scoped-ecommerce, Data-API- und
  Realtime-API-Seiten, firebase.google.com/codelabs/firebase_mp, die Firebase-SDK-Referenzen —
  gtag-, Berichts- oder App-Gegenstände.
· Data-Manager-Seiten set-up-access, concepts/encryption, concepts/understand-errors, configure
  destinations, diagnostics, limits — in google.md, LAUF 1 und LAUF 2 bereits gelesen
  (Zweithand); F9 fragt nach Stellung, Allowlist und Kennungen, und die tragen D1 bis D6.
· developers.google.com/tag-platform/tag-manager/server-side/send-data — Server-Container; S8 sagt
  das Nötige dazu (Teil (h)).
· github.com/googleanalytics/google-analytics-mcp und /analytics/devguides/MCP — s. Teil (q).

(a) **DIE KENNUNG EINES WEB-EREIGNISSES IST `client_id` — PFLICHT, IM RUMPF, FORM EMPFOHLEN
    "ZWEI POSITIVE ZAHLEN MIT PUNKT".** F1 · Katalog E1, E3, D5, C2.
    · S9, Tabelle "JSON POST body": `client_id`, string, "Required. Identifier for a user instance
      of a web client." Zulässige Formen: "Recommended: Two positive numbers, joined by a period
      (.)" — mit gtag.js über `gtag.js('get')`, mit GTM über die Variable "Analytics Client ID"
      bzw. `readAnalyticsStorage` — ODER "A client ID cookie. Send the full value of the cookie."
    · S11, Eintrag 2026-02-17: "Added support for accepting a client ID cookie for client_id and
      a session ID cookie for session_id. We still recommend sending non-cookie values for
      client_id and session_id".
    · S2: "The client_id should match the ID generated by the Google Analytics tag on your
      website." und "You must provide client_id in the request body to associate the events
      with a particular web client instance."
    · **S6, DIE TRAGENDE STELLE:** "In order for an event to be valid, it must have a client_id
      that has already been used to send an event from gtag.js. Capture this ID client-side, and
      include it in your call to the Measurement Protocol."
    · S8: `advertising_id` "is not supported as a valid device identifier"; für gtag.js gilt
      `client_id`. `user_id` ist in S9 "Optional".
    · H1 nennt die Cookies der GA4-JavaScript-Tags: `_ga` (2 Jahre, "Used to distinguish
      users") und `_ga_<container-id>` (2 Jahre, "Used to persist session state"). DASS DER
      "client ID cookie" aus S9 genau `_ga` ist, steht auf KEINER gelesenen Seite wörtlich; S9
      verlinkt "client ID cookie" auf H1 — mehr nicht.
    WAS DIE DOKU ÜBER EINE client_id OHNE gtag-HERKUNFT SAGT, STEHT HIER UND IN (b) BIS (e):
    S6 nennt ein solches Ereignis nicht "valid"; eine Aussage, dass es ABGELEHNT würde, steht
    nirgends — die Annahme ist in (h) beschrieben.

(b) **ZWEI GOOGLE-QUELLEN WIDERSPRECHEN SICH BEI DER SELBST ERZEUGTEN client_id — GEMELDET,
    NICHT AUFGELÖST.** F1 · Katalog E1, E3.
    · C1 (Chrome-Doku, verlinkt aus S2 als "recommended approach" für Manifest-V3-Erweiterungen):
      "generate a unique identifier for a specific device/user, the client_id … It can be an
      arbitrary string, but should be unique to the client." Das Beispiel erzeugt sie aus
      Zufallsziffern und Zeitstempel im Format `<number>.<number>` und schreibt: "This sends a
      button_clicked event which will appear in your Google Analytics events report." Dazu:
      "Caution: Using the Measurement Protocol means that some information, such as geolocation,
      won't be included."
    · S6 (Teil (a)): "valid" nur mit einer client_id, die schon von gtag.js gesendet hat.
    WAS DAS HEISST UND WAS NICHT: Die GA-eigene Seite knüpft die Gültigkeit an eine
    gtag-Herkunft; die Chrome-Seite beschreibt einen Weg ganz ohne gtag und sagt Sichtbarkeit im
    Ereignisbericht zu. Welche Aussage das Verhalten des Anbieters trifft, ist AM DOKUMENT NICHT
    ENTSCHEIDBAR und nur zu MESSEN. ERSETZT KEINE MESSUNG.

(c) **SITZUNG UND QUELLE KOMMEN AUS DER ONLINE-SITZUNG — DAS PROTOKOLL SETZT SIE NICHT
    SELBST.** F1, F10 · kein Katalog-Ort; berührt H5 (Realtime).
    · S9, "Common event parameters": `session_id` "Required for several common use cases";
      Tipp: ohne `session_id` und `engagement_time_msec` "won't contribute correctly to metrics
      like Average engagement time or Engaged sessions, and these events may not be fully
      reflected in Realtime user counts."
    · S7, "Session attribution": "Measurement Protocol events that meet specific requirements
      appear in reports with the same session attributes (such as geographic information,
      source, medium, and campaign) as online events from the same session." Bedingungen:
      `session_id` im Ereignis · Anfrage spätestens 24 Stunden nach Beginn der Online-Sitzung ·
      ein überschriebener `timestamp_micros` innerhalb dieser Sitzung.
    · H2: "The session_start event carries the information that determines the attribution of
      the session, such as the gclid, UTM parameters, and referrer." und: Sitzungs-ID und
      -Nummer werden über gtag.js und Firebase-SDK automatisch angehängt, "However, the
      identifier is not included automatically in events from Measurement Protocol".
    · S9 und S2: `session_start` ist ein RESERVIERTER Ereignisname; S2: "creating a new
      session_id creates a new session without the need to send session_start".
    · S10, `campaign_details`: sendet `campaign_id`, `campaign`, `source`, `medium`, `term`,
      `content`, "applied to events with a timestamp greater than or equal to the timestamp of
      the campaign_details event"; "won't be visible in Google Analytics reports or DebugView".
      Eine Klick-Kennung steht in seiner Parametertabelle NICHT (s. (m)).
    · S1, "Full server-to-server": "While it's possible to send events to Google Analytics solely
      with the Measurement Protocol, only partial reporting may be available."
    WAS NICHT GEFUNDEN IST: welche Quelle/welches Medium GA4 einem Ereignis zuschreibt, dessen
    client_id keine Online-Sitzung hat. REICHWEITE: S1 bis S12, H2, H6, C1 im Wortlaut; dazu die
    Suche nach `source` (S7 1, S10 5, H2 1, H6 3), `medium` (S7 1, S10 3, H6 2), `attribut` (S2 1,
    S7 9, S9 7, S11 2, H2 8, H6 39), `(not set)` (S10 2), `direct` (H2 1). Die Treffer betreffen
    die Sitzungszuordnung aus S7, die Tabelle von `campaign_details`, die Promotions-Dimensionen
    von S10 und die Attributions-Einstellungen von H6 — keiner beantwortet die Frage.

(d) **STANDORT UND GERÄT: MITSENDBAR, SONST AUS DEM TAGGING ÜBER DIE client_id.** F7, F1 ·
    Katalog E1, E4.
    · S9: `user_location` (city, region_id, country_id, subcontinent_id, continent_id) hat
      Vorrang vor `ip_override`; `ip_override` ist "IP address Google Analytics uses to derive
      geographic information". "If you don't send user_location or ip_override, Google Analytics
      derives geographic information from tagging events using client_id."
    · S9: `device` (category, language, screen_resolution, operating_system,
      operating_system_version, model, brand, browser, browser_version) hat Vorrang vor
      `user_agent`; "If a request specifies neither device nor user_agent, Google Analytics
      derives device information from tagging events using client_id." In der App-Variante
      fehlt `user_agent`.
    · S9: Die granularen Standort- und Geräte-Einstellungen der Property gelten "regardless of
      the geographic information sent"; H4 zählt auf, was bei Abschaltung nicht erhoben wird
      (u. a. City, Browser User-Agent string).
    · S1: "joins the most recent geographic and device information from tagging … using
      client_id"; mit `session_id` binnen 24 Stunden die der konkreten Sitzung. "If device
      information isn't collected by your tag, it defaults to desktop for Web streams".
    · S11: `user_location`/`ip_override` seit 2025-05-14, `device`/`user_agent` seit 2025-06-11.
    · S8: Ein Server-Container mit Measurement-Protocol-Client "doesn't support all the features
      of the Measurement Protocol endpoint, such as deriving geographic and device information
      from tagging events."
    · C1: "some information, such as geolocation, won't be included" — ohne Datum der Aussage
      (s. den Doku-Stand oben).

(e) **WAS AUF KEINER GELESENEN SEITE STEHT — MIT REICHWEITE.** F1 · Katalog E1.
    NICHT GEFUNDEN: (1) ob ein Ereignis mit einer client_id, die gtag nie gesehen hat, einem
    NUTZER zugeordnet und als Nutzer gezählt wird; (2) ob es in Standardberichten ausser dem
    Ereignisbericht erscheint (C1 sagt es für den Ereignisbericht zu, S6 nennt es nicht
    "valid"); (3) dass eine solche client_id abgelehnt würde. REICHWEITE: S1 bis S12, C1, H1,
    H2, H8 im Wortlaut; dazu die Suche nach `valid` als Wort (S5 3, S6 3, S8 4, S11 1, C1 1),
    `invalid` (S5 10, S8 1, S9 1), `unknown` (0), `not seen` (0), `new user` (C1 1, H8 1),
    `already` (S6 1, S7 1, S10 1). Ausser S6 (Teil (a)) betreffen die Treffer das Geheimnis, den
    Validierungs-Endpunkt, `in_app_purchase`, Sitzungen in Erweiterungen und die User-ID. EIN
    NICHT-TREFFER, KEIN BEWEIS DER ABWESENHEIT.

(f) **DER ZWECK: ERGÄNZEN, NICHT ERSETZEN.** F2 · kein Katalog-Ort.
    · S1: "Key Point: The intent of the Measurement Protocol is to augment automatic collection
      through gtag, Tag Manager, and Google Analytics for Firebase, not to replace it." — "You
      must use tagging (gTag, Tag Manager, or Google Analytics for Firebase) to use this
      protocol." — "You must use gTag, Tag Manager, or Google Analytics for Firebase for tagging
      to use most of the Measurement Protocol features with Google Analytics." — "The purpose
      of the Measurement Protocol is to augment existing events collected using gtag, GTM, or
      Firebase."
    · S7: "lets you send offline data to your Web or App stream, in addition to the data you're
      already collecting with tagging or the Firebase SDK."
    · S2: "The Measurement Protocol is primarily designed for server-side or trusted
      environments"; für Manifest-V3-Erweiterungen, die gtag.js nicht laden können, "the
      Measurement Protocol is the recommended approach".
    · Alleinstehend: S1 lässt es zu ("it's possible to send events … solely with the Measurement
      Protocol"), mit "only partial reporting may be available".

(g) **ZUGANGSDATEN: api_secret UND measurement_id — ZWEI SKALARE IM QUERY-STRING, KEIN OAUTH.**
    F3 · Katalog A1, A2, A3, A4, A5, B3, C1, C2, C4, I4.
    · S9/S2: `api_secret` "Required. The API Secret from the Google Analytics UI"; erzeugt unter
      Admin > Data streams > Stream > "Measurement Protocol API secrets" > Create, mit Spitznamen;
      "Private to your organization. Should be regularly updated to avoid excessive SPAM." S2:
      "The api_secret is private. Don't expose it in the client-side code".
    · S9/S2: `measurement_id` identifiziert den Web-Datenstrom, "It is not the same as your
      Stream ID. It usually starts with G-."; abzulesen unter Admin > Data streams > Stream.
    · Träger: beide als Query-Parameter der URL (S2, Anfrageform).
    · Widerruf: S8, "In order to help combat spam, you're able to revoke api_secrets … another
      user with access to your stream may have revoked access to it by mistake." `api_secret` ist
      "case-sensitive"; je Datenstrom ein eigenes Geheimnis.
    · Admin API (Ressource oben): `secretValue` "Output only … Pass this value to the api_secret
      field"; Methoden create, delete, get, list, patch.
    · C1: Der Menüpunkt erscheint nur mit "Editor or Administrator permissions"; "If prompted,
      read and accept the Measurement Protocol terms."
    NICHT GEFUNDEN: eine Lebensdauer oder ein Ablauf des `api_secret`; ein Prüfinstrument für
    seine Gültigkeit — S5 sagt ausdrücklich: "The validation server does not validate the
    api_secret or measurement_id." REICHWEITE: S1 bis S12, Admin-Ressource, C1 im Wortlaut; dazu
    die Suche nach `expire` (C1 1 — Ablauf einer Sitzung), `lifetime` (0), `rotat` (0) und `valid`
    als Wortanfang (S2 4, S5 51, S6 7, S8 4, S9 17, S11 6, C1 1 — Validierung, Gültigkeit von
    Ereignissen, der Satz aus S8 zum Widerruf).

(h) **ENDPUNKT, FORM UND ANTWORT: 2xx AUCH BEI FEHLERHAFTER NUTZLAST.** F4 · Katalog B1, B2, B4,
    D1, D2, D3, D4, D5, G1, G2, G3.
    · S9: "All data must be sent securely using HTTPS POST requests." Endpunkt
      `https://www.google-analytics.com/mp/collect`, für Erhebung in der EU
      `https://region1.google-analytics.com/mp/collect`. Kopfzeile im Beispiel: `Content-Type:
      application/json`. Eine Versionsangabe steht weder im Pfad noch in einer Kopfzeile.
    · Rumpf (S9): `client_id` (Pflicht), `user_id`, `timestamp_micros` (Unix, MIKROsekunden),
      `user_properties`, `user_data`, `consent`, `non_personalized_ads` (veraltet),
      `user_location`, `ip_override`, `device`, `user_agent`, `validation_behavior`, `events[]`
      (Pflicht) mit `name` (Pflicht) und `params`. Wert im Beispiel von S10 als Zahl (`value`
      number).
    · **S9, WÖRTLICH: "The Measurement Protocol returns a 2xx status code if the HTTP request is
      received. The Measurement Protocol doesn't return an error code if the payload is
      malformed, or if the data is incorrect or not processed by Google Analytics."** Dazu: "If
      you don't get a 2xx status code, correct any errors in your HTTP request. Don't retry the
      same request." S5: "does not return HTTP error codes, even if an event is malformed or
      missing required parameters."
    · `validation_behavior` (S9): RELAXED (Vorgabe) "only rejects requests that are malformed"
      und nimmt falsche Namen oder Typen womöglich an; ENFORCE_RECOMMENDATIONS "rejects event and
      item parameters that aren't the correct type or that contain parameters that exceed
      limits" und Zeitstempel älter als 72 Stunden. Für den Betrieb: validation_behavior NICHT
      setzen, "to minimize the data rejected".
    · Ein Rückkanal im Rumpf der Antwort auf `/mp/collect` ist auf keiner Seite beschrieben.
    WAS DAS FÜR EINE ERFOLGSZEILE HEISST, STEHT ALS FOLGERUNG DA UND NICHT ALS BEFUND: Ein 2xx
    dieses Endpunkts belegt laut Doku den EMPFANG der HTTP-Anfrage, nicht die Gültigkeit der
    Nutzlast und nicht die Verarbeitung. ERSETZT KEINE MESSUNG.

(i) **TEST-INSTRUMENTE: VALIDIERUNGS-ENDPUNKT, EVENT BUILDER, REALTIME, DebugView — KEIN
    TESTMODUS-SCHLÜSSEL.** F5 · Katalog H1, H5, G2.
    · S5: Validierungs-Endpunkt `/debug/mp/collect` (EU: `region1…/debug/mp/collect`, S11
      2025-05-28); "All other request fields are the same." "Events sent to the validation server
      don't show up in reports." Antwort `{"validationMessages": [...]}` mit `fieldPath`,
      `description`, `validationCode` (VALUE_INVALID, VALUE_REQUIRED, NAME_INVALID,
      NAME_RESERVED, VALUE_OUT_OF_BOUNDS, EXCEEDED_MAX_ENTITIES, NAME_DUPLICATED); gültig =
      leeres Array. Empfehlung: ENFORCE_RECOMMENDATIONS beim Validieren.
    · WAS ER NICHT ZEIGT (S5): "does not validate the api_secret or measurement_id" — und damit
      nach (a)/(e) auch nicht, ob die client_id von gtag stammt (FOLGERUNG; die Seite sagt das
      nicht ausdrücklich).
    · S6: danach Realtime ("Events typically show up within a few seconds") und DebugView mit
      `"debug_mode": true` oder `1` und positivem `engagement_time_msec` im `params`. H7: Ereignisse
      sind im Debug-Modus unsichtbar, "if you've implemented consent mode and users have not
      given consent for Analytics cookies"; H7 rät, Entwickler-Verkehr herauszufiltern.
    · Event Builder: laut S9 mit ENFORCE_RECOMMENDATIONS; nicht lesbar ohne Anmeldung (Umfang).
    NICHT GEFUNDEN: ein Pendant zu `test_event_code` — eine Markierung, die ein Ereignis in den
    ECHTEN Endpunkt schickt und es als Test kennzeichnet. `debug_mode` schickt es in die echten
    Daten (H7: filtern). REICHWEITE: S1 bis S12, H7 im Wortlaut; dazu die Suche nach `test` als
    Wortanfang (S4 2, S5 1, S6 2, S10 1 — Beispielwerte, "test events", A/B-Test), `debug` (S5 4,
    S6 12, S10 1, S11 1, H7 40), `sandbox` (0).

(j) **EINWILLIGUNG: ZWEI SIGNALE IM RUMPF, SONST DIE DER ONLINE-INTERAKTION.** F6 · kein
    Katalog-Ort; nächstliegend I2.
    · S9, "Consent": `consent.ad_user_data` und `consent.ad_personalization`, je "GRANTED or
      DENIED", beide Optional. "If you don't specify consent, Google Analytics uses the consent
      settings from corresponding online interactions for the client or app instance."
      `non_personalized_ads` ist "Deprecated: Use the ad_personalization field of consent
      instead."
    · S1, "Privacy settings": MP-Ereignisse übernehmen über client_id Einstellungen wie "non
      personalized ads" und "limit ad tracking".
    · Ein Feld für `analytics_storage` oder `ad_storage` steht im Consent-Objekt von S9 NICHT.
      H3 kennt vier Einwilligungsarten für Tags (ad_storage, ad_user_data, ad_personalization,
      analytics_storage) — H3 gilt Tags, nicht dem Protokoll.
    · S12: "You must obtain consent from your end users, or otherwise provide them with the
      opportunity to opt-out" (Teil (o)).

(k) **GRENZEN.** F8 · Katalog H3, H4, D3, F1, F2, F3.
    · S2, "Limitations": höchstens "100 million non-conversion requests per hour for each
      property"; bei Überschreitung "silently ignores all non-conversion requests for the
      property for the remainder of the hour" (nicht für 360-Properties). Je Anfrage höchstens
      25 Ereignisse, je Ereignis 25 Parameter, 25 Nutzereigenschaften; Namen von Ereignissen und
      Parametern ≤ 40 Zeichen, nur alphanumerisch und Unterstrich, mit Buchstabe beginnend;
      Parameterwerte ≤ 100 Zeichen (360: 500); Nutzereigenschaften ≤ 24/36 Zeichen; Rumpf
      "smaller than 130kB".
    · Alter (S2): "backdated up to 72 hours"; älter unter RELAXED "accepts … but overrides its
      timestamp to 72 hours ago", unter ENFORCE_RECOMMENDATIONS abgelehnt. Für das Zusammenführen
      mit Tag-Ereignissen: binnen 48 Stunden nach dem Client-Zeitstempel.
    · S7, Fristen je Zweck: User-ID ≤ Ende des Geschäftstags der Sitzung · Sitzungszuordnung
      ≤ Sitzungsbeginn + 24 h · Export an Werbeplattformen ≤ letzte Sitzung + 63 Tage ·
      Zielgruppen (Web) ≤ letztes Online-Ereignis + 30 Tage.
    · Reservierte Namen (S9): Ereignisse u. a. `session_start`, `first_visit`,
      `user_engagement`, `error`, `ad_click`; `screen_view`, `ad_impression`, `in_app_purchase`
      nur für App-Datenströme; Parameter `firebase_conversion` und die Präfixe `_`, `firebase_`,
      `ga_`, `google_`, `gtag.`; Nutzereigenschaften u. a. `user_id`, `first_visit_time`.
    · Eigene Ereignisnamen: zulässig (S10: "You can also create and send your own custom
      events"); eine Registrierungspflicht steht nirgends. S1: Regeln zum Erzeugen oder
      Umbenennen von Ereignissen "aren't triggered by events sent with the Measurement Protocol".

(l) **DATA MANAGER API: ALTERNATIVE UND EMPFOHLENER WEG — KEINE ABKÜNDIGUNG; ALLOWLIST NUR FÜR
    DIE MULTI-SOURCE-GESTALT.** F9 · Katalog A1, I1, I3, I4.
    · Banner auf S1 bis S3 und S5 bis S12 (S4 und die Admin-Ressource tragen statt dessen das
      MCP-Banner, s. (q)): "The Measurement Protocol has reached a mature, finalized product
      state and will remain operational with no plans for deprecation. However, to ensure your
      technical setups are future-proofed, we recommend building server-to-server event
      integrations using the Data Manager API, which is our central infrastructure for future
      data ingestion innovations."
    · D1, Vergleich: DMA "Supports encryption", mehrere Ziele je Anfrage, "API secret: Not
      required", "fast-fail model"; das Protokoll "Only reports errors for test requests sent to
      the validation server". D3: "The Data Manager API requires OAuth credentials instead of an
      api_secret."
    · Kennungen für GA4-Ziele (D3, D5): `client_id` → `events.client_id`, "Required for web
      events"; `app_instance_id` für App-Ereignisse; `user_id` optional; Ziel über
      `product_destination_id` = Measurement-ID, `operating_account`/`login_account` = Property-ID
      mit `GOOGLE_ANALYTICS_PROPERTY`. D5: "Set to the unique identifier for a user instance of a
      web client. See the Measurement Protocol instructions." Anmeldung mit "Editor or
      Administrator role for the property"; "doesn't support sending events to a Google Analytics
      property using a linked data partner."
    · Allowlist: D6 (Multi-Source mit Transaktions-ID als zusätzliche Datenquelle zum Tag):
      "This feature is only available to accounts on an allowlist. Fill out the form …" — für
      Web-Datenströme dazu 14 Tage ohne Einfluss auf Conversion-Gebote. Auf D1 bis D5 steht KEIN
      Allowlist-Satz: gelesen im Wortlaut (ohne die Code-Blöcke von D5), dazu die Suche nach
      `allowlist`, `allow list`, `allow-list` über den vollen Text EINSCHLIESSLICH Code — 0 auf D1
      bis D5; POSITIVKONTROLLE: D6 trifft (1).
    · D5, Fristen für GA-Ereignisse: `eventTimestamp` "within the last 72 hours"; Zusammenführen
      mit Tag-Ereignissen binnen 48 Stunden.

(m) **KLICK-KENNUNG UND GOOGLE ADS: KEIN FELD FÜR EINE gclid — DIE VERBINDUNG LÄUFT ÜBER DIE
    client_id UND DIE VERKNÜPFUNG DER KONTEN.** F10 · Katalog E1; sonst kein Katalog-Ort.
    · Kein Feld für `gclid`, `gbraid`, `wbraid` oder `dclid` im Rumpf (S9) und in keiner
      Parametertabelle von S10: die Suche nach allen vier über den vollen Text von S9, S10 und der
      App-Variante von S10 EINSCHLIESSLICH Code ergibt 0. POSITIVKONTROLLE derselben Suche: S1 trägt
      `GBRAID/WBRAID` (Satz unten), H2 und H3 tragen `gclid`.
    · S1, "Advertising identifiers": "Advertising identifiers such as GBRAID/WBRAID collected
      during online interactions are automatically joined with Measurement Protocol events using
      client_id or app_instance_id."
    · H2: `session_start` trägt die gclid der Sitzung (Teil (c)).
    · S7, "Export events to advertising platforms": "Google Analytics includes the events you send
      using Measurement Protocol in exports to linked advertising products such as Google Ads or
      Campaign Manager 360." Bedingung: ≤ 63 Tage nach dem letzten Online-Ereignis, innerhalb des
      Attributionsfensters. S11, 2022-05-23: MP-Ereignisse mit user_id werden seither "exported
      and attributed".
    · H5: Google-Ads-Conversions entstehen aus GA-Schlüsselereignissen bei verknüpftem Konto.
    · S1, "Remarketing": gleiche Geräte bei eingeschalteten Google Signals, geräteübergreifend nur
      mit User-ID.

(n) **NUTZERDATEN UND USER-ID.** Katalog E1, E2.
    · S4: `user_data` mit `sha256_email_address[]`, `sha256_phone_number[]`, `address[]`
      (`sha256_first_name`, `sha256_last_name`, `sha256_street`, dazu ungehasht `city`,
      `region`, `postal_code`, `country`); SHA-256, hex; normalisiert; bis zu 3 E-Mail/Telefon,
      2 Adressen. "We recommend that you also include the user_id parameter whenever user_data is
      provided." Anders als gtag hasht das Protokoll nicht selbst.
    · H8: user_id ≤ 256 Zeichen; darf keine Angaben tragen, "that a third party could use to
      determine a user's identity".

(o) **POLITIK UND BEDINGUNGEN.** Katalog I2.
    · S12: volle Rechte an den gesendeten Daten und am GA-Konto; Hinweis an Endnutzer und
      "obtain consent … or otherwise provide them with the opportunity to opt-out"; keine Daten,
      die eine Person identifizieren (Namen, E-Mail-Adressen) oder ein Gerät dauerhaft
      identifizieren; kein Session-Stitching ohne Einwilligung; Verstoss: "termination of your
      Google Analytics account(s)". WIE SICH DAS ZU (n) VERHÄLT (gehashte E-Mail-Adresse), SAGT
      KEINE GELESENE SEITE — gemeldet, nicht gedeutet.
    · C1: "Measurement Protocol terms", anzunehmen beim Anlegen des Geheimnisses.

(p) **DEDUPLIZIERUNG.** Katalog H2.
    · S10, `purchase`: `transaction_id` Pflicht, "helps you avoid getting duplicate events for a
      purchase". S10, `in_app_purchase`: GA "doesn't automatically detect or remove duplicate
      in_app_purchase events."
    · D5 (DMA): "Google Analytics uses the information from the first instance of the same event
      that it received" — deckt sich mit google.md, LAUF 1.

(q) **BEFUNDE AM INSTRUMENT UND AN DEN SEITEN.** Kein Katalog-Ort.
    · Die maschinelle "Page Summary" von S2 beschrieb in der Variante `gtag` die App-Kennungen
      (`firebase_app_id`, `app_instance_id`), während der Text der Seite `measurement_id` und
      `client_id` nennt. Eine Zusammenfassung ist keine Quelle.
    · Die Reiter "Firebase / gtag.js" sind eigene Serverseiten (`client_type`); wer nur die
      Umleitung ohne Parameter lädt, liest die App-Fassung (S9).
    · AUFFORDERUNGEN AUF FREMDEN SEITEN, GEMELDET UND NICHT BEFOLGT: das Banner "Try the MCP server
      for Google Analytics. Install from GitHub" (S4, Admin-Ressource) — eine Produktwerbung an
      Leser, nicht an dieses Werkzeug gerichtet; "Fill out the form" (D6); "Open in API Explorer"
      / "Click Execute" (D5); "read and accept the Measurement Protocol terms" (C1). Keine Seite
      des Abschnitts verlangte eine Anmeldung zum Lesen; allein der Event Builder.

(r) **DER ZWEITHAND-BESTAND, GEGEN DIESE LESUNG GEHALTEN.** Der Bestand bleibt wörtlich stehen.
    ROHFASSUNG, "(f) GA4 — GEPRÜFT (2026-08-03)" (GELESEN vom Architekten am 2026-08-03):
    · "Das GA4-Measurement-Protocol ist dazu gedacht, bereits über gtag oder GTM erhobene
      Ereignisse zu ERGÄNZEN. Ohne diese ist nur eingeschränkte Auswertung verfügbar." —
      BESTÄTIGT, Teil (f); S1 sagt zusätzlich "You must use tagging … to use this protocol."
    · "GA4 verknüpft geografische Angaben über die `client_id`, und geografische Daten lassen sich
      über das Protokoll NICHT selbst mitsenden." — ERSTE HÄLFTE BESTÄTIGT als Rückfall (Teil (d));
      ZWEITE HÄLFTE WIDERLEGT: `user_location` und `ip_override` laut S11 seit 2025-05-14. Nach
      diesen zwei Daten war sie schon am 2026-08-03 überholt (FOLGERUNG aus zwei Daten; welche
      Quelle der Architekt las, ist nicht belegt — C1 sagt heute noch Ähnliches, s. (b)).
    · "Die `client_id` steckt im `_ga`-Cookie, das gtag setzt — im Blocker-Fall also NICHT
      vorhanden." — FÜR DEN gtag-FALL IM KERN BESTÄTIGT, aber nicht wörtlich: S9 lässt "A client
      ID cookie" zu und verlinkt auf H1, das `_ga` als gtag-Cookie führt; "_ga" als Wert der
      client_id steht auf keiner Seite. NICHT AUSSCHLIESSLICH: S9 empfiehlt einen Wert aus
      `gtag('get')` bzw. GTM, C1 eine selbst erzeugte Zeichenkette. "IM BLOCKER-FALL NICHT
      VORHANDEN" — OFFEN: keine gelesene Seite spricht über Blocker; der Satz ist eine
      FOLGERUNG.
    docs/ziel-befunde/google.md, Teil (f) (GELESEN 2026-08-20/-24):
    · "ZWEI SKALARE — api_secret und measurement_id", kein OAuth — BESTÄTIGT, Teil (g).
    · Umstiegspfad zur Data Manager API — BESTÄTIGT, Teil (l).
    · Allowlist für "Google Analytics" — BESTÄTIGT FÜR DIE MULTI-SOURCE-GESTALT (D6); für den Weg
      der empfohlenen und eigenen Ereignisse (D4/D5) steht im gelesenen Umfang KEIN
      Allowlist-Satz. Teil (f) unterscheidet die beiden Gestalten nicht.
    · Der Trigger "eine Ankündigung, die das Measurement Protocol beschränkt oder abkündigt" ist
      NICHT eingetreten: das Banner sagt "no plans for deprecation" (GELESEN; eine
      Doku-Aussage, keine Zusage des Anbieters).
    docs/ziel-befunde/google.md, LAUF 1 (2026-08-24): "ausschliesslich für
    Google-Analytics-Ziele: clientId, userId, appInstanceId" — BESTÄTIGT (D3, D5), mit der
    Schärfung, dass `client_id` für Web-Ereignisse PFLICHT ist; die 72/48-Stunden-Fenster und
    "Editor or Administrator role" — BESTÄTIGT (D5).
