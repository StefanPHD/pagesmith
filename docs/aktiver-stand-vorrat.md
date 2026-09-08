# VORRAT — PHASE 11.2 (GOOGLE)

**WAS DIESE DATEI IST:** Der Vorrat der laufenden Phase 11.2 — alle 59 Einträge, im
Wortlaut und mit ihren Nummern. Sie ist **KEIN ARCHIV**: Ein Vorrats-Eintrag ist per
Definition NICHT gebaut und NICHT entschieden, und abgelaufen ist nur, was vollzogen
wurde.

**SIE IST KEIN STEUERNDES DOKUMENT.** Der Rahmen der Phase, die bindenden
Entscheidungen, die offene Arbeit 1b und die Hebungs-Kandidaten stehen NICHT hier.
**DIE STEUERDATEI IST `docs/aktiver-stand.md`**, und sie bleibt das Pflicht-Gate jedes
Bau- und Aufklärungs-Prompts dieser Phase.

**WORAUF SIE ZEIGT UND WAS AUF SIE ZEIGT:** In der Steuerdatei steht unter
"## Register — was diese Datei nicht mehr trägt" ein Register der 59 Einträge, je mit
Nummer und wörtlichem Titelanfang. **Wer einen Vorrats-Eintrag sucht, findet über das
Register hierher — und nur so.**

**WOHER SIE STAMMT:** Herausgeschnitten am 2026-09-08 aus `docs/aktiver-stand.md`,
Stand `57c9231` (9 967 Zeilen, 702 038 B). Es ist Schritt 2 der Teilung, deren Zuschnitt
in der Steuerdatei unter "## Die Teilung der Standdatei — Zuschnitt in drei Schritten"
steht.

**DER INHALT IST ZEICHENGLEICH ÜBERNOMMEN.** Kein Satz umformuliert, keine Überschrift
umbenannt, keine Nummer neu vergeben, nichts umsortiert. Belegt per Prüfsumme über den
übernommenen Bereich (Quellzeilen 6758–9324, 2 567 Zeilen, 194 271 B), erhoben VOR dem
Eingriff an `git show HEAD:docs/aktiver-stand.md` und nach dem Schreiben an dieser Datei
gegengeprüft:
sha256 = 17ded6bc996cc772cb958bcc2954b9b1b014066ef235d8be471d82b9de8fc01e

**AM PHASENENDE WIRD SIE GEHOBEN, NICHT ARCHIVIERT — UND DIESER SATZ IST DER GRUND FÜR
IHRE EXISTENZ ALS EIGENE DATEI.** Der Vorrat einer abgeschlossenen Phase wandert nach
`docs/claude-history/backlog-polish.md`, unter eine EIGENE datierte Überschrift am
Dateiende (so geschehen bei Phase 11 und bei Phase 11.1). **DANACH WIRD DIESE DATEI
GELÖSCHT.** Läge der Vorrat im Archiv `docs/claude-history/phase-11.2-google.md`, ginge
er mit dem Archiv mit und würde beim Phasenende nicht mehr angefasst: Das Archiv sähe
vollständig aus, und 59 gemeldete Punkte wären begraben. **DER FEHLER WÄRE STILL.**

**DIE NUMMERN SIND STABIL UND WERDEN NIE NEU VERGEBEN.** Ein neuer Eintrag tritt HINTEN
an. Nichts wird umsortiert, nichts nachnummeriert — auch nicht bei der Hebung.

**EINE MEHRDEUTIGKEIT, DIE MIT DIESER DATEI NICHT VERSCHWINDET:** Ein Verweis der Form
"Vorrat, Eintrag 3" trifft weiterhin ZWEI Phasen — `docs/aktiver-stand-11.8.md` führt
ebenfalls einen Vorrat. **Wer zeigt, nennt den DATEINAMEN mit.**

**DER NAME DIESER DATEI IST ARCHITEKTEN-SETZUNG (2026-09-07) UND REVIDIERBAR** — anders
als der Name des Archivs, der eine Owner-Entscheidung ist. Wer ihn ändert, ändert eine
Namenswahl und keine Entscheidung; der Preis sind die zwölf Zeiger aus `src/**` und
`supabase/**`, die in Schritt 3 der Teilung ohnehin angefasst werden.

## Vorrat (gemeldet, nicht gebaut)

Alle Einträge sind NICHT gebaut und NICHT entschieden. KEINE EMPFEHLUNG zu keinem von
ihnen. JEDER EINTRAG TRÄGT SEIN EIGENES DATUM.
KEINE SAMMEL-DATIERUNG IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK: Hier stand "Einträge
1 bis 3 GEMELDET am 2026-08-24, Einträge 4 und 5 am 2026-08-25". Sie ist am 2026-08-29
ERSATZLOS ENTFALLEN — sie deckte die Einträge 6 bis 13 nicht und wurde mit jedem
Zuwachs neu falsch. Es ist dieselbe Bauform wie die Stückzahl darunter, nur mit einem
Datum statt einer Zahl.
KEINE STÜCKZAHL IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK: Die Einträge sind
nummeriert, die Liste zählt sich damit selbst, und eine Zahl daneben ist eine zweite
Wahrheit, die bei jedem Zuwachs neu falsch wird — in dieser Datei dreimal
protokolliert kaputtgegangen. Aus demselben Grund steht hier keine Ordnungsangabe der
Form "die zwei letzten": sie wandert mit jedem Zuwachs weiter, ohne dass jemand sie
anfasst.
NACHGEZOGEN AM 2026-08-25 — die Einträge 1 bis 3 sind ERSETZT, nicht ergänzt: zwei
Angaben waren am Code falsch bzw. zu eng, die dritte war unvollständig.

1. **DER EINWILLIGUNGS-DRAHT FÜHRT KEINEN GOOGLE-SCHLÜSSEL.** GEMESSEN AM CODE (CC,
   2026-08-25): Der Befund folgt aus TRACKING_TARGETS (src/lib/settings.ts) — die
   Liste kennt meta, pinterest, tiktok, linkedin und kein google; CONSENT_KEY_BY_TARGET
   (src/lib/tracking/consent-targets.ts) ist über dieselbe Menge erschöpfend
   geschlüsselt und trägt entsprechend keinen Google-Eintrag.
   RICHTIGGESTELLT — HIER STAND, DER BEACON-BAU "SETZT GENAU DIESE DREI SCHLÜSSEL",
   UND DAS IST AM CODE FALSCH: Der Bau des cns-Objekts in tracking/meta.ts bildet die
   Schlüssel DYNAMISCH aus seinem Parameter consentTargets, mit einem Rückfall auf den
   Meta-Schlüssel allein, wenn die Liste leer ist. Die am 2026-08-24 an der
   Live-Nutzlast beobachteten DREI sind damit ein PROJEKTABHÄNGIGER ZUSTAND (die Liste
   wird nach gesetzter Kennung gefiltert — hasPixelId in
   tracking/target-readiness.ts), KEINE Konstante im Bau.
   WARUM DAS FESTGEHALTEN WIRD, OBWOHL DER BEFUND UNVERÄNDERT GILT: Wer den alten Satz
   glaubt, sucht die Schlüsselmenge an der falschen Stelle — im Emitter statt in der
   Ziel-Liste — und hält eine dynamische Ableitung für ein Literal.
   WAS consentAllows FÜR EIN ZIEL OHNE SCHLÜSSEL TUT, IST JETZT GEPRÜFT: s. die
   bindende Entscheidung (4).
