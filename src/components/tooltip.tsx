import { cn } from "@/lib/utils";

/**
 * CSS-only tooltip for icon buttons. Shows on hover and keyboard focus.
 * The child still needs its own aria-label; the tooltip is visual only.
 * Use align="end" for buttons near the right edge so the label stays on screen.
 */
export function Tooltip({
  label,
  align = "center",
  children,
}: {
  label: string;
  align?: "center" | "end";
  children: React.ReactNode;
}) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-full z-30 mb-1.5 rounded-sm bg-fg px-2 py-1 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-overlay transition-opacity duration-150",
          "group-hover/tooltip:opacity-100 group-hover/tooltip:delay-300 group-has-focus-visible/tooltip:opacity-100",
          align === "center" ? "left-1/2 -translate-x-1/2" : "right-0",
        )}
      >
        {label}
      </span>
    </span>
  );
}
