import Link from "next/link";
import { TOPICS } from "@/lib/topics";
import { cn } from "@/lib/utils";

/**
 * Section index under a page header, like the section strip of a newspaper. Scrolls sideways
 * on small screens. Keeps the selected source, so switching topic on /explore/medium stays on Medium.
 */
export function TopicIndex({ active, source }: { active?: string; source?: string }) {
  const suffix = source ? `/${source}` : "";
  const items = [
    { label: "All", href: `/explore${suffix}`, current: !active },
    ...TOPICS.map((topic) => ({ label: topic, href: `/tags/${topic}${suffix}`, current: topic === active })),
  ];

  return (
    <nav aria-label="Topics" className="border-y border-border [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)]">
      <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 pr-12 [scrollbar-width:none] sm:-mx-2 sm:px-0 sm:pr-12">
        {items.map((item) => (
          <li key={item.label} className="shrink-0">
            <Link
              href={item.href}
              prefetch={false}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                "kicker relative flex h-10 items-center px-2 transition-colors",
                item.current ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {item.label}
              {item.current && <span aria-hidden className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
