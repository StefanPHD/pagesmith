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
- [x] Phase 4.5 — Editor-Politur: (A) Datei-Upload/Drag-Drop als zweiter
      Import-Weg neben Copy-Paste und (B) Zen-Modus — der Collapse versteckt NUR
      die Code-EINGABE (Textarea + Upload), die Elementliste bleibt IMMER sichtbar.
      Reiner lokaler UI-View-State, KEIN Daten-/Mapping-Zustand, berührt
      dirty-Tracking nicht. ABGESCHLOSSEN (live getestet, inkl. Politur). Siehe
      Detail-Block unten.
- [x] Phase 5 — In-Place Copywriting: ABGESCHLOSSEN (live). Textdetektion +
      Override in Preview, Edit UND Export (Scheibe 1 + 1b + 2) sowie Text-Live-Patch
      im Edit-Modus ohne Reload-Sprung (Scheibe 3). Type-diskriminiertes
      Mapping-Modell ein zweites Mal bestätigt.
- [x] Phase 6 — Server-Side Tracking (CAPI): KOMPLETT (Mechanik). Type-diskriminiertes
      Mapping -> Mehr-Aktion -> echtes Meta-Pixel (consent-sauber) -> Secret-Storage
      (service_role + heiligstes Gate) -> CAPI-Route -> Dedup-Beacon. Offener
      End-to-End-Dedup-Sichtbarkeitstest auf verknüpfter Domain -> Phase 7.
- [~] Phase 7 — Hosting & Go-Live: IN ARBEIT.
      [x] Scheibe 7a — Serving auf *.pgsm.site, Label-Lookup, isolierte Origin —
          ABGESCHLOSSEN (live).
      [x] Scheibe 7b — First-Party-Ingest /api/e, chirurgischer Passthrough —
          ABGESCHLOSSEN (live). /api/e ist der neutrale Trichter, in den sich Phase 8
          additiv einhängt. KEIN Cheerio (Revision, siehe 7b-Block unten).
      [~] Scheibe 7c — Custom-Domains + Auto-SSL via Vercel Domains API. Vier Sub-Scheiben:
          [x] 7c-1 Serving-Kern — VOLLSTÄNDIG (Middleware-Inversion "ist
              APP-Host?" + custom_host-Modell + Custom-Host-Serving + /api/e-
              Passthrough am Serving-Zweig; byLabel + byCustomHost servieren
              published_content, App unberührt, Port-Strip + sauberer 404
              verifiziert). XFH-Trust-Boundary in Prod BEWIESEN (Vercel-Preview,
              Gate GO): Vercels Edge überschreibt client-gefälschten
              x-forwarded-host mit dem echten Host.
          [ ] 7c-2 Vercel-Anbindung (Add-Domain-Mutation, server-only Vercel-Token,
              DNS-Anweisungen, Per-User-Hard-Cap) — geplant. ERSTER SCHRITT: das
              Vercel-Domains-API-Konzept (XFH-Gate erledigt, siehe 7c-1).
          [ ] 7c-3 Verify/Status-Polling (Verification vs Configuration) + UX — geplant.
          [ ] 7c-4 Phase-6-Dedup-Sichtbarkeit auf echter verknüpfter Domain (Kirsche) —
              geplant.
      Details in der Phase-7c-Sektion unten. ACHTUNG: härtester Brocken (Multi-Tenant
      Custom Domains + Auto-SSL); schaltet zugleich die Funnel-Vision frei. (war Phase 6)
- [ ] Phase 8 — Analytics & ROI-Ökosystem (Vision): First-Party-Server-Side-Analytics
      (Traffic-Gesundheit, ROI/Attribution, Betreiber-Metriken) + Adblocker-Verlustrate
      über geteilte-eventID-Vergleich ECHTER Events. Detail-Sektion unten. (war A/B-Testing)
- [ ] Phase 9 — A/B-Testing: 50/50-Split über Edge-Logik. (war Phase 8)
- [ ] Phase 10 — AI-Native: Pagesmith MCP-Server. (Detail unter Zukunfts-Vision, war Phase 9)

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

## Phase 4.5 — Editor-Politur: Datei-Upload + Zen-Modus (ABGESCHLOSSEN)
Status: fertig, live getestet (Upload + Zen + Politur), Pipeline grün (npm test
68 grün inkl. validateUploadFile, tsc, lint, build). Zwei kleine, getrennte
Bausteine, NACHEINANDER gebaut (erst Upload, dann Zen-Collapse obendrauf), danach
zwei Live-Test-Korrekturen (uploadError-Reset, Placeholder) + ein A11y-Politur-Fix
(Fokus-Ring). Beide Bausteine sind reiner lokaler UI-View-State, KEIN Daten-/
Mapping-Zustand — sie berühren dirty-Tracking, DB und Mapping-Modell NICHT.
Leitplanke: nichts hiervon wird persistiert (reiner Session-/View-State); Engine,
Wiring, Mapping-Lookup, Orphan-Netz, Export, Auth, RLS bleiben unberührt.

### A) Datei-Upload / Drag-Drop (zweiter Import-Weg neben Copy-Paste)
- Upload-Zone im Code-Panel ("HTML-Datei hochladen oder hierher ziehen") neben der
  bestehenden Textarea. Beides: Klick-Upload UND Drag-Drop.
- Datei wird CLIENTSEITIG via FileReader gelesen, Inhalt in die Textarea gekippt ->
  ab da EXAKT derselbe Pfad wie Paste (Detektion, Stabilisierung, Sandbox-Preview).
  KEIN Server-Upload, KEIN neuer Verarbeitungsweg.
- Grenzen (reine validateUploadFile-Logik, unit-getestet): nur .html / text/html,
  max ~2 MB. Alles andere (falscher Typ, zu groß) -> freundliche, sichtbare
  Fehlermeldung (uploadError), KEIN stilles Schlucken, kein Browser-Hänger.
- uploadError-Handling (Live-Test-Korrektur, projekt-ungebundener View-State):
  am kanonischen Ort zurückgesetzt (im selben Helper applyZenForLoadedCode, der
  bei jedem Projekt-Kontext-Wechsel läuft) UND am ANFANG jedes
  Import-Versuchs (Paste/Upload) gecleart, BEVOR validiert wird. Sonst leuchtet ein
  Fehler aus Projekt A in B weiter / steht neben einer schon ladenden gültigen Datei.
- Placeholder (marketer-tauglich, deutsch, ohne plattform-ungenaue Tastenkombi):
  "Füge hier deinen HTML-Code ein – oder nutze den Datei-Upload unten."

### B) Zen-Modus (Auto-Collapse — versteckt NUR die Code-EINGABE)
PRÄZISIERT nach Live-Test (wichtigste Korrektur ggü. erster Bau-Notiz): Der
Zen-Collapse versteckt NUR die Code-EINGABE (Textarea + Upload-Zone), NICHT das
ganze Panel. Die Liste der erkannten Elemente bleibt IMMER sichtbar — sie ist das
Arbeitswerkzeug des Marketers, nur der rohe Code ist die Ablenkung. Der frühere
ÄUSSERE Gesamtpanel-Collapse (Panel schrumpfte auf einen Zähler-Streifen) wurde
ENTFERNT: EIN Mechanismus, keine zwei konkurrierenden Pfeile.
- Panel-Reihenfolge: (1) Code-Eingabe-Block als Akkordeon — eingeklappt = schlanke
  Zeile "Code anzeigen/editieren", ausgeklappt = Textarea + Upload-Zone (Inhalt
  bleibt STETS gemountet, nur display:none -> Textarea behält State + Debounce);
  (2) Zähler (Buttons/Forms/Links); (3) Elementliste, IMMER sichtbar/scrollbar als
  stabiler DOM-Knoten (Collapse hängt sie nie ab -> Scroll-Position/Höhe springen
  beim Auf-/Zuklappen nicht).
- Zen-Trigger-Regeln (unverändert, steuern jetzt nur den kleineren Eingabe-Bereich):
  Auto-Collapse GENAU EINMAL pro Import-EREIGNIS (onPaste ODER erfolgreicher Upload),
  NICHT an den Detektions-State gehängt (sonst feuert es bei jedem Tastendruck).
  Manuell schlägt Auto dauerhaft (userExpandedManually bleibt sticky bis zum
  Projekt-Kontext-Wechsel). Projekt MIT Code öffnet EINGEKLAPPT, leeres Projekt
  offen (isInputCollapsed deterministisch aus initialCode -> kein
  Hydration-Mismatch). Kein Merken pro Projekt, nichts persistiert.

### Politur (A11y-Fix am Code-Toggle)
- Abgerundeter focus-visible-Fokus-Ring statt nativem rechteckigem outline: der
  rechteckige Browser-outline folgte dem border-radius nicht -> "Eselsohren" über
  die runden Ecken. Fix: focus:outline-none + focus-visible:ring (inset, am
  border-radius des Headers ausgerichtet). focus-VISIBLE (nicht focus): Ring nur bei
  Tastatur-Navigation, kein "blauer Kasten" nach Maus-Klick -> Tastatur-
  Zugänglichkeit bleibt erhalten.

## Phase 5 — In-Place Copywriting, Scheibe 1: Engine + funktionale Vorschau
Zweiter Modus neben dem Link-Mapping: der Marketer überschreibt Texte (<h1>..<h6>,
<p>) direkt für schnelle A/B-Tests am Wording. Kein Modell-Umbau — ein
Text-Override ist nur ein NEUER Mapping-Typ
{ elementId: ps-id, type: "text", config: { content: string } } auf der
BESTEHENDEN Infrastruktur (anchorMappingTarget, Weg-C-Orphan-Netz, JSON-Datenblock,
generateFunctional). Das type-diskriminierte Mapping-Modell bewährt sich damit ein
ZWEITES Mal (nach dem Redirect-Zweig): neuer Aktionstyp = neuer Union-Zweig, keine
Antastung der Redirect-Form.

Owner-Entscheidungen (Scheibe 1, endgültig):
- NUR reine Textelemente als Kandidaten anbieten: <h1>..<h6> und <p>, gefiltert auf
  KEINE Kind-Elemente (nur reiner Text / harmlose Inline wie <br>). Verschachtelte
  Elemente (<p>...<strong>...</a>...) werden in dieser Scheibe NICHT angeboten — ein
  textContent-Überschreiben würde das Kind-Markup zerstören. Rich-Text /
  verschachtelte Texte bleiben BEWUSST ein späteres Slice.
- Kategorientrennung: ein bereits als Link/Button erkanntes Element ist KEIN
  Text-Kandidat (auch wenn es nur Text enthält). Text ist eine EIGENE
  Detektions-Kategorie, kein Überlapp mit den interaktiven Elementen.
- Scheibe 1 liefert: Engine-Erweiterung + funktionale VORSCHAU (Text live editierbar,
  Änderung sofort im Vorschau-iframe sichtbar). Der EXPORT folgt als eigene Scheibe.

Export-Richtung (für die Folge-Scheibe dokumentiert, NICHT jetzt bauen):
- Geänderter Text wird im EXPORT DIREKT in den DOM geschrieben (das <h1> enthält im
  Output schon den neuen Text), NICHT per Laufzeit-JS injiziert -> gut für SEO, kein
  FOUC/Flackern, funktioniert ohne JS. Das ist das "Vorschau-JS vs. Export-direkt-DOM"-
  Muster eine Ebene über der Link-Lektion: beim Link ist Laufzeit-JS zwingend
  (Klick = Laufzeit), beim Text nicht (der Inhalt steht von Anfang an fest).

Architektur (Scheibe 1):
- Detektion: neue Sammel-/Filter-Logik für reine Textelemente — eigene Kategorie,
  typ-agnostische ps-id-Verankerung wie gehabt (dieselbe ID-Mechanik wie bei den
  interaktiven Elementen, nur ein anderer Kandidaten-Filter).
- generateFunctional: verzweigt PRO Mapping nach type — "redirect" -> Click-Wiring
  wie bisher; "text" -> im VORSCHAU-Modus textContent des Elements per ps-id ersetzen.
  EINE Engine mit type-Verzweigung, KEINE zweite parallele Engine.
- UI: select Textelement -> Textfeld mit AKTUELLEM Inhalt vorbefüllt -> überschreiben
  -> Übernehmen (Draft) -> großes Speichern (DB). Exakt das
  "select/config/Übernehmen/Speichern"-Muster wie beim Link, nur config = Text statt
  URL. Die "Übernehmen wirkt nur in den Draft, einziger DB-Write ist Speichern"-
  Invariante gilt unverändert.
- Orphan-Netz + Anker: müssen für type:"text" GENAUSO greifen wie für Links
  (gelöschtes Textelement -> verwaiste Verknüpfung, anzeigen/löschen/re-link).
  findOrphans/anchorMappingTarget arbeiten typ-agnostisch auf ps-ids -> sollte
  automatisch tragen, beim Bau aber VERIFIZIEREN (nicht blind annehmen).

Verbindliche Leitplanken: Link-Mapping, Detektion der interaktiven Elemente,
Selektions-Brücke, Highlighting, Dirty-Tracking, Weg-C-Netz, der bestehende Export
sowie Auth/RLS bleiben UNBERÜHRT. Sandbox unverändert (Edit-iframe allow-scripts;
funktionales iframe allow-scripts + popups wie gehabt). allow-same-origin in beiden
Modi weiterhin AUS.

### Scheibe 1b — UX-Politur: Override-Anzeige + Listen-Filter
Zwei reine Anzeige-/View-State-Verfeinerungen auf Scheibe 1 obendrauf. KEIN
Daten-/Engine-/Detektions-Eingriff, nichts wird persistiert, kein dirty-Effekt.
Leitplanke: element.text (Detektions-Original) bleibt unangetastet, ebenso Engine,
Mapping-Modell, Orphan-Netz, Selektions-Brücke.

1) Override-Text-Anzeige (Konsistenz Vorschau ↔ Liste ↔ Header):
- Liste "Erkannte Elemente" UND ActionPanel-Header zeigen für ein Textelement den
  ÜBERSCHRIEBENEN Text, wann immer ein Text-Mapping existiert (Draft ODER
  gespeichert) — sonst den Detektions-Originaltext. EIN konsistenter
  Ableitungs-Pfad, KEIN Sonderfall "nur bei dirty".
- Reine Anzeige-Ableitung: element.text bleibt der Fallback UND die Vorbefüllung,
  falls das Mapping entfernt wird. Die 60-Zeichen-Truncation gilt für den
  angezeigten Text gleichermaßen.
- Effekt: Vorschau (Engine setzt textContent), Liste und Header ziehen an einem
  Strang — derselbe Override ist überall sichtbar, sofort.

2) Elementlisten-Filter (gegen "Scroll-Schwindel"):
- Drei Pillen über der "Erkannte Elemente"-Liste: "Alle (X)" / "Interaktiv (Y)" /
  "Texte (Z)". Interaktiv = Buttons + Links + Forms zusammen. Klick reduziert die
  Liste sofort auf die Kategorie.
- Filter wirkt NUR auf die Elementliste. Die "Verwaiste Verknüpfungen"-Sektion
  bleibt UNBERÜHRT (Orphans sind kategorie-übergreifend wichtig).
- Aktive Auswahl bleibt ERHALTEN, auch wenn das gewählte Element weggefiltert wird
  (nur unsichtbar — Selektion/Brücke/Highlighting werden NICHT gelöst). Zurück auf
  "Alle" (oder die passende Kategorie) -> wieder sichtbar und weiterhin ausgewählt.
- Reiner View-State, nichts persistiert, kein dirty-Effekt.

### Scheibe 1b — Live-Patch-Versuch revertiert: Lektion (für die saubere Neu-Umsetzung)
KONTEXT: Der Versuch, Text-Overrides ohne iframe-Reload "live" zu patchen, wurde
KOMPLETT revertiert (6 Commits c1b66b5…dcbc440, zurück auf fdc3994). Aktueller,
stabiler Stand: Text-"Übernehmen" löst einen EHRLICHEN Edit-iframe-Reload aus (Seite
springt hoch, bleibt oben). Brücke, Selektion, Override-in-beiden-Modi (deklaratives
srcDoc-Prop + generateFunctional("edit")-Einbacken), Filter, displayTextFor-Deriver:
alle intakt.

