import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PlaylistSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full rounded-xl" />

        {/* Video count badge */}
        <Skeleton className="absolute bottom-2 right-2 h-6 w-14 rounded-md" />
      </div>

      {/* Details */}
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-2 pr-4">
          {/* Playlist title */}
          <Skeleton className="h-5 w-[70%]" />

          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />

          {/* Last updated */}
          <Skeleton className="h-3 w-24 mt-1" />
        </div>

        {/* Three-dot menu */}
        <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      </div>
    </div>
  );
};

export default PlaylistSkeleton;