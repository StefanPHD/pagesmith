# Pagesmith — Projektgedächtnis

## Vision (Was wir bauen)
Eine schlanke Hosting- & Integrations-Plattform, maßgeschneidert für High-Level
Performance-Marketer (DACH-Raum & international).
KI-Tools (Claude, v0, Bolt) erzeugen hübsches, aber "stummes" HTML/CSS/JS.
Pagesmith macht diesen Code funktional: Buttons/Forms werden per "Click & Connect"
mit echten Aktionen (Stripe, PayPal, Form-Webhook, Meta/Google-Events) verdrahtet,
serverseitig getrackt (CAPI, adblocker-resistent) und mit 1 Klick auf eigener Domain
live geschaltet. Kernversprechen: ultraschnelles reines HTML statt WordPress-Ballast,
Server-Side-Tracking, federleichtes A/B-Testing.

Zielnutzer: Media Buyer, die wöchentlich neue Domains für Rapid Testing kaufen.

## Modus
Solo-Entwickler, "Build in Public" auf GitHub. Passion-Projekt in freien Stunden.
Lean MVP: kleinste nutzbare Schritte, Infrastruktur so spät wie möglich.
Jeder Schritt soll demobar / screenshot-tauglich sein.

## Tech-Stack
- Next.js (App Router) + TypeScript + Turbopack. Lokal: Node v24.16.0.
- Tailwind CSS
- Erkennung im Browser: nativer DOMParser (keine Dependency)
- Code-Transformation: clientseitig via DOMParser (wie Detection); Cheerio erst in
  der Serving-Schicht beim Hosting (Phase 7), nicht früher
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3
- Hosting/Deploy-Orchestrierung: Vercel/Netlify API — ab Phase 7

## Roadmap & aktueller Stand
- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: Drei-Zonen-Workspace, postMessage-Klick-Brücke,
      bidirektionales Highlighting. Siehe Detail-Block unten.
- [x] Phase 3 — Persistenz & Auth (Supabase): stabile Element-IDs, E-Mail/Passwort-
      Auth, Code-Persistenz, Multi-Projekt-Verwaltung. Fundament steht. Siehe
      Detail-Block unten. Advanced Features (Consent-Gate, DTR) folgen danach.
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz: die "Click & Connect"-Wertschöpfung —
      Aktionen zuweisen/konfigurieren/speichern (Redirect) und verwaiste Mappings
      sichtbar machen/löschen/neu-verknüpfen. Siehe Detail-Blöcke unten.
- [x] Phase 4 — Code-Generierung + HTML-Export: generateFunctional bäckt die
      Mappings in funktionales HTML (reine Engine + funktionale Vorschau), Ausgabe
      per Download/Copy. Client-seitig via DOMParser; Cheerio erst in der
      Serving-Schicht (Phase 7), nicht hier. Siehe Detail-Blöcke unten.
- [ ] Phase 4.5 — Editor-Politur (klein, als Nächstes): Zen-Modus — Code-Spalte
      nach erfolgreichem Import standardmäßig EINGEKLAPPT (reiner lokaler
      UI-View-State, KEIN Daten-/Mapping-Zustand, berührt dirty-Tracking nicht;
      jederzeit wieder aufklappbar). Platz für weitere rein-lokale UX-Verfeinerungen.
- [ ] Phase 5 — In-Place Copywriting (nächstes GROSSES Feature): zweiter Modus neben
      Link-Mapping; liest <p> und <h1>..<h6> aus, Marketer überschreibt Texte direkt
      (A/B am Wording). Neuer Mapping-Typ { elementId, type:"text", config:{content} }
      auf bestehender Infrastruktur (anchorMappingTarget, Weg-C-Netz, JSON-Datenblock,
      generateFunctional + zusätzlicher Handler). OFFENE Designfragen: siehe
      Zukunfts-Vision-Block unten.
- [ ] Phase 6 — Server-Side Tracking (CAPI): Next.js API-Route als Tracking-Proxy
      für Meta/Google. (war Phase 5)
- [ ] Phase 7 — Hosting & Go-Live: Vercel/Netlify-API, Custom Domains, SSL.
      ACHTUNG: härtester Brocken (Multi-Tenant Custom Domains + Auto-SSL); schaltet
      zugleich die Funnel-Vision frei. (war Phase 6)
- [ ] Phase 8 — A/B-Testing: 50/50-Split über Edge-Logik. (war Phase 7)

## Phase 2 — Click & Connect (Core-Architektur & UX)
Der zentrale Flow des Produkts. UX-Qualität hier entscheidet über Erfolg.
- Sobald Code gepastet ist, klappt das linke Eingabefeld ein/minimiert sich.
  Die gerenderte Live-Preview (Iframe) rückt ins Zentrum.
- Hover über ein erkanntes Element (Button, Form) in der Live-Preview = klares
  visuelles Highlight. Klick darauf öffnet rechts eine dynamische
  Workspace-Sidebar (Action-Panel).
- Jedes ausgewählte Element bekommt eine eindeutige ID und wird im React-State
  `mappings` konfiguriert. Bereits verdrahtete Elemente sind in der Preview
  sichtbar markiert (z.B. Badge/Outline), damit der User den Überblick behält.

### Action-Panel — Verfügbare Aktions-Kacheln
PAYMENTS (Umsatz):
- Stripe-Kachel: Eingabe einer Stripe-Produkt-ID. Deckt Kreditkarte, Apple Pay,
  Klarna etc. ab.
- PayPal-Kachel: Eingabe von PayPal-E-Mail oder Button-ID.
  WICHTIG: PayPal ist DER Conversion-Bringer im DACH-Raum — gleichwertig
  prominent wie Stripe behandeln, nicht als Nachgedanke.

LEAD-GEN & AUTOMATION (E-Mail-Marketing):
- "Anti-Overflow"-Strategie via Universal Webhook (Zapier / Make): Bei
  Form-Submit werden die Formulardaten direkt an eine vom User hinterlegte
  Webhook-URL gefeuert. Damit kann JEDER E-Mail-Anbieter (Klaviyo, Mailchimp,
  ActiveCampaign) ohne eigene Bloatware-Integration angebunden werden.
  Wir bauen KEINE Direkt-Connectoren pro Anbieter — der Webhook ist die
  universelle, schlanke Brücke.

## Phase 3 — Persistenz & Auth
Erster Schritt mit Server/DB. Prioritäten (vom Owner festgelegt): 1. sauberes
Datenmodell, 2. Sicherheit/RLS, 3. erst dann Sichtbares. Wird in Sub-Phasen
gebaut, nicht in einem Rutsch. Login-Methode: E-Mail + Passwort (Supabase Auth).

Kernentscheidung (gilt für ganz Phase 3): Gespeicherte Mappings hängen an einer
STABILEN, code-residenten Element-ID, nicht an der positionsbasierten el-N-ID.
Strategie "Weg B + C als Netz": die stabile ID wird dauerhaft in den HTML-Code
geschrieben (B); wenn eine gespeicherte ID im Code nicht mehr auffindbar ist
(z.B. extern gelöscht), wird das Mapping NICHT still repariert, sondern dem User
sichtbar als "verwaist" angezeigt (C). Der User darf seinen Code explizit auch
extern bearbeiten — deshalb ist das C-Netz Pflicht, nicht optional.

