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
sondern im Archiv der Phase 13, docs/claude-history/phase-13-formular-ziel.md, Vermerk P13-22
(NACHGEZOGEN 2026-09-29 beim Phasenende; bis dahin docs/aktiver-stand.md, solange die Phase
lief).
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

**ZU DEN ABSCHNITTEN BREVO, SYSTEME.IO, MAILCHIMP UND KLICKTIPP (NACHGETRAGEN 2026-09-29):** Ihre
EINORDNUNGEN beziehen sich auf den BROWSER-DIREKTEN Weg aus Scheibe 13-1 (Entscheidung P13-2 der
Phase 13); mit dem geplanten Relay werden die Befunde Material für native Anbindungen
(Entscheidung P13-65 der Phase 13, OWNER 2026-09-28 — eine Richtung, keine Regel). Kein Befund
ist dadurch geändert.

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

## Mailchimp

### Anbieter-Lesung vom 2026-09-28 (CC, Phase 13, Arbeit P13-64)

**INSTRUMENT:** Playwright-MCP; Text je Seite über `textContent` des `main`-Elements nach
Entfernen von `script`, `style`, `noscript`, `svg`, `template`, zugeschnitten von "Copy
Article URL" bis "Technical Support" (der Artikelkörper). Mehrere Seiten per `fetch` von
mailchimp.com aus; Positivkontrolle je Seite: der Seitentitel steht im Text (bei "Create an
Automated Welcome Email" trifft der Titel nicht, der Artikelkörper ist vollständig da,
12 708 Zeichen). Die englische Fassung unter `/en/help/…` — die Adresse ohne `/en/` leitet
auf die deutsche Fassung um; gelesen ist die ENGLISCHE. Die Seiten tragen kein Datum.
WERKZEUG-FEHLER, OFFEN GEFÜHRT: Ein Abruf lief versehentlich von apps.make.com aus und
lieferte dort 404 für eine Mailchimp-Seite; wiederholt von mailchimp.com aus, 200.
Ablage des Werkzeugs unter `.playwright-mcp/`.
**KEINE ANGABE DIESER LESUNG IST GEMESSEN.** Keine Eingabe, keine Anmeldung, kein Download,
kein Aufruf eines Formular-Endpunkts.
**KEIN TESTKONTO:** Entscheidung P13-4 der Phase 13 nennt als Testempfänger Make, Brevo und
systeme.io — nicht Mailchimp.

