"use client";

import { Search } from "lucide-react";
import { openCommandMenu } from "./command-menu";

/** Opens the command menu (also ⌘K or /). Icon-only on small screens. */
export function SearchTrigger() {
  return (
    <button
      type="button"
      onClick={openCommandMenu}
      aria-label="Search topics"
      className="flex h-8 items-center gap-2 rounded-md px-2 text-[13px] text-muted transition-colors hover:bg-surface-hover hover:text-fg sm:border sm:border-border sm:pr-1.5 sm:pl-2.5"
    >
      <Search strokeWidth={1.75} className="size-4" />
      <span className="hidden sm:inline">Search topics</span>
      <kbd className="hidden rounded-sm bg-surface-hover px-1.5 py-0.5 font-mono text-[10.5px] text-muted pointer-fine:sm:inline">⌘K</kbd>
    </button>
  );
}
