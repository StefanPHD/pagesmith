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
- Code-Transformation serverseitig: Cheerio (ab Phase 4)
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3
- Hosting/Deploy-Orchestrierung: Vercel/Netlify API — ab Phase 6

## Roadmap & aktueller Stand
- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: Drei-Zonen-Workspace, postMessage-Klick-Brücke,
      bidirektionales Highlighting. Siehe Detail-Block unten.
- [ ] Phase 3 — Persistenz & Auth (Supabase) (NÄCHSTER SCHRITT). Projekte +
      Mappings speichern, stabile Element-IDs als Fundament. Siehe Detail-Block
      unten. Advanced Features (Consent-Gate, DTR) folgen danach.
- [ ] Phase 4 — Code-Generierung (Cheerio): Original-HTML + Mappings -> "smartes"
      Output-HTML mit injiziertem JS (Payment-Trigger, Webhook-POST, DTR-Logik).
- [ ] Phase 5 — Server-Side Tracking (CAPI): Next.js API-Route als Tracking-Proxy
      für Meta/Google.
- [ ] Phase 6 — Hosting & Go-Live: Vercel/Netlify-API, Custom Domains, SSL.
      ACHTUNG: härtester Brocken (Multi-Tenant Custom Domains + Auto-SSL).
- [ ] Phase 7 — A/B-Testing: 50/50-Split über Edge-Logik.

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
- [ ] 3.2 Datenmodell + ein Projekt speichern/laden (RLS von der ersten Zeile an)
      <- NÄCHSTER SCHRITT
- [ ] 3.3 Projekt-Liste + verwaiste Mappings sichtbar machen (C-Netz im UI)

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

## Polish-Liste (gesammelt für einen späteren, separaten Aufräum-Durchgang)
Bewusst aufgeschobene Aufräum-Arbeiten — NICHT im laufenden Feature-Schritt
miterledigen, sondern gebündelt abarbeiten.
- src/middleware.ts -> proxy.ts umbenennen: Next 16.2.9 zeigt eine
  Deprecation-Warnung für die "middleware"-Konvention (proxy ist der Nachfolger).
  Funktioniert weiter, daher unkritisch.
- src/app/layout.tsx: veraltete "Create Next App"-Metadata (title/description)
  durch echte Pagesmith-Metadata ersetzen.
- VOR öffentlichem Launch: E-Mail-Bestätigung in Supabase wieder einschalten
  (fürs MVP bewusst deaktiviert — siehe TODO in Schritt 3.1).

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
