# Adding a new source

Each integration is an **adapter**: one file that converts a platform's data into our `Post` shape. The rest of the app (front page, source filter, topics, post page, AI briefs, saved posts) works automatically.

There are two real adapters to learn from:

| Adapter | How it reads the platform | Good example of |
| --- | --- | --- |
| [`devto.ts`](../src/lib/sources/devto.ts) | Public JSON API | The simple case: one request per list, one per post |
| [`medium.ts`](../src/lib/sources/medium.ts) | RSS feeds (no API, pages block servers) | Parsing XML, a composite slug, and documenting platform limits |

The contract lives in [`src/lib/sources/types.ts`](../src/lib/sources/types.ts):

```ts
interface SourceAdapter {
  id: string;     // used in URLs and the database, e.g. "hashnode". Never change it.
  name: string;   // shown in the UI, e.g. "Hashnode"
  about: string;  // one true sentence for the source's page, e.g. "The newest stories on Hashnode."
  listPosts(options?: { tag?: string; limit?: number }): Promise<Post[]>;
  getPost(slug: string): Promise<PostDetail | null>;
  originalUrl(slug: string): string | null; // link to the original, from the slug alone
}
```

## Steps

### 1. Find a reliable way to read the platform

In this order: an official API, then official RSS/Atom feeds, and only then anything else. Test it from Node (`node -e "fetch(url).then(r => console.log(r.status))"`) before writing code. Many sites block server requests (Medium returns 403 for pages but 200 for feeds).

### 2. Create the adapter

Create `src/lib/sources/<id>.ts`. Start from `devto.ts` (JSON) or `medium.ts` (feeds):

- Describe the response with a small local type. Include only the fields you use.
- Write a `toPost()` that maps one item to a `Post`. Return posts in the platform's own order: most popular if it has a ranking, otherwise newest first. Say which one in `about`.
- Fetch with `next: { revalidate: 600 }` so responses are cached, and retry once on HTTP 429 (copy the `send()` pattern).
- `getPost` returns `null` when the post cannot be loaded. The post page then offers a link to `originalUrl(slug)`.
- Validate the slug with a regex before putting it in a URL, in `getPost` and `originalUrl`.
- `tag` arrives in our format (lowercase, may contain `-`). Map it to the platform's format (dev.to drops hyphens; Medium has a few aliases).
- If the platform has limits, write them in a comment at the top of the file, like `medium.ts` does.

### 3. Pick a slug format

The slug is whatever you need to load one post again later. It ends up in our URL as `/posts/<id>/<slug>` and can contain `/`.

| Source | slug | Why |
| --- | --- | --- |
| DEV | `username/article-slug` | The API loads a post by this path |
| Medium | `@author/18f316d9a5bb` or `publication/18f316d9a5bb` | The author or publication feed has the full text; the id finds the story in it |

Once a source is live, **never change its `id` or slug format**. Saved posts in the database store both.

### 4. Register it

Add it to the list in [`src/lib/sources/index.ts`](../src/lib/sources/index.ts):

```ts
const sources: SourceAdapter[] = [devto, medium, hashnode];
```

That is all the UI needs:

- The front page and topic pages interleave every source, one story from each in turn, so each keeps its own order.
- The "All sources · DEV · Medium · …" tabs and the `/explore/<id>` and `/tags/<tag>/<id>` pages appear automatically.
- Every byline shows the source name.
- If one source fails, it is logged and skipped; the others still show.

### 5. Secrets (if the platform needs a key)

Read it from `process.env.<NAME>` inside the adapter, add `<NAME>=` to `.env.local.example`, and set it in Vercel. Never prefix it with `NEXT_PUBLIC_`.

### 6. Check it

```bash
npm run typecheck && npm run lint
npm run dev
```

Open `/explore`, `/explore/<id>`, `/tags/javascript/<id>` and one of the new source's posts. Generate a summary (the AI reads `content`), save the post, and open a post with a made-up id to see the fallback page.

## Tips

- `content` (Markdown or plain text) is what the AI reads. If the platform only gives HTML, convert it to text first (see `htmlToText` in `medium.ts`).
- Prefer `null` fields (`coverImage`, `readingTimeMinutes`) over invented values. The UI handles missing data.
- Keep the adapter one file. If it grows past ~200 lines, the platform is probably too hard to read reliably.
