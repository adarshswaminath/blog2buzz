import Link from "next/link";
import { buttonClass } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { MissingPageIllustration } from "@/components/illustrations";
import { Wordmark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-fg/90">
        <div className="container flex h-14 items-center">
          <Wordmark />
        </div>
      </header>
      <main className="container flex flex-1 items-center pb-24">
        <EmptyState
          illustration={<MissingPageIllustration />}
          title="This page was torn out"
          description="The article may have been removed by its author, or the link is wrong. Today’s edition is still here."
        >
          <Link href="/explore" className={buttonClass("primary", "md")}>
            Today&rsquo;s edition
          </Link>
          <Link href="/" className={buttonClass("secondary", "md")}>
            Home
          </Link>
        </EmptyState>
      </main>
    </div>
  );
}