**GELESENER UMFANG — VOLL** (Lesedatum je Seite 2026-09-28; alle unter
https://mailchimp.com/en/help/):
- host-your-own-signup-forms/ — "Host Your Own Signup Forms"
- add-a-signup-form-to-your-website/ — "Add an Embedded Signup Form to Your Website"
- troubleshooting-the-embedded-signup-form/ — "Troubleshooting the Embedded Signup Form"
- customize-embedded-signup-form/ — "Customize Your Embedded Signup Form"
- about-signup-form-options/ — "About Signup Form Options" (4 Tabellen, Text)
- share-your-signup-form/ — "Share Your Signup Form"
- about-double-opt-in/ — "About Double Opt-in"
- single-opt-in-vs-double-opt-in/ — "Single Opt-in vs. Double Opt-in"
- about-recaptcha-for-signup-forms/ — "About reCAPTCHA for Signup Forms" (1 Tabelle, Text)
- enable-or-disable-final-welcome-email/ — "Turn the Final Welcome Email On or Off"
- how-the-form-builder-works/ — "How the Form Builder Works"
- advanced-form-customization/ — "Advanced Form Customization"
- design-and-host-your-own-thank-you-pages/ — "Design and Host Your Own "Thank You" Pages"
- add-hidden-fields-to-a-signup-form/ — "Add Hidden Fields to a Signup Form"
- create-an-automated-welcome-email/ — "Create an Automated Welcome Email" (1 Tabelle, Text)
- mailchimp-european-data-transfers/ — "Mailchimp and European Data Transfers"
- https://apps.make.com/mailchimp — "Mailchimp - Apps Documentation" (Updated 25 Sep 2026)
- Drei geratene Adressen ohne Inhalt (404): about-the-final-welcome-email/,
  create-signup-form-response-emails/, about-response-emails/.

**REITER, TABELLEN, SYMBOLE, BILDER:** Keine Seite trägt `role=tab`; die Tabellen tragen
Text. Videos sind nicht geladen (Cookie-Sperre). BILDER SIND NICHT GELESEN — u. a. auf
"Advanced Form Customization" das Bild "what you can and shouldn't edit".

**GESEHEN, NICHT GEÖFFNET** (je mit Grund):
- "CSS Hooks for Customizing Forms" — Gestaltung.
- "Manage Contacts in Mailchimp API 3.0" (/developer/marketing/guides/create-your-first-audience/)
  — K13.1 wird nur abgelegt.
- "Collect Consent with Pop-up Forms", "Create a Popup Form" — Pop-up per Skript des Anbieters.
- "All the Marketing Automation Flow Triggers", "About Marketing Automation Flows" — K14 ist
  über "Create an Automated Welcome Email" gelesen.
- Die Unterauftragsverarbeiter-Liste und die Aufbewahrungsfristen (Privacy Policy, DPA) —
  nicht geöffnet; K5.2 bleibt offen.
- Seiten zu WordPress, Squarespace, Zapier, Facebook Lead Ads — andere Wege.
- Community und Drittanbieter-Seiten (u. a. easycloudsolutions.com im Suchindex) — keine
  Anbieter-Doku.
**PRÜFUNG DER AUSSCHLUSSLISTE GEGEN DIE OFFENEN FRAGEN** (2026-09-28): Offen waren K9.3,
K12 und K14; nach dem Titel trugen "Add Hidden Fields to a Signup Form" (K9.3), "Design and
Host Your Own "Thank You" Pages" (K12) und "Create an Automated Welcome Email" (K14) eine
davon — alle drei sind GEÖFFNET und oben geführt. Offen nach der Lesung: K1, K2, K5.2, K10.2,
die Antwort bei Fehlern (K12.2). Die verbleibenden Ausschlüsse tragen nach ihrem Titel keine.

**(a) K8.1, K8.4 — EIN EIGENES FORMULAR IST EIN DOKUMENTIERTER WEG.** GELESEN, "Host Your Own
Signup Forms": "To use a custom signup form on your website that transmits subscriber data to
your Mailchimp audience, you'll need to add some Mailchimp information to your form code.
You'll locate the form action, user ID, audience ID, and input name elements in your hosted
Mailchimp form, and insert them into the form you host on your website." — "This is an
advanced feature". GELESEN, "About Signup Form Options": "Embedded form — An HTML form we
create for you, which you can paste into your site."

**(b) K8.2, K8.3, K9.3 — ADRESSE UND VERSTECKTE PFLICHTANGABEN.** GELESEN, "Host Your Own
Signup Forms", Beispiel im Wortlaut: `<form action="http://mailchimp.us8.list-manage.com/
subscribe/post" method="POST">`, dazu `<input type="hidden" name="u" value="…">` und
`<input type="hidden" name="id" value="…">` — "The code indicates your user ID and audience
ID". Fundort: "Forms > Other forms > Form builder > Manage forms", die "Signup form URL" im
Browser öffnen, Quelltext ansehen. Die Adresse ist je ZIELGRUPPE (Audience), nicht je
Formular; `u` und `id` stehen als FELDER im Rumpf, nicht in der Adresse. Das Beispiel trägt
`http:` und den Serverteil `us8`; ob die echte Adresse `https:` trägt und wie der Serverteil
je Konto lautet, ist nicht belegt. BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-29 lässt nur
`https:` als Zieladresse zu — ein aus dem Beispiel abgeschriebenes `http:` würde abgewiesen.
MESSUNG NÖTIG (C1).

**(c) K9.1, K9.2, K9.4 — FELDNAMEN.** GELESEN, "Host Your Own Signup Forms": "Scroll to find
the first audience field, like Email Address, and look for the <input> tag. `<input
type="email" name="MERGE0" id="MERGE0">` Copy the name value […] Repeat […] for every audience
field". "All of these values must be copied to your custom signup form for the data transfer
to work properly." GELESEN, "Advanced Form Customization": Merge-Tags `EMAIL`, `FNAME`,
`LNAME` in einer Weiterleitung und `<input type="hidden" name="FNAME" value="*|FNAME|*">`.
FOLGERUNG: Die Feldnamen stehen je Konto im Quelltext des gehosteten Formulars; die Doku
zeigt zwei Schreibweisen (`MERGE0` und `EMAIL`/`FNAME`). Welche ein Formular des Owners
trägt, ist nicht belegt (C1) — die Vermutung "EMAIL" aus dem Auftrag ist damit weder
bestätigt noch widerlegt.
PFLICHTFELDER, GELESEN, "Troubleshooting …", "Subscriber submits and goes to signup form with
alerts": Fehlt ein Pflichtfeld im Code (etwa ein verborgenes "First Name"), wird der
Besucher auf das GEHOSTETE Formular mit Hinweisen geschickt. GELESEN, "Add Hidden Fields …":
"The Email Address field is required on all signup forms"; versteckte Felder dürfen nicht
Pflicht sein. Unbekannte Felder (K9.4): NICHT GEFUNDEN, Reichweite: die voll gelesenen Seiten.

**(d) K10 — BOT-SCHUTZ.** GELESEN, "About reCAPTCHA for Signup Forms": Tabelle — "Mailchimp
Basic Signup Form: Not using reCAPTCHA, but throttling to block bots"; "Embedded Forms:
Checkbox", "Required? No"; einzuschalten unter "Forms > Settings > Audience-wide defaults".
"If you've enabled double opt-in and use an embedded form, this will appear after your
subscriber clicks the link in the opt-in confirmation email." GELESEN, "About Double Opt-in":
"reCAPTCHA confirmation — After someone fills out your signup form, they'll need to check a
reCAPTCHA box. This required step […] can't be turned off or edited." GELESEN, "How the Form
Builder Works": "reCAPTCHA confirmation — The reCAPTCHA page that appears after someone
enters their information into your signup form." GELESEN, "Troubleshooting …": "Too many
subscribe attempts for this email address"; bei falschen Eintragungen neuen Code mit
reCAPTCHA erzeugen.
Eine Prüfung von `Origin` oder `Referer`: NICHT GEFUNDEN. MESSUNG NÖTIG (C3).
FOLGERUNG: reCAPTCHA ist bei Mailchimp eine SEITE nach dem Absenden, nicht (nur) ein Element
im Formular. Unser Skript folgt dieser Seite nicht, und der Besucher sieht sie nicht; ob ein
Eintrag ohne sie wirksam wird, ist nicht belegt (C3).

**(e) K11 — DOUBLE-OPT-IN.** GELESEN, "About Signup Form Options": "Mailchimp audiences are
single opt-in by default"; "If your primary contact address is in the European Union, some of
your audiences may be double opt-in by default." Einstellung je ZIELGRUPPE. GELESEN, "About
Double Opt-in": Ablauf Formular → Bestätigungsmail → Klick → Kontakt "subscribed"; Versender
ist Mailchimp mit einer im Form Builder gestaltbaren "Opt-in confirmation email". "Double
opt-in for email contacts can only be enabled for Mailchimp signup forms. If you need help
with a form integration or the API, contact your developer". GELESEN, "Host Your Own …": der
Test verlangt "Confirm your subscription" — FOLGERUNG: ein selbst gehostetes Formular läuft
durch das Double-Opt-In der Zielgruppe; ungemessen (C4). K11.3: Eine Pflicht-Checkbox ist nur
für das SMS-Feld belegt ("The legal checkbox is required and can't be edited", "Customize
Your Embedded Signup Form"); GDPR-Felder als Möglichkeit ("About Signup Form Options").

**(f) K12 — ANTWORT.** GELESEN, "Troubleshooting …": Ohne JavaScript "they may be taken to
the Mailchimp-hosted confirmation thank you page"; mit Double-Opt-In "redirected to another
page, called the signup thank you page". GELESEN, "Design and Host Your Own "Thank You"
Pages": Eine eigene Danke-Seite ist je Zielgruppe einstellbar ("Success step … redirect
subscribers to an external link"); für ein eingebettetes Formular gilt sie nur mit "Disable
all Javascript". GELESEN, "Advanced Form Customization": Fehler lassen sich per Meta-Weiterleitung
mit den Werten im Query an die eigene Seite zurückgeben (`?EMAIL=…&FNAME=…`).
FOLGERUNG: Die Antwort ohne Skript ist eine Seite bzw. eine Weiterleitung; Erfolg und Fehler
unterscheiden sich im Ziel der Weiterleitung. NUR ABGELEGT (Katalog K12): im Modus `no-cors`
ist das für unser Skript `opaque` — Erfolg und "signup form with alerts" sind dann nicht zu
unterscheiden. BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-21 ("erreicht" = `opaque`) und Arbeit
P13-12 ("Die Zustellung ist vom Browser aus nicht bestätigbar"). Die Rückgabe der Werte im
Query berührte, auf einer Seite von uns, die Invariante I2 der Scheibe 13-1 — hier nur
vermerkt, nicht Teil unseres Wegs.

**(g) K13 — ANDERE WEGE.** GELESEN, "About Signup Form Options", "Form API": "code your signup
form from the ground up and pass subscriber information back to Mailchimp through our API".
K13.1 NUR ABGELEGT: ein Schlüssel im ausgelieferten Text wäre öffentlich — nach Setzung P13-6
für uns ausgeschlossen. GELESEN, apps.make.com/mailchimp: Make führt eine Mailchimp-App ("manage
the campaigns, merge fields, subscribers, lists, segments and more"), Verbindung über OAuth;
die einzelnen Module stehen auf der gelesenen Seite NICHT.

**(h) K14 — EIGENE BESTÄTIGUNG.** GELESEN, "Turn the Final Welcome Email On or Off": "an
optional final welcome email, which is sent after someone subscribes", standardmässig AUS,
einschaltbar im Form Builder ("Forms and response emails > Final welcome email"); bei einem
Formular im "advanced mode" über die "Audience Settings". "When you use Mailchimp's signup
forms" — ob das ein selbst gehostetes Formular einschliesst, sagt die Seite nicht (C4).
GELESEN, "Create an Automated Welcome Email": eine Automatisierung mit Auslöser "Signs up for
Email" für neue Kontakte mit Status "subscribed"; "Imported contacts are included by default";
bereits abonnierte Kontakte kommen nicht erneut hinein; alternativ "Tag added". Welche Pläne
sie tragen, verweist auf die Preisseite (nicht gelesen).
FOLGERUNG: Eine Bestätigung ohne Kampagne ist die "Final welcome email"; über Make (Kontakt per
API) trüge eine Automatisierung mit "Signs up for Email" oder "Tag added" — nicht gemessen.

**(i) K5 — REGION.** GELESEN, "Mailchimp and European Data Transfers": "Mailchimp's
headquarters are in the United States and our servers are also located in the United
States"; Übermittlung auf Grundlage des EU-U.S. Data Privacy Framework, ersatzweise SCC im
DPA. Eine wählbare Region: NICHT GEFUNDEN. Aufbewahrungsdauer (K5.2): NICHT GELESEN.

**(j) K6, K4.** K6: GELESEN, "Host Your Own …" — Nachweis durch eigenes Eintragen und Suche
des Profils; "About Signup Form Options" — Segment nach "signup source". K4: GELESEN,
"Troubleshooting …" — "Too many subscribe attempts for this email address" (Abhilfe: in etwa 5
Minuten erneut); "Subscribers got success message but aren't on my list" (Double-Opt-In offen
oder falsche Kennungen im Code); "Nothing happens after someone clicks submit" bei mehreren
Formularen mit JavaScript-Prüfung auf einer Seite. Ratenlimits am Endpunkt: NICHT GEFUNDEN.

**(k) K1, K2, K3, K7.** K1: `method="POST"` im Beispiel (b); der Content-Type ist dort nicht
genannt (FOLGERUNG: ein natives HTML-Formular ohne `enctype` sendet form-urlencoded —
Browser-Verhalten, hier nicht gelesen). K2 (CORS, Preflight): NICHT GEFUNDEN. K3.2: Die
Kennungen `u` und `id` stehen im öffentlichen Quelltext des gehosteten Formulars; als
Geheimnis behandelt sie keine gelesene Seite. K7: Messfrage (C5).

### Messkandidaten Mailchimp (aus der Lesung vom 2026-09-28)

Keiner gemessen; die Liste entscheidet nicht, welcher gemessen wird. VORAUSSETZUNG FÜR ALLE:
ein Mailchimp-Testkonto — nach Entscheidung P13-4 nicht vorhanden; ob eines angelegt wird, ist
eine Owner-Frage.
- C1 — Quelltext des gehosteten Formulars eines Testkontos: `action` (Schema, Host,
  Serverteil), `u`, `id`, alle `name`-Werte (MERGE0 oder EMAIL?), versteckte Felder. Danach
  ein `POST` mit `application/x-www-form-urlencoded` von einem fremden Ursprung: Status,
  Weiterleitung, CORS-Kopfzeilen; kommt der Kontakt an? (K8.2, K9, K12; zu (b), (c), (f))
- C2 — Derselbe `POST` OHNE ein Pflichtfeld: welche Antwort ("signup form with alerts")? Im
  Modus `no-cors` wäre sie `opaque` — gleich dem Erfolg. (K4.6, K12.2; zu (c), (f))
- C3 — reCAPTCHA der Zielgruppe AN: wird ein `POST` ohne den Schritt wirksam, oder bleibt der
  Kontakt aus? Dazu fremder `Origin`/fehlender `Referer`. (K10.2; zu (d))
- C4 — Double-Opt-In der Zielgruppe AN bzw. "Final welcome email" AN: greifen beide beim
  selbst gehosteten Formular? (K11, K14; zu (e), (h))
- C5 — Erfassen gängige Filterlisten `list-manage.com`? (K7.1)

### EINORDNUNG Mailchimp (Befund, keine Entscheidung)

NUR MIT ANDEREN FELDNAMEN — nach der Doku trägt der Weg aus 13-1 bei Mailchimp: Ein eigenes
Formular, das an `…list-manage.com/subscribe/post` sendet, ist ein dokumentierter Weg ((a),
(b)). Es braucht die Feldnamen der Zielgruppe (`MERGE0` im Beispiel bzw. Merge-Tags wie
`EMAIL`, `FNAME`, aus dem Quelltext des gehosteten Formulars abzulesen) UND zwei versteckte
Felder `u` und `id` ((b), (c)) — die heutige automatische Benennung aus Scheibe 13-1c
erzeugt weder diese Namen noch diese Felder.
DAZU ZWEI STILLE VERLUSTE, NACH DOKU, UNGEMESSEN: ein fehlendes Pflichtfeld und die
reCAPTCHA-Seite enden bei Mailchimp auf einer Seite, die der Besucher bei unserem Weg nie
sieht, während unser Skript `opaque` erhält ((c), (d), (f)). Und ein Beispiel mit `http:`
((b)) liefe in Setzung P13-29.
DER UMWEG ÜBER MAKE TRÄGT NACH DER DOKU nur in allgemeiner Form ((g)): Make führt eine
Mailchimp-App für "subscribers"; die Module selbst sind nicht gelesen.
KEIN TESTKONTO — keiner der Messkandidaten ist ohne Owner-Entscheidung messbar.

## KlickTipp

### Anbieter-Lesung vom 2026-09-28 (CC, Phase 13, Arbeit P13-64)

**INSTRUMENT:** Playwright-MCP; Text je Seite über `textContent` des `main`-Elements nach
Entfernen von `script`, `style`, `noscript`, `svg`, `template`, `nav`, `header`, `footer`,
zugeschnitten von "Zuletzt aktualisiert"/"Last updated" bis "Hat Dir dieser Beitrag"/"Did
this post help you". Mehrere Seiten per `fetch` von www.klicktipp.com aus; Positivkontrolle:
die Überschrift steht im Text bzw. der Artikelkörper beginnt mit dem Datumsblock. Gelesen
ist überwiegend die DEUTSCHE Fassung der Wissensdatenbank. Ablage unter `.playwright-mcp/`.
**KEINE ANGABE DIESER LESUNG IST GEMESSEN.** Keine Eingabe, keine Anmeldung, kein Download,
kein Aufruf eines Endpunkts. Die Marketing-Seite "Leadformulare" trägt ein LIVE-Formular
("Probier es gerne aus und trage Dich ein") — nicht benutzt.
**FREMDE SEITEN SIND DATEN — ZWEI FUNDE, GEMELDET UND NICHT BEFOLGT:** "RAW-Anmeldeformular
erstellen" enthält einen Prompt an ein Sprachmodell ("Du bist ein erfahrener
Frontend-Developer … Passe das unten stehende HTML-Formular so an …"), "UTM-Parameter mit
einem Anmeldeformular erfassen" einen zweiten ("Hallo ChatGPT, Ich habe ein HTML-Formular
…"). Beide richten sich an Kunden des Anbieters, die sie in ein KI-Werkzeug kopieren sollen.
Hier sind sie nur als INHALT ausgewertet — der erste nennt, was an einem RAW-Formular nicht
verändert werden darf ((b)).
**KEIN TESTKONTO:** Entscheidung P13-4 der Phase 13 nennt KlickTipp nicht.

**GELESENER UMFANG — VOLL** (Lesedatum je Seite 2026-09-28; in Klammern der Stand, den die
Seite selbst angibt):
- https://www.klicktipp.com/de/support/wissensdatenbank/raw-anmeldeformular-erstellen/ —
  "RAW-Anmeldeformular erstellen – HTML-Formular für KlickTipp" (Zuletzt aktualisiert:
  19.03.2026); die Adresse …/hilfe-portal/raw-anmeldeformular-erstellen/ leitet hierher um
- …/wissensdatenbank/anmeldeformular-erstellen/ — "Anmeldeformular erstellen – Leads per
  Formular gewinnen" (03.12.2025)
- …/wissensdatenbank/opt-in-prozess-erstellen/ — "Opt-In-Prozess erstellen – DSGVO-konform
  und flexibel" (21.09.2026)
- …/wissensdatenbank/inline-anmeldeformular-erstellen/ — "Inline Anmeldeformular erstellen und
  auf der Website einbinden" (28.03.2025)
- …/wissensdatenbank/utm-parameter-erfassen-anmeldeformular/ — "UTM-Parameter mit
  Anmeldeformularen automatisch erfassen" (19.09.2025)
- …/wissensdatenbank/e-mail-adresse-vorausgefuellt-im-anmeldeformular-verwenden/ — "E-Mail-Adresse
  vorausgefüllt im Anmeldeformular verwenden" (23.04.2025)
- …/wissensdatenbank/dropdown-auswahlfeld-im-anmeldeformular-nutzen/ — "Dropdown-Auswahlfeld im
  Anmeldeformular verwenden" (16.04.2025)
- https://www.klicktipp.com/support/knowledge-base/connect-make-optimize-workflows/ — "Connect
  Make to KlickTipp to Automate and Optimize Workflows" (Last updated: 24.09.2025)
- https://developers.klicktipp.com/guides/listbuilding-api — "Secure & Easy Integration with
  the Listbuilding API" (ohne Datum)
- Das Verzeichnis …/wissensdatenbank/klicktipp-benutzen/anmeldeformulare/ — "Anmeldeformulare
  | Leads gewinnen mit KlickTipp" (15 Artikel; geöffnet sind die oben genannten).

**GELESENER UMFANG — GEZIELT:**
- https://developers.klicktipp.com/listbuilding-api — "KlickTipp Listbuilding API" (Übersicht
  der Spezifikation, 3 779 Zeichen). Achse `signin|cors|access-control|origin|
  x-www-form-urlencoded|application/json|redirect|406|429|rate|limit|apikey|secret|public|
  browser|opt-?in|double`; 7 Treffer, im Wortlaut gelesen. GRENZE, WERKZEUG: Die Abschnitte der
  einzelnen Operationen (`#operation/api.subscriber.signin` …) sind im geladenen Text NICHT
  enthalten; was dort steht (Content-Types, Antworten, CORS), ist nicht gelesen.
- https://www.klicktipp.com/de/marketing-suite/leads-generieren/formulare/ — "Leadformulare von
  KlickTipp" (Marketing-Seite). Achse `single-opt-in|double-opt-in|bestätigungs|server|
  rechenzentr|deutschland|captcha|spam|html|raw|api|willkommen|dankesch`; 19 Treffer.
- https://www.klicktipp.com/de/marketing-suite/datenschutz-dsgvo/ — "Newsletter Datenschutz
  DSGVO-konform umsetzen" (Marketing-Seite, 7 aufklappbare Elemente, alle über `textContent`
  erfasst). Achse `server|rechenzentr|deutschland|hosting|gehostet|speicher|standort|EU|europ|
  löschfrist|aufbewahr`; 17 Treffer. Positivkontrolle: "DSGVO" 83-mal.
- NICHT LESBAR: "Spam-Schutz-Quellcode auf der Webseite einsetzen" — die deutsche
  (…/wissensdatenbank/spam-schutz-quellcode-auf-der-webseite-einsetzen/) und die englische
  Adresse (…/knowledge-base/spam-protection-sign-up-forms/) leiten am 2026-09-28 auf die
  Übersicht der Wissensdatenbank um. Ihr Inhalt ist NICHT gelesen; eine Zusammenfassung im
  Suchindex ist KEINE Lesung und wird hier nicht wiedergegeben.

**REITER, TABELLEN, SYMBOLE, BILDER:** Keine gelesene Seite trägt `role=tab`. Eine
Vergleichstabelle auf der Datenschutz-Seite ist als Text gelesen. BILDER SIND NICHT GELESEN —
auch keines, das den Einbettungscode eines RAW-Formulars zeigen könnte.

**GESEHEN, NICHT GEÖFFNET** (je mit Grund):
- Aus dem Verzeichnis "Anmeldeformulare": "E-Mail-Signatur …", "Combo-Box …", "Eintragung per
  E-Mail …" (zwei), "Eintragung-per-SMS …", "Business Card Reader …", "Social-Proof-Counter
  …", "Austragung per SMS …" — andere Eintragungswege oder Gestaltung.
- "Create an API Key for Third-Party Integrations", "KlickTipp API Documentation –
  Authentication & Integration", "API Connection with Developer and Customer Keys",
  "Building Robust Integrations with the Management API" — K13.1 wird nur abgelegt; der
  Listbuilding-Weg ist über den Developer-Guide gelesen.
- "Error Handling and Validation", "Data Field Types and Input Formats" (developers.klicktipp.com)
  — Fehlermodell der API; nur für K13.1.
- support.klicktipp.com (ältere Knowledgebase, u. a. ClickFunnels, Thrive) und
  app.klicktipp.com/anti-spam/… — ältere bzw. Anbieter-Rechtsseiten; nicht geöffnet.
- Die Datenschutzerklärung und der AVV — K5.2 bleibt offen.
**PRÜFUNG DER AUSSCHLUSSLISTE GEGEN DIE OFFENEN FRAGEN** (2026-09-28): Offen nach der Lesung
sind K8.2 (Adresse), K9 (vollständige Feldnamen), K10.2 (Wirkung des Spam-Schutz-Skripts),
K12, K1, K2, K5.2. Nach dem Titel trug eine ausgeschlossene Seite davon eine: "Error Handling
and Validation" (K12.2, für die API) — für den Formular-Weg trägt sie nach ihrem Titel nichts,
für K13.1 wird nur abgelegt; NICHT geöffnet, und das ist hier die benannte Lücke. Die Seite
zum Spam-Schutz (K10) war nicht lesbar (s. oben).

**(a) K8.1, K8.4 — EIN HTML-FORMULAR OHNE SKRIPT DES ANBIETERS IST ALS "RAW" ANGEBOTEN.**
GELESEN, "RAW-Anmeldeformular erstellen": "Du kannst das RAW Anmeldeformular ganz flexibel
nutzen, wenn Du Dich mit HTML und CSS auskennst." Anlegen unter "Listbuilding → Neues
Listbuilding → RAW Code"; Code unter "Einbettungscode → HTML Quellcode einfügen". GELESEN,
"Anmeldeformular erstellen" und "Inline Anmeldeformular …": das Standard- und das
Inline-Formular gibt es nur als "JavaScript- oder … iFrame-Quellcode".

**(b) K8.2, K9, K10 — WAS AM RAW-FORMULAR FEST IST.** GELESEN, ebenda: "Bitte schneide die
letzte Code-Zeile aus – sie enthält das Spam-Schutz-Skript." — "Füge das Spam-Schutz-Skript an
geeigneter Stelle in Dein CMS ein." — "Das stellt sicher, dass Dein RAW Anmeldeformular
einwandfrei funktioniert." Der Prompt auf derselben Seite nennt als unveränderlich:
"Action-URL, Feldnamen, API-Key, DSGVO-Checkbox, Captcha-Script bleiben erhalten".
FOLGERUNG: Das RAW-Formular trägt eine feste Zieladresse, feste Feldnamen, einen
"API-Key" und ein Skript des Anbieters zum Spam-Schutz; ob ein Absenden OHNE dieses Skript
angenommen wird, ist nicht belegt — die Seite zum Spam-Schutz war nicht lesbar. MESSUNG NÖTIG
(KT1, KT2). Die Form der Adresse steht auf KEINER gelesenen Seite — Reichweite: die voll
gelesenen Seiten; Bilder nicht gelesen.

**(c) K9.1, K9.3 — FELDNAMEN.** GELESEN, "UTM-Parameter …": ein zusätzliches Feld erscheint im
Code in der Form `fields[field123456]` — "Die Zahl zeigt die ID des Feldes in KlickTipp";
ein Feld lässt sich im RAW-Formular als "Versteckt" anlegen. GELESEN, "E-Mail-Adresse
vorausgefüllt …": das E-Mail-Feld wird über `value` vorbelegt; sein `name` steht dort nicht.
GELESEN, developers.klicktipp.com (Listbuilding-Guide): in der API heissen Standardfelder
`fieldFirstName`, `fieldLastName`; "all field values must match the field types and field
keys configured in the KlickTipp account".
FOLGERUNG: Die Feldnamen eines RAW-Formulars sind kontoabhängig (Feld-IDs); welche Namen das
E-Mail-Feld, die Kennung und der "API-Key" tragen, ist nicht belegt (KT1).

**(d) K11 — DOUBLE-OPT-IN.** GELESEN, "RAW-Anmeldeformular erstellen": "Wähle den gewünschten
Double-Opt-In-Prozess aus"; optional eine DSGVO-Checkbox mit änderbarem Text. GELESEN,
"Opt-In-Prozess erstellen": Anlegen unter "Listbuilding → Opt-In-Prozesse"; Impressum in der
Bestätigungs-E-Mail prüfen; eigene Bestätigungs- und/oder Dankeschönseite wählbar;
unbestätigte Kontakte automatisch entfernen ("Viele Kontakte bestätigen ihre E-Mail-Adresse
nach mehr als 7 Tagen nicht mehr"). GELESEN, Marketing-Seite "Leadformulare": "Bei
Single-Opt-in landen Kontakte, die Dein Formular absenden, ohne Bestätigungs-E-Mail direkt in
Deiner Liste"; bei Double-Opt-in "KlickTipp übernimmt den gesamten Bestätigungsprozess
automatisch", die Bestätigungs-E-Mail ist anpassbar. Versender ist KlickTipp (K11.2). Die
DSGVO-Checkbox ist optional ("Aktiviere optional").

**(e) K12 — ANTWORT.** Der Opt-In-Prozess kennt eigene Bestätigungs- und Dankeschönseiten (d).
Was die Adresse des RAW-Formulars auf ein Absenden ohne Skript antwortet, steht auf KEINER
gelesenen Seite. MESSUNG NÖTIG (KT1). NUR ABGELEGT (Katalog K12): im Modus `no-cors` `opaque`.

**(f) K13 — ANDERE WEGE.** GELESEN, "Connect Make to KlickTipp …": eine KlickTipp-App in Make
mit u. a. "Add or Update Contact" ("If a contact with the same e-mail already exists, it will
be updated"), "Tag Contact", "Unsubscribe Contact"; Voraussetzung "a Premium subscription or
higher so that you have access to the API"; Anmeldung mit Benutzername und Passwort; Fehler
u. a. "[406] Update of contact failed. The address is not reachable according to our
validation". GELESEN, Listbuilding-Guide: `POST https://api.klicktipp.com/subscriber/signin`
mit `Content-Type: application/json` und `apikey`, `email`, `fields` im Rumpf; je Schlüssel
genau EIN Tag und EIN Opt-In-Prozess; dieselbe API kennt "Signout" (Tag entfernen) und
"Signoff" (Kontakt austragen); "ideal for forms, landing pages"; "API access requires a Premium
plan or higher". GELESEN, Spezifikation: "Authentication is performed by sending the API key
directly in the request body"; Fehler "typically use HTTP status code 403 or 406".
K13.1 NUR ABGELEGT — mit einem Befund, der über das Ablegen hinausweist: Ein
Listbuilding-Schlüssel im ausgelieferten Text wäre öffentlich, und derselbe Schlüssel kann
nach der Doku Kontakte AUSTRAGEN ("Signoff"). BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-6 der
Phase 13 ("DIE EINGETRAGENE ADRESSE IST KEIN GEHEIMNIS") trifft die Adresse; ob der "API-Key"
im RAW-Formular (b) dieser Listbuilding-Schlüssel ist, ist NICHT belegt. Träfe es zu, stünde
im RAW-Formular ein Wert, der Trigger (ii) des offenen Punkts "DER PRIMÄRSCHLÜSSEL
(project_id, target) AUF project_secrets BLEIBT" berührt ("die Kennung selbst ein
Geheimnis").
BEZUG (ARCHITEKTEN-SETZUNG 2026-09-28, kein Konflikt mit P13-6): Ein solcher Schlüssel im
Formular-HTML des Anbieters steht in der Seite des Betreibers, nicht in einer Konfiguration
von Pagesmith — würde Pagesmith einen solchen Schlüssel je SELBST in einer Konfiguration
führen (etwa für Vorlagen je Anbieter), greift Trigger (ii) des Punkts "DER PRIMÄRSCHLÜSSEL
(project_id, target) AUF project_secrets BLEIBT"; Neubewertung dann.

**(g) K14 — EIGENE BESTÄTIGUNG.** GELESEN, Marketing-Seite "Leadformulare": "Eigene
Bestätigungs-E-Mail" (bei Double-Opt-in), "Eigene Dankeseite", "KlickTipp sendet neuen Leads
rund um die Uhr Dein E-Book, Deine Checkliste …" (Willkommensgeschenke). Eine Bestätigungs- oder
Willkommensmail bei SINGLE-Opt-in OHNE Kampagne: NICHT GEFUNDEN — Reichweite: die voll und
gezielt gelesenen Seiten. FOLGERUNG: Bei Double-Opt-in ist die Bestätigungs-E-Mail des
Anbieters selbst die Bestätigung; darüber hinaus zeigt die Lesung nur Kampagnen.

**(h) K5 — REGION.** GELESEN, Datenschutz-Seite: "Jede E-Mail, die über KlickTipp versendet
wird, stammt garantiert von Mailservern in Deutschland"; Vergleichstabelle "Verarbeitung
personenbezogener Daten — Garantiert nur innerhalb der EU"; AVV. Wo die DATEN (nicht der
Versand) gespeichert werden, sagt die gelesene Stelle nur als "innerhalb der EU".
Aufbewahrung (K5.2): NICHT GELESEN.

**(i) K1, K2, K3, K4, K6, K7.** K1/K2 für die Adresse des RAW-Formulars: NICHT GEFUNDEN. Für
die API: JSON (f) — aus dem Browser eine Anfrage mit Preflight (Fetch-Spezifikation, hier
nicht gelesen); ob die API CORS erlaubt, ist nicht gelesen. K3.2: s. (f). K4: GELESEN, (f) —
406 bei einer Adresse, die die Prüfung des Anbieters nicht besteht. K6: GELESEN,
"Anmeldeformular erstellen" — Testkontakt über die Vorschau, sichtbar unter "Kontakte". K7:
Messfrage (KT4).

### Messkandidaten KlickTipp (aus der Lesung vom 2026-09-28)

Keiner gemessen; die Liste entscheidet nicht, welcher gemessen wird. VORAUSSETZUNG FÜR ALLE:
ein KlickTipp-Konto — nach Entscheidung P13-4 nicht vorhanden; ob eines angelegt wird, ist
eine Owner-Frage. Für den API-Weg zusätzlich ein Premium-Tarif.
- KT1 — Den Einbettungscode eines RAW-Formulars ablesen: `action`, `method`, `enctype`,
  alle `name`-Werte, versteckte Felder, der "API-Key" (welcher Schlüssel?), die letzte Zeile
  (Spam-Schutz-Skript). Danach ein `POST` wie der des Browsers: Status, Weiterleitung, Rumpf,
  CORS-Kopfzeilen; kommt der Kontakt an? (K8.2, K9, K12; zu (b), (c), (e))
- KT2 — Derselbe `POST` OHNE das Spam-Schutz-Skript auf der Seite bzw. aus einem fremden
  Ursprung: angenommen oder abgewiesen? (K10.2; zu (b))
- KT3 — Ist der "API-Key" im RAW-Formular ein Listbuilding-Schlüssel, der auch "Signoff"
  erlaubt? (K3.2; zu (f)) — die Antwort entscheidet, ob ein RAW-Formular ein Geheimnis in
  den ausgelieferten Text trüge.
- KT4 — Erfassen gängige Filterlisten den Host aus KT1? (K7.1)

### EINORDNUNG KlickTipp (Befund, keine Entscheidung)

NICHT ENTSCHEIDBAR. Ein HTML-Formular ohne Skript des Anbieters ist als "RAW" ANGEBOTEN ((a)),
aber mit festen Feldnamen, einem "API-Key" und einem Spam-Schutz-Skript, das nach der Doku für
das "einwandfreie" Funktionieren eingebunden werden soll ((b)); dessen Beschreibung war nicht
lesbar. Trägt der Weg, dann nur MIT DEN FELDNAMEN VON KLICKTIPP (Feld-IDs der Form
`fields[field…]`, (c)) — welche genau und ob ohne das Skript, klärt erst KT1/KT2. Ob das
RAW-Formular einen Schlüssel mit Austragungs-Recht trägt, ist offen (KT3).
DER UMWEG ÜBER MAKE TRÄGT NACH DER DOKU ((f)): "Add or Update Contact" und "Tag Contact" — aber
nur ab einem Premium-Tarif mit API-Zugang, und die Verbindung braucht Benutzername und Passwort
des KlickTipp-Kontos in Make.

## Zapier

### Anbieter-Lesung vom 2026-09-30 (CC, Phase 13.6, Arbeit P13.6-27)

**INSTRUMENT:** Playwright-MCP. Text je Seite über `textContent` des Artikelkörpers (Hilfe:
Element mit Klasse `article`; zapier.com: `main`) nach Entfernen von `script`, `style`,
`noscript`, `svg`, `template`. `textContent`, weil es auch die nicht gezeigten Teile trägt —
den nicht vorausgewählten Reiter und zugeklappte Elemente. Positivkontrolle je Seite: der
Seitentitel steht im gelesenen Text. Das Datum je Hilfeseite ist das `time`-Element neben
"Updated". Auszüge unter `.playwright-mcp/zapier-*.json` (in `.gitignore`, nicht im Repo).
**KEINE ANGABE DIESER LESUNG IST GEMESSEN.** Keine Eingabe, keine Anmeldung, kein Download, kein
Aufruf einer Webhook-Adresse. JEDE DOKU-AUSSAGE UNTEN ERSETZT DIE MESSUNG NICHT — der Live-Test
vor einer Aufnahme in die Host-Liste bleibt Pflicht (Owner-Entscheidung P13.6-55 der Phase 13.6).
**KEIN TESTKONTO MIT WEBHOOKS:** "Webhooks by Zapier" steht im Free-Konto nicht zur Verfügung
((a)); der Owner hat ein Free-Konto (OWNER-ANGABE 2026-09-30, Screenshot des Zap-Editors, nicht
im Repo).

**MASSSTAB — WAS DAS RELAY SENDET UND WIE ES WERTET** (GELESEN AM CODE, CC, 2026-09-30, Stand
`2c32483`; nur Bezug, keine Entscheidung). `forward` (src/lib/relay/relay.ts): genau ein `POST`,
Kopfzeile allein `Content-Type: application/x-www-form-urlencoded`, der Rumpf als unveränderte
Bytes des Browser-Rumpfs (`URLSearchParams(new FormData(…))` in `buildFormTargetRuntime`,
src/lib/form-target.ts), `redirect: "manual"`, Zeitlimit `RELAY_FORWARD_TIMEOUT_MS` (5 000 ms),
kein Kopf des Besuchers; Antwort-Rumpf verworfen; 2xx UND 3xx (und `opaqueredirect`) =
"zugestellt", alles andere "nicht zugestellt". Eingehender Rumpf höchstens
`RELAY_MAX_BODY_BYTES` (64 KiB). `allowedRelayEndpoint` (src/lib/relay/hosts.ts): nur `https:`,
ohne Nutzerangaben und Port, Host normalisiert und EXAKT in `RELAY_HOSTS`; DER PFAD WIRD NICHT
GEPRÜFT. Der Datensparmodus schickt browser-direkt mit `mode: "no-cors"`, `keepalive: true`
(`buildFormTargetRuntime`).

**GELESENER UMFANG — VOLL** (Lesedatum je Seite 2026-09-30; in Klammern das `time`-Element):
- Das Verzeichnis des Abschnitts "Webhooks" der Hilfe,
  https://help.zapier.com/hc/en-us/sections/38070734814733-Webhooks — zehn Artikel; geöffnet
  sind die sechs folgenden, die übrigen vier stehen unter "GESEHEN, NICHT GEÖFFNET".
- https://help.zapier.com/hc/en-us/articles/8496288690317-Trigger-Zap-workflows-from-webhooks —
  "Trigger Zap workflows from webhooks" (2026-05-29); die Adresse
  …/8496288690317-Trigger-Zaps-from-webhooks leitet hierher um
- https://help.zapier.com/hc/en-us/articles/8496083355661-How-to-get-started-with-Webhooks-by-Zapier
  — "How to get started with Webhooks by Zapier" (2026-08-10)
- https://help.zapier.com/hc/en-us/articles/29972220283789-Webhooks-by-Zapier-rate-limits —
  "Webhooks by Zapier rate limits" (2026-05-29)
- https://help.zapier.com/hc/en-us/articles/8496291737485-Troubleshoot-webhooks-in-Zapier —
  "Troubleshoot webhooks in Zapier" (2026-05-29)
- https://help.zapier.com/hc/en-us/articles/8496215655437-Zap-is-not-receiving-webhooks — "Zap
  is not receiving webhooks" (2026-05-29; drei zugeklappte Unterabschnitte, über `textContent`
  erfasst)