### Sub-Phasen
- [x] 3.0 Stabile Element-IDs (rein lokal in detect.ts, KEIN Server) — fertig,
      getestet: code-residente ps-IDs (ps-XXXXXX) ersetzen die el-N-ID.
- [x] 3.1 Supabase-Setup + Auth — fertig, manuell verifiziert: @supabase/ssr,
      server-seitige Session via Cookies, E-Mail/Passwort, Auth-Gate über
      src/middleware.ts (sperrt alle Routen ausser /login; Session ueberlebt
      Reload; Account-Wechsel sauber).
- [x] 3.2 Datenmodell + ein Projekt speichern/laden (RLS von der ersten Zeile an)
      — fertig, manuell verifiziert: projects-Tabelle mit RLS (Zwei-Account-Test
      grün, User B sieht User A nicht), client-seitige Stabilisierung, Save/Load
      via Server Actions, Auto-Load beim Öffnen, Weg-B ID-Write-back aktiv.
- [x] 3.3 Multi-Projekt-Support (Erstellen, Laden, Wechseln, Löschen) — fertig:
      UNIQUE(user_id) entfernt, id-basierte Server Actions (list/load/save/delete/
      rename, user_id immer aus getUser + expliziter Filter), Projekt-Switcher mit
      Dirty-Guard, Löschen mit Bestätigung + Fallback auf zuletzt bearbeitetes.
      Schließt Phase 3 ab. C-Netz für verwaiste Mappings bewusst auf den
      Mapping-Schritt verschoben. Siehe Detail-Block unten.

### Schritt 3.0 — Stabile Element-IDs (Detail)
Problem: el-N ist positionsbasiert und verschiebt sich bei jedem Code-Edit ->
als Speicher-Schlüssel wertlos.
Ziel: jedes verknüpfbare Element trägt eine dauerhafte data-pagesmith-id, die im
Code lebt und sich beim Einfügen/Entfernen ANDERER Elemente nicht verschiebt.
ID-Format (Owner-Entscheidung, endgültig): IMMER selbst generiert, "ps-" + 6
zufällige Zeichen. NIEMALS die id="..."-Attribute des Users wiederverwenden
(nicht eindeutig, vom User änderbar). Unsere ID ist isoliert und unberührbar.
Drei-Fall-Logik beim Parsen:
- Bekannt: gültige data-pagesmith-id vorhanden -> unverändert übernehmen.
- Neu: verknüpfbar, aber keine/ungültige ID -> frische ps-XXXXXX generieren und
  als Attribut schreiben.
- Dupliziert: dieselbe ID mehrfach im Code -> erstes Vorkommen behalten, weitere
  wie "Neu" behandeln (frische ID), damit jede ID eindeutig bleibt.
Architektur-Hinweis: ID-Stabilisierung (verändert den Code) und Element-Detection
gedanklich getrennt halten, damit detect.ts nicht zum Knäuel wird.
Regressions-Grenzen: Phase-1-Härtung, Dedup, Dokument-Reihenfolge und die
komplette Phase-2-Brücke (Klick/Highlight/Handshake, sandbox="allow-scripts")
bleiben unverändert — die Brücke darf nur voraussetzen, dass jede ID eindeutig
und im Attribut vorhanden ist, nicht ihr Format.
NICHT in 3.0: der "verwaiste Mapping"-Fall (gespeicherte ID fehlt im Code) —
der gehört zu 3.2/3.3, nicht hierher.

### Schritt 3.1 — Supabase-Setup + Auth
Ziel: Fundament für Persistenz. User kann sich registrieren, einloggen,
ausloggen; die App kennt server-seitig den User. NOCH KEINE Projekt-Tabelle,
NOCH KEIN Speichern — das ist 3.2. 3.1 bleibt bewusst klein.

Owner-Entscheidungen (endgültig):
- Auth-Session: server-seitig via Cookies mit dem offiziellen @supabase/ssr-Muster
  (nicht client-only). Grund: 3.2 braucht server-seitige Identität für
  Persistenz + ID-Write-back.
- Login: E-Mail + Passwort.
- Zugang: ALLES hinter Login (auch der Editor). Genau eine Schutzregel: nicht
  eingeloggt -> Redirect auf /login.
- E-Mail-Bestätigung: fürs MVP AUSGESCHALTET (sofort eingeloggt). Bewusste
  MVP-Abkürzung.

WICHTIG vor Launch (TODO, nicht vergessen): E-Mail-Bestätigung wieder
einschalten, bevor Pagesmith öffentlich live geht.

Sicherheits-Prinzipien (gelten ab jetzt für ganz Phase 3):
- Secrets-Disziplin: nur NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY
  in .env.local (für den Browser bestimmt, durch RLS abgesichert). Der
  service_role-Key kommt NIEMALS in Client-Code oder ins Repo. .env.local muss in
  .gitignore stehen. Keine echten Keys in Commits.
- RLS-Prinzip: Row Level Security wird mit jeder Tabelle ZUSAMMEN aktiviert, nie
  "später". (Greift ab 3.2, wenn Tabellen entstehen — hier als Prinzip festhalten.)

Architektur-Bausteine für 3.1 (Vorausblick, Detail folgt im Build-Schritt):
getrennter Browser- und Server-Supabase-Client unter src/lib/supabase/,
middleware.ts für Session-Refresh + Auth-Gate, eine Login/Signup-Seite,
Logout-Aktion. Der bestehende Editor (Phase 1–3.0) wird NICHT verändert, nur
hinter das Login-Gate verschoben.
Bekannte Stolperfalle: das @supabase/ssr-Cookie-Handling in der Middleware ist
fehleranfällig — strikt das offizielle, aktuelle Muster verwenden, nicht
improvisieren.

### Schritt 3.2 — Datenmodell + Projekt speichern/laden (ABGESCHLOSSEN)
Status: fertig, manuell verifiziert. projects-Tabelle mit RLS (Zwei-Account-Test
grün), client-seitige Stabilisierung vor dem Speichern, Save/Load via Server
Actions (src/app/projects/actions.ts), Auto-Load beim Öffnen des Editors,
Weg-B ID-Write-back aktiv (ps-IDs landen sichtbar im gespeicherten Code).

Scope (Owner-Entscheidungen, endgültig): NUR Code-Persistenz. Ein Projekt pro
User, manueller Speichern-Button, Auto-Load beim Öffnen des Editors. Schema wird
JETZT schon mappings-fähig gebaut, Mappings aber noch NICHT befüllt (eigener
Schritt, sobald die Action-Zuweisungs-UI existiert — die gibt es noch nicht).

Schema — Tabelle projects:
- id uuid PK, user_id uuid not null FK auf auth.users(id) on delete cascade,
  name text (Default "Mein Projekt"), html text (stabilisierter Code mit ps-IDs),
  mappings jsonb not null default '[]' (jetzt designt, leer), created_at/
  updated_at timestamptz.
- Unique-Constraint auf user_id erzwingt "ein Projekt pro User" -> Speichern ist
  ein Upsert (on conflict user_id do update). BEWUSSTE 3.2-Vereinfachung:
  3.3 entfernt diese Constraint wieder (mehrere Projekte). Kein Versehen.

