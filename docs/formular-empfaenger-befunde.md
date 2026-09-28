# FORMULAR-EMPFÄNGER-BEFUNDE — was die Empfänger der Formular-Daten tatsächlich tun

**WAS DIESE DATEI IST:** die GEMESSENEN und GELESENEN Befunde über die FORMULAR-EMPFÄNGER —
die Adressen, an die unser ausgeliefertes Skript Formularinhalte IM BROWSER schickt
(Entscheidung P13-2 der Phase 13): generische Webhook-Adressen (Make, Zapier) und
Formular-Endpunkte eines ESP. Je Empfänger ein eigener Abschnitt, dazu der VORLÄUFIGE
Fragenkatalog dieser Anbieter-Klasse. Formular-Empfänger sind weder Fan-Out-Ziel
(docs/ziel-befunde/) noch Plattform-Anbieter (docs/plattform-befunde.md); sie sind eine
eigene Anbieter-Klasse nach der Dauerregel "EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM
SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN UND DIE BEFUNDE VERORTET SIND …"
(docs/immer-beachten.md).
ABLAGEORT: OWNER-ENTSCHEIDUNG 2026-09-28 (Entscheidung P13-15 der Phase 13).

**WAS SIE NICHT IST:** Sie trägt KEINE Regeln — die stehen in docs/immer-beachten.md. Sie
trägt KEINE Entscheidungen, Setzungen oder Auflagen — die stehen in der Standdatei der
laufenden Phase bzw. an der Roadmap-Zeile (docs/roadmap.md). Und sie ist KEIN Zuschnitt: sie
sagt, was ist, nicht was zu bauen ist. Ein Befund, der eine Entscheidung berührt, nennt sie
als BEZUG und entscheidet nichts.

**DER AUSLÖSER — sie lädt NICHT automatisch:** Wer einen Formular-Empfänger zuschneidet,
anbindet, recherchiert oder eine Live-Test-Anleitung dafür schreibt, lädt ZUERST diese
Datei — Kopf, Katalog und den Abschnitt des Empfängers.

**PROVENIENZ-PFLICHT AN JEDER ANGABE, ohne Ausnahme:** GEMESSEN (mit Datum und Instrument) ·
GELESEN (Anbieter-Doku, mit URL, Titel und Lesedatum) · NUTZERBEITRAG (Forum oder Community
des Anbieters, mit URL und Datum des Beitrags — weder Anbieter-Doku noch unsere Messung) ·
FOLGERUNG (als solche gekennzeichnet). Keine Angabe wird von GELESEN oder NUTZERBEITRAG auf
GEMESSEN gehoben, weil sie plausibel klingt.
**EINE DOKU-AUSSAGE ZU EINER FRAGE, DIE EINE MESSUNG VERLANGT,** wird abgelegt MIT dem
Vermerk "ERSETZT DIE MESSUNG NICHT". Messkandidaten stehen je Empfänger als EIGENE Liste.
**EIN "STEHT DORT NICHT"** nur mit benannter REICHWEITE: welche Seiten, welche Suche.

**BUCHSTABEN:** Die Befunde eines Empfängers tragen Buchstaben (a), (b), … — sie laufen JE
EMPFÄNGER über alle Lesungen und Messungen fort und beginnen nie neu; nach (z) folgt (aa)
wie in docs/ziel-befunde.md. Ein Verweis von aussen nennt DATEI, ABSCHNITT und BUCHSTABEN —
auch docs/ziel-befunde/ und docs/plattform-befunde.md führen Buchstaben.

**FORTSCHREIBUNG:** Ein neuer Empfänger bekommt einen eigenen Abschnitt, HINTEN angefügt.
Eine weitere Lesung oder Messung zu einem bestehenden Empfänger kommt HINTEN in seinen
Abschnitt, unter eine eigene DATIERTE Unterüberschrift. Ein älterer Befund wird nicht
umgeschrieben; widerlegt ihn ein neuer, bekommt er einen VORBEHALT, der auf den neuen
Buchstaben zeigt.

**SIE WIRD NICHT ARCHIVIERT:** Sie gehört keiner Phase. Ein Befund gilt, bis der Anbieter
sein Verhalten ändert — dann wird neu gemessen, nicht weggeräumt.

## Vorläufiger Fragenkatalog der Formular-Empfänger (2026-09-28)

VORLÄUFIG, weil es in dieser Anbieter-Klasse noch keine gebaute Anbindung gibt, aus der er
abgeleitet werden könnte (Dauerregel "EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN …"). HERKUNFT:
abgeleitet aus dem Zuschnitt der Phase 13 (Entscheidung P13-2, Setzungen P13-5, P13-6, P13-8,
Arbeit P13-12) und den vom Auftrag der Anbieter-Lesung Make vorgegebenen Achsen K1 bis K7;
Formulierung CC, 2026-09-28. Wird er nach der ersten Anbindung überarbeitet, wird das DATIERT.

**K1 — Annahme**
- K1.1 Welche HTTP-Methoden nimmt die Adresse an?
- K1.2 Welche Content-Types nimmt sie an: `application/json`,
  `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` (die Form eines
  `sendBeacon` mit String-Rumpf)?
- K1.3 Wie werden Felder abgebildet — Namen, mehrfach vorkommende Namen, Verschachtelung,
  Query und Rumpf zugleich?
- K1.4 Welche Grössengrenze gilt für den Rumpf?
- K1.5 Wird eine unerwartete Feldmenge abgewiesen — mit welchem Status?

**K2 — Aufruf aus dem Browser**
- K2.1 Welche CORS-Kopfzeilen trägt die Antwort (`Access-Control-Allow-Origin`, `-Methods`,
  `-Headers`, `-Expose-Headers`)?
- K2.2 Beantwortet die Adresse einen Preflight (`OPTIONS`)?
- K2.3 Sind Status und Rumpf der Antwort aus einem fremden Ursprung lesbar — auch bei einer
  Fehlerantwort?
- K2.4 Was ist die Standardantwort (Status, Rumpf), und ist sie konfigurierbar (Status,
  Kopfzeilen, Weiterleitung)?
- K2.5 Kommt die Antwort sofort oder erst nach der Verarbeitung?

