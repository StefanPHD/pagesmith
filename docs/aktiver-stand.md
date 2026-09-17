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
6. Zuschnitt der Scheibe 11.13a — DIE ANORDNUNG (VERDICHTET 2026-09-17)
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
Umschalter, kein `hidden`, keine zweite Ansicht. Der Kopf von `consent-choice.ts` hält eine
OWNER-ENTSCHEIDUNG vom 2026-09-15 fest, die ZWEIERLEI ausschloss: einen AUFKLAPP-BEREICH
UND eine EINZELAUSWAHL DER FÜNF NETZWERKE. **Der Aufklapp-Teil ist abgelöst** —
docs/roadmap.md, Roadmap-Zeile 11.13, Punkt (c), und Entscheidung P11.13-1 dieser Phase
(OWNER-FREIGABE 2026-09-17); **die Einzelauswahl bleibt ausgeschlossen.** Der Wortlaut im
Kopf jener Datei ist mit dem Bau-Commit `bb9f045` entsprechend ersetzt.
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

### VERMERK P11.13-2 — Scheibe 11.13a, DIE ANORDNUNG, abgeschlossen 2026-09-17

**GEGENSTAND:** Leiste und Modal erscheinen eingeklappt — Sachtext, "Alle akzeptieren",
"Ablehnen" und der Weg "Einstellungen". Der Klick hängt die vorgebauten Gruppen und
"Auswahl speichern" an ihre heutigen Plätze und entfernt den Weg. Der Widerruf öffnet
ausgeklappt.

**BAU-COMMIT:** `bb9f045` — `feat(consent): Einwilligungs-Dialog eingeklappt mit Weg zu den
Einstellungen (11.13a)`, gepusht. SECHS Dateien, 637 Zeilen hinzu, 68 entfernt:
`consent-choice.ts`, `consent-bar.ts`, `consent-modal.ts`, `consent-bar.test.ts`,
`consent-modal.test.ts`, `consent-revoke.test.ts`. **`consent-revoke.ts` NICHT im Commit** —
die Unterscheidung der zwei Gestalten fällt beim Aufruf, nicht in der Hülle.
**DER FREIGABE-COMMIT IST `cb91a45`** (`docs(claude): Freigabe-Entscheidungen zum Plan
11.13a`); er trug den Block "FREIGABE 2026-09-17 — ENTSCHEIDUNGEN ZUM PLAN" in den
Zuschnitt ein. **DER BLOCK IST MIT DER VERDICHTUNG DESSELBEN TAGES AUS DIESER DATEI
VERSCHWUNDEN** — was über die Scheibe hinaus bindet, steht als Entscheidung P11.13-4; der
ungekürzte Wortlaut ist unter jenem Commit nachzulesen.

**DIE GESTALT** (GEMESSEN am Code, CC, 2026-09-17): `fillChoice(panel, ausgeklappt)` baut
Gruppe, die drei Knöpfe und — eingeklappt — den Weg über `makeWay`; **alle Elemente
entstehen im Aufbau und sind dort verdrahtet**, eingeklappt sind Gruppe und "Auswahl
speichern" nur NICHT EINGEHÄNGT. Der Startzustand ist ein **Bauzeit-Literal**: ein dritter
Platzhalter in `aufbauDerLeiste` bzw. `aufbauDesFensters`, `false` im Lade-Zweig, `true` im
Widerruf-Zweig. **Kein neuer globaler Name, kein Zugriff auf Speicher oder Format `ps1`.**

**DIE VIER GATES:** `vitest run` **von 1 790 auf 1 805 Tests** bei unverändert 83 Dateien
(+15). Die 1 790 sind GEMESSEN, nicht gerechnet — `git stash push -- src/`, voller Lauf,
`git stash pop`; danach `sha256sum -c` über alle sechs Dateien, 6× OK. `tsc --noEmit` exit 0
· `lint` 0 errors / 1 warning (die vorbestehende in `consent.test.ts`) · `build` Compiled
successfully. Alle vier GEMESSEN (CC, 2026-09-17).

**DIE BYTE-GLEICHHEIT BEI AUSGESCHALTETEM SCHALTER — LOKAL GEMESSEN:** Der Ausgabetext von
`injectPageViewEmitter(basisHtml, "probe_key_11_13", "off")` ist vor und nach dem Bau
**byte-gleich**: 1 897 Bytes, sha256 `1ae8d3db…`, `cmp` ohne Abweichung. Der Vorher-Wert ist
VOR dem ersten Eingriff in `src/` erhoben (CC, 2026-09-17).