RLS (kritisch, mit der Tabelle zusammen aktiviert):
- Vier Policies, alle auf user_id = auth.uid(): SELECT USING; INSERT WITH CHECK;
  UPDATE USING + WITH CHECK; DELETE USING.
- WITH CHECK bei INSERT UND UPDATE ist Pflicht (Upsert trifft beide), sonst
  könnte ein User eine fremde user_id reinschreiben.

Architektur-Kernentscheidung (verhindert stillen Weg-B-Bruch):
- Die ID-Stabilisierung läuft CLIENT-SEITIG. Grund: stabilizeIds nutzt DOMParser,
  der nur im Browser existiert; auf dem Server greift der SSR-Guard und es würden
  KEINE ps-IDs geschrieben. Der Client ruft stabilizeIds(rawCode) auf (IDs ins
  Attribut, OHNE Preview-Script/Style-Injektion) und schickt das fertige
  stabilisierte HTML an die Server Action, die es nur noch speichert. Server
  parst nichts.

Speichern/Laden-Fluss:
- Speichern (Button): Client stabilisiert -> Server Action saveProject holt User
  via getUser(), setzt user_id selbst (NIE aus Client-Daten), upsertet. Danach
  spiegelt der Client das stabilisierte HTML zurück in die Textarea (Transparenz:
  der User SIEHT, dass ps-IDs in seinen Code geschrieben werden). Das löst die
  3.0-Sprung-Eigenheit.
- Laden (automatisch): Editor-Seite (Server Component) lädt via loadProject die
  eine Projektzeile und reicht initialCode an CodeImporter. Kein Projekt -> leer.

Schema-Anwendung: SQL als committete Migrations-Datei im Repo
(supabase/migrations/), vom Owner manuell im Supabase-SQL-Editor ausgeführt.
service_role kommt weiterhin NIRGENDS vor; alles über anon-Key + RLS +
Server-Session.

Regressions-Grenzen: detect.ts/stabilizeIds werden genutzt, nicht geändert.
Editor-Kern (Debounce, Preview, Brücke, Highlighting, ps-IDs) unverändert;
CodeImporter bekommt nur initialCode-Prop + Speichern-Button. Auth aus 3.1
unberührt. Tests grün.

### Schritt 3.3 — Multi-Projekt-Support (ABGESCHLOSSEN)
Status: fertig. Schließt Phase 3 ab — das Persistenz-Fundament (stabile IDs,
Auth, Code-Persistenz, Multi-Projekt) steht. Inline-Rename + Dirty-Guard beim
Wechseln/Neu-Anlegen (window.confirm) sind mit drin.

Scope (Owner-Entscheidung): NUR Multi-Projekt-Verwaltung (Erstellen, Laden,
Wechseln, Löschen). Das Weg-C-Netz für verwaiste Mappings ist BEWUSST verschoben
auf den späteren Mapping-Schritt (es gibt noch keine Mappings, auf die es wirken
könnte).

Datenbank-Migration (auf LIVE-Daten):
- Entferne die UNIQUE(user_id)-Constraint aus projects (mehrere Projekte pro User).
- drop constraint ist nicht-destruktiv/umkehrbar. Bewusstseins-Notiz: künftige
  Migrationen, die DATEN anfassen, brauchen vorher ein Supabase-Backup/Snapshot.

Speicher-Landmine (Kopplung): Das Entfernen der Constraint bricht den bisherigen
Upsert (on conflict user_id). Server Actions werden im selben Schritt umgestellt
auf Arbeit per spezifischer project_id:
- saveProject(projectId | null, html): update der Zeile per id, ODER insert wenn
  projectId null (neues Projekt). user_id IMMER aus der Server-Session (getUser),
  nie aus Client-Daten.
- loadProject lädt per id ODER das zuletzt bearbeitete (order by updated_at desc
  limit 1).
- Defense in depth: ALLE Queries (load/save/delete) filtern zusätzlich explizit
  user_id = auth.uid(), nicht nur auf RLS verlassen.
- updated_at wird bei JEDEM Speichern verbindlich auf now() gesetzt (nicht
  optional — "zuletzt bearbeitet" hängt daran).

UX-Einstieg (Owner-Entscheidung, kombiniert):
- Nach Login direkt in den Editor; automatisch das zuletzt bearbeitete Projekt
  laden. Leere Liste -> leeres "Unbenanntes Projekt" im State (noch keine DB-Zeile).
- Projekt-Verwaltung im UI (Header oder ausklappbare Sidebar): Projekte sehen,
  wechseln, neu erstellen, löschen.

Edge-Cases (verbindlich):
- Neues Projekt lebt zunächst nur im Editor-State; DB-Zeile entsteht ERST beim
  ersten echten Speichern (keine "Unbenanntes Projekt"-Karteileichen).
- Löschen ist destruktiv -> Bestätigungs-Popup vor Ausführung.
- Löschen des AKTIVEN Projekts: Editor fällt auf das nächste (zuletzt bearbeitete)
  Projekt zurück; war es das letzte -> leerer "Unbenanntes Projekt"-Zustand. Nie
  ein kaputter State mit toter projectId.

Regressions-Grenzen: Editor-Kern (Debounce, Preview, Brücke, Highlighting,
ps-IDs, client-seitige Stabilisierung), Auth/Middleware aus 3.1, RLS-Policies aus
3.2 bleiben unverändert. Tests grün.

### DB-Sicherheits-Härtung (zwischen Phase 3 und Mappings, 0003)
Kleine Sammel-Migration für vier Supabase-Security-Advisor-Warnungen, kein Feature.
- `set_updated_at()` (unser Trigger aus 0001): fester `search_path = public`
  gegen search-path-Hijacking.
- `rls_auto_enable()` existiert in der DB (Event-Trigger, aktiviert RLS auf neuen
  public-Tabellen — schützend), stammt aber NICHT aus unseren Migrationen
  (Schema-Drift; from_extension = NULL, also keiner Extension zugehörig). In 0003
  per `revoke execute ... from public/anon/authenticated` abgesichert (alle drei
  nötig, da anon/authenticated eigene Grants haben; Event-Trigger läuft als Owner
  und wird durch den Entzug NICHT gestoppt).
- "Leaked Password Protection" ist eine Dashboard-Einstellung
  (Authentication -> Settings), per Toggle zu aktivieren — KEIN SQL.

## Mapping-/Action-Zuweisung (ABGESCHLOSSEN)
Phase 3 hat das Fundament gelegt (stabile ps-IDs + Persistenz + Multi-Projekt);
darauf aufbauend ist die "Click & Connect"-Wertschöpfung jetzt VOLLSTÄNDIG: dem
ausgewählten Element echte Aktionen zuweisen und in mappings (jsonb) speichern.
Komplett umgesetzt und ruhend auf den stabilen ps-IDs aus Phase 3.0:
- Aktion zuweisen / konfigurieren / "Übernehmen" wirkt nur in den Draft (Code- +
  mappings-State + ps-ID-Anker); Persistenz ausschließlich über den großen,
  bewussten "Speichern"-Button (saveProject) — kein Auto-Save (Riegel-Test).
