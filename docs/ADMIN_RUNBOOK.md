# ADMIN-RUNBOOK — Handlungen des Owners im Betrieb

**Was diese Datei ist:** je Betriebsfall ein Szenario — erkennen, prüfen, handeln,
kontrollieren. Angelegt am 2026-10-02 (OWNER-ENTSCHEIDUNG 2026-10-02, Auswahl im Chat; Name
der Datei wörtlich vom Owner). Jede Scheibe, die eine Handlung des Owners im Betrieb schafft
oder ändert, trägt ihr Szenario hier ein, im selben Commit wie ihr Abschluss-Vermerk
(docs/arbeitsweise.md, "Die Kadenz").

**SIE WIRD NICHT AUTOMATISCH GELADEN.** AUSLÖSER: der Abschluss einer Scheibe, die eine
Betriebs-Handlung schafft oder ändert, und jede Live-Anleitung, die einen Befehl aus dieser
Datei verwendet (docs/arbeitsweise.md, "Was wohin geladen wird").

---

## SPERRE — VOR JEDEM ENTFERNEN LESEN

**`publayer.net`, `*.publayer.net` und `pagesmith-delta.vercel.app` werden NIE bei Vercel
entfernt.** Zeigt eine Probe einen dieser Namen als VERWAIST, ungedeckt oder fehlend, ist die
PROBE defekt, nicht die Domain. Dann wird nichts entfernt, sondern die Probe repariert.

Grund: Ohne `publayer.net` und `*.publayer.net` ist jede Seite unter der Serving-Domain vom
Netz, ohne `pagesmith-delta.vercel.app` die Anwendung (ABGELEITET). Anlass: Ein Lauf mit
unersetztem Platzhalter meldete am 2026-10-02 die Plattform-Domains als VERWAIST (Vermerk
P13.7-39 der Phase 13.7). Seitdem tragen die Proben keinen Platzhalter für die Serving-Domain
und prüfen sich selbst (Zeile `PROBE DEFEKT …`).

---

## Konventionen

**SIEBEN FELDER JE SZENARIO, in dieser Reihenfolge:** Woran erkennen · Diagnose · Entscheidung
· Handlung · Kontrolle · Antwort an den Kunden · Was festgehalten wird. Ein Feld ohne Inhalt
sagt "entfällt" und warum — es fehlt nie still.

**REGEL 1 — JEDER BEFEHL IST VOLLSTÄNDIG.** Der Owner ändert an einem Befehl nichts, ausser
höchstens an EINER deutlich markierten Stelle. Ein Befehl mit zwei Einsetzstellen gehört
nicht hierher, sondern wird vorher umgebaut.

**LESEND UND SCHREIBEND SIND SICHTBAR GETRENNT.** Jeder Befehl trägt vorn **LESEND** oder
**SCHREIBEND**. Ein schreibender Befehl folgt erst auf die Diagnose und die Entscheidung des
Szenarios.

**EINE QUELLE JE BEFEHL.** Steht ein Befehl schon als benannter Block einer Probe unter
`supabase/checks/` oder im SQL-Runbook in `CLAUDE.md`, zeigt das Szenario auf Datei und Block,
statt ihn zu kopieren — zwei Fassungen desselben Befehls laufen auseinander. "Block V2" heisst:
den Block ab seiner Kommentarzeile `-- V2` bis zum Semikolon markieren und allein ausführen.
(OWNER-ENTSCHEIDUNG 2026-10-02.) **Verweist ein Szenario auf eine Quelle, die REGEL 1 nicht
erfüllt, steht das sichtbar am Szenario** — mit der Zahl der Einsetzstellen und dem Ort, an dem
der Umbau ansteht.

**KEINE GEHEIMNISSE, KEINE WEBHOOK-ADRESSEN, KEINE KENNUNGEN.** Weder Zugangsdaten noch die
Adresse eines Formular-Ziels noch Projekt-, Nutzer- oder Ereignis-Kennungen — ausser in einem
ausdrücklich als BEISPIEL markierten Wert.

**GEÜBT ODER UNGEÜBT, JE HANDLUNG.** Jedes Szenario sagt je Handlung "GEÜBT am …" mit Beleg
(Vermerk und Phase) oder "UNGEÜBT". Geübt heisst: einmal live durchgeführt und kontrolliert —
nicht: am Code gelesen.

**PROVENIENZ:** wie im übrigen Bestand — GEMESSEN, GELESEN AM CODE, GELESEN (Dokument mit
Quelle), ABGELEITET, OWNER-ANGABE.

