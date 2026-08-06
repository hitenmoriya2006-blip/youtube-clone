import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-surface-container-high",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };