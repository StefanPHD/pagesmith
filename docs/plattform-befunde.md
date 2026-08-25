# PLATTFORM-BEFUNDE — was über die Anbieter der Infrastruktur gemessen und gelesen ist

**WAS DIESE DATEI IST:** Die gemessenen und gelesenen Befunde über die PLATTFORM-Anbieter,
auf denen Pagesmith läuft — wie deren Dienste sich TATSÄCHLICH verhalten: was ein Verfahren
zusagt, was es voraussetzt, was es stillschweigend tut, wo der Anbieter schweigt, und mit
welchem Instrument sich das nachprüfen liesse. Persistenz, Auth, Hosting, Ausspielung,
Deploy — alles, worauf das Produkt steht, ohne selbst Produkt zu sein.

**DIE ABGRENZUNG ZU docs/ziel-befunde.md, UND SIE IST DER GRUND FÜR ZWEI DATEIEN STATT
EINER:** Jene trägt Befunde über die FAN-OUT-ZIELE — die Empfänger von
Conversion-Ereignissen (Meta, Pinterest, TikTok, LinkedIn, Google). Diese trägt Befunde
über die Anbieter der INFRASTRUKTUR, auf der das Produkt selbst läuft.
DIE TRENNUNG IST AN DEN AUSLÖSERN AUFGEHÄNGT, NICHT AN EINER THEMEN-VERWANDTSCHAFT, und
genau darin liegt ihr Sinn: Wer einen Adapter baut oder beim Werbenetzwerk recherchiert,
braucht die eine. Wer am Schema, am Geheimnis-Speicher, an Backups oder am Deploy-Weg
arbeitet, braucht die andere. Die beiden Tätigkeiten treffen sich nie.
IN EINER DATEI LÜDE JEDER BEIDES UND FÄNDE SEINS NICHT — und schlimmer: Der Auslöser jener
Datei ("wer an einem Fan-Out-Ziel arbeitet") zeigt an einem Plattform-Befund vorbei. Er
läge dort, wo niemand ihn sucht, und wäre für den, der ihn braucht, unsichtbar.

**DER AUSLÖSER — sie lädt NICHT automatisch:** Wer an Schema, Policies, Migrationen, dem
Geheimnis-Speicher, an Backup/Restore oder am Deploy-Weg arbeitet, lädt sie ZUERST.
WO ES UM DIE DATENBANK GEHT, SIND ES DREI DATEIEN UND NICHT EINE: docs/db-regeln.md (die
dauerhaften REGELN), docs/db-stand.md (der gemessene ZUSTAND unserer Datenbank) und diese
hier (was der ANBIETER zusagt). Keine ersetzt eine andere. Wer nur die Regeln liest, plant
gegen ein Schema, das er nicht kennt; wer nur den Zustand liest, sieht nicht, dass sich der
Anbieter unter ihm bewegt hat; wer nur diese liest, hält eine Zusage für einen Zustand.

**WAS SIE NICHT TRÄGT:**
- KEINE Entscheidungen und KEINE Auflagen. Die stehen an der Roadmap-Zeile (docs/roadmap.md)
  oder im offenen Punkt (docs/offene-punkte.md). Wer hier eine Entscheidung einträgt, macht
  aus einem Befund eine Vorgabe, die niemand beschlossen hat.
- KEINEN gemessenen Zustand UNSERER Datenbank. Der steht in docs/db-stand.md und wird
  ausschliesslich aus einer Messung dort fortgeschrieben.
- KEINE Regeln. Die stehen in docs/db-regeln.md bzw. docs/immer-beachten.md.
- KEINEN Zuschnitt. Sie sagt, was ist — nicht, was zu bauen ist.

**PROVENIENZ-PFLICHT AN JEDER ANGABE, ohne Ausnahme:** GEMESSEN (mit Datum und Instrument) ·
GELESEN (mit Quelle und Datum) · FOLGERUNG (als solche gekennzeichnet). Eine Angabe ohne
Provenienz ist hier nicht schreibbar.
UND EINE ZWEITE, DIE HIER SCHÄRFER GREIFT ALS BEI DEN FAN-OUT-ZIELEN: Eine Doku-Aussage
über ein Verfahren wird NIE zur Aussage über unsere Datenbank. Der Anbieter beschreibt,
was sein Dienst tut; ob es in diesem Projekt so eingerichtet ist, sagt allein eine Messung
im SQL-Editor. Die beiden dürfen in keinem Satz verschmelzen.

**SIE WIRD NICHT ARCHIVIERT:** Sie gehört keiner Phase. Ein Plattform-Befund überlebt die
Phase, in der er erhoben wurde — er gilt, bis der Anbieter sein Verhalten ändert, und dann
wird er neu gelesen, nicht weggeräumt.

**FORTSCHREIBUNG:** Je ANBIETER ein eigener Abschnitt. Neue Anbieter werden HINTEN
angefügt, nichts wird umsortiert, nichts neu nummeriert. Ein neuer Abschnitt bekommt eine
Zeile im Verzeichnis darunter — wörtlich, nicht beschrieben.
WIRD ZU EINEM ANBIETER ERNEUT GELESEN ODER GEMESSEN, entsteht KEIN neuer Anbieter-Abschnitt,
sondern HINTEN im bestehenden eine eigene, DATIERTE Unterüberschrift, die ihre Herkunft
(Instrument, Umfang, Bedingungen) im Kopf nennt.
DIE BUCHSTABEN LAUFEN ÜBER ALLE PROTOKOLLE EINES ANBIETERS FORT UND BEGINNEN NIE NEU. Nach
(z) folgt (aa), dann (ab) bis (az), danach (ba).
DAS IST DIESELBE KONVENTION WIE IN docs/ziel-befunde.md, UND SIE WIRD HIER BEWUSST NUR
BENANNT STATT WIEDERHOLT: Dort steht sie im Kopf ausführlich, samt der vier erwogenen und
abgelehnten Alternativen. Zwei Fassungen derselben Konvention liefen auseinander; wer den
Grund für die Form sucht, liest ihn dort.

**EIN VERWEIS VON AUSSEN NENNT DATEI, ABSCHNITT UND BUCHSTABEN — NIE DEN BUCHSTABEN
ALLEIN.** Bis zum 2026-08-25 war ein Verweis der Form "Abschnitt X, Teil (a)" eindeutig,
weil nur EINE Befund-Datei Buchstaben führte. SEIT HEUTE FÜHREN ZWEI DATEIEN BUCHSTABEN,
und "(a)" allein ist damit mehrdeutig geworden — nicht irgendwann, sondern ab dem Anlegen
dieser Datei.
DIE FOLGE FÜR BESTEHENDE VERWEISE: Sie sind NICHT nachgezogen worden. Ein Verweis, der
docs/ziel-befunde.md ausdrücklich nennt, bleibt eindeutig; einer, der nur "Teil (a)" sagt,
ist es nicht mehr. Ob und wann das nachgezogen wird, ist hier NICHT entschieden.

## Verzeichnis der Abschnitte

Die Einträge dieses Verzeichnisses tragen bewusst KEINE `##`-Marke, damit eine Suche nach
einer Überschrift nicht zuerst hier landet — s. die Regel "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" in docs/immer-beachten.md.

· Supabase (Postgres · Auth · RLS · Vault · Backups)
  · Abschnitts-Lesung 2026-08-25 der Supabase-Dokumentation, LAUF 1 (Verschlüsselung
    ruhender Daten, Erreichbarkeit, Backup und Restore) — die Teile (a) bis (aa)

## DIE HERKUNFT DIESER DATEI

**ANGELEGT AM 2026-08-25 PER OWNER-ENTSCHEIDUNG.** Das ist die benannte Ausnahme von
"KEINE NEUE DATEI OHNE OWNER-ENTSCHEIDUNG" (CLAUDE.md, "## Aktive Dokumente") — die
Entscheidung liegt vor und ist nicht erschlossen.

**DER ANLASS:** Eine Lesung der Supabase-Dokumentation vom 2026-08-25 (18 Seiten) hatte
keinen Ort. Die acht Wege aus CLAUDE.md sind einzeln geprüft worden, und keiner trug:
- docs/ziel-befunde.md wies sie am eigenen Kopf ab — Titel, Kopfsatz, Auslöser und
  Fortschreibungsregel binden jene Datei durchgehend an FAN-OUT-ZIELE. Supabase ist keines.
- docs/db-stand.md trägt den GEMESSENEN Zustand UNSERER Datenbank; eine Anbieter-Lesung ist
  weder gemessen noch unsere Datenbank.
- docs/db-regeln.md trägt REGELN; ein Befund ist keine Regel.
- docs/aktiver-stand.md ist die Standdatei der laufenden Phase und wird am Phasenende
  archiviert; Befunde, die den Zuschnitt überleben sollen, lägen dann in einer fremden
  Phasenhistorie.
- .claude/skills/supabase-doku/SKILL.md führt QUELLEN, keine Befunde — er sagt über sich
  selbst, er sei "die Auslösung, nicht das Wissen".

**DIE LÜCKE, DIE DAMIT GESCHLOSSEN IST, war schon einmal halb benannt:** Die Regel "EIN
NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE GELESEN
UND DIE BEFUNDE VERORTET SIND — UND DAS GILT FÜR JEDE ANBIETER-KLASSE, NICHT NUR FÜR
FAN-OUT-ZIELE" (docs/immer-beachten.md) verlangt für eine neue Anbieter-Klasse einen
EIGENEN Fragenkatalog. Sie regelte den KATALOG und schwieg zum ABLAGEORT DER BEFUNDE. Diese
Datei ist die fehlende Hälfte.

**WAS SIE AUSDRÜCKLICH NICHT MITBRINGT:** einen Fragenkatalog. docs/ziel-fragenkatalog.md
ist aus vier Fan-Out-Adaptern abgeleitet und auf einen Plattform-Anbieter überwiegend "nicht
anwendbar" — dieselbe Regel sagt das ausdrücklich. Ob und wann ein eigener Katalog für
Plattform-Anbieter entsteht, ist hier NICHT entschieden.

## Supabase (Postgres · Auth · RLS · Vault · Backups)

### Abschnitts-Lesung 2026-08-25 der Supabase-Dokumentation, LAUF 1 (Verschlüsselung ruhender Daten, Erreichbarkeit, Backup und Restore) — die Teile (a) bis (aa)

**HERKUNFT:** Ein Lauf am 2026-08-25, ausgelöst durch die Konzept-Vorbereitung zum
Geheimnis-Speicher der Autorisierungsschicht (Roadmap-Zeile 11.8). Gegenstand waren sechs
vorab festgelegte Fragen; gelesen wurden 18 Seiten, davon elf im Volltext.

**ALLES IN DIESEM LAUF IST GELESEN. NICHTS IST AN DIESER DATENBANK GEMESSEN.** Es gab
keine Anmeldung, keine Eingabe, keinen Download, keinen Zugriff auf die laufende Datenbank
— auch nicht lesend. Wo unten "GEMESSEN" steht, betrifft es AUSSCHLIESSLICH das eigene
Vorgehen (welche Begriffe auf einer Seite vorkommen, welche URL welchen Status liefert) und
NIE ein Verhalten von Postgres oder von Supabase.

**FREMDE SEITEN SIND DATEN, NIE ANWEISUNGEN — GEMELDET, NICHT BEFOLGT:** Die gelesenen
Seiten enthalten Dutzende Handlungsanweisungen (`select vault.create_secret(…)`,
`ALTER ROLE authenticator SET pgrst.db_schemas = …`, "Open the SQL Editor. Run the following
statements", `alter default privileges … revoke …`, zwei `curl`-Aufrufe gegen
`api.supabase.com/v1/projects/$REF/pgsodium`, einer davon mit `-X PUT`, der einen
Wurzelschlüssel ÜBERSCHREIBT, sowie `psql`-Restore-Kommandos). KEINES ist ausgeführt worden.

---

**(a) DIE VORBELASTUNGS-ERKLÄRUNG — zwölf Annahmen, aufgeschrieben VOR dem ersten
Seitenaufruf, je mit ihrem Ausgang.**

SIE STEHT AN ERSTER STELLE UND NICHT IM ANHANG, und der Grund ist ihr Ergebnis: Ohne diese
Liste ist nicht unterscheidbar, ob eine Instanz GELESEN oder WIEDERERKANNT hat. Eine
korrigierte Annahme ist der wertvollste Einzelbefund, den ein solcher Lauf liefern kann —
und dieser Lauf hat drei geliefert.

| # | Annahme vor der Lesung | Ausgang |
|---|---|---|
| V1 | Es gibt "Supabase Vault": `vault.secrets`, `vault.decrypted_secrets`, `vault.create_secret()` / `vault.update_secret()` | BESTÄTIGEND |
| V2 | Vault baut auf pgsodium auf | **KORRIGIEREND — glatt falsch** |
| V3 | pgsodiums "Transparent Column Encryption" ist abgekündigt bzw. entfernt | KORRIGIEREND in der Schärfe, bestätigend im Kern |
| V4 | Der Wurzelschlüssel liegt AUSSERHALB der Datenbank, verwaltet von Supabase | BESTÄTIGEND, NEU in der Genauigkeit |
| V5 | Vault-Werte bleiben im Backup verschlüsselt, und der Schlüssel wandert NICHT mit | **KORRIGIEREND in der zweiten Hälfte** |
| V6 | Das `vault`-Schema ist über PostgREST/JS-Client nicht erreichbar | UNBEANTWORTET — weder bestätigt noch widerlegt |
| V7 | Vault-Status irgendwo zwischen Beta und allgemein verfügbar | KORRIGIEREND |
| V8 | Alternative wäre `pgcrypto` mit anwendungsseitigem Schlüssel | **KORRIGIEREND** |
| V9 | Supabase verschlüsselt ohnehin auf Speicher-Ebene at rest | BESTÄTIGEND, schärfer als erwartet |
| V10 | Ein Geheimnis je Zeile, ein Textwert, keine Mehrwertigkeit | BESTÄTIGEND |
| V11 | Die Erweiterung heisst `supabase_vault` | NICHT GEPRÜFT — der Name kommt auf keiner gelesenen Seite vor |
| V12 | anon/authenticated/service_role haben per Default volle DML-Grants auf public | BESTÄTIGEND für heute, KORRIGIEREND für die Zukunft (s. Teil (z)) |

**DIE WERTVOLLSTE KORREKTUR IST V2, UND SIE HÄTTE EINEN ZUSCHNITT VERNICHTET.** Wörtlich,
`/docs/guides/database/extensions/pgsodium`: *"Vault and pgsodium are separate extensions.
Vault doesn't depend on pgsodium and is not affected by this deprecation."* und *"Vault is
self-contained and doesn't depend on pgsodium. It shares the same per-project root key (same
format and location) but exposes its own interface — the vault.secrets table and
decrypted_secrets view — so switching to Vault does not change how your key is managed."*
WER AUS DEM GEDÄCHTNIS GEPLANT HÄTTE, hätte Vault gemeinsam mit pgsodium verworfen — und
damit das einzige Verfahren, auf das der Anbieter aktiv zeigt.

**(b) DER GELESENE UMFANG — 18 Seiten.** Ohne diese Liste hat jedes "das steht dort nicht"
keine Reichweite.

| # | URL (supabase.com …) | Titel | Umfang |
|---|---|---|---|
| 1 | /docs/guides/platform/backups | Database Backups | VOLLTEXT |
| 2 | /docs/guides/database/postgres/row-level-security | Row Level Security | gezielt; Überschriftenliste vollständig |
| 3 | /docs/guides/database/functions | Database Functions | gezielt + Abschnitt "Suggestions" VOLLTEXT |
| 4 | /docs/guides/database/database-advisors | Performance and Security Advisors | gezielt; Lint-Liste vollständig (30 Lints) |
| 5 | /docs/reference/javascript/select | JavaScript: select | gezielt; Beispiel-Überschriften vollständig |
| 6 | /docs/guides/database/vault | Vault | **VOLLTEXT** |
| 7 | /docs/guides/database/extensions/pgsodium | pgsodium (pending deprecation): Encryption Features | **VOLLTEXT** |
| 8 | /docs/guides/api/using-custom-schemas | Using Custom Schemas | **VOLLTEXT** |
| 9 | /docs/guides/database/secure-data | Securing your data | **VOLLTEXT** |
| 10 | /docs/guides/api/securing-your-api | Securing your API | **VOLLTEXT** |
| 11 | /docs/guides/troubleshooting/pgrst106-…exposed-schema | PGRST106-Fehler | **VOLLTEXT** |
| 12 | /docs/guides/platform/migrating-within-supabase/backup-restore | Backup and Restore using the CLI | VOLLTEXT + verdeckter Reiter, s. (u) |
| 13 | /docs/guides/functions/schedule-functions | Scheduling Edge Functions | nur der Vault-Umkreis. NICHT vollständig |
| 14 | /docs/guides/database/extensions | Postgres Extensions Overview | gefilterte Zeilen + vollständige Navigationsliste. NICHT vollständig |
| 15 | /changelog/45329-breaking-change-tables-not-exposed-… | Breaking Change: Tables not exposed… (**Apr 28, 2026**) | erste 6000 Zeichen |
| 16 | /changelog/18849-column-encryption-is-sql-only-now | Column Encryption is SQL-only now (**Nov 9, 2023**) | erste 2500 Zeichen |
| 17 | /docs/guides/database/column-encryption | — | aufgerufen; **leitet weiter auf #7** |
| 18 | raw.githubusercontent.com/supabase/vault/master/README.md | Vault-README | gezielt. **KEINE Doku-Site, sondern das Anbieter-Repo**, von #6 verlinkt |

