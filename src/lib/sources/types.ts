/**
 * Every integration (dev.to, Hashnode, Medium, ...) converts its own API
 * response into these shapes. The rest of the app only knows about these
 * types, never about a specific source.
 */

export type Post = {
  /** Which adapter this post came from, e.g. "devto". */
  source: string;
  /** Source-specific identifier used in our URL: /posts/{source}/{slug}. May contain "/". */
  slug: string;
  title: string;
  description: string;
  /** Link to the original article on the source website. */
  url: string;
  coverImage: string | null;
  author: {
    name: string;
    avatar: string | null;
  };
  tags: string[];
  /** ISO 8601 date string. */
  publishedAt: string;
  readingTimeMinutes: number | null;
};

export type PostDetail = Post & {
  /** Full article body as Markdown or plain text. Used as AI input. */
  content: string;
};

export type ListOptions = {
  /** Only return posts with this tag (lowercase, may contain "-", no "#"). Each adapter maps it to its platform's tag format. */
  tag?: string;
  limit?: number;
  /** Only ask this source (adapter id). Used by the registry, adapters can ignore it. */
  source?: string;
};

export interface SourceAdapter {
  /** Stable id used in URLs and the database. Never change it once live. */
  id: string;
  /** Human-readable name shown in the UI, e.g. "DEV". */
  name: string;
  /** One sentence shown on the source's page, e.g. "The most-read articles on DEV right now." Must be true. */
  about: string;
  /** Posts in the source's own order (most popular, or newest if the source has no ranking). */
  listPosts(options?: ListOptions): Promise<Post[]>;
  /** Returns null when the post does not exist or can no longer be loaded. */
  getPost(slug: string): Promise<PostDetail | null>;
  /** Link to the original post, built from the slug alone. Null if the slug is invalid. */
  originalUrl(slug: string): string | null;
}
