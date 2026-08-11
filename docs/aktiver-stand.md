# Aktiver Stand — Phase 11 (Multi-Tracking / Server-Side Fan-Out)

Angelegt am 2026-08-11, auf dem Stand von HEAD `102f4a0`. Die Phase läuft; der
Marker in CLAUDE.md, "## Roadmap & aktueller Stand", steht auf `[~]`.

---

## 1. Was diese Datei ist

Der aktive Stand der LAUFENDEN Phase 11 — das, was gerade gilt, nicht das, was
geworden ist.

**PFLICHT-GATE:** Jede Session, die an dieser Phase arbeitet, liest sie ZUERST
("Auftrag 0"). Das ist kein Vorschlag; die Auflage steht in CLAUDE.md,
"## Aktiver Stand — Verfahren ab Phase 10".

**SIE WIRD NICHT AUTOMATISCH GELADEN.** Nur CLAUDE.md ist in jeder Session da;
diese Datei muss aufgeschlagen werden.

**SIE IST KEINE QUELLE FÜR CODEZUSTÄNDE.** Sie nennt Dateien und Symbolnamen als
ORTE, an denen zu messen ist — nie Zeilennummern, nie Signaturen, nie Testzahlen.
Was tatsächlich im Code steht, wird am Repo erhoben, nicht hier abgelesen; für
Schema und Analytics-Lesepfad gilt derselbe Vorrang zugunsten von
`docs/db-stand.md` und der laufenden DB.

**AM PHASENENDE WIRD SIE GEHOBEN, ARCHIVIERT UND GELÖSCHT.** Der Ablauf steht in
`docs/arbeitsweise.md`, "### Phasenende ab Phase 10 (leichte Archivierung)".
Existiert sie nicht, läuft keine Phase.

---

## 2. Wo die Phase steht

**STAND 2026-08-11:** Die Scheibe „Log-Leak am Meta-Adapter" ist ERLEDIGT und live
bestätigt (Abschnitt 3). Der offene Umfang darunter ist davon UNBERÜHRT — jene
Scheibe war eine Härtung am ERSTEN Adapter und kein Posten dieser Liste. Keine
Neubewertung, nur der Stand.

**DIE STRUKTUR IST ERLEDIGT.** Was gebaut, geprüft und live bewiesen ist, steht in
CLAUDE.md an der Phase-11-Zeile; die volle Herleitung in
`docs/claude-history/phase-11-multi-tracking.md`, dort besonders "## Der Einstieg
für die nächste Sitzung" und "## Die zwölf Scheiben". Beides wird hier NICHT
wiederholt.

**DIE OFFENEN ZIELE SIND KEINE KLASSE — SIE WERDEN EINZELN GELESEN.** Bis zum
2026-08-11 stand hier und in CLAUDE.md, die drei offenen Ziele seien
"Wiederholungen desselben Handgriffs, kein neues Fundament". Diese Aussage hatte
KEIN EINZIGES GEPRÜFTES MITGLIED; die Befunde darunter lösen sie je Ziel auf.

**PROVENIENZ DER ZIEL-BEFUNDE — SIE IST NICHT MEHR EINHEITLICH, UND GENAU DAS IST
BEIM LESEN ZU BEACHTEN:**
- **POSTEN 2 UND 3 (LinkedIn, Google): VOLLSTÄNDIG RECHERCHE.** Anbieter-Recherche
  des Architekten vom **2026-08-11 an FREMDER DOKUMENTATION** — **NICHT am Code
  gemessen, NICHT live bestätigt, kein Aufruf gegen ein echtes System.**
- **POSTEN 1 (TikTok): GEMISCHT.** Ein Teil seiner Angaben ist am **2026-08-11
  GEMESSEN** worden (Messweg am Posten selbst), ein Teil bleibt Recherche, ein Teil
  ist ungeklärt. **JEDE EINZELNE ANGABE DORT TRÄGT IHREN RANG IM TEXT** — GEMESSEN,
  RECHERCHIERT oder UNGEKLÄRT. Wer den Rang nicht mitliest, hält eine Handmessung
  für eine Doku-Lesung oder umgekehrt.
- **DIE MESSUNG WERTET DIE ÜBRIGEN ZIELE NICHT AUF.** LinkedIn und Google sind
  unverändert unbelegt; dass ein Nachbar-Posten gemessen wurde, ändert daran nichts.

**DER OFFENE UMFANG, sechs Posten mit VERSCHIEDENEM Rang:**

