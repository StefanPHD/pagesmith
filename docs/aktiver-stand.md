# AKTIVER STAND — Phase 11.1 (LinkedIn als viertes Fan-Out-Ziel)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.1. Sie trägt den
Zuschnitt der Scheiben, die Entscheidungen, die über ihre Scheibe hinaus binden, den
gemeldeten Vorrat und — sobald etwas gebaut UND live geprüft ist — die Scheiben-Vermerke.
Angelegt am 2026-08-17, VOR der ersten Scheibe: erst das Gedächtnis, dann der Code.

**SIE IST DAS PFLICHT-GATE JEDES BAU- UND AUFKLÄRUNGS-PROMPTS DIESER PHASE** ("Auftrag
0"), zusammen mit CLAUDE.md und docs/immer-beachten.md. Das Verfahren dahinter steht in
CLAUDE.md, "## Aktiver Stand — Verfahren ab Phase 10"; das Detail zu Anlegen,
Fortschreiben und der Hebung am Phasenende in docs/arbeitsweise.md. Existiert diese Datei
nicht, läuft keine Phase — sie existiert also genau so lange, wie 11.1 offen ist, und
wandert am Phasenende ins Archiv.

**WAS SIE NICHT IST:** Sie beschreibt einen ZUSCHNITT, keinen Bestand. Der gemessene
Zustand der Datenbank steht in docs/db-stand.md, die dauerhaften Regeln in
docs/immer-beachten.md, die Anbieter-Befunde in docs/ziel-befunde.md. Wer hier eine Regel
einträgt, macht aus einem Zuschnitt eine Vorgabe, die keine Phase überlebt.

## Verzeichnis der Abschnitte

Der Zweck dieses Verzeichnisses ist eine BELEGBARE Umfangs-Ansage: "lies Abschnitt X plus
das Verzeichnis" ist damit eine prüfbare Aussage und keine Hoffnung. GRUND, und er ist
gemessen: Die Standdatei der Phase 11 wuchs auf rund 2 800 Zeilen, und JEDER Prompt
verlangte "lies sie vollständig" — eine Auflage, die mit der Länge unerfüllbar wird und
dann still nicht mehr erfüllt wird.

- ## Verzeichnis der Abschnitte
- ## Fortschreibungsregeln
- ## Gegenstand der Phase
- ## Scheibe 11.1a — Zugangsdatum ablegen
- ## Scheibe 11.1b — Die verwendeten Ereignisnamen
- ## Scheibe 11.1c — Ein Urteil über die Auslieferbarkeit
- ## Scheibe 11.1d — Die Conversion-Regel-Kennung ablegen
- ## Entscheidungen, die über ihre Scheibe hinaus binden
- ## Vorrat — gemeldet, nicht gebaut
- ## Hebungs-Kandidaten
- ## Scheiben-Vermerke

## Fortschreibungsregeln

Wörtlich als REGEL, nicht als Hinweis:

- **DIE VERMERK-NUMMERN SIND STABIL UND WERDEN NIE NEU VERGEBEN.** Ein neuer Vermerk
  tritt HINTEN an, auch wenn er der jüngste ist und auch wenn die Reihenfolge dadurch
  nicht chronologisch aussieht. GRUND: Eine Nachnummerierung hat in Phase 11 lebende
  Verweise getötet — ein Verweis nennt die Nummer, nicht das Datum, und er wird nicht
  rot, wenn die Nummer weiterwandert.
- **DIE LÜCKEN-REGEL:** Ein Vermerk OHNE Commit-Nummer ist der jüngste, noch nicht
  committete. Es darf immer nur EINE solche Lücke geben. Steht eine zweite da, ist
  entweder ein Commit nicht nachgetragen worden oder ein Vermerk beschreibt etwas, das
  nie eingecheckt wurde — beides ist zu klären, bevor weitergebaut wird.
- **PROVENIENZ AN JEDER ANGABE:** GEMESSEN (am Repo oder live, mit Datum) oder GELESEN
  (mit Quelle). Eine Angabe ohne Provenienz ist hier nicht schreibbar. Eine Aussage über
  bestehenden Code steht entweder als FRAGE oder trägt GEMESSEN mit Datum — nie als
  beiläufige Behauptung.
- **DER ORT IST DER SYMBOLNAME, NIE EINE ZEILENNUMMER.** Namen überleben Refactorings;
  eine falsche Zeilennummer ist teurer als keine, weil sie auf eine ANDERE Stelle zeigt,
  statt zum Suchen zu zwingen.
- **NICHTS WIRD UMSORTIERT.** Neue Abschnitte treten hinten an und bekommen eine Zeile im
  Verzeichnis.

## Gegenstand der Phase

**LinkedIn als VIERTES Fan-Out-Ziel.** Die drei bestehenden Ziele sind meta, pinterest und
tiktok (GEMESSEN am Repo, 2026-08-17: `TRACKING_TARGETS` in `src/lib/settings.ts`).

**DIE KENNUNGS-FRAGE IST ENTSCHIEDEN:** Gebaut wird auf die KLARTEXT-IP als
Identitäts-Merkmal. Ihre ANNAHME durch die Schnittstelle ist GEMESSEN (docs/ziel-befunde.md,
Abschnitt "LinkedIn (Conversions API)", Teil (i)). Ein Lesen von Eingabefeld-Werten ist
dafür NICHT erforderlich; der Befund dazu — und die Reichweite seines Nicht-Treffers —
steht an der Roadmap-Zeile 11.1 in CLAUDE.md.

## Scheibe 11.1a — Zugangsdatum ablegen

Die erste Scheibe legt das Zugangsdatum ab und macht sonst nichts. Sie ist bewusst so
geschnitten, dass sie am heissesten Pfad der Plattform NICHTS ändert.

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-17, nach dem bestätigten Live-Test. Hier standen die ANWEISUNGEN
FÜR die Scheibe: die Migration samt Bauform und der Auflage, dass jedes Ziel seine EIGENE
Constraint-Erweiterung mitbringt · der Schreibpfad nach dem Muster des Token-Flows · der
BEDARF an einem Ort für die Eingabe, mit offen gelassener Bauform · die Ableitung des
Zustands aus der Geheimnis-Tabelle statt aus dem Einstellungs-Blob. Sie sind mit dem
Vollzug abgelaufen.
WAS GEBAUT UND GEMESSEN WURDE, STEHT IN VERMERK 1 — und nur weil es dort steht, durfte es
hier weg. Zwei Dinge daraus sind KEINE Anweisung mehr, sondern Tatsachen über den
gebauten Code, und sie stehen deshalb dort: dass KEIN Schreibpfad entstehen musste
(`setCapiToken` war bereits ziel-generisch), und dass die Karte ohne öffentliches Feld
auskommt.
DIE ZWEI PFLICHT-STOPPS DIESER SCHEIBE (docs/db-stand.md + docs/db-regeln.md vor einer
Migration) waren keine Erfindung dieses Zuschnitts, sie stehen dauerhaft in CLAUDE.md und
gelten unabhängig von dieser Datei weiter.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe. Ihr Ort ist ab jetzt die Roadmap-Zeile 11.1 in CLAUDE.md bzw.
der Zuschnitt von 11.1b.

- **KEIN ADAPTER, KEIN FORWARD, KEIN EINTRAG IM FAN-OUT.** Ohne die
  Conversion-Regel-Kennung ist das Ziel nicht sendefähig — ein Adapter hätte nichts, wohin
  er sendet.
- **KEINE ENTSCHEIDUNG ÜBER DIE ABLAGE DER REGEL-KENNUNG.** Sie gilt JE EREIGNISTYP, und
  der Einstellungs-Blob ist CLIENT-besessen. Das ist Trigger (ii) der
  Primärschlüssel-Entscheidung (CLAUDE.md, "## Offene Punkte") und gehört in eine EIGENE
  Runde, nicht als Nebenzeile hierher.
- **KEIN EINWILLIGUNGS-VERHALTEN — UND DAS IST NICHT DASSELBE WIE "KEIN EINTRAG".**
  Ausgeschlossen war das VERHALTEN; der TYP-EINTRAG war strukturell erzwungen und ist
  gesetzt worden. VOLLZOGEN UND NACHZULESEN IN VERMERK 1, Punkt (a): welche Werte gesetzt
  sind, warum `false` dort NICHT "strenger als die Doktrin" heisst, und die Falle — ein
  heute folgenloser Eintrag wird in 11.1b wirksam, ohne dass sich an ihm etwas ändert und
  ohne dass irgendwo etwas rot wird.
- **KEINE BEHANDLUNG VON ABLAUF ODER WIDERRUF, KEIN BLEIBENDES SIGNAL.** Dass eine
  LinkedIn-Verbindung ohne Zutun des Kunden brechen kann, ist an der Roadmap-Zeile 11.1 als
  Befund festgehalten; OB und WIE das ein Signal bekommt, ist dort ausdrücklich nicht
  entschieden.
- **KEINE AUTORISIERUNGSSCHICHT.** Sie ist gemeinsames Fundament mit 11.2 und wäre, nur
  für LinkedIn gebaut, überangepasst.

### Die tragende Invariante

**Nach dieser Scheibe verhält sich ein Projekt MIT hinterlegtem LinkedIn-Zugangsdatum am
Ingest EXAKT wie eines ohne:** keine zusätzliche Abfrage, kein zusätzlicher Empfänger,
keine Änderung an der garantierten leeren 204. Sie ist der Prüfstein jeder Änderung dieser
Scheibe — wer sie bricht, hat nicht mehr diese Scheibe gebaut.

### Warum der Schnitt nichts verbaut

Ein Zugangsdatum ist ein SKALAR je (Projekt, Ziel) — genau die Form, die die Tabelle hält.
Mehrere KENNUNGEN je Ziel brechen den Schlüssel (project_id, target) NICHT; nur mehrere
EMPFÄNGER desselben Typs je Projekt täten es. Die beiden Achsen sehen beim Lesen wie eine
aus, und wer sie zusammenzieht, baut ein Schema um, dem nichts fehlt.

## Scheibe 11.1b — Die verwendeten Ereignisnamen

Die in einem Projekt VERWENDETEN Track-Ereignisnamen sind aus der KONFIGURATION ableitbar
— als VEREINIGUNG über beide Varianten-Mengen. GEBAUT, GEPUSHT UND LIVE BELEGT
(2026-08-18); was entstanden ist und was gemessen wurde, steht in Vermerk 2.

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-18, nach dem bestätigten Live-Test. Hier standen die ANWEISUNGEN FÜR
die Scheibe: die Herleitung, warum es KEINEN Ort gibt, der die verwendeten Namen aus der
Konfiguration ermittelt · die drei Messbefunde vom 2026-08-12, die den Schnitt trugen (die
Vereinigung als Nenner · KEINE zusätzliche Datenbank-Runde, weil beide Mengen ohnehin in
derselben Projekt-Ladeantwort reisen · „unvollständig" ist aus der Konfiguration zu
rechnen) · die Fundstelle jener Befunde in `docs/claude-history/backlog-polish.md` samt der
Falle, dass ihr Anfang in ASCII-Umschrift geschrieben ist und eine wörtliche Suche sie
deshalb NICHT findet. Sie sind mit dem Vollzug abgelaufen.
EINE DIESER ANGABEN IST NICHT NUR ABGELAUFEN, SONDERN SEIT DEM VOLLZUG FALSCH — und das
ist der Grund, warum sie GESTRICHEN und nicht bloss gekürzt ist: „es gibt heute KEINEN
Ort, der die verwendeten Namen aus der Konfiguration ermittelt". Es gibt ihn seit dieser
Scheibe (`usedTrackEventNames` in `src/lib/tracking/event-names.ts`). Stehengeblieben wäre
sie eine TATSACHENBEHAUPTUNG ÜBER DEN CODE, die beim nächsten Zuschnitt einen zweiten
Rechenweg rechtfertigt.
DIE FUNDSTELLEN-FALLE IST NICHT VERLOREN: Sie steht als eigener Punkt im Vorrat („DER
ZEIGER IN CLAUDE.md AUF `docs/claude-history/backlog-polish.md` IST FÜR EINE WÖRTLICHE
SUCHE TOT") und wird dort weitergeführt.
DIE ZWEI OFFENEN FRAGEN SIND BEANTWORTET (Owner-Entscheidung 2026-08-18) und laufen mit
ab: die Ableitung liegt als REINE FUNKTION neben dem Prädikat, der AUFRUF im Container;
die Oberfläche bekommt einen EIGENEN Abschnitt in `MeasureView` zwischen „Tracking-Pixel"
und „Statistik". Was an den Antworten über die Scheibe hinausreicht, steht in Vermerk 2.
WAS GEBAUT UND GEMESSEN WURDE, STEHT IN VERMERK 2 — und nur weil es dort steht, durfte es
hier weg.

### Was über diese Scheibe hinaus bindet

- **EINE ZUORDNUNG EREIGNISNAME -> URN BRAUCHT EINEN SCHLÜSSELRAUM.** Der Satz hat den
  Schnitt getragen, und er bindet 11.1c: dort wird gegen genau diese Menge geschlüsselt.
  `TrackConfig.event` (`src/lib/mappings.ts`) ist ein FREIER Nutzer-String — GEMESSEN am
  Code (2026-08-17): der Typ ist `string` ohne Einschränkung; die Oberfläche bietet eine
  Vorschlagsliste (`META_STANDARD_EVENTS` in `src/lib/tracking/meta.ts`) plus einen
  Sentinel für einen frei getippten Namen, aber sie erzwingt nichts. OHNE DIESE MENGE
  tippt der Betreiber ZWEI Zeichenketten, die zusammenpassen müssen — und nichts wird rot,
  wenn sie es nicht tun.
- **„UNVOLLSTÄNDIG" IST AUS DER KONFIGURATION ZU RECHNEN, NIE AUS LAUFZEITDATEN** (GEMESSEN
  am Repo, 2026-08-12): Ein nicht beliefertes Ziel hinterlässt in KEINEM persistierten
  Datensatz eine Spur — wer die Antwort aus den Ereignissen ableiten wollte, leitete sie
  aus dem Nichts ab. Der Analytics-Lesepfad `getEventCounts` beantwortet diese Frage NICHT;
  er aggregiert Laufzeitdaten.
- **EIN PRÄDIKAT, KEIN ZWEITES URTEIL.** Das Prädikat zieht die Namen aus EINER Menge, die
  Vereinigung ruft es ZWEIMAL auf. Zwei Instanzen derselben Frage laufen auseinander — in
  diesem Projekt bereits geschehen; die Gegenmassnahme heisst geteiltes Prädikat statt
  zweiter Ausformulierung (`hasPixelId`/`hasSecret` in
  `src/lib/tracking/target-readiness.ts` als Vorbild).
- **DIE UNTERSCHEIDUNG „B EXISTIERT NICHT" GEGEN „B IST LEER" IST AM WERT NICHT MESSBAR.**
  GEMESSEN am Code (2026-08-17): `publishPairs` (`src/components/CodeImporter.tsx`) liefert
  `pairB.mappings` in BEIDEN Zuständen als leeres Array (`stashMappings ?? []`); ob eine B
  existiert, wird GETRENNT abgeleitet — `hasVariantB` (dieselbe Datei) liest das HTML
  (`activeVariant === "b" || stashHtml !== null`) und NICHT die Mappings. Die Vereinigung
  mit der leeren Menge ist die IDENTITÄT, die Namen sind in beiden Fällen gleich; die
  Wirkung liegt ALLEIN in der AUSSAGE. Wer sie für redundant hält und streicht, lässt die
  Oberfläche Vollständigkeit über eine Variante behaupten, die es nicht gibt, ohne dass
  irgendwo etwas rot wird. LIVE BELEGT — s. Vermerk 2, Schritte 4 und 5.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe.

- **KEINE URN, KEINE ABLAGE-ENTSCHEIDUNG.** Das ist 11.1c und schlüsselt dann gegen eine
  Menge, die existiert.
- **KEINE NORMALISIERUNG ÜBER TRIM HINAUS.** Der freie Nutzer-String ist eine tragende
  Projektregel — `isForwardable` hängt daran (`docs/immer-beachten.md`). Ihn zum Schlüssel
  zu härten ist eine EIGENE Entscheidung mit eigenem Nachweis. GEMESSEN am Code
  (2026-08-17): GENAU EINE Stelle fasst den Wert vor der Ablage an, und sie trimmt nur
  (`handleSubmit` in `src/components/ActionPanel.tsx`); `upsertMapping` legt unverändert
  ab, `saveProject` schreibt das Literal ohne Prüfung.
- **KEINE EINDEUTIGKEIT.** Zwei Elemente mit demselben Ereignisnamen sind ein REGULÄRER
  Zustand: Der Modell-Schlüssel ist `(elementId, type)`, der Name kommt in KEINEM Schlüssel
  vor (GEMESSEN am Code, 2026-08-17, an `upsertMapping`/`findMapping`/`removeMapping`/
  `mappingsEqual` in `src/lib/mappings.ts`). Die Ableitung liefert eine MENGE; Duplikate
  verschwinden dabei, und das ist richtig.
- **KEIN RIEGEL GEGEN LEERE NAMEN.** Die Oberflächen-Schranke bleibt, wie sie ist. GEMESSEN
  (2026-08-17): Sie IST eine Oberflächen-Schranke und KEINE Modell-Zusicherung — `valid`
  in `ActionPanel.tsx` speist den `disabled`-Zustand und einen frühen Rücksprung, während
  der Typ, `upsertMapping` und `saveProject` nichts prüfen.

### Die tragende Invariante

**Diese Scheibe ändert NICHTS am ausgelieferten Text und NICHTS am Ingest. Sie leitet ab
und zeigt an.** Sie ist der Prüfstein jeder Änderung dieser Scheibe — wer sie bricht, hat
nicht mehr diese Scheibe gebaut.

## Scheibe 11.1c — Ein Urteil über die Auslieferbarkeit

Die Frage **„trägt dieses Ziel eine Kennung?"** wird ZIEL-BEWUSST beantwortet — an EINER
Stelle, von der aus die drei bestehenden Aufrufer sie lesen. **GEBAUT, GEPUSHT UND LIVE
BELEGT (2026-08-18); was entstanden ist und was gemessen wurde, steht in Vermerk 3.**

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-18, nach dem bestätigten Live-Test. Hier standen die ANWEISUNGEN FÜR
die Scheibe, und sie sind mit dem Vollzug abgelaufen:

- **DIE STILLE FEHLERKETTE**, die den Schnitt trug: Die LinkedIn-Kennung gilt JE
  EREIGNISTYP und ist KEIN Skalar; ohne vorbereitetes Urteil lieferte das Prädikat `false`,
  und daran hingen die drei Aufrufer mit drei Wirkungen — darunter das Consent-Memo, das
  den AUSGELIEFERTEN Text speist. Ohne Schlüssel im Draht greift am Ingest fail-closed.
  **DIE FOLGE DAVON IST NICHT WEG, sie steht als bindende Entscheidung unter
  „## Entscheidungen" („SOBALD LINKEDIN EINE KENNUNG TRÄGT …") und gilt 11.1d.**
- **DIE BEGRÜNDUNG, WARUM ZWEI SCHEIBEN STATT EINER:** Ein Umbau am geteilten Urteil
  berührt Resolver UND ausgelieferten Text; läge daneben eine Verhaltensänderung, wäre bei
  einem Live-Fehlschlag nicht erkennbar, WELCHE Achse gebrochen ist. Eingelöst — der
  Byte-Vergleich hat genau diese Trennung ausgenutzt.
- **DER PFLICHT-STOPP FÜR DIE LIVE-ANLEITUNG** („ohne gesicherte Vorher-Kopie kein
  Deploy"). Er hat gewirkt, und WAS DARAUS GEWORDEN IST, steht in Vermerk 3 — als
  BEOBACHTUNG, nicht als Regel für künftige Anleitungen.
- **DIE FESTSTELLUNG, DASS DIE SCHEIBE NICHT DEMOBAR IST** (Owner 2026-08-18), sondern
  BEWEISBAR. Sie war eine Aussage über DIESE Scheibe und ist mit ihrem Nachweis erledigt.

**DIE OFFENE FRAGE ZUR PROP IST NICHT BEANTWORTET WORDEN — sie ist GEGENSTANDSLOS
GEWORDEN**, und der Unterschied trägt: Mit der gebauten Signatur (Wert + Ziel) ist `target`
in der Karte bereits eine Prop, die Umstellung kostete dort keine Prop-Änderung. **Die
Frage selbst besteht weiter und ist in den Vorrat gewandert** („KANN DIE GESPEICHERTE
KENNUNG AN DER KARTE EIN BOOLEAN WERDEN?"); sie gehört keiner Scheibe.

### Der Ort — ENTSCHIEDEN (Owner, 2026-08-18): `src/lib/settings.ts`, neben `getPixelId`

Die Begründung gehört in den Zuschnitt, weil sie sonst beim nächsten Aufräumen fehlt:

- **NICHT `src/lib/tracking/target-readiness.ts`.** Ihr Kopf verbietet wörtlich „keine
  Ziel-Liste, kein Record über Ziele, kein Vergleich gegen einen Zielwert", und
  `src/lib/tracking/target-adapters.ts` ZITIERT dieses Verbot. Eine Signatur, die das Ziel
  nur ENTGEGENNIMMT, verletzt den Wortlaut zwar nicht — jene Datei definiert sich aber als
  eine, die Tatsachen ENTGEGENNIMMT. Eine Funktion, die selbst `getPixelId` ruft,
  BESCHAFFT sich die Tatsache. **Das Verbot wird damit weder neu gefasst noch umgangen.**
  **RICHTIGGESTELLT AM 2026-08-18, NICHT GESTEMPELT — der Wortlaut darüber bleibt lesbar,
  die Richtigstellung tritt daneben:** Der Satz „eine Funktion, die selbst `getPixelId`
  ruft, BESCHAFFT sich die Tatsache" SETZT DIE VERWORFENE SIGNATUR VORAUS. Gebaut ist
  `hasTargetPixelId(pixelId, target)` (GEMESSEN am Code, 2026-08-18) — sie ruft `getPixelId`
  NICHT, sondern nimmt den Wert entgegen, genau wie das Primitiv.
  **DIE TRAGENDE FASSUNG LAUTET DESHALB:** Jene Datei definiert sich als ZIEL-BLIND, und ein
  Ziel überhaupt zu FÜHREN ist dort ausgeschlossen — UNABHÄNGIG davon, ob es bewertet wird.
  Diese Fassung trägt die gebaute Signatur, die alte nicht.
  **WARUM DAS KEINE KOSMETIK IST:** Der Zuschnitt hat den ORT entschieden, BEVOR die
  SIGNATUR vorlag, und seine Begründung setzte stillschweigend eine bestimmte voraus. Ein
  Maßstab, dessen Begründung auf das Gebaute nicht passt, taugt beim nächsten Zuschnitt
  nicht — und der nächste ist 11.1d, der genau hier ansetzt.
- **NICHT `src/lib/tracking/target-adapters.ts`.** Ihr Kopf bestimmt sich über
  BUILD-Tatsachen: „Ob dieser Build einen Empfaenger mitbringt, setzt kein Betreiber — das
  aendert sich nur mit einem Deploy." Eine Kennung setzt der Betreiber, und sie ändert sich
  OHNE Deploy.
- **NICHT `src/lib/tracking/consent-targets.ts`.** Dort liegt das CONSENT-Vokabular; der
  Zweck jener Datei ist die TRENNUNG zweier Vokabulare, die zufällig gleich lauten.
- **WARUM `settings.ts` TRÄGT — derselbe Satz von oben in der Gegenrichtung:** Der
  Ausschlussgrund, den zwei Köpfe gegen diese Datei zitieren („dort haette es ausgesehen
  wie etwas, das ein Betreiber setzt"), trifft eine KENNUNGS-Frage gerade NICHT — sie IST
  etwas, das ein Betreiber setzt. Dazu liegen `getPixelId` und `TRACKING_TARGETS` bereits
  dort; **Ziel und Kennung wohnen in dieser Datei schon zusammen.**

### Die Acht-Zählung — sie gehört ausdrücklich hierher

Der Kopf von `src/lib/tracking/target-adapters.ts` führt ACHT Stellen, die einen Zielwert
oder eine ziel-geschlüsselte Aussage tragen. **DIESE SCHEIBE FÜGT KEINE NEUNTE HINZU** —
die Funktion ist ziel-GENERISCH: sie nimmt ein Ziel entgegen und delegiert, sie trägt
keinen Zielwert und urteilt für kein Ziel anders. **ERST 11.1d MACHT SIE
ZIEL-UNTERSCHEIDEND, und DORT ist die Acht nachzuziehen.** Jener Kopf hat seine Zahl
bereits ZWEIMAL falsch geführt (er korrigiert eine alte SECHS selbst); wer das übersieht,
hinterlässt die dritte.

### Die tragende Invariante

**DER AUSGELIEFERTE TEXT IST VOR UND NACH DEM DEPLOY BYTE-IDENTISCH.** Er ist es, weil sich
für kein Ziel die Antwort ändert; `consentTargets` ist der Draht, über den eine Änderung
ihn erreichen würde. **Ein Unterschied ist kein Schönheitsfehler, sondern der Beweis, dass
die Scheibe ihr Versprechen bricht.** Sie ist der Prüfstein jeder Änderung dieser Scheibe —
wer sie bricht, hat nicht mehr diese Scheibe gebaut. GEFAHREN UND GEHALTEN, mit ihrer
Reichweite: s. Vermerk 3.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe.

- **KEINE ABLAGE, KEINE URN, KEIN NEUES FELD in `settings`.** Das ist 11.1d, und erst dort
  urteilt die Funktion je Ziel VERSCHIEDEN.
- **KEINE ÄNDERUNG AN `src/lib/tracking/target-readiness.ts`.** `hasPixelId` bleibt im
  Wortlaut, was es ist: ein SKALARES PRIMITIV ohne Zielkenntnis. Die neue Funktion RUFT es.
- **KEINE BERÜHRUNG DER ZWEI PRÄDIKATFREIEN VERGLEICHE** in `src/lib/tracking/meta.ts`
  (`buildMetaRuntime`) und `src/lib/generate.ts` (`buildWiringScript`). GEMESSEN am Code
  (2026-08-18): Ihr Kennungs-Pfad ist META-SPEZIFISCH — `PS_PIXEL_ID`, Metas
  Einwilligungsschlüssel, kein anderes Ziel kommt darin vor. Sie fragen „hat META einen
  Pixel", und Metas Kennung ist ein Skalar und bleibt einer. Der Vorrats-Trigger dazu ist
  ZU WEIT gefasst und wird in derselben Runde VERENGT (s. „## Vorrat").
- **KEINE MIGRATION, KEIN SCHEMA.**

## Scheibe 11.1d — Die Conversion-Regel-Kennung ablegen

Eine Zuordnung **Ereignisname -> Conversion-Regel-URN** wird abgelegt, und LinkedIn wird
dadurch **AUSLIEFERFÄHIG — noch nicht SENDEND.**

**DIE BAU-AUSSAGE, die dazugehört, weil ein Betreiber sie sonst falsch liest:** Nach dieser
Scheibe zeigt die Karte ein VOLLSTÄNDIG KONFIGURIERTES Ziel, das erst mit dem Adapter
(11.1e) liefert. Wer die Karte als Liefer-Zusage liest, wartet auf Conversions, die noch
niemand sendet.

### Die Form — ENTSCHIEDEN (Owner, 2026-08-18): F1

Ein EIGENES Feld unter `settings.pixels.linkedin`, **NEBEN** `pixelId`, nicht darin. Die
Begründung gehört in den Zuschnitt, weil sie sonst beim nächsten Aufräumen fehlt:

- **GEGEN F2 (`pixelId` wird polymorph).** `getPixelId` (`src/lib/settings.ts`) sagt heute
  IMMER eine Zeichenkette zu (`settings.pixels?.[target]?.pixelId?.trim() ?? ""`), und FÜNF
  Stellen setzen einen Skalar voraus (GEMESSEN am Code, 2026-08-18): `settingsEqual`
  (`src/lib/settings.ts`) · `forwardToMeta` (`src/lib/capi/meta-forward.ts`) ·
  `forwardToTiktok` (`src/lib/capi/tiktok-forward.ts`) · die Übergabe an
  `forwardToPinterest` (`dispatchForward` in `src/lib/capi/ingest.ts`) · das Eingabefeld der
  Karte (`value={pixelId}` in `src/components/TargetCard.tsx`).
  **ALLE FÜNF TRAGEN EINEN COMPILER-RIEGEL** — `ProjectSettings.pixels.<ziel>.pixelId?:
  string`, `CapiConfig.pixelId: string`, `PinterestConfig.adAccountId: string` und der
  Prop-Typ der Karte. Solange die Typen `string` bleiben, bricht F2 dort LAUT.
  **GENAU DAS IST ABER DER PUNKT:** F2 müsste als ERSTES diese Typen weiten — und danach
  sind mehrere still. `forwardToMeta` interpoliert dann `[object Object]` in den
  Endpunkt-Pfad, die Übergabe an Pinterest reicht es durch `encodeURIComponent`, die Karte
  zeigt es im Eingabefeld.
  **UND EINE SECHSTE STELLE BRAUCHT DIE WEITUNG GAR NICHT ERST — sie ist von Anfang an
  still, und sie ist der eigentliche Grund gegen F2:** `hasTargetPixelId`
  (`src/lib/settings.ts`) nimmt `unknown` entgegen und delegiert an `hasPixelId`, das auf
  `typeof === "string"` prüft. Ein Objekt liefert dort `false`, **ohne Wurf, ohne
  Typfehler, ohne Meldung** — das Ziel fiele lautlos aus der Auslieferung. Ausgerechnet die
  Funktion aus 11.1c wäre der einzige Pfad ohne jeden Riegel.
- **GEGEN F3 (eigene Tabelle oder eigene Spalte), zwei getrennte Gründe.**
  Eine EIGENE TABELLE kann nicht in die bestehende Abfrage einziehen: Der Filter der
  zweiten Abfrage in `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`) lautet
  `.in("target", withPixel.map((entry) => entry.target))` und entsteht ERST aus dem Ergebnis
  der ersten (GEMESSEN am Code, 2026-08-18). Es wäre also eine DRITTE Runde je Beacon —
  gegen die `/api/e`-Schlankheitsregel, auf dem meistgetroffenen Pfad der Plattform.
  Eine SPALTE AUF `project_secrets` käme ohne Zusatzrunde aus und scheitert am ANDEREN:
  Jene Tabelle trägt RLS aktiv und **KEINE einzige Policy** (GELESEN, `docs/db-stand.md`) —
  sie ist bewusst unlesbar, und genau daran hängt der Schutz des Zugangsdatums. **Eine URN
  muss der Betreiber sehen und ändern können; ein Geheimnis nie.**
- **FÜR F1.** Die Achse liegt im Projekt bereits: KENNUNG im Einstellungs-Blob,
  ZUGANGSDATUM in der Geheimnis-Tabelle. **Die URN ist eine KENNUNG** — GEMESSEN
  2026-08-17 (`docs/ziel-befunde.md`, Abschnitt „LinkedIn (Conversions API)", Teile (c) und
  (l)): Sie steht in der NUTZLAST des Aufrufs; eine nicht existierende Regel-Kennung ergibt
  403, ein formfalsches Präfix 422 mit einer Validator-Meldung auf das Nutzlast-Feld.

### Was drin ist

- das Feld unter `settings.pixels.linkedin`, neben `pixelId`
- ein eigener LESER für die Zuordnung
- **`hasTargetPixelId` wird ZIEL-UNTERSCHEIDEND:** für die drei bestehenden Ziele der
  Skalar, für LinkedIn eine nicht-leere Zuordnung. Genau dafür steht der zweite Parameter
  seit 11.1c da — **und hier hört die Funktion auf, blind zu delegieren.**
  **RICHTIGGESTELLT AM 2026-08-18, NICHT GESTEMPELT — der Wortlaut darüber bleibt lesbar,
  die Richtigstellung tritt daneben; er ist der Maßstab, gegen den der Bau misst, und ein
  Maßstab mit einer falschen Angabe taugt nicht:** DIESER SATZ HAT KEINEN GEGENSTAND.
  GEMESSEN am Code (2026-08-18): Alle DREI Aufrufer schicken als ersten Parameter einen
  SKALAR — `hasTargetPixelId(getPixelId(settings, t), t)` im Consent-Memo
  (`consentTargets`, `src/components/CodeImporter.tsx`), `hasTargetPixelId(entry.pixelId,
  entry.target)` im `withPixel`-Filter (`getCapiConfigByTrackingKey`,
  `src/lib/capi/token.ts`) und `hasTargetPixelId(savedPixelId, target)` an der
  Auslieferungs-Zeile der Karte (`TargetCard`, `src/components/TargetCard.tsx`). **Die
  Zuordnung erreicht die Funktion damit NIE.** Der zweite Parameter ist NOTWENDIG, aber
  NICHT HINREICHEND: Eine Fallunterscheidung über Ziele in ihrem Rumpf hätte nichts zu
  befragen.
  **ENTSCHIEDEN (Owner, 2026-08-18): K4 — EIN ZWEITES, ZIEL-GENERISCHES PRÄDIKAT NEBEN
  `hasTargetPixelId`.** Jenes bleibt UNANGETASTET; der Resolver in `src/lib/capi/token.ts`
  behält es.
  **DIE BEGRÜNDUNG IST NICHT DER PREIS, SONDERN DIE FRAGE** — und sie steht hier wörtlich,
  sonst liest die nächste Runde K4 als Verdopplung: Es sind ab 11.1d **ZWEI VERSCHIEDENE
  FRAGEN**, die bisher zusammenfielen, weil ALLE Ziele eine Skalar-Kennung trugen.
  · **„Kann ich für dieses Ziel eine `CapiConfig` bauen?"** — braucht einen SKALAR. Das ist
    `hasTargetPixelId`. Der Resolver behält sie; zöge er LinkedIn in die Geheimnis-Abfrage,
    wäre das zusätzliche Arbeit JE BEACON für ein Ziel ohne Adapter.
  · **„Ist dieses Ziel auslieferfähig?"** — braucht IRGENDEINE Kennungsform.
  **K4 IST DAMIT KEIN ZWEITES URTEIL ÜBER DIESELBE FRAGE, SONDERN EIN URTEIL JE FRAGE** —
  genau das, was der Kopf von `src/lib/tracking/target-readiness.ts` verlangt.
  **AUFLAGE, OHNE DIE DIE UNTERSCHEIDUNG VERLORENGEHT:** BEIDE Fundstellen sagen AN IHREM
  ORT, WELCHE Frage sie beantworten. Ohne das sieht es wie eine Verdopplung aus und wird
  beim nächsten Aufräumen zusammengelegt.
  **WARUM DIE ANDEREN DREI BAUFORMEN FALLEN, je ein Satz** (sie sind in Stufe 1 am Code
  geprüft worden und stehen hier, damit niemand sie ein zweites Mal erhebt):
  · **K3** (form-tolerantes Prädikat, uniformer Wert): Der Parameter nähme ZWEI Gestalten
    an — dieselbe Polymorphie, mit der DIESER Zuschnitt F2 verworfen hat. Den stillen
    Ausfallpfad zur Bauform zu erheben, nachdem er das Hauptargument gegen F2 war, geht
    nicht.
  · **K2** (Fallunterscheidung in den Aufrufern): verlagert das Ziel-Literal in eine
    KERN-Datei, die heute keines führt.
  · **K1** (Fallunterscheidung in `settings.ts` plus geweitete Signatur): bricht zusätzlich
    `src/lib/capi/token.ts`, eine geschützte Datei.
  **DER NAME IST HIER NICHT FESTGELEGT** — er gehört in den Bau-Prompt. Vorgeschlagen und
  begründet ist `hasDeliverableIdentity`: Er benennt die FRAGE („ist dieses Ziel
  auslieferfähig?"), nicht ihre FORM und nicht einen ihrer LESER. Ein Name über den
  Consent-Draht (etwa `hasTargetConsentConfig`) wird falsch, sobald ein zweiter Konsument
  dazukommt — und die Karte ist bereits der zweite.
  **DER NAME IST ENTSCHIEDEN (Owner, 2026-08-18): `isTargetDeliverable`.** Der Vorschlag
  darüber bleibt lesbar, die Entscheidung tritt daneben — mit BEIDEN Begründungen, weil
  die zweite sonst beim nächsten Ziel neu erhoben wird:
  · **DAS PRINZIP GILT UNVERÄNDERT:** Der Name benennt die FRAGE, nicht ihre FORM und
    nicht einen ihrer LESER. Deshalb fiel `hasTargetConsentConfig` — die Karte ist bereits
    der zweite Konsument.
  · **WARUM NICHT „Identity":** Das Wort ist in diesem Projekt für die PERSONEN-Identität
    belegt — die Roadmap-Zeile 11.1 (`CLAUDE.md`) führt „Identitäts-Merkmal",
    „Identitäts-Form" und „Personen-Identität" durchgehend für Klartext-IP, gehashte
    E-Mail und Klick-Kennung; die Datenklassen-Entscheidung vom 2026-08-15 (`CLAUDE.md`,
    „## Offene Punkte") sagt „Ein Identitäts-Merkmal wird ausschliesslich DURCHGELEITET".
    In diesem Vokabular läse sich der Name als Frage nach dem Kennungs-Paar der NUTZLAST
    statt nach der BETREIBER-Konfiguration — **die teuerste Verwechslung, die dieses Ziel
    zu bieten hat.**
  · **WARUM `is…` STATT `has…`:** Die `has…`-Familie fragt nach einem DING (`hasPixelId`,
    `hasSecret`, `hasAdapter`, `hasVariantB`), die `is…`-Familie beurteilt eine
    EIGENSCHAFT (`isTrackingTarget`, `isForwardable`, `isValidRedirectUrl`). Hier wird
    kein Ding gesucht. Der Präfix macht die AUFLAGE schon am NAMEN sichtbar:
    `isTargetDeliverable` und `hasTargetPixelId` sind auf den ersten Blick verschiedene
    Fragen.
- **`settingsEqual` MUSS DAS NEUE FELD MITVERGLEICHEN — SONST IST ES EIN STILLER VERLUST.**
  GEMESSEN am Code (2026-08-18): `settingsEqual` (`src/lib/settings.ts`) vergleicht
  AUSSCHLIESSLICH `getPixelId` über `TRACKING_TARGETS`
  (`TRACKING_TARGETS.every((t) => getPixelId(a, t) === getPixelId(b, t))`), und `dirty`
  (`src/components/CodeImporter.tsx`) hängt daran
  (`code !== savedCode || !mappingsEqual(...) || !settingsEqual(...)`).
  **OHNE ERWEITERUNG UM DAS NEUE FELD BLEIBT DER SPEICHERN-KNOPF NACH EINER URN-EINGABE
  INAKTIV, und der Wert ist beim nächsten Projektwechsel weg** — ohne Warnung, ohne
  Meldung. Das ist derselbe Schaden, den der Kommentar an `settingsEqual` für das ZWEITE
  Ziel bereits beschreibt.
  **ES STEHT ALS EIGENER PUNKT UND NICHT ALS NEBENZEILE, weil KEIN heutiger Test ihn
  fängt:** Der Vergleich ist über die Kennungs-Achse geschrieben, und ein neues Feld
  daneben lässt ihn unverändert grün.
- eine Oberfläche, an der je Ereignisname aus dem Schlüsselraum von 11.1b eine URN
  eingetragen wird
- **DER VERWAISTE EINTRAG — ENTSCHIEDEN (Owner, 2026-08-18): BEHALTEN.** Die Zuordnung wird
  AN SICH SELBST gemessen: nicht-leer heisst nicht-leer, **OHNE Abgleich gegen den
  Schlüsselraum** aus 11.1b.
  **DER GRUND IST DIE ALTERNATIVE, nicht die Bequemlichkeit:** Ein Abgleich machte
  `consentTargets` erstmals MAPPING-abhängig, und der ausgelieferte Text hinge davon ab,
  welche Variante gerade bearbeitet wird. Das bricht die bindende Entscheidung
  „`consentTargets` IST VARIANTENBLIND, UND DAS IST KORREKT" (s. „## Entscheidungen") IM
  WORTLAUT — und 11.1b baut darauf auf.
  **WAS DEN FALL ENTSCHÄRFT** (GEMESSEN am Code, 2026-08-18): Ein VERWAISTES MAPPING
  liefert seinen Ereignisnamen WEITERHIN an den Schlüsselraum — `trackEventNames`
  (`src/lib/tracking/event-names.ts`) iteriert über ALLE Mappings und kennt `findOrphans`
  (`src/lib/mappings.ts`) nicht. Der Fall tritt also NUR ein, wenn jemand ein Mapping
  LÖSCHT oder seinen Namen ÄNDERT — nicht, wenn ein ELEMENT aus dem Code verschwindet.
  **UND DASS EINE URN WIEDERAUFLEBT, IST DANN KEIN FEHLER:** gleicher Ereignisname, gleiche
  Conversion-Regel.
  **WAS DAMIT NICHT ENTSCHIEDEN IST:** dass verwaiste Zuordnungen unsichtbar bleiben
  SOLLEN. Sie anzuzeigen ist der bessere Endzustand und steht als eigener Punkt im Vorrat
  („VERWAISTE ZUORDNUNGEN ANZEIGEN"); ein zweiter Verwaisten-Begriff in der Oberfläche ist
  eine EIGENE Scheibe.

### Die tragende Invariante — SIE IST DIESMAL ZWEISEITIG

Und das ist der Unterschied zu 11.1c:

- **(a) Für die DREI bestehenden Ziele ändert sich am ausgelieferten Text NICHTS.** Ein
  Projekt OHNE LinkedIn-Zuordnung bleibt byte-identisch — das ist der Regressionsnachweis.
- **(b) Für LinkedIn ändert er sich, und zwar GEWOLLT**, sobald eine Zuordnung eingetragen
  ist.

**EINE SCHEIBE, DIE BEIDES ZUSAGT, BRAUCHT BEIDE NACHWEISE GETRENNT.** Wer nur (a) prüft,
hat die Scheibe nicht gemessen; wer nur (b) prüft, hat die Regression nicht.

### Drei Dinge kippen an derselben Stelle

Sie gehören zusammen in den Zuschnitt, weil sie alle drei am Wachsen von `consentTargets`
(`src/components/CodeImporter.tsx`) hängen:

1. **DER STRUKTURELLE KIPPPUNKT** (GEMESSEN am Code, 2026-08-18): `const many =
   consentTargets.length > 0` (`src/lib/tracking/meta.ts`) steuert VIER Bau-Zeit-Zweige.
   Ein Projekt ohne JEDE Kennung, das LinkedIn als ERSTES bekommt, kippt vom Einzel- in den
   Sammel-Pfad — **eine andere BAUFORM des Dokuments, nicht ein zusätzlicher Eintrag.** Das
   ist ein EIGENER Live-Test-Fall.
   **RICHTIGGESTELLT AM 2026-08-18, NICHT GESTEMPELT — die Zahl VIER ist zu niedrig; der
   Wortlaut darüber bleibt lesbar, die Richtigstellung tritt daneben.** GEMESSEN am Code
   (2026-08-18): `many` wird in `buildMetaRuntime` an **SIEBEN** Stellen GELESEN (der Kopf
   von `__psMetaInit` über `initParam` und `initJudgement`, der Aufruf `initCallStmt`, die
   fbq-Zeilen `fbqStmt`, die Bestätigung `confirmCallStmt`, der Kopf von `__psMetaFire`
   über `fireHead` und die Endmontage `if (many)`), plus eine **ACHTE** in
   `buildCapiBeaconStatement` — einer ANDEREN Funktion an DERSELBEN Bedingung
   (`consentTargets.length > 0`).
   **HERKUNFT DER FALSCHEN ZAHL, und sie gehört dazu:** Sie stammt aus dem
   Quell-Kommentar an der Deklaration von `many`, wo sie die vier benannten WACHEN meint.
   Sie ist beim Schreiben dieses Zuschnitts als GESAMTZAHL gehoben worden.
   **DIE FOLGE FÜR DIE LIVE-ANLEITUNG, und das ist der Punkt dieser Korrektur:** Der
   Unterschied zwischen Einzel- und Sammel-Pfad ist GRÖSSER als vier Zweige — er betrifft
   auch die ENDMONTAGE (im Sammel-Pfad steht die Kennung `var eid` VOR dem
   `__psMetaInit`-Aufruf, im Einzel-Pfad DAHINTER) und die FORM des `cns`-Objekts im
   Beacon (`__c === true` gegen `__c["<schlüssel>"] === true`, also Boolean gegen Objekt).
   **DIE ANLEITUNG NENNT WIEDERERKENNUNGS-MERKMALE, KEINE ZAHL** — eine Zahl lädt dazu
   ein, nach genau so vielen Unterschieden zu suchen und beim vierten aufzuhören.
2. **DIE EINBAHNSTRASSE WIRD SCHARF:** Bereits publizierte Seiten tragen den neuen
   Schlüssel NICHT und müssen NEU VERÖFFENTLICHT werden. Der Kunde trägt eine URN ein,
   sieht eine konfigurierte Karte — und die Live-Seite beliefert nichts. Das ist genau der
   Defekt, der seit dem 2026-08-18 in `CLAUDE.md`, „## Offene Punkte", als eigener Eintrag
   steht („NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST"); **DIESE
   Scheibe löst ihn aus.** IN DIE LIVE-ANLEITUNG GEHÖRT ER ALS PFLICHT-SCHRITT, nicht als
   Hinweis.
3. **DER STILLE AUSFALLPFAD**, s. oben bei F2 — er ist der Grund, warum `hasTargetPixelId`
   hier ziel-unterscheidend wird und nicht bloss einen weiteren Wert entgegennimmt.
   **NACHGEZOGEN AM 2026-08-18:** Der zweite Halbsatz trägt dieselbe Annahme wie der
   richtiggestellte Satz unter „Was drin ist" und fällt mit ihm — `hasTargetPixelId` wird
   NICHT ziel-unterscheidend, das Urteil über die Auslieferbarkeit zieht unter K4 in ein
   ZWEITES, ziel-generisches Prädikat um. **DER BEFUND SELBST IST UNBERÜHRT und bleibt
   der Grund für K4:** Ein Objekt an `hasTargetPixelId` liefert `false` ohne Wurf, ohne
   Typfehler, ohne Meldung — deshalb wird dort GAR KEIN Objekt hineingereicht. Wer nur
   diesen Punkt liest, hält die Bauform noch für die alte; die Korrektur steht unter „Was
   drin ist" (Regelfall: „WER EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR
   FALLE", `docs/immer-beachten.md`).

### Was ausdrücklich NICHT drin ist, je mit seinem Grund

- **KEIN ADAPTER, KEIN FORWARD, KEIN EINTRAG IN `TARGETS_WITH_ADAPTER`.** Der Riegel aus
  11.1a hält; sein Wächter (`src/lib/tracking/target-adapters.test.ts`) bleibt stehen und
  fällt erst in 11.1e.
- **KEINE ÄNDERUNG AN `pixelId` ODER `getPixelId`.** F2 ist verworfen.
- **KEINE MIGRATION, KEIN SCHEMA.** Der Blob nimmt es auf.
- **KEIN DRIFT-INDIKATOR.** Er ist die nächste Zeile und schützt dann ALLE VIER Ziele; ihn
  hier mitzubauen bündelte zwei Achsen.
- **KEINE NORMALISIERUNG DER EREIGNISNAMEN.** Der freie Nutzer-String bleibt, wie er ist —
  die Regel dazu steht in `docs/immer-beachten.md`.

### Zwei offene Fragen — FRAGEN, kein Befund

Sie werden im Stufe-1-Prompt AM CODE beantwortet, nicht hier.

**NACHGEZOGEN AM 2026-08-18 — DER STUFE-1-PROMPT IST GELAUFEN, UND DAMIT IST DIESE
ÜBERSCHRIFT NUR NOCH ZUR HÄLFTE WAHR. Der Wortlaut beider Fragen bleibt UNVERÄNDERT
stehen** (er sagt, was am Tag des Zuschnitts offen war), **die Antworten treten daneben:**
· **FRAGE 1 IST BEANTWORTET** — nicht mit einer der dort betrachteten Bauformen, sondern
  mit K4: `hasTargetPixelId` hört gar nicht auf zu delegieren, das Urteil über die
  Auslieferbarkeit zieht in ein zweites, ziel-generisches Prädikat um. Die Antwort samt
  Messung und den drei verworfenen Bauformen steht unter „Was drin ist". **DIE
  ACHT-ZÄHLUNG IN `src/lib/tracking/target-adapters.ts` IST DAMIT NICHT NACHZUZIEHEN:**
  K4 trägt keinen Zielwert, keine Ziel-Liste und keinen Record über Ziele — sie ist keine
  NEUNTE Stelle.
· **VON FRAGE 2 IST DER ZWEITE TEIL BEANTWORTET** (was mit einer bereits eingetragenen URN
  geschieht, wenn ihr Name verschwindet): BEHALTEN, s. den eigenen Punkt unter „Was drin
  ist". **DER ERSTE TEIL BLEIBT OFFEN** — wie die Eingabe aussieht und wo sie sitzt.

1. **WO HÖRT `hasTargetPixelId` AUF ZU DELEGIEREN?** Eine Fallunterscheidung über Ziele in
   `src/lib/settings.ts` wäre eine ZIEL-GESCHLÜSSELTE Aussage — dann ist sie die NEUNTE
   Stelle, und die ACHT-Zählung im Kopf von `src/lib/tracking/target-adapters.ts` ist
   nachzuziehen (Vermerk 3 hält fest, dass genau dieser Zeitpunkt gemeint war). **Ob das
   die einzige Bauform ist, ist offen.**
2. **WIE SIEHT DIE EINGABE AUS?** Der Schlüsselraum ist eine MENGE von Namen (11.1b), die
   URNs sind frei getippt. Ob das eine Zeile je Name ist oder etwas anderes — und was
   geschieht, wenn ein Name nachträglich VERSCHWINDET, weil sein Mapping gelöscht wurde.
   WAS DAZU BEREITS FESTSTEHT und die Frage NICHT beantwortet: Der Schlüsselraum ist eine
   ABLEITUNG aus den Mappings (`usedTrackEventNames`, `src/lib/tracking/event-names.ts`) —
   verschwindet ein Mapping, verschwindet der Name aus der Menge. Was mit einer bereits
   eingetragenen URN geschieht, entscheidet die ABLAGE-Form, und die ist Gegenstand dieser
   Frage.

## Entscheidungen, die über ihre Scheibe hinaus binden

- **GEBAUT WIRD AUF DIE KLARTEXT-IP ALS KENNUNG; li_fat_id IST EINE EIGENE FOLGE-SCHEIBE**
  (Owner-Entscheidung, 2026-08-17).
  GRUND: Ein URL-Parameter wäre ein NEUER nutzerkontrollierter Wert auf dem Ingest-Pfad —
  genau der vierte 204-Kandidat, der im Backlog bisher als "betrifft Code, den es nicht
  gibt" geführt wird. Mit li_fat_id gäbe es ihn, und die Frage nach dem Containment wäre
  Teil dieser Scheibe statt einer eigenen.
  GRENZE, die die Entscheidung trägt: Die Reihenfolge verbaut nichts, weil `userIds` eine
  LISTE ist — ein zweites Merkmal tritt später neben das erste, es ersetzt es nicht
  (GELESEN am Schema des Anbieters, 2026-08-17).
- **DIE MATCH-QUALITÄT VON IP-ONLY IST VOR ECHTEM TRAFFIC PRINZIPIELL NICHT MESSBAR**
  (docs/ziel-befunde.md, Teil (h)): Die Conversions-Zählung des Anbieters steigt erst bei
  einer Zuordnung zu einer echten Person, die bei Testdaten nie eintritt.
  FOLGE FÜR JEDE LIVE-TEST-ANLEITUNG DIESER PHASE: Ein Live-Test kann "ANGEKOMMEN" zeigen,
  NIE "HAT GEWIRKT". Wer die Zählung als Sonde nimmt, meldet einen Fehlschlag, der keiner
  ist.
- **`consentTargets` IST VARIANTENBLIND, UND DAS IST KORREKT** (GEMESSEN am Code,
  2026-08-17). Es liest `settings.pixels` — eine PROJEKTWEITE Spalte — und KEINE
  Mapping-Menge; seine Abhängigkeitsliste führt weder `activeVariant` noch `mappings`
  (`consentTargets` in `src/components/CodeImporter.tsx`, über `getPixelId` in
  `src/lib/settings.ts`). Beide Varianten bekommen denselben Draht aus demselben Closure:
  `buildDocumentFor` reicht dasselbe `consentTargets` an beide Aufrufe weiter, und der
  Publish schreibt beide in EINEM atomaren Vorgang.
  FOLGE: Der Fall „Kennung nur in EINER Variante gesetzt" ist am heutigen Modell NICHT
  KONSTRUIERBAR — die Kennung existiert genau einmal je Projekt. Was je Variante
  auseinanderlaufen kann, sind die MAPPINGS (welche Ereignisse feuern), nicht die Frage,
  ob ein Ziel eine Kennung trägt. DIESE ENTWARNUNG IST DIE VORAUSSETZUNG DER SCHEIBE 11.1b:
  Ohne sie wäre die Vereinigung der Ereignisnamen nicht die einzige Achse, auf der A und B
  divergieren.
  DIE GRENZE, DIE MITMUSS: Das gilt für den ZUSAMMENHANG IM CODE, nicht für einen bereits
  PUBLIZIERTEN Text. Der Draht ist eine EINBAHNSTRASSE — eine Seite trägt den
  Schlüsselstand ihres letzten Publish, und ein Kennungs-Wechsel ohne Re-Publish erreicht
  sie nicht. Ob das für ein konkretes Projekt zutrifft, ist eine Frage an die DATENBANK
  (`projects.published_content`), nicht ans Repo — und sie ist hier NICHT beantwortet.
- **DER PAGEVIEW-TOKEN IST AUS DEM SCHLÜSSELRAUM AUSGESCHLOSSEN — ALS NEGATIV-AUSSCHLUSS
  GENAU EINES TOKENS, NIE ALS ALLOWLIST** (Owner-Entscheidung 2026-08-18, gebaut in
  `trackEventNames`, `src/lib/tracking/event-names.ts`).
  WARUM ÜBERHAUPT: Die Menge ist ein SCHLÜSSELRAUM für eine spätere Zuordnung
  Ereignisname -> Conversion-Regel. `PAGEVIEW_EVENT` (`src/lib/analytics/events.ts`) ist
  UNSER eigenes Analytics-Ereignis; er stünde sonst in der Oberfläche als Name, für den
  der Betreiber eine Zuordnung eintragen soll, die es nie geben darf.
  WARUM NEGATIV UND NIE POSITIV: Der Ereignisname ist ein FREIER Nutzer-String — eine
  Positiv-Liste schnitte Custom-Conversions STILL aus dem Schlüsselraum, und niemand sähe
  es. Dieselbe Figur und derselbe Grund wie bei `isForwardable`
  (`docs/immer-beachten.md`, „isForwardable = NEGATIV-AUSSCHLUSS EINES RESERVIERTEN
  TOKENS, NIE Allowlist").
  WARUM DAS ÜBER DIE SCHEIBE HINAUS BINDET: 11.1c schlüsselt gegen genau diese Menge. Wer
  den Ausschluss dort für überflüssig hält und streicht, bekommt einen Schlüssel ohne
  zulässigen Wert; wer ihn zur Allowlist umbaut, verliert die Custom-Namen.
  DIE GRENZE, DIE MITMUSS — ER IST KEIN RIEGEL AUF DEM MAPPING: Das Mapping bleibt
  bestehen, wird unverändert ausgeliefert und steht weiterhin in der Element- und der
  Orphan-Ansicht. AUSGESCHLOSSEN IST ES NUR AUS DEM SCHLÜSSELRAUM. Wer daraus liest, ein
  so benanntes Ereignis werde unterdrückt, liest die Entscheidung falsch — der zugehörige
  Bestandsbefund steht im Vorrat.
- **SOBALD LINKEDIN EINE KENNUNG TRÄGT, ÄNDERT SICH DER AUSGELIEFERTE TEXT.**
  `consentTargets` (`src/components/CodeImporter.tsx`) filtert auf eine gesetzte Kennung
  und bildet über `CONSENT_KEY_BY_TARGET` ab; die Menge wächst damit um den
  LinkedIn-Schlüssel, und der Erzeuger schreibt ihn an ZWEI Stellen in den ausgelieferten
  Text (Ziehung und Draht-Feld des Beacons).
  **BEREITS PUBLIZIERTE SEITEN TRAGEN IHN NICHT UND MÜSSEN NEU VERÖFFENTLICHT WERDEN.** Der
  Draht ist eine EINBAHNSTRASSE — ein Code-Deploy erreicht einen publizierten Text nicht,
  und ein fehlender Schlüssel heisst beim Leser fail-closed „nicht erlaubt".
  DAS BINDET 11.1d UND GEHÖRT DORT IN DIE LIVE-TEST-ANLEITUNG, nicht erst in den
  Support-Fall: Wer nach dem Eintragen der Kennung nicht neu veröffentlicht, misst ein
  korrektes fail-closed und schreibt es dem Adapter zu.
- **DER ZWEITE PARAMETER VON `hasTargetPixelId` IST DER ORT** (gebaut in
  `src/lib/settings.ts`, Scheibe 11.1c). Er tut heute nichts — die Funktion delegiert an
  `hasPixelId` und urteilt für kein Ziel anders. **WER IHN STREICHT, STREICHT DIE
  BEGRÜNDUNG, warum die Funktion nicht in `src/lib/tracking/target-readiness.ts` lebt:**
  jene Datei ist ZIEL-BLIND, und ein Ziel überhaupt zu FÜHREN ist dort ausgeschlossen. Ohne
  den Parameter ist diese Funktion vom Primitiv nicht mehr zu unterscheiden, und der Ort
  fällt mit ihm.
  **SEIN WÄCHTER IST DIE eslint-DIREKTIVE, und das ist der Punkt, an dem die nächste Runde
  das Falsche tun kann:** Der Linter meldet den ungenutzten Parameter (GEMESSEN 2026-08-18;
  der Unterstrich-Präfix hilft NICHT, die Konfiguration trägt kein `argsIgnorePattern`).
  Eine `eslint-disable-next-line`-Direktive an der Signatur unterdrückt ihn und trägt ihre
  Begründung mit. **SOBALD 11.1d DEN PARAMETER BENUTZT, MELDET ESLINT DIE DIREKTIVE SELBST
  ALS ÜBERFLÜSSIG — dann gehört SIE entfernt, NICHT der Parameter.** Wer die Meldung als
  Fehler liest, dreht die Scheibe zurück.
  **WARUM DAS EINE ENTSCHEIDUNG UND KEINE NOTIZ IST:** Ein Kommentar wäre kein Wächter — er
  schweigt, wenn jemand mit `--fix` durchgeht. Die Direktive schlägt an. ERSTE FUNDSTELLE
  DIESER ART IM REPO (GEMESSEN 2026-08-18: keine einzige `eslint-disable`-Zeile für
  `no-unused-vars` in `src/` davor); sie ist deshalb ausdrücklich begründet und NICHT als
  Gewohnheit gedacht, die man beim nächsten ungenutzten Parameter abschreibt.
  **RICHTIGGESTELLT AM 2026-08-18, NICHT GESTEMPELT — DER WÄCHTER GILT UNVERÄNDERT, NUR
  SEIN ZEITPUNKT IST NICHT 11.1d; der Wortlaut oben bleibt vollständig lesbar, die
  Richtigstellung tritt daneben:** Jener Satz nennt „SOBALD 11.1d DEN PARAMETER BENUTZT".
  **UNTER DER BAUFORM K4 TUT 11.1d DAS NICHT** (Owner-Entscheidung 2026-08-18, s. den
  Zuschnitt 11.1d unter „Was drin ist"): `hasTargetPixelId` bleibt unangetastet, der
  Parameter ungenutzt, **die Direktive bleibt stehen.**
  **DIE REGEL IST UNBERÜHRT** — überholt ist allein ihr ZEITPUNKT: Der Wächter schlägt an,
  sobald IRGENDEINE Scheibe den Parameter benutzt, nicht diese. **WER IN 11.1d KEINE
  Meldung sieht und daraus schliesst, die Direktive sei überflüssig geworden, streicht sie
  zu früh und mit ihr den Ort der Funktion.**
- **DIE FORM DER KENNUNGS-ABLAGE IST ENTSCHIEDEN: F1** — ein EIGENES Feld im
  Einstellungs-Blob, neben der bestehenden Kennung, NICHT in ihr (Owner-Entscheidung,
  2026-08-18). Die drei Begründungen stehen im Zuschnitt von 11.1d; sie binden ÜBER 11.1d
  HINAUS, und deshalb steht die Entscheidung hier und nicht nur dort.
  **WAS SIE FÜR EIN FÜNFTES ZIEL BEDEUTET:** Ein Ziel mit MEHRWERTIGER Kennung folgt
  DERSELBEN Achse — eigenes Feld im Blob, nicht Polymorphie am bestehenden Skalar und
  nicht eine eigene Tabelle. Die beiden Gegen-Gründe gelten unverändert: Polymorphie
  erzeugt einen Pfad OHNE Compiler-Riegel (`hasTargetPixelId` nimmt `unknown`), und eine
  eigene Tabelle kostet eine dritte Runde auf dem meistgetroffenen Pfad.
  **DIE GRENZE, DIE DIE ENTSCHEIDUNG TRÄGT:** Sie ruht darauf, dass die URN eine KENNUNG
  ist und KEIN Zugangsdatum — GEMESSEN 2026-08-17 (`docs/ziel-befunde.md`, Teile (c) und
  (l)): sie steht in der NUTZLAST des Aufrufs. **KIPPT DIESE EINORDNUNG, IST DIE
  ENTSCHEIDUNG NEU ZU TREFFEN** — ein Geheimnis gehört nicht in einen Blob, den der Client
  ganzheitlich zurückschreibt und den die Oberfläche anzeigt.

## Vorrat — gemeldet, nicht gebaut

Hier steht, was während einer Scheibe AUFFÄLLT, aber nicht zu ihr gehört: Beobachtungen,
Nebenbefunde und Kandidaten für eine spätere Runde. Kein Auftrag, keine Zusage, keine
Regel — und ausdrücklich nichts, was stillschweigend mitgebaut wird.

- **DAS VIERTE MITGLIED IN `TRACKING_TARGETS` KÖNNTE EINEN EINWILLIGUNGS-EINTRAG
  ERZWINGEN, DEN DIE SCHEIBE AUSSCHLIESST** (GEMESSEN am Repo, 2026-08-17; gemeldet beim
  Anlegen dieser Datei, NICHT entschieden): `CONSENT_KEY_BY_TARGET` und
  `LEGACY_CONSENT_ROLE` in `src/lib/tracking/consent-targets.ts` sind als
  `Record<TrackingTarget, …>` typisiert, und ein Kommentar in derselben Datei sagt, eine
  Erweiterung von `TRACKING_TARGETS` erzeuge dort einen Typfehler. Ob daraus folgt, dass
  die Scheibe einen Eintrag setzen MUSS — und ob ein Eintrag ohne Adapter überhaupt eine
  Wirkung hätte —, ist HIER NICHT entschieden; es berührt die offenen Fragen (2) und (3)
  und gehört in deren Beantwortung am Code.
  **ERLEDIGT MIT SCHEIBE 11.1a** (2026-08-17): Beide Fragen sind beantwortet, der Eintrag
  ist gesetzt. Der Wortlaut oben bleibt als Zeitdokument stehen; was daraus geworden ist,
  steht in Vermerk 1, Punkt (a) — einschliesslich der Antwort, dass der
  Einwilligungs-Zweig am WERT entscheidet.

- **DIE SUPABASE-DOKU WARNT VOR SCHEMA-ÄNDERUNGEN ÜBER DEN SQL-EDITOR — DER HINWEIS
  TRIFFT DIESES PROJEKT NICHT** (GELESEN 2026-08-17,
  `supabase.com/docs/guides/deployment/database-migrations`): Dort steht, Schema-Änderungen
  direkt an der entfernten Datenbank über den SQL-Editor oder den Table-Editor umgingen die
  Migrations-Historie und liessen `supabase db push` mit Sync-Fehlern scheitern.
  WARUM ER HIER TROTZDEM STEHT: Dieses Projekt hat KEINEN Migrations-Runner und soll keinen
  haben; Migrationen laufen bewusst manuell im SQL-Editor, und `db push` kommt nicht vor.
  Der Hinweis würde erst dann zutreffen, wenn jemand die CLI-Arbeitsweise einführte.
  Er steht hier, damit ihn niemand in einem halben Jahr neu herleitet und für einen Befund
  gegen die bestehende Reihenfolge-Regel hält. KEINE Empfehlung, KEINE Regel, kein Auftrag.

- **ZWEI PRÄDIKATFREIE KENNUNGS-PRÜFUNGEN IM ERZEUGER-PFAD** (GEMESSEN am Code,
  2026-08-17): `buildMetaRuntime` (`src/lib/tracking/meta.ts`) und `buildWiringScript`
  (`src/lib/generate.ts`) entscheiden „trägt dieses Ziel eine Kennung?" per Vergleich gegen
  `""` statt über `hasPixelId` — obwohl `src/lib/tracking/target-readiness.ts` wörtlich
  davor warnt („wer hier `savedPixelId !== \"\"` schreibt, hat wieder zwei Wahrheiten").
  HEUTE WERTGLEICH, weil `getPixelId` bereits trimmt; beide sind ausserdem heute
  meta-spezifisch.
  TRIGGER: sobald eine Kennung eine ANDERE FORM hat als einen getrimmten Skalar. Dann
  entscheiden drei Stellen dieselbe Frage auf zwei Weisen.
  **DER TRIGGER IST AM 2026-08-18 VERENGT WORDEN — der Wortlaut darüber bleibt lesbar und
  wird NICHT ersetzt, die Verengung tritt daneben:** Er lautet ab jetzt **„sobald METAS
  Kennung eine andere Form hat als einen getrimmten Skalar"**.
  GRUND, GEMESSEN am Code (2026-08-18): Der Kennungs-Pfad beider Stellen ist
  META-SPEZIFISCH — `buildMetaRuntime` backt `PS_PIXEL_ID` und fragt Metas
  Einwilligungsschlüssel ab, `buildWiringScript` reicht `metaPixelId` an genau diese beiden
  Verbraucher weiter; kein anderes Ziel kommt in ihrem Kennungs-Zweig vor. Die alte Fassung
  feuert damit auf eine Tatsache, die diese beiden Stellen NIE erreicht — etwa auf die
  LinkedIn-Kennung, die je Ereignistyp gilt.
  DIE REGEL DAHINTER: Eine Bedingung, die eine Arbeit an eine andere hängt, muss benennen,
  was der GEGENSTAND braucht — nicht, was zur selben Zeit sonst noch aussteht. Ein Trigger,
  der das nicht tut, schlägt entweder nie an oder zur falschen Zeit.
  UNBERÜHRT BLEIBT der EINWILLIGUNGS-Pfad derselben beiden Funktionen: `consentTargets`
  reist ziel-ÜBERGREIFEND durch sie hindurch. Meta-spezifisch ist die KENNUNG, nicht die
  Einwilligung — wer das zusammenzieht, verengt zu weit.

- **DIE FORM VON `settings.pixels.<ziel>` TRÄGT NUR `{ pixelId?: string }`** (GEMESSEN am
  Code, 2026-08-17, an `ProjectSettings` in `src/lib/settings.ts`): Für ein Merkmal JE
  EREIGNISTYP gibt es dort keinen Ort ausser einem weiteren Feld. BEOBACHTUNG, KEINE
  EMPFEHLUNG — sie gehört in den Zuschnitt von 11.1c und wird hier nicht bewertet.

- **DER ZEIGER IN CLAUDE.md AUF `docs/claude-history/backlog-polish.md` IST FÜR EINE
  WÖRTLICHE SUCHE TOT** (GEMESSEN 2026-08-17): Er nennt „VOLLSTÄNDIGKEITS-ACHSE — WAS DANN
  SOFORT GILT" mit Umlaut und als Abschnitt; im Ziel steht ein AUFZÄHLUNGSPUNKT in
  ASCII-Umschrift (`VOLLSTAENDIGKEITS-ACHSE`). Gefunden nur, weil beide Schreibweisen
  probiert wurden. Doku-Punkt, EIGENE Runde — hier ausdrücklich nicht repariert.

- **EIN NUTZER KANN DEN PAGEVIEW-TOKEN ALS CUSTOM-EVENT ANLEGEN** (GEMESSEN am Code,
  2026-08-18, auf vier Achsen): Das Eingabefeld des Custom-Zweigs (`TrackForm` in
  `src/components/ActionPanel.tsx`) trägt weder `pattern` noch Blockliste; die einzige
  Schranke ist `valid` (`event.trim() !== ""`); `upsertMapping` (`src/lib/mappings.ts`)
  prüft nichts; `saveProject`/`saveVariantB` (`src/app/projects/actions.ts`) schreiben das
  Literal ohne Prüfung. Ein so angelegtes Mapping wird AUSGELIEFERT (der Erzeuger filtert
  Ereignisnamen nicht), am Ingest von `isForwardable` vom CAPI-Forward ausgeschlossen und
  landet in `events` als `event_type` des Analytics-Tokens — von einem echten PageView
  nicht unterscheidbar, mit Wirkung auf den Nenner der Varianten-Auswertung.
  BEFUND ÜBER DEN BESTAND, UNABHÄNGIG VON DIESER SCHEIBE: Der Zustand ist älter als 11.1b;
  die Scheibe erzeugt ihn nicht und behebt ihn nicht. Der Ausschluss aus dem Schlüsselraum
  (s. „## Entscheidungen") wirkt auf die ANZEIGE, nicht auf das Mapping.
  KEINE EMPFEHLUNG, KEINE BEWERTUNG DER WAHRSCHEINLICHKEIT — der Kommentar an
  `PAGEVIEW_EVENT` nennt den Token „praktisch nicht versehentlich eintippbar"; das ist eine
  Aussage über Wahrscheinlichkeit und keine Schranke, und sie wird hier weder bestätigt
  noch bestritten.

- **DER KOMMENTAR AN `mappingsEqual` NENNT DEN FALSCHEN SEPARATOR** (GEMESSEN am Repo,
  2026-08-18): Er sagt „Leerzeichen-Separator ist kollisionsfrei, da ps-IDs nur `[a-z0-9-]`
  sind (kein Leerzeichen)". Gebaut ist ein NUL-BYTE (`\x00`), kein Leerzeichen — gemessen
  als Byte 6974 von 8179 in `src/lib/mappings.ts`.
  DIE AUSSAGE ÜBER DIE KOLLISIONSFREIHEIT BLEIBT WAHR (ein NUL ist erst recht nicht in
  einer ps-ID); FALSCH IST DIE BEGRÜNDUNG, weil sie ein anderes Zeichen nennt als das
  gebaute. Genau dieses Byte ist ausserdem die gemessene Ursache der grep-Falle in jener
  Datei („Binary file … matches" statt der Trefferzeilen) — die Regel dazu steht in
  `docs/immer-beachten.md` unter „WERKZEUG-REGEL", Abschnitt zur Gegenrichtung.
  KOMMENTAR-vs-CODE-BEFUND AN EINER KERN-DATEI, EIGENE RUNDE — hier ausdrücklich nicht
  repariert.

- **KANN DIE GESPEICHERTE KENNUNG AN DER KARTE EIN BOOLEAN WERDEN?** (aus dem Zuschnitt
  11.1c hierher gewandert, 2026-08-18 — dort GEGENSTANDSLOS geworden, NICHT beantwortet):
  `TargetCard` (`src/components/TargetCard.tsx`) bekommt `savedPixelId` als STRING;
  `settings` liegt dort nicht im Geltungsbereich, und der Kopf von
  `src/components/MeasureView.tsx` gibt „nur Skalare herein" vor.
  WARUM SIE 11.1c NICHT MEHR BETRAF: Die gebaute Signatur nimmt Wert UND Ziel entgegen, und
  `target` ist an der Karte bereits eine Prop — die Umstellung kostete dort keine
  Prop-Änderung.
  WAS DAZU GEMESSEN IST (2026-08-18): `savedPixelId` hat in `TargetCard` GENAU EINE
  Verwendung (den Prädikat-Aufruf), `savedPixelIdFor` in `MeasureView` genau eine (das
  Durchreichen). Ein Boolean wäre also ausdrückbar.
  WAS DAGEGEN STEHT und die Frage offen hält: Das URTEIL wanderte damit aus der Karte in
  den Container — und die Prop-Doku in `MeasureView` sagt ausdrücklich „das Urteil faellt
  in der Karte". Dazu kosteten es 14 Fixture-Stellen in `TargetCard.test.tsx` samt der dort
  gemessenen M6-Notiz. BEOBACHTUNG, KEINE EMPFEHLUNG — die Entscheidung ist offen und
  gehört keiner Scheibe.

- **EINE ANGABE IM KOPF VON `src/lib/tracking/target-adapters.ts` IST GEALTERT** (GEMESSEN
  am Repo, 2026-08-18): Dort steht an `TARGETS_WITH_ADAPTER` „DIESE LISTE IST EINE
  TEILMENGE VON TRACKING_TARGETS, KEINE ZWEITE FASSUNG DAVON. **Heute enthaelt sie alle
  drei**; das ist ein Zustand, keine Regel."
  `TRACKING_TARGETS` (`src/lib/settings.ts`) trägt seit Scheibe 11.1a VIER Mitglieder
  (`meta`, `pinterest`, `tiktok`, `linkedin`), `TARGETS_WITH_ADAPTER` weiterhin DREI —
  „alle drei" ist damit keine Aussage über „alle" mehr.
  **DIE REGEL DARÜBER HÄLT UNVERÄNDERT**, und das ist der Grund, warum hier nichts zu
  reparieren EILT: Der unmittelbar folgende Satz nimmt den Fall vorweg („Ein neues Ziel
  gehoert hier NICHT hinein, solange es keinen Empfaenger hat"). Überholt ist ALLEIN der
  BELEG — dieselbe Figur wie „EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH
  WIRD" (`docs/immer-beachten.md`).
  EIGENE RUNDE, HIER NICHT REPARIERT. Wer sie anfasst, liest zuerst die Kopplung an
  derselben Datei: ihr Kopf ZITIERT einen Absatz aus `src/lib/tracking/target-readiness.ts`
  wörtlich, und jener Absatz ist deswegen als unangetastet markiert.

- **DER KOPF VON `src/lib/tracking/target-readiness.ts` TRÄGT ZWEI SÄTZE, DIE SEIT 11.1c
  FALSCH SIND** (GEMESSEN am Code, 2026-08-18): die ZÄHLUNG „hasPixelId hat DREI
  [Aufrufstellen] — die Auslieferungs-Zeile der Karte, den Kennungs-Filter im
  Aufloesungs-Pfad und das Consent-Memo", und die ART-AUSSAGE „hasPixelId wird aus zwei
  Client-Komponenten UND aus dem server-only-Aufloesungs-Pfad gerufen".
  SEIT 11.1c HAT `hasPixelId` GENAU EINEN PRODUKTIV-AUFRUFER: `hasTargetPixelId` in
  `src/lib/settings.ts`. Die drei Stellen rufen jetzt jene Funktion; sie delegiert hierher.
  Der Aufruf kommt damit auch nicht mehr aus zwei Client-Komponenten, sondern aus EINER
  reinen Datei.
  **DIE REGEL DARÜBER IST UNBERÜHRT** — das Primitiv ist wortgleich geblieben, und die
  Erreichbarkeit aus beiden Welten ist weiterhin die Begründung seiner Bauform; sie läuft
  nur über einen Zwischenschritt. ÜBERHOLT IST ALLEIN DER BELEG.
  DER WORTLAUT FÜR DEN NACHTRAG IST BEREITS VORGELEGT UND ANGENOMMEN (2026-08-18); die
  Datei ist GESCHÜTZT, EIGENE RUNDE — hier ausdrücklich nicht eingebaut.

- **ZWEI TABS ÜBERSCHREIBEN EINANDER LAUTLOS** (GEMESSEN am Code, 2026-08-18): `updated_at`
  wird bei JEDEM Write gesetzt (`new Date().toISOString()`), aber an KEINER Stelle
  VERGLICHEN — kein `.eq` auf `updated_at`, keine Versionsspalte, kein `If-Match`, keine
  Sperre. Die einzigen Filter sind `.eq("id", projectId).eq("user_id", user.id)`, also
  EIGENTÜMERSCHAFT und nicht Nebenläufigkeit. Der zweite Write ersetzt den Blob des ersten
  VOLLSTÄNDIG. (`updated_at` dient allein der Sortierung der Projektliste.)
  DASS DAS MUSTER IM REPO BEKANNT IST, zeigen DREI SERVER-seitige Read-Merges auf
  `settings` — `setCapiToken`, `removeCapiToken` und `publishProject` (alle
  `src/app/projects/actions.ts`) lesen die Zeile, mergen immutabel (`setCapiState`,
  `setHostingState`) und schreiben den GANZEN Blob zurück. **Sie schützen sich damit
  gegenseitig, aber nicht gegen den Client:** ein nachfolgendes `saveProject` ersetzt den
  Blob ganzheitlich und kann jeden dieser Merges überschreiben.
  DIE EINORDNUNG GEHÖRT DAZU, sonst wird der Punkt einer künftigen Scheibe angehängt, der
  er nicht gehört: Das trifft `settings.pixels` HEUTE schon genauso. Eine Zuordnung je
  Ereignistyp vergrösserte das VOLUMEN des Verlusts, nicht seine KLASSE.
  TRIGGER: sobald ein Teilbaum des Blobs so gross wird, dass sein Verlust nicht in einer
  Minute nachgetragen ist. GEMELDET, NICHT GEBAUT.

- **DER BLOB HAT KEINE GEMESSENE GRÖSSENGRENZE** (GEMESSEN, 2026-08-18): Weder Code noch
  Schema prüfen etwas — kein `length`/`size`/`byteLength` auf `settings` in `src/` (ohne
  Testdateien, null Treffer), kein `CHECK` und keine Längenbeschränkung in
  `supabase/migrations/*.sql` (null Treffer). Die Spalte ist `settings jsonb NOT NULL
  DEFAULT '{}'` (GELESEN, `docs/db-stand.md`).
  **DIE GRENZE DIESER AUSSAGE IST DER WICHTIGERE TEIL:** NICHT gemessen sind die
  Postgres-eigene `jsonb`-Obergrenze und etwaige Limits von PostgREST bzw. Supabase auf
  die Payload-Grösse. **Das ist KEINE Aussage über deren Nichtexistenz** — es ist die
  Aussage, dass DIESES Repo nichts prüft und die Frage damit offen ist.

- **VERWAISTE ZUORDNUNGEN ANZEIGEN** (aus dem Zuschnitt 11.1d hierher, 2026-08-18 — dort
  ist BEHALTEN entschieden, und dieser Punkt nimmt das nicht zurück): Eine URN, deren
  Ereignisname nicht mehr im Schlüsselraum steht, ist heute unsichtbar und nur über einen
  Umweg wieder erreichbar — die Oberfläche zeigt ausschliesslich Namen aus dem
  Schlüsselraum.
  **DER BESSERE ENDZUSTAND IST DIE WEG-C-HALTUNG DES REPOS, und sie ist gebaut und
  bewährt** (GEMESSEN am Code, 2026-08-18, an `findOrphans` in `src/lib/mappings.ts` und
  der Sektion „⚠ Verwaiste Verknüpfungen" in `src/components/CodeImporter.tsx`): nichts
  still löschen, nichts raten, der Mensch entscheidet — Status ABGELEITET, nie
  gespeichert; Löschen nur nach Bestätigung; Neu-Verknüpfen nur nach expliziter Wahl.
  **WARUM NICHT IN 11.1d:** Ein ZWEITER Verwaisten-Begriff in der Oberfläche ist eine
  EIGENE Scheibe — er braucht seinen eigenen Ort, seinen eigenen Wortlaut und die
  Abgrenzung gegen den bestehenden, der auf ELEMENTE zeigt und nicht auf Ereignisnamen.
  **TRIGGER:** sobald ein Betreiber meldet, dass eine eingetragene URN unauffindbar ist —
  ODER mit einer Anzeige-Runde. GEMELDET, NICHT GEBAUT.

## Hebungs-Kandidaten

Hier steht, was am Phasenende zur Aufnahme in docs/immer-beachten.md, ins
Sicherheits-Manifest oder in eine der Zustandsdateien VORGESCHLAGEN wird — eine Regel wird
erst durch die Hebung wirksam, nicht durch den Eintrag hier. Jeder Kandidat nennt, WO er
hin soll und WELCHER Beleg ihn trägt.

- **EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT — DER
  ERSTE TREFFER IST SYSTEMATISCH DER FALSCHE.**
  WOHIN: `docs/immer-beachten.md`, als Ergänzung an „WERKZEUG-REGEL: sed -i STRIPPT IN
  DIESER UMGEBUNG STILL DAS CR". Jene Regel führt bereits die Gegenrichtung („EIN WERKZEUG
  KANN AUCH EINEN BEFUND ERZEUGEN, DEN DER GEGENSTAND NICHT HERGIBT"); dies ist der
  verwandte Fall auf derselben Achse — nicht das Werkzeug verfälscht das Ergebnis, sondern
  der ANKER trifft eine andere Stelle als die gemeinte.
  DER BEFUND (GEMESSEN am 2026-08-17, beim Verdichten genau dieser Datei): Eine Suche nach
  dem Text einer `##`-Überschrift traf den gleichnamigen Eintrag im ABSCHNITTS-VERZEICHNIS
  statt der Überschrift selbst. Die beiden Splice-Grenzen kehrten sich dadurch um, und die
  halbe Datei stand zweimal da. Wiederhergestellt wurde aus der Versionsverwaltung, die
  Änderung danach mit dem Editier-Werkzeug neu eingetragen.
  DIE URSACHE IST STRUKTURELL UND KEIN FEHLGRIFF, und genau das trägt die Hebung: Seit
  Standdateien ein Verzeichnis im Kopf tragen, steht JEDE Überschrift MINDESTENS ZWEIMAL in
  der Datei — und das Verzeichnis steht VORN. Wer die erste Fundstelle nimmt, nimmt damit
  systematisch die falsche, und zwar bei jeder Überschrift und in jeder solchen Datei.
  DIE REICHWEITE: Das Verzeichnis ist eine VORGABE für jede künftige Standdatei, keine
  Eigenart dieser einen. Dieselbe Struktur tragen `docs/immer-beachten.md` und
  `docs/ziel-befunde.md` — die Regel, die das Verzeichnis fordert, erzeugt die Falle also
  selbst.
  WAS AUSDRÜCKLICH NICHT DAZUGEHÖRT: eine Vorschrift, WIE stattdessen anzukern ist. Ob das
  Verzeichnis eine unterscheidbare Form bekommt, ob nach der LETZTEN statt der ersten
  Fundstelle gesucht wird oder ob es schlicht bei der Pflicht zum Editier-Werkzeug bleibt —
  das ist eine EIGENE Entscheidung und wird hier NICHT getroffen. Ein Kandidat, der die
  Lösung gleich mitliefert, nimmt sie der Hebung vorweg.

## Scheiben-Vermerke

Ein Vermerk entsteht NACH dem bestätigten Live-Test einer Scheibe, nicht nach dem grünen
Test und nicht nach dem Commit allein. Er trägt seine stabile Nummer (s.
Fortschreibungsregeln), was gebaut wurde, was gemessen wurde und die Commit-Nummer; der
jüngste, noch nicht committete Vermerk darf sie als EINZIGER offen lassen.

### 1 — Scheibe 11.1a: Zugangsdatum ablegen (Commit 0ca9a13)

**DIE LÜCKE IST GESCHLOSSEN** (nachgetragen 2026-08-17). Hier stand „Commit-Nummer
offen", und der Absatz darunter erklärte die Lücke — beides war richtig, solange der Bau
nicht committet war, und beides ist mit dem Nachtrag hinfällig. Es gibt derzeit KEINE
offene Lücke; die Regel erlaubt höchstens eine, nicht genau eine.
**WELCHE NUMMER DAS IST, GEHÖRT DAZU:** `0ca9a13` ist der BAU-Commit
(`feat(tracking): LinkedIn als viertes Ziel anlegen, ohne Sendepfad`) — NICHT der
Doku-Commit, der diesen Vermerk trägt. Die beiden sind bewusst getrennt (docs-Commits
bleiben von feat/fix-Commits getrennt), und ein Vermerk, der auf sich selbst zeigte,
wäre für jede spätere Suche wertlos.

**WAS GEBAUT WURDE.** `linkedin` ist ein `TrackingTarget` (`TRACKING_TARGETS` in
`src/lib/settings.ts`) und steht ausdrücklich NICHT in `TARGETS_WITH_ADAPTER`
(`src/lib/tracking/target-adapters.ts`) — das ist der Riegel der Scheibe, und ein eigener
Wächter (`src/lib/tracking/target-adapters.test.ts`) hält ihn. Migration 0024 erweitert
die CHECK-Bedingung `project_secrets_target_valid` um das vierte Ziel. Die Karte
(`TARGET_CARDS` in `src/components/TargetCard.tsx` — NICHT in `target-adapters.ts`, dort
liegen `TARGETS_WITH_ADAPTER` und `hasAdapter`) kommt ohne öffentliches Feld aus: die drei
`public*`-Felder sind optional geworden, und ihre ABWESENHEIT ist der Schalter. Auf einer
solchen Karte ist die Zeile über die Auslieferung unterdrückt — sie nennt eine fehlende
Kennung als Grund, während der wahre Grund der fehlende Empfänger ist.
**KEIN SCHREIBPFAD IST ENTSTANDEN:** `setCapiToken` (`src/app/projects/actions.ts`) war
seit Phase 11 Scheibe 6 bereits ziel-generisch. Der Zuschnitt hat etwas verlangt, das es
gab — der einzige Punkt, an dem der Bau KLEINER ausfiel als der Plan.

**WAS GEMESSEN IST (LIVE, 2026-08-17, vom Owner im SQL-Editor und im Browser):**
- Die Constraint-Definition im Wortlaut: `CHECK ((target = ANY (ARRAY['meta'::text,
  'pinterest'::text, 'tiktok'::text, 'linkedin'::text])))`.
- Das Protokoll trägt alle vier Ziel-Migrationen mit gefülltem `applied_at`: 0021
  (2026-08-05 06:41:30), 0022 (2026-08-07 10:14:37), 0023 (2026-08-11 15:58:43), 0024
  (2026-08-17 13:59:53).
- **DER CONSTRAINT WIRKT:** Ein Insert mit `'linkedn_falsch'` wurde mit **23514** unter dem
  Namen `project_secrets_target_valid` abgewiesen, ein Insert mit `'linkedin'` angenommen.
- **REGRESSION, DREIMAL GEFAHREN:** Meta-Ereignisse erscheinen im Events Manager als
  „Empfangen von: Server" — mit und ohne hinterlegtes LinkedIn-Zugangsdatum. Die tragende
  Invariante hält am lebenden System.
- **OBERFLÄCHE:** „Zugangsdaten hinterlegt" plus „Auslieferung folgt — dieses Ziel sendet
  noch nicht." KEINE Meldung über eine fehlende Kennung, KEIN öffentliches Feld.
  Gegenprobe: Entfernen schaltet zurück auf „Nicht konfiguriert".

**DIE EINSCHRÄNKUNG, OHNE DIE SICH DIESER VERMERK FALSCH LIEST — ER IST KEIN
VORHER/NACHHER-BELEG:** Migration und Deploy waren zu Testbeginn BEREITS eingespielt. Der
Schritt, der den Ausgangszustand VOR dem Lauf abliest, konnte deshalb nicht stattfinden.
GEMESSEN ist damit, dass der Constraint HEUTE wirkt und nicht alles durchlässt — und das
ist die wertvollere Hälfte, weil eine blosse Annahme bei einem Constraint, der alles
durchliesse, identisch aussähe. NICHT GEMESSEN ist, dass 0024 den Übergang BEWIRKT hat;
das ruht auf dem Protokoll-Eintrag und ist damit eine ABLEITUNG, kein Messwert.

**ZWEI FEHLERKLASSEN, DIE IM PROTOKOLL GLEICH AUSSEHEN** (GEMESSEN am Repo, 2026-08-17):
`project_secrets` trägt `primary key (project_id, target)` (0021), weshalb ein zweiter
Insert mit demselben Paar an einer SCHLÜSSEL-KOLLISION scheitert (23505) und NICHT an der
CHECK-Bedingung (23514) — wer die Bereinigung von Alt-Einträgen vor dem Lauf für einen
Teil der Constraint-Prüfung hält, verwechselt die beiden. Über den Produktivpfad tritt
23505 gar nicht auf, weil `setCapiToken` mit `onConflict: "project_id,target"` als Upsert
schreibt.

**ZWEI PUNKTE, DIE ÜBER DIESE SCHEIBE HINAUSREICHEN** — sie sind der Grund, warum dieser
Vermerk nicht nur Vollzug meldet:

**(a) DER EINWILLIGUNGS-EINTRAG IST HEUTE FOLGENLOS UND WIRD IN 11.1b WIRKSAM,** ohne dass
sich an ihm etwas ändert und ohne dass irgendwo etwas rot wird. Gesetzt sind
`CONSENT_KEY_BY_TARGET.linkedin = "linkedin"` und `LEGACY_CONSENT_ROLE.linkedin = false`
(`src/lib/tracking/consent-targets.ts`); beide Einträge sind vom Typ erzwungen (totale
Records über `TrackingTarget`) und zusätzlich von zwei Vollständigkeits-Wächtern in
`consent-targets.test.ts`.
DIE GRUNDLAGE DIESES PUNKTES IST DIE ANTWORT AUF DIE DRITTE OFFENE FRAGE, und sie fiel auf
die schwächere Seite (GEMESSEN am Code, 2026-08-17): Der Einwilligungs-Zweig
(`allowedTargets` in `src/lib/capi/ingest.ts`) entscheidet am **WERT**, nicht am fehlenden
Adapter — er läuft VOR `dispatchForward`, und der Adapter-Riegel `if (!hasAdapter(target))
return` liegt DAHINTER. Ein LinkedIn-Eintrag passiert das Gate also und fällt erst am
Verteiler heraus. Für 11.1a ist das folgenlos; für 11.1b ist es die Falle.
`false` HEISST DABEI NICHT „strenger als die Doktrin": Ohne Einwilligungs-Dialog wird der
Draht MIT allen Schlüsseln auf `true` gefüllt (`__psConsentAll` in
`src/lib/tracking/consent.ts`: `v === undefined` -> alle erlaubt), das Feld ist dann
vorhanden und erlaubend, und dieser Zweig wird gar nicht erreicht. Er verteilt ein ERBE an
Seiten, die älter sind als das Feld — und solche Seiten kann es für ein Ziel, das es erst
seit heute gibt, nicht geben.

**(b) DER AUSSCHLUSS „KEIN AUSGELIEFERTER CLIENT-CODE GEÄNDERT" HÄNGT AN VARIANTE C.**
GEMESSEN am Code (2026-08-17): Das Memo `consentTargets`
(`src/components/CodeImporter.tsx`) filtert auf eine gesetzte Kennung
(`TRACKING_TARGETS.filter(t => hasPixelId(getPixelId(settings, t)))`). Die Karte hat kein
Feld, um eine zu setzen -> LinkedIn erscheint in KEINEM ausgelieferten Text. Bekommt sie
in 11.1b eines, erscheint das Ziel im ausgelieferten Code JEDER Seite, die es benutzt —
und der Schlüssel ist eine EINBAHNSTRASSE: ein publizierter Text trägt ihn, ein
Code-Deploy erreicht ihn nicht.
HEUTE SICHERT DAS EIN KOMMENTAR AN DER RENDER-STELLE, UND EIN KOMMENTAR IST KEIN WÄCHTER.
Das ist kein Versäumnis dieser Scheibe, sondern ein benannter offener Punkt für den
Zuschnitt von 11.1b.

**WAS DER LIVE-TEST NICHT ZEIGEN KONNTE UND AUCH NICHT SOLLTE:** ob bei LinkedIn etwas
ankommt. Es geht nichts hin — das ist der Zweck der Scheibe.

### 2 — Scheibe 11.1b: Die verwendeten Ereignisnamen (Commit ef277ae)

**WELCHE NUMMER DAS IST, UND WARUM SIE HIER STEHT STATT „offen":** `ef277ae` ist der
BAU-Commit (`feat(tracking): verwendete Ereignisnamen aus der Konfiguration ableiten`),
gepusht am 2026-08-18 — NICHT der Doku-Commit, der diesen Vermerk trägt. Dieselbe
Trennung wie in Vermerk 1: ein Vermerk, der auf sich selbst zeigte, wäre für jede spätere
Suche wertlos. ES GIBT DAMIT DERZEIT KEINE OFFENE LÜCKE; die Regel erlaubt höchstens
eine, nicht genau eine.

**WAS GEBAUT WURDE.** Eine REINE Datei mit zwei Exporten
(`src/lib/tracking/event-names.ts`): `trackEventNames` zieht die Namen aus EINER
Mapping-Menge, `usedTrackEventNames` ruft es ZWEIMAL auf und vereinigt. Der AUFRUF steht
im Container (`usedEvents` in `src/components/CodeImporter.tsx`), die Anzeige in einem
eigenen Abschnitt („Verwendete Events") in `src/components/MeasureView.tsx` zwischen
„Tracking-Pixel" und „Statistik".
DER TYP-DISKRIMINATOR IST DER VOLLSTÄNDIGE FILTER: Von den drei Zweigen des
Mapping-Modells trägt genau einer ein Ereignis-Feld; ein Zugriff auf `config.event` an
einem anderen Zweig wäre ein TS-Fehler. Der PageView-Token wird ausgeschlossen — als
NEGATIV-Ausschluss genau eines Tokens, nie als Allowlist (s. „## Entscheidungen").
DIE ANSICHT LIEST `scope`, NICHT den `hasVariantB`-Prop, den sie ohnehin bekommt: sonst
stünde dasselbe Urteil an ZWEI Stellen.

**WAS GEMESSEN IST (LIVE, 2026-08-18, vom Owner im Browser):**
- A trug `Purchase` und `Lead`, B trug `Purchase` und `Custom_Lead`. Angezeigt wurden
  GENAU DREI Namen, jeder GENAU EINMAL, mit dem Vermerk „über beide Varianten".
- OHNE Variante B: nur die Namen aus A, KEIN Varianten-Vermerk.
- B existiert und trägt NULL Track-Mappings: DIESELBEN Namen wie in A, und der Vermerk
  „über beide Varianten" BLEIBT stehen.
- Leere Menge: „Noch keine Tracking-Events verknüpft." Kein `undefined`, kein visueller
  Defekt.
- INGEST-REGRESSION: Conversions kamen als „Empfangen von: Server" an.

**DER STÄRKSTE BELEG GEHÖRT BENANNT, sonst liest sich das als vier gleichwertige
Häkchen:** Die Schritte 4 und 5 zeigen DIESELBEN Namen — der Unterschied liegt ALLEIN im
Vermerk. Das ist die Achse, an der die Ableitung sonst still falsch geworden wäre, und die
EINZIGE, die sich am WERT nicht messen lässt: die Vereinigung mit der leeren Menge ist die
Identität. Sie ist damit LIVE belegt, nicht nur unit-getestet — und genau deshalb steht
sie auch oben unter „Was über diese Scheibe hinaus bindet".
DAZU EIN ZWEITER BELEG, DER LEICHT ÜBERSEHEN WIRD: `Custom_Lead` liegt AUSSERHALB der
Standard-Liste (`META_STANDARD_EVENTS`), kam also über den Custom-Zweig — den FREIEN
Nutzer-String. Live belegt ist damit, dass der Schlüsselraum genau die Namen trägt, für die
es später eine Zuordnung braucht, und nicht nur die vorgeschlagenen.

**DIE EINSCHRÄNKUNG, DIE ZWINGEND MITMUSS — DIE TRAGENDE INVARIANTE IST NICHT DIREKT
GEMESSEN:** Das Deployment war zu Testbeginn bereits aktiv. Der Vergleich des
AUSGELIEFERTEN TEXTES vor und nach dem Deploy ist deshalb AUSGEFALLEN. Die Invariante
„diese Scheibe ändert nichts am ausgelieferten Text" ruht damit auf ZWEI Stützen, und
beide sind FOLGERUNGEN, kein Messwert:
- die SCOPE-MESSUNG am Diff (GEMESSEN, 2026-08-18): fünf Dateien, rein additiv; kein
  Erzeuger, kein Ingest-Pfad, keine Serve-Route berührt;
- die bestandene INGEST-REGRESSION oben, die den zweiten Halbsatz der Invariante deckt
  („und NICHTS am Ingest").
Für den ausgelieferten TEXT gibt es damit keinen Vorher/Nachher-Beleg. Wer den Vermerk
anders liest, hält eine Folgerung für eine Messung.

**BEOBACHTUNG, KEINE REGEL UND KEINE VORSCHRIFT:** Das ist die ZWEITE Scheibe in Folge, in
der ein VORHER-Schritt ausgefallen ist, weil der Zustand vor dem Deploy zum Testzeitpunkt
nicht mehr herstellbar war — bei 11.1a war es der Constraint-Ausgangswert (s. Vermerk 1,
„DIE EINSCHRÄNKUNG…"), hier der ausgelieferte Text. Hier steht AUSDRÜCKLICH nicht, wie
eine Anleitung künftig zu bauen wäre; das ist eine eigene Runde.

**WAS DIE UNIT-EBENE ZUSÄTZLICH TRÄGT, und warum es den Live-Test nicht ersetzt:** Zwei
Mutationen, getrennt gefahren (2026-08-18). Die erste traf die VEREINIGUNG (zweiter Aufruf
gestrichen): 2 von 1081 Tests fielen, die angesagten — und dass die Prädikat-Tests GRÜN
blieben, ist der eigentliche Beleg, dass die Probe die Achse dieser Scheibe trifft. Die
zweite traf die AUSSAGE (`scope` fest verdrahtet): 3 Tests fielen, einer davon vorab samt
Fehlerklasse angesagt. Testzahl vorher/nachher GEMESSEN: 56 Dateien/1068 Tests -> 57
Dateien/1081 Tests, alle grün; `tsc`, Lint und Build ebenfalls.
EINE MUTATIONSPROBE SAGT NICHTS ÜBER DIE DEPLOYTE LAUFZEIT — deshalb steht sie hier
NEBEN dem Live-Test und nicht an seiner Stelle.

### 3 — Scheibe 11.1c: Ein Urteil über die Auslieferbarkeit (Commit 4a06586)

**WELCHE NUMMER DAS IST:** `4a06586` ist der BAU-Commit (`refactor(tracking):
ziel-bewusstes Urteil ueber die Auslieferbarkeit`), gepusht am 2026-08-18 — NICHT der
Doku-Commit, der diesen Vermerk trägt. Dieselbe Trennung wie in den Vermerken 1 und 2.
Der Typ ist `refactor` und nicht `feat`, weil die Scheibe kein Verhalten ändert. ES GIBT
DAMIT DERZEIT KEINE OFFENE LÜCKE.

**WAS GEBAUT WURDE.** `hasTargetPixelId(pixelId: unknown, target: TrackingTarget): boolean`
in `src/lib/settings.ts`, unmittelbar nach `getPixelId`. Sie nimmt Wert UND Ziel entgegen
und DELEGIERT an `hasPixelId` (`src/lib/tracking/target-readiness.ts`) — sie wiederholt
dessen Regel nicht. Drei Aufrufer sind umgestellt: das Consent-Memo (`consentTargets` in
`src/components/CodeImporter.tsx`), der `withPixel`-Filter in `getCapiConfigByTrackingKey`
(`src/lib/capi/token.ts`) und die Auslieferungs-Zeile der Karte (`TargetCard`).
`hasPixelId` ist WORTGLEICH geblieben; die Prop `savedPixelId` bleibt ein STRING, und
KEINE bestehende Fixture und KEINE bestehende Assertion wurde angefasst.
DAS ZIEL WURDE AN KEINER STELLE NEU BESCHAFFT: An der Karte ist es bereits eine Prop, im
Resolver reist es im Zwischenobjekt mit — deshalb ruft der Filter dort KEIN zweites
`getPixelId`, und die Rechnung je Beacon ist unverändert.

**WAS GEMESSEN IST (LIVE, 2026-08-18, vom Owner):**
- **DER BYTE-VERGLEICH IST GEFAHREN UND HAT GEHALTEN:** Der ausgelieferte Text für Variante
  A ist vor und nach dem Deploy BYTE-IDENTISCH — `git diff --no-index`, leere Ausgabe.
- **INGEST-REGRESSION:** Conversions kamen als „Empfangen von: Server" an.
- **KARTE, BEIDE RICHTUNGEN:** Bei einem Ziel mit gespeicherter Kennung FEHLT die
  Auslieferungs-Zeile; bei Zielen ohne STEHT der Hinweis. Die Kennung im Feld geleert OHNE
  zu speichern: die Anzeige ändert sich NICHT — das Urteil liest weiterhin den
  GESPEICHERTEN Wert.
- **DAS VIERTE ZIEL:** LinkedIn unverändert „Auslieferung folgt — dieses Ziel sendet noch
  nicht.", KEINE Meldung über eine fehlende Kennung.

**DIE GRENZE, DIE MITMUSS — DER BYTE-BELEG DECKT EINE VARIANTE, NICHT BEIDE:** Gemessen ist
VARIANTE A. Ob das Prüfprojekt überhaupt eine Variante B trug, ist NICHT berichtet; für B
liegt damit KEIN Byte-Beleg vor. **Die tragende Invariante ist für die GEMESSENE Variante
belegt, nicht für beide.** Hier wird über B nichts behauptet — weder dass sie unverändert
blieb noch dass es sie gab.

**DER PUNKT, DER ÜBER DIE MESSWERTE HINAUSGEHT — DIES IST DIE ERSTE DER DREI SCHEIBEN, IN
DER DER VORHER-SCHRITT TATSÄCHLICH STATTGEFUNDEN HAT.** In 11.1a fiel der
Constraint-Ausgangswert aus, in 11.1b der ausgelieferte Text; beide, weil das Deployment
zum Testzeitpunkt schon lief (s. die Vermerke 1 und 2). Hier war der Byte-Vergleich der
EINZIGE Nachweis der tragenden Invariante — und ein PFLICHT-STOPP in der Anleitung („ohne
gesicherte Vorher-Kopie kein Deploy") hat ihn hergestellt.
**BEOBACHTUNG, KEINE REGEL:** Ob daraus eine Vorschrift für künftige Anleitungen wird, ist
HIER NICHT entschieden.

**DIE UNIT-EBENE, AUSDRÜCKLICH NEBEN DEM LIVE-TEST UND NICHT AN SEINER STELLE:** Die
Pflicht-Mutation (`hasTargetPixelId` gibt konstant `false` zurück) hat JE AUFRUFER belegt,
dass der neue Pfad lebt — **KEIN Aufrufer-Block blieb grün**, 20 von 1084 Tests fielen über
vier Testdateien. An der Karte fielen exakt die zwei angesagten (K2, K6), im Resolver die
Tests mit erwartetem Empfänger, dazu die beiden neuen Einheitstests direkt.
**BEIM CONSENT-MEMO FIELEN ACHT STATT DER VIER ANGESAGTEN.** Die vier zusätzlichen melden
DIESELBE Fehlerklasse — jeder von ihnen behauptet, dass ein Ziel mit gesetzter Kennung im
Draht erscheint, und bei konstant falschem Urteil ist die Liste in allen leer. **Also
Abdeckung und keine Kaskade.** DIE ZU NIEDRIGE ANSAGE KAM AUS DEM AUFTRAG: Er nannte
Testnamen, statt den Block auf die Achse durchzuzählen — eine Zählung entlang EINER Achse
ist bei einem Umbau systematisch zu niedrig.
Testzahl vorher/nachher GEMESSEN: 57 Dateien/1081 Tests -> 57 Dateien/1084 Tests, alle
grün; `tsc`, Lint und Build ebenfalls. EINE MUTATIONSPROBE SAGT NICHTS ÜBER DIE DEPLOYTE
LAUFZEIT.

**WAS DIE SCHEIBE AN NEUER ABDECKUNG HINTERLÄSST:** ein Test, der ERSTMALS das vierte Ziel
auf dieser Achse prüft (`D-T10` in `src/components/CodeImporter.test.tsx`, alle vier Ziele
mit Kennung, verglichen auf die FOLGE in beiden Lesern). GEMESSEN 2026-08-18: kein anderer
Test im Repo setzt je eine LinkedIn-KENNUNG. Wer ihn entfernt, nimmt die einzige Abdeckung
mit.

**EIN GATE HAT UNTERWEGS ANGESCHLAGEN, und der Vollzug fiel deshalb zweistufig aus:** Der
Linter meldete den ungenutzten zweiten Parameter (GEMESSEN 2026-08-18; der
Unterstrich-Präfix half NICHT — die Konfiguration trägt kein `argsIgnorePattern`, per Probe
belegt). Der Bau hielt an, die BAUFORM wurde entschieden (Owner: eine
`eslint-disable-next-line`-Direktive mit Begründung an der Signatur), NICHT der Parameter
gestrichen. Die Direktive ist per Gegenprobe belegt: testweise entfernt, kam die Warnung
wortgleich zurück. Was daran über die Scheibe hinaus bindet, steht unter
„## Entscheidungen".
