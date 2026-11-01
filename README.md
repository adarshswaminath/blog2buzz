# Blog2Buzz

Developer stories from DEV and Medium, with AI summaries, posts for X and Medium drafts in seconds.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Supabase (auth + saved posts) · Gemini · PostHog

## Getting started

Requires Node.js 20.9 or later.

```bash
git clone https://github.com/adarshswaminath/blog2buzz
cd blog2buzz
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev                        # http://localhost:3000
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_GEMINI_KEY` | yes | Gemini API key for AI generation |
| `GEMINI_MODEL` | no | Model override (default `gemini-flash-latest`) |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | yes | Supabase anon key |
| `NEXT_PUBLIC_POSTHOG_KEY` / `_HOST` | no | Analytics |

Apply the SQL files in `supabase/migrations/` to your Supabase project (SQL editor or `supabase db push`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Documentation

- [Architecture](docs/architecture.md): folder structure, data flow, caching, conventions
- [Adding a new source](docs/adding-a-source.md): add an integration such as Hashnode or Medium

## Contributing

1. Read [docs/architecture.md](docs/architecture.md).
2. Create a branch, make your change, and run `npm run typecheck && npm run lint`.
3. Open a pull request.
