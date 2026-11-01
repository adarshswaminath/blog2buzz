import "server-only";
import { GoogleGenAI } from "@google/genai";
import type { GenerationType } from "@/lib/ai-types";
import type { PostDetail } from "@/lib/sources";

const INSTRUCTIONS: Record<GenerationType, string> = {
  summary:
    "Summarize the article in simple, easy-to-understand English. Start with one sentence on what it is about, then list the key points as short bullets.",
  tweet:
    "Write one engaging post for X (Twitter), at most 240 characters, that captures the key insight and makes people want to read the article. Use at most two hashtags. Return only the post text.",
  article:
    "Write an original Medium-style article inspired by this one. Use an engaging introduction, informative sections with headings, and a clear conclusion. Use Markdown.",
};

// Long articles are cut so prompts stay fast and cheap.
const MAX_CONTENT_CHARS = 20_000;

export async function generate(post: PostDetail, type: GenerationType) {
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_GEMINI_KEY });
  const prompt = [
    INSTRUCTIONS[type],
    `Title: ${post.title}`,
    `Article:\n${post.content.slice(0, MAX_CONTENT_CHARS)}`,
  ].join("\n\n");

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-flash-latest",
    contents: prompt,
  });
  return response.text ?? "";
}