- Sichtbarer Dirty-Indikator (großer Button + kleiner Punkt am Projektnamen, aus
  DEMSELBEN kombinierten dirty über code UND mappings); klare Benennung
  ("Übernehmen" vs. "Speichern") löst die frühere Doppeldeutigkeit auf.
- Navigations-Guards (wechseln / neu / löschen + beforeunload) gegen das
  kombinierte dirty.
- Vollständiges Weg-C-Sicherheitsnetz für verwaiste Mappings: anzeigen + löschen
  + neu verknüpfen (Details in den Scheibe-1/2-Blöcken unten).

Nächster großer Schritt: Code-Generierung (Phase 4, Cheerio) — die erfassten
Mappings ins echte Output-HTML backen (Redirect/Payment-Trigger wirklich
verdrahten), bisher erfassen wir nur die ABSICHT. Danach Hosting (Phase 6), das
zugleich die Funnel-Vision freischaltet (siehe Zukunftsrichtung).

### Mapping-Schritt 1 — Redirect-Aktion (Absicht erfassen) (ABGESCHLOSSEN)
Status: fertig. Die erste Hälfte der Mappings steht — Absicht erfassen + im UI
anzeigen + persistieren. Konkret umgesetzt:
- Aktion zuweisen / konfigurieren / übernehmen im ActionPanel; Persistenz in die
  DB ausschließlich über den großen "Speichern"-Button (saveProject).
- Sichtbarer Dirty-Indikator: bei ungespeicherten Änderungen wird der große
  Button orange + "Ungespeicherte Änderungen" / "Speichern •", nach erfolgreichem
  Speichern zurück auf neutrales Blau (gespeist aus DEMSELBEN kombinierten dirty
  wie der kleine Punkt am Projektnamen).
- Die Kachel-Aktion heißt "Übernehmen" und wirkt NUR in den Draft (Code-State +
  mappings-State + ps-ID-Anker), schreibt NIE in die DB — klar abgegrenzt vom
  großen "Speichern"-Button. Löst die frühere "Speichern"-Doppeldeutigkeit auf.
- Navigations-Guards (Projekt wechseln / neu / löschen) greifen gegen das
  KOMBINIERTE dirty (code UND mappings); ein beforeunload-Guard warnt zusätzlich
  vor F5/Tab-Schließen bei ungespeicherten Änderungen.

ERSTE Hälfte der Mappings: Aktion zuweisen + konfigurieren + speichern + im UI
anzeigen. Das echte AUSFÜHREN (Button feuert wirklich) gehört NICHT hierher,
sondern in den separaten Code-Gen-Schritt danach (Phase 4, Cheerio). Strikt
trennen — dieser Schritt erfasst nur die ABSICHT, er verdrahtet noch nichts.

Scope (Owner-Entscheidungen):
- Erstes Primitiv: "Redirect bei Klick" (URL-Weiterleitung). Deckt bewusst Stripe
  Payment Link, PayPal-Link und generische Links in EINEM Aktionstyp ab.
- Weitere Aktionstypen (Webhook = POST, Tracking-Events) sind spätere Kacheln,
  nicht jetzt.
- Weg-C-Netz (verwaiste Mappings) BEWUSST abgetrennt: kommt als unmittelbar
  nächster kleiner Schritt NACH der funktionierenden Speicher-/Ladestrecke.

Datenmodell: Mapping = { elementId: ps-id, type: "redirect", config: { url,
openInNewTab } }. Array in der bestehenden mappings-jsonb-Spalte (aus 3.2).
KEINE Migration nötig. type ist Diskriminator (config je Typ gekapselt) -> weitere
Aktionstypen kommen als eigene Union-Zweige dazu, ohne die Redirect-Form anzufassen.

Schlüssel-Notiz (bewusst, NICHT jetzt umbauen): findMapping/upsertMapping
schlüsseln vorerst NUR über elementId (ein Mapping pro Element). Für Redirect-only
korrekt. Sobald ein Tracking-Typ "Redirect + Tracking auf EINEM Element" erlaubt,
wird der Schlüssel auf (elementId, type) umgestellt. Als Code-Kommentar in
src/lib/mappings.ts festgehalten.

Persistenz: saveProject speichert Mappings zusammen mit html, loadProject lädt
beide. RLS-/Projekt-Logik aus 3.2/3.3 unverändert.

Verbindliche Edge-Cases / Landminen:
- Dirty-Tracking umfasst ab jetzt CODE UND MAPPINGS. Sonst stiller Verlust beim
  Projektwechsel, weil Mapping-Änderungen den Code nicht anfassen.
- Beim Zuweisen eines Mappings wird stabilisiert und die ps-ID sofort in den Code
  zurückgespiegelt (wie beim Speichern), damit der Anker dauerhaft ist und Tippen
  das frische Mapping nicht verwaisen lässt. Für ein fabrikneues Element (noch
  keine ps-ID im Code) erzeugt der separate Parse eine ANDERE Zufalls-ID als die
  Preview -> kanonische ID wird per INDEX auf dem stabilisierten HTML ausgerichtet
  (idempotent, gleiche Kandidaten-Reihenfolge), statt der Preview-ID blind zu
  vertrauen.
- mappingsEqual vergleicht MENGENBASIERT (pro elementId), nie positionsabhängig:
  Umsortieren ist NICHT dirty, URL-/Options-Änderung + Add/Remove sind dirty.
- Speichern im URL-Formular ist gesperrt, solange die URL nicht http(s)-gültig ist
  (kein Persistieren kaputter URLs).
- Preview bleibt selektions-only: KEIN echter Redirect, sandbox="allow-scripts"
  unverändert, NIE allow-same-origin.

UI: ActionPanel (bisher nur Text) bekommt die Zuweisung. Verknüpfte Elemente
bekommen ein Badge in der Erkannte-Elemente-Liste.

Phase-Stand & nächster Schritt: Mappings erste Hälfte (Intent erfassen) steht.
Als Nächstes folgt das BISHER VERSCHOBENE Weg-C-Netz (verwaiste Mappings sichtbar
machen: gespeicherte ps-ID nicht mehr im Code -> Mapping als "verwaist" anzeigen,
nicht still reparieren), danach die Code-Generierung (Phase 4, Cheerio).

### Mapping-Schritt 2 — Weg-C-Netz (verwaiste Mappings), Scheibe 1 (ABGESCHLOSSEN)
Status: fertig, Pipeline grün (npm test inkl. findOrphans-Tests, tsc, lint, build).
Verwaiste Mappings werden ABGELEITET erkannt (findOrphans in src/lib/mappings.ts,
unit-getestet) und in einer eigenen, immer sichtbaren Sektion "Verwaiste
Verknüpfungen (N)" (nur bei N>0, über den drei Zonen) mit gespeicherter Konfig
(Typ + URL) + Löschen angezeigt. Konkret umgesetzt:
- Flash-Guard via debouncedCode === code: Orphans werden erst berechnet, wenn die
  Elementliste den AKTUELLEN Code widerspiegelt (kein Initial-Lade-Flackern,
  hydration-safe, kein neues Flag — irrt sicher Richtung "nichts zeigen").
- Verwaiste AUSWAHL degradiert graceful: zeigt selectedElementId auf keine aktuelle
  ps-ID mehr, wird sie wie "nichts ausgewählt" behandelt (ActionPanel-Hinweistext,
  kein stale Redirect-Formular, kein Throw) — war bereits durch die abgeleitete
  selectedElement-Logik abgedeckt.
