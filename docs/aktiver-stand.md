# Aktiver Stand — Phase 11.7

**DIESE DATEI IST DAS PFLICHT-GATE.** Ab jetzt liest JEDE Sitzung, die an dieser Phase
arbeitet, sie ZUERST und VOLLSTÄNDIG — als "Auftrag 0" jedes Bau- und
Aufklärungs-Prompts. Das ist kein Vorschlag (CLAUDE.md, "## Aktiver Stand — Verfahren ab
Phase 10").

**ANGELEGT AM 2026-09-22**, mit dem Ergebnis der ersten Aufklärung der Phase — also mit
der ersten Tatsache, nicht vorher.

**SIE IST NICHT GETEILT.** Es gibt kein Archiv und keinen Vorrat als eigene Datei; alles
steht hier. Unterhalb von 4000 Zeilen wird nicht geteilt — das ist ein Verbot, keine
Schwelle.

**DIE NUMMERN TRAGEN DAS PRÄFIX `P11.7-n`**, laufen über alle Gattungen getrennt
(Vermerk, Entscheidung, Vorrat, offene Frage) und werden NIE neu vergeben. Ein neuer
Eintrag tritt hinten an, auch wenn er der jüngste ist.

**VERDICHTET AM 2026-09-22 (OWNER-ENTSCHEIDUNG, Token-Diät).** Sie wird von fast jedem
Prompt vollständig gelesen; Crawl-Material, dessen Inhalt in docs/ziel-befunde/ steht, ist
durch Zeiger ersetzt, Vermerke sind auf ihre harten Angaben gekürzt, beantwortete Fragen
auf Titel und Beleg. **KEINE OFFENE FRAGE IST ENTFALLEN, und keine Nummer ist neu
vergeben. DIE UNGEKÜRZTE FASSUNG STEHT UNTER COMMIT `11a44f7`** — wer eine Herleitung
vermisst, liest sie dort, nicht hier.

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
- Zuschnitt der Phase 11.7
- Nächster Schritt

## Gegenstand der Phase

Phase 11.7 hiess bis zum 2026-09-22 "Anbieter-Befunde nachziehen: die VIER GEBAUTEN
ZIELE" und trug VIER Punkte — Katalog-Lücken an tiktok (Deduplizierung), meta
(Versionsangabe), meta/tiktok/linkedin (Rate-Limits) und pinterest (Erfolgsrumpf).

**AM 2026-09-22 IST EIN FÜNFTER PUNKT HINZUGETRETEN (OWNER):** KLICK-KENNUNGEN UND
MATCH-FELDER ALLER GEBAUTEN ZIELE — jedes Netzwerk soll die Daten bekommen, mit denen es
bestmöglich optimiert, mit Blick auf spätere interne Analytics und CRM.

**DER VOLLTEXT BEIDER TEILE STEHT IN docs/roadmap.md, Roadmap-Zeile 11.7** — die vier
Punkte im Text vom 2026-08-20, der fünfte in der ERWEITERUNG VOM 2026-09-22.

**GOOGLE GEHÖRT NUR ZUM FÜNFTEN PUNKT.** Die vier Punkte darüber bleiben bei den vier
Zielen, für die sie als Katalog-Lücken festgestellt wurden.

## Was den Zuschnitt bindet

**DER ZUSCHNITT STEHT SEIT DER OWNER-ENTSCHEIDUNG VOM 2026-09-22 IM ABSCHNITT "Zuschnitt der
Phase 11.7".** Die Teile der Zuschnitt-Fragen P11.7-1, -13, -15 und -23, die er festlegt,
sind dort benannt; alle übrigen bleiben offen.

**DER PFLICHT-STOPP GILT** in der Form, die CLAUDE.md, "## Anbieter-Befunde der
Fan-Out-Ziele", seit dem 2026-09-22 vorschreibt: VOLLLADUNG der Datei des Ziels unter
docs/ziel-befunde/ plus der Kopf von docs/ziel-befunde.md. Eine Scheibe, die mehrere
Ziele berührt, lädt alle betroffenen Dateien; trägt eine Sitzung das nicht, wird die
Scheibe je Ziel geschnitten.

**DIE ERSTE BAU-SCHEIBE, DIE EINE KENNUNG DURCHLEITET, TRÄGT EINEN PFLICHT-NACHWEIS**, der
nicht aus dieser Phase stammt: die Messung auf Ablage und Logausgabe am gebauten
Google-Transport (docs/offene-punkte.md, Posten "DIE PRÄMISSE VON PUNKT (a) DES
DATENKLASSEN-BLOCKS IST TOT", Satz vom 2026-09-22). Achse: ALLE `console`-Aufrufe im
Produktivcode unter `src/`, binärsicher gelesen, plus die Schreibpfade, mit
Positivkontrolle. **DIE LOG-ACHSE IST IN VERMERK P11.7-8 ERHOBEN, DIE SCHREIBPFADE SIND
ES NICHT** — wer den Posten früher schliesst, schliesst ihn auf einer halben Messung.

## Frist mit Termin — sie wartet nicht auf das Phasenende

**DIESER ABSCHNITT TRÄGT GENAU EINEN POSTEN, UND ER HAT EIN DATUM.** Er steht nicht im
Vorrat, und das ist der ganze Zweck des eigenen Abschnitts: **der Vorrat wird am Phasenende
gehoben, diese Frist kann das nicht abwarten.** Sie gilt unabhängig davon, ob die Phase 11.7
zugeschnitten, gebaut oder verworfen wird.

**DIE ANHEBUNG DER GRAPH-API-VERSION MUSS VOR DEM 2027-01-21 GEBAUT SEIN.**

**DER ZUSTAND, GEMESSEN am Repo (CC, 2026-09-22, HEAD `354a6e5`):** Der Meta-Adapter sendet
`v21.0`. `META_GRAPH_VERSION` (`src/lib/capi/config.ts`) trägt den Vorgabewert `"v21.0"` und
ist über die Umgebungsvariable gleichen Namens übersteuerbar; verwendet in
`src/lib/capi/meta-forward.ts`. **WAS IN DER PRODUKTIONSUMGEBUNG GESETZT IST, IST AM REPO
NICHT FESTSTELLBAR und ausdrücklich nicht erhoben** — steht dort ein höherer Wert,
verschiebt sich der Termin, und der Posten ist dann an der Umgebung neu zu prüfen.

**DER TERMIN, GELESEN 2026-09-22** (docs/ziel-befunde/meta.md, Teil (s)): `v21.0` bis
"January 21, 2027" nach der Graph-Tabelle; die Marketing-Tabelle derselben Seite führt
`v21.0` überhaupt nicht. Welche der beiden für `/{PIXEL_ID}/events` gilt, ist **UNGEMESSEN**.
**DER 2027-01-21 IST DIE SPÄTESTMÖGLICHE GRENZE, NICHT DIE WAHRSCHEINLICHSTE** — das
Graph-Schema ist das mildere; wer auf die Messung wartet, kann die Frist nur verkürzen.

**DER ABLAUF ERZEUGT KEINEN FEHLER** (ebenda, Teil (t)): Unter dem Graph-Schema wird ein
Aufruf an eine abgelaufene Version "defaulted to the next oldest, usable version" — der
Adapter bekommt **weiter eine Erfolgsantwort, von einer Version, die er nicht gewählt hat.**
**Nichts im eigenen Code wird davon rot, und keine Logzeile entsteht.** Welche
Validierungsregeln eine untergeschobene Version mitbringt, ist ungemessen.

**OB DIE ANHEBUNG ÜBER DIE UMGEBUNG ODER DEN VORGABEWERT LÄUFT, IST NICHT ENTSCHIEDEN.
KEINE EMPFEHLUNG.**

**WO DIESER POSTEN AUF DAUER HINGEHÖRT, und er ist es heute nicht:** nach
docs/offene-punkte.md, mit Titel und Trigger als Stub-Zeile in CLAUDE.md (Weg 3). **DIE
NÄCHSTE RUNDE, DIE JENE DATEI OHNEHIN ÖFFNET, TRÄGT DIESE FRIST DORTHIN** — mit dem Termin
im Trigger. Solange sie hier steht, stirbt sie mit dem Phasenende, und **die Archivierung
der Standdatei ist keine Erledigung der Frist.**

## Vermerke

### VERMERK P11.7-1 — Aufklärung vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD `9abdd2a` · Arbeitsbaum sauber · READ-ONLY ·
docs/ziel-befunde.md weder geladen noch durchsucht · kein Crawl. Kein Bau-Commit: vor dem
Anbieter-Crawl war nicht entscheidbar, WELCHES Feld je Ziel zu bauen wäre.

**DER GEMESSENE BESTAND (CC, 2026-09-22, HEAD `9abdd2a`) — er ist die Ausgangslage jedes
Zuschnitts:**

(a) **ES GIBT EINEN BEACON, NICHT FÜNF.** `buildCapiBeaconStatement`
    (src/lib/tracking/meta.ts) baut den Klick-Beacon für ALLE Ziele, liest GENAU EIN
    Cookie (`_fbp`) und `location.href` als `eventSourceUrl`. **KEIN EINZIGER
    URL-PARAMETER WIRD AUSGELESEN.** Rumpf: `trackingKey`, `eventID`, `event`,
    `eventSourceUrl`, `isCustom`, `cns`, optional `value`, `currency`, `_fbp`.
(b) **EIN EINZIGES VENDOR-BROWSER-TAG:** Metas `fbq`. Für pinterest, tiktok, linkedin und
    google existiert KEIN eigenes Browser-Tag (Gegenprobe auf `pintrk`, `ttq`, `lintrk`,
    `gtag` u. a. trifft nur die Fremd-Pixel-Erkennung der Phase 11.11).
(c) **PAGEVIEW-EMITTER UND PIXEL-BESTÄTIGUNG SENDEN BARE** — `trackingKey`, `eventID`,
    `event`, bei der Bestätigung plus `obs`. Kein Cookie, keine Adresse.
(d) **MATCH-FELDER JE ZIEL:** meta DREI in `user_data` (`client_ip_address`,
    `client_user_agent`, `fbp`) plus `event_source_url`, **KEIN `fbc`** · pinterest ZWEI
    (IP, UA aus Headern, Paar-Riegel) plus `event_source_url` · tiktok ZWEI (`user.ip`,
    `user.user_agent`, Paar-Riegel) plus `page.url` · linkedin EINS
    (`PLAINTEXT_IP_ADDRESS`, **nur IPv4**), UA wird nicht übergeben, Adresse nicht gelesen ·
    google **NUR die Klick-Kennungen** aus `extractGoogleClickIds(eventSourceUrl)`, weder
    IP noch UA, leere Menge → `reason = "no_click_id"`.
(e) **KEINE KLICK-KENNUNG AUSSER GOOGLES WIRD BENANNT GEFÜHRT.** Über `src/`: `fbc`,
    `fbclid`, `_fbc`, `ttclid`, `_ttp`, `epik`, `li_fat_id` je **0**; `gclid` 36 (6 ohne
    Tests), `gbraid` 10 (3), `wbraid` 8 (3), `_fbp` 17 (12). POSITIVKONTROLLE:
    `eventSourceUrl` 17 ohne Tests. **Die sieben Namen sind Suchbegriffe aus einem
    Architekten-Vorschlag, keine Anbieter-Befunde.**
(f) **NICHTS WIRD PERSISTIERT.** `persistEvent` schreibt GENAU FÜNF Werte: `project_id`,
    `event_type`, `event_id`, `source`, `variant`.
(g) **DIE UNBENANNTE DURCHLEITUNG BESTEHT.** `eventSourceUrl` ist `location.href` samt
    Query-String; meta, pinterest und tiktok reichen es weiter. **Ein `gclid` reist heute
    an drei Ziele, die es nicht vergeben haben.**
(h) Die Zahl VIER im Titel der Roadmap-Zeile war eine korrekte Momentaufnahme vom
    2026-08-20; `'google'` kam am 2026-08-31 zu `TRACKING_TARGETS` hinzu.

**ZWEI "NICHT ENTSCHEIDBAR"-PUNKTE JENES TAGES SIND NOCH OFFEN** (die übrigen fünf sind
durch die Entscheidungen P11.7-1 bis P11.7-4 erledigt): die TRANSIT-ONLY-Auflage im
Google-Transport (Log-Achse in P11.7-8 erhoben, Schreibpfade nicht) · der Volltext des
`eventSourceUrl`-Befundes ist über den Zeiger in docs/offene-punkte.md nicht erreichbar
(gedeckt vom Posten "ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI").

### VERMERK P11.7-2 — Meta-Crawl vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD `354a6e5` · Arbeitsbaum sauber · **VIERZEHN Seiten**
gelesen, `textContent`, englische Fassung · **KEIN Aufruf gegen die Schnittstelle** ·
Bestand per GEZIELTER SUCHE geprüft, nicht vollgeladen. Kein Bau-Commit: EIN Ziel von fünf.

**DER BESTAND TRUG ZU KEINER DER SECHS META-FRAGEN EINE ANTWORT** (`user_data`,
`event_source_url`, `Rate-Limit`, Graph-Version je 0; POSITIVKONTROLLE `Version` 27, alle
unecht).

**ZEIGER AUF DIE BEFUNDE:** docs/ziel-befunde/meta.md, "Abschnitts-Lesung 2026-09-22 … die
Teile (h) bis (u)". NULL Löschzeilen im Bestand.
**ERGEBNIS:** F1, F2, F3 vollständig auf Doku-Ebene · F6 mit einer benannten Zweideutigkeit
· F7 mit einer Aussage, die kein Limit nennt · **F4 GAR NICHT** (Schweigen mit benannter
Reichweite über neun Seiten). Vier Dinge bleiben Messfragen, s. den Abschnitt "Offene
Fragen".

**DER BEFUND ÜBER DAS VERFAHREN, und er ist der teuerste dieser Runde:** **VIER der SIEBEN
am 2026-09-08 unter "gesehen, nicht geöffnet" ausgeschlossenen Parameter-Seiten trugen die
Antworten dieser Phase** — der Ausschluss war für die Frage jenes Tages richtig, für diese
falsch, **und er sah bei jeder Wiederholung genauso richtig aus.** Abgelegt am Ort seiner
Wirkung, an jener Ausschluss-Liste. Ein Nebenbefund für die Phase 11.3 ("external_ids are
not available in the Test Events tool") steht in Teil (o).

### VERMERK P11.7-3 — Google-Bestandsaufnahme vom 2026-09-22 (KEIN BAU, KEIN CRAWL)

**HARTE ANGABEN:** 2026-09-22 · HEAD `24f8b29` · Arbeitsbaum sauber · **KEINE Navigation,
kein Browser-Werkzeug** · GEZIELTE SUCHE über den Google-Abschnitt, Achse aus dem
Gegenstand gebildet, mit Positivkontrolle (`gclid` 39 · `consent` 49 · `userData` 32 ·
`deviceInfo` 30 · `adIdentifiers` 21) und benannten echten Nicht-Treffern.
**EINE FALSCH-POSITIVE:** `version` zählt 294, davon rund fünfzehn echt — der Rest ist das
Teilwort in "con**version**".

**DIE STOPP-BEDINGUNG DER GEZIELTEN FORM WAR EINGETRETEN:** Der Google-Abschnitt war 5 712
Zeilen / 405 265 Bytes, rund 64 % der damaligen Datei, mit NEUN Abschnitts-Lesungen, SIEBEN
Messungen und den Teilen (a) bis (ct).

**ARCHITEKTEN-ENTSCHEIDUNG 2026-09-22 — FÜR GOOGLE LÄUFT KEIN ANBIETER-CRAWL.** Die
gezielte Suche hat F1 bis F4 aus dem Bestand beantwortet; **die einzige Lücke — die
Schreibung der Auto-Tagging-Parameter — liegt ausserhalb der Transport-Doku** und verlangt
laut ihrem Posten in docs/offene-punkte.md eine MESSUNG an einem echten Anzeigenklick.
**DER PFLICHT-STOPP IST NICHT UMGANGEN:** Es findet keine Recherche statt, für die er gälte.
**OB DAMIT "KEIN ZUSCHNITT VOR DEM CRAWL" FÜR GOOGLE AUFGELÖST IST, IST NICHT ENTSCHIEDEN.**

### VERMERK P11.7-4 — TikTok-Crawl vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD `ad0501e` · Arbeitsbaum sauber · **NEUN Seiten**
gelesen, dazu eine zehnte für ein einzelnes Feld · `textContent`, englische Fassung ·
**KEIN Aufruf gegen die Schnittstelle** · Werkzeug-Ablage vor der ersten Navigation als
ignoriert belegt. Kein Bau-Commit: EIN Ziel von fünf.

**DIE FORM:** GEZIELTE SUCHE über den TikTok-Abschnitt, zusätzlich im VOLLTEXT gelesen —
er war mit 271 Zeilen / 18 603 Bytes der kleinste der Datei. Ergebnis DÜNN, Bestand-Prüfung
und Crawl passten in EINE Sitzung.

**DER BESTAND TRUG ZU FÜNF DER SECHS TIKTOK-FRAGEN NICHTS** (`ttclid`, `_ttp`,
`user_agent`, `page.url`, `event_id` je 0); F5 stand als EIN Satz in Teil (d), ohne
Schlüssel, ohne Fenster, ohne Feld.

**ZEIGER:** docs/ziel-befunde/tiktok.md, "Abschnitts-Lesung 2026-09-22 … die Teile (j) bis
(p)". NULL Löschzeilen (310 / 0).
**ERGEBNIS:** F1 bis F5 und der TikTok-Anteil von F7 auf Doku-Ebene beantwortet; SECHS
Dinge bleiben Messfragen.

### VERMERK P11.7-5 — LinkedIn-Bestandsaufnahme vom 2026-09-22 (KEIN BAU, KEIN CRAWL)

**HARTE ANGABEN:** 2026-09-22 · HEAD `2b28d7d` · Arbeitsbaum sauber · **KEINE Navigation,
keine fremde Seite.** GEZIELTE SUCHE über den LinkedIn-Abschnitt; **weil das Ergebnis DICHT
war (NEUN Zusammenhänge), ist danach der ABSCHNITT im Volltext gelesen worden — nur er,
nicht die Datei.** Das ist mehr als die gezielte Form verlangt und weniger als die
Volladung.

**DIE ERSTE HÄLFTE DES GETEILTEN VORGEHENS GILT ALS ERFÜLLT — AUSLEGUNG DES ARCHITEKTEN,
KEIN MESSWERT.** Grund: Alles, was jene Datei über dieses Ziel trägt, steht in seinem
Abschnitt. **WER SIE AUF EIN ANDERES ZIEL ÜBERTRÄGT, PRÜFT ZUERST, OB DAS DORT AUCH GILT.**

**ARCHITEKTEN-ENTSCHEIDUNG 2026-09-22 — FÜR LINKEDIN LÄUFT EIN CRAWL, IN EINER EIGENEN
SITZUNG, BESCHRÄNKT AUF DIE CRAWL-LISTE.** Vollzogen in VERMERK P11.7-6.

**DER IPv4-RIEGEL UND SEIN GRUND — BEFUND, KEINE ENTSCHEIDUNG.** GEMESSEN am Code:
`forwardToLinkedin` bricht ab, wenn `isIpv4(clientIp)` falsch ist — **der GANZE Forward
entfällt dann**, nicht bloss ein Feld, weil die Kennung das Pflicht-Paar trägt. Tragend:
die Schnittstelle **prüft die FORM des Kennungs-Werts NICHT** (Teil (j)) und **beide
IP-Symbole unterstützen laut Doku nur IPv4** (Teile (i), (aj)) — **ohne den Riegel ginge
ein IPv6-Wert als Erfolg hinaus und liefe ins Leere; nichts würde rot.** Dass IPv6
überhaupt vorkommt, bleibt eine ANNAHME
(docs/claude-history/phase-11.1-linkedin.md, "DIE IPv6-ANNAHME"); **IPv6 ist gegen die
Schnittstelle NIE probiert worden.** **DASS DIE BESCHRÄNKUNG BEIDE IP-SYMBOLE TRIFFT, IST
EINE ABLEITUNG aus (i) und (aj)** und steht in keinem Teil zusammengezogen: Ein Wechsel auf
die gehashte Form löste das Problem nicht.

### VERMERK P11.7-6 — LinkedIn-Crawl vom 2026-09-22, BESCHRÄNKT (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD `75f4718` · Arbeitsbaum sauber · **NEUN Seiten**
gelesen, `textContent` über `<main>`, englische Fassung, Learn-Seiten in der Ansicht
`view=li-lms-2026-08` · **KEIN Aufruf gegen die Schnittstelle** · Werkzeug-Ablage vorab als
ignoriert belegt. Kein Bau-Commit: EIN Ziel von fünf.

**DIE FORM — ZWEITE HÄLFTE DES GETEILTEN VORGEHENS.** `docs/ziel-befunde.md` nicht
vollgeladen; gezielt gelesen wurde allein der Block "Der gelesene Umfang (2026-09-11)"
samt seiner Liste "GESEHEN, NICHT GEÖFFNET", weil dort die Seiten-Kürzel aufgelöst sind.
**DER CRAWL WAR AUF DIE LISTE BESCHRÄNKT**; ein voller Crawl des Conversions-Zweigs hat
NICHT stattgefunden.

**ZEIGER:** docs/ziel-befunde/linkedin.md, "Abschnitts-Lesung 2026-09-22 (BESCHRÄNKTER
CRAWL der Phase 11.7) — die Teile (an) bis (at)" samt Umfangs-Block. NULL Löschzeilen
(413 / 0).

**ALLE SECHS FRAGEN DER CRAWL-LISTE SIND BEARBEITET; ZWEI BLEIBEN NICHT BEANTWORTET** —
das Format von `li_fat_id` (Nicht-Treffer über sechs Seiten, Teil (an)) und eine Vorgabe zu
Wiederholungsversuchen nach 429 (Nicht-Treffer über drei Seiten, je mit Positivkontrolle,
Teil (as)). **DIE ARCHITEKTEN-FRAGE IST BEANTWORTET:** `user.userIds` darf mehr als einen
Eintrag tragen, der Anbieter empfiehlt es, eine Obergrenze nennt er nicht (Teil (aq)) —
**DAS IST ZULÄSSIGKEIT, NICHT ANNAHME AM ENDPUNKT**; gemessen ist genau EIN Eintrag.

### VERMERK P11.7-7 — Pinterest-Crawl vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD `8cab827` · Arbeitsbaum sauber · **DREIZEHN Seiten**
gelesen, `textContent`, englische Artikel-Rümpfe · **KEIN Aufruf gegen die Schnittstelle** ·
Werkzeug-Ablage vorab als ignoriert belegt. Kein Bau-Commit: EIN Ziel.

**DIE FORM:** GEZIELTE SUCHE (34 Begriffe) mit Positivkontrolle; **weil das Ergebnis DICHT
war (sieben Zusammenhänge), danach der Abschnitt im Volltext — nur er, nicht die Datei.**
**DIE GETEILTE FORM WAR TROTZDEM NICHT NÖTIG, UND DAS IST EIN MESSWERT UND KEINE
LOCKERUNG:** Der Abschnitt war 608 Zeilen / 42 874 Bytes, der drittkleinste.

**DIE FALSCH-POSITIVE, DIE SONST EINE DICHTE VORTÄUSCHT:** `Version` zählt 78 Trefferzeilen
und ist **fast restlos unecht** — 77-mal das Teilwort in "con**version**(s)", **genau EINE**
echt (`pintrk.version`).

**ZEIGER:** docs/ziel-befunde/pinterest.md, "Abschnitts-Lesung 2026-09-22 (Anbieter-Crawl
der Phase 11.7) — die Teile (ac) bis (ak)" samt Umfangs-Block. NULL Löschzeilen (454 / 0);
**VIER ältere Teile haben einen datierten VORBEHALT bekommen** — (e), (i), (o)/C1, (o)/E1,
Wortlaut in allen vier Fällen unangetastet.

**ERGEBNIS:** F1 bis F4 auf Doku-Ebene beantwortet; **F8 bleibt MESSFRAGE.**

**MIT DIESEM CRAWL SIND ALLE FÜNF ZIELE DURCHLAUFEN.** **DAS HEISST NICHT, DASS ALLES
BEANTWORTET IST:** Was nur ein Aufruf zeigt, steht je Ziel ausdrücklich als NICHT
BEANTWORTET in der Ablage.

### VERMERK P11.7-8 — Aufklärung am Code vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD `a763716` · Arbeitsbaum sauber · **KEINE fremde
Quelle**, `docs/ziel-befunde.md` weder geladen noch durchsucht — eine CODE-Aufklärung löst
den Pflicht-Stopp nicht aus. Kein Bau-Commit: READ-ONLY am eigenen Code.

**DIE ZEHN CODE-FRAGEN, alle GEMESSEN am Repo bei HEAD `a763716`:**

| # | Befund | Fundstelle |
|---|---|---|
| C1 | **TRANSIT-ONLY AUF DER LOG-ACHSE EINGEHALTEN** — die fünf `console`-Zeilen des Google-Transports führen Festtext, `built.reason`, `res.status`, `errorName(err)`; der Antwort-RUMPF wird gar nicht gelesen | `google-forward.ts:252,266,294,335,341`; `google-payload.ts:177` |
| C2 | **VIER VON FÜNF SENDEN DIE PFLICHTFELDER; BEI META IST EINE LÜCKE** — `action_source` unbedingt, `client_user_agent` und `event_source_url` BEDINGT ohne Riegel; für google nicht entscheidbar | `meta-forward.ts:310` gegen `:297`, `:317`; s. P11.7-22 |
| C3 | **IM LOG JA, IM KONTROLLFLUSS NEIN** — `code=` kommt aus dem RUMPF und bleibt unter der Schwärzungsgrenze; beide Fälle laufen durch denselben Zweig | `tiktok-forward.ts:272–293`, `:123`, `:428 f.`; `redact.ts:68` |
| C4 | google sendet **`v1`, INLINE IN EINER BENANNTEN ENDPUNKT-KONSTANTEN**, kein Env-Weg | `google-forward.ts:57 f.` |
| C5 | `docs/ziel-befunde.md` war **9 994 Zeilen / 717 061 Bytes** — gegenüber P11.7-8 um 1 177 / 88 432 gewachsen; die Frage ist **verschärft, nicht beantwortet** | `wc` |
| C6 | Der widerlegte Kopfkommentar steht **unverändert** | `google-click-ids.ts:6–10` |
| C7 | Die Stufenangabe im LinkedIn-Kopf steht **an beiden Stellen unverändert** | `linkedin-forward.ts:19`, `:364` |
| C8 | Die überholte Stellenzahl-Begründung steht **unverändert** | `pinterest-forward.ts:567 f.` |
| C9 | `forwardToGoogle` übergibt **nur die Klick-Kennungen**; `clientIp` und `userAgent` enden an der Signatur. WELCHER der zwei Anbieter-Orte passt, ist am Code **nicht entscheidbar** | `google-forward.ts:277–291`; `ingest.ts:485–495` |
| C10 | **GENAU EIN `userIds`-EINTRAG; BEIDE RIEGEL KEHREN VOR DEM `fetch` ZURÜCK** | `linkedin-forward.ts:394`, `:402`; Wächter T1-a |

**TEILMESSUNG ZU C1 FÜR EINEN POSTEN AUSSERHALB DIESER DATEI — AUSDRÜCKLICH KEINE
ERLEDIGUNG.** Erhoben ist die **LOG-ACHSE VOLLSTÄNDIG** (92 verfolgte `.ts`/`.tsx` ohne
`.test.`, Kommentarzeilen ausgesondert, **81 echte `console`-Aufrufe**; Positivkontrolle:
die Achse trifft in allen fünf Adaptern) und die **ANALYTICS-ABLAGE** (`persistEvent`, fünf
Werte, keine Kennung). **DIE ÜBRIGEN SCHREIBPFADE SIND NICHT ERHOBEN.**

**DER TESTBESTAND JE ADAPTER — GRUNDLAGE DER SPÄTEREN MUTATIONSPROBEN**, gemeint sind nur
Läufe über Match-Felder, Adressfeld oder Endpunkt:

| Adapter | ERSCHÖPFEND | LÜCKE |
|---|---|---|
| **meta** | **KEINER** | kein erschöpfender Nutzlast-Wächter · kein Lauf prüft die ABWESENHEIT von `client_user_agent`/`event_source_url` · **der Vorgabewert der Version ist ungedeckt** (P11.7-23); `meta-forward.test.ts` prüft nur den Fehlerpfad |
| **pinterest** | **T8** (`user_data` per `toEqual`) | **`event_source_url` ist von KEINEM Lauf gedeckt** |
| **tiktok** | **T10** (`user`), **T15** (`page`) | keine auf dieser Achse |
| **linkedin** | **T1-a** (`toEqual` auf die GANZE Nutzlast — jeder zweite `userIds`-Eintrag wird rot) | **der ENDPUNKT ist von keinem Lauf gedeckt** (P11.7-23) |
| **google** | **GF-1** (`toEqual` auf die GANZE Nutzlast, `url` per `toBe` inkl. `/v1/`) | keine auf dieser Achse |

**ZEIGER 2026-09-23 — DIE TABELLE DARÜBER BLEIBT WÖRTLICH, SIE IST DIE MESSUNG BEI
`a763716`:** Die zwei Lücken "der Vorgabewert der Version ist ungedeckt" (meta) und "der
ENDPUNKT ist von keinem Lauf gedeckt" (linkedin) sind seit S1 gedeckt — VERMERK P11.7-10.
Wer die Tabelle als Grundlage einer Mutationsprobe nimmt, liest dort weiter.

**AUSGESCHLOSSEN ALS MESSFRAGEN** (kein Code beantwortet sie): F1 je Ziel (fachliche
Annahme) · F4 an allen fünf · F5 · F6 · F7 · F8 · P11.7-10 · P11.7-21 · die fünf
Messfragen aus "WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT".

### VERMERK P11.7-9 — Aufteilung von docs/ziel-befunde.md vom 2026-09-22 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-22 · HEAD vor der Runde `8a8acfa` · Arbeitsbaum sauber ·
**KEINE fremde Seite** · alle Probeläufe ausserhalb des Repos. Kein Bau-Commit: keine Zeile
Code; umgebaut wurde eine Doku-Ablage, damit der Pflicht-Stopp wieder erfüllbar ist.

**WAS GEBAUT WORDEN IST — OWNER-ENTSCHEIDUNG 2026-09-22:** `docs/ziel-befunde.md` ist je
Ziel in eine eigene Datei unter `docs/ziel-befunde/` aufgeteilt; die alte Datei bleibt als
**VERZEICHNIS UND KONVENTIONS-KOPF** und trägt **keinen Befund mehr**.

| Datei | Quellzeilen | sha256 des Abschnitts-Teils |
|---|---|---|
| `docs/ziel-befunde/linkedin.md` | 160–1754 | `d0723536b82e7614bec29bbd8ef0c9cfae3b4dc9d60a209891b86c5628607789` |
| `docs/ziel-befunde/google.md` | 1755–7466 | `8137a094d1cfbca4fd583b88580adf80c0d3a00227c75fdbae7194f3e2c81458` |
| `docs/ziel-befunde/pinterest.md` | 7467–8528 | `6401ff186ff06ff5d61b79dbea48fc6cc3937c1d38f313cef87cde3eed85d5bb` |
| `docs/ziel-befunde/meta.md` | 8529–9413 | `66805dc9a268369dafd5bd78c13fcab4ecf03a1564c8976144ad18a1e9b5a34c` |
| `docs/ziel-befunde/tiktok.md` | 9414–9994 | `70ce633f1db0ab7bee02b94a412d44bf08eb370d2c333ef339e20a2a23bc0bdf` |

**DER VERKETTUNGS-BELEG:** Kopf (1–159) plus die fünf Abschnitte ergeben die Ausgangsdatei
**BYTE-GENAU** — sha256 der Verkettung = sha256 der Datei =
`81c62733075d94a0f3d60d4b9f4e3fefc027000589377bba80ef2c933e4c7597`. Je Datei ist der
Abschnitts-Teil nach dem Bau und am committeten Objekt gegen seinen sha256 gegengeprüft,
fünf von fünf zeichengleich.

**DAS WERKZEUG:** `sed -n 'A,Bp'`, Kopf per Editier-Werkzeug, zusammengesetzt per `cat`.
**NEGATIVKONTROLLE, GEMESSEN:** dieselbe Extraktion über `Set-Content` bzw. `Out-File`
verfehlte den Soll-Hash um **+1 065 Bytes** — 3 Bytes BOM plus 1 062 zusätzliche CR.
**KEINES DER VIER GATES HÄTTE DAS GEMELDET.**

**EIN BEFUND ZUR PRÜFFORM, ÜBER DIESE RUNDE HINAUS:** Die Drei-Zahlen-GLEICHHEIT der
Werkzeug-Regel (CR == CRLF == LF) gilt einer Datei mit **CRLF** im Arbeitsbaum. Alle hier
berührten Dateien tragen **LF**; die anzuwendende Form ist **CR = 0 ∧ CRLF = 0 ∧ LF =
Zeilenzahl**. Wer die Gleichheit wörtlich fordert, verlangt `0 == 0 == n` und hält eine
einwandfreie Datei für kaputt.

**DIE ZEIGER-INVENTUR:** 408 Trefferzeilen in 42 Dateien, **290 lösen über das Verzeichnis
auf** und sind nicht angezogen. **KEIN ZEILEN-ZEIGER im ganzen Repo** — ein solcher wäre
der einzige gewesen, den die Aufteilung unrettbar gebrochen hätte. **DREI GRUPPEN LÖSEN
NICHT ÜBER DAS VERZEICHNIS AUF:** ELF interne Verweise auf "den Kopf dieser Datei" (der
Kopf der neuen Datei löst sie auf) · DREI Querverweise zwischen Zielen (auflösbar, weil sie
ihr Ziel benennen) · Zeiger mit Buchstabe OHNE Abschnitt, DREI davon nachgelesen und echt
(`CodeImporter.test.tsx`, `foreign-scan.test.ts`, `foreign-strip.test.ts`) — **sie
verletzen die Verweis-Regel schon vor der Aufteilung**, per ARCHITEKTEN-ENTSCHEIDUNG nicht
angefasst, Auflösung daneben in `foreign-signatures.test.ts`.

**MITGEÄNDERT:** CLAUDE.md · docs/arbeitsweise.md (der ANGENOMMENE Änderungsantrag, Weg 5
und "Auslöser-geladen"; der alte Wortlaut war vorab als zeichengleich belegt) · diese
Datei. **BAU-COMMIT `11a44f7`.**

### VERMERK P11.7-10 — Scheibe S1 gebaut vom 2026-09-23 (REINE TEST-SCHEIBE)

**HARTE ANGABEN:** 2026-09-23 · **BAU-COMMIT `4809cb5`** (`test(capi): Waechter ueber
Version, Endpunkt und Abschalttermin (11.7 S1)`) · EINE neue Datei,
`src/lib/capi/version-deadlines.test.ts`, 239 Zeilen, LF; sha256 am committeten Objekt
`56a97c21f6b2485bcd8d7e42337af9a637be3fe449ae4e7335d5f32072cc3c69` · KEIN Produktivcode
geändert · Tests **2100 / 96 Dateien → 2108 / 97** (GEMESSEN, CC) · CI-Lauf grün, 2108 von
2108 (OWNER-ANGABE 2026-09-23):
https://github.com/StefanPHD/pagesmith/actions/runs/35830025570

**DER MASSSTAB AUS ZUSCHNITT-FRAGE P11.7-23 IST EINGELÖST:** Dort liess eine Mutation des
Meta-Vorgabewerts KEINEN Test rot werden, und der LinkedIn-Endpunkt war von keinem Test
gedeckt. Seit S1 fallen dafür V1 und V3 bzw. V4.

**MUTATIONSPROBEN — ALLE NEUN WIE VORHERGESAGT**, je zurückgenommen und per sha256 gegen den
Stand davor belegt; m1 bis m3, m5, m5b und m6 als voller Lauf über 97 Dateien:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | Vorgabewert `"v22.0"` | V1, V3 |
| m5 | Vorgabewert `"v23.0"` | V1, V3 — V2 und V3b (Umgebungsfall) grün |
| m5b | Umgebungszweig in `config.ts` entfernt | V2, V3b |
| m6 | Literal `v21.0` statt `META_GRAPH_VERSION` in der Meta-Adresse | NUR V3b |
| m2 | `LINKEDIN_ENDPOINT` verändert | NUR V4 |
| m3 | `LINKEDIN_VERSION` `"202609"` | V4 und T1-c (`linkedin-forward.test.ts`) |
| m4 | Uhr 2026-11-16T00:00:00Z | T1, nur Zeile linkedin |
| m4b | Uhr 2026-11-22T00:00:00Z | T1, Zeilen meta und linkedin |
| m4c | Uhr 2026-11-15T23:59:59Z | nichts |

**DIE OFFENE FRAGE DES ZUSCHNITTS IST BEANTWORTET — KANDIDAT A (ARCHITEKT, 2026-09-23):
EINE TABELLE IST DIE EINZIGE ERWARTUNG** für Versions- und Termin-Wächter; ZUSCHNITT-FRAGE
P11.7-13 und P11.7-23 sind damit EINE Sache. Grund: getrennte Werte liessen die stille
Richtung offen — Tabelle angehoben, Code nicht, und alles bliebe grün. Die Tabellenwerte
sind vor dem Bau maschinell gegen ihre Quellzeilen geprüft: meta `v21.0` / 2027-01-21
(docs/ziel-befunde/meta.md, Teil (s), Tabelle 1), linkedin `202601` / 15.01.2027
(docs/ziel-befunde/linkedin.md, Teil (at)), der Endpunkt (ebenda, Teil (ab)), Host und Pfad
der Meta-Adresse (meta.md, Teil (s)).

**VORLAUF 60 TAGE** — rot ab 2026-11-16 (linkedin) bzw. 2026-11-22 (meta). Grund: die CI
läuft nur beim Push.

**DIE VERENGUNG AUF meta UND linkedin (ARCHITEKTEN-SETZUNG):** tiktok, google und pinterest
haben KEINE Zeile — keiner der drei trägt einen Abschalttermin (tiktok "TBD", google und
pinterest ohne dokumentierte Abschaltregel), und für google hätte der Pflicht-Stopp eine
Volladung von `docs/ziel-befunde/google.md` verlangt, deren Tragfähigkeit ungemessen ist
(ZUSCHNITT-FRAGE P11.7-8).

**DIE GRENZEN DES WÄCHTERS STEHEN AM WÄCHTER SELBST** — Kopfkommentar von
`src/lib/capi/version-deadlines.test.ts`, Punkte (1) bis (4). Hier steht keine Kopie.

### VERMERK P11.7-11 — Crawl zur Scheibe S2 vom 2026-09-23 (VORARBEIT, KEIN BAU)

**HARTE ANGABEN:** 2026-09-23 · HEAD `854dd39` · Arbeitsbaum sauber · **VOLLLADUNG** von
docs/ziel-befunde/linkedin.md (1 636 Zeilen) plus Kopf von docs/ziel-befunde.md VOR der
ersten Navigation · **DREIZEHN Seiten** geöffnet, davon acht vollständig, eine in einem
benannten Bereich vollständig, eine erneut in Teilen, drei als Suchlesung · `textContent`,
englische Fassung, Ansicht `view=li-lms-2026-09` · **KEIN Aufruf gegen die Schnittstelle** ·
Werkzeug-Ablage vorab als ignoriert belegt · `src/lib/capi/version-deadlines.test.ts` nicht
angefasst.

**ZEIGER:** docs/ziel-befunde/linkedin.md, "Abschnitts-Lesung 2026-09-23 der Versionierungs-
und Migrationsseiten (S2 der Phase 11.7) — die Teile (au) bis (bb)" samt Umfangs-Block.
**ZWEI ÄLTERE TEILE HABEN EINEN DATIERTEN VORBEHALT BEKOMMEN**, Wortlaut unangetastet: (ar)
und (at). **DER KOPF JENER DATEI HAT EINE DATIERTE ERGÄNZUNG:** seine Prüfsumme gilt dem
Stand von `11a44f7`, weil die Datei seit diesem Tag fortgeschrieben wird.

**ZUSCHNITT-FRAGE P11.7-17 RUHT AUF TEIL (at), UND (at) TRÄGT JETZT EINEN VORBEHALT** — die
Wendung "zwei neue Conversion-Typen mit 180- und 365-Tage-Fenstern ab `202608`" ist dort
nicht angefasst; wer sie für den Stufe-1-Plan von S2 heranzieht, liest (ax).

**KEINE ZIELVERSION IST GEWÄHLT UND KEINE EMPFOHLEN.** Die Kandidaten mit ihren Tatsachen
stehen in (au) und (aw); die Auswahl trifft der Owner.

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

**P11.7-5 — JEDE ANHEBUNG EINER VERSION AUS DER WÄCHTER-TABELLE ZIEHT DIE TABELLENZEILE IM
SELBEN COMMIT NACH.**
Ort: `src/lib/capi/version-deadlines.test.ts`, die Konstante `TABELLE` samt Kopfkommentar;
Herkunft VERMERK P11.7-10 (ARCHITEKT, 2026-09-23).
Sie bindet jede Runde, die eine dort geführte Version anhebt, **AUSDRÜCKLICH S2 UND S3**:
neue Version, neuer Termin und neue Quelle mit Teil aus der Ziel-Datei im selben Commit;
ein Termin wird nie ohne neue Quelle verschoben. Ein weiteres Ziel kommt als Tabellenzeile
dazu.

## Vorrat (gemeldet, nicht gebaut)

**ALLE SIEBEN SIND OFFEN.** Der Stand von P11.7-1 bis P11.7-4 ist am 2026-09-22 an HEAD
`a763716` gegengeprüft (VERMERK P11.7-8, Zeilen C6 bis C8), der von P11.7-5 bis P11.7-7 am
2026-09-23 an HEAD `4809cb5`: jede der beanstandeten Stellen steht unverändert da.
**GEMESSEN IST, DASS SIE DASTEHEN — NICHT, DASS SIE NACHGEZOGEN WÄREN.** **KEINE
EMPFEHLUNG** an keinem der sieben.

**P11.7-1 — DER KOPFKOMMENTAR VON `src/lib/capi/google-click-ids.ts` IST WIDERLEGT.**
Seine Zeilen 6 bis 10 sagen, `extractGoogleClickIds` habe keinen Aufrufer und `'google'`
stehe nicht in `TRACKING_TARGETS`. **ALLE DREI ANGABEN TREFFEN NICHT MEHR ZU:** ein
Aufrufer (`forwardToGoogle`), `TRACKING_TARGETS` und `TARGETS_WITH_ADAPTER` führen
`"google"`, `FORWARDER_BY_TARGET` trägt den Eintrag. Der Posten "DIE PRÄMISSE VON PUNKT (a)
DES DATENKLASSEN-BLOCKS IST TOT" hält dieselben Widerlegungen fest — **aber über den
DOKU-Satz, nicht über den KOMMENTAR IM CODE.**
TRIGGER: die erste Bau-Scheibe, die eine Google- oder Kennungs-Datei berührt; spätestens
das Phasenende.

**P11.7-2 — DER HALBSATZ AN DER ROADMAP-ZEILE 11.9 TRÄGT DIE ENGERE BESCHREIBUNG DER
DRITTEN DATENKLASSE.** Er lautet: *"Sie gilt fremdvergebenen KLICK-Kennungen, nicht einer
selbst gesetzten Besucher-Kennung."* Seit P11.7-2 deckt die Klasse auch `fbp`, und das ist
keine Klick-Kennung. **SEINE SCHLUSSFOLGERUNG BLEIBT RICHTIG, UNVOLLSTÄNDIG IST SEINE
AUFZÄHLUNG.**
TRIGGER: die nächste Runde, die die Roadmap-Zeile 11.9 ohnehin öffnet — der Zuschnitt von
GA4.

**P11.7-3 — DER KOPFKOMMENTAR VON `src/lib/capi/linkedin-forward.ts` FÜHRT DIE ABWESENHEIT
EINES USER-AGENT-FELDES ALS GEMESSEN, UND DIE ZITIERTEN TEILE TRAGEN DAS NICHT.** Die
Teile (a), (i) und (n) messen Pflicht-FORM, ANNAHME eines Symbols und eine ANGENOMMENE
Nutzlast; **KEINER erwähnt einen User-Agent**, und der ganze Abschnitt tut es nicht
(Nicht-Treffer über sechs Schreibweisen, Positivkontrolle `userIds` 9). **DIE AUSSAGE IST
EINE ABLEITUNG AUS EINER GEMESSENEN FELDLISTE, KEIN GEMESSENER NICHT-TREFFER** — sie ist
nicht falsch, sie trägt eine höhere Provenienz-Stufe, als ihre Quelle hergibt. Beide
Stellen: `linkedin-forward.ts:19` und `:364`.
TRIGGER: die erste Bau-Scheibe, die diese Datei berührt; spätestens das Phasenende.

**P11.7-4 — DER KOPFKOMMENTAR DER URL-BILDUNG IN `src/lib/capi/pinterest-forward.ts`
BEGRÜNDET DEN VERZICHT AUF EINE FORMATPRÜFUNG MIT EINER UNGEPRÜFTEN STELLENZAHL.** Die
Stellenzahl ist nicht mehr ungeprüft: die Endpunkt-Referenz führt `ad_account_id` als
`string`, `required`, `<= 18 characters`, Muster `^\d+$` (docs/ziel-befunde/pinterest.md,
Teil (aj)). **SEINE SCHLUSSFOLGERUNG — nicht zu prüfen — STEHT UNBERÜHRT; überholt ist die
TATSACHENANGABE.** **DIESER POSTEN SAGT NICHT, DASS EINE FORMATPRÜFUNG ZU BAUEN WÄRE.**
Fundstelle `pinterest-forward.ts:567 f.`
TRIGGER: die erste Bau-Scheibe, die diese Datei berührt; spätestens das Phasenende.

**P11.7-5 — DER KOPFKOMMENTAR VON `src/lib/capi/linkedin-forward.test.ts` FÜHRT DIE
ENDPUNKT-ADRESSE ALS "NICHT gemessen".** Wortlaut: "NICHT gemessen und deshalb hier auch
nicht behauptet: die Adresse des Endpunkts und die Form der Autorisierungs-Kopfzeile."
Seit S1 behauptet ein Test die Adresse (V4 in `src/lib/capi/version-deadlines.test.ts`),
gestützt auf docs/ziel-befunde/linkedin.md, Teil (ab), und die Live-Ankunft vom 2026-08-19
(Teil (ai)). **DER SATZ NENNT ZWEI DINGE; S1 BERÜHRT NUR DAS ERSTE** — über die
Autorisierungs-Kopfzeile sagt diese Scheibe nichts. GEMESSEN am Repo (CC, 2026-09-23,
HEAD `4809cb5`). **KEINE EMPFEHLUNG**, wie formuliert wird.
TRIGGER: S2.

**P11.7-6 — DER KOMMENTAR AN `LINKEDIN_ENDPOINT` (`src/lib/capi/linkedin-forward.ts`) SAGT
"GELESEN, nicht als Befund erhoben".** Seit dem 2026-09-11 steht der Endpunkt als Befund in
docs/ziel-befunde/linkedin.md, Teil (ab). GEMESSEN am Repo (CC, 2026-09-23, HEAD
`4809cb5`). **KEINE EMPFEHLUNG**, wie formuliert wird.
TRIGGER: S2.

**P11.7-7 — DER KOMMENTAR AN `META_GRAPH_VERSION` (`src/lib/capi/config.ts`) NENNT DEN
VORGABEWERT EINEN "stabile[n] Fallback".** Laut docs/ziel-befunde/meta.md, Teile (s) und
(t), läuft `v21.0` spätestens am 2027-01-21 ab und wird danach still umgeleitet. GEMESSEN
am Repo (CC, 2026-09-23, HEAD `4809cb5`). **KEINE EMPFEHLUNG**, wie formuliert wird.
TRIGGER: S3.

## Offene Fragen an den Anbieter-Crawl

**FRAGEN, KEINE ANTWORTEN.** Kein Eintrag hier behauptet etwas über einen Anbieter. Die
Antworten stehen je Ziel in docs/ziel-befunde/<ziel>.md — NICHT hier.

**ALLE FÜNF ZIELE SIND DURCHLAUFEN** (VERMERKE P11.7-2 bis P11.7-7). **DIE STAND-TABELLEN
JE ZIEL UND DIE CRAWL-LISTE FÜR LINKEDIN SIND MIT DER VERDICHTUNG ENTFALLEN** — ihr Inhalt
steht in den Ziel-Dateien, die Crawl-Liste ist mit VERMERK P11.7-6 abgearbeitet; der
Volltext steht unter `11a44f7`.

**F1 — DIE KLICK-KENNUNG:** Wie heisst sie? Woher kommt sie — aus einem PARAMETER DER
ADRESSE oder aus einem COOKIE? Welches FORMAT hat sie, und wie wird sie gebildet?
**AUF DOKU-EBENE BEANTWORTET für alle fünf** — meta `fbc` (Teil (h)) · tiktok `ttclid`
(Teil (j)) · linkedin `li_fat_id` (Teile (i), (an)) · pinterest `epik`/`click_id` (Teil
(ac)) · google `gclid`/`gbraid`/`wbraid` (Teile (m)/E1, (w)/E1).
**OFFEN, JE ZIEL:** ob der Endpunkt den Wert **fachlich annimmt** — das zeigt nur ein
Aufruf. **DAS FORMAT IST BEI linkedin UND pinterest EIN NICHT-TREFFER** mit benannter
Reichweite. **BEI google IST DIE LÜCKE EINE ANDERE:** die Schreibung der
Auto-Tagging-Parameter, geführt als Posten in docs/offene-punkte.md, der eine MESSUNG an
einem echten Anzeigenklick verlangt.

**F2 — DER ORT IN DER NUTZLAST:** In welchem Feld, auf welcher Ebene?
**AUF DOKU-EBENE BEANTWORTET für alle fünf.** Zeiger: meta Teile (h), (i), (l) · tiktok
(j), (k), (m) · linkedin (aq), (an) · pinterest (ac), (ae), (af) · google (m)/E1, (l)/D1,
(w)/D1.

**F3 — ALLE NICHT-PERSONENBEZOGENEN MATCH-FELDER, je mit VERLANGT oder EMPFOHLEN.** Diese
Unterscheidung entscheidet, ob ein fehlendes Feld ein Defekt oder eine Einbusse ist.
**AUSGENOMMEN:** E-Mail, Telefon und alles übrige Personenbezogene.
**AUF DOKU-EBENE BEANTWORTET für alle fünf.** **ZWEI DIVERGENZEN SIND BERICHTET UND NICHT
AUFGELÖST:** bei google verlangt der Leitfaden mindestens ein Identitätsmerkmal, die
Referenz sagt "alle Optional" (Teile (w)/E3, (u), (r)) · bei linkedin lässt die
Fehlermeldung in S3 `SHA256_IP_ADDRESS` aus der Pflicht-Liste aus, S4 und S11 führen es mit
(Teil (ao)) — **welche das Verhalten beschreibt, ist UNGEMESSEN.**

**F4 — LIEST DER ANBIETER KENNUNGEN AUS DER SEITENADRESSE SELBST AUS?**
**DIESE FRAGE ENTSCHEIDET DIE UMSETZUNG VON P11.7-3.**
**FÜR ALLE FÜNF LIEGT EINE DOKU-ANTWORT VOR, UND SIE FALLEN AUSEINANDER:** tiktok liest
`ttclid` aus `page.url` **selbst** (Teil (m)) · pinterest **bittet** um `&epik` in der
Adresse, sagt aber nicht, dass es liest (Teil (af)) · meta **schweigt** (Teil (q)) ·
linkedin bekommt die Adresse **gar nicht** (Teile (ab), (n)) · google hat **kein Feld**
dafür (Teile (l)/D2, (w)/E1). **MESSUNG OFFEN bei meta, tiktok und pinterest.**

**F5 — TIKTOK, DEDUPLIZIERUNG** (Katalog H2). **AUF DOKU-EBENE BEANTWORTET** (Teil (n)):
Schlüssel `[event_source_id, event, event_id]`, Verwurf binnen 48 h, Verschmelzung binnen
5 min, gegen Browser-Pixel UND Events API; der `_ttp`-Weg greift nur OHNE `event_id`.
**MESSUNG OFFEN.**

**F6 — META, VERSIONSANGABE** (Katalog B2). **AUF DOKU-EBENE NICHT ENTSCHIEDEN — ZWEI
TABELLEN** (Teile (s), (t)). **MESSUNG OFFEN.** Die Frist daraus steht im Abschnitt "Frist
mit Termin".

**F7 — RATE-LIMITS** (Katalog H3) für meta, tiktok und linkedin. NICHT zu verwechseln mit
dem Per-Tenant-Limiting auf /api/e: jenes begrenzt, was ZU UNS hereinkommt, dieses, was der
ANBIETER annimmt. **AN ALLEN DREI AUF DOKU-EBENE BEANTWORTET** — meta ohne genanntes Limit
(Teil (u)) · tiktok beziffert, QPS 1 000 / QPM 600 000 / QPD 86 400 000, Überschreitung →
`40100` mit HTTP 401 (Teil (o)) · linkedin 600/min und 500 000/Tag je Mitglieds-Zugangsdatum,
429 bei Drosselung, Rücksetzung um Mitternacht UTC (Teile (ag), (as)).
**MESSUNG OFFEN an allen dreien:** welches Limit tatsächlich greift, zeigen erst die
Nutzungs-Kopfzeilen einer echten Antwort.
**PINTEREST IST IN F7 NICHT GENANNT, und das gehört hierher:** seit dem Crawl stehen
**DREI EINANDER WIDERSPRECHENDE AUSSAGEN** für denselben Endpunkt (120 000/min je
Werbekonto je App · "unlimited" mit dem Conversion-Token · 5 000/min laut
Endpunkt-Referenz); welche gilt, ist **UNGEMESSEN** (Teil (ai)(2), Vorbehalt an (e)).

**F8 — PINTEREST, ERFOLGSRUMPF** (Katalog G1). **DIE FORM IST GELESEN, DIE FRAGE BLEIBT
EINE MESSFRAGE** (Teil (ah)): `num_events_received`, `num_events_processed`, `events[]` mit
`status`/`error_message`/`warning_message`; ein dokumentierter **TEILERFOLG MIT HTTP 200**;
`processed` und `failed` **ohne abschliessende Enum-Liste**. `evaluateSuccessBody` stimmt
mit der dokumentierten Form überein. **WAS FEHLT, IST DER AUFRUF.**

**WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT — FÜNF OFFENE MESSFRAGEN.** Sie stehen getrennt,
weil eine LESUNG sie nicht erreicht. Kein Eintrag ist ein Auftrag.
- **OB `li_fat_id` FACHLICH ANGENOMMEN WIRD.** GEMESSEN angenommen sind **ZWEI von SECHS**
  Symbolen (`SHA256_EMAIL` 2026-08-15, `PLAINTEXT_IP_ADDRESS` 2026-08-17); die vier übrigen
  sind nie gesendet worden. Teile (b), (i), (aj).
- **OB DIE SCHNITTSTELLE EINE IPv6-ADRESSE ABWEIST. NIE PROBIERT** — Teil (j) sagt das
  ausdrücklich, und die Folgerung dort ist als nicht gemessen bezeichnet.
- **WELCHES RATE-LIMIT TATSÄCHLICH GREIFT.** Teil (ag).
- **OB DER ANBIETER DIE KOPFZEILE `X-Restli-Protocol-Version` DURCHSETZT.** Teil (ai) führt
  das als NICHT ENTSCHEIDBAR; der Adapter hat sie nie gesendet und kam ohne sie an.
- **OB DAS LIVE VERWENDETE ZUGANGSDATUM ABLÄUFT.** Keine Messung, sondern eine BEOBACHTUNG
  ab Mitte Oktober 2026 im Campaign Manager; geführt als offener Punkt in
  docs/offene-punkte.md. Teile (v), (al).

**EINE ANGABE, DIE ZU KEINER FRAGE GEHÖRT UND HIER STEHT, DAMIT NIEMAND SIE VERMUTET:** Für
google und pinterest ist **KEINE ABSCHALTREGEL DOKUMENTIERT**, und das ist ausdrücklich
keine Zusage auf Unbefristetheit (Teile (cm) bzw. (ag)); bei tiktok führt die Tabelle `v1.3`
mit "Available until: TBD". **EIN GEGENSTÜCK ZUR META-FRIST GIBT ES NUR BEI LINKEDIN** —
`202601`, Abschalttermin 15.01.2027, geführt in docs/offene-punkte.md.

## Fragen an den Zuschnitt (nach dem Meta-Crawl)

**FRAGEN UND GRENZEN, KEINE ENTSCHEIDUNGEN. KEINE EMPFEHLUNG an irgendeinem Punkt.**
**STAND 2026-09-23: Der Zuschnitt legt Teile von P11.7-1 und P11.7-15 fest (Abschnitt
"Zuschnitt der Phase 11.7"); S1 hat P11.7-23 eingelöst und P11.7-13 für meta und linkedin
(VERMERK P11.7-10). ALLE ÜBRIGEN SIND OFFEN.** Wo ein Zusatz eine Hälfte am Code
beantwortet, steht es an der Frage.

**ZUR NUMMERNFORM:** Diese Gattung zählt als `ZUSCHNITT-FRAGE P11.7-n`; die Gattung darüber
zählt als F1 bis F8 und weicht damit ab — sie wird **NICHT nachgezogen**, ein Nachzug
machte jeden bestehenden Zeiger auf "F4" tot. **WER VON AUSSEN ZEIGT, NENNT DIE GATTUNG
MIT.**

**ZEIGER DER FORM "Teil (x)" MEINEN IN DIESEM ABSCHNITT die Datei des jeweils genannten
Ziels unter docs/ziel-befunde/.** Wo kein Ziel danebensteht, ist **meta** gemeint.

**ZUSCHNITT-FRAGE P11.7-1 — `fbc` HAT ZWEI BILDUNGSWEGE, UND EINER FÄLLT GENAU DANN WEG, WENN ER GEBRAUCHT
WIRD.** Der Cookie-Weg setzt ein laufendes Meta-Pixel voraus, der Adressweg liest `fbclid`
(Teil (h)). **IST DAS PIXEL BLOCKIERT, IST DER ADRESSWEG DER EINZIGE** — eine ABLEITUNG,
nicht gelesen. Für dieses Produkt ist der Fall ohne wirksames Pixel der **gemessene
Normalfall** (Adblocker-Verlustrate). OFFEN: ob der Zuschnitt beide Wege trägt, nur den
Adressweg, oder einen Vorrang.

**ZUSCHNITT-FRAGE P11.7-2 — METAS EIGENE EMPFEHLUNG ZUM `_fbc`-COOKIE KOLLIDIERT MIT DER GRENZE DER
DRITTEN DATENKLASSE.** Der Anbieter empfiehlt, `_fbc` selbst als Cookie mit 90 Tagen zu
setzen oder im Backend zu halten (Teil (h)); P11.7-2 nimmt eine selbst gesetzte Kennung von
TRANSIT-ONLY aus. **OHNE EINE NEUE OWNER-ENTSCHEIDUNG IST DER COOKIE-WEG NICHT BAUBAR.**
**DIE FOLGE DES VERZICHTS:** ohne eigene Ablage wäre der Zeitanteil von `fbc` faktisch der
EREIGNISZEITPUNKT statt der ersten Beobachtung; **welche Wirkung das auf den Abgleich hat,
ist UNGEMESSEN.** Wer die Frage bearbeitet, liest zuerst (E2) im Wortlaut.

**ZUSCHNITT-FRAGE P11.7-3 — OB DER ADAPTER `action_source` SENDET.** **ERSTE HÄLFTE EINGELÖST** (C2):
`action_source: "website"` steht unbedingt in der Meta-Nutzlast (`meta-forward.ts:310`),
`route.test.ts:113` nagelt ihn fest. **ZWEITE HÄLFTE — die Frage an alle fünf Adapter — IST
BEANTWORTET UND HAT EINEN BEFUND ERGEBEN:** P11.7-22.

**ZUSCHNITT-FRAGE P11.7-4 — `external_id` WIRD VON META ZUM MITSENDEN ANGEHALTEN, UND DER WERT WÄRE SELBST
ERZEUGT.** Er ist **der einzige Parameter der Liste, dessen Wert wir selbst vergeben
müssten** (Teile (l), (o), (k)). **DAMIT FÄLLT ER NICHT UNTER DIE DRITTE DATENKLASSE** —
P11.7-2 nimmt eine selbst gesetzte Kennung aus. **WORUNTER ER STATT DESSEN FÄLLT, IST
NICHT ENTSCHIEDEN:** ob eine selbst vergebene, über Kanäle stabile Besucher-Kennung ein
"fingerprint-artiges Merkmal" im Sinne der DATENKLASSEN-GRENZE ist. **DAS IST EINE
OWNER-FRAGE, KEINE CC-EINORDNUNG.** Meta nutzt `fbp` ersatzweise, wenn `external_id` fehlt
(Teil (j)) — eine Angabe des Anbieters, kein Ersatz für die Entscheidung.

**ZUSCHNITT-FRAGE P11.7-5 — E3 UND META: DAS ENTFERNEN FREMDER KLICK-KENNUNGEN AUS `event_source_url` IST
NACH DEM GELESENEN VERTRÄGLICH.** Keine der neun Seiten sagt, dass Meta ausliest (Teil
(q)) — **und Metas eigene Bibliothek übergibt in ihrem Beispiel einen Query-String in genau
diesem Feld** (Teil (r)). **KEINE ENTSCHEIDUNG über die Gestalt, keine Aussage über die
vier übrigen Ziele.** **DIE GRENZE:** "verträglich nach dem Gelesenen" ist nicht "gemessen";
bliebe ein `fbclid` in der Adresse und entfiele zugleich ein `fbc`, wäre (q) entscheidend.

**ZUSCHNITT-FRAGE P11.7-6 — DER ADAPTER SENDET WEDER IP NOCH USER-AGENT, OBWOHL DER TRANSPORT ZWEI ORTE
DAFÜR KENNT.** Google unterscheidet `eventDeviceInfo` (Ereignis-Zeitpunkt) und
`adIdentifiers.landingPageDeviceInfo` (Landeseite) — **zwei Momente** (google, Teile (m)/E4,
(w)/E1). **DIE FRAGE IST NICHT "OB", SONDERN "WELCHES".** Am Code bestätigt (C9): beide
Werte enden an der Signatur in `FORWARDER_BY_TARGET`; **welcher Ort passt, ist am Code nicht
entscheidbar.** Beide Felder tragen IP und UA, für die P11.7-4 gilt.

**ZUSCHNITT-FRAGE P11.7-7 — DIE ZWEI DMA-EINWILLIGUNGSFELDER EXISTIEREN, BEIDE OPTIONAL.** `Consent` trägt
GENAU ZWEI Felder, `adUserData` und `adPersonalization`, ausweislich seiner Überschrift ein
**DMA-Objekt, kein allgemeiner Einwilligungs-Träger** (google, Teile (w)/I2, (l)/D1).
**OB UND WIE SIE AUS DEM EINWILLIGUNGS-URTEIL GEFÜLLT WERDEN, IST OFFEN.**
**EINE ZWEITE, GETRENNTE OFFENHEIT:** Der Posten "DREI FELDER DER NUTZLAST SIND FRAGEN DER
TRANSPORT-SCHEIBE" nennt als Trigger für `consent` die Phase 11.5, und die ist
abgeschlossen; **ob der Trigger damit eingetreten ist, ist nicht entschieden** — für den
Entfall jenes Postens ohnehin unerheblich, er trägt drei Trigger.

**ZUSCHNITT-FRAGE P11.7-8 — OB EINE SITZUNG DIE VOLLLADUNG FÜR EINEN ZUSCHNITT TRÄGT, IST UNGEMESSEN.**
**DIE AUFTEILUNG (P11.7-9) HAT DIE FRAGE VERKLEINERT, NICHT BEANTWORTET.** Der Pflicht-Stopp
verlangt seit dem 2026-09-22 die Volladung der **Datei des Ziels**; die grösste,
`docs/ziel-befunde/google.md`, trägt **405 265 Bytes** — rund 57 % der Sammel-Datei. **FÜR
DIE ÜBRIGEN VIER IST DIE FRAGE PRAKTISCH KLEIN GEWORDEN, FÜR GOOGLE NICHT.** **WER SIE MIT
DEM VOLLZUG FÜR ERLEDIGT ERKLÄRT, ERKLÄRT EINE ABLEITUNG ZUR MESSUNG.** Die Grenze steht
seit dem 2026-09-22 auch in CLAUDE.md, damit sie das Phasenende überlebt.

**ZUSCHNITT-FRAGE P11.7-9 — E3 UND TIKTOK: DER URHEBER LIEST SELBST AUS, UND DAMIT TEILT SICH DIE FRAGE.**
TikTok parst `ttclid` aus dem übergebenen `page.url` (tiktok, Teil (m)). **FOLGE FÜR
P11.7-3:** Ein `ttclid` in der an TikTok übergebenen Adresse geht an SEINEN Urheber und ist
verträglich; ein `gclid` oder `fbclid` darin verletzt sie **unverändert**. OFFEN: ob
zusätzlich `user.ttclid` gesendet wird — **ob ein Weg den anderen ersetzt, sagt keine
gelesene Seite.**

**ZUSCHNITT-FRAGE P11.7-10 — DOPPELZÄHLUNG: EINE ABLEITUNG, UNGEMESSEN, UND SIE BETRIFFT MEHR ALS EIN
ZIEL.** Der Adapter setzt `event_id` IMMER, der Cookie-Weg der Deduplizierung greift nur
OHNE (tiktok, Teil (n)). **BEHÄLT EIN BETREIBER SEIN EIGENES TIKTOK-PIXEL, FEUERT DIESES MIT
EINER ANDEREN KENNUNG** — ob daraus eine Doppelzählung folgt, ist eine ABLEITUNG und
ungemessen. **VERWANDT ÜBER TIKTOK HINAUS:** der Restsatz aus Phase 11.11 zu Meta ("ob Meta
doppelt zählt, ist ungemessen"), docs/claude-history/backlog-polish.md.

**ZUSCHNITT-FRAGE P11.7-11 — DAS RATE-LIMIT ANTWORTET WIE EIN ZUGANGSFEHLER.** `40100` (Drosselung) und
`40104` (leeres Zugangsdatum) kommen beide mit HTTP 401 (tiktok, Teil (o)). **AM CODE
GETEILT (C3):** **IM LOG unterscheidbar** — `describeRejection` schreibt `code=` aus dem
RUMPF, `redactOpaque` schwärzt erst ab zwanzig Zeichen, eine fünfstellige Zahl bleibt
lesbar. **IM KONTROLLFLUSS NICHT** — der Adapter verzweigt nicht auf den Code.
**DIE ZWEITE HÄLFTE BLEIBT UNGEPRÜFT UND IST AM CODE NICHT ENTSCHEIDBAR:** ob die im
Kopfkommentar gemeinten "zwei verschiedenen Codes" dieselben sind — der Kommentar nennt
andere Beispiele, und welche Codes die Messung vom 2026-08-11 ergab, steht im Code nirgends.

**ZUSCHNITT-FRAGE P11.7-12 — `external_id` IST AUCH BEI TIKTOK DER EINZIGE SELBST ERZEUGTE WERT: ZEIGER
STATT KOPIE.** Die Lage ist dieselbe wie bei meta, die Frage steht als **P11.7-4**. Was
hinzukommt: **TikTok verlangt SHA-256 auch für Web** (tiktok, Teil (l)). **KEINE
DATENKLASSEN-ZUORDNUNG.**

**ZUSCHNITT-FRAGE P11.7-13 — EIN VERSIONS-WÄCHTER ÜBER ALLE ZIELE — FÜR meta UND linkedin
GEBAUT.** Beleg: VERMERK P11.7-10. **OFFEN BLEIBT:** tiktok, google und pinterest haben
KEINE Zeile; keiner der drei trägt einen Abschalttermin (Tabelle unten). Pinterest kündigt
Breaking Changes per E-Mail an die Kontakte einer registrierten App an — **ob das unseren
Zugangsweg erreicht, ist UNGELESEN** (pinterest, Teil (ag)). Ein weiteres Ziel kommt nach
Entscheidung P11.7-5 als Zeile dazu.

| Ziel | Version | Termin | bei Ablauf | Form im Code |
|---|---|---|---|---|
| meta | `v21.0` | 2027-01-21 (Graph-Schema; welches gilt, ist ungemessen) | **still umgeleitet** | env-übersteuerbar mit Vorgabewert (`config.ts:14`) |
| tiktok | `v1.3` | **KEINER — "TBD"** | **laut fehl** | Modul-Konstante für die ganze Adresse (`tiktok-forward.ts:71`) |
| linkedin | `202601` | **15.01.2027** | **still** (im Server-Log sichtbar: genau eine `console.error`-Zeile) | eigene Modul-Konstante ohne Env-Weg (`linkedin-forward.ts:105`) |
| google | `v1` | **KEINE dokumentierte Abschaltregel** — keine Zusage auf Unbefristetheit | **ungelesen** | Konstante für die ganze Adresse (`google-forward.ts:57 f.`) |
| pinterest | `v5` | **KEINE dokumentierte Abschaltregel** (Nicht-Treffer über vier Seiten) | **gelesen und leer** | **inline im Template-Literal** (`pinterest-forward.ts:576`) |


**ZUSCHNITT-FRAGE P11.7-14 — `li_fat_id` ALS ZUSÄTZLICHER EINTRAG NEBEN DER IP: LAUT DOKU ZULÄSSIG UND
EMPFOHLEN, AM ENDPUNKT UNGEMESSEN.** `user.userIds` ist eine Liste "of one or more"; der
Anbieter rät zu mehreren, ein Beispiel trägt IP und Klick-Kennung im selben Ereignis
(linkedin, Teile (aq), (ao)). **DER ADRESSWEG SETZT KEIN EINGEBAUTES TAG VORAUS** (Teil
(an)), und unser ausgelieferter Text trägt kein LinkedIn-Tag — **die Frage ist also nicht,
ob ein Tag nötig wäre, sondern ob der Adressweg zugeschnitten wird.** **GRENZE:**
`LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` ist nie gesendet worden; Annahme und Zweier-Liste
sind UNGEMESSEN, das Format nicht gelesen. **AM CODE BESTÄTIGT (C10):** T1-a prüft die
GANZE Nutzlast per `toEqual` — **ein zweiter Eintrag wird rot.** Das ist für die Scheibe
Zusage und Auflage zugleich.

**ZUSCHNITT-FRAGE P11.7-15 — EINE GEMEINSAME BAUFORM FÜR ALLE KLICK-KENNUNGEN (ARCHITEKTEN-VORSCHLAG,
NICHT ENTSCHIEDEN).** Gestalt: **EINE** Stelle liest die bekannten Kennungen aus der
übergebenen Adresse; jedes Ziel erhält nur die seines Urhebers; wo ein Ziel die Adresse
selbst bekommt, werden die **fremden** daraus entfernt. Vorbild `extractGoogleClickIds`.
**DER GRUND: SIE SETZT P11.7-3 AN EINEM ORT UM STATT JE ADAPTER** — heute verletzt der Code
sie, `eventSourceUrl` reist samt Query-String an meta, pinterest und tiktok. Fünf Adapter
sind fünf Orte, an denen die nächste Kennung vergessen werden kann.
**WAS DIE CRAWLS BEIGETRAGEN HABEN:** F4 liegt jetzt für alle fünf vor **und fällt
auseinander** (s. F4). **GENAU DIESE UNGLEICHHEIT IST DAS ARGUMENT FÜR EINE GEMEINSAME
STELLE — UND ZUGLEICH IHRE SCHWIERIGKEIT.**
**NICHT ENTSCHIEDEN:** ob sie kommt · wo sie läge · welche Kennungen sie kennt · was sie mit
einer UNBEKANNTEN täte · ob Entfernen und Setzen dieselbe Scheibe sind.

**ZUSCHNITT-FRAGE P11.7-16 — IPv6 BEI LINKEDIN: DER RIEGEL KÖNNTE DEN IP-EINTRAG AUSLASSEN, STATT DEN
GANZEN FORWARD ZU VERWERFEN — WENN EINE ZWEITE KENNUNG VORLIEGT.** **DER GRUND DES RIEGELS
BLEIBT UNBERÜHRT** (s. VERMERK P11.7-5). **DAS IST EINE FOLGEFRAGE VON P11.7-14 UND OHNE
SIE GEGENSTANDSLOS.** Am Code bestätigt (C10): beide Riegel kehren **vor** dem `fetch`
zurück, T2-a bis T2-c decken sie einzeln.

**ZUSCHNITT-FRAGE P11.7-17 — DIE VERSIONS-ANHEBUNG TRIFFT META UND LINKEDIN BEIDE IM JANUAR 2027.** meta
`v21.0` bis **2027-01-21**, linkedin `202601` bis **2027-01-15** — **ZWEI ZIELE, SECHS TAGE
AUSEINANDER.** **DIE FRAGE IST NICHT "OB", SONDERN "WELCHE ZIELVERSION UND WAS SICH MIT IHR
ÄNDERT".** Für linkedin sind elf Versionen aktiv; **zwischen `202601` und `202609` liegen
mindestens zwei funktionale Änderungen** (zwei neue Conversion-Typen mit 180- und
365-Tage-Fenstern ab `202608`, gehashte Namensfelder ab `202609`), gelesen und nicht
bewertet. **WAS SICH SONST ÄNDERT, IST NICHT ERHOBEN** — der Anbieter führt eine eigene
Migrations-Seite, und sie ist **vor** einem Zuschnitt zu lesen.
**EIN REIHENFOLGE-HINWEIS, KEINE ENTSCHEIDUNG:** Eine Anhebung mit Nutzlast-Folge gehört
FRÜH in die Phase. **FÜR LINKEDIN IST SIE ZWINGEND EINE CODE-ÄNDERUNG**, für meta offen.

**ZUSCHNITT-FRAGE P11.7-18 — `externalIds` IST AUCH BEI LINKEDIN DER EINZIGE SELBST VERGEBENE WERT: ZEIGER
STATT KOPIE.** Die Frage steht als **P11.7-4**. Was hinzukommt (linkedin, Teil (ap)):
LinkedIn verlangt **KEIN Hashen** · die Liste fasst **höchstens EINEN** Wert · **DIE BINDUNG
DAUERT EIN JAHR UND GILT ÜBER ALLE WERBEKONTEN DESSELBEN BUSINESS MANAGER HINWEG**, sobald
der Wert einmal mit einem regulären Merkmal gematcht wurde. **DIE EIN-JAHR-BINDUNG
VERSCHÄRFT DIE BESTEHENDE FRAGE.**

**ZUSCHNITT-FRAGE P11.7-19 — `epik` HAT EIN BENANNTES FELD *UND* EINEN PLATZ IN DER ADRESSE, UND DER
ANBIETER BITTET UM BEIDE.** `user_data.click_id` — **und dieselbe Doku verlangt daneben**
`&epik` im Adressfeld (pinterest, Teile (ac), (af)). **OB EINES DAS ANDERE ERSETZT, ERGÄNZT
ODER DOPPELT, SAGT KEINE GELESENE SEITE**, und ob der Anbieter die Adresse selbst ausliest,
ist ausdrücklich nicht beantwortet. Einordnung in eine gemeinsame Bauform: **P11.7-15**.

**ZUSCHNITT-FRAGE P11.7-20 — JEDES ZIEL MIT KLICK-KENNUNG EMPFIEHLT, SIE IM BROWSER AUFZUBEWAHREN — UND
DIESES PRODUKT BEWAHRT NICHTS AUF.** **ARCHITEKT 2026-09-22 — BEFUND, KEINE ENTSCHEIDUNG.**
pinterest rät zum `_epik`-Cookie **statt** zum Parameter (Teil (ac)) · meta zu `_fbc` mit 90
Tagen (Teil (h)) · tiktok zu "selbst auslesen und ablegen", 28 Tage (Teil (j)) · linkedin
Cookie mit 30 Tagen, setzt aber ein eingebautes Insight Tag voraus (Teil (an)).
**GEMESSEN (P11.7-1 (a), (b), (f)):** EIN Beacon, EIN fremdes Cookie, KEIN URL-Parameter,
kein eigenes Tag ausser Metas, `persistEvent` schreibt keine Kennung. **UNTER P11.7-2 SETZT
DIESES PRODUKT KEIN EIGENES COOKIE UND LEGT NICHTS AB.**
**DIE FOLGE, UND SIE IST DER GANZE BEFUND: EINE KLICK-KENNUNG IST NUR VERFÜGBAR, SOLANGE
DIE ADRESSE SIE TRÄGT.** Für eine EINSEITIGE Landingpage genügt das; **für Seiten jenseits
der Landeseite nicht** — und das ist phasiert: docs/roadmap.md, Roadmap-Zeile 17
(Multi-Page-Funnels). **DORT IST DIE AUFBEWAHRUNG EINE OWNER-FRAGE. HEUTE IST NICHTS ZU
ENTSCHEIDEN UND NICHTS ZU BAUEN.** **GRENZE:** Dass die vier es EMPFEHLEN, ist GELESEN; wie
gross der Verlust ohne Aufbewahrung ist, ist **UNGEMESSEN**.

**ZUSCHNITT-FRAGE P11.7-21 — EIN ANGEKÜNDIGTER, UNDATIERTER SCHEMA-WECHSEL KÖNNTE `evaluateSuccessBody`
EINEN ANGEKOMMENEN FORWARD ALS FEHLSCHLAG WERTEN LASSEN.** Pinterest stellt sein
Antwort-Schema um und **lässt optionale Felder mit Null-Werten weg** — "gradually… to all
endpoints", **kein Datum, keine Endpunkt-Liste** (Teil (ak)). `evaluateSuccessBody` verlangt
`typeof num_events_received === "number"` und dasselbe für `num_events_processed`. **FIELE
EINES DER ZWEI UNTER DIE UMSTELLUNG, WERTETE DER CODE EINEN ANGEKOMMENEN FORWARD ALS
FEHLSCHLAG — still, es entstünde eine Logzeile, sonst nichts.** Ob sie darunter fallen
können, sagt die Seite nicht; **UNGEMESSEN.** Für `error_message`/`warning_message` besteht
die Gefahr nicht (`sanitizeProviderText`). **KEIN FIX-VORSCHLAG.**

**ZUSCHNITT-FRAGE P11.7-22 — META SENDET ZWEI VERLANGTE FELDER NUR BEDINGT, UND ES GIBT KEINEN RIEGEL
DAGEGEN.** **BEFUND, KEIN FIX-VORSCHLAG.** `action_source` steht unbedingt (`:310`),
`client_user_agent` hinter `if (userAgent)` (`:297`), `event_source_url` hinter
`if (eventSourceUrl)` (`:317`); verlangt sind laut Teil (l) **alle drei — das ist die ganze
Pflicht-Liste.** **DIE FOLGE IST STILL:** Fehlt die Kopfzeile oder das Rumpf-Feld, entsteht
eine Nutzlast OHNE ein verlangtes Feld **und wird trotzdem gesendet**; `userAgent` ist bei
fehlender Kopfzeile die leere Zeichenkette (`ingest.ts:996`). **DER UNTERSCHIED ZU DEN VIER
ÜBRIGEN IST DER EIGENTLICHE BEFUND:** pinterest und tiktok tragen je einen Paar-Riegel,
linkedin bricht ohne Identität ab — **NUR META HAT KEINEN.** Ob ein fehlendes Pflichtfeld
beim Anbieter ein DEFEKT oder eine EINBUSSE ist, ist am Code nicht entscheidbar. **KEIN TEST
DECKT DEN FALL** (P11.7-23).

**ZUSCHNITT-FRAGE P11.7-23 — ZWEI DER FÜNF ZIELE HABEN KEINEN WÄCHTER ÜBER IHRE VERSION BZW. IHREN
ENDPUNKT: EINE ANHEBUNG BLIEBE GRÜN, GLEICH WAS SIE TUT.** **EINGELÖST DURCH S1** — Beleg,
Massstab und Mutationsergebnisse: VERMERK P11.7-10. Nichts bleibt offen. Die Messung vom
2026-09-22 steht ungekürzt unter `11a44f7`.

**ZUSCHNITT-FRAGE P11.7-24 — DIE SEITENADRESSE WIRD NIRGENDS GEPRÜFT, UND DAS URTEIL DARÜBER STEHT SECHSMAL
ZEICHENGLEICH.** **SIE BETRITT DEN SERVER UNGEPRÜFT:** `handleIngest` typisiert
`eventSourceUrl?: unknown` in einem als **UNTRUSTED** geführten Blob; die Pflichtfeld-Prüfung
fasst nur `trackingKey`, `eventID`, `event` und `body.obs` an — **`eventSourceUrl` wird im
Handler kein einziges Mal berührt.** **DIE EINZIGE BEHANDLUNG IST EIN TRIM JE ADAPTER:**
`asString(v)` existiert **SECHSMAL ZEICHENGLEICH** (`ingest.ts:137`, `meta-forward.ts:59`,
`pinterest-forward.ts:95`, `tiktok-forward.ts:456`, `linkedin-forward.ts:160`,
`google-forward.ts:138`). **WARUM DAS EINE ZUSCHNITT-FRAGE IST:** P11.7-3 verlangt, fremde
Kennungen aus dieser Adresse zu ENTFERNEN — eine Stelle, die entfernt, ist zwangsläufig auch
die erste, die den Wert ANFASST. **DIE SECHS KOPIEN WERDEN HIER NICHT ZUM VORHABEN GEMACHT**
— der Kopfkommentar an mehreren führt die Doppelung ausdrücklich als gewollt.

**ZUSCHNITT-FRAGE P11.7-25 — DIE SIEBEN KANDIDATEN ZUR GEMEINSAMEN BAUFORM.** **SIE IST DIE CODE-SEITE VON
P11.7-15** und ersetzt sie nicht: jene trägt die Gestalt und die Anbieter-Ungleichheit,
diese die Auflagen des eigenen Codes. **`extractGoogleClickIds` ist heute:**
`(url: unknown) => GoogleClickIds`, rein, ohne `server-only`, Netz, DOM oder Zustand,
**wirft nie**; ein nicht gefundener Schlüssel FEHLT, er ist nie `undefined`; sie prüft
**Anwesenheit, nie Form**. **KANDIDATEN JA, AUSWAHL NEIN:**
(1) **Die Rückgabe-Form ist heute auf ein Ziel festgelegt** — Zuordnung Ziel→Kennungen,
flache Menge, oder je Ziel eine Funktion mit gemeinsamem Vertrag.
(2) **Die Eingabe ist eine einzige Zeichenkette, und das reicht für die Cookie-Wege nicht**
— s. P11.7-26.
(3) **Sie extrahiert, sie entfernt nicht** — das Entfernen gibt eine ZEICHENKETTE zurück:
zweite Funktion, kombinierte Rückgabe, oder zwei Scheiben.
(4) **DER ORT — DIE HARTE AUFLAGE, DIE JEDER ZUSCHNITT KENNEN MUSS.** Zwei Orte sind
sichtbar: IM ADAPTER (heute bei google) oder VOR dem Fan-Out. **`dispatchForward`
(`ingest.ts:540`) IST NICHT ASYNC, UND ALLES DORT LIEGT AUSSERHALB DES 204-CONTAINMENTS** —
**JEDE gemeinsame Stelle dort müsste dieselbe Zusage tragen: SIE DARF NIE WERFEN.** Der
dritte Ort, `handleIngest` vor Zeile 1044, läge INNERHALB des `try`. **Ein Wurf im
Ingest-Pfad machte aus der garantierten leeren 204 einen 500 und leakte den
Gültigkeitszustand des trackingKeys** (docs/immer-beachten.md, "INGEST-204-CONTAINMENT").
(5) **Die Signatur von `Forwarder` müsste wachsen**, läge die Stelle vor dem Adapter — Muster
am siebten Parameter (`ingest.ts:283–314`): nachgestellt und optional. **DIE DORT VERWORFENE
ALTERNATIVE — denselben Zustand ZUSÄTZLICH an `ResolvedTarget` zu hängen — IST MIT GRUND
VERWORFEN** und wäre neu vorzutragen.
(6) **`unknown` statt `string` ist richtig und bleibt es** — `CapiRequestBody` typisiert
jedes Rumpf-Feld als `unknown`.
(7) **Die Auflage "Anwesenheit, nie Form" ist heute ziel-spezifisch begründet.** Für
`li_fat_id` und `epik` steht inzwischen dasselbe im Bestand (je ein Nicht-Treffer mit
benannter Reichweite). **OB SIE DAMIT FÜR ALLE GILT, IST EINE ENTSCHEIDUNG UND HIER NICHT
GETROFFEN.**
**AM CODE NICHT ENTSCHEIDBAR:** was "nur seine eigene Kennung" je Ziel heisst — das ist die
Anbieter-Achse, und P11.7-15 führt sie.

**ZUSCHNITT-FRAGE P11.7-26 — DIE COOKIE-WEGE DER ANBIETER SIND ÜBER DIE HEUTIGE BEACON-FORM NICHT
ERREICHBAR, UND DER WEG DORTHIN FÜHRT DURCH DEN `/api/e`-PFAD.**
`buildCapiBeaconStatement` liest GENAU EIN Cookie (`_fbp`) und setzt
`eventSourceUrl: location.href`; **KEIN URL-PARAMETER**. PageView-Emitter und
Pixel-Bestätigung senden weder das eine noch das andere. Alle vier Anbieter mit Cookie-Weg
sind in P11.7-20 mit Zeiger benannt. **DIE FOLGE: EIN COOKIE-WERT STEHT NICHT IN
`eventSourceUrl` UND IST ÜBER SIE NICHT ZU ERREICHEN.** Wer einen Cookie-Weg zuschneidet,
braucht **NEUE FELDER IM BEACON-RUMPF** — und der Beacon läuft auf `/api/e`, dem Pfad, den
JEDER Besucher JEDER Kundenseite trifft. **DAS BERÜHRT DIE A-REGEL "/API/E-SCHLANKHEIT" AN
IHREM KOPF.** **GRENZE:** Ein zusätzliches Rumpf-Feld ist **nicht** dasselbe wie eine
Aufbewahrung — das Lesen eines fremd gesetzten Cookies legt nichts ab; ob die
Unterscheidung trägt, entscheidet P11.7-2 und nicht diese Frage. **NICHT ENTSCHIEDEN:** ob
Cookie-Wege überhaupt zugeschnitten werden · welche Felder der Beacon trüge · je Ziel oder
gebündelt.

## Zuschnitt der Phase 11.7

**OWNER-ENTSCHEIDUNG VOM 2026-09-22 — DIE REIHENFOLGE DER SCHEIBEN.** Festgehalten am
2026-09-23. Entschieden sind die REIHENFOLGE und je Scheibe der GEGENSTAND. **Was unten als
offen steht, bleibt offen** und wird im Stufe-1-Plan der jeweiligen Scheibe beantwortet; wo
die Entscheidung eine Zuschnitt-Frage berührt, steht dabei, welcher Teil davon entschieden
ist. **KEINE EMPFEHLUNG, KEINE ZIELVERSION, KEINE GESTALT für S4 und S5.** S1 ist gebaut
(VERMERK P11.7-10); die übrigen sind weder gebaut noch geplant.

**S1 — WÄCHTER, REINE TEST-SCHEIBE. ABGESCHLOSSEN AM 2026-09-23 — VERMERK P11.7-10.**
Gegenstand: der Vorgabewert von `META_GRAPH_VERSION` über einen ECHTEN Import von
`src/lib/capi/config.ts`, der LinkedIn-Endpunkt und die Versions-/Termin-Tabelle aus
ZUSCHNITT-FRAGE P11.7-13, für meta und linkedin. Eingelöst: ZUSCHNITT-FRAGE P11.7-23
vollständig, P11.7-13 für meta und linkedin; Massstab und Mutationsergebnisse im Vermerk.
**WAS DARÜBER HINAUS BINDET:** Entscheidung P11.7-5.

**S2 — ANHEBUNG LINKEDIN, `202601` → Zielversion.** Zuerst unter den Anhebungen, weil ihr
Termin der frühere ist (15.01.2027 gegen 2027-01-21, ZUSCHNITT-FRAGE P11.7-17) und weil sie
ZWINGEND eine Code-Änderung ist: die Version ist eine Modul-Konstante ohne Env-Weg (Tabelle
in P11.7-13).
PFLICHT DAVOR: Volladung docs/ziel-befunde/linkedin.md plus der Kopf von
docs/ziel-befunde.md · die Lesung der Migrations-/Änderungsseite des Anbieters (P11.7-17:
"vor einem Zuschnitt zu lesen").
NICHT ENTSCHIEDEN: die ZIELVERSION. Sie wird aus dem Gelesenen VORGESCHLAGEN, der Owner
entscheidet. Bekannt und nicht bewertet: `202609` ist die jüngste aktive Version (linkedin,
Teil (at)); dazwischen liegen mindestens zwei funktionale Änderungen (P11.7-17).
**ZIELVERSION `202609` — OWNER-ENTSCHEIDUNG 2026-09-23.** Der Satz "NICHT ENTSCHIEDEN"
darüber ist damit überholt und bleibt als Stand vor der Entscheidung stehen. GRUND: Laut
docs/ziel-befunde/linkedin.md, Teile (aw) und (ax), ändert keine Version zwischen `202601`
und `202609` etwas an einer Nutzlast ohne `userInfo`; damit entscheidet die Laufzeit — bis
15.09.2027 (Teil (au)). VERWORFEN: `202602` (Ablauf 15.02.2027, die zweite Anhebung stünde
einen Monat nach der ersten an). GRENZE: Dass der Anbieter unsere Nutzlast unter `202609`
annimmt, ist eine FOLGERUNG aus der Änderungsliste, keine Messung — der Live-Test von S2
beantwortet sie.
NICHT dazu: `li_fat_id` (S6) · jede Meta-Änderung.
**LÖST S2 DIE ANHEBUNG EIN**, wird der Posten "DIE LINKEDIN-VERSION DES ADAPTERS WIRD AM
15.01.2027 ABGESCHALTET — DANN SCHEITERT DER FORWARD STILL" in docs/offene-punkte.md mit dem
Beleg der Erledigung gestrichen und seine Stub-Zeile in CLAUDE.md im selben Zug entfernt —
im Abschluss-Commit von S2.

**S3 — ANHEBUNG META, `v21.0` → Zielversion.**
PFLICHT DAVOR: Volladung docs/ziel-befunde/meta.md plus der Kopf von docs/ziel-befunde.md.
NICHT ENTSCHIEDEN: die Zielversion · ob die Anhebung über die Umgebungsvariable oder den
Vorgabewert läuft (dieselbe Offenheit steht im Abschnitt "Frist mit Termin").
NICHT dazu: `fbc` (S5) · der Pflichtfeld-Riegel (ausgeschlossen, s. unten).

**S2 UND S3 ÄNDERN NACH IHREM GEGENSTAND EINE VERSIONSANGABE, KEIN NUTZLAST-FELD.** Die
Owner-Entscheidung führt S4 als erste Scheibe, die eine Kennung durchleitet. **Bringt eine
Zielversion eine Nutzlast-Folge mit, ist diese Einordnung im Stufe-1-Plan jener Scheibe neu
zu prüfen** — der Pflicht-Nachweis bindet an die ERSTE solche Scheibe ("Was den Zuschnitt
bindet"), nicht an eine Nummer.

**S4 — GEMEINSAME STELLE FÜR KLICK-KENNUNGEN, samt Entscheidung P11.7-3.** Gegenstand: die
EINE Stelle aus ZUSCHNITT-FRAGE P11.7-15 und mit ihr die Umsetzung von Entscheidung P11.7-3
(eine Klick-Kennung geht nur an ihren Urheber) — also auch das Entfernen fremder Kennungen
aus der weitergereichten Adresse (P11.7-15; für meta ZUSCHNITT-FRAGE P11.7-5, für tiktok
P11.7-9). Entschieden ist damit aus P11.7-15, DASS die Stelle kommt.
**ERSTE SCHEIBE, DIE EINE KENNUNG DURCHLEITET (OWNER-EINORDNUNG).** Sie trägt:
(a) den Pflicht-Nachweis aus "Was den Zuschnitt bindet" auf Ablage UND Logausgabe — die
Log-Achse ist in VERMERK P11.7-8 erhoben, **die Schreibpfade sind es nicht und werden hier
erhoben**; (b) die harte Auflage aus ZUSCHNITT-FRAGE P11.7-25, Punkt (4): **die Stelle darf
nie werfen** — Punkt (4) begründet das für die beiden Orte vor dem Fan-Out
(INGEST-204-CONTAINMENT).
Sie berührt mehrere Ziele — meta, pinterest und tiktok reichen die Adresse weiter (VERMERK
P11.7-1, Teil (g)); es gilt die Mehr-Ziele-Regel aus "Was den Zuschnitt bindet". Sie ist die
erste Stelle, die die Adresse ANFASST (ZUSCHNITT-FRAGE P11.7-24); die sechs
`asString`-Kopien werden dadurch nicht zum Vorhaben.
OFFEN — die GESTALT (P11.7-15, P11.7-25): wo sie liegt · welche Kennungen sie kennt · was
sie mit einer unbekannten tut · die Kandidaten (1) bis (7) aus P11.7-25.
NICHT dazu: die Cookie-Wege (ausgeschlossen, s. unten).

**S5 — META `fbc` ÜBER DEN ADRESSWEG (`fbclid`), erster Konsument von S4.** Berührt:
ZUSCHNITT-FRAGE P11.7-1 — für DIESE Phase ist der Adressweg gewählt, der Cookie-Weg ist
ausgeschlossen · P11.7-2 (Zuschnitt-Frage) — ohne eigene Ablage ist der Zeitanteil von `fbc`
faktisch der Ereigniszeitpunkt, die Wirkung ungemessen · P11.7-5 · P11.7-20 — die Kennung
ist nur verfügbar, solange die Adresse sie trägt · Entscheidung P11.7-2 (`fbc` gleich welchen
Trägers unter TRANSIT-ONLY).
PFLICHT DAVOR: Volladung docs/ziel-befunde/meta.md plus Kopf.
OFFEN: die Gestalt, soweit sie aus S4 folgt.
NICHT dazu: das `_fbc`-Cookie in beiden Formen · der Pflichtfeld-Riegel (je unten).

**S6 BIS S9 — JE ZIEL; IHRE REIHENFOLGE UNTEREINANDER IST OFFEN.** Je Scheibe gilt der
Pflicht-Stopp mit der Datei ihres Ziels.
- linkedin `li_fat_id` — ZUSCHNITT-FRAGE P11.7-14 und ihre Folgefrage P11.7-16. T1-a wird
  bei einem zweiten `userIds`-Eintrag rot (VERMERK P11.7-8, C10).
- google IP/UA und DMA-Felder — ZUSCHNITT-FRAGE P11.7-6, P11.7-7; Entscheidung P11.7-4. **Ob
  eine Sitzung die Volladung von docs/ziel-befunde/google.md trägt, ist ungemessen**
  (ZUSCHNITT-FRAGE P11.7-8).
- tiktok `ttclid` — ZUSCHNITT-FRAGE P11.7-9 (ob zusätzlich `user.ttclid`), P11.7-10.
- pinterest `epik` — ZUSCHNITT-FRAGE P11.7-19.

**MITZUNEHMEN — VORRAT P11.7-1, P11.7-3, P11.7-4 (Kopfkommentare)**, je in der ersten
Scheibe, die ihre Datei berührt, wie ihre Trigger es verlangen. **P11.7-3 geht in S2** — die
Anhebung ändert `linkedin-forward.ts` zwangsläufig. Für P11.7-1 (`google-click-ids.ts`) und
P11.7-4 (`pinterest-forward.ts`) hängt es an der Gestalt von S4 und ist offen; spätestens die
Scheibe ihres Ziels, spätestens das Phasenende. P11.7-2 gehört nicht dazu: sein Trigger ist
der Zuschnitt von GA4.

**AUSDRÜCKLICH NICHT TEIL DIESER PHASE:**
- E-Mail, Telefon und alles übrige Personenbezogene — schon die Frage F3 nimmt sie aus.
- `external_id` bzw. `externalIds` — der einzige selbst erzeugte Wert; worunter er fällt,
  ist eine offene OWNER-Frage (ZUSCHNITT-FRAGE P11.7-4; Zeiger P11.7-12, P11.7-18).
- ein eigenes `_fbc`-Cookie zu setzen — unter Entscheidung P11.7-2 legt dieses Produkt
  nichts ab; ohne neue Owner-Entscheidung nicht baubar (ZUSCHNITT-FRAGE P11.7-2, P11.7-20).
- der `_fbc`-Cookie-WEG und jedes neue Feld im Beacon-Rumpf — er führt durch `/api/e` und
  berührt "/API/E-SCHLANKHEIT" an ihrem Kopf (ZUSCHNITT-FRAGE P11.7-26); ein neues
  Beacon-Feld steht im ausgelieferten Text und wirkt erst nach Neu-Veröffentlichen
  (docs/immer-beachten.md, "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY").
- ein Meta-Pflichtfeld-Riegel für `client_user_agent`/`event_source_url` (ZUSCHNITT-FRAGE
  P11.7-22) — ob ein fehlendes Pflichtfeld beim Anbieter ein Defekt oder eine Einbusse ist,
  ist ungemessen, und ein Riegel könnte Conversions verwerfen, die der Anbieter annimmt; vor
  einem Bau steht eine Messung.

**DREI ABWEICHUNGEN VOM FRÜHEREN ARCHITEKTEN-VORSCHLAG — soweit sie eine spätere Handlung
binden:**
(a) **Meta-`fbc` steht NACH der gemeinsamen Stelle.** `fbclid` aus der Adresse zu lesen IST
    Kennungs-Extraktion; zuerst im Adapter gebaut, würde sie von S4 wieder herausgerissen.
    Bindet: keine Kennungs-Extraktion im Meta-Adapter vor S4.
(b) **Der Adressweg wirkt auf bereits veröffentlichten Seiten OHNE Neu-Veröffentlichen, der
    Cookie-Weg nicht** — das trennt S5 vom ausgeschlossenen Cookie-Weg. Tragend: der
    Klick-Beacon sendet `eventSourceUrl` = `location.href` samt Query-String (VERMERK
    P11.7-1, Teile (a), (g)). **GEMESSEN am Git-Verlauf (CC, 2026-09-23):** Das Feld steht in
    `buildCapiBeaconStatement` seit Commit `6e2e4ba` (2026-07-06, "dedup beacon alongside
    pixel"), dem ersten, der die Zeichenfolge in jener Datei trägt. **GRENZE:**
    PageView-Emitter und Pixel-Bestätigung senden bare (Teil (c)) — der Adressweg erreicht
    nur Ereignisse des Klick-Beacons.
(c) **Der Pflichtfeld-Riegel ist von der Meta-Scheibe abgetrennt** (Grund oben). Bindet: S3
    und S5 bauen ihn nicht mit.

**AUFLAGE ZUR FRIST.** Löst S3 die Frist ein, die der Abschnitt "Frist mit Termin" führt,
wird sie mit dem Beleg der Erledigung gestrichen; wird S3 vertagt oder verworfen, wird die
Frist VOR dem Phasenende nach docs/offene-punkte.md gehoben, mit Titel und Trigger als
Stub-Zeile in CLAUDE.md, im selben Zug. Jener Abschnitt bleibt wörtlich; hebt die nächste
Runde, die docs/offene-punkte.md ohnehin öffnet, die Frist schon vorher dorthin, wird sie
dort gestrichen.
**FÜR S2 TRÄGT DIESE DATEI KEINE FRIST:** "Frist mit Termin" trägt genau einen Posten
(meta); der LinkedIn-Termin 15.01.2027 steht bereits als Posten in docs/offene-punkte.md
(Abschnitt "Offene Fragen an den Anbieter-Crawl", letzter Absatz). Eine Hebung entfällt;
was die Erledigung durch S2 an jenem Posten bewirkt, steht an S2.

## Nächster Schritt

**ALS NÄCHSTES DER STUFE-1-PLAN DER SCHEIBE S2** (Abschnitt "Zuschnitt der Phase 11.7").
Der Zuschnitt steht seit der Owner-Entscheidung vom 2026-09-22. Die Sperren, die ihn hielten, sind eingelöst: alle fünf
Ziele sind durchlaufen (VERMERKE P11.7-2 bis P11.7-7), die Fragen an den eigenen Code sind
am Code beantwortet (VERMERK P11.7-8), und die Ladung ist wieder leistbar (VERMERK
P11.7-9).

**WAS DER ZUSCHNITT MITBRINGEN MUSS, und es ist kein Vorschlag seines Inhalts:** die
VOLLLADUNG der Datei jedes berührten Ziels samt dem Kopf des Verzeichnisses · die
sechsundzwanzig ZUSCHNITT-FRAGEN, deren vom Zuschnitt festgelegte Teile (P11.7-1, -13, -15,
-23) im Abschnitt "Zuschnitt der Phase 11.7" benannt sind, alle übrigen offen · die vier Entscheidungen
P11.7-1 bis P11.7-4 · und den Pflicht-Nachweis aus "Was den Zuschnitt bindet", also die
Messung auf Ablage und Logausgabe am gebauten Google-Transport, von der erst die Log-Achse
erhoben ist. **KEINE EMPFEHLUNG**, welches Ziel oder welche Frage zuerst.

**KEIN ZUSCHNITT GEGEN UNGEPRÜFTE ANNAHMEN.** Der Satz "KEIN ZUSCHNITT VOR DEM CRAWL" ist
mit dem fünften Ziel eingelöst, der Satz "KEIN ZUSCHNITT VOR DIESER AUFKLÄRUNG" mit VERMERK
P11.7-8. **WAS BLEIBT, IST IHR GEMEINSAMER GRUND:** Ein Zuschnitt gegen eine geratene
Feldliste oder gegen ungeprüfte Annahmen über den eigenen Code ist nichts wert.
