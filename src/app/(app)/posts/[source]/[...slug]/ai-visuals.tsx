import { cn } from "@/lib/utils";

/** X-style character counter. Turns red past the limit. */
export function CharacterRing({ count, max = 280 }: { count: number; max?: number }) {
  const over = count > max;
  return (
    <span className={cn("flex shrink-0 items-center gap-2 font-mono text-[11.5px] whitespace-nowrap tabular-nums", over ? "text-danger" : "text-muted")}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4 -rotate-90">
        <circle cx="10" cy="10" r="8" strokeWidth="2" className="stroke-border" />
        <circle
          cx="10"
          cy="10"
          r="8"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${Math.min(count / max, 1)} 1`}
          className={cn("transition-[stroke-dasharray] duration-500 ease-(--ease-soft)", over ? "stroke-danger" : "stroke-accent")}
        />
      </svg>
      {count} / {max}
    </span>
  );
}
