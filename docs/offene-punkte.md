# OFFENE PUNKTE — der Volltext

**Was diese Datei ist:** Der Abschnitt "## Offene Punkte" aus CLAUDE.md, am
2026-08-21 hierher verschoben — WÖRTLICH. Kein Wort umformuliert, keine Zeile
umsortiert, nichts ergänzt. In CLAUDE.md steht seither ein Stub mit TITEL UND
TRIGGER je Eintrag.

**SIE WIRD NICHT AUTOMATISCH GELADEN.** AUSLÖSER: Wer an einem offenen Punkt
arbeitet, seinen Trigger prüft oder ihn abarbeitet, lädt sie ZUERST.

**DER TRIGGER STEHT IM STUB, DIE BEWEISFÜHRUNG HIER.** Beide gehören zusammen:
Wer einen Trigger ändert, ändert ihn in CLAUDE.md; wer einen Befund ergänzt,
hier. WARUM DER TRIGGER OBEN BLEIBT: Ein offener Punkt ohne sichtbaren Trigger
ist der Posten, der still kaputtgeht.

**EIN ABSCHNITTSVERWEIS OHNE DATEIANGABE MEINT CLAUDE.md.** Formulierungen wie
"## Modus", "## Security Manifest & Launch Blocker" oder "## Immer beachten"
stammen aus der Zeit, als dieser Text in jener Datei stand. Sie werden NICHT
umgeschrieben — dieser Satz löst sie auf.

**EIN VERWEIS AUF EINE ROADMAP-ZEILE LÖST ÜBER ZWEI STATIONEN AUF**, und das
gehört dazu, seit die Roadmap am 2026-08-21 ausgelagert ist: "Roadmap-Zeile
11.1" meint die Phase mit dieser Nummer — ihren Zustand im Stub von CLAUDE.md,
ihren Volltext in docs/roadmap.md. Fünf Verweise dieser Datei sind davon
betroffen.

**VERWEISE INNERHALB DIESER DATEI sind unberührt:** Vier Einträge zeigen
aufeinander; sie liegen alle hier und finden einander.

- isAppHost-PLATZHALTER (Trigger: Brand-Domain-Kauf): isAppHost trägt pagesmith.app als
  PLATZHALTER. Sobald eine echte Brand-Domain feststeht, MUSS sie in EINEM überlegten Schritt
  in die isAppHost-Allowlist (+ NEXT_PUBLIC_APP_URL + Doku) — sonst landet die eigene App auf
  ihrer eigenen Domain im SERVING-Zweig und 404t. In Prod heute harmlos (nur *.vercel.app ist
  relevant), aber vor dem Brand-Domain-Livegang nicht vergessen.
- HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung): Vercel Hobby deckelt bei 50 Custom-
  Domains PRO PROJEKT — geteilt über ALLE Kunden, also eine Multi-Tenant-Decke, nicht ein
  Per-Kunde-Limit. Der Per-User-Cap (Richtwert 3/User) schützt sie doppelt (Abuse + geteilte
  Decke). Pro-Upgrade VOR echter Skalierung einplanen.
- rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN (Trigger: DB-Neuaufbau / Staging
  REIN AUS DEN MIGRATIONSDATEIEN — der Restore-Drill-Fall ist unten GEMESSEN geklärt,
  das ist aber KEIN Freibrief für diese beiden anderen Fälle): Die Event-Trigger-FUNKTION
  rls_auto_enable (aktiviert automatisch RLS auf neuen public-Tabellen, SECURITY DEFINER),
  gebunden über den Event-Trigger ensure_rls (ddl_command_end), existiert NUR in der
  laufenden DB — Zweck + Grant-Entzug sind in 0003 dokumentiert, aber ein CREATE steht
  in KEINER Migration. Bei einem Rebuild REIN AUS DEN MIGRATIONSDATEIEN (z.B. lokales
  `supabase db reset`, CI, Self-Hosting) fehlt sie weiterhin -> neue Tabellen bekämen
  dort NICHT automatisch RLS (stiller Verlust einer Schutzschicht). DDL verbatim
  archiviert unter supabase/manual/rls_auto_enable.sql (bei einem Migrations-only-Rebuild
  manuell mitziehen). evtowner = postgres (gemessen 2026-07-24) -> eine Migration unter
  der NÄCHSTEN FREIEN Nummer (ableiten aus supabase/migrations/, NIE hardcoden — eine
  feste Nummer hier veraltet mit der nächsten Migration und überschriebe dann eine
  bestehende Datei) bleibt ein realistischer Kandidat für GENAU DIESEN
  Migrations-only-Fall, aber KEINE Nebenbei-Zeile: (a) create event trigger kennt KEIN
  "if not exists" -> Katalog-Guard nötig (DO-Block gegen pg_event_trigger); (b) "create or
  replace function" auf einer SICHERHEITSFUNKTION ersetzt die Definition VOLLSTÄNDIG
  (0014-Lektion) — jeder Transkriptionsfehler degradiert still den RLS-Schutz, daher
  nach dem Lauf Byte-Abgleich gegen pg_get_functiondef PFLICHT; (c) die Migration muss
  gegen die BESTEHENDE DB ein No-op sein.
  GEMESSEN (2026-07-30, Restore-Drill "Restore to new project",
  supabase/checks/restore-drill.sql): Für den SUPABASE-RESTORE-Pfad ist die Frage jetzt
  beantwortet — ensure_rls übersteht einen Restore aus einem Pro-Backup automatisch.
  Teil A/B (Migrationsstand, Event-Trigger, Funktionsliste) waren zeilenidentisch
  zwischen Original und restauriertem Projekt; die Positivkontrolle (Teil C,
  Wegwerf-Tabelle ohne explizites RLS-Enable) ergab rls_automatisch_aktiviert = true.
  Für den Restore-Fall ist damit KEIN manuelles Nachziehen von
  supabase/manual/rls_auto_enable.sql mehr nötig.
  GRENZE: Der Beweis gilt für DIESEN Drill mit DIESER Backup-Generation, KEIN Beweis für
  alle Zeit — ändert Supabase die Restore-Mechanik, wäre der Drill zu wiederholen.
  UNVERÄNDERT OFFEN bleiben die beiden anderen Trigger (DB-Neuaufbau / Staging rein aus
  den Migrationsdateien): dort fehlt ensure_rls weiterhin, s. oben.
- DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE (Trigger: die erste Scheibe, die
  personenbezogene Merkmale erfasst — Click-IDs, IP/UA, gehashte Kontaktdaten,
  Fingerprint-artige Merkmale; spätestens VOR dem ersten echten Ad-Traffic): Heute
  trägt events KEINE Personen-Identität, deshalb braucht es keinen Löschpfad und keine
  Auskunftsfähigkeit. Die Performance-CRM-Vision (docs/claude-history/future-roadmap.md)
  würde genau das ändern. Die Grenze — WAS erfasst wird, auf welcher Rechtsgrundlage,
  wie lange, mit welchem Löschpfad — MUSS entschieden sein, BEVOR die erste solche
  Scheibe gebaut wird. Grund: einmal unter falscher Grundlage erhobene Daten lassen
  sich nicht rückwirkend heilen, und die DSGVO-Sauberkeit IST das Verkaufsargument.
  Bindet die bestehende 30-Tage-Retentionspflicht (Manifest Tier 2) und die
  Zwei-Ebenen-Trennung Kunden- vs. Betreiber-Ebene aus der future-roadmap mit ein.
  Browser-Fingerprinting ist bereits ENTSCHIEDEN: wird nicht gebaut. EBENSO ERFASST
  (Phase 9): eine „anonyme" Zufalls-ID in einem First-Party-Cookie zur
  Besucher-Identifikation wäre ein fingerprint-artiges Merkmal und löst dieselbe Grenze
  aus — auch das keine Option ohne eine vorherige Entscheidung hier.
  ENTSCHIEDEN AM 2026-08-15 (OWNER) — DREI DER VIER FRAGEN SIND BEANTWORTET. DER TEXT
  DARÜBER BLEIBT UNVERÄNDERT STEHEN und wird von diesem Block NICHT ersetzt: Er nennt
  Trigger und Bindungen, die weiter gelten — die 30-Tage-Retentionspflicht, die
  Zwei-Ebenen-Trennung und das entschiedene Nein zum Fingerprinting.
  PROVENIENZ: OWNER-ENTSCHEIDUNG (2026-08-15). KEINE Messung, KEINE Ableitung — eine
  FESTLEGUNG.
  DIE FESTLEGUNG: Es werden KEINE fremden Nutzer-Identitäten in der eigenen Datenbank
  gespeichert — auch nicht als Pseudonym und auch nicht als Hash. Ein
  Identitäts-Merkmal wird ausschliesslich DURCHGELEITET: im Arbeitsspeicher
  entgegengenommen, an das Ziel weitergereicht, danach nicht behalten. events bleibt
  damit identitätsfrei.
  WAS DAMIT BEANTWORTET IST — die drei Fragen dieses Eintrags, je einzeln:
  · WAS erfasst wird: ein Identitäts-Merkmal, flüchtig, ohne Ablage.
  · WIE LANGE: gar nicht.
  · WELCHER LÖSCHPFAD: keiner nötig, weil nichts abgelegt wird.
  WAS OFFEN BLEIBT — DIE VIERTE FRAGE, DIE RECHTSGRUNDLAGE: Sie liegt beim KUNDEN als
  Verantwortlichem, nicht bei diesem Produkt. ENTSCHIEDEN (Owner, 2026-08-15) und
  konsistent mit der Haltung an der Roadmap-Zeile 11.5 ("Wir weisen hin, wir erzwingen
  nicht"): Das System prüft NICHT nach, ob der Kunde eine Einwilligung eingeholt hat —
  es verarbeitet das Signal, wie der Kunde es sendet. Die Pflicht wird VERTRAGLICH
  zugewiesen und bindet damit an den bestehenden Tier-0-Blocker "SUBPROZESSOR-DPAs +
  Kunden-DPA". AUSDRÜCKLICH KEIN BAU-AUFTRAG: die vertragliche Seite ist ein
  juristisches Dokument und kein Code. HIER STEHT KEIN ZEITPUNKT.
  DIE AUFLAGE, DIE DIE FESTLEGUNG TRÄGT — OHNE SIE GILT SIE NICHT: Das
  Identitäts-Merkmal wird IM BROWSER gebildet. Eine KLARTEXT-Angabe darf den eigenen
  Server NIE erreichen. GRUND, und er ist der eigentliche Punkt: Der Leck-Pfad ist
  NICHT die Datenbank, sondern das LOG. Erreicht ein Klartextwert den Ingest, steht er
  im Rumpf jedes Beacons, in jedem Fehlerpfad und in jedem weitergereichten
  Fehler-Objekt — DIESELBE KLASSE, die im Sicherheits-Manifest bereits ZWEIMAL geführt
  ist (das CAPI-Zugangsdatum als Server-Action-Argument, Tier 2; der zurückgespiegelte
  Anbieter-Fehlertext, Tier 1). "Wir speichern nichts" wäre dann unwahr, obwohl keine
  Zeile in die Datenbank geschrieben würde.
  WAS DIESE ENTSCHEIDUNG NICHT IST: Sie sagt NICHT, dass keine Verarbeitung
  personenbezogener Daten stattfindet. NICHT-SPEICHERN IST NICHT NICHT-VERARBEITEN. Wer
  daraus "kein Datenschutz-Thema" liest, liest sie falsch.
  WANN SIE NEU ZU BEWERTEN IST: wenn ein Ziel oder der Markt ein Persistierungs-Modell
  verlangt. Dann ist SIE der Gegenstand einer NEUEN Owner-Entscheidung — der Eintrag
  darüber geht dadurch NICHT wieder auf.
  DIE AUFLAGE, DIE DIE FESTLEGUNG TRÄGT, IST AM 2026-08-19 PRÄZISIERT WORDEN — OWNER-
  ENTSCHEIDUNG, KEINE MESSUNG UND KEINE ABLEITUNG. Der Text darüber bleibt unverändert;
  was er verlangte („das Identitäts-Merkmal wird IM BROWSER gebildet, eine KLARTEXT-Angabe
  darf den eigenen Server NIE erreichen"), traf einen Fall, den er vor Augen hatte, und
  liess einen zweiten ungeregelt. DIE ACHSE IST AB JETZT: NUTZER-EINGABEN gegen
  INFRASTRUKTUR-DATEN.
  · NUTZER-EINGABEN — AUSDRÜCKLICH E-MAIL UND TELEFON: im Browser gehasht (SHA-256), der
    eigene Server sieht KEINEN Klartext. Das ist die Auflage von oben, unverändert, und
    für diese beiden Merkmale gilt sie wörtlich weiter.
    DIE GRENZE DIESER AUFLAGE GEHÖRT DAZU, sonst wird sie zur Generalerlaubnis: Für ANDERE
    Nutzer-Eingaben ist sie NICHT getroffen. Bei einem Merkmal, das ein Ziel im KLARTEXT
    zur Zuordnung erwartet — etwa ein Name —, wäre die Konsequenz nicht „hashen", sondern
    „gar nicht erst erheben". Das ist eine ANDERE Entscheidung und hier NICHT getroffen.
  · INFRASTRUKTUR-DATEN — IP-ADRESSE UND USER-AGENT: Der Server DARF sie als TRANSIT-Wert
    in eine CAPI-Nutzlast durchreichen, um die Zuordnungsrate zu sichern.
    EINSCHRÄNKUNG, UND SIE IST DER TRAGENDE TEIL: Die IP wird vom eigenen Server NIEMALS
    in der Datenbank gespeichert, persistiert oder in ein Log geschrieben.
  ZWEI BELEGE, BEIDE AM REPO GEPRÜFT (2026-08-19):
  (a) DIE LOG-EINSCHRÄNKUNG IST GELEBTER STAND, keine Absichtserklärung. GEMESSEN am Code:
      Die drei Riegel-Zeilen des LinkedIn-Adapters (`src/lib/capi/linkedin-forward.ts`)
      schreiben FESTE Zeichenketten und nennen den GRUND, nicht die Adresse — „missing
      identity", „identity is not IPv4", „no conversion rule for event". Und eine formale
      Suche über `src/` (ohne Testdateien) findet KEINE Logzeile, die eine IP oder einen
      User-Agent ausgibt. DIE REICHWEITE DIESES NICHT-TREFFERS GEHÖRT DAZU: Abgesucht ist
      die Achse „console.* mit ip/user-agent im Argument"; das ist ein Nicht-Treffer auf
      DIESER Achse und kein Beweis für alle Pfade. Die dauerhafte Regel dahinter steht in
      docs/immer-beachten.md unter „SCHWÄRZUNG — VIER TEILE, DIE NUR ZUSAMMEN TRAGEN".
  (b) DIE DURCHLEITUNG IST NICHT NEU — DIE AUFLAGE ÄNDERT NICHTS, SIE BENENNT, WAS LÄUFT.
      GEMESSEN an der Versionsgeschichte (2026-08-19): Die Client-IP wird seit dem
      2026-07-03 an ein Ziel weitergereicht (`bf87545`, die erste CAPI-Route), seit dem
      2026-08-19 an alle VIER (`a4e680c`, der LinkedIn-Adapter). Wer diesen Absatz für eine
      NEUE Erlaubnis hält, liest ihn falsch.
  WAS DIE AUFLAGE NICHT TUT: Sie beantwortet NICHT, ob eine IP personenbezogen ist — sie
  IST es. Sie regelt, wie mit ihr umgegangen wird. Der Satz „NICHT-SPEICHERN IST NICHT
  NICHT-VERARBEITEN" oben gilt für sie unverändert mit.
  DIE ACHSE BEKOMMT AM 2026-08-28 EINE DRITTE KLASSE — OWNER-ENTSCHEIDUNG. Der Text
  darüber bleibt ZEICHEN FÜR ZEICHEN stehen und wird von diesem Block NICHT ersetzt; die
  Präzisierung vom 2026-08-19 nannte ZWEI Klassen, und beide gelten unverändert weiter.
  Was hinzutritt, ist eine DRITTE — sie steht NEBEN den beiden und ist AUSDRÜCKLICH KEINE
  AUSNAHME von einer der beiden.
  · FREMDVERGEBENE, FÜR UNS UNDURCHSICHTIGE KENNUNG. GEGENSTAND: gclid, gbraid, wbraid —
    und künftige Klick-Kennungen anderer Anbieter (Meta, TikTok und weitere).
    DIE AUFLAGE: TRANSIT-ONLY — niemals in die Datenbank, niemals in ein Log, KEIN Hashen,
    weil strukturell unmöglich.
  DIE REICHWEITE, UND SIE IST DER GRUND, WARUM DER GEGENSTAND NICHT BEI GOOGLE ENDET: Die
  Klasse gilt ANBIETERÜBERGREIFEND. Sie ist an der Google-Klick-Kennung entschieden worden,
  aber ihr Kriterium ist die HERKUNFT des Merkmals, nicht der Empfänger. Wer sie als
  Google-Sonderfall liest, baut beim nächsten Anbieter dieselbe Entscheidung ein zweites
  Mal — und möglicherweise anders.
  WARUM EINE DRITTE KLASSE UND KEINE ZUORDNUNG ZU EINER BESTEHENDEN — ohne diesen Absatz
  wird sie beim nächsten Aufräumen als überflüssige Verfeinerung eingezogen: Der Besucher
  tippt sie nicht ein, also ist sie KEINE Nutzer-Eingabe. Und sie ist keine Angabe des
  Transports, also KEIN Infrastruktur-Datum. Der Anbieter vergibt sie, wir können sie nicht
  auflösen, und sie geht an ihren URHEBER zurück.
  WARUM „KEIN HASHEN" KEINE ERLEICHTERUNG IST, SONDERN EINE FESTSTELLUNG: Die Auflage für
  Nutzer-Eingaben verlangt SHA-256 im Browser. Auf eine Klick-Kennung angewandt wäre sie
  ein RIEGEL — der Anbieter erwartet sie im KLARTEXT, ein Hash macht sie wertlos. Die
  Hash-Auflage zielt auf Merkmale, bei denen Hashen MÖGLICH UND vom Anbieter VERLANGT ist;
  hier ist beides nicht der Fall. Wer daraus eine Lockerung liest, hat die Richtung
  vertauscht: Die Auflage TRANSIT-ONLY ist strenger als die Hash-Auflage, nicht milder —
  sie erlaubt keinerlei Ablage, auch keine gehashte.
  WAS HEUTE SCHON SO LÄUFT UND WAS NICHT — GEMESSEN AM REPO (CC, 2026-08-28), und die
  Trennung gehört hin, weil ein pauschales „gelebter Stand" hier falsch wäre:
  (a) KEIN ADAPTER NIMMT HEUTE EINE KLICK-KENNUNG ENTGEGEN ODER REICHT EINE DURCH.
      ACHSE: die vier Dateien meta-forward.ts, pinterest-forward.ts, tiktok-forward.ts und
      linkedin-forward.ts samt ihren Nutzlast-Bauten, Begriffe gclid · gbraid · wbraid ·
      fbclid · _fbc · ttclid · li_fat_id. NULL Treffer in allen vieren.
      DIE DREI GOOGLE-KENNUNGEN EXISTIEREN IM REPO IN GENAU VIER DATEIEN —
      google-click-ids.ts, google-payload.ts und ihre zwei Testdateien —, und die beiden
      Produktivdateien haben KEINEN Aufrufer: 'google' steht nicht in TRACKING_TARGETS
      (src/lib/settings.ts). DIE AUFLAGE IST FÜR DIE KLICK-KENNUNG DAMIT NOCH KEIN
      GELEBTER STAND, SONDERN EINE VORGABE AN DIE TRANSPORT-SCHEIBE. Das ist der
      Unterschied zum Beleg (a) darüber, wo die Log-Einschränkung gelebter Stand IST.
  (b) EIN GRENZFALL IST GEMESSEN UND WIRD GEMELDET, NICHT ZUGEORDNET: forwardToMeta
      (src/lib/capi/meta-forward.ts) liest `_fbp` aus dem Beacon-Rumpf und reicht es als
      `userData.fbp` an Meta durch. Das ist eine FREMDVERGEBENE, für uns UNDURCHSICHTIGE
      Kennung — aber eine BROWSER-Kennung und KEINE Klick-Kennung. OB SIE UNTER DIESE
      KLASSE FÄLLT, IST HIER NICHT ENTSCHIEDEN. Festgehalten ist nur, dass sie sich schon
      heute so verhält, wie die Klasse es verlangt: durchgereicht, nicht abgelegt.
      pinterest-forward.ts und linkedin-forward.ts nennen `_fbp` ausschliesslich in
      Kommentaren, die begründen, warum sie es NICHT lesen.
  (c) ES WIRD NICHTS PERSISTIERT UND NICHTS GELOGGT. persistEvent
      (src/lib/analytics/persist.ts) schreibt GENAU FÜNF Werte — project_id, event_type,
      event_id, source, variant — und keiner davon trägt ein Identitäts-Merkmal; der
      Kommentar an Ort und Stelle sagt es selbst („KEIN IP/UA (lean/PII-frei)").
      ACHSE DER LOG-PRÜFUNG, und ihre Reichweite gehört dazu: ALLE 48 console-Aufrufe im
      Produktivcode unter src/ (Testdateien ausgenommen, binärsicher gelesen — mappings.ts
      trägt ein NUL-Byte und fällt aus einer gewöhnlichen Suche still heraus), jeder
      einzeln auf sein Argument geprüft. KEINER führt eine Klick-Kennung. Zwei tragen ein
      Wort, das auf der Suchachse anschlägt, und beide sind geprüft und entlastet: die
      OAuth-Rückkehr loggt bei `bad_payload` einen FELDNAMEN und keinen Wert, und der
      Pinterest-Adapter loggt den geschwärzten Anbieter-Rumpf über describeErrorBody.
      POSITIVKONTROLLE DERSELBEN SUCHE: `gclid` trifft 28-mal in src/, `_fbp` 16-mal,
      `console.error` 41-mal — die Suche greift, der Nicht-Treffer ist einer.
  WAS DIESE ENTSCHEIDUNG NICHT IST: Sie beantwortet NICHT, ob eine Klick-Kennung
  personenbezogen ist. Der Satz „NICHT-SPEICHERN IST NICHT NICHT-VERARBEITEN" oben gilt
  für sie UNVERÄNDERT mit. Die VIERTE FRAGE — die RECHTSGRUNDLAGE — liegt weiterhin beim
  KUNDEN als Verantwortlichem und ist von dieser Entscheidung UNBERÜHRT.
  WAS OFFEN BLEIBT, UND DIESER PUNKT SCHLIESST SICH NICHT: Für ANDERE Nutzer-Eingaben ist
  nichts entschieden — die Grenze der Hash-Auflage gilt unverändert, und der Fall eines
  Merkmals, das ein Ziel im Klartext erwartet, bleibt eine ANDERE, hier nicht getroffene
  Entscheidung.
  DIE BEDINGUNG DER NEUBEWERTUNG: wenn ein Ziel oder der Markt ein PERSISTIERUNGS-Modell
  für Klick-Kennungen verlangt. Dann ist DIESE Klasse der Gegenstand einer NEUEN
  Owner-Entscheidung; der Eintrag darüber geht dadurch nicht wieder auf.
  PROVENIENZ, JE TEIL: die Klasse, ihr Gegenstand, ihre Auflage und die Reichweite sind
  OWNER-ENTSCHEIDUNG (2026-08-28) — KEINE Messung, KEINE Ableitung, eine FESTLEGUNG. Die
  beiden Begründungen sind Teil derselben Entscheidung. Die Punkte (a), (b) und (c) sind
  GEMESSEN am Repo (CC, 2026-08-28) mit den je genannten Achsen. Dass die Auflage für die
  Klick-Kennung noch kein gelebter Stand ist, ist eine ABLEITUNG aus (a).

  VERMERK 2026-09-01 ZU PUNKT (a) DES BLOCKS VOM 2026-08-28 — EINE ZWEITE ACHSE, KEINE
  KORREKTUR. Der Owner-Block darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt
  DANEBEN. Er steht am ENDE des Eintrags und nicht zwischen (a) und (b), weil er sonst eine
  Aufzählung unterbräche, auf die die PROVENIENZ-Zeile darüber namentlich zeigt.
  DIE OWNER-MESSUNG VOM 2026-08-28 IST AUF IHRER ACHSE RICHTIG, UND DAS STEHT ZUERST: Punkt
  (a) sagt "KEIN ADAPTER NIMMT HEUTE EINE KLICK-KENNUNG ENTGEGEN ODER REICHT EINE DURCH" und
  nennt seine Achse selbst — die vier Adapter-Dateien samt ihren Nutzlast-Bauten, Begriffe
  gclid · gbraid · wbraid · fbclid · _fbc · ttclid · li_fat_id. Das sind BENANNTE
  Kennungsfelder, und auf dieser Achse ist der Nicht-Treffer am 2026-09-01 erneut bestätigt.
  DIE ZWEITE ACHSE — GEMESSEN am Code (CC, 2026-09-01): eventSourceUrl wird im Beacon-Bau
  (buildCapiBeaconStatement, src/lib/tracking/meta.ts) als location.href gesetzt, also die
  vollständige Adresse EINSCHLIESSLICH Query-String. Drei der vier Adapter lesen das Feld und
  senden es weiter — forwardToMeta und forwardToPinterest als event_source_url,
  forwardToTiktok als page.url; forwardToLinkedin liest es nicht.
  FOLGE: Ein gclid im Query-String einer gehosteten Kundenseite REIST HEUTE SCHON MIT — an
  meta, pinterest und tiktok —, UNBENANNT, als Bestandteil einer Zeichenkette. Das gilt für
  jeden Klick-Parameter eines Werbenetzwerks, nicht nur für Googles.
  DIE ZUORDNUNG WIRD HIER NICHT GETROFFEN, UND DAS IST DER ZWECK DIESES VERMERKS: OB DIE
  UNBENANNTE DURCHLEITUNG UNTER DIE DRITTE DATENKLASSE FÄLLT, IST EINE OWNER-ENTSCHEIDUNG.
  Sie steht aus. Dieser Vermerk stellt die zweite Achse fest und ordnet sie ausdrücklich
  NICHT ein — dieselbe Handhabung wie bei _fbp in Punkt (b) desselben Blocks, wo ein
  Grenzfall "GEMELDET, NICHT ZUGEORDNET" wird.
  WAS UNVERÄNDERT GILT UND AUF BEIDEN ACHSEN TRÄGT: persistEvent (src/lib/analytics/
  persist.ts) schreibt die Kennung NICHT, und keiner der 48 console-Aufrufe führt sie —
  Punkt (c) desselben Blocks, dort mit Achse und Positivkontrolle; in dieser Runde NICHT neu
  gezählt. Die Auflage TRANSIT-ONLY ist auf ihren zwei anderen Hälften also eingehalten.
  DER VOLLTEXT DES BEFUNDES STEHT NICHT HIER, sondern in docs/aktiver-stand.md, Abschnitt
  "Vorrat (gemeldet, nicht gebaut)", Eintrag 36 — dort mit den Symbolnamen je Adapter.
  Zweimal geschrieben liefe er auseinander.
  PROVENIENZ: GEMESSEN am Code (CC, 2026-09-01). Dass es sich um eine ZWEITE Achse und nicht
  um eine Korrektur der ersten handelt, ist eine FOLGE aus dem Vergleich der beiden Achsen,
  keine eigene Messung.

  BLOCK VOM 2026-09-22 — DREI ENTSCHEIDUNGEN (OWNER, auf Architekten-Vorschlag). DER
  GESAMTE TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; dieser Block tritt DANEBEN und
  ersetzt keinen Satz. Er schliesst ZWEI Fragen, die der Bestand ausdrücklich offen
  geführt hat — Punkt (b) des Blocks vom 2026-08-28 und den Vermerk vom 2026-09-01 —, und
  stellt EINE Angabe klar, die in der Präzisierung vom 2026-08-19 nur für die IP dasteht.
  ANLASS: der Zuschnitt der Phase 11.7 um die Klick-Kennungen und Match-Felder ALLER
  gebauten Ziele (docs/roadmap.md, Roadmap-Zeile 11.7, der fünfte Punkt vom 2026-09-22).
  Ohne diese drei Entscheidungen hätte jene Arbeit keinen Massstab — sie berührt in jedem
  einzelnen Schritt eine fremdvergebene Kennung.

  (E2) DIE REICHWEITE DER DRITTEN KLASSE — ENTSCHIEDEN. Unter "FREMDVERGEBENE, FÜR UNS
       UNDURCHSICHTIGE KENNUNG" mit der Auflage TRANSIT-ONLY fallen ausdrücklich:
       · `fbc` — GLEICH OB AUS DEM KLICK-PARAMETER DER ADRESSE ODER AUS EINEM COOKIE
         GEBILDET. Das Cookie ist nur der TRÄGER derselben vom Anbieter vergebenen
         Kennung; das Kriterium der Klasse ist die HERKUNFT und nicht der Weg, auf dem
         die Kennung in den Browser gelangt ist. WER NACH DEM TRÄGER UNTERSCHIEDE,
         BEKÄME FÜR EINE KENNUNG ZWEI REGELN — und die Wahl zwischen ihnen hinge daran,
         welchen Weg ein fremdes Tag an diesem Tag gerade nimmt.
       · `fbp` UND GLEICHARTIGE KENNUNGEN, DIE DAS TAG DES ANBIETERS SETZT.
       DAMIT IST PUNKT (b) DES BLOCKS VOM 2026-08-28 ENTSCHIEDEN. Jener Punkt hält für
       `fbp` ausdrücklich fest, es sei "HIER NICHT ENTSCHIEDEN", ob es unter die Klasse
       fällt. ER BLEIBT WÖRTLICH STEHEN: Er beschreibt den Stand seines Tages richtig,
       und seine Messung — durchgereicht, nicht abgelegt — gilt unverändert. Entschieden
       ist die ZUORDNUNG, nicht seine Beobachtung.
       DIE GRENZE, UND SIE IST DER TRAGENDE TEIL DIESER ENTSCHEIDUNG: NIE EINE KENNUNG,
       DIE DIESES PRODUKT SELBST ERZEUGT ODER SETZT. Die Klasse wächst über die
       Klick-Kennung hinaus, aber AUSSCHLIESSLICH in Richtung FREMDER Urheberschaft. Wer
       sie auf eine eigene Kennung anwendete, hätte aus einer Herkunfts-Regel eine
       Form-Regel gemacht.
       WAS DAMIT UNBERÜHRT BLEIBT: die Abgrenzung an der Roadmap-Zeile 11.9. Eine SELBST
       GESETZTE Besucher-Kennung ist von dieser Klasse weiterhin NICHT gedeckt; sie löst
       die Grenze dieses Eintrags auf dem Weg des fingerprint-artigen Merkmals aus, und
       das ist ein anderer Weg mit anderen Folgen.
       EINE FOLGE, DIE HIERHER GEHÖRT, WEIL SIE SONST BEIM NÄCHSTEN LESEN ALS WIDERSPRUCH
       ERSCHEINT: Jener Halbsatz an der Roadmap-Zeile 11.9 beschreibt die Klasse als
       geltend "fremdvergebenen KLICK-Kennungen". SEIT DIESEM BLOCK IST DAS DIE ENGERE
       BESCHREIBUNG — `fbp` ist keine Klick-Kennung. SEINE SCHLUSSFOLGERUNG BLEIBT
       RICHTIG (die selbst gesetzte Besucher-Kennung ist nicht gedeckt); unvollständig
       ist seine AUFZÄHLUNG. Der Satz wird NICHT angefasst, und das ist eine Entscheidung
       und kein Übersehen: Seine Aussage trägt weiter, und ein nachgezogener Halbsatz
       machte aus einem Zeitdokument eine Behauptung über heute.
       GEMELDET ALS VORRAT, NICHT GEBAUT: docs/claude-history/phase-11.7-anbieter-befunde.md,
       Vorrat P11.7-2.
       ERLEDIGT 2026-09-25 (Phasenende 11.7, ARCHITEKTEN-ENTSCHEIDUNG): An der Roadmap-Zeile
       11.9 steht seither unmittelbar hinter dem Halbsatz ein DATIERTER Nachtrag, der die
       Aufzählung vervollständigt. Der Halbsatz selbst ist NICHT angefasst — er bleibt das
       Zeitdokument, als das ihn der Satz darüber führt. Vorrat P11.7-2 steht im Archiv der
       Phase 11.7.

  (E3) DER GRUNDSATZ: EINE KLICK-KENNUNG GEHT NUR AN IHREN URHEBER. Eine fremdvergebene
       Klick-Kennung wird an den Anbieter weitergereicht, DER SIE VERGEBEN HAT — und an
       keinen anderen.
       DER GRUND STEHT IM BLOCK VOM 2026-08-28 SELBST und wird hier nur eingelöst: Die
       dritte Klasse ist damit begründet, dass die Kennung "an ihren URHEBER zurück"
       geht. Genau dieser Satz trägt die Erlaubnis zum Weiterreichen. AN EINEN DRITTEN
       ANBIETER TRÄGT ER NICHT — dort ist die Kennung weder auflösbar noch zurückgegeben,
       sondern schlicht ein fremdes Merkmal an einer fremden Stelle.
       DAMIT IST DIE IM VERMERK VOM 2026-09-01 AUSSTEHENDE OWNER-ENTSCHEIDUNG GETROFFEN.
       Jener Vermerk stellt fest, dass ein `gclid` im Query-String UNBENANNT an meta,
       pinterest und tiktok mitreist, und ordnet es ausdrücklich NICHT ein. Er bleibt
       wörtlich stehen; eingeordnet ist die Durchleitung ab jetzt hier.
       PFLICHT-ANGABE ZUM GELEBTEN STAND — RICHTIGGESTELLT AM 2026-09-23, NICHT
       GESTEMPELT. Hier stand: "DER HEUTIGE CODE VERLETZT IHN" — `eventSourceUrl` reiste
       samt Query-String an `forwardToMeta` und `forwardToPinterest` (`event_source_url`)
       und an `forwardToTiktok` (`page.url`), GEMESSEN am 2026-09-01 und am 2026-09-22
       (HEAD 9abdd2a); "DIE VERLETZUNG BESTEHT, BIS DIE PHASE 11.7 SIE BEHEBT".
       DER STAND SEIT DEM BAU-COMMIT `de88657` (Phase 11.7, Scheibe S4; GEMESSEN am Repo,
       CC, 2026-09-23): Der Grundsatz ist AM ADRESSFELD UMGESETZT. Alle drei Adapter geben
       die Adresse durch `stripForeignClickIds` (`src/lib/capi/click-id-strip.ts`); jede
       fremde Klick-Kennung der Tabelle `CLICK_ID_TABLE` fällt, die eigene des Ziels
       bleibt. Bewacht vom Wächter W über alle fünf echten Adapter
       (`src/lib/capi/click-id-strip.test.ts`).
       DREI GRENZEN, BENANNT: eine Kennung, die nicht in der Tabelle steht, reist weiter
       mit · eine Kennung im Fragment der Adresse reist mit · eine nicht parsebare
       Adresse verliert alles ab dem ersten "?" oder "#", auch die eigene Kennung. Live
       ist das Entfernen nicht belegbar (docs/ziel-befunde/meta.md, Teil (ab)); der
       Beweis ist der Wächter. Vermerk: VERMERK P11.7-16 der Phase 11.7.
       DIE GRENZE, UND OHNE SIE WIRD DER GRUNDSATZ VOREILIG UMGESETZT: WELCHE Parameter
       je Anbieter als Klick-Kennung gelten und OB ein Anbieter Kennungen aus der
       Seitenadresse selbst ausliest, ist UNGEMESSEN. Die zweite Hälfte entscheidet über
       die Gestalt der Umsetzung — liest ein Anbieter selbst aus der übergebenen Adresse,
       ist ein blosses Weglassen des Parameters etwas anderes als das Weglassen eines
       benannten Feldes. UMSETZUNG ERST NACH DEM ANBIETER-CRAWL.

  (E4) KLARSTELLUNG ZUM USER-AGENT (Architekten-Vorschlag 2026-09-22, OWNER ohne
       Widerspruch). Das Ablage- und Log-Verbot der Präzisierung vom 2026-08-19 gilt für
       den USER-AGENT wie für die IP.
       WAS GEKLÄRT WIRD: Der Spiegelstrich "INFRASTRUKTUR-DATEN — IP-ADRESSE UND
       USER-AGENT" nennt beide Merkmale, sein Verbotssatz aber nur die IP ("Die IP wird
       vom eigenen Server NIEMALS in der Datenbank gespeichert, persistiert oder in ein
       Log geschrieben"). DER SATZ BLEIBT WÖRTLICH STEHEN. Diese Klarstellung sagt, dass
       er für den User-Agent ebenso gilt.
       WARUM DAS KEINE VERSCHÄRFUNG IST: Der Code legt den User-Agent ohnehin nicht ab —
       `persistEvent` (src/lib/analytics/persist.ts) schreibt fünf Spalten, und keine
       trägt ihn. Die Klarstellung bringt die REGEL auf den Stand des CODES, nicht
       umgekehrt.
       WARUM SIE TROTZDEM NÖTIG IST: Eine Aufzählung, die zwei Merkmale nennt, und ein
       Verbot, das eines davon nennt, lesen sich beim nächsten Zuschnitt als ABSICHT.
       Wer die Lücke für gewollt hält, legt den User-Agent ab und verstösst gegen nichts,
       was dastünde.

  PROVENIENZ DIESES BLOCKS, JE TEIL: (E2), (E3) und die Grenzen sind OWNER-ENTSCHEIDUNG
  (2026-09-22) auf Architekten-Vorschlag — KEINE Messung, KEINE Ableitung, eine
  FESTLEGUNG. (E4) ist ARCHITEKTEN-VORSCHLAG desselben Tages, vom Owner ohne Widerspruch
  übernommen. Die Code-Angaben in (E3) und (E4) sind GEMESSEN am Repo (CC, 2026-09-22,
  HEAD 9abdd2a); die Durchleitungs-Messung selbst stammt vom 2026-09-01 und ist an diesem
  Tag am selben Code bestätigt. Dass der Halbsatz an der Roadmap-Zeile 11.9 seit (E2) die
  engere Beschreibung trägt, ist eine ABLEITUNG aus dem Vergleich beider Wortlaute, keine
  Messung.
- COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH
  (Trigger: vor dem öffentlichen Launch; Phase 9): Für das A/B-Test-Cookie
  (__Host-ps_v) stellt Pagesmith dem Kunden heute KEINEN fertigen
  Doku-Schnipsel bereit, den er in seine eigene Datenschutzerklärung
  übernehmen könnte (Cookie-Name, Zweck, Lebensdauer) — das ist eine
  PRODUKTPFLICHT, kein Nice-to-have, weil der Kunde sonst mangels dieser
  Angabe rechtlich blank dasteht. Zusätzlich MUSS vor dem Launch anwaltlich
  geklärt werden, ob ein reines Varianten-Cookie tatsächlich ohne
  Einwilligung auskommt oder ob ein A/B-Test als Betreiber-Optimierung
  gilt, die eine Einwilligung verlangt — Letzteres würde den Split brechen
  (er muss vor dem ersten Rendern feststehen).
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- LABEL-VERGABE IST UNPROTOKOLLIERT (Trigger: vor öffentlichem Traffic bzw. mit
  dem Abuse-/Audit-Ausbau): assignDomainLabel und die Wiederherstellung
  schreiben KEINEN audit_logs-Eintrag, Custom-Domain-Mutationen dagegen schon
  (register.ts, remove.ts, je im finally). Das Tier-1-Item
  "Domain-Mutations-Audit-Log" ist damit nur teilweise erfüllt — und genau die
  Label-Vorgänge sind die, deren Historie man bei einer Divergenz bräuchte.
  Bewusst nicht in der Fix-Scheibe mitgebaut: writeAuditLog verlangt einen
  service_role-Client, den publishProject bewusst NICHT instanziiert
  (dokumentierte Entscheidung) — das umzustossen gehört in eine eigene Runde.
- DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT — ENTSCHIEDEN
  (Owner, 2026-08-12), Herleitung: Phase-11-Historie. ZWEI TRIGGER, je einzeln
  hinreichend: (i) die erste Scheibe, die MEHRERE EMPFÄNGER DESSELBEN TYPS JE PROJEKT
  baut — insbesondere die Phase 13, falls sie kundeneigene Endpunkte vorsieht; (ii) es
  zeigt sich, dass die KENNUNG NICHT IN DEN
  EINSTELLUNGS-BLOB GEHÖRT — GLEICHGÜLTIG AUS WELCHEM GRUND (Beispiele, KEINE
  abschliessende Liste: je Kennung ein eigenes Zugangsdatum · die Kennung selbst ein
  Geheimnis · server-autoritativ vergeben). (ii) nennt bewusst den GEGENSTAND und nicht
  den Anlass: eine engere Fassung fängt den wahrscheinlichsten Kipp-Fall nicht, und ein
  Trigger, der das nicht tut, schlägt nie an. GRENZE, die die Entscheidung trägt: dass die
  LinkedIn-URN eine KENNUNG ist und kein ZUGANGSDATUM, ist GELESEN (Anbieter-Doku,
  2026-08-11) und NICHT gemessen. KIPPT DIESE LESART, FALLEN BEIDE ACHSEN ZUSAMMEN, und
  die Entscheidung ist NEU zu treffen. Was still kaputtgeht: mehrere Zeilen mit demselben
  target im selben Projekt — der Schlüssel bricht, ohne dass der Trigger anschlägt.
  TRIGGER (i) IST AM 2026-09-19 ERSETZT — NICHT GESTEMPELT, UND DER GRUND IST, DASS ER IN
  SEINEM ALTEN WORTLAUT NIE MEHR ANSCHLAGEN KANN. Er lautete: "die Custom-Pixel-Vorfrage
  fällt zugunsten eines SERVER-Empfängers mit kundeneigenem Endpunkt". DIE VORFRAGE IST
  GEFALLEN, UND ZWAR ZUGUNSTEN VON (a), DEM CLIENT-SNIPPET (OWNER-ENTSCHEIDUNG 2026-09-19;
  docs/roadmap.md, Roadmap-Zeile 11.6, und docs/claude-history/phase-11.6-custom-pixel.md,
  Entscheidung P11.6-1 — der Standdatei jener Phase, die bis zum Phasenende am 2026-09-19
  docs/aktiver-stand.md hiess; der Zeiger ist im selben Zug nachgezogen).
  Ein Trigger, dessen Bedingung entgegengesetzt eingetreten ist, ist kein wartender
  Trigger mehr, sondern eine tote Zeile — und eine tote Zeile in einer Trigger-Liste sieht
  aus wie ein wachender Posten.
  DER NEUE WORTLAUT NENNT DIE SACHE STATT IHRES DAMALIGEN ANLASSES, aus demselben Grund,
  aus dem (ii) den Gegenstand nennt: Was den Schlüssel bricht, ist nicht "Custom-Pixel",
  sondern MEHRERE EMPFÄNGER DESSELBEN TYPS JE PROJEKT. Custom-Pixel war der einzige
  BEKANNTE Konsument dieser Achse, nicht der einzig mögliche.
  DIE PHASE 13 STEHT AUSDRÜCKLICH DABEI UND IST TROTZDEM NICHT DIE BEDINGUNG: Lesart (b)
  ist am 2026-09-19 dorthin verwiesen worden (docs/roadmap.md, Roadmap-Zeile 13), und
  jene Phase ist damit der wahrscheinlichste Ort, an dem der Trigger eintritt. Sie ist
  aber nur ein Beispiel — baut eine andere Scheibe mehrere Empfänger desselben Typs,
  schlägt er genauso an. Wer "Phase 13" als die Bedingung liest, verliert den Rest.
  TRIGGER (ii) IST UNVERÄNDERT. Die GRENZE darüber (die LinkedIn-URN) ist von dieser
  Ersetzung nicht berührt: Sie trägt die Entscheidung, nicht den Trigger.
  DER TITEL IST NICHT ANGEFASST, obwohl er seit Migration 0025 falsch ist — gemeint ist
  die EINDEUTIGKEIT, der Primärschlüssel ist seither die einspaltige id
  (project_secrets_pkey), und die Eindeutigkeit auf (project_id, target) liegt im UNIQUE
  project_secrets_project_id_target_key (GEMESSEN am Migrationstext und an
  docs/db-stand.md, CC, 2026-09-19). Der Titel wird ZITIERT; eine Umformulierung machte
  jeden Zeiger auf ihn tot. Dieselbe Abwägung ist in docs/immer-beachten.md an der Regel
  "MEHRERE KENNUNGEN JE ZIEL BRECHEN EINEN SCHLÜSSEL (PROJEKT, ZIEL) NICHT" bereits
  getroffen und begründet. OB DIESER POSTEN DIE RICHTIGSTELLUNG BEKOMMT, IST HIER NICHT
  ENTSCHIEDEN. Der Punkt ist am 2026-09-19 mit dem Phasenende 11.6 nach
  docs/claude-history/backlog-polish.md gehoben, Abschnitt "Aus Phase 11.6 gehoben
  (2026-09-19)", Eintrag P11.6-1; seine Herkunft ist der Vorrat der Standdatei jener Phase,
  die seit demselben Tag docs/claude-history/phase-11.6-custom-pixel.md heisst. KEINE
  EMPFEHLUNG.
  PROVENIENZ DIESER ERSETZUNG: OWNER-ENTSCHEIDUNG 2026-09-19; der Stub in CLAUDE.md,
  "## Offene Punkte", trägt den neuen Trigger-Wortlaut im SELBEN Zug und wörtlich gleich.
- DREI WEGE, AUF DENEN EIN WURF DAS 204-CONTAINMENT BRECHEN KÖNNTE — RANG OFFEN,
  UNGEMESSEN (Trigger: die Messung selbst — ein Lauf, der prüft, ob ein Wurf auf dem
  Ingest-Pfad die garantierte leere 204 bricht): (1) die zwei deckungsgleichen
  Normalisierungen vor dem geteilten Schwärz-Primitiv (asLogString in capi/meta-forward.ts,
  normalizeProviderValue in capi/tiktok-forward.ts) — fiele an einer der Riegel weg,
  erreichte ein Nicht-String redactOpaque, und das wirft; (2) ein Nicht-String als
  Zugangsdatum, der den Resolver passiert (CapiConfig.token in capi/token.ts); (3)
  getPixelId (lib/settings.ts) wirft bei einer Nicht-Zeichenketten-Kennung — die
  Optional-Verkettung schützt gegen null, nicht gegen eine Zahl. DER RANG WIRD HIER WEDER
  BEHAUPTET NOCH AUSGESCHLOSSEN: Bricht die 204, ist es ein Containment-Bruch und gehört
  ins Sicherheits-Manifest; wird der Wert nur gecastet, ist es eine Notiz. Ohne die Messung
  ist beides gleich plausibel. Was still kaputtgeht: das Containment ist als
  Sicherheitsregel geführt (Enumeration-Schutz) — bleibt die Messung aus, bleibt offen, ob
  eine Sicherheitszusage hält.
  VERMERK 2026-09-25 (Phasenende 11.7) — EINE MESSUNG DERSELBEN KLASSE LIEGT VOR, UND SIE
  DECKT EINEN TEIL. Der Text darüber bleibt stehen. GEMESSEN UND ABGELEITET STEHEN GETRENNT:
  · GEMESSEN (CC, 2026-09-23; Archiv der Phase 11.7, VERMERK P11.7-16): Ein Wurf im RUMPF
    eines async-Adapters — auch vor dessen `try` — wird zur Ablehnung, `Promise.allSettled`
    fängt sie, und die Antwort bleibt die leere 204. Zwei Belege: eine `node -e`-Probe mit
    Gegenprobe (ein SYNCHRONER Adapter lässt den Handler rejecten) und die Mutation m6 jener
    Scheibe — 103 rote Fälle, KEINER an Status oder Rumpf; in `ingest.persist.test.ts`,
    Fall (d), mit echtem Meta-Adapter standen `status 204` und der leere Rumpf vor der
    gescheiterten Zeile und bestanden. Die echte Wurfzone sind die SYNCHRONEN Glieder vor
    dem Fan-Out: die Lambdas in `FORWARDER_BY_TARGET`, `dispatchForward`, der
    map-Callback.
  · ABGELEITET, NICHT GEMESSEN (CC, 2026-09-25): WEG (1) — `asLogString`
    (`src/lib/capi/meta-forward.ts`) und `normalizeProviderValue`
    (`src/lib/capi/tiktok-forward.ts`) liegen in den Modulen der Adapter; stehen ihre
    Aufrufe im Rumpf der async-Adapter, fällt ein Wurf dort unter die Messung. Der
    Aufrufort ist NICHT einzeln geprüft. WEG (3) — `getPixelId` wird im RESOLVER gerufen
    (`getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`; GEMESSEN am Code), nicht im
    Adapter; die Messung DECKT IHN NICHT. WEG (2) — ob ein Nicht-String als Zugangsdatum
    schon im Resolver oder erst im Adapter wirft, ist hier nicht erhoben.
  DER TRIGGER ("die Messung selbst") IST DAMIT FÜR EINEN TEIL EINGETRETEN, NICHT FÜR DEN
  POSTEN. Er bleibt offen; der Rang ist weiter weder behauptet noch ausgeschlossen. Titel und
  Trigger sind nicht angefasst.
- BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE (Trigger: vor dem öffentlichen Launch; wie
  der COOKIE-DOKU-SCHNIPSEL darüber eine PRODUKTPFLICHT, kein Nice-to-have): (1) dass
  Pagesmith KEINEN Einwilligungs-Dialog mitliefert und ohne einen ALLE Ziele als erlaubt
  gelten — daraus folgt, dass "konform out-of-the-box" heute nicht zutrifft; (2) die GRENZE
  DER DEDUPLIZIERUNG in der belastbaren, NICHT-absoluten Fassung: unsere Deduplizierung
  führt Browser und Server über eine GETEILTE Ereignis-Kennung zusammen, und diese Zusage
  gilt für Ereignisse AUS DIESEM BUILDER; ein zusätzlich über Tag-Manager oder Shop-System
  eingebundenes Tag erzeugt FREMDE Kennungen, die keine Deduplizierung zusammenführen kann.
  AUSDRÜCKLICH NICHT "zu 100 % Konfigurationsfehler" — eine Absolutheits-Aussage wird vom
  ersten Gegenbeispiel widerlegt, und dann fällt die ganze Argumentation. Was still
  kaputtgeht: der Betreiber erfährt beides erst, wenn es ihn trifft.
  RICHTIGGESTELLT AM 2026-09-16 (Hebung Phase 11.5) — DIE ERSTE HÄLFTE VON PUNKT (1) TRIFFT
  NICHT MEHR ZU, UND DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN. Seit Commit `7516bce` (Scheibe
  11.5d, 2026-09-14) LIEFERT Pagesmith einen Einwilligungs-Dialog mit, seit `5fd6d48` in zwei
  Formen (Leiste und Fenster), seit `9f85c0c` mit zwei Gruppen und seit `e061d7b` mit einem
  Widerruf (GEMESSEN am Repo, CC, 2026-09-16).
  RICHTIGGESTELLT UND NICHT GESTEMPELT: Die Aussage ist eine TATSACHENBEHAUPTUNG ÜBER DEN
  CODE und altert mit ihm; wer sie beim öffentlichen Launch als Vorlage nimmt, dokumentiert
  ein Produkt, das es nicht mehr gibt (docs/immer-beachten.md, „EINE REGEL KANN GÜLTIG
  BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD").
  DIE ZWEITE HÄLFTE BLEIBT WAHR, und sie trägt den Punkt weiter: Bei AUSGESCHALTETEM Dialog
  gelten weiterhin ALLE Ziele als erlaubt, und das ist die Vorgabe — `consentBlocksFor`
  (`src/lib/analytics/pageview-emitter.ts`) erzeugt im `off`-Zweig keinen Baustein, der Hook
  bleibt ungesetzt, und „nicht gesetzt heisst erlaubt" (GEMESSEN am Code, CC, 2026-09-16).
  WAS DAMIT AN DER FOLGERUNG HÄNGT UND HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN WIRD: Der Satz
  „konform out-of-the-box trifft heute nicht zu" ruhte auf der ersten Hälfte. Er ruht jetzt
  auf dem Schalter-Zustand — ein Dialog EXISTIERT, aber er ist im Auslieferungs-Zustand AUS.
  Ob die Dokumentation das so sagt, wie die Formulierung künftig lautet und ob der
  Vorgabewert des Schalters zu ändern wäre, ist KEINE Frage dieser Richtigstellung. KEINE
  EMPFEHLUNG.
  DER TRIGGER DES POSTENS IST UNBERÜHRT — vor dem öffentlichen Launch.
  HERKUNFT: Vorrats-Eintrag (21) der Phase 11.5, angelegt 2026-09-16 mit dem ausdrücklichen
  Zweck, dass der Befund beim Phasenende nicht untergeht; er ist mit dieser Richtigstellung
  EINGELÖST und an seiner Nummer gestrichen. Denselben Befund hält die bindende Entscheidung
  (24) jener Phase im Absatz über ihren Preis fest.
  ERGÄNZT AM 2026-08-19 (Hebung Phase 11.1) — PUNKT (2) IST SEIT 11.1f NICHT MEHR NUR
  THEORETISCH BERÜHRT, und der Text darüber bleibt unverändert: Das VIERTE Ziel sendet seit
  dem 2026-08-19. Die Zusage oben ist über die HERKUNFT der Ereignisse formuliert („gilt für
  Ereignisse AUS DIESEM BUILDER") und NICHT über das Ziel — für dieses Ziel wäre sie dem
  Wortlaut nach ANWENDBAR und trotzdem UNBELEGT.
  WAS GEMESSEN IST (docs/ziel-befunde.md, Teil (p), 2026-08-19): Das Feld für eine
  mitgegebene Ereignis-Kennung EXISTIERT und wird angenommen — belegt durch eine
  Positivkontrolle im selben Lauf, in der ein ERFUNDENES Feld mit 422 abgewiesen wurde.
  WAS NICHT GEMESSEN IST UND MIT DEN HEUTIGEN INSTRUMENTEN AUCH NICHT MESSBAR IST (Teile (q)
  und (h)): dass der Anbieter damit DEDUPLIZIERT. Die Anzeige-Zahlen reagieren auf Testdaten
  überhaupt nicht — ein Kontroll-Lauf mit einer NEUEN Kennung bewegte sie so wenig wie ein
  wiederholter —, und eine Zuordnung zu einer echten Person tritt bei Testdaten prinzipiell
  nicht ein.
  FOLGE FÜR DIE DOKUMENTATION, und sie ist der Grund dieser Ergänzung: Der Adapter KANN die
  Kennung mitschicken und tut es; eine ZUSAGE an den Kunden wird daraus nicht. Die beiden
  Sätze sind nicht dasselbe, und nur der erste ist gedeckt.
  TRIGGER FÜR DIE KLÄRUNG: sobald echter Traffic eine Zuordnung zu einer echten Person
  erzeugt. HIER WIRD NICHT ENTSCHIEDEN, ob und wie die Formulierung oben nachgezogen wird.
  ERGÄNZT AM 2026-08-20 — PUNKT (2) IST FÜR DIESES ZIEL NICHT MEHR NUR UNBELEGT, SONDERN
  AN EINE VORAUSSETZUNG GEBUNDEN, DIE WIR NICHT ERFÜLLEN. Der Text darüber bleibt
  unverändert; die Ergänzung vom 2026-08-19 sagt "dem Wortlaut nach ANWENDBAR und trotzdem
  UNBELEGT" — DAS IST ZU SCHWACH GEWORDEN.
  WAS GELESEN IST (2026-08-20): Die Deduplizierung dieses Anbieters verlangt eine
  BROWSER-SEITIGE Conversion-Regel und eine Ereignis-Kennung, die AUS DEM BROWSER stammt
  und mit dem Server-Ereignis mitreist. Pagesmith liefert für dieses Ziel KEIN
  Browser-Tag aus und kann die Kennung an keine Browser-Regel übergeben. DIE MECHANIK WIRD
  HIER NICHT WIEDERHOLT — sie steht in docs/ziel-befunde.md, Abschnitt "LinkedIn
  (Conversions API)", Teil (y); zwei Fassungen liefen auseinander.
  DIE ZWEITE HÄLFTE GEHÖRT DAZU UND IST DIE TEURERE: Hat ein Kunde ein EIGENES Insight Tag
  mit eigener Conversion-Regel, zählt der Anbieter ohne gemeinsame Kennung BEIDE
  Ereignisse — dieselbe Conversion erscheint DOPPELT. Das ist nicht "keine Deduplizierung",
  sondern eine FALSCHE ZAHL beim Kunden, und sie fällt ihm auf, bevor sie uns auffällt.
  WAS DAS NICHT BERÜHRT: die eigene Adblocker-Verlustrate. Sie rechnet aus der eigenen
  events-Tabelle und hat mit der Zählung des Anbieters nichts zu tun.
  WAS HIER NICHT ENTSCHIEDEN WIRD: wie die Zusage an den Kunden künftig lautet und ob
  Pagesmith je ein Insight Tag ausliefert. KEINE EMPFEHLUNG.
  (3) was der TESTMODUS bewirkt und was nicht: Er läuft je (Projekt, Ziel) für eine feste
  Frist von einer Stunde; solange er an IRGENDEINEM Ziel läuft, nimmt der Riegel JEDES
  Ereignis des Projekts aus `events` — die eigene Auswertung zählt dann nicht, während beim
  Anbieter weiter ankommt. Was der Anbieter mit dem markierten Ereignis tut, ist
  ZIEL-ABHÄNGIG: meta zählt es weiter (GELESEN), pinterest führt es nicht in der
  Eventübersicht (GEMESSEN, allein die Berichterstattung), bei tiktok ist es ungeprüft; für
  linkedin und google gibt es gar keinen Testmodus. Was still kaputtgeht: Die Oberfläche
  erklärt das nur, solange der Testmodus läuft; wer später nachliest, warum eigene und
  fremde Zahlen auseinanderliefen, findet keine Dokumentation.
  GEHOBEN AM 2026-09-11 aus Vorrat (3) der Phase 11.3, Restlücke (a); sein Trigger ist der
  des Postens. Den Fall NACH dem Ende eines Testmodus führt der Posten "NACH DEM ENDE EINES
  TESTMODUS ERKLÄRT NICHTS DIE LÜCKE IN DER EIGENEN KURVE". KEINE EMPFEHLUNG, was zu
  schreiben wäre.
  BEFUND ZUM TRIGGER: Dieser Punkt kann FRÜHER fällig werden als der Posten — Vorrat (3)
  trug als offene Hälfte seines Triggers "spätestens der erste fremde Nutzer, der den
  Testmodus einschaltet", und ein Beta-Start mit fremden Nutzern läge vor dem Launch.
  (4) FÜNF EIGENSCHAFTEN DES CUSTOM-PIXELS, DIE EIN BETREIBER NICHT ERRATEN KANN — ERGÄNZT
  AM 2026-09-19 (Phasenende 11.6, aus Vorrat P11.6-4). DER TITEL DIESES POSTENS SAGT "DREI
  PUNKTE" UND IST DAMIT EINE HISTORISCHE ZAHL, nicht mehr die heutige; er wird NICHT
  geändert, weil er zitiert wird — dieselbe Abwägung wie am Titel des Eindeutigkeits-Postens
  weiter oben. Wer nach der Zahl geht, zählt falsch; wer nach dem Titel sucht, findet.
  · `<noscript>` HAT AUF DIESEM PFAD KEINE WIRKUNG. Der Lader entfernt jedes `<noscript>`
    aus dem geparsten Snippet — nötig, weil sein Inhalt sonst als gewöhnliches Bild in die
    Seite käme und JEDEN Seitenaufruf ein zweites Mal zählte. Ein Rückfall für Besucher ohne
    JavaScript kann hier ohnehin nie greifen: Er wirkt nur bei ausgeschaltetem Skripting,
    und dann läuft der Lader gar nicht. Wer ihn für wirksam hält, zählt jene Besucher
    fälschlich als erfasst.
  · AUF BEREITS VERÖFFENTLICHTEN SEITEN IST `custom` ABGELEHNT, bis der Besucher neu
    entscheidet. Ein gespeicherter `ps1:`-Wert bleibt gültig, führt den neuen Schlüssel aber
    in keiner seiner zwei Listen, und `hookFrom` setzt ihn dann auf `false`
    (`src/lib/tracking/consent-store.ts`). Fail-closed und richtig — aber unerklärt sieht es
    aus wie ein Defekt.
  · EINE CSP OHNE `unsafe-eval` AUF DER KUNDENSEITE LEGT DIE EREIGNISZEILE STILL. Sie läuft
    über `new Function`; eine `<meta http-equiv>`-CSP im importierten HTML kann das
    verbieten. Der Ausfall ist gefangen und damit LAUTLOS — die Zeile tut dann nichts. Der
    Basis-Code ist nicht betroffen (echtes Script-Element). Wir selbst liefern keine CSP aus
    (GEMESSEN, CC, 2026-09-19).
  · VERSCHACHTELTE `<script>`-ELEMENTE LAUFEN NICHT. Der Lader baut ein frisches
    Script-Element nur für die OBERSTE Ebene; ein `<script>` in einem `<div>` kommt als
    geklonter Knoten in die Seite und wird nicht ausgeführt. Wer sein Snippet in einen
    Container wickelt, bekommt es still nicht ausgeführt. ABLEITUNG, nicht gemessen.
  · BEI EINEM KNOPF MIT WEITERLEITUNG IST OFFEN, OB DIE ANFRAGE DES NETZWERKS SIE ÜBERLEBT.
    Die Zeile läuft garantiert vorher (T4); was sie auslöst, ist Betreiber-Code. S. den
    Posten "CUSTOM-PIXEL: QA UND BETREIBER-HINWEISE VOR DEM LAUNCH", Punkt (2) — die
    MESSUNG dieser Frage steht dort, die Betreiber-ERKLÄRUNG hier.
  Was still kaputtgeht: Alle fünf sind LAUTLOS. Der Betreiber sieht kein Fehlerbild, sondern
  Zahlen, die nicht stimmen — oder Conversions, die fehlen. KEINE EMPFEHLUNG, wie die Sätze
  lauten oder wo in der Oberfläche sie stehen sollen.
  (5) WARNUNGEN IN DEN OBERFLÄCHEN DER NETZWERKE — ERGÄNZT AM 2026-09-24, OWNER-VORGABE.
  ANLASS: Betreiber sehen in den Oberflächen der Netzwerke Hinweise wie "external_id is
  missing" und halten sie für einen Fehler von Pagesmith. Die Betreiber-Hilfe muss das
  auffangen, BEVOR fremde Kunden kommen. Was still kaputtgeht: Der Betreiber sucht einen
  Fehler, den es nicht gibt, oder hält einen echten für einen Hinweis — beides endet als
  Support-Fall oder als verlorenes Vertrauen, nicht als Fehlermeldung.
  WAS DIE HILFE TRENNEN MUSS — ZWEI FRAGEN, NICHT EINE:
  · "KOMMT ES AN?" — je Netzwerk das GEMESSENE Instrument, mit Verweis auf die Ziel-Befunde:
    meta die Test-Events-Ansicht mit "Benutzer-Datenschlüssel" am Server-Ereignis
    (docs/ziel-befunde/meta.md, Teile (ab), (ad)) · tiktok der Reiter "Test Events"
    (docs/ziel-befunde/tiktok.md, Teile (q), (r)) · pinterest "Events testen", ein Live-Strom
    ohne Rückschau, VOR dem Auslösen zu öffnen (docs/ziel-befunde/pinterest.md, Teile (w),
    (am), (as)) · linkedin: KEIN belegtes Instrument — "Data last received" hat am 2026-09-24
    auf zwei direkt angenommene Aufrufe nicht reagiert (docs/ziel-befunde/linkedin.md, Teil
    (be)) · google: das Instrument ist aus docs/ziel-befunde/google.md zu erheben (laut
    Verzeichnis u. a. MESSUNG G, Teile (cf), (cg)); HIER NICHT GELESEN.
  · "WAS BEDEUTEN DIE HINWEISE?" — die Warnungen sind EMPFEHLUNGEN des Anbieters für mehr
    Signale, keine Ablehnung und kein Fehler: pinterest verarbeitet das Ereignis und meldet
    "external_id is missing" in JEDER Antwort (GEMESSEN, docs/ziel-befunde/pinterest.md,
    Teile (al)(iv), (ar)).
    VORBEHALT (2026-09-25): "in JEDER Antwort" ist im TESTMODUS gemessen; über den echten Weg
    OHNE Testmodus fehlte die Warnung bei einem Aufruf (docs/ziel-befunde/pinterest.md, Teil
    (at)). Der Satz davor bleibt wörtlich.
  EHRLICH, JE ZIEL: was Pagesmith sendet und was nicht, und warum. Die Aufstellung dessen,
  was gesendet, was ausgeschlossen und was offen ist, steht je Ziel im Archiv der Phase 11.7
  (docs/claude-history/phase-11.7-anbieter-befunde.md, VERMERK P11.7-25, "PUNKT 5, JE ZIEL",
  fortgeschrieben bis VERMERK P11.7-30); die Hilfe übernimmt sie nicht ungeprüft, sondern
  misst sie beim Schreiben am Code nach.
  VERBOTEN, WEIL UNWAHR (ARCHITEKTEN-BEFUND zum Owner-Entwurf, 2026-09-24):
  · "100 % der verfügbaren Signale" — E-Mail und Telefon werden bewusst NICHT gesendet
    (Roadmap-Zeile 11.7, Grenze des fünften Punktes; der Eintrag "DATENKLASSEN-GRENZE VOR DER
    ERSTEN PII-SCHEIBE" oben), das übrige Personenbezogene ebenso nicht (Frage F3 der Phase
    11.7), `external_id` ebenso nicht — eine
    offene Owner-Frage (ZUSCHNITT-FRAGE P11.7-4 der Phase 11.7) —, dazu die Cookie-Wege der
    Anbieter.
  · "kein negativer Einfluss" — die Anbieter nennen selbst eine Wirkung: pinterest schreibt
    zu `external_id` "It may improve reporting performance such as ROAS/CPA"
    (docs/ziel-befunde/pinterest.md, Teil (ar)). Was ein fehlendes Signal tatsächlich
    kostet, ist UNGEMESSEN — "kein Einfluss" wäre eine Behauptung ohne Messung.
  · ein Anbieter-Status wie "processed" als allgemeine Aussage — pinterest nimmt auch einen
    nicht registrierten Ereignisnamen als `processed` an (Teil (al)(ii)), und die Quittung
    von tiktok ist für Feldnamen blind (docs/ziel-befunde/tiktok.md, Teil (q)). Ein
    Erfolgsstatus belegt die Annahme, nicht die Richtigkeit.
  WORAN ES HÄNGT: an Vorrat P11.7-9 der Phase 11.7 (ein Erfolgs-Instrument in der App) und an
  ZUSCHNITT-FRAGE P11.7-4 der Phase 11.7 (`external_id`) — beide verringerten die Warnungen
  bzw. die Nachfragen, und jede Entscheidung dort ändert, was die Hilfe sagen muss.
  WANN DER TEXT ENTSTEHT: ERST vor dem Launch, nicht jetzt — die Warntexte der Anbieter
  ändern sich, und ein früh geschriebener Text zitierte dann Meldungen, die es nicht mehr
  gibt. Der Trigger ist der des Postens.
- DIE VOLLSTÄNDIGKEITS-ACHSE IST NICHT GEBAUT ("Kennungen für ALLE Ereignisse vorhanden") —
  VERSCHOBEN INS BACKLOG AM 2026-09-25 (Sichtung beim Phasenende 11.7, ARCHITEKTEN-
  ENTSCHEIDUNG). Grund: Die Achse hat keinen realen Konsumenten; was still kaputtginge, setzt
  eine gebaute Achse voraus. Der Trigger ist seit dem 2026-08-31 eingetreten und bleibt es.
  Der Volltext steht WÖRTLICH in docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase
  11.7 gehoben (2026-09-25) …", unter diesem Titel.
- CLAUDE.md NÄHERT SICH DEM LADELIMIT — GESTRICHEN AM 2026-09-25, DER GEGENSTAND IST ERLEDIGT.
  Der Punkt hielt fest, dass CLAUDE.md und danach docs/immer-beachten.md, die beide JEDE
  Sitzung laden, auf das Ladelimit zuwuchsen — und dass eine nicht gehobene Regel nicht mehr
  gelesen wird. Sein Trigger lautete "vor der nächsten Hebung an einem Phasenende"; er trug
  seit dem 2026-09-10 die Lade-Proben (a) bis (o).
  BELEG DER ERLEDIGUNG:
  · Beide Dateien sind am 2026-09-22 in Kern und Herleitung geteilt worden —
    docs/immer-beachten.md mit Commit `22deb39`, CLAUDE.md mit Commit `cccc23f`
    (Token-Diät). Seither lädt je Datei nur der Kern; der Volltext steht in
    docs/immer-beachten-herleitung.md bzw. docs/claude-md-herleitung.md und lädt nicht.
  · DIE GRÖSSEN AM 2026-09-25, vor der Hebung des Phasenendes 11.7 (GEMESSEN, CC): CLAUDE.md
    70 202 Bytes / 69 076 Zeichen, docs/immer-beachten.md 86 081 Bytes / 84 763 Zeichen,
    beide reines LF; Zeichen als Unicode-Codepoints. Die Schwelle, die das Werkzeug meldet,
    liegt bei 150,0k Zeichen JE DATEI (Teil (e), BEOBACHTET am 2026-09-11, OWNER).
  · Die letzte Lade-Probe (o) ist VOR den beiden Teilungen gefahren und kennt sie nicht; der
    Posten hatte seinen Gegenstand damit verloren, ohne es zu sagen.
  · DIE GRENZE: Ob beide Kerne zusammen einer gemeinsamen Grenze unterliegen, ist nicht
    erhoben; die Schwelle aus (e) ist je Datei gemeldet. Eine neue Lade-Probe ist mit dieser
    Streichung nicht gefahren.
  · EIN BEFUND STAND NUR HIER und geht mit dem Volltext ins Archiv, nicht in eine Regel:
    `grep` sieht eine Nadel, die über einen Zeilenumbruch läuft, nicht und meldet 0, wo
    `perl -0777` sie findet (Nachtrag vom 2026-09-22, zweimal beobachtet). Er ist weder Regel
    noch Vorrat geworden.
  · Die Streichung ist ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25 (Phasenende 11.7). Der
    gestrichene Volltext steht unter Commit `3e080b2`.
- DIE ADBLOCKER-KACHEL ZÄHLT EINE ABGELEHNTE EINWILLIGUNG ALS VERLUST (Trigger: Phase 11.5
  — mit einem Einwilligungs-Dialog wird der Defekt real; HEUTE FÄLLT ER NICHT AUF, weil
  ohne Dialog nie etwas abgelehnt wird): GEMESSEN am 2026-08-12, read-only am Code.
  DER MECHANISMUS: Wird EIN Ziel abgelehnt und ein anderes erlaubt, geht der Beacon hinaus
  und die Server-Zeile entsteht, die Browser-Bestätigung bleibt aus — der Nenner der
  Adblocker-Kachel wächst ohne den Zähler. Die Zahl steigt, obwohl nichts geblockt wurde:
  Sie liest sich als Adblocker-Verlust und ist in Wahrheit eine Einwilligungs-Entscheidung.
  Im Ein-Ziel-Pfad war das unmöglich — dort unterblieb ohne Einwilligung der ganze Beacon.
  WAS DIE BEHEBUNG BRAUCHT: zu wissen, ob das betreffende Ziel JE EREIGNIS eingewilligt
  war. Die events-Tabelle trägt keine Ziel-Spalte — genau die EIGENE ADDITIVE SPALTE, die
  für Ziele ohnehin vorgesehen ist (s. "TRACKING-source = BEOBACHTUNGS-ORT, NIE ZIEL" in
  docs/immer-beachten.md). Deshalb ist das eine ANALYTICS-Arbeit und keine Consent-Arbeit.
  WARUM ER AM 2026-08-14 HIERHER GEWANDERT IST: Er stand in der Phase-8-Roadmap-Zeile
  zwischen fünf IDEEN OHNE TERMIN UND OHNE ZUSAGE und wurde deshalb wie eine gelesen. Er
  ist keine Idee, sondern ein GEMESSENER Fehler mit benanntem Trigger.
  Was still kaputtgeht: Sobald ein Einwilligungs-Dialog steht, meldet die Kachel
  Adblocker-Verluste, die keine sind — und das ist die Marquee-Metrik des Produkts, an
  der man der Zahl nichts ansieht.
  Herleitung: docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, "## 7.
  Beschlossen und verortet — NICHT in dieser Phase gebaut".
  ERGÄNZT AM 2026-09-12 — EINE ZWEITE WIRKUNG, DIE OBEN NICHT STEHT: DER STICHTAG. Der Text
  darüber bleibt WÖRTLICH und wird von dieser Ergänzung nicht angetastet; er beschreibt die
  Wirkung auf die RATE. Daneben tritt die Wirkung auf das FENSTER. GEMESSEN am Code (CC,
  2026-09-11, am 2026-09-12 nachgeprüft), read-only.
  DER NENNER BEGINNT NICHT BEI NULL, SONDERN BEIM STICHTAG: get_adblock_loss
  (supabase/migrations/0015_adblock_loss.sql) filtert mit created_at >= first_confirm, und
  first_confirm ist das min(created_at) der frühesten VERANKERTEN Bestätigung — einer
  browser-Zeile, zu deren event_id auch eine server-Zeile existiert.
  FOLGE: Bleibt die Bestätigung aus, weil die Einwilligung für dieses Ziel abgelehnt wurde,
  verschiebt sich bei einem Projekt OHNE bisherige Bestätigung der Stichtag auf einen
  SPÄTEREN Zeitpunkt — oder er entsteht gar nicht. Dann fällt nicht nur die Rate falsch aus:
  DAS FENSTER SELBST VERSCHIEBT SICH, und mit ihm RÜCKWIRKEND der Nenner. EINE RATE KANN SICH
  ÄNDERN, OHNE DASS EIN EREIGNIS DAZUGEKOMMEN IST — das ist die Eigenschaft, die man einer
  Zahl am wenigsten ansieht.
  DER GRENZFALL: Ist der Stichtag NULL, ist der Vergleich gegen NULL selbst NULL, es passiert
  KEINE Zeile den Filter, die RPC liefert (0, 0, NULL), und das UI zeigt den Neutral-Status
  "Warte auf erste Bestätigung" (MeasureView.tsx, Verzweigung auf first_confirm_at === null
  bzw. total_server_conversions === 0). DER NENNER IST DANN 0 BEI BELIEBIG HOHER STATISTIK.
  DIE VERWANDTSCHAFT, UND SIE IST NICHT NEU, NUR AN DIESEM POSTEN NOCH NICHT VERMERKT:
  Dieselbe Mechanik notiert das Sicherheits-Manifest (CLAUDE.md, Tier 2, Eintrag
  DATA-RETENTION) für das spätere events-Pruning — "löscht ein Retention-/Aggregations-Pruning
  die ERSTE verankerte source='browser'-Bestätigung eines Projekts, springt der selbstheilende
  Stichtag der Adblocker-Verlustrate nach vorn -> die angezeigte Rate ändert sich RÜCKWIRKEND
  und STILL". ANDERE URSACHE, DIESELBE WIRKUNG.
  ACHTUNG BEIM WORTLAUT, sonst liest jemand die beiden als Gegensätze: Jener Eintrag sagt
  "nach vorn", dieser "auf einen späteren Zeitpunkt". GEMEINT IST BEIDE MALE DIESELBE
  RICHTUNG — der Stichtag rückt zeitlich nach hinten, das Fenster wird kleiner.
  KEINE EMPFEHLUNG, was daraus folgt. TITEL UND TRIGGER DIESES POSTENS BLEIBEN UNVERÄNDERT;
  der Stub in CLAUDE.md ist deshalb nicht nachzuziehen.
  PROVENIENZ DER ERGÄNZUNG: Der Filter, der Stichtag und der Grenzfall sind GEMESSEN am Code
  (CC, 2026-09-11, am 2026-09-12 nachgeprüft) — supabase/migrations/0015_adblock_loss.sql und
  src/components/MeasureView.tsx. Der zitierte Satz ist GELESEN in CLAUDE.md (CC, 2026-09-12).
  Dass beide Formulierungen dieselbe Richtung meinen, ist eine ABLEITUNG aus der Mechanik des
  min() über die verbleibenden Bestätigungen, KEINE Aussage jenes Eintrags über diesen.
  VERMERK 2026-09-25 (Sichtung beim Phasenende 11.7) — DER TRIGGER IST EINGETRETEN. Er
  lautete "Phase 11.5 — mit einem Einwilligungs-Dialog wird der Defekt real". Der Dialog ist
  gebaut; die Phase 11.5 ist seit dem 2026-09-16 abgeschlossen (docs/roadmap.md, Zeile 11.5).
  Der Defekt ist UNBEARBEITET: die events-Tabelle trägt weiterhin keine Ziel-Spalte. Der
  Posten bleibt; der Stub in CLAUDE.md sagt seither "EINGETRETEN". Dieselbe Ziel-Achse
  braucht K4 (s. "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN", Ursache (3),
  Vermerk vom 2026-09-25).
- NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST (Trigger: BEREITS
  EINGETRETEN — vier Ziele laufen live (GEMESSEN am Code, 2026-08-21: meta · pinterest ·
  tiktok · linkedin), und jedes kann nachträglich konfiguriert werden;
  hier steht bewusst KEIN Zeitpunkt, ein erfundener liesse den Posten als terminiert
  aussehen): GEMESSEN am Code (2026-08-18).
  DER SACHVERHALT, vier Achsen:
  · loadProject (src/app/projects/actions.ts) projiziert published_content NICHT — der
    Client hält den veröffentlichten Stand gar nicht. Der Grund steht als Kommentar an
    getVariantBPublished: der Blob bleibt BEWUSST ausserhalb des Ladepfades.
  · Das Einzige, was aus dem publizierten Stand zurückkommt, ist ein BOOLEAN
    (getVariantBPublished -> deliverableVariantB): trägt er eine lieferfähige Variante B?
    KEIN Inhaltsvergleich, KEIN Zeitstempel, KEIN Hash.
  · Der einzige Zustand, den der Editor kennt, ist dirty — Editor gegen GESPEICHERT, nie
    gegen VERÖFFENTLICHT.
  · Es gibt KEINEN Hinweis, KEINE Anzeige und KEINEN Riegel auf ein nötiges
    Neu-Veröffentlichen — für KEINEN Anlass. ZWEI Fundstellen sehen so aus und sind es
    nicht: die Knopfbeschriftung "Erneut veröffentlichen" (PublishView.tsx) sagt, dass
    schon einmal publiziert wurde, und die Meldung über den veralteten Tab
    (publishProject in actions.ts) betrifft Variante B beim Publish-VORGANG selbst.
  WARUM ER BEISST — der Ablauf gehört hierher, sonst liest ihn jemand als Aufräumarbeit:
  Ein Kunde fügt ein zweites Ziel hinzu und trägt Kennung und Zugangsdaten ein. Die Karte
  meldet "Zugangsdaten hinterlegt". Veröffentlicht er NICHT neu, trägt die ausgelieferte
  Seite den Einwilligungs-Schlüssel dieses Ziels nicht — am Ingest greift fail-closed, es
  geht KEIN Forward hinaus. Keine Meldung, kein Fehler, nichts wird rot. Der Draht ist
  eine EINBAHNSTRASSE: Der Schlüsselsatz entsteht zur ERZEUGUNGSZEIT, und ein
  Code-Deploy erreicht einen publizierten Text nicht.
  DIE ZWEI LESARTEN, UND SIE SIND DER KERN DIESES EINTRAGS: Derselbe Sachverhalt steht in
  docs/immer-beachten.md bereits — aber als BELEG einer Regel über LIVE-TEST-ANLEITUNGEN
  ("EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES PRÜFLINGS VORAUS"), im Wortlaut: "Ein
  ausgelieferter Consent-Schlüssel entsteht zur ERZEUGUNGSZEIT; wer nach dem Eintragen
  einer Kennung nicht neu veröffentlicht, misst ein fail-closed-Verhalten und schreibt es
  dem Adapter zu." Als TESTDISZIPLIN gelesen ist das eine Fussnote; als PRODUKTAUSSAGE
  gelesen ist es ein stiller Conversion-Verlust bei JEDEM Kunden, der ein Ziel hinzufügt.
  JENE REGEL WIRD NICHT GEÄNDERT — sie ist als Testdisziplin richtig; dieser Eintrag
  tritt DANEBEN und nennt die zweite Lesart.
  Was still kaputtgeht: Conversion-Verluste SICHTBAR zu machen ist das Verkaufsargument
  dieses Produkts — hier verliert der Kunde sie, ohne dass die Oberfläche etwas anderes
  sagt als "konfiguriert".
  WAS HIER NICHT ENTSCHIEDEN WIRD, ausdrücklich: ob die Lösung ein Hinweis, eine Anzeige
  oder ein Riegel ist, und wo sie sitzt. Dieser Eintrag nennt den BEFUND, nicht den Bau.
  ERGÄNZT AM 2026-08-19 (Hebung Phase 11.1) — EINE DRITTE EBENE, UND SIE TRITT NEBEN DEN
  TEXT DARÜBER, ohne ihn zu ändern: Der Eintrag oben behandelt EDITOR gegen VERÖFFENTLICHT
  — dort ist der publizierte Text wirklich alt. DANEBEN steht VERÖFFENTLICHT gegen
  AUSGELIEFERT: der publizierte Text ist KORREKT, und nur seine Auslieferung ist veraltet.
  GEMESSEN am lebenden System (2026-08-18, beim Live-Test der Scheibe 11.1d): Die Live-Seite
  zeigte nach dem Publish den ALTEN Text, mit einer Pixel-Kennung, die der Editor-Stand
  nicht mehr trug. Ein Neuladen mit F5 half NICHT; erst ein Aufruf mit einem zusätzlichen
  URL-Parameter zeigte den korrekten Stand. DIE GEGENPROBE IST DER GRUND, WARUM DAS HIER
  STEHT und nicht als Defekt jener Scheibe: In der Datenbank (SQL, 2026-08-18) trug
  `published_content` den neuen Schlüssel und NICHT mehr die alte Kennung, `updated_at` lag
  nach dem Publish. Der Publish hatte vollständig gegriffen — es war der BROWSER-CACHE.
  Ohne diese zweite Prüfung wäre es als Fehlschlag protokolliert worden.
  WAS NICHT GEMESSEN IST und offen bleibt: OB und WELCHE Cache-Header die Serve-Route setzt
  und mit welcher Lebensdauer. Die Route war in jener Phase durchgehend geschützt und ist
  NICHT gelesen worden.
  DIE BEIDEN EBENEN WERDEN NICHT ZUSAMMENGEZOGEN — verschiedene Ursachen, verschiedene
  Lösungen: oben liegt die Lösung im Produkt (Hinweis, Anzeige oder Riegel), hier in den
  Auslieferungs-Kopfzeilen. Wer sie zusammenzieht, sucht die eine an der Stelle der anderen.
  DIESELBE MESSUNG BEANTWORTET EINE DRITTE FRAGE, und deshalb steht der Zeiger hier: Was der
  Cache heute tut, entscheidet auch, ob ein Datenbankausfall die Kundenseiten überhaupt
  erreicht — s. den Eintrag „JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER
  KUNDENSEITEN" weiter unten. EINE Aufklärung, drei Antworten.
  Was still kaputtgeht: Ein Kunde, der nach dem Publish auf seiner Seite nachsieht, macht
  dieselbe Erfahrung — und schliesst, das Publish habe nicht gegriffen.
- JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN (Trigger: der erste
  echte Kunden-Traffic. HEUTE IST NICHTS ZU TUN, und der Grund gehört in den Eintrag: Bis
  der Owner das Produkt selbst vollständig geprüft hat, sieht es kein Kunde; ein Ausfall
  kostet derzeit NULL. Alles davor wäre gebaute Vorsorge gegen ein Risiko, das nicht
  existiert — "Erst der nutzbare Kern, dann Infrastruktur"): Solange jeder Aufruf einer
  veröffentlichten Kundenseite ZUR LAUFZEIT durch die Datenbank läuft, trifft jede Störung
  dort — geplant wie ungeplant — nicht nur den Editor, sondern die Landing-Pages FREMDER
  Kunden mitten in laufenden Kampagnen. Ein Postgres-Upgrade, ein Wartungsfenster oder ein
  Ausfall beim Anbieter genügt.
  DREI EBENEN, SEHR UNGLEICH SCHWER — sie bleiben GETRENNT. Wer sie zusammenzieht, hält den
  Editor-Fall für lösbar oder den Kundenseiten-Fall für Infrastruktur:
  · KUNDENSEITEN — die schwerste. Das veröffentlichte HTML ist ein FERTIGER Text, der sich
    zwischen zwei Veröffentlichungen NICHT ändert; er müsste nicht bei jedem Aufruf neu
    geholt werden. Das ist die Ebene, auf der ein Ausfall unbemerkt bleiben KÖNNTE.
  · INGEST — teilweise lösbar. Ein Conversion-Ereignis lässt sich nicht aus einem
    Zwischenspeicher beantworten, es muss irgendwo hin. Puffern statt verwerfen ginge,
    braucht aber eine Hintergrundausführung.
  · EDITOR — nicht lösbar und soll es nicht sein. Er schreibt in die Datenbank; steht sie,
    kann er nicht schreiben. Die ehrliche Lösung ist eine SICHTBARE Meldung, kein stiller
    Fehlschlag.
  WAS DEN AUSFALL BESONDERS TEUER MACHT: Der Ingest antwortet in JEDEM Pfad mit einer
  leeren 204 — das ist Absicht und richtig, sonst verriete er den Gültigkeitszustand eines
  Tracking-Keys (s. "INGEST-204-CONTAINMENT" in docs/immer-beachten.md). Die Folge im
  Störungsfall ist aber, dass der Browser des Besuchers eine KORREKTE Antwort bekommt und
  NIEMAND erfährt, dass die Conversion nirgends angekommen ist.
  WAS GEMESSEN IST UND WAS NICHT:
  · GEMESSEN (Caching-Gate, Phase 9; 2026-07-27, curl gegen eine veröffentlichte Seite):
    Die Serve-Route läuft bei JEDEM Besucher-Request, das CDN fängt nichts ab —
    X-Vercel-Cache: MISS bei allen Aufrufen. Herleitung:
    docs/claude-history/phase-9-ab-testing.md, "CACHING-GATE".
  · GEMESSEN (2026-08-14, drei Achsen): keine geplante Hintergrundausführung im Repo —
    keine vercel.json, kein schedule/cron in .github/workflows/ci.yml, kein pg_cron-Aufruf
    unter supabase/. Eine solche wäre eine Infrastruktur-ERSTANLAGE. DREI NICHT-TREFFER,
    KEIN Beweis der Abwesenheit; die Reichweite ist die der drei Achsen.
  · NICHT GEMESSEN: was auf PLATTFORM-Ebene an Zwischenspeicherung greift — im Vercel Data
    Cache oder beim Datenbank-Anbieter —, und wie sich der Serve-Pfad bei einer echten
    Störung tatsächlich verhält.
  DIE DRITTE ANGABE STAND IM AUFTRAG WEITER GEFASST ("ob die Serve-Route dabei jedes Mal
  die Datenbank anfasst"), UND DIESE HÄLFTE IST AM CODE ENTSCHEIDBAR — GEMESSEN 2026-08-19:
  Sie tut es, mit ZWEI Abfragen je Aufruf (resolvePublished in src/lib/hosting/resolve.ts
  liest erst domains, dann projects über createAdminClient), und im gesamten Serve-Pfad
  liegt KEIN Cache-Wrapper (kein unstable_cache, kein cache()). Die Angabe steht deshalb
  oben nur noch für den Teil, der wirklich offen ist. WER SIE IN DER WEITEREN FASSUNG
  ZITIERT, plant eine Aufklärung für etwas, das schon dasteht.
  DER ERSTE SCHRITT IST EINE AUFKLÄRUNG, KEIN BAU — das steht hier ausdrücklich, damit
  niemand diesen Eintrag als Bauauftrag liest.
  DER QUERVERWEIS, und er ist der Grund, warum der Eintrag mehr ist als eine Ablage: Die
  offene Frage ist DIESELBE, die am Publish-Drift-Eintrag weiter oben als dritte Ebene
  steht (VERÖFFENTLICHT gegen AUSGELIEFERT; F5 half nicht, ein zusätzlicher URL-Parameter
  schon, die Datenbank war korrekt). EINE Aufklärung beantwortet BEIDE: Was der Cache heute tut,
  entscheidet DORT, ob der Betreiber einen veralteten Stand sieht — und HIER, ob ein
  Datenbankausfall die Kundenseiten überhaupt erreicht.
  DIE BEIDEN WERDEN NICHT ZUSAMMENGEZOGEN: verschiedene Folgen, dieselbe Messung. Der eine
  ist ein Betreiber-Ärgernis, der andere ein Ausfall fremder Kampagnen.
  WAS HIER NICHT ENTSCHIEDEN WIRD: ob und wie zwischengespeichert wird, ob der Ingest
  puffert, und welche der drei Ebenen zuerst angefasst wird.
  Was still kaputtgeht: Der Betreiber erfährt von einem Ausfall zuerst durch seine Kunden —
  und der Conversion-Verlust währenddessen ist auf KEINEM Kanal sichtbar, weil die leere
  204 nach aussen wie ein Erfolg aussieht.
- EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN — DREI URSACHEN, DIE GETRENNT
  BLEIBEN (gehoben am 2026-08-19 aus dem Vorrat der Phase 11.1): Die Karte meldet
  „Zugangsdaten hinterlegt", der Betreiber hält das Ziel für eingerichtet, und es geht
  nichts hinaus. DREI VERSCHIEDENE URSACHEN führen dorthin, und sie werden hier ausdrücklich
  NICHT zusammengezogen — der Grund steht in (1): die eine betrifft einen FALSCHEN Wert, die
  andere einen FEHLENDEN. Wer sie zusammenlegt, baut eine Anzeige, die zwei verschiedene
  Ursachen gleich benennt.
  (1) DIE REGEL-KENNUNG BRAUCHT IHR PRÄFIX, UND DER KUNDE HAT ES NICHT. TRIGGER:
      EINGETRETEN — jeder Betreiber, der dieses Ziel konfiguriert, läuft hinein. GEMESSEN
      live (2026-08-19): Der Adapter reicht den eingetragenen Wert unverändert durch und
      baut das Präfix NICHT; die Oberfläche des Anbieters zeigt NUR die Ziffernfolge. Wer
      sie kopiert, trägt einen Wert ein, der syntaktisch nicht trägt, und bekommt 422 mit
      „Invalid Urn format. Invalid prefix." DER RIEGEL GREIFT NICHT, weil eine Kennung DA
      ist — es ist der einzige Fehlerweg, bei dem tatsächlich eine Anfrage hinausgeht.
      ZWEI RICHTUNGEN, KEINE GEWÄHLT, je mit ihrer Grenze: Das Präfix serverseitig
      ERGÄNZEN — GRENZE: das trifft eine Entscheidung über die Form eines FREMDEN Werts,
      und diese Form ist nur GELESEN; gemessen ist allein, dass ein falsches Präfix mit 422
      fällt. Oder die Form PRÜFEN und mit eigenem Grund ABWEISEN — GRENZE: das macht aus
      dem heute LAUTEN Fehler (422 im Log) einen STILLEN (kein Forward), also eine
      Verschiebung und keine Behebung, solange der Betreiber weder das eine noch das andere
      sieht.

      VERMERK 2026-09-01 — EIN ZWEITER ANBIETER ZEIGT DIESELBE KLASSE. AUS EINEM
      LINKEDIN-SONDERFALL WIRD EIN MUSTER. Der Text der Ursache (1) darüber bleibt ZEICHEN FÜR
      ZEICHEN stehen; dieser Vermerk tritt DANEBEN und schreibt nichts um.
      DER BEFUND, GEMESSEN 2026-09-01 (OWNER), LIVE AUFGETRETEN — er ist der Grund, warum der
      erste Live-Test der Scheibe 4 fehlschlug: Die Oberfläche von Google Ads zeigt am
      Conversion-Snippet die gtag-Gestalt `AW-<id>/<label>`. Die Data Manager API verlangt in
      `destinations[].productDestinationId` eine ANDERE Gestalt — die numerische
      Conversion-Type-ID (ctId). Der abgetippte gtag-Wert wird abgewiesen: field
      `"destinations[0].product_destination_id"`, description `"String is not a valid number."`,
      reason `INVALID_NUMBER_FORMAT` (docs/ziel-befunde.md, Google-Abschnitt, Teil (ca)/(a),
      Handaufruf 1). Die ctId steht an einer ANDEREN Stelle der Oberfläche — Conversions >
      Conversion-Action > Details > "Conversion type ID".
      DIE SPIEGELUNG ZUR LINKEDIN-HÄLFTE IST EXAKT UND DESHALB LEHRREICH: Dort FEHLTE ein
      Präfix, hier ist eines ZU VIEL. Beide Male zeigt die Oberfläche des Anbieters eine
      Gestalt, die seine eigene Schnittstelle nicht annimmt; beide Male trägt der Betreiber ein,
      was er SIEHT; beide Male reicht der Adapter den Wert unverändert durch, und beide Male ist
      der Fehlschlag für den Betreiber UNSICHTBAR — sichtbar allein im Log.
      DASS ES ZWEIMAL UNABHÄNGIG AUFGETRETEN IST, IST DIE EIGENTLICHE AUSSAGE: Zwei Anbieter,
      zwei verschiedene Schnittstellen, dieselbe Fehlerklasse. ES IST KEIN LINKEDIN-SONDERFALL,
      SONDERN EINE EIGENSCHAFT DER GATTUNG "Kennung, die der Betreiber aus einer fremden
      Oberfläche abschreibt". WER DEN NÄCHSTEN ANBIETER ANBINDET, RECHNET DAMIT — und die
      Katalog-Frage dahinter lautet nicht "welches Format", sondern "zeigt die Oberfläche des
      Anbieters dasselbe Format, das seine Schnittstelle verlangt".
      KEIN BAUAUFTRAG, UND DIE GRENZE IST DIESELBE WIE DAMALS: Eine Formprüfung an der Eingabe
      machte aus dem heute LAUTEN Fehler (der Statuscode im Log) einen STILLEN (kein Forward) —
      eine Verschiebung und keine Behebung, solange der Betreiber weder das eine noch das andere
      sieht. HINZU KOMMT HIER EINE ZWEITE GRENZE, die es bei LinkedIn nicht gab: Für
      `productDestinationId` ist AUSSER "reine Ziffernfolge" nichts über Länge oder Zeichenvorrat
      gemessen (Teil (k)/C1 sagt es ausdrücklich); eine Prüfung wäre auf dieser Achse ERFUNDEN —
      dieselbe Linie wie Festlegung (5) des Zuschnitts der Scheibe 2.
      WAS BEREITS GESCHEHEN IST UND KEINE BEHEBUNG DARSTELLT: Der Owner hat den Wert im UI von
      Hand auf die numerische ctId korrigiert (2026-09-01). Das ist eine Datenkorrektur an EINEM
      Projekt, kein Riegel und keine Warnung.
      DIE ZAHL "DREI" IM TITEL DIESES EINTRAGS BLEIBT UNANGETASTET, ebenso die Zahl VIER aus dem
      Vermerk an Ursache (4): Dieser Vermerk fügt KEINE fünfte Ursache hinzu. Er sagt, dass
      Ursache (1) BREITER ist als ihr Wortlaut — sie beschreibt einen Anbieter und trifft eine
      Gattung.
      PROVENIENZ: GEMESSEN 2026-09-01 (OWNER), live gegen den Endpunkt und an der eigenen
      Anwendung; die Fehlerform GELESEN an docs/ziel-befunde.md, Teil (ca)/(a). Dass daraus ein
      MUSTER statt eines Sonderfalls wird, ist eine ABLEITUNG aus zwei unabhängigen Fällen,
      keine dritte Messung.
  (2) EIN UNVOLLSTÄNDIG KONFIGURIERTES ZIEL FÄLLT STILL AUS. TRIGGER: die UI-Warnung
      (Owner-Absicht, 2026-08-18), spätestens vor echtem Ad-Traffic. GEMESSEN am Code
      (2026-08-18): Liegt nur die Kennung oder nur das Zugangsdatum vor, entsteht kein
      Empfänger und es geht nichts hinaus — die Paarungsschleife in
      `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`) überspringt mit
      `if (!token) continue;`, die Gegenrichtung fällt schon vorher aus dem `in`-Filter der
      Geheimnis-Abfrage. DAS TRIFFT ALLE VIER ZIELE — ein Zustand des BESTANDS, den keine
      Scheibe erzeugt hat. Die Karte meldet „Zugangsdaten hinterlegt", sobald eine
      Geheimnis-Zeile existiert (`listConfiguredTargets`, `src/app/projects/actions.ts` —
      sie liest den Wert nie); über die KENNUNG sagt sie an dieser Stelle nichts.
  (3) EINE SICHTBARE WARNUNG FEHLT. TRIGGER: eine Frontend-Runde, ODER ein Support-Fall, in
      dem ein Betreiber meldet, dass nichts ankommt. Seit 11.1f loggt der Adapter den Grund
      unterscheidbar (`missing identity` · `identity is not IPv4` · `no conversion rule for
      event`) — ABER EINE LOGZEILE ERREICHT DEN BETREIBER NICHT.
      DIE GRENZE, DIE MITMUSS und die Bauform nicht freilässt: Ein server-seitiger
      Ziel-Fehlschlag ist laut docs/immer-beachten.md („WELCHE REGEL WANN GREIFT") KEINE
      Meldung, sondern eine GRÖSSE — wer ihn als Fehlermeldung baut, hängt eine Anzeige an
      ein Ereignis, das PRO BESUCHER eintreten kann. Eine Anzeige braucht zudem einen Weg
      vom SERVER-Ereignis in die Oberfläche, den es heute nicht gibt.

      VERMERK 2026-09-25 (Phasenende 11.7) — K4 GEHÖRT HIERHER, UND DER TRIGGER DIESER
      URSACHE IST ERWEITERT, NICHT ERSETZT. Der Text darüber bleibt stehen.
      TRIGGER, ERWEITERT: eine Frontend-Runde, ODER ein Support-Fall, in dem ein Betreiber
      meldet, dass nichts ankommt, ODER — spätestens — VOR ECHTEM AD-TRAFFIC (OWNER-
      ENTSCHEIDUNG E-e der Phase 11.7, 2026-09-24). Der zugefügte Trigger feuert
      UNBEOBACHTET: echter Ad-Traffic tritt im Betrieb ein, nicht in einer Runde, die diese
      Datei öffnet.
      WAS K4 IST: das Ergebnis jedes Forwards JE ZIEL abzulegen, damit der Betreiber sieht,
      ob sein Ziel annimmt — genau der fehlende Weg vom Server-Ereignis in die Oberfläche,
      den diese Ursache nennt. K4 IST KEIN EIGENER POSTEN (ARCHITEKTEN-ENTSCHEIDUNG
      2026-09-25): zwei Posten für dieselbe Lücke liefen auseinander.
      WAS SEIT PHASE 11.7 STEHT UND WAS NICHT: Jeder Adapter schreibt bei einer angenommenen
      Antwort eine Zeile "[capi] <Ziel> forward accepted: HTTP <Status>" (Dauerregel "JEDER
      FAN-OUT-ADAPTER SCHREIBT BEI EINER ANGENOMMENEN ANTWORT GENAU EINE ERFOLGSZEILE …",
      docs/immer-beachten.md). DEN BETREIBER ERREICHT SIE NICHT: Nur der Owner sieht sie,
      die Logs halten auf dem Hobby-Plan eine Stunde (docs/plattform-befunde.md,
      Vercel-Abschnitt, GELESEN), und sie belegt die Annahme, nicht die Verarbeitung.
      STILL BLEIBEN die Ausgänge VOR dem Adapter — unbekannter trackingKey, Kill-Switch,
      Bestätigungs-Beacon, fehlende Kennung oder Regel, fehlende oder unlesbare
      Geheimnis-Zeile, nicht forwardbares Ereignis, fehlende Einwilligung, kein Empfänger
      übrig (GEMESSEN am Code, Archiv der Phase 11.7, VERMERK P11.7-22).
      DIE GRENZEN, DIE EIN ZUSCHNITT VON K4 VORFINDET — gelesen am Bestand, nicht
      entschieden: Ein gescheiterter Forward ist ein VORKOMMNIS und eine GRÖSSE, keine
      Meldung (docs/immer-beachten.md, "WELCHE REGEL WANN GREIFT"). Eine Ablage je Ziel
      braucht eine EIGENE additive Spalte und nie `source` ("TRACKING-source =
      BEOBACHTUNGS-ORT, NIE ZIEL"); dieselbe Ziel-Achse verlangen die Posten "DIE
      ADBLOCKER-KACHEL ZÄHLT EINE ABGELEHNTE EINWILLIGUNG ALS VERLUST" und "DIE
      VERLUSTRATEN-AGGREGATION IST ZIEL-BLIND" (ABLEITUNG, nicht gemessen). Eine Ablage ist
      ein Schreibpfad, für den die DATENKLASSEN-GRENZE gilt. Die Anzeige-Hälfte der
      Zuschnitt-Frage P11.7-11 der Phase 11.7 (TikTok `40100` gegen `40104`) ist mitgemeint
      (OWNER-ENTSCHEIDUNG E-f).
      KEINE EMPFEHLUNG zur Gestalt.
  (4) DER ZUGANG BRICHT OHNE ZUTUN DES KUNDEN — ABLAUF ODER WIDERRUF. TRIGGER: mit dem
      ersten Ziel, dessen Zugangsdatum ablaufen kann; für LinkedIn ist er EINGETRETEN,
      seit das Ziel am 2026-08-19 sendet. Die bestehenden Ziele tragen ein STATISCHES
      Geheimnis; läuft ein Zugang still ab oder widerruft der Betreiber ihn beim
      Anbieter, hört das Weiterleiten auf, ohne dass es jemand bemerkt.
      WAS SIE VON DEN DREI ANDEREN UNTERSCHEIDET, und das ist der Grund, warum sie eigens
      dasteht: Die drei oben entstehen durch etwas, das der Betreiber TUT oder UNTERLÄSST
      — einen falschen Wert eintragen, eine Hälfte der Konfiguration weglassen, eine
      Logzeile nie sehen. DIESE entsteht, WÄHREND ER NICHTS TUT. Ein Zustand, der ohne
      Handlung kippt, wird von keiner Prüfliste gefunden.
      DER ZUSTAND HAT SICH GEÄNDERT, und deshalb steht sie jetzt hier: Der Befund stand
      an der Roadmap-Zeile 11.1 als Vorbehalt für ein Ziel, das NOCH NICHT sendete —
      dort war er folgenlos. Seit dem 2026-08-19 sendet es.
      WAS DER ADAPTER HEUTE TUT (GEMESSEN am Code, 2026-08-19): Er deutet die
      401-Antwort als eigene Fehlerklasse („reason=invalid-token") und schreibt sie ins
      Laufzeit-Log. Das ist alles — es erreicht den Betreiber nicht, s. Ursache (3).
      KEINE EMPFEHLUNG, wie man es bemerkbar macht.
      DIE ZAHL „DREI" AN DREI STELLEN DIESES EINTRAGS WIRD NICHT ÜBERSCHRIEBEN — im
      Titel, im Absatz darüber und im Satz darunter. Sie ist als Aussage über den Stand
      vom 2026-08-19 (Hebung Runde 2) richtig; mit dieser vierten sind es VIER. Wer eine
      dieser Zahlen als heutige Liste liest, zählt falsch. Dieselbe Bauform wie an der
      Phase-8-Roadmap-Zeile: eine Zahl, die einen Tag beschreibt, wird nicht rückwirkend
      angepasst.
  (5) EIN LEERES KLARTEXT-GEHEIMNIS. TRIGGER: ein Schreibweg auf `project_secrets`, der die
      Nicht-Leer-Prüfung nicht trägt. GEHOBEN AM 2026-09-11 aus Vorrat (21) der Phase 11.3.
      Eine Zeile mit dem Klartext `''` zählt für die Karte als "Zugangsdaten hinterlegt" —
      `listConfiguredTargets` liest nur die EXISTENZ der Zeile —, und der Resolver verwirft
      sie: `hasSecret` (`src/lib/tracking/target-readiness.ts`) trimmt NICHT, unbrauchbar
      ist damit genau der Wert `''`, und `usableTokenFromRow` (`src/lib/capi/token.ts`)
      liefert für ihn kein Zugangsdatum.
      WAS SIE SEIT PHASE 11.3 SCHÄRFER MACHT: Der Leser des Testzustands liest das Geheimnis
      bewusst nicht. Der Schalter stünde da, der Riegel nähme das Ereignis aus `events`, und
      gesendet würde nichts — das Ereignis wäre auf BEIDEN Seiten weg.
      HEUTE NICHT ERREICHBAR: `setCapiToken` weist einen leeren Token vorher ab; der Fall
      öffnet sich erst mit einem Schreibweg ohne diese Prüfung.
      WAS SIE VON (2) TRENNT: Dort fehlt eine Hälfte der Konfiguration; hier ist sie da und
      trägt einen Wert, der keiner ist.
      PROVENIENZ: ABLEITUNG aus `hasSecret` und dem gebauten Lesepfad (CC, 2026-09-09),
      am 2026-09-11 gegen den Code nachgesehen (CC) — KEINE Messung, der Fall ist nicht
      herbeigeführt worden.
  WAS HIER NICHT ENTSCHIEDEN WIRD: welche der drei zuerst angefasst wird, ob das Präfix
  ergänzt oder geprüft wird, und wie eine Warnung aussieht.
  Was still kaputtgeht: Conversion-Verluste SICHTBAR zu machen ist das Verkaufsargument
  dieses Produkts — hier verliert der Kunde sie, während die Oberfläche „konfiguriert"
  sagt.
- DER PAGEVIEW-TOKEN IST ALS CUSTOM-EVENT EINTIPPBAR (Trigger: vor echtem Ad-Traffic;
  gehoben am 2026-08-19 aus dem Vorrat der Phase 11.1): GEMESSEN am Code (2026-08-18), auf
  VIER Achsen ohne Schranke — das Eingabefeld des Custom-Zweigs (`TrackForm` in
  `src/components/ActionPanel.tsx`) trägt weder `pattern` noch Blockliste; die einzige
  Schranke ist `valid` (`event.trim() !== ""`); `upsertMapping` (`src/lib/mappings.ts`)
  prüft nichts; `saveProject`/`saveVariantB` (`src/app/projects/actions.ts`) schreiben das
  Literal ohne Prüfung.
  WOHIN SO EIN MAPPING LÄUFT: Es wird AUSGELIEFERT (der Erzeuger filtert Ereignisnamen
  nicht), am Ingest von `isForwardable` vom CAPI-Forward ausgeschlossen — und landet in
  `events` als `event_type` des Analytics-Tokens, von einem echten PageView NICHT
  unterscheidbar.
  BEFUND ÜBER DEN BESTAND: Der Zustand ist älter als Phase 11.1; keine Scheibe erzeugt ihn
  und keine behebt ihn. KEINE BEWERTUNG DER WAHRSCHEINLICHKEIT — der Kommentar an
  `PAGEVIEW_EVENT` (`src/lib/analytics/events.ts`) nennt den Token „praktisch nicht
  versehentlich eintippbar"; das ist eine Aussage über Wahrscheinlichkeit und keine
  Schranke, und sie wird hier weder bestätigt noch bestritten.
  Was still kaputtgeht: Es verfälscht den NENNER der Adblocker-Verlustrate — und die ist
  die Marquee-Metrik dieses Produkts, an der man der Zahl nichts ansieht.
- EIN OAUTH-ZUGANG PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE (Trigger: die
  erste AUTORISIERUNGSSCHICHT — Phase 11.2 oder ein späteres Ziel, dessen Zugang nicht als
  Skalar abzulegen ist; kopiert am 2026-08-19 aus der Roadmap-Zeile 11.1, deren Wortlaut
  bis zu ihrem Kollaps unverändert stehen bleibt; DIE SCHICHT TRÄGT SEIT DEM 2026-08-25
  DIE PHASENNUMMER 11.8 — der Wortlaut davor bleibt unverändert, eine Nummer ist ein Ort
  und keine Antwort):
  **GESCHLOSSEN AM 2026-08-27. DER TRIGGER IST EINGETRETEN UND DIE SACHE IST GEBAUT.**
  Der gesamte Text unterhalb dieses Blocks bleibt WÖRTLICH stehen und wird NICHT gekürzt:
  er trägt die Beweisführung, die den Zuschnitt der Phase 11.8 bestimmt hat, und mehrere
  seiner Grenzen gelten weiter. **Geschlossen ist der PUNKT, nicht sein Befund.**
  WAS IHN SCHLIESST — DREI SCHEIBEN, je mit Vollzug: Migration **0025** hat die Spalte
  `secret_enc` neben dem Skalar angelegt, mit dem CHECK `project_secrets_secret_genau_eines`
  (Scheibe 11.8b, Commit a8435e1, gefahren 2026-08-26) · **`src/lib/secrets/oauth-payload.ts`**
  trägt die mehrwertige Form mit vier Feldern und der Fassungsmarke `p1` (Scheibe 11.8c,
  Commit 8532e59) · **die Callback-Route** legt sie chiffriert ab (Scheibe 11.8e, Commit
  1f50c9a, Live-Test bestanden 2026-08-27). **EIN OAUTH-ZUGANG PASST JETZT.**
  SEIN BELEG WAR ZULETZT DOPPELT ÜBERHOLT, und das gehört als Teil der Schliessung
  festgehalten, damit niemand den Text unten für den heutigen Stand hält: Er sagt weiter
  unten, die Spalte sei `secret text not null` und der Schlüssel `(project_id, target)`
  (0021). **BEIDES GILT SEIT 0025 NICHT MEHR** — `secret` ist NULLABLE (die
  NOT-NULL-Bedingung ist durch den CHECK ERSETZT), und der Primärschlüssel liegt auf `id`;
  die Eindeutigkeit auf dem Paar liegt in
  `project_secrets_project_id_target_key` (UNIQUE NULLS NOT DISTINCT). Der heutige Stand
  steht in docs/db-stand.md und wird hier NICHT verdoppelt.
  **WAS DIE SCHLIESSUNG NICHT MITSCHLIESST — drei Dinge, die unten stehen und weitergelten:**
  die OWNER-ENTSCHEIDUNG vom 2026-08-20, dass die Schicht gemeinsames Fundament von 11.1 und
  11.2 bleibt · die offene VORFRAGE ZUM UMFANG (erzeugen die Kunden ihr Zugangsdatum selbst
  oder der Betreiber?) · die zwei ausdrücklich offen benannten Messungen zu LinkedIn. **Sie
  hängen NICHT an der Wertform der Spalte, sondern an der Gestalt der Schicht** — wer sie mit
  diesem Punkt für erledigt hält, schliesst drei Fragen, die niemand beantwortet hat.
  **EINE FOLGE FÜR DIE FORM DIESER DATEI, GEMELDET UND NICHT BEHOBEN:** Ihr Kopf sagt, sie
  sei der Volltext des Stubs in CLAUDE.md, Titel und Trigger dort, Beweisführung hier. Mit
  dieser Schliessung wird die Stub-Zeile in CLAUDE.md ENTFERNT (jener Abschnitt führt
  ausdrücklich "aktive TODOs mit Trigger — nicht in ein Abschluss-Archiv"), und damit steht
  hier **zum ersten Mal ein Eintrag ohne Stub**. **EIN VERFAHREN FÜRS SCHLIESSEN GIBT ES IN
  DIESER DATEI NICHT** — GEMESSEN am Text (CC, 2026-08-27: kein Eintrag trägt eine
  Erledigt-Marke, 27 Einträge stehen 27 Stub-Zeilen gegenüber). Gewählt ist der
  konservative Weg — schliessen statt streichen —, weil ein Streichen die Beweisführung
  vernichtet hätte. **OB DAS DAS VERFAHREN WIRD, IST HIER NICHT ENTSCHIEDEN.**
  DIE RICHTIGSTELLUNG VOM 2026-08-14, in ihren zwei Hälften:
  · DAS ZUGANGS-TOKEN LÄUFT NACH 60 TAGEN AB. PROVENIENZ: GELESEN an der EIGENEN
    App-Oberfläche im Entwicklerportal des Anbieters (2026-08-14) — NICHT gemessen, es ist
    KEIN Aufruf gegen die Schnittstelle gefahren worden.
  · ES PASST NICHT IN DIE GEHEIMNIS-TABELLE. `project_secrets` hält einen SKALAR je Zeile
    — die Spalte ist `secret text not null`, der Schlüssel ist `(project_id, target)`
    (0021_project_secrets.sql) —, während ein OAuth-Zugang MEHRERE Werte nebeneinander
    braucht: Token, Erneuerungs-Token, Ablaufzeitpunkt.
  DER VORBEHALT VOM 2026-08-15, und er engt den Geltungsbereich ein: Beide Hälften ruhen
  auf dem Zugangsdatum einer ENTWICKLER-ANWENDUNG (Portal-Lesung 2026-08-14). ES GIBT
  EINEN ZWEITEN WEG ZU EINEM ZUGANGSDATUM — GELESEN an der Werbe-Oberfläche des Anbieters
  (2026-08-15), NICHT gemessen: Der Betreiber erzeugt es dort SELBST, gebunden an sein
  Werbekonto, erneuerbar per Klick, als EIN Wert. FÜR DIESEN WEG IST DIE RICHTIGSTELLUNG
  UNGEPRÜFT UND MÖGLICHERWEISE FALSCH: Ein EINZELNER Wert passt in eine Spalte, die einen
  Skalar je Zeile hält.
  DIE GRENZE, DIE MITMUSS — EINE ABWESENHEITS-BEOBACHTUNG OHNE POSITIVKONTROLLE: In jener
  Oberfläche war KEIN Ablaufdatum ausgewiesen. UNGEPRÜFT ist, wie sie einen Ablauf
  überhaupt anzeigen würde. DARAUS FOLGT NICHT, dass dieses Zugangsdatum unbegrenzt gilt —
  das bleibt eine OFFENE FRAGE, keine Entwarnung.
  DIE OFFENE VORFRAGE, UND SIE ENTSCHEIDET DEN PREIS: Ob die Schnittstelle auch ein
  APP-EIGENES Token annimmt (Anmeldung mit Anwendungs-Zugangsdaten, ohne Nutzer-Fluss).
  Betrachtet wurde bislang NUR ein dreibeiniger OAuth-Fluss; der zweibeinige Weg ist NICHT
  geprüft. Die Antwort entscheidet zwischen einer Autorisierungsschicht MIT Nutzer-Fluss
  und einer reinen SERVER-SEITIGEN Erneuerung — also den PREIS der Schicht, NICHT die
  Eignung der Skalar-Spalte für den gedeckten Zweig. Für den DREIBEINIGEN Fluss ist die
  Mehrwertigkeit GEDECKT (Portal-Lesung 2026-08-14); für den ZWEIBEINIGEN ist sie eine
  ABLEITUNG OHNE QUELLE — ungeprüft ist dort nicht nur, OB der Weg offensteht, sondern
  auch, WELCHE Wertform er verlangt.
  DER ADRESSATEN-WECHSEL IST DER GRUND FÜR DIESEN EINTRAG, und ohne ihn läse sich der
  Block wie ein erledigter Vorbehalt: Der GEBAUTE Weg arbeitet mit einem SKALAR aus
  `project_secrets` — GEMESSEN am Code (2026-08-19): `LinkedinConfig.token`
  (`src/lib/capi/linkedin-forward.ts`) nimmt genau einen Wert, den der Resolver aus der
  Geheimnis-Tabelle liest. FÜR IHN ist die Richtigstellung damit widerlegt. FÜR EINE
  AUTORISIERUNGSSCHICHT IST SIE ES NICHT. Der Befund bindet ab jetzt Phase 11.2 und jede
  künftige Schicht — nicht mehr 11.1.
  DIE AUTORISIERUNGSSCHICHT GEHÖRT KEINER ZEILE ALLEIN: Sie ist gemeinsames Fundament von
  11.1 und 11.2; nur für ein Ziel gebaut wäre sie überangepasst und ein zweites Mal fällig.
  Was still kaputtgeht: Wer eine Autorisierungsschicht zuschneidet, ohne die Vorfrage zu
  klären, entscheidet ihren Umfang unbemerkt mit — ein Nutzer-Fluss und eine
  server-seitige Erneuerung sind zwei verschiedene Vorhaben, und die Wahl zwischen ihnen
  fiele dann nicht durch eine Entscheidung, sondern durch eine Annahme.
  ERGÄNZT AM 2026-08-20 — DIE OFFENE VORFRAGE IST BEANTWORTET, UND ZWAR NEGATIV. Der Text
  darüber bleibt unverändert; er wird NICHT gekürzt und NICHT umformuliert, weil er den
  Weg zu dieser Antwort trägt und weil seine Grenzen weitergelten. Dieser Block tritt
  DANEBEN.
  · DER ZWEIBEINIGE WEG STEHT FÜR DIESES ZIEL NICHT OFFEN. Die Anmeldung mit
    Anwendungs-Zugangsdaten ist für die MARKETING-APIs des Anbieters ausgeschlossen, und
    die Conversions API ist eine davon; die Seite des Anbieters zum
    Client-Credentials-Fluss trägt diesen Ausschluss ausdrücklich. PROVENIENZ: GELESEN an
    learn.microsoft.com/en-us/linkedin/shared/authentication/client-credentials-flow
    (2026-08-20). NICHT GEMESSEN — es ist KEIN Aufruf gegen den Token-Endpunkt gefahren
    worden.
  · DIE VERKNÜPFUNG BEKOMMT IHREN EIGENEN BELEG, WEIL DER BEFUND AN IHR HÄNGT: Der
    Ausschluss gilt den MARKETING-APIs — gehörte die Conversions API nicht dazu, trüge
    nichts davon. DIE ZUORDNUNG IST GELESEN an der Anbieter-Dokumentation (2026-08-20):
    Die Conversions API wird dort unter dem MARKETING-Zweig geführt
    (learn.microsoft.com/en-us/linkedin/marketing/conversions/...).
    DIE GRENZE GEHÖRT DAZU, sonst liest sich der Beleg stärker, als er ist: Das ist eine
    Zuordnung nach dem ABLAGEORT der Dokumentation — NICHT nach einer Aussage des
    Anbieters, die die Conversions API ausdrücklich als Marketing-API benennt. KIPPT SIE,
    IST DER BEFUND NEU ZU TREFFEN.
  · AUF ANDERER ACHSE, UND SIE ENTWERTET DEN ZWEIBEINIGEN WEG AUCH DORT, WO ER OFFENSTÜNDE:
    Ein solches Anwendungs-Token lebt DREISSIG MINUTEN. Ein Wert mit dieser Lebensdauer ist
    kein Spalteneintrag, sondern eine ERNEUERUNGS-MECHANIK — die Frage der Wertform stellt
    sich für ihn gar nicht mehr. PROVENIENZ: dieselbe Quelle, dasselbe Datum, GELESEN.
  WAS AM VORBEHALT VOM 2026-08-15 STEHEN BLEIBT UND WAS NICHT — beide Hälften einzeln,
  damit nicht die eine die andere mitreisst:
  · SEINE WERTFORM-HÄLFTE BLEIBT RICHTIG: Der zweite Beschaffungsweg liefert EINEN Wert,
    und der passt in eine Spalte, die einen Skalar je Zeile hält.
  · WIDERLEGT IST ALLEIN DIE MÖGLICHE LESART, DIESER WERT SEI ABLAUFFREI: Der Anbieter gibt
    keine Mitglieds-Token mit mehr als SECHZIG TAGEN Lebensdauer aus; eine programmatische
    Erneuerung ist auf zugelassene Partner beschränkt, das Erneuerungs-Token gilt EIN JAHR,
    danach muss das Mitglied erneut autorisieren. PROVENIENZ: GELESEN an
    developer.linkedin.com/support/faq und
    learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens
    (2026-08-20). NICHT GEMESSEN.
  DIE ABWESENHEITS-BEOBACHTUNG IST DAMIT NICHT ENTWARNT, SONDERN GEGENLÄUFIG BELEGT: Der
  Eintrag führt oben, dass in der Werbe-Oberfläche KEIN Ablaufdatum ausgewiesen war, und
  nennt das ausdrücklich keine Entwarnung. Die Lesung vom 2026-08-20 bestätigt diese
  Vorsicht — sie war richtig, nicht übervorsichtig.
  DIE FOLGE, UND SIE IST DER GRUND DIESER ERGÄNZUNG: Für DIESES Ziel steht der PREIS der
  Autorisierungsschicht fest — NUTZER-FLUSS, nicht reine server-seitige Erneuerung.
  DIE GRENZE, OHNE DIE DIESER BEFUND SCHADET — drei Teile, und der dritte hält ihn offen:
  (a) ÜBER GOOGLE SAGT ER NICHTS. Anderer Anbieter, andere Schnittstelle. Wer ihn auf
      Phase 11.2 überträgt, überträgt eine Lesung über ein fremdes System auf ein ZWEITES
      fremdes System.
  (b) DIE SCHICHT BLEIBT GEMEINSAMES FUNDAMENT von 11.1 und 11.2 und wird NICHT auf dieser
      einen Hälfte zugeschnitten. Der Satz darüber („gehört keiner Zeile allein") gilt
      unverändert weiter — eine beantwortete Vorfrage an EINEM Ziel schneidet die Schicht
      nicht zu.
  (c) ZWEI DINGE BLEIBEN OFFEN, und sie werden hier als offen benannt: die MESSUNG selbst
      (ein Aufruf mit Anwendungs-Zugangsdaten, der die Ablehnung zeigt) und das KONKRETE
      ABLAUFDATUM des heute live verwendeten Zugangsdatums.
  DIE ZEILE „Was still kaputtgeht" DARÜBER BLEIBT STEHEN UND GILT WEITER: Sie ist für 11.2
  und jedes weitere Ziel unverändert wahr. Beantwortet ist die Vorfrage NUR für dieses eine
  Ziel; wer daraus liest, die Schicht sei jetzt zuschneidbar, macht genau den Fehler, den
  jene Zeile beschreibt.
  ENTSCHIEDEN AM 2026-08-20 (OWNER) — DIE AUTORISIERUNGSSCHICHT BLEIBT GEMEINSAMES
  FUNDAMENT VON 11.1 UND 11.2. Der Absatz "DIE AUTORISIERUNGSSCHICHT GEHÖRT KEINER ZEILE
  ALLEIN" darüber bleibt wörtlich stehen; er war bisher eine FOLGERUNG aus dem
  Schema-Risiko — jetzt ist es zusätzlich eine ENTSCHEIDUNG, und das ist der Unterschied:
  eine Folgerung kippt mit ihrer Prämisse, eine Entscheidung wird zurückgenommen.
  PROVENIENZ: OWNER-ENTSCHEIDUNG (2026-08-20). KEINE Messung.
  BEGRÜNDUNG DES OWNERS: Ein zentrales Dienstkonto, das Kunden in ihre Werbekonten
  einladen, ist als VIELMANDANTEN-Bauform nicht tragfähig — bei hunderten Konten ist mit
  einer Einstufung als missbräuchlich zu rechnen. Ein legitimes Drittanbieter-Werkzeug
  tritt über einen NUTZER-FLUSS auf.
  DIE GRENZE, DIE DAZUGEHÖRT und ohne die die Begründung stärker aussieht als sie ist:
  Das ist eine EINSCHÄTZUNG — keine Anbieter-Aussage und keine Messung. Sie deckt sich
  damit, dass Google für genau diese Gestalt den Data-Partner-Weg vorsieht (GELESEN
  2026-08-20; Befund in docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions ·
  GA4)", Teil (d)). DIESER WEG IST EIN INDIZ, KEIN BEWEIS der Einschätzung.
  WAS DAMIT ZUSAMMENFÄLLT UND WAS NICHT: Der PREIS der Schicht steht für BEIDE Zeilen auf
  Nutzer-Fluss — für 11.1 aus der Lesung vom 2026-08-20 (Block darüber), für 11.2 aus
  dieser Entscheidung. Das macht die Schicht NICHT zuschneidbar: die offenen Punkte des
  Google-Wegs (Freischaltung, Entwickler-Token, Nutzlast-Felder, Advertiser gegen Data
  Partner) stehen unverändert offen und stehen in docs/ziel-befunde.md.
  DIE VORFRAGE ZUM UMFANG DER SCHICHT (Owner, 2026-08-20) — OFFEN, UND SIE WIRD HIER NICHT
  BEANTWORTET: Erzeugen die KUNDEN ihr Zugangsdatum selbst in ihrem eigenen Werbekonto —
  oder tut der Betreiber es für sie? PROVENIENZ: OWNER-VORFRAGE (2026-08-20),
  unbeantwortet. KEINE Messung.
  WARUM SIE VOR DEN GOOGLE-FRAGEN STEHT, und das ist ihr ganzer Punkt: Jene klären, ob
  Google ANSPRUCHSBERECHTIGTER der Schicht ist. DIESE klärt, ob im Negativfall überhaupt
  noch einer übrig bleibt. Google BRAUCHT die Schicht — ohne sie geht dort nichts.
  LinkedIn dagegen SENDET BEREITS; dort löste sie nur die ERNEUERUNG eines Zugangsdatums,
  das nach rund sechzig Tagen abläuft.
  DIE ZWEI ZWEIGE, je mit ihrer Folge:
  · BETREIBER, EIN KONTO: Eine Erneuerung alle zwei Monate wäre eine Kalendererinnerung,
    kein Bau.
  · KUNDEN MIT EIGENEN KONTEN: Eine Kalendererinnerung JE KUNDE ist unzumutbar — dann
    trägt LinkedIn die Schicht mit.
  EINE UNGEPRÜFTE ABLEITUNG, AUSDRÜCKLICH KEIN BEFUND — sie ist der eigentliche Grund
  dieses Eintrags: Der Zweig "Betreiber, ein Konto" könnte gar keine Wahl sein. Ein
  Zugangsdatum autorisiert den Zugriff auf ein BESTIMMTES Werbekonto, und die
  Conversion-Regel gehört dem Konto des KUNDEN. Trifft das zu, hiesse "Betreiber, ein
  Konto" nicht "ein Zugangsdatum für alles", sondern: die Betreiber-Identität sitzt als
  NUTZER in JEDEM Kundenkonto — strukturell DIESELBE Vielmandanten-Gestalt, die die
  Owner-Entscheidung vom 2026-08-20 (Block darüber) für den Google-Weg ausdrücklich
  verworfen hat.
  FOLGE, WENN ES ZUTRIFFT: Der Zweig trägt nur, solange der Betreiber der einzige
  Werbetreibende ist — also heute. Mit dem ersten echten Kunden fällt er weg, und LinkedIn
  trägt die Schicht mit, UNABHÄNGIG davon, wie die Google-Frage ausgeht.
  DIE PRÜFUNG STEHT AUS — GEPRÜFT AM VORHANDENEN MATERIAL AM 2026-08-20, MIT NEGATIVEM
  ERGEBNIS: docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", trägt KEINE
  Angabe darüber, ob die Conversion-Regel-Kennung an ein Werbekonto gebunden ist und ob
  das Zugangsdatum je Werbekonto gilt. Am nächsten kommt der Achse der Teil (c)
  DESSELBEN Abschnitts: eine nicht auflösbare Regel-Kennung ergibt 403 mit dem Rumpf
  {"message":"No ad accounts found","status":403}, und die Folgerung dort nennt die
  Meldung MEHRDEUTIG, "weil derselbe Status auch bei nicht vergebenen Berechtigungen
  auftritt". DAS BERÜHRT DIE ACHSE UND ENTSCHEIDET SIE NICHT: Die Ableitung ist damit
  WEDER BELEGT NOCH WIDERLEGT. Wer (c) als Stütze zitiert, macht aus einer Mehrdeutigkeit
  einen Befund.
  DER ZUSATZ ZUM ZWEIG "BETREIBER, EIN KONTO", falls er doch trägt: Eine
  Kalendererinnerung ist nur so gut, wie ihr AUSBLEIBEN auffällt. Läuft das Zugangsdatum
  ab, hört das Weiterleiten auf, ohne dass etwas rot wird — s. Ursache (4) am Eintrag "EIN
  ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN". "KEIN BAU" HEISST NICHT
  "FOLGENLOS".
  WAS HIER NICHT ENTSCHIEDEN WIRD: welcher Zweig gilt, ob die Schicht gebaut wird und in
  welchem Umfang. KEINE EMPFEHLUNG.
  RICHTIGGESTELLT AM 2026-08-20 — DIE VORFRAGE UND DIE ABLEITUNG DARÜBER STEHEN UNTER
  EINER ANNAHME, DIE SICH VERSCHOBEN HAT. Der Text darüber bleibt wörtlich stehen; er ist
  als Frage weiterhin offen, aber sein Gegenstand ist ein anderer als angenommen.
  DER BEFUND: Das LIVE VERWENDETE Zugangsdatum stammt aus einem ANDEREN Beschaffungsweg
  als dem der eigenen Anwendung — BEOBACHTET 2026-08-20 (Owner, Token-Inspector-Werkzeug
  des Anbieters, mit Positivkontrolle im selben Lauf). Es ist KEIN OAuth-Zugangsdatum
  dieser Anwendung. Der Befund samt Grenze steht in docs/ziel-befunde.md, Abschnitt
  "LinkedIn (Conversions API)", Teil (v); die Frist- und Erneuerungs-Angaben zum App-Weg
  in Teil (w). BEIDES WIRD HIER NICHT WIEDERHOLT.
  DIE FOLGE, UND SIE IST DER GRUND DIESER RICHTIGSTELLUNG: Ein Zugangsdatum, das unser
  EIGENES Werkzeug nicht auslesen kann, kann Pagesmith auch nicht auf seinen Ablauf
  überwachen. EINE ABLAUF-ÜBERWACHUNG FÜR ZUGANGSDATEN DIESER ART IST DAMIT STRUKTURELL
  NICHT MÖGLICH — unabhängig davon, ob sie wünschenswert wäre. Das ist keine fehlende
  Arbeit, sondern eine fehlende Handhabe.
  WAS UNBERÜHRT BLEIBT, ausdrücklich: die OWNER-ENTSCHEIDUNG VOM 2026-08-20 zur gemeinsamen
  Autorisierungsschicht (Block darüber). Sie ruht auf der VIELMANDANTEN-Begründung, nicht
  auf der Ablauf-Frage. Sie wird von dieser Richtigstellung NICHT angetastet.
  RICHTIGGESTELLT AM 2026-08-20 (zweite Runde) — VIER STELLEN DIESES EINTRAGS, NAMENTLICH.
  Der Text darüber bleibt WÖRTLICH stehen; nichts wird gestrichen oder umformuliert.
  WARUM NAMENTLICH UND NICHT GENERISCH, und das ist der Grund für diesen Block: Die
  Richtigstellung darüber markiert den Vorfrage-Teil nur ALS GANZES ("sein Gegenstand ist
  ein anderer als angenommen"). Wer bis dorthin liest und dann aufhört, nimmt die alte
  Angabe MIT. Eine generische Markierung wirkt nicht; deshalb steht hier je Stelle der Satz,
  den sie qualifiziert.
  (1) "gebunden an sein Werbekonto" (Block "DER VORBEHALT VOM 2026-08-15") — WIDERLEGT.
      BEOBACHTET 2026-08-20 (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)",
      Teil (s)): Das Zugangsdatum aus der Werbe-Oberfläche "kann für mehrere Anzeigenkonten
      unter einer Nutzer-ID verwendet werden".
      WAS NICHT FÄLLT: die WERTFORM. Es bleibt EIN Wert — und damit bleibt auch die
      Wertform-Hälfte des Vorbehalts richtig, die weiter unten eigens bestätigt ist.
  (2) "Ein Zugangsdatum autorisiert den Zugriff auf ein BESTIMMTES Werbekonto" (Block "EINE
      UNGEPRÜFTE ABLEITUNG") — DIE BEGRÜNDUNG IST WIDERLEGT, DER SCHLUSS NICHT.
      Fundstelle wie (1): derselbe Teil (s), BEOBACHTET 2026-08-20.
      DIE PRÄZISIERUNG GEHÖRT DAZU, sonst kippt zu viel: "mehrere Anzeigenkonten unter EINER
      Nutzer-ID" heisst weiterhin, dass die BETREIBER-IDENTITÄT in JEDEM Kundenkonto Nutzer
      sein muss. Der Schluss der Ableitung — dass der Zweig "Betreiber, ein Konto" mit dem
      ersten echten Kunden wegfällt — BLEIBT MÖGLICH. Widerlegt ist allein die im Text
      stehende Begründung dafür.
      UND EINE FOLGE FÜR DEN BLOCK DARUNTER: Der Satz "DIE ABLEITUNG IST DAMIT WEDER BELEGT
      NOCH WIDERLEGT" in "DIE PRÜFUNG STEHT AUS" ist damit ZU SCHWACH — es gibt seit dem
      2026-08-20 einen BEOBACHTETEN Befund auf genau dieser Achse. DER ALTE SATZ WIRD NICHT
      GEÄNDERT: er beschreibt richtig, was das damals vorhandene Material hergab.
  (3) "das nach rund sechzig Tagen abläuft" (Block "WARUM SIE VOR DEN GOOGLE-FRAGEN STEHT")
      — NUR NOCH TEILWEISE GÜLTIG.
      WAHR für das Zugangsdatum der ANWENDUNG: BEOBACHTET 2026-08-20 (ebenda, Teil (w)) —
      "Access token: 2 months (5184000 seconds)".
      FALSCH als Aussage über das LIVE VERWENDETE: Das stammt aus einem anderen
      Beschaffungsweg (ebenda, Teil (v), BEOBACHTET 2026-08-20), und ob es abläuft, ist ein
      NICHT-TREFFER auf dreizehn Seiten und an der Oberfläche (ebenda, Teil (r)).
  (4) EINE SPANNUNG, DIE HIER BENANNT UND NICHT AUFGELÖST WIRD: "Der Anbieter gibt keine
      Mitglieds-Token mit mehr als SECHZIG TAGEN Lebensdauer aus" (Block "WAS AM VORBEHALT
      VOM 2026-08-15 STEHEN BLEIBT UND WAS NICHT", GELESEN 2026-08-20) steht gegen die
      Angabe, die dort erzeugten Zugangsdaten liefen NICHT ab (ebenda, Teil (v), GELESEN
      2026-08-20, Anbieter-Doku zum Campaign-Manager-Weg).
      KEIN WIDERSPRUCH, WENN das Campaign-Manager-Zugangsdatum kein Mitglieds-Token ist —
      UND GENAU DAS IST UNGEKLÄRT: "EIN TAUGLICHER TEST IST NICHT BEKANNT" (ebenda,
      Teil (r)). AM TEXT NICHT ENTSCHEIDBAR. Wer die eine Angabe gegen die andere ausspielt,
      entscheidet eine Frage, die niemand beantwortet hat.
  WAS VON KEINER DER VIER BERÜHRT WIRD, ausdrücklich und zum zweiten Mal: die
  OWNER-ENTSCHEIDUNG VOM 2026-08-20 zur gemeinsamen Autorisierungsschicht. Sie ruht auf der
  VIELMANDANTEN-Begründung, nicht auf der Ablauf-Frage und nicht auf der Werbekonto-Bindung.
  KEINE der vier Richtigstellungen rührt an sie.
  VERMERK 2026-08-25 — DIE VORFRAGE ZUM UMFANG DER SCHICHT BLEIBT OFFEN. Der Text darüber
  bleibt WÖRTLICH stehen; dieser Vermerk tritt DANEBEN und nimmt nichts zurück.
  SIE WIRD VON DER GESTALT-ENTSCHEIDUNG VOM 2026-08-24 NICHT BERÜHRT: Jene wählt die
  GESTALT für Google Ads (den Offline Conversion Import auf Basis der Klick-Kennungen),
  NICHT das ZUGANGSMODELL. Die zwei Achsen werden getrennt geführt — s. CLAUDE.md,
  "## Modus", wo ausdrücklich steht, dass das Freigabeverfahren bei Google AM
  ZUGANGSMODELL hängt und nicht an der Gestalt.
  WARUM DIESER VERMERK HIER STEHT, OBWOHL SICH NICHTS GEÄNDERT HAT — das ist sein
  EINZIGER Zweck und zugleich seine ganze Rechtfertigung: Die zwei Zweige dieser Vorfrage
  ("Betreiber, ein Konto" gegen "Kunden mit eigenen Konten") liegen auf DERSELBEN Achse
  wie ADVERTISER gegen DATA PARTNER im Google-Abschnitt. WER EINE DER BEIDEN FÜR
  ENTSCHIEDEN HÄLT, HÄLT AUCH DIE ANDERE FÜR ENTSCHIEDEN — und genau das ist am
  2026-08-25 einmal passiert, an einem Auftrag, der die Gestalt-Entscheidung für eine
  Zugangsmodell-Entscheidung nahm.
  GEPRÜFT AM REPO (CC, 2026-08-25): BEIDE SIND OFFEN. Das Zugangsmodell ist an DREI
  Stellen ausdrücklich als offen geführt — docs/ziel-befunde.md, Google-Abschnitt, Block
  "WAS AUSDRÜCKLICH OFFEN BLEIBT" ("OB DIE KLASSIFIZIERUNG ALS ADVERTISER ODER ALS DATA
  PARTNER DIE RICHTIGE IST") · CLAUDE.md, "## Modus" · und dieser Eintrag selbst, im
  Block über der Vorfrage ("Advertiser gegen Data Partner ... stehen unverändert offen").
  AN KEINER DER DREI IST ETWAS GEÄNDERT WORDEN.
  DIE SCHICHT HAT SEIT DEM 2026-08-25 EINE PHASENNUMMER: 11.8 (docs/roadmap.md, "Phase
  11.8 — Autorisierungsschicht"). DAS ÄNDERT AN DER VORFRAGE NICHTS — eine Nummer ist ein
  ORT, keine Antwort. Wer aus der Nummer schliesst, die Schicht sei zuschneidbar, hat
  genau die Verwechslung ein zweites Mal gemacht.
  WAS UNVERÄNDERT WEITER GILT: alles darüber, insbesondere der Satz, was still kaputtgeht,
  wenn ein Zugangsdatum abläuft. Offen bleiben ausserdem die Messung des
  Client-Credentials-Ausschlusses und das konkrete Ablaufdatum des LIVE verwendeten
  Zugangsdatums.
  PROVENIENZ, JE TEIL: Die Trennung der zwei Achsen ist GELESEN an CLAUDE.md, "## Modus"
  (Stand 2026-08-24). Dass beide Achsen offen sind, ist GEMESSEN am Repo (CC, 2026-08-25,
  Achse: die drei genannten Fundstellen plus eine Suche über *.md nach ADVERTISER,
  DATA PARTNER und Zugangsmodell). Die Phasennummer ist eine OWNER-ENTSCHEIDUNG vom
  2026-08-25. KEINE dieser Angaben ist eine Antwort auf die Vorfrage.
  VERMERK 2026-08-25, ZWEITER DES TAGES — DIE VORFRAGE ZUM UMFANG DER SCHICHT IST
  BEANTWORTET. Der gesamte Text darüber bleibt WÖRTLICH stehen; dieser Block tritt DANEBEN
  und nimmt keinen Befund zurück.
  ES GILT DER ZWEIG "KUNDEN MIT EIGENEN KONTEN". Er folgt aus der Owner-Entscheidung
  desselben Tages zum Google-Zugangsmodell: ADVERTISER MIT KUNDENEIGENEM OAUTH — jeder
  Kunde autorisiert die Pagesmith-Anwendung für sein eigenes Werbekonto, je Kunde ein
  eigenes langlebiges Zugangsdatum, und die Betreiber-Identität steht NICHT in der
  Nutzerliste des Kunden.
  DER VERMERK VOM 2026-08-25 DARÜBER ("DIE VORFRAGE ZUM UMFANG DER SCHICHT BLEIBT OFFEN")
  IST DAMIT ABGELÖST — UND ZWAR DURCH EINE ENTSCHEIDUNG, NICHT DURCH EINEN BEFUND. Der
  Unterschied gehört hierher: Ein Befund hätte die Vorfrage AUFGEKLÄRT, eine Entscheidung
  SCHLIESST sie. Kippt die Entscheidung, ist die Vorfrage wieder offen und der abgelöste
  Vermerk gilt wieder.
  DIE FOLGE STEHT SCHON OBEN IN DIESEM EINTRAG UND WIRD JETZT SCHARF: "KUNDEN MIT EIGENEN
  KONTEN: Eine Kalendererinnerung JE KUNDE ist unzumutbar — dann trägt LinkedIn die Schicht
  mit." DIE SCHICHT IST DAMIT FÜR BEIDE ZEILEN GEBRAUCHT, nicht nur für Google. Sie bleibt
  gemeinsames Fundament von 11.1 und 11.2 — aber aus einem ANDEREN Grund als am
  2026-08-20: nicht mehr aus der VIELMANDANTEN-Begründung (die trifft den Advertiser-Weg
  mit kundeneigenem OAuth nicht, s. docs/roadmap.md, Eintrag "Phase 11.8 —
  Autorisierungsschicht", Nachtrag 2026-08-25), sondern aus der Unzumutbarkeit einer
  Erneuerung je Kunde.
  DIE UNGEPRÜFTE ABLEITUNG IST GEGENSTANDSLOS, IHR TEXT BLEIBT STEHEN: Der Block "EINE
  UNGEPRÜFTE ABLEITUNG, AUSDRÜCKLICH KEIN BEFUND" fragt, ob der Zweig "Betreiber, ein
  Konto" gar keine Wahl sein könnte. Dieser Zweig gilt nicht — die Frage hat keinen
  Gegenstand mehr. SIE WIRD TROTZDEM NICHT GESTRICHEN: Kippt die Entscheidung, wird sie
  wieder gebraucht, und sie ist aus dem Material nicht wiederherstellbar, wenn sie einmal
  weg ist.
  ZWEI ZEIGER DIESES EINTRAGS WERDEN HIERMIT NAMENTLICH ABGELÖST — sonst stehen sie daneben
  und widersprechen:
  · DER ZEIGER "Das Zugangsmodell ist an DREI Stellen ausdrücklich als offen geführt …
    AN KEINER DER DREI IST ETWAS GEÄNDERT WORDEN" IST SEIT DEM 2026-08-25 FALSCH. An allen
    dreien hat sich etwas geändert: In CLAUDE.md, "## Modus", ist die ZUSTANDSAUSSAGE
    ERSETZT; die Stelle in DIESEM Eintrag ist durch den vorliegenden Block abgelöst; und
    docs/ziel-befunde.md trägt im Block "WAS AUSDRÜCKLICH OFFEN BLEIBT (2026-08-20)" des
    Google-Abschnitts jetzt einen ZEIGER auf die Entscheidung.
  · DER ZEIGER "Die Trennung der zwei Achsen ist GELESEN an CLAUDE.md, '## Modus'
    (Stand 2026-08-24)" BLEIBT TRAGFÄHIG, und das wird hier ausdrücklich gesagt statt offen
    gelassen. Was er zitiert, ist die ACHSEN-TRENNUNG — "EIN FREIGABEVERFAHREN GIBT ES BEI
    GOOGLE WEITERHIN, ABER AM ZUGANGSMODELL STATT AN DER GESTALT" —, und die steht dort
    Zeichen für Zeichen unverändert; ersetzt ist allein die Zustandsaussage DAHINTER. Die
    Datierung bleibt richtig. WER NUR SIEHT, DASS AM ABSATZ ETWAS ERSETZT WURDE, hält auch
    diesen Zeiger für überholt und zieht eine Provenienz zurück, die trägt.
  WAS OFFEN BLEIBT, UND ES IST NICHT WENIG: die MESSUNG des Client-Credentials-Ausschlusses
  und das KONKRETE ABLAUFDATUM des live verwendeten LinkedIn-Zugangsdatums. Beide sind von
  dieser Entscheidung UNBERÜHRT — sie beantwortet, WER das Zugangsdatum erzeugt, nicht, wie
  lange es lebt und woran sein Ablauf bemerkt wird.
  PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25 (der Zweig und das Zugangsmodell). Dass die zwei
  Zeiger oben so lauten, wie hier zitiert, ist GEMESSEN am Dateitext (CC, 2026-08-25). KEINE
  Messung an einer Anbieter-Schnittstelle.
- DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT (Trigger: die erste
  nicht-additive Migration): In diesem Fenster läuft der ALTE Code gegen das NEUE
  Schema. Beim Anlegen einer Spalte ist das folgenlos; beim Umbenennen, beim Löschen
  oder beim Verengen eines Constraints nicht. NIRGENDS STEHT, WELCHE MIGRATIONSARTEN
  ES GEFÄHRLICH MACHEN — die REIHENFOLGE ist geregelt (docs/db-regeln.md, "MIGRATION
  IMMER VOR CODE-DEPLOY"), das FENSTER dazwischen nicht.
  DER ZWEITE TEIL DESSELBEN BEFUNDS, und er ist die teurere Hälfte: Ein Deploy, der
  den Ingest bricht, verwirft Conversions STILL. Die leere 204 ist Absicht (s.
  "INGEST-204-CONTAINMENT" in docs/immer-beachten.md); die Folge ist, dass der Browser
  des Besuchers eine KORREKTE Antwort bekommt und NIEMAND erfährt, dass nichts
  angekommen ist. Einen Rollback gibt es nicht.
  DIE VORFRAGE, als benannte Vorfrage und AUSDRÜCKLICH NICHT NEBENBEI ZU BEANTWORTEN:
  Welche Deploys sind überhaupt gefährlich? Eine brauchbare Antwort trennt sie an
  einem Merkmal, das sich VOR dem Deploy erkennen lässt — nicht an einem, das man
  erst hinterher sieht.
  PROVENIENZ: OWNER-BEFUND (2026-08-17). Zwischen dem 2026-08-19 und dem 2026-08-21
  VIERMAL vertagt; am 2026-08-21 verortet.
  Was still kaputtgeht: Beide Teile sind lautlos — im ersten Fall bricht ein laufender
  Request gegen ein Schema, das er nicht kennt; im zweiten verschwindet eine
  Conversion ohne Fehler.
  ERGÄNZT AM 2026-08-27 — DER TRIGGER IST DEM WORTLAUT NACH EINGETRETEN, DER SCHADEN IST
  AUSGEBLIEBEN, UND DER PUNKT BLEIBT OFFEN. Der Text darüber ist unverändert; dieser Block
  tritt DANEBEN. **DER TRIGGER WIRD AUSDRÜCKLICH NICHT AUF ERLEDIGT GESETZT.**
  WAS EINGETRETEN IST: Migration **0025** (Scheibe 11.8b, gefahren 2026-08-26) hat einen
  CONSTRAINT GEDROPPT — den alten Primärschlüssel auf `(project_id, target)` — und eine
  NOT-NULL-BEDINGUNG auf `secret` GELÖST. Nach dem Wortlaut oben ("beim Umbenennen, beim
  Löschen oder beim Verengen eines Constraints") ist das eine nicht-additive Migration.
  **WARUM NICHTS PASSIERT IST — UND DAS IST DER EIGENTLICHE INHALT DIESER ERGÄNZUNG: ES WAR
  DER ZUSCHNITT, NICHT DAS GLÜCK.** 0025 legte den UNIQUE-Constraint auf
  `(project_id, target)` **VOR** dem Drop des alten Primärschlüssels an, damit der im
  Fenster laufende ALTE Code seinen `onConflict`-Arbiter behält — ein Upsert mit
  `on_conflict=project_id,target` braucht einen passenden Constraint, und für die Dauer
  eines Schrittes war das Paar doppelt gesichert. Fundstelle:
  `supabase/migrations/0025_project_secrets_schema.sql`, Schritte S4 und S5, im Kopf als
  Zwang **Z6** benannt.
  **DIE REGEL, DIE DAS ERZWINGT, STEHT NIRGENDS.** Es war eine EINZELFALL-ÜBERLEGUNG beim
  Zuschnitt jener Scheibe — kein Verfahren, keine Auflage, keine Checkliste. Die nächste
  nicht-additive Migration hat nichts, woran sie sich halten könnte, ausser dass jemand
  dieselbe Überlegung ein zweites Mal anstellt.
  **DIE VORFRAGE OBEN IST DAMIT NICHT BEANTWORTET, SONDERN BESTÄTIGT:** Der Fall zeigt, dass
  die Trennung möglich ist ("erkennt man VOR dem Deploy, dass der alte Code einen Constraint
  braucht?"), und er zeigt zugleich, dass sie heute von der Aufmerksamkeit eines einzelnen
  Zuschnitts abhängt.
  PROVENIENZ: der Vollzug von 0025 ist **GEMESSEN (Owner, 2026-08-26, SQL-Editor;**
  s. docs/claude-history/phase-11.8-autorisierungsschicht.md, Vermerk 2**)**; die Zuordnung "nicht-additiv" ist eine
  ABLEITUNG aus dem Wortlaut dieses Eintrags und **keine Entscheidung** — der Eintrag
  definiert den Begriff selbst nicht.
- DAS POSTGRES-UPGRADE IST HEUTE GRATIS UND SPÄTER NICHT — GESTRICHEN AM 2026-09-11, DER
  GEGENSTAND IST ERLEDIGT. Der Punkt hielt fest, dass das angebotene Postgres-Upgrade ein
  Wartungsfenster ist, das heute nichts kostet und mit dem ersten echten Kunden-Traffic
  laufende Kampagnen träfe.
  BELEG DER ERLEDIGUNG:
  · GEFAHREN am 2026-09-11 von 17.6.1.127 auf 17.6.1.166 (OWNER-ANGABE; keine Messung am
    Repo und keine an der Datenbank).
  · DIE WAHL GEGEN DIE VORSCHAU-FASSUNG (OWNER-ANGABE): Die Auswahl bot 17.6.1.164 mit dem
    Etikett PREVIEW, vorausgewählt, und 17.6.1.166 ohne Etikett. Genommen wurde 17.6.1.166,
    weil eine stabile Fassung danebenstand.
  · GEMESSEN LIVE (Owner, 2026-09-11), nach dem Upgrade: Eine veröffentlichte Kundenseite
    ist aufgerufen und ein Ereignis ausgelöst worden; in der Analytics-Kachel stiegen
    PageView und Lead je um eins. Das zeigt, dass beide Wege über PostgREST tragen — der
    Serve-Pfad, der die Seite ausliefert, und der Ingest, der die Ereignisse schreibt. Dass
    beide über den Supabase-JS-Client laufen, ist GEMESSEN am Code (CC, 2026-09-11:
    Resolver in src/lib/hosting/resolve.ts, Serve-Route force-dynamic; Schlüssel-Lookup
    in src/lib/capi/token.ts, Schreibung in src/lib/analytics/persist.ts). DIE GRENZE: eine
    Ablesung der Kachel, keine Messung an der Datenbank.
  Die Angaben des Dialogs und der Versionsstand stehen in docs/plattform-befunde.md,
  Abschnitt "Supabase (Postgres · Auth · RLS · Vault · Backups)", Teil (at).
- DIE SOLL-HÄLFTE VON "/API/E-SCHLANKHEIT" IST ZU VERDICHTEN — GESTRICHEN AM 2026-09-25, DER
  GEGENSTAND IST ERLEDIGT. Der Punkt hielt fest, dass der Eintrag "/API/E-SCHLANKHEIT" in
  CLAUDE.md, "### A) Heute verbindlich", mit 120 Zeilen / 9 429 Bytes (GEMESSEN 2026-08-24)
  der grösste Einzelblock einer unbedingt geladenen Datei war, und verlangte, seine
  SOLL-Hälfte auf wenige Zeilen zu verdichten und ihren Volltext hierher zu ziehen.
  BELEG DER ERLEDIGUNG:
  · Der Trigger ("die nächste Arbeit an CLAUDE.md, die diesen Abschnitt ohnehin berührt") ist
    mit Commit `cccc23f` eingetreten (2026-09-22, Teilung von CLAUDE.md in Kern und
    Herleitung) und im selben Zug vollzogen: Der ganze Eintrag trägt heute 24 Zeilen /
    2 013 Bytes, die SOLL-Hälfte davon 5 Zeilen (GEMESSEN, CC, 2026-09-25). Die MUSS-Hälfte
    steht unverändert als UNBEDINGT im Kern.
  · ABWEICHUNG VOM WORTLAUT DES PUNKTES: Der Volltext steht nicht hier, sondern in
    docs/claude-md-herleitung.md, Abschnitt "## Code-Qualität, Performance &
    SaaS-Skalierung" — zeichengleich der Stand vom 2026-09-22. Der Inhalt ist erhalten; der
    Ort folgt der Teilung und nicht diesem Punkt.
  · Die Streichung ist ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25 (Phasenende 11.7). Der
    gestrichene Volltext steht unter Commit `3e080b2`.
- EIN INDIKATOR FÜR ABSCHNITT 2b FEHLT (Trigger: die nächste Änderung an
  docs/arbeitsweise.md — dann geht er beiläufig hinein und kostet keinen zweiten Vollzug in
  der Projektanweisung): GEGENSTAND — Abschnitt "## 2b. PROPORTION — WIE TIEF GEPRÜFT
  WIRD" trug vier Abbruchkriterien, die sämtlich ein Urteil verlangen, und keine
  erhebbare Messgrösse.
  ERLEDIGT, vollzogen (dieser Commit) — OWNER-ENTSCHEIDUNG 2026-09-17: docs/arbeitsweise.md,
  "## 2b", trägt unter den vier Abbruchkriterien den Absatz "Ein Messwert daneben, kein
  Gate" — die geänderten Zeilen in docs/ und in src/ über die Phase, genannt im Kopf des
  Phasen-Archivs. Die Stub-Zeile in CLAUDE.md, "## Offene Punkte", ist im selben Zug
  gestrichen.
- DREI EINTRÄGE DIESER LISTE HABEN EINEN EINGETRETENEN TRIGGER UND SIND NICHT GESICHTET —
  GESTRICHEN AM 2026-09-25, DER GEGENSTAND IST ERLEDIGT. Der Punkt hielt fest, DASS eine
  Sichtung der Posten mit eingetretenem Trigger fällig war — drei am 2026-08-24, zwölf am
  2026-09-11 —, und band sie an die Hebung am Ende der Phase 11.7 (Vermerk vom 2026-09-23).
  BELEG DER ERLEDIGUNG:
  · DIE SICHTUNG IST GEFAHREN (CC, Inventur des Phasenendes 11.7, 2026-09-25; zugeordnet vom
    Architekten am selben Tag). Zählung nach der Achse vom 2026-09-11 (GEMESSEN, CC,
    2026-09-25): Von 69 Stub-Einträgen trugen zwölf das Wort EINGETRETEN;
    Negativkontrolle 0.
  · JE POSTEN (Titelanfang, Ergebnis): NICHTS ZEIGT AN … — bleibt · EIN ZIEL KANN
    KONFIGURIERT SEIN … — bleibt, Ursache (3) um K4 ergänzt · DAS POSTGRES-UPGRADE … — schon
    am 2026-09-11 gestrichen · DIE VOLLSTÄNDIGKEITS-ACHSE … — Backlog · EIN
    AUTORISIERUNGS-FLUSS … — bleibt · DER OAUTH-WEG RUFT ensureTrackingKey NICHT … — Backlog ·
    DIE SIEBEN-TAGE-FRIST … — bleibt, Stub ohne festen Termin · eventSourceUrl IST AN DER
    FAN-OUT-STELLE VERFÜGBAR … — gestrichen · retry HAT KEINE OBERGRENZE … — gestrichen ·
    ZWEI EINTRÄGE AUS DEM VORRAT DER PHASE 11.8 … — gestrichen · saveProject SCHREIBT
    settings UNVALIDIERT … — Backlog · DER RESOLVER SCHREIBT … — Backlog · EIN
    EINGESCHALTETER EINWILLIGUNGS-DIALOG … (seit dem 2026-09-16 in der Zählung) — bleibt.
    Ohne das Wort im Stub, aber mit eingetretenem Trigger: DIE ADBLOCKER-KACHEL … und WAS
    GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT … — bleiben, Stub nachgezogen.
  · SEINE GRUNDSATZFRAGE BLEIBT OFFEN und liegt im Backlog, gekennzeichnet als Kandidat für
    einen Änderungsantrag an docs/arbeitsweise.md: was mit einem FÄLLIGEN Punkt geschieht,
    der nicht abgearbeitet wird. Die Sichtung hat sie je Posten beantwortet, nicht als
    Regel. Fundstelle: docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.7
    gehoben (2026-09-25) …".
  · Die Streichung ist ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25 (Phasenende 11.7). Der
    gestrichene Volltext steht unter Commit `3e080b2`.
- DER TITEL-ZEIGER IN supabase/checks/db-stand.sql IST UNGEPRÜFT (Trigger: die nächste
  Arbeit an db-stand.sql oder am DB-Doku-Stand): CLAUDE.md hält im Abschnitt "## Aktueller
  DB-/Analytics-Stand" fest, jener Titel-Zeiger brauche die Regeltitel weiterhin an einem
  auffindbaren Ort, und ein Pfad-Zeiger auf CLAUDE.md existiere nicht mehr. Ob der Zeiger
  heute noch trägt, hat niemand geprüft. Die Datei existiert (GEMESSEN am 2026-08-24, nur
  Existenz).
  WAS NICHT DAZUGEHÖRT: die Datei jetzt zu öffnen oder den Zeiger zu beurteilen. Beides
  gehört in die Runde, die der Trigger auslöst — diese Zeile hält nur fest, dass die
  Prüfung aussteht.
- DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026 (Trigger: das Anlegen einer NEUEN
  Tabelle in public ab dem 30.10.2026 — insbesondere der Geheimnis-Speicher der
  Autorisierungsschicht, falls er danach entsteht): Der Anbieter kündigt an, dass neu
  angelegte Tabellen in public die automatischen DML-Grants an anon, authenticated und
  service_role NICHT mehr bekommen. Sie brauchen dann ein AUSDRÜCKLICHES GRANT, bevor der
  Daten-API-Weg sie überhaupt sieht; bestehende Tabellen bleiben unberührt.
  WÖRTLICH — ZWEI SÄTZE, UND DER ZWEITE GEHÖRT ZWINGEND ZUM ERSTEN, weil der erste allein
  nach einem Bruch am Bestand klingt: "On October 30, 2026 the setting will be applied it
  to all existing projects." · "Once the change is rolled out to your project, new tables
  you create in public schema require an explicit opt-in (via a Postgres grant) before the
  Data API can see them. Existing tables are not affected in your project, they keep their
  current grants and stay reachable." (Der Bruch "applied it" steht so im Original und ist
  KEIN Übertragungsfehler — wer ihn glättet, macht aus einem Zitat eine Wiedergabe.)
  WAS DABEI NICHT KIPPT, UND DAS IST DER GRUND FÜR DIESEN EINTRAG: Die Regel "GRANTS
  SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT" (docs/immer-beachten.md) bleibt
  unverändert richtig. Was sich ändert, ist der AUSGANGSZUSTAND, gegen den sie schützt —
  nicht die Schicht, die trägt.
  WER DIE ANKÜNDIGUNG FÜR EINE ENTWARNUNG HÄLT, HAT SIE FALSCH GELESEN: Eine neue Tabelle
  ohne "enable row level security" ist danach nicht sicher, sondern nur vorübergehend
  unerreichbar. Ein einziges GRANT, das jemand nachträglich ergänzt, damit die Anwendung
  wieder läuft, stellt den alten Zustand vollständig her — und dann trägt wieder allein
  die RLS. Die Umstellung verschiebt den Zeitpunkt, zu dem die Lücke entsteht, sie
  schliesst sie nicht.
  WAS AUSDRÜCKLICH OFFEN BLEIBT: Der Lesepfad des heutigen Geheimnis-Speichers läuft über
  service_role. Ob dessen Grant von der Umstellung berührt ist, sagt die gelesene Stelle
  NICHT — sie nennt anon, authenticated und service_role in EINER Aufzählung, ohne den
  Fall der Server-Action zu behandeln. Hier wird das NICHT abgeleitet.
  GRENZE: GELESEN am 2026-08-25, NICHT gemessen. Ob und wann die Änderung dieses Projekt
  erreicht, ist am Repo nicht entscheidbar — dieselbe Denkfigur wie bei "OB EINE MIGRATION
  IN DER LAUFENDEN DB ANGEWANDT IST" (docs/immer-beachten.md). Die drei Daten der Quelle
  (28.04.2026 · 30.05.2026 · 30.10.2026) sind ANKÜNDIGUNGEN des Anbieters, keine
  Beobachtungen an diesem Projekt. Der gemessene Ist-Zustand (docs/db-stand.md,
  ROLLEN-GRANTS, gemessen 2026-08-05) wird davon NICHT berührt und ist NICHT angeglichen
  worden.
  PROVENIENZ: GELESEN 2026-08-25 am Changelog-Eintrag "Breaking Change: Tables not exposed
  to Data and GraphQL API automatically", datiert "Apr 28, 2026", unter
  supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically
  — dieselbe Ankündigung steht als Fliesstext in supabase.com/docs/guides/api/securing-your-api,
  Abschnitt "Default privileges" ("Supabase is changing the platform default to revoke
  these automatic grants so that exposure becomes opt-in"). KEINE Messung.
  WO DER LAUF STEHT, AUS DEM DIESER PUNKT STAMMT: docs/plattform-befunde.md, Abschnitt
  "Supabase (Postgres · Auth · RLS · Vault · Backups)", Teil (z) — dort steht er als
  EINZEILER mit Verweis hierher, damit der Befund nicht in zwei Fassungen lebt. Die
  wörtlichen Zitate stehen HIER und nur hier.
- DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER PROJEKTREGEL AB (Trigger: die
  nächste neue DB-Funktion oder RPC): Beide Seiten verlangen einen FIXIERTEN Pfad. Sie
  empfehlen verschiedene WERTE, und dieser Eintrag legt beide vor, ohne zu entscheiden.
  PROJEKTSEITE — docs/db-regeln.md, Regel "DB-FUNKTIONEN + SEARCH_PATH": SECURITY INVOKER
  bekommt `set search_path = public` und einen voll qualifizierten Rumpf; SECURITY DEFINER
  bekommt `set search_path = pg_catalog`, ausdrücklich NICHT public, weil eine
  DEFINER-Funktion mit Owner-Rechten läuft und ein in public angelegtes Objekt die
  Namensauflösung kapern könnte. PROVENIENZ: präzisiert nach EIGENER MESSUNG am
  2026-07-28; dieselbe Regel führt rls_auto_enable mit search_path=pg_catalog als
  gemessenen Ist-Zustand und verbietet ausdrücklich, ihn zu "korrigieren".
  ANBIETERSEITE — GELESEN am 2026-08-25 an zwei Stellen: supabase.com/docs/guides/database/functions,
  Abschnitt "Suggestions › Security definer vs invoker" ("It is best practice to use
  `security invoker` (which is also the default). If you ever use `security definer`, you
  must set the `search_path`." · "If you use an empty search path (`search_path = ''`), you
  must explicitly state the schema for every relation in the function body"), und
  supabase.com/docs/guides/database/database-advisors, Lint 0011_function_search_path_mutable
  ("We recommend pinning functions' `search_path` to an empty string, `search_path = ''`,
  which forces all references within the function's body to be fully qualified").
  DIE ABGRENZUNG, DIE DEN WIDERSPRUCH AUF SEINE ECHTE GRÖSSE BRINGT — ohne sie liest sich
  der Eintrag als Regelbruch, und das ist er nicht: Einig sind sich beide Seiten darin,
  DASS der Pfad fixiert gehört; der Advisor-Lint ist mit public, mit pg_catalog und mit
  dem leeren Pfad gleichermassen erfüllt, denn er beanstandet einen MUTABLEN Pfad. Nicht
  einig sind sie sich im empfohlenen WERT.
  ZU pg_catalog SCHWEIGT DER ANBIETER — NICHT-TREFFER MIT BENANNTER REICHWEITE: Auf den
  beiden oben genannten Seiten kommt pg_catalog nicht vor. Es ist damit NICHT belegt, dass
  der Anbieter den Projektwert für schlechter hält; belegt ist nur, dass er ihn nicht
  nennt. Der Unterschied ist der zwischen "abgesucht und verworfen" und "nicht erwähnt".
  WAS HIER NICHT GESCHIEHT, UND ZWAR AUS EINEM BENANNTEN GRUND: docs/db-regeln.md wird
  NICHT angefasst. Jene Regel ruht auf einer Messung an DIESER Datenbank, und ihre vierte
  Regel verbietet die stille Angleichung an eine Anbieter-Doku ausdrücklich ("WIDERSPRICHT
  EIN DOKU-BEFUND EINER DER DREI REGELN OBEN, WIRD DIE REGEL NICHT GEÄNDERT ... Der
  Widerspruch wird VORGELEGT (beide Seiten, Datum, Fundstelle), der Owner entscheidet").
  Dieser Eintrag IST diese Vorlage.
  WAS NICHT DAZUGEHÖRT: die Frage zu beantworten, welcher Wert der bessere ist. Sie
  verlangt eine Abwägung zwischen einem gemessenen Ist-Zustand und einer Anbieter-
  Empfehlung, und diese Abwägung trifft der Owner — bei der nächsten Funktion, nicht hier.
  PROVENIENZ: die Projektseite GEMESSEN am 2026-07-28 (übernommen aus docs/db-regeln.md,
  nicht neu erhoben); die Anbieterseite GELESEN am 2026-08-25 an den zwei genannten Seiten.
  KEINE Messung an dieser Datenbank in dieser Runde.
  WO DER LAUF STEHT, AUS DEM DIESER PUNKT STAMMT: docs/plattform-befunde.md, Abschnitt
  "Supabase (Postgres · Auth · RLS · Vault · Backups)", Teil (z) — dort steht er als
  EINZEILER mit Verweis hierher, damit der Befund nicht in zwei Fassungen lebt. Die
  wörtlichen Zitate beider Seiten stehen HIER und nur hier.
- DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT (Trigger: bevor der erste FREMDE
  Kunde ein Zugangsdatum ablegt): Mit der Entscheidung, im Anwendungscode zu chiffrieren
  und den Schlüssel in der Vercel-Umgebung zu halten (docs/roadmap.md, Eintrag 11.8, Block
  vom 2026-08-25, Entscheidung (1)), entsteht ein Wert, dessen Verlust ALLE Kundenzugänge
  unlesbar macht. Der Preis ist dort benannt und wird hier NICHT verdoppelt; offen ist das
  VERFAHREN.
  DREI DINGE SIND UNGEKLÄRT, UND KEINES WIRD HIER ENTSCHIEDEN:
  (1) WIE DER SCHLÜSSEL GESICHERT WIRD. Eine Umgebungsvariable ist keine Verwahrung — sie
      existiert genau einmal, an einem Ort, den niemand sichert.
  (2) WIE ER GEWECHSELT WIRD, OHNE DASS ALTE CHIFFRATE UNLESBAR WERDEN. Ein Wechsel ohne
      Übergang macht jedes bestehende Zugangsdatum in derselben Sekunde wertlos; ein
      Wechsel MIT Übergang verlangt, dass ein Chiffrat sagen kann, unter welchem Schlüssel
      es entstanden ist — und das ist eine Entscheidung über die FORM der Nutzlast, nicht
      über den Betrieb.
  (3) WAS GESCHIEHT, WENN ER KOMPROMITTIERT IST. Dann sind nicht die Chiffrate das
      Problem, sondern die Zugangsdaten dahinter: sie müssten bei JEDEM Ziel widerrufen
      und neu beschafft werden, und das geht nur über die Kunden.
  WARUM ES EIN OFFENER PUNKT IST UND KEINE AUFLAGE — der Satz gehört dazu, sonst wird das
  Verfahren in die erste Bau-Scheibe gezogen und kostet dort Zeit ohne Gegenwert: Für Bau
  und Test mit dem EIGENEN Konto genügt ein Schlüssel in der Umgebung. Fällig wird das
  Verfahren mit dem ersten FREMDEN Zugangsdatum — vorher gibt es nichts zu verlieren, weil
  jedes Chiffrat einen Zugang schützt, den der Owner selbst jederzeit neu erzeugen kann.
  WAS NICHT DAZUGEHÖRT: die Frage, OB im Anwendungscode chiffriert wird. Die ist am
  2026-08-25 entschieden; dieser Punkt trägt ausschliesslich die Folge daraus.
  PROVENIENZ: die Entscheidung ist OWNER (2026-08-25), die Einordnung der drei offenen
  Dinge ist ARCHITEKT (2026-08-25). KEINE Messung.
- EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE (Trigger: die erste Zeile mit
  project_id IS NULL — also der erste Schreibpfad, der die Eigentums-Achse BENUTZT, statt
  sie offenzuhalten): Mit der Migration 0025 (Scheibe 11.8b) ist project_secrets.project_id
  NULLBAR. 0021 hält im Kopf ausdrücklich fest, dass diese Tabelle KEINE eigene
  user_id-Spalte braucht, weil die Kette auth.users -> projects -> project_secrets über
  "on delete cascade" trägt — und dass, wer die Kaskade an projects je entfernt, dieser
  Tabelle ihren Löschpfad mitnimmt. DIE NULLBARKEIT ENTFERNT DIE KASKADE NICHT, ABER SIE
  SCHAFFT EINEN ZUSTAND, DEN DIE KETTE NICHT ERREICHT.
  DREI ANTWORTEN, und sie gehören zusammen:
  (1) BEI EINER PROJEKTLÖSCHUNG: nichts. Die Kaskade greift über project_id; ein leerer
      Wert zeigt auf kein Projekt und wird von keinem "on delete cascade" erfasst.
  (2) BEI EINER NUTZERLÖSCHUNG: ebenfalls nichts, und das ist die schärfere Folge. Die
      Kette hängt VOLLSTÄNDIG an derselben Spalte. EIN GEHEIMNIS OHNE PROJEKT ÜBERLEBT
      DAMIT DIE LÖSCHUNG DES KONTOS, ZU DEM ES GEHÖRTE.
  (3) WER SIE JE WIEDER ENTFERNEN KÖNNTE: KEINER DER VIER PFADE DER ANWENDUNG. Alle vier
      filtern auf project_id, und ihr projectId stammt immer aus einem Ownership-Gate —
      eine Zeile ohne Projekt ist für sie nicht lesbar, nicht auflistbar, nicht löschbar.
      Sie wäre für die gesamte Anwendung UNSICHTBAR und läge trotzdem in der
      Geheimnis-Tabelle. Entfernbar nur von Hand.
  DIE GEMESSENE ACHSE MIT IHREN VIER FUNDSTELLEN (GEMESSEN am Repo, CC, 2026-08-26; Achse:
  src/ über *.ts und *.tsx, gesucht nach jedem Zugriff auf project_secrets im
  Produktivcode; Testdateien ausgenommen): es gibt GENAU VIER —
  src/app/projects/actions.ts:625-628 (setCapiToken, der EINZIGE Schreibpfad; er setzt
  project_id unbedingt, und der Wert stammt aus der Zeile, die das Ownership-Gate
  darüber, actions.ts:600-606, als dem Nutzer gehörend bestätigt hat) ·
  src/app/projects/actions.ts:766-769 (removeCapiToken, delete mit eq(project_id) +
  eq(target)) · src/app/projects/actions.ts:857-859 (listConfiguredTargets, select mit
  eq(project_id)) · src/lib/capi/token.ts:323-328 (getCapiConfigByTrackingKey, select mit
  eq(project_id) + in(target)).
  DARAUS: HEUTE KANN ES KEINE SOLCHE ZEILE GEBEN. Kein Pfad schreibt sie, und 0025 ändert
  daran nichts — die Nullbarkeit ist eine Möglichkeit des SCHEMAS, nicht des CODES.
  Entstehen könnte sie allein von Hand: im SQL-Editor oder über einen Aufruf mit dem
  service_role-Schlüssel.
  WARUM VERTAGT UND NICHT OFFEN — die Unterscheidung ist der Grund für diesen Eintrag:
  VERTAGT heisst, es gibt einen benennbaren Auslöser; OFFEN heisst, niemand merkt es. Der
  Auslöser ist benennbar und steht oben, und er ist ausdrücklich KEIN "falls es je nötig
  wird": die erste Zeile mit project_id IS NULL, also der erste Schreibpfad, der die
  Eigentums-Achse tatsächlich benutzt. Scheibe 11.8b schafft den PLATZ, sie füllt ihn
  nicht.
  DIE EINSCHRÄNKUNG, OHNE DIE DIESER EINTRAG EINE FALSCHE BERUHIGUNG WÄRE: HEUTE MELDET
  NICHTS DEN EINTRITT. Kein Constraint verbietet den Zustand, kein Test kann ihn fangen
  (es gibt keinen Codepfad, den ein Wächter bewachen könnte), und die vier Zugriffe oben
  würden eine solche Zeile stumm übersehen. Der Aufschub ist damit der Sache nach vertagt
  und der BEOBACHTUNG nach offen. DIESER EINTRAG IST DIE ANZEIGE — er ist das Einzige,
  was den Zustand trägt, zusammen mit dem Spaltenkommentar in der Datenbank (0025, Schritt
  S6b), der dieselbe Aussage kurz fasst und einen Rebuild überlebt.
  WAS AUSDRÜCKLICH NICHT HIER ENTSCHIEDEN IST: wie der Löschpfad aussehen soll. Vier
  weitere Kandidaten sind am 2026-08-26 vorgelegt und NICHT gewählt worden — eine lesende
  Probe in supabase/checks/, eine nullbare user_id mit eigener Kaskade und einem CHECK auf
  genau eines von beidem, die Bindung des Auslösers an die Transport-Scheibe, und der
  Verzicht auf die Nullbarkeit. Wer das später aufgreift, greift eine ENTSCHEIDUNG auf,
  keine Lücke. KEINE EMPFEHLUNG.
  PROVENIENZ: die vier Fundstellen und der Nicht-Treffer sind GEMESSEN am Repo (CC,
  2026-08-26). Die Kaskaden-Aussage ist GELESEN an supabase/migrations/0021_project_secrets.sql
  (Kopf, Abschnitt LOESCHPFAD, und Zeile 65). Die Wahl von K1 und K3 ist
  OWNER-ENTSCHEIDUNG (2026-08-26). KEINE Messung an dieser Datenbank.
- DIE ZWEI REGISTRIERTEN WEITERLEITUNGS-ADRESSEN LIEGEN AUSSERHALB DES REPOS (Trigger: eine
  DRITTE Umgebung, ein Wechsel der Vercel-Adresse oder die Brand-Domain): Der
  OAuth-Fluss für Google kehrt an eine Adresse zurück, die in der GOOGLE-CLOUD-KONSOLE
  registriert ist. Registriert sind ZWEI, zeichengenau (OWNER-ANGABE, 2026-08-26):
  · http://localhost:3000/api/oauth/google/callback
  · https://pagesmith-delta.vercel.app/api/oauth/google/callback
  ZEICHENGENAU HEISST: das Schema wörtlich (die eine ist http, die andere https), der Pfad
  wörtlich, KEIN abschliessender Schrägstrich. Eine Adresse mit Schrägstrich ist eine
  ANDERE Adresse — der Anbieter gleicht sie als ZEICHENKETTE ab (GELESEN, docs/ziel-befunde.md,
  Google-Abschnitt, Teil (au): "Note that the http or https scheme, case, and trailing
  slash ('/') must all match").
  WAS STILL KAPUTTGEHT UND DER GRUND FÜR DIESEN EINTRAG: NICHTS IM CODE BINDET DIESE WERTE.
  Die Anwendung liest GOOGLE_OAUTH_REDIRECT_URI aus der Umgebung und reicht den Wert
  unverändert durch; das Gegenstück liegt in der Konsole. Läuft die Konsole vom Repo weg,
  wird NICHTS rot — kein Gate, kein Test, kein Build meldet etwas. Der Nutzer bekommt ein
  redirect_uri_mismatch, und die Suche beginnt bei Google statt in der Konfiguration.
  ES IST DIESELBE KLASSE WIE DAS onConflict-LITERAL UND DIE domains-ZEILE: ein Wert, dessen
  Gegenstück ausserhalb des Codes liegt und den kein Gate abgleicht.
  WAS BEIM TRIGGER ZU TUN IST: Die neue Adresse wird in der Cloud-Konsole registriert UND
  GOOGLE_OAUTH_REDIRECT_URI in jener Umgebung gesetzt — beides, sonst greift der eine oder
  der andere Halb-Zustand. Bei der Brand-Domain kommt der Eintrag "isAppHost-PLATZHALTER"
  oben dazu; die zwei Trigger fallen dann zusammen, sind aber verschiedene Arbeiten.
  HERKUNFT DIESES EINTRAGS: Er stand bis zum 2026-08-27 im Roadmap-Eintrag 11.8 und ist mit
  dessen Kollaps hierher verortet worden (ARCHITEKT, 2026-08-27). Er gehört NICHT nach
  docs/plattform-befunde.md — das ist kein Befund über einen Anbieter, sondern ein EXTERNER
  ZUSTAND MIT TRIGGER, also die Klasse dieser Datei.
  PROVENIENZ: die zwei Adressen sind OWNER-ANGABE (2026-08-26), NICHT gemessen — es ist
  kein Blick in die Cloud-Konsole durch CC erfolgt. Die Abgleich-Regel des Anbieters ist
  GELESEN (2026-08-27). Dass nichts im Code sie bindet, ist GEMESSEN am Repo (CC,
  2026-08-27).
- DER PRÄFIX GOOGLE_OAUTH_ HÖRT AUF ZU PASSEN, SOBALD EIN ZWEITES VORHABEN EIN EIGENES
  CLOUD-PROJEKT BEKOMMT (Trigger: genau das — ein zweites Vorhaben mit eigenem
  Google-Cloud-Projekt): Die drei Umgebungsvariablen der Autorisierungsschicht heissen
  GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET und GOOGLE_OAUTH_REDIRECT_URI
  (vergeben am 2026-08-27). Der Präfix ist GOOGLE_OAUTH_ und nicht GOOGLE_DATAMANAGER_,
  WEIL DER OAUTH-CLIENT AM CLOUD-PROJEKT HÄNGT UND NICHT AN DER API: Dasselbe Client-Paar
  autorisiert alles, was in jenem Projekt liegt; ein API-Name behauptete eine Bindung, die
  es nicht gibt.
  WAS STILL KAPUTTGEHT: Bekommt ein späteres Vorhaben ein EIGENES Cloud-Projekt, ist
  GOOGLE_OAUTH_ zu unspezifisch — zwei Client-Paare aus zwei Projekten drängen sich dann
  unter EINEN Namensraum, und welcher Wert zu welchem Projekt gehört, steht nirgends. Der
  Name wird dabei nicht falsch, er wird MEHRDEUTIG, und das meldet kein Werkzeug.
  WAS BEIM TRIGGER ZU TUN IST: umbenennen, in der Umgebung UND im Code — die Namen stehen
  in src/lib/oauth/google-authorize.ts und src/lib/oauth/google-token.ts. Die
  NEXT_PUBLIC_-REDEPLOY-PFLICHT greift dabei NICHT: keiner der drei trägt dieses Präfix,
  und das ist Absicht (der Server baut die Autorisierungs-Adresse ohnehin selbst).
  DAS IST KEIN AUFTRAG UND KEINE VORSORGE, sondern die benannte Bedingung, unter der der
  Name aufhört zu passen. Heute passt er.
  HERKUNFT DIESES EINTRAGS: Er stand bis zum 2026-08-27 im Roadmap-Eintrag 11.8 und ist mit
  dessen Kollaps hierher verortet worden (ARCHITEKT, 2026-08-27). Die NAMEN selbst sind
  NICHT mitgezogen — sie stehen selbstdokumentierend im Code; verortet ist allein die
  Bedingung, die nirgends sonst einen Ort hätte.
  PROVENIENZ: die Namensvergabe und ihre Begründung sind ARCHITEKTEN-ENTSCHEIDUNG
  (2026-08-27). KEINE Messung.
- DER DECKEL ENDET VOR DEM LESEN DES RUMPFES — ZWEI DATEIEN (Trigger: die nächste Arbeit
  an einer dieser beiden Dateien, spätestens mit dem ersten automatischen Aufrufer):
  GEMESSEN am committeten Objekt (CC, 2026-08-29, `git show HEAD:<pfad>`): In
  src/lib/oauth/google-token.ts (exchangeAuthorizationCode) und in src/lib/vercel/client.ts
  (ALLE DREI Funktionen) steht `clearTimeout(timer)` in einem `finally`, das NUR den
  `fetch` umschliesst. Der Antwort-Rumpf wird DANACH gelesen — `await res.json()` bzw.
  `await res.json().catch(() => null)`.
  WARUM DAS EIN UNTERSCHIED IST UND KEINE FORMSACHE: `fetch` kehrt zurück, sobald die
  KOPFZEILEN da sind. Der RUMPF ist ein ZWEITER Netzvorgang. Ist der Deckel vorher
  gelöscht, läuft genau dieser zweite Vorgang OHNE JEDE ZEITGRENZE — ein hängender
  Antwortstrom hält die Funktion dann unbegrenzt fest, und zwar STILL: kein Fehler, keine
  Logzeile, kein roter Test.
  ES IST EINE HALBE ERFÜLLUNG EINER BESTEHENDEN REGEL, KEIN NEUER BEFUND ÜBER EIN NEUES
  RISIKO: "DEFENSIVE TIMEOUTS: JEDER externe API-Call ... braucht ein striktes Timeout"
  (CLAUDE.md, Block A) ist an beiden Stellen sichtbar befolgt — der Deckel steht da, er
  endet nur zu früh. Genau deshalb fällt es niemandem auf.
  IN google-token.ts KOMMT EINE ZWEITE HÄLFTE DAZU: Dort fehlt im Rumpf-Pfad auch die
  ABBRUCH-UNTERSCHEIDUNG. Ein Abbruch beim Lesen käme als `network_error` heraus, nicht
  als `timeout` — beide enden beim Aufrufer gleich, aber die Diagnose führt an den
  falschen Ort.
  DIE BEHEBUNG STEHT ALS MUSTER IM REPO: src/lib/oauth/google-refresh.ts
  (exchangeRefreshToken) hat seit dem 2026-08-29 EIN `finally` um den GANZEN Ablauf und
  prüft `AbortError` auf BEIDEN Pfaden; zwei Tests (G18/G19) bewachen die Wirkung, nicht
  die Textstelle. Wer die Lücke schliesst, kopiert kein Verfahren, sondern zieht ein
  vorhandenes nach.
  WARUM ES HEUTE KLEIN IST: Beide Dateien werden von einem MENSCHEN ausgelöst — ein
  Domain-Vorgang, ein Autorisierungs-Durchlauf. Ein einzelner hängender Aufruf fällt auf,
  weil jemand wartet. MIT DEM ERSTEN AUTOMATISCHEN AUFRUFER IST DAS VORBEI.
  AUSDRÜCKLICH NICHT GEMESSEN: wie oft oder ob ein Antwortstrom in dieser Umgebung
  tatsächlich hängenbleibt. Der Punkt beschreibt eine FEHLENDE GRENZE, kein beobachtetes
  Ereignis.
  PROVENIENZ: die Lage in beiden Dateien GEMESSEN am committeten Objekt (CC, 2026-08-29);
  die Folge (unbegrenzte Laufzeit) ist eine ABLEITUNG aus dem Kontrollfluss, keine
  Messung.
- DIE MIDDLEWARE LEITET API-ROUTEN AUF EINE HTML-SEITE UM (Trigger: der erste
  programmatische Aufrufer einer API-Route, spätestens Scheibe 1b):
  GEMESSEN LIVE (Stefan, 2026-08-29, Schritt 5 des Live-Tests der Scheibe 1a): Ein POST
  OHNE Sitzung gegen /api/oauth/google/refresh endet in einer Umleitung auf /login, und
  dort antwortet Next mit 405. DER HANDLER WIRD NICHT ERREICHT; sein eigener 401 ist auf
  diesem Weg unerreichbar.
  ES IST KEIN LECK, UND DIESER SATZ GEHÖRT AN DEN ANFANG: Die Sperre TRÄGT. Sie trägt nur
  eine Ebene höher als gebaut. Ohne Sitzung kommt niemand an die Erneuerung.
  WARUM ES TROTZDEM EIN PUNKT IST: Ein PROGRAMMATISCHER Aufrufer bekommt einen Zustand,
  den keine Maschine lesen kann — eine Umleitung auf eine Anmeldeseite und danach ein
  Methodenfehler, der mit der eigentlichen Ursache nichts zu tun hat. BEI EINER
  GET-ROUTE WÄRE ES EINE 200 MIT EINER ANMELDESEITE IM RUMPF — UND DIE SIEHT WIE ERFOLG
  AUS. Genau dieser Satz steht bereits im Kommentar von
  src/app/api/oauth/google/refresh/route.ts als Begründung dafür, dass die Route POST ist
  und keinen Redirect antwortet; er beschreibt dieselbe Falle eine Ebene darüber, wo sie
  NICHT behoben ist.
  EINE FOLGE FÜR DEN BESTAND, die mitgehört: Der `!user`-Zweig jener Route hat damit
  KEINEN Live-Nachweis. Er wird NICHT entfernt — er trägt, sobald jemand den Matcher der
  Middleware ändert.
  AUSDRÜCKLICH UNGEMESSEN: ob src/proxy.ts ALLE /api/*-Pfade fasst. Erhoben ist genau
  zweierlei — ein AUTHENTIFIZIERTER POST erreicht die Route nachweislich (Schritt 4a
  antwortete mit dem handler-eigenen 404), und ein UNAUTHENTIFIZIERTER wird umgeleitet.
  Mehr ist nicht erhoben, und es wird hier NICHTS vermutet: weder über /api/e noch über
  /api/capi noch über den Matcher-Text.
  PROVENIENZ: GEMESSEN LIVE (Stefan, 2026-08-29). Die Aussage über den unerreichbaren
  401 ist eine ABLEITUNG aus dieser Beobachtung; die Aussage über den GET-Fall ist eine
  ÜBERTRAGUNG auf einen Fall, der nicht gefahren wurde, und ausdrücklich keine Messung.
  NACHGEZOGEN 2026-09-02 — DIESER PUNKT IST JETZT AUCH DORT VERORTET, WO ER GEBRAUCHT WIRD:
  Er steht seit dem 2026-09-02 als FÜNFTE VORBEDINGUNG im Abschnitt "1b als Folgetask"
  (docs/aktiver-stand.md) — als ZEIGER, NICHT als Kopie. DER VOLLTEXT BLEIBT HIER; zweimal
  geschrieben liefe er auseinander.
  WARUM DAS NACHZUTRAGEN WAR: Der Trigger oben zeigt seit dem 2026-08-29 auf Scheibe 1b, der
  1b-Abschnitt ist am 2026-09-01 geschrieben worden und nannte diesen Punkt nicht. BEIDE
  TEXTE WAREN FÜR SICH VOLLSTÄNDIG; DIE VERBINDUNG FEHLTE — und ein Zuschnitt, der nur den
  1b-Abschnitt liest, hätte sie nicht gefunden.
  WAS DER ZEIGER DORT TRÄGT, DAMIT ER OHNE DIESEN VOLLTEXT BRAUCHBAR IST: dass ein Aufruf
  ohne Sitzung garantiert die Anmeldeseite trifft, und die Folge — ein maschineller Auslöser
  kann die bestehende Beweis-Route nicht erreichen, gleich wie oft er läuft.
  DER TRIGGER UND DER GESAMTE TEXT DARÜBER SIND NICHT ANGETASTET, UND ES IST KEINE ANTWORT
  HINZUGEKOMMEN: Ob und was gebaut wird, ist hier so wenig entschieden wie zuvor.
  PROVENIENZ: dass der Punkt im 1b-Abschnitt nicht genannt war, ist GEMESSEN am Dateitext
  (CC, 2026-09-02). Die Messung der Umleitung selbst bleibt die vom 2026-08-29 und ist
  unberührt; die Folge für einen maschinellen Auslöser ist eine ABLEITUNG daraus.
  VERMERK 2026-09-03 — DER TRIGGER IST GEPRÜFT UND NICHT EINGETRETEN. DER TRIGGER-WORTLAUT
  UND DER GESAMTE TEXT DARÜBER SIND UNANGETASTET; DIESER VERMERK TRITT DANEBEN, HAKT NICHTS
  AB UND BEANTWORTET NICHTS.
  DER STAND: Scheibe 1b ist am 2026-09-03 geschnitten und in ZWEI SCHRITTE zerlegt — 1b-1
  (die Klammer um die Erneuerungs-Funktion) und 1b-2 (der Takt). "1b" ohne Suffix meint
  weiterhin das PAKET. Volltext des Zuschnitts und der Nachtrag zur Zerlegung:
  docs/aktiver-stand.md.
  1b-1 ERZEUGT KEINEN PROGRAMMATISCHEN AUFRUFER und lässt die Route unverändert hinter
  Sitzung und Eigentums-Gate; sie wird lediglich auf die neue Klammer umverdrahtet.
  DER TRIGGER IST DAMIT NICHT EINGETRETEN, UND DIE UNTERSCHEIDUNG IST DER GANZE PUNKT: Sein
  KALENDER-TEIL ("spätestens Scheibe 1b") ist erreicht, sein SACHVERHALT ("der erste
  programmatische Aufrufer einer API-Route") ist es nicht. Wer nur die erste Hälfte liest,
  hält den Punkt für fällig; wer nur die zweite liest, übersieht, dass die Frist läuft.
  ER TRITT MIT 1b-2 EIN — falls dessen Takt VON AUSSEN kommt. Ein Auslöser im selben Prozess
  stellt keine Anfrage und läuft an der Umleitung vorbei; ein zeitgetakteter Aufruf von
  aussen läuft hinein. WELCHE FAMILIE 1b-2 WÄHLT, IST NICHT ENTSCHIEDEN.
  DER GRUND FÜR DIESEN VERMERK, und er gehört hinein: EIN GEPRÜFT VERTAGTER TRIGGER SIEHT IN
  EINEM REPO GENAUSO AUS WIE EIN ÜBERSEHENER — nämlich wie nichts.
  KEINE EMPFEHLUNG, ob und was gebaut wird.
  PROVENIENZ: der Zuschnitt und die Zerlegung sind eine ARCHITEKTEN-FESTLEGUNG vom
  2026-09-03. Dass 1b-1 keinen programmatischen Aufrufer erzeugt, ist eine FOLGE aus seinem
  Zuschnitt, KEINE Messung. Die Messung der Umleitung bleibt die vom 2026-08-29.

- EIN AUTORISIERUNGS-FLUSS, DER AUF EINER ANDEREN ADRESSE STARTET ALS DER REGISTRIERTEN
  WEITERLEITUNG, ENDET GARANTIERT IN no_state (Trigger: EINGETRETEN — jeder Start über
  eine Vorschau-Adresse läuft hinein. OB UND WAS GEBAUT WIRD, IST NICHT ENTSCHIEDEN; die
  Frage wird spätestens fällig, wenn ein fremder Nutzer den Fluss startet — er kann den
  Grund nicht erraten, und für ihn sieht das Produkt kaputt aus):
  DIE URSACHE IST BEWIESEN, DIE BEHEBUNG IST NICHT ENTSCHIEDEN. DIESER PUNKT IST AM
  2026-08-31 UMGESCHRIEBEN WORDEN, NICHT ERGÄNZT — er stand bis dahin als "ungeklärt, ein
  Kandidat offen", und das trifft nicht mehr zu. Was von der alten Fassung bleibt, bleibt
  aus einem benannten Grund; was fällt, fällt benannt.
  DIE MESSUNG (OWNER, 2026-08-31): Ein Start über Vercel → Deployment → "Visit" landet auf
  der VORSCHAU-Adresse (pagesmith-<hash>-…), NICHT auf dem Host aus
  GOOGLE_OAUTH_REDIRECT_URI. Das State-Cookie ist host-only (der `__Host-`-Präfix
  verbietet ein Domain-Attribut); Google kehrt an den REGISTRIERTEN Host zurück, und der
  Browser sendet das Cookie dort nicht mit → no_state.
  UND DAS ERKLÄRT AUCH DEN ZWEITEN TEIL DES MUSTERS, den vorher niemand erklären konnte:
  Die Rückkehr ist RELATIV. Der Nutzer steht danach auf dem RICHTIGEN Host, und der zweite
  Versuch läuft — nicht weil "etwas warm geworden" wäre, sondern weil er inzwischen
  woanders steht.
  DAS BEOBACHTETE MUSTER BLEIBT RICHTIG, SEINE DEUTUNG WAR FALSCH: Beobachtet war "der
  erste Versuch einer warmen Periode scheitert" (GEMESSEN LIVE, Owner, dreimal, zuletzt
  2026-08-31). Die Pause war eine KORRELATION, keine Ursache — der Tagesanfang war der
  Zeitpunkt, an dem der Einstieg über das Vercel-Dashboard lief. WER DAS NICHT MITLIEST,
  SUCHT WEITER NACH EINER ZEITABHÄNGIGEN URSACHE.
  K1 IST BESTÄTIGT. K8 UND K9 SIND TOT.
  DIE HOST-PRÜFUNG WAR EINE FALSCHE ENTWARNUNG — UND SIE WAR NICHT NACHLÄSSIG. Sie stand
  hier als "HOST-DIVERGENZ IST WIDERLEGT (GEMESSEN, Owner, 2026-08-31): identischer Host in
  der Adresszeile vor dem Klick und nach der fehlgeschlagenen Rückkehr." Die Beobachtung
  war korrekt ausgeführt und ist es immer noch — sie hat nur den WARMEN Zustand gemessen,
  und dort steht man längst auf dem richtigen Host.
  DIE LEHRE, DIE ÜBER DIESEN FALL HINAUSGEHT: EIN INSTRUMENT, DAS NUR IM NICHT-FEHLERFALL
  GREIFT, ENTLASTET EINEN KANDIDATEN, OHNE IHN GEPRÜFT ZU HABEN. Es sieht dabei wie eine
  Messung aus, und genau deshalb ist es teurer als gar keine — es hat den einzigen
  richtigen Kandidaten aus der Liste getrieben.
  DER INKOGNITO-BEFUND BLEIBT UND IST WEITERHIN RICHTIG (GEMESSEN, Owner, 2026-08-31):
  frischer Login im Inkognito-Fenster, kein Fehler. SEINE GRENZE STAND SCHON DAMALS DABEI
  (ein Inkognito-Fenster tauscht den GANZEN Cookie-Vorrat und misst mehrere Achsen auf
  einmal), UND SIE IST JETZT EINGELÖST: Der Lauf lief vom richtigen Host. Er hat nie den
  Sitzungs-Aufbau entlastet, sondern nur bestätigt, dass es dort keinen Fehler gibt.
  SECHS KANDIDATEN BLEIBEN WIDERLEGT, und sie stehen hier, damit niemand sie erneut prüft
  (Herleitung je Kandidat: die Aufklärungsrunde vom 2026-08-31). SIE SIND AM 2026-08-31
  EINZELN GEGEN DIE NEUE URSACHE GEPRÜFT — eine Mengen-Aussage wird nicht dadurch richtig,
  dass man ein falsches Mitglied entfernt:
  · Direkter Aufruf der Callback-Adresse — erklärt einen Einzelfall, nicht das
    regelmässige Muster über den Knopf.
  · `Secure` über http (lokal) — in Prod läuft https, und es erklärt die anschliessende
    Fehlerfreiheit nicht.
  · `Max-Age=600` überschritten — träfe den zweiten Versuch genauso; zehn Minuten sind
    keine Tagespause.
  · `SameSite=Lax` — Lax sendet bei Top-Level-GET mit, der Callback IST ein GET, und im
    Repo gibt es keinen `form_post`-Modus.
  · Kaputter Cookie-Wert (`bad_format`) — erklärt kein "einmal je Periode"; bleibt als
    Diagnose-Alternative, weil er am Log sofort abzutrennen ist.
  · Plattform verwirft `Set-Cookie` auf einer 302 — träfe jeden Versuch gleich.
  DER SIEBTE — HOST-DIVERGENZ — IST AUS DIESER LISTE HERAUSGENOMMEN UND IST DIE URSACHE.
  Er steht nicht mehr unter den Widerlegten; die Liste sagt SECHS und nicht mehr sieben.
  K8 IST TOT, und der Grund gehört dazu, sonst wird er wieder aufgenommen: Er hing an der
  Vermutung, eine Sitzungs-Erneuerung verdränge das Cookie auf demselben Request. Die
  Ursache liegt aber nicht darin, dass das Cookie nicht GESETZT wurde, sondern darin, dass
  es beim Callback nicht GESENDET wird — ein anderer Host. K9 (etwas, das der Code nicht
  hergibt) ist damit ebenfalls gegenstandslos.
  DER KNOPF SCHEIDET WEITERHIN ALS URSACHE AUS: Das Muster trat sowohl über die abgetippte
  Start-URL auf (docs/aktiver-stand.md, VERMERK 6, Schritt 1) als auch über den in
  Scheibe 3 gebauten Knopf — beide erben den Host der Seite, auf der sie stehen.
  DER STRUKTURELLE BEFUND BLEIBT STEHEN UND TRÄGT UNABHÄNGIG VON DER DIAGNOSE (GEMESSEN am
  Repo, CC, 2026-08-31; Achse: `Set-Cookie`, `cookies().set`, `.cookies.set` über src/,
  ohne Testdateien, mit Positivkontrolle): ES GIBT IM REPO KEINE BAUFORM, DIE ZEIGT, WIE
  EINE ROUTE AUTH-COOKIES AUFFRISCHT UND EIN EIGENES COOKIE SETZT. Er war die Herleitung
  für K8; ER ÜBERLEBT DESSEN TOD, weil er eine Aussage über den BESTAND ist und keine über
  die Ursache.
  no_state HAT VIER BEDINGUNGEN UND ZWEI kind-WERTE (`parseStateCookie` in
  src/lib/oauth/google-authorize.ts): `missing` · und `bad_format` mit drei
  Unterbedingungen (Teilezahl ≠ 2, leerer State-Teil, formwidrige Projekt-Kennung). Die
  Log-Zeile `[oauth/google/callback] no_state` trägt ihren `reason` und trennt `missing`
  von `bad_format`. DAS BLEIBT DIE DIAGNOSE-ACHSE für jeden künftigen Fall, der NICHT auf
  die Host-Ursache zurückgeht.
  WAS FEHLT, IST KEIN FIX, SONDERN EIN ABGLEICH: Die Start-Route kennt den Host, auf dem
  Google zurückkehren wird (GOOGLE_OAUTH_REDIRECT_URI), UND den, auf dem sie selbst läuft
  — SIE VERGLEICHT SIE NICHT. Ein Fluss auf dem falschen Host läuft trotzdem los und
  scheitert GARANTIERT, nach dem Umweg über Google.
  NICHT ENTSCHIEDEN, OB UND WAS GEBAUT WIRD. KEINE EMPFEHLUNG. Zwei Gründe stehen
  ausdrücklich dagegen, dass hier ein Defekt zu reparieren wäre: DER CODE VERHÄLT SICH
  KORREKT — ein `__Host-`-Cookie SOLL host-only sein, das ist seine Schutzwirkung und
  nicht sein Fehler. Und EIN KUNDE KÄME ÜBER EINE FESTE DOMAIN; die Vorschau-Adresse ist
  ein Entwickler-Einstieg.
  EINE FOLGE, DIE SCHON HEUTE GILT UND KEINE ENTSCHEIDUNG BRAUCHT: Jede Live-Anleitung zu
  diesem Fluss nennt den Start-Host ausdrücklich, und ein Durchlauf, der in no_state
  endet, ist UNGÜLTIG statt ein Befund. Ohne diesen Satz wird jeder künftige Live-Test
  durch diesen Fall verfälscht — er sieht aus wie ein Fehlschlag der geprüften Sache.
  PROVENIENZ, JE TEIL: Die Vorschau-Adresse, der Host-Vergleich und das Muster GEMESSEN
  LIVE (Owner, 2026-08-31). Die Code-Befunde GEMESSEN am Repo (CC, 2026-08-31). Dass die
  relative Rückkehr den geglückten Zweitversuch erklärt, ist eine FOLGE aus der Messung,
  keine eigene Beobachtung. Der Tod von K8 und K9 ist eine ABLEITUNG aus der bewiesenen
  Ursache.

- DIE PROJEKTWAHL ÜBERLEBT KEIN NEULADEN (Trigger: der erste fremde Nutzer mit mehr als
  einem Projekt — spätestens vor einem Beta-Launch):
  DER BEFUND (OWNER-Beobachtung 2026-08-31; der Mechanismus GEMESSEN am Code, CC,
  2026-08-31): Der Projektwechsel lebt ausschliesslich im React-State des Containers —
  kein Cookie, kein localStorage, keine Spalte. Ein Neuladen fällt auf den Auto-Load
  zurück, und der lädt das Projekt mit dem jüngsten `updated_at`.
  ER IST NICHT OAUTH-SPEZIFISCH, und das ist der erste Satz, weil er sonst falsch verortet
  wird: JEDER Wechsel plus F5 tut das. Die Fix-Scheibe vom 2026-08-31 hat ihn nicht
  verursacht, sondern SICHTBAR GEMACHT — sie hat den Rückkehr-Weg repariert und damit den
  allgemeineren Fall freigelegt.
  DIE SCHÄRFE, DIE DEN PUNKT ERST ZU EINEM MACHT: `updated_at` heisst "zuletzt
  GESCHRIEBEN", nicht "zuletzt ANGESEHEN". Die Callback-Route schreibt auf
  `project_secrets`, NICHT auf `projects`; `setCapiToken` schreibt auf beide.
  FOLGE — ZWEI BETREIBER TUN AUS IHRER SICHT DASSELBE, UND ES GEHT VERSCHIEDEN AUS:
  · Meta-Token in B eingefügt -> F5 bleibt in B.
  · Google in B verbunden -> F5 springt nach A.
  DERSELBE HANDGRIFF, ZWEI AUSGÄNGE. Das ist nicht "unbequem", sondern unvorhersagbar: Der
  Betreiber kann aus dem Verhalten keine Regel ableiten, weil die Regel an einer Spalte
  hängt, die er nicht sieht.
  NICHT GEBAUT: Eine überlebende Projektwahl ist ein EIGENES PRODUKTMERKMAL — sie betrifft
  jeden Wechsel, die Adresszeile und den Zurück-Knopf. Festlegung (3) des Zuschnitts der
  Fix-Scheibe schliesst sie ausdrücklich aus, und der Grund gilt weiter: EIN HALB GEBAUTES
  DEEP-LINKING WÄRE SCHLECHTER ALS KEINES, weil die Adresse dann manchmal gilt und
  manchmal nicht. KEINE EMPFEHLUNG, wie es zu lösen wäre.
  WARUM DIESER PUNKT HIER STEHT UND NICHT IM VORRAT DER STANDDATEI — OWNER-ENTSCHEIDUNG
  (2026-08-31): Er stirbt sonst mit der Phase. Vorrat 13 hat gezeigt, was dort mit
  eingetretenen Triggern geschieht.
  PROVENIENZ, JE TEIL: Die Beobachtung LIVE (Owner, 2026-08-31). Der Mechanismus — der
  React-State ohne Persistenz, der Auto-Load über `updated_at`, die Schreibziele der
  Callback-Route und von `setCapiToken` — GEMESSEN am Code (CC, 2026-08-31). Die zwei
  Ausgänge desselben Handgriffs sind eine FOLGE daraus, keine eigene Live-Beobachtung.

- WAS GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT, IST UNGELESEN UND UNGEMESSEN (Trigger: der
  Zuschnitt der Scheibe 4 der Phase 11.2 — der Transport):
  DIE FRAGE, WÖRTLICH: Was antwortet die Data Manager API, wenn eine Anfrage in
  `destinations[].operatingAccount.accountId` eine Kundennummer nennt, für die das
  hinterlegte Zugangsdatum NICHT autorisiert ist?
  DER BEFUND IST EIN NICHT-BEFUND, UND ER IST DER GANZE INHALT DIESES PUNKTES: Dazu steht im
  Repo NICHTS — weder GELESEN noch GEMESSEN. GEMESSEN am Dateitext (CC, 2026-08-31; ACHSE:
  docs/ziel-befunde.md und docs/ziel-fragenkatalog.md im Volltext, Begriffe
  `PERMISSION_DENIED` · `NOT_ALLOWLISTED` · `UNAUTHORIZED` · `401` · `403` ·
  `x-goog-user-project` · `loginAccount` · `operatingAccount` · `manager` · `role` ·
  `access level`). POSITIVKONTROLLE: Dieselbe Achse fördert die Statuscode-Zuordnung
  (`UNAUTHENTICATED` -> 401, `PERMISSION_DENIED` -> 403), den Schreibzugriffs-Satz aus Teil
  (x)/I4 ("this loginAccount must have WRITE ACCESS to the operatingAccount") und den
  `x-goog-user-project`-Befund aus Teil (am) zutage — sie erreicht den Abschnitt. HIER STEHT
  KEINE VERMUTUNG ÜBER DAS ANBIETER-VERHALTEN.
  WAS ES STATTDESSEN GIBT, und keines davon beantwortet die Frage: (1) eine ANFORDERUNG an
  den Zugriff (Teil (x)/I4, GELESEN) — sie sagt, was gelten MUSS, nicht was bei Verstoss
  geschieht, und der Befund schliesst dort selbst mit "KEINE ENTWARNUNG"; (2) drei Wege, auf
  denen Zugriff überhaupt entsteht (Teil (ad), GELESEN) — mit der dort tragenden GRENZE, dass
  sie aus der GOOGLE-ADS-Doku stammen und `loginAccount`/`operatingAccount` auf keiner jener
  Seiten vorkommen; (3) das Fehler-Enum mit `NOT_ALLOWLISTED` — kein gelesener Satz ordnet es
  diesem Fall zu, und die Zuordnung wird hier auch nicht hergestellt.
  WARUM ER AN SCHEIBE 4 HÄNGT UND NICHT AN SCHEIBE 2: EINE ABGELEGTE KENNUNG IST INERT.
  Solange Tor B (die Klartext-Spalte `secret` der google-Zeile bleibt NULL) und Tor D
  (`'google'` steht nicht in `TARGETS_WITH_ADAPTER`) halten, verlässt kein Byte den Server;
  ein falscher oder fremder Wert im Einstellungs-Blob richtet nichts an. DAS RISIKO ENTSTEHT
  BEIM SENDEN — und die Messung, die die Frage beantwortet, braucht den Transportpfad
  ohnehin, weil sie einen echten Aufruf gegen `events:ingest` mit einem GÜLTIGEN
  Zugangsdatum verlangt.
  EIN KANDIDAT, DER DIE GANZE KLASSE AUFLÖSEN WÜRDE — NICHT TIPPEN, SONDERN WÄHLEN: Kann die
  Schnittstelle die Konten AUFZÄHLEN, die das hinterlegte Zugangsdatum erreicht, braucht es
  für die Kundennummer kein Eingabefeld mehr — der Betreiber kann dann nur greifen, was der
  Token ohnehin trägt, und eine fremde Kundennummer ist gar nicht erst eintippbar. OB ES
  EINEN SOLCHEN ENDPUNKT GIBT, IST UNGELESEN UND UNGEMESSEN. Als KANDIDAT benannt — KEINE
  EMPFEHLUNG und KEIN AUFTRAG; ausdrücklich auch keine Aussage darüber, ob er die
  Ablage-Entscheidung des Zuschnitts der Scheibe 2 berührte.
  ABGRENZUNG ZU "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN — DREI URSACHEN,
  DIE GETRENNT BLEIBEN" (dieser Datei), und sie ist der Grund für einen EIGENEN Eintrag statt
  einer fünften Ursache dort: Jener Eintrag führt Ursachen, die IM EIGENEN HAUS liegen — ein
  falscher Wert, eine halbe Konfiguration, eine fehlende Warnung, ein abgelaufener Zugang.
  DIESER hier ist eine Frage über das VERHALTEN EINES FREMDEN SYSTEMS, und sie ist nicht
  beantwortbar, ohne es zu befragen. WIRD SIE BEANTWORTET, kann daraus eine weitere Ursache
  DORT werden; solange sie offen ist, wäre eine Ursache ohne Befund dort ein Platzhalter, der
  wie ein Wissensstand aussieht.
  Was still kaputtgeht: Ein Betreiber tippt die Kundennummer eines Kontos ein, das sein Token
  nicht erreicht — ein Zahlendreher genügt. Ob der Anbieter das als Fehler meldet, still
  verwirft oder etwas Drittes tut, weiss niemand; im schlechtesten der drei Fälle fehlen
  Conversions, während die Oberfläche "konfiguriert" sagt und kein Log etwas Auffälliges
  trägt.
  PROVENIENZ: Der Nicht-Treffer GEMESSEN am Dateitext (CC, 2026-08-31), Achse und
  Positivkontrolle oben. Die Zuordnung zu Scheibe 4 ist eine ARCHITEKTEN-FESTLEGUNG
  (2026-08-31), gestützt auf die zwei am Code gemessenen Tore. Der Aufzählungs-Kandidat ist
  eine ARCHITEKTEN-EINORDNUNG desselben Tages, keine Messung und keine Lesung.

  VERMERK 2026-09-01 — DER TRIGGER IST EINGETRETEN, UND ER IST BEHANDELT. DER TEXT DARÜBER
  BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; dieser Vermerk tritt DANEBEN und sagt, was der Zuschnitt
  mit dem Punkt gemacht hat.
  DER TRIGGER LAUTETE "der Zuschnitt der Scheibe 4 der Phase 11.2 — der Transport". DER
  ZUSCHNITT STEHT (docs/aktiver-stand.md, Abschnitt "Der Transport — Scheibe 4 des Schnitts
  der Phase 11.2", 2026-09-01), und dieser Punkt ist dort ausdrücklich behandelt worden —
  nicht übersehen, nicht mitgenommen.
  DAS ERGEBNIS, IN EINEM SATZ: DIE MESSUNG GEHÖRT NICHT IN SCHEIBE 4, SONDERN FOLGT NACH
  IHREM LIVE-NACHWEIS.
  DER GRUND IST DERSELBE, DEN DER PUNKT SELBST SCHON TRÄGT, nur eine Stufe weiter gedacht:
  Die Messung verlangt einen ECHTEN Aufruf gegen events:ingest mit einem GÜLTIGEN
  Zugangsdatum und einer FREMDEN Kundennummer. Ein gültiges Zugangsdatum auf dem
  Transportpfad gibt es VOR dem Transport nicht — die Scheibe baut den Lesepfad, der es
  überhaupt erst beschafft. Die Messung IN die Scheibe zu legen hiesse, sie an eine
  Voraussetzung zu hängen, die dieselbe Scheibe erst herstellt.
  NEUER TRIGGER: DER BESTÄTIGTE LIVE-NACHWEIS DER SCHEIBE 4. Er ist enger als der alte und
  ausdrücklich nicht "irgendwann nach dem Transport": Erst wenn der Durchlauf steht, ist der
  Aufruf mit gültigem Zugangsdatum überhaupt herstellbar — vorher wäre die Messung nicht
  fällig, sondern unmöglich.
  DER AUFZÄHLUNGS-KANDIDAT BLEIBT UNBERÜHRT UND UNGELESEN. Ob die Schnittstelle die
  erreichbaren Konten aufzählen kann, ist weiterhin UNGELESEN UND UNGEMESSEN; der Zuschnitt
  der Scheibe 4 hat ihn nicht aufgegriffen, und dieser Vermerk greift ihn ebenfalls nicht auf.
  WAS DIESER VERMERK NICHT TUT: Er beantwortet die Frage des Punktes NICHT und verkleinert
  sie nicht. Der Punkt bleibt in vollem Umfang offen — er hat nur einen anderen Zeitpunkt
  bekommen.
  PROVENIENZ: ARCHITEKTEN-FESTLEGUNG 2026-09-01, im Zuschnitt der Scheibe 4 getroffen. KEINE
  Messung. Dass der alte Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
  Existenz des Zuschnitts.

  ZWEITER VERMERK 2026-09-01 — DER NEUE TRIGGER IST EINGETRETEN. DER PUNKT IST FÄLLIG, NICHT
  BEANTWORTET. Der Text darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt
  DANEBEN.
  ES SIND ZWEI VERMERKE VOM SELBEN TAG, UND SIE SAGEN VERSCHIEDENES — ohne diesen Satz liest
  jemand sie als eine Fortschreibung: Der ERSTE hat den Trigger von "der Zuschnitt der
  Scheibe 4" auf "der BESTÄTIGTE LIVE-NACHWEIS der Scheibe 4" ENGER gesetzt. Der ZWEITE hält
  fest, dass GENAU DIESER ENGERE Trigger inzwischen eingetreten ist.
  DER BEFUND: Der Live-Nachweis der Scheibe 4 ist gefahren und bestätigt (GEMESSEN 2026-09-01,
  OWNER, an der ausgelieferten Anwendung; protokolliert in docs/aktiver-stand.md, VERMERK 10).
  Ein Ereignis von einer gehosteten Kundenseite erreicht Google.
  WAS SICH DAMIT ÄNDERT, UND ES IST NUR DIES: DAS INSTRUMENT EXISTIERT JETZT. Der erste Vermerk
  begründete den Aufschub damit, ein gültiges Zugangsdatum auf dem Transportpfad gebe es VOR
  dem Transport nicht — die Messung wäre "nicht bloss unterlassen, sondern unmöglich". SIE IST
  AB JETZT MÖGLICH.
  DAS INSTRUMENT, BENANNT UND NICHT GEFAHREN: ein HANDAUFRUF ausserhalb des Produkts, mit einem
  gültigen Zugangsdatum und einer FREMDEN Kundennummer in
  `destinations[].operatingAccount.accountId` — DIESELBE GESTALT WIE MESSUNG D
  (docs/ziel-befunde.md, Google-Abschnitt, Teil (ca)/(a)): `POST`, Kopfzeilen `Authorization:
  Bearer <Token>` und `Content-Type: application/json`, OHNE `x-goog-user-project`, OHNE
  `validateOnly`, ohne Query-String, sonst zeichengleich zum angenommenen Aufruf 4.
  WARUM EIN HANDAUFRUF UND NICHT DER ADAPTER: Der Adapter liest den Antwortrumpf nicht und soll
  es nicht (TRANSIT-ONLY). Über ihn wäre nur der Statuscode sichtbar — und der trennt die
  gemessenen Fehlerklassen nicht. Es ist derselbe Grund, aus dem Messung D drei ihrer vier
  Aufrufe von Hand gefahren hat.
  WAS DIESER VERMERK NICHT TUT: Er beantwortet die Frage NICHT, verkleinert sie nicht und
  vermutet nichts über das Anbieter-Verhalten. DER PUNKT BLEIBT IN VOLLEM UMFANG OFFEN — er ist
  nur von "vertagt" auf "fällig" gewechselt.
  DER AUFZÄHLUNGS-KANDIDAT BLEIBT UNBERÜHRT UND UNGELESEN, wie schon im ersten Vermerk.
  EIN ZUSATZ AUS DEM LIVE-NACHWEIS, DER DIE FRAGE EINGRENZT UND SIE NICHT BEANTWORTET: Für die
  EIGENE Kundennummer ist belegt, dass das Zugangsdatum aus dem in Phase 11.8 gebauten Fluss
  trägt — der Adapter-Aufruf aus dem Live-Test endete mit HTTP 400, also WEDER 401 NOCH 403,
  und kam damit an der Authentifizierung vorbei (ABLEITUNG aus dem Statuscode, KEINE eigene
  Messung; s. VERMERK 10, Abschnitt (c)). ÜBER EINE FREMDE KUNDENNUMMER SAGT DAS NICHTS: Dort
  wäre gerade eine 403 der zu erwartende Ausgang, und ob sie kommt, ist der Gegenstand dieses
  Punktes.
  PROVENIENZ: Der Live-Nachweis GEMESSEN 2026-09-01 (OWNER). Dass der Trigger damit eingetreten
  ist, ist eine FOLGE aus seinem Wortlaut. Die Gestalt des Instruments ist GELESEN an Teil (ca)
  derselben Datei, aus der auch Messung D stammt. KEINE Messung an einer Google-Schnittstelle
  in dieser Runde.
  VERMERK 2026-09-25 (Sichtung beim Phasenende 11.7): Der Trigger ist seit dem 2026-09-01
  EINGETRETEN, die Frage ist UNBEANTWORTET — die Phase 11.7 hat den benannten Handaufruf
  nicht gefahren. Der Posten bleibt; der Stub in CLAUDE.md sagt seither "EINGETRETEN".
- DIE RÜCKMELDUNG EINER BEDINGTEN SCHREIBUNG ÜBER PostgREST IST UNGEMESSEN (Trigger: der
  Zuschnitt der Scheibe 1b-2b): DREI FRAGEN SIND OFFEN, und sie stehen im VOLLTEXT in
  docs/plattform-befunde.md, Abschnitt "Supabase", LAUF 3, Teil (ar) — hier NUR der Zeiger
  und das, was er tragen muss, um ohne den Volltext brauchbar zu sein. Zweimal geschrieben
  liefe es auseinander.
  **GESCHLOSSEN AM 2026-09-04. DIE MESSUNG IST GEFAHREN, ALLE DREI FRAGEN SIND
  BEANTWORTET.**
  Der gesamte Text unterhalb dieses Blocks bleibt WÖRTLICH stehen und wird NICHT
  gekürzt: er trägt die Fragestellung, die Reichweite des Nicht-Treffers und die
  Abgrenzung SQL gegen HTTP, und mehrere seiner Grenzen gelten weiter. **Geschlossen ist
  der PUNKT, nicht sein Befund.** Der Satz "DREI FRAGEN SIND OFFEN" oben ist damit ein
  ZEITDOKUMENT und beschreibt den 2026-09-04 VOR dem Lauf.
  WAS IHN SCHLIESST: **GEMESSEN 2026-09-04 (OWNER), ACHT Aufrufe gegen den echten
  Endpunkt**, mit Sichtbarkeits-Beleg vor der ersten Schreibung und unabhängiger
  Gegenlesung im SQL-Editor danach. Instrument und Protokoll:
  `supabase/checks/bedingte-schreibung-probe.sql`, Feld `VERIFIZIERT` — dort steht der
  Bestand je Messung, und er wird hier NICHT verdoppelt.
  DIE DREI ANTWORTEN, je in einem Satz:
  · **(a) DER NULL-TREFFER IST ERKENNBAR — AUF DREI WEGEN.** Die Kopfzeile
    `Content-Range` schon im VORGABEFALL (`*/*` gegen `0-0/*`, ohne jeden Prefer-Kopf) ·
    die Länge der Menge unter `return=representation` (`[]` gegen eine Liste mit einem
    Objekt) · und `406`/`PGRST116` unter Singular-Anforderung.
  · **(b) ENTSCHIEDEN ZUGUNSTEN DER CLIENT-DOKU: `count` ZÄHLT DIE BETROFFENEN ZEILEN,
    NICHT DIE TABELLE** — `*/0` beim Null-Treffer gegen `0-0/1` beim Ein-Treffer. **Der
    gefährlichste Ausgang, dieselbe Zahl in beiden Antworten, ist AUSGESCHLOSSEN.** Der
    Widerspruch der zwei anbietereigenen Quellen (docs/plattform-befunde.md, LAUF 3,
    Teil (ak)) ist damit **FÜR DEN PATCH** aufgelöst.
    **WAS DAS ÜBER DIE ZWEI QUELLEN SAGT, UND WAS NICHT:** Die Client-Doku trifft zu. Die
    Protokoll-Doku hat nie das Gegenteil behauptet — sie hat **geschwiegen**. Ein
    Schweigen wird durch eine Messung nicht widerlegt, sondern gefüllt.
  · **(c) DER MECHANISMUS TRÄGT AUCH AUF EINEM PATCH.** Die Vorbedingung ist erfüllt: Der
    Ein-Treffer liefert ein EINZELNES Objekt und keine Liste — die `406` ist damit
    aussagekräftig und nicht der Beleg eines Weges, den es nicht gibt.
  DIE GRENZEN GEHÖREN IN DIESEN BLOCK, sonst wird er weiter gelesen, als er trägt:
  · **GEMESSEN IST DIE LAUFENDE INSTANZ, NICHT DIE FASSUNG 16.** Der Lauf sagt, was
    DIESE Instanz an DIESEM Tag tut; über eine andere Fassung sagt er nichts
    (docs/plattform-befunde.md, LAUF 3, Grenze 1). Welche Fassung antwortete, ist nicht
    erhoben.
  · **NICHT GEMESSEN IST DIE VARIANTE OHNE `return=representation`** unter
    Singular-Anforderung — sie entspricht einem `.update(...).single()` ohne `.select()`.
    Die Probe sagt das selbst unter M-3, "GRENZE DIESER MESSUNG".
  · **NICHT GEMESSEN IST DIE NEBENLÄUFIGKEIT.** Zwei gleichzeitige bedingte Schreibungen
    sind nicht gefahren worden. **"ATOMAR HEISST NICHT SICHER"** (LAUF 3, Grenze 3)
    bleibt unberührt und ist von diesem Lauf **weder bestätigt noch widerlegt**. Wer
    diesen Block als "die Nebenläufigkeit ist geklärt" liest, liest ihn falsch.
  · **KEINE EMPFEHLUNG, WELCHER DER DREI WEGE DER RIEGEL WIRD.** Das entscheidet der
    Zuschnitt der Scheibe 1b-2b, nicht diese Messung.
  EIN BEFUND AM INSTRUMENT, DER NICHT ZU DEN DREI FRAGEN GEHÖRT UND TROTZDEM HIERHER:
  **M-1 IST IN KEINEM DER DREI VORGESEHENEN AUSGÄNGE EINGETRETEN.** Die Probe hatte die
  Unterscheidung am STATUSCODE gesucht; sie steht aber in einer KOPFZEILE. Wer die
  Ausgangs-Liste später abgleicht und nur auf den Status sieht, landet auf "der
  Vorgabefall unterscheidet die zwei Lagen nicht" — dem **GEGENTEIL** des Befundes. Der
  Volltext steht im `VERIFIZIERT`-Feld der Probe unter M-1.
  · (a) Was meldet ein `update` mit Zustandsfilter zurück, das NULL Zeilen trifft — ein
    Fehler, eine leere Menge, oder etwas Drittes?
  · (b) Liefert `count` bei einer SCHREIBUNG eine verlässliche Zahl?
  · (c) Entsteht `PGRST116`/406 auch bei einem `PATCH` mit Singular-Anforderung und null
    Treffern?
  WARUM DIESER PUNKT EINEN EIGENEN ORT BRAUCHT UND NICHT IM LAUF 3 BLEIBEN KONNTE: Ein Lauf
  in docs/plattform-befunde.md wird zwar nicht archiviert, aber er wird auch NICHT AUF EINEN
  TRIGGER HIN GELESEN — jene Datei lädt, wer an Schema, Policies, Migrationen, dem
  Geheimnis-Speicher, an Backup/Restore oder am Deploy-Weg arbeitet. Wer nach offenen Posten
  sucht, kommt dort nie vorbei. Ohne diesen Eintrag verschwindet der Posten, ohne dass
  irgendetwas rot wird.
  WAS DER ZEIGER TRAGEN MUSS — DREI ANGABEN, ohne die er in die Irre führt:
  · DER NICHT-TREFFER ZU (a) HAT REICHWEITE UND IST KEINE BEHAUPTUNG. Gelesen sind SECHS
    Seiten im Volltext PLUS das Abschnitts-Verzeichnis der Protokoll-Doku, und dieses
    Verzeichnis trägt KEINEN Abschnitt "Concurrency", "Locking", "Affected Rows" oder
    "Conditional Requests". Es ist also nicht bloss nicht gefunden worden — es ist
    ausgeschlossen, dass die Antwort auf einer nicht geöffneten Seite desselben Abschnitts
    steht.
  · ZU (b) SAGEN ZWEI ANBIETEREIGENE QUELLEN VERSCHIEDENES, UND DAS IST DER GANZE POSTEN:
    Die Client-Doku sagt ausdrücklich "count updated rows" (ebenso inserted, upserted,
    deleted); die Protokoll-Doku kennt `Prefer: count` NUR für Leseantworten und schweigt zu
    PATCH, POST und DELETE. Der Widerspruch ist in LAUF 3, Teil (ak) festgehalten und
    NICHT aufgelöst. WER DIE CLIENT-DOKU ALS ANTWORT NIMMT, HAT EINE DOKU-AUSSAGE FÜR EINE
    MESSUNG GEHALTEN.
  · DIE DREI FRAGEN ZIELEN AUF EINEN HTTP-ENDPUNKT, NICHT AUF SQL. Das README von
    supabase/checks/ sagt es wörtlich: "Wer eine PostgREST-Frage im SQL-Editor misst,
    beantwortet eine andere." Dasselbe README erlaubt einer Probe ausdrücklich, einen Teil
    gegen den REST-Endpunkt zu fahren, "wenn die gemessene Frage eine PostgREST-Frage ist" —
    dann sagt sie das in ihrem Kopf unter `WANN`, mit Grund.
  DER PRÄZEDENZFALL FÜR DIE BAUFORM EINER SOLCHEN PROBE IST
  supabase/checks/upsert-arbiter-probe.sql — GENANNT ALS PRÄZEDENZFALL UND NICHT ALS AUSWAHL.
  Das README führt ihn selbst unter einer PostgREST-Frage. KEINE EMPFEHLUNG: weder ist
  entschieden, dass die Messung diese Gestalt bekommt, noch dass sie überhaupt als Datei in
  supabase/checks/ entsteht, noch wer sie fährt.
  DIE GRENZE DIESES PUNKTES: Er sagt NICHT, dass die drei Fragen vor dem Zuschnitt der
  Scheibe 1b-2b beantwortet sein MÜSSEN. Er sagt, dass sie beim Zuschnitt auf dem Tisch
  liegen — welche davon der Zuschnitt braucht, entscheidet der Zuschnitt.
  PROVENIENZ: GELESEN 2026-09-04 (CC), LAUF 3 in docs/plattform-befunde.md, elf Adressen mit
  Titel und gelesenem Anteil unter Teil (ah). Dass die drei Fragen offen sind, ist ein BEFUND
  ÜBER DIE GELESENE DOKU und KEINE Messung — es ist an keiner Schnittstelle etwas erhoben
  worden. Die README-Zitate sind GELESEN am Repo (CC, 2026-09-04).

- DER OAUTH-WEG RUFT ensureTrackingKey NICHT — ANDERS ALS setCapiToken — VERSCHOBEN INS
  BACKLOG AM 2026-09-25 (Sichtung beim Phasenende 11.7, ARCHITEKTEN-ENTSCHEIDUNG). Grund:
  Ohne Veröffentlichung entsteht kein Verkehr, und `publishProject` stellt den Schlüssel
  sicher — ein Zustand, der nichts erzeugt, macht nichts still falsch (Vermerk vom
  2026-09-01 am gestrichenen Posten "ZWEI EINTRÄGE AUS DEM VORRAT DER PHASE 11.8 …"); die
  einzige benannte Kippbedingung, die Phase 11.4, ist verworfen. Der Trigger ist seit dem
  2026-09-08 eingetreten. Der Volltext steht WÖRTLICH in docs/claude-history/backlog-polish.md,
  Abschnitt "Aus Phase 11.7 gehoben (2026-09-25) …", unter diesem Titel — dort zusammen mit
  jenem Vermerk und seinem Nachtrag.

- DIE LINKEDIN-VERSION DES ADAPTERS WIRD AM 15.01.2027 ABGESCHALTET — DANN SCHEITERT
  DER FORWARD STILL — GESTRICHEN AM 2026-09-23, DER GEGENSTAND IST ERLEDIGT. Der Punkt
  hielt fest, dass der Adapter die Version 202601 sendete, die der Anbieter am 15.01.2027
  abschaltet, und dass der Forward danach bei jedem Ereignis still gescheitert wäre.
  BELEG DER ERLEDIGUNG:
  · BAU-COMMIT `5d5602e` (Phase 11.7, Scheibe S2): `LINKEDIN_VERSION` in
    `src/lib/capi/linkedin-forward.ts` sendet `202609`, laut Migrations-Tabelle des
    Anbieters aktiv bis 15.09.2027 (docs/ziel-befunde/linkedin.md, Teil (au)); die
    Zielversion ist eine OWNER-ENTSCHEIDUNG vom 2026-09-23. Den neuen Termin trägt der
    Wächter T1 in `src/lib/capi/version-deadlines.test.ts`, rot 60 Tage vorher — deshalb
    entsteht KEIN neuer Posten.
  · LIVE-ANKUNFT (OWNER-ANGABE 2026-09-23): "Data last received" im Campaign Manager sprang
    nach einem Klick auf der Live-Seite von September 21, 2026 12:23 PM auf September 23,
    2026 10:25 AM; Minutenauflösung (docs/ziel-befunde/linkedin.md, Teil (bc)).
  · DIE GEKOPPELTE KOPFZEILEN-AUFLAGE IST MITGEPRÜFT: `X-Restli-Protocol-Version` wird
    weiterhin nicht gesendet, und die Ankunft unter 202609 kam ohne sie zustande (ebenda,
    Teil (bc)). Ob der Anbieter sie durchsetzt, bleibt offen (ebenda, Teile (ai), (ba)).
  · Der Vermerk steht als VERMERK P11.7-12 der Phase 11.7. Der gestrichene Volltext steht
    unter Commit `5d5602e`.
- OB DAS LIVE VERWENDETE LINKEDIN-ZUGANGSDATUM ABLÄUFT, IST ERST AB MITTE OKTOBER 2026
  ENTSCHEIDBAR (Trigger: Mitte Oktober 2026 — abzulesen an der Direct-API-Seite im
  Campaign Manager, Anzeigen "Status" und "Data last received"):
  ANGELEGT AM 2026-09-11. Der Trigger stand bis dahin allein in docs/ziel-befunde.md,
  Abschnitt "LinkedIn (Conversions API)", Block "WAS AUSDRÜCKLICH OFFEN BLEIBT (2026-08-20)",
  Punkt "OB DAS LIVE VERWENDETE ZUGANGSDATUM ABLÄUFT" — in einer Datei, die nicht geladen wird
  und keinen Stub in CLAUDE.md hat. Der Befund bleibt dort; hierher wandert der Trigger.
  **WAS BEOBACHTET WIRD:** ob Ereignisse des Ziels `linkedin` beim Anbieter weiter ankommen.
  **WO ES ABGELESEN WIRD:** in der Anbieter-Oberfläche — Campaign Manager, Direct-API-Seite,
  "Status" und der Empfangs-Zeitstempel "Data last received". Nicht im Code, nicht im Log.
  **WAS JEDER AUSGANG BEDEUTET:**
  · Der Zeitstempel läuft über Mitte Oktober 2026 hinaus weiter, und der Status bleibt: Die
    Doku-Aussage "läuft nicht ab" ist für DIESES Zugangsdatum durch eine Beobachtung gestützt —
    für diesen Tag, nicht für jeden künftigen.
  · Der Zeitstempel bleibt stehen, oder der Status kippt: Das Zugangsdatum trägt nicht mehr.
    **Die Beobachtung trennt dabei NICHT** zwischen einem Ablauf nach Zeit und dem zweiten,
    nicht zeitbasierten Ende — das anmeldende Mitglied verlässt die Organisation (ebenda, Teil
    (al), mit einer am Dokument nicht entscheidbaren Reichweite).
  · Eine Ablesung VOR Mitte Oktober 2026 sagt über einen Ablauf nach Zeit nichts.
  **SOLANGE NICHTS KIPPT, IST KEINE HANDLUNG NÖTIG.**
  **DIE ABGRENZUNG — ZWEI NACHBARN, DIE BEIM SELBEN ZIEL BEISSEN:** Der Eintrag "EIN ZIEL KANN
  KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN — DREI URSACHEN, DIE GETRENNT BLEIBEN" führt unter
  Ursache (4) die KLASSE — ein Zugang, der ohne Zutun des Kunden bricht; hier steht der TERMIN
  für den einen Fall. "DIE LINKEDIN-VERSION DES ADAPTERS WIRD AM 15.01.2027 ABGESCHALTET — DANN
  SCHEITERT DER FORWARD STILL" ist die andere Achse: dort läuft die VERSION ab, hier das
  ZUGANGSDATUM.
  PROVENIENZ: "läuft nicht ab" ist GELESEN 2026-08-20 an
  learn.microsoft.com/en-us/linkedin/marketing/conversions/getting-access-conversions
  (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", Teil (v)) und erneut GELESEN
  2026-09-11 an S1 und S2: "The generated access tokens don't expire." (ebenda, Teil (al)). Dass
  das live verwendete Zugangsdatum ein ANDERES Artefakt ist als das des OAuth-Generators, ist
  BEOBACHTET 2026-08-20 (Owner, Token-Inspector im Entwicklerportal: der Generator-Wert mit
  "Expires: in about 2 months", der Campaign-Manager-Wert als ungültig zurückgewiesen; ebenda,
  Teil (v)). Der Zeitpunkt "rund sechzig Tage nach dem 2026-08-19" steht so im genannten Block;
  worauf die sechzig Tage ruhen, sagt er nicht — sie decken sich mit der Frist des ANDEREN
  Artefakts und sind keine Anbieter-Aussage über den Campaign-Manager-Weg. KEINE Messung.
  KEINE EMPFEHLUNG.
- DIE VERLUSTRATEN-AGGREGATION IST ZIEL-BLIND — "GEMESSEN ALLEIN AM META-PIXEL" IST EINE
  BESCHRIFTUNG, KEIN FILTER (Trigger: das erste weitere Ziel, das ein Browser-Tag mit
  Bestätigungs-Kanal ausliefert): GEMESSEN am Code (CC, 2026-09-11, am 2026-09-12
  nachgeprüft), read-only.
  DER BEFUND, DREI TEILE:
  · DIE AGGREGATION KENNT KEIN ZIEL. get_adblock_loss
    (supabase/migrations/0015_adblock_loss.sql) trägt in ihrem ganzen Text kein Ziel-Wort,
    und die Tabelle events hat KEINE Ziel-Spalte: 0011 legt project_id, event_type,
    event_id, source und created_at an, 0017 ergänzt variant — mehr ist nicht dazugekommen.
    Der Zähler fragt AUSSCHLIESSLICH, ob zu derselben event_id eine Zeile mit
    source='browser' desselben Projekts existiert. WELCHER Anbieter sie ausgelöst hat, steht
    nirgends und ist aus der Zeile nicht rekonstruierbar. Dasselbe gilt für die
    Test-Portierung computeAdblockLoss (src/lib/analytics/adblock-loss.ts), die die
    Mengenlogik spiegelt.
  · DIE ZUSCHREIBUNG AUF META STEHT IM UI UND IST TEXT. Die Zeile "Gemessen allein am
    {TARGET_CARDS.meta.name}-Pixel." in src/components/MeasureView.tsx ist eine
    BESCHRIFTUNG; der Kommentar unmittelbar darüber sagt es selbst — dort steht, die
    Kachel behebe den Defekt nicht, "hier wurde nur der Text wahr". Sie ist damit keine
    Filterbedingung, sondern eine Aussage ÜBER eine Bedingung, die anderswo entsteht.
  · HEUTE TRIFFT SIE ZU — ABER AUS EINEM ANDEREN GRUND, ALS SIE BEHAUPTET. Sie trifft zu,
    weil NUR meta ein Browser-Tag ausliefert, das eine Bestätigung senden kann:
    buildPixelConfirmStatement existiert ausschliesslich in src/lib/tracking/meta.ts und
    wird nur aus buildMetaRuntime gesplicet, gebunden an die gesetzte Meta-Kennung und im
    Mehr-Ziel-Pfad zusätzlich an die Meta-Einwilligung. Die Browser-Tags der übrigen Ziele
    kommen im Produktivcode unter src/ NICHT vor (Achse: pintrk, ttq., _linkedin_partner,
    lintrk, gtag( — ohne Testdateien, null Treffer). pinterest, tiktok, linkedin und google
    sind reine Server-Adapter.
  WAS STILL KAPUTTGEHT: Bekommt ein zweites Ziel einen Bestätigungs-Kanal, fliessen seine
  browser-Zeilen OHNE JEDE ÄNDERUNG AM SQL in denselben Zähler. Die Zahl wird eine Mischung
  zweier Anbieter, die Beschriftung bleibt WÖRTLICH stehen und behauptet weiter einen
  einzigen — und NICHTS WIRD ROT: kein Test, kein Build, keine Logzeile, keine Migration.
  Die Kachel trägt die Marquee-Metrik des Produkts; an der Zahl ist die Vermischung nicht zu
  sehen, und sie ist hinterher nicht zu entmischen, weil die Ablage die Herkunft nie
  aufgenommen hat.
  WARUM DER TRIGGER SO UND NICHT "beim nächsten Ziel" LAUTET: Ein Ziel OHNE Browser-Tag
  ändert an dieser Kachel nichts — vier solche Ziele sind bereits gebaut und haben sie nie
  berührt. Scharf wird der Posten erst mit einem Ziel, das den BESTÄTIGUNGS-KANAL mitbringt.
  DIE ABGRENZUNG ZU "DIE ADBLOCKER-KACHEL ZÄHLT EINE ABGELEHNTE EINWILLIGUNG ALS VERLUST"
  (dieselbe Datei): Jener Posten beschreibt EIN Ziel, dessen Bestätigung ausbleibt — der
  Nenner wächst ohne den Zähler. DIESER beschreibt ZWEI Ziele, deren Bestätigungen in
  DENSELBEN Zähler fallen. Beide zeigen auf dieselbe Abwesenheit, nämlich die fehlende
  Ziel-Dimension auf den Ereignissen; sie sind trotzdem nicht derselbe Posten, und ihre
  Trigger sind verschieden.
  KEINE EMPFEHLUNG, ob ein Ziel-Filter, eine Ziel-Spalte oder ein anderer Weg das auflöst.
  Dieser Eintrag nennt den BEFUND, nicht den Bau.
  PROVENIENZ: Die drei Teile des Befunds sind GEMESSEN am Code (CC, 2026-09-11, am
  2026-09-12 nachgeprüft) — die Migrationen 0011, 0015 und 0017, src/lib/tracking/meta.ts,
  src/components/MeasureView.tsx und eine formale Suche über src/ ohne Testdateien mit der
  oben benannten Achse. Dass beim Hinzukommen eines zweiten Kanals NICHTS rot wird, ist eine
  ABLEITUNG aus dem Fehlen jedes Gates, das diese Zuordnung prüft — KEINE Messung an einem
  solchen Gate, denn es gibt keines.

<!-- Aus dem Vorrat der Phase 11.2 gehoben, 2026-09-08 -->

- VIERZEHN PUNKTE AUS DEM VORRAT DER PHASE 11.2 (2026-09-08) — DIESE ZEILE IST KEIN
  EIGENER PUNKT, SONDERN DIE KLAMMER UM DIE VIERZEHN DARUNTER.
  **WOHER SIE KOMMEN:** aus docs/aktiver-stand-vorrat.md, beim Phasenende der Phase 11.2.
  Der Vorrat führte SECHSUNDSECHZIG Einträge; die übrigen liegen in
  docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.2 gehoben (2026-09-08)",
  zwei sind gestrichen.
  **DAS KRITERIUM:** benennbarer Trigger **UND** "geht sonst STILL kaputt". Der Trigger
  allein trennt nicht — fast jeder Vorrats-Eintrag trägt einen; nach ihm allein wären es
  FÜNFUNDFÜNFZIG von 66 gewesen statt VIERZEHN (GEMESSEN, CC, 2026-09-08). Diese Datei
  sagt in ihrem eigenen Kopf, sie sei "Kein Backlog-Ersatz".
  **DIE NUMMERN IN KLAMMERN SIND DIE URSPRUNGS-NUMMERN DES VORRATS** und werden NICHT neu
  vergeben; die Lücken sind die Einträge, die ins Backlog gegangen sind.
  **DER TEXT JEDES EINTRAGS IST ZEICHENGLEICH ÜBERNOMMEN** — kein Wort umformuliert. Was
  hinzugekommen ist, ist die Titel- und Trigger-Zeile darüber. AUSGENOMMEN ist ein seither
  GESTRICHENER Eintrag ("DIE PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST TOT",
  2026-09-23); sein Volltext steht unter dem Commit, den sein Streich-Vermerk nennt.

- DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH AUF NICHTS GELESENES (Trigger: die erste Messung des Auto-Taggings — der Eintrag sagt es selbst, wörtlich: "DIE ERSTE MESSUNG NIMMT SIE MIT"):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 4, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

4. **DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH AUF NICHTS GELESENES.**
   GEBAUT WIRD schreibungssensitiv und exakt kleingeschrieben: nur gclid, gbraid und
   wbraid treffen; GCLID oder Gclid treffen nicht.
   DER GRUND FÜR DIE ENGERE WAHL: Ein exakter Vergleich kann nur VERFEHLEN, und das
   ist als fehlende Conversion sichtbar. Ein schreibungsunempfindlicher Vergleich
   könnte einen FREMDEN, zufällig gleichnamigen Parameter aufgreifen — und ein
   falscher Wert als Kennung wird vom Anbieter NICHT als Fehler gemeldet. Von zwei
   unbelegten Möglichkeiten ist die gewählt, deren Fehlschlag sichtbar ist.
   DIE LÜCKE GEHÖRT DAZU UND IST DER EIGENTLICHE INHALT DIESES EINTRAGS: Das stützt
   sich auf NICHTS GELESENES. GEMESSEN am Dateitext (2026-08-25, Achse: docs/ziel-befunde.md
   vollständig, Begriff gclid): sechs Treffer, ALLE betreffen den Feldnamen in der
   API-Nutzlast (adIdentifiers.gclid), KEINER den Namen des Parameters, den Google an
   die Ziel-URL hängt. Das ist kein Versäumnis, sondern der Zuschnitt beider
   Crawl-Läufe: ihr Gegenstand war die EINLIEFERUNGS-Schnittstelle, nicht das
   Auto-Tagging. Es gibt zu dieser Frage WEDER einen Befund NOCH einen Nicht-Treffer
   mit benannter Reichweite.
   DIE ERSTE MESSUNG NIMMT SIE MIT. KEINE bindende Entscheidung — sie steht hier und
   nicht unter den Entscheidungen, weil sie auf keiner Grundlage ruht, die eine
   Bindung tragen könnte.

   **VERMERK 2026-09-02 — "DIE ERSTE MESSUNG NIMMT SIE MIT" IST NICHT EINGELÖST. DER EINTRAG
   SCHRUMPFT NICHT UND ENTFÄLLT NICHT; ALLE DREI NAMEN BLEIBEN UNGEPRÜFT.** Der Text darüber
   bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN.
   **ER ERSETZT DEN VERMERK VOM 2026-09-01 VOLLSTÄNDIG**, und zwar als SACHKORREKTUR: Jener
   sagte, der Eintrag schrumpfe "von drei ungeprüften Namen auf zwei", weil Schritt 2 des
   Live-Tests der Scheibe 4 einen Query-String benutzt habe — "den, den GOOGLE SELBST an die
   Ziel-URL gehängt hat, über eine echte Anzeige und nicht von Hand eingetippt". **DIE
   PRÄMISSE TRIFFT NICHT ZU.**
   **OWNER-ANGABE 2026-09-02:** Die Klick-Kennungen des Live-Tests waren **von Hand in die
   Browserzeile gesetzt** und stammen aus keinem Klick; im Einsatz waren **zwei** Werte
   (`EAIaIQobChMI` und `Tester-123`), und **welcher zu welchem Adapter-Aufruf gehört, ist nicht
   rekonstruierbar**. Volltext der Korrektur: VERMERK 10, Abschnitt (b), "SACHKORREKTUR
   2026-09-02 — DIE HERKUNFT DER KLICK-KENNUNG".
   **FÜR DIESEN EINTRAG IST DIE ZUORDNUNG GLEICHGÜLTIG:** Beide Werte sind von Hand gesetzt,
   also misst der Durchlauf in beiden Fällen die eigene Extraktion und nicht Googles
   Auto-Tagging.
   **WAS BISHER GALT UND ZWEIMAL AUSDRÜCKLICH FESTGEHALTEN WORDEN IST — UNVERÄNDERT:** VERMERK
   3 und VERMERK 4 führen diesen Eintrag je als UNBERÜHRT; Messung A und Messung B1 haben
   **keinen Query-String benutzt**, sondern eine Kopfzeile und einen Rumpf gesetzt.
   **DAS GILT JETZT AUCH FÜR SCHRITT 2 — auf der Achse dieses Eintrags.** Ein von Hand
   gesetzter Query-String misst **UNSERE EXTRAKTION**, nicht **GOOGLES AUTO-TAGGING**. Genau
   diese Achse führt der Eintrag als "WEDER einen Befund NOCH einen Nicht-Treffer mit benannter
   Reichweite", und dabei bleibt es.
   **WAS SCHRITT 2 TROTZDEM HERGIBT — UND ES IST EINE ABLEITUNG AUS ZWEI LOGZEILEN, KEINE
   ABLESUNG DER NUTZLAST:** Hätte `extractGoogleClickIds` keinen der drei
   schreibungssensitiven Namen getroffen, verwürfe `buildGoogleEvent` mit `no_click_id`, und
   die Zeile `[capi] Google forward skipped: no_click_id` stünde im Log — sie steht dort im
   Schritt 5 und in Schritt 2 **nicht**, und eine Fehlerzeile ebenfalls nicht.
   **MINDESTENS EINER DER DREI KLEINGESCHRIEBENEN NAMEN HAT ALSO GETROFFEN — den Wert, den der
   OWNER GETIPPT HAT.** Das ist eine Aussage über die Extraktion und über nichts sonst.
   **DIE GRENZE IST DER EIGENTLICHE INHALT DIESES VERMERKS: WELCHER der drei getroffen hat,
   ist NICHT GEMESSEN.** Das Log nennt keinen Namen — es nennt bei Erfolg gar nichts —, und die
   Nutzlast ist nicht abgelesen worden. **ÜBER DIE ZWEI ÜBRIGEN SAGT DER DURCHLAUF NICHTS.**
   **EIN ABSATZ DES ALTEN VERMERKS IST ERSATZLOS ENTFALLEN, und das gehört benannt:** Er
   erklärte, warum ein einzelner Durchlauf nur EINEN der drei Namen mitnehmen könne — "Ein
   Anzeigenklick hängt in aller Regel EINEN der drei an". **Der Satz setzte einen Anzeigenklick
   voraus, den es nicht gegeben hat**, und beschrieb damit ein Instrument, das nie im Einsatz
   war.
   **WAS OFFEN BLEIBT UND WARUM DER EINTRAG STEHEN BLEIBT:** Für **ALLE DREI** Namen stützt
   sich die Schreibung weiterhin auf **nichts Gelesenes und nichts Gemessenes**. Der im Eintrag
   benannte Fehlerweg gilt unverändert: Ein exakter Vergleich kann nur VERFEHLEN, und ein
   Verfehlen ist als fehlende Conversion sichtbar — aber eben nur, wenn jemand hinsieht.
   **DER SATZ "DIE ERSTE MESSUNG NIMMT SIE MIT" WARTET DAMIT WEITER**, und er wartet auf
   dasselbe wie am 2026-08-25: einen Durchlauf mit einem Query-String, den **GOOGLE** geschrieben
   hat. Der ist an die Sperre "AUF DEM KONTO EXISTIERT KEIN ECHTER ANZEIGENKLICK" gebunden, s.
   den Abschnitt "Gegenstand der Phase".
   PROVENIENZ, JE TEIL: Die Korrektur der Prämisse ist eine **OWNER-ANGABE 2026-09-02**, keine
   Messung. Die Ableitung aus den zwei Logzeilen bleibt eine **ABLEITUNG** (Live-Werte GEMESSEN
   2026-09-01, OWNER; die Ableitung CC, 2026-09-01), **KEINE Ablesung der gesendeten Nutzlast,
   KEINE Messung am Parameternamen selbst**. Dass VERMERK 3 und 4 den Eintrag als unberührt
   führen, ist GEMESSEN am Dateitext (CC, 2026-09-01).
   **DIE STREICHUNG DES EINTRAGS IST HIER NICHT ENTSCHIEDEN UND WIRD ES AUCH NICHT** — er
   ist nur kleiner geworden.

- DREI FELDER DER NUTZLAST SIND FRAGEN DER TRANSPORT-SCHEIBE, NICHT DIESER (Trigger: DREI Trigger, je Feld einer; der Eintrag entfällt ERST, wenn alle drei eingetreten UND abgearbeitet sind — ein einzelner eingetretener Trigger nimmt ihn NICHT heraus):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 5, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

5. **DREI FELDER DER NUTZLAST SIND FRAGEN DER TRANSPORT-SCHEIBE, NICHT DIESER.** Sie
   stehen hier, weil sie sonst zwischen die Scheiben fielen: Diese Scheibe baut sie
   nicht, und die Transport-Scheibe hätte keinen Anlass, nach ihnen zu suchen.
   · KEIN consent-OBJEKT IN DER ANFRAGE. Die Hülle kennt ein optionales consent, auf
     Anfrage- UND auf Ereignis-Ebene (GELESEN, docs/ziel-befunde.md, Teil (l)/D1).
     Wir bauen keines. Grund: Das Einwilligungs-URTEIL wird im Browser gefällt
     (buildConsentRuntime), und tracking/consent-wire.ts hält ausdrücklich fest "HIER
     STEHT KEIN ZWEITES URTEIL" — ein Google-eigenes Consent-Feld wäre ein DRITTES.
     OB es gefüllt werden muss, ist NICHT entschieden.
   · KEIN reference / destinationReferences. Bei genau EINEM Empfänger unnötig: "OHNE
     destinationReferences GEHT EIN EREIGNIS AN ALLE DESTINATIONS DER ANFRAGE — das
     ist die Vorgabe, kein Fehler" (GELESEN, Teil (k)/C3). Beim zweiten Empfänger wird
     es fällig und ist dann erzwungen eindeutig (Teil (v)/C3, DUPLICATE_DESTINATION_REFERENCE).
   · KEIN eventName. Für Google Ads optional, Pflicht nur für GA4 (GELESEN, Teil (w)/F1).
   GEMELDET 2026-08-25, NICHT GEBAUT. KEINE EMPFEHLUNG.
   DAS DATUM IST AM 2026-08-29 AUS DEM KOPF DES VORRATS HIERHER GEWANDERT, nicht neu
   erhoben: Dieser Eintrag war der EINZIGE der dreizehn ohne eigene Datumsangabe
   (GEMESSEN am Dateitext, CC, 2026-08-29), und mit dem Wegfall der Sammel-Datierung
   hätte er seine einzige verloren.

   **VERMERK 2026-09-01 — DER ADRESSAT DIESES EINTRAGS IST VORBEI. DER EINTRAG IST NICHT
   FALSCH; ER HAT NIEMANDEN MEHR, AN DEN ER SICH RICHTET.** Der Text darüber bleibt ZEICHEN
   FÜR ZEICHEN stehen; dieser Vermerk tritt DANEBEN.
   **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-01):** Die Transport-Scheibe ist gebaut
   (Bau-Commits `26caa38` und `84e9fca`, s. VERMERK 10) und hat **KEINES der drei Felder
   aufgegriffen**:
   · **`consent`** — die Anfrage trägt keines. Der Kommentarkopf von
     `IngestEventsRequest` (src/lib/capi/google-payload.ts) führt es unverändert unter den
     vier bewusst fehlenden Hüllen-Feldern und zeigt für die offene Frage auf **genau diesen
     Eintrag**.
   · **`reference` / `destinationReferences`** — `buildIngestEventsRequest` (ebenda) baut
     **GENAU EIN** `destinations`-Element und reicht keine Referenzen durch.
   · **`eventName`** — `GoogleEvent` (ebenda) führt das Feld nicht, und `buildGoogleEvent`
     setzt es nicht.
   **WARUM DAS EIN POSTEN IST UND KEINE ERLEDIGUNG:** Der Eintrag war ausdrücklich
   geschrieben worden, damit die drei Felder "nicht zwischen die Scheiben fallen" — "Diese
   Scheibe baut sie nicht, und die Transport-Scheibe hätte keinen Anlass, nach ihnen zu
   suchen." **DIE TRANSPORT-SCHEIBE IST VORBEI, UND SIE HAT TATSÄCHLICH NICHT NACH IHNEN
   GESUCHT.** Ein Eintrag, dessen Adressat abgelaufen ist, wird von niemandem mehr gelesen —
   er sieht bei jeder Durchsicht so aus, als warte er noch, und wartet auf nichts.
   **EIN EINTRAG OHNE ADRESSATEN BRAUCHT EINEN NEUEN TRIGGER ODER ENTFÄLLT. ER BEKOMMT
   TRIGGER — ENTSCHIEDEN (ARCHITEKT, 2026-09-01).**
   **DREI TRIGGER STATT EINEM — je Feld einer, weil die drei nichts miteinander zu tun haben
   ausser ihrer Herkunft aus derselben Hülle.** Jeder ist am Repo bzw. an einer gelesenen
   Stelle begründet, und die Begründung ist der Grund, aus dem der Trigger gilt:
   · **`consent`** → **Phase 11.5 (Einwilligungs-Dialog).** GRUND: Solange kein Dialog
     existiert, gibt es kein Einwilligungs-URTEIL, das man weiterreichen könnte; der Draht
     füllt heute ohne Betreiber-Hook alle Schlüssel auf `true` (`__psConsentAll`). Erst mit
     einem Dialog wird die Frage "muss das Feld gefüllt werden" überhaupt entscheidbar. Die
     Auflage, dass `"google"` im Dialog zu führen ist, steht bereits an Festlegung (3) des
     Zuschnitts der Scheibe 2.
   · **`reference` / `destinationReferences`** → **der ZWEITE Empfänger in EINER Anfrage.**
     GRUND: Der Eintrag nennt diesen Zeitpunkt selbst ("Beim zweiten Empfänger wird es fällig
     und ist dann erzwungen eindeutig"), und der Zustand ist am Code messbar — heute genau
     ein `destinations`-Element.
   · **`eventName`** → **GA4 als eigenes Ziel.** GRUND: Das Feld ist "für Google Ads
     optional, Pflicht nur für GA4" (GELESEN, Teil (w)/F1), und **GA4 ist im Produktivcode
     kein Ziel** (GEMESSEN am Repo, CC, 2026-09-01: kein Adapter, kein Eintrag in
     `TRACKING_TARGETS`, die Treffer auf "GA4" liegen ausschliesslich in Kommentaren und
     Doku-Zeigern). Die Roadmap-Zeile 11.2 führt GA4 als zweites Produkt neben Google Ads.
   **DER EINTRAG HAT AB JETZT DREI TRIGGER, UND ER ENTFÄLLT ERST, WENN ALLE DREI EINGETRETEN
   UND ABGEARBEITET SIND. EIN EINZELNER EINGETRETENER TRIGGER NIMMT IHN NICHT HERAUS.**
   Ohne diesen Satz liest die erste Runde, die einen der drei erreicht, den ganzen Eintrag als
   fällig und danach als erledigt — und die zwei übrigen Felder fielen still weg, also genau
   das, wogegen der Eintrag ursprünglich geschrieben wurde.
   **WAS DIESER VERMERK AUSDRÜCKLICH NICHT TUT:** Er streicht nichts und empfiehlt keines der
   drei Felder zum Bau. **KEINE EMPFEHLUNG.** Ein Trigger sagt, WANN die Frage fällig wird —
   nicht, wie sie zu beantworten ist.
   PROVENIENZ: Der Nicht-Bau der drei Felder GEMESSEN am Repo (CC, 2026-09-01). Dass der
   Adressat vorbei ist, ist eine FOLGE aus dem Wortlaut des Eintrags und dem Vollzug der
   Scheibe 4. **Die drei Trigger sind eine ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-01, getroffen
   auf drei ABLEITUNGEN, die je an einer gemessenen bzw. gelesenen Stelle begründet sind** —
   die Ableitungen stehen oben zeichengleich, wie sie vor der Entscheidung dastanden; geändert
   hat sich ihr RANG, nicht ihr Inhalt.

   **VERMERK 2026-09-24 — DER PUNKT `consent` IST ENTSCHIEDEN: WEGLASSEN (OWNER-ENTSCHEIDUNG
   2026-09-24).** Der Text darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vermerk tritt
   DANEBEN. Grund: Der Server kennt nur ein doppeldeutiges Einwilligungs-Bit — "google erlaubt"
   heisst zugestimmt ODER kein Dialog —, und die Felder zu setzen hiesse, eine Einwilligung zu
   behaupten, die er nicht kennt. Google stützt sich dann auf die Einstellungen im Konto des
   Betreibers. Volltext, Grenze (EWR: Nicht-Treffer in der Quelle) und Messung: VERMERK
   P11.7-23 der Phase 11.7 und der Zuschnitt von S7 in derselben Standdatei.
   **DER POSTEN ENTFÄLLT DAMIT NICHT — GEPRÜFT AM BESTAND (CC, 2026-09-24):** Die zwei übrigen
   Trigger sind nicht eingetreten — `reference` / `destinationReferences` (heute GENAU EIN
   `destinations`-Element in `buildIngestEventsRequest`) und `eventName` (GA4 ist kein Ziel;
   Roadmap-Zeile 11.9 offen). Der Satz "ER ENTFÄLLT ERST, WENN ALLE DREI EINGETRETEN UND
   ABGEARBEITET SIND" trägt weiter.
   **NACHGETRAGEN 2026-09-25 — DIE ROADMAP-ZEILE 11.9 STEHT SEITHER AUF `[-]` VERWORFEN**
   (docs/roadmap.md, Eintrag 11.9). Der `eventName`-Trigger tritt damit erst mit einer
   Wiederaufnahme der Phase 11.9 ein; ihre Kipp-Bedingungen stehen dort. Der Satz darüber
   bleibt als Befund vom 2026-09-24 stehen.

- eventSourceUrl IST AN DER FAN-OUT-STELLE VERFÜGBAR — GEMESSEN. DIE RESTLÜCKE IST EINE
  ANDERE — GESTRICHEN AM 2026-09-25, DER GEGENSTAND IST ERLEDIGT. Der Punkt
  (Vorrats-Eintrag 6 der Phase 11.2) hielt fest, dass `eventSourceUrl` jeden Adapter über
  `CapiRequestBody` erreicht, und führte die Restlücke am INHALT der URL.
  BELEG DER ERLEDIGUNG:
  · Seine eigene Frage war seit dem Vermerk vom 2026-09-07 in beide Richtungen beantwortet —
    "auf seiner eigenen Achse ist nichts mehr offen"; die Streichung war dort ausdrücklich
    einer eigenen Entscheidung vorbehalten. Sie ist ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25
    (Phasenende 11.7).
  · Was er als MASSSTAB behielt, ist seither überholt: "drei der vier Adapter lesen sie,
    LinkedIn nicht". GEMESSEN am Code (CC, 2026-09-25): Alle fünf Adapter lesen
    `eventSourceUrl` — linkedin seit S6a der Phase 11.7 für `li_fat_id` (`extractLiFatId`,
    Bau-Commit `09476b9`), google über `extractGoogleClickIds`; meta, tiktok und pinterest
    reichen sie, von fremden Klick-Kennungen bereinigt, weiter.
  · Die FOLGE seiner zweiten Hälfte — eine Conversion auf einer Folgeseite trägt keine
    Klick-Kennung — steht als eigener Posten: "CONVERSIONS AUF FOLGESEITEN TRAGEN BEI KEINEM
    ZIEL EINE KLICK-KENNUNG …" (Titel seit dem 2026-09-25).
  · Der gestrichene Volltext steht unter Commit `3e080b2`.

- EINE AUSWERTUNG DER ANBIETER-FEHLER DARF NICHT NUR DEN ERSTEN fieldViolation LESEN (Trigger: der erste Rückkanal für abgelehnte Ereignisse):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 8, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

8. **EINE AUSWERTUNG DER ANBIETER-FEHLER DARF NICHT NUR DEN ERSTEN fieldViolation
   LESEN — DER PARSER SAMMELT.** GEMESSEN 2026-08-28 (OWNER), Messung B1, Aufruf 7: zwei
   unbekannte Namen ergeben ZWEI fieldViolations in EINER Antwort
   (docs/ziel-befunde.md, Teil (bp)).
   WER NUR DEN ERSTEN LIEST, VERLIERT DIAGNOSTIK, DIE DER ANBIETER GELIEFERT HAT — und
   merkt es nicht, weil eine Antwort mit einem gelesenen Verstoss genauso aussieht wie
   eine mit einem einzigen.
   GRENZE: GEMESSEN ist das Sammeln auf der PARSE-Ebene. **Ob die SEMANTISCHE Ebene
   ebenfalls sammelt, ist NICHT gemessen** — Teil (bu) führt dazu eine ausdrücklich als
   ABLEITUNG gekennzeichnete Gegenannahme.
   TRIGGER: der erste Rückkanal für abgelehnte Ereignisse. Er berührt alle vier
   bestehenden Adapter — s. den Kandidaten
   "EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN" in
   docs/claude-history/backlog-polish.md und Vorrats-Eintrag 3 oben.

- KEIN NEBENLÄUFIGKEITS-RIEGEL BEI DER ERNEUERUNG — ZWEI GLEICHZEITIGE LÄUFE LÖSEN EINANDER AB (Trigger: eine gemessene Rotation bei irgendeinem Anbieter dieses Rahmens, ODER ein Auslöser (Scheibe 1b), der die Funktion nachweislich nebenläufig ruft — an BEIDEN Hälften NICHT eingetreten):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 9, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

9. **KEIN NEBENLÄUFIGKEITS-RIEGEL BEI DER ERNEUERUNG — ZWEI GLEICHZEITIGE LÄUFE LÖSEN
   DASSELBE ERNEUERUNGS-TOKEN DOPPELT EIN.** Die Scheibe 1a
   (s. den Abschnitt "Die Erneuerung des Zugangsdatums", Festlegung 3) baut
   ausdrücklich KEINEN Riegel — keine Sperre auf der Zeile, keine Vereinzelung, kein
   Warten.
   **WARUM DER SCHADEN KLEIN IST, und das ist der Grund für "melden statt bauen":**
   Google rotiert das Erneuerungs-Token NICHT (GEMESSEN 2026-08-28, OWNER, Messung C;
   docs/ziel-befunde.md, Google-Abschnitt, Teil (bv)). Der zweite Lauf bekommt ein
   gültiges Zugangsdatum wie der erste; was entsteht, ist ein ÜBERFLÜSSIGER NETZAUFRUF
   und eine zweite Schreibung derselben Zeile — kein verlorener Zugang.
   **DIE GRENZE, UND SIE HÄNGT AN EINER FREMDEN EIGENSCHAFT:** Diese Einschätzung ruht
   VOLLSTÄNDIG darauf, dass der Anbieter nicht rotiert. **Rotierte er, wäre derselbe
   Fall ein VERLORENER ZUGANG** — der zweite Lauf entwertete das Token des ersten, und
   der Schaden wäre nicht ein Netzaufruf, sondern eine Neu-Autorisierung durch den
   Kunden. Ein Anbieter kann das ändern, ohne dass hier etwas rot wird.
   **AUSDRÜCKLICH NICHT ÜBERTRAGBAR:** Für LinkedIn ist die Nicht-Rotation NICHT
   gemessen. Wer den Rahmen um einen zweiten Anbieter-Zweig erweitert, prüft sie dort
   eigens — s. Teil (bz).

   **ERGÄNZT AM 2026-08-29 — EINE ZWEITE ACHSE, DIE DIESER EINTRAG BIS DAHIN NICHT
   FÜHRTE. DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN.** Er beschreibt die ROTATIONS-Achse
   vollständig und richtig; was fehlte, ist eine davon UNABHÄNGIGE.

   **DIE ACHSE: AUSSTELLUNGS- UND SCHREIBREIHENFOLGE KÖNNEN DIVERGIEREN.** Lauf A stellt
   aus, Lauf B stellt aus, B schreibt, A schreibt — danach steht das **ÄLTERE** Token in
   der Zeile. Das ist kein Rotations-Problem: es tritt auch dann ein, wenn der Anbieter
   NICHT rotiert, weil es an unserer Schreibreihenfolge hängt und nicht an seiner
   Token-Vergabe.

   **WARUM DAS ZÄHLT, UND ERST DIESER SATZ MACHT ES ZU EINEM POSTEN:** Invalidierte der
   Anbieter das vorige ZUGANGSDATUM bei Ausstellung eines neuen, stünde in der Zeile ein
   **TOTES Token mit einem Ablaufzeitpunkt in der ZUKUNFT** — und der Vorlauf aus
   Festlegung 1 erneuerte es NICHT, weil die Uhr sagt, es reiche noch. Der Fehlzustand
   wäre damit genau der stumme, gegen den die Scheibe 1a überhaupt gebaut wird.

   **PROVENIENZ: UNGEMESSEN.** Ob der Anbieter ein vorheriges Zugangsdatum bei der
   Ausstellung eines neuen entwertet, ist an keiner Schnittstelle erhoben. Messung C
   belegt ZWEI ERFOLGREICHE EINLÖSUNGEN — sie belegt **NICHT** die gleichzeitige
   Gültigkeit zweier ausgestellter Zugangsdaten. **WER DAS AUS (bv) ABLEITET, LEITET
   MEHR AB, ALS DORT STEHT.**

   **DERSELBE SACHVERHALT STEHT IM KOMMENTARKOPF VON src/lib/oauth/token-refresh.ts**,
   dort als ACHSE 2 neben der Rotation. Zwei Orte, weil der eine beim Zuschneiden und
   der andere beim Bauen gelesen wird; die Angabe ist an beiden dieselbe und trägt an
   beiden ihre Provenienz.

   GEMELDET, NICHT GEBAUT. KEINE EMPFEHLUNG.
   TRIGGER: eine gemessene Rotation bei irgendeinem Anbieter dieses Rahmens, ODER ein
   Auslöser (Scheibe 1b), der die Funktion nachweislich nebenläufig ruft.

   **VERMERK 2026-09-03 — DER ZUSCHNITT DES SCHRITTS 1b-1 NIMMT DIESEN EINTRAG BEGRÜNDET
   NICHT AUF. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT
   DANEBEN.**
   **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
   der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
   OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
   **DER TRIGGER IST NICHT EINGETRETEN, UND ZWAR AN BEIDEN HÄLFTEN:** Eine Rotation ist
   bei keinem Anbieter dieses Rahmens gemessen worden, und **1b-1 baut KEINEN AUSLÖSER** —
   die Funktion wird also von nichts nachweislich nebenläufig gerufen. **MIT 1b-2 KANN ER
   EINTRETEN; DORT IST ER NEU ZU PRÜFEN.**
   **DER ZWEITE GRUND IST DER TRAGENDE, und er steht ausgeschrieben im Zuschnitt** (dort
   unter "Was ausdrücklich draussen bleibt, je mit seinem Grund"): **Die FORM des Riegels
   hängt am GRAD der Nebenläufigkeit, und den legt erst der TAKT fest — also 1b-2.** Ein
   Riegel im Prozessspeicher trägt für einen Sweep mit zwei Läufen und trägt nicht, wenn der
   Verkehr ihn auslöst. **Vor der Takt-Wahl gebaut, wäre er auf Verdacht gebaut.**
   **DIE ZWEITE ACHSE DIESES EINTRAGS IST DAVON UNBERÜHRT UND BLEIBT UNGEMESSEN** — ob der
   Anbieter ein vorheriges Zugangsdatum bei Ausstellung eines neuen entwertet. Der
   Zuschnitt führt sie ausdrücklich als geschützte Invariante: **der ACHSE-2-Kommentarkopf
   von src/lib/oauth/token-refresh.ts bleibt und wird nicht abgeschwächt.**
   **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT.** Sein Trigger steht wörtlich
   wie zuvor; was hinzukommt, ist die Auskunft, dass er in 1b-1 **geprüft und begründet
   vertagt** worden ist — und ein geprüft vertagter Posten sieht in einem Repo sonst genauso
   aus wie ein übersehener, nämlich wie nichts.
   PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO; die Zerlegung in zwei
   Schritte eine ARCHITEKTEN-FESTLEGUNG desselben Tages. Keine Messung.

   **ZWEITER VERMERK 2026-09-03 — DER EINTRAG BLEIBT VERTAGT, ABER SEINE ZWEITE ACHSE WIRD
   UNTER SCHEIBE 1b-2a SCHÄRFER. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN.**
   **WARUM DAS AN DEN EINTRAG GEHÖRT UND NICHT NUR IN DEN ZUSCHNITT:** Wer diesen Posten in
   einem Jahr aufschlägt, liest hier zuerst — und der Vermerk oben sagt "geprüft und
   begründet vertagt". Ohne diesen Zusatz liest er eine Vertagung, deren Gewicht sich
   seither geändert hat, als unveränderten Stand.
   **DIE ERSTE ACHSE (DIE ROTATION) IST UNBERÜHRT:** Google rotiert das Erneuerungs-Token
   nicht (GEMESSEN 2026-08-28, OWNER, Messung C), und daran ändert ein häufigerer Aufruf
   nichts.
   **DIE ZWEITE ACHSE (AUSSTELLUNGS- UND SCHREIBREIHENFOLGE) WIRD SCHÄRFER, UND ZWAR AUS
   EINEM BENENNBAREN GRUND:** Sie ist eine Aussage über NEBENLÄUFIGE Läufe, und
   Nebenläufigkeit war bisher nur durch zwei gleichzeitige Klicks eines Menschen
   herstellbar. **EIN VERKEHRSGETAKTETER AUSLÖSER ERNEUERT HÄUFIGER ALS EIN MENSCH, DER EINE
   ROUTE DRÜCKT** — und mehrere Beacons können denselben Moment treffen. **Was daran
   UNGEMESSEN ist, bleibt ungemessen:** ob der Anbieter ein vorheriges Zugangsdatum bei
   Ausstellung eines neuen entwertet. Nur die Wahrscheinlichkeit, dem Fall zu begegnen,
   steigt.
   **DER TRIGGER BLEIBT WÖRTLICH STEHEN, UND ER IST WEITERHIN NICHT EINGETRETEN:** 1b-2a
   baut **KEINEN** Riegel (Invariante (I-6) jenes Zuschnitts), und "ein Auslöser, der die
   Funktion nachweislich nebenläufig ruft" ist mit ihr noch nicht nachgewiesen, sondern
   nur wahrscheinlicher geworden. **DER RIEGEL IST SCHEIBE 1b-2b**, und ihr eigener Trigger
   steht dort.
   **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT. KEINE EMPFEHLUNG**, welche
   Form ein Riegel bekäme.
   PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Dass die zweite Achse unter
   häufigerer Erneuerung schärfer wird, ist eine **ABLEITUNG** aus dem gewählten Takt,
   **keine Messung** — es ist kein nebenläufiger Lauf beobachtet worden.

- `retry` HAT KEINE OBERGRENZE, UND SCHEIBE 1b MUSS EINE LIEFERN — GESTRICHEN AM 2026-09-25,
  DER GEGENSTAND IST ERLEDIGT. Der Punkt (Vorrats-Eintrag 10 der Phase 11.2) hielt fest,
  dass der Ausgang `retry` der Erneuerung keine Obergrenze hatte, und verlangte sie von der
  Scheibe 1b.
  BELEG DER ERLEDIGUNG:
  · GEBAUT mit Schritt 1b-1 der Phase 11.2, Bau-Commit `6bc01ed` (2026-09-03):
    `src/lib/oauth/refresh-run.ts` wiederholt `refreshAccessToken` bei `kind:"retry"`
    höchstens `REFRESH_MAX_ATTEMPTS` mal (GEMESSEN am Code, CC, 2026-09-25). Die
    Pflicht-Mutation "Obergrenze ausbauen" steht im Archiv der Phase 11.2
    (docs/claude-history/phase-11.2-google.md).
  · Der Posten war danach nicht gestrichen worden; gefunden hat es die Sichtung des
    Phasenendes 11.7. Die Streichung ist ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25.
  · Der gestrichene Volltext steht unter Commit `3e080b2`.

- ZWEI EINTRÄGE AUS DEM VORRAT DER PHASE 11.8, HIERHER ÜBERNOMMEN — GESTRICHEN AM 2026-09-25,
  DER GEGENSTAND IST ERLEDIGT. Der Punkt (Vorrats-Eintrag 13 der Phase 11.2) führte zwei
  Einträge aus dem Vorrat der Phase 11.8, weil deren Trigger eingetreten waren.
  BELEG DER ERLEDIGUNG, JE SPIEGELSTRICH:
  · "'google' FEHLT IN TRACKING_TARGETS" — ERLEDIGT: `'google'` steht seit Commit `659d672`
    (2026-08-31) in `TRACKING_TARGETS` (`src/lib/settings.ts`; GEMESSEN, CC, 2026-09-08,
    an der Roadmap-Zeile 11.9 protokolliert, und erneut 2026-09-25).
  · "ensureTrackingKey LÄUFT IM GOOGLE-OAUTH-WEG NICHT" — DOPPELT GEFÜHRT: Derselbe
    Gegenstand stand als eigener Posten ("DER OAUTH-WEG RUFT ensureTrackingKey NICHT —
    ANDERS ALS setCapiToken"). Er liegt seit dem 2026-09-25 im Backlog; der Vermerk vom
    2026-09-01 und der Nachtrag vom 2026-09-11 dieses Postens sind dort wörtlich
    mitgenommen, weil sie den Grund der Verschiebung tragen.
  · Die Streichung ist ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25 (Phasenende 11.7). Der
    gestrichene Volltext steht unter Commit `3e080b2`.

- `saveProject` SCHREIBT `settings` UNVALIDIERT — TOR A HÄLT DURCH EINE ABWESENHEIT —
  VERSCHOBEN INS BACKLOG AM 2026-09-25 (Sichtung beim Phasenende 11.7, ARCHITEKTEN-
  ENTSCHEIDUNG). Grund: Sein Kern ist seit dem 2026-08-31 beantwortet; was bleibt, ist nach
  seinem eigenen Vermerk ein MASSSTAB für jede spätere Blob-Frage — kein Zustand, der still
  kaputtgeht. Der Volltext steht WÖRTLICH in docs/claude-history/backlog-polish.md,
  Abschnitt "Aus Phase 11.7 gehoben (2026-09-25) …", unter diesem Titel.

- `PROJECT_PARAM` STEHT ZWEIMAL, UND DIE DIVERGENZ IST EINSEITIG STUMM (Trigger: eine Änderung an einem der beiden Parameternamen):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 24, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

24. **`PROJECT_PARAM` STEHT ZWEIMAL, UND DIE DIVERGENZ IST EINSEITIG STUMM.**
    **DER BEFUND (GEMESSEN am Repo, CC, 2026-08-31):**
    `src/app/api/oauth/google/callback/route.ts` definiert die Konstante lokal (mit
    Begründung im Kommentar: die Route ist die SENDENDE Seite des URL-Vertrags);
    `src/lib/oauth/connect-return.ts` exportiert eine zweite Konstante desselben Namens
    für die empfangende Seite.
    **DIE ASYMMETRIE IST DER GANZE PUNKT:** Ändert jemand den Wert **im Callback**, wird
    **T6 rot**. Ändert er ihn **in `connect-return.ts`**, wird **NICHTS rot** — die Läufe
    dort reichen `rawProject` direkt hinein und gehen nie über den Parameternamen. **DIE
    FOLGE WÄRE EIN STILLER RÜCKFALL AUF "ZULETZT BEARBEITET"** — also genau der Defekt,
    den die Fix-Scheibe behebt.
    **NICHT GEBAUT, UND DER GRUND GEHÖRT DAZU:** Der Bau ERWEITERT ein bestehendes
    Muster — `RESULT_PARAM = "google"` steht seit Phase 11.8 genauso doppelt. **Es jetzt
    einseitig zu heilen, machte aus einem konsistenten Muster ein halbes.** **BEIDE PAARE
    GEHÖREN ZUSAMMEN**, falls es je angefasst wird.
    **DIE KONVENTIONSZEILE "Konstanten leben in geteilten Dateien, nie als handgetippte
    Literale" IST HIER ZWEIMAL NICHT EINGEHALTEN** — das steht hier, damit niemand die
    Doppelung für die Konvention hält.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine Änderung an einem der beiden Parameternamen.

- CONVERSIONS AUF FOLGESEITEN TRAGEN BEI KEINEM ZIEL EINE KLICK-KENNUNG — UND JEDE ABHILFE VERLANGT EINE AUFBEWAHRUNG, DIE DIESES PRODUKT NICHT HAT (Trigger: der Zuschnitt der Phase 17, ODER eine erneute Owner-Befassung mit der dritten Datenklasse, ODER der Zuschnitt eines Cookie-Wegs zu einer Klick-Kennung, gleich welchen Ziels — je nachdem, was zuerst eintritt):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 39, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.
  TITEL UND TRIGGER SIND AM 2026-09-25 ERSETZT, NICHT GESTEMPELT (Phasenende 11.7,
  ARCHITEKTEN-ENTSCHEIDUNG; Präzedenz: "`settingsEqual` IST EINE ALLOWLIST …", 2026-09-18).
  Bis dahin lauteten sie: "CONVERSIONS AUF FOLGESEITEN SIND FÜR GOOGLE HEUTE NICHT MESSBAR
  (Trigger: der Zuschnitt der Phase 17, ODER eine erneute Owner-Befassung mit der dritten
  Datenklasse — je nachdem, was zuerst eintritt)". Der Vorrats-Wortlaut darunter trägt den
  alten Titel weiter; wer nach ihm sucht, landet hier. Was sich geändert hat, steht im
  Vermerk vom 2026-09-25 am Ende dieses Postens.

39. **CONVERSIONS AUF FOLGESEITEN SIND FÜR GOOGLE HEUTE NICHT MESSBAR — UND DIE NAHELIEGENDE
    ABHILFE IST DURCH TRANSIT-ONLY VERSPERRT.**
    **GEMESSEN LIVE (OWNER, 2026-09-01, Schritt 3 des Live-Tests der Scheibe 4):** Wird die
    gehostete Seite mit einer Klick-Kennung im Query-String aufgerufen und die Conversion erst
    auf einer FOLGESEITE ausgelöst, trägt `location.href` die Klick-Kennung nicht mehr,
    `extractGoogleClickIds` findet nichts, `buildGoogleEvent` verwirft mit `no_click_id`, und
    **es entsteht kein Ereignis.**
    **SACHKORREKTUR 2026-09-02 — ERSETZT, NICHT GESTEMPELT.** Hier stand "über eine echte
    Anzeige aufgerufen". Der Query-String war **von Hand gesetzt** (OWNER-ANGABE 2026-09-02;
    Volltext in VERMERK 10, Abschnitt (b)). **DER BEFUND IST DAVON UNBERÜHRT UND WIRD NICHT
    SCHWÄCHER:** Dass `location.href` nach einem Seitenwechsel den Query-String nicht mehr
    trägt, ist eine **Eigenschaft des Browsers** — sie hängt nicht daran, wer ihn geschrieben
    hat. Korrigiert ist die Herkunft der Eingabe, nicht die Beobachtung.
    **DAS IST KEIN DEFEKT DER SCHEIBE 4**, sondern die Folge der gewählten Gestalt: Der
    OFFLINE CONVERSION IMPORT ruht auf der Klick-Kennung, und "KEINE KLICK-KENNUNG, KEINE
    CONVERSION" ist als Eigenschaft der Gestalt schon in docs/roadmap.md, Eintrag 11.2
    festgehalten. **NEU IST NICHT DIE EIGENSCHAFT, SONDERN IHRE REICHWEITE:** Sie trifft nicht
    nur organischen Traffic und Direktaufrufe, sondern **jeden mehrschrittigen Funnel** — und
    das ist der Regelfall eines Media Buyers, nicht der Sonderfall.
    **DIE ABHILFE IST BENANNT UND VERSPERRT, und dieser Satz ist der eigentliche Inhalt des
    Eintrags:** Eine Kennung über Seitengrenzen zu tragen hiesse, sie zu **SPEICHERN** — in
    einem Cookie, im `sessionStorage`, in einer Serverzeile. **DIE AUFLAGE TRANSIT-ONLY ERLAUBT
    KEINE ABLAGE** (OWNER-ENTSCHEIDUNG 2026-08-28, dritte Datenklasse: "niemals in die
    Datenbank, niemals in ein Log, kein Hashen"; Fundstelle docs/offene-punkte.md,
    "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Block vom 2026-08-28).
    **WER DEN FUNNEL MESSBAR MACHEN WILL, ÖFFNET ALSO DIE DATENKLASSEN-FRAGE ERNEUT** — es ist
    keine Bau-Entscheidung, sondern eine OWNER-Entscheidung über die Reichweite von
    TRANSIT-ONLY. **HIER WIRD SIE NICHT VORBEREITET UND NICHT EMPFOHLEN.**
    **DER BEZUG ZU PHASE 17 GEHÖRT DAZU:** "Phase 17 — Multi-Page-Funnels" steht offen in der
    Roadmap. **Diese Scheibe hat gemessen, dass die beiden Vorhaben kollidieren** — ein
    Multi-Page-Funnel ohne getragene Klick-Kennung erzeugt für Google nichts, und mit ihr
    verlangt er eine Ablage, die heute verboten ist. **Wer Phase 17 zuschneidet, findet die
    Frage hier vor, statt sie neu zu entdecken.**
    **AUSDRÜCKLICH NICHT GESAGT:** dass TRANSIT-ONLY zu eng ist, dass ein Cookie zulässig
    wäre, oder dass ein anderes Ziel dasselbe Problem hätte. **KEINE EMPFEHLUNG.**
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: der Zuschnitt der Phase 17, ODER eine erneute Owner-Befassung mit der dritten
    Datenklasse — je nachdem, was zuerst eintritt.

    VERMERK 2026-09-25 (Phasenende 11.7) — DER POSTEN GILT JETZT ALLEN ZIELEN. Der Wortlaut
    darüber bleibt.
    WAS SICH GEÄNDERT HAT: Seit den Scheiben S5 bis S9 der Phase 11.7 trägt JEDES Ziel eine
    Klick-Kennung, und jede kommt allein aus der Seitenadresse — meta `fbc` aus `fbclid`,
    linkedin `li_fat_id`, tiktok `user.ttclid`, pinterest `user_data.click_id` aus `epik`,
    google wie zuvor `gclid`/`gbraid`/`wbraid`. Dieses Produkt setzt kein Cookie und legt
    nichts ab (Entscheidung P11.7-2 der Phase 11.7; GEMESSEN am Code, Archiv der Phase 11.7,
    VERMERK P11.7-1, (a), (b) und (f)). FOLGE: EINE KLICK-KENNUNG IST NUR VERFÜGBAR, SOLANGE
    DIE ADRESSE SIE TRÄGT — auf einer Folgeseite fehlt sie bei ALLEN fünf Zielen. Bei google
    loggt der Adapter dann "skipped: no_click_id"; bei den übrigen vier geht das Ereignis
    ohne Klick-Kennung hinaus, und nichts meldet das.
    WAS DIE ANBIETER EMPFEHLEN (GELESEN, je in der Datei des Ziels unter docs/ziel-befunde/):
    meta das Cookie `_fbc` mit 90 Tagen oder eine Ablage im Backend (meta, Teil (h)) ·
    pinterest das Cookie `_epik` statt des Parameters (pinterest, Teil (ac)) · tiktok selbst
    auslesen und ablegen, 28 Tage (tiktok, Teil (j)) · linkedin ein Cookie mit 30 Tagen, das
    ein eingebautes Insight Tag voraussetzt (linkedin, Teil (an)). WIE GROSS DER VERLUST OHNE
    AUFBEWAHRUNG IST, IST UNGEMESSEN.
    DREI ZUSCHNITT-FRAGEN DER PHASE 11.7 GEHÖREN HIERHER UND SIND OFFEN: P11.7-2 — Metas
    Empfehlung zu `_fbc` kollidiert mit der dritten Datenklasse; ohne neue
    Owner-Entscheidung ist der Cookie-Weg nicht baubar; ohne eigene Ablage ist der Zeitanteil
    von `fbc` der Verarbeitungszeitpunkt statt der ersten Beobachtung, mit ungemessener
    Wirkung · P11.7-20 — die Aufbewahrung selbst, dort an die Phase 17 verwiesen ·
    P11.7-26 — ein Cookie-Wert ist über die heutige Beacon-Form nicht erreichbar; wer einen
    Cookie-Weg zuschneidet, braucht NEUE FELDER IM BEACON-RUMPF auf `/api/e`, berührt damit
    die A-Regel "/API/E-SCHLANKHEIT" an ihrem Kopf, und ein neues Beacon-Feld wirkt erst nach
    Neu-Veröffentlichen.
    DAHER DER DRITTE TRIGGER: Ein Cookie-Weg kann auch ohne die Phase 17 zugeschnitten werden
    und berührt dieselbe Frage.
    KEINE EMPFEHLUNG.
    PROVENIENZ: die Code-Befunde GEMESSEN (CC, 2026-09-22 bis 2026-09-24; Archiv der Phase
    11.7); die Anbieter-Empfehlungen GELESEN (Crawls vom 2026-09-22); Titel, Trigger und
    Zuordnung ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-25.

- DER RESOLVER SCHREIBT BEI TOTEM ZUGANGSDATUM EINE FEHLERZEILE JE BESUCHER — VERSCHOBEN INS
  BACKLOG AM 2026-09-25 (Sichtung beim Phasenende 11.7, ARCHITEKTEN-ENTSCHEIDUNG). Grund: Der
  Befund ist LAUT, nicht still — eine Fehlerzeile je Anfrage —, und verloren geht dabei keine
  Conversion (Vermerk vom 2026-09-25). Der Kandidat, `access_token_expired` herabzustufen,
  liegt im selben Abschnitt des Backlogs, neben Eintrag 65. Der Volltext steht WÖRTLICH in
  docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.7 gehoben (2026-09-25) …",
  unter diesem Titel.

- STIRBT DAS ERNEUERUNGS-TOKEN, IST DER AUSFALL FÜR NIEMANDEN SICHTBAR (Trigger: die nächste Arbeit an der Ziel-Karte, ODER der Statuswechsel auf "In Produktion", ODER der erste Kunde mit einer Google-Verbindung):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 50, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

50. **STIRBT DAS ERNEUERUNGS-TOKEN, IST DER AUSFALL FÜR NIEMANDEN SICHTBAR.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-03):** Die Oberfläche sagt weiterhin
    "Zugangsdaten hinterlegt": `listConfiguredTargets` (src/app/projects/actions.ts)
    selektiert aus `project_secrets` ausschliesslich `target` — **keine Uhr, kein
    `secret_enc`** (dieselbe Messung wie in Vorrats-Eintrag 43). Die Seite läuft, und
    **die Conversions verschwinden still.**
    **DER EINZIGE ORT, AN DEM DER ZUSTAND HEUTE ERSCHEINT, IST EINE LOGZEILE** —
    `[capi/resolve] secret unusable` mit dem `reason` `refresh_token_expired`
    (`usableTokenFromRow`, src/lib/capi/token.ts). **Die sieht kein Kunde, und der
    Betreiber muss sie SUCHEN.**

    **DER VORSCHLAG KOMMT VOM OWNER (2026-09-03) UND IST HIER ABGELEGT, NICHT
    ZUGESCHNITTEN:** eine Anzeige im Dashboard, die den Kunden zur Neu-Autorisierung
    auffordert.

    **ER ZERFÄLLT IN ZWEI DINGE MIT SEHR UNTERSCHIEDLICHEM PREIS, UND DIESE TRENNUNG IST
    DER EIGENTLICHE INHALT DIESES EINTRAGS** — wer sie nicht mitliest, schneidet beide
    als eine Arbeit zu und bezahlt für die billigere den Preis der teureren:
    · **DIE AUSFALLMELDUNG ("die Verbindung ist tot") IST DIE BILLIGERE.** Der Zustand
      wird **HEUTE SCHON ERKANNT**: `hasLiveRefreshToken` (ebenda, modul-privat) trifft
      die Unterscheidung an **genau einer Stelle** — GEMESSEN am Repo (CC, 2026-09-03):
      eine Definition, ein Aufrufer —, und der Resolver schreibt bereits eine Zeile mit
      `refresh_token_expired`. **WAS FEHLT, IST EIN WEG VON DORT IN DIE OBERFLÄCHE.**
    · **UND DER RESOLVER DARF IHN NICHT SELBST GEHEN.** Er führt die `projectId`
      **bewusst nicht** — Invariante **(I-4)** der Scheibe 1b-2a, und der Grund steht am
      Kopf von `usableTokenFromRow`: Dieser Pfad läuft bei JEDEM Besucher JEDER
      Kundenseite, und eine Projekt-Kennung je Beacon wäre eine Datenerhebung, die
      niemand beschlossen hat. GEMESSEN (CC, 2026-09-03): **keine** der Logzeilen des
      Resolvers trägt eine. **Ein Zuschnitt, der den Weg über den Resolver nimmt, bricht
      diese Invariante — und zwar an der teuersten Stelle des Systems.**
    · **DIE VORWARNUNG ("läuft in drei Tagen ab") IST DIE TEURERE.** Sie braucht den
      **Ablaufzeitpunkt**, und der steckt im Chiffrat: **keine Spalte, keine
      SQL-Abfrage, die Datenbank hat den Schlüssel nicht.** GEMESSEN am Repo (CC,
      2026-09-03): Keine Migration legt eine Ablauf-Spalte auf `project_secrets` an.
      **SIE HÄNGT DAMIT AN DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
      AUSLÖSER** — Befund (1) des Zuschnitts zu Schritt 1b-1, "DER ABLAUFZEITPUNKT
      STECKT IM CHIFFRAT, IN KEINER SPALTE". Dass es dieselbe Frage ist, ist eine
      **ABLEITUNG** aus jenem Befund und keine Messung.

    **DIE VORBEDINGUNG, DIE JEDER ZUSCHNITT DER VORWARNUNG ZUERST BEANTWORTEN MUSS —
    UNGEMESSEN:** Ob Google nach dem Statuswechsel auf "In Produktion" überhaupt noch
    einen Ablaufzeitpunkt für das Erneuerungs-Token mitliefert. **Der Zeiger steht in
    docs/ziel-befunde.md, Teil (bx)**, und er ist dort ausdrücklich offen gelassen: Beide
    Erklärungen tragen die Beobachtung gleich gut, und "WER SIE TRENNEN WILL, BRAUCHT
    DIESELBE MESSUNG NACH DER VERIFIZIERUNG."
    **OHNE IHN KANN KEINE ANZEIGE VORHERSAGEN, DASS ETWAS AUSLÄUFT — sie kann nur melden,
    dass es bereits kaputt ist.** Wer die Vorwarnung ohne diese Messung zuschneidet, baut
    eine Anzeige, die im Produktivbetrieb **keine Datengrundlage** hat.

    **WAS ZUR LEBENSDAUER BEKANNT IST, JE MIT PROVENIENZ UND NICHT VERMISCHT:**
    · **GEMESSEN:** Im Publishing-Status "Testing" lebt das Erneuerungs-Token **sieben
      Tage** — Vorbedingung (iv) im Abschnitt "1b als Folgetask", an eigenen Daten
      wiedergefunden (VERMERK 6, Ableitung 3, und der Nachtrag vom 2026-09-03 mit dem
      konkreten Datum).
    · **ABLEITUNG, NICHT LESUNG — UND DIESE KENNZEICHNUNG IST GEGENÜBER DER VORLAGE
      DIESER RUNDE VERSCHÄRFT:** Dass nach dem Statuswechsel die Frist entfällt und das
      Token dann nur noch durch Ereignisse stirbt, ist **die UMKEHRUNG einer gelesenen
      Bedingung**, nicht die gelesene Bedingung selbst. Gelesen ist ausschliesslich der
      Satz des Anbieters über den **Testing**-Zustand ("…publishing status of 'Testing'
      is issued a refresh token expiring in 7 days", docs/ziel-befunde.md, Teil (ae) —
      RICHTIGGESTELLT AM 2026-09-24, hier stand "Teil (af)"; VERMERK P11.7-23 der Phase 11.7).
      **Aus "im Zustand A gilt X" folgt nicht "ausserhalb von A gilt X nicht"** — das ist
      genau der Schluss, den Teil (bx) für die Nachbaraussage schon einmal gezogen und
      dann als **widerlegt** protokolliert hat.
      **KEIN Aufruf, keine Beobachtung.** Wer diese Angabe als GELESEN zitiert, zitiert
      eine Folgerung als Quelle.

    **DER NEBENEFFEKT, DER DEN EINTRAG MIT 48 VERBINDET:** Eine Ausfallmeldung im
    Dashboard löste das Log-Problem **an der Wurzel** — niemand müsste mehr nach
    `refresh_token_expired` filtern, und die Gewöhnung an die mehrdeutige Fehlerzeile
    hätte keinen Gegenstand mehr.
    **DIE ABGRENZUNG GEHÖRT DAZU, sonst laufen zwei Fassungen derselben Sache
    nebeneinander: 48 fragt, WAS DIE LOGZEILE BEDEUTET. Dieser Eintrag fragt, WO DER
    ZUSTAND STATTDESSEN ERSCHEINEN SOLLTE.** Zwei verschiedene Fragen an demselben
    Zustand.

    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, wie die Anzeige aussähe, wo sie sässe,
    oder welcher der beiden Teile zuerst käme.
    TRIGGER: die nächste Arbeit an der Ziel-Karte, **ODER** der Statuswechsel auf
    "In Produktion", **ODER** der erste Kunde mit einer Google-Verbindung.
    PROVENIENZ: **OWNER-VORSCHLAG 2026-09-03**; die Code-Aussagen **GEMESSEN am Repo**
    (CC, 2026-09-03, Aufklärungsrunde desselben Tages); dass die Vorwarnung an derselben
    Frage hängt wie der Zeitplan, ist eine **ABLEITUNG** aus Befund (1) des
    1b-1-Zuschnitts und keine Messung; die Einordnung der Statuswechsel-Angabe als
    Ableitung statt Lesung ist **GEMESSEN am Dateitext** (CC, 2026-09-03, an
    docs/ziel-befunde.md, Teile (af) und (bx)).

    **VERMERK 2026-09-03 — DIE TRENNUNG DIESES EINTRAGS IST ÜBERHOLT UND DURCH EINE
    ANDERE ERSETZT. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK
    TRITT DANEBEN. DER TRIGGER IST UNANGETASTET.**
    **WAS ÜBERHOLT IST — GENAU EINE ACHSE, NICHT DER GANZE EINTRAG:** die Sortierung in
    **"billige Ausfallmeldung / teure Vorwarnung"**. Sie ruhte auf dem Schluss, die
    Vorwarnung hänge "an DERSELBEN KLARTEXT-SPALTEN-FRAGE WIE DER ZEITGETAKTETE
    AUSLÖSER".
    **DER GRUND, WARUM SIE FÄLLT (ARCHITEKTEN-BEFUND 2026-09-03): EINE SERVERAKTION HAT
    DEN CHIFFRIER-SCHLÜSSEL.** Der erste Halbsatz des Eintrags stimmt weiterhin — der
    Ablaufzeitpunkt steckt im Chiffrat, und die **Datenbank** hat den Schlüssel nicht.
    **Der Schluss stimmt nicht:** Eine Aktion kann dasselbe tun wie `usableTokenFromRow`
    (src/lib/capi/token.ts) — lesen, entschlüsseln, beide Uhren prüfen —, beim Laden des
    Dashboards und abseits jedes Beacons. **Der Satz galt einem ZEITPLAN IN POSTGRES und
    ist ungeprüft auf die OBERFLÄCHE übertragen worden.**
    **DIE TRENNUNG, DIE AN IHRE STELLE TRITT, LÄUFT AUF EINER ANDEREN ACHSE:**
    **ABGELAUFEN NACH EIGENER UHR** gegen **WIDERRUFEN**. Die erste steht in der Nutzlast
    und braucht keinen Schreibvorgang; die zweite ist nur beim Versuch erfahrbar und
    bräuchte als einzige Lage Persistenz. **Volltext im Abschnitt "Die Ampel an der
    Ziel-Karte — Scheibe 11.2b"**, dort unter "Die zwei Todesarten" — hier NICHT
    verdoppelt.
    **DIE ERSTE HÄLFTE DIESES EINTRAGS WIRD MIT SCHEIBE 11.2b GEBAUT.** Sie umfasst nach
    der neuen Trennung **beide** ursprünglich getrennten Anzeigen: Ausfall **und**
    Vorwarnung (OWNER-ENTSCHEIDUNG 2026-09-03). Was der Eintrag als "die teurere" führte,
    ist es nicht.
    **DIE ZWEITE HÄLFTE BLEIBT OFFEN UND BEHÄLT IHREN EIGENEN TRIGGER:** die
    **widerrufene** Verbindung. Sie ist am Rückgabewert der Erneuerung nicht von
    "abgelaufen" zu trennen — beide münden in `invalid_grant`, sobald der Anbieter
    gefragt wird — und steht im Zuschnitt der Scheibe 11.2b unter "Was die Scheibe 11.2b
    ausdrücklich nicht baut, je mit Grund", mit dem Trigger "die erste Messung, die
    `invalid_grant` bei LEBENDER Uhr zeigt".
    **WAS AM EINTRAG UNBERÜHRT BLEIBT UND WEITER TRÄGT:** der Befund selbst (der Ausfall
    ist für niemanden sichtbar), die drei gemessenen Code-Aussagen, die Invariante (I-4)
    als Riegel gegen den Weg über den Resolver, die ungemessene Vorbedingung aus Teil
    (bx), die Abgrenzung zu Eintrag 48 — **und sein TRIGGER, wörtlich wie zuvor.**
    **DER EINTRAG WIRD NICHT ABGEHAKT.** Ein Zuschnitt ist kein Vollzug; abgehakt wird
    hier ohnehin nicht (s. die Bauform an den Einträgen 7, 15 und 35).
    PROVENIENZ: **ARCHITEKTEN-BEFUND 2026-09-03**, auf Owner-GO; die Code-Aussage, dass
    eine Serveraktion entschlüsseln kann, ist **GEMESSEN am Repo** (CC, 2026-09-03) — die
    Chiffrier-Kennung wird aus der Umgebung gelesen, nicht aus der Datenbank. **Keine
    Messung an einer Oberfläche.**

    **ZWEITER VERMERK 2026-09-04 — DIE ERSTE HÄLFTE IST GEBAUT UND LIVE BEWIESEN. DER
    TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **WAS GEBAUT IST:** Die Scheibe 11.2b (Bau-Commit `7288f90`, s. VERMERK 13) zeigt den
    Ausfall **und** die Vorwarnung an der Ziel-Karte. Der Weg von `hasLiveRefreshToken` in
    die Oberfläche, den dieser Eintrag als "WAS FEHLT" benennt, ist gebaut — **aber NICHT
    über den Resolver**, sondern über eine eigene Serveraktion
    (`listTargetCredentialStates`), die beim Laden des Dashboards liest, entschlüsselt und
    Uhr 2 deutet.
    **DIE INVARIANTE (I-4) IST DAMIT EINGEHALTEN UND NICHT UMGANGEN**, und das ist genau
    der Punkt, den dieser Eintrag selbst als den teuersten benennt: Der Resolver führt
    weiterhin **keine `projectId`**, er ist mit keiner Zeile angefasst worden, und der
    Ingest-Pfad läuft unverändert. Der Weg in die Oberfläche geht **neben** ihm her.
    **WAS DER EINTRAG RICHTIG GESEHEN HAT — die Ausfallmeldung war die billigere Hälfte:**
    Der Zustand wurde bereits erkannt; gefehlt hat allein der Weg. **WORIN ER SICH IRRTE,
    steht schon im Vermerk vom 2026-09-03 darüber** und ist mit dieser Scheibe eingelöst:
    Die Vorwarnung war **nicht** die teurere — eine Serveraktion hat den
    Chiffrier-Schlüssel, und damit fiel die Klartext-Spalten-Frage weg.
    **DIE ZWEITE HÄLFTE BLEIBT OFFEN UND BEHÄLT IHREN EIGENEN TRIGGER:** die **WIDERRUFENE**
    Verbindung. Sie ist am Rückgabewert der Erneuerung nicht von "abgelaufen" zu trennen —
    beide münden in `invalid_grant`, sobald der Anbieter gefragt wird — und bräuchte als
    einzige Lage **Persistenz**. Ihr Trigger steht im Zuschnitt der Scheibe 11.2b unter
    "Was die Scheibe 11.2b ausdrücklich nicht baut, je mit Grund": **die erste Messung, die
    `invalid_grant` bei LEBENDER Uhr zeigt.**
    **DIE UNGEMESSENE VORBEDINGUNG AUS TEIL (bx) IST DAVON UNBERÜHRT UND GILT WEITER:** Ob
    Google nach dem Statuswechsel auf "In Produktion" überhaupt noch einen Ablaufzeitpunkt
    liefert, ist **nicht gemessen**. Trägt er keinen, greift die Vorwarn-Schwelle nie, und
    die Karte steht auf `unknown_expiry`. **Das ist gebaut und kein Defekt** — aber es
    heisst, dass die Vorwarnung im Produktivbetrieb ihre Datengrundlage verlieren kann.
    **DER EINTRAG WIRD NICHT ABGEHAKT, UND DAS IST DIE BAUFORM DIESER DATEI, KEINE
    UNENTSCHLOSSENHEIT:** Der Vorrat kennt kein Abhaken; er kennt einen eigenen datierten
    Absatz UNTER dem unveränderten Eintrag — so bei Eintrag 7, 15 und 35. **Diese Runde
    folgt ihr.** **SEIN TRIGGER STEHT WÖRTLICH WIE ZUVOR**, und zwei seiner drei Hälften
    sind unverändert offen: der Statuswechsel auf "In Produktion" und der erste Kunde mit
    einer Google-Verbindung.
    **WARUM ER STEHEN BLEIBT — ZWEI GRÜNDE, und der zweite wiegt schwerer:** (1) Seine
    **MESSUNG**, dass `listConfiguredTargets` ausschliesslich `target` selektiert, ist der
    Beleg, auf dem die zweite Aktion überhaupt ruht. (2) Seine **TRENNUNG der zwei Hälften**
    ist der Maßstab für die verbliebene: Wer die widerrufene Verbindung später zuschneidet,
    findet hier, warum sie als einzige Persistenz braucht — und warum der Weg über den
    Resolver auch dann versperrt bleibt.
    PROVENIENZ: der Bau **GEMESSEN am Repo** (CC, 2026-09-04); der Live-Nachweis
    **GEMESSEN 2026-09-03/04 (OWNER)**, s. VERMERK 13, Abschnitt (b). Dass (I-4)
    eingehalten ist, ist **GEMESSEN am Diff** (`src/lib/capi/**` liegt nicht darin), keine
    Zusage.

- DER OAUTH-CALLBACK ZIEHT DEN VERSIONS-ZÄHLER NICHT MIT (Trigger: die nächste Arbeit am Schreibpfad der Callback-Route):
  GEHOBEN AM 2026-09-08 aus docs/aktiver-stand-vorrat.md, Vorrats-Eintrag 53, im Rahmen
  des Phasenendes der Phase 11.2. Der Wortlaut darunter ist der des Vorrats-Eintrags und
  NICHT umformuliert; die Nummer ist die des Vorrats.

53. **DER OAUTH-CALLBACK ZIEHT DEN VERSIONS-ZÄHLER NICHT MIT — DER RIEGEL DER SCHEIBE
    1b-2b DECKT IHN DESHALB NICHT.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-05, Gate G4 der Stufe 1 zur Scheibe
    1b-2b):** Der Schreibvorgang der Callback-Route
    (src/app/api/oauth/google/callback/route.ts) ist ein `upsert` mit Konflikt-Auflösung auf
    `(project_id, target)`. Er trifft damit **nicht nur die Erst-Anlage, sondern auch eine
    BESTEHENDE Zeile** — das Neu-Verbinden. Dass dieser Fall real ist, steht in dieser Datei
    bereits: VERMERK 13, Abschnitt (c), zwei Neu-Verbindungen an einem Tag.
    **WAS DARAUS FOLGT:** Verbindet der Betreiber neu, während ein Erneuerungslauf zwischen
    dem Lesen und dem Schreiben steht, schreibt der Callback das Chiffrat **ohne
    Zähler-Sprung**. Der Erneuerungslauf trifft danach seine Bedingung und **überschreibt
    das frisch verbundene Zugangsdatum** mit dem aus dem alten Erneuerungs-Token. **DER
    RIEGEL GREIFT NICHT UND MELDET ERFOLG.**
    **ES IST KEIN ISOLATIONSLECK**, und der Satz steht auch hier zuerst: Kein Tenant sieht
    Daten eines anderen. **DER SCHADEN WÄRE EIN VERLORENER ZUGANG** — dieselbe Klasse, gegen
    die die Scheibe 1b-2b gebaut wird, nur auf einer anderen Naht.
    **WARUM DER POSTEN NICHT IN DIE SCHEIBE 1b-2b GEHÖRT, UND DAS IST SEIN EIGENTLICHER
    INHALT: EIN UPSERT KANN "ALT + 1" GAR NICHT AUSDRÜCKEN, OHNE VORHER ZU LESEN.** Ein
    Zähler-Sprung dort ist damit **keine Zeile, sondern eine andere Bauform** — er verlangt
    eine Lesung vor dem Schreiben und stellt danach dieselbe Frage nach der Rückmeldung noch
    einmal. **Eine eigene Entscheidung mit eigenem Zuschnitt.**
    **WIE WAHRSCHEINLICH DER FALL IST, IST NICHT ERHOBEN** und wird hier nicht geschätzt.
    **Bemerkenswert ist allein:** Der Callback ist die **einzige** Stelle im System, an der
    ein **MENSCH** und ein **VERKEHRSGETAKTETER AUTOMATISMUS** dieselbe Zeile gleichzeitig
    anfassen können.
    **DIE ABGRENZUNG ZU VORRATS-EINTRAG 9 GEHÖRT DAZU, sonst liest die nächste Runde zwei
    Fassungen derselben Sache:** Jener fragt, ob der **ANBIETER** bei der Ausstellung eines
    neuen Zugangsdatums das vorherige entwertet — eine Frage an ein fremdes System, und dort
    ausdrücklich als UNGEMESSEN geführt. **Dieser fragt, ob UNSER eigener zweiter Schreiber
    den Zähler mitzieht.** Zwei verschiedene Gegenstände an derselben Zeile.
    **VORRATS-EINTRAG 9 IST IN DIESER RUNDE NICHT ANGEFASST WORDEN**, und das ist Scope und
    kein Urteil.
    GEMELDET 2026-09-05, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder ein Zähler-Sprung im
    Callback noch ein anderer Riegel dort ist hier vorgeschlagen.
    TRIGGER: **die nächste Arbeit am Schreibpfad der Callback-Route** — dort liegt die
    Bauform, die ein Zähler-Sprung verlangt, und eine Runde, die sie ohnehin öffnet, zahlt
    ihn am billigsten.
    **HIER STEHT BEWUSST KEIN ZWEITER TRIGGER AUS DEM BETRIEB** (etwa "der erste beobachtete
    Fall"): Die Häufigkeit ist nicht erhoben, und niemand beobachtet diese Naht — ein
    erfundener Zeitpunkt liesse den Posten als terminiert aussehen, obwohl er es nicht ist.
    PROVENIENZ: der Code-Befund **GEMESSEN am Repo (CC, 2026-09-05)**; dass daraus ein
    verlorener Zugang folgen kann, ist eine **ABLEITUNG aus dem Kontrollfluss** und
    **keine Messung** — es ist kein solcher Lauf beobachtet worden. Die Einordnung als
    eigener Posten ist eine **ARCHITEKTEN-ENTSCHEIDUNG vom 2026-09-05**.

**EIN VERMERK ZUM VORRAT DER PHASE 11.8, KEIN EINTRAG** (2026-08-29): Der dortige
Eintrag 7 — "`decryptSecret` HAT WEITERHIN KEINEN AUFRUFER IM PRODUKTIVCODE" — **IST MIT
DIESER SCHEIBE GEGENSTANDSLOS.** `refreshAccessToken` liest, dechiffriert und zerlegt
eine echte Zeile aus `project_secrets.secret_enc`; der Live-Test hat den Pfad gefahren.
**docs/claude-history/phase-11.8-autorisierungsschicht.md WIRD DAFÜR NICHT ANGEFASST.**
Der Sonderfall jener Datei —
archiviert, aber nicht verschoben — ist im Verfahren ungeregelt, und ein rückwirkender
Eingriff in eine abgeschlossene Phase wäre eine EIGENE Entscheidung. Sie steht hier
ausdrücklich AUS. Dieser Vermerk ist der einzige Ort, an dem der Sachverhalt festgehalten
ist; wer jene Datei liest, findet dort einen Eintrag, der nicht mehr zutrifft, und
NICHTS, das darauf hinweist.
**STEMPEL 2026-09-08 — DER ABSATZ DARÜBER BLEIBT WÖRTLICH:** Der Sonderfall ist an diesem
Tag aufgelöst, jene Datei ist umgezogen; die volle Auflösung steht in ihrem Kopf. Dass sie
für DIESEN Eintrag weiterhin nicht angefasst wird, ist davon unberührt.

**EIN ZWEITER VERMERK, KEIN EINTRAG — DIE AUSLEGUNG DES SKILL-KONFLIKTS** (2026-08-29):
Der projekteigene Skill `supabase-doku` verlangt eine Anbieter-Lesung, sobald ein Schema,
eine Policy oder ein Constraint berührt **oder auch nur erfragt** wird. Eine
READ-ONLY-Runde kann sie nicht erbringen: Der Anbieter-Crawl legt gemessenermassen
Dateien an (je Navigation eine `page-*.yml`; GEMESSEN 2026-08-25, festgehalten in
docs/immer-beachten.md).
**DIE AUSLEGUNG (ARCHITEKT, 2026-08-29):** Der Auslöser greift NICHT, wenn die Frage
UNSEREN Constraint betrifft und keine Anbieter-Eigenschaft — es gäbe keine
Anbieter-Angabe, die die Antwort trüge; die Antwort steht im SQL-Editor.
**DASS DIES EINE AUSLEGUNG IST UND KEINE REGELÄNDERUNG, IST DER GANZE ZWECK DIESES
VERMERKS.** Der Wortlaut des Skills ist unberührt, und diese Datei ist nicht der Ort, an
dem er geändert würde (Weg 7: docs/arbeitsweise.md, als Änderungsantrag). **ER STEHT HIER,
DAMIT DIE NÄCHSTE KOLLISION NICHT NEU VERHANDELT WIRD** — sie ist eingetreten, sie wird
wieder eintreten, und ohne eine festgehaltene Auslegung entscheidet sie jede Runde neu und
möglicherweise anders.
**DIE GRENZE:** Sie deckt AUSSCHLIESSLICH den Fall "unser eigener Constraint, keine
Anbieter-Eigenschaft, READ-ONLY-Runde". Sie sagt NICHTS über eine Runde, die baut, und
nichts über eine Frage nach dem VERHALTEN des Anbieters — dort greift der Auslöser
unverändert.
PROVENIENZ: die Kollision GEMESSEN am eigenen Lauf (CC, 2026-08-29); die Auslegung eine
ARCHITEKTEN-FESTLEGUNG desselben Tages, keine Messung.

- DIE PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST TOT — GESTRICHEN AM 2026-09-23,
  SEINE SCHLIESSUNGSBEDINGUNG IST ERFÜLLT. Der Punkt hielt fest, dass die Aussage "NOCH KEIN
  GELEBTER STAND" unter Punkt (a) jenes Blocks auf einer toten Prämisse ruhte, und dass
  UNGEMESSEN war, ob der gebaute Google-Transport die Auflage TRANSIT-ONLY einhält — "keine
  Ablage, kein Log, kein Hashen". Der Abschluss war an die Scheibe S4 der Phase 11.7 gebunden
  (OWNER-ENTSCHEIDUNG 2026-09-23).
  BELEG DER ERLEDIGUNG, JE ACHSE GEMESSEN am Repo (CC):
  · ABLAGE — VERMERK P11.7-15 der Phase 11.7 (2026-09-23): Vom Ingest-Pfad wird an genau
    zwei Stellen dauerhaft geschrieben (`persistEvent` mit fünf Feldern, das Token-Update in
    `project_secrets`); keine erreicht Adresse, IP oder User-Agent. Positivkontrolle dort.
  · LOG — VERMERK P11.7-8 der Phase 11.7 (2026-09-22), Zeile C1: die `console`-Zeilen des
    Google-Transports führen Festtext, Grund, Status und Fehlernamen, den Antwort-Rumpf liest
    er nicht; seither unverändert (VERMERK P11.7-15), und der Diff der Scheibe S4 trägt keine
    `console`-Zeile (VERMERK P11.7-16).
  · HASHEN — VERMERK P11.7-16 der Phase 11.7 (2026-09-23): 0 Treffer der Achse
    `createHash|subtle|digest|sha-?256|crypto|hash` in `google-forward.ts`,
    `google-payload.ts`, `google-click-ids.ts`; keine der 94 Produktivdateien unter `src/`
    enthält einen Hasher-Aufruf; Positivkontrolle an fünf Testdateien.
  · GRENZE: die laufende Datenbank ist nicht gemessen. Ob der Block vom 2026-08-28 seinen
    Punkt (a) nachzieht, ist hier nicht entschieden — der Punkt empfahl das nie.
  · Der gestrichene Volltext steht unter Commit `de88657`.

<!-- Die Reste der Phase 11.2, gehoben 2026-09-08 -->

- FÜNF RESTE AUS DER ROADMAP-ZEILE 11.2 (2026-09-08) — DIESE ZEILE IST KEIN EIGENER PUNKT,
  SONDERN DIE KLAMMER UM DIE FÜNF DARUNTER.
  **WOHER SIE KOMMEN:** aus der Rest-Liste im NACHTRAG 2026-09-08 der Roadmap-Zeile 11.2.
  Jene Liste führt ACHT Nummern und SIEBEN offene Posten; Nummer (4) war schon am
  2026-09-08 geschlossen. **DIE NUMMERN IN KLAMMERN SIND DIE DER REST-LISTE** und werden
  NICHT neu vergeben.
  **ZWEI DER SIEBEN STEHEN NICHT HIER, je mit Grund:** Posten (7) ist an die ROADMAP-ZEILE
  11.5 gegangen, weil dort die Entscheidung fällt; Posten (8) ist GESTRICHEN, weil er als
  offener Punkt bereits in docs/ziel-befunde.md geführt wird — Buchhaltung, die anderswo
  schon steht, wird nicht umgezogen.
  **KEINER DER FÜNF IST EINE CODE-ARBEIT.** Es sind Messungen, eine Arbeit am
  Anbieter-Konto und eine Voraussetzung je Kunde. Genau deshalb steht der Roadmap-Marker
  auf `[x]` und die Posten hier.

- DIE SIEBEN-TAGE-FRIST UND DER STATUSWECHSEL AUF "IN PRODUKTION" (Trigger: EINGETRETEN, und
  er trägt einen TERMIN — das Erneuerungs-Token stirbt am 2026-09-11 um 07:26:58 UTC
  (09:26:58 Ortszeit)):
  GEHOBEN AM 2026-09-08 aus der Roadmap-Zeile 11.2, Rest-Posten (1), im Rahmen des
  Phasenendes der Phase 11.2.
  **ER STEHT ZUERST, WEIL ER EINE LAUFENDE UHR TRÄGT.** Im Publishing-Status "Testing"
  stirbt das ERNEUERUNGS-Token nach sieben Tagen. **NACH DIESEM TERMIN MELDET JEDE
  ERNEUERUNG `dead`, und jeder Test misst das statt der Sache** — wer danach einen
  Live-Test fährt und die Frist nicht kennt, jagt einen Defekt, den es nicht gibt.
  **DIE ZWISCHENLÖSUNG IST KEINE BEHEBUNG, UND DAS IST DER TRAGENDE SATZ DIESES PUNKTES:**
  Ein NEU-VERBINDEN setzt die Frist um SIEBEN TAGE zurück — GEMESSEN, zweimal. **Es
  VERSCHIEBT den Termin und löst ihn NICHT.** Wer neu verbindet, hat denselben Punkt eine
  Woche später wieder, und zwar ohne dass etwas rot wird.
  **DAUERHAFT LÖST IHN NUR DER STATUSWECHSEL AUF "IN PRODUKTION" — UND DER IST KEINE
  CODE-ARBEIT.** Er ist eine Arbeit am ANBIETER-KONTO und steht NEBEN Scheibe 1b, nicht in
  ihr. **EIN PERFEKTER AUTOMATISMUS HÄLT DAS ZUGANGSDATUM EINE WOCHE AM LEBEN UND FÄLLT
  DANACH TROTZDEM AUS.**
  **KEINE EMPFEHLUNG**, ob vor dem Termin neu verbunden oder der Statuswechsel betrieben
  wird.
  PROVENIENZ: Der TERMIN ist GERECHNET (CC, 2026-09-04) aus
  `refreshTokenExpiresAt.epochSeconds` = 1789111618, GEMESSEN 2026-09-04 (OWNER) beim
  Live-Test der Scheibe 11.2b. Die FRIST selbst ist GELESEN (docs/ziel-befunde.md,
  Google-Abschnitt, Teil (ae) — RICHTIGGESTELLT AM 2026-09-24, hier stand "Teil (af)"; (af)
  trägt 2SV, Passkeys und Mehrparteien-Freigabe, VERMERK P11.7-23 der Phase 11.7) und
  ausdrücklich NICHT gemessen — es ist kein Token bis zu
  seinem Ablauf beobachtet worden. Die zwei Neu-Verbindungen sind GEMESSEN (OWNER,
  2026-09-04). Die volle Herleitung stand in docs/aktiver-stand.md, Abschnitt "1b als
  Folgetask", Vorbedingung (iv), und liegt nach Schritt 2 im Archiv
  docs/claude-history/phase-11.2-google.md.
  VERMERK 2026-09-25 (Sichtung beim Phasenende 11.7) — DER TERMIN IM TRIGGER IST VORBEI, DER
  POSTEN NICHT. Der Wortlaut darüber bleibt. Die Google-Karte ist seither mehrfach neu
  autorisiert worden, zuletzt am 2026-09-24; die Frist läuft danach "um den 2026-10-01"
  (OWNER-ANGABE; Archiv der Phase 11.7, VERMERKE P11.7-23 und P11.7-34). Der Statuswechsel
  auf "In Produktion" ist nicht vollzogen — am Repo nicht entscheidbar, er ist Arbeit am
  Anbieter-Konto. Der Stub in CLAUDE.md nennt seither keinen festen Termin mehr, sondern
  den Mechanismus.

- DER eventSource-WERT IST NICHT GEMESSEN — GEBAUT IST "WEB" ALS ENTSCHEIDUNG (Trigger: das
  erste Instrument, das FACHLICHE Falschheit von syntaktischer Gültigkeit trennt):
  GEHOBEN AM 2026-09-08 aus der Roadmap-Zeile 11.2, Rest-Posten (2), im Rahmen des
  Phasenendes der Phase 11.2.
  **DER BEFUND:** `eventSource` ist beim Offline Conversion Import PFLICHT. WELCHER der
  Enum-Werte für diese Gestalt GILT, sagt der Anbieter nicht — für die NACHBAR-Gestalt
  (Multi-Source) nennt dieselbe Tabelle einen konkreten Wert ("Optional. If set, must be
  WEB."), für unsere steht nur "Required. Set to one of the enum values for EventSource".
  Das ist ein NICHT-TREFFER MIT BENANNTER REICHWEITE, kein Übersehen.
  **GEMESSEN IST DER TYP, NICHT DER WERT:** `eventSource` ist ein Enum, kein freier String;
  `"WEB"` ist ein gültiges Mitglied, ein erfundener Wert nicht (Messung B1, 2026-08-28).
  **DIE SPERRE IST DAMIT KLEINER GEWORDEN, NICHT GEFALLEN.**
  **WARUM DER TRIGGER SO UND NICHT "die nächste Messung" LAUTET, und das ist der Inhalt
  dieses Punktes:** Das naheliegende Instrument `validateOnly=true` beantwortet "wird die
  Anfrage angenommen", NICHT "ist der Wert der fachlich richtige" — mit `validateOnly=true`
  ist laut derselben Quelle GAR KEINE Diagnostik abrufbar. **Ein syntaktisch gültiges
  Enum-Mitglied kann fachlich falsch sein, und die Schnittstelle meldet das nicht.** Eine
  Messung mit dem falschen Instrument beantwortet die Frage nicht, sondern schliesst sie
  scheinbar.
  **DASS EINE CONVERSION VERBUCHT WURDE, BEANTWORTET SIE EBENFALLS NICHT:** MESSUNG G
  (2026-09-07) belegt die Verbuchung mit `"WEB"` — sie belegt nicht, dass ein anderer Wert
  falsch gewesen wäre, und sie sagt nichts über die WIRKUNG.
  **KEINE EMPFEHLUNG**, welcher Wert zu wählen wäre oder wie das Instrument aussähe.
  PROVENIENZ: Die zwei Doku-Zeilen sind GELESEN 2026-08-25 (/devguides/events/send-events,
  Doku-Stand 2026-08-18), abgelegt in docs/ziel-befunde.md, Google-Abschnitt, Teile (aj) und
  (ap). Der Enum-Typ ist GEMESSEN 2026-08-28 (OWNER), Messung B1, Teil (br). Die Grenze von
  `validateOnly` ist GELESEN, Teil (p)/H4. Der Wert "WEB" ist OWNER-ENTSCHEIDUNG 2026-09-01.
  VORBEHALT 2026-09-11 — DIE WERTELISTE DES ANBIETERS, WIE SIE AM 2026-09-11 GELESEN IST,
  TRÄGT EINEN WERT MEHR ALS DIE ERHEBUNG VOM 2026-08-24: `OTHER` ("The event was generated from
  other sources."); docs/ziel-befunde.md, Google-Abschnitt, Teil (cn), mit dem Vorbehalt an
  (w)/F3. **OB SICH DIE LISTE SEIT JENER ERHEBUNG VERÄNDERT HAT, IST NICHT ENTSCHEIDBAR** — die
  Release notes datieren `OTHER` auf "2025-08-06 v1.2", also davor. Dazu dieselbe Lesung: Die
  Referenz nennt das Feld "Optional. Signal for where the event happened (web, app, in-store,
  etc.)."; die Pflicht steht im Leitfaden und in den Release notes (ebenda, Teil (cn)).
  **DER EINTRAG BLEIBT OFFEN, UND SEINE AUSSAGE IST UNBERÜHRT:** Der gebaute Wert "WEB" ist
  weiterhin ungemessen, der Trigger unverändert, und für diese Gestalt steht weiterhin nur
  "Required. Set to one of the enum values for `EventSource`." (GELESEN 2026-09-11,
  /devguides/events/send-events, Doku-Stand 2026-08-18). **WER DEN VORBEHALT ALS FORTSCHRITT
  LIEST, HÄLT EINE FRAGE FÜR BEWEGT, DIE STEHT:** Ein Wert mehr in der Liste ist eine Option
  mehr, zwischen denen die Doku nicht entscheidet.
  PROVENIENZ DIESES VORBEHALTS: GELESEN 2026-09-11 (CC), KEINE Messung.

- DIE KOPFZEILE x-goog-user-project WIRD NICHT GESENDET — OB SIE PFLICHT IST, IST IN BEIDE
  RICHTUNGEN UNGEMESSEN (Trigger: die erste Anfrage, die OHNE sie scheitert oder MIT ihr
  anders ausfällt als ohne):
  GEHOBEN AM 2026-09-08 aus der Roadmap-Zeile 11.2, Rest-Posten (3), im Rahmen des
  Phasenendes der Phase 11.2.
  **DIE ACHSE, OHNE DIE DER PUNKT ZU SCHWACH GELESEN WIRD:** "ungemessen in BEIDE
  Richtungen" heisst, es ist WEDER belegt, dass sie fehlen darf, NOCH dass sie gebraucht
  wird. Dass die bisherigen Aufrufe ohne sie durchgelaufen sind, ist KEIN Beleg für das
  eine — es kann an der Kontoart, am Zugangsmodell oder am Umfang liegen.
  **WARUM DAS STILL KAPUTTGEHEN KANN:** Wird sie später verlangt — etwa mit einem anderen
  Zugangsmodell oder für ein fremdes Kundenkonto —, scheitert der Transport an einer
  Kopfzeile, die im Code gar nicht vorkommt. Es gibt dann nichts zu debuggen, was sichtbar
  wäre.
  **KEINE EMPFEHLUNG**, ob sie vorsorglich gesendet werden soll.
  PROVENIENZ: Dass sie nicht gesendet wird, ist GEMESSEN am Code; dass ihre Pflicht
  ungemessen ist, steht in docs/claude-history/phase-11.2-google.md, Vermerk zur Scheibe 4,
  und in docs/ziel-befunde.md, Google-Abschnitt. KEINE Messung an der Schnittstelle.

- DIE WIRKUNG AUF DIE GEBOTE IST UNGEMESSEN (Trigger: der erste Lauf mit genug verbuchten
  Conversions, dass eine Gebotsstrategie sie überhaupt verwerten kann — spätestens der erste
  echte Ad-Traffic auf eine gehostete Seite):
  GEHOBEN AM 2026-09-08 aus der Roadmap-Zeile 11.2, Rest-Posten (5), im Rahmen des
  Phasenendes der Phase 11.2.
  **DIESER PUNKT TRÄGT DIE AUFLAGE AM ROADMAP-MARKER `[x]`, und das ist sein eigentliches
  Gewicht:** Bewiesen ist der Weg bis zur VERBUCHUNG beim Anbieter (MESSUNG G, GEMESSEN
  2026-09-07). **NICHT bewiesen ist die WIRKUNG** — dass die verbuchte Conversion die
  Gebotssteuerung tatsächlich erreicht. **Gemessen ist eine Conversion IN DER
  BERICHTERSTATTUNG, nicht in der Gebotssteuerung.**
  **DAS IST DAS PRODUKTVERSPRECHEN SELBST**, nicht ein Randdetail: Pagesmith verkauft
  server-seitiges Tracking, damit der Werbekanal besser aussteuert. Ein Weg, der bis zur
  Berichterstattung trägt und dort endet, hält das Versprechen nicht ein.
  **EINE ZWEITE, GELESENE UND NICHT GEKLÄRTE HÄLFTE:** ob das 14-Tage-Fenster aus (p)/H2
  für die gewählte Gestalt überhaupt gilt, ist GELESEN und nicht entschieden.
  **KEINE EMPFEHLUNG**, wie die Wirkung zu messen wäre.
  PROVENIENZ: MESSUNG G GEMESSEN 2026-09-07 (OWNER), docs/ziel-befunde.md, Google-Abschnitt,
  Teil (cf); die Grenzen jener Messung stehen dort im Abschnitt "DIE GRENZEN". Das
  14-Tage-Fenster ist GELESEN, Teil (p)/H2. KEINE Messung an einer Gebotsstrategie.

- DER UPLOAD_CLICKS-VORBEHALT IM KUNDENKONTO — EINE VORAUSSETZUNG JE KUNDE, KEINE EINMALIGE
  ARBEIT (Trigger: der erste FREMDE Kunde, der Google verbindet):
  GEHOBEN AM 2026-09-08 aus der Roadmap-Zeile 11.2, Rest-Posten (6), im Rahmen des
  Phasenendes der Phase 11.2.
  **DER BEFUND:** Ohne eine Conversion-Action vom Typ UPLOAD_CLICKS im Kundenkonto gibt es
  keine `productDestinationId`, an die geliefert werden könnte.
  **DER SATZ, DER DIESEN PUNKT VON EINER ERLEDIGTEN AUFGABE TRENNT: ES IST EINE
  VORAUSSETZUNG JE KUNDE UND KEINE EINMALIGE ARBEIT.** Dass sie im eigenen Konto erfüllt
  ist, sagt über jedes andere Konto NICHTS. Sie tritt mit JEDEM neuen Kunden erneut ein,
  und sie liegt in seinem Konto, nicht in unserem Code.
  **WARUM DAS STILL KAPUTTGEHT:** Ein Kunde, dessen Konto keine solche Action führt, kann
  Google in Pagesmith vollständig verbinden — Autorisierung, Kennungen, Ampel auf grün — und
  es wird nie etwas verbucht. **Nichts im Produkt sagt ihm, woran es liegt.**
  **KEINE EMPFEHLUNG**, ob das Produkt die Action prüft, anlegt oder nur erklärt.
  PROVENIENZ: Der Vorbehalt ist OWNER-ENTSCHEIDUNG 2026-08-24 zur Gestalt und steht im
  Volltext an der Roadmap-Zeile 11.2. Dass er je Kunde gilt, ist eine ABLEITUNG aus der Lage
  der Action im KUNDENKONTO und keine Messung.

<!-- Aus dem Vorrat der Phase 11.3 gehoben, 2026-09-11 -->

- NACH DEM ENDE EINES TESTMODUS ERKLÄRT NICHTS DIE LÜCKE IN DER EIGENEN KURVE (Trigger: der
  erste fremde Nutzer, der den Testmodus einschaltet):
  GEHOBEN AM 2026-09-11 aus Vorrat (3) der Phase 11.3, im Rahmen ihres Phasenendes — NUR
  SEINE RESTLÜCKE (b).
  **DER BEFUND:** Solange die Frist läuft, nimmt der Riegel jedes Ereignis des Projekts aus
  `events`; beim Anbieter kommt es an. Der Banner erklärt das — aber NUR, solange der
  Testmodus läuft: Seine Bedingung ist `testModeState.kind === "laeuft"`, und nach dem
  Beenden ist er sofort weg (GEMESSEN LIVE, Stefan, 2026-09-09 und 2026-09-10, in drei
  Läufen der Phase 11.3). **Die fehlenden Ereignisse des Zeitraums bleiben in der
  Auswertung fehlend, und nichts sagt mehr, warum.**
  **WARUM DAS STILL KAPUTTGEHT:** Der Kunde sieht hinterher eine Delle in seiner eigenen
  Kurve, während im Werbekonto Conversions aufgelaufen sind. Es sieht aus wie ein Defekt,
  und die einzige Erklärung ist verschwunden, bevor er hinsieht — genau das Misstrauen, das
  der Testmodus auflösen soll.
  **WAS NICHT HIER STEHT — RESTLÜCKE (a), DIE FEHLENDE BETREIBER-DOKUMENTATION ZUM
  TESTMODUS:** Sie steht als Punkt (3) am Posten "BETREIBER-DOKUMENTATION FEHLT — DREI
  PUNKTE".
  **KEINE EMPFEHLUNG**, was gegen die Lücke zu bauen wäre.
  PROVENIENZ: der Banner-Stand GEMESSEN am Repo (CC, 2026-09-10, Commit `8fcd4e0`); das
  Verschwinden nach dem Beenden GEMESSEN LIVE (Stefan). Dass die Lücke in der Auswertung
  bleibt, ist eine ABLEITUNG aus dem Riegel, keine Messung an einer laufenden Oberfläche.

- DER CODE TRÄGT EINEN DEPLOYMENT-WEITEN TESTMODUS-HEBEL, DEN IN VERCEL HEUTE NIEMAND SETZT
  UND DEN NIEMAND BEOBACHTET (Trigger: das Setzen von `META_TEST_EVENT_CODE` oder
  `TIKTOK_TEST_EVENT_CODE` in einer Vercel-Umgebung — spätestens der erste fremde Kunde, weil
  der Hebel dann Projekte trifft, die nicht dem Setzenden gehören):
  GEHOBEN AM 2026-09-11 aus Vorrat (10) der Phase 11.3, im Rahmen ihres Phasenendes, MIT
  NEUEM GEGENSTAND: Der Kern ist nicht mehr, welche Quelle gewinnt, sondern dass der Hebel
  überhaupt besteht.
  **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-11).** Achse: beide Namen, ohne Rücksicht auf
  Gross- und Kleinschreibung, alle Dateien ohne `node_modules`, `.next`, `.git`,
  `.playwright-mcp`, Testdateien eingeschlossen; Negativkontrolle 0.
  · `META_TEST_EVENT_CODE` liest `src/lib/capi/config.ts` beim Laden des Moduls
    (`?.trim() || ""`). Zwei Konsumenten: `forwardToMeta` (`src/lib/capi/meta-forward.ts`)
    setzt `test_event_code` aus Projekt-Code ODER diesem Wert; `resolveClientIp`
    (`src/lib/capi/ingest.ts`) setzt bei fehlender oder Loopback-IP die feste Dummy-IP
    `123.123.123.123`.
  · `TIKTOK_TEST_EVENT_CODE` liest `testEventCode` (`src/lib/capi/tiktok-forward.ts`) bei
    jedem Aufruf (`?.trim() ?? ""`); `forwardToTiktok` setzt `test_event_code` aus
    Projekt-Code ODER diesem Wert.
  · UNBESETZT geht an keiner der drei Stellen etwas hinaus — kein leeres Feld, keine
    Dummy-IP.
  · GESETZT trägt jede Meta- bzw. TikTok-Nutzlast ohne Projekt-Code den Wert, für ALLE
    Projekte des Deployments. Der Persist-Riegel bleibt unberührt; er hängt allein am
    Projekt-Zustand (GEMESSEN LIVE, Stefan, 2026-09-09).
  **NIEMAND BEOBACHTET IHN:** Banner und Ziel-Karte lesen allein den Projekt-Zustand
  (`listTestModeStates`); ein gesetzter Umgebungswert erscheint dort nicht.
  **WER IHN SETZT:** In Vercel sind beide Variablen seit dem 2026-09-11 gelöscht
  (OWNER-ANGABE, keine Messung); ob der zu diesem Zeitpunkt laufende Deploy den Wert noch
  trägt, ist nicht erhoben. Die lokale `.env.local` setzt `META_TEST_EVENT_CODE`, nicht
  leer (GEMESSEN am Repo, CC, 2026-09-11) — lokal ist der Hebel gesetzt, samt Dummy-IP.
  **DIE VORRANG-FRAGE STECKT DARIN:** Tragen beide Quellen VERSCHIEDENE Codes, gewinnt nach
  dem Code der Projekt-Code (an beiden Adaptern `projectTestEventCode || …`); im Unit-Test
  deckt es TM6 in beide Richtungen (`src/lib/capi/ingest.test-mode.test.ts`). LIVE ist es
  ungemessen — am 2026-09-09 trugen beide Quellen denselben Wert.
  **DIE LÄUFE, DIE DEN HEBEL SETZEN ODER SEIN FEHLEN PRÜFEN:** `src/app/api/capi/route.test.ts`
  (Code in der Nutzlast und Dummy-IP, je gesetzt und leer), TM6 und TM8 in
  `src/lib/capi/ingest.test-mode.test.ts`, T18 in `src/lib/capi/tiktok-forward.test.ts`
  (TikTok-Wert und Nicht-Kopplung an Metas Variable). Zehn weitere Testdateien setzen die
  Meta-Konstante wörtlich auf `""`.
  **ABGRENZUNG:** `PINTEREST_TEST_MODE` gehört nicht hierher — der Code liest ihn seit Commit
  `3d42501` nicht mehr.
  **KEINE EMPFEHLUNG**, ob der Hebel entfernt, sichtbar gemacht oder belassen wird.

- DIE IDOR-WÄCHTER SIND NAMENTLICH — EINE NEUE SERVER-ACTION IST UNGESCHÜTZT BY DEFAULT, UND
  NICHTS WIRD DAVON ROT (Trigger: die nächste Runde, die eine Server-Action anlegt):
  GEHOBEN AM 2026-09-11 aus Vorrat (15) der Phase 11.3, im Rahmen ihres Phasenendes. Der
  Wortlaut darunter ist der des Vorrats; "diese Scheibe" und "diese Runde" meinen die
  Scheibe 11.3b.
  Jeder bestehende Wächter nennt die Aktion, die er prüft; er weiss von einer neuen nichts.
  **GEMESSEN in dieser Scheibe:** Die Pflicht-Mutation "Ownership-Gate entfernen" wäre GRÜN
  geblieben, hätte diese Runde nicht drei eigene Wächter mitgebaut — die bestehenden decken
  `setCapiToken`, `removeCapiToken` und die zwei Leser der Scheibe 11.2b. **Einen geteilten
  Ownership-Helfer gibt es nicht** (GEMESSEN am Repo, CC, 2026-09-09: keine Fundstelle für
  `assertProjectOwnership`, `assertOwnership`, `requireOwner`, `ownProject`, `ensureOwner`);
  das Gate ist in jeder Aktion von Hand wiederholt.
  PROVENIENZ: GEMESSEN am Repo und an der Mutationsprobe (CC, 2026-09-09).

- ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI — DIE UMBENENNUNG AM
  PHASENENDE MACHT SIE TOT, DIE NÄCHSTE STANDDATEI WIEDER FALSCH (Trigger: das Anlegen der
  nächsten Standdatei unter demselben Pfad — sobald ihre Nummern die eines solchen Zeigers
  erreichen, trifft er wieder einen existierenden, aber falschen Eintrag):
  GEHOBEN AM 2026-09-11 aus Vorrat (28) der Phase 11.3, im Rahmen ihres Phasenendes, MIT
  NEU GEFASSTEM TRIGGER: Der alte hing an den Vermerken dieser Phase und läuft mit ihr ab;
  der Mechanismus nicht.
  **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-11): VIERZEHN Zeiger nennen
  `docs/aktiver-stand.md` zusammen mit einer Nummer, meinen die Standdatei der Phase 11.2
  (oder eine frühere) und trafen an diesem Tag einen existierenden, aber FALSCHEN Eintrag der
  Standdatei der Phase 11.3.** Achse: jede verfolgte Datei ausser der Standdatei selbst,
  der Pfad mit einer Nummer (`VERMERK n`, `Entscheidung (n)`, `Vorrat (n)` bzw.
  `Vorrats-Eintrag n`, `Hebungs-Kandidat n`) in derselben Zeile oder bis zu zwei Zeilen
  davor oder danach, jeder Treffer einzeln gelesen. Die vierzehn:
  · docs/roadmap.md, Roadmap-Zeile 11.2 — VERMERK 1, VERMERK 3, zweimal Vorrats-Eintrag 6;
  · docs/ziel-befunde.md, Google-Abschnitt — zweimal Hebungs-Kandidat 2, zweimal
    Entscheidung (2), Vorrats-Eintrag 5;
  · docs/plattform-befunde.md — zweimal Hebungs-Kandidat 2;
  · docs/offene-punkte.md — VERMERK 6 (am Posten zum Autorisierungs-Fluss über eine andere
    Adresse);
  · CLAUDE.md und docs/claude-history/backlog-polish.md — je Hebungs-Kandidat 4.
  NICHT MITGEZÄHLT: elf Zeiger derselben Art, deren Nummer die Standdatei der Phase 11.3
  nicht erreicht (VERMERK 10, 14, 16; Vorrats-Eintrag 40, 41, 42) — sie waren an jenem Tag
  schon tot; und eine Stelle in docs/claude-history/phase-11.2-google.md, die "DIESER Datei
  (docs/aktiver-stand.md)" schreibt und damit zweideutig ist.
  **DER HEUTIGE STAND:** Die Standdatei der Phase 11.3 ist am 2026-09-11 nach
  docs/claude-history/phase-11.3-testmodus.md umbenannt. Seither sind alle vierzehn TOT, nicht
  richtig — richtig wären sie erst mit dem Archivpfad der Phase 11.2,
  docs/claude-history/phase-11.2-google.md. Die nächste Standdatei unter demselben Pfad macht
  sie wieder falsch. **Ein toter Zeiger zwingt zum Suchen, ein falscher nicht.** Die toten
  führt Eintrag 67 in docs/claude-history/backlog-polish.md.
  **DER UNTERSCHIED ZUR REGEL "EINE ABLAGE MIT HALBWERTSZEIT WIRD ZITIERT, ALS HÄTTE SIE
  KEINE" (docs/immer-beachten.md):** Jene sagt, wie man solche Zeiger nicht wieder baut;
  dieser Posten sagt, dass vierzehn solche Zeiger bestehen und was mit ihnen geschieht.
  **KEINE EMPFEHLUNG**, ob, wann und in welcher Reihenfolge sie nachgezogen werden.
  PROVENIENZ: die Zählung GEMESSEN am Repo (CC, 2026-09-11), die Zuordnung zu einer Phase je
  Treffer am Kontext abgelesen. Dass die nächste Standdatei sie wieder falsch macht, ist eine
  ABLEITUNG aus der Nummernvergabe, keine Messung.

  NACHGETRAGEN 2026-09-17 — DER TRIGGER GILT NUR NOCH FÜR EINE DER ZWEI ZEIGERFORMEN. Alles
  darüber bleibt wörtlich stehen; seine Angaben sind datierte Messungen und werden hier
  gelesen, nicht ersetzt.
  · FÜR NUMMERN-ZEIGER IST DER TRIGGER UNERREICHBAR GEWORDEN. Seit dem Änderungsantrag B
    (OWNER-ENTSCHEIDUNG 2026-09-17, vollzogen in diesem Commit) trägt jede Nummer einer
    Standdatei das Präfix ihrer Phase (`P<Phase>-n`, docs/arbeitsweise.md, "Die Standdatei").
    Die Nummern der nächsten Standdatei können die eines nackten Alt-Zeigers deshalb NIE MEHR
    ERREICHEN. Die vierzehn bleiben TOT — und ein toter Zeiger zwingt zum Suchen.
  · FÜR TITEL-ZEIGER BLEIBT ER. Ein Zeiger, der statt einer Nummer einen ABSCHNITTSTITEL
    nennt, trifft in der nächsten Standdatei wieder etwas, sobald sie einen Abschnitt
    desselben Wortlauts führt — und die Hausform-Titel führt jede.
  DER BEFUND — GEMESSEN am Repo (CC, 2026-09-17): ZWANZIG Titel-Zeiger in ZEHN Dateien.
  ACHSE: jede verfolgte Datei AUSSER dem Archiv der Phase 11.12, der Pfad
  `docs/aktiver-stand.md` gefolgt von einem ZITIERTEN Abschnittstitel im Fenster von 120
  Zeichen, mehrzeilig und case-insensitiv, die Trennzeichenklasse einschliesslich der
  Kommentarmarken. POSITIVKONTROLLE: Die Achse findet den über einen Zeilenumbruch und eine
  SQL-Kommentarmarke getrennten Zeiger in supabase/migrations/0027_project_secrets_version.sql
  — eine engere Fassung ohne Kommentarmarken hatte ihn verfehlt und ergab 19 statt 20.
  NEGATIVKONTROLLE: ein reiner Nummern-Zeiger ("docs/aktiver-stand.md, VERMERK 3") trifft
  nicht.
  DIE ZWANZIG JE DATEI: docs/ziel-befunde.md 4 · docs/claude-history/phase-11.2-google.md 3 ·
  docs/offene-punkte.md 3 · docs/plattform-befunde.md 3 · docs/roadmap.md 2 ·
  src/app/projects/actions.testmode.test.ts 1 · src/lib/tracking/credential-state.ts 1 ·
  supabase/migrations/0027_project_secrets_version.sql 1 ·
  supabase/migrations/0028_project_secrets_test_mode.sql 1 ·
  supabase/migrations/0029_project_secrets_test_mode_je_ziel.sql 1.
  VIER DAVON NENNEN EINEN HAUSFORM-TITEL und sind die gefährlichen — sie treffen in JEDER
  künftigen Standdatei: zweimal "Entscheidungen, die über ihre Scheibe hinaus binden"
  (docs/claude-history/phase-11.2-google.md), einmal "Vorrat (gemeldet, nicht gebaut)"
  (docs/offene-punkte.md), einmal "Gegenstand der Phase"
  (src/app/projects/actions.testmode.test.ts). Die übrigen SECHZEHN nennen phasen-eigene
  Titel; sie sterben mit der Umbenennung und werden nur falsch, wenn eine spätere Phase
  denselben Wortlaut wählt.
  DREI DER ZWANZIG STEHEN IN ANGEWANDTEN MIGRATIONEN (0027, 0028, 0029) und sind damit NICHT
  heilbar — "ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN"
  (docs/immer-beachten.md).
  KEINE EMPFEHLUNG, ob, wann und in welcher Reihenfolge die zwanzig nachgezogen werden.
  PROVENIENZ: Die Zählung, die Aufteilung je Datei, die vier Hausform-Titel und die zwei
  Kontrollen sind GEMESSEN am Repo (CC, 2026-09-17). Dass der Trigger für Nummern-Zeiger
  unerreichbar wird, ist eine ABLEITUNG aus Antrag B, keine Messung.

  ERGÄNZT 2026-09-25 (Vorrat P11.9-16 der Phase 11.9) — DIE ACHSE VOM 2026-09-17 SIEHT NUR
  TITEL HINTER DEM PFAD. Sie sucht "den Pfad `docs/aktiver-stand.md` gefolgt von einem
  ZITIERTEN Abschnittstitel"; ein Titel VOR dem Pfad liegt ausserhalb. BEISPIEL, GEMESSEN (CC,
  2026-09-25): docs/claude-history/phase-11.2-google.md, Absatz "DER VORRATS-EINTRAG 4 IST
  UNBERÜHRT", schreibt 'im Abschnitt "Vorrat (gemeldet, nicht gebaut)" DIESER Datei
  (docs/aktiver-stand.md)' — ein Hausform-Titel vor dem Pfad; in den 120 Zeichen danach steht
  kein zitierter Titel. OB DIE ZWANZIG DARÜBER IHN FÜHREN, IST NICHT ERHOBEN: das Muster vom
  2026-09-17 ist beschrieben, nicht abgelegt. Eine Zählung der Zeiger dieser Form gibt es
  nicht. Der Trigger bleibt unverändert. Herkunft: Nebenbefund einer Runde vom 2026-09-25,
  festgehalten in docs/claude-history/phase-11.9-ga4.md, Vorrat P11.9-16. KEINE EMPFEHLUNG.

- DER TESTZUSTAND WIRD NACH DEM SPEICHERN NICHT NEU GEHOLT — UND ER ÜBERLEBT DEN
  PROJEKTWECHSEL (ZWEI TRIGGER, je einzeln hinreichend, beide spätestens vor einem
  Beta-Launch: (1) für die drei Speicherpfade aus (b) — der erste fremde Nutzer, der
  Zugangsdaten oder eine Kennung speichert, auch mit nur EINEM Projekt; (2) für das Fenster
  aus (c) — der erste fremde Nutzer mit mehr als einem Projekt):
  **(a) DIE SICHTBARKEITS-BEDINGUNG.** Testknopf und Testcode-Feld einer Ziel-Karte stehen in
  `TargetCard` (`src/components/TargetCard.tsx`) hinter `projectId && testModeState !== null`;
  der Kommentar dort: "DIE SICHTBARKEIT HAENGT ALLEIN AN testModeState !== null". Den Wert
  liefert `testModeStateFor` (`src/lib/tracking/credential-state.ts`) aus dem Container-Zustand
  `testModes`; `null` heisst nicht geladen, Leser gescheitert oder kein Eintrag. Einen Eintrag
  gibt `listTestModeStates` (`src/app/projects/actions.ts`) nur heraus, wenn ALLE DREI gelten:
  das Ziel steht in `TARGETS_WITH_TEST_MODE` (meta, tiktok, pinterest — linkedin und google
  bekommen den Abschnitt nie) · es trägt eine Kennung im GESPEICHERTEN Blob
  (`hasTargetPixelId(getPixelId(settings, target), target) ||
  hasConversionRules(getConversionRules(settings, target))`, gelesen aus `owned.settings`) ·
  und es hat eine Zeile in `project_secrets`.
  **(b) DREI PFADE OHNE NEU-ERHEBUNG.** Neu geholt wird `testModes` an genau zwei Stellen in
  `CodeImporter` (`src/components/CodeImporter.tsx`): im gebündelten Lade-Effekt mit der
  Abhängigkeit `[projectId]` und in `handleTestModeChanged` nach einer eigenen Test-Geste,
  dort für ein Ziel. Ausgelassen wird die Erhebung:
  · NACH DEM SPEICHERN VON ZUGANGSDATEN — `handleCredentialsSaved` aktualisiert
    `configuredTargets` und `credentialStates`, ruft aber weder `listTestModeStates` noch
    `setTestModes`;
  · NACH DEM ENTFERNEN — `handleCredentialsRemoved`, dieselbe Auslassung;
  · NACH DEM SPEICHERN EINER KENNUNG — die Bedingung liest den gespeicherten Blob, und nach
    `saveProject` ruft keine Stelle `listTestModeStates`.
  **DIE FOLGE, DIE DEN PUNKT TRÄGT:** Die Karte zeigt sofort "konfiguriert", der
  Test-Abschnitt bleibt aus — bis das Projekt wechselt oder die Seite neu lädt. Nichts meldet
  es.
  **(c) DER ZUSTAND ÜBER DER MOUNT-GRENZE — DER SCHWERERE TEIL.** Die Karten hängen in
  `MeasureView` (`src/components/MeasureView.tsx`) an der Mount-Grenze
  `key={`${projectId ?? "neu"}:${target}`}`. `testModes` liegt DARÜBER, als `useState` in
  `CodeImporter`, und wird beim Wechsel NICHT zurückgesetzt: Gesetzt wird es nur nach dem
  Abruf (`setTestModes(tests)`) und in `handleTestModeChanged`. BIS DER ABRUF ANTWORTET, SEHEN
  DIE FRISCH GEMOUNTETEN KARTEN DES NEUEN PROJEKTS DEN TESTZUSTAND DES VORIGEN. Dasselbe Muster
  gilt für `configuredTargets` und `credentialStates` — sie laufen im selben Lade-Effekt und
  werden ebenfalls erst nach dem Abruf gesetzt.
  **DIESER TEIL IST EINE ABLEITUNG AUS DEM CODE, NICHT GELAUFEN.** Wie lange das Fenster offen
  ist, ist ungemessen.
  **(d) DIE TRIGGER** stehen im Titel, wörtlich: zwei, je einzeln hinreichend — der erste
  fremde Nutzer, der Zugangsdaten oder eine Kennung speichert, auch mit nur EINEM Projekt,
  und der erste fremde Nutzer mit mehr als einem Projekt; beide spätestens vor einem
  Beta-Launch. HEUTE testet der Owner allein; der Schaden ist ein
  Schönheitsfehler, weil er weiss, was er gerade getan hat.
  **(e) WARUM HIER UND NICHT IM BACKLOG:** Es geht STILL kaputt — der Betreiber sieht einen
  Zustand, der nicht zu seinem Projekt gehört, oder vermisst einen, der dazugehört, und nichts
  sagt es ihm.
  **(f) DIE ABGRENZUNG ZUM NACHBARN** — docs/claude-history/backlog-polish.md, "Nachtrag
  2026-09-11 — BEOBACHTUNG: DIE TESTMODUS-ANZEIGE VERALTET BEI OFFENER SEITE" (GELESEN, CC,
  2026-09-14). Er belegt denselben Mechanismus — "GEHOLT WIRD DER TESTZUSTAND AN GENAU ZWEI
  STELLEN" — und handelt von einer anderen Sache: vom ABLAUF einer Frist bei offener Seite, als
  bewusste Auslassung der Scheibe 11.3b ("KEIN DEFEKT"). DIESER POSTEN handelt von der eigenen
  Speicher-Geste des Betreibers, nach der nicht neu geholt wird, und vom Zustand eines ANDEREN
  Projekts; die Speicherpfade nennt der Nachbar nicht.
  **(g) KANDIDATEN — KEINE EMPFEHLUNG, KEINE AUSWAHL:**
  · (K1) `handleCredentialsSaved` und `handleCredentialsRemoved` holen den Testzustand neu;
  · (K2) die Speicher-Action gibt den Testzustand in ihrem Ergebnis mit;
  · (K3) `testModes` wird beim Projektwechsel auf `null` gesetzt, bevor der Abruf läuft;
  · (K4) nach `saveProject` wird neu geholt, für den Kennungs-Pfad.
  **(h) DER ANLASS — OWNER-BEOBACHTUNG vom 2026-09-14, und der Code widerspricht ihr in einem
  Punkt.** Beobachtet: In frisch angelegten Projekten fehlte der Abschnitt an meta, tiktok und
  pinterest; nach einem Wechsel in ein anderes Projekt und zurück war er bei meta da, obwohl
  bei keinem der drei Zugangsdaten hinterlegt waren. NACH DEM CODE kann der Abschnitt bei meta
  nicht erscheinen, ohne dass eine meta-Zeile in `project_secrets` existiert. ZWEI MÖGLICHE
  AUFLÖSUNGEN: Eine solche Zeile bestand doch — aus einem früheren Speichern, oder weil eine
  Zeile ohne Zugangsdatum möglich ist (ungemessen) —, ODER sichtbar war das Fenster aus (c) mit
  dem Zustand des anderen Projekts. WELCHE ZUTRIFFT, IST AM REPO NICHT ENTSCHEIDBAR und
  ausdrücklich nicht erhoben; die Reihenfolge der Handlungen ist eine Erinnerung, keine
  Messung.
  PROVENIENZ: (a), (b) und die Code-Aussagen unter (c) und (h) GEMESSEN am Code (CC,
  2026-09-14, Stand `7516bce` — seither kein Commit unter `src/`); die Folge unter (c) eine
  ABLEITUNG, nicht gelaufen; der Nachbar GELESEN; die Beobachtung OWNER-ANGABE; Trigger,
  Einordnung und Begründung unter (d) und (e) ARCHITEKT-ANGABE (2026-09-14).

**AUS DEM PHASENENDE 11.5 GEHOBEN (2026-09-16) — SIEBEN POSTEN.** Aus dem Vorrat der
Standdatei der Phase 11.5 (Einwilligungs-Dialog). **DIE URSPRUNGS-NUMMERN STEHEN JE AM
POSTEN**, nicht im Stub von CLAUDE.md — sie sind Nummern einer Datei, die mit der
Archivierung `docs/claude-history/phase-11.5-einwilligung.md` heisst, und ein Nummern-Präfix
im Stub zeigte auf eine Ablage, die dort nicht benannt ist. **DAS KRITERIUM WAR ZWEITEILIG**
— benennbarer Trigger UND „geht sonst still kaputt"; nach dem Trigger allein wären es
fünfzehn von 22 gewesen statt sieben (GEMESSEN, CC, 2026-09-16). Die übrigen liegen in
docs/claude-history/backlog-polish.md; einer ist gestrichen, sein Beleg steht an seiner
Nummer in der Standdatei.

- UNSER EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN — ZWEI WEGE, DIE GETRENNT
  BLEIBEN (aus Vorrat (2) und (12) der Phase 11.5): Die Roadmap-Zeile 11.5 bindet
  ausdrücklich: „Ein Betreiber mit eigenem CMP darf NIE von unserem abhängen." Zwei Wege
  brechen diese Bindung, beide STILL — der Betreiber sieht keinen Fehler, sein Urteil wird
  nur nicht mehr befolgt. **SIE HABEN VERSCHIEDENE URSACHEN UND VERSCHIEDENE TRIGGER; wer sie
  zusammenzieht, hält den Posten für erledigt, sobald einer davon behoben ist.**
  **(1) DER ASYNCHRON GESETZTE FREMD-HOOK WIRD VON DER PRÜFUNG NICHT ERFASST.** Setzer und
  Wiederherstellung prüfen `window.pagesmithConsent !== undefined` und schreiben nur dann
  nicht (bindende Entscheidung (3); `buildConsentDenyScript`, `buildConsentRestoreScript`,
  GEMESSEN am Code, CC, 2026-09-12). Ein CMP, das den Hook erst NACH dem Seitenaufbau setzt —
  nachgeladen, ereignisgesteuert, verzögert —, hat zu diesem Zeitpunkt nichts gesetzt: Unser
  Setzer schreibt, und **der erste Seitenaufruf ist durch**, bevor das fremde Urteil vorliegt.
  **UNGEMESSEN** — weder ist erhoben, wie verbreitet diese Bauform bei CMPs ist, noch, was in
  diesem Fall tatsächlich geschieht. Hier steht, dass die Prüfung den Fall nicht abdeckt,
  nicht, wie oft er eintritt.
  **(2) `write()` WEICHT EINEM GESETZTEN FREMD-HOOK NICHT AUS.** Der
  Wiederherstellungs-Block prüft den Hook und weicht aus; `write()` setzt ihn bei Erfolg
  UNBEDINGT (`buildConsentRestoreScript`, GEMESSEN am Code, CC, 2026-09-14). **Das ist die
  Kehrseite der bindenden Entscheidung (11)**, ohne die die Erst-Conversion jedes Besuchers
  verloren ginge — die Entscheidung ist richtig, ihre Kehrseite bleibt offen.
  **ABGRENZUNG ZUM LIVE-NACHWEIS DER SCHEIBE 11.5b, Schritt 6:** Dort GEWINNT das fremde CMP
  je Schlüssel — aber nur, weil in jenem Schritt allein die WIEDERHERSTELLUNG lief. Der
  `write()`-Weg ist damit nicht geprüft.
  **MILDERND UND NICHT ERHOBEN:** Die Schnittstelle existiert nur bei eingeschaltetem
  Schalter, und ein Betreiber mit eigenem CMP liefert sie vermutlich nicht aus — **ob das
  trägt, ist nicht erhoben.** Genau deshalb bleibt der Posten offen.
  **ZWEI TRIGGER, je einzeln hinreichend, beide spätestens vor einem Beta-Launch mit fremden
  Nutzern:** für (1) der erste Betreiber, der ein asynchron setzendes CMP mitbringt UND
  unseren Schalter einschaltet; für (2) der erste Betreiber, der ein eigenes CMP mitbringt UND
  unseren Dialog einschaltet — dort genügt schon ein Besucher-Klick.
  **WAS STILL KAPUTTGEHT:** Eine Einwilligung, die der Besucher beim fremden CMP verweigert
  hat, wird befolgt oder nicht — und nichts auf der Seite, im Dashboard oder in einem Log
  sagt, welcher der beiden Fälle vorliegt.
  **KEINE EMPFEHLUNG**, weder zu einer Erkennung noch zu einer Verzögerung noch dazu, ob das
  überhaupt zu lösen ist.
  **ZEIGER 2026-09-22 (Phase 11.11, Scheibe 11.11b) — DER BETREIBER SIEHT DIE KOLLISION
  JETZT, UND DER POSTEN IST DAVON NICHT GESCHLOSSEN.** Seit dem Bau-Commit `6d6ab42` steht
  am Einwilligungs-Schalter im Bereich VERÖFFENTLICHEN ein Hinweis, sobald im Code des
  Projekts ein fremdes Einwilligungs-Werkzeug erkannt ist UND unsere Leiste oder unser
  Fenster eingeschaltet ist (`FOREIGN_CMP_COLLISION`, `src/lib/foreign-scan.ts`, gerendert
  in `src/components/PublishView.tsx`; GEMESSEN am Code, CC, 2026-09-22).
  **ES IST EIN SIGNAL UND KEINE LÖSUNG** — so ausdrücklich die Entscheidung, unter der es
  gebaut ist. **DIE ZWEI WEGE OBEN SIND VON EINER ANZEIGE IM EDITOR UNBERÜHRT:** der
  asynchron gesetzte Fremd-Hook wird von der Prüfung weiterhin nicht erfasst, und `write()`
  weicht einem gesetzten Fremd-Hook weiterhin nicht aus. **BEIDE TRIGGER GELTEN
  UNVERÄNDERT.** Wer die Anzeige für die Behebung hält, streicht einen Posten, der weiter
  besteht.
  **EINE GRENZE DER ANZEIGE GEHÖRT DAZU: SIE LIEST NUR DIE AKTIVE VARIANTE.** Steht das
  fremde Werkzeug allein in Variante B, erscheint der Hinweis nicht — auch bei
  eingeschaltetem Dialog (GEMESSEN am gebauten Stand, CC, 2026-09-21; geführt als Vorrat
  P11.11-7 der Phase 11.11, seit dem 2026-09-22 in
  docs/claude-history/backlog-polish.md). **Der Schalter selbst gilt BEIDEN Varianten** —
  der Betreiber entscheidet dort für die ganze Seite und bekommt eine Auskunft, die nur die
  halbe gesehen hat.
  PROVENIENZ: die zwei Prüfungen und ihr Fehlen GEMESSEN am Code (CC, 2026-09-12 bzw.
  2026-09-14); die Bindung GELESEN an docs/roadmap.md, Roadmap-Zeile 11.5. Die Zusammenlegung
  zu EINEM Posten mit zwei Ursachen ist die Hebung des Phasenendes 11.5 (2026-09-16).

- DER EINWILLIGUNGS-HOOK IST AN KEINER FÜR EINEN BETREIBER ERREICHBAREN STELLE BESCHRIEBEN
  (aus Vorrat (3) der Phase 11.5) (Trigger: der erste fremde Betreiber, der ein eigenes
  Consent-Management anbinden will — spätestens vor einem Beta-Launch mit fremden Nutzern):
  „Ein fremdes CMP bleibt einbindbar" (Owner-Entscheidung 2026-08-12, Roadmap-Zeile 11.5) ist
  damit **technisch wahr und praktisch unbenutzbar**: Es gibt keinen Ort, an dem ein Betreiber
  erführe, dass es `window.pagesmithConsent` gibt, wie er heisst, welche Gestalten er annehmen
  darf und welche Schlüssel er bedienen muss. **Die vollständige Beschreibung steht
  ausschliesslich als Kommentarkopf über `buildConsentRuntime` (`src/lib/tracking/consent.ts`)
  — und dorthin kommt kein Betreiber** (GEMESSEN am Repo, CC, 2026-09-16).
  **WAS STILL KAPUTTGEHT:** Der Betreiber sieht keinen Fehler. Er sucht, findet nichts,
  und bindet sein CMP entweder gar nicht an oder setzt den Hook falsch — und im zweiten Fall
  ist die Wirkung fail-closed, also ein verstummtes Tracking ohne Meldung.
  **DIE AUSGANGSLAGE HAT SICH SEIT 11.5d VERSCHOBEN, und das ist der operative Teil:** Der
  Posten beschrieb ursprünglich „es gibt keinen Text über die Einwilligung". Heute gilt „es
  gibt Text über die Einwilligung, aber keinen über den Hook" — `src/components/PublishView.tsx`
  trägt seit `7516bce` nutzersichtbaren Text im Bereich VERÖFFENTLICHEN (Überschrift
  „Einwilligung", drei Options-Beschreibungen, der Hinweis bei unbekanntem Wert, der Satz,
  dass unsere Leiste oder unser Fenster bei einem bereits eingebundenen fremden
  Einwilligungs-Werkzeug ZUSÄTZLICH erscheint, und seit `6d6ab42` der Kollisionshinweis, der
  genau diesen Fall im Code des Projekts erkennt), seit `e061d7b` dazu den Abschnitt
  „Widerruf" (GEMESSEN am Repo, CC, 2026-09-16; die zwei letzten Angaben CC, 2026-09-22).
  **DIE AUFZÄHLUNG IST AM 2026-09-22 ERSETZT UND NICHT GESTEMPELT:** Sie führte „der Satz
  über ein nicht erkanntes Consent-Management" — den gibt es seit der Scheibe 11.11b nicht
  mehr, er ist dort als FALSCH ersetzt worden, weil die Erkennung ihn widerlegt. Eine
  Bestandsaufnahme mit einem Element, das es nicht mehr gibt, ist als Ausgangslage
  unbrauchbar.
  **AM GEGENSTAND DIESES POSTENS ÄNDERT DAS NICHTS, UND EIN NAHELIEGENDER FEHLSCHLUSS GEHÖRT
  ABGEWEHRT:** `src/components/PublishView.tsx` nennt seit dem Abschnitt „Widerruf" SEHR WOHL
  einen globalen Namen — `pagesmithConsentRevoke()`, zweimal, im Fliesstext und im
  Beispiel-Schnipsel (GEMESSEN, CC, 2026-09-22). **DAS IST DIE WIDERRUFS-FUNKTION UND NICHT
  DER EINWILLIGUNGS-HOOK.** `window.pagesmithConsent` — der Hook, um den es hier geht, samt
  seinen Gestalten und seinen Schlüsseln — kommt in KEINER Komponente vor (NULL Treffer über
  `src/components/`, Positivkontrolle im selben Lauf: der Name existiert im Repo, in sechs
  Dateien unter `src/`). **DER POSTEN BLEIBT OFFEN.**
  **DAS SIND ZWEI VERSCHIEDENE AUSGANGSLAGEN FÜR DIESELBE
  ARBEIT:** Die erste verlangt, einen Ort zu schaffen; die zweite verlangt, einen bestehenden
  Ort zu ergänzen.
  **DIE ABGRENZUNG ZUM POSTEN „BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE":** Dessen drei
  Punkte betreffen andere Gegenstände — den Dialog, die Grenze der Deduplizierung, den
  Testmodus —, **weder den Hook noch den Widerruf** (GELESEN, CC, 2026-09-15). Wer diesen
  Posten dort einsortiert, hängt ihn an einen Trigger, der später kommt als seiner.
  **KEINE EMPFEHLUNG**, wo die Beschreibung liegt und welche Form sie hat.
  PROVENIENZ: der Nicht-Treffer und die Verschiebung der Ausgangslage GEMESSEN am Repo (CC,
  2026-09-12 und 2026-09-16); die Einordnung „gehört in diese Phase, aber nicht in die erste
  Scheibe" war ARCHITEKT-ENTSCHEIDUNG 2026-09-12.

- DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST — UND ES GEHT UM CONVERSIONS,
  NICHT NUR UM SEITENAUFRUFE (aus Vorrat (4) der Phase 11.5) (Trigger: die erste exportierte,
  fremd gehostete Seite eines Projekts mit Tracking-Schlüssel und eingeschaltetem Dialog —
  spätestens vor einem Beta-Launch mit fremden Nutzern): **Der Download und das Kopieren in
  die Zwischenablage bauen den Text rein clientseitig und gehen nie durch die
  Server-Injektion** — Setzer, Wiederherstellung, Dialog-Block und Widerruf entstehen dort
  nicht (GEMESSEN am Code, CC, 2026-09-12).
  **DAS LOCH IST GRÖSSER, ALS ES BEIM PAGEVIEW-EMITTER AUSSIEHT, und darum geht es:** Eine
  exportierte Seite trägt sehr wohl das **WIRING** — bei Mappings erzeugt der Client-Erzeuger
  Gate, Datenblock und Wiring auch im Export-Modus. Trägt das Projekt einen
  Tracking-Schlüssel, **beacont ein Klick auf die ABSOLUTE Adresse `/api/e`**, mit einem
  `cns`-Feld aus dem Client-Erzeuger; seit der achten Scheibe der Phase 11 hängt dieser
  Beacon nicht mehr an einer Meta-Pixel-ID (GEMESSEN am Code, CC, 2026-09-12).
  **WAS STILL KAPUTTGEHT:** Ohne gesetzten Hook gilt auf einer exportierten, fremd gehosteten
  Seite „alles erlaubt". Der Betreiber hat den Schalter eingeschaltet, sieht ihn eingeschaltet
  — **und auf der exportierten Seite wirkt er nicht.** Es gibt keinen Fehler und keinen
  Hinweis; es gehen Conversions ohne Einwilligung hinaus.
  **KEINE REGRESSION** — der PageView-Emitter fehlt dort heute schon —, aber ein **Loch im
  Versprechen**. Der Nachweis JEDER Scheibe dieser Phase führt den Export-Pfad unter seinen
  Grenzen.
  **KEINE EMPFEHLUNG**, ob der Export den Schalter tragen soll, ob er ihn verweigern soll oder
  ob ein Hinweis genügt.

- `settingsEqual` IST EINE ALLOWLIST — JEDES NEUE MITGLIED DES EINSTELLUNGS-BLOBS IST FÜR
  `dirty` UNSICHTBAR BY DEFAULT, AUCH INNERHALB EINES UNTEROBJEKTS, UND NICHTS WIRD DAVON
  ROT (aus Vorrat (5) der Phase 11.5, erweitert 2026-09-18 aus Vorrat P11.13-1 der Phase
  11.13) (Trigger: die nächste Runde, die dem Einstellungs-Blob ein Mitglied hinzufügt — auf
  OBERSTER EBENE oder INNERHALB eines Unterobjekts wie `settings.consent`): Die Funktion
  (`src/lib/settings.ts`) ZÄHLT AUF, was sie vergleicht. Wer ein Mitglied hinzufügt und den
  Vergleich nicht mitzieht, bekommt **keinen Typfehler, keinen roten Test, keine Meldung** —
  nur einen Wert, der beim nächsten Projektwechsel still verschwindet: kein Text
  „Ungespeicherte Änderungen", kein `beforeunload`-Wächter, kein `confirm`.
  **DIE ERWEITERUNG AUF DIE UNTEROBJEKT-EBENE IST EINE SACHKORREKTUR DES TRIGGERS, KEIN
  ZWEITER POSTEN** — Titel und Trigger sind ERSETZT, nicht gestempelt: Ein Massstab mit
  falschen Angaben taugt nicht als Massstab (docs/immer-beachten.md, EINE REGEL KANN GÜLTIG
  BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD). **WAS AN DER ALTEN FASSUNG FALSCH WAR:** Sie nannte
  ausdrücklich ein TOP-LEVEL-Mitglied und deckte den häufigeren Fall damit nicht.
  **DER BELEG IST GEMESSEN UND FÜNFFACH GELEBT** (CC, 2026-09-17 und -18, Phase 11.13): Die
  Phase hat dem Unterobjekt `settings.consent` FÜNF Mitglieder hinzugefügt — `theme`,
  `colorBackground`, `colorText`, `text` und `language` —, und **jedes einzelne brauchte
  seinen eigenen Term in `settingsEqual`**, weil es sonst für `dirty` unsichtbar geblieben
  wäre. Die bindenden Entscheidungen P11.13-6, -19, -26 und -37 der Phase halten das je Feld
  fest; keine von ihnen löst die KLASSE.
  **WARUM DIE KLASSE OFFEN BLEIBT, obwohl fünf Felder versorgt sind:** Die Funktion zählt
  weiter auf. Das SECHSTE Feld ist wieder unsichtbar, und der Preis ist derselbe — ein Wert,
  den der Betreiber getippt hat und der ohne Warnung verschwindet.
  **DER WÄCHTER ZUM EINWILLIGUNGS-SCHALTER SCHLIESST DIE KLASSE NICHT:** S3 hält genau diesen
  einen Term, nicht das nächste Mitglied. Dass der Term überhaupt nötig war, steht als
  bindende Entscheidung (6) der Phase 11.5 — dort ist er ausdrücklich „keine Politur, sondern
  die Bedingung dafür, dass der Schalter überhaupt hält".
  **DIE VERWANDTE BAUFORM, beim Titel genannt:** der Posten „DIE IDOR-WÄCHTER SIND
  NAMENTLICH — EINE NEUE SERVER-ACTION IST UNGESCHÜTZT BY DEFAULT, UND NICHTS WIRD DAVON ROT"
  in dieser Datei. Dieselbe Figur an einer anderen Achse: ein namentlicher Schutz, der beim
  nächsten Zuwachs nicht mitwächst. **Wer den einen löst, liest den anderen mit.**
  **STAND 2026-09-19 (Phasenende 11.6) — DER TRIGGER IST EIN SECHSTES MAL EINGETRETEN UND
  ABGEARBEITET; DIE KLASSE BLEIBT OFFEN.** Die Scheibe 11.6a hat dem Blob ein Mitglied auf
  OBERSTER EBENE hinzugefügt (`customPixel`, mit `code` darin), und der Term ist im selben
  Commit gebaut: `getCustomPixelCodeRaw(a) === getCustomPixelCodeRaw(b)` in `settingsEqual`
  (Bau-Commit `bc001f4`), gehalten vom Wächter T11 in
  `src/lib/tracking/custom-pixel.test.ts`.
  **ER IST SKALAR UND NICHT DAS ERGEBNIS DES LESERS, und das ist keine Feinheit:**
  `getCustomPixelCode` liefert ein OBJEKT (diskriminierte Union); ein `===` darauf vergliche
  REFERENZEN und meldete nach jedem `setSettings` dauerhaft dirty. Verglichen wird deshalb
  die skalare Rohfassung — dieselbe Bauform und derselbe Grund wie bei den Farb-Termen.
  **WARUM DER POSTEN TROTZDEM OFFEN BLEIBT:** Die Funktion zählt weiter auf. Das SIEBTE
  Mitglied ist wieder unsichtbar, und der Preis ist unverändert. **Die Zählung „fünffach
  gelebt" darüber ist damit auf SECHS gestiegen** — der Absatz bleibt wörtlich, er ist
  datiert und nicht falsch.
  **KEINE EMPFEHLUNG**, ob `settingsEqual` strukturell vergleichen soll — das ist zugleich die
  Kipp-Bedingung der Entscheidungen (6) und (15) jener Phase.

- EIN EINGESCHALTETER EINWILLIGUNGS-DIALOG OHNE ZUSTIMMUNG SIEHT AUS WIE KAPUTTES TRACKING —
  UND ZWAR AN DREI STELLEN GLEICHZEITIG (aus Vorrat (9) der Phase 11.5) (Trigger: der erste
  fremde Nutzer, der den Dialog einschaltet — für den Owner BEREITS EINGETRETEN, s. den Beleg):
  Steht der Schalter an und hat niemand eingewilligt, geht **nichts** hinaus: nichts intern,
  nichts beim Anbieter, nichts im Dashboard. **NICHTS MELDET DIE URSACHE.** Es gibt keinen
  Fehler, keine leere Seite, keine Zeile — der Zustand ist ausschliesslich **am
  ausgelieferten Quelltext** oder **am Schalter selbst** zu erkennen.
  **BELEG: OWNER-VORFALL vom 2026-09-12**, aufgelöst erst, nachdem der Quelltext der
  Live-Seite angesehen wurde. Das ist der Punkt: Der Weg zur Ursache führte über eine Stelle,
  die niemand routinemässig ansieht.
  **DIE VERSCHÄRFUNG, DIE DERSELBE VORFALL GEZEIGT HAT:** Läuft gleichzeitig ein Testmodus,
  sind **DREI** Zustände nicht mehr auseinanderzuhalten — abgelehnte Einwilligung, laufender
  Testmodus und echter Defekt. **ZWEI DAVON SIND KORREKTES VERHALTEN**, und keiner der drei
  meldet sich.
  **WO DIE DREI TATSÄCHLICH ZUSAMMENFALLEN — GEMESSEN (CC, 2026-09-12), damit der Posten
  nicht mehr behauptet, als er trägt:** In der **internen Ablage** und damit im **Dashboard**
  fallen sie zusammen; `testModusAktiv` (`src/lib/capi/ingest.ts`) riegelt beide
  `schedulePersist`-Aufrufe ab, und ein ausbleibender Beacon erzeugt ohnehin keine Zeile.
  **BEIM ANBIETER NICHT ZWINGEND:** Der Testmodus gatet den Forward nicht — dort hängt es am
  Ziel, ob ein markiertes Ereignis sichtbar wird.
  **DIE NACHBARN IN DIESER DATEI, und sie lösen ihn nicht ab:** „NACH DEM ENDE EINES TESTMODUS
  ERKLÄRT NICHTS DIE LÜCKE IN DER EIGENEN KURVE" handelt vom Testmodus allein und von der Zeit
  DANACH; Punkt (3) des Postens „BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" verlangt eine
  Beschreibung dessen, was der Testmodus bewirkt. **KEINER VON BEIDEN NENNT DEN
  EINWILLIGUNGS-DIALOG als eine der Ursachen.**
  **KEINE EMPFEHLUNG**, ob und was dagegen zu bauen wäre.

- KEIN TEST LÄSST EINEN WURF BIS IN EINEN KNOPF-HANDLER DER EINWILLIGUNGS-OBERFLÄCHEN DURCH
  (aus Vorrat (15) der Phase 11.5) (Trigger: die nächste Runde, die am Klick-Handler von
  Leiste oder Modal, an `CONSENT_CHOICE_JS` oder an `write()` arbeitet) — **EINGETRETEN UND
  ERLEDIGT mit der Scheibe 11.13a (2026-09-17).**
  **GEDECKT DURCH L22 UND M23** (`src/lib/tracking/consent-bar.test.ts` bzw.
  `consent-modal.test.ts`, Commit `bb9f045`): Sie ersetzen `window.__psConsentStore.write`
  durch eine werfende Funktion, klicken „Ablehnen" und halten fest, dass der Wurf das
  `error`-Ereignis des Fensters erreicht UND keine Oberfläche stehenbleibt — genau der Fall,
  den der Posten als ungeprüft führte; Positivkontrolle im selben Lauf.
  BELEG: GEMESSEN am Code (CC, 2026-09-17); der ungekürzte Wortlaut des Postens steht im
  Commit davor.
  DER STUB IN CLAUDE.md IST AM 2026-09-25 ENTFERNT (Sichtung beim Phasenende 11.7) — er
  stand dort als erledigt weiter. L22 und M23 existieren (GEMESSEN, CC, 2026-09-25).

- DER CONSENT-GATE-BLOCK HAT ZWEI ERZEUGER — UND SIE LAUFEN BEREITS AUSEINANDER (aus Vorrat
  (16) der Phase 11.5) (Trigger: die nächste Änderung am INHALT des Gate-Blocks an einem der
  beiden Erzeuger — die reine Hüllen-Divergenz von heute ist harmlos und ist NICHT der
  Trigger): **ZWEI STELLEN BEANTWORTEN DIESELBE FRAGE** (GEMESSEN am Code, CC, 2026-09-15):
  · **DER CLIENT**, wenn Mappings existieren: `generateFunctional` (`src/lib/generate.ts`)
    legt ein `<script>` an, setzt `id` auf `CONSENT_SCRIPT_ID` und `textContent` auf
    `buildConsentRuntimes()`; das Dokument wird serialisiert.
  · **DER SERVER** als Rückfall, wenn das Dokument den Block nicht trägt:
    `injectPageViewEmitter` fügt über `hasConsentScript` den String aus `buildConsentScript()`
    (`src/lib/tracking/consent.ts`) ein — mit einem Zeilenumbruch nach dem öffnenden Tag und
    einem vor `</script>`.
  · **DER INHALT HAT EINE QUELLE, DIE HÜLLE ZWEI:** Beide rufen `buildConsentRuntimes()`; die
    Zeilenumbrüche stehen allein in der String-Hülle des Servers.
  DIE MESSUNG (CC, 2026-09-15, Wegwerf-Skript ausserhalb des Repos): Server **792 Bytes**,
  sha256 `5282ddbf…`; Client **790 Bytes**, sha256 `854831d2…`; die Server-Form ohne die zwei
  Zeilenumbrüche ist mit der Client-Form ZEICHENGLEICH. Die GRENZE: serialisiert hat jsdom,
  nicht der Browser des Editors.
  **HEUTE HARMLOS** — Leerraum ausserhalb des Codes wirkt nicht. **DER BEFUND IST, DASS ZWEI
  STELLEN DIESELBE FRAGE BEANTWORTEN UND BEREITS AUSEINANDERLAUFEN.**
  **WAS STILL KAPUTTGEHT, SOBALD DER TRIGGER EINTRITT:** Der Gate-Block trägt `__psConsent`
  und `__psConsentAll` — die Laufzeit-Funktionen, an denen JEDES Einwilligungs-Urteil hängt.
  Wer eine davon an EINEM der beiden Erzeuger ändert, bekommt Seiten MIT Mappings und Seiten
  OHNE Mappings mit verschiedenem Urteil, und **kein Gate meldet das**: Die Erzeuger sind
  getrennte Symbole, die Tests prüfen sie einzeln, und der Unterschied zeigt sich erst am
  ausgelieferten Text zweier verschiedener Projekte.
  **SICHTBAR WIRD DIE HEUTIGE DIVERGENZ an jedem Byte-Vergleich über eine Mapping-Änderung
  hinweg:** Bekommt eine Seite ihre erste Zuweisung, wechselt der Erzeuger des Gate-Blocks,
  und der Block wird zwei Bytes kürzer — so geschehen an einer realen Seite im Live-Nachweis
  der Scheibe 11.5d-2.
  VERWANDT: die bindende Entscheidung (2) der Phase 11.5 begründet, WARUM es den
  Server-Rückfall gibt; Entscheidung (14) führt eine zweite Erzeugungsstelle für denselben
  Baustein als Divergenz-Bauform. **KEINE EMPFEHLUNG**, welcher der beiden Erzeuger bleibt.

**AUS DEM PHASENENDE 11.12 GEHOBEN (2026-09-17) — ZWEI POSTEN.** Aus dem Vorrat der
Standdatei der Phase 11.12 (Vorschau-Blocker). **DIE URSPRUNGS-NUMMERN STEHEN JE AM POSTEN**
und tragen das Phasen-Präfix `P11.12-n`, das jene Phase eingeführt hat — ein Zeiger darauf
bleibt auch nach der Archivierung eindeutig, weil die Phasennummer nie neu vergeben wird.
**DAS KRITERIUM WAR ZWEITEILIG** — benennbarer Trigger UND „geht sonst still kaputt". Es
trennt hier scharf: von vier Vorrats-Einträgen tragen zwei beides, einer ist reine
Doku-Hygiene (das Verhalten bleibt richtig), und einer verweigert einen Trigger
AUSDRÜCKLICH im eigenen Text. Die übrigen zwei liegen in
docs/claude-history/backlog-polish.md; **gestrichen ist keiner.**

- NETZANFRAGEN MIT URSPRUNG `null` SIND IN DER VORSCHAU NICHT LÖSBAR (aus Vorrat P11.12-1
  der Phase 11.12; Trigger: die erste importierte Seite, deren INHALT von einer fremden
  Schnittstelle kommt — für NEBENANFRAGEN ist er bereits belegt, s. unten):
  Eine Seite, die ihren Inhalt von einer fremden Schnittstelle nachlädt, bleibt im
  Vorschau-Rahmen leer. Der Ursprung ist opak (`location.origin === "null"`, GEMESSEN CC,
  2026-09-17), und die Gegenstelle lehnt die Anfrage ab. **Der Kompatibilitäts-Riegel der
  Scheibe 11.12a erreicht das NICHT** — er ersetzt Speicher-Schnittstellen, keine Netzwege.
  **WARUM ES STILL KAPUTTGEHT:** Der Betreiber sieht einen leeren Rahmen und kann nichts
  verdrahten. Es gibt keine Meldung, die ihm sagt, dass die Ursache eine abgelehnte
  Netzanfrage ist und nicht sein HTML. Genau dieses Bild hat am 2026-09-14 die Phase 11.12
  ausgelöst — der Riegel hat die eine Ursache beseitigt, diese bleibt.
  **WAS BELEGT IST UND WAS NICHT:** Dass eine Anfrage mit Ursprung `null` abgelehnt wird,
  ist an der gesicherten Konsole vom 2026-09-17 belegt — eine 403 an den Fehlerdienst der
  Seite (Sentry, am Dateinamen ABGELESEN). **Das war eine NEBENanfrage, keine
  Inhalts-Anfrage;** dass eine Seite existiert, deren INHALT so nachlädt, ist NICHT belegt.
  Ob und wie viele importierte Seiten betroffen sind, ist nicht erhoben.
  **UNGEMESSEN BLEIBT AUCH**, ob die 403 nach der Scheibe 11.12a fortbesteht — der Live-Test
  jenes Tages sah allein auf die drei Speicher-Würfe.
  PROVENIENZ: die Ablehnung OWNER-ANGABE 2026-09-14, die Konsolen-403 OWNER-ANGABE
  2026-09-17; der opake Ursprung GEMESSEN (CC, 2026-09-17); dass der Riegel sie nicht
  erreicht, ist eine ABLEITUNG aus seinem Gegenstand, keine Messung.

- `indexedDB` WIRFT IM VORSCHAU-RAHMEN WEITER (aus Vorrat P11.12-3 der Phase 11.12;
  Trigger: die erste reale Seite, die in der Vorschau NACHWEISLICH an `indexedDB` stirbt):
  Der Riegel der Scheibe 11.12a deckt `indexedDB` ausdrücklich nicht
  (ARCHITEKT-ENTSCHEIDUNG 2026-09-17). GEMESSEN ist, dass `indexedDB.open` im Sandkasten
  weiterhin einen `SecurityError` wirft — **mit einem ANDEREN Wortlaut** als bei `cookie`
  und `localStorage` (`access to the Indexed Database API is denied in this context`). Wer
  nach dem bekannten Wortlaut sucht, findet ihn nicht.
  **WARUM ES STILL KAPUTTGEHT:** Eine importierte Seite, die `indexedDB` beim Laden anfasst,
  stirbt in der Vorschau weiter — dasselbe Bild wie vor der Scheibe 11.12a, nur aus einer
  anderen Ursache. Der Betreiber sieht einen leeren Rahmen; dass der Riegel hier nicht
  greift, steht nirgends, wo er es lesen würde.
  **VORBEREITETER SCHRITT, falls der Trigger eintritt:** eine Attrappe, deren `open()` nicht
  wirft, sondern den asynchronen Fehlerweg bedient (`onerror`). **ABLEITUNG, NICHT
  GEMESSEN** — ob eine Bibliothek ohne Fehlerpfad dann HÄNGT statt zu sterben, ist offen,
  und ein Hänger ist schwerer zu finden als ein Wurf. **KEINE EMPFEHLUNG**, ob er gebaut wird.
  **WAS HEUTE NICHT BELEGT IST:** dass irgendeine reale Seite `indexedDB` überhaupt anfasst.
  Der Nicht-Treffer in der gesicherten Vorher-Konsole taugt dafür nicht — nach dem Absturz
  lief kein weiterer Code, ein späterer Zugriff wäre verdeckt gewesen.
  PROVENIENZ: die Entscheidung ARCHITEKT 2026-09-17; der Wurf und sein Wortlaut GEMESSEN
  (CC, 2026-09-17, Proben M1 und N4); der vorbereitete Schritt eine ABLEITUNG.

- EIN EIGENER SACHTEXT ÜBERLEBT DEN SPRACHWECHSEL — ZEHN TEXTE WECHSELN, EINER BLEIBT, UND
  NICHTS ZEIGT ES AN (aus der bindenden Entscheidung P11.13-34 der Phase 11.13) (Trigger:
  der erste Betreiber, der die Sprache umstellt und einen eigenen Sachtext gespeichert hat —
  spätestens vor einem Beta-Launch mit fremden Nutzern):
  Die Sprache ist fest je Projekt, und der eigene Sachtext liegt in **einem** Feld, das für
  jede Sprache gilt. Wer von Deutsch auf Englisch umstellt, bekommt die **zehn** übrigen
  Textplätze des Einwilligungs-Dialogs englisch und seinen **eigenen** Satz weiter deutsch.
  **DAS IST DIE ZUGESAGTE WIRKUNG UND KEIN DEFEKT** — offen ist, dass es niemand erfährt.
  **WARUM ES STILL KAPUTTGEHT:** Es gibt keine Meldung, keinen Hinweis und keinen roten Test.
  **DER PLATZHALTER HILFT AUSDRÜCKLICH NICHT** — er folgt zwar der Sprache, ist aber nur bei
  LEEREM Feld sichtbar; wer einen eigenen Satz gespeichert hat, sieht ihn nie. Sichtbar wird
  der Zustand allein, wenn jemand die ausgelieferte Seite Text für Text liest.
  **WEN ES TRIFFT:** den Besucher, der einen Dialog in zwei Sprachen vor sich hat — und den
  Betreiber, der die Ursache nicht am Sprachschalter vermutet, weil dieser nachweislich
  gewirkt hat.
  **WAS NICHT DER GEGENSTAND IST:** eine Automatik nach `navigator.language`. Sie ist mit
  Gründen und gemessenen Kosten VERWORFEN (bindende Entscheidung P11.13-35 der Phase 11.13),
  ausdrücklich ohne Trigger und ohne Vorrats-Eintrag. Wer diesen Posten löst, löst ihn nicht
  über eine Laufzeit-Erkennung.
  **DIE ANGRENZENDE ENTSCHEIDUNG, die mitgelesen werden muss:** Ein eigener Sachtext JE
  SPRACHE ist heute ausgeschlossen, weil er die flache, skalare Ablage aus P11.13-19 bräche.
  Das ist die Kipp-Bedingung von P11.13-34 — **wer sie zieht, entscheidet zuerst die Ablage
  neu und den `settingsEqual`-Term mit.**
  **KEINE EMPFEHLUNG**, ob ein Hinweis gebaut wird, wo er stünde und ob er den Betreiber oder
  den Besucher adressiert.
  PROVENIENZ: Die Entscheidung ist ARCHITEKT 2026-09-18. Dass der eigene Sachtext an der
  Einsetzstelle immer gewinnt und keine Stelle seine Sprache kennt, ist GEMESSEN am Code
  (CC, 2026-09-18, VERMERK P11.13-9 der Phase 11.13, Punkt (f)); dass der Betreiber die
  Sprach-Mischung für einen Fehler hält, ist eine ABLEITUNG und ungemessen.

- EIN SCROLLBALKEN BRICHT DAS GLEICHRANGIGKEITS-KRITERIUM DES EINWILLIGUNGS-DIALOGS BEI
  360 px — UND ZWAR IM BESTAND (aus Vorrat P11.13-6 der Phase 11.13) (Trigger: die nächste
  Runde, die an Knopfbreite, Innenbreite oder Umbruch der eingeklappten Gestalt arbeitet —
  spätestens vor einem Beta-Launch mit fremden Nutzern):
  Bei **Leiste / 360×480 / eingeklappt / lange Seite** teilt der Weg „Einstellungen" seine
  Reihe mit GENAU EINEM der zwei Knöpfe. **Damit ist die bindende Entscheidung P11.13-5 der
  Phase 11.13 verletzt** — „Alle akzeptieren" steht allein, „Ablehnen" teilt seine Reihe, und
  der zweite liest sich als nachrangig. **Das ist genau die Bauform, die der Guardrail der
  Roadmap-Zeile 11.13, Punkt (h), ausschliesst.**
  **ES IST KEINE REGRESSION EINER SCHEIBE, UND DAS IST GEMESSEN** (Gegenprobe im selben
  Werkzeug und im selben Lauf, CC, 2026-09-18): Das unveränderte helle Bestands-Thema zeigt
  denselben Befund. **URSACHE IST DER SCROLLBALKEN:** Er nimmt 15 px Innenbreite; bei 345 px
  passen zwei Knöpfe zu 160 px plus 8 px Abstand (328 px) zwar noch, der Weg aber nicht mehr
  daneben, und die Reihen brechen anders. P11.13-5 nennt die Bedingung selbst — sie ruht auf
  der Knopfbreite und der **Innenbreite** der zwei Behälter, und ein Scrollbalken ändert die
  Innenbreite.
  **WARUM ES BISHER NIEMAND SAH:** Die Probeseiten der Scheiben 11.13a und 11.13b
  **scrollten nicht**. Der Befund entsteht erst mit einer Probeseite, die lang genug ist.
  **WARUM ES STILL KAPUTTGEHT:** Kein Gate wird davon rot — die Testumgebung wertet kein CSS
  aus, und im Repo liegt keine wiederverwendbare Geometrie-Probe. Ein Betreiber sieht einen
  optisch abgewerteten Ablehnen-Knopf und hat keinen Grund, ihn zu melden.
  **DIE SPRACHE ÄNDERT DEN BEFUND NICHT** (nachgemessen in der Scheibe 11.13e, CC,
  2026-09-18): Die englische Weg-Beschriftung ist **33 px schmaler** (82 gegen 115), und die
  Verletzung bleibt — sie hängt an der Innenbreite von 345 px und an der Knopfbreite von
  160 px, nicht an der Länge des Weg-Textes.
  **WEN ES TRIFFT — UND WEN NICHT:** schmale **Desktop**-Fenster, die einen Platz nehmenden
  Scrollbalken zeichnen. **Handys zeichnen einen Überlagerungs-Scrollbalken** und nehmen
  keine Breite; dort tritt es nicht auf. Das ist eine ABLEITUNG aus der Plattform-Bauform und
  in diesem Projekt **nicht gemessen**.
  **KEINE EMPFEHLUNG**, ob überhaupt etwas geschieht — die Kandidaten reichen von „Bedingung
  des Kriteriums schärfen" bis „Knopfbreite flexibel".
  PROVENIENZ: die drei Zeilen der Gegenprobe und die Nachmessung über beide Sprachen sind
  GEMESSEN am eigenen Lauf (CC, 2026-09-18, Playwright/Chromium über `file://`); der Wortlaut
  von P11.13-5 und der Guardrail (h) GELESEN. Dass Handys einen Überlagerungs-Scrollbalken
  zeichnen, ist eine ABLEITUNG und ungemessen.

**AUS DEM PHASENENDE 11.6 GEHOBEN (2026-09-19) — EIN POSTEN.** Aus dem Vorrat der Standdatei
der Phase 11.6 (Custom-Pixel) und aus den GRENZEN des Live-Tests. DIE URSPRUNGS-NUMMERN
STEHEN AM EINTRAG; sie tragen das Phasen-Präfix `P11.6-n`. DAS KRITERIUM WAR ZWEITEILIG —
benennbarer Trigger UND "geht sonst still kaputt"; von vier Vorrats-Einträgen trägt beides
nur einer, einer ist GESTRICHEN (sein Gegenstand steht bereits zweimal im Backlog), zwei
liegen in docs/claude-history/backlog-polish.md.
DER POSTEN IST EINE OWNER-VORGABE (2026-09-19) UND BÜNDELT DREI SACHEN, DIE EINZELN JE EINEN
EIGENEN POSTEN ERGEBEN HÄTTEN: zwei Messlücken des Live-Tests und die Betreiber-Hinweise.
Sein dritter Teil steht NICHT hier, sondern als Punkt (4) am Posten
"BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" — hier zeigt er nur dorthin, damit derselbe
Gegenstand nicht zweimal geführt wird.
- CUSTOM-PIXEL: QA UND BETREIBER-HINWEISE VOR DEM LAUNCH (Trigger: vor dem öffentlichen
  Launch): Die Scheibe 11.6a ist gebaut und live bestätigt (Bau-Commit `bc001f4`, VERMERK
  P11.6-2 im Archiv der Phase). DREI DINGE FEHLEN, und keines davon hält die Phase offen —
  sie werden vor dem Launch fällig.
  (1) FIREFOX UND SAFARI/WEBKIT SIND UNGEMESSEN. Der Live-Test lief ausschliesslich in
  Chrome (OWNER, 2026-09-19). Betroffen ist JEDE Achse, zwei besonders: der
  `noscript`-Befund — also die Frage, ob ein Rückfall-Pixel jeden Seitenaufruf ein zweites
  Mal zählt — und das NACHLADEN bei später Einwilligung. Was still kaputtgeht: Beides
  scheitert LAUTLOS. Eine Doppelzählung erzeugt keinen Fehler, sondern falsche Zahlen beim
  Betreiber; ein ausbleibendes Nachladen erzeugt keinen Fehler, sondern fehlende
  Conversions. Der Parser-Befund, auf dem die Absicherung ruht, ist an jsdom gemessen und
  für echte Browser eine ABLEITUNG aus den Einfügemodi (docs/immer-beachten.md, "EIN
  `DOMParser`-DOKUMENT PARST MIT AUSGESCHALTETEM SKRIPTING").
  (2) ECHTE NETZWERK-SNIPPETS SIND UNGETESTET. Geprüft wurde mit `lodash` als Bibliothek
  und `console.log` als Ereigniszeile (OWNER, 2026-09-19) — kein Meta-, TikTok- oder
  Hotjar-Snippet. DAZU GEHÖRT EINE ZWEITE FRAGE, DIE `console.log` NICHT STELLEN KANN: ob
  die Anfrage eines Netzwerks eine WEITERLEITUNG überlebt. Die Ereigniszeile läuft
  garantiert VOR der Navigation (Wächter T4), aber was sie auslöst, ist Betreiber-Code: ein
  `fetch` ohne `keepalive` oder ein Bild-Pixel kann beim Seitenwechsel abbrechen. Unser
  eigener Beacon löst das über `sendBeacon` bzw. `keepalive` (docs/immer-beachten.md,
  "BEACON-keepalive PFLICHT"); auf fremden Code haben wir diesen Zugriff nicht. Was still
  kaputtgeht: Der Betreiber verdrahtet einen Knopf mit Weiterleitung und verliert genau die
  Conversions, für die er das Feld benutzt hat — ohne Fehler, ohne Meldung.
  (3) DIE BETREIBER-HINWEISE STEHEN NICHT HIER, SONDERN ALS PUNKT (4) AM POSTEN
  "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" in dieser Datei. Dort sind sie am
  2026-09-19 ergänzt worden: `<noscript>` ohne Wirkung · `custom` auf bestehenden Seiten
  abgelehnt bis zur neuen Besucher-Entscheidung · eine CSP ohne `unsafe-eval` legt die
  Ereigniszeile still · verschachtelte `<script>`-Elemente laufen nicht · die offene
  Weiterleitungs-Frage. ZWEIMAL GEFÜHRT WÄRE ZWEIMAL GEPFLEGT; hier steht deshalb nur der
  Zeiger.
  PROVENIENZ: die zwei Messlücken sind OWNER-ANGABEN vom 2026-09-19 (Live-Test der Scheibe
  11.6a); die Einordnung als EIN Posten mit Trigger "vor dem öffentlichen Launch" ist
  OWNER-VORGABE desselben Tages. Die Code-Belege (T4, die Kapselung, der Parser-Befund) sind
  GEMESSEN am Repo (CC, 2026-09-19).

**AUS DEM PHASENENDE 11.7 GEHOBEN (2026-09-25) — EIN POSTEN.** Aus der Standdatei der Phase
11.7 (Anbieter-Befunde nachziehen). DAS KRITERIUM WAR ZWEITEILIG — benennbarer Trigger UND
"geht sonst still kaputt". Ein neuer Posten ist daraus entstanden; seine Ursprünge stehen am
Eintrag. DREI WEITERE ERGEBNISSE DIESER HEBUNG STEHEN ALS ERGÄNZUNG AN BESTEHENDEN POSTEN und
nicht als eigene Zeile: K4 an "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN",
Ursache (3) · die Cookie-Wege und die Aufbewahrung (Zuschnitt-Fragen P11.7-2, -20 und -26) an
"CONVERSIONS AUF FOLGESEITEN TRAGEN BEI KEINEM ZIEL EINE KLICK-KENNUNG …", dessen Titel und
Trigger dabei ersetzt worden sind · die Messung zum Containment an "DREI WEGE, AUF DENEN EIN
WURF DAS 204-CONTAINMENT BRECHEN KÖNNTE". Was keinen offenen Punkt ergibt, liegt in
docs/claude-history/backlog-polish.md, Abschnitt "Aus Phase 11.7 gehoben (2026-09-25) …".
- KEINE KLICK-KENNUNG IST AN EINEM ECHTEN ANZEIGENKLICK GEPRÜFT — WEDER IHRE FORM NOCH DER
  ABGLEICH (Trigger: der erste echte Anzeigenklick je Ziel — spätestens vor echtem
  Ad-Traffic):
  DER BEFUND: Die Phase 11.7 hat an allen fünf Zielen eine Klick-Kennung gebaut oder ergänzt
  und live belegt — meta `fbc` aus `fbclid` (S5), linkedin `li_fat_id` (S6a, S6b), google
  `landingPageDeviceInfo` neben `gclid`/`gbraid`/`wbraid` (S7; die Kennungen seit der Phase
  11.2), tiktok `user.ttclid` (S8), pinterest `user_data.click_id` aus `epik` (S9). JEDER
  LIVE-BELEG FUHR EINEN ERFUNDENEN WERT (Archiv der Phase 11.7, VERMERKE P11.7-18, -20, -22,
  -24, -28, -30 und -34). Belegt sind Annahme und Erkennung beim Anbieter — NICHT die
  Zuordnung zu einem Anzeigenklick, und NICHT die Form eines echten Werts.
  ZWEI ACHSEN, DIE GETRENNT BLEIBEN:
  (1) DIE FORM. Jede Kennung wird über einen Standard-Parser aus der Adresse gelesen und
      DEKODIERT gesendet (`readClickIdExact` in `src/lib/capi/click-id-strip.ts` für die
      vier neuen, `extractGoogleClickIds` für google; GEMESSEN am Code) — ein `+` im Wert
      wird zum Leerzeichen. Für `li_fat_id` und `epik` nennt keine gelesene Quelle eine
      Formregel; für `ttclid` nennt tiktok bis 1 000 Zeichen und "nicht kürzen" (tiktok,
      Teil (j)); `fbclid` ist schreibungsempfindlich (meta, Teil (h)). Bei tiktok steht der
      Wert zusätzlich ROH in `page.url`, das der Anbieter selbst ausliest (tiktok, Teil
      (m)). Bei pinterest steht er ebenfalls roh in der Adresse, wird dort aber für Warnung
      und Anzeige NICHT erkannt (pinterest, Teil (ao)) — der dekodierte Wert im Feld ist dort
      der einzige, den der Anbieter erkennt (Zuschnitt der Scheibe S9, N3,
      "DEKODIER-GRENZE"). Die Schreibung der Google-Parameter-NAMEN ist ein eigener Posten.
  (2) DER ABGLEICH. Ob ein Anbieter mit dem gesendeten Wert einen Anzeigenklick zuordnet,
      ist an KEINEM Ziel gemessen. Die belegten Instrumente zeigen die ANNAHME: meta "Events
      testen" mit "Benutzer-Datenschlüssel: Klick-ID" (meta, Teil (ad)) · tiktok der
      Test-Events-Reiter mit "ttclid" (tiktok, Teil (r)) · pinterest "Events testen" mit
      "Klick-ID" (pinterest, Teil (as)) · linkedin und google allein die Annahme am Endpunkt
      (linkedin, Teil (be); google, Teil (cu)). Welches Instrument den ABGLEICH zeigt, ist
      je Ziel nicht entschieden.
  WAS STILL KAPUTTGEHT: Ein falsch geformter Wert geht ohne jede Meldung hinaus — pinterest
  prüft `+` und `%` nicht (pinterest, Teil (ap)), tiktok quittiert mit `code 0` und ist
  dabei für Feldnamen blind (tiktok, Teil (q)) —, und TRANSIT-ONLY verhindert, dass wir ihn
  sehen: kein Log, keine Ablage ("DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" in dieser
  Datei). Die Folge wäre eine Kennung, die der Anbieter annimmt und nicht zuordnet —
  sichtbar allenfalls als schwächere Optimierung, nie als Fehler.
  DER TRIGGER FEUERT UNBEOBACHTET: Ein echter Anzeigenklick geschieht im Betrieb, nicht in
  einer Runde, die diese Datei öffnet.
  DIE NACHBARN IN DIESER DATEI lösen ihn nicht ab: "DIE SCHREIBUNG DER URL-PARAMETERNAMEN
  STÜTZT SICH AUF NICHTS GELESENES" (google, der NAME) · "DIE WIRKUNG AUF DIE GEBOTE IST
  UNGEMESSEN" (google, die WIRKUNG) · "CONVERSIONS AUF FOLGESEITEN TRAGEN BEI KEINEM ZIEL
  EINE KLICK-KENNUNG …" (die VERFÜGBARKEIT).
  KEINE EMPFEHLUNG, wie gemessen wird.
  PROVENIENZ: Der Posten fasst zwei Befunde der Phase 11.7 zusammen (ARCHITEKTEN-ENTSCHEIDUNG
  2026-09-25): die Dekodier-Grenze aus dem Zuschnitt der Scheibe S9 (N3) und den Befund
  "kein fachlicher Abgleich an irgendeinem Ziel" aus der Inventur des Phasenendes. Die
  Code-Befunde GEMESSEN (CC, 2026-09-23 bis 2026-09-25); die Anbieter-Angaben GELESEN bzw.
  GEMESSEN je an der genannten Stelle; die Live-Belege sind OWNER-ANGABEN.
