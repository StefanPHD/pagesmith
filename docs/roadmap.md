# ROADMAP — der Volltext der Phasen

**Was diese Datei ist:** Der vollständige Abschnitt "## Roadmap & aktueller
Stand" aus CLAUDE.md, am 2026-08-21 hierher verschoben — WÖRTLICH. Kein Wort
umformuliert, keine Zeile umsortiert, nichts ergänzt. In CLAUDE.md steht seither
ein Stub mit EINER Zeile je Phase.

**SIE WIRD NICHT AUTOMATISCH GELADEN.** AUSLÖSER: Wer eine Phase zuschneidet,
abhakt oder ihren Stand ändert, lädt sie ZUERST.

**DER MARKER STEHT IM STUB, DER VOLLTEXT HIER.** Beide gehören zusammen: Wer
einen Marker ändert, ändert ihn in CLAUDE.md; wer eine Begründung ändert, ändert
sie hier. DIE MARKER-LEGENDE ([x] · [ ] · [~]) STEHT IN CLAUDE.md UND WIRD HIER
NICHT WIEDERHOLT — zwei Fassungen liefen auseinander.

**EIN ABSCHNITTSVERWEIS OHNE DATEIANGABE MEINT CLAUDE.md.** Formulierungen wie
"## Offene Punkte", "## Modus" oder "## Security Manifest & Launch Blocker"
stammen aus der Zeit, als dieser Text in jener Datei stand. Sie werden NICHT
umgeschrieben — dieser Satz löst sie auf, und eine Stelle ist sicherer als acht.

**VERWEISE INNERHALB DIESER DATEI sind unberührt:** Wo eine Phase auf eine
andere zeigt ("die zwei Auflagen aus 11.1", "Richtigstellung an jener Zeile"),
liegen beide hier und finden einander.

- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-2-3-foundation.md.
- [x] Phase 3 — Persistenz & Auth (Supabase): ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-2-3-foundation.md.
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-4-mapping-codegen-export.md.
- [x] Phase 4 — Code-Generierung + HTML-Export: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-4-mapping-codegen-export.md.
- [x] Phase 4.5 — Editor-Politur (Datei-Upload/Drag-Drop + Zen-Modus):
      ABGESCHLOSSEN & live getestet. Volle Herleitung:
      docs/claude-history/phase-4.5-editor-politur.md.
- [x] Phase 5 — In-Place Copywriting: ABGESCHLOSSEN & live bewiesen. Volle
      Herleitung: docs/claude-history/phase-5-copywriting.md.
- [x] Phase 6 — Server-Side Tracking (CAPI): ABGESCHLOSSEN & live bewiesen — der
      End-to-End-Dedup-Sichtbarkeitstest wurde in Phase 7 bestätigt (Owner, Meta
      Events Manager). Volle Herleitung: docs/claude-history/phase-6-capi.md.
- [x] Phase 7 — Hosting & Go-Live (war Phase 6): ABGESCHLOSSEN & live bewiesen
      (Produktions-Smoke über die deployte Produktions-URL, NICHT localhost).
      Volle Herleitung: docs/claude-history/phase-7-hosting.md.
