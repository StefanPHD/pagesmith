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
- Vermerke
- Entscheidungen, die über ihre Scheibe hinaus binden
- Vorrat (gemeldet, nicht gebaut)
- Offene Fragen an den Anbieter-Crawl
- Nächster Schritt

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
