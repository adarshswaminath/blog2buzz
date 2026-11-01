import type { Post, PostDetail, SourceAdapter } from "./types";

// Public API docs: https://developers.forem.com/api/v1
const API_URL = "https://dev.to/api";
const REVALIDATE_SECONDS = 600;

type DevToArticle = {
  title: string;
  description: string;
  path: string; // "/username/article-slug"
  url: string;
  cover_image: string | null;
  published_at: string;
  reading_time_minutes: number;
  // The list endpoint returns tag_list as an array and tags as a string.
  // The single-article endpoint returns them the other way around.
  tag_list: string[] | string;
  tags: string[] | string;
  user: { name: string; profile_image_90: string | null };
  body_markdown?: string;
};

async function request<T>(path: string): Promise<T | null> {
  const send = () =>
    fetch(`${API_URL}${path}`, {
      headers: { Accept: "application/vnd.forem.api-v1+json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

  let res = await send();
  // dev.to rate-limits bursts. Wait as asked (max 2s) and retry once.
  if (res.status === 429) {
    const waitSeconds = Math.min(Number(res.headers.get("retry-after")) || 1, 2);
    await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
    res = await send();
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`dev.to API error ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

function toPost(article: DevToArticle): Post {
  const tags = Array.isArray(article.tag_list) ? article.tag_list : article.tags;
  return {
    source: devto.id,
    slug: article.path.replace(/^\//, ""),
    title: article.title,
    description: article.description,
    url: article.url,
    coverImage: article.cover_image,
    author: { name: article.user.name, avatar: article.user.profile_image_90 },
    tags: Array.isArray(tags) ? tags : [],
    publishedAt: article.published_at,
    readingTimeMinutes: article.reading_time_minutes,
  };
}

// dev.to slugs are always "username/article-slug".
const SLUG_PATTERN = /^[\w-]+\/[\w-]+$/;

export const devto: SourceAdapter = {
  id: "devto",
  name: "DEV",
  about: "The most-read articles on DEV right now, most popular first.",

  async listPosts({ tag, limit = 30 } = {}) {
    const params = new URLSearchParams({ per_page: String(limit) });
    // dev.to tags are letters and digits only ("machine-learning" is "machinelearning").
    if (tag) params.set("tag", tag.replace(/-/g, ""));
    const articles = await request<DevToArticle[]>(`/articles?${params}`);
    return (articles ?? []).map(toPost);
  },

  async getPost(slug) {
    if (!SLUG_PATTERN.test(slug)) return null;
    const article = await request<DevToArticle>(`/articles/${slug}`);
    if (!article) return null;
    const detail: PostDetail = { ...toPost(article), content: article.body_markdown ?? "" };
    return detail;
  },

  originalUrl(slug) {
    return SLUG_PATTERN.test(slug) ? `https://dev.to/${slug}` : null;
  },
};
