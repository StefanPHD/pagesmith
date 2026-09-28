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

### Erweiterung für E-Mail-Anbieter mit eigenem Formular-Empfang (2026-09-28)

ERGÄNZT am 2026-09-28 (CC, Phase 13, Auftrag der Anbieter-Lesung Brevo, systeme.io,
Mailchimp, KlickTipp). HERKUNFT: Achsen K8 bis K13 vom Architekten vorgegeben, K14 aus der
Ergänzung des Architekten zum selben Auftrag; Formulierung CC. GEGENSTAND: E-Mail-Anbieter
(ESP), die ein Formular DIREKT empfangen sollen, also ohne Umweg über eine generische
Webhook-Adresse. K1 bis K7 gelten weiter, wo sie greifen — besonders K5 (Aufbewahrung,
Region). Weiterhin VORLÄUFIG.

**K8 — Öffentlicher Formular-Endpunkt**
- K8.1 Gibt es eine Adresse, an die ein EIGENES HTML-Formular direkt per `POST` senden kann,
  ohne Skript des Anbieters?
- K8.2 Welche Form hat sie (Host, Pfad, Kennungen), und ist sie je Formular, je Liste oder je
  Konto?
- K8.3 Wo findet der Betreiber sie in der Oberfläche des Anbieters (Menüpfad, eingebetteter
  Code)?
- K8.4 Nennt der Anbieter das Einbetten des nackten HTML-Formulars (ohne sein Skript) als
  unterstützten Weg, oder nur sein Skript bzw. seinen Iframe?

**K9 — Erwartete Felder**
- K9.1 Welche Feldnamen erwartet der Endpunkt für E-Mail, Vorname, Nachname und eigene Felder
  (Attribute, Merge-Tags)? Gross- oder Kleinschreibung?
- K9.2 Welche Felder sind Pflicht, und was geschieht, wenn eines fehlt?
- K9.3 Gibt es VERSTECKTE Pflichtangaben — Listen- oder Formular-Kennung, Konto-Kennung,
  Token — und stehen sie in der Adresse oder als (verstecktes) Feld?
- K9.4 Was geschieht mit Feldern, die der Anbieter nicht kennt (verworfen, abgewiesen,
  angelegt)?

**K10 — Schutz gegen Bots**
- K10.1 Captcha (welches, abschaltbar?), Honeypot-Feld, Einmal-Token, Zeitstempel, Prüfung von
  `Referer` oder `Origin`?
- K10.2 Welche davon lassen einen `POST` aus einem fremden Browser-Ursprung scheitern, der
  das Skript des Anbieters nicht geladen hat?
- K10.3 Lässt sich ein solcher Schutz je Formular abschalten, und was sagt der Anbieter dazu?

**K11 — Double-Opt-In**
- K11.1 Löst ein Eintrag über das Formular ein Double-Opt-In aus — immer, wählbar, nie?
- K11.2 Wer versendet die Bestätigungsmail (der Anbieter, aus welchem Absender)?
- K11.3 Ist eine Einwilligungs-Checkbox Pflicht, und unter welchem Feldnamen wird sie
  erwartet?
- K11.4 In welchem Zustand steht der Kontakt vor der Bestätigung (angelegt, unbestätigt, gar
  nicht)?

**K12 — Antwort**
- K12.1 Antwortet der Endpunkt mit einer Weiterleitung (auf welche Seite, einstellbar?), mit
  HTML oder mit JSON?
- K12.2 Unterscheidet sich die Antwort bei Erfolg und bei Fehler (Status, Rumpf)?
- NUR ABLEGEN: Wir navigieren selbst; im Modus `no-cors` ist jede Antwort für das Skript
  `opaque` (Setzung P13-21 der Phase 13). Eine Weiterleitung auf eine Seite des Anbieters
  sieht der Besucher nicht.

**K13 — Andere Wege**
- K13.1 Gibt es eine API mit Schlüssel, die Kontakte anlegt? — NUR ABLEGEN: Ein Schlüssel
  stünde im Browser öffentlich im ausgelieferten Text; nach Setzung P13-6 der Phase 13 für
  uns ausgeschlossen.
- K13.2 Gibt es fertige Module des Anbieters in Make oder Zapier (Kontakt anlegen, Liste
  zuweisen)? — Beleg, dass der Umweg über eine generische Webhook-Adresse trägt.

**K14 — Eigene Bestätigung des Anbieters**
- K14.1 Sendet der Anbieter selbst eine Bestätigungs- oder Willkommensmail, sobald ein
  Kontakt über ein Formular eingetragen wird — unabhängig vom Double-Opt-In?
- K14.2 Ist sie ohne Kampagne, Sequenz oder Automatisierung in seiner Oberfläche einstellbar
  (eigener Text, Absender)?
- K14.3 Greift sie auch bei einem Eintrag über den Formular-Endpunkt aus K8 bzw. über die
  Module aus K13.2, oder nur bei seinem eigenen Formular?
- GRUND DER FRAGE (Ergänzung des Architekten, 2026-09-28): Deckt der Anbieter das ab, braucht
  der Betreiber dafür keinen Versand durch Pagesmith.

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
→ GEMESSEN am Listentext, nicht im Browser: (ab). Im Browser für EINEN Blocker: (ae).

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
  aus dem Browser lesbar? (K2.3; zu (d), (i), (j)) — TEILWEISE GEMESSEN (y): nur 410, nur curl;
  die 410 im Browser: (ac), (ad)
- M6 — Folgt ein `fetch` einer 303-Weiterleitung aus "Webhook response", und woran scheitert
  CORS dabei? (K2.4; zu (e), (f))
- M7 — Unterdrückt "Keep data confidential" den Rumpf in den Webhook-Logs? (K5.4; zu (o))
- M8 — Host der Webhook-Adresse je Zone, abgelesen an einer echten Adresse des
  Owner-Kontos. (K3.1; zu (g)) — TEILWEISE GEMESSEN (s): nur eu2
- M9 — Abbildung mehrfach vorkommender Feldnamen im selben Rumpf (Checkbox-Gruppen).
  (K1.3; zu (b)) — GEMESSEN (w) für form-urlencoded
- M10 — Erfassen gängige Filterlisten die Webhook-Adresse (Host bzw. Pfad)? (K7.1; zu (r))
  — TEILWEISE GEMESSEN (ab): am Listentext, nicht im Browser; im Browser für EINEN Blocker (ae)
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
→ Die FOLGERUNG ist im Browser GEMESSEN, für EINEN Browser: (ad).

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
    eine CORS-Meldung in der Konsole? (K2.3; zu (y)) — GEMESSEN (ad)

