import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { PostMeta } from "@/components/post-meta";
import { RankedStory } from "@/components/stories";
import { listSources, postHref, type Post } from "@/lib/sources";

/** Today's real front page, shortened: the lead story and the next three. Every item is a working link. */
export function FrontPagePreview({ posts }: { posts: Post[] }) {
  const sources = listSources().map((s) => s.name).join(" + ");
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <div>
      <h2 className="kicker flex items-center justify-between border-b-2 border-fg pb-2">
        <span>On the front page</span>
        <span className="text-muted">{sources}</span>
      </h2>

      <article className="group relative border-b border-border py-6">
        {lead.coverImage && <CoverImage src={lead.coverImage} className="mb-5 aspect-[2.1/1]" />}
        <p className="kicker text-accent-strong">No. 1</p>
        <h3 className="mt-2 font-display text-[1.75rem] leading-[1.1] font-medium tracking-[-0.02em] text-balance">
          <Link
            href={postHref(lead)}
            prefetch={false}
            className="decoration-accent decoration-1 underline-offset-[0.18em] after:absolute after:inset-0 group-hover:underline focus-visible:outline-none"
          >
            {lead.title}
          </Link>
        </h3>
        <PostMeta post={lead} className="mt-3" />
      </article>

      <ol className="pt-6">
        {rest.map((post, i) => (
          <li key={`${post.source}:${post.slug}`}>
            <RankedStory post={post} rank={i + 2} />
          </li>
        ))}
      </ol>
    </div>
  );
}
