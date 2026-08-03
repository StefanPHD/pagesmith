# Aktiver Stand — Phase 11 (Multi-Tracking / Server-Side Fan-Out)

Eröffnet 2026-08-03. Diese Datei ist das Pflicht-Gate ("Auftrag 0") jeder
Session, die an dieser Phase arbeitet: ZUERST vollständig lesen, dann bauen.

VERFAHREN AM PHASENENDE — drei Schritte, in dieser Reihenfolge:
1. HEBUNG: Was aus dieser Phase eine DAUERHAFTE Regel ist, wandert nach
   CLAUDE.md, "## Immer beachten".
2. ROADMAP-HAKEN: Die Zeile "Phase 11" in CLAUDE.md wird abgehakt.
3. EIGENE HISTORIEN-DATEI unter docs/claude-history/ anlegen, dann DIESE Datei
   löschen. ANDERS ALS BEI PHASE 10.5: Dort entfiel die Historien-Datei, weil die
   ganze Herleitung in einem einzigen Backlog-Eintrag lag. Phase 11 ist
   mehrscheibig — ihre Herleitung hat keinen anderen Ort.

DIESE DATEI ERÖFFNET DIE PHASE, SIE PLANT SIE NICHT. Es gibt hier bewusst KEINE
Scheiben-Einteilung; s. den Abschnitt am Ende.

---

## Beschlossenes Consent-Modell (OWNER-ENTSCHEIDUNG, 2026-08-03)

Dies ist eine getroffene Entscheidung, keine Option und kein Vorschlag. Sie wurde
vom Owner getroffen. Wer sie ändern will, ändert sie bewusst — nicht nebenbei
beim Bauen.

**1. DER HOOK DARF ZWEI FORMEN LIEFERN.** `window.pagesmithConsent` gibt entweder
einen BOOLEAN oder ein OBJEKT je Ziel zurück. Rückwärtskompatibel: `true` heisst
ALLE Ziele, `false` heisst KEINES. Die heutige Boolean-Form bleibt damit gültig,
ohne dass ein bestehender Kunde etwas tun muss.

**2. FEHLENDER SCHLÜSSEL IM OBJEKT = KEINE EINWILLIGUNG.** Liefert der Betreiber
ein Objekt und ein Ziel fehlt darin, gilt für dieses Ziel NEIN.

**3. DER TOP-LEVEL-DEFAULT BLEIBT PERMISSIV:** Ist gar kein Hook definiert, gilt
weiterhin `true`.

**WARUM 2 UND 3 IN VERSCHIEDENE RICHTUNGEN ZEIGEN — die Begründung gehört
zwingend dazu, sonst sieht die Asymmetrie wie ein Fehler aus und wird beim
nächsten Aufräumen "korrigiert":**
- Wer KEINEN Hook hat, hat NIE ENTSCHIEDEN. Ein Umschalten auf streng würde das
  Tracking JEDES bestehenden Kunden abschalten — ohne dass einer davon etwas
  falsch gemacht hätte.
- Wer ein OBJEKT liefert, hat sich Ziel für Ziel geäussert. Eine Lücke darin ist
  eine AUSLASSUNG, keine Zustimmung. Das ist eine andere Ausgangslage als
  "nichts gesagt".
- Und der praktische Punkt: Die strenge Variante kostet HEUTE nichts, weil die
  Objektform noch gar nicht existiert. Später eingeführt wäre sie eine
  Umstellung mit Migrationspfad für Bestandskunden.

**4. UNSERE EIGENE AUSWERTUNG BEKOMMT EINEN EIGENEN SCHLÜSSEL** (Arbeitsname:
`analytics` — die SCHREIBWEISE ist mit Entscheidung (a) unten festgelegt, der
NAME noch nicht). Ohne einen solchen Schlüssel liesse sich der PageView-Defekt
gar nicht schliessen: Es gäbe nichts, wogegen der Emitter prüfen könnte.

**5. DAS CONSENT-SIGNAL WIRD IMMER MITGESCHICKT — auch bei Vollzustimmung.**
BEGRÜNDUNG: Wird es nur bei Einschränkung gesendet, bedeutet ein fehlendes Feld
DREI Dinge gleichzeitig — Altbestand, Vollzustimmung oder Defekt — und der
Server müsste raten. Ab Phase 11 heisst Abwesenheit genau EINE Sache:
Altbestand oder Defekt.

