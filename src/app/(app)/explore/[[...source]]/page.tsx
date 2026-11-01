import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { SourceTabs } from "@/components/source-tabs";
import { FrontPage } from "@/components/stories";
import { TopicIndex } from "@/components/topic-index";
import { getSource, listPosts, listSources } from "@/lib/sources";
import { formatEditionDate } from "@/lib/utils";

// /explore shows every source; /explore/medium shows one.
type Props = { params: Promise<{ source?: string[] }> };

// Render on first visit, then serve from cache for 10 minutes.
export const revalidate = 600;
export function generateStaticParams() {
  return [];
}

async function resolve(params: Props["params"]) {
  const { source: segments = [] } = await params;
  if (segments.length > 1) notFound();
  const source = segments[0] ? getSource(segments[0]) : undefined;
  if (segments[0] && !source) notFound();
  return source;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const source = await resolve(params);
  return source
    ? { title: `Today on ${source.name}`, description: source.about }
    : { title: "Today’s edition", description: "Developer stories from DEV and Medium, refreshed every 10 minutes." };
}

export default async function ExplorePage({ params }: Props) {
  const source = await resolve(params);
  const posts = await listPosts({ source: source?.id, limit: 40 });
  const names = listSources().map((s) => s.name).join(" and ");

  return (
    <div className="container">
      <PageHeader
        kicker={`${formatEditionDate()} · ${posts.length} stories`}
        title={source ? `Today on ${source.name}` : "Today’s edition"}
        standfirst={source ? `${source.about} Refreshed every 10 minutes.` : `Stories from ${names}, each in its own order. Refreshed every 10 minutes.`}
        actions={<SourceTabs basePath="/explore" active={source?.id} />}
      />
      <TopicIndex source={source?.id} />
      <div className="mt-10">
        <FrontPage posts={posts} />
      </div>
    </div>
  );
}
