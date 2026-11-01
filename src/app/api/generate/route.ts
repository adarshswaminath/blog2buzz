import { NextResponse } from "next/server";
import { generate } from "@/lib/ai";
import { isGenerationType } from "@/lib/ai-types";
import { getSource } from "@/lib/sources";

/**
 * POST { source, slug, type } -> { text }
 * The article is loaded on the server, so this endpoint can only be used
 * for posts that actually exist on a supported source.
 */
export async function POST(request: Request) {
  const { source, slug, type } = await request.json().catch(() => ({}));

  if (typeof source !== "string" || typeof slug !== "string" || !isGenerationType(type)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const post = await getSource(source)?.getPost(slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  try {
    const text = await generate(post, type);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("[generate]", error);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