WARUM REVERTIERT: Der imperative srcdoc-Umbau (iframeRef.current.srcdoc =
editPreviewHtml(...)) erzeugte ein KORRUPTES iframe-Dokument — das injizierte
Brücken-Skript wurde abgeschnitten ("Uncaught SyntaxError: Unexpected end of input at
about:srcdoc"), dazu hunderte 403/CORS auf /_next/static/chunks aus origin 'null'
(Next-Referenzen ins srcdoc geraten). Folge: die Brücke lief NIE -> keine Selektion,
kein Highlighting, un-gemappte Klicks navigierten zur Login-Maske. Der deklarative
srcDoc-PROP hatte das nie: React setzt das Attribut sauber als GANZES; imperatives
Zusammenstückeln in der Sandbox tut es nicht. (Stale Cache war ausgeschlossen — harter
Neustart + .next gelöscht half nicht.)

DIE LEKTION (das Wichtige): Die IDEE war richtig — den Reload AN DER WURZEL vermeiden,
statt den Scroll-Sprung zu kaschieren —, nur der MECHANISMUS war falsch. Scroll-
Restoration, instant-Nachsetzen, Lade-Overlay und Orphan-Freeze waren allesamt
Pflaster auf einer Wunde, die der Reload selbst schlägt. Der saubere Weg für die
Neu-Umsetzung (NICHT heute bauen):
- Edit-iframe bleibt DEKLARATIV per srcDoc-Prop gerendert (nie wieder imperativ
  anfassen). srcDoc hängt NUR vom CODE ab.
- Eine Text-Override-Änderung fasst srcDoc NICHT an, sondern schickt dem laufenden
  iframe eine postMessage über die bestehende Brücke (z.B. PS_SET_TEXT
  { elementId, content }) -> ein Skript IM iframe setzt textContent per ps-id. Kein
  Reload, kein Sprung, kein Overlay nötig. ADDITIVER message-Handler (wie
  SET_SELECTED_ID/ELEMENT_CLICKED) — die risikoärmste Operation, die Brücke überlebt
  das nachweislich.
- Reload-Fall (Code-Änderung/Projektwechsel): das frisch erzeugte srcDoc bäckt die
  Overrides weiterhin per generateFunctional("edit") ein (= Override-in-beiden-Modi,
  bleibt). Bei Reload via eingebackenem HTML, zwischen Reloads via postMessage-Patch —
  beide Wege, dasselbe Ergebnis, kein Divergieren.
- WICHTIG: JEDE Stelle, die ein PRÄSENTES Text-Mapping erzeugt/ändert/entfernt, muss
  PS_SET_TEXT posten (Übernehmen + Entfernen + Text-Orphan-Relink) — sonst divergiert
  das stehende iframe von Liste/Header. Dieser "Relink-Fund" war die einzige
  inhaltlich wertvolle Erkenntnis aus dem revertierten Versuch.
- UNTERSCHIED zum gescheiterten Versuch: damals ZWEI riskante Änderungen gleichzeitig
  (Mapping-Entkopplung UND imperatives srcdoc). Sauber ist NUR additiv eine
  postMessage, srcDoc-Rendering komplett unangetastet.

### Scheibe 3 — Text-Live-Patch: Reload-Sprung an der Wurzel eliminiert (ABGESCHLOSSEN, live getestet)
Status: fertig, LIVE getestet, Commit "feat(edit): live-patch text overrides via
PS_SET_TEXT". Pipeline grün (tsc/lint/build + Tests: srcDoc-Stabilität, Reload-Bake,
PS_SET_TEXT-Handler, Post-Sites). Browser-Verifikation aller drei Post-Stellen:
Übernehmen patcht live ohne Sprung/Flackern, Scroll-Position bleibt; Entfernen stellt
den Original-Detektionstext live wieder her; Text-Orphan-Relink legt die Waisen-Config
live aufs gewählte Ziel (Waisenzahl fällt korrekt). Erster-Override- bzw. Relink-Reload
(ps-id-Einbrennen in den Code) tritt EINMALIG auf und ist akzeptiert (Bake = Quelle der
Wahrheit), kein Bug. Entkopplung bestätigt: srcDoc hängt nur am Code (useMemo-Dep
[previewHtml], bewusste exhaustive-deps-Ausnahme); Live-Änderungen fließen additiv über
PS_SET_TEXT an die unveränderte Brücke. Preview-iframe bewusst außer Scope (reloadet wie
bisher).

KLARSTELLUNG (Relink-Richtung, war ein Erwartungs-Stolperstein im Live-Test):
"Verknüpfen mit …" stempelt die CONFIG DER WAISE auf das GEWÄHLTE Zielelement — nicht
den Zieltext auf die Waise. Das Ziel zeigt danach den Waisen-Override. Korrektes,
beabsichtigtes Verhalten.

Setzt die saubere Neu-Umsetzung aus dem revertierten Versuch um (NICHT der alte
imperative Weg). Ziel: „Übernehmen" eines Text-Overrides im Edit-Modus löst KEINEN
iframe-Reload mehr aus -> kein Scroll-Sprung. Der Override wird live per postMessage
gepatcht statt durch srcDoc-Neubau.

Owner-Entscheidungen (endgültig):
- SCOPE strikt nur Edit-iframe. Das funktionale Preview-iframe bleibt UNANGETASTET
  (kein ref, kein PS_SET_TEXT) und reloadet wie bisher beim Rüberschalten — im
  „Ergebnis ansehen"-Kontext akzeptabel; schützt die bewusste No-ref-Entscheidung.
- Wurzel-Entkopplung: Edit-srcDoc hängt ab jetzt NUR vom Code ab (nicht mehr von
  Text-Mappings). Es wird nur bei Code-Änderung neu erzeugt; beim Neu-Erzeugen
  bäckt es die AKTUELLEN Overrides weiter per generateFunctional("edit") ein
  (Override-überlebt-Reload bleibt). Die Dependency-Auslassung der Text-Mappings
  ist BEWUSST und im Code kommentiert (live-Änderungen fließen über PS_SET_TEXT,
  Code-Änderung backt den aktuellen Stand neu).
- Live-Pfad: eine Text-Mutation fasst srcDoc NICHT an, sondern postet dem laufenden
  Edit-iframe PS_SET_TEXT { elementId, content }; ein ADDITIVER Handler im
  Brücken-Skript setzt textContent per data-pagesmith-id. Additiv wie
  SET_SELECTED_ID/ELEMENT_CLICKED — srcDoc-Rendering bleibt komplett deklarativ,
  NIE wieder imperatives iframeRef.current.srcdoc.
- Relink-Fund (Vollständigkeit der Sende-Stellen, kritisch): JEDE Mutation eines
  PRÄSENTEN Text-Mappings muss posten, sonst divergiert das stehende iframe von
  Liste/Header. Drei Stellen: Übernehmen -> {id, neuer Text}; Entfernen -> {id,
  ORIGINAL-Detektionstext} (Entfernen = live zurück auf das Original, nicht den
  Override stehen lassen); Text-Orphan-Relink -> {neues Zielelement, Text}.
- Nur Text: PS_SET_TEXT feuert ausschließlich bei type:"text"-Mutationen.
  Redirect-Assign bleibt unberührt und reloadet weiter (nicht Teil dieser Scheibe).
- Erster-Override-Reload akzeptiert: schreibt „Übernehmen" beim ersten Override
  eines noch nicht verankerten Elements die ps-id in den Code, reloadet dieses
  EINE Mal (Code ändert sich -> Bake greift). Kein Bug, wird NICHT bekämpft. Die
  A/B-Iteration danach (am verankerten Element) ist durchgängig live.

Zwei-Quellen-Invariante: Reload -> eingebackenes HTML; zwischen Reloads ->
PS_SET_TEXT-Patch. Beide vom selben Mapping-Stand gespeist -> kein Divergieren.
Edit-Modus behält die Lade-Zeit-Text-Wiring (injectScripts greift für non-export);
PS_SET_TEXT kommt additiv obendrauf, ersetzt sie NICHT.

Unterschied zum revertierten Fehlschlag: damals ZWEI riskante Änderungen gleichzeitig
(Entkopplung UND imperatives srcdoc). Hier bleibt srcDoc deklarativ unangetastet;
nur ein additiver Message-Handler + drei Posts kommen hinzu.

Verbindliche Leitplanken: Selektions-Brücke (Klick/Highlight/Handshake), detect.ts-
Brückenstruktur, Redirect-Pfad, Export (Scheibe 2), Preview-iframe, Auth/RLS bleiben
UNBERÜHRT. Sandbox unverändert (Edit allow-scripts; allow-same-origin in beiden aus).
Die Brücke wird NUR additiv um einen PS_SET_TEXT-Case erweitert, ihre bestehende
Logik nicht umgebaut.

Tests (diskriminierend, Pflicht-Minimum):
- srcDoc-Stabilität: Text-Mapping-Änderung bei UNVERÄNDERTEM Code erzeugt KEIN neues
  Edit-srcDoc (Gegenprobe: Code-Änderung erzeugt ein neues).
- Reload-Fall: bei Code-Änderung enthält das frische Edit-srcDoc den aktuellen
  Override (Bake greift weiter).
- PS_SET_TEXT-Handler (Brücke, falls isoliert testbar): setzt textContent per ps-id,
  ignoriert unbekannte id ohne Throw.
- Falls die Post-Sites in einer testbaren Einheit liegen: Übernehmen/Entfernen/Relink
  lösen je einen Post aus; Entfernen trägt den Original-Text.

### Scheibe 2 — Text-Export: direkt-in-DOM-Bake (ABGESCHLOSSEN, live getestet)
Status: fertig, LIVE getestet, Commit 9dfd0bf. Pipeline grün (108 Tests inkl.
Bake+Gegenprobe, gemischte Disjunktheit, reine-Text-ohne-Script [Marker-basiert:
kein pagesmith-mappings, keine Wiring-Signatur], verwaistes Text-Mapping,
</script>-Senke), tsc/lint/build grün. Browser-Verifikation: im Export-QUELLTEXT
enthält das <h1> bereits den neuen Text (gebacken, kein FOUC/JS-Sprung); eine
reine-Text-Seite exportiert OHNE Datenblock und OHNE Wiring-Script — Text trotzdem
present, auch bei deaktiviertem JS; Redirect feuert weiter; verwaistes Text-Mapping
wird nicht gebacken. Umgesetzt NUR im export-Zweig von generate.ts (Bake-Schleife
auf demselben doc, textContent statt innerHTML, present.has-gefiltert; injectScripts-
Gate mode !== "export" || table.length > 0). Preview-Containment + Edit-Injektion
unberührt. Der alte "Export bleibt unberührt (no-op)"-Test (textOf == "Alt" kodierte
das Loch) wurde durch den Bake-Test ersetzt — Assertion invertiert, nicht aufgeweicht.

Schließt das funktionale Loch aus Scheibe 1: ein type:"text"-Override landet im
EXPORT als ECHTER DOM-Inhalt (das <h1> enthält im Export-Output schon den neuen
Text), nicht per Laufzeit-JS injiziert.

Owner-Entscheidungen (endgültig):
- Mechanismus: direkt-in-DOM-Bake. In generateFunctional(html, mappings, "export")
  wird pro präsentem Text-Mapping das Element per ps-id gefunden und
  element.textContent = config.content auf dem geparsten DOM gesetzt, VOR der
  Serialisierung. Grund: gut für SEO, kein FOUC/Flackern, funktioniert ohne JS.
- Trennung Bake vs. Laufzeit: Text-Mappings kommen im export-Modus NICHT in den
  JSON-Datenblock / das Wiring-Script. Nur Laufzeit-Typen (redirect, später
  Webhook/Tracking) bleiben dort. Folge: eine Seite mit AUSSCHLIESSLICH
  Text-Overrides exportiert als reines statisches HTML — KEIN injiziertes Script.
- Orphan-Filter gilt typ-agnostisch auch für Text: nur präsente Elemente backen;
  ein Text-Mapping ohne Element im Code bleibt verwaist (Weg-C), wird NICHT
  gebacken und erscheint NICHT im Output (gleiche abgeleitete "ps-id im Code?"-
  Logik wie findOrphans/Redirect).
- Disjunkte Mengen: Text-Kandidaten != interaktive Kandidaten, ein Mapping pro
  Element -> Bake-Pass (Text) und Wiring-Pass (Redirect) treffen NIE dasselbe
  Element. Keine Kollision.
- Senke ist textContent (NICHT innerHTML): ein Override mit <script>/Markup wird
  inerter Text, nicht ausgeführtes HTML. Konsistent zur bestehenden Senken-Lektion.

Architektur: EINE Engine, type-Verzweigung im export-Zweig — KEINE zweite parallele
Engine. Gleiche stabilisierte Quelle wie die Vorschau (Idempotenz: einmal parsen,
einmal serialisieren, kein Doppel-Bake). Preview-/Edit-Text-Verhalten und die
Brücke bleiben UNBERÜHRT (nur der export-Zweig wird erweitert).

Diskriminierende Tests (Pflicht, müssen gegenproben):
- Text-Override erscheint im Export-HTML als echter Inhalt (Element-textContent ==
  neuer Inhalt); Gegenprobe: der Originaltext ist für dieses Element NICHT mehr da.
- Text-Override steht im Export NICHT im JSON-Datenblock/Wiring (Gegenprobe gegen
  naives "in der Tabelle lassen").
- Reine-Text-Seite (nur Text-Overrides, kein Redirect) -> KEIN Wiring-Script im
  Output (ohne-JS-Eigenschaft).
- Redirect-Export UNVERÄNDERT: JSON-Datenblock + Wiring mit URL weiter vorhanden
  (Bestandstest bleibt grün).
- Verwaistes Text-Mapping (Element fehlt) -> nicht gebacken, nicht im Output.
- Preview-/Edit-Text-Verhalten unverändert (kein Regress der Live-Editierbarkeit).

Leitplanken: NUR der export-Zweig von generateFunctional + dessen Tests werden
angefasst. detect.ts/Brücke, CodeImporter, ActionPanel, der Redirect-Laufzeitpfad
und Preview/Edit-Text bleiben unberührt.

## Phase 6 — Server-Side Tracking (CAPI)
Charakterwechsel: erster echter Server-Code (Next.js API-Route mit Logik), erstes
echtes Secret (Meta-CAPI-Access-Token, NICHT NEXT_PUBLIC, nie in Browser/Export),
erstmals Multi-Tenant-Secret-Storage (Token pro Marketer/Projekt in der DB, nicht .env).

Pfad-Entscheidung (Owner, endgültig): CAPI-Proxy JETZT auf der Pagesmith-Domain
bauen (NICHT Hosting zuerst). Begründung: ein Pagesmith-Domain-Proxy liefert den
Kern-Wert ab Tag 1 — bessere Match-Quality, Event-Dedup (Browser-Pixel + CAPI mit
gemeinsamer event_id, Metas empfohlenes Setup), Resilienz gegen verlorene
Browser-Events (iOS-ITP, Pixel-JS-Ausfall).

Hosting-Nuance (bewusst dokumentiert): VOLLE Adblocker-Resistenz braucht einen
First-Party-Endpoint auf DERSELBEN Domain wie die Seite -> das liefert erst Phase 7
(Hosting/Custom Domains). Bis dahin ist der Proxy third-party (pagesmith-Domain);
der Server-Side-Wert ist schon jetzt da, die Adblocker-Resistenz reift mit Phase 7
zur Endform. Trade-off: ein selbst-gehosteter Export hängt fürs Tracking zur
Laufzeit an Pagesmiths Server ("telefoniert nach Hause") — mit Hosting natürlich,
davor eine Kopplung.

Consent-Gate ist KEIN optionales Advanced-Feature: im DACH-Raum ist
Tracking-vor-Consent rechtlich scharf. Die erste echte Tracking-Scheibe muss
mindestens consent-gate-FÄHIG feuern (Hook "erst nach Consent-Signal"); volle
Cookiebot/Usercentrics-Integration ist eine spätere Scheibe.

Secret-Storage (offene Bau-Entscheidung, beim Proxy-Slice klären): der CAPI-Token
liegt pro Projekt server-seitig — server-only-Pfad (eigene Tabelle, nur über
Server-Session lesbar, RLS) ODER Verschlüsselung at rest. Die service_role-Frage
wird hier erstmals echt -> bewusst entscheiden, nicht reflexhaft.

OMNICHANNEL-AUSBLICK (Owner-Direktive): Pagesmith wird Omnichannel-Tracking-Plattform.
Nach Meta folgen Google, TikTok, Pinterest und ein "Custom Pixel Code" (rohes Snippet).
Architektur-Konsequenz JETZT (Form, KEINE Maschinerie — "Abstraktion erst bei 2+ Fällen"):
- settings ist plattform-GENESTET: settings.pixels.<platform>.<config>. Meta =
  settings.pixels.meta.pixelId. Custom-Code-Plattform später = settings.pixels.custom.code
  (andere Shape erlaubt). KEINE flachen metaPixelId-Keys, nie Migration pro Plattform.
- Meta-Feuer-/Injektions-Logik als isolierte Einheit (Plattform #2 = parallele Einheit,
  kein Umbau). KEINE generische Registry, solange nur Meta existiert.
BEWUSST AUFGESCHOBEN (an Plattform #2, 2+ Fälle): Fan-out (ein Intent -> alle Pixel, mit
Event-Taxonomie-Mapping) vs. Per-Plattform-Event. Deshalb bleibt TrackConfig plattform-
AGNOSTISCHER Intent ohne platform-Feld -> am wenigsten festlegend, beides später additiv.
BEGRIFFSTRENNUNG: "Custom Event" = Event mit freiem Namen (fbq trackCustom), 1b-Sache.
"Custom Pixel Code" = ganze Plattform unter pixels.custom, spätere Scheibe. Nicht verwechseln.