1. **TIKTOK — AUF DER STRUKTUR-ACHSE EINE WIEDERHOLUNG. DIE EINST OFFENE FRAGE IST
   BEANTWORTET.**
   **DER MESSWEG, einmal für alle mit GEMESSEN gekennzeichneten Angaben dieses
   Postens:** am **2026-08-11 durch den Owner** — HTTP-Aufrufe VON HAND gegen den
   Events-API-Endpunkt des Anbieters, mit echtem Zugangsdatum und Pixel-Kennung im
   EIGENEN Werbekonto, ausschliesslich im TESTMODUS; Nachweis im Test-Ereignis-Tab
   der Anbieter-Oberfläche. **DAS IST EINE MESSUNG AM FREMDEN SYSTEM — NICHT am
   Code gemessen und NICHT über unseren eigenen Ingest-Pfad gelaufen.**
   **SCHÄRFUNG DES MESSWEGS, und sie gehört dazu, weil ohne sie drei Angaben
   falsch geworden wären:** Die Antwort-RÜMPFE wurden mit einem ROHEN HTTP-Werkzeug
   erhoben, nachdem sich das zuvor benutzte PowerShell-Kommando als untauglich
   erwiesen hatte — es verbrauchte den Antwortstrom selbst und lieferte deshalb
   Länge null. Warum das kein Nebensatz ist, steht als Kandidat 13 in Abschnitt 7.
   - **GEMESSEN — DIE OFFENE FRAGE IST BEANTWORTET: IP UND USER-AGENT GENÜGEN.**
     Sie lautete, ob die beiden ALLEIN für einen erfolgreichen Aufruf reichen; bis
     zum 2026-08-11 stand hier, das sei VOR dem Bau zu messen. Ein Aufruf mit einem
     Nutzer-Objekt aus ausschliesslich diesen beiden Werten wurde **ANGENOMMEN UND
     VERARBEITET**: das Ereignis erscheint im Test-Tab mit übereinstimmender
     Ereignis-Kennung, und beide Werte stehen dort unter den
     Kunden-Informationsparametern. **Die Klick-Kennung wird NICHT gebraucht; die
     Datenklassen-Grenze wird nicht berührt.**
     *Warum nicht an der Entwickler-Referenz, wie die frühere Auflage verlangte:*
     Sie liegt hinter einer JavaScript-Anwendung und ist nicht abrufbar. Gemessen
     wurde an der API selbst — **der STÄRKERE Zeuge, weil eine Doku das Verhalten
     BESCHREIBT und die API es IST.**
   - **GEMESSEN — DER FACHLICHE STATUS STEHT IM RUMPF, NICHT IM HTTP-CODE.** Der
     Erfolgsfall ist HTTP 200 mit einem `code`-Feld auf `null`, dazu `message`,
     `request_id` und ein LEERES `data`-Objekt — **keine Rückmeldung je Ereignis**,
     anders als beim zweiten Ziel. **FOLGE FÜR DEN ADAPTER: Eine reine
     Statusprüfung hielte jede fachliche Ablehnung für einen Erfolg.** Dieselbe
     Falle wie beim zweiten Ziel, an einem anderen Anbieter — diesmal VOR dem Bau
     bekannt.
   - **GEMESSEN — DIE QUITTUNG IST IDENTITÄTSBLIND.** Ein Aufruf **GANZ OHNE**
     Nutzer-Objekt bekommt DIESELBE Erfolgsantwort. Die Antwort taugt damit NICHT
     als Nachweis, dass die Identität angekommen ist; das zeigt allein der
     Test-Tab, und der ist **kein Produktionsinstrument**. **Ohne diese Gegenprobe
     wäre der erste Befund aus dem falschen Grund für wahr gehalten worden.**
   - **GEMESSEN — ZWEI GETRENNTE FEHLERKANÄLE.** Ein ungültiges Zugangsdatum
     liefert HTTP 401; Fachliches läuft über das `code`-Feld einer 200er-Antwort.
     *Von den vier Befunden darunter GESCHÄRFT, nicht ersetzt: Es gibt auch echte
     Fehlerstatus mit Rumpf — der Status trennt die Kanäle also gröber, als dieser
     Satz allein nahelegt.*
   - **GEMESSEN — DIE FEHLERFORM IST DIESELBE WIE DIE ERFOLGSFORM:** `code`,
     `message`, `request_id`. Im Erfolgsfall kommt ein leeres `data`-Objekt dazu,
     im Fehlerfall fehlt es. **EIN Rumpf-Leser trägt beide Wege** — einfacher als
     bei beiden bestehenden Adaptern. *Damit ist die frühere Lücke "die RUMPFFORM
     der 401 ist nicht festgehalten" GESCHLOSSEN.*
   - **GEMESSEN — DER HTTP-STATUS TRÄGT DIE FEHLERKLASSE NICHT.** Erhoben wurden
     DREI verschiedene Fehlercodes auf ZWEI Status: ein Berechtigungsfehler zur
     Ereignisquelle kam mit 401, ein Schema-Fehler mit 400, ein Token-Fehler
     ebenfalls mit 401 — **zwei verschiedene Codes teilen sich denselben Status.**
     **FOLGE FÜR DEN ADAPTER: Das `code`-Feld ist die tragende Angabe, der Status
     nur ein grober Vorfilter.** Ein Adapter, der auf den Status verzweigt,
     unterscheidet "falsche Kennung" nicht von "falschem Zugangsdatum". *Damit ist
     auch die frühere Lücke "wie eine FACHLICHE Ablehnung aussieht" GESCHLOSSEN.*
   - **GEMESSEN — DIE MELDUNG SPIEGELT UNSERE EIGENE EINGABE ZURÜCK, WÖRTLICH.**
     Bei einer absichtlich unzulässigen Ereignisquellen-Kennung enthielt die
     Meldung genau den von uns gesendeten Wert im Klartext; bei einem unzulässigen
     Enum-Wert nannte sie die erlaubten Werte. (Der zurückgespiegelte Wert wird
     hier bewusst NICHT abgedruckt — der Sachverhalt trägt ohne ihn.)
     **DAS IST DIE ECHO-ACHSE, GEMESSEN STATT VERMUTET.** Beim ersten Adapter war
     sie eine begründete Annahme; hier ist sie belegt. **FOLGE: Der TikTok-Adapter
     bekommt die Schwärzung VON ANFANG AN, nicht als Nachrüstung.** Die Politik JE
     FELD ist erneut eine EIGENE — nicht vom ersten Adapter abschreiben.
   - **GEMESSEN — DIE DREI FEHLERCODES SIND UNTERSCHEIDBAR, der Betreiber-Fall ist
     damit diagnostizierbar:** falsch eingetragene Kennung und ungültiges
     Zugangsdatum tragen verschiedene Codes UND verschiedene Meldungen. **Ohne
     Rumpf-Leser sähen beide für uns gleich aus.**
   - **GEMESSEN — DER EREIGNISNAME WANDERT.** Gesendet wurde `CompletePayment`, die
     Oberfläche des Anbieters zeigt `Purchase`. Der Betreiber sucht also einen
     anderen Namen, als wir senden — **gehört in die Betreiber-Doku**, sonst meldet
     jemand einen Fehler, der keiner ist. Dieselbe Klasse wie beim zweiten Ziel.
   - **GEMESSEN — DER TEST-TAB BEANSTANDET FEHLENDE FELDER:** Währung, Wert und
     eine Inhalts-Kennung fehlten im Kauf-Ereignis. Währung und Wert trägt unser
     Mapping bereits (`TrackConfig` in `src/lib/mappings.ts`), die Inhalts-Kennung
     nicht.
   - **RECHERCHIERT (fremde Doku, s. Provenienz oben), NICHT gemessen:** eine
     Pixel-Kennung je Projekt trägt alle Ereignisse und der Ereignisname reist in
     der Nutzlast · das Zugangsdatum ist ein langlebiges Token aus dem Events
     Manager und passt in die Geheimnis-Tabelle · es gibt Deduplizierung über eine
     Ereignis-Kennung · es gibt einen Testmodus, dessen Code pro Sitzung WECHSELT
     und deshalb nichts ist, was man hinterlegt.
   - **UNGEKLÄRT — als LÜCKE geführt, NICHT als bestanden.** *Zwei früher hier
     geführte Lücken (Rumpfform der 401, Aussehen einer fachlichen Ablehnung) sind
     durch die Befunde oben GESCHLOSSEN und stehen dort; offen bleibt:*
     der VOLLSTÄNDIGE UMFANG des Fehlercode-Bereichs — drei Codes sind gemessen,
     wie viele es gibt, ist unbekannt · die VOLLSTÄNDIGE LISTE der
     Standard-Ereignisnamen und die Abbildung unserer Namen darauf · **ob
     Ereignisse ohne E-Mail und Telefonnummer für die ATTRIBUTION zählen.** Der
     Test-Tab warnt,
     Ereignisse ohne diese Werte würden "nur mit Manual Advanced Matching gezählt";
     ob damit nur eine ZÄHLUNG gemeint ist oder die Attribution insgesamt, ist **AM
     TEXT NICHT ENTSCHEIDBAR**. Das ist eine Frage an den ANBIETER, keine an den
     Code — und sie entscheidet, ob TikTok dem Betreiber als nutzbar oder als
     eingeschränkt zu beschreiben ist.
   - **RECHERCHIERT, unverändert — eine Erwartungs-Frage an den Betreiber, kein
     Baufehler:** Die Match-Qualität ist mit IP und User-Agent allein strukturell
     niedrig, und sie steuert beim Anbieter den Zugang zu Optimierungszielen.