- Orphans überleben Speichern/Laden (saveProject reicht das ganze mappings-Array,
  nichts wird still fallengelassen). Löschen mutiert den State -> dirty -> der
  große "Speichern"-Button persistiert (kein Auto-Save, kein Re-Link, kein Raten).

Scope (Owner-Entscheidung): Scheibe 1 = ANZEIGEN + LÖSCHEN. Neu-Verknüpfen
(Re-Link) ist BEWUSST auf einen unmittelbaren Folgeschritt vertagt (Scheibe 2).

Was ein verwaistes Mapping ist:
- Ein Mapping verweist über seine ps-ID auf ein Element. Ändert sich der Code so,
  dass diese ps-ID nicht mehr vorkommt (Seite neu generiert, Element gelöscht,
  komplett neue Version eingefügt), zeigt das Mapping ins Leere -> verwaist.
- Begründung Weg C: NICHT still löschen (Datenverlust), NICHT still neu-verknüpfen
  (falsches Raten, gleiche Fehlerklasse wie früher die positionsbasierten IDs),
  sondern SICHTBAR machen und den Menschen entscheiden lassen.

Architektur-Prinzip:
- Verwaisungs-Status wird ABGELEITET, nicht gespeichert (wie dirty). Kein
  orphaned-Flag, keine DB-Migration. Reine Funktion aus (Mappings, aktuell
  erkannte Element-ps-IDs).

Verbindliche Landminen:
- KEIN Initial-Lade-Flackern: Beim Laden ist die Elementliste ~300ms leer
  (Debounce). Orphans dürfen NICHT gegen diese noch-nicht-geparste leere Liste
  berechnet werden, sonst blinkt kurz "alles verwaist". Erst berechnen, nachdem
  der aktuelle Code mindestens einmal echt geparst wurde.
- NIEMALS automatisch reparieren. (Re-Link kommt später und ist dann
  ausschließlich vom Menschen ausgelöst, kein Raten.)
- Orphans überleben Speichern/Laden: ein verwaistes Mapping wird beim Speichern
  NICHT heimlich fallengelassen, sondern wie jedes andere Mapping persistiert.
  Nur explizites Löschen entfernt es.
- Reines Erkennen ändert die Mappings nicht (nicht dirty). Erst Löschen mutiert
  das Mappings-Array -> dirty -> Speichern nötig (konsistent zum Modell).

UI: Verwaiste Mappings können KEIN Element-Badge tragen (Element fehlt ja). Eigene
sichtbare Sektion "Verwaiste Verknüpfungen (N)", nur wenn N>0; je Eintrag die
gespeicherte Konfiguration (URL/Typ) + Löschen (mit Bestätigung, da die
gespeicherte URL verloren geht).

Zukunfts-Anschluss: Dasselbe Orphan-Muster wird später vom Funnel wiederverwendet
(verwaister funnel_step, wenn eine Zielseite gelöscht wurde).

Scheibe 1 schließt das Weg-C-Netz für die Anzeige+Löschen-Stufe ab; Re-Link
(Scheibe 2) folgt — siehe Polish-/Folge-Liste.

### Weg-C-Netz Scheibe 2 — Re-Link (verwaiste Aktion neu verknüpfen) (ERLEDIGT)
Status: fertig, Pipeline grün (npm test inkl. neuer Anker-Tests, tsc, lint, build).
Damit ist das GESAMTE Weg-C-Netz ABGESCHLOSSEN: anzeigen + löschen + neu
verknüpfen. Konkret umgesetzt:
- Re-Link per "Verknüpfen mit …"-Dropdown direkt auf der Orphan-Karte (kein
  modaler Pick-Modus, kein Vorschau-Klick-Flow).
- Geteilte reine anchorMappingTarget-Logik in detect.ts: dieselbe ps-ID-Anker-
  Mechanik für Assign UND Re-Link (kein Duplikat) — jetzt isoliert unit-getestet
  (diskriminierender Test: Anker auf das ZWEITE Element liefert dessen ID).
- Überschreib-Schutz via window.confirm VOR dem Schreiben (Ziel hat schon eine
  Aktion -> "ersetzen?"). Nie still überschreiben.
- Dropdown verschwindet bei 0 aktuellen Elementen -> nur Löschen; die Waisen
  bleiben als Netz erhalten (kein stilles Verwerfen).
- Self-Resolving über den abgeleiteten findOrphans-Status: nach Re-Link ist die
  ps-ID wieder im Code -> Eintrag verlässt die gelbe Sektion, Badge erscheint am
  Ziel. Mutiert State (+ ggf. code) -> dirty -> großer Speichern-Button, kein
  Auto-Save.

Scope (Owner-Entscheidung): Verwaiste Verknüpfung per Dropdown DIREKT auf der
Orphan-Karte einem aktuellen Element neu zuweisen ("Verknüpfen mit …"). KEIN
modaler Pick-Modus, KEIN Vorschau-Klick-Modus.

Was Re-Link ist:
- Nimmt die gespeicherte Konfiguration eines verwaisten Mappings und legt sie auf
  ein vom USER gewähltes aktuelles Element; der alte Orphan-Eintrag wird entfernt.
- Use-Case: Seite neu generiert -> Button hat neue ps-ID -> gespeicherte URL nicht
  neu tippen müssen.

Architektur (Wiederverwendung, kaum neue Logik):
- Re-Link = (1) Config auf das gewählte Element upserten via DERSELBEN Anker-Logik
  wie handleAssignMapping (stabilizeIds + Index-Ausrichtung für frische Elemente +
  Rückspiegelung der ps-ID in den Code) + (2) alten Orphan via removeMapping
  entfernen. Beide Bausteine existieren bereits und sind getestet.
- Self-resolving: sobald die Config auf einem lebenden Element liegt, sieht
  findOrphans dessen ps-ID -> nicht mehr verwaist -> Eintrag verschwindet aus der
  gelben Sektion, Badge erscheint am neuen Element (Status ist abgeleitet).

Weg-C-Grundsatz (unverändert gültig):
- Der Mensch wählt das Ziel. NIE automatisch raten/zuordnen (keine
  Textähnlichkeit, kein Auto-Andocken).

UI:
- Jede Orphan-Karte bekommt neben "Löschen" ein Dropdown "Verknüpfen mit …",
  gefüllt mit den AKTUELL erkannten Elementen (Label = Tag + Textauszug).
- Wenn 0 aktuelle Elemente existieren: Dropdown ausblenden/deaktivieren (nichts
  zum Verknüpfen) -> nur Löschen möglich.

Verbindliche Edge-Cases:
- Überschreib-Schutz: Hat das gewählte Zielelement BEREITS ein Mapping -> vorher
  bestätigen ("Element hat bereits eine Aktion — ersetzen?"). Nie still
  überschreiben.
- Re-Link mutiert mappings (+ ggf. code durch ps-ID-Rückspiegelung) -> dirty ->
  großer Speichern-Button. KEIN Auto-Save.

Scheibe 2 schließt das Weg-C-Netz ab (Anzeigen + Löschen + Re-Link).

