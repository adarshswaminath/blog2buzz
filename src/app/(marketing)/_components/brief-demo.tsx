"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/*
 * A worked example of the three formats, using a sample article written for this page.
 * It is labelled as an example: nothing here pretends to be live AI output.
 */

const TABS = [
  { id: "summary", label: "Summary" },
  { id: "tweet", label: "Post for X" },
  { id: "article", label: "Medium draft" },
] as const;

type Tab = (typeof TABS)[number]["id"];

const TWEET =
  "Your Docker image doesn’t need your compiler. Multi-stage builds, a smarter layer order and a slim base image remove most of the weight. Worth a read:";

function CharacterCount({ count, max = 280 }: { count: number; max?: number }) {
  return (
    <span className="flex items-center gap-2 font-mono text-[11.5px] text-muted tabular-nums">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4 -rotate-90">
        <circle cx="10" cy="10" r="8" strokeWidth="2" className="stroke-border" />
        <circle cx="10" cy="10" r="8" strokeWidth="2" pathLength={1} strokeDasharray={`${count / max} 1`} className="stroke-accent" />
      </svg>
      {count} / {max}
    </span>
  );
}

export function BriefDemo() {
  const [tab, setTab] = useState<Tab>("summary");

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const i = TABS.findIndex((t) => t.id === tab);
    const next = TABS[(i + (event.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length].id;
    setTab(next);
    document.getElementById(`demo-tab-${next}`)?.focus();
  }

  return (
    <figure className="bg-surface outline -outline-offset-1 outline-border">
      {/* The article */}
      <div className="p-6 sm:p-8">
        <p className="kicker text-muted">Example article</p>
        <p className="mt-3 font-display text-[1.6rem] leading-tight font-medium tracking-[-0.015em]">
          Your Docker image doesn&rsquo;t need your compiler
        </p>
        <p className="mt-4 font-display text-[1.0625rem] leading-[1.7] text-muted">
          Most of the size of a typical image comes from things that were only needed to build the app: compilers,
          package caches and dev dependencies.{" "}
          <mark className="marker bg-transparent text-fg">
            Multi-stage builds let you compile in one stage and copy only the output into a clean runtime image.
          </mark>{" "}
          Layer order matters too:{" "}
          <mark className="marker bg-transparent text-fg">put the steps that change least often first, so the cache stays useful.</mark>{" "}
          Finally, <mark className="marker bg-transparent text-fg">start from a slim base image and measure every change</mark>, because
          the biggest wins are rarely where you expect.
        </p>
      </div>

      {/* The brief */}
      <div className="border-t border-border bg-surface-muted">
        <div role="tablist" aria-label="Brief format" onKeyDown={onKeyDown} className="flex gap-6 border-b border-border px-6 sm:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              id={`demo-tab-${t.id}`}
              role="tab"
              aria-selected={tab === t.id}
              aria-controls="demo-panel"
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative h-11 text-[13px] font-medium transition-colors",
                tab === t.id ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-px h-0.5 bg-accent transition-transform duration-200 ease-(--ease-soft)",
                  tab === t.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${tab}`} className="min-h-[13.5rem] p-6 sm:p-8">
          <div key={tab} className="animate-fade-up">
            {tab === "summary" && (
              <div className="text-[15px] leading-relaxed">
                <p>An article on shrinking Docker images by removing what is only needed at build time.</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {[
                    "Use multi-stage builds so only the compiled output ships.",
                    "Order steps from least to most often changed to keep the cache useful.",
                    "Start from a slim base image and measure each change.",
                  ].map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tab === "tweet" && (
              <div>
                <p className="text-[15px] leading-relaxed">{TWEET}</p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                  <span className="font-mono text-[11.5px] text-muted">+ link to the article</span>
                  <CharacterCount count={TWEET.length} />
                </div>
              </div>
            )}
            {tab === "article" && (
              <div className="font-display">
                <p className="text-xl leading-snug font-medium">Ship the app, not the toolbox</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-muted">
                  Every megabyte in a container image is paid for again on every pull, every deploy and every cold start.
                  The good news is that most of that weight was never meant to ship at all.
                </p>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-muted">
                  In this post, I walk through three changes that made the biggest difference&hellip;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <figcaption className="sr-only">An example article with the sentences its summary keeps highlighted, and the three formats Blog2Buzz can write from it.</figcaption>
    </figure>
  );
}