2. **LINKEDIN — KEINE WIEDERHOLUNG.** Die Kennung ist eine Conversion-Regel-URN
   und gilt **JE EREIGNISTYP**, nicht je Projekt. **OWNER-ENTSCHEIDUNG vom
   2026-08-11:** Zuordnung Ereignisname -> URN (Option B), damit Kunden auf
   Conversion-Typen optimieren können. Das berührt, **WIE EIN EREIGNIS BESCHRIEBEN
   WIRD**, und ist damit eine PRODUKTÄNDERUNG, keine Adapter-Wiederholung.
   Weitere Abweichungen (Provenienz oben): Zeit in MILLISEKUNDEN (Meta: Sekunden) ·
   Betrag als Zeichenkette · Erfolg ist 201 · DREI Fehlerwege mit ZWEI
   verschiedenen Rumpfformen · ein Versions-Header, dessen Wert ein Datum ist und
   der abgeschaltet wird · als Identität nur die IP, NUR IPv4, der User-Agent zählt
   dort nicht · kein Testmodus gefunden — **ein Nicht-Treffer, KEIN Beweis der
   Abwesenheit**.
   Immerhin: das Zugangsdatum ist ein nicht ablaufendes Token aus dem Campaign
   Manager und passt in die Geheimnis-Tabelle.
3. **GOOGLE — ZWEI ZIELE, NICHT EINS, und keines davon zugeschnitten.** Google Ads
   Conversions und GA4 sind verschiedene Produkte mit verschiedenen Schnittstellen
   und Semantiken. Der bisherige Weg für Offline-Conversions ist für NEUE Zugänge
   seit Mitte Juni 2026 geschlossen; der Nachfolger ist für den relevanten Fall
   allowlist-only und verlangt einen OAuth-Fluss mit Verifizierung — also eine
   **AUTORISIERUNGSSCHICHT, keinen Tabelleneintrag**. Der GA4-Weg verlangt eine
   Besucher-Kennung aus einem Cookie, das dieses Produkt nicht setzt, und liefert
   ohnehin keine Ads-Conversion.
   Dazu ein bereits am **2026-08-03** benanntes **SCHEMA-RISIKO**: mehrwertige
   Anmeldungen passen nicht auf ein Geheimnis pro Zeile; im Ernstfall eine ZWEITE
   Migration auf der Geheimnis-Tabelle.
   **FOLGE: Google bekommt eine eigene KONZEPT-Runde, KEINE Scheibe.**
4. **DAS TRACKING-TESTMODUS-MODUL** (`test_event_code`). Klein, eigenständig;
   Kontext in `docs/claude-history/future-roadmap.md`, "Tracking-Testmodus für
   Kunden".
5. **DER TESTKNOPF — KEINE SCHEIBE.** Mehrere einzeln beweisbare Teile plus eine
   unentschiedene VORFRAGE (was überhaupt aufgerufen wird). Ohne deren Antwort hat
   kein Zuschnitt einen Gegenstand. Auflagen, Messbefunde und Begründung:
   `docs/claude-history/phase-11-multi-tracking.md`, "## Die dreizehnte Scheibe —
   Der Testknopf (VERSCHOBEN, Owner 2026-08-10)".
6. **CUSTOM-PIXEL — KEINE WIEDERHOLUNG, SONDERN EINE EIGENE ARCHITEKTUR-SCHEIBE.**
   Ungeklärt ist ZUERST, was es überhaupt ist: ein CLIENT-seitiges Snippet (dann
   gar kein Fan-Out-Ziel) oder ein SERVER-seitiger Empfänger mit kundeneigenem
   Endpunkt (dann hängen Fragen daran, die kein anderes Ziel stellt). Der Zuschnitt
   entsteht NACH dieser Klärung. Ausformuliert an der Phase-11-Zeile in CLAUDE.md.

**ZWEI AUFLAGEN GELTEN FÜR JEDES ZIEL, DAS GEBAUT WIRD, unverändert:** "ein drittes
Ziel erzwingt eine Entscheidung, keine Kopie" steht im Einstiegs-Block der
Historien-Datei; die Auflage, dass jedes weitere Ziel seine EIGENE
Constraint-Erweiterung mitbringt, steht in `docs/db-stand.md`, "## Aktueller
DB-/Analytics-Stand (Ist-Zustand, kein Konzept)", beim CHECK
`project_secrets_target_valid` — dort wird sie gepflegt, im Einstiegs-Block wird
sie nur berichtet.

**VERMERK ZUR DIVERGENZ — er gehört zwingend hierher, und er betrifft seit dem
2026-08-11 ZWEI Stellen desselben Blocks.** Der Einstiegs-Block in
`docs/claude-history/phase-11-multi-tracking.md` führt (1) Custom-Pixel zusammen
mit den drei Zielen als Wiederholung und (2) auch die drei Ziele selbst als
"Wiederholungen desselben Handgriffs". **BEIDES IST ÜBERHOLT.** Der Block wird
trotzdem NICHT korrigiert: Er liegt in einer Historien-Datei, und Historie wird
hier nicht nachträglich umgeschrieben — er ist ein Bericht vom 2026-08-10 und als
solcher richtig. **DIESE Datei steuert.** Wer beide liest, folgt dieser hier.

