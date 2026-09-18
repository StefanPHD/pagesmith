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
7. Zuschnitt der Scheibe 11.13b — DAS THEMA (VERDICHTET 2026-09-17)
8. Zuschnitt der Scheibe 11.13c — EIGENE FARBEN (VERDICHTET 2026-09-18)
9. Zuschnitt der Scheibe 11.13d — FREIER SACHTEXT (VERDICHTET 2026-09-18)
10. Zuschnitt der Scheibe 11.13e — DIE SPRACHE (VERDICHTET 2026-09-18)
11. Vorrat — gemeldet, nicht gebaut
12. Hebungs-Kandidaten

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
4. **FREIER TEXT.** Eine eigene Scheibe; ihre Sicherheitsachse ist die des freien
   Textes, s. (g). **AUCH SCHEIBE 3 TRÄGT EINE EIGENE SICHERHEITSACHSE** — eigene Farben
   sind Betreiber-Eingabe im ausgelieferten Text, und sie wird dort von einem Format-Tor
   auf `^#[0-9a-f]{6}$` getragen (Entscheidung P11.13-14).

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

**DIE SICHERHEITSACHSE (g) — SIE GEHÖRT SCHEIBE 4 UND SCHEIBE 3.** Wörtlich zur Scheibe 4:
"SCHEIBE 4 IST DIE ERSTE STELLE, AN DER BETREIBER-EINGABE IN DEN AUSGELIEFERTEN TEXT
GELANGT." `JSON.stringify` schützt gegen einen JavaScript-Ausbruch, entkommt aber kein `<`;
ein Text mit `</script>` schlösse den Script-Block im HTML-Parser. Folge dort: eine EIGENE
Aufklärung, eine benannte Invariante und Wächter mit FEINDLICHER Eingabe. "SIE WIRD NICHT
NEBENBEI AUS SCHEIBE 3 HERAUSGEBAUT."
**DER SATZ „ERSTE STELLE" GILT DEM FREIEN TEXT, NICHT DER BETREIBER-EINGABE ÜBERHAUPT** —
die Pixel-ID gelangt schon heute ohne `<`-Maskierung in den ausgelieferten Text (Vorrat
P11.13-5; Nachtrag vom 2026-09-17 an der Roadmap-Zeile).
**UND SCHEIBE 3 TRÄGT EINE EIGENE SICHERHEITSACHSE:** Eigene Farben sind Betreiber-Eingabe
im ausgelieferten Text. Getragen wird sie dort vom **Format-Tor auf `^#[0-9a-f]{6}$`**
(Entscheidung P11.13-14) — einem Alphabet, das die drei Ebenen CSS, JS-String und
HTML-Rohtext ZUGLEICH deckt —, und die Wächter mit feindlicher Eingabe sind in jener Scheibe
gefahren worden (Invariante Z8; `CF2`, `PT5`, `CT4`). Die Roadmap-Zeile führt das seit dem
2026-09-18 ebenso.
**FÜR SCHEIBE 1 WAR DIESE ACHSE NICHT BERÜHRT:** Dort entstand kein Eingabefeld; jeder
String blieb eine Konstante im Repo.

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

### VERMERK P11.13-3 — Aufklärung 11.13b (DAS THEMA), 2026-09-17

**KEIN BAU-COMMIT, UND DER GRUND STEHT HIER:** Es war eine READ-ONLY-Aufklärung ohne
Änderung am Repo (docs/arbeitsweise.md, "Die Standdatei", Absatz "Ein Vermerk trägt den
Hash seines Code-Commits"). Der Arbeitsbaum war vorher und nachher sauber; die einzigen
Schreibvorgänge lagen im Scratchpad ausserhalb des Repos und in der ignorierten Ablage
`.playwright-mcp/` (`git check-ignore -v` → `.gitignore:28`). Der Stand, auf dem gemessen
wurde, ist `6bf3abe`.

**DIE ABLAGE DES DIALOGWERTS — GEMESSEN am Code (CC, 2026-09-17).** Pfad
`settings.consent.dialog`; Typ `ProjectSettings` (`src/lib/settings.ts`) mit
`consent?: { gate?: boolean; dialog?: unknown }` — **`unknown` ist Absicht**, der Kommentar
dort nennt den Grund ("der Blob ist ungeprüfte Client-Eingabe"). Wertebereich
`CONSENT_DIALOGS = ["off","bar","modal"]`. **Der EINZIGE Leser ist `getConsentDialog`**:
`dialog !== undefined` → einer der drei oder `"unknown"`; sonst Altbestand
`gate === true ? "bar" : "off"`. Setzer `setConsentDialog` spreizt und schreibt immer, auch
`"off"`. **Der Abbruch** steht in `publishProject` (`src/app/projects/actions.ts`):
`if (consentDialog === "unknown") return { ok: false, error: CONSENT_DIALOG_UNKNOWN_MESSAGE }`
— **vor dem Label-Block und vor `ensureTrackingKey`**, gelesen wird `snapshot.settings`, also
der LAUFENDE Client-Zustand.
**DER SCHREIBWEG DES EDITORS:** drei `input[type=radio][name="consent-dialog"]` in
`PublishView.tsx` (Beschriftungen **Aus · Leiste · Fenster**) → `onConsentDialogChange(mode)`
→ in `CodeImporter.tsx` `setSettings((prev) => setConsentDialog(prev, mode))` → `dirty` →
`saveProject(projectId, stabilized, mappings, settings)` → `setSavedSettings(settings)`.

**`settingsEqual` IM WORTLAUT** (`src/lib/settings.ts`):

```ts
export function settingsEqual(a: ProjectSettings, b: ProjectSettings): boolean {
  return (
    getConsentDialog(a) === getConsentDialog(b) &&
    TRACKING_TARGETS.every(
      (t) =>
        getPixelId(a, t) === getPixelId(b, t) &&
        conversionRulesEqual(getConversionRules(a, t), getConversionRules(b, t))
    )
  );
}
```

**DIE FOLGE FÜR EINEN THEMENWERT OHNE EIGENEN TERM:** `dirty` bliebe **false** — kein Text
"Ungespeicherte Änderungen", kein `beforeunload`-Wächter, **kein `confirm` beim
Projektwechsel**, und der Wert wäre still weg. **Nichts würde davon rot**; alle vier Gates
blieben grün. **S3** (`src/lib/settings.test.ts`) ist der EINZIGE Test, der den
Consent-Term hält — er hält genau diesen einen, nicht das nächste Mitglied.

**DIE KETTE VOM WERT ZUM AUSGELIEFERTEN TEXT** (Signaturen, GEMESSEN am Code):
`publishProject` → `getConsentDialog(snapshot.settings)` → `ensureTrackingKey` →
`injectPageViewEmitter(html: string, trackingKey: string, consentDialog: ConsentDialog)`
(`src/lib/analytics/pageview-emitter.ts`) → `consentBlocksFor(form: ConsentDialog):
{ gateOn: boolean; dialog: string; revoke: string }` → `buildConsentBarScript(mode)` /
`buildConsentModalScript(mode)` → `aufbauDerLeiste(abbruch, vormerken, ausgeklappt)` bzw.
`aufbauDesFensters(...)` → `wrapRevoke(aufbau)` nur im Widerruf-Zweig. Die Dokumentordnung
entsteht an EINER Konkatenation: `gate + restore + dialog + revoke + setter +
buildPageViewScript(...)`.
**DIE AUFRUFER-ZAHLEN, und sie sind der Preis jeder Signatur-Änderung: ZWEI produktive
Aufrufe** von `injectPageViewEmitter` (beide in `publishProject`: Basis und Variante B) und
**VIERUNDDREISSIG in Tests** (`publish.test.ts` 1 · `pageview-emitter.test.ts` 9 ·
`pageview-emitter.resend.test.ts` 2 · `consent-bar.test.ts` 4 · `consent-modal.test.ts` 7 ·
`consent-revoke.test.ts` 6 · `consent-setter.test.ts` 1 · `consent-store.test.ts` 4). Die
Treffer in `src/lib/hosting/variant.ts` und die dritte Stelle in `actions.ts` sind
**Kommentare**, kein Aufruf. `wrapRevoke` hat GENAU ZWEI Aufrufer (bar, modal).

**DAS STYLESHEET — VIER FARBWERTE AN NEUN STELLEN** (GEMESSEN am Code):

| Wert | Rolle | Fundstelle |
|---|---|---|
| `#ffffff` | Hintergrund von Leiste/Fenster · Knopf-Hintergrund | `.bar`, `.dialog`, `button{background}` |
| `#111827` | Text · Knopftext · Knopfrahmen · **Kästchen** (`accent-color`) | `.bar{color}`, `.dialog{color}`, `button{color;border}`, `.group input{accent-color}` |
| `#d1d5db` | Container-Linie (Leiste nur oben, Modal rundum) | `.bar{border-top}`, `.dialog{border}` |
| `#2563eb` | **Fokus-Ring** für Knöpfe UND Kästchen | `button:focus-visible{outline}`, `.group input:focus-visible{outline}` |
| `rgba(17,24,39,0.6)` | **Abdunkelung**, nur Modal | `.backdrop{background}` |
| `transparent` (Schlüsselwort) | Weg-Hintergrund | `.way{background}` |

**ZWEI STELLEN, AN DENEN EINE GRÖSSE AN EINER FARBREGEL HÄNGT** — beide über die
Kurzschreibweise: (1) `button{border:1px solid #111827}` trägt Rahmen UND Breite; `.way`
setzt `border:0` und ist dadurch **2 px schmaler und niedriger**. (2)
`.bar{border-top:1px solid #d1d5db}` trägt die einzige Linie der Leiste. Dazu
`.way{min-width:0}` gegen `button{min-width:160px}` und im Modal `.way{flex:0 0 100%}`
(Korrektur K2). **Wer für ein Thema eine dieser Regeln anfasst, bewegt Entscheidung
P11.13-5.**
**KEIN `color-scheme` UND KEINE `@media`-REGEL im ausgelieferten Text** (Achse
`color-scheme|appearance:|prefers-color-scheme|@media|accent-color` über `src/`: der einzige
`@media (prefers-color-scheme: dark)` liegt in `src/app/globals.css`, also in der ANWENDUNG;
`accent-color` genau einmal; `appearance` nirgends gesetzt, computed `auto`).

**`PublishView.tsx` HAT KEINEN TEST — GEMESSEN.** `src/components/` trägt drei Testdateien
(`CodeImporter.test.tsx`, `DomainManager.test.tsx`, `TargetCard.test.tsx`); eine
`PublishView.test.tsx` existiert nicht. Das Wort "Einwilligung" steht **fünfmal** in
`PublishView.tsx` und **null mal** in `CodeImporter.test.tsx`. **FOLGE, und sie ist kein
Freibrief, sondern ein Befund über die Abdeckung:** Eine neue Beschriftung kann keine
bestehende Abfrage mehrdeutig machen, weil es keine gibt — und was in dieser Fläche neu
gebaut wird, ist by default ungetestet. Die einzigen Abfragen in der Nähe sind
**verankert**: `/^(Veröffentlichen|Erneut veröffentlichen)$/` und `/^Veröffentlichen$/`.

**DIE SIEBEN VORHER-WERTE — DER ANKER FÜR "light"** (GEMESSEN am Stand `6bf3abe`; Vite
`createServer` + `ssrLoadModule` im Scratchpad ausserhalb des Repos, dieselbe echte Funktion
und dasselbe Basis-HTML wie bei 11.13a, Schlüssel `probe_key_11_13`):

| Gegenstand | Bytes | sha256 |
|---|---|---|
| `buildConsentBarScript("load")` | 4 603 | `7ec172a65fa562ec16e4d882fcac98e70329e5a7ad64393255b077904a7ec9ef` |
| `buildConsentBarScript("revoke")` | 4 918 | `14510803fd28244692acbd95495f0996f2b8453ec089c7d15be32d294d6728c2` |
| `buildConsentModalScript("load")` | 5 051 | `674875af751a58c7acba05bc3d7efb081f5101c33d3b50eb3e08e4e043c6af42` |
| `buildConsentModalScript("revoke")` | 5 366 | `75110375e27043b085939aa07e18ad19170c718e7cfcaf8f29a5c11924b933fe` |
| `injectPageViewEmitter(basis, key, "bar")` | 14 073 | `5ca864bd32e2bc33a74fd5d71324d50f8d2833919a1dbc5b56db46fe0be2e155` |
| `injectPageViewEmitter(basis, key, "modal")` | 14 969 | `6ac4bc446c80a82c93e37392922296c8e86ef0f86a112385486ff5f8f4d3d507` |
| `injectPageViewEmitter(basis, key, "off")` | 1 897 | `1ae8d3dbcee230cb59dfc44a8e6e05984b776b63541ac273592a91bff0695b45` |

**ZWEI QUERPROBEN:** Die vier Blockgrössen sind zeichengleich mit VERMERK P11.13-2, und der
"off"-sha256 ist derselbe. **"off" ALLEIN TAUGT NICHT ALS ANKER** — dort entsteht gar kein
Oberflächen-Block; der Anker sind die SIEBEN Werte.

**DIE KONTRASTWERTE DES HEUTIGEN THEMAS — DER VORHER-WERT FÜR P11.13-10** (GEMESSEN,
Chromium, `file://`, 1280×800, `localStorage.clear()` + Reload je Messung).
**DIE FORMEL, BENANNT:** relative Leuchtdichte nach WCAG — je Kanal `c' = c/12.92` für
`c <= 0.03928`, sonst `((c+0.055)/1.055)^2.4`; `L = 0.2126*R' + 0.7152*G' + 0.0722*B'`;
Kontrast `= (L_hell + 0.05) / (L_dunkel + 0.05)`. Halbdurchsichtige Flächen sind vorher über
Weiss komponiert.

| Paar | Leiste | Modal |
|---|---|---|
| Text / Hintergrund | 17,74 | 17,74 |
| Knopftext / Knopfhintergrund | 17,74 | 17,74 |
| Knopfrahmen / Hintergrund | 17,74 | 17,74 |
| Weg-Text / Hintergrund | 17,74 | 17,74 |
| Fokus-Ring / Hintergrund (im FOKUSSIERTEN Zustand gemessen, `outline: 2px solid rgb(37,99,235)`) | 5,17 | 5,17 |
| Container-Linie / Hintergrund | 1,47 | 1,47 |
| Dialog gegen Abdunkelung (`rgba(17,24,39,0.6)` über Weiss = `rgb(112,116,125)`) | – | 4,66 |

**`prefers-color-scheme` IST IN PLAYWRIGHT EMULIERBAR — BELEGT** (`page.emulateMedia`, je
gegen `matchMedia` im Dokument gemessen): ohne Emulation `dark=false / light=true`; mit
`colorScheme:"dark"` **`dark=true / light=false`**; mit `"light"` wieder `false/true`;
`null` stellt zurück. **WAS ES HEUTE AM DIALOG BEWIRKT: NICHTS** — es gibt keine
`@media`-Regel; das ist eine ABLEITUNG aus dem gemessenen CSS, keine eigene Messung am
gerenderten Dialog.

**DAS NATIVE KÄSTCHEN UNTER `color-scheme: dark` — TEILS MESSBAR, TEILS NUR SICHTBAR.**
Probeweise `.bar{color-scheme:dark;}` ZUR LAUFZEIT in den Schattenbaum gelegt (kein
Repo-Eingriff), Kästchen vorher/nachher:

| | hell (Bestand) | mit `color-scheme:dark` |
|---|---|---|
| `colorScheme` | `normal` | `dark` |
| `accentColor` | `rgb(17,24,39)` | `rgb(17,24,39)` — **unverändert** |
| `backgroundColor` | `rgba(0,0,0,0)` | `rgba(0,0,0,0)` — **unverändert** |
| `appearance` | `auto` | `auto` |
| **`borderTopColor`** | `rgb(0,0,0)` | **`rgb(255,255,255)`** |
| Grösse | 18×18 | 18×18 |
| Bildpunkte, 22×22-Ausschnitt | Prüfsumme `225973086` | Prüfsumme `2719410137` — **verschieden** |

**MESSBAR** sind `color-scheme` selbst und der **Rahmen** (er kommt aus dem UA-Stylesheet und
kippt mit). **NICHT MESSBAR über `getComputedStyle`** ist die Füllung des Widgets —
`backgroundColor` bleibt beidemal `rgba(0,0,0,0)`, weil der Browser zeichnet. Dafür braucht
es einen **Bildpunkt-Vergleich**; der oben ist einer, er belegt einen Unterschied und **sagt
nicht, wie er aussieht**. Und: `accent-color:#111827` bleibt stehen — **ein Thema, das nur
`color-scheme` setzt, liesse das Häkchen in der heutigen dunklen Farbe.**

**EIN BEFUND, DER NICHT DIESER SCHEIBE GEHÖRT — DIE PIXEL-ID GELANGT SCHON HEUTE ROH IN DEN
AUSGELIEFERTEN TEXT.** `CodeImporter.tsx` gibt `metaPixelId: getPixelId(settings, "meta")` an
`generateFunctional`; über `buildWiringScript` landet der Wert in `buildMetaRuntime`
(`src/lib/tracking/meta.ts`) als `var PS_PIXEL_ID = ${JSON.stringify(pixelId)};`.
**`JSON.stringify` maskiert kein `<`** — und **anders als die Mapping-Tabelle**, die in
`generate.ts` ausdrücklich `.replace(/</g, "\\u003c")` bekommt, erhält dieser Wert **keine
solche Maskierung** (GEMESSEN am Code, CC, 2026-09-17).
**SEINE GRENZE, UND SIE GEHÖRT ZWINGEND DAZU: DER AUSBRUCH IST NICHT ERPROBT.** Der Weg ist
am Code ablesbar; ob ein `</script>` in der Pixel-ID den Block tatsächlich verlässt, ist
**nicht gemessen**. Der Befund liegt als Vorrat P11.13-5 und gehört der Scheibe 4.

**DIE GRENZEN DIESER AUFKLÄRUNG — ausdrücklich:**
- **Keine echte Kundenseite.** Die Probeseite trägt kein fremdes CSS, keine
  `!important`-Flut, keine eigene Stapel-Ebene.
- **DIE MESSUNG AUS ROADMAP (f) IST NICHT GEFAHREN:** ob `all:initial !important` auch
  BENUTZERDEFINIERTE Eigenschaften (`--ps-*`) zurücksetzt, ist unverändert **UNGEMESSEN**.
  Die Roadmap-Zeile verlangt sie VOR Scheibe 2; sie stand in dieser Runde nicht im Auftrag.
- **Nur Chromium.** Firefox und WebKit zeichnen native Kästchen anders.
- **Kein echtes Gerät** — keine mobile Browser-Leiste, kein Dunkelmodus eines echten
  Systems, kein Kontrast-Modus des Betriebssystems.
- **Kein Urteil über Lesbarkeit.** Gemessen sind Verhältniszahlen; die Schwelle steht in
  keiner Datei dieses Projekts.

PROVENIENZ DIESES VERMERKS: Code-Aussagen GEMESSEN bzw. GELESEN am Repo (CC, 2026-09-17, auf
`6bf3abe`). Die sieben Vorher-Werte, die Kontrastwerte, die Emulierbarkeit und die
Kästchen-Messung GEMESSEN am eigenen Lauf desselben Tages. Dass die Emulation heute am
Dialog nichts bewirkt und dass die Pixel-ID-Beobachtung ein Ausbruchs-Risiko trägt, sind
**ABLEITUNGEN**, keine Messungen.

### VERMERK P11.13-4 — Scheibe 11.13b, DAS THEMA, abgeschlossen 2026-09-17

**GEGENSTAND:** Der Betreiber wählt die Darstellung des Einwilligungs-Dialogs — **hell,
dunkel, automatisch**. Der Wert liegt unter `settings.consent.theme` und wählt
ausschliesslich zwischen fest im Repo stehenden Stylesheets.

**DREI COMMITS:** **`1a21db3`** (Freigabe-Entscheidungen F1 bis F3, vor dem Bau) ·
**`2b288f4`** — `feat(consent): Darstellung des Einwilligungs-Dialogs — hell, dunkel,
automatisch (11.13b)`, **19 Dateien, 1 003 Zeilen hinzu, 99 entfernt**, darunter die neue
`src/lib/tracking/consent-choice.test.ts` · **`17389f1`** — der Kommentar-Commit, der die
Begründung gegen CSS-Variablen von einer ARCHITEKTEN-KENNTNIS auf den gemessenen Befund
zieht. **`consent-revoke.ts` IST NICHT IM COMMIT** — `wrapRevoke` bekommt den fertigen
Aufbau, das Thema steht dort schon im String.

**DIE VIER GATES:** `vitest run` **von 1 805 auf 1 829 Tests** bei 83 → **84** Dateien
(+24 Läufe); die 1 805 sind GEMESSEN vor dem ersten Eingriff in `src/`, nicht gerechnet.
`tsc --noEmit` exit 0 · `lint` 0 errors / 1 warning (die vorbestehende in
`consent.test.ts`) · `build` Compiled successfully. Alle vier nach der letzten Änderung
erneut gefahren, zuletzt am Kommentar-Commit mit **unveränderten 1 829**.

**DIE TRAGENDE INVARIANTE IST EINGELÖST — DIE SIEBEN BYTE-WERTE SIND VORHER UND NACHHER
IDENTISCH** (GEMESSEN mit demselben Treiber, derselben echten Funktion und demselben
Basis-HTML wie in VERMERK P11.13-3):

| Gegenstand | vorher | nachher | sha256 |
|---|---|---|---|
| `buildConsentBarScript("load","light")` | 4 603 | 4 603 | gleich |
| `buildConsentBarScript("revoke","light")` | 4 918 | 4 918 | gleich |
| `buildConsentModalScript("load","light")` | 5 051 | 5 051 | gleich |
| `buildConsentModalScript("revoke","light")` | 5 366 | 5 366 | gleich |
| `injectPageViewEmitter(…,"bar","light")` | 14 073 | 14 073 | gleich |
| `injectPageViewEmitter(…,"modal","light")` | 14 969 | 14 969 | gleich |
| `injectPageViewEmitter(…,"off","light")` | 1 897 | 1 897 | gleich |

**SIE IST STRUKTURELL UND NICHT NUR GEMESSEN:** `consentThemeCss("light")` liefert den
LEEREN String; `BASIS + CONSENT_CHOICE_CSS + ""` ist damit zeichengleich mit dem Stylesheet
vor der Scheibe. CSS1 hält genau das und führt keine Zahl.

**DIE BLOCKGRÖSSEN DER ZWEI NEUEN THEMEN** (GEMESSEN): Leiste `load` **4 932** (dark) /
**4 969** (auto), `revoke` **5 247** / **5 284**; Modal `load` **5 380** / **5 417**,
`revoke` **5 695** / **5 732**. Ausgabetexte: Leiste **14 731** / **14 805**, Modal
**15 627** / **15 701**. **Der Zuwachs ist in allen vier Zweigen konstant** — +329 für
`dark`, +366 für `auto` je Block; die Konstante wird buchstäblich einmal geschrieben.

**DIE SECHZIG MECHANISCHEN STELLEN (N3), GEMESSEN UND AUFGEZÄHLT:** Der Pflicht-Parameter
an allen drei Stellen (Freigabe F1) machte **60 Testaufrufe** zu `tsc`-Fehlern; alle tragen
jetzt `"light"` — `pageview-emitter.test.ts` 9 · `…resend.test.ts` 2 · `consent-bar.test.ts`
8 · `consent-modal.test.ts` 17 · `consent-revoke.test.ts` 19 · `consent-setter.test.ts` 1 ·
`consent-store.test.ts` 4. **SECHS AUFRUFE TRAGEN BEWUSST EINE THEMEN-VARIABLE** und laufen
über alle drei Werte: die L3- und die L12-Erweiterung, die M3-Erweiterung und die
M12-Nadeln, die zwei W11-Nadel-Läufe. Dazu **sechs T9-Läufe** über die Variable `bauen`
(2 Formen × 3 Themen), die diese Zählung nicht erfasst. **Kein Aufruf ist ohne Argument
geblieben** — `tsc` steht auf 0.

**DIE ZEHN PFLICHT-MUTATIONEN** (je über die ganze Suite, Vorhersage als KLASSE vor dem
Lauf, nach jeder Rücknahme sha256 identisch):

| # | Gesetzt | Ergebnis | Urteil |
|---|---|---|---|
| Mu1 | Leser bildet `unknown` auf `light` ab | 4: TH2, TH3, PT1, UI5 | DECKUNG, EINE Klasse; **Vorhersage (2) zu eng** |
| Mu2 | Abbruch auch bei `off` | 1: PT2 | trifft |
| Mu3 | Abbruch fehlt bei `bar` | 1: PT1 | trifft |
| Mu4 | `settingsEqual`-Term entfernt | 3: TH3, UI3, UI4 | DECKUNG, EINE Klasse; **Vorhersage („TH3 allein") zu eng** |
| Mu5 | Überschreibung mit `border:` | 1: CSS2 | trifft |
| Mu6 | `auto` ohne `@media` | 1: CSS3 | trifft |
| Mu7 | `light` trägt die Überschreibungen | 2: CSS1, PT3 | DECKUNG |
| Mu8 | Themenwahl bei `off` sichtbar | 1: UI2 | trifft |
| Mu9 | Thema wird ignoriert | 3: CSS1, CSS3, PT3 | **Vorhersage falsch und lehrreich:** CSS1 fällt über seine POSITIVKONTROLLE, nicht über seine Hauptzusicherung |
| Mu10 | `consentBlocksFor` liefert bei `off` einen themen-abhängigen Block | 2: T-OFF, T1 | DECKUNG; **Vorhersage trifft in Zahl und Zusammensetzung**, PT2 blieb grün wie angesagt |

**KEINE KASKADE IN IRGENDEINER RUNDE** — jeder Zusatztreffer meldete dieselbe Fehlerklasse.
**ZWEI VORHERSAGEN WAREN ZU ENG, BEIDE IN DIESELBE RICHTUNG** (docs/immer-beachten.md,
EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN).

**DREI „EINZELSTÜCK"-KOMMENTARE SIND DARAUFHIN RICHTIGGESTELLT WORDEN**, weil sie sonst
eine Sicherheit behaupteten, die die Messung widerlegt (Lektion (f) an MUTATIONSPROBEN):
`settings.ts` („TH3 ist der EINZIGE Test" → **drei Tests, gemessen: TH3, UI3, UI4**) ·
`settings.test.ts` an TH2 und TH3 · `consent-choice.test.ts` an CSS1 („der einzige" → **„der
einzige, der sie STRUKTURELL hält"**, mit PT3 daneben benannt). **EIN VIERTER kam mit
Mu10 dazu:** T-OFF ist nicht der einzige, der die Zusage fängt — T1 tut es ebenfalls, aber
nur als Nebenwirkung seiner Byte-Zahl und nur für dessen eine Fixture.

**T-OFF IST DER WÄCHTER EINER ZEILE, DIE SONST NUR EIN KOMMENTAR TRÜGE.** `publishProject`
führt seit dieser Scheibe `deliveredTheme` — einen **Platzhalter**: Nach dem Abbruch ist
`"unknown"` nur noch bei `"off"` möglich, der Typ von `injectPageViewEmitter` verlangt aber
einen gebauten Wert. **DAS IST KEIN RÜCKFALL IM SINNE DER DAUERREGEL**, weil die abbrechende
Stelle bereits passiert ist — aber es ist nur unschädlich, solange das Thema bei `"off"`
nichts am Text ändert. **T-OFF prüft genau das** (drei Themen, zeichengleich, mit
Positivkontrolle bei eingeschaltetem Dialog), **PT2** belegt es am ausgelieferten Text, und
**Mu10 hat beide rot gemacht**. T-OFF ist zugleich der Wächter der GRENZE von
Entscheidung P11.13-7: Wer bei `"off"` je etwas ausliefert, macht ihn rot und muss die
Entscheidung anfassen, nicht den Test.

**DIE MESSUNG AUS ROADMAP (f) IST GEFAHREN — UND SIE BESTÄTIGT P11.13-8** (GEMESSEN, CC,
2026-09-17, Chromium): Eine auf `html` der Probeseite gesetzte benutzerdefinierte
Eigenschaft `--ps-test: red` kommt **TROTZ `all:initial !important` IM SCHATTENBAUM AN** —
an `.bar`, am Knopf und am Host-Element, je mit dem Wert `red`. **Die Gegenprobe ausserhalb
des Schattenbaums liefert denselben Wert**, die Messung greift also. Wäre das Thema über
Variablen gebaut, könnte die Kundenseite in unsere Darstellung hineinwirken. Die Begründung
von P11.13-8 ist damit von einer Kenntnis auf einen Befund gezogen (dort und in
`consent-choice.ts`, Commit `17389f1`).

**DIE PROBE** (Playwright, Chromium, `file://` im Scratchpad, echter Ausgabetext über
`injectPageViewEmitter`; `localStorage.clear()` und Reload je Messung; die Werkzeug-Ablage
`.playwright-mcp/` vorher als ignoriert geprüft, `git check-ignore -v` → `.gitignore:28`):
**60 ZUSTÄNDE — 3 Themen × 2 Formen × 5 Viewports × ein- und ausgeklappt.**

- **ENTSCHEIDUNG P11.13-3: 60/60 ERFÜLLT** — jedes Bedienelement vollständig im Fenster und
  `elementFromPoint` an seiner Mitte trifft den Host.
- **ENTSCHEIDUNG P11.13-5: 30/30 im eingeklappten Zustand erfüllt** — `wegTeiltMit` ist nie
  1 (nur 0 oder 2), Knopfbreiten durchgehend **160/160**. Reihen über **vertikale
  Überlappung** bestimmt, nicht über `top`-Gleichheit (der Instrumentenfehler aus 11.13a).
- **DIE GEOMETRIE VON `dark` UND `auto` IST IDENTISCH ZU `light` — IN ALLEN 60 ZUSTÄNDEN,
  NULL ABWEICHUNGEN.** Verglichen wurden `top`, Höhe, `scrollHeight`/`clientHeight` und
  **jede Element-Lage**. **DAS IST DER BEWEIS FÜR DIE EIGENSCHAFTS-LISTE AUS P11.13-9:**
  Grösse und Lage bleiben durch die Bauart gleich, und P11.13-3 und P11.13-5 mussten nur
  bestätigt, nicht neu erhoben werden.
- **UNGEFANGENE FEHLER: KEINE** (`pageerror` und Konsolen-Einträge `error`/`warning`,
  Listener **vor** dem Lauf registriert — beim ersten Anlauf standen sie am Ende und
  sammelten nichts; der Fehler ist im Lauf selbst gefangen und der Lauf wiederholt worden).

**DER KONTRAST (P11.13-10), 1 280×800, Formel wie in VERMERK P11.13-3:**

| Paar | light | dark | auto@light | auto@dark |
|---|---|---|---|---|
| Text / Hintergrund | 17,74 | 16,98 | 17,74 | 16,98 |
| Knopftext / Knopfhintergrund | 17,74 | 16,98 | 17,74 | 16,98 |
| Knopfrahmen / Hintergrund | 17,74 | 16,98 | 17,74 | 16,98 |
| Kästchen (`accent-color`) / Hintergrund | 17,74 | 16,98 | 17,74 | 16,98 |
| Weg-Text / Hintergrund (eingeklappt) | 17,74 | 16,98 | – | – |
| Fokus-Ring / Hintergrund (im fokussierten Zustand) | 5,17 | 6,98 | 5,17 | 6,98 |
| Container-Linie / Hintergrund (**ausgenommen**) | 1,47 | 2,35 | 1,47 | 2,35 |

**DIE ARCHITEKT-RECHNUNG IST BESTÄTIGT — 16,98 und 6,98, auf die Stelle genau.** Text ≥ 4,5
und alle Bedienelement-Ränder ≥ 3 in jedem Thema. **`auto` ist unter der emulierten
Einstellung `light` EXAKT `light` und unter `dark` EXAKT `dark`** — damit ist Freigabe F2
gemessen und nicht bloss abgeleitet.

**DAS NATIVE KÄSTCHEN UNTER `dark`:** `colorScheme` kippt auf `dark`, der UA-Rahmen von
`rgb(0,0,0)` auf `rgb(255,255,255)`. Die Füllung ist über `getComputedStyle` nicht fassbar
(`backgroundColor` bleibt beidemal durchsichtig) — **gemessen über Bildpunkt-Prüfsummen:
light ≠ dark, und dark == auto@dark** (Leiste beide `4084295373`, Modal beide `430642071`).
**Sechs Bildschirmfotos** liegen in der ignorierten Ablage:
`.playwright-mcp/11.13b-{bar,modal}-{light,dark,auto}.png`.

**EINE ZEILENENDEN-EPISODE, GEFANGEN UND BEHOBEN — sie gehört in den Vermerk, weil sie
sonst beim nächsten Mal von vorn gefunden wird:** `src/app/projects/publish.test.ts` und
`src/components/PublishView.tsx` liegen im **ARBEITSBAUM als CRLF** (`git ls-files --eol`:
`i/lf w/crlf`), alle übrigen als LF. Ein Heredoc-Anhang schrieb LF in die erste der beiden
→ der Zustand war kurzzeitig `w/mixed`. **Behoben**, die Datei ist wieder einheitlich CRLF;
`git diff --numstat` zeigt 116 / 0, also nur den neuen Block. **AM COMMITTETEN OBJEKT TRAGEN
ALLE 19 DATEIEN CR=0 UND NUL=0** (`git show HEAD:<pfad> | tr -dc …`, Summe über alle: 0 und
0, Positivkontrolle im selben Lauf 1 und 1) — der Index steht auf `eol=lf`, die Arbeitsbaum-
Konvention erreicht das Objekt also nicht. **DIE CR-ZAHLEN 1 190 UND 589 IM ARBEITSBAUM SIND
DIE BESTEHENDE KONVENTION DIESER ZWEI DATEIEN, KEIN SCHADEN.**

**KEINE GANZ-DATEI-UMSTELLUNG** (`git show --numstat`, je Datei gegen ihre Länge): die
höchste Löschzahl ist **37 von 646 Zeilen** (`consent-revoke.test.ts`, 5,7 % — T9-Ausweitung
und W11-Nadel-Schleife), die zweithöchste **15 von 910** (`consent-modal.test.ts`, 1,6 %);
bei allen übrigen unter 5 %, bei acht Dateien null.

**DER LIVE-NACHWEIS vom 2026-09-17 — ALLE ANGABEN SIND OWNER-ANGABEN, soweit nicht anders
vermerkt; Deployment als "Ready" bestätigt. Der Schritt „unbekannter Wert" ist mit Freigabe
F3 ENTFALLEN und wird allein von PT1, PT2 und UI5 getragen.**
1. **Bestanden.** Eine vor dem Deploy veröffentlichte, unberührte Seite zeigt die alte
   Gestalt unverändert.
2. **Bestanden.** Eine Seite mit ausgeschaltetem Dialog trägt nach dem Neu-Veröffentlichen
   weiter nur `pagesmith-consent` und `__ps_pve`.
3. **DER BYTE-NACHWEIS FÜR "HELL" IST LIVE GEFÜHRT:** Vorher- und Nachher-Sicherung sind
   **byte-gleich — 26 561 Bytes, sha256 `ba00564c…`** (GEMESSEN, ARCHITEKT-PRÜFUNG
   2026-09-17; **dass die Nachher-Datei aus einem Neu-Veröffentlichen stammt, ist
   OWNER-ANGABE**). **Die Vorher-Sicherung trug zudem den Leisten- und den Widerruf-Block
   BYTE-GLEICH zu den lokal gemessenen Vorher-Werten** (`7ec172a6…` und `14510803…`) — damit
   ist die lokale Messung an einer echten ausgelieferten Seite verankert.
4. **Bestanden.** Dunkel, beide Formen, fünf Viewports, ein- und ausgeklappt: alles sichtbar
   und antippbar, Knöpfe gleich breit.
5. **Bestanden — und dieser Schritt schliesst die Grenze der emulierten Probe:**
   „automatisch" am **echten Handy**, wechselt mit dem System-Dunkelmodus **ohne Neuladen**.
6. **Bestanden, als OWNER-URTEIL, visuell:** dunkel auf der dunklen Kundenseite passt.
   **AUSDRÜCKLICH KEINE KONTRAST-AUSSAGE GEGEN DEN SEITENHINTERGRUND** — gemessen ist allein
   der Kontrast gegen die EIGENE Dialogfläche; die Container-Linie liegt dort bewusst unter
   3 (P11.13-10 nimmt sie aus).
7. **Bestanden.** Der Widerruf öffnet ausgeklappt UND dunkel.
8. **Bestanden.** „nur Werbung": kein PageView, die Conversion kommt bei Meta an, Browser-
   und Server-Ereignis dedupliziert.

**DIE GRENZEN, DIE DIESER NACHWEIS NICHT ÜBERSCHREITET:**
- **Lokal nur Chromium.** Firefox und WebKit zeichnen native Kästchen anders und sind
  ungemessen; welche Desktop-Browser live benutzt wurden, nennen die Owner-Angaben nicht.
- **DER EXPORT-PFAD IST NICHT ERFASST** — er trägt den Einwilligungs-Schalter schon heute
  nicht und damit auch kein Thema (offener Punkt DER EXPORT-PFAD IST VOM
  EINWILLIGUNGS-SCHALTER NICHT ERFASST, der das für jede Scheibe dieser Phase verlangt).
- **SCREENREADER UNGEPRÜFT** — was aus „Darstellung", „Hell", „Dunkel" und „Automatisch"
  angesagt wird, ist nicht erhoben.
- Keine echte Kundenseite in der lokalen Probe: kein fremdes CSS, keine `!important`-Flut,
  keine eigene Stapel-Ebene.

PROVENIENZ: Commits, Dateizahlen, Gates, Testzahlen, Mutationen, Blockgrössen, die sieben
Byte-Werte, die (f)-Messung und sämtliche Probe-Werte sind GEMESSEN am Repo bzw. am eigenen
Lauf (CC, 2026-09-17). Die Byte-Gleichheit der zwei Live-Sicherungen und die zwei
Block-Prüfsummen sind eine ARCHITEKT-PRÜFUNG desselben Tages; alle übrigen Live-Angaben
sind OWNER-ANGABEN und am Repo nicht prüfbar. Das Urteil zu Schritt 6 ist ein visuelles
Owner-Urteil, keine Messung.

### VERMERK P11.13-5 — Aufklärung 11.13c (EIGENE FARBEN), 2026-09-18

**ACHTUNG, DIE NUMMER IST AB HEUTE DREIFACH BELEGT, UND DAS IST DIE BAUFORM DIESER DATEI,
KEIN FEHLGRIFF:** Die Zähler laufen JE KLASSE. `P11.13-5` bezeichnet **diesen Vermerk**,
**Entscheidung P11.13-5** (das Gleichrangigkeits-Kriterium) und **Vorrat P11.13-5** (die
Pixel-ID ohne `<`-Maskierung) — drei verschiedene Dinge. **EIN ZEIGER AUF DIESE NUMMER
NENNT DIE KLASSE MIT**, sonst trifft er zwei Drittel der Zeit das Falsche; der Vorrats-Eintrag
wird ausserdem von docs/roadmap.md aus zitiert.

**KEIN BAU-COMMIT, UND DER GRUND STEHT HIER:** Es war eine READ-ONLY-Aufklärung ohne
Änderung am Repo (docs/arbeitsweise.md, "Die Standdatei", Absatz "Ein Vermerk trägt den
Hash seines Code-Commits"). Der Arbeitsbaum war vorher und nachher sauber; **anders als bei
den Aufklärungen P11.13-1 und P11.13-3 ist in dieser Runde AUCH IM SCRATCHPAD NICHTS
entstanden** — kein Browser-Werkzeug, keine Ablage `.playwright-mcp/`, keine Probe. Der
Stand, auf dem gemessen wurde, ist `dae4d1a`.

**DER EINSETZ-KONTEXT HAT DREI EBENEN, UND NUR DIE MITTLERE IST HEUTE GEDECKT** (GEMESSEN
am Code, CC, 2026-09-18). Die Einsetzstelle ist EINE Zeile, in `aufbauDerLeiste`
(`src/lib/tracking/consent-bar.ts`) und zeichengleich in `aufbauDesFensters`
(`src/lib/tracking/consent-modal.ts`):
`style.textContent = ${JSON.stringify(stil)};`

| Ebene | Ausbruchszeichen | Deckt `JSON.stringify` das? |
|---|---|---|
| **CSS** — Deklaration, Regel, Kommentar, Funktion | `;` · `}` · `{` · `/*` · `url(` | **NEIN** |
| **JS-String-Literal** | `"` · `\` · Steuerzeichen · U+2028/2029 | **JA** |
| **HTML, Rohtext in `<script>`** | `</script` · `<!--` | **NEIN** — `JSON.stringify` maskiert kein `<` |

Die unterste Ebene ist dieselbe wie bei der Pixel-ID (Vorrat P11.13-5); **die oberste hat
dort kein Gegenstück.** Wer aus jenem Eintrag schliesst, es sei dieselbe Frage,
unterschlägt eine ganze Ebene. **DER AUSBRUCH IST AUF KEINER DER DREI EBENEN ERPROBT** —
der Weg ist am Code ablesbar, gemessen ist er nicht.

**BEIDE KNÖPFE TRAGEN IHRE FARBEN NICHT PER MESSUNG GLEICH, SONDERN PER BAUART** (GEMESSEN
am Code, CC, 2026-09-18): "Alle akzeptieren", "Auswahl speichern" und "Ablehnen" entstehen
über **dasselbe** `makeButton(label, pick)` in `CONSENT_CHOICE_JS` und bekommen **keine
Klasse**; sie treffen ausschliesslich den baren `button{…}`-Selektor und
`button:focus-visible{…}`. Nur der Weg trägt eine Klasse, gesetzt in `makeWay`. **ES GIBT
KEINE `:hover`-REGEL** in den drei Stylesheets (Achse `hover` über `consent-bar.ts`,
`consent-modal.ts`, `consent-choice.ts` — kein Treffer; Positivkontrolle: dieselbe Achse
trifft in `src/app/login/page.tsx`, `src/app/page.tsx` und `src/components/ActionPanel.tsx`).
**FOLGE: Es gibt genau ZWEI Zustände mit eigener Farbe — normal und `:focus-visible`**, und
die Gleichrangigkeit aus Roadmap (h) ist an der Farbe GEBAUT, nicht gemessen.

**ES GIBT KEINE KONTRASTFUNKTION IM REPO** (GEMESSEN, CC, 2026-09-18; Achse
`kontrast|contrast|luminan|luminosity|wcag|relativeLum|0\.2126|0\.7152`, case-insensitiv,
über `src/` **einschliesslich der Testdateien**): fünf Treffer, **alle Prosa** — kein
Symbol, keine Datei, keine Luminanzrechnung. Positivkontrolle der Achse: dieselbe Suche
trifft in `docs/` die Kontrastblöcke der VERMERKE P11.13-3 und P11.13-4. **Die Rechnung
jener zwei Vermerke lebte im Wegwerf-Lauf und ist im Repo nicht reproduzierbar.**

**ES GIBT AUCH KEINE PROBE IM REPO** (GEMESSEN, CC, 2026-09-18; Achse
`playwright|probe|viewport|screenshot` über `git ls-files`): drei Treffer, **alle
SQL-Proben** unter `supabase/checks/`. Positivkontrolle: `git ls-files supabase/checks`
listet sie. **FOLGE FÜR JEDEN ZUSCHNITT DIESER PHASE: Geometrie- und Kontrast-Probe sind
bei jedem Lauf neu zu schreiben**; es gibt kein wiederverwendbares Artefakt, und die
Auflage aus Vorrat P11.13-4 (fokussierbares Element ausserhalb des Dialogs) ist bei jedem
Lauf neu einzuhalten.

**DER EXPORT-PFAD TRÄGT KEIN THEMA UND DAMIT AUCH KEINE FARBE** (GEMESSEN am Code, CC,
2026-09-18): `handleExportDownload` / `handleExportCopy` (`src/components/CodeImporter.tsx`)
→ `buildExportDocument()` → `generateFunctional(html, docMappings, "export", …)`.
`generateFunctional` (`src/lib/generate.ts`) hängt allein `CONSENT_SCRIPT_ID` und
`buildConsentRuntimes()` ein; `injectPageViewEmitter` kommt dort NICHT vor. Die zwei
produktiven Aufrufe von `injectPageViewEmitter` stehen beide in `publishProject`
(`src/app/projects/actions.ts`, Basis und Variante B).

**`PublishView.tsx` HAT WEITERHIN KEINE TESTDATEI** (GEMESSEN, CC, 2026-09-18):
`src/components/` trägt `CodeImporter.test.tsx`, `DomainManager.test.tsx` und
`TargetCard.test.tsx`; eine `PublishView.test.tsx` existiert nicht. Die einzige Abdeckung
der Einwilligungs-Fläche sind **UI1 bis UI5** in `CodeImporter.test.tsx`, entstanden erst
mit der Scheibe 11.13b. **WAS DORT NEU GEBAUT WIRD, IST BY DEFAULT UNGETESTET.**

**EIN VERALTETER DOCBLOCK, UND ER STEHT AUSGERECHNET AN DER EINSETZSTELLE** (GEMESSEN am
Code, CC, 2026-09-18): Der Docblock von `aufbauDerLeiste` (`src/lib/tracking/consent-bar.ts`)
schliesst mit "DIE BYTE-GLEICHHEIT DES LADE-ZWEIGS HAENGT AN DEN **ZWEI** PLATZHALTERN …
muss der erzeugte Text ZEICHEN FUER ZEICHEN der Fassung vor dieser Scheibe entsprechen.
**W0 haelt den Wert.**" **Beides ist überholt:** Es sind seit der Scheibe 11.13a **drei**
Platzhalter plus `stil`, und **W0 ist gestrichen** — das sagt derselbe Datei-Kopf weiter
oben, und am Repo ist kein Test dieses Namens auffindbar (Positivkontrolle: W1 bis W17
stehen als Testlabel in `consent-revoke.test.ts`). **WER FÜR DIESE SCHEIBE EINE
BYTE-ZUSAGE SUCHT, LIEST HIER EINE, DIE ES NICHT GIBT.** Der Block ist in dieser Runde
**NICHT** geändert worden (Doku-Runde, kein Code); die Änderung gehört in die Bau-Scheibe.

PROVENIENZ DIESES VERMERKS: sämtliche Angaben GEMESSEN bzw. GELESEN am Repo (CC,
2026-09-18, auf `dae4d1a`). **KEINE Messung an einem Browser, keine an einer Live-Seite,
keine Probe.** Dass ein Ausbruch über eine der drei Ebenen tatsächlich gelänge, ist eine
ABLEITUNG aus dem Code und ausdrücklich **UNGEMESSEN**.

### VERMERK P11.13-6 — Scheibe 11.13c, EIGENE FARBEN, abgeschlossen 2026-09-18

**GEGENSTAND:** Der Betreiber wählt als VIERTE Darstellung „eigene Farben" und dazu zwei
Werte — einen Hintergrund und einen Text; alles Übrige wird abgeleitet (Entscheidung
P11.13-13). Die Werte gehen als literales Hex in erzeugte Farb-Überschreibungen.

**BAU-COMMIT:** `1d5ea7d` — `feat(consent): eigene Farben als vierte Darstellung (11.13c)`,
gepusht (`ead0e4e..1d5ea7d  main -> main`). **21 Dateien, 1 735 Zeilen hinzu, 155 entfernt**,
darunter die zwei NEUEN `src/lib/contrast.ts` (86 Zeilen) und `src/lib/contrast.test.ts`
(107) — GEMESSEN am Repo (`git show --stat`, CC, 2026-09-18). **`consent-revoke.ts` NICHT im
Commit**, wie schon in 11.13a und 11.13b: `wrapRevoke` bekommt den fertigen Aufbau, der Stil
steht dort bereits im String.

**DIE VIER GATES:** `vitest run` **von 1 829 auf 1 857 Tests** bei 84 → **85** Dateien
(1 856 nach dem Bau, +1 mit `UI11` aus der Korrektur-Runde). Die 1 829 sind GEMESSEN vor dem
ersten Eingriff in `src/` (`git stash push -- src/`, voller Lauf, `git stash pop`) und
deckungsgleich mit VERMERK P11.13-4. `tsc --noEmit` exit 0 · `lint` 0 errors / 1 warning (die
vorbestehende in `consent.test.ts`) · `build` Compiled successfully. Alle vier GEMESSEN (CC,
2026-09-18), zuletzt nach der Korrektur-Runde.

**DIE TRAGENDE INVARIANTE Z1 IST EINGELÖST — NEUNZEHN WERTE VORHER UND NACHHER IDENTISCH**
(GEMESSEN, CC, 2026-09-18; `diff` über beide Wertelisten ohne Kopfzeile: identisch): zwölf
Blockwerte (2 Formen × 2 Zweige × 3 Tabellen-Darstellungen) und sieben Ausgabetexte,
einschliesslich des Aus-Falls. **SIE IST AUCH STRUKTURELL:** `consentThemeCss({theme:"light"})`
liefert weiter den LEEREN String; `CSS1` und `CSS8` halten das ohne Zahl.

**DIE ZWEI GENAUEN NAMEN, DIE DER ZUSCHNITT OFFENLIESS:** die Kontrastfunktion heisst
`contrastRatio` und liegt in der NEUEN Datei `src/lib/contrast.ts` (mit `relativeLuminance`);
die Prüfstelle heisst `readConsentColor` und trägt die EINZIGE Zusicherung des opaken Typs
`ConsentColor` (Entscheidung P11.13-17, Wächter `CF1`). Die Vorbelegungs-Konstanten heissen
seit der Korrektur-Runde `CONSENT_COLOR_BACKGROUND_VORBELEGUNG` und
`CONSENT_COLOR_TEXT_VORBELEGUNG` — **nicht `…_FALLBACK`**: ein Rückfall ist eine LESESEITE,
und genau den schliesst Entscheidung P11.13-22 aus.

#### (a) DAS INSTRUMENT DES LIVE-NACHWEISES

**Chrome auf dem Desktop; Chrome auf einem iPhone 13.** Chrome auf iOS rendert mit WebKit —
**WebKit ist damit live BEOBACHTET, nicht gemessen.** **Firefox ist an keiner Achse dieser
Scheibe gemessen.** Lokal ist weiterhin nur Chromium gemessen.
OWNER-ANGABE vom 2026-09-18, vom Architekten weitergegeben; **CC kann sie nicht prüfen.**

#### (b) WAS BESTANDEN IST

**Die Schritte 1, 2 und 6 bis 13 der Live-Anleitung sind laut Owner bestanden** — Regression
der unberührten Seite und des ausgeschalteten Dialogs, die zwei Felder mit ihrer Vorbelegung,
das Überleben der gespeicherten Wahl beim Umschalten, P1/P2/P3 veröffentlicht, der Widerruf
in den eigenen Farben, der Fokus, das echte Handy.

**DER HINWEISTEXT, WÖRTLICH AN EINEM PAAR MIT 1,20:1** — und das ist die Kernzusage von
Entscheidung P11.13-16: **„Kontrast 1,20:1 — die Schwelle ist 4,5:1. Veröffentlichen bleibt
möglich."** **Das Veröffentlichen gelang.**
**DER IN DER ANLEITUNG GENANNTE P2-WERT 4,47 IST LOKAL BELEGT** (Probe und `CT1`), **live
NICHT abgelesen** — der Owner hat ein anderes Paar gewählt. Wer die 4,47 für einen
Live-Befund hält, liest eine Messung, die es nicht gibt.
OWNER-ANGABEN vom 2026-09-18, vom Architekten weitergegeben; **CC kann sie nicht prüfen.**

#### (c) DIE SCHRITTE 3 BIS 5 — EIN INSTRUMENTENWECHSEL, UND ER IST DIE TRAGENDE ANGABE DIESES VERMERKS

**DAS VORGESEHENE INSTRUMENT HAT VERSAGT, UND ZWAR STILL.** „Speichern unter" in Chrome
lieferte **zehn Dateien** (Vorher/Nachher × aus, Leiste hell, Leiste dunkel, Fenster hell,
Fenster dunkel) — **alle 14 385 Bytes, alle sha256 `2de7db6db78f001a…`, alle OHNE jeden
Dialog-Baustein**: `__ps_clb`, `attachShadow` und `pagesmithConsentRevoke` je **0 Treffer**;
Positivkontrolle im selben Lauf: `__ps_pve` und `pagesmith-consent` je **1**. **Der Dialog war
in jedem der Fälle eingestellt, veröffentlicht und auf dem Bildschirm sichtbar.**
GEMESSEN vom ARCHITEKTEN an den hochgeladenen Dateien (2026-09-18); die Sichtbarkeit ist
OWNER-ANGABE. **DIE URSACHE IST UNGEMESSEN** — die Vermutung lautet auf eine
zwischengespeicherte Fassung, und sie bleibt eine Vermutung.

**DIE FOLGE, UND SIE IST GRÖSSER ALS DIE DREI SCHRITTE:** Der Vorher/Nachher-Vergleich dieser
Dateien belegt **NICHTS** — **auch nicht für „aus".** Der Aus-Fall ist **LOKAL** belegt
(`T1`, `T-OFF` und die neunzehn Werte oben), **live nicht.**

**DAS ERSATZ-INSTRUMENT: DER HASH DER GELADENEN SKRIPT-ELEMENTE IN DER KONSOLE DER LIVE-SEITE.**
Es steht hier im WORTLAUT, weil eine spätere Runde die Messung sonst nicht wiederholen kann:

```js
(async () => { const enc = new TextEncoder(); const sha = async s => [...new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 12); const rows = []; for (const [i, el] of [...document.scripts].entries()) { const t = el.textContent; const tag = '<script' + (el.id ? ' id="' + el.id + '"' : '') + '>' + t + '</script>'; rows.push([i, el.id || '-', enc.encode(t).length, await sha(t), enc.encode(tag).length, await sha(tag)].join('\t')); } console.log(location.href + '\n' + rows.join('\n')); })();
```

**VERGLEICHSGRÖSSE IST DIE TAG-FORM**, nicht der blosse Rumpf — die lokalen Vorher-Werte sind
an derselben Form erhoben.

**DAS ERGEBNIS — OWNER-MESSUNG, live am 2026-09-18 auf `meta-test-5nlm3e.publayer.net`, nach
dem Deploy neu veröffentlicht:**

| Zustand | Block | Bytes | sha256 (12) |
|---|---|---|---|
| Leiste hell | `__ps_clb` | 4 603 | `7ec172a65fa5` |
| Leiste hell | `__ps_crv` | 4 918 | `14510803fd28` |
| Leiste dunkel | `__ps_clb` | 4 932 | `9468307af5b1` |
| Leiste dunkel | `__ps_crv` | 5 247 | `c073ee9c405e` |
| Fenster hell | `__ps_cmo` | 5 051 | `674875af751a` |
| Fenster hell | `__ps_crv` | 5 366 | `75110375e270` |

**ALLE SECHS SIND ZEICHENGLEICH MIT DEN VORHER-WERTEN, DIE CC VOR DEM ERSTEN EINGRIFF IN
`src/` ERHOBEN HAT** (Bau-Bericht vom 2026-09-18, Auftrag 1; geprüft gegen diesen Bericht,
nicht gegen die Angabe des Architekten — CC, 2026-09-18). **DAMIT IST DIE BYTE-GLEICHHEIT VON
„hell" UND „dunkel" AN EINER ECHTEN AUSGELIEFERTEN SEITE VERANKERT**, und zwar für beide
Formen und beide Zweige — mehr, als die drei ausgefallenen Schritte verlangt hatten.
**WAS ES NICHT BELEGT:** den Aus-Fall (dort gibt es keinen Block, den man hashen könnte) und
„automatisch" (live nicht gesichert, s. die Pflicht 5 des Zuschnitts).

#### (d) DAS BASIS-HTML DER LOKALEN QUERPROBE — IM WORTLAUT, DAMIT ES NICHT WIEDER VERLORENGEHT

**249 Bytes, sha256 `38b3eee3cf1b16efb6984a513f2a5e534152ff2e3d3084dbaf174179c95d5b6c`**
(GEMESSEN, CC, 2026-09-18). Es steht ab dem Bau byte-genau im Treiber; hier steht es, weil ein
Treiber im Scratchpad liegt und mit ihm verschwindet — genau das ist dem Basis-HTML der
VERMERKE P11.13-1, -3 und -4 widerfahren (VERMERK P11.13-5).

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Probeseite 11.13c</title>
</head>
<body>
<main>
<h1>Probeseite</h1>
<p>Ein Absatz.</p>
</main>
</body>
</html>
```

**DAS ALTE BASIS-HTML IST UND BLEIBT VERLOREN.** Der Rekonstruktionsversuch aus dem bekannten
`off`-sha256 fand unter 8 000 Kandidaten **null** mit der nötigen Länge von 320 Bytes
(GEMESSEN, CC, 2026-09-18). **DIE QUERPROBE GEGEN DIE VERMERKE P11.13-3 UND -4 IST TROTZDEM
GEFÜHRT, UND ZWAR AN DER RICHTIGEN ACHSE:** Die **zwölf basis-UNABHÄNGIGEN** Werte stimmen
EXAKT — vier sha256 und acht Blockgrössen. Die sieben Ausgabewerte weichen um **genau 71
Bytes** ab, an **allen sieben identisch** (249 gegen 320 Bytes Eingabe). Eine Abweichung, die
an sieben unabhängigen Werten exakt konstant ist, hat eine Ursache, und das ist die Eingabe.

#### (e) DAS VIEWPORT-TAG — WARUM DER DIALOG AUF MOBIL KLEIN WIRKT

**Die Testseite `meta-test-5nlm3e` trägt KEIN `<meta name="viewport">`** — OWNER-ANGABE
(Volltextsuche im Browser), **bestätigt an den hochgeladenen Dateien: 0 Treffer**
(ARCHITEKT-PRÜFUNG 2026-09-18). Ohne dieses Tag legt der mobile Browser eine breite
Ersatz-Fläche zugrunde und skaliert die ganze Seite herunter — **der Dialog wird mit ihr
klein.** **DAS IST KEINE REGRESSION DIESER SCHEIBE**, und es ist auch kein Befund über die
Leiste: Es trifft jede Seite ohne das Tag und jede Darstellung gleichermassen. Der
Produkt-Befund dazu liegt als Vorrat P11.13-8.

#### (f) DIE LOKALE PROBE UND DIE PFLICHT-MUTATIONEN — ZAHLEN

**DIE PROBE** (Playwright/Chromium, `file://` im Scratchpad, echter Ausgabetext über
`injectPageViewEmitter`, `localStorage.clear()` + Reload je Messung, **Probeseite mit Link,
Knopf und Feld ausserhalb des Dialogs** — Auflage Vorrat P11.13-4; Fehler-Listener VOR dem
Lauf registriert; `.playwright-mcp/` vorher als ignoriert geprüft). **60 Zustände:** 3 Paare ×
2 Formen × 5 Viewports × ein- und ausgeklappt. **Die drei Paare, vor dem Lauf festgelegt:**
**P1** `#ffffff`/`#111827` (17,7397) · **P2** `#ffffff`/`#777777` (4,4781, knapp scheiternd) ·
**P3** `#0b1020`/`#e8eaf0` (15,7397).

- **P11.13-3: 60/60 erfüllt** (drin und treffbar).
- **P11.13-4 (Fokus): 30/30** — nach dem Klick ist `root.activeElement` ein `checkbox` im
  eigenen Host, `scrollY` **400 → 400** in jedem Lauf.
- **P11.13-5: Breiten durchgehend 160/160; `wegTeiltMit` ∈ {0, 2} in 29 von 30** eingeklappten
  Zuständen. **DIE EINE AUSNAHME GEHÖRT NICHT DIESER SCHEIBE** — Gegenprobe im selben
  Werkzeug, s. Vorrat P11.13-6.
- **KONTRAST, ZWEI WEGE, KEINE ABWEICHUNG:** der Browser-Weg (Farben am gerenderten Dokument
  gelesen, Formel dort neu implementiert) ist mit dem Funktions-Weg auf **vier
  Nachkommastellen** gleich — P1 **17,7397**, P2 **4,4781**, P3 **15,7397**, beide Formen.
  **UND ALLE SIEBEN PAARE TRAGEN DENSELBEN WERT** — Text, Knopftext, Rahmen, Weg-Text,
  Fokus-Ring, Kästchen **und Container-Linie**. Das ist der gemessene Beleg für das
  Ein-Paar-Argument aus Entscheidung P11.13-13 und für P11.13-20.
- **FOKUSSIERT IST VON UNFOKUSSIERT ZU UNTERSCHEIDEN, 3/3** — Bildpunkt-Prüfsummen des
  Knopf-Rechtecks: P1 **687 956 617 / 2 262 768 076** · P2 **1 389 801 320 / 881 316 029** ·
  P3 **1 659 823 554 / 999 269 696**.
- **`color-scheme` AM NATIVEN KÄSTCHEN WIRKT, PER BILDPUNKT BELEGT:** P1/P2 `light`,
  UA-Rahmen `rgb(0,0,0)`, Prüfsumme **2 966 584 599** — P3 `dark`, UA-Rahmen
  `rgb(255,255,255)`, Prüfsumme **1 454 854 035**. `getComputedStyle` genügt dafür nicht, wie
  Entscheidung P11.13-21 verlangt.
- **UNGEFANGENE FEHLER: KEINE**, über alle Läufe.

**DIE FÜNF PFLICHT-MUTATIONEN** (je einzeln gesetzt, über die GANZE Suite gemessen,
Vorhersage als KLASSE vor dem Lauf, nach jeder Rücknahme `sha256sum -c` 3/3 OK):

| # | Gesetzt | Ergebnis | Urteil |
|---|---|---|---|
| M-a | Anker aus `CONSENT_COLOR_PATTERN` entfernt | 3: PT5, CF2, CT4 | DECKUNG, eine Klasse |
| M-b | Farb-Abbruch in `publishProject` entfernt | 2: PT5, PT5b | DECKUNG, keine Kaskade |
| M-c | der `custom`-Zweig reicht den Rohwert ungeprüft durch | erst `tsc` ROT, nach dem Erzwingen **0 Tests** | **SCHLECHTES MODELL, KEIN TESTLOCH** — s. unten |
| M-d | `getConsentColorText`-Term aus `settingsEqual` entfernt | 2: CF3, UI8 | DECKUNG; Vorhersage in Form UND Zahl getroffen |
| M-e | Linearisierung in `relativeLuminance` entfernt | 4: CT1, CT2, CSS6, UI10 | DECKUNG; **CT3 (Schwarz/Weiss) blieb GRÜN — genau wie angesagt** |

**M-c AUSGESCHRIEBEN, WEIL EINE GRÜNE MUTATION EINE STOPP-BEDINGUNG IST:** Der erste Versuch
machte **`tsc` rot** — der unmögliche Zustand ist nach P11.13-17/-18 nicht darstellbar. Auf
`as never` geschärft (ein sichtbares Erzwingen, kein Versehen) kompiliert er und **traf
nichts**, weil in jedem Zustand, in dem er etwas Feindliches ausliefern würde, **der Abbruch
(Z6) bereits zurückgegeben hat**. **GEGENPROBE: M-c PLUS M-b** — beide Tore weg — **lässt PT5
und PT5b fallen.** Damit ist belegt, dass die zwei Tore **unabhängig** tragen; das ist Lektion
(b) an MUTATIONSPROBEN, nicht ein Loch.
**EINE SECHSTE MUTATION IN DER KORREKTUR-RUNDE:** `farbenUnbekannt` von `||` auf `&&` → **1
Test: UI11**; `UI9` blieb grün wie angesagt (dort sind BEIDE Werte ungültig, `&&` liefert
dasselbe). Sie ist der Wächter des GEMISCHTEN Zustands — eine gültige neben einer ungültigen
Farbe —, und den hielt vor der Korrektur-Runde kein Test.

**ZWEI WERKZEUG-BEFUNDE AUS DEM LAUF, beide gefangen und behoben:** `git stash` hat
`PublishView.tsx` (Arbeitsbaum `w/crlf`, Index `eol=lf`) beim `pop` auf CR=0 zurückgegeben —
1 von 16 `sha256sum -c` FAILED, als reine Zeilenenden-Sache nachgewiesen und wiederhergestellt
(Vorrat P11.13-7). Und `UI10` prüfte zuerst `disabled === false` absolut statt den
UNTERSCHIED; die Zusage von P11.13-16 ist, dass der Kontrast am Knopf **nichts ändert**.

**DIE GELESENE REFERENZQUELLE** (Auflage aus Entscheidung P11.13-16, „nicht aus dem eigenen
Code"): W3C, „Web Content Accessibility Guidelines (WCAG) 2.1" (`https://www.w3.org/TR/WCAG21/`)
für die Formel; WebAIM Contrast Checker (`https://webaim.org/resources/contrastchecker/`) für
fünf Zahlenpaare — `#000000`/`#ffffff` **21** · `#767676`/`#ffffff` **4.54** ·
`#808080`/`#ffffff` **3.94** · `#777777`/`#ffffff` **4.47** · `#f9fafb`/`#111827` **16.97**
(GELESEN, CC, 2026-09-18). **ZWEI BEFUNDE AN DEN QUELLEN:** WebAIM **schneidet ab, es rundet
nicht** (3,9494 → „3.94"), weshalb `CT1` abgeschnitten vergleicht und die Anzeige es ebenso
tut; und WCAG 2.1 nennt die Schwelle **0.04045**, während VERMERK P11.13-3 die **0.03928** aus
WCAG 2.0 führt — **für 8-Bit-sRGB gleichwertig**, kein Kanalwert wählt verschiedene Zweige.

**DIE GRENZEN, DIE DIESER NACHWEIS NICHT ÜBERSCHREITET:**
- **Lokal nur Chromium.** Live BEOBACHTET sind Chrome (Desktop) und WebKit über Chrome auf
  iOS; **Firefox ist ungemessen.**
- **Der Aus-Fall ist live nicht belegt** — nur lokal (c).
- **„automatisch" ist live nicht gesichert** — so zugeschnitten, lokal belegt.
- **Keine echte Kundenseite in der lokalen Probe:** kein fremdes CSS, keine `!important`-Flut,
  keine eigene Stapel-Ebene.
- **Screenreader ungeprüft** — was aus „Eigene Farben", „Hintergrundfarbe" und „Textfarbe"
  angesagt wird, ist nicht erhoben.
- **Der Export-Pfad trägt weiterhin kein Thema und keine Farbe** (offener Punkt DER
  EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST).

PROVENIENZ: Bau-Commit, Dateizahlen, Gates, Testzahlen, die neunzehn Byte-Werte, sämtliche
Probe- und Mutationswerte, das Basis-HTML und die Referenzquellen sind GEMESSEN bzw. GELESEN
am Repo und am eigenen Lauf (CC, 2026-09-18). **Sämtliche Live-Angaben — (a), (b), die
Sichtbarkeit in (c), die sechs Block-Werte und die Owner-Hälfte von (e) — sind OWNER-ANGABEN
bzw. OWNER-MESSUNGEN vom 2026-09-18, vom Architekten weitergegeben; CC kann sie nicht
prüfen.** Die zehn gleichen Dateien in (c) und die 0 Treffer auf das Viewport-Tag sind eine
ARCHITEKT-PRÜFUNG desselben Tages. Der Abgleich der sechs Block-Werte gegen die eigenen
Vorher-Werte ist GEMESSEN (CC, 2026-09-18) — gegen den Bau-Bericht, nicht gegen die
weitergegebene Angabe. **Die Ursache des Instrumenten-Versagens ist UNGEMESSEN.**

### VERMERK P11.13-7 — Aufklärung 11.13d (FREIER SACHTEXT), 2026-09-18

**KEIN BAU-COMMIT, UND DER GRUND STEHT HIER:** Es war eine READ-ONLY-Aufklärung ohne
Änderung am Repo (docs/arbeitsweise.md, "Die Standdatei", Absatz "Ein Vermerk trägt den
Hash seines Code-Commits"). Der Arbeitsbaum war vorher und nachher sauber; die
Schreibvorgänge lagen im Scratchpad ausserhalb des Repos und in der ignorierten Ablage
`.playwright-mcp/` (`git check-ignore -v` → `.gitignore:28`, VOR dem ersten Browser-Aufruf
geprüft). Der Stand, auf dem gemessen wurde, ist `88a6ebb`.

**DAS INSTRUMENT, ZWEITEILIG:** (1) Vite `createServer` + `ssrLoadModule` gegen das Repo im
Scratchpad — **die echten Funktionen, nicht nachgebaut**: `buildMetaRuntime` aus
`src/lib/tracking/meta.ts` und `buildConsentBarScript` aus `src/lib/tracking/consent-bar.ts`.
(2) Playwright/**Chromium**, `file://`, Probeseiten im Scratchpad. Kein echter Pixel, keine
echte Seite, keine Netzanfrage nach aussen.

#### (a) DER AUSBRUCH IST GEMESSEN — DIE GRENZE VON VORRAT P11.13-5 IST DAMIT FALSCH

Die Nutzlast ging auf dem PRODUKTIVEN Weg hinein: bei der Pixel-ID als Argument von
`buildMetaRuntime`, beim Dialog-Text durch Ersetzen **genau eines** Vorkommens von
`JSON.stringify(CONSENT_REJECT_LABEL)` in einer **Scratch-Kopie** des echten Blocks — also
derselbe Weg, den ein Betreiber-Text nähme.

| Lauf | Nutzlast | `__AUSBRUCH` | `<img>` | `script`-Elemente | Wiring läuft / Leiste steht | `pageerror` |
|---|---|---|---|---|---|---|
| a-kontrolle | `1234567890` | false | 0 | 2 | **ja** (`PS_PIXEL_ID` definiert) | keine |
| a-ausbruch | `</script><img src=x onerror="…">` | false¹ | **1** | 2 | **nein** | 2× `SyntaxError` |
| a2-ausbruch | `</script><img src=x onerror=…>` (ohne `"`) | **TRUE** | **1** | 2 | **nein** | 1× `SyntaxError` |
| a-kommentar | `<!--<script>…` | false | 0 | **1** statt 2 | **nein** | **keine** |
| b-kontrolle | `"Ablehnen"` | false | 0 | 3 | **Leiste steht**, Knöpfe `["Alle akzeptieren","Ablehnen","Einstellungen"]` | keine |
| b-ausbruch | `</script><img src=x onerror="…">` | false¹ | **1** | 3 | **keine Leiste** (`pagesmith-bar` = 0) | 2× `SyntaxError` |
| b2-ausbruch | `</script><img src=x onerror=…>` (ohne `"`) | **TRUE** | **1** | 3 | **keine Leiste** | 1× `SyntaxError` |
| b-kommentar | `<!--<script>…` | false | 0 | **2** statt 3 | **keine Leiste** | **keine** |

¹ **DIE ANFÜHRUNGSZEICHEN-BEOBACHTUNG, UND SIE IST KEIN SCHUTZ:** `JSON.stringify` maskiert
die INNEREN Anführungszeichen zu `\"`. Im ausgelieferten Text steht danach
`<img src=x onerror=\"window.__AUSBRUCH=1\">`; der HTML-Parser liest `onerror` als
unquotiertes Attribut mit dem Wert `\"window.__AUSBRUCH=1\"` — ungültiges JavaScript, der
Handler zündet nicht. **DER AUSBRUCH SELBST IST TROTZDEM EINGETRETEN:** das `<img>` existiert,
der Block ist geschlossen, das Wiring läuft nicht. **Die anführungszeichenfreie Variante
FÜHRT AUS.** Wer nur die erste Nutzlast fährt, protokolliert eine Entwarnung, die es nicht
gibt.

**DREI SCHADENSBILDER, GETRENNT:**
1. **AUSFÜHRUNG** (`a2`, `b2`) — fremder Code läuft im Ursprung der Kundenseite.
2. **ZERSTÖRUNG DES EIGENEN BAUSTEINS** — in JEDEM Ausbruchsfall läuft das Wiring nicht bzw.
   die Leiste steht nicht; der Rest des Blocks wird sichtbarer Body-Text (**5 772** Zeichen
   bei `a2`, **619** bei `b2`).
3. **STILLES VERSCHLUCKEN — die gefährlichste Variante, weil sie KEINEN Fehler erzeugt.**
   `<!--<script>` versetzt den Parser in den Zustand „script data escaped"; das NACHFOLGENDE
   Script-Element wird mitgefressen. **Null `pageerror`, null Konsolenfehler**, kein
   sichtbarer Schaden — es fehlt nur ein Baustein.

#### (b) DIE QUERPROBE AM SERIALISIERER — UND IHRE GRENZE

Nachbau des Pfads von `generate.ts` im Browser (`DOMParser` → `createElement("script")` →
`textContent` → `outerHTML`): Ein `</script><img …>` erscheint im Serialisat **roh**
(`rohesEndeTagImSerialisat = true`), und es entsteht **kein** Unicode-Escape in der Form
`"\\u003c"` (`escapeVorhanden = false`). Die Gegenprobe mit der Mapping-Maskierung liefert
das escapte Ende-Tag im Serialisat.
**DIE KETTE IST DAMIT VOLLSTÄNDIG: `JSON.stringify` maskiert `<` nicht, und der Serialisierer
tut es auch nicht.**
**DIE GRENZE GEHÖRT DAZU:** Eine zweite Teilzusicherung desselben Laufs
(`maskierterBlockRoh`) war durch den ERSTEN Script-Block im selben Prüfdokument
**kontaminiert** und trägt nichts. Nur die zwei oben genannten Werte sind sauber.

#### (c) DIE EINZIGE MASKIERUNG IM REPO IST EIN EINZELSTÜCK

GEMESSEN (CC, 2026-09-18), Achse `u003c|u003C|replace\(/</` über `src/`: **genau EIN
Treffer** — `src/lib/generate.ts`, in `generateFunctional`:
`const json = JSON.stringify(table).replace(/</g, "\\u003c");`. Kein Name, kein zweiter
Aufrufer. Eine breitere Achse (`escapeHtml|htmlEscape|escapeScript|sanitiz|u003c|&lt;|encodeHtml`,
ohne Testdateien) findet als einzigen BENANNTEN Helfer `escapeHtml` in
`src/lib/hosting/blocked-page.ts` — **anderer Kontext** (HTML-Textknoten der eigenen
451-Seite, `"<" : "&lt;"`), für Script-Rohtext untauglich und nirgends geteilt.

#### (d) KEIN TEXT GEHT ÜBER `innerHTML` — UND KEINER AUSSERHALB VON SCRIPT-ROHTEXT

GEMESSEN (CC, 2026-09-18), Achse case-insensitiv
`textContent|innerText|innerHTML|insertAdjacentHTML|setAttribute|outerHTML|document\.write|createTextNode`
über `consent-choice.ts`, `consent-bar.ts`, `consent-modal.ts`, `consent-revoke.ts`,
`consent-setter.ts`, `consent-store.ts`, `pageview-emitter.ts`: **kein Treffer auf
`innerHTML`, `insertAdjacentHTML`, `outerHTML`, `document.write`, `innerText`.**
POSITIVKONTROLLE im selben Lauf: `innerHTML` trifft in `src/lib/generate.ts` und
`src/lib/detect.test.ts`.
**ELF TEXTPLÄTZE, ALLE ALS KONSTANTE, ALLE ÜBER `JSON.stringify` IN SCRIPT-ROHTEXT:**
`CONSENT_TEXT` (79 Zeichen) · `CONSENT_ACCEPT_LABEL` (16) · `CONSENT_SAVE_LABEL` (17) ·
`CONSENT_REJECT_LABEL` (8) · `CONSENT_WAY_LABEL` (13) · `CONSENT_GROUPS_LABEL` (8) ·
`CONSENT_GROUP_MEASURE_LABEL` (7) · `CONSENT_GROUP_ADS_LABEL` (7) ·
`CONSENT_BAR_REGION_LABEL` (12) · `CONSENT_MODAL_DIALOG_LABEL` (12) ·
`CONSENT_REVOKE_WARNING` (142, `console.warn`, kein DOM).
**DIE DREI `aria-label` SIND KEIN ATTRIBUT-KONTEXT ZUR BAUZEIT:** Sie stehen als
JS-String-Argument von `setAttribute` im Script-Rohtext; das Attribut setzt erst die
DOM-Schnittstelle zur Laufzeit, und die parst nicht nach.
**KEIN LINK, KEIN `title`:** Achse `href|createElement\("a"\)|\btitle\b|datenschutz|privacy`
über die vier Erzeuger — **zwei Treffer, beide Prosa im Kommentar**. POSITIVKONTROLLE:
dieselbe Achse trifft in `PublishView.tsx`.

#### (e) DIE GEOMETRIE — `min-width`, KEINE FESTE BREITE

`button{box-sizing:border-box;min-width:160px;…padding:10px 16px;border:1px solid …}` —
**eine Untergrenze, keine `width`**. **KEIN `white-space`, KEIN `nowrap`, KEIN
`text-overflow`, KEIN `word-break`, KEIN `overflow-wrap`, KEIN `hyphens`** in den drei
Consent-Stylesheets (POSITIVKONTROLLE: dieselbe Achse trifft `truncate` in
`CodeImporter.test.tsx`). **Folge: Umbruch, kein Abschneiden** — längerer Text verbreitert
den Knopf und bricht darin um.
**DIE LEISTE HAT KEIN `overflow` (L12 verbietet das Wort) UND KEIN `max-height`.** Sie wächst
mit dem Sachtext **nach oben**, weil `:host` `position:fixed; bottom:0` trägt, und kann bei
niedriger Fensterhöhe über den oberen Rand wandern — **genau die Achse aus Roadmap (e), die
Entscheidung P11.13-1 für den ausgeklappten Zustand vermieden hat. Ein freier Sachtext
erzeugt sie neu, und zwar in BEIDEN Zuständen.**
**DAS MODAL IST ROBUSTER:** `.dialog{max-height:calc(100% - 32px);overflow:auto;}` — es
bekommt einen eigenen Scrollbereich statt über den Rand zu wandern.
**DIE RECHNUNG AN DER KANTE (am CSS ABGELESEN, nicht gemessen):** Innenbreite der Leiste bei
360 px Fenster = `360 − 32` (Polsterung) = **328 px**; zwei Knöpfe zu 160 px plus 8 px Abstand
= **2 · 160 + 8 = 328**. **Der Bestand steht dort exakt auf der Kante** — jedes Zeichen, das
einen der zwei Knöpfe über 160 px hinaus verbreitert, kippt die Reihe. Beim Modal ist die
Innenbreite bei 390 px **326** und bei 360 px **296**, dort passen zwei Knöpfe schon heute
nicht nebeneinander, und P11.13-5 ist über den zweiten Halbsatz erfüllt.
**VORRAT P11.13-6 FÜHRT DIESE KANTE BEREITS ALS GEMESSENE VERLETZUNG IM BESTAND** (Leiste /
360×480 / eingeklappt / lange Seite, Scrollbalken 15 px, `wegTeiltMit === 1`). Ein längerer
Text verschärft ihn, er erzeugt ihn nicht.

#### (f) IM BESTAND GIBT ES KEINE LÄNGEN- UND KEINE ZEICHENPRÜFUNG FÜR BETREIBER-TEXT

GEMESSEN (CC, 2026-09-18), Achse `maxLength=|MAX_[A-Z_]*LEN|maxlength|\.slice\(0,` über
`src/`, ohne Testdateien, `mappings.ts` binärfest gelesen (die Datei trägt ein NUL-Byte):
**KEIN `maxLength`-Attribut an irgendeinem Eingabefeld im Repo.** Was es gibt:
`MAX_TARGET_LEN = 253` (`domains/register.ts`, Kappung) · `MAX_HOST_LEN = 253`
(`hosting/host.ts`, Abweisung) · `EVENT_TYPE_MAX_LENGTH = 64` (`analytics/persist.ts`) ·
`CONSENT_STORE_MAX_LENGTH = 512` (`tracking/consent-store.ts`) ·
`CONSENT_COLOR_PATTERN = /^#[0-9a-f]{6}$/` (`lib/settings.ts`) — **die EINZIGE Zeichenprüfung
eines Betreiber-Werts, der in den ausgelieferten Text geht.**
**Der Projektname trägt keine Begrenzung** (`actions.ts`: `name.trim() || "Unbenanntes
Projekt"`), die Pixel-ID weder Längen- noch Zeichenprüfung.
**FOLGE:** Für Betreiber-Eingabe im ausgelieferten Text kennt der Bestand **genau eine**
tragende Bauform — das Alphabet-Tor von P11.13-14. Eine Längenbegrenzung als
Sicherheits-Mittel hat im Repo **keinen Präzedenzfall**; die vorhandenen Grenzen sind
Speicher- und Protokollgrenzen.

#### (g) L3 UND M3 FAHREN SEIT 11.13c ÜBER VIER DARSTELLUNGEN — DER SATZ AN ROADMAP (g) IST ÜBERHOLT

GELESEN am Testtext (CC, 2026-09-18): **L3** (`consent-bar.test.ts`) und **M3**
(`consent-modal.test.ts`) fahren über `VIER_DARSTELLUNGEN` — `light`, `dark`, `auto` und
`custom` mit zwei geprüften Farben — und prüfen je Darstellung, dass der Rumpf kein `<` trägt.
`testFarbe` erzeugt **keine zweite Zusicherung**: es ruft `readConsentColor` und wirft bei
`"unknown"`; **Entscheidung P11.13-17 ist am Bestand eingehalten.**
**WELCHER WÄCHTER WÜRDE ROT, WENN EIN BETREIBER-TEXT MIT `<` DIE EINSETZSTELLE ERREICHT?
KEINER** — und zwar nicht, weil die Wächter schwach wären, sondern weil sie den Betreiber-Text
nicht kennen: Der einzige Parameter, über den heute ein Betreiber-Wert hineingeht, ist
`darstellung`, und dort ist ein `<` durch `ConsentColor` **nicht konstruierbar**. Ein
Textwert käme als NEUES Argument dazu, und L3/M3 würden ihn **by default nicht einsetzen**.

#### (h) DIE BYTE-GLEICHHEIT DES EINBETTUNGS-HELFERS IST GEMESSEN, NICHT BEHAUPTET

GEMESSEN (CC, 2026-09-18, über die echten Funktionen): **KEIN heute eingebetteter Wert
enthält ein `<`** — 16 Konstanten und Schlüssel-Arrays (`CONSENT_TEXT`, die vier
Beschriftungen, die drei Gruppen-/aria-Namen, die zwei Host-Namen, die Warnung,
`ALL_CONSENT_KEYS`, die zwei Gruppen-Listen), die vier Stylesheets
(`consentThemeCss` für `light` 0 · `dark` 329 · `auto` 366 · `custom` 329 Zeichen) und
**sechzehn ganze Blocktexte** (2 Formen × 2 Zweige × 4 Darstellungen): **TREFFER GESAMT 0.**
POSITIVKONTROLLE im selben Lauf: dieselbe Prüfung auf `"x</script>"` ergibt `true`.
**QUERPROBE:** Die sechzehn Blockgrössen sind zeichengleich mit den VERMERKEN P11.13-4 und
P11.13-6 (Leiste `load` 4 603 / 4 932 / 4 969 / 4 932; Modal `load` 5 051 / 5 380 / 5 417 /
5 380 usw.).
**DIE AUSNAHME, DIE MITMUSS — DIE PIXEL-ID:** Für sie ist „enthält kein `<`" **keine
Eigenschaft des Werts, sondern eine Annahme über seine Benutzung**. Sie ist freie
Betreiber-Eingabe und kann ein `<` tragen — das ist genau der in (a) gemessene Ausbruch. Der
Byte-Nachweis der Bau-Scheibe läuft deshalb über eine **numerische** Pixel-ID.

**DIE GRENZEN DIESER AUFKLÄRUNG — ausdrücklich:**
- **Nur Chromium.** Firefox und WebKit sind an keiner Achse dieser Runde gemessen.
- **`file://`, nicht `https://publayer.net`** — für die Parser-Achse ohne Belang, für alles
  andere nicht.
- **Keine echte Kundenseite:** kein fremdes CSS, keine `!important`-Flut, keine eigene
  Stapel-Ebene.
- **Der Dialog-Fall ist über eine SCRATCH-KOPIE gefahren.** Im Repo existiert kein Weg, auf
  dem ein Betreiber-Text dorthin gelangt. **Die Messung sagt, was geschähe — nicht, dass es
  heute geschieht.**
- **Ersetzt wurde EINE Konstante** (`CONSENT_REJECT_LABEL`). Ob eine andere Einsetzstelle sich
  gleich verhält, ist am Weg ABLESBAR (dieselbe `JSON.stringify`-Ebene) und **nicht gemessen**.
- **Die Geometrie-Aussagen unter (e) sind am CSS ABGELESEN, nicht gemessen.** Ob bei 360 px
  ein verbreiterter Knopf `wegTeiltMit` auf 1 oder 0 bringt, ist eine Probe-Achse.

PROVENIENZ DIESES VERMERKS: die Code-Aussagen GEMESSEN bzw. GELESEN am Repo (CC, 2026-09-18,
auf `88a6ebb`); die Ausbruchstabelle, die Querprobe und die Byte-Gleichheits-Messung GEMESSEN
am eigenen Lauf desselben Tages. Die Rechnung `2 · 160 + 8 = 328` ist am CSS ABLESBAR, keine
Messung. **KEINE Live-Angabe, KEINE Owner-Angabe in diesem Vermerk.**

### VERMERK P11.13-8 — Scheibe 11.13d, FREIER SACHTEXT, abgeschlossen 2026-09-18

**GEGENSTAND:** Der Betreiber ersetzt den erläuternden Satz des Einwilligungs-Dialogs durch
einen eigenen. Dazu entsteht der **Einbettungs-Helfer**, über den seit dieser Scheibe jeder
Betreiber-Wert läuft, der in Script-Rohtext geht — der Sachtext, die Pixel-ID und das
Stylesheet der eigenen Farben.

**BAU-COMMIT:** `a3e286b` — `feat(consent): freier Sachtext und Einbettungs-Helfer (11.13d)`,
gepusht (`d2a008a..a3e286b  main -> main`). **23 Dateien, 1 382 Zeilen hinzu, 116 entfernt**,
darunter die zwei NEUEN `src/lib/script-embed.ts` (78 Zeilen) und `src/lib/script-embed.test.ts`
(105) — GEMESSEN am Repo (`git log -1 --stat`, CC, 2026-09-18). **`consent-revoke.ts` ist mit
drei Zeilen im Commit** — anders als in 11.13a, 11.13b und 11.13c: Die Konsolen-Warnung des
Widerrufs ist eine Einbettung in den vier Dialog-Erzeugern und läuft damit über den Helfer
(Entscheidung P11.13-25, Stufe (2)).

#### (a) DER LIVE-NACHWEIS DER REGRESSION — SECHS BLOCKWERTE UND DAS WIRING

**INSTRUMENT:** das Konsolen-Skript aus VERMERK P11.13-6, Punkt (c), **Tag-Form** — nicht
„Speichern unter", das dort still versagt hat. **ORT:** `meta-test-5nlm3e.publayer.net`,
**nach dem Deploy neu veröffentlicht**, Sachtext-Feld **leer**.

| Zustand | Block | Bytes | sha256 (12) |
|---|---|---|---|
| Leiste hell | `__ps_clb` | 4 603 | `7ec172a65fa5` |
| Leiste hell | `__ps_crv` | 4 918 | `14510803fd28` |
| Leiste dunkel | `__ps_clb` | 4 932 | `9468307af5b1` |
| Leiste dunkel | `__ps_crv` | 5 247 | `c073ee9c405e` |
| Fenster hell | `__ps_cmo` | 5 051 | `674875af751a` |
| Fenster hell | `__ps_crv` | 5 366 | `75110375e270` |
| jeder Lauf | Wiring (Index 2, `id` „-") | 12 251 | `a3529b57452b` |

**DIE SECHS BLOCKWERTE SIND GEGEN ZWEI EIGENE QUELLEN GEPRÜFT UND STIMMEN ZEICHENGLEICH**
(CC, 2026-09-18): gegen VERMERK P11.13-6, Punkt (c) — dieselben sechs Werte, dort am
2026-09-18 vor dieser Scheibe live erhoben — und gegen die Vorher-Liste des Bau-Berichts
desselben Tages, die vor dem ersten Eingriff in `src/` erhoben wurde. **Damit ist die
Byte-Gleichheit des ausgelieferten Textes für „hell" und „dunkel", beide Formen und beide
Zweige, ÜBER DEN 11.13d-DEPLOY HINWEG an einer echten Seite verankert.**
**DER WIRING-WERT IST VON CC NICHT PRÜFBAR**, und der Satz gehört dazu: Er ist die
OWNER-MESSUNG vom 2026-09-18, die schon die Pflicht 5 des Zuschnitts führte. CC hat nie eine
Tag-Form dieses Skripts erhoben — die eigene Messung galt dem RUMPF von `buildMetaRuntime`
mit einer Testkennung (6 365 Bytes, `f6ed3535e825`), also einer anderen Grösse an einem
anderen Wert. **Was er belegt, belegt er allein als Owner-Angabe: die eine geänderte Zeile in
`meta.ts` hat den ausgelieferten Wiring-Text nicht bewegt.**

#### (b) DER AUS-FALL — LIVE BELEGT, MIT EINER BENANNTEN GRENZE

Dialog **aus**, nach dem Deploy neu veröffentlicht:

| Block | Bytes | sha256 (12) |
|---|---|---|
| `pagesmith-consent` | 790 | `854831d25209` |
| `pagesmith-mappings` | 210 | `dba4fe81d9b9` |
| Wiring (Index 2, `id` „-") | 12 251 | `a3529b57452b` |
| `__ps_pve` | 806 | `72d1ef626bcf` |

**KEIN DIALOG-BAUSTEIN.** **QUERPROBE (ARCHITEKT-PRÜFUNG 2026-09-18):** dieselbe Formel,
angewandt auf die hochgeladene Datei `Vorher_aus.html`, liefert für **alle vier** Skripte
zeichengleiche Werte. **DAMIT IST DER AUS-FALL ÜBER DEN 11.13d-DEPLOY LIVE BELEGT** — und
das ist neu: Für die Scheibe 11.13c war er ausdrücklich **nur lokal** belegt, weil dort das
Sicherungs-Instrument versagt hatte (VERMERK P11.13-6, Punkt (c)).
**DIE GRENZE GEHÖRT ZWINGEND DAZU:** Jene Datei stammt vom 2026-09-18 aus der Zeit **vor**
dem 11.13d-Deploy; **ihr genauer Stand ist unbekannt.** Sie belegt die Gleichheit über
diesen Deploy hinweg und **für die Scheibe 11.13c nichts** — deren Aus-Fall bleibt live
unbelegt.

#### (c) DER FEINDLICHE SACHTEXT — LIVE, UND ES IST DIE NUTZLAST, DIE AUSGEFÜHRT HATTE

Eingetragen wurde `</script><img src=x onerror=alert(1)>` — **anführungszeichenfrei, also
genau die Variante, die in VERMERK P11.13-7 lokal FREMDEN CODE AUSGEFÜHRT hat**; die Fassung
mit Anführungszeichen brach dort zwar aus, zündete den Handler aber nicht, und das war ein
Zufall der Zeichenfolge.

- **KEIN ALARM.**
- **Der Text erscheint WÖRTLICH in der Leiste** (Owner-Screenshot).
- **ACHT Script-Elemente — dieselbe Zahl wie mit dem Standardtext.**
- `__ps_clb` **4 571 / `906ad30408a5`**; die übrigen Skripte unverändert.

**DASS DER BLOCK KLEINER IST ALS MIT DEM STANDARDTEXT (4 571 gegen 4 603), IST DER ERWARTETE
AUSGANG UND KEIN BEFUND:** Der eingesetzte Satz ist kürzer als unserer, und die Maskierung
kostet je `<` fünf Zeichen. **DIE TRAGENDE ZAHL IST DIE DER SCRIPT-ELEMENTE** — ein Ausbruch
hätte sie verändert, ein stilles Verschlucken ebenfalls.
**ALLE ANGABEN DIESES ABSCHNITTS SIND OWNER-MESSUNGEN bzw. OWNER-ANGABEN vom 2026-09-18, vom
Architekten weitergegeben; CC kann sie nicht prüfen.**

#### (d) DIE ÜBRIGEN LIVE-SCHRITTE

**Bestanden laut Owner: die Schritte 1, 7 und 9 bis 12** — die Regression der unberührten
Seite, der eigene Sachtext auf der Live-Seite, das Leeren des Feldes zurück auf unseren
Satz, die Verweigerung bei ungültiger Eingabe, der Widerruf und das echte Handy.
**SCHRITT 10 IST MIT EINEM TEXT ÜBER 300 ZEICHEN GEFAHREN** — also gegen die gesetzte
Grenze, nicht gegen die gemessene Kante.
**DER HANDY-SCHRITT LIEF AUF `unbekanntes-projekt-3jnjz9`**, nicht auf `meta-test-5nlm3e`:
Jene Seite trägt ein `<meta name="viewport">`, diese nicht (Vorrat P11.13-8) — auf ihr misst
der Schritt den Vorrats-Eintrag statt der Scheibe.
**BROWSER: Chrome auf dem Desktop; das Handy laut Owner.** **Firefox und WebKit sind an
keiner Achse dieser Scheibe gemessen.**

#### (e) DIE ZAHLEN DES BAUS

**DIE VIER GATES:** `vitest run` **von 1 857 auf 1 882 Tests** bei 85 → **86** Dateien
(+25 Läufe, +1 Datei). Die 1 857 sind GEMESSEN in einem vollen Lauf **vor dem ersten Eingriff
in `src/`** — **nicht über `git stash`** (Vorrat P11.13-7). `tsc --noEmit` exit 0 · `lint`
0 errors / 1 warning (die vorbestehende in `consent.test.ts`) · `build` Compiled successfully.
Alle vier nach der Korrektur auf N = 300 erneut gefahren, mit unveränderten 1 882.

**DIE TRAGENDE INVARIANTE S1 IST EINGELÖST — ZWANZIG WERTE VORHER UND NACHHER IDENTISCH**
(GEMESSEN, CC, 2026-09-18, `diff` über beide Wertelisten leer, viermal gefahren: nach dem
Bau, nach dem Eintragen von N = 416, nach der Zeilenenden-Reparatur, nach der Korrektur auf
300): die **neunzehn** Werte aus VERMERK P11.13-6 (zwölf Blockwerte, sieben Ausgabetexte
einschliesslich des Aus-Falls) **plus** die Ausgabe von `buildMetaRuntime` mit einer
**numerischen** Pixel-ID (6 365 Bytes, `f6ed3535e825`).
**DIE QUERPROBE DER VORHER-WERTE HAT GEHALTEN:** Die zwölf basis-unabhängigen Werte stimmen
zeichengleich mit VERMERK P11.13-6; die sieben Ausgabetexte weichen um **genau 71 Bytes** ab,
an allen sieben identisch — dieselbe Konstante, die jener Vermerk für den Unterschied der
zwei Basis-HTML nennt. Das Basis-HTML ist byte-genau rekonstruiert (**249 Bytes**, sha256
`38b3eee3cf1b16ef…`).

**DER PFLICHT-PARAMETER WAR COMPILER-GEFÜHRT: `tsc` meldete 73 Aufrufstellen namentlich** —
`pageview-emitter.test.ts` 13 · `…resend.test.ts` 2 · `consent-bar.test.ts` 11 ·
`consent-modal.test.ts` 19 · `consent-revoke.test.ts` 23 · `consent-setter.test.ts` 1 ·
`consent-store.test.ts` 4. Keine konnte übersehen werden.

**DIE PROBE** (Playwright/Chromium, `file://` im Scratchpad, echter Ausgabetext über
`injectPageViewEmitter` mit dem Sachtext als echtem Argument; Probeseite mit Link, Knopf und
Feld ausserhalb des Dialogs — Auflage Vorrat P11.13-4 — und mit Viewport-Tag; Fehler-Listener
VOR dem Lauf registriert; `.playwright-mcp/` vorher als ignoriert geprüft):

- **VIERZEHN AUSBRUCHSLÄUFE, je mit Kontrolle daneben:** vier Nutzlasten × zwei Formen als
  Sachtext, dazu vier als Pixel-ID. **`window.__AUSBRUCH` in KEINEM Lauf gesetzt** · **die
  Zahl der Script-Elemente in JEDEM Lauf die der Kontrolle** (7 beim Sachtext, 2 bei der
  Pixel-ID) · **null `<img>`** · Leiste bzw. Fenster steht mit drei Knöpfen · **der Text
  steht wörtlich im Schattenbaum** · das Wiring läuft · **null `pageerror`**.
- **VIERZIG GEOMETRIE-ZUSTÄNDE** bei Länge 416: 5 Viewports × 2 Formen × 2 Extreme × ein-
  und ausgeklappt. **P11.13-3: 40/40** · **P11.13-5: 40/40**, `wegTeiltMit` durchgehend 0,
  Breiten durchgehend 160/160, Reihen über vertikale Überlappung · **P11.13-4: 20/20**,
  Fokus auf `INPUT:checkbox` im eigenen Host, `scrollY` unverändert · **null ungefangene
  Fehler**.
- **VORRAT P11.13-6 IST NICHT BERÜHRT:** Ein `wegTeiltMit === 1` trat in keinem der 40
  Zustände auf. Der Eintrag beschreibt den Fall MIT Seiten-Scrollbalken; die Probeseite
  scrollt nicht. **Weder bestätigt noch widerlegt.**

**N — DIE KANTE UND DIE SETZUNG SIND ZWEI DINGE:**
- **GEMESSENE KANTE: 416 Codepunkte** (CC, 2026-09-18, 360×480, Chromium). **417 verletzt
  P11.13-3** — beim **Fenster**, Wechseltext, **ausgeklappt**: `scrollHeight` 495 gegen
  `clientHeight` 446, der letzte Knopf liegt ausserhalb des Sichtfensters.
- **DAS FENSTER BINDET, NICHT DIE LEISTE — UND DAS WIDERLEGT DIE ERWARTUNG DES ZUSCHNITTS.**
  Erwartet war die Leiste, weil sie kein `overflow` und kein `max-height` trägt und nach oben
  wächst. Bei 416 steht sie bei `top` 112,69 mit Luft; das Fenster steht an seinem Deckel
  (Höhe 448 bei `top` 16) und bekommt einen INNEREN Scrollbereich. **Der ist nicht der
  Schutz, sondern die Ursache:** Er hält das Fenster klein und schiebt dafür ein
  Bedienelement aus dem Blick.
- **GESETZT: 300** — ARCHITEKT-SETZUNG vom 2026-09-18, rund 28 Prozent Abstand für Schrift-
  und Browser-Varianz. **DER ABSTAND IST UNGEMESSEN**, und Firefox und WebKit sind an dieser
  Achse ungemessen.
- **NACHMESSUNG BEI 300** (CC, 2026-09-18, dieselbe Achse: 360×480, beide Formen, beide
  Zustände, beide Extreme): **acht Zustände, 0 Verletzungen von P11.13-3**, null
  `pageerror`. **`scrollHeight === clientHeight` in allen acht** — das Fenster steht bei 397
  gegen einen Deckel von 446 nicht einmal am Anschlag.

**DIE SIEBEN PFLICHT-MUTATIONEN** (je einzeln gesetzt, über die GANZE Suite gemessen,
Vorhersage als KLASSE **vor** dem Lauf, nach jeder Rücknahme `sha256sum` 4/4 OK):

| # | Gesetzt | Vorhersage (Klasse) | Ergebnis | Urteil |
|---|---|---|---|---|
| M-a | Helfer ohne `.replace` | ein `<` gelangt roh in den ausgelieferten Text, beide Betreiber-Achsen plus Publish-Weg | 7: EM1, EM4, EM5, PT-T3, L3-TXT, M3-TXT, MR1 | DECKUNG, eine Klasse; EM5 war nicht einzeln genannt und meldet dieselbe |
| M-b | Sachtext-Einsetzstelle der **Leiste** umgeht den Helfer | dieselbe Klasse, **nur** auf dem Leisten-Pfad | 2: L3-TXT, PT-T3 | DECKUNG; **Vorhersage in Form UND Zahl** — M3-TXT blieb grün |
| M-c | `hatVerbotenesZeichen` liefert immer `false` | unsichtbare Zeichen gehen durch | 4: CT-R1, CT-G, PT-T1, UI15 | DECKUNG, eine Klasse |
| M-d | Längenprüfung entfernt | Überlänge geht durch; **die Probe fängt es NICHT** | 5: CT-R1, CT-Z, CT-G, PT-T1, UI15 | DECKUNG; die angesagte Grenze hält |
| M-e | `settingsEqual`-Term entfernt | der Wert ist für `dirty` unsichtbar — reine Funktion UND Bedienweg | 2: CT-EQ, UI13 | DECKUNG; Vorhersage in Form und Zahl |
| M-f | Sachtext-Abbruch in `publishProject` entfernt | ein ungültiger Wert wird veröffentlicht | 1: PT-T1 | trifft; **PT-T1 ist ein EINZELSTÜCK** und im Kommentar als solches benannt |
| M-c + M-a | beide zusammen (Invariante S4) | **Vereinigung**, kein neuer Treffer | 11 — exakt die Vereinigung von 4 und 7 | **S4 belegt** |

**S4 IST HIER STÄRKER EINGELÖST ALS IN DER SCHEIBE 11.13c, und der Unterschied gehört
hierher:** Dort blieb M-c **allein grün**, weil das zweite Tor vorher zurückgab, und erst die
Kombination zeigte die Unabhängigkeit. **Hier fallen beide EINZELN, auf DISJUNKTEN Tests** —
weil die zwei Linien verschiedene Eingabeklassen decken: das Tor die unsichtbaren
Steuerzeichen, der Helfer das ausdrücklich ERLAUBTE `<`.

**ZWEI ABWEICHUNGEN VOM PLAN, BEIDE IM BAU-BERICHT DEKLARIERT:**
1. **Die verbotenen Codepunkte stehen in `settings.ts` als ZAHLEN, nicht als
   Unicode-Escapes** — Grund unter (f).
2. **`consentTextProblem` ist neu gegenüber dem Plan.** Die Oberfläche muss den GRUND
   anzeigen; ohne diese Funktion gäbe es dafür eine zweite, gleichlautende Bedingung, die
   still auseinanderliefe. **Sie erzeugt keinen geprüften Typ** — die Zahl EINS aus
   P11.13-17 ist unberührt, `CT-A1` hält sie.
**UND EINE AN EINEM WÄCHTER:** Die geplante Zusicherung von `MR1` („kein `<` in der
Laufzeit") wäre **falsch** gewesen — die Basis-Laufzeit trägt selbst EIN `<`, einen
**Vergleichsoperator**. Ein Test darauf hätte den Code umgebaut, um sich selbst zu
befriedigen (docs/immer-beachten.md, EIN WÄCHTER ÜBER ZEICHEN DARF DIE GESTALT DES
GEPRÜFTEN NICHT BESTIMMEN). Gemessen wird stattdessen der **Beitrag** der Pixel-ID.

**EIN BEFUND AUS `UI15`, IM LAUF SELBST GEFANGEN:** Ein einzeiliges `input[type="text"]`
**entfernt Zeilenumbrüche aus seinem `value`** — der gespeicherte Wert trägt das
Steuerzeichen, das Feld zeigt „ab". **Der Betreiber sieht das unsichtbare Zeichen also
nicht**, und der rote Hinweis ist das Einzige, was den Zustand erklärt. Der Test hält den
gemessenen Zustand, nicht den erwarteten.

#### (f) DREI STILLE SCHREIBSCHÄDEN — UND ALLE VIER GATES WAREN DABEI GRÜN

Sie stehen hier als harte Angaben, weil sie **die Fehlerklasse dieser Scheibe ausserhalb
ihres Gegenstands** sind und **kein Gate sie gemeldet hat**:

1. **DOKU-RUNDE, FÜNFMAL:** Ein Unicode-Escape für das Kleiner-Zeichen, in einem Code-Span
   geschrieben, stand danach als ZEICHEN in der Datei — dreimal im Rumpf von Entscheidung
   P11.13-25, zweimal in VERMERK P11.13-7, Punkt (b). Sätze wie „danach jedes `<` als `<`"
   waren die Folge.
   GEMESSEN (CC, 2026-09-18): `grep -c 'u003c'` fand **6** Vorkommen, **alle** in der Form
   mit doppeltem Backslash — **kein einziges** in der geschriebenen. **WAS TRÄGT:** die
   QUELLFORM mit doppeltem Backslash, im selben Lauf gegengeprüft.
2. **BAU-RUNDE, TESTDATEI:** In `src/lib/script-embed.test.ts` sind U+2028, U+2029 und
   `\u{1F600}` **still in ihre Zeichen verwandelt** worden — danach stand ein **roher
   Zeilentrenner in einem String-Literal**, also genau das unsichtbare Zeichen, das das Tor
   dieser Scheibe verbietet. GEMESSEN und behoben durch `String.fromCharCode` bzw.
   `String.fromCodePoint`; Nachmessung: **0 rohe Sonderzeichen**. **DAS IST DER GRUND,
   WARUM DIE VERBOTENEN CODEPUNKTE IN `settings.ts` ALS ZAHLEN STEHEN** — bei U+0000 wäre
   das Ergebnis ein NUL-Byte in einer Quelldatei gewesen.
3. **BAU-RUNDE, `PublishView.tsx` (`w/crlf`):** Beim Einfügen entstanden **ein `\r\r\n` und
   ein einzelnes `\n`**. Folge: `git ls-files --eol` meldete **`w/-text`** — git hielt die
   Datei für **binär** —, und `git diff --stat` zeigte **1 494 geänderte Zeilen statt 83**.
   **`tsc`, `lint`, `vitest` und `build` waren dabei durchgehend grün.** Gefunden hat es
   allein die Byte-Kontrolle; behoben byte-genau, Endzustand `w/crlf` mit CR = LF = 787.
   **DAS IST DIESELBE FEHLERKLASSE WIE VORRAT P11.13-7** (`git stash` dreht die Zeilenenden
   einer `w/crlf`-Datei), an einem anderen Werkzeug.

**BYTE-KONTROLLE AM COMMITTETEN OBJEKT** für die zwei neuen Dateien — bei ihnen sind
`git status` und der Rücknahme-Nachweis blind (docs/immer-beachten.md, EIN NACHWEIS AN EINER
NEUEN DATEI IST BLIND): `git show HEAD:<pfad> | tr -dc …` ergibt für beide **CR = 0 und
NUL = 0**, Positivkontrolle des Instruments im selben Lauf **CR = 1, NUL = 1**. Und das
Escape selbst im Objekt, `od -c`: `… , " \ \ u 0 0 3 c " ) ;` — **zwei Backslash-Bytes**.

PROVENIENZ: Bau-Commit, Dateizahlen, Gates, Testzahlen, die zwanzig Byte-Werte, sämtliche
Probe- und Mutationswerte, die Kante 416, die Nachmessung bei 300 und die drei
Schreibschäden sind GEMESSEN am Repo bzw. am eigenen Lauf (CC, 2026-09-18). Die Setzung 300
ist ARCHITEKT-ENTSCHEIDUNG desselben Tages; **der Abstand ist ungemessen.** **Sämtliche
Live-Angaben — (a) ohne die Querprobe der sechs Blockwerte, (b), (c) und (d) — sind
OWNER-MESSUNGEN bzw. OWNER-ANGABEN vom 2026-09-18, vom Architekten weitergegeben; CC kann
sie nicht prüfen.** Die Querprobe an `Vorher_aus.html` ist eine ARCHITEKT-PRÜFUNG desselben
Tages. Der Abgleich der sechs Blockwerte gegen VERMERK P11.13-6 und die eigene Vorher-Liste
ist GEMESSEN (CC, 2026-09-18).

### VERMERK P11.13-9 — Aufklärung 11.13e (DIE SPRACHE), 2026-09-18

**KEIN BAU-COMMIT, UND DER GRUND STEHT HIER:** Es war eine READ-ONLY-Aufklärung ohne
Änderung am Repo (docs/arbeitsweise.md, "Die Standdatei", Absatz "Ein Vermerk trägt den
Hash seines Code-Commits"). Der Arbeitsbaum war vorher und nachher sauber; die einzigen
Schreibvorgänge lagen im Scratchpad ausserhalb des Repos. **KEIN BROWSER-WERKZEUG, KEINE
ABLAGE `.playwright-mcp/`, KEINE PROBE** — anders als bei den Aufklärungen P11.13-1 und
P11.13-3 und wie bei P11.13-5. Der Stand, auf dem gemessen wurde, ist `80dd45a`.

**DAS INSTRUMENT:** Vite `createServer` + `ssrLoadModule` gegen das Repo, gefahren aus dem
Scratchpad — **die echten Funktionen, nicht nachgebaut**: `buildConsentBarScript`,
`buildConsentModalScript`, `embedInScript` und die elf Konstanten selbst. Dazu
Achsen-Suchen über `src/` und `docs/`, je mit Positivkontrolle.

#### (a) ELF TEXTPLÄTZE, NICHT ZEHN — UND DAS IST DER TRAGENDE BEFUND DIESER RUNDE

Der Backlog-Eintrag 11.5f zählt **zehn** (GEMESSEN, CC, 2026-09-16), und Roadmap (c) 5 wie
Entscheidung P11.13-24 rechnen mit dieser Zahl. **`CONSENT_WAY_LABEL` IST MIT DER SCHEIBE
11.13a (`bb9f045`) DAZUGEKOMMEN** und steht in keiner der drei Aufzählungen. **ES SIND
ELF** (GEMESSEN, CC, 2026-09-18; VERMERK P11.13-7, Punkt (d), zählt bereits elf und war bis
heute die einzige Stelle, die es tut). Länge in **Unicode-Codepunkten**:

| # | Symbol | Datei | Länge | Owner-Freigabe VOR O6 (Fundstelle) |
|---|---|---|---|---|
| 1 | `CONSENT_TEXT` | `tracking/consent-choice.ts` | 79 | **JA** — 11.5d, der Sachtext |
| 2 | `CONSENT_ACCEPT_LABEL` | `consent-choice.ts` | 16 | **NEIN** |
| 3 | `CONSENT_SAVE_LABEL` | `consent-choice.ts` | 17 | **JA** — F2 der Scheibe 11.5e-1 |
| 4 | `CONSENT_REJECT_LABEL` | `consent-choice.ts` | 8 | **JA** — 11.5d, bindende Entscheidung (12) der Phase 11.5 |
| 5 | `CONSENT_WAY_LABEL` | `consent-choice.ts` | 13 | **NEIN** — gesetzt in Plan-Frage 4 des Zuschnitts 11.13a; der Wortlaut selbst ist dort nicht eigens freigegeben |
| 6 | `CONSENT_GROUPS_LABEL` | `consent-choice.ts` | 8 | **JA** — F3 der Scheibe 11.5e-1 |
| 7 | `CONSENT_GROUP_MEASURE_LABEL` | `consent-choice.ts` | 7 | **JA** — F1 der Scheibe 11.5e-1 |
| 8 | `CONSENT_GROUP_ADS_LABEL` | `consent-choice.ts` | 7 | **JA** — F1 der Scheibe 11.5e-1 |
| 9 | `CONSENT_BAR_REGION_LABEL` | `tracking/consent-bar.ts` | 12 | **NEIN** |
| 10 | `CONSENT_MODAL_DIALOG_LABEL` | `tracking/consent-modal.ts` | 12 | **NEIN** |
| 11 | `CONSENT_REVOKE_WARNING` | `tracking/consent-revoke.ts` | 142 | **JA** — G6 der Scheibe 11.5e-2 |

**DIE ZWEITE ZÄHL-DIVERGENZ, kleiner und mit derselben Ursache:** Der Backlog sagt "SECHS
DER ZEHN SIND OWNER-FREIGABEN (F1 bis F3 der Scheibe 11.5e-1, G6 der Scheibe 11.5e-2, der
Sachtext und 'Ablehnen' aus 11.5d)". Das sind sechs **Freigabe-Posten**, aber **F1 deckt
ZWEI Konstanten** — "Messung" und "Werbung" (GELESEN,
docs/claude-history/phase-11.5-einwilligung.md, Zeile 1083). **JE KONSTANTE GEZÄHLT SIND ES
SIEBEN VON ELF.** Ohne O6 blieben vier Plätze ohne Freigabe: Nr. 2, 5, 9 und 10.

**ACHSE DER FREIGABE-PRÜFUNG** (GEMESSEN, CC, 2026-09-18):
`(F|G)[1-9] .{0,3}(„|")(Messung|Werbung|Auswahl speichern|Bereiche|Ablehnen|Alle akzeptieren|Einstellungen)`
über docs/aktiver-stand.md, docs/roadmap.md und das Archiv der Phase 11.5 — **EIN Treffer**
(Zeile 1083, F1 bis F3); er ist zugleich die Positivkontrolle. **Für "Alle akzeptieren" und
"Einstellungen" kein Treffer.**

#### (b) DIE WÄCHTER JE PLATZ — UND DER EINE PLATZ OHNE

GELESEN am Testtext (CC, 2026-09-18). Genannt ist, wer den Wortlaut **wörtlich** hält:

| Platz | Wächter |
|---|---|
| `CONSENT_TEXT` | `L13` · `M5` · `UI12` (als `placeholder`) · `PT6` (Abwesenheits-Behauptung) · `EM2`/`EM3` |
| `CONSENT_ACCEPT_LABEL` | `L5` · `L19` · `L20` · `M5` · `M20` · `M21` · `W16` · `W17` · `EM3` |
| `CONSENT_SAVE_LABEL` | `L5` · `L19` · `L20` · `M5` · `M20` · `M21` · `W16` |
| `CONSENT_REJECT_LABEL` | `L5` · `L13` (Positivkontrolle) · `L19` · `L20` · `M5` · `M20` · `M21` · `W16` · `W17` |
| `CONSENT_WAY_LABEL` | `L19` · `L20` · `L21` · `M20` · `M21` · `M22` · `W16` · `W17` |
| `CONSENT_GROUPS_LABEL` | `L13` · `L15` · `M5` · `M16` |
| `CONSENT_GROUP_MEASURE_LABEL` | `L15` · `L16`(×4) · `L17` · `L18` · `M16` · `M17`(×4) · `M18` · `W14` |
| `CONSENT_GROUP_ADS_LABEL` | `L15` · `L16`(×4) · `L17` · `M16` · `M17`(×4) · `M18` · `W14` |
| **`CONSENT_BAR_REGION_LABEL`** | **KEINER** |
| `CONSENT_MODAL_DIALOG_LABEL` | `M5` (`consent-modal.test.ts:322`) |
| `CONSENT_REVOKE_WARNING` | `W9` (`consent-revoke.test.ts:411`, Literal `WARNUNG` in Zeile 56) |

**`CONSENT_BAR_REGION_LABEL` HAT KEINEN WÄCHTER, UND DAS IST EINE ASYMMETRIE ZUM MODAL:**
`M5` hält `aria-label` = "Einwilligung" am Fenster; `L13` prüft an derselben Stelle der
Leiste nur `role="region"` und die Kinderliste. **Wer diesen Wortlaut ändert, macht nichts
rot.** GEMESSEN (CC, 2026-09-18, Achse `"Einwilligung"` als Literal über `src/`: drei
Treffer — zwei Konstanten-Definitionen und `consent-modal.test.ts:322`; Positivkontrolle:
dieselbe Achse auf `"Bereiche"` findet fünf Zusicherungen).

**EINE FALLE FÜR JEDE SPÄTERE ZÄHLUNG:** Die rund dreissig Treffer auf `/Einstellungen/` in
`CodeImporter.test.tsx` öffnen den **Einstellungs-Drawer des Editors** (`⚙ Einstellungen`)
und **nicht** den Weg im Dialog. Wer sie mitzählt, hält `CONSENT_WAY_LABEL` für vielfach
gedeckt.

#### (c) DIE BYTE-AUSGANGSWERTE UND DER TEXTANTEIL

GEMESSEN (CC, 2026-09-18, echte Funktionen, **Tag-Form**, Darstellung `{theme:"light"}`,
Sachtext `"standard"`). **Die vier Werte sind zeichengleich mit den VERMERKEN P11.13-3, -4,
-6 und -8** — sie sind über vier Scheiben stabil:

| Block | Bytes | eingebettete Texte (in ihrer `embedInScript`-Form) | Anteil |
|---|---|---|---|
| Leiste, Lade-Zweig | **4 603** | 185 (acht gemeinsame 171 + Region-aria 14) | **4,02 %** |
| Leiste, Widerruf-Zweig | **4 918** | 329 (185 + Warnung 144) | **6,69 %** |
| Fenster, Lade-Zweig | **5 051** | 185 (171 + Dialog-aria 14) | **3,66 %** |
| Fenster, Widerruf-Zweig | **5 366** | 329 | **6,13 %** |

Je Konstante, eingebettet: `CONSENT_TEXT` 81 · `CONSENT_ACCEPT_LABEL` 18 ·
`CONSENT_SAVE_LABEL` 19 · `CONSENT_REJECT_LABEL` 10 · `CONSENT_WAY_LABEL` 15 ·
`CONSENT_GROUPS_LABEL` 10 · `CONSENT_GROUP_MEASURE_LABEL` 9 · `CONSENT_GROUP_ADS_LABEL` 9 ·
`CONSENT_BAR_REGION_LABEL` 14 · `CONSENT_MODAL_DIALOG_LABEL` 14 · `CONSENT_REVOKE_WARNING`
144.

#### (d) DIE KOSTEN EINER AUTOMATIK — GEMESSEN, DAMIT DIE ENTSCHEIDUNG EINE ZAHL HAT

Eine Wahl zur LAUFZEIT nach `navigator.language` verlangt **beide** Tabellen im
ausgelieferten Text. **DAS KOSTET RUND +185 BYTES JE LADE-BLOCK UND +329 JE WIDERRUF-BLOCK**
— unter 7 Prozent —, **plus den Verzweigungs-Code, der nicht gemessen ist.** Zum Vergleich
aus VERMERK P11.13-4: die Tabellen-Themen kosten +329 (`dark`) bzw. +366 (`auto`) je Block.
**DIE BYTES SIND ALSO NICHT DAS ARGUMENT** — das Argument steht in Entscheidung P11.13-35.

**`navigator.language` BERÜHRT I1 NICHT, UND DAS IST AM WORTLAUT GEPRÜFT:** I1 verbietet
fünf Achsen der **Veränderung an einem fremden KNOTEN**; `navigator` ist kein Knoten und
würde gelesen, nicht verändert. **KEINE DER ZEHN NADELN VON `M12` TRIFFT `navigator`**
(GELESEN, `consent-modal.test.ts`, CC, 2026-09-18).

#### (e) DIE `documentElement`-NADEL UND DIE ASYMMETRIE ZWISCHEN L12 UND M12

**`M12` FÜHRT ALS ERSTE NADEL `/documentElement/`** (`consent-modal.test.ts`, mit dem
Positivkontroll-Beispiel `document.documentElement.setAttribute('x', '1')`). Sie sieht
**Zeichen, nicht Bedeutung** und träfe deshalb auch einen reinen **Lesezugriff** wie
`document.documentElement.lang`. **`L12` TRÄGT KEINE NADELN** — nur die Textprüfung
`/overflow/i` (GEMESSEN am Testtext, CC, 2026-09-18).
**FOLGE, UND SIE IST EINE GEBAUTE ASYMMETRIE: DIESELBE ZEILE WÄRE IM FENSTER ROT UND IN DER
LEISTE GRÜN.** Das ist die Fehlerklasse "EIN WÄCHTER ÜBER ZEICHEN DARF DIE GESTALT DES
GEPRÜFTEN NICHT BESTIMMEN" (docs/immer-beachten.md) — sie ist hier **nicht eingetreten**,
weil niemand das versucht hat, und sie ist der Grund, warum Entscheidung P11.13-36 das
`lang`-Attribut **im Schattenbaum** setzt und nicht an `documentElement` liest.

#### (f) HEUTE TRÄGT DER DIALOG KEIN `lang`-ATTRIBUT, UND NICHTS LIEST EINE SPRACHE

**NICHT-TREFFER MIT BENANNTER ACHSE** (GEMESSEN, CC, 2026-09-18): Achse
`navigator\.language|documentElement\.lang|\blang\b|locale|i18n|hreflang|translat`,
case-insensitiv, über `consent-choice.ts`, `consent-bar.ts`, `consent-modal.ts`,
`consent-revoke.ts`, `consent-store.ts`, `consent-setter.ts`, `pageview-emitter.ts`,
`meta.ts` **und die neue `script-embed.ts`** — **EIN Treffer, und er ist keiner:**
`transform:translate(-50%,-50%)` in `CONSENT_MODAL_CSS`. **POSITIVKONTROLLE im selben Lauf:**
dieselbe Achse trifft `<html lang="de">` in `src/lib/hosting/blocked-page.ts` und
`lang="en"` in `src/app/layout.tsx`.
**DAMIT IST DER SPRACH-NICHT-TREFFER DES BACKLOG-EINTRAGS 11.5f (CC, 2026-09-16) AM HEUTIGEN
BESTAND BESTÄTIGT** — und um `script-embed.ts` und `CONSENT_WAY_LABEL` erweitert.

**DER EIGENE SACHTEXT GEWINNT HEUTE IMMER, UND KEINE STELLE KENNT SEINE SPRACHE:** An der
Einsetzstelle steht in beiden Erzeugern zeichengleich
`const text = sachtext === "standard" ? CONSENT_TEXT : sachtext;`
(`consent-bar.ts`, `consent-modal.ts`). Das Tor `readConsentText` prüft Zeichenklassen und
Länge, **keine Sprache**. `PublishView.tsx` zeigt `placeholder={CONSENT_TEXT}` — also heute
unbedingt den deutschen Satz.

**DIE GRENZEN DIESER AUFKLÄRUNG — ausdrücklich:**
- **KEINE PROBE, KEIN BROWSER, KEINE LIVE-SEITE.** Alle Aussagen über Geometrie sind am CSS
  ABGELESEN und nicht gemessen.
- **Ob eine englische Beschriftung den Umbruch bei 360 px verschiebt, ist NICHT
  entscheidbar** — die Testumgebung wertet kein CSS aus, und es gibt keine
  wiederverwendbare Probe im Repo (VERMERK P11.13-5).
- **Die Kosten des Verzweigungs-Codes einer Automatik sind UNGEMESSEN** — gemessen sind
  allein die Textbytes.
- **Nur Chromium war je an diesem Gegenstand gemessen**, und in dieser Runde gar kein
  Browser.

PROVENIENZ DIESES VERMERKS: sämtliche Angaben GEMESSEN bzw. GELESEN am Repo (CC,
2026-09-18, auf `80dd45a`); die vier Blockwerte und die Textanteile GEMESSEN am eigenen Lauf
desselben Tages über die echten Funktionen. **KEINE Live-Angabe, KEINE Owner-Angabe, KEINE
Browser-Messung in diesem Vermerk.** Dass ein Verzweigungs-Code einer Automatik weitere
Bytes kostete, ist eine ABLEITUNG und ungemessen.

### VERMERK P11.13-10 — Scheibe 11.13e, DIE SPRACHE, abgeschlossen 2026-09-18

**GEGENSTAND:** Der Betreiber wählt die Sprache des Einwilligungs-Dialogs — Deutsch oder
Englisch. Alle **elf** Textplätze folgen der Wahl; die Wortlaute stehen als Konstanten im
Repo und tragen Owner-Freigaben (Entscheidung P11.13-31). Dazu das `lang`-Attribut an
`.bar` bzw. `.dialog` und die **Hülle** statt eines dritten Parameters.

**BAU-COMMIT:** `0a2dc7b` — `feat(consent): Sprache Deutsch/Englisch fuer den
Einwilligungs-Dialog (11.13e)`, gepusht (`9da8129..0a2dc7b  main -> main`). **21 Dateien,
1 714 Zeilen hinzu, 270 entfernt**, darunter die zwei NEUEN
`src/lib/tracking/consent-texts.ts` (274 Zeilen) und `src/lib/tracking/consent-texts.test.ts`
(160) — GEMESSEN am Repo (`git log -1 --stat`, CC, 2026-09-18). **`docs/aktiver-stand.md`
ist NICHT im Bau-Commit** — der Doku-Nachzug jenes Tages steht als `583999a` daneben.

#### (a) DER DIFFERENZ-NACHWEIS IST LIVE BESTÄTIGT — SECHS BLOCKWERTE, ZEICHENGLEICH

**INSTRUMENT:** das Konsolen-Skript aus VERMERK P11.13-6, Punkt (c), **Tag-Form**.
**ORT:** `meta-test-5nlm3e.publayer.net`, **nach dem Deploy neu veröffentlicht**, Sprache
**Deutsch**.

| Zustand | Block | Bytes | sha256 (12) |
|---|---|---|---|
| Leiste hell | `__ps_clb` | 4 637 | `ecb98e60724a` |
| Leiste hell | `__ps_crv` | 4 952 | `f7685cc9e2dd` |
| Leiste dunkel | `__ps_clb` | 4 966 | `d558cfa54855` |
| Leiste dunkel | `__ps_crv` | 5 281 | `90ee6c9219ef` |
| Fenster hell | `__ps_cmo` | 5 088 | `f91fd4024899` |
| Fenster hell | `__ps_crv` | 5 403 | `d09a7b8d7400` |

**ALLE SECHS SIND ZEICHENGLEICH MIT DEN LOKAL ERHOBENEN NACHHER-WERTEN DES BAUS** — Bytes
UND sha256, sechs von sechs (GEPRÜFT gegen die Differenz-Nachweis-Tabelle des Bau-Berichts,
CC, 2026-09-18).

**DAS IST DIE TRAGENDE AUSSAGE DIESES VERMERKS, und sie ist mehr als ein Byte-Vergleich:**
Der Differenz-Nachweis (Invariante Q1) ist im Bau LOKAL geführt worden — jeder deutsche
Blockwert ist der Wert davor **plus genau die `lang`-Zeile, sonst kein Zeichen**. Die sechs
Live-Werte sind zeichengleich mit genau jenen Nachher-Werten. **DAMIT IST DER
DIFFERENZ-NACHWEIS AN EINER ECHTEN AUSGELIEFERTEN SEITE VERANKERT**, für beide Formen, beide
Zweige und zwei Tabellen-Darstellungen.
**WAS ER NICHT BELEGT:** „automatisch" (live nicht gesichert, so zugeschnitten) und die
eigenen Farben (nicht Gegenstand dieser Scheibe).

#### (b) DIE REGRESSION — DER AUS-FALL UND DAS WIRING ÜBER DEN 11.13e-DEPLOY

| Block | Bytes | sha256 (12) | gegen |
|---|---|---|---|
| `pagesmith-consent` | 790 | `854831d25209` | VERMERK P11.13-8 (b) — zeichengleich |
| `pagesmith-mappings` | 210 | `dba4fe81d9b9` | ebenda — zeichengleich |
| Wiring (Index 2, `id` „-") | 12 251 | `a3529b57452b` | ebenda — zeichengleich, **in jedem Lauf** |
| `__ps_pve` (Dialog aus) | 806 | `72d1ef626bcf` | ebenda — zeichengleich |

**DAMIT IST DER AUS-FALL ÜBER DEN 11.13e-DEPLOY LIVE BELEGT** — Invariante Q2 an der echten
Seite, nicht nur lokal über `T-OFF` und `T-OFF-LANG`.

**DREI WEITERE BLÖCKE SIND GEMESSEN WORDEN UND STANDEN VORHER IN KEINER DATEI DIESES
REPOS** — sie sind damit **NEUE** Werte und keine Regression gegen einen aufgeschriebenen
Vorher-Wert (GEMESSEN am Dateitext, CC, 2026-09-18, Achse über die drei Zahlen und die drei
Hashes: kein Treffer; Positivkontrolle: dieselbe Achse findet die vier Werte der Tabelle
darüber). **DAS IST DER GRUND, WARUM CC SIE NACHGEMESSEN HAT**, und das Ergebnis trennt sie
scharf:

| Block | Bytes | sha256 (12) | von CC lokal bestätigt? |
|---|---|---|---|
| `__ps_cnr` | 2 377 | `d6c2549a0938` | **JA, zeichengleich** — und **schlüssel-unabhängig** (vier Schlüssellängen, identisches Ergebnis) |
| `__ps_cns` | 244 | `9ae9ab265018` | **JA, zeichengleich** — ebenfalls schlüssel-unabhängig |
| `__ps_pve` (Dialog an) | 840 | `302f39c1a883` | **NEIN** — dieser Block ist **schlüssel-abhängig** (lokal 812 / 819 / 820 / 836 Bytes bei 8 / 15 / 16 / 32 Zeichen). 840 ist ohne den echten Schlüssel nicht nachzubilden |

**EINE ABWEICHUNG, DIE KEINE IST, UND SIE GEHÖRT HIERHER:** Lokal misst der Gate-Block
`pagesmith-consent` über `injectPageViewEmitter` **792 / `5282ddbfacbb`**, live steht dort
**790 / `854831d25209`**. **DAS IST DER BEKANNTE OFFENE PUNKT „DER CONSENT-GATE-BLOCK HAT
ZWEI ERZEUGER — UND SIE LAUFEN BEREITS AUSEINANDER"** (docs/offene-punkte.md): Der
ausgelieferte Gate-Block der Live-Seite kommt über `generateFunctional`, nicht über
`injectPageViewEmitter`. Die Divergenz ist damit nicht neu, nicht von dieser Scheibe erzeugt
und in ihrer Grösse (zwei Bytes, reine Hülle) genau das, was jener Punkt als harmlos führt.
**DER LIVE-WERT IST TROTZDEM UNVERÄNDERT** — das ist die Aussage, die zählt, und sie ist ein
Vergleich zweier OWNER-Messungen, nicht eine Bestätigung durch CC.

#### (c) DIE SPRACHE — WAS LIVE GEPRÜFT IST

- **ENGLISCH, ALLE TEXTE.** Owner-Screenshots der Leiste, eingeklappt und ausgeklappt:
  `Accept all` · `Reject all` · `Settings` · der englische Sachtext · `Analytics` ·
  `Advertising` · `Save selection`.
- **`lang = "en"` AN `.bar`** — vom Owner in der Konsole abgelesen.
- **DER EIGENE SACHTEXT BLEIBT BEI SPRACHE ENGLISCH.** Das ist die zugesagte Wirkung von
  Entscheidung P11.13-34 und ausdrücklich kein Fehlschlag: Zehn Texte wechseln, der elfte —
  der vom Betreiber geschriebene — nicht.
- **EIN GELEERTES FELD ZEIGT DEN ENGLISCHEN STANDARDSATZ.**
- **DER WIDERRUF IST ENGLISCH, SAMT ENGLISCHER KONSOLEN-WARNUNG.**
- **DIE FENSTER-FORM IST ENGLISCH.**
- **DAS ECHTE HANDY IST BESTANDEN — auf `unbekanntes-projekt-3jnjz9`**, nicht auf
  `meta-test-5nlm3e`: Jene Seite trägt ein Viewport-Tag, diese nicht (Vorrat P11.13-8); auf
  `meta-test-5nlm3e` misst der Schritt den Vorrats-Eintrag statt der Scheibe.
- **BROWSER: Chrome auf dem Desktop; das Handy laut Owner.** **Firefox und WebKit sind an
  keiner Achse dieser Scheibe gemessen.**

**SÄMTLICHE ANGABEN IN (a), (b) UND (c) SIND OWNER-MESSUNGEN bzw. OWNER-ANGABEN vom
2026-09-18, vom Architekten weitergegeben; CC KANN SIE NICHT PRÜFEN.** Die zwei Ausnahmen
sind ausdrücklich benannt: der Abgleich der sechs Blockwerte gegen die eigene
Differenz-Nachweis-Tabelle und die lokale Nachmessung von `__ps_cnr` und `__ps_cns` — beides
GEMESSEN (CC, 2026-09-18).

#### (d) DIE ZAHLEN DES BAUS

**DIE VORHER-WERTE UND IHRE QUERPROBE:** zwanzig Werte vor dem ersten Eingriff in `src/`,
Basis-HTML aus VERMERK P11.13-6 (d) byte-genau rekonstruiert (249 Bytes, sha256
`38b3eee3cf1b16ef…`). **QUERPROBE DER ZWÖLF BLOCKWERTE GEGEN DIE VERMERKE P11.13-8, -6 UND
-4: 12/12 zeichengleich.** Zwei weitere Querproben gingen auf: `buildMetaRuntime` numerisch
**6 365 / `f6ed3535e825`** wie in P11.13-8 (e), und `out off` **1 826** = 1 897 − 71, also
exakt die 71-Byte-Konstante des Basis-HTML-Wechsels aus P11.13-6 (d).

**DER DIFFERENZ-NACHWEIS, 18/18** — je Wert fünf Schritte: vorher erheben, nachher erheben,
die `lang`-Zeile **genau einmal** (Blöcke) bzw. **genau zweimal** (Ausgabetexte) zählen, sie
entfernen und Bytes **und** sha256 gegen den alten Wert halten, und eine Positivkontrolle,
dass ohne die Entfernung ein Unterschied bestünde.

| Klasse | Zahl | Delta |
|---|---|---|
| Blockwerte Leiste (2 Zweige × 3 Darstellungen) | 6 | **+34 B** |
| Blockwerte Fenster (2 Zweige × 3 Darstellungen) | 6 | **+37 B** |
| Ausgabetexte `bar` (3 Darstellungen) | 3 | **+68 B** (2× `lang`) |
| Ausgabetexte `modal` (3 Darstellungen) | 3 | **+74 B** (2× `lang`) |
| **`out off`** | 1 | **0 — ZEICHENGLEICH** |
| **`buildMetaRuntime` numerisch** | 1 | **0 — ZEICHENGLEICH** |

**DIE PROBE: 40 ZUSTÄNDE** (2 Formen × 2 Sprachen × 5 Viewports × ein- und ausgeklappt),
Playwright/Chromium über `file://`, Probeseite **mit** Viewport-Tag und **mit** einem
fokussierbaren Element ausserhalb des Dialogs, Fehler-Listener **vor** dem Lauf registriert.
**P11.13-3: 40/40** · **P11.13-5: 20/20** (`wegTeiltMit` ∈ {0, 2}, Breiten durchgehend
160/160, Reihen über vertikale Überlappung) · **`lang` und aria-Name: 40/40** · **P11.13-4:
20/20** auf einer langen Seite, Fokus auf `INPUT:checkbox` im eigenen Host und `scrollY`
400 → 400 · **ungefangene Fehler: KEINE**.
**DIE GEOMETRIE VON DEUTSCH UND ENGLISCH IST PAARWEISE IDENTISCH** — gleiche `wegTeiltMit`,
gleiche Breiten, gleiche Elementzahlen in allen fünf Viewports. Die kürzeren englischen
Beschriftungen ändern nichts, weil `min-width:160px` eine UNTERGRENZE ist; das war die
Erwartung vor dem Lauf und ist gemessen bestätigt.

**DIE SECHS PFLICHT-MUTATIONEN** (je einzeln gesetzt, über die GANZE Suite, Vorhersage als
KLASSE **vor** dem Lauf, nach jeder Rücknahme `sha256sum -c` 22/22 OK):

| # | Gesetzt | Vorhersage (Klasse) | Ergebnis | Urteil |
|---|---|---|---|---|
| Mu1 | EN-Zweig liefert einen DE-Text | falscher Wortlaut je Sprache — Tabelle, Oberfläche, Publish-Weg | 5: TX2, TX4, L26, M26, PT-L4 | DECKUNG, eine Klasse |
| Mu2 | DE-Zweig schreibt ab, **ein** Zeichen anders | stille Divergenz — TX1 **und** der Differenz-Nachweis | 8: TX1, L3-STD, L13, L26, M5, M26, UI12, UI19 — **und der Differenz-Nachweis: 18 STOPP-Fälle** | DECKUNG, eine Klasse; **die Vorhersage war ZU ENG**, alle sieben Zusatztreffer melden denselben Fehler |
| Mu3 | `lang`-Zeile der Leiste entfernt | fehlendes Attribut, nur Leisten-Pfad; **der Differenz-Nachweis fällt NICHT** (er wäre trivial wahr) | 3: L24, T10, PT-L4 | DECKUNG; M25 blieb grün wie angesagt |
| Mu4 | Abbruch 5 entfernt | ein ungültiger Wert wird veröffentlicht — Einzelstück | 1: PT-L1 | trifft; **EINZELSTÜCK bestätigt** |
| Mu5 | `settingsEqual`-Term entfernt | unsichtbar für `dirty` — reine Funktion und Bedienweg | 2: CL2, UI18 | DECKUNG; Vorhersage in Form UND Zahl |
| Mu6 | Platzhalter folgt der Sprache nicht | Editor zeigt den falschen Standard — Einzelstück | 1: UI19 | trifft; **EINZELSTÜCK bestätigt** |

**KEINE MUTATION BLIEB GRÜN. KEINE KASKADE** — jeder Zusatztreffer meldete dieselbe
Fehlerklasse.

**DIE VIER GATES:** `vitest run` **von 1 882 auf 1 906 Tests** bei 86 → **87** Dateien
(+24 Läufe, +1 Datei). Die 1 882 sind GEMESSEN in einem vollen Lauf **vor** dem ersten
Eingriff in `src/` — **nicht über `git stash`** (Vorrat P11.13-7). `tsc --noEmit` exit 0 ·
`lint` 0 errors / 1 warning (die vorbestehende in `consent.test.ts`) · `build` Compiled
successfully.

**DER UMBAU AUF DIE HÜLLE WAR COMPILER-GEFÜHRT: `tsc` meldete 89 Aufrufstellen namentlich**
— `consent-revoke.test.ts` 23 · `consent-modal.test.ts` 22 · `consent-bar.test.ts` 17 ·
`pageview-emitter.test.ts` 17 · `consent-store.test.ts` 4 · `…resend.test.ts` 2 ·
`actions.ts` 2 · `consent-setter.test.ts` 1 · `PublishView.tsx` 1. Keine konnte übersehen
werden.

**VORRAT P11.13-6 IST REPRODUZIERT UND IST KEINE REGRESSION DIESER SCHEIBE** — die Zahlen
stehen am Eintrag selbst.

#### (e) DIE BESCHRIFTUNG DES BEDIENELEMENTS IST FREIGEGEBEN

**„Sprache" · „Deutsch" · „Englisch"** — **OWNER-FREIGABE 2026-09-18**, erteilt durch
Weitergabe des Commit-Prompts ohne Einwand (ARCHITEKT-ANGABE desselben Tages).
**SIE IST APP-OBERFLÄCHE UND KEIN AUSGELIEFERTER TEXT**; sie fällt nicht unter Entscheidung
P11.13-31, und ihr Leser ist der Betreiber, nicht der Besucher. **DAMIT IST PLAN-FRAGE 5 DES
ZUSCHNITTS GESCHLOSSEN**, und der Vorbehalt in der Provenienz jenes Zuschnitts
(„owner-seitig noch nicht freigegeben") ist eingelöst.

#### (f) ZWEI WERKZEUG-BEFUNDE, BEIDE GEFANGEN — UND DER ERSTE ZEIGT EINE BLINDE PRÜFUNG

1. **NEUNUNDDREISSIG DOPPELTE CRs IN `PublishView.tsx`** (`\r\r\n`), entstanden beim
   Verschieben eines Blocks: `.replace("\n", "\r\n")` lief über eine Zeichenkette, die
   bereits CRLF trug. **DIE VORGESCHRIEBENE PRÜFUNG HAT SIE NICHT GEMELDET:** „CR == LF"
   stand auf **845 == 845** und sah in Ordnung aus — sie zählt **CRLF-PAARE**, nicht CR
   gesamt. **GEFUNDEN HAT ES ERST DER VERGLEICH CR GESAMT (884) GEGEN CRLF-PAARE (845).**
   Repariert; Endzustand CR = CRLF = LF = 849, `git ls-files --eol` unverändert `w/crlf`.
   **DAS IST DER FÜNFTE FALL DIESER KLASSE AN EINEM TAG**, und er steht am
   Hebungs-Kandidaten (2).
2. **PYTHON ÜBER `stdin` DEKODIERT AUF DIESER MASCHINE NICHT ALS UTF-8.** Ein Suchmuster mit
   „ö"/„ä" traf nie — `s.count(a)` lieferte 0, obwohl der Text dastand. **`PYTHONUTF8=1` hat
   NICHT geholfen.** Getragen hat erst ein **ASCII-only-Anker**. GEMESSEN am eigenen Lauf
   (CC, 2026-09-18), dreimal hintereinander.

#### DIE GRENZEN, DIE DIESER NACHWEIS NICHT ÜBERSCHREITET

- **Lokal nur Chromium.** Live gemessen ist Chrome auf dem Desktop; das Handy ist eine
  Owner-Angabe. **Firefox und WebKit sind an keiner Achse dieser Scheibe gemessen.**
- **„automatisch" ist live nicht gesichert** — so zugeschnitten, lokal belegt.
- **Der `__ps_pve`-Wert bei eingeschaltetem Dialog (840) ist von CC nicht prüfbar** —
  schlüssel-abhängig.
- **Keine echte Kundenseite in der lokalen Probe:** kein fremdes CSS, keine
  `!important`-Flut, keine eigene Stapel-Ebene.
- **Screenreader ungeprüft** — was aus dem `lang`-Attribut, „Sprache", „Deutsch" und
  „Englisch" angesagt wird, ist nicht erhoben. **Das wiegt in DIESER Scheibe schwerer als in
  den vorigen**, weil das `lang`-Attribut genau für Vorleseprogramme gesetzt ist
  (Entscheidung P11.13-36) und seine WIRKUNG damit ungemessen bleibt.
- **Der Export-Pfad trägt weiterhin kein Thema, keine Farbe, keinen Sachtext und keine
  Sprache** (offener Punkt DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST).

PROVENIENZ: Bau-Commit, Dateizahlen, Gates, Testzahlen, die zwanzig Vorher-Werte, der
Differenz-Nachweis, sämtliche Probe- und Mutationswerte, die 89 Aufrufstellen und die zwei
Werkzeug-Befunde sind GEMESSEN am Repo bzw. am eigenen Lauf (CC, 2026-09-18). **Sämtliche
Live-Angaben — (a), (b) und (c) — sind OWNER-MESSUNGEN bzw. OWNER-ANGABEN vom 2026-09-18,
vom Architekten weitergegeben; CC kann sie nicht prüfen.** Der Abgleich der sechs Blockwerte
gegen die eigene Differenz-Nachweis-Tabelle und die Nachmessung von `__ps_cnr` und
`__ps_cns` sind GEMESSEN (CC, 2026-09-18). Die Freigabe der drei Editor-Beschriftungen ist
eine ARCHITEKT-ANGABE über eine Owner-Entscheidung desselben Tages.

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

### Entscheidung P11.13-6 — DIE ABLAGE DES THEMENWERTS

**Der Wert liegt unter `settings.consent.theme`, Typ `unknown`** — als NACHBAR von `dialog`
im selben Unterobjekt, in **derselben Bauform**: Konstante `CONSENT_THEMES = ["light",
"dark", "auto"]`, Leser `getConsentTheme`, Setzer `setConsentTheme`.
**DER LESER:** Feld **fehlt** → `"light"`; **gültiger** Wert → er selbst; **jeder andere** →
`"unknown"`. **`"unknown"` WIRD NIE AUF `"light"` ABGEBILDET** — sonst sähe die abbrechende
Stelle ihn nie und der Abbruch wäre toter Code (docs/immer-beachten.md, EIN UNBEKANNTER
KONFIGURATIONSWERT BRICHT LAUT AB, Folge (a)).
**`settingsEqual` BEKOMMT DEN TERM `getConsentTheme(a) === getConsentTheme(b)`.**

**DER GRUND, zweiteilig:** (1) Der Nachbar-Ort erbt die geprüfte Bauform des Dialogwerts —
`unknown` im Typ, ein einziger Leser, normalisierter Vergleich; ein eigenes Top-Level-Feld
brächte nichts ausser einer zweiten Form. (2) **OHNE DEN TERM GEHT DER WERT STILL VERLOREN:**
`dirty` bliebe false, es gäbe keinen Text "Ungespeicherte Änderungen", keinen
`beforeunload`-Wächter und **kein `confirm` beim Projektwechsel** — der Wert wäre weg, und
nichts würde davon rot (GEMESSEN am Code, s. VERMERK P11.13-3).

**DIE BEDIENUNG GEHÖRT ZU DIESER ENTSCHEIDUNG und steht deshalb hier:** eine Radiogruppe
**"Darstellung"** mit **Hell / Dunkel / Automatisch**, **sichtbar nur bei `"bar"` oder
`"modal"`**. **DER WERT BLEIBT BEIM AUSSCHALTEN ERHALTEN** — die Gruppe verschwindet, das
Feld nicht; wer den Dialog wieder einschaltet, findet seine Wahl vor. Bei `"unknown"` ist
**nichts markiert** und ein roter Hinweis steht dabei — dieselbe Bauform wie beim
Dialogwert. Bei **Automatisch** steht ein Hinweis: **folgt der Einstellung des BESUCHERS,
nicht dem Design der Seite.**

**DIE GRENZE:** Sie sagt nichts über die **Vollständigkeit** von `settingsEqual`. Dass die
Funktion aufzählt und ein künftiges Mitglied by default unsichtbar ist, bleibt der offene
Punkt `settingsEqual` IST EINE ALLOWLIST — dieser Term löst ihn für **den Themenwert**, nicht
für die **Klasse**.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG, OWNER-FREIGABE 2026-09-17. Die Bauform des Dialogwerts
und die Folge eines fehlenden Terms sind GEMESSEN am Code (CC, 2026-09-17).

### Entscheidung P11.13-7 — DER ABBRUCH IST AN DEN DIALOG GEBUNDEN

**`publishProject` bricht bei `getConsentTheme(...) === "unknown"` ab — ABER NUR, WENN der
Dialogwert `"bar"` oder `"modal"` ist.** Mit einer **EIGENEN** Meldungs-Konstante, nicht der
des Dialogwerts. Der Abbruch steht **vor dem Label-Block und vor `ensureTrackingKey`**, wie
der bestehende.

**DER GRUND IST DIE ASYMMETRIE, AUF DER DIE DAUERREGEL SELBST RUHT:** Sie verlangt den lauten
Abbruch, weil der Preis eines stillen Rückfalls den BESUCHER trifft — unsichtbar und
dauerhaft —, während der Preis des Abbruchs den BETREIBER trifft, sofort und sichtbar. **BEI
`"off"` GIBT ES DIESEN BESUCHER-PREIS NICHT:** Es entsteht kein Oberflächen-Block, der
Themenwert erreicht keine ausgelieferte Zeile. Ein Abbruch dort **sperrte das
Veröffentlichen für eine Einstellung ohne jede Wirkung** — das wäre Strenge ohne die
Asymmetrie, die sie trägt.

**DIE GRENZE — SIE KIPPT, SOBALD DER THEMENWERT AUCH BEI `"off"` ETWAS AUSLIEFERT.** Dann
gibt es den Besucher-Preis, und die Bindung an den Dialog fällt. Wer bei `"off"` je einen
Baustein aus dem Themenwert erzeugt, ändert diese Entscheidung mit.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG, OWNER-FREIGABE 2026-09-17. Dass bei `"off"` kein
Oberflächen-Block entsteht, ist GEMESSEN am Code (`consentBlocksFor`, CC, 2026-09-17).

### Entscheidung P11.13-8 — DER WERT WÄHLT AUS EINER FESTEN TABELLE, ER BAUT NICHTS

**Der Themenwert wählt AUSSCHLIESSLICH zwischen fest im Repo stehenden Stylesheets.** Die
Verzweigung über die drei Werte steht an **EINER** Stelle und ist **erschöpfend** — ein
weiterer Wert in `CONSENT_THEMES` macht dort den `never`-Zweig zum Compiler-Fehler, wie bei
`consentBlocksFor` für die Form.
**`"light"` IST EXAKT DAS HEUTIGE STYLESHEET**, und die Ausgabe ist **byte-gleich**: die
sieben Vorher-Werte aus VERMERK P11.13-3 müssen nach dem Bau unverändert sein.
**KEINE CSS-VARIABLEN IN KEINEM THEMA.**

**DER GRUND, zweiteilig — und der zweite ist der tragende:** (1) **Der Rohwert aus dem Blob
erreicht den ausgelieferten Text NIE**; er wählt nur einen Zweig. Damit ist die
Sicherheitsachse der Roadmap (g) für diese Scheibe strukturell nicht berührt — es entsteht
keine Betreiber-Eingabe im Text. (2) **CSS-VARIABLEN SIND DER WEG, AUF DEM DIE KUNDENSEITE
HINEINWIRKEN KANN — UND DAS IST SEIT DEM 2026-09-17 GEMESSEN, NICHT ANGENOMMEN:**
`all:initial !important` setzt vererbte Eigenschaften zurück, **die BENUTZERDEFINIERTEN
aber NICHT**. Eine auf `html` der Seite gesetzte `--ps-*`-Eigenschaft **kommt im
Schattenbaum an** — an `.bar`, am Knopf und am Host-Element, je mit dem gesetzten Wert; die
Gegenprobe ausserhalb liefert denselben Wert, die Messung greift also. **DIE MESSUNG AUS
ROADMAP (f) IST DAMIT GEFAHREN**, und die Gestalt, die die Frage gar nicht erst stellt, ist
nicht mehr die vorsichtige, sondern die belegte Wahl.

**DIE GRENZE — SIE GILT FÜR DIE DREI WERTE DER TABELLE, UND FÜR DIE GILT SIE
UNVERÄNDERT.** Mit der Scheibe 3 (eigene Farben) tritt ein VIERTER Wert daneben, der NICHT
aus der Tabelle kommt: Dort erreicht ein Betreiber-Wert den ausgelieferten Text, und dort
gilt der Satz „der Rohwert aus dem Blob erreicht den ausgelieferten Text NIE" NICHT. **FÜR
"light", "dark" UND "auto" ÄNDERT SICH NICHTS — auch nicht byte-weise.** Wie der vierte
Zweig gebaut wird, steht in den Entscheidungen P11.13-12 (die vierte Darstellung),
P11.13-14 (das Format-Tor) und P11.13-15 (erzeugte Deklarationen, weiterhin KEINE
CSS-Variablen).

**DER TITEL DIESER ENTSCHEIDUNG BLEIBT WÖRTLICH:** Er ist für die drei Werte, die sie
regiert, richtig; die neue Entscheidung tritt NEBEN sie, nicht über sie.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG, OWNER-FREIGABE 2026-09-17. **Dass `all:initial` die
benutzerdefinierten Eigenschaften nicht erfasst, ist GEMESSEN** (CC, 2026-09-17, Chromium,
mit Gegenprobe ausserhalb des Schattenbaums; s. VERMERK P11.13-4 und der Docblock von
`CONSENT_THEME_DARK_CSS`, Commit `17389f1`). **DIESE ANGABE IST ERSETZT, NICHT GESTEMPELT:**
Bis zum Bau stand hier eine ARCHITEKTEN-KENNTNIS mit ausstehender Messung — eine
Tatsachenbehauptung über fremdes Verhalten, und ein Maßstab mit falscher Herkunftsangabe
taugt nicht als Maßstab (docs/immer-beachten.md, EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND
IHR BELEG FALSCH WIRD). Die Entscheidung selbst ist unverändert; nur ihr Beleg ist von einer
Annahme auf einen Befund gezogen.

### Entscheidung P11.13-9 — EIN THEMA ÄNDERT NUR FARBEN, NIE GRÖSSE ODER LAGE

**`"dark"` ist das heutige Stylesheet PLUS Überschreibungen, und jede Überschreibung trägt
AUSSCHLIESSLICH eine dieser Eigenschaften:** `color` · `background-color` · `border-color` ·
`border-top-color` · `outline-color` · `accent-color` · `color-scheme`. **KEINE
KURZSCHREIBWEISE** — kein `border`, kein `outline`, kein `background`, kein `font`.

**DIE PALETTE:** Hintergrund und Knopf **`#111827`** · Text, Knopftext, Knopfrahmen und
`accent-color` **`#f9fafb`** · Fokus-Ring **`#60a5fa`** · Container-Linie **`#4b5563`** ·
`color-scheme: dark` · **die Abdunkelung bleibt unverändert** (`rgba(17,24,39,0.6)`).

**`"auto"` IST `"light"` PLUS DENSELBEN ÜBERSCHREIBUNGEN IN
`@media (prefers-color-scheme: dark)`.** Es folgt damit **dem System des BESUCHERS, nicht der
Kundenseite** — das ist der tragende Unterschied aus der Roadmap-Zeile 11.13, Punkt (c):
"‚Automatisch' heisst `prefers-color-scheme`, NICHT von der Seite erben."

**DER GRUND FÜR DIE EIGENSCHAFTS-LISTE:** Genau die Kurzschreibweisen tragen im Bestand
**Grösse und Farbe zugleich** — `button{border:1px solid #111827}` und
`.bar{border-top:1px solid #d1d5db}`. Wer sie überschreibt, verschiebt Breiten und Höhen.
**MIT DER LISTE BLEIBEN GRÖSSE UND LAGE DURCH DIE BAUART GLEICH**, und damit gelten
**Entscheidung P11.13-3** (jedes Bedienelement im Fenster und treffbar) und **Entscheidung
P11.13-5** (Gleichrangigkeit) **fort, ohne neu erhoben zu werden** — sie müssen in der Probe
nur bestätigt, nicht neu begründet werden.

**DER KONTRAST DER PALETTE IST EINE ARCHITEKT-RECHNUNG (2026-09-17): 16,98 für Text gegen
Hintergrund und 6,98 für den Fokus-Ring.** **ER IST IN DER PROBE ZU MESSEN** — eine Rechnung
ist keine Messung, und eine falsche Rechnung ist eine STOPP-Bedingung der Scheibe.

**DIE GRENZE:** Sie gilt für Themen aus der festen Tabelle. Fällt P11.13-8 mit Scheibe 3,
ist auch diese Liste neu zu prüfen — freie Farben treffen dieselben Regeln.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG, OWNER-FREIGABE 2026-09-17. Die zwei Stellen, an denen
eine Grösse an einer Farbregel hängt, sind GEMESSEN am Code (CC, 2026-09-17); die zwei
Kontrastzahlen sind eine ARCHITEKT-RECHNUNG und ausdrücklich UNGEMESSEN.

### Entscheidung P11.13-10 — DAS KONTRAST-KRITERIUM

**JE THEMA UND JE FORM GILT:**
- **Text ≥ 4,5:1** gegen seinen Hintergrund — Sachtext, Knopftext, Weg-Text.
- **Knopfrahmen, Kästchen und Fokus-Ring ≥ 3:1** gegen den angrenzenden Hintergrund.
- **DIE CONTAINER-LINIE IST AUSGENOMMEN.** Sie ist eine Trennlinie, kein Bedienelement; im
  heutigen hellen Thema liegt sie bei **1,47** (GEMESSEN, VERMERK P11.13-3). Ohne diese
  Ausnahme wäre das Kriterium am Bestand verletzt, und die Scheibe würde eine
  Gestaltungsfrage als Fehler melden.
- **`"auto"` WIRD UNTER BEIDEN EMULIERTEN SYSTEMEINSTELLUNGEN GEMESSEN** — hell und dunkel,
  je über `page.emulateMedia`. Ein Thema, das nur in einer Einstellung geprüft ist, ist
  halb geprüft.

**DIE SCHWELLEN SIND WCAG 2.x AA — ARCHITEKT-VORGABE, NICHT IM REPO GELESEN.** Das steht
hier, damit niemand sie später für einen gemessenen Befund dieses Projekts hält: Im ganzen
Repo steht keine Schwelle, und VERMERK P11.13-3 führt die Zahlen des Bestands ausdrücklich
ohne Urteil.

**SIE BINDET SCHEIBE 3 AUSDRÜCKLICH.** Freie Farben sind genau der Fall, in dem ein
Kontrast-Kriterium gebraucht wird; dort ist zusätzlich zu entscheiden, **was geschieht, wenn
die Wahl des Betreibers es verletzt** — diese Entscheidung sagt das NICHT und nimmt es nicht
vorweg.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG, OWNER-FREIGABE 2026-09-17. Die Zahl 1,47 und die
Messformel sind GEMESSEN (CC, 2026-09-17); die Schwellen sind eine ARCHITEKT-VORGABE.

### Entscheidung P11.13-11 — EIN PFLICHT-PARAMETER AN ALLEN DREI STELLEN, KEIN VORGABEWERT

**`consentTheme` ist Pflicht-Parameter ohne Vorgabewert an `injectPageViewEmitter`, an
`buildConsentBarScript` UND an `buildConsentModalScript`** — dieselbe Bauform, die der
Schalter `consentDialog` schon trägt.

**DER GRUND IST EINE BAUFORM, KEINE STRENGE:** Zwei Formen nebeneinander — hier Pflicht,
dort Vorgabewert — machten die Begründung am Nachbarn zur Formalie, und die nächste Runde
müsste bei jeder Signatur neu nachsehen, welche gilt. **DER FACHLICHE GRUND STEHT DANEBEN
und trägt die Regel allein:** Ein `= "light"` liesse einen neuen Auslieferungsweg die
Darstellung stillschweigend übergehen, und **ein heller Dialog auf einer dunklen
Kundenseite ist genau der Fremdkörper, wegen dessen diese Phase existiert.**

**DER PREIS IST GENANNT, GEMESSEN UND ANGENOMMEN: 60 Testaufrufe** wurden dadurch zu
`tsc`-Fehlern. Sie sind **mechanisch und compiler-geführt** — jede Stelle wird namentlich
gemeldet, keine kann übersehen werden. **VERWORFEN: ein Vorgabewert `"light"` an den zwei
Erzeugern.** Er hätte 26 Stellen erspart; **der halbe Diff ist der schlechtere Tausch**,
weil er einmal spart und dauerhaft eine Uneindeutigkeit hinterlässt.

**WEN SIE BINDET:** jede spätere Runde, die eine dieser drei Signaturen anfasst oder eine
vierte Stelle auf diesem Pfad anlegt — ausdrücklich auch die Scheiben 3 und 4.

**WARUM SIE EINE EIGENE ENTSCHEIDUNG IST UND KEIN SATZ AN P11.13-8**, und das ist der
tragende Grund: **P11.13-8 REGIERT DIE FESTE TABELLE, UND IHR GELTUNGSBEREICH BEWEGT SICH
MIT JEDER SCHEIBE, DIE EINEN ZWEIG HINZUFÜGT.** Eine Bauform-Zusage, die für ALLE Zweige
gilt, darf nicht im Rumpf einer Entscheidung stehen, deren Reichweite sich verschiebt —
sonst wird sie genau dann mitgelesen oder mitverworfen, wenn eine neue Scheibe die
Signaturen anfasst und sie am dringendsten gebraucht wird.
**MIT SCHEIBE 3 IST DER FALL EINGETRETEN UND DIE TRENNUNG BESTÄTIGT:** P11.13-8 hat einen
VIERTEN Zweig bekommen und ist NICHT gekippt (Entscheidung P11.13-12), während P11.13-11
unverändert für alle vier Zweige galt — der Pflicht-Parameter hat lediglich seine GESTALT
gewechselt (diskriminierte Union, Entscheidung P11.13-18), nicht seine Zahl.

**DIE GRENZE:** Sie kippt, sobald es auf diesem Pfad einen Aufrufer gibt, der die
Darstellung **nicht kennen kann** — dann ist zu entscheiden, wer für ihn entscheidet, und
nicht ein Vorgabewert einzuziehen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG, OWNER-FREIGABE 2026-09-17 (Freigabe F1 zum Plan). Die
Zahl der Aufrufe ist GEMESSEN am Repo (CC, 2026-09-17); die Erhebung zur Entscheidung ist
die Verdichtung des Zuschnitts am selben Tag.

### Entscheidung P11.13-12 — „EIGENE FARBEN" IST EINE VIERTE DARSTELLUNG, KEIN ZWEITER SCHALTER

**Die eigenen Farben sind ein VIERTER WERT der Darstellung, neben Hell, Dunkel und
Automatisch** — keine zweite Einstellung, die neben der Darstellung stünde und mit ihr
kombiniert werden könnte. Es gibt zu jedem Zeitpunkt **genau eine** Darstellung.

**DER GRUND:** Zwei Einstellungen nebeneinander erzeugten sofort die Frage, was „Dunkel
PLUS eigene Farben" bedeutet, und sie hätte keine gute Antwort — jede Kombination wäre
entweder eine stille Vorrangregel oder ein Zustand, den niemand bestellt hat. **EIN Wert
mit vier Zweigen hat diese Frage nicht.** Er erbt zugleich die geprüfte Bauform des
Dialogwerts und des Themenwerts (Entscheidung P11.13-6): ein einziger Leser, ein
normalisierter Vergleich, `"unknown"` als eigener Ausgang.

**WAS DAS FÜR Entscheidung P11.13-8 HEISST — SIE IST NICHT GEKIPPT, SIE HAT JETZT EINEN
ZWEIG MEHR:** Für Hell, Dunkel und Automatisch gilt sie **unverändert und byte-genau** —
der Wert wählt aus einer festen Tabelle, der Rohwert aus dem Blob erreicht den
ausgelieferten Text nie. **NUR DER VIERTE ZWEIG KOMMT NICHT AUS DER TABELLE.** Die Grenze
jener Entscheidung ist deshalb **richtiggestellt und nicht gestempelt** worden.

**DIE VERZWEIGUNG BLEIBT AN EINER STELLE UND ERSCHÖPFEND.** Der vierte Wert macht dort den
`never`-Zweig zum Compiler-Fehler — genau wie der dritte, genau wie `consentBlocksFor` für
die Form des Dialogs. **Eine zweite Verzweigung über die Darstellung entsteht nicht.**

**DIE GRENZE:** Sie kippt, **sobald die Darstellung und die Farben zu zwei Einstellungen
werden, die gleichzeitig gelten sollen.** Dann ist zu entscheiden, welche Vorrang hat, und
diese Entscheidung sagt das ausdrücklich NICHT.

PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-18 (O3) für die vierte Darstellung;
ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (A5) für das Verhältnis zu P11.13-8. **BEIDE TRAGEN
DIESELBE GRENZE und stehen deshalb als EINE Entscheidung.** Dass die drei Tabellenzweige
ihre Bytes behalten, ist zum Zeitpunkt dieser Entscheidung eine ABLEITUNG aus der Bauart
von `consentThemeCss` (`"light"` liefert den leeren String) und **noch nicht gemessen** —
die Messung ist Pflicht der Bau-Scheibe.

### Entscheidung P11.13-13 — ZWEI FARBEN, UND ALLES ÜBRIGE WIRD ABGELEITET

**DER BETREIBER WÄHLT GENAU ZWEI WERTE: einen HINTERGRUND und einen TEXT.** Kein dritter
Wert, kein Wähler je Bedienelement, keine getrennten Farben für die einzelnen Knöpfe.

**DIE ABLEITUNG, vollständig:**
- **HINTERGRUND** → Hintergrund von Leiste bzw. Fenster **UND** Hintergrund der Knöpfe.
- **TEXT** → Sachtext · Knopftext · **Knopfrahmen** · **Fokus-Ring** · **`accent-color`
  der Kästchen**. Der Weg „Einstellungen" bekommt keine eigene Farbe — er erbt die
  Knopf-Farbe, wie im Bestand.

**DER GRUND IST EIN KONTRAST-ARGUMENT UND KEIN GESTALTUNGS-ARGUMENT, und das ist der ganze
Inhalt dieser Entscheidung:** Tragen Rahmen, Kästchen und Fokus-Ring **dieselbe** Farbe wie
der Text, deckt **EIN einziges Paar** — Text gegen Hintergrund — das gesamte
Kontrast-Kriterium P11.13-10 ab. Dessen Schwelle für Text ist 4,5, die für Rahmen, Kästchen
und Fokus-Ring ist 3; **4,5 schliesst 3 ein**. Aus sechs zu prüfenden Paaren wird eines.
Wer die Farben feiner aufteilt, bekommt sechs Paare zurück und braucht sechs Hinweise.

**DIE GLEICHRANGIGKEIT BLEIBT GEBAUT, NICHT GEMESSEN:** Beide Knöpfe tragen weiter
dieselben Farben, weil sie über **dasselbe** `makeButton` ohne Klasse entstehen (GEMESSEN,
VERMERK P11.13-5). **GETRENNTE KNOPFFARBEN SIND AUSGESCHLOSSEN** — sie wären genau das Dark
Pattern, das der Guardrail der Roadmap-Zeile 11.13, Punkt (h), ausschliesst, und sie
machten aus einer gebauten Zusage eine gemessene.

**ZWEI PLÄTZE SIND AUSDRÜCKLICH NICHT ENTSCHIEDEN und stehen als Plan-Fragen offen:**
(1) die **CONTAINER-LINIE** (`.bar{border-top-color}` / `.dialog{border-color}`) — sie ist
vom Kontrast-Kriterium ausgenommen (P11.13-10) und hat deshalb kein Kriterium, an dem eine
Ableitung sich messen liesse; (2) **`color-scheme`** — es steuert, wie der Browser das
**native** Kästchen zeichnet, und ist damit der einzige Platz, an dem eine Wahl eine Farbe
bewegt, die wir nicht selbst setzen. **KEINE EMPFEHLUNG; Kandidaten stehen im Plan.**

**UNBERÜHRT BLEIBEN — wie beim dunklen Thema:** die **Abdunkelung** des Fensters
(`.backdrop`) und der durchsichtige Hintergrund des Wegs (`.way`). CSS2c hält beide
Abwesenheiten bereits für das dunkle Thema.

**DIE GRENZE:** Sie kippt **mit einer dritten freien Farbe.** Dann fällt das
Ein-Paar-Argument, und P11.13-10 ist wieder mit mehreren Paaren zu prüfen.

PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-18 (O1) für den Umfang von zwei Farben;
ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (A3) für die Ableitung. **BEIDE TRAGEN DIESELBE GRENZE —
die dritte Farbe — und stehen deshalb als EINE Entscheidung.** Dass beide Knöpfe heute
farbgleich sind und keine `:hover`-Regel existiert, ist GEMESSEN am Code (CC, 2026-09-18,
VERMERK P11.13-5). Dass ≥ 4,5 die Schwelle ≥ 3 einschliesst, ist eine ABLEITUNG aus den
zwei Schwellen von P11.13-10, keine Messung.

### Entscheidung P11.13-14 — DAS FORMAT-TOR: EIN ALPHABET, DAS DREI EBENEN ZUGLEICH DECKT

**ZUGELASSEN IST AUSSCHLIESSLICH `^#[0-9a-f]{6}$`.** Keine Kurzform (`#fff`), keine
Grossbuchstaben, keine Namen, kein `rgb()`, kein Alpha-Kanal. **UND KEINE NORMALISIERUNG:**
Ein Wert, der nur nach Umformung passte, wird **abgewiesen**, nicht zurechtgebogen.

**DER GRUND IST DER DREI-EBENEN-BEFUND AUS VERMERK P11.13-5, und ohne ihn liest sich die
Strenge als Geschmack:** Der Wert landet in CSS **innerhalb** eines JS-String-Literals
**innerhalb** des Rohtexts eines `<script>`-Elements. `JSON.stringify` deckt **nur die
mittlere** Ebene. **EIN ALPHABET AUS `#` UND SECHZEHN HEX-ZEICHEN ENTHÄLT KEIN `;`, KEIN
`}`, KEIN `{`, KEIN `/`, KEIN `(` UND KEIN `<` — es deckt damit alle drei Ebenen ZUGLEICH,
und zwar ohne dass irgendwo eine Maskierung richtig sein muss.** Eine Maskierung je Ebene
wäre drei Stellen, die einzeln falsch werden können; ein Alphabet ist eine.
**WARUM AUCH DIE GROSSBUCHSTABEN FALLEN, obwohl sie harmlos aussehen:** Jede zugelassene
Schreibvariante ist eine zweite Form desselben Werts, und zwei Formen verlangen eine
Normalisierung — also genau die Umformung, die diese Entscheidung ausschliesst. Eine
Eingabe, die der Betreiber tippt, darf er im Feld korrigieren; der Speicher trägt eine Form.

**DIE BAUFORM IST DIE VON `getConsentTheme`, und sie hat drei Teile:**
1. **DER LESER liefert einen GEPRÜFTEN TYP oder `"unknown"`.** **KEIN RÜCKFALL** auf einen
   Vorgabewert — sonst sähe die abbrechende Stelle einen ungültigen Wert nie, und der
   Abbruch wäre toter Code (docs/immer-beachten.md, EIN UNBEKANNTER KONFIGURATIONSWERT
   BRICHT LAUT AB, Folge (a)).
2. **DER ERZEUGER NIMMT NUR DEN GEPRÜFTEN TYP AN.** Ein roher `string` an dieser Stelle ist
   ein **Compiler-Fehler**, nicht ein Laufzeit-Fehler. Der Prüfung ausweichen heisst dann,
   den Typ absichtlich zu erzwingen — eine sichtbare Handlung statt eines Versehens.
3. **`publishProject` BRICHT AB**, wenn der Dialog eingeschaltet ist, die Darstellung
   „eigene Farben" lautet **und** eine der zwei Farben ungültig oder nicht vorhanden ist —
   mit einer **EIGENEN** Meldungs-Konstante, in derselben Bauform wie
   `CONSENT_THEME_UNKNOWN_MESSAGE`, **vor** dem Label-Block und **vor** `ensureTrackingKey`.
   **DIE ASYMMETRIE AUS Entscheidung P11.13-7 GILT UNVERÄNDERT:** Bei ausgeschaltetem Dialog
   wird nicht abgebrochen, weil dort nichts ausgeliefert wird und es keinen Besucher-Preis
   gibt.

**IST DIE DARSTELLUNG NICHT „EIGENE FARBEN", WERDEN GESPEICHERTE FARBEN WEDER GELESEN NOCH
AUSGELIEFERT.** Sie bleiben im Blob liegen — wer zurückschaltet, findet seine Wahl vor,
dieselbe Zusage wie beim Themenwert (Entscheidung P11.13-6).

**DIE FOLGE, DIE ÜBER DIESE SCHEIBE HINAUSGEHT: SCHEIBE 3 HAT EINE EIGENE
SICHERHEITSACHSE.** Der Satz der Roadmap-Zeile 11.13, Punkt (c) 4, die Scheibe des freien
Textes sei „die einzige mit einer Sicherheitsachse", ist damit **falsch** und in
docs/roadmap.md **ersetzt, nicht gestempelt**. Punkt (g) bleibt unberührt — er ist eine
Aussage über den **freien Text**, und für den gilt er weiter. **DIE WÄCHTER MIT FEINDLICHER
EINGABE GEHÖREN IN DIESE SCHEIBE**; sie sind ihre eigene Invariante und werden nicht auf
Scheibe 4 vertagt.

**DIE KONKRETEN NAMEN — Feldnamen, Leser, Setzer, der Name des geprüften Typs — SIND HIER
NICHT ENTSCHIEDEN.** Sie sind Gegenstand des Plans und fallen mit seiner Freigabe.

**DIE GRENZE:** Sie kippt, **sobald ein Farbformat mit einem anderen Alphabet zugelassen
wird** — `rgb()`, Farbnamen, Alpha-Kanal, Kurzform. Jedes davon bringt Zeichen zurück, die
auf mindestens einer der drei Ebenen ausbrechen; **dann ist die Ausbruchsfrage NEU zu
stellen und nicht fortzuschreiben.**

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (A1). Der Drei-Ebenen-Befund ist GEMESSEN am
Code (CC, 2026-09-18, VERMERK P11.13-5); **dass ein Ausbruch tatsächlich gelänge, ist
ABGELEITET und ungemessen.** Dass das Hex-Alphabet die genannten Zeichen nicht enthält, ist
am Ausdruck ABLESBAR.

### Entscheidung P11.13-15 — ERZEUGTE DEKLARATIONEN AUS LITERALEM HEX, KEINE CSS-VARIABLEN

**Die zwei Werte gehen als LITERALES HEX in Überschreibungen** — dieselbe Gestalt wie
`CONSENT_THEME_DARK_CSS`, nur zur Bauzeit zusammengesetzt statt als Konstante
hingeschrieben. **JEDE ERZEUGTE DEKLARATION TRÄGT GENAU EINE EIGENSCHAFT AUS DER LISTE VON
Entscheidung P11.13-9** — `color` · `background-color` · `border-color` ·
`border-top-color` · `outline-color` · `accent-color` · `color-scheme`. **KEINE
KURZSCHREIBWEISE.**

**KEINE CSS-VARIABLEN, UND DER GRUND IST GEMESSEN, NICHT GEWÄHLT:** `all:initial !important`
setzt die **benutzerdefinierten** Eigenschaften **nicht** zurück — eine `--ps-*` der
Kundenseite kommt im Schattenbaum an (GEMESSEN, VERMERK P11.13-4; Roadmap-Zeile 11.13,
Punkt (f)). Über Variablen gebaut, könnte die fremde Seite in unsere Darstellung
hineinwirken. **DER BEFUND GILT FÜR DEN VIERTEN ZWEIG GENAUSO WIE FÜR DIE DREI ANDEREN**,
und `CSS2b` — kein `var(`, kein `--` in **keinem** Thema — bleibt unverändert gültig und
wird auf den vierten Wert ausgedehnt.

**DIE FOLGE IST DIESELBE WIE BEIM DUNKLEN THEMA: GRÖSSE UND LAGE BLEIBEN DURCH DIE BAUART
GLEICH.** Im Bestand tragen `button{border:1px solid …}` und `.bar{border-top:1px solid …}`
Farbe **und** Breite in einer Kurzschreibweise; wer sie überschreibt, verschiebt Breiten und
Höhen. Mit der Eigenschafts-Liste geschieht das nicht. **Entscheidung P11.13-3 (alles im
Fenster und treffbar) und Entscheidung P11.13-5 (Gleichrangigkeit) werden in der Probe
deshalb BESTÄTIGT, nicht neu begründet** — genau wie bei der Scheibe 11.13b.

**`.backdrop` UND `.way` BLEIBEN UNBERÜHRT**, wie beim dunklen Thema; CSS2c hält beides.

**DIE GRENZE:** Sie kippt, **sobald eine Eigenschaft ausserhalb der Liste von P11.13-9
gebraucht wird oder eine CSS-Variable zugelassen werden soll.** Beides ist eine
STOPP-Bedingung des Zuschnitts und keine Auslegungsfrage: Die erste Hälfte bewegt Grösse
oder Lage, die zweite öffnet den gemessenen Weg der Kundenseite in den Schattenbaum.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (A2). Die Vererbungs-Messung ist GEMESSEN
(CC, 2026-09-17, Chromium, mit Gegenprobe ausserhalb des Schattenbaums; VERMERK P11.13-4) —
**nur Chromium; Firefox und WebKit sind an dieser Achse ungemessen.** Die zwei Stellen, an
denen eine Grösse an einer Farbregel hängt, sind GEMESSEN am Code (CC, 2026-09-17,
Entscheidung P11.13-9).

### Entscheidung P11.13-16 — DER KONTRAST WIRD GERECHNET UND GEZEIGT, ER SPERRT NICHTS

**VERLETZT DIE WAHL DES BETREIBERS DIE SCHWELLE, ERSCHEINT EIN HINWEIS AM FARBFELD — UND
DAS VERÖFFENTLICHEN BLEIBT MÖGLICH.** Es gibt keinen Riegel, keine Sperre, keinen Abbruch
aus diesem Grund.

**DER GRUND, ZWEITEILIG. Der erste ist eine Haltung, der zweite ein Befund:**
(1) **„Wir weisen hin, wir erzwingen nicht."** Dieselbe Figur wie beim Dialog selbst und
beim Guardrail der Roadmap-Zeile 11.13, Punkt (h): Der Betreiber kann eine Farbwahl haben
wollen, die wir für schlecht lesbar halten — es ist seine Seite. **Ein Riegel machte aus
einem Werkzeug eine Aufsicht.**
(2) **DEN WEG FÜR EINEN SERVER-HINWEIS GIBT ES NICHT** (GEMESSEN am Code, CC, 2026-09-18):
`PublishResult` kennt genau `{ ok:true; url; label; restored?: true }` und
`{ ok:false; error }` — **ein Boolean als einzigen nicht-fatalen Zusatz, keinen Textkanal**;
`publishNotice` in `src/components/CodeImporter.tsx` ist rein clientseitig abgeleitet und
**EIN** Anzeigeslot mit struktureller Rangfolge. Ein Server-Hinweis müsste diesen Kanal erst
bauen — **und er wäre auch dann zu spät: Der Betreiber erfährt es beim Veröffentlichen statt
beim Wählen.**

**DIE RECHNUNG IST EINE REINE FUNKTION UNTER `src/lib`**, nach WCAG 2.x über die relative
Leuchtdichte. **SIE WIRD GEGEN REFERENZWERTE GETESTET, DIE NICHT AUS DEM EIGENEN CODE
STAMMEN** — sonst ist der Test ein Spiegel, der jeden Rechenfehler bestätigt
(docs/immer-beachten.md, EIN WÄCHTER ÜBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS
DEM CODE). **DER SERVER RECHNET NICHTS FÜR DEN HINWEIS** — er entsteht im Client am
Farbfeld, und es gibt keinen Weg, auf dem er von der Serverseite käme.
**DAS IST KEINE AUSSAGE ÜBER DIE ERZEUGUNGSZEIT.** Dort rechnet der Server sehr wohl mit
derselben Funktion — `bevorzugtesFarbschema` leitet daraus `color-scheme` ab, und
ausgeliefert wird allein ein Schlüsselwort. **DIE ABGRENZUNG STEHT IN ENTSCHEIDUNG
P11.13-21** und wird hier nicht verdoppelt; wer den Satz absolut liest, hält eine der zwei
Entscheidungen für gebrochen.

**DER HINWEISTEXT BEHAUPTET WEDER URSACHE NOCH RECHTSFOLGE.** Er nennt **den Wert und die
Schwelle** — nicht „nicht barrierefrei", nicht „rechtswidrig", nicht „wird abgelehnt".
Dieselbe Disziplin wie bei den Meldungstexten der Fix-Scheibe safeAction und bei der
Wortwahl des Dashboards.

**DIE SCHWELLE 4,5 IST EINE ARCHITEKT-VORGABE (WCAG 2.x AA), NICHT IM REPO GELESEN** —
wörtlich dieselbe Herkunft wie in Entscheidung P11.13-10, und sie steht hier aus demselben
Grund: damit niemand sie später für einen gemessenen Befund dieses Projekts hält.

**ZWEI PAARE SIND AUSDRÜCKLICH KEIN KRITERIUM, und das gehört dazu, sonst liest sich der
Hinweis als vollständige Zusage:** (a) **Fenster gegen Abdunkelung** — die Abdunkelung
bleibt unverändert, während der Fenster-Hintergrund frei wird; ein dunkler Hintergrund kann
darin verschwinden, und P11.13-10 führt dieses Paar nicht. (b) **Dialog gegen die
KUNDENSEITE** — er ist nie Kriterium gewesen und wird es hier nicht (VERMERK P11.13-4,
Schritt 6: „AUSDRÜCKLICH KEINE KONTRAST-AUSSAGE GEGEN DEN SEITENHINTERGRUND").

**DIE GRENZE:** Sie kippt, **sobald eine Kontrastverletzung einen Vorgang sperren soll.**
Dann braucht es den Rückkanal, den es heute nicht gibt, und die Haltung aus (1) ist eigens
neu zu entscheiden — nicht abzuleiten.

PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-18 (O2) für „Hinweis statt Riegel";
ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (A4) für Ort, Form und Nachweis der Rechnung. **BEIDE
TRAGEN DIESELBE GRENZE — der Tag, an dem der Kontrast etwas sperrt — und stehen deshalb als
EINE Entscheidung.** Die Abwesenheit eines Server-Rückkanals ist GEMESSEN am Code (CC,
2026-09-18); die Schwelle ist eine ARCHITEKT-VORGABE und ausdrücklich keine Messung.

### Entscheidung P11.13-17 — DER GEPRÜFTE TYP IST OPAK, UND ES GIBT GENAU EINE ZUSICHERUNG

**Der geprüfte Farbtyp ist ein OPAKER MARKEN-TYP** — eine Zeichenkette mit einer Marke, die
ausserhalb ihrer Erzeugungsstelle nicht herstellbar ist. **Ein roher `string` ist ihm nicht
zuweisbar**; wer einen an den Erzeuger gibt, bekommt einen **Compiler-Fehler**.

**ES GIBT GENAU EINE ZUSICHERUNG IM GANZEN REPO, SIE STEHT IM LESER, UND SIE STEHT
UNMITTELBAR HINTER DEM REGEX-TEST.** Das ist der eigentliche Inhalt dieser Entscheidung: Ein
opaker Typ mit zwei Erzeugungsstellen ist kein Tor, sondern ein Tor mit einer Tür daneben.
**Die Zahl EINS ist die Zusage, nicht die Opazität.**

**WAS DAS FÜR SPÄTERE RUNDEN HEISST:** Wer den Typ an einer zweiten Stelle erzeugt — durch
eine weitere Zusicherung, eine Hilfsfunktion „für Tests", einen Konstruktor —, hebt das
Format-Tor auf, **ohne dass ein Gate rot wird**: Der Compiler ist danach zufrieden, und die
Prüfung findet nicht mehr statt. Gefangen wird das allein von einem Wächter über den
Quelltext, und **der sieht Zeichen, nicht Bedeutung** (docs/immer-beachten.md, EIN WÄCHTER
ÜBER QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG) — er muss streng irren und seine Grenze an
sich selbst tragen.

**VERWORFEN: EIN HÜLLEN-OBJEKT** (`{ hex: string }`). Ein roher String kompiliert dort
ebenfalls nicht — **aber an der Einsetzstelle wird ausgepackt, und dann ist der Wert wieder
ein roher String.** Der Compiler hört genau dort auf zu helfen, wo der Wert in den
ausgelieferten Text geht. Das ist der schlechtere Tausch.

**DIE GRENZE:** Sie kippt, **sobald eine zweite Stelle den geprüften Typ erzeugen muss** —
etwa weil ein anderer Eingabeweg dieselbe Form liefert. Dann ist nicht die Zusicherung zu
vervielfachen, sondern der Leser zu teilen: eine Prüfstelle, mehrere Aufrufer.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (F1) zum Plan der Scheibe 11.13c. Sie füllt
die Gestalt aus, die Entscheidung P11.13-14 fordert und dort ausdrücklich offenlässt. Dass
ein `string` einem Marken-Typ nicht zuweisbar ist, ist eine Eigenschaft des Typsystems und
**am Repo nicht gemessen** — der erste Beleg ist der `tsc`-Lauf der Bau-Scheibe.

### Entscheidung P11.13-18 — DIE DARSTELLUNG REIST ALS EIN WERT, UND „CUSTOM OHNE FARBEN" IST NICHT KONSTRUIERBAR

**Die Darstellung wird als DISKRIMINIERTE UNION übergeben** — ein Zweig für Hell, Dunkel und
Automatisch, ein Zweig für „eigene Farben", der **seine zwei geprüften Farben mitträgt**.
Sie bleibt **EIN Pflicht-Parameter ohne Vorgabewert** an `injectPageViewEmitter`, an
`buildConsentBarScript` und an `buildConsentModalScript`.

**DER GRUND: DER UNMÖGLICHE ZUSTAND WIRD UNDARSTELLBAR, NICHT ABGEFANGEN.** „Eigene Farben
ohne Farben" lässt sich gar nicht erst hinschreiben; es braucht dafür keinen Laufzeit-Wurf,
keine Prüfung und keinen Test. **Ein Wurf wäre die schwächere Bauform:** Er fängt den
Zustand erst, wenn jemand ihn erzeugt hat, und nur auf dem Pfad, den ein Test tatsächlich
läuft.

**Entscheidung P11.13-11 GILT UNVERÄNDERT UND WIRD NICHT AUSGEDEHNT.** Sie verlangt einen
Pflicht-Parameter ohne Vorgabewert an drei Stellen; **diese Entscheidung ändert seine GESTALT,
nicht seine Zahl.** Die Frage, ob die Farben eine zweite Pflicht-Achse bräuchten, stellt sich
damit nicht mehr — es gibt keinen zweiten Parameter.

**BEI AUSGESCHALTETEM DIALOG REIST DER HELL-ZWEIG ALS PLATZHALTER.** Nach den Abbrüchen ist
ein ungültiger Zustand nur noch bei `"off"` möglich, und dort entsteht kein
Oberflächen-Block. **Das ist die direkte Fortsetzung von `deliveredTheme`** und aus demselben
Grund kein Rückfall im Sinne der Dauerregel: die abbrechende Stelle ist bereits passiert, und
der Wert erreicht keine ausgelieferte Zeile. **DER WÄCHTER IST `T-OFF`, AUSGEDEHNT AUF VIER
WERTE** — bei `"off"` ist der Ausgabetext für alle vier Darstellungen zeichengleich. Er ist
damit weiterhin auch der Wächter der Grenze von Entscheidung P11.13-7.

**DER PREIS IST GENANNT UND ANGENOMMEN:** Die Form jeder bestehenden Aufrufstelle ändert
sich — **GEMESSEN am Repo (CC, 2026-09-18): 39 · 18 · 17 textuelle Fundstellen mit Klammer,
Definitionen ausgenommen; die Achse filtert einzelne Kommentar-Erwähnungen nicht restlos
heraus.** Die Änderung ist **compiler-geführt und namentlich gemeldet**; keine Stelle kann
übersehen werden.

**DIE GRENZE:** Sie kippt, **sobald ein Zweig Daten braucht, die keine Union tragen kann** —
etwa eine offene Menge von Werten. Dann ist die Übergabeform neu zu entscheiden und nicht zu
dehnen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (F2) zum Plan der Scheibe 11.13c. Die drei
Aufrufzahlen sind GEMESSEN am Repo (CC, 2026-09-18). Dass die Union den unmöglichen Zustand
ausschliesst, ist eine Eigenschaft des Typsystems und **am Repo nicht gemessen**.

### Entscheidung P11.13-19 — DIE ABLAGE IST FLACH: ZWEI FELDER, ZWEI SKALARE TERME

**Die zwei Werte liegen als `settings.consent.colorBackground` und
`settings.consent.colorText`, je vom Typ `unknown`** — flache Nachbarn von `gate`, `dialog`
und `theme`, in derselben Bauform wie der Themenwert (Entscheidung P11.13-6). **KEIN
Unterobjekt.**

**`settingsEqual` BEKOMMT ZWEI SKALARE TERME**, je ein `===` auf die Rückgabe des jeweiligen
Lesers. **KEIN OBJEKTVERGLEICH, und der Grund ist gemessen:** `===` auf zwei Rückgaben
DERSELBEN Funktion kompiliert bei **jedem** Rückgabetyp. Ein Objekt verglichen sich per
Referenz — nach jedem Setzen wäre es eine neue Referenz und damit **dauerhaft dirty**, oder
bei Mutation am selben Objekt **nie dirty** —, **und nichts würde davon rot**. Verglichen
wird der NORMALISIERTE Wert, damit ein fehlendes Feld auf beiden Seiten gleich ist.

**OHNE DIE TERME GEHT DER WERT STILL VERLOREN** — kein Text „Ungespeicherte Änderungen",
kein `beforeunload`-Wächter, kein `confirm` beim Projektwechsel (GEMESSEN am Code, VERMERK
P11.13-3). Das ist derselbe Befund, den Vorrat P11.13-1 als KLASSE führt; er bleibt offen,
weil diese Entscheidung ihn nur für diese zwei Felder einlöst.

**DIE FELDNAMEN SIND EINE EINBAHNSTRASSE.** Ein Blob, der sie einmal trägt, trägt sie
weiter; eine Umbenennung müsste beide Formen lesen. Sie werden deshalb wie ein Kontrakt
behandelt, nicht wie ein Implementierungsdetail (docs/immer-beachten.md, WAS EINMAL IM
AUSGELIEFERTEN TEXT STEHT, IST EINE EINBAHNSTRASSE — hier auf den Speicher angewandt).

**DIE GRENZE:** Sie kippt, **sobald ein Farbwert nicht mehr skalar ist** — etwa ein Paar je
Systemeinstellung. Dann braucht `settingsEqual` einen eigenen Vergleicher (Bauform:
`conversionRulesEqual`), und die flache Ablage ist neu zu entscheiden.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (F3) zum Plan der Scheibe 11.13c. Das Verhalten
von `===` auf Objektreferenzen ist eine Eigenschaft der Sprache; die Folge eines fehlenden
Terms ist GEMESSEN am Code (CC, 2026-09-17, VERMERK P11.13-3).

### Entscheidung P11.13-20 — DIE CONTAINER-LINIE TRÄGT DIE TEXTFARBE

**`.bar{border-top-color}` und `.dialog{border-color}` bekommen im vierten Zweig die
TEXTFARBE.** Sie bleibt damit in **jedem** Farbpaar sichtbar, ohne dass irgendetwas gerechnet
werden muss.

**DER GRUND IST DIE FOLGE DES EIN-PAAR-PRINZIPS AUS Entscheidung P11.13-13:** Die Textfarbe
ist der einzige Wert, von dem die Scheibe bereits weiss, dass er sich vom Hintergrund
abhebt — der Kontrast-Hinweis misst genau dieses Paar. Jede andere Wahl bräuchte entweder
eine dritte Farbe (ausgeschlossen durch P11.13-13) oder eine eigene Rechnung mit einer
eigenen Schwelle. **Diese hier braucht beides nicht.**

**DIE AUSNAHME DER CONTAINER-LINIE VOM KONTRAST-KRITERIUM (Entscheidung P11.13-10) BLEIBT
BESTEHEN.** Sie wird nicht verbraucht und nicht aufgehoben: Im vierten Zweig greift sie
faktisch nicht, weil die Linie dort ohnehin die Textfarbe trägt — **für Hell, Dunkel und
Automatisch bleibt sie unverändert nötig** (im hellen Thema liegt die Linie bei 1,47, im
dunklen bei 2,35, beide GEMESSEN).

**DER PREIS IST BENANNT:** Die Linie wird im vierten Zweig **so kräftig wie der Text**. Im
Bestand ist sie bewusst schwach; wer eigene Farben wählt, bekommt eine deutlichere Kante als
bei Hell. **Das ist eine sichtbare Folge und kein Nebeneffekt** — sie gehört in die Probe
(Paar P3) und in den Live-Blick.

**DIE GRENZE:** Sie kippt **mit einer dritten freien Farbe** — dieselbe Grenze wie bei
Entscheidung P11.13-13, und sie steht hier trotzdem eigens, weil diese Entscheidung eine
ANDERE Frage schliesst: dort der Umfang, hier die Zuordnung eines Platzes, der kein
Kontrast-Kriterium hat.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (F4) zum Plan der Scheibe 11.13c; sie schliesst
die erste der zwei offenen Plan-Fragen aus Entscheidung P11.13-13. Die zwei Linien-Werte 1,47
und 2,35 sind GEMESSEN (CC, 2026-09-17, VERMERKE P11.13-3 und P11.13-4).

### Entscheidung P11.13-21 — `color-scheme` WIRD ABGELEITET, NICHT GEWÄHLT UND NICHT GESCHWELLT

**Der vierte Zweig setzt `color-scheme: dark`, wenn WEISS gegen den gewählten Hintergrund
einen HÖHEREN Kontrast hat als SCHWARZ — sonst `light`, auch bei Gleichstand.** Es gibt
**KEINE Schwellen-Konstante.**

**DER GRUND, ZWEITEILIG:**
(1) **`color-scheme` STEUERT DAS NATIVE KÄSTCHEN** — die einzige Farbe im Dialog, die wir
NICHT selbst setzen, weil der Browser sie zeichnet. **GEMESSEN (CC, 2026-09-17, Chromium):**
Der UA-Rahmen des Kästchens kippt mit `color-scheme` von `rgb(0,0,0)` auf `rgb(255,255,255)`;
die Füllung ist über `getComputedStyle` gar nicht fassbar und nur per Bildpunkt-Vergleich
belegbar. Bliebe `color-scheme` ungesetzt, zeichnete der Browser auf einem dunklen eigenen
Hintergrund ein helles Kästchen mit schwarzem Rahmen.
(2) **EIN VERGLEICH BRAUCHT KEINE SCHWELLE, EINE HELLIGKEITS-GRENZE SCHON.** „Weiss schlägt
Schwarz" ist eine Entscheidung zwischen zwei Kandidaten und damit vollständig aus dem
gewählten Hintergrund ableitbar. Eine Schwelle wäre eine **zweite ARCHITEKT-VORGABE ohne
Messung** neben der 4,5 aus Entscheidung P11.13-10 — und die erste steht dort nur, weil sie
als Vorgabe ausgewiesen ist. **Der Gleichstand fällt auf `light`**, damit der Ausgang
vollständig bestimmt ist und nicht von einer Rundung abhängt.

**DER ERZEUGER DARF DIE KONTRASTFUNKTION IMPORTIEREN.** Er läuft zur **ERZEUGUNGSZEIT**, und
**ausgeliefert wird nur ein Schlüsselwort** — `light` oder `dark`, keine Zahl, kein Wert aus
der Rechnung.
**DAS IST KEINE AUSNAHME VON Entscheidung P11.13-16, und der Satz gehört hierher, weil er
sonst als Widerspruch gelesen wird:** Jene Entscheidung sagt „der Server rechnet nichts" über
den **KONTRAST-HINWEIS** — der entsteht im Client am Farbfeld und wird nie serverseitig
erzeugt. **Die Ableitung hier ist ein anderer Gegenstand:** kein Hinweis, keine Meldung, kein
Rückkanal, sondern die Wahl eines Schlüsselworts beim Bau des Stylesheets. Wer beides
zusammenzieht, hält eine der zwei Entscheidungen für gebrochen.

**DIE WIRKUNG IST ZU MESSEN, NICHT ZU BEHAUPTEN:** Der Unterschied am nativen Kästchen wird
in der Probe per **Bildpunkt-Vergleich** belegt (Farbpaar P3, dunkler Hintergrund). `getComputedStyle`
genügt dafür ausdrücklich nicht.

**DIE GRENZE:** Sie kippt, **sobald `color-scheme` einen dritten Wert braucht** — dann ist
ein Zwei-Kandidaten-Vergleich keine Ableitung mehr, und es entsteht genau die Schwellenfrage,
die diese Entscheidung vermeidet.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (F5) zum Plan der Scheibe 11.13c; sie schliesst
die zweite der zwei offenen Plan-Fragen aus Entscheidung P11.13-13. Das Kippen des UA-Rahmens
und die Nicht-Messbarkeit der Füllung sind GEMESSEN (CC, 2026-09-17, Chromium, VERMERKE
P11.13-3 und P11.13-4) — **nur Chromium; Firefox und WebKit zeichnen native Kästchen anders
und sind an dieser Achse ungemessen.**

### Entscheidung P11.13-22 — DER NATIVE FARBWÄHLER, UND DIE VORBELEGUNG IST EINE NUTZERHANDLUNG

**Das Bedienelement ist `input[type="color"]`** — der native Wähler. Er liefert genau
`#rrggbb` in Kleinbuchstaben und damit **exakt das Alphabet des Format-Tors** (Entscheidung
P11.13-14); ein Tippfehler ist auf diesem Weg nicht herstellbar.

**DER WECHSEL AUF „EIGENE FARBEN" SCHREIBT FEHLENDE ODER UNGÜLTIGE WERTE ALS `#ffffff`
(Hintergrund) UND `#111827` (Text) IN DEN BLOB** — sichtbar, und er macht `dirty`. **EIN
BEREITS GESPEICHERTES GÜLTIGES PAAR WIRD NIE ÜBERSCHRIEBEN.**

**DER GRUND:** Der native Wähler **zeigt immer einen Wert** — er kennt kein „nicht gesetzt".
Ohne Vorbelegung zeigte die Oberfläche also Farben, **die nirgends gespeichert sind**, und das
Veröffentlichen verweigerte anschliessend mit Verweis auf eine Einstellung, die der Betreiber
auf dem Bildschirm vor sich sieht. **Das ist der Zustand, in dem ein Produkt kaputt aussieht,
obwohl es richtig handelt.**

**DAS IST KEIN STILLER RÜCKFALL, UND DIE UNTERSCHEIDUNG TRÄGT DIE GANZE ENTSCHEIDUNG:**
**DER LESER BLEIBT BEI `"unknown"` UND BEKOMMT KEINEN VORGABEWERT** (Entscheidung P11.13-14,
Teil 1). Die Vorbelegung geschieht **im Bedienelement, auf eine NUTZERHANDLUNG hin** — den
Wechsel der Darstellung — und schreibt einen echten Wert in den Blob, den der Betreiber sieht
und ändern kann. Ein Rückfall im Sinne der Dauerregel wäre eine **Leseseite**, die einen
ungültigen Wert unbemerkt in einen gültigen verwandelt; **hier wird gespeichert, was angezeigt
wird.** Wer die zwei zusammenzieht, baut beim nächsten Mal den stillen Rückfall ein und beruft
sich auf diese Entscheidung.

**STEHT BEIM LADEN BEREITS „EIGENE FARBEN" MIT EINEM UNGÜLTIGEN WERT, WIRD NICHTS
GESCHRIEBEN** — das Feld zeigt den roten Hinweis, dieselbe Bauform wie beim Dialog- und beim
Themenwert. **Nur der WECHSEL belegt vor, nicht das Laden.**

**DIE ZWEI VORBELEGUNGS-WERTE SIND DER HEUTIGE HELLE BESTAND** (`#ffffff` Hintergrund,
`#111827` Text) — der Betreiber startet damit bei genau der Darstellung, die er vorher hatte,
und sieht die Wirkung erst, wenn er etwas ändert.

**DIE GRENZE:** Sie kippt, **sobald das Bedienelement ein „nicht gesetzt" darstellen kann** —
etwa ein Textfeld neben dem Wähler oder ein Schalter „Farbe verwenden". Dann entfällt der
Grund für die Vorbelegung, und sie ist zu streichen, nicht beizubehalten.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (F6) zum Plan der Scheibe 11.13c. Dass der
native Wähler stets einen Wert trägt und `#rrggbb` in Kleinbuchstaben liefert, ist eine
Eigenschaft der Plattform und **in diesem Projekt NICHT gemessen** — der erste Beleg ist die
Probe bzw. der Live-Test der Bau-Scheibe.

### Entscheidung P11.13-23 — FREI WIRD NUR DER SACHTEXT

**DER BETREIBER ERSETZT AUSSCHLIESSLICH `CONSENT_TEXT`** — den einen erläuternden Satz über
den Bedienelementen. **Die Beschriftungen der drei Knöpfe, des Wegs, der zwei Gruppen, die
drei zugänglichen Namen und die Konsolen-Warnung des Widerrufs bleiben UNSER Wortlaut** und
sind keine Betreiber-Eingabe.

**DER GRUND STEHT IN DER ROADMAP-ZEILE SELBST:** Punkt (h) sagt „Die Knopf-Logik und die
visuelle Gleichrangigkeit von 'Alle akzeptieren' und 'Ablehnen' bleiben im System verankert;
**anpassbar ist der erläuternde Text**." Diese Entscheidung liest den Satz eng und nimmt
damit nur, was er ausdrücklich freigibt.

**DER TRAGENDE GRUND IST ABER EIN ANDERER, UND OHNE IHN WIRD DIE ENGE LESART BEIM NÄCHSTEN
AUFRÄUMEN ALS ÜBERVORSICHT GESTRICHEN: FREIE KNOPFTEXTE MACHTEN DIE GANZE GLEICHRANGIGKEIT
ZUR FASSADE.** Lage und Farbe der zwei Knöpfe sind heute GEBAUT gleich (P11.13-5 für die
Lage, P11.13-13 für die Farbe — beide Knöpfe entstehen über dasselbe `makeButton` ohne
Klasse). Ein Betreiber, der „Ablehnen" durch „Nein, ich verzichte auf Rabatte" ersetzt, hat
zwei optisch gleichrangige Knöpfe und **einen im Wortlaut abgewerteten** — genau das Dark
Pattern, das der Guardrail ausschliesst, und zwar **ohne dass eine unserer zwei
Gleichrangigkeits-Zusagen rot würde.** Die Zusagen messen Geometrie und Farbe; Wortlaut
messen sie nicht und können es nicht.

**WAS DAMIT AUSDRÜCKLICH NICHT GESAGT IST:** dass die übrigen zehn Texte für immer unser
Wortlaut bleiben. Ihre SPRACHE ist Gegenstand einer eigenen Scheibe (Entscheidung
P11.13-24) — dort wählt der Betreiber aus einer festen Tabelle und gibt keinen Text ein.

**DIE GRENZE:** Sie kippt, **sobald ein weiterer Textplatz freigegeben werden soll.** Dann ist
für JEDEN einzeln zu entscheiden, ob er eine Zusage trägt, die der Wortlaut aushebeln kann —
und die Antwort ist bei den zwei Knöpfen bereits nein.

PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-18 (O4). Punkt (h) GELESEN an docs/roadmap.md
(CC, 2026-09-18). Dass beide Knöpfe über dasselbe `makeButton` ohne Klasse entstehen, ist
GEMESSEN am Code (CC, 2026-09-18, VERMERK P11.13-5). **Dass ein abgewerteter Wortlaut die
Wahl des Besuchers verschiebt, ist eine ABLEITUNG und in diesem Projekt UNGEMESSEN.**

### Entscheidung P11.13-24 — DIE SPRACHE IST EINE EIGENE SCHEIBE, UND SIE IST EINE TABELLE

**DIE SPRACHE DES DIALOGS WIRD SCHEIBE 5 DER PHASE 11.13 (11.13e), NACH DEM FREIEN
SACHTEXT.** Der Betreiber wählt aus einer **festen Auswahl — Deutsch oder Englisch**; die
Wortlaute stehen als Konstanten im Repo und tragen Owner-Freigaben. **KEINE
BETREIBER-EINGABE.**

**DER GRUND, ZWEITEILIG:**
(1) **11.13d BLEIBT BEI IHRER SICHERHEITSACHSE.** Der freie Sachtext bringt Betreiber-Eingabe
in den ausgelieferten Text und braucht dafür Maskierung, Tor und feindliche Wächter
(Entscheidungen P11.13-25 und P11.13-26). Eine Sprachwahl braucht **nichts davon** — sie
wählt einen Zweig, wie der Themenwert es tut (P11.13-8). Zwei Gegenstände mit verschiedenen
Achsen in eine Scheibe zu legen hiesse, den einfacheren unter der Beweislast des schwierigeren
zu bauen.
(2) **SPRACHE UND FREIER TEXT ÜBERLAPPEN, SIND ABER NICHT DIESELBE SACHE** (BEFUND, VERMERK
P11.13-7 der Aufklärung und der Bericht vom 2026-09-18): Der Backlog-Eintrag „11.5f" benennt
**elf** Texte; Roadmap (h) gibt für Scheibe 4 **einen** frei. Über die übrigen zehn — die
drei Knopf-Beschriftungen, den Weg, die Gruppen-Namen, die drei zugänglichen Namen, die
Warnung — sagt (h) **nichts**, und genau sie
bleiben ohne eine Sprachscheibe auf Deutsch stehen, auch wenn der Betreiber seinen Sachtext
englisch schreibt. **Der freie Sachtext löst das Sprachproblem also für ein Elftel der
Menge.**

**DIE BAUFORM ERBT SIE VON P11.13-8:** eine feste Tabelle, eine erschöpfende Verzweigung, der
Rohwert aus dem Blob erreicht den ausgelieferten Text nie. **Der Wortlaut ist unser Risiko,
nicht das des Betreibers.**

**DER BACKLOG-EINTRAG 11.5f WIRD DAMIT NICHT ERLEDIGT, SONDERN VERORTET.** Er bleibt stehen;
seine Messungen — die elf Konstanten, die sieben freigegebenen Konstanten bei sechs
Freigabe-Posten, der Sprach-Nicht-Treffer —
sind der Massstab der Scheibe 5 und gingen mit einer Streichung verloren.

**DIE GRENZE:** Sie kippt, **sobald der Betreiber eigene Wortlaute für die übrigen zehn Texte
liefern soll** — dann ist es keine Tabelle mehr, und die Sicherheitsachse des freien Textes
gilt für alle elf Plätze. Sie kippt ebenso, wenn ein **dritter** Sprachraum gefordert ist und
die Tabelle nicht mehr trägt.

PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-18 (O5). Der Überlappungs-Befund ist GELESEN an
docs/claude-history/backlog-polish.md (Eintrag 11.5f) und an docs/roadmap.md, Punkt (h)
(CC, 2026-09-18). **Dass die elf Texte heute auf jeder Seite deutsch stehen, ist für zehn von
ihnen im Backlog-Eintrag GEMESSEN (CC, 2026-09-16) und für `CONSENT_WAY_LABEL`, das erst mit
der Scheibe 11.13a entstand, in VERMERK P11.13-9 (CC, 2026-09-18).**
**DIE ZAHLEN DIESES EINTRAGS SIND AM 2026-09-18 SACHKORRIGIERT — zehn auf elf, neun auf zehn,
ein Zehntel auf ein Elftel:** `CONSENT_WAY_LABEL` kam mit der Scheibe 11.13a hinzu und stand
in keiner der drei Aufzählungen (GEMESSEN, VERMERK P11.13-9, Punkt (a)). **ERSETZT, NICHT
GESTEMPELT** — ein Massstab mit falschen Angaben taugt nicht als Massstab
(docs/immer-beachten.md, EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD). Die
Entscheidung selbst ist unverändert.

### Entscheidung P11.13-25 — JEDER BETREIBER-WERT IN SCRIPT-ROHTEXT LÄUFT ÜBER DEN EINBETTUNGS-HELFER

**DER HELFER:** `JSON.stringify`, **danach jedes `<` als Unicode-Escape** — dieselbe
Ersetzung, die `generateFunctional` seit jeher auf die Mapping-Tabelle anwendet
(`JSON.stringify(table).replace(/</g, "\\u003c")`). Er nimmt **EIN Argument und trägt keinen
Schalter**; ein Schalter „mit/ohne Maskierung" wäre die zweite Tür neben dem Tor. Er liegt als
**reine Datei unter `src/lib`**, ohne `"use server"` und ohne `import "server-only"`, und ist
aus dem Client-Pfad (`meta.ts` über `generateFunctional`) wie aus dem Server-Pfad (die
Dialog-Erzeuger) importierbar.

**DIE GELTUNG HAT DREI STUFEN, UND SIE SIND NICHT DASSELBE:**

**(1) PFLICHT — JEDER BETREIBER-WERT, DER IN SCRIPT-ROHTEXT GEHT.** Das ist der harte Kern
dieser Entscheidung und der einzige Teil, der eine Sicherheitsachse trägt. **HEUTE SIND ES
DREI:** der **Sachtext** (Scheibe 11.13d), die **Pixel-ID** (`var PS_PIXEL_ID = …` in
`buildMetaRuntime`, `src/lib/tracking/meta.ts`) und die **zwei eigenen Farben** — sie gehen
nicht einzeln hinein, sondern als Teil des Stylesheets `stil`, und das läuft ebenfalls über
den Helfer.

**(2) KONVENTION — IN DEN VIER DIALOG-ERZEUGERN LÄUFT JEDE EINBETTUNG ÜBER IHN, AUCH EINE
KONSTANTE.** `consent-choice.ts`, `consent-bar.ts`, `consent-modal.ts`, `consent-revoke.ts`.
**DER GRUND IST NICHT SICHERHEIT, SONDERN LESBARKEIT AM ORT DER HANDLUNG:** Stünden dort zwei
Bauformen nebeneinander — hier der Helfer, dort ein rohes `JSON.stringify` —, müsste die
nächste Runde bei JEDER Einsetzstelle entscheiden, welche gilt, und die Entscheidung fiele
ohne Kriterium. Eine Handschrift ist billiger als eine Fallunterscheidung.
**SIE IST EINE KONVENTION UND KEIN GATE: FESTGEHALTEN WIRD SIE IM DOCBLOCK DES HELFERS, NICHT
IN EINEM QUELLTEXT-WÄCHTER.** Warum kein Wächter, steht in Entscheidung P11.13-30 und wird
hier nicht verdoppelt.

**(3) FREIGESTELLT — REPO-KONSTANTEN UND SERVER-VERGEBENE WERTE AN ANDERER STELLE DÜRFEN ROH
BLEIBEN.** Das betrifft heute `consent-store.ts`, `consent-setter.ts`, `pageview-emitter.ts`
und **alle übrigen Einbettungen in `meta.ts`** ausser der Pixel-ID — eingebettet sind dort
`CONSENT_STORE_KEY`, `CONSENT_STORE_FORMAT`, `ALL_CONSENT_KEYS`, `ANALYTICS_CONSENT_TARGET`,
`PAGEVIEW_EVENT`, `META_CONSENT_TARGET`, `CONSENT_WIRE_FIELD`, `BROWSER_CONFIRM_MARKER`, die
Ziel-Schlüssel sowie `trackingKey` und `proxyUrl`.
**IHRE BYTE-ZUSAGE IST „ENTHÄLT KEIN `<`", UND SIE IST EINE AUSSAGE ÜBER DEN WERT, NICHT ÜBER
SEINE BEHANDLUNG:** Repo-Konstanten stehen im Repo, `trackingKey` ist server-vergeben,
`proxyUrl` ist env-abgeleitet. **Keiner von ihnen ist Betreiber-Eingabe.** Wer einen von ihnen
in eine Betreiber-Eingabe verwandelt, hebt die Freistellung damit auf — nicht später, sondern
in derselben Runde.

**DER GRUND FÜR DEN HELFER IST GEMESSEN, NICHT VORSORGLICH** (VERMERK P11.13-7): Ein
`</script>` in einem eingebetteten Wert **verlässt den Block**, und mit einer
anführungszeichenfreien Nutzlast **führt fremder Code aus**. `<!--<script>` verschluckt
zusätzlich das NACHFOLGENDE Script-Element, **ohne einen einzigen Fehler zu erzeugen**. Weder
`JSON.stringify` noch der Serialisierer maskieren `<` — beides gemessen, mit Gegenprobe.

**DIE BYTE-GLEICHHEIT IST EINE EIGENSCHAFT DER BAUART, UND SIE IST GEMESSEN:** Kein heute
eingebetteter Wert enthält ein `<` — 16 Konstanten und Schlüssellisten, vier Stylesheets,
sechzehn ganze Blocktexte, **Treffer gesamt 0**, mit Positivkontrolle. Der Helfer ändert damit
**kein Zeichen**. **DAS IST ZU MESSEN UND NICHT ZU BEHAUPTEN** — die Bau-Scheibe führt den
Nachweis über die neunzehn Werte aus VERMERK P11.13-6 erneut.
**DIE EINE AUSNAHME GEHÖRT DAZU: FÜR DIE PIXEL-ID IST „enthält kein `<`" KEINE EIGENSCHAFT
DES WERTS, SONDERN EINE ANNAHME ÜBER SEINE BENUTZUNG.** Sie ist freie Betreiber-Eingabe. Der
Byte-Nachweis läuft deshalb über eine **numerische** Pixel-ID; für einen Wert mit `<` ändert
der Helfer sehr wohl Zeichen — und genau das ist sein Zweck.

**`generate.ts` BLEIBT UNBERÜHRT.** Die Mapping-Tabelle maskiert dort bereits richtig, sie ist
eine **Kern-Datei**, und ein Eingriff ohne Gewinn ist ein Risiko ohne Gegenwert. **Sie ist das
VORBILD, und der Docblock des Helfers nennt sie als solches** — bis zu dieser Scheibe war sie
das Einzelstück, das die richtige Bauform trug, ohne sie irgendwo anders verfügbar zu machen.

**DIE GRENZE — UNVERÄNDERT UND DIE WICHTIGSTE ZEILE DIESER ENTSCHEIDUNG: DAS ESCAPE TRÄGT NUR
IM SCRIPT-ROHTEXT.** In einem HTML-Attribut, in einem HTML-Textknoten oder in einer URL ist
`"\\u003c"` **keine Maskierung, sondern sechs harmlose Zeichen**. Die Entscheidung kippt
deshalb, sobald ein eingebetteter Wert in einen dieser Kontexte gelangt; dann braucht jener
Kontext seine EIGENE Maskierung, und der Helfer ist dort **falsch**, nicht bloss
unzureichend.
**HEUTE GIBT ES FÜNF EINBETTUNGEN AUSSERHALB DES SCRIPT-ROHTEXTS**, und keine davon ist ein
Textplatz: die Kennung im Start-Tag (`<script id="${CONSENT_BAR_SCRIPT_ID}">` und die zwei
Pendants), dazu die globalen Namen `window.${CONSENT_STORE_API}` und
`window.${CONSENT_REVOKE_API}`. Alle fünf sind Repo-Konstanten, keine Betreiber-Eingabe, und
gehen **nicht** über `JSON.stringify`. **Sie laufen NICHT über den Helfer** — er wäre dort das
falsche Werkzeug.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (E1), **präzisiert am selben Tag
(ARCHITEKT-ENTSCHEIDUNGEN G1 und G4)**. Der Ausbruch, das stille Verschlucken, die
Serialisierer-Querprobe, das Einzelstück in `generate.ts`, die Null-Treffer-Messung und die
Aufzählung der eingebetteten Werte sind GEMESSEN (CC, 2026-09-18, VERMERK P11.13-7). **Dass
das Escape ausserhalb von Script-Rohtext nicht trägt, ist eine Eigenschaft der Formate und in
diesem Projekt NICHT gemessen.** Dass die Freistellung aus Stufe (3) mit einer
Betreiber-Eingabe entfällt, ist eine ABLEITUNG aus Stufe (1), keine Messung.

### Entscheidung P11.13-26 — EIN TOR FÜR DEN SACHTEXT, ZUSÄTZLICH ZUR MASKIERUNG

**DER SACHTEXT BEKOMMT EIN EIGENES FORMAT-TOR, OBWOHL DER HELFER AUS P11.13-25 IHN BEREITS
MASKIERT. ZWEI UNABHÄNGIGE LINIEN, UND DAS IST DER GANZE INHALT DIESER ENTSCHEIDUNG.**

**DER GRUND IST EINE GEMESSENE LEHRE DIESER PHASE — DIE MUTATION M-c DER SCHEIBE 11.13c:**
Dort hat eine Mutation, die den Rohwert ungeprüft durchreichte, **null Tests getroffen**,
weil das zweite Tor bereits zurückgegeben hatte. **Die Gegenprobe M-c PLUS M-b liess beide
fallen** — das war der Beleg, dass die zwei Tore **unabhängig** tragen. Ein einzelnes Tor ist
eine Stelle, die einzeln falsch werden kann; zwei sind zwei.

**WAS DAS TOR ZULÄSST:** ein `string`, **nach `trim` nicht leer**, **höchstens N Zeichen**
(Entscheidung P11.13-27), und **OHNE**: C0-Steuerzeichen einschliesslich Zeilenumbruch, `DEL`,
C1-Steuerzeichen, `U+2028`/`U+2029` und die Bidi-Steuerzeichen `U+202A`–`U+202E` sowie
`U+2066`–`U+2069`.

**DAS TOR PRÜFT MIT `trim`, ES VERÄNDERT ABER NICHTS. AUSGELIEFERT WIRD DER GESPEICHERTE WERT
ZEICHENGLEICH** — führender und nachgestellter Leerraum bleibt drin, wenn der Betreiber ihn
getippt hat. `trim` ist ausschliesslich das Mittel, mit dem die Frage „ist hier überhaupt
etwas?" beantwortet wird.
**DAMIT IST DIE REIBUNG ZU Entscheidung P11.13-14 AUFGELÖST UND NICHT NUR BENANNT.** Jene
verlangt für die Farben „KEINE NORMALISIERUNG: Ein Wert, der nur nach Umformung passte, wird
abgewiesen, nicht zurechtgebogen" — und genau das gilt hier ebenso: **Es gibt keinen Wert,
der nur nach Umformung passte**, weil keine Umformung stattfindet. Ein Text aus lauter
Leerzeichen wird ABGEWIESEN (`"unknown"`), nicht zu einem leeren String zurechtgebogen; ein
Text mit Leerraum an den Rändern wird ANGENOMMEN und unverändert ausgeliefert.
**WER `trim` HIER FÜR EINE NORMALISIERUNG HÄLT, VERWECHSELT DAS MESSINSTRUMENT MIT DEM
GEGENSTAND** — dieselbe Unterscheidung, die P11.13-22 zwischen einem Rückfall im Leser und
einer Vorbelegung im Bedienelement zieht.
**`<` IST AUSDRÜCKLICH ERLAUBT — DAFÜR IST P11.13-25 DA.** Ein Verbot wäre eine dritte Linie
an einer Stelle, die schon zwei hat, und es nähme dem Betreiber einen Satz wie „Wir setzen
<3 Cookies" ohne Gewinn.
**WARUM DIE STEUERZEICHEN TROTZDEM FALLEN, obwohl `JSON.stringify` sie maskiert:** Sie sind
nicht gefährlich, sondern **unsichtbar**. `U+2028` bricht in alten Laufzeiten ein
JS-Literal; die Bidi-Zeichen können den ANGEZEIGTEN Satz gegen den gespeicherten kehren —
ein Betreiber liest im Feld etwas anderes, als der Besucher sieht. Ein Zeichen, dessen
Wirkung man im Eingabefeld nicht sehen kann, gehört nicht in einen Text, der für einen
anderen gebaut wird.

**DIE BAUFORM IST DIE VON P11.13-14 UND P11.13-17, UNVERÄNDERT ÜBERNOMMEN:**
1. **DER LESER liefert einen GEPRÜFTEN, OPAKEN TYP oder `"unknown"` — KEIN RÜCKFALL.**
2. **GENAU EINE ZUSICHERUNG IM GANZEN REPO**, im Leser, unmittelbar hinter der Prüfung.
3. **DER ERZEUGER NIMMT NUR DEN GEPRÜFTEN TYP AN** — ein roher `string` ist ein
   Compiler-Fehler.
4. **`publishProject` BRICHT AB** — mit einer EIGENEN Meldungs-Konstante, **vor** dem
   Label-Block und **vor** `ensureTrackingKey`, und **nur bei Dialog ≠ `"off"`**: die
   Asymmetrie aus P11.13-7 gilt unverändert.

**DAS FEHLENDE FELD IST KEIN FEHLER, SONDERN DER NORMALFALL:** Fehlt das Feld, gilt **unser
Standardtext** — `CONSENT_TEXT`, wie heute. Das ist **kein Rückfall im Sinne der Dauerregel**,
und der Unterschied ist derselbe wie bei P11.13-22: Ein Rückfall bildete einen **ungültigen**
Wert auf einen gültigen ab; hier gibt es **gar keinen Wert**, und ein abwesendes Feld ist ein
bekannter Zustand, kein unbekannter.
**EIN GESPEICHERTER LEERER STRING IST DAGEGEN `"unknown"`** — er ist ein WERT, und ein Wert,
der nichts bedeutet, wird nicht stillschweigend gedeutet.
**DIE OBERFLÄCHE LÖST DAS, INDEM SIE DAS FELD ENTFERNT STATT ES ZU LEEREN:** Wer das Feld
leert, bekommt den Standardtext — geschrieben wird die Abwesenheit, nicht der leere String.

**DIE GRENZE:** Sie kippt, **sobald Zeilenumbrüche oder Formatierung im Sachtext gewünscht
werden.** Dann fällt das Verbot der C0-Zeichen, und mit ihm die Zusage, dass der Sachtext
**eine Zeile** ist — an der die Geometrie-Messung aus P11.13-27 hängt.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (E2). Die Lehre aus M-c und M-c+M-b ist
GEMESSEN (CC, 2026-09-18, VERMERK P11.13-6, Abschnitt (f)). Die Bauform ist aus P11.13-14 und
P11.13-17 übernommen. **Dass `U+2028` in alten Laufzeiten ein JS-Literal bricht und dass die
Bidi-Zeichen die Anzeige kehren, ist eine Eigenschaft der Formate und in diesem Projekt NICHT
gemessen.**

### Entscheidung P11.13-27 — N IST DIE GEMESSENE KANTE MINUS EINEN GESETZTEN ABSTAND

**N BESTEHT AUS ZWEI TEILEN VON VERSCHIEDENEM RANG, UND WER SIE ZUSAMMENZIEHT, HÄLT EINE
SETZUNG FÜR EINE MESSUNG:**

**(1) DIE KANTE WIRD GEMESSEN.** Sie ist die grösste Länge, bei der Entscheidung P11.13-3 bei
**360×480** noch hält — für **Leiste UND Fenster**, **ein- UND ausgeklappt**: jedes
Bedienelement vollständig im Fenster und treffbar. **GEMESSEN: 416 Codepunkte** (CC,
2026-09-18, Playwright/Chromium über `file://`). **417 verletzt sie**, und zwar beim
**Fenster**, Wechseltext, **ausgeklappt**.

**(2) N IST DIE KANTE MINUS EINEM GESETZTEN ABSTAND.** **GESETZT: 300** (ARCHITEKT,
2026-09-18), rund 28 Prozent unter der Kante. **DER ABSTAND DECKT SCHRIFT- UND
BROWSER-VARIANZ — UND ER IST UNGEMESSEN.** Die Kante ist an **einem** Browser und **einer**
Schriftfamilie erhoben; **Firefox und WebKit sind an dieser Achse ungemessen**, und es gibt
keine Messung darüber, wieviel Reserve eine andere Schrift oder eine andere
Zeichensatz-Ersetzung tatsächlich braucht.
**N IST DAMIT EINE VORGABE MIT EINEM GEMESSENEN DECKEL, KEINE MESSUNG.** Beide Angaben stehen
an der Konstante `CONSENT_TEXT_MAX_LENGTH`, getrennt und je mit ihrem Rang.

**WAS DIESE FASSUNG RICHTIGSTELLT:** Diese Entscheidung verlangte, N sei die grösste Länge,
bei der P11.13-3 noch hält — **also die Kante selbst**, und sie erklärte eine geratene Zahl
ausdrücklich zur STOPP-Bedingung, weil eine Messung an dieser Stelle billig ist. **DIE
MESSUNG IST GEFAHREN UND BLEIBT PFLICHT; GEÄNDERT HAT SICH, WAS AUS IHR FOLGT:** Die Kante
allein liesse keinen Raum für eine Umgebung, die nicht gemessen ist. **Eine Zahl, die genau
am gemessenen Rand steht, ist in jeder ungemessenen Umgebung eine Wette** — und die drei
ungemessenen Achsen (zwei Browser, jede fremde Schrift) sind hier die Regel, nicht der Rand.
**DIE BILLIGE MESSUNG WIRD DAMIT NICHT ERSETZT, SONDERN UM EINE SETZUNG ERGÄNZT**, und die
Setzung ist als solche ausgewiesen (docs/immer-beachten.md, EINE BILLIGE MESSUNG WIRD NICHT
DURCH EINE HERLEITUNG ERSETZT — sie verlangt die Messung und verbietet nicht, neben ihr eine
Reserve zu setzen).

**DAS FENSTER BINDET, NICHT DIE LEISTE — UND DAS IST DIE ZWEITE RICHTIGSTELLUNG.** Diese
Entscheidung nannte als Grund „DIE LEISTE HAT KEINEN NOTAUSGANG": kein `overflow`, kein
`max-height`, `position:fixed; bottom:0`, also Wachstum nach oben über den Rand.
**GEMESSEN IST DAS UMGEKEHRTE** (CC, 2026-09-18): Bei 416 steht die Leiste bei `top` 112,69
mit Luft; **das Fenster** steht an seinem Deckel (Höhe 448 bei `top` 16) und bekommt einen
INNEREN Scrollbereich — bei 417 `scrollHeight` 495 gegen `clientHeight` 446, und der letzte
Knopf liegt ausserhalb des Sichtfensters.
**DER EIGENE SCROLLBEREICH IST ALSO KEIN SCHUTZ, SONDERN DIE URSACHE:** Er hält das Fenster
klein und schiebt dafür ein Bedienelement aus dem Blick — genau das, was P11.13-3 verbietet.
Die Leiste wächst stattdessen mit und bleibt vollständig sichtbar. **WER DIESEN ABSATZ FÜR
EINE FORMALIE HÄLT, ERHEBT DIE KANTE BEIM NÄCHSTEN MAL AN DER LEISTE UND MISST DIE FALSCHE
FORM.**

**N ZÄHLT UNICODE-CODEPUNKTE, NICHT UTF-16-EINHEITEN.** `"…".length` zählt Einheiten und wäre
für ein Emoji oder ein Zeichen ausserhalb der Grundebene **zwei**, obwohl der Betreiber **ein**
Zeichen sieht. **Eine Grenze, die etwas anderes zählt als der Mensch vor dem Feld, erzeugt
einen Streit, den niemand gewinnt.**
**DAS TOR UND DER ZÄHLER DER OBERFLÄCHE BENUTZEN DIESELBE ZÄHLFUNKTION** — eine Stelle, zwei
Aufrufer (docs/immer-beachten.md, ABLEITEN STATT HARDCODEN). **DER GRUND IST NICHT SPARSAMKEIT:
Zwei Zählungen liefen auseinander, und zwar STILL** — die Oberfläche zeigte eine Zahl, das Tor
wiese ab, und der Betreiber sähe eine Anzeige, die seine Ablehnung nicht erklärt. **Der Zähler
ist damit kein Anzeige-Detail, sondern die sichtbare Seite des Tors.**

**DIE KANTE WIRD MIT ZWEI EXTREMEN ERHOBEN, UND BEIDE SIND NÖTIG:**
· ein **ununterbrochener Lauf** aus dem breitesten plausiblen Zeichen („W") — er hat keinen
  Umbruchpunkt und treibt die BREITE, also die Achse `right <= innerWidth`;
· ein **Wechseltext** aus Zeichen und Leerzeichen — er bricht maximal oft um und treibt die
  HÖHE, also die Achse `top >= 0`.
**EINE KANTE, DIE NUR AN EINEM DER BEIDEN ERHOBEN IST, IST HALB ERHOBEN.**

**WAS N NICHT IST:** ein Sicherheits-Mittel. Die Ausbruchsfrage trägt P11.13-25, das
Zeichen-Tor P11.13-26. **N ist eine Geometrie-Grenze**, und wer sie als Schranke gegen
feindliche Eingabe liest, hält eine Zahl für einen Riegel.

**DIE GRENZE — SIE HAT SEIT DIESER FASSUNG ZWEI AUSLÖSER, UND SIE SIND NICHT DERSELBE:**
**(a) DIE GEOMETRIE ÄNDERT SICH** — die Leiste bekommt einen eigenen Scrollbereich, das
Fenster verliert seinen Deckel, die Knopfbreite oder die Schriftgrösse ändert sich, oder die
eingeklappte Gestalt bricht anders um. Dann ist **die KANTE neu zu erheben**, und N folgt ihr.
**(b) EIN ANDERER BROWSER WIRD GEMESSEN** — Firefox oder WebKit. Dann ist die Kante dort
eigens zu erheben, und **der Abstand ist neu zu bemessen oder entfällt**: Er existiert gerade
deshalb, weil jene Umgebungen ungemessen sind. **Fällt eine gemessene Kante UNTER 300, ist
nicht der Abstand zu kürzen, sondern N.**
**Dieselbe Denkfigur wie bei P11.13-5, und aus demselben Grund: N ist keine Eigenschaft des
Textes, sondern des Behälters.**

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (E3), **präzisiert am selben Tag nach der
Probe**. Die Kante 416, ihre Verletzung bei 417, die Lage von Leiste und Fenster und die
Nachmessung bei 300 (acht Zustände, 0 Verletzungen) sind GEMESSEN (CC, 2026-09-18, Chromium;
VERMERK P11.13-8). **Die Zahl 300 und der Abstand sind eine ARCHITEKT-SETZUNG; der Abstand
ist ausdrücklich UNGEMESSEN.** Dass die Leiste weder `overflow` noch `max-height` trägt, ist
GEMESSEN am CSS (CC, 2026-09-18, VERMERK P11.13-7).

### Entscheidung P11.13-28 — DER SACHTEXT ERBT DIE ZWEI GRENZEN DES AUSGELIEFERTEN TEXTES

**(1) EIN GEÄNDERTER SACHTEXT WIRKT ERST NACH DEM NEU-VERÖFFENTLICHEN. (2) DER EXPORT-PFAD
TRÄGT KEINEN SACHTEXT** — wie er heute schon kein Thema und keine Farbe trägt.

**WARUM DAS EINE ENTSCHEIDUNG IST UND KEINE WIEDERHOLUNG:** Beide Sätze folgen aus Bestehendem
— aus der Dauerregel EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY und aus dem
offenen Punkt DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST. **Sie stehen hier,
weil der Sachtext der erste Gegenstand dieser Phase ist, bei dem ein Betreiber die Abwesenheit
für einen FEHLER halten wird:** Er tippt einen Satz, drückt Speichern, sieht seine Live-Seite —
und dort steht der alte. Bei Anordnung, Thema und Farben war dasselbe wahr und fiel weniger
auf, weil niemand einen selbst getippten Satz erwartet.

**GEMESSEN, NICHT ANGENOMMEN** (VERMERK P11.13-5, 2026-09-18): `generateFunctional`
(`src/lib/generate.ts`) hängt allein `CONSENT_SCRIPT_ID` und `buildConsentRuntimes()` ein;
`injectPageViewEmitter` kommt dort **nicht** vor. Die zwei produktiven Aufrufe von
`injectPageViewEmitter` stehen beide in `publishProject`.
**FOLGE FÜR DEN NACHWEIS:** Der Export-Pfad gehört **unter die Grenzen** des Vermerks dieser
Scheibe, wie bei 11.13b und 11.13c. **Er wird nicht mitgebaut.**

**FOLGE FÜR DIE OBERFLÄCHE:** Das Hinweis-Muster der Phase gilt unverändert — der Betreiber
erfährt beim Speichern nicht, dass er neu veröffentlichen muss. **DASS NICHTS DARAUF HINWEIST,
IST EIN BEKANNTER OFFENER PUNKT** (NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN
IST, Trigger BEREITS EINGETRETEN) **und wird von dieser Scheibe NICHT gelöst.**

**DIE GRENZE:** Sie kippt in zwei Hälften, je für sich: **(1)** sobald ein Sammel-Weg zum
Neu-Veröffentlichen existiert oder ein ausgeliefertes Artefakt aus der Ferne zu entschärfen
ist; **(2)** sobald der Export-Pfad den Einwilligungs-Schalter trägt. Beides ist heute am Repo
als Nicht-Treffer erhoben.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (E4). Der Export-Befund ist GEMESSEN am Code
(CC, 2026-09-18, VERMERK P11.13-5); die Abwesenheit eines Sammel-Wegs ist GEMESSEN am Code
(CC, 2026-09-14 bis -16, docs/immer-beachten.md, WAS EINMAL IM AUSGELIEFERTEN TEXT STEHT, IST
EINE EINBAHNSTRASSE). **Dass ein Betreiber die Abwesenheit für einen Fehler hält, ist eine
ABLEITUNG und ungemessen.**

### Entscheidung P11.13-29 — DER SACHTEXT REIST ALS ZWEITE PFLICHT-ACHSE, UND „STANDARD" IST EIN BENANNTER ZUSTAND

**`injectPageViewEmitter`, `buildConsentBarScript` UND `buildConsentModalScript` bekommen einen
ZWEITEN Pflicht-Parameter ohne Vorgabewert**, vom Typ **`ConsentText | "standard"`**. Damit
tragen diese drei Signaturen **zwei** Achsen: die Darstellung (P11.13-18) und den Sachtext.

**„STANDARD" IST EIN BENANNTER ZUSTAND UND KEIN FEHLENDES ARGUMENT — DAS IST DER HALBE INHALT
DIESER ENTSCHEIDUNG.** Der Aufrufer muss sich entscheiden; ein Vergessen ist ein
`tsc`-Fehler, keine stille Auslieferung unseres Satzes. **Ein `= CONSENT_TEXT` an der Signatur
ist ausgeschlossen** — genau der Vorgabewert, den P11.13-11 verbietet, und er liesse einen
künftigen Auslieferungsweg den Betreiber-Satz **stillschweigend übergehen**.

**Entscheidung P11.13-11 IST ERFÜLLT, NICHT GEDEHNT — UND DAS IST AM WORTLAUT GEPRÜFT.** Sie
verlangt: Pflicht-Parameter **ohne Vorgabewert** an genau diesen drei Stellen, „dieselbe
Bauform, die der Schalter `consentDialog` schon trägt". **Beide Achsen erfüllen das einzeln.**
**WAS DORT ÜBER DIE ZAHL STEHT, IST EINE BESCHREIBUNG UND KEINE AUFLAGE, und der Satz gehört
hierher, weil er sonst beim nächsten Lesen als Verbot gelesen wird** (GELESEN am Wortlaut, CC,
2026-09-18): P11.13-11 sagt, der Pflicht-Parameter habe „lediglich seine GESTALT gewechselt …
**nicht seine Zahl**", und P11.13-18 sagt „diese Entscheidung ändert seine GESTALT, nicht seine
Zahl … es gibt keinen zweiten Parameter". **BEIDE SÄTZE BESCHREIBEN, WAS IN DER SCHEIBE 11.13c
GESCHEHEN IST — sie verbieten nichts.** P11.13-18 sagt zudem ausdrücklich, die Frage nach einer
zweiten Pflicht-Achse stelle sich **für die Farben** nicht mehr; über einen anderen Gegenstand
sagt sie nichts.

**VIER VERWORFENE GESTALTEN, je mit ihrem Grund — sie stehen hier, damit die nächste Runde
nicht bei null beginnt:**
- **Sachtext als Feld der Darstellungs-Union.** VERWORFEN: **Er ist orthogonal zur
  Darstellung.** Er müsste in **alle vier** Zweige geschrieben werden, viermal dasselbe Feld,
  und die Union hiesse dann nicht mehr „Darstellung". P11.13-18 begründet die Union damit, dass
  sie einen **unmöglichen Zustand** ausschliesst — beim Sachtext gibt es keinen solchen
  Zustand auszuschliessen, die Union trüge ihn ohne Gegenwert.
- **Eine neue Hülle `{ appearance, text }`.** VERWORFEN: der **grösste Diff ohne Mehrwert**;
  die Union verlöre ihre Diskriminante an einen Träger.
- **`ConsentText | null` statt `| "standard"`.** VERWORFEN: **`null` benennt nichts.** Es heisst
  nicht von selbst „nimm unseren Satz", und der nächste Leser muss raten, ob es „kein Text",
  „nicht gesetzt" oder „absichtlich leer" bedeutet.
- **Der Aufrufer setzt `CONSENT_TEXT` selbst ein.** VERWORFEN: Dann kennt `publishProject`
  unseren Wortlaut, und die **Zuordnung „Standard = `CONSENT_TEXT`" stünde an zwei Orten** —
  die Divergenz-Bauform, gegen die in dieser Phase schon mehrere Entscheidungen stehen.

**DER PREIS IST GENANNT UND ANGENOMMEN:** Jede bestehende Aufrufstelle der drei Funktionen
ändert ihre Form. **Die Änderung ist compiler-geführt und namentlich gemeldet**; keine Stelle
kann übersehen werden. **DIE ZAHL WIRD VOR DEM LAUF NEU ERHOBEN und steht hier ausdrücklich
NICHT** — zwei Messungen desselben Tages (39 · 18 · 17 in P11.13-18 und 43 · 21 · 19 in der
Aufklärung 11.13d) laufen über **verschiedene Achsen** und sind nicht vergleichbar; eine dritte
Zahl daneben wäre die zweite Wahrheit.

**DIE GRENZE IST AM 2026-09-18 EINGETRETEN UND ENTSCHIEDEN.**
**DIE DRITTE ACHSE IST DIE SPRACHE (Scheibe 11.13e), UND DIE ABWÄGUNG IST GEFÜHRT:
Entscheidung P11.13-32 wählt die HÜLLE.** Der Einwand, der die Hülle hier fallen liess — „die
Union verlöre ihre Diskriminante an einen Träger" —, **entfällt**: Die Darstellungs-Union
bleibt, was sie ist, und wird ein FELD der Hülle; ihre Diskriminante ist unberührt. **DIESER
EINTRAG IST DAMIT NICHT ÜBERHOLT, SONDERN EINGELÖST** — seine vier verworfenen Gestalten
bleiben mit ihren Gründen stehen und sind der Ausgangspunkt jener Abwägung gewesen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (G2). Die Wortlaut-Prüfung an P11.13-11 und
P11.13-18 ist GELESEN am Dateitext (CC, 2026-09-18). Die zwei Aufrufzahlen sind GEMESSEN
(CC, 2026-09-18) und ausdrücklich als **nicht vergleichbar** ausgewiesen. **Dass ein
`tsc`-Fehler jede Stelle namentlich meldet, ist eine Eigenschaft des Typsystems und am Repo
nicht gemessen** — der erste Beleg ist der `tsc`-Lauf der Bau-Scheibe.

### Entscheidung P11.13-30 — DER WÄCHTER SITZT AM ERGEBNIS, NICHT AM QUELLTEXT

**JEDE STELLE, AN DER EIN BETREIBER-WERT IN SCRIPT-ROHTEXT EINGEBETTET WIRD, BEKOMMT EINEN
WÄCHTER ÜBER DAS ERGEBNIS:** Die feindliche Nutzlast geht durch die **echte** Einsetzstelle,
und geprüft wird der **erzeugte Text** — kein `<` im Rumpf, die Zahl der `</script>` unverändert.
Das ist die Bauform von L3 und M3, auf jede Betreiber-Achse ausgedehnt.

**EIN QUELLTEXT-WÄCHTER IST VERWORFEN, UND DER GRUND IST EINE DAUERREGEL:** Ein Wächter, der in
den vier Dialog-Erzeugern das Wort `JSON.stringify` verbietet, **sieht Zeichen, nicht
Bedeutung** (docs/immer-beachten.md, EIN WÄCHTER ÜBER QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG).
Er träfe die **Prosa in den Kopfkommentaren** — `consent-choice.ts`, `consent-bar.ts` und
`consent-modal.ts` nennen `JSON.stringify` heute je mindestens einmal im erklärenden Text
(GEMESSEN am Code, CC, 2026-09-18) —, und er zwänge damit eine Umformulierung genau der
Kommentare, die die Bauform erklären. **DAS IST DIE FEHLERKLASSE „EIN WÄCHTER ÜBER ZEICHEN DARF
DIE GESTALT DES GEPRÜFTEN NICHT BESTIMMEN"** (docs/immer-beachten.md), und sie ist in diesem
Projekt schon einmal eingetreten — in der Scheibe 11.8c wurde der Import-Wächter an einer
Prosa-Erwähnung rot.

**WAS DER ERGEBNIS-WÄCHTER NICHT LEISTET, UND DER SATZ MUSS MIT, SONST WIRD ER FÜR MEHR
GEHALTEN, ALS ER IST: ER DECKT NUR STELLEN, DIE EIN TEST TATSÄCHLICH BEFÜLLT.** Eine NEUE
Einbettung ist **by default ungedeckt** — dieselbe Figur wie bei den namentlichen IDOR-Wächtern
und bei `settingsEqual` als Allowlist. **Die Konvention aus Entscheidung P11.13-25, Stufe (2),
ist deshalb im Docblock des Helfers festgehalten und nicht in einem Gate**: Sie ist eine
Handschrift, die man liest, kein Riegel, der hält.

**DIE GRENZE:** Sie kippt, **sobald ein Wächter die BEDEUTUNG statt der Zeichen befragen kann**
— etwa eine Lint-Regel über den Aufrufgraphen, die sieht, dass ein Wert ohne den Helfer in
einen Template-String geht. Für `JSON.stringify` gibt es das heute nicht: Es ist ein Global und
kein Import, es gibt also keinen Graphen zu befragen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (G3). Die Prosa-Erwähnungen in den drei Dateien
sind GEMESSEN am Code (CC, 2026-09-18); der Fall aus der Scheibe 11.8c ist GELESEN an
docs/immer-beachten.md (CC, 2026-09-18). **Dass ein Ergebnis-Wächter eine neue Einbettung nicht
deckt, ist eine ABLEITUNG aus seiner Bauform, keine Messung.**

### Entscheidung P11.13-31 — DIE WORTLAUTE, VOLLSTÄNDIG FREIGEGEBEN

**ALLE ELF TEXTPLÄTZE TRAGEN AB HEUTE EINE OWNER-FREIGABE, IN BEIDEN SPRACHEN.** Die
deutschen Wortlaute bleiben **ZEICHENGLEICH**; die drei bisher unfreigegebenen deutschen
Plätze sind **nachträglich freigegeben**. Die englischen sind neu.

**DIE ENGLISCHE TABELLE — WÖRTLICH:**

| Platz | Symbol | EN |
|---|---|---|
| Sachtext (Standard) | `CONSENT_TEXT` | `This site can use tracking services. You decide whether that happens.` |
| Akzeptieren | `CONSENT_ACCEPT_LABEL` | `Accept all` |
| Speichern | `CONSENT_SAVE_LABEL` | `Save selection` |
| Ablehnen | `CONSENT_REJECT_LABEL` | `Reject all` |
| Weg | `CONSENT_WAY_LABEL` | `Settings` |
| Gruppen (aria) | `CONSENT_GROUPS_LABEL` | `Categories` |
| Messung | `CONSENT_GROUP_MEASURE_LABEL` | `Analytics` |
| Werbung | `CONSENT_GROUP_ADS_LABEL` | `Advertising` |
| Leiste/Fenster (aria) | `CONSENT_BAR_REGION_LABEL` / `CONSENT_MODAL_DIALOG_LABEL` | `Consent` |
| Widerruf-Warnung | `CONSENT_REVOKE_WARNING` | `pagesmithConsentRevoke: No stored decision to revoke. If the dialog is currently open, decide there.` |

**DIE ZWEI aria-NAMEN TEILEN DENSELBEN ENGLISCHEN WORTLAUT**, wie sie heute denselben
deutschen teilen — es bleiben ZWEI Konstanten, kein gemeinsames Symbol.

**NACHTRÄGLICH FREIGEGEBEN, DEUTSCH, UNVERÄNDERT:** `Alle akzeptieren`
(`CONSENT_ACCEPT_LABEL`) · `Einstellungen` (`CONSENT_WAY_LABEL`) · `Einwilligung`
(`CONSENT_BAR_REGION_LABEL` **und** `CONSENT_MODAL_DIALOG_LABEL`, beide Vorkommen).
**DAMIT SCHLIESST SICH DIE LÜCKE, DIE VERMERK P11.13-9 MISST:** Vor dieser Entscheidung
trugen vier der elf Plätze keine Freigabe.

**DIESE WORTLAUTE SIND OWNER-ENTSCHEIDUNGEN, KEINE CODE-BEFUNDE.** Sie werden
**ZEICHENGENAU** übernommen, **nicht gegen den Bestand geprüft** und **nicht geändert** —
auch nicht in Satzzeichen, Gross- und Kleinschreibung oder Umlauten. Wer einen ändert,
braucht eine neue Freigabe.

**EINE AUFLAGE AN JEDE RUNDE, DIE SIE SCHREIBT, und sie ist kein Formalismus:** Nach dem
Schreiben wird **jeder** Wortlaut **byte-genau** gegen die Freigabe geprüft — mit einem
Werkzeug, nicht per Ansicht. **GRUND:** In der Scheibe 11.13d sind an EINEM Tag **fünfmal**
Escapes in Doku-Text und **dreimal** Zeichen in einer Testdatei still verwandelt worden,
und **alle vier Gates waren dabei grün** (VERMERK P11.13-8, Punkt (f)). Ein stumm
verfälschter Wortlaut ist von einer Freigabe-Abweichung nicht zu unterscheiden.

**DIE GRENZE:** Sie kippt **je Platz**, sobald ein Wortlaut geändert werden soll, und **im
ganzen**, sobald ein zwölfter Textplatz entsteht oder ein dritter Sprachraum dazukommt —
dann fehlt der neuen Zelle eine Freigabe, und keine dieser elf deckt sie.

PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-18 (O6). **Die Wortlaute sind Entscheidungen und am
Repo nicht prüfbar** — prüfbar ist allein, ob sie zeichengenau in der Datei stehen. Der
Freigabe-Stand VOR dieser Entscheidung ist GEMESSEN (VERMERK P11.13-9, Punkt (a)); die
Schreibschäden der Scheibe 11.13d sind GEMESSEN (VERMERK P11.13-8, Punkt (f)).

### Entscheidung P11.13-32 — EINE HÜLLE STATT EINES DRITTEN PARAMETERS

**`injectPageViewEmitter`, `buildConsentBarScript` UND `buildConsentModalScript` bekommen
EINEN Parameter: ein Objekt mit DREI PFLICHT-FELDERN** — Darstellung, Sachtext, Sprache.
**KEIN optionales Feld, KEIN Vorgabewert, an keinem Feld.**

**DIE GRENZE VON Entscheidung P11.13-29 IST EINGETRETEN, UND DAS IST DER ANLASS:** Jene sagt,
bei einer dritten Achse sei „nicht ein dritter Parameter anzuhängen, sondern zu entscheiden,
ob die Achsen eine gemeinsame Hülle brauchen". Die Sprache ist die dritte Achse.

**Entscheidung P11.13-11 GILT UNVERÄNDERT UND JE FELD.** Sie verlangt „Pflicht-Parameter
OHNE VORGABEWERT" an genau diesen drei Stellen; **jedes der drei Felder erfüllt das
einzeln.** Über die ZAHL trifft sie keine Auflage — das hält P11.13-29 bereits am Wortlaut
fest.

**DER GRUND IST EIN KOSTEN-VERGLEICH MIT EINEM ZWEITEN SCHRITT, UND DER ZWEITE TRÄGT:**
Heute kosten Hülle und dritter Parameter **dasselbe** — jede bestehende Aufrufstelle ändert
ihre Form, compiler-geführt und namentlich gemeldet. **BEI DER VIERTEN ACHSE LAUFEN DIE ZWEI
AUSEINANDER:** Die Hülle bekommt ein FELD, der Parameter-Weg einen erneuten Umbau **aller**
Aufrufer. Eine Bauform, die beim ersten Mal gleich teuer ist und beim zweiten billiger,
ist die bessere.

**DER EINWAND AUS P11.13-29 ENTFÄLLT, UND ER IST DER GRUND, WARUM DIESE ENTSCHEIDUNG EIGENS
STEHT:** Dort war eine Hülle `{ appearance, text }` verworfen worden, weil „die Union ihre
Diskriminante an einen Träger verlöre". **DAS TRIFFT DIESE GESTALT NICHT:** Die
Darstellungs-Union bleibt, was sie ist, und wird ein **Feld** der Hülle — ihre Diskriminante
`theme` ist unberührt, und „eigene Farben ohne Farben" bleibt nicht konstruierbar
(Entscheidung P11.13-18).

**WAS SIE NICHT ÄNDERT:** die Auflösung von `"standard"` bleibt im Erzeuger (P11.13-29,
verworfene Gestalt 4 — sonst stünde die Zuordnung an zwei Orten), und `publishProject` lernt
unseren Wortlaut weiterhin nicht.

**DIE GRENZE:** Sie kippt, **sobald ein Feld der Hülle optional werden soll.** Ein optionales
Feld wäre der Vorgabewert durch die Hintertür — genau das, was P11.13-11 verbietet —, und er
liesse einen künftigen Auslieferungsweg eine Achse stillschweigend übergehen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (H1). Dass die Grenze von P11.13-29
eingetreten ist, ist am Wortlaut jener Entscheidung ABLESBAR (GELESEN, CC, 2026-09-18). Die
Aufrufzahlen sind GEMESSEN (VERMERK P11.13-9 und der Plan der Scheibe). **Dass die vierte
Achse mit einer Hülle billiger wird, ist eine ABLEITUNG aus der Bauform und keine Messung.**

### Entscheidung P11.13-33 — EINE TABELLE, EINE ERSCHÖPFENDE VERZWEIGUNG, UND DER DEUTSCHE ZWEIG VERWEIST

**EINE FUNKTION LIEFERT JE SPRACHE EIN TYPISIERTES OBJEKT MIT ALLEN ELF TEXTEN.** Die
Verzweigung über die Sprachwerte steht an **EINER** Stelle und ist **erschöpfend** — mit
`never`-Zweig, der Bauform von `consentThemeCss` (Entscheidung P11.13-8). **Fehlt im
englischen Zweig ein Feld, ist das ein `tsc`-Fehler**, kein Laufzeit-Fehler und kein
fehlender Test.

**DER DEUTSCHE ZWEIG VERWEIST AUF DIE BESTEHENDEN KONSTANTEN — ER SCHREIBT SIE NICHT AB.**
Das ist die tragende Hälfte dieser Entscheidung: Eine Abschrift stünde zweimal im Repo, und
**ein einziges abweichendes Zeichen änderte den ausgelieferten Text, ohne dass ein Gate rot
würde.** Es ist dieselbe Divergenz-Bauform, gegen die in dieser Phase bereits P11.13-25 und
P11.13-29 stehen.

**DER ROHWERT AUS DEM BLOB ERREICHT DEN AUSGELIEFERTEN TEXT NIE** — er wählt einen Zweig,
wie der Themenwert es tut. **DIE SICHERHEITSACHSE DER SCHEIBE 11.13d IST DAMIT NICHT
BERÜHRT**, und das ist der Grund, aus dem die Sprache eine eigene Scheibe ist
(Entscheidung P11.13-24).

**DER WORTLAUT IST UNSER RISIKO, NICHT DAS DES BETREIBERS.** Er kommt aus Entscheidung
P11.13-31 und nirgendwo sonst her.

**DIE GRENZE:** Sie kippt **mit einem dritten Sprachraum** — dieselbe Grenze, die
Entscheidung P11.13-24 bereits nennt. Sie steht hier trotzdem eigens, weil diese Entscheidung
eine ANDERE Frage schliesst: dort der Ort der Scheibe, hier die Gestalt der Tabelle. Ein
dritter Zweig macht den `never`-Zweig zum Compiler-Fehler und ist damit keine stille
Erweiterung — **aber die elf Zellen des neuen Zweigs bräuchten elf neue Freigaben.**

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (H2). Die Bauform ist aus P11.13-8 übernommen;
dass der `never`-Zweig dort einen Compiler-Fehler erzeugt, ist eine Eigenschaft des
Typsystems und **am Repo nicht gemessen** — der erste Beleg ist der `tsc`-Lauf der
Bau-Scheibe.

### Entscheidung P11.13-34 — DER EIGENE SACHTEXT GILT FÜR ALLE SPRACHEN

**EIN FELD, EIN WERT.** Die Sprache ist **fest je Projekt**; ein gespeicherter eigener
Sachtext gilt in jeder Sprache. **`"standard"` löst sich in der GEWÄHLTEN Sprache auf**, und
**der Platzhalter im Editor zeigt den Standard der gewählten Sprache.**

**DER GRUND:** Ein eigener Text je Sprache verlangte zwei Felder oder ein Objekt — und damit
fiele die flache, skalare Ablage aus Entscheidung P11.13-19. Jene nennt genau diesen Fall als
ihre Grenze („sobald ein Farbwert nicht mehr skalar ist … dann braucht `settingsEqual` einen
eigenen Vergleicher"). **Ein Projekt mit fester Sprache braucht die zweite Fassung nicht:**
Wer zwei Märkte bedient, baut zwei Projekte — das ist die Arbeitsweise der Zielgruppe
(ARCHITEKT-ANGABE, s. Entscheidung P11.13-35).

**WAS DAS KOSTET, UND ES WIRD NICHT KLEINGEREDET:** Ein Betreiber, der die Sprache
umstellt und einen eigenen Sachtext gespeichert hat, bekommt **zehn** Texte in der neuen
Sprache und **einen** in der alten. **NICHTS ZEIGT IHM DAS AN.** Der Platzhalter hilft nicht,
weil er nur bei LEEREM Feld sichtbar ist.

**DER PLATZHALTER IST KEIN AUSGELIEFERTER TEXT**, und die Unterscheidung trägt: Er steht in
`PublishView.tsx`, also in der App-Oberfläche, und sein Leser ist der Betreiber. Dass er der
Sprache folgt, ist eine Bedien-Zusage, keine Zusage über den Dialog.

**DIE GRENZE:** Sie kippt, **sobald ein eigener Sachtext je Sprache gefordert ist.** Dann ist
nicht ein zweites Feld anzuhängen, sondern die Ablage nach P11.13-19 neu zu entscheiden — und
mit ihr der `settingsEqual`-Term, der heute skalar ist.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (H3). Dass der eigene Sachtext heute an der
Einsetzstelle immer gewinnt und keine Stelle seine Sprache kennt, ist GEMESSEN am Code (CC,
2026-09-18, VERMERK P11.13-9, Punkt (f)). **Dass ein Betreiber die Sprach-Mischung für einen
Fehler hält, ist eine ABLEITUNG und ungemessen.**

### Entscheidung P11.13-35 — KEINE AUTOMATIK NACH `navigator.language`

**DER DIALOG WÄHLT SEINE SPRACHE NICHT ZUR LAUFZEIT.** Kein `navigator.language`, kein
`document.documentElement.lang`, keine Erkennung irgendeiner Art. Der Betreiber wählt, und
die Wahl steht zur Veröffentlichungszeit fest.

**DREI GRÜNDE, UND DER ZWEITE IST DER TRAGENDE:**
(1) **DIE KOSTEN SIND GEMESSEN UND KLEIN, ALSO TRAGEN SIE DIE ENTSCHEIDUNG NICHT ALLEIN:**
beide Tabellen im Text kosten rund **+185 Bytes je Lade-Block und +329 je Widerruf-Block**
(GEMESSEN, VERMERK P11.13-9, Punkt (d)) — unter 7 Prozent, plus ungemessenen
Verzweigungs-Code. **Wer nur diese Zahl liest, hält die Entscheidung für knapp.**
(2) **SIE IST UNVERTRÄGLICH MIT Entscheidung P11.13-34.** Ein eigener Sachtext liegt in
**einer** Sprache. Schaltete der Dialog je Besucher um, stünde dieser eine Satz mal in der
passenden und mal in der fremden Sprache — **und zwar unvorhersehbar für den Betreiber, der
ihn geschrieben hat.** Eine feste Wahl ist eine Zusage; eine Automatik daneben wäre eine
Lotterie.
(3) **DIE ZIELGRUPPE BAUT JE MARKT EIGENE SEITEN.** Ein Media Buyer, der deutsch und englisch
ausspielt, hat zwei Kampagnen, zwei Seiten und zwei Projekte — nicht eine Seite für beide.

**DAS IST EIN BEFUND MIT KOSTEN, KEIN VORRATS-EINTRAG MIT TRIGGER.** Er wird ausdrücklich
**nicht** unter „Vorrat" geführt: Ein Trigger behauptete, es sei etwas offen. **Es ist
entschieden**, und die Gründe stehen hier vollständig, damit eine spätere Runde dagegen
vortragen kann, statt bei null zu beginnen.

**WAS AUSDRÜCKLICH NICHT GESAGT IST:** dass ein Lesen von `navigator.language` eine
Invariante bräche. **I1 IST AM WORTLAUT NICHT BERÜHRT** — sie verbietet fünf Achsen der
VERÄNDERUNG an einem fremden KNOTEN, und `navigator` ist kein Knoten (GEPRÜFT am Wortlaut,
VERMERK P11.13-9, Punkt (d)). **Für `document.documentElement.lang` liegt der Fall anders:**
Dort wäre ein fremder Knoten zu lesen, und **die erste Nadel von `M12` (`/documentElement/`)
würde rot, während `L12` grün bliebe** — eine gebaute Asymmetrie (VERMERK P11.13-9,
Punkt (e)).

**DIE GRENZE:** Sie kippt, **sobald ein Projekt zwei Sprachen zugleich tragen soll** — also
genau dann, wenn Grund (3) nicht mehr gilt. Dann ist zuerst Entscheidung P11.13-34 neu zu
entscheiden, nicht diese: Ohne eine Antwort auf den eigenen Sachtext je Sprache bliebe Grund
(2) bestehen.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (H4). Die Bytes sind GEMESSEN (CC, 2026-09-18,
VERMERK P11.13-9); der Verzweigungs-Code ist **ungemessen**. **Die Arbeitsweise der
Zielgruppe ist eine ARCHITEKT-ANGABE und in diesem Projekt nicht erhoben.** Die Prüfung von
I1 und der Nadel-Befund sind GEMESSEN bzw. am Wortlaut GEPRÜFT (CC, 2026-09-18).

### Entscheidung P11.13-36 — DAS `lang`-ATTRIBUT STEHT IM SCHATTENBAUM, UND SEIN NACHWEIS IST EIN DIFFERENZ-NACHWEIS

**`.bar` BZW. `.dialog` BEKOMMEN EIN `lang`-ATTRIBUT** — `"de"` oder `"en"`, aus der
gewählten Sprache. **Es steht IM Schattenbaum, an unserem eigenen Element**, nicht am Host
und nicht an einem Knoten der Kundenseite. **Invariante I1 ist unberührt**: Das Attribut wird
an einem EIGENEN Knoten gesetzt.

**DER GRUND:** Ein Textblock ohne Sprachangabe wird von Vorleseprogrammen in der Sprache des
umgebenden Dokuments gesprochen. Auf einer deutschen Kundenseite läse ein Screenreader einen
englischen Dialog deutsch vor — und umgekehrt. **Das Attribut ist die einzige Stelle, an der
die Sprachwahl den Besucher erreicht, ohne dass wir einen fremden Knoten anfassen.**

**DER PREIS IST BEWUSST UND WIRD NICHT VERSTECKT: AUCH DIE DEUTSCHEN BLÖCKE ÄNDERN SICH.**
Die vier Byte-Werte 4 603 / 4 918 / 5 051 / 5 366, die über vier Scheiben stabil waren
(VERMERKE P11.13-3, -4, -6, -8, -9), wachsen um die Länge genau dieser Setzung. **DIE
BYTE-GLEICHHEIT DER DEUTSCHEN AUSGABE IST DAMIT KEINE ZULÄSSIGE INVARIANTE MEHR** — und wer
sie trotzdem behauptete, hätte eine Zusage, die der Bau widerlegt.

**AN IHRE STELLE TRITT EIN DIFFERENZ-NACHWEIS, UND ER IST DIE EIGENTLICHE ZUSAGE DIESER
ENTSCHEIDUNG: DER NEUE DEUTSCHE BLOCK IST DER ALTE PLUS GENAU DIE `lang`-SETZUNG — SONST
KEIN ZEICHEN.** Wird die eine Einsetzung aus dem neuen Text entfernt, muss zeichengleich der
alte dastehen, in Bytes und in sha256. **DAS IST STRENGER ALS EINE BYTE-ZAHL**, weil es die
Stelle der Änderung benennt und nicht nur ihre Grösse.

**DIE ZUSICHERUNG WIRD AUS DIESER ENTSCHEIDUNG GESCHRIEBEN, NICHT AUS DEM BAU.** Das ist
keine Formsache: **Vorrat P11.13-2 ist mit dieser Scheibe EINGETRETEN** — sein Trigger lautet
„die nächste Runde, die eine Zusicherung über die UNVERÄNDERTHEIT des Lade-Zweigs gegenüber
einem früheren Stand braucht", und genau die braucht dieser Nachweis. Jener Eintrag nennt die
Auflage mit: „Wer sie braucht, schreibt sie aus der ENTSCHEIDUNG, nicht aus dem Bau — sonst
entsteht der Spiegel, wegen dessen W0 gestrichen wurde."

**DER AUS-FALL BLEIBT BYTE-GLEICH.** Bei `"off"` entsteht kein Oberflächen-Block; dort ändert
sich nichts, und `T-OFF` wie `T1` halten das unverändert.

**DIE GRENZE:** Sie kippt, **sobald das Attribut an einen anderen Knoten wandern soll** — an
den Host oder gar an ein Element der Kundenseite. Der Host liegt AUSSERHALB der
Schattenwurzel; die Messung zur Dauerregel vom 2026-09-15 formuliert enger als I1
(„`setAttribute` setzt zur Laufzeit allein eigene Elemente **im Schattenbaum**"), und jener
Satz wäre dann nicht mehr wörtlich wahr. **Ein Element der Kundenseite ist durch I1 verboten
und keine Auslegungsfrage.**

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (H5). Dass der Dialog heute kein
`lang`-Attribut trägt, ist ein NICHT-TREFFER MIT BENANNTER ACHSE und Positivkontrolle
(GEMESSEN, VERMERK P11.13-9, Punkt (f)). Die vier Ausgangswerte sind GEMESSEN (ebenda,
Punkt (c)). **Dass ein Vorleseprogramm ohne `lang` die Dokumentsprache benutzt, ist eine
Eigenschaft der Plattform und in diesem Projekt NICHT gemessen** — Screenreader sind an
dieser Phase durchgehend ungeprüft (VERMERKE P11.13-2, -4, -6).

### Entscheidung P11.13-37 — UNSERE STANDARD-SACHTEXTE GEHEN DURCH DASSELBE TOR, UND DIE ABLAGE IST FLACH

**JEDER STANDARD-SACHTEXT DER TABELLE WIRD DURCH `readConsentText` GEPRÜFT** — dieselbe
Prüfstelle, dasselbe Zeichen-Tor, dieselbe Grenze N = 300 (Entscheidungen P11.13-26 und
P11.13-27). **NICHT ZUR LAUFZEIT, SONDERN ALS TEST.**

**DER GRUND, UND ER IST EIN GEMESSENER MANGEL:** Das Tor greift heute auf
`settings.consent.text`, also auf **Betreiber-Eingabe**. **UNSER eigener Satz läuft an ihm
vorbei** — weder Zeichen noch Länge werden geprüft. Die gemessene Kante von 416 Codepunkten
(P11.13-27) gilt für ihn genauso; niemand prüft sie. **EIN ENGLISCHER STANDARDSATZ ÜBER 300
ZEICHEN ODER MIT EINEM UNSICHTBAREN ZEICHEN GINGE HEUTE DURCH**, und der Betreiber sähe den
Schaden auf seiner Live-Seite.

**DIE ABLAGE IST FLACH: `settings.consent.language`, Typ `unknown`** — ein sechster Nachbar
von `gate`, `dialog`, `theme`, `colorBackground`, `colorText` und `text`, in **derselben
Bauform** wie der Themenwert (Entscheidung P11.13-6) und die zwei Farben (P11.13-19).
- **DER LESER:** Feld **fehlt** → `"de"`; **gültiger** Wert → er selbst; **jeder andere** →
  `"unknown"`. **`"unknown"` WIRD NIE AUF `"de"` ABGEBILDET** — sonst sähe die abbrechende
  Stelle ihn nie (docs/immer-beachten.md, EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB,
  Folge (a)). **Das fehlende Feld ist dagegen kein Fehler, sondern der heutige Zustand** —
  dieselbe Unterscheidung, die P11.13-26 für den Sachtext zieht.
- **`settingsEqual` BEKOMMT EINEN SKALAREN TERM.** Ohne ihn bliebe `dirty` false, es gäbe
  keinen Text „Ungespeicherte Änderungen", keinen `beforeunload`-Wächter und **kein `confirm`
  beim Projektwechsel** — und nichts würde davon rot. Das ist derselbe gemessene Befund, den
  Vorrat P11.13-1 als KLASSE führt; **dieser Term löst ihn für die Sprache, nicht für die
  Klasse.**
- **DER ABBRUCH IST DER FÜNFTE IN `publishProject`, AM ENDE DER KETTE**, mit **eigener**
  Meldungs-Konstante, **vor** dem Label-Block und **vor** `ensureTrackingKey`. **SEIN TOR IST
  NUR `Dialog != "off"`** — nicht zusätzlich eine Darstellung: Die Sprache wirkt in **jeder**
  Darstellung. **DIE ASYMMETRIE AUS P11.13-7 GILT UNVERÄNDERT.**
- **DIE STELLUNG AM ENDE IST EINE SETZUNG, KEINE ABLEITUNG** — dieselbe wie beim Sachtext:
  Die vier bestehenden Abbrüche hängen teils aufeinander, die Sprache hängt an keinem von
  ihnen. Ans Ende gesetzt, bleibt die bestehende Kette unverändert, und der Eingriff in diese
  Kern-Datei ist rein additiv.

**DER FEHLENDE WÄCHTER FÜR `CONSENT_BAR_REGION_LABEL` WIRD IN DIESER SCHEIBE GEBAUT.** Er ist
in VERMERK P11.13-9, Punkt (b), gemessen: Das Modal hat einen (`M5`), die Leiste keinen.
**Die Scheibe, die diesen Wortlaut in zwei Sprachen führt, ist die, die ihn nicht ungedeckt
lassen darf.**

**DIE GRENZE — ZWEI, JE FÜR SICH:** **(1)** Das Tor-Verfahren entfällt, sobald der Server den
Sprachwert schon beim SPEICHERN prüft und ein unbekannter Wert die Ablage gar nicht erreicht;
heute schreibt `saveProject` `settings` ungeprüft (offener Punkt `saveProject` SCHREIBT
`settings` UNVALIDIERT). **(2)** Die flache Ablage kippt, sobald der Sprachwert nicht mehr
skalar ist — dieselbe Grenze wie bei P11.13-19.

PROVENIENZ: ARCHITEKT-ENTSCHEIDUNG 2026-09-18 (H6). Dass `readConsentText` heute allein auf
`settings.consent.text` greift und unser Standardsatz an ihm vorbeiläuft, ist GEMESSEN am
Code (CC, 2026-09-18, VERMERK P11.13-9). Die Bauform der Ablage und die Folge eines fehlenden
`settingsEqual`-Terms sind aus P11.13-6 und P11.13-19 übernommen und dort gemessen. Die vier
bestehenden Abbrüche und ihre Reihenfolge sind GEMESSEN am Code (CC, 2026-09-18). Der
fehlende Wächter ist GEMESSEN (VERMERK P11.13-9, Punkt (b)).

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

---

## Zuschnitt der Scheibe 11.13b — DAS THEMA (VERDICHTET 2026-09-17)

**STATUS: ABGELAUFEN.** Die Scheibe ist gebaut und live bewiesen — VERMERK P11.13-4,
Bau-Commit `2b288f4`. Der ungekürzte Wortlaut des Zuschnitts steht im Commit `278b28c`,
der des Freigabe-Blocks in `1a21db3`.

**WAS ABGELAUFEN IST — die Titel, ohne Marke** (ohne `###`, damit eine
Überschriften-Suche sie nicht trifft: docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT, Zusatz vom 2026-08-27):
- STATUS: ZUGESCHNITTEN, PLAN FOLGT — später STATUS: FREIGEGEBEN
- GEGENSTAND — die Entscheidungen P11.13-6 bis -10; die Orte bestimmt der Plan
- PFLICHT — DIE HERKUNFT DER TEST-ERWARTUNGEN (aus den Entscheidungen, nicht aus dem Code)
- PFLICHT — DER NACHWEIS DER BYTE-GLEICHHEIT FÜR "light" (alle sieben Werte, "off" allein
  genügt nicht)
- PFLICHT — TESTS FÜR DIE BEDIENUNG (`PublishView.tsx` trug keinen einzigen)
- PFLICHT — DIE MESSUNG AUS ROADMAP (f) VOR DEM GO
- AUSDRÜCKLICH NICHT DAZU
- LIVE-TEST-ANFORDERUNG
- FREIGABE 2026-09-17 — ENTSCHEIDUNGEN ZUM PLAN, mit: F1 — EIN PFLICHT-PARAMETER AN ALLEN
  DREI STELLEN, KEIN VORGABEWERT · F2 — "auto" OHNE SYSTEMEINSTELLUNG DES BESUCHERS IST
  "light", UND DAS IST GEWOLLT · F3 — DER LIVE-SCHRITT "UNBEKANNTER WERT" ENTFÄLLT

**WAS ÜBER DIE SCHEIBE HINAUS BINDET, IST UMGEZOGEN UND STEHT NICHT MEHR HIER:**
**F1 IST ZUR EIGENEN ENTSCHEIDUNG P11.13-11 GEWORDEN** — nicht zu einem Satz an P11.13-8,
**weil sich der Geltungsbereich jener Entscheidung mit jedem neuen Zweig verschiebt** und die
Bauform-Zusage sonst mitverschoben würde, genau dann, wenn eine neue Scheibe die Signaturen
anfasst. **MIT SCHEIBE 3 IST DAS EINGETRETEN:** P11.13-8 hat einen vierten Zweig bekommen und
ist nicht gekippt (P11.13-12); P11.13-11 galt unverändert. **F2 IST IN DER PROBE GEMESSEN** (`auto` unter
emuliertem `light` exakt `light`, unter `dark` exakt `dark`) und steht als Befund in VERMERK
P11.13-4; die Entscheidung dahinter ist Teil von P11.13-9. **F3 IST VOLLZOGEN** — der
Live-Schritt ist entfallen, die Achse tragen PT1, PT2 und UI5.

**DIE FÜNF PFLICHTEN — GESCHLOSSEN, je mit Nachweis und Fundstelle:**
1. **Herkunft der Test-Erwartungen:** eingehalten — die Eigenschafts-Liste in `CSS2`, die
   Palette in `CSS2c`, die Meldungen in `PT1`/`PT4` und die Wertemenge in `TH2` sind aus den
   Entscheidungen niedergeschrieben; die Meldungs-Konstanten stehen in `publish.test.ts` als
   Literal und werden **nicht** aus dem Produktivcode importiert. FUNDSTELLE: VERMERK
   P11.13-4, Mutationstabelle.
2. **Byte-Gleichheit "light":** eingelöst — **alle sieben Werte vorher und nachher
   identisch**, und zwar STRUKTURELL: `consentThemeCss("light")` liefert den leeren String.
   FUNDSTELLE: VERMERK P11.13-4, Tabelle; Test `CSS1`.
3. **Tests für die Bedienung:** eingelöst — **UI1 bis UI5** in `CodeImporter.test.tsx`,
   die erste Abdeckung der Einwilligungs-Fläche überhaupt.
4. **Die Messung aus Roadmap (f):** **GEFAHREN, und sie bestätigt P11.13-8** — eine
   benutzerdefinierte Eigenschaft der Kundenseite kommt trotz `all:initial` im Schattenbaum
   an. FUNDSTELLE: VERMERK P11.13-4; die Provenienz von P11.13-8 ist ERSETZT.
5. **Live-Test-Anforderung:** eingelöst — acht Schritte bestanden, der neunte mit F3
   entfallen. FUNDSTELLE: VERMERK P11.13-4, Live-Nachweis.

**DIE AUSSCHLÜSSE GELTEN FORT** und sind der Zuschnitt der nächsten Scheiben: freie Farben
(Scheibe 3 — sie hat P11.13-8 nicht gekippt, sondern einen vierten Zweig hinzugefügt,
s. P11.13-12) · freier Text samt seiner Sicherheitsachse (Scheibe 4) · die Maskierung
der Pixel-ID (Vorrat P11.13-5, Trigger ist der Zuschnitt der Scheibe 4) · eine Vorschau des
Dialogs im Editor · der Export-Pfad, der unter den Grenzen genannt ist.

PROVENIENZ: Der Zuschnitt und seine Freigabe sind ARCHITEKT mit OWNER-FREIGABE 2026-09-17;
die fünf Antworten sind der gebaute und gemessene Stand desselben Tages (VERMERK P11.13-4).
Die Verdichtung ist CC, 2026-09-17.

---

## Zuschnitt der Scheibe 11.13c — EIGENE FARBEN (VERDICHTET 2026-09-18)

**STATUS: ABGELAUFEN.** Die Scheibe ist gebaut und live bewiesen — VERMERK P11.13-6,
Bau-Commit `1d5ea7d`. Der ungekürzte Wortlaut des Zuschnitts steht im Commit `ead0e4e`.

**EINE STATUSZEILE IST NIE NACHGEZOGEN WORDEN, und das gehört in die Spur:** Der Zuschnitt
trug bis zu dieser Verdichtung „ZUGESCHNITTEN, PLAN VORGELEGT, NICHT FREIGEGEBEN", während
der Bau-Auftrag vom 2026-09-18 den Plan und den Zuschnitt als freigegeben führte. Die
Abweichung ist im Bau-Bericht desselben Tages als **A1** gemeldet und nicht stillschweigend
geändert worden; gebaut wurde gegen den Zuschnitt. **Sie ist hier aufgelöst, nicht gestempelt.**

**WAS ABGELAUFEN IST — die Titel, ohne Marke** (ohne `###`, damit eine
Überschriften-Suche sie nicht trifft: docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT, Zusatz vom 2026-08-27):
- STATUS: ZUGESCHNITTEN, PLAN VORGELEGT, NICHT FREIGEGEBEN
- GEGENSTAND — die vierte Darstellung, zwei Werte, die flache Ablage; die übrigen Orte
  bestimmt der Plan
- DIE ENTSCHEIDUNGEN, DIE IHN TRAGEN (P11.13-12 bis -22, dazu die sieben fortgeltenden)
- Die Invarianten dieser Scheibe — **Z1 bis Z10**, samt der Begründung, warum sie `Z` und
  nicht `I` heissen (`I1` bis `I6` sind im Abschnitt „Was den Zuschnitt bindet" an die
  Invarianten der Phase 11.5 vergeben)
- Ausdrücklich NICHT dazu
- Die Pflichten dieser Scheibe (fünf, mit dem PFLICHT-STOPP über vier gesicherte
  ausgelieferte Texte und den zwei ausdrücklich entfallenen Live-Schritten)
- Die Plan-Fragen — FÜNF GESTELLT, VIER GESCHLOSSEN, EINE HALB

**WAS ÜBER DIE SCHEIBE HINAUS BINDET, STAND VON ANFANG AN NICHT HIER:** Es steht als
**Entscheidung P11.13-12 bis P11.13-22** und ist von dieser Verdichtung unberührt. Die zehn
Invarianten `Z1` bis `Z10` waren Anweisungen AN DIESE SCHEIBE und laufen mit ihr ab; ihre
bleibenden Hälften stehen in den Entscheidungen, auf die sie je zeigten.

**SECHS STELLEN IM PRODUKTIV- UND TESTCODE ZITIEREN EINE `Z`-NUMMER, UND SIE VERLIEREN MIT
DIESER VERDICHTUNG IHREN VOLLTEXT** (GEMESSEN am Repo, CC, 2026-09-18, Achse `Invariante Z`
über `src/`): `settings.ts` (Z1) · `settings.test.ts` (Z8) · `consent-choice.ts` (Z1, Z10) ·
`consent-choice.test.ts` (Z1, Z10). **DIE NUMMERN BLEIBEN AUFLÖSBAR** — die Titel-Liste oben
nennt sie, und der ungekürzte Wortlaut steht im Commit `ead0e4e`. **WAS DAMIT ZU TUN IST,
IST HIER NICHT ENTSCHIEDEN:** Ein Zeiger aus `src/` heraus verlangt einen CODE-Commit
(docs/immer-beachten.md, EINE ABLAGE MIT HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE).
**KEINE EMPFEHLUNG.**

**DIE FÜNF PFLICHTEN — GESCHLOSSEN, je mit Nachweis und Fundstelle:**
1. **Herkunft der Test-Erwartungen:** eingehalten — die Referenzwerte von `CT1` stammen aus
   einer GELESENEN fremden Quelle, die Meldungs-Konstante steht in `publish.test.ts` als
   Literal, die Eigenschafts-Liste und die Ableitung Platz für Platz sind aus den
   Entscheidungen niedergeschrieben (`CSS4`, `CSS5`). FUNDSTELLE: VERMERK P11.13-6, (f).
2. **Vorher-Werte vor dem ersten Eingriff:** erhoben — **neunzehn Werte**, vorher und nachher
   identisch; **Z1 eingelöst**, strukturell über den leeren String von
   `consentThemeCss({theme:"light"})`. FUNDSTELLE: VERMERK P11.13-6, Kopf.
3. **Tests für die Bedienung:** eingelöst — `UI6` bis `UI11` in `CodeImporter.test.tsx`
   (`UI11` aus der Korrektur-Runde, für den GEMISCHTEN Zustand). `PublishView.tsx` hat
   weiterhin keine eigene Testdatei; das bleibt so.
4. **Die Probe:** neu geschrieben, **60 Zustände**, Probeseite mit fokussierbarem Element
   ausserhalb des Dialogs (Auflage Vorrat P11.13-4). FUNDSTELLE: VERMERK P11.13-6, (f).
5. **Live-Test-Anforderung:** **eingelöst, aber NICHT wie zugeschnitten.** Der PFLICHT-STOPP
   über vier gesicherte ausgelieferte Texte ist gefahren — **und das Instrument hat versagt**;
   an seine Stelle trat der Hash der geladenen Skript-Elemente. **DIE ACHSE IST BELEGT, DER
   AUS-FALL NICHT.** FUNDSTELLE: VERMERK P11.13-6, (c).

**DIE PLAN-FRAGE 5 IST GESCHLOSSEN.** Die offenen Namen stehen: Prüfstelle
`readConsentColor`, Leser `getConsentColorBackground`/`getConsentColorText`, Setzer
`setConsentColors`, geprüfter Typ `ConsentColor` (Lesetyp `ConsentColorRead`), Meldung
`CONSENT_COLORS_UNKNOWN_MESSAGE`, Kontrastfunktion `contrastRatio` in der neuen Datei
`src/lib/contrast.ts`. Die vier übrigen Fragen waren schon vor dem Bau durch P11.13-17,
-18, -20 und -21 geschlossen.

**DIE AUSSCHLÜSSE GELTEN FORT** und sind der Zuschnitt der Scheibe 4: **freier Text** samt
eigener Aufklärung und eigener Sicherheitsachse · die **Maskierung der Pixel-ID** (Vorrat
P11.13-5, Trigger ist der Zuschnitt der Scheibe 4) · eine **Vorschau des Dialogs im Editor**
· der **Export-Pfad** · **je eigene Farben für Hell und Dunkel** · eine **server-seitige
Kontrastprüfung**.
**EIN AUSSCHLUSS IST PRÄZISER ZU LESEN, ALS ER DASTAND:** „der Server rechnet nichts und
meldet nichts" galt und gilt dem **KONTRAST-HINWEIS**. Zur ERZEUGUNGSZEIT rechnet der Server
sehr wohl — `bevorzugtesFarbschema` leitet daraus `color-scheme` ab, und ausgeliefert wird
allein ein Schlüsselwort (Entscheidung P11.13-21, Invariante Z7 hielt genau das fest).

PROVENIENZ: Der Zuschnitt ist ARCHITEKT 2026-09-18 auf der Grundlage der Owner-Entscheidungen
O1 bis O3 und der Plan-Entscheidungen F1 bis F7 desselben Tages; die Freigabe ist
ARCHITEKT/OWNER 2026-09-18 (im Bau-Auftrag erklärt, in dieser Datei erst hier vermerkt). Die
fünf Antworten sind der gebaute, gemessene und live geprüfte Stand desselben Tages (VERMERK
P11.13-6). Die Verdichtung ist CC, 2026-09-18.

---

## Zuschnitt der Scheibe 11.13d — FREIER SACHTEXT (VERDICHTET 2026-09-18)

**STATUS: ABGELAUFEN.** Die Scheibe ist gebaut und live bewiesen — VERMERK P11.13-8,
Bau-Commit `a3e286b`. Der ungekürzte Wortlaut des Zuschnitts steht im Commit `d2a008a`.

**DIE STATUSZEILE IST HIER AUFGELÖST UND NICHT GESTEMPELT:** Sie trug bis zu dieser
Verdichtung „ZUGESCHNITTEN, PLAN VORGELEGT, NICHT FREIGEGEBEN", und die Provenienz schloss
mit „Die Freigabe steht aus." — während der Bau-Auftrag vom 2026-09-18 Zuschnitt und Plan als
freigegeben führte. **Die Abweichung ist im Bau-Bericht desselben Tages als A1 gemeldet und
nicht stillschweigend geändert worden; gebaut wurde gegen den Zuschnitt.** Dieselbe
Fehlerklasse und dieselbe Handhabung wie bei der Scheibe 11.13c, wo sie zuerst auftrat.

**WAS ABGELAUFEN IST — die Titel, ohne Marke** (ohne `###`, damit eine Überschriften-Suche
sie nicht trifft: docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER
DATEI MIT VERZEICHNIS NICHT, Zusatz vom 2026-08-27):
- STATUS: ZUGESCHNITTEN, PLAN VORGELEGT, NICHT FREIGEGEBEN
- Gegenstand — der Sachtext UND der Einbettungs-Helfer in EINER Scheibe, mit dem Grund aus
  dem Nachtrag der Roadmap-Zeile 11.13, Punkt (g)
- Die Invarianten dieser Scheibe — **S1 bis S9**, samt der Begründung, warum sie `S` und
  nicht `I` oder `Z` heissen (`I1` bis `I6` sind an die Phase 11.5 vergeben, `Z1` bis `Z10`
  an die Scheibe 11.13c)
- Ausdrücklich NICHT dazu
- Die Pflichten dieser Scheibe (fünf, darunter der Vorher-Wert des unbenannten
  Wiring-Skripts und die Seitenwahl für den Handy-Schritt)
- Die Plan-Fragen — ALLE FÜNF GESCHLOSSEN (2026-09-18)

**WAS ÜBER DIE SCHEIBE HINAUS BINDET, STAND VON ANFANG AN NICHT HIER:** Es steht als
**Entscheidung P11.13-23 bis P11.13-30** und ist von dieser Verdichtung unberührt. Die neun
Invarianten `S1` bis `S9` waren Anweisungen AN DIESE SCHEIBE und laufen mit ihr ab; ihre
bleibenden Hälften stehen in den Entscheidungen, auf die sie je zeigten.

**ACHT STELLEN IM TESTCODE ZITIEREN EINE `S`-NUMMER, UND SIE VERLIEREN MIT DIESER
VERDICHTUNG IHREN VOLLTEXT** (GEMESSEN am Repo, CC, 2026-09-18, Achse `Invariante S[0-9]+`
über `src/`): `publish.test.ts` (S4) · `CodeImporter.test.tsx` (S4) ·
`script-embed.test.ts` (S9, S1) · `consent-bar.test.ts` (S9) · `consent-modal.test.ts` (S9)
· `meta.consent-wire.test.ts` (S9, S1) — viermal S9, je zweimal S1 und S4.
**DAS IST DERSELBE FALL, DEN DIE VERDICHTUNG DER SCHEIBE 11.13c FÜR SECHS `Z`-ZITATE
FÜHRTE**, und er ist beim Schreiben dieser Verdichtung zunächst als NICHT eingetreten
behauptet worden; die Messung hat das widerlegt, bevor der Satz stehenblieb.
**DIE NUMMERN BLEIBEN AUFLÖSBAR** — die Titel-Liste oben nennt sie, und der ungekürzte
Wortlaut steht im Commit `d2a008a`. **WAS DAMIT ZU TUN IST, IST HIER NICHT ENTSCHIEDEN:**
Ein Zeiger aus `src/` heraus verlangt einen CODE-Commit (docs/immer-beachten.md, EINE ABLAGE
MIT HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE). **KEINE EMPFEHLUNG.**
**DIE DREI ZITIERTEN NUMMERN SIND DIE DREI, DIE EINE ZUSAGE TRAGEN** — S1 die
Byte-Gleichheit, S4 die zwei unabhängigen Linien, S9 die gemessenen Nutzlasten. Wer sie
auflöst, findet die Sache je in einer Entscheidung: S1 und S4 in P11.13-25 und P11.13-26,
S9 in VERMERK P11.13-7.

**DIE FÜNF PFLICHTEN — GESCHLOSSEN, je mit Nachweis und Fundstelle:**
1. **Vorher-Werte vor dem ersten Eingriff in `src/`:** erhoben — **zwanzig** Werte (die
   neunzehn aus VERMERK P11.13-6 plus `buildMetaRuntime` mit numerischer Pixel-ID), vorher
   und nachher identisch; Querprobe der zwölf basis-unabhängigen Werte gegen jenen Vermerk
   bestanden, die sieben Ausgabetexte weichen um genau 71 Bytes ab. Basis-HTML byte-genau
   rekonstruiert (249 Bytes). FUNDSTELLE: VERMERK P11.13-8, (e).
2. **Herkunft der Test-Erwartungen:** eingehalten — die Zeichenklassen aus P11.13-26, die
   drei Ausgänge aus demselben Text, die Zähl-Achse aus P11.13-27; die Meldungs-Konstante
   steht in `publish.test.ts` als **Literal**. Die feindlichen Nutzlasten sind die
   **gemessenen** aus VERMERK P11.13-7, wörtlich, einschliesslich der Unterscheidung mit und
   ohne Anführungszeichen (Invariante S9).
3. **N wird gemessen:** gefahren, mit beiden Extremen. **Kante 416, gesetzt 300** — die
   Trennung der zwei Ränge steht seit dieser Scheibe in Entscheidung P11.13-27, die
   deswegen **richtiggestellt** ist. FUNDSTELLE: VERMERK P11.13-8, (e).
4. **Tests für die Bedienung:** eingelöst — `UI12` bis `UI15` in `CodeImporter.test.tsx`.
   `PublishView.tsx` hat weiterhin keine eigene Testdatei; das bleibt so.
5. **Live-Test mit dem Ersatz-Instrument:** eingelöst, **und diesmal hat das Instrument
   getragen** — der Hash der geladenen Skript-Elemente in der Tag-Form. **Sechs Blockwerte
   zeichengleich**, der Aus-Fall **live belegt** (was er für die Scheibe 11.13c nicht war),
   und der feindliche Sachtext live ohne Ausführung bei unveränderter Zahl der
   Script-Elemente. FUNDSTELLE: VERMERK P11.13-8, (a) bis (d).

**DIE AUSSCHLÜSSE GELTEN FORT** und sind der Zuschnitt der Scheibe 5 (11.13e) und späterer
Runden: **die SPRACHE** der zehn übrigen Texte (Entscheidung P11.13-24) · **Zeilenumbrüche
und jede Formatierung** im Sachtext (P11.13-26, Grenze) · eine **URL oder ein Link** im
Dialog · der **EXPORT-PFAD** (P11.13-28) · **`src/lib/generate.ts`** · **`consent-store.ts`,
`consent-setter.ts`, `pageview-emitter.ts` und die übrigen Einbettungen in `meta.ts`**
(P11.13-25, Stufe (3)) · ein **QUELLTEXT-WÄCHTER** gegen rohe Einbettung (P11.13-30) · eine
**Vorschau des Dialogs im Editor**.

**EIN AUSSCHLUSS IST MIT DER SCHEIBE EINGELÖST UND KEIN AUSSCHLUSS MEHR:** „die Maskierung
der Pixel-ID" stand seit der Verdichtung der Scheibe 11.13b als Ausschluss mit dem Trigger
„der Zuschnitt der Scheibe 4". **Sie ist gebaut** — die Pixel-ID läuft über den Helfer, und
Vorrat P11.13-5 ist mit dieser Runde gestrichen.

PROVENIENZ: Der Zuschnitt ist ARCHITEKT 2026-09-18 auf der Grundlage der Owner-Entscheidungen
O4 und O5 und der Architekt-Entscheidungen E1 bis E4 und G1 bis G7 desselben Tages. Die fünf
Antworten sind der gebaute, gemessene und live geprüfte Stand desselben Tages (VERMERK
P11.13-8); die Live-Angaben darin sind OWNER-MESSUNGEN und von CC nicht prüfbar. Die
Verdichtung ist CC, 2026-09-18.

---

## Zuschnitt der Scheibe 11.13e — DIE SPRACHE (VERDICHTET 2026-09-18)

**STATUS: ABGELAUFEN.** Die Scheibe ist gebaut und live bewiesen — VERMERK P11.13-10,
Bau-Commit `0a2dc7b`. Der ungekürzte Wortlaut des Zuschnitts steht in den Commits `9da8129`
(Anlage) und `583999a` (der Nachzug der Freigabe-Provenienz).

**DIE STATUSZEILE IST HIER NICHT NACHTRÄGLICH AUFGELÖST WORDEN** — anders als bei den
Scheiben 11.13c und 11.13d, wo sie zweimal „NICHT FREIGEGEBEN" trug, während der Bau-Auftrag
sie als freigegeben führte. **EINE HÄLFTE MUSSTE TROTZDEM NACHGEZOGEN WERDEN:** Die
Provenienz am Fuss des Zuschnitts trug noch „Die Freigabe steht aus.", während der Kopf
„PLAN FREIGEGEBEN" sagte, und der Bericht der Doku-Runde hatte die Entfernung irrtümlich
gemeldet. Aufgelöst mit `583999a`, nicht gestempelt.

**WAS ABGELAUFEN IST — die Titel, ohne Marke** (ohne `###`, damit eine Überschriften-Suche
sie nicht trifft: docs/immer-beachten.md, EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER
DATEI MIT VERZEICHNIS NICHT, Zusatz vom 2026-08-27):
- STATUS: ZUGESCHNITTEN, PLAN FREIGEGEBEN (ARCHITEKT 2026-09-18; Wortlaute OWNER
  2026-09-18, P11.13-31)
- Gegenstand — die elf Textplätze, die sieben tragenden und die elf fortgeltenden
  Entscheidungen
- Die Invarianten dieser Scheibe — **Q1 bis Q9**, samt der Begründung, warum sie `Q` und
  nicht `I`, `Z` oder `S` heissen (`I1` bis `I6` sind an die Phase 11.5 vergeben, `Z1` bis
  `Z10` an die Scheibe 11.13c, `S1` bis `S9` an die Scheibe 11.13d; die übrigen Buchstaben
  sind Testkennungen)
- Ausdrücklich NICHT dazu
- Die Pflichten dieser Scheibe (sieben, darunter der Differenz-Nachweis als PFLICHT-STOPP
  und die Warnung vor den überholten Vergleichswerten)
- Die Plan-Fragen — ALLE FÜNF GESCHLOSSEN (2026-09-18)

**WAS ÜBER DIE SCHEIBE HINAUS BINDET, STAND VON ANFANG AN NICHT HIER:** Es steht als
**Entscheidung P11.13-31 bis P11.13-37** und ist von dieser Verdichtung unberührt. Die neun
Invarianten `Q1` bis `Q9` waren Anweisungen AN DIESE SCHEIBE und laufen mit ihr ab; ihre
bleibenden Hälften stehen in den Entscheidungen, auf die sie je zeigten.

**ZEHN STELLEN IM PRODUKTIV- UND TESTCODE ZITIEREN EINE `Q`-NUMMER, UND SIE VERLIEREN MIT
DIESER VERDICHTUNG IHREN VOLLTEXT** (GEMESSEN am Repo, CC, 2026-09-18, Achse
`Invariante Q[0-9]+` über `src/`; Positivkontrolle: dieselbe Achse trifft
`Invariante S[0-9]+` und `Invariante Z[0-9]+`): `consent-texts.ts` (Q3, Q4, Q5 und ein
zweites Q4) · `consent-texts.test.ts` (Q5, Q3, Q4, Q8) · `consent-choice.ts` (Q1) ·
`settings.ts` (Q6) · `consent-revoke.test.ts` (Q1) · `consent-bar.test.ts` (Q5) ·
`consent-modal.test.ts` (Q5) · `pageview-emitter.test.ts` (Q2) · `publish.test.ts` (Q5) ·
`CodeImporter.test.tsx` (Q5).
**Nach Nummern: Q5 sechsmal, Q4 dreimal, Q1 und Q3 je zweimal, Q2, Q6 und Q8 je einmal.**
**DAS IST DERSELBE FALL, DEN DIE VERDICHTUNGEN DER SCHEIBEN 11.13c UND 11.13d FÜR SECHS
`Z`- UND ACHT `S`-ZITATE FÜHRTEN.**
**DIE NUMMERN BLEIBEN AUFLÖSBAR** — die Titel-Liste oben nennt sie, und der ungekürzte
Wortlaut steht im Commit `9da8129`. **WAS DAMIT ZU TUN IST, IST HIER NICHT ENTSCHIEDEN:** Ein
Zeiger aus `src/` heraus verlangt einen CODE-Commit (docs/immer-beachten.md, EINE ABLAGE MIT
HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE KEINE). **KEINE EMPFEHLUNG.**
**DIE SIEBEN ZITIERTEN NUMMERN SIND DIE, DIE EINE ZUSAGE TRAGEN** — Q1 der
Differenz-Nachweis, Q2 der Aus-Fall, Q3 der verweisende deutsche Zweig, Q4 die
Vollständigkeit der Tabelle, Q5 die Herkunft der Wortlaute, Q6 die Pflicht-Felder der Hülle,
Q8 das Tor für unsere eigenen Standardsätze. Wer sie auflöst, findet die Sache je in einer
Entscheidung: Q1/Q2 in P11.13-36, Q3/Q4 in P11.13-33, Q5 in P11.13-31, Q6 in P11.13-32,
Q8 in P11.13-37. **Q7 UND Q9 WERDEN VON KEINER STELLE ZITIERT** — sie sind
Abwesenheits-Zusagen (kein Eingriff ausserhalb des Schattenbaums, unberührter Speicher) und
tragen deshalb keinen Kommentar am Ort der Handlung.

**DIE SIEBEN PFLICHTEN — GESCHLOSSEN, je mit Nachweis und Fundstelle:**
1. **Vorher-Werte vor dem ersten Eingriff in `src/`:** erhoben — zwanzig Werte, Basis-HTML
   byte-genau rekonstruiert. **Querprobe der zwölf Blockwerte: 12/12 zeichengleich**, dazu
   zwei weitere Querproben (`buildMetaRuntime`, die 71-Byte-Konstante). FUNDSTELLE: VERMERK
   P11.13-10, (d).
2. **Der Differenz-Nachweis als PFLICHT-STOPP:** gefahren, **18/18**, alle fünf Schritte,
   mit Positivkontrolle; `out off` und `buildMetaRuntime` zeichengleich. **Er hat nicht
   approximiert werden müssen** — die `lang`-Setzung ist als EINE Zeile isolierbar, und der
   stehende Wächter `T10` hält genau diese Vorbedingung. FUNDSTELLE: ebenda, (a) und (d).
3. **Die Wortlaut-Prüfung nach dem Schreiben:** gefahren — **21/21 byte-genau** (zehn EN
   gegen P11.13-31, elf DE gegen ihren Wert VOR dem Umzug), mit Negativkontrolle. Die
   Byte-Kontrolle auf CR ohne LF, LF ohne CR und NUL ist für die zwei NEUEN Dateien **am
   committeten Objekt** gefahren (CR = 0, NUL = 0), mit Positivkontrolle des Instruments.
4. **Tests für die Bedienung:** eingelöst — `UI16` bis `UI19` in `CodeImporter.test.tsx`.
   `PublishView.tsx` hat weiterhin keine eigene Testdatei; das bleibt so.
5. **Der fehlende Wächter für `CONSENT_BAR_REGION_LABEL`:** gebaut — `L25`, über beide
   Sprachen. Er ist das Pendant zu `M5`, das den Fenster-Namen seit 11.5d-2 hält.
6. **Die Probe:** neu geschrieben, **40 Zustände**, Probeseite mit Viewport-Tag und
   fokussierbarem Element ausserhalb, Fehler-Listener vorab. P11.13-3 40/40, P11.13-5 20/20,
   P11.13-4 20/20, `lang` 40/40, null Fehler. FUNDSTELLE: ebenda, (d).
7. **Die Live-Anleitung vergleicht gegen die NEUEN deutschen Werte:** eingehalten — die
   sechs Werte der Anleitung sind die lokal erhobenen Nachher-Werte, und sie sind live
   zeichengleich bestätigt. **Die Falle hat nicht zugeschlagen.** FUNDSTELLE: ebenda, (a).

**DIE FÜNF PLAN-FRAGEN — ALLE GESCHLOSSEN:**
1. **Die `lang`-Setzung ist EINE Zeile** im jeweiligen Aufbau, unmittelbar hinter dem
   `aria-label`. `T10` hält, dass es genau eine ist und dass nach ihrer Entfernung kein
   `lang` mehr im Block steht.
2. **Die drei „anderswo" liegenden Konstanten sind UMGEZOGEN**, nicht importiert — der
   deutsche Zweig kann deshalb gar nicht abschreiben. **Der Umzug kostete nichts:** Sie
   hatten ausserhalb ihrer eigenen Datei keinen Importeur, auch keinen Test.
3. **Die Tabelle liegt in der neuen, importfreien Datei
   `src/lib/tracking/consent-texts.ts`.** Ein Ort in `consent-choice.ts` wäre ein Zyklus
   gewesen (`choice → bar → choice`).
4. **Die Namen stehen:** Hülle `ConsentPresentation` mit `appearance`, `text`, `language`;
   Tabellenfunktion `consentTexts(sprache): ConsentTextTable` mit elf Pflichtfeldern;
   Wertemenge `CONSENT_LANGUAGES`, Leser `getConsentLanguage`, Setzer `setConsentLanguage`,
   Meldung `CONSENT_LANGUAGE_UNKNOWN_MESSAGE`.
5. **Die Beschriftung ist freigegeben** — „Sprache" / „Deutsch" / „Englisch", OWNER
   2026-09-18; s. VERMERK P11.13-10, (e). Sie bleibt App-Oberfläche und fällt nicht unter
   P11.13-31.

**DIE AUSSCHLÜSSE GELTEN FORT:** eine **Automatik** nach `navigator.language` oder
`document.documentElement.lang` (P11.13-35, mit Gründen und Kosten entschieden — kein
Vorrats-Eintrag, kein Trigger) · ein **dritter Sprachraum** (P11.13-24 und -33) · die
**Texte der App-Oberfläche** ausser den drei freigegebenen Beschriftungen · der
**EXPORT-PFAD** (P11.13-28) · **Betreiber-Wortlaut für die übrigen zehn Plätze** (P11.13-23)
· eine **Vorschau des Dialogs im Editor** · ein **eigener Sachtext je Sprache** (P11.13-34).

PROVENIENZ: Der Zuschnitt ist ARCHITEKT 2026-09-18 auf der Grundlage der Owner-Entscheidung
O6 und der Architekt-Entscheidungen H1 bis H6 desselben Tages; die Freigabe ist ARCHITEKT
2026-09-18 für Zuschnitt und Plan, OWNER 2026-09-18 für die Wortlaute. Die sieben Antworten
sind der gebaute, gemessene und live geprüfte Stand desselben Tages (VERMERK P11.13-10); die
Live-Angaben darin sind OWNER-MESSUNGEN und von CC nicht prüfbar. Die Verdichtung ist CC,
2026-09-18.

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

**VERMERK 2026-09-17 — FÜR DEN THEMENWERT EINGELÖST, DIE KLASSE BLEIBT.** Entscheidung
P11.13-6 gibt `settingsEqual` den Term `getConsentTheme(a) === getConsentTheme(b)`; der
Themenwert ist damit für `dirty` sichtbar, obwohl er INNERHALB von `settings.consent` liegt.
**DER EINTRAG WIRD NICHT GESTRICHEN:** Seine Aussage ist die über die KLASSE — jedes weitere
Feld innerhalb des Unterobjekts ist wieder unsichtbar, und der offene Punkt `settingsEqual`
IST EINE ALLOWLIST deckt sie ebenfalls nicht, weil sein Trigger ein TOP-LEVEL-Mitglied
verlangt. **Der Trigger dieses Eintrags bleibt unverändert: der Zuschnitt der Scheibe 2** —
er ist damit EINGETRETEN und für seinen Anlassfall abgearbeitet.

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

### P11.13-5 — DIE PIXEL-ID GELANGT OHNE `<`-MASKIERUNG IN DEN AUSGELIEFERTEN TEXT

**ERLEDIGT AM 2026-09-18 MIT DER SCHEIBE 11.13d. TITEL UND BELEG BLEIBEN, DER VOLLTEXT IST
GESTRICHEN** (docs/arbeitsweise.md, „Wie ein Satz wieder herausgeht"); er ist unter dem
Commit `d2a008a` vollständig nachzulesen.

**DER BELEG DER ERLEDIGUNG, vier Stücke:**
- **BAU-COMMIT `a3e286b`** — die Einsetzstelle lautet seither
  `var PS_PIXEL_ID = ${embedInScript(pixelId)};` (`src/lib/tracking/meta.ts`), und
  `embedInScript` maskiert jedes `<` als Unicode-Escape (Entscheidung P11.13-25, Stufe (1):
  jeder BETREIBER-WERT in Script-Rohtext).
- **`MR1`** (`src/lib/tracking/meta.consent-wire.test.ts`) — die vier gemessenen
  Ausbruchs-Nutzlasten durch die ECHTE Einsetzstelle: die Zahl der `<` bleibt die einer
  harmlosen Kennung, `</script` und `<!--` kommen nicht vor, und der Rundlauf über
  `PS_PIXEL_ID` liefert den Wert unverändert. **`MR2`** hält daneben, dass eine NUMERISCHE
  Kennung zeichengleich eingebettet wird.
- **DIE PROBE** (VERMERK P11.13-8, (e)): vier Läufe mit der Pixel-ID als Nutzlast, je mit
  Kontrolle — `window.__AUSBRUCH` nie gesetzt, **zwei Script-Elemente wie in der Kontrolle**,
  kein `<img>`, das Wiring läuft, null `pageerror`.
- **LIVE, Schritt 5** (VERMERK P11.13-8, (a)): das unbenannte Wiring-Skript mit der echten
  Kennung trägt in allen Läufen **12 251 Bytes / `a3529b57452b`** — zeichengleich zum
  Vorher-Wert. **OWNER-MESSUNG vom 2026-09-18, von CC nicht prüfbar.**

**WAS AUS DEM EINTRAG BESTEHEN BLEIBT UND NICHT MITGESTRICHEN IST:** Die Richtigstellung an
der Roadmap-Zeile 11.13, Punkt (g) — „SCHEIBE 4 IST DIE ERSTE STELLE, AN DER
BETREIBER-EINGABE IN DEN AUSGELIEFERTEN TEXT GELANGT" trifft für den FREIEN TEXT zu, für
Betreiber-Eingabe überhaupt nicht. Sie steht als Nachtrag vom 2026-09-17 an jener Zeile und
ist von dieser Streichung unberührt.

**DIE GRENZE DER MESSUNG BLEIBT EBENFALLS STEHEN:** Der Ausbruch ist in **Chromium** über
`file://` gemessen, an einer Probeseite ohne fremdes CSS; Firefox und WebKit sind an dieser
Achse ungemessen.

### P11.13-6 — EIN SCROLLBALKEN BRICHT DAS GLEICHRANGIGKEITS-KRITERIUM BEI 360 px, UND ZWAR IM BESTAND

Bei **Leiste / 360×480 / eingeklappt / lange Seite** ist `wegTeiltMit === 1` — der Weg teilt
seine Reihe mit GENAU EINEM Knopf, und damit ist **Entscheidung P11.13-5 verletzt**.

**ES IST KEINE REGRESSION DIESER SCHEIBE, UND DAS IST GEMESSEN, NICHT VERMUTET** (Gegenprobe
im selben Werkzeug und im selben Lauf, CC, 2026-09-18):

| Seite | Viewport | Scrollbalken | Leisten-Breite | `wegTeiltMit` |
|---|---|---|---|---|
| **helles Tabellen-Thema, lange Seite** | 360×480 | **15 px** | **345** | **1** ← verletzt |
| helles Tabellen-Thema, kurze Seite | 360×480 | 0 | 360 | 0 |
| custom P1, kurze Seite | 360×480 | 0 | 360 | 0 |

**DAS UNVERÄNDERTE BESTANDS-THEMA ZEIGT DENSELBEN BEFUND.** Ursache ist der Scrollbalken: Er
nimmt 15 px Innenbreite, und bei 345 px passen zwei Knöpfe zu 160 px plus 8 px Abstand
(328 px) zwar noch — der Weg aber nicht mehr daneben, sodass die Reihen anders brechen.
**P11.13-5 NENNT DIE BEDINGUNG SELBST:** „Sie ruht auf der heutigen Knopfbreite von 160 px und
der heutigen **Innenbreite** der zwei Behälter." Ein Scrollbalken ändert die Innenbreite.

**WARUM ES BISHER NIEMAND SAH:** Die Probeseiten der Scheiben 11.13a und 11.13b **scrollten
nicht**. Der Befund entsteht erst mit einer Probeseite, die lang genug ist.

**WEN ES TRIFFT — UND WEN NICHT:** **schmale Desktop-Fenster**, die einen Platz nehmenden
Scrollbalken zeichnen. **Handys zeichnen einen Überlagerungs-Scrollbalken** und nehmen keine
Breite; dort tritt es nicht auf. Das ist eine ABLEITUNG aus der Plattform-Bauform und in
diesem Projekt **nicht gemessen**.

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die an der Breite der Knöpfe, an der
Innenbreite der Behälter oder am Umbruch der eingeklappten Gestalt arbeitet.** Ob überhaupt
etwas geschieht, ist **nicht entschieden** — die Kandidaten reichen von „Bedingung des
Kriteriums schärfen" bis „Knopfbreite flexibel". **KEINE EMPFEHLUNG.**

**NACHGEMESSEN IN DER SCHEIBE 11.13e — REPRODUZIERT, UND IN BEIDEN SPRACHEN GLEICH** (GEMESSEN
am eigenen Lauf, CC, 2026-09-18, Playwright/Chromium über `file://`, lange Probeseite):

| Form | Sprache | Viewport | Scrollbalken | Innenbreite | Weg-Breite | `wegTeiltMit` |
|---|---|---|---|---|---|---|
| Leiste | de | 360×480 | 15 px | **345** | 115 | **1** ← verletzt |
| Leiste | en | 360×480 | 15 px | **345** | 82 | **1** ← verletzt |
| Leiste | de / en | 390×560 | 15 px | 375 | 115 / 82 | 0 |
| Fenster | de / en | 360×480 · 390×560 | 15 px | 313 / 343 | 279 / 309 | 0 |

**DAS IST DER EIGENTLICHE ZUWACHS DIESER MESSUNG: DIE SPRACHE ÄNDERT DEN BEFUND NICHT.** Die
englische Weg-Beschriftung ist **33 px schmaler** (82 gegen 115), und `wegTeiltMit` bleibt
trotzdem 1 — der Bruch hängt an der Innenbreite von 345 px und an der Knopfbreite von
160 px, nicht an der Länge des Weg-Textes. **DIE SCHEIBE 11.13e HAT IHN ALSO WEDER ERZEUGT
NOCH VERSCHÄRFT NOCH BEHOBEN**; sie ist an ihm vorbeigelaufen.
**DER EINTRAG BLEIBT OFFEN.** Sein Trigger ist unverändert, und diese Messung ist kein
Ersatz für eine Entscheidung — sie belegt nur, dass er über zwei Sprachen stabil ist.

PROVENIENZ: die drei Zeilen der Gegenprobe GEMESSEN am eigenen Lauf (CC, 2026-09-18,
Playwright/Chromium); der Wortlaut von P11.13-5 GELESEN in dieser Datei. Dass Handys einen
Überlagerungs-Scrollbalken zeichnen, ist eine ABLEITUNG und ungemessen.

### P11.13-7 — `git stash` DREHT DIE ZEILENENDEN EINER `w/crlf`-DATEI, UND DIE GATES MELDEN NICHTS

Für die Vorher-Testzahl lief `git stash push -- src/` / `git stash pop`.
`src/components/PublishView.tsx` liegt im Arbeitsbaum als **CRLF**, der Index steht auf
`eol=lf`; **nach dem `pop` stand die Datei auf CR=0.** Von sechzehn Dateien meldete
`sha256sum -c` **eine** als FAILED.

**GEFANGEN UND BEHOBEN:** Als reine Zeilenenden-Sache nachgewiesen — LF→CRLF zurückgerechnet
ergibt exakt den Vor-Stash-sha `07a8a4af…` —, wiederhergestellt, danach **16 von 16 OK**
(GEMESSEN, CC, 2026-09-18).

**DAS IST DIE FEHLERKLASSE DER DAUERREGEL „WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG
STILL DAS CR"** (docs/immer-beachten.md) — dort steht ausdrücklich, die Reichweite sei die
WIRKUNG und nicht das Kommando im Titel: „Die Frage lautet nie ‚steht es in der Aufzählung?',
sondern ‚schreibt es die ganze Datei?'". **`git stash` steht in keiner ihrer Aufzählungen**,
und es schreibt die ganze Datei.
**WAS DIE REGEL HIER NICHT LEISTET:** Ihre vorgeschriebene Prüfung ist `git status` plus der
Ausschluss leerer Diffs — **die hätte hier nichts gemeldet**, weil der Diff gerade nicht leer
ist. Gefangen hat es allein der `sha256sum`-Rundlauf über die berührten Dateien.

**DIE ZWEI DATEIEN, DIE ES BETRIFFT, SIND BEKANNT** (`git ls-files --eol`: `i/lf w/crlf`):
`src/components/PublishView.tsx` und `src/app/projects/publish.test.ts`. **Im weiteren Verlauf
der Scheibe ist kein `git stash` mehr benutzt worden.**

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die eine Vorher-Zahl über einen
`git stash`-Rundlauf erhebt** — oder die entscheidet, ob daraus eine Ergänzung der Dauerregel
wird. **Das ist eine Frage des Phasenendes; hier wird sie nicht entschieden.**

PROVENIENZ: der Vorgang GEMESSEN am eigenen Lauf (CC, 2026-09-18); der Wortlaut der
Dauerregel GELESEN in docs/immer-beachten.md (CC, 2026-09-18).

### P11.13-8 — AUF EINER SEITE OHNE VIEWPORT-TAG IST DER DIALOG AUF MOBIL UNLESBAR KLEIN

Die Testseite `meta-test-5nlm3e` trägt **kein `<meta name="viewport">`** (OWNER-ANGABE
2026-09-18, Volltextsuche im Browser; **bestätigt an den hochgeladenen Dateien: 0 Treffer**,
ARCHITEKT-PRÜFUNG desselben Tages). Ohne das Tag legt der mobile Browser eine breite
Ersatz-Fläche zugrunde und skaliert die ganze Seite herunter — **der Dialog wird mit ihr
klein, bis zur Unlesbarkeit.**

**ES IST KEIN BEFUND ÜBER DIESE SCHEIBE UND ÜBER KEINE DARSTELLUNG:** Es trifft jede Seite
ohne das Tag, jede Form und jedes Thema gleichermassen. **Ein Produktbefund, keine
Regression.**

**WIR FÜGEN DAS TAG NICHT EIN**, und der Grund ist eine Dauerregel: **KEIN BAUSTEIN DES
AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN AN** (docs/immer-beachten.md).
Ein `<meta>` in den `<head>` der Kundenseite zu schreiben ändert das Layout der GANZEN Seite,
nicht nur unseres Dialogs — das ist der grösstmögliche Eingriff an fremdem Gut und wäre für
den Betreiber nicht vorhersehbar.

**DENKBAR IST EIN HINWEIS BEIM IMPORT** — die Seite trägt kein Viewport-Tag, auf Mobilgeräten
wird sie herunterskaliert. **DAS IST EIN KANDIDAT UND KEINE ENTSCHEIDUNG; KEINE EMPFEHLUNG**,
weder zu Ort noch zu Form noch dazu, ob überhaupt etwas gebaut wird.

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die am Import oder an einer Prüfung
der importierten Seite arbeitet.**

PROVENIENZ: das Fehlen des Tags ist OWNER-ANGABE mit ARCHITEKT-PRÜFUNG (2026-09-18); die
Wirkung auf Mobilgeräten ist eine **ABLEITUNG** aus dem Verhalten mobiler Browser und in
diesem Projekt **nicht gemessen**. Die Dauerregel GELESEN (CC, 2026-09-18).

### P11.13-9 — ZWEI BEFUNDE AN DER EDITOR-OBERFLÄCHE DES FARBFELDS

**BEIDE SIND EDITOR-OPTIK, NICHT AUSGELIEFERTER TEXT** — sie berühren keine Invariante dieser
Scheibe und keinen Besucher.

**(a) DIE KLICKFLÄCHE DES FARBFELDS REICHT ÜBER DIE ZEILE.** Ein Klick neben dem Feld öffnet
den Wähler. **VERMUTUNG: ein umschliessendes `label`** — die Beschriftung ist über
`aria-label` und ein Label verbunden, und ein umschliessendes Label macht seine ganze Fläche
klickbar. **Am Code NICHT nachgesehen** in dieser Runde.

**(b) DER NATIVE FARBWÄHLER ÖFFNET IN RGB.** Der Betreiber denkt in Hex; der Wähler startet in
einer anderen Darstellung. **OB DER STARTMODUS AUS DER SEITE HERAUS SETZBAR IST, IST
UNGEPRÜFT** — die Vermutung lautet nein, und sie ist eine Vermutung.
**EIN WEG, DER OHNE DIESE FRAGE AUSKOMMT:** ein zusätzliches Hex-Textfeld neben dem Wähler,
**durch DASSELBE Format-Tor** (Entscheidung P11.13-14). Es bräuchte keine zweite Prüfstelle
und keine zweite Zusicherung — der Leser ist schon da. **DAS IST EIN KANDIDAT UND KEINE
ENTSCHEIDUNG.**

**BEIDES WARTET AUF DIE NEUGESTALTUNG DER OBERFLÄCHE**, die ohnehin ansteht; wer sie fährt,
fasst beide Punkte mit an, statt sie einzeln nachzuziehen.

**KEIN EIGENER TRIGGER AUSSER DIESEM: die Neugestaltung der Editor-Oberfläche, spätestens die
nächste Runde, die am Farbfeld arbeitet.**

PROVENIENZ: beide Beobachtungen sind OWNER-BEFUNDE vom 2026-09-18, vom Architekten
weitergegeben. Die Ursache in (a) und die Nicht-Setzbarkeit in (b) sind **VERMUTUNGEN**, in
dieser Runde weder am Code noch am Browser geprüft.

### P11.13-10 — DER AUSGEKLAPPTE ZUSTAND WIRKT ÜBERLADEN

**OWNER-BEFUND:** Nach dem Ausklappen stehen zwei Kästchen und drei Knöpfe zugleich da; das
wirkt voll. **Es ist ein Urteil über die GESTALT, kein Fehler** — die Gestalt ist die
zugesagte.

**DIE ÄNDERUNG IST NICHT FREI, UND DAS IST DER EIGENTLICHE INHALT DIESES EINTRAGS:**
**Entscheidung P11.13-1 bindet den ausgeklappten Zustand AUSDRÜCKLICH an die alte Gestalt** —
„ausgeklappt nach dem Klick: EXAKT DIE HEUTIGE GESTALT". Ihr Grund ist, dass genau dieser
Zustand der bereits gemessene ist und die ungemessene Achse aus Roadmap (e) damit nicht
entsteht. Und sie nennt ihre Grenze selbst: **sie kippt, sobald der ausgeklappte Zustand mehr
trägt als heute** — von WENIGER sagt sie nichts, und eine Wegnahme ist deshalb nicht
automatisch gedeckt.

**DIE NAHELIEGENDE WEGNAHME IST DIE HEIKELSTE:** Dürfte „Ablehnen" auf der zweiten Ebene
entfallen, weil es schon auf der ersten steht? **Das ist gegen Entscheidung P11.13-5 und gegen
den Guardrail der Roadmap-Zeile 11.13, Punkt (h), abzuwägen** — die visuelle Gleichrangigkeit
von „Alle akzeptieren" und „Ablehnen" ist dort verankert, und ein „Alle akzeptieren" ohne sein
Gegenstück auf derselben Ebene ist genau die Bauform, die der Guardrail ausschliesst.

**DAS IST EINE EIGENE ENTSCHEIDUNG UND WIRD HIER NICHT GETROFFEN. KEINE EMPFEHLUNG.**

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die die Gestalt des ausgeklappten
Zustands anfasst.**

PROVENIENZ: der Befund ist OWNER-ANGABE vom 2026-09-18, vom Architekten weitergegeben; die
Bindung und ihre Grenze sind GELESEN an Entscheidung P11.13-1 dieser Datei (CC, 2026-09-18),
der Guardrail an docs/roadmap.md, Roadmap-Zeile 11.13, Punkt (h).

### P11.13-11 — DER KONTRAST-HINWEIS BLEIBT NACH DEM SPEICHERN STEHEN

**OWNER-BEFUND 2026-09-18:** Wer ein Paar unter der Schwelle speichert, sieht den Hinweis
danach weiter.

**ARCHITEKT-EINORDNUNG: DAS IST KORREKT UND KEIN FEHLER.** Der Hinweis beschreibt **keinen
abgeschlossenen Versuch**, sondern einen **ZUSTAND** — und dessen Bedingung ist nach dem
Speichern noch wahr. Die Dauerregel WELCHE REGEL WANN GREIFT: BEKOMMT DIESER FEHLER EIN
BLEIBENDES SIGNAL? nennt genau dieses Kriterium: bleibend ist, was beim nächsten Hinsehen noch
gilt. **Ein Hinweis, der beim Speichern verschwände, verschwände beim Hinschauen statt beim
Lösen.**

**DIE RICHTUNG FÜR SPÄTER, und sie betrifft den TON, nicht das Bleiben:** ruhiger, **kein
Rot** — Rot liest sich als Fehler und als Sperre, **und der Hinweis sperrt nichts**
(Entscheidung P11.13-16). Er nennt Wert und Schwelle und sagt ausdrücklich, dass
Veröffentlichen möglich bleibt; seine Farbe soll das nicht widerlegen.

**AUSDRÜCKLICH NICHT ENTSCHIEDEN:** welche Farbe, welche Form, ob überhaupt etwas geändert
wird. **KEINE EMPFEHLUNG.**

**KEIN EIGENER TRIGGER AUSSER DIESEM: die nächste Runde, die am Kontrast-Hinweis oder an der
Farbgebung der Editor-Hinweise arbeitet.**

PROVENIENZ: der Befund ist OWNER-ANGABE vom 2026-09-18; die Einordnung ist
ARCHITEKT-ENTSCHEIDUNG desselben Tages, beide vom Architekten weitergegeben. Die Dauerregel
und Entscheidung P11.13-16 GELESEN (CC, 2026-09-18).

---

## Hebungs-Kandidaten

Dieser Abschnitt stand bis zum 2026-09-18 auf „Keine."; er steht, damit die Klasse beim
Phasenende nicht übersehen wird.

### (1) EIN LIVE-NACHWEIS ÜBER AUSGELIEFERTEN TEXT MISST IN DER GELADENEN SEITE, NICHT AN EINER GESPEICHERTEN DATEI

**DIE AUSSAGE:** Wer live belegen will, WAS eine Seite tatsächlich ausliefert, misst **im
laufenden Dokument** — nicht an einer Datei, die ein Browser-Befehl daneben ablegt. Eine
gespeicherte Datei ist ein zweites Artefakt mit eigenem Weg; sie kann aus einem
Zwischenspeicher stammen, und **sie sagt das nicht.**

**DER BELEG (VERMERK P11.13-6, (c)):** „Speichern unter" lieferte **zehn** Dateien für **zehn
verschiedene Zustände** — alle **14 385 Bytes**, alle sha256 `2de7db6db78f001a…`, alle **ohne
jeden Dialog-Baustein**, während der Dialog eingestellt, veröffentlicht und auf dem Bildschirm
**sichtbar** war. **DER VORHER/NACHHER-VERGLEICH DIESER DATEIEN BELEGT NICHTS** — und er sah
wie ein Beleg aus.

**WAS ES TEUER MACHT: DER FEHLSCHLAG IST STILL UND SIEHT WIE EIN BEFUND AUS.** Die Dateien
waren lesbar, gleich gross und untereinander vergleichbar; nur die Positivkontrolle
(`__ps_pve` und `pagesmith-consent` je 1 Treffer bei 0 Treffern auf jeden Dialog-Baustein) hat
gezeigt, dass etwas nicht stimmen KANN. **Ohne sie wäre „der Dialog steht nicht im
ausgelieferten Text" als Befund protokolliert worden.**

**ES IST KEIN EINZELFALL:** Der Owner meldet dieselbe Zwischenspeicher-Erfahrung als
**wiederkehrend** (OWNER-ANGABE 2026-09-18).

**DAS ERSATZ-INSTRUMENT STEHT IM WORTLAUT** in VERMERK P11.13-6, (c) — der Hash der geladenen
Skript-Elemente in der Konsole der Live-Seite, verglichen in der **Tag-Form**. Es misst im
geladenen Dokument und hat die Achse in derselben Runde belegt.

**NICHT ENTSCHIEDEN:** ob daraus eine **EIGENE Regel** wird oder ein **ABSATZ an „EINE
ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND"** (docs/immer-beachten.md).
**Für einen Absatz spricht**, dass dort genau diese Denkfigur steht — ein Nicht-Treffer, den
der Gegenstand nicht hergibt — und dass eine dritte Regel auf derselben Achse die
Trefferwahrscheinlichkeit senkt. **Für eine eigene spricht**, dass jene Regel den
WERKZEUGWECHSEL innerhalb derselben Quelle verlangt, während hier die **QUELLE selbst** eine
falsche war: kein Werkzeugwechsel an der Datei hätte den fehlenden Text zutage gefördert.
**KEINE EMPFEHLUNG.**

**KEIN EINTRAG IN docs/immer-beachten.md IN DIESER RUNDE** — die Hebung ist Sache des
Phasenendes.

PROVENIENZ: die zehn Dateien, ihre Grösse, ihr sha256 und die Trefferzahlen sind eine
ARCHITEKT-PRÜFUNG vom 2026-09-18 an den hochgeladenen Dateien; dass der Dialog dabei sichtbar
war und dass die Erfahrung wiederkehrend ist, sind OWNER-ANGABEN desselben Tages — **CC kann
beides nicht prüfen.** **Die Ursache ist UNGEMESSEN.** Der Volltext der Nachbarregel GELESEN
in docs/immer-beachten.md (CC, 2026-09-18).

### (2) SCHREIBWERKZEUGE VERÄNDERN IN DIESER UMGEBUNG STILL BYTES, UND KEIN GATE MELDET ES

**DIE AUSSAGE:** Wer in diesem Projekt eine Datei schreibt — mit dem Editier-Werkzeug, über
einen Heredoc, über ein Skript oder über `git stash` —, muss damit rechnen, dass **Zeichen
verändert ankommen, die niemand angefasst hat**. Der Bau der Scheibe 11.13d hat das an
**drei** verschiedenen Werkzeugen gezeigt, und **in keinem der Fälle hat eines der vier
Gates etwas gemeldet.**

**DIE BELEGE — alle GEMESSEN (CC, 2026-09-18), je mit dem Instrument, das sie gefunden hat:**
1. **UNICODE-ESCAPES IN DOKU-TEXT, FÜNFMAL.** Ein Escape für das Kleiner-Zeichen, in einem
   Code-Span geschrieben, stand danach als ZEICHEN in der Datei — dreimal im Rumpf von
   Entscheidung P11.13-25, zweimal in VERMERK P11.13-7. Sätze wie „danach jedes `<` als `<`"
   waren die Folge. **Gefunden über eine Zählung der verbliebenen Escape-Vorkommen**; kein
   Gate liest Doku-Text.
2. **UNICODE-ESCAPES IN EINER TESTDATEI.** In `src/lib/script-embed.test.ts` wurden die
   Escapes für U+2028, U+2029 und U+1F600 **still in ihre Zeichen verwandelt** — danach
   stand ein **roher Zeilentrenner in einem String-Literal**. **Der Test war dabei grün**,
   und `tsc`, `lint` und `build` ebenso. Gefunden über eine Codepunkt-Zählung.
   **DER FALL WÄRE BEI U+0000 EIN NUL-BYTE IN EINER QUELLDATEI GEWESEN** — genau die
   Fehlerklasse, die docs/immer-beachten.md unter „EIN NACHWEIS AN EINER NEUEN DATEI IST
   BLIND" bereits führt, und für die dieselbe Regel `String.fromCharCode` als das
   tragende Mittel nennt.
3. **ZEILENENDEN IN EINER `w/crlf`-DATEI.** Beim Einfügen in `src/components/PublishView.tsx`
   entstanden ein `\r\r\n` und ein einzelnes `\n`. Folge: `git ls-files --eol` meldete
   **`w/-text`** — git hielt die Datei für **binär** —, und `git diff --stat` zeigte
   **1 494 geänderte Zeilen statt 83**. **Alle vier Gates waren grün.** Gefunden allein über
   `git ls-files --eol` und eine Suche nach „CR ohne LF".
4. **`git stash`, bereits als Vorrat P11.13-7 geführt** (Scheibe 11.13c): Der Rundlauf gab
   `PublishView.tsx` mit CR=0 zurück; von sechzehn Dateien meldete `sha256sum -c` eine als
   FAILED. **Auch dort hätte die vorgeschriebene Prüfung der Werkzeug-Regel — `git status`
   plus der Ausschluss leerer Diffs — nichts gemeldet**, weil der Diff gerade nicht leer war.

**WAS DIE BESTEHENDE REGEL LEISTET UND WAS NICHT.** docs/immer-beachten.md führt
„WERKZEUG-REGEL: `sed -i` STRIPPT IN DIESER UMGEBUNG STILL DAS CR" und sagt dort
ausdrücklich, ihre Reichweite sei die **WIRKUNG** und nicht das Kommando im Titel: „Die Frage
lautet nie ‚steht es in der Aufzählung?', sondern ‚schreibt es die ganze Datei?'". Sie nennt
in ihrer Aufzählung `sed -i`, `perl -i`, die PowerShell-Schreiber, die Umlenkungen, `tee`,
Formatierer **und das Write-Werkzeug, wo es eine BESTEHENDE Datei ersetzt**.
**SIE NENNT DAS EDITIER-WERKZEUG NICHT, UND SIE NENNT WEDER `git stash` NOCH EINEN
HEREDOC-PFAD.** Und ihre vorgeschriebene Prüfung — `git status` plus der Ausschluss leerer
Diffs — **hat in zwei der vier Fälle nichts gemeldet**: Fall 3 erzeugte einen sehr grossen
Diff, Fall 4 ebenfalls.
**DAZU KOMMT EINE ACHSE, DIE DIE REGEL GAR NICHT KENNT: DIE UMDEUTUNG EINES ESCAPES.** Dort
wird nicht die ganze Datei neu geschrieben und auch kein Zeilenende gedreht — es wird **eine
Zeichenfolge im Inhalt durch eine andere ersetzt**, und der Diff ist völlig unauffällig.

**WAS UNABHÄNGIG VON DER ABLAGE-FRAGE GILT UND AB SOFORT BEFOLGT WIRD:** Ein Escape, dessen
Zeichen nicht im Quelltext stehen soll, wird **im Code gebaut** (`String.fromCharCode`,
`String.fromCodePoint`) oder in der **Quellform mit doppeltem Backslash** geschrieben; nach
jedem Schreiben wird auf CR-ohne-LF, LF-ohne-CR und NUL geprüft, und bei einer neuen Datei
am **committeten Objekt**. Beides ist in dieser Scheibe gefahren worden.

**FÜNFTER FALL, SCHEIBE 11.13e — UND ER TRIFFT NICHT DAS WERKZEUG, SONDERN DIE VORGESCHRIEBENE
PRÜFUNG SELBST** (GEMESSEN am eigenen Lauf, CC, 2026-09-18): Beim Verschieben eines Blocks in
`src/components/PublishView.tsx` (`w/crlf`) sind **39 DOPPELTE CRs** entstanden — `\r\r\n` —,
weil eine Ersetzung `\n` → `\r\n` über eine Zeichenkette lief, die bereits CRLF trug.
**DIE PRÜFUNG „CR == LF" HAT DAS NICHT GEMELDET: sie stand auf 845 == 845 und sah in Ordnung
aus.** Der Grund ist ihre Zählweise: Sie zählt **CRLF-PAARE**, und jedes `\r\r\n` liefert
genau ein Paar — das zusätzliche CR ist für sie unsichtbar.
**GEFUNDEN HAT ES ERST DER VERGLEICH CR GESAMT (884) GEGEN CRLF-PAARE (845).** Repariert;
Endzustand CR = CRLF = LF = 849, `git ls-files --eol` unverändert `w/crlf`.
**WAS DARAUS FOLGT UND WAS NICHT:** Die tragende Prüfung ist **CR gesamt == CRLF-Paare == LF
gesamt**, drei Zahlen statt zwei — eine Gleichheit von zweien genügt nicht. **DAS IST EINE
ANDERE ACHSE ALS DIE VIER FÄLLE OBEN:** Dort war das SCHREIBWERKZEUG der Verursacher und die
Prüfung taugte; hier ist die PRÜFUNG blind, und das Werkzeug ist nur der Anlass. **KEINE
ENTSCHEIDUNG, KEIN EINTRAG IN docs/immer-beachten.md** — die Hebung ist Sache des Phasenendes.

**EIN SECHSTER BEFUND DESSELBEN TAGES, der zu keiner der zwei Achsen gehört und deshalb
eigens steht:** **Python über `stdin` dekodiert auf dieser Maschine NICHT als UTF-8.** Ein
Suchmuster mit „ö"/„ä" traf nie — `count` lieferte 0, obwohl der Text dastand; **`PYTHONUTF8=1`
hat NICHT geholfen.** Getragen hat erst ein **ASCII-only-Anker**. GEMESSEN am eigenen Lauf
(CC, 2026-09-18), dreimal hintereinander. **ER VERÄNDERT KEINE DATEI** — er lässt eine
Ersetzung stillschweigend AUSFALLEN, und das Skript meldet Erfolg. Verwandte Denkfigur wie
„EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND", aber am
Schreib- statt am Lesepfad. **NICHT ENTSCHIEDEN, ob er hierher gehört oder eigens steht.**

**NICHT ENTSCHIEDEN, und ohne diesen Satz stellt die Hebung eine zweite Regel neben eine
bestehende, und dann greift keine mehr richtig:** ob daraus eine **EIGENE Regel** wird oder
eine **ERWEITERUNG der Werkzeug-Regel** um das Editier-Werkzeug, `git stash`, den
Heredoc-Pfad und die Escape-Achse. **Für eine Erweiterung spricht**, dass jene Regel ihre
Reichweite bereits über die WIRKUNG definiert und eine dritte Regel auf derselben Achse die
Trefferwahrscheinlichkeit senkt. **Für eine eigene spricht**, dass die Escape-Umdeutung
weder „die ganze Datei schreibt" noch ein Zeilenende dreht — sie fällt unter den Wortlaut
jener Regel nicht, auch nicht unter ihren Reichweiten-Satz. **KEINE EMPFEHLUNG.**

**KEIN EINTRAG IN docs/immer-beachten.md IN DIESER RUNDE** — die Hebung ist Sache des
Phasenendes.

PROVENIENZ: Die Fälle 1 bis 3 sind GEMESSEN am eigenen Lauf (CC, 2026-09-18) und stehen als
harte Angaben in VERMERK P11.13-8, (f). Fall 4 ist GEMESSEN (CC, 2026-09-18) und steht als
Vorrat P11.13-7. Der Wortlaut der bestehenden Werkzeug-Regel und ihrer Aufzählung ist
GELESEN in docs/immer-beachten.md (CC, 2026-09-18). **Dass die Escape-Umdeutung unter jenen
Wortlaut nicht fällt, ist eine ABLEITUNG aus ihm, keine Messung.**
