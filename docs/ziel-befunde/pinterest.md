# ZIEL-BEFUNDE — Pinterest

**WOHER DIESE DATEI STAMMT:** Der Abschnitt "Pinterest (Conversions API)" aus
docs/ziel-befunde.md, am 2026-09-22 hierher herausgeschnitten — ZEICHENGLEICH, aus den
Zeilen 7467 bis 8528 jener Datei. Kein Wort umformuliert, keine Angabe gekürzt, nichts
umsortiert, kein Kommentar ergänzt; die Reihenfolge ist die des Ursprungs.
DER BELEG: sha256 = 6401ff186ff06ff5d61b79dbea48fc6cc3937c1d38f313cef87cde3eed85d5bb über
den übernommenen Abschnitt — also über alles ab der Zeile "## Pinterest (Conversions API)"
bis zum Dateiende, OHNE diesen Kopf. Wer prüfen will, ob hier jemand nachträglich ein Wort
geändert hat, misst gegen diese Prüfsumme.

**WARUM ES DIE AUFTEILUNG GAB:** Die Sammel-Datei war für die VOLLLADUNG zu gross, die der
Pflicht-Stopp vor einem Zuschnitt verlangt. Die Pflicht ist damit nicht gelockert, sondern
wieder erfüllbar geworden — sie gilt seither DIESER Datei.

**WAS IM ÜBERNOMMENEN TEXT "DIESE DATEI" HEISST: DIE SAMMEL-DATEI VOR DER AUFTEILUNG, NICHT
DIESE HIER.** Der Text ist vor der Aufteilung geschrieben worden und ist nicht angefasst
worden; wer die Wendung wörtlich auf diese Datei bezieht, sucht an der falschen Stelle.
**INSBESONDERE "DER KOPF DIESER DATEI":** Die Konventionen — der Fortlauf der Buchstaben
über alle Protokolle eines Ziels, die Doppelbuchstaben-Form nach (z), die
Provenienz-Pflicht und die Verweis-Regel "EIN VERWEIS VON AUSSEN NENNT ABSCHNITT UND
BUCHSTABEN — NIE DEN BUCHSTABEN ALLEIN" — stehen im Kopf von docs/ziel-befunde.md. Sie sind
HIER NICHT wiederholt, und das ist kein Versäumnis: zwei Fassungen derselben Konvention
liefen auseinander, und jener Kopf sagt das über seine eigene Doppelbuchstaben-Regel selbst.

