# ZIEL-BEFUNDE — was über die Schnittstellen der Fan-Out-Ziele gemessen und gelesen ist

**WAS DIESE DATEI IST:** Die gemessenen und gelesenen Befunde je Fan-Out-Ziel — wie die
Schnittstelle des Anbieters sich TATSÄCHLICH verhält: welche Felder sie verlangt, was sie
ablehnt, was sie stillschweigend annimmt, welche Statuscodes und Rumpfformen sie kennt,
und mit welchem Instrument sich das live nachprüfen lässt.

**WAS SIE NICHT IST:** Sie trägt KEINE Regeln — die stehen in docs/immer-beachten.md. Sie
trägt KEINE Entscheidungen und KEINE Auflagen — die stehen an der jeweiligen
Roadmap-Zeile in CLAUDE.md. Und sie ist KEIN Zuschnitt: sie sagt, was ist, nicht was zu
bauen ist. Wer hier eine Regel oder eine Entscheidung einträgt, macht aus einem Befund
eine Vorgabe, die niemand beschlossen hat.

**DER AUSLÖSER — sie lädt NICHT automatisch:** Wer an einem Fan-Out-Ziel arbeitet, lädt
sie ZUERST: Zuschnitt, Adapter, Anbieter-Recherche oder Live-Test-Anleitung. Wer ohne sie
recherchiert, erhebt ein zweites Mal, was hier schon steht — und wer ohne sie eine
Live-Test-Anleitung schreibt, nennt womöglich eine untaugliche Sonde.

**PROVENIENZ-PFLICHT AN JEDER ANGABE, ohne Ausnahme:** GEMESSEN (mit Datum und
Instrument) · GELESEN (mit Quelle und Datum) · FOLGERUNG (als solche gekennzeichnet).
Eine Angabe ohne Provenienz ist hier nicht schreibbar. Keine Angabe wird von GELESEN auf
GEMESSEN gehoben, weil sie plausibel klingt oder weil ein anderes Ziel live bewiesen ist.

**SIE WIRD NICHT ARCHIVIERT:** Anders als eine Standdatei (docs/aktiver-stand.md) gehört
sie keiner Phase. Ein Anbieter-Befund überlebt die Phase, in der er erhoben wurde — er
gilt, bis der Anbieter sein Verhalten ändert, und dann wird er neu gemessen, nicht
weggeräumt.

**FORTSCHREIBUNG:** Je Ziel ein eigener Abschnitt. Neue Ziele werden HINTEN angefügt,
nichts wird umsortiert, nichts neu nummeriert. Ein neuer Abschnitt bekommt eine Zeile im
Verzeichnis darunter — wörtlich, nicht beschrieben.

**FORTSCHREIBUNG, ZWEITER FALL — EIN WEITERES MESSPROTOKOLL IN EINEM BESTEHENDEN
ZIEL-ABSCHNITT** (Konvention angewandt und niedergeschrieben am 2026-08-17, als das
zweite LinkedIn-Protokoll dazukam): Wird zu einem Ziel ERNEUT gemessen, entsteht KEIN
neuer Ziel-Abschnitt und kein zweiter Eintrag im Verzeichnis — das Verzeichnis führt
Ziele, nicht Protokolle. Statt dessen kommt HINTEN im bestehenden Ziel-Abschnitt eine
eigene, DATIERTE Unterüberschrift dazu, die ihre Herkunft (Instrument, Zahl der Läufe,
Bedingungen des Laufs) im Kopf nennt.
DIE BUCHSTABEN LAUFEN ÜBER ALLE PROTOKOLLE EINES ZIELS FORT UND BEGINNEN NIE NEU. GRUND,
und er ist der ganze Punkt dieser Konvention: Auf die Buchstaben wird von AUSSEN verwiesen
— aus CLAUDE.md und aus docs/claude-history/backlog-polish.md —, und diese Verweise nennen
den Buchstaben, nicht das Datum. Ein zweites "(a)" im selben Ziel-Abschnitt macht jeden
dieser Verweise mehrdeutig, ohne dass irgendwo etwas rot wird.
EIN ÄLTERER TEIL WIRD DABEI NICHT UMGESCHRIEBEN: Widerlegt oder ergänzt ein neues
Protokoll einen alten Teil, bleibt dessen Wortlaut stehen und bekommt einen VORBEHALT, der
auf den neuen Buchstaben zeigt (Muster: der Vorbehalt an (b), der auf (i) zeigt).

**WAS NACH (z) KOMMT — DOPPELBUCHSTABEN: (aa), (ab), (ac) … BIS (az), DANN (ba)**
(Konvention entschieden und niedergeschrieben am 2026-08-25, als der Google-Abschnitt mit
dem dritten Lauf über (z) hinauswuchs). SIE SETZT DIE KONVENTION DARÜBER FORT UND ERSETZT
SIE NICHT: Jene sagt, DASS die Buchstaben über alle Protokolle eines Ziels fortlaufen und
nie neu beginnen — diese sagt, WIE sie fortlaufen, wenn das Alphabet zu Ende ist.
DIE FORM: Auf (z) folgt (aa), dann (ab), (ac) und so fort bis (az). NACH (az) KOMMT (ba),
dann (bb). Der Satz über (az) steht hier ausdrücklich, damit dieselbe Frage dort nicht ein
zweites Mal gestellt werden muss — sie ist einmal beantwortet, nicht einmal je Grenze.
SIE GILT FÜR JEDES ZIEL, NICHT NUR FÜR GOOGLE. Pinterest und LinkedIn laufen auf dieselbe
Grenze zu; eine Konvention, die nur den ersten Fall regelt, ist beim zweiten wieder eine
offene Frage.
VIER FORMEN SIND ERWOGEN UND ABGELEHNT WORDEN. Die Ablehnungen stehen hier, weil sie sonst
beim nächsten Mal neu verhandelt werden:
· (a2), (b2) — ABGELEHNT WEGEN DER EINZIGEN REPO-PRÄZEDENZ, NICHT TROTZ IHR: (d2) in
  docs/claude-history/backlog-polish.md bezeichnet eine EINFÜGUNG zwischen (d) und (e).
  Dieselbe Form für einen unabhängigen NEUEN Teil zu benutzen, gäbe ihr die gegenteilige
  Bedeutung.
· Zahlen ab (27) — ABGELEHNT: zwei Notationen in einem Abschnitt, und (1), (2) sind in
  diesen Dateien als Aufzählungsform bereits vergeben.
· EIN ZWEITER Ziel-Abschnitt für dasselbe Ziel, der wieder bei (a) beginnt — ABGELEHNT: Er
  bräche "Je Ziel ein eigener Abschnitt" und machte jedes bestehende Zitat der Form
  "Google-Abschnitt, Teil (x)" mehrdeutig.
· TITEL-ANKER statt Buchstaben — ABGELEHNT: längere Anker, die sich leichter ändern als ein
  Buchstabe.
ZUR SUCHBARKEIT, weil der Einwand naheliegt und falsch ist: Ein Suchmuster "(a)" MIT BEIDEN
KLAMMERN trifft "(aa)" NICHT. Die formale Suche unterscheidet die beiden, sofern beide
Klammern im Muster stehen — und die Verweis-Regel unten verlangt ohnehin ABSCHNITT PLUS
BUCHSTABEN, nicht den Buchstaben allein.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25. Der Befund, dass es bis dahin WEDER eine Regel
NOCH eine tragfähige Präzedenz gab, ist GEMESSEN am Repo (CC, 2026-08-25; Achse: *.md,
*.ts, *.tsx und *.sql ohne node_modules, Muster für Doppelbuchstaben- und Ziffernformen,
dazu eine Volltextsuche dieser Datei nach einer Erschöpfungs-Regel — zwei Treffer, beide
unbeteiligt). EINE LÜCKE DER MESSUNG GEHÖRT DAZU: docs/arbeitsweise.md ist NICHT
durchsucht worden, weil CLAUDE.md CC das Lesen jener Datei untersagt.

**EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND BUCHSTABEN — NIE DEN BUCHSTABEN ALLEIN**
(Konvention niedergeschrieben am 2026-08-20, als der zweite Ziel-Abschnitt dazukam). SIE
ERWEITERT DIE KONVENTION DARÜBER UND ERSETZT SIE NICHT: Jene bindet die Eindeutigkeit der
Buchstaben an den ZIEL-ABSCHNITT ("Ein zweites (a) im selben Ziel-Abschnitt macht jeden
dieser Verweise mehrdeutig") — über Ziel-Abschnitte hinweg dürfen sie sich also
wiederholen, und ein neuer Ziel-Abschnitt beginnt wieder bei (a).
DER GRUND, und er ist seit dem 2026-08-20 nicht mehr theoretisch: Es gibt dieselben
Buchstaben MEHRFACH in dieser Datei. Ein Verweis, der nur "(b)" nennt, zeigt damit auf
mehr als eine Stelle.
DIE FOLGE: Jeder Verweis von aussen — aus CLAUDE.md, aus docs/claude-history/* — nennt den
ABSCHNITT und den Buchstaben.
DIE GRENZE, DIE MITMUSS: Diese Konvention gilt für KÜNFTIGE Verweise. Die bestehenden sind
am 2026-08-20 NICHT nachgezogen worden; ob und wann das geschieht, ist hier nicht
entschieden. Was still kaputtgeht, wenn es unterbleibt: Ein alter Verweis wird mehrdeutig,
sobald ein zweiter Abschnitt seinen Buchstaben vergibt — und kein Werkzeug meldet das.

## Verzeichnis der Abschnitte

- ## LinkedIn (Conversions API)
- ## Google (Google Ads Conversions · GA4)
  - ### Abschnitts-Lesung 2026-08-24 der Data-Manager-Dokumentation, LAUF 1 (Leitfaden und
    Betrieb) — die Teile (g) bis (s)
  - ### Acht Fragen ohne Katalog-Ort (2026-08-24)
  - ### Abschnitts-Lesung 2026-08-24 der Data-Manager-Dokumentation, LAUF 2 (die Referenz)
    — die Teile (t) bis (z)
  - ### Abschnitts-Lesung 2026-08-25 der OAuth- und Google-Ads-Politik-Dokumentation,
    LAUF 3 — die Teile (aa) bis (ai)
  - ### Abschnitts-Lesung 2026-08-25 der Data-Manager-Politik, LAUF 4 — die Teile (aj)
    bis (as)
  - ### Abschnitts-Lesung 2026-08-27 der OAuth-2.0-Dokumentation für
    Webserver-Anwendungen, LAUF 5 — die Teile (at) bis (ay)
  - ### Abschnitts-Lesung 2026-08-27 der OAuth-2.0-Dokumentation, LAUF 6 (die ANTWORTSEITE
    des Token-Tauschs) — die Teile (az) bis (bg)
  - ### Zugespitzter Doku-Lauf 2026-08-28 (LAUF 7) und MESSUNG A gegen events:ingest — die
    Teile (bh) bis (bm)
  - ### MESSUNG B1 gegen events:ingest (2026-08-28) — die Teile (bn) bis (bu)
  - ### MESSUNG C gegen den Token-Endpunkt (2026-08-28) — die Teile (bv) bis (bz)
- ## Pinterest (Conversions API)

**EINE ASYMMETRIE, DIE MIT DEM EINTRAG VOM 2026-08-24 ENTSTANDEN IST UND HIER BENANNT
STATT AUFGELÖST WIRD:** Dieses Verzeichnis führte bis dahin AUSSCHLIESSLICH die drei
`##`-Ziel-Abschnitte. Die beiden `###`-Zeilen darüber sind die ERSTEN Unterabschnitte
darin — die rund fünfzehn übrigen (Messprotokolle, Nachträge, Abschnitts-Lesungen bei
LinkedIn und Pinterest) stehen NICHT hier. Wer das Verzeichnis als vollständige Liste der
Unterabschnitte liest, liest falsch. OB DIE ÜBRIGEN NACHGEZOGEN WERDEN, IST HIER NICHT
ENTSCHIEDEN und war nicht Gegenstand des Eingriffs.

## LinkedIn (Conversions API)

**HERKUNFT DER MESSUNG (2026-08-15)** — der Kopf des Messprotokolls, wortgleich aus der
Roadmap-Zeile 11.1 hierher gezogen: MESS-BLOCK 2026-08-15 — DIE ERSTE GEMESSENE GRUNDLAGE
ZU DIESEM ZIEL: sieben Läufe gegen die echte Conversions-Schnittstelle des Anbieters,
ausgeführt vom Owner im Terminal mit einem gültigen Zugangsdatum; die Rohprotokolle mit
Status, Kopfzeilen und Rümpfen lagen der Runde vor. ALLES ÜBRIGE IN DIESER ZEILE BLEIBT
GELESEN — diese Messung wertet keine andere Angabe auf, ausser wo unten ausdrücklich
etwas anderes steht. Jeder Teil nennt seine Provenienz; wo etwas GEFOLGERT ist, steht es
als FOLGERUNG und nicht als Messwert.

**WAS AN DER ROADMAP-ZEILE 11.1 GEBLIEBEN IST und hier bewusst NICHT steht:** die
Richtigstellung der Identitäts-Angabe (eine Richtigstellung gehört dorthin, wo die
falsche Angabe stand), die PII-Bindung an "DATENKLASSEN-GRENZE VOR DER ERSTEN
PII-SCHEIBE", der fehlende Datenpfad, die externe Blockade, die beiden Auflagen für jedes
weitere Ziel, die Richtigstellung vom 2026-08-14 mit ihrem Vorbehalt und die offene
Vorfrage. Das sind Auflagen, Bindungen und Entscheidungen — nicht Befunde.

### Anbieter-Befunde, GELESEN an FREMDER Anbieter-Doku (2026-08-11)

WEITERE ABWEICHUNGEN: Zeit in MILLISEKUNDEN (Meta: Sekunden) · Betrag als Zeichenkette ·
Erfolg ist 201 · DREI Fehlerwege mit ZWEI Rumpfformen · ein Versions-Header, dessen Wert
ein Datum ist und der abgeschaltet wird · kein Testmodus gefunden — ein NICHT-TREFFER,
KEIN Beweis der Abwesenheit.

(DIE IDENTITÄTS-ANGABE STAND BIS ZUM 2026-08-15 IN DIESER AUFZÄHLUNG und ist dort
GESTRICHEN, weil sie gemessen widerlegt ist — Wortlaut und Richtigstellung stehen an der
Roadmap-Zeile 11.1, der gemessene Befund unten unter (a).)

PROVENIENZ: GELESEN an FREMDER Anbieter-Doku (2026-08-11) — NICHT gemessen, NICHT live
bestätigt. Dass TikTok als drittes Ziel live bewiesen ist, WERTET DAS NICHT AUF; wer das
verwechselt, plant einen Bau auf einer Doku-Lesung.

### Messprotokoll 2026-08-15 — die Teile (a) bis (h)

Die Buchstaben sind die des Messprotokolls und bleiben unverändert, damit die Verweise
darauf (aus CLAUDE.md und aus docs/claude-history/backlog-polish.md) treffen.

(a) DIE IDENTITÄTS-FORM — GEMESSEN: Ein Feld für eine IP-Adresse EXISTIERT NICHT — die
    Schnittstelle antwortet "unrecognized field found but not allowed". Verlangt wird ein
    PAAR aus Kennungs-TYP und Kennungs-WERT, BEIDE Pflicht.
    DIE RICHTIGSTELLUNG DAZU STEHT NICHT HIER, sondern an der Roadmap-Zeile 11.1: dort
    stand die widerlegte Angabe, und dort sucht sie, wer den alten Satz kennt.

(b) WELCHE KENNUNGS-TYPEN ERLAUBT SIND — GELESEN an der Anbieter-Doku (2026-08-15), NICHT
    gemessen: eine gehashte E-Mail-Adresse, eine anbietereigene Cookie-Kennung sowie
    Partner-Kennungen. GEMESSEN ist ALLEIN, dass die gehashte E-Mail ANGENOMMEN wird (ein
    Lauf, 201).
    NICHT ALS LISTE GEMESSEN: Der Lauf, der die erlaubten Werte über eine Fehlermeldung
    erzwingen sollte, ergab statt einer Liste eine Erfolgsantwort (s. (e)) —
    NICHT-TREFFER, KEIN Beweis der Abwesenheit einer Liste.
    VORBEHALT (2026-08-17) — DIESE AUFZÄHLUNG IST UNVOLLSTÄNDIG: Eine erneute Lesung
    derselben Anbieter-Doku nennt FÜNF Symbole; die drei oben sind darin enthalten, zwei
    weitere fehlen hier — eine KLARTEXT-IP-ADRESSE und eine Klick-Kennung des Anbieters.
    Die Klartext-IP ist seither auch GEMESSEN angenommen worden. Der Wortlaut oben wird
    NICHT umformuliert und NICHT gekürzt: er sagt, was am 2026-08-15 gelesen wurde. Die
    vollständige Liste, ihre Provenienz und der gemessene Anteil daran stehen unten unter
    (i).
    VORBEHALT (2026-08-19) — DIE TYP-LISTE IST UNBERÜHRT, DIE UMGEBENDE NUTZLAST NICHT:
    Die FORM, in der das Kennungs-Paar reist, und die übrigen Felder desselben Aufrufs
    sind erst am 2026-08-19 erhoben worden; s. unten (n). An der Liste der Symbole und
    an ihrer Provenienz ändert das nichts.

(c) DIE KENNUNG DER CONVERSION-REGEL WIRD BEIM AUFRUF AUFGELÖST (GEMESSEN): Eine gültige
    Nutzlast mit einer NICHT existierenden Regel-Kennung ergibt 403 mit dem Rumpf
    {"message":"No ad accounts found","status":403}.
    FOLGERUNG, NICHT GEMESSEN: Diese Meldung zeigt den Betreiber in die FALSCHE Richtung —
    sie klingt nach fehlendem Kontozugriff, während in Wahrheit die Kennung falsch ist,
    und sie ist mehrdeutig, weil derselbe Status auch bei nicht vergebenen Berechtigungen
    auftritt. Ein Adapter, der diese Antwort unübersetzt durchreicht, erzeugt eine
    Fehlersuche am falschen Ende.

(d) DIE ERFOLGSANTWORT TRÄGT KEINEN RÜCKKANAL (GEMESSEN): Erfolg ist 201 mit LEEREM Rumpf
    (Content-Length: 0); die Kopfzeile, die auf die angelegte Ressource zeigt, trägt einen
    internen Objektbezeichner der Anbieter-Laufzeit und KEINE Ereignis-Kennung.
    FOLGERUNG, NICHT GEMESSEN: Es kommt keine Kennung zurück, an der sich ein Ereignis
    später wiedererkennen liesse. Die Deduplizierung dieses Produkts über eine GETEILTE
    Ereignis-Kennung zwischen Browser und Server lässt sich auf dieses Ziel NICHT
    ausdehnen.
    DASS DAS EINE PRODUKTZUSAGE KIPPT, steht als EIN Satz an der Roadmap-Zeile 11.1 —
    hier steht der Befund, dort seine Folge für den Zuschnitt.
    VORBEHALT (2026-08-19) — DER GEMESSENE TEIL HÄLT, DIE FOLGERUNG NICHT: Der Befund
    oben (201, leerer Rumpf, keine Ereignis-Kennung in der Antwort) ist UNBERÜHRT und
    bleibt gemessen. Die FOLGERUNG darunter ruht darauf, dass eine Deduplizierung einen
    RÜCKKANAL braucht — und die SENDESEITE ist seit dem 2026-08-19 gemessen: das Feld
    für eine mitgegebene Ereignis-Kennung EXISTIERT und wird angenommen, s. unten (p).
    Der Wortlaut oben wird NICHT umformuliert; was von der Folgerung bleibt und was
    fällt, steht bei (p).

(e) DIE NUTZLAST-SEMANTIK WIRD NICHT GEPRÜFT, DIE STRUKTUR SCHON (GEMESSEN): Ein
    erfundener Währungscode bei sonst gültiger Nutzlast ergibt 201 Created — es kommt
    WEDER eine Ablehnung NOCH eine Liste erlaubter Werte.
    FOLGERUNG, NICHT GEMESSEN: Eine falsch konfigurierte Währung erzeugt eine
    ERFOLGSQUITTUNG. Der Betreiber bekommt kein Signal, und der Wert ist entweder
    unbrauchbar oder verfällt. DAS IST DER STILLE FEHLZUSTAND DIESES ZIELS — er sitzt
    NICHT bei der ANNAHME des Ereignisses, sondern in dessen INHALT. Backlog-Kandidat
    dazu: backlog-polish.md, "EINE FREMDE SCHNITTSTELLE KANN DIE STRUKTUR EINER NUTZLAST
    PRÜFEN UND IHRE BEDEUTUNG NICHT".

(f) DREI FEHLERWEGE, ZWEI RUMPFFORMEN (GEMESSEN) — bestätigt die bisher GELESENE
    Erwartung, jetzt gemessen: ungültiges Zugangsdatum -> 401 mit einem Rumpf aus VIER
    Feldern (Status, ein dienstinterner Fehlercode, ein symbolischer Code, eine Meldung);
    fehlendes Pflichtfeld bzw. unbekanntes Feld -> 422 mit ZWEI Feldern (Meldung, Status),
    wobei die Meldung MEHRZEILIG ist und je Zeile den Pfad des beanstandeten Feldes nennt;
    nicht auflösbare Regel-Kennung -> 403 mit denselben zwei Feldern. Der Pflichtfeld-
    Fehler ist EINZELN gemessen: fehlt der Zeitstempel, nennt die Meldung genau diesen
    Pfad.
    VORBEHALT (2026-08-19) — DIE ZAHLEN WAREN FÜR DEN DAMALIGEN STAND RICHTIG UND SIND
    ES ALS AUSSAGE ÜBER JENE SIEBEN LÄUFE WEITERHIN: Gemessen sind inzwischen MEHR Wege
    und mindestens eine weitere Rumpfform — zwei Wege mit Status 400, einer davon mit
    einem Feld, das in keiner der drei Formen oben vorkommt. Die Aufstellung samt der
    Frage, nach welchem Kriterium hier gezählt wird, steht unten unter (s). Der Wortlaut
    oben wird NICHT umformuliert.

(g) KEIN ZUGANGSDATUM IM ANTWORTRUMPF (GEMESSEN, NICHT-TREFFER): In keinem der sieben
    Läufe wurde ein gesendetes Zugangsdatum zurückgespiegelt; geprüft wurde mit einem
    ERFUNDENEN, formgleichen Wert, nie mit dem echten.
    AUSDRÜCKLICH: ein Nicht-Treffer auf DIESEM Pfad, KEIN Beweis für alle Pfade dieses
    Anbieters.

(h) DAS TAUGLICHE LIVE-TEST-INSTRUMENT (GEMESSEN): Die Conversions-Zählung in der
    Betreiber-Oberfläche stand nach einem NACHWEISLICH angenommenen Ereignis weiterhin auf
    null; die Empfangsanzeige an der Conversion-Regel meldete dagegen einen soeben
    eingegangenen Datenpunkt.
    FOLGERUNG, NICHT GEMESSEN: Die Zählung ist eine UNTAUGLICHE SONDE — sie steigt erst
    bei einer Zuordnung zu einer echten Person, die bei Testdaten nie eintritt. Wer mit
    ihr prüft, meldet einen Fehlschlag, der keiner ist. TAUGLICH ist die Empfangsanzeige.
    Dieselbe Denkfigur wie beim ersten Ziel, wo die Verifikation über die NACHGELAGERTE
    WIRKUNG läuft und nicht über den Statuscode.

### Messprotokoll 2026-08-17 — die Teile (i) bis (m)

**HERKUNFT DER MESSUNG (2026-08-17):** vier Läufe gegen die echte
Conversions-Schnittstelle des Anbieters, ausgeführt vom Owner im Terminal, mit dem
Versions-Header 202601 und einem gültigen Zugangsdatum.

DIE BUCHSTABENREIHE LÄUFT ÜBER BEIDE PROTOKOLLE FORTLAUFEND WEITER: (a) bis (h) gehören
dem Protokoll vom 2026-08-15 und bleiben unverändert vergeben, damit die Verweise darauf
treffen; hier beginnt die Reihe bei (i). Kein Buchstabe wird neu vergeben, nichts
umsortiert.

(i) DIE TYP-LISTE IST LÄNGER ALS IN (b).
    GEMESSEN 2026-08-17 (drei Läufe, Terminal gegen die Schnittstelle): Eine
    Positivkontrolle mit dem ERFUNDENEN Symbol "PLAINTEXT_IP_ADDRESS_X" ergab 422 mit der
    Meldung 'ERROR :: /user/userIds/0/idType :: "PLAINTEXT_IP_ADDRESS_X" is not an enum
    symbol'. DERSELBE Lauf meldete ZUSÄTZLICH einen zweiten Fehler in DERSELBEN Antwort
    (falsches URN-Präfix, s. (l)) — der Validator SAMMELT, er bricht nicht beim ersten
    Fehler ab. Im Folgelauf mit "PLAINTEXT_IP_ADDRESS" fehlte die idType-Zeile, die
    URN-Zeile blieb stehen. Nach korrigierter URN: 201 Created, Content-Length 0, und die
    Empfangsanzeige an der Conversion-Regel meldete den Eingang.
    DIE NUTZLAST DABEI: userIds mit GENAU EINEM Eintrag — kein zweiter Identifier, kein
    userInfo.
    GELESEN 2026-08-17 (Anbieter-Doku, Microsoft Learn, "Conversions API Schema",
    Doku-Stand 2026-05-15): FÜNF Symbole — SHA256_EMAIL,
    LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID, ACXIOM_ID, PLAINTEXT_IP_ADDRESS, GOOGLE_AID.
    Zu PLAINTEXT_IP_ADDRESS steht dort: Klartext, NUR IPv4, der Anbieter hasht selbst mit
    Salt vor dem Abgleich. Zu LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID: die Klick-Kennung
    li_fat_id, vom Anbieter an die Landing-URL angehängt, setzt eine Einstellung im
    Campaign Manager voraus.
    WAS DAVON GEMESSEN IST — GENAU ZWEI der fünf: SHA256_EMAIL (2026-08-15, s. (b)) und
    PLAINTEXT_IP_ADDRESS (2026-08-17, hier). Die drei übrigen bleiben GELESEN und werden
    durch diesen Lauf NICHT aufgewertet.
    GRENZE, DIE MITMUSS: GEMESSEN ist die ANNAHME, NICHT die ZUORDNUNG. Ob eine
    IP-Kennung zu einer Person aufgelöst wird, ist mit Testdaten prinzipiell nicht messbar
    — s. (h). Das ist KEINE Entwarnung und KEINE Zusage über Match-Raten.

(j) DIE FORM DES KENNUNGS-WERTS WIRD NICHT GEPRÜFT.
    GEMESSEN 2026-08-17: Der idValue "999.999.999.999" bei sonst gültiger Nutzlast ergab
    201 Created; die Empfangsanzeige zählte das Ereignis MIT.
    GRENZE: Das ist eine ANDERE ACHSE als (e). Dort blieb die BEDEUTUNG ungeprüft (ein
    erfundener Währungscode), hier die SYNTAX des Identitätswerts.
    FOLGERUNG, NICHT GEMESSEN: Ein IPv6-Wert würde nach diesem Befund ebenfalls quittiert
    und liefe ins Leere (die Doku-Lesung in (i) nennt IPv4). NICHT GEMESSEN — IPv6 ist
    nicht probiert worden.

(k) DIE EMPFANGSANZEIGE IST IN IHRER ZÄHLWEISE MEHRDEUTIG.
    GEMESSEN als ANZEIGETEXT (Campaign Manager, Signalintegrität, 2026-08-17): "2 Events
    (2 dedupliziert)". Der Owner hat geprüft: KEINE Legende in der Oberfläche, der Text
    steht starr.
    ZWEI LESARTEN, UND SIE SIND GEGENSÄTZLICH: zwei nach der Deduplizierung VERBLIEBENE
    Ereignisse — ODER zwei als Dubletten VERWORFENE. In keinem der Läufe wurde ein
    eventId gesendet.
    KEINE FOLGERUNG UND KEINE AUSWAHL ZWISCHEN DEN LESARTEN: als OFFEN geführt.
    DAS BERÜHRT (h): Dort ist die Empfangsanzeige als das taugliche Instrument benannt —
    tauglich für das OB, UNGEKLÄRT in der Zählweise.
    VORBEHALT (2026-08-19) — DIE OFFENHEIT BLEIBT, IHR GRUND IST JETZT SCHÄRFER: Ein
    Kontroll-Lauf mit einer NEUEN Ereignis-Kennung hat die Zahl EBENFALLS nicht bewegt.
    Der Zähler reagiert damit auf Testdaten überhaupt nicht — weder auf Dubletten noch
    auf neue Ereignisse —, und die beiden Lesarten oben sind an ihm nicht zu
    unterscheiden. Was am Instrument REAGIERT, ist der Zeitstempel; s. unten (q). Der
    Wortlaut oben wird NICHT umformuliert.

(l) ZWEI FEHLERKLASSEN AN DER REGEL-KENNUNG, MIT GEGENSÄTZLICHER LESBARKEIT.
    GEMESSEN 2026-08-17: Ein formFALSCHES Präfix ("urn:lla:llaConversionRule:<id>" statt
    "urn:lla:llaPartnerConversion:<id>") ergibt 422 mit der präzisen Meldung "Invalid Urn
    format. Invalid prefix."
    ABGRENZUNG ZU (c), DAS UNANGETASTET BLEIBT: Eine formGÜLTIGE, aber nicht auflösbare
    Kennung ergab 403 "No ad accounts found" — die irreführende. Zwei Fehlerklassen an
    DERSELBEN Stelle; die eine zeigt zur Ursache, die andere von ihr weg.

(m) DAS ZEITFENSTER DES ZEITSTEMPELS.
    GELESEN 2026-08-17 an derselben Doku-Quelle wie (i): conversionHappenedAt muss
    innerhalb der letzten 90 Tage liegen. NICHT GEMESSEN.
    DER ANLASS GEHÖRT DAZU: In den ersten Läufen dieser Runde stand ein Zeitstempel von
    2024. Er ist NICHT aufgefallen, weil ein anderer Fehler zuerst griff.
    VORBEHALT (2026-08-19) — DIESE ANGABE IST NICHT MEHR NUR GELESEN: Das Fenster ist am
    2026-08-19 gemessen worden, und der Weg, auf dem die Schnittstelle es durchsetzt,
    steht unten unter (s). Der Wortlaut oben wird NICHT umformuliert — er sagt, was am
    2026-08-17 galt.

### Messprotokoll 2026-08-19 — die Teile (n) bis (s)

**HERKUNFT DER MESSUNG (2026-08-19):** NEUN Läufe gegen die echte
Conversions-Schnittstelle des Anbieters, ausgeführt vom Owner im Terminal, mit dem
Versions-Header 202601 und einem gültigen Zugangsdatum — SIEBEN Sonden (A bis G) und
ZWEI Kontroll-Läufe. Die Läufe sind unten je Teil mit ihrem Buchstaben genannt, damit
eine Angabe zu ihrem Lauf zurückverfolgbar bleibt.

DIE BUCHSTABENREIHE LÄUFT ÜBER ALLE PROTOKOLLE DIESES ZIELS FORTLAUFEND WEITER: (a) bis
(h) gehören dem Protokoll vom 2026-08-15, (i) bis (m) dem vom 2026-08-17; beide bleiben
unverändert vergeben, damit die Verweise darauf treffen. Hier beginnt die Reihe bei (n).
Kein Buchstabe wird neu vergeben, nichts umsortiert.

(n) DIE NUTZLAST-FORM IST ERHOBEN — SIE STAND VORHER NIRGENDS.
    DER GRUND GEHÖRT AN DEN ANFANG, sonst liest sich das wie eine Nachlässigkeit: Diese
    Datei ist ein PROTOKOLL VON LÄUFEN und war kein Schema. Bis zu diesem Tag fehlten
    hier der JSON-Schlüssel der Regel-Kennung, die Hüllenstruktur des Aufrufs und die
    Schlüssel für Betrag und Währung — sie sind in den beiden Protokollen davor nie
    erhoben worden.
    GEMESSEN 2026-08-19, LAUF A: Eine Nutzlast aus `conversion` (die Regel-URN),
    `conversionHappenedAt` (Millisekunden) und `user.userIds[]` mit GENAU EINEM Eintrag
    aus `idType` und `idValue` ergibt 201 Created mit Content-Length 0.
    GEMESSEN 2026-08-19, LAUF D: Der Wert reist in `conversionValue` mit den beiden
    Feldern `currencyCode` und `amount`; mit `amount` als ZEICHENKETTE ergibt der Aufruf
    201.
    WAS DAMIT BESTÄTIGT IST UND WAS NEU: Die Einer-Liste unter `userIds` deckt sich mit
    (i), wo derselbe Aufbau gemessen wurde; NEU sind die drei Schlüssel `conversion`,
    `conversionValue.currencyCode` und `conversionValue.amount` sowie die Zuordnung
    Betrag -> Zeichenkette, die bis hierher nur GELESEN war (2026-08-11).
    GRENZE: Gemessen ist eine ANGENOMMENE Nutzlast, KEIN Schema. Welche weiteren Felder
    die Schnittstelle kennt, sagt ein 201 nicht — das ist derselbe Nicht-Treffer-Vorbehalt
    wie in (b) und (e).

(o) DIE SCHNITTSTELLE PRÜFT TYPEN — UND DAS IST DIE GRENZE ZU (e), NICHT SEIN
    WIDERSPRUCH.
    GEMESSEN 2026-08-19, LAUF E: DERSELBE Betrag als ZAHL ergibt 422 mit der Meldung
    'ERROR :: /conversionValue/amount :: 19.9 cannot be coerced to String'.
    WAS DAS AN (e) PRÄZISIERT: Dort ist gemessen, dass die BEDEUTUNG ungeprüft bleibt —
    ein erfundener Währungscode wird mit 201 quittiert. Hier ist gemessen, dass der TYP
    geprüft wird. DIE GRENZE VERLÄUFT DAMIT ZWISCHEN TYP UND WERTEBEREICH, nicht zwischen
    "prüft" und "prüft nicht". (e) ist unberührt und bleibt gemessen.
    DIE PAARUNG MIT LAUF D IST DER BELEG, nicht der einzelne Lauf: Nur weil derselbe
    Betrag in D als Zeichenkette durchging und in E als Zahl fiel, ist der Unterschied dem
    TYP zuzuschreiben und nicht dem Wert.

(p) EIN FELD FÜR DIE EREIGNIS-KENNUNG EXISTIERT — UND DAS KIPPT EINE BEGRÜNDUNG.
    GEMESSEN 2026-08-19, LÄUFE B UND C, UND DIE REIHENFOLGE IST DER BELEG: Lauf B sendete
    ein ERFUNDENES Feld bei sonst gültiger Nutzlast und ergab 422 mit
    'ERROR :: /quatschFeldXyz :: unrecognized field found but not allowed'. ERST DAMIT
    sagt der Ausgang von Lauf C etwas: dasselbe Muster mit dem Feld `eventId` ergab 201.
    OHNE DIESE POSITIVKONTROLLE wäre die 201 aus C von "das Feld wird gar nicht geprüft"
    nicht zu unterscheiden gewesen — dieselbe Denkfigur wie der Mitläufer in (a).
    WAS DAS AN (d) KIPPT — DIE BEGRÜNDUNG, NICHT DEN MESSWERT: (d) folgert aus dem
    fehlenden RÜCKKANAL, die Deduplizierung dieses Produkts lasse sich auf dieses Ziel
    nicht ausdehnen. FOLGERUNG, NICHT GEMESSEN: Ein Rückkanal ist dafür nicht nötig —
    dedupliziert wird beim EMPFÄNGER, über die MITGESENDETE Kennung, und die Sendeseite
    steht damit offen. Der gemessene Teil von (d) — 201 mit leerem Rumpf, keine Kennung
    in der Antwort — ist UNBERÜHRT.
    EINE STÜTZE DIESER FOLGERUNG IST AM EIGENEN CODE GEMESSEN (2026-08-19),
    NICHT AM ANBIETER: `forwardToMeta` (`src/lib/capi/meta-forward.ts`) liest aus der
    ERFOLGSANTWORT des ersten Ziels NICHTS — es wird nur im Fehlerfall gelesen; die
    Deduplizierung dort ruht allein auf der mitgesendeten `event_id`. OB Metas Antwort
    eine Kennung enthielte, ist HIER NICHT GEMESSEN und für die Folgerung auch nicht
    nötig.
    GEMESSEN IST DIE SENDESEITE, NICHT DIE WIRKUNG: Dass das Feld ANGENOMMEN wird, ist
    belegt. Dass der Anbieter damit DEDUPLIZIERT, ist NICHT gemessen — und mit den
    heutigen Instrumenten auch nicht messbar, s. (q).

(q) DIE ANZEIGE-ZAHLEN SIND FÜR TESTDATEN KEINE SONDE — DER KONTROLL-LAUF HAT DIE DEUTUNG
    GEKIPPT.
    GEMESSEN 2026-08-19: Nach einem zweiten Lauf mit DERSELBEN `eventId` blieb die
    Signalintegritäts-Anzeige bei "4 Events / 4 dedupliziert" stehen, während der
    Zeitstempel auf "Vor 15 Sek." sprang. DAS SAH NACH DEDUPLIZIERUNG AUS.
    DER KONTROLL-LAUF, GEMESSEN AM SELBEN TAG: Ein weiterer Lauf mit einer NEUEN
    `eventId` liess die Zahl EBENFALLS bei 4. Der Zähler reagiert also auf ein NEUES
    Ereignis genauso wenig wie auf ein wiederholtes. Das Stehenbleiben beim Dublett-Lauf
    war damit KEIN Dedup-Beleg, sondern dieselbe Ursache.
    WAS DAS INSTRUMENT TAUGT: Der ZEITSTEMPEL reagiert auf Testdaten und zeigt EMPFANG.
    DIE ZAHLEN tun es nicht — weder für Deduplizierung noch für Zählung.
    DAS SCHÄRFT (h) UND (k): (h) hat dieselbe Denkfigur an der Conversions-Zählung
    gemessen; die Signalintegritäts-Anzeige verhält sich ebenso. Die Zählweise der Klammer
    aus (k) bleibt OFFEN — sie stand bei jedem beobachteten Stand gleich der Zahl davor,
    und ein Stand, an dem die beiden Lesarten auseinandergingen, ist nicht beobachtet
    worden.
    OHNE DEN KONTROLL-LAUF WÄRE "die Zahl steigt nicht" ALS DEDUPLIZIERUNG PROTOKOLLIERT
    WORDEN. Das ist der Grund, warum dieser Lauf hier eigens steht.
    VORBEHALT (2026-08-19) — DIE FOLGERUNG IST WIDERLEGT, DER MESSWERT NICHT: Eine ZWEITE
    Ablesung DESSELBEN Instruments, mehrere Stunden nach denselben Läufen, zeigt "9 Events
    / 9 dedupliziert" gegenüber den "4" oben. Die Zahlen reagieren also sehr wohl — nur
    mit Verzögerung; der Kontroll-Lauf war richtig gefahren und ZU FRÜH abgelesen. Was
    oben gemessen ist, bleibt gemessen: dass die Zahl UNMITTELBAR nach einem Lauf steht.
    Was fällt, ist allein die Deutung "sie reagiert nicht" und die daraus gezogene
    Unmessbarkeit der Dedup-Wirkung. Der Wortlaut oben wird NICHT umformuliert und NICHT
    gekürzt: er sagt, was am Tag der Läufe abgelesen wurde. Die zweite Ablesung, ihre
    Grenze und die Basislinie für eine künftige Messung stehen unten unter (t).

(r) DER VERSIONS-HEADER IST PFLICHT — UND SEIN FEHLER HAT EINE EIGENE RUMPFFORM.
    GEMESSEN 2026-08-19, LAUF G: Ohne den Header ergibt DERSELBE Aufruf 400 mit dem Rumpf
    {"status":400,"code":"VERSION_MISSING","message":"A version must be present. Please
    specify a version by adding the LinkedIn-Version header."}, dazu die Kopfzeile
    X-Restli-Gateway-Error.
    WAS NEU IST: Der Header war bis hierher NUR GELESEN (2026-08-11, "ein Versions-Header,
    dessen Wert ein Datum ist und der abgeschaltet wird"); OB er Pflicht ist, war
    unerhoben. Und der Rumpf trägt ein Feld `code`, das in keiner der bis dahin gemessenen
    Formen vorkommt.
    GRENZE: Gemessen ist das FEHLEN des Headers. Über einen FALSCHEN oder veralteten Wert
    sagt dieser Lauf nichts — und die gelesene Angabe, dass Versionen abgeschaltet werden,
    bleibt GELESEN.

(s) DAS 90-TAGE-FENSTER IST DURCHGESETZT — MIT 400 STATT 422 UND EINER WEITEREN RUMPFFORM.
    GEMESSEN 2026-08-19, LAUF F: Ein Zeitstempel 100 Tage in der Vergangenheit ergibt 400
    mit dem Rumpf {"message":"Conversion time should be within 90 days and not exceed
    current time, indices [0] (0-indexed).","status":400}.
    ZWEI DINGE DARAN SIND NEU: Das Fenster war bis hierher NUR GELESEN (m) — jetzt ist es
    gemessen, samt dem Weg, auf dem es durchgesetzt wird. Und die Meldung trägt eine
    BATCH-SEMANTIK ("indices [0]"), obwohl ein EINZELNES Ereignis gesendet wurde.
    FOLGERUNG, NICHT GEMESSEN: Die Schnittstelle behandelt den Aufruf intern als Liste.
    Ein Aufruf mit MEHREREN Ereignissen ist nicht gefahren worden — über sein Verhalten
    sagt dieser Lauf nichts.
    WAS DAS AN (f) ERWEITERT: Dort stehen "DREI Fehlerwege, ZWEI Rumpfformen". GEMESSEN
    sind jetzt FÜNF Wege — 401 (ungültiges Zugangsdatum) · 422 (fehlendes Pflichtfeld,
    unbekanntes Feld, unbekanntes Enum-Symbol, formfalsches URN-Präfix, Typfehler) · 403
    (nicht auflösbare Regel-Kennung) · 400 mit `code` (fehlender Versions-Header, Gateway)
    · 400 mit `indices` (Zeitfenster, Validierung).
    WIE VIELE RUMPFFORMEN DAS SIND, HÄNGT AM KRITERIUM — und weil (f) nach FELDERN zählt,
    steht das hier ausdrücklich: Nach der FELDMENGE sind es DREI (vier Felder bei 401 ·
    zwei Felder bei 422/403/400-indices · drei Felder bei 400-code). Nach der FORM DER
    MELDUNG sind es VIER, weil die 400-indices-Meldung eine Batch-Semantik trägt, die
    keine der übrigen kennt. HIER WIRD KEINE DER BEIDEN ZÄHLWEISEN ZUR GÜLTIGEN ERKLÄRT —
    sie sind auseinandergehalten, damit eine spätere Zahl nicht ohne ihr Kriterium
    zitiert wird.
    (f) BLEIBT UNVERÄNDERT STEHEN und trägt einen Vorbehalt, der hierher zeigt; seine
    Zahlen waren für die sieben Läufe vom 2026-08-15 richtig.

### Nachtrag 2026-08-19, SPÄTERE ABLESUNG DESSELBEN INSTRUMENTS — der Teil (t)

**HERKUNFT (2026-08-19):** KEIN neuer Lauf gegen die Schnittstelle. Eine ZWEITE Ablesung
der Signalintegritäts-Anzeige im Campaign Manager durch den Owner, mehrere Stunden nach
den neun Läufen des Protokolls darüber. Instrument und Ereignisse sind dieselben — neu ist
allein der ZEITPUNKT DER ABLESUNG. Deshalb steht das hier als Nachtrag und nicht als
weiteres Messprotokoll.

DIE BUCHSTABENREIHE LÄUFT FORT: hier (t). (q) bleibt UNVERÄNDERT stehen; dieser Teil tritt
DANEBEN und schreibt ihn nicht um.

(t) DIE ANZEIGE-ZAHLEN REAGIEREN DOCH — MIT STUNDEN VERZÖGERUNG. DAS KIPPT DIE FOLGERUNG
    AUS (q), NICHT SEINEN MESSWERT.
    GEMESSEN 2026-08-19 (Ablesung durch den Owner, mehrere Stunden nach den Läufen): Die
    Signalintegritäts-Anzeige steht auf "9 Events / 9 dedupliziert". Vor der Messreihe
    stand sie auf "4 Events / 4 dedupliziert" — dieser Vorher-Wert ist in (q)
    protokolliert.
    WAS DAS AN (q) KIPPT: Dort steht, der Zähler reagiere auf ein NEUES Ereignis genauso
    wenig wie auf ein wiederholtes, und die Zahlen taugten "weder für Deduplizierung noch
    für Zählung". Der Kontroll-Lauf war RICHTIG GEFAHREN — er wurde ZU FRÜH ABGELESEN. Die
    Folgerung war ein Fehler des ABLESE-ZEITPUNKTS und kein Befund über den Anbieter.
    WAS VON (q) UNVERÄNDERT GILT: dass die Zahl UNMITTELBAR nach einem Lauf stehen bleibt.
    Das ist gemessen und bleibt es; nur die Deutung "sie reagiert nicht" fällt.
    WAS DAS INSTRUMENT DAMIT TAUGT — die Trennung ist der praktische Kern: Der ZEITSTEMPEL
    zeigt EMPFANG sofort. Die ZAHLEN zeigen etwas, aber erst nach Stunden. EINE ABLESUNG
    UNMITTELBAR NACH EINEM LAUF IST FÜR DIE ZAHLEN KEINE SONDE — für den Zeitstempel ist
    sie eine.
    EINE ZWEITE, UNABHÄNGIGE STÜTZE STAND SCHON IN DIESER DATEI, ohne dass sie jemandem
    auffiel: (k) protokolliert am 2026-08-17 den Stand "2 Events (2 dedupliziert)", (q) am
    2026-08-19 VOR der Messreihe "4 Events / 4 dedupliziert". Die Zahl hat sich zwischen
    diesen beiden Ablesungen bereits bewegt. FOLGERUNG, NICHT GEMESSEN — welche Läufe
    diese Bewegung erzeugt haben, ist nicht erhoben.
    EINE REKONSTRUKTION, AUSDRÜCKLICH KEINE MESSUNG: Von den neun Läufen des 2026-08-19
    sind DREI mit Statuscode 201 protokolliert — A und D in (n), C in (p). Die beiden
    Kontroll-Läufe aus (q) — die Wiederholung mit DERSELBEN Kennung und der Lauf mit einer
    NEUEN — tragen KEINEN notierten Statuscode; dass sie angenommen wurden, ist eine
    ANNAHME. Wären es fünf, ginge 4 + 5 = 9 auf.
    WAS DARAUS FOLGTE, WENN DIE ZUORDNUNG AUFGINGE: Dann wäre auch die exakte Dublette
    MITGEZÄHLT worden — und dann dedupliziert der Anbieter über dieses Feld NICHT, oder
    die Klammer bedeutet etwas anderes als "verworfen" (die zwei gegensätzlichen Lesarten
    stehen in (k) und bleiben dort offen).
    WARUM DAS KEINE MESSUNG IST, und der Satz muss mit: Es ist NICHT bekannt, ob in der
    Zwischenzeit weitere Läufe eingegangen sind, und die Aggregations-Regel des Anbieters
    ist UNGELESEN. Die Übereinstimmung ist AUFFÄLLIG, NICHT BEWEISEND. Wer sie als Beleg
    zitiert, macht aus einer Rekonstruktion einen Messwert.
    WAS SICH FÜR DIE DEDUP-FRAGE ÄNDERT — die eigentliche Folge dieses Teils: (p) bleibt
    unverändert, dass das Feld ANGENOMMEN wird, ist gemessen. Die WIRKUNG bleibt offen,
    aber sie ist jetzt MESSBAR: ein Lauf mit doppelter Ereignis-Kennung und eine Ablesung
    am FOLGETAG entscheiden sie. In (q) galt sie als mit den vorhandenen Instrumenten
    prinzipiell unmessbar — genau das trifft nicht mehr zu.
    DIE BASISLINIE FÜR DIESE MESSUNG GEHÖRT DAZU, sonst ist der nächste Stand nicht
    einzuordnen: "9 Events / 9 dedupliziert", abgelesen am 2026-08-19.
    GRENZE: "mehrere Stunden" ist die Angabe des Owners, KEINE gemessene Latenz. Wie lange
    die Anzeige tatsächlich braucht und ob sie in Stufen oder stetig nachzieht, ist
    unerhoben.

### Beobachtung 2026-08-20 am Token-Generator der Anbieter-Oberfläche — der Teil (u)

**HERKUNFT (2026-08-20):** KEIN Lauf gegen die Schnittstelle und keine Ablesung einer
Anzeige. Der Owner hat den Token-Generator im Entwicklerportal des Anbieters aufgerufen,
und zwar für die EIGENE Anwendung dieses Projekts, und dort abgelesen, welche
Zugangs-Formen wählbar sind. Deshalb steht das hier als Beobachtung und nicht als
Messprotokoll.

DIE BUCHSTABENREIHE LÄUFT FORT: hier (u). (a) bis (t) bleiben unverändert vergeben.

(u) DER ZWEIBEINIGE WEG IST AN DER EIGENEN ANWENDUNG NICHT WÄHLBAR.
    BEOBACHTET 2026-08-20 (Owner, eigene App-Oberfläche des Anbieters, Token-Generator für
    die Anwendung DIESES Projekts): Die Form "Client credential (2-legged)" ist AUSGEGRAUT
    und nicht wählbar; wählbar ist ausschliesslich "Member authorization code (3-legged)".
    Der Bereich rw_conversions steht dort zur Auswahl.
    DIE DREI STUFEN GEHÖREN AUSEINANDERGEHALTEN, sonst wird dieser Teil beim Zitieren
    entweder zu stark oder zu schwach:
    · GELESEN wäre eine Aussage in fremder Anbieter-Doku — allgemein, über irgendeine
      Anwendung.
    · BEOBACHTET ist dies hier — die Oberfläche zeigt die Sperre für UNSERE Anwendung.
      Das ist der STÄRKERE Beleg, weil er nicht mehr auf die Übertragung einer allgemeinen
      Aussage auf unseren Fall angewiesen ist.
    · GEMESSEN wäre erst ein Aufruf mit grant_type=client_credentials gegen den
      Token-Endpunkt, der die Ablehnung zeigt. DER IST NICHT GEFAHREN.
    DIE GRENZE, DIE MITMUSS: Eine ausgegraute Schaltfläche ist eine Aussage der
    OBERFLÄCHE über die Schnittstelle — nicht die Schnittstelle selbst. Sie kann irren,
    veralten oder an einer Voraussetzung hängen, die anderswo gesetzt wird; nichts davon
    ist hier geprüft.
    WOFÜR ER ZÄHLT: Er stützt den Block vom 2026-08-20 im Offenen Punkt "EIN OAUTH-ZUGANG
    PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE" (CLAUDE.md, "## Offene
    Punkte"). Dessen Befund wird hier NICHT wiederholt — er steht dort, und zwei Fassungen
    liefen auseinander.
    WAS HIER BEWUSST NICHT STEHT: die Client-ID der Anwendung. Sie ist kein Geheimnis und
    gehört trotzdem nicht in ein Dokument.

### Abschnitts-Lesung 2026-08-20 der Anbieter-Dokumentation — die Teile (v) bis (z)

**HERKUNFT (2026-08-20):** Gemischt, und das steht hier im Kopf, weil die Teile darunter
NICHT dieselbe Stärke haben. Drei Quellen: (1) BEOBACHTET durch den Owner an den eigenen
Oberflächen des Anbieters (Token-Inspector-Werkzeug, Auth-Seite der eigenen App,
Generator-Ausgabe); (2) GEMESSEN durch den Owner mit einem Aufruf gegen einen
Anbieter-Endpunkt — genau EINE Sonde plus Positivkontrolle, s. (x); (3) GELESEN an der
Anbieter-Dokumentation. Jeder Teil nennt seine Stufe einzeln. KEIN Lauf gegen die
Conversions-Schnittstelle selbst.

DIE BUCHSTABENREIHE LÄUFT FORT: hier (v) bis (z). (a) bis (u) bleiben unverändert
vergeben. MIT (z) IST DIE REIHE AUSGESCHÖPFT — wie danach vergeben wird, ist hier NICHT
entschieden; die Konvention im Kopf dieser Datei regelt den Fall nicht.

(v) ES SIND ZWEI VERSCHIEDENE ARTEFAKTE, NICHT ZWEI WEGE ZUM SELBEN.
    BEOBACHTET 2026-08-20 (Owner, Token-Inspector-Werkzeug im Entwicklerportal,
    linkedin.com/developers/tools/oauth/token-inspector): Das über den OAuth-Generator
    erzeugte Zugangsdatum wird vollständig ausgelesen — erstellt, zuletzt autorisiert,
    "Expires: in about 2 months", "Authentication type: 3-legged", "Permissions:
    rw_conversions", Status aktiv. DASSELBE Werkzeug weist das über den Campaign Manager
    erzeugte Zugangsdatum als UNGÜLTIG zurück. Der Campaign-Manager-Wert ist zudem
    deutlich LÄNGER.
    WARUM DAS EIN BEFUND IST UND KEIN FEHLSCHLAG: Der erfolgreiche Lauf ist die
    POSITIVKONTROLLE. Ohne sie wären "gehört nicht zu dieser Anwendung" und "Werkzeug
    funktioniert nicht" am Ergebnis nicht zu unterscheiden gewesen — dieselbe Denkfigur
    wie der Mitläufer in (a).
    FOLGE: Das LIVE VERWENDETE Zugangsdatum ist KEIN OAuth-Zugangsdatum dieser Anwendung.
    Die Anbieter-Doku sagt für den Campaign-Manager-Weg, die dort erzeugten Zugangsdaten
    liefen nicht ab (GELESEN 2026-08-20,
    learn.microsoft.com/en-us/linkedin/marketing/conversions/getting-access-conversions).
    DIE RESTGRENZE, DIE MITMUSS: BELEGT ist die VERSCHIEDENHEIT der Artefakte. "Läuft nie
    ab" bleibt eine DOKU-AUSSAGE. Endgültig belegt wäre sie erst dadurch, dass das Ziel
    Mitte Oktober 2026 weiterhin sendet — s. den offenen Punkt am Ende dieses Abschnitts.

(w) DER APP-WEG: FRIST UND ERNEUERUNG.
    BEOBACHTET 2026-08-20 (Owner, Auth-Seite der eigenen Anwendung und Ausgabe des
    Generators): "Token time to live duration — Access token: 2 months (5184000 seconds)";
    das erzeugte Zugangsdatum weist "Expires: in 2 months" aus, Typ 3-legged. ZUSÄTZLICH
    wurde ein REFRESH-TOKEN mit 12 Monaten Laufzeit ausgegeben.
    DAS WIDERLEGT EINE FRÜHERE ANNAHME DIESES PROJEKTS, und das gehört hierher, weil sie
    sonst weiterwirkt: Angenommen worden war, eine programmatische Erneuerung sei
    ausschliesslich zugelassenen Partnern vorbehalten und für uns unmöglich. Die eigene
    Anwendung hat eines bekommen.
    DIE MECHANIK (GELESEN 2026-08-20,
    learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens):
    Erneuerung per grant_type=refresh_token gegen den Token-Endpunkt mit Client-ID und
    Client-Secret; das neue Zugangsdatum bekommt wieder 60 Tage, das Refresh-Token BEHÄLT
    seine Restlaufzeit von ursprünglich 365 Tagen. Danach muss das Mitglied erneut
    zustimmen. Der Anbieter behält sich ausdrücklich vor, Token JEDERZEIT zu widerrufen;
    ein Produkt muss dann auf den Anmeldefluss zurückfallen.
    UNGEPRÜFT: dass die Erneuerung mit diesem Refresh-Token tatsächlich durchgeht.
    AUSGEGEBEN IST NICHT EINGELÖST.

(x) DER ENDPUNKT-WEG IST GESCHEITERT; DAS TAUGLICHE WERKZEUG IST DIE OBERFLÄCHE.
    GEMESSEN 2026-08-20 (Owner, PowerShell gegen www.linkedin.com/oauth/v2/introspectToken):
    Sowohl ein Zugangsdatum, das NACHWEISLICH zu dieser Anwendung gehört, als auch eine
    ERFUNDENE Zeichenfolge ergaben 400. Das Instrument unterscheidet die beiden Fälle
    nicht und ist als Sonde UNTAUGLICH.
    DIE STATUSCODES DES ANBIETERS (GELESEN 2026-08-20,
    learn.microsoft.com/en-us/linkedin/shared/authentication/token-introspection): 400 =
    ungültige Client-ID oder ungültiges Token · 401 = ungültiges Client-Secret · gültige
    Zugangsdaten, die NICHT zum Token passen = 200 mit "active": false.
    DER BEOBACHTETE 400 PASST ZU KEINEM DER GEDEUTETEN FÄLLE; die Ursache ist UNGEKLÄRT,
    der Verdacht liegt bei der Client-ID. HIER WIRD SIE NICHT GEKLÄRT.
    DIE ANWEISUNG, DIE DARAUS FOLGT und die der eigentliche Wert dieses Teils ist: Wer die
    Laufzeit eines Zugangsdatums prüfen will, nimmt das OBERFLÄCHEN-WERKZEUG (s. (v)). DER
    ENDPUNKT WIRD NICHT ERNEUT VERSUCHT, solange die 400-Ursache ungeklärt ist.

(y) DIE DEDUPLIZIERUNG DES ANBIETERS SETZT ZWEI DINGE VORAUS, DIE WIR NICHT LIEFERN.
    GELESEN 2026-08-20 an
    learn.microsoft.com/en-us/linkedin/marketing/conversions/deduplication:
    (i) JE DATENQUELLE EINE EIGENE CONVERSION-REGEL — eine für den Browser, eine für den
    Server.
    (ii) DIE EREIGNIS-KENNUNG STAMMT AUS DEM BROWSER und wird mit dem Server-Ereignis
    mitgeschickt; browser-seitig über window._linkedin_event_id vor dem Insight Tag oder
    über event_id im lintrk-Aufruf. Treffen beide mit DERSELBEN Kennung ein, wird das
    SERVER-Ereignis verworfen und das des Insight Tags gezählt.
    WAS DAS FÜR UNS HEISST: Pagesmith liefert KEINEN LinkedIn Insight Tag aus und kann die
    Kennung an keine Browser-Regel übergeben.
    DIE KEHRSEITE, UND SIE IST DIE TEURERE: Hat ein Kunde ein EIGENES Insight Tag mit
    eigener Conversion-Regel, zählt der Anbieter ohne gemeinsame Kennung BEIDE Ereignisse
    — dieselbe Conversion erscheint DOPPELT in zwei Aufschlüsselungen.
    WAS DAS AUSDRÜCKLICH NICHT BERÜHRT: die eigene Adblocker-Verlustrate. Sie rechnet aus
    der eigenen events-Tabelle (Server gegen Browser-Bestätigung) und hat mit der Zählung
    des Anbieters nichts zu tun. Wer die beiden zusammenzieht, sucht einen Fehler in der
    eigenen Kachel, der beim Anbieter sitzt.
    DAS BERÜHRT (p) UND (d), OHNE SIE ZU ÄNDERN: (p) misst, dass das Feld für eine
    mitgegebene Ereignis-Kennung EXISTIERT und angenommen wird — das bleibt gemessen.
    Dieser Teil sagt, WAS AUSSERDEM nötig wäre, damit daraus eine Deduplizierung wird.

(z) DIE VERSIONSANGABE DES ADAPTERS UND EINE ABGEKÜNDIGTE VERSION.
    GEMESSEN AM REPO 2026-08-20 (read-only): Der Adapter setzt die Kopfzeile
    "LinkedIn-Version" auf den Wert "202601". Der Wert ist ein FEST EINGETRAGENES LITERAL
    in einer modul-lokalen Konstante — `LINKEDIN_VERSION` in
    `src/lib/capi/linkedin-forward.ts`; er wird NICHT aus einer Umgebungsvariable
    abgeleitet und nicht berechnet. Ein Test hält ihn fest: `linkedin-forward.test.ts`,
    Fall "T1-c: Versions-Header und Autorisierung stehen in den Kopfzeilen".
    DIE ANBIETER-ANGABE (GELESEN 2026-08-20, Abkündigungs-Hinweis im Kopf der
    Dedup-Seite): Die MARKETING-VERSION 202508 ist am 2026-08-17 ABGESCHALTET worden.
    DIE GEGENÜBERSTELLUNG, UND SIE IST DER GANZE INHALT DIESES TEILS: Der Adapter sendet
    NICHT 202508. Er sendet 202601 — denselben Wert, mit dem die Messprotokolle vom
    2026-08-17 und vom 2026-08-19 gefahren wurden und 201 bekamen.
    WAS DARAUS NICHT FOLGT: dass 202601 dauerhaft trägt. Der Anbieter schaltet Versionen
    ab; wann diese fällt, ist UNGELESEN. KEINE EMPFEHLUNG, ob und wie der Wert zu ändern
    ist — der Kommentar an der Konstante nennt bereits den Preis einer Änderung (gegen
    eine ungemessene Version zu senden).

**WAS AUSDRÜCKLICH OFFEN BLEIBT (2026-08-20)** — dieser Block ist mit der Lesung vom
2026-08-20 NEU; der LinkedIn-Abschnitt führte offene Punkte bis dahin innerhalb der
einzelnen Teile. Er sammelt, was KEINEM Teil allein gehört:
· OB DAS LIVE VERWENDETE ZUGANGSDATUM ABLÄUFT. Nach (v) stammt es aus dem
  Campaign-Manager-Weg, und die Doku sagt für diesen Weg "läuft nicht ab" — GELESEN, nicht
  belegt. BEOBACHTUNGSPUNKT: Die Direct-API-Seite im Campaign Manager zeigt "Status" und
  "Data last received". Bleibt der Empfangs-Zeitstempel stehen oder kippt der Status, ist
  es abgelaufen. FRÜHESTER AUSSAGEKRÄFTIGER ZEITPUNKT: Mitte Oktober 2026 — rund sechzig
  Tage nach dem 2026-08-19, an dem das Ziel nachweislich sendete. KEINE HANDLUNG NÖTIG;
  die Beobachtung läuft von selbst.

## Google (Google Ads Conversions · GA4)

**HERKUNFT — ALLES IN DIESEM ABSCHNITT IST GELESEN, NICHTS IST GEMESSEN (2026-08-20):** Es
ist KEIN Aufruf gegen eine Google-Schnittstelle gefahren worden — kein Token beschafft,
kein Endpunkt angesprochen, keine Fehlerform erhoben. Jeder Teil nennt seine Quelle und
sein Datum. Was hier steht, ist der Stand einer ANBIETER-RECHERCHE; er wird durch die
Live-Beweise der vier bestehenden Ziele NICHT aufgewertet.

**DIESER ABSCHNITT TRÄGT ZWEI ZIELE, und das ist Absicht:** Google Ads Conversions und GA4
sind verschiedene Produkte mit verschiedenen Schnittstellen — die Roadmap-Zeile 11.2 sagt
das und bleibt davon unberührt. Sie stehen hier trotzdem in EINEM Abschnitt, weil die
Befunde ineinandergreifen: Dieselbe Nachfolge-Schnittstelle (Data Manager API) betrifft
beide, und der Umstiegspfad ist genau die Naht zwischen ihnen. Wer nur GA4 sucht, findet es
unter (f). DAS IST EINE GLIEDERUNGS-FRAGE DIESER DATEI UND KEINE PRODUKT-AUSSAGE: Aus einem
gemeinsamen Abschnitt folgt NICHT, dass es ein Ziel oder ein Adapter wäre.

**DIE BUCHSTABEN BEGINNEN HIER BEI (a).** Die Konvention im Kopf dieser Datei bindet die
Eindeutigkeit an den ZIEL-ABSCHNITT ("Ein zweites (a) im selben Ziel-Abschnitt macht jeden
dieser Verweise mehrdeutig") — über Ziel-Abschnitte hinweg dürfen sich Buchstaben also
wiederholen. WAS DAS FÜR VERWEISE VON AUSSEN BEDEUTET, STEHT NICHT HIER, SONDERN IM KOPF
DIESER DATEI: der Absatz "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND BUCHSTABEN — NIE DEN
BUCHSTABEN ALLEIN". Er gilt für die GANZE Datei und ist deshalb dorthin gezogen; hier
stünde er an einem Ort, den nur liest, wer ohnehin bei Google ist.

### Anbieter-Befunde, GELESEN an der Anbieter-Doku (2026-08-20) — die Teile (a) bis (f)

(a) DER PROGRAMMATISCHE ALT-WEG IST FÜR UNS ZU — UND ES GIBT KEINEN ANTRAG, DER DAS HEILT.
    GELESEN 2026-08-20 an developers.google.com/google-ads/api/docs/conversions/upload-offline
    und support.google.com/google-ads/answer/2998031: Seit dem 15.06.2026 schlagen
    UploadClickConversion-Anfragen der Google Ads API (ConversionUploadService) fehl, wenn
    das Entwickler-Token nicht ZUVOR solche Anfragen gesendet hat; der Fehler heisst
    CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE. Das Qualifikationsfenster lag zwischen
    Dezember 2025 und Mai 2026 und ist verstrichen.
    WARUM DAS UNS TRIFFT UND NICHT NUR ALLGEMEIN GILT: Pagesmith hat NIE ein
    Entwickler-Token benutzt. Die Qualifikation ist damit nicht nachholbar — es ist kein
    Antragsverfahren, sondern ein abgelaufenes Zeitfenster.

(b) DIE REICHWEITE DER SPERRE IST DIE UMGEKEHRTE ZUR NAHELIEGENDEN LESART.
    GELESEN 2026-08-20 an FACHPRESSE (farsiight.com, searchengineland.com) — AUSDRÜCKLICH
    SEKUNDÄRQUELLEN, nicht die Anbieter-Doku, und das gehört an die Angabe: Getroffen sind
    EIGENINTEGRATIONEN. Tag-basierte Aufbauten und Standard-Konnektoren sind von dieser
    Frist NICHT betroffen; die übrigen Operationen der Ads API laufen weiter.
    WARUM DIESER TEIL EIGENS DASTEHT: Die naheliegende Lesart ist die umgekehrte — "die
    Ads API ist zu". Sie ist falsch, und die Fehlannahme ist in diesem Projekt schon
    einmal aufgetreten. Wer sie übernimmt, verwirft einen Weg, der offensteht.

(c) DAS FACHLICH GESUCHTE MERKMAL IST MITGESPERRT.
    GELESEN 2026-08-20 an support.google.com/google-ads/answer/15713840: Enhanced
    Conversions for Leads — die Fassung, die GEHASHTE NUTZERDATEN zur Ergänzung nutzt —
    fällt unter dieselbe Sperre wie (a).
    WARUM DAS KEIN NEBENFALL IST: Genau dieses Merkmal trägt das Produktversprechen dieses
    Projekts. Die Sperre trifft damit nicht einen Randweg, sondern den Hauptweg.

(d) DER NACHFOLGER: DIE DATA MANAGER API — ZWEI ZUGANGSMODELLE, EIN SENSIBLER BEREICH.
    GELESEN 2026-08-20 an
    developers.google.com/data-manager/api/devguides/quickstart/set-up-access: Die Data
    Manager API (datamanager.googleapis.com) ist allgemein verfügbar seit v1.3, datiert
    2025-10-06 (GELESEN 2026-08-24 an /reference, "Release notes").
    Sie kennt ZWEI Zugangsmodelle — ADVERTISER (die anmeldende Identität ist Nutzer im
    Werbekonto des Kunden) und DATA PARTNER (Partner-Konto, nur nach Freigabeverfahren,
    mit einem Partner-Link je Werbetreibendem).
    DER BEREICH IST https://www.googleapis.com/auth/datamanager und als SENSIBEL
    eingestuft; jede Cloud-Anwendung, die darüber NUTZER-Zugangsdaten beschafft, muss durch
    Googles OAuth-Verifizierung.
    GRENZE: Gelesen ist, WAS die Modelle sind und dass der Bereich sensibel ist. NICHT
    gelesen und NICHT gemessen ist, welche Anforderungen die Verifizierung im Einzelnen
    stellt und wie lange sie dauert.

(e) ZWEI GESTALTEN FÜR GOOGLE ADS, UND SIE UNTERSCHEIDEN SICH IM GATE WIE IM ERGEBNIS.
    GELESEN 2026-08-20 an developers.google.com/data-manager/api/devguides/events:
    (a-Gestalt) OFFLINE-IMPORT ÜBER DIE KLICK-KENNUNG: ohne Freischaltungs-Gate, erzeugt
    aber eine EIGENE Conversion-Aktion NEBEN der Tag-Conversion des Kunden.
    (b-Gestalt) SERVER-SEITIGE LIEFERUNG ALS ZUSÄTZLICHE DATENQUELLE zur BESTEHENDEN
    Tag-Conversion — die Entsprechung zum Meta-Modell —, NUR für freigeschaltete Konten;
    Daten aus dieser Quelle fliessen 14 TAGE LANG NICHT in die Gebotsoptimierung.
    DIE BEZEICHNER (a-Gestalt)/(b-Gestalt) SIND NICHT DIE TEILE (a)/(b) DIESES ABSCHNITTS:
    Sie stehen hier ausgeschrieben, damit ein späterer Verweis sie nicht verwechselt.
    WELCHE GEWÄHLT IST, STEHT NICHT HIER, sondern als Owner-Entscheidung an der
    Roadmap-Zeile 11.2 in CLAUDE.md — diese Datei trägt keine Entscheidungen.

(f) GA4 IST EIN ANDERER ADAPTER, KEIN ZWEITER EMPFÄNGER DESSELBEN.
    GELESEN 2026-08-20: Das Measurement Protocol verlangt KEIN OAuth, sondern ZWEI SKALARE
    — api_secret und measurement_id. Es kommt damit ohne die Autorisierungsschicht aus, die
    (d) für den Ads-Weg verlangt.
    DIE GRENZE, DIE MITMUSS — DAS IST KEIN DAUERZUSTAND: Google führt einen UMSTIEGSPFAD
    vom Measurement Protocol zur Data Manager API und nimmt GA4-Ereignisse dort entgegen;
    BEIDE Multi-Source-Wege tragen einen Allowlist-Vorbehalt — Google Analytics ("only
    available to Google Analytics properties on an allowlist", mit Formular) UND Google Ads
    ("allowlist-only feature"); GELESEN 2026-08-24 an /devguides/events (Doku-Stand
    2026-07-30), dieselbe Seite, dieselbe Aufzählung. Das Measurement Protocol ist HEUTE
    gangbar und ein KANDIDAT
    für dieselbe Behandlung wie der Ads-Weg.
    TRIGGER, WÖRTLICH: eine Ankündigung, die das Measurement Protocol beschränkt oder
    abkündigt.
    PROVENIENZ: GELESEN 2026-08-20 an developers.google.com/data-manager/api (Umstiegspfad)
    und an FACHPRESSE (SEKUNDÄRQUELLE).

**WAS AUSDRÜCKLICH OFFEN BLEIBT (2026-08-20)** — vier Punkte, jeder als OFFEN benannt und
keiner beantwortet; sie stehen hier, damit niemand sie aus dem Vorhandenen erschliesst:
· OB DIE FREISCHALTUNG FÜR DIE (b-)GESTALT FÜR EIN KONTO UNSERER GRÖSSENORDNUNG
  ERREICHBAR IST. Das steht in KEINER Dokumentation und ist nur über einen Antrag zu
  erfahren.
· OB WIR EIN ENTWICKLER-TOKEN BRAUCHEN. Die Data Manager API verlangt keines. DARAUS FOLGT
  NICHT, DASS KEINES NÖTIG IST: Dieselbe Seite bietet an, den Ads-API-Bereich
  mitzuautorisieren, und das Nachschlagen einer Conversion-Aktion läuft heute über die Ads
  API. UNGEPRÜFT.
· WELCHE NUTZLAST-FELDER VERLANGT WERDEN und ob sie mit der Datenklassen-Entscheidung
  dieses Projekts zusammengehen (gehashte E-Mail im Browser gebildet, IP nur als
  Transit-Wert). Die Entscheidung selbst steht in CLAUDE.md, "## Offene Punkte" —
  hier steht nur, dass die Passung unerhoben ist.
· OB DIE KLASSIFIZIERUNG ALS ADVERTISER ODER ALS DATA PARTNER DIE RICHTIGE IST.
· OB EINE BESTEHENDE TAG-CONVERSION IM KUNDENKONTO VORAUSGESETZT IST UND WIE SIE DORTHIN
  KOMMT. Die (b-)Gestalt aus (e) ist ausdrücklich eine ZUSÄTZLICHE Datenquelle zu einer
  BESTEHENDEN Tag-Conversion — GELESEN 2026-08-20. UNGEPRÜFT ist, ob sie ohne eine solche
  überhaupt etwas hat, woran sie andockt, ob ein Kunde auf einer von Pagesmith
  ausgelieferten Seite ein eigenes Google-Tag unterbringen kann, und ob Pagesmith eines
  ausliefern müsste. KEINE EMPFEHLUNG, KEINE ANTWORT.
DIE ZAHL "VIER" IM KOPF DIESES BLOCKS WIRD NICHT ÜBERSCHRIEBEN — sie ist als Aussage über
den Stand bei seiner Niederschrift richtig; mit diesem fünften sind es FÜNF. Dieselbe
Bauform wie an den Zähl-Angaben in CLAUDE.md: eine Zahl, die einen Stand beschreibt, wird
nicht rückwirkend angepasst. Wer sie als heutige Liste liest, zählt falsch.

**ZEIGER 2026-08-25 — EIN PUNKT DIESES BLOCKS IST ERLEDIGT.** Der Block selbst wird NICHT
umgeschrieben: Er ist das Zeitdokument einer Lesung vom 2026-08-20 und war für seinen Tag
richtig.
DER PUNKT "OB DIE KLASSIFIZIERUNG ALS ADVERTISER ODER ALS DATA PARTNER DIE RICHTIGE IST"
IST AM 2026-08-25 DURCH EINE OWNER-ENTSCHEIDUNG ERLEDIGT.
WO SIE STEHT: docs/roadmap.md, Eintrag "Phase 11.8 — Autorisierungsschicht", Block vom
2026-08-25 — und CLAUDE.md, "## Modus". **WAS SIE SAGT, STEHT HIER NICHT:** Diese Datei
trägt KEINE Entscheidungen (s. ihren Kopf). Wer den Inhalt braucht, liest ihn dort.
DIE BAUFORM IST NICHT NEU, und das gehört dazu, damit dieser Zeiger nicht als Ausnahme
gelesen wird: Der DRITTE Punkt dieses Blocks verfährt seit dem 2026-08-20 ebenso — "Die
Entscheidung selbst steht in CLAUDE.md, '## Offene Punkte' — hier steht nur, dass die
Passung unerhoben ist."
DIE ÜBRIGEN VIER PUNKTE DIESES BLOCKS SIND VON DIESEM ZEIGER UNBERÜHRT und bleiben offen.
PROVENIENZ: Dass die Entscheidung getroffen ist und wo sie steht, ist GEMESSEN am Repo
(CC, 2026-08-25). Die Entscheidung selbst ist eine OWNER-ENTSCHEIDUNG vom 2026-08-25 und
wird hier nur NACHGEWIESEN, nicht wiedergegeben.

### Abschnitts-Lesung 2026-08-24 der Data-Manager-Dokumentation, LAUF 1 (Leitfaden und Betrieb) — die Teile (g) bis (s)

**HERKUNFT — GELESEN, NICHTS GEMESSEN (2026-08-24):** Es ist KEIN Aufruf gegen eine
Google-Schnittstelle gefahren worden — kein Zugangsdatum beschafft, kein Endpunkt
angesprochen, keine Fehlerform erhoben, kein Konto angelegt. Alle Angaben unten sind an
der Anbieter-Dokumentation GELESEN; jede nennt ihren Seitenpfad und den Doku-Stand, den
die Seite selbst ausweist ("Last updated"). Basis aller Pfade, wo nichts anderes steht:
developers.google.com/data-manager/api

**DER GEGENSTAND WAR ENG UND IST ES GEBLIEBEN:** die Google Data Manager API, und darin
der Weg, auf dem Conversion-Ereignisse SERVERSEITIG eingeliefert werden. GA4 und das
Measurement Protocol waren AUSDRÜCKLICH AUSGESCHLOSSEN — anderer Adapter, anderes
Zugangsmodell; ein Doppel-Crawl macht aus einem Lauf zwei halbe. Diese Lesung sagt über
GA4 deshalb NICHTS und wertet den bestehenden Teil (f) weder auf noch ab.

**DIES IST LAUF 1 VON ZWEI.** LAUF 2 — die Endpunkt- und Typ-Referenz (reference/rpc,
reference/rest/v1) — ist am 2026-08-24 NICHT gefahren. Fragen, deren Antwort dort zu
erwarten ist, tragen unten die Einstufung VERTAGT AUF LAUF 2 und AUSDRÜCKLICH NICHT die
Einstufung NICHT-TREFFER. GRUND, und er ist der Zweck dieser Unterscheidung: Ein
NICHT-TREFFER ist eine Aussage über den GELESENEN Umfang. Auf einen ungelesenen Baum
angewandt behauptet er eine Reichweite, die er nicht hat — und die Frage gälte später als
abgesucht, obwohl sie es nie war.

**DIE VIER EINSTUFUNGEN, UND SIE REISEN AN JEDEM BEFUND MIT — NIE NUR HIER OBEN:**
· BEANTWORTET — die Doku genügt für diese Frage, und der Fragenkatalog vermerkt für sie
  auch nur "Doku genügt".
· ABGELEGT — die Doku sagt etwas, der Fragenkatalog verlangt aber eine MESSUNG. Der Satz
  "ERSETZT KEINE MESSUNG" steht an jedem einzelnen dieser Befunde, nicht bloss hier.
  EIN ABGELEGTER BEFUND WIRD NIE ALS BEANTWORTET GEFÜHRT, auch wenn die Doku-Aussage
  eindeutig klingt.
· NICHT-TREFFER — steht auf keiner gelesenen Seite. Trägt seine REICHWEITE (welche
  Seiten, welche Suchbegriffe) und den Satz, dass er KEINE Entwarnung ist.
· VERTAGT AUF LAUF 2 — mit der Seite, auf der die Antwort erwartet wird.

(g) DIESE LESUNG IST NICHT UNABHÄNGIG — VIER KANÄLE TRUGEN GOOGLE-ANGABEN VORAB.
    DER VERMERK STEHT AN ERSTER STELLE, WEIL OHNE IHN DER BEFUND UNTER (q) FALSCH GELESEN
    WIRD: Der Allowlist-Vorbehalt für die gewählte Gestalt ist unten am Anbieter-Text
    BESTÄTIGT worden — er ist NICHT unabhängig entdeckt. Die ausführende Instanz wusste
    vorher, dass dort etwas ist, und hat nachgesehen. Das mindert den Befund nicht, aber es
    ändert seinen Rang.
    DIE VIER KANÄLE, alle vor der ersten geöffneten Anbieter-Seite:
    (1) docs/aktiver-stand.md — Pflicht-Gate, unvermeidbar. Sie nennt die gewählte Gestalt,
        den VORBEHALT DER FREISCHALTUNG und den VORBEHALT DER BESTEHENDEN TAG-CONVERSION.
    (2) CLAUDE.md — unbedingt geladen. Der Abschnitt "## Modus" trägt selbst eine
        Google-Angabe: "Google für die gewählte Gestalt ein Partnerverfahren".
    (3) docs/ziel-fragenkatalog.md — DER SCHÄRFSTE PUNKT, UND DIE BLIND-KLAUSEL HAT IHN
        NICHT VORHERGESEHEN: Die (b)-GRÜNDE der Katalog-Fragen I1, I3 und I4 ZITIEREN
        WÖRTLICH aus genau diesem Google-Abschnitt — aus den Teilen (a), (c), (d) und (e).
        Der Auftrag verlangte, den Katalog zu lesen und den Google-Abschnitt nicht zu
        öffnen. Beides zugleich ist nicht möglich: Der Katalog trägt fünf Google-Vorbefunde
        im Text seiner eigenen Fragen.
    (4) Eine bewusste Abweichung: Der Abschnitt "Befunde am Verfahren (2026-08-20)" in
        docs/ziel-fragenkatalog.md wurde gelesen, weil docs/aktiver-stand.md ihn als DAS
        VERFAHREN FÜR DEN CRAWL bindet. Er trägt Verfahrens-Korrekturen und KEINE
        Ziel-Befunde.
    WAS NACHWEISLICH NICHT GEÖFFNET WURDE: dieser Google-Abschnitt selbst (keine Zeile),
    docs/ziel-befunde.md insgesamt (keine Zeile), docs/roadmap.md (kein Eintrag, auch nicht
    11.2), docs/claude-history/* (keine Datei), die Matrix und die Fortschreibungs-
    Abschnitte des Fragenkatalogs.

(h) DER GELESENE UMFANG — OHNE DIESE LISTE HAT JEDES "STEHT DORT NICHT" UNTEN KEINE
    REICHWEITE.
    SIEBZEHN Seiten, alle am 2026-08-24 abgerufen: fünfzehn zugewiesene und zwei, die im
    Kartier-Schritt geöffnet wurden, BEVOR der Umfang feststand. Die zwei sind eigens
    ausgewiesen, statt sie unter die fünfzehn zu mischen.
    WERKZEUG: Textbasiertes Lesen per HTTP-Abruf mit eigener HTML-nach-Text-Extraktion.
    Playwright-MCP wurde NICHT benutzt und war nicht nötig — die Seiten liefern ihren
    Inhalt serverseitig gerendert aus.
    EIN VERFAHRENS-BEFUND ZUM TEXTBASIERTEN LESEN, DER IN KEINER REGEL STEHT: Eine
    Vergleichstabelle auf /devguides/concepts/encryption trägt ihre Aussage in
    HÄKCHEN-SYMBOLEN, die in der Text-Extraktion als LEERE ZELLEN erscheinen. Wer nur den
    Text liest, sieht eine Tabelle mit Zeilen und ohne Inhalt und merkt NICHT, dass er die
    Aussage verloren hat. Zurückgewonnen wurde sie über die CSS-Klassennamen
    (compare-yes / compare-no) im Rohmarkup. Textbasiertes Lesen ist billiger und an
    dieser Stelle STILL lückenhaft.

    GEÖFFNET — die fünfzehn zugewiesenen Seiten, je mit Pfad, Titel und Doku-Stand:
     1. /devguides/events — "Events overview" — 2026-07-30
     2. /devguides/events/send-events — "Send events" — 2026-08-18
     3. /devguides/events/google-ads/online — "Google Ads multi-source conversions" —
        2026-07-30
     4. /devguides/events/google-ads/offline — "Google Ads offline conversions" —
        2026-07-30
     5. /devguides/concepts/destinations — "Configure destinations and headers" —
        2026-08-20
     6. /devguides/concepts/formatting — "Format user data" — 2026-07-30
     7. /devguides/concepts/understand-errors — "Understand API errors" — 2026-07-30
     8. /devguides/concepts/best-practices — "Best practices" — 2026-07-30
     9. /devguides/concepts/encryption — "Encrypt user data" — 2026-07-30
    10. /devguides/quickstart/set-up-access — "Set up API access" — 2026-08-14
    11. /devguides/accounts/partner-links — "Partner links overview" — 2026-08-07
    12. /devguides/accounts/partner-links/create-partner-link — "Create or delete a partner
        link" — 2026-08-07
    13. /devguides/accounts/partner-links/retrieve-partner-links — "Retrieve partner links"
        — 2026-07-30
    14. /devguides/diagnostics — "Diagnostics" — 2026-07-30
    15. /reference/ecapi — "ECAPI specification mapping" — 2026-07-30

    GEÖFFNET, ABER NICHT ZUGEWIESEN — zwei Seiten aus dem Kartier-Schritt. Beide wurden
    geöffnet, BEVOR der Umfang von Lauf 1 feststand, im Zuge der Karte, die zur
    Stopp-Bedingung vorzulegen war. Sie stehen hier, statt verschwiegen zu werden:
    16. /data-manager/api — "Data Manager API" (Startseite) — KEIN Doku-Stand ausgewiesen.
        Trägt den EINZIGEN rohen HTTP-Aufruf im gesamten gelesenen Umfang.
    17. /reference — "Release notes" — 2026-07-30. Ist NICHT die Referenz-Landeseite,
        sondern die Versionshistorie.
    OHNE DIESE ZWEI WÄRE (j)/B2 EIN NICHT-TREFFER. Das ist der Grund, sie eigens
    auszuweisen und nicht stillschweigend mitzuzählen.

    BEFUND ZU /reference/ecapi, WEIL DER AUFTRAG IHN VERLANGT HAT: Die Seite ist KEIN Tor
    zu einem weiteren Baum. Sie ist eine Zuordnungstabelle vom IAB-ECAPI-Standard auf die
    Data-Manager-Felder und verweist ausschliesslich auf bereits kartierte Seiten. Sie war
    die Öffnung wert: Sie trägt das EINZIGE vollständige IngestEventsRequest-Beispiel für
    ein GOOGLE-ADS-Ziel im gesamten gelesenen Umfang und die einzige Aussage zur
    Einwilligungs-Mechanik.

    GESEHEN, NICHT GEÖFFNET — mit Grund:
    · /devguides/events/google-ads/store-sales und /store-sales/upgrade/{steps,
      field-mappings} — vom Auftrag ausgeschlossen.
    · ALLE upgrade/-Unterbäume: google-ads/offline/upgrade/{steps,field-mappings},
      cm360/offline/upgrade/{steps,field-mappings}, analytics/measurement-protocol/
      upgrade/{,steps,field-mappings}, accounts/partner-links/google-ads/upgrade/{steps,
      field-mappings}, audiences/*/customer-match/upgrade/* — vom Auftrag ausgeschlossen.
      Sie tragen Feld-Zuordnungen zu den Alt-Schnittstellen.
    · /devguides/events/cm360/online, /devguides/events/cm360/offline — vom Auftrag
      ausgeschlossen; anderes Produkt (Floodlight / Google Marketing Platform).
    · /devguides/events/analytics/online, /devguides/events/analytics/
      recommended-custom-events, /reference/analytics/recommended-events — GA4 /
      Measurement Protocol, per Gegenstand ausgeschlossen.
    · /devguides/audiences/** — siebzehn Seiten (send-audience-members,
      google-ads/customer-match/*, display-video/customer-match/*): Zielgruppendaten
      (Customer Match, PAIR), keine Konversion.
    · /devguides/quickstart/install-library, /devguides/quickstart/agent-skills — vom
      Auftrag ausgeschlossen.
    · Die verbliebenen rund siebenunddreissig Seiten unter /reference/rest/v1
      (userList*, audienceMembers*, accountTypes.accounts.*) — Zielgruppen-Verwaltung, kein
      Konversions-Bezug.
    · FÜR LAUF 2 VORGESEHEN, deshalb hier nicht geöffnet: /reference/rpc/
      google.ads.datamanager.v1 sowie /reference/rest/v1/{events, events/ingest,
      adEvents/ingest, Destination, Consent, UserData, Encoding, EncryptionInfo, Status,
      ErrorInfo, ErrorReason, Code, requestStatus/retrieve} und nachrangig
      {DeviceInfo, BadRequest, FieldWarning, Help, RequestInfo}.

    NICHT KARTIERT — DREI SEITEN, DIE ES GIBT UND DIE IN KEINER KARTE STANDEN. Sie sind
    deshalb weder zugewiesen noch geöffnet worden:
    · /devguides/limits — "Limits and quotas". Daran hängen die ZAHLEN zu Katalog-Frage H3
      und die Höchstzahl der Ziele je Anfrage zu H4.
    · /devguides/terms — "Terms of service". Daran hängt Katalog-Frage I2
      (Vertragsbedingungen).
    · /support/contact — Support-Kontakt.
    DER GRUND, WARUM SIE FEHLTEN, UND ER IST DER EIGENTLICHE BEFUND: Die Karte stammt aus
    dem NAVIGATIONSBAUM, den die Seiten im Markup mitliefern. DIESE DREI SEITEN STEHEN IM
    NAVIGATIONSBAUM NICHT. Sichtbar wurden sie erst über Verweise im FLIESSTEXT — "up to
    the per-request limits", "Terms of service", "contact support".
    FOLGE: Wer den Umfang eines Doku-Abschnitts aus der Navigation ableitet, unterschätzt
    ihn — und zwar ohne dass etwas rot wird. Die betroffenen Katalog-Fragen H3 und I2 sind
    unten als ABGELEGT geführt und AUSDRÜCKLICH NICHT als NICHT-TREFFER: Sie sind nicht
    abgesucht worden.

(i) GRUPPE A — ZUGANG (Katalog-Fragen A1 bis A5).

    A1 · AUF WELCHEM WEG BESCHAFFT DER BETREIBER DAS ZUGANGSDATUM — BEANTWORTET.
    GELESEN 2026-08-24, /devguides/quickstart/set-up-access (Stand 2026-08-14) und
    /devguides/accounts/partner-links (Stand 2026-08-07). Es sind DREI Wege auf ZWEI
    ACHSEN, und sie sind nicht austauschbar.
    ACHSE 1, DIE ANMELDEDATEN SELBST: Beides läuft über OAuth 2.0 mit einem
    GOOGLE-CLOUD-PROJEKT, in dem die Data Manager API aktiviert ist. API-Schlüssel sind
    ausdrücklich ausgeschlossen — "You can use any of the Authentication methods at Google
    besides API keys".
    (1) NUTZERKONTO: Desktop-OAuth2-Client anlegen, Client-Konfiguration als JSON
        herunterladen, dann `gcloud auth application-default login --scopes=".../auth/
        datamanager,.../auth/cloud-platform" --client-id-file="..."`.
    (2) DIENSTKONTO MIT IDENTITÄTSÜBERNAHME — ausdrücklich statt Dienstkonto-Schlüsseln,
        "because service account keys can become a security risk if not managed carefully".
    ACHSE 2, DER ZUGRIFFSPFAD ZUM KUNDENKONTO:
    (3a) DIREKTER ZUGRIFF (ADVERTISER): Anmeldedaten eines Google-Kontos, das Nutzer im
         Werbekonto des Kunden ist. "Requires separate credentials for every advertiser
         account", und diese Anmeldedaten sind LANGLEBIG und je Kunde aufzubewahren.
    (3b) DATA PARTNER: Anmeldedaten des EIGENEN Partner-Kontos für ALLE Kunden. "Once you
         create a partner link in an advertiser account, all subsequent requests use a
         single set of credentials." Die Kundendaten braucht man nur EINMAL, zum Anlegen
         des Links.
    ZWEI GETRENNTE ZUGRIFFSBEREICHE: https://www.googleapis.com/auth/datamanager
    ("required for all services in the Data Manager API") und der eng geschnittene
    https://www.googleapis.com/auth/datamanager.partnerlink, der AUSSCHLIESSLICH das
    Anlegen und Löschen eines Partner-Links erlaubt.
    WAS OFFEN BLEIBT — die Katalog-Hälfte, die Beobachtung verlangt: welcher Weg das
    Artefakt liefert, das live benutzt wird.

    A2 · WELCHE FORM HAT DAS ZUGANGSDATUM — SKALAR ODER MEHRERE WERTE — BEANTWORTET.
    GELESEN 2026-08-24, /devguides/quickstart/set-up-access (Stand 2026-08-14) und
    /devguides/concepts/destinations (Stand 2026-08-20). KEIN SKALAR, auf keinem Weg:
    · Der Nutzerweg erzeugt eine heruntergeladene CLIENT-KONFIGURATIONSDATEI plus eine
      lokal erzeugte ADC-Datei.
    · Der Dienstkonto-Weg ist eine BERECHTIGUNGSKETTE (Dienstkonto-Adresse plus drei
      IAM-Bindungen), kein Wert.
    · Unabhängig davon reist bei JEDEM Aufruf die KONTO-ADRESSIERUNG im Rumpf mit:
      operatingAccount{accountType,accountId} · loginAccount{accountType,accountId} ·
      optional linkedAccount{accountType,accountId} · productDestinationId. Bis zu sieben
      Werte, die weder Kennung im bisherigen Sinn noch Geheimnis sind.
    GRENZE: Die Felder INNERHALB der Client-Konfiguration bzw. der ADC-Datei zählt keine
    der gelesenen Seiten auf. DASS es mehrere sind, ist belegt; WELCHE genau, nicht.

    A3 · LÄUFT ES AB, UND NACH WELCHER FRIST — ABGELEGT.
    GELESEN 2026-08-24, /devguides/accounts/partner-links (Stand 2026-08-07): Die Doku
    stellt die beiden Wege ausdrücklich gegenüber — die Anmeldedaten des Werbekontos sind
    auf dem Partner-Weg "short-lived. You can discard them once you've used them to create
    a partner link", auf dem Direktweg "long-lived. You must securely store the credentials
    for every advertiser".
    EINE FRIST NENNT KEINE DER SIEBZEHN SEITEN — keine Zahl, keine Einheit.
    ERSETZT KEINE MESSUNG.

    A4 · GIBT ES EINEN ERNEUERUNGSWEG, UND WER DARF IHN NUTZEN — ABGELEGT.
    GELESEN 2026-08-24, /devguides/quickstart/set-up-access (Stand 2026-08-14): Genannt ist
    der MECHANISMUS, nicht der Vorgang — Application Default Credentials "automatically
    find credentials from the environment so you don't have to change the client code to
    authenticate"; bei Identitätsübernahme erzeugt die Kette kurzlebige Token.
    EIN ERNEUERUNGS-ENDPUNKT, EINE AUFFRISCHUNGS-KENNUNG ODER EINE AUSSAGE DARÜBER, WAS BEI
    ABLAUF GESCHIEHT, STEHT AUF KEINER DER SIEBZEHN SEITEN. Die Doku verweist an dieser
    Stelle nach AUSSEN ("Authentication methods at Google", "How Application Default
    Credentials works") — beides nicht geöffnet, beides ausserhalb des
    Data-Manager-Baums.
    ERSETZT KEINE MESSUNG.

    A5 · INSTRUMENT FÜR GÜLTIGKEIT ODER RESTLAUFZEIT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/quickstart/set-up-access (Stand 2026-08-14): Genannt ist
    EIN Instrument, und es prüft nur die EINRICHTUNG —
    `gcloud auth application-default print-access-token --scopes="https://
    www.googleapis.com/auth/datamanager"`, "If successful, the command prints an access
    token to the console".
    DAS IST EINE JA/NEIN-AUSKUNFT, KEINE RESTLAUFZEIT, und es ist ein Kommandozeilen-
    Werkzeug, keine Schnittstelle. Eine API-Sonde für Gültigkeit nennt keine gelesene Seite.
    ERSETZT KEINE MESSUNG.

(j) GRUPPE B — ADRESSIERUNG (Katalog-Fragen B1 bis B4).

    B1 · WIE LAUTET DIE ENDPUNKT-ADRESSE — BEANTWORTET; die vollständige URL ist in LAUF 2
    an /reference/rest/v1/events/ingest GELESEN worden, s. Teil (u).
    GELESEN 2026-08-24, /data-manager/api (Startseite, kein Doku-Stand ausgewiesen):
    Wirtsname und Versions-Segment stehen fest. Die Seite zeigt EINEN rohen Aufruf, aber
    für die FALSCHE Methode:
      POST https://datamanager.googleapis.com/v1/audiencemembers:ingest
    Das ist der ZIELGRUPPEN-Aufruf. DIE VOLLSTÄNDIGE URL DES EREIGNIS-AUFRUFS STEHT AUF
    KEINER DER SIEBZEHN SEITEN. Der Dienst heisst IngestionService, die Anfrage
    IngestEventsRequest.
    DIE VOLLSTÄNDIGE URL LAUTET POST https://datamanager.googleapis.com/v1/events:ingest —
    GELESEN 2026-08-24 an /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), s. Teil
    (u).

    B2 · VERLANGT DER ANBIETER EINE VERSIONSANGABE, UND SCHALTET ER VERSIONEN AB —
    BEANTWORTET.
    GELESEN 2026-08-24, /data-manager/api (Startseite) und /reference ("Release notes",
    Stand 2026-07-30) — beide aus dem Kartier-Schritt, s. (h).
    IM PFAD, als Segment /v1/ — nicht in einer Kopfzeile, nicht im Rumpf. Die Release-Notes
    führen NEUN Stände unter DEMSELBEN Pfad-Segment: v1.0 (2025-04-02) · v1.1 (2025-06-25)
    · v1.2 (2025-08-06) · v1.3 (2025-10-06) · v1.4 (2025-11-05) · v1.5 (2026-02-17) · v1.6
    (2026-05-07) · v1.7 (2026-05-28) · v1.8 (2026-07-30, aktuell). Die Nebenstände sind
    MERKMALS-Stände, keine eigenen Adressen — es gibt keinen Weg, eine bestimmte
    Nebenversion anzufordern.
    "The Data Manager API is now generally available" seit v1.3 (2025-10-06).
    ABSCHALTUNG: auf FELD-Ebene ja — mit v1.3 wurden "the product field" und Werte des
    Product-Enums abgekündigt. Die Abschaltung eines ganzen Versionsstands nennt keine
    gelesene Seite; es gibt kein Ablaufdatum je Version.
    ZWEI MERKMALE, AUF DENEN DIE GEWÄHLTE GESTALT RUHT, SIND JUNG: IngestEvents kam mit
    v1.1 (2025-06-25), RetrieveRequestStatus — der einzige Weg zur Diagnostik — erst mit
    v1.3 (2025-10-06).

    B3 · IN WELCHEM TRÄGER REIST DAS GEHEIMNIS — VERTAGT AUF LAUF 2, erwartet auf
    /reference/rest/v1/events/ingest.
    KEINE DER SIEBZEHN SEITEN ZEIGT EINE AUTHORIZATION-KOPFZEILE. Der Leitfaden führt
    ausschliesslich über den API-Explorer im Browser ("complete the authorization prompts")
    und über Client-Bibliotheken, die das Token selbst setzen. Dass ein
    OAuth-2.0-Zugriffstoken erzeugt wird, ist belegt (A5); WIE es an der Schnittstelle
    ankommt, steht dort nicht.
    AUSDRÜCKLICH KEINE ENTWARNUNG — die Frage ist nicht abgesucht, sie ist verschoben.

    B4 · WELCHE WEITEREN KOPFZEILEN SIND PFLICHT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/destinations (Stand 2026-08-20). Die Doku
    trifft hier eine NEGATIVE Aussage von ungewöhnlicher Schärfe, und sie ist der
    wichtigste Befund dieser Gruppe:
      "Don't set request headers in an IngestionService request. The Data Manager API
       ignores headers in an ingestion request."
    Die Kopfzeilen `login-account` und `linked-account` EXISTIEREN, gelten aber
    AUSSCHLIESSLICH für Ressourcen-Verwaltungs-Aufrufe (Insights, PartnerLink, UserList,
    UserListDirectLicense, UserListGlobalLicense, UserListGlobalLicenseCustomerInfo). BEIM
    EINLIEFERN REIST DER ZUGRIFFSPFAD IM RUMPF, als loginAccount und linkedAccount des
    Destination.
    WARUM DAS LEICHT FALSCH HERUM GEBAUT WIRD: derselbe Sachverhalt einmal als Kopfzeile,
    einmal als Rumpf-Feld, je nach Aufrufart — und die falsche Wahl wird IGNORIERT, nicht
    abgewiesen.
    ERSETZT KEINE MESSUNG.
    VORBEHALT (2026-08-28) — DIE ZITIERTE AUSSAGE TRIFFT DIE TRANSPORT-KOPFZEILE NICHT.
    Der Wortlaut oben bleibt wörtlich stehen und ist als WIEDERGABE DER ANBIETER-SEITE
    unverändert richtig: Der Satz steht dort so, und der Schlusssatz "ERSETZT KEINE MESSUNG"
    war die richtige Einordnung, solange keine vorlag. INZWISCHEN LIEGT EINE VOR.
    GEMESSEN 2026-08-28: "The Data Manager API ignores headers in an ingestion request" gilt
    NICHT für die Kopfzeile, in der das Zugangsdatum reist — derselbe Dienst antwortet OHNE
    Authorization mit 401. Volltext der Auflösung unten in (bl), die Aufrufe in (bj).
    DER ANKER DIESER ZUORDNUNG IST DER ErrorInfo-METHODENNAME AUS (bj) —
    google.ads.datamanager.v1.IngestionService.IngestEvents. Er benennt genau den
    IngestionService, von dem der zitierte Satz spricht; ohne ihn wäre die Zuordnung eine
    ABLEITUNG und kein Messwert.
    AUFGELÖST NUR IN DIESER RICHTUNG, UND DAS IST KEINE VORSICHTSFLOSKEL: Was der Satz über
    die FACHLICHEN Kopfzeilen sagt — login-account und linked-account, die laut dem Absatz
    oben beim Einliefern stattdessen im Rumpf reisen —, BLEIBT UNBERÜHRT UND UNGEMESSEN.
    Messung A hat keine der beiden gesetzt. Wer aus diesem Vorbehalt liest, der Satz sei
    insgesamt widerlegt, baut den Zugriffspfad in eine Kopfzeile und bekommt keinen Fehler,
    sondern Stille — der Absatz oben hält ausdrücklich fest, dass die falsche Wahl IGNORIERT
    und nicht abgewiesen wird.

(k) GRUPPE C — KENNUNG DES ZIELS (Katalog-Fragen C1 bis C4).

    C1 · WIE HEISST DIE KENNUNG, UND WELCHE FORM HAT SIE — BEANTWORTET (Form; die Ablehnung
    bei falschem Präfix bleibt Messung).
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /devguides/concepts/destinations (Stand 2026-08-20). Die Kennung heisst
    productDestinationId und ist JE GESTALT EINE ANDERE SACHE:
    · MULTI-SOURCE CONVERSIONS: ID einer Conversion-Action vom Typ WEBPAGE. In der
      Google-Ads-Oberfläche ist die Conversion source dafür "Website".
    · OFFLINE CONVERSIONS / ENHANCED CONVERSIONS FOR LEADS: ID einer Conversion-Action vom
      Typ UPLOAD_CLICKS. Oberfläche: "Website (Import from clicks)".
    · STORE SALES: ID einer Conversion-Action vom Typ STORE_SALES. Oberfläche: "Store
      sales".
    SIE IST KEINE KONTO-KENNUNG, sondern die Kennung eines OBJEKTS IM KONTO, das vorher
    existieren muss. Die Google-Ads-Kundennummer reist getrennt als
    operatingAccount.accountId mit accountType "GOOGLE_ADS".
    FORM: reine Ziffernfolge, kein Präfix. Belegt indirekt über die Fehlermeldung "String
    is not a valid number." mit Grund INVALID_NUMBER_FORMAT auf
    destinations[0].login_account.account_id, und über alle Beispiele (123456789,
    777111122, 1234567890). EIN ZEICHENVORRAT ODER EINE LÄNGENANGABE STEHT AUF KEINER
    GELESENEN SEITE.
    BESCHAFFUNG: Google-Ads-Oberfläche unter Conversions > Conversion-Action > Reiter
    Details > "Conversion type ID" — ODER über die GOOGLE ADS API (nicht die Data Manager
    API) mit "SELECT conversion_action.id, conversion_action.name FROM conversion_action
    WHERE conversion_action.name = '...'".

    C2 · WO REIST DIE KENNUNG — PFAD, RUMPF ODER KOPFZEILE — BEANTWORTET.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /devguides/concepts/destinations (Stand 2026-08-20): IM RUMPF, als
    destinations[].productDestinationId. Nicht im Pfad, nicht in einer Kopfzeile —
    Kopfzeilen werden beim Einliefern ignoriert (s. B4). Dasselbe gilt für die
    Konto-Kennung (destinations[].operatingAccount.accountId). EINE KODIERUNG FÜR DEN PFAD
    ENTFÄLLT DAMIT.

    C3 · GILT EINE KENNUNG JE PROJEKT ODER JE EREIGNISTYP — BEANTWORTET.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18). JE
    CONVERSION-ACTION, und damit faktisch je Ereignistyp, nicht je Projekt. Zwei Belege,
    die zusammengehören:
    · Die Deduplizierung greift ausdrücklich "Within the same conversion action".
    · Für mehrere Ziele in EINER Anfrage gibt es einen eigenen Mechanismus: jedes
      Destination bekommt ein frei wählbares `reference` (einzige Auflage: Eindeutigkeit),
      jedes Event eine Liste destinationReferences[]. OHNE destinationReferences GEHT EIN
      EREIGNIS AN ALLE DESTINATIONS DER ANFRAGE — das ist die Vorgabe, kein Fehler.
    FOLGE, GELESEN UND NICHT GEDEUTET: Wer zwei verschiedene Konversionen unterscheiden
    will, braucht ZWEI Conversion-Actions und ZWEI Destinations, nicht ein Feld im Rumpf.
    Der Anbieter erzwingt die Trennung auf der ZIEL-Achse.

    C4 · IST DIE KENNUNG ÖFFENTLICH ODER SELBST EIN GEHEIMNIS — NICHT-TREFFER.
    Auf KEINER der siebzehn gelesenen Seiten wird productDestinationId, die
    Conversion-Action-ID oder die Google-Ads-Kundennummer als vertraulich, geheim oder
    schützenswert eingestuft — weder positiv noch negativ. Die Anleitung lässt sie in der
    Oberfläche ablesen; das ist eine Aussage über die BESCHAFFUNG, nicht über die
    Vertraulichkeit, und sie wird hier ausdrücklich nicht als solche gelesen.
    ABGESUCHTE ACHSE: die siebzehn Seiten aus (h), Begriffe `secret`, `confidential`,
    `sensitive`, `private`, `public`. Ein Treffer auf `sensitive` existiert, betrifft aber
    den OAuth-Zugriffsbereich (s. (q)/I1), nicht die Kennung.
    DAS IST KEINE ENTWARNUNG.

(l) GRUPPE D — NUTZLAST (Katalog-Fragen D1 bis D6).

    D1 · WIE IST DIE HÜLLE AUFGEBAUT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /reference/ecapi (Stand 2026-07-30): ZWEI PARALLELE ARRAYS AUF DER WURZELEBENE,
    verbunden über benannte Verweise:
      { "destinations": [ {...} ], "events": [ {...} ], "encoding": "HEX",
        "consent": {...}, "encryptionInfo": {...}, "validateOnly": true }
    Kein Wurzelschlüssel `data`, kein Einzelobjekt. DIE EMPFÄNGER STEHEN NEBEN DEN
    EREIGNISSEN, NICHT IN IHNEN — das ist die eigentliche Bauform-Aussage. consent,
    encryptionInfo, encoding und validateOnly gelten für die GANZE Anfrage; consent ist
    zusätzlich je Ereignis übersteuerbar.
    ERSETZT KEINE MESSUNG.

    D2 · WIE HEISSEN DIE KERNFELDER — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18), /reference/ecapi
    (Stand 2026-07-30) und /reference ("Release notes", Stand 2026-07-30):
    · EREIGNIS-KENNUNG: transactionId — zugleich der Dedup-Schlüssel, s. (p)/H2.
    · ZEITSTEMPEL: eventTimestamp — RFC-3339-Zeichenkette, s. D3.
    · EREIGNISNAME: eventName — Pflicht NUR für Google-Analytics-Ziele; in der
      Google-Ads-Multi-Source-Zeile taucht es nicht auf.
    · HERKUNFT: eventSource — Enum; für Multi-Source optional, wenn gesetzt dann WEB.
    · WERT/WÄHRUNG: conversionValue, currency.
    · IDENTITÄT: userData, adIdentifiers, eventDeviceInfo — s. (m).
    · WEITERES: cartData, userProperties, destinationReferences, additionalEventParameters,
      experimentalFields, eventLocation, conversionCount, thirdPartyUserData.
    conversionCount kam mit v1.7 hinzu ("to support tracking conversion quantities").
    thirdPartyUserData ist NUR zulässig, wenn loginAccount.accountType gleich DATA_PARTNER
    ist.
    ERSETZT KEINE MESSUNG.

    D3 · WELCHE ZEITEINHEIT, UND GIBT ES EIN ZEITFENSTER — BEANTWORTET (Einheit); das
    FENSTER für Google Ads ist ungedeckt, s. unten und (s)/Lücke D.
    GELESEN 2026-08-24, /devguides/concepts/formatting (Stand 2026-07-30),
    /devguides/events/send-events (Stand 2026-08-18) und /reference/ecapi (Stand
    2026-07-30).
    EINHEIT — UND SIE WEICHT VON ALLEN BISHER GEBAUTEN ZIELEN AB: Bei JSON ist
    eventTimestamp eine RFC-3339-ZEICHENKETTE, keine Zahl. Beispiele der Doku:
    "2025-08-08T17:18:44.291Z", "2025-06-10T23:42:33-05:00", "2025-08-08T22:18:44.291+09:00".
    Weder Sekunden noch Millisekunden seit der Epoche. Bei Protobuf: seconds plus optional
    nanos. Die ECAPI-Zuordnung sagt es ausdrücklich: "ECAPI uses the Unix epoch format
    (integer) for timestamps. When mapping to the Data Manager API, the event_timestamp
    field must be converted."
    FENSTER — HIER TRENNT SICH DIE DOKU: Für Google Analytics steht es scharf da (72
    Stunden für den Zeitstempel; 48 Stunden für Ereignisse, die mit clientseitig erfassten
    zusammengeführt werden sollen). FÜR GOOGLE ADS MULTI-SOURCE NENNT KEINE DER SIEBZEHN
    GELESENEN SEITEN EIN FENSTER — weder eine Obergrenze noch eine Untergrenze noch ein
    Verbot künftiger Zeitstempel.

    D4 · IN WELCHEM TYP REIST DER WERT, UND PRÜFT DIE SCHNITTSTELLE DEN TYP — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18), /reference/ecapi
    (Stand 2026-07-30) und /devguides/concepts/understand-errors (Stand 2026-07-30).
    DER TYP WECHSELT INNERHALB DERSELBEN NUTZLAST, und das ist der Befund:
    · conversionValue — ZAHL (30.03, 42.02, 450.0); ECAPI: "as a double or float".
    · currency — Zeichenkette, drei Buchstaben GROSS. Die Eingabe "usd"/"eur" wird im
      Formatier-Schritt zu "USD"/"EUR".
    · items[].quantity — GANZZAHL (int64); ECAPI: "Convert the float value to an integer
      (int64)".
    · items[].unitPrice — Zahl.
    · additionalEventParameters[].value, additionalItemParameters[].value,
      experimentalFields[].value — ZEICHENKETTE, AUCH BEI ZAHLINHALT
      ({"parameterName":"discount","value":"2.22"}, {"field":"gad_campaignid",
      "value":"21288051566"}).
    · accountId, productDestinationId — Zeichenkette mit Ziffern, in Anführungszeichen.
    Also: dieselbe Zahl reist als ZAHL, wenn sie ein benanntes Feld hat, und als
    ZEICHENKETTE, wenn sie über den Zusatzparameter-Weg geht.
    PRÜFUNG: Der Fehlergrund INVALID_NUMBER_FORMAT ist mit Beispielantwort belegt.
    ERSETZT KEINE MESSUNG.

    D5 · WELCHE FELDER SIND PFLICHT, WELCHE OPTIONAL — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18), Tabelle "Convert
    the data to Event objects", Reiter Google Ads; dazu
    /devguides/concepts/understand-errors (Stand 2026-07-30) und
    /devguides/concepts/destinations (Stand 2026-08-20).
    DER KONTRAST ZWISCHEN DEN BEIDEN GELESENEN GESTALTEN IST DER BEFUND:
                              MULTI-SOURCE          OFFLINE / ECL
      Kennung                 PFLICHT (1 aus 5)     PFLICHT (dieselben 5)
      transactionId           PFLICHT                OPTIONAL
      eventSource             optional; wenn         PFLICHT (ein Wert des
                              gesetzt, dann WEB      EventSource-Enums)
    transactionId UND eventSource TAUSCHEN IHREN RANG ZWISCHEN DEN BEIDEN GESTALTEN. Wer
    den einen Adapter aus dem anderen ableitet, erbt genau die falsche Hälfte.
    DAS IST EINE FESTSTELLUNG AM TEXT UND KEINE AUSSAGE DARÜBER, WELCHE GESTALT ZU WÄHLEN
    IST.
    DIE FÜNFER-LISTE DER KENNUNGEN, für BEIDE Gestalten identisch — mindestens eines davon:
    (1) adIdentifiers mit mindestens einem aus gclid, gbraid, wbraid · (2)
    adIdentifiers.landingPageDeviceInfo.ipAddress · (3) Session-Attribute · (4) userData ·
    (5) eventDeviceInfo.ipAddress.
    AUF ANFRAGE-EBENE: destinations PFLICHT · operatingAccount PFLICHT ·
    productDestinationId PFLICHT · loginAccount optional (Vorgabe: gleich
    operatingAccount) · linkedAccount nur im Data-Partner-Fall. In cartData: items PFLICHT
    mit mindestens einem Eintrag, sobald cartData überhaupt gesetzt ist.
    DAS FEHLSCHLAG-MODELL GEHÖRT ZWINGEND ZU DIESER FRAGE — FAST-FAIL, vom Anbieter
    ausdrücklich gegen das Teilfehler-Modell der Google Ads API und der Campaign Manager
    360 API abgegrenzt: "If a request contains structural errors or if any record fails
    validation for a required field, the entire request fails, and the API does not process
    any of the data in that request." EIN EINZIGER PFLICHTFELD-FEHLER IN EINEM STAPEL
    VERWIRFT DEN GANZEN STAPEL. Fehlerhafte OPTIONALE Felder erzeugen dagegen nur eine
    Warnung.
    ERSETZT KEINE MESSUNG.

    D6 · PRÜFT DIE SCHNITTSTELLE DIE BEDEUTUNG DER WERTE — ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/understand-errors (Stand 2026-07-30),
    /devguides/events/send-events (Stand 2026-08-18) und /reference ("Release notes", Stand
    2026-07-30).
    JA, FÜR DEN WÄHRUNGSCODE AUSDRÜCKLICH: INVALID_CURRENCY_CODE ist als
    ErrorReason-Wert namentlich genannt. Weitere belegte Bedeutungs-Prüfungen:
    INVALID_HEX_ENCODING · INVALID_SHA256_FORMAT · INVALID_NUMBER_FORMAT ·
    INVALID_EVENT_NAME · FIELD_VALUE_TOO_SHORT · TOO_FEW_ELEMENTS ·
    MULTIPLE_DESTINATIONS_FOR_GOOGLE_ANALYTICS_EVENT · REQUIRED_PREREQUISITE_LINK_MISSING ·
    INVALID_REMOVE_AS_OF_TIME.
    EIN WERTEBEREICH FÜR conversionValue STEHT AUF KEINER GELESENEN SEITE — keine Ober-
    oder Untergrenze, keine Aussage zu Null oder negativen Werten.
    ERSETZT KEINE MESSUNG.

(m) GRUPPE E — IDENTITÄT DES BESUCHERS (Katalog-Fragen E1 bis E4).

    E1 · VOLLSTÄNDIGE LISTE DER IDENTITÄTS-MERKMALE — BEANTWORTET (Liste; je Symbol bleibt
    Messung).
    GELESEN 2026-08-24, /devguides/concepts/formatting (Stand 2026-07-30),
    /devguides/events/send-events (Stand 2026-08-18) und /reference/ecapi (Stand
    2026-07-30). Die Merkmale liegen an DREI VERSCHIEDENEN ORTEN der Nutzlast, und das ist
    wesentlicher als die Liste selbst.
    DIE ORTE HEISSEN HIER "ORT 1/2/3" UND NICHT (a)/(b)/(c) — GENAU AUS DEM GRUND, DEN DER
    BESTEHENDE TEIL (e) DIESES ABSCHNITTS FÜR DIE BEZEICHNER (a-Gestalt)/(b-Gestalt)
    NENNT: Ein bloss geklammerter Kleinbuchstabe wäre von den TEILEN (a) bis (f) dieses
    Abschnitts nicht zu unterscheiden, und ein späterer Verweis würde mehrdeutig.
    ORT 1 · userData.userIdentifiers[] — je Eintrag GENAU EIN Merkmal ("Each UserIdentifier has
        exactly one of the attributes"): emailAddress · phoneNumber · address (AddressInfo:
        givenName, familyName, regionCode, postalCode, addressLine, city,
        administrativeArea). addressLine, city und administrativeArea sind ausdrücklich
        "Used only for Google Analytics" — für Google Ads also nicht. Mehrfachnennung ist
        erwünscht: "if you have multiple email addresses for a user, include a separate
        UserIdentifier for each".
    ORT 2 · adIdentifiers — Klick- und Sitzungsmerkmale, NICHT in userData: gclid · gbraid ·
        wbraid · dclid · matchId · impressionId · mobileDeviceId · encryptedUserIds[] ·
        sessionAttributes · landingPageDeviceInfo (ipAddress, userAgent). FÜR GOOGLE ADS
        MULTI-SOURCE taugen laut Pflicht-Tabelle nur gclid, gbraid, wbraid und
        landingPageDeviceInfo.ipAddress; dclid, matchId, impressionId und encryptedUserIds
        stehen dort in der FLOODLIGHT-Zeile.
    ORT 3 · eventDeviceInfo — auf Event-Ebene, weder in userData noch in adIdentifiers:
        ipAddress, userAgent.
    Dazu, ausschliesslich für Google-Analytics-Ziele: clientId, userId, appInstanceId.
    GRENZE: Die ABSCHLIESSENDE Feldliste steht in der Referenz (UserData, AdIdentifiers,
    DeviceInfo) und damit in Lauf 2. Die obige Liste ist aus den Leitfäden zusammengetragen
    und NICHT als abschliessend belegt.

    E2 · ROH ODER GEHASHT, UND MIT WELCHEM VERFAHREN — BEANTWORTET.
    GELESEN 2026-08-24, /devguides/concepts/formatting (Stand 2026-07-30) und
    /devguides/concepts/encryption (Stand 2026-07-30). GEMISCHT, FELDWEISE FESTGELEGT — es
    gibt keine einheitliche Regel, und die Trennlinie läuft MITTEN DURCH das Adressobjekt.
    SHA-256 GEHASHT, danach hex- oder Base64-kodiert: emailAddress · phoneNumber ·
    givenName · familyName · addressLine.
    NICHT HASHEN, ausdrücklich: regionCode · postalCode · city · administrativeArea ·
    ipAddress · mobileIds.
    NORMALISIERUNG VOR DEM HASHEN, UND SIE IST DOMÄNENABHÄNGIG:
    · E-Mail kleinschreiben. BEI gmail.com UND googlemail.com: alle Punkte vor dem @
      entfernen UND das Pluszeichen samt allem danach streichen
      (cloudy.sanfrancisco+shopping@gmail.com -> cloudysanfrancisco@gmail.com). BEI JEDER
      ANDEREN DOMÄNE: NICHT (user.name+NYC@Example.com -> user.name+nyc@example.com).
      Leerraum wird bei E-Mail auch INNEN getrimmt, bei allen anderen Feldern nur vorn und
      hinten.
    · Telefon: E.164, führendes +, danach nur Ziffern ((800)555-0100 -> +18005550100).
    · Namen: kleinschreiben, keine Anreden ("Mrs."), keine Suffixe ("Jr.").
    · regionCode: ISO-3166-1 alpha-2, zwei Zeichen. postalCode: US fünf Ziffern oder fünf
      plus vier; ausserhalb der USA KEINE Erweiterung.
    KODIERUNG — EINE FALLE, DIE AUSDRÜCKLICH BENANNT IST: Bei HEX ist die
    Gross-/Kleinschreibung egal, bei BASE64 NICHT.
    OPTIONAL DARÜBER — VERSCHLÜSSELUNG ("confidential matching"): Reihenfolge zwingend —
    formatieren, SHA-256, BASE64 kodieren, mit dem DEK verschlüsseln, hex oder Base64
    kodieren; dazu encryptionInfo und encoding auf der Anfrage. Ausdrücklich: "Don't
    encrypt unhashed values", also nicht regionCode, postalCode, city, administrativeArea.
    Unterstützt sind Google Cloud KMS und AWS KMS — für GOOGLE ADS MULTI-SOURCE BEIDE, für
    Offline-Conversions und Store-Sales NUR Google Cloud KMS. (Diese Tabelle war nur über
    die CSS-Klassennamen lesbar, s. (h).) KOSTENHINWEIS DER DOKU: die
    Entschlüsselungs-Aufrufe des Anbieters verbrauchen Kontingent IM KMS-PROJEKT DES
    BETREIBERS.

    E3 · IST MINDESTENS EIN IDENTITÄTS-MERKMAL PFLICHT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /devguides/diagnostics (Stand 2026-07-30). JA — mindestens eines aus der Fünfer-Liste
    unter D5.
    ZWEI DOKU-STELLEN SAGEN DAS UND WIDERSPRECHEN SICH IN DER ZUSAMMENSETZUNG DER LISTE —
    s. (r), Widerspruch 1.
    BEMERKENSWERT DANEBEN: landingPageDeviceInfo.ipAddress und eventDeviceInfo.ipAddress
    reisen laut Formatier-Leitfaden UNGEHASHT und zählen dennoch als hinreichende Kennung.
    ERSETZT KEINE MESSUNG.

    E4 · GIBT ES EIN FELD FÜR DEN USER-AGENT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /reference/ecapi (Stand 2026-07-30). JA, UND ZWAR ZWEI AN VERSCHIEDENEN ORTEN MIT
    VERSCHIEDENER BEDEUTUNG:
    · eventDeviceInfo.userAgent — der User-Agent zum Zeitpunkt des EREIGNISSES.
    · adIdentifiers.landingPageDeviceInfo.userAgent — der User-Agent auf der LANDESEITE.
    Der zweite ist im Alternativweg der Session-Attribute AUSDRÜCKLICH PFLICHT: "Required:
    Include the landing page user agent in the userAgent field of
    adIdentifiers.landingPageDeviceInfo." Beide sind je mit einer ipAddress gepaart.
    DER ANBIETER UNTERSCHEIDET ALSO LANDESEITE VON EREIGNISZEITPUNKT — zwei Momente, zwei
    Feldpaare.
    ERSETZT KEINE MESSUNG.

(n) GRUPPE F — EREIGNIS-VOKABULAR (Katalog-Fragen F1 bis F3).

    F1 · IST DER EREIGNISNAME FREI ODER EIN ENUM — BEANTWORTET.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18). FÜR GOOGLE ADS
    MULTI-SOURCE STELLT SICH DIE FRAGE NICHT SO, WIE SIE GESTELLT IST — und das ist der
    Befund. eventName ist ausdrücklich "Required" für GOOGLE-ANALYTICS-Ziele; in der
    Pflicht-Tabelle für Google Ads Multi-Source KOMMT eventName NICHT VOR. Was das Ereignis
    bestimmt, ist die productDestinationId — die Conversion-Action, die im
    Google-Ads-Konto angelegt sein muss.
    DIE FALLUNTERSCHEIDUNG WANDERT DAMIT VON EINEM FELD IM RUMPF IN DIE ZIEL-ADRESSIERUNG.
    Wo eventName gilt (Google Analytics): FREI MIT AUSNAHMEN — empfohlene oder eigene
    Namen, aber reservierte Namen werden mit INVALID_EVENT_NAME abgewiesen.

    F2 · MÜSSEN EIGENE NAMEN REGISTRIERT WERDEN, UND GIBT ES EINEN DECKEL JE KONTO —
    ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/destinations (Stand 2026-08-20) und
    /devguides/events/send-events (Stand 2026-08-18). Die Entsprechung zur Registrierung
    ist bei Google Ads das ANLEGEN EINER CONVERSION-ACTION — sie muss existieren und für
    Multi-Source vom Typ WEBPAGE sein. Das ist strenger als eine Registrierung: ohne sie
    gibt es keine Kennung, an die man senden könnte.
    EIN DECKEL JE KONTO STEHT AUF KEINER DER SIEBZEHN GELESENEN SEITEN — weder für
    Conversion-Actions noch für Ereignisnamen.
    ERSETZT KEINE MESSUNG.

    F3 · WIE HEISSEN DIE STANDARD-NAMEN, UND WEICHT DIE BENENNUNG AB — ABGELEGT.
    GELESEN 2026-08-24, /reference/ecapi (Stand 2026-07-30). Für Google Ads gibt es KEINE
    Namensliste (s. F1). Die einzige Namensabweichung im gelesenen Umfang betrifft ECAPI
    gegen Google Analytics: die meisten Namen stimmen überein (purchase, add_to_cart,
    begin_checkout, search, refund), drei weichen im Tempus ab — viewed_item -> view_item,
    viewed_item_list -> view_item_list, viewed_cart -> view_cart. Die Namensregeln selbst
    ("Event naming rules", "recommended events") liegen im ausgeschlossenen GA4-Teilbaum.
    ERSETZT KEINE MESSUNG.

(o) GRUPPE G — ANTWORT UND FEHLER (Katalog-Fragen G1 bis G5).

    G1 · ERFOLGS-STATUSCODE, UND GENÜGT DER STATUS — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18),
    /devguides/concepts/understand-errors (Stand 2026-07-30) und /devguides/diagnostics
    (Stand 2026-07-30). Erfolg ist HTTP 200 bzw. gRPC-Code 0 (OK), Rumpf mit requestId.
    DER STATUS GENÜGT AUSDRÜCKLICH NICHT, UND ZWAR AUF ZWEI GETRENNTEN ACHSEN:
    (1) WARNUNGEN REISEN MIT DER 200: "Ingestion warnings won't cause the request to fail.
        You must check the response for field_warnings to understand if all of the data you
        sent was accepted."
    (2) DIE EIGENTLICHE VERARBEITUNG IST ASYNCHRON: "The Data Manager API also performs
        more complex validations asynchronously during processing, and reports any warnings
        or errors in diagnostics." Ob ein Datensatz angenommen wurde, steht erst in der
        Diagnostik — frühestens 30 Minuten, bis zu 24 Stunden später.
    EINE 200 HEISST ALSO "ENTGEGENGENOMMEN UND STRUKTURELL IN ORDNUNG", nicht "verarbeitet"
    und schon gar nicht "gezählt".
    ERSETZT KEINE MESSUNG.

    G2 · WELCHE RUMPFFORMEN KENNT DIE FEHLERANTWORT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/understand-errors (Stand 2026-07-30) und
    /devguides/events/send-events (Stand 2026-08-18). Ein error-Objekt mit code
    (HTTP-Zahl), message, status (kanonischer Name) und details[] — einer Liste
    TYPISIERTER Nutzlasten, jede mit @type:
    · google.rpc.ErrorInfo — reason, domain ("datamanager.googleapis.com"), metadata
      (offene Karte, enthält u.a. requestId)
    · google.rpc.RequestInfo — requestId
    · google.rpc.BadRequest — fieldViolations[] mit field, description, reason
    · google.rpc.Help — links[] mit description, url
    · google.rpc.LocalizedMessage — locale, message
    MEHRERE NUTZLASTEN JE FEHLER SIND AUSDRÜCKLICH MÖGLICH. Das field in fieldViolations
    ist ein PFAD IN SNAKE_CASE MIT INDEX IN ECKIGEN KLAMMERN —
    "events.events[0].user_data.user_identifiers[1]",
    "destinations[0].login_account.account_id".
    ERSETZT KEINE MESSUNG.

    G3 · TRENNT DER STATUSCODE DIE FEHLERKLASSEN — ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/understand-errors (Stand 2026-07-30).
    ZWEISTUFIG, UND DIE GROBE STUFE GENÜGT NICHT:
    · GROB, in error.status: die kanonischen gRPC-Namen. Die Doku teilt sie selbst ein —
      CLIENT-Fehler (INVALID_ARGUMENT, NOT_FOUND, PERMISSION_DENIED, FAILED_PRECONDITION,
      UNAUTHENTICATED; "Don't retry the request without addressing the issue") gegen
      SERVER-Fehler (UNAVAILABLE, INTERNAL, DEADLINE_EXCEEDED, UNKNOWN; wiederholbar, dazu
      ABORTED).
    · FEIN, NUR in details[].reason: das ErrorReason-Enum, s. D6.
    EIN 400 ALLEIN SAGT ALSO "IRGENDETWAS AN DER ANFRAGE"; die Ursache steht ausschliesslich
    in details.
    ERSETZT KEINE MESSUNG.

    G4 · SPIEGELT DIE ANTWORT EIGENE EINGABEN ZURÜCK (ECHO-ACHSE) — ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/understand-errors (Stand 2026-07-30) und
    /devguides/events/send-events (Stand 2026-08-18). JA, UND DIE FORMEN SIND UNGLEICH
    RISKANT:
    (1) FELD-PFADE WERDEN GESPIEGELT, WERTE IN DEN GEZEIGTEN BEISPIELEN NICHT.
        fieldViolations[].field nennt die Stelle mit Index; description beschreibt den
        Mangel, OHNE den Wert zu zitieren: "The HEX encoded value is malformed.", "String is
        not a valid number.", "Email is not hex encoded." KEIN EINZIGES BEISPIEL IM
        GELESENEN UMFANG ZITIERT EINEN EINGESANDTEN WERT.
    (2) EINE EIGENE EINGABE WIRD SEHR WOHL GESPIEGELT, MEHRFACH IN DERSELBEN ANTWORT: die
        PROJEKTNUMMER des aufrufenden Cloud-Projekts. Sie erscheint bei PERMISSION_DENIED in
        error.message, in LocalizedMessage.message, in metadata.consumer, in
        metadata.containerInfo und in einer Help-URL — fünf Stellen in einer Antwort.
    (3) ErrorInfo.metadata IST EINE OFFENE KARTE. Die Doku beschreibt sie als "a metadata
        map with information about the error" und zeigt EINEN Fall. WAS SIE IN ANDEREN
        FÄLLEN TRÄGT, IST AN DER DOKU NICHT ENTSCHEIDBAR — und damit ist auch nicht
        entscheidbar, ob je ein Nutzlast-Wert dort landet.
    DASS DIE BEISPIELE KEINE WERTE SPIEGELN, IST KEINE ZUSICHERUNG; es sind fünf Beispiele.
    ERSETZT KEINE MESSUNG.

    G5 · TRÄGT DIE ERFOLGSANTWORT EINEN RÜCKKANAL — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18),
    /devguides/diagnostics (Stand 2026-07-30), /devguides/concepts/best-practices (Stand
    2026-07-30) und /devguides/concepts/understand-errors (Stand 2026-07-30).
    JA — requestId, UND ER IST HIER MEHR ALS EIN SUPPORT-BEZEICHNER: er ist der EINZIGE
    Schlüssel zur Verarbeitungs-Auskunft. { "requestId":
    "126365e1-16d0-4c81-9de9-f362711e250a" }. RetrieveRequestStatus nimmt GENAU EINE
    requestId. Ohne sie ist nicht feststellbar, ob die Daten verarbeitet wurden. Die Doku
    macht daraus eine Auflage: "Record the requestId returned" und "Capture and collect the
    request_id from each ... response".
    ZWEI EINSCHRÄNKUNGEN: "You can only retrieve diagnostics for requests that succeed and
    don't have validateOnly set to true."
    EINE FORMBEOBACHTUNG, DIE HIER AUSDRÜCKLICH NICHT GEDEUTET WIRD: Die Bezeichner in den
    FEHLER-Beispielen tragen ein Präfix "t-" (t-a8896317-069f-4198-afed-182a3872a660), die
    im ERFOLGS-Beispiel nicht (126365e1-...). KEINE GELESENE SEITE ERKLÄRT DEN UNTERSCHIED.
    Bei Fehlern trägt RequestInfo.requestId denselben Zweck: "When logging errors or
    contacting support, make sure to include the request ID."
    ERSETZT KEINE MESSUNG.

(p) GRUPPE H — BETRIEB (Katalog-Fragen H1 bis H5).

    H1 · GIBT ES EINEN TESTMODUS, UND WECHSELT SEIN WERT — BEANTWORTET (Träger).
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /devguides/diagnostics (Stand 2026-07-30). JA: validateOnly, EIN BOOLEAN AUF DER
    WURZELEBENE DER ANFRAGE. "Set validateOnly to true to validate the request without
    applying the changes. When you're ready to apply the changes, set validateOnly to
    false."
    DIE ZWEITE HÄLFTE DER KATALOG-FRAGE ENTFÄLLT GEGENSTANDSLOS: Es ist ein SCHALTER, kein
    wechselnder Code. Es gibt nichts, was pro Sitzung neu zu beschaffen wäre. Der
    Katalog-Vermerk "Messung nötig für 'wechselt pro Sitzung'" ist damit nicht offen,
    sondern HINFÄLLIG.
    DER PREIS STEHT AUSDRÜCKLICH DABEI: mit validateOnly=true ist KEINE DIAGNOSTIK
    ABRUFBAR. Der Testmodus prüft die Anfrage-Struktur und schneidet dabei genau den Kanal
    ab, der die Verarbeitung belegt.

    H2 · WIE DEDUPLIZIERT DER ANBIETER, UND WAS SETZT ER VORAUS — BEANTWORTET
    (Voraussetzungen; die WIRKUNG bleibt Messung).
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18), Abschnitt "How
    Google handles multi-source data"; dazu /devguides/events (Stand 2026-07-30) und
    /devguides/events/google-ads/online (Stand 2026-07-30).
    ÜBER transactionId, INNERHALB DERSELBEN CONVERSION-ACTION — und die Regel ist FELDWEISE
    VERSCHIEDEN, was sie von jeder einfachen Dedup-Zusage unterscheidet:
    · transactionId TRIFFT ein bestehendes Tag-Ereignis, Feld conversionValue (mit
      currency): ÜBERSCHREIBT den vom Tag erfassten Wert.
    · transactionId TRIFFT ein bestehendes Tag-Ereignis, alle übrigen Felder — ausdrücklich
      auch adIdentifiers.gclid: IGNORIERT. "won't overwrite the field values originally
      recorded by your Google tag".
    · transactionId TRIFFT NICHTS: NEUES Conversion-Ereignis; Google versucht die Zuordnung
      selbst über die mitgegebenen Kennungen.
    GOOGLE ANALYTICS MACHT ES GENAU UMGEKEHRT: dort gewinnt "the information from the first
    instance of the same event that it received" — keine Überschreibung. FLOODLIGHT
    dedupliziert über Floodlight-Aktivitäts-ID PLUS transactionId.
    DIE VORAUSSETZUNG, DIE ALLES TRÄGT: Der gesendete transactionId muss DERSELBE sein, den
    das Google-Tag gesetzt hat. Es gibt keine andere Verbindung zwischen den beiden Quellen.
    TRIFFT ER NICHT, ENTSTEHT NICHT ETWA NICHTS — ES ENTSTEHT EIN ZUSÄTZLICHES EREIGNIS.
    EINE FRIST, DIE KEIN FEHLER IST UND DIE DREIMAL WORTGLEICH DASTEHT: In den ersten
    14 TAGEN je Conversion-Action fliessen die per API gelieferten Multi-Source-Daten NICHT
    in die Gebotssteuerung, und WERT-ÜBERSCHREIBUNGEN SIND ABGESCHALTET ("value updates are
    disabled. The tag's value won't be overridden in Google Ads reporting until the trial
    period ends"). Für die bestehende Tag-Datenquelle gilt das nicht. Nach Ablauf werden
    die Ereignisse automatisch gebotsfähig.

    H3 · MENGENBESCHRÄNKUNGEN, 429, WIEDERHOLUNGSVERHALTEN — ABGELEGT.
    GELESEN 2026-08-24, /devguides/concepts/best-practices (Stand 2026-07-30) und
    /devguides/concepts/understand-errors (Stand 2026-07-30).
    DAS VERHALTEN IST BELEGT, DIE ZAHLEN STEHEN AUF EINER NICHT KARTIERTEN UND DESHALB
    NICHT GEÖFFNETEN SEITE (/devguides/limits, s. (h) und (s)/Lücke A).
    BELEGT IST:
    · GLEICHZEITIGKEIT: "We recommend sending up to 10 requests concurrently to reduce the
      likelihood of exceeding the requests per minute limit." Ausdrücklich erlaubt auch bei
      identischen destinations.
    · STAPELBILDUNG: "batch as many items as possible in each request, up to the
      per-request limits" — um "daily request limits" zu unterlaufen.
    · ES EXISTIEREN ALSO MINDESTENS DREI GRENZEN: je Anfrage, je Minute, je Tag.
    · WIEDERHOLUNG: exponentielles Zurückweichen MIT JITTER, ausschliesslich bei
      UNAVAILABLE, DEADLINE_EXCEEDED, INTERNAL, UNKNOWN, ABORTED. Beispiel der Doku: 1 s,
      2 s, 4 s. Bei Client-Fehlern NICHT wiederholen.
    · EIN 429 ODER RESOURCE_EXHAUSTED WIRD AUF KEINER DER SIEBZEHN GELESENEN SEITEN
      GENANNT — auch nicht in der Client-/Server-Einteilung.
    ERSETZT KEINE MESSUNG. UND: DIESE FRAGE IST NICHT ABGESUCHT — s. (s)/Lücke A.

    H4 · NIMMT DER ENDPUNKT MEHRERE EREIGNISSE JE AUFRUF AN — ABGELEGT.
    GELESEN 2026-08-24, /devguides/events/send-events (Stand 2026-08-18) und
    /devguides/concepts/understand-errors (Stand 2026-07-30). JA, AUSDRÜCKLICH UND IN ZWEI
    DIMENSIONEN:
    · MEHRERE EREIGNISSE: events ist ein Array; der Leitfaden führt drei Ereignisse in
      einer Anfrage vor.
    · MEHRERE ZIELE IN DERSELBEN ANFRAGE: destinations[].reference (frei wählbar, nur
      Eindeutigkeit gefordert) plus event.destinationReferences[]. OHNE
      destinationReferences GEHT JEDES EREIGNIS AN ALLE DESTINATIONS. Bei mehreren Zielen
      sendet der Anbieter je Ziel nur die passenden Felder.
    · HÖCHSTZAHL: "See Limits and quotas for the maximum number of destinations per
      request" — nicht geöffnet, s. H3.
    WAS ZWINGEND DAZUGEHÖRT UND DIE STAPELBILDUNG TEUER MACHT: Wegen FAST-FAIL (s. D5)
    verwirft EIN EINZIGES strukturell fehlerhaftes Ereignis die GESAMTE Anfrage samt aller
    übrigen Ereignisse. Stapel und Fehlertoleranz stehen hier gegeneinander.
    ERSETZT KEINE MESSUNG.

    H5 · WELCHES INSTRUMENT TAUGT FÜR EINEN LIVE-TEST, UND WELCHES TÄUSCHT — ABGELEGT.
    GELESEN 2026-08-24, /devguides/diagnostics (Stand 2026-07-30),
    /devguides/events/send-events (Stand 2026-08-18) und /devguides/events (Stand
    2026-07-30).
    TAUGLICH NENNT DIE DOKU GENAU EINES: RetrieveRequestStatus mit der requestId. Es liefert
    JE DESTINATION: requestStatus aus { REQUEST_STATUS_UNKNOWN, SUCCESS, PROCESSING, FAILED,
    PARTIAL_SUCCESS } ·
    eventsIngestionStatus.recordCount ("includes both successful and failed records") ·
    warningInfo[] (je Eintrag reason + recordCount) · errorInfo[] (je Eintrag reason +
    recordCount).
    Die Trennung ist scharf definiert: "An error indicates that the API completely rejected
    the record. A warning indicates that the API didn't reject the record, but it had to
    ignore portions of the record's data."
    VIER INSTRUMENTE TÄUSCHEN, UND DREI DAVON SEHEN WIE ERFOLG AUS:
    (1) DER HTTP-STATUS ALLEIN — 200 heisst entgegengenommen, nicht verarbeitet (s. G1).
    (2) validateOnly=true — danach ist GAR KEINE Diagnostik abrufbar; der Testmodus
        schneidet den einzigen tauglichen Kanal ab.
    (3) EIN BLICK VOR ABLAUF DER WARTEZEIT — bei PROCESSING sind warnings und errors
        ausdrücklich NOCH NICHT BEFÜLLT. Ein leeres errorInfo heisst dann "noch nicht
        bekannt", nicht "keine Fehler" — und die beiden sind am Feld nicht zu
        unterscheiden.
    (4) DER BLICK IN DIE GOOGLE-ADS-OBERFLÄCHE INNERHALB DER 14 TAGE — die Ereignisse
        erscheinen in der Berichterstattung, wirken aber nicht auf die Gebote, und
        Wert-Überschreibungen sind abgeschaltet (s. H2).
    DIE ZEITACHSE IST TEIL DES BEFUNDS: 30 Minuten warten, dann abfragen;
    Rückfallmultiplikator 1,3; Deckel 60 Minuten; Gesamtdauer BIS 24 STUNDEN — die Doku
    führt eine Tabelle mit 25 Versuchen über 23:59 Stunden vor.
    ERSETZT KEINE MESSUNG.

(q) GRUPPE I — VORAUSSETZUNGEN BEIM ANBIETER, DIE KEIN AUFRUF SIND (Katalog-Fragen I1 bis
    I5).

    I1 · MUSS BEIM ANBIETER EIN PRODUKT FREIGEGEBEN ODER BEANTRAGT WERDEN — BEANTWORTET
    (Existenz des Verfahrens; der AUSGANG bleibt ein Antrag).
    GELESEN 2026-08-24, /devguides/events (Stand 2026-07-30),
    /devguides/quickstart/set-up-access (Stand 2026-08-14),
    /devguides/concepts/understand-errors (Stand 2026-07-30) und
    /devguides/accounts/partner-links (Stand 2026-08-07).
    JA — VIERFACH GESTAFFELT, UND DIE STUFEN SIND UNABHÄNGIG VONEINANDER. Sie heissen hier
    "STUFE 1" bis "STUFE 4" und NICHT (a) bis (d), damit sie nicht mit den TEILEN (a) bis
    (f) dieses Abschnitts verwechselt werden:
    STUFE 1 · GOOGLE-CLOUD-PROJEKT MIT AKTIVIERTER API. Ohne Aktivierung antwortet die
        Schnittstelle mit HTTP 403 PERMISSION_DENIED, reason "SERVICE_DISABLED". Das Konto,
        das aktiviert, braucht serviceusage.services.enable.
    STUFE 2 · DER ZUGRIFFSBEREICH IST SENSIBEL. "Since the Data Manager API scope is a sensitive
        scope" — Bereich hinzufügen, Veröffentlichungsstatus und Nutzertyp setzen. Und:
        "Any Google Cloud app used to obtain user credentials for the Data Manager API
        scope must undergo Google OAuth verification to avoid an unverified UI screen for
        its users. Google OAuth verification isn't required for service accounts."
    STUFE 3 · DER BEFUND, DER DIESE PHASE BETRIFFT — WÖRTLICH von /devguides/events (Stand
        2026-07-30): "Sending conversion events via the API as an additional data source
        for Google Ads tag conversions is an ALLOWLIST-ONLY FEATURE that can improve ad
        interaction signals and performance."
    STUFE 4 · EIN DATA-PARTNER-KONTO wird "only after going through the approval process"
        ausgegeben; Einstieg ist ein Interessenten-Formular (NICHT ausgefüllt, s. unten).
    DER KONTRAST, AUF DERSELBEN ÜBERSICHTSSEITE UND IN DERSELBEN AUFZÄHLUNG — und er fällt
    eindeutig aus:
    · Google Ads MULTI-SOURCE (zusätzliche Datenquelle zur Tag-Conversion): JA,
      "allowlist-only feature".
    · Google Ads OFFLINE CONVERSIONS / ENHANCED CONVERSIONS FOR LEADS: NEIN — kein
      Vorbehalt genannt.
    · Google Ads STORE SALES: JA, "only available to Google Ads accounts on an allowlist".
    · Google ANALYTICS Multi-Source: JA, "only available to Google Analytics properties on
      an allowlist", mit Formular.
    DIE FREISCHALTUNG HÄNGT ALSO AN DER GESTALT UND NICHT AM PRODUKT, UND VON DEN BEIDEN
    GELESENEN GOOGLE-ADS-GESTALTEN TRÄGT GENAU EINE DEN VORBEHALT.
    HIER WIRD NICHT GEDEUTET, WELCHE GESTALT ZU WÄHLEN IST — diese Datei trägt keine
    Entscheidungen.
    UND DER VERMERK AUS TEIL (g) GEHÖRT AN DIESEN BEFUND: Er ist BESTÄTIGT, nicht unabhängig
    entdeckt.
    EIN NICHT-TREFFER INNERHALB DIESER BEANTWORTETEN FRAGE, DER BENANNT GEHÖRT: Für den
    Google-Analytics-Weg nennt die Doku ein Formular. FÜR DEN GOOGLE-ADS-MULTI-SOURCE-WEG
    NENNT KEINE DER SIEBZEHN GELESENEN SEITEN EINEN ANTRAGSWEG — kein Formular, kein
    Verfahren, keine Anlaufstelle. Es steht dort, DASS eine Liste existiert, und nicht, WIE
    man darauf kommt.
    WAS AUF FREMDEN SEITEN NICHT GETAN WURDE: Vier Aufforderungen standen auf den gelesenen
    Seiten und wurden GEMELDET statt befolgt — "fill out the interest form" (zweimal),
    "Enable the Data Manager API", "Create OAuth2 client" / "Create service account", "Fill
    out the form if you're interested in adding your Google Analytics property to the
    allowlist". Keine Seite verlangte eine Anmeldung, um ihren Text zu lesen.

    I2 · VERLANGT DER ANBIETER DIE ANNAHME VON VERTRAGS- ODER EINWILLIGUNGS-BEDINGUNGEN —
    ABGELEGT.
    GELESEN 2026-08-24, /reference/ecapi (Stand 2026-07-30). ZUR EINWILLIGUNG GIBT ES EINEN
    BELEGTEN MECHANISMUS:
    · Ein Consent-OBJEKT, auf ZWEI EBENEN setzbar: auf Anfrage-Ebene (gilt für alle
      Ereignisse) ODER je Ereignis ("which lets you specify different consent settings for
      individual events").
    · AUSDRÜCKLICH NICHT UNTERSTÜTZT: "Data Manager API does not accept or parse Global
      Privacy Platform (GPP) consent strings." Die ECAPI-Felder gpp_string und gpp_sid
      haben "No equivalent"; die Einwilligung muss in das Consent-Objekt übersetzt werden.
    · DIE FELDSTRUKTUR VON Consent STEHT AUF KEINER DER SIEBZEHN GELESENEN SEITEN —
      Referenz, Lauf 2.
    ZU DEN VERTRAGSBEDINGUNGEN: NICHT ABGESUCHT, UND DER GRUND STEHT DABEI. Eine Seite
    "Terms of service" existiert unter /devguides/terms. Sie war NICHT KARTIERT, deshalb
    nicht zugewiesen und nicht geöffnet (s. (h) und (s)/Lücke A). DIESE FRAGE IST NICHT ALS
    ABGESUCHT ZU FÜHREN.
    ERSETZT KEINE MESSUNG.

    I3 · IST DAS MERKMAL FREIGESCHALTET ODER NUR EINER ALLOWLIST ZUGÄNGLICH — BEANTWORTET
    (Bedingung; die ERREICHBARKEIT bleibt ein Antrag).
    GELESEN 2026-08-24, /devguides/events (Stand 2026-07-30): ALLOWLIST-ONLY für die
    Multi-Source-Gestalt, wörtlich zitiert unter I1, STUFE 3. Der zweite Teil der Frage ("wie
    beantragt man das") ist für den Google-Ads-Weg NICHT beantwortet, s. den Nicht-Treffer
    unter I1. Der AUSGANG eines Antrags steht per Fragenkatalog ohnehin in keiner
    Dokumentation.

    I4 · WELCHE ROLLE MUSS DIE ANMELDENDE IDENTITÄT IM KONTO DES KUNDEN HABEN —
    NICHT-TREFFER.
    GELESEN 2026-08-24, /devguides/concepts/destinations (Stand 2026-08-20), Abschnitt
    "Determine where credentials have access", und /devguides/quickstart/set-up-access
    (Stand 2026-08-14). FÜR GOOGLE ADS NENNT DIE DOKU KEINE ROLLENSTUFE — und der KONTRAST
    zu den anderen Produkten ist das, was diesen Nicht-Treffer scharf macht:
    · GOOGLE ADS: nur, dass das Konto in der Nutzerliste unter "Access and security" >
      "Users" steht. KEINE ROLLE GENANNT.
    · DISPLAY & VIDEO 360: Nutzer auf dem loginAccount.
    · GOOGLE ANALYTICS: "Editor or Administrator role" auf der Property.
    · CAMPAIGN MANAGER 360: Nutzerprofil mit der Berechtigung "Insert offline conversions".
    Zwei von vier Produkten bekommen eine ausdrückliche Stufe, Google Ads nicht. Auch die
    Einrichtungsseite sagt nur "add the email of the user to the Google Ads account or a
    parent Google Ads manager account" bzw. "Complete Account access setup", ohne Stufe.
    ABGESUCHTE ACHSE: die siebzehn Seiten aus (h), Begriffe `role`, `permission`, `access
    level`, `admin`, `standard`, `read-only`.
    DAS IST KEINE ENTWARNUNG — es kann sein, dass jede Nutzerstufe genügt, und es kann
    sein, dass die Stufe in der Google-Ads-Doku steht, die AUSSERHALB dieses Baums liegt.
    An den gelesenen Seiten ist es nicht entscheidbar.
    AUSDRÜCKLICH NICHT DIESELBE ACHSE, DESHALB GETRENNT GEFÜHRT: Auf der CLOUD-Seite sind
    Rollen sehr wohl benannt — roles/owner oder roles/serviceusage.serviceUsageAdmin
    (Aktivierung), roles/serviceusage.serviceUsageConsumer (für das Dienstkonto),
    roles/iam.serviceAccountTokenCreator (für das eigene Konto auf dem Dienstkonto,
    "required even when your Google Account is an owner of the project"). DAS SIND ROLLEN
    IM EIGENEN PROJEKT DES BETREIBERS, NICHT IM KONTO DES KUNDEN. Die Katalog-Frage zielt
    auf das Kundenkonto.

    I5 · VERLANGT DER ANBIETER, DASS DIE AUSLIEFERNDE DOMAIN FREIGEGEBEN IST — NICHT-TREFFER.
    KEINE DER SIEBZEHN GELESENEN SEITEN ERWÄHNT eine Domain-Freigabe, eine
    Traffic-Permission-Liste, eine Herkunfts-Prüfung, eine erlaubte Absender-Domäne oder
    eine Verknüpfung zwischen der ausliefernden Seite und dem Werbekonto.
    ABGESUCHTE ACHSE: die siebzehn Seiten aus (h), Begriffe `domain`, `origin`, `allow
    list`/`allowlist`, `permission`, `referrer`. Der Treffer auf `allowlist` betrifft das
    MERKMAL (s. I1), nicht die Domain; der Treffer auf `permission` betrifft IAM und
    Campaign Manager 360; der Treffer auf `referrer` betrifft das optionale
    Session-Attribut landing_page_referrer.
    DAS IST KEINE ENTWARNUNG, UND DER GRUND IST HIER BESONDERS SCHARF: Der Fragenkatalog
    vermerkt, dass diese Frage den BROWSER-Pfad betrifft und für ein reines Server-Ziel
    folgenlos sein kann. Die Multi-Source-Gestalt ist aber gerade KEIN reines Server-Ziel —
    sie setzt laut Doku eine bestehende Tag-Conversion voraus, also einen Browser-Pfad, den
    ein anderes System bedient. Ob für dieses Google-Tag eine Domain-Freigabe verlangt
    wird, gehört in die Google-Tag- bzw. Google-Ads-Dokumentation und liegt damit
    AUSSERHALB des Data-Manager-Baums. DIE FRAGE IST AN DIESER STELLE NICHT ABSUCHBAR,
    NICHT NEGATIV BEANTWORTET.

(r) ZWEI WIDERSPRÜCHE IN DER ANBIETER-DOKU — BEIDE STELLEN GEMELDET, KEINER AUFGELÖST.

    WIDERSPRUCH 1 — DIE PFLICHT-KENNUNG. DER ERNSTERE VON BEIDEN.
    STELLE A: /devguides/events/send-events (Stand 2026-08-18), Tabelle "Convert the data to
    Event objects", Zeile "Multi-source conversions" — FÜNF Alternativen, mindestens eine
    davon: adIdentifiers mit gclid/gbraid/wbraid · adIdentifiers.landingPageDeviceInfo
    .ipAddress · Session-Attribute · userData · eventDeviceInfo.ipAddress.
    STELLE B: /devguides/diagnostics (Stand 2026-07-30), Abschnitt "Check warnings and
    errors" — ZWEI: "because a valid Event must have at least one of ad_identifiers or
    user_data".
    eventDeviceInfo IST WEDER adIdentifiers NOCH userData — es ist ein eigenes Feld auf
    Event-Ebene, bestätigt durch die ECAPI-Zuordnung (/reference/ecapi, Stand 2026-07-30):
    event_ip_address -> event_device_info.ip_address, GETRENNT von landing_ip_address ->
    ad_identifiers.landing_page_device_info.ip_address.
    NACH STELLE A GENÜGT ES ALLEIN, NACH STELLE B NICHT.
    WARUM DAS NICHT AKADEMISCH IST: Ein Server-Aufruf ohne Klick-Kennung hätte
    typischerweise genau das — die IP des Ereignisses. Ob das eine gültige Nutzlast ist,
    entscheidet sich an diesen zwei Sätzen, und sie sagen Verschiedenes.
    HIER NICHT AUFGELÖST.

    WIDERSPRUCH 2 — DIE SCHREIBWEISE DER FELDNAMEN IM REST-RUMPF.
    STELLE A: /devguides/events/send-events (Stand 2026-08-18) und /data-manager/api
    (Startseite) verwenden durchgehend CAMELCASE — transactionId, conversionValue,
    operatingAccount, productDestinationId, eventTimestamp.
    STELLE B: /reference/ecapi (Stand 2026-07-30) zeigt ein vollständiges, als gültig
    bezeichnetes IngestEventsRequest durchgehend in SNAKE_CASE — transaction_id,
    conversion_value, operating_account, product_destination_id, event_timestamp,
    event_device_info.
    Beides steht als Beispiel für DIESELBE REST-Schnittstelle. KEINE DER SIEBZEHN SEITEN
    SAGT, OB BEIDE SCHREIBWEISEN ZULÄSSIG SIND oder ob eine der Seiten veraltet ist.
    EIN NEBENBEFUND, DER DAZUGEHÖRT: In den FEHLERANTWORTEN sind die Feldpfade durchgängig
    snake_case ("events.events[0].user_data.user_identifiers[1]") — auch dann, wenn die
    Anfrage camelCase war.
    HIER NICHT AUFGELÖST.

(s) DIE LÜCKEN DIESER LESUNG — SECHS, A BIS F.

    LÜCKE A — DIE KARTE WAR UNVOLLSTÄNDIG. DREI SEITEN DES ABSCHNITTS FEHLTEN DARIN.
    /devguides/limits ("Limits and quotas") · /devguides/terms ("Terms of service") ·
    /support/contact. Sie stehen NICHT im Navigationsbaum, den die Seiten im Markup
    mitliefern, und wurden erst über Verweise im FLIESSTEXT sichtbar. Sie sind NICHT
    geöffnet worden.
    DARAN HÄNGEN: H3 (alle Zahlen), H4 (Höchstzahl der Ziele je Anfrage), I2
    (Vertragsbedingungen). Diese Fragen stehen oben als ABGELEGT und AUSDRÜCKLICH NICHT als
    NICHT-TREFFER.
    DIE ÜBERTRAGBARE LEHRE: Wer den Umfang eines Doku-Abschnitts aus der NAVIGATION
    ableitet, unterschätzt ihn — und zwar ohne dass etwas rot wird.

    LÜCKE B — EIN ZÄHLFEHLER IN DER KARTE HAT DEN AUFTRAG GEPRÄGT.
    In der vorgelegten Karte stand "partner-links (4 Seiten)". ES SIND FÜNF: partner-links ·
    create-partner-link · retrieve-partner-links · google-ads/upgrade/steps ·
    google-ads/upgrade/field-mappings. Der Auftrag schrieb daraufhin "partner-links (alle
    vier)" und schloss zugleich "alle upgrade/-Unterbäume" aus. BEIDES ZUGLEICH IST NICHT
    ERFÜLLBAR. Gelesen wurden die DREI Seiten ausserhalb des upgrade/-Unterbaums; die zwei
    darin sind NICHT geöffnet — die ausdrückliche Ausschluss-Regel schlägt die aus einem
    Zählfehler abgeleitete Stückzahl. DAS IST HIER OFFENGELEGT UND NICHT STILLSCHWEIGEND
    AUFGELÖST.

    LÜCKE C — EIN TOTER VERWEIS IN DER ANBIETER-DOKU, GENAU AN DER EINWILLIGUNG.
    Auf /reference/ecapi (Stand 2026-07-30) steht ZWEIMAL der Verweistext "Privacy and
    consent overview". BEIDE zeigen auf href="#overview" — einen Anker auf DERSELBEN Seite,
    nicht auf einen Einwilligungs-Leitfaden. EIN SOLCHER LEITFADEN IST ÜBER DIE SIEBZEHN
    GELESENEN SEITEN NICHT ERREICHBAR. Folge: Die einzige inhaltliche Aussage zur
    Einwilligung im gesamten gelesenen Umfang ist die ECAPI-Zeile (s. I2).

    LÜCKE D — KEIN ZEITFENSTER FÜR GOOGLE ADS.
    Für Google Analytics stehen 72 Stunden und 48 Stunden ausdrücklich da. FÜR GOOGLE ADS
    MULTI-SOURCE NENNT KEINE DER SIEBZEHN GELESENEN SEITEN EIN FENSTER. Bei einer Gestalt,
    die auf die Übereinstimmung mit einem Tag-Ereignis angewiesen ist, ist die Abwesenheit
    dieser Angabe bemerkenswert; SIE IST KEINE AUSSAGE, DASS ES KEIN FENSTER GIBT.

    LÜCKE E — KEIN ROHER HTTP-AUFRUF FÜR DIE EREIGNIS-EINLIEFERUNG.
    Keine der siebzehn Seiten zeigt Methode, vollständige URL oder Authorization-Kopfzeile
    für IngestEvents. Der Leitfaden führt ausschliesslich über den API-Explorer im Browser
    und über Client-Bibliotheken in sechs Sprachen. Der einzige rohe Aufruf im gelesenen
    Umfang steht auf der Startseite und betrifft audiencemembers:ingest. B1 UND B3 SIND
    DESHALB VERTAGT, NICHT ALS NICHT-TREFFER GEFÜHRT.

    LÜCKE F — AN DER DOKU NICHT ENTSCHEIDBAR. Vier Punkte, ausdrücklich als unentscheidbar
    gemeldet statt gefüllt:
    · Ob ErrorInfo.metadata je einen NUTZLAST-Wert trägt (G4). Die Karte ist offen, fünf
      Beispiele sind keine Zusicherung.
    · Ob productDestinationId oder die Kundennummer als vertraulich gelten (C4).
    · Welche Rollenstufe ein Google-Ads-Konto verlangt (I4).
    · Ob die snake_case-Fassung aus /reference/ecapi gleichwertig gültig ist (r,
      Widerspruch 2).
      ERSETZT AM 2026-08-28 — DIESER PUNKT IST BEANTWORTET: JA, GLEICHWERTIG. GEMESSEN
      (OWNER), Messung B1, s. (bq). Die Frage stand hier in der GLEICHWERTIGKEITS-Form, und
      genau die ist gemessen — Aufruf 6 (snake_case) erreicht dieselbe Prüfschicht wie 4 und
      5 (camelCase), mit identischem Feldpfad und identischem reason.
      AN DER DOKU IST ER WEITERHIN NICHT ENTSCHEIDBAR, und deshalb bleibt er unter dieser
      Überschrift stehen statt zu verschwinden: LÜCKE F zählt, was DIESE LESUNG nicht
      entscheiden konnte. Das bleibt richtig. Beantwortet hat es ein Aufruf.

### Acht Fragen ohne Katalog-Ort (2026-08-24) — UNBEANTWORTET, UND SIE STEHEN NICHT IM KATALOG

**WAS DIESER ABSCHNITT IST UND WAS ER AUSDRÜCKLICH NICHT IST:** Acht Fragen, die beim
Lesen der Anbieter-Doku aufgefallen sind und für die der Fragenkatalog
(docs/ziel-fragenkatalog.md) KEINEN Ort hat. Sie sind hier GESAMMELT und NICHT
BEANTWORTET. SIE SIND NICHT IN DEN KATALOG EINGETRAGEN WORDEN — ob der Katalog wächst, ist
eine Entscheidung, die hier nicht fällt und in dieser Datei auch nicht fallen kann: Diese
Datei trägt Befunde, keine Entscheidungen.

**SIE TRAGEN BEWUSST KEINE BUCHSTABEN.** Ein Buchstabe machte sie von aussen als BEFUND
zitierbar, und sie sind keiner — sie sind Fragen. Wer sie später aufnimmt, vergibt die
Buchstaben dort, wo sie beantwortet werden.

1. WIE GELANGT DERSELBE transactionId IN BEIDE QUELLEN? Die Dedup-Zusage setzt voraus, dass
   das Google-Tag und der Server-Aufruf denselben Wert tragen. Der Katalog fragt (H2), WIE
   der Anbieter dedupliziert — nicht, wer die gemeinsame Kennung erzeugt und wie sie
   zwischen zwei Systemen synchron bleibt.
2. WAS GESCHIEHT BEI EINEM TYP-FEHLGRIFF DER CONVERSION-ACTION? Multi-Source verlangt Typ
   WEBPAGE, offline verlangt UPLOAD_CLICKS. Der Katalog fragt nach der FORM der Kennung
   (C1), nicht nach dem Verhalten, wenn die Kennung formal gültig ist und auf ein Objekt
   des falschen Typs zeigt.
3. WESSEN KONTINGENT VERBRAUCHT DIE VERSCHLÜSSELUNG? Die Doku sagt, die
   Entschlüsselungs-Aufrufe des Anbieters verbrauchen Kontingent im KMS-Projekt des
   BETREIBERS. Der Katalog kennt keine Frage nach Kosten oder Kontingenten, die beim
   EIGENEN Konto anfallen, weil ein Anbieter etwas tut.
4. WIE VERTRÄGT SICH FAST-FAIL MIT EREIGNISSEN AUS VERSCHIEDENEN QUELLEN? Der Katalog
   fragt, ob mehrere Ereignisse je Aufruf gehen (H4). Er fragt nicht, was ein
   Alles-oder-nichts-Modell für einen Stapel bedeutet, dessen Einzelteile von verschiedenen
   Besuchern stammen.
5. LÄSST SICH EIN requestId EINEM EINZELNEN EREIGNIS ZUORDNEN? Die Diagnostik antwortet je
   Anfrage und je Ziel, mit Zählern je Grund. Ob ein BESTIMMTES Ereignis angekommen ist,
   scheint daraus nicht ableitbar — der Katalog hat für diese Auflösungs-Achse keine Frage.
6. IST DER 14-TAGE-ZEITRAUM JE CONVERSION-ACTION ODER JE KONTO, UND WODURCH BEGINNT ER? Der
   Katalog kennt keine Frage nach einer Einführungsphase, in der ein Ziel Daten annimmt,
   aber anders verarbeitet.
7. EIN CLOUD-PROJEKT JE KUNDE ODER EINES FÜR ALLE? Der Zugang hängt an einem
   Google-Cloud-Projekt mit aktivierter API. Der Katalog fragt nach dem Weg zum
   Zugangsdatum (A1), nicht nach der Vervielfältigung der darunterliegenden Infrastruktur
   bei mehreren Kunden.
8. WIE VERHÄLT SICH RetrieveRequestStatus ZU DEN MENGENGRENZEN? Die empfohlene Abfolge
   erzeugt bis zu 25 zusätzliche Aufrufe je Einlieferung über 24 Stunden. Der Katalog fragt
   nach Grenzen für die EINLIEFERUNG (H3), nicht danach, ob der Diagnostik-Kanal gegen
   dieselben Grenzen läuft.

NICHT AUFGEFÜHRT, WEIL BEREITS VERGEBEN: der Unterschied zwischen events.ingest und
adEvents.ingest. Er ist vom Architekten als Katalog-Frage der Gruppe B für LAUF 2 gesetzt
worden.

### Abschnitts-Lesung 2026-08-24 der Data-Manager-Dokumentation, LAUF 2 (die Referenz) — die Teile (t) bis (z)

**HERKUNFT — GELESEN, NICHTS GEMESSEN (2026-08-24):** Wie in LAUF 1 ist KEIN Aufruf gegen
eine Google-Schnittstelle gefahren worden. Basis aller Pfade, wo nichts anderes steht:
developers.google.com/data-manager/api. Jede Angabe nennt Seitenpfad und den Doku-Stand,
den die Seite selbst ausweist.

**DIES IST LAUF 2 VON ZWEI, UND DAMIT IST DER CRAWL ABGESCHLOSSEN.** Die Einstufung
"VERTAGT AUF LAUF 2" aus dem LAUF-1-Unterabschnitt entfällt: Was nach diesem Lauf offen
ist, ist NICHT-TREFFER oder ABGELEGT, nicht vertagt.

**WAS HIER NICHT STEHT — und das ist die Bauregel dieses Unterabschnitts:** Er wiederholt
NICHT, was in den Teilen (g) bis (s) schon steht. Wo die Referenz nur bestätigt, steht ein
SATZ. Ausführlich steht nur, was NEU oder ABWEICHEND ist.

**ZWEI EINSTUFUNGEN SIND DURCH DIESEN LAUF GEWANDERT, UND SIE WERDEN HIER GENANNT UND NICHT
IM ALTEN TEXT NACHGETRAGEN** — sonst laufen zwei Fassungen derselben Frage nebeneinander:
H3 (von ABGELEGT auf BEANTWORTET, s. (x)) und I4 (von NICHT-TREFFER auf ABGELEGT, s. (x)).
Dasselbe gilt für die Fenster-Hälfte von D3 (s. (w)).

(t) DER GELESENE UMFANG VON LAUF 2 — SECHZEHN SEITEN, ALLE ZUGEWIESEN, KEINE AUSWEITUNG.
    Alle am 2026-08-24 abgerufen, alle HTTP 200. Werkzeug wie in LAUF 1: textbasierter
    HTTP-Abruf mit eigener HTML-nach-Text-Extraktion; Playwright-MCP NICHT benutzt.

    BAUM 6 — DIE NUTZLAST-QUELLE (eine Seite):
     1. /reference/rpc/google.ads.datamanager.v1 — "Package google.ads.datamanager.v1" —
        2026-08-06

    BAUM 5 — DIE DREIZEHN ZUGEWIESENEN:
     2. /reference/rest/v1/events — "REST Resource: events" — 2025-06-24
     3. /reference/rest/v1/events/ingest — "Method: events.ingest" — 2026-07-28
     4. /reference/rest/v1/adEvents/ingest — "Method: adEvents.ingest" — 2026-07-28
     5. /reference/rest/v1/Destination — "Destination" — 2026-02-17
     6. /reference/rest/v1/Consent — "Consent" — 2025-03-06
     7. /reference/rest/v1/UserData — "UserData" — 2026-07-28
     8. /reference/rest/v1/Encoding — "Encoding" — 2025-03-06
     9. /reference/rest/v1/EncryptionInfo — "EncryptionInfo" — 2026-07-28
    10. /reference/rest/v1/Status — "Status" — 2025-12-12
    11. /reference/rest/v1/ErrorInfo — "ErrorInfo" — 2026-07-28
    12. /reference/rest/v1/ErrorReason — "ErrorReason" — 2026-07-28
    13. /reference/rest/v1/Code — "Code" — 2025-12-12
    14. /reference/rest/v1/requestStatus/retrieve — "Method: requestStatus.retrieve" —
        2026-07-28

    AUS LÜCKE A DES ERSTEN LAUFS (zwei Seiten) — BEIDE ÜBER DIE GENANNTEN PFADE ERREICHBAR,
    HTTP 200:
    15. /devguides/limits — "Limits and quotas" — 2026-07-30
    16. /devguides/terms — "Terms of service" — KEIN "Last updated"; die Seite trägt
        stattdessen "Last modified: November 9, 2021"
    DER LAUF-1-BEFUND WAR RICHTIG: Es gibt sie, sie stehen nur nicht im Navigationsbaum.

    NACHRANGIGE SEITEN: KEINE GEÖFFNET. DeviceInfo, BadRequest, FieldWarning, Help und
    RequestInfo blieben zu, weil keine Katalog-Frage sie noch gebraucht hat — die
    DeviceInfo-Felder stehen vollständig auf der bereits zugewiesenen RPC-Sammelseite
    (s. (w)/E1), die vier übrigen sind durch die gelesenen REST-Seiten derselben Typen
    gedeckt.

    GESEHEN, NICHT GEÖFFNET — mit Grund:
    · /reference/rpc/google.rpc — ZWEITE RPC-Sammelseite, von der zugewiesenen verlinkt.
      Trägt die Standard-Google-Typen (Status, Code, ErrorInfo, BadRequest, Help,
      RequestInfo, LocalizedMessage). Nicht zugewiesen und durch die fünf gelesenen
      REST-Seiten derselben Typen gedeckt.
    · /reference/rest/v1/adEvents und /reference/rest/v1/requestStatus — die
      Ressourcen-Übersichtsseiten zu den zwei Methoden. Nicht zugewiesen; die Methoden
      selbst sind gelesen.
    · Alles zu userList*, audienceMembers* und accountTypes.accounts.* (rund fünfundvierzig
      Seiten) — vom Auftrag ausgeschlossen, Zielgruppen-Verwaltung.
    · /support/contact · GA4 und Measurement Protocol · alle Leitfaden-Bäume aus LAUF 1 —
      vom Auftrag ausgeschlossen.
    · Die ?apix=true-Adressen sind KEINE eigenen Seiten, sondern der API-Explorer auf
      derselben Seite.

    KARTEN-KONTROLLE — ZERFÄLLT DIE REFERENZ IN MEHR SEITEN ALS ZUGEWIESEN? NEIN. Ein
    formaler Abgleich aller Verweise der gelesenen Seiten gegen die Zuweisung ergibt GENAU
    EINE Seite ausserhalb, und sie ist ausgeschlossen: /reference/analytics/
    recommended-events (GA4).

    DIE ZWEI VERFAHRENS-BEFUNDE AUS LAUF 1, NACHGEPRÜFT:
    · FLIESSTEXT GEGEN NAVIGATION: Innerhalb der Referenz KEINE weitere Seite gefunden, die
      nur über Fliesstext erreichbar wäre. Die drei Fälle aus LAUF 1 lagen sämtlich im
      Leitfaden-Baum; zwei sind mit diesem Lauf gelesen, die dritte ist ausgeschlossen.
    · TABELLEN MIT SYMBOL-INHALT: Die einzige Tabelle im Umfang steht auf /devguides/limits.
      Gegenprobe am Rohmarkup: KEIN Inhalt verloren — die Zellen tragen Text, keine Symbole.
      Der Symbolverlust aus LAUF 1 wiederholt sich hier nicht.

    AUF FREMDEN SEITEN NICHT GETAN: keine Anmeldung, keine Eingabe, kein Download, kein
    Klick auf "Try it!" oder den API-Explorer. KEINE Seite verlangte eine Anmeldung, um
    ihren Text zu lesen. EINE Aufforderung stand auf /devguides/terms und wird GEMELDET,
    NICHT BEFOLGT: "By using this API, you consent to be bound by the Google APIs Terms of
    Service."

(u) DIE FÜNF BENANNTEN FRAGEN AUS LAUF 1 — IHR ERGEBNIS.

    FRAGE 1 · B1, DIE VOLLSTÄNDIGE URL DES EREIGNIS-AUFRUFS — BEANTWORTET. DIE ABLEITUNG
    AUS LAUF 1 WAR RICHTIG UND IST JETZT GELESEN.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), Abschnitt
    "HTTP request":
      POST https://datamanager.googleapis.com/v1/events:ingest
    Dazu wörtlich: "The URL uses gRPC Transcoding syntax."
    FOLGE FÜR DEN LAUF-1-TEXT: Die Kennzeichnung als ABLEITUNG in (j)/B1 ist im selben Zug
    ENTFALLEN — der Wert ist GELESEN, nicht mehr geschlossen.

    FRAGE 2 · B3, DER TRÄGER DES ZUGANGSDATUMS — NICHT-TREFFER. DIE REFERENZ NENNT DEN
    BEREICH, NICHT DEN TRÄGER.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), Abschnitt
    "Authorization scopes", vollständig: "Requires the following OAuth scope:
    https://www.googleapis.com/auth/datamanager". Das ist alles — KEINE Kopfzeile, KEIN
    Präfix, KEINE Schreibweise.
    ABGESUCHTE ACHSE: alle SECHZEHN Seiten aus (t), Begriffe `Authorization: `, `Bearer `,
    `access_token=`, `X-Goog-`. NULL Treffer auf keiner einzigen Seite — auch nicht auf
    adEvents/ingest, requestStatus/retrieve oder der RPC-Sammelseite.
    DAS IST KEINE ENTWARNUNG. Der Träger existiert; er steht in Googles allgemeiner
    Authentifizierungs-Doku, die AUSSERHALB dieses Baums liegt. ZWEI LÄUFE ÜBER DEN
    VOLLSTÄNDIGEN BAUM HABEN DIE FRAGE NICHT BEANTWORTET — das ist selbst der Befund.
    Was die Referenz stattdessen bietet: einen API-Explorer ("Try it!", ?apix=true), in dem
    die Oberfläche das Token selbst setzt.

    FRAGE 3 · WIDERSPRUCH 1, IST eventDeviceInfo.ipAddress ALLEIN EINE GÜLTIGE KENNUNG —
    DIE REFERENZ VERSCHÄRFT DEN WIDERSPRUCH. Sie schweigt nicht und löst nicht auf.
    NEUE AUSSAGE A — DIE FELD-ANNOTATION. GELESEN 2026-08-24,
    /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28) und
    /reference/rpc/google.ads.datamanager.v1 (Doku-Stand 2026-08-06): Im Event ist JEDES
    Identitätsfeld als "Optional" markiert — userData, adIdentifiers, eventDeviceInfo. UND
    ES GIBT IN DER GESAMTEN REFERENZ KEINE "at least one"-REGEL FÜR DAS Event. Abgesuchte
    Achse: events/ingest und die RPC-Sammelseite, Begriffe `at least one`, `exactly one`,
    `one of the following`, `must be set`, `mutually exclusive`. Die einzigen Treffer
    betreffen ANDERE Objekte — UserData ("At least one identifier is required"),
    CompositeData, MobileData, PairData —, NICHT das Event.
    NEUE AUSSAGE B — UND SIE IST DIE HÄRTERE. GELESEN 2026-08-24,
    /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28): NO_IDENTIFIERS_PROVIDED —
    "Events data contains no user identifiers or ad identifiers. For Floodlight Event
    ingestion this error indicates requests contains no ad identifiers." DAS BENENNT ZWEI
    KATEGORIEN, NICHT FÜNF; eventDeviceInfo kommt nicht vor.
    DER STAND NACH LAUF 2 — VIER STELLEN, DREI AUSSAGEN, HIER NICHT AUFGELÖST:
    · /devguides/events/send-events (2026-08-18), Tabelle "Convert the data to Event
      objects", Zeile "Multi-source conversions": FÜNF Alternativen, darunter
      eventDeviceInfo.ipAddress.
    · /devguides/diagnostics (2026-07-30): ZWEI — "at least one of ad_identifiers or
      user_data".
    · /reference/rest/v1/ErrorReason (2026-07-28), NO_IDENTIFIERS_PROVIDED: ZWEI.
    · /reference/rest/v1/events/ingest (2026-07-28) und die RPC-Seite (2026-08-06): KEINE
      ist Pflicht.
    ES STEHT ZWEI GEGEN EINS GEGEN DIE FÜNFER-LISTE, plus eine vierte Stelle, die gar keine
    Pflicht kennt. DER WIDERSPRUCH IST NACH LAUF 2 GRÖSSER ALS VORHER.

    FRAGE 4 · WIDERSPRUCH 2, camelCase ODER snake_case — BEANTWORTET, ABER NICHT AN DER DOKU.
    ERSETZT AM 2026-08-28: Hier stand als Ergebnis "AN DER DOKU NICHT ENTSCHEIDBAR". Das ist
    ÜBERHOLT — nicht weil die Doku etwas anderes sagt, sondern weil GEMESSEN worden ist.
    DAS ERGEBNIS: BEIDE SCHREIBWEISEN SIND ZULÄSSIG, und zwar gleichwertig. GEMESSEN
    2026-08-28 (OWNER), Messung B1 — Volltext s. (bq), der Lauf s. (bn).
    WARUM DIESE STELLE ERSETZT WIRD UND (bm)/GRENZE 1 NICHT: Dieser Teil trägt ein ERGEBNIS
    auf eine Katalog-Frage, und ein Ergebnis, das überholt ist, wird richtiggestellt. Jener
    trägt eine Aussage über die Grenzen einer BENANNTEN Messung; die bleibt wahr und bekommt
    einen Vorbehalt danebengestellt.
    DIE DOKU-BEOBACHTUNG DARUNTER BLEIBT WÖRTLICH STEHEN — sie sagt, was am Dokument steht,
    und das ist unverändert richtig: DIE REFERENZ ENTSCHEIDET ES NICHT.
    WAS SIE ZEIGT: Dieselbe Event-Nachricht in beiden Schreibweisen, systematisch.
    /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), "JSON representation":
    destinationReferences, transactionId, eventTimestamp, lastUpdatedTimestamp, userData,
    adIdentifiers, eventSource, eventDeviceInfo, cartData, customVariables,
    experimentalFields, userProperties, additionalEventParameters, thirdPartyUserData,
    eventLocation, appInstanceId, conversionValue, conversionCount — durchgehend CAMELCASE.
    /reference/rpc/google.ads.datamanager.v1 (Doku-Stand 2026-08-06), Message Event:
    destination_references[], transaction_id, event_timestamp, last_updated_timestamp,
    user_data, ad_identifiers, event_source, event_device_info, cart_data,
    custom_variables[], experimental_fields[], user_properties — durchgehend SNAKE_CASE.
    WAS SIE NICHT SAGT: ob beide Schreibweisen im Rumpf des REST-Aufrufs ZULÄSSIG sind.
    ABGESUCHTE ACHSE: alle sechzehn Seiten, Begriffe `camel`, `snake`, `lowerCamel`,
    `field name`, `proto3 JSON`, `JSON mapping`, `both.*accepted`.
    DIE SUCHE LIEFERT GENAU EINEN EINSCHLÄGIGEN TREFFER, UND ER BETRIFFT EINE ANDERE SACHE:
    Die RPC-Seite sagt an fünf Stellen, alle zu FILTER-ZEICHENKETTEN von Listen-Aufrufen
    (userLists, partnerLinks, userListDirectLicenses): "Fields must be specified using
    either all camel case or all snake case. Don't use a combination of camel case and
    snake case." DAS IST EINE REGEL FÜR FILTER-AUSDRÜCKE IN RESSOURCEN-ABFRAGEN, NICHT FÜR
    DEN RUMPF DES EINLIEFERUNGS-AUFRUFS. Sie auf events:ingest zu übertragen wäre eine
    ABLEITUNG, und sie wird hier NICHT gemacht.
    AN DER DOKU NICHT ENTSCHEIDBAR. Die zwei Bäume sind erkennbar die Protobuf- und die
    JSON-Sicht DERSELBEN Schnittstelle; dass beide Schreibweisen im REST-Rumpf angenommen
    werden, folgt daraus aber nicht aus dem TEXT.
    NACHGETRAGEN 2026-08-28: Der letzte Satz ist als Aussage über den TEXT weiterhin richtig
    — die Ableitung wäre unzulässig gewesen. Sie ist auch nicht gemacht worden: die Antwort
    kommt aus einer MESSUNG, nicht aus dem Text (s. (bq)).

    FRAGE 5 · adEvents/ingest GEGEN events/ingest — BEANTWORTET, UND EINDEUTIG.
    GELESEN 2026-08-24, /reference/rest/v1/adEvents/ingest (Doku-Stand 2026-07-28), erster
    Satz: "Uploads a list of AdEvent resources TO GOOGLE ANALYTICS. This feature is only
    available to accounts on an allowlist."
    adEvents:ingest GEHT AN GOOGLE ANALYTICS, NICHT AN GOOGLE ADS. Für Google Ads gilt
    events:ingest. Am Text entschieden, nicht aus der Leitfaden-Sicht erraten.
    VIER WEITERE UNTERSCHIEDE, die den Befund stützen und keine Vermutung sind:
    · URL: POST .../v1/adEvents:ingest gegen POST .../v1/events:ingest.
    · destinations: bei adEvents GAR NICHT VORHANDEN — kein Destination im Rumpf; das Ziel
      steckt in AdEvent.advertiserId. Bei events:ingest ist es Required.
    · encryptionInfo: bei adEvents REQUIRED, bei events:ingest Optional.
    · validateOnly: bei adEvents als "(deprecated)" markiert.
    DIE FOLGENREICHSTE ZEILE: "If successful, the response body is EMPTY." adEvents:ingest
    gibt KEINE requestId zurück und ist damit an die Diagnostik über RetrieveRequestStatus
    gar nicht angeschlossen.
    UND DER INHALT BESTÄTIGT ES FACHLICH: AdEvent trägt eventType, adType, adFormat,
    adPlacement, targetingType, platformType und viewabilityInfo mit viewType und
    mediaQuartile — Anzeigen-Ausspielungs- und Sichtbarkeitsdaten, keine Conversions.

(v) NEU ODER ABWEICHEND — GRUPPEN A BIS C.

    GRUPPE A (A1 bis A5) — BESTÄTIGT, NICHTS NEUES. Die Referenz nennt an drei Stellen den
    Bereich https://www.googleapis.com/auth/datamanager und sonst nichts zum Zugang;
    Beschaffung, Form, Frist, Erneuerung und Prüfinstrument stehen dort nicht. Die
    Einstufungen aus LAUF 1 bleiben unverändert.

    B1 — s. (u), Frage 1. BEANTWORTET.
    B3 — s. (u), Frage 2. NICHT-TREFFER mit Reichweite; KEINE ENTWARNUNG.

    B2 · NEU, UND ES ERWEITERT DIE REICHWEITE DER LAUF-1-ANGABE — BEANTWORTET.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28) und
    /reference/rest/v1/adEvents/ingest (Doku-Stand 2026-07-28): Beide Ingest-Seiten tragen
    den Zusatz "The URL uses gRPC Transcoding syntax." DIE REST-ADRESSE IST EINE ABBILDUNG
    DES gRPC-DIENSTES, KEINE EIGENSTÄNDIGE SCHNITTSTELLE. Das erklärt die Doppelgestalt aus
    Widerspruch 2, OHNE sie zu entscheiden.
    NACHGETRAGEN 2026-08-28: Der Satz bleibt wörtlich richtig — diese LESUNG hat den
    Widerspruch nicht entschieden. Entschieden hat ihn eine Messung (s. (bq)), und sie
    bestätigt die Erklärung: Beide Schreibweisen sind zulässig, weil beide dieselbe
    gRPC-Nachricht abbilden.

    B4 · BESTÄTIGT DURCH SCHWEIGEN, und das ist hier eine eigene Aussage — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28): Die Seite
    führt KEINEN Abschnitt "Request headers" — anders als die Ressourcen-Verwaltungs-
    Methoden. Deckt sich mit dem LAUF-1-Befund, dass Kopfzeilen beim Einliefern ignoriert
    werden. ERSETZT KEINE MESSUNG.

    C1 · NEU, ABER SCHWÄCHER ALS DER LEITFADEN — BEANTWORTET (der Leitfaden trägt die
    Antwort).
    GELESEN 2026-08-24, /reference/rest/v1/Destination (Doku-Stand 2026-02-17):
    productDestinationId ist dort nur allgemein beschrieben — "Required. The object within
    the product account to ingest into. For example, a Google Ads audience ID, a
    Display & Video 360 audience ID or a Google Ads conversion action ID." DER
    CONVERSION-ACTION-TYP (WEBPAGE / UPLOAD_CLICKS / STORE_SALES) STEHT IN DER REFERENZ
    NICHT. Wer nur die Referenz liest, erfährt die entscheidende Unterscheidung nicht.

    C2 · BESTÄTIGT. Im Rumpf, destinations[].productDestinationId.

    C3 · NEU UND HART — BEANTWORTET.
    GELESEN 2026-08-24, /reference/rest/v1/Destination (Doku-Stand 2026-02-17):
    Destination.reference ist "Optional. ID for this Destination resource, UNIQUE WITHIN THE
    REQUEST." Dazu GELESEN an /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28):
    DUPLICATE_DESTINATION_REFERENCE — "Two or more destinations in the request have the same
    reference." Die Eindeutigkeit ist also erzwungen, nicht empfohlen.

    C4 · NICHT-TREFFER, UNVERÄNDERT.
    Auch die Referenz stuft productDestinationId und accountId NIRGENDS als vertraulich ein.
    ABGESUCHTE ACHSE, jetzt erweitert: die SECHZEHN Seiten aus (t) zusätzlich zu den
    SIEBZEHN aus (h), Begriffe `secret`, `confidential`, `sensitive`, `private`, `public`.
    DAS IST KEINE ENTWARNUNG — nach zwei Läufen über den vollständigen Baum sagt die Doku
    zur Vertraulichkeit der Ziel-Kennung schlicht nichts.

(w) NEU ODER ABWEICHEND — GRUPPEN D BIS F.

    D1 · NEU, DIE HÜLLE IST JETZT MIT PFLICHT-ANNOTATIONEN BELEGT — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28):
    IngestEventsRequest — destinations[] REQUIRED · events[] REQUIRED · consent Optional ·
    validateOnly Optional · encoding Optional · encryptionInfo Optional.
    NEU GEGENÜBER LAUF 1: encoding ist "Required for UserData uploads … For non UserData
    uploads, this field is ignored", und dasselbe gilt für encryptionInfo.
    ERSETZT KEINE MESSUNG.

    D2 · NEU, ZWEI FELDER, DIE LAUF 1 NICHT HATTE — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28):
    lastUpdatedTimestamp ("Optional. The last time the event was updated.") und
    customVariables[] auf EVENT-Ebene ("Additional key/value pair information to send to the
    conversion containers (conversion action or FL activity)") — LAUF 1 kannte
    customVariables nur auf Item-Ebene.
    UND DIE PFLICHT-ANNOTATION ZU transactionId STEHT JETZT IN DER REFERENZ SELBST:
    "Optional. The unique identifier for this event. REQUIRED FOR EVENTS SENT AS AN
    ADDITIONAL DATA SOURCE FOR TAG CONVERSIONS." Das bestätigt den Kern des LAUF-1-Befunds
    an einer zweiten, unabhängigen Stelle. ERSETZT KEINE MESSUNG.

    D3 · NEU UND WICHTIG — DIE ZEITFENSTER-LÜCKE AUS LAUF 1 IST HALB GESCHLOSSEN.
    EINHEIT — BEANTWORTET, mit ausdrücklicher Toleranz. GELESEN 2026-08-24,
    /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28): eventTimestamp ist REQUIRED,
    RFC 3339, "generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional
    digits. OFFSETS OTHER THAN "Z" ARE ALSO ACCEPTED." Beispiele: "2014-10-02T15:01:23Z",
    "2014-10-02T15:01:23.045123456Z", "2014-10-02T15:01:23+05:30".
    FENSTER — DASS EINES EXISTIERT, IST JETZT DREIFACH BELEGT:
    · /reference/rest/v1/ErrorReason (2026-07-28): EVENT_TIME_INVALID — "Event did not occur
      within the acceptable time window."
    · /reference/rest/v1/requestStatus/retrieve (2026-07-28):
      PROCESSING_ERROR_REASON_EVENT_TOO_OLD — "The conversion is older than max supported
      age."
    · ebenda: PROCESSING_ERROR_REASON_CONVERSION_PRECEDES_CLICK — "The event timestamp on
      the event was earlier than the associated click." Eine UNTERE Schranke, relativ zum
      Klick.
    DIE LÄNGE DES FENSTERS STEHT AUF KEINER DER INSGESAMT DREIUNDDREISSIG GELESENEN SEITEN.
    EINSTUFUNG DES FENSTER-TEILS: NICHT-TREFFER. ABGESUCHTE ACHSE: die sechzehn Seiten aus
    (t), Begriffe `time window`, `max supported age`, `days`, `hours`, `older than`. KEINE
    ENTWARNUNG. Lücke D aus (s) bleibt als ZAHL offen und ist als TATSACHE nun belegt.

    D4 · NEU, DIE TYPEN SIND JETZT FORMAL AUSGEWIESEN — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28) und
    /reference/rest/v1/requestStatus/retrieve (Doku-Stand 2026-07-28): conversionValue
    NUMBER · conversionCount NUMBER · currency STRING · Item.quantity INTEGER · entityId
    "string (int64 format)" · recordCount "string (int64 format)".
    DAS LETZTE IST EINE FALLE: In den Diagnostik-Antworten reisen 64-Bit-Zahlen als
    ZEICHENKETTE, nicht als Zahl. ERSETZT KEINE MESSUNG.

    D5 · NEU, UND ES WIDERSPRICHT DEM LEITFADEN — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28): KEIN
    einziges Identitätsfeld ist Pflicht (s. (u), Frage 3). Pflicht sind dort nur
    destinations[], events[], eventTimestamp, Destination.operatingAccount,
    Destination.productDestinationId, UserData.userIdentifiers[] — sowie in AddressInfo vier
    Felder.
    AddressInfo IST DER SCHÄRFSTE NEUE EINZELBEFUND DIESER GRUPPE. GELESEN 2026-08-24,
    /reference/rest/v1/UserData (Doku-Stand 2026-07-28): givenName, familyName, regionCode
    und postalCode sind ALLE VIER "Required". WER EINE ADRESSE ALS KENNUNG SCHICKT, MUSS
    ALLE VIER LIEFERN. LAUF 1 hatte die Felder aus dem Formatier-Leitfaden, aber OHNE
    Pflicht-Annotation. ERSETZT KEINE MESSUNG.

    D6 · NEU, DIE PRÜFUNG IST JETZT VOLLSTÄNDIG AUFGEZÄHLT — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28): die Seite
    führt 125 ENUM-WERTE. LAUF 1 kannte neun. Die ereignisnahen:
    INVALID_CURRENCY_CODE ("The currency code is not supported.") · INVALID_CONVERSION_ACTION_ID
    · INVALID_CONVERSION_ACTION_TYPE ("The conversion action type is not valid.") ·
    INVALID_EVENT · INVALID_EVENT_NAME ("The event name is not supported.") ·
    RESERVED_NAME_USED · EVENT_TIME_INVALID · EVENT_SOURCE_AND_DESTINATION_MISMATCH ("The
    event source type does not match the destination type.") · DESTINATION_ACCOUNT_TYPE_MISMATCH
    · INVALID_DESTINATION · DUPLICATE_DESTINATION_REFERENCE · TOO_MANY_DESTINATIONS ·
    TOO_MANY_EVENTS · TOO_MANY_USER_IDENTIFIERS · NO_IDENTIFIERS_PROVIDED ·
    REQUIRED_FIELD_MISSING · INVALID_HEX_ENCODING · INVALID_BASE64_ENCODING ·
    INVALID_SHA256_FORMAT · INVALID_NUMBER_FORMAT · NOT_ALLOWLISTED ·
    TERMS_AND_CONDITIONS_NOT_SIGNED · REQUIRED_PREREQUISITE_LINK_MISSING ·
    EU_POLITICAL_ADVERTISING_DECLARATION_REQUIRED ·
    DESTINATION_ACCOUNT_ENHANCED_CONVERSIONS_TERMS_NOT_SIGNED ·
    DESTINATION_ACCOUNT_NOT_ENABLED_ENHANCED_CONVERSIONS_FOR_LEADS ·
    DESTINATION_ACCOUNT_DATA_POLICY_PROHIBITS_ENHANCED_CONVERSIONS.
    EIN WERTEBEREICH FÜR conversionValue STEHT WEITERHIN NIRGENDS. ERSETZT KEINE MESSUNG.

    E1 · NEU — DIE LISTE IST JETZT ABSCHLIESSEND UND LÄNGER ALS IN LAUF 1 — BEANTWORTET.
    Die Grenze aus (m)/E1 ("nicht als abschliessend belegt") fällt.
    GELESEN 2026-08-24, /reference/rest/v1/UserData (Doku-Stand 2026-07-28),
    /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28) und
    /reference/rpc/google.ads.datamanager.v1 (Doku-Stand 2026-08-06):
    · UserData.userIdentifiers[] — "Union field identifier. EXACTLY ONE MUST BE SPECIFIED":
      emailAddress · phoneNumber · address. HÖCHSTENS ZEHN je Event: "At most 10
      userIdentifiers can be provided in a single AudienceMember or Event."
    · AddressInfo — sieben Felder, davon vier Pflicht (s. D5); addressLine, city und
      administrativeArea "Used only for Google Analytics".
    · AdIdentifiers — ZEHN Felder, alle Optional: sessionAttributes · gclid · gbraid ·
      wbraid · landingPageDeviceInfo · mobileDeviceId · dclid · impressionId · matchId ·
      encryptedUserIds[].
    · DeviceInfo — NEU: ES SIND VIER FELDER, NICHT ZWEI. Zu ipAddress und userAgent treten
      category ("The category of device. For example, 'desktop', 'tablet', 'mobile', 'smart
      TV'") und language_code ("The language the device uses in ISO 639-1 format"). Dazu
      eine Annotation, die es in sich hat: ip_address ist "Optional. … REQUIRED WHEN USED IN
      AN AdEvent" — also Pflicht nur im Google-Analytics-Aufruf, nicht im
      Conversion-Aufruf.
    · EncryptedUserId — vier Felder, ALLE VIER Required: "All fields are required if this is
      used."

    E2 · BESTÄTIGT und an einer Stelle geschärft — BEANTWORTET.
    GELESEN 2026-08-24, /reference/rest/v1/Encoding (Doku-Stand 2025-03-06): Das Enum kennt
    genau zwei brauchbare Werte, HEX und BASE64, plus ENCODING_UNSPECIFIED — "Should never
    be used".

    E3 · NEU UND ABWEICHEND — ABGELEGT. S. (u), Frage 3: Die Referenz sagt "alle Optional"
    und kennt zugleich NO_IDENTIFIERS_PROVIDED. ERSETZT KEINE MESSUNG.

    E4 · BESTÄTIGT — ABGELEGT. Zwei User-Agent-Felder an zwei Orten, wie in (m)/E4.
    ERSETZT KEINE MESSUNG.

    F1 · BESTÄTIGT, mit schärferer Formulierung — BEANTWORTET.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28): eventName
    ist "Optional. The name of the event. REQUIRED FOR GA4 EVENTS." Die Referenz sagt "GA4",
    der Leitfaden sagte "Google Analytics" — dieselbe Sache. Für Google Ads bleibt eventName
    optional.

    F2 · NEU, ABER NUR INDIREKT — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28): Die Referenz
    kennt RESERVED_NAME_USED und INVALID_EVENT_NAME, nennt aber KEINEN DECKEL JE KONTO.
    ABGESUCHTE ACHSE: die sechzehn Seiten aus (t), Begriffe `limit`, `maximum`,
    `per account`, `quota` — die Treffer betreffen sämtlich Mengen JE ANFRAGE oder JE
    PROJEKT, nie eine Zahl von Ereignisnamen oder Conversion-Actions. ERSETZT KEINE MESSUNG.

    F3 · NEU IN EINEM PUNKT — das EventSource-Enum ist vollständig gelesen.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28): FÜNF
    brauchbare Werte, und LAUF 1 kannte nur zwei — WEB · APP · IN_STORE · PHONE · MESSAGE,
    plus EVENT_SOURCE_UNSPECIFIED ("Should never be used"). Eine Namensliste für Google Ads
    führt die Referenz weiterhin nicht.

(x) NEU ODER ABWEICHEND — GRUPPEN G BIS I.

    G1 · BESTÄTIGT und um eine Zusicherung erweitert — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28): Der
    Erfolgsrumpf ist { requestId, fieldWarnings[] }; fieldWarnings sind "Detailed row-level
    warnings with field paths". NEU ist die validateOnly-Zusage: "If true, the request is
    validated but not executed. ONLY ERRORS ARE RETURNED, NOT RESULTS." ERSETZT KEINE
    MESSUNG.

    G2 · BESTÄTIGT und formal belegt — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/Status (Doku-Stand 2025-12-12): code (integer),
    message, details[] als "An object containing fields of an arbitrary type. An additional
    field "@type" contains a URI identifying the type." ERSETZT KEINE MESSUNG.

    G3 · NEU — DIE GROBE STUFE IST JETZT VOLLSTÄNDIG MIT HTTP-ABBILDUNG — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/Code (Doku-Stand 2025-12-12): INVALID_ARGUMENT →
    400 · UNAUTHENTICATED → 401 · PERMISSION_DENIED → 403 · NOT_FOUND → 404 ·
    ALREADY_EXISTS/ABORTED → 409 · RESOURCE_EXHAUSTED → 429 · INTERNAL/UNKNOWN → 500 ·
    UNIMPLEMENTED → 501 · UNAVAILABLE → 503 · DEADLINE_EXCEEDED → 504.
    EINE ZEILE DARAUS GEHÖRT EIGENS HERVORGEHOBEN, WEIL SIE EIN FEHLBILD ERZEUGEN KANN: Zu
    NOT_FOUND steht "if a request is denied for an entire class of users, such as gradual
    feature rollout or UNDOCUMENTED ALLOWLIST, NOT_FOUND may be used." EIN 404 KANN ALSO
    EINE FREISCHALTUNGS-SPERRE SEIN, KEIN FEHLENDES OBJEKT. ERSETZT KEINE MESSUNG.

    G4 · NEU, UND ES ERWEITERT DIE ECHO-ACHSE UM EINE VIERTE FORM — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/requestStatus/retrieve (Doku-Stand 2026-07-28):
    RequestStatusPerDestination SPIEGELT DAS VOLLSTÄNDIGE Destination-OBJEKT ZURÜCK —
    "destination object (Destination) — A destination within a DM API request." Die
    Diagnostik-Antwort trägt also operatingAccount.accountId, loginAccount, linkedAccount
    und productDestinationId erneut aus.
    Dazu GELESEN an /reference/rest/v1/ErrorInfo (Doku-Stand 2026-07-28) die formale
    Bestimmung von metadata: "map (key: string, value: string) … Keys must match a regular
    expression of [a-z][a-zA-Z0-9-_]+ but should ideally be lowerCamelCase." ÜBER DIE WERTE
    SAGT DIE REFERENZ NICHTS — keine Schwärzungs-, Längen- oder Inhaltszusage. Ob je ein
    Nutzlast-Wert dort landet, ist an der Doku weiterhin NICHT ENTSCHEIDBAR. ERSETZT KEINE
    MESSUNG.

    G5 · NEU, UND ES BEGRENZT DEN RÜCKKANAL SCHÄRFER ALS LAUF 1 ANNAHM — ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/requestStatus/retrieve (Doku-Stand 2026-07-28):
    Der Abruf ist GET https://datamanager.googleapis.com/v1/requestStatus:retrieve mit
    Query-Parameter requestId (Required) und leerem Rumpf.
    DIE AUFLÖSUNG IST GRÖBER ALS ERWARTET: IngestEventsStatus hat GENAU EIN FELD —
    recordCount, "The total count of events sent in the upload request. INCLUDES ALL EVENTS
    IN THE REQUEST, REGARDLESS OF WHETHER THEY WERE SUCCESSFULLY INGESTED OR NOT." ES GIBT
    KEINEN ERFOLGS-ZÄHLER. Was ankam, ergibt sich nur indirekt aus errorInfo/warningInfo,
    und die zählen JE GRUND, nicht je Ereignis (ErrorCount { recordCount, reason },
    WarningCount { recordCount, reason }).
    ZWEI WEITERE PRÄZISIERUNGEN: errorInfo ist "Only populated if the requestStatus is
    FAILED or PARTIAL_SUCCESS"; beide Felder sind "not populated while the request has
    requestStatus of PROCESSING" — das bestätigt die Warnung aus (p)/H5, dass ein leeres
    errorInfo "noch nicht bekannt" heissen kann.
    UND EINE NAMENSABWEICHUNG, DIE IN EINER ANLEITUNG TEUER WÄRE: Das Enum heisst FAILED,
    nicht FAILURE, und es hat FÜNF Werte, nicht vier — REQUEST_STATUS_UNKNOWN, SUCCESS,
    PROCESSING, FAILED, PARTIAL_SUCCESS. Die Angabe in (p)/H5 ist im selben Zug BERICHTIGT
    worden. ERSETZT KEINE MESSUNG.

    H1 · BESTÄTIGT und um zwei Zusatzangaben erweitert — BEANTWORTET.
    GELESEN 2026-08-24: die validateOnly-Zusage aus G1, und — bemerkenswert — dass dasselbe
    Feld auf /reference/rest/v1/adEvents/ingest (Doku-Stand 2026-07-28) als "(deprecated)"
    markiert ist.

    H2 · NEU, UND ES ÄNDERT DAS BILD — BEANTWORTET (Voraussetzungen; die Wirkung bleibt
    Messung).
    LAUF 1 kannte aus dem Leitfaden drei Dedup-Ausgänge. DIE REFERENZ KENNT EINEN VIERTEN,
    DEN DER LEITFADEN NICHT NENNT: EINEN FEHLER. GELESEN 2026-08-24,
    /reference/rest/v1/requestStatus/retrieve (Doku-Stand 2026-07-28):
    · PROCESSING_ERROR_REASON_DUPLICATE_TRANSACTION_ID — "A conversion with the same order
      id and conversion action combination was already uploaded."
    · PROCESSING_ERROR_REASON_DUPLICATE_GCLID — "A conversion with the same GCLID and
      conversion time already exists in the system."
    EINE DOPPELUNG KANN ALSO ALS VERARBEITUNGSFEHLER GEZÄHLT WERDEN STATT ALS STILLE
    ZUSAMMENFÜHRUNG. Wie sich das zur Überschreib-Regel des Leitfadens verhält, sagt keine
    der dreiunddreissig Seiten — s. (y), Widerspruch 4.

    H3 · VOLLSTÄNDIG BEANTWORTET — DIE EINSTUFUNG WANDERT VON ABGELEGT AUF BEANTWORTET, UND
    LÜCKE A AUS (s) IST GESCHLOSSEN.
    GELESEN 2026-08-24, /devguides/limits (Doku-Stand 2026-07-30), Abschnitt "Project
    limits": IngestionService 100.000 Anfragen je Tag und 300 je Minute; alle übrigen
    Dienste zusammen 50.000 je Tag und 300 je Minute. "Requests that exceed the limits are
    rejected with the error RESOURCE_EXHAUSTED and HTTP status 429 Too Many Requests."
    DAMIT IST AUCH DER LAUF-1-NICHT-TREFFER ZUM 429 AUFGELÖST — er existiert, er stand nur
    auf der nicht kartierten Seite.
    DIE GRENZEN SIND JE GOOGLE-CLOUD-PROJEKT, NICHT JE KUNDE.

    H4 · BEANTWORTET, ABER MIT EINEM WIDERSPRUCH IN DER ZAHL.
    GELESEN 2026-08-24, /devguides/limits (Doku-Stand 2026-07-30), Abschnitt "Request
    limits": IngestEventsRequest — 2.000 Event-Ressourcen, 10 Destination-Ressourcen, 10
    Nutzer-Kennungen in der UserData je Event. Dieselbe Zahl 2.000 steht auf
    /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28). EINE DRITTE STELLE NENNT
    10.000 — s. (y), Widerspruch 3. Unstrittig sind die 10 Destinations und die 10
    Kennungen.

    H5 · NEU — EINE FÜNFTE TÄUSCHUNG TRITT ZU DEN VIEREN AUS (p)/H5 — ABGELEGT.
    recordCount IST KEINE ERFOLGSZAHL (s. G5). Wer ihn als "so viele sind angekommen" liest,
    liest falsch — er zählt das Gesendete. ERSETZT KEINE MESSUNG.

    I1 · BESTÄTIGT und um einen Fehlergrund ergänzt — BEANTWORTET.
    GELESEN 2026-08-24, /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28):
    NOT_ALLOWLISTED — "The account is not allowlisted for the given feature." Die Sperre ist
    damit auch maschinell sichtbar.

    I2 · NEU, UND DER LAUF-1-STATUS "NICHT ABGESUCHT" IST AUFGEHOBEN — ABGELEGT.
    GELESEN 2026-08-24, /devguides/terms ("Terms of service", kein Doku-Stand; die Seite
    trägt "Last modified: November 9, 2021"). Sie ist VOLLSTÄNDIG und lautet im Kern: "By
    using this API, you consent to be bound by the Google APIs Terms of Service ("API
    ToS")." und "You must comply with applicable advertising policies including but not
    limited to the Customer Match policy and the Customer data policies."
    DIE ANNAHME GESCHIEHT DURCH NUTZUNG, NICHT DURCH EINE ZUSTIMMUNG IM KONTO. Für die API
    selbst gibt es also keinen Häkchen-Vorgang.
    AUF KONTO-EBENE SIEHT ES ANDERS AUS, und die Referenz benennt es. GELESEN 2026-08-24,
    /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28): TERMS_AND_CONDITIONS_NOT_SIGNED
    ("Required terms and conditions are not accepted.") ·
    DESTINATION_ACCOUNT_ENHANCED_CONVERSIONS_TERMS_NOT_SIGNED ("The destination account
    hasn't agreed to the terms for enhanced conversions.") ·
    EU_POLITICAL_ADVERTISING_DECLARATION_REQUIRED ·
    DESTINATION_ACCOUNT_DATA_POLICY_PROHIBITS_ENHANCED_CONVERSIONS. ES GIBT ALSO
    VERTRAGSANNAHMEN IM KUNDEN-KONTO, DIE DEN AUFRUF SCHEITERN LASSEN KÖNNEN.
    ZUR EINWILLIGUNG IST DIE FELDSTRUKTUR JETZT GELESEN, UND SIE IST ENGER, ALS "Consent"
    VERMUTEN LÄSST. GELESEN 2026-08-24, /reference/rest/v1/Consent (Doku-Stand 2025-03-06):
    GENAU ZWEI Felder, beide Optional — adUserData und adPersonalization, je ein
    ConsentStatus aus CONSENT_STATUS_UNSPECIFIED · CONSENT_GRANTED · CONSENT_DENIED. Die
    Überschrift lautet "DIGITAL MARKETS ACT (DMA) CONSENT SETTINGS for the user" — es ist
    ein DMA-Objekt, kein allgemeiner Einwilligungs-Träger.
    UND DIE EINWILLIGUNG KANN DATENSÄTZE VERWERFEN. GELESEN 2026-08-24,
    /reference/rest/v1/requestStatus/retrieve (Doku-Stand 2026-07-28):
    PROCESSING_ERROR_REASON_DENIED_CONSENT ("The ad user data is denied, either by the user
    or in the advertiser default settings") · PROCESSING_ERROR_REASON_NO_CONSENT
    ("Advertiser did not give 3P consent for the Ads core platform services") ·
    PROCESSING_ERROR_REASON_UNKNOWN_CONSENT ("The overall consent (determined from ROW LEVEL
    CONSENT, REQUEST LEVEL CONSENT, AND ACCOUNT SETTINGS) could not be determined for this
    user"). DIE LETZTE BESCHREIBUNG NENNT EINE DRITTE QUELLE, DIE LAUF 1 NICHT KANNTE: DIE
    KONTO-EINSTELLUNGEN.
    ERSETZT KEINE MESSUNG: Die Vertragsbedingungen sind gelesen; ob und welche im konkreten
    Kundenkonto fehlen, ist nur am Konto feststellbar.

    I3 · BESTÄTIGT — BEANTWORTET. NOT_ALLOWLISTED s. I1; einen Antragsweg nennt auch die
    Referenz nicht.

    I4 · NEU — DIE EINSTUFUNG WANDERT VON NICHT-TREFFER AUF ABGELEGT.
    GELESEN 2026-08-24, /reference/rest/v1/Destination (Doku-Stand 2026-02-17): "loginAccount
    … To add or remove data from the operatingAccount, this loginAccount must have WRITE
    ACCESS to the operatingAccount. For example, a manager account of the operatingAccount,
    or an account with an established link to the operatingAccount."
    DAS IST EINE BERECHTIGUNGSSTUFE: SCHREIBZUGRIFF. Sie ist keine benannte
    Google-Ads-Rolle, aber sie ist mehr als das blosse "steht in der Nutzerliste" aus
    (q)/I4.
    ERSETZT KEINE MESSUNG: Welche konkrete Google-Ads-Rollenstufe "write access" erfüllt,
    steht weiterhin auf keiner der dreiunddreissig Seiten. ABGESUCHTE ACHSE für den
    verbleibenden Teil: die sechzehn Seiten aus (t), Begriffe `role`, `permission`, `access
    level`, `admin`, `standard`, `read-only`. KEINE ENTWARNUNG.

    I5 · NICHT-TREFFER, UNVERÄNDERT.
    Auch in der Referenz keine Domain-Freigabe, keine Herkunfts-Prüfung, keine
    Traffic-Permission-Liste. ABGESUCHTE ACHSE: die sechzehn Seiten aus (t), Begriffe
    `domain`, `origin`, `allowlist`, `permission`, `referrer`. KEINE ENTWARNUNG — die Frage
    betrifft laut Fragenkatalog den BROWSER-Pfad, und der liegt bei dieser Gestalt bei einem
    anderen System.

(y) DIE VIER WIDERSPRÜCHE — KEINER AUFGELÖST.

    WIDERSPRUCH 1 (aus (r)) · DIE PFLICHT-KENNUNG — VERSCHÄRFT, NICHT AUFGELÖST.
    Vier Stellen, drei Aussagen. Volltext s. (u), Frage 3. NICHT AUFGELÖST.

    WIDERSPRUCH 2 (aus (r)) · camelCase GEGEN snake_case — AUFGELÖST DURCH EINE MESSUNG.
    ERSETZT AM 2026-08-28: Hier stand "NICHT ENTSCHIEDEN" und "NICHT AUFGELÖST".
    Die Referenz zeigt beide Schreibweisen in zwei Bäumen und sagt zur Gleichwertigkeit im
    Ingest-Rumpf nichts — das gilt unverändert und ist die Beobachtung, die den Widerspruch
    erzeugt hat. Volltext dieser Beobachtung s. (u), Frage 4.
    AUFGELÖST: BEIDE SCHREIBWEISEN SIND GLEICHWERTIG ZULÄSSIG, GEMESSEN 2026-08-28 (OWNER),
    Messung B1 — s. (bq). NICHT AUS DEM TEXT, sondern aus einem Aufruf: der Widerspruch war
    am Dokument nicht auflösbar und ist es bis heute nicht.
    DIE ÜBERSCHRIFT DIESES WIDERSPRUCHS BLEIBT WÖRTLICH — sie wird von (s)/LÜCKE F und von
    (z)/Punkt 2 zitiert.

    WIDERSPRUCH 3 · NEU IN LAUF 2 — DIE HÖCHSTZAHL DER EREIGNISSE JE ANFRAGE. FAKTOR FÜNF.
    · STELLE A: /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), Feld events[] —
      "At most 2000 Event resources can be sent in a single request."
    · STELLE B: /devguides/limits (Doku-Stand 2026-07-30), "Request limits" —
      "IngestEventsRequest: 2,000 Event resources in the events list."
    · STELLE C: /reference/rest/v1/ErrorReason (Doku-Stand 2026-07-28), Enum
      TOO_MANY_EVENTS — "Maximum number of events allowed per request is 10,000."
    ZWEI STELLEN SAGEN 2.000, EINE SAGT 10.000 — und ausgerechnet die abweichende ist die,
    die im FEHLERFALL ausgeliefert wird.
    ZUSATZBEOBACHTUNG, DIE DIE SACHE NICHT AUFLÖST, ABER ERKLÄRT, WO 10.000 HERKOMMEN
    KÖNNTE: Dieselbe Limits-Seite nennt 10.000 als Höchstzahl für AudienceMember-Ressourcen.
    Ob TOO_MANY_EVENTS versehentlich die Zielgruppen-Zahl trägt, ist an der Doku NICHT
    ENTSCHEIDBAR. BEIDE STELLEN GEMELDET, NICHT AUFGELÖST.

    WIDERSPRUCH 4 · NEU IN LAUF 2 — WAS BEI EINEM DOPPELTEN transactionId GESCHIEHT.
    · STELLE A: /devguides/events/send-events (Doku-Stand 2026-08-18), "How Google handles
      multi-source data" — ein treffender transactionId führt zur ZUSAMMENFÜHRUNG:
      conversionValue überschreibt, alle anderen Felder werden ignoriert. Von einem Fehler
      ist keine Rede.
    · STELLE B: /reference/rest/v1/requestStatus/retrieve (Doku-Stand 2026-07-28),
      ProcessingErrorReason — PROCESSING_ERROR_REASON_DUPLICATE_TRANSACTION_ID, "A conversion
      with the same order id and conversion action combination was already uploaded." Das
      steht unter ERROR, nicht unter Warning, und ein Error heisst laut derselben Doku, dass
      der Datensatz vollständig verworfen wurde.
    NACH A WIRD ZUSAMMENGEFÜHRT, NACH B VERWORFEN. Ob die Unterscheidung an der QUELLE hängt
    (Tag-Ereignis gegen zweite API-Lieferung), sagt keine der dreiunddreissig Seiten. BEIDE
    STELLEN GEMELDET, NICHT AUFGELÖST.

(z) LÜCKEN NACH ZWEI LÄUFEN — WAS GESCHLOSSEN IST UND WAS BLEIBT.

    GESCHLOSSEN:
    · LÜCKE A aus (s) — die drei nicht kartierten Seiten. /devguides/limits und
      /devguides/terms sind gelesen (s. (x)/H3 und (x)/I2); /support/contact ist vom Auftrag
      ausgeschlossen.
    · LÜCKE E aus (s) — kein roher HTTP-Aufruf. B1 und der requestStatus-Aufruf sind jetzt
      gelesen (s. (u), Frage 1, und (x)/G5).

    OFFEN GEBLIEBEN, MIT BENANNTER REICHWEITE:
    · B3, DER TRÄGER DES ZUGANGSDATUMS. Nach dreiunddreissig Seiten über zwei Läufe steht
      nirgends, in welcher Kopfzeile und mit welchem Präfix das Token reist. DAS IST DIE
      AUFFÄLLIGSTE LÜCKE DIESES DOKU-BAUMS. NICHT-TREFFER, keine Entwarnung.
    · DIE LÄNGE DES ZEITFENSTERS (LÜCKE D aus (s)). Dass eines existiert, ist jetzt dreifach
      belegt; die Zahl fehlt. NICHT-TREFFER, keine Entwarnung.
    · DIE ROLLENSTUFE (I4). "Write access" ist benannt, die konkrete Google-Ads-Rolle nicht.
    · DIE VERTRAULICHKEIT DER ZIEL-KENNUNG (C4). Nach zwei Läufen keine Aussage in beide
      Richtungen.
    · DIE DOMAIN-FREIGABE (I5). Liegt ausserhalb dieses Baums.
    · DER DECKEL JE KONTO (F2). Nur Mengen je Anfrage und je Projekt, nie je Konto.

    AN DER DOKU NICHT ENTSCHEIDBAR — VIER PUNKTE, ausdrücklich als solche gemeldet:
    (1) Ob ErrorInfo.metadata je einen NUTZLAST-Wert trägt. Die Referenz bestimmt
        Schlüssel-Form und Typ, über die Werte sagt sie nichts.
    (2) Ob snake_case im REST-Rumpf gleichwertig zulässig ist (Widerspruch 2).
        ERSETZT AM 2026-08-28 — BEANTWORTET: JA, GLEICHWERTIG. GEMESSEN (OWNER), Messung B1,
        s. (bq). AN DER DOKU bleibt es unentscheidbar; der Punkt steht deshalb weiter unter
        dieser Überschrift, die aufzählt, was ZWEI LÄUFE nicht entscheiden konnten. Von den
        vier Punkten sind damit drei offen.
    (3) Ob TOO_MANY_EVENTS mit 10.000 die Zielgruppen-Zahl trägt (Widerspruch 3).
    (4) Ob ein doppelter transactionId zusammenführt oder verwirft (Widerspruch 4).

    EINE BEOBACHTUNG ZUM DOKU-BESTAND, DIE HIER NICHT GEDEUTET WIRD: Die Doku-Stände der
    sechzehn Seiten streuen über SIEBZEHN MONATE — von /reference/rest/v1/Consent und
    /reference/rest/v1/Encoding (2025-03-06) über /reference/rest/v1/events (2025-06-24) bis
    zur RPC-Sammelseite (2026-08-06). Die beiden ältesten sind ausgerechnet die Einwilligungs-
    und die Kodierungs-Seite.

### Abschnitts-Lesung 2026-08-25 der OAuth- und Google-Ads-Politik-Dokumentation, LAUF 3 — die Teile (aa) bis (ai)

**HERKUNFT — ALLES IN DIESEM LAUF IST GELESEN, NICHTS IST GEMESSEN (2026-08-25):** Es ist
KEIN Aufruf gegen eine Google-Schnittstelle gefahren worden, kein Token beschafft, kein
Zustimmungsbildschirm geöffnet, keine Cloud-Konsole betreten. Jeder Teil nennt seine Quelle
und seinen Doku-Stand. Der Herkunft-Satz am Kopf des Google-Abschnitts gilt unverändert
mit; dieser Lauf ändert daran nichts.

**WARUM ER AUSSERHALB DES DATA-MANAGER-BAUMS LIEGT:** Die Läufe 1 und 2 haben den Baum
/data-manager/api ausgelesen (33 Seiten). ZWEI Fragen waren danach offen und lagen
ausserhalb: ob der Advertiser-Weg einen KUNDENGEFÜHRTEN Zustimmungsfluss kennt, und in
welcher Kopfzeile das Zugangsdatum reist. Dieser Lauf liest dafür Googles allgemeine
Authentifizierungs-Doku und die Google-Ads-Doku, abschnittsweise.

**VORBELASTUNGS-ERKLÄRUNG — DIE LESUNG WAR NICHT UNABHÄNGIG, UND DAS GEHÖRT IN DEN KOPF
UND NICHT IN EINE FUSSNOTE.** Vor dem ersten Seitenaufruf standen bereits Google-Angaben im
Kontext, aus drei Quellen:
· CLAUDE.md, "## Modus" (lädt mechanisch, nicht abwählbar): Google-Cloud-Projekt mit
  aktivierter API · ein als SENSIBEL eingestufter Zugriffsbereich · für NUTZER-Zugangsdaten
  eine OAuth-Verifizierung, bei DIENSTKONTEN ausdrücklich nicht · der Offline-Weg trägt
  keinen Allowlist-Vorbehalt · ein Freigabeverfahren besteht am ZUGANGSMODELL, und ob
  ADVERTISER oder DATA PARTNER gilt, ist offen.
· docs/aktiver-stand.md (Pflicht-Gate, musste gelesen werden): die Gestalt-Entscheidung,
  die vier Widersprüche, der ungefundene Träger des Zugangsdatums.
· Der Auftragstext selbst, der "add the email of the user to the Google Ads account" und
  "a manager account of the operatingAccount, or an account with an established link"
  wörtlich zitierte.
FOLGE FÜR DIE KENNZEICHNUNG: Jeder Teil unten ist als NEU oder als BESTÄTIGEND markiert.
Eine Bestätigung eines vorbekannten Satzes ist etwas anderes als ein unabhängiger Fund, und
wer das nicht trennt, hält eine Rückspiegelung für einen Beleg.

(aa) DER GELESENE UMFANG VON LAUF 3 — EINUNDDREISSIG SEITEN. OHNE DIESE LISTE HAT JEDES
     "STEHT DORT NICHT" IN DIESEM LAUF KEINE REICHWEITE.
     Alle am 2026-08-25 abgerufen, alle mit `?hl=en`. WERKZEUG: Playwright-MCP, textbasiert
     gelesen (`innerText`/`textContent` über den Artikelrumpf, also einschliesslich
     eingeklappter Reiter und Code-Beispiele); KEIN Bild-Schnappschuss, KEIN
     Snapshot-Aufruf.
     EIN VERFAHRENS-BEFUND, DER EINEN ÄLTEREN ABLÖST: Textbasiertes Lesen verhindert die
     Snapshot-Datei NICHT mehr — jeder `browser_navigate` schreibt eine `page-*.yml` in
     .playwright-mcp/. Dieser Lauf hat 32 Seiten-Schnappschüsse und 5 Konsolen-Logs
     erzeugt. Der Befund vom 2026-08-20 ("schreibt keine Snapshot-Dateien") trifft auf
     diese Werkzeugfassung nicht mehr zu.
     SPRACHE: Der erste Aufruf wurde auf `?hl=de` umgeleitet; sofort auf `?hl=en`
     gewechselt. ALLE Zitate stammen aus der englischen Fassung.
     TABELLEN MIT SYMBOL-INHALT: KEINE. Auf keiner der 31 Seiten stand eine Tabelle, deren
     Aussage in Haken, Kreuzen oder Punkten liegt; die ausgewerteten Tabellen
     (Zugriffsstufen, RMF, Nutzerrollen, Anmeldedaten-Übersicht) tragen Fliesstext in den
     Zellen. Der Symbolverlust aus LAUF 1 wiederholt sich hier nicht.

     GEÖFFNET — Google Ads API, der VOLLSTÄNDIGE OAuth-Abschnitt (alle elf
     Navigationseinträge; /oauth/cloud-project in beiden Reiter-Varianten):
      1. /google-ads/api/docs/oauth/overview — "Use OAuth 2.0 to Access Google Ads API" —
         2026-08-19
      2. /google-ads/api/docs/oauth/access-model — "Understand the Google Ads Access Model"
         — 2026-08-19
      3. /google-ads/api/docs/oauth/service-accounts — "Service Account Workflow" —
         2026-08-19
      4. /google-ads/api/docs/oauth/user-authentication — "User authentication workflow" —
         2026-08-19
      5. /google-ads/api/docs/oauth/single-user-authentication — "Single User
         Authentication Workflow" — 2026-08-19
      6. /google-ads/api/docs/oauth/multi-user-authentication — "Multi-user authentication
         workflow" — 2026-08-19
      7. /google-ads/api/docs/oauth/security-requirements — "Security requirements" —
         2026-08-19
      8. /google-ads/api/docs/oauth/internals — "OAuth 2.0 Internals for Google Ads API" —
         2026-08-19
      9. /google-ads/api/docs/oauth/cloud-project?authpath=service_accounts — "Set up a
         Google API Console project" — 2026-08-19
     10. /google-ads/api/docs/oauth/cloud-project?authpath=user_authentication — dieselbe
         Seite, anderer Reiter — 2026-08-19
     11. /google-ads/api/docs/oauth/credential-management — "Credential Management" —
         2026-08-19
     12. /google-ads/api/docs/oauth/multi-party-approvals — "Multi-party approvals (MPA)" —
         2026-08-19

     GEÖFFNET — Aufruf- und Kontostruktur, ÜBER FLIESSTEXT-VERWEISE ERREICHT:
     13. /google-ads/api/rest/auth — "Authorization and HTTP Headers" — 2026-08-19.
         ERREICHT über einen Kommentar-Verweis IM CURL-BEISPIEL von /oauth/internals; im
         Navigationsbaum des OAuth-Abschnitts steht sie NICHT.
     14. /google-ads/api/docs/concepts/call-structure — "API Call Structure" — 2026-08-19.
         ERREICHT über "See the API Call Structure guide" in /rest/auth.
     15. /google-ads/api/docs/account-management/linking-manager-accounts — "Linking to
         Manager Accounts" — 2026-08-19
     16. /google-ads/api/docs/account-management/linking-product-accounts — "Link product
         accounts" — 2026-08-19
     17. /google-ads/api/docs/account-management/managing-users — "Manage User Access" —
         2026-08-19

     GEÖFFNET — Zugriffsstufen und Politik:
     18. /google-ads/api/docs/productionize/access-levels — "Access levels and RMF" —
         2026-08-19
     19. /google-ads/api/docs/productionize/secure-credentials — "Secure your credentials" —
         2026-08-19
     20. /google-ads/api/docs/api-policy/access-levels — "Access Levels and Permissible Use"
         — 2026-08-19
     21. /google-ads/api/docs/api-policy/rmf — "Required Minimum Functionality" —
         2026-08-19 (der Politikstand IM TEXT lautet abweichend "v. 2022-10-06")
     22. /google-ads/api/docs/concepts/no-developer-token — "Cloud-managed access levels" —
         2026-08-19

     GEÖFFNET — Google Identity, allgemeine Authentifizierung:
     23. /identity/protocols/oauth2 — "Using OAuth 2.0 to Access Google APIs" — 2026-05-26
     24. /identity/protocols/oauth2/web-server — "Using OAuth 2.0 for Web Server
         Applications" — 2026-08-07
     25. /identity/protocols/oauth2/service-account — "Using OAuth 2.0 for Server to Server
         Applications" — 2026-03-23
     26. /identity/protocols/oauth2/scopes — "OAuth 2.0 Scopes for Google APIs" — 2026-08-07
     27. /identity/protocols/oauth2/production-readiness/sensitive-scope-verification —
         "Sensitive scope verification" — 2026-08-19
     28. /identity/protocols/oauth2/production-readiness/restricted-scope-verification —
         "Restricted scope verification" — 2026-08-19

     GEÖFFNET — Google Cloud und Hilfecenter:
     29. cloud.google.com/docs/authentication/rest — "Authenticate with REST" — 2026-08-22
     30. support.google.com/cloud/answer/13463073 — "OAuth App Verification Help Center" —
         KEIN Doku-Stand auf der Seite ausgewiesen
     31. support.google.com/cloud/answer/13464325 — "Restricted Scopes" — KEIN Doku-Stand
         auf der Seite ausgewiesen

     GESEHEN, NICHT GEÖFFNET — mit Grund:
     · Im Navigationsbaum des Google-Ads-Abschnitts: /docs/concepts/account-types ·
       /docs/account-management/{overview, create-account, listing-accounts,
       get-account-hierarchy, managing-invitations, linking-youtube,
       advertiser-identity-verification} · /docs/billing/account-budgets ·
       /docs/campaigns/bidding/cross-account-strategies · /docs/reach-forecasting/
       authentication · /docs/best-practices/test-accounts · vier Video-Katalogseiten.
       GRUND: Kontoverwaltung jenseits der Zugriffsbegründung bzw. Videoformat; die drei
       Wege, auf denen Zugriff entsteht, sind über die Seiten 15 bis 17 erschöpfend
       abgedeckt.
     · Im Fliesstext verwiesen: /docs/api-policy/{developer-token, brand-verification,
       non-compliance-fee} · /identity/protocols/oauth2/policies ·
       /production-readiness/{overview, policy-compliance, brand-verification,
       google-workspace} · /resources/best-practices ·
       /identity/verification/authentication-policy-compliance ·
       /terms/api-services-user-data-policy · /workspace/guides/{configure-oauth-consent,
       create-credentials} · support.google.com/cloud/answer/{15549945, 13463816, 13464018}
       · appdefensealliance.dev/casa · alle console.cloud.google.com-Adressen.
       GRUND: Durchführungs-Anleitungen der Verifizierung und Markenprüfung. Für diesen
       Lauf zählt, OB ein Verfahren greift und woran es hängt — das steht auf den Seiten 27,
       28 und 31.
     · AUSDRÜCKLICH NICHT BETRETEN: der Baum /data-manager/api (bereits ausgelesen) und
       /google-ads/api/docs/conversions/* (Offline-Conversion-Mechanik, ausserhalb der
       beiden Fragen).

     AUF FREMDEN SEITEN NICHT GETAN: keine Anmeldung, keine Eingabe, kein Download, keine
     Ausführung, kein Aufruf gegen eine Schnittstelle. KEINE Seite verlangte eine Anmeldung,
     um ihren Text zu lesen.

(ab) DER ADVERTISER-WEG KENNT EINEN KUNDENGEFÜHRTEN ZUSTIMMUNGSFLUSS — ER HEISST BEIM
     ANBIETER "MULTI-USER AUTHENTICATION". **NEU.**
     Der Vorbefund kannte nur die OAuth-Verifizierung als AUFLAGE; er kannte weder den Fluss
     noch seinen Namen. Dieser Fund hat eine Owner-Planung gedreht und steht deshalb
     WÖRTLICH.

     DIE SZENARIO-TABELLE, GELESEN 2026-08-25 an /google-ads/api/docs/oauth/overview
     (Doku-Stand 2026-08-19) — die dritte Zeile beschreibt unseren Fall und beantwortet ihn:
       "I am building an app that manages Google Ads accounts on behalf of other users. My
       app will build a user screen that lets the logged in users to connect to their Google
       Ads accounts and authorize my app to manage those accounts on their behalf."
       -> "Use multi-user authentication."
     Die beiden anderen Zeilen derselben Tabelle, damit die Abgrenzung sichtbar bleibt: wer
     Konten verwaltet, auf die er ohnehin Zugriff hat, bekommt "Use service account
     workflow"; wer bereits andere Google-APIs benutzt, wird auf den Multi-User- ODER den
     Dienstkonto-Weg verwiesen, je nachdem, was er sonst benutzt.

     DIE ROLLE UNSERER ANWENDUNG, GELESEN 2026-08-25 an
     /google-ads/api/docs/oauth/user-authentication (Doku-Stand 2026-08-19):
       "The user authentication workflow involves employing an OAuth 2.0 flow to obtain
       human authorization to let your app manage their Google Ads accounts on their behalf.
       An OAuth 2.0 access token is issued once the authorization process completes, and the
       app can use the access token to make API calls to the user's Google Ads account. The
       OAuth 2.0 access token expires every hour, so it is a common practice to additionally
       request OAuth 2.0 offline access so that your app can refresh the authorization
       without further user interaction."

     DIE DREI TECHNISCHEN AUFLAGEN, GELESEN 2026-08-25 an
     /google-ads/api/docs/oauth/multi-user-authentication (Doku-Stand 2026-08-19), wörtlich:
       "In the multi-user authentication workflow, you build your own OAuth flow to
       authenticate your users."
       "To access Google Ads API, you should configure your application to authenticate for
       the following scope: https://www.googleapis.com/auth/adwords"
       "Your app may have to make API calls on behalf of the user while they are offline. …
       For this reason, we recommend requesting OAuth offline access."
       "You should go through the OAuth App verification process and get your app certified."

     DER ZUSTIMMUNGSBILDSCHIRM SELBST, GELESEN 2026-08-25 an
     /google-ads/api/docs/oauth/cloud-project, Reiter "User authentication" (Doku-Stand
     2026-08-19):
       "When you use OAuth 2.0 for authorization, Google displays a consent screen to the
       user including a summary of your project, its policies, and the requested
       authorization scopes of access."

     **DIE NAHT, UND SIE MUSS SICHTBAR BLEIBEN — SONST WIRD DIESER TEIL ÜBERDEHNT:** Der
     NAME "multi-user authentication" und die Szenario-Tabelle stammen aus der
     GOOGLE-ADS-Dokumentation und gelten dort dem Bereich
     https://www.googleapis.com/auth/adwords. DIE DATA-MANAGER-DOKUMENTATION BENUTZT DEN
     AUSDRUCK NIRGENDS — Nicht-Treffer über die dreizehn Seiten von LAUF 4 (s. (aj)).
     WAS FÜR UNSERE GESTALT UNABHÄNGIG TRÄGT, IST NICHT DIE BENENNUNG, SONDERN DER
     ZUGRIFFSBEREICH: dass datamanager nutzergewährbar ist, steht in (ac). DER SCHLUSS RUHT
     AUF DEM SCOPE; DIE BENENNUNG IST GELIEHEN. Wer die Benennung für den Beleg hält, hat
     die Naht überlesen.

(ac) DER datamanager-BEREICH STEHT AUF GOOGLES NUTZERGEWÄHRBARER LISTE. **NEU** — und
     dieser Teil ist der eigentliche Träger von (ab) für unsere Gestalt.
     GELESEN 2026-08-25 an https://developers.google.com/identity/protocols/oauth2/scopes
     ("OAuth 2.0 Scopes for Google APIs", Doku-Stand 2026-08-07), Eintrag wörtlich:
       "Data Manager API, v1 — Scope: https://www.googleapis.com/auth/datamanager —
       Description: See, edit, create, import, or delete your customer data in Google Ads,
       Google Marketing Platform (Campaign Manager 360, Search Ads 360, Display & Video
       360), and Google Analytics"
     WAS DIESE SEITE IST: die Liste der Bereiche, "that you might need to request to access
     Google APIs" — also derjenigen, die ein Google-Konto über den Zustimmungsbildschirm
     GEWÄHREN kann. Die Beschreibung sagt "your customer data", meint also die Daten des
     Zustimmenden.
     WAS SIE NICHT SAGT, und das gehört dazu: Sie führt KEINE Einstufung je Bereich. Ihr
     Kopf sagt nur allgemein "Sensitive scopes require review by Google and have a sensitive
     indicator on the Google Cloud Console's OAuth consent screen configuration page." Die
     Einstufung des datamanager-Bereichs steht NICHT hier, sondern in LAUF 4 (s. (an)).

(ad) DREI WEGE, AUF DENEN SCHREIBZUGRIFF AUF EIN FREMDES WERBEKONTO ENTSTEHT — UND EINE
     OAUTH-ZUSTIMMUNG IST KEINER DAVON. **NEU.**

     WEG 1 · EINTRAG IN DIE NUTZERLISTE, direkt oder über eine Verwalter-Ebene geerbt.
     GELESEN 2026-08-25 an /google-ads/api/docs/oauth/access-model (Doku-Stand 2026-08-19):
       "You can give individual users or service accounts access to Google Ads accounts.
       There are two ways to give users access to an advertiser account: Grant the user
       direct access to the advertiser account by inviting them to that account. Grant the
       user indirect access to the advertiser account by inviting them to a manager account
       linked to that account."

     WEG 2 · KONTO-VERKNÜPFUNG VERWALTER ⇄ KLIENT, ein Zwei-Seiten-Vorgang mit Zustandsfeld.
     GELESEN 2026-08-25 an /google-ads/api/docs/account-management/linking-manager-accounts
     (Doku-Stand 2026-08-19):
       "Linking two accounts must always be initiated from the manager account, and then the
       link must be accepted from the client account. The state of the link is stored in the
       status field of the CustomerClientLink or CustomerManagerLink. … Use PENDING to
       initiate the link, and ACTIVE to accept the link."

     WEG 3 · PRODUKT-VERKNÜPFUNG (PRODUCT LINK) — und das ist der Weg, den der Halbsatz "an
     account with an established link" meint. GELESEN 2026-08-25 an
     /google-ads/api/docs/concepts/call-structure (Doku-Stand 2026-08-19), die Rollen
     wörtlich:
       "Advertiser: The Google Ads account being managed or updated by the API call. …
       Partner: The partner account (for example, a third-party app analytics provider or
       data partner). Linked account: The Google Ads account that has an established product
       link with Partner, granting Partner access to Advertiser."
       "A user who has access to Partner makes API calls to act on entities in Advertiser
       (for example, to upload conversions or manage user lists)."
     Und die Kopfzeilen-Belegung ebendort:
       "Authorization: An OAuth2 token for a user who has access to Partner. developer-token:
       The developer token for the API application, typically associated with Partner.
       login-customer-id: The Customer ID of Partner. … linked-customer-id: The Customer ID
       of Linked account. This header signals that the authorization for this request relies
       on Linked account's product link with Partner."
     WIE EINE SOLCHE VERKNÜPFUNG ENTSTEHT, GELESEN 2026-08-25 an
     /google-ads/api/docs/account-management/linking-product-accounts (Doku-Stand
     2026-08-19): über den "Invitation flow" ("used when you have administrator access to
     the Google Ads account, but not the product account", ProductLinkInvitationService,
     Zustände REQUESTED -> PENDING_APPROVAL -> ACCEPTED/REJECTED) oder den "Direct linking
     flow" ("used when you have administrator access to both", ProductLinkService). Dass
     Datenpartner darunterfallen, sagt dieselbe Seite: "such as Google Play, data partners,
     or third-party app analytics platforms."

     **EINE ABLEITUNG, AUSDRÜCKLICH ALS ABLEITUNG GEFÜHRT UND NICHT ALS BEFUND:** Gelesen
     ist, dass Zugriff ausschliesslich über (1) bis (3) entsteht, und dass der Token "an
     OAuth2 token for a user who has access to …" ist. DARAUS FOLGERE ICH: Eine
     OAuth-Zustimmung ÜBERTRÄGT die Rechte, die der zustimmende Nutzer ohnehin hat — sie
     BEGRÜNDET keine. KEIN gelesener Satz sagt das in dieser Form; keiner widerspricht ihr.
     NICHT-TREFFER MIT BENANNTER REICHWEITE: die 31 Seiten aus (aa), Achse "begründet eine
     OAuth-Zustimmung selbst einen Kontozugriff".

     **DIE GRENZE DIESES TEILS, UND SIE IST TRAGEND:** Alle drei Wege stammen aus der
     GOOGLE-ADS-Dokumentation. OB DAS PAAR loginAccount/operatingAccount DER DATA MANAGER
     API DEMSELBEN MODELL FOLGT, IST AN DEN 31 SEITEN NICHT ENTSCHEIDBAR — die Wörter
     `loginAccount` und `operatingAccount` kommen auf KEINER von ihnen vor. Die Ähnlichkeit
     zu login-customer-id und zur Begriffsdefinition "The operating customer is the customer
     ID in the request payload" (ebenda) ist auffällig und ist kein Beleg.

(ae) VIER MENGENGRENZEN, DIE EINEN VIELMANDANTEN-AUFBAU UNMITTELBAR BETREFFEN. **NEU.**
     · ZWANZIG KONTEN JE E-MAIL-ADRESSE. GELESEN 2026-08-25 an
       /google-ads/api/docs/oauth/service-accounts (Doku-Stand 2026-08-19): "You can
       associate up to 20 Google Ads accounts (including Google Ads manager accounts) with a
       single email address. If you need to manage more than 20 accounts using a service
       account, we recommend adding the service account to a Google Ads manager account
       instead, and linking all your accounts under this manager account."
     · HUNDERT ERNEUERUNGS-TOKEN JE KONTO JE CLIENT-ID, UND DER ÄLTESTE STIRBT LAUTLOS.
       GELESEN 2026-08-25 an /identity/protocols/oauth2 (Doku-Stand 2026-05-26): "There is
       currently a limit of 100 refresh tokens per Google Account per OAuth 2.0 client ID.
       If the limit is reached, creating a new refresh token automatically invalidates the
       oldest refresh token without warning. This limit does not apply to service accounts."
       Dazu eine zweite, UNBEZIFFERTE: "There is also a larger limit on the total number of
       refresh tokens a user account or service account can have across all clients."
     · SIEBEN TAGE LEBENSDAUER IM TESTING-ZUSTAND. Ebenda: "A Google Cloud Platform project
       with an OAuth consent screen configured for an external user type and a publishing
       status of 'Testing' is issued a refresh token expiring in 7 days, unless the only
       OAuth scopes requested are a subset of name, email address, and user profile".
     · TAGESGRENZEN JE ZUGRIFFSSTUFE DES ENTWICKLER-TOKENS. GELESEN 2026-08-25 an
       /google-ads/api/docs/api-policy/access-levels (Doku-Stand 2026-08-19): Test Account
       15.000 Operationen/Tag (nur Testkonten) · Explorer 2.880/Tag gegen Produktivkonten
       und 15.000/Tag gegen Testkonten · Basic 15.000/Tag · Standard "Unlimited". Fussnote:
       "'Per day' is based on a sliding 24 hour time period in which API requests were made
       with your developer token."
     ZUR EINORDNUNG DER LETZTEN, damit sie nicht auf den falschen Pfad gelegt wird: Sie hängt
     am ENTWICKLER-TOKEN der Google Ads API. Ob sie einen Aufruf gegen
     datamanager.googleapis.com überhaupt berührt, ist Gegenstand von LAUF 4 (s. (ak)).
     ZWEI WEITERE AUFLAGEN AUS DERSELBEN QUELLE, GELESEN 2026-08-25 an
     /google-ads/api/docs/api-policy/access-levels: "The Standard Access level are only
     granted to developers who require unlimited Google Ads API operations, such as large
     companies or tools that serve many users." und "If your tool is used by external users,
     be prepared to provide demo sign-in access to your tool. Note that your tool must comply
     with the Required Minimum Functionality."
     DIE RMF-KLASSEN, GELESEN 2026-08-25 an /google-ads/api/docs/api-policy/rmf (Doku-Stand
     2026-08-19, Politikstand im Text v. 2022-10-06): "Full-Service Tool" (RMF gilt dreifach)
     · "Reporting Only" (nur Reporting-RMF) · "Internal Use Only" (RMF gilt nicht). Dazu:
     "If your tool offers very limited and specialized functionality, and could not be used
     for creating and managing campaigns, ad groups, and ads, it may not qualify as a
     full-service tool." und "Note that RMF only applies to developer tokens with Standard
     Access level."
     UNTERSAGUNGEN — NICHT-TREFFER MIT BENANNTER REICHWEITE: Auf keiner der 31 Seiten steht
     eine Untersagung, ein Werkzeug mit vielen Kundenkonten zu betreiben. Achse: der
     vollständige OAuth-Abschnitt (12 Seiten), die drei Zugriffsstufen- und Politikseiten,
     die drei Kontoverknüpfungs-Seiten und die vier Identity-Seiten. Gefunden wurden
     ausschliesslich AUFLAGEN. NICHT gesucht wurde in /terms/api-services-user-data-policy
     und /identity/protocols/oauth2/policies — dort könnte eine stehen.

(af) DREI OPERATIVE HÜRDEN, DIE JE KUNDE ANFALLEN — MIT DATUM UND MIT IHRER GELTUNGSGRENZE.
     **NEU.**
     ALLE DREI GELESEN 2026-08-25; die ersten beiden an
     /google-ads/api/docs/oauth/security-requirements (Doku-Stand 2026-08-19), die dritte an
     /google-ads/api/docs/oauth/multi-party-approvals (Doku-Stand 2026-08-19).

     · ZWEI-SCHRITT-VERIFIZIERUNG. Wörtlich: "Note: On April 21, 2026, the Google Ads API
       started requiring 2SV for its users. This security update will be enabled for all
       users over the next few weeks." und "The Google Ads API requires 2SV for all its
       users following the user authentication workflow to generate new OAuth 2.0 refresh
       tokens."
     · PASSKEYS — UND HIER GEHÖRT DIE STAFFELUNG ZWINGEND DAZU, weil eine Zustandsaussage
       "seit dem 2026-08-05" STÄRKER wäre als die Quelle. Der Anbieter schreibt im FUTUR und
       schränkt zweifach ein: "Note: Starting August 5, 2026, the Google Ads API will start
       requiring passkeys for Google Ads API users. This security update will be enabled for
       all users over the next few weeks." und, eine Zeile darüber, "The Google Ads API may
       require some users to require passkeys." Wer daraus "seit dem 2026-08-05 gilt es für
       alle" macht, überträgt eine Ankündigung mit Rollout und Einschränkung in eine
       Tatsache. Beim 2SV-Satz besteht dieses Problem NICHT — dort steht "started
       requiring".
     · DIE GELTUNGSGRENZE BEIDER, und sie steht im Kopf jener Seite: "This guide applies
       only if you are using a user authentication workflow." Für Dienstkonten greift keine
       von beiden.
     · WAS BEIDE UNBERÜHRT LASSEN, an beiden Stellen wörtlich: "Existing OAuth refresh
       tokens are not affected by this policy." Getroffen ist also das ERZEUGEN neuer
       Erneuerungs-Token, nicht der laufende Betrieb mit bestehenden.
     · MEHRPARTEIEN-FREIGABE (im Text als Beta markiert): Das Hinzufügen eines Nutzers — und
       damit auch eines Dienstkontos — kann die Zustimmung eines zweiten Administrators
       verlangen. "Account administrators have 20 days to approve or reject a request before
       it expires." Eine Ausnahme steht dort OHNE Definition: "Read-only roles and API users
       are exempt from this approval process." WAS "API users" HIER BEZEICHNET, IST AN DER
       SEITE NICHT ENTSCHEIDBAR.

(ag) DIE AUFLAGEN AN DIE ABLAGE DER ZUGANGSDATEN — WÖRTLICH, WEIL SIE DIE
     AUTORISIERUNGSSCHICHT UNMITTELBAR BINDEN. **NEU.**
     GELESEN 2026-08-25 an /google-ads/api/docs/oauth/credential-management (Doku-Stand
     2026-08-19):
       "Never transmit tokens in plaintext, and always store encrypted tokens at rest to
       provide an extra layer of protection in the event of a data breach. Revoke tokens or
       service account permissions when you no longer need access to a user's account. After
       the tokens are revoked, delete them permanently from your application or system."
       "If your app requires notification of token revocation to provide a good experience
       for users, you must integrate with our Cross-Account Protection service."
       "We recommend forcing an access token refresh if there's less than 5 minutes until
       expiration."
     GELESEN 2026-08-25 an /google-ads/api/docs/productionize/secure-credentials (Doku-Stand
     2026-08-19):
       "If your app authorizes multiple users, you should take additional steps to protect
       the users' refresh and access tokens. Store the tokens securely at rest and never
       transmit them in plain text."
       "Offline jobs, such as cron jobs, should detect and record accounts whose refresh
       tokens have expired, instead of continuing to make failed requests. Google might
       throttle applications that generate high levels of errors over a sustained period of
       time to maintain the stability of the API servers."
     DAZU EIN SATZ AUS DER ALLGEMEINEN DOKU, GELESEN 2026-08-25 an
     /identity/protocols/oauth2 (Doku-Stand 2026-05-26), der die Bauform selbst betrifft:
       "you must not use, or encourage the use of, user credentials for server-to-server
       deployment. If user credentials are deployed on a server for long running jobs or
       operations and a customer applies session control policies on such users, the server
       application will fail as there will be no way to re-authenticate the user when the
       session duration expires."
     DIESE AUFLAGEN SIND GELESEN UND NICHT GEMESSEN; sie sagen, was der Anbieter VERLANGT,
     nicht was er prüft.

(ah) WIDERSPRUCH W-A · DIENSTKONTEN — VIER STELLEN, ZWEI UNVEREINBARE AUSSAGEN. UNAUFGELÖST.
     **NEU.** Alle vier GELESEN 2026-08-25, alle mit Doku-Stand 2026-08-19.
     · STELLE A: /google-ads/api/docs/productionize/secure-credentials — "Service accounts
       require domain-wide impersonation to work correctly with the Google Ads API, In
       addition, you should be a Google Workspace customer to set up domain-wide
       impersonation. For these reasons, we recommend against using service accounts when
       making Google Ads API calls."
     · STELLE B: /google-ads/api/docs/oauth/internals — "The Google Ads API does not support
       simultaneous sign-in with data access request (hybrid) or domain-wide delegation of
       authority (2LO)."
     · STELLE C: /google-ads/api/rest/auth — "you can skip the sub parameter when
       constructing the JWT claim set, because the setup steps grant the service account
       direct access to the Google Ads account, thus avoiding the need to impersonate a
       Google Ads user."
     · STELLE D: /google-ads/api/docs/oauth/single-user-authentication — "Google recommends
       using the service account workflow over the single user authentication workflow."
     STELLE A VERLANGT EINE DELEGATION, DIE B ALS NICHT UNTERSTÜTZT BEZEICHNET UND C ALS
     ENTBEHRLICH BESCHREIBT; A RÄT VOM DIENSTKONTO AB, D DAZU. VIER STELLEN GEMELDET, KEINE
     AUFGELÖST. Was daraus für einen Zuschnitt folgt, steht hier NICHT — diese Datei trägt
     keine Entscheidungen.
     WAS DANEBEN GILT UND KEIN TEIL DES WIDERSPRUCHS IST: Die Data-Manager-Doku empfiehlt
     für ihre eigenen Dienstkonten die IDENTITÄTSÜBERNAHME statt Schlüsseln und erwähnt
     domänenweite Delegation an keiner Stelle (s. (an)). Ob das ein Widerspruch zwischen zwei
     POLITIKEN oder zwischen zwei PRODUKTEN ist, ist am gelesenen Text nicht entscheidbar.

(ai) WIDERSPRUCH W-B · DIE EINSTUFUNG DES ZUGRIFFSBEREICHS — UND EINE KORREKTUR AN DER
     ERSTEN FASSUNG DIESES BEFUNDS, DIE MIT HINEIN MUSS.

     **DIE KORREKTUR ZUERST, WEIL DIE ERSTE FASSUNG ZWEI DINGE ZUSAMMENGEZOGEN HAT, DIE
     NICHT ZUSAMMENGEHÖREN (richtiggestellt am 2026-08-25):** Es sind ZWEI VERSCHIEDENE
     ZUGRIFFSBEREICHE. Die Angabe "restricted" der Ads-Seite gilt dem ADWORDS-Bereich; die
     Angabe "sensibel" aus CLAUDE.md gilt dem DATAMANAGER-Bereich. Zwischen ihnen besteht
     KEIN Widerspruch, und die erste Fassung dieses Befunds — sie stellte drei Aussagen
     nebeneinander und nannte keine zwei deckungsgleich — war insoweit FALSCH. Sie ist nie
     in eine Datei gelangt; die Richtigstellung steht hier, damit sie es auch nicht auf
     einem Umweg tut.
     DER DATAMANAGER-BEREICH IST DAMIT NICHT MEHR OFFEN: Er ist an der Anbieter-Doku als
     SENSIBEL belegt — die tragende Stelle steht in LAUF 4, (an). Der Vorbefund in CLAUDE.md
     ist damit BESTÄTIGEND belegt und nicht bloss plausibel.

     **WAS ALS WIDERSPRUCH BLEIBT, UND ER BETRIFFT EINEN BEREICH, DEN WIR MÖGLICHERWEISE NIE
     ANFASSEN:**
     · STELLE A: /google-ads/api/docs/productionize/secure-credentials (GELESEN 2026-08-25,
       Doku-Stand 2026-08-19) — "The OAuth 2.0 scope for the Google Ads API is classified as
       a restricted scope, which means that you should complete the OAuth application
       verification process before productionizing your application."
     · STELLE B: support.google.com/cloud/answer/13464325 ("Restricted Scopes", GELESEN
       2026-08-25, KEIN Doku-Stand ausgewiesen) — die kanonische Liste, wörtlich: "The
       following scopes are categorized as 'restricted'" und dann GENAU SIEBEN Produkte:
       Gmail API · Google Drive API · Google Fit API · Google Chat API · Data Portability
       API · Photos Ambient API · Google Health API. WEDER /auth/adwords NOCH
       /auth/datamanager steht darin — GEMESSEN am vollständigen Seitentext einschliesslich
       der aufgeklappten Abschnitte (formale Suche über alle
       `googleapis.com/auth/…`-Zeichenketten; der einzige "adwords"-Treffer der Seite liegt
       in ihrem JavaScript, nicht im Inhalt).
     BEIDE STELLEN GEMELDET, NICHT AUFGELÖST.

     WARUM DIE UNTERSCHEIDUNG TEUER IST — GELESEN 2026-08-25, beide Doku-Stand 2026-08-19:
     /identity/protocols/oauth2/production-readiness/sensitive-scope-verification sagt "The
     sensitive scope verification process typically takes 3-5 business days";
     /identity/protocols/oauth2/production-readiness/restricted-scope-verification sagt
     "Every app that requests access to Google users' restricted data and has the ability to
     access data from or through a third-party server must go through a security assessment
     from Google-empanelled security assessors", dazu "apps must be reverified for compliance
     and complete a security assessment at least every 12 months" und "the restricted scopes
     verification process can potentially take several weeks".
     EIN VERFAHRENS-BEFUND, DER BEIDE STELLEN RELATIVIERT: Nach
     support.google.com/cloud/answer/13463073 (GELESEN 2026-08-25, KEIN Doku-Stand
     ausgewiesen) sind die Kategorien ohnehin nicht aus der Doku ablesbar — "categories
     (non-sensitive, sensitive, or restricted) are indicated automatically in the Google
     Cloud Console."

     DREI AUSNAHMEN VON DER VERIFIZIERUNGSPFLICHT, GELESEN 2026-08-25 an
     /identity/protocols/oauth2/production-readiness/sensitive-scope-verification
     (Doku-Stand 2026-08-19) — sie sind für den heutigen Eigenbetrieb einschlägig:
       "Service-owned data only — If your app uses a service account to access only its own
       data, and it doesn't access any user data (linked to a Google Account), then you don't
       need to submit for verification."
       "Personal use — One use case is if you are the only user of your app or if your app is
       used by only a few users, all of whom are known personally to you. … Note: A user cap
       restricts the number of Google Accounts able to grant access to your unverified app."
       "Projects used in Development, Testing, or Staging tiers — … if your app is in the
       development, testing, or staging phases, verification isn't required. … Note: Your app
       is still subject to a tester warning screen, a user cap is in effect, and the refresh
       token lifetime is limited."
     **DIE GRENZE DER ERSTEN AUSNAHME, UND SIE IST DER GRUND, WARUM SIE DEN VORBEFUND NUR
     HALB TRÄGT:** Ein Dienstkonto, das in der Nutzerliste eines FREMDEN Werbekontos steht,
     greift auf die Daten dieses Kunden zu, nicht auf eigene. OB DIESER FALL UNTER "only its
     own data" FÄLLT, IST AM GELESENEN TEXT NICHT ENTSCHEIDBAR — die Ausnahme nennt ihn weder
     ein noch aus. Der Satz aus CLAUDE.md ("bei DIENSTKONTEN ausdrücklich nicht") ist als
     ZITAT bestätigt und in seiner ANWENDUNG auf den Mehrkunden-Fall unbelegt.

### Abschnitts-Lesung 2026-08-25 der Data-Manager-Politik, LAUF 4 — die Teile (aj) bis (as)

**HERKUNFT — ALLES IN DIESEM LAUF IST GELESEN, NICHTS IST GEMESSEN (2026-08-25):** Es ist
KEIN Aufruf gegen datamanager.googleapis.com gefahren worden, kein Token beschafft, kein
`gcloud` ausgeführt, keine Cloud-Konsole betreten, kein "Try it!" und kein API-Explorer
angeklickt. Jeder Teil nennt seine Quelle und seinen Doku-Stand.

**DIE FRAGE DIESES LAUFS, UND SIE IST EINE ANDERE ALS DIE DER LÄUFE 1 UND 2:** Berührt ein
Aufruf gegen datamanager.googleapis.com die POLITIK der Google Ads API — oder stehen die
beiden nebeneinander? Der Anlass: Sämtliche Auflagen, die LAUF 3 erhoben hat
(Entwickler-Token, Zugriffsstufen mit Tagesgrenzen, RMF-Klassifizierung, Demo-Zugang,
Passkey-Pflicht), stammen aus der Google-Ads-Dokumentation, und ob eine davon für
events:ingest gilt, sagte bis dahin keine gelesene Seite.

**KEINE BLIND-KLAUSEL, UND DER GRUND GEHÖRT DAZU:** Der Baum /data-manager/api war bereits
zweimal gelesen — aber auf einer ANDEREN Achse. Eine Seite, die auf einer Achse gelesen
wurde, ist auf einer neuen ungelesen. Dieser Lauf öffnet deshalb ausdrücklich auch Seiten,
die (h) und (t) schon führen, und markiert jede als NEU oder WIEDERGELESEN.

(aj) DER GELESENE UMFANG VON LAUF 4 — DREIZEHN SEITEN, DAVON DREI NEU UND ZEHN
     WIEDERGELESEN.
     Alle am 2026-08-25 abgerufen, alle unter developers.google.com/data-manager/api/…, alle
     mit `?hl=en`, alle HTTP 200. WERKZEUG wie in LAUF 3: Playwright-MCP, textbasiert
     gelesen; kein Bild-Schnappschuss, kein Snapshot-Aufruf. Der Werkzeug-Befund aus (aa)
     gilt unverändert — 18 Dateien in .playwright-mcp/ entstanden trotzdem.

     NEU — auf dieser Achse UND überhaupt zum ersten Mal geöffnet:
      1. /devguides/quickstart/install-library — "Install a client library" — 2026-08-14
      2. /devguides/quickstart/agent-skills — "Data Manager API agent skills" — 2026-08-07
      3. /support — "Get help" — 2026-07-30
     ALLE DREI STANDEN IN (h) BZW. (t) UNTER "GESEHEN, NICHT GEÖFFNET" — die ersten beiden
     als "vom Auftrag ausgeschlossen", die dritte nur als /support/contact erwähnt. **SEITE 1
     TRÄGT DEN WERTVOLLSTEN EINZELBEFUND DIESES LAUFS** (s. (al)).

     WIEDERGELESEN — schon einmal offen, nie auf dieser Achse:
      4. /devguides/limits — "Limits and quotas" — 2026-07-30 (aus LAUF 2)
      5. /devguides/quickstart/set-up-access — "Set up API access" — 2026-08-14 (LAUF 1)
      6. /devguides/accounts/partner-links — "Partner links overview" — 2026-08-07 (LAUF 1)
      7. /devguides/concepts/destinations — "Configure destinations and headers" —
         2026-08-20 (LAUF 1)
      8. /devguides/terms — "Terms of service" — KEIN "Last updated"; die Seite trägt
         "Last modified: November 9, 2021" (aus LAUF 2)
      9. /data-manager/api (Startseite) — "Data Manager API" — KEIN Doku-Stand ausgewiesen
         (LAUF 1, Kartier-Schritt)
     10. /devguides/events — "Events overview" — 2026-07-30 (LAUF 1)
     11. /devguides/events/google-ads/offline — "Google Ads offline conversions" —
         2026-07-30 (LAUF 1)
     12. /devguides/events/send-events — "Send events" — 2026-08-18 (LAUF 1)
     13. /devguides/concepts/understand-errors — "Understand API errors" — 2026-07-30
         (LAUF 1)
     14. /reference/rest/v1/events/ingest — "Method: events.ingest" — 2026-07-28 (LAUF 2)
     15. /devguides/concepts/best-practices — "Best practices" — 2026-07-30 (LAUF 1)
     DIE NUMMERIERUNG LÄUFT BIS 15 UND ZÄHLT DREIZEHN SEITEN: /devguides/events ist zweimal
     navigiert worden — einmal für den Navigationsbaum, einmal für die Allowlist-Achse — und
     zählt einmal.

     DOKU-STÄNDE UNVERÄNDERT: Bei allen zehn wiedergelesenen Seiten stimmt der heute
     abgelesene "Last updated"-Wert ZEICHENGLEICH mit dem in (h) bzw. (t) protokollierten
     überein. Zwischen dem 2026-08-24 und dem 2026-08-25 hat sich an keiner der ausgewiesene
     Stand bewegt.

     DER NAVIGATIONSBAUM, FORMAL ABGEZOGEN: 58 Einträge unter /data-manager, erhoben von
     /devguides/events aus. Gegen (h) und (t) abgeglichen — KEINE Seite darin ist beiden
     Vorläufen unbekannt.
     DER LAUF-1-BEFUND ZUM NAVIGATIONSBAUM BESTÄTIGT SICH: /devguides/limits und
     /devguides/terms stehen WEITERHIN NICHT im Baum (58 Einträge, beide fehlen). Ich bin
     auf /devguides/limits über einen FLIESSTEXT-VERWEIS gestossen — /devguides/events/
     send-events sagt "See Limits and quotas for the maximum number of destinations per
     request."

     GESEHEN, NICHT GEÖFFNET — mit Grund:
     · Alle /devguides/audiences/**-Seiten und alle upgrade/-Unterbäume — Zielgruppen bzw.
       Feld-Zuordnungen zu Alt-Schnittstellen; berühren die Achse nicht.
     · /devguides/events/cm360/*, /devguides/events/analytics/*,
       /devguides/events/google-ads/store-sales* — andere Produkte.
     · /devguides/events/google-ads/online — inhaltlich durch die Allowlist-Prüfung auf
       /devguides/events abgedeckt (s. (aq)).
     · /devguides/concepts/{encryption, formatting}, /devguides/diagnostics —
       Nutzlast-Aufbereitung und Nachlauf; keine Aussage zu Token, Stufen oder Kontingenten.
     · /reference/** ausser events/ingest — durch (t) vollständig ausgelesen; die Achse
       "Politik" ist in einer Feld-Referenz strukturell nicht zu erwarten.
     · /support/contact — Formularseite; keine Formulare geöffnet.

     TABELLEN MIT SYMBOL-INHALT: KEINE. Auf jeder Seite mit Tabellen sind die Zellen ROH
     geprüft worden (Zellentext plus CSS-Klassenname, wegen des compare-yes/compare-no-
     Befunds aus LAUF 1): Die Tabelle auf /devguides/limits trägt Text in allen neun Zellen
     und keine Klassennamen; die 62 Tabellen auf /devguides/concepts/destinations ebenso.
     Nichts ist als leer behandelt worden.

(ak) B4 · DIE VERWEIS-FRAGE — DIE DATA-MANAGER-DOKU VERWEIST VIERMAL NACH google-ads, UND
     KEIN EINZIGER DIESER VERWEISE BETRIFFT DIE POLITIK DER GOOGLE ADS API. **NEU.**
     Dieser Teil steht zuerst, weil er die drei übrigen entscheidet.

     VERWEIS 1 · KONTOZUGANG — der einzige, der eine HANDLUNG an die Ads-Doku abgibt.
     GELESEN 2026-08-25 an /devguides/quickstart/set-up-access (Doku-Stand 2026-08-14),
     Reiter "Service account": "Complete Account access setup to add the service account to
     the Google Ads account or a parent Google Ads manager account." Und im
     Data-Partner-Zweig desselben Reiters: "Grant the email associated with your service
     account access to your data partner account. Data partner account access is managed
     through the Google Ads UI. To add the service account and set its access level, follow
     the steps in Account access setup."
     Beide Male zeigt "Account access setup" auf
     developers.google.com/google-ads/api/docs/oauth/service-accounts#account_access_setup.
     DER VORGANG IST: eine Dienstkonto-E-Mail in die Nutzerliste eines Google-Ads-Kontos
     eintragen. Kein Token, keine Stufe, keine Prüfung.

     VERWEIS 2 · REFERENZ AUF EINEN FELDWERT BZW. EINE ABFRAGE. GELESEN 2026-08-25 an
     /devguides/events/send-events (Doku-Stand 2026-08-18): sechs Verweise auf
     google-ads/api/reference/rpc/latest/ConversionAction#type. GELESEN 2026-08-25 an
     /devguides/concepts/destinations (Doku-Stand 2026-08-20): ein Verweis auf
     google-ads/api/reference/rpc/latest/GoogleAdsService, dort ausdrücklich als
     ALTERNATIVE zur Oberfläche — "The product destination ID for ingesting events is the
     conversion action ID. Retrieve this ID using the Google Ads UI or the Google Ads API."

     VERWEIS 3 · EINE AUSDRÜCKLICHE ABGRENZUNG — DER STÄRKSTE BELEG DIESES TEILS. GELESEN
     2026-08-25 an /devguides/concepts/understand-errors (Doku-Stand 2026-07-30), wörtlich:
       "The Data Manager API uses a fast-fail model. If a request contains structural errors
       or if any record fails validation for a required field, the entire request fails, and
       the API does not process any of the data in that request. … The fast-fail model
       differs from the partial failure model in some other Google APIs, such as the Google
       Ads API and the Campaign Manager 360 API."
     DIE EINZIGE STELLE IM GELESENEN UMFANG, AN DER DIE DATA-MANAGER-DOKU DIE GOOGLE ADS API
     ALS SYSTEM BENENNT, TUT ES, UM SICH DAVON ZU UNTERSCHEIDEN.

     VERWEIS 4 · MIGRATION. GELESEN 2026-08-25 an /devguides/events/google-ads/offline
     (Doku-Stand 2026-07-30) — die Seite ist ein Stummel und trägt genau einen Ads-Verweis:
     "If you're upgrading from the Google Ads API, check out Upgrade from the Google Ads API
     for instructions."

     **WAS NIRGENDS STEHT — NICHT-TREFFER MIT BENANNTER ACHSE.** Achse: die dreizehn Seiten
     aus (aj), jeweils über den VOLLSTÄNDIGEN textContent des Artikelrumpfs (also
     einschliesslich eingeklappter Reiter und Code-Beispiele), case-insensitiv, Begriffe:
     `developer token` · `developer-token` · `developerToken` · `access level` · `basic
     access` · `standard access` · `required minimum` · `RMF` · `compliance` · `demo` ·
     `google-ads/api`. KEIN Treffer auf irgendeiner der dreizehn Seiten — mit genau einer
     Ausnahme, und die ist ein HOMONYM.
     **DAS HOMONYM, DAMIT ES NIEMAND MITZÄHLT:** `access level` auf
     /devguides/quickstart/set-up-access meint die Zugriffsstufe eines NUTZERS in der
     Google-Ads-Oberfläche ("To add the service account and set its access level"), also
     Standard bzw. Admin — NICHT die Entwickler-Token-Stufe Test/Explorer/Basic/Standard.
     Wer den Begriff ohne Kontext zählt, verwechselt zwei verschiedene Sachen.

     **DIE GEGENRICHTUNG IST NIE GESUCHT.** Ob die Google-Ads-Doku ihrerseits die Data
     Manager API nennt, ist in diesem Lauf NICHT erhoben worden — der Ads-Baum war
     ausdrücklich ausgeschlossen. Was gesagt werden kann, ist eine reine Beobachtung an den
     ohnehin offenen Seiten: die vier Verweise zeigen HINEIN; ob etwas zurückzeigt, ist damit
     nicht berührt.
     EIN RANDBEFUND, DER IN DIESELBE RICHTUNG DEUTET UND NICHTS BELEGT: Der Support-Kanal der
     Data Manager API liegt unter einem Google-Ads-Hilfecenter-Pfad — /support (GELESEN
     2026-08-25, Doku-Stand 2026-07-30) verlinkt "support form" auf
     support.google.com/google-ads/contact/data_manager_api. DAS IST EIN URL-PFAD, KEINE
     AUSSAGE.

     **DIE ANTWORT AUF B4, IN EINEM SATZ:** Nach dem gelesenen Text stehen die beiden
     Politiken NEBENEINANDER. Die Data-Manager-Doku gibt genau EINEN Vorgang an die Ads-Doku
     ab — das Eintragen einer Identität in die Nutzerliste eines Werbekontos — und übernimmt
     an keiner Stelle deren Zugriffsstufen, deren Entwickler-Token oder deren
     Werkzeug-Prüfung. **DAS IST EINE AUSSAGE ÜBER DIE DOKU, KEINE ÜBER DAS VERHALTEN DES
     ENDPUNKTS.**

(al) B1 · DIE DATA MANAGER API VERLANGT NACH DEM GELESENEN TEXT KEINEN ENTWICKLER-TOKEN —
     UND DER BELEG IST NICHT NUR EINE ABWESENHEIT, SONDERN EIN POSITIVER FUND AM DRAHT.
     **NEU.**

     DER POSITIVE BELEG, auf einer Seite, die in beiden Vorläufen ausgeschlossen war.
     GELESEN 2026-08-25 an /devguides/quickstart/install-library (Doku-Stand 2026-08-14),
     Reiter "REST", das Aufruf-Beispiel wörtlich:
       curl -X POST "https://datamanager.googleapis.com/v1/audienceMembers:ingest" \
       --header "Authorization: Bearer ${DATA_MANAGER_ACCESS_TOKEN}" \
       --header "x-goog-user-project: PROJECT_ID" \
       --header "Content-Type: application/json" \
       --data @- <<EOF
     GEMESSEN AM SEITENTEXT (formale Auszählung `--header "[^"]+"` über den vollständigen
     textContent, also einschliesslich des eingeklappten Reiters "Data partner"): GENAU
     DIESE DREI KOPFZEILEN, in beiden Reitern identisch. Der Begriff `developer` kommt auf
     der ganzen Seite nicht vor.
     FOLGE FÜR DEN TRÄGER DES ZUGANGSDATUMS: Kopfzeile `Authorization`, Präfix `Bearer` plus
     ein Leerzeichen — erstmals AN DER DATA-MANAGER-DOKU SELBST gelesen.

     **DIE GRENZE, UND SIE IST SCHARF ZU ZIEHEN:** Das Beispiel gilt
     `audienceMembers:ingest`, NICHT `events:ingest`. Derselbe Host, dieselbe Version, eine
     Schwester-Methode — aber `events:ingest` kommt auf dieser Seite nicht vor. **FÜR
     events:ingest LIEGT WEITERHIN KEIN KOPFZEILEN-BEISPIEL VOR.** NICHT-TREFFER MIT
     BENANNTER REICHWEITE: die dreizehn Seiten aus (aj) plus die dreiunddreissig aus (h) und
     (t).

     DER ZWEITE BELEG — DIE ZUGRIFFSBEREICHE DER METHODE SELBST. GELESEN 2026-08-25 an
     /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), Abschnitt "Authorization
     scopes", vollständig: "Requires the following OAuth scope:
     https://www.googleapis.com/auth/datamanager". Ein Zugriffsbereich, kein zweites
     Zugangsdatum. Auf dieser Seite sind `developer token`, `access level` und
     `google-ads/api` sämtlich Nicht-Treffer.

     DER DRITTE BELEG — DIE VORAUSSETZUNGSLISTE KENNT KEINEN. GELESEN 2026-08-25 an
     /devguides/quickstart/set-up-access (Doku-Stand 2026-08-14): Unter "Prerequisites"
     stehen DREI Dinge — ein Google-Cloud-Projekt, ein Google-Konto mit der Berechtigung
     `serviceusage.services.enable`, und die installierte Google Cloud CLI. Kein
     Entwickler-Token. Dazu wörtlich: "You can use any of the Authentication methods at
     Google besides API keys." und "Note: The scope
     https://www.googleapis.com/auth/datamanager is required for all services in the Data
     Manager API."

     **GELESEN, NICHT GEMESSEN.** Dass der Endpunkt einen Aufruf OHNE `developer-token`
     tatsächlich annimmt, ist damit nicht gemessen. B1 gilt auf der DOKU-Achse als
     beantwortet und ausdrücklich NICHT als gemessen.

(am) EINE ZWEITE KOPFZEILE REIST IM OFFIZIELLEN BEISPIEL MIT: x-goog-user-project.
     **NEU** — und sie steht als EIGENER Teil und nicht als Nebensatz zu (al), weil sie die
     Fehlerklasse trägt, die bei einem Mehrkunden-OAuth-Aufbau zuerst zuschlägt.
     GELESEN 2026-08-25 an /devguides/quickstart/install-library (Doku-Stand 2026-08-14):
     `--header "x-goog-user-project: PROJECT_ID"` — im selben curl-Block wie die
     Authorization-Zeile, in BEIDEN Reitern (Advertiser und Data partner).
     **UNTER WELCHER BEDINGUNG SIE FÄLLIG WIRD, SAGT KEINE DATA-MANAGER-SEITE.**
     NICHT-TREFFER MIT BENANNTER REICHWEITE: die dreizehn Seiten aus (aj), Achse "wann ist
     x-goog-user-project Pflicht". Keine Seite nennt eine Bedingung, keine nennt sie als
     optional, keine erklärt sie.
     WAS AUSSERHALB DIESER DATEI DAZU BEKANNT IST und hier NUR als Zeiger steht, damit es
     nicht als Data-Manager-Befund gilt: Die Google-Cloud-Doku knüpft diese Kopfzeile an
     NUTZER-Zugangsdaten (LAUF 3, gelesen an cloud.google.com/docs/authentication/rest,
     Doku-Stand 2026-08-22: "To call some APIs with user credentials, you must also set the
     project that is billed for your usage and used to track quota"). OB DAS FÜR
     datamanager.googleapis.com GILT, IST NICHT GELESEN UND NICHT GEMESSEN.

(an) B2 · KEINE ZUGRIFFSSTUFEN, KEINE RMF, KEIN WERKZEUG-PRÜFVERFAHREN — STATTDESSEN DREI
     VERFAHREN MIT JE ANDEREM AUSLÖSER. **NEU im Befund, BESTÄTIGEND in zwei Einzelteilen.**

     NICHT-TREFFER MIT BENANNTER REICHWEITE. Achse: die dreizehn Seiten aus (aj),
     vollständiger textContent, case-insensitiv, Begriffe `access level` (ausser dem in (ak)
     erklärten Homonym) · `basic access` · `standard access` · `required minimum` · `RMF` ·
     `compliance` (ausser der Apache-Lizenz-Formel "in compliance with the License") ·
     `demo`. KEIN inhaltlicher Treffer.

     VERFAHREN 1 · AUSGELÖST DURCH DIE ANMELDEART. GELESEN 2026-08-25 an
     /devguides/quickstart/set-up-access (Doku-Stand 2026-08-14), wörtlich:
       "Important: Any Google Cloud app used to obtain user credentials for the Data Manager
       API scope must undergo Google OAuth verification to avoid an unverified UI screen for
       its users. Google OAuth verification isn't required for service accounts."
       "Since the Data Manager API scope is a sensitive scope, the following steps are
       required: Go to the Data Access settings for your project. Click Add or remove
       scopes. Check the box next to Data Manager API in the list of scopes, and click
       Update. Click Save."
     **DAS IST DIE TRAGENDE STELLE FÜR DEN VORBEFUND IN CLAUDE.md, "## Modus"** — "ein als
     SENSIBEL eingestufter Zugriffsbereich" und "für NUTZER-Zugangsdaten eine
     OAUTH-VERIFIZIERUNG — bei DIENSTKONTEN ausdrücklich nicht". BESTÄTIGEND, nicht neu; neu
     ist allein, dass die tragende Stelle jetzt wörtlich vorliegt. Sie schliesst zugleich
     die Hälfte von (ai), die den datamanager-Bereich betraf.

     VERFAHREN 2 · AUSGELÖST DURCH DAS ZUGANGSMODELL. Ebenda, wörtlich: "Select Data Partner
     if you're using credentials for a Google Account that is a user in a data partner
     account, and you want to manage advertiser accounts that have a partner link to the
     data partner account. Data partner accounts are issued only after going through the
     approval process. To get started, fill out the interest form."
     BESTÄTIGEND zu CLAUDE.md ("das Freigabeverfahren am ZUGANGSMODELL statt an der
     Gestalt").
     **NEU DAZU — EIN ZWEITER, ENGERER ZUGRIFFSBEREICH.** GELESEN 2026-08-25 an
     /devguides/accounts/partner-links (Doku-Stand 2026-08-07): "To create or delete partner
     links, you need credentials for a Google Account that's a user in the advertiser account
     with the following scope: https://www.googleapis.com/auth/datamanager.partnerlink … This
     scope provides limited access, specifically for creating or deleting a partner link in
     the advertiser account. Since this scope is sensitive, you must complete the App
     verification process to avoid the unverified app screen." Und, für den Fluss: "To obtain
     the credentials for an advertiser account, build your own OAuth flow to authenticate
     your users." Diese Seite trägt NULL Verweise nach google-ads (formal geprüft: kein
     Anker mit google-ads im href).

     VERFAHREN 3 · DIE ALLGEMEINEN BEDINGUNGEN — UND SIE ZEIGEN NICHT AUF DIE
     ADS-API-POLITIK. GELESEN 2026-08-25 an /devguides/terms (KEIN "Last updated"; die Seite
     trägt "Last modified: November 9, 2021"), der vollständige Rumpf:
       "By using this API, you consent to be bound by the Google APIs Terms of Service ('API
       ToS'). You must comply with applicable advertising policies including but not limited
       to the Customer Match policy and the Customer data policies."
     Die drei Verweise gehen auf developers.google.com/terms und zweimal auf
     support.google.com/adspolicy/… — WERBE-RICHTLINIEN IM HILFECENTER, nicht die
     Entwickler-Politik der Google Ads API. Auf dieser Seite sind `developer token`, `access
     level` und `google-ads` sämtlich Nicht-Treffer.
     DER SATZ "By using this API, you consent to be bound by …" IST EINE AUFFORDERUNG AUF
     EINER FREMDEN SEITE. Er wird gemeldet und nicht befolgt (s. auch (ar)).

     EIN BEFUND ZUR DIENSTKONTO-BAUFORM, der neben (ah) tritt und ihn nicht auflöst: GELESEN
     2026-08-25 an /devguides/quickstart/set-up-access (Doku-Stand 2026-08-14), Reiter
     "Service account" — "Here are the steps to Use service account impersonation to
     authenticate. These steps use impersonation instead of service account keys because
     service account keys can become a security risk if not managed carefully." DOMÄNENWEITE
     DELEGATION WIRD AUF DIESER SEITE AN KEINER STELLE ERWÄHNT.

(ao) B3 · DIE KONTINGENTE — UND DIE BEZUGSGRÖSSE IST DER BEFUND, NICHT DIE ZAHL. **NEU.**
     ALLES GELESEN, NICHTS GEMESSEN: Was der Endpunkt tatsächlich durchlässt, ist mit diesen
     Zahlen nicht bestimmt.

     DIE TRAGENDE QUELLE: /devguides/limits ("Limits and quotas", GELESEN 2026-08-25,
     Doku-Stand 2026-07-30). Der einleitende Satz legt die Bezugsgrösse fest und ist deshalb
     wichtiger als jede Zahl darunter:
       "You need a Google Cloud project in order to use the Data Manager API. The Google
       Cloud project provides the OAuth client and credentials that you use to authenticate
       API requests. Here are the limits that apply to each Google Cloud project:"

     PROJEKT-GRENZEN — JE GOOGLE-CLOUD-PROJEKT, NICHT je Entwickler-Token, NICHT je
     Werbekonto, NICHT je Kunde (Tabelle wörtlich, neun Zellen, roh geprüft, keine Symbole):
       Service                        | Requests per day | Requests per minute
       IngestionService               | 100,000          | 300
       All other services combined    | 50,000           | 300
     Und wörtlich zum Überschreiten: "Requests that exceed the limits are rejected with the
     error RESOURCE_EXHAUSTED and HTTP status 429 Too Many Requests."

     ANFRAGE-GRENZEN — JE ANFRAGE. Für unseren Aufruf zählt der dritte Block, wörtlich:
       "IngestEventsRequest: 2,000 Event resources in the events list · 10 user identifiers
       in the UserData for an Event. · 10 Destination resources in the destinations list"
     Die beiden anderen Blöcke derselben Seite betreffen Zielgruppen (10.000 AudienceMember,
     10 Identifier, 10 Destinations bzw. 10 Destinations) und nicht diesen Pfad; sie stehen
     hier nur, weil die 10.000 in (ap) wiederkehren.

     BESTÄTIGUNG DER 2.000 AN ZWEITER STELLE. GELESEN 2026-08-25 an
     /reference/rest/v1/events/ingest (Doku-Stand 2026-07-28), Feldbeschreibung events[]:
     "Required. The list of events to send to the specified destinations. At most 2000 Event
     resources can be sent in a single request."

     ZWEI EMPFEHLUNGEN ZUM BÜNDELN. GELESEN 2026-08-25 an /devguides/concepts/best-practices
     (Doku-Stand 2026-07-30), wörtlich: "To reduce the likelihood of exceeding daily request
     limits, batch as many items as possible in each request, up to the per-request limits."
     und "To reduce the overall time required to ingest data, send concurrent requests to
     the IngestionService. We recommend sending up to 10 requests concurrently to reduce the
     likelihood of exceeding the requests per minute limit."
     **DIE VERBREITETE KURZFASSUNG "der Anbieter empfiehlt das Bündeln von bis zu 2.000
     Ereignissen je Anfrage" IST EIN ZUSAMMENZUG AUS ZWEI SEITEN und steht so NIRGENDS:** Die
     EMPFEHLUNG (best-practices) nennt KEINE Zahl und sagt "up to the per-request limits";
     die ZAHL (limits) steht auf einer anderen Seite. Wer die Kurzfassung zitiert, zitiert
     eine Zusammenfassung, kein Anbieter-Zitat.

     **JE KONTO — NICHT-TREFFER MIT BENANNTER REICHWEITE.** Achse: die dreizehn Seiten aus
     (aj), Begriffe `per account` · `per customer` · `account limit` · `quota` · `limit`. Die
     Doku bemisst ausschliesslich JE CLOUD-PROJEKT und JE ANFRAGE. Eine Grenze je Werbekonto,
     je Conversion-Action oder je Ziel steht auf keiner gelesenen Seite. DAS IST EINE AUSSAGE
     ÜBER DIE DOKU UND KEINE ZUSICHERUNG DES ANBIETERS.

(ap) DIE HÖCHSTZAHL DER EREIGNISSE — FÜNF OFFIZIELLE CODE-BEISPIELE AUF EINER SEITE
     WIDERSPRECHEN SICH. **NEU.** DIESER TEIL TRITT NEBEN WIDERSPRUCH 3 IN (y) UND ERSETZT
     IHN NICHT; jener trägt die drei bereits bekannten Stellen, darunter den Fehlercode.

     FUNDSTELLE: /devguides/events/send-events (GELESEN 2026-08-25, Doku-Stand 2026-08-18),
     die Code-Beispiele zu IngestEventsRequest. FORMAL AUSGEZÄHLT über den vollständigen
     textContent (Muster `MAX_EVENTS_PER_REQUEST\s*=\s*[0-9_,]+` und
     `MaxEventsPerRequest\s*=\s*[0-9_,]+`), je Treffer dem umgebenden Beispiel zugeordnet:
     · .NET   — `private static readonly int MaxEventsPerRequest = 2_000;`        -> 2.000
     · Java   — `private static final int MAX_EVENTS_PER_REQUEST = 2_000;`        -> 2.000
     · PHP    — `// The maximum number of events allowed per request.`
                `const MAX_EVENTS_PER_REQUEST = 2000;`                            -> 2.000
     · Node.js— `const MAX_EVENTS_PER_REQUEST = 10000;`                           -> 10.000
     · Python — `# The maximum number of events allowed per request.`
                `_MAX_EVENTS_PER_REQUEST = 10_000`                                -> 10.000
     Die Java-, PHP- und Python-Fassungen tragen DENSELBEN Kommentar und nennen verschiedene
     Werte.

     **DAS GESAMTVERHÄLTNIS NACH BEIDEN BEFUNDEN: ACHT STIMMEN, FÜNF ZU DREI FÜR 2.000.**
     · Für 2.000, fünf Stellen: (y)/Widerspruch 3 Stelle A (/reference/rest/v1/events/ingest)
       · (y)/Widerspruch 3 Stelle B (/devguides/limits) · .NET · Java · PHP.
     · Für 10.000, drei Stellen: (y)/Widerspruch 3 Stelle C (/reference/rest/v1/ErrorReason,
       Enum TOO_MANY_EVENTS) · Node.js · Python.
     **DIE MEHRHEIT IST KEIN BEWEIS**, und der Grund steht schon in (y): Ausgerechnet die
     abweichende Referenz-Stelle ist die, die im FEHLERFALL ausgeliefert wird.
     EINE VERMUTUNG ÜBER DIE URSACHE, AUSDRÜCKLICH ALS VERMUTUNG: 10.000 ist genau die Grenze
     der Zielgruppen-Anfrage (s. (ao)), was einen Übernahmefehler aus den
     Zielgruppen-Beispielen nahelegt. BELEGT SIND NUR DIE FÜNF WERTE.
     **DIE AUFLÖSUNG BLEIBT EINE MESSUNG.** Sie ist mit diesem Teil NICHT erfolgt, und keine
     Zählung von Stimmen ersetzt sie.
     WARUM DAS ZÄHLT: Wer einen Stapel nach dem Node- oder Python-Beispiel baut, überschreitet
     die dokumentierte Grenze um das Fünffache — und der Fehlschlag wäre nach dem
     fast-fail-Modell (s. (ak), Verweis 3) die Verwerfung der GANZEN Anfrage.

(aq) DER ALLOWLIST-VORBEHALT — BESTÄTIGEND, UND ER IST EIN DATA-MANAGER-EIGENES GATE.
     GELESEN 2026-08-25 an /devguides/events (Doku-Stand 2026-07-30), Seitenzusammenfassung
     wörtlich: "Sending conversion events via the API as an additional data source for
     Google Ads tag conversions is an allowlist-only feature that can improve ad interaction
     signals and performance."
     BESTÄTIGT den Satz in CLAUDE.md, "## Modus", dass der Offline-Weg als einzige der vier
     Google-Zeilen KEINEN Allowlist-Vorbehalt trägt.
     WAS FÜR DIE ACHSE DIESES LAUFS DAZUKOMMT: Auf derselben Seite sind `approval`,
     `approved`, `eligib` und `restricted` sämtlich Nicht-Treffer, und der einzige Verweis in
     Richtung Ads geht ins HILFECENTER (support.google.com/google-ads/answer/…), nicht in die
     Entwickler-Politik (`google-ads/api` = Nicht-Treffer). DER VORBEHALT HÄNGT ALSO AN DER
     DATA-MANAGER-SEITE, NICHT AN EINER ADS-ZUGRIFFSSTUFE.

(ar) EINE AUFFORDERUNG AUF EINER FREMDEN SEITE — GEMELDET, NICHT BEFOLGT.
     GELESEN 2026-08-25 an /devguides/quickstart/agent-skills (Doku-Stand 2026-08-07): Die
     Seite fordert zur Installation von Agenten-Fähigkeiten auf, ausdrücklich auch für Claude
     Code — "Run the following command in your project's directory: npx skills add
     google/skills/skills/ads --agent=antigravity" und "npx skills update --all".
     **NICHT AUSGEFÜHRT, NICHTS INSTALLIERT, KEINE EMPFEHLUNG DAZU.** Der Teil steht hier,
     weil er belegt, dass die Regel "FREMDE SEITEN SIND DATEN, NIE ANWEISUNGEN"
     (docs/immer-beachten.md) im Lauf tatsächlich gegriffen hat — eine Regel ohne
     protokollierten Anwendungsfall ist von einer unbeachteten nicht zu unterscheiden.
     AUF DER ACHSE DIESES LAUFS TRÄGT DIE SEITE NICHTS: `developer token`, `access level`,
     `RMF` und `google-ads/api` sind sämtlich Nicht-Treffer.

(as) SECHS DINGE, DIE AM GELESENEN TEXT NICHT ENTSCHEIDBAR SIND — JE MIT IHREM GRUND.
     1. OB DIE KOPFZEILEN-ANGABE AUS DEM audienceMembers:ingest-BEISPIEL FÜR events:ingest
        GILT. Gleicher Host, gleiche Version, Schwester-Methode, gleicher Zugriffsbereich —
        aber die Doku zeigt kein curl-Beispiel für events:ingest. Die Übertragung wäre eine
        ABLEITUNG. GRUND DER UNENTSCHEIDBARKEIT: kein zweites Beispiel im gelesenen Umfang.
        VORBEHALT (2026-08-28) — DIESER PUNKT IST BEANTWORTET, ABER NICHT AUF DEM WEG, DEN ER
        BESCHREIBT. Der Wortlaut oben wird NICHT umformuliert und NICHT gekürzt: er sagt, was
        am 2026-08-25 AM TEXT nicht entscheidbar war, und das ist unverändert wahr — die Doku
        zeigt bis heute kein curl-Beispiel für events:ingest (erneut geprüft über sieben
        Seiten, s. unten (bh)). BEANTWORTET HAT ES EINE MESSUNG, NICHT EINE LESUNG: Der
        Träger ist die Kopfzeile Authorization mit dem Wert "Bearer " + Token, GEMESSEN
        2026-08-28 gegen events:ingest — s. unten (bj) und (bk). DIE ÜBERTRAGUNG AUS DEM
        SCHWESTER-BEISPIEL IST DAMIT NICHT NACHTRÄGLICH ERLAUBT, sondern gegenstandslos: Der
        Wert steht jetzt aus eigener Quelle fest. Wer diesen Punkt später als offen liest,
        sucht eine Doku-Stelle, die es nicht gibt und nicht mehr braucht.
     2. OB x-goog-user-project BEI events:ingest PFLICHT IST oder nur im Beispiel steht.
        GRUND: keine Data-Manager-Seite nennt eine Bedingung (s. (am)).
     3. OB EIN AUFRUF GEGEN datamanager.googleapis.com IN IRGENDEINER WEISE GEGEN EIN
        GOOGLE-ADS-KONTINGENT ZÄHLT. Die Data-Manager-Doku bemisst je Cloud-Projekt und
        schweigt zu jeder Ads-seitigen Zählung. GRUND: EIN SCHWEIGEN IST KEINE VERNEINUNG —
        belegt ist nur, dass auf dreizehn Seiten nichts dazu steht.
     4. OB DIE GOOGLE-ADS-POLITIK AN EINEM GETEILTEN CLOUD-PROJEKT HÄNGT, sobald man BEIDE
        Schnittstellen benutzt. /devguides/quickstart/set-up-access zeigt ausdrücklich, wie
        man EIN Zugangsdatum für beide Bereiche zieht (`--scopes="…/datamanager,…/adwords,
        …/cloud-platform"`). GRUND: keine gelesene Seite sagt, was daraus folgt.
     5. OB DIE DIENSTKONTO-EMPFEHLUNG DER DATA-MANAGER-DOKU MIT DER DER GOOGLE-ADS-DOKU
        VEREINBAR IST. Jene empfiehlt Identitätsübernahme und erwähnt domänenweite Delegation
        nicht; diese verlangt sie und rät vom Dienstkonto ab (s. (ah)). GRUND: ob das ein
        Widerspruch zwischen zwei POLITIKEN oder zwischen zwei PRODUKTEN ist, sagt keine
        Stelle.
     6. OB 2.000 ODER 10.000 GILT. Acht Stellen, fünf zu drei (s. (ap)). GRUND: es ist eine
        MESSFRAGE. Das Instrument wäre validateOnly=true mit einer Nutzlast zwischen den
        beiden Werten; es ist in diesem Lauf ausdrücklich NICHT benutzt worden.

### Abschnitts-Lesung 2026-08-27 der OAuth-2.0-Dokumentation für Webserver-Anwendungen, LAUF 5 — die Teile (at) bis (ay)

**WARUM DIESER LAUF UND WAS ER NICHT IST:** Die vier Vorläufe lasen die DATA-MANAGER- und
die GOOGLE-ADS-Doku — also das, was mit einem fertigen Zugangsdatum geschieht. Dieser Lauf
liest, WIE das Zugangsdatum entsteht: den Webserver-Fluss. **Er berührt keinen einzigen
Data-Manager-Befund und stellt keinen davon richtig.**

**HERKUNFT, für ALLE Teile dieses Laufs: GELESEN am 2026-08-27. NICHTS ist gemessen** — es
ist kein Aufruf gegen eine Google-Schnittstelle gefahren, kein Zustimmungsbildschirm
geöffnet, keine Cloud-Konsole betreten, keine Anmeldung vorgenommen.

**DER GELESENE UMFANG — ZWEI SEITEN, VOLLSTÄNDIG:**
1. `https://developers.google.com/identity/protocols/oauth2/web-server` — "Using OAuth 2.0
   for Web Server Applications", **Doku-Stand laut Seitenfuss: 2026-08-07**. Vollständig
   gelesen (40 271 Zeichen sichtbarer Text; zusätzlich der Text der nicht aktiven
   Sprach-Reiter über `textContent`, weil der HTTP/REST-Reiter sonst unsichtbar bleibt —
   ohne diesen Griff wäre (ay) nicht gefunden worden).
2. `https://developers.google.com/identity/openid-connect/openid-connect` — "OpenID
   Connect", **Doku-Stand laut Seitenfuss: 2026-06-15**. Geöffnet AUSSCHLIESSLICH wegen des
   Abschnitts "Prompting re-consent", auf den Seite 1 aus der `prompt`-Zeile ihrer
   Parameter-Tabelle verweist.

**EIN HINWEIS ZUR SPRACHE, damit ein späterer Lauf nicht andere Zeichenketten findet:** Der
erste Aufruf ohne Parameter wurde auf `?hl=de` umgeleitet. Alle Zitate unten stammen aus
`?hl=en`; die Parameternamen selbst sind sprachunabhängig.

**GESEHEN UND NICHT GEÖFFNET, je mit Grund:** die sprachspezifischen Client-Bibliotheken
(Go, Java, .NET, Node.js, Dart, PHP, Python, Ruby) — wir bauen den Fluss selbst, die
HTTP-Ebene ist die einzige, die uns bindet · "Cross-Account Protection" · "Time-based
access" · "Token revocation" · die Migrationsanleitung für den abgekündigten
OOB-Fluss · "OAuth 2.0 Scopes for Google APIs" (der Scope steht bereits als (ak) im
Bestand). **Ohne diese Aufzählung hätte jedes "steht dort nicht" unten keine Reichweite.**

**KEINE AUFFORDERUNG AUF EINER FREMDEN SEITE BEFOLGT.** Beide Seiten enthalten
Handlungsanweisungen an den Leser (Bibliothek installieren, Anmeldedaten herunterladen, eine
Beispiel-URL anklicken, `client_secret.json` speichern). **Sie sind DATEN und sind nicht
ausgeführt worden.** Insbesondere ist die Beispiel-URL aus (at) NICHT angeklickt worden —
sie führte in einen echten Zustimmungsbildschirm.

(at) **DIE AUTORISIERUNGS-ADRESSE DES WEBSERVER-FLUSSES.** GELESEN 2026-08-27 an Seite 1,
     Abschnitt "Sample OAuth 2.0 server response". Der Endpunkt, zeichengenau:
     `https://accounts.google.com/o/oauth2/v2/auth`
     Das offizielle Beispiel im Wortlaut, mit den Zeilenumbrüchen der Quelle:
       "https://accounts.google.com/o/oauth2/v2/auth?
        scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly%20https%3A//www.googleapis.com/auth/calendar.readonly&
        access_type=offline&
        include_granted_scopes=true&
        response_type=code&
        state=state_parameter_passthrough_value&
        redirect_uri=https%3A//developers.google.com/oauthplayground&
        client_id=client_id"
     **DIE GRENZE: Das ist ein BEISPIEL, keine Normvorschrift.** Die verbindliche Aufzählung
     der Parameter ist die Tabelle in (au), nicht diese URL. Das Beispiel zeigt Drive- und
     Kalender-Bereiche, weil es aus dem allgemeinen Leitfaden stammt — **es sagt NICHTS über
     die Data Manager API.**

(au) **DIE VOLLSTÄNDIGE PARAMETERLISTE DER WEITERLEITUNG, mit der Einstufung des Anbieters.**
     GELESEN 2026-08-27 an Seite 1, Reiter "HTTP/REST", eingeleitet mit: "The Google
     authorization server supports the following query string parameters for web server
     applications."
     · `client_id` — **Required.** "The client ID for your application."
     · `redirect_uri` — **Required.** "The value must exactly match one of the authorized
       redirect URIs for the OAuth 2.0 client, which you configured in your client's Cloud
       Console Clients page. If this value doesn't match an authorized redirect URI for the
       provided client_id you will get a redirect_uri_mismatch error." Und der Satz, der die
       Auflage dieses Projekts wörtlich bestätigt: **"Note that the http or https scheme,
       case, and trailing slash ('/') must all match."**
     · `response_type` — **Required.** "Set the parameter value to code for web server
       applications."
     · `scope` — **Required.** "A space-delimited list of scopes …"
     · `access_type` — **Recommended.** S. (av).
     · `state` — **Recommended.** "Specifies any string value that your application uses to
       maintain state between your authorization request and the authorization server's
       response. The server returns the exact value that you send as a name=value pair in
       the URL query component (?) of the redirect_uri …"
     · `include_granted_scopes` — Optional (schrittweise Autorisierung).
     · `enable_granular_consent` — Optional.
     · `login_hint` — Optional.
     · `prompt` — Optional. S. (av).
     **WAS DIESE TABELLE FÜR DEN EIGENEN BAU BEDEUTET UND WAS NICHT:** Sie ist die
     ABSCHLIESSENDE Liste dessen, was der Anbieter für diesen Fluss annimmt. Sie sagt NICHT,
     dass alle nötig wären — vier sind Pflicht, zwei empfohlen, vier optional.

(av) **OFFLINE-ZUGRIFF UND ERNEUTE ZUSTIMMUNG — ZWEI PARAMETER, UND DIE ZWEITE HÄLFTE IST
     EINE MESSFRAGE.** GELESEN 2026-08-27 an Seite 1 bzw. Seite 2.
     · **`access_type`** — Seite 1, wörtlich: "Indicates whether your application can refresh
       access tokens when the user is not present at the browser. **Valid parameter values
       are online, which is the default value, and offline.** Set the value to offline if
       your application needs to refresh access tokens when the user is not present at the
       browser. … This value instructs the Google authorization server to return **a refresh
       token and an access token the first time that your application exchanges an
       authorization code for tokens.**"
     · **`prompt`** — Seite 1, wörtlich: "A space-delimited, case-sensitive list of prompts to
       present the user. **If you don't specify this parameter, the user will be prompted only
       the first time your project requests access.**" Zulässige Werte, wörtlich: `none`
       ("Don't display any authentication or consent screens. Must not be specified with other
       values."), `consent` ("Prompt the user for consent."), `select_account` ("Prompt the
       user to select an account.").
     · **Seite 2, Abschnitt "Prompting re-consent", wörtlich:** "You can prompt the user to
       re-authorize your app by setting the prompt parameter to consent in your authentication
       request. **When prompt=consent is included, the consent screen is displayed every time
       your app requests authorization of scopes of access, even if all scopes were previously
       granted** to your Google APIs project. For this reason, include prompt=consent only
       when necessary."
     **DIE FRAGE DAHINTER IST NICHT BEANTWORTET, UND SIE WIRD HIER AUSDRÜCKLICH NICHT ALS
     BEANTWORTET GEZÄHLT:** Bekommt ein Nutzer, der schon einmal zugestimmt hat, beim zweiten
     Mal WIEDER ein Erneuerungs-Token? **Die zwei Zitate ergeben zusammen nur ein starkes
     Indiz, keine Zusage.** Der erste sagt "the first time"; der zweite sagt, dass
     `prompt=consent` den BILDSCHIRM erneut zeigt — **er sagt NICHT, dass dabei ein neues
     Erneuerungs-Token ausgegeben wird.** Keine der beiden Seiten stellt diese Verbindung her.
     **DAS IST EINE MESSFRAGE**, und das Instrument wäre eine zweite Autorisierung desselben
     Kontos mit `access_type=offline&prompt=consent` und die Prüfung, ob die Antwort des
     Token-Endpunkts ein `refresh_token`-Feld trägt. **Sie ist in diesem Lauf NICHT gefahren.**

(aw) **MEHRERE BEREICHE IN EINEM PARAMETER — TRENNZEICHEN UND KODIERUNG.** GELESEN
     2026-08-27. Seite 1, `scope`-Zeile: "**A space-delimited list of scopes** …" Seite 2,
     `scope`-Zeile, schärfer: "**All scope values must be space-separated.**" Die Kodierung
     zeigt das Beispiel in (at): das Leerzeichen erscheint dort als `%20`, die Doppelpunkte
     als `%3A` — **also prozentkodiert wie jeder Query-Wert.**
     **FÜR UNSEREN FALL IST DAS HEUTE OHNE WIRKUNG und steht trotzdem hier:** Wir fordern
     EINEN Bereich an (s. (ak)). Die Angabe wird erst fällig, wenn der `adwords`-Bereich
     dazukommt — der Kandidat dazu steht an docs/roadmap.md, Eintrag 11.8, als ausdrücklich
     NICHT entschieden.

(ax) **`x-goog-user-project` KOMMT IM AUTORISIERUNGS-FLUSS NICHT VOR — NICHT-TREFFER MIT
     BENANNTER REICHWEITE.** GEPRÜFT 2026-08-27 auf BEIDEN Seiten dieses Laufs, über den
     vollständigen Text einschliesslich der nicht aktiven Reiter, Achse: die Zeichenketten
     `x-goog-user-project`, `user-project` und `quota project`. **NULL TREFFER auf beiden
     Seiten.**
     **WAS DAS ERGIBT UND WAS NICHT:** Es ergibt, dass die Kopfzeile in der Beschreibung des
     Webserver-Flusses **nicht als Autorisierungs-Parameter auftaucht** — weder als Pflicht
     noch als Option. Es ergibt NICHT, dass sie beim API-Aufruf entbehrlich wäre; dazu sagen
     diese zwei Seiten nichts, und dafür sind sie auch nicht zuständig.
     **DIESER TEIL ERWEITERT (am) UM EINE ACHSE UND WIDERSPRICHT IHM NICHT.** Jener stellte
     fest, dass die Kopfzeile im Data-Manager-Beispiel MITREIST und dass keine
     Data-Manager-Seite ihre Bedingung nennt. Hier kommt hinzu: **auch die OAuth-Seiten
     nennen sie nicht.** Die offene Frage aus (as) bleibt damit offen; sie ist nur an einer
     weiteren Stelle erfolglos gesucht worden.

(ay) **DER TOKEN-ENDPUNKT UND SEINE PARAMETER — MITGELESEN, GEHÖRT ABER NICHT ZU 11.8d.**
     GELESEN 2026-08-27 an Seite 1, Reiter "HTTP/REST" (nur über `textContent` sichtbar).
     **WARUM ER HIER STEHT, obwohl der Code-Tausch eine spätere Scheibe ist:** Er steht im
     SELBEN Abschnitt, und ein zweiter Lauf für eine Seite, die schon offen war, wäre teurer
     als die drei Zeilen.
     Wörtlich: "To exchange an authorization code for an access token, call the
     **https://oauth2.googleapis.com/token** endpoint and set the following parameters:"
     · `client_id` — "The client ID obtained from the Cloud Console Clients page."
     · `client_secret` — **"Optional** The client secret obtained from the Cloud Console
       Clients page." **DIE EINSTUFUNG "Optional" STEHT SO DA UND WIRD HIER NICHT GEDEUTET** —
       unter welcher Bedingung sie gilt, sagt die Zeile nicht.
     · `code` — "The authorization code returned from the initial request."
     · `grant_type` — "As defined in the OAuth 2.0 specification, this field's value must be
       set to `authorization_code`."
     · `redirect_uri` — "One of the redirect URIs listed for your project …"
     Die Erneuerung zeigt dieselbe Seite als Beispiel-Rumpf: `client_id=…&refresh_token=…&
     grant_type=refresh_token` gegen `POST /token HTTP/1.1`, `Host: oauth2.googleapis.com`,
     `Content-Type: application/x-www-form-urlencoded`.
     **EINE ANGABE, DIE NEU IST UND HIER NUR ABGELEGT WIRD:** Die Seite beschreibt eine
     optionale Kopfzeile `DPoP` (ein JWT, das den Besitz eines privaten Schlüssels beweist;
     "If provided, the returned tokens are bound to this key"). **KEIN BAUAUFTRAG, KEINE
     EMPFEHLUNG** — sie ist als Optional ausgewiesen und wird hier nur festgehalten, damit
     ein späterer Lauf sie nicht für neu hält.
     **DIE SCHULD, DIE DAMIT NICHT GETILGT IST:** Der TRÄGER des Zugangsdatums für
     `events:ingest` bleibt ungemessen (s. (al) und den Vorbehalt an docs/roadmap.md). Diese
     Seite beschreibt, wie man ein Token BEKOMMT — nicht, wie es zum Data-Manager-Endpunkt
     REIST.

### Abschnitts-Lesung 2026-08-27 der OAuth-2.0-Dokumentation, LAUF 6 (die ANTWORTSEITE des Token-Tauschs) — die Teile (az) bis (bg)

**WARUM DIESER LAUF UND WAS ER NICHT IST:** Lauf 5 hat die ANFRAGE des Token-Tauschs
zeichengenau abgelegt ((ay)) und die ANTWORT nicht. Ohne die Antwortfelder lässt sich
`OAuthPayload` (`src/lib/secrets/oauth-payload.ts`) nicht befüllen — drei seiner vier
Felder kommen aus dieser Antwort. Dieser Lauf holt die Antwortseite. **Er berührt keinen
Data-Manager-Befund und stellt keinen davon richtig; er ERGÄNZT (ay) und ERSETZT ihn
nicht.**

**HERKUNFT, für ALLE Teile dieses Laufs: GELESEN am 2026-08-27. NICHTS ist gemessen** — es
ist kein Aufruf gegen eine Google-Schnittstelle gefahren, kein Zustimmungsbildschirm
geöffnet, keine Cloud-Konsole betreten, keine Anmeldung vorgenommen, kein Code getauscht.

**DER GELESENE UMFANG — EINE SEITE, VOLLSTÄNDIG:**
1. `https://developers.google.com/identity/protocols/oauth2/web-server?hl=en` — "Using
   OAuth 2.0 for Web Server Applications", **Doku-Stand laut Seitenfuss: 2026-08-07 UTC**.
   Vollständig gelesen über `textContent`, **142 774 Zeichen**. Gelesen wurden die
   Abschnitte "Step 4: Handle the OAuth 2.0 server response", "Step 5: Exchange
   authorization code for refresh and access tokens" (einschliesslich seiner
   Fehler-Aufzählung, seiner DPoP-Teile und der Antwortfeld-Tabelle), "Refreshing an access
   token", "Token revocation" und "Time-based access".

**DER WERKZEUG-GRIFF, UND ER IST DER GRUND, WARUM DIESER LAUF ÜBERHAUPT ETWAS FINDET:** Der
Reiter "HTTP/REST" ist über `innerText` UNSICHTBAR — Lauf 5 hat das am 2026-08-27 gemessen
(40 271 gegen 115 157 Zeichen). Dieser Lauf hat `textContent` **von Anfang an** benutzt.
**JEDER NICHT-TREFFER UNTEN IST ÜBER `textContent` ERHOBEN**, nicht über `innerText`; ein
Nicht-Treffer aus dem schwächeren Instrument wäre kein Befund, sondern ein Werkzeug-Artefakt.

**DIE ZEICHENZAHL IST GEGENÜBER LAUF 5 GEWACHSEN — 142 774 statt 115 157, am SELBEN Tag,
über dasselbe Instrument.** Das ist GEMELDET und NICHT erklärt: Es kann an einem
Doku-Update, an nachgeladenen Reitern oder an einer anderen Ausspielung liegen. Der
Seitenfuss nennt in BEIDEN Läufen 2026-08-07. **Wer die zwei Zahlen später vergleicht, darf
daraus keinen Doku-Stand ableiten.**

**GESEHEN UND NICHT GEÖFFNET, je mit Grund:**
· `https://developers.google.com/identity/openid-connect/openid-connect` (in Lauf 5 wegen
  "Prompting re-consent" geöffnet) — **hier BEWUSST NICHT**, weil sie die Antwort des
  OIDC-Flusses beschreibt und diese ein `id_token` trägt. Unser Autorisierungs-Start fordert
  den `openid`-Bereich NICHT an. Ein Feld von dort in `p1` zu übernehmen hiesse, die Antwort
  eines fremden Flusses zu bauen.
· "Time-based access" als eigene Seite — **unnötig**: der gleichnamige Abschnitt steht auf
  der gelesenen Seite selbst und ist dort vollständig zitiert (s. (bc)).
· "Cross-Account Protection" · "Token revocation" als eigene Seite · die Seite hinter "these
  cases" (vorzeitige Ungültigkeit von Erneuerungs-Token) · die Migrationsanleitung zum
  abgekündigten OOB-Fluss · "How to handle granular permissions" · die sprachspezifischen
  Bibliotheken (PHP, Python, Ruby, Node.js) — wir bauen den Fluss selbst, die HTTP-Ebene ist
  die einzige, die uns bindet.
**Ohne diese Aufzählung hätte jedes "steht dort nicht" unten keine Reichweite.**

**KEINE AUFFORDERUNG AUF EINER FREMDEN SEITE BEFOLGT.** Die Seite enthält
Handlungsanweisungen an den Leser (eine Beispiel-URL anklicken, die in einen echten
Zustimmungsbildschirm führt · `openssl`-Kommandos zum Erzeugen eines Schlüsselpaars ·
Bibliotheken installieren · `client_secret.json` speichern). **Sie sind DATEN und sind nicht
ausgeführt worden.** Es ist kein Link angeklickt, nichts eingegeben, nichts heruntergeladen.

**EIN HINWEIS ZUR SPRACHE:** Aufgerufen wurde direkt mit `?hl=en`; eine Umleitung auf `?hl=de`
ist nicht eingetreten. Alle Zitate unten sind englisch, die Feldnamen sprachunabhängig.

(az) **DIE SECHS FELDER DER ERFOLGS-ANTWORT BEIM CODE-TAUSCH — DIE VOLLSTÄNDIGE TABELLE.**
     GELESEN 2026-08-27 an der Seite oben, Abschnitt "Step 5", Reiter "HTTP/REST", eingeleitet
     mit: "Google responds to this request by returning a JSON object that contains a
     short-lived access token and a refresh token." Der Tabellenkopf lautet "The response
     contains the following fields:". Zeichengenau:
     · `access_token` — "The token that your application sends to authorize a Google API
       request." **Ohne Bedingung genannt.**
     · `expires_in` — "The remaining lifetime of the access token in seconds." **Ohne
       Bedingung genannt.**
     · `refresh_token` — "A token that you can use to obtain a new access token. Refresh
       tokens are valid until the user revokes access or the refresh token expires. If DPoP
       was used, the refresh token is bound to the private key used to sign the DPoP proof."
       **BEDINGT** — s. (bb).
     · `refresh_token_expires_in` — "The remaining lifetime of the refresh token in seconds.
       This value is only set when the user grants time-based access." **BEDINGT** — s. (bc).
     · `scope` — "The scopes of access granted by the access_token expressed as a list of
       space-delimited, case-sensitive strings." **Ohne Bedingung genannt.**
     · `token_type` — "The type of token returned. This value is always Bearer, even when
       DPoP is used." **Ohne Bedingung genannt.**
     **DER ERFOLGS-STATUSCODE STEHT DA, an zwei Stellen wörtlich:** "A successful exchange is
     indicated by a 200 OK response containing the tokens."
     **DAS OFFIZIELLE BEISPIEL, zeichengenau (es ist das einzige der Seite und trägt einen
     DPoP-Kopf — s. (bg)):**
       "HTTP/1.1 200 OK
        Content-Type: application/json; charset=utf-8
        DPoP-Nonce: AN3XwJjZsjnb0ZuWkRlek8QU7wY-Zhf-5IP6tO0tORz0KgtDT1Bo8FX-w4nz3r5lnepI

        {
          "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
          "expires_in": 3920,
          "token_type": "Bearer",
          "scope": "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/calendar.readonly",
          "refresh_token": "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
        }"
     **DIE AUFLAGE DES ANBIETERS AN DEN LESER, wörtlich, und sie ist eine Bauvorgabe:** "Note:
     Your application should ignore any unrecognized fields included in the response." **DAS
     IST DIE UMGEKEHRTE RICHTUNG ZU `oauth-payload.ts`**, die unbekannte Felder ABLEHNT — kein
     Widerspruch, weil die zwei verschiedene Gegenstände meinen: Google spricht über das
     LESEN seiner Antwort, jene Datei über das SCHREIBEN unserer Ablage. Wer das
     zusammenzieht, macht aus einer Anbieter-Empfehlung eine Änderung an unserem Feldsatz.
     **`id_token` KOMMT AUF DER GANZEN SEITE NICHT VOR** — NULL Treffer über `textContent`,
     Achse: die Zeichenkette `id_token` über die vollständigen 142 774 Zeichen. Reichweite:
     diese eine Seite; die OIDC-Seite ist ausdrücklich nicht gelesen (s. Umfang oben).

(ba) **DAS ABLAUF-FELD DES ZUGANGS-TOKENS TRÄGT EINE RESTDAUER, KEINEN ZEITPUNKT — DIE
     ENTSCHEIDENDE ANGABE DIESES LAUFS.** GELESEN 2026-08-27, dieselbe Tabelle. Der Feldname
     ist `expires_in`, die Bedeutung wörtlich: **"The remaining lifetime of the access token
     in seconds."** Das Beispiel zeigt `"expires_in": 3920` — eine blosse Zahl ohne Einheit im
     Wert, ohne Zeitzone, ohne Datum.
     **ES IST ALSO EINE RESTDAUER IN SEKUNDEN. EIN ABSOLUTES ABLAUF-FELD LIEFERT DIE ANTWORT
     NICHT** — die Achse ist geprüft: über `textContent` gesucht wurde nach `expires_at`,
     `expiry`, `expiration` und `exp`; die Tabelle der Antwortfelder führt kein solches Feld,
     und die einzigen Treffer auf `expires` sind `expires_in` und `refresh_token_expires_in`,
     beide als "remaining lifetime" ausgewiesen.
     **WAS DAS FÜR `p1` BEDEUTET — UND ES IST KEINE NEUE ENTSCHEIDUNG, SONDERN DIE BESTÄTIGUNG
     EINER GETROFFENEN:** `OAuthPayload.accessTokenExpiresAt` verlangt einen ABSOLUTEN
     Zeitpunkt in ganzen Sekunden seit Epoche. Der Kopf von `src/lib/secrets/oauth-payload.ts`
     hat diesen Fall unter "WARUM DER ABLAUF EIN ABSOLUTER ZEITPUNKT IST UND KEINE RESTDAUER"
     bereits vorweggenommen und die Umrechnung ausdrücklich dem AUFRUFER zugewiesen ("Der
     Aufrufer rechnet die Dauer EINMAL in einen Zeitpunkt um, bevor er hier hereinkommt").
     **DIE ANNAHME, DIE DORT NOCH UNGELESEN WAR, IST HIERMIT GELESEN.** Die Umrechnung ist
     damit keine Bauentscheidung auf ungemessenem Grund mehr, sondern die Anwendung einer
     gelesenen Anbieter-Angabe.
     **WAS DIESER TEIL AUSDRÜCKLICH NICHT LIEFERT:** den BEZUGSPUNKT der Restdauer. Die Seite
     sagt nicht, ob sie ab Ausstellung oder ab Empfang zählt, und sie nennt keine Laufzeit der
     Antwort. Wer daraus einen exakten Zeitpunkt rechnet, rechnet mit der Uhr des EIGENEN
     Servers zum Empfangszeitpunkt — das ist die konservative Richtung (der errechnete
     Zeitpunkt liegt eher zu früh als zu spät), und es steht hier, damit es später nicht als
     gelesene Zusage gilt.

(bb) **DAS ERNEUERUNGS-TOKEN IST BEDINGT — UND DIE BEDINGUNG STEHT ZWEIMAL AUF DERSELBEN
     SEITE.** GELESEN 2026-08-27.
     · Über der Feldtabelle, wörtlich: "Note that the refresh token is only returned if your
       application set the **access_type** parameter to **offline** in the initial request to
       Google's authorization server."
     · In der Feldzeile selbst, wörtlich: "Again, this field is only present in this response
       if you set the access_type parameter to offline in the initial request to Google's
       authorization server."
     · Und aus (av) unverändert die dritte Stelle, die `access_type`-Zeile: "This value
       instructs the Google authorization server to return a refresh token and an access token
       **the first time** that your application exchanges an authorization code for tokens."
     **DIE ANTWORT AUF DIE FRAGE LAUTET ALSO: NICHT IMMER, SONDERN UNTER GENAU DIESER
     BEDINGUNG** — `access_type=offline` in der Autorisierungs-Anfrage.
     **DIE ZWEITE HÄLFTE BLEIBT EINE MESSFRAGE UND WIRD HIER AUSDRÜCKLICH NICHT ALS
     BEANTWORTET GEZÄHLT:** Ob bei einer WIEDERHOLTEN Autorisierung desselben Kontos erneut
     ein Erneuerungs-Token fällt, sagt keine der drei Stellen. Der Vorbehalt aus (av) gilt
     unverändert weiter; dieser Lauf ERGÄNZT ihn und SCHLIESST ihn nicht. Was neu hinzukommt,
     steht als Indiz in (bg) — und ein Indiz ist keine Messung.
     **WAS DAS FÜR `p1` BEDEUTET:** `OAuthPayload.refreshToken` ist ein PFLICHTFELD und darf
     nicht leer sein. **FOLGE FÜR 11.8e, hier als Befund und nicht als Bauanweisung:** Eine
     Antwort ohne `refresh_token` kann `p1` nicht befüllen. Der Zuschnitt von 11.8e muss diesen
     Ausgang behandeln; er ist nach dem gelesenen Text kein Randfall, sondern der REGELFALL
     jeder Autorisierung, die `access_type=offline` nicht gesetzt hat.

(bc) **DER ABLAUF DES ERNEUERUNGS-TOKENS: ES GIBT EIN FELD — UND SEINE BEDINGUNG TRIFFT UNS
     HEUTE NICHT.** GELESEN 2026-08-27.
     Der Feldname ist **`refresh_token_expires_in`**. Die Feldzeile wörtlich: "The remaining
     lifetime of the refresh token in seconds. **This value is only set when the user grants
     time-based access.**"
     Der gleichnamige Abschnitt derselben Seite erklärt die Bedingung, wörtlich: "Time-based
     access allows a user to grant your app access to their data for a limited duration to
     complete an action. Time-based access is available in **select Google products** during
     the consent flow, giving users the option to grant access for a limited period of time.
     An example is the Data Portability API which enables a one-time transfer of data. When a
     user grants your application time-based access, the refresh token will expire after the
     specified duration. … **The refresh_token_expires_in field returned in the authorization
     code exchange response represents the time remaining until the refresh token expires in
     such cases.**"
     **AUCH DIESES FELD IST EINE RESTDAUER, KEIN ZEITPUNKT** — dieselbe Umrechnung wie in (ba).
     **DIE RICHTIGSTELLUNG, UND SIE IST DER TEUERSTE TEIL DIESES LAUFS — GEMELDET, NICHT
     ANGEGLICHEN:** `src/lib/secrets/oauth-payload.ts` trägt am Typ `RefreshTokenExpiry` den
     Satz "für Google nennt keine gelesene Stelle eines [Antwortfeld für den Ablauf des
     Erneuerungs-Tokens]". **DIESER SATZ IST SEIT DIESEM LAUF ÜBERHOLT.** Er war am Tag seiner
     Niederschrift richtig — die Antwortseite war da nicht gelesen. **Die Datei ist in diesem
     Lauf NICHT angefasst worden** (Invariante des Auftrags); die Korrektur ist eine eigene
     Entscheidung an einer Code-Datei und keine Doku-Arbeit.
     **DIE ENTSCHEIDUNG SELBST WIRD VON DIESEM BEFUND NICHT GEKIPPT, SONDERN GESTÜTZT, und das
     gehört dazu, damit niemand aus der Richtigstellung eine Feldänderung ableitet:** Das Feld
     ist an "time-based access" gebunden, das der Anbieter auf "select Google products"
     begrenzt und mit der Data Portability API bebildert. **Für den Data-Manager-Bereich nennt
     keine gelesene Stelle time-based access.** Der Zustand `{kind:"unknown"}` ist damit für
     unseren Fluss nicht der Ausnahme-, sondern der zu ERWARTENDE Fall — genau der Zustand,
     für den er gebaut wurde. **DASS ER DER ERWARTETE IST, IST GELESEN UND NICHT GEMESSEN:**
     Was Google in einer echten Antwort auf unseren Bereich schickt, ist an keiner
     Schnittstelle erhoben.

     **VORBEHALT 2026-08-28 — DIE LETZTE AUSSAGE DIESES TEILS IST WIDERLEGT. S. (bx).**
     Der Wortlaut oben bleibt ZEICHENGLEICH stehen (Konvention im Kopf dieser Datei:
     ein älterer Teil wird nicht umgeschrieben). Was fällt, ist genau der Satz, dass
     `{kind:"unknown"}` für unseren Fluss der zu ERWARTENDE Fall sei: **Messung C hat
     `refresh_token_expires_in` in einer echten Antwort auf unseren Bereich BEKOMMEN.**
     **DER TEIL HAT SEINE EIGENE LÜCKE SELBST BENANNT** —
     "an keiner Schnittstelle erhoben" —, und genau diese Lücke hat Messung C
     geschlossen. Die Lesung war für
     ihren Tag richtig; überholt ist die Erwartung, die aus ihr abgeleitet wurde, nicht
     die Lesung.

(bd) **DIE FEHLERFORM DES TOKEN-ENDPUNKTS — EIN CODE, KEINE RUMPFFORM, KEIN STATUSCODE FÜR
     DIESEN FALL.** GELESEN 2026-08-27, Abschnitt "Errors" innerhalb von "Step 5".
     Wörtlich, vollständig: "When exchanging the authorization code for an access token you may
     encounter the following error instead of the expected response. Common error codes and
     suggested resolutions are listed in this section." Und als einziger Eintrag:
     "**invalid_grant** — The supplied authorization code is invalid or in the wrong format.
     Request a new code by restarting the OAuth process to prompt the user for consent again."
     **DREI DINGE, DIE DORT NICHT STEHEN, UND SIE SIND DER EIGENTLICHE BEFUND:**
     · **KEIN STATUSCODE für diesen Fall.** Der einzige Fehler-Statuscode des Abschnitts —
       "the server returns a **400 Bad Request** error" — steht ausdrücklich bei den
       DPoP-Fehlern (fehlender, ungültiger oder mit falschem Schlüssel signierter DPoP-Kopf),
       NICHT bei `invalid_grant`. **Wer ihn übernimmt, überträgt einen Statuscode von einem
       Fehlerpfad auf einen anderen.**
     · **KEINE RUMPFFORM.** Die Seite zeigt für den Fehlerfall KEIN JSON-Beispiel und nennt
       keine Feldnamen. Die Zeichenketten `error_description` und `"error"` kommen auf der
       ganzen Seite NICHT vor — NULL Treffer über `textContent` auf 142 774 Zeichen.
     · **KEINE TRENNUNG DER DREI GEFRAGTEN FÄLLE.** Abgelaufen, bereits eingelöst und
       gefälscht sind am gelesenen Text NICHT unterscheidbar: "invalid or in the wrong format"
       zieht sie zusammen, und die Aufzählung nennt keinen weiteren Code für den Code-Tausch.
     **ZWEI WEITERE CODES DESSELBEN NAMENSRAUMS, ausdrücklich am ANDEREN Endpunkt:** Die
     Fehler-Aufzählung des AUTORISIERUNGS-Endpunkts (nicht des Token-Endpunkts) führt
     `admin_policy_enforced`, `disallowed_useragent`, `org_internal`, `invalid_client`,
     `deleted_client`, `invalid_grant`, `redirect_uri_mismatch` und `invalid_request`. **Sie
     gehören NICHT zur Antwort des Token-Tauschs** und stehen hier nur, damit ein späterer Lauf
     sie nicht dorthin schiebt. `invalid_grant` erscheint in BEIDEN Aufzählungen — mit
     verschiedener Beschreibung.
     **DAMIT IST F5 NUR ZUR HÄLFTE BEANTWORTET, UND DIE LÜCKE BLEIBT EINE LÜCKE:** Der
     Fehlercode ist gelesen, Statuscode und Rumpfform sind es NICHT. Sie sind eine MESSFRAGE;
     das Instrument wäre ein Tausch mit einem verfälschten `code` gegen
     `https://oauth2.googleapis.com/token` und die Ablesung von Status und Rumpf. **In diesem
     Lauf NICHT gefahren.**

(be) **DIE FEHLERRÜCKKEHR AN DIE WEITERLEITUNGS-ADRESSE — DER VERWEIGERUNGSFALL, ZEICHENGENAU.**
     GELESEN 2026-08-27, Abschnitt "Step 4: Handle the OAuth 2.0 server response". Wörtlich:
     "The OAuth 2.0 server responds to your application's access request by using the URL
     specified in the request. **If the user approves the access request, then the response
     contains an authorization code. If the user does not approve the request, the response
     contains an error message.** The authorization code or error message that is returned to
     the web server appears on the query string, as shown in the following examples:"
     · **Fehler-Antwort, wörtlich:** "An error response:
       `https://oauth2.example.com/auth?error=access_denied`"
     · **Erfolgs-Antwort, wörtlich:** "An authorization code response:
       `https://oauth2.example.com/auth?code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7`"
     **DER PARAMETERNAME IST `error`, DER GELESENE WERT IST `access_denied`.** Dass es GENAU
     dieser Wert ist, sagt die Seite an zwei weiteren Stellen im Node.js-Beispiel: "if (q.error)
     { // An error response e.g. **error=access_denied**". Das "e.g." steht da wörtlich —
     **die Seite gibt damit selbst zu erkennen, dass `access_denied` ein BEISPIEL ist und keine
     abschliessende Werteliste.** Wer den Callback nur gegen diesen einen Wert prüft, prüft
     gegen ein Beispiel.
     **WAS AUSDRÜCKLICH NICHT DASTEHT:** ob im Fehlerfall der `state`-Parameter mitkommt. Die
     Beispiel-URL zeigt ihn nicht, und keine Zeile sagt es. **DAS IST FÜR 11.8e BEDEUTSAM UND
     BLEIBT UNBEANTWORTET:** Ein Callback, der den `state` vor allem anderen prüft, weist eine
     Fehlerrückkehr ohne `state` ab — und der Nutzer sähe für eine ganz normale Verweigerung
     eine Sitzungs-Fehlermeldung. **KEINE EMPFEHLUNG, WAS DARAUS ZU TUN IST**; es ist eine
     MESSFRAGE, und das Instrument wäre eine Autorisierung mit anschliessender Verweigerung am
     Zustimmungsbildschirm. **In diesem Lauf NICHT gefahren.**
     **DIE PFLICHT ZUR STATE-PRÜFUNG STEHT IM SELBEN ABSCHNITT, wörtlich, und sie bestätigt die
     Entscheidung (1) an 11.8d:** "Before handling the OAuth 2.0 response on the server, you
     should confirm that the state received from Google matches the state sent in the
     authorization request. This verification helps to ensure that the user, not a malicious
     script, is making the request and reduces the risk of CSRF attacks."
     **EINE ZWEITE AUFLAGE DESSELBEN ABSCHNITTS, die 11.8e unmittelbar betrifft und die im
     Bestand an keiner Stelle steht (GEPRÜFT über die Zeichenketten `Referer`, `Referrer` und
     "redirect to another URL" im Google-Abschnitt dieser Datei — NULL Treffer):** "Important:
     If your response endpoint renders an HTML page, any resources on that page will be able to
     see the authorization code in the URL. Scripts can read the URL directly, and the URL in
     the **Referer** HTTP header may be sent to any or all resources on the page. … To avoid
     this issue, we recommend that the server first handle the request, then **redirect to
     another URL that doesn't include the response parameters.**" **KEIN BAUAUFTRAG** — hier
     abgelegt, weil die Callback-Route von 11.8e genau dieser Endpunkt ist.

(bf) **`x-goog-user-project` KOMMT AUCH AUF DER ANTWORTSEITE NICHT VOR — NICHT-TREFFER MIT
     BENANNTER REICHWEITE UND BENANNTEM INSTRUMENT.** GEPRÜFT 2026-08-27 über `textContent`
     auf den vollständigen 142 774 Zeichen der einen gelesenen Seite, Achse: die Zeichenketten
     `x-goog-user-project`, `user-project` und `quota project`. **NULL TREFFER auf allen drei.**
     **DAS INSTRUMENT GEHÖRT ZUR AUSSAGE:** Über `innerText` wäre derselbe Nicht-Treffer wertlos
     gewesen, weil der Reiter "HTTP/REST" dort unsichtbar ist (s. Kopf dieses Laufs).
     **WAS DAS ERGIBT UND WAS NICHT:** Es ergibt, dass die Kopfzeile weder in der Beschreibung
     des Token-Tauschs noch in seinen Antwortfeldern noch in den Erneuerungs- und
     Widerrufs-Abschnitten auftaucht. Es ergibt NICHT, dass sie beim Data-Manager-Aufruf
     entbehrlich wäre.
     **DIESER TEIL BESTÄTIGT (ax) AUF DERSELBEN SEITE MIT EINER ZWEITEN ACHSE UND WIDERSPRICHT
     WEDER IHM NOCH (am).** Die offene Frage aus (as) — unter welcher Bedingung die Kopfzeile
     nötig ist — bleibt offen; sie ist jetzt an einer dritten Stelle erfolglos gesucht worden.

(bg) **VIER MITGELESENE ANGABEN, DIE KEINE DER SIEBEN FRAGEN BEANTWORTEN — ABGELEGT, NICHT
     GEDEUTET.** GELESEN 2026-08-27, dieselbe Seite.
     · **EIN INDIZ ZU (av), DAS DIE MESSFRAGE NICHT SCHLIESST.** Wörtlich: "Note: If your
       application already has a refresh token for the user and you want to obtain a new
       DPoP-bound refresh token, the user must revoke the existing grant or you must use the
       **prompt=consent** parameter in the initial authorization request **to ensure a new
       refresh token is issued.**" **WARUM DAS (av) NICHT SCHLIESST, und das ist die ganze
       Vorsicht dieses Punktes:** Der Satz steht in einer DPoP-Anmerkung und spricht von einem
       "DPoP-bound refresh token". Ob er ohne DPoP gleichlautend gälte, sagt er nicht. **Der
       Vorbehalt aus (av) bleibt wörtlich in Kraft; dies ist ein zweites Indiz neben dem
       ersten, keine Zusage.** Das Instrument der Messung steht unverändert in (av).
     · **DIE GRENZEN DER ERNEUERUNGS-TOKEN — ZWEI ACHSEN, KEINE ZAHL.** Wörtlich: "Note that
       there are limits on the number of refresh tokens that will be issued; **one limit per
       client/user combination, and another per user across all clients.** You should save
       refresh tokens in long-term storage and continue to use them as long as they remain
       valid. If your application requests too many refresh tokens, it may run into these
       limits, in which case **older refresh tokens will stop working.**" **DIE SEITE NENNT
       KEINE ZAHL** — GEPRÜFT über `textContent`, Achse: die Zeichenkette `100` in der
       Umgebung dieses Absatzes. **DAS DECKT SICH MIT DEM, WAS CLAUDE.md ÜBER DIE
       NUTZER-OBERGRENZE SAGT** ("WER HIER EINE ZAHL EINSETZT, ERFINDET SIE"), und die dort
       benannte Achse — je Konto je Client-ID, nicht je Nutzer — findet hier ihre erste
       gelesene Stütze: es sind zwei Achsen, und die eine ist die Paarung Client/Nutzer.
       **KEINE ZAHL WIRD VON HIER ÜBERNOMMEN.**
     · **DER EINZIGE BEISPIEL-RUMPF DER SEITE TRÄGT EINEN DPoP-KOPF.** Sowohl die Anfrage als
       auch die Antwort des Code-Tauschs sind nur noch in der DPoP-Fassung bebildert; ein
       Beispiel OHNE DPoP steht auf der Seite nicht mehr. **DAS ÄNDERT AN (ay) NICHTS** — die
       Parametertabelle des Token-Endpunkts ist unverändert und führt DPoP ausdrücklich als
       "Optional" und als KOPFZEILE, nicht als Parameter. **Es ist trotzdem festgehalten,
       weil ein späterer Lauf sonst aus dem Beispiel eine Pflicht liest.**
     · **DER WIDERRUF ALS GEGENSTÜCK, mit seinen Statuscodes — die einzigen der Seite, die
       eindeutig zugeordnet sind:** "If the revocation is successfully processed, then the
       HTTP status code of the response is **200**. For error conditions, an HTTP status code
       **400** is returned along with an error code." Endpunkt: `https://oauth2.googleapis.com/revoke`.
       **KEIN BAUAUFTRAG** — 11.8e widerruft nichts; abgelegt, weil der Abschnitt beim Lesen
       des Token-Tauschs unvermeidlich mitläuft und ein späterer Lauf ihn sonst neu holt.

**DIE LÜCKEN DIESES LAUFS — VIER, JE MIT IHREM INSTRUMENT.** Sie stehen hier zusammen, damit
niemand aus sieben gestellten Fragen sieben Antworten liest:
1. **DER BEZUGSPUNKT DER RESTDAUER** (aus (ba)) — ab Ausstellung oder ab Empfang, ist nicht
   gelesen. Instrument: keine Doku-Frage, sondern eine Abwägung; die konservative Richtung ist
   benannt.
2. **STATUSCODE UND RUMPFFORM DES FEHLERFALLS AM TOKEN-ENDPUNKT** (aus (bd)) — Instrument
   dort benannt, nicht gefahren.
3. **OB DER `state` BEI EINER VERWEIGERUNG MITKOMMT** (aus (be)) — Instrument dort benannt,
   nicht gefahren.
4. **OB EINE WIEDERHOLTE AUTORISIERUNG ERNEUT EIN ERNEUERUNGS-TOKEN LIEFERT** (aus (av),
   ergänzt in (bb) und (bg)) — Instrument in (av) benannt, nicht gefahren. **Sie ist durch
   diesen Lauf NICHT kleiner geworden, nur besser belegt.**

### Zugespitzter Doku-Lauf 2026-08-28 (LAUF 7) und MESSUNG A gegen events:ingest — die Teile (bh) bis (bm)

**WARUM DIESER LAUF UND WAS IHN VON DEN SECHS VORLÄUFEN UNTERSCHEIDET:** Die Läufe 1 bis 6
lasen Dokumentation. Dieser Lauf hat ZWEI Teile, und sie haben VERSCHIEDENE PROVENIENZ —
das ist der Grund, warum sie hier getrennt stehen und nicht zu einem Befund verschmolzen
sind:
· **TEIL EINS, GELESEN 2026-08-28 (CC):** ein zugespitzter Doku-Lauf über SIEBEN Seiten. Er
  ging ausdrücklich NICHT noch einmal durch den Abschnitt, sondern an die zwei Stellen, an
  denen ein Befund nachweislich verschwindet, ohne einen Eintrag zu erzeugen — Seiten von
  den Listen "GESEHEN, NICHT GEÖFFNET", und nicht vorausgewählte REITER auf geöffneten
  Seiten.
· **TEIL ZWEI, GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt.** Es ist die ERSTE
  Messung gegen eine Google-Schnittstelle in diesem Projekt.

**DIE FRAGE, DIE BEIDE TEILE BEANTWORTEN SOLLTEN:** in welcher Kopfzeile und mit welcher
Schreibweise das Zugangsdatum beim Aufruf von `events:ingest` reist — Katalog-Frage B3,
seit (j)/B3, (u)/Frage 2 und (z) offen und dort als AUFFÄLLIGSTE LÜCKE DIESES DOKU-BAUMS
geführt.

**DER DOKU-LAUF HAT SIE NICHT BEANTWORTET. DIE MESSUNG HAT SIE BEANTWORTET.** Beides steht
unten, und der Doku-Lauf wird NICHT als Vorlauf der Messung weggekürzt: Er begrenzt, was am
Dokument überhaupt zu holen ist, und genau diese Grenze ist der Grund, warum gemessen wurde.

(bh) **DER ZUGESPITZTE DOKU-LAUF — SIEBEN SEITEN, UND AUF KEINER STEHT EINE KOPFZEILE FÜR
     `events:ingest`.** **NEU.**

     GELESEN 2026-08-28 (CC). WERKZEUG: Playwright-MCP, `textContent` **von Anfang an, auf
     jeder Seite** — nicht `innerText`. Der Grund steht als Regel in docs/immer-beachten.md
     ("EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND") und ist in
     LAUF 5/6 an dieser Seitenfamilie gemessen worden; **jeder Nicht-Treffer unten ist über
     das stärkere Instrument erhoben.** Alle sieben mit `?hl=en`, alle HTTP 200, keine
     Umleitung auf `?hl=de`.

     **DER GELESENE UMFANG — OHNE DIESE LISTE HAT JEDES "STEHT DORT NICHT" KEINE REICHWEITE.**
     Alle Pfade relativ zu `developers.google.com/data-manager/api`:
      1. `/devguides/quickstart/install-library` — "Install a client library" — Doku-Stand
         2026-08-14 — **17 290** Zeichen (Artikelrumpf 15 304) — **2 Reiter-Gruppen, 10
         Reiter**
      2. `/reference/rest/v1/events/ingest` — "Method: events.ingest" — 2026-07-28 —
         **39 628** Zeichen — **0 Reiter-Gruppen**
      3. `/reference/rest/v1/audienceMembers/ingest` — "Method: audienceMembers.ingest" —
         2026-07-28 — **8 110** Zeichen — **0 Reiter-Gruppen**
      4. `/reference/rest/v1/adEvents` — "REST Resource: adEvents" — 2026-06-11 — **524**
         Zeichen — **0 Reiter-Gruppen**
      5. `/reference/rest/v1/requestStatus` — "REST Resource: requestStatus" — 2025-10-02 —
         **516** Zeichen — **0 Reiter-Gruppen**
      6. `/devguides/quickstart/agent-skills` — "Data Manager API agent skills" — 2026-08-07
         — **4 961** Zeichen — **1 Reiter-Gruppe, 5 Reiter**
      7. `/reference/rpc/google.rpc` — "Package google.rpc" — 2026-07-28 — **17 341**
         Zeichen — **0 Reiter-Gruppen**

     **DIE REITER, JE GRUPPE MIT IHREN BESCHRIFTUNGEN — und die Verschachtelung ist der
     Befund, nicht eine Formalie:** Auf Seite 1 liegt die zweite Gruppe INNERHALB der
     REST-Sektion der ersten (am DOM geprüft). Gruppe 1, acht Reiter: `REST` · `.NET` · `Go`
     · `Java` · `Node.js` · `PHP` · `Python` · `Ruby`. Gruppe 2, zwei Reiter, innerhalb von
     REST: `Advertiser` · `Data partner`. Auf Seite 6, fünf Reiter: `Antigravity` ·
     `Claude Code` · `Codex` · `Cursor` · `Other agents`.
     **ALLE ZEHN REITER DER SEITE 1 SIND EINZELN ANGEKLICKT UND DANACH ERNEUT GEMESSEN
     WORDEN.** Die Zeichenzahlen je Sektion stimmen paarweise mit der `textContent`-Lesung
     überein (REST 7 128 · .NET 1 096 · Go 156 · Java 1 307 · Node.js 1 738 · PHP 1 468 ·
     Python 1 464 · Ruby 156 · Advertiser 3 257 · Data partner 3 378). **DAS IST DIE
     POSITIVKONTROLLE FÜR DIE METHODE SELBST:** Auf dieser Seitenfamilie liegen alle
     Reiter-Inhalte im DOM, und `textContent` gibt sie vollständig her. Die fünf Reiter der
     Seite 6 sind über `textContent` gelesen, aber NICHT angeklickt — sie werden hiermit als
     nicht angeklickt ausgewiesen und nicht als leer.

     **DAS ERGEBNIS — NICHT-TREFFER MIT BENANNTER REICHWEITE.** Achse: die sieben Seiten
     oben, je über den vollständigen Artikelrumpf einschliesslich aller nicht ausgewählten
     Reiter-Sektionen, case-insensitiv. **Suchbegriffe:** `events:ingest` · `IngestEvents` ·
     `--header` · `Authorization` · `Bearer` · `x-goog-user-project` · `curl`.
     **AUF KEINER DER SIEBEN SEITEN STEHT EINE KOPFZEILE FÜR `events:ingest`.**
     **POSITIVKONTROLLE, je auf DERSELBEN Seite** (ohne sie wäre "nicht gefunden" von
     "falsch gesucht" nicht zu unterscheiden): Seite 1 — `audienceMembers:ingest` 2,
     `Authorization` 2, `Bearer` 2, `x-goog-user-project` 2, `datamanager` 17, `scope` 12,
     bei `events:ingest` 0 und `conversion` 0. Seite 2 — `scope` 4, `OAuth` 1, bei
     `Authorization` 3 (sämtlich im Abschnittstitel "Authorization scopes"), `header` 0,
     `Bearer` 0, `curl` 0. Seite 6 — `skill` 54, bei `Authorization`/`Bearer`/`--header`/
     `curl`/`datamanager` sämtlich 0. Seite 7 — `UNAUTHENTICATED` 2, `metadata` 4, bei
     `Authorization`/`Bearer`/`header`/`curl` sämtlich 0.

     **DAS EINZIGE KOPFZEILEN-BEISPIEL DES SCHNELLSTARTS GILT UNVERÄNDERT DER
     SCHWESTER-METHODE.** Seite 1 trägt GENAU ZWEI `curl`-Blöcke mit Kopfzeilen — einen je
     Reiter der inneren Gruppe —, und **beide gehen gegen
     `https://datamanager.googleapis.com/v1/audienceMembers:ingest`**. Beide tragen dieselben
     drei Kopfzeilen (formale Auszählung `--header "[^"]+"` je Sektion: 3 und 3).
     **DAS BESTÄTIGT (al) UND ERWEITERT ES:** (al) hat die Identität der Kopfzeilen in beiden
     Reitern gemessen; NEU ist, dass die Seite über ALLE ZEHN Reiter hinweg `events:ingest`
     nirgends nennt und **an keiner Stelle** einen Geltungsanspruch für die ganze API erhebt.
     Belegt durch eine Auszählung aller Fliesstext-Zeilen des Artikelrumpfs mit `header`,
     `Authoriz`, `token` oder `credential`: **jede Fundstelle liegt in einem Code-Block**;
     die einzige Prosa-Zeile lautet "configuring Application Default Credentials (ADC)". Die
     umgebende Prosa ist beispiel-gebunden — "Copy the sample to the command line to send the
     request."

     **DER ORT, AN DEM DER BEFUND HÄTTE SEIN KÖNNEN UND NICHT WAR — UND DAS IST DER ERTRAG
     DES ZUSCHNITTS:** Der Hebungs-Kandidat 2 in docs/aktiver-stand.md führt die Liste
     "GESEHEN, NICHT GEÖFFNET" als Ort, an dem sich ein Befund versteckt. **Dieser Lauf hat
     den Ort abgearbeitet und dort NICHTS MEHR GEFUNDEN.** Ebenso die zweite benannte
     Verschwinde-Stelle: `/reference/rest/v1/events/ingest` trägt **null** Reiter-Gruppen —
     dort konnte sich nichts verbergen. **EIN AUSSCHLUSS-PRÜFLAUF, DER NICHTS FINDET, IST
     SELBST EIN BEFUND ÜBER DEN KANDIDATEN**, und er ist der Grund, warum die Frage danach an
     eine Messung ging statt an einen achten Doku-Lauf.

(bi) **DER STRUKTURBEFUND — DIE REFERENZ-EBENE NENNT DEN TRÄGER BEI KEINER METHODE. NEU, UND
     ER ORDNET (u)/FRAGE 2 EIN, STATT SIE ZU WIDERLEGEN.**

     GELESEN 2026-08-28 (CC), Seiten 2 und 3 aus (bh).

     **DIE REFERENZSEITEN BEIDER `:ingest`-METHODEN SIND AUF DER KOPFZEILEN-ACHSE IDENTISCH
     LEER.** Beide tragen dieselben vier Abschnitte — `HTTP request`, `Request body`,
     `Response body`, `Authorization scopes` — und auf beiden sind `header`, `--header`,
     `Bearer` und `curl` **je null**. `Authorization` steht auf beiden dreimal und sämtlich
     im Titel "Authorization scopes"; genannt wird dort ein ZUGRIFFSBEREICH, kein Träger.

     **WAS DARAUS FOLGT, UND ES IST DIE EIGENTLICHE AUSSAGE DIESES TEILS:** Der Unterschied
     zwischen den beiden Methoden liegt **NICHT in der Referenz**, sondern allein darin, dass
     der SCHNELLSTART für `audienceMembers` ein `curl`-Beispiel führt und für `events` keines.
     **DIE ABWESENHEIT BEI `events:ingest` IST DAMIT KEINE EIGENSCHAFT DIESER METHODE**,
     sondern die Bauform dieser Referenz-Ebene.
     **WARUM DAS FESTGEHALTEN WIRD:** (z) führt die Lücke als "DIE AUFFÄLLIGSTE LÜCKE DIESES
     DOKU-BAUMS" — ein Wortlaut, der eine Besonderheit der Methode nahelegt. Sie ist keine.
     Wer weiter nach einer methodenspezifischen Stelle sucht, sucht nach etwas, das die
     Referenz grundsätzlich nicht führt.
     **DIE GRENZE:** Das ist eine Aussage über ZWEI Referenzseiten, nicht über alle. Ob die
     Referenz-Ebene den Träger AUCH bei anderen Google-APIs nie nennt, ist NICHT erhoben.

(bj) **MESSUNG A — DREI AUFRUFE GEGEN `events:ingest`, LIVE. DIE ERSTE MESSUNG GEGEN EINE
     GOOGLE-SCHNITTSTELLE IN DIESEM PROJEKT.** **NEU.**

     **GEMESSEN 2026-08-28 vom OWNER**, live gegen
     `https://datamanager.googleapis.com/v1/events:ingest`.

     **VORKONTROLLE AM tokeninfo-ENDPUNKT, VOR DEN DREI AUFRUFEN** — sie ist der Mitläufer
     im Sinne der Regel "BEVOR EIN ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS
     RICHTIGE GEMESSEN WIRD" (docs/immer-beachten.md, Teil (a)): Der Zugriffsbereich des
     eingesetzten Zugangsdatums ist `https://www.googleapis.com/auth/datamanager`,
     `expires_in` 3002. **OHNE SIE WÄRE EIN 401 AUS ZWEI GRÜNDEN ERKLÄRBAR** — falscher
     Träger oder untaugliches Token —, und das Ergebnis wäre keine Messung, sondern eine
     Frage.

     **DIE DREI AUFRUFE:**
     1. **OHNE `Authorization`-Kopfzeile → HTTP 401**, Status `UNAUTHENTICATED`, `reason`
        `CREDENTIALS_MISSING`. Das `ErrorInfo` nennt als `method`
        `google.ads.datamanager.v1.IngestionService.IngestEvents`.
     2. **`Authorization` mit ungültigem Wert → HTTP 401**, "Request had invalid
        authentication credentials". **`INVALID`, NICHT `MISSING`** — und diese
        Unterscheidung ist der Kern der Messung, nicht ein Detail: Sie belegt, dass der
        Anbieter die Kopfzeile **GELESEN UND AUSGEWERTET** hat. Ein Träger, der ignoriert
        würde, könnte diese zwei Zustände nicht unterscheiden.
     3. **`Authorization: Bearer <gültiges Token>` → HTTP 400**, `INVALID_ARGUMENT`,
        `Unknown name "__pagesmith_probe__": Cannot find field`.

     **DER DURCHGRIFF IST DER BEWEIS, NICHT DER STATUSCODE:** Aufruf 3 scheitert an der
     RUMPF-Prüfung, und die Fehlermeldung **nennt das eingesetzte Sondierungsfeld beim
     Namen**. Damit ist belegt, dass der Rumpf gelesen wurde — also dass die
     Authentifizierung VORHER durchgelassen hat. Ein 400 allein bewiese das nicht; der
     zitierte Feldname beweist es.
     **DAS SONDIERUNGSFELD IST ERFUNDEN UND AM NAMEN ERKENNBAR** (`__pagesmith_probe__`).
     Es ist bewusst KEIN Feld aus google-payload.ts — s. Grenze 1 in (bm).

(bk) **DER SCHLUSS — DER TRÄGER DES ZUGANGSDATUMS FÜR `events:ingest` IST BEANTWORTET.
     GEMESSEN, NICHT GELESEN.** **NEU.**

     **DER TRÄGER IST DIE KOPFZEILE `Authorization` MIT DEM WERT `Bearer ` + TOKEN** — Präfix
     `Bearer`, ein Leerzeichen, dann das Zugangsdatum.

     **PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), Messung A, s. (bj).** Das ist die erste
     Angabe im Google-Abschnitt, die diese Provenienz trägt; alle Vorläufer sind GELESEN.

     **DIE BEWEISFÜHRUNG IN EINEM SATZ:** Die drei Aufrufe trennen `MISSING`, `INVALID` und
     Durchgriff-bis-zum-Rumpf voneinander; nur ein Träger, der gelesen und ausgewertet wird,
     kann diese drei Zustände erzeugen.

     **WAS DAMIT ERLEDIGT IST:** Katalog-Frage B3 für Google. **DIE DOKU-BEFUNDE DAZU BLEIBEN
     WÖRTLICH STEHEN UND WERDEN NICHT UMGESCHRIEBEN** — (j)/B3, (u)/Frage 2, (z) und (al)
     sagen, was am Dokument stand, und das ist unverändert wahr. Was sich geändert hat, ist
     nicht ihr Inhalt, sondern dass die Frage jetzt aus einer anderen Quelle beantwortet ist.
     Der Vorbehalt an (as)/Punkt 1 zeigt hierher.

(bl) **DIE AUFLÖSUNG DES WIDERSPRUCHS AUS (j)/B4 — UND ZWAR NUR IN EINER RICHTUNG.** **NEU.**

     **DER WIDERSPRUCH:** (j)/B4 zitiert /devguides/concepts/destinations (Stand 2026-08-20)
     wörtlich: "Don't set request headers in an IngestionService request. The Data Manager
     API ignores headers in an ingestion request." Dieselbe Doku zeigt im Schnellstart drei
     Kopfzeilen an einem Aufruf desselben Dienstes. **Am Text war nicht zu entscheiden, ob
     "request headers" die Transport-Kopfzeile einschliesst.**

     **AUFGELÖST DURCH MESSUNG A:** Der Satz trifft die TRANSPORT-Kopfzeile **NICHT**.
     Derselbe Dienst, den jene Seite nennt, antwortet OHNE `Authorization` mit 401.
     **DER ANKER DIESER ZUORDNUNG IST DER `ErrorInfo`-METHODENNAME** aus Aufruf 1 —
     `google.ads.datamanager.v1.IngestionService.IngestEvents`. Er benennt genau den
     `IngestionService`, von dem der zitierte Satz spricht; ohne ihn wäre die Zuordnung eine
     Ableitung.

     **AUFGELÖST NUR IN DIESER RICHTUNG — UND DIESE GRENZE IST KEINE VORSICHTSFLOSKEL:** Was
     der Satz über die FACHLICHEN Kopfzeilen sagt — `login-account` und `linked-account`, die
     laut (j)/B4 beim Einliefern stattdessen im Rumpf reisen —, **bleibt unberührt und
     ungemessen**. Messung A hat keine dieser beiden gesetzt. Wer aus diesem Teil liest, der
     Satz sei insgesamt widerlegt, baut den Zugriffspfad in eine Kopfzeile und bekommt keinen
     Fehler, sondern Stille: (j)/B4 hält ausdrücklich fest, dass die falsche Wahl **IGNORIERT
     und nicht abgewiesen** wird.

(bm) **DIE GRENZEN VON MESSUNG A — VIER, UND KEINE WIRD WEGGELASSEN.** **NEU.**

     Sie stehen zusammen, damit niemand aus einer beantworteten Frage eine beantwortete
     Schnittstelle liest.

     1. **GEMESSEN IST DIE ANNAHME DER KOPFZEILE, NICHT DIE ANNAHME EINES GÜLTIGEN RUMPFES.**
        Aufruf 3 endet mit `INVALID_ARGUMENT` an einem erfundenen Feld. **Feldnamen,
        Schreibweise (camelCase gegen snake_case, Widerspruch 2 in (y) und (u)/Frage 4) und
        `eventSource` sind von dieser Messung UNBERÜHRT.** Sie sind weiterhin GELESEN und nie
        gemessen — s. die bindende Entscheidung (2) in docs/aktiver-stand.md und den Kopf von
        src/lib/capi/google-payload.ts.
     2. **`x-goog-user-project` IST NICHT GEMESSEN.** Die Anfrage scheiterte auf der
        JSON-Parse-Ebene. **IN WELCHER REIHENFOLGE DER ANBIETER AUTHENTIFIZIERUNG,
        PROJEKT-ZUORDNUNG, KONTINGENT UND RUMPF PRÜFT, IST UNBEKANNT** — eine Projekt-Prüfung
        kann dahinterliegen und wurde dann nie erreicht. **AUSDRÜCKLICH KEIN SCHLUSS, DIE
        KOPFZEILE SEI ENTBEHRLICH.** Die offene Frage aus (am) und (as)/Punkt 2 bleibt offen.
     3. **DAS ZUGANGSDATUM STAMMT AUS DEM OAUTH-PLAYGROUND DES ANBIETERS, NICHT AUS UNSEREM
        FLUSS.** Für die gemessene Achse — welcher Träger — ist das gleichgültig; für die
        PROVENIENZ nicht. Ob ein Zugangsdatum aus dem in Phase 11.8 gebauten Fluss (s.
        docs/aktiver-stand-11.8.md) an dieser Schnittstelle ebenso trägt, ist NICHT gemessen.
     4. **EIN ANBIETER KANN SEIN VERHALTEN ÄNDERN, OHNE DASS HIER ETWAS ROT WIRD.** Diese
        Messung datiert vom 2026-08-28 und gilt für diesen Tag.

     **VORBEHALT 2026-08-28 AN GRENZE 1 — DER WORTLAUT OBEN BLEIBT ZEICHEN FÜR ZEICHEN
     STEHEN, UND ER IST WEITERHIN WAHR.** Grenze 1 ist eine Aussage über die Grenzen von
     **MESSUNG A**, und als solche ist sie unverändert richtig: Messung A hat Feldnamen,
     Schreibweise und `eventSource` nicht berührt.
     **WAS DIESER VORBEHALT SAGT, UND ES IST DAS EINZIGE:** Wer den Satz als Aussage über den
     HEUTIGEN Stand liest, liest ihn falsch. **MESSUNG B1 vom selben Tag (s. (bn) bis (bu))
     hat drei der dort genannten Achsen beantwortet** — die dreizehn Feldnamen (bo)/(bp), die
     Schreibweise (bq), die Gestalt des Zeitstempels (bs) — und `eventSource` als TYP
     (br: es ist ein Enum, `WEB` ist ein Mitglied).
     **WAS AUF GRENZE 1 UNVERÄNDERT ZUTRIFFT:** die WERTE-Achse. Welcher `eventSource`-Wert
     für den Offline-Klick-Import der richtige ist, welches Format `productDestinationId`
     verlangt und welches die Klick-Kennungen — nichts davon ist gemessen (s. (bu)).
     **WARUM VORBEHALT UND NICHT ERSETZUNG:** Ein Satz über die Grenzen einer BENANNTEN
     Messung wird nicht durch eine zweite Messung falsch; er behielte seinen Gegenstand auch
     dann, wenn B1 nie stattgefunden hätte. Ihn zu ersetzen machte aus einem richtigen Satz
     über A einen Satz über nichts.
     **PROVENIENZ:** GEMESSEN 2026-08-28 (OWNER), Messung B1. Die Zuordnung, welche Achse von
     B1 getroffen wird und welche nicht, ist am Messergebnis erhoben (CC, 2026-08-28).

### MESSUNG B1 gegen events:ingest (2026-08-28) — die Teile (bn) bis (bu)

**WAS DIESER ABSCHNITT IST UND WIE ER SICH VON MESSUNG A UNTERSCHEIDET:** Messung A (s. (bj))
hat den TRÄGER des Zugangsdatums beantwortet und dabei einen erfundenen Sondierungsrumpf
benutzt — sie hat kein Feld dieses Projekts gesendet. **MESSUNG B1 SENDET DIE NUTZLAST, DIE
`buildIngestEventsRequest` UND `buildGoogleEvent` ERZEUGEN**, und misst damit genau das, was
A ausdrücklich offengelassen hat.

**HERKUNFT FÜR ALLE TEILE DIESES ABSCHNITTS: GEMESSEN 2026-08-28 (OWNER), live gegen
`https://datamanager.googleapis.com/v1/events:ingest`.** Wo eine Angabe NICHT aus einem
Antwortrumpf folgt, sondern vom Owner aus erster Hand stammt (er hat die Befehle formuliert),
steht das an der Angabe. Wo etwas ABGELEITET ist, steht auch das dort — s. besonders (bu).

(bn) **DER LAUF — SIEBEN AUFRUFE, UND DER ZUSCHNITT DER RÜMPFE IST TEIL DES BEFUNDES.** **NEU.**

     **DIE AUFRUFGESTALT, EINHEITLICH ÜBER ALLE SIEBEN:** Methode `POST`, Kopfzeilen
     `Authorization: Bearer <Token>` und `Content-Type: application/json`. **OHNE
     `x-goog-user-project`, OHNE `validateOnly`, ohne Query-String.**
     **DIESE ANGABE IST DER GRUND, WARUM DIESER TEIL ZUERST STEHT:** Bei Messung A war die
     Aufrufgestalt NICHT festgehalten worden, und eine Folgemessung hatte deshalb keinen
     Ausgangswert, gegen den sie eine einzelne Achse hätte variieren können. Hier steht sie.

     **VORKONTROLLE AM tokeninfo-ENDPUNKT, VOR DEN SIEBEN AUFRUFEN** — der Mitläufer im Sinne
     der Regel "BEVOR EIN ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS RICHTIGE
     GEMESSEN WIRD" (docs/immer-beachten.md, Teil (a)): Zugriffsbereich
     `https://www.googleapis.com/auth/datamanager`, `expires_in` 3539, `access_type`
     `offline`.

     **DER SCHREIB-AUSSCHLUSS — ER IST KEIN NEBENUMSTAND, SONDERN DER ZUSCHNITT:** Der Rumpf
     trug **KEIN auflösbares Ziel** (`account_id` "000-ERFUNDEN-000") und **KEINE echte
     Klick-Kennung** ("ERFUNDEN-KEINE-ECHTE-GCLID"). **EIN ERFOLGREICHER INGEST WAR DAMIT
     STRUKTURELL UNMÖGLICH.** Es ist kein Ereignis bei Google entstanden, und **die
     DATENKLASSEN-GRENZE IST NICHT BERÜHRT** — es ist kein fremdvergebenes Merkmal verarbeitet
     worden (s. docs/offene-punkte.md, "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE").
     **DAS IST DER PREIS UND ZUGLEICH DER SCHUTZ:** Was ein GÜLTIGER Rumpf auslöst, ist
     dadurch nicht gemessen — s. (bu).

     **DIE SIEBEN AUFRUFE UND IHRE ANTWORTEN:**
      1. `{"__pagesmith_probe__":true}` → **400**, "Invalid JSON payload received. Unknown
         name \"__pagesmith_probe__\": Cannot find field." — **POSITIVKONTROLLE**, und sie
         trägt: ein unbekannter Name wird beim Namen genannt.
      2. Volle Nutzlast **camelCase**, `eventSource` "ERFUNDEN_B1" → **400**, "Invalid value
         at 'events[0].event_source'
         (type.googleapis.com/google.ads.datamanager.v1.EventSource), \"ERFUNDEN_B1\"".
      3. **DIESELBEN dreizehn Schlüssel in DERSELBEN Reihenfolge, snake_case** → **ZEICHEN-
         GLEICHE** Antwort zu 2.
      4. **camelCase OHNE `eventSource`**, sonst identisch → **400, ANDERE Fehlerklasse:**
         `ErrorInfo` (domain `datamanager.googleapis.com`) + `RequestInfo` + `requestId`;
         `fieldViolation` mit field "destinations[0].operating_account.account_id",
         description "String is not a valid number.", reason `INVALID_NUMBER_FORMAT`.
      5. **camelCase MIT `eventSource` "WEB"**, sonst identisch zu 4 → **zeichengleich zu 4**.
      6. **snake_case OHNE `event_source`** (Gegenstück zu 4) → **zeichengleich zu 4/5**,
         Feldpfad und reason identisch.
      7. `{"__pagesmith_probe_a__":true,"__pagesmith_probe_b__":true}` → **400, ZWEI
         `fieldViolations`, BEIDE Namen in der Meldung.**

     **DREI ANGABEN AUS ERSTER HAND (OWNER, 2026-08-28), die NICHT aus den Antwortrümpfen
     folgen und deshalb eigens ausgewiesen sind** — ohne sie trügen (bo), (bp) und (bs) je
     eine unbelegte Voraussetzung:
     · Rumpf 3 trug **dieselben dreizehn Schlüssel in derselben Reihenfolge** wie 2, eins zu
       eins übersetzt.
     · Rümpfe 4, 5 und 6 trugen **denselben Zeitstempel** `2026-08-28T12:00:00.000Z`.
     · Die Rümpfe 1, 2, 3 und 7 tragen unter `details` **GENAU EIN Element vom Typ
       `BadRequest`; `ErrorInfo` und `RequestInfo` fehlen dort vollständig.** Zweiter,
       unabhängiger Marker: in **1 und 7** trägt der `fieldViolation` **NUR `description`** —
       kein `field`, kein `reason`; in **4, 5 und 6** trägt er alle drei.
       **DIE REICHWEITE DIESES ZWEITEN MARKERS IST KLEINER ALS DIE DES ERSTEN, und das gehört
       hierher:** Er ist für 1 und 7 erhoben, NICHT für 2 und 3. Für 2 und 3 trägt allein der
       erste Marker. Wer beide Marker als gleich weit liest, schreibt sich eine Beobachtung
       auf, die an zwei Aufrufen nicht gemacht wurde.

(bo) **DIE ZWEI FEHLERKLASSEN SIND AN DER ANTWORTGESTALT UNTERSCHEIDBAR.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER).**

     · **PARSE-EBENE:** unter `details` nur `BadRequest`, KEIN `ErrorInfo`, KEIN
       `RequestInfo`, KEIN `requestId`; die Meldung nennt entweder JSON oder einen Feldpfad;
       der `fieldViolation` trägt nur `description` (für 1 und 7 erhoben, s. die
       Reichweiten-Anmerkung in (bn)).
     · **SEMANTISCHE PRÜFUNG:** `ErrorInfo` + `RequestInfo` + `requestId`, und der
       `fieldViolation` trägt `field`, `description` und `reason`.

     **AUFRUFE 1, 2, 3 UND 7 BLIEBEN AUF DER ERSTEN; 4, 5 UND 6 ERREICHTEN DIE ZWEITE.**

     **WARUM DAS DER TRAGENDE BEFUND DIESES LAUFS IST UND NICHT EINE FORMALIE:** Alle sieben
     Aufrufe enden mit **HTTP 400**. **DER STATUSCODE UNTERSCHEIDET SIE NICHT.** Wer eine
     Antwort dieser Schnittstelle allein am Statuscode beurteilt, kann "der Rumpf ist
     syntaktisch unbrauchbar" nicht von "der Rumpf ist gelesen worden und ein WERT stimmt
     nicht" trennen — und das sind zwei völlig verschiedene Befunde für jeden, der später
     einen Fehlschlag untersucht.

(bp) **DER PARSER SAMMELT — ER HÄLT NICHT BEIM ERSTEN FEHLER. UND ERST DAS MACHT AUFRUF 3
     AUSSAGEKRÄFTIG.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER):** Aufruf 7 sendet ZWEI unbekannte Namen und bekommt ZWEI
     `fieldViolations` in EINER Antwort, **beide Namen in der Meldung**.

     **ERSTE FOLGE, FÜR JEDE KÜNFTIGE AUSWERTUNG:** Wer nur den ERSTEN `fieldViolation` einer
     Anbieter-Antwort liest, **verliert Diagnostik, die der Anbieter geliefert hat**. Das
     trifft jeden Fehlerpfad, der diese Schnittstelle einmal anspricht.

     **ZWEITE FOLGE, UND SIE IST DIE BEWEISTECHNISCH WICHTIGERE:** Aufruf 3 war damit
     **rückwirkend schon vollständig aussagekräftig**. Ein unbekannter snake_case-Name hätte
     die Antwort von der des Aufrufs 2 unterscheidbar gemacht; sie war zeichengleich.
     **DIE AUSSAGE STEHT DAMIT AUF ZWEI UNABHÄNGIGEN WEGEN:** über Aufruf 6 (er erreicht die
     semantische Schicht, also hat die Parse-Ebene das ganze snake_case-Dokument
     durchlaufen) UND über Aufruf 7 plus die Zeichengleichheit von 2 und 3.
     **WARUM DAS EIGENS FESTGEHALTEN WIRD:** Aufruf 3 ALLEIN hätte die Frage nicht
     entschieden — bei einem fail-fast-Parser wären nur die Schlüssel VOR `event_source`
     belegt gewesen. Genau diese Lücke ist der Grund, warum die Aufrufe 6 und 7 gefahren
     wurden. Wer den Lauf später kürzt, streicht mit ihnen den Beweis.

(bq) **SNAKE_CASE IST GLEICHWERTIG ZULÄSSIG — UND SÄMTLICHE DREIZEHN SCHLÜSSELNAMEN SIND
     ANGENOMMEN, IN BEIDEN SCHREIBWEISEN.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER).** **DIE BEWEISFIGUR IN EINEM SATZ:** Wer die semantische
     Schicht erreicht, hat die Parse-Ebene über das GANZE Dokument durchlaufen — sonst wäre
     er dort nicht angekommen.

     **DIE DREIZEHN:** `destinations` · `operatingAccount` · `accountType` · `accountId` ·
     `productDestinationId` · `events` · `eventTimestamp` · `eventSource` · `adIdentifiers` ·
     `gclid` · `conversionValue` · `currency` · `transactionId`.

     **JE SCHREIBWEISE, UND DIE ZUORDNUNG IST GENAUER ALS "4/5 GEGEN 6":**
     · **camelCase:** zwölf über Aufruf 4 (der `eventSource` nicht trug) und Aufruf 5;
       `eventSource` selbst zusätzlich über 5, das mit "WEB" die Parse-Ebene verliess.
     · **snake_case:** zwölf über Aufruf 6; `event_source` selbst über Aufruf 3 — dessen
       Antwort ist ein **WERT**-Fehler ("Invalid value at 'events[0].event_source'") und kein
       Unbekannter-Name-Fehler, **der Schlüssel war also erkannt**.
     Diese Aufteilung steht hier, weil eine gröbere Angabe den dreizehnten Schlüssel je
     Schreibweise unbelegt liesse und niemand es merkte.

     **WAS DAMIT BEANTWORTET IST — VIER STELLEN, in der Form, in der jede von ihnen fragt:**
     (u)/Frage 4 · (y)/Widerspruch 2 · (s)/LÜCKE F · (z)/Punkt 2. Die beiden letzten fragen
     ausdrücklich nach der **GLEICHWERTIGKEIT**, und genau die ist gemessen: Aufruf 6 erreicht
     dieselbe Schicht wie 4 und 5, mit **identischem Feldpfad und identischem `reason`**.

     **KEINE FOLGE FÜR DEN CODE, UND DAS GEHÖRT IN DIESEN TEIL:** Gebaut wird camelCase, und
     camelCase ist angenommen. **ES WIRD KEINE ZEILE UMBENANNT.** Der Befund erlaubt
     snake_case, er verlangt es nicht.

     **DIE GRENZE:** Gemessen sind die dreizehn Schlüssel UNSERER Nutzlast. Über Felder, die
     wir nicht senden — `userData`, `eventDeviceInfo`, `cartData`, `customVariables` und die
     übrigen aus (u)/Frage 4 —, sagt dieser Befund nichts.

(br) **`eventSource` IST EIN ENUM, KEIN FREIER STRING.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER):** Die Antwort auf 2 und 3 nennt den Typ beim Namen —
     `type.googleapis.com/google.ads.datamanager.v1.EventSource`. `"ERFUNDEN_B1"` wird auf der
     Parse-Ebene abgewiesen; `"WEB"` wird angenommen (Aufruf 5 verliess die Parse-Ebene).

     **DIE GRENZE, UND SIE IST DER TRAGENDE TEIL:** **Die MENGE der Mitglieder ist NICHT
     erhoben**, und **ob `WEB` der richtige Wert für einen Offline-Klick-Import ist, ist NICHT
     gemessen** — ein Wert kann syntaktisch gültig und fachlich falsch sein, und die
     Schnittstelle meldet das nicht.
     **FOLGE FÜR DIE BINDENDE ENTSCHEIDUNG (2)** (docs/aktiver-stand.md): Sie wird **KLEINER,
     NICHT ERLEDIGT**. Dass `eventSource` vom Aufrufer geliefert und nie in der Funktion
     gewählt wird, gilt unverändert — die Wahl des Wertes ruht weiterhin auf nichts Gemessenem.

(bs) **`eventTimestamp` IN DER GESTALT VON `toISOString()` WIRD ANGENOMMEN.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER).** Die Rümpfe 4, 5 und 6 trugen den Zeitstempel
     `2026-08-28T12:00:00.000Z` (Angabe aus erster Hand, s. (bn)) und haben die Parse-Ebene
     verlassen. **Die Zeitstempel-Form wird beim Parsen geprüft** — ein unbrauchbarer Wert
     käme über die erste Schicht nicht hinaus.

     **WAS SICH DAMIT ÄNDERT:** Die Gestalt war GELESEN ((w)/D3: "generated output will always
     be Z-normalized and use 0, 3, 6 or 9 fractional digits") und ist jetzt GEMESSEN.
     **DIE EINHEIT WEICHT VON ALLEN VIER GEBAUTEN ZIELEN AB** — dort reist eine Zahl, hier
     eine Zeichenkette; der gepinnte Zeitstempel-Test in google-payload.test.ts fängt genau
     diesen Kopierfehler und bleibt unverändert nötig.

     **DIE GRENZE:** Gemessen ist EINE Gestalt an EINEM Wert. Ob eine Epochen-Zahl abgewiesen
     würde, ist NICHT gemessen — es ist keine gefahren worden.

(bt) **`operatingAccount.accountId` MUSS NUMERISCH SEIN.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER):** Aufrufe 4, 5 und 6 werden auf der SEMANTISCHEN Schicht
     abgewiesen — field "destinations[0].operating_account.account_id", description "String is
     not a valid number.", reason `INVALID_NUMBER_FORMAT`.

     **DIE GRENZE:** **Dass die BINDESTRICHE der Grund waren, ist NICHT isoliert gemessen.**
     Gemessen ist die Abweisung von "000-ERFUNDEN-000" — ein Wert, der zugleich Bindestriche
     trägt und kein echtes Konto bezeichnet. Welcher der beiden Umstände greift, trennt diese
     Messung nicht.

     **DIE FOLGE, DIE ABGELEGT GEHÖRT UND DIE ÜBER DIESEN LAUF HINAUS BINDET:** **Google Ads
     zeigt Kundennummern MIT Bindestrichen an.** Ein Betreiber, der sie so abschreibt, wie er
     sie sieht, erzeugt ohne Normalisierung **AN DER EINGABE** einen stillen Fehlschlag — die
     Anfrage wird abgewiesen, der Besucher merkt nichts, und die Conversion fehlt.
     **DER REINE BAUER NORMALISIERT AUSDRÜCKLICH NICHT UND SOLL DAS NICHT ÄNDERN:**
     `buildIngestEventsRequest` reicht beide Kennungen unverändert durch (Entscheidung im
     Zuschnitt der Scheibe 11.2a). Die Normalisierung gehört an die Eingabe, nicht in den
     Bauer; der Kandidat dazu steht in docs/aktiver-stand.md, Vorrat.

(bu) **WAS B1 NICHT GEMESSEN HAT — DREI DINGE, UND IHRE BEGRÜNDUNG IST EINE ABLEITUNG.**
     **NEU.**

     **NICHT GEMESSEN:** das Format von `productDestinationId` · das Format der
     Klick-Kennungen (`gclid`, `gbraid`, `wbraid`) · **ob `eventSource` ein Pflichtfeld ist**
     (Aufruf 4 ohne es erreichte dieselbe Schicht wie 5 mit ihm — das zeigt nur, dass die
     Abwesenheit keinen PARSE-Fehler erzeugt).

     **DIE BEGRÜNDUNG IST AUSDRÜCKLICH EINE ABLEITUNG UND KEINE MESSUNG.** Sie lautet: die
     semantische Prüfung hält beim ersten Verstoss, also kam nichts hinter `account_id` je
     zur Prüfung. **SIE SETZT ZWEIERLEI VORAUS, UND BEIDES IST UNBELEGT:**
     (1) dass ein einziger zurückgegebener `fieldViolation` in 4/5/6 ein Anhalten bedeutet und
         nicht schlicht die einzige Beanstandung war;
     (2) dass die erfundene `productDestinationId` und die erfundene Klick-Kennung überhaupt
         ungültig WAREN — das ist unbekannt.

     **DIE SPANNUNG ZU (bp) GEHÖRT AUSDRÜCKLICH HIERHER UND WIRD NICHT GEGLÄTTET:** Auf der
     **PARSE**-Ebene sammelt der Anbieter **nachweislich** (Aufruf 7, zwei `fieldViolations`).
     **OB DIE SEMANTISCHE EBENE DAS AUCH TUT, IST NICHT GEMESSEN.** Die Ableitung oben läuft
     also der einzigen harten Beobachtung zum Sammelverhalten ENTGEGEN. Wer sie später als
     Befund zitiert, zitiert eine Vermutung; wer sie prüfen will, braucht einen Aufruf mit
     einem GÜLTIGEN `account_id` und mehreren fehlerhaften Folgefeldern.

     **`x-goog-user-project` — GEMESSEN, MIT ERHALTENER GRENZE:** Die Kopfzeile fehlte in
     **allen sieben** Aufrufen, und die semantische Prüfung wurde dennoch erreicht.
     **AUSDRÜCKLICH KEIN SCHLUSS AUF ENTBEHRLICHKEIT:** Eine Projekt- oder Kontingentprüfung
     kann HINTER dem ersten Feldverstoss liegen und wäre dann nie erreicht worden. **Grenze 2
     in (bm) bleibt, und die offene Frage aus (am) und (as)/Punkt 2 bleibt offen.**

     **UND DIE VIERTE GRENZE AUS (bm) GILT UNVERÄNDERT MIT:** Ein Anbieter kann sein Verhalten
     ändern, ohne dass hier etwas rot wird. Diese Messung datiert vom 2026-08-28.

### MESSUNG C gegen den Token-Endpunkt (2026-08-28) — die Teile (bv) bis (bz)

**WAS DIESER ABSCHNITT IST UND WIE ER SICH VON A UND B1 UNTERSCHEIDET:** Messung A (s. (bj))
und Messung B1 (s. (bn)) liefen beide gegen `events:ingest` — den EINLIEFERUNGS-Endpunkt.
**MESSUNG C LÄUFT GEGEN DEN TOKEN-ENDPUNKT** und misst damit erstmals den ANDEREN der beiden
Endpunkte, an denen die Phase 11.2 hängt: nicht, was wir senden, sondern womit wir es senden
dürfen.

**HERKUNFT FÜR ALLE TEILE DIESES ABSCHNITTS: GEMESSEN 2026-08-28 (OWNER), live gegen
`https://oauth2.googleapis.com/token`.** Wo eine Angabe eine RECHNUNG aus gemessenen Werten
ist und keine Beobachtung, steht das an der Angabe — s. besonders (bw).

(bv) **DAS ERNEUERUNGS-TOKEN WIRD NICHT ROTIERT — ZWEIMAL DASSELBE EINGELÖST, BEIDE MALE
     200.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER):** Dasselbe Erneuerungs-Token wurde ZWEIMAL gegen den
     Token-Endpunkt eingelöst. **Beide Aufrufe antworten mit 200.** Der zweite Aufruf wird
     nicht abgewiesen, und die Antwort trägt kein neues Erneuerungs-Token an die Stelle des
     alten.

     **GOOGLE ROTIERT DAS ERNEUERUNGS-TOKEN ALSO NICHT.** Ein einmal abgelegtes Token bleibt
     nach einer Einlösung brauchbar.

     **`client_secret` WURDE MITGESENDET** — die Aufrufgestalt steht in (by), weil sie dort
     eine eigene offene Frage trägt.

     **EINE FRÜHER OFFENE FRAGE IST DAMIT FÜR GOOGLE ERLEDIGT:** Die Auflage
     "AUSGEGEBEN IST NICHT EINGELÖST" — festgehalten am LinkedIn-Teil (w) dieser Datei, wo eine
     programmatische Erneuerung als GELESEN, aber UNGEPRÜFT geführt wird — ist für Google
     eingelöst: die Erneuerung ist gefahren und sie geht durch. **FÜR LINKEDIN GILT SIE
     UNVERÄNDERT WEITER**, s. (bz).

(bw) **DIE ZWEI UHREN — DAS ZUGANGSDATUM LEBT 3599 SEKUNDEN, UND DIE UHR DES
     ERNEUERUNGS-TOKENS WIRD BEI DER EINLÖSUNG NICHT VERLÄNGERT.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER) — die vier Zahlen, wie sie in den Antworten standen:**
     · `expires_in` **3599**.
     · `refresh_token_expires_in` im ersten Aufruf **581553**.
     · `refresh_token_expires_in` im zweiten Aufruf **581408**.
     · Der Abstand zwischen den beiden Aufrufen: **145 Sekunden**.

     **DIE AUSSAGE, UND SIE IST EINE RECHNUNG AUS DIESEN VIER WERTEN, KEINE ZWEITE
     BEOBACHTUNG:** 581553 − 581408 = 145 — **genau der verstrichene Abstand**. Die Restdauer
     ist also um exakt die vergangene Zeit gesunken. **DIE UHR DES ERNEUERUNGS-TOKENS LÄUFT
     WEITER UND WIRD DURCH DIE EINLÖSUNG NICHT ZURÜCKGESETZT.** Das ist die schärfere Aussage
     als "sie wird nicht verlängert": Sie wird nicht einmal angehalten.

     **DIE EINORDNUNG DER ERSTEN ZAHL — EBENFALLS EINE RECHNUNG, NICHT EIN MESSWERT:**
     581553 Sekunden sind **6,73 Tage**. Das ist die **Sieben-Tage-Frist im
     Publishing-Status "Testing"**, die als GELESEN bereits in (af) steht — hier zum ersten
     Mal an einer echten Antwort wiedergefunden.
     **WAS DARAN AUSDRÜCKLICH EINE FOLGERUNG IST UND KEINE MESSUNG:** Dass die Differenz zu
     sieben vollen Tagen das ALTER der Autorisierung ist, folgt aus der Annahme, dass die
     Frist bei der Zustimmung zu laufen beginnt. **Das ist nicht gemessen** — der
     Zustimmungs-Zeitpunkt ist in diesem Lauf nicht erhoben worden.

(bx) **DIE GELESENE ERWARTUNG, `refresh_token_expires_in` TREFFE UNSEREN FLUSS NICHT, IST
     WIDERLEGT — DAS FELD KAM.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER):** Beide Antworten trugen `refresh_token_expires_in`
     (s. die Werte in (bw)). Der Aufruf betraf den Data-Manager-Bereich.

     **WAS DAMIT FÄLLT — GENAU EINE AUSSAGE, UND SIE IST EINE ABLEITUNG AUS EINER LESUNG,
     NICHT DIE LESUNG SELBST:** Teil (bc) hält GELESEN fest, das Feld werde "only set when
     the user grants time-based access", und leitet daraus ab, `{kind:"unknown"}` sei für
     unseren Fluss der **zu ERWARTENDE** Fall. **DIESE ABLEITUNG IST WIDERLEGT.** Der
     gelesene Satz des Anbieters selbst ist von dieser Messung NICHT berührt — was fällt,
     ist unsere Folgerung daraus. Ein VORBEHALT steht an (bc) und zeigt hierher.

     **OB ES AM PUBLISHING-STATUS HÄNGT, IST OFFEN — UND WIRD HIER NICHT AUFGELÖST.** Beide
     Zustände tragen die Beobachtung gleich gut:
     · Der Anbieter setzt das Feld generell, und die gelesene Bedingung ist enger formuliert
       als das tatsächliche Verhalten.
     · Der Anbieter setzt es, WEIL die Anwendung im Publishing-Status "Testing" steht — dann
       verschwände es mit der Verifizierung, und `{kind:"unknown"}` würde nachträglich doch
       zum Normalfall.
     **DIE MESSUNG TRENNT DIE BEIDEN NICHT**, weil sie in nur EINEM Publishing-Status
     gefahren ist. **WER SIE TRENNEN WILL, BRAUCHT DIESELBE MESSUNG NACH DER VERIFIZIERUNG.**

     **DIE FOLGE FÜR DEN CODE STEHT NICHT HIER:** `src/lib/secrets/oauth-payload.ts` trägt am
     Typ `RefreshTokenExpiry` die widerlegte Erwartung im Kommentar. **DIE DATEI IST IN
     DIESER RUNDE NICHT ANGEFASST WORDEN** (Invariante des Auftrags) — dieselbe Handhabung
     wie in Lauf 6, der dort schon einmal eine Richtigstellung GEMELDET und nicht angeglichen
     hat (s. (bc)). Ob und wie sie nachzieht, ist eine eigene Entscheidung an einer
     Code-Datei und keine Doku-Arbeit.
     **WAS DIE ENTSCHEIDUNG SELBST ANGEHT — DER ZUSTAND `{kind:"unknown"}` WIRD NICHT
     ÜBERFLÜSSIG:** Er bleibt gebraucht, solange nicht gemessen ist, dass JEDER Anbieter
     dieses Rahmens das Feld liefert. Für LinkedIn ist es nicht gemessen (s. (bz)).

(by) **`client_secret` WURDE MITGESENDET — DER ANBIETER FÜHRT ES ALS "Optional". NICHT
     GEDEUTET.** **NEU.**

     **GEMESSEN 2026-08-28 (OWNER):** Beide Aufrufe trugen `client_secret`. Beide
     antworteten mit 200.

     **DER ANBIETER FÜHRT DAS FELD ALS "Optional"** (GELESEN; s. die Feldliste des
     Token-Endpunkts im Lauf 6, Teile (az) bis (bg)).

     **AUSDRÜCKLICH NICHT GEDEUTET, und die Nicht-Deutung ist hier der Befund:** Ob ein
     Aufruf OHNE `client_secret` ebenfalls durchginge, ist **NICHT GEMESSEN** — es ist keiner
     gefahren worden. Aus "mit Secret geht es" folgt nichts über "ohne Secret geht es auch",
     und aus dem Wort "Optional" in der Doku folgt es ebenso wenig: Ein Feld kann als optional
     dokumentiert und für einen bestimmten Client-Typ dennoch verlangt sein.
     **WAS DARAUS FÜR DEN BAU FOLGT:** Gebaut wird MIT `client_secret` — das ist der
     gemessene Weg. Der Verzicht wäre eine Änderung auf ungemessener Grundlage.

(bz) **WAS C NICHT GEMESSEN HAT — ZWEI DINGE, BEIDE AUSDRÜCKLICH.** **NEU.**

     **ERSTENS: DER FEHLERCODE FÜR EIN TOTES ERNEUERUNGS-TOKEN IST UNGEMESSEN.** Es ist kein
     Aufruf mit einem abgelaufenen, widerrufenen oder gefälschten Erneuerungs-Token gefahren
     worden.
     **`invalid_grant` IST EINE ERWARTUNG AUS DEM OAUTH-STANDARD, KEINE MESSUNG.** Sie wird
     hier ausdrücklich als solche geführt, und zwar auch gegen den naheliegenden Einwand,
     der Anbieter nenne den Code ja: Teil (bd) hält `invalid_grant` GELESEN fest — aber für
     den **CODE-TAUSCH**, nicht für die **ERNEUERUNG**, und dort ausdrücklich OHNE
     Statuscode, OHNE Rumpfform und OHNE Trennung der Fälle. **Wer ihn von dort auf die
     Erneuerung überträgt, überträgt einen Fehlercode von einem Fluss auf einen anderen** —
     dieselbe Figur, vor der (bd) beim Statuscode warnt.
     **DAS TRIFFT DEN AUSGANG `dead`** der Scheibe 1a
     (docs/aktiver-stand.md, Abschnitt "Die Erneuerung des Zugangsdatums"):
     Er ruht bei diesem Code auf einer Erwartung. Die
     Festlegung "ein unerwarteter Anbieter-Code landet in `retry`, nicht in `dead`" ist genau
     die Vorkehrung dagegen.

     **ZWEITENS: NICHTS AN DIESER MESSUNG GILT FÜR LINKEDIN.** Weder die Nicht-Rotation
     (bv) noch das Verhalten der zweiten Uhr (bw) noch die Anwesenheit eines
     Ablauf-Feldes (bx) ist dort erhoben. **Für LinkedIn steht weiterhin nur eine LESUNG**
     (Teil (w) dieser Datei: Erneuerung per `grant_type=refresh_token`, das Refresh-Token
     BEHÄLT seine Restlaufzeit) **mit der ausdrücklichen Auflage
     "AUSGEGEBEN IST NICHT EINGELÖST"** — sie ist für LinkedIn NICHT eingelöst.
     **WER DEN ANBIETER-NEUTRALEN RAHMEN DER SCHEIBE 1a UM DEN LINKEDIN-ZWEIG ERWEITERT,
     MISST DORT EIGENS.** Der Rahmen erbt keine Messung.

     **UND DIE GRENZE, DIE FÜR JEDE MESSUNG DIESER DATEI GILT:** Ein Anbieter kann sein
     Verhalten ändern, ohne dass hier etwas rot wird. Diese Messung datiert vom 2026-08-28.

## Pinterest (Conversions API)

**DIE BUCHSTABEN BEGINNEN HIER BEI (a)** — die Konvention im Kopf dieser Datei bindet die
Eindeutigkeit an den ZIEL-ABSCHNITT. Was das für Verweise von aussen bedeutet, steht im
Kopf unter "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND BUCHSTABEN — NIE DEN BUCHSTABEN
ALLEIN".

### Abschnitts-Lesung 2026-08-20 der Anbieter-Dokumentation — die Teile (a) bis (r)

**HERKUNFT (2026-08-20):** Eine ABSCHNITTS-LESUNG der Anbieter-Dokumentation mit dem
Browser-Werkzeug, nach der Regel "ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN"
(docs/immer-beachten.md). GELESEN wurden DREIZEHN Seiten — der Abschnitt "Conversions
nachverfolgen" VOLLSTÄNDIG plus benannte Nachbarn; die Liste steht am Ende dieses
Abschnitts unter "Der gelesene Umfang". KEIN Aufruf gegen die Schnittstelle, KEINE
Anmeldung, KEINE Eingabe auf einer fremden Seite. Wo unten BEOBACHTET steht, hat der Owner
am selben Tag eine eigene Konto-Oberfläche abgelesen.
**KEINE SEITE HAT VERSUCHT, DEN LESENDEN ANZUWEISEN** — geprüft und ausdrücklich vermerkt.

### Die Antworten aus der Doku-Lesung — Teile (a) bis (i)

(a) DER ZUGANGSWEG — ES SIND ZWEI, UND SIE SIND ALTERNATIV (Katalog-Frage A1).
    GELESEN 2026-08-20,
    https://developers.pinterest.com/docs/track-conversions/track-conversions-in-the-api/,
    Abschnitte "Before you start sending conversion events" und "Generate a conversion
    token": ein CONVERSION-TOKEN aus der Werbe-Oberfläche — "Go to Ads Manager, and select
    Ad Account Overview > Conversions > Conversions API > Set up API. Select Conversion
    access token, and click Generate new token. Copy your newly generated token, which is
    displayed with your ad account ID." — ODER ein OAUTH-TOKEN mit mindestens `ads:write`.
    Der Anbieter formuliert es als Entweder-oder: "Conversion token if you only want to
    access the Conversions API endpoint or OAuth token with at least `ads:write` scopes".

(b) DIE FRIST — NUR FÜR EINEN DER BEIDEN WEGE BELEGT (Katalog-Frage A3).
    GELESEN 2026-08-20,
    https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/,
    Abschnitte "Step 3: Get the access token", "Refresh a token", "Replace an invalid
    token", "Token security considerations: Github secret scanner program".
    OAUTH-WEG: Access-Token `expires_in: 2592000` (30 Tage) — "Refresh your access token
    before it expires-–within 30 days (2592000 seconds) after it is issued". Refresh-Token:
    "Pinterest only supports the continuous refresh token (60-day expiration, refreshable
    indefinitely) and no longer supports the legacy refresh token (365-day expiration, hard
    limit)."
    UNABHÄNGIG VON DER FRIST: "Tokens may become invalid for a number of reasons, and
    Pinterest does not always notify you" — genannt sind ein Passwort-/Namenswechsel des
    Kontos und der GitHub-Secret-Scanner ("The exposed token's access is revoked within 24
    hours").
    CONVERSION-TOKEN-WEG: NICHT GEFUNDEN. Auf keiner der dreizehn Seiten steht eine
    Lebensdauer, ein Ablauf oder eine Erneuerung dafür. ABGESUCHTE ACHSE: die
    Conversions-Seite, die Auth-Seite, die Rate-Limit-Seite, die FAQ — Begriffe `expire`,
    `expires_in`, `conversion token`, `refresh`. NICHT-TREFFER auf DIESER Achse, KEIN
    Beweis der Abwesenheit.

(c) DER ERNEUERUNGSWEG — UND EIN ZWEIBEINIGER FLUSS EXISTIERT (Katalog-Frage A4).
    GELESEN 2026-08-20, dieselbe Auth-Seite, Abschnitte "Refresh a token" und "Step 3":
    `POST https://api.pinterest.com/v5/oauth/token` mit `grant_type=refresh_token`,
    HTTP-Basic aus Client-Kennung und Client-Geheimnis; die Antwort trägt zusätzlich
    `refresh_token_expires_at`. "Repeat these steps before 60 days in order to keep the
    continuous refresh token valid. Once the refresh token has expired, you will need to
    explicitly request access again by repeating the Authorization Code flow."
    EIN FREIGABEVERFAHREN FÜR DIE ERNEUERUNG WIRD NICHT GENANNT.
    UND: Der Anbieter kennt einen CLIENT-CREDENTIALS-GRANT (`grant_type=client_credentials`,
    Token-Präfix `pinc`, `expires_in: 2592000`), in der Beispielantwort OHNE Refresh-Token.
    ABGRENZUNG, DIE MITMUSS: Das ist ein Befund über DIESEN Anbieter. Er sagt NICHTS über
    einen anderen — beim vierten Ziel ist derselbe Weg für die Marketing-Schnittstellen
    ausgeschlossen (Abschnitt "LinkedIn (Conversions API)", Teile (u) und (v)).

(d) DIE DEDUPLIZIERUNG — ZWEI FELDER IN BEIDEN QUELLEN, KEINE ZWEITE REGEL (Katalog-Frage
    H2).
    GELESEN 2026-08-20, Conversions-Seite, Abschnitte "Use event IDs effectively",
    "Prevent event duplication", "Format server event parameters"; sowie
    https://developers.pinterest.com/docs/track-conversions/understand-conversions-and-how-to-track-them/,
    Abschnitte "How Conversions API and Pinterest Tag work" und "Preventing duplication".
    "For deduplication, the `eventID` from a browser or app event must match the `event_id`
    in the corresponding server event." · "Pass the `event_id` and `event_name` parameter in
    all the sources you use, making sure that the `event_id` is identical for each redundant
    event." · "In the case of redundant events, Pinterest retains the first event captured
    and removes duplicates within 48 hours."
    `event_id` ist als Required geführt und ausdrücklich "used also for deduplicating events
    ingested through the conversion API and Pinterest tracking".
    WAS DIESER ANBIETER NICHT VERLANGT: eine eigene Conversion-Regel je Datenquelle — "You
    can use either ingestion method independently of the other; however, we recommend that
    you use both". DAS IST DER UNTERSCHIED ZUM VIERTEN ZIEL, wo genau das verlangt wird
    (Abschnitt "LinkedIn (Conversions API)", Teil (y)).

(e) DIE MENGENBESCHRÄNKUNG — UND DER TRÄGER DES ZUGANGSDATUMS ENTSCHEIDET MIT
    (Katalog-Frage H3).
    GELESEN 2026-08-20, https://developers.pinterest.com/docs/reference/rate-limits/,
    Abschnitte "Rate limits", "Rate limit categories", "Manage rate limits".
    Universell: "Trial access: 1000 requests per day for all API requests" · "Standard
    access: 100 requests per second per user per app for all API requests".
    Kategorie `ads_conversions` — "Sending batches of conversion events for an ad account.
    This category applies to requests authenticated with a token acquired through the
    standard OAuth flow." Trial: 1 000 Anfragen pro Tag je Werbekonto je App. Standard:
    120 000 Anfragen pro Minute je Werbekonto je App.
    DER TRAGENDE SATZ: "It is recommended that you use the conversion access token, which
    enables you to send unlimited conversion-tracking events."
    Testanfragen: "Test requests have a rate limit of 10 per app per second."
    Beobachtbarkeit: die Kopfzeilen `x-ratelimit-limit`, `x-ratelimit-remaining`,
    `x-ratelimit-reset`. Änderungen per Support-Ticket. "All rate limits are subject to
    change without notice."
    ZUM WIEDERHOLUNGSVERHALTEN: NICHT GEFUNDEN — kein Statuscode für Überschreitung, keine
    Wartezeit, kein Verfahren. ABGESUCHTE ACHSE: Rate-Limit-Seite vollständig,
    Conversions-Seite, FAQ — Begriffe `429`, `retry`, `back off`, `too many`.

(f) DIE PRODUKT-FREIGABE — ZWEISTUFIG, MIT ECHTER PRÜFUNG (Katalog-Frage I1).
    GELESEN 2026-08-20, https://developers.pinterest.com/docs/getting-started/connect-app/,
    Abschnitt "Register your app details to get your app ID and secret key": "Submit your
    request for trial access. Application requests are reviewed each business day. As soon
    as your app has been reviewed you will receive an email notification letting you know if
    your app has been approved or denied access."
    Danach optional die Höherstufung — https://developers.pinterest.com/docs/key-concepts/access-tiers/,
    Abschnitt "Upgrade your app to Standard access": "Standard upgrade requests are reviewed
    regularly."
    ZUSÄTZLICHE VORBEDINGUNG der Conversions API (Conversions-Seite): ein Pinterest-
    Werbekonto — "The Conversions API endpoint requires a unique identifier associated with
    the ad account that is sending events."

(g) DIE VERTRAGS-BEDINGUNGEN — MINDESTENS DREI BENANNTE DOKUMENTE (Katalog-Frage I2).
    GELESEN 2026-08-20. Bei der App-Anlage (connect-app): "Go to My apps and click through
    to accept our Developer Terms of Service." Für die Freigabe (access-tiers, "Why requests
    may get denied"): "All applications must comply with our Developer Guidelines and
    Developer and API Terms of Service."
    Für Werbedaten ein eigener Vertrag —
    https://developers.pinterest.com/docs/track-conversions/use-limited-data-processing-flag/:
    die "Pinterest Advertising Services Agreement" mit den "U.S. State-Specific Data Terms
    attached as Exhibit C". Dort auch die Pflichtenzuweisung: "Advertisers are responsible
    for complying with user opt-outs, as well as identifying the user's state of residency
    when implementing the Limited Data Processing flag."
    Und die Conversions API selbst nennt als Grenze (understand-conversions): "Requires
    backend integration and data privacy compliance, such as hashing and user consent."

(h) DIE FREISCHALTUNG — DIE SCHNITTSTELLE SELBST IST NICHT ALLOWLIST-PFLICHTIG, EIN
    NACHBAR-MERKMAL SCHON (Katalog-Frage I3).
    GELESEN 2026-08-20, access-tiers, Abschnitte "access tiers table" und "Upgrade your app
    to Standard access": Die Stufen-Tabelle führt kein Conversions-Merkmal als gesperrt; der
    Unterschied für unseren Fall sind die Grenzwerte. Der Antragsweg verlangt "a video
    recording of your app completing an action using the Pinterest API. We will review to
    verify that you are sending users through the OAuth flow appropriately and not storing
    any sensitive information" — und ausdrücklich auch für Einzelnutzer: "If you are the
    only intended user of the Pinterest API, we will still require a video recording of the
    OAuth flow." Ablehnungsgründe sind einzeln aufgeführt.
    DAS ALLOWLIST-GESPERRTE NACHBAR-MERKMAL: Die Endpunkte zum Entfernen von Nutzern aus
    Conversion-Daten sind mit "Geschlossene Beta" ausgezeichnet —
    https://developers.pinterest.com/docs/track-conversions/remove-users-from-events/.

(i) DIE ROLLE DER ANMELDENDEN IDENTITÄT — NICHT GEFUNDEN (Katalog-Frage I4).
    Was es gibt, ist eine SCOPE-Ebene, keine Rollen-Ebene: `ads:read` / `ads:write` und ein
    eigener Scope `biz_access` ("See all business access data") — GELESEN 2026-08-20,
    Auth-Seite, Abschnitt "Available scopes". Die Voraussetzung wird als ZUGRIFF formuliert,
    nicht als Rolle: "for any ad accounts that you have access to"
    (https://developers.pinterest.com/docs/track-conversions/get-event-quality-score/). Die
    FAQ erklärt Fehlschläge ebenfalls über Scopes: "Each API endpoint has associated scopes,
    which define its required user permissions."
    ABGESUCHTE ACHSE: die dreizehn gelesenen Seiten, Begriffe `role`, `Role`, `admin`,
    `Admin`, `business access`, `Business Access`, `permission`, `owner`. NICHT-TREFFER auf
    DIESER Achse — die Rollen dürften in der Business-Hilfe ausserhalb der
    Entwicklerdokumentation stehen, und dorthin ist nicht gegangen worden.

### Fünf Fragen, die eine MESSUNG verlangen — hier steht NUR das Instrument

**WARUM NUR DAS INSTRUMENT:** Diese fünf tragen im Fragenkatalog "Messung nötig". Eine
GELESENE Antwort darauf sieht wie ein Befund aus und ist keiner. Wo die Doku etwas sagt,
ist es hier bewusst NICHT wiedergegeben — der Auftrag dieser Lesung hat das ausdrücklich
verlangt. (Dass diese Trennlinie zu grob gezogen war, ist eine ARCHITEKTEN-ENTSCHEIDUNG vom
2026-08-20 und in docs/ziel-fragenkatalog.md unter "Befunde am Verfahren" festgehalten; für
DIESE Lesung galt sie noch.)

(j) INSTRUMENT ZU D6 (prüft die Schnittstelle die BEDEUTUNG der Werte?): ein Aufruf gegen
    `POST /v5/ad_accounts/{id}/events` mit einem erfundenen Währungscode bzw. einem
    Grenzwert, gefahren im Testmodus, und die Ablesung der Rumpf-Felder `status`,
    `error_message`, `warning_message`. Dazu die Test-Ereignis-Ansicht im Werbekonto.

(k) INSTRUMENT ZU F2 (Registrierungspflicht und Deckel je Konto): die Endpunkte unter
    `POST /v5/ad_accounts/{id}/advertiser_defined_events` gegen das EIGENE Konto, plus die
    Ansicht der definierten Ereignisse im Werbekonto. Fundstelle der Seite:
    https://developers.pinterest.com/docs/track-conversions/define-your-own-event-types/.
    DIE SEITE TRÄGT EINE AUSSAGE ZU DIESER FRAGE; sie ist hier auftragsgemäss nicht
    wiedergegeben.

(l) INSTRUMENT ZU H4 (mehrere Ereignisse je Aufruf): ein Aufruf mit mehr als einem Eintrag
    im `data`-Array gegen den Testmodus und die Ablesung von `num_events_received`,
    `num_events_processed` und `events[]`. AUCH HIER trägt die Doku eine Aussage, die hier
    nicht wiedergegeben ist.

(m) INSTRUMENT ZU H5 (taugliches Live-Test-Instrument): drei Kandidaten, keiner geprüft —
    (1) die Test-Ereignis-Ansicht im Werbekonto, gespeist über den Testmodus-Parameter; die
    Doku nennt dafür eine Sandbox: "Test event data is sent to a sandbox environment…
    test data is not processed for reporting or optimization." (2) die
    Conversions-Health-Ansicht im Werbekonto. (3) der API-Weg
    `GET /v5/ad_accounts/{id}/conversion_eqs` (Event Quality Score; braucht ein OAuth-Token
    mit `ads:read`, Parameter `lookback_period` `1d` oder `14d`, Filter
    `ingestion_source=CONVERSIONS_API`).
    ZU (2) IST AM 2026-08-20 EINE BEOBACHTUNG DAZUGEKOMMEN — s. unten (r).

(n) INSTRUMENT ZU I5 (Freigabe der ausliefernden Domain): die Konto-Oberfläche
    (Conversion Tag Manager, laut Doku hinter einer Anmeldeschranke) und, für die Wirkung,
    eine der Anzeigen aus (m).
    AUF KEINER DER DREIZEHN SEITEN IST EINE DOMAIN-ALLOWLIST FÜR DIESEN ANBIETER GEFUNDEN
    WORDEN. ABGESUCHTE ACHSE: die dreizehn Seiten, Begriffe `traffic permission`,
    `allowlist`, `allowed domain`, `domain`. NICHT-TREFFER auf DIESER Achse, kein
    Abwesenheitsbeweis.

### Die Gegenüberstellung mit dem bestehenden Matrix-Stand — Teil (o)

(o) SECHS KONTROLLFRAGEN, VIER DECKUNGSGLEICH, ZWEI ABWEICHUNGEN.
    **DIE GRENZE ZUERST, WEIL SIE DAS ERGEBNIS EINFÄRBT: DAS IST KEINE BLINDPRÜFUNG.** Die
    Auflage lautete, `src/lib/capi/pinterest-forward.ts` erst NACH der Lesung zu öffnen —
    die Datei war in DERSELBEN Sitzung aber bereits zwei Runden zuvor vollständig gelesen
    worden. Ihre Kommentare standen im Kontext, als die Suche begann. Was folgt, ist eine
    WIEDERAUFFINDUNGS-Prüfung, keine unabhängige.
    · B3 (Träger des Geheimnisses) — Matrix: Bearer, gel. Doku: "--header 'Authorization:
      Bearer pina_ABCD1234...'", Token-Typ `bearer`. DECKUNGSGLEICH.
    · C1 (Form der Kennung) — Matrix: `ad_account_id`, Stellenzahl UNGEPRÜFT. Doku: Kennung
      im Pfad, KEINE Formatregel; die Beispiele sind untereinander uneinheitlich (zwölf und
      achtzehn Stellen). DECKUNGSGLEICH, und die Uneinheitlichkeit stützt das "ungeprüft".
    · D4 (Typ des Werts) — Matrix: Zeichenkette, gel. Doku: "Accepted as a string in the
      request and parsed into a double." DECKUNGSGLEICH.
    · F3 (Standard-Namen) — Matrix: zwei Namen weichen ab. Doku: `checkout` = "Track people
      who complete transactions", `signup` = "Track people who sign up for your product or
      service"; die übrigen sechs Namen unserer Tabelle stehen unverändert im Enum.
      DECKUNGSGLEICH.
    · E1 (Liste der Identitäts-Merkmale) — **ABWEICHUNG (UNVOLLSTÄNDIGKEIT).** Die
      Mindestregel deckt sich wörtlich: `user_data` "must include at least one of the
      following: `em` / `hashed_maids` / Pairing of `client_ip_address` and
      `client_user_agent`". Die MERKMALSLISTE ist aber weit länger: `external_id`,
      `click_id`, `client_ip_address`, `client_user_agent`, `country`, `ct`, `db`, `em`,
      `ge`, `ln`, `ph`, `st`, `zp`, `hashed_maids`, `partner_id`. UNSERE ZELLE BEANTWORTET
      DIE MINDESTBEDINGUNG, NICHT DIE GESTELLTE FRAGE.
    · E2 (roh oder gehasht) — **ABWEICHUNG (UNVOLLSTÄNDIGKEIT).** Roh sind IP ("Valid IPv4
      or IPv6. No pure zero (0.0.0.0) addresses.") und User-Agent. Die MEHRHEIT der übrigen
      Merkmale ist SHA-256: `em`, `ph`, `ct`, `db`, `ge`, `ln`, `st`, `zp`, `country`,
      `external_id`, `hashed_maids`. Unsere Zelle gilt für die zwei Merkmale, die der
      Adapter sendet — als Antwort auf "mit welchem Verfahren?" ist sie unvollständig.
    KEINE DER BEIDEN ABWEICHUNGEN BETRIFFT ETWAS, DAS DER ADAPTER HEUTE SENDET.

### Zwei Beobachtungen, die keine Katalog-Frage beantworten — Teil (p)

(p) ZWEI SPANNUNGEN IN DER DOKU SELBST. GELESEN 2026-08-20. Ohne Bewertung.
    (1) DER TESTMODUS-PARAMETER TRÄGT ZWEI NAMEN. Die Conversions-Seite: "Send an event
        with the query parameter `test` set to `true`", Beispiel `…/events?test=true`. Die
        Rate-Limit-Seite für denselben Endpunkt: "You can make test requests to the POST
        Send conversions endpoint by setting the `is_test` parameter to `TRUE`."
    (2) DER FREI GEWÄHLTE EREIGNISNAME IST IN DERSELBEN SEITE ERLAUBT UND ABGEWIESEN. Die
        Ereignis-Tabelle führt "Custom event that you name" als zulässig; die
        Beispiel-Antwort auf derselben Seite zeigt einen frei gewählten Namen als
        abgewiesen: `"status": "failed", "error_message": "Invalid event_name: subscription.
        Use a supported conversion event_name (for example subscribe, checkout)."`

### Die zweite Gegenüberstellung: Doku gegen den gebauten Adapter — Teil (q)

(q) DER ADAPTER IST VON DER HEUTIGEN DOKU GEDECKT; EINE ANGABE IST PRÄZISER GEWORDEN, EINE
    LÜCKE BLEIBT.
    **AUSDRÜCKLICH ALS ZWEITE GEGENÜBERSTELLUNG GEKENNZEICHNET**, mit demselben Vorbehalt
    wie in (o): die Datei war bereits gelesen. Nichts am Code geändert.
    GEDECKT: `action_source: "web"` (im Enum) · `partner_name: "direct"` (wörtlich: "For
    direct integration, use value `direct`") · der Wert als Zeichenkette · der Riegel
    "beide oder keiner" für IP und User-Agent (durch die Mindestregel an `user_data`) ·
    alle acht Zuordnungen der Übersetzungstabelle · der Testmodus als Query-Parameter
    (mit dem Vorbehalt aus (p)(1)).
    PRÄZISER GEWORDEN: Der Kommentar an `custom_data` in
    `src/lib/capi/pinterest-forward.ts` sagt, ein NEGATIVER Wert gehe durch und die Doku
    rate davon ab, ohne es zu verbieten. Die heutige Fassung rät weiterhin nur ab —
    "Should not contain unusually high values or contain invalid values such as negative
    number or zero." —, nennt aber ZWEI weitere Fälle, die der Kommentar nicht führt: NULL
    und UNGEWÖHNLICH HOHE Werte.
    DIE LÜCKE, UND SIE IST EINE LÜCKE DES LESENS, NICHT DES CODES: Das Parameter-Verzeichnis
    sagt ausdrücklich, dass es die Pflichtfelder NICHT benennt — "These parameter tables do
    not indicate whether parameters are required for the API request to be successful. See
    POST Send conversions to find out which parameters are required." DIESE
    ENDPUNKT-REFERENZ IST NICHT GEÖFFNET WORDEN.

### Beobachtungen an der eigenen Konto-Oberfläche (2026-08-20) — die Teile (r) bis (t)

**HERKUNFT:** KEIN Aufruf gegen die Schnittstelle und keine Doku-Lesung. Der Owner hat am
2026-08-20 die eigenen Oberflächen des Anbieters abgelesen. Deshalb steht das hier als
eigene Unterüberschrift und nicht als Teil der Doku-Lesung.

(r) ZWEI ZUGANGSDATEN FÜR DENSELBEN ENDPUNKT — UND DAS PRÄFIX TRENNT SIE NICHT.
    Der Anbieter kennt das Conversion-Token aus der Werbe-Oberfläche (s. (a)) und das
    Zugangsdatum aus dem OAuth-Fluss. BEOBACHTET 2026-08-20: BEIDE tragen das Präfix
    `pina_`. Es bezeichnet die ART des Werts, NICHT seine HERKUNFT.
    DER ARCHITEKT HAT DAS PRÄFIX ALS UNTERSCHEIDUNGSTEST AUSGEGEBEN — DAS WAR FALSCH, und
    es steht hier eigens, damit es niemand ein zweites Mal versucht. EIN TAUGLICHER TEST IST
    NICHT BEKANNT.
    WAS GILT: Die 30-Tage-Frist ist für den OAUTH-Weg belegt (s. (b), GELESEN). Der Owner
    hat den Weg über die WERBE-Oberfläche genommen (BEOBACHTET 2026-08-20, Ansicht
    "Conversion API einrichten"). OB DIESES Zugangsdatum abläuft, steht auf keiner der
    dreizehn Seiten und auf der Oberfläche nicht — NICHT-TREFFER, KEINE ENTWARNUNG.

(s) DAS ZUGANGSDATUM AUS DER WERBE-OBERFLÄCHE GILT ÜBER MEHRERE WERBEKONTEN.
    BEOBACHTET 2026-08-20, Wortlaut der Oberfläche: es "kann für mehrere Anzeigenkonten
    unter einer Nutzer-ID verwendet werden".
    WARUM DAS EIGENS DASTEHT: Es berührt die VIELMANDANTEN-Achse, die bei Google und an der
    Autorisierungsschicht geführt wird (CLAUDE.md, "## Offene Punkte", Eintrag "EIN
    OAUTH-ZUGANG PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE").
    KEINE BEWERTUNG UND KEINE ÜBERTRAGUNG AUF EIN ANDERES ZIEL.

(t) DIE QUALITÄTS-ANSICHT IST EIN INSTRUMENT — UND HEUTE KEIN MESSERGEBNIS.
    BEOBACHTET 2026-08-20: Die Ansicht im Werbekonto führt je Ereignis und je Parameter eine
    Abdeckung; für Checkout und Page Visit steht durchgehend 0 %, mit "nicht eingerichtet"
    bei E-Mail, External ID, Product ID und weiteren.
    DIE ZAHLEN SAGEN HEUTE NICHTS ÜBER UNSEREN ADAPTER, und das ist der tragende Satz: Der
    Owner hatte Pinterest in der App NICHT eingerichtet (OWNER-ANGABE, 2026-08-20). EIN
    LEERER PRÜFLING UND EIN SCHLECHTES ERGEBNIS SEHEN AN DIESER ANZEIGE IDENTISCH AUS — s.
    die Regel "BEVOR EIN ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS RICHTIGE
    GEMESSEN WIRD" in docs/immer-beachten.md.
    WAS SIE BEANTWORTET: Katalog-Frage H5 — ein taugliches Instrument EXISTIERT. Sie wird zum
    MESSERGEBNIS, sobald Pinterest im Testprojekt eingerichtet ist und eine Conversion
    gelaufen ist.
    EIN BEFUND ÜBER DEN BESTAND, UNBEWERTET: Der Adapter sendet IP und User-Agent. Die als
    "nicht eingerichtet" geführten Merkmale kann er nicht liefern; bei der E-Mail ist das
    die Folge der Datenklassen-Entscheidung (im Browser gehasht, die Erhebung ist nicht
    gebaut — CLAUDE.md, "## Offene Punkte", Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN
    PII-SCHEIBE"). KEINE EMPFEHLUNG.

### Der gelesene Umfang (2026-08-20)

**OHNE DIESE LISTE HAT JEDES "STEHT DORT NICHT" OBEN KEINE REICHWEITE.** Dreizehn Seiten,
alle am 2026-08-20 abgerufen; der Abschnitt "Conversions nachverfolgen" ist VOLLSTÄNDIG.

1. /docs/track-conversions/track-conversions-in-the-api/ — "Track conversion events in the
   API" (Einstieg über /docs/api-features/conversion-overview/, das hierher umleitet)
2. /docs/track-conversions/understand-conversions-and-how-to-track-them/ — "Understand
   conversions and how to track them"
3. /docs/track-conversions/define-your-own-event-types/ — "Define custom events"
4. /docs/track-conversions/remove-users-from-events/ — "Remove users from conversion event
   data"
5. /docs/track-conversions/get-event-quality-score/ — "Get event quality scores for
   conversions"
6. /docs/track-conversions/pinterest-tag/ — "Pinterest Tag"
7. /docs/track-conversions/integrate-third-party-tracking-tools/ — "Integrate third-party
   tracking tools"
8. /docs/track-conversions/use-limited-data-processing-flag/ — "Use Limited Data Processing
   flag"
9. /docs/getting-started/connect-app/ — "Connect app"
10. /docs/getting-started/set-up-authentication-and-authorization/ — "Set up authentication
    and authorization"
11. /docs/key-concepts/access-tiers/ — "Understanding our access tiers"
12. /docs/reference/rate-limits/ — "Rate limits"
13. /docs/faqs/faqs/ — "API FAQs"

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· **"POST Send conversions" (Endpunkt-Referenz) — DIE BENANNTE LÜCKE DIESER LESUNG.** Genau
  dort stehen laut Anbieter die PFLICHTFELDER (s. (q)). Nicht geöffnet, weil die
  API-Referenz ein eigener Baum ist und die Lesung den Doku-ABSCHNITT zum Gegenstand hatte.
· /docs/getting-started/make-an-api-call/, /docs/overview/welcome/,
  /docs/changelog/changelog/ — Nachbarn ohne Katalog-Bezug.
· "Wichtige Konzepte" (übrige), "Mit Anzeigen arbeiten", "Mit Analytics und Berichten
  arbeiten", "Mit Katalogen arbeiten", "Mit Zielen und Zielgruppen arbeiten",
  "Entwicklertools", "Referenz" (übrige), "Web-Funktionen" — andere Produkte.
· HINTER EINER ANMELDESCHRANKE, NICHT BETRETEN: Ads Manager (Conversion-Token-Erzeugung,
  Test-Ereignisse, Conversions Health), Conversion Tag Manager ("link requires login"),
  "My apps", Token Debugger, Postman-Sammlung, Help-Center-Tickets.
· Nicht-Pinterest-Ziele (Google-Dokumentation, OAuth-RFC, OWASP) — ausserhalb des
  Gegenstands.
