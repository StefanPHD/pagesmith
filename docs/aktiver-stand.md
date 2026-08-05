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

DIESE DATEI ERÖFFNET DIE PHASE. Sie führt die REIHENFOLGE der ersten DREI
Scheiben: (1) die Umstellung der Geheimnis-Tabelle — ABGESCHLOSSEN und live
bewiesen, (2) das geteilte Consent-Gate, (3) Pinterest als erstes zusätzliches
Ziel, noch NICHT zugeschnitten. Die Zuschnitte stehen unter "### Der Zuschnitt
der ersten Scheibe — DREI SCHRITTE in dieser Reihenfolge" und "## Die zweite
Scheibe — DAS GETEILTE CONSENT-GATE (Zuschnitt)"; was die erste Scheibe
tatsächlich ergeben hat, unter "### Protokoll der ersten Scheibe — Vollzug und
Abschluss". Verwiesen wird auf Überschriften, nicht auf Positionen: "am Ende"
wandert mit jedem angehängten Abschnitt mit, ohne dass jemand es merkt.

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

(a), (d) und (e) sind seit 2026-08-03 ENTSCHIEDEN und stehen als Entscheidungen
unten; (f) ist seit demselben Datum GEPRÜFT, und die Auflage aus (g) ist ERFÜLLT
— beide tragen eine Folge, keine offene Frage mehr. (b), (c), (h) und (i) sind
AUSDRÜCKLICH OFFEN und werden hier weder beantwortet noch vorentschieden.

**PROVENIENZ ALLER ANGABEN ZU FREMDEN SCHNITTSTELLEN IN DIESEM ABSCHNITT —
EINMAL, FÜR ALLE FOLGENDEN PUNKTE:** Was hier über Pinterest, TikTok, LinkedIn
und GA4 steht, stammt aus FREMDER DOKUMENTATION, vom Architekten am 2026-08-03
im Web gelesen. Es ist WEDER am Code gemessen NOCH eigene Betriebserfahrung.
FREMDE SCHNITTSTELLEN ÄNDERN SICH OHNE UNSER ZUTUN — vor dem Bau ist deshalb
gegen die dann AKTUELLE Anbieter-Dokumentation gegenzuprüfen, nicht gegen diesen
Text. Er hält den Kenntnisstand eines Tages fest, keine dauerhafte Zusage.

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

**(d) DAS ZIEL-SCHEMA FÜR DIE GEHEIMNISSE — ENTSCHIEDEN (OWNER, 2026-08-03).**

**PROVENIENZ DIESES BLOCKS — ENTWURF, DER SEINE PRÜFUNG BESTANDEN HAT:** Bis zum
2026-08-03 stand dieser Block unter dem Vorbehalt einer noch AUSSTEHENDEN
Erhebung. Die Erhebung ist gefahren und hat ihn BESTÄTIGT; ihre Befunde stehen in
der Ausgangslage unter "Zur ERSTEN SCHEIBE".
**WAS DAS NICHT HEISST:** Die FORM der neuen Tabelle bleibt ENTWURF und ist nicht
am Code gemessen — gemessen ist der BESTAND, gegen den sie sich richtet. Eine
bestandene Prüfung macht aus einem Entwurf keine Messung.

**GEHEIMNISSE WERDEN ALS ZEILEN GESPEICHERT, geschlüsselt über PROJEKT UND
ZIEL. Ein Geheimnis pro Zeile.**

BEGRÜNDUNG, in dieser Reihenfolge:
- Einzeln setzbar, einzeln löschbar, einzeln rotierbar — ohne bestehende
  Datensätze zu berühren.
- **OFFENE ANZAHL**, und das ist der entscheidende Punkt: Die Zahl der
  Custom-Slots ist bewusst NICHT festgelegt (s. Entscheidung (a)). Bei Spalten
  wäre ein zweiter Custom-Slot eine SACKGASSE; bei Zeilen ist er eine weitere
  Zeile.

**DER ZIELWERT WIRD PER CONSTRAINT ERZWUNGEN — und der PREIS steht dabei:** Ein
neues Ziel ist damit eine MIGRATION, nicht nur eine Zeile. Das ist bewusst so
gewählt. Ohne Erzwingung wäre der Zielwert ein freier String, und ein Geheimnis
unter "pintrest" liesse sich speichern, ohne dass etwas meckert — der Adapter
sucht "pinterest", findet nichts, das Ziel bleibt STILL inaktiv.
Der Preis ist gering, weil ein neues Ziel ohnehin Adapter-Code mitbringt; die
Constraint-Erweiterung fährt in DERSELBEN Scheibe mit — **und genau daran hängt
sein UMFANG, ENTSCHIEDEN (OWNER, 2026-08-05): DER CONSTRAINT LÄSST NUR DEN
META-SCHLÜSSEL ZU, NICHT DIE VOLLE SCHLÜSSELLISTE AUS (a).**

BEGRÜNDUNG, in dieser Reihenfolge — sie gehört zwingend dazu, sonst wird die enge
Liste später als Versäumnis gelesen und "vervollständigt":
- Die volle Liste enthält Ziele, deren ZUGANGSDATEN-FORM ungeprüft ist (Google
  Ads, s. (i)) oder bekannt NICHT PASST: mehrwertige Anmeldungen gegen ein
  Geheimnis pro Zeile — das steht als bewusst getragenes Risiko weiter unten in
  dieser Entscheidung.
- Ein Constraint, der einen solchen Wert zuliesse, BEHAUPTETE EINE PASSUNG, DIE
  (d) SELBST VERNEINT. Das ist dieselbe Figur wie bei den verworfenen
  `WITH CHECK`-Policies weiter unten: eine Regel, die Schutz ANZEIGT, ohne zu
  schützen.
- Und die Wirkung nach aussen: Eine Zeile für ein Ziel, für das es keinen Code
  gibt, sieht aus wie funktionierende Konfiguration. Niemand meldet dem
  Betreiber, dass sie keiner liest.

FOLGE — sie steckt im Satz oben schon drin und wird hier nur zu Ende geführt:
JEDES weitere Ziel bringt seine EIGENE Constraint-Erweiterung mit. Das ist der
BEABSICHTIGTE Preis, kein Overhead. Es ist der sichtbare Moment, in dem ein Ziel
real wird, und es erzwingt bei jedem neuen Ziel erneut den Blick auf die
Reihenfolge Migration-vor-Code-Deploy.

**UND DER CONSTRAINT SELBST IST DIE ERSTE STELLE IM PRODUKT, AN DER DER
NAMENSRAUM AUS (a) DURCHGESETZT WIRD** statt nur dokumentiert zu sein — s. den
Backlog-Eintrag "RESERVIERTE NAMEN SIND NICHT GESCHÜTZT".

VERWORFEN, mit Grund: eine Nachschlagetabelle mit Fremdschlüssel. Sie verspricht
"neues Ziel = INSERT statt Migration", löst das aber nicht — in diesem Projekt
ist auch ein INSERT eine Migrationsdatei, weil der Neuaufbau ausschliesslich aus
Migrationen läuft. Sie kauft eine Tabelle und spart nichts.

