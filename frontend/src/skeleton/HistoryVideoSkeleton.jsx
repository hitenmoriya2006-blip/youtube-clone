import { Skeleton } from "@/components/ui/skeleton";

const HistoryVideoSkeleton = () => {
  return (
    <div className="flex gap-4 w-full">
      {/* Thumbnail */}
      <div className="relative w-[260px] shrink-0 aspect-video rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full bg-surface-container-high" />

        {/* Duration */}
        <Skeleton className="absolute bottom-2 right-2 h-5 w-12 rounded-md bg-surface-container-highest" />
      </div>

      {/* Right Side */}
      <div className="flex flex-col flex-1 pt-1">
        {/* Title */}
        <Skeleton className="h-7 w-[70%] rounded-md bg-surface-container-high" />

        {/* Channel + Views + Date */}
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-4 w-28 bg-surface-container-high" />
          <Skeleton className="h-4 w-16 bg-surface-container-high" />
          <Skeleton className="h-4 w-20 bg-surface-container-high" />
        </div>

        {/* Description */}
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full bg-surface-container-high" />
          <Skeleton className="h-4 w-[90%] bg-surface-container-high" />
          <Skeleton className="h-4 w-[60%] bg-surface-container-high" />
        </div>
      </div>
    </div>
  );
};

export default HistoryVideoSkeleton;