### Messung 2026-09-28, im Browser (Owner, Phase 13, Planrunde der Scheibe 13-1, G0)

**AUFBAU:** Der Owner setzte Konsolen-Einzeiler ab, die CC vorgegeben hatte. Ort war eine
veröffentlichte Seite unter publayer.net, Adresse wie in "Messung 2026-09-28" (Szenario EIN, keine
Datenstruktur, kein Modul "Webhook response"). Köderwerte `probe=n1` … `probe=n7`. Die Adresse
steht hier nicht.
Browser: Google Chrome 153.0.8010.53 (64-Bit). Blocker: uBlock Origin Lite (MV3), Filtermodus
"Vollständig", Standard-Filterlisten. Beides ist OWNER-ANGABE zur zweiten Reihe (N3, N4, N7) und
für die erste Reihe (N1–N6) nicht gesondert benannt; dort hiess der Blocker "uBlock Origin".
Die Einzeiler gaben `r.type` und `r.status` aus. Die Ausgabe der ersten Reihe trug nach Angabe
des Owners `r.type` NICHT — belegt ist dort nur OK bzw. FEHLER.
Was UNSERE Laufzeit betrifft (Umleitung eines Blockers, Offline, Signal), steht nicht hier,
sondern in docs/aktiver-stand.md, Vermerk P13-22 der Phase 13; dort gilt es auch nur für die
laufende Phase.
Die Ergebnisse sind OWNER-ANGABE 2026-09-28: Konsole, Netzwerk-Tab und Make-Oberfläche.

**(ac) DIE 410 IST IM MODUS `no-cors` FÜR DAS SKRIPT UNSICHTBAR.** GEMESSEN, Browser, 2026-09-28.
Beide Aufrufe liefen mit `mode: 'no-cors'`, `keepalive: true` und einem Rumpf aus
`URLSearchParams`.
- N1 (echte Adresse, Blocker AUS): Konsole OK, Netzwerk 200; `probe: n1` ist in den Make-Logs
  angekommen. `keepalive` hat den Aufruf also nicht verhindert.
- N2 (dieselbe Adresse, letztes Zeichen der Kennung verfälscht, Blocker AUS): Konsole OK,
  Netzwerk 410 (Gone).

FOLGERUNG: Eine gelöschte oder falsch abgeschriebene Adresse ist im Modus `no-cors` am Ausgang
des Aufrufs nicht von einer gültigen zu unterscheiden. Der Typ der Antwort ist NICHT gemessen,
weil `r.type` fehlte. Dass er `opaque` war, folgt aus der Fetch-Spezifikation und ist hier nicht
gelesen.
GRENZE: ein Browser, eine Zone (eu2).

**(ad) M13 — DIE 410 IM MODUS `cors` WIRFT.** GEMESSEN, Browser, 2026-09-28, Blocker AUS.
Beide Aufrufe ohne `mode`, also im Standardmodus `cors`, mit `keepalive: true`.
- N5 (echte Adresse): Konsole OK, Netzwerk 200.
- N6 (verfälschte Kennung wie N2): Konsole `FEHLER TypeError Failed to fetch`, Netzwerk
  410 (Gone) bzw. `net::ERR_FAILED`; nach Angabe des Owners eine CORS-Blockade wegen der 410.

Die FOLGERUNG aus (y) ist damit für einen Browser bestätigt: Die Fehlerantwort ohne
`Access-Control-Allow-Origin` erreicht das Skript nicht, `fetch` wirft.
FOLGERUNG: Im Modus `cors` unterscheidet sich eine unbekannte Kennung am Ausgang von einer
gültigen. Vom Netzfehler (s. Vermerk P13-22) unterscheidet sie sich dort NICHT — beide sind
`TypeError`.
GRENZE: ein Browser, nur 410. Die Antworten 400, 429 und 500 sind im Browser nicht gemessen.

**(ae) K7.1 — UBLOCK ORIGIN LITE LÄSST DIE MAKE-ADRESSE DURCH.** GEMESSEN, Browser, 2026-09-28,
im ersten Lauf "N3". Dort ging der Aufruf, anders als vorgegeben, an die echte Make-Adresse und
nicht an eine sicher gesperrte. Blocker EIN, `mode: 'no-cors'`: Konsole OK, Netzwerk 200.
Das ist der erste Browser-Nachweis zu (ab).
GRENZE: ein Blocker in der Standard-Konfiguration, eine Zone (eu2). Andere Blocker, andere Listen
und die Einstellungen eines Blockers sind nicht erfasst.

**MESSKANDIDATEN NACH DIESER MESSUNG:**
- GEMESSEN: M13 → (ad).
- ERWEITERT, WEITER TEILWEISE: M5 → (ac), (ad) — die 410 im Browser; M10 → (ae) — ein Blocker.
- UNVERÄNDERT OFFEN: M6, M7, M12; M4 und M8 wie zuvor.

## Brevo

### Anbieter-Lesung vom 2026-09-28 (CC, Phase 13, Arbeit P13-64)

**INSTRUMENT:** Playwright-MCP, wie bei Make: Text je Seite über `textContent` des
Artikelkörpers nach Entfernen von `script`, `style`, `noscript`, `svg`, `template`. Damit
sind auch die NICHT vorausgewählten Reiter erfasst (gezählt über `role=tab`, je Seite unten
genannt). Die Seiten der Hilfe tragen kein `time`-Element; ein Stand der Seite ist daher
nicht angegeben. Ablage des Werkzeugs unter `.playwright-mcp/` (in `.gitignore`).
**KEINE ANGABE DIESER LESUNG IST GEMESSEN.** Keine Eingabe, keine Anmeldung, kein Download,
kein Aufruf eines Formular-Endpunkts.