---

## Szenario-Verzeichnis

| Nr. | Szenario | Stand |
|---|---|---|
| (i) | Verwaiste Domain aufräumen | GEÜBT 2026-10-02 |
| (ii) | Registrierung schliessen / öffnen | Schliessen GEÜBT 2026-10-02 · Öffnen UNGEÜBT |
| (iii) | Kunde: "Leads kommen nicht an" | UNGEÜBT als Ablauf |
| (iv) | Kill-Switch: Projekt sperren / entsperren | Sperren und Entsperren GEÜBT 2026-10-01 · Auflisten UNGEÜBT · Befehle verstossen gegen REGEL 1 |
| (v) | Ausgabendeckel erreicht — alle Projekte pausiert | UNGEÜBT |

---

## (i) Verwaiste Domain aufräumen

**Stand: GEÜBT 2026-10-02** (Vermerk P13.7-39 der Phase 13.7, Punkt L3: Probe-Domain
hinzugefügt, ihre Zeile per SQL gelöscht, erneut hinzugefügt und abgelehnt, bei Vercel
entfernt, kontrolliert). Geübt mit der Fassung der Probe VOR dem Commit `72afa1b`; die
Fassung ohne Platzhalter ist nur in einer Attrappe gelaufen.

**Woran erkennen.** Ein Betreiber meldet: Beim Hinzufügen einer Domain erscheint "Domain
konnte nicht registriert werden.", obwohl die Domain ihm gehört. Oder Block V1 der Probe zeigt
eine Zeile. Hintergrund (GELESEN AM CODE, `registerCustomDomain`, src/lib/domains/register.ts):
Seit K2b legt ein 409 mit eigener projectId keine Zeile mehr an — die Domain hängt an unserem
Vercel-Projekt, aber keine `domains`-Zeile deckt sie.

**Diagnose.** Im Supabase-SQL-Editor, Datei `supabase/checks/verwaiste-domains.sql`:
1. **LESEND** — Block V0. Soll: eine Zahl ≥ 0. Fehler statt Zahl: abbrechen, die Probe ist
   nicht lauffähig.
2. **LESEND** — Block V1. Jede Zeile nennt in `target` eine Domain, deren Hinzufügen
   abgelehnt wurde.
3. Im Vercel-Dashboard die Domainliste des Projekts ablesen und die ANZAHL notieren
   (Stand 2026-10-02: vier).
4. **LESEND** — Block V2 (keine Einsetzstelle). Soll: vier Zeilen, je `erfasst` oder
   `gedeckt`.
5. Für JEDEN Namen bei Vercel, der in V2 nicht steht: **LESEND** — Block V3; einzige
   Einsetzstelle `<NEUER_VERCEL_NAME>` in der Zeile mit dem Kommentar `EINSETZEN`, ein Name je
   Lauf.

**Entscheidung.** Bei Vercel entfernt wird ein Name nur, wenn ALLES gilt:
- V2 oder V3 zeigt für ihn `VERWAIST`;
- der Block hat KEINE Zeile `PROBE DEFEKT …` geliefert (sonst: nichts entfernen, Probe
  reparieren);
- der Name steht NICHT in der Sperre oben;
- in V3 steht nicht `PLATZHALTER NICHT ERSETZT`.
Wem die Domain gehört, prüft die Probe NICHT. Nach dem Entfernen kann jedes Konto sie neu
hinzufügen (Vorrat P13.7-37 der Phase 13.7).

**Handlung.** **SCHREIBEND** — im Vercel-Dashboard, Domainliste des Projekts: genau den
entschiedenen Namen entfernen. Kein SQL. Eine `domains`-Zeile wird hier NIE gelöscht — es gibt
keine; deshalb ist der Name ja verwaist.

**Kontrolle.**
- Vercel: die Anzahl ist um genau eins kleiner als in Diagnose 3 (L3: wieder vier).
- **LESEND** — Block V2: weiter je `erfasst` oder `gedeckt`.
- V3 ist KEINE Kontrolle des Entfernens: die Probe liest allein `domains`, nicht Vercel, und
  zeigt den Namen danach weiter als `VERWAIST`.

**Antwort an den Kunden** (Vorschlag): "Die Domain war bei uns noch aus einer früheren
Verbindung eingetragen. Sie ist jetzt freigegeben — bitte füge sie erneut hinzu und folge den
DNS-Angaben." Danach steht sie auf "Wartet auf DNS" (L3, GEMESSEN 2026-10-02).