**DIE BLOCKGRÖSSEN** (GEMESSEN, CC, 2026-09-17; Rumpf je 0 Vorkommen von `<`):
Leiste `load` 3 785 → **4 603** (+818), `revoke` 4 101 → **4 918** (+817);
Modal `load` 4 213 → **5 051** (+838), `revoke` 4 529 → **5 366** (+837).

**W0 IST GESTRICHEN, T9 IST SEIN ERSATZ** (Freigabe E1). W0 hielt den Lade-Zweig auf zwei
Byte-Zahlen und zwei sha256-Werte; seine Sache war die Invariante der Scheibe 11.5e-2 und
ist mit ihr abgelaufen. T9 prüft je Form **strukturell**: Nach Ersetzen der drei
Einsetzwerte ist der Widerruf-Aufbau der Lade-Aufbau. Er führt keine Zahl.

**ZWEI NADEL-VERENGUNGEN IN M12 UND W11, BEIDE BENANNT UND MIT GEGENPROBE:**
- `/\.focus\(|…/i` → `/(?<!measure\.box)\.focus\(|…/i`. Gegenproben im selben Lauf:
  `measure.box.focus()` trifft **nicht**, `document.body.focus()` trifft.
- `/scroll/i` → `/(?<!prevent)scroll/i`. **Diese zweite war nicht vorhergesehen** und wurde
  erst rot: `preventScroll` ist die UMKEHRUNG dessen, was jene Nadel schützt. Gegenproben:
  `measure.box.focus({ preventScroll: true })` trifft **nicht**, `window.scrollY = 0` trifft.
**Die zehn Nadeln sind sonst unverändert; L12 trägt keine Nadeln und ist unberührt** —
ergänzt wurde dort allein der Wirkungs-Test L12b (Fokus auf keinem fremden Knoten).

**DIE ELF PFLICHT-MUTATIONEN** (je über die ganze Suite, Vorhersage als KLASSE vor dem Lauf,
nach jeder Rücknahme sha256 identisch):

| # | Gesetzt | Ergebnis | Urteil |
|---|---|---|---|
| Mu1 | `removeChild(weg)` entfernt | 5: L5, L13, L20, M5, M21 | DECKUNG, eine Klasse |
| Mu2 | `insertBefore(speichern, ablehnen)` entfernt | 13: dieselben plus L16×4, M17×4 | DECKUNG, eine Klasse |
| Mu3 | Widerruf öffnet eingeklappt (nur Leiste) | 2: W16, W14 | DECKUNG |
| Mu4 | `fillChoice` nach `body.appendChild(host)` (nur Leiste) | 2: L14, W13 | DECKUNG; **die Vorhersage nannte zusätzlich M14 und war ZU BREIT** — die Mutation lag allein in `consent-bar.ts` |
| Mu5 | `groups` auch eingeklappt angehängt | 3: L19, M20, W17 | DECKUNG; ausgeklappt bleibt korrekt, weil `insertBefore` ein vorhandenes Kind nur verschiebt |
| Mu6 | "Ablehnen" eingeklappt entfernt | 27 | **ZWEI KLASSEN:** (A) L19, M20, W17 — die Sache; (B) KASKADE — `insertBefore` wirft, der Aufbau bricht, alles Ausgeklappte fällt mit. **(B) ist kein Deckungsnachweis** |
| Mu7 | Weg als `<a href="#">` | 30 | **ZWEI KLASSEN:** (A) L21, M22, dazu L19, M20, W17; (B) KASKADE — `button("Einstellungen")` findet kein BUTTON, `ausklappen()` wirft |
| Mu8 | `measure.box.focus` → `document.body.focus` | 4: M12, W11, L12b, M12b | DECKUNG; die Verengung ist eng geblieben |
| Mu9 | eine Anweisung nur in den Widerruf-Zweig, **hinter** dem Aufbau | **0 — GRÜN** | **SCHLECHTES MODELL DES FEHLERS, kein Testloch:** die Anweisung lag ausserhalb des von T9 verglichenen Ausschnitts. Untersucht statt weggebucht |
| Mu9b | dieselbe Anweisung **innerhalb** des Ausschnitts | 1: T9 (bar) | DECKUNG |
| Mu10 | `preventScroll` entfernt | 2: L23, M24 | DECKUNG gegen die Tests; **in der Probe NICHT sichtbar**, s. unten |
| Mu11 | `.way{flex:0 0 100%}` entfernt | **0 gegen die Tests** | **ERWARTET UND KEINE LÜCKE:** jsdom wertet kein CSS aus. **Nur die Probe zeigt es**, und sie tut es |

