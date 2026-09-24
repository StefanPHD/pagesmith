# ZIEL-BEFUNDE — TikTok

**WOHER DIESE DATEI STAMMT:** Der Abschnitt "TikTok (Events API 2.0)" aus
docs/ziel-befunde.md, am 2026-09-22 hierher herausgeschnitten — ZEICHENGLEICH, aus den
Zeilen 9414 bis 9994 jener Datei. Kein Wort umformuliert, keine Angabe gekürzt, nichts
umsortiert, kein Kommentar ergänzt; die Reihenfolge ist die des Ursprungs.
DER BELEG: sha256 = 70ce633f1db0ab7bee02b94a412d44bf08eb370d2c333ef339e20a2a23bc0bdf über
den übernommenen Abschnitt — also über alles ab der Zeile "## TikTok (Events API 2.0)"
bis zum Dateiende, OHNE diesen Kopf. Wer prüfen will, ob hier jemand nachträglich ein Wort
geändert hat, misst gegen diese Prüfsumme.
ERGÄNZUNG 2026-09-24 — DIE PRÜFSUMME GILT DEM STAND DES COMMITS `11a44f7`, NICHT DEM HEUTIGEN
DATEIENDE. Seither kamen nur Anhänge und datierte Zeiger nach der Konvention hinzu
(Einzelheiten: git log); über den heutigen Stand geht die Summe darum nicht mehr auf. Gemessen
wird sie gegen `git show 11a44f7:docs/ziel-befunde/tiktok.md`, dort ab der Zeile "## TikTok
(Events API 2.0)". Der Satz darüber bleibt wörtlich; er war am Tag der Aufteilung richtig.

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

## TikTok (Events API 2.0)

**DIE BUCHSTABEN BEGINNEN HIER BEI (a)** — die Konvention im Kopf dieser Datei bindet die
Eindeutigkeit an den ZIEL-ABSCHNITT.

**WARUM DIESER ABSCHNITT ERST AM 2026-09-08 ENTSTEHT:** Wie bei meta — die Datei wurde
angelegt, als das vierte Ziel gebaut wurde. **DIESER ABSCHNITT IST NICHT VOLLSTÄNDIG:** Er
trägt AUSSCHLIESSLICH die Befunde zum TESTMODUS plus den einen Repo-Befund, der bis heute
keinen Ort hatte (Teil (f)).

### Abschnitts-Lesung 2026-09-08 der Events-API-2.0-Dokumentation zum Testmodus — die Teile (a) bis (g)

**HERKUNFT (2026-09-08):** ABSCHNITTS-LESUNG mit dem Browser-Werkzeug, durchgehend mit
`textContent`. GELESEN wurden SECHS Seiten des Abschnitts "Events API 2.0"; die Liste steht
am Ende unter "Der gelesene Umfang — TikTok".
**KEIN AUFRUF GEGEN DIE SCHNITTSTELLE.** Keine Anmeldung, keine Eingabe, kein Download.
**KEINE SEITE HAT VERSUCHT, DEN LESENDEN ANZUWEISEN.**

**EINE WERKZEUG-WARNUNG VORWEG, WEIL SIE DIESE LESUNG BEINAHE VERDORBEN HÄTTE:** Die
TikTok-Doku ist client-gerendert. Ein `fetch` auf sechs Kandidaten-URLs lieferte je rund
36 400 Zeichen — **jedes Mal dieselbe leere App-Hülle** — und `test_event_code`-Trefferzahl
**0**. Als Nicht-Treffer protokolliert hätte das gelautet "TikTok dokumentiert
`test_event_code` nirgends", sauber mit Reichweite ausgewiesen und **falsch**: die
GERENDERTE Seite derselben URL-Familie trägt vier Treffer. GEMESSEN am eigenen Lauf (CC,
2026-09-08). Es ist der Fall aus docs/immer-beachten.md, "EINE ABWESENHEIT KANN VOM WERKZEUG
ERZEUGT SEIN, NICHT VOM GEGENSTAND". **Jeder künftige Lauf gegen diesen Doku-Baum rendert.**

(a) DER TRÄGER IST EIN FELD AUF DER WURZELEBENE DES RUMPFES.
    GELESEN 2026-09-08,
    https://business-api.tiktok.com/portal/docs/events-api-v2-web-setup-verification/v1.3
    ("Verify Web Events API setup", 40 160 Zeichen gerendert; 4 Treffer auf
    `test_event_code`). Der Anbieter beschreibt: "In the body of your API request for
    reporting events, add a new field `test_event_code` and paste the code you get from Step
    2 as the value of the field."
    Im Doku-Beispiel steht das Feld neben `event_source` und `event_source_id`, **ausserhalb
    des `data`-Arrays** — dieselbe Ebenen-Lage wie bei meta, aber in einem anders geformten
    Rumpf.

(b) DER CODE STAMMT AUS DER OBERFLÄCHE DES WERBEKONTOS.
    GELESEN 2026-09-08, dieselbe Seite: "In the Test Events tab, click the test code button
    in Step 2 of the Test Server Events section to copy the code." Der Weg dorthin: Events
    Manager, Pixel anklicken, Reiter "Test Events".

(c) DIE PARAMETER-SEITE FÜHRT DEN TRÄGER NICHT — UND DAS IST EIN UNTERSCHIED ZU META, DER
    BEIM SUCHEN ZEIT KOSTET.
    GEMESSEN am gerenderten Dokument (CC, 2026-09-08),
    https://business-api.tiktok.com/portal/docs/parameters/v1.3 ("Events API Parameters"),
    **71 789 Zeichen gerendert: 0 Treffer auf `test_event_code`.**
    Bei meta steht der Parameter im Parameter-Verzeichnis (Abschnitt "Meta (Conversions
    API)", Teil (b)); bei tiktok steht er AUSSCHLIESSLICH in der Verifikations-Anleitung.
    **Wer ihn im Parameter-Verzeichnis sucht, findet ihn nicht und schliesst womöglich, es
    gebe ihn nicht.**

(d) ZU BERICHTERSTATTUNG UND OPTIMIERUNG SCHWEIGT DIE DOKU — UND DIESES SCHWEIGEN IST DIE
    WICHTIGERE HÄLFTE DIESES ABSCHNITTS, NICHT EINE AUSLASSUNG.
    **ACHSE:** `optimi` · `report` · `discard` · `exclud` · `drop`, case-insensitiv, über
    den gerenderten Rumpf von SECHS Seiten (Liste unten).
    **ERGEBNIS:** `optimi` und `report` treffen hundertfach — **ausschliesslich im
    Navigationsbaum** (Kampagnen-Optimierung, Reporting-API), **kein einziges Mal im
    Artikelrumpf zu Test-Ereignissen**. `discard`, `exclud` und `drop`: 0.
    Die einzige Aussage im Rumpf, die Messung berührt, betrifft Deduplizierung: "no double
    counting of such events will occur for the purposes of measurement and reporting" — das
    ist eine Aussage über DUBLETTEN, nicht über test-markierte Ereignisse.
    **WEDER BESTÄTIGT NOCH WIDERLEGT, DASS TIKTOK MARKIERTE EREIGNISSE MITZÄHLT.** Metas
    Aussage (Abschnitt "Meta (Conversions API)", Teil (a)) auf tiktok zu übertragen wäre
    eine Annahme über ein fremdes System und ist ausdrücklich NICHT gedeckt.

