# Aktiver Stand — Phase 10.5 (Umzug middleware -> proxy)

Eröffnet 2026-08-03. Diese Datei ist das Pflicht-Gate ("Auftrag 0") jeder
Session, die an dieser Phase arbeitet: ZUERST vollständig lesen, dann bauen.

Phase 10.5 hat GENAU EINE Scheibe. Es gibt keine zweite und keine Folge-Scheibe;
wer hier eine anlegt, hat den Umfang verlassen (s. "Ausdrücklich NICHT im
Umfang").

VERFAHREN AM PHASENENDE — drei Schritte, in dieser Reihenfolge:
1. HEBUNG: Was aus dieser Phase eine DAUERHAFTE Regel ist, wandert nach
   CLAUDE.md, "## Immer beachten". Was nur Herleitung ist, bleibt, wo es steht.
2. ROADMAP-HAKEN: Die Zeile "Phase 10.5" in CLAUDE.md wird abgehakt.
3. DIESE DATEI WIRD GELÖSCHT.
ES ENTSTEHT KEINE EIGENE HISTORIEN-DATEI unter docs/claude-history/. Grund: die
vollständige Herleitung — Versionsbelege, Paket-Fundstellen, Trefferliste,
Rückweg, Nachweis-Auflage — liegt BEREITS in docs/claude-history/backlog-polish.md,
Eintrag "src/middleware.ts -> proxy.ts umbenennen" (dort ab Zeile 58). Eine
zweite Datei daneben wäre eine zweite Wahrheit über denselben Vorgang.

---

## Scheibe 10.5 — Umbenennung der Next-Konventionsdatei (EINZIGE Scheibe)

Diese Überschrift ist der Beleg, den der Auftrag 0 künftiger Prompts zitiert.

### Umfang

Umbenannt wird BEIDES — Datei UND Funktion — plus die Stellen, die genau daran
hängen:

- `src/middleware.ts` -> `src/proxy.ts` (Datei).
- Der benannte Export `middleware` (`src/middleware.ts:5`) -> `proxy`.
- `src/middleware.test.ts` -> die zugehörige Testdatei zieht nach, ABER NUR
  TEILWEISE. In DIESER Datei liegen DREI Klassen von "middleware"-Vorkommen
  nebeneinander, und nur die erste wandert:
  - **WANDERT — das Symbol der Konventionsdatei:** der Import
    `import { middleware } from "./middleware";` (`:11`) und die 13 direkten
    Aufrufe `await middleware(…)`
    (`:37,49,57,65,71,79,91,101,110,118,129,136,144`).
  - **BLEIBT — der Mock-Pfad auf das Hilfsmodul:** `:9`
    `vi.mock("@/lib/supabase/middleware", …)`. Das Hilfsmodul behält seinen
    Namen (s. "NICHT im Umfang").
  - **BLEIBT — der Next-interne Header:** die sieben
    `x-middleware-rewrite`-Assertions (Begründung und Fundstellen s. "NICHT im
    Umfang"; hier steht nur der Verweis).
  WARUM DIESE AUFTEILUNG HIER STEHT UND NICHT NUR UNTER "NICHT IM UMFANG":
  Es ist die EINZIGE Datei, in der geänderte und unveränderliche Vorkommen IN
  DERSELBEN Datei liegen. Eine Suche-Ersetze-Runde über "middleware" trifft
  alle drei Klassen.
  Ob die Testdatei selbst `src/proxy.test.ts` heissen kann, ist NICHT
  entschieden — s. Offene Frage (a).

Das ist der ganze Code-Umfang. Sonst nichts.

NICHT VERSIONIERT, deshalb kein Bestandteil des Commits, aber gemessen
vorhanden: `.claude/settings.local.json:56` und `:215` tragen den Dateinamen in
zwei Allowlist-Einträgen (gitignored).

DOKU-STELLEN mit dem Dateinamen sind in der Aufklärung erhoben und in
backlog-polish.md gelistet (arbeitsweise.md, phase-2-3-foundation.md,
phase-6-capi.md, phase-7-hosting.md, CLAUDE.md). WELCHE davon nachziehen und
welche als Zeitdokument stehen bleiben, entscheidet der Bau-Plan bzw. der
Phasenende-Schritt — NICHT diese Datei.

### Ausdrücklich NICHT im Umfang (je mit dem gemessenen Grund)

- **`config.matcher`** (`src/middleware.ts:34-46`). Er bleibt WÖRTLICH, wie er
  ist. Grund: Jede Änderung daran ist eine Verhaltensänderung auf dem heissesten
  Pfad der Anwendung und hat ein anderes Risikoprofil als eine Umbenennung. Ein
  separater Backlog-Eintrag führt das getrennt.
- **Jede Logikänderung.** Host-Verzweigung, Auth-Gate-Aufruf, Ingest-Passthrough,
  Rewrite auf `/app-serve` — der Rumpf wandert unverändert mit. Wenn ausser
  Datei- und Funktionsname etwas anderes im Diff steht, ist der Umfang verlassen.
- **`src/lib/supabase/middleware.ts` und `src/lib/supabase/middleware.test.ts`.**
  Das erste ist ein normales Hilfsmodul: es exportiert `updateSession` (`:18`),
  also das Supabase-Session-Refresh samt Auth-Gate, hat KEINEN `config`-Export
  und liegt nicht auf Konventionsebene. Es ist KEINE Konventionsdatei und behält
  seinen Namen; das zweite testet genau dieses Hilfsmodul (`:11`
  `import { updateSession } from "./middleware";`). Wer sie "mit umbenennt",
  ändert Importe ohne Not und fasst dabei die Auth-Grenze an.
  DAS IST DIE NAMENSFALLE DIESER PHASE — vier Dateien tragen "middleware" im
  Pfad, aber nur EINE ist die Konventionsdatei.
- **Die sieben `x-middleware-rewrite`-Assertions** in `src/middleware.test.ts`
  (`:29,41,52,105,113,121,139`). Das ist ein NEXT-INTERNER Response-Header, kein
  Projektsymbol. Gemessen an der installierten Version: `NextResponse.rewrite`
  setzt ihn weiterhin unter diesem Namen
  (`node_modules/next/dist/server/web/spec-extension/response.js`), ein
  `x-proxy-rewrite` existiert dort nicht. Wer stumpf über alle Grep-Treffer geht,
  macht sieben funktionierende Assertions kaputt.
- **`next.config.ts`.** Next benennt beim Umzug auch Config-Eigenschaften um;
  gemessen ist KEINE der vier gesetzt — weder `skipMiddlewareUrlNormalize` noch
  `experimental.middlewarePrefetch`, `experimental.middlewareClientMaxBodySize`
  oder `experimental.externalMiddlewareRewritesResolve`. Die Datei hat überhaupt
  keinen `experimental`-Block und null "middleware"-Treffer. Es gibt dort nichts
  nachzuziehen.
- **Die `eslint-config-next`-Version.** Sie steht auf `16.2.9` (`package.json:29`),
  während `next` auf `16.2.12` steht. Das ist eine echte, gemessene Divergenz —
  aber eine Dependency-Frage, keine Umbenennungsfrage. Sie wird hier NICHT
  angefasst.

### Gemessene Ausgangslage

PROVENIENZ: Punkte 1-7 stammen aus der Aufklärungsrunde vom **2026-08-03**, am
Repo bzw. am installierten Paket gemessen. Punkte 8-9 sind **Owner-Messungen im
Vercel-Build-Log** und am Repo NICHT nachprüfbar; sie sind als solche
gekennzeichnet, weil sie sonst wie Repo-Befunde gelesen würden.

1. **Next 16.2.12**, drei übereinstimmende Quellen: `package.json:16`
   (`"next": "16.2.12"`, exakt gepinnt, kein Range), `package-lock.json:6260`,
   `node_modules/next/package.json`. Keine Abweichung zwischen deklariert und
   installiert.
2. **Benannter Export, KEIN Default-Export.** `src/middleware.ts:5` lautet
   wörtlich `export async function middleware(request: NextRequest) {`. Ein
   `export default` kommt in der Datei nicht vor. Daraus folgt: ein reines
   Datei-Rename liesse keinen tragfähigen Export zurück.
3. **`config` trägt ausschliesslich `matcher`, KEINE `runtime`-Angabe.**
   `src/middleware.ts:34-46`. Es gibt also keine Runtime-Angabe, die beim Umzug
   verloren gehen könnte. Welche Laufzeitumgebung Vercel tatsächlich verwendet,
   ist am Code NICHT entscheidbar (der Kommentar "Edge-Middleware" in
   `src/lib/hosting/host.ts:2` ist eine Formulierung, kein Messwert).
4. **Die Datei ist 46 Zeilen lang** und importiert drei Module (`:1-3`):
   `next/server`, `@/lib/supabase/middleware`, `@/lib/hosting/host`.
5. **Testzahlen, per `vitest run` gemessen (nicht am Text gezählt):**
   `src/middleware.test.ts` = **13 Tests**, `src/lib/supabase/middleware.test.ts`
   = **8 Tests**. Gemeinsam 21, alle grün.
6. **KEINE der beiden Suiten prüft den Datei- oder den Exportnamen.** Beide
   importieren statisch und rufen die Funktion DIREKT auf. Es gibt keine
   Assertion auf `"middleware"` als Datei- oder Symbolnamen, keine Prüfung, dass
   Next die Datei als Konvention lädt, und keine Assertion auf `config.matcher`.
   FOLGE: Nach der Umbenennung samt Import-Anpassung wären beide Suiten grün,
   OHNE dass damit bewiesen wäre, dass Next die neue Datei überhaupt lädt. Grüne
   Tests sind hier KEIN Nachweis.
7. **Null Treffer in der Konfiguration.** Case-insensitive Suche nach
   "middleware" über `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
   `vitest.config.ts` und `package.json` (inkl. Skripte): kein einziger Treffer.
8. **Build-Etikett HEUTE: `ƒ Proxy (Middleware)`** — Owner-Messung im
   Vercel-Build-Log. Next beschriftet die Function also bereits mit dem neuen
   Begriff und führt den alten nur noch in Klammern nach.
9. **Deprecation-Warnung, Wortlaut** — Owner-Messung im Vercel-Build-Log,
   deckungsgleich mit dem in `docs/claude-history/backlog-polish.md:76-77`
   dokumentierten `warnOnce`-Text:
   `The "middleware" file convention is deprecated. Please use "proxy" instead.`
   nebst Verweis auf `/docs/messages/middleware-to-proxy`. (Die dortige Notiz
   kürzt den Mittelteil mit `…` ab; der ungekürzte Wortlaut ist NICHT erhoben.)

### Zwei offene Fragen — der Bau-Plan MUSS sie beantworten

Beide sind hier AUSDRÜCKLICH OFFEN geführt und werden in dieser Datei weder
beantwortet noch vorentschieden.

**(a) Darf die Testdatei `src/proxy.test.ts` heissen?**
Die Frage: Schliesst der PROXY-LOCATION-Ausdruck in
`node_modules/next/dist/lib/constants.js` `.test.` ebenso aus wie der
MIDDLEWARE-Ausdruck? Davon hängt ab, ob eine Datei `src/proxy.test.ts` gefahrlos
ist — oder ob Next sie als zweite Konventionsdatei auf `src/`-Ebene auffasst.
GEMESSEN ist bisher nur, WELCHE Zeilen dort stehen: `:287` `MIDDLEWARE_FILENAME
= 'middleware'`, `:289` `PROXY_FILENAME = 'proxy'`, dazu `:288` und `:290` die
beiden LOCATION-Ausdrücke in der Form `` `(?:src/)?${…FILENAME}` ``. Diese
Zeilen beantworten die Frage NICHT — ein `.test.`-Ausschluss steht nicht in
ihnen, und WO er stünde (falls es ihn gibt), ist nicht gemessen.
ZWEITE UNBEKANNTE IN DERSELBEN FRAGE: Die Formulierung unterstellt, dass der
MIDDLEWARE-Ausdruck `.test.` ausschliesst. AUCH DAS ist nicht gemessen. Wer die
Frage angeht, prüft BEIDE Seiten, nicht nur die neue.

**(b) Ändert der Umzug die Laufzeitumgebung?**
INSTRUMENT: Build VOR und NACH dem Umzug, danach Vergleich der erzeugten
Manifest-Datei unter `.next/server/`. Sind die beiden Manifeste identisch bis
auf den Namen, hat sich nichts bewegt. Ein anderer Befund ist ein Ergebnis, kein
Fehler — dann gehört er hierher, bevor weitergebaut wird.

### Nachweiskette — drei Stufen

Sie bauen aufeinander auf. Stufe 2 ist die einzige, die beweist, dass Next die
neue Datei überhaupt LÄDT; die Unit-Tests können das nicht (s. Ausgangslage
Punkt 6).

1. **Manifest-Vergleich.** Build vor/nach, Manifest unter `.next/server/`
   gegenübergestellt (identisch bis auf den Namen = nichts bewegt). Beantwortet
   zugleich die offene Frage (b).
2. **LADEBEWEIS — zwei GEKOPPELTE Beobachtungen am SELBEN Build.** Beide müssen
   zutreffen; einzeln beweist keine von beiden etwas:
   - **(A)** Ein Proxy-Eintrag ist im Build-Output vorhanden.
   - **(B)** Die Deprecation-Warnung ist verschwunden, und es steht KEINE neue
     an ihrer Stelle. Beides prüfen: das Fehlen der alten UND die Abwesenheit
     einer neuen. Eine ersetzte Warnung wäre kein Erfolg.
   WARUM GEKOPPELT — und das ist der Grund, warum (A) allein untauglich ist:
   Ein Proxy-Eintrag liegt HEUTE BEREITS vor, erzeugt von der ALTEN Datei
   (s. Ausgangslage Punkt 8). Er sagt für sich genommen nichts darüber, welche
   Konvention gezogen wurde. Die tragende Hälfte ist (B): die Warnung feuert
   genau dann, wenn die ALTE Konvention gezogen wurde — ihr Ausbleiben ist das
   Signal, das (A) erst aussagekräftig macht.
   ERWARTETE ZUSATZBEOBACHTUNG, KEIN BESTEHENSKRITERIUM: Heute lautet das
   Etikett `ƒ Proxy (Middleware)`; zu erwarten ist, dass der Klammerzusatz
   wegfällt. Das wird NICHT als Kriterium gewertet — was Next für eine native
   `proxy.ts` druckt, ist NICHT gemessen. Der tatsächliche Wortlaut des neuen
   Etiketts wird beim Live-Schritt PROTOKOLLIERT und hier nachgetragen.
3. **Live-Test auf BEIDEN Host-Typen.** App-Host: das Auth-Gate greift,
   anonymer Aufruf wird auf `/login` umgeleitet. Kunden-Domain: die Seite wird
   ausgeliefert, und `/api/e` kommt durch. Die Phase fasst die Auth-Grenze und
   die Host-Weiche an — ein Host-Typ allein beweist nichts über den anderen.

### Rückweg

Instant Rollback im Vercel-Dashboard auf das vorherige READY-Deployment.
