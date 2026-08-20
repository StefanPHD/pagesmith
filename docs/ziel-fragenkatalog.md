# ZIEL-FRAGENKATALOG — was man über ein Fan-Out-Ziel wissen muss, bevor man es baut

**WAS DIESE DATEI IST:** Die Liste der Fragen, die an JEDEM Fan-Out-Ziel zu beantworten
sind — abgeleitet aus dem, was die vier gebauten Ziele TATSÄCHLICH gebraucht haben, nicht
erfunden. Dazu ein DATIERTER Befund darüber, welche dieser Fragen je Ziel heute beantwortet
ist, welche gestellt und unbeantwortet blieb, und welche nie jemand gestellt hat.

**WAS SIE NICHT IST — zwei Abgrenzungen, und die erste ist die wichtigere:**
- **SIE TRÄGT KEINE ANTWORTEN AUF ANBIETER-FRAGEN.** Die stehen in docs/ziel-befunde.md, je
  Ziel ein Abschnitt, mit Provenienz an jeder Angabe. HIER stehen die FRAGEN und der STAND
  ihrer Beantwortung — dort die Befunde selbst. Wer hier einen Messwert einträgt, baut eine
  zweite Wahrheit, die neben dem Befund altert.
- **SIE TRÄGT KEINE ENTSCHEIDUNGEN UND KEINE EMPFEHLUNGEN.** Die stehen an der jeweiligen
  Roadmap-Zeile bzw. im Abschnitt "## Offene Punkte" in CLAUDE.md. Aus einer offenen Zelle
  folgt hier NICHTS über Dringlichkeit, Reihenfolge oder Bauwürdigkeit.

**DER AUSLÖSER — sie lädt NICHT automatisch:** Wer ein Fan-Out-Ziel zuschneidet, einen
Adapter baut oder beim Anbieter recherchiert, liest sie ZUERST — zusammen mit
docs/ziel-befunde.md. Ohne sie stellt man die Fragen neu, die schon einmal jemand gestellt
hat, und übersieht die, die noch nie jemand gestellt hat.

**DIE ZWEI TEILE HABEN VERSCHIEDENE HALTBARKEIT, UND DAS IST DER GRUND FÜR DIESEN KOPF:**
- **DER KATALOG IST DAUERHAFT.** Eine Frage altert nicht. Ein Anbieter kann sein Verhalten
  ändern — die Frage danach bleibt dieselbe. Er wird ERWEITERT, wenn ein Bau eine Frage
  aufwirft, die hier fehlt; er wird nicht umgeschrieben, weil sich eine Antwort geändert hat.
- **DIE MATRIX IST EIN DATIERTER BEFUND.** Sie beschreibt den Stand vom **2026-08-20** und
  sonst nichts. Sie ist eine MOMENTAUFNAHME und wird NICHT stillschweigend fortgeschrieben:
  Wer sie fortschreibt, DATIERT die Fortschreibung und lässt den alten Stand erkennbar.
  Wer sie undatiert ändert, macht aus einem Befund über einen Tag eine Behauptung über
  heute — und niemand kann die beiden danach noch auseinanderhalten.

**PROVENIENZ-PFLICHT, ohne Ausnahme:** Jede Matrix-Zelle mit dem Zustand BEANTWORTET nennt,
WORAUS die Antwort stammt — GEMESSEN (Aufruf gegen die Schnittstelle) · BEOBACHTET (Ablesung
an einer Oberfläche des Anbieters) · GELESEN (Anbieter-Dokumentation). Diese drei werden
NIEMALS zusammengezogen. Jede Zelle mit dem Zustand NIE GESTELLT nennt die ABGESUCHTE ACHSE:
welche Dateien, welche Suchbegriffe. Ein Nicht-Treffer ohne benannte Reichweite ist kein
Befund.

**DIE DREI ZUSTÄNDE DER MATRIX, und die Unterscheidung der letzten beiden ist der Grund für
diese Datei:**
- **BEANTWORTET** — mit Fundstelle und Provenienz.
- **NICHT GEFUNDEN** — die Frage wurde gestellt, die Antwort steht nirgends. Eine Lücke im
  WISSEN.
- **NIE GESTELLT** — im Repo findet sich kein Hinweis, dass jemand sie erwogen hat. Eine
  Lücke im DENKEN. Das ist die teurere von beiden.

**FORTSCHREIBUNG:** Eine neue Frage wird HINTEN in ihrer Gruppe angefügt und bekommt die
nächste freie Nummer; Nummern werden NIE neu vergeben, weil von aussen auf sie verwiesen
wird. Eine neue GRUPPE wird hinten angefügt. Nichts wird umsortiert. Kommt ein fünftes Ziel
dazu, bekommt die Matrix eine DATIERTE Fortschreibung — der alte Stand bleibt lesbar.

## Verzeichnis der Abschnitte

- ## Der Katalog — 41 Fragen in 9 Gruppen
- ## Die Matrix — Stand 2026-08-20
- ## Beobachtungen am Bestand (2026-08-20)

## Der Katalog — 41 Fragen in 9 Gruppen

**HERKUNFT (2026-08-20):** Die Gruppen A bis H sind ABGELEITET aus dem Bestand — aus den
vier gebauten Adaptern (src/lib/capi/meta-forward.ts, pinterest-forward.ts,
tiktok-forward.ts, linkedin-forward.ts) samt capi/token.ts, capi/config.ts und
capi/ingest.ts, aus docs/ziel-befunde.md und aus vier Phasen-Historien. Jede Frage dort hat
einen benannten Konsumenten im Code oder in einer Entscheidung; eine Frage ohne benannten
Konsumenten steht hier nicht.
**GRUPPE I IST NICHT ABGELEITET, SONDERN VOM ARCHITEKTEN ERGÄNZT** (2026-08-20) — s. den
Kopf jener Gruppe. Der Unterschied ist festgehalten, damit später niemand sie für einen
Bestands-Befund hält.