2. **GENAU EINE STELLE IM REPO ZERLEGT EINEN QUERY-STRING, UND ES IST DIE EIGENE.**
   DIE FRÜHERE FASSUNG DIESES EINTRAGS BEHAUPTETE, ES ZERLEGE KEINE — DAS IST SEIT DEM
   COMMIT 6653f37 FALSCH UND WIRD NICHT GERETTET. Der Eintrag ist ERSETZT.
   WAS VON IHM BLEIBT, IST EIN BEFUND ÜBER DEN BESTAND VORHER, und der ist als
   ZEITANGABE weiterhin richtig: Bis zum 6653f37 zerlegte KEINE Stelle im Repo einen
   Query-String — GEMESSEN am 2026-08-24 und am 2026-08-25 erneut, auf der breiteren
   Achse unten. Aufgehoben hat ihn genau dieser Commit.
   DER STAND HEUTE — GEMESSEN am Repo (CC, 2026-08-25). ACHSE: src/** über *.ts und
   *.tsx, EINSCHLIESSLICH Testdateien, binärsicher gelesen, Begriffe URLSearchParams ·
   location.search · searchParams · "new URL(" · decodeURIComponent · split("&"):
   · ZERLEGT WIRD AN GENAU EINER STELLE: extractGoogleClickIds
     (src/lib/capi/google-click-ids.ts) über URL.searchParams.
   · ZWEI URL-KONSTRUKTOREN IM PRODUKTIVCODE, und der Unterschied zwischen ihnen ist
     der Punkt: isValidRedirectUrl (src/lib/mappings.ts) baut zwar eine URL, liest
     aber AUSSCHLIESSLICH das Protokoll und rührt searchParams nicht an. Einen
     Konstruktor zu zählen ist deshalb etwas anderes, als eine Zerlegung zu zählen.
   · Alle übrigen Treffer liegen in Testdateien (proxy.test.ts,
     supabase/middleware.test.ts) und dienen dem BAUEN einer Anfrage bzw. dem Lesen
     von pathname. Auf decodeURIComponent und split("&") gibt es ausserhalb eines
     Testkommentars KEINEN Treffer.
   DIE BINÄRSICHERHEIT IST KEINE FORMALIE, UND SIE IST JETZT GEMESSEN: src/lib/mappings.ts
   trägt GENAU EIN NUL-Byte. Eine gewöhnliche Suche meldet dort "Binary file … matches"
   STATT der Trefferzeile, und ein Datei-Suchwerkzeug übergeht sie stillschweigend —
   die Datei fällt still aus jeder Achse heraus, und wer ohne diese Vorkehrung sucht,
   ÜBERSIEHT AUSGERECHNET DEN ZWEITEN KONSTRUKTOR.
3. **EIN ADAPTER HAT KEINEN RÜCKKANAL — AUF ZWEI EBENEN, NICHT AUF EINER.** GEMESSEN
   am Code (CC, 2026-08-25):
   · EBENE 1, DAS MELDEN: Der Typ Forwarder (src/lib/capi/ingest.ts) gibt
     Promise<void> zurück. Ein Adapter, der ein Ereignis verwirft, kann das nicht
     mitteilen. Dasselbe gilt für den Verteiler dispatchForward, der für ein Ziel ohne
     Adapter Promise.resolve() liefert — ein ÜBERSPRUNGENES und ein ZUGESTELLTES Ziel
     sind am Rückgabewert nicht zu unterscheiden.
   · EBENE 2, DAS SEHEN: Am Aufrufort wird das Ergebnis-Array von Promise.allSettled
     WEDER GEBUNDEN NOCH GELESEN NOCH GELOGGT; unmittelbar danach steht die 204. Ein
     abgewiesener Empfänger ist dort strukturell unbeobachtbar.
   DAS allSettled SELBST IST ABSICHT UND WIRD NICHT ANGETASTET: Es trägt das
   204-Containment — "allSettled rejectet NIE, also kann kein Empfaenger einen Wurf aus
   diesem Handler heraustragen" (Kommentar an der Fan-Out-Stelle in ingest.ts; die
   Regel dahinter ist INGEST-204-CONTAINMENT in docs/immer-beachten.md). Wer Ebene 2
   "repariert", indem er allSettled ersetzt, bricht eine Sicherheitsgarantie.
   FÜR EIN ZIEL, DAS OHNE KLICK-KENNUNG NICHTS SENDEN KANN, WÄRE DIE VERWERFUNG AUF
   BEIDEN EBENEN STUMM. Der Kandidat dazu steht in docs/claude-history/backlog-polish.md,
   "EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN"; die Regel "JEDES WEITERE
   FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT" hält fest, dass ein
   solcher Kanal ALLE VIER bestehenden Adapter berührt.
4. **DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH AUF NICHTS GELESENES.**
   GEBAUT WIRD schreibungssensitiv und exakt kleingeschrieben: nur gclid, gbraid und
   wbraid treffen; GCLID oder Gclid treffen nicht.
   DER GRUND FÜR DIE ENGERE WAHL: Ein exakter Vergleich kann nur VERFEHLEN, und das
   ist als fehlende Conversion sichtbar. Ein schreibungsunempfindlicher Vergleich
   könnte einen FREMDEN, zufällig gleichnamigen Parameter aufgreifen — und ein
   falscher Wert als Kennung wird vom Anbieter NICHT als Fehler gemeldet. Von zwei
   unbelegten Möglichkeiten ist die gewählt, deren Fehlschlag sichtbar ist.
   DIE LÜCKE GEHÖRT DAZU UND IST DER EIGENTLICHE INHALT DIESES EINTRAGS: Das stützt
   sich auf NICHTS GELESENES. GEMESSEN am Dateitext (2026-08-25, Achse: docs/ziel-befunde.md
   vollständig, Begriff gclid): sechs Treffer, ALLE betreffen den Feldnamen in der
   API-Nutzlast (adIdentifiers.gclid), KEINER den Namen des Parameters, den Google an
   die Ziel-URL hängt. Das ist kein Versäumnis, sondern der Zuschnitt beider
   Crawl-Läufe: ihr Gegenstand war die EINLIEFERUNGS-Schnittstelle, nicht das
   Auto-Tagging. Es gibt zu dieser Frage WEDER einen Befund NOCH einen Nicht-Treffer
   mit benannter Reichweite.
   DIE ERSTE MESSUNG NIMMT SIE MIT. KEINE bindende Entscheidung — sie steht hier und
   nicht unter den Entscheidungen, weil sie auf keiner Grundlage ruht, die eine
   Bindung tragen könnte.

   **VERMERK 2026-09-02 — "DIE ERSTE MESSUNG NIMMT SIE MIT" IST NICHT EINGELÖST. DER EINTRAG
   SCHRUMPFT NICHT UND ENTFÄLLT NICHT; ALLE DREI NAMEN BLEIBEN UNGEPRÜFT.** Der Text darüber
   bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN.
   **ER ERSETZT DEN VERMERK VOM 2026-09-01 VOLLSTÄNDIG**, und zwar als SACHKORREKTUR: Jener
   sagte, der Eintrag schrumpfe "von drei ungeprüften Namen auf zwei", weil Schritt 2 des
   Live-Tests der Scheibe 4 einen Query-String benutzt habe — "den, den GOOGLE SELBST an die
   Ziel-URL gehängt hat, über eine echte Anzeige und nicht von Hand eingetippt". **DIE
   PRÄMISSE TRIFFT NICHT ZU.**
   **OWNER-ANGABE 2026-09-02:** Die Klick-Kennungen des Live-Tests waren **von Hand in die
   Browserzeile gesetzt** und stammen aus keinem Klick; im Einsatz waren **zwei** Werte
   (`EAIaIQobChMI` und `Tester-123`), und **welcher zu welchem Adapter-Aufruf gehört, ist nicht
   rekonstruierbar**. Volltext der Korrektur: VERMERK 10, Abschnitt (b), "SACHKORREKTUR
   2026-09-02 — DIE HERKUNFT DER KLICK-KENNUNG".
   **FÜR DIESEN EINTRAG IST DIE ZUORDNUNG GLEICHGÜLTIG:** Beide Werte sind von Hand gesetzt,
   also misst der Durchlauf in beiden Fällen die eigene Extraktion und nicht Googles
   Auto-Tagging.
   **WAS BISHER GALT UND ZWEIMAL AUSDRÜCKLICH FESTGEHALTEN WORDEN IST — UNVERÄNDERT:** VERMERK
   3 und VERMERK 4 führen diesen Eintrag je als UNBERÜHRT; Messung A und Messung B1 haben
   **keinen Query-String benutzt**, sondern eine Kopfzeile und einen Rumpf gesetzt.
   **DAS GILT JETZT AUCH FÜR SCHRITT 2 — auf der Achse dieses Eintrags.** Ein von Hand
   gesetzter Query-String misst **UNSERE EXTRAKTION**, nicht **GOOGLES AUTO-TAGGING**. Genau
   diese Achse führt der Eintrag als "WEDER einen Befund NOCH einen Nicht-Treffer mit benannter
   Reichweite", und dabei bleibt es.
   **WAS SCHRITT 2 TROTZDEM HERGIBT — UND ES IST EINE ABLEITUNG AUS ZWEI LOGZEILEN, KEINE
   ABLESUNG DER NUTZLAST:** Hätte `extractGoogleClickIds` keinen der drei
   schreibungssensitiven Namen getroffen, verwürfe `buildGoogleEvent` mit `no_click_id`, und
   die Zeile `[capi] Google forward skipped: no_click_id` stünde im Log — sie steht dort im
   Schritt 5 und in Schritt 2 **nicht**, und eine Fehlerzeile ebenfalls nicht.
   **MINDESTENS EINER DER DREI KLEINGESCHRIEBENEN NAMEN HAT ALSO GETROFFEN — den Wert, den der
   OWNER GETIPPT HAT.** Das ist eine Aussage über die Extraktion und über nichts sonst.
   **DIE GRENZE IST DER EIGENTLICHE INHALT DIESES VERMERKS: WELCHER der drei getroffen hat,
   ist NICHT GEMESSEN.** Das Log nennt keinen Namen — es nennt bei Erfolg gar nichts —, und die
   Nutzlast ist nicht abgelesen worden. **ÜBER DIE ZWEI ÜBRIGEN SAGT DER DURCHLAUF NICHTS.**
   **EIN ABSATZ DES ALTEN VERMERKS IST ERSATZLOS ENTFALLEN, und das gehört benannt:** Er
   erklärte, warum ein einzelner Durchlauf nur EINEN der drei Namen mitnehmen könne — "Ein
   Anzeigenklick hängt in aller Regel EINEN der drei an". **Der Satz setzte einen Anzeigenklick
   voraus, den es nicht gegeben hat**, und beschrieb damit ein Instrument, das nie im Einsatz
   war.
   **WAS OFFEN BLEIBT UND WARUM DER EINTRAG STEHEN BLEIBT:** Für **ALLE DREI** Namen stützt
   sich die Schreibung weiterhin auf **nichts Gelesenes und nichts Gemessenes**. Der im Eintrag
   benannte Fehlerweg gilt unverändert: Ein exakter Vergleich kann nur VERFEHLEN, und ein
   Verfehlen ist als fehlende Conversion sichtbar — aber eben nur, wenn jemand hinsieht.
   **DER SATZ "DIE ERSTE MESSUNG NIMMT SIE MIT" WARTET DAMIT WEITER**, und er wartet auf
   dasselbe wie am 2026-08-25: einen Durchlauf mit einem Query-String, den **GOOGLE** geschrieben
   hat. Der ist an die Sperre "AUF DEM KONTO EXISTIERT KEIN ECHTER ANZEIGENKLICK" gebunden, s.
   den Abschnitt "Gegenstand der Phase".
   PROVENIENZ, JE TEIL: Die Korrektur der Prämisse ist eine **OWNER-ANGABE 2026-09-02**, keine
   Messung. Die Ableitung aus den zwei Logzeilen bleibt eine **ABLEITUNG** (Live-Werte GEMESSEN
   2026-09-01, OWNER; die Ableitung CC, 2026-09-01), **KEINE Ablesung der gesendeten Nutzlast,
   KEINE Messung am Parameternamen selbst**. Dass VERMERK 3 und 4 den Eintrag als unberührt
   führen, ist GEMESSEN am Dateitext (CC, 2026-09-01).
   **DIE STREICHUNG DES EINTRAGS IST HIER NICHT ENTSCHIEDEN UND WIRD ES AUCH NICHT** — er
   ist nur kleiner geworden.

5. **DREI FELDER DER NUTZLAST SIND FRAGEN DER TRANSPORT-SCHEIBE, NICHT DIESER.** Sie
   stehen hier, weil sie sonst zwischen die Scheiben fielen: Diese Scheibe baut sie
   nicht, und die Transport-Scheibe hätte keinen Anlass, nach ihnen zu suchen.
   · KEIN consent-OBJEKT IN DER ANFRAGE. Die Hülle kennt ein optionales consent, auf
     Anfrage- UND auf Ereignis-Ebene (GELESEN, docs/ziel-befunde.md, Teil (l)/D1).
     Wir bauen keines. Grund: Das Einwilligungs-URTEIL wird im Browser gefällt
     (buildConsentRuntime), und tracking/consent-wire.ts hält ausdrücklich fest "HIER
     STEHT KEIN ZWEITES URTEIL" — ein Google-eigenes Consent-Feld wäre ein DRITTES.
     OB es gefüllt werden muss, ist NICHT entschieden.
   · KEIN reference / destinationReferences. Bei genau EINEM Empfänger unnötig: "OHNE
     destinationReferences GEHT EIN EREIGNIS AN ALLE DESTINATIONS DER ANFRAGE — das
     ist die Vorgabe, kein Fehler" (GELESEN, Teil (k)/C3). Beim zweiten Empfänger wird
     es fällig und ist dann erzwungen eindeutig (Teil (v)/C3, DUPLICATE_DESTINATION_REFERENCE).
   · KEIN eventName. Für Google Ads optional, Pflicht nur für GA4 (GELESEN, Teil (w)/F1).
   GEMELDET 2026-08-25, NICHT GEBAUT. KEINE EMPFEHLUNG.
   DAS DATUM IST AM 2026-08-29 AUS DEM KOPF DES VORRATS HIERHER GEWANDERT, nicht neu
   erhoben: Dieser Eintrag war der EINZIGE der dreizehn ohne eigene Datumsangabe
   (GEMESSEN am Dateitext, CC, 2026-08-29), und mit dem Wegfall der Sammel-Datierung
   hätte er seine einzige verloren.

   **VERMERK 2026-09-01 — DER ADRESSAT DIESES EINTRAGS IST VORBEI. DER EINTRAG IST NICHT
   FALSCH; ER HAT NIEMANDEN MEHR, AN DEN ER SICH RICHTET.** Der Text darüber bleibt ZEICHEN
   FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN.
   **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-01):** Die Transport-Scheibe ist gebaut
   (Bau-Commits `26caa38` und `84e9fca`, s. VERMERK 10) und hat **KEINES der drei Felder
   aufgegriffen**:
   · **`consent`** — die Anfrage trägt keines. Der Kommentarkopf von
     `IngestEventsRequest` (src/lib/capi/google-payload.ts) führt es unverändert unter den
     vier bewusst fehlenden Hüllen-Feldern und zeigt für die offene Frage auf **genau diesen
     Eintrag**.
   · **`reference` / `destinationReferences`** — `buildIngestEventsRequest` (ebenda) baut
     **GENAU EIN** `destinations`-Element und reicht keine Referenzen durch.
   · **`eventName`** — `GoogleEvent` (ebenda) führt das Feld nicht, und `buildGoogleEvent`
     setzt es nicht.
   **WARUM DAS EIN POSTEN IST UND KEINE ERLEDIGUNG:** Der Eintrag war ausdrücklich
   geschrieben worden, damit die drei Felder "nicht zwischen die Scheiben fallen" — "Diese
   Scheibe baut sie nicht, und die Transport-Scheibe hätte keinen Anlass, nach ihnen zu
   suchen." **DIE TRANSPORT-SCHEIBE IST VORBEI, UND SIE HAT TATSÄCHLICH NICHT NACH IHNEN
   GESUCHT.** Ein Eintrag, dessen Adressat abgelaufen ist, wird von niemandem mehr gelesen —
   er sieht bei jeder Durchsicht so aus, als warte er noch, und wartet auf nichts.
   **EIN EINTRAG OHNE ADRESSATEN BRAUCHT EINEN NEUEN TRIGGER ODER ENTFÄLLT. ER BEKOMMT
   TRIGGER — ENTSCHIEDEN (ARCHITEKT, 2026-09-01).**
   **DREI TRIGGER STATT EINEM — je Feld einer, weil die drei nichts miteinander zu tun haben
   ausser ihrer Herkunft aus derselben Hülle.** Jeder ist am Repo bzw. an einer gelesenen
   Stelle begründet, und die Begründung ist der Grund, aus dem der Trigger gilt:
   · **`consent`** → **Phase 11.5 (Einwilligungs-Dialog).** GRUND: Solange kein Dialog
     existiert, gibt es kein Einwilligungs-URTEIL, das man weiterreichen könnte; der Draht
     füllt heute ohne Betreiber-Hook alle Schlüssel auf `true` (`__psConsentAll`). Erst mit
     einem Dialog wird die Frage "muss das Feld gefüllt werden" überhaupt entscheidbar. Die
     Auflage, dass `"google"` im Dialog zu führen ist, steht bereits an Festlegung (3) des
     Zuschnitts der Scheibe 2.
   · **`reference` / `destinationReferences`** → **der ZWEITE Empfänger in EINER Anfrage.**
     GRUND: Der Eintrag nennt diesen Zeitpunkt selbst ("Beim zweiten Empfänger wird es fällig
     und ist dann erzwungen eindeutig"), und der Zustand ist am Code messbar — heute genau
     ein `destinations`-Element.
   · **`eventName`** → **GA4 als eigenes Ziel.** GRUND: Das Feld ist "für Google Ads
     optional, Pflicht nur für GA4" (GELESEN, Teil (w)/F1), und **GA4 ist im Produktivcode
     kein Ziel** (GEMESSEN am Repo, CC, 2026-09-01: kein Adapter, kein Eintrag in
     `TRACKING_TARGETS`, die Treffer auf "GA4" liegen ausschliesslich in Kommentaren und
     Doku-Zeigern). Die Roadmap-Zeile 11.2 führt GA4 als zweites Produkt neben Google Ads.
   **DER EINTRAG HAT AB JETZT DREI TRIGGER, UND ER ENTFÄLLT ERST, WENN ALLE DREI EINGETRETEN
   UND ABGEARBEITET SIND. EIN EINZELNER EINGETRETENER TRIGGER NIMMT IHN NICHT HERAUS.**
   Ohne diesen Satz liest die erste Runde, die einen der drei erreicht, den ganzen Eintrag als
   fällig und danach als erledigt — und die zwei übrigen Felder fielen still weg, also genau
   das, wogegen der Eintrag ursprünglich geschrieben wurde.
   **WAS DIESER VERMERK AUSDRÜCKLICH NICHT TUT:** Er streicht nichts und empfiehlt keines der
   drei Felder zum Bau. **KEINE EMPFEHLUNG.** Ein Trigger sagt, WANN die Frage fällig wird —
   nicht, wie sie zu beantworten ist.
   PROVENIENZ: Der Nicht-Bau der drei Felder GEMESSEN am Repo (CC, 2026-09-01). Dass der
   Adressat vorbei ist, ist eine FOLGE aus dem Wortlaut des Eintrags und dem Vollzug der
   Scheibe 4. **Die drei Trigger sind eine ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-01, getroffen
   auf drei ABLEITUNGEN, die je an einer gemessenen bzw. gelesenen Stelle begründet sind** —
   die Ableitungen stehen oben zeichengleich, wie sie vor der Entscheidung dastanden; geändert
   hat sich ihr RANG, nicht ihr Inhalt.

6. **eventSourceUrl IST AN DER FAN-OUT-STELLE VERFÜGBAR — GEMESSEN. DIE RESTLÜCKE
   LIEGT NICHT MEHR AM TRANSPORTWEG, SONDERN AM INHALT DER URL.**
   GEMESSEN am Repo (CC, 2026-08-29). INSTRUMENT: formale Suche über src/ nach
   `eventSourceUrl` ohne Testdateien, dazu die Lesung der getroffenen Symbole.
   **WAS DAMIT ENTSCHIEDEN IST — DREI ANGABEN:**
   · **DER TRANSPORTWEG STEHT.** `eventSourceUrl` ist ein Feld des Typs
     `CapiRequestBody` (src/lib/capi/ingest.ts). `handleIngest` reicht `body`
     unverändert an `dispatchForward` und von dort an `FORWARDER_BY_TARGET[target]`
     weiter — jeder Adapter bekommt es, ohne dass jemand etwas hinzufügen müsste.
   · **DREI DER VIER ADAPTER LESEN SIE HEUTE SCHON**, je über `asString(body.eventSourceUrl)`:
     `forwardToMeta` (src/lib/capi/meta-forward.ts) und die Adapter in
     src/lib/capi/pinterest-forward.ts und src/lib/capi/tiktok-forward.ts.
     **LinkedIn liest sie NICHT** — der Kommentarkopf von src/lib/capi/linkedin-forward.ts
     sagt es ausdrücklich. Ein Google-Zweig wäre damit der VIERTE Leser und kein
     Sonderfall.
   · **`extractGoogleClickIds` BEKÄME VON DORT EINEN EINGABEWERT.** Die Funktion
     (src/lib/capi/google-click-ids.ts) nimmt `unknown` entgegen und ist in ihrem
     eigenen Kopf genau auf diese Quelle zugeschnitten. Gesetzt wird der Wert im
     Beacon-Rumpf von `buildCapiBeaconStatement` (src/lib/tracking/meta.ts) als
     `location.href` — absolut, wie die Funktion es verlangt.
   **EIN NAHELIEGENDER EINWAND IST GEPRÜFT UND TRÄGT NICHT:** Der Bestätigungs-Beacon
   `buildPixelConfirmStatement` (ebenda) trägt `eventSourceUrl` ausdrücklich NICHT
   ("BARE Payload"). **Das trifft den Fan-Out nicht:** Der Bestätigungs-Zweig
   (`isBrowserConfirm` in `handleIngest`) kehrt mit seiner 204 zurück, BEVOR der
   Forward-Block erreicht wird. Ein Confirm kommt an der Fan-Out-Stelle nie an.
   **WAS OFFEN BLEIBT UND DER GRUND IST, WARUM DIESER EINTRAG NICHT ENTFÄLLT:** Gemessen
   ist, dass die URL ANKOMMT — nicht, dass sie eine Klick-Kennung TRÄGT. Beide Lücken
   aus Vermerk 1 stehen unverändert: dass eine ECHTE gclid von Google denselben Weg
   nimmt, ist NICHT GEPRÜFT, und gemessen ist ein EIN-SEITEN-FALL. Auf einer Seite mit
   mehreren Schritten ist `location.href` zur Conversion-Zeit eine andere URL als beim
   Einstieg.
   **ERSETZT AM 2026-08-29** — hier stand, die Verfügbarkeit an der Fan-Out-Stelle sei
   NICHT GEMESSEN, samt der Auflage an den Transport-Zuschnitt, sie zu prüfen. Die
   Prüfung ist gefahren, die Auflage ist damit eingelöst; der Wortlaut war bis zu diesem
   Tag richtig.
   TRIGGER: die Transport-Scheibe — jetzt für die verbliebene Frage nach dem INHALT der
   URL, nicht mehr für ihre Verfügbarkeit.

   **VERMERK 2026-09-01, SACHKORRIGIERT AM 2026-09-02 — DER TRIGGER IST EINGETRETEN, UND DIE
   FRAGE IST NUR IN EINER RICHTUNG BEANTWORTET.** Der Text darüber bleibt ZEICHEN FÜR ZEICHEN
   stehen; dieser Vermerk tritt DANEBEN.
   **WAS AM 2026-09-02 ERSETZT WORDEN IST:** Die Überschrift sagte "DIE FRAGE IST BEANTWORTET.
   DIESER EINTRAG HAT SEINEN GEGENSTAND VOLLSTÄNDIG ABGEARBEITET", und der erste Spiegelstrich
   qualifizierte die Kennung als ECHT und ihren Weg als "über eine echte Anzeige". **DIE
   PRÄMISSE TRIFFT NICHT ZU** — OWNER-ANGABE 2026-09-02, Volltext in VERMERK 10, Abschnitt (b),
   "SACHKORREKTUR 2026-09-02 — DIE HERKUNFT DER KLICK-KENNUNG".
   **DER TRIGGER LAUTETE "die Transport-Scheibe — jetzt für die verbliebene Frage nach dem
   INHALT der URL".** Die Scheibe ist gebaut und live bewiesen (VERMERK 10), und die Frage ist
   damit so weit beantwortet — GEMESSEN 2026-09-01 (OWNER), an der ausgelieferten Anwendung:
   · **LANDEPAGE: DIE KENNUNG IST DA — BEI EINEM VON HAND GESETZTEN WERT.** Schritt 2 — die
     gehostete Seite mit von Hand gesetztem Query-String aufgerufen, die Conversion auf
     derselben Seite ausgelöst: durchgelaufen, keine Fehlerzeile, kein `no_click_id`.
     **DAS IST NEU GEGENÜBER VERMERK 1 und nicht nichts:** Dort war gemessen, dass der Wert im
     `eventSourceUrl` **ankommt**; hier durchläuft er zum ersten Mal den **VOLLSTÄNDIGEN
     PRODUKTIVPFAD** bis zum Netzruf.
     **DIE ERSTE HÄLFTE DER RESTLÜCKE AUS VERMERK 1 IST DAMIT NICHT EINGELÖST:** Ob eine
     **ECHTE** `gclid` denselben Weg nimmt, ist weiterhin **NICHT GEPRÜFT**. Sie ist kleiner
     geworden, nicht geschlossen.
   · **FOLGESEITE: SIE IST WEG.** Schritt 3 — dieselbe von Hand gesetzte Adresse, die
     Conversion erst nach einem Seitenwechsel: `location.href` trägt die Kennung zur
     Conversion-Zeit nicht mehr,
     und es entsteht kein Ereignis. **Damit ist die ZWEITE Hälfte eingelöst** — die, die
     dieser Eintrag als "auf einer Seite mit mehreren Schritten ist `location.href` zur
     Conversion-Zeit eine andere URL als beim Einstieg" formuliert hatte.
   **DIE ZWEI ZEIGER, damit nichts hier ein zweites Mal geschrieben wird:** Das Protokoll
   beider Schritte und die Einlösung der drei Schulden stehen in **VERMERK 10, Abschnitt (b)**.
   Die **FOLGE der zweiten Hälfte** — dass Conversions auf Folgeseiten für Google heute nicht
   messbar sind und die naheliegende Abhilfe durch TRANSIT-ONLY versperrt ist — ist als
   **Vorrats-Eintrag 39** verortet, samt ihrem Bezug zu Phase 17 und zur dritten Datenklasse.
   **Zweimal geschrieben liefe es auseinander.**
   **WAS DIESER VERMERK NICHT TUT — UND DAS IST DER GRUND, WARUM ER DANEBEN STEHT STATT DEN
   EINTRAG ZU ERSETZEN: OB DER EINTRAG DAMIT ENTFÄLLT, IST HIER NICHT ENTSCHIEDEN UND WIRD ES
   NICHT.** Er hat seinen Gegenstand abgearbeitet — das ist etwas anderes, als überflüssig zu
   sein. **Zwei Gründe sprechen dagegen, ihn beiläufig zu streichen**, und keiner davon wird
   hier abgewogen: Sein GEMESSENER Teil (`eventSourceUrl` erreicht jeden Adapter über
   `CapiRequestBody`; drei der vier Adapter lesen sie, LinkedIn nicht) ist der Maßstab für
   jeden künftigen Adapter, der die URL braucht — und die Bauform dieses Vorrats hat bei
   Eintrag 7, 15 und 16 jeweils **die Messung als Grund für das Stehenbleiben** genannt.
   **DIE STREICHUNG IST EINE EIGENE ENTSCHEIDUNG.**
   PROVENIENZ: Die Live-Werte der Schritte 2 und 3 GEMESSEN 2026-09-01 (OWNER) an der
   ausgelieferten Anwendung. Dass der Trigger damit eingetreten ist, ist eine FOLGE aus seinem
   Wortlaut. **KEINE Ablesung der gesendeten Nutzlast.**

   **VERMERK 2026-09-07 — DIE FRAGE IST JETZT IN BEIDE RICHTUNGEN BEANTWORTET. Der Text
   darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN** — dieselbe
   Bauform wie der Vermerk vom 2026-09-01 darüber.
   **WARUM DANEBEN UND NICHT ERSETZT, und der Grund ist an beiden betroffenen Sätzen
   derselbe:** Sie sind über das Wort "DAMIT" an die Messung vom **2026-09-01** gebunden — die
   Kopfzeile "DIE FRAGE IST NUR IN EINER RICHTUNG BEANTWORTET" und der Satz "**DIE ERSTE
   HÄLFTE DER RESTLÜCKE AUS VERMERK 1 IST DAMIT NICHT EINGELÖST:** Ob eine **ECHTE** `gclid`
   denselben Weg nimmt, ist weiterhin **NICHT GEPRÜFT**". **Als Aussagen über JENE Messung
   sind beide unverändert wahr; als Aussagen über HEUTE sind sie überholt.** Wer sie ersetzte,
   machte aus einer richtigen Angabe über einen Tag eine falsche über einen anderen.
   **WAS DIE ERSTE HÄLFTE GESCHLOSSEN HAT — GEMESSEN 2026-09-07 (OWNER), am Vercel-Log des
   eigenen Dienstes:** Ein Conversion-Beacon von einer Landepage, die mit einer **ECHTEN, vom
   Anbieter vergebenen Klick-Kennung** in der Adresse geöffnet worden war, hat den
   Erneuerungsweg und danach den Google-Adapter durchlaufen — der vollständige Produktivpfad
   bis zum Netzruf. Abgelegt als **MESSUNG F**, docs/ziel-befunde.md, Google-Abschnitt,
   **Teil (cd)**. **Dass die Kennung eine ECHTE war, ist eine OWNER-ANGABE 2026-09-07.**
   **DREI GRENZEN AUS (cd) GEHÖREN DAZU:** der **Statuscode** des Einlieferungs-Aufrufs war
   **nicht ablesbar** · die Zuordnung zu der beim Anbieter angenommenen Einlieferung ist eine
   **ABLEITUNG**, keine Messung · **welcher** der drei Kennungs-Parameter getroffen hat, ist
   **ungemessen**. **KEINE DER DREI BERÜHRT DEN WORTLAUT DER FRAGE** — gefragt war der WEG,
   nicht die Antwort des Anbieters und nicht der Parametername.
   **DIE ZWEITE HÄLFTE WAR SCHON AM 2026-09-01 EINGELÖST, mit einem NEIN**, und das steht im
   Vermerk darüber unverändert. **EIN GEMESSENES NEIN ERFÜLLT DIE BEDINGUNG** — sie verlangt,
   dass die Lücke GEMESSEN ist, nicht dass sie günstig ausfällt. **PROVENIENZ dieser Hälfte,
   wörtlich: GEMESSEN 2026-09-01 (OWNER), an der ausgelieferten Anwendung.**
   **TRÄGT DIESER EINTRAG DANACH NOCH ETWAS OFFENES? NEIN — auf seiner eigenen Achse ist
   nichts mehr offen.** Sein Trigger ("die Transport-Scheibe — jetzt für die verbliebene Frage
   nach dem INHALT der URL") ist eingetreten, und die Frage ist ab dem 2026-09-07 in **beide**
   Richtungen beantwortet. Was bleibt, ist **kein offener Punkt, sondern ein MASSSTAB**: der
   gemessene Teil oben — `eventSourceUrl` erreicht über `CapiRequestBody` jeden Adapter, drei
   der vier lesen sie, LinkedIn nicht — bleibt der Maßstab für jeden künftigen Adapter, der
   die URL braucht.
   **ER WIRD HIER AUSDRÜCKLICH NICHT GESCHLOSSEN UND NICHT GESTRICHEN.** Der Vermerk vom
   2026-09-01 sagt es bereits im Wortlaut: "OB DER EINTRAG DAMIT ENTFÄLLT, IST HIER NICHT
   ENTSCHIEDEN UND WIRD ES NICHT. … **DIE STREICHUNG IST EINE EIGENE ENTSCHEIDUNG.**" Diese
   Runde trifft sie nicht; sie liegt beim Architekten.
   PROVENIENZ DIESES VERMERKS: die erste Hälfte **GEMESSEN 2026-09-07 (OWNER)**, die zweite
   **GEMESSEN 2026-09-01 (OWNER)**. Dass damit die zwei benannten Sätze als Aussagen über
   heute überholt sind, ist eine **ABLEITUNG** aus deren Wortlaut (CC, 2026-09-07,
   Doku-Runde), **keine dritte Messung**. **KEINE Ablesung der gesendeten Nutzlast**, und
   **KEINE Messung an einer Google-Oberfläche** in diesem Vermerk.

7. **DIE NORMALISIERUNG DER KUNDENNUMMER GEHÖRT AN DIE EINGABE, NICHT IN DEN REINEN
   BAUER.** GEMESSEN 2026-08-28 (OWNER), Messung B1: `operatingAccount.accountId` muss
   numerisch sein — "000-ERFUNDEN-000" wird mit `INVALID_NUMBER_FORMAT` abgewiesen
   (docs/ziel-befunde.md, Teil (bt)).
   DER PREIS, UND ER IST DER GRUND FÜR DIESEN EINTRAG: **Google Ads zeigt Kundennummern
   MIT Bindestrichen an.** Ein Betreiber schreibt ab, was er sieht. Ohne Normalisierung
   an der EINGABE entsteht ein STILLER Fehlschlag — die Anfrage wird abgewiesen, niemand
   sieht etwas, und die Conversion fehlt.
   **buildIngestEventsRequest NORMALISIERT AUSDRÜCKLICH NICHT UND SOLL DAS NICHT ÄNDERN**
   — der reine Bauer reicht beide Kennungen unverändert durch, und diese Entscheidung
   steht im Zuschnitt dieser Scheibe. Der Ort für die Normalisierung ist die Stelle, an
   der der Betreiber die Nummer eingibt; die gibt es heute nicht.
   GRENZE: Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert
   gemessen (s. Teil (bt)).
   TRIGGER: die Ablage-Scheibe für die Konto-Kennungen.

   **VERMERK 2026-08-31 — TRIGGER EINGETRETEN, UND DIESER EINTRAG GILT. ENTSCHIEDEN
   (OWNER, 2026-08-31).**
   Die Ablage-Scheibe ist zugeschnitten (s. den Abschnitt "Die Konto-Kennungen bekommen ihre
   Eingabe"), damit ist der Trigger dieses Eintrags erfüllt — **und anders als bei einem
   blossen Trigger-Vermerk ist die Frage dahinter jetzt beantwortet.**
   · **WAS DER ZUSCHNITT EINLÖST:** Den Ort, den dieser Eintrag vermisst hat — "die Stelle,
     an der der Betreiber die Nummer eingibt; die gibt es heute nicht" — **gibt es mit
     Scheibe 2.** Und der zweite Halbsatz des Titels ist unberührt: Der reine Bauer
     `buildIngestEventsRequest` wird von dieser Scheibe nicht angefasst.
   · **DIE ENTSCHEIDUNG, IN EINEM SATZ: ES WIRD AN DER EINGABE NORMALISIERT — DIESER EINTRAG
     GILT WÖRTLICH, MIT TITEL UND RUMPF.** Damit ist er **kein Vorrats-Posten mehr im Sinne
     des Kopfes dieses Abschnitts** ("NICHT gebaut und NICHT entschieden"): **nicht gebaut,
     aber entschieden.**
   · **DIE ENTSCHEIDUNG TRÄGT EINE FESTLEGUNG, UND ZWAR DIE SECHSTE DES ZUSCHNITTS DER
     SCHEIBE 2** ("DIE KUNDENNUMMER WIRD AN DER EINGABE NORMALISIERT", 2026-08-31). Was sie
     sagt — Bindestriche und Leerraum fallen, sonst nichts, an der Eingabe, nur die
     Kundennummer, sichtbar — steht **dort und nicht hier**; zweimal geschrieben liefe es
     auseinander.
   · **EINE GEGENFASSUNG IST ERWOGEN UND ZURÜCKGEZOGEN WORDEN, und sie gehört festgehalten,
     damit niemand sie für ungeprüft hält und neu vorbringt:** Sie hätte das Gegenteil gesagt
     — keine Normalisierung im Code, die Form nur im Platzhalter und im Hinweistext der
     Karte. **Ihre Begründung war eine Asymmetrie:** eine falsche Normalisierung schreibe
     einen veränderten Wert in die Datenbank, und niemand sehe mehr, was der Betreiber
     getippt hat.
     **SIE IST WIDERLEGT, NICHT ÜBERSTIMMT** (ARCHITEKT, 2026-08-31): Das Argument trifft
     eine **VERSTECKTE** Transformation, also eine server-seitige Umformung. Hier ist es ein
     **Eingabefeld**, und der gespeicherte Wert steht sichtbar darin. Dazu ein Präzedenzfall
     im Haus — `setPixelId` trimmt bereits, eine Normalisierung an der Eingabe ist gebaut,
     nur eine schwächere. **Die volle Herleitung steht an Festlegung (6) selbst.**
   · **WAS DIE ENTSCHEIDUNG NICHT BERÜHRT — FESTLEGUNG (5) DES ZUSCHNITTS BLEIBT WÖRTLICH
     STEHEN.** Sie sagt, dass die beiden Kennungen **nicht auf FORM GEPRÜFT** werden, weil
     eine Prüfung auf beiden Achsen erfunden wäre. **PRÜFEN UND NORMALISIEREN SIND ZWEI
     VERSCHIEDENE DINGE:** Das eine WEIST AB, das andere VERÄNDERT. Wer die Entscheidung als
     Aufhebung von Festlegung (5) liest, baut eine Formprüfung, die niemand entschieden hat.
   · **DIE GRENZE DIESES EINTRAGS GILT UNVERÄNDERT MIT, UND SIE IST JETZT DIE GRENZE DER
     ENTSCHEIDUNG:** Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert
     gemessen (Teil (bt)). Die Normalisierung ruht damit auf einer **Lesung plus einer
     Messung, die zwei Ursachen nicht trennt** — nicht auf einem Beleg, dass Bindestriche
     abgewiesen werden. **Zeigt Scheibe 4 an einer echten Antwort etwas anderes, ist sie neu
     zu bewerten.**
   · **WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST:** WIE normalisiert wird — welche Zeichen
     fallen, ob beim Schreiben oder beim Lesen, und was mit einem Wert geschieht, der danach
     leer wäre. Das ist Sache des Bau-Plans, wie der TRIM aus Festlegung (5).
   PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
   Existenz des Zuschnitts (CC, 2026-08-31). **Die Entscheidung ist eine OWNER-ENTSCHEIDUNG
   vom 2026-08-31 — keine Messung und keine Ableitung.** Der gemessene Stand, auf dem sie
   ruht, steht unverändert im Rumpf dieses Eintrags.

   **ERLEDIGT AM 2026-08-31 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN SEINER MESSUNG UND
   SEINER GRENZE.** Bauform wie bei Eintrag 15: ein eigener datierter Absatz UNTER dem
   unveränderten Eintrag, mit Datum, Grund und dem, was ihn eingelöst hat.
   **WAS IHN EINLÖST:** Der Eintrag sagte "Der Ort für die Normalisierung ist die Stelle,
   an der der Betreiber die Nummer eingibt; **die gibt es heute nicht**." **ES GIBT SIE
   JETZT, UND DORT WIRD NORMALISIERT** — `NORMALIZE_PIXEL_ID` in `src/lib/settings.ts`,
   gerufen aus `setPixelId`, also im Schreibpfad der Eingabe. Bau-Commit `6dc7e27`, live
   bestätigt (VERMERK 9, Schritt 2: die Bindestriche fallen sichtbar im Feld).
   **DER ZWEITE HALBSATZ DES TITELS IST EINGEHALTEN:** `buildIngestEventsRequest`
   normalisiert weiterhin nicht und ist nicht angefasst worden.
   **WARUM DER EINTRAG NICHT GELÖSCHT WIRD — ZWEI GRÜNDE, und der zweite wiegt schwerer:**
   (1) Seine MESSUNG (Teil (bt): `INVALID_NUMBER_FORMAT` auf `account_id`) ist der Beleg,
   auf dem die Umformung überhaupt ruht. (2) Seine GRENZE — dass **nicht isoliert gemessen
   ist, ob die Bindestriche der Grund der Abweisung waren** — ist der MASSSTAB für jede
   spätere Frage an dieser Achse, etwa den Schrägstrich aus Eintrag 28 oder den
   Zeichenvorrat aus Eintrag 29. **Ein gelöschter Eintrag nähme beide mit.**
   **ERSETZT AM 2026-08-31:** Hier stand ein Vermerk, der die Frage als OFFEN und beim Owner
   liegend führte. Er beschrieb einen Vorgangs-Zustand, der mit der Entscheidung vorbei ist;
   ihn stehenzulassen hiesse, neben einer getroffenen Entscheidung zu behaupten, sie stehe
   aus. **Was er festhielt — dass eine Gegenrede erwogen wurde —, ist oben aufgenommen und
   nicht verloren.**
8. **EINE AUSWERTUNG DER ANBIETER-FEHLER DARF NICHT NUR DEN ERSTEN fieldViolation
   LESEN — DER PARSER SAMMELT.** GEMESSEN 2026-08-28 (OWNER), Messung B1, Aufruf 7: zwei
   unbekannte Namen ergeben ZWEI fieldViolations in EINER Antwort
   (docs/ziel-befunde.md, Teil (bp)).
   WER NUR DEN ERSTEN LIEST, VERLIERT DIAGNOSTIK, DIE DER ANBIETER GELIEFERT HAT — und
   merkt es nicht, weil eine Antwort mit einem gelesenen Verstoss genauso aussieht wie
   eine mit einem einzigen.
   GRENZE: GEMESSEN ist das Sammeln auf der PARSE-Ebene. **Ob die SEMANTISCHE Ebene
   ebenfalls sammelt, ist NICHT gemessen** — Teil (bu) führt dazu eine ausdrücklich als
   ABLEITUNG gekennzeichnete Gegenannahme.
   TRIGGER: der erste Rückkanal für abgelehnte Ereignisse. Er berührt alle vier
   bestehenden Adapter — s. den Kandidaten
   "EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN" in
   docs/claude-history/backlog-polish.md und Vorrats-Eintrag 3 oben.

9. **KEIN NEBENLÄUFIGKEITS-RIEGEL BEI DER ERNEUERUNG — ZWEI GLEICHZEITIGE LÄUFE LÖSEN
   DASSELBE ERNEUERUNGS-TOKEN DOPPELT EIN.** Die Scheibe 1a
   (s. den Abschnitt "Die Erneuerung des Zugangsdatums", Festlegung 3) baut
   ausdrücklich KEINEN Riegel — keine Sperre auf der Zeile, keine Vereinzelung, kein
   Warten.
   **WARUM DER SCHADEN KLEIN IST, und das ist der Grund für "melden statt bauen":**
   Google rotiert das Erneuerungs-Token NICHT (GEMESSEN 2026-08-28, OWNER, Messung C;
   docs/ziel-befunde.md, Google-Abschnitt, Teil (bv)). Der zweite Lauf bekommt ein
   gültiges Zugangsdatum wie der erste; was entsteht, ist ein ÜBERFLÜSSIGER NETZAUFRUF
   und eine zweite Schreibung derselben Zeile — kein verlorener Zugang.
   **DIE GRENZE, UND SIE HÄNGT AN EINER FREMDEN EIGENSCHAFT:** Diese Einschätzung ruht
   VOLLSTÄNDIG darauf, dass der Anbieter nicht rotiert. **Rotierte er, wäre derselbe
   Fall ein VERLORENER ZUGANG** — der zweite Lauf entwertete das Token des ersten, und
   der Schaden wäre nicht ein Netzaufruf, sondern eine Neu-Autorisierung durch den
   Kunden. Ein Anbieter kann das ändern, ohne dass hier etwas rot wird.
   **AUSDRÜCKLICH NICHT ÜBERTRAGBAR:** Für LinkedIn ist die Nicht-Rotation NICHT
   gemessen. Wer den Rahmen um einen zweiten Anbieter-Zweig erweitert, prüft sie dort
   eigens — s. Teil (bz).

   **ERGÄNZT AM 2026-08-29 — EINE ZWEITE ACHSE, DIE DIESER EINTRAG BIS DAHIN NICHT
   FÜHRTE. DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN.** Er beschreibt die ROTATIONS-Achse
   vollständig und richtig; was fehlte, ist eine davon UNABHÄNGIGE.

   **DIE ACHSE: AUSSTELLUNGS- UND SCHREIBREIHENFOLGE KÖNNEN DIVERGIEREN.** Lauf A stellt
   aus, Lauf B stellt aus, B schreibt, A schreibt — danach steht das **ÄLTERE** Token in
   der Zeile. Das ist kein Rotations-Problem: es tritt auch dann ein, wenn der Anbieter
   NICHT rotiert, weil es an unserer Schreibreihenfolge hängt und nicht an seiner
   Token-Vergabe.

   **WARUM DAS ZÄHLT, UND ERST DIESER SATZ MACHT ES ZU EINEM POSTEN:** Invalidierte der
   Anbieter das vorige ZUGANGSDATUM bei Ausstellung eines neuen, stünde in der Zeile ein
   **TOTES Token mit einem Ablaufzeitpunkt in der ZUKUNFT** — und der Vorlauf aus
   Festlegung 1 erneuerte es NICHT, weil die Uhr sagt, es reiche noch. Der Fehlzustand
   wäre damit genau der stumme, gegen den die Scheibe 1a überhaupt gebaut wird.

   **PROVENIENZ: UNGEMESSEN.** Ob der Anbieter ein vorheriges Zugangsdatum bei der
   Ausstellung eines neuen entwertet, ist an keiner Schnittstelle erhoben. Messung C
   belegt ZWEI ERFOLGREICHE EINLÖSUNGEN — sie belegt **NICHT** die gleichzeitige
   Gültigkeit zweier ausgestellter Zugangsdaten. **WER DAS AUS (bv) ABLEITET, LEITET
   MEHR AB, ALS DORT STEHT.**

   **DERSELBE SACHVERHALT STEHT IM KOMMENTARKOPF VON src/lib/oauth/token-refresh.ts**,
   dort als ACHSE 2 neben der Rotation. Zwei Orte, weil der eine beim Zuschneiden und
   der andere beim Bauen gelesen wird; die Angabe ist an beiden dieselbe und trägt an
   beiden ihre Provenienz.

   GEMELDET, NICHT GEBAUT. KEINE EMPFEHLUNG.
   TRIGGER: eine gemessene Rotation bei irgendeinem Anbieter dieses Rahmens, ODER ein
   Auslöser (Scheibe 1b), der die Funktion nachweislich nebenläufig ruft.

   **VERMERK 2026-09-03 — DER ZUSCHNITT DES SCHRITTS 1b-1 NIMMT DIESEN EINTRAG BEGRÜNDET
   NICHT AUF. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT
   DANEBEN.**
   **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
   der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
   OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
   **DER TRIGGER IST NICHT EINGETRETEN, UND ZWAR AN BEIDEN HÄLFTEN:** Eine Rotation ist
   bei keinem Anbieter dieses Rahmens gemessen worden, und **1b-1 baut KEINEN AUSLÖSER** —
   die Funktion wird also von nichts nachweislich nebenläufig gerufen. **MIT 1b-2 KANN ER
   EINTRETEN; DORT IST ER NEU ZU PRÜFEN.**
   **DER ZWEITE GRUND IST DER TRAGENDE, und er steht ausgeschrieben im Zuschnitt** (dort
   unter "Was ausdrücklich draussen bleibt, je mit seinem Grund"): **Die FORM des Riegels
   hängt am GRAD der Nebenläufigkeit, und den legt erst der TAKT fest — also 1b-2.** Ein
   Riegel im Prozessspeicher trägt für einen Sweep mit zwei Läufen und trägt nicht, wenn der
   Verkehr ihn auslöst. **Vor der Takt-Wahl gebaut, wäre er auf Verdacht gebaut.**
   **DIE ZWEITE ACHSE DIESES EINTRAGS IST DAVON UNBERÜHRT UND BLEIBT UNGEMESSEN** — ob der
   Anbieter ein vorheriges Zugangsdatum bei Ausstellung eines neuen entwertet. Der
   Zuschnitt führt sie ausdrücklich als geschützte Invariante: **der ACHSE-2-Kommentarkopf
   von src/lib/oauth/token-refresh.ts bleibt und wird nicht abgeschwächt.**
   **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT.** Sein Trigger steht wörtlich
   wie zuvor; was hinzukommt, ist die Auskunft, dass er in 1b-1 **geprüft und begründet
   vertagt** worden ist — und ein geprüft vertagter Posten sieht in einem Repo sonst genauso
   aus wie ein übersehener, nämlich wie nichts.
   PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO; die Zerlegung in zwei
   Schritte eine ARCHITEKTEN-FESTLEGUNG desselben Tages. Keine Messung.

   **ZWEITER VERMERK 2026-09-03 — DER EINTRAG BLEIBT VERTAGT, ABER SEINE ZWEITE ACHSE WIRD
   UNTER SCHEIBE 1b-2a SCHÄRFER. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN.**
   **WARUM DAS AN DEN EINTRAG GEHÖRT UND NICHT NUR IN DEN ZUSCHNITT:** Wer diesen Posten in
   einem Jahr aufschlägt, liest hier zuerst — und der Vermerk oben sagt "geprüft und
   begründet vertagt". Ohne diesen Zusatz liest er eine Vertagung, deren Gewicht sich
   seither geändert hat, als unveränderten Stand.
   **DIE ERSTE ACHSE (DIE ROTATION) IST UNBERÜHRT:** Google rotiert das Erneuerungs-Token
   nicht (GEMESSEN 2026-08-28, OWNER, Messung C), und daran ändert ein häufigerer Aufruf
   nichts.
   **DIE ZWEITE ACHSE (AUSSTELLUNGS- UND SCHREIBREIHENFOLGE) WIRD SCHÄRFER, UND ZWAR AUS
   EINEM BENENNBAREN GRUND:** Sie ist eine Aussage über NEBENLÄUFIGE Läufe, und
   Nebenläufigkeit war bisher nur durch zwei gleichzeitige Klicks eines Menschen
   herstellbar. **EIN VERKEHRSGETAKTETER AUSLÖSER ERNEUERT HÄUFIGER ALS EIN MENSCH, DER EINE
   ROUTE DRÜCKT** — und mehrere Beacons können denselben Moment treffen. **Was daran
   UNGEMESSEN ist, bleibt ungemessen:** ob der Anbieter ein vorheriges Zugangsdatum bei
   Ausstellung eines neuen entwertet. Nur die Wahrscheinlichkeit, dem Fall zu begegnen,
   steigt.
   **DER TRIGGER BLEIBT WÖRTLICH STEHEN, UND ER IST WEITERHIN NICHT EINGETRETEN:** 1b-2a
   baut **KEINEN** Riegel (Invariante (I-6) jenes Zuschnitts), und "ein Auslöser, der die
   Funktion nachweislich nebenläufig ruft" ist mit ihr noch nicht nachgewiesen, sondern
   nur wahrscheinlicher geworden. **DER RIEGEL IST SCHEIBE 1b-2b**, und ihr eigener Trigger
   steht dort.
   **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT. KEINE EMPFEHLUNG**, welche
   Form ein Riegel bekäme.
   PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Dass die zweite Achse unter
   häufigerer Erneuerung schärfer wird, ist eine **ABLEITUNG** aus dem gewählten Takt,
   **keine Messung** — es ist kein nebenläufiger Lauf beobachtet worden.

10. **`retry` HAT KEINE OBERGRENZE, UND SCHEIBE 1b MUSS EINE LIEFERN.** DREI Ausgänge
    der Erneuerungs-Funktion können DAUERHAFT sein und trotzdem `retry` melden:
    `unexpected` (ein Anbieter-Code, den wir nicht abbilden), `read` (die Datenbank
    antwortet nicht), und seit der Entscheidung B-2 der unbrauchbare 2xx-Rumpf.
    **UNTER EINEM MENSCHEN-AUSLÖSER IST DAS HARMLOS** — jemand klickt, bekommt `retry`,
    und hört irgendwann auf. **UNTER EINEM AUTOMATISMUS IST ES EINE SCHLEIFE, DIE JE
    DURCHLAUF EINEN ECHTEN ERNEUERUNGSRUF VERBRAUCHT.**
    **DIESELBE FIGUR WIE DIE BEGRÜNDUNG AN `write_failed`, EINE EBENE HÖHER:** Dort hält
    der ZUSTAND den Wiederholer an (`misconfigured` statt `retry`), weil eine
    CHECK-Verletzung sich durch Wiederholen nie auflöst. Hier gibt es niemanden, der ihn
    anhält — `retry` sagt "nochmal", und die Funktion kennt keine Zählung, keine
    Verzögerung und keine Obergrenze. **Sie soll sie auch nicht kennen: eine
    Bibliotheksfunktion ohne Aufrufer kann nicht wissen, wie oft sie schon lief.**
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG, wo die Grenze liegt oder wie
    sie aussieht.
    TRIGGER: der Zuschnitt der Scheibe 1b.

    **VERMERK 2026-09-03 — TRIGGER EINGETRETEN, UND DIESER EINTRAG LIEGT IN 1b-1. DER
    TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt **die Obergrenze aus diesem Eintrag
    als eines von drei Stücken, die hineingehören.**
    **DIE OBERGRENZE LIEGT IN 1b-1 UND NICHT IN 1b-2, und dieser Satz gehört hierher, weil
    die naheliegende Zuordnung die andere wäre:** Sie hängt an der KLAMMER und nicht am
    Takt — der Ausgang `retry` entsteht in der Funktion darunter, und die Klammer ist die
    erste Stelle, die zählen kann.
    **WAS DER ZUSCHNITT NICHT TUT, und das ist der Grund für diesen Vermerk: ER SAGT NICHT,
    WELCHE GESTALT SIE BEKOMMT.** Er trägt dafür eine eigene offene Entwurfsfrage mit DREI
    Lesarten — Wiederholung mit Deckel INNERHALB eines Aufrufs · ein persistierter Zähler
    ÜBER Aufrufe hinweg · eine ehrlichere AUSGANGS-KLASSIFIKATION, die `retry` nur dort
    meldet, wo Wiederholen etwas ändern kann. **Die zweite fällt aus 1b-1** (sie braucht
    Zustand und Wissen über den Takt); **zwischen der ersten und der dritten entscheidet der
    Architekt am Plan.**
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT:** Ein eingetretener Trigger
    ist kein Vollzug, und der Satz "Sie soll sie auch nicht kennen: eine Bibliotheksfunktion
    ohne Aufrufer kann nicht wissen, wie oft sie schon lief" ist **der Maßstab, an dem die
    Gestalt der Obergrenze zu messen ist** — die Klammer bekommt einen Aufrufer, die
    Bibliotheksfunktion darunter nicht.
    PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
    Existenz des Zuschnitts (CC, 2026-09-03). Die drei Lesarten sind ein
    ARCHITEKTEN-ZUSCHNITT vom 2026-09-03, die Zerlegung in zwei Schritte eine
    ARCHITEKTEN-FESTLEGUNG desselben Tages; keine Messung.

11. **G18/G19 MESSEN UNSERE VERZWEIGUNG, NICHT DIE FEHLERFORM DER LAUFZEIT.** Die zwei
    Tests, die den verschobenen Deckel bewachen (Entscheidung B-4), arbeiten mit einer
    Attrappe, die **den Namen `AbortError` SELBST WÄHLT**. Sie beweisen, dass unsere
    Verzweigung diesen Namen richtig behandelt.
    **WAS SIE NICHT BEWEISEN: ob die Laufzeit bei einem Abbruch WÄHREND DES RUMPF-LESENS
    denselben Namen wirft.** Das ist UNGEMESSEN — für `fetch` selbst ist das Verhalten im
    Bestand mehrfach beobachtet, für den Rumpf-Strom nicht.
    **DER SCHADEN WÄRE BEGRENZT, und der Satz gehört dazu, damit der Posten nicht grösser
    gelesen wird als er ist:** Beide Wege enden in `retry` — nur die Diagnose wäre
    `network` statt `timeout`. **OHNE DIESEN EINTRAG GILT DIE ACHSE BEIM NÄCHSTEN LESEN
    ALS GEPRÜFT**, weil zwei grüne Tests danebenstehen.
    GILT FÜR G18 UND G19 GLEICHERMASSEN.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die erste Runde, die einen echten Abbruch am Rumpf-Strom beobachten kann.

12. **TEIL (bv) IST MEHRDEUTIG UND BLEIBT ES.** "Kein neues Erneuerungs-Token an die
    Stelle des alten" trennt **"das Feld fehlt"** nicht von **"das Feld trägt denselben
    Wert"**.
    **DER BAU IST UNTER BEIDEN AUSLEGUNGEN RICHTIG** — `toRefreshedPayload`
    (src/lib/oauth/google-refresh.ts) übernimmt einen vorhandenen, nicht-leeren Wert und
    lässt sonst den abgelegten stehen; er bliebe auch dann richtig, wenn der Anbieter
    eines Tages doch rotierte. **DER POSTEN IST NICHT DER CODE, SONDERN DIE FUNDSTELLE:**
    Solange der Satz dort steht, leitet die nächste Runde die Mehrdeutigkeit neu ab.
    NICHT IN DIESER RUNDE: docs/ziel-befunde.md bleibt unberührt.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die docs/ziel-befunde.md ohnehin öffnet — dann wird es
    dort nachgezogen.

13. **ZWEI EINTRÄGE AUS DEM VORRAT DER PHASE 11.8, HIERHER ÜBERNOMMEN.**
    **HERKUNFTSDATEI: docs/aktiver-stand-11.8.md**, Abschnitt "Vorrat (gemeldet, nicht
    gebaut)", Einträge 5 und 6. **DER GRUND FÜR DIE ÜBERNAHME IST IHR ORT, NICHT IHR
    INHALT:** Jene Datei ist archiviert und wird nicht mehr geladen; beide Trigger sind
    inzwischen EINGETRETEN, und ein eingetretener Trigger in einer ungelesenen Datei ist
    ein Posten, der still stirbt.
    **NUR ÜBERNOMMEN — NICHT NEU GEMESSEN, NICHT BEHOBEN, NICHT UMFORMULIERT.** Die
    Befunde und ihre Provenienz stehen am Ursprung und werden hier NICHT verdoppelt.
    · **`'google'` FEHLT IN `TRACKING_TARGETS`** — die Zeile ist für die Oberfläche
      unsichtbar und über die Anwendung nicht löschbar. **TRIGGER EINGETRETEN:** Die
      Aufnahme ist Scheibe 3 des Schnitts (bindende Entscheidung (6)), und sie kommt VOR
      dem Transport (bindende Entscheidung (8)).
    · **`ensureTrackingKey` LÄUFT IM GOOGLE-OAUTH-WEG NICHT** — anders als in
      `setCapiToken`. Ein Projekt, das ausschliesslich über diesen Weg konfiguriert wird,
      hat womöglich keinen Tracking-Schlüssel. **TRIGGER EINGETRETEN:** Der Ursprung
      führt ihn als "VORBEDINGUNG der Transport-Scheibe"; die Scheibe 1a hat ihn
      gemessen bestätigt und ausdrücklich NICHT behoben.
    ÜBERNOMMEN 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.

    **VERMERK 2026-09-01 ZUM ZWEITEN SPIEGELSTRICH (`ensureTrackingKey`) — DER
    URSPRUNGSTEXT WIRD NICHT UMGESCHRIEBEN, DIESER VERMERK TRITT DANEBEN.**
    Der Ursprung führt den Posten als "VORBEDINGUNG der Transport-Scheibe".
    **SCHEIBE 4 BEHEBT IHN NICHT**, und der Grund gehört dazu, sonst gilt er als übersehen:
    **Ohne Tracking-Schlüssel erreicht kein Beacon den Ingest** — `getCapiConfigByTrackingKey`
    (src/lib/capi/token.ts) kehrt bei leerem Schlüssel ohne Datenbank-Runde zurück, und ein
    Projekt ohne Schlüssel trägt auch keinen ausgelieferten Emitter, der einen senden könnte.
    **ES ENTSTEHT ALSO GAR KEIN VERKEHR, NICHT NUR KEIN SICHTBARER.** Ein Zustand, der nichts
    erzeugt, kann nichts stillschweigend falsch machen; das ist der Unterschied zu einem
    Posten, der still Conversions verliert.
    **DIE BEDINGUNG, UNTER DER DAS KIPPT:** eine Scheibe, die **OHNE Veröffentlichung sendet**
    — **Phase 11.4, der Testknopf**. Dort löst ein Betreiber den Versand von Hand aus, und der
    Weg über den ausgelieferten Emitter entfällt; ab da ist ein fehlender Schlüssel kein
    leiser Zustand mehr, sondern ein Fehlschlag mit Auslöser.
    **EIN GEMESSENER ZUSATZ (CC, 2026-09-01), der die Prämisse "ohne Publish kein Schlüssel"
    enger fasst als bisher angenommen:** Eine `domains`-Zeile KANN **ohne** `publishProject`
    entstehen — `persistDomainRow` (src/lib/domains/register.ts) legt sie an, erreichbar über
    `registerCustomDomain` und die Server-Action `addCustomDomain`
    (src/app/projects/domain-actions.ts), und **diese Kette berührt `publishProject` an keiner
    Stelle**. ACHSE: `from("domains")` über `src/` rekursiv, binärsicher, Testdateien
    gefiltert — zwölf Fundstellen, davon DREI `insert`; zwei davon (`assignDomainLabel`,
    `insertDomainLabel`) haben ausschliesslich `publishProject` als Aufrufer, die dritte nicht.
    Positivkontrolle: dieselbe Achse führt die Aufrufer-Kette je Symbol lückenlos.
    **WAS DER ZUSATZ NICHT SAGT:** `ensureTrackingKey` läuft **weiterhin nur** in
    `setCapiToken` und `publishProject` (GEMESSEN am Repo, CC, 2026-09-01). Die
    Custom-Domain-Zeile setzt **keinen** Tracking-Schlüssel — der Zusatz benennt eine
    `domains`-Zeile ohne Publish, **nicht** einen Schlüssel ohne Publish. Wer beides
    zusammenzieht, liest hier eine Behebung, die nicht dasteht.

14. **DER KOMMENTARKOPF VON `createAdminClient` IST ZU WEIT.** Er sagt: "GESCHRIEBEN wird
    in BEIDE — project_secrets UND project_tokens (Doppelschreib in
    setCapiToken/removeCapiToken; die Alt-Tabelle ist die Rollback-Reserve)".
    **GEMESSEN am Code (CC, 2026-08-29):** Der `project_tokens`-Zweig in `setCapiToken`
    liegt hinter `if (target === META_TARGET)`, ebenso der in `removeCapiToken`. Für die
    drei anderen Ziele beschreibt der privilegierte Client **nur EINE** Tabelle.
    **ALS AUSSAGE ÜBER META RICHTIG, ALS AUSSAGE ÜBER DEN CLIENT ZU WEIT** — und der Satz
    steht dort, um zu erklären, WOFÜR es diesen Client gibt; mit einer Tabelle zu viel
    erklärt er einen Doppelschreib, den es für drei von vier Zielen nicht gibt.
    FUNDSTELLE: `src/lib/supabase/admin.ts`, Kommentarkopf von `createAdminClient`.
    **AUSDRÜCKLICH NICHT MITGEZÄHLT:** `setCapiToken` schreibt zusätzlich `projects`
    (settings und tracking_key) — aber über den SSR-Client, nicht über diesen. Der
    Kommentar ist an dieser Stelle also nicht unvollständig, sondern nur zu weit.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die `src/lib/supabase/admin.ts` ohnehin anfasst.

15. **DIE FIXTURE-LISTEN IN `CodeImporter.test.tsx` SIND UNGEPRÜFT.** Mehrere Läufe dort
    schreiben Consent-Schlüsselmengen als Literal ab (`toEqual(["meta", "pinterest",
    "tiktok"])` und Verwandte) und prüfen damit den ausgelieferten Text eines konkreten
    Fixtures, nicht die Konstante.
    **OB SIE BEI EINEM FÜNFTEN ZIEL BRECHEN, HÄNGT AM FIXTURE UND IST NICHT ERHOBEN.**
    Der Unterschied zu den zwei Zahlen aus Festlegung (5) ist genau dieser: jene sind
    GEMESSEN und brechen sicher, diese sind UNGEMESSEN und brechen vielleicht.
    Beides ungeprüft in einen Bau-Plan zu schreiben wäre dieselbe Sicherheit für zwei
    verschiedene Wissensstände.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: Stufe 1 der Scheibe 3 — dort ist es ein GATE, kein Hinweis.

    **ERLEDIGT AM 2026-08-29 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN DER MESSUNG.**
    Gate (1) der Stufe 1 hat es beantwortet (GEMESSEN am Repo, CC, 2026-08-29): **Alle
    ACHT Läufe D-T1 bis D-T8 zählen ihr `pixels`-Objekt VOLLSTÄNDIG auf, und KEINER trägt
    einen `google`-Eintrag.** Das Memo `consentTargets` filtert über
    `isTargetDeliverable`; ein Ziel ohne Kennung erscheint in keiner der geprüften
    Mengen. **Sie brechen nicht** — und der volle Lauf nach der Aufnahme hat es bestätigt:
    von den 1376 Bestandstests fielen genau die ZWEI fest verdrahteten Längen-Zahlen,
    keine Fixture-Liste.
    **MITGEPRÜFT UND HIER FESTGEHALTEN, weil der Eintrag es nicht nannte:**
    `TargetCard.test.tsx` enthält EINE kartenzählende Zusicherung
    (`getAllByText(STATUS_CONFIGURED)).toHaveLength(1)`). Auch sie bricht nicht — die
    Liste der konfigurierten Ziele ist dort gemockt.
    **WARUM DER EINTRAG NICHT GELÖSCHT WIRD:** Ein gelöschter Eintrag nähme die MESSUNG
    mit. Die Frage "brechen die Fixture-Listen beim nächsten Ziel?" stellt sich beim
    sechsten wieder, und dann ist der Unterschied zwischen "geprüft und tragfähig" und
    "nie geprüft" die ganze Auskunft.
    **DIES IST DIE ERSTE ERLEDIGT-KENNZEICHNUNG IN DIESEM VORRAT.** Es gab bisher keine
    Bauform dafür; diese hier ist gewählt und nicht vorgefunden — sie steht als eigener
    Absatz UNTER dem unveränderten Eintrag, mit Datum, Grund und der Messung.

16. **`saveProject` SCHREIBT `settings` UNVALIDIERT — TOR A HÄLT DURCH EINE
    UI-ABWESENHEIT UND NICHT DURCH EINEN RIEGEL.**
    **GEMESSEN am Code (CC, 2026-08-29):** `saveProject` (src/app/projects/actions.ts)
    reicht den Einstellungs-Blob unverändert in die `projects`-Spalte durch — kein
    Schema-Check, keine Feldprüfung, keine Ziel-Prüfung. Der einzige Weg, der heute
    `settings.pixels.<ziel>.pixelId` setzt, ist das öffentliche Eingabefeld der Karte
    (`setPixelId` hat im Produktivcode GENAU EINEN Aufrufer, components/CodeImporter.tsx).
    **WAS DARAUS FOLGT UND WARUM ES HIERHER GEHÖRT:** Das erste der vier Tore der
    Scheibe 3 (`withPixel` in src/lib/capi/token.ts) hält, WEIL die Google-Karte kein
    solches Feld anbietet. Ein selbstgebauter Aufruf könnte `pixels.google` trotzdem in
    den Blob legen. **DIE TRAGENDE SCHICHT IST DESHALB TOR B** — die Klartext-Spalte
    `secret` der google-Zeile bleibt NULL, und der Resolver liest ausschliesslich sie.
    **ES IST KEINE NEUE LÜCKE, UND DIESER SATZ GEHÖRT DAZU, damit der Eintrag nicht
    grösser gelesen wird als er ist:** Der Blob ist seit jeher CLIENT-besessen
    (`saveProject` ersetzt ihn ganzheitlich — die Regel "SERVER-EIGENE IDENTITÄT NIE IN
    EINEN CLIENT-BESESSENEN BLOB" beschreibt genau das). Die Scheibe 3 ändert daran
    nichts; sie macht nur sichtbar, dass ein TOR daran hängt.
    **GEMELDET, NICHT BEHOBEN. KEINE EMPFEHLUNG** — weder eine Validierung in
    `saveProject` noch eine Allowlist im Blob ist hier vorgeschlagen.
    TRIGGER: **der Zuschnitt der Scheibe 2.** Dort fällt Tor A ABSICHTLICH (die Kennungen
    bekommen ihre Eingabe), und ab da zählt, dass der Blob beliebige Ziel-Schlüssel
    aufnimmt — die Frage ist dann nicht mehr, ob ein Feld existiert, sondern was in der
    Spalte stehen darf.
    GEMELDET 2026-08-29.

    **VERMERK 2026-08-31 — TRIGGER EINGETRETEN. DER EINTRAG WIRD NICHT GESTRICHEN.**
    Der Zuschnitt der Scheibe 2 steht (s. den Abschnitt "Die Konto-Kennungen bekommen ihre
    Eingabe"). Dieser Vermerk sagt, WAS er von diesem Eintrag beantwortet und was er nur
    VERORTET — die Trennung ist der ganze Zweck, weil ein Eintrag mit eingetretenem Trigger
    sonst entweder als erledigt gilt oder als übersehen liegenbleibt.
    · **BEANTWORTET IST DER KERN:** Tor A fällt ABSICHTLICH. Was danach hält, steht an zwei
      Orten und nicht hier — in der Sachkorrektur an Festlegung (1) der Scheibe 3 (Tor B UND
      Tor D, Tor D unabhängig und für sich hinreichend) und in der Beweis-Achse der
      Scheibe 2, die für jedes der beiden einen eigenen Test verlangt, der SEIN Tor benennt.
      **Der Satz dieses Eintrags "DIE TRAGENDE SCHICHT IST DESHALB TOR B" war damit zu eng**
      — er nannte eines von zweien; als Aussage über den 2026-08-29 bleibt er richtig und
      wird NICHT überschrieben.
    · **NICHT BEANTWORTET, SONDERN VERORTET:** Dass ein Betreiber über das neue Feld eine
      FREMDE Kundennummer eintragen kann, ist eine Frage an das Verhalten des Anbieters. Sie
      steht seit dem 2026-08-31 als eigener offener Punkt in docs/offene-punkte.md ("WAS
      GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT, IST UNGELESEN UND UNGEMESSEN"), Trigger
      "der Zuschnitt der Scheibe 4". **Sie ist hier ausdrücklich NICHT entschieden.**
    · **WARUM DER EINTRAG BLEIBT:** Seine MESSUNG — `saveProject` schreibt den
      Einstellungs-Blob unvalidiert durch, kein Schema-Check, keine Feldprüfung, keine
      Ziel-Prüfung — ist der MASSSTAB für jede spätere Blob-Frage. Ein gelöschter Eintrag
      nähme sie mit. Dieselbe Bauform wie bei Eintrag 15, wo die Erledigt-Kennzeichnung
      ebenfalls UNTER dem unveränderten Eintrag steht.
    PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
    Existenz des Zuschnitts (CC, 2026-08-31). Die zwei Tore sind GEMESSEN am Repo (CC,
    2026-08-31).

17. **DIE GIT-WARNUNG WAR DER AUSLÖSER, NICHT DIE KONTROLLE.**
    **DER VORFALL (CC, 2026-08-29):** `src/app/projects/actions.ts` kippte während der
    Bau-Runde auf CRLF. **ALLE VIER GATES WAREN GRÜN**, und der Inhalts-Diff war sauber
    (34 Einfügungen, 0 Löschungen), weil git beim Stagen normalisiert. **Sichtbar wurde es
    allein an der Zeile "CRLF will be replaced by LF"** aus `git diff --numstat`.
    **DIE ZAHL IST AM 2026-08-31 ERSETZT WORDEN, NICHT GESTEMPELT.** Hier stand
    "**1504 CR-Bytes, HEAD 0**" und das Wort **VOLLSTÄNDIG**. Beides ruhte auf
    `grep -c $'\r'`, und diese Sonde zählt in dieser Umgebung ALLE Zeilen statt der
    CR-Zeilen (Herleitung mit Positiv- und Negativkontrolle: Vorrats-Eintrag 22). **Die
    Datei hat exakt 1504 Zeilen** — die Zahl war die Zeilenzahl, nicht der Umfang des
    Schadens. **ERSETZT statt gestempelt, weil dieser Eintrag ein MASSSTAB ist:** Wer die
    nächste CRLF-Frage an ihm misst, misst sonst an einer Zahl, die nichts gezählt hat.
    **DER BEFUND SELBST BLEIBT, UND ZWAR AUS EINEM GEMESSENEN GRUND:** "CR = Zeilenzahl"
    ist **auch das erwartete Bild einer echt gekippten Datei** — das Merkmal trennt die
    beiden Fälle nicht. **Was sie trennt, ist die Git-Warnung**, und die kann git nur
    ausgeben, wenn die Datei im Arbeitsbaum tatsächlich CR trägt; sie stammt nicht aus der
    Sonde. **Der Titel dieses Eintrags wird dadurch schärfer:** Die Warnung war nicht nur
    der Auslöser — sie war das einzige Instrument jener Runde, das nicht gelogen hat.
    **WELCHES WERKZEUG ES WAR, IST NICHT GEMESSEN.** Die Gegenprobe spricht gegen die
    naheliegende Antwort: Nach `git checkout` wurden DIESELBEN zwei Änderungen mit
    DEMSELBEN Editier-Werkzeug erneut eingetragen und nach jeder einzelnen nachgemessen —
    **CR = 0**. Die zwölf anderen Dateien derselben Runde, gleiches Werkzeug, blieben
    ebenfalls sauber.
    **DIE HYPOTHESE IST ALS HYPOTHESE ZU LESEN UND NICHT ALS BEFUND:** Was diese Datei von
    den anderen unterschied, war ein MUTATIONS-ZYKLUS (setzen, messen, zurücknehmen). Ob
    er die Ursache war, ist **nicht geprüft**.
    **DIE KONTROLLE WAR NICHT NACHLÄSSIG, und das gehört dazu, sonst liest sich der
    Eintrag als Vorwurf:** Sie folgte der Regel "EIN NACHWEIS AN EINER NEUEN DATEI IST
    BLIND" und traf damit genau die Dateien, bei denen das Problem NICHT lag — die neu
    geschriebenen. Die bearbeiteten Bestands-Dateien waren zu diesem Zeitpunkt nicht
    geprüft.
    **WAS OHNE DEN VERURSACHER HANDHABBAR FOLGT — zwei Dinge:** Die Byte-Kontrolle gehört
    nach **JEDEM** Mutations-Zyklus über die mutierte Datei, nicht nur ans Rundenende —
    **die RÜCKNAHME ist der Schreibvorgang**, der hier still etwas verändert hat. Und sie
    vergleicht **gegen HEAD**, nicht nur absolut: "CR = 0" allein sagt nichts, wenn die
    Datei schon vorher CR trug.
    **GEGENRICHTUNG ZUR BESTEHENDEN REGEL:** "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER
    UMGEBUNG STILL DAS CR" (docs/immer-beachten.md) beschreibt ein still GESTRIPPTES CR —
    hier ist eines still HINZUGEFÜGT worden. Dieselbe Achse, entgegengesetzte Richtung.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde mit einem Mutations-Zyklus.

18. **`connectOutcome` HÄNGT AM ZWEIG "KEIN GEHEIMNIS-FELD", NICHT AM ZIEL.**
    Die Karte liest den Ergebniscode ausschliesslich im Verbinden-Zweig, und den gibt es
    nur, wo `secretLabel` fehlt. **HEUTE IST DAS DECKUNGSGLEICH**, weil
    `tracking/target-cards.test.ts` die Menge der Ziele ohne Geheimnis-Feld auf `{google}`
    festnagelt.
    **KOMMT EIN ZWEITES ZIEL OHNE GEHEIMNIS-FELD, WIRD JENER TEST ROT — UND DAS IST DER
    GANZE MECHANISMUS: DER TEST ERZWINGT EINEN BLICK, NICHT EINE LÖSUNG.** Wer ihn nur
    nachzieht, zeigt dem neuen Ziel Googles Ergebniscode.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG — weder eine Ziel-Bindung des
    Codes noch ein zweiter Zustand ist hier vorgeschlagen.
    TRIGGER: das zweite Ziel ohne Geheimnis-Feld.

19. **DER RESET LEERT DIE MELDUNG AUCH BEI EINEM ANDEREN ZIEL.**
    Ein Google-Fehlercode verschwindet, sobald der Betreiber sein Meta-Token speichert —
    die erste der drei Rücksetz-Stellen hängt an `handleCredentialsSaved`, also am
    VORGANG und nicht am ZIEL.
    **DAS IST DIE GEWOLLTE RICHTUNG, und sie gehört so begründet, sonst liest die nächste
    Runde es als Fehler:** Zu früh geleert kostet eine Information, die **ein Klick
    wiederherstellt** — der Betreiber versucht es erneut. Zu spät geleert erzeugt genau
    den Widerspruch in der Kachel, den der Fix `7771019` beseitigt hat. Von zwei
    Ungenauigkeiten ist die gewählt, deren Fehlgriff billiger ist.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine Runde, die die Rücksetz-Bedingung ziel-genau machen will — dann ist
    dieser Absatz die Gegenrede, die sie zu widerlegen hat.

20. **DIE MUTATIONS-VORHERSAGE 1 WAR ZU ENG — DER SECHSTE PROTOKOLLIERTE FALL, DER FÜNFTE
    IN DERSELBEN RICHTUNG.**
    Vorhergesagt war: nur T-A2 fällt. **Gefallen sind DREI** — T-A2 (Oberfläche), der neue
    Daten-Lauf in `tracking/target-cards.test.ts` und der bestehende Lauf "JEDES Ziel:
    Daten-Seite und Oberfläche sagen dasselbe über die Auslieferung".
    **ALLE DREI MELDEN DIESELBE FEHLERKLASSE** ("die Google-Karte trägt ein öffentliches
    Feld"), zweimal als Daten-Aussage, einmal als DOM-Aussage — nach Lektion (g) also
    **Deckung, keine Kaskade**.
    **TROTZDEM IST ES EIN BEFUND UND KEIN TREFFER:** Die vorab benannte
    Überschuss-KLASSE lautete "Abfragen werden MEHRDEUTIG". Die zwei Zusatztreffer liegen
    **ausserhalb** dieser Klasse. Damit ist es der **sechste** protokollierte Fall der
    Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN"
    (docs/immer-beachten.md) und der **fünfte in derselben Richtung: zu eng gezählt**.
    **DIE REGEL SAGT ES SELBST — die einseitige Streuung ist die eigentliche Aussage:**
    Zufall träfe mal nach oben, mal nach unten; eine systematische Ursache trifft immer
    dieselbe Seite.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG dazu, wie eine Vorhersage künftig
    breiter zu fassen wäre.
    TRIGGER: die nächste Hebung an docs/immer-beachten.md, die jene Regel ohnehin
    berührt — dort ist die Zahl der Fälle zu führen, nicht hier.

21. **VORRATS-EINTRAG 19 WIRD DURCH DIE FIX-SCHEIBE SCHÄRFER, NICHT GEGENSTANDSLOS.**
    **DER BEFUND (GEMESSEN am Code bzw. ABGELEITET daraus, CC, 2026-08-31):** Heute steht
    die Meldung des Autorisierungs-Flusses ohnehin am FALSCHEN Projekt — ihr Verlust durch
    ein fremdes Speichern fällt deshalb kaum auf. **Landet der Nutzer nach der Fix-Scheibe
    im richtigen Projekt, steht sie an der RICHTIGEN Karte** — und dann ist das Leeren
    durch ein Meta-Speichern ein **sichtbarer Verlust einer Information, die gerade jemand
    liest**.
    **DIE BEGRÜNDUNG IN EINTRAG 19 BLEIBT GÜLTIG** (zu früh geleert kostet eine
    Information, die ein Klick wiederherstellt; zu spät geleert erzeugt den Widerspruch in
    der Kachel) — **IHR PREIS STEIGT.** Der Text dort wird hier NICHT verdoppelt; wer
    entscheiden will, liest ihn und diesen Absatz zusammen.
    **WAS DAS NICHT HEISST:** Es ist keine Aufforderung, den Reset ziel-genau zu machen.
    Die Gegenrede dazu steht unverändert in Eintrag 19.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: der Live-Test der Fix-Scheibe — ab da ist der Fall beobachtbar, und erst
    dann ist er zu bewerten.

22. **KORREKTUR AN VORRATS-EINTRAG 17 — DIE ZAHL, NICHT DER BEFUND.**
    **DIE MESSUNG (CC, 2026-08-31):** `grep -c $'\r'` zählt in dieser Umgebung nicht
    CR-Zeilen, sondern **ALLE** Zeilen. Belegt mit Positiv- und Negativkontrolle in EINEM
    Lauf: eine reine LF-Datei mit drei Zeilen ergab `grep=3` und `tr=0`; eine echte
    CRLF-Datei mit zwei Zeilen ergab `grep=2` und `tr=2`.
    **DIE FOLGE FÜR EINTRAG 17:** Die dort protokollierte Zahl **"1504 CR-Bytes"** ist
    nicht mehr belegbar — `src/app/projects/actions.ts` hat **exakt 1504 Zeilen**.
    **ABER DER BEFUND STEHT, UND DAS IST DIE FASSUNG, DIE GILT:** "CR = Zeilenzahl" ist
    **AUCH das erwartete Bild einer echt auf CRLF gekippten Datei** — dort trägt jede
    Zeile ein CR. **DAS MERKMAL TRENNT DIE BEIDEN FÄLLE NICHT.**
    **WAS SIE TRENNT, IST DIE GIT-WARNUNG:** `"CRLF will be replaced by LF"` kann git nur
    ausgeben, wenn die Datei im Arbeitsbaum tatsächlich CR trägt. **Sie stammt nicht aus
    der Sonde und kann von ihr nicht erzeugt worden sein.**
    **DASS HEUTE NIRGENDS `i/crlf` STEHT, WIDERSPRICHT DEM NICHT** (GEMESSEN, CC,
    2026-08-31: `git ls-files --eol` über alle verfolgten Dateien — 227× `i/lf`, 5×
    `i/none`, 2× `i/-text`): Das ist die Normalisierung beim Commit; **der Index sollte
    den Zustand nie gesehen haben.**
    **DER TITEL VON EINTRAG 17 WIRD DADURCH SCHÄRFER, NICHT HINFÄLLIG:** Die Git-Warnung
    war nicht nur der Auslöser — **sie war in jener Runde das einzige Instrument, das
    nicht gelogen hat.**
    KORRIGIERT AM EINTRAG 17 SELBST (2026-08-31), nicht daneben: dort ist die Zahl
    ERSETZT. Dieser Eintrag trägt die Herleitung.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: keiner — die Korrektur ist vollzogen; der Eintrag steht als Beleg.

23. **— DIE NUMMER IST FREI UND BLEIBT ES.** Hier stand am 2026-08-31 kurzzeitig "DIE
    INSTRUMENTEN-REGEL FÜR DIE BYTE-KONTROLLE"; sie ist noch am selben Tag als
    **Hebungs-Kandidat 6** umgebucht worden (ARCHITEKT).
    **DER GRUND DER UMBUCHUNG:** Der Vorrat heisst "gemeldet, nicht gebaut" und sammelt
    BAUWÜRDIGES. Eine dauerhafte, projektweite WERKZEUG-Regel ist kein Bauvorhaben,
    sondern ein Kandidat für docs/immer-beachten.md. **DER UNTERSCHIED ENTSCHEIDET ÜBER
    IHR ÜBERLEBEN:** Der Vorrat wird mit dieser Standdatei ARCHIVIERT, die
    Kandidatenliste wird am Phasenende DURCHGESEHEN.
    **HIER STEHT ABSICHTLICH KEIN ZEIGER AUF DEN INHALT.** Die Regel steht danach an
    GENAU EINEM Ort; ein zweiter wäre eine Fassung, die neben ihr altert. Diese Zeile
    hält nur die LÜCKE fest.
    **DIE LÜCKE WIRD BENANNT STATT GESCHLOSSEN, und die übrigen Nummern bleiben:** Ein
    Umnummerieren machte jeden bestehenden Verweis auf einen Vorrats-Eintrag still falsch
    — und still ist hier das Problem, nicht die Lücke.

24. **`PROJECT_PARAM` STEHT ZWEIMAL, UND DIE DIVERGENZ IST EINSEITIG STUMM.**
    **DER BEFUND (GEMESSEN am Repo, CC, 2026-08-31):**
    `src/app/api/oauth/google/callback/route.ts` definiert die Konstante lokal (mit
    Begründung im Kommentar: die Route ist die SENDENDE Seite des URL-Vertrags);
    `src/lib/oauth/connect-return.ts` exportiert eine zweite Konstante desselben Namens
    für die empfangende Seite.
    **DIE ASYMMETRIE IST DER GANZE PUNKT:** Ändert jemand den Wert **im Callback**, wird
    **T6 rot**. Ändert er ihn **in `connect-return.ts`**, wird **NICHTS rot** — die Läufe
    dort reichen `rawProject` direkt hinein und gehen nie über den Parameternamen. **DIE
    FOLGE WÄRE EIN STILLER RÜCKFALL AUF "ZULETZT BEARBEITET"** — also genau der Defekt,
    den die Fix-Scheibe behebt.
    **NICHT GEBAUT, UND DER GRUND GEHÖRT DAZU:** Der Bau ERWEITERT ein bestehendes
    Muster — `RESULT_PARAM = "google"` steht seit Phase 11.8 genauso doppelt. **Es jetzt
    einseitig zu heilen, machte aus einem konsistenten Muster ein halbes.** **BEIDE PAARE
    GEHÖREN ZUSAMMEN**, falls es je angefasst wird.
    **DIE KONVENTIONSZEILE "Konstanten leben in geteilten Dateien, nie als handgetippte
    Literale" IST HIER ZWEIMAL NICHT EINGEHALTEN** — das steht hier, damit niemand die
    Doppelung für die Konvention hält.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine Änderung an einem der beiden Parameternamen.

25. **`loadProject` EBNET DREI FÄLLE AUF `null` EIN.**
    **GEMESSEN am Code (CC, 2026-08-31):** "nicht gefunden", "gehört einem anderen Nutzer"
    und "DB-Fehler" sind an der Rückgabe **nicht zu trennen** — alle drei liefern `null`.
    **FÜR DIE FIX-SCHEIBE IST DAS FOLGENLOS:** Alle drei bekommen dieselbe Behandlung
    (Rückfall auf "zuletzt bearbeitet", Meldung unterdrückt), und für zwei von ihnen ist
    genau das gewollt — ein eigener Text für "gehört dir nicht" verriete die Existenz
    einer fremden Kennung.
    **ABER: EIN DB-FEHLER FÜHRT DAMIT ZU RÜCKFALL UND UNTERDRÜCKTER MELDUNG — DER
    BETREIBER SÄHE NICHTS.** Er hat gerade einen Autorisierungs-Fluss durchlaufen, steht
    danach im falschen Projekt, und nichts sagt ihm, dass etwas schiefging.
    **EIN FIX LÄGE IN `loadProject` UND DAMIT AUSSERHALB JEDES BISHERIGEN SCOPES** — die
    Fix-Scheibe hat das Eigentums-Gate ausdrücklich nicht angefasst.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Arbeit an `loadProject` oder an der Fehlerbehandlung des
    Projekt-Ladepfads.

26. **EINE BESTANDS-LINT-WARNUNG IN `src/lib/tracking/consent.test.ts`.**
    **GEMESSEN (CC, 2026-08-31):** `consent.test.ts:33 — Unused eslint-disable directive
    (no problems were reported from 'no-new-func')`. `eslint` meldet 0 Fehler und genau
    diese eine Warnung.
    **SIE STAMMT NICHT AUS DIESER SCHEIBE:** Die Datei steht in keinem Diff der Runde
    (`git status` führt sie nicht), und die Lint-Konfiguration ist ebenfalls unberührt.
    **GEMELDET, NICHT BEHOBEN** — sie ausserhalb ihres Scopes anzufassen wäre ein
    Scope-Bruch, und eine unbenutzte Direktive ist kein Defekt, sondern eine Altlast.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Arbeit an `consent.test.ts` oder eine Aufräumrunde am Lint-Stand.

27. **DER BELEG AN `settingsEqual` TRÄGT NICHT MEHR — DIE REGEL BLEIBT WAHR.**
    **DER KOMMENTAR** über `settingsEqual` (src/lib/settings.ts) begründet die Schleife über
    alle Ziele so: "Der Nutzer ändert die Pixel-ID des zweiten Ziels, der Vergleich meldet
    'nicht dirty', **der Speichern-Knopf bleibt inaktiv** — und die Eingabe ist beim nächsten
    Projektwechsel weg."
    **GEMESSEN am Code (CC, 2026-08-31):** Der Knopf trägt
    `disabled={saveStatus === "saving" || code.trim() === ""}`. **`dirty` steht dort nicht.**
    Wer trotz fehlender Markierung auf Speichern drückt, rettet den Wert.
    **DIE REGEL BLEIBT WAHR, IHR BELEG IST ZU STARK:** Der Wert geht beim Projektwechsel
    still verloren — aber nicht, weil der Knopf gesperrt wäre, sondern weil **alle drei
    Warnungen ausbleiben**: der Text "Ungespeicherte Änderungen", der `beforeunload`-Wächter
    (er kehrt bei `!dirty` sofort zurück) und der `confirm`-Riegel in `handleSwitch`. Eine
    mildere Lesart von "inaktiv" — neutral gefärbt, ohne Punkt im Label — trüge ebenfalls;
    sie steht dort aber nicht.
    **WARUM NICHT JETZT KORRIGIERT:** Diese Runde ist eine Doku-Runde und fasst keine
    Produktivdatei an. Es ist der Fall der Regel "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR
    BELEG FALSCH WIRD" (docs/immer-beachten.md) — dort mit der Auflage, den Beleg zu
    RICHTIGSTELLEN und nicht zu stempeln, sobald jemand die Stelle ohnehin öffnet.
    TRIGGER: Scheibe 2 fasst `settingsEqual` ohnehin an — dort wird der Beleg im selben Zug
    korrigiert.
    **DIE GRENZE DIESES TRIGGERS, UND SIE GEHÖRT DAZU, SONST LIEGT DER EINTRAG STILL:**
    **Er ist nicht sicher.** Festlegung (1) des Zuschnitts der Scheibe 2 ist gerade so
    gewählt, dass `settingsEqual` **KEINE Änderung braucht** — beide Slots existieren und
    werden bereits verglichen. Ob der Bau-Plan die Datei dennoch öffnet (etwa für den
    Kommentar am Typ, der die zweite Kennungsform heute allein LinkedIn zuschreibt), ist am
    Zuschnitt **nicht entscheidbar**.
    **ZWEITER TRIGGER, damit der Eintrag nicht an einer unsicheren Bedingung hängt:** die
    nächste Runde, die `src/lib/settings.ts` oder den Dirty-Pfad ohnehin öffnet.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG dazu, wie der Beleg zu lauten hat.

    **NACHTRAG 2026-08-31 — DER ERSTE TRIGGER IST EINGETRETEN UND DER EINTRAG IST
    ERLEDIGT.** Scheibe 2 hat `src/lib/settings.ts` geöffnet, und der Beleg ist im selben
    Zug korrigiert worden: Der Kommentar über `settingsEqual` behauptete, der
    Speichern-Knopf bleibe inaktiv. **DIE FUNKTION SELBST IST NICHT ANGEFASST WORDEN** —
    Festlegung (1) ist gerade so gewählt, dass sie unverändert trägt.
    **DER EINTRAG BLEIBT STEHEN, WEIL ER DIE MESSUNG TRÄGT:** dass `dirty` nicht im
    `disabled` steht und der Verlust an den drei ausbleibenden Warnungen hängt. Die
    Unterscheidung stellt sich bei der nächsten Dirty-Frage wieder, und dann ist der
    Unterschied zwischen "gemessen" und "nie geprüft" die ganze Auskunft.

28. **DER SCHRÄGSTRICH FÄLLT NICHT — UND DAS IST KONFORM, KEIN DEFEKT.**
    **GEMESSEN LIVE (OWNER, 2026-08-31):** Ein `/` im Kundennummer-Feld bleibt stehen.
    Festlegung (6) sagt "Bindestriche und Leerraum, SONST NICHTS", und Festlegung (5)
    prüft keine Form — beides greift hier genau so, wie es dasteht.
    **DIE UNTERSCHEIDUNG, DIE DEN FILTER RECHTFERTIGT UND DEN SCHRÄGSTRICH AUSSCHLIESST:**
    Bindestriche fallen, **WEIL Google Ads Kundennummern MIT Bindestrichen ANZEIGT** — der
    Betreiber schreibt ab, was er sieht, und die Umformung heilt ein KOPIER-Artefakt. Für
    Schrägstriche gibt es keine solche Grundlage; sie wären ein TIPPFEHLER.
    **DEN FILTER "ZU VERVOLLSTÄNDIGEN" HIESSE, AUF EINER UNGEMESSENEN ACHSE ZU RATEN** —
    genau das, wogegen Festlegung (5) argumentiert. **Der Eintrag steht hier, damit die
    nächste Runde ihn nicht als Lücke aufräumt.**
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine gemessene Anzeigekonvention des Anbieters, die ein ANDERES Trennzeichen
    führt.

29. **EINE GRENZE AM ZEICHENVORRAT DER NORMALISIERUNG.**
    `[-\s]` trifft den **ASCII-Bindestrich**; `\s` deckt auch das **geschützte
    Leerzeichen** ab. **EIN GEDANKENSTRICH AUS EINER FREMDEN QUELLE FÄLLT NICHT** — weder
    Halbgeviert- noch Geviertstrich sind ASCII-Bindestriche.
    **OB DAS JE VORKOMMT, IST UNGEMESSEN.** Als GRENZE notiert und nicht gebaut: Ein
    breiterer Zeichenvorrat wäre dieselbe Ratearbeit wie beim Schrägstrich oben.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: ein beobachteter Fall — ein Betreiber, dessen Kundennummer nach dem Eintragen
    einen Strich behält.

30. **DER `never`-KOMMENTAR IN `TargetCard.test.tsx` IST ÜBERHOLT — UND WAR ES SCHON VOR
    DIESER RUNDE.**
    Er sagt, im `else`-Zweig von "JEDES Ziel" verenge TypeScript `target` auf `never`,
    "seit 11.1f deckt sich diese Union mit `TrackingTarget`".
    **GEMESSEN am Repo (CC, 2026-08-31):** Seit Scheibe 3 hat `TARGETS_WITH_ADAPTER` VIER
    Mitglieder und `TRACKING_TARGETS` FÜNF; der Zweig verengt auf `'google'`, nicht auf
    `never`. **Der Satz war also schon vor Scheibe 2 falsch** — diese Runde hat ihn nur
    sichtbar gemacht, weil sie den Nachbarzweig umgeschrieben hat.
    **ES IST EINE TATSACHENBEHAUPTUNG ÜBER DEN COMPILER, KEINE ZUSAGE DES TESTS** — der
    Lauf misst unverändert das Richtige. Deshalb nicht in derselben Runde korrigiert: Eine
    Kommentar-Sachkorrektur gehört nicht in den Diff eines Baus.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die `src/components/TargetCard.test.tsx` ohnehin öffnet.

31. **DAS `aria-label`-MUSTER AN DER EREIGNIS-ACHSE IST DATEN, KEIN MECHANISMUS.**
    **DER BEFUND:** Mit zwei Zielen auf derselben Ereignisliste tragen zwei Eingabefelder
    denselben zugänglichen Namen ("Lead") und schreiben in VERSCHIEDENE Ziel-Slots — die
    Lage aus "ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
    OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM" (docs/immer-beachten.md). Aufgelöst ist sie
    durch ein ziel-präfixiertes `aria-label`, nach der Hausform der Karten.
    **EIN DRITTES ZIEL AUF DIESER ACHSE ERBT DAS MUSTER NICHT VON SELBST.** Der Ausdruck
    baut den Namen aus `TARGET_CARDS[…].name` und wächst damit mit — **aber nur, solange
    die Namen unterscheidbar bleiben.** Zwei Ziele mit gleichem Kartennamen erzeugten
    dieselbe Mehrdeutigkeit erneut, und **kein Test hielte das** (der bestehende prüft
    genau zwei benannte Felder).
    **GEMELDET, DAMIT ES NICHT ALS GELÖST GILT.** Nicht gebaut, keine Empfehlung.
    TRIGGER: ein drittes Ziel mit Ereignis-Achse, ODER zwei Ziele mit gleichlautendem
    Kartennamen.

32. **VERMERK AN VORRATS-EINTRAG 20 — DIE URSACHE, NICHT DIE ZAHL.**
    Jener Eintrag hält fest, dass eine Mutations-Vorhersage zu eng war, und ordnet den Fall
    in die Reihe der Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN"
    ein. **MIT SCHEIBE 2 SIND ZWEI WEITERE FÄLLE AUFGETRETEN, BEIDE IN DERSELBEN RICHTUNG**
    (zu eng), beide als DECKUNG und nicht als Kaskade geprüft — die Einzelheiten stehen in
    VERMERK 9 und werden hier nicht verdoppelt.
    **HIER STEHT KEINE FALLZAHL, UND DAS IST ABSICHT:** Eintrag 20 führt bewusst keine, die
    Regel selbst führt eine datierte, und eine dritte Zahl daneben würde bei jedem Zuwachs
    neu falsch — dieselbe Bauform, die in dieser Datei mehrfach protokolliert
    kaputtgegangen ist.
    **WAS NEU IST UND DEN VERMERK RECHTFERTIGT: DIE URSACHE IST ERSTMALS BENENNBAR.** Sie
    ist nicht Unachtsamkeit, sondern eine übernommene Vorhersage über einen INZWISCHEN
    GEWACHSENEN Testbestand. Der Hebungs-Kandidat dazu steht unten.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: derselbe wie bei Eintrag 20 — die nächste Hebung an docs/immer-beachten.md,
    die jene Regel ohnehin berührt.

33. **DAS INSTRUMENT ZUM AUFFINDEN EINES NUL-BYTES IST EIN ANDERES ALS DAS ZUM SUCHEN
    DARIN — UND DIE EINE HÄLFTE DIESES EINTRAGS STEHT SCHON IN docs/immer-beachten.md.**
    **DIE ERSTE HÄLFTE IST BESTÄTIGUNG, NICHT BEFUND, UND DAS STEHT ZUERST:** Dass `grep`
    OHNE `-a` bei einer Datei mit NUL-Byte "Binary file … matches" meldet **STATT** der
    Trefferzeilen — und die Datei damit still aus jeder Achse fällt —, steht bereits in
    docs/immer-beachten.md, in der Regel "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG
    STILL DAS CR", Absatz "DIE GEGENRICHTUNG GEHÖRT DAZU", dort mit derselben Fundstelle
    (`src/lib/mappings.ts`) und GEMESSEN am 2026-08-13. **ERNEUT GEMESSEN (CC, 2026-09-01):**
    Die Datei trägt **genau ein** NUL-Byte (`tr -dc '\000' < … | wc -c` → 1); `grep -na` findet
    darin `isValidRedirectUrl` in Zeile 44, `grep -n` meldet stattdessen die Binärzeile.
    **DIE ZWEITE HÄLFTE IST NEU UND IST DER EIGENTLICHE INHALT DIESES EINTRAGS: DAS
    NAHELIEGENDE SUCHINSTRUMENT FINDET DIE DATEI GAR NICHT.** Ein Lauf über `src/` mit
    `grep -qP '\x00'` je Datei lieferte **NULL** Treffer; derselbe Lauf mit
    `tr -dc '\000' | wc -c` fand `src/lib/mappings.ts`. GEMESSEN (CC, 2026-09-01), beide
    Läufe im selben Durchgang, derselbe Suchraum.
    **WARUM DAS TEUER IST:** Die Abwesenheit war vom WERKZEUG erzeugt, nicht vom Gegenstand —
    genau die Klasse, die docs/immer-beachten.md als "EINE ABWESENHEIT KANN VOM WERKZEUG
    ERZEUGT SEIN, NICHT VOM GEGENSTAND" führt. Ohne den zweiten Griff wäre "im Repo liegt kein
    NUL-Byte" als Befund protokolliert worden, **mit benannter Reichweite, sauber ausgewiesen
    und trotzdem falsch**.
    **DER VORSCHLAG — UND ER IST EIN VORSCHLAG, KEINE ENTSCHEIDUNG:** Ein **ABSATZ** an der
    bestehenden Werkzeug-Regel, nicht ein eigener. Zwei Gründe: Die erste Hälfte steht dort
    schon und würde als eigener Eintrag ein zweites Mal behauptet; und der neue Teil ist die
    **Vervollständigung** desselben Befundes — er sagt, WOMIT man die Datei findet, die jener
    Absatz beschreibt.
    **DIE GEGENREDE GEHÖRT DAZU:** Die 11.8er-Regel oben ist die sachlich nähere (sie handelt
    von der werkzeug-erzeugten ABWESENHEIT), und ein Absatz an der sed-Regel legte den Befund
    an die entferntere. **NICHT ENTSCHIEDEN**, an welcher der beiden er landet.
    **DER BEZUG ZU HEBUNGS-KANDIDAT 6 GEHÖRT MIT:** Jener stellt dieselbe Ablage-Frage für die
    Byte-Kontrolle (`tr` gegen `grep -c $'\r'`) und lässt sie ebenfalls offen. **Wer einen von
    beiden hebt, liest den anderen mit** — es ist dieselbe Werkzeug-Achse, und zwei getrennt
    getroffene Entscheidungen darüber liefen auseinander.
    GEMELDET 2026-09-01, NICHT GEBAUT.

34. **EIN ZEILENWEISER KOMMENTAR-FILTER IST BEI MEHRZEILIGEN BLÖCKEN UNTAUGLICH.**
    Er erkennt einen Kommentar an seinem **ZEILENANFANG**. Die Fortsetzungszeilen eines
    `{/* … */}`-Blocks beginnen mit **Fliesstext** und zählen deshalb als Code — ein Vergleich
    zweier Fassungen "ohne Kommentare" meldet dann eine Code-Änderung, die es nicht gibt, oder
    verdeckt eine, die es gibt.
    **DER ERSATZ:** beide Fassungen **OHNE Kommentare** vergleichen — also den Kommentar
    entfernen statt die Zeile zu übergehen —, **mit einer künstlichen Code-Änderung als
    POSITIVKONTROLLE**. Ohne die Positivkontrolle ist ein leerer Vergleich nicht von einem
    kaputten Vergleich zu unterscheiden; es ist der Fall der Lektion (d) an "MUTATIONSPROBEN
    UND LIVE-TEST-INSTRUMENTE" (docs/immer-beachten.md), nur am Diff statt am Test.
    **WARUM DER EINTRAG ÜBERHAUPT NÖTIG IST — DAS IST SEIN GANZER ZWECK:** Der Befund ist
    bisher **NUR in der Commit-Botschaft von `3efa01b` verwahrt**. Eine Commit-Botschaft wird
    nicht gelesen, wenn jemand das nächste Mal zwei Fassungen vergleicht; sie ist ein
    Zeitdokument und kein Nachschlagewerk. **Ohne diesen Eintrag wird dasselbe Instrument
    wieder gebaut und liefert wieder eine falsche Auskunft.**
    GEMELDET 2026-09-01, NICHT GEBAUT. KEINE EMPFEHLUNG, ob daraus eine Regel wird.

35. **DER KOMMENTARKOPF VON `schedulePersist` DECKT DEN CODE NICHT.**
    **GEMESSEN am Code (CC, 2026-09-01):** Der Kopf von `schedulePersist`
    (src/lib/capi/ingest.ts) sagt, sein `try/catch` sei "die zweite Schicht, falls die
    Registrierung/der Aufruf selbst wirft". **Am Code liegt das `try` INNERHALB des an
    `after()` übergebenen Callbacks**; der Aufruf `after(...)` selbst steht **ungeschützt**, und
    `handleIngest` trägt an dieser Stelle kein umschliessendes `try`. Wirft die Registrierung,
    verlässt der Wurf die Funktion.
    **KEIN TEST DECKT DAS:** Alle sechs `ingest.*.test.ts` mocken `next/server` mit einem
    `after`, das die Callbacks nur einsammelt — **die Registrierung kann dort gar nicht
    werfen.** GEMESSEN am Repo (CC, 2026-09-01).
    **DIES IST EINE AUSSAGE ÜBER DEN KOMMENTAR, NICHT ÜBER DIE EINTRITTSWAHRSCHEINLICHKEIT.**
    Ob der Fall je eintritt, ist nicht erhoben und wird hier nicht behauptet. Es ist der Fall
    der Regel "EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT" (docs/immer-beachten.md):
    Die Selbstbeschreibung ist zu weit, und sie lädt dazu ein, eine Achse für gedeckt zu halten
    und keinen Test dafür zu schreiben.
    **KEIN VORSCHLAG** — weder eine Umschliessung noch eine Kommentar-Korrektur ist hier
    vorgeschlagen.
    GEMELDET 2026-09-01, NICHT GEBAUT.

    **VERMERK 2026-09-03 — DIESER EINTRAG WIRD IN SCHEIBE 1b-2a AUFGENOMMEN. DER TEXT
    DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    Der Zuschnitt steht (s. den Abschnitt "Die Rettung am Beacon — Scheibe 1b-2a des
    Schritts 1b-2 der Scheibe 1b") und führt ihn dort als **DRITTES STÜCK** — sowohl der
    Schutz der Registrierung als auch die Richtigstellung des Kommentarkopfes.
    **DER GRUND FÜR DIE AUFNAHME IST NICHT, DASS DER POSTEN REIF WÄRE, SONDERN WO ER
    LIEGT:** 1b-2a hängt eine **ZWEITE** `after()`-Registrierung an dieselbe Stelle. **Eine
    Scheibe, die eine bekannte Lücke in genau dem Mechanismus stehen lässt, den sie gerade
    benutzt, hat den Scope-Schutz gegen die Sache gewendet, die er schützen soll.**
    **WAS DAMIT ZUR AUFLAGE WIRD:** Der Schutz gilt der NEUEN Registrierung **UND** der
    bestehenden in `schedulePersist` — eine Scheibe, die nur ihre eigene absichert, liesse
    die ältere Lücke als die unauffälligere zurück.
    **DER EINTRAG WIRD NICHT ABGEHAKT.** Er ist gemeldet und aufgenommen, nicht gebaut; sein
    Satz "KEIN VORSCHLAG" bleibt für den Zeitraum bis zum Bau richtig.
    **WAS SEIN "Ob der Fall je eintritt, ist nicht erhoben" ANGEHT:** Es bleibt unerhoben,
    und die Aufnahme ändert daran nichts. Gebaut wird gegen die **fehlende Deckung**, nicht
    gegen eine beobachtete Häufigkeit.
    PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Der Code-Befund ist der
    unveränderte aus dem Eintrag oben, am 2026-09-03 erneut am Code bestätigt (CC).

    **ZWEITER VERMERK 2026-09-03 — VOLLZOGEN MIT SCHEIBE 1b-2a. DER TEXT DARÜBER BLEIBT
    ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **WAS GEBAUT IST:** `scheduleAfter` (src/lib/capi/ingest.ts) umschliesst den
    `after()`-Aufruf und fängt den Wurf bei der **REGISTRIERUNG** — für die NEUE
    Registrierung der Scheibe **UND** für die bestehende in `schedulePersist`. Der `catch`
    **loggt** über `errorName`; ein Wurf verschwindet nicht. **DER KOMMENTARKOPF VON
    `schedulePersist` IST IM SELBEN ZUG RICHTIGGESTELLT** und trägt den Satz, dass er
    diese Deckung behauptet hat, ohne sie zu haben. Bau-Commit `d57d50c`, s. VERMERK 12,
    Abschnitt (a).
    **DER BEFUND DIESES EINTRAGS IST DAMIT NICHT NUR BEHOBEN, SONDERN GEMESSEN:** Die
    Pflicht-Mutation "Schutz der Registrierung ausbauen" hat **genau EINEN** Lauf fallen
    lassen — **H9** in `ingest.refresh.test.ts`, 1 von 1487 — und **alle sechs bestehenden
    `ingest.*.test.ts` blieben grün.** Das ist die Aussage dieses Eintrags ("KEIN TEST
    DECKT DAS", weil die sammelnde `after`-Attrappe nicht werfen kann) **gemessen statt
    hergeleitet**; H9 trägt dafür eine eigene, umschaltbare Attrappe, die wirft.
    **DER EINTRAG WIRD NICHT ABGEHAKT, UND DAS IST DIE BAUFORM DIESER DATEI, KEINE
    UNENTSCHLOSSENHEIT:** Der Vorrat kennt kein Abhaken. Er kennt einen **eigenen
    datierten Absatz UNTER dem unveränderten Eintrag** — so bei Eintrag 15 ("ERLEDIGT AM
    2026-08-29 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN DER MESSUNG") und bei
    Eintrag 7 ("ERLEDIGT AM 2026-08-31"). **Diese Runde folgt ihr.**
    **WARUM DER EINTRAG STEHEN BLEIBT — ZWEI GRÜNDE, und der zweite wiegt schwerer:**
    (1) Seine **MESSUNG** — dass das `try` IM Callback liegt und alle sechs Attrappen die
    Registrierung gar nicht werfen lassen können — ist der Beleg, auf dem der Schutz
    überhaupt ruht. (2) Seine **BLINDHEITS-AUSSAGE über die Attrappen** ist der MASSSTAB
    für jede künftige Frage an dieser Achse: Ein Mechanismus, den alle Tests durch eine
    sammelnde Attrappe ersetzen, ist an ihnen nicht messbar. **Ein gelöschter Eintrag
    nähme beide mit.**
    **WAS SEIN SATZ "KEIN VORSCHLAG" ANGEHT:** Er war für den Zeitraum bis zum Bau
    richtig und ist mit dem Bau abgelaufen — **nicht falsch geworden, sondern
    gegenstandslos.** Und sein "Ob der Fall je eintritt, ist nicht erhoben" gilt
    **unverändert**: Gebaut ist gegen die fehlende Deckung, nicht gegen eine beobachtete
    Häufigkeit; der Live-Test hat **keinen** Registrierungs-Wurf erzeugt.
    PROVENIENZ: der Bau GEMESSEN am Repo (CC, 2026-09-03), die Mutationsprobe am Lauf
    desselben Tages. Dass die Bauform dieser Datei kein Abhaken vorsieht, ist GEMESSEN am
    Dateitext (CC, 2026-09-03; Einträge 7 und 15).

36. **DIE ADAPTER REICHEN EINE KLICK-KENNUNG HEUTE SCHON DURCH — AUF EINER ANDEREN ACHSE ALS
    DER GEMESSENEN.**
    **GEMESSEN am Code (CC, 2026-09-01):** `eventSourceUrl` wird im Beacon-Bau
    (`buildCapiBeaconStatement`, src/lib/tracking/meta.ts) als **`location.href`** gesetzt —
    also die vollständige Adresse **einschliesslich Query-String**. `handleIngest` reicht den
    Rumpf unverändert an `dispatchForward` weiter, und **drei der vier Adapter lesen das Feld**:
    `forwardToMeta` als `event_source_url`, `forwardToPinterest` ebenso,
    `forwardToTiktok` als `page.url`. `forwardToLinkedin` liest es nicht.
    **FOLGE:** Ein `gclid` im Query-String einer gehosteten Kundenseite **reist heute schon
    mit** — an meta, pinterest und tiktok —, **UNBENANNT**, als Bestandteil einer Zeichenkette.
    Das gilt für **jeden** Klick-Parameter eines Werbenetzwerks, nicht nur für Googles.
    **DIE ABGRENZUNG GEHÖRT DAZU UND IST KEIN EINWAND GEGEN DEN BESTEHENDEN BEFUND:** Der
    offene Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (docs/offene-punkte.md,
    Block vom 2026-08-28, Punkt (a)) sagt "KEIN ADAPTER NIMMT HEUTE EINE KLICK-KENNUNG
    ENTGEGEN ODER REICHT EINE DURCH". **Das ist auf der Achse BENANNTER Kennungsfelder
    gemessen** — die dortige Achse nennt `gclid · gbraid · wbraid · fbclid · _fbc · ttclid ·
    li_fat_id — **und dort ist es richtig**: null Treffer in allen vier Adaptern, heute erneut
    bestätigt. **DIESER EINTRAG NENNT EINE ZWEITE ACHSE, KEINE KORREKTUR DER ERSTEN.**
    **OB DIE UNBENANNTE DURCHLEITUNG UNTER DIE DRITTE DATENKLASSE FÄLLT, IST HIER NICHT
    ENTSCHIEDEN.** Es ist eine **OWNER-Frage**, und sie wird in diesem Eintrag ausdrücklich
    nicht beantwortet und nicht vorbereitet.
    **WAS HEUTE GILT UND GEPRÜFT IST — und es ist der Teil, der die Auflage TRANSIT-ONLY auf
    ihren beiden anderen Hälften einlöst:** `persistEvent` (src/lib/analytics/persist.ts)
    schreibt die Kennung **nicht** — es schreibt genau fünf Werte, und keiner trägt sie. Und
    **keiner der 48 console-Aufrufe** im Produktivcode führt sie (GEMESSEN, CC, 2026-08-28,
    im offenen Punkt mit Achse und Positivkontrolle protokolliert; in dieser Runde **nicht**
    neu gezählt).
    GEMELDET 2026-09-01, NICHT GEBAUT. KEINE EMPFEHLUNG.

