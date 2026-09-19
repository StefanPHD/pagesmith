# Phase 11.6 — Custom-Pixel: DER AKTIVE STAND

**WAS DIESE DATEI IST:** der steuernde Stand der laufenden Phase 11.6 — das, was jeweils
gilt, nicht das, was geworden ist. Sie heisst `docs/aktiver-stand.md` und behält diesen
Namen bis zum Phasenende; an ihm hängt der Verfahrensslot ("existiert sie nicht, läuft
keine Phase — oder die Phase steht in ihrer ersten Aufklärung").

**SIE IST AB JETZT DAS PFLICHT-GATE ("Auftrag 0") JEDES BAU- UND AUFKLÄRUNGS-PROMPTS
DIESER PHASE.** Sie wird ZUERST gelesen — vor dem Plan, nicht während des Baus.

**IHR VORRANG IST ENG UND GILT NUR NACH INNEN:** Wo sie einer FRÜHEREN Fassung aus DIESER
Phase widerspricht, gilt sie. **Gegenüber docs/immer-beachten.md und docs/arbeitsweise.md
hat sie KEINEN Vorrang** — jene Dateien stehen über ihr, und eine Standdatei kann eine
Dauerregel weder lockern noch überschreiben.

**ANGELEGT AM 2026-09-19**, mit der ersten Tatsache der Phase: dem Bericht der
Aufklärungs-Runde desselben Tages. Das ist der vorgesehene Zeitpunkt
(docs/arbeitsweise.md, Die Standdatei, "Wann sie entsteht": "sobald die erste Tatsache der
Phase einen Ort braucht — in der Regel mit dem Ergebnis der ersten Aufklärung"; GELESEN,
CC, 2026-09-19).

**STAND NACH DER SCHEIBE 11.6a (2026-09-19):** ZWEI Vermerke (P11.6-1 Aufklärung,
P11.6-2 die gebaute Scheibe) · **SECHS** bindende Entscheidungen (P11.6-1 bis P11.6-6) ·
die fünf Designfragen sind **BEANTWORTET** und tragen je ihren Zeiger · VIER
Vorrats-Einträge · KEIN Hebungs-Kandidat.
**GEBAUT UND LIVE BESTÄTIGT IST DIE SCHEIBE 11.6a** (Bau-Commit `bc001f4`); der Marker der
Roadmap-Zeile 11.6 steht weiterhin auf `[ ]` — er gehört zum Phasenende, nicht zur
Scheibe.

**WAS ABGELAUFEN IST — VERDICHTET AM 2026-09-19.** Hier stand die Liste der Fragen, die
die Designrunde offengelassen und an den Zuschnitt der ersten Bau-Scheibe weitergereicht
hat. **ALLE ELF SIND MIT `bc001f4` ENTSCHIEDEN UND GEBAUT**, die Liste hat damit keinen
Gegenstand mehr. Sie lautete, wörtlich und ohne Marke: „Ablage und Längengrenzen, die
Persistenz der Ereigniszeile, der Weg des Schlüssels `custom` in die Schlüsselmenge, der
Feuerpfad ohne Meta, die Gestalt der Kapselung, der Lader, die nachgeholte Einwilligung,
das Verhalten in der Vorschau, die Byte-Gleichheit und die Oberfläche."
**WO DIE ANTWORTEN JETZT STEHEN:** die bindenden in den Entscheidungen P11.6-5 und
P11.6-6, die übrigen im Code und in seinen Wächtern — und zwar dort, wo sie wirken, nicht
hier. **Der Satz „KEINE Scheibe zugeschnitten, KEINE Zeile Code geschrieben" ist mit
demselben Commit falsch geworden und ist gestrichen.**

**EINEN ABSCHNITT „Zuschnitt der Scheibe 11.6a" HAT DIESE DATEI NIE GETRAGEN, und das
gehört hierher statt in einen Bericht, der niemanden mehr erreicht:** Der Zuschnitt stand
ausschliesslich in den Prompts der Bau-Runden. Was über die Scheibe hinaus bindet, ist von
dort in die Entscheidungen P11.6-5 und P11.6-6 gehoben worden, BEVOR gebaut wurde; was nur
jene Scheibe anwies, ist mit ihr abgelaufen und in keiner Datei verlorengegangen, weil es
nie in einer stand. **WER BEIM PHASENENDE EINEN ABGELAUFENEN ZUSCHNITT SUCHT, SUCHT HIER
VERGEBENS** — und das ist ein Befund über diese Phase, keine Auslassung.

**DIE NUMMERNFORM IST `P11.6-n`** und wird hier weder neu entschieden noch neu begründet:
Sie ist seit dem 2026-09-17 Bauform JEDER Standdatei (docs/arbeitsweise.md, Die
Standdatei: "Jede Nummer trägt das Präfix ihrer Phase: `P<Phase>-n`, Buchstabe vorn";
GELESEN, CC, 2026-09-19). Vermerke, Entscheidungen, Vorrats-Einträge und
Hebungs-Kandidaten zählen unabhängig voneinander.

---

## Abschnitts-Verzeichnis

Jeder Eintrag ist der wörtliche Anfang seiner Überschrift, ohne Marke — damit "lies
Abschnitt X plus das Verzeichnis" eine belegbare Aussage über den Umfang ist. Eine
Überschrift steht in dieser Datei damit ZWEIMAL, und die erste Fundstelle ist der
Verzeichnis-Eintrag (docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN
EINER DATEI MIT VERZEICHNIS NICHT). Wer bearbeitet, ankert entsprechend.

1. Abschnitts-Verzeichnis
2. Gegenstand und Ausgangslage
3. Was den Zuschnitt bindet
4. Entscheidungen, die über ihre Scheibe hinaus binden
5. Die offenen Designfragen
6. Wie diese Datei fortgeschrieben wird
7. Vermerke
8. Vorrat — gemeldet, nicht gebaut
9. Hebungs-Kandidaten

---

## Gegenstand und Ausgangslage

**GEGENSTAND DER PHASE:** Der Betreiber soll ein eigenes Tracking-Snippet einbringen
können, das Pagesmith LÄDT und je Click&Connect-Aktion mit einer Ereigniszeile BEDIENT —
statt dass er es blind in sein HTML klebt, wo es heute ungegatet und unverdrahtet läuft.

**DIE VORFRAGE DER ROADMAP-ZEILE IST ENTSCHIEDEN** (Entscheidung P11.6-1 unten): Es ist
Lesart **(a)**, das CLIENT-seitige Snippet. Lesart (b) — ein SERVER-seitiger Empfänger mit
kundeneigenem Endpunkt — ist an die Phase 13 verwiesen. Der Zuschnitt entsteht damit ab
jetzt; die Roadmap-Zeile 11.6 hielt ihn bis dahin zurück ("DER ZUSCHNITT ENTSTEHT ERST
NACH DIESER KLÄRUNG").

**DIE AUSGANGSLAGE — FÜNF BEFUNDE, ALLE GEMESSEN AM REPO (CC, 2026-09-19, Aufklärungs-Runde
desselben Tages).** Sie stehen hier verdichtet; die Achsen, Positivkontrollen und die
vollständige Herleitung stehen im Bericht jener Runde, der in keiner Datei liegt — was
davon weiterträgt, steht hier.

**(a) EIN SNIPPET IM IMPORTIERTEN HTML LÄUFT HEUTE SCHON — UNGEFILTERT UND AM GATE VORBEI.**
Drei Achsen, alle Nicht-Treffer mit benannter Reichweite: **kein Sanitizer** auf dem Pfad
(weder `annotateAndDetect` in `src/lib/detect.ts` noch `generateFunctional` in
`src/lib/generate.ts` entfernt `<script>`; beide sind reine DOMParser-Rundläufe) · **keine
CSP** (Suche über `src/` und `next.config.ts`: null Treffer; `src/app/app-serve/route.ts`
nennt den Grund wörtlich — "KEIN striktes CSP (bräche Pixel/Beacon der gehosteten Seite)")
· **kein Sandkasten auf der ausgelieferten Seite** (`sandbox="allow-scripts"` steht
ausschliesslich an den zwei Editor-Rahmen in `src/components/CodeImporter.tsx`).
Das bestätigt die ältere Messung vom 2026-08-04, die als Backlog-Eintrag "IMPORTIERTES HTML
KANN BELIEBIGE SKRIPTE MITBRINGEN, AM CONSENT VORBEI" (docs/claude-history/backlog-polish.md)
geführt wird.
**DAS IST DER BEFUND, DER DEN NUTZEN DIESER PHASE DEFINIERT:** Die FÄHIGKEIT existiert
bereits; was fehlt, ist VERDRAHTUNG und EINWILLIGUNG.

**(b) META IST DAS EINZIGE ZIEL MIT EINEM BROWSER-TAG.** Suche nach jeder `https://…`-Adresse
in den Erzeugern des ausgelieferten Textes: GENAU EIN Treffer,
`https://connect.facebook.net/en_US/fbevents.js` in `src/lib/tracking/meta.ts`
(`buildMetaRuntime`). Gegenprobe auf `pinterest|tiktok|linkedin|google|gtag|ttq|pintrk`
über dieselbe Menge: drei Treffer, alle in Prosa-Kommentaren, keiner in einem erzeugten
String. **Pinterest, TikTok, LinkedIn und Google haben ausschliesslich den Server-Forward.**
FOLGE FÜR DEN ZUSCHNITT: Ein Betreiber-Snippet wäre der ZWEITE Browser-Tag-Fall des
Systems, nicht der sechste — und `src/lib/tracking/meta.ts` weist sich im Kopf als
ISOLIERTE Einheit aus, "damit Plattform #2 … als PARALLELE Einheit dazukommt, ohne diese
anzufassen — KEINE generische Registry, solange nur Meta existiert".

**(c) ES GIBT KEINEN EREIGNIS-HAKEN FÜR FREMDEN CODE.** `CustomEvent`, `dispatchEvent` und
`dataLayer` kommen im Produktivcode NULLMAL vor (Positivkontrolle: `addEventListener`
trifft vier Dateien); die einzigen `postMessage`-Treffer sind die Editor-Brücke
(`src/lib/detect.ts`, `src/components/CodeImporter.tsx`), die eine ausgelieferte Seite nie
erreicht. **Und strukturell:** `__psMetaFire`, `__psMetaInit`, `__psConfirm` und die
geteilte Ereignis-Kennung liegen INNERHALB der IIFE von `buildWiringScript`
(`src/lib/generate.ts`) — sie stehen an keinem globalen Objekt und sind von fremdem Code
auf derselben Seite nicht erreichbar.
GLOBAL sind heute nur: `window.__psConsent` / `window.__psConsentAll`
(`src/lib/tracking/consent.ts`), der Betreiber-Hook `window.pagesmithConsent`, sowie bei
eingeschaltetem Dialog `window.__psPageView`, `window.__psConsentStore` und
`window.pagesmithConsentRevoke`.

**(d) DER EINWILLIGUNGS-NAMENSRAUM IST AUS DEN FAN-OUT-ZIELEN ABGELEITET.**
`ALL_CONSENT_KEYS` (`src/lib/tracking/consent-targets.ts`) ist
`[...TRACKING_TARGETS.map((t) => CONSENT_KEY_BY_TARGET[t]), ANALYTICS_CONSENT_TARGET]` —
sechs Werte. **Ein Schlüssel für etwas, das KEIN `TrackingTarget` ist, kann aus dieser
Ableitung nicht entstehen.** Und er MUSS in dieser Menge stehen, sonst ist er für immer und
lautlos abgelehnt: Der Docblock jener Ableitung sagt es wörtlich ("ein Schlüssel, der hier
fehlt, lässt sich später NIE auf `true` setzen. Er bliebe für immer abgelehnt, lautlos").
**DER BESTAND HAT DIESE FOLGE VORHERGESAGT UND NICHT ENTSCHIEDEN:**
docs/claude-history/future-roadmap.md, Abschnitt "Session-Analyse-Werkzeuge auf
Kundenseiten", DREI OFFENE FRAGEN, Punkt 1 ("der Namensraum ist dann breiter als der
Fan-Out … Welche Namen das sind, wird HIER bewusst nicht festgelegt") und Punkt 2 (der
Schlüssel `"custom"` sei "als EIN Schlüssel beschlossen", aber "ein Feld für BELIEBIGEN
Code fällt dort nicht selbstverständlich hinein"). **`"custom"` ist beschlossen und NICHT
gebaut** — GEMESSEN: der Wert kommt in `ALL_CONSENT_KEYS` nicht vor.

**(e) DER EXPORT-PFAD WIRKT NUR ÜBER DEN CLIENT-ERZEUGER, UND NUR BEI NICHT LEERER TABELLE.**
Beide Export-Knöpfe (`handleExportDownload`, `handleExportCopy` in
`src/components/CodeImporter.tsx`) rufen ausschliesslich
`generateFunctional(html, mappings, "export", …)`. `injectPageViewEmitter`
(`src/lib/analytics/pageview-emitter.ts`) hat im Produktivcode **genau einen Aufrufer:
`publishProject`** (`src/app/projects/actions.ts`). Was dort entsteht — PageView-Emitter,
Dialog, Wiederherstellung, Setzer, Widerruf — fehlt im Export vollständig.
Zusätzlich: ist die Mapping-Tabelle im Export-Modus leer, entsteht **gar kein Script**
(`injectScripts = mode !== "export" || table.length > 0` in `src/lib/generate.ts`).
**FOLGE FÜR DEN ZUSCHNITT:** Ob ein Betreiber-Snippet auf einer exportierten Seite
überhaupt ankommt, entscheidet allein, WELCHER der beiden Erzeuger es baut — nicht
"Client gegen Server".
Der bestehende offene Punkt "DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST"
(docs/offene-punkte.md) beschreibt dieselbe Naht und ist von dieser Phase NICHT gelöst.

---

## Was den Zuschnitt bindet

**(B1) DIE SANDBOX-REGEL BLEIBT UNBERÜHRT.** docs/immer-beachten.md: "Importierter
User-Code läuft NUR im sandboxed iframe (sandbox="allow-scripts", niemals
allow-same-origin), nie ungesandboxt." Sie gilt dem EDITOR-Rahmen und steht in dieser
Phase nicht zur Disposition. Die ausgelieferte Seite ist davon nicht berührt (sie ist ein
eigenes Dokument auf der Kunden-Domain) — wer das zusammenzieht, hält eine geltende Regel
für gebrochen.

**(B2) DIE EINBAHNSTRASSEN-REGEL IST DER SCHÄRFSTE ZUSCHNITT-ZWANG DIESER PHASE.**
docs/immer-beachten.md, "WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE —
NACHLEGEN GEHT, HERUNTERNEHMEN NICHT": ein globaler Name in ausgeliefertem Code ist ein
KONTRAKT, und es gibt keinen Sammel-Weg zum Neu-Veröffentlichen. **Entscheidung P11.6-1
zieht daraus ihre Folge** (kein neuer globaler Name).

**(B3) JEDER BETREIBER-WERT IM SCRIPT-ROHTEXT LÄUFT ÜBER `embedInScript`.**
docs/immer-beachten.md, "JEDER BETREIBER-WERT, DER IN SCRIPT-ROHTEXT GEHT, LÄUFT ÜBER DEN
EINBETTUNGS-HELFER — `JSON.stringify` ALLEIN MASKIERT KEIN `<`". **OB UND WIE SIE AUF
BETREIBER-CODE GREIFT, IST OFFEN und steht als Designfrage (5) unten** — sie ist für WERTE
formuliert, und ein Snippet ist kein Wert. Wer sie ungeprüft anwendet, maskiert den Code
und macht ihn unausführbar; wer sie ungeprüft übergeht, lässt ein `</script>` jeden
umgebenden Block verlassen. Die Datei `src/lib/script-embed.ts` trägt die Kontext-Grenze
in ihrem Docblock.
**BEANTWORTET AM 2026-09-19 — DER ABSATZ DARÜBER BLEIBT WÖRTLICH STEHEN, SEIN "IST OFFEN"
TRIFFT NICHT MEHR ZU:** Entscheidung P11.6-5, Teil (3), setzt, dass der Betreiber-Code als
STRING über `embedInScript` reist und erst am Zielort gekapselt ausgeführt wird. **DIE
REGEL GREIFT ALSO** — und die Sorge "maskiert den Code und macht ihn unausführbar" ist
ausgeräumt: Das Escape lebt im QUELLTEXT des Blocks, der zur Laufzeit gelesene String
trägt wieder das echte Zeichen. Was dieser Absatz weiterhin richtig sagt, ist die zweite
Hälfte: Ein roh eingesetztes `</script>` verliesse jeden umgebenden Block — genau deshalb
gibt es den Transport als Wert.

**(B4) EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY.**
docs/immer-beachten.md, gleichnamige Regel, und ihre Folge "EIN NEUES FAN-OUT-ZIEL LÄUFT
BEI BESTEHENDEN SEITEN FAIL-CLOSED AN, UND EIN DEPLOY HEILT DAS NICHT". Jede Scheibe
dieser Phase fragt, was mit den bereits veröffentlichten Seiten geschieht, und nennt ein
Neu-Veröffentlichen als PFLICHT-SCHRITT der Live-Anleitung, wo es nötig ist.

**(B5) NICHTS ÜBER DIESE LAUFENDE PHASE GEHT IN CLAUDE.md.** Dort steht allein die
Stub-Zeile mit ihrem Marker (docs/arbeitsweise.md, Die Standdatei).

---

## Entscheidungen, die über ihre Scheibe hinaus binden

**SAMMELVERMERK — NICHT GEHOBEN 2026-09-19 (Phasenende 11.6).** Alle SECHS Entscheidungen
bleiben hier; keine wird als Dauerregel nach docs/immer-beachten.md gehoben, und das ist
eine Entscheidung mit Grund, keine Auslassung: **Sie beschreiben, WIE der Code DIESER Phase
gebaut ist** — welche Lesart gewählt wurde, wo das Feld liegt, wie der Schlüssel heisst,
wann der Lader urteilt. Projektweit ist davon nichts. Eine Regel daraus beschriebe einen
Gegenstand, den es genau einmal gibt.
**ZWEI DESTILLATE SIND TROTZDEM ENTSTANDEN, und sie stehen je bei ihrer Quelle:** aus
P11.6-5 Teil (3) zusammen mit P11.6-6 Teil (a) die Dauerregel über BETREIBER-CODE im
ausgelieferten Text, aus dem Bau des Laders und P11.6-6 die Dauerregel über das
`DOMParser`-Dokument mit ausgeschaltetem Skripting. **Die Regel ist das Destillat, nicht
ihr Ersatz** — beide Entscheidungen stehen hier wörtlich weiter, je mit einem Zeiger
"→ GEHOBEN 2026-09-19".

### ENTSCHEIDUNG P11.6-1 — CUSTOM-PIXEL IST LESART (a): EIN CLIENT-SNIPPET

**DIE ENTSCHEIDUNG:** Pagesmith **LÄDT den Basis-Code des Betreibers** und **führt je
Click&Connect-Aktion eine Ereigniszeile aus** — und zwar **INNERHALB des eigenen
Klick-Codes**. **KEIN neuer globaler Name.**

**LESART (b) IST NICHT VERWORFEN, SONDERN VERWIESEN:** Ein SERVER-seitiger Empfänger mit
kundeneigenem Endpunkt gehört **an die Phase 13 (E-Mail-/ESP-Webhooks)**. Sie ist die
Phase, die ohnehin einen ausgehenden Aufruf an eine betreiber-konfigurierte Adresse
vorsieht; dort fallen die drei Fragen zusammen an, statt zweimal einzeln.

**DIE GRÜNDE, VIER, je mit ihrem Befund:**
1. **DER NUTZEN VON (a) IST VERDRAHTUNG UND EINWILLIGUNG, NICHT DIE FÄHIGKEIT.** Ein
   Snippet im importierten HTML läuft heute schon — ungefiltert und am Gate vorbei
   (Ausgangslage (a)). Die Phase fügt nichts hinzu, was der Betreiber nicht könnte; sie
   macht steuerbar, was er ohnehin tut. Dieselbe Einordnung führt bereits der Bestand:
   docs/claude-history/backlog-polish.md verweist auf
   docs/claude-history/future-roadmap.md, "dort steht dieselbe Messung als Begründung
   dafür, dass ein Custom-Script-Feld **Schadensbegrenzung** wäre und **keine neue
   Fähigkeit**".
2. **(b) HÄTTE SSRF-SCHUTZ VERLANGT.** Heute gibt es im Produktivcode KEINEN ausgehenden
   Aufruf, dessen HOST aus einer Nutzer-Eingabe stammt — alle fünf Adapter, die zwei
   OAuth-Aufrufe und die drei Vercel-Aufrufe tragen einen festen Host; Betreiber-Eingabe
   erreicht ausschliesslich Pfadsegmente (GEMESSEN, CC, 2026-09-19). Es gibt deshalb auch
   keinen Schutz — **keine Lücke, sondern eine Abwesenheit ohne Gegenstand.** (b) schüfe
   die Angriffsfläche und brächte die Schutzfrage mit.
3. **(b) HÄTTE DIE EIN-EMPFÄNGER-ANNAHME AN SIEBEN STELLEN UMGEBAUT.** GEMESSEN am Repo
   (CC, 2026-09-19): die Eindeutigkeit `project_secrets_project_id_target_key`
   (`supabase/migrations/0025_project_secrets_schema.sql`) · der CHECK
   `project_secrets_target_valid` (`…/0026_project_secrets_google.sql`) · das
   `upsert(onConflict: "project_id,target")` in `src/app/projects/actions.ts` · die
   ziel-geschlüsselte `Map<string, RowResolution>` im Resolver (`src/lib/capi/token.ts`) ·
   `ProjectSettings.pixels` als `Partial<Record<TrackingTarget, …>>`
   (`src/lib/settings.ts`) · `TARGETS_WITH_ADAPTER` / `FORWARDER_BY_TARGET`
   (`src/lib/tracking/target-adapters.ts`, `src/lib/capi/ingest.ts`) ·
   `CONSENT_KEY_BY_TARGET` und `LEGACY_CONSENT_ROLE`
   (`src/lib/tracking/consent-targets.ts`).
4. **(b) HÄTTE EIN DYNAMISCHES NUTZLAST-MAPPING OHNE BEKANNTES ZIELSCHEMA GEBRAUCHT — UND
   AUF EXPORTIERTEN SEITEN EINE BELIEFERUNG OHNE EINWILLIGUNGS-WIRKUNG.** Der Beacon geht
   dort an die absolute `/api/e`-Adresse, aber Dialog und Setzer fehlen; ohne gesetzten
   Hook antwortet `__psConsentAll` für alle Schlüssel `true` (Ausgangslage (e), und der
   offene Punkt "DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST").

**WAS SIE BINDET:** jede Scheibe dieser Phase. Ein Zuschnitt, der einen ausgehenden Aufruf
an eine betreiber-konfigurierte Adresse vorsieht, hat den Gegenstand verfehlt und gehört
in die Phase 13.

**WAS SIE NICHT ENTSCHEIDET:** die fünf Designfragen unten — insbesondere nicht, ob es ein
freies Snippet-Feld oder kuratierte Felder gibt, und nicht die Form der Ereigniszeile.

**WANN SIE KIPPT:** wenn sich zeigt, dass der Nutzen von (a) ohne einen Server-Empfänger
nicht einzulösen ist. Das ist heute nicht der Fall und auch nicht gemessen.

**PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-19**, übermittelt über den Prompt dieser Runde;
am Repo nicht anderweitig belegt. Die vier Gründe ruhen auf den Messungen der
Aufklärungs-Runde vom 2026-09-19 (CC), je wie oben benannt.

### ENTSCHEIDUNG P11.6-2 — DIE EINWILLIGUNG FOLGT DER BESTEHENDEN HALTUNG

**DIE ENTSCHEIDUNG:** **OHNE gesetzten Hook feuern Snippet und Ereignisse bedingungslos.**
**MIT eingeschaltetem Dialog ordnet sich das Snippet in eine Gruppe ein.**

**SIE ERFINDET NICHTS, SIE ÜBERTRÄGT:** Die Doktrin des Produkts lautet unverändert, dass
ohne Einwilligungs-Dialog ALLE Ziele als erlaubt gelten — getragen davon, dass ein nicht
gesetzter Betreiber-Hook den Draht mit allen Schlüsseln auf `true` füllt
(`window.pagesmithConsent === undefined` → alle erlaubt, `src/lib/tracking/consent.ts`).
Ein Snippet, das heute ohnehin ungegatet läuft, wird durch diese Phase also nicht
freizügiger behandelt als zuvor — nur bei EINGESCHALTETEM Dialog gewinnt es eine Schranke,
die es vorher nicht hatte.

**WAS SIE AUSDRÜCKLICH NICHT ENTSCHEIDET — UND WAS DESHALB EINE DESIGNRUNDE BRAUCHT:**
**WELCHE Gruppe** ("Messung" oder "Werbung", `CONSENT_GROUP_KEYS` in
`src/lib/tracking/consent-choice.ts`) und **WELCHER Schlüssel**. Beides ist offen.
**DIE DESIGNRUNDE IST AM 2026-09-19 GELAUFEN — DER SATZ DARÜBER BLEIBT WÖRTLICH STEHEN,
SEIN "Beides ist offen" TRIFFT NICHT MEHR ZU:** Entscheidung P11.6-5, Teil (2), setzt den
Schlüssel `custom` und die Gruppe "Werbung", beides FEST. Die drei Auflagen darunter
gelten unverändert und sind damit nicht erledigt, sondern FÄLLIG.

**WAS BEIM BAUEN UNAUSWEICHLICH IST, SOBALD DIE DESIGNRUNDE ENTSCHEIDET** (GEMESSEN am
Code, CC, 2026-09-19; kein Vorgriff auf die Entscheidung, sondern die Auflage, die JEDE
Antwort trägt):
- Der Schlüssel MUSS in `ALL_CONSENT_KEYS` stehen, sonst ist er für immer und lautlos
  abgelehnt (Ausgangslage (d)).
- Die Gruppe "Werbung" ist heute die ABLEITUNG "alles ausser `analytics`" — ein neuer
  Schlüssel landete dort STILL. Dagegen steht ein Wächter: **G0 in
  `src/lib/tracking/consent-bar.test.ts` hält beide Gruppen LITERAL und wird bei jedem
  neuen Schlüssel rot.**
- Die Schreibweise des Schlüssels ist eine EINBAHNSTRASSE
  (`src/lib/tracking/consent-targets.ts`: "Ein publizierter Text trägt sie, und ein
  Code-Deploy erreicht ihn nicht").

**PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-19**, übermittelt über den Prompt dieser Runde;
am Repo nicht anderweitig belegt. Die drei Auflagen sind GEMESSEN am Code (CC, 2026-09-19).

### ENTSCHEIDUNG P11.6-3 — DIE SNIPPET-EINGABE IST FREI, NICHT KURATIERT

**DIE ENTSCHEIDUNG:** **EIN Feld, beliebiger Basis-Code, beliebig viele Netzwerke darin.**
Keine Auswahlliste, keine Kennungs-Felder je Anbieter.

**DER GRUND, ZWEI HÄLFTEN:** **keine Limitierung** — der Betreiber bringt mit, was er
mitbringt, auch ein Netzwerk, das wir nie gesehen haben; und **keine Nachpflege je
Netzwerk** — ein kuratiertes Feld verlangt, dass wir das Snippet jenes Anbieters kennen,
erzeugen und bei jeder Änderung seiner Seite nachziehen.

**DIE RICHTUNG IST DIE EIGENTLICHE AUSSAGE: KURATIERTE FELDER SIND SPÄTER ADDITIV
MÖGLICH, UMGEKEHRT NICHT.** Ein freies Feld nachträglich zu entfernen, weil kuratierte
Felder es ersetzen sollen, trifft jede Seite, die es schon benutzt — und ein
ausgeliefertes Artefakt erreicht kein Deploy (docs/immer-beachten.md, "WAS EINMAL IM
AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE"). Die Reihenfolge ist damit nicht
Geschmack, sondern die einzige, die sich revidieren lässt.

**SIE BEANTWORTET DESIGNFRAGE (F1) ZUGUNSTEN DES NOTAUSGANGS** — und der Bestand hat
diese Gestalt bereits benannt und mit einer Auflage versehen, die HIER WEITERGILT:
docs/claude-history/future-roadmap.md, ARCHITEKTUR-EINORDNUNG, "**Die Tür wird als Tür
geführt, nicht als dritte gleichrangige Option.** Wer sie im UI gleichrangig neben die
kuratierten Felder stellt, verwischt genau den Unterschied, der ihre Existenz
rechtfertigt." Heute gibt es keine kuratierten Felder daneben; die Auflage wird scharf,
sobald es sie gibt.

**WAS SIE NICHT ENTSCHEIDET:** die Längengrenze, die Ablage-Form und die Oberfläche.

**PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-19**, übermittelt über den Prompt dieser Runde;
am Repo nicht anderweitig belegt. Die Auflage aus der future-roadmap ist GELESEN (CC,
2026-09-19).

### ENTSCHEIDUNG P11.6-4 — DAS CONVERSION-EREIGNIS HÄNGT AN DER AKTION, NICHT AM PROJEKT

**DIE ENTSCHEIDUNG:** An der **Track-Aktion** steht ein **optionales Feld "eigener Code"**.
Was dort steht, wird beim Klick auf genau dieses Element ausgeführt.

**DER GRUND IST DER KERN-LOOP, NICHT DIE TECHNIK:** Click&Connect soll **ohne
Programmierkenntnis** bedienbar bleiben. Der Betreiber kopiert die Ereigniszeile aus der
Dokumentation seines Netzwerks an die Aktion, die sie auslösen soll — er muss nicht
wissen, wie Ereignisse verteilt werden, und er braucht keine Bedingung über Elemente zu
formulieren.

**DER PREIS WIRD MITGENANNT UND IST AUSDRÜCKLICH IN KAUF GENOMMEN:** Bei mehreren Knöpfen
mit demselben Ereignis steht dieselbe Zeile mehrfach da. **Copy-Paste je Aktion ist
gewollt, kein Mangel** — wer das später "aufräumt", indem er Ereignisse projektweit
zuordnet, nimmt dem Betreiber die Fähigkeit, zwei Knöpfe verschieden zu behandeln, und
baut genau die Konfigurationstiefe, die "Marketer-Mindset: Geschwindigkeit und 1 Klick
über Konfig-Tiefe" (CLAUDE.md) ausschliesst.

**SIE BEANTWORTET DESIGNFRAGE (F4) AUF DER ORTS-ACHSE UND NUR DORT:** Die Zeile hängt an
der Aktion. WAS sie zur Laufzeit sehen kann — Ereignisname, Wert, Währung, die geteilte
Ereignis-Kennung — ist damit nicht entschieden und gehört in den Zuschnitt.

**PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-19**, übermittelt über den Prompt dieser Runde;
am Repo nicht anderweitig belegt.

### ENTSCHEIDUNG P11.6-5 — VIER SETZUNGEN, DIE DEN ZUSCHNITT BINDEN

**DIE ENTSCHEIDUNG, VIER TEILE. Sie gehören zusammen, weil jede einzeln für sich
plausibel ist und erst zusammen den Zuschnitt festlegen.**

**(1) EIN SNIPPET-FELD JE PROJEKT; BEIDE A/B-VARIANTEN TEILEN ES. Die EREIGNISZEILEN
hängen je Aktion — und damit je Variante.** Das ist keine Inkonsequenz, sondern folgt der
bestehenden Naht: Der Einstellungs-Blob ist **projektweit** und wird von BEIDEN
Speicherwegen geschrieben (`saveProject` und `saveVariantB` tragen beide `settings` im
Payload, GEMESSEN am Code, CC, 2026-09-19 — `saveVariantB` begründet das ausdrücklich:
"das Einstellungs-Panel … ist variant-UNABHAENGIG sichtbar und editierbar"), während
`mappings` und `mappings_b` **getrennte Spalten** sind. Der Basis-Code eines Netzwerks ist
projektweit; welches Ereignis ein Knopf auslöst, ist es nicht.
**DIE FOLGE, DIE MITMUSS:** Wer in Variante B eine Track-Aktion anlegt, bekommt ihre
Ereigniszeile NICHT automatisch in Variante A. Das ist dieselbe Trennung, die für
Ereignisname und Wert schon heute gilt.

**(2) DER EINWILLIGUNGS-SCHLÜSSEL HEISST `custom` UND LIEGT FEST IN DER GRUPPE
"WERBUNG".** Er beantwortet Designfrage (F3) und löst den Schlüssel ein, den
docs/claude-history/future-roadmap.md als "beschlossen" führt und der nie gebaut wurde
(Ausgangslage (d)).
**"FEST" HEISST: DIE ZUGEHÖRIGKEIT IST ENTSCHIEDEN UND BEZEUGT — ES HEISST AUSDRÜCKLICH
NICHT, DASS EINE ZWEITE LISTE ENTSTEHT.** Die Unterscheidung ist tragend, weil die
naheliegende Lesart gegen eine ältere bindende Entscheidung liefe: Entscheidung (4) der
Phase 11.5 setzt, dass `CONSENT_GROUP_KEYS` **AUS `ALL_CONSENT_KEYS` ABGELEITET wird, NIE
AUS EINER ZWEITEN LISTE** (`src/lib/tracking/consent-choice.ts`, Docblock; GELESEN, CC,
2026-09-19). **DIE ABLEITUNG BLEIBT.**
Was die Entscheidung leistet, ist das, wofür jene Ableitung ihren Wächter hat: Die Gruppe
"Werbung" ist die Ableitung "alles ausser `analytics`" — ein neuer Schlüssel landete dort
STILL. **G0 in `src/lib/tracking/consent-bar.test.ts` hält beide Gruppen LITERAL und wird
dabei absichtlich ROT.** Er zwingt die Frage "in welche Gruppe gehört der neue Schlüssel?"
und diese Entscheidung ist ihre Antwort; nachgezogen wird der WÄCHTER, nicht die
Ableitung. Er tut genau das, wofür er gebaut ist.
**WER STATTDESSEN EINE LITERALE GRUPPENLISTE BAUT, HEBT EINE BINDENDE ENTSCHEIDUNG DER
VORPHASE AUF** — und zwar an der Stelle, die jene Phase ausdrücklich gegen eine zweite
Wahrheit gesichert hat.
**DIE SCHREIBWEISE IST EINE EINBAHNSTRASSE** (P11.6-2, dritte Auflage).

**(3) BETREIBER-CODE KOMMT NIE ROH IN UNSEREN CODE.** → GEHOBEN 2026-09-19: zusammen mit
P11.6-6 Teil (a) als Dauerregel "BETREIBER-CODE IM AUSGELIEFERTEN TEXT REIST ALS WERT UND
WIRD GEKAPSELT AUSGEFÜHRT — EINE MASKIERUNG ALLEIN REICHT NICHT" (docs/immer-beachten.md).
Der Absatz bleibt wörtlich; die Regel ist das Destillat, nicht sein Ersatz. Er reist als **String über
`embedInScript`** (`src/lib/script-embed.ts`) und wird zur Laufzeit **GEKAPSELT**
ausgeführt — so, dass ein Fehler im Betreiber-Code **weder den Redirect noch das
Meta-Fire derselben Aktion mitreisst**.
**DAS BEANTWORTET DESIGNFRAGE (F5), UND ZWAR IN BEIDE RICHTUNGEN:** Die Dauerregel "JEDER
BETREIBER-WERT, DER IN SCRIPT-ROHTEXT GEHT, LÄUFT ÜBER DEN EINBETTUNGS-HELFER" GREIFT —
weil der Code auf dem Transportweg **ein Wert ist** und erst am Zielort wieder Code wird.
Die Sorge aus (F5), das Escape mache den Code unausführbar, trifft nicht zu: Das
Unicode-Escape lebt im **Quelltext** des Script-Blocks; der String, den die Laufzeit
daraus liest, trägt wieder das echte Zeichen. **Damit gibt es keinen Fall, in dem ein
`</script>` des Betreibers den umgebenden Block verlässt.**
**DIE GESTALT DER KAPSELUNG IST NICHT ENTSCHEIDEN** — sie gehört in den Zuschnitt.

**(4) GEBAUT WIRD IM CLIENT-ERZEUGER.** `generateFunctional` (`src/lib/generate.ts`),
nicht `injectPageViewEmitter`. **DER GRUND IST DER EXPORT:** Nur was der Client-Erzeuger
baut, steht auch in einer heruntergeladenen oder kopierten Seite (Ausgangslage (e)).
**DER PREIS WIRD MITGENANNT:** Damit steht der Custom-Baustein im Dokument **VOR** den
server-injizierten Blöcken — Wiederherstellung, Dialog, Setzer stehen dahinter (GEMESSEN
an der Einfügearithmetik, CC, 2026-09-19: `generateFunctional` hängt seine Blöcke als
LETZTE Kinder an `body`, `injectPageViewEmitter` setzt seinen Block davor an
`lastIndexOf("</body>")` und landet damit DAHINTER). Für den heutigen Bestand ist das
folgenlos, weil das Wiring nur auf KLICK urteilt; **für einen Baustein, der beim LADEN
urteilt, ist es der zentrale Zwang des Zuschnitts.**

**PROVENIENZ: ARCHITEKT-SETZUNG mit OWNER-ZUSTIMMUNG 2026-09-19**, übermittelt über den
Prompt dieser Runde; am Repo nicht anderweitig belegt. Die vier Stützbefunde — die zwei
Speicherwege, die Gruppen-Ableitung, die Kontext-Grenze des Einbettungs-Helfers und die
Einfügearithmetik — sind GEMESSEN am Repo (CC, 2026-09-19).

### ENTSCHEIDUNG P11.6-6 — DIE SIEBEN NACHSCHÄRFUNGEN DES PLAN-REVIEWS

**SIE ENTSTEHEN AM PLAN DER SCHEIBE 11.6a UND BINDEN ÜBER SIE HINAUS.** Jede beantwortet
eine Frage, die der Plan offengelassen oder zu weich entschieden hatte; sie stehen
gesammelt, weil sie zusammen die Bauform des Custom-Bausteins festlegen.

**(a) DIE EREIGNISZEILE STEHT UNTER DERSELBEN EINWILLIGUNG WIE DER BASIS-CODE.**
→ GEHOBEN 2026-09-19 (die KAPSELUNGS-Hälfte, zusammen mit P11.6-5 Teil (3)) — s. dort. Mit
eingeschaltetem Dialog läuft sie NUR bei `custom === true`; ohne gesetzten Hook läuft sie
immer.
**WARUM DAS EIGENS ENTSCHIEDEN WIRD, obwohl es selbstverständlich klingt:** Der Plan
hatte die Einwilligung nur für den LADER benannt. Ein ungegateter Aufruf bei geladenem
Basis-Code wäre folgenlos gewesen (ohne Basis-Code kein Empfänger) — aber ein Betreiber
kann in die Zeile auch einen eigenen `fetch` schreiben, und der ginge dann ohne
Einwilligung hinaus. **Die Zeile ist ein eigener Sender, nicht nur eine Bedienung des
Laders.** Sie bekommt deshalb ihre eigene Prüfung, nicht die des Laders geerbt.

**(b) NACHVERSUCH BEIM KLICK: VOR DER EREIGNISZEILE LÄDT DER BASIS-CODE, falls er noch
nicht geladen ist UND `custom` jetzt erlaubt ist.**
**DER GRUND IST EIN FREMDES CMP.** Der Lader urteilt bei `DOMContentLoaded`; ein fremdes
Consent-Management setzt `window.pagesmithConsent` häufig ERST DANACH, nach einer eigenen
Netzanfrage oder nach der Besucher-Entscheidung. Ohne Nachversuch bliebe der Basis-Code
für die ganze Sitzung ungeladen, obwohl der Besucher zugestimmt hat — und die
Ereigniszeile liefe ins Leere, weil ihr Empfänger fehlt. **DER BRUCH WÄRE STILL:** kein
Fehler, keine Meldung, nur fehlende Conversions.
**DER NACHVERSUCH IST NICHT DERSELBE WEG WIE `__psCustomLoad`:** Jener deckt den Fall, in
dem UNSER Dialog eine Zustimmung entgegennimmt (`write` ruft ihn). Dieser deckt den Fall,
in dem ein FREMDES CMP den Hook setzt, ohne dass `write` je läuft. **Beide sind nötig; der
eine ersetzt den anderen nicht.**

**(c) SEQUENZIELLES LADEN.** → GEHOBEN 2026-09-19 ist NICHT dieser Absatz, sondern der
PARSER-BEFUND aus dem Bau des Laders: als Dauerregel "EIN `DOMParser`-DOKUMENT PARST MIT
AUSGESCHALTETEM SKRIPTING — WER KNOTEN DARAUS IN EINE LEBENDE SEITE ÜBERNIMMT, ÜBERNIMMT
EINEN ANDEREN BAUM, ALS DER BROWSER GEBAUT HÄTTE" (docs/immer-beachten.md). Das
sequenzielle Laden selbst bleibt hier — es ist eine Bauform dieser Scheibe.
**(c) SEQUENZIELLES LADEN. Bei einem `<script src>` wird auf `load` oder `error`
gewartet, bevor der nächste Knoten eingefügt wird; ein `error` führt WEITER, es bricht
nicht ab.**
**DER GRUND IST DIE BAUFORM ECHTER SNIPPETS:** Sie bestehen regelmässig aus einem
Bibliotheks-Script mit `src` und einem Inline-Script dahinter, das die Bibliothek
benutzt. Werden beide in einem Zug eingefügt, läuft das Inline-Script SOFORT und die
Bibliothek ist noch nicht da — es wirft, und der Betreiber sieht ein Snippet, das
"manchmal" funktioniert.
**WARUM `error` WEITERFÜHRT:** Ein Adblocker blockt regelmässig genau das erste Script.
Ein Abbruch nähme dem Betreiber auch die Netzwerke, die nicht geblockt sind. **Die
Fehlerklasse ist die von `DRITTANBIETER-SCRIPT-LADEPRÜFUNG` (docs/immer-beachten.md): Der
Ladezustand ist am `load`/`error` des Elements ablesbar, nicht an einem globalen Stub.**

**(d) DER CUSTOM-BAUSTEIN ENTSTEHT NUR IN `mode === "export"`. In der Vorschau gibt es
WEDER Lader NOCH Ereigniszeile.**
**DAS IST EINE ABWEICHUNG VOM BESTAND UND WIRD ALS SOLCHE BENANNT:** Die Vorschau feuert
heute echtes `fbq` (s. Vorrat P11.6-3). Der Custom-Baustein folgt dem NICHT — und der
Grund ist nicht Konsistenz, sondern Wirkung: Der Basis-Code eines Netzwerks setzt beim
Laden Cookies und schickt einen Seitenaufruf, und der Rahmen baut sich bei jeder Tipp-Pause
neu auf. **Es entstünden Ereignisse aus der ARBEIT des Betreibers, nicht aus dem Verhalten
seiner Besucher — bei jedem Zeichen, das er tippt.**
**DAZU KOMMT, DASS DIE VORSCHAU ALS TESTINSTRUMENT OHNEHIN NICHTS BELEGT** (GEMESSEN, CC,
2026-09-19): Im Rahmen laufen `document.cookie`, `localStorage` und `sessionStorage` über
den Kompatibilitäts-Riegel (`src/lib/preview-storage-shim.ts`, Speicher im Arbeitsspeicher),
und Netzanfragen tragen den Ursprung `null` (offener Punkt "NETZANFRAGEN MIT URSPRUNG
`null` SIND IN DER VORSCHAU NICHT LÖSBAR"). Ein Fremd-Snippet verhält sich dort
nachweislich anders als live.
**FOLGE, DIE MITMUSS:** Der Betreiber kann seinen Custom-Pixel im Editor NICHT prüfen. Das
ist der Preis, und er ist bewusst bezahlt.

**(e) DIE EREIGNISZEILE BEKOMMT KEINE PARAMETER. Die geteilte Ereignis-Kennung bleibt
innen.**
**DER GRUND IST DIE DEDUPLIZIERUNGS-NAHT:** `eid` wird in `__psMetaFire` GENAU EINMAL
erzeugt und von drei Verbrauchern geteilt (Pixel, Beacon, Bestätigung); `tracking/meta.ts`
sagt dazu, zwei Erzeugungsstellen brächen "Metas Deduplizierung UND den
Verlustraten-Join — lautlos, weil beide Werte für sich gültig aussehen". Sie nach aussen
zu geben, machte fremden Code zum vierten Verbraucher eines Wertes, dessen Bedeutung
niemand ihm erklärt hat.
**UND EINE ZWEITE HÄLFTE, DIE SCHWERER WIEGT: EIN PARAMETER IST EIN KONTRAKT.** Was die
Zeile einmal sehen darf, bekommen wir nicht mehr zurück (Einbahnstrasse). **Nachlegen geht
— ein Parameter, den ein echter Betreiber verlangt, lässt sich später ergänzen.**
**WAS DIE ZEILE STATTDESSEN HAT:** den globalen Geltungsbereich, in dem der Basis-Code
seine eigenen Namen abgelegt hat. Mehr braucht ein Netzwerk-Aufruf nicht.

**(f) EINE ÜBERLANGE EREIGNISZEILE: `publishProject` BRICHT LAUT AB; im EXPORT wird sie
NICHT EINGEBAUT.**
**ZWEI ORTE, WEIL ES ZWEI AUSLIEFERWEGE GIBT** und der Export nicht über den Server läuft
(Ausgangslage (e)). Der Abbruch im Publish folgt der Dauerregel "EIN UNBEKANNTER
KONFIGURATIONSWERT BRICHT LAUT AB, STATT STILL AUF EINEN VORGABEWERT ZURÜCKZUFALLEN" und
steht an derselben Stelle wie die vier Consent-Abbrüche — dort gibt es einen Rückkanal
zum Betreiber. Im Export gibt es keinen; dort bleibt nur, die Zeile nicht einzubauen.
**DIE ASYMMETRIE IST BENANNT UND NICHT BEHOBEN:** Der Export schweigt. Das ist derselbe
Mangel, den der offene Punkt "DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT
ERFASST" führt, und diese Scheibe löst ihn nicht.

**(g) DIE ZWEI ZAHLEN UND DER NEUE GLOBALE NAME — ihre Provenienz, ausdrücklich.**
**16 000 CODEPUNKTE (Snippet) und 2 000 (Ereigniszeile) sind ARCHITEKT-SETZUNGEN OHNE
MESSUNG.** Was gemessen ist, ist nur der Rahmen (Upload-Grenze 2 MB, Ablage im
`settings`-jsonb). Wer sie ändert, ändert eine Setzung, keinen Befund.
**`window.__psCustomLoad` IST EIN NEUER GLOBALER NAME — INTERN.** Er ist `__ps`-namespaced
wie `__psPageView` und `__psConsentStore`, steht in keiner Betreiber-Dokumentation und
verletzt P11.6-1 ("KEIN neuer globaler Name") deshalb nicht: Jene Setzung zielt auf einen
Namen, den ein BETREIBER aufrufen soll.
**DER PREIS WIRD TROTZDEM BENANNT, weil er echt ist:** Auch ein interner Name ist eine
EINBAHNSTRASSE — er steht ab dem ersten Publish in fremden Seiten. Und die
Existenzprüfung in `write` macht einen späteren Bruch UNSICHTBAR: fehlt der Name, passiert
nichts, und niemand sieht es. **Wer ihn je umbenennt, bricht die Nachhol-Kette still.**

**PROVENIENZ: ARCHITEKT, Plan-Review 2026-09-19**, übermittelt über den Prompt der
Bau-Runde; am Repo nicht anderweitig belegt. Die Stützbefunde — der Vorschau-Riegel, der
Ursprung `null`, die Einmal-Erzeugung der Kennung, die zwei Ausgabewege — sind GEMESSEN am
Repo (CC, 2026-09-19).

---

## Die offenen Designfragen

**ALLE FÜNF SIND AM 2026-09-19 BEANTWORTET** (Designrunde, zweite Runde des Tages). Je
Frage steht die Antwort als Zeiger auf die Entscheidung, die sie trägt.

**DER FRAGETEXT BLEIBT WÖRTLICH STEHEN UND WIRD NICHT GESTRICHEN**, und der Grund ist
nicht Pietät: Er trägt die Befunde und die Abgrenzungen, aus denen die Antwort entstanden
ist — die zwei Mechanismen der future-roadmap, die Abgrenzung der Instanz-Achse, die
Kontext-Grenze des Einbettungs-Helfers. Wer nur die Entscheidung liest, hat den Grund
nicht. Der Satz "KEINE ist entschieden" von heute Vormittag ist damit ÜBERHOLT und steht
unten nicht mehr.

**WAS NACH DIESEM ABSCHNITT NOCH OFFEN IST, STEHT NICHT MEHR HIER.** Die Designfragen
sind erledigt; die verbliebenen Fragen sind BAU-Fragen und gehören in den Zuschnitt der
ersten Scheibe (Ablage, Längengrenzen, Persistenz der Ereigniszeile, der Weg des
Schlüssels in die Schlüsselmenge, Feuerpfad, Kapselungs-Gestalt, Lader, nachgeholte
Einwilligung, Vorschau, Byte-Gleichheit, Oberfläche). **Wer sie hierher zurückschreibt,
macht aus einer beantworteten Frage eine offene.**

**(F1) — BEANTWORTET durch Entscheidung P11.6-3: FREI, NICHT KURATIERT. Die Auflage "Die
Tür wird als Tür geführt" gilt weiter.**
**(F1) FREIES SNIPPET-FELD ODER KURATIERTE FELDER JE NETZWERK?** Der Bestand kennt die
Unterscheidung bereits und nennt sie ZWEI MECHANISMEN, nicht drei Varianten
(docs/claude-history/future-roadmap.md, ARCHITEKTUR-EINORDNUNG): KURATIERT (Kennungs-Feld,
wir erzeugen das Snippet und bestimmen, wann es lädt — "Nur hier greift der Consent-Gate
sauber") gegen NOTAUSGANG (beliebiger fremder Code — "wir können ihn erst NACH Einwilligung
einfügen, aber wir können nicht prüfen, was er tut"). Jene Stelle setzt zusätzlich: "Die
Tür wird als Tür geführt, nicht als dritte gleichrangige Option."

**(F2) — BEANTWORTET durch Entscheidung P11.6-5, Teil (1): EIN Feld je Projekt, von beiden
A/B-Varianten geteilt; die Ereigniszeilen hängen je Aktion und damit je Variante.**
**(F2) EIN SNIPPET JE PROJEKT ODER MEHRERE?** Berührt die Ablage-Form im
Einstellungs-Blob. **NICHT zu verwechseln mit der Instanz-Achse der Geheimnis-Tabelle** —
ein Client-Snippet trägt kein Zugangsdatum und legt keine Zeile in `project_secrets` an;
die Eindeutigkeit `(project_id, target)` ist davon unberührt (s. Vorrat P11.6-1).

**(F3) — BEANTWORTET durch Entscheidung P11.6-5, Teil (2): der Schlüssel heisst `custom`
und liegt FEST in der Gruppe "Werbung"; der Wächter G0 wird dabei absichtlich rot.**
**(F3) SCHLÜSSEL UND GRUPPE DER EINWILLIGUNG.** Offen gelassen von Entscheidung P11.6-2;
die drei Auflagen, die jede Antwort tragen muss, stehen dort.

**(F4) — BEANTWORTET durch Entscheidung P11.6-4 auf der ORTS-Achse: ein optionales Feld
"eigener Code" an der Track-Aktion. WAS die Zeile zur Laufzeit sehen kann, ist damit
NICHT entschieden und gehört in den Zuschnitt — das ist kein Rest der Designfrage,
sondern eine Bau-Frage.**
**(F4) DIE FORM DER EREIGNISZEILE JE AKTION.** Was die Zeile bekommt — Ereignisname,
`isCustom`, Wert, Währung, die geteilte Ereignis-Kennung — und in welcher Gestalt. Der
heutige Klick-Pfad hält alles davon als LOKALE Werte in `__psMetaFire`
(`src/lib/tracking/meta.ts`); `TrackConfig` (`src/lib/mappings.ts`) trägt
`event`, `isCustom?`, `value?`, `currency?`.

**(F5) — BEANTWORTET durch Entscheidung P11.6-5, Teil (3): als STRING über
`embedInScript`, Ausführung GEKAPSELT. Die Regel GREIFT — der Code ist auf dem
Transportweg ein Wert und wird erst am Zielort wieder Code; das Escape lebt im Quelltext,
der gelesene String trägt wieder das echte Zeichen. Die Sorge unten, das Escape mache den
Code unausführbar, ist damit ausgeräumt.**
**(F5) WIE KOMMT DER BETREIBER-CODE IN DEN AUSGELIEFERTEN TEXT? — DIE SCHWERSTE DER FÜNF.**
**Er ist CODE, kein Wert in einem String.** Ein `</script>` darin verlässt den umgebenden
Block; `<!--<script>` verschluckt zusätzlich das NÄCHSTE Script-Element, ohne einen
einzigen Fehler zu erzeugen (GEMESSEN in Phase 11.13, VERMERK P11.13-7; der Befund steht
im Docblock von `src/lib/script-embed.ts`).
**DIE DAUERREGEL IST ZU PRÜFEN, NICHT ANZUWENDEN:** "JEDER BETREIBER-WERT, DER IN
SCRIPT-ROHTEXT GEHT, LÄUFT ÜBER DEN EINBETTUNGS-HELFER" (docs/immer-beachten.md) ist für
**WERTE** formuliert — `embedInScript` maskiert jedes `<` als Unicode-Escape, und genau das
machte ausführbaren Code unausführbar. **OB und WIE die Regel hier greift, ist die Frage;
sie ist in dieser Runde NICHT beantwortet.** Die Regel trägt selbst eine Kontext-Grenze
("DAS ESCAPE TRÄGT NUR IM SCRIPT-ROHTEXT … Wer diese Funktion dort benutzt, hat eine
Maskierung, die nicht maskiert — UND SIE SIEHT AUS WIE EINE"), und ihre Stufe (3) stellt
Repo-Konstanten und server-vergebene Werte frei. Ein Betreiber-SNIPPET ist keines von
beidem und fällt unter keine der drei Stufen.
**KEINE EMPFEHLUNG**, weder zu einem eigenen Script-Element, noch zu einer
Ladeform über `src`, noch zu einer Prüfung des Codes.

---

## Wie diese Datei fortgeschrieben wird

**FORTGESCHRIEBEN WIRD** mit dem Abschluss-Vermerk einer Scheibe, nach dem Live-Test, im
selben Zug wie die Verdichtung des Zuschnitts (docs/arbeitsweise.md, Die Standdatei;
GELESEN, CC, 2026-09-19).

**PROVENIENZ AN JEDER ANGABE:** gemessen (am Repo oder live, mit Datum), gelesen (mit
Quelle) oder als Owner- bzw. Architekten-Angabe gekennzeichnet. **Als Ort steht der
SYMBOLNAME, nie eine Zeilennummer** — sie altert mit dem nächsten Commit.

**DIE LÜCKEN-REGEL:** Ein Vermerk ohne Commit-Nummer ist der jüngste, noch nicht
committete. Es darf immer nur EINE Lücke geben — stehen zwei da, ist etwas
liegengeblieben; geschlossen wird sie in Auftrag 0 der nächsten Runde.

**TITEL-ZITATE OHNE MARKE.** Wer eine Überschrift dieser Datei zitiert — etwa beim
Verdichten eines abgelaufenen Zuschnitts —, schreibt sie ohne die Überschriften-Marke,
sonst kollidiert das Zitat dauerhaft mit jeder künftigen gleichlautenden Überschrift
(docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
VERZEICHNIS NICHT, Zusatz vom 2026-08-27).

**TEILUNG IST AUSGESCHLOSSEN, SOLANGE DIESE DATEI UNTER 4000 ZEILEN BLEIBT** — ein Verbot,
keine Schwelle (docs/arbeitsweise.md, Die Standdatei). Sie hat heute keine 400.

---

## Vermerke

### VERMERK P11.6-1 — DIE AUFKLÄRUNGS-RUNDE (2026-09-19)

**KEINE SCHEIBE, KEIN BAU, KEIN COMMIT.** Eine READ-ONLY-Aufklärung über sieben Aufträge
(Bestand zu 11.6, Erzeuger von Browser-Code, Andock-Punkte, Einwilligung, was Lesart (b)
vorfände, Export-Pfad). Ihr Bericht liegt in KEINER Datei; was davon weiterträgt, steht in
"Gegenstand und Ausgangslage" oben.

**WAS SIE ERBRACHT HAT — FÜNF MESSUNGEN**, oben einzeln aufgeführt und hier nicht
verdoppelt.

**WAS SIE ÜBER DAS EIGENE VERFAHREN ERGEBEN HAT, und es gehört in einen Vermerk, weil es
sonst niemand erfährt:** Die erste Such-Achse für Fundstellen zu "Custom-Pixel"
(`custom[- ]?pixel|eigene[nsrm]? pixel|eigenes pixel`, case-insensitiv, mit
Positivkontrolle) ergab in `docs/claude-history/future-roadmap.md` **NULL Treffer** — in
genau der Datei, auf die die Roadmap-Zeile 11.6 mit "das ausgenommene Hotjar" zeigt und die
die ausführlichste Vorarbeit trägt. Der Grund: jene Datei nennt die Sache
"Custom-Script-Feld", "Custom Tracking, Pixel" und "Drittanbieter-PIXEL", nie
"Custom-Pixel". Gefunden hat sie erst eine zweite Achse über `hotjar` bzw.
`custom[- ]?script|snippet|notausgang`.
**DAS IST DIE FEHLERKLASSE "EINE SUCH-ACHSE, DIE AUS DEN ERWARTETEN FORMULIERUNGEN GEBILDET
IST, BESTÄTIGT DIE ERWARTUNG STATT SIE ZU PRÜFEN"** (docs/immer-beachten.md) — hier
eingetreten und im selben Lauf gefangen. **Wer in dieser Phase erneut sucht, fährt BEIDE
Achsen.**

**PROVENIENZ:** die Messungen GEMESSEN am Repo (CC, 2026-09-19); der Verfahrens-Befund
ebenfalls, am eigenen Lauf. **KEIN Commit** — die Runde hat nichts geschrieben.

### VERMERK P11.6-2 — SCHEIBE 11.6a: DER BASIS-CODE UND DIE EREIGNISZEILE (2026-09-19)

**GEBAUT UND LIVE BESTÄTIGT.**
**BAU-COMMIT `bc001f4`** — 19 Dateien, 1643 Einfügungen, 70 Löschungen; zwei neue Dateien
(`src/lib/tracking/custom-pixel.ts`, `src/lib/tracking/custom-pixel.test.ts`).
**DOKU-COMMIT `670c1b3`** (Vorrat, noscript-Befund und Lader-Grenzen), dazu `2a16703`
(Plan-Review, Entscheidungen P11.6-3 bis -6) und `7be1e9a` (Anlage dieser Datei).
Pipeline vier von vier grün, **1946 Tests** (vorher 1906; +40 in einer neuen Testdatei).
Sechs Pflicht-Mutationen, jede mit VOR dem Lauf genannter Fehlerklasse, jede getroffen.

**DER LIVE-TEST — 2026-09-19, FÜNF TEILE, ALLE BESTANDEN. OWNER-ANGABEN; CC hat nichts
davon selbst gesehen.**

**(1) REGRESSION.** Ein Projekt OHNE Custom-Pixel verhält sich unverändert: Redirect und
Meta wie zuvor. Das ist die Live-Seite von Invariante I5, die im Code T9 als
Byte-Gleichheit hält.

**(2) DIALOG AUS.** Beim Laden erscheint `PS-BASE function` — **das belegt das
sequenzielle Laden**: Das Inline-Script sieht die Bibliothek des vorangehenden
`src`-Scripts, also hat der Lader auf dessen `load` gewartet. **KEINE Anfrage an die
Adresse des `noscript`-Bildes** — das ist die **ERSTE MESSUNG DER DOPPELZÄHLUNGS-FRAGE IN
EINEM ECHTEN BROWSER** (Chrome) und schliesst die Lücke, die die Korrektur-Runde
ausdrücklich offengelassen hatte. Aktion A feuert; Aktion B leitet **trotz kaputter
Ereigniszeile** weiter, **ohne ungefangenen Fehler**; die Zeile von Aktion C läuft vor der
Navigation.

**(3) DIALOG AN.** Vor einer Entscheidung und bei „nur Messung": **weder Basis-Code noch
Zeile**, der Redirect läuft trotzdem. Nach „Alle akzeptieren" lädt der Basis-Code **ohne
Neuladen** nach — das ist der `write`-Pfad über `__psCustomLoad`; nach einem Neuladen lädt
er beim Laden. Damit sind beide Nachhol-Wege der Entscheidung P11.6-6 (b) live getrennt
belegt.

**(4) VORSCHAU: NICHTS.** Weder Lader noch Zeile — Entscheidung P11.6-6 (d) live bestätigt.

**(5) EXPORT, LOKAL GEÖFFNET:** Basis-Code und Ereigniszeile laufen. Der Client-Erzeuger
trägt also, was Entscheidung P11.6-5 (4) von ihm verlangt.

**EIN NEBENBEFUND, DER MEHR WERT IST ALS DER LAUF, IN DEM ER ANFIEL:** Das Testprojekt
trug **keinen Meta-Pixel** — die Konsole zeigte durchgehend „Meta-Pixel nicht
konfiguriert". **DER FALL „CUSTOM OHNE META" IST DAMIT LIVE BELEGT**, nicht nur durch T1
und T2. Genau dieser Fall war der Grund, den Custom-Baustein NICHT in `__psMetaFire` zu
legen.

**DIE GRENZEN — JE AUSDRÜCKLICH, UND KEINE IST DURCH DEN LAUF GESCHLOSSEN:**
- **KEIN ECHTES NETZWERK-SNIPPET.** Getestet wurde mit `lodash` als Bibliothek und
  `console.log` als Ereigniszeile. Ob ein reales Snippet (Meta, TikTok, Hotjar) durch den
  Lader kommt, ist **ungemessen**.
- **OB DIE NETZWERK-ANFRAGE EINE WEITERLEITUNG ÜBERLEBT, IST UNGEMESSEN.** `console.log`
  schickt nichts; ein `fetch` ohne `keepalive` kann beim Seitenwechsel abbrechen. Steht als
  Vorrat P11.6-4 (1c).
- **NUR CHROME.** Firefox und WebKit sind an **jeder** Achse dieses Laufs ungemessen —
  insbesondere am `noscript`-Befund, dessen Ableitung aus den Einfügemodi damit für genau
  einen Parser belegt ist.
- **„C VOR NAVIGATION" IST EINE OWNER-ANGABE**, keine Messung mit Zeitstempel. Im Code
  sichert sie T4, der die Reihenfolge über die Zuweisungs-Folge belegt statt über eine
  Beobachtung.

---

## Vorrat — gemeldet, nicht gebaut

### VORRAT P11.6-1 — DER TITEL DES EINDEUTIGKEITS-POSTENS SAGT SEIT 0025 "PRIMÄRSCHLÜSSEL"

**DER BEFUND:** Der offene Punkt heisst "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF
project_secrets BLEIBT" (docs/offene-punkte.md, Stub in CLAUDE.md). **Seit Migration 0025
ist der Primärschlüssel die einspaltige `id`** (`project_secrets_pkey`); die Eindeutigkeit
auf `(project_id, target)` liegt seither im UNIQUE-Constraint
`project_secrets_project_id_target_key`, `UNIQUE NULLS NOT DISTINCT` (GEMESSEN am
Migrationstext und an docs/db-stand.md, CC, 2026-09-19). **GEMEINT IST UND WAR DIE
EINDEUTIGKEIT.**

**DER TITEL WIRD NICHT GEÄNDERT** — er wird zitiert, und eine Umformulierung machte jeden
Zeiger auf ihn tot. Dieselbe Abwägung ist in docs/immer-beachten.md an der Regel "MEHRERE
KENNUNGEN JE ZIEL BRECHEN EINEN SCHLÜSSEL (PROJEKT, ZIEL) NICHT" bereits getroffen und
begründet; **jene Regel trägt die Richtigstellung schon, der Posten in
docs/offene-punkte.md NICHT.**

**WAS OFFEN IST:** ob der Posten eine entsprechende Richtigstellung bekommt. **KEINE
EMPFEHLUNG.** Hier nur vorgemerkt, damit es beim Phasenende nicht untergeht.
→ GEHOBEN 2026-09-19 nach docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.6
gehoben (2026-09-19) — zwei Vorrats-Einträge". KEIN Trigger, deshalb Backlog und nicht
docs/offene-punkte.md.

### VORRAT P11.6-2 — `meta-forward.ts` SETZT DIE PIXEL-ID UNKODIERT IN DEN PFAD

→ GESTRICHEN 2026-09-19 (Phasenende 11.6). **TITEL UND BELEG BLEIBEN, DER RUMPF IST
WEG.** Der Gegenstand steht BEREITS ZWEIMAL in docs/claude-history/backlog-polish.md —
"DER ERSTE ADAPTER SETZT DIE KENNUNG OHNE KODIERUNG IN DEN PFAD" (STATUS: OFFEN, am Code
gemessen 2026-08-09) und "KODIERUNG DER KENNUNG IM ENDPUNKT-PFAD" (GEMESSEN 2026-08-13);
ein dritter Ort machte aus einem Befund drei Pflegestellen.
**WAS AM EINTRAG STEHENBLEIBT, IST SEIN ZWECK:** Er war nie ein eigener Befund, sondern
ein Zeiger — angelegt, damit die Aufklärung dieser Phase ihn nicht zum dritten Mal neu
erhebt. Dass sie ihn beim Prüfen der ausgehenden Aufrufe wiedergefunden hat, ist der
Beleg dafür, dass der Zeiger nötig war. **ES IST KEIN SSRF-BEFUND** — der Host bleibt
fest, betroffen sind Pfadsegmente.
Der Volltext ist unter dem Commit `b4e40d4` nachzulesen.

### VORRAT P11.6-3 — DIE VORSCHAU FEUERT ECHTE EREIGNISSE: EINE HÄLFTE IST GEFÜHRT, DIE ANDERE NICHT

**GEPRÜFT VOR DEM ANLEGEN (GEMESSEN am Repo, CC, 2026-09-19, vier Achsen mit
Positivkontrolle):** Der Befund ist **zur Hälfte bereits geführt**, und für diese Hälfte
steht hier NUR EIN ZEIGER, kein zweiter Eintrag.

**DIE GEFÜHRTE HÄLFTE — `fbq`:** docs/claude-history/phase-4-mapping-codegen-export.md sagt
wörtlich: *"Die Vorschau feuert bereits bei Linksklick echtes fbq (akzeptierte
Marketer-eigene-Vorschau-Verschmutzung)"*. Es ist also **kein neuer Befund und kein
Defekt, sondern eine ausdrücklich akzeptierte Folge** — festgehalten beim Bau des
auxclick-Listeners, als begründet wurde, warum jener export-only bleibt.

**DIE NICHT GEFÜHRTE HÄLFTE — DER `/api/e`-BEACON:** Dass die Vorschau **auch einen echten
Server-Beacon schickt**, steht nirgends (Achse: `Vorschau` neben `Beacon` bzw. `api/e`
über alle Doku-Dateien — NULL Treffer; Positivkontrolle: `Vorschau` trifft in
backlog-polish.md fünfmal und in offene-punkte.md elfmal). **Das ist erklärbar und
trotzdem eine Lücke:** Jener Satz stammt aus Phase 4; den CAPI-Beacon gibt es erst seit
Phase 6 (Scheibe 2b-ii), und seit Phase 11 Scheibe 8 hängt er nicht einmal mehr an der
Pixel-ID. **Die akzeptierte Verschmutzung ist also seither GRÖSSER, als der Satz sagt, der
sie akzeptiert** — sie erreicht heute die eigene `events`-Tabelle und damit die
Analytics-Zahlen des Betreibers.

**WAS DAS MIT DIESER SCHEIBE ZU TUN HAT:** Entscheidung P11.6-6 (d) nimmt den
Custom-Baustein aus der Vorschau heraus und weicht damit vom Bestand ab. **Dieser Eintrag
ist der Beleg dafür, dass der Bestand an dieser Stelle nicht sauber ist, sondern
gewachsen** — die Abweichung ist also keine Inkonsequenz.

**KEINE EMPFEHLUNG**, ob Meta und der Beacon in der Vorschau bleiben sollen. **KEIN
TRIGGER** — der Zustand geht nicht still kaputt, er ist seit Phase 4 bekannt und bewusst.
→ GEHOBEN 2026-09-19 nach docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.6
gehoben (2026-09-19) — zwei Vorrats-Einträge".

### VORRAT P11.6-4 — DREI SÄTZE FÜR DIE BETREIBER-DOKUMENTATION, DIE SONST NIEMAND SCHREIBT

**Fünf Eigenschaften des Custom-Pixels, die ein Betreiber NICHT erraten kann und die ihm
heute nichts sagt:**

**(1) EIN `<noscript>`-RÜCKFALL ERREICHT DIE ZIELSEITE NICHT — WEDER DAS ELEMENT NOCH SEIN
`<img>`.**
**GEKÜRZT AM 2026-09-19 — DIE BAU-FRAGE IST ERLEDIGT, DER BETREIBER-SATZ NICHT.** Hier
standen die drei Stufen des Laders (Body-Kontext, Entfernen im geparsten Dokument,
Überspring-Zeile), ihre jsdom-Messung und die offene Frage, ob ein echter Browser dasselbe
tut. **DER BELEG DER ERLEDIGUNG:** Bau-Commit `bc001f4`, gehalten von T17d (Stufe (a),
Einzelstück gegen Mutation M6) und T17e (Stufe (b), Einzelstück gegen M7); die volle
Begründung steht am Ort der Handlung, im Kopfkommentar von
`src/lib/tracking/custom-pixel.ts`, Punkt (6). **DIE BROWSER-FRAGE IST FÜR CHROME
BEANTWORTET** — der Live-Test vom 2026-09-19 zeigte KEINE Anfrage an die Adresse des
`noscript`-Bildes (VERMERK P11.6-2, Teil (2)); **Firefox und WebKit bleiben ungemessen.**

**WAS ALS BETREIBER-SATZ STEHENBLEIBT, weil der Kürzung nur die Bau-Frage zum Opfer
fällt:** Ein `<noscript>`-Rückfall für Besucher ohne JavaScript **kann auf diesem Pfad nie
wirken** — er greift nur bei ausgeschaltetem Skripting, und dann läuft der Lader gar nicht.
Wer ihn für wirksam hält, zählt jene Besucher fälschlich als erfasst. **Das ist kein
Verlust gegenüber heute, sondern die Abwesenheit einer Doppelzählung.**

**(1a) DIE REIHENFOLGE ÜBERLEBT DEN BODY-KONTEXT — und ist seither strukturell statt
zufällig.** GEMESSEN (CC, 2026-09-19): Im Kopf-Kontext verteilte der Parser `link`, `meta`
und `script` nach `head` und das `<img>` nach `body`; der Lader hängte beide Listen
aneinander und traf die Quellreihenfolge **zufällig**. Im Body-Kontext liegen alle Knoten
in EINEM Container, die Folge ist dieselbe (`LINK > META > SCRIPT > SCRIPT > IMG`) und
jetzt **strukturell** die Quellreihenfolge. Wächter: T17f.

**(1b) VERSCHACHTELTE `<script>`-ELEMENTE LAUFEN NICHT.** Der Lader baut ein frisches
Script-Element nur für die Knoten der OBERSTEN Ebene; ein `<script>` innerhalb eines
`<div>` kommt über `importNode` als geklonter Knoten in die Seite — und ein per DOM
eingefügter Klon eines Script-Elements **wird nicht ausgeführt**. Ein Betreiber, der sein
Snippet in einen Container wickelt, bekommt es damit still nicht ausgeführt.
**ABLEITUNG AUS DER SPEZIFIKATION, in diesem Projekt NICHT gemessen** — auch das ist eine
Live-Test-Achse.

**(1c) BEI EINEM KNOPF MIT REDIRECT IST OFFEN, OB DIE ANFRAGE DES NETZWERKS DIE NAVIGATION
ÜBERLEBT.** Die Ereigniszeile läuft garantiert VOR der Weiterleitung (T4) — aber was sie
auslöst, ist die Sache des Betreiber-Codes: Ein `fetch` ohne `keepalive` oder ein
Bild-Pixel kann beim Seitenwechsel abgebrochen werden. Unser eigener Beacon löst das über
`sendBeacon` bzw. `keepalive` (docs/immer-beachten.md, „BEACON-keepalive PFLICHT"); auf
fremden Code haben wir diesen Zugriff nicht.
**DAS IST EINE LIVE-TEST-ACHSE UND AUSDRÜCKLICH KEIN UMBAU DES REDIRECTS IN DIESER
SCHEIBE.** Ob der Redirect je verzögert wird, ist hier NICHT entschieden; die bestehende
Bauform („kein Navigations-Defer", `src/lib/generate.ts`) bleibt unangetastet.

**(2) AUF BEREITS VERÖFFENTLICHTEN SEITEN IST `custom` ABGELEHNT, bis der Besucher neu
entscheidet.** Ein gespeicherter `ps1:`-Wert bleibt gültig — ein neuer Schlüssel macht ihn
nicht ungültig —, führt den neuen Schlüssel aber in keiner der beiden Listen, und
`hookFrom` setzt ihn dann auf `false` (`src/lib/tracking/consent-store.ts`, GELESEN). Für
Besucher mit gespeicherter Entscheidung lädt der Basis-Code also NICHT, obwohl der
Betreiber ihn eingetragen hat. **Fail-closed und richtig — aber unerklärt sieht es aus wie
ein Defekt.**

**(3) EINE CSP OHNE `unsafe-eval` AUF DER KUNDENSEITE LEGT DIE EREIGNISZEILE STILL.** Die
Zeile läuft über `new Function`; eine `<meta http-equiv="Content-Security-Policy">` im
importierten HTML des Betreibers kann das verbieten. **Der Ausfall ist gefangen und damit
lautlos** — die Zeile tut dann einfach nichts. Der Basis-Code selbst ist davon NICHT
betroffen (er läuft als echtes Script-Element). Wir liefern selbst keine CSP aus
(GEMESSEN, CC, 2026-09-19: null Treffer über `src/` und `next.config.ts`).

**WOHIN SIE GEHÖREN:** an den bestehenden offenen Punkt "BETREIBER-DOKUMENTATION FEHLT —
DREI PUNKTE" (docs/offene-punkte.md), dessen Trigger "vor dem öffentlichen Launch" lautet.
**HIER NICHT ERGÄNZT** — das wäre eine Änderung an einem Posten ausserhalb dieser Scheibe.
**KEINE EMPFEHLUNG**, wie die Sätze lauten sollen.
→ GEHOBEN 2026-09-19, und zwar GENAU DORTHIN: als Punkt (4) am Posten
"BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" (docs/offene-punkte.md), alle fünf Sätze.
Die zwei MESSLÜCKEN des Live-Tests, die hier nie standen, tragen zusätzlich den neuen
Posten "CUSTOM-PIXEL: QA UND BETREIBER-HINWEISE VOR DEM LAUNCH" (Trigger: vor dem
öffentlichen Launch; OWNER-VORGABE 2026-09-19), mit Stub in CLAUDE.md. Dessen Punkt (3)
zeigt auf den Betreiber-Posten zurück — derselbe Gegenstand wird nicht zweimal geführt.

---

## Hebungs-Kandidaten

**KEINE.** Der Abschnitt steht, damit er beim Phasenende nicht vergessen wird — nicht,
weil er heute etwas trüge.