**DIE GRUPPIERUNG FOLGT DEM LEBENSWEG EINES AUFRUFS**, und das ist kein Ordnungsschema
nach Geschmack: erst hineinkommen (A), dann die Adresse kennen (B), das Konto benennen (C),
die Nutzlast bauen (D), den Besucher benennen (E), das Ereignis benennen (F), die Antwort
deuten (G), den Betrieb aushalten (H). Gruppe I steht DAVOR und ist trotzdem hinten
angefügt — s. dort. Die Reihenfolge entspricht der, in der die vier gebauten Adapter
tatsächlich entstanden sind; jede Gruppe bezeichnet einen Block, an dem beim Bau ein Halt
eintrat.

**JE FRAGE STEHEN DREI DINGE**, und ohne sie ist eine Frage nicht aufnahmefähig:
- **(b) DER GRUND** — welche Code-Stelle, welche Entscheidung oder welcher Nachweis von ihr
  abhängt, mit Symbolnamen oder Überschrift als Anker. OHNE GRUND KEINE FRAGE: Eine Frage
  ohne benannten Konsumenten wird von der nächsten Instanz zu Recht gestrichen.
- **U / 1Z** — ob sie universell ist oder aus EINEM Ziel stammt. Beides ist zulässig;
  UNENTSCHIEDEN bleibt, ob eine ziel-spezifische Frage an alle gestellt wird.
- **(c) WORAN EINE ANTWORT ZU ERKENNEN WÄRE** — reicht eine Doku-Aussage, oder verlangt die
  Frage eine Messung? Das entscheidet, was eine reine Recherche überhaupt leisten kann.

### A — ZUGANG

**A1 · Auf welchem Weg beschafft der Betreiber das Zugangsdatum, und gibt es mehr als
einen?**
(b) `getCapiConfigByTrackingKey` (`capi/token.ts`) liest EINEN Skalar; Offener Punkt "EIN
OAUTH-ZUGANG PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE" (CLAUDE.md). **U.**
(c) Doku genügt für die Aufzählung der Wege; **Messung/Beobachtung nötig** für "welcher Weg
liefert das Artefakt, das live benutzt wird" — s. docs/ziel-befunde.md, Abschnitt "LinkedIn
(Conversions API)", Teil (v).

**A2 · Welche FORM hat das Zugangsdatum — ein Skalar oder mehrere Werte nebeneinander?**
(b) `project_secrets` (`secret text not null`, Schlüssel `(project_id, target)`);
`CapiConfig.token`. **U.** (c) Doku genügt.

**A3 · Läuft es ab, und nach welcher Frist?**
(b) Offener Punkt "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN", Ursache (4)
(CLAUDE.md). **U.** (c) Doku genügt für die Frist; **Beobachtung nötig** für "gilt sie für
unser Artefakt".

**A4 · Gibt es einen Erneuerungsweg, und wer darf ihn nutzen?**
(b) die Autorisierungsschicht (Offener Punkt "EIN OAUTH-ZUGANG PASST NICHT …"). **1Z
(LinkedIn).** (c) Doku genügt für den Mechanismus; **Messung nötig** für "geht die
Erneuerung durch" — docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teil (w):
"AUSGEGEBEN IST NICHT EINGELÖST".

**A5 · Mit welchem Instrument lässt sich Gültigkeit oder Restlaufzeit prüfen?**
(b) jede Ablauf-Überwachung; docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)",
Teile (v) und (x). **U.** (c) **Messung nötig** — Teil (x) zeigt, dass ein Endpunkt
untauglich sein kann, während die Oberfläche trägt.

### B — ADRESSIERUNG

**B1 · Wie lautet die Endpunkt-Adresse?**
(b) `LINKEDIN_ENDPOINT`, `TIKTOK_ENDPOINT`, der URL-Bau in `forwardToPinterest` und
`forwardToMeta`. **U.** (c) Doku genügt.

**B2 · Verlangt der Anbieter eine Versionsangabe — wo, in welcher Form, und schaltet er
Versionen ab?**
(b) `LINKEDIN_VERSION`; `META_GRAPH_VERSION` (`capi/config.ts`). **U.** (c) Doku genügt für
die Form; **Messung nötig** für die Pflicht — Teil (r): ohne Header 400 `VERSION_MISSING`.

**B3 · In welchem Träger reist das Geheimnis — Query-String, Bearer, eigene Kopfzeile — und
mit welchem Präfix?**
(b) die `fetch`-Aufrufe aller vier Adapter; die Schwärzungs-Politik hängt daran (ist die URL
Geheimnis-Träger oder nicht). **U.** (c) Doku genügt.

**B4 · Welche weiteren Kopfzeilen sind Pflicht?**
(b) die Kopfzeilen-Objekte der vier Adapter. **U.** (c) **Messung nötig** — eine fehlende
Pflicht-Kopfzeile fällt sonst erst live auf.

### C — KENNUNG DES ZIELS

**C1 · Wie heisst die Kennung, und welche FORM hat sie (Präfix, Zeichenvorrat)?**
(b) `config.pixelId`; `resolveRuleUrn`; Offener Punkt "EIN ZIEL KANN KONFIGURIERT SEIN UND
TROTZDEM NICHT SENDEN", Ursache (1). **U.** (c) Doku genügt für die Form; **Messung nötig**
für die Ablehnung bei falschem Präfix — Teil (l).

**C2 · Wo reist die Kennung — im Pfad, im Rumpf oder in einer Kopfzeile?**
(b) `forwardToPinterest` (Pfad, deshalb `encodeURIComponent`); `payload.event_source_id`
(TikTok); `payload.conversion` (LinkedIn). **U.** (c) Doku genügt.

**C3 · Gilt EINE Kennung je Projekt, oder je Ereignistyp?**
(b) `LinkedinConfig.conversionRules` gegen `CapiConfig.pixelId`; Regel "MEHRERE KENNUNGEN JE
ZIEL BRECHEN EINEN SCHLÜSSEL (PROJEKT, ZIEL) NICHT" (docs/immer-beachten.md). **U.** (c) Doku
genügt.

**C4 · Ist die Kennung öffentlich, oder selbst ein Geheimnis?**
(b) Offener Punkt "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT",
Trigger (ii); `ProjectSettings.pixels` ist CLIENT-besessen. **U.** (c) Doku genügt.

### D — NUTZLAST

**D1 · Wie ist die Hülle aufgebaut — Wurzelschlüssel, Array oder Einzelobjekt?**
(b) `payload = { data: [serverEvent] }` (Meta, Pinterest, TikTok) gegen das flache Objekt bei
LinkedIn. **U.** (c) **Messung nötig.**