**GELESENER UMFANG — VOLL** (Lesedatum je Seite 2026-09-28):
- https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo —
  "Create a sign-up form in Brevo" (5 Reiter: "Build tab"/"Form design tab" und "Double
  confirmation"/"Simple confirmation"/"No confirmation"; alle über `textContent` gelesen)
- https://help.brevo.com/hc/en-us/articles/19591451188114-Protect-your-forms-from-bots-and-spam-signups
  — "Protect your forms from bots and spam signups"
- https://help.brevo.com/hc/en-us/articles/360019551939-Add-a-CAPTCHA-to-a-sign-up-form-created-in-Brevo
  — "Add a CAPTCHA to a sign-up form created in Brevo" (Reiter "Create a Google reCAPTCHA",
  "Create a Cloudflare Turnstile CAPTCHA", "Standard sign-up form", "Pop-up form"; alle
  gelesen)
- https://help.brevo.com/hc/en-us/articles/360019846960-Troubleshooting-issues-with-your-forms
  — "Troubleshooting issues with your forms"
- https://help.brevo.com/hc/en-us/articles/208733449-Double-opt-in-DOI-What-it-is-and-how-to-track-user-sign-ups
  — "Double opt-in (DOI): What it is and how to track user sign-ups" (Reiter "The DOI is
  confirmed"/"The DOI is not confirmed"; beide gelesen)
- https://help.brevo.com/hc/en-us/articles/27353832123026-Set-up-a-double-opt-in-process-for-a-sign-up-form-created-outside-of-Brevo
  — "Set up a double opt-in process for a sign-up form created outside of Brevo"
- https://help.brevo.com/hc/en-us/articles/360019485320-About-sign-up-unsubscribe-and-profile-update-forms
  — "About sign-up, unsubscribe, and profile update forms"
- https://help.brevo.com/hc/en-us/articles/360000454204-Guidelines-for-a-GDPR-compliant-sign-up-form
  — "Guidelines for a GDPR-compliant sign-up form"
- https://help.brevo.com/hc/en-us/articles/360001005510-Data-storage-location — "Data storage
  location"
- https://help.brevo.com/hc/en-us/articles/115000764784-Use-Make-to-integrate-an-app-with-Brevo
  — "Use Make to integrate an app with Brevo" (Reiter "Supported triggers"/"Supported
  actions"; beide gelesen)
- https://apps.make.com/sendinblue — "Brevo - Apps Documentation" (Updated 09 Dec 2025; die
  Make-Seite zur Brevo-App)
- Das Verzeichnis der Hilfe-Sektion "Forms":
  https://help.brevo.com/hc/en-us/sections/202171729-Forms (13 Artikel; welche geöffnet sind,
  steht hier und unter "GESEHEN, NICHT GEÖFFNET").

**GELESENER UMFANG — GEZIELT** (Suche über den Seitentext, Achse und Positivkontrolle):
- https://help.brevo.com/hc/en-us/articles/208849249-Brevo-plugin-for-WordPress-Connect-your-WordPress-site-with-Brevo
  — Achse `sibforms|simple html|form action|endpoint|honeypot|email_address_check|double
  opt|api key|cors`; 27 Treffer, alle zu Plugin-Aktivierung, reCAPTCHA-Fehlern und
  Plugin-Einstellungen, keiner zu Adresse oder Feldnamen eines Formular-Endpunkts.
  Positivkontrolle: "Brevo" 181-mal.
- https://help.brevo.com/hc/en-us/articles/360000545200-Enable-your-contacts-to-subscribe-or-unsubscribe-from-specific-lists-using-a-form-multi-list-subscriptions
  — Achse `html|field name|hidden|lists?\[|input|name=|sibforms|endpoint|captcha|embed`;
  0 Treffer auf 3 280 Zeichen. Positivkontrolle: "list" 30-mal.
- https://developers.brevo.com/reference/create-doi-contact — "Create Contact via DOI
  (Double-Opt-In) Flow | Brevo API Documentation", der Inhaltsteil ab der Überschrift, über
  `innerText` (die Seite rendert Navigation und Inhalt in einem Baum). Nur für K13.1 gelesen;
  "Show 4 variants" ist NICHT aufgeklappt.
- Websuchen (2026-09-28): `"sibforms.com/serve" form action EMAIL "email_address_check"
  locale` und `site:help.brevo.com "Simple HTML" form code sibforms` — unter den Treffern
  KEINE Seite der Brevo-Hilfe oder der Entwickler-Doku, die Adresse oder Feldnamen des
  Formular-Endpunkts beschreibt.

**REITER, TABELLEN, SYMBOLE, BILDER:** Reiter je Seite oben. Die Tabellen der CAPTCHA-Seite
(Vergleich reCAPTCHA/Turnstile, reCAPTCHA-Typen, Domain je Freigabeweg) tragen Text, keine
Symbole. BILDER SIND NICHT GELESEN — u. a. 42 Bilder auf "Create a sign-up form in Brevo";
was sie zeigen (etwa den erzeugten HTML-Code), steht hier nicht.

**GESEHEN, NICHT GEÖFFNET** (je mit Grund):
- "Create a pop-up sign-up form in Brevo" (…/20791391306770) — Pop-up per Skript des
  Anbieters, nicht unser Weg; laut CAPTCHA-Seite zudem nur Professional und Enterprise.
- "Create a custom double opt-in (DOI) email template …" (…/360019540880) — Gestaltung der
  Vorlage; wer versendet (K11.2), steht auf den gelesenen Seiten.
- "Notify your team by email when a contact submits a form" (…/27278282993682) und "Classic
  editor - Receive a notification …" (…/4406337619474) — Benachrichtigung des TEAMS, nicht
  Bestätigung an den Kontakt (K14); K6.1 ist über "Create a sign-up form", Step 8, gelesen.
- "Update your contacts details and preferences (profile update form)" (…/360003644360) und
  "Customize an unsubscribe form …" (…/360022160120) — andere Formular-Arten.
- "Set up a double opt-in subscription automation for forms created outside of Brevo"
  (…/211244629) — der Link trägt denselben Gegenstand wie der gelesene Artikel …/27353832123026;
  ob er eine ältere Fassung ist, ist nicht geprüft.
- "Authorize IP addresses for API calls to improve security", "Create and manage your API
  keys" — K13.1 wird nur abgelegt.
- https://developers.brevo.com/reference/create-contact — K13.1 wird nur abgelegt; der
  DOI-Weg ist über create-doi-contact gelesen.
- Öffentlich gehostete Formulare DRITTER unter `sibforms.com` im Suchindex — keine
  Anbieter-Doku; nicht geöffnet (fremde Formulare).
- Community (community.brevo.com) — nicht durchsucht.
**PRÜFUNG DER AUSSCHLUSSLISTE GEGEN DIE OFFENEN FRAGEN** (2026-09-28): Offen nach der Lesung
sind K8.2 (Form der Adresse), K9.1/K9.3/K9.4 (Feldnamen, versteckte Angaben), K10.2
(Origin/Referer), K12 (Antwort), K1/K2 (Formate, CORS) und K4 (Grenzen). Nach dem Titel
trug EINE Seite der Liste eine dieser Fragen: "Guidelines for a GDPR-compliant sign-up form"
(K11.3) — sie ist GEÖFFNET und oben geführt. Die übrigen Ausschlüsse tragen nach ihrem Titel
keine offene Frage; die Community ist nicht durchsucht, ein "steht dort nicht" reicht nicht
in sie hinein.

**(a) K8.1, K8.4 — EIN FORMULAR OHNE SKRIPT DES ANBIETERS IST EIN ANGEBOTENER WEG.** GELESEN,
"Create a sign-up form in Brevo", Step 6: Es gibt drei Einbettungs-Codes — "[Recommended]
Iframe", "HTML" ("with Ajax animation for messages") und "Simple HTML: A simplified version
of HTML form code that does not require calling JavaScript." Dazu: "Elements that require
calling JavaScript, such as CAPTCHA, default confirmation pages, and success and error
messages, cannot be included in the simple HTML code." GELESEN, CAPTCHA-Seite: "If you
include a CAPTCHA, you won't be able to share your form with Simple HTML."
FOLGERUNG: Brevo selbst liefert ein Formular, das ohne sein Skript absendet. Ob ein
EIGENES Formular mit denselben Feldnamen an dieselbe Adresse genauso angenommen wird, sagt
keine gelesene Seite — MESSUNG NÖTIG (B1).

**(b) K8.2, K8.3 — FORM UND FUNDORT DER ADRESSE.** GELESEN, "Create a sign-up form in
Brevo", Step 6: Der Code steht im Schritt "Share" des Formulars (Marketing > Forms > Formular
öffnen > Share); die Adresse ist je FORMULAR. Die Form der Adresse steht auf KEINER gelesenen
Seite — Reichweite: alle voll gelesenen Seiten, die gezielten Suchen und die zwei Websuchen
oben; die Bilder sind nicht gelesen. GELESEN, CAPTCHA-Seite: `sibforms.com` ist "the domain
Brevo uses to host the form".
BEOBACHTET IM SUCHINDEX, 2026-09-28 (weder Anbieter-Doku noch Messung, nicht geöffnet):
öffentliche Formulare Dritter unter `https://sibforms.com/serve/<Kennung>`,
`https://<8 Hex-Zeichen>.sibforms.com/serve/<Kennung>` und `…/v2/serve/<Kennung>`; die
Kennung beginnt in allen Treffern mit `MUIE`. Ob die `action` des "Simple HTML"-Codes
dieselbe Adresse trägt, ist nicht belegt — ablesbar am Code eines Owner-Formulars (B1).

