# Architecture

Blog2Buzz is a single Next.js (App Router) app written in TypeScript. There is no separate backend.

## Folder structure

```
src/
  app/
    layout.tsx                Root: fonts, ⌘K command menu, toasts
    (marketing)/              Site nav + footer. Folder name in () is not part of the URL.
      page.tsx                /             Landing page
      login/                  /login        Magic-link sign in
      _components/            Landing-only pieces (front-page preview, brief example, FAQ, nav, footer)
    (app)/                    App pages under one masthead (masthead.tsx)
      explore/[[...source]]/  /explore, /explore/medium   Front page, all sources or one
      tags/[tag]/[[...source]]/  /tags/react, /tags/react/devto   One topic, all sources or one
      posts/[source]/[...slug]/             Article page + AI panel + save
      saved/                  /saved        Library (signed-in only)
    auth/callback, signout    Supabase auth route handlers
    api/generate/             POST endpoint for AI generation
  components/                 UI used by more than one route (see "Design system" below)
  lib/
    sources/                  Integrations: devto.ts (API), medium.ts (RSS). See adding-a-source.md
    actions.ts                Server actions: save and remove posts
    ai.ts                     Gemini prompts and call (server only)
    ai-types.ts               Generation types shared with the browser
    supabase/                 Supabase clients for server and browser
    topics.ts                 Topic list shown as filters
    utils.ts                  cn() and small helpers
  proxy.ts                    Protects /saved and refreshes the auth session
supabase/migrations/          Database changes (SQL)
```

**Rule of thumb:** a component used by one route lives next to that route (for example `posts/[source]/[...slug]/ai-panel.tsx`). Folders starting with `_` are private and never become URLs. Move a component to `src/components/` only when a second route needs it.

## Design system

The art direction is **"the daily edition"**: Blog2Buzz is laid out like a newspaper front page for developers.

- **Paper and ink.** Warm paper background (`bg-bg`), ink text (`text-fg`), white only for reading surfaces. One editor's red (`accent`) for ranks, focus, the active rule and saved state, and nothing else.
- **Rules, not cards.** Separate content with hairline rules (`border-border`) and heavy section rules (`border-t-2 border-fg`). No shadows except on things that float (menus, dialogs, toasts).
- **Three typefaces.** `font-display` (Newsreader) for headlines and reading text, Inter for interface, `font-mono` (JetBrains Mono) for metadata. The `kicker` utility is the small uppercase mono label above titles.
- **Numbers are edition order.** Sources are interleaved, each in its own order (DEV: most read; Medium: newest), and stories are numbered in that order. Every byline names its source.

Tokens live in `src/app/globals.css`. Shared components in `src/components/`:

| Component | Use it for |
| --- | --- |
| `buttonClass(variant, size)` | Every button and button-like link. Variants: primary (ink, one per view), secondary (outline), ghost. |
| `FrontPage`, `LeadStory`, `RankedStory`, `StoryRow` | Story layouts. `FrontPage` composes the others into lead + "Also trending" + numbered rows. |
| `PageHeader` | Kicker, serif title and standfirst at the top of app pages. |
| `TopicIndex` | The topic strip under page headers. |
| `PostMeta`, `CoverImage` | Byline (author, mono date and reading time) and cover image. Posts without a cover show no image. |
| `EmptyState` + `illustrations.tsx` | Empty, no-results and error states. |
| `QuickSave` | One-click save for story rows. |
| `toast()` / `Toaster` | Confirm a finished action. Never call it before the server confirms. |
| `Tooltip` | Labels for icon-only buttons (`align="end"` near the right edge). The button still needs `aria-label`. |
| `CommandMenu`, `SearchTrigger` | ⌘K / `/` search for topics and pages. Open from code with `openCommandMenu()`. |
| `Wordmark`, `LogoMark` | Brand. The red mono "2" is the only mark; there are no sparkles or AI icons. |

### Illustrations

All drawings live in `src/components/illustrations.tsx` and follow one system: 64 × 64 viewBox shown at 80px, 1.5px ink strokes with round caps and joins, paper fills, 2px corners, and exactly one red element that carries the meaning. Mark them `aria-hidden` (the heading next to them carries the message). Add new ones to the same file and review them at 40, 80 and 192px before shipping.

