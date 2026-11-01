/** A checkmark that draws itself once. Used to confirm save, copy and sign-in. */
export function AnimatedCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-draw animate-draw"
      />
    </svg>
  );
}
