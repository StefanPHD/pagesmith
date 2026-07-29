# Pagesmith

**Make your AI-generated landing page code actually do something.**

Performance marketers use tools like Claude, v0 and Bolt to generate beautiful
landing pages in seconds — but the exported code is *mute*. The buttons look
great and do nothing, the forms submit nowhere, there's no tracking. Pagesmith
turns that static HTML into a functional, revenue-ready page: import the code,
wire buttons and forms to real actions, rewrite the copy in place, add
server-side tracking, then export or host it — no CMS, no WordPress bloat. It's
built for performance marketers in the DACH region and beyond who ship new pages
constantly and need them working in minutes.

> ⚠️ **Status: built in public, not finished.** The core editor, server-side
> tracking (client + server, deduplicated) and serving a published page — on an
> isolated subdomain or on your own custom domain with automatic SSL — all work
> today. Broader public/production launch hardening (abuse tooling, wider rate
> limiting, compliance groundwork) is still in progress — see the roadmap. This is
> a solo passion project developed openly.

---

## Features

### Works today

- **Import HTML** by pasting it or uploading / dragging in a `.html` file.
- **Element detection** — the scanner surfaces every interactive element
  (buttons, forms, links) and editable text element (`<p>`, `<h1>`–`<h6>`), with
  live counts and a category filter.
- **Click & Connect** — select an element (in the sandboxed preview or the list)
  and wire it to a redirect action: a Stripe or PayPal checkout link, or any
  generic link, opening in the same or a new tab.
- **In-place copywriting** — override headline and paragraph text directly for
  fast A/B tests on wording; the change shows live in the preview.
- **Orphaned-mapping safety net** — if a wired element disappears from the code,
  its action is surfaced as "orphaned" rather than silently dropped; you can
  delete it or re-link it to a current element.
- **Functional preview + HTML export** — a separate preview renders the wired
  page so the buttons actually fire, and you can export the functional HTML
  (download as `.html` or copy to clipboard).
- **Accounts & projects** — email/password login, with your projects saved per
  account and isolated from other users; create, switch, rename and delete
  projects, with a guard that protects unsaved changes.
- **Server-side tracking** — Meta Pixel plus the Conversions API, fired from the
  server for resilience against ad blockers and lost browser events. Events are
  consent-capable and deduplicated between the browser and server (shared event
  ID), following Meta's recommended setup.
- **Hosting** — publish a project and serve it as a real, functional page,
  either on its own isolated subdomain or your own custom domain with
  automatic SSL and guided DNS setup.
- First-party (same-origin) tracking on hosted pages, for full ad-blocker
  resilience — deduplicated between browser and server events.
- **Server-side analytics** — every event a hosted page produces (page views and
  conversions) is recorded server-side and shown per project, isolated per
  account.
- **Ad-blocker loss rate** — the share of conversions that only the server saw,
  measured by comparing *real* events that carry the same event ID, not
  estimated.
- **Kill switch** — an operator-side block that takes a project off the air
  immediately and stops its event ingestion.
- **A/B variants** — a project can carry a second variant with its own content
  and its own wired actions, published alongside the first.
- **A/B traffic split** — visitors are split evenly across both variants in the
  serving layer and stay on their variant for the visit; each recorded event
  carries the variant it belongs to.

### In progress / planned

- A/B testing: the split and the per-variant data collection are live; the
  **per-variant evaluation** (conversion rate of A vs. B in the dashboard) is
  still to come.
- Multi-page funnels (landing → checkout → thank-you, one project).
- An AI-native MCP server so a marketer's AI tools can manage projects directly
  (longer-term vision).

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS
- Native `DOMParser` for in-browser element detection and code transformation
  (zero dependencies)
- [Supabase](https://supabase.com/) — Postgres and authentication
- [Vitest](https://vitest.dev/) for unit and component tests
- The Vercel API for custom domains in the serving layer (live)
- No server-side HTML parser: server-side injection is a deliberate plain-string
  operation, so the serving path stays dependency-free

---

## Status & roadmap

Server-side tracking, first-party ingestion, custom domain hosting (with
automatic SSL) and server-side analytics are complete. A/B testing is partly
there: the traffic split runs and every event carries its variant — the
per-variant evaluation is what's left.

- [x] **Phase 1 — Local-first foundation:** import, sandboxed preview, element
      detection.
- [x] **Phase 2 — Click & Connect:** three-zone workspace with a preview click
      bridge and bidirectional preview/list highlighting.
- [x] **Phase 3 — Persistence & auth:** email/password login, stable element IDs,
      multi-project save and auto-load.
- [x] **Click & Connect actions:** assign, configure and save redirect actions,
      plus surfacing and re-linking orphaned mappings.
- [x] **Phase 4 — Code generation + HTML export:** bake the mappings into
      functional HTML and export it (download or copy).
- [x] **Phase 4.5 — Editor polish:** `.html` upload / drag-and-drop and a zen
      mode that keeps the focus on the preview and element list.
- [x] **Phase 5 — In-place copywriting:** edit paragraph and heading text
      directly, live in the preview and in the export.
- [x] **Phase 6 — Server-side tracking:** Meta Pixel + Conversions API,
      consent-capable and deduplicated.
- [x] **Phase 7 — Hosting & go-live:** serving published pages on an isolated
      subdomain, custom domains with automatic SSL, guided DNS status UX and
      same-origin first-party tracking are all live.
- [x] **Phase 8 — Analytics:** server-side event recording per project, a
      per-account statistics view, and the ad-blocker loss rate measured from
      real events sharing an event ID.
- [ ] **Phase 9 — A/B testing:** authoring a second variant and the even traffic
      split are live, and every recorded event carries its variant; the
      per-variant evaluation is still open.
- [ ] **Beyond:** multi-page funnels and an AI-native MCP server.

---

## Getting started

Requires **Node.js** (developed on v24) and a [Supabase](https://supabase.com/)
project. Copy the example environment file and fill in your Supabase values:

```bash
cp .env.local.example .env.local
# then edit .env.local
```

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The editor sits behind a
login — create an account, then paste or upload some HTML.

```bash
# run the tests
npm test
```

---

## Built in public

This is a solo passion project, developed openly. The commit history is the
honest development record — including the edge-cases, corrections and dead-ends
along the way. Issues, ideas and feedback are welcome.