**RLS GEHÖRT AUSDRÜCKLICH IN DIE MIGRATION DER NEUEN TABELLE**, nicht in einen
Mechanismus daneben. GRUND, aus den offenen Ops-Punkten: `rls_auto_enable` steht
in KEINER Migration. Für BESTEHENDE Tabellen ist das ein bekanntes Restrisiko;
für eine NEUE Tabelle ist es AKUT — ein Neuaufbau allein aus den Migrationen
erzeugte sonst eine GEHEIMNIS-Tabelle OHNE Zeilenschutz. Das ist der Unterschied
zwischen "unwahrscheinlich" und "unmöglich" bei den Zugangsdaten aller Kunden.

**BEWUSST GETRAGENES RISIKO — ausdrücklich SO formuliert und NICHT als
Entwurfsentscheidung:** Ein Geheimnis pro Zeile deckt beide BEKANNTEN Fälle
(Meta, Pinterest). Ziele mit OAuth-artiger Anmeldung brauchen typischerweise
MEHRERE Werte nebeneinander; Google Ads ist ungeprüft (s. (i)) und ist damit
nicht nur ein Schnittstellen-, sondern auch ein SCHEMA-Risiko. Stellt sich das
heraus, ist es eine ZWEITE Migration auf der Geheimnis-Tabelle. Der Preis wurde
am 2026-08-03 gekannt und in Kauf genommen, statt auf Verdacht Komplexität zu
bauen ("Abstraktion erst bei 2+ realen Fällen").

**DER PRÜFAUFTRAG ZU `settings.capi` IST BEANTWORTET (2026-08-03) — hier das
ERGEBNIS, nicht mehr die Frage:** `settings.capi` führt tatsächlich ZWEI Dinge
unterschiedlicher Reichweite.
- `trackingKey` identifiziert das PROJEKT und bleibt, wo er ist — mit einem
  STÄRKEREN Grund als der Prüfauftrag annahm: Er ist in bereits ausgelieferte
  Seiten EINGEBACKEN (s. Ausgangslage Punkt 15).
- `tokenSet` bräuchte eine Vervielfachung, aber ERST AB DEM ZWEITEN ZIEL
  (s. Ausgangslage Punkt 16).
Es wandert also nur die ZWEITE Hälfte unter die Plattform, nicht der ganze Block
— und nicht in dieser Scheibe.

**KEIN EIGENES "AKTIV"-KENNZEICHEN.** Heute ist ein Ziel aktiv, wenn seine
Zugangsdaten auflösen. Das trägt auch bei fünf Zielen und hält "nicht
eingerichtet" von "eingerichtet, aber fehlerhaft" unterscheidbar — genau die
Trennung, die bei den Analytics-Kacheln fehlt.

**DIE POLICY-ENTSCHEIDUNG (OWNER, 2026-08-03): DIE NEUE TABELLE TRÄGT KEINE
NUTZER-SPALTE UND KEINE `WITH CHECK`-POLICIES. RLS IST AKTIVIERT, DIE
POLICY-LISTE IST LEER.**

BEGRÜNDUNG, in dieser Reihenfolge. **Der Architekt hatte das GEGENTEIL empfohlen
und wurde widerlegt — das gehört mit in den Text**, sonst liest die nächste
Instanz die leere Policy-Liste als Versäumnis und "repariert" sie:

1. **DIE POLICY SCHÜTZT NICHT GEGEN DEN ANGRIFF, UM DEN ES GEHT.**
   `WITH CHECK (auth.uid() = user_id)` prüft nur, dass jemand die EIGENE
   Nutzer-ID einträgt — genau das täte ein Angreifer ohnehin. Die Ownership des
   PROJEKTS wird dort nicht geprüft; die Migrationsdatei sagt das selbst
   (`supabase/migrations/0005_project_tokens.sql:35-37`). Mit (Projekt, Ziel) als
   Schlüssel wird der Schutz noch SCHWÄCHER: gegen das Schreiben auf ein fremdes
   ZIEL im EIGENEN Projekt greift er gar nicht.
2. **EIN INSTRUMENT, DAS SCHUTZ ANZEIGT OHNE ZU SCHÜTZEN, IST SCHLIMMER ALS
   KEINS.** Wer das Schema liest und "RLS aktiviert, Policies vorhanden" sieht,
   schliesst daraus, die Datenbank trage die Autorisierung. Das ist der Weg, auf
   dem eine spätere Änderung das Gate in der Server-Action für redundant hält.
3. **KEINE ALTLAST IN EINER NEUEN TABELLE:** Eine Nutzer-Spalte hat ohne diese
   Policies keinen Zweck (s. Ausgangslage Punkt 10).

**VERPFLICHTENDE FOLGE:** Trägt die Datenbank keine Schreib-Autorisierung, ist
**DAS OWNERSHIP-GATE IN DEN SERVER-ACTIONS DIE EINZIGE KONTROLLE.**
Dieser Satz gehört in den KOMMENTARKOPF der neuen Migration — nicht als Beiwerk,
sondern als der Satz, der jemanden davon abhält, das Gate später für redundant zu
halten.

**DIE REGRESSIONSWÄCHTER — RICHTIGGESTELLT AM 2026-08-05, ERNEUT AM CODE
GEMESSEN.** Bis dahin stand hier, VIER namentlich genannte Tests in
`src/app/projects/actions.test.ts` prüften, dass der privilegierte Client im
Nicht-Owner-Pfad nie instanziiert wird. Die Beschreibung trug nicht: zwei der
vier sind HAPPY-PATH-Tests, die das Gegenteil voraussetzen — dort MUSS der
privilegierte Client entstehen, sonst gäbe es nichts zu schreiben. Es sind ZWEI
VERSCHIEDENE AUSSAGEN, beide tragend, KEINE ersetzt die andere:

1. **KEIN PRIVILEGIERTER CLIENT OHNE BESTANDENES GATE.** Getragen von „IDOR-SCHUTZ
   (heiligstes Gate): fremde project_id …", „IDOR (heiligstes Gate): fremdes
   Projekt …", den beiden „nicht eingeloggt …"-Tests (je einer bei setCapiToken
   und removeCapiToken) und „leerer Token -> error, KEIN DB-Zugriff …". Alle
   behaupten dasselbe: `createAdminClient` wurde NICHT aufgerufen.
2. **DER AUTHENTIFIZIERTE CLIENT FASST DIE GEHEIMNIS-TABELLE NIE AN.** Getragen
   von „WRITE-ONLY: der SSR-Client fasst project_tokens NIE an …", „DELETE laeuft
   ueber den Admin-Client (service_role), nicht ueber den SSR-Client" und
   „selektiert nur projects-Spalten …, NIE project_tokens".

**DIE ZWEITE AUSSAGE IST DIE, DIE DURCH DIESE SCHEIBE WANDERT — und sie wird
AUSGEWEITET, NICHT VERSCHOBEN.** Nach Bau B muss sie für die Alt-Tabelle UND für
die neue gelten. Wer sie beim Umbau nur umhängt, verliert die Zusicherung
ausgerechnet für die Tabelle, in die weiterhin geschrieben wird.
Die erste Aussage bleibt von dieser Scheibe unberührt; sie sichert die EINZIGE
tragende Schreib-Kontrolle ab.