**Was festgehalten wird.** In der Standdatei der laufenden Phase ein datierter Vermerk: Datum,
entfernter Name, Anzahl bei Vercel vorher und nachher, Ergebnis von V2 danach, Uhrzeit des
V1-Eintrags. Keine Projekt- oder Nutzer-Kennung. Läuft keine Phase: nachfragen.

---

## (ii) Registrierung schliessen / öffnen

**Stand: Schliessen GEÜBT 2026-10-02** (Vermerk P13.7-24 der Phase 13.7) · **Öffnen UNGEÜBT.**

**Woran erkennen.** Schliessen: der Owner will keine neuen Konten zulassen. Öffnen: der erste
fremde Nutzer soll ein Konto anlegen.
**ÖFFNEN IST DER MOMENT "ERSTER FREMDER NUTZER"** (Vermerk P13.7-24, ZUORDNUNG) und kommt
erst nach dem Abschluss der Phase 13.7. Daran hängen die Trigger aus CLAUDE.md, "## Modus".

**Diagnose.** Im Supabase-Dashboard: Authentication → Sign In / Providers → "Allow new users to
sign up" — den Stand ablesen (am 2026-10-02: AUS). Kein Befehl.

**Entscheidung.** Schliessen jederzeit. Öffnen nur nach dem Abschluss der Phase 13.7 und als
bewusste Entscheidung des Owners.

**Handlung.** **SCHREIBEND** — derselbe Schalter: AUS zum Schliessen, EIN zum Öffnen.

**Kontrolle.**
- Nach dem Schliessen (GEMESSEN 2026-10-02): ein Registrierungsversuch ergibt "Signups not
  allowed for this instance". POSITIVKONTROLLE: die Anmeldung des Owners funktioniert.
- Nach dem Öffnen: UNGEÜBT. Mindestens ein Registrierungsversuch, der NICHT mit dieser
  Meldung abgewiesen wird.
- GRENZE (Vermerk P13.7-24): Ob weitere Wege der Konto-Anlage bestehen — Einladung, Anlage im
  Dashboard, Admin-Schnittstelle, OTP, OAuth-Anbieter —, ist nicht gelesen und nicht gemessen.
  Der Schalter liegt ausserhalb des Repos; nichts im Code meldet ein Umlegen.

**Antwort an den Kunden.** Entfällt beim Schliessen (es gibt keine fremden Konten). Beim
Öffnen: nicht festgelegt.

**Was festgehalten wird.** Datum, Stand vorher und nachher, Ergebnis der Kontrolle — in der
Standdatei der laufenden Phase.

---

## (iii) Kunde: "Leads kommen nicht an"

**Stand: UNGEÜBT als Ablauf.** Die Einzelbefunde sind gemessen; als zusammenhängender
Ablauf ist das Szenario nie gefahren worden.

**Woran erkennen.** Ein Betreiber meldet, dass Formulareinträge nicht in Make oder Zapier
ankommen — oder ein Besucher meldet eine Fehlermeldung statt der Danke-Seite.

**Diagnose.**
1. WELCHER WEG? Das Relay (`/api/f`) trägt ein Formular-Ziel, dessen Adresse auf
   `hook.eu2.make.com` oder `hooks.zapier.com` liegt und das nicht im Datensparmodus steht.
   Alles andere — Datensparmodus, eine Adresse ausserhalb dieser Liste, ein Export — läuft
   browser-direkt (Vermerk P13.7-1, Punkt (1), der Phase 13.7: Host-Liste `RELAY_HOSTS`;
   docs/formular-empfaenger-befunde.md, Zapier, (ad)).
2. DER TEST-LEAD: auf der VERÖFFENTLICHTEN Seite (nie in der Vorschau des Editors — sie sendet
   nie) ein Formular mit einem erkennbaren Wert abschicken, die Uhrzeit notieren. Dann im
   Verlauf des Zaps bzw. des Make-Szenarios nach diesem Lauf suchen. Die Ankunft im Verlauf ist
   das einzige Merkmal, das trägt (docs/formular-empfaenger-befunde.md, Zapier, (ab) und (ad)).