**DIE PROBE** (Playwright, **Chromium 153**, `file://` im Scratchpad, echter Ausgabetext über
`injectPageViewEmitter` — dieselbe Bauform wie die Vorher-Messung in VERMERK P11.13-1;
GEMESSEN, CC, 2026-09-17):

- **AUSGEKLAPPT: KEINE EINZIGE ABWEICHUNG VON DEN VORHER-WERTEN.** Beide Formen, alle fünf
  Viewports: `top`, Höhe, Anteil, `scrollHeight`/`clientHeight` und **jede Element-Lage**
  zeichengleich mit VERMERK P11.13-1. **Das ist der Beleg für den Grund von Entscheidung
  P11.13-1** — der ausgeklappte Zustand ist der bereits gemessene, und die ungemessene
  Achse aus Roadmap (e) entsteht nicht.
- **EINGEKLAPPT, P11.13-3 erfüllt (alles im Fenster und treffbar), 5/5 je Form.** Höhe und
  Anteil — Leiste: 94,19 / 11,8 % · 94,19 / 18,8 % · 161,38 / 19,1 % · 161,38 / 28,8 % ·
  161,38 / 33,6 %. Modal nach K2: 182,38 / 22,8 % · 182,38 / 36,5 % · 231,97 / 27,5 % ·
  231,97 / 41,4 % · 231,97 / 48,3 %. **Beide Formen sind eingeklappt durchgehend kleiner als
  ausgeklappt** (Leiste 121,78 bzw. 190,97; Modal 211,97 bzw. 261,56).
- **DAS FOKUS-KRITERIUM AUS E2 IST ZUERST GEFALLEN.** Auf einer Probeseite **ohne** eigene
  fokussierbare Elemente war es grün; auf einer Probeseite **mit** Link, Knopf und Feld lief
  der nächste Tab-Schritt auf **`A:Ein Link der Seite`** — vier von vier Läufen. **Nach dem
  Rückfall (a)** liegt der Fokus nach `Enter` auf `INPUT:Messung` im eigenen Host und der
  nächste Tab auf `INPUT:Werbung` — **vier von vier**.
- **SCROLL:** Auf einer Seite über mehrere Fensterhöhen, zum Weg getabbt, dann auf die Mitte
  gescrollt, dann `Enter`: `window.scrollY` **945 → 945** bzw. **1457 → 1457**, beide Formen,
  1280×800 und 360×480.
- **UNGEFANGENE FEHLER: KEINE**, über alle Läufe.

**ZWEI INSTRUMENTENFEHLER, IM LAUF SELBST GEFANGEN — sie gehören in den Vermerk, weil beide
eine falsche Entwarnung erzeugt hätten:**
1. **Die Scroll-Probe scrollte zuerst VOR dem Tabben.** Das Tabben selbst holt die Seite an
   den Anfang; `scrollY` war beim `Enter` bereits 0, und "vorher gleich nachher" war
   **trivial wahr**. Korrigiert: erst zum Weg tabben, dann scrollen, dann `Enter`.
2. **Die Reihen-Prüfung verglich zuerst `top`-Gleichheit.** Der Weg trägt keinen Rahmen und
   hat deshalb in derselben Reihe ein anderes `top`; die Leiste bei 1280 wurde dadurch
   fälschlich als "Weg allein" gemeldet. Korrigiert auf **vertikale Überlappung**.

