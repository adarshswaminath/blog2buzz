/** Topics shown as quick filters. Each one maps to /tags/{topic}. */
export const TOPICS = [
  "ai",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "node",
  "python",
  "webdev",
  "devops",
  "aws",
  "security",
  "database",
  "machinelearning",
  "opensource",
  "career",
  "productivity",
  "beginners",
  "tutorial",
] as const;

/**
 * Normalizes user input into a tag: "#Next.js " becomes "nextjs", "LLM Agent" becomes "llm-agent".
 * Hyphens are kept because Medium tags use them; each adapter adapts the tag to its platform.
 */
export function toTag(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
