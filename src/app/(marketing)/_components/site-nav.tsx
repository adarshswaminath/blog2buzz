import Link from "next/link";
import { buttonClass } from "@/components/button";
import { Wordmark } from "@/components/logo";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/explore", label: "Explore" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
      <nav aria-label="Main" className="container flex h-14 items-center justify-between gap-4 border-b border-fg/90">
        <div className="flex items-center gap-10">
          <Wordmark />
          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/login" className={buttonClass("ghost", "sm")}>
            Sign in
          </Link>
          <Link href="/explore" className={buttonClass("primary", "sm")}>
            Today&rsquo;s edition
          </Link>
        </div>
      </nav>
    </header>
  );
}