- https://help.zapier.com/hc/en-us/articles/39349960317581-Unexpected-multiple-runs-for-a-single-webhook
  — "Unexpected multiple runs for a single webhook" (2026-05-29)
- https://help.zapier.com/hc/en-us/articles/24290475355277-Maximize-efficiency-with-updated-webhook-behaviour
  — "Maximize efficiency with updated webhook behaviour" (2026-05-29; Abschnitt "Product
  updates: February 2024"); verlinkt auf der App-Seite unter "Common issues"
- https://help.zapier.com/hc/en-us/articles/37982571569421-What-is-a-premium-app — "What is a
  premium app?" (2026-05-29)
- https://help.zapier.com/hc/en-us/articles/32337438839565-What-s-included-in-Zapier-s-Free-plan
  — "What's included in Zapier's Free plan?" (2026-08-21)
- https://zapier.com/apps/webhook/integrations — "Webhooks by Zapier Integrations | Connect Your
  Apps with Zapier" (ohne Datum; Filterknöpfe "Triggers/Actions", kein `role=tab`; vier
  zugeklappte Elemente, über `textContent` erfasst)
- https://help.zapier.com/hc/en-us/articles/37454233721869-How-to-troubleshoot-held-Zap-or-step-runs
  — "How to troubleshoot held Zap or step runs" (2026-05-29); geöffnet nach der Prüfung der
  Ausschlussliste (K4.4)