**DIE ROHFASSUNG HAT DIESER FORMULIERUNG AM 2026-08-03 NAMENTLICH WIDERSPROCHEN —
und der Einspruch stand ACHT TAGE unbeachtet.** In
`docs/claude-history/phase-11-multi-tracking-rohfassung.md`, Abschnitt "## Fragen,
die der Bau beantworten MUSS", Punkt (e), steht: *"Die fünf Ziele sind NICHT fünf
Kopien desselben Musters; jedes bringt eigene Pflichtfelder mit. Die
Roadmap-Formulierung 'additive Fan-Out-Ziele' (CLAUDE.md, Roadmap-Zeile Phase 11)
verdeckt das."* Die zitierte Zeile blieb bis zum 2026-08-11 unverändert.
**WARUM DAS HIERHER GEHÖRT:** Es erklärt, warum die Information im Repo LAG und
trotzdem nicht GEWIRKT hat — sie lag in der Datei, die ausdrücklich als "wird
nicht gepflegt, NICHT der Einstieg" geführt wird, und fehlte in der kuratierten
Fassung. Als Kandidat festgehalten in Abschnitt 7.

---

## 3. Die ABGESCHLOSSENE Scheibe: der Log-Leak am Meta-Adapter

**ERLEDIGT UND LIVE BESTÄTIGT (2026-08-11).** Einstufung: Tier 1 im
Security-Manifest, Item "META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK"
(CLAUDE.md, "### Tier 1 — Vor echtem Ad-Traffic / Spend"; Vollfassung in
`docs/claude-history/security-manifest-full.md`). Gegenstand war
`describeMetaError` in `src/lib/capi/meta-forward.ts`.

**DER ZUSCHNITT STAND BIS HIERHER AN DIESER STELLE ALS ANFORDERUNGSLISTE.** Er ist
mit dem Abschluss ABGELAUFEN und durch diesen Vermerk ersetzt; was er verlangte,
steht jetzt als das, was tatsächlich entstand. Was über die Scheibe hinaus BINDET,
steht in Abschnitt 4 und ist NICHT verdichtet worden.

**WAS GEBAUT WURDE** (Commit `0291448`):

- Der Nicht-JSON-Ausgang gibt den Antwort-Rumpf nicht mehr aus; an seine Stelle
  treten Status, Content-Type und Länge. Der Content-Type ist SELBST Fremdtext
  (eine Kopfzeile ist frei belegbar) und läuft deshalb durch dieselbe Schwärzung.
- Metas Fehlermeldung wird geschwärzt und DANACH gekappt — in dieser Reihenfolge.
- Die enum-artigen Felder (Code, Subcode, Typ) tragen einen harten kurzen Deckel.
- `fbtrace_id` bleibt ungeschwärzt und wird nur längenbegrenzt; Begründung und
  Auflage unverändert in Abschnitt 4 (a).
- Die Schwärzung ist eine EIGENE Fassung, im Code als bewusstes Duplikat samt
  Auflösungs-Bedingung benannt. Der zweite Adapter blieb byte-identisch.
- Der Kommentar, der Metas Fehlermeldung für unbedenklich erklärte, ist ersatzlos
  verschwunden.
- Acht neue Tests, darunter der Echo-Test und sein Zwilling; vier einzeln
  gefahrene Mutationsproben, keine blieb grün.

Fundstellen: `redactOpaque`, `asProviderText`, `asProviderEnum`, `asTraceId` und
`describeMetaError` in `src/lib/capi/meta-forward.ts`; Tests in
`src/lib/capi/meta-forward.test.ts`.

**DER LIVE-TEST — GEMESSEN am 2026-08-11** an der DEPLOYTEN Produktion, mit einem
ERFUNDENEN Geheimnis in einem Wegwerf-Projekt (Messweg: Beacon gegen die
Produktions-URL, Ablesung in den Laufzeit-Protokollen):

- Regression: Projekt ohne Zugangsdaten -> leere 204, Analytics-Zeile entsteht,
  KEINE Meta-Zeile im Log.
- Positivkontrolle des Kanals: `[capi] Meta forward failed: HTTP 400` erschien.
- Befund, zweite Zeile: `code=190 subcode=- type=OAuthException
  fbtrace=AvPfcUKv2bh3UhS0-vNDCXs msg=Invalid OAuth access token - Cannot parse
  access token`
- Das erfundene Geheimnis erschien nirgends.

**DIE FBTRACE-MESSUNG UND WAS SIE BELEGT — 23 Zeichen** (gemessen am selben Lauf):
Das liegt UNTER dem harten Deckel von 64, der Bezeichner kam also VOLLSTÄNDIG
durch — und zugleich ÜBER der Schwärzungs-Grenze von 20. Der Bindestrich gehört
zum Zeichenvorrat der Schwärzung, es ist damit EINE zusammenhängende Folge.
**Ohne die Ausnahme aus Abschnitt 4 (a) stünde dort `<redacted>`.** Die
Entscheidung war eine Abwägung; sie ist jetzt live BELEGT statt nur begründet — im
ersten echten Fehlerfall wäre der einzige Wert verschwunden, mit dem man den
Anbieter-Support ansprechen kann.

**WAS DER LIVE-TEST NICHT GEZEIGT HAT — der wichtigere Teil dieses Vermerks:**

- **DIE SCHWÄRZUNG IST LIVE GAR NICHT ANGESPRUNGEN.** Die gemessene Meldung
  enthielt keine Folge über der Grenze. Der Lauf belegt, dass die DIAGNOSE
  überlebt und nichts regressiert ist — er belegt NICHT, dass die Schwärzung
  wirkt. Das tut allein der Echo-Test in `src/lib/capi/meta-forward.test.ts`.
- **DER BEOBACHTETE FEHLERWEG WAR EIN BESTIMMTER:** der Anbieter konnte das
  Zugangsdatum nicht PARSEN. Ein formal gültiges, aber falsches Geheimnis oder die
  Beanstandung eines anderen Parameters kann anders ausfallen. **EINE BEOBACHTUNG
  IST KEINE ALLAUSSAGE:** Wer daraus "der Anbieter spiegelt nicht zurück" macht,
  liefert die Begründung, diese Massnahme später auszubauen.
- **DER NICHT-JSON-AUSGANG IST LIVE NICHT ERZWINGBAR** — er verlangt eine
  nicht-JSON-Antwort des Anbieters. Er bleibt allein durch die Tests zum
  Nicht-JSON-Ausgang und zum Containment gedeckt: als LÜCKE vermerkt, NICHT als
  bestanden.

**ZU ABSCHNITT 5:** Der describe-Name ist im Bau-Commit nachgezogen; der Satz in
CLAUDE.md wird mit dem unmittelbar folgenden Commit richtiggestellt, beide Achsen
zusammen.

