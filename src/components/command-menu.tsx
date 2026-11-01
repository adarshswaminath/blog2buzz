"use client";

import { ArrowRight, Bookmark, Clock, Compass, Hash, House, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TOPICS, toTag } from "@/lib/topics";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; href: string; group: string; icon: typeof Hash; tag?: string };

const PAGES: Item[] = [
  { id: "explore", label: "Explore", href: "/explore", group: "Go to", icon: Compass },
  { id: "saved", label: "Saved", href: "/saved", group: "Go to", icon: Bookmark },
  { id: "home", label: "Home", href: "/", group: "Go to", icon: House },
];

const RECENT_KEY = "b2b:recent-topics";
const OPEN_EVENT = "b2b:open-command-menu";

/** Opens the menu from anywhere, e.g. a search button. */
export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function readRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function rememberTopic(tag: string) {
  try {
    const next = [tag, ...readRecent().filter((t) => t !== tag)].slice(0, 4);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode). Recents are a convenience only.
  }
}

function topicItem(tag: string, group: string, icon = Hash): Item {
  return { id: `${group}-${tag}`, label: `#${tag}`, href: `/tags/${tag}`, group, icon, tag };
}

function buildItems(query: string, recent: string[]): Item[] {
  const tag = toTag(query);
  if (!query.trim()) {
    return [
      ...recent.map((t) => topicItem(t, "Recent", Clock)),
      ...PAGES,
      ...TOPICS.filter((t) => !recent.includes(t)).slice(0, 6).map((t) => topicItem(t, "Topics")),
    ];
  }
  const pages = PAGES.filter((page) => page.label.toLowerCase().includes(query.trim().toLowerCase()));
  const topics = TOPICS.filter((t) => tag && t.includes(tag) && t !== tag).map((t) => topicItem(t, "Topics"));
  const search = tag ? [{ ...topicItem(tag, "Search"), label: `Articles about #${tag}`, icon: Search }] : [];
  // Known topics first (typing "reac" should land on #react), free-text search as fallback.
  return [...topics, ...search, ...pages];
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = toTag(query);
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-accent-soft text-fg">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function CommandMenu() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const items = buildItems(query, recent);

  useEffect(() => {
    function open() {
      setQuery("");
      setActive(0);
      setRecent(readRecent());
      if (!dialogRef.current?.open) dialogRef.current?.showModal();
    }
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        open();
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        open();
      }
    }
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function select(item: Item | undefined) {
    if (!item) return;
    if (item.tag) rememberTopic(item.tag);
    dialogRef.current?.close();
    router.push(item.href);
  }

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      const next = (active + step + items.length) % items.length;
      setActive(next);
      document.getElementById(`command-${items[next]?.id}`)?.scrollIntoView({ block: "nearest" });
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(items[active]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search topics and pages"
      onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100%-2rem))] overflow-hidden rounded-md border border-border-strong bg-surface p-0 text-fg shadow-overlay open:animate-fade-up"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 shrink-0 text-subtle" />
        <input
          autoFocus
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          placeholder="Search a topic, e.g. rust, kubernetes, ai"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={items[active] ? `command-${items[active].id}` : undefined}
          className="h-13 flex-1 bg-transparent text-[15px] placeholder:text-subtle focus:outline-none"
        />
        <kbd className="hidden rounded-sm bg-surface-hover px-1.5 py-0.5 font-mono text-[10.5px] text-muted sm:block">esc</kbd>
      </div>

      <ul id="command-list" role="listbox" className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
        {items.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-muted">Type letters or numbers to search a topic.</li>
        )}
        {items.map((item, i) => (
          <li key={item.id} role="presentation">
            {item.group !== items[i - 1]?.group && (
              <p className="kicker px-3 pt-3 pb-1.5 text-subtle first:pt-1">
                {item.group}
              </p>
            )}
            <div
              id={`command-${item.id}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => select(item)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors duration-75",
                i === active ? "bg-surface-hover text-fg" : "text-muted",
              )}
            >
              <item.icon className={cn("size-4 shrink-0", i === active ? "text-fg" : "text-subtle")} />
              <span className="flex-1 truncate">
                <Highlight text={item.label} query={query} />
              </span>
              {i === active && <ArrowRight className="size-3.5 text-subtle" />}
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden items-center gap-4 border-t border-border bg-surface-muted px-4 py-2 font-mono text-[10.5px] text-muted sm:flex">
        <span>
          <kbd>↑↓</kbd> to move
        </span>
        <span>
          <kbd>↵</kbd> to open
        </span>
      </div>
    </dialog>
  );
}
