import Link from "next/link";
import { listSources } from "@/lib/sources";
import { cn } from "@/lib/utils";

/**
 * Filter by source: "All · DEV · Medium". Each tab is a real URL ({basePath}/{sourceId}),
 * so filtered pages are cached like any other page and can be shared.
 */
export function SourceTabs({ basePath, active }: { basePath: string; active?: string }) {
  const tabs = [{ id: undefined, name: "All sources" }, ...listSources()];

  return (
    <nav aria-label="Sources" className="flex items-center gap-5">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.name}
            href={tab.id ? `${basePath}/${tab.id}` : basePath}
            prefetch={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative py-1.5 text-sm transition-colors",
              isActive ? "font-medium text-fg" : "text-muted hover:text-fg",
            )}
          >
            {tab.name}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-0 -bottom-px h-0.5 bg-accent transition-transform duration-200 ease-(--ease-soft)",
                isActive ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
