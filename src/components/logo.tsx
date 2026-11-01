import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The wordmark: an editorial serif "Blog" and "Buzz" joined by a code-set "2".
 * Blog, through code, becomes buzz. The red 2 is the brand's only mark.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Blog2Buzz home"
      className={cn("inline-flex items-baseline font-display text-[1.375rem] leading-none font-semibold tracking-[-0.02em]", className)}
    >
      Blog
      <span className="mx-px font-mono text-[0.78em] font-medium text-accent">2</span>
      Buzz
    </Link>
  );
}

/** Square mark for small spaces (favicon, sign-in). Same geometric "2" as the wordmark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="7" className="fill-fg" />
      <path
        d="M11 13a5 5 0 0 1 10 0c0 1.9-1.1 3.2-2.7 4.6L11 24h10.5"
        fill="none"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
    </svg>
  );
}
