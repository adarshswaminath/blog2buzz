"use client";

import Link from "next/link";
import { buttonClass } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { InterruptedPageIllustration } from "@/components/illustrations";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container flex min-h-[70dvh] items-center">
      <EmptyState
        illustration={<InterruptedPageIllustration />}
        title="This edition stopped mid-sentence"
        description="We could not load this page. It is usually temporary, so try again in a moment."
      >
        <button onClick={reset} className={buttonClass("primary", "md")}>
          Try again
        </button>
        <Link href="/" className={buttonClass("secondary", "md")}>
          Home
        </Link>
      </EmptyState>
    </div>
  );
}
