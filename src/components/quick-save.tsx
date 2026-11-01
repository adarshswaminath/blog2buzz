"use client";

import { Bookmark } from "lucide-react";
import { useState, useTransition } from "react";
import { savePost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { buttonClass } from "./button";
import { toast } from "./toast";
import { Tooltip } from "./tooltip";

/** One-click save from a feed. Signed-out users are sent to /login by the action. */
export function QuickSave({ source, slug, title }: { source: string; slug: string; title: string }) {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onClick() {
    startTransition(async () => {
      const result = await savePost(source, slug);
      if (result.error) {
        toast(result.error, { tone: "error" });
        return;
      }
      setSaved(true);
      toast("Added to your reading list", { tone: "success", action: { label: "View", href: "/saved" } });
    });
  }

  return (
    <Tooltip label={saved ? "In your reading list" : "Save for later"} align="end">
      <button
        onClick={onClick}
        disabled={isPending || saved}
        aria-label={saved ? `Saved: ${title}` : `Save ${title}`}
        aria-pressed={saved}
        className={buttonClass("ghost", "icon", ["size-7", saved && "text-accent disabled:opacity-100"])}
      >
        <Bookmark
          strokeWidth={1.75}
          className={cn("size-4 transition-[fill] duration-200", saved && "animate-pop fill-current", isPending && "opacity-40")}
        />
      </button>
    </Tooltip>
  );
}
