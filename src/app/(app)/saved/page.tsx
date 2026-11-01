import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buttonClass } from "@/components/button";
import { PageHeader } from "@/components/page-header";
import { getSource } from "@/lib/sources";
import { createClient } from "@/lib/supabase/server";
import { SavedList, type SavedPost } from "./saved-list";

export const metadata: Metadata = { title: "Reading list" };

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login"); // proxy.ts normally handles this first

  const { data, error } = await supabase
    .from("blog2buzz")
    .select("id, source, url, title, body, image_url")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  if (error) console.error("[saved]", error.message);
  const posts: SavedPost[] = (data ?? []).map((row) => ({
    ...row,
    sourceName: getSource(row.source)?.name ?? row.source,
  }));

  return (
    <div className="container max-w-4xl">
      <PageHeader
        kicker={`${posts.length} saved ${posts.length === 1 ? "article" : "articles"}`}
        title="Reading list"
        standfirst="Everything you saved, newest first. It follows you to any device you sign in on."
        actions={
          <div className="flex items-center gap-3 text-[13px] text-muted">
            <span className="truncate">
              Signed in as <span className="font-medium text-fg">{user.email}</span>
            </span>
            <form action="/auth/signout" method="post">
              <button className={buttonClass("secondary", "sm")}>Sign out</button>
            </form>
          </div>
        }
      />
      <div className="border-t-2 border-fg">
        <SavedList posts={posts} loadFailed={Boolean(error)} />
      </div>
    </div>
  );
}
