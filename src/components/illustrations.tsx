/*
 * Blog2Buzz illustration system. Every drawing follows the same rules so they read as one set:
 *  - 64 × 64 viewBox, shown at 80px by default; coordinates sit on half pixels of the grid
 *  - ink strokes (1.5px, round caps and joins), paper fills, 2px corner radius
 *  - exactly one element in editor's red, carrying the meaning of the state
 * They are decorative (aria-hidden): the heading next to them carries the message.
 */

const ink = { strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Frame({ children, className = "size-20" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      {children}
    </svg>
  );
}

/** Empty reading list: two blank pages and an empty bookmark ribbon. */
export function EmptyListIllustration() {
  return (
    <Frame>
      <rect x="20.75" y="8.75" width="30.5" height="38.5" rx="2" {...ink} className="fill-surface-muted stroke-fg/40" />
      <rect x="12.75" y="16.75" width="32.5" height="40.5" rx="2" {...ink} className="fill-surface stroke-fg" />
      <path d="M18.75 26.75h14M18.75 32.75h20.5M18.75 38.75h17M18.75 44.75h12" {...ink} className="stroke-fg/30" />
      <path d="M36.75 16.75v13l3.5-2.75 3.5 2.75v-13" {...ink} className="fill-accent-soft stroke-accent" />
    </Frame>
  );
}

/** Nothing for a topic: a column with its headline set but no stories under it. */
export function EmptyTopicIllustration() {
  return (
    <Frame>
      <rect x="12.75" y="8.75" width="38.5" height="46.5" rx="2" {...ink} className="fill-surface stroke-fg" />
      <path d="M21.25 15.75l-1.5 9M26.25 15.75l-1.5 9M18.75 18.75h9M18.25 21.75h9" {...ink} className="stroke-accent" />
      <path d="M31.75 20.25h13" {...ink} className="stroke-fg" />
      <path d="M18.75 31.75h26.5M18.75 37.75h26.5M18.75 43.75h18" {...ink} strokeDasharray="1.5 3.5" className="stroke-fg/40" />
    </Frame>
  );
}

/** 404: a page torn across, the lower half missing. */
export function MissingPageIllustration() {
  return (
    <Frame>
      <path
        d="M14.75 10.75a2 2 0 0 1 2-2h30.5a2 2 0 0 1 2 2v25.5l-4.25 3-4.25-3-4.25 3-4.25-3-4.25 3-4.25-3-4.25 3-4.75-3Z"
        {...ink}
        className="fill-surface stroke-fg"
      />
      <path d="M20.75 17.75h22.5M20.75 23.75h16.5M20.75 29.75h19" {...ink} className="stroke-fg/30" />
      <path d="M14.75 46.25l4.75 3 4.25-3 4.25 3 4.25-3 4.25 3 4.25-3 4.25 3 4.25-3" {...ink} className="stroke-accent" />
    </Frame>
  );
}

/** Error: a page whose middle line breaks off mid-sentence. */
export function InterruptedPageIllustration() {
  return (
    <Frame>
      <rect x="12.75" y="8.75" width="38.5" height="46.5" rx="2" {...ink} className="fill-surface stroke-fg" />
      <path d="M18.75 18.75h26.5M18.75 24.75h22" {...ink} className="stroke-fg/30" />
      <path d="M18.75 31.75h9.5l2.5-3.5 3 7 2.5-3.5" {...ink} className="stroke-accent" />
      <path d="M18.75 38.75h20M18.75 44.75h14" {...ink} className="stroke-fg/30" />
    </Frame>
  );
}

/** Sign-in link sent: an envelope with a check that draws itself once. */
export function MailSentIllustration() {
  return (
    <Frame>
      <rect x="8.75" y="18.75" width="40.5" height="30.5" rx="2" {...ink} className="fill-surface stroke-fg" />
      <path d="M9.75 20.25 29 34.25l19.25-14" {...ink} className="stroke-fg" />
      <circle cx="48" cy="20" r="9" strokeWidth="2.5" className="fill-accent stroke-bg" />
      <path d="m44.25 20.25 2.6 2.6 5-5.35" pathLength={1} {...ink} strokeWidth={1.75} stroke="white" className="stroke-draw animate-draw [animation-delay:150ms]" />
    </Frame>
  );
}
