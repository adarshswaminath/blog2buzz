"use client";

import { Link2 } from "lucide-react";
import { buttonClass } from "@/components/button";
import { toast } from "@/components/toast";
import { Tooltip } from "@/components/tooltip";

export function CopyLinkButton({ url }: { url: string }) {
  async function onClick() {
    try {
      await navigator.clipboard.writeText(url);
      toast("Link to the original article copied", { tone: "success" });
    } catch {
      toast("Could not copy the link", { tone: "error" });
    }
  }

  return (
    <Tooltip label="Copy link">
      <button onClick={onClick} aria-label="Copy link to the original article" className={buttonClass("ghost", "icon")}>
        <Link2 strokeWidth={1.75} className="size-4" />
      </button>
    </Tooltip>
  );
}
