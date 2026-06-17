# Pagesmith

**Make your AI-generated landing page code actually do something.**

Performance marketers use tools like Claude, v0 and Bolt to design beautiful
landing pages in seconds. The problem: the exported code is *mute* — pure
HTML/CSS/JS with no working forms, no checkout, no tracking. The moment you try
to wire it up or host it, things break.

Pagesmith is a lean hosting & integration layer that turns that static code into
a functional, revenue-ready page — without the WordPress bloat.

> ⚠️ **Status: early — built in public.** Phase 3 (auth + project persistence)
> is live: you can create an account, log in, and your pasted code is saved per
> account and reloaded automatically. The Click & Connect workspace lets you
> select elements in the preview. The actions themselves (Stripe, PayPal,
> webhooks, tracking, hosting) don't fire yet — those are still planned. Follow
> along as it grows.

---

## The idea

The intended workflow for a marketer:

1. **Paste** raw HTML/CSS/JS (e.g. exported from Claude) into the app.
2. **Detect** — the app scans the code and surfaces every `<button>`, `<form>`
   and link.
3. **Click & Connect** — click a detected element and assign it an action
   (Stripe / PayPal checkout, send form data to a webhook, fire a Meta/Google
   event).
4. **Go live** — host the page on your own domain with one click.

The differentiators we're building toward: ultra-fast load times (plain HTML, no
CMS overhead), server-side tracking (CAPI) to survive ad blockers, and
lightweight client-side A/B testing.

---

## What works today (Phases 1–3)

- User accounts: sign up and log in with email + password. The entire editor
  sits behind a login.
- Project persistence: your pasted code can be saved per account and is loaded
  automatically when you open the editor. Each account only sees its own data.
- Stable element IDs: linkable elements receive durable, code-resident IDs that
  are written into the saved code.
- Paste raw HTML into the editor.
- Sandboxed live preview (`<iframe sandbox>`).
- Detection of buttons, forms and links, with live counts.
- Hardened scanner: debounced parsing (typing stays instant on large pages),
  SSR-safe, defensive error handling, and per-element de-duplication
  (`<a role="button">` is counted once as a button, never double-counted as a
  link). Covered by unit tests against a real-world landing-page fixture.
- Three-zone workspace: a collapsible code panel, the live preview in the
  centre, and an action panel on the right.
- Click an element directly in the sandboxed preview to select it — a
  `postMessage` click bridge reports the click back to the app (inline
  `onclick`/`onsubmit` from the pasted code are neutralised so they can't fire).
- Bidirectional highlighting between the preview and the element list, kept in
  sync from a single source of truth: selecting in either place outlines the
  element in the preview and highlights its entry in the list, and scrolls it
  into view.

> The action panel currently only displays the selected element. **Assigning
> and firing actions** (Stripe, PayPal, webhooks, tracking) and **hosting** are
> not implemented yet — see the roadmap.

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS
- Native `DOMParser` for in-browser detection (zero dependencies)
- [Supabase](https://supabase.com/) for auth and persistence (Postgres with
  row-level security)
- Vitest + jsdom for unit tests
- *Planned:* Cheerio (server-side code transformation), Vercel/Netlify API
  (hosting & custom domains)

---

## Getting started

Requires **Node.js** (developed on v24) and a Supabase project. Put your project
URL and anon key in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The editor is behind a
login — create an account, then paste some HTML into the editor.

```bash
# run the tests
npm test
```

---

## Roadmap

- [x] **Phase 1 — Local-first foundation:** import, sandboxed preview, element
      detection. (done & hardened)
- [x] **Phase 2 — Click & Connect:** select an element in the live preview via a
      three-zone workspace with bidirectional preview/list highlighting.
      (Selection UI done; assigning actions comes in later phases.)
- [x] **Phase 3 — Persistence & auth:** email/password auth behind a login gate,
      stable element IDs, and per-account project save/auto-load with row-level
      security (Supabase). (Still open within this phase: project list, surfacing
      orphaned mappings, consent-gating, dynamic text replacement.)
- [ ] **Phase 4 — Code generation:** original HTML + mappings → "smart" output
      HTML with injected logic (Cheerio).
- [ ] **Phase 5 — Server-side tracking:** CAPI proxy for Meta/Google.
- [ ] **Phase 6 — Hosting & go-live:** custom domains + automatic SSL.
- [ ] **Phase 7 — A/B testing:** 50/50 traffic split across variants.

---

## Built in public

This is a solo passion project, developed openly. Issues, ideas and feedback are
welcome. Follow the commit history to see how it's built — including the
edge-cases and dead-ends.
