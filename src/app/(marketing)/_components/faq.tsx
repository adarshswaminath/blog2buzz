import { Plus } from "lucide-react";

// Every answer must describe how the product works today.
const QUESTIONS = [
  {
    q: "Where do the articles come from?",
    a: "From DEV (dev.to) and Medium. From DEV we show the most-read posts; Medium has no public ranking, so we show its newest developer stories. Every story is labelled with its source, and you can filter by source. Everything refreshes every 10 minutes.",
  },
  {
    q: "Do I need an account?",
    a: "No. Reading, summaries and drafts work without one. You only sign in to keep a reading list, using a link sent to your email. There is no password.",
  },
  {
    q: "What writes the briefs?",
    a: "Google Gemini. When you ask for a format, Blog2Buzz sends the article text and your choice, then shows the result for you to copy, edit or post.",
  },
  {
    q: "Do you republish articles?",
    a: "No. Blog2Buzz shows the title and a short description, then links to the original article, which always belongs to its author.",
  },
  {
    q: "Is Blog2Buzz open source?",
    a: "Yes. The code is on GitHub, and contributions are welcome.",
  },
];

export function Faq() {
  return (
    <div className="border-t-2 border-fg">
      {QUESTIONS.map((item) => (
        <details key={item.q} className="group border-b border-border">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-medium tracking-[-0.01em] transition-colors hover:text-accent-strong [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus strokeWidth={1.75} className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="-mt-2 max-w-2xl animate-fade-in pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
