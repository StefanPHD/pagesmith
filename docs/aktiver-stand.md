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
- ## Scheibe 11.1e — Der Weg zum Empfänger
- ## Scheibe 11.1f — Der Adapter
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
dadurch **AUSLIEFERFÄHIG — noch nicht SENDEND. GEBAUT, GEPUSHT UND LIVE BELEGT
(2026-08-18); was entstanden ist, was gemessen wurde und was AUSDRÜCKLICH NICHT gemessen
ist, steht in Vermerk 4.**

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

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-18, nach dem bestätigten Live-Test. Hier stand die Liste „Was drin
ist" — die ANWEISUNGEN FÜR die Scheibe, und sie sind mit dem Vollzug abgelaufen: das Feld
unter `settings.pixels.<ziel>` · ein eigener LESER für die Zuordnung · die Erweiterung von
`settingsEqual` samt ihrer Begründung (ohne sie bliebe der Speichern-Knopf nach einer
URN-Eingabe INAKTIV und der Wert wäre beim Projektwechsel weg, und KEIN heutiger Test
fing das) · eine Oberfläche, an der je Ereignisname aus dem Schlüsselraum von 11.1b eine
URN eingetragen wird.
WAS GEBAUT UND GEMESSEN WURDE, STEHT IN VERMERK 4 — und nur weil es dort steht, durfte es
hier weg. Die `settingsEqual`-Erweiterung ist dort zusätzlich LIVE belegt (der
Speichern-Knopf wurde aktiv), nicht nur unit-getestet.

**DIE BAUFORM-FRAGE IST ENTSCHIEDEN UND VOLLZOGEN.** Hier stand der Satz
„`hasTargetPixelId` wird ZIEL-UNTERSCHEIDEND … hier hört die Funktion auf, blind zu
delegieren", darunter seine Richtigstellung (er hatte KEINEN GEGENSTAND — alle drei
Aufrufer schicken als ersten Parameter einen SKALAR, die Zuordnung erreicht die Funktion
nie), die Owner-Entscheidung K4 samt den drei verworfenen Bauformen und die Namensfrage
mit ihrer Entscheidung. GEBAUT IST `isTargetDeliverable` (`src/lib/settings.ts`), und
`hasTargetPixelId` ist unangetastet geblieben.
WAS DAVON WEITERREICHT, steht unten unter „Was über diese Scheibe hinaus bindet" und in
Vermerk 4 — einschliesslich der drei verworfenen Bauformen und des Namens-Grundes. Die
Begründung, WELCHE Frage jede der beiden Funktionen beantwortet, steht seit dem Bau an
BEIDEN Fundstellen im Code selbst; das war die Auflage der Entscheidung und ist ihr
haltbarster Ort.

**DIE ZWEI OFFENEN FRAGEN SIND BEANTWORTET** und laufen mit ab:
· **WO HÖRT `hasTargetPixelId` AUF ZU DELEGIEREN?** — GAR NICHT. Das Urteil über die
  Auslieferfähigkeit ist ein ZWEITES, ziel-generisches Prädikat geworden (K4).
· **WIE SIEHT DIE EINGABE AUS?** — ORT B (Owner-Entscheidung 2026-08-18): ein EIGENER
  Abschnitt in `MeasureView`, benachbart zu „Verwendete Events", ein Eingabefeld je
  Ereignisname aus `usedEvents.names`, mit übernommener `scope`-Aussage. `TargetCard`
  bleibt unberührt und die Karten bleiben uniform.
Beides ist in Vermerk 4 mit dem Gebauten und mit Messwerten belegt.

### Was über diese Scheibe hinaus bindet

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
  **DER ORT DIESER ENTSCHEIDUNG IM CODE** (GEBAUT 2026-08-18): der Begründungs-Absatz an
  `hasConversionRules` (`src/lib/settings.ts`). Er sagt ausdrücklich, dass das Fehlen des
  Abgleichs eine ENTSCHEIDUNG ist und kein Übersehen — sonst „repariert" ihn die nächste
  Runde.
- **ZWEI FRAGEN, ZWEI PRÄDIKATE — UND BEIDE FUNDSTELLEN SAGEN, WELCHE SIE BEANTWORTEN**
  (Owner-Entscheidung K4, 2026-08-18; gebaut in `src/lib/settings.ts`). Sie fielen
  zusammen, solange ALLE Ziele eine Skalar-Kennung trugen:
  · **„Kann ich für dieses Ziel eine `CapiConfig` bauen?"** — braucht einen SKALAR. Das ist
    `hasTargetPixelId`, und deshalb behält der Resolver
    (`getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`) genau sie. Zöge er ein Ziel
    ohne Skalar in seine Geheimnis-Abfrage, wäre das zusätzliche Arbeit JE BEACON für ein
    Ziel ohne Adapter.
  · **„Ist dieses Ziel auslieferfähig?"** — braucht IRGENDEINE Kennungsform. Das ist
    `isTargetDeliverable`, und daran hängt der Consent-Draht.
  **DAS IST KEIN ZWEITES URTEIL ÜBER DIESELBE FRAGE, SONDERN EIN URTEIL JE FRAGE.** Wer sie
  zusammenlegt, bekommt eines von beidem: eine dritte Runde je Beacon auf dem
  meistgetroffenen Pfad — oder ein auslieferfähiges Ziel, das lautlos aus dem Draht fällt
  und am Ingest fail-closed greift.
  **DIE AUFLAGE IST GEBAUT UND NICHT NUR VERABREDET:** Der jeweilige Satz steht an BEIDEN
  Fundstellen im Code. Ohne ihn sieht es wie eine Verdopplung aus und wird beim nächsten
  Aufräumen zusammengelegt.
- **`isTargetDeliverable` IST ZIEL-GENERISCH, UND DAS IST DIE ZUSAGE, NICHT EIN DETAIL:**
  Sie fragt für JEDES Ziel dasselbe — ob EINE der beiden Kennungsformen belegt ist. Dass
  heute nur ein Ziel die zweite Form füllt, ist ein ZUSTAND DER DATEN und keine Regel im
  Code. **Deshalb ist sie KEINE ziel-geschlüsselte Stelle** (die Zählung im Kopf von
  `src/lib/tracking/target-adapters.ts`). Ein Test nagelt das fest; wer eine
  Fallunterscheidung über Ziele einzieht, macht sie zu einer.
  **WAS DAMIT NICHT ENTSCHIEDEN IST und in Vermerk 4 als offener Punkt steht:** ob ein
  Ziel, dessen Kennung JE EREIGNISTYP gilt, allein mit einem SKALAR als auslieferfähig
  gelten soll. Heute liefert die ODER-Verknüpfung dort `true`.
### Die tragende Invariante — SIE IST DIESMAL ZWEISEITIG

Und das ist der Unterschied zu 11.1c:

- **(a) Für die DREI bestehenden Ziele ändert sich am ausgelieferten Text NICHTS.** Ein
  Projekt OHNE LinkedIn-Zuordnung bleibt byte-identisch — das ist der Regressionsnachweis.
- **(b) Für LinkedIn ändert er sich, und zwar GEWOLLT**, sobald eine Zuordnung eingetragen
  ist.

**EINE SCHEIBE, DIE BEIDES ZUSAGT, BRAUCHT BEIDE NACHWEISE GETRENNT.** Wer nur (a) prüft,
hat die Scheibe nicht gemessen; wer nur (b) prüft, hat die Regression nicht.

**SIE BLEIBT STEHEN, WEIL SIE DER MASSSTAB FÜR 11.1e IST** — und sie ist eingelöst: BEIDE
Seiten sind am 2026-08-18 live gemessen worden, (a) erstmals für Variante A UND B. Die
Messwerte, die Instrumente und die DREI GRENZEN dieser Messung stehen in Vermerk 4; eine
davon betrifft genau diese Invariante und ist dort ausdrücklich als NICHT bestandener
Schritt geführt.

### Drei Dinge kippen an derselben Stelle

