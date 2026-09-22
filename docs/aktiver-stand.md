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
