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
- ## Pinterest (Conversions API)

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
