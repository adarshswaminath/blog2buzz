// Shared by the server (lib/ai.ts) and the browser (AI panel).
// Kept separate so the Gemini SDK is never bundled into client code.

export const GENERATION_TYPES = {
  summary: "Summary",
  tweet: "Tweet",
  article: "Article",
} as const;

export type GenerationType = keyof typeof GENERATION_TYPES;

export function isGenerationType(value: unknown): value is GenerationType {
  return typeof value === "string" && value in GENERATION_TYPES;
}
