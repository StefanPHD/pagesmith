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
    Manager API (datamanager.googleapis.com) ist seit Dezember 2025 allgemein verfügbar.
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
    für Analytics-Properties ist dieser Weg freischaltungspflichtig, für
    Google-Ads-Konten nicht. Das Measurement Protocol ist HEUTE gangbar und ein KANDIDAT
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
