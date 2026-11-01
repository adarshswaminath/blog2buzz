import { XMLParser } from "fast-xml-parser";
import type { Post, PostDetail, SourceAdapter } from "./types";

/*
 * Medium has no public API, and its web pages block servers (Cloudflare returns 403).
 * It does publish RSS feeds, which is what we use:
 *
 *   https://medium.com/feed/tag/<tag>         latest stories for a tag: title, snippet, cover. No body.
 *   https://medium.com/feed/@<user>           an author's latest 10 stories, with the full HTML body
 *   https://medium.com/feed/<publication>     a publication's latest 10 stories, with the full HTML body
 *
 * Lists come from tag feeds. A single post is loaded from its author's (or publication's) feed,
 * so our slug is "<feed>/<postId>", e.g. "@jane/18f316d9a5bb" or "better-programming/c9d68bbb29c1".
 *
 * Known limits, by design of the feeds:
 *  - Tag feeds are newest first. Medium does not expose a popularity ranking.
 *  - Only an author's latest 10 stories can be opened here; older ones link out to Medium.
 *  - Member-only stories may come with a shortened body.
 *  - Stories on custom domains (not *.medium.com) are skipped: their feeds live elsewhere.
 */

const FEED_URL = "https://medium.com/feed";
const REVALIDATE_SECONDS = 600;

/** Medium has no "all stories" feed, so the front page reads a few broad developer tags. */
const FRONT_PAGE_TAGS = ["programming", "software-engineering", "artificial-intelligence"];

/** Our topics are compact like dev.to tags. These are spelled differently on Medium. */
const TAG_ALIASES: Record<string, string> = {
  machinelearning: "machine-learning",
  webdev: "web-development",
  opensource: "open-source",
  datascience: "data-science",
};

/** "@user/18f316d9a5bb" or "publication-name/18f316d9a5bb" */
const SLUG_PATTERN = /^(@[\w.-]+|[\w-]+)\/[0-9a-f]{8,16}$/;

type FeedItem = {
  title: string;
  link: string;
  guid: string; // "https://medium.com/p/<postId>"
  "dc:creator"?: string;
  pubDate: string;
  category?: string[];
  description?: string; // tag feeds: cover image + snippet
  "content:encoded"?: string; // author and publication feeds: the full body
};

const parser = new XMLParser({
  ignoreAttributes: true,
  isArray: (name) => name === "item" || name === "category",
});

async function fetchFeed(path: string): Promise<FeedItem[]> {
  const send = () => fetch(`${FEED_URL}/${path}`, { next: { revalidate: REVALIDATE_SECONDS } });

  let res = await send();
  // Medium rate-limits bursts. Wait as asked (max 2s) and retry once.
  if (res.status === 429) {
    const waitSeconds = Math.min(Number(res.headers.get("retry-after")) || 1, 2);
    await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
    res = await send();
  }
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Medium feed error ${res.status} for ${path}`);
  const feed = parser.parse(await res.text());
  return feed?.rss?.channel?.item ?? [];
}

function decodeEntities(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&(#39|apos);/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** Article HTML to plain text with paragraph breaks. Good enough for snippets and AI input. */
function htmlToText(html: string) {
  return decodeEntities(
    html
      .replace(/<(figcaption|figure)[^>]*>[\s\S]*?<\/\1>/gi, "")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<\/(p|h\d|li|blockquote|pre)>|<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

function firstImage(html = "") {
  const src = /<img[^>]+src="([^"]+)"/i.exec(html)?.[1];
  return src && !src.includes("/_/stat") ? src : null; // skip Medium's tracking pixel
}

function shorten(text: string, max = 220) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max))}…`;
}

/** Builds our slug from a story link, or null for links we cannot open later (custom domains). */
function toSlug(link: string, guid: string) {
  const id = guid.split("/p/")[1];
  if (!id) return null;
  const { hostname, pathname } = new URL(link);
  if (hostname === "medium.com") {
    const feed = decodeURIComponent(pathname.split("/")[1] ?? "");
    return feed && feed !== "p" ? `${feed}/${id}` : null;
  }
  if (hostname.endsWith(".medium.com")) return `@${hostname.replace(".medium.com", "")}/${id}`;
  return null;
}

function toPost(item: FeedItem): Post | null {
  const slug = toSlug(item.link, item.guid);
  if (!slug) return null;
  const body = item["content:encoded"];
  const snippet = /<p class="medium-feed-snippet">([\s\S]*?)<\/p>/.exec(item.description ?? "")?.[1];
  const text = body ? htmlToText(body) : "";

  return {
    source: medium.id,
    slug,
    title: decodeEntities(item.title),
    description: snippet ? htmlToText(snippet) : shorten(text.split("\n\n")[0] ?? ""),
    url: item.link.split("?")[0],
    coverImage: firstImage(item.description) ?? firstImage(body),
    author: { name: item["dc:creator"] ?? "Medium writer", avatar: null },
    tags: item.category ?? [],
    publishedAt: new Date(item.pubDate).toISOString(),
    // Only known when we have the body (about 230 words a minute).
    readingTimeMinutes: text ? Math.max(1, Math.round(text.split(/\s+/).length / 230)) : null,
  };
}

export const medium: SourceAdapter = {
  id: "medium",
  name: "Medium",
  about: "The newest developer stories on Medium, latest first.",

  async listPosts({ tag, limit = 30 } = {}) {
    const tags = tag ? [TAG_ALIASES[tag] ?? tag] : FRONT_PAGE_TAGS;
    const feeds = await Promise.all(tags.map((t) => fetchFeed(`tag/${encodeURIComponent(t)}`)));

    // The same story can appear under several front-page tags.
    const seen = new Set<string>();
    const posts = feeds
      .flat()
      .map(toPost)
      .filter((post): post is Post => post !== null && !seen.has(post.slug) && !!seen.add(post.slug));

    posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    return posts.slice(0, limit);
  },

  async getPost(slug) {
    if (!SLUG_PATTERN.test(slug)) return null;
    const [feed, id] = slug.split("/");
    // Safe to put in the URL as-is: SLUG_PATTERN only allows letters, digits, "@", ".", "_" and "-".
    const item = (await fetchFeed(feed)).find((i) => i.guid.endsWith(`/p/${id}`));
    const post = item && toPost(item);
    if (!item || !post) return null;
    const detail: PostDetail = { ...post, content: htmlToText(item["content:encoded"] ?? "") };
    return detail;
  },

  originalUrl(slug) {
    // Medium redirects /p/<id> to the story wherever it lives.
    return SLUG_PATTERN.test(slug) ? `https://medium.com/p/${slug.split("/")[1]}` : null;
  },
};
