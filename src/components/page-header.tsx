/** Top of an app page: a mono dateline or kicker, a serif title, an optional standfirst and actions. */
export function PageHeader({
  kicker,
  title,
  standfirst,
  actions,
}: {
  kicker: string;
  title: string;
  standfirst?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5 pt-10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pt-14">
      <div>
        <p className="kicker text-muted">{kicker}</p>
        <h1 className="mt-3 font-display text-5xl leading-none font-medium tracking-[-0.03em] sm:text-6xl">{title}</h1>
        {standfirst && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-pretty text-muted">{standfirst}</p>}
      </div>
      {actions}
    </header>
  );
}
