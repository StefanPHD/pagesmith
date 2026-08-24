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