## Code-Gen Scheibe 1 — Engine + funktionale Vorschau
Wendepunkt: Bisher erfasst Pagesmith nur die ABSICHT (Mapping-Spezifikation), die
Vorschau ist selektions-only. Code-Gen macht aus der Spezifikation echtes
VERHALTEN — funktionales HTML, in dem die Buttons wirklich feuern. Das ist das
Tor zu Phase 6 (Hosting): erst wenn die Einzelseite real feuert, lohnt das
Ausliefern.

Owner-Entscheidungen (endgültig):
- Output-Mechanismus: EIN injiziertes Laufzeit-Script verdrahtet ALLE Elemente
  einheitlich (erweiterbar auf Webhook/Tracking als spätere Handler). KEIN
  statischer href-Sonderweg in dieser Scheibe — ein Mechanismus, nicht zwei.
- Erste Scheibe liefert: funktionale VORSCHAU im Editor (Button feuert wirklich).
  Export (Download/Copy) ist BEWUSST der unmittelbare Folgeschritt, NICHT jetzt.

Architektur:
- Engine = REINE, unit-testbare Funktion: generateFunctional(html, mappings) ->
  funktionales HTML. Client-seitig (konsistent zur Detektion via DOMParser).
  KEIN Cheerio in dieser Scheibe — Cheerio ist erst die Serving-Schicht in
  Phase 6. Das ist die bewusste Neubewertung der alten "Cheerio für Phase 4"-Notiz
  (Roadmap): die Transformation lebt vorerst client-seitig wie Detektion/
  Stabilisierung, Cheerio kommt erst, wenn serverseitig ausgeliefert wird.
- Engine injiziert vor </body>: (a) eine Mapping-Tabelle als
  <script type="application/json"> und (b) ein kleines Wiring-Script, das pro
  data-pagesmith-id einen Click-Handler hängt (redirect: location.href, bzw.
  window.open bei openInNewTab).
- Nur Mappings einbacken, deren Element im HTML VORHANDEN ist. Verwaiste Mappings
  (Weg-C) werden im Output ignoriert -> Netz und Generator greifen nahtlos
  (gleiche abgeleitete "ps-ID im Code vorhanden?"-Logik wie findOrphans).

Funktionale Vorschau:
- GETRENNTER Modus vom editierenden Preview. Toggle "Editieren" / "Vorschau".
- Funktionaler Modus rendert das generierte HTML; Klick feuert echt.
- WICHTIG: funktionaler Modus injiziert NICHT die Selektions-Brücke; editierender
  Modus bleibt selektions-only. Beide koexistieren, vermischen sich nie.
- Umsetzung: zwei getrennte iframes, konditional gerendert (kein geteiltes srcDoc).
  Das Edit-iframe behält iframeRef + Brücke unverändert; beim Zurückschalten
  remountet es und der bestehende IFRAME_READY-Handshake re-synchronisiert die
  Auswahl. Das funktionale iframe trägt KEINEN ref -> die State->iframe-Effekte
  fassen es nicht an.

Verbindliche Landminen:
- Sicherheit: allow-same-origin bleibt in BEIDEN Modi AUS (User-HTML darf nie an
  unsere Origin — das ist die Grenze, die zählt). Edit-iframe: sandbox=
  "allow-scripts" (unverändert). Funktionales iframe: sandbox="allow-scripts
  allow-popups allow-popups-to-escape-sandbox" (Live-Test-Korrektur, siehe
  Unterabschnitt unten — die frühere "ohne escape-sandbox"-Empfehlung war zu
  vorsichtig und wurde widerlegt).
- URL-Kodierung: Mapping-Tabelle als JSON sicher einbetten (JSON.stringify) und
  jedes "<" als Unicode-Escape maskieren (das Zeichen "<" -> die sechs Zeichen
  Backslash-u-0-0-3-c), damit eine URL mit "</script>" nicht aus dem JSON-Block
  ausbricht. NIE User-URLs naiv in einen JS-String konkatenieren.
- Idempotenz: immer aus dem sauberen gespeicherten HTML generieren; kein doppeltes
  Einbacken/Stapeln von Scripts (nicht auf bereits generiertem Output erneut
  generieren).

### Vorschau vs. Export — Verhalten getrennt (Live-Test-Korrektur)
Live-Test deckte zwei Symptome mit EINER Wurzel auf: die funktionale Vorschau ist
ein srcDoc-iframe, und srcDoc erbt die Basis-URL der Elternseite (unsere Origin
localhost:3000).
- Symptom 1 (gemappter "selber Tab"-Redirect): location.href navigiert das iframe
  SELBST zur Ziel-URL; X-Frame-Options-Seiten (Google/Stripe) verweigern das
  Framing -> "Verbindung abgelehnt". In der EXPORT-Seite (Top-Level) ist genau
  dieses location.href korrekt — nur in der iframe-Vorschau nicht darstellbar.
- Symptom 2 (NICHT gemappter Link, z.B. href="#preis"): Default-Navigation gegen
  die srcDoc-Basis aufgelöst -> localhost:3000 -> unauth -> unsere Login-Maske
  erscheint IM iframe. KEIN Origin-Bruch (allow-same-origin aus, keine Cookies
  geleakt, Session intakt), aber ein Containment-Loch, das zu muss.

Entscheidung — Vorschau-Verhalten vom Export-Verhalten TRENNEN:
- generateFunctional bekommt mode: "export" | "preview" (Default "export").
- EXPORT (unverändert, echte Produktionslogik): nur gemappte Elemente; openInNewTab
  -> window.open, sonst location.href; un-gemappte Links behalten Default-Verhalten.
- VORSCHAU: (a) jede gemappte Weiterleitung öffnet IMMER escaped einen neuen Tab
  (window.open(url,'_blank')); openInNewTab wird in der Vorschau bewusst IGNORIERT,
  weil "selber Tab" im iframe nicht ehrlich zeigbar ist. (b) JEDER andere
  Link-Klick wird preventDefault-stummgeschaltet -> nie Navigation auf unsere Origin.
- Sandbox funktionales iframe: allow-scripts allow-popups
  allow-popups-to-escape-sandbox. Edit-iframe unverändert allow-scripts.
  allow-same-origin bleibt in BEIDEN aus.

Korrektur-Notiz (ehrlich): die vorige "Option 1 ohne escape-sandbox"-Empfehlung war
zu vorsichtig; der Live-Test hat sie widerlegt — OHNE escape-sandbox erbt der
geöffnete Tab die Sandbox, und ein echter Stripe/PayPal-Checkout bricht. Merksatz
bestätigt: die laufende App schlägt die statische Analyse. escape-sandbox betrifft
NUR die Popups (echte Top-Level-Tabs), nicht den Zugriff aufs Eltern-Origin -> hier
harmlos (eigene HTML im eigenen Browser). Beim späteren Ausliefern fremder Seiten an
Dritte neu bewerten (Phase 6).

Scheibe 1 = Engine (rein, getestet) + funktionale Vorschau. Export (Download/Copy)
folgt als unmittelbare Scheibe 2.