Decomposition (Owner-bestätigt):
- Scheibe 0 — (elementId, type)-Compound-Key-Migration (STRUKTURELL, kein Feature). JETZT.
- [x] Scheibe 1a — Mehr-Aktion strukturell: track-Union-Zweig + Panel mehr-aktionsfähig
        + Wiring-byId->Array + vier latente Fixes. Stub-Firing, Meta zuerst. ABGESCHLOSSEN (live).
- [x] Scheibe 1b — Meta-Pixel-Semantik: settings-jsonb-Blob (Migration 0004,
  plattform-genestet) + projektweite Meta-Pixel-ID-UI + TrackConfig {event,value?,
  currency?,isCustom?} + Standard-Event-Dropdown (+ Custom-Zweig) + value/currency
  dynamisch + stub->fbq mit eventID + Consent-Hook (gated auch init) + Base-Pixel im
  Export OHNE Auto-PageView. ABGESCHLOSSEN (live). Damit ist Scheibe 1 (Tracking-Tile +
  echtes Meta-Pixel) KOMPLETT.
- [x] Scheibe 2a — Secret-Plumbing: project_tokens-Tabelle (server-only, RLS SELECT-gesperrt),
  write-only maskierte Token-UI, trackingKey (öffentlich, in settings), capiTokenSet-Boolean
  (settings, für Indikator), service_role-Read-Helper. Token-WRITE via service_role NACH
  explizitem Ownership-Gate (write-only-Sperre lässt authenticated-Upsert am RETURNING-Read
  scheitern). KEIN Forward. ABGESCHLOSSEN (live).
- [x] Scheibe 2b-i — CAPI-Route: anonyme cross-origin API-Route, trackingKey->Config-Resolver
  (pixelId+token serverseitig), Meta-Graph-CAPI-Forward mit event_id. KEIN Client/Beacon/
  Wiring. ABGESCHLOSSEN (live, Server-Event bei Meta verarbeitet). Nächster Schritt: 2b-ii
  (Client-Beacon + Dedup).
- [x] Scheibe 2b-ii — Client-Beacon/Dedup: navigator.sendBeacon an /api/capi neben fbq,
  hinter demselben psConsent, mit GETEILTER eventID, text/plain-Blob, absoluter
  env-abgeleiteter proxyURL im Export. ABGESCHLOSSEN (Mechanik live; Dedup-Sichtbarkeit
  -> Phase 7). Alle Scheiben (0,1a,1b,2a,2b-i,2b-ii) sind jetzt [x].
- Scheibe 3 — Consent-Gate.

### Scheibe 0 — (elementId, type)-Compound-Key-Migration (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert (No-Regression-Smoke: Redirects, Text-Live-Patch,
Waisen-Netz, Dirty/Guards, Badges — alle unverändert). Commit
"refactor(mappings): key on (elementId, type) for multi-action support". Pipeline grün
(tsc/lint/build + diskriminierendes Zwei-Mapping-Fixture: upsert/find/remove/equal auf
(elementId,type)). Reiner Code-Schlüssel-Wechsel, KEINE DB-Migration, kein Verhalten
geändert. Der alte Test "upsert/remove per elementId, unabhängig vom Typ" (kodierte das
type-agnostische Keying) wurde durch die Compound-Key-Fälle ersetzt — invertierte
Assertion, nicht aufgeweicht. Same-(id,type)-Replace-Pfad (Redirect-URL neu setzen ->
Länge bleibt 1, config aktualisiert) bleibt getestet grün abgedeckt.
findMapping-Missbrauch im Relink-Überschreib-Schutz wurde auf
some(m => m.elementId === target) umgestellt (heute verhaltensgleich; in Scheibe 1
typ-aware zu machen).

Ziel: den Identitäts-/Lookup-Schlüssel der Mappings von elementId auf
(elementId, type) umstellen, mit NULL Verhaltensänderung für die heutigen
Redirect-/Text-Features. Voraussetzung für Tracking (Redirect UND Tracking auf
EINEM Element). Setzt den seit dem Redirect-Schritt in mappings.ts notierten
Kommentar um.

Warum risikoarm: Redirect- und Text-Kandidaten sind DISJUNKT -> heute trägt KEIN
Element zwei Mappings -> unter (elementId, type) KEINE Kollision in bestehenden
Daten. Folge: KEINE DB-Migration, KEINE Datentransformation, Lade-Pfad unverändert
— reiner Code-Schlüssel-Wechsel, sicherer noch als 3.3 (das Live-Daten anfasste).

Betroffen (nur src/lib/mappings.ts + Aufrufer + Tests):
- upsertMapping: matcht/ersetzt auf (elementId, type) statt nur elementId; sonst append.
- findMapping(mappings, elementId, type): typisierter Single-Lookup. Plus Badge-Bedarf
  "hat Element IRGENDEINE Aktion?" als some(m => m.elementId === id).
- removeMapping(mappings, elementId, type): entfernt genau den (elementId, type)-Eintrag.
- mappingsEqual: mengenbasiert pro (elementId, type) statt pro elementId. Dirty:
  zweites Mapping (gleiche id, anderer Typ) = dirty; Umsortieren != dirty.
- displayTextFor: findet das (id, "text")-Mapping (Logik unverändert, nur Schlüssel).
- findOrphans: ps-id-Präsenz, typ-agnostisch -> beim Bau VERIFIZIEREN, dass es N
  Mappings pro ps-id trägt (mehrere Orphans pro fehlender id), auch wenn das erst
  mit Tracking auftritt.
- generate.ts (Engine): flache Iteration + Typ-Verzweigung -> sollte UNBERÜHRT sein;
  VERIFIZIEREN, dass keine Ein-Mapping-pro-Element-Annahme existiert.
- CodeImporter.tsx: Aufrufer übergeben den intendierten type; selectedMapping-Ableitung
  bleibt UI-seitig Ein-Aktion (kein zweiter Slot, kein Tile -> UI sieht IDENTISCH aus).

Diskriminierende Tests (Pflicht — sonst hohl, weil heute kein Element zwei Mappings
hat): SYNTHETISCHES Fixture mit zwei Mappings unterschiedlichen Typs auf EINEM
elementId:
- upsert(redirect auf id) verändert ein text-Mapping auf derselben id NICHT (umgekehrt ebenso).
- findMapping(id,"redirect") != findMapping(id,"text").
- remove(id,"redirect") lässt das text-Mapping auf id intakt.
- mappingsEqual: {redirect+text auf id} != {nur redirect auf id}; Umsortieren == gleich.
- Gegenprobe: ALLE bestehenden Redirect-/Text-Tests bleiben OHNE Änderung grün (eine
  nötige Test-Änderung = Signal für ungewollte Verhaltensänderung -> melden, nicht
  still anpassen).

Leitplanken: NUR mappings.ts + Aufrufer + Tests. KEINE DB-Migration. KEIN UI-Feature
(Tile/zweiter Slot erst in Scheibe 1). Engine, Detektion/Brücke, Export,
Orphan-Netz-Verhalten, Auth/RLS unverändert.

### Scheibe 1 — Checkliste: vier latente "ein Mapping pro Element"-Stellen (aus Scheibe-0-Verifikation)
Diese vier Stellen nehmen heute "1 Mapping/Element" an und kollabieren still bei zwei
Mappings/id. In Scheibe 0 BEWUSST nicht angefasst (heute unerreichbar, disjunkte
Kategorien). Scheibe 1 MUSS sie adressieren, sobald ein Element redirect+tracking trägt:
1. generate.ts:67-68 — byId[elementId] = mapping kollabiert aufs letzte Mapping. KRITISCH:
   das Wiring-Script braucht für redirect+tracking auf EINEM Element BEIDE Mappings ->
   byId muss auf ein ARRAY pro id (alle Aktionen der id), der Click-Handler iteriert sie.
   ACHTUNG Reihenfolge/Navigation: das Tracking-Event muss VOR der Weiterleitung feuern
   bzw. navigationssicher gesendet werden (sendBeacon / fbq-Beacon), sonst killt die
   Navigation den in-flight Request.
2. Orphan-Render-Key key={m.elementId} (CodeImporter:885) -> key={`${m.elementId}-${m.type}`}
   (sonst React-Key-Kollision bei zwei Orphans gleicher id).
3. Badge-Map<id,type> -> muss mehrere Aktionen pro Element tragen (heute last-wins).
4. Relink-Überschreib-Schutz some(m => m.elementId === target) -> typ-aware
   (&& m.type === orphanType), sonst Fehlalarm-Warnung, obwohl zwei Typen koexistieren dürfen.

### Scheibe 1a — Mehr-Aktion strukturell (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commit "feat(actions): multi-action per element
(redirect + track stub), structural". Pipeline grün (tsc/lint/build + diskriminierende
Tests: [redirect,track] beide im Wiring & Stub-vor-Navigation via invocationCallOrder,
configEqual-track-Branch dirty-korrekt, Doppel-Orphan-Render ohne Key-Kollaps,
Mehr-Aktion-Badge, typ-aware Relink-Überschreib-Schutz, Single-Redirect bit-identisch,
Text-Pfad regress-frei). Browser-Verifikation: Mehr-Aktion-Element zeigt beide Badges
(🔗+🎯); [pagesmith track]-Stub loggt garantiert VOR der Navigation; Track-only loggt
ohne wegzunavigieren; Doppel-Waisen-Netz trennt die Karten isoliert; KEIN Dirty-Fehlalarm
bei Reload (configEqual greift). Single-Redirect + Text-Live-Patch (Scheibe 3) unverändert.

Alle vier latenten Checklisten-Stellen eingelöst (byId->Array mit Track-vor-Redirect;
Orphan-Render-Key ${id}-${type}; Badge Map<id,Set<type>> deterministisch geordnet;
Relink-Überschreib-Schutz typ-aware). Drei TS-erzwungene Folgefunde mitgenommen
(configEqual-track-Zweig, Orphan-Karten-track-Anzeige, Relink-track-Konstruktion).

1a-ZWISCHENSTAND (wird in 1b ersetzt): der Track-Stub (console.log "[pagesmith track]
<event>") landet bewusst auch im EXPORT-Output — beweist die Wiring-Naht. 1b ersetzt
ihn durch echtes fbq + Pixel-Snippet.

Ziel: ein interaktives Element kann Redirect UND Track tragen, end-to-end (Panel,
Wiring, Orphan-Netz, Badge, Dirty) — OHNE Meta-Semantik. Beweist die Mehr-Aktion,
die der Compound-Key (Scheibe 0) ermöglicht.

Schlüssel-Insight: Text- und interaktive Kandidaten sind DISJUNKT -> "Mehr-Aktion"
heißt IMMER nur Redirect+Track auf einem INTERAKTIVEN Element. Text-Pfad
(displayTextFor, PS_SET_TEXT-Live-Patch, Brücke) bleibt KOMPLETT unberührt.

Owner-Entscheidungen (endgültig):
- Meta zuerst (Google ist eine spätere parallele Branch).
- 1a/1b-Split: 1a strukturell (Stub-Firing), 1b echte Meta-Semantik.
- track-Config minimal: { type:"track", config:{ event:string } }. KEINE value/currency/
  Pixel-ID in 1a (das ist 1b).
- Firing in 1a = navigationssicherer Stub (console.log "[pagesmith track] <event>"),
  KEIN fbq. Macht die Klick-Ordnung live sichtbar.
- Klick-Ordnung ist STRUKTURELL: Track-Aktionen feuern VOR der Redirect-Navigation.
  (Die Beacon-Überlebensfrage bei async-fbq ist bewusst 1b.)
- Panel-Layout: interaktiver Zweig zeigt zwei gestapelte Sektionen
  (Weiterleitung / Tracking), je unabhängig zuweisbar/entfernbar. Text-Zweig
  unverändert Ein-Aktion.

Vier latente Stellen (aus der Checkliste) werden HIER eingelöst:
1. generate.ts byId -> Array pro id; Click-Handler iteriert; Track vor Redirect.
   Single-Action-Redirect-Pfad MUSS bit-identisch bleiben.
2. Orphan-Render-Key -> `${m.elementId}-${m.type}`.
3. Badge trägt mehrere Aktionen pro Element (kein last-wins).
4. Relink-Überschreib-Schutz typ-aware (&& m.type === orphanType).

Diskriminierende Tests (Pflicht):
- Element mit [redirect, track]: Wiring enthält BEIDE; bei Klick feuert der Track-Stub
  VOR der Redirect-Navigation (Reihenfolge). Heute erst erreichbar -> echter Beweis.
- Single-Action-Redirect unverändert (bestehende preview/export-Redirect-Tests grün
  ohne inhaltliche Änderung).
- Zwei Orphans gleicher id rendern ohne Key-Kollision.
- Badge korrekt bei Mehr-Aktion-Element.
- Relink eines redirect-Orphans auf ein Element mit track -> KEINE Fehlalarm-Warnung.
- Text-Pfad unverändert (displayTextFor + PS_SET_TEXT-Live-Patch regress-frei).

Leitplanken: KEINE Meta-Semantik (fbq/Pixel-ID/value/currency) in 1a. detect.ts/Brücke
unberührt (track bindet an bereits erkannte interaktive Elemente). Text-Pfad, Auth/RLS,
Sandbox unberührt. KEINE DB-Migration.

### Scheibe 1b — Meta-Pixel-Semantik (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert, produktionsreif. Commit "feat(tracking): real Meta
pixel (settings blob, events, eventID, consent hook)". Pipeline grün (tsc/lint/build +
Tests: settings-Roundtrip, configEqual value/currency/isCustom, Export-init-genau-einmal-
ohne-PageView, trackCustom, value-vs-nicht-value-Event, keine-ID->kein-fbq, psConsent==false->
nichts). Browser-Verifikation via Network-Tab (das verlässliche Instrument): fbevents.js +
facebook.com/tr feuern mit korrekter Pixel-ID und eventID; Settings-Persistenz + Cross-
Projekt-Isolation live bestätigt; CONSENT-GATE-BEWEIS 100%: bei window.pagesmithConsent=
()=>false KEIN Request an connect.facebook.net (Script-Load selbst gegate-t, nicht nur init).

Mess-Lektion (wichtig, dokumentiert): der scheinbare "PS_PIXEL_ID-Blocker" war eine
Mess-Illusion, kein Code-Bug. Drei Confounds gleichzeitig: (1) view-source: führt kein JS
aus -> totes Messfeld; (2) das Pixel feuert im sandboxed iframe (allow-scripts ohne
allow-same-origin, opaque origin) -> der Meta Pixel Helper auf der Top-Seite kann
strukturell nicht hineinsehen; (3) init ist lazy-on-click hinter psConsent, und die
getesteten Elemente trugen Redirects (Wegnavigation vor Helper-Refresh). Die Variablen-
Referenz var PS_PIXEL_ID + fbq("init",PS_PIXEL_ID) ist valides, verhaltensidentisches JS
(var-gehoistet) -> Inlinen hätte nichts geändert. Grundwahrheit kam aus dem Network-Tab
(Preserve log), nicht aus erneutem Code-Lesen. Verstärkt die Methode: Instrument schlägt
Code-Re-Read; tote/abgeschirmte Messpunkte erkennen, bevor man "fixt".

Konsequenz fürs Live-Testen von Tracking: NIE über view-source oder das Sandbox-Preview-
iframe messen. Immer den exportierten File direkt öffnen + Network-Tab (Preserve log,
Filter facebook); für den Pixel-Helper ein Track-only-Element OHNE Redirect (button, kein
a[href]) verwenden.

Ersetzt den 1a-Stub durch echtes Meta-Pixel. Erste echte externe Integration, erste
Schema-Migration seit 0003.

Owner-Entscheidungen (endgültig):
- Persistenz: settings jsonb auf projects (Migration 0004, default '{}'), plattform-
  genestet settings.pixels.meta.pixelId. Pixel-ID ist NICHT secret (öffentlich) ->
  plain gespeichert, kein Secret-Storage (das bleibt Scheibe 2 / CAPI-Token).
- Event-Modell: Standard-Event-Dropdown (Purchase, Lead, InitiateCheckout, AddToCart,
  ViewContent, CompleteRegistration, Contact, Subscribe, ...) + "Custom…"-Option ->
  freies Textfeld -> fbq trackCustom. Optional value/currency, dynamisch nur bei
  wert-tragenden Events eingeblendet. TrackConfig additiv: {event, isCustom?, value?, currency?}.
  configEqual deckt ALLE Felder ab (sonst Dirty-Fehlalarm wie der 1a-configEqual-Fund).
- Navigationssicheres Senden: fbq mit eventID feuern, dann NORMAL navigieren, dem
  sendBeacon vertrauen. KEIN Navigations-Defer (Redirect-Latenz zu Stripe nicht
  künstlich verschlechtern). CAPI (Scheibe 2) ist der finale Datenverlust-Backstop.
- eventID: pro Fire client-seitig erzeugt (crypto.randomUUID + Fallback), an fbq als
  {eventID} übergeben. Tut in 1b funktional nichts -> ist die Dedup-Naht für Scheibe 2
  (Browser- und CAPI-Event teilen dieselbe eventID).
