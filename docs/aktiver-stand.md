# Phase 11.13 — Betreiber-Anpassung des Einwilligungs-Dialogs: DER AKTIVE STAND

**WAS DIESE DATEI IST:** der steuernde Stand der laufenden Phase 11.13 — das, was JETZT
gilt, nicht das, was geworden ist. Sie ist das Pflicht-Gate ("Auftrag 0") jeder Sitzung,
die an dieser Phase arbeitet, und wird vollständig gelesen. Sie behält den Namen
`docs/aktiver-stand.md` bis zum Phasenende; dort wird sie nach
`docs/claude-history/phase-11.13-<thema>.md` umbenannt.

**WANN SIE ENTSTANDEN IST:** am 2026-09-17, mit dem Ergebnis der ersten Aufklärung und
nicht davor — nach docs/arbeitsweise.md, "Die Standdatei", Absatz "Wann sie entsteht".
Ihr Material ist der Bericht jener Aufklärung; er steht verdichtet als VERMERK P11.13-1.

**DIE NUMMERNFORM IST `P11.13-n`** — Vermerke, Entscheidungen, Vorrats-Einträge und
Hebungs-Kandidaten tragen das Präfix ihrer Phase. Das ist seit dem 2026-09-17 die Bauform
JEDER Standdatei (docs/arbeitsweise.md, "Die Standdatei", Absatz "Jede Nummer trägt das
Präfix ihrer Phase"). Ein Zeiger mit nackter Nummer meint eine andere Datei.

**DIE TEILUNG IST NICHT VORGESEHEN.** Unterhalb von 4000 Zeilen wird nicht geteilt; diese
Datei ist weit darunter.

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
4. Vermerke
5. Entscheidungen, die über ihre Scheibe hinaus binden
6. Zuschnitt der Scheibe 11.13a — DIE ANORDNUNG
7. Vorrat — gemeldet, nicht gebaut
8. Hebungs-Kandidaten

---

## Gegenstand und Ausgangslage

**QUELLE DIESES ABSCHNITTS IST AUSSCHLIESSLICH docs/roadmap.md, Roadmap-Zeile 11.13**
(GELESEN im Volltext, CC, 2026-09-17). Was dort nicht steht, steht auch hier nicht; die
Provenienz-Angaben sind die der Roadmap-Zeile und werden nicht verstärkt.

**DER GEGENSTAND DER PHASE:** Der Betreiber kann Anordnung, Erscheinungsbild und Text des
Einwilligungs-Dialogs — Leiste und Fenster der Phase 11.5 — an seine Seite anpassen.

**DER SCHNITT — VIER SCHEIBEN, IN DIESER REIHENFOLGE** (Roadmap, Punkt (c)):

1. **DIE ANORDNUNG.** Wörtlich: "Zwei Knöpfe sichtbar, die zwei Gruppen hinter einem
   unauffälligen Weg. **KEIN neues Einstellungsfeld, KEINE Farben, KEIN freier Text.**"
2. **DAS THEMA:** hell, dunkel, automatisch — EIN Wert, kein Farbwähler.
3. **FREIE FARBEN.** Erst wenn Scheibe 2 steht und live geprüft ist.
4. **FREIER TEXT.** Eine eigene Scheibe; sie ist die einzige mit einer Sicherheitsachse.

**DIESE PHASE BEGINNT MIT SCHEIBE 1.** Die Reihenfolge gegenüber 11.5e-2 ist erfüllt: Der
Widerruf ist gebaut (Archiv 11.5, VERMERK 7, 2026-09-16), und das Phasenende 11.5 ist am
2026-09-16 vollzogen.

**DIE AUFLAGE (e) — DIE ACHSE, DIE SCHEIBE 1 NEU ERZEUGEN KANN.** Wörtlich: "Zeigt Scheibe 1
die Auswahl erst auf Klick, ist der eingeklappte Zustand kleiner und harmlos — der
AUSGEKLAPPTE auf niedriger Fensterhöhe ist dann ein NEUER Zustand, den nichts prüft. Genau
dort kann die Leiste über den oberen Rand wandern. DAS WIRD DAS HARTE KRITERIUM JENER
SCHEIBE." Dazu: Die Erlaubnis von `overflow` im eigenen Schattenbaum ist an der Leiste ohne
Umbau von L12 nicht nutzbar.
**WIE DIESE PHASE MIT DER AUFLAGE UMGEHT, STEHT IN ENTSCHEIDUNG P11.13-1** — sie lässt den
neuen Zustand gar nicht erst entstehen.

**DIE SICHERHEITSACHSE (g) GEHÖRT SCHEIBE 4, NICHT DIESER.** Wörtlich: "SCHEIBE 4 IST DIE
ERSTE STELLE, AN DER BETREIBER-EINGABE IN DEN AUSGELIEFERTEN TEXT GELANGT." `JSON.stringify`
schützt gegen einen JavaScript-Ausbruch, entkommt aber kein `<`; ein Text mit `</script>`
schlösse den Script-Block im HTML-Parser. Folge dort: eine EIGENE Aufklärung, eine benannte
Invariante und Wächter mit FEINDLICHER Eingabe. "SIE WIRD NICHT NEBENBEI AUS SCHEIBE 3
HERAUSGEBAUT."
**FÜR SCHEIBE 1 IST DIESE ACHSE NICHT BERÜHRT:** Es entsteht kein Eingabefeld; jeder String
bleibt eine Konstante im Repo.

**DER GUARDRAIL (h):** "Die Knopf-Logik und die visuelle Gleichrangigkeit von 'Alle
akzeptieren' und 'Ablehnen' bleiben im System verankert; anpassbar ist der erläuternde
Text." Das erzwingt nichts — "Wir sagen nicht 'du musst einen konformen Dialog haben',
sondern 'UNSER Dialog macht keine Dark Patterns'."

**DER PRÜFWEG — NACHTRAG 2026-09-17 DER ROADMAP-ZEILE:** Weder der Editier- noch der
Vorschau-Rahmen zeigt den Einwilligungs-Dialog. `generateFunctional` hängt allein
`CONSENT_SCRIPT_ID` und `buildConsentRuntimes()` ein; die Blöcke, die die Oberfläche bauen,
kommen ausschliesslich über `injectPageViewEmitter`, dessen einziger Produktiv-Aufrufer im
VERÖFFENTLICHUNGS-Pfad steht. **EINE ÄNDERUNG AN DER ANORDNUNG IST OHNE VERÖFFENTLICHEN
NICHT ZU SEHEN.**

---

## Was den Zuschnitt bindet

Je Eintrag die Fundstelle. Diese Datei verdoppelt die Texte nicht; sie nennt, was gilt.

**AUS DEM ARCHIV DER PHASE 11.5** (`docs/claude-history/phase-11.5-einwilligung.md`;
Abschnitt 16 für die Scheibe 11.5d-2, Abschnitt 17 für 11.5e-1, Abschnitt 18 für 11.5e-2).
Die Kennungen gelten JE ZUSCHNITT; ein Zeiger nennt die Scheibe mit.

- **(I1) KEIN EINGRIFF AUSSERHALB DES EIGENEN SCHATTENBAUMS** — 11.5d-2, gleichlautend
  11.5e-1 und 11.5e-2. Kein Stil, keine Klasse, kein Attribut, keine Scroll-Position, kein
  Fokus an einem fremden Knoten. **IM EIGENEN SCHATTENBAUM SIND `max-height` UND `overflow`
  ZULÄSSIG.** Der Zusatz an 11.5e-2 schliesst Aufruf-Formen über ein vereinbartes Attribut
  oder ein URL-Fragment ausdrücklich aus, weil sie `querySelector`, `getElementById` oder
  einen Listener an `document` bräuchten.
- **(I2) DIE EINZIGE RÜCKNAHME** ist das Entfernen des Host-Elements im `finally` des
  Klick-Handlers — 11.5d-2, 11.5e-1, 11.5e-2. Kein zweiter Rücknahme-Weg.
- **(I3) LISTENER VOR EINHÄNGEN** — der Host wird ZULETZT in das Dokument gehängt, nachdem
  alle Listener gebunden sind. 11.5e-1 dehnt das ausdrücklich auf die Listener der Schalter
  aus, 11.5e-2 auf den Wiederaufbau.
- **(I4) DER HOOK WIRD JE SCHLÜSSEL BELEGT** — 11.5e-1 und 11.5e-2. Die Gruppe wird beim
  Schreiben aufgelöst; kein Gruppenname erreicht Speicher oder Hook.
- **(I5) DER GESPEICHERTE WERT TRÄGT DIE SCHLÜSSEL IN DER REIHENFOLGE VON `KEYS`** —
  11.5e-1. Das leistet `write()`; die Scheibe darf es nicht umgehen.
  **(I5) DER 11.5e-2** bindet daneben: ein neuer globaler Name braucht einen EIGENEN
  Wächter, weil L12 und M12 ihn nicht sehen.
- **(I6) DER SPEICHER BLEIBT UNBERÜHRT** — 11.5e-2: `read()`, `write()`, `hookFrom` und das
  Format `ps1`.

**AUS docs/immer-beachten.md:**

- **KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN —
  STIL, KLASSE, ATTRIBUT, SCROLL-POSITION, FOKUS.** Im eigenen Schattenbaum ist alles
  zulässig, ausdrücklich `max-height` und `overflow`.
- **WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE — NACHLEGEN GEHT,
  HERUNTERNEHMEN NICHT.** Zwischen zwei Gestalten wird die gewählt, die sich später ADDITIV
  erweitern lässt.
- **EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY** — bereits veröffentlichte
  Seiten behalten ihre Gestalt bis zum Neu-Veröffentlichen.
- **EIN WÄCHTER ÜBER ZEICHEN DARF DIE GESTALT DES GEPRÜFTEN NICHT BESTIMMEN** — der Fall
  L12 ist dort namentlich geführt.

**DER AUSGELIEFERTE KONTRAKT** (GEMESSEN am Code, CC, 2026-09-17; s. VERMERK P11.13-1):
`window.pagesmithConsent` (Betreiber-Hook) · `window.pagesmithConsentRevoke`
(`CONSENT_REVOKE_API`, im Docblock ausdrücklich als Einbahnstrasse markiert) ·
`window.__psConsentStore` (`CONSENT_STORE_API`, im ausgelieferten Text, aber NICHT als
Betreiber-Kontrakt ausgewiesen) · der Speicher-Schlüssel `__ps_consent`
(`CONSENT_STORE_KEY`) und die Fassungsmarke `ps1`. **Die Kennungen und Host-Namen sind
KEIN Betreiber-Kontrakt** — der Docblock von `CONSENT_REVOKE_API` beschränkt die Setzung
ausdrücklich auf globale JS-Namen.

**DER PRÜFWEG IST ENTSCHIEDEN — OWNER-ENTSCHEIDUNG 2026-09-17:** Scheibe 1 wird über
VERÖFFENTLICHEN auf einer Testseite geprüft, **nicht** über eine neue Vorschau. Eine
Vorschau des Dialogs im Editor ist damit kein Teil dieser Phase.

---

## Vermerke

Nummern sind stabil und werden nie neu vergeben. Ein neuer Vermerk tritt hinten an.

### VERMERK P11.13-1 — Aufklärung, 2026-09-17

**KEIN BAU-COMMIT, UND DER GRUND STEHT HIER:** Es war eine READ-ONLY-Aufklärung ohne
Änderung am Repo (docs/arbeitsweise.md, "Die Standdatei", Absatz "Ein Vermerk trägt den
Hash seines Code-Commits"). Der Arbeitsbaum war vorher und nachher sauber; die einzigen
Schreibvorgänge lagen im Scratchpad ausserhalb des Repos und in der ignorierten Ablage
`.playwright-mcp/`. Der Stand, auf dem gemessen wurde, ist `66b043e`.

**SCHEIBE 1 IST EINE FESTE GESTALT, KEINE BETREIBER-EINSTELLUNG.** Die Roadmap-Zeile sagt
wörtlich "KEIN neues Einstellungsfeld". FOLGE, je Regel geprüft: Die Dauerregel EIN
UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB greift hier NICHT, weil kein Wertebereich
entsteht — sie greift ab Scheibe 2. Der offene Punkt zu `settingsEqual` greift ebenfalls
nicht, weil sein Trigger ein TOP-LEVEL-Mitglied verlangt.

**DER HEUTIGE AUFBAU — GEMESSEN am Code (CC, 2026-09-17).** Erzeuger:
`buildConsentBarScript(mode)` über `aufbauDerLeiste` (`src/lib/tracking/consent-bar.ts`),
`buildConsentModalScript(mode)` über `aufbauDesFensters`
(`src/lib/tracking/consent-modal.ts`), das Geteilte in
`src/lib/tracking/consent-choice.ts`, die Widerruf-Hülle `wrapRevoke`
(`src/lib/tracking/consent-revoke.ts`).
**BEIM ERSTEN ERSCHEINEN SIND FÜNF BEDIENELEMENTE SICHTBAR, in dieser Reihenfolge:**
1. `div.groups`, `role="group"`, `aria-label="Bereiche"`, darin ZWEI `label.group` mit je
   `input[type=checkbox]` und `span`: "Messung" und "Werbung". **Beide starten AUS, tragen
   KEINEN Listener, haben kein `id`.**
2. `button` "Alle akzeptieren" — schreibt alle sechs Schlüssel, liest die Kästchen nicht.
3. `button` "Auswahl speichern" — liest `measure.box.checked` / `ads.box.checked` und löst
   über `CONSENT_GROUP_KEYS` in Einzelschlüssel auf.
4. `button` "Ablehnen" — `write([])`.
Alle drei Knöpfe entstehen über dasselbe `makeButton(label, pick)` mit
`try { api.write(pick()) } finally { if (host.parentNode) host.parentNode.removeChild(host); }`.
**EINEN EIN- ODER AUSGEKLAPPTEN ZUSTAND GIBT ES HEUTE NICHT:** `CONSENT_CHOICE_JS` kennt
genau drei lokale Funktionen — `makeButton`, `makeGroup`, `fillChoice` —, keinen
Umschalter, kein `hidden`, keine zweite Ansicht. Der Kopf von `consent-choice.ts` hält den
Ausschluss eines Aufklapp-Bereichs als OWNER-ENTSCHEIDUNG 2026-09-15 fest; jener Ausschluss
gilt der EINZELAUSWAHL DER FÜNF NETZWERKE.
**DIE WAHL JE GRUPPE WIRD NICHT LAUFEND GESCHRIEBEN** — erst beim Klick auf "Auswahl
speichern" gelesen und als EINE Liste an `api.write()` gegeben.

**DIE REIHENFOLGE IM DOKUMENT** entsteht an EINER Konkatenation in `injectPageViewEmitter`
(`src/lib/analytics/pageview-emitter.ts`): `gate + restore + dialog + revoke + setter +
buildPageViewScript(...)`. Welche Blöcke die Form trägt, entscheidet allein
`consentBlocksFor`. An der Probe gemessen, in Dokumentordnung: `pagesmith-consent` →
`__ps_cnr` → `__ps_clb` bzw. `__ps_cmo` → `__ps_crv` → `__ps_cns` → `__ps_pve`.

**BEREITS VERÖFFENTLICHTE SEITEN BEHALTEN IHRE GESTALT BIS ZUM NEU-VERÖFFENTLICHEN.**
`src/app/app-serve/route.ts` liefert den gespeicherten Text unverändert aus; die vier
Oberflächen-Blöcke kommen ausschliesslich über `injectPageViewEmitter`, und deren einziger
Produktiv-Aufrufer ist `publishProject` (`src/app/projects/actions.ts`).
**DREI STELLEN, AN DENEN ALTE UND NEUE GESTALT AUFEINANDERTREFFEN:**
(1) Der gespeicherte Wert `ps1:…` ist gestaltunabhängig — er trägt Schlüssellisten, keine
Oberflächen-Information; solange die Scheibe nichts Neues speichert, gibt es keine
Kollision (am Code ABLESBAR, nicht gemessen, weil die Scheibe noch nicht existiert).
(2) Ein Besucher mit gespeicherter Entscheidung sieht die neue Anordnung beim Laden nie;
er sieht sie nur über den Widerruf — und **der trifft den Block, den SEINE Seite trägt.**
(3) Der Widerruf-Link liegt beim Betreiber im Kundentext; `src/components/PublishView.tsx`
nennt ihm dafür `'<a href="#" onclick="pagesmithConsentRevoke(); return false;">Einwilligung
ändern</a>'`.

**DAS HARTE KRITERIUM DER LEISTE STEHT IM ARCHIV DER PHASE 11.5 NUR ALS ERGEBNIS, NICHT ALS
DEFINITION.** GEMESSEN (CC, 2026-09-17, Achse `sichtbereich|treffbar|elementFromPoint` über
das ganze Archiv): sechs Treffer, keiner davon eine Definition. Die zwei
Ergebnis-Formulierungen: VERMERK 6, Schritt 8 — "auf drei Messungen: 800×900 `top` 778,21 ·
800×250 `top` 128,21 · 360×640 `top` 449,03. Je fünf Elemente, alle innerhalb des
Sichtbereichs und treffbar"; VERMERK 7, Schritt 7 — "1436×1271 `top` 1149,21 · 360×640
`top` 449,03 · 820×250 `top` 128,21. Je fünf Elemente, alle treffbar." **Alle Werte sind
OWNER-ANGABEN, nicht von CC gemessen.** VERMERK 6 misst im Ladezustand, VERMERK 7 auf einer
gescrollten Seite und beim Wiederaufbau. **Daraus folgt Entscheidung P11.13-3.**

**DIE BETROFFENEN TESTS.** Gegen die Gestalt "zwei Knöpfe sichtbar, Gruppen hinter einem
Weg" beurteilt (GELESEN am Testtext, CC, 2026-09-17):
- **L5** (`src/lib/tracking/consent-bar.test.ts`) nagelt
  `toEqual(["Alle akzeptieren","Auswahl speichern","Ablehnen"])` fest — bräche sicher.
- **L13** nagelt die Kinder der Region als `["P","DIV","BUTTON","BUTTON","BUTTON"]` fest,
  dazu `role="group"`, `aria-label="Bereiche"` und `["LABEL","LABEL"]` — bräche sicher.
- **L15** verlangt die Gruppe im Startzustand und `querySelectorAll("input")` mit Länge 2 —
  bräche, sobald die Schalter erst auf Klick entstehen.
- **L16** (vier Läufe), **L17**, **L18** greifen im Startzustand direkt auf die Schalter zu
  — bräche aus demselben Grund.
- **M5, M16 (vier Läufe), M17, M18, M19** (`src/lib/tracking/consent-modal.test.ts`)
  spiegeln dieselben Achsen am Modal.
- **NICHT betroffen** bei reiner Umordnung: L14/M14 (Listener vor Einhängen), L3/L4, L6 bis
  L11, G0, M13, M15b.
**DIE MEHRDEUTIGKEITS-ACHSE FEUERT BEI DIESER ÄNDERUNG NICHT, und das ist der bemerkenswerte
Teil:** Die Tests suchen Knöpfe über `textContent`-Gleichheit in einer Liste, nicht über
einen zugänglichen Namen im Dokument. Ein NEUES Bedienelement erzeugt deshalb kein "Found
multiple elements", sondern kippt die STRUKTURLISTEN von L13/M5 und die LÄNGEN-Zusicherung
von L15/M16 — also die Achse ABWESENHEITS-BEHAUPTUNG. **EINE AUSNAHME BLEIBT OFFEN:** Trüge
der neue Weg den Text eines bestehenden Knopfes, würden die Helfer `button(...)`
mehrdeutig. Am heutigen Bestand ist das nicht entscheidbar, weil der Text noch nicht
feststeht.

**L12 BLOCKIERT `overflow`, NICHT `max-height`.** L12 prüft strukturell (Attribute an
`html`/`body` vorher und nachher, `document.head.children.length`, neue globale Namen über
einen `Object.keys(window)`-Schnappschuss mit `toEqual([])`, je mit Positivkontrolle) und
daneben mit EINER reinen Textprüfung: `/overflow/i.test(buildConsentBarScript("load"))`
muss `false` sein. Das Stylesheet der Leiste geht als String in den Blocktext — jedes
`overflow` dort macht L12 rot. **`max-height` steht auf keiner Liste;** das Modal trägt es
bereits. M12 trägt statt des Wort-Verbots ZEHN verengte Nadeln, je mit Positivkontrolle;
`overflow` allein ist dort NICHT verboten, sondern nur als Beispiel innerhalb der Nadeln
`document\.body\.` und `\.style\b` mitgeführt.

**DIE FÜNF OFFENEN PUNKTE, JE MIT URTEIL** (`docs/offene-punkte.md`, vollständig gelesen):
- **KEIN TEST LÄSST EINEN WURF BIS IN EINEN KNOPF-HANDLER DER EINWILLIGUNGS-OBERFLÄCHEN
  DURCH** — Trigger: "die nächste Runde, die am Klick-Handler von Leiste oder Modal, an
  `CONSENT_CHOICE_JS` oder an `write()` arbeitet". **FEUERT SEHR WAHRSCHEINLICH**, weil
  Knöpfe und Schalter ausschliesslich in `CONSENT_CHOICE_JS` entstehen; nur eine rein
  stilistische Umordnung ginge daran vorbei. Er verlangt keine bestimmte Lösung ("KEINE
  EMPFEHLUNG, wie der Test aussähe") und hält fest, dass ein stehenbleibender Host beim
  Modal die Kundenseite unbedienbar macht.
- **DER CONSENT-GATE-BLOCK HAT ZWEI ERZEUGER** — Trigger: eine Änderung am INHALT des
  Gate-Blocks. **FEUERT NICHT**; Scheibe 1 fasst `buildConsentRuntimes()` nicht an.
- **`settingsEqual` IST EINE ALLOWLIST** — Trigger: ein neues TOP-LEVEL-Mitglied.
  **FEUERT NICHT.** S. Vorrat P11.13-1.
- **EIN EINGESCHALTETER EINWILLIGUNGS-DIALOG OHNE ZUSTIMMUNG SIEHT AUS WIE KAPUTTES
  TRACKING** — Trigger BEREITS EINGETRETEN. **Kein Auslöser, aber Kontext für den
  Live-Test:** Steht der Dialog an und hat niemand zugestimmt, geht nichts hinaus, und das
  ist KORREKTES VERHALTEN. Wer es als Fehlschlag protokolliert, misst den Posten statt der
  Scheibe.
- **UNSER EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN** — **FEUERT NICHT**;
  Scheibe 1 ändert weder die Hook-Prüfung noch `write()`.
**DREI WEITERE POSTEN mit Consent-Bezug sind gesichtet und feuern nicht:** der unbeschriebene
Einwilligungs-Hook, der nicht erfasste Export-Pfad, die Adblocker-Kachel. Achse über die
Titelzeilen von docs/offene-punkte.md, Positivkontrolle: dieselbe Achse findet alle fünf
oben (8 von 74 Titelzeilen).

**DER PRÜFWEG, AM CODE BEANTWORTET.** Ein Test-Projekt braucht: **keinen** vorbereiteten
Tracking-Schlüssel — `publishProject` ruft `ensureTrackingKey` selbst und schreibt die
Spalte; **den Dialog eingeschaltet** — `getConsentDialog(snapshot.settings)` muss "bar" oder
"modal" liefern, sonst entsteht kein Oberflächen-Block, und gelesen wird der LAUFENDE
Client-Zustand, die Wahl muss also im selben Tab vor dem Veröffentlichen stehen; **keine
konfigurierten Ziele** — `consentBlocksFor` verzweigt allein über die Form.
**NICHT GEPRÜFT:** ob die Oberfläche der Anwendung den Schalter auch ohne jedes Ziel
anbietet.
**WIEDERERSCHEINEN NACH EINER WAHL — zwei Wege:** (1) `pagesmithConsentRevoke()` in der
Konsole; Vorbedingung `read().state === "decided"`, sonst nur die Warnung und `false`; er
liefert auch `false`, wenn schon ein Host im Dokument steht. (2)
`localStorage.removeItem("__ps_consent")` und neu laden — der Weg, den die Vorher-Messung
benutzt hat.

#### DIE VORHER-MESSUNG — DER VORHER-WERT DIESER SCHEIBE

**INSTRUMENT:** Chromium über Playwright-MCP, **Chrome/153.0.0.0**
(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) … Chrome/153.0.0.0 Safari/537.36`). Die
Werkzeug-Ablage `.playwright-mcp/` war vor dem ersten Aufruf als ignoriert geprüft
(`git check-ignore -v` → `.gitignore:28`); keine Datei im Repo angelegt.

**DER WEG ZUM ECHTEN AUSGABETEXT:** nicht nachgebaut, sondern die produktive Funktion
gerufen. Über einen Wegwerf-Lauf im Scratchpad ausserhalb des Repos wurde mit Vites
`ssrLoadModule` `src/lib/analytics/pageview-emitter.ts` geladen und
`injectPageViewEmitter(basisHtml, "probe_key_11_13", form)` für "bar" und "modal" gerufen —
**dieselbe Funktion und dasselbe Argument, die `publishProject` benutzt.** Ergebnis:
`probe-bar.html` **12 438 Bytes**, `probe-modal.html` **13 294 Bytes**.

**DEKLARIERTE ABWEICHUNG VOM VORGEGEBENEN VERFAHREN — `file://` STATT `about:blank`, MIT
GRUND:** Auf `about:blank` ist `location.origin` **"null"**, und `localStorage` wirft
**`SecurityError`** (GEMESSEN im selben Lauf). Die Leiste erschiene dort trotzdem — `read()`
fängt den Wurf und liefert `{state:"never"}` —, aber **der Speicherpfad wäre tot**, und die
Probe stünde neben der Live-Seite an genau der Achse, die diese Phase betrifft. Auf
`file://` ist `origin` **"file://"** und `localStorage` **funktioniert** (GEMESSEN).
**KEIN NETZ:** Die Seite lädt keine externe Ressource; der einzige Netzweg wäre der Beacon
auf das RELATIVE `/api/e`, und der feuert nur nach erteilter `analytics`-Einwilligung — in
dieser Probe wurde kein Knopf geklickt. Der MCP-Navigations-Befehl blockiert `file:`;
erreichbar war es nur über `browser_run_code_unsafe`.

**ERWARTUNG, VOR DEM LAUF GENANNT:** bei jedem der fünf Viewports alle fünf Bedienelemente
vollständig im Sichtfeld und treffbar, weil es heute keinen eingeklappten Zustand gibt; die
Leiste bei 1280 breit auf einer Knopf-Reihe, bei 360–390 breit auf zwei Reihen und damit
deutlich höher; das Modal nirgends am `max-height`-Anschlag, also kein eigener
Scrollbereich; keine ungefangenen Fehler.

**LEISTE** (`pagesmith-bar`, Container `.bar`):

| Viewport | `top` | Höhe | Anteil | scrollH/clientH | scrollbar | 5 Elemente drin? | treffbar? |
|---|---|---|---|---|---|---|---|
| 1280×800 | 678,22 | 121,78 | 15,2 % | 121/121 | nein | 5/5 ja | 5/5 ja |
| 1280×500 | 378,22 | 121,78 | 24,4 % | 121/121 | nein | 5/5 ja | 5/5 ja |
| 390×844 | 653,03 | 190,97 | 22,6 % | 190/190 | nein | 5/5 ja | 5/5 ja |
| 390×560 | 369,03 | 190,97 | 34,1 % | 190/190 | nein | 5/5 ja | 5/5 ja |
| 360×480 | 289,03 | 190,97 | 39,8 % | 190/190 | nein | 5/5 ja | 5/5 ja |

**MODAL** (`pagesmith-modal`, Container `.dialog`):

| Viewport | `top` | Höhe | Anteil | scrollH/clientH | scrollbar | 5 Elemente drin? | treffbar? |
|---|---|---|---|---|---|---|---|
| 1280×800 | 294,02 | 211,97 | 26,5 % | 210/210 | nein | 5/5 ja | 5/5 ja |
| 1280×500 | 144,02 | 211,97 | 42,4 % | 210/210 | nein | 5/5 ja | 5/5 ja |
| 390×844 | 291,22 | 261,56 | 31,0 % | 260/260 | nein | 5/5 ja | 5/5 ja |
| 390×560 | 149,22 | 261,56 | 46,7 % | 260/260 | nein | 5/5 ja | 5/5 ja |
| 360×480 | 109,22 | 261,56 | 54,5 % | 260/260 | nein | 5/5 ja | 5/5 ja |

**KNOPF-UMBRUCH.** Leiste: bei 1280 alle drei auf einer Reihe ("Alle akzeptieren"
`l`=392…552, "Auswahl speichern" 560…720, "Ablehnen" 728…888); bei 390 und 360 zwei Reihen
— "Alle akzeptieren" und "Auswahl speichern" nebeneinander, "Ablehnen" darunter (bei
360×480 `t` 426,41 / `b` 468,00, also 12 px über dem unteren Rand). Modal: bei 390 und 360
stehen die drei Knöpfe untereinander (je `l`=115…275 bzw. 100…260).

**UNGEFANGENE FEHLER: KEINE.** `pageerror` und Konsolen-Einträge vom Typ `error` und
`warning` wurden über alle zehn Läufe gesammelt — leeres Array.

**KEIN AUSGEKLAPPTER ZUSTAND GEMESSEN, WEIL ES KEINEN GIBT.** Die Messung ist damit der
Vorher-Wert für genau den Zustand, den Scheibe 1 aufteilt.

**REPRODUKTION, EXAKT:** `probe-<form>.html` aus
`injectPageViewEmitter(basisHtml, "probe_key_11_13", form)` erzeugen; Basis-HTML ist ein
minimales Dokument mit `<meta name="viewport" content="width=device-width,initial-scale=1">`
und einem `<main>` mit Überschrift und einem Absatz. Je Viewport: `setViewportSize` →
`goto(file://…)` → `localStorage.clear()` → `reload()` → im Schattenbaum `.bar` bzw.
`.dialog` und alle `button, input` messen. **"drin"** =
`top>=0 && left>=0 && bottom<=innerHeight && right<=innerWidth`; **"treffbar"** =
`document.elementFromPoint(mitte) === host`.

**GRENZEN DES INSTRUMENTS — ausdrücklich:**
- **Echte Kundenseiten.** Die Probeseite trägt kein fremdes CSS, keine `!important`-Flut,
  keine eigene Stapel-Ebene, keinen inneren Scroll-Container. Das Archiv 11.5 nennt eine
  reale Seite mit über 700 `!important`-Regeln; hier ist nichts davon.
- **Browser-Leisten mobiler Geräte.** 390×844 ist die CSS-Fläche eines iPhone 14, NICHT die
  sichtbare Fläche mit eingeblendeter Adress- und Tab-Leiste. Der echte Engpass liegt
  darunter — und genau er ist die Achse aus Roadmap (e).
- **Andere Browser.** Nur Chromium 153; Firefox und WebKit sind ungemessen.
- **Touch, Screenreader und Tastatur** sind nicht gemessen.
- **`file://` ist nicht `https://publayer.net`.** Für die Geometrie im Schattenbaum ohne
  Belang, für alles andere nicht.
- **"scrollH gleich clientH" belegt, dass heute nichts abgeschnitten ist — es belegt nicht,
  dass ein künftiger ausgeklappter Zustand passt.**

PROVENIENZ DIESES VERMERKS: Code-Aussagen GEMESSEN bzw. GELESEN am Repo (CC, 2026-09-17, auf
`66b043e`). Die Zitate der Roadmap-Zeile und des Archivs 11.5 GELESEN (CC, 2026-09-17). Die
Messwerte der Vorher-Messung GEMESSEN am eigenen Lauf (CC, 2026-09-17). Die Angaben des
Archivs 11.5 zum harten Kriterium sind dort als OWNER-ANGABEN ausgewiesen und werden hier
nicht verstärkt.

---

## Entscheidungen, die über ihre Scheibe hinaus binden

### Entscheidung P11.13-1 — DIE GESTALT

**EINGEKLAPPT BEIM ERSTEN ERSCHEINEN:** der Sachtext, **"Alle akzeptieren" und "Ablehnen"
GLEICHRANGIG**, dazu ein unauffälliger Weg **"Einstellungen"**.

**DER WEG IST EIN `<button>` IN TEXTOPTIK, KEIN LINK.** Ein `<a href="#">` änderte Fragment
und Scroll-Position der fremden Seite — das verbietet die Dauerregel KEIN BAUSTEIN DES
AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN (docs/immer-beachten.md),
und dieselbe Invariante I1 hat in der Scheibe 11.5e-2 bereits die Aufruf-Formen über
Attribut und URL-Fragment ausgeschlossen.

**AUSGEKLAPPT NACH DEM KLICK: EXAKT DIE HEUTIGE GESTALT** — dieselben Elemente, dieselbe
Reihenfolge. **Der Weg entfernt sich; es gibt kein Zurück.**

**DER GRUND, UND ER IST DER GANZE INHALT DIESER ENTSCHEIDUNG:** Der ausgeklappte Zustand ist
damit der **bereits gemessene** — die Vorher-Messung in VERMERK P11.13-1 und die
Live-Nachweise im Archiv der Phase 11.5 (VERMERK 6, Schritt 8; VERMERK 7, Schritt 7) messen
genau ihn. **DIE UNGEMESSENE ACHSE AUS ROADMAP (e) ENTSTEHT DAMIT NICHT:** Jene Auflage
beschreibt einen ausgeklappten Zustand, der mehr trägt als der heutige und deshalb auf
niedriger Fensterhöhe über den oberen Rand wandern kann. **L12 bleibt unberührt** — es
braucht kein `overflow` im Leisten-Block, und der dort vorab benannte Umbau von L12
entfällt. **NEU ZU MESSEN IST ALLEIN DER KLEINERE EINGEKLAPPTE ZUSTAND.**

**DIE GRENZE:** Die Entscheidung kippt, **sobald der ausgeklappte Zustand mehr trägt als
heute** — ein zusätzliches Bedienelement, ein zusätzlicher Text, eine dritte Gruppe. Dann
gilt Roadmap (e) wieder in vollem Umfang, und das harte Kriterium des ausgeklappten
Zustands ist neu zu erheben.

**SIE GILT FÜR LEISTE UND MODAL.**

PROVENIENZ: ARCHITEKT-VORSCHLAG, OWNER-FREIGABE 2026-09-17. Dass der ausgeklappte Zustand
der bereits gemessene ist, ruht auf VERMERK P11.13-1 (GEMESSEN, CC, 2026-09-17) und auf den
zwei Live-Nachweisen des Archivs 11.5 (dort OWNER-ANGABEN).

### Entscheidung P11.13-2 — DER WIDERRUF ÖFFNET AUSGEKLAPPT

Wer "Einwilligung ändern" wählt, **will auswählen**. Der über `pagesmithConsentRevoke`
wiederaufgebaute Dialog erscheint deshalb **im ausgeklappten Zustand**, nicht im
eingeklappten.

**NAME UND AUFRUF VON `pagesmithConsentRevoke` BLEIBEN UNVERÄNDERT** — er steht in
ausgeliefertem Code, Betreiber schreiben ihn in ihre eigene Seite, und eine Umbenennung
machte jeden eingebauten Aufruf still zu einem Fehler, den nur der Besucher sieht
(docs/immer-beachten.md, WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE;
der Docblock von `CONSENT_REVOKE_API` sagt dasselbe).

PROVENIENZ: ARCHITEKT-VORSCHLAG, OWNER-FREIGABE 2026-09-17.

### Entscheidung P11.13-3 — DAS HARTE KRITERIUM, ALS DEFINITION

**JEDES BEDIENELEMENT LIEGT VOLLSTÄNDIG IM FENSTER** — `top >= 0`, `left >= 0`,
`bottom <= innerHeight`, `right <= innerWidth` — **UND IST TREFFBAR**: `elementFromPoint` an
seiner Mitte trifft den Host. **JE ZUSTAND, JE VIEWPORT.**

**DER GRUND:** Das Archiv der Phase 11.5 führt das harte Kriterium **nur als Ergebnis**
("Je fünf Elemente, alle innerhalb des Sichtbereichs und treffbar"), nirgends als
Definition — GEMESSEN (CC, 2026-09-17, Achse `sichtbereich|treffbar|elementFromPoint` über
das ganze Archiv: sechs Treffer, keine Definition). **Ohne Definition misst jede Runde
etwas anderes**, und ein Ergebnis, das nicht sagt, woran es gemessen wurde, ist beim
nächsten Mal nicht wiederholbar.

**SIE BINDET ÜBER DIESE SCHEIBE HINAUS:** jede künftige Scheibe dieser Phase und jede
spätere Änderung an Leiste oder Modal misst gegen diese zwei Bedingungen.

PROVENIENZ: ARCHITEKT-VORSCHLAG, OWNER-FREIGABE 2026-09-17. Der Befund über das Archiv
GEMESSEN (CC, 2026-09-17).

---

## Zuschnitt der Scheibe 11.13a — DIE ANORDNUNG

**STATUS: ZUGESCHNITTEN, NICHT FREIGEGEBEN.** Kein Bau vor der Freigabe des Owners.

**GEGENSTAND:** Entscheidung P11.13-1 und Entscheidung P11.13-2 umsetzen — in
`src/lib/tracking/consent-choice.ts`, `src/lib/tracking/consent-bar.ts`,
`src/lib/tracking/consent-modal.ts` bzw. `src/lib/tracking/consent-revoke.ts`. **DIE ORTE
BESTIMMT DER PLAN**, nicht dieser Zuschnitt: Welcher Teil in das geteilte Code-Stück gehört
und welcher in die zwei Oberflächen-Dateien, ist eine Frage an den Bau-Plan.

**PFLICHT — DIE HERKUNFT DER TEST-ERWARTUNGEN:** Die neuen Erwartungen von **L5, L13, L15,
L16, L17, L18, M5, M16, M17, M18, M19** und jedem neu hinzukommenden Test werden **aus
Entscheidung P11.13-1 geschrieben, nicht aus dem gebauten Code** (docs/immer-beachten.md,
EIN WÄCHTER ÜBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE — UND KEIN
WÄCHTER ÜBER EINEN WORTLAUT). Eine Erwartung aus dem Code macht den Wächter zum Spiegel.

**PFLICHT — WAS ERHALTEN BLEIBT:** Die Tests, die heute das AUSGEKLAPPTE festnageln,
bleiben als Erwartung des **ausgeklappten Zustands** erhalten. Sie wandern, sie werden
nicht aufgeweicht: Die Strukturliste `["P","DIV","BUTTON","BUTTON","BUTTON"]`, die zwei
`LABEL`, die drei Knopf-Beschriftungen in ihrer Reihenfolge und `querySelectorAll("input")`
mit Länge 2 sind nach dem Klick auf den Weg **unverändert** zu erwarten.

**OFFENE PLAN-FRAGEN — FRAGEN, KEINE VORGABEN:**
1. **Wie entsteht der ausgeklappte Teil — beim Aufbau versteckt oder beim Klick erzeugt?**
   Und wie bleibt dabei **Invariante I3** (Listener vor dem Einhängen; 11.5d-2, verschärft
   in 11.5e-1 und 11.5e-2) gewahrt? Ein beim Klick erzeugter Teil bindet seine Listener
   NACH dem Einhängen des Hosts — das ist am Wortlaut von I3 zu prüfen, nicht anzunehmen.
2. **Wohin geht der Tastatur-Fokus, wenn der Weg sich entfernt?** Und **greift dabei eine
   Nadel von M12 oder L12** (`\.focus\(|\.blur\(|autofocus|tabindex`), obwohl der Fokus im
   EIGENEN Schattenbaum bliebe? Das ist derselbe Stellvertreter-Fall wie bei `overflow`
   (docs/immer-beachten.md, EIN WÄCHTER ÜBER ZEICHEN DARF DIE GESTALT DES GEPRÜFTEN NICHT
   BESTIMMEN) und im Plan zu entscheiden, nicht im Bau.
3. **Wie erfährt der Aufbau, dass er aus dem Widerruf kommt?** Heute unterscheidet
   `buildConsentBarScript(mode)` bzw. `buildConsentModalScript(mode)` die zwei Gestalten
   über zwei Platzhalter (`abbruch`, `vormerken`) in EINEM Aufbau-String. Entscheidung
   P11.13-2 verlangt einen dritten Unterschied.
4. **Welcher Text und welcher Stil tragen "unauffällig, aber erreichbar"?** Kontrast,
   Treffergrösse, Fokus-Ring. Die Beschriftung "Einstellungen" steht in Entscheidung
   P11.13-1; ihr Aussehen nicht.
5. **Der offene Punkt KEIN TEST LÄSST EINEN WURF BIS IN EINEN KNOPF-HANDLER DER
   EINWILLIGUNGS-OBERFLÄCHEN DURCH feuert mit dieser Scheibe** (sein Trigger nennt
   `CONSENT_CHOICE_JS` ausdrücklich). **DASS ER FEUERT, IST EINE ABLEITUNG AUS ENTSCHEIDUNG
   P11.13-1 UND NICHT GEMESSEN:** Der Weg "Einstellungen" ist ein Knopf mit Klick-Handler,
   und Knöpfe entstehen heute allein in `CONSENT_CHOICE_JS`. Eine Umsetzung, die das
   Code-Stück nicht anfasst, ginge am Trigger vorbei. Was der Punkt dann verlangt: Sein
   eigener Text sagt "KEINE EMPFEHLUNG, wie der Test aussähe" — die Antwort gehört in den
   Plan.

**AUSDRÜCKLICH NICHT DAZU:**
- **Thema, Farben, freier Text** — das sind die Scheiben 2, 3 und 4.
- **Speicher und Format `ps1`** — Invariante I6 der Scheibe 11.5e-2 bleibt unberührt.
- **Neue globale Namen** — Invariante I5 der Scheibe 11.5e-2 verlangte dafür einen eigenen
  Wächter; diese Scheibe legt keinen an.
- **Ein Umbau von L12** — er wird durch Entscheidung P11.13-1 gerade vermieden.
- **Eine Vorschau des Dialogs im Editor** — der Prüfweg ist das Veröffentlichen
  (OWNER-ENTSCHEIDUNG 2026-09-17).

**LIVE-TEST-ANFORDERUNG:**
- **NEU-VERÖFFENTLICHEN IST PFLICHT-SCHRITT**, nicht Hinweis. Ohne ihn misst der Tester die
  alte Seite (docs/immer-beachten.md, EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES
  PRÜFLINGS VORAUS).
- **DER EINGEKLAPPTE ZUSTAND** bei den fünf Viewports der Vorher-Messung — 1280×800,
  1280×500, 390×844, 390×560, 360×480 — **plus einem echten Mobilgerät mit eingeblendeter
  Browser-Leiste.** Das ist die Achse, die die Vorher-Messung ausdrücklich nicht zeigen
  konnte.
- **DER AUSGEKLAPPTE ZUSTAND gegen die Vorher-Werte** aus VERMERK P11.13-1 — er muss sie
  treffen, sonst ist der Grund von Entscheidung P11.13-1 nicht eingelöst.
- **DER WIDERRUF ÖFFNET AUSGEKLAPPT** (Entscheidung P11.13-2).
- **A/B-VORBEDINGUNG:** Vor jeder Beurteilung wird der A/B-Betrieb festgestellt — entweder
  abschalten oder die ausgelieferte Variante bestimmen (docs/immer-beachten.md, BEVOR EIN
  ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS RICHTIGE GEMESSEN WIRD, Teil (e)).
- Gemessen wird gegen **Entscheidung P11.13-3**, je Zustand und je Viewport.

PROVENIENZ: Gegenstand, Pflichten, Ausschlüsse und die Live-Test-Anforderung sind
ARCHITEKT-ZUSCHNITT mit OWNER-FREIGABE 2026-09-17. Die fünf Plan-Fragen ruhen auf VERMERK
P11.13-1 (GEMESSEN bzw. GELESEN am Repo, CC, 2026-09-17).

---

## Vorrat — gemeldet, nicht gebaut

### P11.13-1 — `settingsEqual` ERFASST AUCH EIN FELD INNERHALB VON `settings.consent` NICHT

`settingsEqual` (`src/lib/settings.ts`) vergleicht `getConsentDialog(a) === getConsentDialog(b)`
und die Ziel-Terme. **Ein neues Feld INNERHALB von `settings.consent`** — etwa ein
Thema-Wert in Scheibe 2 — **wäre für `dirty` ebenso unsichtbar wie ein neues
Top-Level-Mitglied**: kein Text "Ungespeicherte Änderungen", kein `beforeunload`-Wächter,
kein `confirm` beim Projektwechsel, und nichts wird davon rot.

**DER OFFENE PUNKT `settingsEqual` IST EINE ALLOWLIST (docs/offene-punkte.md) DECKT DAS
NICHT:** Sein Trigger nennt ausdrücklich ein **TOP-LEVEL**-Mitglied. Ob er den Fall
mitmeint, entscheidet sein Text nicht; hier wird er nicht aufgelöst.

**RELEVANT AB SCHEIBE 2 (Thema).** **KEIN EIGENER TRIGGER AUSSER DIESEM: der Zuschnitt der
Scheibe 2.**

PROVENIENZ: GEMESSEN am Code (CC, 2026-09-17); der Wortlaut des Triggers GELESEN in
docs/offene-punkte.md (CC, 2026-09-17). Dass der Punkt den Fall nicht deckt, ist am
Trigger-Wortlaut ABLESBAR.

---

## Hebungs-Kandidaten

Keine. Dieser Abschnitt steht, damit die Klasse beim Phasenende nicht übersehen wird.
