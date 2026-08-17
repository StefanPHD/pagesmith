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

## Verzeichnis der Abschnitte

- ## LinkedIn (Conversions API)

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