37. **DER `else`-ZWEIG IN `TargetCard.test.tsx` HAT SEIT SCHEIBE 4 KEINEN FALL MEHR — UND
    DERSELBE GRÜNE LAUF IST DURCH EINEN ANDEREN ZWEIG GRÜN.**
    **GEMESSEN am Repo (CC, 2026-09-01):** Der Lauf "JEDES Ziel: Daten-Seite und Oberflaeche
    sagen dasselbe ueber die Auslieferung" (`src/components/TargetCard.test.tsx`) verzweigt
    dreifach über `hasAdapter(target)` und `card.publicLabel !== undefined`. Seit Scheibe 4
    hat `TARGETS_WITH_ADAPTER` **FÜNF** Mitglieder und `TRACKING_TARGETS` ebenfalls fünf —
    **kein bekanntes Ziel ist mehr ohne Adapter.** Die Zuordnung heute: meta, pinterest,
    tiktok und **google** laufen in den ERSTEN Zweig (Adapter UND öffentliches Feld),
    linkedin in den ZWEITEN (Adapter, kein Feld), **in den `else`-Zweig KEINES.**
    **WAS DAMIT STILL AUFGEHÖRT HAT ZU MESSEN:** Jener Zweig trägt die Zusicherung aus der
    Auflage der Scheibe 11.1a — neben dem Folgenlosigkeits-Hinweis darf keine zweite Meldung
    stehen, die als Grund eine fehlende Kennung nennt — und benennt seine eigene
    Rot-Bedingung: "WIRD ROT, WENN: jemand den hasAdapter-Term in TargetCard entfernt."
    **DIESE BEDINGUNG IST HEUTE UNERFÜLLBAR.** Der Zweig läuft nie, also wird er nie rot.
    **ES IST DIE FEHLERKLASSE "EIN WÄCHTER OHNE GEGENSTAND GEHT AB DA IMMER AUF"**
    (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL",
    Weise (1)) — **und sie ist hier STILL:** Anders als bei einer Schleife, die kein `it()`
    erzeugt, läuft der Test weiter und bleibt grün; nichts zeigt an, dass eine Zusicherung
    aufgehört hat zu greifen.
    **WARUM ES NIEMANDEM AUFGEFALLEN IST — GEMESSEN am Commit:** Der Transport-Commit
    `26caa38` hat `src/components/TargetCard.test.tsx` **nicht angefasst** (neun Dateien, die
    Datei ist nicht darunter). **DIE GLEICHARTIGE STELLE IN `fan-out.test.ts` IST BEHANDELT
    WORDEN** — dort steht der Befund ausgeschrieben im Kommentar, und `W-REST` tritt an die
    Stelle des toten Zweigs. **Der Unterschied zwischen den beiden Stellen ist allein, dass
    die eine im Diff lag und die andere nicht.**
    **DAZU, UND ES IST EINE SELBSTHEILUNG:** **Vorrats-Eintrag 30** hält fest, der
    `never`-Kommentar in derselben Datei sei überholt — er behauptet, TypeScript verenge
    `target` im `else`-Zweig auf `never`, was seit Scheibe 3 (vier gegen fünf Mitglieder)
    falsch war. **MIT SCHEIBE 4 IST DIE AUSSAGE WIEDER WAHR:** `hasAdapter` ist ein
    Typprädikat (`target is TargetWithAdapter`), und die beiden Unionen decken sich wieder.
    **SEINE DATIERUNG HEILT SICH NICHT MIT:** Der Kommentar sagt "seit 11.1f", und das war
    zwischen Scheibe 3 und Scheibe 4 nicht durchgehend wahr. **Die Aussage stimmt, ihre
    Herkunftsangabe nicht.**
    **KEINE EMPFEHLUNG**, weder den Zweig zu entfernen noch ihn durch einen erfundenen
    Zielwert erreichbar zu machen. **Der Zweig ist die Zusicherung für das nächste Ziel ohne
    Empfänger** — dieselbe Erwägung, aus der er in `fan-out.test.ts` stehen geblieben ist.
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: die nächste Runde, die `src/components/TargetCard.test.tsx` ohnehin öffnet —
    dieselbe wie bei Eintrag 30, und beides gehört zusammen erledigt.