**AUSDRÜCKLICH NICHT IN DIESER SCHEIBE — unverändert offen:** die Kodierung der
Kennung im Endpunkt-Pfad, die Wurffreiheit des Nutzlast-Baus, die dritte
Trimm-Kopie (alle drei im Vorrat, Abschnitt 6), der Testknopf und weitere Ziele
(beide in Abschnitt 2).

---

## 4. Was an Entscheidungen gefallen ist — bindet über die Scheibe hinaus

**(a) OWNER-ENTSCHEIDUNG: `fbtrace_id` BLEIBT UNGESCHWÄRZT, nur hart
längenbegrenzt.** GRUND, und er muss mit: Die belegte Echo-Achse ist der
Query-Parameter, in dem das Zugangsdatum reist; sie endet in der Fehlermeldung und
im Nicht-JSON-Rumpf, **NICHT in einem vom Anbieter erzeugten Trace-Bezeichner**.
Der Fehlschlag, um den es hier geht, ist STILL — wer ihn untersucht, braucht genau
diesen Trace. **AUFLAGE:** Die Ausnahme wird AN DER FUNDSTELLE IM CODE begründet,
und zwar mit DIESEM Grund — **nicht** mit "ist kein Secret". Eine Begründung, die
eine Unbedenklichkeit behauptet, ist genau der Satz, den diese Scheibe an anderer
Stelle ersetzt.

**(b) SCHWÄRZUNG STATT FELD-ALLOWLIST.** Eine Allowlist hilft nur, wenn das
gefährliche Feld ein UNERWÜNSCHTES ist. Hier ist die Fehlermeldung das gefährliche
UND das gewollte Feld — an ihr hängt die Lesbarkeit stiller Ablehnungen. Die
Schwärzung sucht eine FORM, kein bekanntes Geheimnis; sie muss nicht wissen,
wonach sie sucht. Ein Bereiniger, der das Geheimnis kennen müsste, wäre selbst
eine Stelle, an der es verlorengehen kann.

**(c) SECHSTER UNTERSCHIED ZWISCHEN DEN BEIDEN ADAPTERN.** Der zweite hat KEIN
Trace-Feld und schwärzt seine Felder deshalb gleichförmig. **Wer beim ersten
abschreibt, schwärzt ausgerechnet den Wert, dessen ganzer Zweck die
Undurchsichtigkeit ist.** Das reiht sich in die FÜNF bereits benannten Stellen
ein, an denen die Adapter gleich aussehen und es nicht sind (aufgezählt im Kopf
von `src/lib/capi/pinterest-forward.ts`).

**(d) DAS SCHWÄRZ-PRIMITIV WIRD NICHT GETEILT — UMGEKEHRT AM 2026-08-11 nach der
Aufklärung, nicht bloss präzisiert.** Hier stand, es wandere in eine geteilte
Datei, und die bestehenden Tests des zweiten Adapters seien der Wächter dafür,
dass sich dessen Verhalten dabei nicht ändert. **DIESE ZUSAGE TRÄGT NICHT.**

GEMESSEN am 2026-08-11 an `src/lib/capi/pinterest-forward.test.ts` (read-only,
alle Tests der Datei durchgesehen): Der Bestand sichert die Schwärzung als
TATSACHE — eine lange undurchsichtige Folge wird ersetzt — und den Durchlass
kurzer Anbieter-Texte. An SECHS Achsen sichert er NICHTS: die REIHENFOLGE von
Schwärzen und Kappen, die MINDESTLÄNGE, die Behandlung von NICHT-STRINGS, die von
LEERWERTEN, die KAPPUNG selbst und die GLOBALITÄT der Ersetzung.

**DIE SCHWERSTE DAVON IST DIE REIHENFOLGE, und sie allein trägt die Umkehr.**
Beobachtbar wird sie ausschliesslich dort, wo eine undurchsichtige Folge auf der
Kappungsgrenze LIEGT. Wird zuerst gekappt, bleibt von einer Folge, die kurz vor
der Grenze beginnt, ein Rest unterhalb der Mindestlänge stehen — er wird danach
NICHT mehr ersetzt und geht als TEIL-Leak hinaus. In keiner heutigen Fixture
überschreitet eine solche Folge die Grenze, **also lässt eine Vertauschung der
beiden Schritte jeden einzelnen Test grün.** Ein Bruch dieser Art ist genau die
Fehlerklasse, gegen die diese Scheibe gebaut ist.

**DARAUS KEHRT SICH DAS ARGUMENT UM.** Die in dieser Scheibe entstehende Fassung
bekommt Echo-Test, Zwilling und geteilte Mutationsproben und ist damit die BESSER
BEWACHTE. Die ungeschützte zu teilen hiesse, ihr die Autorität eines geteilten
Bauteils zu geben — und der zweite Adapter erbte künftige Änderungen an ihr, ohne
dass irgendetwas rot würde.

**DIE VEREINHEITLICHUNG FÄLLT NICHT WEG, SIE WIRD EINE EIGENE SCHEIBE** — mit
Charakterisierungs-Tests VOR dem Umzug, weil erst die beweisen, dass er nichts
geändert hat. Als Vorrat geführt in Abschnitt 6.

**UNBERÜHRT BLEIBT DIE URSPRÜNGLICHE AUSSAGE DIESES PUNKTES:** Die
Nicht-Zusammenlegung der FEHLERDEUTUNG gilt unverändert weiter; (a) und (c) sind
ihr Beleg. Die POLITIK — welches Feld wie behandelt wird — bleibt je Adapter
eigen, und sie ist nachweislich verschieden.

**(e) SIEBTER UNTERSCHIED: DER LEERWERT IST BEIM ZWEITEN ADAPTER EINE
VERZWEIGUNG, KEINE FORMATIERUNG.** Sein Bereiniger liefert für Nicht-Strings und
für Leerwerte einen Ersatzwert, und genau gegen diesen Ersatzwert entscheidet der
zweite Adapter, OB überhaupt eine Warn-Zeile entsteht. **Ein geteiltes Primitiv
hätte die Verzweigung des einen Adapters zur Eigenschaft des anderen gemacht:** Wer
den Ersatzwert im geteilten Werkzeug änderte, verschöbe drüben einen
Kontrollfluss, nicht eine Darstellung — und keiner der Tests, die dort etwas
behaupten, trüge diesen Zusammenhang im Namen. Der Punkt reiht sich in die fünf im
Kopf von `src/lib/capi/pinterest-forward.ts` benannten Stellen und in (c) ein; es
sind jetzt sieben.

---

## 5. Was beim Abschluss dieser Scheibe mitzuziehen ist

