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