Sie gehören zusammen in den Zuschnitt, weil sie alle drei am Wachsen von `consentTargets`
(`src/components/CodeImporter.tsx`) hängen. **SIE BLEIBEN NACH DEM VOLLZUG STEHEN, und
einer davon ist der Grund:** Kipppunkt 1 ist am 2026-08-18 NICHT gemessen worden — beide
live beobachteten Zustände trugen mindestens ein Ziel im Draht, der Sprung aus dem
Einzel-Pfad in den Sammel-Pfad wurde nicht vorgeführt. **Er ist damit kein bestandener
Schritt, sondern ein offener** (s. Vermerk 4, „DREI GRENZEN"). Kipppunkt 2 ist eingelöst
(das Neu-Veröffentlichen war Pflicht-Schritt und hat gewirkt), Kipppunkt 3 ist mit der
Bauform K4 gegenstandslos geworden — das Objekt erreicht `hasTargetPixelId` gar nicht mehr.

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
   diesen Punkt liest, hält die Bauform noch für die alte; die Korrektur steht unter
   „Vollzogen" und „Was über diese Scheibe hinaus bindet" (Regelfall: „WER EINE HÄLFTE
   EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE", `docs/immer-beachten.md`).
   **ZEIGER NACHGEZOGEN AM 2026-08-18 (Verdichtung), UND ZWAR BEIDE NENNUNGEN IN DIESEM
   PUNKT:** Der Satz oben und der Satz darüber nannten „Was drin ist"; jener Abschnitt ist
   mit dem Vollzug abgelaufen. Gemeint sind ab jetzt „Vollzogen" und „Was über diese
   Scheibe hinaus bindet". Die Zeiger wandern mit, statt ins Leere zu zeigen — der BEFUND
   darüber ist unverändert.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe. **ALLE FÜNF HABEN GEHALTEN — GEMESSEN am Diff (2026-08-18):**
fünf Dateien, `src/lib/tracking/**` und `src/lib/capi/**` nicht darunter, keine Migration,
kein `pixelId`- und kein `getPixelId`-Eingriff.

- **KEIN ADAPTER, KEIN FORWARD, KEIN EINTRAG IN `TARGETS_WITH_ADAPTER`.** Der Riegel aus
  11.1a hält; sein Wächter (`src/lib/tracking/target-adapters.test.ts`) bleibt stehen und
  fällt erst in 11.1e.
- **KEINE ÄNDERUNG AN `pixelId` ODER `getPixelId`.** F2 ist verworfen.
- **KEINE MIGRATION, KEIN SCHEMA.** Der Blob nimmt es auf.
- **KEIN DRIFT-INDIKATOR.** Er ist die nächste Zeile und schützt dann ALLE VIER Ziele; ihn
  hier mitzubauen bündelte zwei Achsen.
- **KEINE NORMALISIERUNG DER EREIGNISNAMEN.** Der freie Nutzer-String bleibt, wie er ist —
  die Regel dazu steht in `docs/immer-beachten.md`.

## Scheibe 11.1e — Der Weg zum Empfänger

**LinkedIn wird zum `ResolvedTarget`, OHNE dass etwas gesendet wird.** Die zweite
Kennungsform reist bis dorthin, wo ein Adapter sie später abholt — und fällt am
Adapter-Gate heraus. **GEBAUT, GEPUSHT UND LIVE BELEGT (2026-08-18); was entstanden ist,
was gemessen wurde und was AUSDRÜCKLICH NICHT gemessen ist, steht in Vermerk 5.**

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-19, nach dem bestätigten Live-Test. Hier standen die ANWEISUNGEN FÜR
die Scheibe, und sie sind mit dem Vollzug abgelaufen:

- **DER BEFUND, DER DIE SCHEIBE AUSLÖSTE**, mit seinen vier Gliedern (kein Eintrag im
  `in`-Filter · Zugangsdatum nie gelesen · kein `ResolvedTarget` · `dispatchForward` für
  dieses Ziel nie gerufen) und dem Satz, dass das KEIN Fehler des Resolvers war, sondern
  ein FEHLENDER WEG.
  **EINE SEINER ANGABEN IST NICHT NUR ABGELAUFEN, SONDERN SEIT DEM VOLLZUG FALSCH — und
  das ist der Grund, warum sie GESTRICHEN und nicht bloss gekürzt ist:** „Ohne
  Skalar-Kennung fällt LinkedIn aus `withPixel` heraus", samt dem zitierten
  Filter-Ausdruck. Der Filter urteilt seit dieser Scheibe über BEIDE Kennungsformen
  (Vermerk 5). Stehengeblieben wäre das eine TATSACHENBEHAUPTUNG ÜBER DEN CODE, die beim
  nächsten Zuschnitt einen Weg noch einmal bauen liesse, den es gibt.
- **DIE BEGRÜNDUNG, WARUM DER WEG VOR DEM ADAPTER KOMMT** — die Typerweiterung berührt den
  heissesten Pfad und die halbe Testbasis (`CapiConfig` an VIER Produktivstellen, ZWÖLF
  Testdateien nennen ihn, ZEHN bilden seine Form nach), und die Scheibe ist prüfbar, OHNE
  zu senden. Sie ist eingelöst: der Bau hat genau zwei Dateien angefasst.
- **DIE FESTSTELLUNG ZUR BESTEHENDEN ABDECKUNG samt ihrer Richtigstellung** — dass
  `src/lib/capi/fan-out.test.ts` die ANDERE Hälfte deckt („LinkedIn feuert NICHT", heute
  schon wahr), und die zwei Gründe, warum er unter dieser Scheibe nicht anschlägt
  (untypisierter Resolver-Mock · `hasAdapter` greift vorher).
  **IHRE FOLGE FÜR DEN BAU IST VOLLZOGEN, NICHT WEGGEFALLEN:** Der Nachweis des ENTSTEHENS
  musste NEU und an der RÜCKGABE des Resolvers entstehen — das ist Mutation 1 in Vermerk 5,
  und die Begründung dafür steht dort.
- **DIE DREI OFFENEN FRAGEN SIND BEANTWORTET** (Owner-Entscheidungen bzw. am Code, jeweils
  2026-08-18) und laufen mit ab: die FORM (K-B, s. den Abschnitt darunter — er bleibt
  stehen) · der LESER der Zuordnung (in DERSELBEN `map`, kein zweiter Lauf) · ob der Filter
  `isTargetDeliverable` rufen kann (NEIN, an der Kosten-Achse).
  **WAS AN DEN ANTWORTEN ÜBER DIE SCHEIBE HINAUSREICHT, STEHT IN VERMERK 5** — namentlich
  die dritte, die eine Bedingung dauerhaft an ZWEI Stellen stellt.

WAS GEBAUT UND GEMESSEN WURDE, STEHT IN VERMERK 5 — und nur weil es dort steht, durfte es
hier weg.

### Die Form — ENTSCHIEDEN (Owner, 2026-08-18): eine EIGENE Config-Form

Nach dem Muster von `PinterestConfig` (`src/lib/capi/pinterest-forward.ts`). **GRUND:**
`CapiConfig` bleibt damit unangetastet, und die zehn nachbildenden Testdateien werden
nicht angefasst.
**GRENZE, DIE DIE ENTSCHEIDUNG TRÄGT:** Sie nennt die RICHTUNG, nicht die Bauform. **Ob
die Form am Code so trägt, ist im Stufe-1-Prompt zu prüfen** — s. die erste offene Frage.
**ZEIGER NACHGEZOGEN AM 2026-08-19 (Verdichtung):** Der Abschnitt „Zwei offene Fragen" ist
mit dem Vollzug abgelaufen; die Frage IST am Code beantwortet worden, und das Ergebnis ist
die Entscheidung K-B darunter. Der Satz bleibt im Wortlaut stehen — er hält fest, dass die
Bauform damals NICHT entschieden war.

**RICHTIGGESTELLT AM 2026-08-18, NICHT GESTEMPELT — EINE TESTDATEI IST DOCH BETROFFEN.**
Der Satz oben sagt, „die zehn nachbildenden Testdateien werden nicht angefasst". GEMESSEN
(2026-08-18): **Das trifft für NEUN zu** — sie mocken den Resolver mit einem
untypisierten `vi.fn()`, eine Typänderung erreicht sie nicht. **Die ZEHNTE,
`src/lib/capi/token.test.ts`, ist in JEDEM Fall betroffen:** Sie bekommt die neuen Tests,
und ihre **ZWÖLF** Ganz-Objekt-Vergleiche auf die Auflösung (zehn `resolves.toEqual({…})`,
zwei `expect(await …).toEqual({…})`) können von einer Formänderung erreicht werden.
**DIE ENTSCHEIDUNG BLEIBT EINLÖSBAR; überholt ist allein die REICHWEITE ihrer
Begründung** — `CapiConfig` bleibt unangetastet, die Testbasis nur zu neun Zehnteln.

**DIE FORM IST ENTSCHIEDEN (Owner, 2026-08-18): K-B — EIN ZWEITES, OPTIONALES FELD AN
`ResolvedTarget`.** `CapiConfig` bleibt in Wortlaut UND Form unangetastet,
`dispatchForward` (`src/lib/capi/ingest.ts`) ebenfalls.
**WARUM DIE ANDEREN BEIDEN FALLEN, je ein Satz** (sie sind in Stufe 1 am Code geprüft und
stehen hier, damit niemand sie ein zweites Mal erhebt):
· **K-A** (Union an `ResolvedTarget.config`): macht DREI Übergaben in `dispatchForward` zu
  Typfehlern — auf dem heissesten Pfad, in einer Scheibe, die dort nichts ändern soll.
· **K-C** (Feld an der Auflösung neben `targets`): beseitigt den Eingriff in `ingest.ts`
  nicht, sondern verschiebt ihn auf 11.1f — der Adapter bekäme die Zuordnung nicht über
  `entry`, sondern als zusätzlichen Parameter. **Die Zuordnung gehört zum EMPFÄNGER, nicht
  neben ihn.**

**DIE AUFLAGE, DIE ZU K-B GEHÖRT — sie ist der gemessene Preis dieser Form, und er wird
GEBAUT statt hingenommen** (GEMESSEN am Code, 2026-08-18): Für ein LinkedIn-only-Projekt
trägt `entry.pixelId` den Wert `""`, und die Paarungsschleife in
`getCapiConfigByTrackingKey` baut dann eine `CapiConfig` mit **LEERER `pixelId`**. Der Typ
sagt `string`, `""` ist einer; der Kommentar an `CapiConfig` sagt heute „OEFFENTLICHE
Meta-Pixel-ID". **Es entsteht ein struktureller Wahrheitsverlust OHNE Compiler-Riegel —
dieselbe Klasse, mit der F2 in 11.1d verworfen wurde.**
**DER KOMMENTAR AN `CapiConfig` HÄLT DESHALB FEST:** dass das Feld für ein Ziel mit
event-geschlüsselter Kennung LEER sein KANN, und dass KEIN Compiler-Riegel das fängt.
**EIN KOMMENTAR IST KEIN WÄCHTER — aber ein fehlender ist eine Falle.**

### Die tragende Invariante

**Am Ingest ändert sich für die DREI bestehenden Ziele NICHTS** — nicht die Zahl der
Abfragen, nicht ihre Filter, nicht die garantierte leere 204. LinkedIn wird ZUSÄTZLICH
aufgelöst und fällt am Adapter-Gate heraus.

**DER PREIS, BENANNT STATT VERSTECKT:** Der `in`-Filter der Geheimnis-Abfrage wächst um
ein Ziel. Dieselbe Runde, ein anderer Filter — **aber eine Verhaltensänderung auf dem
Pfad, den JEDER Besucher JEDER Kundenseite trifft.**

**RICHTIGGESTELLT AM 2026-08-18, NICHT GESTEMPELT — DER PREIS IST GRÖSSER ALS BENANNT.**
Der Absatz darüber bleibt lesbar; er beschreibt den Preis für ein Projekt, das NEBEN
LinkedIn noch andere Ziele trägt. **GEMESSEN (2026-08-18) ist ein ZWEITER:** Für ein
Projekt, das **AUSSCHLIESSLICH** LinkedIn konfiguriert hat — also keinen einzigen Skalar
—, entsteht eine **ZWEITE Datenbank-Runde, die es heute NICHT gibt.** GRUND: Der
Frühausstieg `if (withPixel.length === 0) return { …, targets: [] }`
(`getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`) kehrt heute VOR der
Geheimnis-Abfrage zurück; nach der Änderung passiert dieses Projekt ihn.
**UND WEITER IM HANDLER** (GEMESSEN, `handleIngest`, `src/lib/capi/ingest.ts`): `targets`
ist dann nicht mehr leer, also laufen zusätzlich `allowedTargets`, `resolveClientIp` und
die User-Agent-Lesung, bevor `dispatchForward` das Ziel am Adapter-Gate fallen lässt.
**DER FALL IST NICHT HYPOTHETISCH:** Der Bedienweg ist seit 11.1d gebaut — der Abschnitt
„Conversion-Regeln" in `src/components/MeasureView.tsx` ist an nichts gegatet —, und der
Zustand ist LIVE belegt (Vermerk 4: `__psConsentAll(["linkedin"])` mit der Warnung
„Meta-Pixel nicht konfiguriert").
**DER PREIS IST AKZEPTIERT (Owner, 2026-08-18) — mit seiner Grenze:** Bis 11.1f ist das
**Arbeit ohne Wirkung**, weil das Ziel nichts empfängt. Er trifft AUSSCHLIESSLICH Projekte
MIT LinkedIn-Konfiguration; für jedes andere Projekt ist der Pfad zeichengleich, und der
bestehende Test „TIPPFEHLER-WAECHTER" in `src/lib/capi/token.test.ts` misst genau das —
er behauptet den Inhalt der `in`-Liste wörtlich.
**DIE TRAGENDE INVARIANTE IST DAVON UNBERÜHRT:** Sie spricht von den DREI BESTEHENDEN
Zielen, und für die ändert sich nichts.

### Fehlende Daten — ENTSCHIEDEN (Owner, 2026-08-18): LEISE ÜBERSPRINGEN

Wie bei den anderen Zielen: Liegt nur die Zuordnung oder nur das Zugangsdatum vor,
entsteht kein `ResolvedTarget`, und es passiert nichts.

**DIE AUFLAGE, DIE DAZUGEHÖRT:** Das ist ein STILLER Ausfallpfad, und diese Sitzung hat
bereits zwei davon gefunden und protokolliert. **Ein dritter, der nirgends steht, wäre
der Fehler.** Er geht als eigener Punkt in den Vorrat („EIN UNVOLLSTÄNDIG
KONFIGURIERTES ZIEL FÄLLT STILL AUS"), mit dem Trigger auf eine UI-Warnung.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe. **ALLE FÜNF HABEN GEHALTEN — GEMESSEN am Diff (2026-08-19, an
Commit `5b6dc23`):** genau ZWEI Dateien (`src/lib/capi/token.ts`,
`src/lib/capi/token.test.ts`); `src/lib/tracking/**`, `src/lib/capi/ingest.ts`, die drei
Adapter-Dateien und jede Komponente sind NICHT darunter.

- **KEIN ADAPTER, KEIN FORWARD, KEIN EINTRAG IN `TARGETS_WITH_ADAPTER`.** Der Riegel aus
  11.1a hält; sein Wächter (`src/lib/tracking/target-adapters.test.ts`) bleibt stehen.
- **KEIN IPv4-RIEGEL.** Er gehört zum Adapter — dort wird die Identität gebaut, nicht
  hier. Die Annahme, die ihn später trägt, steht unter „## Entscheidungen".
- **KEINE EREIGNIS-AUFLÖSUNG.** Welche URN zu welchem Ereignis gehört, entscheidet der
  Adapter; hier reist die GANZE Zuordnung mit.
- **KEINE DEDUP-ZUSAGE UND KEINE KORREKTUR AN IHR.** Die Formulierung in `CLAUDE.md`,
  „## Offene Punkte" (Betreiber-Dokumentation, Punkt 2), ist bereits als Befund geführt.
- **KEINE UI-WARNUNG für unvollständige Konfiguration.** Steht im Vorrat.

## Scheibe 11.1f — Der Adapter

**DAS ZIEL SENDET.** Ein Adapter nach dem Muster der beiden jüngsten; `linkedin` kommt in
`TARGETS_WITH_ADAPTER` (`src/lib/tracking/target-adapters.ts`), und der Riegel aus 11.1a
fällt. **GEBAUT, GEPUSHT UND LIVE BELEGT (2026-08-19); was entstanden ist, was gemessen
wurde und was AUSDRÜCKLICH NICHT gemessen ist, steht in Vermerk 6.**

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-19, nach dem bestätigten Live-Test. Hier standen die ANWEISUNGEN FÜR
die Scheibe, und sie sind mit dem Vollzug abgelaufen:

- **DIE NUTZLAST, FELD FÜR FELD, mit der Provenienz an jeder Angabe** — die Regel-URN samt
  Präfix, der Zeitstempel in Millisekunden im 90-Tage-Fenster, das Kennungs-Paar, der
  optionale Betrag als ZEICHENKETTE, der Pflicht-Versions-Header; dazu die Grenze, dass
  eine ANGENOMMENE Nutzlast kein Schema ist, und die Aufzählung der FÜNF gemessenen
  Fehlerwege.
  **SIE IST NICHT VERLOREN, SIE HAT JETZT ZWEI BESSERE ORTE:** die Befunde stehen in
  `docs/ziel-befunde.md`, Teile (n) bis (s) — dort, wo sie gemessen wurden —, und der
  gebaute Adapter (`src/lib/capi/linkedin-forward.ts`) trägt sie an seinen Fundstellen,
  je mit GEMESSEN oder GELESEN. Eine dritte Fassung im Zuschnitt wäre eine Kopie, die
  unabhängig von beiden altert.
- **DER WEG DER ZUORDNUNG ZUM ADAPTER** — die Messung, dass `dispatchForward` nur
  `entry.config` weiterreicht, und der Befund, dass der `Forwarder`-Typ den GANZEN `entry`
  übergibt. **Eine Angabe daraus ist seit dem Vollzug ÜBERHOLT und deshalb GESTRICHEN
  statt gekürzt:** „`entry.conversionRules` erreicht damit keinen Adapter." Seit dieser
  Scheibe erreicht sie einen — der Eintrag in `FORWARDER_BY_TARGET` projiziert sie in die
  eigene Config-Form. Stehengeblieben wäre das eine TATSACHENBEHAUPTUNG ÜBER DEN CODE, die
  beim nächsten Zuschnitt einen Weg noch einmal bauen liesse, den es gibt.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, je mit seinem Grund** — im Zweifel
stehengelassen:
· **„Drei Riegel, je mit ihrem Grund"** trägt zwei Befunde, die über die Scheibe
  hinausreichen und sonst nirgends stehen: die Kette aus GELESEN, FOLGERUNG und ANNAHME
  zum IPv4-Riegel, und die Feststellung, dass eine Bedingung ÜBER DIE PAARUNG aus Ereignis
  und Ziel im Bestand NEU ist.
· **„Die vier Bau-Entscheidungen"** bleibt, weil ein Code-Kommentar wörtlich darauf zeigt:
  `src/lib/capi/linkedin-forward.ts` verweist für die Auflage an der Bauform F1 „im
  Zuschnitt" dorthin. Eine Streichung machte den Zeiger stumpf — dieselbe Falle wie in
  11.1e.
· **„Die tragende Invariante"** und **„Was ausdrücklich NICHT drin war"** bleiben als
  Prüfstein bzw. als weitergeltende Ausschlüsse.
· **DIE ANTWORT AUF DIE ZWEITE OFFENE FRAGE** bleibt vollständig stehen — sie bindet jede
  spätere Runde an diesem Ziel und ist durch den Live-Test nicht überholt, sondern
  PRÄZISIERT worden (s. den Nachtrag dort).

WAS GEBAUT UND GEMESSEN WURDE, STEHT IN VERMERK 6 — und nur weil es dort steht, durfte es
hier weg.

### Drei Riegel, je mit ihrem Grund

- **IPv4.** Die Schnittstelle nimmt für `PLAINTEXT_IP_ADDRESS` nur IPv4 — **GELESEN**
  (i) — und prüft die FORM des Kennungs-Werts NICHT: ein syntaktisch unsinniger Wert
  bekam 201, und die Empfangsanzeige zählte ihn mit — **GEMESSEN** (j). **UNSERE PRÜFUNG
  IST DAMIT DIE EINZIGE STELLE, AN DER EINE IPv6-ADRESSE ÜBERHAUPT AUFFALLEN KANN.**
  **DASS IPv6 VORKOMMT, IST EINE ANNAHME** und bleibt eine — sie steht unter
  „## Entscheidungen" („DIE IPv6-ANNAHME"), mit ihrer Provenienz-Kette aus GELESEN,
  FOLGERUNG und ANNAHME. **GEMESSEN am Code (2026-08-19): Es gibt im gesamten `src/`
  KEINE Prüfung der Adressfamilie** — die einzige inhaltliche Prüfung auf diesem Pfad ist
  `isLoopbackOrEmpty` (`src/lib/capi/ingest.ts`), und sie erkennt Loopback, keine Familie.
- **KEIN EINTRAG FÜR DIESES EREIGNIS.** Ohne URN gibt es kein Ziel, an das gesendet werden
  könnte. **DAS IST EINE NEUE KLASSE IM BESTAND — GEMESSEN am Code (2026-08-19):** Kein
  heutiger Adapter kann für MANCHE Ereignisse nichts senden. `isForwardable`
  (`src/lib/capi/ingest.ts`) schliesst ein Ereignis für ALLE Ziele aus, `hasAdapter`
  (`src/lib/tracking/target-adapters.ts`) ein Ziel für ALLE Ereignisse. Eine Bedingung ÜBER
  DIE PAARUNG aus Ereignis und Ziel gibt es nicht.
- **KEINE IDENTITÄT.** Wie bei Pinterest und aus demselben Grund: ohne Kennungs-Paar wäre
  das Pflichtfeld leer. **GEMESSEN** (a): Typ und Wert sind BEIDE Pflicht.

### Die vier Bau-Entscheidungen — ENTSCHIEDEN (Owner, 2026-08-19)

Sie beantworten unter anderem die erste der beiden offenen Fragen weiter unten; **jene
bleibt im Wortlaut stehen und trägt ihre Antwort daneben.**

- **SIGNATUR F1 — EINE EIGENE CONFIG-FORM** nach dem Muster von `PinterestConfig`
  (`src/lib/capi/pinterest-forward.ts`).
  **GRUND:** Sie hält die Grenze, die jener Präzedenzfall zieht — **der EINTRAG in
  `FORWARDER_BY_TARGET` (`src/lib/capi/ingest.ts`) projiziert, der ADAPTER kennt nur seine
  eigene Form.** Die beiden Alternativen brechen je eine Seite davon: ein zusätzlicher
  Parameter neben `CapiConfig` reichte dem Adapter ein Feld, das für dieses Ziel
  nachweislich leer ist (`pixelId === ""` seit 11.1e), und der `entry` selbst machte den
  Adapter ziel-bewusst — er kennte dann die Form des Resolvers, was kein anderer tut.
  **AUFLAGE: Die Zuordnung reist als GANZES hinein; der Schlüsselzugriff
  (`rules[event]`) gehört in den ADAPTER, nicht in den Eintrag.** Der Grund ist das
  Containment: Der Eintrag läuft SYNCHRON (GEMESSEN 2026-08-19: `dispatchForward` ist keine
  `async`-Funktion), und jede Normalisierung, die dem Nachschlag folgt, würde dort später
  nachgezogen.
- **BETRAG B2 — MIT RIEGEL.** Gesendet wird nur eine ENDLICHE Zahl oder eine NICHT-LEERE
  Zeichenkette; alles andere lässt `conversionValue` **WEG**.
  **GRUND, GEMESSEN:** `String(v)` erzeugt aus einem Objekt `"[object Object]"` und aus
  `NaN` die Zeichenkette `"NaN"` — und die Schnittstelle prüft den WERTEBEREICH nicht
  ((e), (j)): Beides käme als 201 zurück und stünde falsch im Konto des Betreibers. **Das
  Feld ist optional; ein FEHLENDER Betrag ist besser als ein falscher.**
- **FEHLERDEUTUNG D2 — VIER GEMESSENE KLASSEN**, alles andere in einen Rest-Zweig: 401
  (Zugangsdatum) · 403 (**irreführend**, s. Teil (c)) · 400 mit `code` (Gateway) · 422 mit
  Feldpfad. **Eine fünfte Form aus dem Gedächtnis wäre eine Behauptung ohne Quelle.**
  **AUFLAGE: Fremdtext wird GESCHWÄRZT, DANN GEKAPPT — in dieser Reihenfolge**, nach dem
  Muster des Bestands (`redactOpaque` in `src/lib/redact.ts`, davor je eine Normalisierung,
  die immer eine Zeichenkette liefert).
- **`eventId` WIRD MITGESCHICKT.** Es ist **GEMESSEN angenommen** (Teil (p), belegt durch
  die Positivkontrolle im selben Lauf) und kostet nichts.
  **KEINE ZUSAGE — an keiner Stelle, in keinem Kommentar.** Dass der Anbieter damit
  dedupliziert, ist NICHT gemessen und mit den heutigen Instrumenten nicht messbar (q).

### Was der Adapter-Eintrag an Tests mitzieht — VIER BEFUNDE

**GEMESSEN am Repo (2026-08-19), VOLLZOGEN am selben Tag.** Sie gehören in den Zuschnitt,
weil einer von ihnen KEIN Testfehler ist, sondern ein Befund über die Karten-Logik — und
genau dieser bleibt hier stehen.

**DREI DER VIER SIND MIT DEM BAU ERLEDIGT und stehen im Wortlaut in Vermerk 6:** der
Wächter in `src/lib/tracking/target-adapters.test.ts` ist ENTFERNT worden, nicht angepasst
(sein eigener Kommentar verlangte das) · der `linkedin`-Lauf in
`src/lib/capi/fan-out.test.ts` hat die SEITE gewechselt und dafür Modul-Mock und
Spion-Verdrahtung bekommen · `src/lib/capi/token.test.ts` ist unberührt geblieben, weil
der Resolver `hasAdapter` nicht kennt.

- **DER LAUF IN `src/components/TargetCard.test.tsx` FÄLLT, UND DAS IST KEIN TESTFEHLER.**
  Er setzt „hat Adapter" mit „hat ein öffentliches Feld" gleich (er erwartet im
  Adapter-Zweig `TARGET_CARDS[target].publicLabel`). **Für ein Ziel, dessen Kennung JE
  EREIGNISTYP gilt und nicht auf der Karte lebt, trägt diese Kopplung nicht.** BEFUND ÜBER
  DIE KARTEN-LOGIK, nicht über den Test.
  **VOLLZOGEN, UND DER BEFUND IST DABEI BESTÄTIGT WORDEN (GEMESSEN am Compiler und am
  Code, 2026-08-19):** Der Test hat einen DRITTEN Fall bekommen (Empfänger ja, öffentliches
  Feld nein); die Komponente ist UNVERÄNDERT geblieben und rendert die Kombination korrekt.
  Es war die Annahme des Tests, die nicht mehr trug, nicht das Verhalten der Karte.
  **WAS DAMIT NICHT ENTSCHIEDEN IST:** ob die Karte für ein Ziel ohne öffentliches Feld
  etwas anderes zeigen SOLL als heute. Sie zeigt nichts Falsches — sie zeigt auch nichts.

### Die tragende Invariante — sie ist zweiseitig

- **(a) FÜR DIE DREI BESTEHENDEN ZIELE ÄNDERT SICH NICHTS** — nicht am Ingest, nicht an
  ihren Nutzlasten, nicht an der garantierten leeren 204.
- **(b) EIN WURF IM NEUEN ADAPTER DARF DAS CONTAINMENT NICHT BRECHEN.** **DIE GRENZE IST
  GEMESSEN (2026-08-19):** Alle drei Adapter sind `async` und werfen deshalb NIE synchron
  — ihr GANZER Rumpf ist gegenüber `Promise.allSettled` gedeckt, **auch was VOR ihrem
  `try` steht** (bei `forwardToMeta` liegen Nutzlast-Bau und URL-Bildung dort).
  `dispatchForward` ist dagegen **NICHT** `async`; was in ihm und in den Rückrufen von
  `FORWARDER_BY_TARGET` synchron läuft, liegt AUSSERHALB des Containments — ebenso wie das
  `await` auf `getCapiConfigByTrackingKey` in `handleIngest`, das in keinem `try` steht.

**BEIDE HÄLFTEN BRAUCHEN GETRENNTE NACHWEISE** — wer nur (a) prüft, hat die Regression;
wer nur (b) prüft, hat sie nicht.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe. **ALLE VIER HABEN GEHALTEN — GEMESSEN am Diff (2026-08-19, an
Commit `a4e680c`):** sieben Dateien, davon zwei neue; kein Signal, keine Anzeige, keine
Wiederholung, kein Zähler, keine Übersetzungstabelle für Ereignisnamen — und in keiner
Zeile des Commits, des Codes oder seiner Kommentare eine Dedup-Zusage.

- **KEINE DEDUP-ZUSAGE.** Dass das Feld für eine mitgegebene Ereignis-Kennung angenommen
  wird, ist **GEMESSEN** (p); dass der Anbieter damit DEDUPLIZIERT, ist **NICHT** gemessen
  — und mit den heutigen Instrumenten nicht messbar (q). **OB `eventId` mitgeschickt wird,
  entscheidet der Plan; eine ZUSAGE an den Kunden wird daraus nicht.** Der Vorrats-Punkt
  „DIE DEDUP-FRAGE IST MIT DEN VORHANDENEN INSTRUMENTEN NICHT ENTSCHEIDBAR" bindet hier.
- **KEINE EREIGNISNAMEN-ÜBERSETZUNG.** Bei diesem Ziel ist der Name der **SCHLÜSSEL** in
  die Zuordnung und nicht der gesendete Wert — eine andere Rolle als bei den beiden
  Vorgängern. **PRÄZISE, weil „die anderen Adapter" hier zu grob wäre — GEMESSEN am Code
  (2026-08-19):** `pinterestEventName` und `tiktokEventName` bilden über eine Map ab und
  reichen Unbekanntes durch (`EVENT_MAP.get(event) ?? event`); `forwardToMeta` bildet
  ÜBERHAUPT NICHT ab und sendet den Namen roh. Es sind also ZWEI von drei, die abbilden.
- **KEIN BLEIBENDES SIGNAL, KEINE UI-WARNUNG, KEIN RETRY, KEINE ZÄHLUNG.** **GEMESSEN am
  Code (2026-08-19):** Kein Adapter im Bestand hat davon etwas — je ein `fetch`, keine
  Wiederholung, kein Zähler, nur `console.error`.

### Zwei offene Fragen — FRAGEN, kein Befund

Sie werden im Stufe-1-Prompt AM CODE beantwortet, nicht hier.

1. **WIE ERREICHT DIE ZUORDNUNG DEN ADAPTER, ohne eine Typänderung an den drei bestehenden
   Übergaben in `dispatchForward` zu erzwingen?** Was dazu bereits gemessen ist, steht oben
   unter „Der Weg der Zuordnung zum Adapter" — der `Forwarder`-Typ übergibt den ganzen
   `entry`. **OFFEN IST DIE SIGNATUR DES NEUEN ADAPTERS:** eine eigene Config-Form nach dem
   Muster von `PinterestConfig`, ein zusätzlicher Parameter, oder der `entry` selbst. Hier
   wird das NICHT entschieden.
   **BEANTWORTET AM 2026-08-19 (Owner): F1, die eigene Config-Form** — samt Grund und
   Auflage im Abschnitt „Die vier Bau-Entscheidungen" oben. **Die Frage bleibt im Wortlaut
   stehen**, weil sie den Stand des Zuschnitts festhält; der Satz „Hier wird das NICHT
   entschieden" gilt für die Runde, in der er geschrieben wurde.
2. **WIE SIEHT DER LIVE-NACHWEIS AUS?** Die EMPFANGSANZEIGE an der Conversion-Regel ist das
   einzige Instrument, das auf Testdaten reagiert — **und auch nur ihr ZEITSTEMPEL; die
   Zahlen tun es nicht** (**GEMESSEN**, (q)). Die Conversions-Zählung scheidet aus
   (**GEMESSEN**, (h)). **DAZU EINE HÜRDE, DIE KEINE FRÜHERE SCHEIBE HATTE:** Der Nachweis
   braucht eine ECHTE Regel-Kennung und ein ECHTES Zugangsdatum gegen den Produktivendpunkt
   eines FREMDEN Anbieters — die bisherigen Läufe dieser Phase liefen mit erfundenen Werten
   (so protokolliert in (c) und (j)).
   **BEANTWORTET AM 2026-08-19, UND DIE ANTWORT IST SCHWÄCHER ALS DIE FRAGE ANNIMMT — SIE
   STEHT DESHALB HIER, VOR DEM BAU, UND NICHT ERST IM VERMERK:**
   **AN UNSERER SEITE IST EIN HINAUSGEGANGENER FORWARD NICHT BEOBACHTBAR — GEMESSEN am
   Code (2026-08-19), drei Achsen:**
   · **KEIN ADAPTER LOGGT IM ERFOLGSFALL.** In `src/lib/capi/*.ts` steht kein einziges
     `console.log`/`console.info`/`console.warn`, ausschliesslich `console.error`;
     `forwardToMeta` loggt nur bei `!res.ok`, `forwardToTiktok` kehrt beim Erfolgs-Code
     stumm zurück, `forwardToPinterest` loggt im Erfolgszweig nur, wenn der Rumpf den
     Erfolg NICHT bestätigt.
   · **`events` TRÄGT KEINE ZIEL-DIMENSION, und der Analytics-Schreibpfad läuft unabhängig
     vom Fan-Out.** `persistEvent` (`src/lib/analytics/persist.ts`) schreibt `project_id`,
     `event_type`, `event_id`, `source`, `variant` — mehr nicht (GEMESSEN am Code; die
     Spaltenliste zusätzlich GELESEN in `docs/db-stand.md`). Eine Zeile je Beacon, gleich
     wie viele Ziele beliefert wurden.
   · **`Promise.allSettled` VERWIRFT JEDES ERGEBNIS.** Die Adapter geben `Promise<void>`
     zurück; es verlässt sie nichts, was der Handler auswerten könnte.
   **WAS BLEIBT:** die REGRESSION (die drei bestehenden Ziele empfangen unverändert) plus
   der **ZEITSTEMPEL** der Empfangsanzeige beim Anbieter — er zeigt EMPFANG, und er ist das
   einzige Instrument, das auf Testdaten überhaupt reagiert (Teil (q)).
   **WAS DAS HEISST, und es ist hinnehmbar, aber es gehört VOR den Bau:** **Diese Scheibe
   trägt live WENIGER als jede ihrer Vorgängerinnen.** Der Beweis, dass die RICHTIGE
   Nutzlast entsteht, liegt auf der UNIT-Ebene — nicht, weil der Live-Test schlecht
   geschnitten wäre, sondern weil es an unserer Seite nichts zu beobachten gibt.
   **PRÄZISIERT AM 2026-08-19 NACH DEM LIVE-TEST — DIE AUSSAGE OBEN BLEIBT WÖRTLICH
   STEHEN UND GILT, SIE HAT NUR EINE HÄLFTE, DIE SIE NICHT NENNT:** Was an unserer Seite
   nicht beobachtbar ist, ist der **ERFOLG**. Ein **FEHLSCHLAG** ist es sehr wohl — und
   das ist LIVE belegt: Der Riegel „kein Eintrag" und eine echte 422-Ablehnung des
   Anbieters standen beide als Logzeile in der Laufzeit-Ausgabe, unterscheidbar an ihrem
   Grund. **DAS IST DIE FOLGE DER LOG-ENTSCHEIDUNG DIESER SCHEIBE**, und ohne sie wäre
   auch diese Hälfte leer gewesen.
   **WAS UNVERÄNDERT GILT UND JEDE SPÄTERE RUNDE BINDET:** Ein GELUNGENER Forward
   hinterlässt an unserer Seite weiterhin NICHTS — kein Log, keine Zeile in `events`, kein
   Rückgabewert. Wer einen Erfolg belegen will, braucht das Instrument des Anbieters, und
   von diesem reagiert nur der Zeitstempel.

### Die drei Riegel loggen — ENTSCHIEDEN (Owner, 2026-08-19)

**Die Entscheidung gehört in den Zuschnitt, weil sie vom Bestand ABWEICHT.** Alle drei
Riegel schreiben eine Logzeile mit dem GENAUEN Grund — kein Wurf nach aussen, kein
Absturz. Der Grund ist unterscheidbar zu benennen („missing IPv4", „missing URN for
event", „missing identity" oder gleichwertig).

**WARUM ABWEICHEND, und dieser Satz trägt die Entscheidung:** Pinterest und TikTok haben an
derselben Stelle einen STILLEN `return` — **GEMESSEN am Code (2026-08-19):**
`if (!clientIp || !userAgent) return;`, ohne Logzeile, als erste Anweisung im `try`. **Ihr
Riegel greift, wenn die Anfrage keine Identität hergibt.** Die ersten beiden hier greifen
dagegen bei **VOLLSTÄNDIGER Konfiguration**: Der Betreiber hat Zugangsdaten, URN und
Einwilligung hinterlegt, und es geht trotzdem nichts hinaus. Ein stiller `return` wäre dort
der VIERTE stille Ausfallpfad dieser Phase.

**DIE PRÄZISION, DIE DAZUGEHÖRT — SIE SCHWÄCHT DIE ENTSCHEIDUNG NICHT, SIE VERORTET SIE:**
Dieses Argument trägt für die ersten beiden Riegel. Der DRITTE (keine Identität) ist
dieselbe Klasse wie bei Pinterest und TikTok; dass er hier ebenfalls loggt, folgt aus der
EINHEITLICHKEIT innerhalb dieses einen Adapters, nicht aus dem Argument darüber. Wer das
zusammenzieht, hält die Abweichung für breiter begründet, als sie ist.

**DIE DREI ANDEREN STILLEN AUSFALLPFADE GEHÖREN DANEBENGESTELLT, damit niemand sie
zusammenzieht — VIER VERSCHIEDENE URSACHEN:** der PUBLISH-DRIFT (`CLAUDE.md`, „## Offene
Punkte", „NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST") · der
AUSLIEFERUNGS-CACHE (Vorrat) · die UNVOLLSTÄNDIGE ZIEL-KONFIGURATION (Vorrat) · und dieser
hier, bei dem die Konfiguration VOLLSTÄNDIG ist und die einzelne Nutzlast nicht baubar.

**DIE AUFLAGE, OHNE DIE DIE LOGZEILE SELBST ZUM RISIKO WIRD:** Sie schreibt eine FESTE
Zeichenkette und NIE einen Wert aus der Konfiguration — kein Zugangsdatum, keine URN, keine
IP-Adresse. **DER GRUNDSATZ STEHT MEHRFACH IM REPO** (GEMESSEN am Code, 2026-08-19): Die
drei Adapter loggen im Fehlerpfad ausschliesslich über `errorName(err)` (`src/lib/errors.ts`),
nie die Message und nie ein weitergereichtes Fehler-Objekt — weil am CAPI-Pfad das
Zugangsdatum im Closure liegt. **Für diese drei Riegel ist das unkritisch; die Auflage
gehört trotzdem AN DIE FUNDSTELLE**, sonst hängt beim nächsten Fall jemand den Wert an.

**WAS DAMIT NICHT ENTSCHIEDEN IST:** Die Logzeile ist für den BETREIBER unsichtbar. Sie
sichtbar zu machen ist eine EIGENE Scheibe und steht als eigener Punkt im Vorrat.

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
  **EINGELÖST UND LIVE BELEGT (2026-08-18):** Das Neu-Veröffentlichen stand als
  PFLICHT-SCHRITT in der Anleitung, und danach trug der ausgelieferte Text den
  LinkedIn-Schlüssel an BEIDEN Stellen. Die Entscheidung bleibt stehen — sie bindet jedes
  weitere Ziel und jede weitere Kennung, nicht nur diese Scheibe.
- **EINE NEUNTE ZIEL-GESCHLÜSSELTE STELLE IST ENTSTANDEN: `RULES_TARGET`**
  (`src/components/CodeImporter.tsx`, gebaut in 11.1d, GEMESSEN am Code 2026-08-18). Es ist
  ein Ziel-LITERAL und damit dieselbe Art Fundstelle wie die ACHT, die der Kopf von
  `src/lib/tracking/target-adapters.ts` führt.
  **DIE ZÄHLUNG DORT IST NICHT NACHGEZOGEN** — jene Datei war in dieser Scheibe geschützt.
  **EIGENE RUNDE.** Jener Kopf hat seine Zahl bereits ZWEIMAL falsch geführt (er korrigiert
  eine alte SECHS selbst); wer das übersieht, hinterlässt die dritte.
  **WARUM SIE UNVERMEIDBAR WAR** (aus dem Bau-Bericht, FOLGERUNG aus den geprüften
  Alternativen — nicht gemessen): Die Zuordnung Ereignisname -> Regel-Kennung ist heute die
  Kennungsform GENAU EINES Ziels, und irgendeine Stelle muss sagen, welches. Ein Record
  über ALLE Ziele wäre eine ziel-geschlüsselte Aussage mit VIER Einträgen statt einem Wert;
  eine Ableitung aus einer bestehenden Liste (etwa „hat keinen Adapter") koppelte die
  Oberfläche an eine Tatsache, die etwas ANDERES bedeutet.
  **WAS DAMIT NICHT PASSIERT IST, und das ist die tragende Hälfte:** `isTargetDeliverable`
  (`src/lib/settings.ts`) ist NICHT betroffen — sie bleibt ziel-generisch. Und
  `MeasureView` bleibt ZIELWERTFREI: die Ansicht bekommt das Ziel als PROP, genau wie sie
  die Ziel-Liste schon als Prop bekommt. Der Zielwert steht an GENAU EINER Stelle, im
  Container, mit seiner Begründung daneben.
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
  Zuschnitt 11.1d unter „Vollzogen" — der Abschnitt hiess bis zur Verdichtung am
  2026-08-18 „Was drin ist"): `hasTargetPixelId` bleibt unangetastet, der
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
- **DIE IPv6-ANNAHME — UND SIE IST AUSDRÜCKLICH EINE ANNAHME, KEINE MESSUNG** (Owner,
  2026-08-18): Es wird ANGENOMMEN, dass IPv6-Adressen in Produktion vorkommen.
  **PROVENIENZ: ANNAHME.** Das ist eine eigene Klasse neben GEMESSEN und GELESEN, und sie
  wird nie in eine der beiden gehoben, solange sie nicht gemessen ist.
  **GRUND, WARUM ÜBERHAUPT ANGENOMMEN WIRD:** Am Code ist es NICHT entscheidbar (GEMESSEN
  2026-08-18: `resolveClientIp` in `src/lib/capi/ingest.ts` liest einen Kopf —
  `x-vercel-forwarded-for`, ersatzweise `x-real-ip` — und trifft KEINE Annahme über
  dessen Inhalt; die einzige inhaltliche Prüfung im Repo ist `isLoopbackOrEmpty`, eine
  Loopback-Erkennung und KEINE Familien-Unterscheidung). Und eine Messung an der
  DEPLOYTEN Laufzeit ist heute nicht möglich: es gibt ausser dem Owner keine
  Live-Kunden, also keinen Traffic in den Logs.
  **WARUM DIE ANNAHME KONSERVATIV IST:** Sie führt zu einem Riegel, der bei reinem
  IPv4-Traffic überflüssig wäre und nichts kaputtmacht. Die Gegenannahme wäre teurer —
  sie liesse einen Fall ungeschützt, der laut `docs/ziel-befunde.md`, Teil (j), mit 201
  quittiert würde und ins Leere liefe.
  **DIE PROVENIENZ-KETTE GEHÖRT DAZU, DREI GLIEDER, KEINES GEMESSEN:** dass
  `PLAINTEXT_IP_ADDRESS` nur IPv4 meint, ist GELESEN (`docs/ziel-befunde.md`, Teil (i),
  Anbieter-Doku 2026-08-17) · dass ein IPv6-Wert quittiert würde, ist FOLGERUNG (Teil
  (j), dort ausdrücklich als nicht gemessen bezeichnet — IPv6 ist nicht probiert worden)
  · dass IPv6 überhaupt vorkommt, ist ANNAHME.
  **SIE BINDET DEN ADAPTER-ZUSCHNITT (11.1f), NICHT DIE SCHEIBE 11.1e** — dort wird die
  Identität gebaut. **NEU ZU BEWERTEN, sobald echter Traffic messbar ist.**

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

- **DER AUSGELIEFERTE TEXT KANN NACH EINEM PUBLISH VERALTET IM BROWSER STEHEN** (GEMESSEN
  am lebenden System, 2026-08-18, beim Live-Test der Scheibe 11.1d): Die Live-Seite zeigte
  nach dem Publish den ALTEN Text — mit einer Pixel-Kennung, die der Editor-Stand nicht
  mehr trug. **Ein Neuladen mit F5 half NICHT; erst ein Aufruf mit einem zusätzlichen
  URL-Parameter zeigte den korrekten Stand.**
  **WAS GEMESSEN IST — und die Gegenprobe ist der Grund, warum dieser Punkt hier steht und
  nicht als Defekt der Scheibe:** In der Datenbank (SQL, 2026-08-18) trägt
  `published_content` den LinkedIn-Schlüssel und NICHT mehr die alte Kennung, `updated_at`
  liegt nach dem Publish. Der Publish hat also VOLLSTÄNDIG gegriffen — es war der
  BROWSER-CACHE. Ohne diese zweite Prüfung wäre das als Fehlschlag der Scheibe
  protokolliert worden.
  **WAS NICHT GEMESSEN IST und ausdrücklich offen bleibt:** OB und WELCHE Cache-Header die
  Serve-Route setzt und mit welcher Lebensdauer. Die Route war in dieser Phase durchgehend
  geschützt und ist NICHT gelesen worden. Das ist keine Aussage über ihr Verhalten, sondern
  die Aussage, dass es hier niemand geprüft hat.
  **WARUM ES ZÄHLT:** Ein Kunde, der nach dem Publish auf seiner Seite nachsieht, macht
  dieselbe Erfahrung — und schliesst, das Publish habe nicht gegriffen.
  **ES IST EINE DRITTE EBENE, UND SIE GEHÖRT NEBEN DIE ZWEITE, NICHT IN SIE:** Der Eintrag
  „NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST" (`CLAUDE.md`,
  „## Offene Punkte") behandelt EDITOR gegen VERÖFFENTLICHT — dort ist der publizierte Text
  wirklich alt, und die Lösung liegt im Produkt (Hinweis, Anzeige oder Riegel). HIER ist
  der publizierte Text KORREKT und nur seine AUSLIEFERUNG veraltet: VERÖFFENTLICHT gegen
  AUSGELIEFERT. **Verschiedene Ursachen, verschiedene Lösungen** — wer sie zusammenzieht,
  sucht die eine an der Stelle der anderen.
  **TRIGGER:** mit der Drift-Runde, die ohnehin ansteht — sie behandelt die Nachbar-Ebene.
  GEMELDET, NICHT GEBAUT, KEINE Empfehlung zur Bauform.

- **EIN UNVOLLSTÄNDIG KONFIGURIERTES ZIEL FÄLLT STILL AUS.** Liegt nur die Kennung oder
  nur das Zugangsdatum vor, entsteht kein Empfänger und es geht nichts hinaus — ohne
  Meldung, auf keinem Kanal.
  **GEMESSEN am Code (2026-08-18):** Die Paarungsschleife in
  `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`) überspringt mit
  `if (!token) continue;`; die Gegenrichtung fällt schon vorher heraus, weil ein Ziel
  ohne Kennung gar nicht erst in den `in`-Filter der Geheimnis-Abfrage kommt.
  **DAS TRIFFT ALLE VIER ZIELE, nicht nur LinkedIn** — es ist ein Zustand des BESTANDS,
  den die Scheibe 11.1e übernimmt und NICHT erzeugt.
  **WAS DIE OBERFLÄCHE HEUTE SAGT, und das ist der Punkt:** Die Karte meldet
  „Zugangsdaten hinterlegt", sobald eine Geheimnis-Zeile existiert
  (`listConfiguredTargets`, `src/app/projects/actions.ts` — sie liest den Wert nie); über
  die KENNUNG sagt sie an dieser Stelle nichts. **OB und WIE eine Warnung entsteht, ist
  HIER NICHT entschieden.**
  **TRIGGER:** die UI-Warnung für unvollständige Ziel-Konfiguration (Owner-Absicht,
  2026-08-18), oder spätestens vor echtem Ad-Traffic.
  **ES IST DER DRITTE STILLE AUSFALLPFAD DIESER SITZUNG, und die beiden anderen gehören
  danebengestellt, damit niemand sie zusammenzieht:** der PUBLISH-DRIFT (`CLAUDE.md`,
  „## Offene Punkte", „NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN
  IST") — dort ist der ausgelieferte Text alt, weil niemand neu veröffentlicht hat; der
  AUSLIEFERUNGS-CACHE (dieser Vorrat, der Punkt darüber) — dort ist der veröffentlichte
  Text korrekt und nur seine Auslieferung veraltet; und DIESER hier — dort ist die
  Konfiguration selbst unvollständig, und es entsteht gar kein Empfänger.
  **DREI VERSCHIEDENE URSACHEN, DREI VERSCHIEDENE LÖSUNGEN.**

- **`withPixel` HEISST NICHT MEHR, WAS ER ENTHÄLT.** Seit Scheibe 11.1e trägt die Liste
  Ziele, die KEINEN Pixel führen — der Filter urteilt über beide Kennungsformen. **Der
  Name behauptet damit das Gegenteil seines Inhalts.**
  **GEMESSEN am Repo (2026-08-19), und die Zahl steht hier anders, als sie gemeldet
  wurde:** Der Bezeichner steht **VIERMAL** im Rumpf von `getCapiConfigByTrackingKey`
  (`src/lib/capi/token.ts`) — die Bindung, der Frühausstieg, die `map` auf die `in`-Liste
  der Geheimnis-Abfrage und der Kopf der Paarungsschleife. **Gemeldet waren SECHS**; die
  Suche findet vier, case-insensitiv und über die ganze Datei.
  **DIE ZWEITE HÄLFTE DER MELDUNG TRIFFT AN DIESER STELLE EBENFALLS NICHT ZU, und sie ist
  die wichtigere:** Die Kommentare an derselben Stelle nennen den Bezeichner NICHT — sie
  umschreiben ihn („DER FILTER", „der Kosten-Absatz"). **Genannt wird er in Kommentaren
  ANDERSWO:** einmal in `src/lib/tracking/target-readiness.ts` („der `withPixel`-Filter
  in …") und zweimal in `src/lib/tracking/target-readiness.test.ts` (GEMESSEN 2026-08-19,
  case-insensitive Suche über `src/`; die Treffer auf `projectWithPixel` in
  `src/lib/capi/token.test.ts` sind eine FIXTURE und nicht dieser Bezeichner).
  **DAS VERSCHIEBT DEN PREIS, ES SENKT IHN NICHT:** Eine Umbenennung zieht KEINE
  Entscheidungs-Prosa an der Fundstelle mit, dafür aber drei Nennungen in ZWEI ANDEREN
  Dateien — darunter `src/lib/tracking/target-readiness.ts`, deren Kopf-Absatz als
  unangetastet markiert ist und von `src/lib/tracking/target-adapters.ts` wörtlich zitiert
  wird.
  **WARUM NICHT IN 11.1e:** Eine Umbenennung fiele in denselben Diff wie eine
  Verhaltensänderung auf dem heissesten Pfad — dann wäre bei einem Fehlschlag nicht zu
  trennen, welche Achse gebrochen ist. Dieselbe Begründung, mit der der Zuschnitt den
  Adapter von diesem Weg getrennt hat.
  **TRIGGER:** mit der nächsten Runde, die `src/lib/capi/token.ts` ohnehin anfasst.
  GEMELDET, NICHT GEBAUT — und ausdrücklich KEIN Namensvorschlag.

- **DIE DEDUP-FRAGE IST MIT DEN VORHANDENEN INSTRUMENTEN NICHT ENTSCHEIDBAR** (Messung
  2026-08-19, neun Läufe gegen die Schnittstelle des Anbieters; die Befunde stehen in
  `docs/ziel-befunde.md`, Abschnitt „LinkedIn (Conversions API)", Teile (n) bis (s)).
  **GEMESSEN ist die SENDESEITE:** Das Feld für eine mitgegebene Ereignis-Kennung
  existiert und wird angenommen — belegt durch eine Positivkontrolle im selben Lauf, die
  ein erfundenes Feld mit 422 abweisen liess (Teil (p)).
  **NICHT GEMESSEN IST DIE WIRKUNG**, und sie ist mit den heutigen Instrumenten auch
  nicht messbar: Die Anzeige-Zahlen des Anbieters reagieren auf Testdaten überhaupt
  nicht — ein Kontroll-Lauf mit einer NEUEN Kennung bewegte sie so wenig wie ein
  wiederholter (Teil (q)); und eine Zuordnung zu einer echten Person tritt bei Testdaten
  prinzipiell nicht ein (Teil (h), festgehalten auch unter „## Entscheidungen").
  **FOLGE FÜR DEN ZUSCHNITT VON 11.1f, und das ist der Grund, warum dieser Punkt hier
  steht:** Der Adapter KANN die Kennung mitschicken; eine ZUSAGE an den Kunden wird
  daraus nicht. Die beiden Sätze sind nicht dasselbe, und nur der erste ist gedeckt.
  **WAS DAS AN DER BETREIBER-DOKUMENTATION BERÜHRT — GEMESSEN am Wortlaut (2026-08-19),
  NICHT geändert:** Die Dedup-Zusage in `CLAUDE.md`, „## Offene Punkte", Punkt (2), ist
  über die HERKUNFT der Ereignisse formuliert („gilt für Ereignisse AUS DIESEM BUILDER")
  und NICHT über das Ziel. Für dieses Ziel wäre sie dem Wortlaut nach ANWENDBAR und
  trotzdem UNBELEGT. Ob und wie das dort nachgezogen wird, ist HIER NICHT entschieden.
  **TRIGGER:** sobald echter Traffic eine Zuordnung zu einer echten Person erzeugt.
  GEMELDET, NICHT GEBAUT.

- **EINE SICHTBARE WARNUNG FÜR EIN ZIEL, DAS KONFIGURIERT IST UND TROTZDEM NICHT SENDET**
  (Owner-Absicht, 2026-08-19). Ab 11.1f schreibt der Adapter den Grund in eine Logzeile —
  **aber eine Logzeile erreicht den Betreiber nicht.** Die drei Fälle: kein IPv4 · kein
  Eintrag für dieses Ereignis · keine Identität.
  **WARUM NICHT IN 11.1f:** Eine Anzeige braucht einen Weg vom SERVER-Ereignis in die
  Oberfläche, den es heute nicht gibt. Und die Bauform ist nicht frei: Der server-seitige
  Ziel-Fehlschlag ist laut `docs/immer-beachten.md` („WELCHE REGEL WANN GREIFT") **keine
  Meldung, sondern eine GRÖSSE** — wer ihn als Fehlermeldung baut, hängt eine Anzeige an
  ein Ereignis, das PRO BESUCHER eintreten kann. Das ist eine eigene Scheibe mit eigenem
  Zuschnitt.
  **TRIGGER:** eine Frontend-Runde, ODER ein Support-Fall, in dem ein Betreiber meldet,
  dass nichts ankommt. GEMELDET, NICHT GEBAUT — und ausdrücklich KEINE Bauform-Empfehlung.

- **MIT 11.1f ENTSTEHT DIE VIERTE UNABHÄNGIGE DECKEL-KONSTANTE FÜR DIESELBE FRAGE**
  (GEMESSEN am Code, 2026-08-19): `META_FORWARD_TIMEOUT_MS` (`src/lib/capi/meta-forward.ts`),
  `PINTEREST_FORWARD_TIMEOUT_MS` (`src/lib/capi/pinterest-forward.ts`) und
  `TIKTOK_FORWARD_TIMEOUT_MS` (`src/lib/capi/tiktok-forward.ts`) stehen ALLE DREI auf
  `3_000` und sind ALLE DREI modul-privat — kein `export`, und **keine Stelle im Repo sieht
  je zwei davon nebeneinander.** Der neue Adapter bringt eine vierte mit.
  **WAS DAS IST UND WAS ES AUSDRÜCKLICH NICHT IST:** Es ist eine DIVERGENZ-GEFAHR, kein
  Defekt am Aufräumen. **Der Deckel selbst arbeitet korrekt** — alle drei Adapter deckeln
  über `AbortController` plus `setTimeout` und löschen den Timer je in einem `finally`
  (`clearTimeout(timer)`); `Promise.race` kommt in `src/` NIRGENDS vor, der Verteiler
  verbietet es sogar ausdrücklich. Wer hier einen liegengebliebenen Timer sucht, sucht
  etwas, das es nicht gibt.
  **WARUM ES TROTZDEM ZÄHLT:** Eine divergente ZAHL fällt beim Lesen nicht auf — anders als
  ein divergenter Text. Zwei Tests in `src/lib/capi/fan-out.test.ts` unterstellen die
  Gleichheit bereits faktisch und sind dort entsprechend beschriftet.
  **DER PUNKT IST NICHT NEU — ER WIRD HIER NUR AUF DEN HEUTIGEN STAND GEBRACHT:** Er steht
  als Kandidat „DER DECKELWERT IST MODUL-PRIVAT UND VON AUSSEN NICHT LESBAR" in
  `docs/claude-history/backlog-polish.md`. **Jener Eintrag führt ZWEI Konstanten** („Der
  zweite Empfänger existiert") und ist damit hinter dem Stand — die dritte gibt es seit
  Phase 11, die vierte kommt mit dieser Scheibe. **HIER NICHT REPARIERT:** jene Datei ist
  Archiv und in dieser Runde geschützt.
  **WARUM NICHT IN 11.1f:** Eine Zusammenführung ist eine Änderung an DREI bestehenden
  Adapter-Dateien — im selben Diff wie ein neuer Adapter wären bei einem Fehlschlag zwei
  Achsen nicht zu trennen. **Der neue Adapter bekommt seinen eigenen Deckel nach dem Muster
  des Bestands**, inklusive `clearTimeout` im `finally`.
  **TRIGGER:** die nächste Runde, die eine Forward-Datei ohnehin anfasst. GEMELDET, NICHT
  GEBAUT.

- **DIE REGEL-KENNUNG BRAUCHT IHR PRÄFIX, UND DER KUNDE HAT ES NICHT** (GEMESSEN live,
  2026-08-19; Sachverhalt im Wortlaut in Vermerk 6, Befund (a)). Der Adapter reicht den
  eingetragenen Wert unverändert durch und baut das Präfix NICHT; der Campaign Manager
  zeigt in seiner Oberfläche NUR die Ziffernfolge. **Wer sie kopiert, trägt einen Wert ein,
  der syntaktisch nicht trägt — und bekommt 422 mit „Invalid Urn format. Invalid prefix."**
  **WARUM DAS EIN EIGENER FALL IST:** Der Riegel „kein Eintrag" greift NICHT, weil eine
  Kennung DA ist. Es ist der VIERTE Fehlerweg neben den drei Riegeln — **der einzige, bei
  dem tatsächlich eine Anfrage hinausgeht.**
  **ZWEI RICHTUNGEN, KEINE EMPFEHLUNG, je mit der Grenze, die dazugehört:**
  · **Das Präfix serverseitig ERGÄNZEN.** GRENZE: Das trifft eine Entscheidung über die
    Form eines FREMDEN Werts, und diese Form ist nur GELESEN — gemessen ist allein, dass
    ein falsches Präfix mit 422 fällt (Teil (l)). Wer ergänzt, baut eine Annahme in den
    heissesten Pfad.
  · **Die Form PRÜFEN und mit eigenem Grund ABWEISEN.** GRENZE: Das macht aus dem heute
    LAUTEN Fehler (422 im Log) einen STILLEN (kein Forward) — **eine Verschiebung, keine
    Behebung**, solange der Betreiber weder das eine noch das andere sieht.
  **TRIGGER: EINGETRETEN.** Jeder Betreiber, der dieses Ziel konfiguriert, läuft hinein.
  GEMELDET, NICHT GEBAUT.
  **VERWEIS, UND DIE BEIDEN WERDEN NICHT ZUSAMMENGEZOGEN:** Dieser Punkt hängt an der
  bereits geführten „SICHTBAREN WARNUNG FÜR EIN ZIEL, DAS KONFIGURIERT IST UND TROTZDEM
  NICHT SENDET" (oben im Vorrat) — beide enden für den Betreiber im selben Nichts, aber
  **der eine betrifft einen FALSCHEN Wert, der andere einen FEHLENDEN.** Wer sie
  zusammenlegt, baut eine Anzeige, die zwei verschiedene Ursachen gleich benennt.

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

### 4 — Scheibe 11.1d: Die Conversion-Regel-Kennung ablegen (Commit fb91f33)

**WELCHE NUMMER DAS IST:** `fb91f33` ist der BAU-Commit (`feat(tracking):
Conversion-Regel-Kennung ablegen, LinkedIn auslieferfaehig`), gepusht am 2026-08-18 —
NICHT der Doku-Commit, der diesen Vermerk trägt. Dieselbe Trennung wie in den Vermerken 1
bis 3. ES GIBT DAMIT DERZEIT KEINE OFFENE LÜCKE.

**WAS GEBAUT WURDE.** Das Feld `conversionRules?: Record<string, string>` unter
`settings.pixels.<ziel>`, NEBEN `pixelId` (Form F1). Dazu in `src/lib/settings.ts`: der
Leser `getConversionRules` (liefert nie `undefined`), das Form-Prädikat
`hasConversionRules` (nimmt `unknown`, mindestens EIN Eintrag mit nicht-leerem Wert), der
Schreiber `setConversionRule` (immutabel, nest-erhaltend; ein leerer Wert ENTFERNT den
Schlüssel und führt exakt auf den Ausgangs-Blob zurück) und das Urteil
`isTargetDeliverable` (der Skalar ODER die Zuordnung). `settingsEqual` vergleicht das neue
Feld mit — WERTgleich und reihenfolge-unabhängig über die nicht exportierte
`conversionRulesEqual`. Im Container (`src/components/CodeImporter.tsx`) ruft das
Consent-Memo `consentTargets` jetzt `isTargetDeliverable`; die Oberfläche ist ein EIGENER
Abschnitt in `src/components/MeasureView.tsx` neben „Verwendete Events", ein Eingabefeld je
Ereignisname, mit übernommener `scope`-Aussage.
**`hasTargetPixelId` UND `getPixelId` SIND UNANGETASTET** — `getPixelId` sagt weiterhin
IMMER eine Zeichenkette zu, und der Resolver (`src/lib/capi/token.ts`) wurde nicht berührt.
**DER SCHREIBER WAR EIN VIERTES SYMBOL UND NICHT GEPLANT** (der Zuschnitt nannte drei): Die
verschachtelte Form des Blobs ist Wissen der Einstellungs-Datei; schriebe die Komponente
den Spread selbst, kennten ZWEI Stellen die Nest-Form.

**WAS GEMESSEN IST (LIVE, 2026-08-18, vom Owner):**
- **SEITE (a) DER INVARIANTE — REGRESSION:** Der ausgelieferte Text ist vor und nach dem
  Deploy BYTE-IDENTISCH, für Variante A **UND** Variante B. **Erstmals sind BEIDE Varianten
  belegt** — in 11.1c fehlte der B-Beleg, und der Vermerk 3 führt das als Grenze.
- **INGEST-REGRESSION:** Eine Conversion kam server- UND browser-seitig an, mit DERSELBEN
  Ereignis-Kennung — die Deduplizierung greift unverändert.
- **SEITE (b):** Nach dem Eintragen einer Regel-Kennung und NEUEM Veröffentlichen trägt der
  ausgelieferte Text an BEIDEN Stellen den LinkedIn-Schlüssel:
  `__psConsentAll(["meta","linkedin"])` und `"cns": { "meta": …, "linkedin": … }`. Danach
  kam eine Meta-Conversion erneut server- und browser-seitig an — **der zusätzliche
  Schlüssel kippt den bestehenden Forward nicht.**
- **DER SPEICHERN-KNOPF WURDE AKTIV.** Das ist der LIVE-Beleg für die
  `settingsEqual`-Erweiterung; ohne sie wäre der Wert beim Projektwechsel verloren gewesen,
  ohne Warnung und ohne Meldung.
- **EINE ZUORDNUNG ALLEIN GENÜGT — und das ist MEHR als geplant:** In einem Projekt OHNE
  jede Skalar-Kennung erzeugt der Erzeuger `__psConsentAll(["linkedin"])` und
  `"cns": { "linkedin": … }`, mit der Warnung „Meta-Pixel nicht konfiguriert". Die Zusage
  der Scheibe — IRGENDEINE Kennungsform genügt — ist damit LIVE belegt und nicht nur
  unit-getestet.
- **DER LEER-ZUSTAND HÄLT** (Schritt 9): Ein Projekt OHNE Track-Mappings zeigt in der neuen
  Fläche saubere Hinweistexte — kein `undefined`, kein leerer Kasten, kein
  Ladefehler-Eindruck.
  **DASS DAS EINE EIGENE ACHSE IST, GEHÖRT DAZU:** Auf Unit-Ebene ist der Zweig gedeckt,
  aber die Testumgebung wertet KEIN CSS aus — wie er AUSSIEHT, ist ausschliesslich live
  prüfbar. Ein leerer Kasten wäre dort grün durchgelaufen.

**DREI GRENZEN, DIE ZWINGEND MITMÜSSEN:**
1. **DER STRUKTURELLE KIPPPUNKT IST NICHT GEMESSEN.** Beide beobachteten Zustände trugen
   mindestens ein Ziel im Draht; der Sprung aus dem Einzel-Pfad (`many === false`) in den
   Sammel-Pfad wurde NICHT vorgeführt. **Er bleibt offen — kein bestandener Schritt**, und
   er steht als Kipppunkt 1 weiterhin im Zuschnitt.
2. **DER BYTE-VERGLEICH LIEF AUF EXPORT-ARTEFAKTEN einer lokalen Instanz** (erkennbar an
   der absoluten Ingest-URL und am fehlenden PageView-Emitter), nicht auf veröffentlichtem
   Inhalt. **Für Seite (a) ist das tauglich** — beide Seiten desselben Erzeugers. **NICHT
   belegt ist, dass die lokale Instanz beim Nachher-Zug bereits den neuen Code fuhr**; ohne
   das wäre der Vergleich trivial wahr. Schritt 6 zeigt, dass der neue Code LIEF, aber
   nicht, dass er in DERSELBEN Instanz lief.
3. **ES IST NICHT GEMESSEN, DASS AN LINKEDIN ETWAS ANKOMMT.** Es geht nichts hin — kein
   Adapter, das ist der Riegel aus 11.1a.

**EIN BEFUND AUS DEM LIVE-TEST, DER KEINER DER SCHEIBE IST** — er gehört hierher, weil er
den Test fast zum Fehlschlag gemacht hätte: Die Live-Seite zeigte nach dem Publish den
ALTEN Text, mit einer Pixel-Kennung, die der Editor-Stand nicht mehr trug. **Ein Neuladen
mit F5 half NICHT**; erst ein Aufruf mit einem zusätzlichen URL-Parameter zeigte den
korrekten Stand. GEMESSEN in der Datenbank (SQL, 2026-08-18): `published_content` trägt den
LinkedIn-Schlüssel und NICHT mehr die alte Kennung, `updated_at` liegt nach dem Publish —
der Publish hat also VOLLSTÄNDIG gegriffen, es war der BROWSER-CACHE.
**DASS ES ZWEI PRÜFUNGEN GEBRAUCHT HAT, IST DER EIGENTLICHE PUNKT:** Ohne die
Datenbank-Gegenprobe wäre das als Defekt DIESER Scheibe protokolliert worden. Als eigener
Punkt weitergeführt im Vorrat („DER AUSGELIEFERTE TEXT KANN NACH EINEM PUBLISH VERALTET IM
BROWSER STEHEN").

**WAS AUS DEM ZUSCHNITT HIERHER GEWANDERT IST, weil es mit dem Vollzug abgelaufen ist:**
- **DIE BAUFORM K4 UND DIE DREI VERWORFENEN**, je in einem Satz, damit sie niemand ein
  zweites Mal erhebt: **K3** (form-tolerantes Prädikat, uniformer Wert) hätte den Parameter
  ZWEI Gestalten annehmen lassen — dieselbe Polymorphie, mit der derselbe Zuschnitt F2
  verworfen hat. **K2** (Fallunterscheidung in den Aufrufern) hätte das Ziel-Literal in eine
  KERN-Datei verlagert, die keines führt. **K1** (Fallunterscheidung plus geweitete
  Signatur) hätte zusätzlich `src/lib/capi/token.ts` gebrochen — eine geschützte Datei.
- **DER NAME `isTargetDeliverable` UND SEIN GRUND**, und der zweite Teil bindet über diese
  Scheibe hinaus: Der zuerst vorgeschlagene Name trug das Wort „Identity", und das ist in
  diesem Projekt für die PERSONEN-Identität belegt (Roadmap-Zeile 11.1 und die
  Datenklassen-Entscheidung vom 2026-08-15, beide `CLAUDE.md`). Er hätte sich als Frage
  nach dem Kennungs-Paar der NUTZLAST gelesen statt nach der BETREIBER-Konfiguration.
  Das `is…`-Präfix trennt ihn ausserdem schon am Namen von `hasTargetPixelId`.

**DIE UNIT-EBENE, AUSDRÜCKLICH NEBEN DEM LIVE-TEST UND NICHT AN SEINER STELLE:** Zwei
Mutationen, GETRENNT gefahren (2026-08-18), je exakt die angesagten Treffer.
- **SEITE (a)** — das Urteil liefert konstant `true`: **11 von 1103 Tests fielen**, neun
  D-Tests (T1–T7, T9, T12) plus zwei Einheitstests. Fehlerklasse einheitlich („erwartet
  ohne, tatsächlich mit `linkedin`", bei D-T4 in der `null`-Ausprägung). **D-T8 blieb grün
  und wurde eigens einzeln nachgeprüft** — ohne `trackingKey` steht gar nichts im Text.
- **SEITE (b)** — der ODER-Term fällt weg: **3 von 1103 fielen** (D-T11 plus zwei
  Einheitstests). D-T1 bis D-T10 und D-T12 blieben grün, wie angesagt.
Testzahl vorher/nachher GEMESSEN: 57 Dateien/1084 Tests -> 57 Dateien/1103 Tests, alle
grün; `tsc`, Lint (0 Fehler; die eine Warnung ist vorbestehend und per `git stash`-Probe
belegt) und Build ebenfalls. **DIE eslint-DIREKTIVE MELDETE SICH NICHT ALS ÜBERFLÜSSIG** —
unter K4 bleibt der Parameter ungenutzt, und genau das ist im Zuschnitt vorher nachgezogen
worden.
EINE MUTATIONSPROBE SAGT NICHTS ÜBER DIE DEPLOYTE LAUFZEIT.

**ZWEI TESTS SIND BEWUSST NICHT UMGESTELLT WORDEN, obwohl der Bau-Auftrag es verlangte** —
beide hätten Abdeckung ENTFERNT statt hinzugefügt:
- **`D-T10`** (`src/components/CodeImporter.test.tsx`) trägt die einzige Abdeckung des
  Falls „LinkedIn mit SKALAR" und bleibt grün, weil der Skalar-Pfad weiter zählt. Statt ihn
  umzustellen sind **D-T11** (LinkedIn NUR mit Zuordnung) und **D-T12** (leere Zuordnung ist
  keine Kennung) danebengetreten; D-T11 nennt die Abgrenzung zu D-T10 in seinem Kommentar.
- **DIE ZIEL-GENERIK-ZUSICHERUNG** (`src/lib/settings.targets.test.ts`) ist NICHT gefallen,
  weil `hasTargetPixelId` unangetastet blieb. Sie ist jetzt der Wächter dafür, dass jene
  Funktion ziel-generisch BLEIBT. Geändert wurde an ihr nur der KOMMENTAR — ihre Vorhersage
  („11.1d hebt sie auf") ist nicht eingetreten.

**EIN WIDERSPRUCH IM BAU-AUFTRAG, GEMELDET UND NICHT STILL AUFGELÖST:** Er verlangte
gleichzeitig ein ziel-GENERISCHES Prädikat (K4) und dass LinkedIn mit gesetztem Skalar und
ohne Zuordnung `false` ergibt. Beides zusammen ist nicht baubar — das zweite verlangt eine
Fallunterscheidung über Ziele und damit genau die ziel-geschlüsselte Stelle, die K4
vermeidet. **GEBAUT IST K4.** Die Frage, ob ein Ziel mit event-geschlüsselter Kennung
allein mit einem Skalar als auslieferfähig gelten soll, ist damit OFFEN; heute liefert die
ODER-Verknüpfung dort `true`. Sie ist folgenlos, solange die Karte kein öffentliches Feld
für dieses Ziel führt (11.1a) — es gibt keinen Bedienweg zu einem solchen Skalar.

### 5 — Scheibe 11.1e: Der Weg zum Empfänger (Commit 5b6dc23)

**WELCHE NUMMER DAS IST:** `5b6dc23` ist der BAU-Commit (`feat(capi): LinkedIn wird
Empfaenger, ohne dass etwas gesendet wird`) — NICHT der Doku-Commit, der diesen Vermerk
trägt. Dieselbe Trennung wie in den Vermerken 1 bis 4. GEMESSEN am Repo (2026-08-19): Der
Commit trägt das Datum 2026-08-18 und steht auf `origin/main`. ES GIBT DAMIT DERZEIT KEINE
OFFENE LÜCKE.

**WAS GEBAUT WURDE.** Ein ZWEITES, OPTIONALES Feld an `ResolvedTarget`
(`conversionRules?: Record<string, string>`, `src/lib/capi/token.ts`) — die Form K-B. Die
Zuordnung reist in DERSELBEN `map` mit, die schon die Kennung liest (`rules:
getConversionRules(settings, target)` im Zwischenobjekt); der `withPixel`-Filter urteilt
über BEIDE Kennungsformen (`hasTargetPixelId(…) || hasConversionRules(…)`); die
Paarungsschleife übersetzt „leere Zuordnung" in „Feld nicht gesetzt".
**`CapiConfig`, `dispatchForward` UND DIE DREI ADAPTER SIND UNANGETASTET** — GEMESSEN am
Diff (2026-08-19): genau ZWEI Dateien, `src/lib/capi/token.ts` (90+/2-) und
`src/lib/capi/token.test.ts` (269+/0-). **PRÄZISE, weil der Satz sonst zu weit gelesen
wird:** An `CapiConfig` ist die FELDMENGE unberührt; ergänzt wurde ein KOMMENTAR an
`pixelId`, der festhält, dass dieses Feld seit dieser Scheibe LEER sein kann und KEIN
Compiler-Riegel das fängt — die Auflage, die zur Form K-B gehört.

**WAS GEMESSEN IST (LIVE, 2026-08-18, vom Owner):**
- **REGRESSION, PROJEKT OHNE LINKEDIN:** Meta empfängt server- und browser-seitig
  unverändert.
- **REGRESSION, MEHRERE ZIELE (Meta + TikTok):** Der Fan-Out läuft stabil; Meta
  dedupliziert über die geteilte Ereignis-Kennung, TikTok empfängt das Server-Event mit
  vollen Client-Parametern.
- **GEMISCHTES PROJEKT (Meta + LinkedIn, echtes Zugangsdatum, erfundene URN):** Meta und
  TikTok empfangen unverändert. **Ein VIERTER aufgelöster Empfänger kippt den bestehenden
  Forward NICHT.**
- **DER NEUE PFAD — LinkedIn-ONLY** (kein Skalar, nur Zuordnung plus Zugangsdatum):
  `/api/e` antwortet mit HTTP 204, leerem Rumpf, ohne Verzögerung und ohne 500. **Das
  Containment hält auf einem Pfad, den es vorher nicht gab** — genau der zweite Preis, der
  im Zuschnitt benannt und akzeptiert ist.
- **DER CONSENT-DRAHT TRÄGT DAS ZIEL:** `cns: { linkedin: true }` wurde korrekt aufgelöst
  und mitgeführt. **Damit ist die Kette aus 11.1d und 11.1e durchgehend belegt** —
  Einwilligung für ein Ziel OHNE Skalar-Kennung.

**DIE GRENZE, DIE ZWINGEND MITMUSS — EIN ENTSTANDENER EMPFÄNGER IST IM PRODUKT NICHT LIVE
ERKENNBAR.** Er fällt in `dispatchForward` (`src/lib/capi/ingest.ts`) am Adapter-Gate
heraus: ohne Logzeile, ohne Zählung, ohne Nutzlast. Nach aussen ist er von „nicht
entstanden" NICHT unterscheidbar — **und das ist das 204-Containment und kein Mangel.**
**FOLGE, und sie ist der Punkt dieser Grenze:** Der Live-Test zeigt, dass der neue Pfad
NICHTS KIPPT — **nicht, dass der Empfänger ENTSTEHT.** Das deckt allein die Unit-Ebene.
**KEIN BYTE-VERGLEICH:** Die Scheibe berührt den Erzeuger nicht.

**DIE UNIT-EBENE, AUSDRÜCKLICH NEBEN DEM LIVE-TEST UND NICHT AN SEINER STELLE:**
- **G0 — EINE GEMESSENE TATSACHE ÜBER DAS PRÜFWERKZEUG, DIE DEN BAU GEFORMT HAT:** `toEqual`
  ignoriert einen Schlüssel mit dem Wert `undefined`, auf JEDER Ebene — ein LEERES OBJEKT
  dagegen nicht. Daraus folgte die Umformung in der Paarungsschleife. **OHNE diese Messung
  wäre ein `conversionRules: {}` an JEDEM Empfänger gelandet und hätte Bestandstests
  gebrochen, deren Ursache in einer ANDEREN Datei steht.**
- **MUTATION 3 HAT DAS AM LEBENDEN BESTAND BESTÄTIGT:** `{}` statt `undefined` bringt
  **SIEBEN** Bestandstests zu Fall — genau die, deren Erwartung eine NICHT-LEERE
  Empfängermenge trägt. **Die Umformung ist damit nachweislich nicht kosmetisch.**
- **MUTATION 2 HAT DEN BESTEHENDEN TIPPFEHLER-WÄCHTER ZU FALL GEBRACHT:** Er ist der
  Nachweis, dass für Projekte OHNE diese Konfiguration nichts anders wird. Der Überschuss
  von drei Tests war EINE Ursache mit DREI Anzeigeflächen (zu grosse `in`-Liste,
  unerwarteter Empfänger, ausbleibender Frühausstieg) — **also Abdeckung und keine
  Kaskade.**
- **MUTATION 1 HAT DAS ENTSTEHEN AN DER RÜCKGABE DES RESOLVERS GEPRÜFT** — der einzige
  taugliche Prüfling, weil über den Handler nichts sichtbar wird (s. die Grenze darüber).
- **TESTZAHL GEMESSEN:** 57 Dateien/1103 -> 57 Dateien/1112. **KEINE bestehende Assertion
  und KEINE bestehende Fixture wurde geändert** — GEMESSEN am Diff (2026-08-19):
  `src/lib/capi/token.test.ts` ist mit 269 Zeilen rein additiv, NULL Löschungen.
EINE MUTATIONSPROBE SAGT NICHTS ÜBER DIE DEPLOYTE LAUFZEIT.

**DIE ENTSCHEIDUNG, DIE ÜBER DIE SCHEIBE HINAUS BINDET — DIE BEDINGUNG STEHT AB JETZT AN
ZWEI STELLEN:** „Trägt dieses Ziel eine Kennung IRGENDEINER Form?" wird im Consent-Memo
über `isTargetDeliverable` (`consentTargets`, `src/components/CodeImporter.tsx`) und im
Resolver AUSGESCHRIEBEN beantwortet (`getCapiConfigByTrackingKey`,
`src/lib/capi/token.ts`).
**DAS IST ERZWUNGEN UND NICHT GEWÄHLT** (GEMESSEN am Code, 2026-08-19):
`isTargetDeliverable` (`src/lib/settings.ts`) trägt `getPixelId` in ihrem ERSTEN Term, und
die `map` hat es für dasselbe Ziel bereits gerufen; ein Aufruf im Filter läse denselben
Wert ein ZWEITES Mal — JE ZIEL und JE BEACON, auf dem meistgetroffenen Pfad der Plattform.
**DER KOMMENTAR AN DER FILTER-STELLE TRÄGT DIE BEGRÜNDUNG SAMT DEM SATZ, DASS EIN
ZUSAMMENLEGEN DIE ZWEITE LESUNG WIEDER EINFÜHRT** — ohne ihn sieht die Doppelung wie ein
Versehen aus und wird beim nächsten Aufräumen beseitigt.
**DAS IST DIE ANTWORT AUF DIE DRITTE OFFENE FRAGE DES ZUSCHNITTS** („Kann der Filter
`isTargetDeliverable` rufen?"), und sie lautet NEIN — an der Kosten-Achse, nicht am
Geltungsbereich.

**DIE FORM K-B UND DIE ZWEI VERWORFENEN** stehen im Zuschnitt oben und werden hier NICHT
wiederholt: der Kommentar an `ResolvedTarget.conversionRules` VERWEIST dorthin
(`docs/aktiver-stand.md`, Scheibe 11.1e), und deshalb ist jener Abschnitt bei der
Verdichtung ausdrücklich stehengeblieben.

### 6 — Scheibe 11.1f: Der Adapter (Commit a4e680c)

**WELCHE NUMMER DAS IST:** `a4e680c` ist der BAU-Commit (`feat(capi): LinkedIn-Adapter —
das vierte Ziel sendet`), gepusht am 2026-08-19 — NICHT der Doku-Commit, der diesen Vermerk
trägt. Dieselbe Trennung wie in den Vermerken 1 bis 5. ES GIBT DAMIT DERZEIT KEINE OFFENE
LÜCKE.

**WAS GEBAUT WURDE.** Der Adapter `src/lib/capi/linkedin-forward.ts` mit der eigenen
Config-Form `LinkedinConfig` (Bauform F1: der EINTRAG projiziert, der ADAPTER kennt weder
`ResolvedTarget` noch `CapiConfig`), dazu der Eintrag in `TARGETS_WITH_ADAPTER`
(`src/lib/tracking/target-adapters.ts`) und in `FORWARDER_BY_TARGET`
(`src/lib/capi/ingest.ts`). Im Adapter: DREI Riegel mit je eigener Logzeile
(`missing identity` · `identity is not IPv4` · `no conversion rule for event`), der
Nachschlag `resolveRuleUrn` MIT Typprüfung, der Betrags-Riegel `normalizeAmount` samt
Dezimalkomma-Behandlung, und `describeLinkedinError` über VIER gemessene Klassen plus
Rest-Zweig.
**DER EINTRAG REICHT EIN ARGUMENT WENIGER WEITER:** `userAgent` wird nicht übergeben — die
Nutzlast dieses Anbieters kennt kein Feld dafür, und ein Gate darauf wäre ein
selbstgemachter Verlust gewesen.
**GEMESSEN am Diff:** sieben Dateien, 1 094 Einfügungen, 35 Löschungen. Testzahl
vorher/nachher: **57 Dateien/1112 -> 58 Dateien/1137**; `tsc`, Lint (0 Fehler, die eine
Warnung vorbestehend) und Build grün.

**WAS GEMESSEN IST (LIVE, 2026-08-19, vom Owner):**
- **REGRESSION IN DREI AUFBAUTEN:** ein Ziel · zwei Ziele (Meta + TikTok) · Meta plus
  LinkedIn. In ALLEN Fällen empfangen die bestehenden Ziele unverändert, server- UND
  browser-seitig mit geteilter Ereignis-Kennung.
- **DER FORWARD GEHT HINAUS UND KOMMT AN:** Nach Eintragen der VOLLSTÄNDIGEN URN springt
  der Zeitstempel der Empfangsanzeige beim Anbieter.
- **DER RIEGEL „KEIN EINTRAG" IST LIVE BELEGT — MIT POSITIVKONTROLLE.** Bei einem Ereignis
  ohne Regel-Kennung (Lead trug eine, Purchase nicht) kamen Meta und TikTok an, der
  Zeitstempel bei LinkedIn sprang NICHT, und im Log stand
  `[capi] LinkedIn forward skipped: no conversion rule for event` — ohne „rejected", mit
  eigenem Grund.
  **DIE POSITIVKONTROLLE GEHÖRT DAZU, sonst wäre die fehlende Zeile von einer untauglichen
  Sonde nicht zu unterscheiden:** Die Suche im Log nach `[capi]` findet nachweislich die
  bekannten Ablehnungen desselben Fensters. Das AUSBLEIBEN einer Zeile ist damit ein
  Befund und kein Sondenfehler.
- **DIE FEHLERDEUTUNG ARBEITET LIVE:** `[capi] LinkedIn forward rejected: HTTP 422
  reason=payload-rejected msg=ERROR :: /conversion :: Invalid Urn format. Invalid prefix.`
  — Statuscode, EIGENE Klasse und Anbieter-Meldung in einer lesbaren Zeile.
- **DAS 204-CONTAINMENT HÄLT UNTER EINER ECHTEN ABLEHNUNG:** Ein fremder Endpunkt antwortet
  mitten im Vorgang mit 422, und `/api/e` liefert ausnahmslos leere 204 — auch bei drei
  aktiven Zielen parallel. **Das ist ein stärkerer Beleg als jede Mutationsprobe**, weil
  hier ein fremdes System den Fehlerfall erzeugt und nicht wir.

**DIE LOG-ENTSCHEIDUNG HAT SICH UNMITTELBAR AUSGEZAHLT, und das gehört benannt, weil es die
einzige Abweichung vom Bestand war:** Ohne sie stünde als Testergebnis „bei LinkedIn kommt
nichts an", und niemand wüsste, ob der Riegel GRIFF oder das Ziel STILL ausfiel — genau der
vierte stille Ausfallpfad, den der Zuschnitt vermeiden wollte. Die Zeile hat die
Unterscheidung im ersten Testlauf geliefert.

**DREI GRENZEN, DIE ZWINGEND MITMÜSSEN:**
1. **DER IPv4-RIEGEL IST NICHT GEMESSEN.** Der Versuch über Mobilfunk lief unter einer
   IPv4-Adresse (`213.225.3.47`, vom Owner an einer externen Anzeige abgelesen) — dass
   LinkedIn dabei ankam, ist KORREKTES Verhalten und sagt über den Riegel NICHTS. Er
   bleibt unit-belegt. **Nachträglich ist es nicht zu klären: Die Adresse wird bewusst
   nicht geloggt** — und das ist dieselbe Auflage, die die Logzeilen frei von
   Konfigurationswerten hält.
2. **DER RIEGEL „KEINE IDENTITÄT" IST NICHT GEMESSEN** — die Konstellation war nicht
   herstellbar.
3. **DIE DEDUPLIZIERUNG BLEIBT UNMESSBAR.** Die Anzeige stand über den ganzen Test bei
   „4 Events / 4 dedupliziert"; nur der Zeitstempel reagierte. Das deckt sich mit Teil (q)
   der Anbieter-Befunde und ist KEINE Aussage über das Verhalten des Anbieters.

**ZWEI BEFUNDE AUS DEM LIVE-TEST, DIE KEINE DER SCHEIBE SIND:**

**(a) DIE NACKTE REGEL-KENNUNG FÜHRT ZU 422.** Der Adapter reicht den Wert unverändert
durch und baut das Präfix NICHT (gemessen an der Fehlermeldung oben). Der Campaign Manager
zeigt in seiner Oberfläche NUR die Ziffernfolge — wer sie kopiert, hat einen Wert, der
syntaktisch nicht trägt.
**WAS DARAN ZÄHLT:** Der Riegel greift NICHT, weil eine Kennung DA ist; sie hat nur die
falsche Form. Es ist ein **VIERTER Fehlerweg neben den drei Riegeln — der einzige, bei dem
tatsächlich eine Anfrage hinausgeht** —, und der naheliegendste Bedienweg des Kunden führt
hinein.
**HIER WIRD NICHTS ENTSCHIEDEN:** ob das Präfix serverseitig ergänzt oder die Form geprüft
und mit eigenem Grund abgewiesen wird, ist eine eigene Scheibe. S. „## Vorrat".

**(b) ZWEI KONSTELLATIONEN SEHEN AN DER OBERFLÄCHE GLEICH AUS.** „Nichts kommt bei LinkedIn
an" hat ZWEI verschiedene Ursachen: Trägt das Projekt GAR KEINE Zuordnung, ist das Ziel
nicht auslieferfähig, es entsteht kein Empfänger, der Adapter läuft NIE — **KEINE Logzeile**,
und das ist der Pfad aus 11.1e. Trägt es eine Zuordnung, aber nicht für DIESES Ereignis,
greift der Riegel aus 11.1f — **MIT Logzeile**.
**DER ERSTE TESTVERSUCH IST GENAU DARAN VORBEIGEGANGEN:** Die Zuordnung war gelöscht, es
fehlte die Zeile, und das sah wie ein Defekt aus. **Wer den Riegel prüfen will, muss die
Zuordnung STEHEN LASSEN und ein ANDERES Ereignis auslösen.**

**ZWEI FEHLER DES ARCHITEKTEN, BEIDE VOR DEM COMMIT GEFANGEN — sie stehen hier, weil sie
für die nächste Instanz nützlicher sind als jeder bestandene Schritt:**
- **DREIMAL IN FOLGE derselbe falsche Satz in einer Commit-Nachricht:** dass der Bestand
  seinen Timeout-Timer nicht aufräume. **Alle drei Adapter tun es** — je ein `finally` mit
  `clearTimeout`, gemessen. Die Behauptung stammte aus einem Chat-Satz, nie aus einer
  Messung, und widersprach einem Vorrats-Punkt, den der Architekt selbst freigegeben hatte.
  **EINE COMMIT-NACHRICHT IST DIE STELLE, AN DER DAS DAUERHAFT SCHADET:** Den Bau-Prompt
  prüft die Instanz am Code, die Nachricht prüft danach niemand mehr.
- **EINE DEDUP-ZUSAGE IM NEBENSATZ** („die Ereignis-Kennung für die anbieterseitige
  Deduplizierung"), zurückgenommen im Folgesatz. **Eine Nachricht, die beide Aussagen
  trägt, wird mit der ERSTEN zitiert.**
**BEIDE SIND VOR DEM COMMIT KORRIGIERT WORDEN; der Commit trägt die belegbare Fassung** —
nachprüfbar an `a4e680c`.

**WAS AUS DEM ZUSCHNITT HIERHER GEWANDERT IST, weil es mit dem Vollzug abgelaufen ist:**
- **DIE ANTWORT AUF DIE ERSTE OFFENE FRAGE** („wie erreicht die Zuordnung den Adapter?"):
  über den EINTRAG, der aus `entry.config.token` und `entry.conversionRules` die eigene
  Form baut. **Was daran über die Scheibe hinausreicht:** Der `Forwarder`-Typ übergibt
  jedem Eintrag den GANZEN `entry` — ein fünftes Ziel braucht dafür weder eine
  Typänderung noch einen Eingriff an den bestehenden vier.
- **DREI DER VIER TEST-BEFUNDE:** der Wächter aus 11.1a ist ENTFERNT (nicht angepasst), der
  `linkedin`-Lauf in `fan-out.test.ts` hat die Seite gewechselt und dafür Modul-Mock und
  Spion-Verdrahtung bekommen, `token.test.ts` blieb unberührt. **Der vierte — der Befund
  über die Karten-Logik — steht weiterhin im Zuschnitt**, weil er nicht der Test war,
  sondern die Kopplung „hat Adapter ⇒ hat ein öffentliches Feld".

**DIE UNIT-EBENE, AUSDRÜCKLICH NEBEN DEM LIVE-TEST UND NICHT AN SEINER STELLE:** Drei
Mutationen, GETRENNT gefahren (2026-08-19), je exakt die angesagten Treffer.
- **M-a (Zeitstempel in Sekunden):** 1 von 27 gefallen, `T1-a` — die Probe zeigt, dass die
  NUTZLAST geprüft wird und nicht nur der Aufruf.
- **M-b (der Eintrag zeigt auf `forwardToMeta`):** 1 von 251 gefallen, `W-linkedin`; die
  drei bestehenden Ziel-Läufe und die Adapter-Testdatei blieben GRÜN — die Trennung
  „Zuordnung kaputt" gegen „Adapter kaputt" hält.
- **M-c (synchroner Wurf VOR dem `try`):** alle 56 Containment-Läufe GRÜN, während alle 27
  Adapter-Tests fielen (Positivkontrolle: die Mutation war scharf).
  **DIE GRENZE VON M-c GEHÖRT DAZU:** Kein Handler-Test löst ein LinkedIn-Ziel mit dem
  ECHTEN Adapter auf; das Grün ist verträglich mit der Zusage, aber keine direkte Messung
  eines echten Adapter-Wurfs durch den Handler. **Der Live-Test hat diese Lücke geschlossen
  — an einer echten 422 des Anbieters, s. oben.**
EINE MUTATIONSPROBE SAGT NICHTS ÜBER DIE DEPLOYTE LAUFZEIT.