**6. EINE MITGELIEFERTE EINWILLIGUNG KANN NUR EINSCHRÄNKEN, NIE ERWEITERN.** Der
Server darf sie NIEMALS als Erlaubnis lesen, die über die Serverkonfiguration
hinausgeht. Ein Ziel, das serverseitig nicht konfiguriert ist, wird nicht
dadurch aktiv, dass ein Client-Blob es nennt. Der Client-Wert ist ein Veto, kein
Mandat.

---

## Bekannte Folge dieser Entscheidung (offen benannt, nicht kleingeredet)

Ein Betreiber, der `{ meta: true }` schreibt, verliert nach Regel 2 seine EIGENE
Auswertung — ohne es zu merken. Er hat an unseren Schlüssel nicht gedacht, weil
er von ihm nichts wusste.

**UND WIR KÖNNEN IHN NICHT WARNEN.** Ein abgelehnter Analytics-Consent erzeugt
gar keinen Beacon; es kommt nichts an, das man als "hier fehlt etwas" lesen
könnte. Abwesenheit ist nicht zurechenbar — dieselbe Signatur wie
Blocker-gegen-Ablehnung (s. "Gemessene Ausgangslage").

**PRODUKTANFORDERUNG, KEINE FUSSNOTE:** Die VOLLSTÄNDIGE Schlüsselliste muss der
Betreiber dort sehen, WO ER TRACKING EINRICHTET — nicht in einer Dokumentation,
die er nie öffnet. Wer diese Anforderung als Doku-Aufgabe abhandelt, hat die
Folge oben nicht abgewendet, sondern nur verschoben.

**KANDIDAT, AUSDRÜCKLICH NICHT EINGEPLANT:** Definiert der Betreiber den Hook im
importierten HTML, läge er in `published_content` und wäre damit statisch
prüfbar — man könnte ihm die fehlenden Schlüssel zeigen. Bei einem EXTERNEN
Consent-Tool sehen wir dagegen nichts. Das ist ZU PRÜFEN, nicht vorauszusetzen:
ob der Anteil selbst definierter Hooks eine solche Prüfung überhaupt trägt, ist
unbekannt.

---

## Fragen, die der Bau beantworten MUSS

(a) ist seit 2026-08-03 ENTSCHIEDEN und steht als Entscheidung unten; (b) bis
(f) sind AUSDRÜCKLICH OFFEN und werden hier weder beantwortet noch
vorentschieden.

**(a) DER SCHLÜSSEL-NAMENSRAUM — ENTSCHIEDEN (OWNER, 2026-08-03).**

**DER NAMENSRAUM WIRD NICHT NEU ERFUNDEN, SONDERN ERWEITERT.** Er existiert
bereits als `settings.pixels.<platform>` (`src/lib/settings.ts:4-8`, `:12-16`)
mit genau einem Mitglied: `meta`. Der dortige Kommentarkopf hat die Nest-Form
ausdrücklich für weitere Plattformen angelegt — "OHNE flache Keys und OHNE
Migration pro Plattform".

**WARUM DIE CONSENT-SCHLÜSSEL DARAN GEBUNDEN WERDEN:** Der Betreiber pflegt
seine Ziele in den Einstellungen und schreibt DIESELBEN Namen in seinen
Consent-Hook. Zwei Vokabulare hiessen: er lernt beide, und jede spätere
Fehlersuche muss beide kennen.
Die vier im Repo gemessenen Handschriften (`__psFoo`, `__ps_foo`, `PS_FOO`,
`pagesmith-foo`) gelten für LAUFZEIT-INTERNAS. Die Schlüssel im Rückgabewert des
Hooks sind kein Runtime-Symbol, sondern FACHVOKABULAR — sie fallen deshalb nicht
unter jene Handschriften.

**SCHREIBWEISE: snake_case, klein.**
BEGRÜNDUNG, DIE ZWINGEND DAZUGEHÖRT — ohne sie sieht `google_ads` wie eine
Ausnahme aus und wird beim nächsten Aufräumen geglättet: Der Betreiber schreibt
diese Schlüssel in einem JS-OBJEKTLITERAL. `{ google-ads: true }` ist ein
SYNTAXFEHLER; nur der Unterstrich funktioniert ohne Anführungszeichen. An `meta`
allein war die Regel nicht ablesbar — bei einem einzigen einwortigen Mitglied
sieht man nicht, ob "ein Wort" oder "snake_case" gilt.

**DIE SCHLÜSSEL:** `meta` · `google_ads` · `ga4` · `tiktok` · `pinterest` ·
`linkedin` · `custom` · plus der Schlüssel für die eigene Auswertung
(Arbeitsname `analytics`, s. den offenen Punkt darunter).

