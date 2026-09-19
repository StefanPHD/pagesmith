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

**STAND NACH DER AUFKLÄRUNG (2026-09-19):** EIN Vermerk (P11.6-1) · ZWEI bindende
Entscheidungen (P11.6-1, P11.6-2) · FÜNF offene Designfragen · ZWEI Vorrats-Einträge ·
KEIN Hebungs-Kandidat. **KEINE Scheibe zugeschnitten, KEINE Zeile Code geschrieben.** Der
Marker der Roadmap-Zeile 11.6 steht auf `[ ]`.

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

**(B4) EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY.**
docs/immer-beachten.md, gleichnamige Regel, und ihre Folge "EIN NEUES FAN-OUT-ZIEL LÄUFT
BEI BESTEHENDEN SEITEN FAIL-CLOSED AN, UND EIN DEPLOY HEILT DAS NICHT". Jede Scheibe
dieser Phase fragt, was mit den bereits veröffentlichten Seiten geschieht, und nennt ein
Neu-Veröffentlichen als PFLICHT-SCHRITT der Live-Anleitung, wo es nötig ist.

**(B5) NICHTS ÜBER DIESE LAUFENDE PHASE GEHT IN CLAUDE.md.** Dort steht allein die
Stub-Zeile mit ihrem Marker (docs/arbeitsweise.md, Die Standdatei).

---

## Entscheidungen, die über ihre Scheibe hinaus binden

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

---

## Die offenen Designfragen

**DIES SIND FRAGEN, KEINE WEGE.** Sie stehen OHNE Rangfolge und OHNE Empfehlung; die
Reihenfolge der Aufzählung ist keine Wertung. **KEINE ist entschieden.**

**(F1) FREIES SNIPPET-FELD ODER KURATIERTE FELDER JE NETZWERK?** Der Bestand kennt die
Unterscheidung bereits und nennt sie ZWEI MECHANISMEN, nicht drei Varianten
(docs/claude-history/future-roadmap.md, ARCHITEKTUR-EINORDNUNG): KURATIERT (Kennungs-Feld,
wir erzeugen das Snippet und bestimmen, wann es lädt — "Nur hier greift der Consent-Gate
sauber") gegen NOTAUSGANG (beliebiger fremder Code — "wir können ihn erst NACH Einwilligung
einfügen, aber wir können nicht prüfen, was er tut"). Jene Stelle setzt zusätzlich: "Die
Tür wird als Tür geführt, nicht als dritte gleichrangige Option."

**(F2) EIN SNIPPET JE PROJEKT ODER MEHRERE?** Berührt die Ablage-Form im
Einstellungs-Blob. **NICHT zu verwechseln mit der Instanz-Achse der Geheimnis-Tabelle** —
ein Client-Snippet trägt kein Zugangsdatum und legt keine Zeile in `project_secrets` an;
die Eindeutigkeit `(project_id, target)` ist davon unberührt (s. Vorrat P11.6-1).

**(F3) SCHLÜSSEL UND GRUPPE DER EINWILLIGUNG.** Offen gelassen von Entscheidung P11.6-2;
die drei Auflagen, die jede Antwort tragen muss, stehen dort.

**(F4) DIE FORM DER EREIGNISZEILE JE AKTION.** Was die Zeile bekommt — Ereignisname,
`isCustom`, Wert, Währung, die geteilte Ereignis-Kennung — und in welcher Gestalt. Der
heutige Klick-Pfad hält alles davon als LOKALE Werte in `__psMetaFire`
(`src/lib/tracking/meta.ts`); `TrackConfig` (`src/lib/mappings.ts`) trägt
`event`, `isCustom?`, `value?`, `currency?`.

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

### VORRAT P11.6-2 — `meta-forward.ts` SETZT DIE PIXEL-ID UNKODIERT IN DEN PFAD

**ES GIBT BEREITS ZWEI BACKLOG-EINTRÄGE DAZU — HIER STEHT NUR DER ZEIGER, KEIN ZWEITER
EINTRAG** (GEMESSEN am Repo, CC, 2026-09-19): docs/claude-history/backlog-polish.md,
Einträge "DER ERSTE ADAPTER SETZT DIE KENNUNG OHNE KODIERUNG IN DEN PFAD" (STATUS: OFFEN,
am Code gemessen 2026-08-09) und "KODIERUNG DER KENNUNG IM ENDPUNKT-PFAD" (GEMESSEN
2026-08-13).

**WARUM ER HIER ÜBERHAUPT AUFTAUCHT:** Die Aufklärung dieser Phase ist beim Prüfen der
ausgehenden Aufrufe erneut darauf gestossen (`forwardToMeta` in
`src/lib/capi/meta-forward.ts` interpoliert `config.pixelId` roh, `forwardToPinterest`
führt die Kennung durch `encodeURIComponent`). **ES IST KEIN SSRF-BEFUND** — der Host
bleibt fest; betroffen sind Pfadsegmente. Der Pinterest-Adapter kennt die Stelle und sagt
im Kommentar "MELDEN, NICHT BAUEN".

**NICHTS ZU TUN IN DIESER PHASE.** Der Eintrag steht hier ausschliesslich, damit die
nächste Runde nicht zum dritten Mal denselben Befund neu erhebt.

---

## Hebungs-Kandidaten

**KEINE.** Der Abschnitt steht, damit er beim Phasenende nicht vergessen wird — nicht,
weil er heute etwas trüge.