38. **DER KOPF DES GOOGLE-ABSCHNITTS IN docs/ziel-befunde.md SAGT "NICHTS IST GEMESSEN" — DAS
    IST SEIT MESSUNG A ÜBERHOLT UND WAR ES SCHON VOR DIESER SCHEIBE.**
    **DER WORTLAUT, GEMESSEN am Dateitext (CC, 2026-09-01):** "**HERKUNFT — ALLES IN DIESEM
    ABSCHNITT IST GELESEN, NICHTS IST GEMESSEN (2026-08-20):** Es ist KEIN Aufruf gegen eine
    Google-Schnittstelle gefahren worden — kein Token beschafft, kein Endpunkt angesprochen,
    keine Fehlerform erhoben."
    **WAS DAGEGEN STEHT:** Vier Messreihen gegen zwei Google-Endpunkte liegen inzwischen IM
    SELBEN ABSCHNITT — Messung A (Teile (bj) bis (bm)), Messung B1 ((bn) bis (bu)), Messung C
    ((bv) bis (bz)) und Messung D ((ca)). Jede von ihnen hat ein Token beschafft, einen
    Endpunkt angesprochen und Fehlerformen erhoben.
    **DIE AUSSAGE IST DATIERT UND DAMIT ALT, NICHT FALSCH** — sie trägt "(2026-08-20)" in
    ihrem eigenen Text und beschreibt den Stand jenes Tages zutreffend. Es ist dieselbe
    Bauform wie bei den Stückzahlen dieser Datei: **wer sie ohne ihr Datum liest, liest sie
    falsch; wer sie überschreibt, nimmt eine Messung mit.**
    **WAS SIE TROTZDEM GEFÄHRLICH MACHT:** Sie steht im **KOPF** des Abschnitts, also an der
    Stelle, die jeder zuerst liest, und sie ist als **HERKUNFT** ausgezeichnet — also als
    Aussage über den ganzen Abschnitt. Ein Leser, der den Pflicht-Stopp befolgt und die Datei
    vor einem Zuschnitt öffnet, nimmt aus dem ersten Absatz mit, dass hier nichts gemessen
    sei, und behandelt (ca) als Doku-Lesung.
    **NICHT GEÄNDERT, UND DAS IST SCOPE UND KEIN URTEIL:** docs/ziel-befunde.md liegt
    ausserhalb des Scopes dieser Runde. **KEINE EMPFEHLUNG**, ob der Kopf einen Vorbehalt
    daneben bekommt, ob er ersetzt wird oder ob es bei der Datierung bleibt.
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: die nächste Runde, die docs/ziel-befunde.md ohnehin öffnet — dieselbe wie bei
    Vorrats-Eintrag 12 und Hebungs-Kandidat 4, und alle drei gehören zusammen erledigt.