**VERIFIKATION NACH DEM EINSPIELEN — präzise formuliert, weil die naheliegende
Formulierung zu schwach ist:** Geprüft wird NICHT "keine SELECT-Policy", sondern
**RLS AKTIVIERT UND POLICY-LISTE LEER**. Unter aktiver RLS ohne JEDE Policy ist
die Tabelle für `anon` und `authenticated` vollständig verschlossen; nur
`service_role` kommt durch. In EINER Abfrage prüfbar, in einer Sekunde
beurteilbar — kein Formvergleich, keine Auslegung.

**(e) DIE REIHENFOLGE DER ZIELE — ENTSCHIEDEN (OWNER, 2026-08-03):
PINTEREST TRÄGT DIE ERSTE SCHEIBE.**

Die fünf Ziele sind NICHT fünf Kopien desselben Musters; jedes bringt eigene
Pflichtfelder mit. Die Roadmap-Formulierung "additive Fan-Out-Ziele" (CLAUDE.md,
Roadmap-Zeile Phase 11) verdeckt das. Die Reihenfolge ist deshalb eine
Entscheidung und kein Zufall.

BEGRÜNDUNG, in dieser Reihenfolge:
- IDENTITÄT: Pinterest verlangt mindestens EINES von — gehashte E-Mail, gehashte
  Mobile-Advertising-IDs, ODER das PAAR aus Client-IP und User-Agent. Das Paar
  ALLEIN genügt, und genau das erheben wir heute schon.
- HÜLLE: Die Nutzlast ist der von Meta sehr ähnlich — ein `data`-Array mit
  `event_name`, `action_source`, `event_time`, `event_id`, `event_source_url`,
  `user_data` und `custom_data` mit `currency` und `value`.
- FOLGE: Die erste Scheibe braucht KEINE neue Datenerfassung. Sie trennt damit
  die ARCHITEKTUR-Aufgabe (Fan-Out) sauber von neuen FEATURE-Anforderungen —
  scheitert sie, liegt es am Fan-Out und nicht an einem fehlenden Datenfeld.

**DIE WAHL IST NICHT NACH KOMMERZIELLER RELEVANZ GETROFFEN**, sondern danach,
was die Scheibe BEWEISEN kann. Das steht hier ausdrücklich, weil es sonst als
Produktpriorität gelesen wird — Pinterest ist der geeignete ERSTE FALL, keine
Aussage darüber, welches Ziel dem Geschäft am meisten bringt.

**TIKTOK FOLGT ALS ZWEITES — mit einer AUSDRÜCKLICH OFFENEN Frage.** Ob IP und
User-Agent ALLEIN für einen erfolgreichen Aufruf genügen, ist NICHT geklärt: die
Sekundärquellen widersprechen sich, auch dazu, ob TikTok Deduplizierung
unterstützt. Die Zuordnung lehnt sich an gehashte E-Mail und die Klick-Kennung
`ttclid` aus der Anzeigen-URL an — `ttclid` zu lesen wäre eine NEUE Fähigkeit,
die wir heute nicht haben. VOR der TikTok-Scheibe an TIKTOKS EIGENER
Dokumentation nachmessen, NICHT an Blogs.

**(f) GA4 — GEPRÜFT (2026-08-03). DIE FRÜHERE ANNAHME IST BESTÄTIGT.**

Bis zu diesem Datum stand hier eine ungeprüfte Annahme des Architekten. Sie
trifft zu, und der Befund ist schärfer als die Annahme:
- Das GA4-Measurement-Protocol ist dazu gedacht, bereits über gtag oder GTM
  erhobene Ereignisse zu ERGÄNZEN. Ohne diese ist nur eingeschränkte Auswertung
  verfügbar.
- GA4 verknüpft geografische Angaben über die `client_id`, und geografische
  Daten lassen sich über das Protokoll NICHT selbst mitsenden.
- Die `client_id` steckt im `_ga`-Cookie, das gtag setzt — im Blocker-Fall also
  NICHT vorhanden.

**FOLGE, SCHÄRFER ALS BISHER: GA4 IST KEIN FAN-OUT-ZIEL IM SELBEN SINN WIE DIE
ANDEREN.** Es ist nicht nur zeitlich nach hinten zu schieben, sondern ALS ZIEL ZU
ÜBERDENKEN: Ein Protokoll, das voraussetzt, was der Blocker gerade verhindert,
löst nicht das Problem, für das der server-seitige Weg existiert.
Der Schlüssel `ga4` bleibt vom Namensraum her BESTEHEN (Entscheidung (a) wird
davon nicht berührt); was HINTER ihm liegt, ist offen.

**(g) DIE GEFAHR DER ÜBERANPASSUNG — AUFLAGE ERFÜLLT (2026-08-03).**

Pinterest ist Meta so ähnlich, dass eine Verallgemeinerung auf DIESER Basis
überangepasst wäre: Die Projektregel "Abstraktion erst bei 2+ Fällen" wäre nur
dem BUCHSTABEN nach erfüllt — zwei Fälle, aber derselbe Fall zweimal.
**DIE AUFLAGE LAUTETE:** Der Entwurf der Ziel-Schnittstelle wird GEGEN DIE
LINKEDIN-HÜLLE GEPRÜFT, BEVOR er festgeschrieben wird. Nicht gebaut — nur
daraufhin GELESEN, ob sie hineinpasst.
LinkedIn bricht die Annahme "gleiche Hülle, andere Zugangsdaten" VOLLSTÄNDIG:
eine conversion-URN, `conversionHappenedAt`, ein `conversionValue`-Objekt und ein
`userIds`-Array aus Paaren von `idType` und `idValue`.

**DIE PRÜFUNG IST AM 2026-08-03 GESCHEHEN. BEFUND:** Meta und Pinterest teilen
fast alles. LinkedIn teilt NICHTS davon — nicht die Feldnamen, nicht die
Verschachtelung, nicht die Zeiteinheit (Sekunden gegen Millisekunden). Gemeinsam
ist nur die BEDEUTUNG: welches Ereignis, wann, welcher Wert, welche Identität,
welche Kennung zur Entdopplung.

**VIER ANFORDERUNGEN, die daraus folgen und OHNE LinkedIn nicht sichtbar gewesen
wären — sie BINDEN den späteren Entwurf:**
1. **EIN ZIEL IST EIN ADAPTER, KEIN PARAMETERSATZ.** Der Adapter besitzt
   Endpunkt, Auth-Kopf, Hülle, Zeiteinheit UND Fehlerdeutung. Metas
   Fehler-Envelope mit `fbtrace_id` ist bereits heute typisiert und ist
   Meta-eigen.
2. **EIN ADAPTER MUSS EIN EREIGNIS ABLEHNEN KÖNNEN, ohne dass etwas kaputt ist.**
   LinkedIn braucht pro Ereignistyp eine vorab angelegte Conversion-Regel; fehlt
   sie, ist das Ereignis NICHT ABBILDBAR. Das ist etwas anderes als ein
   Netzwerkfehler und muss im Ergebnis UNTERSCHEIDBAR sein. Ohne LinkedIn hätte
   die Schnittstelle nur "gesendet" und "fehlgeschlagen" gekannt.