**K3 — Die Adresse**
- K3.1 Welche Form hat sie (Host, Pfad, Kennzeichen, Region)?
- K3.2 Behandelt der Anbieter sie als Geheimnis oder rät er zur Geheimhaltung?
- K3.3 Welcher Schutz wird angeboten, und ist er aus dem Browser nutzbar, ohne ein Geheimnis
  in den ausgelieferten Text zu legen? (Bezug: Setzung P13-6 der Phase 13; Trigger (ii) des
  offenen Punkts "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT".)
- K3.4 Wann wird eine Adresse ungültig, und was antwortet sie dann?

**K4 — Grenzen und stille Verluste**
- K4.1 Welche Ratenlimits gelten, und mit welchem Status wird eine Überschreitung
  beantwortet?
- K4.2 Gibt es eine Warteschlange — Grösse, Verhalten wenn voll, Status?
- K4.3 Was geschieht mit einer Anfrage, wenn der empfangende Ablauf AUS oder deaktiviert ist
  — gespeichert oder verworfen, mit welchem Status?
- K4.4 Was geschieht bei erschöpftem Kontingent?
- K4.5 Was geschieht bei einem Ausfall des Anbieters?
- K4.6 Wo meldet die Antwort Erfolg, obwohl die Daten später verlorengehen können?

**K5 — Aufbewahrung**
- K5.1 Was speichert der Anbieter von einer eingehenden Anfrage (Rumpf, Kopfzeilen, Query)?
- K5.2 Wie lange, je Ablage?
- K5.3 In welcher Region, und ist sie wählbar?
- K5.4 Lässt sich die Speicherung abschalten oder vermindern?

**K6 — Test und Nachweis**
- K6.1 Wo sieht der Betreiber, dass ein Aufruf angekommen ist, und mit welchen Angaben?
- K6.2 Gibt es einen Test- oder Erkennungsaufruf?

**K7 — Werbeblocker**
- K7.1 Wird die Adresse (Host oder Pfad) von gängigen Filterlisten erfasst? — MESSFRAGE, per
  Doku nicht beantwortbar.

## Make

### Anbieter-Lesung vom 2026-09-28 (CC, Phase 13, Arbeit P13-11)

**INSTRUMENT:** Playwright-MCP. Text je Seite über `textContent` des Inhaltsbereichs, nach
Entfernen von `script`, `style`, `noscript`, `svg`, `template`. `textContent` statt
`innerText`, weil es auch nicht gezeigte Teile trägt — die Code-Beispielgruppen der
Webhooks-App (Query String · Form Data · Multipart · JSON) sind damit vollständig erfasst.
Auszüge unter `.playwright-mcp/make-*.json` (in `.gitignore`, nicht im Repo).
**KEINE ANGABE DIESER LESUNG IST GEMESSEN.** Es gab keine Eingabe, keine Anmeldung, keinen
Download und keinen Aufruf einer Webhook-Adresse.

**GELESENER UMFANG — VOLL** (Lesedatum je Seite 2026-09-28; in Klammern der Stand, den die
Seite selbst angibt):
- https://help.make.com/webhooks — "Webhooks - Help Center" (Updated 25 Sep 2026)
- https://apps.make.com/gateway — "Webhooks - Apps Documentation" (Updated 04 Aug 2026) —
  Custom webhook, Custom mailhook, Webhook response, Troubleshooting
- https://help.make.com/scenario-settings — "Scenario settings - Help Center" (Updated 08 Sep
  2026)
- https://help.make.com/active-and-inactive-scenarios — "Active and inactive scenarios guide
  - Make Help Center - Help Center" (Updated 08 Sep 2026)
- https://help.make.com/fix-general-errors — "Fix general errors - Help Center" (Updated 27
  May 2026)
- https://help.make.com/scenario-history — "Scenario history - Help Center" (Updated 25 Sep
  2026)
- https://help.make.com/organizations — "Organizations - Help Center" (Updated 25 Sep 2026)
- https://help.make.com/allow-connections-to-and-from-make-ip-addresses — "Allow connections
  to and from Make IP addresses - Help Center" (Updated 15 Jan 2026)
- https://help.make.com/schedule-a-scenario — "Schedule a scenario - Help Center" (Updated 30
  Jun 2026); Ziel des Links "Learn more about setting up a rate limit here" auf der
  Webhooks-Seite
- https://help.make.com/alert-an-outage-may-have-impacted-your-scenario-execution-on-4-september-2025
  — "[RESOLVED] Alert: An outage may have impacted your scenario execution on 4 September,
  2025 - Help Center" (Updated 19 Jan 2026)
- NUTZERBEITRÄGE, voll gelesen, weil ihr Titel eine offene Frage (K2) trägt:
  https://community.make.com/t/why-i-got-cors-in-make-com/40150 ·
  https://community.make.com/t/how-to-get-custom-headers-in-webhook-response/35367 ·
  https://community.make.com/t/webhook-and-whatsapp-invite-cors-error/46541

**GELESENER UMFANG — GEZIELT** (Suche über den Seitentext, Achse und Positivkontrolle je
Seite):
- https://www.make.com/en/pricing — "Pricing & Subscription Packages | Make" (ohne Datum).
  Achse: `log|retention|days|webhook|queue|storage|data center|region|confidential`, dazu die
  Zeilen der Vergleichstabelle "Execution log storage (days)", "Hosting", "Full-text execution
  log search", "Audit logs" zellenweise, dazu die FAQ "What happens if I run out of
  credits?" im Wortlaut. Positivkontrolle: 18 Fundstellen der Achse (Suche mit Abstand
  200 Zeichen je Fundstelle), Tabellenkopf Free · Core · Pro · Teams · Enterprise gelesen.
- https://developers.make.com/custom-apps-documentation/app-components/webhooks — "Webhooks |
  Custom Apps Documentation | Make Developer Hub". Achse:
  `cors|access-control|preflight|text/plain|content-type|secret|confidential|api key|
  signature|verif|429|410|queue`. Treffer nur zu `verification`/`respond` der Custom Apps.
  Positivkontrolle: "Webhook" trifft.
