import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 py-4">
      {/* Avatar */}
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />

      {/* Comment Content */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Username + Time */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>

        {/* Comment */}
        <Skeleton className="h-4 w-48 rounded-md" />

        {/* Actions */}
        <div className="flex items-center gap-6 mt-1">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;