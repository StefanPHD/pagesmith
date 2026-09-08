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
- [x] Phase 11.2 — Google Ads: EINE KONZEPT-RUNDE, KEINE SCHEIBE. Es sind ZWEI Ziele,
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
      VORBEHALT, DATIERT 2026-09-01 — DER ABSATZ DARÜBER BLEIBT WÖRTLICH STEHEN, SEINE
      ZWEI HÄLFTEN HABEN SEITHER VERSCHIEDENEN RANG. Beide sind an einer Messreihe
      gegen events:ingest geprüft worden (GEMESSEN 2026-09-01, OWNER; Befund und
      Aufrufe in docs/ziel-befunde.md, Teil (ca)):
      · eventSource ist hier PFLICHT — BESTÄTIGT.
      · transactionId dagegen OPTIONAL — WIDERLEGT. Das Feld ist in der Offline-Gestalt
        PFLICHT; ein Aufruf ohne es wird mit REQUIRED_FIELD_MISSING abgewiesen.
      ES IST DAMIT NUR NOCH EIN RANG-WECHSEL STATT ZWEIER.
      DIE WARNUNG DES ABSATZES BLEIBT RICHTIG UND WIRD NICHT GESTRICHEN: Wer den einen
      Zuschnitt aus dem anderen ableitet, erbt weiterhin genau die falsche Hälfte — sie
      trifft jetzt nur noch EINE Achse statt zweier.
      DER BEFUND STEHT HIER NICHT IM VOLLTEXT, sondern an der genannten Fundstelle; die
      Messreihe zweimal zu schreiben liefe auseinander.
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

      NACHTRAG 2026-09-07 AN DEN ZWEI LETZTEN SPIEGELSTRICHEN DES STEMPELS — DER
      WORTLAUT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN. Die Form ist NACHTRAG und
      nicht ABGELAUFEN, wie durchgehend an diesem Eintrag (Entscheidung vom
      2026-08-28): Ein Satz über die Grenzen einer BENANNTEN Messung verliert seinen
      Gegenstand nicht dadurch, dass eine zweite Messung folgt.

      ERSTENS — DIE RÜCKKEHR-BEDINGUNG IST ERFÜLLT. Beide Teile der Restlücke aus
      Vermerk 1 sind GEMESSEN, je an einem eigenen Tag:
      · TEIL (2) — ob die Kennung auf einer Seite mit MEHREREN SCHRITTEN überlebt:
        GEMESSEN 2026-09-01 (OWNER), an der ausgelieferten Anwendung. ERGEBNIS: NEIN,
        die Kennung überlebt die Navigation nicht. Fundstelle: docs/aktiver-stand.md,
        VERMERK 10, Abschnitt (b), Schritt 3 und SCHULD 3; dazu Vorrats-Eintrag 6,
        Vermerk vom 2026-09-01, ebenda.
        EIN GEMESSENES NEIN ERFÜLLT DIE BEDINGUNG: Sie verlangt, dass die Lücke
        GEMESSEN ist, nicht dass sie günstig ausfällt. Ohne diesen Satz liest jemand
        das NEIN als Fehlschlag und hält die Bedingung für offen.
      · TEIL (1) — ob eine ECHTE Klick-Kennung denselben Weg nimmt: GEMESSEN
        2026-09-07 (OWNER), am Vercel-Log des eigenen Dienstes. ERGEBNIS: JA — ein
        Conversion-Beacon von einer Landepage, die mit einer echten, vom Anbieter
        vergebenen Klick-Kennung geöffnet worden war, hat den Erneuerungsweg und
        danach den Google-Adapter durchlaufen. Abgelegt als MESSUNG F,
        docs/ziel-befunde.md, Google-Abschnitt, Teil (cd); nachgezogen in
        docs/aktiver-stand.md an der ersten Sperre, an VERMERK 1, an VERMERK 10
        (SCHULD 3) und an Vorrats-Eintrag 6.
        DASS DIE KENNUNG EINE ECHTE WAR, IST EINE OWNER-ANGABE 2026-09-07 und keine
        eigene Messung.
        DREI GRENZEN GEHÖREN AN DIESEN TEIL, sie stehen in (cd) selbst: der
        Statuscode des Einlieferungs-Aufrufs war NICHT ABLESBAR · die Zuordnung zu
        der beim Anbieter angenommenen Einlieferung desselben Tages ist eine
        ABLEITUNG und keine Messung · WELCHER der drei Kennungs-Parameter getroffen
        hat, ist UNGEMESSEN.
        KEINE DER DREI BERÜHRT DEN WORTLAUT DER BEDINGUNG: Gefragt ist, ob eine echte
        Kennung DENSELBEN WEG NIMMT — nicht, wie der Anbieter antwortet, und nicht,
        welcher Parametername trägt.
      WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST: was aus der erfüllten Bedingung
      für den ZUSTAND des Stempels folgt. Der Stempel wird in dieser Runde WEDER
      GESETZT NOCH AUFGEHOBEN; nachgezogen ist seine BEDINGUNG, nicht sein Zustand.
      Auch der Marker dieses Eintrags bleibt unberührt.

      ZWEITENS — DIE FREIGABE-ZEILE IST FAKTISCH ÜBERHOLT, ALS BEFUND UND NICHT ALS
      VORWURF. Sie sagt: "Nicht frei ist der Transport." DER TRANSPORT IST GEBAUT UND
      LIVE BEWIESEN — Scheibe 4 des Schnitts der Phase 11.2, Bau-Commits 26caa38 und
      84e9fca, beide vom 2026-09-01; der Live-Test ist GEMESSEN 2026-09-01 (OWNER) an
      der ausgelieferten Anwendung. Volltext: docs/aktiver-stand.md, VERMERK 10.
      DAS IST EINE ABLEITUNG AUS ZWEI DATIERTEN BELEGEN — dem Datum der zwei
      Bau-Commits und dem Datum des Live-Tests —, KEINE MESSUNG an dieser Zeile.
      WAS DAZUGEHÖRT, DAMIT DER BEFUND VOLLSTÄNDIG IST: Zum Zeitpunkt jenes Baus war
      Teil (2) der Restlücke am selben Tag gemessen, Teil (1) noch offen. KEINE
      EMPFEHLUNG, was daraus folgt, und KEIN Stempel — die Zeile bleibt wörtlich
      stehen.

      PROVENIENZ DIESES NACHTRAGS: Teil (2) GEMESSEN 2026-09-01 (OWNER); Teil (1)
      GEMESSEN 2026-09-07 (OWNER); die zwei Commit-Kennungen und ihr Datum GEMESSEN
      am Repo (CC, 2026-09-07, Doku-Runde). Dass die Bedingung damit erfüllt und die
      Freigabe-Zeile überholt ist, sind ABLEITUNGEN aus diesen Belegen, KEINE
      weiteren Messungen.

      ÜBERNOMMEN AM 2026-08-27 AUS DEM EINTRAG 11.8 — ZWEI ANGABEN, DIE JENE PHASE
      ÜBERDAUERN, WEIL SIE DIESE HIER BETREFFEN. Sie sind übernommen worden, WEIL SIE
      11.2 BINDEN, und NICHT, weil jener Eintrag verschwände: Er ist am 2026-08-27
      abgeschlossen worden, sein Rumpf steht aber weiterhin vollständig da (der Grund
      steht in seinem Kopf-Block). DORT STEHEN SIE DAMIT WEITERHIN IM WORTLAUT;
      MASSGEBLICH IST AB JETZT DIESER ORT.

      DIE SIEBEN-TAGE-FRIST DES ERNEUERUNGS-TOKENS — PFLICHT-HINWEIS FÜR JEDE
      LIVE-TEST-ANLEITUNG MIT GOOGLE, nicht als Fussnote: IM PUBLISHING-STATUS
      "TESTING" LEBT EIN ERNEUERUNGS-TOKEN SIEBEN TAGE. Wer das nicht weiss, jagt ein
      abgelaufenes Token als Defekt und beginnt die Suche am falschen Ende. DER BAU
      FINDET DAMIT UNTER KÜRZEREN FRISTEN STATT ALS DER SPÄTERE BETRIEB.
      PROVENIENZ: GELESEN (docs/ziel-befunde.md, Google-Abschnitt) — ausdrücklich NICHT
      gemessen. Es ist kein Token bis zu seinem Ablauf beobachtet worden.

      DER AUFRUF GEGEN events:ingest IST WEITERHIN EIN OFFENER BLOCKER — er ist mit
      Phase 11.8 KLEINER GEWORDEN UND NICHT ERLEDIGT: Der TRÄGER des Zugangsdatums für
      diesen Endpunkt ist NICHT GEMESSEN, und gegen eine ungemessene Methode wird nicht
      geplant. Scheibe 11.8e hat den Aufruf deshalb ausdrücklich AUSGESCHLOSSEN; sie
      beschafft ein Zugangsdatum, chiffriert es und legt es ab — mehr nicht.
      WAS DAS FÜR DIESE PHASE HEISST: Der Zugang ist da, der Weg zum Endpunkt nicht.
      Wer 11.2 zuschneidet, plant die Messung dieses Trägers als ERSTEN Schritt ein.
      DIE VOLLE HERLEITUNG STEHT IN
      docs/claude-history/phase-11.8-autorisierungsschicht.md — die Datei liegt nach
      dem Phasenende weiterhin unter docs/ und ist NICHT nach docs/claude-history/
      verschoben worden (der Grund steht in ihrem Kopf).
      STEMPEL 2026-09-08: Der Umzug ist an diesem Tag vollzogen, die Prämisse jenes
      Grundes ist widerlegt; die volle Auflösung steht im Kopf der umgezogenen Datei.

      VORBEHALT 2026-08-28 AN DEM BLOCK DARÜBER — DER BLOCKER IST GEFALLEN, UND DIESE
      STELLE IST DIE FOLGENREICHSTE VON ALLEN. Der Wortlaut oben bleibt unverändert
      stehen; hier steht, was an ihm heute noch trägt und was nicht.
      WARUM DIESER VORBEHALT ZUERST GELESEN WERDEN MUSS und nicht als Fussnote taugt: Der
      Block darüber steht im Eintrag 11.2 — also in dem Eintrag, den eine Zuschnitt-Runde
      dieser Phase als PFLICHTLEKTÜRE öffnet (docs/aktiver-stand.md, Abschnitt "Was den
      Zuschnitt bindet", führt ihn als bindend). Wer ihn ohne diesen Vorbehalt liest,
      beginnt mit einer Arbeit, die getan ist.
      · ÜBERHOLT IST, FÜNF ANGABEN, JE EINZELN:
        (1) "DER AUFRUF GEGEN events:ingest IST WEITERHIN EIN OFFENER BLOCKER".
        (2) "er ist mit Phase 11.8 KLEINER GEWORDEN UND NICHT ERLEDIGT".
        (3) "Der TRÄGER des Zugangsdatums für diesen Endpunkt ist NICHT GEMESSEN".
        (4) "Der Zugang ist da, der Weg zum Endpunkt nicht."
        (5) "Wer 11.2 zuschneidet, plant die Messung dieses Trägers als ERSTEN Schritt
            ein." DAS IST EINE ARBEITSANWEISUNG FÜR EINE ERLEDIGTE ARBEIT und die
            teuerste der fünf: Die vier anderen sind Beschreibungen eines Zustands, diese
            schickt die nächste Runde los.
      · DER STAND: Der Träger ist die Kopfzeile Authorization mit dem Wert "Bearer " +
        Token. GEMESSEN 2026-08-28, live gegen den Endpunkt. Fundstelle:
        docs/ziel-befunde.md, Google-Abschnitt, Teile (bj) bis (bm).
      · WAHR BLEIBT, UND ZWAR VOLLSTÄNDIG: was Scheibe 11.8e getan hat und dass sie den
        Aufruf ausdrücklich AUSGESCHLOSSEN hat ("sie beschafft ein Zugangsdatum,
        chiffriert es und legt es ab — mehr nicht") · der Verweis auf
        docs/claude-history/phase-11.8-autorisierungsschicht.md samt der Begründung, warum
        jene Datei ihren Ort behält. STEMPEL 2026-09-08: Der Umzug ist an diesem Tag
        vollzogen, die Prämisse jener Begründung ist widerlegt; die volle Auflösung steht
        im Kopf der umgezogenen Datei.
      · WAS AN DIE STELLE DER ARBEITSANWEISUNG TRITT — ALS ZEIGER, NICHT ALS KOPIE: Der
        erste Schritt ist getan. Die verbleibenden Vorbedingungen der TRANSPORT-Scheibe
        stehen in docs/aktiver-stand.md, VERMERK 3 — die Datenklassen-Grenze (FÜR
        KLICK-KENNUNGEN GETROFFEN: OWNER-ENTSCHEIDUNG 2026-08-28, dritte Klasse
        "fremdvergebene, für uns undurchsichtige Kennung", Auflage TRANSIT-ONLY,
        anbieterübergreifend — docs/offene-punkte.md, Eintrag "DATENKLASSEN-GRENZE VOR DER
        ERSTEN PII-SCHEIBE", Block vom 2026-08-28), die Sieben-Tage-Frist im
        Publishing-Status "Testing" und der nachgeschuldete Live-Nachweis der Scheibe
        11.2a. Sie werden hier NICHT wiederholt; zweimal geschrieben liefen sie
        auseinander.
        WAS DABEI NICHT MITKORRIGIERT IST, weil es diese Phase nicht als Vorbedingung
        bindet: Offen bleibt die VIERTE Frage jenes Eintrags — die RECHTSGRUNDLAGE, sie
        liegt beim KUNDEN als Verantwortlichem — und die Zuordnung der UNBENANNTEN
        Durchleitung über eventSourceUrl (Vermerk vom 2026-09-01 ebenda). Beide sind
        offen und beide sind KEINE Vorbedingung der Transport-Scheibe.
      · DIE GRENZE, DIE AN JEDEM DIESER VORBEHALTE STEHT: GEMESSEN IST DIE ANNAHME DER
        KOPFZEILE, NICHT DIE ANNAHME EINES GÜLTIGEN RUMPFES. Feldnamen, Schreibweise,
        eventSource und x-goog-user-project sind UNBERÜHRT; die vier Grenzen der Messung
        stehen vollständig in Teil (bm) derselben Fundstelle. Wer "Blocker gefallen" als
        "sendebereit" liest, liest das Gegenteil dessen, was gemessen wurde.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt. Die Folge für den
      Zuschnitt ist eine ABLEITUNG aus dieser Messung, keine zweite Messung.

      VORBEHALT 2026-08-28 AN DER GRENZE DARÜBER — DER WORTLAUT BLEIBT ZEICHEN FÜR ZEICHEN
      STEHEN. Er ist als Aussage über MESSUNG A unverändert wahr; dieser Vorbehalt tritt
      DANEBEN und trennt, was auf ihn heute noch zutrifft.
      DIE FORM IST VORBEHALT UND NICHT ABGELAUFEN, wie durchgehend an diesem Eintrag
      (Entscheidung vom 2026-08-28): Ein Satz über die Grenzen einer BENANNTEN Messung
      verliert seinen Gegenstand nicht dadurch, dass eine zweite Messung folgt.
      DER ANLASS: MESSUNG B1 vom selben Tag, SIEBEN Aufrufe gegen denselben Endpunkt, mit
      der Nutzlast, die buildIngestEventsRequest und buildGoogleEvent erzeugen. GEMESSEN
      2026-08-28 (OWNER), live. Volltext: docs/ziel-befunde.md, Google-Abschnitt, Teile (bn)
      bis (bu). ER WIRD HIER NICHT WIEDERHOLT — zwei Fassungen liefen auseinander.
      DIE VIER ACHSEN EINZELN, weil eine pauschale Marke die zwei Hälften zusammenzöge:
      · FELDNAMEN — FÄLLT. Sämtliche dreizehn Schlüssel unserer Nutzlast sind angenommen
        (Teil (bq)).
      · SCHREIBWEISE — FÄLLT. camelCase UND snake_case sind gleichwertig zulässig
        (Teil (bq)). KEINE FOLGE FÜR DEN CODE: gebaut wird camelCase, es wird keine Zeile
        umbenannt.
      · eventSource — STEHT ZUR HÄLFTE. Gemessen ist der TYP: ein Enum, "WEB" ist ein
        Mitglied (Teil (br)). Die MITGLIEDERMENGE ist erhoben — FÜNF brauchbare Werte
        (WEB · APP · IN_STORE · PHONE · MESSAGE, plus EVENT_SOURCE_UNSPECIFIED "Should
        never be used"), GELESEN 2026-08-24, docs/ziel-befunde.md, Google-Abschnitt,
        Teil (x)/F3. NICHT gemessen ist der WERT — welcher für den Offline-Klick-Import
        GILT; dieselbe Fundstelle sagt, eine Namensliste für Google Ads führe die
        Referenz weiterhin nicht.
      · x-goog-user-project — STEHT UNVERÄNDERT. Die Kopfzeile fehlte auch in allen sieben
        B1-Aufrufen, und die semantische Prüfung wurde erreicht — das ist AUSDRÜCKLICH KEIN
        Schluss auf Entbehrlichkeit (Teil (bu)). Grenze 2 in (bm) bleibt.
      WAS NEU HINZUKOMMT UND IN DER ALTEN GRENZE GAR NICHT VORKAM: operatingAccount.accountId
      MUSS NUMERISCH SEIN (Teil (bt)) — Google Ads zeigt Kundennummern mit Bindestrichen an,
      und ohne Normalisierung AN DER EINGABE entsteht ein stiller Fehlschlag.
      WAS DEN SATZ "NICHT DIE ANNAHME EINES GÜLTIGEN RUMPFES" WEITERHIN TRÄGT: B1 hat
      ausdrücklich KEIN auflösbares Ziel und KEINE echte Klick-Kennung gesendet. Ein
      erfolgreicher Ingest war strukturell unmöglich, und die DATENKLASSEN-GRENZE ist nicht
      berührt worden. Was ein GÜLTIGER Rumpf auslöst, ist nach wie vor ungemessen.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), Messung B1. Die Zuordnung je Achse ist eine
      ABLEITUNG aus dieser Messung.

      NACHTRAG 2026-09-08 — DIE TRENNUNG, DER MARKER UND DIE ZWEI LISTEN. Der Wortlaut
      darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Nachtrag tritt DANEBEN, wie
      durchgehend an diesem Eintrag.

      ERSTENS — GA4 HAT SEIT DEM 2026-09-08 EINE EIGENE ZEILE: Eintrag 11.9, "GA4 als
      SECHSTES Fan-Out-Ziel". DIESE ZEILE IST DAMIT AUF GOOGLE ADS VERENGT.
      DER KOPFSATZ "Es sind ZWEI Ziele, nicht eins" BLEIBT WAHR UND WIRD NICHT ANGETASTET
      — er ist der GRUND der Trennung, nicht ihr Opfer. Die drei GA4-Stellen dieses
      Eintrags bleiben im Wortlaut hier stehen; die neue Zeile ZEIGT auf sie und
      wiederholt sie nicht.
      PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-08. Keine Messung.

      ZWEITENS — DER MARKER STEHT AB JETZT AUF [~]. Der Satz weiter oben, der ihn
      ausdrücklich offenliess ("Der Stempel wird in dieser Runde WEDER GESETZT NOCH
      AUFGEHOBEN; nachgezogen ist seine BEDINGUNG, nicht sein Zustand. Auch der Marker
      dieses Eintrags bleibt unberührt"), IST DAMIT EINGELÖST. Er bleibt wörtlich stehen
      und ist als Aussage über SEINE Runde unverändert richtig.
      DER MARKER IST NUR ZULÄSSIG, WEIL BEIDE TEILE UNTEN AUSDRÜCKLICH BENANNT SIND —
      die Regel in CLAUDE.md verlangt genau das.

      WAS STEHT UND BEWIESEN IST — ZEHN POSTEN, JE MIT PROVENIENZ:
      · DIE GESTALT IST ENTSCHIEDEN: OFFLINE CONVERSION IMPORT auf Basis der
        Klick-Kennungen, Conversion-Action vom Typ UPLOAD_CLICKS. OWNER-ENTSCHEIDUNG
        2026-08-24, Volltext weiter oben in diesem Eintrag.
      · DIE AUTORISIERUNGSSCHICHT IST GEBAUT: Phase 11.8, sechs Scheiben, ABGESCHLOSSEN
        2026-08-27; Stand in docs/claude-history/phase-11.8-autorisierungsschicht.md.
      · KLICK-KENNUNGEN UND NUTZLAST (Scheibe 11.2a): VERMERK 2, Bau-Commit 6653f37.
      · DIE ERNEUERUNG DES ZUGANGSDATUMS (Scheibe 1a): VERMERK 6, Bau-Commit a351858,
        live bewiesen.
      · GOOGLE ALS REGULÄRES ZIEL IN DER OBERFLÄCHE (Scheibe 3): VERMERK 7, Bau-Commits
        659d672, 7771019, aa17f11, live bewiesen.
      · DIE KONTO-KENNUNGEN BEKOMMEN IHRE EINGABE (Scheibe 2): VERMERK 9, Bau-Commit
        6dc7e27, live bewiesen.
      · DER TRANSPORT (Scheibe 4): VERMERK 10, Bau-Commits 26caa38 und 84e9fca, live
        bewiesen 2026-09-01.
      · DIE AMPEL AN DER ZIEL-KARTE (Scheibe 11.2b): VERMERK 13, Bau-Commit 7288f90,
        live bewiesen.
      · DER RIEGEL GEGEN DIE VERLORENE SCHREIBUNG (Scheibe 1b-2b): VERMERK 14,
        Bau-Commit 2eae9ca, live bewiesen.
      · EINE ECHTE KLICK-KENNUNG HAT DEN PRODUKTIVPFAD DURCHLAUFEN (MESSUNG F) und die
        EINLIEFERUNG IST BEIM ANBIETER ANGENOMMEN UND ALS CONVERSION VERBUCHT WORDEN
        (MESSUNG G). Beide GEMESSEN 2026-09-07 (OWNER); Fundstellen docs/ziel-befunde.md,
        Google-Abschnitt, Teile (cd) und (cf).
      DIE VERMERKE LIEGEN IM ARCHIV docs/claude-history/phase-11.2-google.md; der Weg
      dorthin führt über Register 2 in docs/aktiver-stand.md.

      WAS AUSSTEHT — SIEBEN POSTEN. DAS IST DIE HÄLFTE, DIE DEN MARKER TRÄGT.
      DIE LISTE FÜHRT ACHT NUMMERN UND SIEBEN OFFENE POSTEN, und das ist kein Zählfehler:
      Nummer (4) ist am 2026-09-08 geschlossen worden und bleibt als geschlossene stehen —
      Nummern werden hier nicht neu vergeben, und eine Umnummerierung machte jeden Zeiger
      von aussen tot.
      · (1) DIE SIEBEN-TAGE-FRIST UND DER STATUSWECHSEL AUF "IN PRODUKTION". ER STEHT
        ZUERST, WEIL ER EINE LAUFENDE UHR TRÄGT: Das Erneuerungs-Token stirbt am
        2026-09-11 um 07:26:58 UTC (09:26:58 Ortszeit). Fundstelle: docs/aktiver-stand.md,
        Abschnitt "1b als Folgetask — nicht geschnitten, mit fünf Vorbedingungen",
        Vorbedingung (iv), Nachtrag vom 2026-09-03 in der Fassung vom 2026-09-04. NACH
        DIESEM TERMIN MELDET JEDE ERNEUERUNG `dead`, und jeder Test misst das statt der
        Sache.
        ER IST KEINE CODE-ARBEIT: Der Statuswechsel ist eine Arbeit am ANBIETER-KONTO und
        steht NEBEN Scheibe 1b, nicht in ihr. EIN PERFEKTER AUTOMATISMUS HÄLT DAS
        ZUGANGSDATUM EINE WOCHE AM LEBEN UND FÄLLT DANACH TROTZDEM AUS.
        DIE ZWISCHENLÖSUNG IST KEINE BEHEBUNG: Ein Neu-Verbinden setzt die Frist um sieben
        Tage zurück — GEMESSEN, zweimal (ebenda). Es VERSCHIEBT den Termin und löst ihn
        nicht.
        PROVENIENZ DER FRIST SELBST: GELESEN (docs/ziel-befunde.md, Google-Abschnitt),
        ausdrücklich NICHT gemessen — es ist kein Token bis zu seinem Ablauf beobachtet
        worden.
      · (2) DER eventSource-WERT. Welcher der fünf Enum-Werte für den Offline-Klick-Import
        GILT, ist nicht gemessen; gebaut ist "WEB" als OWNER-ENTSCHEIDUNG 2026-09-01.
      · (3) DIE KOPFZEILE x-goog-user-project. Sie wird nicht gesendet; ob sie Pflicht
        ist, ist in beide Richtungen ungemessen.
      · (4) DER NACHGESCHULDETE LIVE-NACHWEIS DER SCHEIBE 11.2a — GESCHLOSSEN AM
        2026-09-08. Der Posten bleibt an seiner Nummer stehen, weil Nummern in diesem
        Projekt nicht neu vergeben werden; die Begründung steht im NACHTRAG 2026-09-08,
        ZWEITER DES TAGES, am Ende dieses Eintrags.
      · (5) DIE WIRKUNG AUF DIE GEBOTE. Gemessen ist eine Conversion IN DER
        BERICHTERSTATTUNG, nicht ihre Wirkung auf die Gebotssteuerung; ob das
        14-Tage-Fenster aus (p)/H2 für die gewählte Gestalt überhaupt gilt, ist gelesen
        und nicht geklärt (docs/ziel-befunde.md, Teil (cf), Abschnitt "DIE GRENZEN").
      · (6) DER UPLOAD_CLICKS-VORBEHALT IM KUNDENKONTO. Ohne eine Conversion-Action
        dieses Typs gibt es keine productDestinationId, an die geliefert werden könnte.
      · (7) DIE OFFENE BERÜHRUNG MIT DER ZUSAGE IN 11.5. Ob der Hybrid-Ausschluss jener
        Zeile berührt ist, hängt an der unbeantworteten Frage, wessen Tag die "bestehende
        Tag-Conversion" ist; die Entscheidung gehört zu 11.5 und wird hier nicht getroffen.
      · (8) OB EIN KUNDE EIN EIGENES GOOGLE-TAG AUF EINER AUSGELIEFERTEN SEITE UNTERBRINGEN
        KANN. DIESER POSTEN BETRIFFT DIE KUNDENSEITE UND IST KEINE PAGESMITH-ARBEIT — er
        steht hier, weil er textlich ein offener Punkt DIESER Zeile ist, und er trägt seine
        Abgrenzung mit, damit ihn niemand stumm zum Bau-Rest zählt. Als offener Punkt
        geführt in docs/ziel-befunde.md, Google-Abschnitt.

      DRITTENS — "WAS EIN GÜLTIGER RUMPF AUSLÖST" IST BEANTWORTET, UND ZWAR ALS ABLEITUNG.
      Der Satz weiter oben ("Was ein GÜLTIGER Rumpf auslöst, ist nach wie vor ungemessen")
      BLEIBT WÖRTLICH STEHEN: Er ist als Aussage über MESSUNG B1 unverändert wahr, und die
      Form an diesem Eintrag ist NACHTRAG, nicht ABGELAUFEN.
      WAS DANEBEN TRITT: Am 2026-09-07 ist ein Aufruf mit gültigem Rumpf angenommen und die
      Conversion verbucht worden (MESSUNG F und G). DASS DAMIT DIE FRAGE AUS B1 BEANTWORTET
      IST, IST EINE ABLEITUNG AUS ZWEI DATIERTEN BELEGEN UND KEINE MESSUNG AN JENER FRAGE —
      kein Dokument sagt es bisher, und dieser Absatz ist der erste, der es ausspricht.

      VIERTENS — EINE AUSLASSUNG, DIE GENANNT WIRD, DAMIT SIE NICHT WIE EINE VERGESSENE
      AUSSIEHT: Das SCHEMA-RISIKO aus dem Kopf dieses Eintrags ("mehrwertige Anmeldungen
      passen nicht auf ein Geheimnis pro Zeile; im Ernstfall eine ZWEITE Migration auf der
      Geheimnis-Tabelle") steht NICHT in der Rest-Liste, weil es ERLEDIGT ist. GEMESSEN am
      Repo (CC, 2026-09-08): Phase 11.8 trägt im Titel "die Ablage und die Erneuerung
      MEHRWERTIGER Zugangsdaten" und steht auf [x]; die vorhergesagte zweite Migration
      existiert als supabase/migrations/0025_project_secrets_schema.sql.

      PROVENIENZ DIESES NACHTRAGS: Die Trennung und der Marker sind OWNER-ENTSCHEIDUNG
      2026-09-08. Die zehn Belege der ersten Liste sind GEMESSEN bzw. GELESEN an den je
      genannten Fundstellen; die Vermerk-Nummern und Bau-Commits sind aus Register 2 in
      docs/aktiver-stand.md übernommen und hier NICHT neu erhoben. Der Termin, die zwei
      Neu-Verbindungen und die Erledigung des Schema-Risikos sind GEMESSEN (OWNER
      2026-09-04 bzw. CC 2026-09-08). Dass die Frage aus B1 beantwortet ist, ist eine
      ABLEITUNG.

      NACHTRAG 2026-09-08, ZWEITER DES TAGES — POSTEN (4) IST GESCHLOSSEN, UND ZWAR AUF
      EINEM BENANNTEN KRITERIUM. Der Wortlaut darüber bleibt Zeichen für Zeichen stehen;
      dieser Nachtrag tritt DANEBEN, wie durchgehend an diesem Eintrag.

      DIE SCHULD, WÖRTLICH AUS VERMERK 2 (docs/claude-history/phase-11.2-google.md):
      "Der Beweis dieser Scheibe sind TESTS. EINEN LIVE-TEST GIBT ES NICHT, weil nichts
      gesendet wird — und gesendet wird nichts, weil die Zugangsdaten keinen Ort haben"
      … "DIE NÄCHSTE SCHEIBE SCHULDET IHN NACH — für diese hier UND für die eigene."

      DAS KRITERIUM STEHT IM ARCHIV, ES IST DREITEILIG, UND ES IST WÖRTLICH ZITIERBAR.
      VERMERK 3 nennt es an MESSUNG A: "MESSUNG A IST DIESER NACHWEIS NICHT und darf nicht
      als solcher verbucht werden: Sie hat keine Zeile Produktivcode ausgeführt, keinen
      Aufrufer hergestellt und keine Funktion dieser Scheibe berührt."
      ES STEHT VIERMAL, und die Wiederholung ist der Punkt: VERMERK 3 (an Messung A),
      VERMERK 4 (an Messung B1 — "Sie hat keine Zeile Produktivcode ausgeführt und keinen
      Aufrufer hergestellt — die Nutzlast ist von Hand nachgebaut, nicht von
      buildGoogleEvent erzeugt"), VERMERK 6 und VERMERK 7 zeichengleich ("buildGoogleEvent
      und extractGoogleClickIds haben weiterhin KEINEN Aufrufer im Produktivcode"). Dazu
      adressiert der Verdichtungs-Block der Scheibe 1a die Schuld SYMBOLGENAU.

      DER KONTRAST IST DER EIGENTLICHE BELEG: An genau diesem Kriterium sind ZWEI
      Kandidaten ausdrücklich VERWORFEN worden — Messung A, weil sie keine Zeile
      Produktivcode ausgeführt hat, und Messung B1, weil sie die Nutzlast von Hand
      nachgebaut hat. EIN KRITERIUM, DAS ZWEIMAL ETWAS AUSGESCHLOSSEN HAT, IST KEIN
      NACHTRÄGLICH PASSEND GEMACHTES.

      DER ABGLEICH, BEDINGUNG FÜR BEDINGUNG, je mit Fundstelle:
      · PRODUKTIVCODE AUSGEFÜHRT — der Google-Adapter forwardToGoogle
        (src/lib/capi/google-forward.ts) liegt seit Scheibe 4 im Ingest-Pfad.
      · EIN AUFRUFER HERGESTELLT — dieselbe Datei ruft extractGoogleClickIds,
        buildGoogleEvent und buildIngestEventsRequest; es ist ihr EINZIGER
        Produktiv-Aufrufer (GEMESSEN am Repo, CC, 2026-09-08).
      · DIE NUTZLAST VON buildGoogleEvent ERZEUGT, nicht von Hand nachgebaut — der
        Netzruf sendet, was buildIngestEventsRequest gebaut hat.
      UND DAS MATERIAL: Am 2026-09-07 hat eine ECHTE, vom Anbieter vergebene Klick-Kennung
      diesen Pfad genommen (MESSUNG F, docs/ziel-befunde.md, Google-Abschnitt, Teil (cd)),
      und die so gebaute Nutzlast ist beim Anbieter angenommen und als Conversion VERBUCHT
      worden (MESSUNG G, Teile (cf) und (cg)).

      EIN BEFUND, DER DIESEN POSTEN ÄLTER MACHT, ALS DIE REST-LISTE IHN FÜHRTE — und er
      gehört an den Anfang jeder Weiterverwendung: VERMERK 10 (Scheibe 4, 2026-09-01) hat
      die Schuld BEREITS ALS EINGELÖST VERMERKT — "SCHULD 2 — DIE SCHULD AUS VERMERK 2:
      EINGELÖST … Beide laufen jetzt im Produktivpfad, und Schritt 2 hat sie gefahren."
      DORT IST SIE AUSDRÜCKLICH SCHWÄCHER BELEGT ALS HIER: "DAS IST EINE ABLEITUNG AUS ZWEI
      LOGZEILEN UND KEINE ABLESUNG DER NUTZLAST."
      WARUM DER POSTEN TROTZDEM IN DER REST-LISTE STAND: Sie hat ihn aus der
      Vorbedingungs-Aufzählung von VERMERK 3 übernommen, die dieser Eintrag weiter oben
      zitiert — und niemand hat ihn gegen VERMERK 10 gehalten. DAS IST KEINE
      DOPPELSCHLIESSUNG, SONDERN EINE NACHGEZOGENE: Die Einlösung datiert auf den
      2026-09-01; MESSUNG F und G ersetzen ihre Ableitung aus zwei Logzeilen durch echtes
      Material bis zur Verbuchung.

      DIE FORM DIESER AUSSAGE, UND SIE IST DER WICHTIGSTE SATZ DIESES NACHTRAGS:
      F UND G SIND GEMESSEN. DASS SIE DAS KRITERIUM ERFÜLLEN, IST EINE ABLEITUNG aus dem
      Vergleich von Kriterium und Code — KEINE Messung an der Schuld selbst und KEIN
      Architekten-Urteil. SIE IST WIDERLEGBAR: Wer eine VIERTE Bedingung findet, die das
      Archiv führt und die F/G nicht erfüllen, hebt sie auf. GEPRÜFT UND NICHT GEFUNDEN
      (GEMESSEN am Archivtext, CC, 2026-09-08; Achse: sämtliche Vorkommen von "Schuld" und
      "Live-Nachweis der Scheibe 11.2a" über die ganze Datei).

      DIE EINE LÜCKE, DIE BLEIBT UND NICHT MITGESCHLOSSEN WIRD: WELCHER der drei
      Kennungs-Parameter getroffen hat, ist UNGEMESSEN — die Grenze steht in Teil (cd)
      selbst und hängt an Vorrats-Eintrag 59 (docs/aktiver-stand-vorrat.md): Der Code kennt
      keine Vorrangregel und sendet alle gefundenen Kennungen; wie der Anbieter zwei
      zugleich verarbeitet, ist ungemessen. SIE IST HEUTE NICHT HERSTELLBAR — sie braucht
      einen echten Anzeigenklick mit zwei Parametern, und den kann niemand erzwingen.

      EIN PFLICHT-STOPP FÜR JEDEN KÜNFTIGEN GOOGLE-LIVE-TEST, und er steht hier, weil er
      sonst im Bericht einer Runde stirbt: DIE PRÜFSEITE MUSS NEU VERÖFFENTLICHT SEIN.
      Der Consent-Schlüssel geht zur ERZEUGUNGSZEIT in den ausgelieferten Text; eine Seite
      von VOR der Google-Verdrahtung trägt keinen google-Schlüssel, und "undefined === true"
      ist false. DER LAUF MISST DANN EIN FAIL-CLOSED-VERHALTEN UND SCHREIBT ES DEM ADAPTER
      ZU. Dreistufig am Code belegt (GEMESSEN, CC, 2026-09-08): der cns-Block entsteht im
      Erzeuger (src/lib/tracking/meta.ts), consentAllows liest ihn und gibt für einen
      fehlenden Ziel-Schlüssel false (src/lib/tracking/consent-wire.ts), und
      src/lib/tracking/consent-targets.ts nennt genau das "das DRITTE der vier Tore".
      ES IST DERSELBE MECHANISMUS WIE "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM
      DEPLOY" (docs/immer-beachten.md), dort BELEG 2.

      PROVENIENZ DIESES NACHTRAGS: Die Zitate aus VERMERK 2, 3, 4, 6, 7 und 10 sind GELESEN
      im Archiv (CC, 2026-09-08). Der Aufrufer-Befund und der dreistufige Consent-Beleg sind
      GEMESSEN am Repo (CC, 2026-09-08). MESSUNG F und G sind GEMESSEN 2026-09-07 (OWNER).
      Dass F und G das Kriterium erfüllen, ist eine ABLEITUNG; dass keine vierte Bedingung
      existiert, ist ein NICHT-TREFFER mit benannter Achse.

      NACHTRAG 2026-09-08, DRITTER DES TAGES — DER ABSCHLUSS. DER MARKER STEHT AUF [x].
      Der Wortlaut darüber bleibt ZEICHEN FÜR ZEICHEN stehen, wie durchgehend an diesem
      Eintrag; dieser Nachtrag tritt DANEBEN.

      WAS [x] HIER HEISST, UND ZWAR AUSDRÜCKLICH NICHT MEHR: ES HEISST BAU-FERTIG. Es
      heisst NICHT "alle Fragen beantwortet" und NICHT "Google funktioniert".
      DAS KRITERIUM STEHT IN CLAUDE.md, "## Roadmap & aktueller Stand", und lautet: EINE
      PHASE GEHT AUF [x], WENN KEIN CODE MEHR ZU SCHREIBEN IST. Externe Abhängigkeiten —
      Messungen, Arbeit an einem Fremdkonto, Owner-Entscheidungen — halten sie NICHT offen,
      sondern werden GEHOBEN. GEMESSEN am Repo (CC, 2026-09-08): kein Code offen; die
      sieben Reste sind Messungen, eine Arbeit am Anbieter-Konto und eine Voraussetzung je
      Kunde — keiner ist ein Bau.
      DIE AUFLAGE, OHNE DIE [x] UNZULÄSSIG WÄRE, wird hier eingelöst: Was zum Zeitpunkt des
      [x] PRODUKTRELEVANT UNBEWIESEN ist, steht ausdrücklich da. Es sind drei Dinge.

      ERSTENS — DIE WIRKUNG AUF DIE GEBOTE IST UNGEMESSEN, UND DAS IST DAS
      PRODUKTVERSPRECHEN SELBST. Bewiesen ist der Weg bis zur VERBUCHUNG beim Anbieter
      (MESSUNG G, GEMESSEN 2026-09-07, OWNER); NICHT bewiesen ist die WIRKUNG — dass die
      verbuchte Conversion die Gebotssteuerung erreicht. Gemessen ist eine Conversion IN DER
      BERICHTERSTATTUNG, nicht in der Gebotssteuerung.
      WER [x] ALS "GOOGLE FUNKTIONIERT" LIEST, LIEST MEHR, ALS GEMESSEN IST. Pagesmith
      verkauft server-seitiges Tracking, damit der Werbekanal besser aussteuert; ein Weg,
      der bis zur Berichterstattung trägt und dort endet, hält dieses Versprechen nicht
      ein. Ob das 14-Tage-Fenster aus (p)/H2 für die gewählte Gestalt überhaupt gilt, ist
      GELESEN und nicht geklärt.
      ORT NACH DER HEBUNG: docs/offene-punkte.md, "DIE WIRKUNG AUF DIE GEBOTE IST
      UNGEMESSEN", mit Stub in CLAUDE.md.

      ZWEITENS — DER eventSource-WERT IST NICHT GEMESSEN. Gebaut ist "WEB" als
      OWNER-ENTSCHEIDUNG 2026-09-01. GEMESSEN ist der TYP (ein Enum, kein freier String),
      NICHT der WERT; welcher der Enum-Werte für den Offline-Klick-Import GILT, sagt der
      Anbieter für unsere Gestalt nicht — für die Nachbar-Gestalt nennt dieselbe Tabelle
      einen konkreten Wert, für unsere keinen.
      DASS EINE CONVERSION VERBUCHT WURDE, BEANTWORTET DAS NICHT: MESSUNG G belegt die
      Verbuchung MIT "WEB" — sie belegt nicht, dass ein anderer Wert falsch gewesen wäre.
      ORT NACH DER HEBUNG: docs/offene-punkte.md, "DER eventSource-WERT IST NICHT GEMESSEN
      — GEBAUT IST 'WEB' ALS ENTSCHEIDUNG", mit Stub in CLAUDE.md.

      DRITTENS — DIE KOPFZEILE x-goog-user-project WIRD NICHT GESENDET, UND OB SIE PFLICHT
      IST, IST IN BEIDE RICHTUNGEN UNGEMESSEN. Dass die bisherigen Aufrufe ohne sie
      durchgelaufen sind, ist KEIN Beleg dafür, dass sie fehlen darf — es kann an der
      Kontoart, am Zugangsmodell oder am Umfang liegen.
      ORT NACH DER HEBUNG: docs/offene-punkte.md, "DIE KOPFZEILE x-goog-user-project WIRD
      NICHT GESENDET", mit Stub in CLAUDE.md.

      WAS GEBAUT UND LIVE BEWIESEN IST, WIRD HIER NICHT VERDOPPELT: Die zehn Posten stehen
      im NACHTRAG 2026-09-08 weiter oben in diesem Eintrag, je mit Provenienz, Vermerk-Nummer
      und Bau-Commit. ZWEI FASSUNGEN LIEFEN AUSEINANDER.

      DIE HEBUNG — WAS WOHIN GEGANGEN IST, JE KLASSE:
      · DIE SIEBEN RESTE DIESER ZEILE: FÜNF nach docs/offene-punkte.md, je mit Stub in
        CLAUDE.md — (1) die Sieben-Tage-Frist samt Termin, (2) der eventSource-Wert, (3) die
        Kopfzeile, (5) die Wirkung auf die Gebote, (6) der UPLOAD_CLICKS-Vorbehalt. Posten
        (7) ist an die ROADMAP-ZEILE 11.5 gegeben, wo die Entscheidung fällt. Posten (8) ist
        GESTRICHEN, weil er als offener Punkt bereits in docs/ziel-befunde.md geführt wird —
        was Buchhaltung ist und anderswo schon steht, wird nicht umgezogen.
      · DER VORRAT DER PHASE — SECHSUNDSECHZIG EINTRÄGE: VIERZEHN nach docs/offene-punkte.md,
        FÜNFZIG nach docs/claude-history/backlog-polish.md, ZWEI gestrichen. DAS KRITERIUM WAR
        ZWEITEILIG — benennbarer Trigger UND "geht sonst STILL kaputt"; nach dem Trigger
        allein wären es FÜNFUNDFÜNFZIG gewesen (GEMESSEN, CC, 2026-09-08).
      · DIE HEBUNGS-KANDIDATEN: ACHT als Dauerregeln nach docs/immer-beachten.md, EINER
        (Kandidat 4) ins Backlog, weil er keine Regel ist, sondern eine Verortungs-Aufgabe.
        Kandidat 10 trägt den angenommenen Änderungsantrag an docs/arbeitsweise.md, dessen
        Vollzug NACH diesem Phasenende terminiert ist; er ist als Kopie ins Archiv gegangen.
      · DIE NEUNZEHN BINDENDEN ENTSCHEIDUNGEN: DREI als Dauerregeln nach
        docs/immer-beachten.md, SECHZEHN ins Archiv.

      EIN BEFUND ZU DIESER LETZTEN KLASSE, DER SONST NIRGENDS STEHT: KEINE DER NEUNZEHN HAT
      IHREN GEGENSTAND VERLOREN — anders als beim Vorrat derselben Phase, wo fünf erledigt
      sind. DAS IST STRUKTURELL: Eine bindende Entscheidung beschreibt, WIE gebaut wurde;
      sie kann überholt werden, aber nicht gegenstandslos, solange der Code steht. WER DORT
      STREICHUNGEN ERWARTET, ERWARTET DIE FEHLERKLASSE DER FALSCHEN LISTE.

      WAS DIESER NACHTRAG NICHT TUT: Er sagt nichts über Schritt 2 des Phasenendes (das
      Löschen der Steuerdatei und der Vorratsdatei), nichts über die Zeile 11.9 und nichts
      über den Zustand des Stempel-Blocks am Ende dieses Eintrags.

      PROVENIENZ: Der Marker und das Kriterium sind OWNER-ENTSCHEIDUNG 2026-09-08. Dass kein
      Code offen ist, ist GEMESSEN am Repo (CC, 2026-09-08). Die drei unbewiesenen Dinge sind
      GEMESSEN bzw. GELESEN an den je genannten Fundstellen und in dieser Runde NICHT neu
      erhoben. Die Verteilung der Hebung ist GEMESSEN an dieser Runde (CC, 2026-09-08). Dass
      keine der neunzehn Entscheidungen gegenstandslos ist, ist eine ABLEITUNG aus ihrem
      Charakter und keine Messung an jeder einzelnen.
- [x] Phase 11.8 — Autorisierungsschicht: die Ablage und die Erneuerung MEHRWERTIGER
      Zugangsdaten.

      ABGESCHLOSSEN AM 2026-08-27. Sechs Scheiben (11.8a bis 11.8f), je mit eigenem
      Vermerk und eigenem Nachweis. DER STAND LIEGT IN
      docs/claude-history/phase-11.8-autorisierungsschicht.md — die
      Datei ist NICHT nach docs/claude-history/ verschoben worden, weil sechs Quelldateien
      ihren Pfad im Kommentarkopf zitieren; der Grund und die Bedingung, unter der sie
      doch wandert, stehen in ihrem Kopf.
      STEMPEL 2026-09-08: Der Umzug ist an diesem Tag vollzogen, die Prämisse jenes
      Grundes ist widerlegt; die volle Auflösung steht im Kopf der umgezogenen Datei.

      DIESER RUMPF IST NICHT KOLLABIERT, UND DAS IST EINE ENTSCHEIDUNG MIT GEMESSENEM
      GRUND (ARCHITEKT, 2026-08-27) — die übliche Bauform "auf Haken plus Verweissatz
      kollabieren" ist hier ABSICHTLICH nicht angewandt.
      GEMESSEN am Repo (CC, 2026-08-27; Achse: "Eintrag 11.8" und "Roadmap-Zeile 11.8"
      über docs/, src/, supabase/ und CLAUDE.md): VIERZEHN Zeiger auf diesen Eintrag.
      Neun zeigen auf die PHASE als Ganzes und überlebten einen Kollaps. FÜNF zeigen auf
      INHALT, der dann verschwunden wäre — einer davon aus dem PRODUKTIVCODE:
      · K1 — DIE DREI ENTSCHEIDUNGEN ZUM GEHEIMNIS-SPEICHER (Block vom 2026-08-25).
        Zeiger: docs/claude-history/phase-11.8-autorisierungsschicht.md, zweimal,
        ausdrücklich mit "HIER STEHT NUR DER
        ZEIGER" bzw. "werden hier NICHT verdoppelt".
      · K2 — DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS. Zeiger: docs/offene-punkte.md,
        Eintrag "DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT", wörtlich: "Der
        Preis ist dort benannt und wird hier NICHT verdoppelt."
      · K3 — DER adwords-BEREICH ALS KANDIDAT UND NICHT ALS ENTSCHEIDUNG. Zeiger:
        src/lib/oauth/google-authorize.ts (PRODUKTIVCODE) und docs/ziel-befunde.md.
      · K4 — DIE AUFLAGEN AUS DEM ZUGANGSMODELL. Zeiger: CLAUDE.md, wörtlich: "DIE
        AUFLAGEN AUS DIESER WAHL STEHEN NICHT HIER, sondern an der Roadmap-Zeile 11.8".
        DAS WÄRE DER TEUERSTE GEWESEN — ein Zeiger ins Leere in der Datei, die jede
        Sitzung lädt.
      · K5 — DIE BEGRÜNDUNG DER FESTEN WEITERLEITUNGS-ADRESSE (Block vom 2026-08-27).
        Zeiger: docs/claude-history/phase-11.8-autorisierungsschicht.md, Zuschnitt 11.8d,
        Entscheidung (5), wörtlich:
        "Die Begründung steht in docs/roadmap.md, Eintrag 11.8 … und wird hier NICHT
        verdoppelt."
      DIE REGEL, DIE HIER NICHT PASST, UND WARUM: "Auf Haken plus Verweissatz
      kollabieren" ist für einen Eintrag geschrieben, der als GANZES auf eine Phase zeigt.
      Dieser trägt ENTSCHEIDUNGEN, auf die andere Dokumente ausdrücklich verweisen, WEIL
      sie nicht verdoppelt werden sollten. Ein Kollaps bestrafte genau die Disziplin, die
      die Verdopplung vermieden hat.

      WAS MIT DEM VOLLZUG ABGELAUFEN IST — BENANNT STATT GESTRICHEN, damit die Zeiger
      halten (Titel-Zitate ohne Marke):
      · "ZUR NUMMER UND ZU IHREM PLATZ" — die Begründung der Nummernwahl und des Platzes
        im Verzeichnis. Sie hat ihren Gegenstand mit der Vergabe verloren.
      · "WAS HIER NICHT ENTSCHIEDEN IST: ob und wann die Schicht gebaut wird" — sie ist
        gebaut, das Zugangsmodell steht, der Zweig ist offen geblieben (s. WEITERBINDEND).
      · Jede Formulierung dieses Eintrags, die die Schicht als UNGEBAUT beschreibt, ist ab
        dem 2026-08-27 ein ZEITDOKUMENT. Sie bleibt lesbar, weil sie die Herleitung trägt,
        und ist als Aussage über den heutigen Stand FALSCH.
      DREI ABSCHNITTE SIND GEPRÜFT UND AUSDRÜCKLICH NICHT ALS ABGELAUFEN MARKIERT, weil
      die Markierung eine Aussage falsch machte, auf die gezeigt wird:
      · "ZWEI BLOCKER STEHEN VOR EINEM ZUSCHNITT" — der ERSTE (der Träger des
        Zugangsdatums bei Google) ist NICHT erledigt, sondern KLEINER GEWORDEN und steht
        seit dem 2026-08-27 zusätzlich am Eintrag 11.2.
      · "DAS SCHEMA-RISIKO, MIT DEM GEMESSENEN STAND" — die Messung ist ein Zeitdokument,
        aber der Abschnitt wird als ABLEITUNGS-Grundlage zitiert.
      · "DIE AUFLAGE, DIE EINEN SPÄTEREN NEUBAU VERHINDERT — DIE ABLAGE DARF NICHT
        ANNEHMEN, DASS EIN ZUGANGSDATUM IMMER EINEM PROJEKT GEHÖRT" — sie ist mit der
        nullbaren project_id EINGELÖST, aber die NUTZER-Achse ist VERTAGT, nicht
        entschieden.

      VORBEHALT 2026-08-28 AN DER ERSTEN DER DREI MARKEN DARÜBER. Der Wortlaut oben bleibt
      unverändert stehen, UND DIE ZAHL "DREI" WIRD NICHT ANGETASTET — sie zählt, welche
      Abschnitte damals geprüft wurden, und das bleibt richtig.
      WAS DIESER VORBEHALT BETRIFFT, IST NICHT DIE MARKIERUNG, SONDERN IHRE BEGRÜNDUNG —
      und das ist der Grund, warum er hier und nicht am Block selbst steht: Die erste Marke
      begründet, warum jener Abschnitt NICHT als abgelaufen markiert wurde, mit "der ERSTE
      (der Träger des Zugangsdatums bei Google) ist NICHT erledigt, sondern KLEINER
      GEWORDEN". DIESE BEGRÜNDUNG IST SEIT DEM 2026-08-28 FALSCH.
      · ÜBERHOLT IST: "ist NICHT erledigt, sondern KLEINER GEWORDEN". Der Träger ist
        GEMESSEN — Kopfzeile Authorization, Wert "Bearer " + Token (GEMESSEN 2026-08-28,
        live gegen den Endpunkt; Fundstelle docs/ziel-befunde.md, Google-Abschnitt, Teile
        (bj) bis (bm)).
      · WAHR BLEIBT: dass der Abschnitt nicht als abgelaufen markiert wurde und WEITERHIN
        nicht markiert werden darf — jetzt aber aus einem ANDEREN Grund. Er trägt eine
        ZWEITE Marke, den LinkedIn-Blocker, und die ist unverändert offen; eine
        Abgelaufen-Markierung risse sie mit. Der Abschnitt selbst trägt seit dem
        2026-08-28 einen eigenen Vorbehalt.
      · WAHR BLEIBEN AUSSERDEM: die zweite und die dritte Marke oben (Schema-Risiko,
        Ablage-Auflage). Messung A berührt keine von beiden.
      · DIE GRENZE: GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES
        GÜLTIGEN RUMPFES — die vier Grenzen stehen in Teil (bm) derselben Fundstelle.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER). Die Folge für die Markierung ist eine
      ABLEITUNG.

      WAS ÜBER DIE PHASE HINAUS WEITERBINDET — die fünf Zeiger-Ziele oben, in einem Satz
      je: die DREI ENTSCHEIDUNGEN zum Geheimnis-Speicher (Verfahren, Tabelle,
      Eigentums-Achse) · die VERWAHRUNG des Chiffrier-Schlüssels und ihr Preis · der
      adwords-BEREICH als Kandidat und nicht als Entscheidung · die AUFLAGEN aus dem
      Zugangsmodell (Advertiser mit kundeneigenem OAuth) · die BEGRÜNDUNG, warum die
      Weiterleitungs-Adresse fest gesetzt und nicht aus dem Anfrage-Host abgeleitet wird.

      VIER ANGABEN SIND AM 2026-08-27 VERORTET WORDEN, WEIL SIE NICHT MIT DIESER PHASE
      ABLAUFEN. Sie stehen unten weiterhin im Wortlaut; MASSGEBLICH IST AB JETZT DER NEUE
      ORT, und wer sie ändert, ändert sie dort:
      · DIE ZWEI REGISTRIERTEN WEITERLEITUNGS-ADRESSEN → docs/offene-punkte.md, Eintrag
        "DIE ZWEI REGISTRIERTEN WEITERLEITUNGS-ADRESSEN LIEGEN AUSSERHALB DES REPOS"
        (Trigger: eine dritte Umgebung, ein Wechsel der Vercel-Adresse oder die
        Brand-Domain).
      · DIE UMBENENNUNGS-BEDINGUNG DES PRÄFIXES GOOGLE_OAUTH_ → docs/offene-punkte.md,
        Eintrag "DER PRÄFIX GOOGLE_OAUTH_ HÖRT AUF ZU PASSEN …". Die NAMEN selbst sind
        NICHT verortet — sie stehen selbstdokumentierend im Code.
      · DIE SIEBEN-TAGE-FRIST DES ERNEUERUNGS-TOKENS → Eintrag 11.2, als Pflicht-Hinweis
        für jede Live-Test-Anleitung mit Google.
      · DER AUFRUF GEGEN events:ingest UND SEIN UNGEMESSENER TRÄGER → Eintrag 11.2, als
        offener Blocker.

      VORBEHALT 2026-08-28 AN DER VIERTEN DER VIER ANGABEN DARÜBER. Der Wortlaut oben
      bleibt unverändert stehen, UND DIE ZAHL "VIER" WIRD NICHT ANGETASTET — die Verortung
      hat vier Angaben betroffen, und das bleibt richtig. DIE VERORTUNG SELBST GILT
      UNVERÄNDERT WEITER: Der Ort der vierten Angabe ist und bleibt Eintrag 11.2.
      · ÜBERHOLT IST GENAU EIN WORT DER VIERTEN ANGABE: "SEIN UNGEMESSENER TRÄGER". Er ist
        gemessen — Kopfzeile Authorization, Wert "Bearer " + Token (GEMESSEN 2026-08-28,
        live gegen den Endpunkt; Fundstelle docs/ziel-befunde.md, Google-Abschnitt, Teile
        (bj) bis (bm)). Ebenso überholt ist der Zusatz "als offener Blocker": Am Zielort
        steht seit dem 2026-08-28 ein eigener Vorbehalt, der ihn auflöst.
      · WAHR BLEIBT: die Verortung als solche · die Angabe, dass der Aufruf gegen
        events:ingest 11.2 betrifft und nicht 11.8 · sämtliche drei übrigen Angaben, von
        denen KEINE von Messung A berührt wird — insbesondere die SIEBEN-TAGE-FRIST, die
        unverändert als Pflicht-Hinweis für jede Live-Test-Anleitung mit Google gilt.
      · DIE GRENZE: GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES
        GÜLTIGEN RUMPFES — die vier Grenzen stehen in Teil (bm) derselben Fundstelle.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER).

      DIE BEDINGUNG, UNTER DER DIESER RUMPF DOCH KOLLABIERT, und ohne sie stünde die
      Entscheidung als Dauerzustand da: Sobald KEIN Dokument und KEIN Produktivcode mehr
      auf seinen INHALT zeigt — also die fünf Ziele K1 bis K5 verortet oder gegenstandslos
      sind. Das ist prüfbar mit derselben Suche, die die vierzehn Zeiger gefunden hat.

      PROVENIENZ DIESES BLOCKS: die Zeiger-Zählung ist GEMESSEN am Repo (CC, 2026-08-27);
      die Nicht-Kollaps-Entscheidung, die Verortung der vier Angaben und die
      Abgelaufen-Markierung sind ARCHITEKTEN-ENTSCHEIDUNG vom 2026-08-27. KEINE Messung an
      einer Google-Schnittstelle und keine an der Datenbank.

      ABGELAUFEN AM 2026-08-27 — der folgende Absatz bleibt WÖRTLICH stehen und ist ein
      ZEITDOKUMENT; s. den Block am Kopf dieses Eintrags.
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

      VORBEHALT 2026-08-28 — ES IST NUR NOCH EINER. Der Wortlaut oben bleibt Zeichen für
      Zeichen stehen, einschliesslich der Kopfzeile mit ihrer Zahl; dieser Vorbehalt tritt
      DANEBEN und trennt, was noch trägt.
      DIESER SATZ IST ZWEIMAL ÜBERHOLT WORDEN, GESTAFFELT UND AUS VERSCHIEDENEN GRÜNDEN —
      und ohne diesen Hinweis liest die nächste Runde zwei Vorbehalte an derselben Stelle
      als Widerspruch: Am 2026-08-25 traf es die Angabe, der Träger stehe AUSSERHALB des
      Doku-Baums (er stand innerhalb, s. den Vorbehalt vom 2026-08-25 weiter unten). Am
      2026-08-28 trifft es die Frage selbst — er ist GEMESSEN. Der ältere Vorbehalt bleibt
      gültig und wird von diesem NICHT abgelöst; er beantwortete eine andere Frage.
      · ÜBERHOLT IST: die Kopfzeile "ZWEI BLOCKER STEHEN VOR EINEM ZUSCHNITT" — es ist nur
        noch EINER · und in der ersten Marke der Satz "Er muss ausserhalb dieses
        Doku-Baums gesucht oder gemessen werden": ER IST GEMESSEN. Kopfzeile
        Authorization, Wert "Bearer " + Token (GEMESSEN 2026-08-28, live gegen den
        Endpunkt; Fundstelle docs/ziel-befunde.md, Google-Abschnitt, Teile (bj) bis (bm)).
      · WAHR BLEIBT: "steht auf 33 gelesenen Seiten NICHT" — die Seite, die den Träger
        trägt, war nicht unter den 33, und die ZAHL 33 wird nicht angetastet · die
        Fundstellen-Angabe auf Teil (u)/Frage 2 und Teil (z), die weiterhin beschreibt,
        was am Dokument steht.
      · DIE ZWEITE MARKE — LINKEDIN — IST UNBERÜHRT UND UNVERÄNDERT OFFEN. Sie steht hier
        eigens, weil eine Kopfzeile, die von ZWEI auf EINEN geht, sie mitzureissen droht:
        Messung A ging gegen Google. Die strukturell unmögliche Ablauf-Überwachung bei
        LinkedIn ist von ihr in keiner Weise berührt. SIE IST DER VERBLEIBENDE BLOCKER.
      · DIE GRENZE: GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES
        GÜLTIGEN RUMPFES — die vier Grenzen stehen in Teil (bm) derselben Fundstelle.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt.

      ABGELAUFEN AM 2026-08-27 — der folgende Satz bleibt WÖRTLICH stehen und ist ein
      ZEITDOKUMENT: Die Schicht IST gebaut (11.8a bis 11.8f), und das Zugangsmodell steht
      seit dem 2026-08-25. OFFEN GEBLIEBEN IST ALLEIN DER ZWEIG — erzeugen die Kunden ihr
      Zugangsdatum selbst oder der Betreiber? S. den Block am Kopf dieses Eintrags.
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

      VORBEHALT 2026-08-28 AN DER AUFZÄHLUNG DARÜBER. Der Wortlaut bleibt unverändert
      stehen; hier steht, welcher ihrer vier Punkte heute noch offen ist.
      · ÜBERHOLT IST GENAU EIN PUNKT: "der Träger des Zugangsdatums für events:ingest" ist
        KEIN offener Posten mehr. GEMESSEN 2026-08-28, live gegen den Endpunkt: Kopfzeile
        Authorization, Wert "Bearer " + Token. Fundstelle: docs/ziel-befunde.md,
        Google-Abschnitt, Teile (bj) bis (bm).
      · WAHR BLEIBT — UND ZWAR AUSDRÜCKLICH: "ob x-goog-user-project Pflicht ist" ·
        "2.000 gegen 10.000". BEIDE SIND UNVERÄNDERT OFFEN, und der erste ist es
        BEGRÜNDET: Der Aufruf scheiterte auf der JSON-Parse-Ebene, und in welcher
        Reihenfolge der Anbieter Authentifizierung, Projekt-Zuordnung, Kontingent und
        Rumpf prüft, ist UNBEKANNT — eine Projekt-Prüfung kann dahinterliegen und wurde
        dann nie erreicht. AUSDRÜCKLICH KEIN SCHLUSS, DIE KOPFZEILE SEI ENTBEHRLICH.
      · WAHR BLEIBT AUCH DIE KLAMMER "(das gefundene Beispiel gilt der Schwester-Methode)"
        — als Aussage über die DOKU. Sie ist am 2026-08-28 über sieben weitere Seiten
        bestätigt worden: für events:ingest führt der Anbieter weiterhin kein
        Kopfzeilen-Beispiel. Beantwortet hat die Frage eine MESSUNG, keine Lesung.
      · NICHT VON DIESEM VORBEHALT BEHANDELT: "das Zugangsmodell". Es ist bereits am
        2026-08-25 abgelöst worden — von dem Block weiter unten, der es ausdrücklich für
        ERLEDIGT erklärt. Hier wird es NICHT ein zweites Mal behandelt.
      · DIE GRENZE: GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES
        GÜLTIGEN RUMPFES — die vier Grenzen stehen in Teil (bm) derselben Fundstelle.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt.

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

      VORBEHALT 2026-08-28 AN DER VIERTEN MARKE DES VORBEHALTS DARÜBER — ES SIND GENAU
      ZWEI HALBSÄTZE. Der Wortlaut des ganzen Blocks bleibt unverändert stehen; die ersten
      drei Marken sind von diesem Vorbehalt NICHT berührt.
      · ÜBERHOLT SIND ZWEI HALBSÄTZE DER VIERTEN MARKE, und nur sie: "und gemessen ist
        nichts." · "Der Blocker ist damit KLEINER geworden und NICHT erledigt."
        GEMESSEN 2026-08-28, live gegen den Endpunkt: Der Träger ist die Kopfzeile
        Authorization mit dem Wert "Bearer " + Token. Fundstelle: docs/ziel-befunde.md,
        Google-Abschnitt, Teile (bj) bis (bm). DER BLOCKER IST GEFALLEN, nicht kleiner
        geworden.
      · WAHR BLEIBT — UND VERBREITERT — DER ERSTE SATZ DERSELBEN MARKE: "Das Beispiel gilt
        audienceMembers:ingest. Für events:ingest liegt weiterhin KEIN Kopfzeilen-Beispiel
        vor." Ein zugespitzter Doku-Lauf über SIEBEN Seiten hat das am 2026-08-28
        bestätigt und die Reichweite erweitert (GELESEN 2026-08-28, Teil (bh)); dazu tritt
        der Befund, dass die Referenzseiten BEIDER :ingest-Methoden auf der
        Kopfzeilen-Achse identisch leer sind (Teil (bi)) — die Abwesenheit ist keine
        Eigenschaft dieser Methode.
      · WAHR BLEIBEN DIE ERSTEN DREI MARKEN VOLLSTÄNDIG. Die dritte gehört eigens
        geschützt: der Befund, dass die tragende Seite nicht übersehen, sondern
        AUSGESCHLOSSEN worden war. Er ist Gegenstand des Hebungs-Kandidaten 2 in
        docs/aktiver-stand.md und wird von diesem Vorbehalt in keiner Weise angetastet —
        im Gegenteil, der Lauf vom 2026-08-28 hat jenen Ausschluss-Ort eigens
        abgearbeitet.
      · DIE GRENZE: GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES
        GÜLTIGEN RUMPFES — die vier Grenzen stehen in Teil (bm) derselben Fundstelle.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt; der Doku-Lauf
      GELESEN 2026-08-28 (CC), sieben Seiten mit ausgewiesenem Umfang.

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

      VORBEHALT 2026-08-28 — VON DEN DREI ÜBRIGEN SIND ES ZWEI. Der Wortlaut oben bleibt
      unverändert stehen, EINSCHLIESSLICH DER ZAHLEN: "vier Dinge" bleibt richtig als
      Aussage über jenen Nachtrag, und "Die drei übrigen" beschreibt richtig, was am
      2026-08-25 übrig war.
      · ÜBERHOLT IST: "Die drei übrigen" als Aussage über HEUTE — es sind zwei · und darin
        der Posten "der Träger des Zugangsdatums für events:ingest". Er ist GEMESSEN
        2026-08-28, live gegen den Endpunkt: Kopfzeile Authorization, Wert "Bearer " +
        Token. Fundstelle: docs/ziel-befunde.md, Google-Abschnitt, Teile (bj) bis (bm).
      · WAHR BLEIBT: der Ablöse-Mechanismus dieses Blocks samt seiner Begründung ("statt
        zwei Stellen widersprechen zu lassen") · "das Zugangsmodell … IST ERLEDIGT" · die
        zwei verbleibenden Posten "ob x-goog-user-project Pflicht ist" und "2.000 gegen
        10.000", beide unverändert offen · der Zeitdokument-Satz am Ende über die
        Entscheidung zwischen Advertiser und Data Partner.
      · WAS DIESER BLOCK FÜR SICH SELBST FESTHÄLT, GILT JETZT EIN ZWEITES MAL: Er löst
        einen Punkt jenes Nachtrags ab, damit nicht zwei Stellen widersprechen. Dieser
        Vorbehalt tut dasselbe für einen zweiten Punkt — und aus demselben Grund.
      · DIE GRENZE: GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES
        GÜLTIGEN RUMPFES — die vier Grenzen stehen in Teil (bm) derselben Fundstelle.
      PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt.

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

      **NACHGETRAGEN AM 2026-08-27 — DIE OAUTH-EINRICHTUNG BEIM ANBIETER IST VOLLZOGEN UND
      STAND BIS HEUTE AN KEINER STELLE IM REPO.** Der Text darüber bleibt Zeichen für
      Zeichen stehen; dieser Block tritt DANEBEN. Er trägt die Einrichtung selbst, zwei
      Entscheidungen dazu und die Auflage, die aus beidem folgt.
      **DASS SIE NIRGENDS STAND, IST GEMESSEN** (CC, 2026-08-27; Achse: docs/, CLAUDE.md,
      .env.local.example, .env.local und src/, case-insensitiv nach redirect, oauth,
      callback und datamanager): Über Weiterleitungs-Adressen, über einen OAuth-Rückkehrpfad
      und über UNSER Cloud-Projekt sagte das Repo bis zu diesem Block NICHTS.
      **WAS DABEI WIE EIN TREFFER AUSSIEHT UND KEINER IST:** Die Stellen in
      docs/ziel-befunde.md und weiter oben in diesem Eintrag, die ein "Google-Cloud-Projekt"
      nennen, sind GELESENE Anbieter-Politik — Zugangsvoraussetzung und Kontingent-Decke.
      Sie benennen KEIN eingerichtetes Projekt. In einer Volltextsuche sehen die beiden
      gleich aus, und wer sie zusammenzieht, hält die Einrichtung für dokumentiert.

      **DIE EINRICHTUNG — IN DER KONSOLE GESEHEN** (OWNER, 2026-08-26): ein Cloud-Projekt
      namens `Tracking-OAuth-Dev`, darin die **Data Manager API aktiviert**, dazu ein
      OAuth-Client vom Typ **WEBANWENDUNG**.
      **NICHT DESKTOP — UND DIESE HÄLFTE IST GELESEN, NICHT GESEHEN:** Den Desktop-Typ
      empfiehlt die Anbieter-Doku für den gcloud-SCHNELLEINSTIEG — also für einen Menschen
      an einer Kommandozeile. Für unseren Fluss empfiehlt sie ihn nicht. Die Fundstelle
      liegt im eigenen Bestand: docs/ziel-befunde.md, Google-Abschnitt, Weg (1)
      NUTZERKONTO — "Desktop-OAuth2-Client anlegen … dann `gcloud auth
      application-default login`" (GELESEN 2026-08-24, /devguides/quickstart/set-up-access,
      Doku-Stand 2026-08-14).
      **DIE TRENNUNG IST KEINE FORMSACHE:** DASS der Client vom Typ WEBANWENDUNG ist, ist
      eine Beobachtung an der Konsole. WARUM nicht Desktop, ist eine GELESENE
      Anbieter-Aussage. Wer beides als Konsolen-Befund liest, hält die Begründung für
      geprüft — sie ruht auf einer Doku, die sich ändern kann, und niemand hat den
      Desktop-Typ gegen unseren Fluss probiert.

      **DIE ZWEI REGISTRIERTEN WEITERLEITUNGS-ADRESSEN, ZEICHENGENAU** (OWNER-ANGABE,
      2026-08-26):
      · http://localhost:3000/api/oauth/google/callback
      · https://pagesmith-delta.vercel.app/api/oauth/google/callback
      **ZEICHENGENAU HEISST: das Schema wörtlich (die eine ist http, die andere https), der
      Pfad wörtlich, KEIN abschliessender Schrägstrich.** Eine Adresse mit Schrägstrich ist
      eine ANDERE Adresse.
      **DER PFAD HAT HEUTE KEINE ROUTE** — GEMESSEN (CC, 2026-08-27): `src/app/api/oauth/`
      existiert nicht, src/app/api trägt ausschliesslich `capi/` und `e/`. Die Registrierung
      geht dem Code voraus; das ist kein Defekt, sondern die Reihenfolge dieser Phase.

      **ZWEI ENTSCHEIDUNGEN DAZU** (ARCHITEKT, 2026-08-26):

      **(1) DIE WEITERLEITUNGS-ADRESSE WIRD FEST GESETZT, NICHT AUS DEM ANFRAGE-HOST
      ABGELEITET.** Das ist eine BEWUSSTE ABWEICHUNG von "ABLEITEN STATT HARDCODEN"
      (docs/immer-beachten.md), und sie steht hier mit ihrem Grund, weil eine
      unbegründete Abweichung bei der nächsten Aufräumrunde als Versehen eingesammelt wird.
      **DER TRAGENDE GRUND IST DIE HOST-INVERSION: Diese Anwendung antwortet unter ZWEI
      KLASSEN VON HOSTS** — dem App-Host und den Serving-Hosts der Kundenseiten. Eine aus
      dem Anfrage-Host ABGELEITETE Weiterleitungs-Adresse entstünde im Serving-Fall unter
      publayer.net. Dort ist sie bei Google NIE REGISTRIERT, und der Anbieter gleicht
      zeichengenau ab.
      **WAS DER GRUND AUSDRÜCKLICH NICHT IST — UND DIESER SATZ IST DER WICHTIGERE VON
      BEIDEN: KEIN MISSTRAUEN GEGEN `x-forwarded-host`.** Der Wert ist auf DIESER Plattform
      BELEGT vertrauenswürdig: Vercels Edge überschreibt einen client-gelieferten
      `x-forwarded-host` mit dem echten Host — GEMESSEN auf einem echten Vercel-Preview mit
      einer curl-Matrix, in der ZWEI gefälschte Werte beide überschrieben wurden
      (docs/claude-history/phase-7-hosting.md, "### 7c-2-GATE — Ergebnis:
      XFH-Trust-Boundary in Prod BEWIESEN (GO)"); daraus die Regel "HOST-QUELLE FÜR
      APP-vs-SERVING-BRANCHING" in docs/immer-beachten.md. **Auf genau diesem Beweis ruht
      die Host-Inversion selbst.** Wer die Abweichung hier als Beleg GEGEN XFH liest,
      misstraut einem Mechanismus, der trägt — und die Ableitung wäre auch mit einem
      vollständig vertrauenswürdigen Host falsch, weil der Host dann eben KORREKT der
      Kundenseite gehörte.

      **(2) KEINE UMGEBUNGSVARIABLE DIESER SCHICHT TRÄGT EIN `NEXT_PUBLIC_`-PRÄFIX** —
      keine der drei, die weiter unten vergeben sind, und keine, die später dazukommt. Der
      Server baut die Autorisierungs-URL und braucht den Wert beim Tausch des Codes gegen
      das Zugangsdatum ohnehin serverseitig.

      **ZWEI EIGENSCHAFTEN, DIE BISHER NIRGENDS STEHEN — BEIDE SIND ARCHITEKTEN-ABLEITUNGEN
      AUS EINER OWNER-ANGABE, KEINE BEOBACHTUNGEN:**
      · **VORSCHAU-DEPLOYMENTS FUNKTIONIEREN NICHT.** Vercel vergibt je Deployment eine
        eigene Adresse; **registriert ist allein die stabile** — DAS ist die OWNER-ANGABE
        (2026-08-26). Dass daraus ein Fehlschlag folgt, ist ABGELEITET: aus der eigenen
        Adresse je Deployment, aus der Registrierung nur der stabilen und daraus, dass der
        Anbieter zeichengenau abgleicht. **NIEMAND HAT EIN VORSCHAU-DEPLOYMENT GEGEN DEN
        FLUSS PROBIERT.** Der Satz gehört ausdrücklich dazu: ohne ihn liest sich der Punkt
        in einem Jahr wie ein Versuchsergebnis.
      · **DIE BRAND-DOMAIN ZIEHT EINE DRITTE ZEILE NACH.** **`pagesmith.app` ist
        Platzhalter** — DAS ist die OWNER-ANGABE (2026-08-26). Kommt sie, muss sie in der
        Cloud-Konsole REGISTRIERT und die Umgebungsvariable UMGESTELLT werden — zwei
        Handgriffe, nicht einer. **DIE ZWEI HANDGRIFFE SIND ABGELEITET, NICHT BERICHTET:**
        sie folgen aus der Registrierungs-Pflicht und aus Entscheidung (2).

      **DIE AUFLAGE, UND SIE IST DER GRUND, WARUM DIESER BLOCK ÜBERHAUPT EXISTIERT: DAS IST
      EIN EXTERNER ZUSTAND, DEN NICHTS IM CODE BINDET.** Was registriert ist, steht in der
      Cloud-Konsole, nicht im Repo. Läuft die Konsole vom Repo weg, wird NICHTS rot — kein
      Gate, kein Test, kein Build meldet etwas. Der Anbieter gleicht die Adresse
      ZEICHENGENAU ab.
      **ES IST DIESELBE KLASSE WIE DAS `onConflict`-LITERAL UND DIE `domains`-ZEILE:** ein
      Wert, dessen Gegenstück ausserhalb des Codes liegt und den kein Gate abgleicht.

      **DIE DREI UMGEBUNGSVARIABLEN — VERGEBEN AM 2026-08-27** (ARCHITEKT), zeichengenau:
      `GOOGLE_OAUTH_CLIENT_ID` · `GOOGLE_OAUTH_CLIENT_SECRET` · `GOOGLE_OAUTH_REDIRECT_URI`.
      **DASS BIS ZU DIESEM BLOCK KEIN SOLCHER NAME IM REPO EXISTIERTE, IST GEMESSEN** (CC,
      2026-08-27; Achse: `.env.local.example`, `.env.local`, alle `process.env`-Zugriffe in
      src/ sowie docs/, case-insensitiv nach redirect, oauth, callback, datamanager): **kein
      Treffer.** `.env.local.example` führte acht Namen — NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_HOSTING_DOMAIN, NEXT_PUBLIC_ABUSE_CONTACT, SECRET_ENC_KEYS und
      SECRET_ENC_ACTIVE_KEY_ID —, keiner davon trug eine Weiterleitungs-Adresse. **DIE
      MESSUNG BLEIBT STEHEN, WEIL SIE DER BELEG IST, DASS DIE DREI NAMEN NICHTS
      ÜBERSCHRIEBEN HABEN** — ein neuer Name, der still einen bestehenden verdrängt, fällt
      sonst niemandem auf.

      **KEINER DER DREI TRÄGT `NEXT_PUBLIC_` — AUCH DIE CLIENT_ID NICHT, OBWOHL SIE KEIN
      GEHEIMNIS IST** (Entscheidung (2) oben). Der Server baut die Autorisierungs-URL
      ohnehin, im Client wird der Wert nie gebraucht. Und
      ein `NEXT_PUBLIC_`-Wert wird zur BUILD-ZEIT ins Bundle inlined — jede Änderung
      erzwingt dann einen REDEPLOY (docs/immer-beachten.md, "NEXT_PUBLIC_-REDEPLOY-PFLICHT").
      Das wäre ein Preis ohne Gegenleistung.

      **`GOOGLE_OAUTH_` UND NICHT `GOOGLE_DATAMANAGER_`, WEIL DER OAUTH-CLIENT AM
      CLOUD-PROJEKT HÄNGT UND NICHT AN DER API.** Dasselbe Client-Paar autorisiert, was in
      `Tracking-OAuth-Dev` liegt; ein API-Name behauptete eine Bindung, die es nicht gibt.
      **DIE GRENZE GEHÖRT DAZU, sonst altert der Name still:** Bekommt ein späteres Vorhaben
      ein EIGENES Cloud-Projekt, ist `GOOGLE_OAUTH_` zu unspezifisch und ist umzubenennen.
      Das ist kein Auftrag und keine Vorsorge, sondern die benannte Bedingung, unter der der
      Name aufhört zu passen.

      **`GOOGLE_OAUTH_CLIENT_SECRET` IST EIN ANWENDUNGS-GEHEIMNIS — EINES FÜR ALLE KUNDEN,
      KLASSE `SUPABASE_SERVICE_ROLE_KEY`.** Es gehört ausdrücklich NICHT nach
      `project_secrets` und wird NICHT über `src/lib/secrets/cipher.ts` abgelegt: Dort
      liegen KUNDEN-Zugangsdaten, und der Chiffrier-Schlüssel läge daneben — das Geheimnis,
      das die Anwendung ausmacht, im selben Speicher wie das, was sie für andere verwahrt.

      **`GOOGLE_OAUTH_REDIRECT_URI` TRÄGT JE UMGEBUNG EINEN ANDEREN WERT:** lokal die
      localhost-Zeile, in Vercel die pagesmith-delta-Zeile; beide stehen oben zeichengenau.
      **DAMIT IST DER WERT IN VERCEL EIN ZWEITER EXTERNER ZUSTAND NEBEN DER CLOUD-KONSOLE.**
      Auch ihn bindet nichts im Code, und die Auflage darüber gilt ihm unverändert: Läuft er
      vom Repo weg, wird nichts rot.

      **PROVENIENZ DIESES BLOCKS, je Teil:** **OWNER-ANGABE vom 2026-08-26** sind: das
      Cloud-Projekt samt aktivierter API und dem Client-Typ WEBANWENDUNG (in der Konsole
      gesehen) · die zwei Adressen · dass allein die stabile Adresse registriert ist · dass
      `pagesmith.app` Platzhalter ist. **GELESEN** ist die Anbieter-Empfehlung, die den
      Desktop-Typ dem gcloud-Schnelleinstieg zuordnet — sie ist NICHT in der Konsole
      beobachtet; ihre Fundstelle steht oben. **ARCHITEKTEN-ABLEITUNG** sind die zwei
      Eigenschaften — dass Vorschau-Deployments nicht funktionieren und dass die
      Brand-Domain zwei Handgriffe nach sich zieht. **KEINE DER BEIDEN IST PROBIERT
      WORDEN.** Die zwei Entscheidungen sind
      **ARCHITEKTEN-ENTSCHEIDUNG vom 2026-08-26**. Die Auflage und ihre Einordnung in die
      Klasse der extern gehaltenen Zustände sind **ARCHITEKTEN-EINORDNUNG**, in dieser Runde
      niedergeschrieben. Die drei Nicht-Treffer — keine Angabe im Repo, keine Route unter
      `src/app/api/oauth/`, und BIS ZU DIESEM BLOCK keine Umgebungsvariable dieser Art —
      sind **GEMESSEN am Repo (CC, 2026-08-27)**. **KEINE MESSUNG an einer
      Google-Schnittstelle**, weder durch CC noch in diesem Block behauptet; es ist kein
      Aufruf gefahren worden.
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

      NACHTRAG 2026-09-08 — EINE OFFENE BERÜHRUNG AUS DER PHASE 11.2, HIERHER GEGEBEN.
      Der Wortlaut darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Nachtrag tritt
      DANEBEN.
      WOHER ER KOMMT: aus der Rest-Liste im NACHTRAG 2026-09-08 der Roadmap-Zeile 11.2,
      Posten (7). Er ist beim Phasenende der Phase 11.2 hierher gegeben worden und NICHT
      nach docs/offene-punkte.md — der Posten sagt selbst, "die Entscheidung gehört zu
      11.5 und wird hier nicht getroffen". EIN OFFENER PUNKT WÄRE DER FALSCHE ORT: Er
      wartet auf einen Trigger; diese Frage wartet auf eine ENTSCHEIDUNG, und die fällt
      hier.
      DIE FRAGE, WÖRTLICH: Ob der Hybrid-Ausschluss dieser Zeile ("AUSDRÜCKLICH NICHT IN
      DIESER PHASE … EIN Ziel als Hybrid aus Browser-Tag und Server-Forward, die übrigen
      als reiner Server-Fan-Out") von Google berührt ist, hängt an der unbeantworteten
      Frage, WESSEN Tag die "bestehende Tag-Conversion" ist.
      WARUM DAS DIESE ZEILE TRIFFT UND NICHT 11.2: Die für Google gewählte Gestalt — der
      OFFLINE CONVERSION IMPORT — schliesst ein von Pagesmith ausgeliefertes Google-Tag
      ausdrücklich aus. Die NICHT gewählte Gestalt (Multi-Source) setzt eine bestehende
      Tag-Conversion voraus. Ist jenes Tag das des KUNDEN, ändert sich am Hybrid-Ausschluss
      nichts; ist es eines, das Pagesmith ausliefern müsste, wäre Google ein zweites
      Hybrid-Ziel — und genau das schliesst diese Zeile heute aus.
      DER BEFUND DAZU IST BEREITS ABGELEGT UND WIRD NICHT NEU ERHOBEN, und dieser Satz ist
      der eigentliche Zweck des Nachtrags: docs/ziel-befunde.md, Google-Abschnitt, Block
      "WAS AUSDRÜCKLICH OFFEN BLEIBT", führt wörtlich "OB EINE BESTEHENDE TAG-CONVERSION IM
      KUNDENKONTO VORAUSGESETZT IST UND WIE SIE DORTHIN KOMMT" — mit dem Zusatz, dass
      ungeprüft ist, "ob ein Kunde auf einer von Pagesmith ausgelieferten Seite ein eigenes
      Google-Tag unterbringen kann, und ob Pagesmith eines ausliefern müsste. KEINE
      EMPFEHLUNG, KEINE ANTWORT." WER DIESEN ZEIGER NICHT HAT, SUCHT EINEN BEFUND, DEN ES
      SCHON GIBT.
      KEINE EMPFEHLUNG, wie zu entscheiden wäre, und AUSDRÜCKLICH KEINE Aussage darüber,
      ob der Hybrid-Ausschluss zu ändern ist.
      PROVENIENZ: der Posten stammt aus der Rest-Liste der Zeile 11.2 (ARCHITEKT,
      2026-09-08); der Befund in docs/ziel-befunde.md ist GELESEN 2026-08-20. Dass beide
      dieselbe Frage tragen, ist GEMESSEN am Dateitext (CC, 2026-09-08). KEINE Messung an
      einer Google-Oberfläche.
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
- [ ] Phase 11.9 — GA4 als SECHSTES Fan-Out-Ziel: eine EIGENE Zeile, abgetrennt vom
      Eintrag 11.2 am 2026-09-08.

      WARUM SIE EINE EIGENE ZEILE IST UND KEIN ABSCHNITT VON 11.2: Google Ads
      Conversions und GA4 sind ZWEI ADAPTER MIT VERSCHIEDENEN ZUGANGSMODELLEN, nicht
      zwei Varianten eines. Der eine braucht die Autorisierungsschicht, der andere
      kommt mit zwei Skalaren aus. DIESE AUSSAGE IST NICHT NEU — sie steht seit dem
      2026-08-20 im Eintrag 11.2 selbst; die Trennung vollzieht sie, sie erfindet sie
      nicht.

      DIE ZAHL IM TITEL IST GEMESSEN UND NICHT GESCHÄTZT (CC, 2026-09-08): TRACKING_TARGETS
      (src/lib/settings.ts) führt heute FÜNF Ziele — meta · pinterest · tiktok · linkedin ·
      google. GA4 wäre damit das SECHSTE. WER HIER "FÜNFTES" SCHREIBT, VERGIBT EINE
      ORDINALZAHL ZWEIMAL: 'google' trägt sie bereits, und src/lib/tracking/target-adapters.ts
      nennt es an seiner Zeile wörtlich "DAS FUENFTE ZIEL".

      DER STAND, IN EINEM SATZ: GA4 IST IN DIESEM REPO NIE ÜBER DIE BESCHREIBUNG
      HINAUSGEKOMMEN — keine Messung, keine Gestalt-Entscheidung, kein Vorbehalt, kein
      Zuschnitt (GEMESSEN am Repo, CC, 2026-09-08). Im Produktivcode gibt es GENAU EINE
      GA4-Stelle, und sie ist eine Abgrenzung: der Docblock von buildIngestEventsRequest
      (src/lib/capi/google-payload.ts) hält fest, `eventName` sei "fuer Google Ads
      optional, Pflicht nur fuer GA4".

      WO DER WORTLAUT STEHT — DREI STELLEN IM EINTRAG 11.2, ALS ZEIGER UND NICHT ALS
      KOPIE: (1) der KOPFSATZ jenes Eintrags, Satz "Es sind ZWEI Ziele, nicht eins";
      (2) derselbe Kopfsatz, Halbsatz zum GA4-Weg ("verlangt eine Besucher-Kennung aus
      einem Cookie, das dieses Produkt nicht setzt"); (3) der RICHTIGSTELLUNGS-BLOCK vom
      2026-08-20, zweiter Spiegelstrich ("RICHTIG, ABER OHNE GRUND"). SIE BLEIBEN DORT
      UND WERDEN HIER NICHT WIEDERHOLT — zweimal geschrieben liefen sie auseinander.

      DIE ZWEI BEKANNTEN VORBEDINGUNGEN, beide aus jenem Kopfsatz:
      · DIE BESUCHER-KENNUNG. Der GA4-Weg verlangt sie aus einem Cookie, DAS DIESES
        PRODUKT NICHT SETZT. Ohne eine Entscheidung darüber gibt es keinen Zuschnitt.
      · DIE DATENKLASSEN-GRENZE IST BERÜHRT. Eine Besucher-Kennung aus einem
        First-Party-Cookie ist nach dem Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN
        PII-SCHEIBE" (docs/offene-punkte.md) ein fingerprint-artiges Merkmal und löst
        dieselbe Grenze aus. DIE DRITTE DATENKLASSE VOM 2026-08-28 DECKT DAS NICHT: Sie
        gilt fremdvergebenen KLICK-Kennungen, nicht einer selbst gesetzten
        Besucher-Kennung. WER SIE HIER ANWENDET, WENDET SIE AUF EINE ANDERE KLASSE AN.

      DER ZIELSCHLÜSSEL IST EINE OFFENE FRAGE, UND SIE IST KEINE FOLGE DIESER TRENNUNG:
      Der Fan-Out-Schlüssel heisst heute 'google' — src/lib/settings.ts (TRACKING_TARGETS)
      und supabase/migrations/0026_project_secrets_google.sql (der CHECK auf
      project_secrets). EIN ZWEITES GOOGLE-ZIEL BRAUCHT EINEN EIGENEN SCHLÜSSEL ODER
      KOLLIDIERT MIT DIESEM. Der Eintrag 11.2 sagt seit dem 2026-08-20 selbst, dass es zwei
      Adapter sind; die Trennung macht die Folge daraus SICHTBAR, sie erzeugt sie nicht.
      KEINE EMPFEHLUNG, wie der Schlüssel heissen soll — das ist eine eigene Entscheidung,
      und sie zieht nach der Regel "JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE
      CONSTRAINT-ERWEITERUNG MIT" (docs/immer-beachten.md) eine eigene Migration nach sich.

      WAS DIESE ZEILE AUSDRÜCKLICH NICHT TUT: Sie schneidet nichts zu, sie terminiert
      nichts, und sie sagt nicht, ob GA4 überhaupt gebaut wird.

      PROVENIENZ: DIE TRENNUNG IST OWNER-ENTSCHEIDUNG (2026-09-08) — keine Messung, eine
      FESTLEGUNG. Die Zahl SECHS, die eine GA4-Stelle im Produktivcode und der Zielschlüssel
      an seinen zwei Orten sind GEMESSEN am Repo (CC, 2026-09-08). Die zwei Vorbedingungen
      und die drei Zeiger sind GELESEN im Eintrag 11.2 (CC, 2026-09-08). Dass die dritte
      Datenklasse eine Besucher-Kennung nicht deckt, ist eine ABLEITUNG aus ihrem
      Gegenstand, keine Messung.
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