3. Was der Besucher sah:
   - Relay, Danke-Seite: `/api/f` hat 204 "zugestellt" gemeldet — der Empfänger hat mit 2xx
     oder 3xx geantwortet (GELESEN AM CODE, `forward` in src/lib/relay/relay.ts).
   - Relay, Meldung statt Danke-Seite: 502 "nicht zugestellt". Die Ursache sagt die Antwort
     nicht; sie steht höchstens in der Logzeile `[relay] not delivered: <Grund>` (etwa
     `upstream-status 404`, `rate-limited`) im Laufzeit-Log von Vercel — auf Hobby rund eine
     Stunde lang (GELESEN, docs/plattform-befunde.md, Vercel, Teil (d)).
   - Browser-direkt: die Danke-Seite erscheint auch dann, wenn nichts ankommt (unten).
4. Die bekannten Lagen, je mit Beleg:
   - ZAPIER, Zap AUS, GELÖSCHT oder Adresse FALSCH ABGESCHRIEBEN: Zapier antwortet zuerst
     weiter 200 "success" — gemessen bis ≤ ~63 min (aus), ≤ ~2 h 25 min (gelöscht), ≤ ~2 h 30 min
     (falsch abgeschrieben) —, danach 404. Im Fenster meldet das Relay "zugestellt", und der
     Lead ist VERLOREN: Zapier holt nichts nach, auch nicht nach dem Wiedereinschalten
     (GEMESSEN, Owner, 2026-10-02; formular-empfaenger-befunde.md, Zapier, (z) bis (ac)). Nach
     dem Fenster meldet das Relay 502.
   - ZAPIER, browser-direkt: ein ausgeschalteter, gelöschter oder falsch abgeschriebener Zap
     ergibt DAUERHAFT "erreicht" und die Danke-Seite (ebd., (ad); gemessen an einer erfundenen
     Adresse, für aus und gelöscht ABGELEITET).
   - MAKE, Szenario AUS: 200 und die Anfrage liegt in der Queue; nach dem Einschalten mit
     "Process old data" wird sie abgearbeitet (GEMESSEN 2026-09-28; ebd., Make, (z)).
   - RATENBEGRENZUNG: mehr als 120 Anfragen je 60 s je Projekt → 502 für alle Besucher dieses
     Projekts (GELESEN AM CODE, `countRelayHit`; Vermerk P13.7-1, Befund A5).
   - ZAPIER-KONTINGENT: gehaltene Läufe bei erschöpftem Kontingent sind UNGEMESSEN
     (formular-empfaenger-befunde.md, Zapier, (af)).

**Entscheidung.** Liegt der Fehler beim Empfänger (Zap aus, gelöscht, Adresse falsch,
Szenario aus), handelt der Betreiber in seinem Konto; wir ändern nichts. Liegt er bei uns
(502 ohne Ursache beim Empfänger, `rate-limited`), ist es ein Befund für die laufende Phase,
keine Handlung aus diesem Runbook.

**Handlung.** Entfällt auf unserer Seite: Es gibt keinen Befehl, der einen verlorenen Lead
zurückholt — gespeichert wird nichts (Dauerregel "FORMULARINHALTE IM RELAY SIND TRANSIT …",
docs/immer-beachten.md). Der Betreiber schaltet den Zap bzw. das Szenario ein oder trägt die
richtige Adresse ein und veröffentlicht neu.

**Kontrolle.** Ein zweiter Test-Lead wie in Diagnose 2; Soll: der Lauf erscheint im Verlauf.
Bei Zapier ersetzt eine 200 diese Kontrolle NICHT (Fenster oben).

**Antwort an den Kunden** (Vorschlag, je nach Lage):
- Zapier: "Formulareinträge, die eingegangen sind, während der Zap aus oder die Adresse falsch
  war, hat Zapier nicht angenommen und holt sie nicht nach. Bitte prüfe den Zap und trage die
  Adresse erneut ein; ein Test-Eintrag muss danach im Zap-Verlauf erscheinen."
- Make: "Einträge aus der Zeit, in der das Szenario aus war, liegen in der Warteschlange und
  werden beim Einschalten mit 'Process old data' verarbeitet."

**Was festgehalten wird.** Datum, Weg (Relay oder browser-direkt), Empfänger, Lage aus
Diagnose 4, Ergebnis des Test-Leads — ohne Webhook-Adresse, ohne Formularinhalt.

---

## (iv) Kill-Switch: Projekt sperren / entsperren