**D2 · Wie heissen die Kernfelder — Ereignisname, Zeitstempel, Ereignis-Kennung?**
(b) `serverEvent` / `eintrag` / `payload` in allen vier Adaptern. **U.** (c) **Messung
nötig** — Teil (n): die Feldnamen standen bis zum 2026-08-19 nirgends.

**D3 · Welche Zeiteinheit, und gibt es ein zulässiges Zeitfenster?**
(b) `eventTime = Math.floor(Date.now()/1000)` gegen `conversionHappenedAt = Date.now()`.
**U.** (c) Doku genügt für die Einheit; **Messung nötig** für das Fenster — Teil (s): 400 bei
100 Tagen.

**D4 · In welchem TYP reist der Wert — Zahl oder Zeichenkette — und prüft die Schnittstelle
den Typ?**
(b) `customData.value = String(...)` (Pinterest) gegen `properties.value = body.value`
(TikTok) gegen `normalizeAmount` (LinkedIn). **U.** (c) **Messung nötig** — Teil (o):
dieselbe Zahl als `number` ergibt 422.

**D5 · Welche Felder sind PFLICHT, welche optional?**
(b) der Identitäts-Riegel in `forwardToPinterest`; `conversionValue` nur, wenn beide Hälften
tragen (`forwardToLinkedin`). **U.** (c) **Messung nötig.**

**D6 · Prüft die Schnittstelle die BEDEUTUNG der Werte — Währungscode, Wertebereich?**
(b) `normalizeAmount` (LinkedIn); der Kommentar "KEINE RUNDUNG" in `forwardToPinterest`.
**U.** (c) **Messung nötig** — Teile (e) und (j): erfundener Währungscode und
"999.999.999.999" ergeben beide 201.

### E — IDENTITÄT DES BESUCHERS

**E1 · Welche Identitäts-Merkmale nimmt der Anbieter an — vollständige Liste?**
(b) `LINKEDIN_ID_TYPE`; `userData` in `forwardToMeta` und `forwardToPinterest`;
`eintrag.user` (TikTok). **U.** (c) Doku genügt für die Liste; **Messung nötig JE SYMBOL** —
Teil (i): von fünf gelesenen sind ZWEI gemessen.

**E2 · Roh oder gehasht — und mit welchem Verfahren?**
(b) der Kommentar "Roh, NICHT gehasht — so verlangt es die Doku" (Pinterest, TikTok); Offener
Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (SHA-256 im Browser). **U.** (c) Doku
genügt.

**E3 · Ist mindestens ein Identitäts-Merkmal PFLICHT?**
(b) die drei Riegel `if (!clientIp || !userAgent) return;` bzw. `if (!clientIp)`. **U.**
(c) **Messung nötig** — bei TikTok ist gemessen, dass der Anbieter es NICHT verlangt, der
Riegel also eine EIGENE Entscheidung ist.

**E4 · Gibt es ein Feld für den User-Agent?**
(b) `forwardToLinkedin` nimmt ihn gar nicht entgegen; der `linkedin`-Eintrag in
`FORWARDER_BY_TARGET` reicht ein Argument weniger. **1Z (LinkedIn), universell prüfbar.**
(c) **Messung nötig.**

### F — EREIGNIS-VOKABULAR

**F1 · Ist der Ereignisname frei, oder ein Enum?**
(b) `EVENT_MAP` (Pinterest, TikTok); die Begründung an `isForwardable`. **U.** (c) Doku
genügt.

**F2 · Müssen eigene Namen beim Anbieter registriert werden, und gibt es einen Deckel je
Konto?**
(b) `pinterestEventName` — das Durchreichen ist dort als Entscheidung begründet. **1Z
(Pinterest).** (c) **Messung nötig** — der Kommentar sagt ausdrücklich: "Eine Messung an
unserem Konto gibt es nicht."

**F3 · Wie heissen die Standard-Namen, und weicht die Benennung von unserer ab?**
(b) `EVENT_MAP` (Pinterest: `Purchase → checkout`); der Kreuzvergleich in
`tiktok-forward.test.ts` gegen `META_STANDARD_EVENTS`. **U.** (c) **Messung nötig.**

### G — ANTWORT UND FEHLER

**G1 · Was ist der Erfolgs-Statuscode — und genügt der Status als Erfolgskriterium?**
(b) `evaluateSuccessBody` (Pinterest); `TIKTOK_OK_CODE`; der 201-Zweig in
`forwardToLinkedin`. **U.** (c) **Messung nötig** — Pinterest und TikTok melden eine
Ablehnung MIT Erfolgsstatus.

**G2 · Welche Rumpfformen kennt die Fehlerantwort, und welche Felder tragen sie?**
(b) `describeMetaError`, `describeErrorBody`, `describeRejection`, `describeLinkedinError`.
**U.** (c) **Messung nötig.**

**G3 · Trennt der Statuscode die Fehlerklassen, oder braucht es ein Feld?**
(b) der Kopf von tiktok-forward.ts, Unterschied 4 ("zwei Codes teilen sich HTTP 401"); der
400-Zweig mit `body.code` in `describeLinkedinError`. **U.** (c) **Messung nötig.**

**G4 · Spiegelt die Antwort eigene Eingaben zurück (Echo-Achse)?**
(b) `redactOpaque` (`lib/redact.ts`) und die Feld-Politiken aller vier Adapter; Manifest
Tier 1 "META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK". **U.** (c) **Messung nötig.**

**G5 · Trägt die Erfolgsantwort einen Rückkanal — Ereignis-Kennung, Vorgangsbezeichner?**
(b) `asTraceId` (die einzige Schwärzungs-Ausnahme im Repo); docs/ziel-befunde.md, Abschnitt
"LinkedIn (Conversions API)", Teil (d). **U.** (c) **Messung nötig.**

### H — BETRIEB

**H1 · Gibt es einen Testmodus — wie wird er übergeben, und wechselt sein Wert?**
(b) `META_TEST_EVENT_CODE`; `testModeQuery` (Pinterest, Query-String); `testEventCode`
(TikTok, Nutzlast); Roadmap-Zeile "Phase 11.3". **U.** (c) Doku genügt für den Träger;
**Messung nötig** für "wechselt pro Sitzung".