**(c) K9.1, K9.2 — FELDER.** GELESEN, "Create a sign-up form in Brevo": "Each field in your
sign-up form corresponds to a contact or company attribute in your Brevo account"; ein Feld
für Vorname ist das Attribut `FIRSTNAME`; eigene Felder brauchen vorher ein
Kontakt-Attribut ("Settings > Contacts > Contact attributes"). "Only text, number, and date
attributes are available" im Attribut-Block; Textfelder einzeilig bis 200, mehrzeilig bis
500 Zeichen. "Your form must include at least one field for Email, SMS, or WhatsApp."
GELESEN, "Troubleshooting issues with your forms": die Attribute `SMS`, `LANDLINE_NUMBER`,
`WHATSAPP` erscheinen im HTML-Code als `data-placeholder` eines `div` mit Klasse
`sib-sms-input`.
WELCHE `name`-ATTRIBUTE DIE EINGABEFELDER IM HTML-CODE TRAGEN (etwa `EMAIL`), UND OB GROSS
UND KLEIN ZÄHLEN, STEHT AUF KEINER GELESENEN SEITE — Reichweite wie (b). MESSUNG NÖTIG (B1).
Was mit fehlenden Pflichtfeldern geschieht: nur als Meldungstext "Empty field: A required
field has not been completed" (Step 5) — der Status einer solchen Antwort steht dort nicht.