- https://developers.make.com/api-documentation/api-reference/hooks — "Hooks | Make API |
  Make Developer Hub". Achse: `cors|access-control|preflight|text/plain|secret|confidential|
  apikey|api key|ip restriction|hook.*make.com|"url"|queue|disable|enabled|410|429`.
  Positivkontrolle: "hook" trifft 199-mal.
- Websuche `"CORS" site:help.make.com` (2026-09-28): KEINE Seite der Make-Hilfe zu CORS unter
  den Treffern.

**REITER, TABELLEN, SYMBOLE, BILDER:** Keine der gelesenen Hilfeseiten trägt Elemente mit
`role=tab`; auf der Developer-Seite zu den Custom Apps sind zwei Reiter "Code", beide
ausgewählt. Die Vergleichstabelle der Preisseite trägt 199 Symbole OHNE Beschriftung (kein
`alt`, kein `aria-label`) in zwei Formen — ein grauer Strich und ein Kreis; die Zuordnung
"Kreis = enthalten, Strich = nicht enthalten" ist FOLGERUNG aus der Form und deckt sich für
"Full-text execution log search" mit dem Text der Seite "Scenario history" ("Available on
Pro and higher plans"). Die zwei Tabellen auf "Fix general errors" sind Layout-Tabellen mit
dekorativen Symbolen. BILDER SIND NICHT GELESEN — u. a. das Bild zur Option "JSON
pass-through" und das Bild der Browser-Antwort "Accepted" (apps.make.com/gateway); was sie
zeigen, steht hier nicht.

**GESEHEN, NICHT GEÖFFNET** (je mit Grund):
- https://www.help.make.com/en/help/tools/webhooks — ältere Adresse derselben Webhooks-Seite
  im Suchindex; gelesen ist die aktuelle.
- https://www.make.com/en/help/connections/receiving-a-webhook-from-a-web-service — ältere
  Adresse, im Suchindex als "Get started - Help Center" betitelt.
- https://developers.make.com/custom-apps-documentation/app-structure/webhooks und
  …/app-components/webhooks/dedicated — Webhooks für den Bau eigener Apps, nicht das Modul
  Custom webhook; die Schwesterseite ist gezielt durchsucht ohne Treffer zu K1 bis K3.
- https://help.make.com/webhook-triggered-ai-agent, https://help.make.com/mailhook-triggered-ai-agent
  — KI-Agenten, andere Auslöser.
- https://www.make.com/en/integrations/gateway, …/gateway/http,
  https://www.make.com/en/blog/notion-webhooks-in-make — Marketing und Blog.
- https://help.make.com/incomplete-executions, …/options-related-to-incomplete-executions,
  …/errors-that-dont-create-incomplete-executions, …/manage-incomplete-executions,
  …/retry-error-handler, …/break-error-handler — Verarbeitung NACH der Annahme einer Anfrage;
  die Annahme selbst (K4) tragen sie nach ihrem Titel nicht.
- https://help.make.com/scenario-execution-history, …/scenario-execution-cycles-and-phases,
  …/scenario-execution-flow — Ablauf eines Laufs; die Aufbewahrung (K5) steht auf "Scenario
  history" und der Preisseite, beide gelesen.
- https://help.make.com/data-stores, …/data-and-mapping, …/manage-time-zones,
  …/upgrade-to-enterprise, …/mcp-toolboxes — andere Gegenstände.
- Community: "CORS Error in Kommo API" (/24413), "Not able to run HTTP Request to a URL due
  to Front End CORS policy" (/10470), "Failing using the API because of CORS?" (/19959) — CORS
  in der ANDEREN Richtung (Make-API bzw. HTTP-Modul), nicht der Aufruf einer Webhook-Adresse;
  "Incoming eu1 webhooks returning error (among multiple organizations)" (/79688) — ein
  Störungsbericht von Nutzern; der Störungsfall (K4.5) ist über die offizielle
  Ausfall-Meldung gelesen.
**PRÜFUNG DER AUSSCHLUSSLISTE GEGEN DIE OFFENEN FRAGEN** (2026-09-28): Offen nach der Lesung
sind K1.2 (`text/plain`), K1.3 (mehrfache Namen), K2.1 bis K2.3 (CORS, Preflight,
Lesbarkeit), K3.2 (Geheimnis), K4.3 (Status bei AUS), K5 (Kopfzeilen, Wirkung von
"confidential" auf die Webhook-Logs) und K7. Nach dem Titel trug eine Seite der Liste eine
dieser Fragen — das Link-Ziel "Schedule a scenario" (Ratenlimit, K4.1) —, und drei
Community-Beiträge trugen K2; alle vier sind GEÖFFNET und oben geführt. Die übrigen
Ausschlüsse tragen nach ihrem Titel keine offene Frage.

**(a) K1.1, K1.2 — ANGENOMMENE FORMATE UND METHODEN.** GELESEN, apps.make.com/gateway,
Abschnitt "Supported incoming data formats": "Make supports the following incoming data
formats: Query string · Form data · JSON". Die Beispiele zeigen `GET` mit Query,
`POST` mit `application/x-www-form-urlencoded`, `POST` mit `multipart/form-data` und `POST`
mit `application/json`. Für Dateien in `multipart/form-data` verlangt die Seite eine
Datenstruktur mit einer Sammlung aus `name`, `mime`, `data`. Eine Option "Get request HTTP
method" macht die Methode im Szenario verfügbar. EINE ABSCHLIESSENDE LISTE DER METHODEN STEHT
DORT NICHT. `text/plain` ist NICHT GENANNT — Reichweite: die zwei Kernseiten voll, die zwei
Developer-Seiten gezielt nach `text/plain`. ERSETZT DIE MESSUNG NICHT.
→ GEMESSEN: (t), (v).

**(b) K1.3, K1.5 — ABBILDUNG DER FELDER.** GELESEN, apps.make.com/gateway: Kommen Daten in
Query UND Form oder JSON zugleich, werden sie zu EINEM Bündel zusammengeführt; bei doppelten
Namen "the query string takes precedence and overwrites the data that was received in the
other formats"; davon wird abgeraten. Ohne Datenstruktur "Make accepts all incoming data
without validation"; mit Datenstruktur werden Anfragen, die die Prüfung nicht bestehen,
"rejected with HTTP status code 400". Die Struktur kann auch durch einen ersten Aufruf bzw.
"Detect new values" bestimmt werden; dann wird nicht geprüft. "JSON pass-through" reicht den
JSON-Rumpf als Text weiter. help.make.com/webhooks, "Webhook logs": "Parsed items combine the
query parameters and body of the webhook request in one bundle." WAS BEI MEHRFACH VORKOMMENDEN
NAMEN INNERHALB DESSELBEN RUMPFS GESCHIEHT (Checkbox-Gruppen), STEHT DORT NICHT — Reichweite
wie (a).
→ GEMESSEN: (w).

**(c) K1.4 — GRÖSSE.** GELESEN, apps.make.com/gateway: "The maximum allowed webhook's payload
size (Content-Length) is 5 MB (5.242.880 bytes) regardless of the subscription tier."

**(d) K2.4, K2.5 — STANDARDANTWORT OHNE MODUL "WEBHOOK RESPONSE".** GELESEN,
help.make.com/webhooks, "Webhook response module", Tabelle: angenommen in die Warteschlange
-> 200 "Accepted" · Warteschlange voll -> 400 "Queue is full" · Ratenprüfung gescheitert ->
429 "Too many requests". apps.make.com/gateway, "Webhook response module": 200 "Accepted",
400 "Queue is full." — DIESE TABELLE FÜHRT KEINE 429-ZEILE; die zwei Seiten weichen
voneinander ab. Zeitpunkt, apps.make.com/gateway: "The response is returned to the
webhook's caller right away during the execution of the Custom Webhook module." FOLGERUNG:
Die Standardantwort 200 belegt die Aufnahme in die Warteschlange, nicht die Verarbeitung.
→ GEMESSEN: (t), (x), (aa); bei Szenario AUS (z).

**(e) K2.4 — KONFIGURIERBARE ANTWORT.** GELESEN, apps.make.com/gateway: Das Modul "Webhook
response" setzt Status und Rumpf, dazu eigene Kopfzeilen; Beispiele: HTML mit
`Content-type: text/html`, Weiterleitung mit 303 und `Location`. Scheitert das Szenario:
500 "Scenario failed to complete." Liegt keine Antwort binnen 180 Sekunden vor, antwortet
Make mit "200 Accepted". help.make.com/webhooks: Steht das Modul in der Mitte und scheitert
ein späteres Modul, wird das Szenario nicht deaktiviert und es kommt keine
Fehlerbenachrichtigung; steht es zuletzt, wird benachrichtigt.
help.make.com/schedule-a-scenario: Überschreitet ein Szenario MIT diesem Modul sein
Szenario-Ratenlimit, erhält der Aufrufer 429 "Too many requests".

**(f) K2.1, K2.2, K2.3 — CORS UND PREFLIGHT.** IN DER ANBIETER-DOKU NICHT GEFUNDEN.
Reichweite: alle voll gelesenen Hilfeseiten; die zwei Developer-Seiten gezielt nach
`cors|access-control|preflight`; die Websuche `"CORS" site:help.make.com`. Zum Preflight
steht an KEINER gelesenen Stelle etwas, auch in keinem Nutzerbeitrag.
NUTZERBEITRAG, community.make.com/t/35367 (2024-04-28): Eine Antwort über "Webhook
response" auf einen jQuery-POST aus einer Webseite trug laut Beitrag
`Access-Control-Allow-Origin: *`, `Server: cloudflare`, `X-Powered-By: Make
Gateway/production` und eine eigene Kopfzeile; lesbar wurde die eigene Kopfzeile erst, als
im Modul `Access-Control-Expose-Headers` gesetzt war.
NUTZERBEITRAG, community.make.com/t/46541 (2024-07-17): CORS-Fehler, wenn die Webhook-Antwort
auf einen WhatsApp-Einladungslink WEITERLEITET; ob Make oder das Ziel die Ursache ist, bleibt
dort offen.
NUTZERBEITRAG, community.make.com/t/40150 (2024-06): ein seltener CORS-Fehler bei einer
Verarbeitung, die "2 mins longer than usual" dauert; ohne Klärung.
MESSUNG NÖTIG — die Beiträge sind zwei Jahre alt und betreffen Antworten MIT dem Modul
"Webhook response"; über die Standardantwort, über Fehlerantworten und über den Preflight
sagen sie nichts.
BEZUG, KEINE ENTSCHEIDUNG: Arbeit P13-12 der Phase 13 führt als ABGELEITETE Schwäche "Die
Zustellung ist vom Browser aus nicht bestätigbar". Trüge die Antwort
`Access-Control-Allow-Origin: *`, wäre ihr Status lesbar — die Aufnahme in die
Warteschlange, nach (d) nicht die Verarbeitung.
→ GEMESSEN: (t), (u), (x), (y).

**(g) K3.1 — FORM DER ADRESSE.** GELESEN, apps.make.com/gateway, Beispiele:
`https://hook.make.com/yourunique32characterslongstring` (Platzhalter). GELESEN,
developers.make.com, Hooks: das Kennzeichen `udid` hat in allen Beispielen 32 Zeichen, die
Beispiel-Adresse ist `https://local.make.cloud/wh/<udid>` (eine Beispielumgebung). GELESEN,
help.make.com/allow-connections-to-and-from-make-ip-addresses: Zonen `us2.make.com`,
`us1.make.com`, `eu2.make.com`, `eu1.make.com`, `us1.make.celonis.com`,
`eu1.make.celonis.com`; "Make uses dynamic Ingress IPs". WELCHEN HOST DIE WEBHOOK-ADRESSE JE
ZONE TRÄGT, STEHT AUF KEINER GELESENEN SEITE — ablesbar an einer echten Adresse (Messkandidat
M8).
→ GEMESSEN für eine Zone: (s).

