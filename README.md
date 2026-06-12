# Pagesmith

**Make your AI-generated landing page code actually do something.**

Performance marketers use tools like Claude, v0 and Bolt to design beautiful
landing pages in seconds. The problem: the exported code is *mute* — pure
HTML/CSS/JS with no working forms, no checkout, no tracking. The moment you try
to wire it up or host it, things break.

Pagesmith is a lean hosting & integration layer that turns that static code into
a functional, revenue-ready page — without the WordPress bloat.

> ⚠️ **Status: early — built in public.** Phase 1 (the HTML scanner & live
> preview) is done and hardened. Everything below "Roadmap" is planned, not yet
> built. Follow along as it grows.

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

## What works today (Phase 1)

- Paste raw HTML into the editor.
- Sandboxed live preview (`<iframe sandbox>`).
- Detection of buttons, forms and links, with live counts.
- Hardened scanner: debounced parsing (typing stays instant on large pages),
  SSR-safe, defensive error handling, and per-element de-duplication
  (`<a role="button">` is counted once as a button, never double-counted as a
  link). Covered by unit tests against a real-world landing-page fixture.

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS
- Native `DOMParser` for in-browser detection (zero dependencies)
- Vitest + jsdom for unit tests
- *Planned:* Cheerio (server-side code transformation), Supabase (persistence &
  auth), Vercel/Netlify API (hosting & custom domains)

---

## Getting started

Requires **Node.js** (developed on v24).

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and paste some HTML
into the editor.

```bash
# run the tests
npm test
```

---

## Roadmap

- [x] **Phase 1 — Local-first foundation:** import, sandboxed preview, element
      detection. (done & hardened)
- [ ] **Phase 2 — Click & Connect:** select an element in the live preview and
      assign it an action via a workspace panel.
- [ ] **Phase 3 — Persistence & auth:** save projects and mappings (Supabase).
      Plus consent-gating and dynamic text replacement.
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