## How data flows

```
dev.to API  ─▶ lib/sources/devto.ts  ─┐
                                       ├─▶ lib/sources/index.ts ─▶ pages (Server Components)
Medium RSS  ─▶ lib/sources/medium.ts ─┘     (registry: interleave, filter by source)
```

- Pages are **Server Components**. They call `listPosts()` or `getSource(id).getPost(slug)` directly. No client-side fetching. Pages that stream on first visit (topics, articles) have a `loading.tsx` skeleton shaped like the real content.
- `listPosts({ tag, source })` takes one story from each source in turn, so DEV keeps its popularity order and Medium its newest-first order. `source` limits it to one adapter (used by `/explore/<id>`).
- Pages never import an adapter directly. They only use `lib/sources/index.ts` and the `Post` type, so adding a source does not touch any page.
- **AI generation** and **saving a post** both receive only `{ source, slug }` from the browser. The server loads the article itself, so nobody can use our Gemini key or database to process arbitrary content.

## Caching

High traffic must not mean high traffic to dev.to:

- Source adapters fetch with `next: { revalidate: 600 }`, so each API URL is requested at most once every 10 minutes.
- `/` and `/explore` are prerendered and refreshed every 10 minutes.
- Post and tag pages are rendered on first visit and then cached for 10 minutes (`revalidate` + empty `generateStaticParams`).
- Story and topic links use `prefetch={false}`. Otherwise one Explore view would prefetch ~50 uncached pages and both dev.to and Medium rate-limit us (HTTP 429). Both adapters also retry once after a 429.
- If every source fails, `listPosts()` throws so the error page shows and Next keeps serving the last good cached page, instead of caching an empty feed.
- Public pages never read cookies. That is why the masthead does not show the signed-in user: reading auth there would make every page dynamic. Only `/saved` is per-user.

## Medium specifics

Medium has no API and blocks server requests to its pages (HTTP 403), so `medium.ts` reads its official RSS feeds:

- Lists come from tag feeds (`medium.com/feed/tag/<tag>`), newest first. The front page reads a few broad developer tags.
- A post is loaded from its author's or publication's feed, which includes the full text. That is why the slug is `@author/<postId>`.
- Those feeds only hold the latest 10 stories. Older Medium posts (for example in someone's reading list) show a page linking to the original instead of a 404.
- Member-only stories can come with a shortened body, so their briefs may be shorter.
- Stories on custom domains (not `*.medium.com`) are skipped, because their feeds live on other hosts.

## Auth and database

- Supabase magic-link auth through `@supabase/ssr`.
- `src/proxy.ts` runs only on `/saved` and redirects signed-out users to `/login`.
- Saved posts live in the `blog2buzz` table: `id, user_id, source, url (the post slug), title, body, image_url`.
- In Supabase **Auth → URL Configuration**, every domain that serves the app must allow `https://<domain>/auth/callback`.

## Conventions

- TypeScript strict mode. Run `npm run typecheck` and `npm run lint` before opening a PR.
- **Props:** type them inline at the component (`{ post }: { post: Post }`). Only create a named, shared type when the same shape is reused across files **and** has more than 6 fields (like `Post`).
- **Styling:** Tailwind with the design tokens in `src/app/globals.css` (`bg-surface`, `text-muted`, `border-border`, ...). Do not hard-code hex colors in components. Use `buttonClass()` for buttons and button-like links.
- **Motion:** CSS only, no animation library. Use the tokens in `globals.css` (`animate-fade-up` for content that appears, `stroke-draw animate-draw` + `pathLength={1}` for SVG lines that draw in, `ease-(--ease-soft)` for transitions). Animate only to show a state change, keep it under ~500ms, and never show success before the server confirms it. `prefers-reduced-motion` is handled globally.
- **No extra abstraction:** no state libraries, no generic wrappers, no animation libraries. Add a dependency only when it removes real code.
- Images use plain `<img loading="lazy">`. Sources already serve resized images from their CDN.
