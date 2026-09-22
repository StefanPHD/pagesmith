# ZIEL-BEFUNDE — Meta

**WOHER DIESE DATEI STAMMT:** Der Abschnitt "Meta (Conversions API)" aus
docs/ziel-befunde.md, am 2026-09-22 hierher herausgeschnitten — ZEICHENGLEICH, aus den
Zeilen 8529 bis 9413 jener Datei. Kein Wort umformuliert, keine Angabe gekürzt, nichts
umsortiert, kein Kommentar ergänzt; die Reihenfolge ist die des Ursprungs.
DER BELEG: sha256 = 66805dc9a268369dafd5bd78c13fcab4ecf03a1564c8976144ad18a1e9b5a34c über
den übernommenen Abschnitt — also über alles ab der Zeile "## Meta (Conversions API)"
bis zum Dateiende, OHNE diesen Kopf. Wer prüfen will, ob hier jemand nachträglich ein Wort
geändert hat, misst gegen diese Prüfsumme.

**WARUM ES DIE AUFTEILUNG GAB:** Die Sammel-Datei war für die VOLLLADUNG zu gross, die der
Pflicht-Stopp vor einem Zuschnitt verlangt. Die Pflicht ist damit nicht gelockert, sondern
wieder erfüllbar geworden — sie gilt seither DIESER Datei.

**WAS IM ÜBERNOMMENEN TEXT "DIESE DATEI" HEISST: DIE SAMMEL-DATEI VOR DER AUFTEILUNG, NICHT
DIESE HIER.** Der Text ist vor der Aufteilung geschrieben worden und ist nicht angefasst
worden; wer die Wendung wörtlich auf diese Datei bezieht, sucht an der falschen Stelle.
**INSBESONDERE "DER KOPF DIESER DATEI":** Die Konventionen — der Fortlauf der Buchstaben
über alle Protokolle eines Ziels, die Doppelbuchstaben-Form nach (z), die
Provenienz-Pflicht und die Verweis-Regel "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND
BUCHSTABEN — NIE DEN BUCHSTABEN ALLEIN" — stehen im Kopf von docs/ziel-befunde.md. Sie sind
HIER NICHT wiederholt, und das ist kein Versäumnis: zwei Fassungen derselben Konvention
liefen auseinander, und jener Kopf sagt das über seine eigene Doppelbuchstaben-Regel selbst.