- Consent-Hook psConsent(): EIN Chokepoint, gated init UND Events (fbq('init') setzt
  _fbp-Cookie -> Cookie-vor-Consent ist selbst der DSGVO-Verstoß). 1b-Default permissiv
  (feuert); Scheibe 3 verdrahtet echtes Consent + flippt Default. Doku-Caveat: 1b-Export
  NICHT auf echten EU-Traffic vor Scheibe 3.
- Base-Pixel: einmal pro Seite, geguarded durch gesetzte meta.pixelId (keine ID ->
  kein Snippet, Track-Aktionen no-op mit console.warn). fbq('init', id) OHNE Default-
  PageView (kein ungate-tes Load-Event; 1b bleibt strikt on-click). Page-Load-Events
  sind eine spätere consent-saubere Scheibe.

Build-Reihenfolge (Risiko zuerst): Migration 0004 + settings read/write (save/loadProject
+ projects/actions.ts) + minimale Pixel-ID-UI ZUERST verifizieren; dann Event-Modell +
Wiring-Swap.

Diskriminierende Tests (Pflicht):
- settings-Roundtrip: Pixel-ID speichern -> laden -> persistiert; Projektwechsel isoliert
  (kein Leak zwischen Projekten).
- configEqual: zwei track gleicher id, nur value (oder currency, oder isCustom) verschieden
  -> dirty. Gegenprobe gleich -> gleich.
- Export mit meta.pixelId: Output enthält fbq('init', id) GENAU EINMAL, KEIN
  'track','PageView' (Auto-PageView raus), Klick-Event als fbq('track',event,{...},{eventID}).
- Custom-Event: fbq trackCustom mit freiem Namen.
- value-Event (Purchase) vs nicht-value-Event (Lead): value/currency nur bei value-Event im Output.
- Keine Pixel-ID -> kein fbq im Export, Track-Aktion no-op (console.warn).
- Consent-Hook: psConsent()==false -> weder init noch Event im Laufzeit-Effekt.
- Single-Redirect + Text-Pfad (Scheibe 3) unverändert.

Leitplanken: NUR Meta (pixels.meta) — KEIN Google/TikTok/Custom-Code-Build, nur die
Nest-Form. Kein platform-Feld in TrackConfig. detect.ts/Brücke + Text-Pfad unberührt.
RLS: settings-Spalte auf bereits geschützter projects-Zeile -> bestehende Policies
decken sie, KEINE neue Policy nötig (verifizieren).

### Scheibe 2a — Secret-Plumbing (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commits: "feat(capi): secret token storage
(server-only, RLS, write-only UI)" + "fix(capi): write token via service_role after
explicit ownership check (RLS write-only stands)". Pipeline grün (168 Tests inkl.
IDOR-Spy-Regressionstest). Browser-/DB-Verifikation: Token nie im Client-Payload/Quelltext
(0 Treffer); Row via service_role im Dashboard sichtbar; SELECT als authenticated -> 0
Zeilen (write-only-Sperre real); Projektwechsel isoliert (kein Leak); FK-cascade-Delete
löscht Token-Row atomar; UI-Sperre bei ungespeichertem Projekt greift.

WICHTIGE ARCHITEKTUR-VERSCHIEBUNG (bewusster Trade-off, NICHT schludern):
Der project_tokens-WRITE läuft über service_role (createAdminClient), NICHT über den
authenticated-SSR-Client. Grund: die write-only-SELECT-Sperre (kein SELECT für
authenticated) lässt den authenticated-Upsert am impliziten RETURNING/SELECT-Read
scheitern ("new row violates RLS for project_tokens" — die Meldung zeigt auf die
Tabelle, verletzt ist aber der Read-back). return=minimal löst das in dieser
PostgREST-Konstellation NACHWEISLICH nicht (BUILD-MARKER-Test bewies: Header gesetzt,
Fehler bleibt). service_role bypassed RLS -> sauber, ohne Header-Trick.

FOLGE: Die Write-Autorisierung liegt jetzt AUSSCHLIESSLICH in der App-Schicht, nicht
mehr in der DB-Policy (WITH CHECK ist umgangen, weil service_role sie bypassed). Das
entfernt EINE Defense-in-Depth-Schicht. Die Ownership-Prüfung ist damit das HEILIGSTE
Gate der Anwendung. Zwei Regeln, deren Bruch die Sicherheit LAUTLOS aushebelt:
1. Die Ownership-Prüfung (select id from projects where id=projectId and user_id=user.id)
   MUSS über den AUTHENTICATED-SSR-Client laufen (RLS-gebunden). Mit dem Admin-Client
   geprüft wäre sie wertlos (bypassed RLS -> sieht jede Zeile).
2. createAdminClient() darf im Nicht-Owner-Pfad NICHT erreichbar sein: Early-return VOR
   jeder Admin-Zeile. Der RLS-Bypass ist physisch unerreichbar ohne bestandenes Gate.
WÄCHTER: Der IDOR-Regressionstest (Spy: Admin-Upsert not.toHaveBeenCalled bei fremder
project_id, nicht nur "wirft error") bewacht beide Regeln und darf NIE entfernt/
aufgeweicht werden.

DEBUG-LEKTION (Instrument schlägt Code-Re-Read, unter Druck bestätigt):
Vier plausible Hypothesen zerbrachen nacheinander am Log (fehlende Session / falscher
Client / Waisen-Row-Update / falsche user_id) — inkl. Claudes eigener Wetten. Gelöst
hat NICHT die klügste Hypothese, sondern schrittweises Instrumentieren, bis der
Widerspruch nur eine Erklärung zuließ: pro-Operation-STEP-Logs isolierten die
verletzende Query (token-upsert, nicht settings/ownership), der auth.uid()-vs-user_id-
Log widerlegte den user_id-Verdacht, der BUILD-MARKER trennte "Fix greift nicht" von
"stale build". Regel verschärft: bei jeder plausiblen Bug-Hypothese ZUERST das billige
Instrument (gezielter Log/Network-Tab/DB-Query), das die Hypothese diskriminiert, BEVOR
gefixt wird. Tote/abgeschirmte Messpunkte (view-source, sandbox-iframe, stale build)
als solche erkennen.

Charakterwechsel-Vorbereitung: erster echter Secret-Storage. Der CAPI-Token (anders als
die öffentliche Pixel-ID) ist geheim, lebt server-only, erreicht den Client NIE.

Owner-Entscheidungen (endgültig):
- Privilegierter Read = service_role, STRENG server-only (process.env in der API-Route/
  server-Modul). Bounded, legitime Ausnahme zur "nie service_role"-Regel (die war MVP-
  Default gegen Client-Leak/Commit). KEIN pg_net/in-DB-HTTP.
- Token at rest: separate Tabelle project_tokens, PLAINTEXT vorerst + klarer
  Härtungs-Kommentar (spätere Verschlüsselung). Tragende Kontrolle = ISOLATION
  (separate Tabelle + RLS SELECT-Sperre), nicht Verschlüsselung.

Design (aus dem Architektur-Review):
- project_tokens(project_id fk on delete cascade, user_id, meta_capi_token text,
  created_at, updated_at). RLS AN.
- RLS-Policies: KEIN SELECT für anon/authenticated (write-only, Token nie lesbar,
  auch nicht vom Owner). INSERT + UPDATE mit WITH CHECK (auth.uid() = user_id) ->
  Owner setzt nur eigene Zeile (Upsert, on conflict). service_role bypassed RLS ->
  Event-Read-Pfad.
- WRITE über Owner-Session (SSR-Client, Rolle authenticated, RLS greift). Nur der
  spätere Event-READ (2b) über service_role. Zwei Clients, zwei Pfade.
- trackingKey: öffentlicher Zufalls-Key pro Projekt, in settings (client-lesbar,
  wird in den Export gebacken). NICHT in project_tokens. Auflösung
  trackingKey -> project_id -> token (service_role).
- capiTokenSet: nicht-sensibler Boolean in settings, zusammen mit dem Token geschrieben,
  für den maskierten "••• gesetzt"-UI-Indikator. Token selbst nie im Client.
- UI: write-only maskiertes Token-Feld in der bestehenden Einstellungen-Sektion
  (unter Meta-Pixel-ID). loadProject reicht NIE den Token zurück.
- service_role-Read-Helper (server-only Modul): getCapiTokenByTrackingKey(key) ->
  token|null. In 2a implementiert + getestet (mock), Consumer erst in 2b.

SECRETS-DISZIPLIN (kritisch, öffentlicher Push): SUPABASE_SERVICE_ROLE_KEY NUR in
.env.local (vorher .gitignore verifizieren), NUR in server-only-Modulen importiert,
NIE in Client-Komponente/Export. Extra git status vor dem Push.

Diskriminierende Tests (Pflicht):
- Token erreicht Client nie: loadProject/settings-Payload trägt NUR trackingKey +
  capiTokenSet, KEINEN Token. project_tokens wird von Client-Code nie selektiert.
- Write-Server-Action: Owner-Upsert schreibt Token in project_tokens + flippt
  capiTokenSet in settings.
- Read-Helper: gegebener trackingKey -> Token (service_role-Client gemockt).
- Projektwechsel: capiTokenSet-Indikator reseeded pro Projekt (kein Leak, wie
  settings/mappings).
- (Live, kein Repo-Harness): RLS-SELECT-Sperre real + service_role-Read real.

Leitplanken: KEIN Forward/Proxy-Route/Beacon/Meta-Call (das ist 2b). KEINE Änderung
am 1b-Pixel-Firing. detect.ts/Brücke, Text-Pfad, Redirect-Pfad unberührt. Migration
additiv (neue Tabelle), bestehende RLS/Policies unangetastet.

### Scheibe 2b-i — CAPI-Route (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commit "feat(capi): server-side CAPI forward route
(trackingKey->config, Meta Graph)" (bf87545) + "fix(auth): allow anonymous access to
/api/capi only (trackingKey is the guard)". Pipeline grün (188 Tests). LIVE-BEWEIS: ein
synthetischer curl/Invoke-RestMethod -> Event "Kauf" (event_id test-evt-002) im Meta-
Test-Events-Tab als "Server / Verarbeitet" sichtbar. Erste externe API-Integration der
App funktioniert: unser Server spricht korrekt mit Metas Graph-CAPI (Auth, Payload,
event_id, IP via Dev-Dummy, test_event_code). Route antwortet nur 204, nie Body/Token.

DREI bewusst geloggte Punkte aus diesem Bogen:

1. AUTH-GATE-REGEL (generische Prüfregel): Neue anonyme/öffentliche Route in einer
   ansonsten auth-gegateten App? ZUERST prüfen, ob das Middleware-Auth-Gate (src/
   middleware.ts, 3.1) sie durchlässt — sonst 302->/login statt Route. /api/capi wurde
   in updateSession als bewusst öffentlicher Pfad behandelt (analog /login, isPublicRoute),
   CHIRURGISCH nur /api/capi, nicht /api pauschal. Diskriminierender Test: anonym auf
   /api/capi -> kein Redirect; anonym auf anderen geschützten Pfad -> weiter Redirect.
   SICHERHEITSVERSCHIEBUNG: das Auth-Gate ist für /api/capi NICHT mehr der Wächter — der
   Wächter ist der trackingKey als Capability (unbekannter Key -> 204, kein Forward,
   kein Leak). Die Route trägt ihre Zugangskontrolle selbst.

2. TEST-SETUP-LEKTION (wiederkehrend, für 2b-ii + jeden künftigen CAPI-Test):
   trackingKey != Projekt-UUID. Der trackingKey liegt in settings.capi.trackingKey
   (lazy beim ersten Token-Set erzeugt, 2a). Ein falscher Key im Test -> Resolver null
   -> korrektes 204 OHNE Forward -> Server grün, Meta-Test-Tab leer. Das kostete einen
   Debug-Bogen; Symptom "Server 204, Meta leer" = zuerst trackingKey gegen
   'select settings->''capi''->>''trackingKey'' from projects where name=...' prüfen.

3. DIAGNOSE-HYGIENE: temporäre [capi-diag]-Logs (inkl. voller Meta-Response-Body) waren
   ein Instrument, nie committet, restlos entfernt (git grep 0 Treffer). Der reguläre
   sanitized Error-Log bleibt (nur "[capi] Meta forward failed: HTTP <status>", nie
   Token/access_token/Response-Body — 2a-Regel).

Erste externe Integration der App: unser Server ruft aktiv Metas Graph-CAPI auf.
NUR Route + Resolver — KEIN Client-Pfad, kein sendBeacon, kein Export-Wiring (das ist 2b-ii).

Owner-Entscheidungen (endgültig):
- Zuschnitt: 2b gesplittet, Route zuerst (isoliert die genuin neue "spricht-mit-Meta"-
  Risikoklasse; verifizierbar per synthetischem curl -> Meta-Test-Events, ohne Browser).
- pixelId serverseitig aufgelöst: 2a-Helper wächst zu getCapiConfigByTrackingKey ->
  { pixelId, token } (pixelId aus settings.pixels.meta.pixelId, token aus project_tokens,
  eine trackingKey-Auflösung). Client sendet die pixelId NIE.

Sicherheits-Muster (2a-Disziplin in neuer Form): anonymer cross-origin Endpoint, der
intern service_role nutzt. Autorisierung = trackingKey als CAPABILITY (kein Owner-Session
beim anonymen Besucher). Der Resolver ist die einzige Brücke public-key -> secret-token
und gibt den Token NIE in die Response. Route antwortet nur 204, nie Daten.

Route-Design:
- POST-Endpoint (z.B. src/app/api/capi/route.ts). Nimmt JSON/text-Blob:
  { trackingKey, eventID, event, value?, currency?, eventSourceUrl, isCustom?, _fbp? }.
- Resolver getCapiConfigByTrackingKey(key) -> {pixelId, token} | null (service_role,
  server-only). Unbekannter Key / fehlender Token -> sauberes 204 (bzw. 400), KEIN 500,
  KEIN Leak.
- Serverseitig gesetzt (NIE vom Client): event_time (Unix-Sek, Meta-7-Tage-Fenster);
  client_ip_address aus der PLATTFORM-VERTRAUTEN Quelle (Prod: Vercel-Header; Dev/::1
  sauber behandeln, nicht blind erstes x-forwarded-for-Glied -> spoofbar);
  client_user_agent aus dem Request-Header.
- Forward: POST graph.facebook.com/v{VERSION}/{pixelId}/events?access_token={token}.
  Payload: event_name=event (bzw. custom), event_time, event_id=eventID,
  action_source="website", event_source_url, user_data{client_ip_address,
  client_user_agent, fbp?}, custom_data{value?, currency?}. VERSION als env-Konstante.
- test_event_code: NUR anhängen, wenn env-Variable gesetzt (dev-only). NIE hartcodiert
  im Prod-Pfad.
- Forward wird AWAIT-et + Fehler geloggt (CAPI-Ablehnungen sonst unsichtbar), Route
  antwortet dem Client trotzdem schnell 204. KEIN Secret in Logs (weder Token noch
  sensible Meta-Response-Felder).
- CORS: text/plain-freundlich (kein Preflight nötig; 2b-ii nutzt sendBeacon).

Diskriminierende Tests (Pflicht, Meta-fetch gemockt):
- Happy-Path: gültiger trackingKey -> fetch an graph.facebook.com/.../{pixelId}/events
  mit access_token, event_id==eventID, action_source=website, IP/UA server-gesetzt.
- Resolver unbekannter Key -> KEIN Meta-fetch, sauberes 204/400, kein Throw/500.
- Token/Response NIE in der HTTP-Response an den Client (nur Status).
- event_time server-gesetzt (nicht aus Client-Payload übernommen, selbst wenn mitgeschickt).
- test_event_code: env gesetzt -> im Payload; env leer -> NICHT im Payload.
- (Live, kein Harness): curl -> echtes Event im Meta-Test-Events-Tab.

Leitplanken: KEIN Client/sendBeacon/Export-Wiring (2b-ii). generate.ts-Pixel-Firing (1b),
Text-Pfad, Redirect-Pfad, detect.ts/Brücke unberührt. service_role bleibt server-only.
Keine SELECT-Policy-Änderung an project_tokens.

2b-ii-LEITPLANKE (in route.ts als Kommentar verankert, HIER fürs Gedächtnis): der
Client-Beacon MUSS ein text/plain-Blob sein (sendBeacon, Blob type "text/plain"),
NIEMALS application/json. application/json macht aus dem simplen Beacon einen
preflight-pflichtigen Request; sendBeacon (fire-and-forget) kann keinen Preflight ->
stiller Ausfall, den die CORS-Header (Access-Control-Allow-Origin: * etc. auf der
204-Response) NICHT retten. Der text/plain-Body ist die tragende Kontrolle, die
Header sind nur Gürtel-und-Hosenträger. Dev-Dummy-IP (123.123.123.123) wird NUR bei
(loopback||leer) && gesetztem META_TEST_EVENT_CODE eingesetzt — eine echte Remote-IP
wird nie ersetzt, in Prod (Test-Code unset) bleibt die IP bei fehlender Quelle omitted.

