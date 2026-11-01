"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/logo";
import { SearchTrigger } from "@/components/search-trigger";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/explore", label: "Explore", match: ["/explore", "/tags", "/posts"] },
  { href: "/saved", label: "Saved", match: ["/saved"] },
];

/** App masthead. Static (never reads auth) so the pages under it stay cacheable. */
export function Masthead() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-fg/90 bg-bg/90 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex h-full items-center gap-6 sm:gap-9">
          <Wordmark />
          <nav aria-label="Main" className="flex h-full items-stretch gap-5">
            {LINKS.map((link) => {
              const active = link.match.some((path) => pathname.startsWith(path));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center text-sm transition-colors duration-150",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-px h-[3px] bg-accent transition-transform duration-200 ease-(--ease-soft)",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
        <SearchTrigger />
      </div>
    </header>
  );
}