39. **CONVERSIONS AUF FOLGESEITEN SIND FÜR GOOGLE HEUTE NICHT MESSBAR — UND DIE NAHELIEGENDE
    ABHILFE IST DURCH TRANSIT-ONLY VERSPERRT.**
    **GEMESSEN LIVE (OWNER, 2026-09-01, Schritt 3 des Live-Tests der Scheibe 4):** Wird die
    gehostete Seite mit einer Klick-Kennung im Query-String aufgerufen und die Conversion erst
    auf einer FOLGESEITE ausgelöst, trägt `location.href` die Klick-Kennung nicht mehr,
    `extractGoogleClickIds` findet nichts, `buildGoogleEvent` verwirft mit `no_click_id`, und
    **es entsteht kein Ereignis.**
    **SACHKORREKTUR 2026-09-02 — ERSETZT, NICHT GESTEMPELT.** Hier stand "über eine echte
    Anzeige aufgerufen". Der Query-String war **von Hand gesetzt** (OWNER-ANGABE 2026-09-02;
    Volltext in VERMERK 10, Abschnitt (b)). **DER BEFUND IST DAVON UNBERÜHRT UND WIRD NICHT
    SCHWÄCHER:** Dass `location.href` nach einem Seitenwechsel den Query-String nicht mehr
    trägt, ist eine **Eigenschaft des Browsers** — sie hängt nicht daran, wer ihn geschrieben
    hat. Korrigiert ist die Herkunft der Eingabe, nicht die Beobachtung.
    **DAS IST KEIN DEFEKT DER SCHEIBE 4**, sondern die Folge der gewählten Gestalt: Der
    OFFLINE CONVERSION IMPORT ruht auf der Klick-Kennung, und "KEINE KLICK-KENNUNG, KEINE
    CONVERSION" ist als Eigenschaft der Gestalt schon in docs/roadmap.md, Eintrag 11.2
    festgehalten. **NEU IST NICHT DIE EIGENSCHAFT, SONDERN IHRE REICHWEITE:** Sie trifft nicht
    nur organischen Traffic und Direktaufrufe, sondern **jeden mehrschrittigen Funnel** — und
    das ist der Regelfall eines Media Buyers, nicht der Sonderfall.
    **DIE ABHILFE IST BENANNT UND VERSPERRT, und dieser Satz ist der eigentliche Inhalt des
    Eintrags:** Eine Kennung über Seitengrenzen zu tragen hiesse, sie zu **SPEICHERN** — in
    einem Cookie, im `sessionStorage`, in einer Serverzeile. **DIE AUFLAGE TRANSIT-ONLY ERLAUBT
    KEINE ABLAGE** (OWNER-ENTSCHEIDUNG 2026-08-28, dritte Datenklasse: "niemals in die
    Datenbank, niemals in ein Log, kein Hashen"; Fundstelle docs/offene-punkte.md,
    "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Block vom 2026-08-28).
    **WER DEN FUNNEL MESSBAR MACHEN WILL, ÖFFNET ALSO DIE DATENKLASSEN-FRAGE ERNEUT** — es ist
    keine Bau-Entscheidung, sondern eine OWNER-Entscheidung über die Reichweite von
    TRANSIT-ONLY. **HIER WIRD SIE NICHT VORBEREITET UND NICHT EMPFOHLEN.**
    **DER BEZUG ZU PHASE 17 GEHÖRT DAZU:** "Phase 17 — Multi-Page-Funnels" steht offen in der
    Roadmap. **Diese Scheibe hat gemessen, dass die beiden Vorhaben kollidieren** — ein
    Multi-Page-Funnel ohne getragene Klick-Kennung erzeugt für Google nichts, und mit ihr
    verlangt er eine Ablage, die heute verboten ist. **Wer Phase 17 zuschneidet, findet die
    Frage hier vor, statt sie neu zu entdecken.**
    **AUSDRÜCKLICH NICHT GESAGT:** dass TRANSIT-ONLY zu eng ist, dass ein Cookie zulässig
    wäre, oder dass ein anderes Ziel dasselbe Problem hätte. **KEINE EMPFEHLUNG.**
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: der Zuschnitt der Phase 17, ODER eine erneute Owner-Befassung mit der dritten
    Datenklasse — je nachdem, was zuerst eintritt.

40. **EINE MESSUNG WURDE MIT AUSGELASSENEM SCHLÜSSELWERT ABGELEGT — UND DER AUSGELASSENE WERT
    WAR DIE EINZIGE EINGABE DES DIAGNOSE-INSTRUMENTS.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-02), zwei unabhängige Suchläufe:** Der
    Erfolgsrumpf des 200er-Aufrufs der Messung D steht in docs/ziel-befunde.md, Teil (ca)/(a),
    als `{ "requestId": "…" }` — **mit drei Punkten an der Stelle des Wertes.** Eine Suche über
    den gesamten Google-Abschnitt nach UUID-artigen Zeichenfolgen findet dort **genau zwei**,
    und **beide sind Beispiele aus der Anbieter-Doku** ((o)/G5), keine eigenen Messwerte. Eine
    zweite, repo-weite Suche über das **gesamte Arbeitsverzeichnis rekursiv, ohne
    Dateityp-Filter**, nach der tatsächlichen Kennung liefert **null Treffer**.
    **Positivkontrolle:** Dieselbe UUID-Achse hat die zwei Doku-Beispiele erreicht, ist also
    nicht leer gelaufen.
    **WARUM DAS ZÄHLT, UND ES IST NICHT DIE ÜBLICHE GEHEIMNIS-FRAGE:** Der Statusabruf über
    `requestStatus:retrieve` nimmt **GENAU EINE** Eingabe — die `requestId` ((x)/G5). **Ohne
    sie ist der einzige Diagnostik-Kanal des Anbieters nicht adressierbar.** Die Doku macht
    daraus selbst eine Auflage: "Record the requestId returned" und "Capture and collect the
    request_id from each … response" ((o)/G5, GELESEN 2026-08-24). Der Wert war am 2026-09-02
    nur noch da, weil der Owner ihn in seinem eigenen Verlauf hatte; **aus dem Repo wäre er
    nicht mehr zu beschaffen gewesen.**
    **EINE `requestId` IST KEIN GEHEIMNIS.** Sie ist ein Vorgangs-Bezeichner ohne
    Zugriffswirkung; die Auslassung war keine Schwärzung, sondern eine Kürzung.
    **DER BEFUND GILT DEM ABLAGE-VERFAHREN, NICHT DIESER EINEN STELLE — und das ist der ganze
    Grund für den Eintrag:** Eine Kürzung mit "…" sieht in einem Protokoll wie Sorgfalt aus.
    Sie ist es dort, wo der Wert ein Geheimnis ist, und sie ist das Gegenteil davon, wo der
    Wert der **einzige Schlüssel zu einer späteren Nachfrage** ist. **Was die beiden Fälle
    trennt, steht heute nirgends.**
    **DIE ABGRENZUNG GEHÖRT ZWINGEND DAZU, SONST WIDERSPRICHT DIESER EINTRAG EINER
    ENTSCHEIDUNG DESSELBEN TAGES.** Am 2026-09-02 sind in docs/ziel-befunde.md, Teil (cb),
    **ZWEI Werte ABSICHTLICH nicht im Klartext abgelegt** worden — die Google-Ads-Kundennummer
    und die Conversion-Type-ID, beide maskiert (ARCHITEKTEN-ENTSCHEIDUNG 2026-09-02). Wer
    diesen Eintrag ohne die Abgrenzung liest, hält das für denselben Fehler.
    **DIE TRENNLINIE IST DIE BESCHAFFBARKEIT, NICHT DIE VERTRAULICHKEIT:**
    · **Eine `requestId` existiert EINMAL UND FLÜCHTIG.** Sie entsteht in einer Antwort, sie
      steht in keiner Oberfläche, und **ist sie einmal nicht aufgeschrieben, ist sie aus KEINER
      Quelle wiederzubeschaffen.** Ihr Verlust kostet das Instrument der nächsten Runde.
    · **Eine Kundennummer steht JEDERZEIT in der Oberfläche des Kontos**, ebenso die
      Conversion-Type-ID. Ihr Fehlen im Repo kostet einen Blick, nicht eine Messung.
    **IN EINEM SATZ: NICHT ABGELEGT WIRD, WAS JEDERZEIT ABLESBAR IST; ABGELEGT WIRD, WAS SONST
    VERSCHWINDET.** Das ist die Regel, die beide Fälle zugleich erklärt — und sie ist etwas
    anderes als "Geheimnisse werden geschwärzt", weil **keiner der drei Werte ein Geheimnis
    ist**.
    **KEINE EMPFEHLUNG** — weder eine Regel noch eine Auflage an künftige Messprotokolle ist
    hier vorgeschlagen, und (ca) ist **nicht** nachträglich befüllt worden.
    GEMELDET 2026-09-02, NICHT GEBAUT.
    PROVENIENZ: die zwei Suchläufe GEMESSEN am Repo (CC, 2026-09-02). Dass der Wert aus dem
    Verlauf des Owners stammt, ist eine **OWNER-ANGABE 2026-09-02**. Die Doku-Auflage ist
    GELESEN (s. (o)/G5).
    TRIGGER: die nächste Messung, deren Antwort einen Bezeichner für eine **spätere** Nachfrage
    trägt.