- https://help.zapier.com/hc/en-us/articles/8496291148685-View-and-manage-your-Zap-history — "View
  and manage your Zap history" (2026-06-15); geöffnet nach der Prüfung der Ausschlussliste (K6.1)
- https://zapier.com/legal/data-retention-deletion — "Data Retention/Deletion/Export" (die Seite
  selbst: "last updated: April 17, 2026"; elf Tabellen, Text)
- https://help.zapier.com/hc/en-us/articles/8496327478413-Customize-data-retention-in-Zapier —
  "Customize data retention in Zapier" (2026-05-29)
- https://zapier.com/legal/data-privacy — "Data Privacy Overview | Zapier" (ohne Datum; 26
  zugeklappte FAQ-Elemente, über `textContent` erfasst)
- NUTZERBEITRÄGE, voll gelesen, weil ihr Titel eine offene Frage trägt (Z5 bzw. Z8):
  https://community.zapier.com/code-webhooks-52/zap-stopped-working-do-webhooks-requires-premium-access-15275
  (2022-04-20) ·
  https://community.zapier.com/code-webhooks-52/how-do-i-configure-cors-headers-for-webhooks-triggers-6837
  (2020-12-02) ·
  https://community.zapier.com/code-webhooks-52/webhooks-and-squarespace-cors-error-23833
  (2023-05-12)

**GELESENER UMFANG — GEZIELT** (Suche über den Seitentext, Achse und Positivkontrolle):
- https://zapier.com/legal/data-processing-addendum — "Data Processing Addendum | Zapier"
  ("Last Updated: August 27, 2026 Effective: August 27, 2026"). Achse `last updated|effective|
  United States|Standard Contractual|delet|retention|Customer Personal Data|Sub-?processor|log`;
  46 Treffer, die ersten 40 im Wortlaut gelesen; Positivkontrolle "Zapier" 109-mal. Die übrigen
  Klauseln sind NICHT gelesen; eine rechtliche Bewertung ist das nicht.
- https://zapier.com/legal/subprocessors — "Subprocessors | Zapier" ("Posted Date: September 5,
  2026 Effective Date: September 19, 2026"). Achse `Amazon|AWS|hosting|United States|European|
  Ireland|Germany|last updated|effective`; die ersten Zeilen jeder der vier Tabellen gelesen.
  Positivkontrolle "Zapier" 34-mal.
- https://zapier.com/pricing — "Plans & Pricing | Zapier". Achse `premium app|webhook|data
  retention|EU|region|free plan|trial`; 15 Treffer im Wortlaut; dazu die Tabellenzeilen
  "Connections via webhooks", "Unlimited premium apps", "Custom data retention" zellenweise
  (Symbole, s. unten). Reiter "Platform" (ausgewählt), "Agents", "Chatbots" — nur "Platform"
  betrifft Zap-Workflows; die zwei anderen sind nach Titel andere Produkte, ihr Text lag in der
  Suche mit vor (je ein Treffer "Free", kein Treffer zu Webhooks).
- Websuchen (2026-09-30): `help.zapier.com premium apps Webhooks by Zapier free plan` ·
  `Zapier data retention how long does Zapier store Zap run data task history` ·
  `"hooks.zapier.com" CORS "Access-Control-Allow-Origin" catch hook browser` ·
  `help.zapier.com what happens when I reach my task limit held Zap runs` — nur zum Finden von
  Seiten; die Zusammenfassungen der Suchmaschine sind KEINE Lesung und stehen hier nicht.

**REITER, TABELLEN, SYMBOLE, BILDER:**
- REITER: "Trigger Zap workflows from webhooks" trägt "Catch Hook trigger" (ausgewählt) und
  "Catch Hook Raw trigger" (NICHT vorausgewählt); beide Reiterinhalte sind über `textContent`
  gelesen. "View and manage your Zap history": "Zap history page" (ausgewählt) und "Zap editor";
  beide gelesen. Die Preisseite: s. oben.
- SYMBOL-TABELLEN — DIE TRAGENDE AUSSAGE STEHT IN SYMBOLEN: Der Kasten "Available on plans:" auf
  "Trigger Zap workflows from webhooks" und "How to get started with Webhooks by Zapier" nennt
  im TEXT alle vier Tarife (Free, Professional, Team, Enterprise); erst die Bilder unterscheiden
  sie: bei Free ein Bild mit `alt="A grey X"` und der Klasse `ineligible-plan`, bei den übrigen
  `alt="A green checkmark"`; der Kasten trägt die Klasse `plan-free-ineligible`. Als reiner Text
  gelesen hiesse der Kasten "auf Free verfügbar" — das Gegenteil. "Customize data retention in
  Zapier": grauer X bei Free, Professional, Team, grüner Haken allein bei Enterprise. Die
  Vergleichstabelle der Preisseite trägt je Zelle ein Symbol ohne Text; ihre Kennungen sind
  `zinnia-icons--formDash` und `zinnia-icons--formCheck` — die Zuordnung "Dash = nicht
  enthalten, Check = enthalten" ist FOLGERUNG aus dem Namen.
- BILDER SIND NICHT GELESEN (ausser den `alt`-Texten der Tarif-Kästen) — u. a. fünf auf
  "Trigger Zap workflows from webhooks", sieben auf "How to get started …".

**GESEHEN, NICHT GEÖFFNET** (je mit Grund):
- Aus dem Abschnitt "Webhooks": "Trigger Zap workflows from polling webhooks" (…/8496274719757)
  — Zapier ruft dort selbst ab; "Send webhooks in Zap workflows" (…/8496326446989), "Zap isn't
  sending webhooks" (…/8496231814157), "Webhooks: How to fix SSL certificate failures in Zap
  workflows" (…/8496231874445) — Zapier als ABSENDER, nicht als Empfänger.
- "Ways to make API requests in Zapier" (…/44391646192397), "Send API requests in Zap workflows"
  (…/44391650357005) — Aktionen.
- "Can't access or use Zapier with other apps" (…/8496216020877) und die Seite zur statischen IP
  (…/15406083674509) — AUSGEHENDE Adressen von Zapier.
- "Rate limits and throttling in Zapier" bzw. "Zap limits" (…/8496181445261) — allgemeine
  Grenzen; die für Webhooks stehen auf der gelesenen Seite "Webhooks by Zapier rate limits".
- "Replay Zap runs" (…/8496241726989), "Delay After Queue" (…/8496288754829) — Verarbeitung nach
  der Annahme.
- "Get started with your free Zapier trial" (…/8496197192461), "Apps tags in Zapier"
  (…/23415782732941) — Z2 ist über "What is a premium app?", die App-Seite und die Preisseite
  gelesen.
- "Export or delete your Zapier account data", "Export your Zap history" — K5.4 ist über die
  Löschoptionen auf "Data Retention/Deletion/Export" gelesen.
- Privacy Policy, Terms of Service, "Standard Contractual Clauses", "Data Transfer Impact
  Assessment", "Security and Compliance" — Umfeld des AVV; die rechtliche Tiefe gehört zur
  AVV-Arbeit (Owner-Entscheidung P13.6-18 der Phase 13.6), nicht zu dieser Lesung.
- Der Blogbeitrag "advanced webhooks with the Zapier platform interface" — Blog, und er gilt der
  Developer Platform.
- Community: "CORS policy problem in WordPress" (/23932), "Stuck troubleshooting how to pass url
  utm values via webhook" (/43998); dazu fremde Seiten aus der Websuche (github.com,
  community.latenode.com, community.airtable.com) — keine Anbieter-Doku; K2 ist über die zwei
  geöffneten CORS-Beiträge belegt, soweit Nutzerbeiträge etwas belegen.
- NICHT VORHANDEN: "Troubleshoot webhooks in Zapier" verlinkt im Satz "The Zap will still respond
  with a Success status" auf den Anker `#why-is-it-always-200-or-success-status-can-i-customize-the-response--0-2`
  derselben Seite; ein Abschnitt dieses Titels steht im gelesenen Text der Seite NICHT.
