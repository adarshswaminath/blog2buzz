import { devto } from "./devto";
import { medium } from "./medium";
import type { ListOptions, Post, SourceAdapter } from "./types";

export type { Post, PostDetail, SourceAdapter } from "./types";

/**
 * All enabled integrations, in the order they appear in the UI. To add one, create an
 * adapter file next to devto.ts and add it here. See docs/adding-a-source.md.
 */
const sources: SourceAdapter[] = [devto, medium];

export function getSource(id: string): SourceAdapter | undefined {
  return sources.find((source) => source.id === id);
}

/** Id and display name of every source, for filters and labels. */
export function listSources() {
  return sources.map(({ id, name, about }) => ({ id, name, about }));
}

/** Takes one post from each list in turn, so every source keeps its own order (popular, newest...). */
function interleave(lists: Post[][]) {
  const merged: Post[] = [];
  const longest = Math.max(0, ...lists.map((list) => list.length));
  for (let i = 0; i < longest; i++) {
    for (const list of lists) if (list[i]) merged.push(list[i]);
  }
  return merged;
}

/**
 * Posts from every source (or just `options.source`), interleaved. A failing source is
 * skipped (and logged) so one broken integration never takes the feed down.
 * Throws only when every requested source fails.
 */
export async function listPosts(options?: ListOptions): Promise<Post[]> {
  const selected = options?.source ? sources.filter((s) => s.id === options.source) : sources;
  const results = await Promise.allSettled(selected.map((source) => source.listPosts(options)));

  const lists = results.map((result, i) => {
    if (result.status === "fulfilled") return result.value;
    console.error(`[sources] ${selected[i].id} failed:`, result.reason);
    return [];
  });

  // If every source failed, surface the error instead of showing (and caching) an empty feed.
  if (results.length > 0 && results.every((result) => result.status === "rejected")) {
    throw new Error("All sources failed to load posts");
  }

  const posts = interleave(lists);
  return options?.limit ? posts.slice(0, options.limit) : posts;
}

export function postHref(post: Pick<Post, "source" | "slug">) {
  return `/posts/${post.source}/${post.slug}`;
}