- [x] Phase 8 — Analytics & ROI-Ökosystem (war A/B-Testing): ABGESCHLOSSEN & live
      bewiesen (2026-07-23). Ist-Stand: docs/db-stand.md; volle
      Herleitung: docs/claude-history/phase-8-analytics.md.
      ABGEHAKT 2026-07-29: der ZUGESAGTE Umfang ist fertig und live bewiesen. Die vier
      Weiterentwicklungen (Uniques, Charts/Zeiträume, CAPI-Einbettung server-vereinheitlichen,
      Launch-Härtung) sind IDEEN OHNE TERMIN und OHNE Zusage — sie hingen bisher als offener
      Haken an dieser Zeile und liessen die Phase unfertig aussehen, obwohl sie es nicht ist.
      Wird eine davon gebaut, bekommt sie eine EIGENE Scheibe mit eigenem Nachweis; sie
      öffnet diese Checkbox nicht wieder.
      ZWEI WEITERE KOMMEN DAZU (2026-08-12), in DERSELBEN Bauform und mit derselben
      Ausdrücklichkeit — IDEEN OHNE TERMIN UND OHNE ZUSAGE:
      · eine AUFSCHLÜSSELUNG DER NUR SERVER-SEITIG ERFASSTEN CONVERSIONS JE ZIEL.
        (Wortwahl bewusst: "gerettet" ist an dieser Kachel verboten — s. "WORTWAHL
        DASHBOARD" in docs/immer-beachten.md.)
      · die BEHEBUNG EINES DEFEKTS, den Phase 11 erzeugt hat — AM 2026-08-14 VON HIER
        NACH "## Offene Punkte" GEWANDERT, Eintrag "DIE ADBLOCKER-KACHEL ZÄHLT EINE
        ABGELEHNTE EINWILLIGUNG ALS VERLUST". GRUND DES UMZUGS: Er stand hier zwischen
        Ideen ohne Termin und wurde deshalb wie eine gelesen; er ist ein GEMESSENER
        Fehler mit benanntem Trigger. Der Verweis bleibt stehen, weil ihn sonst hier
        sucht, wer diese Liste kennt.
      DIE AUFSCHLÜSSELUNG BRAUCHT EINE FEHLENDE DIMENSION und steht NUR deshalb hier
      statt in Phase 11.5: die events-Tabelle trägt keine Ziel-Spalte — genau die EIGENE
      ADDITIVE SPALTE, die für Ziele ohnehin vorgesehen ist (s. "TRACKING-source =
      BEOBACHTUNGS-ORT, NIE ZIEL" in docs/immer-beachten.md). DER AUSGEZOGENE DEFEKT
      BRAUCHT DIESELBE Dimension — das war der Grund, warum beide am 2026-08-12
      zusammen hier standen, und er gilt unverändert.
      DIE ZAHL "VIER" OBEN IST DER STAND VOM 2026-07-29 und wird NICHT überschrieben —
      sie ist als Aussage über JENEN Tag richtig; mit den beiden vom 2026-08-12 waren es
      SECHS. HIER STEHEN SEIT DEM 2026-08-14 FÜNF, weil der Defekt ausgezogen ist. Wer
      eine dieser Zahlen als heutige Liste liest, zählt falsch.
      DER SATZ, DASS DIE CHECKBOX NICHT WIEDER AUFGEHT, GILT FÜR SIE WÖRTLICH MIT:
      wird eine davon gebaut, bekommt sie eine EIGENE Scheibe mit eigenem Nachweis.
      Befunde, Owner-Entscheidungen und Verortung:
      docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, "## 7. Beschlossen
      und verortet — NICHT in dieser Phase gebaut".
- [x] Phase 9 — A/B-Testing: ABGESCHLOSSEN & live bewiesen (2026-07-27 bis
      2026-07-29). Volle Herleitung: docs/claude-history/phase-9-ab-testing.md.
- [x] Phase 10 — Workspace-Reorganisation: ABGESCHLOSSEN & live bewiesen
      (2026-07-31 bis 2026-08-01). Die Einstellungsbereiche liegen jetzt als
      Drawer mit zwei Reitern (Messen / Live) außerhalb des Dokumentflusses —
      Voraussetzung für Phase 11. Volle Herleitung:
      docs/claude-history/phase-10-workspace.md.
- [x] Phase 10.5 — Umzug middleware -> proxy (Next-Konvention): ABGESCHLOSSEN
      & live bewiesen (2026-08-03). Volle Herleitung:
      docs/claude-history/backlog-polish.md, Eintrag "src/middleware.ts ->
      proxy.ts umbenennen".
- [x] Phase 11 — Multi-Tracking (Server-Side Fan-Out): ABGESCHLOSSEN & live
      bewiesen (2026-08-03 bis 2026-08-13). Gebaut und belegt: server-seitiger
      Fan-Out an DREI Ziele, Auflösung über mehrere Ziele, Einwilligung JE ZIEL,
      Oberfläche je Plattform, nebenläufiger Fan-Out mit EIGENEM Deckel je
      Empfänger. Herleitung: docs/claude-history/phase-11-multi-tracking.md; der aktive
      Stand der Phase: docs/claude-history/phase-11-multi-tracking-aktiver-stand.md.
      DER HAKEN GILT DEM GEBAUTEN TEIL. Was NICHT gebaut wurde, steht als eigene
      Zeile darunter (11.1–11.4 und 11.6) — NICHT als Sammelposten, weil die
      offenen Ziele KEINE Klasse sind.
- [x] Phase 11.1 — LinkedIn als viertes Fan-Out-Ziel: ABGESCHLOSSEN & live bewiesen
      (2026-08-17 bis 2026-08-19). Sechs Scheiben (11.1a–11.1f), je mit eigenem
      Live-Nachweis: Zugangsdatum und Conversion-Regel-Kennung abgelegt, ein Urteil
      über die Auslieferbarkeit, der Weg zum Empfänger, und zuletzt der Adapter
      src/lib/capi/linkedin-forward.ts — das vierte Ziel sendet. Volle Herleitung:
      docs/claude-history/phase-11.1-linkedin.md.
      DIE ZWEI AUFLAGEN, DIE HIER STANDEN, SIND EINE REGEL GEWORDEN und gelten damit
      für JEDES weitere Ziel, nicht nur für die, die auf diese Zeile verwiesen haben:
      "JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT —
      UND EIN DRITTES ZIEL ERZWINGT EINE ENTSCHEIDUNG, KEINE KOPIE"
      (docs/immer-beachten.md). Wer von 11.2 hierher geschickt wird, liest sie DORT.
      DIE RICHTIGSTELLUNG ZUM ABLAUFENDEN ZUGANGSDATUM STEHT NICHT MEHR HIER: sie ist
      am 2026-08-19 nach "## Offene Punkte" gezogen, Eintrag "EIN OAUTH-ZUGANG PASST
      NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE" — mit der Vorfrage
      (zwei- oder dreibeiniger OAuth-Fluss), dem zweiten Beschaffungsweg und der
      Abwesenheits-Beobachtung ohne Positivkontrolle.
      VOR DER VORFRAGE STAND HIER DAS WORT „OFFENEN"; ES IST AM 2026-08-20 GESTRICHEN,
      weil sie im Ziel-Eintrag seit diesem Tag BEANTWORTET ist (GELESEN, nicht gemessen).
      DIE BEIDEN ANDEREN ANGABEN DIESES SATZES SIND UNBERÜHRT und stehen im Ziel-Eintrag
      wörtlich unverändert — der zweite Beschaffungsweg und die Abwesenheits-Beobachtung
      ohne Positivkontrolle. DAS GEHÖRT DAZU, weil nach einer Teilkorrektur an einem Satz
      mit mehreren Angaben sonst niemand den Rest nachliest. DIESER ZEIGER STEHT HIER
      AUSDRÜCKLICH FÜR 11.2: dessen Satz "Richtigstellung an jener Zeile" meint
      DIESE Zeile und findet den Inhalt sonst nirgends.
- [ ] Phase 11.2 — Google: EINE KONZEPT-RUNDE, KEINE SCHEIBE. Es sind ZWEI Ziele,
      nicht eins, und keines zugeschnitten: Google Ads Conversions und GA4 sind
      verschiedene Produkte mit verschiedenen Schnittstellen und Semantiken. Der
      bisherige Weg für Offline-Conversions ist für NEUE Zugänge seit Mitte Juni
      2026 geschlossen; der Nachfolger ist für den relevanten Fall allowlist-only
      und verlangt einen OAuth-Fluss mit Verifizierung — also eine
      AUTORISIERUNGSSCHICHT, keinen Tabelleneintrag. Der GA4-Weg verlangt eine
      Besucher-Kennung aus einem Cookie, das dieses Produkt nicht setzt, und
      liefert ohnehin keine Ads-Conversion; er berührt damit zusätzlich die
      DATENKLASSEN-GRENZE (s. "## Offene Punkte").
      SCHEMA-RISIKO (benannt 2026-08-03): mehrwertige Anmeldungen passen nicht auf
      ein Geheimnis pro Zeile; im Ernstfall eine ZWEITE Migration auf der
      Geheimnis-Tabelle.
      ERGÄNZT 2026-08-14 — der Text darüber ist NICHT umformuliert, nur erweitert:
      DIESES SCHEMA-RISIKO GILT SEIT DEM 2026-08-14 AUCH FÜR 11.1. Dort ist das
      Zugangsdatum als ABLAUFEND erkannt worden (Richtigstellung an jener Zeile),
      und ein OAuth-Zugang braucht Token, Erneuerungs-Token und Ablaufzeitpunkt
      NEBENEINANDER. FOLGE: Die AUTORISIERUNGSSCHICHT ist BEIDEN Zeilen gemeinsames
      Fundament und gehört keiner von beiden allein — wer sie für eine der beiden
      allein zuschneidet, baut sie überangepasst und ein zweites Mal.
      ZEIGER 2026-08-20 — DIE ANGABE "Dort ist das Zugangsdatum als ABLAUFEND erkannt
      worden" IST NUR NOCH TEILWEISE GÜLTIG. Die Richtigstellung steht im Offenen Punkt
      "EIN OAUTH-ZUGANG PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE", Block
      "RICHTIGGESTELLT AM 2026-08-20 (zweite Runde)", Punkt (3). SIE WIRD HIER NICHT
      WIEDERHOLT — zwei Fassungen liefen auseinander. Der Satz darüber bleibt unverändert.
      PROVENIENZ: GELESEN an FREMDER Anbieter-Doku (2026-08-11) — NICHT gemessen,
      NICHT live bestätigt; der Live-Beweis des dritten Ziels wertet sie NICHT auf.
      DIE ZWEI AUFLAGEN AUS 11.1 GELTEN HIER WÖRTLICH MIT.
      RICHTIGGESTELLT AM 2026-08-20 — NICHT GESTEMPELT, und der Grund ist der Rang dieser
      Zeile: Sie ist der MASSSTAB, an dem der nächste Zuschnitt misst, und ein Maßstab mit
      überholten Angaben taugt nicht als Maßstab. DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN
      und wird NICHT gekürzt; dieser Block tritt DANEBEN und nennt, was überholt ist.
      ZWEI ANGABEN, JE EINZELN:
      · ZU GROB: "der Nachfolger ist für den relevanten Fall allowlist-only und verlangt
        einen OAuth-Fluss mit Verifizierung". Beides trifft zu, aber an VERSCHIEDENEN
        Achsen — die FREISCHALTUNG hängt an der GESTALT (nur an einer von zweien), die
        VERIFIZIERUNG am NUTZER-KONTO-Weg. Wer den Satz als EINE Bedingung liest, hält
        einen Weg für versperrt, der offensteht, oder eine Hürde für erledigt, die bleibt.
      · RICHTIG, ABER OHNE GRUND: "Es sind ZWEI Ziele, nicht eins". Die Aussage BLEIBT und
        wird nicht angetastet; ihr Grund ist jetzt benannt — es sind zwei ADAPTER mit
        VERSCHIEDENEN ZUGANGSMODELLEN, nicht zwei Varianten eines. Der eine braucht die
        Autorisierungsschicht, der andere kommt mit zwei Skalaren aus.
      DIE EINZELBEFUNDE STEHEN HIER NICHT, sondern in docs/ziel-befunde.md, Abschnitt
      "Google (Google Ads Conversions · GA4)", Teile (a) bis (f). Sie werden hier
      AUSDRÜCKLICH NICHT wiederholt — zweimal geschrieben laufen sie auseinander, und dann
      ist nicht mehr entscheidbar, welche Fassung gilt.
      PROVENIENZ DIESER RICHTIGSTELLUNG: GELESEN an Anbieter-Doku und Fachpresse
      (2026-08-20). KEINE Messung — es ist KEIN Aufruf gegen eine Google-Schnittstelle
      gefahren worden.
      ENTSCHIEDEN AM 2026-08-24 (OWNER) — DIE GESTALT FÜR GOOGLE ADS IST DER OFFLINE
      CONVERSION IMPORT AUF BASIS DER KLICK-KENNUNGEN (gclid, gbraid, wbraid). Die
      Conversion-Action im Kundenkonto ist vom Typ UPLOAD_CLICKS.
      NICHT GEWÄHLT IST DIE ZUSÄTZLICHE DATENQUELLE ZUR TAG-CONVERSION (Multi-Source).
      AUSDRÜCKLICH AUSGESCHLOSSEN IST AUCH "ENHANCED CONVERSIONS FOR LEADS", und der Satz
      gehört hierher, weil der Anbieter beide auf DERSELBEN Seite und über DENSELBEN Weg
      führt: Sie ist der PII-ZWEIG und bleibt ausgeschlossen, solange die
      DATENKLASSEN-GRENZE steht (s. "## Offene Punkte" in CLAUDE.md). Wer den
      Offline-Import wählt und die Nachbar-Zeile mitnimmt, hat die Grenze überschritten,
      ohne eine Entscheidung dazu getroffen zu haben.
      KEINE GEHASHTEN NUTZERDATEN. KEIN VON PAGESMITH AUSGELIEFERTES GOOGLE-TAG.
      PROVENIENZ: OWNER-ENTSCHEIDUNG (2026-08-24). KEINE Messung, KEINE Ableitung — eine
      FESTLEGUNG.
      BEGRÜNDUNG, ZWEI GRÜNDE: (1) Multi-Source verlangt transactionId als PFLICHT und
      setzt voraus, dass ein Google-Tag im Browser denselben Wert gesetzt hat (GELESEN
      2026-08-24, /reference/rest/v1/events/ingest) — Pagesmith liefert kein Google-Tag
      aus. (2) Der Offline-Weg trägt als EINZIGE der vier Google-Zeilen KEINEN
      Allowlist-Vorbehalt (GELESEN 2026-08-24, /devguides/events).
      DER VORBEHALT, UND ES IST NUR NOCH EINER: Im Kundenkonto muss eine
      Conversion-Action vom Typ UPLOAD_CLICKS EXISTIEREN. Ohne sie gibt es keine
      productDestinationId, an die geliefert werden könnte. Der Vorbehalt ist damit nicht
      verschwunden, sondern hat den TYP gewechselt — vorausgesetzt wird nicht mehr eine
      WEBPAGE-Action aus einem Browser-Tag, sondern eine UPLOAD_CLICKS-Action.
      EINE EIGENSCHAFT DER GESTALT, DIE KEIN FEHLER IST UND DIE MITMUSS: KEINE
      KLICK-KENNUNG, KEINE CONVERSION. Organischer Traffic, Direktaufrufe und Traffic
      anderer Kanäle erzeugen bei diesem Ziel NICHTS. Wer die Zahlen später gegen die
      eigene Auswertung hält, findet eine Lücke und sucht einen Defekt, den es nicht gibt.
      ZWEI RANG-WECHSEL GEGENÜBER DER NICHT GEWÄHLTEN GESTALT, und sie sind die
      häufigste Verwechslung beim Zuschnitt: eventSource ist hier PFLICHT (bei
      Multi-Source optional), transactionId dagegen OPTIONAL (dort Pflicht). Wer den
      einen Zuschnitt aus dem anderen ableitet, erbt genau die falsche Hälfte.
      DIE TAG-ACHSE IST DAMIT WEITGEHEND ERLEDIGT, UND ES BLEIBT GENAU EINE FRAGE ÜBRIG.
      Die frühere Abgrenzung "fragt dieser Absatz, OB ÜBERHAUPT EIN TAG EXISTIERT?" ist
      GEGENSTANDSLOS: Der Vorbehalt fragt nach einer UPLOAD_CLICKS-ACTION im Kundenkonto,
      nicht nach einem Tag. Und die Frage, ob PAGESMITH ein eigenes Google-Tag ausliefern
      müsste, ist BEANTWORTET — nein, mit der Entscheidung oben ausdrücklich
      ausgeschlossen.
      WAS OFFEN BLEIBT, ALS EINZIGES DIESER ACHSE: ob ein KUNDE auf einer von Pagesmith
      ausgelieferten Seite ein eigenes Google-Tag unterbringen kann. Das betrifft die
      KUNDENSEITE, nicht Pagesmith — und es ist eine andere Frage als die beantwortete.
      KEINE EMPFEHLUNG. Als offener Punkt geführt in docs/ziel-befunde.md, Abschnitt
      "Google (Google Ads Conversions · GA4)".
      DER BLOCK DARUNTER STEHT WÖRTLICH DA UND IST NICHT MEHR IN SEINER PRÄMISSE GEDECKT —
      DIESER VERMERK IST EIN ZEIGER AUF EINE AUSSTEHENDE ENTSCHEIDUNG, KEINE
      RICHTIGSTELLUNG. Er beschreibt die MULTI-SOURCE-Gestalt ("ENTSPRECHUNG ZUM
      META-MODELL"), und die ist seit dem 2026-08-24 nicht gewählt; der Offline-Weg
      braucht kein Tag, womit die dort gestellte Frage nach dem Eigentümer der
      "bestehenden Tag-Conversion" keinen Gegenstand mehr hat.
      ER BLEIBT TROTZDEM STEHEN, und der Grund gehört dazu: Er ist der EINZIGE Ort im
      Repo, an dem die Berührung zwischen dieser Zeile und der Ausschluss-Zusage in
      Eintrag 11.5 überhaupt festgehalten ist. OB JENE ZUSAGE JETZT UNBERÜHRT IST, IST
      EINE ENTSCHEIDUNG ÜBER 11.5 UND WIRD HIER NICHT GETROFFEN. Wer den Block streicht,
      trifft sie stillschweigend.
      WAS HIER NICHT ENTSCHIEDEN IST, und der Satz muss mit, weil die Berührung sonst
      unbemerkt bleibt: Die gewählte Gestalt ist beim Anbieter die ENTSPRECHUNG ZUM
      META-MODELL, und die Roadmap-Zeile 11.5 nimmt den "Hybrid-Schalter je Kanal"
      ausdrücklich aus ("die Architektur bleibt für den Launch unverändert — EIN Ziel als
      Hybrid aus Browser-Tag und Server-Forward, die übrigen als reiner Server-Fan-Out").
      OB BEIDES KOLLIDIERT, HÄNGT AN EINER UNBEANTWORTETEN FRAGE: wessen Tag die
      "bestehende Tag-Conversion" ist. Liefert Pagesmith weiterhin rein server-seitig und
      gehört das Tag dem KUNDEN, ist jene Zusage unberührt; müsste Pagesmith selbst ein
      Google-Tag ausliefern, wäre Google ein ZWEITES Hybrid-Ziel und die Zusage berührt.
      DIESE FRAGE IST HIER NICHT ENTSCHIEDEN und wird auch nicht nebenbei entschieden.
      GESTEMPELT AM 2026-08-25 — "EINE KONZEPT-RUNDE, KEINE SCHEIBE" GILT NICHT MEHR
      UNBEDINGT. Der Kopfsatz bleibt Zeichen für Zeichen stehen und wird NICHT gekürzt;
      dieser Block tritt DANEBEN und sagt, was ihn ablöst und was ihn zurückbringt.
      WO DIESER STEMPEL STEHT UND WARUM NICHT WEITER OBEN — der Absatz gehört zwingend
      dazu, sonst hält ihn die nächste Runde für verlegt und schiebt ihn in den
      Richtigstellungs-Block: ER BETRIFFT DIE DRITTE ÜBERHOLTE ANGABE DES KOPFSATZES und
      steht BEWUSST HIER, am Ende des Eintrags, statt bei den zwei anderen.
      DER GRUND IST SACHLICH UND NICHT MECHANISCH: Jener Block oben führt
      SACHKORREKTUREN — eine Angabe war ZU GROB, eine RICHTIG ABER OHNE GRUND. Dieser
      hier ist ein MECHANISMUSWECHSEL: der Satz war RICHTIG, er ist AUSGESETZT, und er
      trägt eine BEDINGUNG SEINER RÜCKKEHR. Die beiden Klassen werden getrennt geführt.
      Sie zusammenzuziehen nähme dem Stempel die Rückkehr-Bedingung — eine Sachkorrektur
      kennt keine — und der Aufzählung oben ihre Geschlossenheit.
      DIE WARNUNG AN DEN LESER, UND SIE IST DER ZWECK DIESES ABSATZES: WER NUR DEN
      RICHTIGSTELLUNGS-BLOCK LIEST, HAT DEN KOPF NICHT VOLLSTÄNDIG GEPRÜFT. Die
      Aufzählung "ZWEI ANGABEN, JE EINZELN:" bleibt über ihren EIGENEN Block wahr; sie
      ist nur nicht mehr die einzige Adresse.
      · ER WAR RICHTIG, SOLANGE DIE MESSUNG FEHLTE. Zum Zeitpunkt seiner Niederschrift
        war nicht bekannt, ob eine Klick-Kennung den eigenen Server überhaupt erreicht.
        Ohne diese Auskunft war jeder Zuschnitt eine Wette, und "keine Scheibe" die
        einzige ehrliche Aussage.
      · VERMERK 1 HAT SIE ERBRACHT, SOWEIT EINE REINE SCHEIBE SIE BRAUCHT. GEMESSEN
        2026-08-24 vom Owner, live an einer veröffentlichten Seite: die Kennung erreicht
        den Server heute schon, ohne Änderung am Emitter, an der Serve-Route oder an
        einer Cookie-Architektur. Der Vermerk steht in docs/aktiver-stand.md; er wird
        hier NICHT wiederholt, zweimal geschrieben liefe er auseinander.
      · DIE BEDINGUNG, UNTER DER DER SATZ WIEDER GILT — und sie ist der eigentliche
        Inhalt dieses Blocks: JEDE SCHEIBE DIESER PHASE, DIE DEN TRANSPORT BERÜHRT,
        FÄLLT ERNEUT UNTER IHN, bis die Restlücke aus Vermerk 1 gemessen ist. Diese
        Restlücke ist ZWEITEILIG und wird nicht als eine gelesen: (1) dass eine ECHTE
        gclid von Google denselben Weg nimmt — nicht geprüft, eine Ableitung und kein
        Messwert; (2) ob die Kennung auf einer Seite mit MEHREREN SCHRITTEN überlebt —
        gemessen ist ein EIN-SEITEN-FALL.
      · WAS DER STEMPEL DAMIT FREIGIBT UND WAS NICHT: Frei ist der Zuschnitt und der
        Bau von Scheiben, die NICHTS senden. Nicht frei ist der Transport. Wer den
        Unterschied einebnet, hat den Stempel als Generalfreigabe gelesen, und das ist
        er ausdrücklich nicht.
      PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25 auf der GEMESSENEN Grundlage von
      Vermerk 1. Der Messwert ist gemessen; die Folge für den Zuschnitt ist eine
      FESTLEGUNG, keine Ableitung.
- [ ] Phase 11.8 — Autorisierungsschicht: die Ablage und die Erneuerung MEHRWERTIGER
      Zugangsdaten.
      ZUR NUMMER UND ZU IHREM PLATZ: Dass eine Phasennummer KEINE Reihenfolge trägt,
      steht bereits an den Einträgen 11.6 und 11.7 und wird hier NICHT ein viertes Mal
      ausformuliert — vier Fassungen derselben Regel liefen auseinander. 11.8 war die
      nächste freie Nummer (Präzedenz: 4.5, 10.5, 11.1 bis 11.7); KEINE bestehende Nummer
      ist verschoben worden. WARUM DER EINTRAG TROTZDEM HIER STEHT und nicht am Ende: Er
      gehört sachlich zu 11.1 und 11.2, und wer die beiden liest, muss ihn sehen.
      WAS SIE IST — GEMEINSAMES FUNDAMENT VON 11.1 UND 11.2, und das ist seit dem
      2026-08-20 eine ENTSCHEIDUNG und keine Folgerung mehr: Wer sie für eine der beiden
      Zeilen allein zuschneidet, baut sie überangepasst und ein zweites Mal.
      PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-20, geführt am Offenen Punkt "EIN
      OAUTH-ZUGANG PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE" (s. "## Offene
      Punkte"). Sie ruht auf der VIELMANDANTEN-Begründung.
      DAS SCHEMA-RISIKO, MIT DEM GEMESSENEN STAND — GEMESSEN am Migrations-SQL (CC,
      2026-08-25): 0021_project_secrets.sql legt die Tabelle an mit `target text not null`
      und `secret text not null` — also JE EINEM SKALAR —, dazu `primary key (project_id,
      target)` und `check (target in ('meta'))`. Die drei Folgemigrationen berühren
      AUSSCHLIESSLICH diesen CHECK: 0022 auf ('meta','pinterest'), 0023 zusätzlich
      'tiktok', 0024 zusätzlich 'linkedin'. KEINE MIGRATION HAT JE EINE ZWEITE
      GEHEIMNIS-SPALTE ANGELEGT. Ein OAuth-Zugang braucht Token, Erneuerungs-Token und
      Ablaufzeitpunkt NEBENEINANDER — das passt heute nicht hinein.
      DER ZWEIG IST OFFEN, DER UMFANG AUCH. Erzeugen die Kunden ihr Zugangsdatum selbst
      oder tut der Betreiber es für sie — unbeantwortet. DER VOLLTEXT STEHT NICHT HIER,
      sondern am genannten Offenen Punkt; zwei Fassungen liefen auseinander.
      DIE AUFLAGE, DIE EINEN SPÄTEREN NEUBAU VERHINDERT — SIE IST DIE TRAGENDE AUSSAGE
      DIESES EINTRAGS: DIE ABLAGE DARF NICHT ANNEHMEN, DASS EIN ZUGANGSDATUM IMMER EINEM
      PROJEKT GEHÖRT. Solange ADVERTISER gegen DATA PARTNER offen ist, ist das KEINE
      Vorsorge gegen einen unwahrscheinlichen Fall, sondern die EINZIG ZULÄSSIGE BAUFORM
      — beide Modelle sind möglich. Im ADVERTISER-Modus gehört ein Zugangsdatum einem
      Kundenkonto; im DATA-PARTNER-Modus gehört EIN EINZIGER SATZ Anmeldedaten dem
      BETREIBER und gilt für ALLE Kunden.
      DAS IST EINE EBENE UNTER DEM SCHEMA-RISIKO UND WIRD DORT NICHT GENANNT: Jenes fragt,
      wie VIELE Werte eine Zeile trägt. Diese Auflage fragt, WEM die Zeile gehört. Wer nur
      das Schema-Risiko löst, baut eine mehrspaltige Ablage je (Projekt, Ziel) — und die
      ist im Data-Partner-Modus vom ersten Tag an falsch.
      ZWEI BLOCKER STEHEN VOR EINEM ZUSCHNITT, je mit ihrem Ort und ohne Volltext:
      · DER TRÄGER DES ZUGANGSDATUMS BEI GOOGLE — in welcher Kopfzeile und mit welchem
        Präfix das Token reist, steht auf 33 gelesenen Seiten NICHT. Er muss ausserhalb
        dieses Doku-Baums gesucht oder gemessen werden. Fundstelle: docs/ziel-befunde.md,
        Google-Abschnitt, Teil (u)/Frage 2 und Teil (z).
      · DIE ABLAUF-ÜBERWACHUNG BEI LINKEDIN IST STRUKTURELL NICHT MÖGLICH für
        Zugangsdaten aus dem zweiten Beschaffungsweg — das eigene Werkzeug liest sie nicht
        aus. Das ist keine fehlende Arbeit, sondern eine fehlende Handhabe. Fundstelle:
        der Offene Punkt oben, Richtigstellung vom 2026-08-20.
      WAS HIER NICHT ENTSCHIEDEN IST: ob und wann die Schicht gebaut wird, welches
      Zugangsmodell gilt und welcher Zweig gilt. KEINE EMPFEHLUNG.

      **NACHTRAG 2026-08-25 — WAS ZWEI DOKU-LÄUFE AN DIESEM EINTRAG ÄNDERN.** Der Text
      darüber bleibt Zeichen für Zeichen stehen; dieser Block tritt DANEBEN. Er trägt NUR,
      was einen Zuschnitt bindet — die Befunde selbst stehen in docs/ziel-befunde.md,
      Abschnitt "Google (Google Ads Conversions · GA4)", Teile (aa) bis (as), und werden
      hier NICHT verdoppelt.
      HERKUNFT ALLER FÜNF PUNKTE: GELESEN am 2026-08-25 an der Anbieter-Doku (LAUF 3, 31
      Seiten OAuth- und Ads-Politik; LAUF 4, 13 Seiten Data-Manager-Politik). **KEINE
      MESSUNG** — es ist kein Aufruf gegen eine Google-Schnittstelle gefahren worden.

      · **DIE POLITIK DER GOOGLE ADS API IST NACH DEM GELESENEN TEXT NICHT ÜBERTRAGBAR.**
        Kein Entwickler-Token, keine Zugriffsstufen (Test/Explorer/Basic/Standard), keine
        Required Minimum Functionality, kein Demo-Zugang für eine Werkzeug-Prüfung. Die
        Data-Manager-Doku verweist viermal nach google-ads — dreimal operativ
        (Kontozugang, Feldwert, Migration) und einmal, um sich AUSDRÜCKLICH ABZUGRENZEN
        ("The fast-fail model differs from the partial failure model in some other Google
        APIs, such as the Google Ads API"). Fundstelle: Teil (ak), dazu (al) und (an).
        **DIE GRENZE, UND SIE IST TRAGEND: Das ist eine Aussage über die DOKU, keine über
        das Verhalten des Endpunkts.** Ein Schweigen ist keine Verneinung.

      · **DER ADVERTISER-WEG TRÄGT KUNDENEIGENES OAUTH.** Der Vorgang heisst beim Anbieter
        "multi-user authentication" (Teil (ab)), und der Bereich
        https://www.googleapis.com/auth/datamanager steht auf Googles nutzergewährbarer
        Scope-Liste (Teil (ac)).
        **DIE NAHT MUSS MITGELESEN WERDEN, sonst wird der Punkt überdehnt:** Der NAME und
        die Szenario-Tabelle stammen aus der GOOGLE-ADS-Doku und gelten dort dem
        adwords-Bereich; die Data-Manager-Doku benutzt den Ausdruck NIRGENDS (Nicht-Treffer
        über 13 Seiten). **DER SCHLUSS RUHT AUF DEM SCOPE, DIE BENENNUNG IST GELIEHEN.**
        FOLGE FÜR DIE PLANUNG: Ein Data-Partner-Status ist für kundeneigenes OAuth nach dem
        gelesenen Text NICHT nötig. Die VIELMANDANTEN-Begründung der Owner-Entscheidung vom
        2026-08-20 (s. oben und der Offene Punkt "EIN OAUTH-ZUGANG PASST NICHT IN DIE
        SKALAR-SPALTE DER GEHEIMNIS-TABELLE") trifft diesen Weg NICHT: Sie richtet sich
        gegen ein zentrales Dienstkonto, das in die Nutzerlisten der Kunden eingetragen
        wird — im Advertiser-Weg mit kundeneigenem OAuth steht unsere Identität dort NICHT.
        WAS DIE BEGRÜNDUNG DABEI GEWINNT statt zu verlieren: Ihr Satz "Ein legitimes
        Drittanbieter-Werkzeug tritt über einen NUTZER-FLUSS auf" war eine EINSCHÄTZUNG;
        der Anbieter benennt diesen Fluss jetzt nachweislich und empfiehlt ihn für genau
        diesen Fall. Und die Grenze "20 Google Ads accounts … with a single email address"
        (Teil (ae)) stützt die Sorge "bei hunderten Konten" mit einer Anbieter-Zahl.
        **DIE ENTSCHEIDUNG ZWISCHEN ADVERTISER UND DATA PARTNER WIRD HIER NICHT GETROFFEN;
        sie bleibt offen, wo sie geführt ist.**

      · **DIE KONTINGENT-DECKE IST EINE ARCHITEKTUR-GRENZE — UND SIE IST DIE TRAGENDE
        NEUIGKEIT DIESES BLOCKS.** GELESEN, Teil (ao): 100.000 Anfragen je Tag und 300 je
        Minute für den IngestionService, **JE GOOGLE-CLOUD-PROJEKT**. NICHT je Kunde und
        NICHT je Werbekonto. Überschreitung: RESOURCE_EXHAUSTED und HTTP 429.
        **WARUM DAS STRUKTURELL ANDERS IST ALS BEI DEN VIER GEBAUTEN ZIELEN:** Dort gehört
        das Zugangsdatum dem Kunden, und jeder Kunde bringt sein eigenes Kontingent mit. Bei
        Google teilen sich ALLE Kunden UNSERE Decke.
        **DIE KOLLISION MIT DEM HEUTIGEN PFAD:** Der Ingest schickt eine Anfrage je
        Conversion, sofort, ohne Puffer. Der Anbieter dagegen empfiehlt zu bündeln, und die
        Anfrage-Grenze liegt bei 2.000 Ereignissen. **DIESE ZWEI ANGABEN STEHEN AUF ZWEI
        SEITEN und ergeben zusammen kein Anbieter-Zitat:** Die Empfehlung
        (/devguides/concepts/best-practices) nennt KEINE Zahl und sagt "up to the
        per-request limits"; die Zahl steht auf /devguides/limits. Wer den Google-Transport
        wie Meta baut, baut die Decke ein, ohne sie zu sehen.
        **AUSDRÜCKLICH KEIN BAUAUFTRAG:** Eine Warteschlange wäre ein ZWEITER
        Async-Anwendungsfall, und dessen Trigger steht in CLAUDE.md, Abschnitt "B)
        Skalierungs-Leitplanken für SPÄTER". Hier wird die Grenze BENANNT, nicht
        beantwortet.

      · **ALS KANDIDAT, AUSDRÜCKLICH NICHT ENTSCHIEDEN (ARCHITEKT, 2026-08-25): den
        adwords-Bereich NICHT anfordern.** GRUND: Von Google Ads brauchen wir eine einzige
        Angabe, die productDestinationId — und die Doku nennt die Oberfläche als
        gleichwertigen Weg ("Retrieve this ID using the Google Ads UI or the Google Ads
        API", Teil (ak), Verweis 2). Bleibt der Bereich draussen, ist die offene Frage
        gegenstandslos, ob die Ads-Politik an einem geteilten Cloud-Projekt hängt (Teil
        (as), Punkt 4). **KEINE EMPFEHLUNG ZUR ENTSCHEIDUNG — der Owner entscheidet.**

      · **WAS OFFEN BLEIBT:** der Träger des Zugangsdatums für events:ingest (das gefundene
        Beispiel gilt der Schwester-Methode) · ob x-goog-user-project Pflicht ist · 2.000
        gegen 10.000 · das Zugangsmodell.

      **VORBEHALT 2026-08-25 AN DEN ERSTEN DER "ZWEI BLOCKER" OBEN — DER TRÄGER DES
      ZUGANGSDATUMS.** Der Wortlaut jenes Punktes bleibt unverändert stehen; hier steht, was
      an ihm heute noch trägt und was nicht.
      · **WAHR BLEIBT:** "steht auf 33 gelesenen Seiten NICHT". Die Seite, die ihn trägt,
        war nicht unter den 33.
      · **ÜBERHOLT IST:** "Er muss ausserhalb dieses Doku-Baums gesucht oder gemessen
        werden." Er lag INNERHALB des Baums — auf
        /data-manager/api/devguides/quickstart/install-library (Doku-Stand 2026-08-14), im
        REST-Beispiel: `--header "Authorization: Bearer ${DATA_MANAGER_ACCESS_TOKEN}"`.
        Fundstelle: docs/ziel-befunde.md, Google-Abschnitt, Teil (al).
      · **DER GRUND, WARUM ER NICHT GEFUNDEN WURDE, IST DER EIGENTLICHE ERTRAG:** Die Seite
        stand in BEIDEN Vorläufen unter "GESEHEN, NICHT GEÖFFNET". **Sie war nicht
        übersehen, sie war AUSGESCHLOSSEN worden** — mit einem Grund, der zum damaligen
        Zuschnitt passte.
      · **DIE GRENZE, DIE BLEIBT:** Das Beispiel gilt audienceMembers:ingest. Für
        events:ingest liegt weiterhin KEIN Kopfzeilen-Beispiel vor, und **gemessen ist
        nichts.** Der Blocker ist damit KLEINER geworden und NICHT erledigt.

      **ENTSCHIEDEN AM 2026-08-25 (OWNER) — DAS ZUGANGSMODELL, UND WAS DAS FÜR DIE AUFLAGE
      DIESES EINTRAGS BEDEUTET.** Der Text darüber bleibt Zeichen für Zeichen stehen; dieser
      Block tritt DANEBEN.
      **DIE ENTSCHEIDUNG: ADVERTISER MIT KUNDENEIGENEM OAUTH.** Jeder Kunde autorisiert die
      Pagesmith-Anwendung für sein eigenes Werbekonto; je Kunde ein eigenes, langlebiges
      Zugangsdatum. Unsere Identität steht NICHT in der Nutzerliste des Kunden.
      **DATA PARTNER IST NICHT GEWÄHLT UND NICHT AUSGESCHLOSSEN.** Die Owner-Begründung,
      wörtlich zu vermerken: Pagesmith ist keine Agentur und verwaltet keine Konten; die
      Kunden führen ihre Werbung selbst, wir liefern Anbindung und Auswertung.
      **DER GEGENEINWAND GEHÖRT DANEBEN, WEIL ER DIE BEGRÜNDUNG BEGRENZT** (ARCHITEKT,
      2026-08-25): Die Doku definiert die Partner-Rolle als "a third-party app analytics
      provider or data partner", der "conversions" hochlädt — das beschreibt KEINE Agentur,
      sondern eine DATENLEITUNG. Der reale Unterschied zwischen den Modellen ist nicht der
      STATUS, sondern die GEHEIMNIS-VERWAHRUNG: Advertiser verlangt ein langlebiges
      Zugangsdatum JE KUNDE; beim Partner-Weg sind die Kundendaten "short-lived" und nach
      dem Anlegen des Links verwerfbar. WAS SICH NICHT UNTERSCHEIDET: die Kontingent-Decke —
      sie hängt am Cloud-Projekt, in BEIDEN Modellen.
      **DIE AUFLAGE OBEN BLEIBT WÖRTLICH STEHEN, IHR RANG ÄNDERT SICH.** Gemeint ist "DIE
      ABLAGE DARF NICHT ANNEHMEN, DASS EIN ZUGANGSDATUM IMMER EINEM PROJEKT GEHÖRT".
      · BISHER: "die EINZIG ZULÄSSIGE BAUFORM, weil beide Modelle möglich sind".
      · AB JETZT: eine benannte, BILLIGE ABSICHERUNG. Advertiser ist gewählt; die
        Eigentums-Achse bleibt trotzdem offen, weil sie heute fast nichts kostet und
        später teuer ist.
      · **IHRE BEDINGUNG DES ENTFALLENS, UND SIE IST PRÜFBAR: SIE ENTFÄLLT MIT EINER
        ENTSCHEIDUNG, NICHT VON SELBST.** Fällig ist diese Entscheidung, BEVOR der erste
        FREMDE Kunde ein Zugangsdatum ablegt — danach kostet ein Wechsel der Achse eine
        Migration auf ECHTEN GEHEIMNISSEN.
      **DIE FOLGE FÜR LINKEDIN:** Mit dem Zweig "KUNDEN MIT EIGENEN KONTEN" ist eine
      Kalendererinnerung je Kunde unzumutbar — LinkedIn trägt die Schicht MIT. Sie bleibt
      gemeinsames Fundament von 11.1 und 11.2, aber aus einem ANDEREN Grund als am
      2026-08-20: nicht mehr aus der VIELMANDANTEN-Begründung, sondern aus dieser
      Unzumutbarkeit. Volltext am Offenen Punkt "EIN OAUTH-ZUGANG PASST NICHT IN DIE
      SKALAR-SPALTE DER GEHEIMNIS-TABELLE", Block vom 2026-08-25; hier NICHT verdoppelt.
      **DIESER BLOCK LÖST EINEN PUNKT DES NACHTRAGS VOM 2026-08-25 AB, und das wird
      ausdrücklich gesagt, statt zwei Stellen widersprechen zu lassen:** Jener Nachtrag
      nennt unter "WAS OFFEN BLEIBT" vier Dinge, darunter "das Zugangsmodell". DIESER PUNKT
      IST ERLEDIGT. Die drei übrigen — der Träger des Zugangsdatums für events:ingest, ob
      x-goog-user-project Pflicht ist, 2.000 gegen 10.000 — bleiben offen. Der Satz jenes
      Nachtrags "DIE ENTSCHEIDUNG ZWISCHEN ADVERTISER UND DATA PARTNER WIRD HIER NICHT
      GETROFFEN" bleibt als Zeitdokument stehen und ist weiterhin wahr: getroffen ist sie
      nicht DORT, sondern vom Owner.
      **DER VERIFIZIERUNGS-BEFUND, UND ER VERSCHÄRFT DEN ZWEITEN BLOCKER, STATT IHN ZU
      ENTSCHÄRFEN:** Für den heutigen Eigenbetrieb ist keine Verifizierung nötig — aber die
      Freistellung ruht auf einer BENANNTEN Ausnahme, zieht eine unbezifferte
      NUTZER-OBERGRENZE nach sich, und IM TESTING-ZUSTAND LEBT EIN ERNEUERUNGS-TOKEN SIEBEN
      TAGE (GELESEN 2026-08-25, docs/ziel-befunde.md, Google-Abschnitt, Teil (af)). **DER
      BAU FINDET DAMIT UNTER KÜRZEREN FRISTEN STATT ALS DER SPÄTERE BETRIEB.**
      DAS GEHÖRT IN JEDE LIVE-TEST-ANLEITUNG DIESER PHASE, als PFLICHT-HINWEIS und nicht als
      Fussnote: Sonst wird ein nach sieben Tagen abgelaufenes Zugangsdatum als DEFEKT
      gejagt, und die Suche beginnt am falschen Ende. Der Blocker "DIE ABLAUF-ÜBERWACHUNG
      BEI LINKEDIN IST STRUKTURELL NICHT MÖGLICH" oben wird davon NICHT kleiner.
      PROVENIENZ: Das Zugangsmodell und die Data-Partner-Vertagung sind OWNER-ENTSCHEIDUNG
      2026-08-25; der Gegeneinwand ist eine ARCHITEKTEN-EINORDNUNG (2026-08-25); die
      Doku-Angaben sind GELESEN 2026-08-25 (docs/ziel-befunde.md, Google-Abschnitt, Teile
      (ab), (ac), (af) und (an)). **KEINE MESSUNG** — es ist kein Aufruf gegen eine
      Google-Schnittstelle gefahren worden.

      **ENTSCHIEDEN AM 2026-08-25 (OWNER) — DREI ENTSCHEIDUNGEN ZUM GEHEIMNIS-SPEICHER.**
      Der Text darüber bleibt Zeichen für Zeichen stehen; dieser Block tritt DANEBEN. Er
      trägt die Entscheidungen und ihre Begründung — die Anbieter-Befunde selbst stehen in
      docs/plattform-befunde.md, Abschnitt "Supabase (Postgres · Auth · RLS · Vault ·
      Backups)", und werden hier NICHT verdoppelt, sondern über ihre Teil-Marken benannt.

      **(1) VERSCHLÜSSELT WIRD IM ANWENDUNGSCODE, NICHT MIT SUPABASE VAULT.** Das Chiffrat
      steht in der Spalte, der Schlüssel liegt in der Vercel-Umgebung — also AUSSERHALB der
      Datenbank.
      **DER TRAGENDE GRUND IST EINE ANGRIFFSFLÄCHE, NICHT DER AUFWAND**, und ohne diesen
      Satz liest die nächste Runde die Entscheidung als Bequemlichkeit: Ob Vault über den
      JS-Client erreichbar ist, ist UNDOKUMENTIERT (Teil (k) — Nicht-Treffer mit benannter
      Reichweite, nicht etwa eine Verneinung). Fiele die Messung negativ aus, bliebe als
      Weg eine security-definer-RPC in public, die aus vault.decrypted_secrets liest — eine
      Funktion, die per Bauart die RLS umgeht, Geheimnisse zurückgibt und über die Daten-API
      erreichbar ist. **HEUTE IST DIE GEHEIMNIS-TABELLE FÜR anon SCHLICHT NICHT
      ERREICHBAR** (RLS aktiv, KEINE Policy — s. docs/db-stand.md). Wir würden die am
      stärksten geschützte Stelle des Systems mit einem Weg versehen, den es vorher nicht
      gab, um sie besser zu schützen.
      **DREI WEITERE PREISE, alle in docs/plattform-befunde.md belegt:** der
      Restore-Sprengsatz beim manuellen Dump (Teile (t) und (u)) — und zwar genau an dem
      OPS-WEG, den die eigene Backup-Regel für das Fenster zwischen Migration und Snapshot
      vorschreibt · ein Status, den die Doku NICHT nennt, während das Anbieter-Repo "Beta"
      sagt (Teil (j)) · ein Textwert je Zeile (Teil (w)), also Serialisierung ohnehin.
      **DIE GRENZE, UND SIE IST ECHT UND WIRD NICHT KLEINGEREDET:** Der Schlüssel liegt bei
      uns. Geht er verloren, sind ALLE Kundenzugänge unlesbar und jeder Kunde muss neu
      autorisieren. Das ist wiederherstellbar, aber teuer — bei Vault trüge der Anbieter
      diese Last. Der offene Punkt dazu heisst "DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST
      UNGEREGELT" (s. "## Offene Punkte").
      **WAS DIE ENTSCHEIDUNG NICHT LÖST:** Der Klartext existiert im Node-Prozess, solange
      das Ereignis weitergereicht wird. Das ist unvermeidlich — das Ziel braucht den Token.
      Kein Verfahren dieser Klasse ändert daran etwas, und wer das erwartet, misst die
      Entscheidung an einem Versprechen, das sie nie gegeben hat.

      **(2) DER BESTEHENDE GEHEIMNIS-SPEICHER WIRD ERWEITERT, NICHT GEFORKT.**
      **DER ERSTE REFLEX WÄRE EINE ZWEITE TABELLE für die "komplexen" Ziele, und er trügt:**
      LinkedIn trägt bereits Erneuerungs-Token und Ablauf — zwölf Monate für das
      Refresh-Token, zwei Monate für das Zugangsdatum (GELESEN, docs/ziel-befunde.md,
      Abschnitt "LinkedIn (Conversions API)", Teil (w)) —, und die Schicht trägt LinkedIn
      seit dem 2026-08-25 ausdrücklich MIT. Es sind also mindestens ZWEI mehrwertige Ziele
      und ein Rest, der nachzieht; die Trennlinie "einfach gegen komplex" verläuft nicht
      dort, wo sie beim ersten Hinsehen zu verlaufen scheint.
      **ZWEI GEHEIMNIS-SPEICHER WÄREN ZWEI UNGEKOPPELTE WAHRHEITEN** über die Frage "wo
      liegt der Zugang für dieses Projekt und dieses Ziel" — dieselbe Fehlerklasse wie die
      domains-Zeile gegen settings.hosting (s. docs/immer-beachten.md, "DIE domains-ZEILE
      IST DIE ALLEINIGE WAHRHEIT").
      **DIE FORM BLEIBT ADDITIV:** eine neue nullable Spalte für die verschlüsselte Nutzlast
      NEBEN dem bestehenden Skalar, dazu ein CHECK, dass GENAU EINES von beiden gesetzt ist.
      Damit ist der Übergangszustand STRUKTURELL SICHTBAR statt stillschweigend, jedes Ziel
      wandert einzeln, und kein Schritt fasst ein laufendes Geheimnis an, das er nicht
      wandern lässt.

      **(3) DIE EIGENTUMS-ACHSE BLEIBT OFFEN — UND KOSTET EINEN KÜNSTLICHEN SCHLÜSSEL.**
      Der heutige Primärschlüssel ist das PAAR (project_id, target), und project_id ist NOT
      NULL; Schlüsselspalten sind es ohnehin. Ein BETREIBERWEITES Zugangsdatum — eines ohne
      Projekt — passt da nicht hindurch.
      **DIE ACHSE OFFENZUHALTEN HEISST DAHER KONKRET:** ein künstlicher Schlüssel, project_id
      nullbar, und ein eindeutiger Index, der BEIDE Fälle abdeckt (je Projekt und Ziel,
      sowie das projektlose Zugangsdatum je Ziel).
      **DAS IST DIE BILLIGE FORM, VON DER DIE AUFLAGE DIESES EINTRAGS SPRICHT** — jene
      Auflage steht oben wörtlich ("DIE ABLAGE DARF NICHT ANNEHMEN, DASS EIN ZUGANGSDATUM
      IMMER EINEM PROJEKT GEHÖRT") und ist am 2026-08-25 von "einzig zulässige Bauform" auf
      "benannte, billige Absicherung" abgestuft worden. Sie fällt mit einer ENTSCHEIDUNG weg,
      nicht von selbst, und die ist fällig, BEVOR der erste FREMDE Kunde ein Zugangsdatum
      ablegt.
      **DER PRIMÄRSCHLÜSSEL IST FÜR DIESE ENTSCHEIDUNG ERNEUT AM MIGRATIONS-SQL GEPRÜFT
      WORDEN (CC, 2026-08-25) und lautet unverändert so, wie der Block "DAS SCHEMA-RISIKO,
      MIT DEM GEMESSENEN STAND" oben ihn führt.** Die Messung wird hier NICHT ein zweites
      Mal ausgeschrieben — zwei Fassungen desselben Messwerts liefen auseinander. Neu ist
      allein die Gegenprobe, dass auch KEINE der drei Folgemigrationen den Schlüssel
      anfasst: 0022, 0023 und 0024 setzen ausschliesslich den target-CHECK neu.

      **PROVENIENZ DIESES BLOCKS, je Teil:** Die drei Entscheidungen sind
      OWNER-ENTSCHEIDUNGEN vom 2026-08-25 auf GELESENER Grundlage. Ihre Begründungen sind
      ARCHITEKTEN-EINORDNUNGEN (2026-08-25). Die Anbieter-Angaben sind GELESEN am
      2026-08-25 und über ihre Teil-Marken in docs/plattform-befunde.md bzw.
      docs/ziel-befunde.md benannt. **GEMESSEN ist in diesem Block GENAU EINE Angabe** — der
      Primärschlüssel am Migrations-SQL. Es ist KEIN Aufruf gegen eine Supabase-Schnittstelle
      gefahren worden und NICHTS an der laufenden Datenbank gemessen.
- [ ] Phase 11.3 — Tracking-Testmodus-Modul (test_event_code): klein und
      eigenständig, damit ein Kunde seine Einrichtung prüfen kann, ohne echte
      Conversions zu erzeugen. Kontext: docs/claude-history/future-roadmap.md,
      "Tracking-Testmodus für Kunden".
      PROVENIENZ: bislang nur als NAME geführt — kein Zuschnitt, keine Recherche,
      keine Entscheidung. Gemessen ist allein, dass der zweite Adapter einen
      Testmodus-Parameter kennt (testModeQuery) und beim ersten der Test-Code in
      die NUTZLAST wandert; für LinkedIn steht ein Nicht-Treffer.
- [ ] Phase 11.4 — Der Testknopf: KEINE SCHEIBE, sondern mehrere einzeln
      beweisbare Teile plus eine UNENTSCHIEDENE VORFRAGE — was beim Druck auf den
      Knopf überhaupt aufgerufen wird. OHNE DEREN ANTWORT HAT KEIN ZUSCHNITT EINEN
      GEGENSTAND. Auflagen und Messbefunde: phase-11-multi-tracking.md, "## Die
      dreizehnte Scheibe". WAS IHM IN WAHRHEIT FEHLT, gemessen: ein Lesepfad, ein
      Rückkanal und eine Maskierung — NICHT die Adapter. Die frühere Bindung "es
      braucht die Adapter, die es hier nicht gibt" ist mit dem zweiten und dritten
      Ziel eingelöst worden, ohne dass der Testknopf näher gerückt wäre.
- [ ] Phase 11.6 — Custom-Pixel: KEINE Wiederholung, sondern eine EIGENE
      ARCHITEKTUR-SCHEIBE — und ihre VORFRAGE ist offen: was es überhaupt ist.
      (a) ein CLIENT-seitiges Snippet — dann gar kein Fan-Out-Ziel, sondern
      derselbe Fall wie das ausgenommene Hotjar. (b) ein SERVER-seitiger
      Empfänger mit KUNDENEIGENEM Endpunkt — dann hängen drei Fragen daran, die
      KEIN anderes Ziel stellt: SSRF-Schutz bei einem betreiber-konfigurierten
      ausgehenden Aufruf, die Aufhebung des Primärschlüssels (project_id, target)
      bei mehreren Endpunkten pro Projekt, und ein dynamisches Nutzlast-Mapping
      ohne bekanntes Zielschema. DER ZUSCHNITT ENTSTEHT ERST NACH DIESER KLÄRUNG.
      Lesart (b) ist der EINZIGE bekannte Konsument der Instanz-Achse und damit
      Trigger (i) der Primärschlüssel-Entscheidung (s. "## Offene Punkte").
      DIE NUMMER TRÄGT KEINE REIHENFOLGE: 11.6 steht hinter 11.5, weil davor nur
      vier Nummern frei waren — nicht, weil dieses Vorhaben später käme.
- [ ] Phase 11.5 — Einwilligungs-Dialog (eigener Dialog UND fremdes CMP):
      NACH Phase 11 und VOR einem Beta-Launch mit fremden Nutzern.
      DIE NUMMER IST GEWÄHLT, WEIL SIE FREI IST (Präzedenz: 4.5, 10.5): die Phase
      gehört zwischen 11 und 12, und KEINE bestehende Nummer wird verschoben.
      GRUND, GEMESSEN am 2026-08-12 (read-only am Code): Pagesmith liefert KEINEN
      Einwilligungs-Dialog — der Hook wird an zwei Stellen GELESEN und nirgends
      GESETZT, er ist fremder Betreiber-Code. Ohne gesetzten Hook gelten ALLE Ziele
      als erlaubt; der Auslieferungs-Zustand einer publizierten Seite ist damit:
      alle konfigurierten Ziele werden beliefert, ohne dass je jemand gefragt wurde.
      FOLGE FÜRS PRODUKT, und sie ist der Grund für die eigene Phase: "konform
      out-of-the-box" trifft heute NICHT zu — die Konformität hängt allein am CMP
      des Betreibers. ENTSCHIEDEN (Owner 2026-08-12): ein eigener Dialog wird
      gebaut, ein fremder bleibt einbindbar.
      IHRE BINDUNGEN — sie sind das, was diese Zeile trägt; das Detail steht in
      der Standdatei, nicht hier:
      · ZWEI PRODUZENTEN, EIN VERTRAG: der eigene Dialog UND ein fremdes CMP
        bedienen DENSELBEN Hook. Er ist produzentenneutral, und der Konsument
        steht seit Phase 11 — er wird nicht angefasst.
      · DER VORHER-ZUSTAND IST DIE EIGENTLICHE ARBEIT. Ein Dialog, der erst NACH
        der Entscheidung setzt, ändert nichts: bis dahin gilt "nicht gesetzt", und
        der erste Seitenaufruf ist durch. Der eigene Dialog setzt VOR jedem Beacon
        einen Wert, der Ablehnung bedeutet, und überschreibt ihn nach der
        Zustimmung.
        DAS KEHRT DIE HEUTIGE VORGABE UM UND NUR FÜR DEN DIALOG-FALL: Die Regel
        für den Fremd-CMP-Fall ("nichts gesetzt" heisst, der Betreiber hat nie
        entschieden) bleibt UNANGETASTET. Die Fail-Closed-Regel ist von beidem
        nicht berührt — sie gilt dem URTEIL, nicht dessen Abwesenheit.
      · DIE ZIEL-SCHLÜSSEL SIND EINE EINBAHNSTRASSE: Der Dialog bezieht sie aus
        DERSELBEN Quelle wie der Erzeuger, NIE aus einer zweiten Liste. Eine
        Divergenz wäre lautlos — ein unbekannter Schlüssel heisst fail-closed
        "nicht erlaubt", ohne dass irgendwo etwas rot wird.
      · DAS RISIKO IST VON ANDERER KLASSE ALS BEI EINEM ADAPTER: Ein fehlerhafter
        Adapter macht EIN Projekt kaputt, ein fehlerhafter Dialog JEDE Kundenseite
        gleichzeitig. Ein Betreiber mit eigenem CMP darf NIE von unserem abhängen.
      · SIE IST EINE PHASE, KEINE SCHEIBE: Granularität, Ablehnen so einfach wie
        Zustimmen, Widerruf, Speicherung der Entscheidung, Darstellung auf fremden
        Seiten, Sprache.
      KEINE BEVORMUNDUNG, ABER EIN HINWEIS (Owner 2026-08-12): Der Betreiber
      entscheidet eigenverantwortlich über seinen Einwilligungs-Dialog. Wir weisen
      hin, wir erzwingen nicht.
      AUSDRÜCKLICH NICHT IN DIESER PHASE (Owner 2026-08-12): Der Hybrid-Schalter je
      Kanal bleibt VISION und wird NICHT vorgezogen; die Architektur bleibt für den
      Launch unverändert — EIN Ziel als Hybrid aus Browser-Tag und Server-Forward,
      die übrigen als reiner Server-Fan-Out.
      Befunde mit ihrem Rang, die vier Owner-Entscheidungen und die Verortung:
      docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, "## 7. Beschlossen
      und verortet — NICHT in dieser Phase gebaut".
- [ ] Phase 11.7 — Anbieter-Befunde nachziehen: die VIER GEBAUTEN ZIELE.
      DIE NUMMER IST DIE NÄCHSTE FREIE (Präzedenz: 4.5, 10.5, 11.1 bis 11.6) und
      trägt KEINE Reihenfolge-Aussage — sie steht hinter 11.5, weil davor nichts
      mehr frei war, nicht weil dieses Vorhaben später käme. KEINE bestehende
      Nummer wird verschoben.
      GEGENSTAND: Für die vier BEREITS GEBAUTEN Ziele sind Fragen des Katalogs
      unbeantwortet, die beim Bau NIE GESTELLT wurden. Sie betreffen LAUFENDE
      Adapter. VIER PUNKTE, EINZELN AUFGEFÜHRT — eine Sammelzeile ist in zwei
      Wochen nicht mehr abarbeitbar:
      · TIKTOK, DEDUPLIZIERUNG (Katalog H2): NIE GESTELLT. Der Adapter sendet eine
        Ereignis-Kennung; was der Anbieter damit tut, steht nirgends. DIE BEIDEN
        NACHBARN ZEIGEN, DASS DIE ANTWORT IN BEIDE RICHTUNGEN AUSFALLEN KANN: Bei
        LinkedIn hat dieselbe Lücke ergeben, dass die Zusage NICHT zutrifft
        (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teil (y));
        bei Pinterest, dass sie ZUTRIFFT (ebenda, Abschnitt "Pinterest (Conversions
        API)", Teil (d)). Für TikTok ist es UNENTSCHIEDEN.
        Matrix: docs/ziel-fragenkatalog.md, "## Die Matrix — Stand 2026-08-20",
        Zeile H2.
      · META, VERSIONSANGABE (Katalog B2): Der Adapter sendet eine Version aus der
        Umgebung mit einem festen Vorgabewert (META_GRAPH_VERSION in
        src/lib/capi/config.ts). OB DER ANBIETER DIESE VERSION NOCH BEDIENT, STEHT
        NIRGENDS. Matrix: docs/ziel-fragenkatalog.md, Zeile B2.
      · RATE-LIMITS (Katalog H3) FÜR META, TIKTOK UND LINKEDIN: NIE GESTELLT bei
        allen dreien. Für Pinterest am 2026-08-20 beantwortet
        (docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (e)).
        NICHT ZU VERWECHSELN mit dem Per-Tenant-Rate-Limiting auf /api/e und
        /api/capi (Phase 14 und Sicherheits-Manifest Tier 1): jenes begrenzt, was
        ZU UNS hereinkommt, dieses betrifft, was der ANBIETER von uns annimmt.
        Zwei entgegengesetzte Richtungen, gleicher Name.
        Matrix: docs/ziel-fragenkatalog.md, Zeile H3.
      · PINTEREST, ERFOLGSRUMPF (Katalog G1): NIE GEMESSEN — und die Auswertung
        hängt daran: evaluateSuccessBody (src/lib/capi/pinterest-forward.ts)
        entscheidet auf dieser Grundlage über Erfolg oder Fehlschlag.
        DAS IST DIE EINZIGE DER VIER, DIE EINE MESSUNG VERLANGT; die übrigen drei
        sind aus der Anbieter-Dokumentation beantwortbar.
        Matrix: docs/ziel-fragenkatalog.md, Zeile G1.
      DIE KLAMMER, UND SIE IST DER GRUND FÜR DIE POSITION DIESER ZEILE
      (OWNER-ENTSCHEIDUNG, 2026-08-20): Das TRACKING WIRD ABGESCHLOSSEN, bevor die
      nächste Phase beginnt. Ein halb geprüftes Tracking mitzunehmen heisst, jeden
      späteren Fehler zwischen zwei Phasen suchen zu müssen.
      AUSGENOMMEN von "abgeschlossen" ist ausdrücklich ALLES, WAS AN DER RECHTSFORM
      HÄNGT — s. "## Modus", Absatz vom 2026-08-20: bauen und mit eigenen Konten
      messen geht ohne, fremde Kundenkonten anbinden nicht. Das ist KEINE offene
      Arbeit, sondern eine REIHENFOLGE.
      WAS DIESE ZEILE NICHT IST: KEIN Defekt-Befund. ALLE VIER ADAPTER SENDEN.
      Und KEINE Empfehlung zur Reihenfolge innerhalb der Zeile.
      PROVENIENZ: die vier Punkte sind GELESEN an der Matrix (Stand 2026-08-20);
      die Klammer ist OWNER-ENTSCHEIDUNG (2026-08-20). KEINE Messung.
- [ ] Phase 12 — Rich-Text / verschachtelte Textknoten: der Editor erkennt
      heute nur reine Textknoten, kein <strong>/<em> innerhalb eines <p>.
      Offene Designfragen seit Phase 5: Umgang mit Kind-Markup, Vorschau- vs.
      Export-Strategie — Klärung im Bau-Slice.
      KONZEPT-KANDIDAT, NICHT garantierter Umfang: Dynamic Text Replacement
      (Überschriften-Austausch per URL-Parameter) berührt dieselbe
      Text-Element-Infrastruktur, löst aber ein ANDERES Problem
      (Parameter-Substitution statt Markup-Erhalt) — im Konzept-Gespräch zu
      Phase 12 prüfen, ob es mitgebaut wird oder eigenständig bleibt, NICHT
      automatisch bündeln.
- [ ] Phase 13 — E-Mail-/ESP-Webhooks: Pagesmith wird KEIN Versender
      (Owner-Entscheidung) — stattdessen Webhooks auf Performance-Events, der
      Kunde behält seinen bestehenden ESP.
- [ ] Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic): Per-Tenant-
      Rate-Limiting auf /api/e + /api/capi, Safe-Browsing-Check der
      Redirect-Ziele, Login-Brute-Force (zuerst Supabase-Auth-Built-in
      prüfen). Security-Manifest-Tier-1 (s. "## Security Manifest & Launch
      Blocker"), kein Produkt-Feature. Bleibt an dieser Stelle: echter
      Ad-Traffic ist noch nicht terminiert, kein Grund zum Vorziehen.
- [ ] Phase 15 — Public-Launch-Restarbeit (Tier 0): E-Mail-Bestätigung
      (Dashboard-Toggle), Abuse-Kanal + security.txt (s. "## Security
      Manifest & Launch Blocker", Tier 0). Subprozessor-/Kunden-DPA ist KEIN
      Bau-Auftrag, sondern ein juristisches Dokument, das Stefan separat
      aufsetzt. Kein Termin — App bleibt im privaten Test-/Beta-Betrieb.
- [ ] Phase 16 — Analytics-Vertiefung (Uniques, Traffic-Health-Metriken):
      braucht als ERSTEN Schritt die Datenklassen-Grenze-Entscheidung (s.
      "## Offene Punkte") — eine gehashte Besucher-Kennung ist
      personenbezogen und löst die 30-Tage-Retentionspflicht aus. Eigenes
      Konzept-Gespräch VOR jedem Bau dieser Phase.
- [ ] Phase 17 — Multi-Page-Funnels (s. future-roadmap.md, "Zukunftsrichtung:
      Funnel-Architektur"): additive pages-Tabelle, funnel_step als neuer
      Aktionstyp im bestehenden, type-diskriminierten Mapping-Modell — kein
      Modellumbau. Setzt Phase 16 voraus.
- [ ] Phase 18 — MCP-Server (verschoben von der ursprünglichen
      Phase-10-Position; umgedrehtes Sicherheitsmodell, Bedrohungsmodell und
      Scope: future-roadmap.md, "Phase 18 — AI-Native: Pagesmith MCP-Server"):
      Eigene Autorisierungsschicht, KEIN angehängter Endpunkt. Bewusst ans Ende
      gestellt.

**Bewusst nicht phasiert (Trigger fehlt):**
- ROI/Attribution (s. future-roadmap.md, "Strategischer Nordstern:
  Performance-CRM & CAPI-Attribution-Engine"): externe Ad-Spend-API noch
  nicht vorhanden.
- Click-ID-Erfassung/Dynamic-Audience-Engine: Datenklassen-Grenze, größere
  Reichweite als Uniques.
- GEO/llms.txt (s. future-roadmap.md, "Strategischer Nordstern: GEO"):
  PRÄZISE fassen — nur die manuelle JSON-LD-Injektion (Säule 1,
  Zwischenschritt 1c) trägt einen EXPLIZITEN Trigger ("wird erst gebaut, wenn
  ein Kunde es fordert"). Die automatische llms.txt-Erzeugung (1a) ist
  grundsätzlich baubar, aber schlicht noch nicht eingeplant — nicht denselben
  harten Trigger unterstellen. KI-Crawler-Erfassung (Säule 3) braucht einen
  eigenen, entkoppelten Schreibpfad auf der Serve-Route, KEINE reine
  Konfigurationsdatei — das bei etwaiger Einplanung nicht unterschätzen.
- Spur B (native JSON-Generierung) / Business-Website-Projekttyp (s.
  future-roadmap.md, "Strategischer Ausblick: Projekttyp 'Business-Website'"):
  eigene zweite Produktspur, deren natürlicher Zeitpunkt bei/nach Phase 18
  (MCP) liegt — dort liegt laut future-roadmap.md ihr
  Flaggschiff-Anwendungsfall.
- Betreiber-Metriken/SaaS-Tarifgrenzen (Rate-Limiting nach Tarif,
  In-App-Upgrade-Meldungen): kein Preismodell heute — kein Termin, reine
  Notiz.
