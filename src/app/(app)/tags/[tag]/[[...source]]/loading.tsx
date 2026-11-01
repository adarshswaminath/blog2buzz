import { FrontPageSkeleton } from "@/components/stories";

export default function Loading() {
  return (
    <div className="container">
      <div className="pt-10 pb-8 sm:pt-14">
        <div className="h-3 w-28 animate-pulse rounded-sm bg-surface-hover" />
        <div className="mt-4 h-14 w-56 animate-pulse rounded-sm bg-surface-hover" />
      </div>
      <div className="h-10 border-y border-border" />
      <div className="mt-10">
        <FrontPageSkeleton />
      </div>
    </div>
  );
}
