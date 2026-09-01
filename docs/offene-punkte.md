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
  hinreichend: (i) die Custom-Pixel-Vorfrage fällt zugunsten eines SERVER-Empfängers mit
  kundeneigenem Endpunkt; (ii) es zeigt sich, dass die KENNUNG NICHT IN DEN
  EINSTELLUNGS-BLOB GEHÖRT — GLEICHGÜLTIG AUS WELCHEM GRUND (Beispiele, KEINE
  abschliessende Liste: je Kennung ein eigenes Zugangsdatum · die Kennung selbst ein
  Geheimnis · server-autoritativ vergeben). (ii) nennt bewusst den GEGENSTAND und nicht
  den Anlass: eine engere Fassung fängt den wahrscheinlichsten Kipp-Fall nicht, und ein
  Trigger, der das nicht tut, schlägt nie an. GRENZE, die die Entscheidung trägt: dass die
  LinkedIn-URN eine KENNUNG ist und kein ZUGANGSDATUM, ist GELESEN (Anbieter-Doku,
  2026-08-11) und NICHT gemessen. KIPPT DIESE LESART, FALLEN BEIDE ACHSEN ZUSAMMEN, und
  die Entscheidung ist NEU zu treffen. Was still kaputtgeht: mehrere Zeilen mit demselben
  target im selben Projekt — der Schlüssel bricht, ohne dass der Trigger anschlägt.
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
- BETREIBER-DOKUMENTATION FEHLT — ZWEI PUNKTE (Trigger: vor dem öffentlichen Launch; wie
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
- DIE VOLLSTÄNDIGKEITS-ACHSE IST NICHT GEBAUT ("Kennungen für ALLE Ereignisse vorhanden") —
  Grund: kein realer Konsument. TRIGGER,
  wörtlich und ausdrücklich nicht "falls es je nötig wird": sobald ein Ziel eine Kennung JE
  EREIGNISTYP trägt. Was still kaputtgeht: Ein Nenner, der nur Variante A kennt, meldet
  vollständig, während beim halben Traffic nichts ankommt. Die drei Messbefunde, die dann
  sofort gelten und nicht neu erhoben werden müssen, stehen in
  docs/claude-history/backlog-polish.md, "VOLLSTÄNDIGKEITS-ACHSE — WAS DANN SOFORT GILT".
  SACHKORREKTUR 2026-08-31 — ERSETZT UND NICHT GESTEMPELT: Im Grund stand zusätzlich "kein
  Ziel trägt heute eine Kennung je Ereignistyp". DAS IST AM CODE FALSCH. LinkedIn trägt seit
  Scheibe 11.1d genau das — `settings.pixels.linkedin.conversionRules`, eine Zuordnung
  Ereignisname -> Conversion-Regel-Kennung (GEMESSEN am Repo, CC, 2026-08-31, am Typ
  ProjectSettings in src/lib/settings.ts und an getConversionRules/setConversionRule
  ebenda) — und das Ziel SENDET seit dem 2026-08-19 (Scheibe 11.1f).
  ERSETZT und nicht gestempelt, weil dieser Halbsatz ein MASSSTAB ist: Wer den Trigger an ihm
  misst, hält ihn für nicht eingetreten. Der ANDERE Halbsatz des Grundes ("kein realer
  Konsument") bleibt WÖRTLICH stehen und ist unberührt — er sagt, dass die ACHSE keinen
  Abnehmer hat, nicht dass es keine Kennung je Ereignistyp gäbe. Das sind zwei verschiedene
  Aussagen, und nur die eine ist überholt.
  DER TRIGGER IST DAMIT EINGETRETEN, und sein WORTLAUT wird NICHT angetastet — er trifft
  genau diesen Fall. Der Stub in CLAUDE.md ist im selben Zug nachgezogen.
  WAS DARAUS NICHT FOLGT: dass die Vollständigkeits-Achse zu bauen wäre. Der Punkt ist
  weiterhin OFFEN und NICHT ENTSCHIEDEN; KEINE EMPFEHLUNG.
  OB DIESER EINTRAG EINER DER DREI AUS "DREI EINTRÄGE DIESER LISTE HABEN EINEN EINGETRETENEN
  TRIGGER UND SIND NICHT GESICHTET" IST, IST NICHT GEPRÜFT WORDEN. Der Satz steht hier
  ausdrücklich statt einer Behauptung in die eine oder die andere Richtung: Jener Eintrag
  nennt seine drei Mitglieder nicht, und eine Zuordnung ohne Prüfung wäre eine erfundene.
  PROVENIENZ: GEMESSEN am Repo (CC, 2026-08-31), in der Aufklärungsrunde zum Zuschnitt der
  Scheibe 2 der Phase 11.2. Dass der Trigger damit eingetreten ist, ist eine FOLGE aus dieser
  Messung und seinem Wortlaut, keine zweite Beobachtung.
- CLAUDE.md NÄHERT SICH DEM LADELIMIT (Trigger: vor der nächsten Hebung an einem
  Phasenende): GEMESSEN am 2026-08-13 — die Datei steht bei rund 149 KB gegenüber dem
  dokumentierten 150k-Ladelimit, "## Immer beachten" trägt 1 012 Zeilen und 80 Regeln,
  und allein die Hebung dieser Phase hat 10 293 Bytes gekostet. Jede Phase fügt mehrere
  Regeln hinzu; die Datei wurde zuletzt schon einmal von 147 auf 138 KB gebracht. Was still
  kaputtgeht: Ohne Entscheidung endet die nächste Hebung entweder ÜBER dem Ladelimit oder
  damit, dass gefilterte Regeln stillschweigend nicht gehoben werden — und eine nicht
  gehobene Regel wird nicht mehr gelesen. HIER STEHT AUSDRÜCKLICH KEIN VORSCHLAG, WAS
  AUSGELAGERT WIRD: das gehört in eine Arbeitsweise-Runde am Phasenübergang.
  ZWEI ZAHLEN NACHGEZOGEN (GEMESSEN am Repo, 2026-08-14): Hier stand "rund 1 200 Zeilen"
  und "rund 11 KB"; gemessen sind 1 012 Zeilen (Abschnitt von der Überschrift bis zur
  letzten Inhaltszeile) und 10 293 Bytes (Grösse von CLAUDE.md vor und nach dem
  Hebungs-Commit 92c1a3b). Die beiden übrigen Zahlen des Eintrags halten der Messung
  stand: 149 970 Bytes und 80 Regeln. HERKUNFT der beiden falschen: ein Diktat, das beim
  Eintragen bereits als zu niedrig gemeldet und damals nicht nachgezogen wurde.
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
  s. docs/aktiver-stand-11.8.md, Vermerk 2**)**; die Zuordnung "nicht-additiv" ist eine
  ABLEITUNG aus dem Wortlaut dieses Eintrags und **keine Entscheidung** — der Eintrag
  definiert den Begriff selbst nicht.
- DAS POSTGRES-UPGRADE IST HEUTE GRATIS UND SPÄTER NICHT (Trigger: EINGETRETEN —
  Supabase bietet es an; das Fenster schliesst sich mit dem ersten echten
  Kunden-Traffic): Angeboten wird 17.6.1.127 -> 17.6.1.155.
  WARUM ES EIN OFFENER PUNKT IST UND KEINE AUFRÄUMARBEIT: Es trifft den Eintrag "JEDE
  STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN" — ein Upgrade IST ein
  Wartungsfenster und damit genau die Klasse Störung, die jener Eintrag beschreibt.
  Heute kostet es NULL, weil kein Kunde da ist; mit dem ersten echten Traffic kostet
  es laufende Kampagnen.
  WAS NICHT DAZUGEHÖRT: die Zwischenspeicherungs-Frage aus jenem Eintrag. Sie ist eine
  AUFKLÄRUNG und kein Bau, und sie wird durch dieses Upgrade weder beantwortet noch
  dringlicher.
  PROVENIENZ: Stand 2026-08-20, am 2026-08-21 verortet.
- DIE SOLL-HÄLFTE VON "/API/E-SCHLANKHEIT" IST ZU VERDICHTEN (Trigger: die nächste Arbeit
  an CLAUDE.md, die diesen Abschnitt ohnehin berührt): Der Eintrag steht in CLAUDE.md,
  "### A) Heute verbindlich", und misst GEMESSEN am 2026-08-24 120 Zeilen / 9 429 Bytes —
  der grösste zusammenhängende Einzelblock einer unbedingt geladenen Datei. Er stellt über
  sich selbst zwei Dinge fest, die am 2026-08-24 unverändert dastehen: auf die SOLL-Hälfte
  beruft sich im Produktivcode KEINE Stelle, und ihr Trigger ("eine GEMESSENE Grenze unter
  echtem Traffic") hat niemanden, der misst — es gibt kein Monitoring auf
  Concurrency-Slots.
  ZU TUN: die SOLL-Hälfte auf wenige Zeilen verdichten und ihren Volltext hierher ziehen.
  WAS NICHT DAZUGEHÖRT: die MUSS-Hälfte ("der CAPI-Call muss zuverlässig zugestellt
  werden"). Sie gilt UNBEDINGT, bleibt wörtlich in CLAUDE.md und wird nicht angefasst.
  Ebenso wenig gehört eine eigene Runde dazu — der Trigger ist ausdrücklich eine Arbeit,
  die den Abschnitt ohnehin öffnet.
- EIN INDIKATOR FÜR ABSCHNITT 2b FEHLT (Trigger: die nächste Änderung an
  docs/arbeitsweise.md — dann geht er beiläufig hinein und kostet keinen zweiten Vollzug in
  der Projektanweisung): Abschnitt "## 2b. PROPORTION — WIE TIEF GEPRÜFT WIRD" trägt vier
  Abbruchkriterien und KEINE Messgrösse (GEMESSEN am 2026-08-24: 47 Zeilen, vier Bullets
  unter "Abbruchkriterien", kein Treffer auf Messgrösse/Indikator/Kennzahl/Verhältnis).
  Alle vier Kriterien verlangen ein Urteil; keines lässt sich erheben.
  DER VORSCHLAG, UND ER IST NICHT BESCHLOSSEN: das Verhältnis von docs-Volumen zu
  Code-Volumen je Phase, per git log erhoben und im Abschluss-Vermerk der Phase genannt;
  steigt es zwei Phasen in Folge, ist das ein Befund für den Owner.
  WAS NICHT DAZUGEHÖRT: ihn als beschlossen zu behandeln. Er ist ein VORSCHLAG — wer ihn
  einträgt, holt vorher die Entscheidung ein. Und er ersetzt die vier Abbruchkriterien
  nicht, sondern tritt daneben.
- DREI EINTRÄGE DIESER LISTE HABEN EINEN EINGETRETENEN TRIGGER UND SIND NICHT GESICHTET
  (Trigger: die nächste Runde, die docs/offene-punkte.md ohnehin öffnet): GEMESSEN am
  2026-08-24 tragen DREI Einträge das Wort EINGETRETEN — "NICHTS ZEIGT AN, DASS DER
  VERÖFFENTLICHTE STAND NACHZUZIEHEN IST" · "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM
  NICHT SENDEN" (dort zwei seiner vier Trigger, Ursache (1) und Ursache (4)) · "DAS
  POSTGRES-UPGRADE IST HEUTE GRATIS UND SPÄTER NICHT".
  DIE FRAGE, DIE DIESER EINTRAG OFFENHÄLT: Ein Trigger ist per Definition dieser Liste die
  Bedingung, unter der ein Punkt herausgeht. Ein eingetretener Trigger macht den Punkt
  FÄLLIG, nicht erledigt — und niemand hat entschieden, was mit einem fälligen Punkt
  geschieht, der nicht abgearbeitet wird.
  WAS NICHT DAZUGEHÖRT: die drei Punkte jetzt zu sichten oder abzuarbeiten. Dieser Eintrag
  hält fest, DASS eine Sichtung fällig ist, und trifft keine Aussage über ihr Ergebnis.
  Die Zahl DREI ist eine Momentaufnahme vom 2026-08-24 und wird nicht stillschweigend
  fortgeschrieben.
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
