"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSource } from "@/lib/sources";
import { createClient } from "@/lib/supabase/server";

const TABLE = "blog2buzz";

export async function savePost(source: string, slug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Load the post on the server so clients can't save arbitrary content.
  const post = await getSource(source)?.getPost(slug);
  if (!post) return { error: "Post not found" };

  const { data: existing } = await supabase
    .from(TABLE)
    .select("id")
    .match({ user_id: user.id, source, url: slug })
    .maybeSingle();

  if (!existing) {
    const { error } = await supabase.from(TABLE).insert({
      user_id: user.id,
      source,
      url: slug,
      title: post.title,
      body: post.description,
      image_url: post.coverImage,
    });
    if (error) {
      console.error("[savePost]", error.message);
      return { error: "Could not save post" };
    }
  }

  revalidatePath("/saved");
  return { error: null };
}

export async function removePost(id: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from(TABLE).delete().match({ id, user_id: user.id });
  if (error) {
    console.error("[removePost]", error.message);
    return { error: "Could not remove this article. Please try again." };
  }

  revalidatePath("/saved");
  return { error: null };
}