**GOOGLE IST ZWEI ZIELE, NICHT EINS.** Google Ads Conversions und GA4 sind
verschiedene Produkte mit verschiedenen Schnittstellen, Zugangsdaten und
Semantiken — und Einwilligungsbanner trennen sie üblicherweise in "Marketing"
gegen "Statistik". Deshalb zwei Schlüssel.

**CUSTOM IST GENAU EIN SCHLÜSSEL.** Drittanbieter-Pixel fallen im Banner unter
eine gemeinsame Kategorie. WIE VIELE Custom-ZIELE ein Projekt haben kann, ist
davon ENTKOPPELT und ausdrücklich NICHT entschieden — die Slot-Zahl steht in
unserem Schema, ist jederzeit änderbar und für niemanden ausserhalb sichtbar.
DER SCHLÜSSEL IST DIE EINBAHNSTRASSE, DIE SLOT-ZAHL NICHT.

WAS AN (a) NOCH OFFEN BLEIBT: der endgültige Name für die eigene Auswertung.
`analytics` ist ein Arbeitsname; die SCHREIBWEISE steht damit fest, der NAME
noch nicht.

**(b) DIE FORM DES WIRE-FELDES.** Die Angabe sitzt im `/api/e`-Body — auf dem
Pfad, für den die Regel "/API/E-SCHLANKHEIT" (CLAUDE.md, Abschnitt A) gilt: Er
wird von JEDEM Besucher JEDER Kundenseite getroffen, jedes zusätzliche Byte
multipliziert sich über alle Kunden. Entscheidung 5 verlangt zugleich, dass das
Feld IMMER mitreist. Wie beides zusammengeht — kompakt UND immer vorhanden —,
ist zu ENTWERFEN, nicht zu setzen.

**(c) OB DIE EINWILLIGUNG AN DER EVENT-ZEILE PERSISTIERT WIRD.** Zwei
gegenläufige Argumente, beide notiert, keines ausgewählt:
- DAFÜR: Nachweisbarkeit. Wer später belegen muss, auf welcher Grundlage ein
  Event erhoben wurde, braucht die Angabe an der Zeile.
- DAGEGEN: Datensparsamkeit. Es wären MEHR personenbezogene Daten, nicht
  weniger — neben IP und User-Agent, die auf dem Forward-Pfad ohnehin anfallen.
Die Entscheidung berührt die Datenklassen-Grenze (CLAUDE.md, "## Offene Punkte")
und gehört nicht in einen Bau-Schritt.

**(d) DAS ZIEL-SCHEMA FÜR DIE GEHEIMNISSE.**
GEMESSEN: `project_tokens` trägt genau EINE Spalte für Zugangsdaten,
`meta_capi_token` (`supabase/migrations/0005_project_tokens.sql:20`). Fünf Ziele
brauchen je eigene Zugangsdaten — das ist eine SCHEMA-ÄNDERUNG an der Tabelle mit
den Geheimnissen, mit RLS-Berührung, NICHT eine weitere Einstellung im JSON.
GEMESSEN EBENFALLS: `settings.capi` wurde bewusst NEBEN `pixels` gelegt und im
Kommentar als "plattform-AGNOSTISCH" begründet (`src/lib/settings.ts:25-32`). Für
einen einzigen CAPI trug das; bei fünf Zielen mit je eigenem Handle und Token ist
OFFEN, ob es unter die Plattform wandern muss.
ZU ENTWERFEN, NICHT ZU SETZEN.

**(e) DIE REIHENFOLGE DER ZIELE.** Die fünf sind NICHT fünf Kopien desselben
Musters; jedes bringt eigene Pflichtfelder mit. Die Roadmap-Formulierung
"additive Fan-Out-Ziele" (CLAUDE.md, Roadmap-Zeile Phase 11) verdeckt das.
ERSTER SCHRITT: erheben, welches Ziel dem Meta-Muster (IP, User-Agent,
Cookie-Kennung) am nächsten liegt. Das ist eine ERHEBUNG AN DEN SCHNITTSTELLEN,
keine Vermutung.