BEWUSSTE SICHERHEITS-VERSCHIEBUNG (Auth-Gate-Ausnahme, analog zur 2a-service_role-
Verschiebung): Der anonyme cross-origin Endpoint /api/capi wird beim Bau in
src/lib/supabase/middleware.ts (updateSession) chirurgisch aus dem Auth-Gate
ausgenommen — als bewusst öffentlicher Pfad im SELBEN Muster wie /login
(isPublicRoute = isLoginRoute || path.startsWith("/api/capi")), NICHT über den
Matcher-Regex (der steuert Auth-Reichweite + Session-Refresh, fragilste Stelle) und
NICHT /api pauschal (künftige API-Routen bleiben hinter dem Gate). FOLGE: Für
/api/capi ist das Auth-Gate NICHT mehr der Wächter — der Wächter ist der trackingKey
als Capability (unbekannter Key -> 204, kein Forward, kein Leak; in 2b-i gebaut +
getestet). Korrekt und notwendig, weil der ausgelieferte Export den Endpoint immer
anonym aufruft; die Route trägt ihre Zugangskontrolle jetzt selbst. WÄCHTER:
diskriminierende middleware.test.ts (anonym+/api/capi -> kein Redirect; anonym+andere
API-Route -> weiter /login) hält fest, dass NUR dieser eine Pfad geöffnet ist.

### Scheibe 2b-ii — Client-Beacon / Dedup (ABGESCHLOSSEN, Mechanik verifiziert)
Status: fertig, Mechanik live verifiziert. Commit "feat(capi): dedup beacon alongside
pixel (shared eventID, text/plain, absolute endpoint)". Pipeline grün. Live-Beweis
(via npx serve -l 8080, echte http-Origin): Beacon feuert OHNE CORS-Block, Server
antwortet 204, Route baut korrekten Meta-Payload (test_event_code TOP-LEVEL neben data,
geteilte event_id, action_source website, IP/UA server-gesetzt), Meta EMPFÄNGT und
VERARBEITET den Server-Event (sichtbar als "Kauf/Conversions API" in der Pixel-Übersicht).
Browser-Pixel + CAPI-Beacon feuern parallel mit IDENTISCHER event_id.