(e) OB DER CODE JE SITZUNG WECHSELT ODER ABLÄUFT — SCHWEIGEN MIT BENANNTER ACHSE.
    **ACHSE:** `session` · `expire` · `rotate` · `new code` · `regenerate` · `each time` ·
    `24`, case-insensitiv, über den gerenderten Rumpf derselben sechs Seiten.
    **ERGEBNIS: 0 Treffer im Rumpf.** `session` trifft fünfmal je Seite — jedes Mal im
    Navigationsbaum.
    **ANDERS ALS BEI META GIBT ES HIER NICHT EINMAL EINE AUFBEWAHRUNGSFRIST FÜR DIE
    ANSICHT** (dort Teil (d)).

(f) DER REPO-BEFUND "WECHSELT PRO SITZUNG" — GEMESSEN 2026-08-11, UND ER HATTE BIS HEUTE IN
    DIESER DATEI KEINEN ORT.
    **PROVENIENZ: GEMESSEN 2026-08-11**, im Testmodus eines eigenen Werbekontos. Die
    Herkunft der Angabe ist ein Kommentar in `src/lib/capi/tiktok-forward.ts`; die H1-Matrix
    in docs/ziel-fragenkatalog.md führt sie als beantwortet mit dem Kürzel für "gemessen",
    wörtlich: "`test_event_code` in der Nutzlast, wechselt pro Sitzung, gem".
    **DASS ER HIER FEHLTE, IST GEMESSEN** (CC, 2026-09-08: die Datei trug bis zu diesem
    Eintrag genau drei Ziel-Abschnitte — LinkedIn, Google, Pinterest; eine
    Überschriften-Suche nach meta bzw. tiktok traf null). Er wird hier nachgetragen, damit
    er den Ort hat, an dem Anbieter-Befunde geführt werden.
    **DIE DOKU STÜTZT IHN NICHT UND WIDERLEGT IHN NICHT** (s. (e)). Ein Doku-Schweigen
    entlastet eine Messung nicht und entkräftet sie nicht. **DER BEFUND BLEIBT ALLEIN VON
    JENER MESSUNG GETRAGEN**, und das Protokoll jener Messung liegt nicht vor — was genau
    beobachtet wurde und mit welcher Gegenkontrolle, ist an keiner Stelle des Repos
    festgehalten (GEMESSEN, CC, 2026-09-08).