**PRÜFUNG DER AUSSCHLUSSLISTE GEGEN DIE OFFENEN FRAGEN** (2026-09-30): Offen nach der ersten
Durchsicht waren K4.4 (erschöpftes Kontingent), K6.1 (Nachweis für den Betreiber), Z5 (Konto ohne
Premium) und Z8 (CORS). Nach dem Titel trugen "How to troubleshoot held Zap or step runs" (K4.4,
Z5) und "View and manage your Zap history" (K6.1) eine davon — beide GEÖFFNET und oben geführt;
Z5 und Z8 zusätzlich über die Nutzerbeiträge. Die übrigen Ausschlüsse tragen nach ihrem Titel
keine offene Frage.
**FREMDE SEITEN SIND DATEN:** Ein Nutzerbeitrag (/23833) zitiert Ratschläge eines Sprachmodells;
er richtet sich an die Forumsleser, nicht an uns, und ist nur als Inhalt ausgewertet. Eine an uns
gerichtete Anweisung stand auf keiner gelesenen Seite.

**(a) Z2 — "CATCH HOOK" GEHÖRT ZU "WEBHOOKS BY ZAPIER", UND DAS IST EINE PREMIUM-APP.** GELESEN,
"Trigger Zap workflows from webhooks", Schritt 1: "Search for and select Webhooks by Zapier.
Click the Event dropdown menu and select either: Catch Hook […] Catch Raw Hook". GELESEN,
zapier.com/apps/webhook/integrations: die App trägt das Etikett "Premium", jede Vorlage "Premium
apps: Webhooks by Zapier"; unter "Supported triggers and actions" stehen "Catch Hook", "Catch Raw
Hook" und "Retrieve Poll" als Auslöser DIESER App. GELESEN, "What is a premium app?": "Premium
apps on Zapier are only available to users on a paid Zapier plan or while on a free trial."
GELESEN (SYMBOL), Tarif-Kasten der zwei Webhooks-Seiten: Free mit grauem X (s. oben). GELESEN,
Preisseite: "Webhooks" unter den "Key features" von Professional; Zeile "Connections via
webhooks" bei Free `formDash`, sonst `formCheck`.
UNTERSCHIED ZU "CATCH RAW HOOK", GELESEN, "Trigger Zap workflows …": Catch Hook — "The request
body will be parsed"; Catch Raw Hook — "The request body will be unparsed (max 2MB) and also
include headers", dazu der Stille-Modus (s. (e)).
FOLGE: Die ABGELEITETE Zuordnung des Architekten (Catch Hook gehört zum Werkzeug "Webhooks" mit
dem Etikett "Premium") ist durch die Doku BESTÄTIGT, gelesen, nicht gemessen.

**(b) Z1, K3.1 — FORM UND HOST DER ADRESSE.** GELESEN, "How to get started …": "When you create
a new Zap with a webhook enabled trigger, we will generate a brand new URL for your use, sort of
like this one: https://hooks.zapier.com/hooks/catch/1234567/f8f22dgg/". GELESEN, "Trigger Zap
workflows …": Beispiele `https://hooks.zapier.com/hooks/catch/123456/zbB61`; "the URL contains
the owner's Zapier ID"; "You can see the user ID in the URL of the webhook, after /catch/".
GELESEN, "Zap is not receiving webhooks": Beispiel
`https://hooks.zapier.com/hooks/catch/123456/abcde?field_name=…`.
EIN ZWEITER HOST, GELESEN, auf drei Seiten: die curl-Beispiele auf "How to get started …" und
"Zap is not receiving webhooks" rufen `https://zapier.com/hooks/catch/n/Lx2RH/`; die
zusammengefasste Adresse für mehrere Zaps lautet `https://zapier.com/hooks/catch/123456/zbB61,kzXC4,2Ajjn`
("Requests sent to this URL will trigger all three webhook URLs at once"; "Trigger Zap workflows
…").
EINE DRITTE FORM, GELESEN, "Webhooks by Zapier rate limits": "legacy webhook routes (without a
Zapier user ID in the URL)" — die Form steht dort nicht.
WANN SICH DIE ADRESSE ÄNDERT, GELESEN, "Trigger Zap workflows …": "The URL only changes if the Zap
is transferred to another user"; "How to get started …": "The Catch Hook URL is linked to the Zap
and will not change."
REGION: Eine Region in der Adresse oder je Konto steht auf KEINER gelesenen Seite; nach (l)
speichert Zapier in den USA ohne EU-Option — FOLGERUNG, NICHT GELESEN: keine Adresse je Region.
Reichweite: die voll gelesenen Seiten.
FOLGE FÜRS RELAY (FOLGERUNG): Die Adresse, die der Editor zeigt, trägt nach allen gelesenen
Beispielen `hooks.zapier.com`; EIN EXAKTER HOST GENÜGT dafür. `zapier.com` gehört NICHT in
`RELAY_HOSTS`: `allowedRelayEndpoint` prüft keinen Pfad, und der Host trüge jede Seite von
zapier.com. Eine Adresse der Form `zapier.com/hooks/catch/…` bliebe damit browser-direkt
(Owner-Entscheidung P13.6-54, zweiter Punkt). ERSETZT DIE MESSUNG NICHT — der Host ist an einer
echten Adresse abzulesen (ZM1).

