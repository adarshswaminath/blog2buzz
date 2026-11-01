import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const variants = {
  /** Ink. One per view: the action that matters most. */
  primary: "bg-fg text-white hover:bg-fg-hover",
  /** Hairline outline on paper. */
  secondary: "border border-border-strong text-fg hover:border-fg hover:bg-surface",
  /** Text-only, for toolbars and secondary actions. */
  ghost: "text-muted hover:bg-surface-hover hover:text-fg",
};

const sizes = {
  sm: "h-8 gap-1.5 px-3 text-[13px]",
  md: "h-9 gap-2 px-3.5 text-sm",
  lg: "h-11 gap-2 px-5 text-[15px]",
  icon: "size-8 justify-center p-0",
};

/**
 * Shared button styles. Works on <button>, <a> and <Link>:
 *   <Link href="/" className={buttonClass("secondary")}>Home</Link>
 *   <button className={buttonClass("ghost", "icon")} aria-label="Remove">...</button>
 */
export function buttonClass(
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
  className?: ClassValue,
) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,transform] duration-150 ease-(--ease-soft)",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}
