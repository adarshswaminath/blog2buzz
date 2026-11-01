import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClass } from "@/components/button";
import { CoverImage } from "@/components/cover-image";
import { EmptyState } from "@/components/empty-state";
import { MissingPageIllustration } from "@/components/illustrations";
import { PostMeta } from "@/components/post-meta";
import { StoryRow } from "@/components/stories";
import { getSource, listPosts } from "@/lib/sources";
import { AiPanel } from "./ai-panel";
import { CopyLinkButton } from "./copy-link-button";
import { SaveButton } from "./save-button";

type Props = { params: Promise<{ source: string; slug: string[] }> };

// Render each post on its first visit, then serve it from cache for 10 minutes.
export const revalidate = 600;
export function generateStaticParams() {
  return [];
}

async function loadPost(params: Props["params"]) {
  const { source: sourceId, slug: segments } = await params;
  const slug = segments.map(decodeURIComponent).join("/"); // "@user/…" arrives encoded
  const source = getSource(sourceId);
  const originalUrl = source?.originalUrl(slug);
  if (!source || !originalUrl) notFound();
  const post = await source.getPost(slug);
  return { source, post, originalUrl };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { source, post } = await loadPost(params);
  if (!post) return { title: `Story on ${source.name}`, robots: { index: false } };
  return {
    title: post.title,
    description: post.description,
    openGraph: { images: post.coverImage ? [post.coverImage] : [] },
  };
}

export default async function PostPage({ params }: Props) {
  const { source, post, originalUrl } = await loadPost(params);

  // The slug is valid but the source can no longer give us the story (deleted, or for Medium:
  // no longer among the author's latest 10). Send readers to the original instead of a dead end.
  if (!post) {
    return (
      <div className="container max-w-[46rem]">
        <EmptyState
          illustration={<MissingPageIllustration />}
          title={`This story is no longer available here`}
          description={`${source.name} no longer lists it in the feed we read. It may still be on ${source.name}.`}
        >
          <a href={originalUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md")}>
            Open on {source.name} <ArrowUpRight strokeWidth={1.75} className="size-4" />
          </a>
          <Link href="/explore" className={buttonClass("secondary", "md")}>
            Today&rsquo;s edition
          </Link>
        </EmptyState>
      </div>
    );
  }

  const topic = post.tags[0];
  // Related posts come from the same source, and are optional: if they fail, the article still renders.
  const related = topic
    ? await listPosts({ tag: topic, source: post.source, limit: 5 })
        .then((posts) => posts.filter((p) => p.slug !== post.slug).slice(0, 3))
        .catch(() => [])
    : [];

  return (
    <div className="container max-w-[46rem]">
      <article className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="kicker flex items-center gap-2 text-muted">
          <Link href="/explore" className="transition-colors hover:text-fg">
            Today&rsquo;s edition
          </Link>
          {topic && (
            <>
              <span aria-hidden>/</span>
              <Link href={`/tags/${topic}`} prefetch={false} className="transition-colors hover:text-fg">
                #{topic}
              </Link>
            </>
          )}
        </nav>

        <h1 className="mt-6 font-display text-[2.5rem] leading-[1.03] font-medium tracking-[-0.03em] text-balance sm:text-[3.5rem]">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 font-display text-[1.3rem] leading-relaxed text-pretty text-muted">{post.description}</p>
        )}

        <div className="mt-8 flex flex-col gap-4 border-y border-fg/90 py-4 sm:flex-row sm:items-center sm:justify-between">
          <PostMeta post={post} avatar />
          <div className="flex items-center gap-1">
            <SaveButton source={post.source} slug={post.slug} />
            <CopyLinkButton url={post.url} />
            <a href={post.url} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "sm", "ml-2")}>
              Read on {source.name} <ArrowUpRight strokeWidth={1.75} className="size-3.5" />
            </a>
          </div>
        </div>

        {post.coverImage && <CoverImage src={post.coverImage} className="mt-8 aspect-[2.1/1]" />}

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/tags/${tag}`} prefetch={false} className="font-mono text-[12px] text-muted transition-colors hover:text-accent-strong">
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="text-[13px] text-subtle">Full article on {source.name}, by its author.</p>
        </div>
      </article>

      <div className="mt-16">
        <AiPanel source={post.source} slug={post.slug} url={post.url} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-20">
          <h2 id="related" className="kicker border-b-2 border-fg pb-2">
            More on #{topic}
          </h2>
          <ol>
            {related.map((p) => (
              <li key={`${p.source}:${p.slug}`}>
                <StoryRow post={p} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