**ZWEI BELEGE SIND FALSCH. Sie werden im Abschluss-Vermerk richtiggestellt — in
EINEM Zug mit dem Bau, wenn sie dadurch wahr werden; nicht vorher, nicht in einer
eigenen Runde.** (Die Regel dahinter: eine Regel kann gültig bleiben, während ihr
Beleg falsch wird — CLAUDE.md, "## Immer beachten".)

- **CLAUDE.md, "## Immer beachten", Eintrag "CAPI-TOKEN UND PIXEL-/DATASET-ID SIND
  EIN PAAR":** Der Schlusssatz dieses Eintrags nennt das Ops-Logging **"sanitized"**
  und verortet es in der **Ingest-Datei**. Beides ist zu prüfen und
  richtigzustellen — die Bereinigung gegen den Bestand an
  `src/lib/capi/meta-forward.ts` (`describeMetaError`), der Ort gegen die Naht, die
  seit der vierten Scheibe dort liegt. **Zwei Achsen, ein Satz** — wer nur eine
  korrigiert, macht die andere zur Falle.
- **`src/lib/capi/ingest.persist.test.ts`:** Der `describe`-Block zum
  Meta-Ablehnungs-Logging trägt dieselbe unzutreffende Zusage im NAMEN. Ein
  Testname, der eine Garantie behauptet, die sein Test nicht deckt, lädt dazu ein,
  eine Achse für gedeckt zu halten.

---

## 6. Vorrat — gemeldet, nicht in dieser Scheibe

Je ein Satz, Datei und Symbolname. **Keine Bewertung, kein Fix.**

- **KODIERUNG DER KENNUNG IM ENDPUNKT-PFAD:** `forwardToMeta` in
  `src/lib/capi/meta-forward.ts` setzt die Kennung anders in den Pfad ein als
  `forwardToPinterest` in `src/lib/capi/pinterest-forward.ts`.
- **WURFFREIHEIT DES NUTZLAST-BAUS:** Bei `forwardToMeta` liegt der Nutzlast- und
  URL-Bau ausserhalb des umschliessenden `try`; beim zweiten Adapter hält dieselbe
  Zusage an der ANORDNUNG.
- **DRITTE TRIMM-KOPIE:** `asString` steht in `src/lib/capi/ingest.ts`,
  `src/lib/capi/meta-forward.ts` und `src/lib/capi/pinterest-forward.ts`.
- **ABWESENHEITS-TEST OHNE EIGENE POSITIVKONTROLLE:** in
  `src/lib/capi/ingest.timeout.test.ts` der Test, der die schnelle Antwort prüft —
  seine Behauptung über den Log-Kanal steht ohne Nachweis, dass dieser Kanal im
  selben Lauf etwas fangen würde.
- **ZWEI UNABHÄNGIGE KONSTANTEN DESSELBEN WERTES FÜR DIESELBE AUFGABE:**
  `META_ERROR_MSG_MAX` in `src/lib/capi/meta-forward.ts` und `PINTEREST_LOG_MAX` in
  `src/lib/capi/pinterest-forward.ts`.
- **SECHS UNGEDECKTE ACHSEN AM SCHWÄRZ-PRIMITIV DES ZWEITEN ADAPTERS**
  (`sanitizeProviderText` in `src/lib/capi/pinterest-forward.ts`): Reihenfolge,
  Mindestlänge, Nicht-Strings, Leerwerte, Kappung, Globalität — Kandidat für eine
  EIGENE Scheibe mit Charakterisierungs-Tests VOR einer späteren Vereinheitlichung.
- **EIN TESTNAME BEHAUPTET DIE SCHWÄRZUNG FÜR EIN FELD, DAS SEINE FIXTURE NICHT
  DECKT:** `T12b` in `src/lib/capi/pinterest-forward.test.ts` nennt `error_message`
  und `warning_message`, seine Fixture trägt nur `warning_message`.
- **EINE KONSTANTE DECKT FÜNF FELDER AB:** `META_SHORT_MAX` in
  `src/lib/capi/meta-forward.ts` gilt für Code, Subcode, Typ, Trace-Bezeichner und
  Content-Type — wer sie für eines anhebt, hebt sie für alle; heute richtig, weil
  alle fünf kurz sind, aber eine Kopplung, die niemand bemerkt, bis eines sie
  sprengt.
- **DER NICHT-JSON-AUSGANG IST LIVE NICHT ERZWINGBAR** (er verlangt eine
  nicht-JSON-Antwort des Anbieters) und bleibt damit dauerhaft eine
  Test-only-Achse.

Die vier fälligen Punkte am ersten Adapter und das Gegenstück bei den
Deckelwerten stehen ausformuliert in
`docs/claude-history/phase-11-multi-tracking.md`, "## Der Arbeitsvorrat — vier
fällige Punkte am ersten Adapter" — hier nur der Zeiger, keine Kopie.

---

## 7. Hebungs-Kandidaten aus dieser Scheibe

**SIE WERDEN JETZT NICHT GEHOBEN.** Die Hebung nach CLAUDE.md, "## Immer beachten",
ist Sache des PHASENENDES — hier stehen Kandidaten, keine Auswahl. Je Kandidat ein
Satz, der Beleg aus dieser Scheibe und die Prüfung, ob eine bestehende Regel ihn
schon abdeckt (geprüft am 2026-08-11 durch Durchsicht von "## Immer beachten").

1. **EINE KAPPUNG IST KEINE MASKIERUNG:** Sie behält den ANFANG und begrenzt die
   LÄNGE, nicht den INHALT — ein Geheimnis am Anfang überlebt sie vollständig.
   *Beleg:* Beide Kappungen auf dem Meta-Fehlerpfad standen jahrelang da und haben
   nie etwas geschützt; die Aufklärung musste das erst herausarbeiten.
   *Abdeckung:* KEINE bestehende Regel sagt das.
2. **ERST SCHWÄRZEN, DANN KAPPEN:** Die umgekehrte Reihenfolge erzeugt ein
   TEIL-Leak bei einer Zeile, die bereinigt AUSSIEHT — ein Rest unterhalb der
   Mindestlänge entgeht der Schwärzung.
   *Beleg:* Mutationsprobe M3 fällt an genau einem Test; in keiner Bestands-Fixture
   des zweiten Adapters wäre sie aufgefallen.
   *Abdeckung:* KEINE bestehende Regel sagt das.