3. **IDENTITÄT IST EIN BÜNDEL, KEINE FESTE FELDLISTE.** Heute steht im Code Metas
   `user_data`-Form; Pinterest verwendet ZUFÄLLIG dieselben Namen, LinkedIn
   verlangt typisierte Paare. Die neutrale Form sagt, WELCHE Kennungen vorliegen;
   jeder Adapter nimmt sich, was er versteht.
4. **DAS SCHEMA DARF EINE KONFIGURATION PRO EREIGNISTYP NICHT AUSSCHLIESSEN.**
   Sie gibt es heute nicht und sie gehört NICHT in die erste Scheibe — aber ein
   Schema, das sie unmöglich macht, wäre bei LinkedIn eine Sackgasse (s. (h)).

**WARUM DIE AUFLAGE IHREN ZWECK ERFÜLLT HAT, ausdrücklich:** Ohne sie wäre die
Verallgemeinerung ein gemeinsamer Payload-Bauer mit Ziel-Feldern geworden — an
Meta und Pinterest überangepasst, beim DRITTEN Ziel gesprengt.

**(h) LINKEDIN BRAUCHT EINE KONFIGURATIONSDIMENSION, DIE ES NICHT GIBT.**
Conversion-Regeln müssen im Campaign Manager angelegt sein, BEVOR Ereignisse
gesendet werden. Der Betreiber legt also PRO EREIGNISTYP eine Regel an, und deren
Kennung müsste PRO EREIGNIS gespeichert werden.
Heute ist ein Ereignis ein FREIER STRING (`TrackConfig.event`) ohne jede
Zielkonfiguration daneben. Das ist eine GRÖSSERE PRODUKTÄNDERUNG als "ein
weiteres Ziel" — sie berührt, wie ein Ereignis überhaupt beschrieben wird.
NEBENBEFUND: Bei LinkedIn reist die IP UNVERSCHLÜSSELT als eigener ID-Typ.

**(i) GOOGLE ADS IST UNGEPRÜFT.** Von fünf Zielen sind DREI geprüft (Pinterest,
TikTok, LinkedIn) und GA4 ist geklärt. Google Ads wurde in dieser Runde NICHT
untersucht — weder Identitätsanforderungen noch Hülle noch Zugangsdaten.
Der Punkt steht hier als EIGENER Eintrag, damit die Lücke nicht in einer
Aufzählung untergeht: "vier von fünf betrachtet" liest sich sonst wie
Vollständigkeit.

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

### Zur ERSTEN SCHEIBE (Geheimnis-Tabelle) — Erhebung vom 2026-08-03

Dieselbe Provenienz-Regel wie oben: ÜBERNOMMEN, nicht in dieser Runde neu
erhoben. Andere Achse als die Punkte 1-7 — dort ging es um die Einwilligung,
hier um die Tabelle, die die erste Scheibe umstellt.

8. **DIE BEIDEN `WITH CHECK`-POLICIES WERDEN VON KEINEM CODEPFAD GENUTZT.**
   Sie stehen in `supabase/migrations/0005_project_tokens.sql:38-42`. Beide
   Schreibstellen (`src/app/projects/actions.ts:582-585` Upsert,
   `:656-659` Delete) und die eine Lesestelle (`src/lib/capi/token.ts:123-127`)
   laufen über den `service_role`-Client und umgehen die Zeilenregeln. Die
   Policies stammen aus einer FRÜHEREN Fassung, in der der Schreibweg über den
   Sitzungs-Client lief; der Wechsel ist in `actions.ts:543-546` festgehalten.
9. **DIE TRAGENDEN KONTROLLEN SIND ZWEI ANDERE — und das ist der wichtigste
   Punkt dieser Erhebung:**
   - die **FEHLENDE SELECT-Policy** (`0005:28-31`): unter aktiver RLS ohne
     SELECT-Policy ist die Tabelle für `anon` und `authenticated` unlesbar,
     auch für den Owner selbst;
   - das **OWNERSHIP-GATE in den zwei Server-Actions**, das den privilegierten
     Client ERST NACH bestandener Prüfung instanziiert
     (`actions.ts:566-580` bzw. `:644-655`).
10. **`user_id` existiert in der heutigen Tabelle AUSSCHLIESSLICH, um jene
    Policies zu bedienen** — der Kommentar an der Spalte sagt es wörtlich
    (`0005:15-16`: "user_id fuer die RLS-WITH-CHECK-Ownership … beim Schreiben").
11. **Das Geheimnis liegt im KLARTEXT.** `0005:17-20` benennt das ausdrücklich
    und nennt die Isolation — eigene Tabelle plus SELECT-Sperre — als tragende
    Kontrolle, NICHT Verschlüsselung.
12. **MIGRATIONEN WERDEN VON HAND im Supabase-SQL-Editor ausgeführt, VOR dem
    Code-Deploy.** Jede Migrationsdatei sagt es im Kopf (`0005:2`, `0019:2`,
    `0020:2`); `package.json:5-12` trägt kein Migrations-Skript, `ci.yml` fährt
    vier Gates ohne jede DB-Berührung, es gibt keine Supabase-CLI-Konfiguration.
    Es gibt bewusst KEINEN Runner.
    **EIN DOKUMENTIERTER SCHEMA-RÜCKWEG EXISTIERT NICHT** — weder in einer
    Migration noch in der Doku. Vercels Instant Rollback stellt CODE wieder her,
    NICHT das Schema.
13. **Die Datenbanktypen sind HANDGEPFLEGT.** Kein `Database`-Typ, kein
    typisierter `createClient<…>`, keine Supabase-CLI als Dependency, kein
    `gen types`-Schritt — es gibt KEINEN Generierungslauf, den eine zusätzliche
    Struktur stören könnte. Ebenso: KEIN `SELECT *` im Produktivcode; alle drei
    Zugriffe nennen ihre Spalten explizit.
14. **KEIN TEST KANN RLS PRÜFEN.** Die Suite mockt jeden Datenbankzugriff; die
    Gates laufen nachweislich ohne Umgebungsvariablen (`.github/workflows/ci.yml:19-26`,
    dort gemessen festgehalten). Eine Policy ist eine Eigenschaft der Datenbank —
    ohne echte Verbindung kann kein Test sie auslösen.
    **DIE RLS-LAGE IST AUSSCHLIESSLICH DURCH DIE MIGRATIONSDATEI UND EINE
    LIVE-PRÜFUNG GEDECKT.** Was die Suite deckt, ist die Anwendungsschicht — und
    zwar in ZWEI getrennten Aussagen, nicht in einer: kein privilegierter Client
    ohne bestandenes Gate, UND der authentifizierte Client fasst die
    Geheimnis-Tabelle nie an. Welche Tests welche Aussage tragen, steht bei der
    Policy-Entscheidung in (d). AUSNAHME VON DER PROVENIENZ-REGEL DIESES
    ABSCHNITTS, ausdrücklich: Dieser Punkt ist am 2026-08-05 ERNEUT am Code
    gemessen und richtiggestellt worden — die Fassung vom 2026-08-03 zog beide
    Aussagen fälschlich zu einer zusammen.
15. **`trackingKey` IST PROJEKTWEIT — bestätigt**, mit einem Grund, der über den
    Prüfauftrag hinausgeht: Der Ingest löst ihn gegen die Projektzeile auf
    (`src/lib/capi/token.ts:96-99`, Filter auf die server-autoritative Spalte),
    und er ist in BEREITS AUSGELIEFERTE Seiten EINGEBACKEN (`generate.ts:350`,
    `meta.ts:211`). Beim Entfernen des Tokens wird er bewusst ERHALTEN
    (`actions.ts:618-622`). **Eine Vervielfachung bräche live stehende Seiten.**
16. **`tokenSet` bräuchte eine Vervielfachung — aber ERST MIT DEM ZWEITEN ZIEL,
    NICHT IN DIESER SCHEIBE.** Er ist heute ein einzelner Boolean für genau ein
    Geheimnis (`src/lib/settings.ts:24`, `:80-82`), gelesen von der Oberfläche
    (`MeasureView.tsx:192`, `:211`, `:251`). Solange Meta das einzige Ziel ist,
    bleibt er richtig.

---

## Die ersten beiden Scheiben — und der Zuschnitt der ersten

**ÜBERHOLT AM 2026-08-05 — die Überschrift und der Einleitungssatz darunter
meinen mit "der zweiten Scheibe" noch PINTEREST. Pinterest ist jetzt die DRITTE
Scheibe; die zweite ist das geteilte Consent-Gate (s. "## Die zweite Scheibe —
DAS GETEILTE CONSENT-GATE (Zuschnitt)").** Der Stempel steht hier, statt den
Text zu ändern: was unten über die ERSTE Scheibe steht, ist unverändert richtig
und war der Maßstab, an dem sie gemessen wurde.

Die beiden Blocker aus der vorigen Fassung sind weg: (d) ist entschieden, die
Auflage aus (g) ist erfüllt. **DAMIT IST DIE REIHENFOLGE DER ERSTEN BEIDEN
SCHEIBEN BEKANNT** — und für die erste auch ihr Zuschnitt, s. "### Der Zuschnitt
der ersten Scheibe — DREI SCHRITTE in dieser Reihenfolge".

**ERSTE SCHEIBE: DIE UMSTELLUNG DER GEHEIMNIS-TABELLE, OHNE JEDE
VERHALTENSÄNDERUNG.** Meta bleibt einziges Ziel, alles funktioniert weiter, nur
an anderer Stelle gespeichert. Nichts am Fan-Out, nichts am Consent, kein neues
Netzwerk.

**PINTEREST IST DIE ZWEITE SCHEIBE**, nicht die erste — auch wenn (e) es als
"erstes Ziel" benennt. GRUND: Die Migration ist die RISKANTESTE Änderung dieser
Phase. Sie mit einem neuen Ziel zu bündeln hiesse, im Fehlerfall nicht zu wissen,
welche der beiden Wirkungen ihn verursacht hat. (e) entscheidet, WELCHES Ziel
zuerst kommt; diese Zeile entscheidet, dass VOR dem ersten Ziel die Umstellung
steht.

**ÜBERHOLT AM 2026-08-05 — FALSCH IST AUSSCHLIESSLICH DIE NUMMER: Pinterest ist
jetzt die DRITTE Scheibe** (die zweite ist das geteilte Consent-Gate, s. "## Die
zweite Scheibe — DAS GETEILTE CONSENT-GATE (Zuschnitt)"). **DIE BEGRÜNDUNG
DARÜBER BLEIBT GÜLTIG UND IST EINGELÖST** — die riskante Migration wurde NICHT
mit einem neuen Ziel gebündelt, sie ist allein gefahren und abgeschlossen. Der
Stempel nimmt den Satz also nicht zurück, er datiert ihn: Wer ihn als Rücknahme
liest, hält die Entscheidung für revidiert, die tatsächlich befolgt wurde.

**DIE ERHEBUNG IST GEFAHREN (2026-08-03)** und hat den Entwurf in (d) bestätigt;
ihre Befunde stehen oben unter "Zur ERSTEN SCHEIBE", die daraus folgende
Policy-Entscheidung in (d). Der Vorbehalt ist damit eingelöst.

### Der Zuschnitt der ersten Scheibe — DREI SCHRITTE in dieser Reihenfolge

**1. MIGRATION, VON HAND, VOR DEM CODE-DEPLOY.** Neue Tabelle mit (Projekt,
Ziel) als Schlüssel, RLS aktiviert, KEINE Policy, Trigger für den
Aktualisierungs-Zeitstempel, Constraint auf den Zielwert — NUR auf den
Meta-Schlüssel, Begründung in (d) und hier ausdrücklich NICHT wiederholt —,
Übernahme der bestehenden Zeilen als das Meta-Ziel, Protokoll-Eintrag als LETZTE
Anweisung.
**DIE ALTE TABELLE WIRD NICHT ANGEFASST** — ohne den zugehörigen Code ist diese
Migration ein NO-OP und damit gefahrlos früh einspielbar.

**DIE MIGRATION IST WIEDERHOLBAR — FOLGENLOS, NICHT SCHEITERND (ENTSCHIEDEN,
OWNER, 2026-08-05).** Ein zweiter Lauf bricht nicht ab, und er ÜBERSCHREIBT
NICHTS. Der zweite Teil ist der wichtigere und der Grund, warum er hier
ausgeschrieben steht: Wäre ein Wert nach dem ersten Lauf geändert worden, setzte
ein überschreibender zweiter Lauf ihn auf den alten zurück — STILLER DATENVERLUST
IM GEWAND EINER IDEMPOTENZ-MASSNAHME, und niemand sähe einen Fehler, weil die
Migration ja "durchgelaufen" ist. Wiederholbar heisst hier deshalb genau eines:
Die Übernahme lässt bestehende Zeilen unberührt.
Objekte, deren Anlegen keine "existiert bereits"-Form kennt, brauchen dafür einen
KATALOG-GUARD. Die Denkfigur wird hier nur BENANNT, nicht ausgeschrieben — sie
steht ausformuliert in CLAUDE.md, "## Offene Punkte", beim Event-Trigger.

**2. KATALOG-PRÜFUNG NACH DEM EINSPIELEN.** RLS aktiviert UND Policy-Liste leer
(s. die Verifikation in (d)). **DAZU EINE DRITTE, GLEICHRANGIGE PROBE: DIE
ÜBERNOMMENE ZEILENZAHL GEGEN DIE QUELLE** — und dafür wird die Ausgangszahl VOR
dem Lauf erhoben, als Positivkontrolle.
WARUM SIE NICHT WEGGELASSEN WERDEN DARF: "null Zeilen übernommen, weil die Quelle
leer war" und "null Zeilen übernommen, weil der Lesezugriff nicht griff" sehen am
ERGEBNIS identisch aus. Ohne die vorher erhobene Ausgangszahl ist der Unterschied
hinterher nicht mehr herstellbar. Der zweite Fall fiele sonst erst auf, wenn der
neue Lesepfad live ist — und DORT IST DER AUSFALL LAUTLOS: der Ingest antwortet
unverändert, die Browser-Seite läuft weiter, nur der Server-Forward stirbt. Ohne
diese Probe ist die Katalog-Prüfung genau an der Stelle blind, an der sie tragen
soll.
**ERST DANACH Code** — die Reihenfolge ist die bestehende fail-closed-Regel, nicht
eine Vorsichtsmassnahme dieser Scheibe.

**3. CODE: LESEN aus der neuen Tabelle, SCHREIBEN in BEIDE.**
**DER DOPPELSCHREIB IST DER GRUND, WARUM EIN CODE-ROLLBACK GEFAHRLOS IST:** Die
alte Fassung liest ihre unveränderte Tabelle — und auch das, was WÄHREND des
Fensters geschrieben wurde, steht dort. Ohne den Doppelschreib wären genau diese
Schreibvorgänge verloren. Das ist die Antwort auf den Umstand, dass ein
Schema-Rückweg nicht existiert (s. Ausgangslage Punkt 12).

**AUSDRÜCKLICH NICHT IN DIESER SCHEIBE:** die alte Spalte oder Tabelle
entfernen · `settings.capi` anfassen · `tokenSet` vervielfachen · Pinterest ·
irgendeine Verhaltensänderung.

**KEINE TABELLEN-, SPALTEN- ODER CONSTRAINT-NAMEN** stehen hier — die entstehen
in der Scheibe, nicht in diesem Dokument.

Diese Datei hat schon dreimal an einer erledigten Frage gehangen (erst (a), dann
(e), dann (d)/(g)) — sie benennt deshalb ausdrücklich, was NOCH davorliegt, statt
nur zu sagen, was erledigt ist. Hier ist es die Reihenfolge selbst: Schritt 2
steht zwischen Migration und Code, nicht daneben.

### Protokoll der ersten Scheibe — Vollzug und Abschluss

Der Dreischritt darüber ist der MASSSTAB; was hier steht, ist die MESSUNG dagegen.
Beide Vermerke standen zuvor zwischen den Schritten und haben den Maßstab damit
zerschnitten — Anweisung und Protokoll lagen ineinander.

**VOLLZOGEN AM 2026-08-05 — SCHRITT 1 UND SCHRITT 2.** Die Migration
(`supabase/migrations/0021_project_secrets.sql`) ist von Hand im SQL-Editor
gelaufen, die Katalog-Prüfung unmittelbar danach. Die folgenden Werte sind
GEMESSEN und vom Owner zurückgemeldet — keiner davon ist abgeleitet oder
gerundet:
- Ausgangszahl vor dem Lauf (Positivkontrolle): FÜNF Zeilen in der Alt-Tabelle.
- Protokoll-Eintrag 0021 vorhanden, applied_at gefüllt (2026-08-05) — der Lauf
  ist also bis zu seiner letzten Anweisung durchgelaufen.
- RLS aktiv: true.
- Policy-Liste: leer, NULL Zeilen.
- Übernahme: Quelle FÜNF, Ziel FÜNF, gleich; die Wertgleichheits-Probe meldet
  NULL Abweichungen.
Alle fünf Proben trafen ihre Erwartung. Die Probe selbst ist versioniert unter
`supabase/checks/project-secrets-umstellung.sql` und dort mit demselben Datum als
verifiziert vermerkt.

**BAU B IST DAMIT NICHT FREIGEGEBEN.** — EINGELÖST AM 2026-08-05, s. den
Abschluss darunter. Die drei Punkte bleiben unverändert stehen: sie sind der
Maßstab, an dem der Abschluss gemessen wurde, und ohne sie wäre nicht mehr
erkennbar, WAS dort eigentlich erfüllt worden ist.
Dieser Absatz stand hier, weil der Vermerk darüber sonst als vollständige
Freigabe gelesen wird:
- **EINE BEWERTUNGSSCHWELLE STEHT NOCH AUS** — die letzte der fünf, die vor dem
  Lauf festgelegt wurden: dass ein ZWEITER Lauf die Übernahme-Proben nicht
  verändert. Die vier anderen sind mit den Messwerten oben erfüllt. Bis dahin ist
  die entschiedene Wiederholbarkeit eine Zusage der Migrationsdatei, kein
  Nachweis.
- **DER NACHHOL-LAUF GEHÖRT UNMITTELBAR VOR DEN BAU-B-DEPLOY**, nicht irgendwann
  danach. Er hat ZWEI Funktionen: er weist die Wiederholbarkeit nach UND er holt
  jede Zeile nach, die seit dem ersten Lauf im Fenster entstanden ist. **DAS
  FREIGABE-GATE SIND DIE ÜBERNAHME-PROBEN NACH IHM**, nicht die vom 2026-08-05 —
  die waren im Moment ihrer Erhebung korrekt und können vom Fenster überholt
  worden sein.
- **SOLANGE BAU B NICHT DEPLOYT IST, SCHREIBT DER LAUFENDE CODE AUSSCHLIESSLICH
  IN DIE ALT-TABELLE.** Das ist der bewusste No-op-Zustand dieser Scheibe, kein
  Fehler — und genau der Grund, warum es den Nachhol-Lauf gibt.

**ABGESCHLOSSEN AM 2026-08-05 — SCHRITT 3 UND DAMIT DIE GANZE ERSTE SCHEIBE.**
Der Nachhol-Lauf ist gefahren, der Code ist deployt, der Live-Test bestätigt.
Die folgenden Werte sind GEMESSEN und vom Owner zurückgemeldet — keiner davon
ist abgeleitet:
- Deploy: Vercel-Commit d06a30b, Status Ready.
- Nachhol-Lauf gefahren; die Wertgleichheits-Probe danach: NULL Abweichungen.
- Bestandszählung nach dem Nachhol-Lauf: Quelle VIER, Ziel VIER, gleich.
- REGRESSION: Server-Event im Meta Events Manager unter "Empfangen von: Server",
  dedupliziert über die geteilte eventID.
- `/api/e` antwortet mit leerer 204. NACHTRAG ZUR MESSUNG, weil er sonst als
  Widerspruch stehenbliebe: Der zuvor gemeldete 200 war ein MESSFEHLER — gemessen
  worden war ein UI-Request, nicht der Beacon.
- DOPPELSCHREIB: über alle Bestandszeilen identischer Wert in BEIDEN Tabellen.
- LÖSCHPFAD: nach dem Entfernen über die Oberfläche trägt KEINE der beiden
  Tabellen noch eine Zeile für das Projekt.
- OWNERSHIP-GATE, Gegenprobe über die DevTools aus einem FREMDEN Account: die
  Aktion wird abgewiesen, und in KEINER der beiden Tabellen entsteht eine Zeile.

**ALLE FÜNF VORAB FESTGELEGTEN BEWERTUNGSSCHWELLEN SIND ERFÜLLT.** Die fünfte —
ein zweiter Lauf verändert die Übernahme-Proben nicht — ist damit NACHGEWIESEN
und nicht mehr nur zugesagt: der Nachhol-Lauf ist genau dieser zweite Lauf.

**DAS FENSTER IST GESCHLOSSEN.** Seit dem Deploy schreibt jeder Vorgang in beide
Tabellen; es kann keine Zeile mehr entstehen, die nur in einer von beiden steht.

**DIE BESTANDSZÄHLUNG TRÄGT MEHR ALS EINE ZAHL — deshalb steht sie hier und
nicht nur in der Prüf-Datei:** Der Rückgang von FÜNF auf VIER ist in BEIDEN
Tabellen angekommen. Das bestätigt den Doppel-Delete aus einer ANDEREN Richtung
als der Live-Schritt, und es schliesst zugleich eine überzählige Zeile aus — die
könnte die Wertgleichheits-Probe allein nicht sehen, weil sie von der
Alt-Tabelle ausgeht und eine Zeile, die es nur im Ziel gibt, nie berührt.

**DIE FREMDZUGRIFFS-GEGENPROBE IST STÄRKER AUSGEFALLEN ALS GEPLANT, und das ist
der Grund, sie eigens zu benennen:** Sie prüft nicht "der Owner darf", sondern
"ein FREMDER darf nicht — und es entsteht KEINE Zeile". Ein bloss abgewiesener
Aufruf hätte nichts bewiesen: Die Abweisung ist sichtbar, ein trotzdem
erfolgter Schreibvorgang wäre es nicht. Erst die Gegenprobe IN DER DATENBANK
macht aus "sieht abgewehrt aus" einen Nachweis.

**WAS DIESE SCHEIBE AUSDRÜCKLICH NICHT BEWEIST:** Die Alt-Tabelle bleibt
bestehen und wird weiter beschrieben. Ihr Rückbau ist eine EIGENE Scheibe mit
eigenem Nachweis und wird von diesem Abschluss NICHT mitgetragen. Sie ist die
einzige Rollback-Reserve, weil ein Schema-Rückweg nicht existiert (s.
Ausgangslage Punkt 12) — wer sie vorzeitig entfernt, nimmt die Absicherung mit,
die diese Scheibe überhaupt gefahrlos gemacht hat.

**LEKTION AUS DEM BAU — HEBUNGSKANDIDAT FÜR CLAUDE.md, "## Immer beachten"
(NICHT eingetragen; die Entscheidung darüber fällt am Phasenende):**
Beim Umbau ist ein Bestandstest HOHL geworden, nicht bloss veraltet. Er
behauptete die ABWESENHEIT eines Zugriffs auf die Alt-Tabelle im
Kill-Switch-Pfad — eine Aussage, die nach der Umstellung IMMER aufgegangen wäre,
weil der Lesepfad diese Tabelle gar nicht mehr kennt. Er meldete weiter Erfolg
und deckte nichts mehr.
VERALLGEMEINERTE FORM: Wird der GEGENSTAND einer Abwesenheits-Behauptung durch
einen Umbau entfernt, bleibt der Wächter grün und schützt nichts. Bei jedem
Umbau, der eine Quelle oder ein Ziel AUSTAUSCHT, sind deshalb die
Abwesenheits-Behauptungen eigens durchzugehen — sie sind die einzige Testart,
die durch das Verschwinden ihres Gegenstands STÄRKER aussieht statt schwächer.

---

## Die zweite Scheibe — DAS GETEILTE CONSENT-GATE (Zuschnitt)

**ENTSCHEIDUNG (OWNER, 2026-08-05): DIE ZWEITE SCHEIBE IST DAS GETEILTE
CONSENT-GATE. PINTEREST RÜCKT AUF SCHEIBE DREI.** Die frühere Reihenfolge —
Pinterest als zweite Scheibe — ist damit überholt.

BEGRÜNDUNG, in dieser Reihenfolge. Sie gehört zwingend dazu, sonst liest die
nächste Instanz die Umstellung als Verzögerung des eigentlichen Features:

1. **DIE HEUTIGE AUSWERTUNG MACHT AUS JEDEM OBJEKT EIN "ERLAUBT".** Das
   beschlossene Modell sagt das GEGENTEIL: fehlender Schlüssel = keine
   Einwilligung. Wer die Objektform einführt, ohne die Auswertung zu ändern,
   baut ein STILLES FAIL-OPEN — und trifft damit ausgerechnet den Betreiber, der
   sorgfältig war und sich Ziel für Ziel geäussert hat.
2. **EIN BOOLEAN KANN NICHT ZWISCHEN ZIELEN UNTERSCHEIDEN.** Solange die
   Einwilligung EIN Boolean ist, gilt: wer für Meta zugestimmt hat, hat für
   jedes weitere Ziel zugestimmt. Das ist keine Unschärfe, das widerspricht dem
   Verkaufsargument des Produkts.
3. **SIE FÄHRT ALLEIN** — dieselbe Begründung wie bei der ersten Scheibe: Die
   Scheibe hat KEINE Abhängigkeit zu Pinterest, ändert aber Verhalten auf
   BEREITS AUSGELIEFERTEN Seiten. Gebündelt wäre im Fehlerfall nicht zu
   erkennen, welche der beiden Wirkungen ihn verursacht hat.

### Der Zuschnitt der zweiten Scheibe

**IN DIESER SCHEIBE:** Die Einwilligungs-Auswertung wird aus der Meta-Laufzeit
HERAUSGEZOGEN an eine Stelle, die WEDER an der Pixel-ID NOCH an der
Mapping-Tabelle hängt, und beurteilt die Einwilligung ab dann JE ZIEL. Welche
Eingabe wie beurteilt wird, steht abschliessend unter "DIE AUSWERTUNGSREGEL".

**DIE AUSWERTUNGSREGEL (ENTSCHIEDEN, OWNER, 2026-08-05).** Sie steht hier
VOLLSTÄNDIG, damit der Bau nicht zwischen zwei Fassungen wählen muss, und
ausdrücklich als ABSICHT und nicht als Nebenwirkung — sonst wird sie später als
Fehler "repariert".

**DIE TRENNLINIE IST NICHT DIE DATENFORM, SONDERN EINE EINZIGE FRAGE: HAT SICH
DER BETREIBER ÜBERHAUPT GEÄUSSERT?** Dieser Satz trägt alle sechs Zeilen
darunter; wer sie ohne ihn liest, hält sie für eine Liste von Sonderfällen.
- **NICHTS GESETZT: ERLAUBT.** Er hat nie entschieden.
- **FUNKTION: AUFRUFEN. EIN WURF: VERBOTEN.**
- **KEIN FUNKTIONSZWANG** — ist der Wert DIREKT gesetzt, wird er DIREKT
  ausgewertet. Wer den Wert direkt zuweist, hat sich SORGFÄLTIG geäussert; ihn
  als "nie entschieden" zu behandeln wäre genau der Fehler, den diese Scheibe
  abschafft. Es ist ausserdem die NAHELIEGENDSTE Verwechslung, sobald die
  Objektform dokumentiert ist.
- **WERT IST GENAU `true`: ERLAUBT.**
- **WERT IST EIN OBJEKT:** der Ziel-Schlüssel muss GENAU `true` sein. Fehlt er
  oder ist er etwas anderes: VERBOTEN. Ein FELD fällt hierunter und ist damit
  verboten.
- **ALLES ÜBRIGE: VERBOTEN.**

**"GENAU `true`" STATT "TRUTHY" — die Begründung gehört zwingend dazu, sonst
wird die Strenge später als Härte gelesen und aufgeweicht:** Truthy wieder
zuzulassen, auch nur für Schlüsselwerte, wäre die WIEDERHOLUNG genau des
Fehlers, der diese Scheibe ausgelöst hat.

**DIE REICHWEITE — Teil DIESER Regel, kein eigener Punkt:** Es wechseln MEHRERE
Eingabeformen von erlaubt auf verboten, nicht nur die Objektform ohne Schlüssel;
auch ZEICHENKETTE, ZAHL, `null` und FELD. Der Grund ist für alle derselbe: **Ein
Datenschutz-Gate blockiert bei Fehlkonfiguration, statt mutmasslich
durchzulassen.** Fail-closed heisst hier, dass der Betreiber es MERKT — sein
Tracking hört auf. Fail-open heisst, dass es NIEMAND merkt.
**FOLGE, die mit hierhergehört: Die Verhaltensänderung dieser Scheibe ist damit
GRÖSSER als beim Zuschnitt angenommen.** Der Live-Test hat entsprechend mehr zu
zeigen als nur die Objektform.

**DIE PLATZIERUNG (ENTSCHIEDEN, OWNER, 2026-08-05): Die Auswertung wird IMMER
DANN erzeugt, wenn MINDESTENS EIN Tracking-Konsument erzeugt wird, und steht VOR
allen. Sie hängt WEDER an der Pixel-ID NOCH an der Mapping-Tabelle.**
- WARUM NICHT INS WIRING: Eine publizierte Seite ohne Mappings trägt den
  PageView-Emitter, aber KEIN Wiring — am Code gemessen. Die Auswertung dort
  abzulegen hiesse, sie in der nächsten Scheibe wieder herauszuholen.
- WARUM DIE ZUSAGE "REINE TEXTSEITE OHNE SCRIPT" INTAKT BLEIBT: Ohne Konsument
  gibt es nichts einzuwilligen, also auch keinen Block.
**DER MECHANISMUS IST OFFEN** und wird als PFLICHT-GATE des Bau-Prompts geführt,
nicht hier entschieden: ob der Erzeuger den Publish- vom Export-Pfad
unterscheidet und ob der Emitter-Einfüger den Block tragen könnte, ist
UNGEMESSEN.

**AUSDRÜCKLICH NICHT IN DIESER SCHEIBE, je mit Grund:**
- **DAS WIRE-FELD** (das Einwilligungs-Signal reist zum Server). Bei EINEM Ziel
  genügt das Client-Gate: ohne Einwilligung geht der Conversion-Beacon gar nicht
  erst ab. Erst wenn ein Beacon für ein Ziel erlaubt und für ein anderes
  verboten sein kann, MUSS der Server es wissen. Die Scheibe bleibt damit rein
  clientseitig — kein Ingest, kein Forward, kein Schema.
- **DER PAGEVIEW-EMITTER UNTER DAS GATE.** Das ist eine echte
  Verhaltensänderung: sie kann Seitenaufrufe unterdrücken, die heute gezählt
  werden. Zusammengebaut wäre bei einem Fehlschlag nicht erkennbar, welche
  Hälfte ihn verursacht hat. EIGENE Scheibe, direkt danach.
- **PINTEREST, ein zweites Ziel, jede Änderung am Forward.**
- **DIE GENERISCHE AKTIONS-EINWILLIGUNG.** Sie ist KEIN Bauziel dieser Scheibe,
  aber eine AUFLAGE an ihren Entwurf: das Gate muss sie später bedienen können,
  OHNE dass ein zweites Urteil entsteht.

### Zwei gemessene Befunde zur Testlage DIESER Scheibe

PROVENIENZ: am Code gemessen in der Stufe-1-Runde vom 2026-08-05.

**(a) DER TEST-HELFER WÄHLT SEIN SCRIPT STILL.** `mountAndWire` in
`src/lib/generate.test.ts` nimmt das ERSTE Script, das nicht der Datenblock ist.
Ein DRITTES Script macht die Wahl mehrdeutig, OHNE dass etwas rot wird. Das ist
eine Schwäche des HELFERS, unabhängig davon, welcher Mechanismus gewählt wird —
hier festgehalten, NICHT gelöst.

**(b) DIE SUITE FÜHRT AUS, sie vergleicht nicht nur Text.** `mountAndWire`
evaluiert den erzeugten Text und prüft WIRKUNGEN — das ist stärker als erwartet.
Was sie trotzdem NICHT zeigt: Sie läuft nicht im Browser, sie evaluiert genau EIN
Script, sie sieht den PageView-Emitter nie, und sie kennt keinen Betreiber-Hook,
der erst NACH dem Parsen gesetzt wird.

### Drei gemessene Bindungen, die die DRITTE Scheibe binden

PROVENIENZ: am Code gemessen in der Aufklärungs-Runde vom 2026-08-05 (read-only).
Sie stehen hier und nicht in einer Randnotiz, damit die dritte Scheibe sie
findet, bevor sie zugeschnitten wird.

**(a) DER FORWARD WARTET.** Ein Aufruf, im Request erwartet, gedeckelt auf DREI
Sekunden — NICHT im Hintergrund-Mechanismus, in dem der Persist läuft. Zwei
seriell erwartete Empfänger verdoppelten das auf dem heissesten Pfad des
Produkts. ZU KLÄREN VOR DEM ZWEITEN ZIEL.

**(b) ES GIBT KEINEN NEUTRALEN ORT FÜR EINE EVENT-KENNUNG.** Beide
Erzeugungsstellen liegen im Meta-Pfad bzw. im PageView-Emitter, und DIESELBE
Kennung trägt den Verlustraten-Join. Ein zweites Ziel fasst damit die
Marquee-Metrik an — das ist keine Nebenwirkung, die man beim Bauen bemerkt,
sondern eine Vorbedingung.

**(c) DIE EINWILLIGUNGS-AUSWERTUNG LEBT HEUTE IM META-LAUFZEIT-TEXT** und
existiert OHNE Pixel-ID gar nicht. Das ist der Grund, warum das Herausziehen die
SCHEIBE IST und nicht ihr Nebenprodukt.

### Was der Stufe-1-Plan beantworten MUSS — als Fragen, nicht als Vorgaben

Sie sind AM CODE zu klären; hier steht keine Antwort, damit keine geraten wird.

- An welcher STELLE im ausgelieferten Dokument steht die Auswertung, damit BEIDE
  späteren Konsumenten sie erreichen? Verdrahtungs-Text und Emitter entstehen an
  verschiedenen Punkten; ihre REIHENFOLGE im Dokument entscheidet.
- Was passiert, wenn die Auswertung FEHLT, weil ein Konsument sie zeitlich VOR
  ihrer Definition erreicht?
- Welche ZIEL-SCHLÜSSEL kennt das Gate zu diesem Zeitpunkt, und WOHER?

**KEIN PROTOKOLLBLOCK** — es gibt noch nichts zu protokollieren. Er entsteht
nach dem Bau, getrennt vom Zuschnitt, wie bei der ersten Scheibe.