**QUERVERWEISE AUF EIN ANDERES ZIEL SIND SEIT DER AUFTEILUNG DATEI-GRENZEN.** Der
übernommene Text verweist an einzelnen Stellen auf einen anderen Ziel-Abschnitt (Formen:
"der Google-Abschnitt dieser Datei", "am LinkedIn-Teil (w) dieser Datei", 'Abschnitt "Meta
(Conversions API)", Teil (a)'). **Solche Stellen meinen die Datei des dort GENANNTEN Ziels
unter docs/ziel-befunde/** und bleiben auflösbar, weil sie ihr Ziel benennen. Sie sind
bewusst NICHT nachgezogen — ein Nachzug hätte die Zeichengleichheit gebrochen, die der
Beleg oben zusichert.

**WAS HIER NICHT STEHT — unverändert aus dem Kopf des Verzeichnisses:** KEINE Regeln, KEINE
Entscheidungen, KEIN Zuschnitt. Sie sagt, was IST, nicht was zu bauen ist.

**FORTSCHREIBUNG:** Ein weiteres Messprotokoll oder eine weitere Abschnitts-Lesung zu
DIESEM Ziel kommt HINTEN in DIESE Datei, unter eine eigene DATIERTE Unterüberschrift; die
Buchstaben laufen fort und beginnen nie neu. Das Verzeichnis bekommt dafür KEINE Zeile — es
führt Ziele, nicht Protokolle.

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
    VORBEHALT (2026-09-22) — DIE ZAHLEN OBEN SIND UNVERÄNDERT DIE DER RATE-LIMIT-SEITE UND
    DORT WEITERHIN ZU LESEN; ES GIBT INZWISCHEN EINE DRITTE ZAHL FÜR DENSELBEN ENDPUNKT:
    Die Endpunkt-Referenz nennt "a rate limit of 5,000 calls per minute per ad account" —
    ohne jeden Vorbehalt zum Träger des Zugangsdatums. Welche der drei Aussagen für einen
    gegebenen Zugangsweg gilt, ist UNGEMESSEN; die Gegenüberstellung steht unten unter
    (ai). Der Wortlaut oben wird NICHT umformuliert.
    ZUM WIEDERHOLUNGSVERHALTEN IST DER NICHT-TREFFER AM 2026-09-22 AN EINER BREITEREN ACHSE
    BESTÄTIGT WORDEN, nicht aufgelöst: zusätzlich zu den drei Seiten oben auch die
    Endpunkt-Referenz und die Fehlercode-Seite, je mit Positivkontrolle. Einzelheiten und
    Reichweite unten unter (ah).
    ZEIGER (2026-09-24) — DER WIDERSPRUCH DER DREI ZAHLEN IST GEMESSEN AUFGELÖST: Die
    Kopfzeilen dreier Antworten nennen 120 000 je 60 Sekunden, Kategorie
    `ads_conversions_ad_account_id`, für das verwendete Zugangsdatum; Grenze: drei
    Testanfragen. Unten unter (al)(iii). Der Wortlaut oben wird NICHT umformuliert.

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
    VORBEHALT (2026-09-22) — "NICHT GEFUNDEN" GILT NICHT MEHR, UND DIE VERMUTUNG ÜBER DEN
    ORT WAR FALSCH: Die Rollen stehen NICHT in der Business-Hilfe, sondern in der
    Endpunkt-Referenz — also in der Entwicklerdokumentation, und zwar auf genau der Seite,
    die am 2026-08-20 als "GESEHEN, NICHT GEÖFFNET" ausgeschlossen war. Der Wortlaut oben
    wird NICHT umformuliert: er sagt richtig, was auf den dreizehn Seiten JENER Lesung
    stand. Die Antwort auf Katalog-Frage I4 steht unten unter (aj).

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

(m) INSTRUMENT ZU H5 (taugliches Live-Test-Instrument): drei Kandidaten, davon EINER
    geprüft —
    **NACHGEZOGEN AM 2026-09-10.** Hier stand "drei Kandidaten, keiner geprüft"; das war
    für den 2026-08-20 richtig. **Kandidat (1), die Test-Ereignis-Ansicht, ist am
    2026-09-10 GEFAHREN und tauglich** (GEMESSEN LIVE, Stefan) — Volltext in den Teilen
    (u) und (w) dieses Abschnitts, samt dem Befund, dass sie ein LIVE-STROM OHNE RÜCKSCHAU
    ist. **Die Kandidaten (2) und (3) bleiben UNGEPRÜFT.** Der Wortlaut der drei
    Kandidaten unten ist unverändert:
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
      VORBEHALT (2026-09-22) — "KEINE FORMATREGEL" IST ÜBERHOLT: Die Endpunkt-Referenz
      führt den Pfad-Parameter `ad_account_id` als `string`, `required`, mit
      `<= 18 characters` und dem Muster `^\d+$`. Der Wortlaut oben wird NICHT
      umformuliert — er sagt richtig, was auf den dreizehn Seiten der Lesung vom
      2026-08-20 stand, und jene Seite war dort ausgeschlossen. Die Angabe steht unten
      unter (aj). Die Uneinheitlichkeit der Beispiele bleibt davon unberührt: zwölf und
      achtzehn Stellen erfüllen beide `<= 18` und `^\d+$`.
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
      VORBEHALT (2026-09-22) — DIE LISTE IST UM ZWEI LÄNGER, UND DER RANG FEHLTE GANZ:
      Es sind SIEBZEHN Felder, nicht fünfzehn — `fn` (Vorname) und `customer_type` stehen
      oben nicht. Ausserdem beantwortet erst die Lesung vom 2026-09-22 die Frage nach
      VERLANGT oder EMPFOHLEN je Merkmal, die diese Zelle ausdrücklich offenlässt. Der
      Wortlaut oben wird NICHT umformuliert; er benennt seine eigene Unvollständigkeit
      richtig. Die vollständige Liste mit Typ, Hashen und Rang steht unten unter (ae).
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
    (NACHGEZOGEN 2026-09-10: hier stand "mit dem Vorbehalt aus (p)(1)". **Der Vorbehalt
    ist für den BAU entfallen** — `test=true`, der Name, den der Adapter sendet, ist am
    2026-09-10 als wirksam GEMESSEN (Teil (u); GEMESSEN LIVE, Stefan). **TEIL (p)(1)
    BLEIBT WÖRTLICH STEHEN: die Spannung in der Anbieter-Doku besteht fort**, und
    `is_test` ist ungeprüft, nicht ausgeschlossen — s. Teil (v)).
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

### MESS-RUNDE 2026-09-10 gegen die Conversions API und die Anbieter-Oberfläche — die Teile (u) bis (z)

**HERKUNFT (2026-09-10) — SIE IST GETEILT, UND DIE TEILUNG GEHÖRT AN DEN ANFANG:** Die
Teile (u) bis (x) ruhen auf einer MESSUNG — vier Conversions gegen den echten Endpunkt,
gefahren vom **OWNER, LIVE, 2026-09-10**, dazu die Ablesungen an der Eventübersicht und der
Test-Ereignis-Ansicht des eigenen Werbekontos und eine Ablesung der Vercel-Logs. Teil (y)
ruht auf einer **DOKU-LESUNG DURCH DIE CHAT-INSTANZ, 2026-09-10**. Teil (z) ist ein
NICHT-TREFFER über das Werkzeug, kein Befund über den Inhalt.
**KEINE ANMELDUNG AUF EINER FREMDEN SEITE, KEINE EINGABE, KEIN DOWNLOAD** — die Ablesungen
am Werbekonto sind die des Owners an seinem eigenen Konto.

(u) DER TESTMODUS-PARAMETER IST GEMESSEN WIRKSAM, UND DIE ISOLATION AUCH.
    GEMESSEN LIVE, 2026-09-10, Stefan (Katalog-Frage H5 und die offene Namensfrage).
    **`test=true` GREIFT.** Ein mit diesem Query-Parameter gesendetes Ereignis erscheint
    **NICHT in der Eventübersicht des Werbekontos**; ein ohne ihn gesendetes erscheint.
    **DIE ISOLATION IST DAMIT GEMESSEN, NICHT MEHR NUR GELESEN** — die Doku-Aussage aus
    (m) ("test data is not processed for reporting or optimization") ist für die
    BERICHTERSTATTUNG belegt.
    **WAS DEN SCHLUSS TRÄGT, UND ES SIND ZWEI HÄLFTEN:** die ZÄHLUNG (vier Conversions
    gefeuert, der Zähler steht auf zwei — genau die zwei ohne Parameter; ein ignorierter
    Parameter ergäbe vier) UND der Ausschluss der Alternativursache: Der Anbieter hat die
    markierten Läufe **ANGENOMMEN UND VERARBEITET**, nicht abgelehnt — der Vercel-Log
    zeigt **200 OK** und eine INHALTLICHE Feld-Warnung, und eine Ablehnung erzeugt keine
    Feld-Warnung. **OHNE DIESE ZWEITE HÄLFTE WÄRE DIE ABWESENHEIT KEIN BEFUND**, sondern
    von "es ist gar nichts angekommen" nicht zu unterscheiden.
    **DIE ZAHLEN, ZEITSTEMPEL UND EREIGNIS-KENNUNGEN STEHEN HIER NICHT** — sie stehen im
    Archiv der Phase 11.3, docs/claude-history/phase-11.3-testmodus.md, VERMERK 3. Zweimal
    geschrieben liefen sie auseinander; dort
    steht das Protokoll, hier der Befund über den Anbieter.
    **DIE GRENZE, DIE MITMUSS:** Gemessen ist die BERICHTERSTATTUNG, **nicht die
    OPTIMIERUNG**. Die Doku nennt für die Sandbox beides; belegt ist die erste Hälfte.
    Und der Zählerstand NACH dem letzten Lauf ist UNGEMESSEN — der Beleg ruht auf den
    zwei markierten Läufen davor, nicht auf dem letzten.

(v) DIE NAMENS-SPANNUNG AUS (p)(1) IST FÜR DEN BAU ENTBEHRLICH GEWORDEN — UND NICHT
    AUFGELÖST.
    GEMESSEN LIVE, 2026-09-10, Stefan.
    **TEIL (p)(1) BLEIBT WÖRTLICH STEHEN** und wird von diesem Teil nicht ersetzt: Die
    Conversions-Seite sagt `test=true`, die Rate-Limit-Seite für denselben Endpunkt sagt
    `is_test=TRUE`. **BEIDE SÄTZE STEHEN WEITERHIN IN DER ANBIETER-DOKU.**
    **WAS DIE MESSUNG ENTSCHEIDET:** dass `test=true` **WIRKT** (s. (u)). Der gebaute
    Adapter sendet genau diesen Namen; er braucht den zweiten nicht.
    **WAS SIE AUSDRÜCKLICH NICHT ENTSCHEIDET:** ob `is_test` ebenfalls wirkt, ob es ein
    Alias ist oder ob es ins Leere geht. **ES IST NICHT GEPRÜFT WORDEN** — kein Lauf hat
    ihn gesendet.
    **„DIE ZWEI-NAMEN-FRAGE IST ENTSCHIEDEN" WÄRE ZU STARK.** Gemessen ist, dass der EINE
    Name wirkt, nicht, dass der andere es nicht tut. Der Unterschied zählt für jeden, der
    später einer Anbieter-Änderung nachgeht: Fiele `test=true` eines Tages aus, wäre
    `is_test` ein ungeprüfter Kandidat und keine bekannte Alternative.

(w) DIE TEST-ANSICHT IST EIN LIVE-STROM OHNE RÜCKSCHAU — KATALOG-FRAGE H5, JETZT MIT
    MESSERGEBNIS.
    GEMESSEN LIVE, 2026-09-10, Stefan.
    **DER BEFUND:** Die Test-Ereignis-Ansicht im Werbekonto zeigt **nur, was ankommt,
    WÄHREND sie geöffnet ist**. Ein Ereignis, das bei geschlossener Ansicht gesendet
    wurde, erscheint **auch später nicht** — es gibt keine Rückschau.
    **DER BELEG IST EIN POSITIV-/NEGATIV-PAAR AN DERSELBEN ANSICHT:** zwei Ereignisse bei
    GESCHLOSSENER Ansicht — nie erschienen; ein Ereignis bei GEÖFFNETER Ansicht — sofort
    erschienen. **DIE REIHENFOLGE SCHLIESST BLOSSE VERZÖGERUNG AUS:** ein SPÄTERES
    Ereignis erschien, während die FRÜHEREN nie erschienen — eine Ansicht, die nur
    nachhinkt, hätte das ältere zuerst gezeigt.
    **WAS SIE JE EREIGNIS ZURÜCKGIBT** (abgelesen an einem angekommenen Ereignis):
    Eventtyp · Kennung des Ereignisses · Plattform (hier: Web) · Eventquelle (hier: API) ·
    Empfangszeit · die empfangenen Daten (hier: User Agent und IP-Adresse) · eine
    **Warnliste je Parameter**.
    **DAS BEANTWORTET KATALOG-FRAGE H5 MIT EINEM ERGEBNIS STATT MIT EINEM KANDIDATEN.**
    Teil (m) führte drei Kandidaten und "keiner geprüft"; Kandidat (1) ist jetzt gefahren
    und tauglich. **TEIL (m) BLEIBT WÖRTLICH STEHEN** — seine Aussage war für ihren Tag
    richtig.
    **DIE AUFLAGE, DIE DARAUS FOLGT UND DIE JEDE LIVE-ANLEITUNG TRAGEN MUSS: DIE ANSICHT
    WIRD GEÖFFNET, BEVOR GESENDET WIRD.** Wer erst sendet und dann nachsieht, misst eine
    Abwesenheit, die das Instrument erzeugt hat und nicht der Gegenstand — genau die
    Fehlerklasse, die docs/immer-beachten.md unter "EINE ABWESENHEIT KANN VOM WERKZEUG
    ERZEUGT SEIN, NICHT VOM GEGENSTAND" führt.

(x) ZWEI WARNUNGEN AN UNSERER NUTZLAST: `external_id` UND `click_id` FEHLEN.
    GEMESSEN LIVE, 2026-09-10, Stefan — an der Test-Ansicht UND im Vercel-Log, also an
    zwei unabhängigen Stellen mit demselben Wortlaut.
    **DIE ANSICHT MELDETE ZU UNSEREM EREIGNIS ZWEI WARNUNGEN:** "external_id is missing"
    und "click_id is missing". Der Vercel-Log führt im selben Fenster dieselbe
    Pinterest-Forward-Warnung, **ohne einen einzigen Fehler**, bei bestätigtem 200 OK.
    **BEIDE BLOCKIEREN DIE VERARBEITUNG NACH ANBIETER-ANGABE NICHT** — das Ereignis ist
    angekommen und verarbeitet worden; die Warnung ist eine Qualitäts-Aussage, keine
    Ablehnung. Das deckt sich mit der Rumpfform aus (e), wo `warning_message` neben
    `error_message` als eigener Kanal geführt wird.
    **BEIDE SIND PERSONENBEZOGENE MERKMALE, UND GENAU DAS IST DER GRUND, WARUM SIE HIER
    NICHT ALS AUFGABE STEHEN:** `external_id` ist eine Nutzer-Kennung, `click_id` eine
    Klick-Kennung. Sie zu liefern hiesse, eine Datenklasse zu erheben, die Pagesmith heute
    nicht erhebt.
    **ZEIGER STATT NEUEM POSTEN:** Der Fall ist vom bestehenden offenen Punkt
    **"DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE"** (CLAUDE.md, "## Offene Punkte";
    Volltext in docs/offene-punkte.md) **VOLLSTÄNDIG GEDECKT** — dessen Trigger nennt
    Click-IDs ausdrücklich. **ES ENTSTEHT KEIN NEUER OFFENER PUNKT**, und dieser Teil trifft
    KEINE Entscheidung darüber, ob die zwei Merkmale je erhoben werden.
    **EIN BEFUND ÜBER DEN BESTAND, UNBEWERTET:** Die zwei Warnungen sind dieselbe Achse,
    die Teil (t) an der Qualitäts-Ansicht schon einmal gezeigt hat ("nicht eingerichtet"
    bei E-Mail, External ID, Product ID). Dort war der Prüfling leer; hier ist er es nicht
    mehr, und die Lücke ist dieselbe geblieben.
    ZEIGER (2026-09-24) — DIE WARNZEILE IM VERCEL-LOG IST ERKLÄRT: Jede Antwort trägt die
    Warnung "external_id is missing … click_id is missing" (GEMESSEN, drei Läufe mit
    `?test=true`), und `evaluateSuccessBody` macht aus jeder nicht leeren Warnung eine
    Logzeile. Unten unter (al)(iv). Der Wortlaut oben wird NICHT umformuliert.

(y) EINE SPANNUNG ZUR ZUGRIFFSSTUFE — ABGELEGT UND NICHT BEWERTET.
    **GELESEN 2026-09-10 DURCH DIE CHAT-INSTANZ** (nicht durch CC, **NICHT GEMESSEN**),
    help.pinterest.com, Artikel "The Pinterest Conversions API".
    **WAS DORT STEHT:** Die Conversions API verlange **KEINE Anwendung und KEINE gültige
    App-ID**; ein Business-Konto und ein über die Conversions-Seite erzeugtes Token
    genügten.
    **WORAN DAS RÜHRT:** CLAUDE.md sagt, Pinterest verlange für die höhere Zugriffsstufe
    eine Vertragsannahme und ein Prüfverfahren. Die Teile (f) und (h) dieses Abschnitts
    tragen dieselbe Aussage aus der Entwickler-Doku (Trial-Freigabe, Standard-Upgrade mit
    Video-Nachweis).
    **DIE SPANNUNG WIRD HIER ABGELEGT UND AUSDRÜCKLICH NICHT BEWERTET.** Es können ZWEI
    ACHSEN sein — die CONVERSIONS API gegen die weitere Pinterest-API —, und der Artikel
    trennt sie selbst. Dann widerspräche nichts, und beide Aussagen wären für ihren
    Gegenstand richtig.
    **WAS DAGEGEN SPRICHT, DAS HIER ZU ENTSCHEIDEN:** Die Quellen sind von verschiedener
    Art (Hilfe-Artikel gegen Entwickler-Doku), keine der beiden ist gemessen, und die
    Aussage in CLAUDE.md trägt dort eine Folge für die kommerzielle Stufe.
    **CLAUDE.md IST IN DIESER RUNDE NICHT ANGEFASST WORDEN**, und es wird hier auch nicht
    vorgeschlagen, es anzufassen.

(z) DIE BENANNTE LÜCKE: DIE ENDPUNKT-REFERENZ IST WEITERHIN UNGELESEN — UND DER
    NICHT-TREFFER STAMMT VOM WERKZEUG.
    **developers.pinterest.com/docs/api/v5/events-create/ IST NICHT GELESEN.**
    **DER VERSUCH IST GEFAHREN WORDEN, 2026-09-10, DURCH DIE CHAT-INSTANZ**, und er hat
    **nur das Seitengerüst ohne Rumpf** geliefert.
    **DAS IST EINE VOM WERKZEUG ERZEUGTE ABWESENHEIT UND KEIN BEFUND ÜBER DEN INHALT** —
    dieselbe Fehlerklasse, die docs/immer-beachten.md unter "EINE ABWESENHEIT KANN VOM
    WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND" führt, und die im Google- wie im
    Vercel-Abschnitt schon zweimal aufgetreten ist.
    **WER SIE SCHLIESSEN WILL, BRAUCHT `textContent` STATT `innerText`** — an beiden
    früheren Fällen lag genau dort der Unterschied (115 157 gegen 40 271 Zeichen beim
    einen, die ganze Tarif-Tabelle beim anderen). Ein zweiter Versuch mit demselben
    Instrument ist kein zweiter Versuch.
    **WARUM DIE LÜCKE ZÄHLT:** Genau dort stehen laut Anbieter die PFLICHTFELDER — s. (q),
    wo das Parameter-Verzeichnis ausdrücklich sagt, dass es sie NICHT benennt. Sie ist seit
    dem 2026-08-20 als "GESEHEN, NICHT GEÖFFNET" geführt und **bleibt es unverändert**;
    dieser Teil verschiebt nur den Grund — damals nicht geöffnet, heute nicht lesbar
    bekommen.

### Ablesung an der Anbieter-Oberfläche (2026-09-10) — der Teil (aa)

**HERKUNFT (2026-09-10):** Eine ABLESUNG des OWNERS an seinem EIGENEN Werbekonto — kein
Aufruf gegen die Schnittstelle, keine Anmeldung auf einer fremden Seite, keine Eingabe.
Sie fällt auf denselben Tag wie die MESS-RUNDE darüber und steht trotzdem als EIGENE
Unterüberschrift: Jene misst gegen den Endpunkt, diese liest einen NAMEN ab, und ihr
Herkunfts-Kopf teilt seine Teile (u) bis (z) einzeln nach Provenienz auf. Ein
angehängtes (aa) machte jene Aufteilung stillschweigend falsch.

(aa) DER NAME DER TEST-ANSICHT IN PINTERESTS OBERFLÄCHE — UND ER IST SPRACHABHÄNGIG.
     GELESEN AN DER OBERFLÄCHE, Owner, 2026-09-10.
     **DER NAME:** Unter "Conversions" heisst der Navigationspunkt **"Events testen"**;
     die Karte darin heisst **"Conversions API-Events testen"**.
     **WELCHE ANSICHT DAS IST:** dieselbe, deren VERHALTEN Teil (w) misst — der Live-Strom
     ohne Rückschau. (w) sagt, WAS sie tut, und benennt sie beschreibend; dieser Teil nennt
     ihr LABEL. **DASS ES DIESELBE ANSICHT IST, IST EINE FOLGERUNG** aus dem Weg dorthin
     und nicht eigens gemessen.
     **DIE GRENZE IST DER EIGENTLICHE INHALT DIESES TEILS:** Das ist die **DEUTSCHE**
     Oberfläche. Ein Kunde mit englischem Konto liest an derselben Stelle etwas anderes.
     **AN KEINEM ENGLISCHEN KONTO GEMESSEN** — dass der Name sprachabhängig ist, ist eine
     ABLEITUNG daraus, dass es eine übersetzte Oberfläche ist, und keine Messung.
     **WER DEN DEUTSCHEN NAMEN OHNE DIESEN VERMERK ÜBERNIMMT, ÜBERNIMMT EINE ANGABE, DIE
     FÜR EINEN TEIL DER NUTZER SCHLICHT FALSCH IST** — und sie sieht hier aus wie jede
     andere abgelesene Angabe.
     **DIE FOLGE, DIE DEN BEFUND ERST NÜTZLICH MACHT — ALS FOLGERUNG GEKENNZEICHNET UND
     NICHT ALS AUFLAGE:** Ein hartkodiertes Label in einem Kundentext wäre für ein
     anderssprachiges Konto falsch. Der Hinweis an der Pinterest-Karte nennt die Ansicht
     deshalb BESCHREIBEND — "Test-Ansicht im Werbekonto zuerst öffnen, dann auslösen." —
     und nicht mit ihrem Label; GEBAUT in Scheibe 11.3f (GEMESSEN am Repo, CC, 2026-09-10:
     `testModeAnbieterAuskunft` in `src/components/TargetCard.tsx`).
     **DIE ENTSCHEIDUNG DAHINTER STEHT NICHT HIER**, sondern im Archiv der Phase 11.3,
     docs/claude-history/phase-11.3-testmodus.md — diese Datei trägt Befunde, keine
     Entscheidungen.

### Browser-Tag-Lesung 2026-09-21 (Crawl 2 der Phase 11.11) — der Teil (ab)

**HERKUNFT (2026-09-21):** Eine Lesung mit dem Browser-Werkzeug, durchgehend über
`textContent` und über das Hauptelement statt über `body`. GELESEN wurden ZWEI Seiten; die
Liste steht am Ende dieses Teils. **KEIN AUFRUF GEGEN DIE SCHNITTSTELLE**, keine Anmeldung,
keine Eingabe auf einer fremden Seite, kein Download. Alles unten ist GELESEN und **ersetzt
keine Messung**.

**DER GEGENSTAND IST EIN ANDERER ALS IN ALLEN TEILEN DARÜBER:** Gesucht wurde das
BROWSER-TAG des Anbieters — Script-Adresse, globale Namen, `noscript`-Rückfall —, weil die
Phase 11.11 fremde Tracking-Bausteine in importiertem HTML ERKENNEN will. Über die
Conversions API sagt dieser Teil NICHTS.

(ab) DER PINTEREST TAG — ADRESSE, GLOBALE NAMEN UND EIN RÜCKFALL JE EREIGNIS.
     GELESEN 2026-09-21 an developers.pinterest.com/docs/track-conversions/pinterest-tag/
     ("Pinterest Developers | Pinterest tag", Überschrift "Track conversions with Pinterest
     Tag", Rumpf rund 34 260 Zeichen), Abschnitte "Base code", "Event code template",
     "Event data in the img tag" und "Copy event code examples".
     · **(a) DIE SCRIPT-ADRESSE:** `https://s.pinimg.com/ct/core.js`, im Basiscode als
       Argument der sofort ausgeführten Funktion übergeben und zur Laufzeit als
       `<script async>` eingehängt. **NUR IM BEISPIEL**; der Fliesstext nennt keine
       Adresse. **EINE ALTERNATIVE ADRESSE IST NICHT GENANNT.**
     · **(b) DIE GLOBALEN NAMEN:** `window.pintrk` samt `window.pintrk.queue` und
       `pintrk.version` (Wert `"3.0"` im Beispiel). Die charakteristischen Aufrufe:
       `pintrk('load', 'YOUR_TAG_ID');` · `pintrk('page');` · `pintrk('track', '<Event>')`,
       optional mit einem Datenobjekt. **NUR IM BEISPIEL**; der Fliesstext spricht von
       "base code" und "event code", ohne die Namen zu nennen.
       **EINE FALLE FÜR EINE SIGNATUR AUF DEN EREIGNISNAMEN:** Dieselbe Seite schreibt sie
       in BEIDEN Schreibungen — `pintrk('track', 'AddToWishList')` und
       `pintrk('track', 'checkout')`, `'pagevisit'`, `'watchVideo'`, `'addtocart'`. Der
       Anbieter nennt eigene Ereignisnamen ausdrücklich "treated as case insensitive"
       (FLIESSTEXT).
     · **(c) DER `noscript`-RÜCKFALL: VORHANDEN, UND ES IST NICHT NUR EINER.** Im
       Basiscode:
       `<noscript><img height="1" width="1" style="display:none;" alt=""
       src="https://ct.pinterest.com/v3/?tid=YOUR_TAG_ID&noscript=1" /></noscript>`.
       **JE EREIGNIS KOMMT EIN WEITERES HINZU** — der Fliesstext verlangt es ausdrücklich:
       "Specify the event type in two places: In JavaScript code within a script tag · In an
       image tag within a noscript block". Die Ereignis-Gestalt lautet
       `https://ct.pinterest.com/v3/?tid=YOUR_TAG_ID&event=<Event>&noscript=1`, Ereignisdaten
       als `&ed[value]=…`, `&ed[line_items][0][product_id]=…` und so fort.
       **ZWEI HOSTS, NICHT EINER:** das Script liegt auf `s.pinimg.com`, der Rückfall auf
       `ct.pinterest.com`. Eine Erkennung, die nur den Script-Host kennt, übersieht eine
       Seite, die **NUR** das Bild-Tag trägt — und genau das lässt der Anbieter im
       Fliesstext zu: "if you choose you can include only the image tag event code without
       JavaScript. In this case you do not need the base code."

**DER GELESENE UMFANG (2026-09-21) — Pinterest, Browser-Tag**

**GEÖFFNET UND GELESEN (2 Seiten):**
1. `developers.pinterest.com/docs/track-conversions/understand-conversions-and-how-to-track-them/`
   — "Understand conversions and how to track them" (rund 6 530 Z.) — trägt die
   Gegenüberstellung von API und Tag und die Tabelle "Name in API / Name in Tag"; **kein
   Code, keine Adresse.**
2. `developers.pinterest.com/docs/track-conversions/pinterest-tag/` — "Pinterest tag"
   (rund 34 260 Z.) — die tragende Fundstelle für (ab).

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `developers.pinterest.com/docs/track-conversions/…` in den Zweigen
  `track-conversions-in-the-api`, `define-your-own-event-types`, `remove-users-from-events`,
  `get-event-quality-score`, `use-limited-data-processing-flag` — **SACHLICHER AUSSCHLUSS:**
  Server-Weg bzw. Datenschutz-Kennzeichen, in den Teilen (a) bis (aa) behandelt.
· `integrate-third-party-tracking-tools` — **BUDGET-AUSSCHLUSS**, und es ist der
  naheliegendste Ort für eine ABWEICHENDE Gestalt (Tag-Manager-Vorlagen, Partner-Container).
· "Pinterest Tag Helper" (eigener Unterabschnitt neben "Conversion-Tracking mit
  Pinterest-Tag") — **BUDGET-AUSSCHLUSS.** Ein Prüfwerkzeug ist ein möglicher Ort für eine
  Aussage darüber, woran der Anbieter sein eigenes Tag erkennt.
· `ads.pinterest.com` (Conversion Tag Manager, Eventübersicht) — hinter einer Anmeldung,
  nicht betreten.

### Abschnitts-Lesung 2026-09-22 (Anbieter-Crawl der Phase 11.7) — die Teile (ac) bis (ak)

**HERKUNFT (2026-09-22):** Eine ABSCHNITTS-LESUNG der Anbieter-Dokumentation mit dem
Browser-Werkzeug, nach der Regel "ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN"
(docs/immer-beachten.md). GELESEN wurden DREIZEHN Seiten; die Liste steht am Ende dieses
Teils unter "Der gelesene Umfang (2026-09-22)". Durchgehend `textContent`, durchgehend an
der ENGLISCHEN Fassung — die Navigation der Seiten ist deutsch lokalisiert, die
Artikel-Rümpfe waren englisch und sind als solche zitiert.
**KEIN AUFRUF GEGEN DIE SCHNITTSTELLE**, keine Anmeldung, keine Eingabe auf einer fremden
Seite, kein Download, keine Auszugsdatei. **KEINE SEITE HAT VERSUCHT, DEN LESENDEN
ANZUWEISEN** — geprüft und ausdrücklich vermerkt.
**ALLES UNTEN IST GELESEN UND ERSETZT KEINE MESSUNG.** Wo eine Angabe den eigenen Code
beschreibt, steht GEMESSEN dabei.

(ac) DIE KLICK-KENNUNG — SIE HEISST `epik`, UND SIE HAT ZWEI HERKUNFTSWEGE MIT EINEM
     AUSDRÜCKLICHEN VORRANG.
     GELESEN 2026-09-22, https://developers.pinterest.com/docs/api/v5/events-create/
     ("Send conversions", Spec-Stand "Pinterest REST API 5.31.0") und
     https://developers.pinterest.com/docs/track-conversions/track-conversions-in-the-api/
     ("Track conversions in the api", Abschnitte "Format server event parameters" und
     "Format user data parameters").
     · **DER FELDNAME IST `click_id`, DER NAME DES WERTS IST `epik`** — "The **epik
       (External Pinterest ID Key)** value is a unique identifier that Pinterest uses to
       help track users across devices and sessions."
     · **ZWEI HERKUNFTSWEGE, im Schema in EINEM Satz:** "The unique identifier stored in
       `_epik` cookie on your domain or `&epik=` query parameter in the URL." Zum
       Adressweg zusätzlich: "It is typically passed as a query parameter in your URLs,
       for example, after a click on a Pinterest ad."
     · **DER VORRANG STEHT WÖRTLICH DA, und er zeigt auf den COOKIE:** "Use the `_epik`
       cookie instead of the `&epik=` query parameter. While both are accepted, passing
       `_epik` cookie values is necessary when a URL parameter is missing or removed and
       ensures greater coverage."
     · **DER ORT IN DER NUTZLAST:** `user_data.click_id`, im Schema `"type": "string"`,
       `"nullable": true` — **eine Zeichenkette, KEIN Array.** Das unterscheidet sie von
       `em`, `ph`, `ct`, `external_id` und den übrigen gehashten Merkmalen, die im Schema
       sämtlich Arrays sind.
     · **RANG: EMPFOHLEN, NICHT VERLANGT.** Schema: "We highly recommend this on checkout
       events at least. It may improve reporting performance such as ROAS/CPA." Die
       Parameter-Tabelle nennt als Ereignisse `add_to_cart`, `checkout`, `lead`,
       `page_visit`, `search`, `signup`, `view_category`, `watch_video`; Plattformen Web
       und App. Sie beschreibt das Feld als "Cookie generated when a user clicks an ad."
     · **DAS FORMAT IST NICHT BEANTWORTET.** Keine Formatregel, keine Länge, kein Muster.
       Die zwei Beispielwerte sind lange, base64-ähnliche Zeichenketten
       (`dj0yJnU9b2JDcFFHekV4SHJNcmVrbFBkUEdqakh0akdUT1VjVVUm…`) und werden **nirgends als
       Format bezeichnet**. NICHT-TREFFER mit benannter Reichweite über alle dreizehn
       gelesenen Seiten.
     **NICHT BEANTWORTET, WEIL NUR EIN AUFRUF ES ZEIGT:** ob der Endpunkt einen Wert dieser
     Form fachlich annimmt. Gemessen gesendet hat unser Adapter bisher kein `click_id` —
     Teil (x) protokolliert die Live-Warnung "click_id is missing".
     **EIN DRITTER COOKIE-NAME STEHT IN DERSELBEN DOKUMENTATION; s. unten (ai).**

(ad) DAS BROWSER-TAG SETZT FIRST-PARTY-COOKIES — DASS DARUNTER `_epik` IST, IST NICHT
     GELESEN.
     GELESEN 2026-09-22, https://developers.pinterest.com/docs/track-conversions/pinterest-tag/
     ("Pinterest tag", Abschnitt "First party cookies", Rumpf rund 34 260 Zeichen).
     · "The Pinterest Tag can create and access **cookies in a first party context** on
       the partner's site domain, providing better visibility into the Pinterest traffic
       they're getting on their site." · "You always have the option to delete first-party
       cookies by updating your base code to set the **`fp_cookie`** parameter to
       `false`." · "The Pinterest Tag can also create and access **localstorage** in a
       first party context on the partner's site domain."
     · **DIE VERBINDUNG ZU (ac) IST NICHT GELESEN:** `epik` kommt auf dieser Seite
       **NULL-mal** vor (Reichweite: der vollständige Artikel-Rumpf, `textContent`). Dass
       das Tag das `_epik`-Cookie setzt, ist eine naheliegende Vermutung und **bleibt
       eine**.
     · **EINE BROWSER-KENNUNG IM SINNE EINES BENANNTEN NUTZLAST-FELDES GIBT ES BEI DIESEM
       ANBIETER NICHT** — `user_data` trägt kein Gegenstück zu Metas `fbp`; die
       vollständige Feldliste steht unter (ae).
     **GEMESSEN AM EIGENEN REPO (CC, 2026-09-22, HEAD `8cab827`) — UNSER AUSGELIEFERTER
     TEXT TRÄGT KEIN TAG DIESES ANBIETERS:** Achse `pintrk|s\.pinimg|ct\.pinterest|core\.js|_epik|epik`
     über `src/**/*.ts(x)`; im Produktivcode genau DREI Treffer, alle in
     `src/lib/foreign-signatures.ts` — also in der Erkennung FREMDER Pixel aus Phase
     11.11, in keinem Erzeuger. `_epik` und `epik` je NULL im ganzen Repo.
     POSITIVKONTROLLE im selben Lauf: `connect.facebook.net` trifft
     `src/lib/tracking/meta.ts` — die Suche findet einen Tag-Erzeuger, wenn es einen gibt.
     **DIESER TEIL ERGÄNZT (ab) UND WIDERSPRICHT IHM NICHT:** `fp_cookie` und die
     localStorage-Aussage stehen dort nicht.

(ae) DIE VOLLSTÄNDIGE MERKMALSLISTE — SIEBZEHN FELDER, JE MIT TYP, HASHEN UND RANG.
     GELESEN 2026-09-22, Endpunkt-Referenz (eingebettetes Schema) und Conversions-Seite
     (Tabelle "User data parameters"), Quellen wie in (ac).
     **DIE PFLICHT LIEGT AUF DEM OBJEKT, NICHT AUF EINEM MERKMAL:** `user_data` ist
     Pflichtfeld des Ereignisses und "must include at least one of the following: 1) `em`,
     2) `hashed_maids` or 3) pair `client_ip_address` + `client_user_agent`". Die
     Einzelfelder darin sind "all optional and all strings". **KEIN EINZIGES
     `user_data`-FELD IST VERLANGT.**
     Spalte "Rang" = die Spalte "Recommended for or optional for events?" der
     Anbieter-Tabelle.

     | Feld | Typ | Hashen | Rang | Plattform |
     |---|---|---|---|---|
     | `em` E-Mail | Array | ja, SHA-256, lowercase | Recommended for all events | alle |
     | `ph` Telefon | Array | ja, SHA-256, nur Ziffern m. Ländervorwahl | Recommended for all events | alle |
     | `fn` Vorname | Array | ja, SHA-256, lowercase | Recommended for all events | alle |
     | `ln` Nachname | Array | ja, SHA-256, lowercase | Recommended for all events | alle |
     | `db` Geburtsdatum | Array | ja, SHA-256 von `YYYYMMDD` | Recommended for all events | alle |
     | `ge` Geschlecht | Array | ja, SHA-256 von `f`/`m`/`n` | Recommended for all events | alle |
     | `ct` Stadt | Array | ja, SHA-256 | Recommended for all events | alle |
     | `st` Bundesland | Array | ja, SHA-256, zwei Buchstaben | Recommended for all events | alle |
     | `zp` PLZ | Array | ja, SHA-256, nur Ziffern | Recommended for all events | alle |
     | `country` Land | Array | ja, SHA-256, ISO-3166 zweistellig | Recommended for all events | alle |
     | `hashed_maids` GAID/IDFA | Array | ja, SHA-256 | Recommended for all events | App |
     | `external_id` | Array | ja, SHA-256 | Recommended for all events | alle |
     | `click_id` | **String** | **nein** | **Recommended**, 8 Ereignistypen (s. (ac)) | Web, App |
     | `client_ip_address` | String | **nein** — roh | Recommended for all events | Web |
     | `client_user_agent` | String | **nein** — roh | Recommended for all events | Web, App |
     | `partner_id` | String | **nein** | **Optional for all events** — "Use only if you are a Pinterest integration partner" | alle |
     | `customer_type` | String, Enum `new`/`returning` | **nein** | *im Schema geführt, in der Tabelle der Conversions-Seite NICHT* | — |

     **`client_ip_address` IM SCHEMA:** "The user's IP address, which can be either in
     IPv4 or IPv6 format." Die Conversions-Seite ergänzt: "Valid IPv4 or IPv6. No pure
     zero (0.0.0.0) addresses."
     **`client_user_agent` TRÄGT EINE FORM-AUFLAGE, die in keinem Teil darüber steht:**
     "Include at least two of each of these information categories: OS family · browser
     family · device family. Do not send 'Other' or null. Do not send user agents produced
     by bot."
     **DARF EIN EREIGNIS MEHRERE KENNUNGEN ZUGLEICH TRAGEN? — JA, AUF DOKU-EBENE
     EINDEUTIG.** Das Beispiel des Anbieters im eigenen Schema trägt alle siebzehn
     Merkmale in EINEM `user_data`-Objekt gleichzeitig; die gehashten Merkmale sind
     ausserdem Arrays, und `em` wie `hashed_maids` tragen dort je ZWEI Werte. **EINE
     OBERGRENZE WIRD NICHT GENANNT.**
     **DAS IST EINE AUSSAGE ÜBER DIE ZULÄSSIGKEIT, NICHT ÜBER DIE ANNAHME AM ENDPUNKT.**
     Gemessen gesendet hat unser Adapter bisher genau das Paar `client_ip_address` +
     `client_user_agent`; ein Ereignis mit einer dritten Kennung ist nie gesendet worden.
     **NICHT BEANTWORTET, WEIL NUR EIN AUFRUF ES ZEIGT.**
     **EIN ZWEITER ORT FÜR DEN USER-AGENT, der leicht übersehen wird:**
     `app_info.user_agent` — "User Agent request header. Primarily used for Web events",
     `maxLength: 16384`. Er liegt NICHT in `user_data` und ist **kein** Mitglied der
     Mindestregel.
     **PERSONENBEZOGENES — NUR AUFGEZÄHLT, NICHT EINGEORDNET:** `em`, `ph`, `fn`, `ln`,
     `db`, `ge`, `ct`, `st`, `zp`, `country`, `hashed_maids`, `external_id`, `click_id`,
     `client_ip_address`, `client_user_agent`, `partner_id`. **KEINE
     DATENKLASSEN-ZUORDNUNG** — diese Datei trägt Befunde, keine Entscheidungen.
     **DAS EINZIGE FELD DIESER LISTE, DESSEN WERT DER SENDER SELBST VERGEBEN MÜSSTE, IST
     `external_id`** — "a unique id from the advertiser that identifies a user in their
     space, e.g. user id, loyalty id"; SHA-256 verlangt; "We highly recommend this on all
     events." **EINE ABLAUF- ODER BINDUNGSDAUER NENNT DER ANBIETER NICHT** — NICHT-TREFFER
     mit benannter Reichweite über die dreizehn Seiten. Alle übrigen Merkmale sind
     fremdvergeben oder kommen aus der Anfrage.

(af) DIE SEITENADRESSE — DER ANBIETER BITTET UM SEINE EIGENE KENNUNG IM ADRESSFELD; OB ER
     SIE SELBST AUSLIEST, SAGT ER NICHT.
     GELESEN 2026-09-22, Conversions-Seite, Abschnitt "Format server event parameters",
     Zeile `event_source_url`; dazu das Schema der Endpunkt-Referenz.
     · **RANG UND TYP:** `event_source_url`, `string, nullable`, **Optional**, Plattform
       Web, "Recommended for all events". Das Schema sagt dazu nur: "URL of the web
       conversion event."
     · **ZUM INHALT DES ADRESSFELDS SAGT DIE DOKU AUSDRÜCKLICH ETWAS, UND SIE VERLANGT DEN
       QUERY-STRING:** "Include the full URL path for the conversion event.
       `https://www.myshop.org/` — **For Pinterest click events, include `&epik` query
       string, a unique click identifier, in the URL.**" Beispiel der Doku:
       `https://www.myshop.org/checkout?epik=123abc456def789ghi`.
     · **OB DER ANBIETER DARAUS SELBST AUSLIEST: NICHT BEANTWORTET — DIE DOKU SCHWEIGT.**
       Keine der dreizehn gelesenen Seiten sagt, dass Pinterest `epik` aus dem übergebenen
       `event_source_url` PARST. NICHT-TREFFER mit benannter Reichweite; `parse` trifft auf
       der Conversions-Seite genau einmal und betrifft dort einen Zahlenwert, nicht die
       Adresse.
     · **ÜBER FREMDE KENNUNGEN IM ADRESSFELD** — ein `gclid`, ein `fbclid` — **schweigt die
       Doku vollständig**, NICHT-TREFFER mit derselben Reichweite.
     **DIE ABGRENZUNG GEHÖRT DAZU, sonst wird aus einer Bitte eine Zusage:** Dass der
     Anbieter um `&epik` in der Adresse BITTET, ist etwas anderes als die Aussage, dass er
     die Adresse AUSLIEST. Beim dritten Ziel steht der zweite Satz wörtlich da (Abschnitt
     "TikTok (Events API 2.0)", Teil (m)); **hier steht er nicht.** **MESSUNG OFFEN.**
     **OB DAS BENANNTE FELD `user_data.click_id` UND DER ADRESSWEG EINANDER ERSETZEN,
     ERGÄNZEN ODER DOPPELN, SAGT KEINE GELESENE SEITE.**

(ag) DIE VERSIONIERUNG — KEIN LEBENSZYKLUS, KEIN TERMIN, UND DIE ANKÜNDIGUNG HÄNGT AN
     EINER REGISTRIERTEN APP.
     GELESEN 2026-09-22.
     · **KEIN DOKUMENTIERTER LEBENSZYKLUS UND KEIN ABSCHALTTERMIN FÜR `v5`** —
       NICHT-TREFFER mit benannter Reichweite über VIER Seiten, je mit der Achse `sunset`,
       `deprecat`, `end of life`, `retire`, `v3`, `v4`:
       `…/docs/overview/welcome/` ("Welcome") · `…/docs/changelog/changelog/` ("Changelog")
       · `…/docs/api/v5/introduction/` · `…/docs/faqs/faqs/` ("API FAQs"). **`sunset` je
       NULL.**
     · **DIE SECHZEHN `deprecat`-TREFFER DES CHANGELOGS BETREFFEN AUSNAHMSLOS EINZELNE
       ENDPUNKTE ODER MERKMALE** — user interests, custom audience, gtin integer support,
       Pin notes creation, glitch OAuth tutorial, das alte Aktualisierungs-Token —
       **KEINER die Version.**
     · **DIE EINZIGE DEPRECATION-AUSSAGE DER ÜBERSICHTSSEITE BETRIFFT TLS**, nicht die
       API-Version: "Use Transport Layer Security (TLS) version 1.2 or later when calling
       the Pinterest API v5, as the 1.0 and 1.1 protocols are deprecated."
     · **DER SPEC-STAND DER REFERENZ HEISST "Pinterest REST API 5.31.0"** — eine
       Fassungsangabe der Spezifikation, kein Lebenszyklus.
     · **WAS STATT DESSEN DASTEHT, und es ist der operative Teil** (Übersichtsseite,
       Abschnitt "Maintaining your app"): "Our **Changelog** is the most up-to-date
       resource for information on breaking changes, deprecations, and new features in the
       Pinterest API. **For breaking changes we'll send an email notification to the
       contacts provided under your app's details.** In order to ensure you receive these
       notifications, be sure you have enabled business emails under your profile
       settings."
     **DIE ANKÜNDIGUNG HÄNGT DAMIT AN EINER REGISTRIERTEN APP.** Teil (r) hält fest, dass
     der Owner den Weg über die WERBE-Oberfläche genommen hat (Conversion-Token), nicht
     über eine App. **OB DIESER KANAL FÜR JENEN ZUGANGSWEG ÜBERHAUPT GREIFT, IST
     UNGELESEN UND UNGEMESSEN.**
     **WAS BEI EINEM ABLAUF GESCHIEHT: NICHT BEANTWORTET.** Es gibt keinen dokumentierten
     Ablauf, also auch keine dokumentierte Folge — weder eine stille Umleitung noch ein
     lautes Scheitern. **DAS IST AUSDRÜCKLICH KEINE ZUSAGE AUF UNBEFRISTETHEIT.**

(ah) DIE ERFOLGSANTWORT — FORM, ZÄHLUNGEN JE EREIGNIS UND EIN DOKUMENTIERTER TEILERFOLG
     MIT HTTP 200.
     GELESEN 2026-09-22, Endpunkt-Referenz (Response Sample `200`) und Conversions-Seite
     (Abschnitt "Example response").
     · **ERFOLGSRUMPF, Endpunkt-Referenz, im Wortlaut:**
       `{"events": [{"error_message": "", "status": "processed", "warning_message": ""}],`
       `"num_events_processed": 1, "num_events_received": 1}`
     · **TEILERFOLG IST DOKUMENTIERT UND AUSDRÜCKLICH**, Conversions-Seite, mit dem
       erklärenden Satz "The response indicates that one event was not sent because it was
       incorrectly named.":
       `{"num_events_received": 2, "num_events_processed": 1, "events": [`
       `{"status": "failed", "error_message": "Invalid event_name: subscription. Use a`
       `supported conversion event_name (for example subscribe, checkout).",`
       `"warning_message": null}, {"status": "processed", "error_message": null,`
       `"warning_message": null}]}`
     · **EIN ABGELEHNTES EREIGNIS KOMMT MIT HTTP 200** und erscheint als
       `status: "failed"` INNERHALB einer Erfolgsantwort — nicht als Fehler-Statuscode.
     · **BELEGTE STATUSWERTE JE EINTRAG: `"processed"` und `"failed"`. EINE ABSCHLIESSENDE
       ENUM-LISTE GIBT ES NICHT** — das Schema führt `status` nicht als Enum;
       NICHT-TREFFER mit benannter Reichweite über beide Seiten.
     · **`error_message` UND `warning_message` TRETEN IN BEIDEN LEERFORMEN AUF** — als `""`
       (Endpunkt-Referenz) und als `null` (Conversions-Seite).
     · **MENGEN:** `data` ist im Schema `minItems: 1, maxItems: 1000`. Im TESTMODUS gilt
       abweichend: "If you send multiple test events in a request, limit the batch to 20
       events. We only process the first 20 events in a batch."
     · **DER TESTMODUS-PARAMETER DER ENDPUNKT-REFERENZ HEISST `test`**, mit einer Angabe,
       die Teil (u) ergänzt: "Include query param `?test=true` to mark the request as a
       test request. **The events will not be recorded but the API will still return the
       same response messages.**" Dazu die Warnung: "If you use this query parameter, be
       certain that it is off (set to false or deleted) before sending a legitimate
       (non-testing) request."
     · **FEHLER-STATUSCODES DER REFERENZ:** 200, 400, 401, 403, 404, 422, **429** ("The
       user has sent too many requests in a given amount of time and is being rate
       limited"), 503 und `default`. Die Fehlerform heisst im Schema "Generic Error" und
       trägt `{"code": 2, "message": "AdAccount not found."}`.
     · **EINE VORGABE ZU WIEDERHOLUNGSVERSUCHEN NACH EINER 429 GIBT ES NICHT** —
       NICHT-TREFFER mit benannter Reichweite über VIER Seiten, je mit Positivkontrolle:
       Endpunkt-Referenz (`retry` 0) · Rate-Limit-Seite (`retry` 0, `back off` 0,
       `too many` 0; Positivkontrolle `ads_conversions` 1) · Fehlercode-Seite (`429` 0,
       `retry` 0 — sie sagt selbst "Many errors not covered here are specific to a
       particular endpoint") · FAQ (`retry` 0, `429` 0; Positivkontrolle `rate limit` 5).
       Das bestätigt den Nicht-Treffer aus Teil (e) an einer breiteren Achse.
     **DER ABGLEICH MIT DEM GEBAUTEN ADAPTER — GEMESSEN am Repo (CC, 2026-09-22, HEAD
     `8cab827`), `evaluateSuccessBody` in `src/lib/capi/pinterest-forward.ts`:** Der Code
     prüft `num_events_received === 1`, `num_events_processed === 1`, genau EINEN Eintrag
     in `events[]` und dort `status === "processed"`; ein nicht leeres `warning_message`
     wird geloggt, ohne den Vorgang zu verwerfen. **DAS DECKT SICH MIT DER OBEN GELESENEN
     FORM** — für unsere Ein-Ereignis-Nutzlast ist `1/1` die dokumentierte Erfolgsform, und
     das Teilerfolg-Beispiel `2/1` belegt, dass die Ungleichheit real vorkommt.
     **`sanitizeProviderText` gibt für einen Nicht-String `"-"` zurück** und deckt damit
     `""`, `null` und ein FEHLENDES Feld gleich ab.
     **DAS BLEIBT EINE MESSFRAGE — Katalog-Frage G1 IST NICHT BEANTWORTET.** Alles oben ist
     GELESEN. Ob der Endpunkt bei unserer echten Nutzlast genau diese Form liefert, zeigt
     erst ein Aufruf; die Doku ist hier der Massstab einer späteren Messung, **nicht ihr
     Ersatz**.
     ZEIGER (2026-09-24) — DER ERFOLGSRUMPF IST GEMESSEN, UND DAS subscription-BEISPIEL IST
     WIDERLEGT: Die Form oben deckt sich mit drei Antworten (GEMESSEN, `?test=true`);
     `subscription` kam als `processed` mit "Unknown"-Warnung zurück, nicht als `failed`.
     Ein Fehlerzweig "200 mit `failed`" ist damit nicht gemessen. Unten unter (al)(i) und
     (ii). Der Wortlaut oben wird NICHT umformuliert.

(ai) DREI DIVERGENZEN IN DER ANBIETER-DOKU SELBST — BERICHTET, NICHT AUFGELÖST.
     GELESEN 2026-09-22. Ohne Bewertung; keine der drei ist gemessen.
     **(1) DER COOKIE-NAME DER KLICK-KENNUNG STEHT IN ZWEI FASSUNGEN.** Schema und
     Conversions-Seite sagen `_epik` (s. (ac)). Die Seite
     `…/docs/track-conversions/integrate-third-party-tracking-tools/` ("Integrate third
     party tracking tools") beschreibt dasselbe Feld als "The unique identifier stored in,
     **`ptk` cookie** on your domain or `&epik=` query parameter in the URL. **Web
     fingerprint key to measure attributions.** It may improve reporting performance such
     as ROAS/CPA." **Welcher Cookie-Name gilt, ist UNGEMESSEN.**
     **EINE GRENZE, OHNE DIE MAN VON JENER SEITE DAS FALSCHE ABLEITET:** Sie beschreibt die
     Vorlage für Google-Tag-Manager-Server-Side-Tagging und führt durchweg eine ANDERE
     Feld-Benennung — `user_data.email_address`, `user_data.phone_number`,
     `user_data.user_agent`, `user_data.address.postal_code`. **Das ist das Schema jener
     Vorlage, nicht das des v5-Endpunkts.** Wer daraus Feldnamen für einen Adapter
     ableitet, leitet aus dem falschen Schema ab.
     **DER WORTLAUT "Web fingerprint key" IST HIER NUR ZITIERT.** Es findet **keine
     Datenklassen-Zuordnung** statt; diese Datei trägt Befunde, keine Entscheidungen.
     **(2) DREI RATE-LIMIT-AUSSAGEN FÜR DENSELBEN ENDPUNKT.**
     · Die **Rate-Limit-Seite** führt `ads_conversions` unverändert mit Trial 1 000
       Anfragen je Tag je Werbekonto je App und Standard **120 000** je Minute je
       Werbekonto je App — am 2026-09-22 an der Quelle gegengeprüft und unverändert.
     · Dieselbe Seite sagt weiterhin: "It is recommended that you use the conversion access
       token, which enables you to send **unlimited** conversion-tracking events."
     · Die **Endpunkt-Referenz** sagt: "This endpoint has a rate limit of **5,000 calls per
       minute per ad account**." **Ohne jeden Vorbehalt zum Träger des Zugangsdatums.**
     **WELCHE AUSSAGE FÜR EINEN GEGEBENEN ZUGANGSWEG GILT, IST UNGEMESSEN.** Teil (e) ist
     damit nicht widerlegt, sondern unvollständig; der Vorbehalt dort zeigt hierher.
     ZEIGER (2026-09-24) — FÜR DAS VERWENDETE ZUGANGSDATUM GEMESSEN AUFGELÖST: 120 000 je
     60 Sekunden, Kategorie `ads_conversions_ad_account_id`, aus den Kopfzeilen dreier
     Testanfragen. Unten unter (al)(iii). Der Wortlaut oben wird NICHT umformuliert.
     **(3) DREI AUSSAGEN ZU `partner_name`.**
     · **Conversions-Seite:** "Syntax: `ss-companyname`. **For direct integration, use
       value `direct`.**"
     · **Endpunkt-Schema:** "The third party partner name responsible to send the event to
       Conversions API on behalf of the advertiser. The naming convention is
       `\"ss-partnername\"` lowercase. E.g 'ss-shopify'" — **ohne `direct` zu erwähnen.**
     · **Drittanbieter-Seite:** "Only send this field if Pinterest has directly requested
       to include this field."
     **DER ADAPTER SENDET `partner_name: "direct"`** (GEMESSEN am Repo, CC, 2026-09-22).
     Teil (q) führt das als GEDECKT, gestützt auf die erste Aussage — **die steht
     unverändert da und trägt weiter.** Die zwei anderen sind neu und **nicht aufgelöst.**
     **EINE VIERTE SPANNUNG IST KEINE NEUE, SONDERN EINE BESTÄTIGTE:** Die Namensfrage aus
     Teil (p)(1) besteht am 2026-09-22 unverändert fort — die Endpunkt-Referenz führt
     `test`, die Rate-Limit-Seite führt am selben Endpunkt weiterhin `is_test`. **BEIDE
     SÄTZE STEHEN AN DER QUELLE.** Das bestätigt Teil (v) wörtlich; `is_test` bleibt
     ungeprüft, nicht ausgeschlossen.

(aj) WAS DIE ENDPUNKT-REFERENZ SONST TRÄGT — DIE PFLICHTFELDER, DIE ROLLEN, DIE FORMATREGEL
     — UND DIE GRENZE DIESER LESUNG.
     GELESEN 2026-09-22, https://developers.pinterest.com/docs/api/v5/events-create/.
     · **DIE PFLICHTFELDER JE EREIGNIS, aus dem Schema im Wortlaut:**
       `"required": ["action_source", "event_id", "event_name", "event_time", "user_data"]`.
       **DAS SCHLIESST DIE LÜCKE, DIE TEIL (q) BENENNT** — dort steht, das
       Parameter-Verzeichnis sage ausdrücklich, es benenne die Pflichtfelder NICHT, und
       verweise auf genau diese Seite. Die Conversions-Seite markiert dieselben vier
       Ereignis-Felder als "Required" und `event_source_url`, `opt_out` und `partner_name`
       als "Optional".
     · **DIE ROLLE DER ANMELDENDEN IDENTITÄT — KATALOG-FRAGE I4, JETZT BEANTWORTET:** "The
       token's `user_account` must either be the **Owner** of the specified ad account, or
       have one of the necessary roles granted to them via Business Access: **Admin,
       Analyst, Audience, Campaign**. (Note that the token can be used across multiple ad
       accounts under an user ID.)" **Der Klammersatz bestätigt Teil (s) an der Quelle** —
       jener war eine Ablesung an der Oberfläche.
     · **DIE FORMATREGEL DER KENNUNG:** `ad_account_id` als Pfad-Parameter, `string`,
       `required`, `<= 18 characters`, Muster `^\d+$`. **Das überholt die Angabe "KEINE
       Formatregel" in Teil (o)/C1**, der dort einen Vorbehalt trägt.
     · **DIE DEDUPLIZIERUNG, mit einem Satz, der in Teil (d) nicht steht:** "If the
       merchant is submitting this information using both Pinterest conversion tags and
       the Pinterest API, Pinterest will remove duplicate information before reporting.
       **(Note that events that took place offline cannot be deduplicated.)**"
     · **DIE RATE-LIMIT-KATEGORIE wird auf der Seite selbst genannt:** `ads_conversions`.
     **DIE GRENZE DIESER LESUNG, UND SIE GEHÖRT AN DEN BEFUND:** Die Seite trägt ZWEI
     Reiter-Gruppen — "Request Samples" und "Response Samples" (200, 400, 401, 403, 404,
     422, 429, 503, default). **DIE EINZELNEN RESPONSE-REITER SIND NICHT ANGEKLICKT
     WORDEN.** Gelesen ist statt dessen das im Seitenrumpf eingebettete OpenAPI-JSON, das
     die Antwortdefinitionen trägt; daher der 200-Rumpf und die "Generic Error"-Form in
     (ah). **DAS IST EINE ANDERE QUELLE ALS DER REITER: WER DEN GENAUEN RUMPF EINES 422,
     EINES 429 ODER EINES 503 BRAUCHT, HAT IHN HIER NICHT.**
     **WARUM DIE SEITE ÜBERHAUPT LESBAR WAR:** Teil (z) führt sie als "vom Werkzeug
     erzeugte Abwesenheit" und sagt, wer sie schliessen wolle, brauche `textContent` statt
     `innerText`. **DAS HAT GETRAGEN** — GEMESSEN am eigenen Lauf (CC, 2026-09-22): das
     `main`-Element gibt 8 563 Zeichen, der `body` **928 751**, und im `body` liegt das
     vollständige Schema. **TEIL (z) BLEIBT WÖRTLICH STEHEN**; seine Aussage war für ihren
     Tag richtig und hat den Weg gewiesen.

(ak) EIN ANGEKÜNDIGTER, UNDATIERTER SCHEMA-WECHSEL BERÜHRT GENAU DIE FELDER DES
     ERFOLGSRUMPFS.
     GELESEN 2026-09-22,
     https://developers.pinterest.com/docs/reference/schema-standardization-of-optional-nullable-fields/
     ("Schema standardization of optional nullable fields").
     **IM WORTLAUT:** "We are updating our API schema to **omit optional fields with null
     values** in JSON response payloads. These changes could impact your integration,
     depending on whether, or how, you ingest optional fields with null values." · "We are
     **gradually** applying this standard to **all endpoints** with optional fields that
     return null." · "We are applying this standard to endpoints on an ongoing basis and
     plan to apply it to **all public Pinterest API endpoints over time.**"
     **KEIN DATUM, KEINE ENDPUNKT-LISTE** — die Seite nennt weder einen Stichtag noch,
     welche Endpunkte bereits umgestellt sind.
     **WAS DAS FÜR DEN ERFOLGSRUMPF AUS (ah) HEISST, ALS FRAGE UND NICHT ALS ANTWORT:** Die
     dort gelesenen Beispiele führen `error_message` und `warning_message` als `null` bzw.
     `""`. **OB `num_events_received`, `num_events_processed` ODER `status` JE DARUNTER
     FALLEN KÖNNTEN, SAGT DIE SEITE NICHT.** **UNGEMESSEN.**
     **KEINE EMPFEHLUNG** und kein Vorschlag einer Änderung am Code; diese Datei trägt
     Befunde.

### Der gelesene Umfang (2026-09-22) — Pinterest, Klick-Kennung, Merkmale, Version, Erfolgsrumpf

**OHNE DIESE LISTE HAT JEDES "STEHT DORT NICHT" IN DEN TEILEN (ac) BIS (ak) KEINE
REICHWEITE.** Dreizehn Seiten, alle am 2026-09-22 abgerufen, durchgehend `textContent`.

**GEÖFFNET UND GELESEN (13 Seiten):**
1. `developers.pinterest.com/docs/api/v5/events-create/` — "Send conversions", Spec-Stand
   "Pinterest REST API 5.31.0" — **die tragende Fundstelle für (ac), (ae), (ah), (aj)**
2. `…/docs/track-conversions/track-conversions-in-the-api/` — "Track conversions in the
   api" (rund 28 266 Z.)
3. `…/docs/track-conversions/pinterest-tag/` — "Pinterest tag" (rund 34 260 Z.)
4. `…/docs/track-conversions/understand-conversions-and-how-to-track-them/` (rund 6 533 Z.)
   — **NICHT-TREFFER auf `epik` und `click_id`**
5. `…/docs/track-conversions/use-pinterest-tag-helper/` (rund 5 766 Z.) — **NICHT-TREFFER
   auf `epik`, `cookie`, `pintrk`**
6. `…/docs/track-conversions/integrate-third-party-tracking-tools/` (rund 11 465 Z.) —
   tragend für (ai)(1)
7. `…/docs/reference/rate-limits/` — "Rate limits" (rund 4 101 Z.)
8. `…/docs/reference/error-codes/` — "Error codes" (rund 6 539 Z.)
9. `…/docs/reference/schema-standardization-of-optional-nullable-fields/` (rund 3 235 Z.)
   — tragend für (ak)
10. `…/docs/changelog/changelog/` — "Changelog" (rund 13 374 Z.)
11. `…/docs/overview/welcome/` — "Welcome" (rund 3 123 Z.)
12. `…/docs/api/v5/introduction/` (rund 1 885 Z.)
13. `…/docs/faqs/faqs/` — "API FAQs" (rund 16 738 Z.)

**DER BEFUND ÜBER DAS VERFAHREN, und er ist der teuerste dieser Runde: DIE
ENDPUNKT-REFERENZ STAND IM BESTAND ZWEIMAL ALS AUSGESCHLOSSEN — UND SIE TRUG DEN KERN
DIESER RUNDE.** Am 2026-08-20 als "GESEHEN, NICHT GEÖFFNET" mit dem Grund, die API-Referenz
sei ein eigener Baum; am 2026-09-10 als Versuch gescheitert und in Teil (z) als
werkzeugerzeugte Abwesenheit abgelegt. **AUS IHR STAMMEN: der Name und die Herkunft der
Klick-Kennung, die vollständige Feldliste, die PFLICHTFELDER, die Rollen zu Katalog-Frage
I4, die Formatregel der Kennung, die dritte Rate-Limit-Zahl und die Form der
Erfolgsantwort.** Die Fehlerklasse ist in docs/immer-beachten.md als "DIE LISTE 'GESEHEN,
NICHT GEÖFFNET' IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT" geführt; gelöst hat sie der
Werkzeugwechsel, den Teil (z) benennt.
**ZWEI WEITERE AUSGESCHLOSSENE SEITEN SIND AUS DEMSELBEN GRUND GEÖFFNET WORDEN:** Der Tag
Helper (2026-09-21, BUDGET-AUSSCHLUSS, "ein möglicher Ort für eine Aussage darüber, woran
der Anbieter sein eigenes Tag erkennt") trug **nichts**; die Drittanbieter-Seite
(2026-09-21, BUDGET-AUSSCHLUSS, "der naheliegendste Ort für eine ABWEICHENDE Gestalt") trug
den `ptk`-Cookie-Namen aus (ai)(1), der auf keiner anderen gelesenen Seite steht.
**UND ZWEI, DIE ALS "Nachbarn ohne Katalog-Bezug" AUSGESCHLOSSEN WAREN, TRAGEN NACH IHREM
TITEL DIE VERSIONSFRAGE:** Changelog und Übersichtsseite — geöffnet, Ergebnis in (ag).

**GESEHEN, NICHT GEÖFFNET — mit Grund:**
· `…/docs/track-conversions/define-your-own-event-types/`, `…/remove-users-from-events/`,
  `…/get-event-quality-score/`, `…/use-limited-data-processing-flag/` — **SACHLICHER
  AUSSCHLUSS:** in den Teilen (h), (k), (m) und (g) bereits gelesen und abgelegt; keine der
  Fragen dieser Runde trägt ihren Titel.
· `…/docs/getting-started/connect-app/`, `…/set-up-authentication-and-authorization/`,
  `…/make-an-api-call/`, `…/key-concepts/access-tiers/` — **SACHLICHER AUSSCHLUSS:**
  Zugangsweg und Freigabe, in den Teilen (a), (b), (c), (f) und (h) abgelegt.
· `…/docs/reference/pagination/`, `…/image-proxy-requests-to-your-website/`,
  `…/help-and-feedback/`, `…/control-pinterestbot-access-to-your-site/` — **SACHLICHER
  AUSSCHLUSS:** kein Bezug zu den Fragen dieser Runde.
· `…/docs/reference/manage-notifications/` — **DER GRENZFALL, UND ER WIRD EIGENS BENANNT:**
  Sie könnte zum E-Mail-Kanal aus (ag) etwas sagen. **SIE IST NICHT GEÖFFNET**, und was
  dort steht, ist **ungelesen**.
· `…/docs/developer-tools/sdk/`, Sandbox-Leitfaden, API Explorer, Python SDK —
  **SACHLICHER AUSSCHLUSS:** Werkzeuge, kein Transport-Befund.
· Die Zweige "Mit Anzeigen arbeiten", "Mit Analytics und Berichten arbeiten", "Mit
  Katalogen arbeiten", "Mit Zielen und Zielgruppen arbeiten", "Web-Funktionen", "Wichtige
  Konzepte" (übrige) — **andere Produkte.**
· `help.pinterest.com` — **NICHT betreten.** Die Spannung aus Teil (y) bleibt damit
  unberührt und unbewertet.
· **HINTER EINER ANMELDESCHRANKE, NICHT BETRETEN:** Ads Manager, Conversion Tag Manager,
  "My apps", Token Debugger, Help-Center-Tickets, `community.pinterest.biz`.

### MESSUNG 2026-09-24 gegen die Conversions API (F8 der Phase 11.7) — der Teil (al)

**HERKUNFT (2026-09-24):** GEMESSEN vom **OWNER, 09:44 UTC, im Terminal** (Git Bash, `curl`),
**alle drei Läufe mit `?test=true`**, gegen `POST /v5/ad_accounts/{id}/events`; die Befehle
stammen aus der Mess-Vorbereitung der Phase 11.7 (docs/aktiver-stand.md, VERMERK P11.7-26),
Rumpf in der Form von `forwardToPinterest` (`src/lib/capi/pinterest-forward.ts`), mit
Antwort-Kopfzeilen (`-D -`). Testwerte: IP `203.0.113.9` (TEST-NET) und ein erfundener
User-Agent — der Adapter sendet die echten Werte des Besuchers. **Hier steht kein
Zugangsdatum, keine Werbekonto-Kennung und kein Anfrage-Bezeichner des Anbieters.**

(al) DER ERFOLGSRUMPF IST GEMESSEN — UND EIN FREMDER EREIGNISNAME WIRD ANGENOMMEN, NICHT
     ABGEWIESEN.
     · **DIE DREI LÄUFE, im Wortlaut der Rückmeldung** (Auslassungen "…" wie übermittelt):
       (a) gültiges Ereignis `lead`: HTTP 200;
       `{"num_events_processed":1,"num_events_received":1,"events":[{"status":"processed","error_message":"","warning_message":"external_id is missing. We highly recommend this on all events. … ; click_id is missing"}]}`
       (b) `subscription`: HTTP 200; 1/1, `status` `"processed"`, `error_message` `""`,
       `warning_message` wie (a) plus "This event has a non-standard name and is currently
       being labeled as an 'Unknown' event. …"
       (c) Stapel aus (a) und (b) in einer Anfrage: HTTP 200; 2/2, beide `"processed"`,
       Warnungen je wie oben.
     · **(i) DIE FORM DES ERFOLGSRUMPFS IST GEMESSEN UND DECKT SICH MIT (ah):** die
       Zählwerte `num_events_received` und `num_events_processed` als ZAHL, `events[]` mit
       `status`, `error_message` als `""` und `warning_message` als TEXT. Katalog-Frage G1
       ist damit für den Erfolgszweig beantwortet.
     · **(ii) `event_name` "subscription" WIRD ANGENOMMEN** — `processed`, mit der
       "Unknown"-Warnung. **DAS WIDERSPRICHT DEM BEISPIEL IN (ah)**, wo derselbe Name als
       `failed` mit "Invalid event_name: subscription" steht. **EIN FEHLERZWEIG "HTTP 200
       MIT `failed`" IST DAMIT NICHT GEMESSEN** — keiner der drei Läufe hat ihn erzeugt.
     · **(iii) DAS RATE-LIMIT, AUS DEN KOPFZEILEN aller drei Antworten:**
       `X-RateLimit-Limit: 120000, 120000;w=60;name="ads_conversions_ad_account_id"` ·
       `X-RateLimit-Remaining` 119999 → 119998 → 119997 · `X-RateLimit-Reset` 58 / 56 / 53.
       Also **120 000 je 60 Sekunden, Kategorie `ads_conversions_ad_account_id`** — für das
       verwendete Zugangsdatum. **GRENZE: drei Testanfragen**; welcher der zwei Zugangswege
       aus (a) das verwendete Datum ist, steht nicht in der Rückmeldung.
     · **(iv) DIE WARNUNG "external_id is missing … click_id is missing" TRÄGT JEDE
       ANTWORT** — alle drei Läufe, jedes Ereignis.
     **DIE GRENZEN:** `?test=true` — die Quelle sagt, die Antwortform sei dieselbe wie ohne
     (ah), gemessen ist nur der Testmodus · EINE Beobachtung an einem Tag · der Fehlerzweig
     "200 mit `failed`" ist ungemessen.

