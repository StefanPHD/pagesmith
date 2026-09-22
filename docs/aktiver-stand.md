# Aktiver Stand — Phase 11.7

**DIESE DATEI IST DAS PFLICHT-GATE.** Ab jetzt liest JEDE Sitzung, die an dieser Phase
arbeitet, sie ZUERST und VOLLSTÄNDIG — als "Auftrag 0" jedes Bau- und
Aufklärungs-Prompts. Das ist kein Vorschlag (CLAUDE.md, "## Aktiver Stand — Verfahren ab
Phase 10").

**ANGELEGT AM 2026-09-22**, mit dem Ergebnis der ersten Aufklärung der Phase — also mit
der ersten Tatsache, nicht vorher. Bis dahin existierte sie nicht, und das war richtig:
eine leer angelegte Datei trägt nur Vermutungen.

**SIE IST NICHT GETEILT.** Es gibt kein Archiv und keinen Vorrat als eigene Datei; alles
steht hier. Unterhalb von 4000 Zeilen wird nicht geteilt — das ist ein Verbot, keine
Schwelle.

**DIE NUMMERN TRAGEN DAS PRÄFIX `P11.7-n`**, laufen über alle Gattungen getrennt
(Vermerk, Entscheidung, Vorrat, offene Frage) und werden NIE neu vergeben. Ein neuer
Eintrag tritt hinten an, auch wenn er der jüngste ist.

## Verzeichnis

Die Abschnitte dieser Datei, in Dateireihenfolge. Die Einträge tragen bewusst KEINE
`##`-Marke: Sonst trifft eine Überschriften-Suche zuerst diesen Eintrag statt der
Überschrift (docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER
DATEI MIT VERZEICHNIS NICHT").

- Verzeichnis
- Gegenstand der Phase
- Was den Zuschnitt bindet
- Frist mit Termin — sie wartet nicht auf das Phasenende
- Vermerke
- Entscheidungen, die über ihre Scheibe hinaus binden
- Vorrat (gemeldet, nicht gebaut)
- Offene Fragen an den Anbieter-Crawl
- Fragen an den Zuschnitt (nach dem Meta-Crawl)
- Nächster Schritt

**ZWEI ABSCHNITTE SIND AM 2026-09-22 HINZUGEKOMMEN** — "Frist mit Termin" und "Fragen an den
Zuschnitt". Sie sind EINGEFÜGT, nicht angehängt: der erste steht vor den Vermerken, weil er
unabhängig vom Fortschritt der Phase gilt und hinten niemand nach ihm sucht; der zweite
hinter den Fragen an den Crawl, weil er deren Ergebnis verarbeitet. **NICHTS IST UMSORTIERT
ODER UMBENANNT WORDEN.** Die Regel "ein neuer Eintrag tritt hinten an" im Kopf dieser Datei
gilt den NUMMERN (`P11.7-n`), nicht den Abschnitten — sie ist hier nicht gebrochen.

## Gegenstand der Phase

Phase 11.7 hiess bis zum 2026-09-22 "Anbieter-Befunde nachziehen: die VIER GEBAUTEN
ZIELE" und trug VIER Punkte — Katalog-Lücken an tiktok (Deduplizierung), meta
(Versionsangabe), meta/tiktok/linkedin (Rate-Limits) und pinterest (Erfolgsrumpf).

**AM 2026-09-22 IST EIN FÜNFTER PUNKT HINZUGETRETEN (OWNER):** KLICK-KENNUNGEN UND
MATCH-FELDER ALLER GEBAUTEN ZIELE — jedes Netzwerk soll die Daten bekommen, mit denen es
bestmöglich optimiert, mit Blick auf spätere interne Analytics und CRM.

**DER VOLLTEXT BEIDER TEILE STEHT IN docs/roadmap.md, Roadmap-Zeile 11.7** — die vier
Punkte im Text vom 2026-08-20, der fünfte in der ERWEITERUNG VOM 2026-09-22. Er wird hier
NICHT verdoppelt.

**GOOGLE GEHÖRT NUR ZUM FÜNFTEN PUNKT.** Die vier Punkte darüber bleiben bei den vier
Zielen, für die sie als Katalog-Lücken festgestellt wurden.

## Was den Zuschnitt bindet

**ES IST NOCH NICHTS ZUGESCHNITTEN.** Diese Datei trägt am 2026-09-22 eine Aufklärung und
vier Entscheidungen, keine Scheibe.

**KEIN ZUSCHNITT VOR DEM ANBIETER-CRAWL.** Welche Kennung je Ziel wie heisst, woher sie
kommt, welches Format sie hat und wo sie in die Nutzlast gehört, ist UNGEMESSEN. Ein
Zuschnitt davor wäre gegen eine geratene Feldliste geschnitten.

**DER PFLICHT-STOPP GILT:** Wer ein Fan-Out-Ziel zuschneidet, einen Adapter baut, beim
Anbieter recherchiert oder eine Live-Test-Anleitung schreibt, lädt docs/ziel-befunde.md
ZUERST — in der Form, die CLAUDE.md, "## Anbieter-Befunde der Fan-Out-Ziele", seit dem
2026-09-22 vorschreibt. In der Aufklärung vom 2026-09-22 ist die Datei AUSDRÜCKLICH NICHT
geladen und NICHT durchsucht worden; der Prompt hat sie ausgenommen, weil der Crawl eine
eigene Runde ist.

**DIE ERSTE BAU-SCHEIBE, DIE EINE KENNUNG DURCHLEITET, TRÄGT EINEN PFLICHT-NACHWEIS**, der
nicht aus dieser Phase stammt: die Messung auf Ablage und Logausgabe am gebauten
Google-Transport (docs/offene-punkte.md, Posten "DIE PRÄMISSE VON PUNKT (a) DES
DATENKLASSEN-BLOCKS IST TOT", Satz vom 2026-09-22). Achse: ALLE `console`-Aufrufe im
Produktivcode unter `src/`, binärsicher gelesen, plus die Schreibpfade, mit
Positivkontrolle.

## Frist mit Termin — sie wartet nicht auf das Phasenende

**DIESER ABSCHNITT TRÄGT GENAU EINEN POSTEN, UND ER HAT EIN DATUM.** Er steht nicht im
Vorrat, und das ist der ganze Zweck des eigenen Abschnitts: **der Vorrat wird am Phasenende
gehoben, diese Frist kann das nicht abwarten.** Sie gilt unabhängig davon, ob die Phase 11.7
zugeschnitten, gebaut oder verworfen wird.

**DIE ANHEBUNG DER GRAPH-API-VERSION MUSS VOR DEM 2027-01-21 GEBAUT SEIN.**

**DER ZUSTAND, GEMESSEN am Repo (CC, 2026-09-22, HEAD `354a6e5`):** Der Meta-Adapter sendet
`v21.0`. `META_GRAPH_VERSION` (`src/lib/capi/config.ts`) trägt den Vorgabewert `"v21.0"` und
ist über die Umgebungsvariable gleichen Namens übersteuerbar; verwendet wird er in
`src/lib/capi/meta-forward.ts` als
`https://graph.facebook.com/${META_GRAPH_VERSION}/${config.pixelId}/events`. **WAS IN DER
PRODUKTIONSUMGEBUNG GESETZT IST, IST AM REPO NICHT FESTSTELLBAR und ausdrücklich nicht
erhoben** — steht dort ein höherer Wert, verschiebt sich der Termin, und dieser Posten ist
dann an der Umgebung neu zu prüfen, nicht am Code.

**DER TERMIN, GELESEN 2026-09-22** (docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)",
Teil (s)): Die Tabelle "Available Graph API Versions" führt `v21.0` mit "Available Until
**January 21, 2027**". Die Tabelle "Available Marketing API Versions" derselben Seite
**führt `v21.0` überhaupt nicht** — ihre älteste Zeile ist `v24.0`. Welche der beiden für
`/{PIXEL_ID}/events` gilt, ist **UNGEMESSEN** und nur mit einem Aufruf gegen den Endpunkt zu
entscheiden.

**WARUM DIE FRIST TROTZ DIESER UNSICHERHEIT EIN HARTES DATUM HAT — und das ist der tragende
Satz:** Von den zwei möglichen Schemata ist das GRAPH-Schema das MILDERE (zwei Jahre
Garantie, Ablauf am 2027-01-21); das Marketing-Schema wäre das strengere (90 Tage, `v21.0`
nicht geführt). **DER 2027-01-21 IST ALSO DIE SPÄTESTMÖGLICHE GRENZE, NICHT DIE
WAHRSCHEINLICHSTE.** Wer auf die Messung wartet, kann die Frist nur verkürzen, nie
verlängern.

**WARUM DAS NICHT VON SELBST AUFFÄLLT — DER ABLAUF ERZEUGT KEINEN FEHLER** (ebenda, Teil
(t)): Unter dem Graph-Schema wird ein Aufruf an eine abgelaufene Version "defaulted to the
next oldest, usable version" — der Adapter bekommt **weiter eine Erfolgsantwort, von einer
Version, die er nicht gewählt hat.** Unter dem Marketing-Schema kann dieselbe Anfrage statt
dessen scheitern. **Nichts im eigenen Code wird davon rot, und keine Logzeile entsteht.**
Dass Meta Validierungsregeln an Versionsnummern bindet, ist belegt (die "Baseline
requirements for matching" ab `v13.0`, ebenda Teil (m)); **welche Regeln eine
stillschweigend untergeschobene Version mitbringt, ist ungemessen.**

**WAS ZU TUN IST, ohne es hier zu entscheiden:** Der Wert ist env-übersteuerbar, eine
Anhebung ist also nicht zwingend eine Code-Änderung. **OB sie über die Umgebung oder über
den Vorgabewert läuft, ist NICHT entschieden** — das ist eine eigene Frage, und sie hängt
daran, ob der Sprung eine Änderung an der Nutzlast nach sich zieht. **KEINE EMPFEHLUNG.**

**WO DIESER POSTEN AUF DAUER HINGEHÖRT, und er ist es heute nicht:** Ein Zustand, der später
kippt, gehört nach CLAUDE.md (Weg 3 unter "## Aktive Dokumente") in docs/offene-punkte.md,
mit Titel und Trigger als Stub-Zeile in CLAUDE.md. **BEIDE DATEIEN LAGEN AM 2026-09-22
AUSSERHALB DES SCOPES DIESER RUNDE** und sind ausdrücklich UNBERÜHRT. **FOLGE, und sie ist
selbst eine Aufgabe:** Die nächste Runde, die docs/offene-punkte.md ohnehin öffnet, trägt
diese Frist dorthin — mit dem Termin im Trigger. Solange sie hier steht, stirbt sie mit dem
Phasenende dieser Datei, und **die Archivierung der Standdatei ist keine Erledigung der
Frist.**

## Vermerke

### VERMERK P11.7-1 — Aufklärung vom 2026-09-22 (KEIN BAU)

**KEIN BAU-COMMIT, UND DER GRUND GEHÖRT AN DEN VERMERK:** Diese Runde war READ-ONLY. Sie
hat keine Zeile Code geschrieben, weil vor dem Anbieter-Crawl nicht entscheidbar ist,
WELCHES Feld je Ziel überhaupt zu bauen wäre. Der einzige Commit dieses Tages ist ein
Doku-Commit (diese Datei, docs/roadmap.md, docs/offene-punkte.md).

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD `9abdd2a` ("docs(claude): Lade-Probe nach dem
Phasenende 11.11") · Arbeitsbaum sauber vor und nach der Aufklärung (`git status
--porcelain` leer) · docs/ziel-befunde.md weder geladen noch durchsucht · kein
Browser-Werkzeug, kein Crawl.

**DIE TRAGENDEN BEFUNDE — alle GEMESSEN am Repo (CC, 2026-09-22) bei HEAD `9abdd2a`:**

(a) **ES GIBT EINEN BEACON, NICHT FÜNF.** `buildCapiBeaconStatement`
    (src/lib/tracking/meta.ts) baut den Klick-Beacon für ALLE Ziele. Er liest GENAU EIN
    Cookie — `_fbp` über `document.cookie.match(/(?:^|; )_fbp=([^;]*)/)` — und
    `location.href` als `eventSourceUrl`. **KEIN EINZIGER URL-PARAMETER WIRD AUSGELESEN;**
    im ausgelieferten Code gibt es keine Stelle, die `searchParams`/`URLSearchParams` auf
    `location` anwendet. Gesendeter Rumpf: `trackingKey`, `eventID`, `event`,
    `eventSourceUrl`, `isCustom`, `cns`, optional `value`, `currency`, `_fbp`.

(b) **EIN EINZIGES VENDOR-BROWSER-TAG.** Metas `fbq` (`buildMetaRuntime`, Bootstrap auf
    `connect.facebook.net/en_US/fbevents.js`). Für pinterest, tiktok, linkedin und google
    existiert KEIN eigenes Browser-Tag. Die Gegenprobe auf `pintrk`, `ttq`, `lintrk`,
    `gtag`, `s.pinimg`, `analytics.tiktok`, `snap.licdn` und `googletagmanager` trifft
    ausschliesslich src/lib/foreign-scan.ts und src/lib/foreign-signatures.ts (Erkennung
    FREMDER Pixel, Phase 11.11) sowie einen Platzhaltertext in
    src/components/ActionPanel.tsx.

(c) **DER PAGEVIEW-EMITTER UND DIE PIXEL-BESTÄTIGUNG SENDEN BARE.** `buildPageViewScript`
    (src/lib/analytics/pageview-emitter.ts) sendet `trackingKey`, `eventID`, `event` —
    kein Cookie, keine Adresse. `buildPixelConfirmStatement` sendet dasselbe plus `obs`.

(d) **MATCH-FELDER JE ZIEL, VOLLSTÄNDIG, je Feld mit Quelle:**
    - **meta** (`forwardToMeta`, src/lib/capi/meta-forward.ts): DREI in `user_data` —
      `client_ip_address` ← Request-Header über `resolveClientIp` · `client_user_agent` ←
      Header `user-agent` · `fbp` ← Beacon-Feld `_fbp`. Ausserhalb `user_data`:
      `event_source_url` ← `eventSourceUrl`. **KEIN `fbc`.**
    - **pinterest** (`forwardToPinterest`): ZWEI — `client_ip_address`,
      `client_user_agent`, beide aus Headern, roh und ungehasht. Riegel
      `if (!clientIp || !userAgent) return;` (beide oder keiner). Ausserhalb:
      `event_source_url`.
    - **tiktok** (`forwardToTiktok`): ZWEI — `user.ip`, `user.user_agent`, beide aus
      Headern. Derselbe Riegel. Ausserhalb: `page.url`.
    - **linkedin** (`forwardToLinkedin`): EINS — `user.userIds[0] =
      { idType: "PLAINTEXT_IP_ADDRESS", idValue: clientIp }`. **NUR IPv4** (Riegel
      `isIpv4`). `userAgent` wird gar nicht erst übergeben; `eventSourceUrl` wird nicht
      gelesen.
    - **google** (`forwardToGoogle`): **NUR die Klick-Kennungen** — `adIdentifiers` ←
      `extractGoogleClickIds(body.eventSourceUrl)`, Teilmenge von
      `{gclid, gbraid, wbraid}`. **WEDER IP NOCH UA** werden übergeben; `GoogleEvent`
      trägt kein `userData`, kein `landingPageDeviceInfo`, kein `eventDeviceInfo`. Leere
      Menge → `reason = "no_click_id"`, kein Aufruf.

(e) **KEINE KLICK-KENNUNG AUSSER GOOGLES WIRD IRGENDWO BENANNT GEFÜHRT.** Zählung über
    `src/` (`.ts`/`.tsx`): `fbc` 0 · `fbclid` 0 · `_fbc` 0 · `ttclid` 0 · `_ttp` 0 ·
    `epik` 0 · `li_fat_id` 0. Dagegen `gclid` 36 (6 ohne Testdateien), `gbraid` 10 (3),
    `wbraid` 8 (3), `_fbp` 17 (12). **POSITIVKONTROLLE im selben Lauf:** `eventSourceUrl`
    17 Treffer ohne Testdateien — die Suche greift, die sieben Nullen sind echte
    Nicht-Treffer auf dieser Achse. **DIE SIEBEN NAMEN SIND SUCHBEGRIFFE AUS EINEM
    ARCHITEKTEN-VORSCHLAG, KEINE ANBIETER-BEFUNDE** — ob ein Anbieter eine so heissende
    Kennung führt, ist ungemessen.

(f) **NICHTS WIRD PERSISTIERT.** `persistEvent` (src/lib/analytics/persist.ts) schreibt
    GENAU FÜNF Werte: `project_id`, `event_type`, `event_id`, `source`, `variant`.

(g) **DIE UNBENANNTE DURCHLEITUNG BESTEHT.** `eventSourceUrl` ist `location.href`
    einschliesslich Query-String; meta, pinterest und tiktok reichen es weiter. Ein
    `gclid` reist damit heute an drei Ziele, die es nicht vergeben haben. Der Befund ist
    nicht neu (docs/offene-punkte.md, Vermerk vom 2026-09-01); er ist am 2026-09-22 am
    selben Code bestätigt.

(h) **DIE ZAHL VIER IM TITEL DER ROADMAP-ZEILE WAR EINE KORREKTE MOMENTAUFNAHME.** Der
    Eintrag entstand am 2026-08-20 (Commit `952141b`) und ist seither ZEICHENGLEICH —
    `git blame` weist alle Zeilen dem Umzugs-Commit `409923c` (2026-08-21) zu, und ein
    Vergleich des Blocks aus `952141b:CLAUDE.md` gegen den heutigen zeigt keine Abweichung
    innerhalb des Eintrags. `TRACKING_TARGETS` führte an jenem Tag vier Ziele; `'google'`
    kam am 2026-08-31 hinzu (Commit `659d672`).

**DIE "NICHT ENTSCHEIDBAR"-PUNKTE DER AUFKLÄRUNG — SIEBEN, davon VIER durch die
Entscheidungen desselben Tages erledigt:**

| # | Punkt | Stand nach dem 2026-09-22 |
|---|---|---|
| 1 | Ob Google in 11.7 gehört | **ERLEDIGT** durch Entscheidung P11.7-1 |
| 2 | Ob `fbc` aus einem COOKIE unter die dritte Datenklasse fällt | **ERLEDIGT** durch P11.7-2 |
| 3 | Ob die unbenannte Durchleitung über `eventSourceUrl` unter die Klasse fällt | **ERLEDIGT** durch P11.7-3 |
| 4 | Ob `fbp` unter die dritte Klasse fällt | **ERLEDIGT** durch P11.7-2 |
| 5 | Ob die Auflage TRANSIT-ONLY im gebauten Google-Transport eingehalten wird | **OFFEN.** In der Aufklärung NICHT gemessen — die Log-Achse waren die fünf Adapter-Dateien, nicht die 48 `console`-Aufrufe unter `src/`. Ort der Messung: s. "Was den Zuschnitt bindet" |
| 6 | Ob das Ablage-/Log-Verbot der Klasse 2 auch für den User-Agent gilt | **ERLEDIGT** durch P11.7-4 |
| 7 | Der Volltext des `eventSourceUrl`-Befundes ist über den Zeiger in docs/offene-punkte.md nicht erreichbar (er zeigt auf die gelöschte Standdatei der Phase 11.2) | **OFFEN.** Nicht geheilt, nur festgestellt; gedeckt vom bestehenden Posten "ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI" |

**PROVENIENZ:** (a) bis (h) sind GEMESSEN am Repo (CC, 2026-09-22) bei HEAD `9abdd2a`, je
mit der am Befund genannten Achse. Die Tabelle ist eine ABLEITUNG aus dem Vergleich der
Aufklärung mit den Entscheidungen desselben Tages.

### VERMERK P11.7-2 — Meta-Crawl vom 2026-09-22 (KEIN BAU)

**KEIN BAU-COMMIT, UND DER GRUND IST EIN ANDERER ALS BEI P11.7-1:** Dort war nicht
entscheidbar, WELCHES Feld zu bauen wäre. Hier ist es für meta entscheidbar geworden — und
es ist trotzdem kein Code entstanden, weil **der Crawl EIN Ziel von fünf abgedeckt hat.**
Ein Zuschnitt auf meta allein bräche die Auflage "KEIN ZUSCHNITT VOR DEM ANBIETER-CRAWL" für
die vier übrigen, und die Regel "JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE
CONSTRAINT-ERWEITERUNG MIT — UND EIN DRITTES ZIEL ERZWINGT EINE ENTSCHEIDUNG, KEINE KOPIE"
(docs/immer-beachten.md) sagt, warum ein am ersten Ziel geschnittenes Feld beim zweiten nicht
passt. Die einzigen Commits dieses Tages sind Doku-Commits.

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD bei Crawl und Ablage `354a6e5` ("docs(claude):
Phase 11.7 beginnt — Standdatei, Klick-Kennungen, Datenklassen") · Arbeitsbaum sauber vor dem
Crawl (`git status --short` leer) · **VIERZEHN Seiten** geöffnet und gelesen, durchgehend mit
`textContent` und an der ENGLISCHEN Fassung · **KEIN Aufruf gegen die Schnittstelle**, keine
Anmeldung, keine Eingabe, kein Download · `docs/ziel-befunde.md` **NICHT vollgeladen**,
sondern per GEZIELTER SUCHE über den Abschnitt "Meta (Conversions API)" mit benannter Achse
und Positivkontrolle geprüft (die Form, die CLAUDE.md, "## Anbieter-Befunde der
Fan-Out-Ziele", seit dem 2026-09-22 dafür vorschreibt).

**DER BESTAND TRUG ZU KEINER DER SECHS META-FRAGEN EINE ANTWORT** — GEMESSEN am Abschnitt
"Meta (Conversions API)" (CC, 2026-09-22): `user_data` 0 · `event_source_url` 0 ·
`Rate-Limit` 0 · Graph-Version 0 Treffer; `fbc` und `fbp` trafen **ausschliesslich die
Ausschluss-Zeile** der Umfangs-Liste. **POSITIVKONTROLLE:** `Version` 27 Treffer — die Suche
greift; alle 27 sind unecht (26-mal das Teilwort in "con**version**s-api", einmal
`fbq.version`). Gegengeprüft wurde auch der Ort, auf den jener Abschnitt selbst verweist,
`docs/claude-history/phase-6-capi.md`: dort stehen **unsere Bauentscheidungen**, keine
Anbieter-Befunde, und `fbc` trifft 0-mal.

**WOHIN DIE BEFUNDE GEGANGEN SIND — DER ZEIGER:** docs/ziel-befunde.md, Abschnitt "Meta
(Conversions API)", Unterüberschrift "Abschnitts-Lesung 2026-09-22 … die Teile (h) bis (u)".
**Sie stehen NICHT hier**, und das ist die Arbeitsteilung aus dem Kopf jener Datei: sie trägt
die Anbieter-Befunde, diese Datei trägt den Stand der Phase. Der Kopf des Meta-Abschnitts und
seine Umfangs-Liste vom 2026-09-08 sind **wörtlich stehengeblieben** und haben je einen
datierten Zusatz bekommen; Teil (f) hat einen Vorbehalt auf (m). **NULL Löschzeilen in
docs/ziel-befunde.md** (`git diff --numstat`).

**WELCHE FRAGEN DAMIT AUF DOKU-EBENE BEANTWORTET SIND — und "Doku-Ebene" ist hier keine
Abschwächung, sondern der Rang der Quelle:** F1, F2 und F3 vollständig (Name, Bildung,
Format, Ort, und die Pflicht-Tabelle, die "verlangt" von "empfohlen" trennt) · F6 mit einer
benannten Zweideutigkeit statt einer Antwort · F7 mit einer Aussage des Anbieters, die kein
Limit nennt · **F4 GAR NICHT** — dazu schweigt die Doku, und das Schweigen ist mit benannter
Reichweite über neun Seiten festgehalten.

**VIER DINGE BLEIBEN OFFEN, WEIL NUR EIN AUFRUF GEGEN DEN ENDPUNKT SIE BEANTWORTET**, je mit
Zeiger: die fachliche Annahme von `fbc`/`fbp` (Teile (h), (i)) · welches Versions-Schema
`/{PIXEL_ID}/events` regiert (Teil (s)) · welches Limit tatsächlich greift (Teil (u)) · ob
Meta aus `event_source_url` selbst ausliest (Teil (q)). **Sie sind in der Ablage ausdrücklich
als NICHT BEANTWORTET geführt**, nicht als Nebenbemerkung.

**DER BEFUND ÜBER DAS VERFAHREN, und er ist der teuerste dieser Runde:** **VIER der SIEBEN
am 2026-09-08 unter "gesehen, nicht geöffnet" ausgeschlossenen Parameter-Seiten trugen die
Antworten dieser Phase.** Der Ausschluss war für die Frage jenes Tages (Testmodus) sachlich
richtig und für die Fragen dieser Phase falsch — **und er sah bei jeder Wiederholung genauso
richtig aus.** Zwei Seiten sind am 2026-09-22 nachträglich geöffnet worden und trugen beide
je einen Befund, der an keiner anderen gelesenen Seite steht. Die Fehlerklasse ist in
docs/immer-beachten.md als "DIE LISTE 'GESEHEN, NICHT GEÖFFNET' IST DER ORT, AN DEM SICH EIN
BEFUND VERSTECKT" geführt; **der Befund ist am Ort seiner Wirkung abgelegt** — an jener
Ausschluss-Liste selbst, nicht nur hier.

**EIN NEBENBEFUND, DER EINE ANDERE PHASE BERÜHRT UND HIER NUR GEMELDET WIRD:** Die Seite
`/parameters/external-id` sagt "external_ids are not available in the Test Events tool."
Das ist eine Aussage über das Werkzeug der Teile (a) bis (f) — also über den Gegenstand der
Phase 11.3 —, und sie stand dort nicht, weil die Lesung vom 2026-09-08 jene Seite
ausgeschlossen hatte. **KEINE Folgerung, KEINE Empfehlung**; sie ist in Teil (o) abgelegt.

**PROVENIENZ:** Alle Anbieter-Angaben sind GELESEN (Quelle, Seitenstand und Datum je Angabe
am Teil in docs/ziel-befunde.md), **keine ist gemessen**. Die Zählungen über den eigenen
Bestand und die Versionsangabe am Code sind GEMESSEN am Repo (CC, 2026-09-22). Der Grund für
den fehlenden Bau-Commit ist eine ABLEITUNG aus der Reichweite des Crawls, keine
Owner-Entscheidung.

### VERMERK P11.7-3 — Google-Bestandsaufnahme vom 2026-09-22 (KEIN BAU, KEIN CRAWL)

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD `24f8b29` ("docs(claude): 11.7 — Meta-Crawl
abgelegt, Versionsfrist v21.0") · Arbeitsbaum vor und nach der Runde sauber (`git status
--short` leer) · **KEINE Navigation, kein Browser-Werkzeug, keine Werkzeug-Ablage angelegt.**

**DIE FORM:** docs/ziel-befunde.md **NICHT vollgeladen**, sondern GEZIELTE SUCHE über den
Abschnitt "Google (Google Ads Conversions · GA4)" — die zweite Form, die CLAUDE.md,
"## Anbieter-Befunde der Fan-Out-Ziele", seit dem 2026-09-22 zulässt. **SUCHRAUM:** die
Zeilen 1342–7053 jener Datei. **ACHSE, aus dem Gegenstand gebildet:** `gclid` · `gbraid` ·
`wbraid` · `adIdentifiers` · `deviceInfo` · `landingPageDeviceInfo` · `eventDeviceInfo` ·
`userAgent` · `ipAddress` · `consent` · `adUserData` · `adPersonalization` · `userData` ·
`userIdentifier` · `version` · `sunset` · `deprecat` · `eventSourceUrl` · `pageLocation` ·
`page_location` · `page url` · `URL-Parameter` · `Parametername` · `userIdentifierSource` ·
`conversionEnvironment`, case-insensitiv. **POSITIVKONTROLLE im selben Lauf:** `gclid` 39 ·
`consent` 49 · `userData` 32 · `deviceInfo` 30 · `adIdentifiers` 21. **ECHTE NICHT-TREFFER
auf derselben Achse:** die letzten fünf der Liste je 0.
**EINE FALSCH-POSITIVE, die sonst eine Dichte vortäuscht:** `version` zählt 294, davon sind
nur rund fünfzehn das echte Wort — die übrigen sind das Teilwort in "con**version**".

**DIE STOPP-BEDINGUNG DER GEZIELTEN FORM IST EINGETRETEN — DREI ZAHLEN, GEMESSEN (CC,
2026-09-22):** (1) Der Google-Abschnitt ist **5 712 Zeilen / 405 265 Bytes**, rund **64 %**
der Datei (8 817 / 628 629). (2) Er trägt **NEUN Abschnitts-Lesungen** (LAUF 1 bis LAUF 9,
2026-08-20 bis 2026-09-11) und **SIEBEN Messungen** (A, B1, C, D, E, F, G) in den Teilen
**(a) bis (ct)**. (3) Die Klick-Kennungs-Treffer verteilen sich auf **32 getrennte
Fundstellen-Gruppen** in **mindestens SECHS Zusammenhängen** — genau der Fall, den der
Abschnitt "Nächster Schritt" für google vorhergesagt hat.

**ARCHITEKTEN-ENTSCHEIDUNG 2026-09-22 — FÜR GOOGLE LÄUFT KEIN ANBIETER-CRAWL.** GRUND: Die
gezielte Suche hat **F1 bis F4 für google aus dem Bestand beantwortet**, je mit Teil-Zeiger
(Tabelle im Abschnitt "Offene Fragen an den Anbieter-Crawl"). **DIE EINZIGE LÜCKE — die
Schreibung der Auto-Tagging-Parameter — LIEGT AUSSERHALB DER TRANSPORT-DOKU**, und ihr Posten
in docs/offene-punkte.md verlangt eine **MESSUNG an einem echten Anzeigen-Klick, die keine
Lesung ersetzt.** **DER PFLICHT-STOPP IST NICHT UMGANGEN:** Es findet keine Recherche statt,
für die er gälte.

**KEIN BAU-COMMIT, UND DER GRUND IST EIN DRITTER NEBEN P11.7-1 UND P11.7-2:** Diese Runde war
eine BESTANDSAUFNAHME am eigenen Text — keine Zeile Code, keine fremde Seite. **OB DIE
ENTSCHEIDUNG OBEN DEN SATZ "KEIN ZUSCHNITT VOR DEM CRAWL" FÜR GOOGLE AUFLÖST, IST HIER NICHT
ENTSCHIEDEN** — drei Ziele sind ungecrawlt, und die Frage ist eine eigene. **KEINE EMPFEHLUNG.**

**PROVENIENZ:** Alle Zahlen dieses Vermerks sind GEMESSEN am Repo (CC, 2026-09-22), je mit
der genannten Achse. Die Antworten auf F1 bis F4 sind **GELESEN** — Quelle, Seitenstand und
Datum stehen je am Teil in docs/ziel-befunde.md, **nicht hier**. Der Entfall des Crawls ist
eine **ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-22**.

### VERMERK P11.7-4 — TikTok-Crawl vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD bei Crawl und Ablage `ad0501e` ("docs(claude):
11.7 — Google aus dem Bestand beantwortet, kein Crawl") · Arbeitsbaum vor dem Crawl sauber
(`git status --short` leer) · **NEUN Seiten** geöffnet und gelesen, dazu eine zehnte für ein
einzelnes Feld · durchgehend `textContent` über den Artikel-Rumpf und an der ENGLISCHEN
Fassung · **KEIN Aufruf gegen die Schnittstelle**, keine Anmeldung, keine Eingabe, kein
Download · Werkzeug-Ablage vor der ersten Navigation als ignoriert belegt
(`git check-ignore -v .playwright-mcp` → `.gitignore:28`).

**DIE FORM:** docs/ziel-befunde.md **NICHT vollgeladen**, sondern GEZIELTE SUCHE über den
Abschnitt "TikTok (Events API 2.0)" mit benannter Achse und Positivkontrolle — und weil
dieser Abschnitt mit **271 Zeilen / 18 603 Bytes** der kleinste der Datei ist, zusätzlich im
**VOLLTEXT** gelesen. Das Ergebnis der Suche war DÜNN (zwei Zusammenhänge); die
Stopp-Bedingung der geteilten Form ist nicht eingetreten, Bestand-Prüfung und Crawl passten
in EINE Sitzung.

**DER BESTAND TRUG ZU FÜNF DER SECHS TIKTOK-FRAGEN NICHTS** — `ttclid`, `_ttp`,
`user_agent`, `page.url` und `event_id` je 0 Treffer; die Treffer auf `version`, `rate` und
`limit` waren sämtlich unecht. **F5 stand als EIN Satz in Teil (d)**, ohne Schlüssel, ohne
Fenster, ohne Feld.

**WOHIN DIE BEFUNDE GEGANGEN SIND — DER ZEIGER:** docs/ziel-befunde.md, Abschnitt "TikTok
(Events API 2.0)", Unterüberschrift "Abschnitts-Lesung 2026-09-22 … die Teile (j) bis (p)",
dazu der datierte Umfangs-Zusatz darunter. **Sie stehen NICHT hier.** Der Bestand ist
wörtlich stehengeblieben: **NULL Löschzeilen** (`git diff --numstat`: 310 / 0).

**AUF DOKU-EBENE BEANTWORTET: F1, F2, F3, F4, F5 UND DER TIKTOK-ANTEIL VON F7** — die
Tabelle im Abschnitt "Offene Fragen an den Anbieter-Crawl" trägt sie je Frage mit
Teil-Zeiger. **SECHS Dinge bleiben offen, weil nur ein Aufruf sie zeigt;** sie stehen in der
Ablage ausdrücklich als NICHT BEANTWORTET, nicht als Nebenbemerkung.

**KEIN BAU-COMMIT, UND DER GRUND IST DERSELBE WIE BEI P11.7-2:** Der Crawl hat EIN Ziel von
fünf abgedeckt; ein Zuschnitt auf tiktok allein bräche "KEIN ZUSCHNITT VOR DEM
ANBIETER-CRAWL" für pinterest und linkedin.

**PROVENIENZ:** Alle Anbieter-Angaben sind **GELESEN** (Quelle und Datum je Angabe am Teil in
docs/ziel-befunde.md), **keine ist gemessen**. Die Zählungen über den eigenen Bestand, die
Abwesenheit eines TikTok-Tags im ausgelieferten Text sowie Endpunkt und Version am Code sind
GEMESSEN am Repo (CC, 2026-09-22).

### VERMERK P11.7-5 — LinkedIn-Bestandsaufnahme vom 2026-09-22 (KEIN BAU, KEIN CRAWL)

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD `2b28d7d` ("docs(claude): 11.7 — TikTok-Crawl
abgelegt, Versions-Wächter als Frage") · Arbeitsbaum vor und nach der Runde sauber
(`git status --short` leer) · **KEINE Navigation, kein Browser-Werkzeug, keine
Werkzeug-Ablage angelegt, keine fremde Seite abgerufen.**

**DIE FORM — GEZIELT, DANN DICHT, DANN VOLLTEXT DES ABSCHNITTS.** docs/ziel-befunde.md ist
**NICHT vollgeladen** worden (GEMESSEN, CC, 2026-09-22: **9 127 Zeilen / 651 723 Bytes**).
Gefahren ist die GEZIELTE SUCHE über den Abschnitt "LinkedIn (Conversions API)" (Zeilen
160–1341, **1 182 Zeilen / 85 666 Bytes**), mit einer aus dem GEGENSTAND gebildeten Achse
und Positivkontrolle — die zweite Form, die CLAUDE.md, "## Anbieter-Befunde der
Fan-Out-Ziele", seit dem 2026-09-22 für RECHERCHE zulässt. **WEIL DAS ERGEBNIS DICHT WAR,
IST DANACH DER ABSCHNITT IM VOLLTEXT GELESEN WORDEN — NUR ER, NICHT DIE DATEI.** Das ist
mehr als die gezielte Form verlangt und weniger als die Volladung; es steht hier, damit
niemand die Reichweite falsch einschätzt.

**DIE DICHTE IST KEINE TREFFERZAHL, SONDERN EINE VERTEILUNG — NEUN ZUSAMMENHÄNGE**
(GEMESSEN, CC, 2026-09-22): (1) Kennungs-Symbole und ihre Liste · (2) die gemessene
Nutzlast-Hülle · (3) IPv4/IPv6 · (4) Deduplizierung samt Insight-Tag-Voraussetzung ·
(5) Rate-Limits und Batch · (6) Versionierung und Abschalttermin · (7) die
Kopfzeilen-Auflage `X-Restli-Protocol-Version` · (8) Zugangsdatum, Ablauf und Erneuerung ·
(9) das Browser-Tag. Der Abschnitt trägt **VIER Messprotokolle** (2026-08-15, 2026-08-17,
2026-08-19 samt Nachtrag), **DREI Lesungen** (2026-08-20, 2026-09-11, 2026-09-21) und die
Teile **(a) bis (am)**.

**ZAHLEN DER ACHSE, Auszug** (case-insensitiv über den Abschnitt): `Version` 161 · `Dedup`
40 · `Insight Tag` 22 · `rate` 13 · `202601` 10 · `eventId` 10 · `userIds` 9 · `lintrk` 9 ·
`PLAINTEXT` 8 · `SHA256` 5 · `IPv4` 4 · `Klick-Kennung` 3 · `LINKEDIN_FIRST_PARTY` 3 ·
`IPv6` 2 · `li_fat_id` 1.
**ECHTE NICHT-TREFFER auf derselben Achse:** `user_agent` · `userAgent` · `User-Agent` ·
`user agent` · `useragent` · `Browser-Kennung` · `eventSourceUrl` · `page url` ·
`sourceUrl` · `Seitenadresse` je **0**.
**FALSCH-POSITIVE, BENANNT:** `UA` zählt 8 und ist **restlos unecht** (aktualisiere ·
individually · January · Manual · qualified · Qualified · quality · quatschFeldXyz, einzeln
nachgesehen); `URL` zählt 2 und trifft zweimal einen anderen Zusammenhang (die Landing-URL
in Teil (i), das URN-Präfix in Teil (l)) — **nicht** ein Adressfeld der Nutzlast.
**POSITIVKONTROLLE im selben Lauf:** `userIds` 9 · `userInfo` 4 · `externalIds` 3 ·
`conversionHappenedAt` 3 — die Suche greift auf Nutzlast-Feldnamen, die Nullen oben sind
echte Nicht-Treffer.

**HERANGEZOGEN WURDEN AUSSERDEM GENAU ZWEI POSTEN aus docs/offene-punkte.md** — "DIE
LINKEDIN-VERSION DES ADAPTERS WIRD AM 15.01.2027 ABGESCHALTET — DANN SCHEITERT DER FORWARD
STILL" und "OB DAS LIVE VERWENDETE LINKEDIN-ZUGANGSDATUM ABLÄUFT, IST ERST AB MITTE OKTOBER
2026 ENTSCHEIDBAR"; keine weiteren. Jene Datei ist im Übrigen UNBERÜHRT.

**ARCHITEKTEN-ENTSCHEIDUNG 2026-09-22 — FÜR LINKEDIN LÄUFT EIN CRAWL, IN EINER EIGENEN
SITZUNG, BESCHRÄNKT AUF DIE LISTE** "Die Crawl-Liste für linkedin (2026-09-22)" im
Abschnitt "Offene Fragen an den Anbieter-Crawl" dieser Datei.
**DIE ERSTE HÄLFTE DES GETEILTEN VORGEHENS GILT ALS ERFÜLLT — UND DAS IST EINE AUSLEGUNG
DES ARCHITEKTEN, KEIN MESSWERT:** Der Pflicht-Stopp verlangt bei dichtem Ergebnis, dass
eine Sitzung festhält, was docs/ziel-befunde.md über das Ziel trägt, und eine ZWEITE
crawlt. Gelesen worden ist der **ABSCHNITT** im Volltext, nicht die **DATEI**. **DER GRUND
DER AUSLEGUNG:** Alles, was jene Datei über dieses Ziel trägt, steht in seinem Abschnitt.
**SIE STEHT HIER ALS AUSLEGUNG UND NICHT ALS ERFÜLLUNG DES WORTLAUTS** — wer sie auf ein
anderes Ziel überträgt, prüft zuerst, ob dessen Befunde ebenfalls sämtlich in seinem
Abschnitt stehen.

**KEIN BAU-COMMIT, UND DER GRUND IST DERSELBE WIE BEI P11.7-2 UND P11.7-4:** Die Runde hat
EIN Ziel von fünf berührt und keine Zeile Code geschrieben; ein Zuschnitt auf linkedin
allein bräche "KEIN ZUSCHNITT VOR DEM ANBIETER-CRAWL" für pinterest — und für linkedin
selbst steht der Crawl noch aus. Die einzigen Commits dieses Tages sind Doku-Commits.

**DER IPv4-RIEGEL UND SEIN GRUND — BEFUND, KEINE ENTSCHEIDUNG.** GEMESSEN am Code (CC,
2026-09-22, HEAD `2b28d7d`): `forwardToLinkedin` (`src/lib/capi/linkedin-forward.ts`)
bricht in Riegel 2 ab, wenn `isIpv4(clientIp)` falsch ist — **der GANZE Forward an linkedin
entfällt dann**, nicht bloss ein Feld, weil die Kennung das Pflicht-Paar trägt. Tragend sind
zwei Angaben aus docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)": die
Schnittstelle **prüft die FORM des Kennungs-Werts NICHT** (Teil (j), GEMESSEN 2026-08-17 —
der Wert "999.999.999.999" ergab 201, und die Empfangsanzeige zählte ihn MIT), und **beide
IP-Symbole unterstützen laut Doku nur IPv4** — `PLAINTEXT_IP_ADDRESS` (Teil (i), GELESEN
2026-08-17) und `SHA256_IP_ADDRESS` (Teil (aj), GELESEN 2026-09-11: "Currently, only IPv4
addresses are supported."). **OHNE DEN RIEGEL GINGE EIN IPv6-WERT ALS ERFOLG HINAUS UND
LIEFE INS LEERE; NICHTS WÜRDE ROT.**
Dass IPv6 überhaupt vorkommt, bleibt eine ANNAHME und wird nicht gehoben
(docs/claude-history/phase-11.1-linkedin.md, "DIE IPv6-ANNAHME", Owner 2026-08-18);
**IPv6 ist gegen die Schnittstelle NIE probiert worden** — Teil (j) sagt das ausdrücklich.
**DASS DIE BESCHRÄNKUNG BEIDE IP-SYMBOLE TRIFFT, IST EINE ABLEITUNG aus (i) und (aj)** und
steht in keinem Teil zusammengezogen: Ein Wechsel auf die gehashte Form löste das Problem
nicht.

**PROVENIENZ:** Alle Zählungen über den eigenen Bestand und die Code-Angaben sind GEMESSEN
am Repo (CC, 2026-09-22), je mit der genannten Achse. Die Anbieter-Angaben sind GELESEN bzw.
GEMESSEN am Anbieter, **je nach Teil** — Quelle, Stufe und Datum stehen je am Teil in
docs/ziel-befunde.md, **nicht hier**. Crawl-Beschluss und Auslegung sind eine
ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-22.

### VERMERK P11.7-6 — LinkedIn-Crawl vom 2026-09-22, BESCHRÄNKT (KEIN BAU)

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD bei Crawl und Ablage `75f4718` ("docs(claude):
11.7 — LinkedIn-Bestand abgelegt, Crawl-Liste") · Arbeitsbaum vor dem Crawl sauber
(`git status --short` leer) · **NEUN Seiten** geöffnet und gelesen · durchgehend
`textContent` über `<main>` und an der ENGLISCHEN Fassung, die Learn-Seiten in der Ansicht
`view=li-lms-2026-08` · **KEIN Aufruf gegen die Schnittstelle**, keine Anmeldung, keine
Eingabe, kein Download, keine Auszugsdatei · Werkzeug-Ablage VOR der ersten Navigation als
ignoriert belegt (`git check-ignore -v .playwright-mcp` → `.gitignore:28`).

**DIE FORM — DIE ZWEITE HÄLFTE DES GETEILTEN VORGEHENS.** Die erste Hälfte ist VERMERK
P11.7-5; `docs/ziel-befunde.md` ist in dieser Runde **NICHT vollgeladen** worden. Gelesen
wurde daraus GEZIELT der Block "Der gelesene Umfang (2026-09-11) — LinkedIn" samt seiner
Liste "GESEHEN, NICHT GEÖFFNET", weil dort die Seiten-Kürzel der Crawl-Liste aufgelöst
sind — sonst nichts. **DER CRAWL WAR AUF DIE LISTE BESCHRÄNKT**, wie die
ARCHITEKTEN-ENTSCHEIDUNG in P11.7-5 es vorsieht; ein voller Crawl des Conversions-Zweigs
hat NICHT stattgefunden.

**WOHIN DIE BEFUNDE GEGANGEN SIND — DER ZEIGER:** docs/ziel-befunde.md, Abschnitt
"LinkedIn (Conversions API)", Unterüberschrift "Abschnitts-Lesung 2026-09-22
(BESCHRÄNKTER CRAWL der Phase 11.7) — die Teile (an) bis (at)", dazu der Umfangs-Block
"Der gelesene Umfang (2026-09-22) — LinkedIn, Klick-Kennung und Version". **Sie stehen
NICHT hier.** Der Bestand ist wörtlich stehengeblieben: **NULL Löschzeilen**
(`git diff --numstat`: 413 / 0).

**STAND JE FRAGE DER CRAWL-LISTE — ALLE SECHS BEARBEITET, ZWEI TEILE BLEIBEN OFFEN:**

| Frage der Crawl-Liste | Stand | Teil |
|---|---|---|
| Format `li_fat_id` | **NICHT BEANTWORTET** — Nicht-Treffer mit benannter Reichweite über sechs Seiten | (an) |
| Cookie-Weg | **AUF DOKU-EBENE BEANTWORTET** — ja, gleichnamiger Cookie, Insight-Tag-Einbau vorausgesetzt | (an) |
| Haltedauer | **AUF DOKU-EBENE BEANTWORTET** — 30 Tage ab dem letzten Anzeigenklick | (an) |
| VERLANGT / EMPFOHLEN je Symbol | **AUF DOKU-EBENE BEANTWORTET**, mit einer berichteten Divergenz zu `SHA256_IP_ADDRESS` | (ao) |
| `externalIds` / `lead` / `userInfo` | **AUF DOKU-EBENE BEANTWORTET**, alle drei einzeln | (ap) |
| Antwortform bei abgeschaltetem Versions-Header | **GELESEN: 426 / `NONEXISTENT_VERSION`** — mit Endpunkt-Vorbehalt IM Befund | (ar) |
| Retry-Vorgabe nach 429 | **NICHT BEANTWORTET** — Nicht-Treffer mit Reichweite über drei Seiten, je mit Positivkontrolle | (as) |
| **Architekten-Frage: mehrere `userIds`** | **JA — auf Doku-Ebene zulässig UND empfohlen**, ohne genannte Obergrenze | (aq) |
| Versionen aktiv / Termin 202601 | **GELESEN: elf aktiv; 202601 → 15.01.2027, Active** | (at) |

**DIE ARCHITEKTEN-FRAGE IST BEANTWORTET, UND IHRE GRENZE GEHÖRT IN DEN VERMERK:** Der
Anbieter führt `userIds` als "List of **one or more** identifiers"; ein Beispiel derselben
Doku trägt VIER Einträge in EINEM Ereignis, darunter IP und Klick-Kennung nebeneinander.
**DAS IST EINE AUSSAGE ÜBER DIE ZULÄSSIGKEIT, NICHT ÜBER DIE ANNAHME AM ENDPUNKT.** Teil
(i) und Teil (n) protokollieren als GEMESSEN genau EINEN Eintrag; ein Ereignis mit ZWEI
Einträgen ist nie gesendet worden, und `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` gehört zu
den vier Symbolen, die überhaupt nie gesendet worden sind.

**DIE FÜNF MESSFRAGEN AUS "WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT" SIND UNBERÜHRT** und
bleiben sämtlich NICHT BEANTWORTET — der Crawl hatte sie nicht zum Gegenstand, und eine
Lesung erreicht sie nicht.

**KEIN BAU-COMMIT, UND DER GRUND IST DERSELBE WIE BEI P11.7-2, P11.7-4 UND P11.7-5:** Die
Runde hat EIN Ziel von fünf berührt und keine Zeile Code geschrieben; ein Zuschnitt auf
linkedin allein bräche "KEIN ZUSCHNITT VOR DEM ANBIETER-CRAWL" für pinterest. Die einzigen
Commits dieses Tages sind Doku-Commits.

**PROVENIENZ:** Alle Anbieter-Angaben sind **GELESEN** (Quelle, Seitenstand und Datum je
Angabe am Teil in docs/ziel-befunde.md, **nicht hier**), **keine ist gemessen**. DREI
Angaben in (ar) und (at) beschreiben den EIGENEN Code und sind GEMESSEN am Repo (CC,
2026-09-22, HEAD `75f4718`). Die Beschränkung des Crawls ist die ARCHITEKTEN-ENTSCHEIDUNG
aus P11.7-5.

### VERMERK P11.7-7 — Pinterest-Crawl vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD bei Crawl und Ablage `8cab827` ("docs(claude):
11.7 — LinkedIn-Crawl abgelegt, gemeinsame Bauform als Frage") · Arbeitsbaum vor dem Crawl
sauber (`git status --short` leer) · **DREIZEHN Seiten** geöffnet und gelesen · durchgehend
`textContent` und an der ENGLISCHEN Fassung — die Navigation der Seiten ist deutsch
lokalisiert, die Artikel-Rümpfe waren englisch · **KEIN Aufruf gegen die Schnittstelle**,
keine Anmeldung, keine Eingabe, kein Download, keine Auszugsdatei · Werkzeug-Ablage VOR der
ersten Navigation als ignoriert belegt (`git check-ignore -v .playwright-mcp` →
`.gitignore:28`).

**DIE FORM — GEZIELT, DANN DICHT, DANN VOLLTEXT DES ABSCHNITTS, UND DER CRAWL IN DERSELBEN
SITZUNG.** `docs/ziel-befunde.md` ist **NICHT vollgeladen** worden. Gefahren ist die
GEZIELTE SUCHE über den Abschnitt "Pinterest (Conversions API)" mit einer aus dem
GEGENSTAND gebildeten Achse (34 Begriffe, case-insensitiv) und Positivkontrolle — die
zweite Form, die CLAUDE.md, "## Anbieter-Befunde der Fan-Out-Ziele", seit dem 2026-09-22
für RECHERCHE zulässt. **WEIL DAS ERGEBNIS DICHT WAR — Treffer in sieben Zusammenhängen —,
IST DANACH DER ABSCHNITT IM VOLLTEXT GELESEN WORDEN, NUR ER, NICHT DIE DATEI.**
**DIE GETEILTE FORM WAR TROTZDEM NICHT NÖTIG, UND DAS IST EIN MESSWERT UND KEINE
LOCKERUNG:** Der Pinterest-Abschnitt ist **608 Zeilen / 42 874 Bytes** (GEMESSEN, CC,
2026-09-22) — der drittkleinste Ziel-Abschnitt der Datei. Bestand-Prüfung und Crawl passten
in EINE Sitzung. **DAMIT IST AUCH DIE FRAGE DES FÜNFTEN NACHZUGS IM ABSCHNITT "Nächster
Schritt" BEANTWORTET**, die die Grösse dieses Abschnitts ausdrücklich als "nicht erhoben"
führte.

**DIE FALSCH-POSITIVE, DIE SONST EINE DICHTE VORTÄUSCHT, WO KEINE IST:** `Version` zählt im
Abschnitt **78** Trefferzeilen und ist **fast restlos unecht** — 77 tragen das Teilwort in
"con**version**(s)", **genau EINE** ist echt (`pintrk.version`). Wer die 78 als Dichte
liest, hält eine Versions-Ablage für vorhanden, die es nicht gibt.

**WOHIN DIE BEFUNDE GEGANGEN SIND — DER ZEIGER:** docs/ziel-befunde.md, Abschnitt
"Pinterest (Conversions API)", Unterüberschrift "Abschnitts-Lesung 2026-09-22
(Anbieter-Crawl der Phase 11.7) — die Teile (ac) bis (ak)", dazu der Umfangs-Block "Der
gelesene Umfang (2026-09-22)". **Sie stehen NICHT hier.** Der Bestand ist wörtlich
stehengeblieben: **NULL Löschzeilen** (`git diff --numstat`: 454 / 0). **VIER ältere Teile
haben einen datierten VORBEHALT bekommen** — (e) zur dritten Rate-Limit-Zahl, (i) zu
Katalog-Frage I4, (o)/C1 zur Formatregel von `ad_account_id`, (o)/E1 zur Merkmalsliste;
ihr Wortlaut ist in allen vier Fällen unangetastet.

**STAND JE FRAGE — F1 BIS F4 UND F8; DIE TABELLE MIT DEN ZEIGERN STEHT IM ABSCHNITT "Offene
Fragen an den Anbieter-Crawl".** Auf Doku-Ebene beantwortet sind **F1, F2, F3 und F4**;
**F8 bleibt MESSFRAGE** — die Form der Erfolgsantwort ist jetzt gelesen, ihre Bestätigung
am eigenen Aufruf nicht.

**KEIN BAU-COMMIT, UND DER GRUND IST DERSELBE WIE BEI P11.7-2, P11.7-4, P11.7-5 UND
P11.7-6:** Die Runde hat EIN Ziel berührt und keine Zeile Code geschrieben. Die einzigen
Commits dieses Tages sind Doku-Commits.

**MIT DIESEM CRAWL SIND ALLE FÜNF ZIELE DURCHLAUFEN** — meta (P11.7-2), google aus dem
Bestand ohne Crawl (P11.7-3), tiktok (P11.7-4), linkedin beschränkt (P11.7-5 und P11.7-6)
und pinterest (dieser Vermerk). **DAS HEISST NICHT, DASS ALLES BEANTWORTET IST:** Was nur
ein Aufruf zeigt, steht je Ziel ausdrücklich als NICHT BEANTWORTET in der Ablage.

**PROVENIENZ:** Alle Anbieter-Angaben sind **GELESEN** (Quelle, Seitenstand und Datum je
Angabe am Teil in docs/ziel-befunde.md, **nicht hier**), **keine ist gemessen**. Die
Zählungen über den eigenen Bestand, die Abwesenheit eines Pinterest-Tags im ausgelieferten
Text sowie Endpunkt, Version und `evaluateSuccessBody` am Code sind GEMESSEN am Repo (CC,
2026-09-22, HEAD `8cab827`), je mit der genannten Achse.

### VERMERK P11.7-8 — Aufklärung am Code vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** Datum 2026-09-22 · HEAD vor, während und nach der Runde `a763716`
("docs(claude): 11.7 — Pinterest-Crawl abgelegt, alle fünf Ziele durchlaufen") ·
Arbeitsbaum vor und nach der Aufklärung sauber (`git status --short` leer) · **KEINE
Navigation, kein Browser-Werkzeug, keine Werkzeug-Ablage, keine fremde Seite** ·
`docs/ziel-befunde.md` **weder geladen noch durchsucht** und `docs/offene-punkte.md`
ebenso nicht — diese Runde war eine CODE-Aufklärung, kein Zuschnitt und keine
Anbieter-Recherche, der Pflicht-Stopp aus CLAUDE.md ist damit nicht ausgelöst.

**DIE LESBARKEIT DIESER DATEI IST JETZT EIN MESSWERT, KEINE VERMUTUNG:** Sie ist
**1 533 Zeilen / 121 091 Bytes** (GEMESSEN, CC, 2026-09-22) und wurde in dieser Runde
**vollständig gelesen, lückenlos von Zeile 1 bis 1 533**. Die Volllesung war ohne
Einschränkung leistbar.
**DIE ZAHL 1 578, DIE DER AUFTRAG ALS BISHER EINZIGEN BELEG NANNTE, IST NICHT DIE GRÖSSE
DIESER DATEI** — sie war eine frühere LESEGRENZE an einer ANDEREN Datei. Wer sie als
Schwelle für diese Datei liest, vergleicht zwei verschiedene Gegenstände. Der Messwert
oben ersetzt sie für diese Datei und für nichts sonst.

**KEIN BAU-COMMIT, UND DER GRUND IST EIN VIERTER NEBEN P11.7-1, P11.7-2 UND P11.7-3:**
Diese Runde war READ-ONLY am eigenen Code. Sie hat keine Zeile geschrieben, weil der
Abschnitt "Nächster Schritt" genau das verlangt — die Fragen AN DEN EIGENEN CODE werden
beantwortet, BEVOR zugeschnitten wird. Der einzige Commit dieses Tages ist ein
Doku-Commit (diese Datei).

**DIE ZEHN CODE-FRAGEN, JE EIN SATZ BEFUND UND FUNDSTELLE.** Alle Angaben GEMESSEN am
Repo (CC, 2026-09-22) bei HEAD `a763716`.

| # | Frage (Herkunft) | Befund | Fundstelle |
|---|---|---|---|
| C1 | TRANSIT-ONLY im Google-Transport (VERMERK P11.7-1, Tabellenzeile 5) | **AUF DER LOG-ACHSE EINGEHALTEN** — die fünf `console`-Zeilen des Transports führen Festtext, `built.reason`, `res.status` und `errorName(err)`, und der Antwort-RUMPF wird gar nicht erst gelesen | `google-forward.ts:252, 266, 294, 335, 341`; `google-payload.ts:177` (`GoogleBuildRejection` = genau ein Literal `"no_click_id"`) |
| C2 | Sendet jeder Adapter die Pflichtfelder seines Anbieters (ZUSCHNITT-FRAGE P11.7-3) | **VIER VON FÜNF JA; BEI META IST EINE LÜCKE** — `action_source` unbedingt, `client_user_agent` und `event_source_url` dagegen BEDINGT und ohne Riegel; für google **nicht entscheidbar** | `meta-forward.ts:310` gegen `:297` und `:317`; pinterest/tiktok mit Paar-Riegel, linkedin mit Identitäts-Riegel; s. ZUSCHNITT-FRAGE P11.7-22 |
| C3 | Trennt die TikTok-Fehlerdeutung `40100` von `40104` (ZUSCHNITT-FRAGE P11.7-11) | **IM LOG JA, IM KONTROLLFLUSS NEIN** — `code=` kommt aus dem RUMPF und bleibt unter der Schwärzungsgrenze; behandelt werden beide Fälle gleich, und ob die im Kopfkommentar gemeinten zwei dieselben sind, ist **ungeprüft** | `tiktok-forward.ts:272–293`, `:123`, `:428 f.`; `src/lib/redact.ts:68` (Schwärzung erst ab 20 Zeichen) |
| C4 | Welche Version sendet google, in welcher Form (ZUSCHNITT-FRAGE P11.7-13, google-Zeile) | **`v1`, INLINE IN EINER BENANNTEN ENDPUNKT-KONSTANTEN** — kein Env-Weg, aber anders als bei pinterest eine Konstante; der Bestands-Wert ist damit am Code bestätigt | `google-forward.ts:57 f.` `GOOGLE_INGEST_ENDPOINT` |
| C5 | Grösse von `docs/ziel-befunde.md` (ZUSCHNITT-FRAGE P11.7-8) | **9 994 Zeilen / 717 061 Bytes** — gegenüber der Angabe jener Frage um 1 177 Zeilen / 88 432 Bytes GEWACHSEN; die Frage ist damit **nicht beantwortet, sondern verschärft** | `wc -l` / `wc -c` auf `docs/ziel-befunde.md` |
| C6 | Steht der widerlegte Kopfkommentar noch (Vorrat P11.7-1) | **JA, UNVERÄNDERT** — alle drei Angaben weiterhin falsch, an HEAD gegengeprüft | `google-click-ids.ts:6–10`; Gegenprobe `google-forward.ts:279`, `ingest.ts:485` |
| C7 | Steht die Stufenangabe im LinkedIn-Kopf noch (Vorrat P11.7-3) | **JA, BEIDE STELLEN UNVERÄNDERT** — nicht nachgezogen | `linkedin-forward.ts:19` und `:364` |
| C8 | Steht die überholte Stellenzahl-Begründung noch (Vorrat P11.7-4) | **JA, UNVERÄNDERT** | `pinterest-forward.ts:567 f.` |
| C9 | Was übergibt `forwardToGoogle` heute (ZUSCHNITT-FRAGE P11.7-6) | **NUR DIE KLICK-KENNUNGEN** — bestätigt; weder `clientIp` noch `userAgent` erreichen den Adapter, sie enden an der Signatur. WELCHER der zwei Anbieter-Orte passt, ist am Code **nicht entscheidbar** | `google-forward.ts:277–291`; `ingest.ts:485–495` |
| C10 | Wie viele `userIds`-Einträge, was tut der IPv4-Riegel (ZUSCHNITT-FRAGEN P11.7-14, P11.7-16) | **GENAU EIN EINTRAG; BEIDE RIEGEL KEHREN VOR DEM `fetch` ZURÜCK** — der Befund aus VERMERK P11.7-5 ist an HEAD bestätigt | `linkedin-forward.ts:394`, `:402`; Wächter `linkedin-forward.test.ts` T1-a |

**AUSGESCHLOSSEN ALS MESSFRAGEN, je mit Nummer — sie verlangen einen Aufruf gegen einen
Anbieter, und kein Code beantwortet sie:** F1 (je Ziel der Teil "nimmt der Endpunkt den
Wert fachlich an") · **F4** an allen fünf Zielen · **F5** · **F6** · **F7** (welches Limit
tatsächlich greift) · **F8** · ZUSCHNITT-FRAGE **P11.7-10** · ZUSCHNITT-FRAGE **P11.7-21**
· die FÜNF Messfragen aus "WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT".

**TEILMESSUNG ZU C1 FÜR EINEN POSTEN AUSSERHALB DIESER DATEI — UND SIE IST AUSDRÜCKLICH
KEINE ERLEDIGUNG.** Der Posten "DIE PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST
TOT" (docs/offene-punkte.md) verlangt eine Messung am gebauten Google-Transport auf
**ABLAGE UND LOGAUSGABE**. Davon ist hier erhoben:
· **DIE LOG-ACHSE, VOLLSTÄNDIG:** alle `console`-Aufrufe im Produktivcode unter `src/` —
  92 verfolgte `.ts`/`.tsx`-Dateien ohne `.test.` (`git ls-files`), Kommentarzeilen
  ausgesondert, **81 echte Aufrufe**. POSITIVKONTROLLE: die Achse trifft in allen fünf
  Adaptern. Der Google-Transport trägt fünf davon, keiner führt einen Wert (s. C1).
· **DIE ANALYTICS-ABLAGE:** `persistEvent` (`src/lib/analytics/persist.ts`) schreibt fünf
  Werte, keiner ist eine Kennung — der Befund aus VERMERK P11.7-1 (f) ist bestätigt.
· **OFFEN BLEIBEN DIE ÜBRIGEN SCHREIBPFADE.** Sie sind in dieser Runde **nicht** erhoben,
  und die Teilmessung deckt sie nicht.
**DER POSTEN SELBST IST IN DIESER RUNDE NICHT ANGEFASST WORDEN** — docs/offene-punkte.md
lag ausserhalb des Scopes. **SEIN NACHZUG GEHÖRT ZUR BAU-SCHEIBE**, wie der Abschnitt
"Was den Zuschnitt bindet" es vorsieht; wer ihn früher schliesst, schliesst ihn auf einer
halben Messung.

**DER TESTBESTAND JE ADAPTER — GRUNDLAGE DER SPÄTEREN MUTATIONSPROBEN.** Eine Zeile je
Adapter, erschöpfende Wächter (`toEqual` auf die geänderte Ebene) und Lücken getrennt.
Gemeint sind ausschliesslich die Läufe, die **Match-Felder, Adressfeld oder Endpunkt**
prüfen — also das, was diese Phase ändern würde.

| Adapter | ERSCHÖPFEND | DANEBEN | LÜCKE |
|---|---|---|---|
| **meta** | **KEINER** | `route.test.ts:109–118` (volle URL, `action_source`, `event_source_url`, drei `user_data`-Felder, je Einzel-Assertion), `:176–205` (IP-Auflösung), `ingest.test-mode.test.ts:337/355` | **KEIN erschöpfender Nutzlast-Wächter** (ein zusätzliches `user_data`-Feld wird nicht rot) · **kein Lauf prüft die ABWESENHEIT** von `client_user_agent`/`event_source_url` · **der Vorgabewert der Version ist ungedeckt** (s. ZUSCHNITT-FRAGE P11.7-23). `meta-forward.test.ts` prüft **ausschliesslich den Fehlerpfad** |
| **pinterest** | **T8** — `sentEvent().user_data` per `toEqual` | T6/T7 (Paar-Riegel), T15 (`action_source === "web"`), T15b (Pflichtfelder, Einzel-Assertions), T15c (Abwesenheiten), T16/T16b (volle URL inkl. `/v5/`, Pfad-Kodierung), T17/T17a2/T17b | **`event_source_url` ist von KEINEM Lauf gedeckt** — im ganzen Repo prüft es nur `route.test.ts:114`, und dort für meta |
| **tiktok** | **T10** — `sentEvent().user` per `toEqual`; **T15** — `ev.page` per `toEqual` | T8/T9 (Paar-Riegel), T15 (`event_source`, `event_source_id`, `data`-Länge, `properties` per `toEqual`), T17 (volle URL inkl. `v1.3`) | keine auf dieser Achse |
| **linkedin** | **T1-a** — `sentPayload()` per `toEqual` auf die **GANZE** Nutzlast (jedes zusätzliche Feld und jeder zweite `userIds`-Eintrag wird rot) | T1-b (URN dieses Ereignisses), T1-c (`LinkedIn-Version`, `Authorization`), T2-a bis T2-f (Riegel, IPv4, kein Konfigurationswert im Log) | **der ENDPUNKT ist von keinem Lauf gedeckt** — die Tests greifen nur auf `fetchCalls()[0][1]` (s. ZUSCHNITT-FRAGE P11.7-23) |
| **google** | **GF-1** — `gesendet()` per `toEqual` auf die **GANZE** Nutzlast, dazu `url` per `toBe` auf die volle Adresse inkl. `/v1/` | GF-2 (Zugangsdatum nur in der Kopfzeile), GF-5, GF-1b, GF-3/GF-4/GF-4b (drei Riegel), **GF-7 und GF-7b** (TRANSIT-ONLY, mit Positivkontrolle), GF-6, GF-8; `google-payload.test.ts` je Kennung, `google-click-ids.test.ts` für die Extraktion | keine auf dieser Achse |

**PROVENIENZ:** Alle Befunde dieses Vermerks sind **GEMESSEN am Repo** (CC, 2026-09-22)
bei HEAD `a763716`, je mit der am Befund genannten Achse oder Fundstelle. **KEINE Angabe
stammt von einem Anbieter**, und in dieser Runde ist **keine fremde Quelle gelesen**
worden. Die Einordnung "nicht am Code entscheidbar" bei C2 (google), C3 (zweite Hälfte)
und C9 (zweite Hälfte) ist eine ABLEITUNG aus dem Fehlen einer Fundstelle, keine Messung
an einem Anbieter.

## Entscheidungen, die über ihre Scheibe hinaus binden

**SIE STEHEN HIER ALS ZEIGER, NICHT ALS KOPIE.** Ihr Ort ist der, an dem sie wirken;
zweimal geschrieben liefen sie auseinander.

**P11.7-1 — GOOGLE GEHÖRT NUR ZUM FÜNFTEN PUNKT DER PHASE.**
Ort: docs/roadmap.md, Roadmap-Zeile 11.7, ERWEITERUNG VOM 2026-09-22.
Sie bindet jede Runde, die einen der fünf Punkte zuschneidet: Die vier Punkte vom
2026-08-20 bleiben bei ihren vier Zielen, der fünfte meint ALLE gebauten.

**P11.7-2 — DIE REICHWEITE DER DRITTEN DATENKLASSE.**
Ort: docs/offene-punkte.md, Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE",
BLOCK VOM 2026-09-22, Teil (E2).
Sie bindet jede Runde, die eine fremdvergebene Kennung anfasst — `fbc` gleich welchen
Trägers und `fbp` samt gleichartigen Tag-Kennungen fallen unter TRANSIT-ONLY; eine vom
Produkt selbst gesetzte Kennung NIE.

**P11.7-3 — EINE KLICK-KENNUNG GEHT NUR AN IHREN URHEBER.**
Ort: ebenda, Teil (E3).
Sie bindet jeden Adapter und jede Nutzlast. **DER HEUTIGE CODE VERLETZT SIE** — das steht
am Ort der Entscheidung und wird hier nicht abgeschwächt. Umsetzung erst nach dem Crawl:
ob ein Anbieter Kennungen aus der Seitenadresse SELBST ausliest, entscheidet die Gestalt
und ist ungemessen.

**P11.7-4 — DAS ABLAGE- UND LOG-VERBOT GILT FÜR DEN USER-AGENT WIE FÜR DIE IP.**
Ort: ebenda, Teil (E4).
Sie bindet jede Runde, die einen Schreibpfad oder eine Logzeile anlegt.

## Vorrat (gemeldet, nicht gebaut)

**P11.7-1 — DER KOPFKOMMENTAR VON `src/lib/capi/google-click-ids.ts` IST WIDERLEGT.**
Er sagt in seinen Zeilen 6 bis 10: *"SIE HAT IM PRODUKTIVCODE HEUTE KEINEN AUFRUFER, und
das ist der Zuschnitt und kein Versehen: 'google' steht nicht in TRACKING_TARGETS
(lib/settings.ts), es gibt also weder einen Empfaenger noch einen Eintrag im Fan-Out."*
**ALLE DREI ANGABEN TREFFEN NICHT MEHR ZU — GEMESSEN am Repo (CC, 2026-09-22, HEAD
`9abdd2a`):** `extractGoogleClickIds` hat GENAU EINEN Aufrufer im Produktivcode,
`forwardToGoogle` (src/lib/capi/google-forward.ts, Import Zeile 2, Aufruf Zeile 279) ·
`TRACKING_TARGETS` (src/lib/settings.ts) führt `"google"` · `TARGETS_WITH_ADAPTER`
(src/lib/tracking/target-adapters.ts) führt es ebenso, und `FORWARDER_BY_TARGET`
(src/lib/capi/ingest.ts) trägt den Eintrag.
**DAS IST NICHT NEU UND DOCH NICHT GEFÜHRT:** Der Posten "DIE PRÄMISSE VON PUNKT (a) DES
DATENKLASSEN-BLOCKS IST TOT" (docs/offene-punkte.md) hält dieselben zwei Widerlegungen
seit dem 2026-09-08 fest — **aber über den DOKU-Satz, nicht über den KOMMENTAR IM CODE.**
Dass der Kommentar die widerlegte Aussage bis heute trägt, steht nirgends.
**KEINE EMPFEHLUNG**, ob er nachgezogen oder gestrichen wird.
TRIGGER: die erste Bau-Scheibe dieser Phase, die eine Google- oder Kennungs-Datei berührt;
spätestens das Phasenende.

**ZUSATZ 2026-09-22 — AM CODE BEANTWORTET, s. VERMERK P11.7-8, Zeile C6.** Der Wortlaut
oben bleibt unverändert. Nachgezogen ist allein der STAND: Der Kommentar steht an HEAD
`a763716` **unverändert** in den Zeilen 6 bis 10, und alle drei seiner Angaben sind dort
erneut widerlegt. **DER TRIGGER IST DAMIT NICHT EINGELÖST** — gemessen ist, DASS er
dasteht, nicht dass er nachgezogen wäre. **KEINE EMPFEHLUNG**, unverändert.

**P11.7-2 — DER HALBSATZ AN DER ROADMAP-ZEILE 11.9 TRÄGT SEIT P11.7-2 DIE ENGERE
BESCHREIBUNG DER DRITTEN DATENKLASSE.**
Er lautet: *"Sie gilt fremdvergebenen KLICK-Kennungen, nicht einer selbst gesetzten
Besucher-Kennung."* Seit der Entscheidung P11.7-2 deckt die Klasse auch `fbp`, und das ist
KEINE Klick-Kennung. **SEINE SCHLUSSFOLGERUNG BLEIBT RICHTIG** — die selbst gesetzte
Besucher-Kennung ist weiterhin nicht gedeckt, und genau darauf stützt die Zeile 11.9 ihre
Aussage. **UNVOLLSTÄNDIG IST SEINE AUFZÄHLUNG.**
Er ist am 2026-09-22 BEWUSST NICHT angefasst worden: Der Auftrag jenes Tages nannte als
Ort der Entscheidungen ausschliesslich docs/offene-punkte.md, und ein nachgezogener
Halbsatz machte aus einem Zeitdokument eine Behauptung über heute. Die Auflösung steht am
Ort der Entscheidung.
**KEINE EMPFEHLUNG.**
TRIGGER: die nächste Runde, die die Roadmap-Zeile 11.9 ohnehin öffnet — also der Zuschnitt
von GA4.

**P11.7-3 — DER KOPFKOMMENTAR VON `src/lib/capi/linkedin-forward.ts` FÜHRT DIE ABWESENHEIT
EINES USER-AGENT-FELDES ALS GEMESSEN, UND DIE ZITIERTEN TEILE TRAGEN DAS NICHT.**
Er sagt an der Signatur von `forwardToLinkedin`: *"Die Nutzlast dieses Anbieters kennt KEIN
Feld dafuer (GEMESSEN, Teile (a), (i), (n))"*, und in der Abweichungsliste seines Kopfes:
*"ES GIBT KEIN FELD FUER DEN USER-AGENT."* **Die Buchstaben meinen den Abschnitt "LinkedIn
(Conversions API)" in docs/ziel-befunde.md.**
**WAS DIE DREI GENANNTEN TEILE TRAGEN — GEMESSEN am Text (CC, 2026-09-22):** Teil (a) misst
die Pflicht-FORM (ein Paar aus Kennungs-TYP und Kennungs-WERT, beide Pflicht) und die
Ablehnung eines Feldes ausserhalb dieses Musters; Teil (i) misst die ANNAHME eines Symbols;
Teil (n) misst eine ANGENOMMENE Nutzlast und zieht die Grenze selbst — "Gemessen ist eine
ANGENOMMENE Nutzlast, KEIN Schema." **KEINER DER DREI ERWÄHNT EINEN USER-AGENT.**
**DER GANZE ABSCHNITT ERWÄHNT IHN NICHT** — GEMESSEN (CC, 2026-09-22, über den
vollständigen Abschnitt): `user_agent` · `userAgent` · `User-Agent` · `user agent` ·
`useragent` · `Browser-Kennung` je 0 Treffer; die 8 Treffer auf `UA` sind restlos unecht.
Positivkontrolle im selben Lauf: `userIds` 9 · `Insight Tag` 22.
**DIE AUSSAGE IST DAMIT EINE ABLEITUNG AUS EINER GEMESSENEN FELDLISTE, KEIN GEMESSENER
NICHT-TREFFER AUF DEN USER-AGENT.** Sie ist deshalb nicht falsch — sie trägt eine höhere
Provenienz-Stufe, als ihre Quelle hergibt.
**WAS DER KOMMENTAR DANEBEN FÜHRT UND WAS DIESER POSTEN NICHT BERÜHRT:** dass der Adapter
den User-Agent gar nicht erst entgegennimmt, ist eine Entscheidung mit eigenem Grund ("ein
Beacon ohne User-Agent-Kopfzeile ist fuer DIESES Ziel vollstaendig"), und der Eintrag in
`FORWARDER_BY_TARGET` reicht ein Argument weniger weiter.
**KEINE EMPFEHLUNG**, ob die Stufenangabe nachgezogen oder der Verweis erweitert wird.
TRIGGER: die erste Bau-Scheibe dieser Phase, die diese Datei berührt; spätestens das
Phasenende.

**ZUSATZ 2026-09-22 — AM CODE BEANTWORTET, s. VERMERK P11.7-8, Zeile C7.** Der Wortlaut
oben bleibt unverändert. Nachgezogen ist allein der STAND: **BEIDE** Stellen stehen an
HEAD `a763716` unverändert — `linkedin-forward.ts:19` ("ES GIBT KEIN FELD FUER DEN
USER-AGENT") und `:364` ("kennt KEIN Feld dafuer (GEMESSEN, Teile (a), (i), (n))"). Die zu
hohe Stufenangabe ist nicht nachgezogen. **KEINE EMPFEHLUNG**, unverändert.

**P11.7-4 — DER KOPFKOMMENTAR DER URL-BILDUNG IN `src/lib/capi/pinterest-forward.ts`
BEGRÜNDET DEN VERZICHT AUF EINE FORMATPRÜFUNG MIT EINER UNGEPRÜFTEN STELLENZAHL — DIE
ENDPUNKT-REFERENZ FÜHRT JETZT EINE FORMATREGEL.**
Er sagt über der Bildung der Adresse: *"SIE PRUEFT NICHTS, UND DAS IST RICHTIG SO: Eine
Formatpruefung machte die ungepruefte Stellenzahl aus dem Anbieter-Konto zur Bedingung."*
**DIE STELLENZAHL IST NICHT MEHR UNGEPRÜFT — GELESEN 2026-09-22** (docs/ziel-befunde.md,
Abschnitt "Pinterest (Conversions API)", Teil (aj)): Die Endpunkt-Referenz führt den
Pfad-Parameter `ad_account_id` als `string`, `required`, mit `<= 18 characters` und dem
Muster `^\d+$`.
**DER KOMMENTAR IST DAMIT NICHT FALSCH GEWORDEN, UND DAS IST DER PUNKT:** Seine
SCHLUSSFOLGERUNG — nicht zu prüfen — steht unberührt; überholt ist die TATSACHENANGABE, auf
die er sie stützt. Es ist dieselbe Figur wie bei den zwei Kommentar-Befunden darüber:
docs/immer-beachten.md, "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD —
UND DAS FÄLLT NIEMANDEM AUF, WEIL DIE REGEL WEITER STIMMT".
**WAS DIESER POSTEN AUSDRÜCKLICH NICHT SAGT:** dass eine Formatprüfung zu bauen wäre. Die
Uneinheitlichkeit der Doku-Beispiele (zwölf und achtzehn Stellen, Teil (o)/C1) besteht
fort, und **beide erfüllen `<= 18` und `^\d+$`** — die gelesene Regel widerlegt jene
Beobachtung also nicht.
**KEINE EMPFEHLUNG**, ob der Kommentar nachgezogen, sein Grund ersetzt oder er
stehengelassen wird. **KEIN FIX-VORSCHLAG.**
TRIGGER: die erste Bau-Scheibe dieser Phase, die diese Datei berührt; spätestens das
Phasenende.

**ZUSATZ 2026-09-22 — AM CODE BEANTWORTET, s. VERMERK P11.7-8, Zeile C8.** Der Wortlaut
oben bleibt unverändert. Nachgezogen ist allein der STAND: Die Begründung steht an HEAD
`a763716` unverändert in `pinterest-forward.ts:567 f.`, mitsamt der überholten
Tatsachenangabe über die "ungepruefte Stellenzahl". **KEINE EMPFEHLUNG**, unverändert.

## Offene Fragen an den Anbieter-Crawl

**FRAGEN, KEINE ANTWORTEN.** Kein Eintrag hier behauptet etwas über einen Anbieter. Wer
den Crawl fährt, beantwortet sie je Ziel und legt die Antworten in docs/ziel-befunde.md
ab — NICHT hier; diese Datei trägt keine Anbieter-Befunde.

**JE ZIEL (meta · pinterest · tiktok · linkedin · google):**

**F1 — DIE KLICK-KENNUNG:** Wie heisst sie? Woher kommt sie — aus einem PARAMETER DER
ADRESSE oder aus einem COOKIE, das das Tag des Anbieters setzt? Welches FORMAT hat sie,
und wie wird sie gebildet, falls sie aus einem Parameter abgeleitet werden muss?

**F2 — DER ORT IN DER NUTZLAST:** In welchem Feld erwartet der Anbieter sie? Auf welcher
Ebene?

**F3 — ALLE NICHT-PERSONENBEZOGENEN MATCH-FELDER, DIE DER ANBIETER ANNIMMT**, je einzeln
mit der Angabe **VERLANGT oder EMPFOHLEN**. Diese Unterscheidung ist der Grund, warum die
Frage so gestellt ist: Sie entscheidet, ob ein fehlendes Feld ein Defekt oder eine
Einbusse ist, und sie ist heute für KEIN Ziel erhoben.
**AUSGENOMMEN:** E-Mail und Telefon und alles übrige Personenbezogene — sie gehören
ausdrücklich NICHT zu dieser Phase.

**F4 — LIEST DER ANBIETER KENNUNGEN AUS DER SEITENADRESSE SELBST AUS?** Also aus dem Feld,
in dem wir ihm heute `eventSourceUrl` übergeben. **DIESE FRAGE ENTSCHEIDET DIE UMSETZUNG
VON P11.7-3:** Liest er selbst aus, ist das Weglassen eines Parameters etwas anderes als
das Weglassen eines benannten Feldes — und die Reparatur der unbenannten Durchleitung
sieht je nach Antwort verschieden aus.

**DIE VIER BESTEHENDEN PUNKTE DER ZEILE — unverändert seit dem 2026-08-20:**

**F5 — TIKTOK, DEDUPLIZIERUNG** (Katalog H2): Der Adapter sendet `event_id`; was tut der
Anbieter damit? Bei LinkedIn hat dieselbe Lücke ergeben, dass die Zusage NICHT zutrifft,
bei Pinterest, dass sie ZUTRIFFT. Für TikTok unentschieden.

**F6 — META, VERSIONSANGABE** (Katalog B2): Bedient der Anbieter `META_GRAPH_VERSION`
(src/lib/capi/config.ts, Vorgabewert `v21.0`) noch?

**F7 — RATE-LIMITS** (Katalog H3) für meta, tiktok und linkedin. NICHT zu verwechseln mit
dem Per-Tenant-Rate-Limiting auf /api/e und /api/capi: jenes begrenzt, was ZU UNS
hereinkommt, dieses, was der ANBIETER von uns annimmt.

**F8 — PINTEREST, ERFOLGSRUMPF** (Katalog G1): Die EINZIGE der vier, die eine MESSUNG
verlangt — `evaluateSuccessBody` (src/lib/capi/pinterest-forward.ts) entscheidet auf
dieser Grundlage über Erfolg oder Fehlschlag.

**STAND NACH DEM META-CRAWL (2026-09-22) — KEINE FRAGE IST GESTRICHEN, UND KEINE IST FÜR EIN
ANDERES ZIEL BERÜHRT.** Die Formulierungen oben bleiben wörtlich; nachgezogen ist allein der
STAND, und zwar je Frage nur für **meta**. Für pinterest, tiktok, linkedin und google steht
jede der Fragen F1 bis F4 **unverändert offen** — der Crawl hatte sie nicht zum Gegenstand.
Zeiger gehen sämtlich nach docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)":

| Frage | Stand für meta | Zeiger |
|---|---|---|
| F1 Klick-Kennung | **AUF DOKU-EBENE BEANTWORTET.** Name `fbc`; ZWEI Bildungswege (Cookie `_fbc` des Meta-Pixels · `fbclid` aus der Adresse); Format `fb.{subdomainIndex}.{creationTime}.{fbclid}`, Zeitanteil = Ablage bzw. erste Beobachtung in Millisekunden. **MESSUNG OFFEN:** ob der Endpunkt den Wert fachlich annimmt. | Teil (h) |
| F2 Ort in der Nutzlast | **AUF DOKU-EBENE BEANTWORTET.** `fbc` und `fbp` INNERHALB `user_data`; `event_source_url` und `action_source` daneben auf Ereignis-Ebene. | Teile (h), (i), (l) |
| F3 Match-Felder, verlangt/empfohlen | **AUF DOKU-EBENE BEANTWORTET, und die Trennung ist explizit.** VERLANGT für Website-Ereignisse: `action_source`, `event_source_url`, `client_user_agent` — **das ist die ganze Pflicht-Liste.** Alles Übrige EMPFOHLEN, mit der Folge am Event Match Quality. Dazu die vollständige Parameter-Liste mit Hash-Status und die vier UNGÜLTIGEN Kombinationen. | Teile (k), (l), (m), (n) |
| F4 liest der Anbieter aus der Adresse selbst? | **NICHT BEANTWORTET — DIE DOKU SCHWEIGT.** Nicht-Treffer mit benannter Reichweite über neun Seiten; positiv steht dort nur, dass der Werbetreibende `fbclid` SELBST auslesen und formatieren soll. **MESSUNG OFFEN**, und sie entscheidet die Gestalt von P11.7-3. | Teil (q) |
| F6 Versionsangabe | **AUF DOKU-EBENE NICHT ENTSCHIEDEN — ZWEI TABELLEN.** Graph-Tabelle: `v21.0` bis 2027-01-21. Marketing-Tabelle: `v21.0` nicht geführt. Welche für `/{PIXEL_ID}/events` gilt, sagt keine gelesene Seite. **MESSUNG OFFEN.** Die Frist daraus steht im Abschnitt "Frist mit Termin". | Teile (s), (t) |
| F7 Rate-Limits (Meta-Anteil) | **AUF DOKU-EBENE BEANTWORTET, mit einer Aussage, die kein Limit nennt:** "There is no specific rate limit for the Conversions API", gezählt als Marketing-API-Aufruf, einzige genannte Grenze 1 000 Ereignisse je Anfrage; allgemein unter Business-Use-Case-Limits. **MESSUNG OFFEN:** welches Limit tatsächlich greift — das zeigen erst die Nutzungs-Kopfzeilen einer echten Antwort. Für tiktok und linkedin **unverändert offen.** | Teil (u) |

**F5 (tiktok) UND F8 (pinterest) SIND VOM META-CRAWL NICHT BERÜHRT** und stehen unverändert.

**STAND FÜR GOOGLE NACH DER BESTANDSAUFNAHME (2026-09-22, VERMERK P11.7-3) — KEINE FRAGE IST
GESTRICHEN, UND KEINE IST FÜR EIN ANDERES ZIEL BERÜHRT.** Die Formulierungen von F1 bis F4
bleiben wörtlich; nachgezogen ist allein der STAND, und zwar je Frage nur für **google**. Für
pinterest, tiktok und linkedin steht jede der vier **unverändert offen**. **ALLE ZEIGER GEHEN
NACH docs/ziel-befunde.md, ABSCHNITT "Google (Google Ads Conversions · GA4)"** — die
Buchstaben dieser Tabelle meinen NICHT den Meta-Abschnitt.

| Frage | Stand für google | Zeiger |
|---|---|---|
| F1 Klick-Kennung | **AUS DEM BESTAND BEANTWORTET** — Namen, Bildung, Ort und die Pflicht-Tabelle, die sie von den Floodlight-Kennungen trennt; die Feldliste ist dort ausdrücklich als ABSCHLIESSEND belegt. **EINE LÜCKE BLEIBT: DIE SCHREIBUNG DER PARAMETER, AUS DENEN SIE STAMMEN.** Sie liegt im Auto-Tagging, nicht im Transport, und ist als Posten "DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH AUF NICHTS GELESENES" in docs/offene-punkte.md geführt, der dafür eine MESSUNG an einem echten Anzeigen-Klick verlangt. | Teile (m)/E1, (w)/E1, (l)/D5, (cc)(c) |
| F2 Ort in der Nutzlast | **AUS DEM BESTAND BEANTWORTET** — DREI Orte, deren Trennung dort als wesentlicher bezeichnet ist als die Liste selbst, dazu die Hülle mit Pflicht-Annotationen. | Teile (m)/E1, (l)/D1, (w)/D1 |
| F3 Match-Felder, verlangt/empfohlen | **AUS DEM BESTAND BEANTWORTET — MIT EINEM WIDERSPRUCH, DER DORT ALS SOLCHER GEFÜHRT UND NICHT AUFGELÖST IST:** Der Leitfaden verlangt mindestens ein Identitätsmerkmal, die Referenz sagt "alle Optional" und kennt zugleich `NO_IDENTIFIERS_PROVIDED`. **WER DIE TRENNUNG VERLANGT/EMPFOHLEN BRAUCHT, LIEST BEIDE SEITEN.** | Teile (w)/E1, (m)/E2, (m)/E3, (m)/E4, (l)/D5, (cc)(c); Widerspruch: (w)/E3 mit Zeiger auf (u) Frage 3 und (r) Widerspruch 1 |
| F4 liest der Anbieter aus der Adresse selbst? | **DIE FRAGE STELLT SICH FÜR GOOGLE ANDERS — IM GELESENEN TRANSPORT GIBT ES KEIN FELD FÜR DIE SEITENADRESSE.** NICHT-TREFFER mit benannter Reichweite (Achse und Suchraum: VERMERK P11.7-3); in keiner der drei Feldlisten kommt ein URL-Feld vor. Die einzigen zwei Vorkommen von "landing page URL" sagen das Umgekehrte: **WIR** sollen auslesen. **DAS IST EINE AUSSAGE ÜBER DEN BESTAND, NICHT ÜBER DEN ANBIETER.** Dazu: der Adapter übergibt `eventSourceUrl` gar nicht an google (VERMERK P11.7-1 (d)). | Teile (l)/D2, (w)/E1, (cc)(c) |

**EINE ANGABE, DIE ZU KEINER DER FRAGEN GEHÖRT UND HIER STEHT, DAMIT NIEMAND SIE VERMUTET:**
Für die benutzte Schnittstelle ist **KEINE ABSCHALTREGEL DOKUMENTIERT** — der Bestand
kennzeichnet das ausdrücklich als NICHT-TREFFER und **keine Zusage**, dass `v1` unbefristet
trägt. **ES GIBT FÜR GOOGLE ALSO KEIN GEGENSTÜCK ZUR META-FRIST** im Abschnitt "Frist mit
Termin". Zeiger: Teil (cm).

**STAND FÜR TIKTOK NACH DEM CRAWL (2026-09-22, VERMERK P11.7-4) — KEINE FRAGE IST
GESTRICHEN, UND KEINE IST FÜR EIN ANDERES ZIEL BERÜHRT.** Die Formulierungen von F1 bis F5
und F7 bleiben wörtlich; nachgezogen ist allein der STAND, und zwar je Frage nur für
**tiktok**. Für pinterest und linkedin steht jede unverändert offen. **ALLE ZEIGER GEHEN
NACH docs/ziel-befunde.md, ABSCHNITT "TikTok (Events API 2.0)"** — die Buchstaben dieser
Tabelle meinen weder den Meta- noch den Google-Abschnitt.

| Frage | Stand für tiktok | Zeiger |
|---|---|---|
| F1 Klick-Kennung | **AUF DOKU-EBENE BEANTWORTET.** Name `ttclid`; DREI Herkunftswege (Parameter der Adresse · gleichnamiges First-Party-Cookie des TikTok-Pixels · selbst auslesen und ablegen, empfohlene Haltedauer 28 Tage); kein Format genannt, aber bis 1 000 Zeichen; EMPFOHLEN, nicht verlangt. **MESSUNG OFFEN:** ob der Endpunkt den Wert fachlich annimmt. | Teil (j) |
| F2 Ort in der Nutzlast | **AUF DOKU-EBENE BEANTWORTET.** `user.ttclid` und `user.ttp` INNERHALB des `user`-Objekts; `page.url` daneben auf Ereignis-Ebene. | Teile (j), (k), (m) |
| F3 Match-Felder, verlangt/empfohlen | **AUF DOKU-EBENE BEANTWORTET — MIT EINER DIVERGENZ, DIE BERICHTET UND NICHT AUFGELÖST IST:** Pflicht ist das `user`-OBJEKT, kein einzelnes Merkmal darin; die Web-Seite markiert `user` und `page` als Required, die Parameter-Seite tut es für `user` nicht. Dazu die vollständige Feldliste, zwei Symbol-Tabellen und `external_id` als einziger selbst erzeugter Wert. | Teil (l) |
| F4 liest der Anbieter aus der Adresse selbst? | **JA, AUF DOKU-EBENE UND WÖRTLICH:** "The API backend will parse the Click ID if it detects the presence of a ttclid parameter in the page.url." Gilt für `ttclid`; über FREMDE Kennungen im Adressfeld schweigt die Doku (Nicht-Treffer mit benannter Reichweite). **MESSUNG OFFEN.** | Teil (m) |
| F5 Deduplizierung | **AUF DOKU-EBENE BEANTWORTET.** Schlüssel `[event_source_id, event, event_id]`; Verwurf späterer Dubletten binnen **48 Stunden**, Verschmelzung binnen **5 Minuten**; gegen Browser-Pixel UND Events API. Ein ZWEITER Weg über `_ttp` greift nur OHNE `event_id` und verwirft nie ein Browser-Ereignis. **MESSUNG OFFEN.** | Teil (n) |
| F7 Rate-Limits (TikTok-Anteil) | **AUF DOKU-EBENE BEANTWORTET UND BEZIFFERT:** `/event/track/` QPS 1 000 · QPM 600 000 · QPD 86 400 000, auf allen vier Stufen gleich, Bezug ist die Entwickler-Anwendung; Überschreitung → `40100` mit **HTTP 401**. Daneben: höchstens 1 000 Ereignisse je Anfrage. Für linkedin **unverändert offen.** | Teil (o) |

**EINE ANGABE, DIE ZU KEINER DER FRAGEN GEHÖRT UND HIER STEHT, DAMIT NIEMAND SIE VERMUTET:**
Der Adapter sendet `v1.3`, und das ist die AKTUELLE Fassung; die Tabelle des Anbieters führt
sie mit "Available until: **TBD**". **EIN ABLAUF SCHLÜGE LAUT FEHL** — anders als bei meta,
wo still auf die nächste brauchbare Version umgeleitet wird. **ES GIBT FÜR TIKTOK ALSO KEIN
GEGENSTÜCK ZUR META-FRIST** im Abschnitt "Frist mit Termin". Zeiger: Teil (p).

**STAND FÜR LINKEDIN NACH DER BESTANDSAUFNAHME (2026-09-22, VERMERK P11.7-5) — KEINE FRAGE
IST GESTRICHEN, UND KEINE IST FÜR EIN ANDERES ZIEL BERÜHRT.** Die Formulierungen von F1 bis
F4 und F7 bleiben wörtlich; nachgezogen ist allein der STAND, und zwar je Frage nur für
**linkedin**. Für pinterest steht jede unverändert offen. **ALLE ZEIGER GEHEN NACH
docs/ziel-befunde.md, ABSCHNITT "LinkedIn (Conversions API)"** — die Buchstaben dieser
Tabelle meinen weder den Meta-, noch den Google-, noch den TikTok-Abschnitt.

| Frage | Stand für linkedin | Zeiger |
|---|---|---|
| F1 Klick-Kennung | **TEILWEISE AUS DEM BESTAND.** Name `li_fat_id`, Symbol `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID`; HERKUNFT ist ein **Parameter, den der Anbieter an die Landing-URL anhängt**, und er setzt eine Einstellung im Campaign Manager voraus — "Enhanced conversion tracking" am Insight Tag, "enabled by default for all new Insight Tags that are recently created"; der Tag muss angelegt, aber nicht eingebaut sein. **NICHT IM BESTAND: das FORMAT · ob es daneben einen COOKIE-Weg gibt · VERLANGT oder EMPFOHLEN.** Nicht-Treffer mit benannter Reichweite über den vollständigen Abschnitt; `li_fat_id` trifft dort genau EINMAL. | Teile (i), (ah) |
| F2 Ort in der Nutzlast | **AUS DEM BESTAND BEANTWORTET, teils GEMESSEN.** Gemessene Hülle: `conversion`, `conversionHappenedAt` (Millisekunden), `user.userIds[]` mit `idType`/`idValue`, `conversionValue.{currencyCode, amount}` (amount als ZEICHENKETTE), `eventId` auf OBERSTER Ebene — letzteres belegt durch eine Positivkontrolle im selben Lauf. Laut Doku trägt `user` VIER Zweige: `userIds`, `userInfo`, `lead`, `externalIds`. **DER ORT DER KLICK-KENNUNG IST EINE ABLEITUNG** aus Symbol-Liste und gemessener Paar-Form (`user.userIds[].idType` / `idValue`), keine eigene Lesung. | Teile (n), (p), (a), (ab), (aj) |
| F3 Match-Felder, verlangt/empfohlen | **TEILWEISE — DIE LISTE STEHT, DIE TRENNUNG NICHT.** SECHS Symbole: `SHA256_EMAIL` · `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` · `ACXIOM_ID` · `PLAINTEXT_IP_ADDRESS` · `SHA256_IP_ADDRESS` · `GOOGLE_AID`. HASHEN: die zwei SHA256-Symbole ja; `PLAINTEXT_IP_ADDRESS` Klartext, der Anbieter hasht selbst mit Salt. Pflicht-Struktur GEMESSEN: ein Paar aus Typ und Wert, BEIDE Pflicht. Eine Identität kann auch OHNE `userIds`-Eintrag reisen — über `lead`, `externalIds` oder `userInfo`, `userIds` dann als leere Liste. **NICHT IM BESTAND: VERLANGT oder EMPFOHLEN je Merkmal** — genau die Unterscheidung, für die F3 so gestellt ist — **und was `externalIds`, `lead` und `userInfo` im Einzelnen tragen.** GEMESSEN angenommen sind ZWEI der sechs Symbole. | Teile (aj), (i), (b), (a), (ab) |
| F4 liest der Anbieter aus der Adresse selbst? | **DIE FRAGE STELLT SICH FÜR LINKEDIN ANDERS — IM GELESENEN UND GEMESSENEN TRANSPORT GIBT ES KEIN FELD FÜR DIE SEITENADRESSE.** Nicht-Treffer mit benannter Reichweite: `eventSourceUrl` · `page url` · `sourceUrl` · `Seitenadresse` je 0 über den vollständigen Abschnitt, Positivkontrolle `userIds` 9 und `conversionHappenedAt` 3; die dokumentierte Kopfzeilen-Liste nennt zudem **keinen Query-Parameter**. **DAS IST EINE AUSSAGE ÜBER DEN BESTAND, NICHT ÜBER DEN ANBIETER.** Dazu GEMESSEN am Code: `LinkedinForwardBody` trägt genau `value` und `currency`. | Teile (ab), (n) |
| F7 Rate-Limits (LinkedIn-Anteil) | **AUF DOKU-EBENE BEANTWORTET UND BEZIFFERT:** höchstens **600 Anfragen je Minute** und **500 000 je Tag**, je Mitglieds-Zugangsdatum, sonst Drosselung. ALLGEMEIN zur Schnittstelle des Anbieters: eine gedrosselte Anfrage bekommt **429**, die Grenzen werden um Mitternacht UTC zurückgesetzt, und die Standard-Limits sind nicht dokumentiert, sondern im Analytics-Reiter der App ablesbar. BATCH über `X-RestLi-Method: BATCH_CREATE`, bis **5 000** Ereignisse und höchstens **100** Regeln; ein ungültiger Datensatz lässt ALLE fallen. **EINE LÜCKE, DIE DER BESTAND SELBST BENENNT:** eine Vorgabe zu WIEDERHOLUNGSVERSUCHEN ist im gelesenen Umfang nicht gefunden worden, und die formale Suche deckte die Achse NICHT — `retry` und `backoff` standen nicht unter ihren Begriffen. **MESSUNG OFFEN:** welches Limit tatsächlich greift. | Teil (ag) |

**F5 (tiktok), F6 (meta) UND F8 (pinterest) SIND VON DIESER RUNDE NICHT BERÜHRT** und stehen
unverändert. **MIT DEM LINKEDIN-ANTEIL IST F7 AN ALLEN DREI ZIELEN AUF DOKU-EBENE
BEANTWORTET** — meta (Teil (u) des Meta-Abschnitts), tiktok (Teil (o) des TikTok-Abschnitts)
und linkedin.

**EINE ANGABE, DIE ZU KEINER DER FRAGEN GEHÖRT UND HIER STEHT, DAMIT NIEMAND SIE VERMUTET:**
Anders als bei google und tiktok **GIBT ES FÜR LINKEDIN EIN GEGENSTÜCK ZUR META-FRIST** —
der Adapter sendet `202601`, Abschalttermin **15.01.2027**, und bei Ablauf scheitert der
Forward **still**. **ER GEHÖRT TROTZDEM NICHT IN DEN ABSCHNITT "Frist mit Termin"**, denn er
wird bereits dort geführt, wo ein solcher Posten hingehört: docs/offene-punkte.md, Eintrag
"DIE LINKEDIN-VERSION DES ADAPTERS WIRD AM 15.01.2027 ABGESCHALTET — DANN SCHEITERT DER
FORWARD STILL", mit dem Termin im Trigger. Die linkedin-Zeile der ZUSCHNITT-FRAGE P11.7-13
führt ihn ebenfalls.

**STAND FÜR LINKEDIN NACH DEM BESCHRÄNKTEN CRAWL (2026-09-22, VERMERK P11.7-6) — KEINE
FRAGE IST GESTRICHEN, KEINE ZEILE DER TABELLE DARÜBER IST ANGETASTET, UND KEINE IST FÜR EIN
ANDERES ZIEL BERÜHRT.** Die Formulierungen von F1 bis F4 und F7 bleiben wörtlich; die
Tabelle der Bestandsaufnahme bleibt als Zeitdokument stehen — **diese hier tritt DANEBEN
und ersetzt sie nicht.** Nachgezogen ist allein der STAND, und zwar je Frage nur für
**linkedin**. Für pinterest steht jede Frage unverändert offen. **ALLE ZEIGER GEHEN NACH
docs/ziel-befunde.md, ABSCHNITT "LinkedIn (Conversions API)"** — die Buchstaben dieser
Tabelle meinen weder den Meta-, noch den Google-, noch den TikTok-Abschnitt.

| Frage | Stand für linkedin nach dem Crawl | Zeiger |
|---|---|---|
| F1 Klick-Kennung | **AUF DOKU-EBENE BEANTWORTET, BIS AUF DAS FORMAT.** ZWEI Herkunftswege, ausdrücklich nebeneinander: der ADRESS-Weg (Parameter `li_fat_id`, setzt NUR "Enhanced conversion tracking" voraus, **kein eingebautes Tag** — View-Through-Attribution "may be limited") und der COOKIE-Weg (gleichnamiger Cookie, setzt den Tag-EINBAU voraus, **Haltedauer 30 Tage** ab dem letzten Anzeigenklick, View-Through unterstützt). **DAS FORMAT BLEIBT EIN NICHT-TREFFER** mit benannter Reichweite über sechs Seiten; die zwei Doku-Beispielwerte sind UUID-ÄHNLICH und **nicht als Format bezeichnet.** Damit ist die Lücke der Bestandsaufnahme zur HÄLFTE geschlossen. | Teil (an) |
| F2 Ort in der Nutzlast | **AUS DER QUELLE BESTÄTIGT, NICHT MEHR NUR ABGELEITET.** Die Bestandsaufnahme nannte den Ort der Klick-Kennung eine ABLEITUNG aus Symbol-Liste und gemessener Paar-Form; die Schema-Seite führt `userIds` jetzt gelesen als Liste von `idType`/`idValue`-Objekten, und ein Doku-Beispiel zeigt `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` an genau diesem Ort. **GELESEN, nicht gemessen.** | Teile (aq), (an) |
| F3 Match-Felder, verlangt/empfohlen | **AUF DOKU-EBENE BEANTWORTET — GENAU DIE TRENNUNG, FÜR DIE F3 GESTELLT IST.** Die Pflicht ist eine ODER-Liste ("at least one of"), die Empfehlung steht dreimal und nennt das Paar E-Mail plus Klick-Kennung. Dazu die Hash-Auflagen je Symbol und die IPv4-Beschränkung BEIDER IP-Symbole **an EINER Stelle der Quelle** — bisher eine Ableitung aus (i) und (aj). **WAS `externalIds`, `lead` und `userInfo` im Einzelnen tragen, ist ebenfalls beantwortet.** **EINE DIVERGENZ IST BERICHTET UND NICHT AUFGELÖST:** Die Fehlermeldung in S3 lässt `SHA256_IP_ADDRESS` aus der Pflicht-Liste aus, S4 und S11 führen es mit; **welche das Verhalten beschreibt, ist UNGEMESSEN** und für den heutigen Adapter folgenlos. | Teile (ao), (ap) |
| F4 liest der Anbieter aus der Adresse selbst? | **UNVERÄNDERT — DIE FRAGE STELLT SICH FÜR LINKEDIN ANDERS**, und der Crawl hat daran nichts geändert: keine der neun gelesenen Seiten nennt ein Feld für die Seitenadresse. Die Aussage bleibt eine über den BESTAND, nicht über den Anbieter. | Teile (ab), (n) |
| F7 Rate-Limits (LinkedIn-Anteil) | **BESTÄTIGT UND UM DREI ANGABEN ERWEITERT** (600/min, 500 000/Tag je Mitglieds-Zugangsdatum unverändert): eine 429 kann **auch aus Infrastruktur-Schutz** kommen und ist dann kein Beleg für das eigene Kontingent · **Warnmeldung per E-Mail ab 75 %**, nur auf ANWENDUNGS-Ebene, mit 1 bis 2 Stunden Verzug · Rücksetzung um Mitternacht UTC. **DIE LÜCKE, DIE DER BESTAND SELBST BENENNT, IST JETZT ALS NICHT-TREFFER BELEGT:** eine Vorgabe zu WIEDERHOLUNGSVERSUCHEN gibt es im gelesenen Umfang nicht — Nicht-Treffer über drei Seiten, je mit Positivkontrolle, darunter die Seite, deren Titel die Frage trägt. **MESSUNG OFFEN:** welches Limit tatsächlich greift. | Teile (as), (ag) |

**DREI ANGABEN GEHÖREN ZU KEINER DER FRAGEN UND STEHEN HIER, DAMIT NIEMAND SIE VERMUTET:**
(1) **DIE ARCHITEKTEN-FRAGE IST BEANTWORTET** — `user.userIds` darf mehr als einen Eintrag
tragen, der Anbieter empfiehlt es sogar, und eine Obergrenze nennt er nicht. **DAS IST
ZULÄSSIGKEIT, NICHT ANNAHME AM ENDPUNKT** (Teil (aq)). (2) **DER TERMIN 15.01.2027 IST AN
DER QUELLE GEGENGEPRÜFT UND UNVERÄNDERT**; elf Versionen sind aktiv, die jüngste ist
`202609` (Teil (at)). (3) **DIE FÜNF MESSFRAGEN AUS "WAS EIN CRAWL FÜR LINKEDIN NICHT
KLÄRT" SIND UNBERÜHRT** und bleiben sämtlich NICHT BEANTWORTET.

**DIE CRAWL-LISTE FÜR LINKEDIN (2026-09-22) — WAS DER CRAWL ZU BEANTWORTEN HAT, UND NUR
DAS.** Die ARCHITEKTEN-ENTSCHEIDUNG aus VERMERK P11.7-5 beschränkt ihn auf das, wofür eine
LESUNG genügt. Jede Zeile nennt die Seite, an der die Antwort zu erwarten ist; die Kürzel
S1 bis S13 sind im Block "Der gelesene Umfang (2026-09-11) — LinkedIn" in
docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", aufgelöst.

- **DAS FORMAT VON `li_fat_id`, EIN MÖGLICHER COOKIE-WEG UND EINE HALTEDAUER** — S8
  `marketing/conversions/enabling-first-party-cookies` (Titel "Enabling Click IDs"), dazu
  S4 `…/conversions-api-schema`. **DER PFAD JENER SEITE NENNT COOKIES, IHR TITEL NENNT
  KLICK-KENNUNGEN** — abgelegt ist aus ihr bisher allein der Satz über "Enhanced conversion
  tracking".
- **VERLANGT ODER EMPFOHLEN, je Kennungs-Symbol und je Merkmal** — S3 `…/conversions-api`,
  S4, S10 `…/custom-matching-identifiers`. **Das ist der Kern von F3** und für kein Symbol
  erhoben.
- **WAS `externalIds`, `lead` UND `userInfo` IM EINZELNEN TRAGEN** — S10, S4. S10 ist am
  2026-09-11 geöffnet worden; ihr Inhalt zu dieser Achse steht in keinem Teil, weil die
  Frage jenes Laufs der Testmodus war.
- **DIE FORM DER ANTWORT AUF EINEN ABGESCHALTETEN VERSIONS-HEADER** —
  `marketing/error-responses`. **PFLICHT-SEITE: SIE STEHT IM BESTAND AUF DER LISTE
  "GESEHEN, NICHT GEÖFFNET"** und trägt nach ihrem dortigen Vermerk "das Beispiel der
  Antwort auf einen veralteten Versions-Header"; sie ist dort ausdrücklich als **nicht
  gelesen** gekennzeichnet. Der offene Punkt zur Abschaltung hält fest, dass diese Form
  **nicht gelesen und nicht gemessen** ist. Die Regel dahinter: docs/immer-beachten.md,
  "DIE LISTE 'GESEHEN, NICHT GEÖFFNET' IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT".
- **EINE VORGABE ZU WIEDERHOLUNGSVERSUCHEN NACH EINER 429** — S3, S11
  `…/conversions-faq`. Der Bestand führt dies als benannte Lücke: `retry` und `backoff`
  standen nicht unter den zweiundzwanzig Begriffen der formalen Suche vom 2026-09-11.
- **EINE FRAGE DES ARCHITEKTEN (2026-09-22), DIE IM BESTAND NICHT GESTELLT IST: DARF
  `user.userIds` MEHR ALS EINEN EINTRAG TRAGEN?** Also etwa eine IP-Adresse UND
  `li_fat_id` im selben Ereignis. **GEMESSEN IST BISHER GENAU EINER** — Teil (i)
  protokolliert "userIds mit GENAU EINEM Eintrag — kein zweiter Identifier, kein userInfo",
  Teil (n) dieselbe Form. **ÜBER DIE ZULÄSSIGE ANZAHL SAGT DAS NICHTS:** ein 201 auf eine
  Einer-Liste ist kein Befund über eine Zweier-Liste. Seiten: S4, S3, S10.
  **SIE TRÄGT BEWUSST KEINE NUMMER:** Die Gattung dieses Abschnitts zählt als F1 bis F8 und
  weicht damit von der Nummernform des Dateikopfes ab (der Grund steht im Abschnitt "Fragen
  an den Zuschnitt"); eine neunte F-Nummer vertiefte die Abweichung, eine
  `P11.7-n`-Nummer erzeugte eine zweite Zählung im selben Abschnitt. **WER VON AUSSEN AUF
  SIE ZEIGT, NENNT DIESE LISTE UND IHREN FETTSATZ.**

**WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT — DIE OFFENEN MESSFRAGEN (2026-09-22).** Sie stehen
getrennt, weil eine LESUNG sie nicht erreicht. Kein Eintrag hier ist ein Auftrag; sie sind
der Rest, der nach dem Crawl offen bleibt. Zeiger gehen nach docs/ziel-befunde.md, Abschnitt
"LinkedIn (Conversions API)", wo nicht anders genannt.

- **OB `li_fat_id` FACHLICH ANGENOMMEN WIRD.** GEMESSEN angenommen sind **ZWEI von SECHS**
  Symbolen — `SHA256_EMAIL` (2026-08-15) und `PLAINTEXT_IP_ADDRESS` (2026-08-17); die vier
  übrigen sind nie gesendet worden. Teile (b), (i), (aj).
- **OB DIE SCHNITTSTELLE EINE IPv6-ADRESSE ABWEIST.** **NIE PROBIERT** — Teil (j) sagt das
  ausdrücklich, und die Folgerung dort ("würde ebenfalls quittiert") ist als nicht gemessen
  bezeichnet. Teile (j), (i), (aj).
- **WELCHES RATE-LIMIT TATSÄCHLICH GREIFT.** Das zeigen erst die Nutzungs-Angaben einer
  echten Antwort; die Standard-Limits sind laut Anbieter nicht dokumentiert. Teil (ag).
- **OB DER ANBIETER DIE KOPFZEILE `X-Restli-Protocol-Version` DURCHSETZT.** Teil (ai) führt
  das ausdrücklich als NICHT ENTSCHEIDBAR; der Adapter hat sie nie gesendet, und sein
  Forward ist am 2026-08-19 ohne sie angekommen.
- **OB DAS LIVE VERWENDETE ZUGANGSDATUM ABLÄUFT.** Keine Messung, sondern eine BEOBACHTUNG
  ab Mitte Oktober 2026 an der Direct-API-Seite im Campaign Manager. Geführt als offener
  Punkt: docs/offene-punkte.md, "OB DAS LIVE VERWENDETE LINKEDIN-ZUGANGSDATUM ABLÄUFT, IST
  ERST AB MITTE OKTOBER 2026 ENTSCHEIDBAR"; der Befund ebenda, Teile (v), (al).

**STAND FÜR PINTEREST NACH DEM CRAWL (2026-09-22, VERMERK P11.7-7) — KEINE FRAGE IST
GESTRICHEN, KEINE ZEILE EINER TABELLE DARÜBER IST ANGETASTET, UND KEINE IST FÜR EIN ANDERES
ZIEL BERÜHRT.** Die Formulierungen von F1 bis F4 und F8 bleiben wörtlich; nachgezogen ist
allein der STAND, und zwar je Frage nur für **pinterest**. **ALLE ZEIGER GEHEN NACH
docs/ziel-befunde.md, ABSCHNITT "Pinterest (Conversions API)"** — die Buchstaben dieser
Tabelle meinen weder den Meta-, noch den Google-, noch den TikTok-, noch den
LinkedIn-Abschnitt.

| Frage | Stand für pinterest | Zeiger |
|---|---|---|
| F1 Klick-Kennung | **AUF DOKU-EBENE BEANTWORTET, BIS AUF DAS FORMAT.** Feldname `click_id`, Name des Werts **`epik`** ("External Pinterest ID Key"). ZWEI Herkunftswege mit einem ausdrücklichen VORRANG auf den Cookie: `_epik`-Cookie auf der eigenen Domain **oder** `&epik=`-Parameter der Adresse — "Use the `_epik` cookie instead of the `&epik=` query parameter… ensures greater coverage". **EMPFOHLEN, nicht verlangt**, mit acht benannten Ereignistypen. **DAS FORMAT IST EIN NICHT-TREFFER** mit benannter Reichweite über dreizehn Seiten; die zwei Beispielwerte sind base64-ähnlich und **nicht als Format bezeichnet**. **MESSUNG OFFEN:** ob der Endpunkt den Wert fachlich annimmt. | Teil (ac) |
| F2 Ort in der Nutzlast | **AUF DOKU-EBENE BEANTWORTET.** `user_data.click_id`, im Schema `"type": "string"`, `"nullable": true` — **eine Zeichenkette, KEIN Array**, anders als die gehashten Merkmale desselben Objekts. `event_source_url` daneben auf Ereignis-Ebene. | Teile (ac), (ae), (af) |
| F3 Match-Felder, verlangt/empfohlen | **AUF DOKU-EBENE BEANTWORTET — GENAU DIE TRENNUNG, FÜR DIE F3 GESTELLT IST.** Die Pflicht liegt auf dem OBJEKT `user_data` und seiner ODER-Mindestregel (`em` · `hashed_maids` · Paar aus IP und User-Agent); **KEIN EINZELNES FELD IST VERLANGT**. Dazu die vollständige Liste von **SIEBZEHN** Feldern mit Typ, Hashen und Rang — zwei mehr, als der Bestand führte (`fn`, `customer_type`). **MEHRERE KENNUNGEN ZUGLEICH SIND ZULÄSSIG**, das Doku-Beispiel trägt alle siebzehn in EINEM Objekt, ohne genannte Obergrenze — **DAS IST ZULÄSSIGKEIT, NICHT ANNAHME AM ENDPUNKT.** | Teil (ae); Vorbehalt an (o)/E1 |
| F4 liest der Anbieter aus der Adresse selbst? | **ZWEITEILIG, UND DIE TEILE DÜRFEN NICHT ZUSAMMENGEZOGEN WERDEN.** Zum INHALT des Adressfelds sagt die Doku ausdrücklich etwas und **verlangt den Query-String**: "For Pinterest click events, include `&epik` query string… in the URL", mit Beispiel. **OB DER ANBIETER DARAUS SELBST AUSLIEST, SAGT SIE NICHT** — NICHT-TREFFER mit benannter Reichweite; über FREMDE Kennungen im Adressfeld schweigt sie vollständig. **Anders als bei tiktok, wo der Satz wörtlich dasteht. MESSUNG OFFEN.** | Teil (af) |
| F8 Erfolgsrumpf (Katalog G1) | **DIE FORM IST GELESEN — DIE FRAGE BLEIBT EINE MESSFRAGE UND IST NICHT BEANTWORTET.** Gelesen sind: die Felder `num_events_received`, `num_events_processed`, `events[]` mit `status`, `error_message`, `warning_message`; ein **dokumentierter TEILERFOLG mit HTTP 200** (`2/1`, ein Eintrag `failed`); die belegten Statuswerte `processed` und `failed` **ohne abschliessende Enum-Liste**; beide Leerformen `""` und `null`; `data` mit `minItems 1`, `maxItems 1000`, im Testmodus 20. **`evaluateSuccessBody` STIMMT MIT DER DOKUMENTIERTEN FORM ÜBEREIN** (GEMESSEN am Repo, CC, 2026-09-22): Die Prüfung auf `1/1`, genau einen Eintrag und `status === "processed"` ist für unsere Ein-Ereignis-Nutzlast die dokumentierte Erfolgsform, und `sanitizeProviderText` deckt `""`, `null` und ein fehlendes Feld gleich ab. **WAS FEHLT, IST DER AUFRUF** — die Doku ist hier der Massstab einer späteren Messung, nicht ihr Ersatz. | Teil (ah) |

**ZWEI ANGABEN GEHÖREN ZU KEINER DER FRAGEN UND STEHEN HIER, DAMIT NIEMAND SIE VERMUTET:**
(1) **F7 NENNT PINTEREST NICHT** — die Rate-Limits dieses Ziels standen seit dem
2026-08-20 in Teil (e). **SEIT DEM CRAWL SIND ES DREI EINANDER WIDERSPRECHENDE AUSSAGEN**
für denselben Endpunkt (120 000/Minute je Werbekonto je App · "unlimited" mit dem
Conversion-Token · 5 000/Minute je Werbekonto laut Endpunkt-Referenz); welche gilt, ist
**UNGEMESSEN**. Zeiger: Teil (ai)(2), dazu der Vorbehalt an Teil (e).
(2) **EINE VORGABE ZU WIEDERHOLUNGSVERSUCHEN NACH EINER 429 GIBT ES NICHT** — der
Nicht-Treffer aus Teil (e) ist am 2026-09-22 an einer breiteren Achse bestätigt: vier
Seiten, je mit Positivkontrolle. Zeiger: Teil (ah).

## Fragen an den Zuschnitt (nach dem Meta-Crawl)

**FRAGEN UND GRENZEN, KEINE ENTSCHEIDUNGEN.** Kein Eintrag hier entscheidet etwas, und keiner
ist ein Bau-Vorschlag. Sie stehen hier, weil der Crawl sie erzeugt hat und ein Zuschnitt sonst
über sie hinweggeht, ohne sie zu bemerken. **KEINE EMPFEHLUNG an irgendeinem Punkt.**

**ZUR NUMMERNFORM, weil hier eine Divergenz ENTSTEHT und nicht stillschweigend entstehen
soll:** Diese Gattung zählt als `ZUSCHNITT-FRAGE P11.7-n` — mit Gattungsnamen, wie der Kopf
dieser Datei es für alle Gattungen vorsieht ("laufen über alle Gattungen getrennt"). **DIE
GATTUNG DARÜBER, "Offene Fragen an den Anbieter-Crawl", ZÄHLT DAGEGEN ALS F1 BIS F8** und
weicht damit von derselben Regel ab; sie ist am 2026-09-22 so angelegt worden und wird hier
**NICHT nachgezogen** — ein Nachzug machte jeden bestehenden Zeiger auf "F4" tot. **WER VON
AUSSEN ZEIGT, NENNT DIE GATTUNG MIT:** "ZUSCHNITT-FRAGE P11.7-4" und "VERMERK P11.7-1" und
"Vorrat P11.7-1" sind drei verschiedene Einträge, und die Nummer allein trennt sie nicht
(docs/immer-beachten.md, Abschnitt der Phase 11.11 zur Gattung am Zeiger).

**EIN VERWEIS DER FORM "Teil (x)" IN DIESEM ABSCHNITT MEINT AUSNAHMSLOS
docs/ziel-befunde.md, ABSCHNITT "Meta (Conversions API)".** Der Satz steht hier einmal,
damit er nicht an jedem einzelnen Zeiger wiederholt werden muss — und er steht überhaupt,
weil jene Datei es verlangt: ihr Kopf schreibt unter "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT
UND BUCHSTABEN — NIE DEN BUCHSTABEN ALLEIN" vor, dass ein Buchstabe allein nicht genügt, da
dieselben Buchstaben in mehreren Ziel-Abschnitten vergeben sind.

**ZUSCHNITT-FRAGE P11.7-1 — `fbc` HAT ZWEI BILDUNGSWEGE, UND EINER FÄLLT GENAU DANN WEG,
WENN ER GEBRAUCHT WIRD.**
GELESEN (Teil (h)): Der Cookie-Weg setzt voraus, dass das Meta-Pixel auf der Seite läuft und
`_fbc` gesetzt hat; der Adressweg liest `fbclid` aus der Seitenadresse. Der Anbieter sieht den
Adressweg ausdrücklich für den Fall ohne Pixel vor.
**DIE FOLGE IST EINE ABLEITUNG und keine Angabe des Anbieters:** Ist das Pixel BLOCKIERT, gibt
es kein `_fbc` — der Adressweg ist dann der einzige. Der Anbieter spricht von "no Meta Pixel
running on the website", nicht von einem blockierten; **dass ein blockiertes Pixel kein Cookie
setzt, ist erschlossen und nicht gelesen.**
**WARUM DAS FÜR DIESES PRODUKT MEHR ALS EIN RANDFALL IST:** Die Adblocker-Verlustrate ist ein
gebautes Produktmerkmal — der Fall ohne wirksames Pixel ist hier der gemessene Normalfall und
nicht die Ausnahme. **OFFEN und hier nicht entschieden:** ob der Zuschnitt beide Wege trägt,
nur den Adressweg, oder einen Vorrang zwischen ihnen.

**ZUSCHNITT-FRAGE P11.7-2 — METAS EIGENE EMPFEHLUNG ZUM `_fbc`-COOKIE KOLLIDIERT MIT DER
GRENZE DER DRITTEN
DATENKLASSE.** GELESEN (Teil (h)): Der Anbieter empfiehlt ausdrücklich, `_fbc` SELBST als
HTTP-Cookie mit 90 Tagen Laufzeit zu setzen, oder den Wert im eigenen Backend zu halten.
**DIE GRENZE, gegen die das läuft, ist die Entscheidung P11.7-2** (Zeiger oben unter
"Entscheidungen": docs/offene-punkte.md, Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN
PII-SCHEIBE", BLOCK VOM 2026-09-22, Teil (E2)). Nach ihrer Fassung in dieser Datei fällt eine
FREMDVERGEBENE Kennung unter TRANSIT-ONLY, **eine vom Produkt selbst gesetzte NIE.**
**DER WORTLAUT VON (E2) IST IN DIESER RUNDE NICHT GELESEN WORDEN** — docs/offene-punkte.md lag
ausserhalb des Scopes. Was hier steht, ist die Fassung des Zeigers P11.7-2 in dieser Datei;
**wer die ZUSCHNITT-FRAGE P11.7-2 bearbeitet, liest zuerst (E2) im Wortlaut.**
**OHNE EINE NEUE OWNER-ENTSCHEIDUNG IST DER COOKIE-WEG NICHT BAUBAR.** Das ist keine Wertung
der Empfehlung des Anbieters, sondern die Feststellung, dass zwei geltende Sätze einander hier
ausschliessen.
**DIE FOLGE DES VERZICHTS, und sie gehört dazu, weil sie sonst als Kleinigkeit durchgeht:**
Ohne eigene Ablage gibt es keinen Zeitpunkt der ersten Beobachtung, den wir kennen würden — der
Zeitanteil von `fbc` wäre dann faktisch der EREIGNISZEITPUNKT statt der ersten Beobachtung.
Der Anbieter verlangt in diesem Fall "the timestamp when you first observed or received this
fbclid value" (Teil (h)); ein Ereigniszeitpunkt ist dem nahe, aber nicht dasselbe.
**WELCHE WIRKUNG DIESE ABWEICHUNG AUF DEN ABGLEICH HAT, IST UNGEMESSEN** — die Doku sagt
darüber nichts, und gemessen ist es nicht.

**ZUSCHNITT-FRAGE P11.7-3 — OB DER ADAPTER `action_source` SENDET, IST IM VERMERK P11.7-1
NICHT ERHOBEN.** Meta führt
`action_source` als Pflicht für ALLE Ereignisse (Teil (l)), und die Aufklärung P11.7-1 hat die
Match-Felder je Ziel vollständig aufgelistet, **`action_source` aber nicht erwähnt** — es ist
kein `user_data`-Feld und fiel damit aus ihrer Achse.
**EIN HINWEIS AUS DEM BESTAND, der die Frage nicht ersetzt:** docs/claude-history/phase-6-capi.md
beschreibt die Nutzlast des Meta-Forwards mit `action_source="website"` (GELESEN, CC,
2026-09-22). **Das ist ein Dokument über Code aus der Phase 6, keine Messung am heutigen
Code** — und die Regel "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD"
(docs/immer-beachten.md) gilt dieser Art von Angabe genau.
**ERSTE FRAGE AN DIE AUFKLÄRUNG VOR DEM ZUSCHNITT**, und sie ist billig: Sendet jeder der fünf
Adapter die Pflichtfelder seines Anbieters — für meta `action_source`, `event_source_url`,
`client_user_agent`? Bei `event_source_url` ist für linkedin in P11.7-1 (d) bereits GEMESSEN,
dass es **nicht gelesen** wird; ob LinkedIn ein entsprechendes Pflichtfeld kennt, steht in
seinem eigenen Abschnitt und ist hier nicht behauptet.

**ZUSATZ 2026-09-22 — AM CODE BEANTWORTET, s. VERMERK P11.7-8, Zeile C2.** Der Wortlaut
der Frage bleibt unverändert. **IHRE ERSTE HÄLFTE IST EINGELÖST:** `action_source`
**STEHT** in der Meta-Nutzlast, unbedingt und mit dem Wert `"website"`
(`meta-forward.ts:310`), und der Lauf `route.test.ts:113` nagelt ihn fest — die Angabe aus
`docs/claude-history/phase-6-capi.md` ist damit am HEUTIGEN Code bestätigt und nicht mehr
nur ein Dokument über Phase-6-Code. **IHRE ZWEITE HÄLFTE — die Frage an alle fünf Adapter
— IST BEANTWORTET UND HAT EINEN BEFUND ERGEBEN**, der eine eigene Frage trägt:
ZUSCHNITT-FRAGE P11.7-22. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-4 — `external_id` WIRD VON META ZUM MITSENDEN ANGEHALTEN, UND DER
WERT WÄRE SELBST
ERZEUGT.** GELESEN (Teile (l), (o)): "Also include the `external_id` and `event_id` event
parameters for all events"; der Wert ist "a string that represents a user on an advertiser's
system", Hashing empfohlen, mit einer Konsistenz-Auflage über alle Kanäle und einem Ablauf,
den der Anbieter nicht beziffert.
**ER IST DER EINZIGE PARAMETER DER LISTE, DESSEN WERT WIR SELBST VERGEBEN MÜSSTEN** — alle
übrigen sind fremdvergeben, kommen aus der Anfrage oder aus einem Geschäftsvorgang (Teil (k)).
**DAMIT FÄLLT ER NICHT UNTER DIE DRITTE DATENKLASSE:** P11.7-2 nimmt eine vom Produkt selbst
gesetzte Kennung ausdrücklich aus.
**WORUNTER ER STATT DESSEN FÄLLT, IST HIER NICHT ENTSCHIEDEN UND AUSDRÜCKLICH KEINE
ZUORDNUNG.** Die offene Frage lautet, ob eine selbst vergebene, über Kanäle hinweg stabile
Besucher-Kennung ein "fingerprint-artiges Merkmal" im Sinne des Triggers der
DATENKLASSEN-GRENZE ist (CLAUDE.md, "## Offene Punkte", Eintrag "DATENKLASSEN-GRENZE VOR DER
ERSTEN PII-SCHEIBE"). **DAS IST EINE OWNER-FRAGE, KEINE CC-EINORDNUNG**, und sie ist nicht
Gegenstand dieser Phase ohne eine eigene Entscheidung.
**WAS OHNE DIESE ENTSCHEIDUNG BLEIBT:** Meta nutzt `fbp` ersatzweise als `external_id`, wenn
letzteres fehlt (Teil (j)) — **das ist eine Angabe des Anbieters über sein eigenes Verhalten
und kein Ersatz für die Entscheidung.**

**ZUSCHNITT-FRAGE P11.7-5 — E3 UND META: DAS ENTFERNEN FREMDER KLICK-KENNUNGEN AUS
`event_source_url` IST NACH DEM GELESENEN VERTRÄGLICH.** Die Entscheidung P11.7-3 ("EINE KLICK-KENNUNG GEHT NUR AN IHREN
URHEBER", Zeiger oben) verlangt eine Reparatur der unbenannten Durchleitung; ihre Gestalt hing
daran, ob ein Anbieter Kennungen aus der Seitenadresse SELBST ausliest.
**FÜR META IST DAS GELESENE ERGEBNIS ZWEITEILIG:** Keine der neun gelesenen Seiten sagt, dass
Meta aus `event_source_url` ausliest (Teil (q)) — **und Metas eigene Bibliothek übergibt in
ihrem Beispiel einen Query-String in genau diesem Feld** (Teil (r), zugleich der einzige
solche Fall der ganzen Lesung; die Beispiele der Haupt-Doku zeigen Adressen ohne Query-String,
Teil (p)).
**DIE FOLGERUNG, ausdrücklich als solche:** Fremde Klick-Kennungen (etwa ein `gclid`) aus
`event_source_url` zu entfernen, verträgt sich mit dem, was über Meta gelesen ist; `fbclid`
geht an seinen Urheber. **DAS IST KEINE ENTSCHEIDUNG über die Gestalt**, und es ist keine
Aussage über die vier übrigen Ziele — für die ist F4 unverändert offen.
**DIE GRENZE, DIE MITMUSS:** "Verträglich nach dem Gelesenen" ist nicht "gemessen". Bliebe ein
`fbclid` in der Adresse und entfiele gleichzeitig ein `fbc`, wäre die Frage aus (q) — ob Meta
dann doch verwertet — entscheidend; **sie ist offen.**

**DIE DREI FOLGENDEN STAMMEN AUS DER GOOGLE-BESTANDSAUFNAHME (VERMERK P11.7-3) UND BRECHEN
DESHALB DIE ABKÜRZUNG DIESES ABSCHNITTS:** Ein "Teil (x)" meint hier sonst ausnahmslos den
**Meta**-Abschnitt — die drei unten nennen ihren Abschnitt **jedes Mal ausgeschrieben.**

**ZUSCHNITT-FRAGE P11.7-6 — DER ADAPTER SENDET WEDER IP NOCH USER-AGENT, OBWOHL DER
TRANSPORT ZWEI ORTE DAFÜR KENNT — UND WELCHER ZU UNSEREM ZEITPUNKT PASST, IST DIE FRAGE.**
GEMESSEN (VERMERK P11.7-1 (d)): `forwardToGoogle` übergibt **NUR die Klick-Kennungen**;
`GoogleEvent` trägt kein `eventDeviceInfo` und kein `landingPageDeviceInfo`.
GELESEN (docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teile
(m)/E4 und (w)/E1): **ZWEI Feldpaare an zwei Orten mit verschiedener Bedeutung** —
`eventDeviceInfo` für den EREIGNIS-Zeitpunkt, `adIdentifiers.landingPageDeviceInfo` für die
LANDESEITE. Der Anbieter unterscheidet zwei Momente.
**DIE FRAGE IST DAMIT NICHT "OB", SONDERN "WELCHES"**, und sie ist hier **nicht entschieden.**
**DIE DATENKLASSEN-BERÜHRUNG WIRD BENANNT UND NICHT ENTSCHIEDEN:** Beide Felder tragen IP und
User-Agent, und für die gilt P11.7-4. **KEINE EMPFEHLUNG.**

**ZUSATZ 2026-09-22 — DIE CODE-HÄLFTE AM CODE BEANTWORTET, s. VERMERK P11.7-8, Zeile C9.**
Der Wortlaut der Frage bleibt unverändert. Bestätigt an HEAD `a763716`: `forwardToGoogle`
übergibt **nur** die Klick-Kennungen (`google-forward.ts:277–291`), und **weder `clientIp`
noch `userAgent` erreichen den Adapter überhaupt** — beide enden schon an der Signatur des
Pfeil-Ausdrucks in `FORWARDER_BY_TARGET` (`ingest.ts:485–495`). **DIE FRAGE SELBST BLEIBT
OFFEN:** Welcher der zwei Anbieter-Orte zu unserem Zeitpunkt passt, ist am Code **nicht
entscheidbar** — es ist eine Frage über zwei Anbieter-Semantiken. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-7 — DIE ZWEI DMA-EINWILLIGUNGSFELDER EXISTIEREN, BEIDE OPTIONAL, UND
DER TRIGGER IHRES POSTENS ZEIGT AUF EINE ABGESCHLOSSENE PHASE.**
GELESEN (docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teile
(w)/I2 und (l)/D1): `Consent` trägt **GENAU ZWEI** Felder, beide Optional — `adUserData` und
`adPersonalization`; es ist ausweislich seiner Überschrift **ein DMA-Objekt, kein allgemeiner
Einwilligungs-Träger.** **OB UND WIE SIE AUS DEM EINWILLIGUNGS-URTEIL GEFÜLLT WERDEN, IST
OFFEN.**
**EINE ZWEITE, DAVON GETRENNTE OFFENHEIT — NUR FESTGEHALTEN:** Der Posten "DREI FELDER DER
NUTZLAST SIND FRAGEN DER TRANSPORT-SCHEIBE, NICHT DIESER" (docs/offene-punkte.md) nennt als
Trigger für `consent` die **Phase 11.5**, und die ist abgeschlossen. **OB DER TRIGGER DAMIT
EINGETRETEN IST, STEHT AN KEINER GELESENEN STELLE UND IST HIER NICHT ENTSCHIEDEN** — für den
Entfall jenes Postens ohnehin unerheblich, er trägt drei Trigger. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-8 — OB EINE SITZUNG DIE VOLLADUNG VON docs/ziel-befunde.md FÜR EINEN
ZUSCHNITT TRÄGT, IST UNGEMESSEN.**
Der Pflicht-Stopp (CLAUDE.md, "## Anbieter-Befunde der Fan-Out-Ziele") lässt die gezielte
Form für RECHERCHE zu, verlangt für **ZUSCHNITT UND ADAPTER** aber die **VOLLLADUNG**.
GEMESSEN (CC, 2026-09-22): die Datei **8 817 Zeilen / 628 629 Bytes**, davon der
Google-Abschnitt **5 712 / 405 265**.
**DIE FRAGE IST NICHT, OB DIE PFLICHT GILT — SIE GILT**, sondern ob nach der Volladung noch
genug freier Kontext für einen Zuschnitt bleibt. **SPÄTESTENS VOR DEM ERSTEN ZUSCHNITT DIESER
PHASE ZU KLÄREN. KEINE EMPFEHLUNG**, und kein Vorschlag einer Lockerung.

**ZUSATZ 2026-09-22 — DIE MESSGRÖSSE AM CODE NACHGEZOGEN, s. VERMERK P11.7-8, Zeile C5.**
Der Wortlaut der Frage bleibt unverändert, und **DIE FRAGE IST NICHT BEANTWORTET.**
Nachgezogen ist allein die Zahl, auf die sie sich stützt: `docs/ziel-befunde.md` ist am
2026-09-22 **9 994 Zeilen / 717 061 Bytes** (GEMESSEN, CC, 2026-09-22). Gegenüber der
Angabe im Text oben — 8 817 / 628 629 — sind das **1 177 Zeilen und 88 432 Bytes MEHR**;
die Crawls zu tiktok, linkedin und pinterest sind seither abgelegt worden.
**DIE ÄLTERE ANGABE BLEIBT WÖRTLICH STEHEN** und ist als Aussage über ihren Zeitpunkt
richtig; dieser Zusatz tritt DANEBEN. **DIE MESSUNG BEANTWORTET DIE FRAGE NICHT, SIE
VERSCHÄRFT SIE** — die Datei ist gewachsen, nicht geschrumpft, und ob nach einer Volladung
noch genug freier Kontext für einen Zuschnitt bleibt, ist unverändert ungemessen.
**KEINE EMPFEHLUNG**, und kein Vorschlag einer Lockerung.

**DIE FÜNF FOLGENDEN STAMMEN AUS DEM TIKTOK-CRAWL (VERMERK P11.7-4) UND BRECHEN DESHALB DIE
ABKÜRZUNG DIESES ABSCHNITTS** — ein "Teil (x)" meint hier sonst ausnahmslos den
**Meta**-Abschnitt; die fünf unten nennen ihren Abschnitt **jedes Mal ausgeschrieben.**

**ZUSCHNITT-FRAGE P11.7-9 — E3 UND TIKTOK: DER URHEBER LIEST SELBST AUS, UND DAMIT TEILT
SICH DIE FRAGE.**
GELESEN (docs/ziel-befunde.md, Abschnitt "TikTok (Events API 2.0)", Teil (m)): TikTok parst
`ttclid` aus dem übergebenen `page.url`. **FOLGE FÜR DIE ENTSCHEIDUNG P11.7-3** ("EINE
KLICK-KENNUNG GEHT NUR AN IHREN URHEBER", Zeiger oben unter "Entscheidungen"): Ein `ttclid`
in der an TikTok übergebenen Adresse geht an SEINEN Urheber und ist damit verträglich; ein
`gclid` oder `fbclid` in derselben Adresse verletzt sie **unverändert**.
**OFFEN UND HIER NICHT ENTSCHIEDEN:** ob zusätzlich `user.ttclid` gesendet wird. Der
Anbieter empfiehlt beides nebeneinander; **ob ein Weg den anderen ersetzt, sagt keine
gelesene Seite.** KEINE EMPFEHLUNG.

**ZUSCHNITT-FRAGE P11.7-10 — DOPPELZÄHLUNG: EINE ABLEITUNG, UNGEMESSEN, UND SIE BETRIFFT
MEHR ALS EIN ZIEL.**
GEMESSEN am Code (CC, 2026-09-22): Der Adapter setzt `event_id` IMMER. GELESEN (ebenda, Teil
(n)): Der Cookie-Weg der Deduplizierung greift **nur ohne** `event_id`; wirksam ist bei uns
also allein der Schlüssel `[event_source_id, event, event_id]`. **BEHÄLT EIN BETREIBER SEIN
EIGENES TIKTOK-PIXEL, FEUERT DIESES MIT EINER ANDEREN KENNUNG** — ob daraus eine
Doppelzählung folgt, ist eine **ABLEITUNG und ungemessen.**
**VERWANDT ÜBER TIKTOK HINAUS:** der Restsatz aus der Phase 11.11 zu Meta ("ob Meta doppelt
zählt, ist ungemessen"), docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.11
gehoben (2026-09-22)". **Die Frage betrifft damit mehr als ein Ziel.** KEINE EMPFEHLUNG.

**ZUSCHNITT-FRAGE P11.7-11 — DAS RATE-LIMIT ANTWORTET WIE EIN ZUGANGSFEHLER: EINE FRAGE AN
DEN CODE, NICHT BEANTWORTET.**
GELESEN (ebenda, Teil (o)): `40100` (Drosselung) kommt mit **HTTP 401**, ebenso `40104`
(leeres Zugangsdatum). **OB DIE FEHLERDEUTUNG DES ADAPTERS DIE ZWEI FÄLLE FÜR DEN
BETREIBER-SUPPORT UNTERSCHEIDBAR MACHT, IST IN DIESER RUNDE NICHT ERHOBEN.** Der
Kopfkommentar von `src/lib/capi/tiktok-forward.ts` führt "zwei verschiedene Codes teilen
sich HTTP 401" bereits als gemessenen Unterschied (2026-08-11); **ob die dort gemeinten zwei
dieselben zwei sind, ist ungeprüft.** KEINE EMPFEHLUNG.

**ZUSATZ 2026-09-22 — AM CODE BEANTWORTET, s. VERMERK P11.7-8, Zeile C3.** Der Wortlaut
der Frage bleibt unverändert. **SIE TEILT SICH AM CODE IN ZWEI ANTWORTEN:**
· **IM LOG SIND DIE ZWEI FÄLLE UNTERSCHEIDBAR.** `describeRejection`
  (`tiktok-forward.ts:272–293`) schreibt `code=` aus dem **RUMPF**, nicht den HTTP-Status;
  `asLogShort` (`:123`) läuft über `redactOpaque` (`src/lib/redact.ts:68`), das erst ab
  **zwanzig** Zeichen schwärzt — eine fünfstellige Zahl bleibt vollständig lesbar. Der
  Betreiber-Support sieht `code=40100` gegen `code=40104`.
· **IM KONTROLLFLUSS SIND SIE ES NICHT.** Der Adapter verzweigt nicht auf den Code; beide
  Fälle laufen durch denselben Zweig (`:428 f.`: `if (!res.ok) { console.error(…); return; }`).
**DIE ZWEITE HÄLFTE DER FRAGE BLEIBT UNGEPRÜFT, UND DER GRUND STEHT JETZT FEST:** Ob die
im Kopfkommentar gemeinten "zwei verschiedene Codes" dieselben sind, ist **am Code NICHT
entscheidbar** — der Kommentar (`:34 f.`, `:424–427`) nennt als Beispiel "falsche Kennung"
gegen "falsches Zugangsdatum", die gelesene Doku nennt Drosselung gegen leeres
Zugangsdatum, und welche Codes die Messung vom 2026-08-11 ergeben hat, steht im Code
nirgends. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-12 — `external_id` IST AUCH BEI TIKTOK DER EINZIGE SELBST ERZEUGTE
WERT: ZEIGER STATT KOPIE.**
GELESEN (ebenda, Teil (l)). **DIE LAGE IST DIESELBE WIE BEI META, UND DIE FRAGE IST DORT
BEREITS GESTELLT:** ZUSCHNITT-FRAGE P11.7-4 dieser Datei. Sie wird hier **NICHT
verdoppelt.** Was hinzukommt und dort nicht steht: TikTok verlangt SHA-256 auch für Web.
**KEINE DATENKLASSEN-ZUORDNUNG**, keine Empfehlung.

**ZUSCHNITT-FRAGE P11.7-13 — EIN VERSIONS-WÄCHTER ÜBER ALLE ZIELE (ARCHITEKTEN-VORSCHLAG
2026-09-22, NICHT ENTSCHIEDEN).**
**DIE GESTALT DES VORSCHLAGS:** ein Test über eine Tabelle "Ziel · gesendete Version ·
Abschalttermin", der eine festgelegte Zeit vor jedem Termin rot wird.
**DER GRUND:** Die Ziele verhalten sich beim Ablauf **verschieden**, und **heute wird davon
nichts rot.** Der bekannte Stand, je mit Fundstelle:

| Ziel | gesendete Version | Abschalttermin | bei Ablauf | Fundstelle |
|---|---|---|---|---|
| meta | `v21.0` | 2027-01-21 unter dem Graph-Schema; **welches Schema gilt, ist ungemessen** | **still umgeleitet** ("defaulted to the next oldest, usable version") | Abschnitt "Frist mit Termin" dieser Datei; docs/ziel-befunde.md, Meta, Teile (s), (t) |
| tiktok | `v1.3` | **KEINER — "TBD"** | **laut fehl** ("any calls made to the deprecated API will fail") | docs/ziel-befunde.md, TikTok, Teil (p) |
| linkedin | `202601` | **15.01.2027** | **still** ("dann scheitert der Forward still") | CLAUDE.md, "## Offene Punkte", Posten "DIE LINKEDIN-VERSION DES ADAPTERS WIRD AM 15.01.2027 ABGESCHALTET …" |
| google | `v1` — so der Bestand; **in dieser Runde NICHT am Code nachgesehen** | **KEINE dokumentierte Abschaltregel**, und das ist ausdrücklich keine Zusage auf Unbefristetheit | **ungelesen** | VERMERK P11.7-3 dieser Datei; docs/ziel-befunde.md, Google, Teil (cm) |
| pinterest | **OFFEN** | **OFFEN** | **OFFEN** | in dieser Runde nicht erhoben — der Crawl steht aus |

**NICHT ENTSCHIEDEN:** ob der Wächter gebaut wird · wo die Tabelle läge · welche Vorlaufzeit
"eine festgelegte Zeit" wäre · was er täte, wo es keinen Termin gibt (tiktok, google) oder
wo die Version gar nicht im Repo steht, sondern in der Umgebung (meta, s. "Frist mit
Termin"). **KEINE EMPFEHLUNG.**

**ZUSATZ 2026-09-22 NACH DEM LINKEDIN-CRAWL (VERMERK P11.7-6) — DIE LINKEDIN-ZEILE DER
TABELLE DARÜBER BLEIBT WÖRTLICH STEHEN.** Sie ist richtig und wird nicht umgeschrieben;
was hinzukommt, sind VIER Angaben, die sie nicht trägt. **DIE ÜBRIGEN VIER ZEILEN SIND VON
DIESEM ZUSATZ NICHT BERÜHRT.**
· **DIE SPALTE "bei Ablauf" BEKOMMT EINE ZWEITE, GELESENE HÄLFTE.** Laut Anbieter-Doku
  antwortet eine abgeschaltete Version mit **HTTP 426** und `code: "NONEXISTENT_VERSION"`,
  Meldung "Requested version yyyymmdd is not active". **MIT EINEM VORBEHALT, DER ZUM BEFUND
  GEHÖRT:** Die Seite, die das Beispiel trägt, beschränkt ihre Neuerungen ausdrücklich auf
  drei ANDERE Endpunkte, und `/rest/conversionEvents` steht dort nicht; **ob unser Endpunkt
  genau so antwortet, ist NICHT BELEGT und bleibt eine MESSFRAGE.** Zeiger:
  docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teil (ar).
· **"STILL" HEISST NICHT "UNSICHTBAR", UND DER UNTERSCHIED IST GEMESSEN** (CC, 2026-09-22,
  HEAD `75f4718`): `forwardToLinkedin` prüft `if (!res.ok)` und schreibt dann GENAU EINE
  `console.error`-Zeile. **FÜR DEN BETREIBER IST DER AUSFALL STILL — IM SERVER-LOG IST ER
  SICHTBAR.** Es entsteht keine Zeile in `events`, keine Anzeige, kein Rückkanal. Der
  Wortlaut der Tabellenzeile ("still") bleibt damit richtig; er sagt nur nicht, wo man
  hinsähe.
· **DIE VERSION IST EINE MODUL-KONSTANTE OHNE ENV-WEG** (GEMESSEN, ebenda):
  `const LINKEDIN_VERSION = "202601";` in `src/lib/capi/linkedin-forward.ts`. **DARIN
  UNTERSCHEIDET SIE SICH VON meta**, wo der Wert env-übersteuerbar ist — die offene Frage
  "Umgebung oder Vorgabewert" aus dem Abschnitt "Frist mit Termin" stellt sich für linkedin
  also gar nicht: eine Anhebung ist hier zwingend eine Code-Änderung.
· **DIE JÜNGSTE AKTIVE VERSION IST `202609`, ABSCHALTTERMIN 15.09.2027**; aktiv sind elf
  Versionen, `202601` ist die drittälteste davon. Zeiger: ebenda, Teil (at). **DAS IST EINE
  ANGABE ÜBER DEN STAND, KEIN VORSCHLAG EINER ZIELVERSION** — die Frage danach steht als
  ZUSCHNITT-FRAGE P11.7-17.

**ZUSATZ 2026-09-22 NACH DEM PINTEREST-CRAWL (VERMERK P11.7-7) — DIE PINTEREST-ZEILE DER
TABELLE DARÜBER BLEIBT WÖRTLICH STEHEN.** Sie sagt viermal "OFFEN", und das war für den
Zeitpunkt ihrer Niederschrift richtig; sie wird **nicht umgeschrieben**. Was hinzukommt,
sind VIER Angaben. **DIE ÜBRIGEN VIER ZEILEN SIND VON DIESEM ZUSATZ NICHT BERÜHRT.**
· **DIE GESENDETE VERSION IST `v5` — UND SIE STEHT INLINE IN DER URL-BILDUNG** (GEMESSEN am
  Repo, CC, 2026-09-22, HEAD `8cab827`): `src/lib/capi/pinterest-forward.ts` baut
  `https://api.pinterest.com/v5/ad_accounts/…/events` in einem Template-Literal; die Achse
  `api\.pinterest|/v[0-9]|VERSION|endpoint|https://` über die Datei trifft **genau diese
  eine Zeile**. **WEDER MODUL-KONSTANTE NOCH ENV-WEG** — darin unterscheidet sie sich von
  **beiden** bereits erhobenen Zielen: von meta, wo der Wert env-übersteuerbar ist, UND von
  linkedin, wo er wenigstens eine benannte Konstante ist. Eine Anhebung wäre hier eine
  Code-Änderung **an der URL-Bildung selbst**.
· **EIN ABSCHALTTERMIN IST NICHT DOKUMENTIERT, UND EIN LEBENSZYKLUS AUCH NICHT** —
  NICHT-TREFFER mit benannter Reichweite über VIER Seiten (Übersicht · Changelog ·
  API-Referenz-Einstieg · FAQ), Achse `sunset`, `deprecat`, `end of life`, `retire`, `v3`,
  `v4`. Die sechzehn `deprecat`-Treffer des Changelogs betreffen ausnahmslos einzelne
  Endpunkte oder Merkmale, **keiner die Version**. **DAS IST AUSDRÜCKLICH KEINE ZUSAGE AUF
  UNBEFRISTETHEIT** — dieselbe Lage wie bei google. Zeiger: docs/ziel-befunde.md, Abschnitt
  "Pinterest (Conversions API)", Teil (ag).
· **DIE SPALTE "bei Ablauf" BLEIBT UNBEKANNT, UND ZWAR AUS EINEM ANDEREN GRUND ALS BEI
  GOOGLE:** Dort ist sie "ungelesen"; hier ist sie **gelesen und leer** — es gibt keinen
  dokumentierten Ablauf, also auch keine dokumentierte Folge. Weder eine stille Umleitung
  (wie bei meta) noch ein lautes Scheitern (wie bei tiktok) ist behauptet.
· **WAS STATT DESSEN DASTEHT, UND ES IST DER OPERATIVE TEIL:** Breaking Changes kündigt der
  Anbieter über den Changelog an und **per E-Mail an die Kontakte, die unter den Angaben
  einer registrierten App hinterlegt sind.** **OB DAS UNSEREN ZUGANGSWEG ERREICHT, IST
  UNGELESEN** — Teil (r) hält fest, dass der Owner den Weg über die WERBE-Oberfläche
  genommen hat (Conversion-Token), nicht über eine App. Die Seite
  `…/docs/reference/manage-notifications/` ist als Grenzfall ausdrücklich **nicht geöffnet**
  worden. Zeiger: ebenda, Teil (ag).

**ZUSATZ 2026-09-22 NACH DER CODE-AUFKLÄRUNG (VERMERK P11.7-8, Zeile C4) — DIE TABELLE UND
DIE ZWEI ZUSÄTZE DARÜBER BLEIBEN WÖRTLICH STEHEN.** Überholt ist allein die Angabe der
google-Zeile "in dieser Runde NICHT am Code nachgesehen"; sie war für ihren Zeitpunkt
richtig und wird **nicht umgeschrieben**. **WAS HINZUKOMMT, SIND DREI ANGABEN.**
· **GOOGLE SENDET `v1`, INLINE IN EINER BENANNTEN ENDPUNKT-KONSTANTEN** (GEMESSEN am Repo,
  CC, 2026-09-22, HEAD `a763716`): `google-forward.ts:57 f.`,
  `const GOOGLE_INGEST_ENDPOINT = "https://datamanager.googleapis.com/v1/events:ingest";`.
  Der Bestands-Wert der Tabelle ist damit am Code bestätigt. **WEDER EIGENE
  VERSIONS-KONSTANTE NOCH ENV-WEG** — aber, anders als bei pinterest, eine benannte
  Konstante für die ganze Adresse. Eine Anhebung wäre eine Code-Änderung an dieser Zeile.
· **DIE SPALTE "FORM" FÄLLT ÜBER ALLE FÜNF ZIELE AUSEINANDER, UND ZWAR VOLLSTÄNDIG**
  (GEMESSEN, ebenda): meta **env-übersteuerbar mit Vorgabewert** (`config.ts:14`,
  verwendet `meta-forward.ts:353`) · linkedin **eigene Modul-Konstante ohne Env-Weg**
  (`linkedin-forward.ts:105`, Kopfzeile `:473`) · tiktok und google **Modul-Konstante für
  die ganze Adresse, Version darin** (`tiktok-forward.ts:71`, `google-forward.ts:57 f.`) ·
  pinterest **weder das eine noch das andere, inline im Template-Literal**
  (`pinterest-forward.ts:576`). **FÜNF ZIELE, VIER FORMEN.**
· **DIE ABDECKUNG DURCH TESTS FÄLLT EBENSO AUSEINANDER, UND ZWEI ZIELE SIND UNGEDECKT** —
  das ist der Befund, der die eigene ZUSCHNITT-FRAGE P11.7-23 trägt und hier nur
  angezeigt wird.

**DIE FÜNF FOLGENDEN STAMMEN AUS DEM LINKEDIN-CRAWL (VERMERK P11.7-6) UND BRECHEN DESHALB
DIE ABKÜRZUNG DIESES ABSCHNITTS** — ein "Teil (x)" meint hier sonst ausnahmslos den
**Meta**-Abschnitt; die fünf unten nennen ihren Abschnitt **jedes Mal ausgeschrieben.**

**ZUSCHNITT-FRAGE P11.7-14 — `li_fat_id` ALS ZUSÄTZLICHER EINTRAG NEBEN DER IP: LAUT DOKU
ZULÄSSIG UND EMPFOHLEN, AM ENDPUNKT UNGEMESSEN.**
GELESEN (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teile (aq), (ao)):
`user.userIds` ist eine Liste "of one or more identifiers"; der Anbieter rät ausdrücklich
zu mehreren ("Send multiple user identifiers if available, to increase match rates") und
nennt das Paar aus gehashter E-Mail und Klick-Kennung als beste Kombination. Ein
Doku-Beispiel trägt IP und Klick-Kennung im SELBEN Ereignis.
GEMESSEN (VERMERK P11.7-1 (d)): Der Adapter sendet heute **GENAU EINEN** Eintrag,
`PLAINTEXT_IP_ADDRESS`.
**WAS DIE GESTALT HIER BESONDERS MACHT — DER ADRESSWEG SETZT KEIN EINGEBAUTES TAG VORAUS**
(ebenda, Teil (an)): `li_fat_id` lässt sich allein aus der Seitenadresse lesen, und **unser
ausgelieferter Text trägt kein LinkedIn-Tag** (GEMESSEN, VERMERK P11.7-1 (b)). Der
Cookie-Weg dagegen verlangte ein eingebautes Insight Tag und steht damit heute nicht zur
Verfügung. **DIE FRAGE IST ALSO NICHT, OB EIN TAG NÖTIG WÄRE — SONDERN OB DER ADRESSWEG
ZUGESCHNITTEN WIRD.**
**DIE GRENZE, DIE MITMUSS:** `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` gehört zu den VIER
Symbolen, die **nie gesendet** worden sind; ob der Endpunkt den Wert fachlich annimmt und
ob er eine Liste mit ZWEI Einträgen annimmt, ist **UNGEMESSEN** (ebenda, Teile (b), (i),
(aj), (aq)). **OFFEN und hier nicht entschieden:** ob ein zweiter Eintrag gebaut wird, ob
er die IP ersetzt oder ergänzt, und welches Format der Wert haben muss — das Format ist
**nicht gelesen.** **KEINE EMPFEHLUNG.**

**ZUSATZ 2026-09-22 — DIE CODE-HÄLFTE AM CODE BESTÄTIGT, s. VERMERK P11.7-8, Zeile C10.**
Der Wortlaut der Frage bleibt unverändert, und **SIE BLEIBT OFFEN.** Bestätigt an HEAD
`a763716` ist allein die gemessene Ausgangslage: Der Adapter sendet **GENAU EINEN**
Eintrag, und der Wächter dafür ist schärfer als vermutet — `linkedin-forward.test.ts` T1-a
prüft `sentPayload()` per `toEqual` auf die **GANZE** Nutzlast, **ein zweiter
`userIds`-Eintrag wird also rot.** Das ist für die Scheibe, die P11.7-14 bauen würde, eine
Zusage und eine Auflage zugleich: Der Lauf ist der Ort, an dem die neue Gestalt sichtbar
entschieden wird, und er lässt sich nicht umgehen. **AN DER FRAGE SELBST ÄNDERT DAS
NICHTS** — ob der Endpunkt den Wert und eine Zweier-Liste annimmt, bleibt UNGEMESSEN, und
das Format ist nicht gelesen. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-15 — EINE GEMEINSAME BAUFORM FÜR ALLE KLICK-KENNUNGEN
(ARCHITEKTEN-VORSCHLAG 2026-09-22, NICHT ENTSCHIEDEN).**
**DIE GESTALT DES VORSCHLAGS:** **EINE** Stelle liest die bekannten Klick-Kennungen aus der
übergebenen Seitenadresse; jedes Ziel erhält nur die Kennung **seines Urhebers**; und wo
ein Ziel die Adresse selbst bekommt, werden die **fremden** Kennungen daraus entfernt.
**VORBILD IST `extractGoogleClickIds`** (`src/lib/capi/google-click-ids.ts`) — die einzige
Stelle des Repos, die das heute für ein Ziel tut (GEMESSEN, VERMERK P11.7-1 (d), (e)).
**DER GRUND: SIE SETZT DIE ENTSCHEIDUNG P11.7-3 AN EINEM ORT UM STATT JE ADAPTER.** Jene
Entscheidung ("EINE KLICK-KENNUNG GEHT NUR AN IHREN URHEBER", Zeiger oben unter
"Entscheidungen") wird heute vom Code VERLETZT: `eventSourceUrl` reist mitsamt Query-String
an meta, pinterest und tiktok (GEMESSEN, VERMERK P11.7-1 (g)). Fünf Adapter, die das je
für sich lösen, sind fünf Orte, an denen die nächste Kennung vergessen werden kann.
**WAS DER CRAWL DAZU BEIGETRAGEN HAT UND WAS NICHT:** Für DREI Ziele ist F4 inzwischen auf
Doku-Ebene beantwortet und die Antworten fallen **auseinander** — tiktok liest `ttclid`
aus der übergebenen Adresse SELBST aus (docs/ziel-befunde.md, Abschnitt "TikTok (Events API
2.0)", Teil (m)), meta schweigt dazu (ebenda, Abschnitt "Meta (Conversions API)", Teil
(q)), und linkedin bekommt die Adresse gar nicht erst (ebenda, Abschnitt "LinkedIn
(Conversions API)", Teile (ab), (n)). **GENAU DIESE UNGLEICHHEIT IST DAS ARGUMENT FÜR EINE
GEMEINSAME STELLE — UND ZUGLEICH IHRE SCHWIERIGKEIT:** Was "nur seine eigene" heisst, ist
je Ziel verschieden. **FÜR PINTEREST IST F4 UNVERÄNDERT OFFEN**, der Crawl steht aus.
**NICHT ENTSCHIEDEN:** ob die Bauform kommt · wo sie läge · welche Kennungen sie kennt ·
was sie mit einer UNBEKANNTEN Kennung täte · ob das Entfernen aus der Adresse und das
Setzen eines benannten Feldes dieselbe Scheibe sind. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-16 — IPv6 BEI LINKEDIN: DER RIEGEL KÖNNTE DEN IP-EINTRAG
AUSLASSEN, STATT DEN GANZEN FORWARD ZU VERWERFEN — WENN EINE ZWEITE KENNUNG VORLIEGT.**
GEMESSEN (VERMERK P11.7-5, Abschnitt "DER IPv4-RIEGEL UND SEIN GRUND"):
`forwardToLinkedin` bricht ab, wenn `isIpv4(clientIp)` falsch ist — **der GANZE Forward
entfällt dann**, nicht bloss ein Feld, weil die IP heute die EINZIGE Kennung ist und das
Pflicht-Paar trägt.
**DER GRUND DES RIEGELS BLEIBT UNBERÜHRT UND WIRD VON DIESER FRAGE NICHT ANGETASTET:** Eine
IPv6-Adresse darf nicht als IP-Symbol hinausgehen — beide IP-Symbole unterstützen laut Doku
nur IPv4, und die Schnittstelle prüft die FORM des Kennungs-Werts NICHT, ein falscher Wert
ginge also als Erfolg hinaus und liefe ins Leere. Der Befund steht in VERMERK P11.7-5; die
Quelle ist jetzt zusätzlich an EINER Stelle gelesen (docs/ziel-befunde.md, Abschnitt
"LinkedIn (Conversions API)", Teil (ao)).
**WAS SICH ÄNDERT, WENN P11.7-14 GEBAUT WIRD:** Läge `li_fat_id` als zweiter Eintrag vor,
wäre ein Ereignis auch OHNE IP vollständig — dann müsste der Riegel nur den IP-EINTRAG
auslassen statt den Forward zu verwerfen. **DAS IST EINE FOLGEFRAGE VON P11.7-14 UND OHNE
SIE GEGENSTANDSLOS.**
**DIE GRENZE:** Dass IPv6 überhaupt vorkommt, ist eine ANNAHME und nicht gehoben; **IPv6
ist gegen die Schnittstelle NIE probiert worden** (ebenda, Teil (j); dazu die Messfrage im
Block "WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT"). **KEINE EMPFEHLUNG.**

**ZUSATZ 2026-09-22 — DIE CODE-HÄLFTE AM CODE BESTÄTIGT, s. VERMERK P11.7-8, Zeile C10.**
Der Wortlaut der Frage bleibt unverändert, und **SIE BLEIBT EINE FOLGEFRAGE VON
P11.7-14.** Bestätigt an HEAD `a763716`: Beide Riegel kehren **VOR** dem `fetch` zurück
(`linkedin-forward.ts:394` und `:402`), der ganze Forward entfällt also tatsächlich statt
nur eines Feldes. Die Läufe T2-a bis T2-c (`linkedin-forward.test.ts`) decken beide Riegel
einzeln, T2-c zusätzlich den Rand "Zahlengruppe über 255". **KEINE EMPFEHLUNG**, und der
Grund des Riegels bleibt unangetastet.

**ZUSCHNITT-FRAGE P11.7-17 — DIE VERSIONS-ANHEBUNG TRIFFT META UND LINKEDIN BEIDE IM
JANUAR 2027, UND DIE ZIELVERSION IST VOR DEM ZUSCHNITT ZU LESEN.**
**DIE LAGE, je mit Zeiger:** meta `v21.0` bis **2027-01-21** unter dem Graph-Schema
(Abschnitt "Frist mit Termin" dieser Datei; welches Schema gilt, ist ungemessen) · linkedin
`202601` bis **2027-01-15** (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)",
Teil (at); an der Quelle gegengeprüft). **ZWEI ZIELE, SECHS TAGE AUSEINANDER.**
**DIE FRAGE IST NICHT "OB", SONDERN "WELCHE ZIELVERSION UND WAS SICH MIT IHR ÄNDERT".**
Für linkedin sind elf Versionen aktiv, die jüngste ist `202609`; **zwischen `202601` und
ihr liegen mindestens zwei funktionale Änderungen**, die gelesen und nicht bewertet sind —
zwei neue Conversion-Typen samt 180- und 365-Tage-Fenstern ab `202608`, die gehashten
Namensfelder ab `202609` (ebenda, Teile (at), (ao)). **WAS SICH SONST NOCH ÄNDERT, IST
NICHT ERHOBEN:** Der Anbieter führt eine eigene Seite dafür, und sie ist **vor** einem
Zuschnitt zu lesen, nicht währenddessen (`marketing/integrations/migrations`, gelesen nur
auf die Tabelle der Termine hin).
**EIN REIHENFOLGE-HINWEIS, KEINE ENTSCHEIDUNG:** Eine Anhebung, die eine Änderung an der
Nutzlast nach sich zieht, gehört FRÜH in die Phase und nicht an ihr Ende — sie berührt
denselben Code wie jede Kennungs-Scheibe. **FÜR LINKEDIN IST SIE ZWINGEND EINE
CODE-ÄNDERUNG** (Modul-Konstante ohne Env-Weg, s. den Zusatz an ZUSCHNITT-FRAGE P11.7-13);
für meta ist das offen. **KEINE EMPFEHLUNG**, weder zur Zielversion noch zum Zeitpunkt.

**ZUSCHNITT-FRAGE P11.7-18 — `externalIds` IST AUCH BEI LINKEDIN DER EINZIGE SELBST
VERGEBENE WERT: ZEIGER STATT KOPIE.**
GELESEN (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teil (ap)). **DIE
LAGE IST DIESELBE WIE BEI META UND TIKTOK, UND DIE FRAGE IST DORT BEREITS GESTELLT:**
ZUSCHNITT-FRAGE P11.7-4 dieser Datei, auf die auch ZUSCHNITT-FRAGE P11.7-12 verweist. Sie
wird hier **NICHT verdoppelt**, und es findet **KEINE DATENKLASSEN-ZUORDNUNG** statt.
**WAS HINZUKOMMT UND DORT NICHT STEHT — DREI ANGABEN:** LinkedIn verlangt **KEIN Hashen**
(anders als tiktok, das SHA-256 auch für Web verlangt) · die Liste fasst **höchstens EINEN**
Wert · **DIE BINDUNG DAUERT EIN JAHR UND GILT ÜBER ALLE WERBEKONTEN DESSELBEN BUSINESS
MANAGER HINWEG**, nachdem der Wert einmal zusammen mit einem regulären Merkmal gematcht
wurde. **DIE EIN-JAHR-BINDUNG IST DER TEIL, DER DIE BESTEHENDE FRAGE VERSCHÄRFT** — sie
macht aus einem je Anbieter vergebenen Bezeichner eine über Konten hinweg stabile
Zuordnung. **KEINE EMPFEHLUNG.**

**DIE DREI FOLGENDEN STAMMEN AUS DEM PINTEREST-CRAWL (VERMERK P11.7-7) UND BRECHEN DESHALB
DIE ABKÜRZUNG DIESES ABSCHNITTS** — ein "Teil (x)" meint hier sonst ausnahmslos den
**Meta**-Abschnitt; die drei unten nennen ihren Abschnitt **jedes Mal ausgeschrieben.**

**ZUSCHNITT-FRAGE P11.7-19 — `epik` HAT EIN BENANNTES FELD *UND* EINEN PLATZ IN DER
ADRESSE, UND DER ANBIETER BITTET UM BEIDE.**
GELESEN (docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teile (ac) und
(af)): Die Klick-Kennung gehört in `user_data.click_id` — **und dieselbe Doku verlangt
daneben**, "For Pinterest click events, include `&epik` query string… in the URL", also im
Feld, in dem wir heute `eventSourceUrl` übergeben.
**OB EINES DAS ANDERE ERSETZT, ERGÄNZT ODER DOPPELT, SAGT KEINE GELESENE SEITE.** Und **ob
der Anbieter die Adresse selbst ausliest, ist ausdrücklich NICHT beantwortet** — anders als
bei tiktok, wo der Satz wörtlich dasteht.
**FÜR DIE EINORDNUNG IN EINE GEMEINSAME BAUFORM GILT DER ZEIGER STATT DER KOPIE:**
ZUSCHNITT-FRAGE P11.7-15 dieser Datei ("EINE GEMEINSAME BAUFORM FÜR ALLE KLICK-KENNUNGEN").
Ihr Satz "FÜR PINTEREST IST F4 UNVERÄNDERT OFFEN, der Crawl steht aus" **bleibt wörtlich
stehen** und ist seit VERMERK P11.7-7 eingelöst; dieser Absatz löst ihn auf. **WAS ER FÜR
JENE FRAGE BEDEUTET:** Damit liegt für ALLE FÜNF Ziele eine Doku-Antwort auf F4 vor, und
**sie fallen weiterhin auseinander** — tiktok liest selbst aus, pinterest bittet um die
Kennung in der Adresse ohne zu sagen, dass es sie liest, meta schweigt, linkedin bekommt
die Adresse gar nicht, google hat kein Feld dafür. **DAS SCHÄRFT DAS ARGUMENT FÜR EINE
GEMEINSAME STELLE UND IHRE SCHWIERIGKEIT GLEICHERMASSEN.** **NICHT ENTSCHIEDEN, KEINE
EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-20 — ALLE ZIELE ÜBERGREIFEND: JEDES ZIEL MIT KLICK-KENNUNG
EMPFIEHLT, SIE IM BROWSER AUFZUBEWAHREN — UND DIESES PRODUKT BEWAHRT NICHTS AUF.**
**ARCHITEKT 2026-09-22 — BEFUND, KEINE ENTSCHEIDUNG.**
**DIE FUNDSTELLEN JE ZIEL, sämtlich in docs/ziel-befunde.md:**
· **pinterest** — der Anbieter rät ausdrücklich zum COOKIE statt zum Adress-Parameter:
  "Use the `_epik` cookie instead of the `&epik=` query parameter… passing `_epik` cookie
  values is necessary when a URL parameter is missing or removed and ensures greater
  coverage." Abschnitt "Pinterest (Conversions API)", Teil (ac).
· **meta** — der Anbieter empfiehlt, `_fbc` SELBST als Cookie mit 90 Tagen Laufzeit zu
  setzen oder den Wert im eigenen Backend zu halten. Abschnitt "Meta (Conversions API)",
  Teil (h); die Kollision ist bereits als ZUSCHNITT-FRAGE P11.7-2 geführt.
· **tiktok** — dritter Herkunftsweg "selbst auslesen und ablegen", empfohlene Haltedauer
  28 Tage. Abschnitt "TikTok (Events API 2.0)", Teil (j).
· **linkedin** — der Cookie-Weg trägt 30 Tage ab dem letzten Anzeigenklick, setzt aber ein
  eingebautes Insight Tag voraus. Abschnitt "LinkedIn (Conversions API)", Teil (an).
**DER ZUSTAND DIESES PRODUKTS, GEMESSEN (VERMERK P11.7-1 (a), (b), (f)):** Es gibt EINEN
Beacon, er liest GENAU EIN fremdes Cookie und keinen einzigen URL-Parameter; es gibt kein
eigenes Browser-Tag ausser Metas; und `persistEvent` schreibt fünf Werte, von denen keiner
eine Kennung ist. **UNTER DER ENTSCHEIDUNG P11.7-2 (Zeiger oben unter "Entscheidungen":
TRANSIT-ONLY für fremdvergebene Kennungen) SETZT DIESES PRODUKT KEIN EIGENES COOKIE UND
LEGT NICHTS AB.**
**DIE FOLGE, UND SIE IST DER GANZE BEFUND: EINE KLICK-KENNUNG IST NUR VERFÜGBAR, SOLANGE
DIE ADRESSE SIE TRÄGT.** Für eine EINSEITIGE Landingpage genügt das — die Landeseite ist
die Seite, auf der der Anzeigenklick ankommt. **FÜR SEITEN JENSEITS DER LANDESEITE GENÜGT
ES NICHT**, und das ist keine ferne Möglichkeit, sondern eine phasierte:
**docs/roadmap.md, Roadmap-Zeile 17 (Multi-Page-Funnels).**
**DORT IST DIE AUFBEWAHRUNG EINE OWNER-FRAGE**, weil sie die Grenze aus P11.7-2 berührt.
**HEUTE IST NICHTS ZU ENTSCHEIDEN UND NICHTS ZU BAUEN.** **KEINE EMPFEHLUNG**, weder zur
Form einer Aufbewahrung noch dazu, ob es je eine gibt.
**DIE GRENZE, DIE MITMUSS:** Dass die vier Anbieter es EMPFEHLEN, ist GELESEN. Wie gross
der Verlust ohne Aufbewahrung tatsächlich ist, ist **UNGEMESSEN** — kein Anbieter beziffert
ihn, und wir haben es nie gemessen.

**ZUSCHNITT-FRAGE P11.7-21 — EIN ANGEKÜNDIGTER, UNDATIERTER SCHEMA-WECHSEL KÖNNTE
`evaluateSuccessBody` EINEN ANGEKOMMENEN FORWARD ALS FEHLSCHLAG WERTEN LASSEN.**
GELESEN (docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (ak)): Der
Anbieter stellt sein Antwort-Schema um und **lässt optionale Felder mit Null-Werten weg** —
"gradually… to all endpoints", "plan to apply it to all public Pinterest API endpoints over
time". **KEIN DATUM, KEINE ENDPUNKT-LISTE.**
GEMESSEN am Repo (CC, 2026-09-22, HEAD `8cab827`): `evaluateSuccessBody` verlangt
`typeof num_events_received === "number"` und `typeof num_events_processed === "number"`.
**FIELE EINES DIESER ZWEI FELDER UNTER DIE UMSTELLUNG, WERTETE DER CODE EINEN ANGEKOMMENEN
FORWARD ALS FEHLSCHLAG** — und zwar still: es entstünde eine Logzeile, sonst nichts.
**OB SIE DARUNTER FALLEN KÖNNEN, SAGT DIE SEITE NICHT; ES IST UNGEMESSEN.**
**FÜR `error_message` UND `warning_message` BESTEHT DIE GEFAHR NICHT** —
`sanitizeProviderText` gibt für einen Nicht-String `"-"` zurück und deckt `""`, `null` und
ein fehlendes Feld gleich ab (GEMESSEN, ebenda).
**KEIN FIX-VORSCHLAG UND KEINE EMPFEHLUNG.**

**DIE FÜNF FOLGENDEN STAMMEN AUS DER CODE-AUFKLÄRUNG (VERMERK P11.7-8) UND BRECHEN DIE
ABKÜRZUNG DIESES ABSCHNITTS NICHT** — ein "Teil (x)" meint hier ausnahmslos den
**Meta**-Abschnitt, und diese fünf zitieren **überhaupt keinen Teil**: sie stützen sich
allein auf GEMESSENE Angaben über den EIGENEN Code. Wo sie einen Anbieter erwähnen, steht
der Zeiger ausgeschrieben.

**ZUSCHNITT-FRAGE P11.7-22 — META SENDET ZWEI VERLANGTE FELDER NUR BEDINGT, UND ES GIBT
KEINEN RIEGEL DAGEGEN.**
**BEFUND, KEIN FIX-VORSCHLAG.**
GEMESSEN am Code (CC, 2026-09-22, HEAD `a763716`): In `forwardToMeta`
(`src/lib/capi/meta-forward.ts`) steht `action_source: "website"` **UNBEDINGT** in der
Nutzlast (Zeile 310), `client_user_agent` dagegen hinter `if (userAgent)` (Zeile 297) und
`event_source_url` hinter `if (eventSourceUrl)` (Zeile 317).
GELESEN (docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)", Teil (l)): Für
Website-Ereignisse sind `action_source`, `event_source_url` und `client_user_agent`
**VERLANGT — das ist die ganze Pflicht-Liste.**
**DIE FOLGE, UND SIE IST STILL:** Fehlt die `user-agent`-Kopfzeile oder das Rumpf-Feld
`eventSourceUrl`, entsteht eine Nutzlast **OHNE ein verlangtes Feld, und sie wird trotzdem
gesendet.** `userAgent` entsteht in `handleIngest` als
`asString(request.headers.get("user-agent"))` (`ingest.ts:996`) und ist bei fehlender
Kopfzeile die leere Zeichenkette.
**DER UNTERSCHIED ZU DEN VIER ÜBRIGEN ADAPTERN IST DER EIGENTLICHE BEFUND, und er ist
gemessen:** pinterest und tiktok tragen je einen Riegel "beide oder keiner" und senden
ohne das Paar gar nicht; linkedin bricht ohne Identität ab. **NUR META HAT KEINEN.**
**WAS AM CODE NICHT ENTSCHEIDBAR IST:** ob ein fehlendes Pflichtfeld beim Anbieter ein
DEFEKT oder eine EINBUSSE ist. Genau diese Trennung ist der Grund, aus dem F3 so gestellt
ist; für meta ist sie auf Doku-Ebene beantwortet, am Endpunkt nicht.
**KEIN TEST DECKT DEN FALL** — s. ZUSCHNITT-FRAGE P11.7-23 und die Testbestands-Tabelle in
VERMERK P11.7-8. **NICHT ENTSCHIEDEN, KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-23 — ZWEI DER FÜNF ZIELE HABEN KEINEN WÄCHTER ÜBER IHRE VERSION
BZW. IHREN ENDPUNKT: EINE ANHEBUNG BLIEBE GRÜN, GLEICH WAS SIE TUT.**
**GEMESSEN am Repo (CC, 2026-09-22, HEAD `a763716`), je mit benannter Achse:**
· **DER META-VORGABEWERT IST VON KEINEM TEST GEDECKT.** **ZWÖLF** Testdateien mocken
  `@/lib/capi/config` und setzen `META_GRAPH_VERSION` selbst auf `"v21.0"` — zehn als
  Literal, zwei als mutierbaren Getter. **KEINE einzige Testdatei importiert
  `@/lib/capi/config`**; der einzige Treffer auf `from "./config"` ist
  `src/lib/domains/config.test.ts` und meint eine **ANDERE** Datei. **FOLGE: Eine Mutation
  von `config.ts:15` — etwa `"v21.0"` zu `"v22.0"` — lässt KEINEN Test rot werden.** Die
  Assertion in `src/app/api/capi/route.test.ts:109`, die wie ein Wächter aussieht, prüft
  den **gemockten** Wert gegen sich selbst.
· **DER LINKEDIN-ENDPUNKT IST VON KEINEM TEST GEDECKT.** Achse `api.linkedin` ·
  `LINKEDIN_ENDPOINT` · `fetchCalls()[0][0]` über `linkedin-forward.test.ts` — **null
  Treffer**; die Läufe greifen ausschliesslich auf `fetchCalls()[0][1]`, also Kopfzeilen
  und Rumpf. **POSITIVKONTROLLE im selben Lauf:** `LinkedIn-Version` trifft (`:115`), die
  Suche greift.
· **DIE GEGENPROBE, damit die zwei Nullen nicht als Eigenschaft des Bestands gelesen
  werden:** pinterest (`:438`, `:458`, `:526`), tiktok (`:358`) und google (`:25`/`:87`)
  nageln ihre volle Adresse **inklusive Versionsanteil** per `toBe` fest.
**DIE VERSCHRÄNKUNG IST EXAKT ÜBER KREUZ, und darin liegt die Frage:** linkedin hat als
einziges einen Wächter über die **VERSION** und keinen über die **ADRESSE**; bei den drei
anderen steckt die Version IN der Adresse und ist damit mitgedeckt; meta hat für die
Adresse einen Wächter, der seinen eigenen Mock prüft.
**WARUM DAS JETZT ZÄHLT UND NICHT IRGENDWANN:** Zwei Anhebungen sind terminiert
(ZUSCHNITT-FRAGE P11.7-17, meta und linkedin sechs Tage auseinander im Januar 2027), und
die Frist für meta steht im Abschnitt "Frist mit Termin" dieser Datei. **EINE ANHEBUNG
OHNE VORHERIGEN WÄCHTER BLIEBE AN ALLEN VIER GATES GRÜN, GLEICH WAS SIE TUT.**
**NICHT ENTSCHIEDEN:** ob ein Wächter vor der Anhebung entsteht · wo er ansetzte (am
Vorgabewert, an der gesendeten Adresse, an beiden) · ob er mit dem Versions-Wächter aus
ZUSCHNITT-FRAGE P11.7-13 dieselbe Sache ist oder eine andere. **KEINE EMPFEHLUNG.**

**ZUSCHNITT-FRAGE P11.7-24 — DIE SEITENADRESSE WIRD NIRGENDS GEPRÜFT, UND DAS URTEIL
DARÜBER STEHT SECHSMAL ZEICHENGLEICH.**
GEMESSEN am Code (CC, 2026-09-22, HEAD `a763716`):
· **SIE BETRITT DEN SERVER UNGEPRÜFT.** `handleIngest` parst den Rumpf
  (`src/lib/capi/ingest.ts:650`) und typisiert `eventSourceUrl?: unknown` (`:103`) in einem
  Blob, den der Kopfkommentar ausdrücklich als **UNTRUSTED** führt. Die Pflichtfeld-Prüfung
  (`:656–660`) fasst **nur** `trackingKey`, `eventID` und `event` an, dazu `body.obs`
  (`:668`). **`eventSourceUrl` wird im Handler kein einziges Mal berührt** — weder geprüft
  noch normalisiert noch gekappt.
· **DIE EINZIGE BEHANDLUNG IST EIN TRIM JE ADAPTER.** `asString(v)` =
  `typeof v === "string" ? v.trim() : ""` — und diese Funktion existiert **SECHSMAL
  ZEICHENGLEICH** im Repo: `ingest.ts:137`, `meta-forward.ts:59`, `pinterest-forward.ts:95`,
  `tiktok-forward.ts:456`, `linkedin-forward.ts:160`, `google-forward.ts:138` (alle sechs
  Rümpfe verglichen, identisch). Ein Längen-, Format- oder Schema-Urteil fällt an keiner.
· **WER SIE LIEST, JE SYMBOL:** meta `meta-forward.ts:316 f.` zu `event_source_url` ·
  pinterest `pinterest-forward.ts:538 f.` zu `event_source_url` · tiktok
  `tiktok-forward.ts:362 f.` zu `page.url` · google `google-forward.ts:279` über
  `extractGoogleClickIds`, **die Adresse selbst geht dort NICHT hinaus** · linkedin gar
  nicht, `LinkedinForwardBody` (`:513`) typisiert das Feld nicht einmal.
**WARUM DAS EINE FRAGE AN DEN ZUSCHNITT IST UND KEIN MANGEL-BERICHT:** Die Entscheidung
P11.7-3 verlangt, fremde Kennungen aus dieser Adresse zu ENTFERNEN. Eine Stelle, die
entfernt, ist zwangsläufig auch die erste, die den Wert ANFASST — die Frage "wo wird
geprüft" und die Frage "wo wird bereinigt" fallen damit möglicherweise zusammen, und die
sechs Kopien von `asString` sind der Ort, an dem das sichtbar würde.
**DIE SECHS KOPIEN SIND KEIN NEUER BEFUND UND WERDEN HIER NICHT ZUM VORHABEN GEMACHT** —
der Kopfkommentar an mehreren von ihnen führt die Doppelung ausdrücklich als gewollt.
**NICHT ENTSCHIEDEN, KEINE EMPFEHLUNG**, weder zu einer Prüfung noch zu einer
Zusammenlegung.

**ZUSCHNITT-FRAGE P11.7-25 — DIE SIEBEN KANDIDATEN ZUR GEMEINSAMEN BAUFORM, VERDICHTET:
JE EIN SATZ UND DER CODE-BEFUND, DER IHN ERZWINGT.**
**SIE IST DIE CODE-SEITE VON ZUSCHNITT-FRAGE P11.7-15** ("EINE GEMEINSAME BAUFORM FÜR ALLE
KLICK-KENNUNGEN") und ersetzt sie nicht: jene trägt die Gestalt des Vorschlags und die
Anbieter-Ungleichheit, diese die Auflagen, die der eigene Code stellt.
**WAS `extractGoogleClickIds` HEUTE IST** (`src/lib/capi/google-click-ids.ts`):
`(url: unknown) => GoogleClickIds`, rein, ohne `server-only`, ohne Netz, DOM oder Zustand,
**wirft nie** (ein `typeof`, ein `try/catch` um das einzige werfende `new URL(x)`, drei
Nachschläge). Rückgabe mit höchstens drei Schlüsseln; ein nicht gefundener Schlüssel
FEHLT, er ist nie `undefined`. Prüft **Anwesenheit, nie Form** — wörtliche Auflage im Kopf.
**KANDIDATEN JA, AUSWAHL NEIN. ALLE SIEBEN SIND KANDIDATEN.**
(1) **DIE RÜCKGABE-FORM IST HEUTE AUF EIN ZIEL FESTGELEGT** — `GoogleClickIds` (Zeile 52)
    kennt genau `gclid`/`gbraid`/`wbraid`, und der Kopf sagt ausdrücklich, sie sei **kein
    Alias auf ein fremdes Modell**. Kandidaten: Zuordnung Ziel nach Kennungen · flache
    Menge benannter Kennungen · je Ziel eine Funktion mit gemeinsamem Rückgabe-Vertrag.
(2) **DIE EINGABE IST EINE EINZIGE ZEICHENKETTE, UND DAS REICHT FÜR DIE COOKIE-WEGE
    NICHT** — s. ZUSCHNITT-FRAGE P11.7-26, wo der Befund vollständig steht.
(3) **SIE EXTRAHIERT, SIE ENTFERNT NICHT** — das Entfernen fremder Kennungen aus der
    Adresse gibt eine ZEICHENKETTE zurück, nicht ein Objekt. Kandidaten: zweite Funktion ·
    Rückgabe aus Kennungen PLUS bereinigter Adresse · zwei getrennte Scheiben. Dass diese
    Teilung offen ist, sagt ZUSCHNITT-FRAGE P11.7-15 bereits selbst.
(4) **DER ORT — UND HIER LIEGT DIE HARTE AUFLAGE, DIE JEDER ZUSCHNITT KENNEN MUSS.** Zwei
    Orte sind am Code sichtbar: IM ADAPTER, wie heute bei google
    (`google-forward.ts:279`), oder VOR dem Fan-Out. **`dispatchForward`
    (`src/lib/capi/ingest.ts:540`) IST NICHT ASYNC, UND ALLES, WAS DORT STEHT, LIEGT
    AUSSERHALB DES 204-CONTAINMENTS** — die Kommentare an der linkedin- und der
    google-Zeile sagen das wörtlich und lassen dort nur Eigenschafts-Lesungen und
    Objektliterale zu. **JEDE gemeinsame Stelle an diesem Ort müsste dieselbe Zusage
    tragen: SIE DARF NIE WERFEN.** `extractGoogleClickIds` erfüllt sie bereits, und ihr
    Kopf führt dieselbe Auflage aus demselben Grund. Der dritte Ort, `handleIngest` vor
    Zeile 1044, läge INNERHALB des `try` und wäre insoweit freier. **Ein Wurf im
    Ingest-Pfad machte aus der garantierten leeren 204 einen 500 und leakte den
    Gültigkeitszustand des trackingKeys** — s. docs/immer-beachten.md,
    "INGEST-204-CONTAINMENT".
(5) **DIE SIGNATUR VON `Forwarder` MÜSSTE WACHSEN, WENN DIE STELLE VOR DEM ADAPTER LIEGT**
    — heute reicht `body` durch, ein vorab gelöstes Ergebnis wäre ein ACHTER Parameter. Das
    Muster dafür steht am siebten (`ingest.ts:283–314`): nachgestellt und optional, damit
    die Adapter, die ihn nicht brauchen, byte-gleich bleiben. **DIE DORT VERWORFENE
    ALTERNATIVE — denselben Zustand ZUSÄTZLICH an `ResolvedTarget` zu hängen — IST MIT
    GRUND VERWORFEN** ("ZWEI Traeger desselben Zustands, und die koennten auseinanderlaufen")
    und wäre hier neu vorzutragen, nicht stillschweigend zu wiederholen.
(6) **`unknown` STATT `string` IST RICHTIG UND BLEIBT ES** — der Kopf begründet es mit
    `CapiRequestBody` (`ingest.ts:98–110`), das JEDES Rumpf-Feld als `unknown` typisiert;
    am Code bestätigt. Eine gemeinsame Stelle vor dem Adapter sähe denselben rohen Typ.
(7) **DIE AUFLAGE "ANWESENHEIT, NIE FORM" IST HEUTE ZIEL-SPEZIFISCH BEGRÜNDET** — sie ruht
    darauf, dass über die Form einer echten `gclid` nichts gelesen ist. Für **zwei weitere
    Ziele steht jetzt dasselbe im Bestand**: das Format von `li_fat_id` und das von `epik`
    sind je ein Nicht-Treffer mit benannter Reichweite. **OB DIE AUFLAGE DAMIT FÜR ALLE
    GILT, IST EINE ENTSCHEIDUNG UND HIER NICHT GETROFFEN.**
**WAS AM CODE NICHT ENTSCHEIDBAR IST:** was "nur seine eigene Kennung" je Ziel heisst —
das ist die Anbieter-Achse, und ZUSCHNITT-FRAGE P11.7-15 führt sie samt der gelesenen
Ungleichheit. **KEINE EMPFEHLUNG an irgendeinem der sieben Punkte.**

**ZUSCHNITT-FRAGE P11.7-26 — DIE COOKIE-WEGE DER ANBIETER SIND ÜBER DIE HEUTIGE
BEACON-FORM NICHT ERREICHBAR, UND DER WEG DORTHIN FÜHRT DURCH DEN `/api/e`-PFAD.**
GEMESSEN am Code (CC, 2026-09-22, HEAD `a763716`): `buildCapiBeaconStatement`
(`src/lib/tracking/meta.ts:420–448`) liest **GENAU EIN** Cookie — `_fbp` über
`document.cookie.match(/(?:^|; )_fbp=([^;]*)/)` (Zeile 435) — und setzt
`eventSourceUrl: location.href` (Zeile 440). **KEIN EINZIGER URL-PARAMETER WIRD
AUSGELESEN.** Der PageView-Emitter und die Pixel-Bestätigung senden weder das eine noch
das andere (`meta.ts:464`, "BARE Payload"). Der Befund aus VERMERK P11.7-1 (a) ist damit an
HEAD bestätigt.
**DIE ANBIETER-SEITE, je mit ausgeschriebenem Zeiger** — alle vier Angaben GELESEN und in
dieser Datei bereits abgelegt: pinterest rät zum `_epik`-COOKIE **statt** zum Parameter
(docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (ac)) · meta empfiehlt,
`_fbc` selbst als Cookie zu setzen (ebenda, Abschnitt "Meta (Conversions API)", Teil (h)) ·
tiktok nennt ein gleichnamiges First-Party-Cookie (ebenda, Abschnitt "TikTok (Events API
2.0)", Teil (j)) · linkedin einen gleichnamigen Cookie mit 30 Tagen (ebenda, Abschnitt
"LinkedIn (Conversions API)", Teil (an)).
**DIE FOLGE, UND SIE IST DER GANZE INHALT DIESER FRAGE: EIN COOKIE-WERT STEHT NICHT IN
`eventSourceUrl` UND IST ÜBER SIE NICHT ZU ERREICHEN.** Wer einen Cookie-Weg zuschneidet,
braucht **NEUE FELDER IM BEACON-RUMPF** — und der Beacon läuft auf `/api/e`, also auf dem
Pfad, den JEDER Besucher JEDER Kundenseite trifft. **DAS BERÜHRT DIE A-REGEL
"/API/E-SCHLANKHEIT"** (CLAUDE.md, "## Code-Qualität, Performance & SaaS-Skalierung"), und
zwar an ihrem Kopf: jede zusätzliche Arbeit je Beacon multipliziert sich über alle Kunden.
**ES BERÜHRT AUSSERDEM ZWEI BEREITS GEFÜHRTE SÄTZE, die hier nur angezeigt und nicht
wiederholt werden:** die Kollision der Meta-Empfehlung mit der Datenklassen-Grenze
(ZUSCHNITT-FRAGE P11.7-2) und den Befund, dass dieses Produkt nichts aufbewahrt
(ZUSCHNITT-FRAGE P11.7-20).
**DIE GRENZE, DIE MITMUSS:** Ein zusätzliches Rumpf-Feld ist **nicht** dasselbe wie eine
Aufbewahrung — das Lesen eines Cookies, das ein fremdes Tag gesetzt hat, legt nichts ab.
Ob und wo diese Unterscheidung trägt, entscheidet die Entscheidung P11.7-2 und **nicht
diese Frage.**
**NICHT ENTSCHIEDEN:** ob Cookie-Wege überhaupt zugeschnitten werden · welche Felder der
Beacon dann trüge · ob das je Ziel oder gebündelt geschähe. **KEINE EMPFEHLUNG.**

## Nächster Schritt

**DER ANBIETER-CRAWL, NACH DEM PFLICHT-STOPP.** CLAUDE.md, "## Anbieter-Befunde der
Fan-Out-Ziele", schreibt seit dem 2026-09-22 zwei Formen vor: VOLLLADUNG von
docs/ziel-befunde.md für Zuschnitt, Adapter und Live-Test-Anleitung — oder, wo der freie
Kontext sie nicht trägt, eine GEZIELTE SUCHE mit benannter Achse und Positivkontrolle, die
im ERSTEN SATZ des Berichts ausgewiesen wird.

**BEI DICHTEM ERGEBNIS WIRD GETEILT, NICHT GEDRÜCKT:** Eine Sitzung lädt
docs/ziel-befunde.md vollständig und hält fest, was die Datei über das Ziel bereits trägt;
der Crawl läuft in einer ZWEITEN. Die Datei ist 549 237 Bytes / 7 749 Zeilen (GEMESSEN,
CC, 2026-09-21) — eine Sitzung, die voll lädt und danach crawlt, gibt es nicht.

**KEIN ZUSCHNITT VOR DEM CRAWL.** Auch keine Scheibe "nur mal fbc", auch nicht für das
Ziel, dessen Antwort am naheliegendsten scheint.

**WAS DER CRAWL NICHT ENTSCHEIDET:** die Datenklassen-Fragen. Sie sind am 2026-09-22
entschieden (P11.7-2 bis P11.7-4) und werden von einem Anbieter-Befund nicht berührt — ein
Anbieter sagt, was er annimmt, nicht, was wir ablegen dürfen.

**NACHGEZOGEN AM 2026-09-22, NACH DEM CRAWL — DIE ABSÄTZE DARÜBER BLEIBEN WÖRTLICH.** Sie
sind als Anweisung eingelöst und als Beschreibung des Verfahrens weiter richtig; überholt ist
allein, welches Ziel noch aussteht.
**EIN ZIEL VON FÜNF IST GECRAWLT: META** (VERMERK P11.7-2; die Befunde in
docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)", Teile (h) bis (u)). **DER
NÄCHSTE SCHRITT IST DERSELBE CRAWL FÜR DIE VIER ÜBRIGEN** — pinterest, tiktok, linkedin,
google —, je Ziel eine eigene Runde. **KEIN ZUSCHNITT VOR DEM CRAWL GILT UNVERÄNDERT UND
JETZT AUSDRÜCKLICH AUCH FÜR META:** dass für meta alles Gelesene vorliegt, ist kein Grund
für eine Scheibe "nur mal meta" — der Satz oben nennt genau diesen Fall.
**DIE GETEILTE FORM HAT SICH AN META NICHT ALS NÖTIG ERWIESEN, und das ist ein Messwert und
keine Lockerung:** Die gezielte Suche über den Meta-Abschnitt ergab ein DÜNNES Ergebnis —
fünf echte Treffer in zwei Zusammenhängen —, und deshalb passten Bestand-Prüfung und Crawl
in EINE Sitzung. **BEI EINEM DICHTEN ABSCHNITT GILT DIE TEILUNG UNVERÄNDERT**; google und
linkedin sind die mit Abstand grössten Abschnitte jener Datei, und für sie ist das dünne
Ergebnis von meta kein Präzedenzfall.
**EINE ANGABE DARÜBER IST ALT UND NICHT FALSCH:** "549 237 Bytes / 7 749 Zeilen" ist
datiert auf den 2026-09-21. Die Datei ist seither gewachsen, auch durch diese Runde; die
Zahl wird hier **NICHT nachgezogen** (docs/immer-beachten.md, "EINE DATEI, DIE IHRE EIGENE
GRÖSSE IM PRÄSENS NENNT, ERZEUGT EINEN KREISLAUF AUS NACHZÜGEN"). Wer den heutigen Wert
braucht, misst ihn.

**ZWEITER NACHZUG AM 2026-09-22, NACH DER GOOGLE-BESTANDSAUFNAHME — ALLE ABSÄTZE DARÜBER
BLEIBEN WÖRTLICH.** Überholt ist allein die AUFZÄHLUNG der Ziele, die noch ausstehen.
**GOOGLE FÄLLT AUS DER LISTE — NICHT WEIL ES GECRAWLT WÄRE, SONDERN WEIL FÜR ES KEIN CRAWL
LÄUFT** (ARCHITEKTEN-ENTSCHEIDUNG 2026-09-22, Grund und Beleg: VERMERK P11.7-3; der Stand
seiner Fragen: die google-Tabelle im Abschnitt "Offene Fragen an den Anbieter-Crawl").
**ES BLEIBEN DREI: pinterest, tiktok, linkedin. "KEIN ZUSCHNITT VOR DEM CRAWL" GILT FÜR DIESE
DREI UNVERÄNDERT**; was der Satz für google bedeutet, ist am Vermerk **NICHT entschieden.**

**DRITTER NACHZUG AM 2026-09-22, NACH DEM TIKTOK-CRAWL — ALLE ABSÄTZE DARÜBER BLEIBEN
WÖRTLICH.** Überholt ist allein die Aufzählung der Ziele, die noch ausstehen.
**TIKTOK IST GECRAWLT** (VERMERK P11.7-4; die Befunde in docs/ziel-befunde.md, Abschnitt
"TikTok (Events API 2.0)", Teile (j) bis (p)). **ES BLEIBEN ZWEI: pinterest und linkedin**,
je eine eigene Runde. **"KEIN ZUSCHNITT VOR DEM CRAWL" GILT FÜR DIESE ZWEI UNVERÄNDERT UND
JETZT AUSDRÜCKLICH AUCH FÜR TIKTOK** — dass für tiktok alles Gelesene vorliegt, ist kein
Grund für eine Scheibe "nur mal tiktok".
**DIE GETEILTE FORM WAR AUCH HIER NICHT NÖTIG, UND DAS IST WIEDER EIN MESSWERT UND KEINE
LOCKERUNG:** Der TikTok-Abschnitt ist mit 271 Zeilen der KLEINSTE der Datei (GEMESSEN, CC,
2026-09-22). **FÜR LINKEDIN IST DAS KEIN PRÄZEDENZFALL** — jener Abschnitt ist nach google
der zweitgrösste.

**VIERTER NACHZUG AM 2026-09-22, NACH DER LINKEDIN-BESTANDSAUFNAHME — ALLE ABSÄTZE DARÜBER
BLEIBEN WÖRTLICH.** An der AUFZÄHLUNG ist nichts überholt: **ES BLEIBEN WEITERHIN ZWEI,
pinterest und linkedin** — **linkedin ist NICHT gecrawlt.** Der Satz des Absatzes darüber
hat sich bestätigt: die gezielte Suche über den LinkedIn-Abschnitt ergab ein DICHTES
Ergebnis, die geteilte Form greift also.
**WAS SICH ÄNDERT, IST DIE GESTALT DER LINKEDIN-RUNDE.** Ihre erste Hälfte ist gefahren
(VERMERK P11.7-5), und der Crawl ist auf die Liste beschränkt, die der Abschnitt "Offene
Fragen an den Anbieter-Crawl" unter "DIE CRAWL-LISTE FÜR LINKEDIN (2026-09-22)" führt.
**WER FÜR LINKEDIN EINEN VOLLEN CRAWL FÄHRT, FÄHRT MEHR ALS BESCHLOSSEN IST.**
**"KEIN ZUSCHNITT VOR DEM CRAWL" GILT FÜR BEIDE ZIELE UNVERÄNDERT** — auch für linkedin,
dessen Bestand jetzt vollständig gesichtet ist.

**FÜNFTER NACHZUG AM 2026-09-22, NACH DEM BESCHRÄNKTEN LINKEDIN-CRAWL — ALLE ABSÄTZE
DARÜBER BLEIBEN WÖRTLICH.** Überholt ist allein die Aufzählung der Ziele, die noch
ausstehen — und **EIN SATZ DES VIERTEN NACHZUGS IST EINGELÖST**: "linkedin ist NICHT
gecrawlt" war am Vormittag richtig und ist es seit VERMERK P11.7-6 nicht mehr. Er wird
**NICHT umgeschrieben**; dieser Absatz löst ihn auf.
**LINKEDIN IST GECRAWLT, UND ZWAR BESCHRÄNKT** (VERMERK P11.7-6; die Befunde in
docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teile (an) bis (at)). **DIE
BESCHRÄNKUNG IST KEINE UNVOLLSTÄNDIGKEIT, SONDERN DER BESCHLUSS AUS P11.7-5** — gefahren
ist genau die Crawl-Liste, und wer für linkedin nachträglich einen vollen Crawl fährt,
fährt weiterhin mehr als beschlossen ist.
**ES BLEIBT EINS: PINTEREST.** Für dieses Ziel stehen F1 bis F4 und F8 unverändert offen;
**der Erfolgsrumpf (F8) ist die EINZIGE der vier alten Fragen, die eine MESSUNG verlangt**,
und eine Lesung erreicht sie nicht. Ob für pinterest die geteilte Form nötig ist, ist
**nicht erhoben** — die Grösse seines Abschnitts ist in dieser Runde nicht gemessen worden.
**"KEIN ZUSCHNITT VOR DEM CRAWL" GILT UNVERÄNDERT UND JETZT AUSDRÜCKLICH AUCH FÜR
LINKEDIN** — dass für linkedin alles Gelesene vorliegt, ist kein Grund für eine Scheibe
"nur mal linkedin". Der Satz oben nennt genau diesen Fall.

**SECHSTER NACHZUG AM 2026-09-22, NACH DEM PINTEREST-CRAWL — ALLE ABSÄTZE DARÜBER BLEIBEN
WÖRTLICH.** Überholt ist die Aufzählung der Ziele, die noch ausstehen — und **ZWEI SÄTZE
DES FÜNFTEN NACHZUGS SIND EINGELÖST**, die hier aufgelöst und **NICHT umgeschrieben**
werden: "ES BLEIBT EINS: PINTEREST" war am Vormittag richtig; und "Ob für pinterest die
geteilte Form nötig ist, ist nicht erhoben" ist es seit VERMERK P11.7-7 nicht mehr — der
Abschnitt ist **608 Zeilen / 42 874 Bytes** (GEMESSEN, CC, 2026-09-22), die geteilte Form
war nicht nötig.

**PINTEREST IST GECRAWLT** (VERMERK P11.7-7; die Befunde in docs/ziel-befunde.md, Abschnitt
"Pinterest (Conversions API)", Teile (ac) bis (ak)). **ES BLEIBT KEINES: ALLE FÜNF ZIELE
SIND DURCHLAUFEN** — meta (P11.7-2), google aus dem Bestand ohne Crawl (P11.7-3), tiktok
(P11.7-4), linkedin beschränkt (P11.7-5 und P11.7-6), pinterest (P11.7-7).

**"ALLE CRAWLS SIND DURCH" HEISST NICHT "ALLES IST BEANTWORTET", und der Satz muss mit:**
Was nur ein Aufruf gegen den Endpunkt zeigt, steht je Ziel ausdrücklich als NICHT
BEANTWORTET in der Ablage — **für pinterest ist das F8**, der Erfolgsrumpf, die einzige der
vier alten Fragen, die eine MESSUNG verlangt. Der Satz des fünften Nachzugs dazu gilt
unverändert: **eine Lesung erreicht sie nicht.**

**DER NÄCHSTE SCHRITT IST EINE AUFKLÄRUNG AM CODE, NICHT DER ZUSCHNITT.** Die
ZUSCHNITT-FRAGEN dieses Abschnitts haben über fünf Crawls hinweg Fragen AN DEN EIGENEN CODE
angesammelt, die keine Anbieter-Lesung beantwortet — unter anderem, ob jeder der fünf
Adapter die Pflichtfelder seines Anbieters sendet (P11.7-3), welcher der zwei Google-Orte
für IP und User-Agent zu unserem Zeitpunkt passt (P11.7-6), ob die Fehlerdeutung des
TikTok-Adapters zwei Fälle mit HTTP 401 trennt (P11.7-11), und ob eine Sitzung die
Volladung von docs/ziel-befunde.md für einen Zuschnitt überhaupt trägt (P11.7-8).
**SIE WERDEN IN EINER RUNDE AM CODE BEANTWORTET, BEVOR ZUGESCHNITTEN WIRD.**

**KEIN ZUSCHNITT VOR DIESER AUFKLÄRUNG.** Der Satz "KEIN ZUSCHNITT VOR DEM CRAWL" ist mit
dem fünften Ziel eingelöst; **an seine Stelle tritt dieser** — und aus demselben Grund:
Ein Zuschnitt gegen ungeprüfte Annahmen über den eigenen Code ist so wenig wert wie einer
gegen eine geratene Feldliste. **Auch keine Scheibe "nur mal pinterest", und auch nicht für
das Ziel, dessen Antwort am vollständigsten scheint.**