BEWUSSTE TEST-GRENZE (kein Bug, in Phase 7 aufzulösen): Die Echtzeit-Nebeneinander-
Anzeige im Meta-"Events testen"-Tab (Browser+Server dedupliziert) war lokal NICHT
herstellbar. Ursache strukturell: der Test-Tab ordnet Events über event_source_url +
die pixel-verknüpfte Domain (thrty.store) zu; eine localhost:8080- (bzw. file://-)
Origin ist keine verknüpfte, öffentlich erreichbare Domain -> Event wird verarbeitet
(Übersicht), aber nicht in eine Test-Session geroutet. Der localhost-Test war immer nur
eine Annäherung an Prod. Die Dedup-SICHTBARKEIT ist erst mit Phase 7 (Hosting, verknüpfte
Domain) sauber verifizierbar -> dort als Abschlusstest von Phase 6 nachholen. Die
Dedup-FUNKTION selbst ist belegt: identische event_id in beiden Events + Meta verarbeitet
beide; Meta dedupliziert anhand der event_id, unabhängig von der Test-Tab-Anzeige.

DEBUG-LEKTIONEN dieses Bogens (Instrument schlägt Vermutung, mehrfach bestätigt):
- "Server 204, Meta-Test-Tab leer" ist eine WIEDERKEHRENDE Symptomklasse mit mehreren
  Config-Ursachen (NICHT Route-Bug): falscher trackingKey (2b-i), stale/alter
  test_event_code, test_event_code verschachtelt statt top-level, ODER file://-/
  fremde-Origin event_source_url. Reihenfolge beim Debuggen: erst Config
  (trackingKey/test_code/Origin) instrumentiert prüfen, DANN die Route.
- file:// ist ein Test-Artefakt-Generator: null-Origin -> CORS-Block beim Beacon;
  UND event_source_url=file:// -> Meta-Test-Tab-Routing scheitert. Lokal-Test IMMER
  über echte http-Origin (npx serve -l 8080 auf anderem Port als Next -> echter
  Cross-Origin-Test wie Prod), NIE per Doppelklick/file://.
- Die eigene Pixel-Übersicht ("empfangen von: Conversions API") ist der Beweis, dass
  der Server->Meta-Forward FUNKTIONIERT, unabhängig vom Test-Tab.

Das Finale von Phase 6, additiv-klein: im 1b-Meta-Wiring (__metaFire in meta.ts) neben
fbq ein navigator.sendBeacon an /api/capi. Danach: pro Klick ein Browser-Event (Pixel)
+ ein Server-Event (CAPI), die Meta über die geteilte eventID zu EINEM faltet.

Schlüssel-Insight (hält es klein): psConsent(), eventID-Erzeugung und Event-Daten
existieren bereits in __metaFire. Der Beacon hängt sich an die VORHANDENE ID und die
VORHANDENEN Werte an. Additiv: eine sendBeacon-Zeile im schon-consent-gegateten,
schon-eventID-tragenden Pfad. Kein Umbau, kein zweiter Consent-Check, keine zweite ID.

Vier kritische Invarianten:
1. EINE eventID für beide: dieselbe Variable, die fbq(…, {eventID}) bekommt, geht in den
   Beacon-Payload. NIEMALS ein zweites randomUUID. Zwei IDs = kein Dedup = Doppelzählung
   (stiller Datenqualitäts-Bug, kein Crash).
2. text/plain: Blob-type "text/plain", NIEMALS application/json (sonst Preflight ->
   sendBeacon kann nicht warten -> stiller Ausfall).
3. Beide hinter DEMSELBEN psConsent(): der Beacon im selben if(!psConsent())return-Block
   wie fbq. Kein eigener Consent-Zweig (sonst Server-Event ohne/mit Consent divergent ->
   DSGVO-Loch + Dedup-Bruch).
4. proxyURL absolut + env-abgeleitet + FAIL-LOUD: neue env NEXT_PUBLIC_APP_URL (Dev
   http://localhost:3000, Prod die Pagesmith-Domain). Beim Export wird die ABSOLUTE
   /api/capi-URL in die Datei gebacken (die ausgelieferte Seite läuft auf fremder Domain
   -> relativ zeigt ins Leere). Fehlt/leer die env -> KEIN Beacon + console.warn, KEIN
   Fallback auf einen relativen/kaputten Pfad (der in Dev grün ist und erst beim echten
   Marketer bricht).

_fbp: Best-Effort aus document.cookie mitgeben (Match-Quality). Beim ersten Klick evtl.
noch nicht gesetzt (lazy init im selben Klick) -> dann weglassen, NICHT verzögern. eventID
trägt das Dedup, _fbp ist Bonus.

Scope hart: Redirect-Pfad + Klick-Reihenfolge (Track vor Navigation, 1a) UNANGETASTET —
der Beacon reiht sich in den bestehenden Track-vor-Redirect-Block ein (sendBeacon ist
navigationssicher, überlebt die Weiterleitung — sein ganzer Vorteil). Edit-iframe bleibt
pixel- UND beacon-frei (kein Wiring im Edit-Modus, nur Vorschau/Export). Meta-Route (2b-i),
Text-Pfad, detect.ts/Brücke unberührt.

Diskriminierende Tests (Pflicht):
- Beacon feuert mit DERSELBEN eventID wie fbq (assert: sendBeacon-Payload.eventID ===
  das an fbq übergebene eventID — nicht nur "beide vorhanden", sondern IDENTISCH).
- Blob-type ist text/plain (nicht application/json).
- psConsent()==false -> WEDER fbq NOCH sendBeacon (beide im selben Gate).
- proxyURL: env gesetzt -> absoluter Export-URL im Wiring; env fehlt -> KEIN Beacon +
  warn, kein relativer Fallback.
- Redirect+Track: Beacon feuert, Redirect-Navigation unverändert, Reihenfolge intakt.
- Edit-iframe: kein Beacon/kein Pixel im Edit-Wiring.

## Phase 7 — Hosting & Go-Live
Größter Charakterwechsel: Pagesmith wird HOST/Plattform, nicht mehr nur Werkzeug —
serviert fremde Seiten unter fremden Domains. Wert-Schalter: macht das Produkt
end-to-end nutzbar, schaltet Funnel-Vision + First-Party-Adblocker-Resistenz + die
Phase-6-Dedup-Kirsche (verknüpfte Domain) frei.

Owner-Entscheidungen (endgültig):
- Zuschnitt: erst auf Pagesmith-eTLD+1-URL serven; Vercel-Custom-Domain-API als spätere
  Schicht, sobald Serving bombenfest.
- STRIKTE eTLD+1-ISOLATION (Sandbox-Prinzip auf die Serving-Schicht übertragen):
  gehostete (fremde/KI-generierte) Seiten laufen auf SEPARATER Registrable Domain
  (pgsm.site) — App bleibt pagesmith.app. Bösartiges User-HTML kann die App-Origin
  strukturell nie erreichen (kein same-site zu Auth/Cookies).
- SSL/Custom-Domains an Vercel Domains API delegieren (kein eigenes ACME) — später (7b+).
- Serving: dynamisch (generateFunctional serve-Modus) + Edge-Cache SPÄTER; in 7a noch
  OHNE Cache (immer frisch aus published_content). REGEL: sobald Caching dazukommt,
  landet die Publish-Invalidierung (revalidateTag pro Projekt/Domain) IN DERSELBEN
  Scheibe — nie Cache ohne Invalidierung (sonst stiller "mein Publish wirkt nicht"-Bug).
- Draft/Publish ADDITIV: bestehende html/mappings BLEIBEN Draft/Arbeitszustand; NEU
  published_content jsonb beim Publish. KEINE Migration bestehender Spalten in
  draft_content (vermeidet Live-Daten-Migration). WICHTIG (Bau-Realität, siehe 7a):
  published_content speichert das beim Publish CLIENT-generierte funktionale HTML
  (das fertig verdrahtete Dokument) PLUS einen {html,mappings,settings,publishedAt}-
  Snapshot fürs Re-Publish/7b — NICHT nur einen Rohsnapshot, den der Server rendert.
- Cheerio: reserviert für serve-seitige HTML-Transformation (7b: Beacon-Endpoint auf
  same-origin umschreiben). Trennung: Editor=DOMParser (Client), Serving=Cheerio (Server).

BEWUSSTE GRENZEN (geloggt, nicht jetzt gelöst): Kunde-gegen-Kunde same-site auf
*.pgsm.site (Wildcard teilt Registrable Domain) -> auf pgsm.site NIEMALS app-relevante
Cookies/Auth-State; gehostete Seiten berühren keinen Plattform-Auth. Phishing/Malware-
Takedown (Seite schnell abschalten), Content-Moderation, Kosten-Deckelung unter Ad-Last,
Serving-Rate-Limiting -> spätere Härtung.

### Scheibe 7a — "Seite lebt" (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert. Commits: "feat(hosting): serve published projects on
*.pgsm.site (label lookup, isolated origin)" + "fix(hosting): derive publish state from
settings.hosting on project load". Pipeline grün. Live (via lvh.me, echter Host-Header):
publizierte Seite lädt autark unter <label>.lvh.me:3000 OHNE Login-Redirect
(Middleware-Host-Verzweigung vor updateSession greift); Redirect/Text-Wiring funktional;
Draft != Live (Editor-Änderung ohne Re-Publish ändert Live-URL nicht); Idempotenz (2x
publish = gleiche URL, eine domains-Row); Guards (unbekanntes Label -> 404, /app-serve
am App-Host -> 404, App-Auth intakt); Security-Header (nosniff, X-Frame-Options DENY,
Referrer-Policy) auf der Serve-Response.

WICHTIGE ARCHITEKTUR-REALITÄT (Fund beim Bau): Die Engine ist CLIENT-ONLY
(generateFunctional bricht serverseitig ab, DOMParser-Guard generate.ts:224; jsdom nur
Test-Dep, Cheerio erst 7b). Serverseitiges Rendern ist NICHT möglich -> published_content
speichert das beim Publish CLIENT-generierte funktionale HTML (via generateFunctional
("export"), saveProject-Muster "Client generiert, Server speichert") + Snapshot
{html,mappings,settings,publishedAt} fürs Re-Publish/7b. Serve-Route liefert VERBATIM aus
(kein Server-DOM, generate.ts unangetastet). Merksatz: serverseitige HTML-Ausgabe geht
nur über beim-Publish-generierten gespeicherten String, nicht über Laufzeit-Rendering.

SICHERHEIT/ARCHITEKTUR-Notizen 7a: domains-RLS owner-scoped (Labels sind öffentliche
URLs, keine totale SELECT-Sperre nötig) -> Publish-Write über authenticated-Client mit
RLS (kein service_role beim Schreiben; die 2a-RETURNING-Falle tritt nicht auf, weil der
Owner legitimes SELECT hat), service_role NUR beim anonymen Serving-Read (nur project_id/
published_content, kein Draft/Token/Owner-Leak). Label strikt validiert ([a-z0-9-],
Maxlänge) vor dem Lookup (Injection/Sub-Sub-Schutz). eTLD+1-Isolation: pgsm.site setzt
keine App-Cookies.

Ziel: ein gespeichertes+publiziertes Projekt ist unter einer *.pgsm.site-URL als echte
funktionale Seite erreichbar (Wiring/Redirect feuern). KEINE Custom-Domains, KEIN
Cache, KEIN same-origin-CAPI-Rewrite (das ist 7b), KEINE Publish-UI-Politur.

Schlüssel-Insight (hält 7a klein) + KORREKTUR ggü. Original-Notiz: Die Engine ist
CLIENT-ONLY (generate.ts:224 DOMParser-Guard: `if (typeof DOMParser === "undefined")
return html`; jsdom ist devDependency, NICHT Runtime; kein Cheerio). Serverseitiges
Rendern ist damit NICHT möglich — eine Serve-Route (Node, kein DOM) bekäme das rohe html
UNVERÄNDERT zurück (kein Wiring). AUFLÖSUNG (saveProject-Muster: Client stabilisiert/
generiert → Server speichert nur): das funktionale HTML wird beim PUBLISH CLIENT-seitig
erzeugt (generateFunctional("export"), identisch zu handleExportDownload) und in
published_content gespeichert; die Serve-Route liefert es VERBATIM aus. KEIN Server-DOM,
KEINE neue Runtime-Dependency, generate.ts BLEIBT UNANGETASTET (Reuse des export-Modus,
kein neuer serve-Modus). LEKTION: Engine ist client-only → serverseitige HTML-Ausgabe
geht nur über beim-Publish-generierten + gespeicherten String, nicht über
Laufzeit-Rendering (7b Cheerio-Rewrite operiert ebenfalls auf dem gespeicherten String).

Architektur (umgesetzt):
- Migration 0006: (a) neue Tabelle domains(label text PK = Lookup-Key, project_id fk
  projects on delete cascade, created_at; Index auf project_id). RLS an, OWNER-SCOPED
  (nicht total gesperrt wie project_tokens — Labels sind ÖFFENTLICHE URLs, kein Secret):
  SELECT/INSERT/UPDATE für authenticated über Projekt-Ownership-Subquery
  (exists projects p where p.id=project_id and p.user_id=auth.uid()). KEINE anon-Policy
  -> kein Enumerieren; Serving-READ via service_role (bypassed RLS). BEWUSSTER Unterschied
  zu 2a: weil der Owner ein legitimes SELECT hat, tritt die 2a-"RETURNING-Read-back scheitert
  an der SELECT-Sperre"-Falle NICHT auf -> Publish-Write läuft über den authenticated-Client
  (kein service_role beim Schreiben, nur beim Serving-Read) -> mehr DB-Defense.
  (b) projects.published_content jsonb default null.
- src/lib/hosting/host.ts (rein, DB-frei, unit-getestet): extractLabel(host) +
  isServingHost(host). Serving-Suffixe .pgsm.site (Prod) UND .lvh.me (lokal) -> LABEL-Match
  fork-frei (meinprojekt.pgsm.site == meinprojekt.lvh.me:3000). STRIKTE Label-Validierung
  ^[a-z0-9-]{1,63}$ VOR jedem Lookup: Punkt/Sonderzeichen/verschachtelte Sub-Subdomain
  (foo.bar.pgsm.site) -> null -> 404, kein Lookup (Label-Injection-Schutz).
- src/middleware.ts (Entry, KEIN middleware->proxy-Rename): ZUERST auf Host verzweigen.
  isServingHost -> NextResponse.rewrite auf /app-serve -> RETURN (Auth-Gate übersprungen,
  KEINE App-Cookies, KEIN DB-Call). App-Host -> updateSession() BYTE-IDENTISCH wie bisher.
  Weil die Verzweigung im Entry (nicht in updateSession) liegt, bleiben die bestehenden
  Auth-Tests (testen updateSession direkt, Host localhost) OHNE Änderung grün.
- src/lib/hosting/resolve.ts (server-only, wie token.ts): getPublishedHtmlByLabel(label)
  über service_role, ZWEI-Schritt: domains.label -> project_id -> projects.published_content
  -> .html. Selektiert NUR project_id + published_content — NIE html/mappings/settings/token.
- Serve-Route src/app/app-serve/route.ts (runtime "nodejs"): Host-Label extrahieren ->
  Guard !isServingHost -> 404 (direkter App-Host-Zugriff auf /app-serve neutralisiert, kein
  Bypass) -> getPublishedHtmlByLabel -> published_content.html als text/html. Unbekanntes
  Label / published_content null -> 404. SERVIERT NUR published_content, nie Draft
  (html/mappings werden gar nicht abgefragt). Live != Editor-Zustand.
- Security-Header auf der Serve-Response: nosniff, X-Frame-Options DENY, Referrer-Policy
  strict-origin-when-cross-origin. KEIN striktes CSP (bräche Pixel/Beacon).
- publishProject(projectId, functionalHtml, snapshot) (Owner-Session-Server-Action,
  IDOR-geprüft wie setCapiToken: Ownership-Gate über authenticated-Client): funktionalHtml
  ist CLIENT-generiert (Server hat kein DOM). published_content = { html: functionalHtml,
  mappings, settings, publishedAt }. domains-Row sicherstellen (Auto-Label = slug+Random,
  Kollisions-Retry). IDEMPOTENZ: bestehendes Label (in settings.hosting.label) wird
  wiederverwendet -> Re-Publish erzeugt KEINE zweite domains-Row und KEINEN neuen Label
  (Live-URL bleibt stabil). Label in settings.hosting gespiegelt (öffentlich, client-lesbar,
  wie trackingKey in settings.capi) -> Owner sieht die Live-URL ohne domains-SELECT.
  Live-URL aus NEXT_PUBLIC_HOSTING_DOMAIN (Dev lvh.me:3000, Prod pgsm.site) + Label gebaut.
- /app-serve ist NUR via interne Rewrite erreichbar/sinnvoll: kein Bypass zu App-Daten
  (nur published_content by label; Guard + owner-freie Projektion). Direkt-Zugriff
  App-Host -> 404/neutral.

Lokales Testen: lvh.me (*.lvh.me -> 127.0.0.1), echter Host-Header, kein hosts-Editing,
kein Code-Fallback. Label-Lookup macht es fork-frei.

Diskriminierende Tests (Pflicht):
- Serve-Route: bekanntes Label -> published_content-HTML (funktional); unbekanntes Label
  -> 404; Projekt ohne published_content -> 404.
- Serviert NIE draft (html/mappings): Test mit abweichendem draft vs published ->
  Output == published.
- Middleware: pgsm.site-Host -> rewrite auf /app-serve, KEIN /login-Redirect; App-Host
  anonym auf geschützten Pfad -> weiter /login (Auth-Gate intakt); App-Host setzt Cookies,
  pgsm.site nicht.
- Publish-Action: Ownership-Fail (fremde project_id) -> error, kein published_content/
  domains-Write; Happy-Path -> Snapshot + domains-Row + URL.
- Security-Header auf Serve-Response vorhanden.
- domains-Lookup via service_role gibt nur project_id-Ebene, kein Owner-Leak.

Leitplanken: eTLD+1-Isolation strukturell; kein Cache/kein CAPI-Rewrite/keine
Custom-Domain in 7a; Editor/Text-Pfad/Redirect-Engine/2b-Route unberührt (nur neuer
serve-Ausgang). service_role server-only.

### Scheibe 7b — First-Party-Ingest auf gehosteten Seiten (ABGESCHLOSSEN, live verifiziert)
Status: fertig, live verifiziert (lvh.me). Commit "feat(hosting): first-party ingest
/api/e on hosted pages (relative beacon, surgical api passthrough)". Pipeline grün.
Live-Beweise:
- First-Party same-origin: Beacon auf der gehosteten Subdomain geht relativ an /api/e
  (kein absolutes Host im Browser) -> 204. Adblocker-Resistenz eingelöst.
- Export-Divergenz: exportierte Datei nutzt weiter die ABSOLUTE ${NEXT_PUBLIC_APP_URL}/api/e
  (Erreichbarkeit auf Fremd-Server). Publish=relativ, Export=absolut, nebeneinander bewiesen.
- Alias-Parität: POST /api/capi schlägt im geteilten Handler auf (nicht von Middleware
  blockiert), verhält sich identisch zu /api/e. Alte ausgelieferte Exporte tracken weiter.
- Chirurgischer Passthrough (Security): POST /api/projects auf Serving-Host -> Rewrite auf
  /app-serve -> 405, KEIN Leak interner App-APIs auf die Kunden-Domain. Nur /api/e + /api/capi
  werden durchgelassen (exakter Match, nicht /api/* pauschal).
- App-Host-Sanity: Dashboard + Auth auf localhost:3000 unberührt.

Umsetzung: buildFunctionalDocument(capiProxyUrl) mit zwei Aufrufern (Export absolut /
Publish "/api/e"); Middleware-===-Passthrough vor dem /app-serve-Rewrite (next(), kein
updateSession/Cookies); geteilte Logik in lib/capi/ingest.ts, api/capi + api/e als
Re-Export derselben Funktionsreferenz (Identität getestet), /api/capi PERMANENTER Alias
für Alt-Exporte (nicht entfernen); isPublicRoute um exaktes /api/e erweitert (startsWith
wäre falsch -> bräche /api/etwas-anderes -> /login). meta.ts/Consent/eventID/text-plain
unberührt (nur URL-Wert).

REVISION ggü. früherer Notiz: KEIN Cheerio (bleibt reserviert; keine Runtime-Dep ohne
2+ Fälle). Grund: gehostetes HTML wird beim Publish CLIENT-generiert (7a-Realität), die
Engine ist über capiProxyUrl bereits parametrisiert -> die gehostete Variante wird beim
Publish mit RELATIVEM Ingest-Pfad (/api/e) generiert; Export-Download behält die absolute
${NEXT_PUBLIC_APP_URL}-URL. Es gibt keine serverseitige Injektions-Stelle -> nichts für
Cheerio zu tun.
Kernarbeit 7b: (a) Middleware lässt die Ingest-Pfade auf Serving-Hosts DURCH (vor dem
/app-serve-Rewrite; weiterhin ohne Auth, ohne App-Cookies); (b) neutrale Route /api/e mit
GETEILTER Handler-Logik aus 2b-i, /api/capi bleibt funktionaler Alias (alte Exporte).
Consent-Gate, text/plain, geteilte eventID: unverändert (nur der URL-Wert im Beacon
ändert sich). Ergebnis: Tracking gehosteter Seiten läuft same-origin = adblocker-resistent
(First-Party-Versprechen eingelöst).

## Phase 7c — Custom-Domains + Auto-SSL (Konzept & Entscheidungen)
Der härteste Brocken von Phase 7: Pagesmith serviert gehostete Seiten nicht mehr nur
unter *.pgsm.site, sondern unter der EIGENEN Domain des Marketers (Zielnutzer kauft
wöchentlich neue Domains für Rapid Testing). Konzept + Entscheidungen unten; Bau in
den vier 7c-Scheiben (siehe Roadmap). Jede Entscheidung MIT Begründung, damit heutige
Schnittführung die späteren Scheiben nicht versperrt.

- MODELL: Kunden-Domain per Vercel-API unserem Vercel-Projekt hinzufügen; Vercel macht
  Cert-Provisioning + Edge-Routing, wir lösen den eingehenden Host serverseitig zum
  Projekt auf. SSL an die Plattform delegiert (kein eigenes ACME) — gleiche
  Delegations-Entscheidung wie in der Phase-7-Owner-Direktive, jetzt umgesetzt.
- MIDDLEWARE-INVERSION (Kern-Entscheidung): Die Host-Verzweigung kippt von "ist
  Serving-Host?" (7a: Suffix-Match auf pgsm.site/lvh.me) auf "ist APP-Host?" (Allowlist:
  pagesmith.app, www, die *.vercel.app-Preview-Hosts, localhost/Dev). ALLES andere fällt
  in den Serving-Zweig -> pgsm.site UND beliebige Custom-Domains teilen denselben Pfad,
  ohne pro Domain eine Middleware-Regel. Begründung: eine offene Menge (Custom-Domains)
  lässt sich nicht per Suffix-Allowlist führen; die geschlossene Menge (unsere App-Hosts)
  schon. KEIN DB-Call im Edge (Middleware bleibt DB-frei wie in 7a); der Label-/Host-
  Lookup bleibt in der Node-Serve-Route. Unbekannter Host -> 404, KEINE App-Cookies,
  KEINE Auth. Konsequenz (Sicherheit): die App ist auf Nicht-App-Hosts strukturell
  unerreichbar -> kein Host-Spoof-Auth-Bypass. Der chirurgische /api/e|/api/capi-
  Passthrough (7b) hängt durch die Inversion am Serving-Zweig GENERELL -> First-Party-
  Ingest ist auf Custom-Domains automatisch same-origin/adblocker-resistent (EINE
  Änderung, nicht zwei getrennte).
- ISOLATION: jede Custom-Domain ist ein eigener eTLD+1 -> automatisch isoliert von der
  App UND von anderen Kunden (stärker als die geteilte *.pgsm.site-Wildcard, die
  Registrable Domain teilt und deshalb die "auf pgsm.site NIE App-Cookies"-Grenze
  brauchte). Regel "auf Nicht-App-Hosts NIE App-Cookies/Auth-State" gilt unverändert
  und deckt Custom-Domains ohne Zusatzarbeit mit ab.
- DATENMODELL additiv: die bestehende `domains`-Tabelle bekommt NULLBARE Spalten
  (custom_host text, GLOBAL UNIQUE; ein Status-Feld; das von Vercel gelieferte
  DNS-Recordset). pgsm.site-Zeilen lassen die neuen Spalten null. Lookup fallweise:
  pgsm.site-Host -> per Label (7a-Pfad unverändert); Custom-Host -> per custom_host
  EXAKT. KEINE Migration bestehender Zeilen (additive nullable Spalten, wie 7a
  published_content) -> keine Live-Daten-Transformation.
- EFFEKTIVER HOST (Sicherheit): sowohl der Serve-Lookup als auch der Middleware-Branch
  lesen den Host aus x-forwarded-host (Prod, von Vercels Edge gesetzt), Fallback auf den
  Host-Header (Dev ohne Proxy). Strikt validiert (Shape [a-z0-9-.], Länge) VOR jeder
  Nutzung (Injection-/Lookup-Schutz, wie die 7a-Label-Validierung). EINE Quelle für
  Branch UND Lookup -> kein Split-Brain (verschiedene Host-Quellen an Branch vs Lookup
  wären ein Bypass). Helfer in lib/hosting/host.ts, unit-testbar (neben extractLabel/
  isServingHost aus 7a). TRUST-BOUNDARY (explizit geloggt): x-forwarded-host wird NUR
  vertraut, weil die Serverless-Funktion ausschließlich hinter Vercels Edge erreichbar
  ist (Edge überschreibt einen client-gesetzten Header). Das wird per Instrument auf
  einem Vercel-Preview BESTÄTIGT (Header loggen), NICHT aus dem Gedächtnis angenommen
  (Instrument schlägt Vermutung — dieselbe Regel wie in 2a/2b).
- VERCEL-API-TOKEN = neues server-only Secret: `import "server-only"`, NIE im
  Client-Bundle, NIE committet, NIE in Migration/SQL-Editor. Gleiche Disziplin wie
  SUPABASE_SERVICE_ROLE_KEY (2a): nur in .env.local (vorher .gitignore verifizieren),
  nur in server-only-Modulen. Alle Vercel-Calls serverseitig.
- ADD-DOMAIN als reine (userId, params)-Funktion: Ownership-Gate DAVOR (heiligstes-Gate-
  Muster aus 2a; MCP-ready gemäß "Session-unabhängige Mutationen"-Constraint),
  Geschäftslogik (Vercel-Call + DB-Write) DAHINTER, sauber getrennt.
- VERCEL-ZWEI-ZUSTAND: Vercel meldet ZWEI unabhängige Zustände — Verification
  (Domain-Besitznachweis, i.d.R. TXT-Record) vs Configuration (DNS zeigt tatsächlich
  hierher / Cert steht). BEIDE gehören ins Statusmodell (eine Domain kann "verifiziert,
  aber fehlkonfiguriert" sein). Provisioning ist ASYNCHRON -> pollen/re-checken (7c-3);
  der Status wird aus Vercels Wahrheit ABGELEITET und DB-gecacht (Ableiten-statt-Löschen,
  konsistent zum projekt-spezifischen View-State-Prinzip).
- APEX + SUBDOMAIN beide unterstützen (Zielnutzer kauft ganze Domains, nicht nur
  Subdomains): DNS-Anweisungen fallweise generiert (Apex -> A-Record auf Vercels IP;
  Subdomain -> CNAME auf Vercels Target). Apex-CNAME-Flattening-Grenze mancher
  Registrare beachten (nicht jeder Registrar kann CNAME auf Apex). Exakte DNS-Werte +
  Vercel-API-Endpunkte gegen die AKTUELLE Vercel-Doku pinnen (NICHT aus dem Gedächtnis —
  Config-Fakten/IP-Targets veralten; gleiche "Config-Fakten nicht aus dem Kopf"-Regel
  wie beim DNS-Recordset).
- PER-USER-HARD-CAP (7c-2): eine Obergrenze pro User schützt Vercels Rate-/Domain-
  Limits. Prüfung in der Add-Domain-Mutation VOR dem Vercel-Call. Ehrlich geloggt:
  App-Layer-Check ist race-anfällig um ±1 (zwei parallele Adds); falls "truly hard"
  nötig, DB-Trigger/Constraint als spätere Option — für den MVP reicht der App-Check.
- KOSTEN/LIMITS geloggt: wöchentlich gekaufte Domains akkumulieren im Vercel-Projekt;
  Cleanup unbenutzter Domains + Rate-Limit-Handling sind spätere Härtung (nicht 7c-1).
- LANDMINEN:
  (a) App-Host-Allowlist-VOLLSTÄNDIGKEIT: die Preview-Hosts (*.vercel.app) NICHT
      vergessen, sonst landen eigene Deployments im Serving-Zweig -> 404 auf die eigene
      App. Absichern per Regressionstest.
  (b) pgsm.site-Serving darf durch die Inversion NICHT brechen -> diskriminierender
      Regressionstest (bekanntes Label serviert weiter, wie in 7a).
  (c) custom_host GLOBAL UNIQUE + Cross-User-Hijack: ein User darf keine fremde/schon
      belegte Domain beanspruchen. Kontrolle = Vercels Verification (real-world
      Besitznachweis) + Ownership-Gate auf der Mutation + der UNIQUE-Constraint.
  (d) x-forwarded-host-Trust-Boundary (siehe EFFEKTIVER HOST) per Preview-Instrument
      bestätigen.

### Scheibe 7c-1 — Serving-Kern (LOKAL ABGESCHLOSSEN, Prod-GATE offen)
Status: lokal vollständig, live getestet auf beiden Serving-Pfaden. Commits
"feat(hosting): 7c-1 middleware-inversion + custom_host serving" + "chore(hosting):
remove 7c-1 diagnostics and gate probe". Pipeline grün (269 Tests, tsc/lint/build).
Die Serving-Kette (Branch -> Rewrite -> Serve-Route -> Resolver) ist end-to-end lokal
grün für BEIDE Pfade (byLabel UND byCustomHost servieren published_content), die App
auf localhost bleibt unberührt.
- Umsetzung: additive Migration 0007 (domains.custom_host nullbar + partial-unique
  WHERE custom_host IS NOT NULL, Cross-User-Hijack-Riegel) live. resolveEffectiveHost
  (x-forwarded-host bevorzugt, host-Fallback, Port-Strip, strikte Shape-Validierung)
  + isAppHost (geschlossene Allowlist inkl. .vercel.app) als reine Funktionen
  unit-getestet. Middleware-Inversion DB-frei; host===null -> Serving-Zweig.
  app-serve-Dispatch (label ? byLabel : byCustomHost) über DIESELBE Host-Quelle wie
  die Middleware (kein Split-Brain). resolve.ts um getPublishedHtmlByCustomHost
  (Spiegel, gleiche Nur-project_id+published_content-Projektion) ergänzt.
- Diskriminierende Wächter grün: pgsm-Label serviert weiter (der Pfad, den die
  Inversion anfasst); Custom-Host -> Serving-Zweig/kein Auth; Passthrough exakt
  (/api/e|/api/capi, jetzt AUCH für Custom-Domains); App-API-Leak-Gegenprobe
  (Custom-Host + andere /api-Route -> KEIN Passthrough); bare pgsm.site kippt bewusst
  in den Serving-Zweig (Inversions-Folge, ein bestehender Test angepasst).
- LEKTION (Instrument schlägt Vermutung, in EINEM Bogen DOPPELT bestätigt): Beide
  404 der lokalen Sim waren TESTDATEN, kein Code-Bug. (a) lvh-Pfad: Tippfehler im
  Label (ef8dh9 statt publiziert ef6dh9). (b) custom-Pfad: es existierte gar keine
  domains-Zeile mit dem custom_host (Insert nie angekommen) -> der byCustomHost-Miss
  war KORREKTES Verhalten. Der [SERVE]-dispatch-Log bewies den korrekten Resolver +
  Port-Strip, BEVOR Code verdächtigt wurde. Sowohl CCs XFH-Verdacht als auch Claudes
  "lvh-Pfad regrediert"-Prämisse wurden vom Instrument WIDERLEGT. Regel bestätigt:
  billiges diskriminierendes Instrument (gezielter Log) vor jeder Code-Hypothese.
- OFFENES GATE (hart, Vorbedingung für 7c-2): Die host-basierte Auth-Inversion ruht
  auf der Annahme, dass Vercels Edge einen client-gefälschten x-forwarded-host
  überschreibt. Lokal NICHT prüfbar — es gibt keinen Edge-Proxy davor; ein lokaler
  curl mit gefälschtem Header zeigt den Fake erwartungsgemäß durchschlagen. Das
  beweist NUR den Parser, NICHT die Boundary. Deshalb NICHT als bewiesen verbucht.
  ERSTER SCHRITT in 7c-2 (sobald Vercel-Konto + erster Prod-/Preview-Deploy existiert):
  das Wegwerf-Edge-Instrument /api/_hostprobe erneut setzen (ruft die ECHTE
  resolveEffectiveHost/isAppHost, surfaced rawXForwardedHost/rawHost/effectiveHost/
  isApp, keine Secrets) und die curl-Matrix gegen die ECHTE Preview-URL fahren: #1
  normal, #2 gefälschter x-forwarded-host. GO nur, wenn die Edge den Fake verwirft
  (effectiveHost == echter Host). NO-GO -> die resolveEffectiveHost-Präzedenz (an
  EINER Stelle isoliert) revidieren, BEVOR die Vercel-Domains-API gebaut wird. Kein
  Weiterbau auf ungeklärter Boundary. Instrument nach dem Urteil wieder entfernen.

### 7c-2-GATE — Ergebnis: XFH-Trust-Boundary in Prod BEWIESEN (GO)
Status: das OFFENE GATE oben ist ERLEDIGT. Der Wegwerf-Probe /api/_hostprobe wurde auf
einem Vercel-Preview (voller 7c-1-Code) gesetzt, die curl-Matrix gefahren, das Urteil
gefällt, der Probe wieder entfernt (Commit "chore(hosting): remove 7c-2 gate host-probe";
grep 7c-2-GATE/_hostprobe = 0, Pipeline grün, alle 269 Tests/7c-1-Tests weiter grün).
- BEFUND: Vercels Edge ÜBERSCHREIBT einen client-gelieferten x-forwarded-host mit dem
  echten Host. Die Vercel-Doku SCHWIEG dazu (nur x-forwarded-FOR ist explizit
  spoofing-geschützt dokumentiert) -> GETESTET, nicht angenommen. Matrix-Ergebnis: #2
  (gefälscht x-forwarded-host: evil-attacker.example) UND #3 (gefälscht: pagesmith.app)
  wurden BEIDE zum echten Preview-Host überschrieben; effectiveHost war STETS der echte
  Host. Auch der RFC-7239-`forwarded`-Header ist Vercel-kontrolliert. -> Konsequenz:
  resolveEffectiveHost (Präzedenz x-forwarded-host ZUERST) ist in Prod sicher; die
  host-basierte Auth-Inversion steht auf bewiesenem Grund, kein Host-Spoof-Auth-Bypass.
- host-FALLBACK: reine Local-Dev-Bequemlichkeit (Dev ohne Edge-Proxy). In Prod moot —
  Vercel setzt x-forwarded-host IMMER, ein Angreifer kann den Fallback nicht erzwingen
  (er müsste x-forwarded-host WEGlassen, aber die Edge setzt ihn ohnehin).
- LEKTION (Instrument schlägt Vermutung, erneut bestätigt): die Doku-STILLE zu
  x-forwarded-host hätte die Trust-Boundary als ungeprüfte Annahme im Fundament
  hinterlassen. Kein Menge Code-Lesen hätte das aufgelöst — nur der Probe auf echter
  Vercel-Edge machte aus der Annahme eine Tatsache (dieselbe Regel wie 2a/2b/7c-1).
- OPS-STAND (Team-Gedächtnis): 7b + 7c-1 (+ der Gate-Cleanup) liegen auf Branch
  gate/7c-2-xfh; main ist DAHINTER (kennt weder 7b noch 7c-1). Ein ÜBERLEGTES Release
  nach main steht damit als eigene Entscheidung an — es ist KEIN Nebeneffekt des Gates
  und wurde bewusst nicht mit-gemerged. Vor 7c-2-Bau bzw. Prod-Nutzung klären.

## Phase 8 — Analytics & ROI-Ökosystem (Vision, NACH Phase 7)
Owner-Direktive: Pagesmith wird hybrides Server-Side-Marketing-/Analytics-Ökosystem.
Client erfasst Interaktion -> First-Party-Hit an unsere Hosting-Infra -> Server
verarbeitet (adblocker-resistent). Umfang je EIGENE Scheiben (nicht ein Block):

1. Kunden-Tracking/Traffic-Gesundheit: PageViews, Uniques, Verweildauer, Scrolltiefe
   (25/50/75/100), Klicks/Conversion-Rate, Form Start vs Submit, Video-Watchtime
   (HTML5/YouTube/Vimeo), Bot-/Fraud-Quote (serverseitige Filterung), Core Web Vitals
   + 404/500-Alarme auf Kundenseiten.
2. ROI/Attribution/Finanz — SCHEMA-VORBEREITUNG jetzt, BAU erst bei realer Ad-Spend-API
   (2+ Fälle, nicht vorab abstrahieren): Ad-Spend-Match (Meta/Google) -> ROAS, POAS
   (Produktmargen), CPA/CPL, Multi-Touch (First-/Last-Click). KISS-Dashboard im Backend
   + vollständiger Export als CSV UND Excel.
3. Betreiber-Metriken: aggregierte Best-Performer-Layouts (anonymisiert, KI-Training),
   Traffic-Zählung pro Projekt (datenbasiertes Rate-Limiting, SaaS-Tarifgrenzen,
   In-App-Upgrade-Meldungen).

VOR DEM BAU ZU KLÄREN (Bedrohungs-/Rechtsmodell):
- "Hybrid" ehrlich: Scrolltiefe/Verweildauer/Video/Vitals sind CLIENT-erfasst (der
  Server sieht kein Scrollen). ALLES Besucher-Tracking hängt hinter demselben
  psConsent() wie das Pixel (DACH) — sonst reißen wir das 1b-Loch wieder auf.
- ZWEI-EBENEN-DSGVO-TRENNUNG: Kunden-Ebene (im Auftrag des Marketers, consent-gated,
  ggf. gehashte Kennungen für Uniques) vs. Betreiber-Ebene (STRIKT anonym: nur
  Event-Typ, Projekt-ID, Zeitstempel — NIE IP/PII der Endbesucher). "Uniques
  serverseitig ohne PII" ist ein zu lösender Widerspruch, keine Selbstverständlichkeit.
- Datenvolumen unter Ad-Traffic: Aggregations-/Retention-Strategie ist Design-Frage der
  ersten Scheibe, kein Nachtrag (eine Event-Tabelle wächst unter Ad-Spend schnell).

ADBLOCKER-VERLUSTRATE — Ziel JA, Methodik BEWUSST festgelegt (nicht die naive Variante):
- NICHT über einen synthetischen blockbaren Test-Hit messen. Gründe: (a) ein absichtlich
  blockbarer Third-Party-Request an facebook/doubleclick erzeugt genau das
  Consent-/DSGVO-Problem, dessen Vermeidung unser Verkaufsargument ist; (b) "Hit fehlt"
  != "geblockt" (Timing/Abbruch/Navigation verzerren); (c) es misst ein Test-Pixel,
  nicht echte Conversions.
- STATTDESSEN: über den geteilte-eventID-Vergleich ECHTER Events. In der Hybrid-CAPI
  sehen wir beide Ströme; zähle Events, die NUR server-seitig ankamen (Beacon da,
  Browser-Pixel-Bestätigung fehlt) gegen die, die BEIDE Wege nahmen. Differenz =
  "gerettete" Quote, gemessen an echten Conversions, ohne zusätzlichen blockbaren
  Request, ohne neues Consent-Problem. Story: "X% deiner echten Conversions wären ohne
  uns bei Meta nie angekommen."
- Voraussetzung: der Server muss die Browser-Pixel-Bestätigung SEHEN (heute geht das
  Pixel direkt an Meta). Das ist Phase-8-Persistenz-Logik, KEINE 7b-Sache. KEIN Cheerio.

ARCHITEKTUR-NAHT (in 7b gelegt, Form statt Maschinerie): neutraler First-Party-
Ingest-Endpoint /api/e als EIN Trichter für alle Events gehosteter Seiten. Heute nur
Meta-CAPI-Forward; Phase-8-Persistenz (Dashboard, Betreiber-Metriken, Verlustraten-
Vergleich) hängt sich später ADDITIV in denselben Trichter. Keine weitere Vorab-Abstraktion.

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

### Phase 10 — AI-Native: Pagesmith MCP-Server (Vision, NACH Go-Live)
Ziel: Pagesmith als natives Tool in KI-Umgebungen der Marketer (Claude Desktop, Cursor,
Windsurf) via eigenem MCP-Server (Model Context Protocol, JSON-RPC-Endpunkt z.B. /api/mcp).
Marketer generiert im Profil einen Pagesmith-MCP-Key; seine KI kann dann Projekte anlegen,
Tracking-Status abfragen, Meta-Tokens aktualisieren etc. Verwandelt Pagesmith von
Web-App zu KI-Infrastruktur — potenzielles Alleinstellungsmerkmal.

TIMING (Owner-Entscheidung, endgültig): Phase 10, NACH Phase 7 (Hosting/Go-Live). Grund:
MCP ist ein Feature für eine Nutzerbasis, die es vor Go-Live noch nicht gibt; sein Wert
entsteht, wenn reale Projekte existieren, die eine KI managen kann. Es JETZT zu bauen
verstößt gegen "kleine beweisbare Slices / Abstraktion erst bei 2+ Fällen" und lenkt vom
Wert-Schalter (Go-Live) ab.

VOR DEM BAU ZU KLÄREN (Bedrohungsmodell — eigene Phase, KEIN Endpunkt-Anhängsel):
MCP dreht das bisherige Sicherheitsmodell um. Bisher: Owner schreibt nur eingeloggt
(Session+RLS); der einzige anonyme Pfad (/api/capi) ist bewusst write-only, capability-
gated, ohne Datenrückgabe. MCP dagegen = LESEN UND SCHREIBEN mit voller Owner-Autorität,
ausgelöst von einem langlebigen API-Key in der KI-Umgebung eines Dritten. Konsequenzen:
- Der MCP-Key ist mächtiger als alles bisher Ausgegebene (kann alles, was der Owner kann,
  inkl. Meta-Token-Update). Geleakter Key = Vollzugriff + fremde Ad-Account-Umleitung.
  Blast-Radius größer als service_role, weil ABSICHTLICH nach außen gegeben.
- Umgeht RLS-Session-Bindung -> Autorisierung MUSS komplett in die App-Schicht, PRO
  MCP-Aufruf (Key -> User auflösen -> Ownership prüfen -> erst dann handeln). Die
  "heiligstes Gate"-Situation aus 2a, aber für JEDE Methode. Eine vergessene Prüfung =
  IDOR über die ganze Plattform.
- Echter Scope (nicht "ein Endpunkt"): MCP-Protokoll korrekt (Tool-Discovery/Schemas/
  Fehler-Semantik), Key-Gen/-Rotation/-Widerruf-UI + sicherer Storage, Rate-Limiting
  (KI-Agent in Schleife), Audit-Logging (fremd-gesteuerte Schreibzugriffe), pro-Key-
  Scoping (read-only vs. token-write). Eigene Phase auf Augenhöhe mit Phase 6.
Merksatz: Die bestehende Server-Logik geht von einer Owner-Session aus; MCP hat keine.
NICHT "direkt ansprechen" — eine neue Autorisierungsschicht DAVOR bauen.

### Optionale Module, Post-7c-2 (UNVERBINDLICH — Richtungsgeber, KEINE committete Roadmap)
Die folgenden zwei Sektionen sind UNVERBINDLICHE "Optionale Module, Post-7c-2" —
Richtungsgeber, KEINE committete Roadmap, KEIN Statuswechsel, KEINE Scope-Erweiterung
von 7c-2. Sie ändern an der laufenden Arbeit (7c-2a) NICHTS. Jedes Modul wird bei echter
Umsetzung eine eigene beweisbare Slice mit eigenem Konzept.

NAHT-HYGIENE-PRINZIP (das EINZIGE, das die laufende Arbeit überhaupt berührt):
Die einzige berechtigte "Vorbereitung" ist Naht-Hygiene, KEIN Code-Vorbau. 7c-2 koppelt
Domain-/Routing-Logik NICHT an Tracking-/Lead-Logik. Die Andock-Punkte für alle Module
unten EXISTIEREN BEREITS: der neutrale /api/e-Trichter (Multi-Tracking dockt additiv an)
und die projekt-scoped Settings (Pixel/Token; Auto-Tracking dockt an). "Nahtloses
Andocken" ist Ergebnis sauberer Nähte + additiver Disziplin, NICHT von spekulativem
Vorbau. KEINE Webhook-Interfaces/Schema-Erweiterungen ohne realen Konsumenten + Spec
(Prinzip "Abstraktion erst bei echtem Bedarf").

## Zukunfts-Roadmap: Owned Traffic Mastery (Post-7c-2, OPTIONALE MODULE)
Unverbindliche Erweiterungsrichtung; jedes Modul wird bei echter Umsetzung eine eigene
beweisbare Slice mit eigenem Konzept. Reihenfolge/Umfang offen.

### 1. Lead-Enrichment & Conversion (Next-Gen Formulare)
- KI-gestützte Multi-Step-Quizze; Zero-Party-Data-Erfassung.
- EHRLICHE EINORDNUNG (wichtig): Pagesmith speichert HEUTE KEINE Lead-PII (feuert nur
  Tracking-Events). Dieses Modul = PII PERSISTIEREN -> löst unmittelbar das Security-
  Manifest aus (30-Tage-Retention, AVV, RLS für Lead-Daten). Eigenes Daten-/Compliance-
  Universum, kein Feature-Anbau. Größte neue Fläche, NICHT "bald".

### 2. Conversational & Mobile Channels
- Click-to-Chat-Kits (WhatsApp-Opt-in-Doku), generische Webhooks für SMS/RCS.
- EINORDNUNG: Click-to-Chat ist billig (Link/Kit). Wallet-Pässe (Apple/Google) sind ein
  GROSSER Brocken (Pass-Signing, Zertifikate, eigenes Renewal), unklarer ROID fürs
  Kernprodukt -> separat gewichten, nicht gleichrangig.

### 3. Server-Side Data Hub (DSGVO-safe)
- Multi-Tracking-Hub: Meta CAPI + GA4 + TikTok Events API server-side (kein Client-Bloat).
- Edge-Puffer für Lead-Daten bei CRM-Ausfall.
- EINORDNUNG: STÄRKSTER, natürlichster Fit -> exakt die Verallgemeinerung, für die der
  neutrale /api/e-Trichter gebaut wurde ("mehr Ziele am selben Event", kein Bruch).
  Verortung Phase 8.

### 4. Native CRO-Optimierung
- Smart Sections (Content nach Traffic-Quelle); Native AI-A/B.
- EINORDNUNG: AI-A/B ist bereits Phase 9. Smart Sections = Serve-Zeit-Variantenwahl ->
  dockt später ADDITIV an die Serve-Route (liefert heute published_content verbatim;
  Variantenwahl ist additiver Schritt). JETZT einzubauen wäre premature.

## Architektur-Vision: "Smart-Tracking & Automation" (Leitprinzip, Post-7c-2)
Leitprinzip "Smarte Veredelung": technische Konfiguration automatisieren, wo möglich;
Hybrid aus Autopilot (Vorschläge) + Experten-Modus (manuelle Kontrolle); manuelles
JS-Snippet-Copy-Paste minimieren.
- GENAUIGKEITS-KORREKTUR (wichtig, sonst Doppel-Bau-Gefahr): Die "automatische Erkennung
  der Element-Funktion" ist KEIN Zukunftsfeature — die Detection (detect.ts, "Erkannte
  Elemente") existiert seit Phase 2. Ebenso speichert die Mapping-Tabelle Element->Event
  BEREITS. NEU ist allein die Auto-VORSCHLAGS-/Hybrid-Schicht obendrauf (Autopilot vs.
  Experten-Modus). "Mapping-Intelligenz speichern" braucht daher voraussichtlich KEINE
  neue Struktur — höchstens irgendwann eine ADDITIVE Spalte "auto-vorgeschlagen vs.
  bestätigt". App-Logik auf existierendem Storage, KEIN Schema-Vorbau.
- ENTWICKLUNGS-LEITSATZ: jedes künftige Feature prüft, ob der Intent schon bekannt ist
  (automatisierbar) oder manuell konfiguriert werden muss — OHNE dafür jetzt Struktur auf
  Vorrat zu bauen.

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

## SECURITY MANIFEST & LAUNCH BLOCKERS
Dies ist die EINE Wahrheitsquelle für Launch-Blocker. Die verstreuten Härtungs-
Einträge in der Polish-Liste werden hierher REFERENZIERT, nicht mehr dupliziert.
Prinzip explizit: NICHT alles ist P0. Sequenziert nach dem Moment, in dem das
Risiko real BEISST — sonst ist nichts ein Blocker (eine Liste, auf der alles
"kritisch" ist, priorisiert nichts). Jedes Item trägt vier Felder: RISIKO (was
schiefgeht) / TRAGENDE KONTROLLE (was es abfängt) / EHRLICHE EINORDNUNG (Grenze,
Trade-off, Selbsttäuschung) / BINDET-AN (Phase/Gate, ab dem es real wird).

### Tier 0 — Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)
- KILL-SWITCH (HÖCHSTE Priorität der Liste): Admin-CLI/Interface, das eine
  project_id/Domain SOFORT im Serving-Zweig sperrt.
  RISIKO: eine gehostete Phishing-/Malware-Seite bleibt live, während man manuell
  in der DB gräbt — Minuten zählen (Shared-Reputation, Tier 1).
  TRAGENDE KONTROLLE: blocked-Flag auf der domains-Zeile, das die (in 7c-1 gebaute)
  Serve-Route VOR dem Ausliefern prüft -> 451/410 statt Content.
  EHRLICHE EINORDNUNG: billig, hakt direkt in die bestehende Serving-Architektur
  (kein neuer Pfad, nur ein Flag + ein Guard). Kein Grund, das zu vertagen.
  BINDET-AN: Serving existiert (7a/7c-1) -> baubar ab sofort, Blocker vor erstem
  echten Fremd-Traffic.
- LOGGING-LEAK schließen:
  RISIKO: Next.js loggt Server-Action-Argumente im Klartext; der CAPI-Token tauchte
  in 2a nachweislich im Dev-Terminal auf -> Secret in Prod-Logs = Leak an jeden mit
  Log-Zugriff, irreversibel sobald exportiert/indexiert.
  TRAGENDE KONTROLLE: STRUKTURELLER Fix — minimieren, wo der Token überhaupt
  hinreist (alternativer Ingestion-Pfad statt Server-Action-Argument), nicht nur
  Maskierung (Maskierung ist umgehbar/vergesslich).
  EHRLICHE EINORDNUNG: Verifikation MUSS instrument-basiert sein (Logs nach einem
  echten Token-Set-Flow auf einem Preview greppen) — nicht aus dem Code "sieht sauber
  aus" schließen (Instrument schlägt Code-Re-Read, 2a-Lektion).
  BINDET-AN: existiert seit 2a; Blocker vor Prod-Logging mit echten Tokens.
  (Ersetzt den gleichlautenden Polish-Listen-Eintrag.)
- E-MAIL-BESTÄTIGUNG wieder aktiv:
  RISIKO: fürs MVP deaktiviert (sofort eingeloggt) -> offene Registrierung =
  Spam-Accounts, Ressourcen-/Kosten-Missbrauch, Wegwerf-Identitäten.
  TRAGENDE KONTROLLE: Double-Opt-in-Confirmation in Supabase Auth wieder anschalten.
  EHRLICHE EINORDNUNG: reiner Dashboard-Toggle, kein Code; bewusste MVP-Abkürzung
  (3.1), die vor Öffentlichkeit zurückgenommen werden MUSS.
  BINDET-AN: öffentlicher Launch. (Ersetzt den Polish-Listen-Eintrag.)
- KOSTEN-CIRCUIT-BREAKER:
  RISIKO: Runaway-Loop/Abuse (KI-Agent in Schleife, Ad-getriebener Traffic-Spike)
  erzeugt eine katastrophale Vercel-/Supabase-Rechnung — Financial-DoS.
  TRAGENDE KONTROLLE: harter Spend-Cap + Alarm auf beiden Plattformen (Plattform-
  Budget-Limits, nicht App-Logik).
  EHRLICHE EINORDNUNG: das ist der grobe Pre-Launch-FLOOR; das feingranulare
  Per-Tenant-Rate-Limiting (Tier 1) ist die präzise Ebene darüber. Beides nötig,
  aber der Cap fängt die Katastrophe ab, bevor Rate-Limits kalibriert sind.
  BINDET-AN: bevor irgendeine Domain öffentlich Traffic zieht.
- ABUSE-KANAL + security.txt auf pgsm.site UND Haupt-App:
  RISIKO: kein Melde-Weg für Security-Forscher/Abuse-Meldungen -> Schwachstellen/
  Missbrauch werden gar nicht oder öffentlich gemeldet; eine Hosting-Plattform ohne
  Meldeweg zu betreiben ist blank fahrlässig.
  TRAGENDE KONTROLLE: /.well-known/security.txt (RFC 9116) mit Kontakt auf BEIDEN
  Origins + überwachtes Abuse-Postfach.
  EHRLICHE EINORDNUNG: trivialer Aufwand, disproportional wichtig, sobald fremde
  Seiten unter unserer Infrastruktur laufen.
  BINDET-AN: Go-Live der Hosting-Schicht.
- SUBPROZESSOR-DPAs + Kunden-DPA:
  RISIKO: ohne signierte Auftragsverarbeitungs-Verträge (Vercel/Supabase als
  Subprozessoren) und ohne signierbaren Kunden-DPA ist der DACH-Betrieb rechtlich
  nicht sauber aufsetzbar (DSGVO Art. 28).
  TRAGENDE KONTROLLE: Vercel/Supabase-DPAs signiert einholen + eigenen Kunden-DPA
  als signierbares DOKUMENT bereitstellen.
  EHRLICHE EINORDNUNG: der automatische AVV-GENERATOR ist ein Post-Launch-
  PRODUKTFEATURE, KEIN Blocker — nur das signierbare Dokument + die Subprozessor-
  Kette müssen zum Launch stehen.
  BINDET-AN: öffentlicher Launch mit echten Kunden(-Daten).

### Tier 1 — Vor echtem Ad-Traffic / Spend (nicht vor dem ersten Login)
- PER-TENANT-RATE-LIMITING /api/e + /api/capi:
  RISIKO: ungebremster Ingest -> Kosten-/Ressourcen-Missbrauch, Verzerrung fremder
  Tenant-Daten.
  TRAGENDE KONTROLLE: Rate-Limit pro Tenant (trackingKey/Projekt) auf beiden Ingest-
  Routen.
  EHRLICHE EINORDNUNG (WICHTIG): /api/e ist GEBAUT, um von echten Besuchern OFT
  getroffen zu werden -> das Limit auf ABUSE kalibrieren, nicht auf Erfolg. Zu
  aggressiv = echte Conversions fallen weg = der Produktwert (First-Party-Resilienz)
  wird selbst zerstört.
  BINDET-AN: bevor echter Ad-Traffic auf gehostete Seiten trifft.
- LOGIN-BRUTE-FORCE:
  RISIKO: unbegrenzte Login-Versuche -> Credential-Stuffing/Brute-Force auf Owner-
  Accounts.
  TRAGENDE KONTROLLE: hartes Rate-Limit auf IP + E-Mail.
  EHRLICHE EINORDNUNG: ZUERST Supabase-Auth-Built-in prüfen (nicht doppelt bauen),
  dann nur die Lücke ergänzen.
  BINDET-AN: sobald es echte Accounts mit echten Assets (Tokens/Domains) gibt.
- SAFE-BROWSING korrekt eingesetzt:
  RISIKO: gehostete Seiten leiten auf Malware-/Phishing-Ziele; pgsm.site wird von
  Google Safe Browsing geflaggt.
  TRAGENDE KONTROLLE: Redirect-ZIEL-URLs aus den Mappings gegen Safe Browsing prüfen
  + überwachen, ob pgsm.site selbst geflaggt wird.
  EHRLICHE EINORDNUNG: KEIN HTML-Content-Scan — das ist ein Kategoriefehler. Die
  Safe-Browsing-API prüft URLs, nicht rohes HTML. Wer HTML durch sie jagt, misst
  nichts.
  BINDET-AN: Fremd-Content live (Hosting).
- SHARED-REPUTATION pgsm.site:
  RISIKO: die *.pgsm.site-Wildcard teilt die Registrable Domain -> EINE geflaggte
  Kundenseite kann ALLE pgsm.site-Seiten mit einem Browser-Interstitial treffen
  (Kollektivhaftung).
  TRAGENDE KONTROLLE: Kill-Switch (Tier 0) zur schnellen Isolierung + riskante/neue
  Nutzer bevorzugt auf Custom-Domains schieben (eigener eTLD+1 -> Blast-Radius auf
  die eine Domain eingedämmt).
  EHRLICHE EINORDNUNG: verschärft die Kill-Switch-Dringlichkeit und ist ein
  konkretes Produkt-Argument für die 7c-Custom-Domain-Arbeit (Durchstich, nicht nur
  Feature).
  BINDET-AN: Multi-Tenant-Serving live; mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION:
  RISIKO: Nutzer wählen bekannt-kompromittierte Passwörter.
  TRAGENDE KONTROLLE: Supabase-HaveIBeenPwned-Abgleich (Auth-Setting).
  EHRLICHE EINORDNUNG: Supabase-Pro-gated (Free Tier kann nicht) -> beim Pro-Wechsel
  aktivieren.
  BINDET-AN: öffentlicher Launch / Pro-Tier. (Ersetzt den Polish-Listen-Eintrag.)
- ENCRYPTION-AT-REST CAPI-Token:
  RISIKO: DB-Dump/Backup-Leak legt die project_tokens im Klartext offen.
  TRAGENDE KONTROLLE: bleibt PRIMÄR Isolation + RLS-SELECT-Sperre + service_role-only
  (die Token sind physisch write-only, auch für den Owner nicht lesbar). Verschlüsselung
  ist DEFENSE-IN-DEPTH obendrauf, NICHT die tragende Kontrolle.
  EHRLICHE EINORDNUNG: pgcrypto mit dem Key NEBEN dem Ciphertext (in derselben DB) ist
  Theater — ein DB-Leak nimmt beides mit. Echtes Envelope braucht den KEK AUSSERHALB
  der DB (KMS). Bis dahin nicht so tun, als schütze ein In-DB-Key.
  BINDET-AN: Härtung nach Launch; kein harter Blocker, solange Isolation steht.
  (Ersetzt den Polish-Listen-Eintrag.)
- VERCEL-TOKEN maximal scoped + Domain-Mutations-AUDIT-LOG:
  RISIKO: der server-only Vercel-API-Token kann Domains am Projekt hinzufügen/löschen;
  Missbrauch/Leak ohne Spur.
  TRAGENDE KONTROLLE: Token auf das Minimum scopen + jede Domain-Mutation mit
  Actor + Zeit protokollieren.
  EHRLICHE EINORDNUNG: Real-time-Anomalie-Alarme sind ein Scale-Thema, nicht MVP —
  das nachvollziehbare Audit-Log reicht für den Start.
  BINDET-AN: 7c-2 (Vercel-Domains-API).

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- DEPENDABOT:
  RISIKO: bekannte CVEs in Dependencies bleiben unbemerkt.
  TRAGENDE KONTROLLE: Dependabot (gratis) JETZT anschalten; optional Snyk.
  EHRLICHE EINORDNUNG: Dauerhygiene, kein Launch-Gate.
  BINDET-AN: laufend.
- BACKUPS + Restore-Drill:
  RISIKO: Datenverlust ohne getesteten Wiederherstellungsweg (ein ungetestetes Backup
  ist kein Backup).
  TRAGENDE KONTROLLE: Supabase-Backup-Tier bestätigen + EINEN echten Restore-Drill
  fahren (kompletten Core-Tabellen-Drop durchspielen), danach reguläre Drills.
  EHRLICHE EINORDNUNG: der erste Drill gehört vor ernsthafte Kundendaten; die
  Wiederholung ist laufende Hygiene.
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
- DATA-RETENTION:
  RISIKO: Analytics-Rohdaten (IP/UA) horten sich unbegrenzt an -> DSGVO-Speicher-
  begrenzung verletzt.
  TRAGENDE KONTROLLE: Rohdaten (IP/UA) nach max. 30 Tagen löschen/anonymisieren.
  EHRLICHE EINORDNUNG: die Persistenz-Ebene entsteht erst in Phase 8 -> HEUTE nur
  sicherstellen, dass Server-Logs keine IPs horten.
  BINDET-AN: Phase 8 (Ingestion-Persistenz).
- MCP-SICHERHEIT:
  RISIKO: langlebiger MCP-Key mit voller Owner-Autorität in der KI-Umgebung eines
  Dritten -> geleakter Key = Vollzugriff inkl. Token-Write.
  TRAGENDE KONTROLLE: scoped Tokens (z.B. action:read_only), NIE globale Master-
  Rechte; lückenloses Audit-Logging aller KI-induzierten Mutationen.
  EHRLICHE EINORDNUNG: EXPLIZIT kein Launch-Gate (das Feature existiert vor Phase 10
  nicht); deckt sich mit dem bestehenden "Session-unabhängige Mutationen / MCP-ready"-
  Baustil.
  BINDET-AN: Phase 10.

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
  -> jetzt im SECURITY MANIFEST (Tier 0) als Launch-Blocker geführt.
- VOR öffentlichem Launch: Leaked Password Protection aktivieren — ist Pro-gated
  (Free Tier kann nicht). Beim Wechsel auf Supabase Pro (Phase 6) einschalten.
  -> jetzt im SECURITY MANIFEST (Tier 1) als Launch-Blocker geführt.
- VOR öffentlichem Launch: Next.js loggt Server-Action-Argumente im Klartext (im
  Scheibe-2a-Debug tauchte der CAPI-Token-Wert im Dev-Terminal auf). Prüfen, dass
  echte CAPI-Tokens nicht in Server-Logs landen (Prod-Logging der Action-Argumente
  unterdrücken).
  -> jetzt im SECURITY MANIFEST (Tier 0) als Launch-Blocker geführt.
- project_tokens-Verschlüsselung at rest (aktuell Plaintext; tragende Kontrolle ist
  Isolation + RLS-SELECT-Sperre). pgcrypto / KMS-Envelope als spätere Härtung.
  -> jetzt im SECURITY MANIFEST (Tier 1) als Launch-Blocker geführt.
- Phase-6-Abschlusstest nachholen: Browser+Server-Dedup im Meta-Test-Events-Tab, sobald
  eine Seite auf verknüpfter Domain (Phase 7) live ist.
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
- PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b): bereits in freier
  Wildbahn ausgelieferte Alt-Exporte tragen die absolute /api/capi-URL fest eingebacken
  und beaconen weiter dorthin. Neue Exporte/gehostete Seiten nutzen /api/e (geteilter
  Handler, lib/capi/ingest.ts). Entfernen der capi-Route bricht STILL das Tracking aller
  schon ausgelieferten Kundenseiten (kein Fehler, nur verschwundene Conversions).
- Vor neuer Phase: kurz bestätigen, dass die vorige demobar lief.
- Jede Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung (was
  genau im Browser zu prüfen ist) — nicht nur Pipeline-grün. Die Pipeline beweist
  die Logik; den Produktanspruch beweist nur der Live-Blick. Ein CLAUDE.md-
  'erledigt'-Eintrag wird erst nach bestätigtem Live-Test geschrieben.
- Session-unabhängige Mutationen (MCP-Vorbereitung, kostenlos ab jetzt): Jede neue
  Server-Mutation als REINE Funktion (userId, params) bauen — Autorisierung
  (Ownership-Prüfung) DAVOR, Geschäftslogik DAHINTER, sauber getrennt (wie setCapiToken
  es bereits fast tut). So kann die spätere MCP-Schicht (Phase 10) dieselbe geprüfte Logik
  wiederverwenden, mit MCP-Autorisierung als ANDEREM Eingang zur GLEICHEN Funktion. Kein
  jetziger Bau, nur Baustil — verbessert den Code ohnehin (Testbarkeit, Trennung von
  Auth und Logik).
- ABLEITEN STATT LÖSCHEN (projekt-spezifischer View-State): Jeder View-State, der ein
  Projekt-Attribut spiegelt (uploadError, capiTokenSet, Publish-Status/Live-URL, ...),
  muss beim Projektladen am kanonischen Chokepoint aus dem GELADENEN Projekt ABGELEITET
  werden — nicht nur bei Bedarf gelöscht. Dreimal aufgetreten (uploadError -> capiTokenSet
  -> Publish-State). "Löschen" ist die schwächere Regel: sie zeigt einen "war schon mal
  an"-Zustand (z.B. bereits publiziertes Projekt) fälschlich als aus. Ableiten aus der
  Wahrheitsquelle (settings.hosting / settings.capi.tokenSet / ...) ist korrekt für beide
  Fälle. Beim Publish-Leak zusätzlich sicherheitsrelevant: falscher "veröffentlicht"-
  Zustand könnte Ad-Budget auf die falsche URL lenken.
