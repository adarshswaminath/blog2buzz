import Link from "next/link";
import { buttonClass } from "@/components/button";
import { Wordmark } from "@/components/logo";

const COLUMNS = [
  {
    title: "Read",
    links: [
      { href: "/explore", label: "Today’s edition" },
      { href: "/saved", label: "Reading list" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "https://github.com/adarshswaminath/blog2buzz", label: "GitHub" },
      { href: "https://www.producthunt.com/posts/blog2buzz", label: "Product Hunt" },
      { href: "https://twitter.com/AdarshS002", label: "X" },
      { href: "https://www.linkedin.com/in/adarshswaminath", label: "LinkedIn" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-fg text-white">
      <div className="container py-16">
        <div className="flex flex-col gap-6 border-b border-white/15 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl font-display text-4xl leading-[1.05] font-medium tracking-[-0.025em] sm:text-5xl">
            Today&rsquo;s edition is ready.
          </p>
          <Link href="/explore" className={buttonClass("secondary", "lg", "border-white/30 text-white hover:border-white hover:bg-white hover:text-fg")}>
            Start reading
          </Link>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Wordmark className="text-white [&>span]:text-accent-on-dark" />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/60">
              Set in Newsreader, Inter and JetBrains Mono. Articles belong to their authors. Built in the open.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="kicker text-white/50">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