3. **EIN KOMMENTAR, DER ÜBER FREMDES VERHALTEN UNBEDENKLICHKEIT BEHAUPTET, IST
   KEINE EIGENSCHAFT DES CODES** — und er kann eine Schutzmassnahme aufhalten.
   *Beleg:* "Metas message ist Beschreibungstext (kein Secret)" stand über dem
   Feld, das den Leak trug, und las sich wie eine geprüfte Zusage.
   *Abdeckung:* TEILWEISE, aber auf einer anderen Achse — "EINE REGEL KANN GÜLTIG
   BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD" behandelt alternde Angaben über den
   EIGENEN Code; hier geht es um eine nie belegte Angabe über einen FREMDEN Dienst.
4. **EINE ABWESENHEITS-FIXTURE, DIE NICHTS DURCHSICKERBARES ENTHÄLT, MACHT IHRE
   BEHAUPTUNG TRIVIAL WAHR.**
   *Beleg:* Keine Meta-Fixture liess die Anbieter-Antwort das Zugangsdatum
   zurückspiegeln; die vorhandenen "kein Token im Log"-Zusicherungen konnten den
   Echo-Fall gar nicht fangen.
   *Abdeckung:* NAHE DRAN — "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN
   HOHL" führt unter (2) "SIE IST TRIVIAL WAHR", meint dort aber eine Vorbedingung
   TIEFER IM PFAD. Dies wäre eine VIERTE Weise (die Fixture selbst trägt den
   Gegenstand nicht) und gehört als Fall in jene Regel, nicht als eigene daneben.
5. **EINE SCHWÄRZUNG NACH FORM TRIFFT AUCH DAS, WAS FORMGLEICH UND GEWOLLT IST.**
   Die Ausnahme braucht dann einen EIGENEN NAMEN (kein Schalter-Argument) und einen
   EIGENEN TEST.
   *Beleg:* Der live gemessene Trace-Bezeichner ist 23 Zeichen lang und wäre von
   derselben Regel gefressen worden, die das Geheimnis fängt.
   *Abdeckung:* KEINE bestehende Regel sagt das.
6. **EIN LEAK-TEST WIRD NIE MIT EINEM ECHTEN GEHEIMNIS GEFAHREN.** Das Instrument
   trüge sonst genau den Schaden, den der Test verhindern soll: Hat die Massnahme
   ein Loch, IST der Beweis dafür der eingetretene Verlust. Ein formbasierter
   Schutz sieht ein echtes und ein formgleiches erfundenes Geheimnis ohnehin als
   DIESELBE Eingabe — der echte Wert misst denselben Pfad, nur mit
   Schadenspotenzial. Was ein echtes Geheimnis zusätzlich erreichte, sind TIEFERE
   Fehlerklassen des Anbieters; diese Beobachtung hat aber keinen Konsumenten,
   solange der Schutz nach FORM und nicht nach WISSEN arbeitet, und sie stellt sich
   im echten Betrieb von selbst ein.
   *Beleg:* Der Live-Lauf vom 2026-08-11 erreichte nur die Parse-Ablehnung; die
   Signatur-Ablehnung wäre nur mit einem echten Zugangsdatum erreichbar gewesen.
   *Abdeckung:* KEINE bestehende Regel sagt das.

**AUS DER AUFLÖSUNG DER "WIEDERHOLUNGEN" (2026-08-11), drei weitere Kandidaten:**

7. **EINE MENGEN-AUSSAGE WIRD NICHT DADURCH RICHTIG, DASS MAN EIN FALSCHES
   MITGLIED ENTFERNT.** Wer eine Menge korrigiert, prüft die VERBLEIBENDEN
   Mitglieder — sonst wird die Aussage präziser statt wahr.
   *Beleg:* Die Custom-Pixel-Korrektur vom 2026-08-11 nahm ein Mitglied heraus und
   zog sieben Fundstellen nach, ohne die drei übrigen zu prüfen; von diesen dreien
   trägt eines die Aussage nur halb und eines gar nicht.
   *Abdeckung:* NAHE VERWANDT, aber eine andere Achse — "WER EINE HÄLFTE EINER
   AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE" spricht von ZWEI Angaben in EINEM
   Satz; hier geht es um die MITGLIEDER einer Menge.
8. **EINE NICHTERWÄHNUNG IST KEINE ENTWARNUNG.** Hatte eine Prüfung EINEN
   Gegenstand, sagt sie über die übrigen nichts — auch nicht implizit.
   *Beleg:* Aus "nur LinkedIn bricht die Hülle" wurde geschlossen, TikTok passe.
   Die Auflage jener Prüfung lautete wörtlich, der Entwurf werde GEGEN DIE
   LINKEDIN-HÜLLE geprüft; über TikTok stand dort nie ein Hüllen-Befund.
   *Abdeckung:* KEINE deckt sie. Zwei stehen daneben: "EINE ABWESENHEITS-BEHAUPTUNG
   WIRD AUF DREI WEISEN HOHL" (über Tests) und "EINE ANLEITUNG, DIE EINE
   VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE ENTWARNUNG" (über Anleitungen) —
   keine über den GELTUNGSBEREICH einer Prüfung.
9. **ZWEIMAL IN FOLGE LAG DIE TRAGENDE AUSSAGE IN DER DATEI, DIE ALS "WIRD NICHT
   GEPFLEGT, NICHT DER EINSTIEG" GEFÜHRT WIRD** — und fehlte in der kuratierten
   Fassung. Das ist ein Befund über das KURATIONS-KRITERIUM, nicht über die
   Rohfassung.
   *Beleg:* der LinkedIn-Block (g)/(h) und der namentliche Einspruch gegen die
   Roadmap-Formulierung in (e); beide fehlen in
   `docs/claude-history/phase-11-multi-tracking.md`.
   *Abdeckung:* KEINE Regel sagt das. Der Zeiger auf die Rohfassung in CLAUDE.md,
   "## Detail-Archiv", nennt sie als Rückfall, "wenn man dort etwas VERMISST" — er
   sagt nichts darüber, WAS bei der Kuration verlorengeht.

**AUS DER BERICHTS-LÜCKE UND DER TIKTOK-MESSUNG (2026-08-11), zwei weitere:**

