"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { buttonClass } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { EmptyListIllustration, InterruptedPageIllustration } from "@/components/illustrations";
import { toast } from "@/components/toast";
import { removePost } from "@/lib/actions";
import { cn } from "@/lib/utils";

export type SavedPost = {
  id: number;
  source: string;
  url: string; // the post slug
  title: string;
  body: string | null;
  image_url: string | null;
  sourceName: string;
};

export function SavedList({ posts, loadFailed }: { posts: SavedPost[]; loadFailed: boolean }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const visible = q ? posts.filter((p) => `${p.title} ${p.body ?? ""}`.toLowerCase().includes(q)) : posts;

  if (loadFailed) {
    return (
      <EmptyState
        illustration={<InterruptedPageIllustration />}
        title="We could not load your reading list"
        description="Something went wrong on our side. Refresh the page to try again."
      />
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        illustration={<EmptyListIllustration />}
        title="Nothing saved yet"
        description="Use the bookmark on any story, or Save on an article page, and it will wait for you here."
      >
        <Link href="/explore" className={buttonClass("primary", "sm")}>
          Open today&rsquo;s edition
        </Link>
      </EmptyState>
    );
  }

  return (
    <div>
      {posts.length > 4 && (
        <div className="relative border-b border-border">
          <Search strokeWidth={1.75} className="pointer-events-none absolute top-1/2 left-0 size-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by title or description"
            aria-label="Filter your reading list"
            className="h-12 w-full bg-transparent pr-2 pl-7 text-[15px] placeholder:text-subtle focus:outline-none"
          />
        </div>
      )}

      {visible.length === 0 ? (
        <p role="status" className="py-12 text-[15px] text-muted">
          Nothing in your reading list matches &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ol>
          {visible.map((post) => (
            <SavedRow key={post.id} post={post} index={posts.indexOf(post) + 1} />
          ))}
        </ol>
      )}
    </div>
  );
}

function SavedRow({ post, index }: { post: SavedPost; index: number }) {
  const [isPending, startTransition] = useTransition();

  function onRemove() {
    startTransition(async () => {
      const { error } = await removePost(post.id);
      toast(error ?? "Removed from your reading list", { tone: error ? "error" : "success" });
    });
  }

  return (
    <li
      className={cn(
        "group relative grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-4 border-b border-border py-5 transition-opacity duration-200",
        isPending && "pointer-events-none opacity-35",
      )}
    >
      <span className="kicker pt-1.5 text-muted tabular-nums">{String(index).padStart(2, "0")}</span>
      <div className="min-w-0">
        <h2 className="font-display text-[1.3rem] leading-snug font-medium tracking-[-0.01em]">
          <Link
            href={`/posts/${post.source}/${post.url}`}
            prefetch={false}
            className="decoration-accent decoration-1 underline-offset-[0.18em] after:absolute after:inset-0 group-hover:underline focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h2>
        {post.body && <p className="mt-1.5 line-clamp-1 text-[15px] text-muted">{post.body}</p>}
        <p className="kicker mt-2 text-subtle">{post.sourceName}</p>
      </div>
      <button
        onClick={onRemove}
        aria-label={`Remove ${post.title}`}
        className={buttonClass("ghost", "sm", "relative z-10 hover:bg-danger-soft hover:text-danger")}
      >
        {isPending ? "Removing…" : "Remove"}
      </button>
    </li>
  );
}