**DIE GLEICHRANGIGKEIT — DAS KRITERIUM IN SEINER GÜLTIGEN FASSUNG (ARCHITEKT-RICHTIGSTELLUNG
2026-09-17):** "Der Weg teilt keine Reihe mit GENAU EINEM der beiden Knöpfe; 'Alle
akzeptieren' und 'Ablehnen' sind gleich breit und stehen in derselben Reihe oder jeder in
einer eigenen." **DIE ZUERST GEGEBENE FASSUNG — "kein Knopf teilt seine Reihe mit dem Weg" —
STAND IM WIDERSPRUCH ZU IHRER EIGENEN FREIGABE DER LEISTE BEI 1280**, wo alle drei in einer
Reihe stehen.
**GEMESSEN (CC, 2026-09-17), Reihen über vertikale Überlappung:** **Leiste 5/5** —
Breiten 160/160, "Alle akzeptieren" und "Ablehnen" durchgehend in derselben Reihe; bei 1280
teilen beide die Reihe mit dem Weg, bei 390/360 keiner. **Modal 5/5 nach K2** — der Weg
teilt keine Reihe mit einem Knopf, Breiten 160/160, die zwei Knöpfe bei 1280 in derselben
Reihe und bei 390/360 je in einer eigenen. **OHNE K2 IST DAS MODAL BEI 390/360 VERLETZT:**
Mutation Mu11 zeigt "Ablehnen" mit dem Weg in einer Reihe, während "Alle akzeptieren" allein
steht. **Der Preis von K2, benannt:** rund 47,6 px mehr Höhe (184,38 → 231,97) und ein voll
breites Weg-Element (324 bzw. 294 px) bei zentrierter Beschriftung.

**DER LIVE-NACHWEIS vom 2026-09-17 — ALLE WERTE SIND OWNER-ANGABEN, NICHT VON CC GEMESSEN;
Deployment als "Ready" bestätigt:**
1. **Schritt 1 ("off" byte-gleich): LIVE NICHT BELEGT.** Die als "vor dem Push, aus"
   beschriftete Sicherung ist **byte-gleich mit der Sicherung der Leisten-Seite** (sha256
   `42480d2d…`, ARCHITEKT-PRÜFUNG 2026-09-17) — eine Aus-Sicherung von vor dem Push gibt es
   nicht. **ES TRÄGT DIE LOKALE MESSUNG** (1 897 Bytes, `cmp` ohne Abweichung). Die
   Nachher-Sicherung der Aus-Seite enthält nur `pagesmith-consent` und `__ps_pve`, **keinen
   Dialog-Baustein** (ARCHITEKT-PRÜFUNG).
2. **Eine vor dem Deploy veröffentlichte, unberührte Seite zeigt die alte, sofort
   ausgeklappte Gestalt.**
3. **/4. Neu veröffentlicht:** eingeklappt Text und drei Bedienelemente, **keine Kästchen**;
   alles sichtbar und antippbar bei 1280×800, 1280×500, 390×844, 390×560, 360×480 **UND auf
   einem echten iPhone mit eingeblendeter Browser-Leiste, in Safari und in Chrome.**
   **DAS SCHLIESST DIE GRENZE DER LOKALEN PROBE**, die Browser-Leisten mobiler Geräte
   ausdrücklich nicht zeigen konnte.
5. **Ausklappen zeigt die Kästchen, der Weg verschwindet, die Seite springt nicht.**
6. **Modal analog;** mobil stehen "Alle akzeptieren" und "Ablehnen" untereinander, der Weg
   darunter — die Lage, die K2 herstellt.
7. **/7a. Nach `Enter` auf dem Weg bleibt der nächste Tab-Schritt im Dialog; auf einer
   gescrollten Seite kein Sprung.** **AUSDRÜCKLICH KEINE FOKUS-FALLE** — sie ist nicht gebaut
   und wird nicht behauptet; weiteres Tabben darf den Dialog verlassen.
8. **`pagesmithConsentRevoke()` öffnet ausgeklappt.**
9. **"nur Werbung": kein PageView, die Conversion kommt im Meta-Testbereich an, Browser- und
   Server-Ereignis dedupliziert.** Das ist der Beleg, dass die Auflösung der Gruppen bis zum
   Fan-Out durchträgt.

**DIE GRENZEN, DIE DIESER NACHWEIS NICHT ÜBERSCHREITET:**
- Lokal nur **Chromium 153**; welche Desktop-Browser live benutzt wurden, nennen die
  Owner-Angaben nicht.
- **Screenreader ungeprüft** — was aus "Einstellungen" und "Bereiche" angesagt wird, ist
  nicht erhoben.
- **Die Fokus-Messung hängt an der Tab-Reihenfolge der fremden Seite** (Vorrat P11.13-4).
- **`preventScroll` ist lokal nicht messbar** (Vorrat P11.13-3).
- Schritt 1 ist live nicht belegt (oben, Punkt 1).

