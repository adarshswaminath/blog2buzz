/** Shared layout for empty, no-results and error states. Pass one drawing from illustrations.tsx. */
export function EmptyState({
  illustration,
  title,
  description,
  children,
}: {
  illustration: React.ReactNode;
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-0 py-16 sm:flex-row sm:items-center sm:gap-8">
      <div className="shrink-0">{illustration}</div>
      <div className="mt-5 sm:mt-0">
        <h2 className="font-display text-[1.75rem] leading-tight font-medium tracking-[-0.015em]">{title}</h2>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{description}</p>
        {children && <div className="mt-6 flex flex-wrap gap-2">{children}</div>}
      </div>
    </div>
  );
}
