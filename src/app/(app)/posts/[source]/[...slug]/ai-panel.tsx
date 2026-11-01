"use client";

import { Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatedCheck } from "@/components/animated-check";
import { buttonClass } from "@/components/button";
import { GENERATION_TYPES, type GenerationType } from "@/lib/ai-types";
import { cn } from "@/lib/utils";
import { CharacterRing } from "./ai-visuals";

const TYPES = Object.keys(GENERATION_TYPES) as GenerationType[];

const LABELS: Record<GenerationType, string> = { summary: "Summary", tweet: "Post for X", article: "Medium draft" };

const COPY: Record<GenerationType, { description: string; action: string }> = {
  summary: {
    description: "One line on what the article is about, then the key points as a short list.",
    action: "Write the summary",
  },
  tweet: {
    description: "A single post for X under the character limit. Posting opens X with the article link attached.",
    action: "Draft a post for X",
  },
  article: {
    description: "An original Medium-style draft with a title, an introduction, sections and a conclusion.",
    action: "Write a Medium draft",
  },
};

type Result = { text: string; id: number };

/** "The brief": AI formats for one article, set as part of the reading column. */
export function AiPanel({ source, slug, url }: { source: string; slug: string; url: string }) {
  const [type, setType] = useState<GenerationType>("summary");
  // Results are kept per format, so switching tabs never loses earlier output.
  const [results, setResults] = useState<Partial<Record<GenerationType, Result>>>({});
  const [loadingType, setLoadingType] = useState<GenerationType | null>(null);
  const [error, setError] = useState<{ type: GenerationType; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const result = results[type];
  const isLoading = loadingType === type;
  const busy = loadingType !== null;

  async function generate(requested: GenerationType) {
    setType(requested);
    setLoadingType(requested);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, slug, type: requested }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResults((prev) => ({ ...prev, [requested]: { text: data.text, id: Date.now() } }));
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.";
      setError({ type: requested, message });
    } finally {
      setLoadingType(null);
    }
  }

  async function onCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function onTabKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = TYPES[(TYPES.indexOf(type) + step + TYPES.length) % TYPES.length];
    setType(next);
    document.getElementById(`brief-tab-${next}`)?.focus();
  }

  const followUps = TYPES.filter((t) => t !== type && !results[t]);

  return (
    <section aria-labelledby="brief-title" className="border-t-2 border-fg pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id="brief-title" className="font-display text-[2rem] leading-none font-medium tracking-[-0.02em]">
          The brief
        </h2>
        <p className="kicker text-muted">Written by Gemini when you ask</p>
      </div>

      <div role="tablist" aria-label="Format" onKeyDown={onTabKeyDown} className="mt-6 flex gap-6 border-b border-border">
        {TYPES.map((key) => (
          <button
            key={key}
            id={`brief-tab-${key}`}
            role="tab"
            aria-selected={key === type}
            aria-controls="brief-panel"
            tabIndex={key === type ? 0 : -1}
            onClick={() => setType(key)}
            className={cn(
              "relative flex h-11 items-center gap-2 text-sm font-medium transition-colors",
              key === type ? "text-fg" : "text-muted hover:text-fg",
            )}
          >
            {LABELS[key]}
            {results[key] && <span aria-label="(ready)" className="size-1.5 rounded-full bg-accent" />}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 -bottom-px h-0.5 bg-fg transition-transform duration-200 ease-(--ease-soft)",
                key === type ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div id="brief-panel" role="tabpanel" aria-labelledby={`brief-tab-${type}`} className="min-h-48 py-7">
        {isLoading ? (
          <div role="status" className="animate-fade-in">
            <div className="h-0.5 w-full overflow-hidden bg-border">
              <div className="h-full w-2/5 animate-indeterminate bg-accent" />
            </div>
            <p className="mt-4 font-display text-lg">Reading the article&hellip;</p>
            <p className="mt-1 text-[13px] text-muted">This usually takes a few seconds.</p>
          </div>
        ) : error?.type === type ? (
          <div role="alert" className="animate-fade-in border-l-2 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
            {error.message}{" "}
            <button onClick={() => generate(type)} className="font-medium underline underline-offset-2">
              Try again
            </button>
          </div>
        ) : result ? (
          <div key={result.id} className="animate-fade-up">
            {type === "tweet" ? (
              <div>
                <p className="font-display text-xl leading-relaxed whitespace-pre-wrap">{result.text}</p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                  <span className="truncate font-mono text-[11.5px] text-muted">+ {url.replace(/^https?:\/\//, "")}</span>
                  <CharacterRing count={result.text.length} />
                </div>
              </div>
            ) : (
              <div className="prose max-w-none font-display text-[1.125rem] leading-[1.7] prose-neutral prose-headings:font-medium prose-headings:tracking-[-0.015em] prose-strong:font-semibold prose-li:my-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.text}</ReactMarkdown>
              </div>
            )}
          </div>
        ) : (
          <div key={type} className="animate-fade-in">
            <p className="max-w-lg text-[15px] leading-relaxed text-muted">{COPY[type].description}</p>
            <button onClick={() => generate(type)} disabled={busy} className={buttonClass("primary", "md", "mt-5")}>
              {COPY[type].action}
            </button>
          </div>
        )}
      </div>

      {result && !isLoading && (
        <div className="flex flex-wrap items-center gap-x-1 gap-y-3 border-t border-border pt-4">
          <button onClick={onCopy} className={buttonClass("ghost", "sm")}>
            {copied ? <AnimatedCheck className="size-3.5 text-accent" /> : <Copy strokeWidth={1.75} className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
          {type === "tweet" && (
            <a
              href={`https://x.com/intent/post?text=${encodeURIComponent(result.text)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("ghost", "sm")}
            >
              Post on X
            </a>
          )}
          <button onClick={() => generate(type)} disabled={busy} className={buttonClass("ghost", "sm")}>
            <RotateCcw strokeWidth={1.75} className="size-3.5" /> Regenerate
          </button>
          {followUps.length > 0 && (
            <p className="ml-auto flex flex-wrap items-center gap-x-3 text-[13px] text-muted">
              Also:
              {followUps.map((t) => (
                <button
                  key={t}
                  onClick={() => generate(t)}
                  disabled={busy}
                  className="font-medium text-fg underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-accent disabled:opacity-50"
                >
                  {COPY[t].action}
                </button>
              ))}
            </p>
          )}
          <span aria-live="polite" className="sr-only">
            {copied ? "Copied to clipboard" : ""}
          </span>
        </div>
      )}
    </section>
  );
}
