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
(Vermerk, Entscheidung, Vorrat, offene Frage, Hebungs-Kandidat) und werden NIE neu vergeben. Ein neuer
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
- Hebungs-Kandidaten
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

**OWNER-KLARSTELLUNG 2026-09-24 — ADDITIV, DER TEXT DARÜBER BLEIBT:** Die Klick-Kennungen und
Match-Felder (der fünfte Punkt) sind **EINER VON FÜNF PUNKTEN, NICHT DAS HAUPTTHEMA DER
PHASE.** Die vier ursprünglichen Punkte — tiktok Deduplizierung (F5), meta Versionsangabe
(F6), Rate-Limits meta/tiktok/linkedin samt der Pinterest-Widersprüche (F7), pinterest
Erfolgsrumpf (F8) — **WERDEN VOR DEM PHASENENDE ERFÜLLT.** Der Zuschnitt S1 bis S9 trägt F5,
F7 und F8 bisher NICHT; **DAS IST EIN VERSÄUMNIS DES ZUSCHNITTS VOM 2026-09-22, KEIN
BESCHLUSS.** Ein Roadmap-Abgleich — der Wortlaut der Roadmap-Zeile 11.7 gegen den Stand je
Punkt — folgt als NÄCHSTER Schritt, VOR S8 (Abschnitt "Nächster Schritt").

**OWNER-ENTSCHEIDUNGEN 2026-09-24 NACH DEM ROADMAP-ABGLEICH — ADDITIV, DER TEXT DARÜBER
BLEIBT.** Material: VERMERK P11.7-25.
- **E-a — WAS DIE ROADMAP JE PUNKT VERLANGT:** für F5, F6 und F7 eine LESUNG, für F8 eine
  MESSUNG (docs/roadmap.md, Roadmap-Zeile 11.7). **F5, F6 UND F7 SIND DURCH DIE LESUNG
  ERFÜLLT;** ihre weitergehenden Messungen verlangt die Roadmap nicht — sie werden beim [x]
  als unbewiesen benannt. **F8 WIRD GEMESSEN, NICHT GEHOBEN.**
- **E-b — DER RATE-LIMIT-WIDERSPRUCH BEI PINTEREST** (drei Aussagen,
  docs/ziel-befunde/pinterest.md, Teil (ai)(2)) hat kein belegtes Instrument; er wird beim
  [x] als unbewiesen benannt.
  **ZEIGER 2026-09-24 — AUFGELÖST DURCH MESSUNG (VERMERK P11.7-26; docs/ziel-befunde/
  pinterest.md, Teil (al)(iii)):** 120 000 je 60 s, Kategorie `ads_conversions_ad_account_id`.
  Beim [x] NICHT mehr als unbewiesen zu benennen.
- **E-c — DIE UNBEHANDELTEN MATCH-FELDER GEHÖREN NICHT ZUM FÜNFTEN PUNKT**, je mit Grund —
  sie gehören zu anderen Kanälen als einer Landeseite oder sind dort nicht verfügbar:
  · meta `subscription_id`, `fb_login_id` — Abos bzw. Facebook-Login in Apps; `lead_id` —
    Lead-Formulare in Meta; `page_id`, `page_scoped_user_id`, `ctwa_clid`, `ig_account_id`,
    `ig_sid` — Messenger, WhatsApp, Instagram.
  · linkedin `lead` — Lead-Formulare in LinkedIn; `ACXIOM_ID` — Kennung eines
    Datenhändlers; `GOOGLE_AID` — Werbe-ID von Android-Geräten; `SHA256_IP_ADDRESS` — die IP
    geht bereits im Klartext.
  · pinterest `customer_type` — neu/wiederkehrend ist uns nicht bekannt; `app_info` — für
    Apps.
    **BEFUND-ZEIGER 2026-09-24 — `app_info`, DER WORTLAUT DARÜBER BLEIBT:** Das Ergebnis
    steht, weil der User-Agent schon als `user_data.client_user_agent` an Pinterest geht
    (`userData` in `forwardToPinterest`, `src/lib/capi/pinterest-forward.ts`; GEMESSEN am
    Code, `app_info` kommt in `src/` nicht vor) — `app_info.user_agent` wäre ein zweiter Ort
    für denselben Wert und gehört nicht zur Mindestregel. Die Begründung "für Apps"
    widerspricht dagegen docs/ziel-befunde/pinterest.md, Teil (ae): "Primarily used for Web
    events". VERMERK P11.7-29.
  · tiktok `ad.campaign_id`/`ad_id`/`creative_id` — Werte des Anbieters, nicht der Seite;
    `locale` — nicht erhoben, geringer Nutzen; `page.referrer` — bräuchte ein neues
    Beacon-Feld, in dieser Phase ausgeschlossen (/api/e-Schlankheit).
  Für google wurde die Feldliste in S7 entschieden (G1, "NICHT TEIL VON S7").
- **E-d — REIHENFOLGE BIS ZUM PHASENENDE:** (1) F8 messen · (2) S8 tiktok · (3) S9
  pinterest · (4) Owner-Entscheidungen: Vorrat P11.7-9 (K1–K4) und ZUSCHNITT-FRAGE
  P11.7-11 · (5) LinkedIn-Nachablesung (VERMERK P11.7-22, (c)) · (6) Phasenende: Matrix in
  docs/ziel-fragenkatalog.md fortschreiben (B2, G1, H2, H3), beim [x] das Unbewiesene
  benennen, Hebung, Archivierung.

**OWNER-ENTSCHEIDUNGEN 2026-09-24 ZU SCHRITT (4) VON E-d — ADDITIV, DER TEXT DARÜBER BLEIBT.**
Material: der Entscheidungsbericht desselben Tages (Vorrat P11.7-9, VERMERK P11.7-22).
- **E-e — ZU VORRAT P11.7-9: K1 FÜR ALLE FÜNF ZIELE, NICHT NUR LINKEDIN.** Grund: Bei vier von
  fünf Zielen ist ein Erfolg heute still (GEMESSEN am Code, 2026-09-24: meta, tiktok, linkedin
  und google loggen nur Ablehnung, Riegel und Wurf), und die Pinterest-Spur hängt an der Warnung
  "external_id is missing", die mit ZUSCHNITT-FRAGE P11.7-4 entfiele.
  VERWORFEN: **K1b** — ein Umgebungs-Schalter bliebe unbeobachtet (Muster des Postens "DER CODE
  TRÄGT EINEN DEPLOYMENT-WEITEN TESTMODUS-HEBEL …" in docs/offene-punkte.md) · **K3** — mehr
  Aufwand für denselben Zweck.
  **K4 IST DIE BETREIBER-ANTWORT UND GEHÖRT NICHT IN 11.7:** Sie wird beim Phasenende nach
  docs/offene-punkte.md gehoben, Trigger "vor echtem Ad-Traffic".
  DIE GRENZE VON K1: nur für den Owner sichtbar · Logs eine Stunde auf Hobby
  (docs/plattform-befunde.md, Vercel-Abschnitt, GELESEN) · eine 2xx-Antwort belegt die
  ANNAHME, nicht die Verarbeitung. Zugeschnitten als S10 (Abschnitt "Zuschnitt der Phase
  11.7").
- **E-f — ZUSCHNITT-FRAGE P11.7-11 IST GESCHLOSSEN.** Im Log sind `40100` und `40104` über
  `code=` trennbar (`describeRejection`, `src/lib/capi/tiktok-forward.ts`). Eine
  Kontrollfluss-Unterscheidung — erneut senden — bräuchte eine Hintergrund-Zustellung, deren
  Trigger nach "/API/E-SCHLANKHEIT" und nach der B-Leitplanke "QUEUE-TOOLS / ASYNC-INFRASTRUKTUR"
  (CLAUDE.md) nicht eingetreten ist. Die Anzeige-Hälfte geht an K4. Welche zwei Codes der
  Kopfkommentar im TikTok-Adapter meint, nimmt S10 mit (Q6).

## Was den Zuschnitt bindet

**DER ZUSCHNITT STEHT SEIT DER OWNER-ENTSCHEIDUNG VOM 2026-09-22 IM ABSCHNITT "Zuschnitt der
Phase 11.7".** Die Teile der Zuschnitt-Fragen P11.7-1, -2, -13, -15, -23 und -25, die er
festlegt, sind dort benannt; alle übrigen bleiben offen.

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
Positivkontrolle. **BEIDE ACHSEN SIND ERHOBEN — die Log-Achse in VERMERK P11.7-8, die
Schreibpfade in VERMERK P11.7-15, dazu das Hashen in VERMERK P11.7-16;** der Posten ist mit
dem Abschluss von S4 geschlossen (VERMERK P11.7-16).

## Frist mit Termin — sie wartet nicht auf das Phasenende

**GEGENSTANDSLOS SEIT DEM 2026-09-23.** Der Abschnitt trug genau einen Posten: Die Anhebung
der Meta-Graph-Version musste vor dem 2027-01-21 gebaut sein, dem Abschalttermin von `v21.0`
(docs/ziel-befunde/meta.md, Teil (s)). **BELEG DER ERLEDIGUNG:** Bau-Commit `9778aca` hebt
den Vorgabewert auf `v25.0`, live bestätigt — VERMERK P11.7-14. Den neuen Termin trägt der
Wächter T1 in `src/lib/capi/version-deadlines.test.ts`. Der Wortlaut des Postens steht
unter Commit `9365c7f`.

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

**EIN "NICHT ENTSCHEIDBAR"-PUNKT JENES TAGES IST NOCH OFFEN** (fünf sind durch die
Entscheidungen P11.7-1 bis P11.7-4 erledigt; die TRANSIT-ONLY-Auflage im Google-Transport ist
mit S4 geschlossen — Log-Achse in P11.7-8, Schreibpfade in P11.7-15, Hashen in P11.7-16): der
Volltext des
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
Werte, keine Kennung). **DIE ÜBRIGEN SCHREIBPFADE WAREN HIER NICHT ERHOBEN** — erhoben in
VERMERK P11.7-15.

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
**ZEIGER 2026-09-23 — C10 UND DIE ZEILE linkedin GELTEN NUR FÜR EINEN EINTRAG, DEN DIE FIXTURE
TRÄGT:** T1-a fährt ohne Adresse; ein Eintrag aus der Adresse macht ihn nicht rot —
Richtigstellung in VERMERK P11.7-19, (b).

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

**ZEIGER 2026-09-23 — DER TEXT DARÜBER BLEIBT, ER IST DER STAND VOR DER ENTSCHEIDUNG:** Die
Zielversion `202609` ist gewählt (OWNER-ENTSCHEIDUNG 2026-09-23), gebaut und live bestätigt
— VERMERK P11.7-12.

### VERMERK P11.7-12 — Scheibe S2 gebaut und live bestätigt vom 2026-09-23 (LinkedIn `202609`)

**HARTE ANGABEN:** 2026-09-23 · **BAU-COMMIT `5d5602e`** (`chore(capi): LinkedIn-Version
202601 -> 202609 (11.7 S2)`) · drei Dateien: `src/lib/capi/linkedin-forward.ts`
(`LINKEDIN_VERSION` = `"202609"`, Kommentare nach Vorrat P11.7-3 und P11.7-6 und am Wert
selbst), `src/lib/capi/linkedin-forward.test.ts` (T1-c prüft nur noch die ANWESENHEIT der
Kopfzeile; Kopf nach Vorrat P11.7-5), `src/lib/capi/version-deadlines.test.ts` (Zeile
linkedin `202609` / `2027-09-15T00:00:00Z` / Teil (au), Kommentar an V4) · Nutzlast
unverändert, keine Kennung neu durchgeleitet · Tests **2108 / 97 vorher und nachher**
(GEMESSEN, CC) · Zielversion: OWNER-ENTSCHEIDUNG 2026-09-23 (Abschnitt "Zuschnitt", S2).

**MUTATIONSPROBEN — ALLE SIEBEN WIE VORHERGESAGT**, je als voller Lauf über 97 Dateien, je
zurückgenommen und per sha256 gegen den Stand nach dem Bau belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| m0 | Kopfzeile `LinkedIn-Version` entfernt (nicht beauftragt, deklariert) | T1-c, V4 |
| m1 | `LINKEDIN_VERSION` `"202601"` | NUR V4 |
| m2 | Tabellenzeile version `"202601"` | NUR V4 |
| m3 | Uhr in T1 2027-07-17T00:00:00Z | T1, Meldungen meta und linkedin |
| m3b | Uhr 2027-07-16T23:59:59Z | T1, nur meta |
| m4 | Uhr 2026-11-16T00:00:00Z (alte linkedin-Grenze) | nichts |
| m4b | Uhr 2026-11-22T00:00:00Z | T1, nur meta |

**DIE SUCHE `202601|2027-01-15` ÜBER `src/`: ZWEI TREFFER, BEIDE IM KOMMENTAR AN
`LINKEDIN_VERSION`** — so vom Owner angenommen. Die Vorhersage aus dem Stufe-1-Plan lautete
0; sie war vor dem Kommentar entstanden und vor dem Lauf nicht nachgezogen.

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-23):** "Data last received" im Campaign Manager vor
dem Deploy September 21, 2026 12:23 PM, nach einem Klick auf der Live-Seite September 23,
2026 10:25 AM · Mitläufer im Meta Events Manager: Lead, eventID
`2407c919-1b19-4099-a767-ace2b824c99e`, Browser "Verarbeitet" 10:25:19, Server
"Dedupliziert" 10:25:20 (lokale Anzeige, Zeitzone vermutlich MESZ) · Vercel-Logs: keine Zeile
`[capi] LinkedIn forward`.
**DIE GRENZE:** Die Anzeige hat Minutenauflösung; belegt ist der Sprung vom 21. auf den 23.
September, nicht ein Sekundenvergleich. Die Zuordnung zum Klick trägt, weil es keinen fremden
Traffic gibt (CLAUDE.md, "## Modus").

**BEOBACHTUNG — UNGEMESSEN, NICHT BEWERTET:** Der Meta Events Manager zeigt zum selben Klick
ZWEI identische Browser-Einträge "Verarbeitet". Ob das ein Anzeige-Doppel ist oder ein
zweimal feuerndes `fbq` (etwa ein eigenes Pixel auf der Seite), ist offen.
**ZEIGER 2026-09-23 — AUFGELÖST ALS GRUPPENANZEIGE DES EVENTS MANAGERS:** Er zeigt ein
Ereignis als GRUPPIERTE Zeile — Gruppenkopf plus zwei Kind-Einträge (Browser, Server); der
scheinbar doppelte Browser-Eintrag ist der Gruppenkopf im kopierten Text (OWNER-SCREENSHOT
2026-09-23, aufgenommen am Ereignis des Live-Tests von S3, VERMERK P11.7-14).

**ZEIGER:** docs/ziel-befunde/linkedin.md, "MESSUNG 2026-09-23 — Ankunft unter 202609 …
der Teil (bc)"; dazu je ein datierter Zeiger an (ax) und (ay). **ABSCHLUSS IM SELBEN ZUG:**
Posten "DIE LINKEDIN-VERSION DES ADAPTERS WIRD AM 15.01.2027 ABGESCHALTET — DANN SCHEITERT
DER FORWARD STILL" in docs/offene-punkte.md gestrichen mit Beleg, Stub in CLAUDE.md entfernt;
Vorrat P11.7-3, -5, -6 geschlossen.

### VERMERK P11.7-13 — Crawl zur Scheibe S3 vom 2026-09-23 (VORARBEIT, KEIN BAU)

**HARTE ANGABEN:** 2026-09-23 · HEAD `811c15d` · Arbeitsbaum sauber · **VOLLLADUNG** von
docs/ziel-befunde/meta.md (926 Zeilen) plus Kopf von docs/ziel-befunde.md (220 Zeilen) VOR
der ersten Navigation · **DREISSIG Seiten** geöffnet, davon neunzehn vollständig, elf mit
benannter Achse · `textContent`, englische Fassung · **KEIN Aufruf gegen die Schnittstelle** ·
Werkzeug-Ablage vorab als ignoriert belegt (`.gitignore`, Zeile `.playwright-mcp/`) · `src/`
nicht angefasst.

**ZEIGER:** docs/ziel-befunde/meta.md, "Abschnitts-Lesung 2026-09-23 der Versionierungs- und
Änderungsseiten (S3 der Phase 11.7) — die Teile (v) bis (z)" samt Umfangs-Block. **ZWEI
ÄLTERE TEILE HABEN EINEN DATIERTEN VORBEHALT BEKOMMEN**, Wortlaut unangetastet: (s) und (t).

**DIE ANTWORTEN, je mit Teil:**
- **M1** — (w): Tabelle 1 (Graph) v22.0 2027-05-20 · v23.0 2027-10-08 · v24.0 2028-02-18 ·
  v25.0 2028-07-29 · v26.0 TBD; Tabelle 2 (Marketing) v24.0 2026-10-06 · v25.0 TBD · v26.0
  TBD. **In beiden mit Termin: allein `v24.0`.** Die Marketing-Einzelseite von `v21.0` führt
  "Available until September 9, 2025".
- **M2** — (x): In den versionierten Änderungslisten v22.0 bis v26.0 beider Zweige **kein
  Eintrag** zu `/{PIXEL_ID}/events`. Zwei Protokoll-Abkündigungen gelten versionsunabhängig
  und treffen den heutigen Aufruf nicht (GEMESSEN am Repo). **LÜCKE:** die
  Out-of-cycle-Änderungen der Marketing API (GitHub, nicht geöffnet).
- **M3** — (v): **BEANTWORTET AUF DOKU-EBENE** — für die Conversions API gilt der
  Graph-Zeitplan, als ausdrückliche Ausnahme. F6 ist damit auf Doku-Ebene entschieden und
  bleibt als MESSUNG offen.
- **M4** — (y): Graph `facebook-api-version`, Marketing `X-Ad-Api-Version-Warning`. Der
  Adapter liest keine von beiden (GEMESSEN am Repo). F6 ist mit EINEM Aufruf messbar.
- **M5** — (z): Unter dem Marketing-Schema "fail or be upgraded", Hochstufung abschaltbar,
  Widerspruch in derselben FAQ; für die Conversions API nach (v) nicht massgeblich.

**WAS DAMIT IN DIESER DATEI ÜBERHOLT IST UND AUSDRÜCKLICH NICHT ANGEFASST WURDE** (Auftrag:
ein Vermerk, im Abschnitt "Frist mit Termin" nur das Wort aus 0c): der Satz "Welche der
beiden für `/{PIXEL_ID}/events` gilt, ist **UNGEMESSEN**" dort — weiterhin richtig als
Aussage über die Messung, aber nicht mehr über die Doku · F6 im Abschnitt "Offene Fragen"
("AUF DOKU-EBENE NICHT ENTSCHIEDEN") · die Tabellenzeile meta in ZUSCHNITT-FRAGE P11.7-13
("welches gilt, ist ungemessen"). **Ob und wie sie nachgezogen werden, entscheidet der
Architekt.**

**EIN ZWEITES VORKOMMEN ZU 0c, NICHT ANGEFASST:** Der Absatz "AUFLAGE ZUR FRIST" im
Abschnitt "Zuschnitt der Phase 11.7" nennt dieselbe Entscheidung weiterhin
"OWNER-ENTSCHEIDUNG 2026-09-23". Der Auftrag galt allein dem Abschnitt "Frist mit Termin".

**KEINE ZIELVERSION IST GEWÄHLT UND KEINE EMPFOHLEN; KEINE AUSSAGE ZU VORGABEWERT GEGEN
UMGEBUNGSVARIABLE.** Die Kandidaten mit ihren Tatsachen stehen in (w) und (x).

### VERMERK P11.7-14 — Scheibe S3 gebaut und live bestätigt vom 2026-09-23 (Meta `v25.0`)

**HARTE ANGABEN:** 2026-09-23 · **BAU-COMMIT `9778aca`** (`chore(capi): Meta-Graph-Version
v21.0 -> v25.0 (11.7 S3)`) · zwei Dateien: `src/lib/capi/config.ts` (Vorgabewert `"v25.0"`,
Kommentar nach Vorrat P11.7-7) und `src/lib/capi/version-deadlines.test.ts` (Zeile meta
`v25.0` / `2028-07-29T00:00:00Z` / docs/ziel-befunde/meta.md, Teil (w), Tabelle 1; Grenze (3),
`meldung()`, T3-Marke "GILT LAUT TEIL (v)", Beispiel-Literal an V3) · die Tabellenzeile vor
dem Bau maschinell gegen die Quellzeile geprüft, mit Positivkontrolle (`v21.0` →
2027-01-21) und Gegenprobe (Tabelle 2: `v25.0` "TBD") · Nutzlast unverändert, keine
Kennung durchgeleitet, kein Adapter berührt · Tests **2108 / 97 vorher und nachher**
(GEMESSEN, CC) · Zielversion und Weg: OWNER-ENTSCHEIDUNG 2026-09-23 (Abschnitt "Zuschnitt",
S3; Doku-Commit `9365c7f`).

**BEWUSST UNVERÄNDERT:** Die zwölf Config-Mocks und `route.test.ts` tragen weiter `v21.0` —
sie prüfen ihren eigenen Wert; die einzige Erwartung an den Vorgabewert sind V1/V3.

**MUTATIONSPROBEN — ALLE ACHT WIE VORHERGESAGT**, je als voller Lauf über 97 Dateien, je
zurückgenommen und per sha256 gegen den Stand nach dem Bau belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | Vorgabewert `"v21.0"` | V1, V3 |
| m2 | Tabellenzeile version `"v21.0"` | V1, V3 |
| m3 | Uhr in T1 2028-05-30T00:00:00Z | T1, Meldungen meta und linkedin |
| m3b | Uhr 2028-05-29T23:59:59Z | T1, nur linkedin |
| m4 | Uhr 2026-11-22T00:00:00Z (alte Meta-Grenze) | nichts |
| m5 | Vorgabewert `"v26.0"` | V1, V3 — V2 und V3b grün |
| m6 | Meta-Zweig in `meldung()` abgeschaltet | NUR T3 |
| m6b | alter Meta-Text wörtlich wieder eingesetzt | NUR T3 |

Der Inhalt der Meldungen bei m3/m3b ist mit einem gezielten Zusatzlauf der Wächter-Datei
unter demselben Eingriff belegt — der JSON-Reporter kürzt das Array; das Muster trifft bei
m3 beide Zeilen und ist damit die Kontrolle für "nur linkedin" bei m3b. m6b setzt den alten
Text statt einer veränderten Marke ein (vor dem Lauf deklariert).

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-23):** `META_GRAPH_VERSION` ist in Vercel nie angelegt
worden (vor dem Deploy geprüft) · vorher letztes Server-Ereignis im Events Manager "Heute um
10:25:20" · nach dem Deploy Lead, eventID `372f8ffa-f6a1-4c05-a22d-1d993d5d67c4`, Browser
"Verarbeitet" 11:29:23, Server "Dedupliziert" 11:29:25 (lokale Anzeige, Zeitzone vermutlich
MESZ) · Regression S2: LinkedIn "Data last received" September 23, 2026 11:29 AM.
**DIE GRENZE:** Angekommen ist unter dem Vorgabewert `v25.0`; welche Version Meta tatsächlich
verarbeitet, bleibt Messfrage (docs/ziel-befunde/meta.md, Teil (y)).

**ZEIGER:** docs/ziel-befunde/meta.md, "MESSUNG 2026-09-23 — Ankunft unter v25.0 … der Teil
(aa)"; dazu ein datierter Vorbehalt an (w). **ABSCHLUSS IM SELBEN ZUG:** "Frist mit Termin"
gegenstandslos; Vorrat P11.7-7 geschlossen; F6, ZUSCHNITT-FRAGE P11.7-13 und P11.7-17
nachgezogen; die Beobachtung in VERMERK P11.7-12 aufgelöst; HEBUNGS-KANDIDAT P11.7-1 neu.

### VERMERK P11.7-15 — Aufklärung zu S4 vom 2026-09-23 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-23 · HEAD `a3a2973` · Arbeitsbaum sauber · READ-ONLY am eigenen
Code · Suchen mit `MSYS_NO_PATHCONV=1` (HEBUNGS-KANDIDAT P11.7-1) · die Ziel-Dateien nur
GEZIELT DURCHSUCHT, NICHT VOLL GELESEN. Kein Bau-Commit.

**PFLICHT-NACHWEIS SCHREIBPFADE (GEMESSEN am Repo):** Vom Ingest-Pfad aus (`/api/e` und
`/api/capi` teilen `handleIngest`; zwei `after()`-Aufgaben, `"persist"` und `"refresh-lead"`
in `ingest.ts`) wird an GENAU ZWEI Stellen dauerhaft geschrieben:
- `persistEvent` (`src/lib/analytics/persist.ts`, Insert in `events`) mit fünf Feldern —
  `project_id`, `event_type` (gekappt auf `EVENT_TYPE_MAX_LENGTH`), `event_id`, `source`,
  `variant`. `schedulePersist` reicht nur diese fünf Werte durch.
- das Token-Update in `project_secrets` (`src/lib/oauth/token-refresh.ts`: `secret: null`,
  `secret_enc`, `secret_version`), erreicht über `runRefresh`, dessen Signatur wie die von
  `refreshAccessToken` NUR `projectId` und `target` trägt.
**KEINE DER ZWEI ERREICHT ADRESSE, IP ODER USER-AGENT** — die Signaturen tragen sie nicht.
Keine Cookies (der Ingest liest das Varianten-Cookie, die Antwort trägt nur CORS-Kopfzeilen),
keine Dateien, kein Storage. Nach aussen gehen allein die fünf Adapter-`fetch` und der
Google-Token-Endpunkt — Übertragung, keine eigene Ablage. **POSITIVKONTROLLE:** die Suche
findet `persistEvent` und den `audit_logs`-Schreiber (`writeAuditLog`,
`src/lib/domains/audit.ts`); letzterer ist vom Ingest NICHT erreichbar (kein Modul unter
`capi`, `oauth`, `analytics` importiert `@/lib/domains/`). **supabase/ (am Repo):** Trigger
nur `set_updated_at` auf `projects`, `project_tokens`, `project_secrets`; keiner auf
`events`; die RPCs sind Lese-Funktionen.
**GRENZE:** die laufende Datenbank ist NICHT gemessen · `event_type` und `event_id` sind freie
Client-Strings — eine Klick-Kennung erreicht sie nur, wenn ein Client sie selbst dorthin
schreibt, nicht über einen Fluss aus der Adresse.

**LOG-ACHSE SEIT VERMERK P11.7-8 UNVERÄNDERT:** Seit `a763716` haben nur zwei Nicht-Test-Dateien
unter `src/` Änderungen (`config.ts`, `linkedin-forward.ts`); der Diff trägt KEINE
`console`-Zeile. POSITIVKONTROLLE: dasselbe Verfahren trifft vier geänderte Zeilen.

**ADRESSFLUSS JE ADAPTER:** meta `eventSourceUrl` → `event_source_url` · tiktok → `page.url` ·
pinterest → `event_source_url` · linkedin liest die Adresse NICHT · google sendet die Adresse
NICHT, nur `adIdentifiers` aus `extractGoogleClickIds(body.eventSourceUrl)`. Einzige Umformung
ist der Trim in `asString` (sechs Kopien, zeichengleich); ein Nicht-String ergibt `""` und das
Feld entfällt; geparst wird bei meta, tiktok und pinterest nicht. **KEIN BESTEHENDER TEST
FÄHRT FÜR META, TIKTOK ODER PINTEREST EINE ADRESSE MIT QUERY-STRING** (meta Happy-Path in
`route.test.ts` und tiktok T15 ohne Query-String, pinterest ohne Test auf dem Feld) — ein
Entfernen fremder Kennungen bliebe heute überall grün. google GF-1 prüft die ganze Nutzlast
mit `?gclid=` in der Fixture.