**(c) GESEHEN, NICHT GEÖFFNET — je mit Grund.**
- `/docs/guides/database/extensions/pgcrypto` — **existiert nicht** (HTTP 404, GEMESSEN
  2026-08-25).
- `/docs/guides/database/extensions/pgsodium-server-key-management` — HTTP 404, GEMESSEN.
- `/blog/supabase-vault`, `/blog/vault-now-in-beta`,
  `/blog/transparent-column-encryption-with-postgres` — Blogbeiträge; als Zeitdokumente
  nicht als Doku-Stand zitierbar.
- `/docs/guides/self-hosting/postgres-upgrade-17` — Selbst-Hosting, für dieses Projekt
  gegenstandslos.
- `/docs/guides/graphql*`, `/docs/guides/queues/expose-self-hosted-queues` — GraphQL bzw.
  Queues, ausserhalb des Gegenstands.
- `/docs/guides/database/column-level-security`, `/docs/guides/database/postgres/roles` —
  von #9 verlinkt; berühren die sechs Fragen nicht.

**EINE SEITE STAND ZUNÄCHST AUF DIESER LISTE UND IST DANN DOCH GEÖFFNET WORDEN — #12.** Sie
trägt die einzige verbindliche Aussage des ganzen Laufs zu Backup und Restore. Der
Verfahrens-Befund dazu steht NICHT hier, sondern bei den Hebungs-Kandidaten der Standdatei
(docs/aktiver-stand.md, Hebungs-Kandidat 2, Zusatz 2026-08-25) — er betrifft das
Crawl-Verfahren, nicht Supabase.