**(d) K9.3 — VERSTECKTE ANGABEN.** Liste(n) werden am FORMULAR in Brevo gewählt ("Step 3:
Select the list(s)"), nicht im Formular-Code beschrieben (GELESEN). Ob der Code versteckte
Felder trägt (Sprache, Liste, Honeypot), steht auf KEINER gelesenen Seite — Reichweite wie
(b). MESSUNG NÖTIG (B1). K9.4 (unbekannte Felder): NICHT GEFUNDEN, Reichweite wie (b).

**(e) K10 — BOT-SCHUTZ.** GELESEN, "Protect your forms …": empfohlen werden CAPTCHA, Double
Opt-In, Sperre von Freemail- und Wegwerf-Adressen, Honeypot, Ratenbegrenzung, Anti-Spam-
Werkzeuge, eine eigene Frage, eine WAF — als BEST PRACTICE des Betreibers, nicht als
Schutz, den Brevo am Endpunkt erzwingt. "If one of your forms is unprotected and experiences
a bot attack, your account can be suspended […] To reactivate your account, add a CAPTCHA to
the affected form." GELESEN, CAPTCHA-Seite: CAPTCHA ist wählbar (reCAPTCHA v2/v3 oder
Cloudflare Turnstile) und schliesst "Simple HTML" aus (s. (a)); bei eingebettetem HTML muss
die Domain der WEBSITE in der CAPTCHA-Konfiguration stehen. GELESEN, "Create a sign-up
form", "Block sign-ups": Freemail- und Wegwerf-Sperre ab Standard.
Eine Prüfung von `Origin` oder `Referer` am Endpunkt steht auf KEINER gelesenen Seite —
Reichweite wie (b). MESSUNG NÖTIG (B2).
FOLGERUNG: Ein Formular MIT CAPTCHA ist über unseren Weg nicht erreichbar, weil es kein
"Simple HTML" hat. Ein Formular OHNE CAPTCHA ist nach Brevos eigener Aussage ein Risiko für
das KONTO des Betreibers — BEZUG, KEINE ENTSCHEIDUNG: Arbeit P13-12 ("Die öffentliche Adresse
ist spam-anfällig").

**(f) K11 — DOUBLE-OPT-IN.** GELESEN, "Create a sign-up form", Step 4: drei Optionen je
Formular — "Double confirmation" (empfohlen; Kontakt erst nach Klick im Bestätigungslink),
"Simple confirmation" (sofort angelegt, Bestätigungsmail), "No confirmation" (sofort
angelegt, keine Mail). "Double and single confirmations are only available if you have added
an email address field." GELESEN, DOI-Seite: vor der Bestätigung ist der Kontakt NICHT in der
Liste, "Their information is only stored in the event logs"; der Link läuft nach 30 Tagen
ab. Versender ist Brevo mit einer Vorlage aus "Marketing > Templates" (K11.2; Absender auf
den gelesenen Seiten nicht genannt).
K11.3: Die Einwilligungs-Checkbox ist der Block "GDPR field", "highly recommend[ed]", nicht
als Pflicht beschrieben (GELESEN, "Create a sign-up form" und "Guidelines for a
GDPR-compliant sign-up form"). Ihr Feldname im Code: NICHT GEFUNDEN, Reichweite wie (b).
Die GDPR-Seite nennt zusätzlich: DOI nur für E-Mail-Formulare, "For SMS sign-up forms, no
confirmation will be sent".

**(g) K12 — ANTWORT.** GELESEN, "Create a sign-up form", Step 4: optional "Confirmation page
after submitting the form" — Weiterleitung auf eine Standard- oder eigene Seite; sonst eine
"Success message […] at the top of your sign-up form without changing the page". Nach (a)
kann "Simple HTML" die Standard-Bestätigungsseite und die Meldungen NICHT tragen. Was der
Endpunkt auf einen Aufruf ohne Skript antwortet (Status, Weiterleitung, Rumpf), steht auf
KEINER gelesenen Seite. MESSUNG NÖTIG (B1). NUR ABGELEGT (Katalog K12): im Modus `no-cors` ist
das für unser Skript `opaque`.

**(h) K13 — ANDERE WEGE.** GELESEN, apps.make.com/sendinblue: Make führt eine Brevo-App mit
u. a. "Create a Contact", "Update a Contact", "Add Existing Contacts to a List", "Make an API
Call"; Verbindung über einen Brevo-API-Schlüssel. GELESEN, "Use Make to integrate an app with
Brevo": dieselben Module; "the Brevo app is free to all Brevo clients with up to 1,000
operations per month"; bei 401 ist die IP-Freigabe für API-Aufrufe zu prüfen. GELESEN, "Set
up a double opt-in process for a sign-up form created outside of Brevo": Kontakte aus
Formularen AUSSERHALB von Brevo kommen über "one of our plugins, the API, or Zapier" in eine
temporäre Liste; das Double-Opt-In baut der Betreiber als Automatisierung. GELESEN,
developers.brevo.com, create-doi-contact: `POST https://api.brevo.com/v3/contacts/
doubleOptinConfirmation` mit `email`, `includeListIds`, `redirectionUrl`, `templateId`
(Pflicht), `attributes` (optional), Schlüssel in der Kopfzeile `api-key`.
K13.1 NUR ABGELEGT: der Schlüssel wäre im ausgelieferten Text öffentlich — nach Setzung P13-6
für uns ausgeschlossen. In Make liegt er beim Betreiber, nicht im Browser.

**(i) K14 — EIGENE BESTÄTIGUNG.** GELESEN, "Create a sign-up form", Step 4: "Simple
confirmation" schickt eine Bestätigungsmail sofort nach dem Absenden, Vorlage "Default
Template Simple confirmation", änderbar unter "Marketing > Templates > Email" — ohne
Kampagne und ohne Automatisierung. Bei "Double confirmation" optional eine "Final
Confirmation Email" nach der Bestätigung.
OB DIESE EINSTELLUNG AUCH BEI EINEM EINTRAG ÜBER "SIMPLE HTML" GREIFT, sagt keine gelesene
Seite; FOLGERUNG: sie ist eine Einstellung des FORMULARS und nicht an sein Skript gebunden
— ERSETZT DIE MESSUNG NICHT (B1). Beim Weg über Make oder die API greift sie NICHT von selbst:
dort baut der Betreiber das Double-Opt-In und die Bestätigung als Automatisierung ("Set up a
double opt-in process … outside of Brevo", Step 2 und Step 4) oder nutzt den DOI-Endpunkt.

**(j) K4 — STILLE VERLUSTE.** GELESEN, "Troubleshooting issues with your forms": "Phone
number is not valid" erscheint auch bei gültiger Nummer, wenn sie bereits zu einem
bestehenden Kontakt gehört — "it is not possible to submit a phone number that is already
associated with an existing contact". Gesperrte Formulare bei Verdacht auf Phishing ("You do
not have access to Forms at this time") und ein gesperrtes Konto nennt die Seite als
Ursachen, warum ein Formular nicht funktioniert. Wie der Endpunkt in diesen Fällen antwortet,
steht dort nicht. Ratenlimits am Formular-Endpunkt: NICHT GEFUNDEN, Reichweite wie (b).
FOLGERUNG: Ein Formular mit Telefonfeld kann einen Wiederkehrer abweisen; im Modus `no-cors`
sähe unser Skript davon nichts.

**(k) K5 — AUFBEWAHRUNG, REGION.** GELESEN, "Data storage location": "The hosting servers on
which Brevo processes and stores its databases are all located within the European Union";
OVH in Frankreich und Deutschland, Google Cloud in Belgien; Sicherungen mindestens
wöchentlich, verschlüsselt. Wählbar ist die Region auf keiner gelesenen Seite. GELESEN,
DOI-Seite: Ein Absenden wird in den "event logs" mit Zeitpunkt und E-Mail-Adresse abgelegt,
auch ohne spätere Bestätigung; die DOI-Mail samt Inhalt in den "transactional logs"; "You
can delete those logs." Aufbewahrungsdauern: NICHT GEFUNDEN, Reichweite: die voll gelesenen
Seiten.

**(l) K6 — NACHWEIS.** GELESEN, "Create a sign-up form", Step 8: Spalten "New contacts" und
"Submits" unter Marketing > Forms; Kontakte in der gewählten Liste; Verlauf je Kontakt;
"Automations > Logs > Event logs", Ereignisart "Forms", als CSV. Das Attribut `DOUBLE_OPT-IN`
zeigt Yes/No bzw. leer bei anderem Eingang.

**(m) K1, K2, K3, K7 — FORMATE, CORS, GEHEIMHALTUNG, BLOCKER.** Methode und Content-Type des
Endpunkts, CORS-Kopfzeilen, Preflight: NICHT GEFUNDEN, Reichweite wie (b). K3.2: Dass die
Adresse geheim zu halten sei, steht nirgends; sie steht nach (a) im öffentlichen
Einbettungs-Code — BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-6 ("kein Geheimnis") wird davon
nicht berührt. K7: Messfrage (B4).

### Messkandidaten Brevo (aus der Lesung vom 2026-09-28)

Keiner gemessen; die Liste entscheidet nicht, welcher gemessen wird. Testkonto des Owners
vorhanden (Entscheidung P13-4 der Phase 13).
- B1 — Den "Simple HTML"-Code eines Owner-Formulars OHNE CAPTCHA ablesen: `action`,
  `method`, `enctype`, die `name`-Attribute aller Felder (E-Mail, Vorname, eigene
  Attribute, GDPR-Feld), versteckte Felder. Danach ein `POST` mit
  `application/x-www-form-urlencoded` an diese Adresse: Status, Weiterleitung, Rumpf,
  CORS-Kopfzeilen; kommt der Kontakt an, greift die "Simple confirmation"? (K8.2, K9, K12,
  K14; zu (a)–(d), (g), (i))
- B2 — Derselbe `POST` mit `Origin` einer fremden Seite und ohne `Referer`, dann aus dem
  Browser im Modus `no-cors` von einer Seite unter publayer.net. (K10.2, K2; zu (e))
- B3 — Wiederkehrer: dieselbe E-Mail zweimal, dieselbe Telefonnummer zweimal. (K4; zu (j))
- B4 — Erfassen gängige Filterlisten `sibforms.com`? (K7.1)

### EINORDNUNG Brevo (Befund, keine Entscheidung)

NICHT ENTSCHEIDBAR nach der Lesung. Der Weg aus 13-1 ist bei Brevo ANGELEGT — Brevo liefert
selbst ein Formular ohne Skript ("Simple HTML", (a)) —, aber Adresse, Feldnamen, versteckte
Felder und Antwort stehen in keiner gelesenen Doku, und ein Formular mit CAPTCHA fällt nach
(a) heraus. FOLGERUNG, NICHT GELESEN: Trägt er, dann höchstens MIT DEN FELDNAMEN VON BREVO
(je Kontakt-Attribut, (c)); welche genau, klärt erst B1. Brevos eigene Warnung vor ungeschützten
Formularen ((e)) steht daneben.
DER UMWEG ÜBER MAKE TRÄGT NACH DER DOKU ((h)): Make führt Module zum Anlegen und Aktualisieren
von Kontakten; der Schlüssel bleibt in Make. Eine eigene Bestätigung durch Brevo greift auf
diesem Weg nicht von selbst ((i)).

## systeme.io

### Anbieter-Lesung vom 2026-09-28 (CC, Phase 13, Arbeit P13-64)

**INSTRUMENT:** Playwright-MCP; Text je Seite über `textContent` des `article`-Elements nach
Entfernen von `script`, `style`, `noscript`, `svg`, `template`. Das Verzeichnis der Hilfe
(fünf Kategorien, 213 Artikel-Einträge) ist über `fetch` der Kategorieseiten erhoben.
WERKZEUG-BEFUND, OFFEN GEFÜHRT: Derselbe `fetch`-Weg lieferte für sieben von zwölf
ARTIKELN nur die Sprachleiste, ohne Artikeltext — eine vom Werkzeug erzeugte Abwesenheit
(Dauerregel "EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND"). Jeder
Artikel, bei dem der Abruf leer blieb, ist deshalb per Navigation gelesen; bei JEDEM
gelesenen Artikel gilt als Positivkontrolle, dass der Titel der Seite im gelesenen Text
steht. Die Seiten tragen ein "Last updated on …", hier je Seite.
Ablage des Werkzeugs unter `.playwright-mcp/`.
**KEINE ANGABE DIESER LESUNG IST GEMESSEN.** Keine Eingabe (auch nicht in das Werkzeug unter
(a)), keine Anmeldung, kein Download, kein Aufruf eines Formular-Endpunkts.

**GELESENER UMFANG — VOLL** (Lesedatum je Seite 2026-09-28):
- https://help.systeme.io/article/266-how-to-create-and-integrate-a-form-or-a-popup-on-your-external-site
  — "How to embed a systeme.io form or popup on an external website" (Last updated on May 18,
  2026)
- https://systeme.io/free-tools/html-form-connector — "Connect a Custom HTML Form to
  systeme.io | Free Tool" (ohne Datum; eine Werkzeug-Seite des Anbieters, kein Hilfe-Artikel)
- https://help.systeme.io/article/3990-how-can-i-prevent-list-bombing — "How can I prevent
  list bombing?" (Last updated on March 26, 2026)
- https://help.systeme.io/article/10921-secure-your-registration-forms-with-recaptcha —
  "Secure your registration forms with reCAPTCHA" (Last updated on May 15, 2026)
- https://help.systeme.io/article/271-how-to-set-up-double-opt-in — "How to set up double
  opt-in" (Last updated on April 13, 2026)
- https://help.systeme.io/article/280-how-to-send-an-automatic-email-when-a-lead-subscribes —
  "How to automatically send an email when a lead subscribes" (Last updated on April 27, 2026)
- https://help.systeme.io/article/140-automation-rules — "How automation rules work" (Last
  updated on May 15, 2026)
- https://help.systeme.io/article/2292-how-to-receive-an-email-notification-after-a-new-subscription-on-your-page
  — "How to receive email notifications for new leads in systeme.io" (Last updated on April 9,
  2026)
- https://help.systeme.io/article/2930-how-to-use-systeme-ios-webhook-service — "How to use
  systeme.io's Webhook service" (Last updated on June 12, 2026)
- https://help.systeme.io/article/2323-how-to-use-systeme-io-public-api — "How to use the
  systeme.io public API (Application Programming Interface)" (Last updated on September 25,
  2026)
- https://help.systeme.io/article/628-is-it-possible-to-integrate-systeme-io-with-an-external-autoresponder
  — "Is it possible to integrate systeme.io with an external autoresponder?" (Last updated on
  June 30, 2026)
- https://help.systeme.io/article/1592-how-to-integrate-a-form-or-a-popup-on-wordpress —
  "How to integrate a systeme.io form or popup on a WordPress site" (Last updated on March 3,
  2026)
- https://help.systeme.io/article/231-how-to-connect-a-sales-funnel-or-a-page-to-your-website
  — "How to link a sales funnel or a page to your external website" (Last updated on May 8,
  2026)
- https://help.systeme.io/article/152-how-to-create-a-opt-in-page — "How to create an
  opt-in page" (Last updated on January 8, 2026)
- https://help.systeme.io/article/11433-how-to-view-and-download-customer-consent-records —
  "How to view and download customer consent records" (Last updated on September 2, 2026)
- https://apps.make.com/systeme-io — "Systeme IO - Apps Documentation" (Updated 25 Sep 2026)

**GELESENER UMFANG — GEZIELT:**
- https://systeme.io/privacy-policy — "Privacy Policy". Achse `ireland|amazon|aws|hosted|
  server|retention|retain|kept for|duration|years|months|processor|sub-?processor|data of
  (your|the) (contacts|leads)|last updated|effective`; 23 Treffer, im Wortlaut gelesen.
  Positivkontrolle: "data" 34-mal. Ein Datum der Fassung trifft die Achse nicht.
- Das Verzeichnis der Kategorien "General" (131), "Contact management" (537), "Sales
  funnels" (146), "Emails" (156), "Deliverability" (3251) — nach Titeln gesichtet.

**REITER, TABELLEN, SYMBOLE, BILDER:** Keine gelesene Seite trägt `role=tab` oder eine
Tabelle. BILDER SIND NICHT GELESEN (bis zu 13 je Seite); was sie zeigen — etwa den Code
hinter "Script" —, steht hier nicht.

**GESEHEN, NICHT GEÖFFNET** (je mit Grund):
- "How to create and trigger a webhook after an opt-in or a sale" (…/144) — AUSGEHENDE
  Webhooks von systeme.io; der gelesene Artikel …/2930 trägt denselben Gegenstand.
- "How to add a CAPTCHA to a Contact us page" (…/1673) — K10 ist über …/10921 gelesen, das
  auf ihn verweist.
- "How to build your contact list using a funnel" (…/1602), "How to create a thank you page"
  (…/321), "How to create workflows in systeme.io" (…/1542) — Arbeit IN systeme.io; K14 ist
  über …/280 und …/140 gelesen.
- "What happens when my account gets restricted" (…/1086), "How to report abuse on
  systeme.io" (…/2046) — Kontosperre allgemein; der Formularbezug steht in …/3990.
- Die übrigen Titel der fünf Kategorien (Domains, Zahlungen, Kurse, Zustellbarkeit, DNS) —
  andere Gegenstände.
- Die öffentliche API-Dokumentation, auf die …/2323 verlinkt — K13.1 wird nur abgelegt.
- Community (roadmap.systeme.io, community.make.com) — nicht durchsucht.
- Die deutschsprachige Hilfe (help-de.systeme.io) — nicht gelesen; die englische ist die
  Fassung dieser Lesung.
**PRÜFUNG DER AUSSCHLUSSLISTE GEGEN DIE OFFENEN FRAGEN** (2026-09-28): Offen nach der Lesung
sind K8.2 (Form der Adresse im "Embedded form"-Code), K9 (Feldnamen dort), K10.2, K12, K1,
K2, K4. Nach dem Titel trug EINE Seite der Liste eine offene Frage: "How to link a sales
funnel or a page to your external website" (K8) — sie ist GEÖFFNET und oben geführt (sie
beschreibt nur einen Link auf die Funnel-Seite). Die übrigen Ausschlüsse tragen nach ihrem
Titel keine.

**(a) K8.1, K8.4 — DER ANBIETER SAGT: NUR ÜBER SEINE EIGENEN FORMULARE.** GELESEN,
html-form-connector: "systeme.io only captures leads through its own native forms. This
tool bridges the gap: your visitor fills out your custom form, and the script copies every
field into the hidden native form and clicks submit for them." Das Werkzeug erzeugt ein
Brücken-Skript für eine Seite IM EDITOR von systeme.io ("Drop a systeme.io opt-in form
element onto your page in the editor. It will sit next to your Raw HTML element"); die
Kennung des nativen Formulars hat die Form `optinform-36cb97c2`.
GELESEN, …/266: Der Weg auf eine EXTERNE Seite ist ein Skript ("click Script to generate the
code for your external site") für ein "Inline form" oder ein "Popup form" aus einem Funnel.
**(b) K8.1, K8.2 — UND DOCH GIBT ES EIN "EMBEDDED FORM" OHNE SKRIPT.** GELESEN, …/3990: "Use
the Script button instead of the Embedded form button to re-embed the form on your external
page." — "ReCAPTCHA will not work on forms added via the 'Embedded form'. This is because an
embedded form is a stripped HTML form that cannot be protected by Captcha natively." — "Even
if the form does not show on your external page, having the code in the page's source code
still allows bots to attack it." — Duplizieren und Löschen des Formulars "changes the URLs in
the code".
FOLGERUNG: Neben dem Skript gibt es einen Einbettungs-Code als reines HTML-Formular, dessen
Code eine oder mehrere Adressen trägt, an die Bots erfolgreich absenden. Die Anleitung …/266
(Stand 18. Mai 2026) nennt nur noch "Script"; ob der Knopf "Embedded form" heute noch
angeboten wird, sagt keine gelesene Seite. Die Form der Adresse steht auf KEINER gelesenen
Seite — Reichweite: die voll gelesenen Seiten; Bilder nicht gelesen. MESSUNG NÖTIG (S1).
WIDERSPRUCH ZWISCHEN (a) UND (b), OFFEN GEFÜHRT: (a) sagt "only … through its own native
forms", (b) beschreibt ein reines HTML-Formular, das von aussen angenommen wird. Beides
lässt sich vereinbaren, wenn das "Embedded form" als natives Formular zählt — entschieden ist
das nicht.
BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-10 der Phase 13 nennt systeme.io als Gegenprobe "für
ESP-Formular-Endpunkte". Nach (a) gibt es einen öffentlichen Endpunkt für EIGENE Formulare
nach Aussage des Anbieters nicht; nach (b) gibt es einen für SEIN reines HTML-Formular.

**(c) K9 — FELDER.** GELESEN, html-form-connector: Das Werkzeug liest aus den Seitendaten
von systeme.io "a name for every field it holds: email, first_name, phone, and so on"; die
Zuordnung eigener Felder geschieht über `name`, `type`, `autocomplete`, Platzhalter und
Beschriftung. "An email field is required." GELESEN, apps.make.com/systeme-io: Module "List
Contact Fields", "Create a Contact Field"; GELESEN, …/2323: eigene Felder haben
Kennungen ("slugs").
FOLGERUNG: `email`, `first_name`, `phone` sind die Namen der Felder im NATIVEN Formular —
ob ein von aussen gesendetes Formular dieselben Namen tragen muss, ist nicht belegt (S1).
Versteckte Angaben (K9.3) und unbekannte Felder (K9.4): NICHT GEFUNDEN, Reichweite: die voll
gelesenen Seiten.

**(d) K10 — BOT-SCHUTZ.** GELESEN, …/10921: reCAPTCHA v2, Schlüssel je Domain unter
"Settings > Custom domains", als Element im Editor. GELESEN, …/3990: gegen "list bombing"
"you must implement these two procedures": reCAPTCHA und Double-Opt-In; ein "Embedded form"
kann KEIN reCAPTCHA tragen (s. (b)). Folge eines Angriffs: "email sending may be temporarily
suspended. It will only be reinstated after you complete a remediation plan provided by our
team." Eine Prüfung von `Origin` oder `Referer`: NICHT GEFUNDEN, Reichweite: die voll gelesenen
Seiten. MESSUNG NÖTIG (S2).
FOLGERUNG: Ein reines HTML-Formular ist nach Aussage des Anbieters der Weg, über den Bots
eintragen, und er rät davon ab.

**(e) K11 — DOUBLE-OPT-IN.** GELESEN, …/271: je FORMULAR einschaltbar ("Do you want to
enable double opt-in on this form?", Einstellung am Knopf); die Bestätigungsmail ist unter
"Settings > Emails > Double opt-in" änderbar; "If a contact doesn't click the confirmation
link within 24 hours of registering, they will automatically be deleted"; "All emails and
automations are paused until the contact has confirmed". Versender ist systeme.io (K11.2;
Absender auf den gelesenen Seiten nicht genannt). K11.3 (Pflicht-Checkbox): NICHT GEFUNDEN;
GELESEN, …/11433: Einwilligungs-Nachweise mit Checkbox-Text, E-Mail, Zeit, User-Agent und
IP gibt es für BESTELLFORMULARE, nicht für Opt-in-Formulare.

**(f) K12 — ANTWORT.** NICHT GEFUNDEN — Reichweite: die voll gelesenen Seiten. MESSUNG NÖTIG
(S1).

**(g) K13 — ANDERE WEGE.** GELESEN, …/2323: öffentliche API mit Schlüssel (Settings > "MCP &
API keys" > "Public API keys"), u. a. Kontakte anlegen und ändern, Tags setzen; bis zu drei
Schlüssel je Konto; ohne Ablaufdatum unbegrenzt gültig. GELESEN, apps.make.com/systeme-io:
Make führt eine App mit "Create a Contact", "Update a Contact", "Add a Tag to a Contact",
"Make an API Call"; Verbindung über den API-Schlüssel. GELESEN, …/628: externe
Autoresponder "via Zapier"; ActiveCampaign über eine API-Integration.
K13.1 NUR ABGELEGT: ein Schlüssel im ausgelieferten Text wäre öffentlich — nach Setzung P13-6
für uns ausgeschlossen.

**(h) K14 — EIGENE BESTÄTIGUNG.** GELESEN, …/280: Automatisierungsregel mit Auslöser "Funnel
step form subscribed" und Aktion "Send email", eigener Text, ohne Kampagne; "The form
button's action must be set to Submit form for the automation rule to be triggered". GELESEN,
…/140: Auslöser u. a. "Funnel step form subscribed", "New sale", "Tag added" ("The tag must
be added to the contacts after the rule is set up"); höchstens 20 Auslösungen je Kontakt und
Auslöser; Verlauf einen Monat.
FOLGERUNG: Für einen Eintrag über SEIN Formular ist eine Bestätigung ohne Kampagne
einstellbar. Beim Weg über Make ("Create a Contact" plus "Add a Tag to a Contact") trägt der
Auslöser "Tag added" nach dem Wortlaut von …/140 — nicht gemessen.

**(i) K5 — AUFBEWAHRUNG, REGION.** GELESEN, Privacy Policy: "Our servers are hosted by Amazon
Web Services in Ireland […] It is not transferred outside the European Union." Die Policy
spricht von "a User's data"; ob sie die KONTAKTE der Betreiber meint, sagt sie nicht
ausdrücklich (FOLGERUNG: nicht belegt). Aufbewahrungsdauer: "only for as long as necessary"
ohne Frist. Wählbare Region: NICHT GEFUNDEN. GELESEN, …/2930: Webhook-Logs mit "Message log"
und "Delivery log"; Dauer nicht genannt.

**(j) K6 — NACHWEIS.** GELESEN, …/280 und …/2292: Test durch eigenes Eintragen auf der
Opt-in-Seite; eine Benachrichtigung an den Betreiber als Automatisierungsregel ("Send email to
a specific email address"). GELESEN, …/2930: ausgehende Webhooks je Ereignis ("Opt-In",
"Contact created" …) mit Logs.

**(k) K1, K2, K3, K4, K7.** Methode, Content-Type, CORS, Preflight, Ratenlimits am
Formular-Endpunkt: NICHT GEFUNDEN, Reichweite: die voll gelesenen Seiten. K3.2: Dass die
Adresse geheim sei, steht nirgends; nach (b) steht sie im Quelltext der Seite, und der
Anbieter behandelt ihr Bekanntsein als Angriffsfläche (Duplizieren ändert die Adressen).
K4: GELESEN, …/140 — die Grenze von 20 Auslösungen je Kontakt. K7: Messfrage (S3).

### Messkandidaten systeme.io (aus der Lesung vom 2026-09-28)

Keiner gemessen; die Liste entscheidet nicht, welcher gemessen wird. Testkonto des Owners
vorhanden (Entscheidung P13-4 der Phase 13).
- S1 — Im Owner-Konto nachsehen, ob ein Inline-Formular heute noch einen Einbettungs-Code
  als reines HTML ("Embedded form") anbietet; wenn ja: `action`, `method`, Feldnamen,
  versteckte Felder ablesen. Danach ein `POST` mit `application/x-www-form-urlencoded`
  dorthin: Status, Weiterleitung, Rumpf, CORS-Kopfzeilen; kommt der Kontakt an, feuert die
  Regel "Funnel step form subscribed"? (K8.2, K9, K12, K14; zu (b), (c), (f), (h))
- S2 — Derselbe `POST` mit fremdem `Origin` bzw. ohne `Referer`, dann im Modus `no-cors` aus
  einer Seite unter publayer.net. (K10.2, K2; zu (d))
- S3 — Erfassen gängige Filterlisten den Host aus S1? (K7.1)
- S4 — Weg über Make: "Create a Contact" plus "Add a Tag to a Contact" — feuert eine Regel
  "Tag added" mit "Send email"? (K14.3; zu (h))

### EINORDNUNG systeme.io (Befund, keine Entscheidung)

NACH AUSSAGE DES ANBIETERS: NICHT — "systeme.io only captures leads through its own native
forms" ((a)); sein eigenes Werkzeug für eigene Formulare läuft nur auf einer Seite IN
systeme.io. Dagegen steht ein reines HTML-Formular ("Embedded form"), das Bots von aussen
erreicht ((b)); ob es heute noch angeboten wird und ob ein EIGENES Formular mit denselben
Feldnamen dort angenommen würde, ist NICHT ENTSCHEIDBAR ohne S1. Ein solches Formular trüge
kein reCAPTCHA, und der Anbieter rät wegen "list bombing" ausdrücklich davon ab ((d)).
DER UMWEG ÜBER MAKE TRÄGT NACH DER DOKU ((g)): "Create a Contact" und "Add a Tag to a
Contact"; der Schlüssel bleibt in Make. Eine Bestätigungsmail ist über eine Regel "Tag added"
denkbar ((h), ungemessen).