### HTML-Export (Scheibe — finaler Export der funktionalen Seite)
Export ist die Auslieferung der echten Engine-Ausgabe als Datei. Kern:
generateFunctional(code, mappings, "export") -> Datei. Engine + export-Modus sind
bereits gebaut und getestet (Gegenproben: gemappt feuert, un-gemappt unberührt,
openInNewTab respektiert). Dieses Slice liefert NUR noch die Ausgabe-Wege, keine
neue Transformations-Logik.

Owner-Entscheidungen (endgültig):
- Ausgabeart: BEIDES — großer Button "Projekt exportieren" (Download .html) +
  kleinerer "In Zwischenablage kopieren" daneben. Copy braucht EHRLICHES Feedback
  ("Kopiert" / Fehlerfall-Hinweis), kein stilles Nichts (clipboard kann
  fehlschlagen, z.B. fehlende Permission / unsicherer Kontext).
- Zustand: WYSIWYG — immer der aktuelle LIVE-Editor-Stand, UNABHÄNGIG vom
  Speichern. Kein Zwang, vorher zu speichern.
- KRITISCH (gleiche Quelle): aus DERSELBEN stabilisierten Quelle generieren, aus
  der auch die funktionale Vorschau baut (NICHT roher, unstabilisierter
  Textarea-Inhalt). Nur so decken sich die ps-ids im Export zeichen-genau mit den
  elementIds der Mappings — sonst liefe das Wiring ins Leere.
- Orphans: still rausfiltern (die Engine tut das ohnehin — gleiche abgeleitete
  "ps-id im Code vorhanden?"-Logik wie findOrphans), ABER ein unaufdringlicher
  Hinweis neben dem Button, NUR wenn offene Orphans existieren (count>0), mit
  Zahl. Gespeist aus der vorhandenen findOrphans-Logik, KEIN neuer Detektionsweg.
- Dateiinhalt: das vollständige Dokument aus generateFunctional("export") 1:1
  (DOCTYPE, head, User-HTML, vor </body> JSON-Datenblock + Wiring-Script). Kein
  zusätzliches Verpacken. Dateiname aus dem Projektnamen slugifiziert (Fallback
  "pagesmith-export.html").
- Vorschau-Garantie: Was in der Vorschau klickt, tut die exportierte Datei —
  gleiche Engine, gleiche Eingaben, nur mode kippt von "preview" auf "export".

## Zukunfts-Vision UX & In-Place Editing (jetzt terminiert: Phase 4.5 + Phase 5)
Diese Vision ist inzwischen in der Roadmap terminiert: Zen-Modus als Phase 4.5,
In-Place Copywriting als Phase 5. Der folgende Block bleibt die ausführliche
Quelle (Architektur-Parallele + OFFENE Designfragen) — die Roadmap oben verweist
hierher, statt zu duplizieren. Reihenfolge im Bau: erst Phase 4.5, dann Phase 5.

### 1) Zen-Modus (Code-Feld einklappen)
- Nach erfolgreichem Import startet die linke Code-Spalte standardmäßig
  EINGEKLAPPT (kollabierbares Panel; der bereits vorhandene Collapse-Pfeil wird
  genutzt). Der Marketer braucht Fokus auf Vorschau + Dashboard, nicht aufs
  Code-Feld. Jederzeit wieder aufklappbar.
- Architektur-Leitplanke: das ist REINER lokaler UI-View-State, KEIN Daten-/
  Mapping-Zustand. Gehört NICHT in DB oder Mapping-Modell und berührt das
  dirty-Tracking NICHT.

### 2) In-Place Copywriting (Text-/Headline-Editor) — zweiter Modus neben Link-Mapping
- Liest Fließtexte (<p>) und Überschriften (<h1>..<h6>) aus, listet sie im
  Dashboard; der Marketer überschreibt Texte direkt (schnelle A/B-Tests am
  Wording).
- Architektur-Parallele (Stärke des bestehenden Designs explizit festgehalten):
  ein Text-Override ist nur ein NEUER Mapping-Typ
  { elementId, type: "text", config: { content } }. Nutzt dieselbe
  ID-Verankerung (anchorMappingTarget), dasselbe Weg-C-Orphan-Netz (gelöschtes
  Element -> verwaiste Verknüpfung, unverändert), denselben JSON-Datenblock und
  dieselbe generateFunctional-Engine mit einem zusätzlichen Handler. Bestätigt:
  das type-diskriminierte Mapping-Modell war die richtige Wahl.
- BEWUSST OFFENE DESIGNFRAGEN (als offen dokumentiert, NICHT jetzt entscheiden —
  Klärung erst im Bau-Slice):
  a) Textdetektion ist nicht trivial: verschachtelte Kinder
     (<p>...<strong>...</p>). Ein textContent-Überschreiben würde das Kind-Markup
     zerstören. Zu klären: nur Elemente OHNE Kind-Elemente anbieten? Rich-Text?
     Erstmal nur "reine" Textknoten?
  b) Vorschau vs. Export getrennt (gleiche Lektion wie beim Redirect, eine Ebene
     höher): Die Vorschau kann Text per JS injizieren (live). Der Export sollte
     den Text vermutlich DIREKT in den DOM backen (das <h1> enthält im Export
     schon den neuen Text) statt Laufzeit-JS -> besser für SEO, kein FOUC/
     Flackern, funktioniert ohne JS. Beim Link ist Laufzeit-JS zwingend
     (Klick = Laufzeit), bei Text nicht. Finale Entscheidung im Bau-Slice.
- Lean-Timing: erst NACH dem HTML-Export-Feature angehen; nicht vorziehen.

## Zukunftsrichtung: Funnel-Architektur (bewusst vertagt, NICHT jetzt bauen)
Festgehaltene Richtung, kein Auftrag. Dient als Bauplan-Anker, damit heutige
Entscheidungen sie nicht versperren. Wird NICHT im laufenden Schritt angefasst.

### Vision
Ein Projekt kann perspektivisch ein mehrstufiger Funnel sein (z.B. Landingpage ->
Checkout-Seite -> Dankeseite), alle Seiten im selben Branding, komplett in
Pagesmith gebaut. Marketer denken in Funnels, nicht in Einzelseiten — die
Plattform soll dieser Denkweise folgen.

### Zwei UNTERSCHIEDLICHE Fähigkeiten (nicht vermischen)
Diese zwei Achsen sind getrennte Baustellen und dürfen nicht in einen Topf:

(1) Mehrseitige Projekte + interne Navigation ("Button -> nächster Funnelschritt").
    Neuer Aktionstyp, z.B. { type: "funnel_step", config: { targetPageId } }.
    Das bestehende erweiterbare Mapping-Modell (type-Diskriminator aus dem
    Redirect-Schritt) deckt das bereits ab -> KEIN Modell-Umbau für die Aktion
    nötig, nur ein neuer Union-Zweig.

