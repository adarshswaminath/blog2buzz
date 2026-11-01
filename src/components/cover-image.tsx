import { cn } from "@/lib/utils";

/**
 * Article cover from the source's CDN. Posts without a cover simply show no
 * image: layouts are typographic first, so nothing needs a placeholder.
 */
export function CoverImage({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={cn("w-full rounded-sm bg-surface-hover object-cover outline -outline-offset-1 outline-fg/8", className)}
    />
  );
}