**RANDBEFUND:** `forwardToMeta` baut die Nutzlast VOR seinem `try` (die Adresse wird vor dem
`try` gelesen). **OB `ingest.ts` EINEN WURF DORT FÄNGT, IST NICHT ERHOBEN.**

**DAS VORBILD `extractGoogleClickIds`** (`src/lib/capi/google-click-ids.ts`): rein, ohne
`server-only`; `CLICK_ID_PARAMS` exakt kleingeschrieben und NICHT exportiert; erstes Vorkommen
bei Mehrfachparametern; relative oder kaputte Adresse und Nicht-String → `{}`, wirft nie; das
Fragment liest die Plattform-API nicht (GEMESSEN an `URL`, nicht an der Funktion; kein Test).

**PARAMETERNAMEN JE ZIEL — GESUCHT, NICHT VOLL GELESEN:** meta `fbclid` (meta.md, Teil (h)) ·
tiktok `ttclid` (tiktok.md, Teil (j)) · pinterest `epik` (pinterest.md, Teile (ac), (af)) ·
linkedin `li_fat_id` (linkedin.md, Teile (i), (an)) · google `gclid`/`gbraid`/`wbraid` nur als
Felder von `adIdentifiers` (google.md, Teile (m)/E1, (w)/E1), als URL-Parameter nicht belegt.
**ZUR SCHREIBUNG DES NAMENS TRÄGT KEINE DER FÜNF DATEIEN EINE QUELLE**; meta, Teil (h), nennt
den WERT schreibungsempfindlich, nicht den Namen.

**LADUNG (GEMESSEN):** meta.md 1 277 Zeilen / 95 697 Bytes · tiktok.md 622 / 44 451 ·
pinterest.md 1 103 / 79 722 · Kopf docs/ziel-befunde.md 220 / 14 399 — zusammen 234 269 Bytes.

**DER POSTEN "DIE PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST TOT" (docs/offene-punkte.md)
BLEIBT OFFEN:** Beide Achsen sind erhoben; sein Abschluss gehört zum Abschluss von S4.

**ZEIGER 2026-09-23 — DER TEXT DARÜBER BLEIBT, ER IST DER STAND VOR DEM BAU:** Der
Randbefund ist beantwortet (ein Wurf vor dem `try` bricht die 204 NICHT, GEMESSEN), und der
Posten ist geschlossen — beides VERMERK P11.7-16.

### VERMERK P11.7-16 — Scheibe S4 gebaut und live geprüft vom 2026-09-23 (fremde Klick-Kennungen)

**HARTE ANGABEN:** 2026-09-23 · **BAU-COMMIT `de88657`** (`fix(capi): fremde Klick-Kennungen
aus der weitergereichten Adresse entfernen (11.7 S4)`) · NEU `src/lib/capi/click-id-strip.ts`
(`CLICK_ID_TABLE`, `stripForeignClickIds`; sha256 am committeten Objekt
`3333d0ee6ba7cf8fb21b5d3ed2671fdf9e3d2afa04bf84ecc928d854d218ce63`) und
`src/lib/capi/click-id-strip.test.ts`
(`e9506541aa9e73d3d1cbbd198539481a28eb4b78e69fd87ad52a6ae774e3c1d9`) · GEÄNDERT
`meta-forward.ts`, `tiktok-forward.ts`, `pinterest-forward.ts` (Aufruf am Adressfeld; bei
pinterest dazu Vorrat P11.7-4 und der überholte Kopfabsatz "ER WIRD VON NIEMANDEM GERUFEN"),
`google-click-ids.ts` (`export` vor `CLICK_ID_PARAMS`, Vorrat P11.7-1) · Tests **2108 / 97 →
2131 / 98** (GEMESSEN, CC) · tsc, lint, build grün · **KEINE `console`-Zeile im Diff**
(GEMESSEN) · linkedin-forward.ts, google-forward.ts, ingest.ts und alle bestehenden
Testdateien unberührt.
**ARCHITEKTEN-ENTSCHEIDUNGEN DES STUFE-1-PLANS (2026-09-23), soweit sie über D1 bis D10
hinausgehen:** Tabelle und Wächter-Fälle als `Record<TrackingTarget, …>` — ein neues Ziel
kompiliert erst mit Zeile und Wächter-Fall · verglichen wird der Name, wie ihn ein
Standard-Parser liest (Tab/LF/CR entfernt, Formdekodierung, dann Kleinschreibung) · fällt das
letzte Segment, bleibt das "?" · eine Adresse nur aus Query-Teil ergibt "", und der Adapter
lässt das leere Feld weg wie bisher.

**DIE OFFENE FRAGE DES ZUSCHNITTS IST BEANTWORTET — GEMESSEN:** Alle fünf Adapter sind
`async function`; ein Wurf in ihrem Rumpf, auch VOR dem `try`, wird zur Ablehnung, die
`Promise.allSettled` fängt, und die Antwort bleibt die leere 204. Zwei Belege: eine
`node -e`-Probe mit Gegenprobe (ein SYNCHRONER Adapter lässt den Handler rejecten) und die
Mutation m6 (die Parse-Probe wirft weiter): **47 rote Fälle in den Ingest-Testdateien, KEINER
an Status oder Rumpf**, jeder an einem fehlenden Forward; in `ingest.persist.test.ts`, Fall
(d), mit ECHTEM Meta-Adapter, standen `status 204` und der leere Rumpf VOR der gescheiterten
Zeile und bestanden. Die echte Wurfzone sind die SYNCHRONEN Glieder davor (die Lambdas in
`FORWARDER_BY_TARGET`, `dispatchForward`, der map-Callback) — dort liegt der Aufruf nicht.
**DER BEFUND AUS m6, der die Vorhersage (zwei rote Fälle) verfehlte, STOPP und Klärung:** m6
machte 103 Fälle rot. Die HÄUFIGSTE Eingabe ist die LEERE Adresse, und `new URL("")` wirft;
die Zusage "wirft nie" ist für sie über rund hundert bestehende Tests mitbewacht. Der
Kommentar an V-a hält das fest.

**MUTATIONSPROBEN — ZEHN, ALLE WIE (m6: WIE NACHGEZOGEN) VORHERGESAGT**, je voller Lauf über
98 Dateien bzw. `tsc --noEmit`, je zurückgenommen und per sha256 gegen den Baustand belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | Aufruf nur in tiktok entfernt | W-tiktok ×2 |
| m2 | `tiktok.params: []` | T1, V-c4, V-c6, W-meta ×2, W-pinterest ×2 |
| m3 | Vergleich ohne `toLowerCase` | V-c4, W-meta/-pinterest/-tiktok "abweichend" |
| m4 | die eigene Kennung wird mitentfernt | V-b, V-c4, V-c6, W-meta/-pinterest/-tiktok ×2 |
| m5 | Entfernen über `searchParams.delete` und `href` | V-b, V-c1, V-c3 |
| m6 | die Parse-Probe wirft weiter | 103, zweimal identisch (s. oben) |
| m7 | nicht parsebar → Eingabe unverändert | V-d |
| m8 | der Query-Teil endet am Textende statt am "#" | V-c3, V-f |
| m9 | `linkedin` fehlt in `CLICK_ID_TABLE` | tsc TS2741 |
| m10 | `linkedin` fehlt im Record des Wächters | tsc TS2741 |

**DER PFLICHT-NACHWEIS AUS "Was den Zuschnitt bindet" IST VOLLSTÄNDIG:** Ablage VERMERK
P11.7-15 · Log VERMERK P11.7-8 (C1), seither unverändert (P11.7-15), der S4-Diff trägt keine
`console`-Zeile · **HASHEN, GEMESSEN (CC, 2026-09-23):** Achse
`createHash|subtle|digest|sha-?256|crypto|hash`, case-insensitiv, über `google-forward.ts`,
`google-payload.ts`, `google-click-ids.ts`: je 0; über die 94 verfolgten Produktivdateien
unter `src/` (ohne `.test.`) enthält KEINE einen Hasher-Aufruf
(`createHash|subtle\.digest|crypto\.subtle`). POSITIVKONTROLLE: dieselbe Achse trifft fünf
Testdateien und eine Probedatei ausserhalb des Repos. **GRENZE:** die laufende Datenbank ist
nicht gemessen (wie P11.7-15).

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-23, Zeiten MESZ):**
- VORHER: Meta letztes Server-Ereignis 11:29:25; LinkedIn "Data last received" September 23,
  2026 11:29 AM.
- R1, Seite ohne Query-Teil: eventID `6b7e8767-b56c-4929-9ee7-de4ac0db1a9b`, Meta Server
  "Dedupliziert" 16:01:12; LinkedIn 4:01 PM.
- S1, privates Fenster, Adresse
  `https://meta-test-5nlm3e.publayer.net/?utm_source=s4probe&fbclid=S4fbclid01&ttclid=S4ttclid01&epik=S4epik01&li_fat_id=S4lifat01&gclid=S4gclid01&gbraid=S4gbraid01&wbraid=S4wbraid01`:
  eventID `3858e1a6-822b-4bde-a26a-bd2d6a05f5db`, Meta Server "Dedupliziert" 16:06:12
  (Testmodus an, `test_event_code` `TEST79707`); LinkedIn 4:06 PM; im Netzwerk-Tab drei
  Beacons auf `/api/e`, je 204.
- DAMIT BELEGT: gesendet wird weiter, auch mit einer Adresse voller Kennungen. **DAS ENTFERNEN
  SELBST IST LIVE NICHT BELEGBAR:** die Test-Events-Ansicht zeigt die URL beider Ereignisse
  ohne Query-Teil (docs/ziel-befunde/meta.md, Teil (ab)). Der Beweis ist der Wächter W.
  UNGEKLÄRT: das Browser-Ereignis nennt trotz `fbclid` in der Adresse nur IP-Adresse und
  User Agent als Abgleich-Parameter (ebenda, Teil (ac)).

**DIE GRENZEN, BENANNT:** (D3) eine Kennung, die nicht in der Tabelle steht, reist weiter mit ·
(D6) eine Kennung im Fragment reist mit · (D5) eine nicht parsebare Adresse verliert alles ab
dem ersten "?" oder "#", auch die eigene Kennung · Cookie-Wege, `fbc` und eigene Felder sind
nicht Teil von S4 (D9).

**ABSCHLUSS IM SELBEN ZUG:** docs/ziel-befunde/meta.md, Teile (ab) und (ac) · der Posten "DIE
PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST TOT" in docs/offene-punkte.md gestrichen
mit Beleg, Stub in CLAUDE.md entfernt · die Pflicht-Angabe an (E3) ebenda richtiggestellt ·
Vorrat P11.7-1 und P11.7-4 geschlossen, Vorrat P11.7-8 neu · Entscheidung P11.7-3 und
ZUSCHNITT-FRAGEN P11.7-5, -9, -15, -24, -25 nachgezogen.

### VERMERK P11.7-17 — Aufklärung zu S5 vom 2026-09-23 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-23 · HEAD `b6cc518` · Arbeitsbaum sauber · READ-ONLY · **VOLLLADUNG**
von docs/ziel-befunde/meta.md (1 320 Zeilen) plus Kopf von docs/ziel-befunde.md (220 Zeilen) ·
keine fremde Seite, kein Aufruf gegen die Schnittstelle. Kein Bau-Commit.

**DAS FORMAT, docs/ziel-befunde/meta.md, Teil (h), im Wortlaut:** "The formatted ClickID value
must be of the form `version.subdomainIndex.creationTime.<fbclid>`"; `version` immer `fb` ·
subdomainIndex: "If you're generating this field on a server, and not saving an _fbc cookie,
use the value 1." · "`creationTime` is the UNIX time since epoch in milliseconds" · ohne Cookie:
"use the timestamp when you first observed or received this fbclid value" · "ClickID value is
case sensitive - do not apply any modifications before using, such as lower or upper case."
**FOLGERUNG, NICHT GELESEN:** Beim ersten Ereignis fällt "received" mit der Verarbeitung
zusammen (nur der Klick-Beacon trägt die Adresse); eine zweite Conversion desselben Klicks
bekäme ohne Ablage einen späteren Zeitstempel — das ist die Abweichung, die ZUSCHNITT-FRAGE
P11.7-2 meint.

**NICHT-TREFFER, REICHWEITE meta.md Teile (h) bis (ac), am geglätteten Volltext:** zur
Prozentkodierung des Werts nichts (`decod`, `encod`, `percent` je 0) · zu einem falsch
gebildeten `fbc` nichts (`malformed` 0; `invalid` 1, nur die Kombinationsregel in (m), ohne
`fbc`) · **keine Oberfläche, die ein empfangenes `fbc` anzeigt:** "Event Match Quality" steht
einmal, als Nutzenangabe in (l); (o) sagt, dass die Test-Events-Ansicht `external_ids` nicht
zeigt; (ac) sah kein `fbc`. Ungelesene Kandidaten: `dataset-quality-api.md` (am 2026-09-08 nur
auf `test_event_code` durchsucht), EMQ im Events Manager, `/payload-helper`.

**DIE TEXTLAGE ZUR DATENKLASSE, ohne Einordnung:** docs/offene-punkte.md, Eintrag
"DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Teil (E2): "`fbc` — GLEICH OB AUS DEM
KLICK-PARAMETER DER ADRESSE ODER AUS EINEM COOKIE GEBILDET" unter TRANSIT-ONLY; dazu die
Grenze "NIE EINE KENNUNG, DIE DIESES PRODUKT SELBST ERZEUGT ODER SETZT" — zur Mischform (unser
Präfix und Zeitanteil um Metas Kennung) sagt sie nichts ausdrücklich.

**AM CODE (GEMESSEN, HEAD `b6cc518`):**
- `user_data` entsteht in `forwardToMeta` VOR dem `try` (Vertragssatz 1: dort nur
  Wurffreies); Felder `client_ip_address`, `client_user_agent`, `fbp` (aus `asString(body._fbp)`,
  nur typeof/trim; Quelle das Cookie `_fbp` im Klick-Beacon, `src/lib/tracking/meta.ts`).
  **KEIN Test nagelt `user_data` als Ganzes fest** (`route.test.ts` Feld für Feld,
  `ingest.test-mode.test.ts` nur `toHaveProperty`).
- `fbclid` liest heute niemand; exakt liest allein `extractGoogleClickIds`, fest auf
  `CLICK_ID_PARAMS`. `click-id-strip.ts` vergleicht ohne Schreibung — für ein exaktes
  Herauslesen nicht tauglich (D4). `searchParams.get` liefert den Wert DEKODIERT.
- Zeit: `eventTime = Math.floor(Date.now() / 1000)` im Adapter, Sekunden; der Beacon trägt
  keinen Zeitstempel, der Ingest reicht keinen durch.
- Wächter W bleibt grün, wenn meta zusätzlich `fbc` sendet (der Wert ist sein eigener), und
  wird rot, wenn ein anderes Ziel den `fbclid`-Wert trägt; **er bewacht `fbc` nicht.**
- Log-Achse: keine der drei `console`-Zeilen gibt `user_data` oder die Nutzlast aus;
  `describeMetaError` loggt Metas `message` über `redactOpaque` (`[A-Za-z0-9_-]{20,}`) — spiegelte
  Meta `fbc` zurück, blieben der Zeitanteil und ein `fbclid` unter 20 Zeichen lesbar.
  Ungemessen, ob Meta spiegelt.

**WERKZEUGBEFUND:** `grep` meldete "Match Quality" 0-mal, weil der Ausdruck in (l) über einen
Zeilenumbruch läuft; über den geglätteten Text 1-mal. Die Nicht-Treffer oben sind am
geglätteten Text erhoben.

**ZEIGER 2026-09-23 — DER TEXT DARÜBER BLEIBT, ER IST DER STAND VOR DEM BAU:** "Keine
Oberfläche, die ein empfangenes `fbc` anzeigt" gilt nicht mehr — die Liste
"Benutzer-Datenschlüssel" am Server-Ereignis der Test-Events-Ansicht führt "Klick-ID", wenn
`fbc` gesendet wird (VERMERK P11.7-18; docs/ziel-befunde/meta.md, Teil (ad)).

### VERMERK P11.7-18 — Scheibe S5 gebaut und live bestätigt vom 2026-09-23 (Meta `fbc`)

**HARTE ANGABEN:** 2026-09-23 · **BAU-COMMIT `37e3e46`** (`feat(capi): Meta erhaelt fbc aus
dem fbclid der Seitenadresse (11.7 S5)`) · drei Dateien: `src/lib/capi/click-id-strip.ts`
(neu `extractFbclid`, exakt, wurffrei, ohne Formprüfung), `src/lib/capi/meta-forward.ts` (eine
Uhr-Lesung `now` für `event_time` in Sekunden und den Zeitanteil in Millisekunden;
`userData.fbc = "fb.1.<now>.<fbclid>"` nach der bereinigten Adresse, vor dem `try`;
Vertragssatz 1 nennt `extractFbclid`), `src/lib/capi/click-id-strip.test.ts` (zwölf neue
Fälle X-a bis X-h, M-a bis M-c, M-e) · Tests **2131 / 98 → 2143 / 98** (GEMESSEN, CC) · tsc,
lint, build grün · **KEINE `console`-Zeile im Diff** (GEMESSEN) · Entscheidungen des
Stufe-1-Plans (ARCHITEKT, 2026-09-23): Einsatz nach der bereinigten Adresse, rein additiv;
eine Uhr-Lesung; "exakt" heisst exakt auf dem vom Standard-Parser DEKODIERTEN Namen
(`fb%63lid` trifft, `FBCLID` nicht).

**MUTATIONSPROBEN — SECHS, ALLE WIE VORHERGESAGT**, je voller Lauf über 98 Dateien, je
zurückgenommen und per sha256 gegen den Baustand belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | fbc-Zeilen entfernt | M-a |
| m2 | `fb.0.` statt `fb.1.` | M-a |
| m3 | `eventTime` (Sekunden) statt `now` im Zeitanteil | M-a |
| m4 | Name ohne Schreibung verglichen | X-c, M-c |
| m5 | Wert kleingeschrieben | X-b, M-a |
| m7 | das `catch` in `extractFbclid` wirft weiter | **57, VOR dem Lauf am Bestand gezählt, je Datei getroffen** |

m7 je Datei: click-id-strip.test 3, meta-forward.test 8, version-deadlines 2, fan-out 10,
ingest.confirm 8, ingest.forwardable 9, ingest.persist 4, ingest.test-mode 5,
ingest.consent-targets 4, ingest.consent 2, ingest.timeout 2 — die Meta-Teilmenge der 103
Fälle aus Mutation m6 von S4 (VERMERK P11.7-16).
**m6 — "fbc aus der UNBEREINIGTEN Adresse" — IST ÄQUIVALENT UND ENTFALLEN:** Eine Einmal-Probe
ausserhalb des Repos (Stufe-1-Plan, Gate G1) ergab für `fbclid` aus roher und bereinigter
Adresse in 7 von 7 Fällen dasselbe; POSITIVKONTROLLE: mit Ziel `tiktok`, für das `fbclid` fremd
ist, sah dieselbe Probe den Unterschied. Grund: S4 entfernt nur FREMDE Namen, `fbclid` gehört
meta. F3 gilt durch den Einsatzpunkt — gelesen wird die Variable, die gesendet wird.

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-23, Zeiten MESZ, Meta-Testmodus an):**
- VORHER: letztes Server-Ereignis 16:06:12.
- R1, privates Fenster, ohne `fbclid`: eventID `de3c9dbb-acbe-4944-b753-73a45086d00b`,
  17:05:52 — Server "Benutzer-Datenschlüssel: IP-Adresse, User Agent".
- S1, NEUES privates Fenster, Adresse
  `https://meta-test-5nlm3e.publayer.net/?utm_source=s5probe&fbclid=IwZXh0bgNhZW0CMTEAAR2S5liveTestFbclid0123456789abcdefghijklm`:
  eventID `d8f3e8bf-8793-4c18-8602-06ad68b8f8fb`, 17:07:21 — Browser "Verarbeitet",
  "Parameter für den erweiterten Abgleich: IP-Adresse, User Agent"; Server "Dedupliziert",
  "Benutzer-Datenschlüssel: Klick-ID, IP-Adresse, User Agent". URL in beiden:
  `https://meta-test-5nlm3e.publayer.net/`.
**ERGEBNIS: `fbc` IST LIVE BELEGT** — die Klick-ID erscheint genau mit `fbclid` (S1), nicht
ohne (R1). **DIE GRENZE:** Belegt sind Annahme und Erkennung als Klick-ID, NICHT ein Abgleich
mit einem Anzeigenklick — der Wert ist erfunden.

**ZEIGER / ABSCHLUSS IM SELBEN ZUG:** docs/ziel-befunde/meta.md, Teil (ad), dazu ein datierter
Zeiger an (ac) · VERMERK P11.7-17 mit Zeiger · ZUSCHNITT-FRAGEN P11.7-1, -2, -5, -20
nachgezogen · S5 ABGESCHLOSSEN.

### VERMERK P11.7-19 — Aufklärung zu S6 vom 2026-09-23 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-23 · HEAD `d86dd0f` · Arbeitsbaum sauber · READ-ONLY · **VOLLLADUNG**
von docs/ziel-befunde/linkedin.md (1 997 Zeilen / 148 308 Bytes) plus docs/ziel-befunde.md (220 /
14 399, die ganze Datei ist Kopf) · keine fremde Seite, kein Aufruf gegen die Schnittstelle.
Nicht-Treffer am geglätteten Text (Zeilenumbrüche entfernt). Kein Bau-Commit.

**DAS FORMAT, docs/ziel-befunde/linkedin.md:**
- idType **`LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID`** (Teile (i), (aj), (ao)); S11: "also known as
  li_fat_id" (Teil (an)). Wert laut S4 `string` **ohne Auflage**, kein Hashen (Teile (an), (ao));
  nur BEISPIELWERTE `df5gf5-gh6t7-ph4j7h-fgf6n1` (S3), `ufh8h5-gh6t7-ph4j7h-mkl86n1` (S10).
- **NEBEN DER IP IN DERSELBEN LISTE LAUT DOKU ZULÄSSIG**, S3-Beispiel mit vier Einträgen; **KEINE
  OBERGRENZE** genannt (Teil (aq)).
- **ALLEIN ZULÄSSIG LAUT DOKU** — S11 "at least one of the following", S4 "Input Data Validation"
  inhaltsgleich (Teil (ao)). **UNGEMESSEN:** das Symbol ist nie gesendet worden (Teile (i), (aq)).
- 202609 gegen 202601: nichts Abweichendes dokumentiert — kein Eintrag in Teil (aw) (M3,
  202602–202609; `idType` 0), `userIds`-Symbole ohne Versionsangabe; Grenze Teil (av).
- **HERKUNFT, ADRESSWEG OHNE INSIGHT TAG** (Teil (an), S8): "not required to actually install
  Insight Tag code"; Beispiel `new URLSearchParams(window.location.search).get("li_fat_id")`;
  "View-though conversion attribution may be limited". Der Cookie-Weg verlangt das Tag.

**NICHT-TREFFER, REICHWEITE die ganze Datei, geglättet:** zu Schreibung und Kodierung nichts
(`decod` 1 = Cookie-Beispiel, `encod` 2 und `percent` 1 sachfremd) · zur Fehlform nichts
(`malformed` 0; `invalid` 11, keiner zu diesem Symbol) · **keine Oberfläche, die zeigt, WELCHE
Kennungstypen ein Ereignis trug** (`Klick-ID` 0, `Event Match` 0, `Kennungstyp` 0); H1 nennt je
REGEL "Match rate percentage · Number of matching parameters", ohne Aufschlüsselung (Teil (ab)).
POSITIVKONTROLLE: `li_fat_id` 13, `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` 11, `Data last
received` 3, `Empfangsanzeige` 8, `match rate` 5. Ungelesen und nächstliegend: Hilfe-Artikel
a476761.

**DIE TEXTLAGE ZUR DATENKLASSE, ohne Einordnung:** (E2) nennt ausdrücklich nur `fbc` und "`fbp`
UND GLEICHARTIGE KENNUNGEN, DIE DAS TAG DES ANBIETERS SETZT". `li_fat_id` trägt allein der Block
vom 2026-08-28 ("künftige Klick-Kennungen anderer Anbieter (Meta, TikTok und weitere)",
Herkunftskriterium "ANBIETERÜBERGREIFEND") und (E3).

**AM CODE (GEMESSEN, HEAD `d86dd0f`):**
- (a) `user.userIds` entsteht im Literal `payload` INNERHALB des `try`, nach den Riegeln 1 (keine
  IP), 2 (kein IPv4) und 3 (keine URN) (`forwardToLinkedin`). `body.eventSourceUrl` ist zur
  LAUFZEIT erreichbar — `FORWARDER_BY_TARGET.linkedin` (`ingest.ts`) reicht das ganze
  `CapiRequestBody` —, im TYP `LinkedinForwardBody` (`value`, `currency`) nicht.
- (b) **RICHTIGSTELLUNG ZU VERMERK P11.7-8, C10:** T1-a (`linkedin-forward.test.ts`) nagelt die
  ganze Nutzlast per `toEqual` fest, fährt aber `body = {}` OHNE Adresse — ein Eintrag aus der
  Adresse macht ihn **NICHT** rot. Kein anderer Test prüft `userIds`. Wächter W
  (`click-id-strip.test.ts`) erwartet für linkedin `eigeneGeht: false` und wird im Lauf
  "tabelle" am Namen `li_fat_id` rot, im Lauf "abweichend" nur bei einem Herauslesen ohne
  Schreibung.
- (c) Kandidaten für das Herauslesen: eine neue Funktion nach `extractFbclid` · ein
  verallgemeinerter Kern · `extractGoogleClickIds` erweitern (Google-förmiger Rückgabetyp;
  `CLICK_ID_PARAMS` speist `CLICK_ID_TABLE.google`).
- (d) Grund der Riegel: Riegel 1 "Ohne Kennungs-Wert bliebe das Pflicht-Paar leer" (Teil (a));
  Riegel 2 "die Schnittstelle prueft die Form nicht" (Teile (i), (j)). Logtexte "missing
  identity", "identity is not IPv4".
- (e) Fünf `console.error`-Zeilen im Adapter, vier fester Text bzw. `errorName`; die fünfte
  (`describeLinkedinError`) loggt den Fremdtext des Anbieters über `redactOpaque` (ab 20 Zeichen
  aus `[A-Za-z0-9_-]`). 422-Meldungen spiegeln den beanstandeten Wert zurück (GEMESSEN, Teile
  (i), (o)); für ein `idValue` ungemessen. Die vier `console`-Zeilen in `ingest.ts` loggen Label
  und `errorName`.

**NEBENBEFUND:** `linkedin-forward.ts` trägt denselben Vertragssatz "-> 500" wie die drei Adapter
in Vorrat P11.7-8 und ist ebenfalls `async` — dort als vierter aufgenommen.

### VERMERK P11.7-20 — Scheibe S6a gebaut und live bestätigt vom 2026-09-23 (LinkedIn `li_fat_id` als zweiter Eintrag)

**HARTE ANGABEN:** 2026-09-23 · **BAU-COMMIT `09476b9`** (`feat(capi): LinkedIn erhaelt li_fat_id
als zweiten userIds-Eintrag (11.7 S6a)`) · vier Dateien: `src/lib/capi/click-id-strip.ts`
(modulprivater Kern `readClickIdExact`, `extractFbclid` delegiert — Vertrag unverändert —, neu
`extractLiFatId`; Kopfsatz nach Freigabe F-b), `src/lib/capi/linkedin-forward.ts` (zweiter
`userIds`-Eintrag nach Riegel 3 im `try`, IP an Index 0; `LinkedinForwardBody` um
`eventSourceUrl`; Zusatzsatz am Kommentar von Riegel 1 nach Freigabe F-a; Riegel-Code, Logtexte
und Vertragssatz 1 unverändert), `src/lib/capi/click-id-strip.test.ts` (L-a bis L-h; W je Lauf
über `eigeneGehtAbweichend`, nur der Fall linkedin geändert), `src/lib/capi/linkedin-forward.test.ts`
(T6-a bis T6-h; T1-a Zeichen für Zeichen unverändert) · Tests **2143 / 98 → 2159 / 98**
(GEMESSEN, CC) · tsc, lint, build grün · **KEINE `console`-Zeile im Diff** (GEMESSEN) ·
`meta-forward.ts`, `ingest.ts`, `google-click-ids.ts` unberührt.