**(f) GA4 BRAUCHT MÖGLICHERWEISE ETWAS, DAS WIR IM BLOCKER-FALL NICHT HABEN.**
DIES IST EINE ANNAHME, KEIN BEFUND — die Kennzeichnung ist Teil der Aussage:
Das Measurement Protocol verlangt VERMUTLICH eine Client-ID, die GA4 selbst im
Browser vergibt. Trifft das zu, fehlt sie ausgerechnet dann, wenn GA4s Skript
geblockt wurde — also in genau dem Fall, für den der server-seitige Weg
überhaupt existiert. Ein Ersatz-Identifikator aus unserer Hand erzeugte in GA4
eine ZWEITE Nutzerpopulation.
HERKUNFT: Kenntnisstand des Architekten über eine FREMDE Schnittstelle, NICHT am
Code gemessen und in dieser Runde NICHT nachgeprüft. Gegen die AKTUELLE
GA4-Dokumentation zu prüfen, BEVOR jemand baut.
FOLGE, BEREITS ENTSCHIEDEN: GA4 kommt NICHT in die erste Scheibe. Der Namensraum
bleibt davon unberührt — betroffen ist nur die Reihenfolge.

---

## Gemessene Ausgangslage

PROVENIENZ: Vollständig ÜBERNOMMEN aus der Aufklärungsrunde vom **2026-08-03**.
Nichts davon ist in dieser Runde neu erhoben worden; wer es anzweifelt, misst
nach, statt es umzuschreiben.

1. **`psConsent()` liest `window.pagesmithConsent` — und NIRGENDS wird es
   gesetzt.** Deklaration in `src/lib/tracking/meta.ts:103-111`, als String im
   erzeugten Laufzeit-Text. Die Repo-weite Suche findet keine einzige
   Produktivstelle, die den Wert schreibt: kein Banner, keine Komponente, keine
   Einstellung. Die einzigen Setzer sind zwei `vi.stubGlobal`-Aufrufe in Tests.
2. **Drei Lesestellen, alle in derselben Datei:** `meta.ts:105-106` (die
   Auswertung selbst), `meta.ts:114` (gated den Script-Load in `__psMetaInit`),
   `meta.ts:163` (gated jedes Event in `__psMetaFire`).
3. **Fehlt der Hook, liefert `psConsent()` `true`** (`meta.ts:107`). Wirft der
   Hook, liefert es `false` (`meta.ts:109`).
4. **Der PageView-Emitter trägt KEIN Gate und feuert unbedingt.**
   `buildPageViewScript` (`src/lib/analytics/pageview-emitter.ts:30-52`) ruft
   weder `psConsent` noch `window.pagesmithConsent`; die IIFE feuert nach dem
   `window.__ps_pv`-Guard (`:33`) einen Beacon an `/api/e` (`:45`). Von den zwei
   first-party-Inline-Skripten einer publizierten Seite ist damit EINES gegated
   und EINES nicht.
5. **Der Server kennt KEIN Einwilligungsfeld.** `CapiRequestBody`
   (`src/lib/capi/ingest.ts:48-60`) führt `trackingKey`, `eventID`, `event`,
   `value`, `currency`, `eventSourceUrl`, `isCustom`, `_fbp`, `obs` — und nichts
   sonst. Eine Suche nach "consent" über `src/lib/analytics/`, `src/lib/capi/`
   und `supabase/` liefert null Treffer.
6. **Die Forward-Bedingung lautet `config && isForwardable(event)`**
   (`src/lib/capi/ingest.ts:313`). Die Einwilligung kommt darin nicht vor —
   weder direkt noch über einen der beiden Operanden. Der Server-Pfad endet
   damit FAIL OPEN; das Gate liegt vollständig im Client.
7. **Es gibt genau ZWEI Consent-Tests, beide in `src/lib/generate.test.ts`:**
   `:575` ("weder Script-Load noch init/Event") und `:760` ("WEDER fbq NOCH
   Beacon (selbes Gate)"). BEIDE stubben `pagesmithConsent` auf `() => false`.
   **KEINER deckt den Fall "Hook fehlt" ab** — also genau den Zustand, der bei
   jedem Kunden ohne eigenes Banner eintritt und fail open endet. Ebenso
   ungetestet: der werfende Hook (`meta.ts:109`).

---

## Keine Scheiben-Einteilung

Sie entsteht erst, wenn die offene Frage (e) — die Reihenfolge der Ziele —
beantwortet ist. Bis 2026-08-03 hing sie an (a); jene Frage ist entschieden, und
damit ist ein Schnitt NICHT automatisch möglich: Solange nicht erhoben ist,
welches Ziel dem Meta-Muster am nächsten liegt, wäre die erste Scheibe geraten.
Von (f) ist bereits bekannt, dass GA4 nicht in ihr liegt.