**H2 · Wie dedupliziert der Anbieter, und was setzt er dafür voraus?**
(b) die Dedup-Zusage im Offenen Punkt "BETREIBER-DOKUMENTATION FEHLT — ZWEI PUNKTE",
Punkt (2); `payload.eventId` in `forwardToLinkedin`. **U.** (c) Doku genügt für die
Voraussetzungen; **Messung nötig** für die Wirkung — Teil (t): erst nach Stunden ablesbar.

**H3 · Gibt es Mengenbeschränkungen — Rate, Kontingent, 429 — und ein erwartetes
Wiederholungsverhalten?**
(b) `Promise.allSettled` im Fan-Out (`handleIngest`); die A-Regel "/API/E-SCHLANKHEIT"
(CLAUDE.md). **U.** (c) Doku genügt.

**H4 · Nimmt der Endpunkt MEHRERE Ereignisse je Aufruf an?**
(b) `payload = { data: [ … ] }` — alle vier senden genau EINES; `evaluateSuccessBody`
behandelt mehr als einen Eintrag als Fehlschlag. **U.** (c) **Messung nötig.**

**H5 · Welches Instrument taugt für einen Live-Test, und welches täuscht?**
(b) Manifest "KILL-SWITCH — LEKTION" (Verifikation über die NACHGELAGERTE Wirkung);
docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teile (h), (k), (q), (t).
**U.** (c) **Messung nötig.**

### I — VORAUSSETZUNGEN BEIM ANBIETER, DIE KEIN AUFRUF SIND

**HERKUNFT DIESER GRUPPE — SIE IST NICHT ABGELEITET WIE A BIS H:** I1 bis I4 sind am
2026-08-20 VOM ARCHITEKTEN ERGÄNZT worden, nicht aus dem Bestand gewonnen. Das steht hier,
damit später niemand sie für einen Bestands-Befund hält. Ihre GRÜNDE sind trotzdem am
Bestand belegt (s. je Frage); nur ihr ANLASS ist ein anderer.
**I5 IST DIE AUSNAHME:** Sie stammt aus der Nachlese von
docs/claude-history/phase-7-hosting.md (2026-08-20) und ist damit ABGELEITET wie A bis H.

**WAS DIESE GRUPPE VON ALLEN ANDEREN TRENNT, und das ist ihr ganzer Zweck:** A bis H fragen
nach dem AUFRUF — Adresse, Felder, Antwort. Diese Gruppe fragt nach dem, was vorher im KONTO
erledigt sein muss, damit der Aufruf überhaupt etwas bewirkt. Eine Lücke hier ist am Code
nicht sichtbar und am Statuscode oft auch nicht: Der Aufruf kann tadellos sein und trotzdem
ins Leere gehen.

**I1 · Muss beim Anbieter ein PRODUKT freigegeben oder beantragt werden, bevor die
Schnittstelle antwortet?**
(b) docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teil (d) — der
Data-Partner-Weg steht "nur nach Freigabeverfahren" offen; Teil (a) — ein verstrichenes
Qualifikationsfenster schliesst einen Weg dauerhaft. **U.** (c) Doku genügt für die Existenz
des Verfahrens; **Antrag nötig** für sein Ergebnis — der Ausgang steht in keiner
Dokumentation.

**I2 · Verlangt der Anbieter die Annahme von VERTRAGS- oder EINWILLIGUNGS-BEDINGUNGEN im
Konto des Betreibers?**
(b) Offener Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (CLAUDE.md) — die
Rechtsgrundlage liegt beim Kunden, und die Pflicht wird VERTRAGLICH zugewiesen; die
Zuweisung setzt voraus, dass man die Bedingungen des Anbieters kennt. **U.** (c) Doku
genügt.

**I3 · Ist das Merkmal, das wir brauchen, FREIGESCHALTET — oder nur einer Allowlist
zugänglich, und wie beantragt man das?**
(b) docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teil (e) — die
gewählte Gestalt ist "NUR für freigeschaltete Konten"; Teil (c) — das fachlich gesuchte
Merkmal fällt unter dieselbe Sperre wie der Alt-Weg. **U.** (c) Doku genügt für die
Bedingung; **Antrag nötig** für die Erreichbarkeit.

**I4 · Welche ROLLE oder Berechtigungsstufe muss die anmeldende Identität im Konto des
Kunden haben?**
(b) **KEIN BELEG IM REPO — und das steht hier ausdrücklich statt eines erfundenen Ankers.**
Die nächstliegende Fundstelle ist docs/ziel-befunde.md, Abschnitt "Google (Google Ads
Conversions · GA4)", Teil (d): das Advertiser-Modell verlangt, dass "die anmeldende
Identität Nutzer im Werbekonto des Kunden" ist — WELCHE Rolle das sein muss, steht dort
nicht. **U.** (c) Doku genügt.

**I5 · Verlangt der Anbieter, dass die AUSLIEFERNDE DOMAIN im Konto des Betreibers
freigegeben ist?**
(b) docs/claude-history/phase-7-hosting.md, Scheibe 7c-2a, "NEBENFUND AUFGELÖST" und
"SUPPORT-/TROUBLESHOOTING-HINWEIS (Zukunft)" — Metas Traffic-Permissions-Allow-List; ohne
Eintrag der Serving-Domain verwarf der Anbieter das BROWSER-Ereignis lautlos, während der
server-seitige Weg durchlief. **U.** (c) **Messung nötig** — die Ursache war weder am Code
noch an einem Statuscode erkennbar; sichtbar wurde sie allein in der Browser-Konsole.
**DIE ACHSE, DIE DIESE FRAGE EIGENS BRAUCHT:** Sie betrifft den BROWSER-Pfad, nicht den
Server-Pfad. Für ein reines Server-Fan-Out-Ziel kann sie folgenlos sein und für ein
hybrides Ziel trotzdem die halbe Messung zerstören.

## Die Matrix — Stand 2026-08-20

**DIESER ABSCHNITT IST EIN BEFUND ÜBER EINEN TAG.** Er beschreibt den Stand vom 2026-08-20
und wird nicht stillschweigend fortgeschrieben — s. den Kopf dieser Datei.