**(c) K3.2, K3.3 — ZAPIER NENNT DIE ADRESSE EIN GEHEIMNIS.** GELESEN, "How to get started …",
Hinweis unter der Beispiel-Adresse: "The URL is secured by obscurity. It is almost impossible to
guess the combination of the number and code in the URL. But if you make the URL public (e.g. in
front-end JavaScript) anyone who finds it will be able to spam it and trigger your Zap. Treat it
as a password or any other secret!"
SCHUTZMITTEL: Für Catch Hook ist auf KEINER gelesenen Seite eines beschrieben. "Zap is not
receiving webhooks" sagt "If using authentication, Webhooks by Zapier only supports basic
authentication" — im Zusammenhang der Sicherheitsvorgaben der ABSENDENDEN App; ob das für den
Empfang gilt, sagt die Seite nicht. Reichweite: die voll gelesenen Seiten.
BEZUG, KEINE ENTSCHEIDUNG: Setzung P13-6 der Phase 13 ("DIE EINGETRAGENE ADRESSE IST KEIN
GEHEIMNIS") steht dieser Anbieter-Aussage entgegen — bei Make stand auf keiner gelesenen Seite
etwas dergleichen (Abschnitt "Make", Befund (h)). Nach Setzung P13.6-32 steht die Adresse eines
Formular-Ziels im `action`-Attribut des ausgelieferten Textes, auch im Relay-Weg (Setzung
P13.6-64); im Datensparmodus zusätzlich im Datenblock des Skripts.

**(d) Z3, K1.1–K1.3, K1.5 — WAS CATCH HOOK ANNIMMT.** GELESEN, "Trigger Zap workflows …": Catch
Hook "Select for GET, PUT or POST API endpoints. The request body will be parsed."; App-Seite:
"Triggers when a POST, PUT, or GET request is made to a Zapier URL." GELESEN, "How to get started
…": drei Formate — "Form-encoded first_name=Alex&last_name=Riley&age=27", JSON, XML; "Zapier
handles all of them just fine!"; verschachteltes JSON und XML wird rekursiv zerlegt, abschaltbar
mit der Kopfzeile `X-Recurse-Parse: false`, verschachtelte Schlüssel mit doppeltem Unterstrich
verbunden. GELESEN, "Troubleshoot webhooks in Zapier": "Zapier can accept payloads that are valid
XML, JSON, or URL-Encoded format only." "Zap is not receiving webhooks": "Payload data must be in
XML, JSON, or form-encoded formats."
LEERE UND UNGÜLTIGE RÜMPFE, GELESEN: "if a completely empty webhook request is sent to your Zap,
it will be ignored" ("How to get started …"); "If the Zap receives an invalid payload, it may be
ignored and the Zap may fail to trigger. […] The Zap will still respond with a Success status."
("Troubleshoot …").
ARRAYS, GELESEN, "Trigger Zap workflows …" und "Unexpected multiple runs …": ein JSON-Array auf
oberster Ebene startet den Zap je Objekt einmal.
MEHRFACH VORKOMMENDE NAMEN IM SELBEN form-urlencoded-RUMPF (Checkbox-Gruppen): STEHT AUF KEINER
GELESENEN SEITE. `multipart/form-data` und `text/plain` sind NICHT GENANNT. Reichweite: die voll
gelesenen Seiten.
FOLGE FÜRS RELAY (FOLGERUNG): Das Relay sendet `POST` mit `application/x-www-form-urlencoded` —
nach der Doku eine angenommene Form. Ein Rumpf aus `URLSearchParams(new FormData(…))` trägt die
Namen der Textfelder auch mit leerem Wert und ist damit bei einem Formular mit Textfeld nicht
"completely empty". Eine Erfolgsantwort
belegt nach dem Satz über ungültige Rümpfe NICHT, dass der Zap auslöst. ERSETZT DIE MESSUNG NICHT
(ZM2, ZM3).

**(e) Z4, K2.4, K2.5 — DIE ANTWORT BEI ERFOLG.** GELESEN, "Trigger Zap workflows …": "Zapier will
send a 200 response"; "Although it's not possible to customize this response, you can remove it
completely by using silent mode using the Catch Raw Hook trigger." — der Stille-Modus steht dort
im Reiter "Catch Hook Raw trigger" ("Add silent/ to your URL if your application needs an empty
response"). GELESEN, "How to get started …": "The webhook URLs will respond with JSON or XML";
"add /silent to the end of the URL" — dort OHNE Beschränkung auf Catch Raw Hook; die zwei Seiten
weichen voneinander ab. GELESEN, "Zap is not receiving webhooks", Beispiel einer Erfolgsantwort
auf einen Aufruf im Browser: `{"attempt":"an_id_value","id":"another_id_value","request_id":"another_id_value","status":"success"}`.
ZEITPUNKT: Dass die Antwort vor der Verarbeitung kommt, sagt keine Seite wörtlich. GELESEN, "Webhooks
by Zapier rate limits": "During periods of high webhook activity, Zapier may return a 200 status
code but delay webhook processing by several minutes." FOLGERUNG: Die 200 belegt die Annahme,
nicht die Verarbeitung — wie bei Make (Abschnitt "Make", Befund (d)).
FOLGE FÜRS RELAY (FOLGERUNG): 200 ist 2xx; `forward` meldet "zugestellt" (204). Der Rumpf wird
nicht gelesen. ERSETZT DIE MESSUNG NICHT (ZM2).

**(f) Z5, K3.4, K4.3 — ZAP AUS ODER GELÖSCHT: 404, ABER ERST NACH EINER VERZÖGERUNG.** GELESEN,
"Trigger Zap workflows …", "Webhook response behavior": "if your Zap is turned off or deleted,
Zapier will return a 404 response for any incoming webhook requests directed at a Zap. However,
there is a system update delay of up to several hours before the 404 response takes effect,
during which the URL will continue to return a 200 response. Once the Zap is turned back on, it
will resume returning a 200 response." GELESEN, "Maximize efficiency with updated webhook
behaviour" (Produkt-Update Februar 2024): vorher antworteten alle Webhook-Auslöser mit 200; jetzt
für Catch Hook und Catch Raw Hook 404 bei Zap aus oder gelöscht, "a short delay".
WIDERSPRUCH IN DER DOKU, OFFEN GEFÜHRT: "How to get started …" (Stand 2026-08-10) sagt weiterhin
"We always return a success message for all webhooks - regardless of if there is a Zap behind it
that is live or not. This is a technical limitation […] we cannot adjust this!" — gegen die zwei
Seiten darüber. Welche gilt, entscheidet erst die Messung (ZM4).
WAS MIT EINER ANFRAGE IM ZEITFENSTER GESCHIEHT: GELESEN, "How to get started …": "Even if you
don't unpause your Zap, we still track the payloads we get to make it easier for you to debug";
"Troubleshoot …": "Webhook triggers will display the three most recent webhooks sent to the URL
within the past hour." Ob eine solche Anfrage nach dem Einschalten verarbeitet wird, steht auf
KEINER gelesenen Seite. Reichweite: die voll gelesenen Seiten.
EINE NIE VERGEBENE ODER FALSCH ABGESCHRIEBENE KENNUNG: Der Status steht auf KEINER gelesenen Seite.
WEITERGABE DES ZAPS: Die Adresse ändert sich (s. (b)); "Otherwise, the Zap won't trigger" — der
Status unter der alten Adresse steht dort nicht.
FOLGE FÜRS RELAY (FOLGERUNG): 404 ergibt "nicht zugestellt" (502) — der Besucher sieht die
Meldung statt der Danke-Seite. IM ZEITFENSTER NACH DEM AUSSCHALTEN (bis zu "several hours") meldet
das Relay "zugestellt", obwohl kein Zap läuft; ob der Lead dann verloren ist, ist offen.
→ VORBEHALT: GEMESSEN (z) bis (ad), 2026-10-02 — der Widerspruch ist für die gemessenen Fälle
entschieden (erst 200, dann 404; Fenster in (ac)); die Anfrage im Fenster wird NICHT nachgeholt,
der Lead ist verloren; die falsch abgeschriebene Kennung: (ab).

**(g) Z5, K4.4 — KONTO OHNE PREMIUM, ERSCHÖPFTES KONTINGENT.** GELESEN, "How to troubleshoot held
Zap or step runs": ein Lauf wird "held", wenn "the account reached the task limit for its plan or
used a premium app that is not available in your Zapier plan"; Abhilfe "Upgrade your Zapier
plan, then replay your held Zap run." GELESEN, "What's included in Zapier's Free plan?": 100
Tasks im Monat, zwei Schritte je Zap; nach dem 14-Tage-Test "these features will no longer be
available".
WELCHEN STATUS DIE ADRESSE IN DIESEN FÄLLEN ANTWORTET, STEHT AUF KEINER GELESENEN SEITE; ebenso
nicht, wie lange ein gehaltener Lauf aufbewahrt wird. Reichweite: die voll gelesenen Seiten.
NUTZERBEITRAG, community.zapier.com/…/15275 (2022-04-20): ein Zap mit Webhooks lief drei Tage
(Test) und hörte dann auf; Antwort eines Partners: "Webhooks have been a Premium Zap requiring a
paid plan."
FOLGE FÜRS RELAY (FOLGERUNG): Antwortet die Adresse dann weiter mit 200, meldet das Relay
"zugestellt", und der Lead liegt als gehaltener Lauf beim Betreiber — Verbleib ungelesen. Das
fällt in den Test-Monat des gebündelten Live-Tests: an dessen Ende ist er zu messen (ZM5).
→ NACHGETRAGEN 2026-10-02: ZM5 ist GELESEN, nicht gemessen ((af)) — der Downgrade pausiert Zaps
mit Premium-Funktionen; gehaltene Läufe bei erschöpftem Kontingent bleiben ungemessen.

**(h) Z5, Z6, K4.1 — RATENLIMITS UND ÜBERLAST.** GELESEN, "Webhooks by Zapier rate limits": "You
will see a 429 status code if you exceed these limits: 20,000 requests every 5 minutes per user.
1,000 requests every 5 minutes per Zap in legacy webhook routes (without a Zapier user ID in the
URL)."; bei hoher Last 200 mit Verzögerung (s. (e)); "Retry delivery on any step that does not
have a 200 status code from Zapier."
FOLGE FÜRS RELAY (FOLGERUNG): 429 ergibt "nicht zugestellt"; das Relay wiederholt nie (Setzung
P13.6-22), der Besucher kann erneut absenden. Die Ratenbegrenzung des Relays (120 je 60 s je
Projekt, Setzung P13.6-75, E3) liegt, auf 5 Minuten gerechnet, bei 600 je Projekt — unter der
Grenze je Zapier-Nutzer, sofern ein Projekt allein auf einen Nutzer sendet. GERECHNET, NICHT
GEMESSEN.

**(i) Z5 — EIN 3xx VON CATCH HOOK: AUF KEINER GELESENEN SEITE.** Die Antwort ist nach (e) nicht
anpassbar ("not possible to customize this response"); einzige Variante ist der Stille-Modus.
GELESEN, "Troubleshoot …", "Can I set up redirects?": "Zapier cannot set up 301 or 302 redirects
to a different URL and deliver/retrieve payloads from the new address. Doing so will result in a
failure." — nach dem Wortlaut über Weiterleitungen, denen ZAPIER folgen müsste, nicht über eine
Antwort von Catch Hook. Reichweite: die voll gelesenen Seiten.
FOLGE FÜRS RELAY (FOLGERUNG): Die Regel "3xx = zugestellt, nie folgen" (Setzung P13.6-59, Q8)
stützt sich auf Make (Abschnitt "Make", Befund (e)); für Zapier liefert die Doku keinen Fall, in
dem sie greift. ERSETZT DIE MESSUNG NICHT (ZM4).
→ NACHGETRAGEN 2026-10-02: In den Antworten von ZM4 kam KEIN 3xx vor, nur 200 und 404 ((ac)).

**(j) Z6, K1.4 — GRÖSSE.** GELESEN, "Trigger Zap workflows …", "Limitations": "The maximum webhook
payload size is 10MB for triggers and 2MB for Catch Raw Hook." "Troubleshoot …": "Any payloads
that exceed this limit with receive a 413 status code."
FOLGE FÜRS RELAY (FOLGERUNG): Der eingehende Rumpf ist auf 64 KiB begrenzt
(`RELAY_MAX_BODY_BYTES`); die Grenze von Zapier greift davor nie.

**(k) Z7, K5.1, K5.2, K5.4 — WAS ZAPIER AUFBEWAHRT.** GELESEN, zapier.com/legal/data-retention-deletion,
Tabelle "Zap Workflows": "Zap Content (content transferred in and out of Zap workflows) — 7 days
in logs. 29-69 days in your Zapier account. If you subscribe to the Company or Enterprise plan,
you can set a shorter retention period in your Zapier account. Up to 4 months in backups. Zap
Content transferred when you test a Zap is stored until you delete the Zap." Ebenso für "Zap
Runs" (Metadaten), dazu "Zap Runs are also stored in Zapier's non-production database for internal
Zapier product analytics purposes." GELESEN, "Data Privacy Overview": die Löschung jeweils am
ersten Montag des Monats erklärt die Spanne 29–69 Tage. GELESEN, "View and manage your Zap
history": "Zapier can only guarantee a maximum of 60 days of Zap run data in your Zap history";
dort löschbar. GELESEN, "Customize data retention in Zapier": 7–30 Tage einstellbar; Symbole: nur
Enterprise (die Rechtsseite nennt "Company or Enterprise"; die zwei Seiten weichen ab).
WAS VON EINER EINGEHENDEN ANFRAGE GESPEICHERT WIRD (Kopfzeilen, Query, Adresse des Aufrufers):
Für Catch Hook steht es auf KEINER gelesenen Seite; Catch Raw Hook "includes headers" (s. (a)).
FOLGERUNG: Die Formularwerte liegen nach der Zustellung als "Zap Content" beim Betreiber-Konto —
mindestens 29 Tage, in Sicherungen bis zu vier Monate, als Testdaten bis zur Löschung des Zaps.
Die Transit-Zusage (Owner-Entscheidung P13.6-16) gilt UNSEREM Server; sie sagt über den Empfänger
nichts.

**(l) Z7, K5.3 — DATENSTANDORT: USA, KEINE EU-OPTION.** GELESEN, "Data Privacy Overview": "Zapier
hosts data in AWS servers located in the United States, including customers' personal data and
the data that is processed on behalf of customers." — "Is there an option to have my data stored
only within the EU? Zapier does not support this option." Übermittlung über das EU-U.S. Data
Privacy Framework. GELESEN (gezielt), "Subprocessors": "Amazon Web Services (AWS) — Cloud service
and artificial intelligence provider — USA".
ZUM VERGLEICH, KEINE BEWERTUNG: Make bietet je Organisation eine EU-Region (Abschnitt "Make",
Befund (p)).

**(m) Z7 — AVV / DPA.** GELESEN, "Data Privacy Overview": Für "Customer Content" ist der Kunde
"data controller", Zapier "data processor"; "Zapier can't sign DPAs from other companies"; der
DPA enthält Standardvertragsklauseln. GELESEN (gezielt), "Data Processing Addendum": "Because
Zapier's Terms of Service already incorporate Zapier's Data Processing Addendum ("DPA"), you do
not need to sign a separate copy"; "effective as of August 27, 2026"; Unterauftragsverarbeiter
über die Liste, Änderung mit "fourteen (14) days' advance written notice"; Übermittlung in die USA
über das Data Privacy Framework, ersatzweise SCC.
BEZUG, KEINE ENTSCHEIDUNG, KEINE RECHTLICHE BEWERTUNG: Owner-Entscheidung P13.6-18 der Phase 13.6
(Kunden-AVV vor dem ersten fremden Nutzer) — dieser DPA ist einer zwischen ZAPIER UND DEM
BETREIBER; unseren Kunden-AVV ersetzt er nicht (FOLGERUNG).

**(n) Z8, K2.1–K2.3 — AUFRUF AUS DEM BROWSER, DATENSPARMODUS.** GELESEN, "Troubleshoot …", zweimal
fast gleichlautend: "Request header field Content-Type is not allowed by Access-Control-Allow-Headers
in preflight response. This happens when trying to send data to the Zapier webhooks from inside a
web browser and altering the Content-Type header during the process. […] To fix this, do not set
a custom Content-Type header in the request." Welche CORS-Kopfzeilen die Antwort trägt, ob ein
`OPTIONS` beantwortet wird und ob Status und Rumpf aus fremdem Ursprung lesbar sind, steht auf
KEINER gelesenen Seite; `no-cors` kommt nicht vor. Reichweite: die voll gelesenen Seiten und die
dritte Websuche oben.
NUTZERBEITRAG, community.zapier.com/…/23833 (2023-05-12): ein `fetch` mit `Content-Type:
application/json` an `hooks.zapier.com/hooks/catch/…` scheiterte am Preflight mit derselben
Meldung. NUTZERBEITRAG, …/6837 (2020-12-02): eine Frage nach CORS-Kopfzeilen für Webhooks-Auslöser,
ohne Antwort zur Sache.
FOLGERUNG, NICHT GELESEN, NICHT GEMESSEN: Der Datensparmodus sendet einen Rumpf aus
`URLSearchParams` ohne eigene Kopfzeile — nach der Fetch-Spezifikation (hier nicht gelesen) eine
einfache Anfrage ohne Preflight, genau die Form, zu der die Doku rät. Ob Catch Hook sie im Modus
`no-cors` annimmt, ist UNGEKLÄRT (ZM6); die Antwort wäre für das Skript ohnehin `opaque`.
BEZUG: (c) — im Datensparmodus steht die Adresse im ausgelieferten Text, also genau "in front-end
JavaScript".

**(o) K6.1, K6.2 — NACHWEIS FÜR DEN BETREIBER.** GELESEN, "Trigger Zap workflows …", Schritt 4:
"Test trigger" im Reiter "Test"; "Troubleshoot …": die drei jüngsten Anfragen der letzten Stunde.
GELESEN, "View and manage your Zap history": Liste der Zap-Läufe mit Status, je Schritt "data that
was received and sent by the step"; bis 60 Tage garantiert. GELESEN, "Zap is not receiving
webhooks": Aufruf der Adresse im Browser mit Query als Erkennungsaufruf, Antwort wie in (e).

**(p) K4.2, K4.5, K4.6, K7.1 — REST.** K4.2: Eine Warteschlange mit Grösse ist auf KEINER
gelesenen Seite beschrieben; nur die verzögerte Verarbeitung (e). K4.5: Das Verhalten bei einem
Ausfall von Zapier steht auf keiner gelesenen Seite; "Retry delivery on any step that does not
have a 200 status code" (h). K4.6: 200 trotz späteren Verlusts — ungültiger Rumpf (d), Zeitfenster
nach dem Ausschalten (f), gehaltener Lauf (g, Status ungelesen). K7.1: MESSFRAGE (ZM7). Reichweite:
die voll gelesenen Seiten.
→ NACHGETRAGEN 2026-10-02: K4.6 — Zeitfenster gemessen ((z) bis (ac)); K7.1 — ZM7 gemessen ((ae)).

**ABGLEICH MIT DEM VORLÄUFIGEN FRAGENKATALOG (Z9)** — je Frage: BEANTWORTET (gelesen, ersetzt die
Messung nicht) · TEILWEISE · UNBEANTWORTET · NICHT ANWENDBAR.
- K1.1 BEANTWORTET (d) · K1.2 TEILWEISE (d: form-urlencoded, JSON, XML; `multipart/form-data` und
  `text/plain` nicht genannt) · K1.3 TEILWEISE (d: Verschachtelung, Arrays; mehrfache Namen und
  Query plus Rumpf nicht genannt) · K1.4 BEANTWORTET (j) · K1.5 TEILWEISE (d: ungültig →
  ignoriert, trotzdem Erfolg; eine unerwartete Feldmenge wird nach keiner Seite abgewiesen).
- K2.1 UNBEANTWORTET (n) · K2.2 UNBEANTWORTET (n; nur der gescheiterte Preflight bei JSON) · K2.3
  UNBEANTWORTET (n) · K2.4 BEANTWORTET (e: 200, JSON oder XML, nicht anpassbar, Stille-Modus) ·
  K2.5 TEILWEISE (e: 200 bei verzögerter Verarbeitung).
- K3.1 BEANTWORTET (b) · K3.2 BEANTWORTET (c: ja, "Treat it as a password") · K3.3 UNBEANTWORTET
  für Catch Hook (c) · K3.4 BEANTWORTET (f, b: Zap aus/gelöscht, Weitergabe; unbekannte Kennung
  offen).
- K4.1 BEANTWORTET (h) · K4.2 UNBEANTWORTET (p) · K4.3 TEILWEISE (f: Status ja, Verbleib nein) ·
  K4.4 TEILWEISE (g: Lauf gehalten; Status nein) · K4.5 UNBEANTWORTET (p) · K4.6 BEANTWORTET (p).
- K5.1 TEILWEISE (k: Zap Content; Kopfzeilen bei Catch Hook offen) · K5.2 BEANTWORTET (k) · K5.3
  BEANTWORTET (l: USA, nicht wählbar) · K5.4 BEANTWORTET (k: kürzer nur Enterprise bzw. Company;
  Löschen im Zap-Verlauf).
- K6.1 BEANTWORTET (o) · K6.2 BEANTWORTET (o).
- K7.1 UNBEANTWORTET — MESSFRAGE (ZM7).
  → NACHGETRAGEN 2026-10-02: K3.4, K4.3, K4.4 und K7.1 — s. "NACHTRAG ZUM KATALOG-ABGLEICH VOM
  2026-09-30" unter "Messung 2026-10-01 bis 2026-10-02".
- K8.1 bis K14.3 (Erweiterung für E-Mail-Anbieter) NICHT ANWENDBAR: Zapier ist eine generische
  Webhook-Adresse, kein ESP-Formular-Endpunkt; jede dieser Fragen setzt einen solchen voraus.

### Messkandidaten Zapier (aus der Lesung vom 2026-09-30)

Keiner gemessen; die Liste entscheidet nicht, welcher gemessen wird. VORAUSSETZUNG FÜR ALLE: ein
Zapier-Konto mit Webhooks (Test-Monat oder bezahlter Tarif, (a), (g)) — nach Owner-Entscheidung
P13.6-90 der Phase 13.6 gebündelt vor dem Launch.
- ZM1 — Host und Form einer echten Catch-Hook-Adresse im Konto ablesen. (Z1, K3.1; zu (b))
- ZM2 — `POST` mit `application/x-www-form-urlencoded`, wie das Relay ihn sendet (erst curl mit
  fremdem `Origin`, dann über das Relay einer Testseite): Status, Kopfzeilen, Rumpf, Zeit; kommt
  der Lauf an, sind die Felder einzeln abgebildet? (Z3, Z4, K1, K2.4, K2.5; zu (d), (e))
- ZM3 — mehrfach vorkommender Name im selben Rumpf (Checkbox-Gruppe). (K1.3; zu (d))
- ZM4 — Zap AUS: Status sofort und nach mehreren Stunden; Zap gelöscht; erfundene Kennung auf
  `hooks.zapier.com`; kommt irgendwo ein 3xx? Verbleib einer Anfrage im Zeitfenster. (Z5, K3.4,
  K4.3; zu (f), (i))
- ZM5 — nach dem Ende des Test-Monats bzw. im Free-Konto: Status und Verbleib. (Z5, K4.4; zu (g))
- ZM6 — CORS-Kopfzeilen der Standardantwort und der 404; derselbe Aufruf im Modus `no-cors` von
  einer Seite unter publayer.net (Datensparmodus). (Z8, K2.1–K2.3; zu (n))
- ZM7 — Erfassen gängige Filterlisten `hooks.zapier.com`? Im Browser für einen Blocker. (K7.1;
  zu (p))

### EINORDNUNG Zapier (Befund, keine Entscheidung)

NACH DER DOKU PASST DIE FORM: Catch Hook nimmt `POST` mit `application/x-www-form-urlencoded` an
((d)), antwortet bei Annahme mit 200 ((e)) und bei ausgeschaltetem oder gelöschtem Zap mit 404
((f)); ein 3xx ist nicht beschrieben ((i)); die Adresse liegt nach allen Beispielen auf dem festen
Host `hooks.zapier.com` ((b)). Keine gelesene Seite beschreibt Weiterleitungen oder Hosts je
Region.
DREI BEFUNDE STEHEN DANEBEN: (1) Zapier rät, die Adresse wie ein Passwort zu behandeln ((c)) —
BEZUG Setzungen P13-6 der Phase 13 und P13.6-32 der Phase 13.6. (2) Im Zeitfenster nach dem
Ausschalten eines Zaps antwortet die Adresse bis zu mehreren Stunden weiter mit 200 ((f)); die
Doku widerspricht sich zudem an dieser Stelle.
→ VORBEHALT zu (2): GEMESSEN 2026-10-02, (z) bis (ac) — Fenster ≤ ~63 min (aus) bzw. ≤ ~2 h 25 min
(gelöscht), Anfragen darin werden nicht nachgeholt; der Widerspruch der Doku ist für die
gemessenen Fälle entschieden. (3) Die Daten liegen in den USA, ohne EU-Option
((l)); der DPA gilt zwischen Zapier und dem Betreiber ((m)). Webhooks sind eine Premium-App ((a)).

### Messung 2026-10-01 (Owner, Phase 13.6, Scheibe "Zapier ins Relay", Messkandidaten ZM1–ZM3, ZM6, ZM2b)

**PROVENIENZ:** GEMESSEN, OWNER, live, 2026-10-01, im bezahlten Zapier-Monat. Phase 0 am alten
Code vor der Aufnahme in die Host-Liste: docs/claude-history/phase-13.6-formular-relay.md, Vermerk P13.6-102 der Phase
13.6; Phase 1 nach Bau-Commit `93230df`: ebenda, Vermerk P13.6-103. Instrument für (r) bis (u):
curl 8.14.1, Git Bash, schannel, ein urlencoded-POST wie der des Relays (Rumpf mit
`interesse=kurs&interesse=beratung`, fremder `Origin`, je ein eigener `probe`-Wert); für (v) und
(x): Chrome 154 und das Vercel-Dashboard. Webhook-Adressen stehen nur gekürzt in dieser Datei.
**ZEITANGABEN:** Maßgeblich ist der `Date`-Kopf der Antworten (2026-10-01, 06:30:42 bis 06:30:44
GMT); Angaben aus Zapiers Oberfläche sind als OBERFLÄCHENANGABE gekennzeichnet (s. (w)).
**OFFEN:** ZM4, ZM5, ZM7 — docs/claude-history/phase-13.6-formular-relay.md, Arbeit P13.6-104 der Phase 13.6. Die Liste
"Messkandidaten Zapier" oben bleibt als Stand vom 2026-09-30 stehen.
→ NACHGETRAGEN 2026-10-02: ZM4 und ZM7 sind gemessen, ZM5 ist gelesen — "Messung 2026-10-01 bis
2026-10-02", (y) bis (af); der Rest von ZM5 steht dort unter "MESSKANDIDATEN NACH DIESER MESSUNG".

**(q) ZM1 — DIE ADRESSE.** GEMESSEN (Owner, abgelesen im Konto): Die Catch-Hook-Adresse beginnt
mit `https://hooks.zapier.com/hooks/catch/` (Form `…/catch/<Nutzer-ID>/<Kennung>/`). Der Host
deckt sich mit (b).

**(r) ZM2a — DIE ANTWORT AUF DIE FORM DES RELAYS.** GEMESSEN (curl): 200,
`application/json` mit `attempt`, `id`, `request_id`, `status` "success"; `time_total` 0,320 s;
Kopfzeilen `x-zapier-hook-status: success`, `access-control-allow-origin: *`,
`x-rate-limit-limit: 20000` (remaining 19999). Eingang im Zap mit den Feldern einzeln.
MITLÄUFER im selben Lauf: Make (Zone eu2) 200, `text/plain` "Accepted", 0,340 s,
`make-actual-status: 200`, `access-control-allow-origin: *` — wie erwartet.
Mit (d) und (e) im Einklang: urlencoded wird angenommen, Erfolg ist 200 mit JSON.

**(s) ZM3 — MEHRFACH VORKOMMENDER NAME.** GEMESSEN (curl, Eingang im Zap): `interesse` kam als
Liste `[kurs, beratung]` an; derselbe Befund bei Make im selben Lauf. Damit beantwortet, was (d)
als "STEHT AUF KEINER GELESENEN SEITE" führte — für Catch Hook, eine Messung.

**(t) DER HOST MIT PUNKT AM ENDE.** GEMESSEN (curl, `-v`): gesendet `Host: hooks.zapier.com.` → 200,
JSON "success", 0,270 s, Eingang im Zap. Mitläufer: `Host: hook.eu2.make.com.` → 200
"Accepted", 0,315 s, Eingang bei Make. GRENZE: gemessen mit curl, NICHT mit Node-`fetch`, das das
Relay nutzt; ob dieses denselben `Host` und dieselbe SNI sendet, sagt der Lauf nicht.

**(u) CORS DER STANDARDANTWORT.** GEMESSEN (curl): Die Antwort auf einen POST mit fremdem `Origin`
trägt `access-control-allow-origin: *`. Damit teilweise beantwortet, was (n) als ungelesen
führte. GRENZE: ein `OPTIONS`/Preflight ist nicht gemessen.

**(v) ZM6 — DER BROWSER-DIREKTE AUFRUF (`no-cors`).** GEMESSEN (Owner, Chrome 154): Die
Zapier-Testseite, veröffentlicht vor der Aufnahme in die Host-Liste und damit browser-direkt,
schickte ein Formular ab → Danke-Seite, Eingang im Zap mit den Feldern (Oberflächenangabe
08:45:51). Catch Hook nimmt den Aufruf im Modus `no-cors` an; offen in (n).
Ein zweiter Lauf im Datensparmodus nach der Aufnahme (Danke-Seite, Eingang) ist gemeldet; ob
dort direkt versandt wurde, ist nicht gemeldet (Vermerk P13.6-103, Punkt (6)).

**(w) ZEITANGABEN IN ZAPIERS OBERFLÄCHE.** GEMESSEN (Owner): Die Oberfläche zeigt die Läufe mit
dem Etikett "UTC", aber um +2 h gegenüber dem `Date`-Kopf der Antwort (Lauf `zm2-z-ohne`:
Oberfläche 08:30:43, `Date`-Kopf 06:30:43 GMT). GRENZE: an EINEM Lauf verglichen.

**(x) ZM2b — ÜBER DAS RELAY EINER GEHOSTETEN SEITE.** GEMESSEN (Owner, Chrome 154, Vercel-Detail):
Nach dem Neu-Veröffentlichen der Zapier-Testseite: `POST /api/f` → 204, Danke-Seite, Eingang im
Zap mit den Feldern; Function 678 ms in `fra1`, "External APIs" 4 (GET, GET, POST, POST), keine
`[relay]`-Zeile. GRENZE: Die Ziel-Hosts der ausgehenden Anfragen sind nicht gemeldet; die
Ankunft belegt der Eingang im Zap.

### Messung 2026-10-01 bis 2026-10-02 (Owner, Messkandidaten ZM4 und ZM7; Lesung zu ZM5)

**PROVENIENZ:** GEMESSEN, OWNER, live, 2026-10-01 und 2026-10-02, im bezahlten Zapier-Monat;
übermittelt im Auftrag der Doku-Runde vom 2026-10-02, von CC NICHT gemessen. Die Messkandidaten
stammen aus Arbeit P13.6-104 der Phase 13.6 und standen am offenen Punkt "ZAPIER: DIE
MESSKANDIDATEN ZM4, ZM5 UND ZM7 …" (docs/offene-punkte.md). Instrumente: curl 8.14.1 in Git
Bash für die Messbefehle an die Adressen; Chrome für das Relay-Formular, für ZM7 und für die
Zusatz-Messung (die Chrome-Fassung ist nicht angegeben). ZM5 ist GELESEN, nicht gemessen ((af)).
Gegenstand sind zwei Zaps des Owner-Kontos, hier "A" und "B"; ihr Auslöser ist in der Angabe
nicht gesondert genannt. Webhook-Adressen stehen in dieser Datei nicht, auch nicht gekürzt —
weder Nutzer-Zahl noch Kennung.
**ZEITANGABEN:** UTC aus dem `Date`-Kopf der Antworten, Datum 2026-10-02, wo nicht anders
angegeben. Angaben mit "~" und der Zeitpunkt T0 sind OWNER-ANGABEN ohne `Date`-Kopf (Schalt- und
Löschzeitpunkte). Zapiers Oberfläche zeigte erneut +2 h gegenüber dem `Date`-Kopf, an drei
Läufen verglichen — die GRENZE von (w) ("an EINEM Lauf") ist damit auf vier Läufe erweitert.

**(y) DIE FORM DER 404 UND DER 200.** GEMESSEN (curl): Die 404 trägt `text/html`, den Rumpf
"please unsubscribe me!" (22 Bytes), KEINE `x-zapier-*`-Kopfzeile und `X-Cache: Error from
cloudfront`. Die 200 ist nach Angabe des Owners unverändert wie in (r) — auch innerhalb der
Zeitfenster aus (z) bis (ab).
FOLGERUNG: Eine 200 im Zeitfenster trägt kein Merkmal, an dem ein Leser erkennen könnte, dass
kein Zap läuft — kein Hebel für unseren Code in der Antwort. Die Folgerung reicht so weit, wie
(r) die Antwort beschreibt; ein Feld, das (r) nicht nennt, ist nicht verglichen.

**(z) ZM4 — ZAP AUS: 200 IM ZEITFENSTER, DANACH 404; NICHTS WIRD NACHGEHOLT.** GEMESSEN (curl,
Relay-Formular in Chrome, Zap-Verlauf).
- TEIL 1 — Anfragen an ausgeschaltete Zaps: A 05:43:28 → 200 "success"; B, NIE EINGESCHALTET,
  2026-10-01 16:49:18 und 2026-10-02 05:44:22 → je 200 "success". Nach dem Einschalten beider
  Zaps rund 10 min beobachtet: KEIN Lauf nachgeholt.
- TEIL 2 — A aus um 06:08 (T0). 06:08:54 A → 200 "success"; Mitläufer B 06:09:36 → 200, Lauf im
  Verlauf. Ein Relay-Formular "ZM4 T0" → `/api/f` 204, Danke-Seite. 07:11:32 A → 404; Mitläufer
  B 07:12:48 → 200, Lauf; Relay → 502, Meldung, keine Danke-Seite. Bestätigung: 07:26:19 A → 404;
  B 07:26:57 → 200, Lauf; Relay → 502.
- TEIL 3 — A wieder ein (~07:30); rund 10 min beobachtet: Weder der Messbefehl von 06:08:54 noch
  das Formular "ZM4 T0" ist nachgeholt worden. Danach antwortete A wieder mit 200 (07:39:21 und
  07:42:58, je als Mitläufer in (aa) und (ab)).
FOLGERUNG (am Code, `forward` in src/lib/relay/relay.ts): Die 204 für "ZM4 T0" heisst, dass
Zapier mit 2xx oder 3xx geantwortet hat — die Anfrage lag im Fenster. Der Lead ist verloren,
obwohl Relay und Seite "zugestellt" gemeldet haben. Anders als Make (Abschnitt "Make", Befund
(z): Szenario aus → 200 und Queue) hält Zapier nichts vor.
OFFEN AUS TEIL 1: Wie lange A vor 05:43:28 aus war, ist nicht angegeben. B antwortete als nie
eingeschalteter Zap an zwei Zeitpunkten 12 h 55 min auseinander (GERECHNET) mit 200; ob ein nie
eingeschalteter Zap je auf 404 umspringt, ist UNGEMESSEN — B wurde danach eingeschaltet. Das
Fenster für "ausgeschaltet" in (ac) ist an A gemessen, einem Zap, der vorher lief.

**(aa) ZM4 — ZAP GELÖSCHT.** GEMESSEN (curl): B gelöscht (~07:38). 07:38:39 B → 200 "success";
Mitläufer A 07:39:21 → 200. 10:03:52 B → 404; Mitläufer A 10:04:42 → 200.

**(ab) ZM4 — FALSCH ABGESCHRIEBENE UND ERFUNDENE ADRESSE.** GEMESSEN (curl): Die Kennung von A,
um EIN Zeichen geändert (das letzte): 07:43:58 → 200 "success" (Mitläufer A 07:42:58 → 200);
10:14:15 → 404. Eine frei erfundene Adresse — Nutzer-Zahl UND Kennung erfunden — → 404 sofort.
GRENZE: Die zwei Fälle unterscheiden sich in zwei Merkmalen (echte Nutzer-Zahl; Kennung nahe
einer vergebenen). Welches die anfängliche 200 trägt, trennt der Lauf nicht.
FOLGERUNG: Eine Prüfung unmittelbar nach dem Eintragen sieht bei einer falsch abgeschriebenen
Kennung bis zu rund 2 h 30 min eine 200 "success" — erkennbar ist der Fehler in dieser Zeit
allein am FEHLENDEN LAUF im Zap-Verlauf.

**(ac) ZM4 — DIE ZEITFENSTER.** GEMESSEN (OWNER, Obergrenzen, stündlich abgetastet):
ausgeschaltet ≤ ~63 min (T0 06:08 → erste 404 07:11:32) · gelöscht ≤ ~2 h 25 min (~07:38 →
10:03:52) · falsch abgeschrieben ≤ ~2 h 30 min ab der ersten Anfrage (07:43:58 → 10:14:15).
Wann genau die Antwort umspringt, ist UNGEMESSEN; die Zwischenproben sind hier nicht einzeln
angegeben, eine Untergrenze steht deshalb nicht da. Ob das Fenster beim Tippfehler mit der
ersten Anfrage oder mit etwas anderem beginnt, trennt der Lauf nicht.
In allen gemeldeten Antworten kamen nur 200 und 404 vor — KEIN 3xx (zur Frage in ZM4 und (i)).
ZUR DOKU (f): Die Seiten "Trigger Zap workflows from webhooks" ("a system update delay of up to
several hours before the 404 response takes effect … Once the Zap is turned back on, it will
resume returning a 200 response") und "Maximize efficiency …" (404 bei Zap aus oder gelöscht)
stimmen mit der Messung überein. Der Satz auf "How to get started …" ("We always return a
success message for all webhooks …") trifft für die gemessenen Fälle NICHT zu. Die in (f) offene
Frage nach dem Verbleib einer Anfrage im Fenster ist beantwortet: Sie wird nicht nachgeholt
((z), Teile 1 und 3).

**(ad) ZM4 — DIE FOLGEN FÜR RELAY UND BROWSER-DIREKTEN WEG.**
- RELAY (FOLGERUNG aus (z) bis (ac), am Code `forward`): Das Fenster ist begrenzt — gemessen für
  ausgeschaltet, gelöscht und falsch abgeschrieben; danach meldet das Relay korrekt "nicht
  zugestellt" (502, Meldung statt Danke-Seite, GEMESSEN in (z), Teil 2). Für einen nie
  eingeschalteten Zap ist kein Ende gemessen ((z), "OFFEN AUS TEIL 1").
- BROWSER-DIREKT (Datensparmodus, Adresse ausserhalb der Host-Liste, Export): Erfolg ist allein
  `r.type === "opaque"` (GELESEN AM CODE, CC, 2026-10-02, Stand `650bc17`,
  `buildFormTargetRuntime` in src/lib/form-target.ts; Setzung P13-21 der Phase 13). ZUSATZ-MESSUNG
  (GEMESSEN, OWNER, 2026-10-02, Chrome): `fetch` im Modus `no-cors` an eine erfundene
  Zapier-Adresse — Chrome protokolliert 404, das Promise wird ERFÜLLT, Typ `opaque`, mit
  uBlock Origin Lite im Modus "Vollständig" wie ohne Filterung. Anders als bei Make (Abschnitt
  "Make", Befund (ac)) ist der Typ hier gemessen. FOLGERUNG: Ein ausgeschalteter, gelöschter oder
  falsch abgeschriebener Zap ergibt im browser-direkten Weg DAUERHAFT "erreicht" und die
  Danke-Seite — im Fenster wegen der 200, danach wegen der 404, die im Modus `no-cors` ebenso
  `opaque` auflöst. Gemessen ist das allein an der erfundenen Adresse; für die 404 eines
  ausgeschalteten oder gelöschten Zaps folgt es aus derselben Form der 404 ((y)) und ist NICHT
  eigens gemessen.
- KEIN CODE-HEBEL IN DER ANTWORT: Im Fenster ist die 200 nicht von der eines laufenden Zaps zu
  unterscheiden ((y)); was in dieser Zeit ankommt, holt Zapier nicht nach ((z)).
- KANDIDAT, NICHT ENTSCHIEDEN, KEIN ZUSCHNITT: ein "Verbindung testen" beim Einrichten eines
  Formular-Ziels. BEZUG: die entfallene Scheibe 13-1b (Setzung P13-18, Entscheidung P13-65 der
  Phase 13). GRENZE, FOLGERUNG aus (ab): Ein Test, der allein den Status liest, sieht bei einer
  falsch abgeschriebenen Kennung bis zu rund 2 h 30 min eine 200; nur die Ankunft im Zap trennt
  sie von einer richtigen.

**(ae) ZM7 — UBLOCK ORIGIN LITE SPERRT `hooks.zapier.com` NICHT.** GEMESSEN (OWNER, Chrome,
2026-10-01): uBlock Origin Lite, Modus "Vollständig", Standardlisten. Vorgesehen war der Aufbau
wie N3 in Vermerk P13-22 der Phase 13; die Angabe nennt Blocker, Modus, Listen und Kontrolle.
- BLOCKER EIN: Kontrolle doubleclick → `basic`, Status 200 (gesperrt); Zapier → `opaque`,
  Status 0, Lauf `zm7-…T17:02:57.958Z` im Zap-Verlauf.
- GEGENPROBE OHNE FILTERUNG: doubleclick → `opaque`, Status 0; Zapier → `opaque`, Status 0, Lauf
  `…T17:03:39.659Z`.
- ZUSATZ 2026-10-02: die Zusatz-Messung aus (ad) — `opaque` in beiden Modi.
FOLGERUNG: Die Kontrolle unterscheidet die zwei Modi (`basic` nur mit Blocker), der Zapier-Aufruf
nicht. Unser Code wertet `basic` als "nicht erreicht" (GELESEN AM CODE, Kopfkommentar zu
`buildFormTargetRuntime`: "ein Blocker, der umleitet"); bei Zapier tritt dieser Zweig mit diesem
Blocker nicht ein. Das ist der Zapier-Fall zu (ab) und (ae) im Abschnitt "Make".
GRENZE: ein Blocker in der Standard-Konfiguration, ein Browser. Andere Blocker, andere Listen und
die Einstellungen eines Blockers sind nicht erfasst.

**(af) ZM5 — GELESEN, NICHT GEMESSEN: DER DOWNGRADE-DIALOG.** GELESEN (OWNER, Downgrade-Dialog im
Zapier-Konto, 2026-10-02; übermittelt im Auftrag der Doku-Runde, der Wortlaut nur
auszugsweise): heutiger Tarif 750 Tasks im Monat; nach dem Downgrade 100, keine Webhooks und keine
Premium-Apps; Zaps mit Premium-Funktionen "pause automatically on November 1, 2026". Ob der
Downgrade ausgeführt ist, sagt die Angabe nicht. ERSETZT DIE MESSUNG NICHT.
Im Einklang mit (g) (Free: 100 Tasks im Monat) und (a) (Webhooks sind Premium).
FOLGERUNG: Der Downgrade-Weg erzeugt einen PAUSIERTEN Zap — die Lage von ZM4 ((z): Zap aus) —
und keine gehaltenen Läufe. Ob ein von Zapier pausierter Zap sich an der Adresse verhält wie ein
vom Nutzer ausgeschalteter, ist UNGEMESSEN. Das Datum "November 1, 2026" deckt sich mit dem am
offenen Punkt "ZAPIER: DIE MESSKANDIDATEN …" ABGELEITETEN Monatsende um den 2026-10-31.
UNGEMESSEN BLEIBT: der Status und Verbleib GEHALTENER Läufe bei erschöpftem Kontingent ((g)).

**MESSKANDIDATEN NACH DIESER MESSUNG:**
- GEMESSEN: ZM4 → (y) bis (ad); ZM7 → (ae), für einen Blocker.
- GELESEN, NICHT GEMESSEN: ZM5 → (af).
- OFFEN: ZM5-Rest — (1) gehaltene Läufe bei erschöpftem Kontingent: Status der Adresse und
  Verbleib ((g)); (2) nach dem 2026-11-01 ein Messbefehl an einen von Zapier pausierten Zap,
  falls der Downgrade ausgeführt ist (optional). Aus ZM4: der genaue Umschaltzeitpunkt; das
  Verhalten eines nie eingeschalteten Zaps über 12 h 55 min hinaus.
- Die Liste "Messkandidaten Zapier" oben bleibt als Stand vom 2026-09-30 stehen.

**NACHTRAG ZUM KATALOG-ABGLEICH VOM 2026-09-30:** K3.4 — die unbekannte bzw. falsch
abgeschriebene Kennung ist gemessen ((ab)) · K4.3 — der Verbleib ist gemessen: nicht nachgeholt
((z)) · K4.4 — weiter TEILWEISE; zum Downgrade gelesen ((af)), gehaltene Läufe ungemessen · K7.1 —
gemessen für einen Blocker ((ae)).
