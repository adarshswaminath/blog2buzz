export default function Loading() {
  return (
    <div className="container max-w-[46rem] pt-10 sm:pt-14" aria-busy="true" aria-label="Loading article">
      <div className="h-3 w-40 animate-pulse rounded-sm bg-surface-hover" />
      <div className="mt-6 h-12 w-full animate-pulse rounded-sm bg-surface-hover" />
      <div className="mt-3 h-12 w-3/4 animate-pulse rounded-sm bg-surface-hover" />
      <div className="mt-6 h-6 w-full animate-pulse rounded-sm bg-surface-hover" />
      <div className="mt-8 h-14 border-y border-border" />
      <div className="mt-8 aspect-[2.1/1] animate-pulse rounded-sm bg-surface-hover" />
    </div>
  );
}