PROVENIENZ: Bau-Commit, Dateiliste, Gates, Testzahlen, Mutationen, Blockgrössen, die
Byte-Gleichheit bei AUS und sämtliche Probe-Werte sind GEMESSEN am Repo bzw. am eigenen Lauf
(CC, 2026-09-17). Die Richtigstellung des Gleichrangigkeits-Kriteriums ist
ARCHITEKT-ENTSCHEIDUNG 2026-09-17. Der Live-Nachweis und die zwei Architekt-Prüfungen zu
Schritt 1 sind OWNER- bzw. ARCHITEKT-ANGABEN vom 2026-09-17 und am Repo nicht prüfbar.

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

### Entscheidung P11.13-4 — DER FOKUS WANDERT AUF DAS ERSTE EIGENE KÄSTCHEN, OHNE ZU SCROLLEN

**Der Klick auf den Weg setzt den Fokus über `measure.box.focus({ preventScroll: true })`.**
Das Ziel liegt im **eigenen** Schattenbaum; Invariante I1 ist unberührt.

**DER GRUND IST GEMESSEN, NICHT GEWÄHLT** (CC, 2026-09-17, Chromium 153): Ohne
programmatischen Aufruf fällt der Fokus beim Entfernen des Wegs auf `document.body`, und der
NÄCHSTE Tabulator-Schritt landet beim **ersten fokussierbaren Element der FREMDEN Seite** —
vier von vier Läufen, Leiste und Modal, 1280×800 und 360×480. **Auf einer Probeseite OHNE
eigene Bedienelemente war dasselbe Kriterium grün; das war die Falle.**
**`preventScroll` IST TEIL DER ENTSCHEIDUNG:** Ohne die Option scrollt der Browser das Ziel
bei Bedarf in den Sichtbereich und ändert damit die Scroll-Position der fremden Seite — genau
das verbietet I1.

**WAS SIE MITBINDET — ZWEI BENANNTE NADEL-VERENGUNGEN IN M12 UND W11**, je mit Gegenprobe im
selben Lauf: `/(?<!measure\.box)\.focus\(|…/i` und `/(?<!prevent)scroll/i`. **Die Ausnahmen
sind eng und namentlich**; jeder andere Fokus- oder Scroll-Ausdruck bleibt verboten.

**SIE BINDET JEDE SPÄTERE ÄNDERUNG AN LEISTE ODER MODAL:** Wer dort einen Fokus setzt, setzt
ihn auf `measure.box` und mit `preventScroll`, oder er verengt die Nadeln erneut — benannt,
mit Positivkontrolle, als eigene Änderung.

**DIE GRENZE:** Sie kippt, **sobald ein Fokus-Ziel ausserhalb von `measure.box` nötig wird**
— etwa weil die eingeklappte Gestalt kein Kästchen mehr an erster Stelle hat. Dann ist die
Verengung neu zu fassen, nicht zu dehnen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-17 (Freigabe E2 und Korrektur K1), OWNER-FREIGABE
desselben Tages. Der Fokus-Verlust und die Wirkung des Rückfalls sind GEMESSEN (CC,
2026-09-17); dass `preventScroll` wirkt, ist lokal NICHT messbar (Vorrat P11.13-3) und live
als "kein Sprung" beobachtet (OWNER-ANGABE, Schritt 7a).

### Entscheidung P11.13-5 — DAS GLEICHRANGIGKEITS-KRITERIUM

**DER WEG TEILT KEINE REIHE MIT GENAU EINEM DER BEIDEN KNÖPFE; "Alle akzeptieren" und
"Ablehnen" sind gleich breit und stehen in derselben Reihe oder jeder in einer eigenen.**

**DER GRUND:** Der Guardrail der Roadmap-Zeile 11.13, Punkt (h), verlangt die visuelle
Gleichrangigkeit der zwei Knöpfe. Klasse, Grösse und Stufe sind im Bestand identisch — die
**Lage** ist es nicht automatisch: Steht einer allein und teilt der andere seine Reihe mit
dem Weg, liest sich der zweite als nachrangig. **GEMESSEN (CC, 2026-09-17):** Genau das trat
im Modal bei 390 und 360 px Breite ein, weil das Fenster dort 326 px innen bietet und zwei
Knöpfe zu 160 px plus 8 px Abstand 328 brauchen.

**DIE FASSUNG IST EINE RICHTIGSTELLUNG.** Zuerst lautete das Kriterium "kein Knopf teilt
seine Reihe mit dem Weg". **Das stand im Widerspruch zur Freigabe der Leiste bei 1280**, wo
alle drei in einer Reihe stehen und die Gleichrangigkeit gerade erfüllt ist. Ersetzt, nicht
gestempelt.