**MUTATIONSPROBEN — ACHT, ALLE WIE VORHERGESAGT**, die Vorhersage je Datei VOR dem Lauf gegen
den gebauten Bestand angesagt; je voller Lauf über 98 Dateien, je zurückgenommen und per sha256
gegen den Baustand belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | zweiter Eintrag entfernt | 4 — T6-a, T6-d, T6-e, W-linkedin/tabelle |
| m2 | idType `…_TRACKING_ID` | 3 — T6-a, T6-d, T6-e |
| m3 | Kern vergleicht den Namen ohne Schreibung | 5 — X-c, M-c, L-c, W-linkedin/abweichend, T6-c |
| m4 | Wert im Adapter kleingeschrieben | 4 — T6-a, T6-d, T6-e, W-linkedin/tabelle |
| m5 | Reihenfolge vertauscht | 1 — NUR T6-a |
| m6 | `catch` im Kern wirft weiter | **60**, je Datei wie angesagt: click-id-strip.test 5, meta-forward 8, version-deadlines 2, fan-out 10, ingest.confirm 8, ingest.forwardable 9, ingest.persist 4, ingest.test-mode 5, ingest.consent-targets 4, ingest.consent 2, ingest.timeout 2, linkedin-forward 1 |
| m7a | Riegel 2 als Filter | 1 — NUR T6-g (T2-b grün: ohne Adresse) |
| m7b | Riegel 1 als Filter | 1 — NUR T6-h (T2-a grün: ohne Adresse) |

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-23, Zeiten MESZ):**
- VORHER: "Data last received" September 23, 2026 5:07 PM.
- R1, privates Fenster, ohne `li_fat_id`: Anzeige 6:15 PM.
- S1, neues privates Fenster, Adresse
  `https://meta-test-5nlm3e.publayer.net/?utm_source=s6aprobe&li_fat_id=k7s6a2-lf4t7-pq8m3x-lvt6a1`:
  Anzeige springt auf 6:17 PM; Vercel-Log um 18:17: Anfrage an `/api/e` verarbeitet, KEINE Zeile
  "[capi] LinkedIn forward rejected".
**ERGEBNIS: LINKEDIN NIMMT `userIds` MIT IP (INDEX 0) UND `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID`
(INDEX 1) AN.** Der Beleg ist der Sprung der Anzeige ZUSAMMEN mit dem Fehlen der rejected-Zeile —
eine Ablehnung käme als 422 mit genau einer Logzeile (docs/ziel-befunde/linkedin.md, Teil (i)).
**DIE GRENZEN:** kein Abgleich belegbar (der Wert ist erfunden) · Minutenauflösung · **`li_fat_id`
ALLEIN IST WEITER UNGEMESSEN.**

**ZEIGER / ABSCHLUSS IM SELBEN ZUG:** docs/ziel-befunde/linkedin.md, Teil (bd), dazu datierte
Zeiger an (i), (an) und (aq) · ZUSCHNITT-FRAGEN P11.7-14 und P11.7-16, F1 und "WAS EIN CRAWL FÜR
LINKEDIN NICHT KLÄRT" nachgezogen · S6a ABGESCHLOSSEN.

### VERMERK P11.7-21 — Messung zum AAAA-Befund vom 2026-09-24 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-24 · HEAD `dea8487` · Arbeitsbaum sauber · READ-ONLY · Instrument
`nslookup` (Windows), je `-type=AAAA` und `-type=A`, gegen drei Resolver: den Router-Resolver
der Maschine (`fe80::7ac5:7dff:fec6:3720`), `1.1.1.1`, `8.8.8.8`. Anlass: der Stufe-1-Plan von
S6b. Kein Bau-Commit.

**A1 — DIE LABEL-HOSTS (GEMESSEN):** `meta-test-5nlm3e.publayer.net`, `publayer.net` und der
Zufallshost `zz-s6b-probe-1833414406.publayer.net` (Wildcard-Probe) — in allen NEUN
AAAA-Abfragen KEIN AAAA-Eintrag; die A-Abfragen liefern je zwei Adressen aus `216.198.79.1`,
`216.198.79.65`, `64.29.17.1`, `64.29.17.65`. Die Resolver widersprechen sich nicht.
**A2 — POSITIVKONTROLLE:** `google.com` liefert über alle drei Resolver AAAA-Einträge (je vier
Adressen unter `2a00:1450:4025:`).
**A3 — DREI INGEST-WEGE (GEMESSEN am Code):**
- GEHOSTETE Seiten relativ an ihre Serving-Domain: Klick-Beacon und Bestätigung
  (`buildCapiBeaconStatement`, `buildPixelConfirmStatement` in `src/lib/tracking/meta.ts`)
  bekommen aus `handlePublish` (`src/components/CodeImporter.tsx`) den Pfad `"/api/e"`; der
  PageView sendet fest an `'/api/e'` (`buildPageViewScript`,
  `src/lib/analytics/pageview-emitter.ts`).
- EXPORTIERTE Seiten absolut an `NEXT_PUBLIC_APP_URL` (`buildExportDocument` →
  `getCapiProxyUrl`, `src/lib/capi/proxy.ts`).
- ALTE Exporte an den Alias `/api/capi` (absolut eingebacken; docs/immer-beachten.md,
  "PERMANENTER Alias /api/capi darf NIE entfernt werden").
**GRENZEN:** Der Produktionswert von `NEXT_PUBLIC_APP_URL` ist am Repo nicht feststellbar
(`.env.local` trägt `http://localhost:3000`); der Kandidat `pagesmith-delta.vercel.app` hat über
alle drei Resolver keinen AAAA-Eintrag, ist als Produktionswert aber NICHT belegt.
Kunden-Domains sind NICHT gemessen. Gemessen per DNS, nicht an einem echten Besuch.

**ZEIGER:** docs/plattform-befunde.md, Abschnitt "Vercel (Hosting · Ausspielung · Deploy ·
zeitgesteuerte Auslöser)", Teil (h) — eingeschränkt auf gehostete Seiten auf Label-Hosts
(OWNER-ENTSCHEIDUNG 2026-09-24, Weg (b)). **IM SELBEN ZUG:** die Owner-Entscheidung zum Bau von
S6b und B7 ersetzt (Abschnitt "Zuschnitt der Phase 11.7", S6b); ein Zeiger an ZUSCHNITT-FRAGE
P11.7-16 nachgezogen.

### VERMERK P11.7-22 — Scheibe S6b gebaut und abgeschlossen vom 2026-09-24 (LinkedIn `li_fat_id` auch ohne verwendbare IPv4)

**HARTE ANGABEN:** 2026-09-24 · **BAU-COMMIT `007a772`** (`feat(capi): LinkedIn sendet li_fat_id
auch ohne verwendbare IPv4 (11.7 S6b)`) · zwei Dateien: `src/lib/capi/linkedin-forward.ts`
(`extractLiFatId` an den Anfang des `try`, `ipv4` einmal berechnet, Riegel 1 und 2 mit
`&& !liFatId`, `userIds` aus zwei bedingten Einträgen; Logtexte, Riegel 3 und Vertragssatz 1
unverändert) und `src/lib/capi/linkedin-forward.test.ts` (T6-g, T6-h umgeschrieben; neu T7-a bis
T7-e) · Tests **2159 / 98 → 2164 / 98** (GEMESSEN, CC) · tsc, lint (0 Fehler; eine bestehende
Warnung ausserhalb, `consent.test.ts`), build grün · **KEINE `console`-Zeile im Diff** (GEMESSEN).

**MUTATIONSPROBEN — SECHS, ALLE WIE VORHERGESAGT**, die Vorhersage je Datei VOR dem Lauf am
gebauten Bestand nachgezogen; je voller Lauf über 98 Dateien:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | Riegel 2 ohne `&& !liFatId` | 1 — T6-g |
| m2 | Riegel 1 ohne `&& !liFatId` | 2 — T6-h, T7-e |
| m3 | IP-Eintrag bei `clientIp` statt bei `ipv4` | 1 — T6-g |
| m4 | Logzeile im Zweig IPv6 + `li_fat_id` | 1 — T6-g |
| m5 | Klick-Eintrag entfällt bei IPv6 | 1 — T6-g |
| m6 | nach Riegel 3 `if (ipv4 && !liFatId) return;` ohne Log | **26** — linkedin-forward.test 24, version-deadlines 1 (V4), click-id-strip 1 (W-linkedin/abweichend), fan-out 0 |

**ZWEI RÜCKNAHME-PANNEN, BEHOBEN:** Bei m4 und bei m6 hat das ZURÜCKNEHMEN je eine Leerzeile
mitgenommen; der sha256-Vergleich gegen den Baustand hat beide gefunden, die Leerzeile ist
wiederhergestellt und der Baustand per sha256 belegt. Die Einfügungen der Mutationen waren
reine Zeilen-Zusätze; der Stand WÄHREND der Läufe ist nicht eigens per Hash belegt.

**ERGEBNISSE (OWNER-ANGABEN, 2026-09-24, lokale Zeit):**
- TERMINAL 1: `curl` direkt an die Schnittstelle, `userIds` NUR mit `li_fat_id`, echte Regel-URN,
  `LinkedIn-Version` 202609 → **HTTP 201**. Davor ein Versuch mit dem wörtlichen Platzhalter
  statt der URN → 422 "Invalid Urn format. Invalid prefix."
- TERMINAL 2: die Form von S6a (`PLAINTEXT_IP_ADDRESS` `203.0.113.9` an Index 0, `li_fat_id` an
  Index 1) → **HTTP 201**.
- LIVE-REGRESSION ~08:21 (IPv4 + `li_fat_id`): `/api/e` 204; KEINE Vercel-Zeile zu "LinkedIn
  forward"; jede Anfrage loggt "[capi/resolve] secret unusable { target: 'google', reason:
  'refresh_token_expired' }".
- Beacon-Rumpf eines erneuten Klicks (Netzwerk-Tab): `cns` = {meta, pinterest, tiktok, linkedin,
  google} je `true`; `event` "Lead"; `eventSourceUrl` gesetzt. Zweiter Beacon: `obs`
  "__ps_browser" (Pixel-Bestätigung).
- LinkedIn-Karte in der App: Kennung, Regel und Zugangsdatum gesetzt.
- LinkedIn "Data last received" September 23, 2026 6:27 PM — unverändert nach dem Klick UND
  nach beiden Terminal-Aufrufen (Neuladen); Signal health "11 events · Attributed to 0
  campaigns · Last seen 15h ago". Am 2026-09-23 reagierte die Anzeige binnen Minuten.
- Meta: Übersicht "Zuletzt erhalten: vor 14 Stunden", obwohl das Pixel um 08:21 mit 200
  antwortete; MIT Test-Code ein Server-Ereignis "Dedupliziert" unter "Events testen".

**DIE AUFKLÄRUNG DIESES TAGES (GEMESSEN am Code, HEAD `007a772`, READ-ONLY):**
- STILLE AUSGÄNGE VOR DEM ADAPTER (`handleIngest`, `src/lib/capi/ingest.ts`, sofern nicht
  anders genannt): unbekannter trackingKey (`getCapiConfigByTrackingKey` gibt null) · Kill-Switch
  (`resolution.blocked`) · Bestätigungs-Beacon (`isBrowserConfirm`, früher Ausgang) · linkedin
  ohne Kennung bzw. Regel (`withPixel` in `getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`)
  · keine Geheimnis-Zeile oder Lesefehler (ebenda) · Ereignis nicht forwardbar (`isForwardable`)
  · Einwilligung: `cns` fehlt → allein meta (`allowedTargets` über `LEGACY_CONSENT_ROLE`,
  linkedin `false`), `cns.linkedin` nicht `true` (`consentAllows`,
  `src/lib/tracking/consent-wire.ts`) · kein Empfänger übrig. **ALLE STILL.** GELOGGT wird
  allein ein unbrauchbares Geheimnis (`usableTokenFromRow`: "[capi/resolve] secret unusable").
  Die Auflösung läuft JE ZIEL; ein totes Google-Geheimnis nimmt nur google heraus.
- AUSGÄNGE IM ADAPTER (`forwardToLinkedin`): Riegel 1, 2, 3 · kein `res.ok` →
  `describeLinkedinError` · Wurf oder Zeitlimit → "LinkedIn forward error" — **alle geloggt.
  EINZIGER STILLER AUSGANG: jede 2xx-Antwort.** `fetch` setzt keine `redirect`-Option, folgt
  also einer Weiterleitung.
- S6b IM FALL IPv4 + `li_fat_id`: dieselbe Nutzlast wie S6a — [IP, Klick], Kopfzeilen und
  `fetch` unverändert; T6-a ist seit `09476b9` zeichengleich und grün. Unter `src/` hat sich
  zwischen `09476b9` und `007a772` allein S6b geändert.
- DIE KANDIDATEN FÜR EIN ERFOLGS-INSTRUMENT, KEINE AUSWAHL: **K1** eine Statuszeile im Erfolg,
  allein Ziel und HTTP-Status (belegt die 2xx; eine Zeile je Conversion; Logs auf Hobby eine
  Stunde) · **K1b** dieselbe befristet über eine Umgebungsvariable (ein unbeobachteter Schalter,
  dasselbe Muster wie der offene Punkt zum deployment-weiten Testmodus-Hebel) · **K2** die
  Statuszeile nur bei aktivem Testmodus des Projekts (das linkedin-Lambda nähme den Testzustand
  an; berührt "SICHTBARKEIT STATT ISOLATION") · **K3** ein lokaler Lauf des echten Adapters gegen
  die Schnittstelle, der den Status mitschreibt (eine neue Datei, Owner-Entscheidung; lokale
  Verwahrung des Zugangsdatums; ein Ereignis in der Produktion) · **K4** das Ergebnis je Ziel
  ablegen (Migration; berührt "TRACKING-source = BEOBACHTUNGS-ORT" und die Einordnung eines
  gescheiterten Forwards als VORKOMMNIS).

**ERGEBNIS, JE MIT GRENZE:**
(a) **`li_fat_id` ALLEIN WIRD ANGENOMMEN** — gemessen per Terminal (201; docs/ziel-befunde/
    linkedin.md, Teil (be)). GRENZE: das misst den ANBIETER, nicht unseren Code-Pfad; unser Pfad
    ist durch T6-g, T6-h und die Mutationen belegt. Der Wert war erfunden — kein Abgleich belegt.
(b) **UNSER PFAD BIS ZUR ERFOLGSANTWORT IST DURCH AUSSCHLUSS BELEGT:** jeder stille Ausgang vor
    dem Adapter ist einzeln ausgeschlossen — `cns.linkedin` `true` im Beacon · Karte vollständig
    · keine secret-unusable-Zeile für linkedin · das Zugangsdatum trägt (Terminal 201) —, und
    jeder Ausgang im Adapter ausser 2xx loggt. GRENZE: **NICHT DIREKT BEOBACHTET.**
(c) **DIE LINKEDIN-ANZEIGE ZÄHLTE SEIT 2026-09-23 18:27 NICHTS MEHR**, auch zwei direkt mit 201
    angenommene Aufrufe nicht. **EIN RÜCKBAU-TEST WURDE DESHALB BEWUSST NICHT GEFAHREN** (OWNER):
    er hätte dasselbe blinde Instrument benutzt. GRENZE: Nachablesung am 2026-09-25 ausstehend —
    laut Anbieter bis zu 24 Stunden Verarbeitung (linkedin.md, Teil (ag)).
(d) **BEFUND OHNE BEWERTUNG:** Das Google-Geheimnis des Testprojekts ist
    `refresh_token_expired`.

**ZEIGER / ABSCHLUSS IM SELBEN ZUG:** docs/ziel-befunde/linkedin.md, Teil (be), dazu datierte
Zeiger an (t), (aq) und (bd) · docs/ziel-befunde/meta.md, Teil (ae) · ZUSCHNITT-FRAGE P11.7-16
eingelöst · Vorrat P11.7-9 neu · S6b ABGESCHLOSSEN, damit S6.

### VERMERK P11.7-23 — Aufklärung zu S7 vom 2026-09-24 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-24 · HEAD `0a5bbf5` · Arbeitsbaum sauber · READ-ONLY · **VOLLLADUNG**
von Anfang bis Ende: docs/aktiver-stand.md (2 034 Zeilen / 144 340 Bytes),
docs/ziel-befunde/google.md (5 756 / 408 302) und docs/ziel-befunde.md (220 / 14 399, die ganze
Datei ist Kopf) · keine fremde Seite, kein Aufruf gegen die Schnittstelle · Nicht-Treffer am
geglätteten Text mit Positivkontrolle. Kein Bau-Commit.

**DIE MESSUNG ZU ZUSCHNITT-FRAGE P11.7-8 (OWNER, `/context`, 2026-09-24):** nach der Volladung
und der vollständigen Aufklärung **587,4k von 1M Token (59 %)** — Messages 471,3k, Memory files
84,2k, frei 379,6k; Modell mit 1M Kontext. **DIE GRENZE:** gemessen ist EIN Modell mit 1M
Kontext. Für ein Fenster von rund 200k trägt es nicht — allein die Messages übersteigen es
(ABLEITUNG aus den Zahlen, nicht gemessen). Was Zuschnitt, Stufe-1-Plan und Bau zusätzlich
belegen, ist nicht Teil dieser Messung.

**(a) DER ABGELAUFENE SCHLÜSSEL (GEMESSEN am Code):** `refresh_token_expired` entsteht OHNE
Netzruf, als Vergleich mit der eigenen Uhr — in `usableTokenFromRow` (`src/lib/capi/token.ts`:
Uhr 1 tot und Uhr 2 `{kind:"at"}` mit `epochSeconds <= now`; Logzeile "[capi/resolve] secret
unusable", Ausgang `unusable`) und in `refreshAccessToken`, Schritt (6)
(`src/lib/oauth/token-refresh.ts`, Ausgang `dead`). Uhr 2 ist `receivedAt +
floor(refresh_token_expires_in)` aus der Token-Antwort (`google-token.ts` beim Code-Tausch,
`toRefreshedPayload` in `google-refresh.ts` bei der Erneuerung). `invalid_grant` ist ein
eigener Grund. **QUELLE:** docs/ziel-befunde/google.md, Teil (ae): "Testing" → 7 Tage
(GELESEN); Teil (bw): 581553 s, rund 6,73 Tage, und die Uhr läuft bei der Einlösung weiter
(GEMESSEN; die Tage sind eine Rechnung); ob das Feld am Status "Testing" hängt, ist offen
(Teil (bx)). **WARUM ÜBER NACHT, IST AM REPO NICHT ENTSCHEIDBAR:** Ein Neu-Verbinden verschiebt
die Frist um sieben Tage (docs/offene-punkte.md, "DIE SIEBEN-TAGE-FRIST …"); der Zeitpunkt der
letzten Verbindung ist nicht erhoben. Instrument: der Ablaufzeitpunkt auf der Karte, s. (b).

**(b) WAS DER BETREIBER SIEHT — DIE KARTE, SONST NICHTS (GEMESSEN am Code):**
`describeCredentialState` (`src/components/TargetCard.tsx`) zeigt "Zugang abgelaufen am … —
bitte neu autorisieren", 48 h vorher "Zugang endet am …" (`CREDENTIAL_EXPIRY_WARN_SECONDS` =
172 800, `credentialStateFrom` in `src/lib/tracking/credential-state.ts`); geladen über
`listTargetCredentialStates` beim Projektladen, gezeigt in der Mess-Ansicht. Kein Signal
ausserhalb der Karte, keine Benachrichtigung. Ob der Posten "STIRBT DAS ERNEUERUNGS-TOKEN, IST
DER AUSFALL FÜR NIEMANDEN SICHTBAR" dadurch teils überholt ist, ist NICHT geprüft.

**(c) "no destination for event" IST RIEGEL 2** in `forwardToGoogle` (`resolveDestinationId`,
exakter Schlüssel = Ereignisname): Für dieses Ereignis fehlt die Zuordnung zur
Conversion-Type-ID (numerisch, google.md, Teil (ca)/(b)). **KONFIGURATION, KEIN CODE.** Solange
das Geheimnis `unusable` ist, erreicht kein Ereignis diesen Riegel.

**(d) GERÄTEDATEN — GELESEN, NICHTS GESENDET ODER GEMESSEN:** zwei Orte,
`adIdentifiers.landingPageDeviceInfo` und `eventDeviceInfo`, je `ipAddress`/`userAgent` (Teil
(m)/E1); DeviceInfo trägt dazu `category` und `language_code` (Teil (w)/E1); zwei Momente, im
Session-Attribut-Weg ist `landingPageDeviceInfo.userAgent` Pflicht (Teil (m)/E4); die IP reist
ungehasht (Teil (m)/E2) und zählt als hinreichende Kennung (Teil (m)/E3); beide IP-Felder
stehen in der Kennungsliste der Offline-Gestalt (Teil (cc)/(c)); Widerspruch 1 ist ungelöst,
die Diagnose kennt `eventDeviceInfo` nicht (Teile (r), (u)). Was Google mit den Werten tut:
Nicht-Treffer über die ganze Datei. AM CODE: `Forwarder` trägt `clientIp` und `userAgent`, das
Lambda `FORWARDER_BY_TARGET.google` lässt beide fallen.

**(e) DMA — GELESEN:** `Consent` mit `adUserData` und `adPersonalization`, beide Optional,
Werte `CONSENT_STATUS_UNSPECIFIED` / `CONSENT_GRANTED` / `CONSENT_DENIED` (Teil (x)/I2); auf
Anfrage- oder Ereignis-Ebene (Teile (l)/D1, (q)/I2); Verarbeitungsfehler `DENIED_CONSENT`,
`NO_CONSENT`, `UNKNOWN_CONSENT` — letzterer nennt Zeilen-, Anfrage- und Konto-Einstellungen
(Teil (x)/I2). **EWR: NICHT-TREFFER** (`EEA`, `EWR`, `Europe` je 0; Positivkontrolle `consent`
58).

**(f) DAS EINWILLIGUNGS-BIT — GEMESSEN am Code:** Der Adapter läuft nur bei `cns.google ===
true` (`allowedTargets`, `consentAllows`; `LEGACY_CONSENT_ROLE.google` ist false). Mehr liegt
nicht vor: eine Gruppe "Werbung" für alle Ziele (`CONSENT_GROUP_KEYS.ads`), und `true` heisst
entweder "zugestimmt" oder "kein Hook" (`buildConsentAllRuntime`: `v === undefined` → alle
erlaubt). **DER SERVER TRENNT DIE ZWEI NICHT.**

**(g) TESTBESTAND:** GF-1 (`google-forward.test.ts`, `toEqual` auf die ganze Nutzlast) wird rot
bei jedem Feld, das seine Eingabe setzt; seine Fixture trägt weder IP noch UA noch `cns`, und
der Adapter wird mit vier Argumenten gerufen. `google-payload.test.ts` pinnt die
Wurzel-Schlüssel (`destinations`, `events`), die Ereignis-Schlüssel und `adIdentifiers` =
[`gclid`]. Wächter W (`click-id-strip.test.ts`) ruft mit vier Argumenten. `fan-out.test.ts`
nagelt die Google-Nutzlast nicht fest. IP und UA fährt für google KEIN Test; `cns` fährt
`ingest.refresh.test.ts`.

**(h) DREI RANDBEFUNDE:** (1) der Zeiger "(af)" auf die Sieben-Tage-Frist — sie steht in Teil
(ae) — in google.md, Teil (bw), in den Posten "DIE SIEBEN-TAGE-FRIST …" und "STIRBT DAS
ERNEUERUNGS-TOKEN …" · (2) die Kommentare an `forwardToGoogle` und am Lambda begründen den
Verzicht auf IP und UA mit "die Gestalt trägt KEIN Feld für eine Besucher-Adresse" — widerlegt
durch die Teile (cc)/(c) und (m)/E1 · (3) CLAUDE.md nannte google.md mit 405 265 Bytes.
**IM SELBEN ZUG ERLEDIGT:** (1) an den drei Stellen, (3) in CLAUDE.md; (2) ist G5 von S7. Eine
Provenienz-Liste in docs/claude-md-herleitung.md (Abschnitt "## Modus") führt ebenfalls
"(af)"; ob dort die Frist gemeint ist, ist nicht entscheidbar — nicht freigegeben, nicht
angefasst.

### VERMERK P11.7-24 — Scheibe S7 gebaut und live belegt vom 2026-09-24 (google `landingPageDeviceInfo`)

**HARTE ANGABEN:** 2026-09-24 · **BAU-COMMIT `883993d`** (`feat(capi): Google erhaelt IP und
User-Agent der Landeseite (11.7 S7)`) · sechs Dateien: `src/lib/capi/google-payload.ts`
(Typen `GoogleDeviceInfo` und `GoogleAdIdentifiers`, `pickDeviceInfo`, das Feld NACH der
Kennungsprüfung; Kommentare G6 (3) bis (5) und Freigabe F-c), `src/lib/capi/google-forward.ts`
(zwei optionale, hinten angehängte Parameter, Freigabe F-b; Kommentare (1) und (6)),
`src/lib/capi/ingest.ts` (allein das Lambda `FORWARDER_BY_TARGET.google` und der Kommentartext
am Typ `Forwarder`, Freigabe F-a; der Typ ist byte-gleich), dazu `google-payload.test.ts`
(P-a bis P-f), `google-forward.test.ts` (GF-9 bis GF-9g, GF-7c) und `fan-out.test.ts`
(T10-google, Freigabe F-d) · Tests **2164 / 98 → 2179 / 98** (GEMESSEN, CC; massgeblich ist
die Liste in P2 des Stufe-1-Plans — P6 hatte sieben statt acht Forward-Tests gezählt) · tsc,
lint (0 Fehler; die bestehende Warnung in `consent.test.ts`), build grün · **KEINE
`console`-Zeile im Diff** (GEMESSEN) · am committeten Objekt alle sechs `i/lf`, CR 0.

**MUTATIONSPROBEN — ACHT, ALLE WIE VORHERGESAGT**, die Vorhersage je Datei VOR dem Lauf am
gebauten Bestand nachgezählt; je voller Lauf über 98 Dateien, je zurückgenommen und per
sha256 gegen den Baustand belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| m1 | der Bauer setzt das Feld nicht | 9 — P-a, P-b, P-c, P-f, GF-9, GF-9b, GF-9c, GF-9e, T10-google |
| m2 | Werte in `eventDeviceInfo` statt `landingPageDeviceInfo` | 9 — dieselben |
| m3 | IP und UA im Bauer vertauscht | 9 — dieselben |
| m3b | IP und UA im LAMBDA vertauscht | 1 — NUR T10-google |
| m4 | Gerätedaten zählen als Kennung | 2 — P-e, GF-9f |
| m5 | `consent` an der Anfrage gesetzt | 5 — Hüllen-Test (Wurzel-Schlüssel), GF-1, GF-9, GF-9g, T10-google |
| m6 | IP in der HTTP-Fehlerzeile | 1 — NUR GF-7c |
| m7 | das Lambda reicht nichts weiter | 1 — NUR T10-google |