41. **`INVALID_GCLID` VERDECKT DIE TAG-HYPOTHESE — SIE IST WEDER BESTÄTIGT NOCH WIDERLEGT.**
    **DER VERDACHT VOM 2026-09-01 (OWNER):** Die im Google-Ads-Konto hinterlegte
    Conversion-Aktion könnte **tag-basiert** sein, während Pagesmith **kein Google-Tag
    ausliefert** — die Gestalt-Entscheidung schliesst eines ausdrücklich aus (s. "### (3) Der
    Vorbehalt der Owner-Entscheidung zur Gestalt").
    **WAS MESSUNG E DAZU SAGT — GEMESSEN 2026-09-02 (OWNER), docs/ziel-befunde.md,
    Teil (cb):** **NICHTS.** Die Anfrage vom 2026-09-01 ist mit
    `PROCESSING_ERROR_REASON_INVALID_GCLID` verworfen worden, `errorCounts` trägt **genau
    einen** Eintrag bei **einem** gesendeten Datensatz.
    **DER MECHANISMUS, DER DEN VERDACHT VERDECKT:** Ein Datensatz, dessen Klick-Kennung schon
    verworfen wird, **kommt an einer etwaigen zweiten Prüfung gar nicht erst an**. Ob nach
    einer gültigen Kennung ein ZWEITER Grund käme, ist an dieser Antwort **nicht zu sehen** —
    sie konnte nur einen Grund haben.
    **WER AUS DEM EINEN ZURÜCKGEGEBENEN GRUND SCHLIESST, ES GEBE NUR DIESEN, SCHLIESST AUS
    EINER ANTWORT, DIE NUR EINEN GRUND HABEN KONNTE.** Das ist der Satz, der diesen Eintrag
    trägt, und er ist der Grund, warum er neben Messung E steht statt in ihr aufzugehen: Ein
    erledigt aussehender Verdacht wird nicht wieder aufgenommen.
    **DIE VERBINDUNG ZUR SPERRE, und sie macht den Eintrag unauflösbar-bis-auf-weiteres:**
    Solange auf dem Konto kein echter Anzeigenklick existiert (s. die zweite Sperre in
    "### (1) Der Gegenstand"), **gibt es keine gültige Klick-Kennung**, mit der man die zweite
    Prüfung überhaupt erreichen könnte. **Der Verdacht hängt an derselben Sperre wie der
    Nachweis.**
    **KEINE EMPFEHLUNG**, und ausdrücklich keine Aussage darüber, ob die Conversion-Aktion
    tag-basiert IST — der Zuschnitt der Aktion im Kundenkonto ist **nicht erhoben**.
    GEMELDET 2026-09-02, NICHT GEBAUT.
    PROVENIENZ: Der Fehlergrund GEMESSEN 2026-09-02 (OWNER). Der Verdacht ist eine
    **OWNER-ANGABE 2026-09-01**. Dass der eine den anderen verdeckt, ist eine **FOLGE** aus
    dem Fast-Fail-Verhalten und der Einzahl des `errorCounts`-Eintrags, **keine Messung**.
    TRIGGER: der erste Aufruf mit einer **gültigen** Klick-Kennung — also derselbe wie das
    Fallen der Sperre.

    **ERGÄNZT 2026-09-02 NACH DEM DOKU-LAUF 8 — DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN
    STEHEN UND IST RICHTIG; ER WAR NUR UNVOLLSTÄNDIG.** Zwei Dinge treten hinzu, und das
    zweite ist das schwerere.
    · **DER VERDECKTE ZWEITE GRUND HAT JETZT EINEN ZWEITEN, DOKUMENTIERTEN KANDIDATEN NEBEN
      DER TAG-HYPOTHESE: DIE `UPLOAD_CLICKS`-AUFLAGE.** GELESEN 2026-09-02
      (docs/ziel-befunde.md, Google-Abschnitt, Teil (cc)/(b);
      `/devguides/events/send-events`, Doku-Stand 2026-08-18): "For Google Ads offline
      conversions or enhanced conversions for leads, the productDestinationId must be the ID
      of a Google Ads conversion action with type set to **UPLOAD_CLICKS**."
      **DER EINTRAG NANNTE BISHER NUR EINEN KANDIDATEN.** Es sind zwei, und sie schliessen
      einander nicht aus. **OB DIE SCHNITTSTELLE EINE AKTION FALSCHEN TYPS ÜBERHAUPT ABLEHNT,
      IST UNGEMESSEN** — die Doku sagt "must be", nicht, was bei einem Verstoss geschieht.
    · **DER VERDECKUNGS-MECHANISMUS GREIFT EINE STUFE FRÜHER, ALS DIESER EINTRAG ANNIMMT.**
      Der Text oben sagt, der Datensatz komme "an einer etwaigen zweiten Prüfung gar nicht
      erst an". **Das ist richtig und noch zu schwach:** Unser Fehlergrund ist ein
      **DEKODIER-Fehler**, nicht ein Zuordnungs-Fehler — GELESEN 2026-09-02, Teil (cc)/(a):
      `PROCESSING_ERROR_REASON_INVALID_GCLID` heisst wörtlich "The google click ID could not
      be decoded", während der Zuordnungs-Fehler ein eigener Enum-Wert ist
      (`PROCESSING_ERROR_REASON_INVALID_CLICK`, "The event can't be attributed to a click").
      **EIN DATENSATZ, DESSEN KENNUNG NICHT EINMAL DEKODIERT WERDEN KANN, ERREICHT WEDER DIE
      ZUORDNUNG NOCH EINE PRÜFUNG DER CONVERSION-AKTION.** Verdeckt ist also nicht ein
      zweiter Grund hinter einem ersten, sondern **alles, was hinter der Dekodierung liegt**.
    **WAS SICH DADURCH NICHT ÄNDERT — UND DAS IST DER GRUND, WARUM HIER ERGÄNZT UND NICHT
    ERSETZT WIRD:** Der Eintrag bleibt in seiner Aussage unberührt. Die Tag-Hypothese ist
    weiterhin **weder bestätigt noch widerlegt**, der Satz über die Antwort, die nur einen
    Grund haben konnte, gilt unverändert, und **der TRIGGER bleibt wörtlich stehen**.
    PROVENIENZ: beide Zusätze **GELESEN 2026-09-02** (Doku-Lauf 8, s. Teil (cc)); dass der
    Dekodier-Fehler vor der Zuordnung liegt, ist eine **ABLEITUNG** aus den zwei gelesenen
    Enum-Beschreibungen, **keine Messung**.

    **ERLEDIGT AM 2026-09-07 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN SEINES SATZES ÜBER
    DIE VERDECKUNG.** Bauform wie bei Eintrag 15 und Eintrag 7: ein eigener datierter Absatz
    UNTER dem unveränderten Eintrag, mit Datum, Grund und dem, was ihn eingelöst hat. **Der
    Text darüber bleibt Zeichen für Zeichen stehen, der TRIGGER eingeschlossen.**

    **WAS IHN EINLÖST — GEMESSEN 2026-09-07 (OWNER), abgelesen in der Google-Ads-Oberfläche
    unter Data Manager, Integrationsdetails, Protokolle:** Die Zeile vom **7. Sept. 2026**
    (Nutzung "offline (Upload)", Nutzungstyp Conversion, Vorgang Hinzufügen) steht auf
    **1 Anfrage · 1 Datensatz · Erfolgsquote 100 % · 0 Fehler**. Die Nutzungsübersicht der
    letzten sieben Tage nennt **2 Conversions und 9 Anfragen**.
    **DER KONTRAST IST DER EIGENTLICHE BELEG, nicht die 100 % für sich:** In **derselben
    Tabelle** stehen die Zeilen vom **1., 2. und 3. September** auf **0 %**, mit Fehlern in
    Höhe der Datensätze — das waren die Läufe mit **erfundenen** Kennungen. **Die Tabelle
    zeigt Fehlschläge also an.** Eine Erfolgsquote ohne diesen Nachbarn wäre eine
    Abwesenheits-Behauptung ohne Positivkontrolle; mit ihm ist sie eine Messung.

    **WAS DAMIT BEANTWORTET IST — BEIDE KANDIDATEN DIESES EINTRAGS, in seiner eigenen
    Wortwahl:**
    · **DIE TAG-HYPOTHESE IST GEGENSTANDSLOS.** Eine tag-basierte Conversion-Aktion hätte
      diesen Import nicht mit 100 % und 0 Fehlern angenommen. Der Eintrag hatte sie
      ausdrücklich als "weder bestätigt noch widerlegt" geführt; sie ist jetzt **widerlegt**.
    · **DIE `UPLOAD_CLICKS`-AUFLAGE IST ERFÜLLT.** Die verwendete Conversion-Aktion trägt
      offenbar den verlangten Typ — sonst wäre der Datensatz nicht angenommen worden. Der
      zweite Kandidat, den die Ergänzung vom 2026-09-02 hinzugefügt hatte, ist damit
      ebenfalls erledigt.
    **DASS BEIDE ZUGLEICH FALLEN, IST KEIN ZUFALL, SONDERN DIE FIGUR DIESES EINTRAGS:** Der
    Datensatz hat die Dekodierung überstanden und ist damit zum ersten Mal überhaupt bis
    hinter sie gelangt — **genau dorthin, wo dieser Eintrag alles vermutet hat, was er nicht
    sehen konnte.**

    **DIE GRENZE, UND SIE IST DER WICHTIGSTE SATZ DIESES BLOCKS: GEMESSEN IST DIE ANNAHME,
    NICHT DIE VERBUCHUNG.** Google hat den Datensatz entgegengenommen. **Ob daraus eine
    Conversion in der Berichterstattung wird und ob sie auf Gebote wirkt, ist eine ANDERE
    ACHSE mit einem anderen Instrument.**
    **DIE ABLAGE FÜHRT DAFÜR EIN ZEITFENSTER, und es steht dort im Wortlaut** —
    docs/ziel-befunde.md, Google-Abschnitt, Teil H2: "In den ersten **14 TAGEN** je
    Conversion-Action fliessen die per API gelieferten Multi-Source-Daten **NICHT** in die
    Gebotssteuerung, und WERT-ÜBERSCHREIBUNGEN SIND ABGESCHALTET". Dieselbe Ablage führt in
    Teil H1 unter den vier täuschenden Instrumenten ausdrücklich auch "**DER BLICK IN DIE
    GOOGLE-ADS-OBERFLÄCHE INNERHALB DER 14 TAGE** — die Ereignisse erscheinen in der
    Berichterstattung, wirken aber nicht auf die Gebote".
    **DIE ABLAGE WIDERSPRICHT DER DEUTUNG NICHT, SIE SCHÄRFT SIE:** Teil G1 hält fest, eine
    200 heisse "ENTGEGENGENOMMEN UND STRUKTURELL IN ORDNUNG", nicht "verarbeitet" und schon
    gar nicht "gezählt", und die eigentliche Verarbeitung sei asynchron — die Diagnostik
    stehe **frühestens 30 Minuten, bis zu 24 Stunden später**. **DIE ABGELESENE TABELLE LIEGT
    HINTER DIESER STUFE** (die Fehlerzeilen vom 1. bis 3. September stammen aus eben dieser
    asynchronen Verarbeitung), **aber vor der Verbuchung.**
    **DARAUS FOLGT EINE AUFLAGE UND NICHT NUR EINE GRENZE, NACHGETRAGEN 2026-09-07: WER
    INNERHALB DIESES FENSTERS IN DIE BERICHTERSTATTUNG SIEHT, HAT KEIN TAUGLICHES INSTRUMENT
    FÜR DIE FRAGE "WIRKT DIE CONVERSION"** — docs/ziel-befunde.md, Google-Abschnitt, Teil H1,
    führt genau diesen Blick als eines von vier täuschenden Instrumenten, wörtlich: "**DER
    BLICK IN DIE GOOGLE-ADS-OBERFLÄCHE INNERHALB DER 14 TAGE** — die Ereignisse erscheinen in
    der Berichterstattung, wirken aber nicht auf die Gebote, und Wert-Überschreibungen sind
    abgeschaltet". Der Absatz darüber nennt das Fenster als **GRENZE dieser Messung**; dieser
    Satz macht daraus die **AUFLAGE an die nächste** — sonst liest die nächste Runde ein
    Erscheinen in der Berichterstattung als Wirkung.

    **NACHTRAG 2026-09-07, SPÄTER AM TAG — DIE VERBUCHUNG IST GEMESSEN. DER ABSATZ DARÜBER
    BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER NACHTRAG TRITT DANEBEN.**
    **WARUM ERGÄNZT UND NICHT ERSETZT, und der ganze Absatz ist dafür gelesen worden:** Der
    Satz "GEMESSEN IST DIE ANNAHME, NICHT DIE VERBUCHUNG" steht in einem Block, der die
    **GRENZE DIESER Ablesung** beschreibt — der des Data-Manager-Protokolls. **Als Aussage
    über JENE Ablesung ist er unverändert wahr:** Sie hat die Annahme gezeigt und die
    Verbuchung nicht. Überholt ist allein seine **Reichweite als Aussage über den
    Wissensstand**. Wer ihn ersetzte, machte aus einer richtigen Grenzangabe eine falsche.
    **WAS DIE VERBUCHUNG BELEGT — ALS ZEIGER, NICHT ALS KOPIE:** docs/ziel-befunde.md,
    Google-Abschnitt, **Teil (cf)** (MESSUNG G, 2026-09-07). Dort steht die Ablesung samt
    ihren Grenzen; **zweimal geschrieben liefe es auseinander.** In einem Satz: Die eine
    Conversion des Zeitraums sitzt auf der **Offline-Aktion**, und die Detailseite nennt den
    Zeitpunkt selbst.
    **DIE ZUORDNUNG ZU UNSEREM AUFRUF IST AUCH DORT EINE ABLEITUNG UND KEINE MESSUNG** — es
    gibt weiterhin **keine gemeinsame Kennung** zwischen den zwei Seiten; sie ruht auf drei
    unabhängigen Beobachtungen. **Das ist genau die Figur, die dieser Block schon für die
    Einlieferung führt**, und sie wird durch die Verbuchung nicht aufgelöst.
    **WAS AUSDRÜCKLICH NICHT MITFÄLLT:** der Satz über die **GEBOTSWIRKUNG**. Ob die
    Conversion auf Gebote wirkt, ist **weiterhin nicht gemessen**; das Zeitfenster-Zitat und
    die Auflage darüber gelten unverändert. **NUR DIE VERBUCHUNG IST GEMESSEN, NICHT IHRE
    WIRKUNG.**
    **UND EINE FRAGE IST DABEI NEU AUFGEGANGEN, die dieser Block noch nicht kennt:** Ob das
    Zeitfenster für die **gewählte** Gestalt überhaupt gilt oder nur für die
    Multi-Source-Gestalt, ist **gelesen und nicht geklärt** — die Ablage führte dazu bis zum
    2026-09-07 **keinen Vorbehalt**. Sie ist als Grenze in **(cf)** benannt und **hier nicht
    entschieden**; der Absatz darüber wird davon **nicht angetastet**.
    PROVENIENZ: Die Verbuchung **GEMESSEN 2026-09-07 (OWNER)**, abgelesen in der
    Google-Ads-Oberfläche (Zielvorhaben → Conversions und die Detailseite der
    Offline-Aktion). Dass der Satz oben als Grenze SEINER Ablesung wahr bleibt, ist eine
    **ABLEITUNG** aus seinem Ort im Block (CC, 2026-09-07, Doku-Runde), **keine zweite
    Messung**. **KEIN Aufruf gegen eine Schnittstelle in dieser Runde.**

    **DIE AUSGELASSENE NACHLESE — AUSDRÜCKLICH EINE ENTSCHEIDUNG UND KEIN VERSÄUMNIS.** Die
    drei Statusabfragen über die Diagnose-Kennungen — die zwei vom 2026-09-02 und eine neue —
    **sind NICHT gefahren worden.** **GRUND:** Sie waren das Instrument für den Fall, dass
    die Einlieferung **scheitert**. Sie ist nicht gescheitert, und die zwei alten würden nur
    bestätigen, was die Tabelle ohnehin zeigt.
    **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07, Owner-GO.**
    **WARUM DAS ÜBERHAUPT DASTEHT: EIN NICHT GEFAHRENER SCHRITT, DEN NIEMAND ALS
    ENTSCHEIDUNG PROTOKOLLIERT, LIEST SICH IN EINEM JAHR WIE EINE LÜCKE** — und die nächste
    Runde fährt ihn nach, um etwas zu schliessen, das bewusst offen gelassen wurde.

    **WAS DIESER BLOCK NICHT SAGT: dass der Weg für JEDE Kennungsform trägt.** **GEMESSEN
    IST EINE EINLIEFERUNG MIT EINER KENNUNGSFORM.** Über die beiden anderen, die die
    gewählte Gestalt kennt, sagt diese Messung nichts.

    **EIN BEFUND ÜBER DIE ABLAGE SELBST, der in diesen Block gehört, weil er sonst nirgends
    steht — GEMESSEN am Dateitext (CC, 2026-09-07, Doku-Runde):** **DER TRANSPORT MIT EINER
    GÜLTIGEN KLICK-KENNUNG IST IN DIESER DATEI AN KEINER STELLE FESTGEHALTEN.** ACHSE: alle
    Erwähnungen eines geglückten Google-Transports, einer echten bzw. gültigen
    Klick-Kennung und eines Anzeigenklicks über den ganzen Dateitext.
    **JEDER dokumentierte Transport mit einer Kennung nennt einen VON HAND GESETZTEN Wert** —
    VERMERK 12 führt für den 2026-09-03 "Conversion mit `gclid`: der Google-Adapter
    SCHWEIGT", und der Eintrag zur Landepage sagt für den 2026-09-01 ausdrücklich "bei einem
    von Hand gesetzten Wert" samt dem Satz, ob eine **ECHTE** Kennung denselben Weg nehme,
    sei "weiterhin **NICHT GEPRÜFT**". **VERMERK 15 (2026-09-07) endet am Adapter mit
    `no destination for event` — er trägt keinen Transport.**
    **POSITIVKONTROLLE:** dieselbe Achse trifft diese drei Stellen und mehrere weitere; sie
    läuft nicht leer.
    **FOLGE, und sie ist der Grund für diesen Absatz: DIESER EINTRAG WIRD AUF EINEN BELEG
    GESCHLOSSEN, DER AUSSCHLIESSLICH BEIM ANBIETER LIEGT.** Der eigene Kanal hat den
    dazugehörigen Aufruf nicht protokolliert — oder er ist nicht abgelesen worden; **welches
    von beidem, ist NICHT ERHOBEN.** Wer später fragt, wann Pagesmith zum ersten Mal mit
    einer gültigen Kennung gesendet hat, findet die Antwort **nicht im Repo**.

    **WAS DIESER BLOCK AUSDRÜCKLICH NICHT TUT — Scope dieser Runde:** Er ändert nichts an der
    **zweiten Sperre** in "### (1) Der Gegenstand". Jene führt als OWNER-ANGABE vom
    2026-09-02, auf dem Konto habe es "nie einen echten Anzeigenklick gegeben". **Diese
    Messung ist damit nicht vereinbar** — ein Datensatz, dessen Kennung dekodiert werden
    konnte, setzt einen Klick voraus. **DASS DIE SPERRE DAMIT GEFALLEN IST, IST EINE
    ABLEITUNG AUS DIESER MESSUNG UND KEINE ZWEITE MESSUNG**, und sie wird hier **nur
    gemeldet**: Der Ort jener Sperre ist nicht Gegenstand dieser Runde.

    PROVENIENZ: Die abgelesene Tabelle samt Kontrast-Zeilen und der Nutzungsübersicht
    **GEMESSEN 2026-09-07 (OWNER)**, an der Oberfläche des Anbieters. Dass die Kennung des
    7. September eine **echte** war, ist eine **OWNER-ANGABE 2026-09-07**. Dass daraus das
    Fallen beider Kandidaten und der zweiten Sperre folgt, ist eine **ABLEITUNG** aus dieser
    Messung, **keine Messung**. Die Zitate aus docs/ziel-befunde.md sind **GELESEN
    2026-09-07 (CC, Doku-Runde)**; der Nicht-Befund über den fehlenden Transport-Beleg ist
    **GEMESSEN am Dateitext (CC, 2026-09-07)**. Die ausgelassene Nachlese ist eine
    **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07** auf Owner-GO.

42. **DER RESOLVER SCHREIBT BEI TOTEM ZUGANGSDATUM EINE FEHLERZEILE JE BESUCHER,
    UNGEDROSSELT.** GEMESSEN am Code (CC, 2026-09-02): `usableTokenFromRow`
    (src/lib/capi/token.ts, modul-privat) schreibt bei toter Uhr 1
    `console.error("[capi/resolve] secret unusable", …)` mit dem `reason`
    `access_token_expired` und gibt `null` zurück.
    **DER KOMMENTARKOPF DERSELBEN FUNKTION BENENNT DIE LAGE BEREITS SELBST** — "Es gibt KEINE
    Drosselung. Ein Projekt mit kaputtem Chiffrat schreibt eine Zeile PRO BESUCHER" —,
    allerdings am Fall des KAPUTTEN CHIFFRATS; **die tote Uhr 1 liegt auf demselben Weg und
    ist dort nicht genannt.**
    **DIE ZEILE NENNT KEIN PROJEKT.** Sie trägt den Ziel-Namen und einen SELBSTVERGEBENEN
    Grund; die `projectId` fehlt absichtlich, und der Kommentar begründet das mit dem Pfad
    selbst — er läuft bei JEDEM Besucher JEDER Kundenseite, und eine Projekt-Kennung je
    Beacon wäre eine Datenerhebung, die niemand beschlossen hat.
    **WARUM DAS ZÄHLT — IN ZWEI RICHTUNGEN, UND BEIDE GEHÖREN HIN:**
    · **ES IST HEUTE DIE EINZIGE BEOBACHTBARE SIGNATUR DES BRUCHS**, den Scheibe 1b beheben
      soll — also die Live-Test-Achse für 1b. Sie ist eine ANWESENHEIT und keine Abwesenheit,
      anders als der Erfolgsbeleg des Adapters, der nach VERMERK 10, Abschnitt (d), ein
      SCHWEIGEN ist; und sie ist im Wortlaut von allen drei Adapter-Zeilen unterscheidbar.
      **SIE ORDNET SICH ABER KEINEM PRÜFLING ZU**, weil sie kein Projekt nennt — wer mit ihr
      misst, misst über alle Projekte zugleich.
    · **ES IST UNBEGRENZTES SCHREIBEN AUF DEM MEISTGETROFFENEN PFAD DER PLATTFORM.** Nach
      Ablauf der Stunde erzeugt jeder Besucher jeder Seite eines betroffenen Projekts eine
      Fehlerzeile, ohne Zählung und ohne Ende.
    **KEIN VORSCHLAG ZUR DROSSELUNG**, und ausdrücklich auch keiner dazu, ob die `projectId`
    hineingehörte. GEMELDET 2026-09-02, NICHT GEBAUT.
    TRIGGER: der Zuschnitt der Scheibe 1b — er berührt beide Richtungen zugleich.

    **VERMERK 2026-09-03 — TRIGGER EINGETRETEN, UND 1b-1 SCHLIESST DIESEN EINTRAG
    AUSDRÜCKLICH AUS. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK
    TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt diesen Eintrag unter "Was
    ausdrücklich draussen bleibt, je mit seinem Grund".
    **BEIDE RICHTUNGEN BLEIBEN DAMIT OFFEN, UND SIE BLEIBEN ES AUS VERSCHIEDENEN GRÜNDEN:**
    Die **Drosselung** ist nicht Gegenstand der Klammer — sie liegt auf dem Ingest-Pfad, und
    1b-1 hält `src/lib/capi/ingest.ts` und `src/lib/capi/token.ts` ausdrücklich unberührt.
    Die **Live-Test-Achse** wird von der Klammer nicht gebraucht: Der Nachweis von 1b-1
    läuft über die bestehende Beweis-Route, nicht über die Fehlerzeile.
    **WAS DAS FÜR 1b-2 HEISST UND HIER NUR BENANNT WIRD:** Die Zeile bleibt die einzige
    beobachtbare Signatur des Bruchs, den ein Takt beheben soll — **und sie ordnet sich
    weiterhin keinem Prüfling zu**, weil sie kein Projekt nennt.
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT. KEINE EMPFEHLUNG** — weder zur
    Drosselung noch dazu, ob die `projectId` hineingehörte.
    PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
    Existenz des Zuschnitts (CC, 2026-09-03). Der Ausschluss ist ein ARCHITEKTEN-ZUSCHNITT
    vom 2026-09-03, die Zerlegung in zwei Schritte eine ARCHITEKTEN-FESTLEGUNG desselben
    Tages; keine Messung.

    **ZWEITER VERMERK 2026-09-03 — SCHEIBE 1b-2a NIMMT DIESEN EINTRAG EBENFALLS NICHT AUF,
    ABER SIE ÄNDERT SEINEN GEGENSTAND. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN.**
    Der Zuschnitt steht (s. den Abschnitt "Die Rettung am Beacon — Scheibe 1b-2a des
    Schritts 1b-2 der Scheibe 1b") und führt ihn dort unter "Was diese Scheibe ausdrücklich
    nicht baut, je mit Grund".
    **WAS SICH ÄNDERT, IST DIE URSACHE DER ZEILE UND NICHT IHRE HÄUFIGKEIT:** Heute schreibt
    `usableTokenFromRow` sie, sobald das Zugangsdatum tot ist — und tot ist es nach einer
    Stunde ohne Erneuerung, also regelmässig. **NACH 1b-2a BLEIBT ALS URSACHE NUR NOCH DAS
    TOTE ERNEUERUNGS-TOKEN**, denn ein erneuerbarer Zugang wird dann erneuert, statt eine
    Zeile zu erzeugen.
    **UND GENAU DAS MACHT DEN POSTEN NICHT KLEINER, SONDERN ANDERS — der Satz gehört hierher,
    sonst liest die nächste Runde ihn als halb erledigt: EIN TOTES ERNEUERUNGS-TOKEN BEHEBT
    KEIN CODE.** Es verlangt eine Neu-Autorisierung durch den Kunden. Die Fehlerzeile
    beschreibt danach einen Zustand, der **bis zu einer Handlung ausserhalb des Systems
    bestehen bleibt** — sie wird damit seltener, aber JEDE einzelne wiegt schwerer, und
    ungedrosselt ist sie weiterhin.
    **DER EINTRAG BLEIBT OFFEN, WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN TRIGGER
    STEHT WÖRTLICH WIE ZUVOR.** **KEINE EMPFEHLUNG** — weder zur Drosselung noch dazu, ob
    die `projectId` hineingehörte.
    PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Dass nach 1b-2a nur noch das
    tote Erneuerungs-Token als Ursache bleibt, ist eine **ABLEITUNG** aus den vier Lagen
    jenes Zuschnitts, **keine Messung** — gebaut ist nichts.

    **DRITTER VERMERK 2026-09-03 — DIE ZEILE VERSCHWINDET NICHT, SIE WIRD SELTEN. DIE
    ABLEITUNG DES ZWEITEN VERMERKS WAR ZU WEIT, UND DAS WIRD HIER RICHTIGGESTELLT STATT
    GESTEMPELT.** Der Text darüber bleibt ZEICHEN FÜR ZEICHEN stehen; überholt ist eine
    ABLEITUNG, die dort ausdrücklich als solche gekennzeichnet ist.
    **WAS DER ZWEITE VERMERK SAGTE:** "NACH 1b-2a BLEIBT ALS URSACHE NUR NOCH DAS TOTE
    ERNEUERUNGS-TOKEN, denn ein erneuerbarer Zugang wird dann erneuert, statt eine Zeile zu
    erzeugen."
    **WAS AM GEBAUTEN CODE GILT (GEMESSEN, CC, 2026-09-03, und LIVE bestätigt, OWNER,
    2026-09-03 — s. VERMERK 12, Abschnitte (b) bis (d)): DER `console.error` STEHT VOR DER
    VERZWEIGUNG UND WIRD IN BEIDEN FÄLLEN GESCHRIEBEN.** Ein erneuerbarer Zugang wird
    erneuert **UND** erzeugt die Zeile. Was die Fälle trennt, ist allein der `reason`.
    **DREI URSACHEN STATT EINER, und sie sind verschieden schwer:**
    · **`access_token_expired` — DIE RETTUNG GREIFT.** Ein NORMALVORGANG. Er tritt je
      Projekt und Stunde höchstens einmal auf, nicht mehr je Besucher; **das ist die
      Verbesserung, und sie ist real.**
    · **`refresh_token_expired` — ECHTER AUSFALL**, den kein Code behebt. Er verlangt eine
      Neu-Autorisierung durch den Kunden und bleibt bis dahin bestehen.
    · **DER BESTÄTIGUNGS-BEACON ERZEUGT SIE AUCH IM ERFOLGSFALL.** Er durchläuft den
      Resolver, sieht den alten Token und kehrt VOR dem Forward-Zweig zurück — er rettet
      nicht. **Ein Conversion-Beacon-PAAR hinterlässt damit auch bei geglückter Rettung
      eine Fehlerzeile.** ABLEITUNG aus dem Kontrollfluss; am Log ist nicht entscheidbar,
      welche der zwei Zeilen um 16:47:07 von ihm stammte.
    **WAS SICH NICHT ÄNDERT UND WAS SCHLIMMER GEWORDEN IST:** Die Zeile ist **seltener**
    geworden — sie hängt nicht mehr an jedem Besucher einer abgelaufenen Stunde.
    **UNGEDROSSELT IST SIE WEITERHIN**, und der Fall, in dem sie es am teuersten ist, ist
    **derselbe geblieben**: ein Ziel mit lebender Uhr 2 und dauerhaft scheiternder
    Erneuerung schreibt sie je Beacon — und ruft dabei zusätzlich je Beacon den Anbieter.
    **DIE ZWEITE RICHTUNG DES EINTRAGS — die Live-Test-Achse — HAT SICH DAMIT VERSCHOBEN:**
    Die Zeile ist **nicht mehr die Signatur des Bruchs**, sie ist ab jetzt die Signatur
    **eines von drei Zuständen**. **Wer mit ihr misst, misst die Anwesenheit eines
    Wortes, nicht mehr die eines Defekts.** Der Live-Nachweis der Scheibe 1b-2a ist genau
    deshalb NICHT über sie geführt worden, sondern über den FOLGENDEN Beacon (VERMERK 12,
    Abschnitt (c)).
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN TRIGGER STEHT WÖRTLICH
    WIE ZUVOR. KEINE EMPFEHLUNG** — weder zur Drosselung noch dazu, ob die `projectId`
    hineingehörte.
    **DIE MEHRDEUTIGKEIT SELBST IST EIN EIGENER POSTEN GEWORDEN**, weil sie eine andere
    Frage stellt als dieser Eintrag: nicht "wie oft", sondern "was bedeutet sie".
    PROVENIENZ: der Code-Befund GEMESSEN (CC, 2026-09-03); die drei Ursachen sind eine
    **ABLEITUNG** aus dem Kontrollfluss, gestützt auf die Live-Beobachtungen vom
    2026-09-03 (OWNER). **Keine Messung der Häufigkeit** — sie ist nicht erhoben.

43. **"STUMM" GILT FÜR DIE OBERFLÄCHE, NICHT FÜR DEN BETRIEB.** Diese Datei sagt an ZWEI
    Stellen, der Ausfall nach Ablauf des Zugangsdatums sei "in ihrer stummen Form" —
    Festlegung (4) des Zuschnitts der Scheibe 4 und VERMERK 10, Abschnitt (g). **BEIDE
    BLEIBEN RICHTIG UND SIND DESHALB ERGÄNZT UND NICHT ERSETZT WORDEN;** zu eng ist nicht die
    Aussage, sondern ihr Geltungsbereich.
    GEMESSEN am Code (CC, 2026-09-02):
    · **DIE OBERFLÄCHE SCHWEIGT WIRKLICH.** `listConfiguredTargets`
      (src/app/projects/actions.ts) selektiert aus `project_secrets` ausschliesslich
      `target` — kein `secret_enc`, keine Uhr. Die Karte sagt "Zugangsdaten hinterlegt",
      solange die Zeile existiert, unabhängig von jedem Ablauf.
    · **DAS SERVER-LOG SCHWEIGT NICHT.** S. Vorrats-Eintrag 42; hier nicht verdoppelt.
    **WARUM DIE UNTERSCHEIDUNG FÜR EINEN ZUSCHNITT ZÄHLT:** Aus "stumm" folgt sonst, es gebe
    nichts zu beobachten — und damit keine Live-Test-Achse. **Die gibt es.**
    GEMELDET 2026-09-02, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: der Zuschnitt der Scheibe 1b, ODER jede Arbeit, die eine Anzeige des
    Ablauf-Zustands in der Oberfläche berührt.

44. **DIE BEWEIS-ROUTE HAT KEINEN AUFRUFER IN DER ANWENDUNG.** Diese Datei sagt an zwei
    Stellen "nach einem Druck auf die Beweis-Route" (Festlegung (4) des Zuschnitts der
    Scheibe 4 und VERMERK 10, Abschnitt (g)).
    GEMESSEN am Repo (CC, 2026-09-02; Achse: formale Suche über `src/` nach "oauth/google"
    ausserhalb von `src/app/api/oauth/`, dazu eine Suche nach "fetch" in `src/components/`;
    POSITIVKONTROLLE: dieselbe Suche findet den Verbinden-Weg): **Es gibt kein Bedienelement,
    das `/api/oauth/google/refresh` ruft.** Der einzige Oberflächen-Bezug zu einer
    Google-OAuth-Route steht in `src/components/TargetCard.tsx` und ruft
    `/api/oauth/google/start` — der Knopf "Google verbinden" bzw. "Google neu verbinden".
    **ES IST KEIN WIDERSPRUCH, SONDERN EINE ZU WEICHE FORMULIERUNG — UND DIESELBE DATEI KENNT
    DIE SACHE GENAUER:** Entscheidung **P3** (s. "Die Entscheidungen vom 2026-08-29") sagt
    wörtlich "DER PREIS IST BENANNT: Der Live-Test braucht einen `fetch` aus der eingeloggten
    Anwendung statt einer URL-Eingabe." **ZWEI STELLEN, ZWEI GENAUIGKEITEN; BEIM ZUSCHNITT
    ZÄHLT DIE GENAUERE.**
    **WAS AM CODE TRÄGT:** Die Stunde beginnt in der Praxis mit dem Verbinden bzw.
    Neu-Verbinden; die zweite genannte Quelle ist nur VON HAND erreichbar. **UND FÜR EINEN
    MASCHINELLEN AUFRUFER IST SIE GAR NICHT ERREICHBAR** — s. Vorbedingung (v) im Abschnitt
    "1b als Folgetask".
    GEMELDET 2026-09-02, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob ein Bedienelement entstehen
    sollte.
    TRIGGER: der Zuschnitt der Scheibe 1b, ODER die erste Arbeit, die den Ablauf-Zustand in
    der Oberfläche sichtbar macht.

    **VERMERK 2026-09-03 — DER ERSTE TRIGGER IST EINGETRETEN, UND 1b-1 SCHLIESST DIESEN
    EINTRAG AUSDRÜCKLICH AUS. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER
    VERMERK TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt diesen Eintrag unter "Was
    ausdrücklich draussen bleibt, je mit seinem Grund".
    **DIE BEWEIS-ROUTE BEKOMMT KEIN BEDIENELEMENT.** 1b-1 verdrahtet sie auf die Klammer um
    und macht sich damit demobar; **die Live-Test-Achse bleibt der `fetch` aus dem
    eingeloggten Tab** — der Preis, den Entscheidung P3 benannt hat. **ES ENTSTEHT KEIN
    NEUER ZUGANG:** Es kommt kein Pfad hinzu, es wechselt nur, was hinter dem bestehenden
    liegt.
    **DER BEFUND DIESES EINTRAGS GILT DAMIT UNVERÄNDERT WEITER:** Auch nach 1b-1 gibt es
    kein Bedienelement, das die Route ruft, und für einen maschinellen Aufrufer ist sie
    unverändert nicht erreichbar (Vorbedingung (v) im Abschnitt "1b als Folgetask", die dort
    1b-2 bindet).
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN ZWEITER TRIGGER IST
    UNBERÜHRT** — die erste Arbeit, die den Ablauf-Zustand in der Oberfläche sichtbar macht,
    steht aus. **KEINE EMPFEHLUNG.**
    PROVENIENZ: Dass der erste Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut
    und der Existenz des Zuschnitts (CC, 2026-09-03). Der Ausschluss ist ein
    ARCHITEKTEN-ZUSCHNITT vom 2026-09-03, die Zerlegung in zwei Schritte eine
    ARCHITEKTEN-FESTLEGUNG desselben Tages; keine Messung.

45. **DER BEREICH "VERÖFFENTLICHEN" FÜHRT BEI EINEM PROJEKT MIT VERBUNDENER CUSTOM-DOMAIN
    NUR DIE LABEL-URL, NICHT DIE CUSTOM-DOMAIN.**
    **ES IST KEIN SERVING-FEHLER, UND DIESER SATZ STEHT ZUERST:** Beide Adressen
    funktionieren. Die Seite ist unter der Label-URL **und** unter der Custom-Domain
    erreichbar; es geht nichts verloren und nichts 404t.
    **DER SCHADEN LIEGT IN DER ANZEIGE:** Wer die Live-Adresse von dort kopiert, **nimmt die
    falsche** — er trägt eine Adresse in eine Anzeige, in eine Übergabe oder in ein
    Dokument, die nicht die ist, unter der die Seite laufen soll.
    **PROVENIENZ: OWNER-BEOBACHTUNG 2026-09-02. NICHT GEMESSEN, NICHT AM CODE GEPRÜFT.** Es
    ist weder erhoben, welche Stelle die angezeigte Adresse baut, noch ob die Beobachtung
    für jedes Projekt mit Custom-Domain gilt oder nur für das beobachtete. **Wer sie
    aufgreift, misst sie zuerst.**
    GEMELDET 2026-09-03, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder dazu, welche der beiden
    Adressen führen sollte, noch dazu, ob beide zu zeigen wären.
    TRIGGER: die nächste Arbeit am Bereich "Veröffentlichen".

46. **DIE NUTZLAST VON HANDAUFRUF 3 DER MESSUNG D IST NUR RELATIONAL PROTOKOLLIERT — VIER
    FELDER SIND NICHT AUFLÖSBAR.**
    **DER BEFUND:** Das Protokoll beschreibt Aufruf 3 als "sonst zeichengleich zu 3" und
    Aufruf 3 seinerseits über Aufruf 2. **Eine Kette aus Verweisen endet damit nicht bei
    einem Wert**, und vier Felder der gesendeten Nutzlast lassen sich heute nicht mehr
    bestimmen.
    **ES IST DIESELBE KLASSE WIE VORRATS-EINTRAG 40, und darin liegt der Grund für diesen
    Eintrag: EIN PROTOKOLL, DAS AUF EINEN VORGÄNGER ZEIGT STATT SEINEN GEGENSTAND ZU NENNEN,
    IST NICHT WIEDERVERWENDBAR.** Jener Eintrag hält denselben Mechanismus an einer
    ausgelassenen `requestId` fest — dort fehlt der Wert, hier steht an seiner Stelle ein
    Zeiger. **Der Ausgang ist derselbe: Die Messung ist nicht nachzubauen, und ihre Aussage
    ist an keinem Feld nachzuprüfen.**
    **PROVENIENZ: OWNER-BEOBACHTUNG 2026-09-02. NICHT GEMESSEN, NICHT AM CODE GEPRÜFT.** Es
    ist in dieser Runde **kein** Abgleich am Dateitext gefahren worden — weder darüber,
    welche vier Felder es sind, noch darüber, wie viele Aufrufe der Messung D relational
    beschrieben sind. **Wer den Eintrag aufgreift, erhebt beides zuerst.**
    GEMELDET 2026-09-03, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder eine Auflage an künftige
    Messprotokolle noch eine nachträgliche Befüllung ist hier vorgeschlagen.
    TRIGGER: die nächste Messung mit einem Bezeichner für eine spätere Nachfrage.

47. **DAS TOKEN "1b" IST IM REPO NICHT EINDEUTIG — ZWEI NUMMERIERUNGEN TEILEN DIE KÜRZEL
    1a, 1b UND 1c.**
    Neben dem Schnitt der Phase 11.2 führt `docs/claude-history/future-roadmap.md` unter
    **Säule 1** eine EIGENE Aufzählung — **(1a)** llms.txt · **(1b)** Schema.org/JSON-LD ·
    **(1c)** Zwischenschritt (manuelle JSON-LD-Injektion) —, und `docs/roadmap.md` zitiert
    daraus. **ES SIND DREI KOLLIDIERENDE KÜRZEL, NICHT NUR DAS EINE, NACH DEM GESUCHT
    WURDE.**
    **WAS HEUTE TRÄGT UND WARUM DAS KEIN ZUFALL BLEIBEN DARF: EINDEUTIG WIRD DIE ANGABE
    ALLEIN DURCH DAS WORT DAVOR.** "Scheibe 1b" bzw. "Schritt 1b-1" trifft; **das nackte
    "1b" trifft beide Nummerierungen.** Wer den Suffix- und Präfix-Gebrauch für Kosmetik
    hält und ihn beim nächsten Aufräumen kürzt, **erzeugt die Mehrdeutigkeit, die es heute
    nicht gibt.**
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob eine der beiden Nummerierungen
    umbenannt wird — die fremde liegt in einem ARCHIV und in der ROADMAP, und beide sind
    ausserhalb jedes heutigen Scopes.
    TRIGGER: die nächste Arbeit an Säule 1 der Zukunfts-Roadmap, ODER die erste Umbenennung
    an einer der beiden Nummerierungen.
    PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-03; Achse: rekursive Suche über `*.md`,
    `*.ts` und `*.tsx`, binärsicher, mit Positivkontrolle über die 22 `11.1c`-Treffer).
    Dass die Kollision heute folgenlos ist, ist eine ABLEITUNG aus dem Sprachgebrauch, keine
    zweite Messung.

48. **DIE FEHLERZEILE IST MEHRDEUTIG GEWORDEN — DERSELBE WORTLAUT UND DIESELBE LOG-EBENE
    TRAGEN JETZT ZWEI ZUSTÄNDE.**
    **GEMESSEN am Code (CC, 2026-09-03), LIVE bestätigt (OWNER, 2026-09-03):**
    `usableTokenFromRow` (src/lib/capi/token.ts) schreibt bei toter Uhr 1 unverändert
    `console.error("[capi/resolve] secret unusable", …)`. **Der Aufruf steht VOR der
    Verzweigung und wird in BEIDEN Fällen geschrieben;** was sie trennt, ist allein der
    `reason`:
    · **`access_token_expired` IST EIN NORMALVORGANG.** Uhr 2 lebt, das Ziel landet in
      `renewable`, **die Rettung greift** — und die Conversion geht hinaus.
    · **`refresh_token_expired` IST EIN ECHTER AUSFALL.** Uhr 2 ist überschritten, es gibt
      keinen Weg zurück ausser einer **Neu-Autorisierung durch den Kunden**. **KEIN CODE
      BEHEBT DAS.**
    **DIE SCHEIBE HAT DIE ZEILE SELTENER GEMACHT UND IHRE BEDEUTUNG MEHRDEUTIG.** Das ist
    kein Widerspruch, sondern der ganze Posten: Vor 1b-2a bezeichnete sie **nur** den
    Bruch, und `console.error` war dafür die richtige Ebene. **Jetzt bezeichnet sie ihn in
    der Hälfte der Fälle** — in der anderen Hälfte bezeichnet sie einen Vorgang, der
    funktioniert hat.
    **DER SCHADEN IST EINE GEWÖHNUNG, KEIN DEFEKT — und darin liegt seine Tücke:** Wer die
    Zeile regelmässig sieht und regelmässig feststellt, dass alles läuft, hört auf, den
    `reason` zu lesen. **Dann steht der echte Ausfall im selben Gewand da wie der
    Normalvorgang.**
    **EINE DRITTE QUELLE KOMMT DAZU UND MACHT DIE GEWÖHNUNG WAHRSCHEINLICHER:** Der
    Bestätigungs-Beacon erzeugt die Zeile **auch im Erfolgsfall** (VERMERK 12, Abschnitt
    (d)) — ein Conversion-Beacon-Paar hinterlässt sie also selbst dann, wenn die Rettung
    geglückt ist.
    **KEINE EMPFEHLUNG zur Log-Ebene oder zum Wortlaut.** Weder eine Herabstufung des
    Normalfalls auf `console.info` noch eine Umbenennung noch eine zweite Zeile ist hier
    vorgeschlagen — jede davon berührt den meistgetroffenen Pfad der Plattform und ist eine
    eigene Entscheidung.
    **DIE ABGRENZUNG ZU VORRATS-EINTRAG 42 GEHÖRT DAZU, sonst liest die nächste Runde zwei
    Fassungen derselben Sache:** Jener fragt **WIE OFT** die Zeile entsteht (ungedrosselt,
    je Besucher) und führt sie als Live-Test-Achse. **Dieser fragt, WAS SIE BEDEUTET.**
    Zwei verschiedene Fragen an derselben Zeile; 42 trägt seit dem 2026-09-03 einen
    Vermerk, der die Verschiebung seiner zweiten Richtung festhält.
    GEMELDET 2026-09-03, NICHT GEBAUT.
    TRIGGER, wörtlich vom Owner: **sobald Logs überflogen statt gelesen werden** — dann
    wird aus einer harmlosen Gewöhnung eine übersehene Neu-Autorisierung.
    PROVENIENZ: **OWNER-BEOBACHTUNG und ARCHITEKTEN-EINORDNUNG 2026-09-03**, am Code
    bestätigt (CC, 2026-09-03). Die Häufigkeit der beiden Fälle ist **nicht erhoben**.

49. **DIE BENENNUNG EINES TESTLAUFS IST WEITER ALS DIE SACHE — "PageView rettet nicht,
    sorgt aber vor".**
    Der Lauf **H7** in `src/lib/capi/ingest.refresh.test.ts` trägt diesen Namen. **DER LAUF
    SELBST IST RICHTIG** und misst, was er messen soll: Ein nicht forwardbares Ereignis löst
    **keine** Rettung aus, wohl aber die Vorsorge.
    **SEIN NAME BEHAUPTET MEHR, ALS BEI TOTEM TOKEN GESCHIEHT.** "Erneuerbar, tot" landet in
    `rettbar`, und `rettbar` wird **ausschliesslich innerhalb der Forward-Wache**
    abgearbeitet — also hinter `isForwardable`. **Ein Projekt, das nur Pageviews erzeugt,
    wird weder gerettet noch vorgesorgt**; vorgesorgt wird **nur im Vorlauf-Band eines
    lebenden Zugangsdatums**. Der Name legt eine Vorsorge nahe, die in genau dem Fall
    ausbleibt, den der Lauf im Titel führt.
    **ES IST KEIN DEFEKT, UND DER GRUND GEHÖRT DAZU, sonst wird der Eintrag grösser gelesen
    als er ist:** Es steht dabei **keine Conversion auf dem Spiel** — ein Pageview forwardet
    ohnehin nicht —, und **die erste Conversion rettet**. Der Zustand kostet nichts, was
    jemand vermissen könnte. **Volltext der Einordnung: VERMERK 12, Abschnitt (d).**
    **WARUM DAS ÜBERHAUPT EIN POSTEN IST:** Ein Testname wird gelesen, wenn niemand den
    Testkörper liest — beim Überfliegen einer Suite, beim Suchen nach Abdeckung, beim
    Streichen vermeintlich redundanter Läufe. **Eine zu weite Selbstbeschreibung lädt dazu
    ein, eine Achse für gedeckt zu halten und keinen Test dafür zu schreiben**
    (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL", die
    vierte Weise: der Testkommentar behauptet eine Garantie, die sein Test nicht deckt).
    **HIER IST ES DER NAME STATT DES KOMMENTARS — dieselbe Achse, eine Stelle davor.**
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, wie der Lauf heissen sollte, und
    ausdrücklich keine, den Zuschnitt zu ändern.
    TRIGGER: die nächste Arbeit an `src/lib/capi/ingest.refresh.test.ts`.
    PROVENIENZ: GEMESSEN am Code (CC, 2026-09-03); die Einordnung ist eine
    ARCHITEKTEN-BEOBACHTUNG desselben Tages.

50. **STIRBT DAS ERNEUERUNGS-TOKEN, IST DER AUSFALL FÜR NIEMANDEN SICHTBAR.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-03):** Die Oberfläche sagt weiterhin
    "Zugangsdaten hinterlegt": `listConfiguredTargets` (src/app/projects/actions.ts)
    selektiert aus `project_secrets` ausschliesslich `target` — **keine Uhr, kein
    `secret_enc`** (dieselbe Messung wie in Vorrats-Eintrag 43). Die Seite läuft, und
    **die Conversions verschwinden still.**
    **DER EINZIGE ORT, AN DEM DER ZUSTAND HEUTE ERSCHEINT, IST EINE LOGZEILE** —
    `[capi/resolve] secret unusable` mit dem `reason` `refresh_token_expired`
    (`usableTokenFromRow`, src/lib/capi/token.ts). **Die sieht kein Kunde, und der
    Betreiber muss sie SUCHEN.**

    **DER VORSCHLAG KOMMT VOM OWNER (2026-09-03) UND IST HIER ABGELEGT, NICHT
    ZUGESCHNITTEN:** eine Anzeige im Dashboard, die den Kunden zur Neu-Autorisierung
    auffordert.

    **ER ZERFÄLLT IN ZWEI DINGE MIT SEHR UNTERSCHIEDLICHEM PREIS, UND DIESE TRENNUNG IST
    DER EIGENTLICHE INHALT DIESES EINTRAGS** — wer sie nicht mitliest, schneidet beide
    als eine Arbeit zu und bezahlt für die billigere den Preis der teureren:
    · **DIE AUSFALLMELDUNG ("die Verbindung ist tot") IST DIE BILLIGERE.** Der Zustand
      wird **HEUTE SCHON ERKANNT**: `hasLiveRefreshToken` (ebenda, modul-privat) trifft
      die Unterscheidung an **genau einer Stelle** — GEMESSEN am Repo (CC, 2026-09-03):
      eine Definition, ein Aufrufer —, und der Resolver schreibt bereits eine Zeile mit
      `refresh_token_expired`. **WAS FEHLT, IST EIN WEG VON DORT IN DIE OBERFLÄCHE.**
    · **UND DER RESOLVER DARF IHN NICHT SELBST GEHEN.** Er führt die `projectId`
      **bewusst nicht** — Invariante **(I-4)** der Scheibe 1b-2a, und der Grund steht am
      Kopf von `usableTokenFromRow`: Dieser Pfad läuft bei JEDEM Besucher JEDER
      Kundenseite, und eine Projekt-Kennung je Beacon wäre eine Datenerhebung, die
      niemand beschlossen hat. GEMESSEN (CC, 2026-09-03): **keine** der Logzeilen des
      Resolvers trägt eine. **Ein Zuschnitt, der den Weg über den Resolver nimmt, bricht
      diese Invariante — und zwar an der teuersten Stelle des Systems.**
    · **DIE VORWARNUNG ("läuft in drei Tagen ab") IST DIE TEURERE.** Sie braucht den
      **Ablaufzeitpunkt**, und der steckt im Chiffrat: **keine Spalte, keine
      SQL-Abfrage, die Datenbank hat den Schlüssel nicht.** GEMESSEN am Repo (CC,
      2026-09-03): Keine Migration legt eine Ablauf-Spalte auf `project_secrets` an.
      **SIE HÄNGT DAMIT AN DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
      AUSLÖSER** — Befund (1) des Zuschnitts zu Schritt 1b-1, "DER ABLAUFZEITPUNKT
      STECKT IM CHIFFRAT, IN KEINER SPALTE". Dass es dieselbe Frage ist, ist eine
      **ABLEITUNG** aus jenem Befund und keine Messung.

    **DIE VORBEDINGUNG, DIE JEDER ZUSCHNITT DER VORWARNUNG ZUERST BEANTWORTEN MUSS —
    UNGEMESSEN:** Ob Google nach dem Statuswechsel auf "In Produktion" überhaupt noch
    einen Ablaufzeitpunkt für das Erneuerungs-Token mitliefert. **Der Zeiger steht in
    docs/ziel-befunde.md, Teil (bx)**, und er ist dort ausdrücklich offen gelassen: Beide
    Erklärungen tragen die Beobachtung gleich gut, und "WER SIE TRENNEN WILL, BRAUCHT
    DIESELBE MESSUNG NACH DER VERIFIZIERUNG."
    **OHNE IHN KANN KEINE ANZEIGE VORHERSAGEN, DASS ETWAS AUSLÄUFT — sie kann nur melden,
    dass es bereits kaputt ist.** Wer die Vorwarnung ohne diese Messung zuschneidet, baut
    eine Anzeige, die im Produktivbetrieb **keine Datengrundlage** hat.

    **WAS ZUR LEBENSDAUER BEKANNT IST, JE MIT PROVENIENZ UND NICHT VERMISCHT:**
    · **GEMESSEN:** Im Publishing-Status "Testing" lebt das Erneuerungs-Token **sieben
      Tage** — Vorbedingung (iv) im Abschnitt "1b als Folgetask", an eigenen Daten
      wiedergefunden (VERMERK 6, Ableitung 3, und der Nachtrag vom 2026-09-03 mit dem
      konkreten Datum).
    · **ABLEITUNG, NICHT LESUNG — UND DIESE KENNZEICHNUNG IST GEGENÜBER DER VORLAGE
      DIESER RUNDE VERSCHÄRFT:** Dass nach dem Statuswechsel die Frist entfällt und das
      Token dann nur noch durch Ereignisse stirbt, ist **die UMKEHRUNG einer gelesenen
      Bedingung**, nicht die gelesene Bedingung selbst. Gelesen ist ausschliesslich der
      Satz des Anbieters über den **Testing**-Zustand ("…publishing status of 'Testing'
      is issued a refresh token expiring in 7 days", docs/ziel-befunde.md, Teil (af)).
      **Aus "im Zustand A gilt X" folgt nicht "ausserhalb von A gilt X nicht"** — das ist
      genau der Schluss, den Teil (bx) für die Nachbaraussage schon einmal gezogen und
      dann als **widerlegt** protokolliert hat.
      **KEIN Aufruf, keine Beobachtung.** Wer diese Angabe als GELESEN zitiert, zitiert
      eine Folgerung als Quelle.

    **DER NEBENEFFEKT, DER DEN EINTRAG MIT 48 VERBINDET:** Eine Ausfallmeldung im
    Dashboard löste das Log-Problem **an der Wurzel** — niemand müsste mehr nach
    `refresh_token_expired` filtern, und die Gewöhnung an die mehrdeutige Fehlerzeile
    hätte keinen Gegenstand mehr.
    **DIE ABGRENZUNG GEHÖRT DAZU, sonst laufen zwei Fassungen derselben Sache
    nebeneinander: 48 fragt, WAS DIE LOGZEILE BEDEUTET. Dieser Eintrag fragt, WO DER
    ZUSTAND STATTDESSEN ERSCHEINEN SOLLTE.** Zwei verschiedene Fragen an demselben
    Zustand.

    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, wie die Anzeige aussähe, wo sie sässe,
    oder welcher der beiden Teile zuerst käme.
    TRIGGER: die nächste Arbeit an der Ziel-Karte, **ODER** der Statuswechsel auf
    "In Produktion", **ODER** der erste Kunde mit einer Google-Verbindung.
    PROVENIENZ: **OWNER-VORSCHLAG 2026-09-03**; die Code-Aussagen **GEMESSEN am Repo**
    (CC, 2026-09-03, Aufklärungsrunde desselben Tages); dass die Vorwarnung an derselben
    Frage hängt wie der Zeitplan, ist eine **ABLEITUNG** aus Befund (1) des
    1b-1-Zuschnitts und keine Messung; die Einordnung der Statuswechsel-Angabe als
    Ableitung statt Lesung ist **GEMESSEN am Dateitext** (CC, 2026-09-03, an
    docs/ziel-befunde.md, Teile (af) und (bx)).

    **VERMERK 2026-09-03 — DIE TRENNUNG DIESES EINTRAGS IST ÜBERHOLT UND DURCH EINE
    ANDERE ERSETZT. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK
    TRITT DANEBEN. DER TRIGGER IST UNANGETASTET.**
    **WAS ÜBERHOLT IST — GENAU EINE ACHSE, NICHT DER GANZE EINTRAG:** die Sortierung in
    **"billige Ausfallmeldung / teure Vorwarnung"**. Sie ruhte auf dem Schluss, die
    Vorwarnung hänge "an DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
    AUSLÖSER".
    **DER GRUND, WARUM SIE FÄLLT (ARCHITEKTEN-BEFUND 2026-09-03): EINE SERVERAKTION HAT
    DEN CHIFFRIER-SCHLÜSSEL.** Der erste Halbsatz des Eintrags stimmt weiterhin — der
    Ablaufzeitpunkt steckt im Chiffrat, und die **Datenbank** hat den Schlüssel nicht.
    **Der Schluss stimmt nicht:** Eine Aktion kann dasselbe tun wie `usableTokenFromRow`
    (src/lib/capi/token.ts) — lesen, entschlüsseln, beide Uhren prüfen —, beim Laden des
    Dashboards und abseits jedes Beacons. **Der Satz galt einem ZEITPLAN IN POSTGRES und
    ist ungeprüft auf die OBERFLÄCHE übertragen worden.**
    **DIE TRENNUNG, DIE AN IHRE STELLE TRITT, LÄUFT AUF EINER ANDEREN ACHSE:**
    **ABGELAUFEN NACH EIGENER UHR** gegen **WIDERRUFEN**. Die erste steht in der Nutzlast
    und braucht keinen Schreibvorgang; die zweite ist nur beim Versuch erfahrbar und
    bräuchte als einzige Lage Persistenz. **Volltext im Abschnitt "Die Ampel an der
    Ziel-Karte — Scheibe 11.2b"**, dort unter "Die zwei Todesarten" — hier NICHT
    verdoppelt.
    **DIE ERSTE HÄLFTE DIESES EINTRAGS WIRD MIT SCHEIBE 11.2b GEBAUT.** Sie umfasst nach
    der neuen Trennung **beide** ursprünglich getrennten Anzeigen: Ausfall **und**
    Vorwarnung (OWNER-ENTSCHEIDUNG 2026-09-03). Was der Eintrag als "die teurere" führte,
    ist es nicht.
    **DIE ZWEITE HÄLFTE BLEIBT OFFEN UND BEHÄLT IHREN EIGENEN TRIGGER:** die
    **widerrufene** Verbindung. Sie ist am Rückgabewert der Erneuerung nicht von
    "abgelaufen" zu trennen — beide münden in `invalid_grant`, sobald der Anbieter
    gefragt wird — und steht im Zuschnitt der Scheibe 11.2b unter "Was die Scheibe 11.2b
    ausdrücklich nicht baut, je mit Grund", mit dem Trigger "die erste Messung, die
    `invalid_grant` bei LEBENDER Uhr zeigt".
    **WAS AM EINTRAG UNBERÜHRT BLEIBT UND WEITER TRÄGT:** der Befund selbst (der Ausfall
    ist für niemanden sichtbar), die drei gemessenen Code-Aussagen, die Invariante (I-4)
    als Riegel gegen den Weg über den Resolver, die ungemessene Vorbedingung aus Teil
    (bx), die Abgrenzung zu Eintrag 48 — **und sein TRIGGER, wörtlich wie zuvor.**
    **DER EINTRAG WIRD NICHT ABGEHAKT.** Ein Zuschnitt ist kein Vollzug; abgehakt wird
    hier ohnehin nicht (s. die Bauform an den Einträgen 7, 15 und 35).
    PROVENIENZ: **ARCHITEKTEN-BEFUND 2026-09-03**, auf Owner-GO; die Code-Aussage, dass
    eine Serveraktion entschlüsseln kann, ist **GEMESSEN am Repo** (CC, 2026-09-03) — die
    Chiffrier-Kennung wird aus der Umgebung gelesen, nicht aus der Datenbank. **Keine
    Messung an einer Oberfläche.**

    **ZWEITER VERMERK 2026-09-04 — DIE ERSTE HÄLFTE IST GEBAUT UND LIVE BEWIESEN. DER
    TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **WAS GEBAUT IST:** Die Scheibe 11.2b (Bau-Commit `7288f90`, s. VERMERK 13) zeigt den
    Ausfall **und** die Vorwarnung an der Ziel-Karte. Der Weg von `hasLiveRefreshToken` in
    die Oberfläche, den dieser Eintrag als "WAS FEHLT" benennt, ist gebaut — **aber NICHT
    über den Resolver**, sondern über eine eigene Serveraktion
    (`listTargetCredentialStates`), die beim Laden des Dashboards liest, entschlüsselt und
    Uhr 2 deutet.
    **DIE INVARIANTE (I-4) IST DAMIT EINGEHALTEN UND NICHT UMGANGEN**, und das ist genau
    der Punkt, den dieser Eintrag selbst als den teuersten benennt: Der Resolver führt
    weiterhin **keine `projectId`**, er ist mit keiner Zeile angefasst worden, und der
    Ingest-Pfad läuft unverändert. Der Weg in die Oberfläche geht **neben** ihm her.
    **WAS DER EINTRAG RICHTIG GESEHEN HAT — die Ausfallmeldung war die billigere Hälfte:**
    Der Zustand wurde bereits erkannt; gefehlt hat allein der Weg. **WORIN ER SICH IRRTE,
    steht schon im Vermerk vom 2026-09-03 darüber** und ist mit dieser Scheibe eingelöst:
    Die Vorwarnung war **nicht** die teurere — eine Serveraktion hat den
    Chiffrier-Schlüssel, und damit fiel die Klartext-Spalten-Frage weg.
    **DIE ZWEITE HÄLFTE BLEIBT OFFEN UND BEHÄLT IHREN EIGENEN TRIGGER:** die **WIDERRUFENE**
    Verbindung. Sie ist am Rückgabewert der Erneuerung nicht von "abgelaufen" zu trennen —
    beide münden in `invalid_grant`, sobald der Anbieter gefragt wird — und bräuchte als
    einzige Lage **Persistenz**. Ihr Trigger steht im Zuschnitt der Scheibe 11.2b unter
    "Was die Scheibe 11.2b ausdrücklich nicht baut, je mit Grund": **die erste Messung, die
    `invalid_grant` bei LEBENDER Uhr zeigt.**
    **DIE UNGEMESSENE VORBEDINGUNG AUS TEIL (bx) IST DAVON UNBERÜHRT UND GILT WEITER:** Ob
    Google nach dem Statuswechsel auf "In Produktion" überhaupt noch einen Ablaufzeitpunkt
    liefert, ist **nicht gemessen**. Trägt er keinen, greift die Vorwarn-Schwelle nie, und
    die Karte steht auf `unknown_expiry`. **Das ist gebaut und kein Defekt** — aber es
    heisst, dass die Vorwarnung im Produktivbetrieb ihre Datengrundlage verlieren kann.
    **DER EINTRAG WIRD NICHT ABGEHAKT, UND DAS IST DIE BAUFORM DIESER DATEI, KEINE
    UNENTSCHLOSSENHEIT:** Der Vorrat kennt kein Abhaken; er kennt einen eigenen datierten
    Absatz UNTER dem unveränderten Eintrag — so bei Eintrag 7, 15 und 35. **Diese Runde
    folgt ihr.** **SEIN TRIGGER STEHT WÖRTLICH WIE ZUVOR**, und zwei seiner drei Hälften
    sind unverändert offen: der Statuswechsel auf "In Produktion" und der erste Kunde mit
    einer Google-Verbindung.
    **WARUM ER STEHEN BLEIBT — ZWEI GRÜNDE, und der zweite wiegt schwerer:** (1) Seine
    **MESSUNG**, dass `listConfiguredTargets` ausschliesslich `target` selektiert, ist der
    Beleg, auf dem die zweite Aktion überhaupt ruht. (2) Seine **TRENNUNG der zwei Hälften**
    ist der Maßstab für die verbliebene: Wer die widerrufene Verbindung später zuschneidet,
    findet hier, warum sie als einzige Persistenz braucht — und warum der Weg über den
    Resolver auch dann versperrt bleibt.
    PROVENIENZ: der Bau **GEMESSEN am Repo** (CC, 2026-09-04); der Live-Nachweis
    **GEMESSEN 2026-09-03/04 (OWNER)**, s. VERMERK 13, Abschnitt (b). Dass (I-4)
    eingehalten ist, ist **GEMESSEN am Diff** (`src/lib/capi/**` liegt nicht darin), keine
    Zusage.

51. **`cut -c<n>` SCHNEIDET NACH ZEICHEN UND ZERLEGT DABEI MEHRBYTE-ZEICHEN — DIE FOLGE IST
    KEINE FEHLERMELDUNG, SONDERN EINE ANDERE AUSGABEFORM.**
    **GEMESSEN am eigenen Lauf (CC, 2026-09-04):** Ein Reihenfolge-Vergleich zweier
    Titel-Listen schnitt mit `cut -c1-70`. Das halbiert bei UTF-8 ein Mehrbyte-Zeichen; die
    entstandene Datei trägt danach eine ungültige Byte-Folge, und `diff` meldet
    **`Binary file … matches`** STATT der Trefferzeilen. **Die Vergleichsdatei fällt damit
    aus der Auswertung, ohne dass irgendetwas rot wird.**
    **GEWECHSELT** auf einen Schnitt an einem TEXTMUSTER (`sed 's/ (Trigger.*//'`), der keine
    Byte-Grenze verletzt — dazu eine NUL-Zählung über die Messdateien selbst und eine
    künstliche Abweichung als **POSITIVKONTROLLE**, die anschlug.
    **WAS DIESER FALL DEN BEKANNTEN HINZUFÜGT, UND ES IST DER GRUND FÜR DEN EINTRAG:** Die
    bisher protokollierten Fälle erzeugten eine **ABWESENHEIT** — kein Treffer, wo einer
    wäre. **DIESER ERZEUGT EINE AUSGABE, DIE WIE EIN BEFUND ÜBER DEN INHALT AUSSIEHT UND IN
    WAHRHEIT EINER ÜBER DAS INSTRUMENT IST.** „Binary file matches" liest sich wie eine
    Aussage über die Datei; es ist eine über den Schnitt, den man selbst gesetzt hat.
    **DIE REGEL DAZU STEHT UND WIRD NICHT ERSETZT:** docs/immer-beachten.md, „EINE ABWESENHEIT
    KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND". **DIESER EINTRAG IST EIN BELEG,
    KEINE NEUE REGEL** — und ob er dort als Beleg ergänzt wird, ist eine EIGENE Entscheidung;
    docs/immer-beachten.md ist in dieser Runde unberührt.
    **HIER STEHT BEWUSST KEINE ORDNUNGSZAHL, UND DAS IST DER ZWEITE BEFUND DIESES EINTRAGS.**
    Die Vorlage dieser Runde nannte ihn den „fünften Fall … nach `sed -i`, `grep -c $'\r'`,
    `grep -qP '\x00'` und `LC_ALL=C grep -P`". **DIE ZWEI BESTEHENDEN AUFZÄHLUNGEN DIESER
    DATEI ZÄHLEN ABER VERSCHIEDENE MITGLIEDER** — GEMESSEN am Dateitext (CC, 2026-09-04):
    · **VERMERK 10, Abschnitt (h)** nennt sich den DRITTEN Fall, „nach `sed -i` … und `grep`
      ohne `-a`".
    · **VERMERK 11, Abschnitt (e)** nennt sich den VIERTEN, „neben `grep -c $'\r'`
      (Hebungs-Kandidat 6), `grep -qP '\x00'` (Vorrats-Eintrag 33) und `python3`".
    **KEINE DER BEIDEN LISTEN ENTHÄLT DIE ANDERE.** Die Vereinigung trägt SECHS Werkzeuge,
    keine der zwei Ordnungszahlen ist an ihr gemessen, und eine dritte Zahl daneben wäre bei
    der nächsten Ergänzung neu falsch — **dieselbe Bauform, die in dieser Datei mehrfach
    protokolliert kaputtgegangen ist** (s. die Köpfe von „Entscheidungen, die über ihre
    Scheibe hinaus binden" und „Vorrat"). **DIE ZAHL WIRD DESHALB NICHT GESETZT UND DIE
    BESTEHENDEN WERDEN NICHT ANGETASTET:** Sie sind als Aussage über IHRE Liste richtig.
    **WER DIE REIHE JE ZUSAMMENFÜHRT, FÜHRT DIE MITGLIEDER ZUSAMMEN UND NICHT DIE ZAHLEN**
    (docs/immer-beachten.md, „MENGEN — ZWEI REGELN, DIE ZUSAMMENGEHÖREN", Teil (a)).
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Messung, die Text nach Zeichenzahl beschneidet.

52. **DREI COMMITTETE ABSCHNITTE TRAGEN DENSELBEN SAMMEL-PROVENIENZ-SATZ — UND AN KEINEM
    IST ER JE GEPRÜFT WORDEN.**
    **DER BEFUND — GEMESSEN am Dateitext (CC, 2026-09-04, Doku-Runde; Achse: der Wortlaut
    "stammt aus der Aufklärungsrunde" über docs/aktiver-stand.md im Volltext, binärsicher):
    DREI Treffer**, je einer im Zuschnitt zu Schritt 1b-1, im Zuschnitt der Scheibe 1b-2a
    und im Zuschnitt der Scheibe 11.2b. Alle drei tragen dasselbe Konstrukt und alle drei
    dasselbe Datum, den 2026-09-03.
    **DIE MESSUNG LIEF VOR DEM ENTSTEHEN DIESES EINTRAGS, UND SEITHER TRIFFT DIE ACHSE IHRE
    EIGENE BESCHREIBUNG — das gehört dazu, sonst zählt die nächste Runde nach und kommt auf
    VIER:** Der zitierte Wortlaut steht jetzt auch in DIESER Zeile. **Wer nachmisst, zieht
    die Treffer dieses Eintrags ab; die Zahl der Zuschnitte, die das Konstrukt tragen,
    bleibt DREI.**
    **WARUM DAS EIN POSTEN IST UND NICHT EINE STILFRAGE:** Am **VIERTEN** Exemplar
    desselben Konstrukts — im Zuschnitt der Scheibe 1b-2b — ist am 2026-09-04 gemessen
    worden, dass es für **VIER von vier geprüften Angaben NICHT zutraf**; sie stammten aus
    einer anderen Runde (GEMESSEN am Repo, CC, 2026-09-04, Korrektur-Runde). **Das
    Konstrukt hat sich also vermehrt, und an keinem der drei übrigen Exemplare hat es je
    jemand geprüft.**
    **DIE BAUFORM IST DAS EIGENTLICHE, NICHT DIE EINZELNE FUNDSTELLE:** Eine
    Sammel-Provenienz behauptet eine Herkunft über eine **MENGE**, deren Mitglieder sie nie
    einzeln geprüft hat — **sie kann gar nicht anders.** Sie ist damit die einzige
    Provenienz-Form, die bei jedem Zuwachs ihres Abschnitts neu falsch werden kann, **ohne
    dass irgendetwas rot wird.**
    **DIE GRENZE, UND SIE MUSS MIT — ohne sie liest die nächste Runde hier eine
    Fehlerbehauptung, die niemand erhoben hat: OB DIE DREI FALSCH SIND, IST UNGEMESSEN.**
    Gemessen ist ihre **EXISTENZ** und die Falschheit **EINES ANDEREN** Exemplars. **Eine
    Mengen-Aussage wird nicht dadurch wahr, dass ein Mitglied geprüft ist** — es ist
    dieselbe Figur, gegen die dieser Eintrag sich richtet, nur in die andere Richtung.
    **DIE NACHBARSCHAFT IN DIESER DATEI GEHÖRT DAZU, sonst sieht der Posten wie ein
    Einzelfall aus:** Die Köpfe von "Entscheidungen, die über ihre Scheibe hinaus binden"
    und von "Vorrat (gemeldet, nicht gebaut)" führen bereits "UND KEINE SAMMEL-HERKUNFT"
    bzw. "KEINE SAMMEL-DATIERUNG IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK" — **die
    Bauform ist an zwei Listen schon einmal kaputtgegangen und dort abgeschafft worden.**
    An den ZUSCHNITTEN steht sie unverändert.
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob und wie die drei zu korrigieren sind —
    weder eine Prüfung je Angabe noch eine Streichung noch ein Stempel ist hier
    vorgeschlagen.
    TRIGGER: die nächste Runde, die einen dieser drei Abschnitte ohnehin öffnet.
    PROVENIENZ: die drei Fundstellen **GEMESSEN am Dateitext (CC, 2026-09-04,
    Doku-Runde)**, mit Positivkontrolle über zwei bestehende Titel und einer
    Negativkontrolle; die Falschheit des vierten Exemplars **GEMESSEN am Repo (CC,
    2026-09-04, Korrektur-Runde)**; dass die drei deshalb **verdächtig** sind, ist eine
    **ABLEITUNG und keine Messung**.

53. **DER OAUTH-CALLBACK ZIEHT DEN VERSIONS-ZÄHLER NICHT MIT — DER RIEGEL DER SCHEIBE
    1b-2b DECKT IHN DESHALB NICHT.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-05, Gate G4 der Stufe 1 zur Scheibe
    1b-2b):** Der Schreibvorgang der Callback-Route
    (src/app/api/oauth/google/callback/route.ts) ist ein `upsert` mit Konflikt-Auflösung auf
    `(project_id, target)`. Er trifft damit **nicht nur die Erst-Anlage, sondern auch eine
    BESTEHENDE Zeile** — das Neu-Verbinden. Dass dieser Fall real ist, steht in dieser Datei
    bereits: VERMERK 13, Abschnitt (c), zwei Neu-Verbindungen an einem Tag.
    **WAS DARAUS FOLGT:** Verbindet der Betreiber neu, während ein Erneuerungslauf zwischen
    dem Lesen und dem Schreiben steht, schreibt der Callback das Chiffrat **ohne
    Zähler-Sprung**. Der Erneuerungslauf trifft danach seine Bedingung und **überschreibt
    das frisch verbundene Zugangsdatum** mit dem aus dem alten Erneuerungs-Token. **DER
    RIEGEL GREIFT NICHT UND MELDET ERFOLG.**
    **ES IST KEIN ISOLATIONSLECK**, und der Satz steht auch hier zuerst: Kein Tenant sieht
    Daten eines anderen. **DER SCHADEN WÄRE EIN VERLORENER ZUGANG** — dieselbe Klasse, gegen
    die die Scheibe 1b-2b gebaut wird, nur auf einer anderen Naht.
    **WARUM DER POSTEN NICHT IN DIE SCHEIBE 1b-2b GEHÖRT, UND DAS IST SEIN EIGENTLICHER
    INHALT: EIN UPSERT KANN "ALT + 1" GAR NICHT AUSDRÜCKEN, OHNE VORHER ZU LESEN.** Ein
    Zähler-Sprung dort ist damit **keine Zeile, sondern eine andere Bauform** — er verlangt
    eine Lesung vor dem Schreiben und stellt danach dieselbe Frage nach der Rückmeldung noch
    einmal. **Eine eigene Entscheidung mit eigenem Zuschnitt.**
    **WIE WAHRSCHEINLICH DER FALL IST, IST NICHT ERHOBEN** und wird hier nicht geschätzt.
    **Bemerkenswert ist allein:** Der Callback ist die **einzige** Stelle im System, an der
    ein **MENSCH** und ein **VERKEHRSGETAKTETER AUTOMATISMUS** dieselbe Zeile gleichzeitig
    anfassen können.
    **DIE ABGRENZUNG ZU VORRATS-EINTRAG 9 GEHÖRT DAZU, sonst liest die nächste Runde zwei
    Fassungen derselben Sache:** Jener fragt, ob der **ANBIETER** bei der Ausstellung eines
    neuen Zugangsdatums das vorherige entwertet — eine Frage an ein fremdes System, und dort
    ausdrücklich als UNGEMESSEN geführt. **Dieser fragt, ob UNSER eigener zweiter Schreiber
    den Zähler mitzieht.** Zwei verschiedene Gegenstände an derselben Zeile.
    **VORRATS-EINTRAG 9 IST IN DIESER RUNDE NICHT ANGEFASST WORDEN**, und das ist Scope und
    kein Urteil.
    GEMELDET 2026-09-05, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder ein Zähler-Sprung im
    Callback noch ein anderer Riegel dort ist hier vorgeschlagen.
    TRIGGER: **die nächste Arbeit am Schreibpfad der Callback-Route** — dort liegt die
    Bauform, die ein Zähler-Sprung verlangt, und eine Runde, die sie ohnehin öffnet, zahlt
    ihn am billigsten.
    **HIER STEHT BEWUSST KEIN ZWEITER TRIGGER AUS DEM BETRIEB** (etwa "der erste beobachtete
    Fall"): Die Häufigkeit ist nicht erhoben, und niemand beobachtet diese Naht — ein
    erfundener Zeitpunkt liesse den Posten als terminiert aussehen, obwohl er es nicht ist.
    PROVENIENZ: der Code-Befund **GEMESSEN am Repo (CC, 2026-09-05)**; dass daraus ein
    verlorener Zugang folgen kann, ist eine **ABLEITUNG aus dem Kontrollfluss** und
    **keine Messung** — es ist kein solcher Lauf beobachtet worden. Die Einordnung als
    eigener Posten ist eine **ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-05**.

**EIN VERMERK ZUM VORRAT DER PHASE 11.8, KEIN EINTRAG** (2026-08-29): Der dortige
Eintrag 7 — "`decryptSecret` HAT WEITERHIN KEINEN AUFRUFER IM PRODUKTIVCODE" — **IST MIT
DIESER SCHEIBE GEGENSTANDSLOS.** `refreshAccessToken` liest, dechiffriert und zerlegt
eine echte Zeile aus `project_secrets.secret_enc`; der Live-Test hat den Pfad gefahren.
**docs/aktiver-stand-11.8.md WIRD DAFÜR NICHT ANGEFASST.** Der Sonderfall jener Datei —
archiviert, aber nicht verschoben — ist im Verfahren ungeregelt, und ein rückwirkender
Eingriff in eine abgeschlossene Phase wäre eine EIGENE Entscheidung. Sie steht hier
ausdrücklich AUS. Dieser Vermerk ist der einzige Ort, an dem der Sachverhalt festgehalten
ist; wer jene Datei liest, findet dort einen Eintrag, der nicht mehr zutrifft, und
NICHTS, das darauf hinweist.

**EIN ZWEITER VERMERK, KEIN EINTRAG — DIE AUSLEGUNG DES SKILL-KONFLIKTS** (2026-08-29):
Der projekteigene Skill `supabase-doku` verlangt eine Anbieter-Lesung, sobald ein Schema,
eine Policy oder ein Constraint berührt **oder auch nur erfragt** wird. Eine
READ-ONLY-Runde kann sie nicht erbringen: Der Anbieter-Crawl legt gemessenermassen
Dateien an (je Navigation eine `page-*.yml`; GEMESSEN 2026-08-25, festgehalten in
docs/immer-beachten.md).
**DIE AUSLEGUNG (ARCHITEKT, 2026-08-29):** Der Auslöser greift NICHT, wenn die Frage
UNSEREN Constraint betrifft und keine Anbieter-Eigenschaft — es gäbe keine
Anbieter-Angabe, die die Antwort trüge; die Antwort steht im SQL-Editor.
**DASS DIES EINE AUSLEGUNG IST UND KEINE REGELÄNDERUNG, IST DER GANZE ZWECK DIESES
VERMERKS.** Der Wortlaut des Skills ist unberührt, und diese Datei ist nicht der Ort, an
dem er geändert würde (Weg 7: docs/arbeitsweise.md, als Änderungsantrag). **ER STEHT HIER,
DAMIT DIE NÄCHSTE KOLLISION NICHT NEU VERHANDELT WIRD** — sie ist eingetreten, sie wird
wieder eintreten, und ohne eine festgehaltene Auslegung entscheidet sie jede Runde neu und
möglicherweise anders.
**DIE GRENZE:** Sie deckt AUSSCHLIESSLICH den Fall "unser eigener Constraint, keine
Anbieter-Eigenschaft, READ-ONLY-Runde". Sie sagt NICHTS über eine Runde, die baut, und
nichts über eine Frage nach dem VERHALTEN des Anbieters — dort greift der Auslöser
unverändert.
PROVENIENZ: die Kollision GEMESSEN am eigenen Lauf (CC, 2026-08-29); die Auslegung eine
ARCHITEKTEN-FESTLEGUNG desselben Tages, keine Messung.

54. **SIEBEN LOG-ZEILEN IN `token-refresh.ts` TEILEN SICH ZWEI WORTLAUTE — `provider`
    FÜNFMAL, `parse` ZWEIMAL.**
    **GEMESSEN am Repo (CC, 2026-09-05, Korrektur-Runde zum Bau der Scheibe 1b-2b).
    ACHSE:** wörtliche Suche nach der vollständigen Zeichenkette `"[oauth/token-refresh]
    provider"` bzw. `"[oauth/token-refresh] parse"` in `src/lib/oauth/token-refresh.ts`,
    binärsicher und mit Zeilennummern.
    **POSITIVKONTROLLE:** dieselbe Achse liefert für `unknown_target` und `write_threw` je
    **EINEN** Treffer — sie läuft nicht leer und unterscheidet die Vielfachen von den
    Einzelnen. **GEGENPROBE:** ausserhalb dieser Datei kommt keiner der beiden Wortlaute
    vor.
    **DER BEFUND IST ÄLTER ALS DIE SCHEIBE 1b-2b UND VON IHR NICHT VERURSACHT.** Er ist
    beim Auflösen eines DRITTEN Vorkommens derselben Figur aufgefallen — dort standen zwei
    `console.error` unter dem identischen Wortlaut `[oauth/token-refresh] write`, und die
    zwei sind in derselben Runde getrennt worden. **DIESE SIEBEN SIND ES NICHT.**
    **`provider` (fünf Zeilen) TRÄGT FÜNF ANBIETER-ZUSTÄNDE:** Zeitüberschreitung ·
    Netzfehler · ein 5xx · `invalid_grant` · alles Übrige.
    **`parse` (zwei Zeilen) TRÄGT ZWEI LESE-ZUSTÄNDE:** eine fremde Fassung der Nutzlast ·
    eine kaputte Zeichenkette.
    **EINE ABWEICHUNG ZUR EINSCHÄTZUNG IM AUFTRAG, UND SIE GEHÖRT HIERHER, WEIL SIE DIE
    RANGFOLGE UMDREHT — GEMESSEN am Code (CC, 2026-09-05):** Der Auftrag führte `parse` als
    den schärferen Fall. **AM CODE IST ES `provider`.** Die zwei `parse`-Zeilen enden
    **BEIDE** in `dead` und unterscheiden sich nur im `reason` — **dieselbe HANDLUNG**. Die
    fünf `provider`-Zeilen enden in **ZWEI VERSCHIEDENEN Ausgängen**: viermal `retry`,
    einmal `dead`. **DERSELBE WORTLAUT TRÄGT DORT ALSO "NOCHMAL VERSUCHEN" UND "DER KUNDE
    MUSS NEU AUTORISIEREN"** — und genau diese Trennung ist das Kriterium, an dem
    Vorrats-Eintrag 48 seinen Schaden festmacht (Normalvorgang gegen echten Ausfall unter
    einem Wortlaut). **DIE ZWEI ZAHLEN DES AUFTRAGS SIND UNVERÄNDERT RICHTIG**; abweichend
    ist allein die Einordnung, welcher der beiden Fälle schwerer wiegt.
    **ALLE SIEBEN ZEILEN FÜHREN BEREITS EINEN `reason` IN IHRER NUTZLAST**, und das macht
    den Posten nicht kleiner, sondern bestimmt ihn: **Was sie trennt, steht im Feld und
    nicht im Wortlaut** — wer im Log GREPPT oder eine Zeile überfliegt, sieht es nicht.
    **Es ist zeichengenau dieselbe Figur wie in Vorrats-Eintrag 48**, wo derselbe Satz über
    `[capi/resolve] secret unusable` steht.
    **GEMELDET, NICHT GEBAUT. KEINE EMPFEHLUNG** — weder darüber, ob getrennt wird, noch
    wie die Wortlaute dann hiessen.
    **TRIGGER: die nächste Arbeit an den Log-Wortlauten dieser Datei.**

55. **ZWEI WERTE IM EINSTELLUNGS-BLOB WERDEN GEPFLEGT UND VON KEINEM KONSUMENTEN GELESEN.**
    Es geht um `settings.capi.tokenSet` und `settings.capi.trackingKey` — beide unter
    demselben Unterobjekt, beide von denselben Stellen geschrieben.

    **`tokenSet` IST ES HEUTE SCHON. GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde);
    ACHSE:** alle Vorkommen von `getCapiTokenSet` sowie jeder direkte Zugriff auf das Feld
    über `src/`, rekursiv, binärsicher, **Testdateien mitgezählt**. **ERGEBNIS:**
    `getCapiTokenSet` hat **NULL Produktiv-Aufrufer** — es gibt die Definition in
    `src/lib/settings.ts`, sechs Zeilen in deren Testdatei und zwei blosse
    Kommentar-Erwähnungen. **POSITIVKONTROLLE:** dieselbe Achse, auf `getTrackingKey`
    angewandt, fördert dessen fünf Produktiv-Aufrufer zutage; sie läuft nicht leer.

    **DIE FORMULIERUNG "VON NIEMANDEM GELESEN" WÄRE ZU WEIT, UND DIE PRÄZISIERUNG IST DER
    EIGENTLICHE BEFUND DIESES EINTRAGS:** Das Feld **wird** im Produktivcode an zwei
    Stellen gelesen — in `setCapiToken` und in `removeCapiToken` (beide
    src/app/projects/actions.ts) —, aber **beide Male ausschliesslich, um es
    zurückzuschreiben**. **KEIN KONSUMENT LEITET DARAUS EINE ANZEIGE ODER EIN VERHALTEN
    AB.** Wer den weiteren Satz schreibt, behauptet mehr, als die Messung hergibt; wer den
    Unterschied einebnet, hält eine Selbst-Fortschreibung für einen Leser.
    **DER BESTAND BENENNT DIE LAGE SELBST** — der Kommentar an der Karten-Rückmeldung in
    src/components/CodeImporter.tsx hält fest, dass der Wert seit der Oberflächen-Hälfte
    von niemandem mehr gelesen wird, trotzdem stehen bleibt, weil der Server ihn weiter
    schreibt, und dass seine Abschaffung **eine eigene Runde** ist.

    **`trackingKey` WIRD ES MIT DER SCHEIBE "Der Schlüssel kommt aus der Spalte".** Danach
    liest ihn **kein Dokument-Erzeuger** mehr; geschrieben wird er weiterhin an **vier**
    Stellen — der Server-Action beim Setzen, der beim Entfernen und den zwei
    Client-Handlern der Karten-Rückmeldung. **DAS IST EINE ABLEITUNG AUS DEM ZUSCHNITT
    JENER SCHEIBE UND KEINE MESSUNG** — sie ist zum Zeitpunkt dieses Eintrags nicht gebaut.

    **WARUM DIE BEIDEN ZUSAMMEN STEHEN UND NICHT ALS ZWEI EINTRÄGE:** dieselbe Ursache
    (ein server-geschriebener Wert in einem client-besessenen Blob), dieselbe Abräum-Arbeit
    (dieselben vier Schreiber, dieselbe Setzer-Funktion `setCapiState`), und **getrennt
    bearbeitet zieht jede die andere nach** — wer `trackingKey` aus `setCapiState`
    entfernt, steht unmittelbar vor derselben Frage für `tokenSet`, und umgekehrt.

    **WAS DIESER EINTRAG NICHT SAGT:** dass die Werte weg sollen. **Ein toter Wert, der
    weiter geschrieben wird, ist eine dritte Wahrheit** — das ist der Befund. Ob die
    Antwort das Abräumen ist, ob es ein Lese-Verbot ist oder ob er stehen bleibt, ist
    **hier nicht entschieden**.

    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Arbeit am Einstellungs-Blob oder an `setCapiState`.

56. **EINE WARNZEILE IM AUSGELIEFERTEN TEXT SAGT "NICHT KONFIGURIERT" UND STEHT DIREKT ÜBER
    DEM ZEILE, DIE SENDET.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde), Achse: alle `console.warn`
    in `src/lib/tracking/` und `src/lib/generate.ts`, Testdateien ausgenommen;
    POSITIVKONTROLLE: dieselbe Achse trifft die zweite Warnung des Beacon-Bauers, sie läuft
    nicht leer:** `metaTrackStatement` (`src/lib/tracking/meta.ts`) nimmt **zwei** Fragen
    entgegen — ob die Meta-Laufzeit existiert und ob eine Meta-Kennung hinterlegt ist. Fehlt
    die Kennung, erzeugt es die Warnung; existiert die Laufzeit trotzdem, hängt es den
    Feuer-Aufruf **unmittelbar darunter**. **IM ERZEUGTEN TEXT STEHEN BEIDE AUF ZWEI
    AUFEINANDERFOLGENDEN ZEILEN.**

    **DIE GEMESSENE FASSUNG WEICHT VON DER ERSTEN BESCHREIBUNG AB, UND DIE ABWEICHUNG IST
    DER EIGENTLICHE INHALT DIESES EINTRAGS:** Der Satz behauptet **kein falsches Ergebnis**.
    "Meta-Pixel nicht konfiguriert" ist über **Meta** wörtlich wahr, und der Kommentar am
    Symbol sagt das ausdrücklich — er hält seit der achten Scheibe der Phase 11 fest, die
    Zeile sei "kein no-op-Hinweis mehr: der Klick sendet trotzdem, nur eben nicht an Meta".
    **WAS IRREFÜHRT, IST NICHT DER SATZ, SONDERN SEIN ORT.** Wer im Netzwerk-Tab einen
    feuernden Beacon sieht und eine Zeile darüber "nicht konfiguriert" liest, hält
    **entweder** die Warnung für einen Defekt **oder** den Beacon für wirkungslos. Die
    Zeile ist **unvollständig**, nicht falsch: Sie sagt nicht, dass anderswohin gesendet
    wird.
    **DER OWNER IST GENAU DARÜBER GESTOLPERT** (GEMESSEN 2026-09-07, Live-Lauf zur Scheibe
    "Der Schlüssel kommt aus der Spalte").

    **ABGRENZUNG ZU DEN EINTRÄGEN ÜBER MEHRDEUTIGE LOG-WORTLAUTE (48 und 42):** Jene
    betreffen **Betreiber**-Logs auf dem Server — wer sie liest, ist der Betreiber, und die
    Frage ist, ob der Wortlaut die Beobachtung von der Ursache trennt. **DIESE Zeile steht
    im AUSGELIEFERTEN KUNDENTEXT und läuft in der Konsole des BESUCHERS.** Sie hat einen
    anderen Leser, einen anderen Ort und eine andere Einbahnstrasse: Ein Code-Deploy
    erreicht bereits publizierte Seiten nicht.
    **DASS SIE BLEIBT, WAR EINE ENTSCHEIDUNG und ist es weiterhin** — sie zu entfernen war
    schon damals ausdrücklich als zweite Wirkung ausgeschlossen. **DIESER EINTRAG KIPPT SIE
    NICHT**, er hält fest, was ihre Nachbarschaft aus ihr gemacht hat.

    **WAS DIESER EINTRAG NICHT SAGT:** dass die Zeile weg soll, dass sie umformuliert werden
    soll oder dass ein zweiter Satz danebengehört. **BESTAND, nicht von jener Scheibe
    erzeugt.**
    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Arbeit an `metaTrackStatement` oder an den Warn-Wortlauten des
    erzeugten Textes.

