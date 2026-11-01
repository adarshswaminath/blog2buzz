"use client";

import { Bookmark } from "lucide-react";
import { useState, useTransition } from "react";
import { buttonClass } from "@/components/button";
import { toast } from "@/components/toast";
import { savePost } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function SaveButton({ source, slug }: { source: string; slug: string }) {
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
    <button
      onClick={onClick}
      disabled={isPending || saved}
      aria-pressed={saved}
      className={buttonClass("ghost", "sm", saved && "text-accent-strong disabled:opacity-100")}
    >
      <Bookmark
        strokeWidth={1.75}
        className={cn("size-4 transition-[fill] duration-200", saved && "animate-pop fill-current", isPending && "opacity-40")}
      />
      {isPending ? "Saving…" : saved ? "Saved" : "Save"}
    </button>
  );
}