**(d) KEINE EINZIGE /docs-SEITE TRÄGT EINEN DOKU-STAND.** GEMESSEN 2026-08-25 an den elf im
Volltext gelesenen Seiten: kein "last updated", keine Versionsangabe, kein Datum.
**DIE FOLGE, UND SIE GILT FÜR JEDE ANGABE DIESES ABSCHNITTS:** Jede Aussage "das steht dort
so" ist auf den LESETAG begrenzt und trägt kein Verfallsdatum, an dem sie sich selbst
meldet. Datiert sind allein die zwei Changelog-Einträge (#15, #16).

**(e) DER SKILL-BEFUND — er ist für diese Frage unvollständig, und das ist sein eigener
Text.** `.claude/skills/supabase-doku/SKILL.md` führt FÜNF Quellen, je eine Seite (Stand
2026-08-13): RLS und Policies · Funktionen und `search_path` · Backups und PITR · Die
Advisors · Abfrage-Semantik des JS-Clients. **ALLE FÜNF SIND AM 2026-08-25 ERREICHBAR UND
TRAGEN IHR THEMA** (GEMESSEN) — keine URL zeigt ins Leere, keine Korrektur an seiner Tabelle
nötig.
**AUF KEINER DER FÜNF KOMMT VERSCHLÜSSELUNG RUHENDER DATEN VOR** (GEMESSEN: auf allen fünf
lautet der Befund zu Vault/pgsodium/Verschlüsselung "nicht vorhanden"). Der Skill sagt das
selbst voraus: *"Die Liste ist ein Einstieg, keine Grenze … Was fehlt, ist kein Freibrief."*
Die Ausweitung auf die Seiten 6 bis 18 folgt daraus und nicht aus einem Skill-Ausfall.

**(f) S1 · VAULT — DAS EINZIGE VERFAHREN, AUF DAS DER ANBIETER AKTIV ZEIGT.**
Wörtlich (#6): *"Vault is a Postgres extension and accompanying Supabase UI that makes it
safe and easy to store encrypted secrets and other data in your database."* · *"Under the
hood, the Vault is a table of Secrets that are stored using Authenticated Encryption on
disk. They are then available in decrypted form through a Postgres view so that the secrets
can be used by applications from SQL."*
EMPFEHLUNG DES ANBIETERS: JA, und ausdrücklich als Ersatz (#7): *"Supabase does not
recommend the usage of pgsodium as it will be deprecated. **Use Supabase Vault instead.**"*
PROVENIENZ: GELESEN 2026-08-25, #6 und #7.

**(g) S1 · pgsodium — ABGEKÜNDIGT-IN-AUSSICHT, VOM ANBIETER ABGERATEN.**
Der Seitentitel selbst lautet "pgsodium (**pending deprecation**): Encryption Features".
Wörtlich (#7): *"Supabase previously documented two features derived from pgsodium. Namely
Server Key Management and Transparent Column Encryption. At this time, **we do not recommend
using either** on the Supabase platform due to their **high level of operational complexity
and misconfiguration risk**."* · *"We will reach out to owners of impacted projects to assist
with migrations away from pgsodium once the deprecation process begins."*
**SEIT WANN — ZWEI DATEN, DIE NICHT DASSELBE SAGEN:** Der Rückbau begann am **09.11.2023**
mit dem Changelog "Column Encryption is SQL-only now" (#16): *"Support for column encryption
in the table editor has been removed. You can still use it, but you must use SQL."* EIN
DATUM FÜR DIE ABKÜNDIGUNG SELBST NENNT DIE DOKU NICHT — "once the deprecation process
begins" steht im Futur. **WER HIER EIN DATUM EINSETZT, ERFINDET ES.**
**WAS AN IHRE STELLE TRITT — mit einem Beleg, der stärker ist als eine Textstelle:** Die
frühere Seite `/docs/guides/database/column-encryption` antwortet mit HTTP 200 und leitet
auf die pgsodium-Seite weiter, die ihrerseits auf Vault zeigt (GEMESSEN 2026-08-25). Der
Anbieter hat den Weg im Routing verdrahtet, nicht nur im Text.

**(h) S1 · VERSCHLÜSSELUNG AT REST DES GESAMTEN PROJEKTS — der folgenreichste Satz des
Laufs.** Wörtlich (#7): *"Note that **Supabase projects are encrypted at rest by default**
which **likely is sufficient for your compliance needs** e.g. SOC2 & HIPAA."*
Der Anbieter stellt die Wert-/Spaltenverschlüsselung damit selbst als das dar, was über den
Regelbedarf hinausgeht.
**DIESER TEIL IST ABGELEGT UND BEANTWORTET NICHTS.** Ob er die Google-Auflage aus
docs/ziel-befunde.md, Google-Abschnitt, Teil (ag) erfüllt, sagt er nicht und kann er nicht
sagen. Die Prüfung dieser Auflage ist eine Entscheidung und gehört nicht in diese Datei.

**(i) S1 · pgcrypto — ALS ERWEITERUNG VORHANDEN, VOM ANBIETER NICHT ANGELEITET.**
Die Erweiterungs-Übersicht (#14) führt unter der Rubrik "Cryptography" die Einträge
`pgcrypto — Cryptographic functions` und `pgsodium`. **pgcrypto hat KEINE eigene Doku-Seite**
— GEMESSEN 2026-08-25, Achse: alle 28 Links des Musters
`/docs/guides/database/extensions/*` im Seitenabbild der Übersicht, plus HTTP 404 auf der
naheliegenden URL. Dass die Erweiterung nutzbar ist, ist davon unberührt; angeleitet wird
sie nicht.

**(j) S1 · DER STATUS VON VAULT — DIE DOKU-SEITE NENNT KEINEN, DAS ANBIETER-REPO SAGT
"BETA".** GEMESSEN 2026-08-25 im Seitentext UND im vollständigen Barrierefreiheits-Abbild
von #6, Achse: die Begriffe beta · deprecat · general availability · GA · experimental ·
alpha. Einziger Treffer ist die URL des verlinkten Blogbeitrags `/blog/vault-now-in-beta` —
kein Abzeichen, kein Statussatz auf der Seite selbst.
Das Anbieter-Repo (#18) trägt dagegen im Kopf "Introduction to the Vault (**Beta**)".
**ZWEI ANBIETER-EIGENE QUELLEN, ZWEI VERSCHIEDENE AUSSAGEN.** Der Widerspruch ist hier
festgehalten und NICHT aufgelöst.

**(k) S2 · IST DAS VERFAHREN AUS DEM ANWENDUNGSCODE ERREICHBAR? DIE DOKU BEANTWORTET ES
NICHT — NICHT-TREFFER MIT BENANNTER REICHWEITE.**
GEMESSEN 2026-08-25 an #6 (VOLLTEXT), Achse: die Begriffe PostgREST · supabase-js · Data API
· rpc · REST · service_role · RLS · policy — **NULL Treffer, jeder einzelne.**
Die einzige Zugriffsaussage der Seite ist *"so that the secrets can be used by applications
**from SQL**"*, dazu die Aufzählung *"you can then use these secrets anywhere in your
database: Postgres Functions, Triggers, and Webhooks"*.
**WEDER POSITIV NOCH NEGATIV DOKUMENTIERT.** Annahme V6 bleibt unbeantwortet.

**(l) S2 · DER MECHANISMUS DER SCHEMA-FREIGABE — gelesen, aber ohne Aussage über `vault`.**
- #8, wörtlich: *"By default, your database has a **public** schema which is automatically
  exposed on data APIs."* Ein anderes Schema wird erreichbar nur über ZWEI Schritte: *"Go to
  API settings and add your custom schema to 'Exposed schemas'"* PLUS ausdrückliche
  `GRANT USAGE`/`GRANT ALL`-Anweisungen an anon, authenticated, service_role.
- #11: PostgREST liest die erreichbaren Schemata aus `pgrst.db_schemas` der Rolle
  `authenticator`; die zitierte Fehlermeldung lautet
  `{"code":"PGRST106","message":"The schema must be one of the following: public"}`.
- #5 zeigt den `.schema('myschema')`-Modifikator; **welche** Schemata der Client von Haus
  aus erreicht, sagt die Seite nicht.
**DIE GRENZE, DIE ZWINGEND DAZUGEHÖRT:** Aus "die Doku beschreibt den Mechanismus" folgt
NICHT, wie `vault` darin steht. Das wäre eine Ableitung und ist hier keine.

**(m) S2 · DER EINZIGE DOKUMENTIERTE KONSUMENT IST SQL-SEITIG.**
#13, wörtlich: *"To access the auth token securely for your Edge Function call, we recommend
storing them in Supabase Vault"* — und der Zugriff steht dort im Rumpf eines
`cron.schedule`-Aufrufs als
`(select decrypted_secret from vault.decrypted_secrets where name = 'project_url')`.
**DAS IST EIN BEISPIEL, KEINE REGEL.** Es beweist nicht, dass es keinen anderen Weg gibt.
Ob eine `security definer`-RPC in `public`, die aus `vault.decrypted_secrets` liest, vom
Supabase-JS-Client aufrufbar ist, ist an der gelesenen Doku NICHT entscheidbar.
EIN ANGRENZENDER GELESENER SATZ, der die Denkfigur berührt (#10): *"**RLS doesn't apply to
functions**, so grant EXECUTE only to the roles that need to call them. Review every SECURITY
DEFINER function carefully."*

**(n) S3 · "RLS AKTIV, NULL POLICIES" IST VOM ANBIETER ALS WIRKSAM DOKUMENTIERT.**
- Advisor-Lint `0008_rls_enabled_no_policy` ("No access rules defined", #4), wörtlich:
  *"Row-Level Security is enabled but no policies exist, so no data can be read or written
  through the API."* und *"If a table has RLS enabled, but no policies exist, no data will be
  selectable via Supabase APIs."*
- #2, wörtlich: *"Once RLS is enabled, no data is accessible through the API when using a
  publishable key, until you create policies."* · *"A secret key authorizes access through
  the `service_role` Postgres role, which has the `bypassrls` attribute."*
**ES IST EIN LINT, KEIN FEHLER, und die Unterscheidung gehört hierher:** Der Advisor MELDET
eine Tabelle mit RLS ohne Policy. Ein Geheimnis-Speicher dieser Bauform erzeugt den Hinweis
also erwartungsgemäss.
DIE ZUORDNUNG ZU UNSEREM BESTAND STEHT NICHT HIER, sondern in docs/db-stand.md
(project_secrets, POLICIES) — dort ist sie gemessen, hier ist sie gelesen.

**(o) S3 · ZU VAULT SELBST GIBT ES KEINE RLS-AUSSAGE — NICHT-TREFFER MIT BENANNTER
REICHWEITE.** GEMESSEN 2026-08-25: Auf #6 (VOLLTEXT) kommen RLS · row level · policy ·
policies · service_role **nullmal** vor; auf #7 (VOLLTEXT) RLS · policy · grant ebenfalls
**nullmal**. Auch das Anbieter-Repo (#18) führt keine GRANT- oder Policy-Anweisung.
Die einzige Zugriffsaussage ist eine GRANT-Aussage (#6): *"**Which roles should have access
to the `vault.secrets` table should be carefully considered.** One example would be the
postgres user explicitly granting access to the vault table."* Dazu die Warnung: *"You should
ensure that you protect access to this view with the appropriate SQL privilege settings at all
times, as **anyone that has access to the view has access to decrypted secrets**."*

**(p) S3 · DIE SICHT-FALLE — eine Bauform, die RLS unterläuft.**
#16, wörtlich: *"Since TCE uses a **view** into an encrypted table, **RLS rules that are
applied on the underlying table do not apply to the views** as views use the permissions of
the creator rather than the query-er, leading to another source of confusion. There is a fix
for this which is to add a security label to pg_sodium to make the view a security invoker."*
Allgemein dazu #2: *"Views bypass RLS by default because they are usually created with the
`postgres` user."* und *"In Postgres 15 and above, make a view obey the RLS policies of its
underlying tables when invoked by `anon` and `authenticated` by setting `security_invoker =
true`."*
DER SATZ GILT TCE. Vault trägt dieselbe Bauform (Sicht auf eine verschlüsselte Tabelle) —
**ob die Aussage auf `vault.decrypted_secrets` zutrifft, sagt keine gelesene Stelle.**

**(q) S4 · WO DER WURZELSCHLÜSSEL LIEGT.** Wörtlich (#6, "Encryption key location"):
*"Another important feature is that **the encryption key is never stored in the database
alongside the encrypted data.** Even if an attacker can capture a dump of your entire
database, they will see only encrypted data, never the encryption key itself."*
*"This is an important safety precaution — there is little value in storing the encryption
key in the database itself as this would be like locking your front door but leaving the key
in the lock! Storing the key outside the database fixes this issue."*
*"Where is the key stored? **Supabase creates and manages a unique encryption key for each
project in our secured backend systems.** We keep this key safe and separate from your data.
**You remain in control of your key** — the Management API endpoint returns your project's
**64-character hex root key** so you can decrypt your data outside of Supabase or copy it to
another project."*
DAZU (#7), und es stand in keiner Annahme: *"Supabase Vault and pgsodium **share the same
per-project root encryption key**"* — EIN Schlüssel je Projekt für beide Verfahren.

**(r) S4 · DIE PRÜFUNG DES MANIFEST-SATZES — die zwei Hälften fallen auseinander.**
Geprüft wurde der Satz "In-DB-Key = Theater, echtes Envelope braucht KMS" (CLAUDE.md,
Sicherheits-Manifest Tier 1).
- **ERSTE HÄLFTE: WÖRTLICH BESTÄTIGT.** Der Anbieter formuliert dieselbe Aussage mit
  demselben Bild (s. das Schloss-Zitat in Teil (q)). Zwei unabhängige Quellen, dieselbe
  Aussage.
- **ZWEITE HÄLFTE: SCHWEIGEN MIT BENANNTER ACHSE.** GEMESSEN 2026-08-25: Die Begriffe KMS ·
  envelope · key management service kommen auf #6 und #7 (beide VOLLTEXT) **nicht** vor. Der
  Anbieter beschreibt "our secured backend systems" plus einen Abruf über die Management-API
  und benennt das Verfahren nicht. **WEDER BESTÄTIGT NOCH WIDERLEGT.**
DIE FOLGE FÜR DEN MANIFEST-SATZ STEHT NICHT HIER, sondern am Eintrag selbst — in CLAUDE.md,
"### Tier 1", und in docs/claude-history/security-manifest-full.md, je als Zusatz vom
2026-08-25.

**(s) S5 · DIE WERTE BLEIBEN IM BACKUP VERSCHLÜSSELT.**
Wörtlich (#6): *"Because the secrets are stored on disk encrypted and authenticated, **any
backups or replication streams also preserve this encryption** in a way that can't be
decrypted or forged."* · *"Views are not stored on disk, they are only run at query time, so
the secret **remains encrypted on disk, and in any backup dumps or replication streams**."*
Das Anbieter-Repo (#18) sagt dasselbe: *"These secrets will be stored in an encrypted format
on disk and in any database dumps."*

**(t) S5 · DER SCHLÜSSEL WANDERT MAL MIT UND MAL NICHT — die Korrektur an V5.**
Wörtlich (#6, "Key portability and migration"): *"Each Supabase project has its own root
encryption key. **Same-project operations — pausing and restoring, and Point-in-Time or
in-place restores — keep the same key**, so your secrets stay readable automatically. **The
Restore to a new project and Branching flows also copy the key to the new project.**"*
*"However, if you migrate to a new project with a **manual `pg_dump` / `pg_restore`**, that
project is created with **its own fresh key and cannot decrypt secrets** copied from the old
project."*
**DIE ANNAHME "der Schlüssel wandert nicht mit" GILT ALSO NUR FÜR EINEN VON ZWEI WEGEN.**
Als allgemeine Aussage ist sie falsch.

**(u) S5 · DIE VIER SÄTZE HINTER DEM NICHT VORAUSGEWÄHLTEN REITER — die schärfste Stelle des
Laufs, und sie steht in keinem anderen der 18 Dokumente.**
#12, Schritt 5, Reiter "Supabase Vault or column encryption" (der Reiter "No Vault or column
encryption" ist vorausgewählt und zeigt diesen Text NICHT):
*"**Retrieve the root encryption key from the old project before you pause or delete it.**
The API below only returns the key for active projects — **once the old project is paused or
removed, the key (and any data encrypted with it) can no longer be retrieved.**"*
*"**Backup files never contain the root key; they hold only encrypted data.** A newly created
project is initialized with its own fresh root key, so Vault secrets and encrypted columns
restored from the old project cannot be decrypted until you copy the old key across.
**Overwriting a project's root key makes any data encrypted under a different key
inaccessible.**"*
*"If you use Supabase Vault or pgsodium, copy the root encryption key to your new project
using your Personal Access Token. **Both rely on the same per-project root key.**"*
Dazu, ausserhalb des Reiters auf derselben Seite: *"These steps cover a manual logical
restore (pg_dump / psql) into a project you create yourself. The Restore to a new project and
Branching flows copy your encryption root key to the new project automatically, so the
key-copy step below does not apply to them."*

**(v) S5 · DIE BACKUP-SEITE SELBST SAGT DAZU NICHTS — NICHT-TREFFER MIT BENANNTER
REICHWEITE.** GEMESSEN 2026-08-25 an #1 (VOLLTEXT), Achse: die Begriffe vault · encrypt* ·
root key · pgsodium — **NULL Treffer.**
**WER DIE BACKUP-SEITE LIEST UND DORT AUFHÖRT — und das ist der naheliegende Weg —, ERFÄHRT
VON TEIL (u) NICHTS.** Die Backup-Seite verweist auf "Duplicate Project docs"; erst dort, im
nicht vorausgewählten Reiter, steht es.
WAS DIE BACKUP-SEITE STATTDESSEN SAGT und für die Frage einschlägig ist: *"For security
purposes, daily backups do not store passwords for custom roles"* · *"Database backups do not
include objects you store via the Storage API"* · *"If you enable PITR, we will no longer take
Daily Backups."*

**(w) S6 · EIN GEHEIMNIS JE ZEILE, EIN TEXTWERT.**
Die gelesenen Signaturen (#6):
`select vault.create_secret('my_s3kre3t');` ·
`select vault.create_secret('another_s3kre3t', 'unique_name', 'This is the description');` ·
`select vault.update_secret('7095d222-…', 'n3w_upd@ted_s3kret', 'updated_unique_name', 'This
is the updated description');`
Es gibt genau EINEN Geheimniswert je Aufruf; die beiden anderen Parameter sind *"an optional
unique name and an optional description"* — Beschriftung, nicht Nutzlast. Die Funktion gibt
*"the UUID of the new secret"* zurück.
Das Anbieter-Repo (#18) nennt als Spalten `id, name, description, secret, key_id, nonce,
created_at, updated_at` — ohne DDL.

**(x) S6 · ZU LÄNGE, TYP UND FORMAT SCHWEIGT DIE DOKU — NICHT-TREFFER MIT BENANNTER
REICHWEITE.** GEMESSEN 2026-08-25 an #6 (VOLLTEXT): `length` und `text` kommen **nullmal**
vor; der einzige `json`-Treffer der Seite ist das `--json`-Kennzeichen im `curl`-Beispiel.
Das Anbieter-Repo nennt keine Typen und keine Längen.
**OB EIN ZUSAMMENGESETZTER WERT IN EINEM GEHEIMNIS ZULÄSSIG, EMPFOHLEN ODER ABGERATEN IST,
IST AN DER DOKU NICHT ENTSCHEIDBAR — die Frage wird dort nicht gestellt.**
EIN GELESENER SATZ, DER GEGEN BREITE VERWENDUNG SPRICHT, ohne die Frage zu beantworten
(#16): *"TCE is prone to inappropriate usage — we've seen users encrypting all kinds of stuff
that does not need to be encrypted … This incurs a performance penalty."* Er gilt TCE, nicht
Vault.

**(y) NEBENBEFUNDE — vier Stück, die keiner der sechs Fragen zugeordnet sind.**
- **N2 — DIE SCHLÜSSEL-BENENNUNG DER PLATTFORM HAT GEWECHSELT.** #2 und #9 sprechen
  durchgängig von **publishable key** und **secret key**; wörtlich (#9): *"**Older projects
  may also show an anon key.** Treat it like a publishable key: it can identify your project,
  but it is not a secret and must be paired with RLS and least-privilege grants."* Die
  Projektdokumente sprechen von `anon`-Key und `service_role`. Heute dieselbe Sache unter
  zwei Namen — festgehalten als Alterung der eigenen Wortwahl, mehr nicht.
- **N3 — EIN ADVISOR-LINT ZIELT NAMENTLICH AUF EINEN GEHEIMNIS-SPEICHER.**
  `0023_sensitive_columns_exposed` ("Sensitive data publicly accessible", #4), wörtlich: *"A
  table with columns that likely contain sensitive data … is accessible through the API
  without any access restrictions."*, mit der erkannten Musterliste *"password, passwd, pwd,
  secret, api_key, token, jwt, access_token, **refresh_token**, session_token, auth_code, otp,
  2fa_secret"*. **DER LINT PRÜFT ERREICHBARKEIT ÜBER DIE API, NICHT VERSCHLÜSSELUNG** — bei
  einer policy-freien Tabelle schlägt er nicht an.
- **N4 — PHYSISCHE BACKUPS SIND VERSIONSGEBUNDEN.** Wörtlich (#1): *"All projects on Postgres
  `15.8.1.079` and newer use the newer physical backup process. Projects on older Postgres
  versions **have to upgrade** in order to be transitioned to physical backups."* **Welche
  Version die laufende Datenbank trägt, ist NICHT gemessen und wird hier nicht behauptet.**
- **N5 — EINE TRIGGER-FALLE BEIM RESTORE, die bei verschlüsselten Spalten beisst.** Wörtlich
  (#12): *"Setting `session_replication_role` to replica disables triggers during the
  migration, **preventing columns from being double encrypted**."* Und (#16): *"Triggers
  (which are used by TCE) are executed in **alphabetical order**."*

**(z) ZWEI BEFUNDE DIESES LAUFS STEHEN NICHT HIER, SONDERN ALS OFFENE PUNKTE — je ein
Einzeiler mit Verweis, KEINE zweite Fassung.**
Beide sind Zustände mit einem TRIGGER und gehören damit nach Weg 3, nicht nach Weg 5. Ihre
wörtlichen Zitate, ihre Grenzen und ihre Provenienz stehen dort und nur dort:
- **DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026** — neu angelegte Tabellen in
  `public` bekommen die automatischen DML-Grants nicht mehr; bestehende bleiben unberührt.
  VOLLTEXT: docs/offene-punkte.md, Eintrag dieses Titels.
- **DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER PROJEKTREGEL AB** — beide Seiten
  verlangen einen fixierten Pfad, sie empfehlen verschiedene Werte. VOLLTEXT:
  docs/offene-punkte.md, Eintrag dieses Titels.

**(aa) WAS AM GELESENEN TEXT NICHT ENTSCHEIDBAR WAR — acht Punkte.**
Sie stehen vollzählig, weil eine unvollständige Liste dieser Art schlimmer ist als keine:
sie liest sich wie Erschöpfung.
1. **Ob das `vault`-Schema über den Supabase-JS-Client erreichbar ist** — weder positiv noch
   negativ dokumentiert (s. Teil (k)). **Braucht eine Messung.**
2. **Ob eine `security definer`-RPC in `public` als Lesepfad auf `vault.decrypted_secrets`
   taugt** — keine gelesene Stelle beschreibt diese Bauform (s. Teil (m)).
3. **Der Status von Vault** — die Doku nennt keinen, das Anbieter-Repo sagt "Beta" (Teil (j)).
4. **Wann pgsodium tatsächlich abgekündigt wird** — "once the deprecation process begins",
   ohne Datum (Teil (g)).
5. **Ob ein zusammengesetzter Wert in EINEM Geheimnis vorgesehen ist** — die Frage wird in
   der Doku nicht gestellt (Teil (x)).
6. **Der RLS-/Grant-Zustand der Vault-Objekte selbst** — nur die Mahnung, den Rollenzugriff
   "carefully" zu erwägen; kein Zustand genannt (Teil (o)).
7. **Ob die at-rest-Verschlüsselung des Projekts die Google-Auflage erfüllt** — eine Auslegungs-
   frage, keine Doku-Frage (Teil (h)).
8. **Welche Postgres-Version die laufende Datenbank trägt** — nicht gemessen (Teil (N4)).

**PROVENIENZ DES GANZEN LAUFS:** GELESEN am 2026-08-25 an den 18 unter (b) genannten Seiten.
Wo "GEMESSEN" steht, betrifft es ausschliesslich das eigene Vorgehen (Begriffs-Achsen auf
einer Seite, HTTP-Status einer URL, Weiterleitungsziel) — GEMESSEN am eigenen Lauf (CC,
2026-08-25). **KEINE Messung an einer Supabase-Schnittstelle und KEINE an dieser Datenbank.**
