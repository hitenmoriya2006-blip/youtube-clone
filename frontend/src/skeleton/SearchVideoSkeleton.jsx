import { Skeleton } from "@/components/ui/skeleton";

const SearchVideoSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 animate-pulse">
      {/* Thumbnail */}
      <div className="relative w-full md:w-[360px] aspect-video flex-shrink-0">
        <Skeleton className="w-full h-full rounded-xl" />

        {/* Duration badge */}
        <Skeleton className="absolute bottom-2 right-2 h-5 w-12 rounded-md" />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 py-1">
        {/* Title */}
        <Skeleton className="h-6 w-[90%] mb-2" />
        <Skeleton className="h-6 w-[70%] mb-4" />

        {/* Views & Date */}
        <div className="flex items-center gap-2 mb-5">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-1 w-1 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Channel */}
        <div className="flex items-center gap-3 mb-5">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="h-4 w-36" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </div>
  );
};

export default SearchVideoSkeleton;