57. **EIN BESTANDSLAUF VERGLEICHT ZWEI WEGE GEGENEINANDER UND GEHT AUCH DANN AUF, WENN
    BEIDE NICHTS TRAGEN.**
    Es geht um **D-T9** in `src/components/CodeImporter.test.tsx`, wörtlich: "das
    Publish-Artefakt traegt DENSELBEN Schluesselsatz wie das Export-Dokument".

    **DER BEFUND — GEMESSEN an der Mutationsprobe M1 der Bau-Runde (CC, 2026-09-07):** Bei
    einer Mutation, die den Dokument-Erzeuger wieder über den Einstellungs-Blob lesen liess,
    fielen **SECHZEHN** Läufe. **Vorhergesagt waren SIEBZEHN.** Der eine, der nicht fiel,
    war D-T9 — **und die Abweichung hatte eine benennbare Ursache, keinen Zufall.**

    **DIE URSACHE:** Seine tragenden Zusicherungen sind **RELATIV** — sie halten das
    Publish-Artefakt gegen das Export-Dokument. Trägt **keiner** der beiden Wege einen
    Beacon-Rumpf, liefern beide Leser `null`, und der Vergleich geht auf.
    **SEINE EIGENE VORBEDINGUNG DECKT GENAU DIESEN FALL NICHT.** Sie lautet im Kommentar
    "VORBEDINGUNG, sonst vergliche der Test zweimal 'nichts': beide Wege muessen ueberhaupt
    einen Schluesselsatz tragen" und prüft die **gezogenen** Consent-Schlüssel.
    **WAS SIE DECKT:** dass überhaupt eine Sammel-Ziehung im Text steht.
    **WAS SIE NICHT DECKT:** den **Beacon-Rumpf**. Die Ziehung entsteht bereits aus den
    Pixel-Kennungen und braucht **keinen** Tracking-Schlüssel; das Draht-Feld dagegen
    existiert nur mit ihm. **Die Vorbedingung greift also eine Ebene zu früh.**

    **ES IST KEINE DECKUNGSLÜCKE DER SCHEIBE, DIE IHN GEFUNDEN HAT** — der absolute Fall ist
    dort von einem eigenen Lauf gedeckt. **UND ES IST KEIN DEFEKT AN D-T9:** Was er zu
    prüfen behauptet — dass die zwei Auslieferwege dieselbe Quelle benutzen — prüft er, und
    er ist laut seinem eigenen Kommentar der einzige Lauf im Bestand, der die beiden Wege
    überhaupt gegeneinander hält. **Der Befund betrifft seine REICHWEITE, nicht seine
    Richtigkeit.**

    **WARUM ES ÜBERHAUPT EIN POSTEN IST:** Eine relative Zusicherung sieht wie eine doppelte
    Absicherung aus und ist gegen jeden Fehler blind, der **beide** Seiten gleich trifft.
    Wer künftig eine Mutation ansagt, die den Erzeuger als Ganzes betrifft, sollte wissen,
    dass dieser Lauf sie **nicht** meldet — sonst wird sein Grün als Entwarnung gelesen.
    Es ist dieselbe Denkfigur wie in docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG
    WIRD AUF DREI WEISEN HOHL", zweite Weise (trivial wahr) — nur an einer
    **Gleichheits**-Behauptung statt an einer Abwesenheits-Behauptung.

    **WAS DIESER EINTRAG NICHT SAGT:** wie die Vorbedingung lauten müsste, ob D-T9 eine
    zweite bekommen soll oder ob ein eigener Lauf danebengehört. **NICHT ENTSCHIEDEN.**
    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Mutationsprobe, die den Dokument-Erzeuger als Ganzes trifft,
    spätestens die nächste Arbeit am D1-Block jener Testdatei.