m3b und m7 belegen, warum T10-google nötig ist: Die Parameter sind optional, und nur ein Lauf
über den Handler mit dem echten Adapter sieht einen Fehler im Lambda.

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-24):**
- VORBEREITUNG: `cns.google` `true` im Beacon · "Lead" einer numerischen Conversion-Type-ID
  zugeordnet · Google-Karte neu autorisiert (`[oauth/google/callback] ok`), vorher
  `access_token_expired`.
- R1, ohne gclid: Logzeile "[capi] Google forward skipped: no_click_id" — der Adapter wird
  erreicht.
- S1, `?gclid=S7TestGclid0001`: Forward an `datamanager.googleapis.com/v1/events:ingest` ohne
  Fehlerzeile, HTTP 200.
- HANDAUFRUF mit `validateOnly=true`, Git Bash: (a) mit `landingPageDeviceInfo` → 200,
  `{"requestId": "v-…"}` · (b) Mitläufer `landingPageDeviceInfoX` → 400 `INVALID_ARGUMENT`,
  "Unknown name \"landingPageDeviceInfoX\" at 'events[0].ad_identifiers': Cannot find field." ·
  (c) `ipAddress` `2001:db8::1` → 200.

**ERGEBNIS: `landingPageDeviceInfo` MIT `ipAddress` UND `userAgent` IST AUF SCHEMA-EBENE
GEMESSEN ANGENOMMEN** — Beleg ist (a) zusammen mit dem Mitläufer (b), der zeigt, dass der
Parser Namen streng prüft; **IPv6 ist dort angenommen** (c). Befund: docs/ziel-befunde/google.md,
Teil (cu), dazu datierte Zeiger an (m)/E1, (w)/E1 und (bn).
**DIE GRENZEN:** `validateOnly` prüft das Schema, nicht die Verwendung · kein Abgleich
belegbar — der gclid war erfunden, `INVALID_GCLID` am Folgetag ist erwartet · dass IP und UA im
Produktivpfad mitreisen, belegen T10-google und GF-9, NICHT der Live-Test · IPv6 in der
Produktion ist nicht gefahren (keine AAAA-Einträge der Label-Hosts, VERMERK P11.7-21).

**ABSCHLUSS IM SELBEN ZUG:** ZUSCHNITT-FRAGE P11.7-6 und P11.7-7 nachgezogen · Vorrat P11.7-10
neu · S7 ABGESCHLOSSEN.

### VERMERK P11.7-25 — Roadmap-Abgleich der Phase 11.7 vom 2026-09-24 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-24 · HEAD `21667ac` · Arbeitsbaum sauber · READ-ONLY · VOLLSTÄNDIG
gelesen: docs/aktiver-stand.md (2 244 Zeilen) und docs/roadmap.md Z. 1723–1835 (Roadmap-Zeile
11.7, 113 Zeilen, sha256 `67b2bfd73cabb2b366317d1ab72fc4afcfce1809d4aaa7514531c67fa8f4cdf1`).
**GRENZE: DIE ZIEL-DATEIEN SIND NUR GEZIELT GELESEN** — tiktok.md (j)–(p) · meta.md (k), (l),
(u) · pinterest.md (ae)–(ai) · linkedin.md (ag), (ao), (as) —, **google.md GAR NICHT**; die
Google-Angaben stammen aus dieser Datei. Dazu die Matrix in docs/ziel-fragenkatalog.md. Kein
Pflicht-Stopp-Fall (kein Zuschnitt, kein Bau, keine Recherche). Kein Bau-Commit. Die
Owner-Entscheidungen aus diesem Abgleich: E-a bis E-d im Abschnitt "Gegenstand der Phase".

**DER WORTLAUT DER ROADMAP-ZEILE, JE PUNKT (Auszug, docs/roadmap.md):**
- F5: "TIKTOK, DEDUPLIZIERUNG (Katalog H2): NIE GESTELLT. … was der Anbieter damit tut, steht
  nirgends. … Für TikTok ist es UNENTSCHIEDEN." (Z. 1732–1738)
- F6: "META, VERSIONSANGABE (Katalog B2): … OB DER ANBIETER DIESE VERSION NOCH BEDIENT, STEHT
  NIRGENDS." (Z. 1741–1744)
- F7: "RATE-LIMITS (Katalog H3) FÜR META, TIKTOK UND LINKEDIN: NIE GESTELLT bei allen dreien.
  Für Pinterest am 2026-08-20 beantwortet (… Teil (e))." (Z. 1745–1747)
- F8: "PINTEREST, ERFOLGSRUMPF (Katalog G1): NIE GEMESSEN … DAS IST DIE EINZIGE DER VIER, DIE
  EINE MESSUNG VERLANGT; die übrigen drei sind aus der Anbieter-Dokumentation beantwortbar."
  (Z. 1753–1757)
- Klammer: "Das TRACKING WIRD ABGESCHLOSSEN, bevor die nächste Phase beginnt." Ausgenommen
  "ALLES, WAS AN DER RECHTSFORM HÄNGT". (Z. 1760–1763)
- Punkt 5: "JEDES NETZWERK SOLL DIE DATEN BEKOMMEN, MIT DENEN ES BESTMÖGLICH OPTIMIERT"; drei
  Grenzen — E-Mail und Telefon nicht · "verlangt oder nur empfohlen … UNGEMESSEN" · ohne
  Anzeigenklick ist eine fehlende Klick-Kennung korrekt; "KEIN Zuschnitt". (Z. 1781–1831)

**ABGLEICH JE PUNKT:**

| Punkt | Roadmap verlangt | Erledigt (Beleg) | Offen | Scheibe |
|---|---|---|---|---|
| F5 tiktok Dedup | LESUNG ("aus der Doku beantwortbar") | tiktok.md (n): Schlüssel `[event_source_id, event, event_id]`, 48 h / 5 min (VERMERK P11.7-4) | Wirkung ungemessen (tiktok.md, "Abschnitts-Lesung 2026-09-22 … die Teile (j) bis (p)", Block "WAS NUR EIN AUFRUF ZEIGT", Punkt "ob die 48-Stunden- und die 5-Minuten-Frist …") · Doppelzählung mit eigenem Betreiber-Pixel nur Ableitung (ZUSCHNITT-FRAGE P11.7-10) · Matrix H2 tiktok "NIE GESTELLT" (docs/ziel-fragenkatalog.md, "## Die Matrix — Stand 2026-08-20", Zeile H2) | keine; P11.7-10 war S8 zugeordnet und ist dort nicht bearbeitet (VERMERK P11.7-28) |
| F6 meta Version | LESUNG | Doku (v)/(w); `v25.0` gebaut `9778aca`, live bestätigt (VERMERK P11.7-14); Wächter V1/V3/T1 | Messung der verarbeiteten Version (meta.md (y)), vom Wortlaut nicht verlangt | S1 + S3 |
| F7 meta/tiktok/linkedin | LESUNG | meta (u) "no specific rate limit", 1 000 Ereignisse je Aufruf, BUC-Zahlen nicht gelesen · tiktok (o) beziffert · linkedin (ag) schon 2026-09-11 (docs/ziel-fragenkatalog.md, "## Fortschreibung der Matrix — 2026-09-11, Ziel LINKEDIN", Zeile H3), (as) | ob metas "kein Limit" ohne Zahl als Antwort zählt, NICHT ENTSCHEIDBAR · Messung · ZUSCHNITT-FRAGE P11.7-11 (40100 und 40104 beide HTTP 401) · Matrix H3 meta/tiktok "NIE GESTELLT" | keine |
| F7 Pinterest-Widerspruch | NICHT im Wortlaut (dort "beantwortet", Teil (e)); erst die Owner-Klarstellung vom 2026-09-24 | pinterest.md (ai)(2): 120 000/min · "unlimited" · 5 000/min; Vorbehalt an (e) | welche gilt: UNGEMESSEN; eine Doku-Antwort gibt es nicht (drei widersprechen sich) | keine |
| F8 pinterest Erfolgsrumpf | MESSUNG ("DIE EINZIGE … DIE EINE MESSUNG VERLANGT") | Form gelesen (ah); deckt sich mit `evaluateSuccessBody` (GEMESSEN am Repo, `8cab827`) | der Aufruf — (ah): die Doku ist "nicht ihr Ersatz"; ZUSCHNITT-FRAGE P11.7-21 hängt daran | keine; S9 ist `epik`, nicht F8 |

**DIE SPANNUNG, DIE DER ABGLEICH NICHT AUFLÖSTE:** CLAUDE.md, "WANN [x] GESETZT WIRD" —
Messungen werden "GEHOBEN, nicht abgewartet", und die Roadmap-Zeile nennt beim [x] das
Unbewiesene — gegen die Owner-Klarstellung "WERDEN VOR DEM PHASENENDE ERFÜLLT". Ob "erfüllt"
bei F8 den Aufruf verlangt oder das Heben zulässt, war NICHT ENTSCHEIDBAR. Aufgelöst durch
Owner-Entscheidung E-a.

**PUNKT 5, JE ZIEL (gegen F3):**
- **GESENDET** (Belege VERMERKE P11.7-1 (d), P11.7-16, -18, -20, -22, -24): meta
  `action_source`, `event_source_url` (bereinigt), `client_ip_address`, `client_user_agent`,
  `fbp`, `fbc` (S5) · tiktok `user.ip`, `user.user_agent`, `page.url` (bereinigt, `ttclid`
  bleibt, laut (m) parst der Anbieter), `user.ttclid` (S8, VERMERK P11.7-28), `event_id` ·
  pinterest `client_ip_address`,
  `client_user_agent`, `event_source_url` (bereinigt, `epik` bleibt), `partner_name "direct"`,
  `user_data.click_id` (S9, VERMERK P11.7-30)
  · linkedin `PLAINTEXT_IP_ADDRESS` (nur IPv4), `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID`
  (S6a/S6b) · google `gclid`/`gbraid`/`wbraid`, `landingPageDeviceInfo.ipAddress`/`userAgent`
  (S7).
- **AUSGESCHLOSSEN, MIT GRUND:** `external_id`/`externalIds` bei allen — Owner-Frage
  (ZUSCHNITT-FRAGE P11.7-4, -12, -18) · Cookie-Wege `_fbc`, `_ttp`/`user.ttp`, `_epik`,
  Insight Tag — Entscheidung P11.7-2, ZUSCHNITT-FRAGE P11.7-20, -26 (/api/e-Schlankheit) ·
  Meta-Pflichtfeld-Riegel (ZUSCHNITT-FRAGE P11.7-22) — "vor einem Bau steht eine Messung" ·
  google DMA-`consent` (Owner 2026-09-24), `eventDeviceInfo`, `category`, `language_code`
  (G1, "NICHT TEIL VON S7") · Personenbezogenes — Roadmap-Grenze und F3.
- **OFFEN:** google: ob die IP allein genügt (G2),
  Schreibung der Auto-Tagging-Parameter (docs/offene-punkte.md, Messung an einem echten
  Anzeigenklick).
- **UNBEHANDELT** (gelesen, hier weder ausgeschlossen noch offen geführt): meta (k)
  `subscription_id`, `fb_login_id`, `lead_id`, `page_id`, `page_scoped_user_id`, `ctwa_clid`,
  `ig_account_id`, `ig_sid` · tiktok `page.referrer` (m), `ad.campaign_id`/`ad_id`/
  `creative_id`, `locale` (l) · pinterest `customer_type`, `app_info.user_agent` (ae) ·
  linkedin `lead`, `ACXIOM_ID`, `GOOGLE_AID`, `SHA256_IP_ADDRESS` (ao) · google nicht erhoben
  (google.md nicht gelesen). **Eingeordnet durch Owner-Entscheidung E-c.**
- Beide F3-Divergenzen (google, linkedin) sind ungelöst; die Roadmap-Grenze "verlangt oder
  empfohlen … ungemessen" ist heute GELESEN, nicht gemessen.

**OFFENE ARBEIT BIS ZUM PHASENENDE, WIE AM 2026-09-24 ERHOBEN** (ohne Reihenfolge; Aufwand
SCHÄTZUNG; die Reihenfolge setzt E-d):
1. S8 tiktok `user.ttclid` — ERLEDIGT: gebaut, im Test-Events-Reiter live belegt (VERMERK
   P11.7-28).
2. S9 pinterest `click_id` — ERLEDIGT: gebaut (`024678a`), in "Events testen" live belegt
   (VERMERK P11.7-30).
3. F8 Erfolgsrumpf — ERLEDIGT: gemessen (VERMERK P11.7-26); der Zweig "200 mit `failed`"
   bleibt ungemessen und wird beim [x] benannt (E-a).
4. F5 Wirkung — NICHT VERLANGT: F5 ist durch die Lesung erfüllt, die Messung wird beim [x]
   als unbewiesen benannt (E-a). Instrument, falls sie je gefahren wird: zwei Aufrufe mit
   gleicher `event_id`, Anbieter-Metriken (n); Browser gegen Server ohne TikTok-Pixel nicht
   herstellbar ((k)).
5. F7 je Ziel — NICHT VERLANGT: F7 ist durch die Lesung erfüllt, die Messung wird beim [x] als
   unbewiesen benannt (E-a). Instrument, falls sie je gefahren wird: Kopfzeilen einer Antwort —
   meta "headers" (u), linkedin Analytics-Reiter (ag), tiktok Kopfzeilen ungelesen (tiktok.md,
   "Abschnitts-Lesung 2026-09-22 … die Teile (j) bis (p)", Block "WAS NUR EIN AUFRUF ZEIGT",
   Punkt "welches Limit real greift …"); die Grenze auszulösen ist kein Instrument.
6. Pinterest-Rate-Limit-Widerspruch — ERLEDIGT: gemessen aufgelöst, 120 000 je 60 s (VERMERK
   P11.7-26; E-b).
7. ZUSCHNITT-FRAGE P11.7-11 — ERLEDIGT: geschlossen durch OWNER-ENTSCHEIDUNG E-f.
8. Vorrat P11.7-9 (K1–K4) — ENTSCHIEDEN (E-e): K1 für alle fünf Ziele, zugeschnitten als S10;
   K4 wird beim Phasenende gehoben.
9. LinkedIn-Nachablesung "Data last received" (VERMERK P11.7-22, (c)) — Messung — Campaign
   Manager ab 2026-09-25.
10. Unbehandelte Felder aus Punkt 5 — ERLEDIGT: eingeordnet durch Owner-Entscheidung E-c.
11. Matrix-Fortschreibung B2, G1, H2, H3 in docs/ziel-fragenkatalog.md — Doku; heute keine
    Fortschreibung für 11.7 (Suche nach "2026-09-2": 0 Treffer); Pflicht ist nicht geregelt.
12. Auflage beim [x]: das Unbewiesene in der Roadmap-Zeile nennen (u. a. F5/F7/F8,
    ZUSCHNITT-FRAGE P11.7-21) — Doku.
13. Phasenende: Hebung (HEBUNGS-KANDIDAT P11.7-1), Archivierung nach docs/arbeitsweise.md — Doku.
14. Optional, nicht verlangt: Meta-EMQ nach S5 erneut ablesen (Anlass 4,4/10); die
    F6-Kopfzeile `facebook-api-version`.

### VERMERK P11.7-26 — Messung F8 (pinterest, Erfolgsrumpf) vom 2026-09-24 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-24, 09:44 UTC · GEMESSEN vom OWNER im Terminal (Git Bash, `curl`)
· alle drei Läufe mit `?test=true` gegen `POST /v5/ad_accounts/{id}/events` · Befehle aus
der Mess-Vorbereitung derselben Sitzung (READ-ONLY, HEAD `4973967`; Volladung
docs/ziel-befunde/pinterest.md plus Kopf von docs/ziel-befunde.md), Rumpf in der Form von
`forwardToPinterest`, Antwort mit Kopfzeilen (`-D -`) · Testwerte: IP `203.0.113.9`
(TEST-NET), erfundener User-Agent · kein Zugangsdatum, keine Werbekonto-Kennung und kein
Anfrage-Bezeichner in dieser Datei. Kein Bau-Commit.

**VORHERSAGE GEGEN ERGEBNIS, JE LAUF** (Vorhersage = was `evaluateSuccessBody` aus der laut
Quelle erwarteten Antwort machen würde):

| Lauf | Ergebnis | Vorhersage | Abgleich |
|---|---|---|---|
| (a) `lead` | HTTP 200; 1/1, `processed`, `error_message` `""`, `warning_message` "external_id is missing. We highly recommend this on all events. … ; click_id is missing" | `warning` mit Warnzeile | **WIE VORHERGESAGT** |
| (b) `subscription` | HTTP 200; 1/1, `processed`, `error_message` `""`, Warnung wie (a) plus "This event has a non-standard name and is currently being labeled as an 'Unknown' event. …" | `failed`, Zeile `received=1 processed=0 entries=1 status=failed` | **`processed` STATT `failed`** |
| (c) Stapel (a)+(b) | HTTP 200; 2/2, beide `processed`, Warnungen je wie oben | `failed`, Zeile `received=2 processed=1 entries=2` | **`processed` STATT `failed`** (2/2 statt 2/1) |

**KOPFZEILEN, alle drei Antworten:** `X-RateLimit-Limit: 120000, 120000;w=60;name=
"ads_conversions_ad_account_id"` · `X-RateLimit-Remaining` 119999 → 119998 → 119997 ·
`X-RateLimit-Reset` 58 / 56 / 53.

**ERGEBNIS:** Die Form des Erfolgsrumpfs deckt sich mit docs/ziel-befunde/pinterest.md, Teil
(ah) · `subscription` wird angenommen, das Beispiel in (ah) ist für diesen Aufruf widerlegt ·
Rate-Limit 120 000 je 60 s, Kategorie `ads_conversions_ad_account_id` · jede Antwort trägt die
Warnung "external_id is missing … click_id is missing". Befund: docs/ziel-befunde/pinterest.md,
Teil (al), dazu datierte Zeiger an (e), (x), (ah) und (ai)(2).
**DIE GRENZEN:** `?test=true` — gleiche Antwortform wie ohne ist GELESEN (Teil (ah)), nicht
gemessen · EINE Beobachtung · **der Fehlerzweig "HTTP 200 mit `failed`" ist UNGEMESSEN** —
keiner der drei Läufe hat ihn erzeugt.

### VERMERK P11.7-27 — Aufklärung zu S8 vom 2026-09-24 (KEIN BAU)

**HARTE ANGABEN:** 2026-09-24 · HEAD `0180fd1` · Arbeitsbaum sauber · READ-ONLY · **VOLLLADUNG**
von docs/ziel-befunde/tiktok.md (622 Zeilen) plus Kopf von docs/ziel-befunde.md (220 Zeilen) ·
keine fremde Seite, kein Aufruf gegen die Schnittstelle · Nicht-Treffer am geglätteten Text von
tiktok.md, Positivkontrolle `ttclid` 27, `test_event_code` 10, `Response` 4. Kein Bau-Commit.

**DAS FELD (docs/ziel-befunde/tiktok.md):**
- **`user.ttclid`** — (j): "Report the user's events with ttclid inserted into Events API
  user.ttclid field via /event/track/." Ebene: das `user`-Objekt je Ereignis in `data[]`; (l):
  "web only, kein Hash". **EMPFOHLEN, NICHT VERLANGT:** "It is strongly recommended to send back
  the ttclid via Events API 2.0 for all events" (j), Häkchen in der Spalte "Recommended ?" (l);
  keine Seite nennt es Required. Form: keine Grammatik; allein "ttclid can be up to 1,000
  characters long, so you need to ensure that you don't truncate it" (j).
- **(m):** "The API backend will parse the Click ID if it detects the presence of a ttclid
  parameter in the page.url." (j) nennt drei Herkunftswege und "It's highly recommended to
  implement at least one of the above three options."
- **NICHT-TREFFER ZU VORRANG UND WIDERSPRUCH:** `instead`, `priority`, `prefer`, `overrid`,
  `take precedence` je 0; die drei `both`-Treffer gelten ip/UA und `event_id`. Zum Abschnitt
  "Remove ttclid from landing page URLs" nennt (j) keine Folge für die Zuordnung.
- **NICHT-TREFFER ZU SCHREIBUNG UND KODIERUNG:** `uppercase`, `lowercase`, `encod`, `decod`,
  `percent` je 0; `case` 2, beide eigene Achsen-Vermerke. Vorhanden: der Beispielwert
  `?ttclid=E.C.P.v3fQ2RHacdksKfofPmlyuStIIHJ4Af1tKYxF9zz2c2PLx1Oaw15oHpcfl5AH` (j) und die
  1 000-Zeichen-Angabe.