(2) Formular- / Schnittstellen-Anbindung (eigene Baustelle, NICHT mit Navigation
    vermischen). Beispiele und ihre unterschiedliche Schwere:
    - DOI-/Freebie-Formular an E-Mail-Anbieter posten -> Formular-Handling, nahe
      am künftigen Webhook-Primitiv (POST bei Submit).
    - Zahlungsanbieter Digistore24 / Copecart (Lieferung digitaler Produkte):
      a) Einfacher Link zum externen Bestellformular -> HEUTE SCHON via
         type:"redirect" abgedeckt.
      b) Eingebettetes Bestellformular (InCart-Widgets / embedded Checkout) ->
         Einbettung von Drittanbieter-Code/Skripten in die Seite. Eigene
         Baustelle, später.
      c) Zahlungsbestätigungs-Webhooks (Anbieter ruft UNS bei erfolgter Zahlung)
         -> EINGEHENDES Server-zu-Server-Handling, braucht einen empfangenden
         Endpunkt (nicht nur sendend bei Klick). Technisch anspruchsvollster Teil,
         hängt eng an Hosting (Phase 6) -> ohne ausgelieferte Seite mit
         Server-Komponente kein Webhook-Empfänger.

### Strukturelle Konsequenz
Heute gilt "Projekt = 1 Seite" (html + mappings direkt auf der Projektzeile).
Funnel bräuchte "Projekt = N Seiten" (Seiten als eigene Einheit mit je
html+mappings). Das ist derselbe begrenzte Umbau-Typ wie 3.3 (Multi-Projekt), nur
eine Ebene tiefer -> Bauplan ist vorhanden, machbar, aber NICHT jetzt.

### Timing-Begründung (Lean)
Abstraktion erst bei 2 echten Fällen. Erst muss die Einzelseite end-to-end durch
die gesamte Pipeline (bis Hosting, Phase 6) bewiesen sein, dann die Funnel-/
Mehrseiten-Ebene obendrauf. Vorher = Vorbauen ins Blaue.

### Fußnote fürs Weg-C-Netz
Das Orphan-Konzept (verwaiste Mappings) bekommt später eine Variante "Ziel-Seite
gelöscht" (verwaister funnel_step). Gleiche Idee, nur erweitert.

## Polish-Liste (gesammelt für einen späteren, separaten Aufräum-Durchgang)
Bewusst aufgeschobene Aufräum-Arbeiten — NICHT im laufenden Feature-Schritt
miterledigen, sondern gebündelt abarbeiten.
- FOLGE-SCHRITT: Weg-C Scheibe 2 = Neu-Verknüpfen (Re-Link) eines verwaisten
  Mappings auf ein aktuelles Element. AUSSCHLIESSLICH vom Menschen ausgelöst, NIE
  automatisch geraten (gleiche Fehlerklasse wie früher die positionsbasierten IDs).
  Baut auf der fertigen Scheibe-1-Anzeige (findOrphans + Sektion) auf.
- INVARIANTE (Team-Gedächtnis): "Übernehmen" (handleAssignMapping) wirkt NUR in
  den Draft und ruft NIE saveProject / schreibt NIE in die DB. Der einzige
  DB-Write ist der große "Speichern"-Button. ERLEDIGT: behavioraler Riegel-Test
  in src/components/CodeImporter.test.tsx schreibt das fest (spioniert die echte
  saveProject-Action; Assign-Pfad -> 0 Aufrufe, Pflicht-Gegenprobe Speichern-Pfad
  -> 1 Aufruf). Dazu kam die Komponenten-Test-Basis (@testing-library/react als
  devDep, vitest-Alias + .test.tsx + jsx via tsconfig).
- DEBUGGING-MERKSATZ (aus dem "Autosave"-Fehlalarm dieser Phase): Bei Widerspruch
  zwischen Code-Analyse und Live-Verhalten ZUERST den Dev-Server neu starten
  (stale Cache/Build) und im Network-Tab den echten DB-Write prüfen, statt
  wiederholt denselben Code zu lesen. Die Code-Analyse war korrekt — der
  vermeintliche Autosave ließ sich im Code nicht finden, weil es keinen gab.
- src/middleware.ts -> proxy.ts umbenennen: Next 16.2.9 zeigt eine
  Deprecation-Warnung für die "middleware"-Konvention (proxy ist der Nachfolger).
  Funktioniert weiter, daher unkritisch.
- src/app/layout.tsx: veraltete "Create Next App"-Metadata (title/description)
  durch echte Pagesmith-Metadata ersetzen.
- VOR öffentlichem Launch: E-Mail-Bestätigung in Supabase wieder einschalten
  (fürs MVP bewusst deaktiviert — siehe TODO in Schritt 3.1).
- VOR öffentlichem Launch: Leaked Password Protection aktivieren — ist Pro-gated
  (Free Tier kann nicht). Beim Wechsel auf Supabase Pro (Phase 6) einschalten.
- Initial-Load-Preview erscheint ~300ms verzögert (bewusster Trade-off des
  Hydration-Fixes; bei Bedarf Mount-Effect-Variante, die debouncedCode sofort
  setzt).
- Editor Element->Code-Zeile-Scroll: bewusst verworfen — bräuchte echten
  Code-Editor (CodeMirror/Monaco), Nutzen für Marketer fraglich (arbeiten in der
  Preview, nicht im Rohcode).

## Advanced Features (nach Phase 3, Vorausblick)
- DSGVO/Cookie-Consent-Gate: Checkbox im Action-Panel "Erst feuern nach Consent".
  Aktionen (v.a. Tracking-Events) werden erst nach erteiltem Consent ausgelöst.
  Kompatibel zu gängigen Cookie-Bannern (Cookiebot, Usercentrics).
- Dynamic Text Replacement (DTR): Scanner erkennt zusätzlich Überschriften
  (H1, H2). Der Marketer weist ihnen Parameter zu, sodass sich Texte per
  URL-Parameter austauschen (z.B. ?zielgruppe=Handwerker ersetzt den H1-Text).
  Hinweis: Heading-Erkennung kann den bestehenden Scanner früh erweitern.

## Projektstruktur
- src/app/         Next.js App Router (Pages, API-Routes)
- src/components/   React-Komponenten
- src/lib/         Logik ohne UI (Detection, später Transformation, Clients)

## Code-Konventionen
- TypeScript strikt, keine `any` ohne guten Grund.
- Reine Logik (Detection, Mapping-Transformation) gehört in src/lib/ und ist
  unit-testbar, getrennt von den React-Komponenten.
- Client-Komponenten nur wo nötig ("use client"), sonst Server-Komponenten.
- Aussagekräftige, kleine Commits — Build-in-Public, der Verlauf wird gelesen.

## UX- & Design-Prinzipien (gelten bei JEDER Iteration)
- Dünnes, aber echtes Design-Fundament: Design-Tokens (kleine Palette, ein
  Font-Pairing, eine Spacing-Skala) statt Default-Tailwind-Look.
- Wiederverwendbare Primitive (Button, Panel, Badge) statt copy-paste-Styles.
- Konsistenz vor Verzierung. Keine vorzeitige Politur (Animationen, Onboarding,
  Dark-Mode) bevor der Kern-Loop steht.
- UX-Aufwand fließt ins HERZ des Produkts: "Click & Connect" muss sich direkt,
  sichtbar und fehlertolerant anfühlen.
- Marketer-Mindset: Geschwindigkeit und "1 Klick" über Konfig-Tiefe.

## Immer beachten
- Erst der nutzbare Kern, dann Infrastruktur.
- Importierter User-Code läuft NUR im sandboxed iframe (sandbox="allow-scripts",
  niemals allow-same-origin), nie ungesandboxt.
- Vor neuer Phase: kurz bestätigen, dass die vorige demobar lief.