**SIE BINDET DIE SCHEIBEN 2 BIS 4:** Thema, Farben und freier Text können Breiten und
Umbrüche verschieben. **Jede von ihnen misst das Kriterium erneut**, je Form und je
Viewport, und **Reihen werden über vertikale Überlappung bestimmt, nicht über
`top`-Gleichheit** — der Weg trägt keinen Rahmen und hat in derselben Reihe ein anderes
`top`.

**DIE GRENZE:** Sie ruht auf der heutigen Knopfbreite von 160 px und der heutigen
Innenbreite der zwei Behälter. Ändert eine spätere Scheibe eines von beidem, ist das
Kriterium nicht falsch, aber seine Erfüllung neu zu messen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG und ARCHITEKT-RICHTIGSTELLUNG 2026-09-17 (Korrektur K2).
Die Messwerte und die 326-gegen-328-Rechnung sind GEMESSEN (CC, 2026-09-17).

---

## Zuschnitt der Scheibe 11.13a — DIE ANORDNUNG (VERDICHTET 2026-09-17)

**STATUS: ABGELAUFEN.** Die Scheibe ist gebaut und live bewiesen — VERMERK P11.13-2,
Bau-Commit `bb9f045`. Der ungekürzte Wortlaut des Zuschnitts steht im Commit `023eb5a`,
der des Freigabe-Blocks in `cb91a45`.

**WAS ABGELAUFEN IST — die Titel, ohne Marke** (ohne `###`, damit eine
Überschriften-Suche sie nicht trifft: docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT, Zusatz vom 2026-08-27):
- STATUS: ZUGESCHNITTEN, NICHT FREIGEGEBEN
- GEGENSTAND — die vier Dateien; die Orte bestimmt der Plan
- PFLICHT — DIE HERKUNFT DER TEST-ERWARTUNGEN (elf Tests namentlich, aus Entscheidung
  P11.13-1 statt aus dem Code)
- PFLICHT — WAS ERHALTEN BLEIBT (Strukturliste, zwei `LABEL`, drei Beschriftungen, zwei
  `input` — nach dem Klick unverändert)
- AUSDRÜCKLICH NICHT DAZU
- LIVE-TEST-ANFORDERUNG
- FREIGABE 2026-09-17 — ENTSCHEIDUNGEN ZUM PLAN, mit: DER AUFBAU — VORSCHLAG (c) AUS G1
  IST FREIGEGEBEN: VORGEBAUT, VERDRAHTET, NICHT EINGEHÄNGT · E1 — W0 WIRD GESTRICHEN,
  NICHT NEU GESETZT · E2 — DER FOKUS BLEIBT OHNE PROGRAMMATISCHEN AUFRUF (G3, Kandidat
  (c)), MIT EINEM KRITERIUM

**WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST UMGEZOGEN UND STEHT NICHT MEHR HIER:** die
Fokus-Entscheidung samt den zwei benannten Nadel-Verengungen als **Entscheidung P11.13-4**,
das Gleichrangigkeits-Kriterium als **Entscheidung P11.13-5**. Der Ausschluss von Thema,
Farben und freiem Text bleibt gültig — er ist der Zuschnitt der Scheiben 2, 3 und 4.

**DIE FÜNF PLAN-FRAGEN — GESCHLOSSEN, je mit Antwort und Fundstelle:**
1. **Wie entsteht der ausgeklappte Teil, und wie bleibt I3 gewahrt?** — **VORGEBAUT,
   VERDRAHTET, NICHT EINGEHÄNGT** (Kandidat (c)). Gruppe und "Auswahl speichern" entstehen
   im Aufbau mit ihren Listenern und leben bis zum Klick in lokalen Variablen; der Klick
   hängt sie an ihre heutigen Plätze und entfernt den Weg. **I3 IST AM WORTLAUT GEWAHRT:**
   Bei `body.appendChild(host)` sind alle Listener gebunden. Die zwei anderen Kandidaten
   sind mit Grund gefallen (CSS-Versteck: Nadel-Ausweichen am Zeichen und Verlust der
   Abwesenheits-Behauptung von T1; Erzeugen beim Klick: hält I3 nur mit einer Auslegung).
   FUNDSTELLE: `fillChoice` in `src/lib/tracking/consent-choice.ts`; Nachweis T1 und die
   Struktur-Tests nach dem Klick, VERMERK P11.13-2.