**DAS INSTRUMENT — KEIN BELEGTES:** tiktok.md trägt keine Aussage, welche Kennungen oder
Match-Felder eine Oberfläche je Ereignis zeigt (`Event Match` 0, `match quality` 0, `matched` 0,
`Diagnos` 0; `Test Events` 3, nur als Ort des Testcodes in (b) und im Zitat in (h)); (n) nennt
Metriken "Browser", "Server", "Server & Browser" und "Event Health". Die Erfolgsantwort
beschreibt die Datei nicht. **ZWEITHAND AUS CODE-KOMMENTAREN, nicht aus der Befund-Datei:**
`src/lib/capi/tiktok-forward.ts` Kopf ("im Test-Ereignis-Tab des Anbieters als verarbeitet
bestaetigt"), Kommentar an `properties` (der Test-Tab beanstandet `content_id`), `TIKTOK_OK_CODE`
(HTTP 200, `code: 0`), Kommentar an `EVENT_MAP` (ein Custom-Name bekommt `code 0`, "die Quittung
sagt das NICHT") — gemessen laut Kommentar am 2026-08-11. Ob der Tab `user.ttclid` ausweist, ist
UNGELESEN und ungemessen; die Erfolgsantwort taugt nicht als Instrument für ein Feld (FOLGERUNG).

**AM CODE (GEMESSEN, HEAD `0180fd1`):**
- (a) `forwardToTiktok`: vor dem `try` allein `let timer`; `user` entsteht IM `try` im Literal
  `eintrag` nach dem Paar-Riegel, heute `ip`, `user_agent`; `page.url` aus
  `stripForeignClickIds(asString(body.eventSourceUrl), "tiktok")` — `ttclid` bleibt als eigene
  Kennung darin.
- (b) T10 (`tiktok-forward.test.ts`) prüft `user` per `toEqual({ ip, user_agent })` mit Rumpf
  `{}`, OHNE Adresse — ein `user.ttclid` aus der Adresse macht ihn NICHT rot. T15 prüft `page`
  mit `https://kunde.de/lp` ohne Query-Teil und `user` nicht. KEIN Test nagelt die ganze
  TikTok-Nutzlast per `toEqual` fest; `ingest.test-mode.test.ts` TM5/TM7 prüfen nur
  `test_event_code`, `fan-out.test.ts` keine TikTok-Nutzlast. Eine Adresse mit `ttclid` fährt
  allein Wächter W.
- (c) **W BLIEBE GRÜN, in beiden Läufen:** Er sucht den Wert je Kennung im ganzen ausgehenden
  Text; der eigene steht ohnehin in `page.url` (Lauf "tabelle"), und `TtClId=` bleibt dort in
  jeder Schreibung (V-c4, Lauf "abweichend"). **W BEWACHT `user.ttclid` NICHT** — wie bei `fbc`;
  dass kein anderes Ziel `ttclid` trägt, deckt W weiter.
- (d) `readClickIdExact` (`src/lib/capi/click-id-strip.ts`) ist modulprivat, exakt auf dem
  dekodierten Namen, wurffrei, `""` wenn nichts vorliegt; ihr Kopf: "ein weiterer Urheber bekommt
  eine weitere Huelle". Eine Hülle `extractTtclid` nach dem Muster von `extractLiFatId` liesse
  `extractFbclid`, `extractLiFatId`, `stripForeignClickIds` und `CLICK_ID_TABLE` unberührt.
- (e) Drei `console.error`-Zeilen: zweimal `describeRejection` (Status, `content-type`, Länge,
  `code`, `request_id`, `message` — je über `redactOpaque`, gekappt; nichts aus der Anfrage),
  einmal `errorName(err)`. Ein `ttclid` erschiene nur, wenn TikTok ihn in `message` spiegelt —
  für `event_source_id` ist ein Echo gemessen (Kommentar an `describeRejection`), für `ttclid`
  ungemessen. Am Beispielwert bliebe nach `redactOpaque` der Vorsatz `E.C.P.` lesbar (FOLGERUNG).

**DATENKLASSE — DIE TEXTLAGE (docs/offene-punkte.md, Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN
PII-SCHEIBE"):** `ttclid` steht dort nur als Suchbegriff. Der Block vom 2026-08-28 nennt TikTok
ausdrücklich — "gclid, gbraid, wbraid — und künftige Klick-Kennungen anderer Anbieter (Meta,
TikTok und weitere)", TRANSIT-ONLY, "ANBIETERÜBERGREIFEND … ihr Kriterium ist die HERKUNFT". (E2)
nennt allein `fbc` und `fbp` samt gleichartigen Tag-Kennungen; (E3) trägt den Grundsatz "EINE
KLICK-KENNUNG GEHT NUR AN IHREN URHEBER".

**IM SELBEN ZUG:** Zuschnitt von S8 (T1 bis T6, Abschnitt "Zuschnitt der Phase 11.7") und
Mitzunehmendes an S9.

**ZEIGER 2026-09-24 — DER TEXT DARÜBER BLEIBT, ER IST DER STAND VOR DEM BAU:** Der
Test-Events-Reiter weist `user.ttclid` als Parameter "ttclid" aus, und die Erfolgsantwort ist
für Feldnamen gemessen blind — VERMERK P11.7-28; docs/ziel-befunde/tiktok.md, Teile (q), (r).

### VERMERK P11.7-28 — Scheibe S8 gebaut und live belegt vom 2026-09-24 (tiktok `user.ttclid`)

**HARTE ANGABEN:** 2026-09-24 · **BAU-COMMIT `b503711`** (`feat(capi): tiktok sendet ttclid
zusaetzlich als user.ttclid (Phase 11.7, S8)`) · vier Dateien: `src/lib/capi/click-id-strip.ts`
(neue Hülle `extractTtclid` am Kern `readClickIdExact`; Kopfsatz der Hüllen nachgezogen),
`src/lib/capi/tiktok-forward.ts` (`user` als benanntes Objekt, `user.ttclid` nach der
bereinigten Adresse im `try`; Kommentar am Paar-Riegel ersetzt, Kopfsatz "GELESEN, nicht
gemessen" für `user.ttclid`), `src/lib/capi/tiktok-forward.test.ts` (Kopf ersetzt; TT-a, TT-c,
TT-d, TT-e, TT-f, TT-g, TT-i, TT-j), `src/lib/capi/click-id-strip.test.ts` (TX-a bis TX-h) ·
Tests **2 179 → 2 195 / 98** (GEMESSEN, CC) · tsc, lint (0 Fehler; die bestehende Warnung in
`consent.test.ts`), build grün · **KEINE `console`-Zeile im Diff** (GEMESSEN) · ingest.ts,
Beacon, Erzeuger, Schema und die übrigen Adapter unberührt.

**GATES DES BAUS (GEMESSEN am Code, HEAD `593f5a3`):**
- KÜRZUNG: auf dem Weg Beacon (`location.href`) → `/api/e` → `handleIngest` → Adapter kürzt
  nichts; das einzige `slice` auf einem Wert ist der Schnitt einer nicht parsebaren Adresse (D5),
  dort entfällt auch `user.ttclid`. Eine Rumpf- oder Beacon-Grenze der Plattform bzw. des
  Browsers ist nicht erhoben.
- IP UND USER-AGENT: `resolveClientIp` bzw. die Kopfzeile `user-agent` in `handleIngest`
  (`src/lib/capi/ingest.ts`). Ein Weg ohne IP ist allein Loopback ohne `META_TEST_EVENT_CODE`,
  also die lokale Entwicklung; ein Weg ohne User-Agent setzte einen Nicht-Browser voraus
  (FOLGERUNG); ob Vercel die IP-Kopfzeilen je weglässt, ist ungemessen. Daraus Entscheidung
  P11.7-6.

**MUTATIONSPROBEN — ZEHN, ALLE WIE VORHERGESAGT**, die Vorhersage je Datei VOR dem Lauf am
gebauten Bestand nachgezählt; je voller Lauf über 2 195 Tests, je zurückgenommen und per sha256
gegen den Baustand belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| k1 | Hülle liest `"ttclid_"` | 8 — TX-b, TX-c, TX-e, TX-h, TT-a, TT-e, TT-f, TT-g |
| k2 | Kern vergleicht den Namen ohne Schreibung | 7 — X-c, L-c, M-c, T6-c, W-linkedin/abweichend, TX-c, TT-f; W-tiktok grün |
| k3 | Hülle `.slice(0, 500)` | 2 — TX-b, TT-e |
| k4 | Hülle `/^E\.C\.P\./` | 5 — TX-b, TX-c, TX-e, TX-h, TT-f |
| m1 | Extraktion im Adapter entfernt | 4 — TT-a, TT-e, TT-f, TT-g |
| m2 | Feld unbedingt gesetzt | 5 — T10, TT-c, TT-d, TT-f, TT-i |
| m3 | Kennung aus `page.url` entfernt (exakter Name) | 2 — TT-a, TT-e; W grün (verdeckt) |
| m4 | Adapter `.slice(0, 255)` | 1 — TT-e |
| m5 | Lesung aus `body.eventSourceUrl` vor dem `try` | **1 — NUR T20** |
| m6 | Feldname `tt_clid` | 4 — TT-a, TT-e, TT-f, TT-g |

**MESSWERTE (OWNER-ANGABEN, 2026-09-24, Zeiten UTC):**
- TERMINAL, Testmodus, `event_id` `s8-A-1790252376` bis `s8-D-1790252376`, Empfang 12:20:05 bis
  12:20:06: A (`user.ttclid`, `page.url` ohne Kennung), B (ohne Kennung), C (`user.ttclidX`), D
  (Kennung nur in `page.url`) — alle HTTP 200, `{"code": 0, "message": "OK"}`. Im Reiter "Test
  Events" zeigt NUR A unter "Parameters" "ttclid: E.C.P.S8TerminalProbe1790252376"; B, C, D ohne
  ttclid-Eintrag, D mit der Kennung nur als Teil der URL; bei allen vier die Test-IP
  `203.0.113.9` unter "Customer information parameters".
- ECHTER WEG nach dem Deploy: R1 12:28:04, eventID `42ad381a-7015-459d-8a58-fad68e8f9e40`, URL
  mit `utm_source=s8r1`, kein ttclid-Eintrag, in Vercel keine Fehlerzeile · S1 12:30:13, eventID
  `0fed95e8-713e-425d-869b-f6b6918615a2`, URL mit `ttclid=E.C.P.S8LiveProbe0001`, der Reiter zeigt
  "ttclid: E.C.P.S8LiveProbe0001".

**DIE GRENZE:**
- **GEMESSEN:** Der Reiter zeigt "ttclid" für `user.ttclid` und NICHT für eine Kennung allein in
  `page.url` oder für ein unbekanntes Feld. Die Antwort des Endpunkts ist für Feldnamen blind.
- **ABGELEITET (aus D):** dass S1 `user.ttclid` über unseren Weg zeigt — eine Kennung allein in
  `page.url` ergibt keinen Parameter.
- **UNBELEGT:** der Abgleich (die Werte sind erfunden) · die Form echter Kennungen (`+` oder `%`
  im Wert: dekodiert im Feld, roh in `page.url`) · Weg (m), das Parsen aus `page.url`.

**ZEIGER / ABSCHLUSS IM SELBEN ZUG:** docs/ziel-befunde/tiktok.md, Teile (q) bis (s), dazu ein
datierter Zeiger an der Liste "WAS NUR EIN AUFRUF ZEIGT" und eine datierte Ergänzung an der
Prüfsumme im Kopf · VERMERK P11.7-27 mit Zeiger · Entscheidung P11.7-6 neu · ZUSCHNITT-FRAGE
P11.7-9 eingelöst · Zuschnitt S8 verdichtet (T6 entfallen) · S8 ABGESCHLOSSEN.

### VERMERK P11.7-29 — Messung und Zuschnitt zu S9 vom 2026-09-24 (pinterest `click_id`, KEIN BAU)

**HARTE ANGABEN:** 2026-09-24 · Aufklärung READ-ONLY an HEAD `da794d0` (VOLLLADUNG
docs/ziel-befunde/pinterest.md, 1 159 Zeilen, plus Kopf von docs/ziel-befunde.md) · danach
eine Terminal-Probe, von CC entworfen und vom OWNER UNVERÄNDERT gefahren, 13:05:31 bis
13:05:38 UTC, Git Bash, `curl`, alle fünf Läufe mit `?test=true` · Form je Lauf wie
`forwardToPinterest` (`src/lib/capi/pinterest-forward.ts`: Endpunkt mit Kennung im Pfad,
`Authorization: Bearer`, Hülle `{"data":[…]}`, `action_source` "web", `partner_name`
"direct", `user_data` mit IP und User-Agent, `event_source_url`), `event_name` `lead`, IP
`203.0.113.9`, `event_id` `s9-A-1790255129` bis `s9-E-1790255129` · das Zugangsdatum per
`read -rs` und über `curl --config -`, also in keinem Programm-Argument · kein
Zugangsdatum, keine Werbekonto-Kennung und kein Anfrage-Bezeichner in dieser Datei. Kein
Bau-Commit.

**DIE FÜNF LÄUFE UND DAS ERGEBNIS** (Befund: docs/ziel-befunde/pinterest.md, Teile (am) bis
(ar)):

| Lauf | Nutzlast | Warnung "; click_id is missing" | Test-Ansicht, Nutzerdaten |
|---|---|---|---|
| A | `user_data.click_id` = erfundener Wert, Adresse ohne `epik` | **fehlt** (Content-Length 315) | **Klick-ID**, User Agent, IP-Adresse |
| B | weder noch (Mitläufer) | steht (336) | User Agent, IP-Adresse |
| C | `user_data.click_idX` | steht (336) | User Agent, IP-Adresse |
| D | derselbe Wert nur als `&epik=` in `event_source_url` | steht (336) | User Agent, IP-Adresse; die `epik`-Adresse unter "URL" |
| E | wie A, der Wert trägt `+` und `%2B` | **fehlt** (315) | **Klick-ID**, User Agent, IP-Adresse |

Alle fünf: HTTP 200, `processed`, `error_message` `""`; in keiner Antwort die Marke des
Werts (Positivkontrolle "ok"); `X-RateLimit` 120 000 je 60 Sekunden wie VERMERK P11.7-26.

**DIE AUSSAGEN, je mit Grenze:** das Feld wird erkannt (A gegen B) · ein unbekannter Name
wird still ignoriert (C) — damit ist die Anzeige FELDSPEZIFISCH · eine Kennung allein in der
Adresse wird für Warnung und Anzeige NICHT erkannt (D); ob die Zuordnung sie später liest,
bleibt OFFEN · keine Zeichenprüfung für `+` und `%` (E), über roh gegen dekodiert sagt E
nichts · kein Echo im Erfolgszweig; Fehlerzweige ungemessen. GRENZE aller Teile: Testmodus,
erfundene Werte, KEIN Abgleich, gesendet hat das Terminal, nicht der Adapter.

**RICHTIGGESTELLT GEGEN DIE ÜBERGABE, GERECHNET (CC):** Die Übergabe nannte den Text OHNE
`click_id`-Zusatz 212 Zeichen lang. Er ist **191** lang; **212** ist die Länge MIT "; click_id
is missing". Gegenprobe: 336 − 315 = 21 = Länge des Zusatzes, und ein kompakter Rumpf in der
Feldfolge von (al) mit diesem Text ergibt genau 315 bzw. 336 Bytes. **FOLGE, GERECHNET mit der
Regel von `sanitizeProviderText`:** ohne Zusatz passt die Warnung ganz in die 200-Zeichen-
Kappung; mit ihm endet unsere Logzeile auf "; click_i". Die Warnzeile trennt die Fälle also,
aber nur über ein abgeschnittenes Bruchstück (pinterest.md, Teil (ar)).

**ZEIGER / IM SELBEN ZUG:** docs/ziel-befunde/pinterest.md — Teile (am) bis (ar), datierte
Zeiger an (p)(2), (ac), (ae) und (af), Ergänzung an der Prüfsumme im Kopf · Zuschnitt S9
(Abschnitt "Zuschnitt der Phase 11.7", N1 bis N9) · Entscheidung P11.7-7 neu · E-c und
ZUSCHNITT-FRAGE P11.7-19 mit Zeiger · VERMERK P11.7-25, Liste Nr. 2, und "Nächster Schritt"
nachgezogen.

### VERMERK P11.7-30 — Scheibe S9 gebaut und live belegt vom 2026-09-24 (pinterest `user_data.click_id`)

**HARTE ANGABEN:** 2026-09-24 · **BAU-COMMIT `024678a`** (`feat(capi): pinterest sendet epik
zusaetzlich als user_data.click_id (Phase 11.7, S9)`) · vier Dateien:
`src/lib/capi/click-id-strip.ts` (neue Hülle `extractEpik` am Kern `readClickIdExact`; Kopfsatz
der Hüllen nachgezogen), `src/lib/capi/pinterest-forward.ts` (`userData.click_id` nach der
bereinigten Adresse im `try`, nur bei nicht leerem Wert; Kommentare nach N8),
`src/lib/capi/pinterest-forward.test.ts` (Kopf nach N8; PC-a bis PC-i),
`src/lib/capi/click-id-strip.test.ts` (EX-a bis EX-h; Titel von TX-h ohne Stückzahl) · Tests
**2 195 → 2 212 / 98** (GEMESSEN, CC) · tsc, lint (0 Fehler; die bestehende Warnung in
`consent.test.ts`), build grün · **KEINE `console`-Zeile im Diff** (GEMESSEN, mit
Positivkontrolle) · der Code von `sanitizeProviderText`, `describeErrorBody`,
`evaluateSuccessBody`, `readBody` und der drei `console.error` unverändert; ingest.ts, Beacon,
Erzeuger, Schema und die übrigen Adapter unberührt.

**MUTATIONSPROBEN — ELF, ALLE WIE VORHERGESAGT**, die Vorhersage vor dem Lauf am gebauten
Bestand nachgezählt (m2 dabei von 4 auf 5 nachgezogen, PC-e); je voller Lauf über 2 212 Tests,
je zurückgenommen und per sha256 gegen den Baustand belegt:

| Probe | Eingriff | Rot |
|---|---|---|
| k1 | Hülle liest `"epik_"` | 8 — EX-b, EX-c, EX-e, EX-h, PC-a, PC-d, PC-e, PC-f |
| k2 | Kern vergleicht den Namen ohne Schreibung | 9 — X-c, L-c, M-c, T6-c, W-linkedin/abweichend, TX-c, TT-f, EX-c, PC-e; W-tiktok und W-pinterest grün |
| k3 | Hülle `.slice(0, 500)` | 2 — EX-b, PC-d |
| k4 | Hülle `^[A-Za-z0-9_-]+$` | 2 — EX-b, PC-e |
| m1 | Extraktion im Adapter entfernt | 4 — PC-a, PC-d, PC-e, PC-f |
| m2 | Feld unbedingt gesetzt | 5 — T8, PC-b, PC-c, PC-e, PC-g |
| m3 | `epik` aus dem gesendeten `event_source_url` entfernt | 4 — PC-a, PC-c, PC-d, PC-e; W-pinterest grün (verdeckt) |
| m4 | Lesung aus `body.eventSourceUrl` vor dem `try` | **1 — NUR T19** |
| m5 | Feldname `clickId` | 4 — PC-a, PC-d, PC-e, PC-f |
| m6 | Adapter `.slice(0, 255)` | 1 — PC-d |
| m7 | Riegel lässt mit `epik` durch | 2 — PC-h, PC-i; T6 und T7 grün |

**ZU m7:** Die Probe bewegt zwei Achsen (Ort der Lesung und Riegel). Die Deklaration der
zweiten Achse — gelesen im `try` vor dem Riegel, aus der unbereinigten Adresse, allein vom
Riegel verwendet — war vor dem Lauf im Probenskript festgelegt, aber dem Owner NICHT vorab
vorgelegt.

**ZWEI KOMMENTAR-KORREKTUREN VOR DEM COMMIT (OWNER):** Der Kommentar am Paar-Riegel stützt den
Riegel auf die GELESENE Mindestregel und die Kosten auf dem meistgetroffenen Pfad statt auf eine
behauptete Wirkung beim Anbieter · der Kopf von `extractEpik` nennt keine Anzahl der Hüllen
mehr. Nur Kommentarzeilen; die Pipeline danach erneut grün, 2 212 / 98.

**EIN VERFAHRENSBEFUND AM COMMIT:** Die Secret-Suche vor dem Commit lief im selben Befehl wie
Commit und Push, und ihre Positivkontrolle meldete 0 — das Muster traf den erfundenen
Test-Token nicht (er trägt `_`). **Nachgeprüft am gepushten Commit** mit erweitertem Muster:
Positivkontrolle 1, Treffer in den hinzugefügten Zeilen 0.

**LIVE-ERGEBNIS (OWNER-ANGABEN, 2026-09-24, Zeiten UTC):** Beacon an `/api/e` mit `cns` =
{meta, pinterest, tiktok, linkedin, google} je `true`. "Events testen", Einzelansicht:
- R1: Empfang 13:56:57, eventID `d6aeba6a-4f26-4a9e-8ec0-a81bd4e195bd`, URL `…/?utm_source=s9r1`
  — Nutzerdaten "User Agent, IP-Adresse"; Warnungen external_id und click_id (2).
- S1: Empfang 13:58:38, eventID `2789ba71-900a-442c-9886-058b41ae3c82`, URL
  `…/?utm_source=s9s1&epik=S9LiveEpik0001` — Nutzerdaten "Klick-ID, User Agent, IP-Adresse";
  Warnung nur external_id (1).
- Vercel-Log 13:58:37.577: "[capi] Pinterest forward warning: external_id is missing. … 3P
  cookie loss", vollständig, ohne Kappung. Die Zeile zu R1 ist NICHT abgelesen.
Keine IP des Owners in dieser Datei.

**DIE GRENZE, GETRENNT:**
- **GEMESSEN:** S1 zeigt "Klick-ID", R1 nicht. Die S1-Warnzeile im Log passt unter die
  Kappung — die Rechnung aus pinterest.md, Teil (ar), ist für den Fall MIT Feld bestätigt.
- **ABGELEITET (aus Teil (ao)):** Die Klick-ID von S1 stammt aus unserem Feld — eine Kennung
  allein in der Adresse erkennt die Anzeige nicht.
- **UNBELEGT:** der Abgleich (die Werte sind erfunden) · die Form echter `epik`-Werte
  (dekodiert gegen roh) · ob die Zuordnung die Adresse liest · die Kappung auf "; click_i" für
  den Fall OHNE Feld, am Log nicht abgelesen · Fehlerzweige und ein Echo darin.

**ZEIGER / ABSCHLUSS IM SELBEN ZUG:** docs/ziel-befunde/pinterest.md, Teil (as), dazu datierte
Zeiger an (o), (x), (ac), (ae) und (ar) · Zuschnitt S9 verdichtet (N7 und N8 entfallen) ·
ZUSCHNITT-FRAGE P11.7-15 und P11.7-19 nachgezogen · VERMERK P11.7-25 (Punkt 5, Liste) und
"Nächster Schritt" nachgezogen · S9 ABGESCHLOSSEN.

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
Sie bindet jeden Adapter und jede Nutzlast. **SEIT S4 IST SIE AM ADRESSFELD UMGESETZT**
(Bau-Commit `de88657`, VERMERK P11.7-16): meta, tiktok und pinterest entfernen jede fremde
Klick-Kennung der Tabelle `CLICK_ID_TABLE` aus der weitergereichten Adresse, die eigene
bleibt. **DIE GRENZEN:** eine Kennung ausserhalb der Tabelle reist mit (D3), ebenso eine im
Fragment (D6); eine nicht parsebare Adresse verliert alles ab dem ersten "?" oder "#" (D5).
Hier stand bis dahin "DER HEUTIGE CODE VERLETZT SIE" — richtiggestellt wie am Ort der
Entscheidung. Ob ein Anbieter Kennungen aus der Seitenadresse SELBST ausliest, ist auf
Doku-Ebene je Ziel beantwortet (F4) und bleibt als Messung offen.

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

**P11.7-6 — DER PAAR-RIEGEL BEI TIKTOK BLEIBT MIT `user.ttclid`.**
Ort: `src/lib/capi/tiktok-forward.ts`, der Riegel in `forwardToTiktok` samt Kommentar; der Test
TT-j in `tiktok-forward.test.ts`. Herkunft: ARCHITEKTEN-ENTSCHEIDUNG, Stufe 2 von S8
(2026-09-24); Material VERMERK P11.7-28.
Grund: Der einzige gefundene Weg ohne IP oder User-Agent ist die lokale Entwicklung ohne
Anzeigen-Traffic (Gate 1 von S8); dass TikTok ein Ereignis allein über `ttclid` zuordnet, ist
ungemessen.
Kippbedingung: steht am Riegel, Absatz "WANN SIE NEU ZU TREFFEN IST" — hier nicht kopiert.
Sie bindet jede Runde, die den TikTok-Riegel oder die Herkunft von IP und User-Agent berührt.

**P11.7-7 — DER PAAR-RIEGEL BEI PINTEREST BLEIBT MIT `user_data.click_id`.**
Ort: `src/lib/capi/pinterest-forward.ts`, der Riegel in `forwardToPinterest` samt Kommentar.
Herkunft: ARCHITEKTEN-ENTSCHEIDUNG, Zuschnitt von S9 (2026-09-24); Material VERMERK P11.7-29.
Grund, GELESEN: Laut docs/ziel-befunde/pinterest.md, Teil (ae), verlangt `user_data`
mindestens `em`, `hashed_maids` oder das Paar aus IP und User-Agent — `click_id` erfüllt die
Mindestregel NICHT. Ob Pinterest ein Ereignis allein mit `click_id` annimmt, ist UNGEMESSEN;
gemessen ist nur `click_id` NEBEN dem Paar (Teil (am)).
Kippbedingung: eine Messung, dass Pinterest ein Ereignis nur mit `click_id` annimmt und
zuordnet, oder eine geänderte Mindestregel an der Quelle.
Sie bindet jede Runde, die den Pinterest-Riegel oder `user_data` berührt.

## Vorrat (gemeldet, nicht gebaut)

**VIER SIND OFFEN (P11.7-2, -8, -9, -10); P11.7-3, -5 UND -6 SIND MIT S2 GESCHLOSSEN, P11.7-7
MIT S3, P11.7-1 UND -4 MIT S4.** Der Stand von P11.7-1 bis P11.7-4 ist am 2026-09-22 an HEAD
`a763716` gegengeprüft (VERMERK P11.7-8, Zeilen C6 bis C8), der von P11.7-5 bis P11.7-7 am
2026-09-23 an HEAD `4809cb5`: jede der beanstandeten Stellen steht unverändert da.
**GEMESSEN IST, DASS SIE DASTEHEN — NICHT, DASS SIE NACHGEZOGEN WÄREN.** **KEINE
EMPFEHLUNG** an keinem der neun.

**P11.7-1 — DER KOPFKOMMENTAR VON `src/lib/capi/google-click-ids.ts` IST WIDERLEGT.**
**GESCHLOSSEN 2026-09-23 — BAU-COMMIT `de88657` (S4):** Der Absatz nennt jetzt die zwei
Verbraucher per Symbolnamen — `forwardToGoogle` liest mit `extractGoogleClickIds` heraus,
`CLICK_ID_TABLE` (`src/lib/capi/click-id-strip.ts`) übernimmt `CLICK_ID_PARAMS` zum Entfernen —
und sagt, dass eine Änderung an `CLICK_ID_PARAMS` beides ändert. VERMERK P11.7-16.

**P11.7-2 — DER HALBSATZ AN DER ROADMAP-ZEILE 11.9 TRÄGT DIE ENGERE BESCHREIBUNG DER
DRITTEN DATENKLASSE.** Er lautet: *"Sie gilt fremdvergebenen KLICK-Kennungen, nicht einer
selbst gesetzten Besucher-Kennung."* Seit P11.7-2 deckt die Klasse auch `fbp`, und das ist
keine Klick-Kennung. **SEINE SCHLUSSFOLGERUNG BLEIBT RICHTIG, UNVOLLSTÄNDIG IST SEINE
AUFZÄHLUNG.**
TRIGGER: die nächste Runde, die die Roadmap-Zeile 11.9 ohnehin öffnet — der Zuschnitt von
GA4.

**P11.7-3 — DER KOPFKOMMENTAR VON `src/lib/capi/linkedin-forward.ts` FÜHRT DIE ABWESENHEIT
EINES USER-AGENT-FELDES ALS GEMESSEN, UND DIE ZITIERTEN TEILE TRAGEN DAS NICHT.**
**GESCHLOSSEN 2026-09-23 — BAU-COMMIT `5d5602e` (S2):** Beide Stellen tragen jetzt die Stufe
"ABLEITUNG aus der gelesenen Feldliste (Teil (ab)), kein gemessener Nicht-Treffer";
GEMESSEN bleibt allein die Form der Kennung. VERMERK P11.7-12.

**P11.7-4 — DER KOPFKOMMENTAR DER URL-BILDUNG IN `src/lib/capi/pinterest-forward.ts`
BEGRÜNDET DEN VERZICHT AUF EINE FORMATPRÜFUNG MIT EINER UNGEPRÜFTEN STELLENZAHL.**
**GESCHLOSSEN 2026-09-23 — BAU-COMMIT `de88657` (S4):** Aus "ungepruefte Stellenzahl" ist
"nur GELESENE, nie gemessene Stellenzahl (docs/ziel-befunde/pinterest.md, Teil (aj): `<= 18`,
`^\d+$`)" geworden; die Schlussfolgerung — nicht zu prüfen — steht unverändert. VERMERK
P11.7-16.

**P11.7-5 — DER KOPFKOMMENTAR VON `src/lib/capi/linkedin-forward.test.ts` FÜHRT DIE
ENDPUNKT-ADRESSE ALS "NICHT gemessen".**
**GESCHLOSSEN 2026-09-23 — BAU-COMMIT `5d5602e` (S2):** Der Satz ist ganz durch Zeiger
ersetzt — Adresse: Teil (ab), Live-Ankunft (Teil (ai)), Wächter V4; "Bearer": Teil (ai),
das Senden prüft T1-c. VERMERK P11.7-12.

**P11.7-6 — DER KOMMENTAR AN `LINKEDIN_ENDPOINT` (`src/lib/capi/linkedin-forward.ts`) SAGT
"GELESEN, nicht als Befund erhoben".**
**GESCHLOSSEN 2026-09-23 — BAU-COMMIT `5d5602e` (S2):** Der Kommentar an `LINKEDIN_ENDPOINT`
und der Kopfabsatz, auf den er zeigte, sind im selben Zug nachgezogen — Befund in Teil (ab),
Live-Ankunft in Teil (ai), Wächter V4. VERMERK P11.7-12.

**P11.7-7 — DER KOMMENTAR AN `META_GRAPH_VERSION` (`src/lib/capi/config.ts`) NENNT DEN
VORGABEWERT EINEN "stabile[n] Fallback".**
**GESCHLOSSEN 2026-09-23 — BAU-COMMIT `9778aca` (S3):** Der Kommentar nennt den Vorgabewert
jetzt die vom Wächter geprüfte Version (Verweis auf `TABELLE` per Symbolname, kein Datum im
Code) und die Umgebungsvariable einen Notausgang, den der Wächter nicht sieht. VERMERK
P11.7-14.

**P11.7-8 — DER VERTRAGSSATZ "EIN WURF WIRD ZUM 500" IN VIER ADAPTERN IRRT FÜR
ASYNC-ADAPTER UNTER `allSettled` — IN DER SICHEREN RICHTUNG.** Vertragssatz 1 in
`src/lib/capi/meta-forward.ts` (AUFLAGE: der Wurf "liefe durch das await in handleIngest und
aus dem Handler heraus"), in `src/lib/capi/tiktok-forward.ts` ("liefe durch dispatchForward
und handleIngest"), in `src/lib/capi/pinterest-forward.ts` ("WARUM DAS ZAEHLT") und in
`src/lib/capi/linkedin-forward.ts` ("liefe durch dispatchForward und handleIngest und machte
aus der garantierten LEEREN 204 einen 500"; als vierter aufgenommen am 2026-09-23, VERMERK
P11.7-19 — auch dieser Adapter ist `async`) sagt, ein
Wurf im Adapter mache aus der leeren 204 einen 500. **GEMESSEN (VERMERK P11.7-16, Mutation
m6):** Ein Wurf im Rumpf einer `async function` wird zur Ablehnung, `Promise.allSettled`
fängt sie, die Antwort bleibt die leere 204. Der Satz fordert damit MEHR Vorsicht als nötig;
er schwächt keinen Schutz. In S4 bewusst NICHT geändert (Architekten-Entscheidung E5,
2026-09-23): ihn nebenbei in drei Adaptern umzuschreiben, schwächte eine Schutzregel ohne
eigene Entscheidung. **KEIN FIX-VORSCHLAG.**
TRIGGER: die nächste Scheibe, die einen dieser Vertragssätze ohnehin ändert.

**P11.7-9 — EIN LINKEDIN-FORWARD IST IM ERFOLG UND IN MEHREREN STILLEN AUSGÄNGEN VOR DEM
ADAPTER UNSICHTBAR.** BEFUND vom 2026-09-24 (VERMERK P11.7-22, GEMESSEN am Code, HEAD
`007a772`): `forwardToLinkedin` loggt jeden Ausgang ausser einer 2xx-Antwort; vor dem Adapter
enden mehrere Ausgänge STILL in der leeren 204 (die Liste steht im Vermerk). Die Anbieter-Anzeige
taugt nicht als Ersatz — "Data last received" bewegte sich am 2026-09-24 nach zwei direkt mit
201 angenommenen Aufrufen nicht (docs/ziel-befunde/linkedin.md, Teil (be)). **FOLGE:** Ob ein
LinkedIn-Forward angekommen ist, ist heute an KEINER Stelle direkt zu sehen; S6b ist nur durch
Ausschluss belegt.
**ENTSCHIEDEN (OWNER-ENTSCHEIDUNG E-e, 2026-09-24): K1 FÜR ALLE FÜNF ZIELE**, zugeschnitten als
S10; K4 wird beim Phasenende nach docs/offene-punkte.md gehoben. Die Kandidaten K1 bis K4
stehen im VERMERK P11.7-22.
TRIGGER: eingetreten und entschieden; der Eintrag schliesst mit dem Bau von S10.
**ZEIGER 2026-09-24 — DAS GEGENSTÜCK BEI PINTEREST:** Dort ist ein Erfolg heute sichtbar, aber
nur über eine Warnzeile, die jede Antwort erzeugt — Befund an S9 im Abschnitt "Zuschnitt der
Phase 11.7" (VERMERK P11.7-26).

**P11.7-10 — IN DER LOKALEN ENTWICKLUNG REIST EINE PLATZHALTER-IP AN GOOGLE.** BEFUND vom
2026-09-24 (Stufe-1-Plan von S7, GEMESSEN am Code): Ist die Client-Adresse leer oder Loopback
und `META_TEST_EVENT_CODE` gesetzt, liefert `resolveClientIp` (`src/lib/capi/ingest.ts`) die
Platzhalter-IP `123.123.123.123`; seit S7 reist sie als `landingPageDeviceInfo.ipAddress` auch
an Google. **IN DER PRODUKTION OHNE FOLGE** — dort kommt die Adresse aus der Kopfzeile.
**KEIN FIX-VORSCHLAG.**
TRIGGER: die nächste Scheibe, die `resolveClientIp` oder den Google-Adapter berührt.

## Hebungs-Kandidaten

**WAS ÜBER DIE PHASE HINAUS GILT UND AM PHASENENDE GEHOBEN WIRD.** Je Eintrag: Befund mit
Provenienz, Ziel der Hebung, Bedingung des Entfallens. Die Gattung ist am 2026-09-23
angelegt (OWNER-ENTSCHEIDUNG); die Arbeitsweise zählt sie zu dem, was eine Standdatei trägt.

**HEBUNGS-KANDIDAT P11.7-1 — GIT BASH WANDELT EIN ARGUMENT, DAS MIT `@/` BEGINNT, STILL IN
EINEN WINDOWS-PFAD UM — EINE SUCHE MELDET DANN EINE ABWESENHEIT, DIE DER GEGENSTAND NICHT
HERGIBT.** GEMESSEN (CC, 2026-09-23, Stufe-1-Plan von S3, Gate G1): eine Suche nach
`'@/lib/capi/config'` über `src/` meldete **0** Treffer; mit `MSYS_NO_PATHCONV=1` — die
Variable schaltet die Pfadumwandlung ab — waren es **15** Dateien (zwölf Config-Mocks, der
Wächter, `ingest.ts`, `meta-forward.ts`). Kein Fehler, keine Warnung: das Muster kommt
verändert beim Werkzeug an. ABHILFE: `MSYS_NO_PATHCONV=1` bei jedem Aufruf mit einem solchen
Argument. VERWANDT: docs/immer-beachten.md, "`grep` TAUGT IN DIESER UMGEBUNG WEDER FÜR DAS CR
NOCH FÜR DAS NUL — UND SEIN FEHLSCHLAG SIEHT AUS WIE EIN BEFUND" (die leere `$TMPDIR`) und
"EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND".
ZIEL DER HEBUNG: docs/immer-beachten.md (Weg 1), neben den Werkzeug-Regeln.
ENTFÄLLT, wenn die Arbeitsumgebung nicht mehr Git Bash unter Windows ist.

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
**ZEIGER 2026-09-23 — linkedin:** Die ANNAHME eines erfundenen `li_fat_id` als zweiter Eintrag
neben der IP ist gemessen (VERMERK P11.7-20; linkedin, Teil (bd)); ob ein echter Wert fachlich
abgeglichen wird, ist damit NICHT gezeigt, und das Format bleibt ungelesen.
**ZEIGER 2026-09-24 — tiktok:** `user.ttclid` mit einem erfundenen Wert ist im Testmodus mit
`code 0` quittiert und im Test-Events-Reiter als Parameter "ttclid" angezeigt (VERMERK P11.7-28;
tiktok, Teile (q), (r)); die Quittung allein ist für Feldnamen blind. Ob ein echter Wert
fachlich abgeglichen wird, ist NICHT gezeigt.

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
**ZEIGER 2026-09-24 — tiktok:** Eine Kennung allein in `page.url` zeigt der Test-Events-Reiter
NICHT als Parameter; das Auslesen aus der Adresse ist damit weder bestätigt noch widerlegt
(VERMERK P11.7-28; tiktok, Teil (r)). Die Messung bleibt offen.

**F5 — TIKTOK, DEDUPLIZIERUNG** (Katalog H2). **AUF DOKU-EBENE BEANTWORTET** (Teil (n)):
Schlüssel `[event_source_id, event, event_id]`, Verwurf binnen 48 h, Verschmelzung binnen
5 min, gegen Browser-Pixel UND Events API; der `_ttp`-Weg greift nur OHNE `event_id`.
**MESSUNG OFFEN.**

**F6 — META, VERSIONSANGABE** (Katalog B2). **AUF DOKU-EBENE ENTSCHIEDEN** — für die
Conversions API gilt der Graph-Zeitplan (Teil (v)). **MESSUNG OFFEN:** welche Version Meta
tatsächlich verarbeitet, zeigt erst die Antwort-Kopfzeile (Teil (y)).

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
**ZEIGER 2026-09-24 — FÜR PINTEREST GEMESSEN (VERMERK P11.7-26; pinterest, Teil (al)(iii)):**
120 000 je 60 s, Kategorie `ads_conversions_ad_account_id`, aus den Kopfzeilen dreier
Testanfragen; Owner-Entscheidung E-b ist damit aufgelöst.

**F8 — PINTEREST, ERFOLGSRUMPF** (Katalog G1). **DIE FORM IST GELESEN, DIE FRAGE BLEIBT
EINE MESSFRAGE** (Teil (ah)): `num_events_received`, `num_events_processed`, `events[]` mit
`status`/`error_message`/`warning_message`; ein dokumentierter **TEILERFOLG MIT HTTP 200**;
`processed` und `failed` **ohne abschliessende Enum-Liste**. `evaluateSuccessBody` stimmt
mit der dokumentierten Form überein. **DER AUFRUF IST AM 2026-09-24 GEFAHREN (VERMERK
P11.7-26).**
**ZEIGER 2026-09-24 — F8 IST ERFÜLLT:** Der Erfolgsrumpf ist gemessen (pinterest, Teil (al)(i));
die Roadmap verlangt die Messung des Erfolgsrumpfs (Owner-Entscheidung E-a). **Der Fehlerzweig
"HTTP 200 mit `failed`" ist UNGEMESSEN** — `subscription` wurde angenommen (Teil (al)(ii)) — und
wird beim [x] als unbewiesen benannt.

**WAS EIN CRAWL FÜR LINKEDIN NICHT KLÄRT — FÜNF OFFENE MESSFRAGEN.** Sie stehen getrennt,
weil eine LESUNG sie nicht erreicht. Kein Eintrag ist ein Auftrag.
- **OB `li_fat_id` FACHLICH ANGENOMMEN WIRD.** GEMESSEN angenommen sind **ZWEI von SECHS**
  Symbolen (`SHA256_EMAIL` 2026-08-15, `PLAINTEXT_IP_ADDRESS` 2026-08-17); die vier übrigen
  sind nie gesendet worden. Teile (b), (i), (aj).
  **ZEIGER 2026-09-23 — ZUR HÄLFTE BEANTWORTET:** `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` ist als
  zweiter Eintrag neben der IP gemessen angenommen, damit DREI von SECHS Symbolen (VERMERK
  P11.7-20; Teil (bd)). OFFEN bleiben der fachliche Abgleich (der Wert war erfunden) und die
  Annahme OHNE IP-Eintrag.
  **ZEIGER 2026-09-24 — DIE ANNAHME OHNE IP-EINTRAG IST GEMESSEN:** ein Terminal-Aufruf mit NUR
  `li_fat_id` ergab 201 (VERMERK P11.7-22; Teil (be)). OFFEN bleibt der fachliche Abgleich.
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
seit S2 `202609`, Abschalttermin 15.09.2027 (linkedin, Teil (au)), getragen vom Wächter T1
in `src/lib/capi/version-deadlines.test.ts`; kein Posten.

## Fragen an den Zuschnitt (nach dem Meta-Crawl)

**FRAGEN UND GRENZEN, KEINE ENTSCHEIDUNGEN. KEINE EMPFEHLUNG an irgendeinem Punkt.**
**STAND 2026-09-23: Der Zuschnitt legt Teile von P11.7-1, P11.7-15 und P11.7-25 fest (Abschnitt
"Zuschnitt der Phase 11.7"); S1 hat P11.7-23 eingelöst und P11.7-13 für meta und linkedin
(VERMERK P11.7-10); P11.7-17 ist mit S2 und S3 eingelöst (VERMERKE P11.7-12, P11.7-14); S4
hat die festgelegten Teile von P11.7-15 und P11.7-25 gebaut und Teile von P11.7-5, P11.7-9 und
P11.7-24 eingelöst (VERMERK P11.7-16; je ein Zeiger an der Frage); S5 hat die festgelegten
Teile von P11.7-1 und P11.7-2 gebaut und live belegt, dazu Zeiger an P11.7-5 und P11.7-20
(VERMERK P11.7-18); der Zuschnitt von S6 legt Teile von P11.7-14 und P11.7-16 fest (Abschnitt
"Zuschnitt der Phase 11.7", L1 bis L7), S6a hat den festgelegten Teil von P11.7-14 gebaut und live
belegt, dazu ein Zeiger an P11.7-16 (VERMERK P11.7-20); S6b hat P11.7-16 eingelöst (VERMERK
P11.7-22); der Zuschnitt von S7 legt Teile von P11.7-6 (G1) und P11.7-7 (Owner-Entscheidung vom
2026-09-24) fest, P11.7-8 ist gemessen (VERMERK P11.7-23); S7 hat P11.7-6 für
`landingPageDeviceInfo` eingelöst und P11.7-7 so gebaut, wie entschieden (VERMERK P11.7-24);
S8 hat P11.7-9 eingelöst (T1; VERMERK P11.7-28); S9 hat den festgelegten Teil von P11.7-19
gebaut und live belegt (N1; VERMERK P11.7-30); P11.7-11 ist durch die OWNER-ENTSCHEIDUNG E-f
geschlossen.
ALLE ÜBRIGEN SIND OFFEN.** Wo ein Zusatz eine Hälfte am Code
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
**ZEIGER 2026-09-23 — FÜR DIESE PHASE FESTGELEGT DURCH DEN ZUSCHNITT VON S5** (F1 bis F10):
der Adressweg allein; der Cookie-Weg ist nicht Teil von S5.
**ZEIGER 2026-09-23 — DER ADRESSWEG IST GEBAUT UND LIVE BELEGT (VERMERK P11.7-18):**
`forwardToMeta` bildet `fbc` aus dem `fbclid` der Seitenadresse. Der Cookie-Weg bleibt
weiter ausgeschlossen.

**ZUSCHNITT-FRAGE P11.7-2 — METAS EIGENE EMPFEHLUNG ZUM `_fbc`-COOKIE KOLLIDIERT MIT DER GRENZE DER
DRITTEN DATENKLASSE.** Der Anbieter empfiehlt, `_fbc` selbst als Cookie mit 90 Tagen zu
setzen oder im Backend zu halten (Teil (h)); P11.7-2 nimmt eine selbst gesetzte Kennung von
TRANSIT-ONLY aus. **OHNE EINE NEUE OWNER-ENTSCHEIDUNG IST DER COOKIE-WEG NICHT BAUBAR.**
**DIE FOLGE DES VERZICHTS:** ohne eigene Ablage wäre der Zeitanteil von `fbc` faktisch der
EREIGNISZEITPUNKT statt der ersten Beobachtung; **welche Wirkung das auf den Abgleich hat,
ist UNGEMESSEN.** Wer die Frage bearbeitet, liest zuerst (E2) im Wortlaut.
**ZEIGER 2026-09-23 — DER ZUSCHNITT VON S5 NIMMT DIE FOLGE AN** (F2): `creationTime` ist der
Verarbeitungszeitpunkt; eine zweite Conversion desselben Klicks bekommt einen späteren. Der
Cookie-Weg bleibt ohne neue Owner-Entscheidung unbaubar; die Wirkung bleibt ungemessen.
**ZEIGER 2026-09-23 — GEBAUT MIT S5 (VERMERK P11.7-18):** Der Zeitanteil ist der Moment, in
dem der Server den `fbclid` empfängt. Die Grenze besteht fort: keine erste Beobachtung, und
die Wirkung auf den Abgleich bleibt ungemessen — der Live-Test belegt nur die Annahme.

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
**ZEIGER 2026-09-24 — MATERIAL, KEINE ENTSCHEIDUNG:** Pinterest empfiehlt `external_id` in JEDER
Antwort ausdrücklich — "external_id is missing. We highly recommend this on all events."
(GEMESSEN, drei Läufe mit `?test=true`; VERMERK P11.7-26, pinterest, Teil (al)(iv)).

**ZUSCHNITT-FRAGE P11.7-5 — E3 UND META: DAS ENTFERNEN FREMDER KLICK-KENNUNGEN AUS `event_source_url` IST
NACH DEM GELESENEN VERTRÄGLICH.** Keine der neun Seiten sagt, dass Meta ausliest (Teil
(q)) — **und Metas eigene Bibliothek übergibt in ihrem Beispiel einen Query-String in genau
diesem Feld** (Teil (r)). **KEINE ENTSCHEIDUNG über die Gestalt, keine Aussage über die
vier übrigen Ziele.** **DIE GRENZE:** "verträglich nach dem Gelesenen" ist nicht "gemessen";
bliebe ein `fbclid` in der Adresse und entfiele zugleich ein `fbc`, wäre (q) entscheidend.
**ZEIGER 2026-09-23 — EINGELÖST DURCH S4 (VERMERK P11.7-16):** `event_source_url` geht ohne
fremde Kennungen an meta, `fbclid` bleibt darin; der Live-Test kam an. **OFFEN BLEIBT:** ob
Meta den `fbclid` aus der Adresse verwertet ((q)) — S5 baut `fbc` ausdrücklich.
**ZEIGER 2026-09-23 — S5 GEBAUT (VERMERK P11.7-18):** `fbclid` bleibt in der Adresse, `fbc`
wird zusätzlich gesendet. Der Fall "`fbclid` bleibt, `fbc` entfällt" tritt damit nicht mehr
ein, sobald die Adresse die Kennung trägt; ob Meta (q) liest, bleibt offen.

**ZUSCHNITT-FRAGE P11.7-6 — DER ADAPTER SENDET WEDER IP NOCH USER-AGENT, OBWOHL DER TRANSPORT ZWEI ORTE
DAFÜR KENNT.** Google unterscheidet `eventDeviceInfo` (Ereignis-Zeitpunkt) und
`adIdentifiers.landingPageDeviceInfo` (Landeseite) — **zwei Momente** (google, Teile (m)/E4,
(w)/E1). **DIE FRAGE IST NICHT "OB", SONDERN "WELCHES".** Am Code bestätigt (C9): beide
Werte enden an der Signatur in `FORWARDER_BY_TARGET`; **welcher Ort passt, ist am Code nicht
entscheidbar.** Beide Felder tragen IP und UA, für die P11.7-4 gilt.
**ZEIGER 2026-09-24 — FESTGELEGT DURCH DEN ZUSCHNITT VON S7** (G1): allein
`adIdentifiers.landingPageDeviceInfo`, `ipAddress` und `userAgent` je nur wenn vorhanden;
`eventDeviceInfo` ist nicht Teil von S7.
**ZEIGER 2026-09-24 — EINGELÖST FÜR `landingPageDeviceInfo` (VERMERK P11.7-24):** gebaut in
`883993d`, auf Schema-Ebene gemessen angenommen (google, Teil (cu)). `eventDeviceInfo` bleibt
ausgeschlossen (G1).

**ZUSCHNITT-FRAGE P11.7-7 — DIE ZWEI DMA-EINWILLIGUNGSFELDER EXISTIEREN, BEIDE OPTIONAL.** `Consent` trägt
GENAU ZWEI Felder, `adUserData` und `adPersonalization`, ausweislich seiner Überschrift ein
**DMA-Objekt, kein allgemeiner Einwilligungs-Träger** (google, Teile (w)/I2, (l)/D1).
**OB UND WIE SIE AUS DEM EINWILLIGUNGS-URTEIL GEFÜLLT WERDEN, IST OFFEN.**
**EINE ZWEITE, GETRENNTE OFFENHEIT:** Der Posten "DREI FELDER DER NUTZLAST SIND FRAGEN DER
TRANSPORT-SCHEIBE" nennt als Trigger für `consent` die Phase 11.5, und die ist
abgeschlossen; **ob der Trigger damit eingetreten ist, ist nicht entschieden** — für den
Entfall jenes Postens ohnehin unerheblich, er trägt drei Trigger.
**ZEIGER 2026-09-24 — OWNER-ENTSCHEIDUNG: DIE FELDER WERDEN WEGGELASSEN** (Abschnitt "Zuschnitt
der Phase 11.7", S7). Grund: Der Server kennt nur ein doppeldeutiges Bit (VERMERK P11.7-23,
(f)). Die Frage nach dem Trigger jenes Postens ist damit gegenstandslos; der Punkt consent
ist dort entschieden.
**ZEIGER 2026-09-24 — ENTSCHIEDEN UND SO GEBAUT (VERMERK P11.7-24):** S7 sendet kein
consent-Feld; GF-9g und T10-google halten das fest.

**ZUSCHNITT-FRAGE P11.7-8 — OB EINE SITZUNG DIE VOLLLADUNG FÜR EINEN ZUSCHNITT TRÄGT, IST UNGEMESSEN.**
**DIE AUFTEILUNG (P11.7-9) HAT DIE FRAGE VERKLEINERT, NICHT BEANTWORTET.** Der Pflicht-Stopp
verlangt seit dem 2026-09-22 die Volladung der **Datei des Ziels**; die grösste,
`docs/ziel-befunde/google.md`, trägt **405 265 Bytes** — rund 57 % der Sammel-Datei. **FÜR
DIE ÜBRIGEN VIER IST DIE FRAGE PRAKTISCH KLEIN GEWORDEN, FÜR GOOGLE NICHT.** **WER SIE MIT
DEM VOLLZUG FÜR ERLEDIGT ERKLÄRT, ERKLÄRT EINE ABLEITUNG ZUR MESSUNG.** Die Grenze steht
seit dem 2026-09-22 auch in CLAUDE.md, damit sie das Phasenende überlebt.
**ZEIGER 2026-09-24 — GEMESSEN (OWNER, `/context`), VERMERK P11.7-23:** Volladung der
Standdatei, von google.md (408 302 Bytes) und des Kopfs samt vollständiger Aufklärung belegte
587,4k von 1M Token (59 %), frei 379,6k — auf einem Modell mit 1M Kontext. Für ein Fenster von
rund 200k trägt es nicht (ABLEITUNG). CLAUDE.md ist im selben Zug nachgezogen.

**ZUSCHNITT-FRAGE P11.7-9 — E3 UND TIKTOK: DER URHEBER LIEST SELBST AUS, UND DAMIT TEILT SICH DIE FRAGE.**
TikTok parst `ttclid` aus dem übergebenen `page.url` (tiktok, Teil (m)). **FOLGE FÜR
P11.7-3:** Ein `ttclid` in der an TikTok übergebenen Adresse geht an SEINEN Urheber und ist
verträglich; ein `gclid` oder `fbclid` darin verletzt sie **unverändert**. OFFEN: ob
zusätzlich `user.ttclid` gesendet wird — **ob ein Weg den anderen ersetzt, sagt keine
gelesene Seite.**
**ZEIGER 2026-09-23 — DIE E3-HÄLFTE IST DURCH S4 EINGELÖST (VERMERK P11.7-16):** `page.url`
geht ohne fremde Kennungen an TikTok, `ttclid` bleibt darin. **OFFEN BLEIBT** die Frage nach
`user.ttclid` (S6 bis S9, D9).
**ZEIGER 2026-09-24 — FESTGELEGT DURCH DEN ZUSCHNITT VON S8 (T1) UND EINGELÖST (VERMERK
P11.7-28):** `user.ttclid` wird zusätzlich gesendet, `page.url` behält die eigene Kennung; gebaut
in `b503711`. Der Test-Events-Reiter zeigt `user.ttclid` als Parameter "ttclid", eine Kennung
allein in `page.url` nicht (tiktok, Teil (r)). Ob ein Weg den anderen ersetzt, ist weiter
ungelesen (VERMERK P11.7-27) und nicht gemessen.

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
**GESCHLOSSEN 2026-09-24 — OWNER-ENTSCHEIDUNG E-f** (Abschnitt "Gegenstand der Phase"): im Log
trennbar, eine Kontrollfluss-Unterscheidung ohne eingetretenen Trigger, die Anzeige-Hälfte bei
K4. Die zweite Hälfte oben — welche Codes der Kopfkommentar meint — nimmt S10 mit (Q6).

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

**ZEIGER 2026-09-23 — DIE TABELLE DARÜBER BLEIBT WÖRTLICH:** Die Zeile linkedin gilt dem Stand
vor S2. Seit dem Bau-Commit `5d5602e` sendet der Adapter `202609`, Termin 15.09.2027 (Teil
(au)) — VERMERK P11.7-12.
**ZEIGER 2026-09-23 — DIE ZEILE meta GILT DEM STAND VOR S3:** Seit dem Bau-Commit `9778aca`
sendet der Adapter `v25.0`, Termin 2028-07-29 (Teil (w)); welches Schema gilt, ist auf
Doku-Ebene entschieden (Teil (v)), gemessen nicht (Teil (y)) — VERMERK P11.7-14.


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
**ZEIGER 2026-09-23 — C10 IST RICHTIGGESTELLT (VERMERK P11.7-19, (b)):** T1-a fährt ohne
Adresse und wird durch einen Eintrag aus der Adresse NICHT rot. **FESTGELEGT DURCH DEN
ZUSCHNITT VON S6** (L1 bis L3): der Adressweg wird zugeschnitten, als ZWEITER Eintrag neben
einer gültigen IPv4 (S6a).
**ZEIGER 2026-09-23 — GEBAUT MIT S6a, DIE ANNAHME IST GEMESSEN (VERMERK P11.7-20):** eine Liste mit
IP (Index 0) und `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID` (Index 1) wird angenommen (linkedin,
Teil (bd)). Der Abgleich ist mit dem erfundenen Wert nicht belegt; das Format bleibt ungelesen.

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
**ZEIGER 2026-09-23 — FESTGELEGT DURCH DEN ZUSCHNITT VON S4** (Abschnitt "Zuschnitt der Phase
11.7", D1 bis D9): sie kommt · sie liegt im Adapter (D7) · sie kennt die Kennungen der Tabelle
(D2) · eine unbekannte reist weiter mit (D3) · Entfernen ist S4, Setzen eigener Felder liegt
in S5 bis S9 (D9).
**ZEIGER 2026-09-23 — GEBAUT MIT S4 (VERMERK P11.7-16):** `stripForeignClickIds` und
`CLICK_ID_TABLE` in `src/lib/capi/click-id-strip.ts`, gerufen in den Adaptern von meta, tiktok
und pinterest, bewacht vom Wächter W über alle fünf echten Adapter. **OFFEN BLEIBT** der
zweite Teil der Gestalt — "jedes Ziel erhält nur die seines Urhebers" als eigenes Feld; gebaut
für meta mit S5 (VERMERK P11.7-18), für linkedin mit S6 (VERMERKE P11.7-20, P11.7-22) und für
tiktok mit S8 (VERMERK P11.7-28) und für pinterest mit S9 (VERMERK P11.7-30). Damit ist die
Gestalt für alle Ziele gebaut; google liest seine Kennungen seit jeher über
`extractGoogleClickIds`.

**ZUSCHNITT-FRAGE P11.7-16 — IPv6 BEI LINKEDIN: DER RIEGEL KÖNNTE DEN IP-EINTRAG AUSLASSEN, STATT DEN
GANZEN FORWARD ZU VERWERFEN — WENN EINE ZWEITE KENNUNG VORLIEGT.** **DER GRUND DES RIEGELS
BLEIBT UNBERÜHRT** (s. VERMERK P11.7-5). **DAS IST EINE FOLGEFRAGE VON P11.7-14 UND OHNE
SIE GEGENSTANDSLOS.** Am Code bestätigt (C10): beide Riegel kehren **vor** dem `fetch`
zurück, T2-a bis T2-c decken sie einzeln.
**ZEIGER 2026-09-23 — FESTGELEGT DURCH DEN ZUSCHNITT VON S6** (L1): die Frage ist S6b, und ihr
Zuschnitt folgt erst NACH dem Live-Beleg von S6a; S6a lässt beide Riegel unverändert.
**ZEIGER 2026-09-23 — DIE VORAUSSETZUNG AUS L1 IST ERFÜLLT (VERMERK P11.7-20):** LinkedIn nimmt den
zweiten Eintrag an. **OB `li_fat_id` ALLEIN — ohne IP-Eintrag — ANGENOMMEN WIRD, BLEIBT
UNGEMESSEN** und ist die Messfrage von S6b.
**ZEIGER 2026-09-24 — ZUGESCHNITTEN (Abschnitt "Zuschnitt der Phase 11.7", S6b, B1 bis B7):**
Riegel 1 und 2 brechen nur noch ohne `li_fat_id` ab; mit ihm entfällt allein der IP-Eintrag,
eine IPv6-IP wird nie gesendet (B4). Die Messfrage — ob `li_fat_id` allein angenommen wird —
misst nach B7 in der Fassung vom 2026-09-24 ein Terminal-Aufruf des Owners gegen die
Schnittstelle; über gehostete Seiten auf Label-Hosts ist sie live nicht erreichbar (VERMERK
P11.7-21).
**ZEIGER 2026-09-24 — EINGELÖST (VERMERK P11.7-22):** gebaut in `007a772`; `li_fat_id` allein ist
per Terminal mit 201 angenommen (linkedin, Teil (be)) — das misst den Anbieter; unser Pfad ist
durch T6-g, T6-h und die Mutationen belegt, bis zur Erfolgsantwort durch Ausschluss.

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
**ZEIGER 2026-09-23 — DIE LINKEDIN-HÄLFTE IST EINGELÖST:** `202609`, gebaut und live bestätigt
(VERMERK P11.7-12); die Wendung zu den Conversion-Typen oben liest man mit dem Vorbehalt an
Teil (at) und mit Teil (ax).
**ZEIGER 2026-09-23 — DIE META-HÄLFTE IST EINGELÖST, DAMIT DIE GANZE FRAGE:** `v25.0`, gebaut
und live bestätigt (VERMERK P11.7-14).

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
**ZEIGER 2026-09-24 — GEMESSEN BEANTWORTET, SOWEIT WARNUNG UND ANZEIGE REICHEN (VERMERK
P11.7-29; pinterest, Teile (am), (ao)):** Das Feld `user_data.click_id` wird erkannt (die
Warnung "click_id is missing" entfällt, die Test-Ansicht führt "Klick-ID"); derselbe Wert
allein als `&epik=` in der Adresse wird es nicht. **DER ADRESSWEG ERSETZT DAS FELD NICHT.** Ob
die Zuordnung die Adresse später liest — also ob beide sich ergänzen oder doppeln —, bleibt
OFFEN. Festgelegt für diese Phase durch den Zuschnitt von S9 (N1).
**ZEIGER 2026-09-24 — GEBAUT UND LIVE BELEGT (VERMERK P11.7-30):** `user_data.click_id` wird
zusätzlich zur Adresse gesendet (`024678a`); über den echten Weg zeigt "Events testen" die
Klick-ID genau dann, wenn `epik` in der Adresse stand (pinterest, Teil (as)). Ob sich Feld und
Adresse in der Zuordnung ergänzen oder doppeln, bleibt OFFEN.

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
**ZEIGER 2026-09-23 — UNVERÄNDERT NACH S5 (VERMERK P11.7-18):** Auch das gebaute `fbc` ist nur
verfügbar, solange die Adresse die Kennung trägt; S5 bewahrt nichts auf.

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
**ZEIGER 2026-09-23 — S4 IST DIESE ERSTE STELLE (VERMERK P11.7-16):** `stripForeignClickIds`
nimmt den getrimmten Wert aus `asString` und prüft allein die Parsebarkeit; eine nicht
parsebare Adresse verliert alles ab dem ersten "?" oder "#" (D5). **OFFEN BLEIBT:** eine
Prüfung der Adresse im Handler gibt es weiterhin nicht, und die sechs `asString`-Kopien
bestehen unverändert.

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
**ZEIGER 2026-09-23 — FESTGELEGT DURCH DEN ZUSCHNITT VON S4** (Abschnitt "Zuschnitt der Phase
11.7"): (1) Rückgabe ist die bereinigte Adresse, das Ziel ist Eingabe (D1) · (2) die Eingabe
bleibt die Adresse, Cookie-Wege sind nicht Teil von S4 (D9) · (3) sie entfernt (D1) · (4) Ort
im Adapter, wirft nie (D1, D7) · (5) die `Forwarder`-Signatur wächst nicht (D7) · (6) Eingabe
`unknown` (D1). Punkt (7) berührt keiner der Punkte D1 bis D10.
**ZEIGER 2026-09-23 — GEBAUT MIT S4 (VERMERK P11.7-16):** Punkte (1) bis (6) wie festgelegt;
zu (4) ist GEMESSEN, dass ein Wurf im Adapter die 204 nicht bricht, und der Aufruf liegt nicht
in der synchronen Zone vor dem Fan-Out. **OFFEN BLEIBT** Punkt (7) — "Anwesenheit, nie Form"
als Regel für alle Ziele ist nicht entschieden; die Entfernung prüft ohnehin nur Namen.

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
ist. S1 ist
gebaut (VERMERK P11.7-10). S2
ist mit der Zielversion `202609` gebaut und live bestätigt (VERMERK P11.7-12). S3 ist mit der
Zielversion `v25.0` gebaut und live bestätigt (VERMERK P11.7-14). S4 ist gebaut und live
geprüft; das Entfernen selbst belegt der Wächter, nicht der Live-Test (VERMERK P11.7-16). S5
ist nach den Architekten-Entscheidungen F1 bis F10 gebaut, `fbc` ist live belegt (VERMERK
P11.7-18). S6 (linkedin) ist zugeschnitten (L1 bis L7) und in S6a und S6b geteilt; S6a ist
gebaut, die Annahme des zweiten Eintrags ist live belegt (VERMERK P11.7-20); S6b ist gebaut,
`li_fat_id` allein ist per Terminal angenommen, unser Pfad durch Tests, Mutationen und
Ausschluss belegt (VERMERK P11.7-22). S7 (google) ist nach G1 bis G5 gebaut,
`landingPageDeviceInfo` ist auf Schema-Ebene gemessen angenommen (VERMERK P11.7-24). S8
(tiktok) ist nach T1 bis T5 gebaut, `user.ttclid` ist im Test-Events-Reiter live belegt
(VERMERK P11.7-28). S9 (pinterest) ist nach N1 bis N6 und N9 gebaut, `user_data.click_id` ist in
"Events testen" live belegt (VERMERK P11.7-30). S10 (eine Zeile je angenommenem Forward, alle
fünf Ziele) ist nach Q1 bis Q9 zugeschnitten und nicht gebaut (OWNER-ENTSCHEIDUNG E-e).

**S1 — WÄCHTER, REINE TEST-SCHEIBE. ABGESCHLOSSEN AM 2026-09-23 — VERMERK P11.7-10.**
Gegenstand: der Vorgabewert von `META_GRAPH_VERSION` über einen ECHTEN Import von
`src/lib/capi/config.ts`, der LinkedIn-Endpunkt und die Versions-/Termin-Tabelle aus
ZUSCHNITT-FRAGE P11.7-13, für meta und linkedin. Eingelöst: ZUSCHNITT-FRAGE P11.7-23
vollständig, P11.7-13 für meta und linkedin; Massstab und Mutationsergebnisse im Vermerk.
**WAS DARÜBER HINAUS BINDET:** Entscheidung P11.7-5.

**S2 — ANHEBUNG LINKEDIN, `202601` → `202609`. ABGESCHLOSSEN AM 2026-09-23 — VERMERK
P11.7-12.** Gegenstand: die Modul-Konstante `LINKEDIN_VERSION` samt der Tabellenzeile
linkedin im Versions-Wächter (Entscheidung P11.7-5); mitgenommen Vorrat P11.7-3, -5, -6.
**ZIELVERSION `202609` — OWNER-ENTSCHEIDUNG 2026-09-23.** GRUND: Laut
docs/ziel-befunde/linkedin.md, Teile (aw) und (ax), ändert keine Version zwischen `202601`
und `202609` etwas an einer Nutzlast ohne `userInfo`; damit entscheidet die Laufzeit — bis
15.09.2027 (Teil (au)). VERWORFEN: `202602` (Ablauf 15.02.2027, die zweite Anhebung stünde
einen Monat nach der ersten an). Die Annahme unter `202609` war vor dem Bau eine FOLGERUNG;
der Live-Test hat sie belegt (Teil (bc)).
Der Posten zum 15.01.2027 ist in docs/offene-punkte.md gestrichen, sein Stub in CLAUDE.md
entfernt — im Abschluss-Commit von S2.

**S3 — ANHEBUNG META, `v21.0` → `v25.0`. ABGESCHLOSSEN AM 2026-09-23 — VERMERK P11.7-14.**
Gegenstand: der Vorgabewert von `META_GRAPH_VERSION` in `src/lib/capi/config.ts` samt der
Tabellenzeile meta im Versions-Wächter (Entscheidung P11.7-5); mitgenommen Vorrat P11.7-7.
**ZIELVERSION `v25.0`, ANHEBUNG ÜBER DEN VORGABEWERT — OWNER-ENTSCHEIDUNG 2026-09-23.**
GRÜNDE: (1) Laut docs/ziel-befunde/meta.md, Teil (v), folgt die Conversions API dem
Graph-Zyklus; `v25.0` läuft dort bis 2028-07-29 (Teil (w)) und steht unter der
Marketing-Tabelle auf "TBD", ist also auch dann tragfähig, wenn (v) nicht zuträfe.
VERWORFEN: `v24.0` (Marketing-Termin 2026-10-06) · `v26.0` (kein Termin; der Wächter braucht
einen mit Quelle). (2) Vorgabewert statt Umgebungsvariable, weil nur er vom Wächter gesehen
wird (Kopf von `src/lib/capi/version-deadlines.test.ts`, Grenze (2)); die Variable bleibt als
Notausgang. Die Annahme unter `v25.0` war vor dem Bau eine FOLGERUNG aus Teil (x); der
Live-Test hat sie belegt (Teil (aa)).

**S2 UND S3 ÄNDERN NACH IHREM GEGENSTAND EINE VERSIONSANGABE, KEIN NUTZLAST-FELD.** Die
Owner-Entscheidung führt S4 als erste Scheibe, die eine Kennung durchleitet. **Bringt eine
Zielversion eine Nutzlast-Folge mit, ist diese Einordnung im Stufe-1-Plan jener Scheibe neu
zu prüfen** — der Pflicht-Nachweis bindet an die ERSTE solche Scheibe ("Was den Zuschnitt
bindet"), nicht an eine Nummer.

**S4 — GEMEINSAME STELLE FÜR KLICK-KENNUNGEN, samt Entscheidung P11.7-3.**
**ABGESCHLOSSEN AM 2026-09-23 — VERMERK P11.7-16** (Bau-Commit `de88657`). D1 bis D10 bleiben
als bindende Entscheidungen stehen: sie beschreiben, wie gebaut ist. Gegenstand: die
EINE Stelle aus ZUSCHNITT-FRAGE P11.7-15 und mit ihr die Umsetzung von Entscheidung P11.7-3
(eine Klick-Kennung geht nur an ihren Urheber) — also auch das Entfernen fremder Kennungen
aus der weitergereichten Adresse (P11.7-15; für meta ZUSCHNITT-FRAGE P11.7-5, für tiktok
P11.7-9). Entschieden ist damit aus P11.7-15, DASS die Stelle kommt.
**ERSTE SCHEIBE, DIE EINE KENNUNG DURCHLEITET (OWNER-EINORDNUNG).** Sie trägt:
(a) den Pflicht-Nachweis aus "Was den Zuschnitt bindet" auf Ablage UND Logausgabe — die
Log-Achse ist in VERMERK P11.7-8, die Schreibpfade sind in VERMERK P11.7-15 erhoben; der
Posten "DIE PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST TOT" schliesst mit dem
Abschluss von S4; (b) die harte Auflage aus ZUSCHNITT-FRAGE P11.7-25, Punkt (4): **die Stelle
darf nie werfen** — Punkt (4) begründet das für die beiden Orte vor dem Fan-Out
(INGEST-204-CONTAINMENT).
Sie berührt mehrere Ziele — meta, pinterest und tiktok reichen die Adresse weiter (VERMERK
P11.7-1, Teil (g)); es gilt die Mehr-Ziele-Regel aus "Was den Zuschnitt bindet". Sie ist die
erste Stelle, die die Adresse ANFASST (ZUSCHNITT-FRAGE P11.7-24); die sechs
`asString`-Kopien werden dadurch nicht zum Vorhaben.
**ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-23** (D2 mit OWNER-ENTSCHEIDUNG zum Weg (a),
2026-09-23; Material: VERMERK P11.7-15):
- **D1 — GESTALT:** EINE reine Funktion in EINER reinen Datei (kein `server-only`): Eingabe
  die Adresse (`unknown`) und das Ziel, Rückgabe die Adresse ohne die FREMDEN bekannten
  Klick-Kennungen; die eigene des Ziels und alle übrigen Parameter bleiben unverändert; sie
  wirft nie. Vorbild `extractGoogleClickIds`. Grund: eine Stelle statt fünf, rein und
  wurffrei, damit sie dem Ingest-Pfad keine Wurfquelle hinzufügt und ohne Mocks prüfbar ist.
- **D2 — EINE TABELLE Kennung → Urheber**, je Zeile mit Quelle (Teil der Ziel-Datei). Die
  google-Zeile bezieht ihre Namen aus `CLICK_ID_PARAMS`; dafür wird `CLICK_ID_PARAMS` in
  `src/lib/capi/google-click-ids.ts` EXPORTIERT — sonst ändert sich an Funktion, Vertrag und
  Tests jener Datei nichts. Grund: eine Quelle für dieselben Namen; eine zweite Liste plus
  Gleichlauf-Test verwaltete einen Zustand, den der Export gar nicht entstehen lässt.
  FOLGE: S4 berührt `google-click-ids.ts`; damit tritt der Trigger von Vorrat P11.7-1 ein,
  und S4 nimmt den widerlegten Kopfkommentar jener Datei mit.
- **D3 — NEGATIVLISTE, keine Positivliste:** entfernt werden nur die fremden Kennungen der
  Tabelle. Grund: die Adresse gehört dem Betreiber; URL-basierte Regeln beim Anbieter (etwa
  Custom Conversions) brächen still — dasselbe Prinzip wie `isForwardable`. GRENZE: eine
  Kennung, die nicht in der Tabelle steht, reist weiter mit; die Tabelle wächst additiv, je
  Zeile mit Quelle.
- **D4 — SCHREIBUNG:** Beim ENTFERNEN wird der Parametername ohne Rücksicht auf Gross- und
  Kleinschreibung verglichen; beim HERAUSLESEN (`extractGoogleClickIds`) bleibt es exakt.
  Grund: keine Quelle sagt etwas zur Schreibung des Namens (VERMERK P11.7-15); beim Entfernen
  ist ein Zuviel die sichere Richtung, beim Herauslesen nicht.
- **D5 — NICHT PARSEBARE ADRESSE:** alles ab dem ersten `?` oder `#` entfällt, das Feld bleibt.
  Grund: unverändert durchlassen leakte still; das Feld zu streichen kostete bei meta ein
  Pflichtfeld (`event_source_url`, meta.md, Teil (l)).
- **D6 — NUR DER QUERY-TEIL:** das Fragment einer parsebaren Adresse bleibt unberührt.
  BENANNTE GRENZE: eine Kennung im Fragment reist weiter mit. Grund: die gelesenen
  Parameternamen stehen je Ziel als Query-Parameter (VERMERK P11.7-15); für das Fragment
  liegt kein Befund vor.
- **D7 — ORT: IM ADAPTER**, dort, wo das Adressfeld gebaut wird: meta, tiktok, pinterest. Die
  Adapter von linkedin und google (`linkedin-forward.ts`, `google-forward.ts`) senden keine
  Adresse und bleiben unberührt. Grund: vor dem Fan-Out läge der Aufruf ausserhalb des
  204-Containments und liesse die `Forwarder`-Signatur wachsen (ZUSCHNITT-FRAGE P11.7-25,
  Punkte (4), (5)).
- **D8 — EIN ZENTRALER WÄCHTER-TEST:** alle fünf echten Adapter mit einer Adresse, die ALLE
  Kennungen der Tabelle trägt, auch in abweichender Schreibung; durchsucht wird die GANZE
  ausgehende Nutzlast — die eigene Kennung ist DA, jede fremde FEHLT. Dazu feindliche
  Eingaben, bei denen die Funktion nie wirft. Grund: heute fährt kein Test eine Adresse mit
  Query-String (VERMERK P11.7-15); der Wächter ist die Zentralisierung, die zählt.
- **D9 — NICHT TEIL VON S4:** `fbc` (S5) · eigene Felder für `li_fat_id`, `epik`, `ttclid`
  (S6 bis S9) · die Cookie-Wege (ZUSCHNITT-FRAGE P11.7-26) · Kennungen ausserhalb der
  Tabelle · das Fragment.
- **D10 — LADUNG:** meta, tiktok und pinterest voll plus der Kopf von docs/ziel-befunde.md,
  zusammen 234 269 Bytes (VERMERK P11.7-15). S4 läuft in einem Stück; trägt die Sitzung es
  nicht, wird sie je Ziel geschnitten.
**IM STUFE-1-PLAN BEANTWORTET — GEMESSEN:** ob `ingest.ts` einen synchronen Wurf aus einem
Adapter fängt (Randbefund meta, VERMERK P11.7-15). Ein Wurf im Rumpf eines async-Adapters wird
zur Ablehnung, `allSettled` fängt sie, die 204 bleibt (VERMERK P11.7-16, Mutation m6).

**S5 — META `fbc` ÜBER DEN ADRESSWEG (`fbclid`), erster Konsument von S4. ABGESCHLOSSEN AM
2026-09-23 — VERMERK P11.7-18** (gebaut in `37e3e46`, `fbc` live belegt; F1 bis F10 bleiben
als bindende Entscheidungen stehen). Berührt:
ZUSCHNITT-FRAGE P11.7-1 — für DIESE Phase ist der Adressweg gewählt, der Cookie-Weg ist
ausgeschlossen · P11.7-2 (Zuschnitt-Frage) — ohne eigene Ablage ist der Zeitanteil von `fbc`
faktisch der Ereigniszeitpunkt, die Wirkung ungemessen · P11.7-5 · P11.7-20 — die Kennung
ist nur verfügbar, solange die Adresse sie trägt · Entscheidung P11.7-2 (`fbc` gleich welchen
Trägers unter TRANSIT-ONLY).
PFLICHT DAVOR: Volladung docs/ziel-befunde/meta.md plus Kopf.
NICHT dazu: das `_fbc`-Cookie in beiden Formen · der Pflichtfeld-Riegel (je unten).
**ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-23** (Material: VERMERK P11.7-17):
- **F1 — FORMAT:** `fbc = "fb.1.<creationTime>.<fbclid>"`, subdomainIndex 1. Grund:
  docs/ziel-befunde/meta.md, Teil (h), für die serverseitige Bildung ohne Cookie.
- **F2 — ZEIT:** `creationTime = Date.now()` im Adapter, Millisekunden. Grund: der Server
  empfängt den `fbclid` mit diesem Beacon zum ersten Mal ("first observed or received").
  GRENZE: eine zweite Conversion desselben Klicks bekommt einen späteren Zeitpunkt
  (ZUSCHNITT-FRAGE P11.7-2); ohne Ablage nicht vermeidbar.
- **F3 — HERAUSLESEN:** `fbclid` EXAKT unter dem Namen "fbclid" (D4), aus der von S4
  BEREINIGTEN Adresse; erstes Vorkommen; leer oder fehlend → kein `fbc`; nicht parsebar →
  kein `fbc`. Grund: beim Herauslesen ist ein Zuviel die falsche Richtung.
  **ZEIGER 2026-09-23:** "aus der BEREINIGTEN Adresse" gilt durch den EINSATZPUNKT — gelesen
  wird die Variable, die gesendet wird; eine Probe darauf ist äquivalent (Mutation m6
  entfallen, VERMERK P11.7-18).
- **F4 — DER WERT:** so, wie ein Standard-Parser ihn aus dem Query-String liefert (dekodiert);
  keine Formprüfung ("Anwesenheit, nie Form"). Grund: kein Riegel ohne gelesene Formregel.
  GRENZE: zu Kodierung und Fehlform schweigt die Quelle; echte Werte bestehen aus
  `[A-Za-z0-9_-]` und sind davon nicht berührt.
- **F5 — ORT DER FUNKTION:** eine neue exportierte, exakte, wurffreie Funktion in
  `src/lib/capi/click-id-strip.ts` nach dem Muster von `extractGoogleClickIds`; jene bleibt
  unberührt. Grund: die Klick-Kennungen bleiben an einer Stelle, ohne den Google-Vertrag zu
  öffnen.
- **F6 — EINSATZ:** `user_data.fbc` nur, wenn ein `fbclid` vorliegt; gebaut, wo `user_data`
  heute entsteht (vor dem `try` — daher F5 wurffrei), die Aufzählung in Vertragssatz 1 wird
  nachgezogen. Grund: kein Umbau des Adapters für ein Feld.
- **F7 — DATENKLASSE:** (E2) nennt `fbc` "aus dem Klick-Parameter der Adresse gebildet"
  ausdrücklich unter TRANSIT-ONLY; Präfix und Zeitanteil sind Format, keine eigene Identität.
  Keine Ablage, kein Log, kein Hashen. GRENZE: spiegelte Meta `fbc` in eine Fehlermeldung,
  bliebe der Zeitanteil nach `redactOpaque` lesbar.
- **F8 — BEACON UNVERÄNDERT:** `fbc` gibt es nur bei Ereignissen des Klick-Beacons; PageView
  und Bestätigung tragen keine Adresse. Grund: kein neues Beacon-Feld in dieser Phase.
- **F9 — EIGENE TESTS:** Tests, die `fbc` POSITIV fordern. Grund: kein bestehender Test nagelt
  `user_data` fest, und W bleibt ohne `fbc` grün.
- **F10 — LIVE:** ein realistischer `fbclid`; die Ablesung "Benutzer-Datenschlüssel" beim
  Server-Ereignis ist eine MESSUNG DES INSTRUMENTS — erscheint eine Klick-ID, ist `fbc` live
  belegt; sonst unentschieden, der Beweis bleiben die Tests. Grund: für `fbc` ist keine
  Oberfläche belegt (VERMERK P11.7-17).
**NICHT TEIL VON S5:** der `_fbc`-Cookie-Weg · ein eigenes Cookie · eine Lesung der
dataset-quality-Seite · eine Formprüfung.

**S6 BIS S9 — JE ZIEL, IN DIESER REIHENFOLGE: S6 linkedin, dann google, tiktok, pinterest.**
**OWNER-ENTSCHEIDUNG 2026-09-23: LINKEDIN KOMMT ALS S6 ZUERST.** Grund: das einzige Ziel ohne
jede Klick-Kennung; die übrigen bekommen ihre eigene schon über die Adresse (tiktok,
pinterest) bzw. über `adIdentifiers` (google). Die Reihenfolge danach ist ein
Architekten-Vorschlag, vom Owner mit der Wahl bestätigt. Je Scheibe gilt der Pflicht-Stopp mit
der Datei ihres Ziels.
- **S6 — linkedin `li_fat_id`** — ZUSCHNITT-FRAGE P11.7-14 und ihre Folgefrage P11.7-16;
  Material VERMERK P11.7-19. T1-a fährt ohne Adresse und wird durch einen Eintrag aus der
  Adresse NICHT rot (Richtigstellung zu VERMERK P11.7-8, C10, in VERMERK P11.7-19).
  **S6a ABGESCHLOSSEN AM 2026-09-23 — VERMERK P11.7-20** (Bau-Commit `09476b9`; die Annahme des
  zweiten Eintrags ist live belegt). L1 bis L7 bleiben als bindende Entscheidungen stehen: sie
  beschreiben, wie gebaut ist, und L1 bindet den Zuschnitt von S6b.
  **ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-23:**
  - **L1 — TEILUNG:** S6a = `li_fat_id` als ZWEITER Eintrag neben einer gültigen IPv4, die
    Riegel bleiben unverändert (R-A). S6b = die Riegel als Filter je Eintrag (R-B,
    ZUSCHNITT-FRAGE P11.7-16), eigener Zuschnitt ERST NACH dem Live-Beleg von S6a. Grund: R-B
    setzt voraus, dass LinkedIn den Eintrag annimmt; das misst erst S6a.
  - **L2 — EINTRAG:** idType `LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID`, idValue der Wert
    unverändert. Grund: docs/ziel-befunde/linkedin.md, Teile (i), (aj), (an), (ao).
  - **L3 — HERAUSLESEN:** EXAKT unter dem Namen `li_fat_id` aus `body.eventSourceUrl`; erstes
    Vorkommen; leer, fehlend oder nicht parsebar → kein Eintrag; der Wert wie vom
    Standard-Parser dekodiert; keine Formprüfung. Grund: linkedin sendet keine Adresse, die
    Bereinigung aus S4 betrifft es nicht, und beim Herauslesen ist ein Zuviel die falsche
    Richtung (D4).
  - **L4 — BAUSTEIN:** ein allgemeiner exakter, wurffreier Kern in
    `src/lib/capi/click-id-strip.ts` (Name vom Plan); `extractFbclid` DELEGIERT daran — Name
    und Vertrag unverändert, `meta-forward.ts` unberührt, X-a bis X-h bleiben als Nachweis.
    Grund: zweiter Nutzer; S8 und S9 bringen zwei weitere.
  - **L5 — DATENKLASSE:** TRANSIT-ONLY über den Block vom 2026-08-28 ("künftige
    Klick-Kennungen anderer Anbieter", Herkunftskriterium) und (E3); keine Ablage, kein Log,
    kein Hashen. Grund: fremde Urheberschaft, Rückgabe an den Urheber. GRENZE: in einer
    422-Meldung zurückgespiegelt, schwärzt `redactOpaque` den Wert nur ab 20 Zeichen aus
    `[A-Za-z0-9_-]`; das echte Format ist ungelesen.
  - **L6 — TESTS:** T1-a bleibt als Fall OHNE Adresse; NEU ein erschöpfender Test MIT
    Adresse, der die ganze Nutzlast mit beiden Einträgen festnagelt. Wächter W: die
    linkedin-Erwartung wird je Lauf getrennt — Tabellen-Schreibung: die eigene Kennung GEHT
    hinaus; abweichende Schreibung: nicht (exakt, L3); die Adresse selbst und utm gehen weiter
    NICHT hinaus. Grund: T1-a deckt den Adressweg nicht (VERMERK P11.7-19, (b)).
  - **L7 — LIVE:** Instrument ist die ANNAHME — "Data last received" springt, und es entsteht
    keine Zeile "[capi] LinkedIn forward rejected"; ein realistischer erfundener Wert. NICHT
    belegbar: der Abgleich (die Match-Rate braucht einen echten Wert). Grund: VERMERK
    P11.7-19, Nicht-Treffer zum Instrument.
  **NICHT TEIL VON S6a:** R-B/IPv6 (S6b) · der Cookie-Weg und das Insight Tag · `externalIds`
  · die gehashten Namensfelder.
  **S6b — `li_fat_id` ALLEIN, WENN DIE IP NICHT TRÄGT. ABGESCHLOSSEN AM 2026-09-24 — VERMERK
  P11.7-22** (Bau-Commit `007a772`). B1 bis B7 bleiben als bindende Entscheidungen stehen: sie
  beschreiben, wie gebaut ist. Mit S6b ist S6 abgeschlossen.
  Gegenstand: die Riegel 1 und 2 als Filter je Eintrag (L1, R-B; ZUSCHNITT-FRAGE P11.7-16);
  die Voraussetzung aus L1 ist erfüllt (VERMERK P11.7-20).
  **ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-23** (festgehalten am 2026-09-24; Material:
  VERMERKE P11.7-19, P11.7-20):
  - **B1 — RIEGEL 1 UND 2 BRECHEN NUR NOCH OHNE `li_fat_id` AB:** Fehlt die IP (Riegel 1) oder
    ist sie nicht IPv4 (Riegel 2), bricht der Forward nur noch ab, wenn ZUSÄTZLICH kein
    `li_fat_id` vorliegt; liegt eines vor, entfällt allein der IP-Eintrag, und `userIds` trägt
    nur `li_fat_id`. Grund: laut docs/ziel-befunde/linkedin.md, Teil (ao), genügt EINE Kennung
    der Oder-Liste, und ein Riegel, der trotz gültiger Kennung den ganzen Forward verwirft,
    verliert die Conversion ohne Not — ob der Endpunkt das annimmt, ist ungemessen und misst B7.
  - **B2 — DIE LOGTEXTE BLEIBEN UNVERÄNDERT:** "missing identity" und "identity is not IPv4"
    fallen nur noch im Fall ohne Klick-Kennung; T2-a und T2-b bleiben unverändert. Grund: ohne
    Klick-Kennung ist die IP die einzige Kennung, also sagt jeder Text genau das, was in seinem
    Fall zutrifft — und beide Tests fahren ohne Adresse (Rumpf `{}`, GEMESSEN am Test).
  - **B3 — KEINE LOGZEILE, WENN DER IP-EINTRAG ENTFÄLLT UND DER FORWARD LÄUFT.** Grund: das ist
    der Normalfall eines IPv6-Besuchers mit LinkedIn-Anzeige, und eine Zeile je Ereignis wäre
    Rauschen, an das keine Entscheidung knüpft.
  - **B4 — EINE IPv6-IP WIRD NIE GESENDET, NUR WEGGELASSEN; DER GRUND VON RIEGEL 2 BLEIBT.**
    Grund: die Schnittstelle prüft die Form des Kennungs-Werts nicht (Teil (j)), und beide
    IP-Symbole nennen nur IPv4 (Teil (ao)) — ein IPv6-Wert ginge als Erfolg hinaus und liefe
    ins Leere.
  - **B5 — T6-g UND T6-h WERDEN BEWUSST UMGESCHRIEBEN;** ihre Änderung ist der sichtbare Kern
    des Diffs. Grund: sie nageln das Verhalten von S6a fest — je genau einer von ihnen fing in
    S6a die Mutation "Riegel als Filter" (m7a, m7b, VERMERK P11.7-20).
  - **B6 — VERTRAGSSATZ 1 von `linkedin-forward.ts` WIRD NUR ANGEFASST, WENN DER BAU ES
    VERLANGT;** sonst bleibt Vorrat P11.7-8 bei seinem Trigger. Grund: ein Vertragssatz,
    nebenbei umgeschrieben, schwächte eine Schutzregel ohne eigene Entscheidung (wie E5 in S4) —
    und der Satz verlangt nur, dass Riegel und Nutzlast-Bau INNERHALB des `try` liegen, wo
    `extractLiFatId` heute schon steht (GEMESSEN am Code).
  - **B7 — DER NACHWEIS (ERSETZT AM 2026-09-24, SACHKORREKTUR NACH VERMERK P11.7-21):** Für
    gehostete Seiten auf Label-Hosts ist ein Live-Beleg der neuen Zweige nicht möglich; unser
    Pfad wird durch die Tests und die Mutationen belegt. Ob LinkedIn eine Nutzlast mit NUR
    `li_fat_id` annimmt, misst der Owner per Terminal-Aufruf direkt gegen die Schnittstelle —
    das misst den ANBIETER, nicht unseren Code-Pfad. Dazu eine Regression über die Live-Seite
    (IPv4, mit `li_fat_id`, wie S6a). Ein Live-Beleg über eine exportierte Seite oder eine
    Kunden-Domain mit IPv6 ist NICHT Teil von S6b. Grund: die Label-Hosts haben keinen
    AAAA-Eintrag, eine gehostete Seite liefert dem Ingest also heute keine IPv6-Adresse
    (docs/plattform-befunde.md, Abschnitt "Vercel …", Teil (h)). Die frühere Fassung — Live aus
    einem IPv6-Netz, R1 als Positivkontrolle, S1 als Beleg — steht unter Commit `dea8487`.
  **OWNER-ENTSCHEIDUNG 2026-09-24 — S6b WIRD GEBAUT, AUCH WENN DIE NEUEN ZWEIGE FÜR GEHOSTETE
  SEITEN AUF LABEL-HOSTS HEUTE NICHT ERREICHBAR SIND.** Grund: Bekommt die Serving-Domain IPv6,
  wären IPv6-Besucher mit LinkedIn-Anzeige sonst ab diesem Tag still verloren; der gebaute
  Filter deckt das vorab ab und macht einen offenen Punkt mit Trigger überflüssig. Dazu: Für
  exportierte Seiten und Kunden-Domains ist offen, ob IPv6 heute schon ankommt (VERMERK
  P11.7-21, Grenzen) — wenn ja, verwirft Riegel 2 deren LinkedIn-Conversions schon heute.
  **NICHT TEIL VON S6b:** eine IPv6-IP senden, in keiner Form · Riegel 3 (keine Regel-URN für
  das Ereignis) · der Cookie-Weg.
- **S7 — google: Gerätedaten in `landingPageDeviceInfo`, DMA-Felder weggelassen. ZUGESCHNITTEN
  AM 2026-09-24** — ZUSCHNITT-FRAGE P11.7-6, P11.7-7; Entscheidung P11.7-4; Material VERMERK
  P11.7-23.
  **ABGESCHLOSSEN AM 2026-09-24 — VERMERK P11.7-24** (Bau-Commit `883993d`;
  `landingPageDeviceInfo` auf Schema-Ebene gemessen angenommen). G1 bis G5 und die
  Owner-Entscheidung zu den DMA-Feldern bleiben als bindende Entscheidungen stehen: sie
  beschreiben, wie gebaut ist. PFLICHT DAVOR: Volladung docs/ziel-befunde/google.md plus Kopf — auf einem Modell
  mit 1M Kontext gemessen tragbar (ZUSCHNITT-FRAGE P11.7-8).
  **ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-24:**
  - **G1 — GERÄTEDATEN NUR IN `adIdentifiers.landingPageDeviceInfo`:** `ipAddress` und
    `userAgent`, je nur wenn vorhanden. Grund: Der Beacon feuert auf der Landeseite selbst; das
    Feld liegt in der Diagnose-Kategorie `ad_identifiers`, ist im Session-Attribut-Weg Pflicht
    und steht in der Kennungsliste der Gestalt (docs/ziel-befunde/google.md, Teile (m)/E1,
    (m)/E4, (cc)/(c)), während die Diagnose `eventDeviceInfo` nicht kennt (Teile (r), (u)).
    GRENZE: Was Google damit tut, ist ungelesen und ungemessen.
  - **G2 — DER gclid-RIEGEL BLEIBT.** Grund: Ob eine IP ALLEIN genügt (Teil (m)/E3), ist eine
    Folgefrage nach dem Live-Beleg von S7 — wie S6b nach S6a.
  - **G3 — DAS LAMBDA `FORWARDER_BY_TARGET.google` REICHT `clientIp` UND `userAgent` WEITER;
    DER TYP `Forwarder` BLEIBT UNVERÄNDERT.** Grund: Beide Werte stehen schon an der Signatur
    und enden heute dort (VERMERK P11.7-23, (d)); dieselbe Lage wie bei linkedin.
  - **G4 — IP UND UA SIND TRANSIT: NIE ABGELEGT, NIE GELOGGT.** Grund: DATENKLASSEN-GRENZE,
    Präzisierung vom 2026-08-19, und Entscheidung P11.7-4.
  - **G5 — DIE KOMMENTARE AN `forwardToGoogle` UND AM LAMBDA, DIE DEN VERZICHT MIT "die Gestalt
    trägt KEIN Feld für eine Besucher-Adresse" BEGRÜNDEN, WERDEN RICHTIGGESTELLT.** Grund:
    widerlegt durch die Teile (cc)/(c) und (m)/E1.
  **OWNER-ENTSCHEIDUNG 2026-09-24 — DIE DMA-EINWILLIGUNGSFELDER WERDEN WEGGELASSEN** (an S7 und
  an ZUSCHNITT-FRAGE P11.7-7). Grund: Der Server kennt nur ein doppeldeutiges Bit — "google
  erlaubt" heisst zugestimmt ODER kein Dialog (VERMERK P11.7-23, (f)); die Felder zu setzen
  hiesse, eine Einwilligung zu behaupten, die der Server nicht kennt — ein drittes Urteil.
  Google stützt sich dann auf die Einstellungen im Konto des Betreibers (Wortlaut
  `UNKNOWN_CONSENT`, Teil (x)/I2). GRENZE: Was Google für Nutzer im EWR ohne die Felder tut,
  steht nicht in der Quelle.
  **NICHT TEIL VON S7:** `eventDeviceInfo` · `category` · `language_code` · eine Änderung am
  gclid-Riegel · die DMA-Felder.
- tiktok `ttclid` — ZUSCHNITT-FRAGE P11.7-9 (ob zusätzlich `user.ttclid`), P11.7-10.
  **S8 — ABGESCHLOSSEN AM 2026-09-24 — VERMERK P11.7-28** (Bau-Commit `b503711`; `user.ttclid`
  im Test-Events-Reiter live belegt). T1 bis T5 bleiben als bindende Entscheidungen stehen: sie
  beschreiben, wie gebaut ist. Dazu Entscheidung P11.7-6 (Paar-Riegel). ZUSCHNITT-FRAGE P11.7-10
  ist in S8 nicht bearbeitet und bleibt offen. **T6 (das Live-Instrument) ist mit dem Abschluss
  entfallen** — es wies allein S8 an; sein Ergebnis steht in VERMERK P11.7-28 und in
  docs/ziel-befunde/tiktok.md, Teil (r). Ein Zeiger auf "T1 bis T6" landet hier.
  **ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-24:**
  - **T1 — `user.ttclid` WIRD ZUSÄTZLICH GESENDET; `page.url` BEHÄLT DIE EIGENE KENNUNG (S4).**
    Grund: docs/ziel-befunde/tiktok.md, Teil (j), empfiehlt `user.ttclid` für alle Ereignisse;
    zu einem Widerspruch beider Wege sagt die Quelle nichts (Nicht-Treffer, VERMERK P11.7-27).
  - **T2 — GELESEN ÜBER DIE HÜLLE `extractTtclid` AM KERN `readClickIdExact`**, aus der
    Adresse, die `page.url` bildet; exakt, erstes Vorkommen, `""` → kein Feld. Roh und bereinigt
    sind für die eigene Kennung gleich (FOLGERUNG wie S5, Mutation m6). Der Wert kommt dekodiert,
    `page.url` trägt ihn roh (Kopfkommentar von `extractTtclid`).
    Grund: dritter Nutzer des Kerns, bestehende Verträge bleiben unberührt (VERMERK P11.7-27, (d)).
  - **T3 — KEINE FORMPRÜFUNG, KEIN KÜRZEN.** Grund: die Quelle nennt bis 1 000 Zeichen und
    verlangt, nicht abzuschneiden (Teil (j)). Auf unserem Weg kürzt nichts (VERMERK P11.7-28).
  - **T4 — TRANSIT-ONLY.** Grund: der Block vom 2026-08-28 nennt TikTok ausdrücklich, dazu (E3)
    (docs/offene-punkte.md, "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE"). GRENZE: in einer
    gespiegelten Fehlermeldung bliebe ein Vorsatz wie `E.C.P.` nach `redactOpaque` lesbar
    (FOLGERUNG am Beispielwert).
  - **T5 — W BEWACHT `user.ttclid` NICHT;** das Feld tragen TT-a bis TT-j
    (`tiktok-forward.test.ts`), die Hülle TX-a bis TX-h (`click-id-strip.test.ts`); T10 bleibt
    der Fall ohne Adresse. Den Einsatzpunkt im `try` fängt allein T20 (VERMERK P11.7-28, m5).
  **FELDER IN `user.*`, DIE S8 NICHT SENDET, je mit Grund (erledigt, nicht offen):** `ttp` —
  Cookie-Weg, ausgeschlossen (ZUSCHNITT-FRAGE P11.7-26) · `email`, `phone`, `first_name`,
  `last_name`, `city`, `state`, `country`, `zip_code` — Personendaten, durch die Roadmap-Grenze
  ausgeschlossen · `external_id` — offene Owner-Frage (ZUSCHNITT-FRAGE P11.7-4) · `idfa`, `idfv`,
  `gaid`, `att_status` — Kennungen von Apps.
- pinterest `epik` — ZUSCHNITT-FRAGE P11.7-19.
  **BEFUND 2026-09-24 — KEINE ENTSCHEIDUNG** (VERMERK P11.7-26; docs/ziel-befunde/pinterest.md,
  Teil (al)(iv)): `evaluateSuccessBody` (`src/lib/capi/pinterest-forward.ts`) macht aus jeder
  nicht leeren Warnung eine Logzeile, und jede Antwort trägt "external_id is missing" — **in
  Produktion schreibt damit JEDER Pinterest-Forward eine Warnzeile**; nach S9 bleibt "external_id
  is missing" stehen. Zwei Seiten: Rauschen, das echte Warnungen verdeckt · zugleich heute die
  einzige Sichtbarkeit eines Erfolgs (Gegenstück bei LinkedIn: Vorrat P11.7-9).
  **DIE DREI VORMERKUNGEN FÜR S9 SIND ERLEDIGT:** Prüfsumme im Kopf und Zeiger an (p)(2) von
  docs/ziel-befunde/pinterest.md mit VERMERK P11.7-29, der Kopfkommentar zum Erfolgs-Rumpf im
  Bau-Commit `024678a` (VERMERK P11.7-30). Ihr Wortlaut steht unter Commit `e588c77`.

**S9 — ZUGESCHNITTEN AM 2026-09-24 — pinterest `user_data.click_id` aus `epik`.**
ZUSCHNITT-FRAGE P11.7-19; Material VERMERK P11.7-29 und die Aufklärung desselben Tages.
**ABGESCHLOSSEN AM 2026-09-24 — VERMERK P11.7-30** (Bau-Commit `024678a`; `user_data.click_id` in
"Events testen" live belegt). N1 bis N6 und N9 bleiben als bindende Entscheidungen stehen: sie
beschreiben, wie gebaut ist. Dazu Entscheidung P11.7-7 (Paar-Riegel). **N7 (das Live-Instrument)
und N8 (die Mitnahme in den Bau) sind mit dem Abschluss entfallen** — sie wiesen allein S9 an;
ihr Ergebnis steht in VERMERK P11.7-30 und in docs/ziel-befunde/pinterest.md, Teil (as), ihr
Wortlaut unter Commit `e588c77`. Ein Zeiger auf "N1 bis N9" landet hier.
**ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-24** (Kennbuchstaben N, frei im Bestand):
- **N1 — `user_data.click_id` WIRD ZUSÄTZLICH GESENDET; `event_source_url` BEHÄLT `epik` ROH
  (S4).** Grund GEMESSEN: Eine Kennung allein in der Adresse wird für Warnung und Anzeige
  nicht erkannt, das Feld schon (docs/ziel-befunde/pinterest.md, Teile (am), (ao)). Ob die
  Zuordnung die Adresse später liest, bleibt offen; das Feld zu senden hängt daran nicht.
- **N2 — GELESEN ÜBER EINE HÜLLE AM KERN `readClickIdExact` FÜR `epik`:** exakt, erstes
  Vorkommen, `""` → kein Feld, der Wert dekodiert. Gelesen wird die BEREINIGTE Adresse im
  `try`, nach ihrem Bau in `forwardToPinterest`; `userData` wird dort ergänzt. Gebaut als
  `extractEpik` (`src/lib/capi/click-id-strip.ts`). Grund: vierter Nutzer des Kerns,
  bestehende Verträge bleiben unberührt (wie T2 von S8).
- **N3 — KEINE KÜRZUNG, KEINE FORMPRÜFUNG.** Grund: Der Bestand trägt keine Formregel (Teil
  (ac)), und ein Wert mit `+` und `%2B` wird angenommen (Teil (ap)).
  **DEKODIER-GRENZE:** Die Hülle liefert den Wert dekodiert; ein `+` wird zum Leerzeichen.
  Anders als bei tiktok ist die rohe Form in der Adresse bei Pinterest als Rückfall NICHT
  belegt — die Adresse allein wird nicht erkannt (Teil (ao)). Teil (ap) sagt nichts über roh
  gegen dekodiert. Die Grenze wird neu bewertet, sobald ein ECHTER `epik`-Wert beobachtet ist.
- **N4 — TRANSIT-ONLY.** Grund: der Block vom 2026-08-28 (Kriterium HERKUNFT, "künftige
  Klick-Kennungen anderer Anbieter … und weitere") und (E3) (docs/offene-punkte.md,
  "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE"); kein Hashen, Teil (ae) "Hashen: nein".
  GRENZE: Ein Echo in unsere Logzeile ist nur im ERFOLGSZWEIG ausgeschlossen (Teil (aq));
  Fehlerzweige sind ungemessen, und `sanitizeProviderText` schwärzt erst ab 20 Zeichen aus
  `[A-Za-z0-9_-]`.
- **N5 — AUF ALLEN FORWARDBAREN EREIGNISSEN, NICHT NUR AUF DEN ACHT AUS (ac).** Grund: Die
  Kennung gehört zum Besuch, nicht zum Ereignistyp, und ein Verbot für andere Typen ist nicht
  gelesen. Faktisch trägt sie nur ein Ereignis des Klick-Beacons, weil nur er die Adresse
  sendet (VERMERK P11.7-1, (a), (c)).
- **N6 — TESTS:** Fälle MIT Adresse halten `user_data` als Ganzes fest; T8
  (`pinterest-forward.test.ts`) bleibt der Fall ohne Adresse; Wächter W bewacht `click_id`
  NICHT (der Wert steht ohnehin in `event_source_url`), er deckt weiter, dass kein anderes
  Ziel `epik` trägt. Das Feld tragen PC-a bis PC-i (`pinterest-forward.test.ts`), die Hülle
  EX-a bis EX-h (`click-id-strip.test.ts`). Den Einsatzpunkt im `try` fängt allein T19
  (werfender Getter), das Pendant zu T20 bei tiktok (VERMERK P11.7-30, m4).
- **N9 — NICHT TEIL VON S9**, je mit Grund: `external_id` — offene Owner-Frage
  (ZUSCHNITT-FRAGE P11.7-4) · Personendaten — Roadmap-Grenze und F3 · `customer_type`,
  `app_info` — E-c · `partner_id` — "Use only if you are a Pinterest integration partner"
  (Teil (ae)), das sind wir nicht · der Cookie-Weg `_epik` und seine Namensvariante `ptk`
  (Teile (ac), (ai)(1)) — ZUSCHNITT-FRAGE P11.7-26 · jede Änderung an der Warnzeile oder an
  `sanitizeProviderText` — Vorrat P11.7-9.
Dazu Entscheidung P11.7-7 (Paar-Riegel bleibt).

**S10 — ZUGESCHNITTEN AM 2026-09-24 — eine Zeile je angenommenem Forward, alle fünf Ziele.**
Vorrat P11.7-9, OWNER-ENTSCHEIDUNG E-e (K1); Material der Entscheidungsbericht desselben Tages.
**Nicht gebaut.** NICHT ZU VERWECHSELN mit dem Seiten-Kürzel "S10" im LinkedIn-Crawl (VERMERK
P11.7-19); dort sind S1 bis S11 Doku-Seiten, keine Scheiben.
**ZUSCHNITT — ARCHITEKTEN-ENTSCHEIDUNGEN 2026-09-24** (Kennbuchstaben Q, frei im Bestand —
GEMESSEN, CC: `\bQ[0-9]` 0 Treffer vor dieser Runde). Sie sind ZIELÜBERGREIFEND formuliert und
treffen keine Aussage über ein einzelnes Ziel:
- **Q1 — JE ADAPTER GENAU EINE ZEILE, WENN EINE ANTWORT ANGENOMMEN IST.** "Angenommen" ist GENAU
  der Zweig, den der Adapter heute als Erfolg wertet — KEIN neues Urteil. Welcher Zweig das je
  Ziel ist, stellt der Stufe-1-Plan der Teilscheibe fest, unter Volladung der Ziel-Datei.
  Grund: E-e; eine Zeile, die ein eigenes Urteil fällte, wäre eine zweite Auswertung neben der
  bestehenden.
- **Q2 — INHALT:** das Präfix der bestehenden Zeilen, das Ziel, der HTTP-Status. Das Wort sagt
  "angenommen", NICHT "erfolgreich" oder "gesendet" — ein Meldungstext behauptet kein Ergebnis
  (docs/immer-beachten.md, safeAction-Regel, letzter Absatz), und eine 2xx-Antwort belegt die
  Annahme, nicht die Verarbeitung (E-e). NICHTS aus Anfrage oder Antwort: keine Nutzlast, keine
  IP, kein User-Agent, keine Kennung, kein Zugangsdatum — TRANSIT-ONLY (docs/offene-punkte.md,
  "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE"; Entscheidung P11.7-4).
- **Q3 — LOG-STUFE INFO, NICHT ERROR.** Präzedenz im Bestand: `console.info` für die
  Erfolgszeile der OAuth-Rückkehr (`src/app/api/oauth/google/callback/route.ts`, GEMESSEN).
  Bestehende Fehler- und Warnzeilen bleiben unverändert, auch die Pinterest-Warnzeile und
  `sanitizeProviderText`.
- **Q4 — GRENZE UND KIPPBEDINGUNG:** eine Zeile je angenommenem Forward, also je Conversion und
  Ziel, auf dem meistgetroffenen Pfad. Neu zu bewerten bei echtem Traffic oder bei einer
  Log-Grenze des Plans — dann K4 oder eine Stichprobe.
- **Q5 — TESTS JE ADAPTER:** die Zeile genau EINMAL bei Erfolg, mit POSITIVKONTROLLE auf Ziel und
  Status, und die Abwesenheit jedes Werts aus der Anfrage. In KEINEM Fehler- oder Riegel-Pfad
  entsteht die Zeile. Bestehende Tests, die die STILLE im Erfolg festhalten, benennt der Plan
  einzeln mit ihrem Grund (bekannt ist T1 in `pinterest-forward.test.ts`, "verarbeitet, keine
  Warnung -> KEINE Meldung"; er liest nur `console.error`).
- **Q6 — MITNAHME:** der Kopfkommentar von `src/lib/capi/tiktok-forward.ts`, Punkt 4 ("zwei
  verschiedene Codes teilen sich HTTP 401 (gemessen)"), und der Kommentar im Antwort-Zweig von
  `forwardToTiktok` ("falsche Kennung" gegen "falsches Zugangsdatum") — nach dem, was
  docs/ziel-befunde/tiktok.md belegt: `40100` und `40104` je HTTP 401, GELESEN (Teil (o)).
  Welche Codes die Messung vom 2026-08-11 ergab, ist nicht festgehalten
  (docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Live-Test: "HTTP 401, der
  Fehlercode lesbar").
- **Q7 — NICHT TEIL VON S10:** K4 · ein erneutes Senden · jede Änderung an bestehenden
  Fehlerzeilen · Ereignis- oder Projekt-Kennungen in der Zeile.
- **Q8 — SCHNITT JE ZIEL (Pflicht-Stopp Ziel-Befunde, CLAUDE.md).** GEMESSEN (CC, 2026-09-24,
  `wc -c`): google.md 414 115 · linkedin.md 157 040 · meta.md 103 472 · pinterest.md 96 503 ·
  tiktok.md 48 559 · Kopf docs/ziel-befunde.md 14 399 · diese Standdatei 206 649 Bytes (vor
  dieser Runde).
  **GERECHNET, als obere Schranke:** Nach VERMERK P11.7-23 belegten Nachrichten mit 567 041
  Bytes geladenen Dateien 471,3k Token; die Nachrichten enthielten mehr als die Dateien, also
  gilt für diese Dateien höchstens 0,831 Token je Byte. Fester Teil je Sitzung (Standdatei plus
  Kopf, 221 048 Bytes): ≤ 183,7k.
  · die vier kleineren zusammen: 405 574 Bytes, so viel wie google.md allein (414 115) — NICHT
    klar darunter, also NICHT in einer Sitzung;
  · **S10a — linkedin + tiktok:** 205 599 Bytes, mit festem Teil ≤ 354,6k Token;
  · **S10b — meta + pinterest:** 199 975 Bytes, mit festem Teil ≤ 349,9k Token;
  · **S10c — google allein:** 414 115 Bytes, mit festem Teil ≤ 527,9k Token.
  Jede Gruppe liegt damit unter dem gemessenen Fall von VERMERK P11.7-23 (587,4k samt
  Aufklärung, Modell mit 1M Kontext); S10a und S10b tragen je rund die Hälfte von google.md.
  Die Code-Dateien kommen hinzu; die Schranke ist eine Rechnung, keine Messung.
  **REIHENFOLGE:** S10a zuerst — LinkedIn ist der Anlass von Vorrat P11.7-9, und die
  Nachablesung ab 2026-09-25 (VERMERK P11.7-22, (c)) kann eine gebaute Zeile schon nutzen. Die
  erste Teilscheibe legt die gemeinsame Form der Zeile fest; die übrigen folgen ihr.
  **KIPPBEDINGUNG:** Trägt eine Sitzung ihre Gruppe nicht, wird weiter JE ZIEL geteilt — nicht
  die Ladung verkürzt.
- **Q9 — PFLICHT-GATE VOR DEM PLAN DER ERSTEN TEILSCHEIBE:** Gibt es eine Entscheidung, eine
  Dauerregel oder einen Test, der die STILLE im Erfolg ABSICHTLICH festlegt, und mit welchem
  Grund? Eine solche Festlegung wird nicht still überschrieben.
  **VORAB-SUCHE (CC, 2026-09-24) — KEINE FESTLEGUNG GEFUNDEN**, Reichweite: `docs/`, `CLAUDE.md`
  und `src/` (`.md`, `.ts`) mit einer Achse aus Formulierungen für "still im Erfolg" und "loggt
  nur", dazu `eslint.config.mjs` (keine `console`-Regel). Gefunden sind zwei BEFUNDE, die die
  Stille FESTSTELLEN, nicht verlangen: docs/claude-history/phase-11.1-linkedin.md ("KEIN ADAPTER
  LOGGT IM ERFOLGSFALL", GEMESSEN 2026-08-19) und
  docs/claude-history/phase-11-multi-tracking-aktiver-stand.md ("DER ADAPTER SCHWEIGT BEIM
  ERFOLG: keine Zeile im Log, also `code 0`" — dort als Live-Test-Instrument benutzt). Eine
  Suche ist kein Beweis der Abwesenheit; das Gate prüft vor dem Plan erneut, dazu die Tests.

**MITZUNEHMEN — VORRAT P11.7-1, P11.7-3, P11.7-4 (Kopfkommentare)**, je in der ersten
Scheibe, die ihre Datei berührt, wie ihre Trigger es verlangen. **P11.7-3 geht in S2** — die
Anhebung ändert `linkedin-forward.ts` zwangsläufig. **P11.7-1 (`google-click-ids.ts`) geht in
S4** (Zuschnitt D2). **Für P11.7-4 (`pinterest-forward.ts`) tritt der Trigger ebenfalls mit S4
ein** — "die erste Bau-Scheibe, die diese Datei berührt", und S4 berührt sie nach D7. P11.7-2
gehört nicht dazu: sein Trigger ist der Zuschnitt von GA4. **ZEIGER 2026-09-23:** P11.7-1 und
P11.7-4 sind mit S4 geschlossen (VERMERK P11.7-16).

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

## Nächster Schritt

**S1 BIS S9 SIND ABGESCHLOSSEN** (VERMERKE P11.7-10, P11.7-12, P11.7-14, P11.7-16,
P11.7-18, P11.7-20, P11.7-22, P11.7-24, P11.7-28, P11.7-30). **ALLE FÜNF PUNKTE DER
ROADMAP-ZEILE 11.7 SIND BEARBEITET:** F5, F6 und F7 durch die Lesung (E-a), F8 gemessen
(VERMERK P11.7-26), Punkt 5 mit S4 bis S9. Die Reihenfolge bis zum Phasenende steht in der
OWNER-ENTSCHEIDUNG E-d (Abschnitt "Gegenstand der Phase").
**DIE OWNER-ENTSCHEIDUNGEN ZU SCHRITT (4) VON E-d SIND GETROFFEN:** E-e (Vorrat P11.7-9, K1 für
alle fünf Ziele, zugeschnitten als S10) und E-f (ZUSCHNITT-FRAGE P11.7-11 geschlossen).
**ALS NÄCHSTES:** der Stufe-1-Plan der ersten Teilscheibe von S10, **S10a (linkedin + tiktok)**,
in einer NEUEN Sitzung — Pflicht-Stopp: Volladung docs/ziel-befunde/linkedin.md und
docs/ziel-befunde/tiktok.md plus Kopf; davor das Gate Q9 · danach die LinkedIn-Nachablesung
"Data last received" ab 2026-09-25 (VERMERK P11.7-22, (c)) · dann S10b und S10c · danach das
Phasenende nach E-d (6).
**WEITERE OFFENE ZUSCHNITT-FRAGEN IM BESTAND**, je mit dem Stand an der Frage (Abschnitt
"Fragen an den Zuschnitt (nach dem Meta-Crawl)"):
- P11.7-4 (dazu P11.7-12 und P11.7-18) — `external_id`, offene OWNER-Frage; für diese Phase
  ausgeschlossen.
- P11.7-10 — Doppelzählung mit einem eigenen Pixel des Betreibers: Ableitung, ungemessen; in S8
  nicht bearbeitet.
- P11.7-13 — kein Versions-Wächter für tiktok, google und pinterest; keiner der drei trägt einen
  Abschalttermin.
- P11.7-21 — der angekündigte, undatierte Schema-Wechsel bei Pinterest: ungemessen; beim [x] zu
  benennen (VERMERK P11.7-25, Liste Nr. 12).
- P11.7-22 — Meta sendet zwei verlangte Felder nur bedingt; für diese Phase ausgeschlossen, vor
  einem Bau steht eine Messung.
- P11.7-24 — die Seitenadresse wird im Handler nicht geprüft; die sechs `asString`-Kopien
  bestehen.
- P11.7-25, Punkt (7) — "Anwesenheit, nie Form" als Regel für alle Ziele ist nicht entschieden.
- P11.7-2, P11.7-20, P11.7-26 — Cookie-Wege und Aufbewahrung: für diese Phase ausgeschlossen
  bzw. an die Phase 17 verwiesen; als Fragen offen.
**DIE SIEBEN-TAGE-FRIST LÄUFT WEITER:** Die Google-Karte ist am 2026-09-24 neu autorisiert
worden; im Status "Testing" stirbt das Erneuerungs-Token sieben Tage danach (VERMERK P11.7-23,
(a)). Vor jedem weiteren Google-Live-Test den Ablaufzeitpunkt auf der Karte prüfen.

**KEIN ZUSCHNITT GEGEN UNGEPRÜFTE ANNAHMEN.** Der Satz "KEIN ZUSCHNITT VOR DEM CRAWL" ist
mit dem fünften Ziel eingelöst, der Satz "KEIN ZUSCHNITT VOR DIESER AUFKLÄRUNG" mit VERMERK
P11.7-8. **WAS BLEIBT, IST IHR GEMEINSAMER GRUND:** Ein Zuschnitt gegen eine geratene
Feldliste oder gegen ungeprüfte Annahmen über den eigenen Code ist nichts wert.
