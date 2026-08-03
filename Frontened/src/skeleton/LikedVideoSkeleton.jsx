import { Skeleton } from "@/components/ui/skeleton";

const LikedVideoSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full bg-surface-container-high" />

        <Skeleton className="absolute bottom-2 right-2 h-5 w-12 rounded-md bg-surface-container-highest" />
      </div>

      {/* Bottom */}
      <div className="flex gap-3">
        {/* Avatar */}
        <Skeleton className="h-10 w-10 rounded-full shrink-0 bg-surface-container-high" />

        <div className="flex flex-col flex-1 gap-2">
          {/* Title */}
          <Skeleton className="h-4 w-[95%] bg-surface-container-high" />
          <Skeleton className="h-4 w-[70%] bg-surface-container-high" />

          {/* Channel */}
          <Skeleton className="mt-1 h-3 w-[45%] bg-surface-container-high" />

          {/* Views */}
          <Skeleton className="h-3 w-[60%] bg-surface-container-high" />
        </div>
      </div>
    </div>
  );
};

export default LikedVideoSkeleton;