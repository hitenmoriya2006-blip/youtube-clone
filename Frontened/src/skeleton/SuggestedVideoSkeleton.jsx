import { Skeleton } from "@/components/ui/skeleton";

const SuggestedVideoSkeleton = () => {
  return (
    <div className="flex gap-3">
      {/* Thumbnail */}
      <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full bg-surface-container-high skeleton-shimmer" />

        {/* Duration badge */}
        <Skeleton className="absolute bottom-1 right-1 h-4 w-10 rounded bg-surface-container-highest" />
      </div>

      {/* Video Info */}
      <div className="flex flex-col flex-1 gap-2 py-1">
        {/* Title */}
        <Skeleton className="h-4 w-full bg-surface-container-high skeleton-shimmer" />
        <Skeleton className="h-4 w-[80%] bg-surface-container-high skeleton-shimmer" />

        {/* Channel */}
        <Skeleton className="h-3 w-[55%] bg-surface-container-high skeleton-shimmer mt-1" />

        {/* Views + Time */}
        <Skeleton className="h-3 w-[70%] bg-surface-container-high skeleton-shimmer" />
      </div>
    </div>
  );
};

export default SuggestedVideoSkeleton;