2. **Wohin geht der Fokus, und greift dabei eine Nadel?** — **DAS KRITERIUM DER FREIGABE E2
   IST IN DER PROBE GEFALLEN**, der dort vorgesehene Rückfall ist gezogen:
   `measure.box.focus({ preventScroll: true })`, und die zwei Nadeln in M12 und W11 sind
   benannt verengt, je mit Gegenprobe. **DIE ANTWORT BINDET ÜBER DIE SCHEIBE HINAUS UND
   STEHT DESHALB ALS Entscheidung P11.13-4**; hier nur der Zeiger. FUNDSTELLE: VERMERK
   P11.13-2, Abschnitt zur Probe und zu den Nadel-Verengungen.
3. **Wie erfährt der Aufbau, dass er aus dem Widerruf kommt?** — **ÜBER EINEN DRITTEN
   PLATZHALTER** `ausgeklappt` im gemeinsamen Aufbau-String, `"true"` im Widerruf-Zweig und
   `"false"` im Lade-Zweig. Der Aufbau bleibt EINER; es entsteht keine zweite Kopie.
   FUNDSTELLE: `aufbauDerLeiste` in `src/lib/tracking/consent-bar.ts` und das Pendant in
   `src/lib/tracking/consent-modal.ts`; Nachweis T9 (ein Aufbau, zwei Einsetzungen) und
   L19 / M20.
4. **Welcher Text und welcher Stil tragen "unauffällig, aber erreichbar"?** —
   `CONSENT_WAY_LABEL = "Einstellungen"`, ein `button` mit **EIGENER KLASSE `.way`**:
   rahmenlos, durchsichtig, unterstrichen, `font-weight:400`, `min-width:0`. **DIE EIGENE
   KLASSE IST NICHT KOSMETIK:** Der nackte `button`-Selektor des Bestands hätte den Weg wie
   einen Knopf gestaltet. Im Modal kommt `.way{flex:0 0 100%}` hinzu — die Korrektur K2,
   ohne die das Gleichrangigkeits-Kriterium bei 390 und 360 px bricht. FUNDSTELLE:
   `CONSENT_CHOICE_CSS` und `makeWay` in `consent-choice.ts`, `CONSENT_MODAL_CSS` in
   `consent-modal.ts`; Messwerte in VERMERK P11.13-2.
5. **Der offene Punkt KEIN TEST LÄSST EINEN WURF BIS IN EINEN KNOPF-HANDLER DER
   EINWILLIGUNGS-OBERFLÄCHEN DURCH** — **ER HAT GEFEUERT, UND ER IST GEDECKT:** L22
   (Leiste) und M23 (Modal) ersetzen `window.__psConsentStore.write` durch eine werfende
   Funktion, klicken "Ablehnen" und halten fest, dass der Wurf das `error`-Ereignis des
   Fensters erreicht und keine Oberfläche stehenbleibt; Positivkontrolle im selben Lauf.
   FUNDSTELLE: `src/lib/tracking/consent-bar.test.ts` und
   `src/lib/tracking/consent-modal.test.ts`, Commit `bb9f045`; der Punkt selbst ist am
   2026-09-17 in docs/offene-punkte.md auf Titel, Satz und Beleg gekürzt.

PROVENIENZ: Der Zuschnitt und seine Freigabe sind ARCHITEKT mit OWNER-FREIGABE 2026-09-17;
die fünf Antworten sind der gebaute und gemessene Stand derselben Woche (VERMERK
P11.13-2). Die Verdichtung ist CC, 2026-09-17.


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

### P11.13-2 — T9 REICHT WENIGER WEIT ALS DER GESTRICHENE W0

T9 belegt, dass Lade- und Widerruf-Text je Form aus EINEM Aufbau stammen: nach Ersetzen der
drei Einsetzwerte sind sie zeichengleich. **ER BELEGT NICHT, DASS DER LADE-ZWEIG GEGENÜBER
EINEM FRÜHEREN STAND UNVERÄNDERT IST** — genau das tat W0 über Byte-Zahl und sha256.

**DIE LÜCKE IST GEMESSEN UND NICHT VERMUTET:** Die Mutation Mu9 blieb GRÜN, weil sie eine
Anweisung ausserhalb des von T9 verglichenen Ausschnitts traf; erst die geschärfte Mu9b
machte T9 (Leiste) rot. **EINE ÄNDERUNG, DIE BEIDE GESTALTEN GLEICHERMASSEN VERSCHIEBT,
SIEHT T9 NICHT.**

