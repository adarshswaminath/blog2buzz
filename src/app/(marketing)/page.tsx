import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonClass } from "@/components/button";
import { listPosts } from "@/lib/sources";
import { TOPICS } from "@/lib/topics";
import { formatEditionDate } from "@/lib/utils";
import { BriefDemo } from "./_components/brief-demo";
import { Faq } from "./_components/faq";
import { FrontPagePreview } from "./_components/front-page-preview";

const STEPS = [
  "Open any article from today’s edition.",
  "Pick a format: summary, post for X or Medium draft.",
  "Copy it, post it, or save the article for later.",
];

const INDEX = [
  {
    title: "Read the front page",
    body: "The most-read articles on DEV and the newest developer stories on Medium, refreshed every 10 minutes. Filter by source or topic, or press ⌘K to jump to one.",
    href: "/explore",
    cta: "Open today’s edition",
  },
  {
    title: "Get the brief",
    body: "A summary that says what the article is about in one line, then lists the key points. Decide in seconds whether it deserves your evening.",
    href: "#how-it-works",
    cta: "See an example",
  },
  {
    title: "Share what you learned",
    body: "A post for X that fits the limit, opened in X with the article link attached. Or a Medium-style draft with a title, intro and sections to edit.",
    href: "#how-it-works",
    cta: "See an example",
  },
  {
    title: "Keep a reading list",
    body: "Save anything with one click and find it again on any device. Sign in with your email address. There is no password to remember.",
    href: "/saved",
    cta: "Open your reading list",
  },
];

export default async function HomePage() {
  const posts = await listPosts({ limit: 8 });
  // Lead with the first story that has a cover, then the next three in order.
  const leadIndex = Math.max(0, posts.findIndex((p) => p.coverImage));
  const frontPage = [posts[leadIndex], ...posts.filter((_, i) => i !== leadIndex)].filter(Boolean).slice(0, 4);

  return (
    <>
      {/* Hero: the promise on the left, today's real front page on the right. */}
      <section className="container grid gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-0 lg:pb-24">
        <div className="flex flex-col lg:col-span-7 lg:pr-14">
          <p className="kicker text-muted">{formatEditionDate()}</p>
          <h1 className="mt-8 font-display text-[3.5rem] leading-[0.92] font-medium tracking-[-0.04em] text-balance sm:text-[5.25rem] xl:text-[6.25rem]">
            The developer web, edited down.
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-muted">
            Blog2Buzz collects developer stories from DEV and Medium, gives you the key points in seconds, and drafts a
            post for X or a Medium article when something is worth sharing.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/explore" className={buttonClass("primary", "lg")}>
              Read today&rsquo;s edition
            </Link>
            <Link href="#how-it-works" className={buttonClass("ghost", "lg", "text-fg")}>
              How it works <ArrowRight strokeWidth={1.75} className="size-4" />
            </Link>
          </div>
          <p className="mt-5 text-[13px] text-subtle">No account needed to read or summarize.</p>
        </div>
        <div className="lg:col-span-5 lg:border-l lg:border-fg/90 lg:pl-10">
          <FrontPagePreview posts={frontPage} />
        </div>
      </section>

      {/* How it works: a worked example on a white reading surface. */}
      <section id="how-it-works" className="border-y border-border bg-surface-hover/60 py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-5 lg:pr-16">
            <p className="kicker text-accent-strong">How it works</p>
            <h2 className="mt-4 font-display text-[2.75rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance sm:text-6xl">
              Every story comes with a brief.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Ask for a format on any article and Blog2Buzz reads the full text with Google Gemini, then writes the
              result in a few seconds. Nothing is generated until you ask.
            </p>
            <ol className="mt-10 border-t border-fg/90">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-5 border-b border-border py-4 text-[15px]">
                  <span className="kicker pt-1 text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <BriefDemo />
          </div>
        </div>
      </section>

      {/* Index: what the product does, set like a table of contents. */}
      <section className="container grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-0">
        <div className="lg:col-span-4 lg:pr-12">
          <h2 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.025em] text-balance lg:sticky lg:top-24">
            One place to keep up, and to pass it on.
          </h2>
        </div>
        <ol className="border-t-2 border-fg lg:col-span-8">
          {INDEX.map((item, i) => (
            <li key={item.title} className="grid gap-3 border-b border-border py-8 sm:grid-cols-[4rem_1fr] sm:gap-6">
              <span className="font-mono text-sm text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight font-medium tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{item.body}</p>
                <Link
                  href={item.href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {item.cta}
                  <ArrowRight strokeWidth={1.75} className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Topics: a typographic index. Every word is a link. */}
      <section aria-labelledby="topics" className="border-t-2 border-fg">
        <div className="container py-16 sm:py-20">
          <div className="flex items-baseline justify-between gap-6">
            <h2 id="topics" className="kicker">
              Browse by topic
            </h2>
            <p className="hidden text-[13px] text-muted sm:block">Or press ⌘K and type any topic.</p>
          </div>
          <ul className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display text-[2rem] leading-tight font-medium tracking-[-0.02em] sm:text-5xl">
            {TOPICS.map((topic, i) => (
              <li key={topic} className="flex items-baseline gap-2">
                <Link
                  href={`/tags/${topic}`}
                  prefetch={false}
                  className="transition-colors decoration-accent decoration-2 underline-offset-[0.15em] hover:text-accent-strong hover:underline"
                >
                  {topic}
                </Link>
                {i < TOPICS.length - 1 && (
                  <span aria-hidden className="font-light text-border-strong">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border">
        <div className="container grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-4 lg:pr-12">
            <h2 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.025em]">Questions, answered.</h2>
            <p className="mt-4 text-[15px] text-muted">
              Something else?{" "}
              <a
                href="https://github.com/adarshswaminath/blog2buzz/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                Open an issue on GitHub
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