**QUERVERWEISE AUF EIN ANDERES ZIEL SIND SEIT DER AUFTEILUNG DATEI-GRENZEN.** Der
übernommene Text verweist an einzelnen Stellen auf einen anderen Ziel-Abschnitt (Formen:
"der Google-Abschnitt dieser Datei", "am LinkedIn-Teil (w) dieser Datei", 'Abschnitt "Meta
(Conversions API)", Teil (a)'). **Solche Stellen meinen die Datei des dort GENANNTEN Ziels
unter docs/ziel-befunde/** und bleiben auflösbar, weil sie ihr Ziel benennen. Sie sind
bewusst NICHT nachgezogen — ein Nachzug hätte die Zeichengleichheit gebrochen, die der
Beleg oben zusichert.

**WAS HIER NICHT STEHT — unverändert aus dem Kopf des Verzeichnisses:** KEINE Regeln, KEINE
Entscheidungen, KEIN Zuschnitt. Sie sagt, was IST, nicht was zu bauen ist.

**FORTSCHREIBUNG:** Ein weiteres Messprotokoll oder eine weitere Abschnitts-Lesung zu
DIESEM Ziel kommt HINTEN in DIESE Datei, unter eine eigene DATIERTE Unterüberschrift; die
Buchstaben laufen fort und beginnen nie neu. Das Verzeichnis bekommt dafür KEINE Zeile — es
führt Ziele, nicht Protokolle.

## Meta (Conversions API)

**DIE BUCHSTABEN BEGINNEN HIER BEI (a)** — die Konvention im Kopf dieser Datei bindet die
Eindeutigkeit an den ZIEL-ABSCHNITT. Was das für Verweise von aussen bedeutet, steht im
Kopf unter "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND BUCHSTABEN — NIE DEN BUCHSTABEN
ALLEIN".

**WARUM DIESER ABSCHNITT ERST AM 2026-09-08 ENTSTEHT, obwohl meta das ERSTE Fan-Out-Ziel
ist:** Diese Datei wurde am 2026-08-15 angelegt, als das VIERTE Ziel gebaut wurde; die
Befunde der Phase 6 lagen da längst in docs/claude-history/phase-6-capi.md. Der fehlende
Abschnitt war GEMESSEN (CC, 2026-09-08) und ist als Lücke benannt worden, bevor er
geschlossen wurde. **DIESER ABSCHNITT IST NICHT VOLLSTÄNDIG:** Er trägt AUSSCHLIESSLICH
die Befunde zum TESTMODUS. Was über Metas Nutzlast, Fehlerformen und Dedup bekannt ist,
steht weiterhin in docs/claude-history/phase-6-capi.md und ist NICHT hierher übernommen
worden.

**ZUSATZ 2026-09-22 — DER ABSATZ DARÜBER BLEIBT WÖRTLICH STEHEN, EINSCHLIESSLICH DES
SATZES "Er trägt AUSSCHLIESSLICH die Befunde zum TESTMODUS".** Er war am 2026-09-08 richtig
und ist als Aussage über jenen Tag ein Zeitdokument. **SEIT DEM 2026-09-22 TRÄGT DIESER
ABSCHNITT ZUSÄTZLICH:** die MATCH-PARAMETER der Conversions API (Klick- und
Browser-Kennung, die vollständige Liste der Kundeninformations-Parameter, die Pflichtfelder
für Website-Ereignisse), die GRAPH-API-VERSIONEN und die LIMITS — die Teile (h) bis (u),
unter der Unterüberschrift "Abschnitts-Lesung 2026-09-22".
**WAS WEITERHIN NICHT HIER STEHT, damit der Satz oben nicht zu weit gelesen wird:** Metas
FEHLERFORMEN (Statuscodes, Rumpfformen, `describeMetaError`-Achse) und das DEDUP-Verhalten
im Einzelnen. Beides steht unverändert in docs/claude-history/phase-6-capi.md; die Lesung
vom 2026-09-22 hat es nicht zum Gegenstand gehabt. Zum Dedup ist allein hinzugekommen, was
an `fbp` und `external_id` hängt (Teil (j)) und was die Server-Event-Seite beiläufig nennt
(Teil (l)).

### Abschnitts-Lesung 2026-09-08 der Conversions-API-Dokumentation zum Testmodus — die Teile (a) bis (f)

**HERKUNFT (2026-09-08):** Eine ABSCHNITTS-LESUNG mit dem Browser-Werkzeug, nach der Regel
"ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN" (docs/immer-beachten.md). Gelesen
wurde durchgehend mit `textContent`, nie mit `innerText`. GELESEN wurden ACHT Seiten; die
Liste steht am Ende dieses Abschnitts unter "Der gelesene Umfang".
**KEIN AUFRUF GEGEN DIE SCHNITTSTELLE.** Keine Anmeldung, keine Eingabe auf einer fremden
Seite, kein Download. Alles unten ist GELESEN und **ersetzt keine Messung**.
**KEINE SEITE HAT VERSUCHT, DEN LESENDEN ANZUWEISEN** — geprüft und ausdrücklich vermerkt.
Auffordernder Text war vorhanden ("Klicke auf Senden", "Öffne dein Terminal"); nichts davon
wurde ausgeführt.

(a) EIN MIT `test_event_code` MARKIERTES EREIGNIS WIRD NICHT AUSGESCHLOSSEN — ES ZÄHLT
    ZUSÄTZLICH. **DAS IST DER TRAGENDE BEFUND DIESES ABSCHNITTS.**
    GELESEN 2026-09-08,
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/using-the-api.md
    (22 840 Zeichen), Abschnitt "Test Events Tool", Anker `{#testEvents}`. Zwei
    aufeinanderfolgende Sätze:
    "Events sent with `test_event_code` are not dropped." · "They flow into Events Manager
    and are used for targeting and ads measurement purposes."
    **DER ANBIETER NENNT TARGETING UND MESSUNG BEIM NAMEN.** Ein Ausschluss aus
    Berichterstattung oder Optimierung wird auf KEINER der acht gelesenen Seiten behauptet.
    **DIE REICHWEITE:** Das ist eine Aussage der Doku über das Verhalten des Anbieters. Sie
    ist NICHT gemessen. Wer sie als Messung zitiert, hebt eine Lesung auf einen Rang, den
    sie nicht hat.

(b) DER CODE STAMMT AUS DEM TEST-EVENTS-WERKZEUG UND STEHT IM HAUPTTEXT, NICHT IM EREIGNIS.
    GELESEN 2026-09-08, dieselbe Seite: "The Test Events tool generates a test ID." Der Ort
    des Werkzeugs, wörtlich: "Events Manager > Data Sources > Your Pixel > Test Events".
    Und
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/main-body.md
    (672 Zeichen) führt `test_event_code` als OPTIONALEN Parameter des HAUPTTEXTES — auf
    derselben Ebene wie `data`, nicht innerhalb eines Ereignisses: "Code used to verify
    that your server events are received correctly by Facebook."
    Im Beispiel-Rumpf steht der Wert `"TEST123"` neben dem `data`-Array.

(c) OB DER CODE WECHSELT ODER ABLÄUFT — NICHT-TREFFER MIT BENANNTER ACHSE.
    **ACHSE:** `session` · `expire` · `rotate` · `valid`, case-insensitiv, über den
    vollständigen Rumpf von FÜNF Seiten des Doku-Baums: `using-the-api.md` (22 840 Z.),
    `parameters/main-body.md` (672 Z.), `verifying-setup.md` (5 367 Z.),
    `best-practices.md` (14 243 Z.), `get-started.md` (5 571 Z.).
    **ERGEBNIS: 0 Treffer auf allen fünf.** Die Doku sagt weder, dass der Code je Sitzung
    wechselt, noch dass er dauerhaft gilt.
    **KEINE ENTWARNUNG** — fünf Seiten sind nicht der ganze Baum, und ein Nicht-Treffer ist
    kein Beweis der Abwesenheit.

(d) EINE 24-STUNDEN-ANGABE EXISTIERT — SIE GILT DER ANSICHT UND NICHT DEM CODE, UND DIESE
    UNTERSCHEIDUNG IST DER GANZE INHALT DIESES TEILS.
    GELESEN 2026-09-08, https://www.facebook.com/business/help/1624255387706033
    ("Server-Events mit dem Test-Events-Tool testen"; deutschsprachig ausgeliefert, Rumpf
    rund 2 700 Zeichen), wörtlich: "Die Testinformationen bleiben 24 Stunden lang im
    Test-Events-Tool gespeichert, es sei denn, du entfernst sie per Klick auf Aktivitäten
    entfernen."
    **DAS IST EINE AUFBEWAHRUNGSFRIST DER ANZEIGE.** Sie sagt NICHTS über die Gültigkeit
    des Codes, nichts über einen Ablauf der Markierung und nichts darüber, wie lange ein
    Code verwendbar bleibt. Wer sie als Code-Lebensdauer liest, liest eine Angabe über ein
    Fenster in der Oberfläche als Angabe über ein Zugangsdatum.
    **DIESE SEITE LIEGT IN EINEM ANDEREN BAUM** (`facebook.com/business/help`, nicht
    `developers.facebook.com`) und wäre nach einer strengen Abschnitts-Regel ausgeschlossen
    gewesen. Sie trägt die einzige Zeitangabe der ganzen Lesung — geöffnet wurde sie, weil
    die Entwickler-Doku selbst sie als Autorität für das Test-Events-Werkzeug verlinkt.

(e) DIE AUFLAGE "IN PRODUKTION ENTFERNEN" STEHT DA — OHNE GENANNTE FOLGE.
    GELESEN 2026-09-08, `using-the-api.md`, Abschnitt "Test Events Tool", wörtlich: "The
    `test_event_code` field should be used only for testing. You need to remove it when
    sending your production payload."
    **DIE DOKU NENNT AN KEINER STELLE, WAS GESCHIEHT, WENN DIE AUFLAGE MISSACHTET WIRD.**
    Kein Datenverlust, keine Verfälschung, keine Sperre, keine Drosselung — nichts davon
    steht dort.
    **DIE SPANNUNG GEHÖRT IN DEN BEFUND, WEIL SIE SONST BEIM NÄCHSTEN LESEN NEU AUFFÄLLT:**
    Zwei Absätze weiter steht (a) — die Ereignisse würden ohnehin nicht verworfen und
    flössen in Targeting und Messung. Die Doku fordert also ein Entfernen und sagt im selben
    Abschnitt, dass die Ereignisse so oder so gezählt werden. **WELCHE WIRKUNG DAS ENTFERNEN
    HAT, IST AN DER DOKU NICHT ENTSCHEIDBAR.** Hier wird daraus ausdrücklich KEINE Folgerung
    gezogen.

(f) EINE VERWURF-BEDINGUNG EXISTIERT — SIE BETRIFFT DEN ABGLEICH, NICHT DEN TESTMODUS.
    GELESEN 2026-09-08,
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/best-practices.md
    (14 243 Zeichen), Abschnitt "Use test events", wörtlich: "these events may get discarded
    if they don't match a Facebook or Meta account."
    Der Satz steht im Zusammenhang der Empfehlung, für Testereignisse die EIGENEN
    Kundeninformations-Parameter zu verwenden. **DIE ACHSE IST DER IDENTITÄTS-ABGLEICH, NICHT
    DIE TEST-MARKIERUNG.** Ein Ereignis wird nach dieser Aussage verworfen, weil es zu
    keinem Konto passt — nicht, weil es einen Testcode trägt. Wer die beiden zusammenzieht,
    hält den Testmodus für einen Verwurf-Mechanismus und widerspricht damit (a).
    **VORBEHALT 2026-09-22 — DER WORTLAUT VON (f) BLEIBT UNVERÄNDERT UND WIRD NICHT
    WIDERLEGT; ER WIRD ERGÄNZT:** (f) hält fest, dass eine Verwurf-Bedingung EXISTIERT und
    am Identitäts-Abgleich hängt, nennt aber keine Bedingung im Einzelnen. Die Lesung vom
    2026-09-22 hat sie gefunden — die vier ungültigen Parameter-Kombinationen der "Baseline
    requirements for matching", s. **Teil (m)**. Wer (f) allein liest, hält die
    Verwurf-Bedingung für unbestimmt.

### Der gelesene Umfang — Meta

**GEÖFFNET UND VOLLSTÄNDIG GELESEN (8 Seiten), je mit Zeichenzahl:**

1. `/documentation/ads-commerce/conversions-api/using-the-api.md` — "Using the API"
   (22 840 Z.) — trägt den Abschnitt "Test Events Tool"; die tragende Fundstelle für (a),
   (b) und (e).
2. `/documentation/ads-commerce/conversions-api/parameters/main-body.md` — "Main Body
   Parameters" (672 Z.) — die Parameter-Definition, (b).
3. `/documentation/ads-commerce/conversions-api/best-practices.md` — "Best Practices"
   (14 243 Z.) — Abschnitt "Use test events", (f).
4. `/documentation/ads-commerce/conversions-api/verifying-setup.md` — "Verifying Your
   Setup" (5 367 Z.) — **0 Treffer auf `test_event_code`**, entgegen der Erwartung, die der
   Seitentitel weckt.
5. `/documentation/ads-commerce/conversions-api/get-started.md` — "Get started" (5 571 Z.)
   — 0 Treffer auf `test`.
6. `/documentation/ads-commerce/conversions-api/support.md` — "Troubleshoot the Conversions
   API" (1 834 Z.) — 0 Treffer auf `test`.
7. `/documentation/ads-commerce/conversions-api/deduplicate-pixel-and-server-events.md` —
   "Handling Duplicate Pixel and Conversions API Events" (6 359 Z.) — 0 Treffer; auf eine
   Wechselwirkung zwischen Testmodus und Dedup geprüft, keine gefunden.
8. `https://www.facebook.com/business/help/1624255387706033` — "Server-Events mit dem
   Test-Events-Tool testen" (Rumpf rund 2 700 Z.) — (d).

**NACH DEM DURCHGANG DURCH DIE AUSSCHLUSS-LISTE DOCH GEÖFFNET — und dieser Vermerk gehört
dazu, weil ein Ausschluss bei jeder Wiederholung genauso richtig aussieht wie beim ersten
Mal:**
· `/documentation/ads-commerce/conversions-api/dataset-quality-api.md` (38 311 Z.) —
  ausgeschlossen als "Qualitäts-Metriken, nicht Testmodus"; das war gegen die Frage nach
  BERICHTERSTATTUNG nicht haltbar. Geöffnet: **0 Treffer** auf `test_event_code`, `test
  event`, `exclud`. Der Ausschluss war im Ergebnis richtig und war es vorher nicht
  begründbar.
· `/documentation/ads-commerce/conversions-api.md` — "Conversions API" (Übersicht, 3 607
  Z.) — ausgeschlossen als "nur Einstieg". Geöffnet: **0 Treffer**.

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· **Die gesamte Gateway-Familie** (rund 50 Einträge im Navigationsbaum: Conversions API
  Gateway, Gateway für mehrere Konten, AWS App Runner, GCP, Control Plane API) — eigenes
  Produkt mit gehosteter Infrastruktur, nicht unser Direkt-Integrationsweg.
· `conversions-api/app-events`, `/offline-events`, `/business-messaging`,
  `/conversion-leads-integration` (mit allen Unterseiten) — andere Ereignisquellen.
· `/parameters/server-event`, `/parameters/customer-information-parameters`,
  `/parameters/external-id`, `/parameters/fbp-and-fbc`, `/parameters/custom-data`,
  `/parameters/app-data`, `/parameters/original-event` — Parameter INNERHALB des
  Ereignisses; `test_event_code` steht nachweislich im Haupttext (s. (b)).
· `/parameter-builder-library/*`, `/guides/zapier-integration`, `/guides/gtm-server-side`,
  `/guides/salesforce-webhooks`, `/guides/business-sdk-features`,
  `/guides/value-optimization*`, `/guides/predicted-lifetime-value`,
  `/guides/append-attribution` — fremde Werkzeugketten bzw. andere Produkte.
· `/payload-helper` — GEÖFFNET, aber als Textquelle unbrauchbar: die Markdown-Fassung trägt
  420 Zeichen Prosa, der Rest ist ein interaktives Werkzeug. **Was das Werkzeug an Feldern
  anbietet, ist damit NICHT erhoben.**
· **"Direktintegrations-Playbook für Entwickler*innen (PDF)"** — ein DOWNLOAD. Nach der
  Auflage "kein Download" nicht geöffnet. **DAS IST DIE BENANNTE LÜCKE DIESER LESUNG:** ein
  Playbook zur Direktintegration ist genau der Ort, an dem eine Aussage zum Testmodus
  stehen könnte.

**EINE GRENZE DER LESUNG, DIE MITMUSS:** Der Doku-Baum ist seit den Befunden der Phase 6
umgezogen — die Pfade lauten heute `/documentation/ads-commerce/conversions-api/…` statt
`/docs/marketing-api/conversions-api/…`; die alten Adressen leiten weiter. Ältere Zeiger im
Repo auf die alte Form sind NICHT nachgezogen worden und waren nicht Gegenstand dieser
Lesung.

**ZUSATZ 2026-09-22 — DIE LISTE DARÜBER BLEIBT WÖRTLICH, EINSCHLIESSLICH JEDES
AUSSCHLUSS-GRUNDES.** Sie ist die Umfangs-Angabe der Lesung vom 2026-09-08 und bleibt es.
Der Umfang der Lesung vom 2026-09-22 steht NICHT hier, sondern am Ende jener eigenen
Unterüberschrift, unter "DER GELESENE UMFANG (2026-09-22) — Meta, Match-Parameter, Version
und Limits". **Was hier hinzutritt, ist ein Befund ÜBER DIESE LISTE**, und er gehört an sie
und nicht an die neue:

**VIER DER SIEBEN AM 2026-09-08 UNTER "GESEHEN, NICHT GEÖFFNET" AUSGESCHLOSSENEN
PARAMETER-SEITEN TRUGEN DIE ANTWORTEN DER PHASE 11.7.** Der Ausschluss-Grund lautete
wörtlich "Parameter INNERHALB des Ereignisses; `test_event_code` steht nachweislich im
Haupttext (s. (b))" — **und er war für die Frage jenes Tages sachlich richtig.** Für die
Fragen der Phase 11.7 war er es nicht: `/parameters/fbp-and-fbc` trägt (h) und (i),
`/parameters/customer-information-parameters` trägt (k), (m) und (n),
`/parameters/server-event` trägt (l) und (p), `/parameters/external-id` trägt (o). Die
übrigen drei (`/parameters/custom-data`, `/parameters/app-data`,
`/parameters/original-event`) sind am 2026-09-22 erneut und aus eigenem Grund
ausgeschlossen worden.
**WARUM DAS HIER STEHT UND NICHT ALS TADEL:** Ein begründeter Ausschluss sieht bei jeder
Wiederholung genauso richtig aus wie beim ersten Mal — anders als ein Übersehen, das bei
der nächsten Durchsicht auffällt. Die Fehlerklasse ist in docs/immer-beachten.md als "DIE
LISTE 'GESEHEN, NICHT GEÖFFNET' IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT" geführt;
**dieser Eintrag ist ihr erster gemessener Fall in einem ZIEL-Abschnitt dieser Datei**, und
der Ausschluss ist hier nicht durch einen Zweifel aufgefallen, sondern durch eine NEUE
Frage an dieselbe Liste. **DIE FOLGE FÜR JEDE KÜNFTIGE LESUNG:** Eine Ausschluss-Liste
gilt nur für die Frage, unter der sie entstanden ist. Wer mit einer anderen Frage kommt,
liest sie neu.
**ZWEI SEITEN DIESER LISTE SIND AM 2026-09-22 NACHTRÄGLICH GEÖFFNET WORDEN**
(`/parameters/external-id` und `/parameter-builder-library`) — mit Ergebnis und Begründung
in der neuen Umfangs-Angabe.
PROVENIENZ: Der Befund ist GEMESSEN am Dateitext dieser Liste (CC, 2026-09-22); welche
Seite welchen Teil trägt, ist an der Lesung desselben Tages erhoben.

### Browser-Tag-Lesung 2026-09-21 (Crawl 2 der Phase 11.11) — der Teil (g)

**HERKUNFT (2026-09-21):** Eine Lesung mit dem Browser-Werkzeug, durchgehend über
`textContent` und über das Hauptelement statt über `body`. GELESEN wurden DREI Seiten; die
Liste steht am Ende dieses Teils. **KEIN AUFRUF GEGEN DIE SCHNITTSTELLE**, keine Anmeldung,
keine Eingabe auf einer fremden Seite, kein Download. Alles unten ist GELESEN und **ersetzt
keine Messung**.

**DER GEGENSTAND IST EIN ANDERER ALS IN DEN TEILEN (a) BIS (f):** Jene handeln vom
TESTMODUS der Conversions API. Hier geht es um das BROWSER-TAG — Script-Adresse, globale
Namen, `noscript`-Rückfall —, weil die Phase 11.11 fremde Tracking-Bausteine in importiertem
HTML ERKENNEN will.

**DIESER TEIL SCHLIESST EINE LÜCKE, DIE DER BESTAND SELBST BENANNT HAT:** Bis zum
2026-09-21 trug das Repo GENAU EINE Meta-Adresse, und zwar im Produktivcode
(`connect.facebook.net/en_US/fbevents.js` in `src/lib/tracking/meta.ts`) — in dieser Datei
stand sie nicht.

(g) DAS META-PIXEL — ADRESSE, GLOBALE NAMEN UND ZWEI GESTALTEN DES BILD-TAGS.
    GELESEN 2026-09-21 an developers.facebook.com/documentation/meta-pixel/get-started
    ("Erste Schritte mit dem Meta-Pixel"; deutschsprachig ausgeliefert, Rumpf rund 6 020
    Zeichen; die angefragte Adresse `/docs/meta-pixel/get-started` leitet dorthin weiter),
    Abschnitte "Basiscode" und "Pixel installieren"; dazu
    developers.facebook.com/documentation/meta-pixel/advanced ("Weiterführend", rund 19 810
    Zeichen), Abschnitte "Das Pixel mit einem IMG-Tag installieren" und "Tracking von
    Button-Klicks".
    · **(a) DIE SCRIPT-ADRESSE:** `https://connect.facebook.net/en_US/fbevents.js`, im
      Basiscode als Argument `v` übergeben und zur Laufzeit als `<script async>` per
      `insertBefore` eingehängt. **NUR IM BEISPIEL**; der Fliesstext nennt keine Adresse.
      **DIE SPRACHKENNUNG `en_US` STECKT IM PFAD** — ob der Anbieter andere Pfade
      ausliefert, ist auf den gelesenen Seiten nicht gesagt und damit **NICHT ERHOBEN.**
    · **(b) DIE GLOBALEN NAMEN:** `fbq` (gesetzt als `f.fbq`) und `_fbq` (gesetzt als
      `f._fbq`), dazu `fbq.queue`, `fbq.loaded`, `fbq.version` (Wert `'2.0'` im Beispiel)
      und `fbq.callMethod`. Die charakteristischen Aufrufe:
      `fbq('init', '{your-pixel-id-goes-here}');` · `fbq('track', 'PageView');` ·
      `fbq('track', '<Standard-Event>', { … })` · `fbq('trackCustom', …)`.
      **`fbq()` UND `fbq('track', 'PageView')` STEHEN IM FLIESSTEXT** der Einstiegsseite
      ("indem die fbq()-Funktion bei jedem Laden aufgerufen wird"; "Dadurch sollte
      fbq('track', 'PageView') aufgerufen werden"); `_fbq` und die Hilfsfelder stehen
      **NUR IM BEISPIEL.** `fbq('trackCustom')` ist GELESEN an
      developers.facebook.com/documentation/meta-pixel/implementation/conversion-tracking
      ("Conversion Tracking", rund 18 020 Zeichen); jene Seite führt neben Standard- und
      selbstdefinierten Events eine dritte Art, die **selbstdefinierten Conversions**, die
      "durch Parsen der Referrer-URLs deiner Webseite automatisch nachverfolgt werden" —
      **die hinterlässt im HTML der Seite NICHTS und ist für eine Erkennung am Quelltext
      unsichtbar.**
    · **(c) DER `noscript`-RÜCKFALL: VORHANDEN.** Im Basiscode:
      `<noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id={your-pixel-id-goes-here}&ev=PageView&noscript=1"/></noscript>`.
      **NUR IM BEISPIEL.**
      **DIESELBE ADRESSE IST ZUGLEICH EIN EIGENER EINBAUWEG, UND DAS STEHT IM FLIESSTEXT:**
      "Falls du das Pixel mit einer einfachen Implementierung installieren musst, kannst du
      es mit einem `<img>`-Tag installieren. Füge hierzu den nachstehenden Code zwischen
      einem öffnenden und einem schließenden `<noscript>`-Tag in den Header oder den Text
      deiner Webseite ein" — Gestalt
      `https://www.facebook.com/tr?id={pixel-id}&ev={standard-event}`, Parameter als
      `&cd[content_name]=…`. **DER PARAMETER `noscript=1` FEHLT IN DIESER ZWEITEN GESTALT**
      (GELESEN an sechs Beispiel-Tags der Seite "Weiterführend"). Eine Signatur, die
      `noscript=1` verlangt, träfe sie nicht; tauglich ist der Präfix
      `www.facebook.com/tr?id=`.
      **EIN SATZ DIESER SEITE BERÜHRT DIE EIGENE VORSCHAU-SANDBOX und wird hier nur
      festgehalten, nicht bewertet:** "Wenn du dein Pixel-IMG innerhalb eines iframe mit dem
      Attribut sandbox platzierst, musst du den Wert allow-scripts hinzufügen, da Facebook
      sonst nicht deine IMG-Pixeldaten erhält." (FLIESSTEXT, "Weiterführend").

**DER GELESENE UMFANG (2026-09-21) — Meta, Browser-Tag**

**GEÖFFNET UND GELESEN (3 Seiten):**
1. `/documentation/meta-pixel/get-started` — "Erste Schritte mit dem Meta-Pixel" (rund
   6 020 Z.) — tragend für (a), (b) und (c).
2. `/documentation/meta-pixel/advanced` — "Weiterführend" (rund 19 810 Z.) — die zweite
   Gestalt des Bild-Tags, der Button-Klick-Aufruf und der Sandbox-Satz.
3. `/documentation/meta-pixel/implementation/conversion-tracking` — "Conversion Tracking"
   (rund 18 020 Z.) — `fbq('trackCustom')` und die dritte Conversion-Art.

**NACH DEM DURCHGANG DURCH DIE AUSSCHLUSS-LISTE DOCH GEÖFFNET:**
· `/documentation/meta-pixel/reference` — "Referenz zur Meta Pixel API" (rund 7 010 Z.) —
  ausgeschlossen als "Ereignis- und Parameterliste, nicht Einbau". Geöffnet, weil (b) nach
  den AUFRUFEN fragt: Sie trägt **nur `fbq('track')`** und sonst keine Aufrufform (Achse
  `fbq\s*\(\s*'[a-zA-Z]+'` über den vollen Rumpf, ein einziger Treffer). Der Ausschluss war
  im Ergebnis richtig und war es vorher nicht begründbar.

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `/documentation/meta-pixel/implementation/tag_spa` (Tagging von SPAs) — **BUDGET-
  AUSSCHLUSS**, und der naheliegendste Ort für eine ABWEICHENDE Einbaugestalt.
· `/documentation/meta-pixel/advanced/advanced-matching`,
  `/implementation/custom-audiences`, `/implementation/marketing-api`,
  `/implementation/pixel-for-collaborative-ads`, `/implementation/pixel-for-movies`,
  `/get-started/advantage-catalog-ads`, `/guides/track-multiple-events` —
  **BUDGET-AUSSCHLUSS**; "Mehrere Events verfolgen" kann eine weitere Aufrufform tragen.
· `/implementation/gdpr`, `/implementation/data-processing-options`,
  `/guides/terms-and-policies` — sachlich: Recht und Richtlinien, keine Einbaugestalt.
· `/support/*` (Data Advisor, Pixel-Migration) — sachlich: Werkzeuge und Umzug.
· Events Manager und Werbeanzeigenmanager — hinter einer Anmeldung, nicht betreten.

### Abschnitts-Lesung 2026-09-22 der Conversions-API-Dokumentation zu Match-Parametern, Version und Limits — die Teile (h) bis (u)

**HERKUNFT (2026-09-22):** Eine ABSCHNITTS-LESUNG mit dem Browser-Werkzeug, nach der Regel
"ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN" (docs/immer-beachten.md). Gelesen
wurde durchgehend mit `textContent`, nie mit `innerText`, und über `main` bzw.
`#documentation_body` statt über `body`. GELESEN wurden VIERZEHN Seiten; die Liste steht am
Ende dieses Teils.
**KEIN AUFRUF GEGEN DIE SCHNITTSTELLE.** Keine Anmeldung, keine Eingabe auf einer fremden
Seite, kein Download. Alles unten ist GELESEN und **ersetzt keine Messung**.
**KEINE SEITE HAT VERSUCHT, DEN LESENDEN ANZUWEISEN** — geprüft und ausdrücklich vermerkt.
Auffordernder Text war vorhanden ("Klicke auf den Button 'Code anfordern'", "Use the Test
Events tool"); nichts davon wurde ausgeführt.
**DER GEGENSTAND IST EIN DRITTER:** Die Teile (a) bis (f) handeln vom TESTMODUS, der
Teil (g) vom BROWSER-TAG. Hier geht es um die MATCH-PARAMETER der Conversions API, um die
GRAPH-API-VERSION und um die LIMITS — die Fragen der Phase 11.7 (Klick-Kennungen und
Match-Felder aller gebauten Ziele).

**SPRACH-VORBEHALT — ER GEHÖRT AN JEDEN WORTLAUT DIESES TEILS UND IST KEINE FUSSNOTE:** Der
Anbieter liefert diesen Doku-Baum auf der Maschine des Owners DEUTSCHSPRACHIG aus und setzt
auf jede so ausgelieferte Seite einen eigenen Warnbanner, wörtlich: "The content on this
page has been translated from English into another language using AI. The AI translated
content may contain errors, omissions, or unintended meanings. Since AI translated language
may be inaccurate or unclear, you may refer to the original source content in English for
this page to review the intended guidance."
**FOLGE, UND SIE IST BEFOLGT:** Jeder unten zitierte Wortlaut ist an der ENGLISCHEN Fassung
erhoben, erreicht über den Parameter `?locale=en_US`. **DIE DEUTSCHE FASSUNG IST KEINE
QUELLE FÜR EINEN WORTLAUT** — der Anbieter sagt selbst, dass sie Auslassungen tragen kann.
GEGENPROBE an der Seite `/parameters/fbp-and-fbc` (GEMESSEN, CC, 2026-09-22): 9 001 Zeichen
deutsch gegen 7 848 englisch; **sachlich deckungsgleich**, kein Befund stand nur in einer
der beiden. Das ist eine Stichprobe von EINER Seite und keine Entwarnung für die übrigen.
**WER HIER EINEN WORTLAUT NACHPRÜFT, RUFT DIE SEITE MIT `?locale=en_US` AUF** — ohne den
Parameter bekommt er eine andere Textfassung als die zitierte und hält eine Abweichung für
einen Doku-Wechsel.

(h) DIE KLICK-KENNUNG HEISST `fbc`, LIEGT IN `user_data` UND HAT ZWEI BILDUNGSWEGE.
    GELESEN 2026-09-22,
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/fbp-and-fbc
    ("ClickID and the fbp and fbc Parameters", Seitenstand "Updated: Jan 9, 2026", englische
    Fassung, 7 848 Zeichen).
    · **NAME UND BEZEICHNUNG:** `fbc`; in der Parameterliste führt der Anbieter es als
      "Click ID".
    · **ORT IN DER NUTZLAST:** INNERHALB des Objekts `user_data`. Belegt am Beispiel-Rumpf
      derselben Seite (`"user_data": { "fbc": "fb.1.1554763741205.IwAR2F4-…", "em": […],
      "ph": […] }`) und an der Parameter-Übersicht, die `fbc` unter "Customer information
      parameters" führt (s. (k)).
    · **FORMAT, wörtlich:** "The formatted ClickID value must be of the form
      `version.subdomainIndex.creationTime.<fbclid>`". Dabei ist `version` **immer** das
      Präfix `fb`; zu `subdomainIndex`: "is which domain the cookie is defined on ('com' =
      0, 'example.com' = 1, 'www.example.com' = 2). **If you're generating this field on a
      server, and not saving an _fbc cookie, use the value 1.**"
    · **DER ZEITANTEIL, wörtlich:** "`creationTime` is the UNIX time since epoch in
      **milliseconds** when the _fbc cookie was saved. **If you don't save the _fbc cookie,
      use the timestamp when you first observed or received this fbclid value.**" — Der
      Zeitanteil ist also kein Ereigniszeitpunkt, sondern der Zeitpunkt der ABLAGE bzw. der
      ERSTEN BEOBACHTUNG.
    · **WEG 1 — AUS DER ADRESSE:** "Whenever present in the URL query parameters, try to
      obtain the parameter server-side by reading it from the HTTP request URL's query
      string." Beispiel-Adresse des Anbieters:
      `https://example.com/?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk`.
      **WARNUNG IM WORTLAUT, weil sie eine Normalisierung verbietet:** "ClickID value is
      case sensitive - do not apply any modifications before using, such as lower or upper
      case."
    · **WEG 2 — AUS DEM COOKIE `_fbc`:** verfügbar in zwei Fällen, wörtlich: "Meta Pixel is
      installed on the website. In this case, Meta Pixel automatically stores ClickID value
      in the _fbc browser cookie once available" — oder man speichert den Wert selbst.
    · **UND AUSDRÜCKLICH OHNE COOKIE, wörtlich:** "If the _fbc cookie is not available
      because there is no Meta Pixel running on the website, it is still possible to send
      the fbc event parameter with the Conversion API event if an fbclid query parameter is
      in the URL of the current page request." **DER ADRESSWEG IST ALSO VOM ANBIETER
      ausdrücklich für den Fall OHNE Pixel vorgesehen** und nicht bloss eine Notlösung.
    · **VERLANGT ODER EMPFOHLEN: EMPFOHLEN.** Zwei Sätze, beide wörtlich: "We recommend that
      you always send _fbc and _fbp browser cookie values in the fbc and fbp event
      parameters, respectively, when available." und "We recommend sending the fbc parameter
      with every event you send to the Conversions API." **`fbc` steht NICHT in der
      Pflicht-Tabelle** (s. (l)).
    · **NICHT HASHEN** (s. (k)).
    · **ABLAGE-EMPFEHLUNG DES ANBIETERS, weil sie das Format bindet:** "It is highly
      recommended to set _fbc as: HTTP cookie in the HTTP response headers / with the 90
      days expiration time / once retrieved from the fbclid URL query parameter or the _fbc
      browser cookie." Und nur dann, wenn kein `_fbc` existiert, oder wenn "fbclid in the
      URL query parameter isn't equal to the corresponding value in the _fbc cookie value.
      In the cookie, fbclid corresponds to the string after the last '.' in cookie value."
      Als Alternative nennt der Anbieter eine Ablage im eigenen Backend.

(i) DIE BROWSER-KENNUNG HEISST `fbp`, LIEGT EBENFALLS IN `user_data` UND IST KEINE
    KLICK-KENNUNG.
    GELESEN 2026-09-22, dieselbe Seite; die Bezeichnung zusätzlich an
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/customer-information-parameters
    ("Customer Information Parameters", Seitenstand "Updated: Jan 9, 2026").
    · **BEZEICHNUNG:** "Browser ID". **NICHT HASHEN.**
    · **HERKUNFT, wörtlich:** "When the Meta Pixel is installed on a website, and the Pixel
      uses first-party cookies, the Pixel automatically saves a **unique identifier** to an
      _fbp cookie for the website domain if one does not already exist." — **ALSO EINE VOM
      TAG DES ANBIETERS GESETZTE BESUCHER-KENNUNG, NICHT EINE KENNUNG EINES KLICKS.** Der
      Unterschied zu `fbc` ist der Gegenstand und nicht bloss die Herkunft.
    · **FORMAT:** `version.subdomainIndex.creationTime.randomnumber`; `version` immer `fb`;
      `subdomainIndex` wie bei `fbc`, serverseitig ohne Cookie **1**; `creationTime` UNIX-Zeit
      in Millisekunden; "Randomnumber is generated by the Meta Pixel SDK to ensure every
      _fbp cookie is unique." Beispielwert des Anbieters: `fb.1.1596403881668.1116446470`.
    · **VERLANGT ODER EMPFOHLEN: EMPFOHLEN**, mit einer eigenen Auflage. GELESEN 2026-09-22,
      https://developers.facebook.com/documentation/ads-commerce/conversions-api/best-practices
      ("Best Practices - Conversions API", Seitenstand "Updated: Jun 28, 2026"), Abschnitt
      "Ensure fbp and fbc parameters are refreshed", wörtlich: "The fbp and fbc parameters
      are cookie values typically set on your site visitors' browsers in connection with
      Meta's first-party cookie solution, and are subject to change. **If you send them as
      user parameters, you should regularly refresh their values.**"

(j) `fbp` IST BEI META ZUGLEICH EIN DEDUP-SCHLÜSSEL UND EIN ERSATZ FÜR `external_id` — ZWEI
    ROLLEN, DIE AN KEINER DER PARAMETER-SEITEN STEHEN.
    · **ROLLE 1, DEDUPLIZIERUNG.** GELESEN 2026-09-22, Best Practices, Abschnitt "Ensure
      redundant events can be deduplicated", wörtlich: "ensure that both events use the
      identical event_name and that **either `event_id` or a combination of `external_id`
      and `fbp`** are included." Und GELESEN 2026-09-22,
      https://developers.facebook.com/documentation/ads-commerce/conversions-api/guides/end-to-end-implementation
      ("Conversions API End-to-End Implementation", 19 376 Zeichen): "If you have configured
      the external_id or fbp parameters to be passed via both browser and server, **Meta
      deduplicates events automatically if it detects the same event with the same
      external_id or fbp parameters within 48 hours.**"
    · **ROLLE 2, ERSATZ FÜR `external_id`.** GELESEN 2026-09-22,
      https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/external-id
      ("External ID", Seitenstand "Updated: Dec 5, 2025"), Abschnitt "Fbp Parameter". Er
      trägt eine Tabelle (Spalten "Scenario" und "How Data Is Handled") — **sie enthält
      KEINE Symbole, sondern volle Sätze**, drei Zeilen im Wortlaut: "Event includes fbp,
      but not external_id → *We use fbp as external_id and try to find a match. Since fbp is
      a browser cookie, it has an expiration date.*" · "Event includes fbp and external_id →
      *We save both fields and try to find a match. external_id is always favored, since it
      offers improved performance.*" · "Event includes external_id, but not fbp → *This is
      processed as a regular event including external_id.*"
    **WARUM DIESER TEIL EIGENS STEHT:** Wer `fbp` allein an den Parameter-Seiten liest, hält
    es für ein Match-Feld unter vielen. Es trägt zusätzlich eine DEDUP-Funktion — und damit
    eine Achse, die bei einer Änderung am Beacon still kippen kann.

(k) DIE VOLLSTÄNDIGE LISTE DER KUNDENINFORMATIONS-PARAMETER, JE MIT DEM HASH-STATUS DES
    ANBIETERS.
    GELESEN 2026-09-22 an `/parameters/customer-information-parameters` ("Updated: Jan 9,
    2026", 9 890 Zeichen, eine Tabelle) und an
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters
    ("Parameters", Seitenstand "Updated: Jun 30, 2026", 2 856 Zeichen). **Beide Seiten
    führen dieselbe Menge; die zweite ist die kompakte Liste, die erste trägt die
    Normalisierungsregeln.**
    · **RAHMENBEDINGUNG AUF DIE MENGE, wörtlich:** "**You must provide at least one of the
      following user_data parameters** with the correct formatting in your request." — eine
      Pflicht auf die MENGE, nicht auf ein einzelnes Feld.
    · **DES ANBIETERS EIGENE ABGRENZUNG DES PERSONENBEZUGS, wörtlich und hier NICHT
      ausgelegt:** "Our systems are designed to not accept customer information that is
      unhashed Contact Information, unless noted below. **Contact Information is information
      that personally identifies individuals, such as names, email addresses, and phone
      numbers**, that we use for matching purposes only." **DAS IST METAS WORTWAHL.** Eine
      Zuordnung zu den Datenklassen dieses Projekts steht hier NICHT und gehört nicht in
      diese Datei.
    · **HASHING REQUIRED (SHA256), ZEHN FELDER**, je mit Normalisierungsregel an der Seite:
      `em` (E-Mail; trimmen, kleinschreiben) · `ph` (Telefon; Symbole, Buchstaben und
      führende Nullen entfernen, Ländervorwahl PFLICHT — "Always include the country code …
      even if all of your data is from the same country") · `fn` (Vorname) · `ln`
      (Nachname) · `db` (Geburtsdatum, `YYYYMMDD`) · `ge` (Geschlecht, `f` oder `m` als
      Kleinbuchstabe) · `ct` (Stadt) · `st` (Region, 2-Zeichen-ANSI, klein) · `zp` (PLZ, US
      nur die ersten fünf Stellen) · `country` (ISO 3166-1 alpha-2, klein).
    · **HASHING RECOMMENDED, EIN FELD:** `external_id` (eigener Teil (o)).
    · **DO NOT HASH, VIERZEHN FELDER:** `client_ip_address` · `client_user_agent` · `fbc` ·
      `fbp` · `subscription_id` · `fb_login_id` (integer, App-Scoped ID) · `lead_id`
      (integer, aus Metas Lead Ads) · `anon_id` (**nur App-Ereignisse**) · `madid` (**nur
      App-Ereignisse**) · `page_id` · `page_scoped_user_id` · `ctwa_clid` (Click to
      WhatsApp) · `ig_account_id` · `ig_sid` (Instagram-Scoped User ID).
    · **EINE ABWEICHUNG ZWISCHEN DEN ZWEI SEITEN, gemessen und gemeldet statt geglättet:**
      Bei `madid` trägt die Tabelle auf `/parameters/customer-information-parameters` KEINE
      Hash-Angabe; die Liste auf `/parameters` führt "madid: Mobile Advertiser ID — Do not
      hash". **Die kompakte Liste ist an dieser Stelle vollständiger als die Tabelle.**
    · **WOHER DER WERT KOMMT — eine Einteilung nach der QUELLE, ausdrücklich als FOLGERUNG
      aus den Beschreibungen der Seite und nicht als Angabe des Anbieters:** vom ANBIETER
      gesetzt (`fbc`, `fbp`, `fb_login_id`, `lead_id`, `ctwa_clid`, `ig_sid`,
      `ig_account_id`, `page_scoped_user_id`) · aus dem GESCHÄFTSVORGANG des Werbetreibenden
      (`subscription_id`, `page_id`) · vom GERÄT (`anon_id`, `madid`) · aus der ANFRAGE
      (`client_ip_address`, `client_user_agent`) · **SELBST ERZEUGT: allein `external_id`**
      (s. (o)).
    **EIN ZEIGER, DER DEN TEIL (b) BESTÄTIGT UND NICHT BERÜHRT:** `/parameters` führt
    `test_event_code` zusammen mit `data` unter "Main Body Parameters" — dieselbe Aussage,
    die (b) am 2026-09-08 an `/parameters/main-body.md` erhoben hat.

(l) DIE PFLICHT-FELDER FÜR WEBSITE-EREIGNISSE SIND DREI — UND DAS IST DIE GANZE LISTE.
    GELESEN 2026-09-22, Best Practices ("Updated: Jun 28, 2026"), Abschnitt "Send required
    and recommended parameters", eingeleitet wörtlich mit "The following server event and
    customer information parameters are **required**:", als Tabelle mit den Spalten
    "Parameter", "Type", "When Required":
    · `action_source` — Server event — **All events**
    · `event_source_url` — Server event — **All website events**
    · `client_user_agent` — Customer information — **All website events**
    **BESTÄTIGT AN ZWEITER STELLE** (GELESEN 2026-09-22, `/parameters`): "Website events
    shared using the Conversions API require the `client_user_agent`, `action_source`, and
    `event_source_url` parameters, while non-web events require only `action_source`." Und
    an dritter, an der Feldbeschreibung selbst: "The client_user_agent **is required** for
    website events shared using the Conversions API."
    **UNMITTELBAR DANEBEN, EIN IMPERATIV OHNE DAS WORT "required", wörtlich:** "Also include
    the `external_id` and `event_id` event parameters for all events." **Der Unterschied
    zur Tabelle ist nicht ausgelegt** — der Anbieter sagt nicht, was bei Fehlen geschieht.
    **ALLES ÜBRIGE IST EMPFOHLEN, UND DER ANBIETER SAGT, WAS DARAN HÄNGT, wörtlich:**
    "Sending additional customer information parameters may help increase Event Match
    Quality. **You can use only matched events for ads attribution and ad delivery
    optimization.** Higher matching quality produces better results. **You cannot use
    unmatched events for attribution or ad delivery optimization, but you can still use them
    for basic measurement.**" Als Beispiele hoher Qualität nennt dieselbe Stelle: E-Mail
    (`em`), IP-Adresse (`client_ip_address`), Name (`fn` und `ln`), Telefon (`ph`).
    **EIN DEDUP-SATZ DER SERVER-EVENT-SEITE, der beiläufig steht und Folgen hat.** GELESEN
    2026-09-22,
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/server-event
    ("Server Event Parameters", Seitenstand "Updated: Feb 12, 2026", 9 029 Zeichen), an
    `event_name`: "If we find a match between events sent within **48 hours** of each other,
    we only consider the first one. **If a server and browser/app event arrive at
    approximately the same time (that is, within 5 minutes of each other), we favor the
    browser/app event.**" Dazu an `event_id`: "Note that while event_id is marked optional,
    it is **recommended** for event deduplication."
    **WAS DIESELBE SEITE ALS PFLICHT FÜHRT, ausserhalb von `user_data`:** `event_name`
    (Required) · `event_time` (Required; Unix-Sekunden in GMT, "can be up to **7 days**
    before you send an event … If any event_time in data is greater than 7 days in the past,
    **we return an error for the entire request and process no events**") · `user_data`
    (Required, Objekt) · `action_source` (Required, mit der aufgezählten Werteliste,
    darunter `website`).

(m) DIE VERWURF-BEDINGUNG DES ABGLEICHS HAT VIER BENANNTE KOMBINATIONEN — UND SIE HÄNGT AN
    EINER VERSIONSNUMMER.
    GELESEN 2026-09-22, Best Practices, Abschnitt "Baseline requirements for matching",
    wörtlich: "An event is considered **invalid** if it only includes customer information
    parameters that consist of one of the following combinations, (**or a subset thereof**)."
    Die vier Kombinationen, wörtlich:
    · `ct + country + st + zp + ge + client_user_agent`
    · `db + client_user_agent`
    · `fn + ge`
    · `ln + ge`
    Das Beispiel des Anbieters dazu: ein Ereignis mit nur `ge`, `ct`, `st` und `country`
    "would be rejected because those customer information parameters are a subset of one of
    the above combinations".
    **DIE VERSIONSBINDUNG, und sie verbindet diesen Teil mit (s):** Die Regel ist eingeführt
    "Following the release of **Graph API version 13.0**"; `/parameters/customer-information-parameters`
    sagt dasselbe von der anderen Seite: "In the **Graph API v13.0** release there were new
    requirements around the combinations of customer information parameters that are
    considered valid. Please review the best practices to ensure your Conversions API
    integrations are not interrupted."
    **DIESER TEIL ERGÄNZT (f) UND WIDERLEGT IHN NICHT** — s. den Vorbehalt dort.
    **KEINE DIESER VIER KOMBINATIONEN IST DIE, DIE DIESES PROJEKT HEUTE SENDET**, und das
    ist ausdrücklich KEINE Entwarnung: Der Anbieter nennt eine Liste UNGÜLTIGER
    Kombinationen, nicht eine Liste gültiger. Was er mit einer nicht aufgeführten
    Kombination tut, steht dort nicht.

(n) `client_ip_address` — IPv6 IST VORZUZIEHEN, UND DAS FELD DARF NIE GEHASHT WERDEN.
    GELESEN 2026-09-22, `/parameters/customer-information-parameters`, wörtlich: "The IP
    address of the browser corresponding to the event must be a valid IPV4 or IPV6 address.
    **IPV6 is preferable over IPV4 for IPV6-enabled users.** The client_ip_address user data
    parameter **must never be hashed**. No spaces should be included. **Always provide the
    real IP address** to ensure accurate event reporting."
    Zu `client_ip_address` und `client_user_agent` gemeinsam, wörtlich: "This information is
    automatically added to events sent through the browser, but **it must be manually
    configured for events sent through the server**."
    Und, aus (l): "Sending both the client_ip_address and client_user_agent parameters for
    all of the events you're sending through the Conversions API **may help improve event
    matching and could also help improve ad delivery** for any ad campaigns optimizing on
    the events you send through the Conversions API."
    **DIESER TEIL STEHT EIGENS, WEIL EIN ANDERES ZIEL HIER ANDERS IST:** Metas Doku zieht
    IPv6 ausdrücklich VOR. Ob und wie andere Ziele das tun, ist ihre Sache und steht in
    ihren Abschnitten; hier steht nur, was Meta sagt.

(o) `external_id` IST DER EINZIGE PARAMETER DER LISTE, DESSEN WERT DER WERBETREIBENDE SELBST
    VERGIBT — MIT EINER KONSISTENZ-AUFLAGE UND EINEM ABLAUF.
    GELESEN 2026-09-22, `/parameters/external-id` ("External ID", Seitenstand "Updated: Dec
    5, 2025", 5 198 Zeichen). **Diese Seite stand am 2026-09-08 auf "gesehen, nicht
    geöffnet"** und ist am 2026-09-22 nachträglich geöffnet worden.
    · **DEFINITION, wörtlich:** "External ID is a string that represents a user on an
      advertiser's system, like **loyalty membership IDs, user IDs, and external cookie
      IDs**." Objekttyp "string or array of strings", "**Hashing is recommended**".
    · **MEHRERE JE EREIGNIS ZULÄSSIG:** "You can send one or more external_ids for a given
      event and we try to match it to someone on Facebook."
    · **KONSISTENZ-AUFLAGE, wörtlich:** "External IDs can be sent via multiple channels,
      including browser Pixel, Conversions API, and Offline Conversions API (OCAPI). **You
      must be consistent across channels.** For example, if you send a browser Pixel event
      with external_id set to 123, your Conversions API event for that same user should also
      have external_id set to 123."
    · **EIN ABLAUF, DEN DER ANBIETER NICHT BEZIFFERT:** "The external_id to specific user
      matches **expire periodically**. We recommend that you refresh it as frequently as
      possible." **WER HIER EINE FRIST EINSETZT, ERFINDET SIE** — die Seite nennt keine.
    · **WIE DER ABGLEICH LÄUFT, in drei Schritten des Anbieters:** man sendet `external_id`
      zusammen mit anderen Kundeninformationen · "we look for a match using all the
      information you sent. If we find a match, we associate the external_id you provided
      with that specific user" · in Folgeereignissen genügt `external_id` allein.
    · **EINE GRENZE, DIE DER ANBIETER SELBST ZIEHT:** "Note that Customer File Custom
      Audience is not listed. This type of audience uses different policies and **cannot be
      created using only external_id or extern_id from data received through Conversions
      API**."
    · **UND EINE, DIE DEN TESTMODUS BERÜHRT:** "**external_ids are not available in the Test
      Events tool.**" — Das ist eine Aussage über das Werkzeug der Teile (a) bis (f) und
      steht dort nicht; die Lesung vom 2026-09-08 hatte die Seite ausgeschlossen.
    **KEINE EINORDNUNG UND KEINE EMPFEHLUNG:** Dass der Wert SELBST ERZEUGT wäre, ist hier
    festgehalten, weil es eine Eigenschaft des Parameters ist. Was daraus für die
    Datenklassen dieses Projekts folgt, ist eine OWNER-Frage und gehört NICHT in diese
    Datei — hier steht kein Zeiger darauf, weil ein Zeiger aus dieser dauerhaften Datei in
    eine Standdatei auf einen Pfad mit Halbwertszeit zeigte (docs/immer-beachten.md, "EINE
    ABLAGE MIT HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE").

(p) `event_source_url` — DIE SEITE WIDERSPRICHT SICH IN ZWEI AUFEINANDERFOLGENDEN SÄTZEN,
    UND ZUM QUERY-STRING SAGT KEINE SEITE EINE REGEL.
    GELESEN 2026-09-22, `/parameters/server-event` ("Updated: Feb 12, 2026"), wörtlich:
    "`event_source_url` — string — **Optional.** The browser URL where the event happened.
    **The URL should match the verified domain.** Note: **The event_source_url is required
    for website events** shared using the Conversions API."
    **DER WIDERSPRUCH IST IM DOKUMENT UND NICHT IN DIESER ABLAGE:** "Optional" und "required
    for website events" stehen unmittelbar hintereinander. **AUFGELÖST WIRD ER VON DER
    PFLICHT-TABELLE** (s. (l)) und von `/parameters` — für WEBSITE-Ereignisse ist das Feld
    Pflicht. Für Nicht-Web-Ereignisse "require only action_source".
    **ZUM QUERY-STRING: KEINE REGEL AUF KEINER GELESENEN SEITE.** Statt dessen zwei
    gegenläufige BEISPIELE, und beide sind Beispiele und keine Vorschrift:
    · **OHNE** Query-String: alle drei `event_source_url`-Beispiele auf `/using-the-api`
      lauten `http://jaspers-market.com/product/123` bzw. `http://jaspers-market.com`.
    · **MIT** Query-String: die Parameter-Builder-Bibliothek führt `event_source_url` mit dem
      Beispiel `https://www.example.com/checkout?productID=123.ABcDEFGh` (s. (r)) — **der
      einzige Ort der ganzen Lesung, an dem ein Beispiel des Anbieters einen Query-String in
      diesem Feld zeigt.**
    **EIN EIGENES FELD FÜR DIE HERKUNFT EXISTIERT:** `referrer_url`, **Optional**, "The HTTP
    referrer header as observed by the page triggering the Conversions API or Meta Pixel
    event. This is usually the preceding page in the browser."
    **DER NÄCHSTLIEGENDE ORT FÜR EINE REGEL TRÄGT KEINE.** GELESEN 2026-09-22,
    https://developers.facebook.com/documentation/meta-pixel/support ("Meta Pixel support",
    Seitenstand "Updated: Mar 28, 2025", 1 471 Zeichen) behandelt zwar "Why are my query
    string parameters, such as Click ID, missing in the URL?" — aber allein für die Adresse
    im BROWSER (URL-Kürzer drehen "&" zu "?"; "The webpage does not accept URL parameters").
    `event_source_url` trifft dort **0-mal**.

(q) OB META KLICK-KENNUNGEN AUS `event_source_url` SELBST AUSLIEST, STEHT AUF KEINER
    GELESENEN SEITE — **NICHT BEANTWORTET.**
    **BENANNTE REICHWEITE dieses Nicht-Treffers, neun Seiten, je im Volltext gelesen oder
    mit Achse durchsucht** (GEMESSEN, CC, 2026-09-22): `/parameters/server-event` ·
    `/parameters` · `/best-practices` · `/using-the-api` · `/parameters/fbp-and-fbc` ·
    `/parameters/customer-information-parameters` · `/parameters/external-id` ·
    `/guides/end-to-end-implementation` · `/documentation/meta-pixel/support`. Auf
    `/using-the-api` (18 344 Zeichen) trifft `fbclid` **0-mal**, auf
    `/guides/end-to-end-implementation` (19 376 Zeichen) ebenfalls **0-mal**.
    **WAS STATTDESSEN POSITIV DASTEHT:** Die Doku trägt die Aufgabe dem WERBETREIBENDEN auf.
    `/parameters/fbp-and-fbc` verlangt in vier numerierten Schritten ("1. Retrieve Meta
    ClickID", "2. Format ClickID", "3. Store ClickID", "4. Send fbc Parameter with
    Conversions API Events"), dass er `fbclid` selbst aus dem Query-String liest, selbst in
    die `fb.…`-Form bringt und selbst als `fbc` sendet.
    **DASS EINE SEITE, DIE METAS EIGENES AUSLESEN ERKLÄRTE, DIESE VIER SCHRITTE
    GEGENSTANDSLOS MACHTE, IST EINE ABLEITUNG AUS DER ABWESENHEIT — KEINE AUSSAGE DES
    ANBIETERS UND KEINE MESSUNG.** Sie ist hier ausdrücklich als solche gekennzeichnet, weil
    sie sich sonst beim nächsten Lesen wie ein Befund liest.
    **NICHT BEANTWORTET, UND NUR EIN AUFRUF GEGEN DEN ENDPUNKT BEANTWORTET ES:** ob Meta
    einen `fbclid` aus dem übergebenen `event_source_url` verwertet, wenn `fbc` fehlt.

(r) DIE PARAMETER-BUILDER-BIBLIOTHEK HÄNGT AN JEDEN PARAMETER EINEN ANHANG — DEN WIR NICHT
    ERZEUGEN.
    GELESEN 2026-09-22,
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameter-builder-library
    ("Parameter Builder Library", Seitenstand "Updated: Jul 21, 2026", 7 357 Zeichen).
    **Diese Seite stand am 2026-09-08 auf "gesehen, nicht geöffnet"** und ist am 2026-09-22
    nachträglich geöffnet worden, weil drei gelesene Seiten für den Anhang auf sie
    verweisen.
    · **DER ANHANG, wörtlich:** "For all parameters processed by the parameter builder, Meta
      adds an **appendix field at the end of each parameter** to help evaluate the
      performance of the library. The appendix field has **8 characters** containing (1) the
      SDK version, (2) incrementality, (3) the SDK language." Und: "If you are seeing the
      appendix as 2 characters, it is a legacy appendix that only contains the SDK language."
    · **DIE FORMATE DORT TRAGEN IHN ALLE:**
      `fb.${subdomain_index}.${creation_time}.${fbclid}.${appendix}` ·
      `fb.${subdomain_index}.${creation_time}.${random_number}.${appendix}` · und selbst IP
      und Adresse: `168.212.226.204.ABcDEFGh`, `https://www.facebook.com/.ABcDEFGh`,
      `https://www.example.com/checkout?productID=123.ABcDEFGh`.
    **DER VORBEHALT, UND ER IST DER GRUND FÜR DIESEN TEIL:** DREI der gelesenen Seiten
    nennen das Format von `fbc` und `fbp` **nur mit** diesem Zusatz und verweisen für
    Einzelheiten hierher ("If you use the parameter builder library to form fbc, the format
    will contain an appendix at the end"). **DIESES PROJEKT BENUTZT DIE BIBLIOTHEK NICHT** —
    ein selbst gebildeter Wert trägt also KEINEN Anhang, und das ist kein Mangel. Wer den
    Vorbehalt nicht mitliest, hält den Anhang für Pflicht und baut ihn nach.
    · **EINE NEBENANGABE, die zu (p) gehört:** Die Bibliothek beschreibt
      `event_source_url` als "The URL of the web page where the event happened,
      **reconstructed from the incoming request**. Only available when you use
      processRequestFromContext."

(s) DIE GRAPH-API-VERSIONEN — ZWEI TABELLEN, UND WELCHE FÜR `/{PIXEL_ID}/events` GILT, STEHT
    NIRGENDS.
    **DIE VERSION, DIE DIESES PROJEKT SENDET, IST AM CODE ABGELESEN und steht hier nur als
    Bezugspunkt** (GEMESSEN am Repo, CC, 2026-09-22, HEAD `354a6e5`): `META_GRAPH_VERSION`
    in `src/lib/capi/config.ts`, Vorgabewert `"v21.0"`, env-übersteuerbar; verwendet in
    `src/lib/capi/meta-forward.ts` als
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${config.pixelId}/events`. **Was in
    der Produktionsumgebung gesetzt ist, ist am Repo NICHT feststellbar und nicht erhoben.**
    · **DIE AKTUELLE VERSION:** "The latest Graph API version is **v26.0**" — GELESEN
      2026-09-22, https://developers.facebook.com/docs/graph-api/guides/versioning
      ("Versioning - Graph API"), bestätigt am Changelog desselben Tages. Die Beispiele der
      Conversions-API-Doku fahren heute `https://graph.facebook.com/v26.0/<PIXEL_ID>/events`;
      der Pfad ist allgemein als
      `https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}`
      angegeben.
    · **TABELLE 1 — "Available Graph API Versions".** GELESEN 2026-09-22,
      https://developers.facebook.com/docs/graph-api/changelog ("Changelog - Graph API");
      **zeilenweise über das DOM ausgelesen, nicht aus dem Fliesstext geschätzt.** Die
      Zeilen: v26.0 (July 29, 2026 / TBD) · v25.0 (February 18, 2026 / July 29, 2028) ·
      v24.0 (October 8, 2025 / February 18, 2028) · v23.0 (May 29, 2025 / October 8, 2027) ·
      v22.0 (January 21, 2025 / May 20, 2027) · **v21.0 (October 2, 2024 / January 21,
      2027)** · v20.0 (May 21, 2024 / September 24, 2026) · v19.0 (January 23, 2024 / May 21,
      2026) · v18.0 (September 12, 2023 / January 26, 2026) · und weiter bis v13.0.
      **NACH DIESER TABELLE LÄUFT `v21.0` AM 2027-01-21 AB.** Dass `v20.0` am 2026-09-24
      abläuft — zwei Tage nach dieser Lesung — zeigt, dass die Termine der Tabelle greifen.
      Der Lebenszyklus dazu, wörtlich: "Each version is guaranteed to operate for **at least
      two years**. A version will no longer be usable two years after the date that the
      subsequent version is released."
    · **TABELLE 2 — "Available Marketing API Versions", dieselbe Seite, VOLLSTÄNDIG:** v26.0
      (July 29, 2026 / TBD) · v25.0 (February 18, 2026 / TBD) · v24.0 (October 8, 2025 /
      **October 6, 2026**). Darüber: "Marketing API version auto-upgrade will be released on
      July 29, 2026." **`v21.0` IST IN DIESER TABELLE NICHT AUFGEFÜHRT.**
    · **WARUM TABELLE 2 ÜBERHAUPT IN FRAGE KOMMT:** `/using-the-api` sagt im Abschnitt "API
      Limits" wörtlich "**Conversions API calls are counted as Marketing API calls.**"
      **OB DAS NUR FÜR RATE-LIMITS GILT ODER AUCH FÜR DIE VERSIONIERUNG, STEHT AUF KEINER
      DER GELESENEN SEITEN.**
    · **DIE ZWEI SCHEMATA SIND AUSDRÜCKLICH VERSCHIEDEN.** GELESEN 2026-09-22,
      https://developers.facebook.com/documentation/ads-commerce/marketing-api/overview/versioning
      ("Marketing API versioning", Seitenstand "Updated: Jun 24, 2026", 10 541 Zeichen),
      wörtlich: "Marketing API is versioned on a **90-day deprecation schedule**, whereas
      Platform API has core and extended APIs with a **2 year guarantee** for core APIs."
      Und: "**Marketing API does not support unversioned calls.** If you do not specify a
      working version in your call, it fails." Dazu: "After the 90-day grace period ends,
      the deprecated version stops working."
    **NICHT BEANTWORTET — UND NUR EIN AUFRUF GEGEN DEN ENDPUNKT BEANTWORTET ES:** welches
    der zwei Versions-Schemata `/{PIXEL_ID}/events` regiert, und damit, ob `v21.0` dort
    heute bedient wird. **Nach Tabelle 1 lebt es bis 2027-01-21, nach Tabelle 2 ist es nicht
    geführt.** Dieselbe Messung müsste zeigen, ob eine Antwort verrät, welche Version
    tatsächlich bedient wurde.

(t) DER ABLAUF EINER VERSION ERZEUGT KEINEN FEHLER, SONDERN EINE STILLE UMLEITUNG — EIN
    EIGENER BEFUND, WEIL ER DIE FEHLERFORM BESTIMMT.
    **BEIDE SCHEMATA SAGEN ES, jedes mit eigenem Wortlaut**, GELESEN 2026-09-22:
    · Graph API (`/docs/graph-api/guides/versioning`): "For APIs, **once a version is no
      longer usable, any calls made to it will be defaulted to the next oldest, usable
      version.**"
    · Marketing API (`/documentation/ads-commerce/marketing-api/overview/versioning`): "Once
      a version is unavailable, any calls made to that version number **may fail or be
      upgraded to the next available version**." Dazu ein ausdrückliches Auto-Upgrade seit
      Mai 2024: "if an endpoint is not affected, **the platform will upgrade the call to the
      next available version, rather than directly failing the request**. This feature
      reduces the number of requests that fail when a version is deprecated." — Mit einer
      Grenze, die der Anbieter am Beispiel zeigt: für Endpunkte, die die Folgeversion
      ÄNDERT, greift das Auto-Upgrade NICHT und die Anfrage scheitert.
    **DIE FOLGE, UND SIE IST DER GRUND FÜR EINEN EIGENEN BUCHSTABEN:** Ein Adapter, dessen
    Versionsangabe abgelaufen ist, bekommt unter dem Graph-Schema **weiter eine
    Erfolgsantwort — von einer Version, die er nicht gewählt hat.** Nichts am eigenen Code
    wird davon rot, und keine Fehlerzeile entsteht. **WAS DAS FÜR DIE REGELN BEDEUTET, DIE
    META AN EINE VERSION BINDET** — die "Baseline requirements for matching" ab `v13.0`, s.
    (m) — **IST UNGEMESSEN.**
    **DIE ANDERE RICHTUNG IST EBENSO UNGEMESSEN:** Unter dem Marketing-Schema kann dieselbe
    Anfrage statt dessen SCHEITERN. Welches von beidem für `/{PIXEL_ID}/events` gilt, ist
    genau die offene Frage aus (s).

(u) DIE LIMITS — DER ANBIETER SAGT, ES GEBE KEIN SPEZIFISCHES LIMIT FÜR DIE CONVERSIONS API.
    GELESEN 2026-09-22,
    https://developers.facebook.com/documentation/ads-commerce/conversions-api/using-the-api
    ("Using the API", 18 344 Zeichen), Abschnitt "**API Limits**", wörtlich: "The Marketing
    API has its own rate-limiting logic and is excluded from all the Graph API rate
    limitations. So if you make a Marketing API call, it won't be calculated into the Graph
    API throttling. **There is no specific rate limit for the Conversions API.** Conversions
    API calls are counted as Marketing API calls. **The only limitation is that you can send
    us up to 1,000 events at a time.**"
    **GEGENPROBE AM ALLGEMEINEN ORT, mit benannter Reichweite.** GELESEN 2026-09-22,
    https://developers.facebook.com/docs/graph-api/overview/rate-limiting ("Rate Limits -
    Graph API"): "All API requests are subject to rate limits. Graph API requests are
    subject to Platform Rate Limits, while **Marketing API** and Instagram Platform requests
    are subject to **Business Use Case (BUC) Rate Limits**." · "If both Platform and Business
    Use Case rate limits can be applied to a request, **BUC rate limits will be applied**."
    · "Once a rate limit is reached, any subsequent requests made by your app will fail and
    the API will return an error code until enough time has passed." · "Real time rate limit
    usage statistics are described in **headers** that are included with most API responses."
    **"Conversions API" TRIFFT AUF DIESER SEITE 0-MAL** (GEMESSEN, CC, 2026-09-22, über den
    Volltext von `#documentation_body`; die Positivkontrolle ist die vollständig gelesene
    Überschriftenliste).
    **WAS NICHT GELESEN IST UND WO ES STÜNDE:** Die konkreten BUC-Zahlen unter der
    Überschrift "Business Use Case Rate Limits → Ads Management" bzw. "Ads Insights" sind
    **BUDGET-AUSSCHLUSS**. Sie sind der einzige Ort, an dem eine auf unseren Forward
    anwendbare Zahl stehen könnte — die Conversions API ist dort aber nicht namentlich
    genannt.
    **NICHT BEANTWORTET:** welches Limit tatsächlich greift. Das zeigen erst die
    Nutzungs-Kopfzeilen einer echten Antwort, und die verlangen einen Aufruf gegen den
    Endpunkt.

**DER GELESENE UMFANG (2026-09-22) — Meta, Match-Parameter, Version und Limits**

**GEÖFFNET UND GELESEN — VIERZEHN Seiten**, je mit Zeichenzahl über `main` bzw.
`#documentation_body`; alle mit `?locale=en_US`, wo nicht anders vermerkt:

1. `/documentation/ads-commerce/conversions-api/parameters/fbp-and-fbc` — "ClickID and the
   fbp and fbc Parameters" ("Updated: Jan 9, 2026") — 7 848 Z. englisch, **zusätzlich die
   deutsche Auslieferung mit 9 001 Z.** als Gegenprobe zum Sprach-Vorbehalt — tragend für
   (h) und (i).
2. `/documentation/ads-commerce/conversions-api/parameters/customer-information-parameters`
   — "Customer Information Parameters" ("Updated: Jan 9, 2026") — 9 890 Z., eine Tabelle —
   tragend für (k), (m), (n).
3. `/documentation/ads-commerce/conversions-api/best-practices` — "Best Practices -
   Conversions API" ("Updated: Jun 28, 2026") — 8 876 Z., eine Tabelle — die Pflicht-Tabelle
   (l), die Verwurf-Kombinationen (m), die Refresh-Auflage (i), der Dedup-Satz (j).
4. `/documentation/ads-commerce/conversions-api/parameters/server-event` — "Server Event
   Parameters" ("Updated: Feb 12, 2026") — 9 029 Z. — tragend für (l) und (p).
5. `/documentation/ads-commerce/conversions-api/parameters` — "Parameters" ("Updated: Jun
   30, 2026") — 2 856 Z. — die kompakte Hash-Liste, (k).
6. `/documentation/ads-commerce/conversions-api/using-the-api` — "Using the API" — 18 344 Z.
   — "API Limits" (u), die `v26.0`-Beispiele (s), die `event_source_url`-Beispiele (p).
7. `/documentation/ads-commerce/conversions-api/parameters/external-id` — "External ID"
   ("Updated: Dec 5, 2025") — 5 198 Z. — tragend für (o) und (j).
8. `/documentation/ads-commerce/conversions-api/parameter-builder-library` — "Parameter
   Builder Library" ("Updated: Jul 21, 2026") — 7 357 Z. — tragend für (r).
9. `/documentation/ads-commerce/conversions-api/guides/end-to-end-implementation` —
   "Conversions API End-to-End Implementation" — 19 376 Z. — mit Achse
   `fbclid|fbc|fbp|event_source_url|query|external_id|client_*` durchsucht, jeder Treffer im
   Wortlaut gelesen — tragend für (j).
10. `/docs/graph-api/guides/versioning` — "Versioning - Graph API" — der Lebenszyklus, die
    aktuelle Version, der stille Rückfall — (s) und (t).
11. `/docs/graph-api/changelog` — "Changelog - Graph API" — drei Tabellen; **die beiden
    Versions-Tabellen zeilenweise über `table tr` ausgelesen** — (s).
12. `/documentation/ads-commerce/marketing-api/overview/versioning` — "Marketing API
    versioning" ("Updated: Jun 24, 2026") — 10 541 Z. — erreicht über
    `/docs/marketing-api/versions`, das dorthin weiterleitet — (s) und (t).
13. `/docs/graph-api/overview/rate-limiting` — "Rate Limits - Graph API" — die
    Überschriftenliste vollständig, die tragenden Absätze im Wortlaut; `Conversions API` 0
    Treffer — (u).
14. `/documentation/meta-pixel/support` — "Meta Pixel support" ("Updated: Mar 28, 2025") —
    1 471 Z., vollständig; `event_source_url` 0 Treffer — (p).

**NACH DEM DURCHGANG DURCH DIE AUSSCHLUSS-LISTE VOM 2026-09-08 DOCH GEÖFFNET — ZWEI
SEITEN**, nach der Auflage, die Liste "gesehen, nicht geöffnet" gegen die offenen Fragen zu
halten:
· `/parameters/external-id` — ausgeschlossen als "Parameter INNERHALB des Ereignisses".
  Geöffnet, weil die Frage nach dem SELBST ZU ERZEUGENDEN Parameter nach dem Seitentitel
  dort liegt. **Ergebnis: sie trägt (o) UND die `fbp`-als-`external_id`-Tabelle aus (j), die
  an keiner anderen gelesenen Seite steht.** Der Ausschluss war für diese Fragen nicht
  haltbar.
· `/parameter-builder-library` — ausgeschlossen als "fremde Werkzeugkette". Geöffnet, weil
  DREI gelesene Seiten für den Format-Anhang auf sie verweisen und das Format Gegenstand von
  (h) und (i) ist. **Ergebnis: sie trägt (r) und das einzige `event_source_url`-Beispiel mit
  Query-String.** Der Ausschluss war nicht haltbar.

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `/parameters/custom-data`, `/parameters/app-data`, `/parameters/original-event` —
  **sachlich:** Geschäftsdaten, App-Ereignisse und Nachzügler-Ereignisse; die Frage dieser
  Lesung sind MATCH-Felder. Diese drei sind damit am 2026-09-22 **aus eigenem Grund** erneut
  ausgeschlossen, nicht aus dem von 2026-09-08 übernommenen.
· `/parameters/deduplicate-pixel-and-server-events` — **sachlich:** Metas Dedup war nicht
  Gegenstand dieser Lesung; was an `fbp` und `external_id` hängt, steht in (j), was die
  Server-Event-Seite beiläufig nennt, in (l).
· `/payload-helper` — am 2026-09-08 als Textquelle belegt unbrauchbar (420 Zeichen Prosa,
  der Rest ein interaktives Werkzeug). **Was das Werkzeug an Feldern anbietet, bleibt
  unerhoben** — dieselbe Lücke wie damals, unverändert.
· `/docs/graph-api/overview/rate-limiting`, die Unterabschnitte "Business Use Case Rate
  Limits → Ads Management" und "→ Ads Insights" mit den Zahlen — **BUDGET-AUSSCHLUSS**, und
  der naheliegendste Ort für eine auf unseren Forward anwendbare Zahl (s. (u)).
· `/documentation/meta-pixel/advanced/advanced-matching` — **sachlich:** die BROWSER-Seite
  derselben Felder; gefragt war, was der SERVER-Endpunkt annimmt.
· **"Direktintegrations-Playbook für Entwickler*innen (PDF)"** — ein DOWNLOAD, nach der
  Auflage nicht geöffnet. **Dieselbe benannte Lücke wie am 2026-09-08, unverändert.**
· Events Manager und Werbeanzeigenmanager — hinter einer Anmeldung, nicht betreten.

**GEÖFFNETE REITER: KEINE — und das ist ein Befund über die Seiten, keine Unterlassung.**
Auf allen vierzehn Seiten trifft `[role="tab"]` entweder **0-mal** (die zwölf
`/documentation/…`-Seiten) oder genau **3-mal**, und diese drei sind die Kopfnavigation der
Website ("Docs" / "Tools" / "Support") — geprüft an ihrem Text und an `aria-selected` auf
`/docs/graph-api/guides/versioning`. **KEINE Reiter-Gruppe im Inhalt.**
**KEINE TABELLE MIT SYMBOLEN ANGETROFFEN:** Alle gelesenen Tabellen tragen Wörter
("Hashing required", "Do not hash", "All website events"); die Tabelle in
`/parameters/external-id` trägt volle Sätze. Die Versions-Tabellen sind zeilenweise über das
DOM gelesen, nicht aus dem Fliesstext.

**ZWEI TOTE ADRESSEN, damit sie niemand ein zweites Mal probiert** (GEMESSEN, CC,
2026-09-22):
· `https://developers.facebook.com/docs/marketing-api/versioning` — **HTTP 404.**
· `https://developers.facebook.com/documentation/ads-commerce/marketing-api/versioning` —
  lädt, aber `main` trägt **31 Zeichen** ("Did you find this page helpful?"), also LEER.
  **Das ist die teurere der beiden:** eine 404 ist als Fehlschlag erkennbar, eine leere Seite
  sieht wie ein Nicht-Treffer am Inhalt aus.
**DER TRAGENDE PFAD IST** `/documentation/ads-commerce/marketing-api/overview/versioning`,
erreichbar über die Weiterleitung von `/docs/marketing-api/versions`.