**Stand: Sperren und Entsperren GEÜBT 2026-10-01** (Vermerk P13.6-130 der Phase 13.6, Punkt
(4), D2 und M4: Sperrseite erscheint, nach dem Entsperren lädt die Seite; welche der drei
Sperr-Varianten lief, ist dort nicht angegeben). Davor schon live geprüft (CLAUDE.md, Manifest
Tier 0, KILL-SWITCH: "LIVE-SMOKE VOLLSTÄNDIG BESTANDEN (4/4)"). **Auflisten: UNGEÜBT** laut
Bestand.

**DIE BEFEHLE STEHEN NICHT HIER, SONDERN IN `CLAUDE.md`, "KILL-SWITCH — SQL-RUNBOOK".** Kein
Umzug (OWNER-ENTSCHEIDUNG 2026-10-02): CLAUDE.md lädt jede Sitzung und trägt das Runbook
"bewusst hier in der Root-Doku statt in separater Datei".

**VERSTÖSST GEGEN REGEL 1:** Jeder Sperr-Befehl dort trägt ZWEI Einsetzstellen — die
Referenz (`<ref>`) und das Ziel (`<PROJECT_UUID>`, `<LABEL>` oder `<HOST>`). Der Umbau auf eine
Stelle steht mit dem Zuschnitt K3 an (Vorrat P13.7-42 der Phase 13.7); danach wird geübt.

**Woran erkennen.** Eine Missbrauchsmeldung zu einer Seite unter `publayer.net` oder einer
Custom-Domain (Phishing, Schadcode, Spam).

**Diagnose.** Die gemeldete Adresse bestimmt die Variante: ein Label unter `publayer.net` →
"per Label"; eine Custom-Domain → "per Custom-Host". Die Seite im Browser öffnen und den
gemeldeten Inhalt selbst sehen.

**Entscheidung.** Gesperrt wird, was der Owner selbst als Missbrauch bestätigt hat. Die
Sperre gilt je PROJEKT — ein gesperrter Betreiber kann ein neues Projekt anlegen und seine
Custom-Domain dort anhängen (Vorrat P13.6-121 der Phase 13.6; Vermerk P13.7-1, Befund B3, der
Phase 13.7).

**Handlung.** **SCHREIBEND** — der passende Befehl aus `CLAUDE.md`, "KILL-SWITCH —
SQL-RUNBOOK" (Sperren bzw. Entsperren), im SQL-Editor.

**Kontrolle — ZWEI ACHSEN, ZWEI PRÜFUNGEN** (CLAUDE.md, "KILL-SWITCH — LEKTION"):
1. SERVE: die Seite antwortet 451 mit der Erklärseite.
2. INGEST: `/api/e` antwortet leer mit 204 — WIE BEI EINEM UNBEKANNTEN SCHLÜSSEL, mit Absicht.
   Der Statuscode beweist nichts; geprüft wird die nachgelagerte Wirkung (im Meta Events
   Manager kommt nichts an).
Beim Entsperren: die Seite lädt wieder.
**LESEND** — "Alle gesperrten Projekte auflisten" aus demselben Abschnitt in CLAUDE.md
(UNGEÜBT).

**Antwort an den Kunden.** An den Meldenden (Vorschlag): "Danke für die Meldung. Die Seite
ist gesperrt." An den gesperrten Betreiber: nicht festgelegt.

**Was festgehalten wird.** Datum, Grund (der Wert in `blocked_reason` trägt einen Verweis,
keine Personendaten), Variante, Ergebnis beider Kontrollen.

---

## (v) Ausgabendeckel erreicht — alle Projekte pausiert

**Stand: UNGEÜBT.** Das Greifen der Pause ist nie ausgelöst worden; es verlangte echte
Mehrkosten (Vermerk P13.7-54 der Phase 13.7). Alles unten ist GELESEN (docs/plattform-befunde.md,
Vercel, Teile (ae) und (aj)) oder OWNER-ABLESUNG der Einstellung vom 2026-10-03, nicht
beobachtet.