**HERKUNFT:** read-only-Aufklärung am Repo (2026-08-20): die sieben Dateien unter
src/lib/capi/ vollständig gelesen, docs/ziel-befunde.md vollständig, docs/immer-beachten.md
vollständig, CLAUDE.md vollständig, dazu gezielt vier Phasen-Historien
(phase-6-capi.md, phase-11-multi-tracking.md, phase-11-multi-tracking-aktiver-stand.md,
phase-11.1-linkedin.md) und in der Nachlese phase-7-hosting.md. KEIN Zugriff auf eine
Anbieter-Seite. **In dieser Runde ist KEINE Anbieter-Frage neu erhoben worden.**

**KÜRZEL:** `gem` = gemessen · `beo` = beobachtet · `gel` = gelesen. Fundstellen ohne
Abschnittsangabe meinen docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)".
**ABGESUCHTE ACHSE für jedes "NIE GESTELLT"**, soweit nicht eigens genannt: die oben
genannten Dateien vollständig, plus formale Suchen über `src/` und `docs/` nach den je Frage
genannten Begriffen. Ein Nicht-Treffer auf diesen Achsen ist kein Beweis der Abwesenheit.

**A1 Beschaffungsweg** — meta: BEANTWORTET (Regel "CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN
PAAR", gel / real aufgetreten) · pinterest: NICHT GEFUNDEN · tiktok: BEANTWORTET
(Adapter-Kopf: "eigenes Werbekonto", beo) · linkedin: BEANTWORTET (Teile (v)/(w), beo — ZWEI
Wege, und der live benutzte ist NICHT der der Anwendung).

**A2 Form (Skalar/mehrwertig)** — meta: BEANTWORTET (ein Skalar genügt; live bewiesen
Phase 6/7) · pinterest: BEANTWORTET (`PinterestConfig.token`, Skalar, live) · tiktok:
BEANTWORTET (`CapiConfig.token`, live) · linkedin: BEANTWORTET (Skalar gebaut; für den
App-Weg mehrwertig — Offener Punkt "EIN OAUTH-ZUGANG PASST NICHT …", beo).

**A3 Ablauf/Frist** — meta: NICHT GEFUNDEN (die Frage steht an Ursache (4), die Antwort
nirgends) · pinterest: NICHT GEFUNDEN · tiktok: NICHT GEFUNDEN · linkedin: BEANTWORTET, aber
ZWEISTUFIG: App-Weg 60 Tage (Teil (w), beo); der live benutzte Campaign-Manager-Weg "läuft
nicht ab" (Teil (v), gel — ausdrücklich nicht belegt).

**A4 Erneuerungsweg** — meta: NIE GESTELLT · pinterest: NIE GESTELLT · tiktok: NIE GESTELLT ·
linkedin: BEANTWORTET (Teil (w): `grant_type=refresh_token`, Refresh-Token 365 Tage, gel; die
AUSGABE des Refresh-Tokens beo).
**ACHSE für die drei "nie gestellt":** Suche über `src/` und `docs/` nach `refresh`,
`erneuer`, `grant_type` — Treffer ausschliesslich im LinkedIn-Kontext.

**A5 Prüfinstrument für Gültigkeit** — meta: BEANTWORTET (Symptom `code=190` /
`OAuthException` / "Bad signature", Manifest-Regel, real aufgetreten) · pinterest:
BEANTWORTET (Handmessung 2026-08-07: Fehler-Rumpf bei ungültigem Geheimnis, gem) · tiktok:
BEANTWORTET (HTTP 401 mit zwei Codes, gem) · linkedin: BEANTWORTET mit Einschränkung
(Teil (x): Endpunkt untauglich, Oberflächen-Werkzeug tauglich — gem/beo).

**B1 Endpunkt-Adresse** — meta: BEANTWORTET (`graph.facebook.com/{v}/{pixelId}/events`,
live) · pinterest: BEANTWORTET (`api.pinterest.com/v5/ad_accounts/{id}/events`, gel) ·
tiktok: BEANTWORTET (`TIKTOK_ENDPOINT`, gem) · linkedin: BEANTWORTET, aber ausdrücklich NUR
gel — der Kopf von linkedin-forward.ts nennt Adresse und Bearer-Präfix als "die einzige
Angabe in dieser Datei, die die Befunde NICHT decken".

**B2 Versionsangabe** — meta: BEANTWORTET (`META_GRAPH_VERSION`, im PFAD, env-übersteuerbar,
Default `v21.0`; **ob v21.0 noch bedient wird: NICHT GEFUNDEN**) · pinterest: BEANTWORTET
(`/v5/` im Pfad, gel; Abschaltpraxis NIE GESTELLT) · tiktok: BEANTWORTET (`/v1.3/` im Pfad,
gem; Abschaltpraxis NIE GESTELLT) · linkedin: BEANTWORTET (Kopfzeile `LinkedIn-Version`,
Pflicht gem Teil (r); `202601` gemessen tragend am 2026-08-17 und 2026-08-19; **der
Abschalt-Termin dieser Version: NICHT GEFUNDEN**, Teil (z)).

**B3 Träger des Geheimnisses** — meta: BEANTWORTET (Query-String `access_token`, live) ·
pinterest: BEANTWORTET (`Authorization: Bearer`, gel) · tiktok: BEANTWORTET (eigene Kopfzeile
`Access-Token`, ohne Präfix, gem) · linkedin: BEANTWORTET (`Authorization: Bearer`, gel —
s. B1).

**B4 Weitere Pflicht-Kopfzeilen** — meta: BEANTWORTET (nur `Content-Type`, live) · pinterest:
BEANTWORTET (nur `Content-Type`, gel) · tiktok: BEANTWORTET (nur `Content-Type`, gem) ·
linkedin: BEANTWORTET (`LinkedIn-Version` zusätzlich Pflicht, gem Teil (r)).

**C1 Name und Form der Kennung** — meta: BEANTWORTET (Pixel-/Dataset-ID, live) · pinterest:
BEANTWORTET (`ad_account_id`; die Stellenzahl ausdrücklich UNGEPRÜFT, s. den Kommentar am
URL-Bau) · tiktok: BEANTWORTET (`event_source_id`, gem) · linkedin: BEANTWORTET (URN mit
Pflicht-Präfix `urn:lla:llaPartnerConversion:`, gem Teil (l); der Betreiber sieht nur die
Ziffernfolge — Ursache (1) am Offenen Punkt "EIN ZIEL KANN KONFIGURIERT SEIN …").

**C2 Ort der Kennung** — meta: BEANTWORTET (Pfad) · pinterest: BEANTWORTET (Pfad) · tiktok:
BEANTWORTET (Rumpf, gem) · linkedin: BEANTWORTET (Rumpf, Feld `conversion`, gem Teil (n)).

**C3 Kardinalität** — meta: BEANTWORTET (eine je Projekt, live) · pinterest: BEANTWORTET
(eine je Projekt) · tiktok: BEANTWORTET (eine je Projekt) · linkedin: BEANTWORTET (JE
EREIGNISTYP — `LinkedinConfig.conversionRules`, gem/gel; die einzige Abweichung im Bestand).

**C4 Kennung öffentlich oder geheim** — meta: BEANTWORTET (öffentlich; steht im
Client-Bundle) · pinterest: BEANTWORTET (öffentlich; steht im Pfad) · tiktok: BEANTWORTET
(öffentlich) · linkedin: BEANTWORTET, aber ausdrücklich NUR gel — Offener Punkt "DER
PRIMÄRSCHLÜSSEL … BLEIBT": "dass die LinkedIn-URN eine KENNUNG ist und kein ZUGANGSDATUM,
ist GELESEN … und NICHT gemessen".

**D1 Hüllenaufbau** — meta: BEANTWORTET (`{data:[…]}`, live) · pinterest: BEANTWORTET
(`{data:[…]}`, gel) · tiktok: BEANTWORTET (`{event_source, event_source_id, data:[…]}`, gem) ·
linkedin: BEANTWORTET (flaches Objekt, KEIN `data`-Array, gem Teil (n)).

**D2 Namen der Kernfelder** — meta: BEANTWORTET (live) · pinterest: BEANTWORTET (gel) ·
tiktok: BEANTWORTET (gem) · linkedin: BEANTWORTET (gem Teil (n) — ausdrücklich erst am
2026-08-19 erhoben).

**D3 Zeiteinheit und Zeitfenster** — meta: BEANTWORTET Einheit (Sekunden, live), Fenster NIE
GESTELLT · pinterest: BEANTWORTET Einheit (Sekunden, gel), Fenster NIE GESTELLT · tiktok:
BEANTWORTET Einheit (Sekunden, gem TAB), Fenster NIE GESTELLT · linkedin: BEANTWORTET beides
(Millisekunden, gem; 90 Tage, gem Teil (s)).
**ACHSE:** Suche nach `zeitfenster`, `90 Tage`, `conversionHappenedAt`, `event_time` —
Fenster-Treffer ausschliesslich bei LinkedIn.

**D4 Typ des Werts und Typprüfung** — meta: BEANTWORTET (Zahl, live) · pinterest: BEANTWORTET
(Zeichenkette, gel) · tiktok: BEANTWORTET (Zahl, gem) · linkedin: BEANTWORTET (Zeichenkette,
Typ WIRD geprüft, gem Teil (o)).

**D5 Pflicht- gegen Kannfelder** — meta: BEANTWORTET teilweise (jede Identitäts-Hälfte
einzeln weglassbar, live) · pinterest: BEANTWORTET (`user_data` Pflicht-Objekt mit mindestens
einer Kennung, gel) · tiktok: BEANTWORTET (Nutzer-Objekt NICHT Pflicht — gem: ein Aufruf ohne
es wird mit `code 0` quittiert) · linkedin: BEANTWORTET (Typ UND Wert der Kennung beide
Pflicht, gem Teil (a)).

**D6 Prüfung der BEDEUTUNG** — meta: NIE GESTELLT · pinterest: NICHT GEFUNDEN (der Kommentar
meldet nur, dass ein NEGATIVER Wert durchgeht — "Die Doku rät davon ab, verbietet es aber
nicht") · tiktok: NIE GESTELLT · linkedin: BEANTWORTET (gem Teile (e)/(j)).
**ACHSE für meta/tiktok:** Suche nach `wertebereich`, `währungscode`, `currency`, `plausib`
in `src/lib/capi/` und `docs/` — kein Treffer, der die Frage stellt.

**E1 Liste der Identitäts-Merkmale** — meta: BEANTWORTET teilweise (IP, UA, `fbp`;
vollständige Liste NIE GESTELLT) · pinterest: BEANTWORTET (`em`, `hashed_maids` oder das Paar
IP/UA, gel) · tiktok: BEANTWORTET teilweise (IP/UA genügen, gem; vollständige Liste NICHT
GEFUNDEN) · linkedin: BEANTWORTET (FÜNF Symbole gel, ZWEI davon gem — Teil (i)).

**E2 Roh oder gehasht** — meta: BEANTWORTET (roh für IP/UA, live) · pinterest: BEANTWORTET
(roh, gel) · tiktok: BEANTWORTET (roh, gem) · linkedin: BEANTWORTET (Klartext-IP, der
Anbieter hasht selbst mit Salt — gel Teil (i)).

**E3 Identität Pflicht?** — meta: BEANTWORTET (nein) · pinterest: BEANTWORTET (ja, gel) ·
tiktok: BEANTWORTET (NEIN — gem; der Riegel ist ausdrücklich eine eigene Entscheidung) ·
linkedin: BEANTWORTET (ja, gem Teil (a)).

**E4 Feld für den User-Agent** — meta: BEANTWORTET (`client_user_agent`, live) · pinterest:
BEANTWORTET (`client_user_agent`, gel) · tiktok: BEANTWORTET (`user.user_agent`, gem) ·
linkedin: BEANTWORTET (existiert NICHT, gem Teile (a)/(i)/(n)).

**F1 Freier Name oder Enum** — meta: BEANTWORTET (frei, live) · pinterest: BEANTWORTET (Enum,
gel) · tiktok: BEANTWORTET (Standard und Custom, gem) · linkedin: BEANTWORTET mittelbar (die
Nutzlast trägt keinen Ereignisnamen — die Regel-URN ersetzt ihn, gem Teil (n)).

**F2 Registrierungspflicht und Deckel je Konto** — meta: NIE GESTELLT · pinterest: NICHT
GEFUNDEN (der Adapter-Kommentar nennt "Registrierungspflicht und einen Deckel je Konto" gel
und hält fest, dass eine Messung am eigenen Konto fehlt) · tiktok: BEANTWORTET teilweise (ein
freier Name wird angenommen und ALS CUSTOM geführt, gem) · linkedin: entfällt (kein
Ereignisname in der Nutzlast).
**ACHSE für meta:** Suche nach `registrier`, `Deckel`, `Limit je Konto` in
`src/lib/capi/meta-forward.ts` und `docs/claude-history/phase-6-capi.md` — kein Treffer.

**F3 Standard-Namen und Abweichungen** — meta: BEANTWORTET (`META_STANDARD_EVENTS`, live) ·
pinterest: BEANTWORTET (`EVENT_MAP`, ZWEI Namen weichen ab, gel aus der Zweckspalte) · tiktok:
BEANTWORTET (acht Namen, alle Standard, gem 2026-08-11) · linkedin: entfällt.

**G1 Erfolgs-Statuscode und Erfolgskriterium** — meta: BEANTWORTET (200, Status genügt —
live; der Adapter verzweigt nur auf `res.ok`) · pinterest: BEANTWORTET (Status genügt NICHT:
Ablehnung mit Erfolgsstatus, gel; **der Erfolgs-Rumpf selbst ist NIE GEMESSEN**, s. den
Adapter-Kopf) · tiktok: BEANTWORTET (200 mit `code: 0`, Status genügt nicht, gem) · linkedin:
BEANTWORTET (201 mit leerem Rumpf, der Status ist die ganze Auskunft, gem Teile (d)/(n)).

**G2 Rumpfformen der Fehlerantwort** — meta: BEANTWORTET (`error{message, code,
error_subcode, type, fbtrace_id}`, real aufgetreten) · pinterest: BEANTWORTET
(`{code, message, status}`, Handmessung 2026-08-07 NUR für den Fehlerfall) · tiktok:
BEANTWORTET (`{code, message, request_id}`, IDENTISCH in Erfolg und Fehler, gem) · linkedin:
BEANTWORTET (FÜNF Wege, drei bis vier Rumpfformen je Zählkriterium — gem Teile (f)/(r)/(s)).

**G3 Trennt der Status die Fehlerklassen?** — meta: NICHT GEFUNDEN (der Adapter liest
`code`/`subcode`, ohne dass die Frage als Befund steht) · pinterest: BEANTWORTET (nein — die
Ablehnung kommt mit Erfolgsstatus, gel) · tiktok: BEANTWORTET (nein — zwei Codes teilen sich
HTTP 401, gem) · linkedin: BEANTWORTET (nein — zwei verschiedene 400er, nur `code` trennt
sie, gem Teile (r)/(s)).

**G4 Echo-Achse** — meta: BEANTWORTET (real aufgetreten; das Manifest führt sie in Tier 1 als
OFFEN) · pinterest: BEANTWORTET (gem, Handmessung 2026-08-07: das Zugangsdatum wird
zurückgespiegelt) · tiktok: BEANTWORTET (gem: die gesendete Quellen-Kennung erscheint
WÖRTLICH in der Meldung) · linkedin: BEANTWORTET als NICHT-TREFFER (Teil (g): in keinem der
sieben Läufe zurückgespiegelt — ausdrücklich kein Beweis für alle Pfade).

**G5 Rückkanal in der Erfolgsantwort** — meta: BEANTWORTET (`fbtrace_id` im FEHLER-Fall; ein
Erfolgs-Rückkanal NICHT GEFUNDEN — `forwardToMeta` liest die Erfolgsantwort nachweislich gar
nicht, gem am eigenen Code, s. Teil (p)) · pinterest: BEANTWORTET (Zählwerte und `events[]`,
gel — nie gemessen) · tiktok: BEANTWORTET (`request_id`, gem) · linkedin: BEANTWORTET
(KEINER — 201, `Content-Length: 0`, gem Teil (d)).

**H1 Testmodus** — meta: BEANTWORTET (`test_event_code` in der NUTZLAST, live) · pinterest:
BEANTWORTET (`?test=true` im QUERY-STRING, gel) · tiktok: BEANTWORTET (`test_event_code` in
der Nutzlast, wechselt pro Sitzung, gem) · linkedin: BEANTWORTET als NICHT-TREFFER
(Anbieter-Befunde 2026-08-11: "kein Testmodus gefunden — ein NICHT-TREFFER, KEIN Beweis der
Abwesenheit").

**H2 Deduplizierung** — meta: BEANTWORTET (geteilte `event_id` zwischen Browser und Server,
live bewiesen Phase 6/7) · pinterest: NIE GESTELLT · tiktok: NIE GESTELLT · linkedin:
BEANTWORTET (Voraussetzungen gel, Teil (y); die WIRKUNG NICHT GEMESSEN, Teile (q)/(t)).
**ACHSE für pinterest/tiktok:** Suche nach `dedup`, `deduplizier` und der `event_id`-Semantik
in `src/lib/capi/pinterest-forward.ts`, `src/lib/capi/tiktok-forward.ts`,
`docs/ziel-befunde.md` und `docs/claude-history/phase-11-multi-tracking*.md` — beide Adapter
SENDEN `event_id`, aber nirgends steht, was der Anbieter damit tut.

**H3 Mengenbeschränkung und Wiederholungsverhalten** — meta: NIE GESTELLT · pinterest: NIE
GESTELLT · tiktok: NIE GESTELLT · linkedin: NIE GESTELLT.
**ACHSE:** formale Suche über `src/` und `docs/` nach `rate limit`, `ratelimit`, `429`,
`quota`, `drossel`, `kontingent`, `retry` — NULL Treffer in `src/lib/capi/`; die
`kontingent`-Treffer betreffen ausschliesslich das Vercel-Domain-Rate-Limit
(`lib/domains/audit.ts`, `register.ts`, `remove.ts`), also einen anderen Anbieter und einen
anderen Pfad.

**H4 Mehrere Ereignisse je Aufruf** — meta: NIE GESTELLT (die Hülle trägt ein Array,
gesendet wird eines) · pinterest: NICHT GEFUNDEN (`evaluateSuccessBody` behandelt mehr als
einen Eintrag als Vertragsbruch, ohne dass die Frage beantwortet wäre) · tiktok: NIE
GESTELLT · linkedin: BEANTWORTET als FOLGERUNG (Teil (s): die Meldung trägt `indices [0]`,
also eine Batch-Semantik — ausdrücklich "Ein Aufruf mit MEHREREN Ereignissen ist nicht
gefahren worden").
**ACHSE:** Suche nach `batch`, `mehrere Ereignisse`, `indices` — Treffer ausschliesslich in
Teil (s).

**H5 Taugliches Live-Test-Instrument** — meta: BEANTWORTET (Events Manager, "Empfangen von:
Server" — Manifest-Lektion, live) · pinterest: NICHT GEFUNDEN · tiktok: BEANTWORTET
(Test-Ereignis-Tab, gem) · linkedin: BEANTWORTET mit Einschränkung (die Empfangsanzeige
tauglich für das OB, die Zahlen erst nach Stunden, die Conversions-Zählung untauglich — gem
Teile (h)/(k)/(q)/(t)).

**I1 Produkt-Freigabe vor der ersten Antwort** — meta: NIE GESTELLT · pinterest: NIE
GESTELLT · tiktok: NIE GESTELLT · linkedin: NIE GESTELLT.
**ACHSE:** Suche über `src/` und `docs/` nach `freigab`, `beantrag`, `genehmig`,
`allowlist`, `allow-list` — im Kontext der vier gebauten Ziele kein Treffer; die
Allowlist-Treffer betreffen `isAppHost` (Domain-Routing) und Google (Teile (d)/(e) des
Google-Abschnitts, ein NICHT gebautes Ziel).

**I2 Vertrags- oder Einwilligungs-Bedingungen im Konto** — meta: NIE GESTELLT · pinterest:
NIE GESTELLT · tiktok: NIE GESTELLT · linkedin: NIE GESTELLT.
**ACHSE:** Suche über `src/` und `docs/` nach `nutzungsbedingung`, `terms`,
`vertragsbedingung`, `einwilligungsbedingung` — die Treffer betreffen den Kunden-DPA und die
Subprozessoren (Manifest Tier 0), nicht die Konto-Bedingungen eines Fan-Out-Ziels.

**I3 Merkmal freigeschaltet oder allowlist-pflichtig** — meta: NIE GESTELLT · pinterest: NIE
GESTELLT · tiktok: NIE GESTELLT · linkedin: NIE GESTELLT.
**ACHSE:** wie I1. Für ein NICHT gebautes Ziel ist die Frage beantwortet
(docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teile (c)/(e), gel)
— für die vier gebauten hat sie niemand gestellt.

**I4 Rolle der anmeldenden Identität** — meta: NIE GESTELLT · pinterest: NIE GESTELLT ·
tiktok: NIE GESTELLT · linkedin: NIE GESTELLT.
**ACHSE:** Suche über `src/` und `docs/` nach `rolle`, `berechtigungsstufe`, `admin`,
`zugriffsebene` im Kontext eines Fan-Out-Ziels — kein Treffer. Die einzige benachbarte
Angabe im Repo betrifft Google (Teil (d): "Nutzer im Werbekonto des Kunden") und nennt keine
Rolle.

**I5 Freigabe der ausliefernden Domain** — meta: BEANTWORTET (gem/real aufgetreten,
2026-07: ohne Eintrag der Serving-Domain in Metas Traffic-Permissions-Allow-List verwarf der
Anbieter das BROWSER-Ereignis lautlos, während der server-seitige Weg durchlief;
docs/claude-history/phase-7-hosting.md, Scheibe 7c-2a) · pinterest: NIE GESTELLT · tiktok:
NIE GESTELLT · linkedin: NIE GESTELLT.
**ACHSE für die drei:** Suche über `src/` und `docs/` nach `traffic permission`,
`domain-freigabe`, `serving-domain` im Kontext des jeweiligen Anbieters — kein Treffer.

## Beobachtungen am Bestand (2026-08-20)

**WAS DIESER ABSCHNITT IST:** Befunde, die bei der Aufklärung vom 2026-08-20 aufgefallen
sind und in KEINER Matrix-Zelle aufgehen. **OHNE BEWERTUNG, OHNE DRINGLICHKEITSURTEIL, OHNE
VORSCHLAG.** Er ist ebenso datiert wie die Matrix und wird nicht stillschweigend
fortgeschrieben.

**WAS HIER BEWUSST NICHT STEHT:** Sechs weitere Beobachtungen desselben Tages gehen
vollständig in Matrix-Zellen auf und werden deshalb nicht wiederholt — die Meta-Version
(B2/meta), der nie gemessene Pinterest-Erfolgs-Rumpf (G1/pinterest), die nie gestellte
Dedup-Frage bei Pinterest und TikTok (H2), die nie gestellte Mengenfrage bei allen vier (H3),
die Registrierungspflicht bei Pinterest (F2) und die nur gelesene Endpunkt-Angabe bei
LinkedIn (B1).

- **DAS FELD `content_id` FEHLT IN DER TIKTOK-NUTZLAST.** GEMESSEN (2026-08-11): Der
  Test-Ereignis-Tab des Anbieters beanstandet es. Der Kommentar an `properties` in
  `src/lib/capi/tiktok-forward.ts` führt das als "bekannte Lücke, kein vergessenes Feld" und
  begründet den Verzicht auf einen Platzhalter: "ein erfundener Wert wäre eine Behauptung
  über den Inhalt des Kunden". Der Grund liegt im eigenen Modell — `TrackConfig`
  (`lib/mappings.ts`) trägt Wert und Währung, aber keine Inhalts-Kennung.

- **BEI PINTEREST IST "ROH, NICHT GEHASHT" EINE REINE DOKU-LESUNG.** Der Adapter sendet IP
  und User-Agent im Klartext; der Kopf von `src/lib/capi/pinterest-forward.ts` hält fest,
  dass Endpunkt, Feldnamen, Enum-Werte, beide Rumpfformen und der Testmodus-Parameter aus
  der Doku-Lesung vom 2026-08-10 stammen und GEMESSEN allein der Fehler-Rumpf bei ungültigem
  Geheimnis ist (Handmessung 2026-08-07). Berührt die Auflage im Offenen Punkt
  "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (Infrastruktur-Daten als Transit-Wert).