**(h) K3.2, K3.3 — GEHEIMHALTUNG UND SCHUTZ.** Dass die Adresse ein Geheimnis sei oder geheim
zu halten, steht auf KEINER gelesenen Seite — Reichweite: alle voll gelesenen Hilfeseiten und
die gezielte Suche nach `secret` auf den zwei Developer-Seiten.
GELESEN, apps.make.com/gateway, drei Schutzmittel: (1) "API Key authentication" — ein oder
mehrere Schlüssel, ASCII, höchstens 512 Zeichen, "for security reasons, you won't be able to
view it afterwards", mitzusenden in der Kopfzeile `x-make-apikey`; beschrieben als "an
optional extra layer of security". (2) "IP restrictions" — eine Liste erlaubter Adressen,
CIDR zulässig. (3) "Data structure" — Anfragen, die die Prüfung nicht bestehen, werden mit
400 abgewiesen.
FOLGERUNG: (1) aus dem Browser hiesse, den Schlüssel in den ausgelieferten Text zu legen —
dort ist er kein Geheimnis mehr; eine eigene Kopfzeile löst zudem einen CORS-Preflight aus
(Fetch-Spezifikation, hier NICHT gelesen). (2) trägt nicht, weil die Anfrage von der
Adresse des BESUCHERS kommt. (3) weist Fehlformen ab, keine gültig geformte Fremdanfrage.
BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-6 der Phase 13 ("DIE EINGETRAGENE ADRESSE IST KEIN
GEHEIMNIS") — die Doku widerspricht ihr nicht. Würde ein API-Schlüssel eingesetzt, berührte
das Trigger (ii) des offenen Punkts "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF
project_secrets BLEIBT" ("die Kennung selbst ein Geheimnis").
→ GEMESSEN zum Preflight einer eigenen Kopfzeile: (u).

**(i) K3.4, K4.3 — WANN DIE ADRESSE NICHT ANNIMMT.** GELESEN, help.make.com/webhooks,
"Expiration of inactive webhooks": Webhooks, die "not connected to any scenario for more
than 5 days (120 hours)" sind, werden deaktiviert; "The hook return 410 Gone status code."
GELESEN, help.make.com/fix-general-errors: "There is no scenario listening for this webhook"
tritt auf, wenn ein Webhook aufgerufen wird, der keinem AKTIVEN Szenario zugeordnet ist — u. a.
wenn das Szenario "deleted, disabled, or no longer uses that webhook"; der STATUS dieser
Antwort steht dort nicht. Ein GELÖSCHTER Webhook antwortet mit "410 – Webhook not found".
GELESEN, developers.make.com, Hooks, "Disable hook": "The disabled hook does not accept any
data." — ohne Status.
GELESEN, help.make.com/webhooks, "How Make processes webhooks": "When a webhook receives a
request, the system stores the request in the webhook's queue." OB EINE ANFRAGE BEI
AUSGESCHALTETEM SZENARIO IN DIE WARTESCHLANGE GEHT ODER ABGEWIESEN WIRD, IST AUS DEN
GELESENEN SEITEN NICHT ZU ENTSCHEIDEN — sie stehen nebeneinander, ohne sich aufeinander zu
beziehen. MESSUNG NÖTIG (M4).
→ VORBEHALT: GEMESSEN (z) — bei ausgeschaltetem Szenario kein Fehler, sondern 200 und Queue;
die Doku-Aussage zu "disabled" steht dazu im Widerspruch oder meint etwas anderes. Unbekannte
Kennung: (y).

**(j) K4.1 — RATENLIMITS.** GELESEN, help.make.com/webhooks, "Webhook rate limit": "Make can
process up to 300 incoming webhook requests per 10 second interval. If you send more, the
system returns an error with status code 429." — ein Suchindex zeigte am 2026-09-28 für
dieselbe Seite "up to 30 incoming webhook requests per second"; die Seite selbst trägt die
obige Fassung. GELESEN, help.make.com/schedule-a-scenario, "Set a scenario rate limit":
"Maximum runs to start per minute", Vorgabe 100; darüber hinaus "Make stores subsequent
requests in a queue", mit Modul "Webhook response" erhält der Aufrufer 429 (s. (e)).
ERSETZT DIE MESSUNG NICHT.

**(k) K4.2 — WARTESCHLANGE.** GELESEN, help.make.com/webhooks, "Webhook queue details": je
10 000 lizenzierte Credits im Monat bis zu 667 Einträge je Webhook-Warteschlange, höchstens
10 000; "When the webhook queue is full, Make rejects all incoming webhook data which is over
the limit" (Antwort nach (d): 400 "Queue is full"). GELESEN, Preisseite, FAQ "What is Usage
Allowance?": "Webhook queue size 667 (10,000 maximum)". Verarbeitung: bei sofortigem
Auslöser parallel, Option "Process data in order"; bei geplanter Verarbeitung "Maximum
number of results" je Lauf, Vorgabe 2.

**(l) K4.4 — ERSCHÖPFTE CREDITS.** GELESEN, Preisseite, FAQ "What happens if I run out of
credits?": "Your scenarios won't continue to run, until credits are added again. […]
incoming webhooks will be queued up to the amount of webhook queue storage you have
available and will then be processed once your scenarios resume with added credits."
FOLGERUNG: Ist die Schlange voll, gilt (k).

**(m) K4.6 — FEHLER IM SZENARIO.** GELESEN, help.make.com/scenario-settings, "Errors before
deactivation": Beginnt ein Szenario mit einem Sofort-Auslöser, wird die Einstellung ignoriert
"and the scenario is deactivated immediately once the first error has occurred". GELESEN,
help.make.com/webhooks, "Error Handling": das Szenario "stops immediately" bei sofortiger
Ausführung, "after 3 unsuccessful attempts" bei geplanter. GELESEN, scenario-settings: Ist
der Ordner der unvollständigen Ausführungen voll und "Discard data if storage is full" an,
werden die Daten verworfen, "Discarded data can't be recovered".
FOLGERUNG: Nach einem einzigen Fehler im Szenario gilt für jede weitere Anfrage (i) — und
die Standardantwort der vorangehenden Anfrage war nach (d) bereits 200.

**(n) K4.5 — AUSFALL.** GELESEN, die Ausfall-Meldung vom 4. September 2025: Zwischen 14:37 und
16:35 CEST "If data was sent to Make at that time, it was not received, and scenarios were
not executed"; Make empfiehlt, fehlende Daten erneut zu senden, und verweist darauf, dass
"many apps or services retry sending data several times". Welchen Status Anfragen während
des Ausfalls erhielten, steht dort nicht.
FOLGERUNG: Ein Browser, der einmal sendet und dann weiternavigiert, sendet nicht erneut.

**(o) K5.1, K5.2, K5.4 — WAS MAKE AUFBEWAHRT.** GELESEN, help.make.com/webhooks: "Incoming
webhook data is always stored in the queue regardless of the data is confidential option
settings. As soon as the data is processed in a scenario, it is permanently deleted." Die
Einträge der Schlange sind im Menü "Webhooks", Reiter "Queue" einsehbar und löschbar.
"Webhook logs": "Make stores webhook logs for 3 days. For the organizations on the Enterprise
plan, Make keeps the webhook logs for 30 days"; das Detail zeigt "Webhook request
(timestamp, URL, method, headers, query, body)", die Antwort und die "Parsed items".
GELESEN, help.make.com/scenario-settings, "Keep data confidential": Make speichert die Daten
jedes Laufs in den Ausführungs-Logs; eingeschaltet "Make won't retain any of that data", die
Logs zeigen den Lauf "without the actual payload". "Store incomplete executions": fehlgeschlagene
Läufe werden samt Daten aufbewahrt und zählen auf den Speicher des Tarifs.
GELESEN, Preisseite, Tabellenzeile "Execution log storage (days)": Free 7 · Core 30 · Pro 30
· Teams 30 · Enterprise 60.
OB "KEEP DATA CONFIDENTIAL" AUCH DEN RUMPF IN DEN WEBHOOK-LOGS UNTERDRÜCKT, STEHT AUF KEINER
GELESENEN SEITE — die Webhooks-Seite sagt es nur für die Schlange (M7). OB DIE LOGS DIE
ADRESSE DES AUFRUFERS TRAGEN, steht dort ebenfalls nicht; sie tragen die "headers".

**(p) K5.3 — REGION.** GELESEN, help.make.com/organizations: Je Organisation wählbar "United
States (US)" oder "European Union (EU)" als Standort des Rechenzentrums, "where the data
center that stores and processes your data is located"; "You cannot change the location of
the data center after you create the organization." GELESEN, Preisseite, Tabellenzeile
"Hosting": "AWS (EU/North America)" in allen Tarifen.

**(q) K6.1, K6.2 — NACHWEIS FÜR DEN BETREIBER.** GELESEN, help.make.com/webhooks: Menü
"Webhooks", je Webhook die Reiter "Queue" und "Logs"; Logs mit Status "success, warning,
error", Zeitpunkt, Grösse und Detail (s. (o)); Aufbewahrung 3 Tage. GELESEN,
help.make.com/scenario-history: Laufeinträge mit Status, Dauer, Credits, Detail je Modul;
Volltextsuche ab Pro; Dauer nach Tarif (s. (o)). GELESEN, apps.make.com/gateway: "Run once"
lässt das Modul auf einen Aufruf warten; der Aufruf der Adresse im Browser zeigt die Antwort
"Accepted"; "Detect new values" bestimmt die Struktur aus einem Beispielaufruf neu.

**(r) K7.1 — WERBEBLOCKER.** NICHT GELESEN — per Doku nicht beantwortbar. MESSFRAGE (M10).
→ GEMESSEN am Listentext, nicht im Browser: (ab).

### Messkandidaten Make (aus der Lesung vom 2026-09-28)

Stand der Lesung: keiner gemessen; die Liste entscheidet nicht, welcher gemessen wird. Was
seither gemessen ist, führt "Messung 2026-09-28", am Ende des Abschnitts.
- M1 — CORS-Kopfzeilen der STANDARDANTWORT auf einen `POST` aus fremdem Ursprung, je
  Content-Type (`text/plain`, `application/x-www-form-urlencoded`, `multipart/form-data`,
  `application/json`); sind Status und Rumpf lesbar? (K2.1, K2.3; zu (f)) — GEMESSEN (t), (x)
- M2 — Antwort auf einen Preflight (`OPTIONS`), wie ihn `application/json` auslöst.
  (K2.2; zu (f)) — GEMESSEN (u)
- M3 — Wird ein `text/plain`-Rumpf (Form eines `sendBeacon`) angenommen, und wie wird er
  abgebildet? (K1.2; zu (a)) — GEMESSEN (v)
- M4 — Status und Verbleib einer Anfrage bei ausgeschaltetem Szenario, bei deaktiviertem
  Hook und nach einer Deaktivierung durch einen Fehler. (K4.3; zu (i), (m)) — TEILWEISE
  GEMESSEN (z): nur Szenario AUS
- M5 — Tragen die Fehlerantworten (400, 410, 429, 500) dieselben CORS-Kopfzeilen, sind sie
  aus dem Browser lesbar? (K2.3; zu (d), (i), (j)) — TEILWEISE GEMESSEN (y): nur 410, nur curl
- M6 — Folgt ein `fetch` einer 303-Weiterleitung aus "Webhook response", und woran scheitert
  CORS dabei? (K2.4; zu (e), (f))
- M7 — Unterdrückt "Keep data confidential" den Rumpf in den Webhook-Logs? (K5.4; zu (o))
- M8 — Host der Webhook-Adresse je Zone, abgelesen an einer echten Adresse des
  Owner-Kontos. (K3.1; zu (g)) — TEILWEISE GEMESSEN (s): nur eu2
- M9 — Abbildung mehrfach vorkommender Feldnamen im selben Rumpf (Checkbox-Gruppen).
  (K1.3; zu (b)) — GEMESSEN (w) für form-urlencoded
- M10 — Erfassen gängige Filterlisten die Webhook-Adresse (Host bzw. Pfad)? (K7.1; zu (r))
  — TEILWEISE GEMESSEN (ab): am Listentext, nicht im Browser
- M11 — Zeit bis zur Standardantwort unter normaler Last. (K2.5; zu (d)) — GEMESSEN (aa),
  ohne Last

### Messung 2026-09-28 (CC mit Owner, Phase 13, Messkandidaten M1–M5, M9–M11)

**AUFBAU:** EINE Webhook-Adresse im Konto des Owners, Modul "Custom webhook", KEINE
Datenstruktur, kein Modul "Webhook response", Szenario EIN (ausser in (z)). Die Adresse steht
hier absichtlich nur gekürzt: `hook.eu2.make.com/icdb…`. Köderwerte sind erfunden
(`probe=m1-form`, `probe=m3` …), keine echten Daten. Insgesamt 9 Anfragen an diese Adresse (7
per curl bei EIN, 1 aus dem Browser, 1 per curl bei Szenario AUS) und eine an eine erfundene
Kennung auf demselben Host.
**DREI SCHICHTEN, GETRENNT GEFÜHRT:** CURL (CC, Git Bash auf Windows, jede Anfrage mit
`Origin: https://probe.publayer.net`; Kopfzeilen, Rumpf und `time_total` je Anfrage; Protokolle
im Scratchpad, nicht im Repo) · BROWSER (Owner, Konsole einer veröffentlichten Seite unter
publayer.net) · MAKE-OBERFLÄCHE (Owner, Reiter "Logs", "Queue", History; von ihm als Text
übermittelt — OWNER-ANGABE, von CC nicht eingesehen).
**EINE RICHTIGSTELLUNG IN DER ÜBERMITTLUNG, OFFEN GEFÜHRT:** Die erste Meldung des Owners nannte
für zwei Anfragen die Köderwerte `m5-json` und `m7-multipart`, die nie gesendet worden waren.
Auf Rückfrage korrigiert auf `m1-json` und `m1-multipart`, "Wurde vorhin falsch übermittelt".
Übernommen sind nur die korrigierten Werte.

**(s) M8 (teilweise) — DER HOST DIESER ADRESSE.** GEMESSEN, curl, 2026-09-28: Die Adresse des
Owner-Kontos liegt auf `hook.eu2.make.com`, gefolgt von einem Kennzeichen aus 32 Zeichen (vgl.
(g)). Jede Antwort kam über `Server: cloudflare` mit `x-powered-by: Make Gateway/production`
und einer Kopfzeile `Make-Actual-Status`, die den Status wiederholt. GRENZE: eine Zone. Welcher
Host zu eu1, us1, us2 gehört, ist nicht gemessen.

**(t) M1 — CORS DER STANDARDANTWORT JE CONTENT-TYPE.** GEMESSEN, curl, 2026-09-28:

| # | Anfrage | Status | Access-Control-* | Rumpf | time_total |
|---|---|---|---|---|---|
| 1 | POST `application/x-www-form-urlencoded`, `probe=m1-form` | 200 | `Allow-Origin: *` | `Accepted` | 0,230 s |
| 2 | POST `multipart/form-data`, `probe=m1-multipart` | 200 | `Allow-Origin: *` | `Accepted` | 0,154 s |
| 3 | POST `text/plain`, Rumpf `probe=m3` | 200 | `Allow-Origin: *` | `Accepted` | 0,212 s |
| 4 | POST `application/json`, `{"probe":"m1-json"}` | 200 | `Allow-Origin: *` | `Accepted` | 0,174 s |
| 6 | POST `application/x-www-form-urlencoded`, `box=a&box=b` | 200 | `Allow-Origin: *` | `Accepted` | 0,156 s |

Die Antwort trägt `Content-Type: text/plain; charset=utf-8`. Ein `Access-Control-Expose-Headers`
kommt nicht vor. Die Gross- und Kleinschreibung der Kopfzeilen wechselte zwischen den
Anfragen (1, 2, 4 gross, 3, 5, 6 klein). In HTTP/1.1 ist das bedeutungslos, hier nur als
Beobachtung geführt.
GRENZE: curl zeigt Kopfzeilen, nicht was ein Browser daraus macht — dafür (x).

**(u) M2 — PREFLIGHT.** GEMESSEN, curl, 2026-09-28. Anfrage 5: `OPTIONS` mit
`Access-Control-Request-Method: POST` und `Access-Control-Request-Headers: content-type` → 200,
Rumpf `ok`, `access-control-allow-origin: *`, `access-control-allow-methods: GET, PUT, POST,
PATCH, DELETE, HEAD, OPTIONS`, `access-control-allow-headers: content-type`, dazu `allow: GET,
HEAD, POST, PUT, PATCH, DELETE, OPTIONS`. Anfrage 7 (ZUSATZ, über die vorgegebene Matrix
hinaus): dieselbe mit `Access-Control-Request-Headers: content-type, x-make-apikey,
x-probe-header` → 200, `access-control-allow-headers: content-type,x-make-apikey,x-probe-header`.
Die Antwort SPIEGELT also die angefragten Namen, auch einen erfundenen.
GRENZE: Ob ein Browser nach dieser Freigabe den eigentlichen `POST` mit JSON-Rumpf absetzt, ist
nicht im Browser gemessen. Der Browser-Test (x) war eine einfache Anfrage ohne Preflight.

**(v) M3 — `text/plain`.** GEMESSEN, curl, 2026-09-28: Anfrage 3 → 200 `Accepted` (s. (t)).
MAKE-OBERFLÄCHE, OWNER-ANGABE 2026-09-28: Bundle 1 enthält `value: probe=m3` — der Rumpf kommt
als EIN Feld `value` mit dem ungeparsten Text an, nicht als Feld `probe`. Zum Vergleich
Anfrage 1 (form-urlencoded): `probe: m1-form`. Anfragen 2 und 4: `probe: m1-multipart`
bzw. `probe: m1-json`.

**(w) M9 — MEHRFACH VORKOMMENDER NAME.** GEMESSEN, curl, 2026-09-28: Anfrage 6
(`box=a&box=b`) → 200 `Accepted`. MAKE-OBERFLÄCHE, OWNER-ANGABE 2026-09-28: Bundle 1 enthält
unter `box` ein ARRAY mit `1: a`, `2: b` — beide Werte bleiben erhalten, in Sendereihenfolge.
GRENZE: nur form-urlencoded. Multipart und JSON mit Mehrfachnamen sind nicht gemessen.

**(x) M1 IM BROWSER — LESBARKEIT DER STANDARDANTWORT.** GEMESSEN, Browser, Owner, 2026-09-28:
In der Konsole einer veröffentlichten Seite unter publayer.net lief
`fetch(<Adresse>, {method: 'POST', body: new URLSearchParams({probe: 'm1-browser'}), keepalive:
true})` mit Ausgabe von Status und Rumpf. VORAB BENANNTE ERWARTUNG: lesbar → `STATUS 200 BODY
Accepted`, nicht lesbar → `TypeError`. ERGEBNIS: `STATUS 200 BODY Accepted`, keine
CORS-Meldung in der Konsole. POSITIVKONTROLLE: `probe=m1-browser` ist als sechster Durchlauf
in Make angekommen (OWNER-ANGABE). Status und Rumpf der Standardantwort sind damit aus einem
fremden Ursprung lesbar.
GRENZE: eine einfache Anfrage (form-urlencoded, kein Preflight), EIN Browser (vom Owner nicht
benannt), EINE Seite. `keepalive: true` war gesetzt.

**(y) M5 (teilweise) — EINE FEHLERANTWORT OHNE CORS.** GEMESSEN, curl, 2026-09-28 (ZUSATZ,
über die vorgegebene Matrix hinaus): `POST` an eine ERFUNDENE Kennung aus 32 Zeichen auf
`hook.eu2.make.com` → `410 Gone`, Rumpf `Webhook not found.`, `Make-Actual-Status: 410`,
OHNE `Access-Control-Allow-Origin`. Die Antwort deckt sich mit (i) ("410 – Webhook not found").
FOLGERUNG, NICHT IM BROWSER GEMESSEN: Ein Browser liefert diese Antwort dem Skript nicht aus.
`fetch` wirft einen `TypeError`, der an sich nicht von einem Netzfehler oder einem Werbeblocker
zu unterscheiden ist.
GRENZE: nur 410. Die Antworten 400 (Schlange voll, Datenstruktur), 429 und 500 sind nicht
gemessen; sie herbeizuführen hiesse, Grenzen des Kontos zu belasten.

**(z) M4 (teilweise) — SZENARIO AUS.** Owner schaltet das Szenario aus, dann GEMESSEN, curl,
2026-09-28T08:29:50Z: Anfrage 1 mit `probe=m4-off` → `200 OK`, Rumpf `Accepted`,
`access-control-allow-origin: *`, `make-actual-status: 200` — DIESELBE Antwort wie bei EIN.
MAKE-OBERFLÄCHE, OWNER-ANGABE 2026-09-28: Die Anfrage liegt in der Queue, "gepuffert und nicht
verworfen". Es gibt KEINEN Fehler-Log. Nach dem Wiedereinschalten ("Process old data") wird
sie um 10:36:46 (Ortszeit des Owners) mit Status "Success" abgearbeitet, und die Queue ist
danach leer.
STATUS UND VERBLEIB, GETRENNT: Status 200, wie bei EIN · Verbleib: in der Queue, nach dem
Einschalten verarbeitet.
FOLGERUNG: Der Aufrufer kann ein ausgeschaltetes Szenario an der Antwort NICHT erkennen.
WIDERSPRUCH ZU EINER DOKU-AUSSAGE IN (i), OFFEN GEFÜHRT: "Fix general errors" nennt "There is no
scenario listening for this webhook" für einen Webhook, der keinem AKTIVEN Szenario zugeordnet
ist, "deleted, disabled" eingeschlossen. Bei einem ausgeschalteten Szenario zeigte die Messung
weder eine Ablehnung noch einen Fehler-Log. Ob "disabled" dort etwas anderes meint als OFF,
ist nicht entschieden.
GRENZE: nicht gemessen sind der deaktivierte Hook (API "Disable hook"), die Deaktivierung
durch einen Fehler (m), die Wahl GEGEN "Process old data" beim Einschalten und eine volle
Queue während AUS.

**(aa) M11 — ANTWORTZEIT.** GEMESSEN, curl, 2026-09-28: `time_total` der neun curl-Anfragen
zwischen 0,095 s (OPTIONS) und 0,230 s (POST), über den Cloudflare-Knoten `VIE` (Kennung in
`CF-RAY`). Die Standardantwort wartet also nicht auf die Verarbeitung — zu (d), und bei
Szenario AUS wie (z).
GRENZE: ein Rechner, ein Knoten, je Anfrage ein Lauf — keine Aussage über Streuung oder
Last.

**(ab) M10 — FILTERLISTEN.** GEMESSEN am Listentext, 2026-09-28. Geladen wurden die öffentlichen
Fassungen:
- EasyList (Version 202609280810) und EasyPrivacy (Version 202609280810)
- uBlock Origin "filters" (Last modified 2026-09-26) samt der zehn Dateien, die es per
  `!#include` nachlädt
- uBlock Origin "privacy" (2026-09-27) samt `resource-abuse`
- AdGuard Base (2.4.93.60) und AdGuard Tracking Protection (2.1.12.43), jeweils in der
  uBlock-Fassung von filters.adtidy.org

Insgesamt 17 Dateien und 657 565 Zeilen, im Scratchpad, nicht im Repo.
ACHSEN:
- (1) jede Regel, deren Host-Token genau `make.com` ist oder auf `.make.com` endet;
- (2) Teilwortsuche `make.com`, jeder Treffer im Wortlaut gelesen;
- (3) `celonis`;
- (4) `webhook`, `hook.*make`, `/wh/`.

ERGEBNIS:
- Achse (1): EIN Treffer, `email.gh-mail.make.com$image` (AdGuard Tracking) — eine andere
  Unterdomain, nur für Bilder.
- Achse (2): alle übrigen Treffer sind fremde Domains mit dem Wortteil "make", etwa
  `analytics.freemake.com` und `zapandmake.com`.
- Achse (3): `www.dxp-data.celonis.com`, `email.gh-mail.celonis.com$image`.
- Achse (4): nur fremde Hosts.

Auf `hook.eu2.make.com` zielt KEINE Regel.
POSITIVKONTROLLE in denselben Dateien: `doubleclick.net` trifft in jeder Datei ausser
`resource-abuse` (einer reinen Mining-Liste; dort trägt die Kontrolle nicht). `google-analytics.com`
trifft in EasyList 0-mal — EasyList ist eine Werbeliste — und wäre dort als Kontrolle
untauglich gewesen.
GRENZE: Ein Listentreffer ist nicht das Verhalten eines Blockers im Browser. Allgemeine Regeln
über Pfade oder reguläre Ausdrücke sind mit dieser Suche nicht ausgewertet. Kosmetische Regeln
und Einstellungen eines Blockers sind nicht erfasst. Das Verhalten zeigt erst der Live-Test.

**MESSKANDIDATEN NACH DIESER MESSUNG:**
- GEMESSEN: M1 → (t), (x); M2 → (u); M3 → (v); M9 → (w); M11 → (aa).
- TEILWEISE: M4 → (z); M5 → (y); M8 → (s); M10 → (ab), am Listentext, nicht im Browser.
- UNVERÄNDERT OFFEN: M6, M7.
- NEU AUS DIESER MESSUNG:
  - M12 — Was geschieht mit der Queue, wenn beim Einschalten NICHT "Process old data"
    gewählt wird? (K4.3; zu (z))
  - M13 — `fetch` gegen eine unbekannte Kennung im Browser: wirft er `TypeError`, und steht
    eine CORS-Meldung in der Konsole? (K2.3; zu (y))
