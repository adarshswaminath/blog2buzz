import Link from "next/link";
import { postHref, type Post } from "@/lib/sources";
import { cn } from "@/lib/utils";
import { CoverImage } from "./cover-image";
import { PostMeta } from "./post-meta";
import { QuickSave } from "./quick-save";

/*
 * Story layouts for feeds. Ranks are real: sources return posts in popularity order.
 * Every story is one stretched link; tags and the save button sit above it (z-10).
 */

const titleLink =
  "decoration-accent decoration-1 underline-offset-[0.18em] after:absolute after:inset-0 group-hover:underline focus-visible:outline-none";

function Tags({ tags, max = 3 }: { tags: string[]; max?: number }) {
  if (!tags.length) return null;
  return (
    <ul className="relative z-10 flex flex-wrap gap-x-3 gap-y-1">
      {tags.slice(0, max).map((tag) => (
        <li key={tag}>
          <Link href={`/tags/${tag}`} prefetch={false} className="font-mono text-[11.5px] text-muted transition-colors hover:text-accent-strong">
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Mouse users see the save button on hover; touch users always see it. */
function SaveSlot({ post }: { post: Post }) {
  return (
    <div className="relative z-10 transition-opacity pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:has-focus-visible:opacity-100 pointer-fine:has-aria-pressed:opacity-100">
      <QuickSave source={post.source} slug={post.slug} title={post.title} />
    </div>
  );
}

/** The day's top story: large cover and headline. Typographic when there is no cover. */
export function LeadStory({ post, className }: { post: Post; className?: string }) {
  return (
    <article className={cn("group relative", className)}>
      <p className="kicker text-accent-strong">No. 1 {post.tags[0] && <span className="text-muted">· #{post.tags[0]}</span>}</p>
      <h2 className="mt-3 font-display text-[2.25rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[3.25rem] sm:leading-[1.04]">
        <Link href={postHref(post)} prefetch={false} className={titleLink}>
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-4 max-w-2xl font-display text-xl leading-relaxed text-pretty text-muted">{post.description}</p>
      )}
      <div className="mt-5 flex items-center justify-between gap-4">
        <PostMeta post={post} avatar />
        <SaveSlot post={post} />
      </div>
      {post.coverImage && <CoverImage src={post.coverImage} className="mt-8 aspect-[2.1/1]" />}
    </article>
  );
}

/** Compact ranked item for side columns: big numeral, headline, byline. */
export function RankedStory({ post, rank }: { post: Post; rank: number }) {
  return (
    <article className="group relative flex gap-4 border-t border-border py-5 first:border-t-0 first:pt-0">
      <span aria-hidden className="w-7 shrink-0 font-display text-[1.75rem] leading-none font-medium text-border-strong tabular-nums">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg leading-snug font-medium tracking-[-0.01em] text-balance">
          <span className="sr-only">{rank}. </span>
          <Link href={postHref(post)} prefetch={false} className={titleLink}>
            {post.title}
          </Link>
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <PostMeta post={post} />
          <SaveSlot post={post} />
        </div>
      </div>
    </article>
  );
}

/** Standard story row: rank, headline, standfirst, byline, tags, small cover. */
export function StoryRow({ post, rank }: { post: Post; rank?: number }) {
  return (
    <article className="group relative flex gap-5 border-b border-border py-6">
      {rank !== undefined && (
        <span aria-hidden className="kicker w-6 shrink-0 pt-1.5 text-accent-strong tabular-nums">
          {String(rank).padStart(2, "0")}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[1.3rem] leading-snug font-medium tracking-[-0.01em] text-balance">
          {rank !== undefined && <span className="sr-only">{rank}. </span>}
          <Link href={postHref(post)} prefetch={false} className={titleLink}>
            {post.title}
          </Link>
        </h3>
        {post.description && <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{post.description}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <PostMeta post={post} />
          <Tags tags={post.tags} />
          <div className="ml-auto">
            <SaveSlot post={post} />
          </div>
        </div>
      </div>
      {post.coverImage && (
        <CoverImage src={post.coverImage} className="hidden aspect-4/3 w-32 shrink-0 self-start sm:block" />
      )}
    </article>
  );
}

/**
 * A full front page: lead story with an "Also trending" column, then the rest
 * as numbered rows in two columns. Degrades cleanly to one column on mobile.
 */
export function FrontPage({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  const trending = rest.slice(0, 5);
  const more = rest.slice(5);
  if (!lead) return null;

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-0">
        <LeadStory post={lead} className="lg:col-span-8 lg:pr-12" />
        {trending.length > 0 && (
          <section aria-labelledby="also-trending" className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
            <h2 id="also-trending" className="kicker mb-5 border-b-2 border-fg pb-2 text-fg">
              Also trending
            </h2>
            <ol>
              {trending.map((post, i) => (
                <li key={`${post.source}:${post.slug}`}>
                  <RankedStory post={post} rank={i + 2} />
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-stories" className="mt-16">
          <h2 id="more-stories" className="kicker border-b-2 border-fg pb-2 text-fg">
            More stories
          </h2>
          <ol className="grid md:grid-cols-2 md:gap-x-12">
            {more.map((post, i) => (
              <li key={`${post.source}:${post.slug}`}>
                <StoryRow post={post} rank={i + 2 + trending.length} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

/** Same rhythm as FrontPage, shown while a page streams in. */
export function FrontPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading stories" className="grid gap-12 lg:grid-cols-12 lg:gap-0">
      <div className="lg:col-span-8 lg:pr-12">
        <div className="aspect-[1.9/1] animate-pulse rounded-sm bg-surface-hover" />
        <div className="mt-6 h-3 w-24 animate-pulse rounded-sm bg-surface-hover" />
        <div className="mt-4 h-11 w-full animate-pulse rounded-sm bg-surface-hover" />
        <div className="mt-3 h-11 w-2/3 animate-pulse rounded-sm bg-surface-hover" />
      </div>
      <div className="flex flex-col gap-6 lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-7 w-7 animate-pulse rounded-sm bg-surface-hover" />
            <div className="flex-1">
              <div className="h-5 w-full animate-pulse rounded-sm bg-surface-hover" />
              <div className="mt-2 h-5 w-3/4 animate-pulse rounded-sm bg-surface-hover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