**DASS DIE BYTE-GLEICHHEIT DES "AUS"-FALLES WEITERHIN GEWACHT IST, GEHÖRT DANEBEN** und
schliesst die Lücke nicht: Jener Wächter hält den Fall ohne eingeschalteten Dialog, nicht
den Lade-Zweig der Oberflächen.

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die eine Zusicherung über die
UNVERÄNDERTHEIT des Lade-Zweigs gegenüber einem früheren Stand braucht.** Wer sie braucht,
schreibt sie aus der ENTSCHEIDUNG, nicht aus dem Bau — sonst entsteht der Spiegel, wegen
dessen W0 gestrichen wurde.

PROVENIENZ: Mu9 und Mu9b GEMESSEN am eigenen Lauf (CC, 2026-09-17); die Reichweite von T9
ist an seinem Code ABLESBAR.

### P11.13-3 — DASS `preventScroll` WIRKT, IST LOKAL NICHT MESSBAR

Die Option ist gesetzt (Entscheidung P11.13-4). **OB SIE ETWAS VERHINDERT, WAR IN DER PROBE
NICHT ZU ZEIGEN:** Der Host ist `position:fixed`, sein Ziel liegt im sichtbaren Bereich, und
ein Browser scrollt dann ohnehin nicht. Eine Gegenprobe OHNE die Option ergäbe denselben
Wert — sie unterschiede die zwei Zustände nicht (docs/immer-beachten.md, EINE VORBEDINGUNG,
DIE AUCH DER ALTE ZUSTAND ERFÜLLT, IST KEINE VORBEDINGUNG).

**WAS VORLIEGT:** `scrollY` blieb in der Probe über den Klick hinweg unverändert (945 bzw.
1457), und live ist "kein Sprung" beobachtet (OWNER-ANGABE, Schritt 7a). **BEIDES IST MIT
UND OHNE DIE OPTION ZU ERWARTEN.**

**DIE OPTION BLEIBT TROTZDEM**, weil ihr Weglassen eine Zusicherung aufgäbe, die nichts
kostet — nicht, weil ihre Wirkung belegt wäre.

**KEIN EIGENER TRIGGER AUSSER DIESEM: die erste Gestalt, bei der das Fokus-Ziel AUSSERHALB
des sichtbaren Bereichs liegen kann** — dann wird die Option unterscheidbar und ist zu
messen.

PROVENIENZ: der Aufbau des Hosts GEMESSEN am Code (CC, 2026-09-17), die zwei `scrollY`-Werte
GEMESSEN in der Probe desselben Tages; die Nicht-Messbarkeit ist eine ABLEITUNG daraus.

### P11.13-4 — DIE FOKUS-MESSUNG HÄNGT AN DER TABULATOR-ORDNUNG DER FREMDEN SEITE

Das Kriterium der Freigabe E2 ist zuerst GRÜN und dann ROT gemessen worden — **am selben
Code, an zwei verschiedenen Probeseiten.** Die erste trug ausser dem Dialog nichts
Fokussierbares; dort war der nächste Tabulator-Schritt zwangsläufig wieder ein eigenes
Kästchen. Erst die zweite Seite mit Link, Knopf und Eingabefeld zeigte den Verlust.

**DIE FOLGE IST EINE AUFLAGE AN JEDE KÜNFTIGE FOKUS-MESSUNG DIESES DIALOGS: Die Probeseite
trägt mindestens ein fokussierbares Element ausserhalb des Dialogs**, sonst misst sie eine
Eigenschaft der Probe statt des Prüflings (docs/immer-beachten.md, EINE ANLEITUNG, DIE EINE
VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE ENTWARNUNG).

**DIE ACHSE BLEIBT AUCH DANN UNGEDECKT, WENN DIE PROBE GRÜN IST:** Die reale fremde Seite
bestimmt die Ordnung, und wir kennen sie nicht. Gebaut ist der Fokus deshalb als Setzung,
nicht als Verlass auf die Plattform.

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die den Fokus des Dialogs misst
oder verschiebt.**

PROVENIENZ: die zwei Läufe GEMESSEN am eigenen Lauf (CC, 2026-09-17); dass die reale Seite
die Ordnung bestimmt, ist eine ABLEITUNG.

---

## Hebungs-Kandidaten

Keine. Dieser Abschnitt steht, damit die Klasse beim Phasenende nicht übersehen wird.
