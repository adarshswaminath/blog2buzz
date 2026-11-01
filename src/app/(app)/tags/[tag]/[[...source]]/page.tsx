import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClass } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { EmptyTopicIllustration } from "@/components/illustrations";
import { PageHeader } from "@/components/page-header";
import { SourceTabs } from "@/components/source-tabs";
import { FrontPage } from "@/components/stories";
import { TopicIndex } from "@/components/topic-index";
import { getSource, listPosts } from "@/lib/sources";
import { toTag } from "@/lib/topics";

// /tags/react shows every source; /tags/react/medium shows one.
type Props = { params: Promise<{ tag: string; source?: string[] }> };

// Render each topic on its first visit, then serve it from cache for 10 minutes.
export const revalidate = 600;
export function generateStaticParams() {
  return [];
}

async function resolve(params: Props["params"]) {
  const { tag: rawTag, source: segments = [] } = await params;
  if (segments.length > 1) notFound();
  const source = segments[0] ? getSource(segments[0]) : undefined;
  if (segments[0] && !source) notFound();
  return { tag: toTag(decodeURIComponent(rawTag)), source };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag, source } = await resolve(params);
  return {
    title: source ? `#${tag} on ${source.name}` : `#${tag}`,
    description: `Developer stories about ${tag}${source ? ` on ${source.name}` : ""}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag, source } = await resolve(params);
  const posts = await listPosts({ tag, source: source?.id });

  return (
    <div className="container">
      <PageHeader
        kicker={`Topic${source ? ` on ${source.name}` : ""} · ${posts.length} ${posts.length === 1 ? "story" : "stories"}`}
        title={`#${tag}`}
        standfirst={posts.length ? `Stories about ${tag}${source ? ` on ${source.name}` : " from every source"}.` : undefined}
        actions={<SourceTabs basePath={`/tags/${tag}`} active={source?.id} />}
      />
      <TopicIndex active={tag} source={source?.id} />
      <div className="mt-10">
        {posts.length ? (
          <FrontPage posts={posts} />
        ) : (
          <EmptyState
            illustration={<EmptyTopicIllustration />}
            title={`Nothing on #${tag}${source ? ` on ${source.name}` : ""} today`}
            description={
              source
                ? "This source has no stories with this topic right now. Try all sources, or a broader topic."
                : "No source has stories with this topic right now. Try a broader one."
            }
          >
            {source && (
              <Link href={`/tags/${tag}`} prefetch={false} className={buttonClass("secondary", "sm")}>
                #{tag} on all sources
              </Link>
            )}
            <Link href="/tags/javascript" prefetch={false} className={buttonClass("secondary", "sm")}>
              #javascript
            </Link>
            <Link href="/explore" className={buttonClass("primary", "sm")}>
              Today&rsquo;s edition
            </Link>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