10. **EIN VERWEIS AUF DEN EIGENEN, NOCH NICHT FERTIGEN BERICHT IST EINE
    TATSACHENBEHAUPTUNG ÜBER EIN ARTEFAKT, DAS IM MOMENT DER BEHAUPTUNG NOCH NICHT
    EXISTIERT** ("steht oben", "s. Abschnitt X", "im Anhang"). Es ist die einzige
    Behauptungsklasse, die strukturell ungeprüft bleibt: Für alles andere gilt, dass
    eine Behauptung an ihrem Gegenstand geprüft wird — hier ist der Gegenstand der
    noch nicht abgeschickte Text.
    *Beleg:* Der Bericht zu Commit `b64a953` verwies auf einen Volltext-Diff, der im
    Antworttext nie stand. Vier andere Nachweise waren da (Scope,
    Überschriften-Identität, Hunk-Zahl, Secret-Probe) — und der einzige, den ein
    Review braucht, fehlte. **Ein Review, das aus Kennzahlen statt aus dem
    Gegenstand besteht, findet nicht statt; es sieht nur so aus.**
    *Die zwei Auswege:* Belege INLINE statt per Verweis — oder ein Abgleich der
    Umfangs-Ansage gegen den FERTIGEN Text, bevor er hinausgeht.
    *Abdeckung:* TEILWEISE. Die Vorlage-Regel ("DIFF-VORLAGE = GEZIELTE
    VERIFIKATION") kennt das Instrument ("Der Bericht beginnt mit einer
    UMFANGS-ANSAGE … damit ein fehlender Abschnitt beim LESEN auffällt") und einen
    verwandten Fall ("Nie als Datei-Anhang (kommt leer an)"). Sie benennt aber NICHT
    die Behauptungsklasse selbst und nicht, dass die Umfangs-Ansage GEGEN den
    fertigen Text zu prüfen ist statt gegen den Auftrag.
11. **EINE ERFOLGSQUITTUNG KANN BLIND SEIN FÜR DAS, WAS MAN MISST.** Antwortet ein
    fremdes System mit und ohne den gemessenen Bestandteil IDENTISCH, belegt seine
    Quittung nichts über diesen Bestandteil — es braucht eine Gegenprobe, die ihn
    weglässt.
    *Beleg:* Die Antwort des Anbieters war mit und ohne Nutzer-Objekt identisch;
    ohne die Gegenprobe wäre "IP und User-Agent genügen" aus dem falschen Grund für
    wahr gehalten worden.
    *Abdeckung:* KEINE deckt sie. Zwei stehen daneben, beide auf anderer Achse:
    "EINE VORBEDINGUNG, DIE AUCH DER ALTE ZUSTAND ERFÜLLT, IST KEINE VORBEDINGUNG"
    spricht von einem SELBSTGEWÄHLTEN Anker im Test, hier geht es um die Antwort
    eines FREMDEN Systems, auf die niemand Einfluss hat; "EINE
    ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL" spricht ausdrücklich von
    TESTS, hier von einer LIVE-MESSUNG.

**AUS DEN TIKTOK-FEHLERWEGEN (2026-08-11), zwei weitere — der erste ist der
wichtigste dieser Sitzung:**

12. **EIN MESSERGEBNIS ZÄHLT ERST, WENN IM SELBEN LAUF EIN AUFRUF MITLÄUFT, VON DEM
    MAN WEISS, WIE ER AUSGEHEN MUSS.** Ein Ergebnis, das aus ZWEI Gründen so
    aussehen kann wie beobachtet, ist kein Ergebnis, sondern eine Frage.
    *Beleg — FÜNF Fälle an EINEM Anbieter an EINEM Tag, alle mit derselben
    Ursache:* eine Nichterwähnung wurde als Entwarnung gelesen · eine
    Erfolgsquittung wurde für einen Identitäts-Nachweis gehalten, bis die
    Gegenprobe OHNE Nutzer-Objekt dieselbe Antwort lieferte · eine Probe lief mit
    einem Zugangsdatum, dessen Gültigkeit ungeprüft war, und mass etwas anderes als
    beabsichtigt · drei Fehler-Rümpfe schienen leer, weil das Werkzeug den
    Antwortstrom verbraucht hatte · zwei Fehlerarten schienen ununterscheidbar,
    weil derselbe Leser beide Male nichts lieferte.
    **IN VIER VON FÜNF FÄLLEN HAT ERST EINE KONTROLLE MIT BEKANNTEM SOLL-AUSGANG
    DEN FEHLER GEZEIGT** — nicht der Verdacht, nicht die Wiederholung.
    *Abdeckung — und die Frage "dieselbe Regel in weiterem Geltungsbereich oder
    eine eigene?" beantworte ich mit: EINE EIGENE.* Die Denkfigur ist dieselbe wie
    in "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL" und in der
    Mutations-Lektion "EIN WÄCHTER, DER ÜBERWIEGEND ABWESENHEIT PRÜFT, BRAUCHT EINE
    EIGENE POSITIVKONTROLLE" — aber beide adressieren einen Wächter im EIGENEN
    Code, den man selbst schreibt und dessen Kontrolle man in dieselbe Testdatei
    legt. Hier sind Instrument UND Gegenstand FREMD: Die Kontrolle muss im selben
    LAUF gegen dasselbe fremde System gehen, und ihr Soll-Ausgang muss VORHER
    feststehen, weil man ihn nicht herstellen kann. Am nächsten steht die
    Live-Test-Lektion "EIN GROBES LIVE-TEST-INSTRUMENT REISST OFT DIE VORAUSSETZUNG
    DESSEN MIT, WAS ES PRÜFEN SOLL" — die spricht vom INSTRUMENT, diese vom
    fehlenden MITLAUFENDEN NACHWEIS. *Kandidat 11 ist ein Sonderfall von diesem
    hier, Kandidat 8 teilweise; wer 12 hebt, prüft, ob 11 darin aufgeht.*
13. **EIN WERKZEUG KANN EINEN BEFUND ERZEUGEN, DEN DER GEGENSTAND NICHT HERGIBT.**
    Ein HTTP-Leser, der den Antwortstrom vorher selbst verbraucht, liefert einen
    leeren Rumpf — **ununterscheidbar von einem Anbieter, der keinen sendet.**
    *Beleg:* Dieselben drei Aufrufe lieferten mit einem rohen Werkzeug Rümpfe von
    117, 137 und 142 Bytes.
    **FOLGE, die mitmuss: Wo ein Messergebnis eine ABWESENHEIT ist, wird das
    WERKZEUG GEWECHSELT, bevor die Abwesenheit als Befund gilt.**
    *Abdeckung:* KEINE deckt sie. Die nächste ist die Werkzeug-Regel "sed -i
    STRIPPT IN DIESER UMGEBUNG STILL DAS CR" — sie handelt davon, dass ein Werkzeug
    den GEGENSTAND still verändert; hier verändert es das ERGEBNIS, ohne den
    Gegenstand anzufassen. Verwandt, gegenläufig, nicht dasselbe.
