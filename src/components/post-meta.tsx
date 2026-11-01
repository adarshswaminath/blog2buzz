import { getSource, type Post } from "@/lib/sources";
import { cn, formatDate } from "@/lib/utils";

/** Byline: author in the interface face; date, reading time and source set in mono. */
export function PostMeta({ post, avatar = false, className }: { post: Post; avatar?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]", className)}>
      {avatar && post.author.avatar && (
        <img src={post.author.avatar} alt="" loading="lazy" className="size-6 rounded-full bg-surface-hover" />
      )}
      <span className="font-medium text-fg">{post.author.name}</span>
      <span className="font-mono text-[11.5px] text-muted">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        {post.readingTimeMinutes ? <> · {post.readingTimeMinutes} min</> : null}
        {" · "}
        <span className="text-fg">{getSource(post.source)?.name ?? post.source}</span>
      </span>
    </div>
  );
}