**Die Einstellung, auf der das Szenario steht** (OWNER-ABLESUNG 2026-10-03, Vermerk P13.7-54):
Vercel Pro, Spend Management mit Budget 20 $, Pause AN, Webhook AUS, Alarme bei 50/75/100 %. Die
Pause bleibt an, solange der Owner allein testet (Entscheidung P13.7-55 der Phase 13.7); vor dem
Wiedereinschalten der Registrierung wird umgestellt. Gezählt wird nur Verbrauch ÜBER dem
Monatsguthaben von 20 $ (Teil (ae), #44).

**Woran erkennen.**
- Alarm von Spend Management bei 50, 75 und 100 % des Budgets: Web und E-Mail; SMS nur bei 100 %
  und nur, wenn für den eigenen Nutzer eingestellt (Teil (ae)).
- Jede Production-Seite — App, Seiten unter `publayer.net`, Custom-Domains — antwortet mit
  "503 DEPLOYMENT_PAUSED" (Teil (ae), #44). Die Pause trifft ALLE Projekte des Teams und greift
  laut Doku "several minutes" nach dem Überschreiten.
- OFFEN: Wie die Pause im Dashboard angezeigt wird, ist nicht gelesen und nicht gesehen.

**Diagnose.** Im Vercel-Dashboard, Usage des laufenden Abrechnungszeitraums: WELCHE Grösse den
Verbrauch trägt (CDN Requests, Funktionsaufrufe, Active CPU, Fast Data Transfer, …) und WANN sie
gestiegen ist; dazu Firewall-Übersicht und Logs der Pfade `/api/e`, `/api/capi`, `/api/f` und der
Seitenaufrufe. Kein Befehl.
- OFFEN: Welche Ansicht die Grösse je Pfad oder je Host zeigt, ist nicht gelesen. Ein DDoS-Alarm
  entsteht erst ab 100 000 Anfragen in 10 Minuten (Teil (aj), #20); eine Flut darunter meldet
  allein der Nutzungs-Alarm. Anomalie-Alarme verlangen Observability Plus (Teil (aj)); ob es
  gebucht ist, nennt die Ablesung vom 2026-10-03 nicht.

**Entscheidung.** Flut oder echter Verkehr?
- FLUT (Verkehr ohne Gegenstück in eigenen Tests, ein Pfad oder wenige Quellen, plötzlicher
  Anstieg): zuerst die Ursache abstellen, ERST DANN fortsetzen — sonst verbraucht dieselbe Flut
  das neue Budget.
- ECHTER VERKEHR (heute nur der Owner selbst, CLAUDE.md, "## Modus"): Budget erhöhen oder die
  Pause ausschalten, dann fortsetzen.
- OFFEN: Ein Schwellenwert, der Flut von echtem Verkehr trennt, ist nicht festgelegt.

**Handlung.**
1. **SCHREIBEND** — Ursache abstellen, falls Flut. OFFEN: die Mittel (Ratenregel, Deny-Regel,
   IP-Sperre) sind GELESEN (Teil (ag)), aber nicht eingerichtet — das ist Gegenstand von K1a
   (Setzung P13.7-51 der Phase 13.7). Attack Mode ist NICHT die Notbremse (Entscheidung P13.7-50
   der Phase 13.7).
2. **SCHREIBEND** — Spend Management: Budget erhöhen oder die Pause ausschalten. Das allein
   setzt NICHTS fort: *"Projects won't automatically unpause if you increase the spend amount"*
   (#44).
3. **SCHREIBEND** — JEDES PROJEKT EINZELN fortsetzen, im Dashboard oder über die REST-API:
   *"Projects need to be resumed on an individual basis"* (#44). OFFEN: wo genau der Knopf
   liegt; der API-Aufruf steht hier bewusst nicht, weil ungeübt und ungelesen im Wortlaut.

**Kontrolle.**
- Je Projekt: die App lädt, eine Seite unter `publayer.net` und `thr-ty.com` antworten mit 200
  statt 503.
- `/api/e`: unbekannter Schlüssel → 204, Rumpf 0 (Form der Kontrolle aus Vermerk P13.7-28, N5,
  der Phase 13.7).
- Im Dashboard: die Usage steigt nach dem Fortsetzen nicht wieder so an wie vor der Pause.
- OFFEN: ob nach dem Fortsetzen ein neuer Deploy nötig ist — nicht gelesen.

**Antwort an den Kunden.** Entfällt heute: Es gibt keine fremden Kunden (CLAUDE.md, "## Modus").
Mit dem ersten fremden Nutzer ist die Pause umgestellt (Entscheidung P13.7-55); ein Text ist
dann neu festzulegen.

**Was festgehalten wird.** In der Standdatei der laufenden Phase: Datum und Uhrzeit des Alarms
und der 503, die Grösse, die den Verbrauch trug, Flut oder echter Verkehr samt Grund, die
ergriffene Massnahme, die Liste der fortgesetzten Projekte, das Ergebnis der Kontrolle. Keine
IP-Adressen, keine Projekt- oder Nutzer-Kennungen. Läuft keine Phase: nachfragen.