58. **DAS INSTRUMENT DER PRÜFUNG HAT DEN ZUSTAND VERÄNDERT, DEN ES PRÜFEN SOLLTE — EIN
    NACHWEIS-SCHRITT HAT ZWEI UNTRACKED DATEIEN IM WURZELVERZEICHNIS HINTERLASSEN.**
    **DER TITEL NENNT DIE KLASSE UND NICHT DIE DATEIEN, und das ist der ganze Eintrag:** Die
    zwei Dateien sind gelöscht und das Muster ist ergänzt (s. unten). **Was bleibt, ist die
    Figur.**

    **DER VORGANG — GEMESSEN in dieser Sitzung (CC, 2026-09-07):** Ein `git stash`-Rundlauf,
    gefahren als **NACHWEIS-SCHRITT** — er sollte belegen, dass der Arbeitsbaum ausser den
    beabsichtigten Änderungen nichts trägt —, hat **zwei Temporärdateien** im
    Wurzelverzeichnis zurückgelassen. Sie standen als **untracked** im Status, waren
    zusammen **über ein Megabyte** gross, und **ein pauschales Stagen hätte sie
    mitgenommen**. `.gitignore` deckte sie **nicht**.

    **WAS DEN EINTRAG TRÄGT UND NICHT DIE EINZELNE DATEI IST:** Eine Invariante der Form
    "keine Datei angelegt" war **verletzt, bevor jemand hinsah — und zwar durch den Nachweis
    selbst.** Wer den Scope prüft, erzeugt dabei den Befund, den er ausschliessen will. **Der
    Prüfschritt ist damit nicht neutral gegenüber seinem Gegenstand**, und das ist keine
    Eigenheit dieses einen Kommandos.

    **DIESELBE KLASSE IST SCHON EINMAL AUFGETRETEN UND HAT DORT EINE REGEL ERZEUGT** —
    docs/immer-beachten.md, Regel "EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE
    DOKUMENTATION ABSCHNITTSWEISE GELESEN UND DIE BEFUNDE VERORTET SIND", Zusatz vom
    2026-08-20, wörtlich: "**DAS WERKZEUG LEGT BEIM ERSTEN AUFRUF UNGEFRAGT EIN VERZEICHNIS
    IM ARBEITSVERZEICHNIS AN** (BEFUND DES ERSTEN LAUFS, 2026-08-20). Es steht seit dem
    2026-08-20 in `.gitignore` — **DER GRUND GEHÖRT TROTZDEM HIERHER, damit niemand den
    Eintrag für überflüssig hält und entfernt.** Eine Invariante 'keine Datei angelegt' ist
    sonst verletzt, bevor die erste Seite gelesen ist."
    **WAS GLEICH IST:** ein Werkzeug schreibt **ungefragt** in den Arbeitsbaum · die
    Invariante fällt, **bevor** jemand hinsieht · die Antwort war **beide Male** ein
    `.gitignore`-Muster, und beide Male gehört der **Grund** in die Ablage, damit das Muster
    nicht als überflüssig gestrichen wird.
    **WAS NICHT GLEICH IST, und ohne diesen Absatz wird die Abgrenzung nachlässig gelesen:**
    Dort war das Werkzeug ein **fremdes Zusatzwerkzeug** (der Browser des Anbieter-Crawls),
    das jemand bewusst gestartet hat; **hier ist es `git` selbst**, gerufen in einem
    Kommando, dessen erklärter Zweck die **Kontrolle** war. Dort war der Nebeneffekt eine
    **Voraussetzung** der Arbeit, hier eine **Folge der Prüfung**. **Die zweite Lage ist die
    unangenehmere**: Ein Werkzeug, das man startet, hat man im Blick; ein Nachweis-Schritt
    gilt als folgenlos.

    **DIE GRENZE, UND SIE MUSS MIT: DASS DER STASH-RUNDLAUF SIE ERZEUGT HAT, IST EINE
    ABLEITUNG.** Git protokolliert **keinen Erzeuger**. Die Ableitung ruht auf drei
    Beobachtungen: **Zeitgleichheit** (beide Zeitstempel 12:54:11, 274 Millisekunden
    auseinander, also ein Vorgang), **Zweizahl** (genau zwei, wie die zwei geänderten
    Dateien) und **Dateiauswahl** (genau jene zwei).
    **GEMESSEN sind:** die Zeitstempel · die Grössen (397 526 und 650 076 Bytes) · und die
    **Inhalts-Identität mit dem committeten Stand** — beide entsprachen per Prüfsumme ihrer
    verfolgten Datei im damaligen HEAD, weshalb ihr Löschen **keinen** Verlust bedeutete.
    **NICHT GEMESSEN IST DER ERZEUGER SELBST.**

    **WAS DER EINTRAG NICHT SAGT: welche Werkzeuge sonst noch so etwas tun.** Die Frage
    lautet nie "steht es in der Aufzählung", sondern **"schreibt es in den Arbeitsbaum"** —
    dieselbe Zuschnitt-Frage wie in der Werkzeug-Regel zu den Ganz-Datei-Schreibern
    (docs/immer-beachten.md). Eine Aufzählung wäre hier eine zweite Wahrheit, die beim
    nächsten Kommando falsch ist.
    **UND ER SAGT NICHT, DASS DER NACHWEIS-SCHRITT FALSCH WAR.** Er hat belegt, was er
    belegen sollte; **der Befund betrifft seinen Preis, nicht seine Gültigkeit.**

    **WAS IN DERSELBEN RUNDE GEBAUT WORDEN IST — genau EINE Sache, damit der Eintrag nicht
    als offen gelesen wird, wo er es nicht ist:** das Muster `.merge_file_*` in `.gitignore`,
    in der Bauform des Playwright-Eintrags daneben, mit Kommentar. **Alles andere ist
    GEMELDET, NICHT GEBAUT** — insbesondere ist **kein** Prüfschritt geändert und **keine**
    Regel gehoben worden.
    **KEINE EMPFEHLUNG**, ob daraus eine Dauerregel wird und ob der Nachweis künftig anders
    zu führen ist.
    GEMELDET 2026-09-07, NICHT GEBAUT.
    PROVENIENZ: Zeitstempel, Grössen und Inhalts-Identität **GEMESSEN (CC, 2026-09-07)**;
    der Erzeuger ist eine **ABLEITUNG** aus den drei genannten Beobachtungen, **keine
    Messung**. Das Zitat aus docs/immer-beachten.md ist **GELESEN (CC, 2026-09-07)**.
    TRIGGER: der nächste Nachweis-Schritt, der ein Git-Kommando mit Zusammenführung benutzt
    — `stash`, `merge`, `rebase`, `cherry-pick` —, spätestens wenn erneut eine untracked
    Datei nach einer reinen Kontrolle im Status steht.

59. **DIE DREI KLICK-KENNUNGS-PARAMETER — DREI HÄLFTEN EINES THEMAS, UND ES IST NICHTS ZU
    BEHEBEN.**
    **WARUM SIE ZUSAMMENSTEHEN UND NICHT AN DREI ORTEN:** Wer eine davon aufschlägt, braucht
    die anderen zwei, um sie richtig zu lesen. Getrennt abgelegt erzeugen sie **drei Runden
    statt einer** — und die zweite fände die erste nicht mehr.
    **DREI QUELLEN, DREI KENNZEICHNUNGEN, und sie werden hier durchgehend getrennt:** was am
    **CODE** gemessen ist · was am **DATEITEXT DER ABLAGE** gemessen ist · und was eine
    **OWNER-ANGABE** ist. Wer sie einebnet, hält eine Lesung für eine Messung.

    **ERSTE HÄLFTE — VORRATS-EINTRAG 4 STELLT SEINE FRAGE IN DER EINZAHL, UND DIE
    VORAUSSETZUNG TRÄGT NICHT.**
    Der Vermerk vom 2026-09-02 an jenem Eintrag führt als seine Grenze, **WELCHER** der drei
    Namen getroffen hat, und nennt das ungemessen.
    **GEMESSEN AM CODE (CC, 2026-09-07):** Die Auslese-Funktion `extractGoogleClickIds`
    (src/lib/capi/google-click-ids.ts) iteriert über die Konstante der drei Namen und
    sammelt **JEDEN gefundenen** in ein Ergebnis-Objekt; **eine Vorrangregel gibt es nicht.**
    Die Nutzlast-Funktion `pickClickIds` (src/lib/capi/google-payload.ts) kopiert alle drei
    **einzeln**, und der Verwerfungs-Zweig in `buildGoogleEvent` greift **nur bei NULL**
    Kennungen.
    **ACHSE:** alle Vorkommen der drei Parameternamen sowie von `GoogleClickIds` und
    `adIdentifiers` über src/, Testdateien ausgenommen. **POSITIVKONTROLLE:** dieselbe Achse
    trifft **vierundzwanzigmal**; sie läuft nicht leer.
    **FOLGE FÜR DIE EINLIEFERUNG VOM 2026-09-07:** Die Adresse trug **zwei** Parameter
    (OWNER-ANGABE 2026-09-07, an der eigenen Landepage abgelesen), und **BEIDE sind
    gegangen**. **DIE FRAGE HAT KEINE EINZAHL-ANTWORT.**
    **WAS OFFEN BLEIBT UND AM CODE NICHT ENTSCHEIDBAR IST:** welchen der beiden der
    **ANBIETER** zur Zuordnung benutzt hat. Das Log nennt bei Erfolg keinen Namen — es nennt
    im Erfolgsfall gar nichts.
    **VORRATS-EINTRAG 4 WIRD ZITIERT UND NICHT GEÄNDERT**; sein Trigger bleibt wörtlich.
    **UND EINE PRÄZISIERUNG, OHNE DIE DIESER ABSATZ ZU VIEL BEANSPRUCHT:** Die **Hauptfrage**
    jenes Eintrags ist **nicht** "welcher hat getroffen", sondern die **SCHREIBUNG** der drei
    Namen — sein Titel sagt, sie stütze sich auf nichts Gelesenes, und sein Schlussabsatz
    hält das für **ALLE DREI** offen. **DIESE RUNDE SCHLIESST SIE NICHT.** Beantwortet ist
    die Grenze seines Vermerks, nicht die Frage seines Titels.

    **ZWEITE HÄLFTE — DIE AUSSCHLIESSLICHKEIT IST GELESEN WIDERLEGT.**
    Eine **OWNER-ANGABE 2026-09-07 (GELESEN, nicht gemessen)** besagte, der Anbieter erwarte
    **GENAU EINEN** der drei Parameter.
    **GEMESSEN AM DATEITEXT von docs/ziel-befunde.md (CC, 2026-09-07):** **DREI** gelesene
    Stellen sagen **"MINDESTENS EINEN"** — die Fünfer-Liste der Kennungen im Google-Abschnitt,
    die Feld-Aufzählung "AdIdentifiers — ZEHN Felder, **alle Optional**", und das wörtliche
    Anbieter-Zitat "Set at least one of the following: `adIdentifiers` with at least one of
    gclid, gbraid or wbraid". **KEINE sagt "genau einen".**
    **ACHSE:** die Wendungen "genau ein/nur ein … Kennung", `exactly one` und `only one of`
    über docs/ziel-befunde.md. **ERGEBNIS:** kein Treffer, der die drei Klick-Kennungen
    betrifft; **der einzige `exactly one`-Treffer gilt einem ANDEREN Feld** (den
    Kontaktdaten). **POSITIVKONTROLLE:** "mindestens ein" trifft in derselben Datei
    **siebenmal**.
    **WAS DAS NICHT HEISST, UND DER SATZ IST DER WICHTIGERE:** Dass **zwei** Kennungen
    zugleich beim Anbieter **RICHTIG** verarbeitet werden, ist damit **NICHT belegt**. Es ist
    **UNGELESEN und UNGEMESSEN**. Der Code sendet beide; **wie der Anbieter damit verfährt,
    weiss niemand.** Widerlegt ist eine Auflage, nicht bestätigt eine Unbedenklichkeit.

    **DRITTE HÄLFTE — DIE PLATTFORM-ZUORDNUNG IST UNGELESEN.**
    Die **OWNER-ANGABE 2026-09-07** ordnet die zwei Nicht-Standard-Parameter je einer
    Sitzungsart auf einem bestimmten Betriebssystem zu.
    **GEMESSEN AM DATEITEXT (CC, 2026-09-07): docs/ziel-befunde.md nennt beide NUR als
    Feldnamen, NIE mit einer Herkunfts- oder Plattform-Zuordnung.** **NICHT-TREFFER MIT
    BENANNTER REICHWEITE — ACHSE:** die Begriffe des Betriebssystems, "App-zu-Web" und
    "Web-to-App" über docs/ziel-befunde.md. **POSITIVKONTROLLE:** der Feldname `gbraid`
    trifft in derselben Datei **siebenmal**; die Achse läuft nicht leer, sie trifft nur diese
    Zuordnung nicht. **WELCHER der beiden welcher Sitzungsart gehört, ist am Repo NICHT
    ENTSCHEIDBAR.**
    **FÜR DEN CODE IST DAS FOLGENLOS:** Er sendet, was in der Adresse steht, **ohne zu
    wissen, woher es kommt**. Es ist eine **ungelesene Stelle in der Anbieter-Dokumentation
    und keine offene Frage an das Produkt.**

    **DAS ERGEBNIS DER RUNDE, UND ES STEHT AUSDRÜCKLICH DA: ES GIBT NICHTS ZU BEHEBEN.**
    Der Code führt **genau die drei Namen**, die die Ablage als zulässig nennt, und für die
    gemessene Adresse **war die richtige dabei**.
    **DER GRUND IST BEMERKENSWERT GENUG, UM DAZUSTEHEN: WEIL ES KEINE VORRANGREGEL GIBT,
    KANN DER CODE AUCH KEINE FALSCHE TREFFEN.** Ein Vorrang wäre die Stelle, an der man sich
    vertut — **sie existiert nicht. DIE ABWESENHEIT IST HIER DIE SICHERHEIT, NICHT DIE
    LÜCKE.** Wer später eine Vorrangregel einzieht, führt diese Stelle ein.

    **TRANSIT-ONLY IST EINGEHALTEN — GEMESSEN AM CODE (CC, 2026-09-07), auf ZWEI
    UNABHÄNGIGEN ACHSEN.**
    **ACHSE 1:** die drei Parameternamen sowie `GoogleClickIds` und `adIdentifiers` im
    Schnitt mit den Persistenz-Verben (`insert`, `update`, `upsert`, `persist`, Browser-
    Speicher, Cookie, Tabellenzugriff) über src/, ohne Tests. **KEIN Treffer.**
    **POSITIVKONTROLLE:** die Kennungsnamen treffen vierundzwanzigmal, die Persistenz-Verben
    dreizehnmal — **beide Achsen leben, ihr Schnitt ist leer.**
    **ACHSE 2 WAR NÖTIG, UND WARUM, GEHÖRT DAZU: ACHSE 1 HÄTTE DEN PERSIST-PFAD VERFEHLT.**
    Dort steht **keiner** der Kennungsnamen — der Persist sieht nur den Beacon-Rumpf, und die
    Kennung säse in der Adresse darin. Geprüft wurde deshalb der Schreibvorgang **selbst**:
    `persistEvent` (src/lib/analytics/persist.ts) schreibt in die Ereignis-Tabelle **fünf**
    Spalten — Projekt, Ereignistyp, Ereignis-Kennung, Beobachtungsort und Variante. **Das
    Adressfeld ist NICHT darunter.**
    **DIE KENNUNG LEBT DAMIT AUSSCHLIESSLICH IM TRANSIT:** Beacon-Rumpf → Auslese →
    Netzruf. **Nirgends abgelegt.**

    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder zur Ausschliesslichkeit
    noch zur Plattform-Zuordnung noch zu Vorrats-Eintrag 4.
    TRIGGER: **die nächste Arbeit am Google-Adapter** (Auslese der Kennungen, Bau der
    Nutzlast, Verwerfungs-Zweig) **ODER die nächste Anbieter-Lesung am Abschnitt zu den
    Kennungen** — dort sind die zwei ungelesenen Stellen zu holen: ob mehrere Kennungen
    zugleich zulässig sind und wie sie dann behandelt werden, und welche Sitzungsart hinter
    welchem der zwei Nicht-Standard-Parameter steht.
