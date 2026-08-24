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

    B1 · WIE LAUTET DIE ENDPUNKT-ADRESSE — VERTAGT AUF LAUF 2, erwartet auf
    /reference/rest/v1/events/ingest.
    GELESEN 2026-08-24, /data-manager/api (Startseite, kein Doku-Stand ausgewiesen):
    Wirtsname und Versions-Segment stehen fest. Die Seite zeigt EINEN rohen Aufruf, aber
    für die FALSCHE Methode:
      POST https://datamanager.googleapis.com/v1/audiencemembers:ingest
    Das ist der ZIELGRUPPEN-Aufruf. DIE VOLLSTÄNDIGE URL DES EREIGNIS-AUFRUFS STEHT AUF
    KEINER DER SIEBZEHN SEITEN. Der Dienst heisst IngestionService, die Anfrage
    IngestEventsRequest.
    ABLEITUNG, AUSDRÜCKLICH ALS SOLCHE GEKENNZEICHNET UND KEIN BEFUND: nach dem Muster
    wäre ".../v1/events:ingest" zu erwarten. GELESEN ist das NICHT.

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
    JE DESTINATION: requestStatus aus { PROCESSING, SUCCESS, PARTIAL_SUCCESS, FAILURE } ·
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