(g) DIE AUFLAGE "VOR DEM PRODUKTIV-MODUS ENTFERNEN" STEHT DA — OHNE GENANNTE FOLGE.
    GELESEN 2026-09-08, "Verify Web Events API setup", wörtlich: "Make sure to remove
    `test_event_code` before switching to 'Production' mode."
    **KEINE FOLGE WIRD GENANNT** — dieselbe Bauform wie bei meta (Abschnitt "Meta
    (Conversions API)", Teil (e)). Anders als dort steht daneben aber KEINE Aussage darüber,
    was mit den markierten Ereignissen geschieht; bei tiktok bleibt also beides offen: die
    Wirkung des Entfernens UND die Wirkung des Markierens.

### Beobachtung an der Test-Events-Ansicht des Werbekontos (2026-09-09) — der Teil (h)

**HERKUNFT:** GELESEN an der OBERFLÄCHE eines eigenen TikTok-Werbekontos (Stefan,
2026-09-09), im Zuge des Live-Tests der Scheibe 11.3b. **NICHT an der Dokumentation, NICHT
gemessen.** Es ist dieselbe Herkunftsklasse wie bei Pinterest, Teile (r) bis (t) — eine
Aussage, die der Anbieter in seiner eigenen Oberfläche trifft.

(h) DIE TEST-EVENTS-ANSICHT SAGT, TEST-EREIGNISSE LANDETEN NICHT IN DEN ECHTEN DATEN.
    **WÖRTLICH:** "Test events will not be included in actual data."
    Gelesen in derselben Ansicht, aus der nach Teil (b) der Testcode kopiert wird (Events
    Manager, Pixel, Reiter "Test Events").

    **WARUM DAS HIER STEHT UND NICHT UNTER (d):** Teil (d) ist eine Aussage über die
    DOKUMENTATION, und die bleibt unverändert richtig — die Doku schweigt weiterhin, mit
    der dort benannten Achse über sechs Seiten. **Diese Zeile kommt aus einer ANDEREN
    QUELLE.** Sie hebt das Schweigen der Doku nicht auf; sie tritt daneben.

    **SIE IST DAS GEGENTEIL VON METAS AUSSAGE, UND DAS IST DER GRUND, WARUM SIE EINEN
    EIGENEN TEIL BEKOMMT.** Meta sagt in seiner Doku, ein test-markiertes Ereignis werde
    NICHT verworfen und fliesse in Targeting und Messung (Abschnitt "Meta (Conversions
    API)", Teil (a)). TikToks Oberfläche sagt für ihre Test-Ereignisse das Umgekehrte.
    **ZWEI ZIELE DERSELBEN KLASSE VERHALTEN SICH DAMIT MÖGLICHERWEISE ENTGEGENGESETZT** —
    und wer von einem auf das andere schliesst, trifft eine Annahme über ein fremdes
    System.

    **WAS DIESE ZEILE IST UND WAS NICHT — die Trennung trägt den ganzen Teil:** Sie ist
    eine ZUSAGE DES ANBIETERS in seiner Oberfläche, **keine Beobachtung des Verhaltens**.
    Sie steht damit über einem Schweigen, aber unter einer Messung. Wer sie als Beleg
    dafür nimmt, dass TikTok test-markierte Ereignisse tatsächlich aus Berichterstattung
    und Optimierung heraushält, hebt eine gelesene Zusage auf den Rang einer Messung —
    genau der Fehler, den dieses Projekt bei Meta schon einmal in die andere Richtung
    gemacht hat.

    **AUSDRÜCKLICH NICHT GEMESSEN, und der Satz gehört dazu, weil er die naheliegende
    nächste Prüfung benennt:** ob das im selben Lauf gesendete Ereignis AUCH in TikToks
    NORMALER Ereignis- bzw. Berichtsansicht erscheint. Der Lauf vom 2026-09-09 hat
    ausschliesslich die TEST-Ansicht angesehen; die andere ist nicht geöffnet worden.
    **Erst dieser Vergleich träfe eine Aussage über das Verhalten** statt über die Zusage.

    **WORAUF ES IM PRODUKT DRÜCKT:** Die Rahmung der Phase 11.3 ("Sichtbarkeit, nicht
    Isolation") ruht auf Metas Aussage. Trifft TikToks Zeile zu, gilt der Preis dieser
    Rahmung — der Testklick zählt beim Anbieter als echte Conversion — **für TikTok
    womöglich nicht**. Eine Produktzeile, die das für alle Ziele gleich behauptet, wäre
    dann für eines davon zu grob. Die Folge für den Text ist gebaut: Der Banner-Satz ist seit
    Scheibe 11.3f ziel-abhängig und führt für TikTok das Nichtwissen. Die offene Messung dazu
    steht in docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.3 gehoben
    (2026-09-11) …", Vorrat (1); **hier steht der Befund, dort die Messung** — zweimal
    geschrieben liefen sie auseinander.

    **DIE GRENZE DER REICHWEITE, die schon (d) trägt, gilt auch hier:** Das Sandbox-Konto
    unter "Get Started" der Marketing-API ist weiterhin nicht geöffnet (s. "Der gelesene
    Umfang — TikTok"). Es bleibt der naheliegendste Ort für eine BELASTBARE Aussage über
    Testdaten und Berichterstattung.

### Der gelesene Umfang — TikTok

**GEÖFFNET UND GELESEN (6 Seiten), alle unter
`https://business-api.tiktok.com/portal/docs/…/v1.3`, je mit gerenderter Zeichenzahl:**

1. `events-api-v2-web-setup-verification` — "Verify Web Events API setup" (40 160 Z.) —
   **die tragende Fundstelle**, (a), (b), (g).
2. `parameters` — "Events API Parameters" (71 789 Z.) — (c).
3. `setup-guide-for-web` — "Setup guide for Web" (65 326 Z.) — 0 Treffer auf
   `test_event_code`.
4. `events-api-v2-web-faqs` — "Events API for Web FAQs" (37 529 Z.) — trägt genau ZWEI
   Fragen (Fehlercode 40001, Fundort des Pixel-Codes); nichts zum Testmodus.
5. `work-with-payload-helper-for-web` — "Work with Payload Helper for Web" (39 208 Z.) —
   0 Treffer auf `test_event_code`.
6. `supported-events` — "Events API supported events" (56 268 Z.) — 0 Treffer.

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `Events API for Offline`, `Events API for App`, `Events API for CRM` samt ihren eigenen
  Setup- und Verify-Seiten — andere Ereignisquellen; unser Adapter sendet Web.
  **ANMERKUNG ZUR SUCHFALLE:** Der Slug `verify-events-api-setup` löst auf die CRM-Variante
  auf. Die Web-Variante heisst `events-api-v2-web-setup-verification`. Wer die erste öffnet
  und darin `test_event_code` nicht findet (0 Treffer, 36 560 Z. — geprüft), hält den
  Träger für undokumentiert.
· `Events API 1.0` (mit allen Unterseiten) — ältere Fassung; gebaut wird auf 2.0.
· `Events API Gateway`, `TikTok App Events SDK`, `Google Tag Manager (GTM) Integration`,
  `Pixel`-Abschnitt — andere Integrationswege.
· `Send Custom Attribution data to TikTok via Events API 2.0`, `Limited data use`,
  `Payload Converter`, `Authentication`, `Responses and errors` — im Abschnitt, aber ohne
  Bezug zu den vier Fragen dieser Lesung.
· `Sandbox accounts` (unter "Get Started" der Marketing-API) — **DER GRENZFALL DIESER
  LISTE.** Er liegt in einem anderen Abschnitt, und der Zugang verlangt eine Anmeldung.
  Ein Sandbox-Konto ist der naheliegendste Ort für eine Aussage über Testdaten und
  Berichterstattung; **dass er nicht geöffnet ist, begrenzt die Reichweite von (d).**

### Browser-Tag-Lesung 2026-09-21 (Crawl 2 der Phase 11.11) — der Teil (i)

**HERKUNFT (2026-09-21):** Eine Lesung mit dem Browser-Werkzeug, durchgehend über
`textContent` und über den Artikel-Rumpf (`.doc-content-body`) statt über `body` — **das
war hier nötig und nicht bloss sparsam:** Das `<main>`-Element dieser Doku enthält den
gesamten Navigationsbaum (rund 62 460 Zeichen gegen 25 740 im Artikel-Rumpf), und eine
Lesung darüber hätte den Befund in einem Inhaltsverzeichnis ertränkt. GELESEN wurden ZWEI
Seiten; die Liste steht am Ende dieses Teils. **KEIN AUFRUF GEGEN DIE SCHNITTSTELLE**,
keine Anmeldung, keine Eingabe auf einer fremden Seite, kein Download. Alles unten ist
GELESEN und **ersetzt keine Messung**.

**DER GEGENSTAND IST EIN ANDERER ALS IN DEN TEILEN (a) BIS (h):** Jene handeln vom
TESTMODUS. Hier geht es um das BROWSER-TAG — Script-Adresse, globale Namen,
`noscript`-Rückfall —, weil die Phase 11.11 fremde Tracking-Bausteine in importiertem HTML
ERKENNEN will.

(i) DAS TIKTOK-PIXEL — ADRESSE, GLOBALE NAMEN, UND KEIN RÜCKFALL-ELEMENT.
    GELESEN 2026-09-21 an business-api.tiktok.com/portal/docs/install-pixel-using-code/v1.3
    ("Install Pixel using code | TikTok API for Business", Artikel-Rumpf rund 25 740
    Zeichen; die angefragte Adresse `ads.tiktok.com/marketing_api/docs?id=1739585702922241`
    leitet dorthin weiter), Abschnitte "Install the pixel", "Event codes", "Install event
    code" und "FAQs".
    · **(a) DIE SCRIPT-ADRESSE:** `https://analytics.tiktok.com/i18n/pixel/events.js`, im
      Basiscode der Variablen `i` zugewiesen und zur Laufzeit als
      `o.src = i + "?sdkid=" + e + "&lib=" + t` eingehängt — die Pixel-Kennung reist also
      in der Abfrage, der Wert `ttq` als `lib`. **NUR IM BEISPIEL** ("BASE CODE TEMPLATE");
      der Fliesstext nennt keine Adresse. Dieselbe Adresse steht auf der Seite zusätzlich
      als Verweis mit dem Linktext "Sdk Link" (im Abschnitt "Debug Mode").
      **ES IST DIE EINZIGE ADRESSE DER SEITE** — Achse `https?://…` über den vollen
      Artikel-Rumpf, genau ein Treffer.
    · **(b) DIE GLOBALEN NAMEN:** `window.TiktokAnalyticsObject` (Wert `'ttq'`) und `ttq`
      selbst, dazu `ttq.methods` (im Beispiel als Liste ausgeschrieben: `page`, `track`,
      `identify`, `instances`, `debug`, `on`, `off`, `once`, `ready`, `alias`, `group`,
      `enableCookie`, `disableCookie`), `ttq.load`, `ttq.instance`, `ttq.setAndDefer` und
      die Speicher `ttq._i`, `ttq._t`, `ttq._o`. Die charakteristischen Aufrufe:
      `ttq.load('<pixel id>');` · `ttq.page();` · `ttq.track('<Event>')` ·
      `ttq.instance('<pixel id>').track('<Event>')`.
      **`ttq.load()` UND `ttq.page()` STEHEN IM FLIESSTEXT** ("Part 2 contains
      ttq.load('{pixel ID placeholder}') … ttq.page() will report a page view event"),
      ebenso `ttq.track('')` ("You can call the ttq.track('') function anywhere between your
      web page's opening and closing `<body>` tags"). `window.TiktokAnalyticsObject` und die
      Methodenliste stehen **NUR IM BEISPIEL.**
      **`window.TiktokAnalyticsObject` IST DER TRAGFÄHIGSTE ANKER DIESES ANBIETERS:** Der
      Name `ttq` ist im Basiscode ein durchgereichter Parameter (`}(window, document,
      'ttq');`) und damit im Quelltext austauschbar; die Eigenschaft
      `TiktokAnalyticsObject` steht fest. **DASS SIE SICH ÄNDERN LIESSE, IST NICHT GESAGT
      UND NICHT GEMESSEN** — die Doku zeigt in allen Beispielen `'ttq'`.
    · **(c) EIN `noscript`-RÜCKFALL: NICHT GEFUNDEN.** ACHSE `noscript` und `<img` über den
      vollständigen Artikel-Rumpf der Einbau-Seite — **je 0 Treffer.**
      **DAS IST DER EINZIGE DER FÜNF ZIELE OHNE RÜCKFALL-ELEMENT IM GELESENEN UMFANG**, und
      es ist **KEINE ENTWARNUNG:** Reichweite ist diese eine Seite; ein Bild-Rückfall könnte
      in den nicht geöffneten Zweigen stehen.
    **ZWEI NEBENBEFUNDE, die keine Frage dieses Laufs beantworten und trotzdem hierher
    gehören, weil sie den Gegenstand berühren:**
    NEBENBEFUND 1 — Die Doku empfiehlt für die Einwilligung ausdrücklich FREMDE Werkzeuge
    ("TikTok Pixel integrates with many third-party consent management platforms") und
    daneben einen eigenen "Pixel Cookie Consent Mode" (FLIESSTEXT, Abschnitt "Disable the
    pixel when a user opts out"; die verlinkte Seite ist NICHT geöffnet).
    NEBENBEFUND 2 — Der Debug-Modus wird über das Cookie `pixel_debug=true` eingeschaltet,
    und die Konsolen-Ausgaben beginnen mit `[TT]` (FLIESSTEXT).

**DER GELESENE UMFANG (2026-09-21) — TikTok, Browser-Tag**

**GEÖFFNET UND GELESEN (2 Seiten):**
1. `business-api.tiktok.com/portal/docs/events-api-v1-web-get-started/v1.3` — "Get started
   for Events API 1.0 Web" — **NUR ALS DURCHGANG**, weil die angefragte Kennung
   `?id=1739584855420929` dorthin geleitet hat; der Verweis "installing the pixel base code"
   darin führte auf die richtige Seite. **KEIN BEFUND ENTNOMMEN**; die Seite betrifft
   ausserdem die ÄLTERE Fassung 1.0.
2. `business-api.tiktok.com/portal/docs/install-pixel-using-code/v1.3` — "Install Pixel
   using code" (Artikel-Rumpf rund 25 740 Z.) — die tragende Fundstelle für (i).

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `business-api.tiktok.com/portal/docs?id=1795929012554754` ("Pixel Cookie Consent Mode") —
  **BUDGET-AUSSCHLUSS.** Ein eigener Einwilligungs-Modus des Anbieters ist der
  naheliegendste Ort für eine ABWEICHENDE Gestalt des Tags (geparkte Scripte, zusätzliche
  Attribute); **dass er nicht geöffnet ist, begrenzt die Reichweite von (i).**
· `ads.tiktok.com/help/article?aid=9661` ("Learn how to use Pixel Helper") und die
  Chrome-Erweiterung "TikTok Pixel Helper" — **BUDGET-AUSSCHLUSS** bzw. ein Download, der
  nach der Auflage "kein Download" ohnehin ausscheidet. Ein Prüfwerkzeug ist ein möglicher
  Ort für eine Aussage darüber, woran der Anbieter sein eigenes Tag erkennt.
· Die Zweige "Events API 2.0", "Events API for Web" und "Setup guide" im selben
  Navigationsbaum — sachlich: der SERVER-Weg, in den Teilen (a) bis (h) behandelt.
· Events Manager und TikTok Ads Manager — hinter einer Anmeldung, nicht betreten.

### Abschnitts-Lesung 2026-09-22 der Events-API-2.0- und der Marketing-API-Dokumentation (Klick-Kennung, Match-Felder, Deduplizierung, Rate-Limits, Versionierung) — die Teile (j) bis (p)

**HERKUNFT (2026-09-22):** ABSCHNITTS-LESUNG mit dem Browser-Werkzeug, durchgehend mit
`textContent` und über den Artikel-Rumpf (`.doc-content-body`); jede Seite GERENDERT — die
Werkzeug-Warnung im Kopf dieses Abschnitts ist damit befolgt. GELESEN wurden NEUN Seiten;
die Liste steht am Ende unter "Der gelesene Umfang (2026-09-22) — TikTok, Transport".
Durchgehend die ENGLISCHE Fassung; eine übersetzte ist nicht ausgeliefert worden. **KEIN
AUFRUF GEGEN DIE SCHNITTSTELLE**, keine Anmeldung, keine Eingabe, kein Download. **KEINE
SEITE HAT VERSUCHT, DEN LESENDEN ANZUWEISEN.**

**DER DOKU-BAUM TRÄGT KEIN ÄNDERUNGSDATUM — EINMAL GESAGT, NICHT JE TEIL:** GEMESSEN (CC,
2026-09-22) an der zuletzt geöffneten Seite über den vollen Seitenrumpf: `Last updated`,
`Updated` und `updated` je NULL Treffer. Der einzige Stand-Anker dieser Lesung ist die
Versionsmarke `v1.3` im Pfad jeder Seite. **Alles unten ist GELESEN und ERSETZT KEINE
MESSUNG**; was nur ein Aufruf zeigt, steht unten eigens als NICHT BEANTWORTET.

**DER GEGENSTAND IST EIN ANDERER ALS IN DEN TEILEN (a) BIS (i):** Jene handeln vom
TESTMODUS (a bis h) und vom BROWSER-TAG (i). Hier geht es um den TRANSPORT — Klick-Kennung,
Browser-Kennung, Match-Felder, Seitenadresse, Deduplizierung, Rate-Limits, Versionierung.

**DER BESTAND TRUG DAZU FAST NICHTS** — GEMESSEN am TikTok-Abschnitt dieser Datei (CC,
2026-09-22, gezielte Suche über die Zeilen dieses Abschnitts, Positivkontrolle `pixel` 22 ·
`ttq` 13 · `v1.3` 6): `ttclid` 0 · `_ttp` 0 · `user_agent` 0 · `page.url` 0 · `event_id` 0 ·
`sha256` 0. Die Treffer auf `version`, `rate` und `limit` waren SÄMTLICH unecht
("Conversion", "regenerate", der Seitentitel "Limited data use"). **DIE EINZIGE BESTEHENDE
ANGABE ZUR DEDUPLIZIERUNG STEHT IN TEIL (d) UND BLEIBT DORT WÖRTLICH;** der Teil (n) knüpft
daran an und ersetzt sie nicht.

(j) DIE KLICK-KENNUNG HEISST `ttclid`, UND DER ANBIETER NENNT DREI HERKUNFTSWEGE.
    GELESEN 2026-09-22,
    https://business-api.tiktok.com/portal/docs/send-tiktok-click-id-ttclid/v1.3
    ("Send TikTok Click ID", Artikel-Rumpf 7 152 Zeichen; die angefragte Adresse
    `ads.tiktok.com/marketing_api/docs?id=1771100879787009` leitet dorthin weiter).
    · HERKUNFT, WEG 1 — PARAMETER DER ADRESSE: "TikTok only appends the ttclid parameter to
      the landing page URL of an ad." Das Beispiel der Seite zeigt einen Wert der Form
      `?ttclid=E.C.P.v3fQ2RHacdksKfofPmlyuStIIHJ4Af1tKYxF9zz2c2PLx1Oaw15oHpcfl5AH`. Der
      Anbieter nennt als Option, den Parameter in der Adresse STEHENZULASSEN und "send the
      full URL (with URL parameters) in the page.url field of the API payload".
    · HERKUNFT, WEG 2 — COOKIE DES ANBIETER-TAGS: "If you've installed the TikTok Pixel on
      your website, it will automatically parse the ttclid from the landing page URL and
      store its value as a first-party cookie under your website domain. **The cookie's
      name is also `ttclid`.**"
    · HERKUNFT, WEG 3 — SELBST AUSLESEN UND SELBST ABLEGEN: "you can parse and store the
      ttclid on your own … It is recommended to use browser cookie storage or HTML5 local
      storage. The recommended storage TTL (time-to-live) is 28 days or more … If a new
      ttclid is detected on your landing page URL, you should refresh the stored value to
      the latest seen value." Dazu: "It's highly recommended to implement at least one of
      the above three options."
    · FORMAT: KEINE Grammatik genannt. EINE harte Längenangabe: "ttclid can be up to 1,000
      characters long, so you need to ensure that you don't truncate it on your server."
    · GÜLTIGKEITSDAUER (Parameter-Seite, s. (l)): "The ttclid valid period is the same as
      your CTA window setting in Attribution Manager."
    · ORT IN DER NUTZLAST: `user.ttclid` — "Report the user's events with ttclid inserted
      into Events API user.ttclid field via /event/track/."
    · RANG: **EMPFOHLEN, NICHT VERLANGT.** "It is strongly recommended to send back the
      ttclid via Events API 2.0 for all events from your website." Die Web-Tabelle der
      Setup-Seite führt `ttclid` mit dem Häkchen der Spalte "Recommended ?" (s. (l)). KEINE
      der gelesenen Seiten nennt es Required.
    · EINE GEGENRICHTUNG STEHT AUF DERSELBEN SEITE, mit Beispielcode: ein Abschnitt "Remove
      ttclid from landing page URLs". **EINE FOLGE FÜR DIE ZUORDNUNG WIRD DORT NICHT
      GENANNT.**

(k) DIE BROWSER-KENNUNG HEISST `ttp` IN DER NUTZLAST UND `_ttp` IM COOKIE — UND SIE SETZT
    EIN INSTALLIERTES PIXEL MIT EINGESCHALTETEN FIRST-PARTY-COOKIES VORAUS.
    GELESEN 2026-09-22,
    https://business-api.tiktok.com/portal/docs/send-tiktok-cookie-ttp/v1.3
    ("Send TikTok Cookie", Artikel-Rumpf 1 112 Zeichen): "When you enable first-party
    cookies in your TikTok Pixel settings …, TikTok will automatically store a unique
    identifier in a first-party cookie named `_ttp` on your website domain." Auslesen: "To
    capture the _ttp cookie value on your web server, you can parse it from the HTTP cookie
    request header." ORT: `user.ttp`; die Seite zeigt einen Beispielwert von 27 Zeichen.
    RANG: empfohlen ("it's recommended to include the ttp cookie value in the Events API
    payload"), Häkchen in der Recommended-Spalte der Web-Tabelle (s. (l)).
    **ES SIND ZWEI VERSCHIEDENE COOKIES MIT ZWEI VERSCHIEDENEN FELDERN:** `_ttp` →
    `user.ttp` (diese Zeile) und `ttclid` → `user.ttclid` (Teil (j), Weg 2). Wer sie
    zusammenzieht, hält eine Klick-Kennung für eine Besucher-Kennung.
    **EINE FOLGERUNG ÜBER DEN EIGENEN CODE, ALS SOLCHE GEKENNZEICHNET** — sie gehört hierher,
    weil sie die Reichweite beider Wege bestimmt: Unser ausgelieferter Text trägt KEIN
    TikTok-Tag (GEMESSEN am Repo, CC, 2026-09-22, HEAD `ad0501e`; Achse `ttq` ·
    `analytics.tiktok` · `TiktokAnalyticsObject` über `src/**/*.ts(x)`: fünf Treffer, davon
    vier in der Erkennung FREMDER Pixel — src/lib/foreign-signatures.ts und deren Test —
    und einer als Platzhaltertext in src/components/ActionPanel.tsx; POSITIVKONTROLLE:
    `fbq` trifft die Erzeuger src/lib/generate.ts und src/lib/mappings.ts). Ein `_ttp`
    entstünde auf einer Kundenseite also nur, wenn der Betreiber SEIN EIGENES TikTok-Pixel
    mitbringt — genau die Klasse, die die Phase 11.11 erkennt und auf Klick entfernt.

(l) DIE MATCH-FELDER — ZWEI SEITEN, ZWEI VERSCHIEDEN LANGE LISTEN UND ZWEI VERSCHIEDEN
    SCHARFE PFLICHTMARKEN. **DIE DIVERGENZ WIRD HIER BERICHTET UND NICHT AUFGELÖST.**
    GELESEN 2026-09-22 an zwei Seiten:
    `…/portal/docs/parameters/v1.3` ("Events API Parameters", Artikel-Rumpf 35 679 Zeichen;
    voller Seitenrumpf 75 911) und `…/portal/docs/setup-guide-for-web/v1.3` ("Setup guide
    for Web", 28 994 Zeichen).
    · **DAS `user`-OBJEKT DER PARAMETER-SEITE, ALLE QUELLEN:** `ttclid` (web only, kein
      Hash) · `email` (SHA-256 required) · `phone` (SHA-256 required) · `external_id`
      (SHA-256 required) · `ttp` (web only, kein Hash) · `ip` ("Non-hashed public IP address
      of the user's device", IPv4 UND IPv6, "both full and compressed formats are
      acceptable") · `user_agent` ("Non-hashed user agent") · `first_name` (SHA-256
      required) · `last_name` (SHA-256 required) · `city` · `state` · `country` (je
      normalisiert, kein Hash genannt) · `zip_code` (SHA-256 required) · `idfa` · `idfv` ·
      `gaid` (je APP ONLY) · `locale` (kein Hash) · `att_status` (APP ONLY).
      **KEIN EINZIGES FELD DIESES OBJEKTS TRÄGT DORT DIE MARKE "Required".** Die Rangaussage
      der Seite ist Fliesstext: "it is highly recommended to include multiple types of
      matching data" und, zu den beiden, die wir heute senden: "we recommend sending both ip
      and user_agent".
    · **DIE WEB-TABELLE DER SETUP-SEITE IST KÜRZER UND TRÄGT EINE SYMBOL-SPALTE** — sie
      heisst "Recommended ?" und ist die ERSTE der ZWEI Symbol-Tabellen dieser Lesung; sie
      wird hier als solche benannt und nicht als leer behandelt. ACHT Zeilen: Häkchen bei
      `ttclid`, `email`, `phone`, `external_id`, `ttp`, `ip`, `user_agent`; OHNE Häkchen
      `locale`. **DIE NAMENS- UND ADRESSFELDER DER PARAMETER-SEITE FEHLEN DORT GANZ.**
    · **DIE PFLICHT LIEGT EINE EBENE HÖHER, UND GENAU DARIN GEHEN DIE ZWEI SEITEN
      AUSEINANDER:** Auf der Setup-Seite sind `event_source`, `event_source_id`, `data`,
      `event`, `event_time`, **`user`** und **`page`** als "Required" markiert, `event_id`
      als "Conditional" ("Required if you are sending web events (event_source = web) from
      both TikTok browser pixel and Events API"), `properties`, `ad` und `limited_data_use`
      ohne Marke. Auf der Parameter-Seite trägt `user` **KEINE** Required-Marke und `page`
      steht als "Conditional — Required for web events". **WELCHE DER BEIDEN GILT, SAGT
      KEINE VON BEIDEN.**
    · **DIE ZWEITE SYMBOL-TABELLE** steht am `properties`-Objekt: zwei Spalten "Required for
      reporting Return on Ad Spend (ROAS) or for Value-based Optimization (VBO)" (Häkchen
      bei `currency` und `value`) und "Required for Video Shopping Ads (VSA)" (Häkchen bei
      `content_ids`, `contents`, `content_type`).
    · **DAS `ad`-OBJEKT IST FÜR WEB ZULÄSSIG UND OHNE PFLICHTMARKE:** `campaign_id`,
      `ad_id`, `creative_id` — zu allen dreien "typically parsed from the landing URL or
      deeplink" —, dazu `attribution_provider`, `attribution_share`, `attribution_value`,
      die zwei Attributionsfenster und `attribution_method`; die übrigen
      `attribution`-Felder sind app only.
    · **EIN FELD IST GESONDERT ZU MELDEN, WEIL SEIN WERT VON UNS KÄME:** `external_id`.
      GELESEN 2026-09-22, `…/portal/docs/set-up-external-id/v1.3` ("Set up External ID",
      2 127 Zeichen): "an identifier that represents a user on an advertiser's platform,
      such as a customer ID, loyalty card number or order ID"; SHA-256 verlangt; der
      Anbieter nennt als Nutzen "complete cross-device and cross-session matching"; der
      Rückzug geht nur über das Weglassen des Feldes ("please update your setup to remove
      the external_id field"). **ALLE ÜBRIGEN MERKMALE SIND FREMDVERGEBEN ODER KOMMEN AUS
      DER ANFRAGE** (`ip`, `user_agent`) **BZW. AUS EINEM GESCHÄFTSVORGANG.**
    · **PERSONENBEZOGENES IST HIER NUR AUFGEZÄHLT, NICHT VERTIEFT** — `email`, `phone`,
      `first_name`, `last_name`, `city`, `state`, `country`, `zip_code`, je mit der oben
      genannten Hash-Auflage.

(m) DER ANBIETER LIEST DIE KLICK-KENNUNG AUS DER ÜBERGEBENEN SEITENADRESSE SELBST AUS —
    WÖRTLICH UND OHNE VORBEHALT.
    GELESEN 2026-09-22, "Send TikTok Click ID", Abschnitt "Store the ttclid": "Keep the
    ttclid parameter in the URL as the website redirects to different pages (for instance,
    from landing page to a product page), and send the full URL (with URL parameters) in the
    page.url field of the API payload. **The API backend will parse the Click ID if it
    detects the presence of a ttclid parameter in the page.url.**"
    · ZUM INHALT DES ADRESSFELDES — QUERY-STRING AUSDRÜCKLICH JA: `page.url` ist auf der
      Setup-Seite **Required**; "The browser URL where the event happened, for example, the
      value of location.href in the client side Javascript. It is recommended to use the
      full URL, including all URL parameters." Das Beispiel der Doku zeigt eine Adresse MIT
      Query-String. Daneben `page.referrer` (ohne Pflichtmarke, "document.referrer in the
      client side Javascript, or the server side Referer http header", ebenfalls "including
      all URL parameters" empfohlen).
    · **DIE REICHWEITE GEHÖRT DAZU:** Diese Aussage betrifft `ttclid`. **Dass TikTok aus
      `page.url` auch FREMDE Kennungen ausliest, steht auf KEINER der gelesenen Seiten** —
      ein Nicht-Treffer mit genau dieser Reichweite, und keine Zusage in die eine oder
      andere Richtung.

(n) DIE DEDUPLIZIERUNG — SCHLÜSSEL, ZWEI FENSTER UND EIN ZWEITER, SICH AUSSCHLIESSENDER WEG.
    GELESEN 2026-09-22, https://business-api.tiktok.com/portal/docs/event-deduplication/v1.3
    ("Event Deduplication", 4 800 Zeichen). **SIE ERGÄNZT DEN SATZ AUS TEIL (d) UND ERSETZT
    IHN NICHT:** dort steht derselbe Sachverhalt als Nebensatz einer Testmodus-Frage, hier
    die Regel selbst.
    · SCHLÜSSEL: "TikTok deduplicates events based on their event_source_id, event (for
      instance, Purchase, or AddToCart) and event_id."
    · FENSTER: "If multiple events with the same event_source_id, event and event_id are
      received, we keep the first one and discard any later ones received **within 48 hours**
      of the first event. If a later event is received **within 5 minutes** of the first
      event, we attempt to **merge** its data into the first event" — das Beispiel der Seite:
      eine im ersten Ereignis fehlende `user.email` wird aus dem späteren nachgetragen.
    · GEGEN WELCHE EREIGNISSE: ausdrücklich Browser-Pixel UND Events API, "from a single
      channel or across multiple channels (for instance browser pixel and Events API)".
    · `event_id` SELBST: "(Recommended)"; "Advertisers should choose a unique string as the
      event_id for each event … It can be hashed or unhashed"; es "must be consistent across
      the Pixel SDK Events and Events API Events for deduplication to work".
    · **DER ZWEITE WEG SCHLIESST DEN ERSTEN AUS:** Cookie-Deduplizierung über `_ttp` mit dem
      Schlüssel "[pixelCode, event, _ttp]" und einem **5-Minuten-Fenster**. Drei Grenzen
      nennt die Seite selbst: sie verwirft **nur** Ereignisse der Events API und "will never
      drop any event sent from the browser pixel"; sie greift nur, "when event_id is not set
      in the Events API payload"; und "if you want to leverage cookie based deduplication,
      do not send event_id in the Events API payload for an event".
    · PRÜFWEG BEIM ANBIETER: die Metriken "Browser", "Server" und "Server & Browser" auf der
      Detailseite des Pixels, dazu "Event Health" je Ereignistyp mit der Verbindungsart
      "Server & Browser".

(o) DAS RATE-LIMIT DER SCHNITTSTELLE IST BEZIFFERT, FÜR ALLE STUFEN GLEICH — UND SEIN
    FEHLERCODE KOMMT MIT HTTP 401.
    GELESEN 2026-09-22 an zwei Seiten:
    https://business-api.tiktok.com/portal/docs/rate-limits/v1.3 ("Rate limits Overview",
    8 703 Zeichen) und https://business-api.tiktok.com/portal/docs/responses-and-errors/v1.3
    ("Events API Responses and errors", 3 641 Zeichen).
    · DIE ZEILE `/event/track/` der endpunkt-spezifischen Tabelle führt auf ALLEN VIER
      Stufen (Basic, Advanced, Premium, Ultimate) **dieselben** Werte: QPS 1 000 · QPM
      600 000 · QPD 86 400 000. Dazu wörtlich: "You don't need to apply for rate limit level
      change for Events API, because the rate limit is the same for all levels."
    · DER BEZUG: "Global rate limits apply to API requests to all endpoints **by a developer
      application**"; endpunkt-spezifische Limits gelten je Endpunkt unabhängig voneinander.
    · ÜBERSCHREITUNG: "Once the rate limit is met, the server returns "code": 40100, which
      means your request was throttled." Wartezeiten: QPM fünf Minuten, QPD bis 00:00:00
      UTC+0.
    · DIE FEHLERSEITE BESTÄTIGT DIESELBE ZAHL UND NENNT DEN HTTP-STATUS: "40100 | 401 | Too
      many requests (exceeded API quota limit). Common causes: The rate limit for the
      endpoint (1,000 queries per second) has been reached, thus your request is throttled."
      **ES IST HTTP 401, NICHT 429** — dieselbe Statuszeile wie `40104` ("Access token is
      empty").
    · EINE ZWEITE GRENZE, DIE KEIN RATE-LIMIT IST UND DANEBEN GEHÖRT: "you can report up to
      1000 objects in one request. If a request contains more than 1,000 events, the entire
      request will be rejected" (Fehlercode `40002`).

(p) DIE VERSIONIERUNG — `v1.3` IST DIE AKTUELLE FASSUNG, HAT KEIN ABSCHALTDATUM, UND EIN
    ABLAUF SCHLÄGT LAUT FEHL.
    GELESEN 2026-09-22 an zwei Seiten:
    https://business-api.tiktok.com/portal/docs/versioning/v1.3 ("Versioning", 2 063
    Zeichen) und https://business-api.tiktok.com/portal/docs/timelines/v1.3 ("Timelines",
    664 Zeichen).
    · "The latest version for TikTok API For Business is v1.3." — die Fassung, die der
      Adapter im Pfad sendet, ist die aktuelle.
    · DIE TABELLE DER SEITE "Timelines", VOLLSTÄNDIG: `v1.3` eingeführt "August 15, 2022",
      Available until **"TBD"** · `v1.2` "March 19, 2021" bis "August 15, 2023" · `v1.1`
      "August 19, 2020" bis "July 29, 2021" · `v1.0` "-" bis "January 20th, 2021".
    · WAS BEI ABLAUF GESCHIEHT: "Developers will be given a time period to adopt or move to
      the latest version (For example, we give our developers a year to migrate from v1.2 to
      v1.3). After the given time of period, previous versions of the API will be deprecated
      and **any calls made to the deprecated API will fail.**"
    · **DAS IST DAS GEGENTEIL DES META-BEFUNDES** (Abschnitt "Meta (Conversions API)", Teil
      (t)): dort wird ein Aufruf an eine abgelaufene Version still auf die nächste brauchbare
      umgeleitet, hier schlägt er fehl. **WER VON EINEM ZIEL AUF DAS ANDERE SCHLIESST,
      TRIFFT EINE ANNAHME ÜBER EIN FREMDES SYSTEM.**
    · **"TBD" IST KEINE ZUSAGE AUF UNBEFRISTETHEIT**, und ein Ankündigungsweg ist auf diesen
      zwei Seiten nicht benannt. Der einzige bezifferte Präzedenzfall ist die Jahresfrist von
      `v1.2` auf `v1.3`.

**WAS NUR EIN AUFRUF ZEIGT — NICHT BEANTWORTET.** Alle Angaben der Teile (j) bis (p) sind
GELESEN. **KEIN AUFRUF GEGEN DIE SCHNITTSTELLE.** Offen bleiben damit, je ausdrücklich und
nicht als Nebenbemerkung:
· ob der Endpunkt `user.ttclid` und `user.ttp` fachlich ANNIMMT;
· ob das Backend eine Kennung aus einem von UNS gesendeten `page.url` tatsächlich zieht (der
  Satz aus (m) ist eine Doku-Aussage über ein fremdes System);
· wie TikTok mit FREMDEN Klick-Kennungen im Adressfeld verfährt;
· welches Limit real greift und mit welchen Kopfzeilen eine Antwort es ausweist;
· ob die 48-Stunden- und die 5-Minuten-Frist aus (n) so wirken;
· ob ein Aufruf gegen eine abgelaufene Version scheitert, wie (p) es liest.

**ZEIGER 2026-09-24 — ZUM ERSTEN UND ZWEITEN PUNKT DIESER LISTE; die Liste bleibt wörtlich:**
`user.ttclid` ist im Testmodus mit `code 0` quittiert und im Test-Events-Reiter als Parameter
angezeigt worden (Teile (q), (r)); die Quittung allein belegt das nicht, sie ist für Feldnamen
blind (Teil (q)). OFFEN bleiben, ob TikTok den Wert fachlich verwertet (der Wert war erfunden),
und `user.ttp` unverändert. Zum zweiten Punkt: Eine Kennung allein in `page.url` zeigt der
Reiter NICHT als Parameter — der Satz aus (m) ist damit weder bestätigt noch widerlegt (Teil
(r)).

### Der gelesene Umfang (2026-09-22) — TikTok, Transport

**GEÖFFNET UND GELESEN (9 Seiten), je mit der Zeichenzahl des gerenderten Artikel-Rumpfes:**

1. `business-api.tiktok.com/portal/docs/parameters/v1.3` — "Events API Parameters"
   (35 679 Z.; voller Seitenrumpf 75 911) — (j), (k), (l), (m).
2. `…/portal/docs/send-tiktok-click-id-ttclid/v1.3` — "Send TikTok Click ID" (7 152 Z.) —
   **die tragende Fundstelle**, (j) und (m).
3. `…/portal/docs/send-tiktok-cookie-ttp/v1.3` — "Send TikTok Cookie" (1 112 Z.) — (k).
4. `…/portal/docs/event-deduplication/v1.3` — "Event Deduplication" (4 800 Z.) — (n).
5. `…/portal/docs/setup-guide-for-web/v1.3` — "Setup guide for Web" (28 994 Z.) — (l), die
   Pflichtmarken und der Endpunkt.
6. `…/portal/docs/responses-and-errors/v1.3` — "Events API Responses and errors"
   (3 641 Z.) — (o).
7. `…/portal/docs/rate-limits/v1.3` — "Rate limits Overview" (8 703 Z.) — (o).
8. `…/portal/docs/versioning/v1.3` — "Versioning" (2 063 Z.) — (p).
9. `…/portal/docs/timelines/v1.3` — "Timelines" (664 Z.) — (p).

**EINE ZEHNTE SEITE IST GEÖFFNET WORDEN UND ZÄHLT IN DIESER NEUN NICHT MIT** — der Satz
steht hier, damit die Zahl nicht falsch aussieht: `…/portal/docs/set-up-external-id/v1.3`
("Set up External ID", 2 127 Z.) trägt allein das gesondert gemeldete Feld in (l).

**REITER-GRUPPEN: KEINE — und das ist ein Befund, keine Auslassung.** Auf keiner der
geöffneten Seiten trat eine Reiter-Gruppe auf; die Codebeispiele stehen als Blöcke im
Fliesstext. **SYMBOL-TABELLEN TRATEN DAGEGEN AUF und sind in (l) als solche benannt:** die
Spalte "Recommended ?" der Web-`user`-Tabelle und die zwei Spalten "Required for … (ROAS)
or … (VBO)" bzw. "Required for Video Shopping Ads (VSA)" am `properties`-Objekt.

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `Limited data use` — ein Schalter der Nutzlast auf oberster Ebene (`limited_data_use`,
  boolean), kein Match-Feld. **GRENZFALL: dass er nicht geöffnet ist, begrenzt die Reichweite
  der Feldliste in (l).**
· `Send Custom Attribution data to TikTok via Events API 2.0` — betrifft das `ad`-Objekt,
  dessen Felder in (l) aus der Parameter-Seite berichtet sind. **ZWEITER GRENZFALL, aus
  demselben Grund benannt.**
· `Appendix - Return Codes` — die vollständige Fehlercode-Liste; für (o) genügten die zwei
  gelesenen Seiten. **Die Reichweite von (o) ist entsprechend begrenzt.**
· `Supported events` — Ereignisnamen; keine Frage dieser Lesung hängt daran.
· `Payload Helper for Web`, `Payload Converter`, `Authentication`, `FAQs`,
  `Events API Gateway` — Werkzeuge und Zugangsweg.
· `About Advanced Matching for Web` — behandelt E-Mail und Telefon, also gerade das, was
  diese Lesung ausnimmt.
· `Events API for Offline`, `for App`, `for CRM`, `Events API 1.0`, `TikTok App Events SDK`,
  `GTM Integration` — andere Ereignisquellen bzw. die ältere Fassung; unser Adapter sendet
  Web über 2.0.
· `Pixel Cookie Consent Mode` und `Pixel Helper` — im Bestand bereits als Budget-Ausschluss
  geführt (Teil (i)); für diese Lesung ohne Frage, weil unser ausgelieferter Text kein
  TikTok-Tag trägt (s. die Folgerung in (k)).
· `Sandbox accounts` — **hinter einer Anmeldung, nicht betreten.** Er bleibt, was Teil (d)
  und Teil (h) sagen: der naheliegendste Ort für eine belastbare Aussage über Testdaten und
  Berichterstattung.

**EIN BEFUND ÜBER DAS VERFAHREN, UND ER IST HIER AM ORT SEINER WIRKUNG ABGELEGT:** Die Seite
`Responses and errors` stand in der Liste "GESEHEN, NICHT GEÖFFNET" der Lesung vom
2026-09-08 — dort mit dem Grund "im Abschnitt, aber ohne Bezug zu den vier Fragen dieser
Lesung". **SIE TRÄGT DIE ANTWORT AUF DIE RATE-LIMIT-FRAGE** (Teil (o)). Der Ausschluss war
für die Testmodus-Frage jenes Tages sachlich richtig und für die Fragen dieser Lesung
falsch — **und er sah bei jeder Wiederholung genauso richtig aus.** Es ist dieselbe
Fehlerklasse, die docs/immer-beachten.md als "DIE LISTE 'GESEHEN, NICHT GEÖFFNET' IST DER
ORT, AN DEM SICH EIN BEFUND VERSTECKT" führt, und sie ist damit innerhalb EINES Tages an
ZWEI Zielen eingetreten — beim Meta-Crawl desselben Datums an vier Parameter-Seiten.

**EINE ZAHL DIESES ABSCHNITTS GEHT MIT EINER ÄLTEREN AUSEINANDER, OHNE IHR ZU
WIDERSPRECHEN:** Teil (c) nennt für die Parameter-Seite "71 789 Zeichen gerendert", diese
Lesung 35 679. **VERSCHIEDENE ACHSE, KEIN WIDERSPRUCH** — jene Zahl ist über den vollen
Seitenrumpf erhoben (am 2026-09-22 dort gemessen: 75 911), diese über den Artikel-Rumpf
`.doc-content-body`.

### MESSUNG 2026-09-24 gegen /event/track/ im Testmodus und Ablesung am Test-Events-Reiter (S8 der Phase 11.7) — die Teile (q) bis (s)

**HERKUNFT (2026-09-24):** GEMESSEN vom OWNER im Terminal (Git Bash, `curl`), VIER Aufrufe in
EINEM Lauf gegen `POST https://business-api.tiktok.com/open_api/v1.3/event/track/` — Endpunkt,
Kopfzeile `Access-Token` und Rumpfform wie in `forwardToTiktok`, dazu `test_event_code` auf der
Wurzelebene (Teil (a)). Ereignis `Lead`, `event_id` `s8-A-1790252376` bis `s8-D-1790252376`,
Empfang laut Reiter 12:20:05 bis 12:20:06 UTC. `user.ip` `203.0.113.9` (TEST-NET), ein erfundener
User-Agent, der erfundene Kennungswert `E.C.P.S8TerminalProbe1790252376`. Die Reiter-Angaben
sind vom OWNER an der Einzelansicht des Reiters "Test Events" ABGELESEN (Weg dorthin: Teil (b)).
Kein Zugangsdatum und keine Pixel-Kennung in dieser Datei. **EIN Lauf, NUR Testmodus.**
Die vier Aufrufe: **A** `user.ttclid`, `page.url` ohne Kennung · **B** ohne Kennung · **C**
`user.ttclidX` statt `user.ttclid` · **D** die Kennung NUR als Parameter in `page.url`.

(q) DIE ANTWORT IST FÜR FELDNAMEN IM `user`-OBJEKT BLIND — AUCH EIN UNBEKANNTES FELD BEKOMMT
    `code 0`.
    GEMESSEN 2026-09-24 (OWNER): A, B, C und D antworten je mit HTTP 200 und
    `{"code": 0, "message": "OK"}` — auch C, dessen Feld `user.ttclidX` es laut Teil (l) nicht
    gibt.
    **FOLGE:** Eine Erfolgsquittung belegt NICHT, dass ein Feld im `user`-Objekt erkannt wurde.
    Ein Tippfehler im Feldnamen geht als Erfolg hinaus.
    **GRENZE:** gemessen im Testmodus; ob der Endpunkt ohne `test_event_code` ebenso antwortet,
    ist ungemessen.

(r) DER TEST-EVENTS-REITER ZEIGT `user.ttclid` ALS PARAMETER "ttclid" — EIN UNBEKANNTES FELD
    NICHT, UND EINE KENNUNG ALLEIN IN `page.url` AUCH NICHT.
    ABGELESEN 2026-09-24 (OWNER), Einzelansicht je Ereignis: NUR A zeigt unter "Parameters" den
    Eintrag "ttclid: E.C.P.S8TerminalProbe1790252376". B, C und D zeigen keinen ttclid-Eintrag;
    bei D steht die Kennung nur als Teil der URL.
    **FOLGE:** Der Reiter ist ein Instrument für `user.ttclid` — er trennt das Feld von einem
    falsch benannten (C) und von der Adresse (D), wo die Antwort nach (q) nichts trennt.
    **WEG (m) — DAS PARSEN AUS `page.url` — IST DAMIT WEDER BESTÄTIGT NOCH WIDERLEGT:** Dass der
    Reiter aus D keinen Parameter macht, sagt nichts darüber, ob das Backend die Kennung
    später aus der Adresse zieht.
    **GRENZE:** Der Wert ist erfunden; ein ABGLEICH mit einem Anzeigenklick ist nicht belegt.
    Ob TikTok den Wert FACHLICH verwertet, bleibt offen.

(s) DIE TEST-IP 203.0.113.9 WIRD ANGENOMMEN UND ANGEZEIGT.
    GEMESSEN bzw. ABGELESEN 2026-09-24 (OWNER): Alle vier Aufrufe mit `user.ip` `203.0.113.9`
    (Dokumentations-Adressbereich TEST-NET-3) antworten mit `code 0` (Teil (q)), und bei allen
    vier steht die IP im Reiter unter "Customer information parameters".
    **GRENZE:** Das sagt nur, dass der Endpunkt eine solche Adresse nicht ablehnt; über ihren
    Nutzen für die Zuordnung sagt es nichts.
