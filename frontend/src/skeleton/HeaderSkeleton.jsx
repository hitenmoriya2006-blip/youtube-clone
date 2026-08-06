import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[56px] bg-background flex items-center justify-between px-4">

      {/* Left */}
      <div className="flex items-center gap-4 shrink-0">
        <Skeleton className="w-10 h-10 rounded-full bg-surface-container-high" />

        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-md bg-surface-container-high" />
          <Skeleton className="w-24 h-6 rounded-md bg-surface-container-high" />
        </div>
      </div>

      {/* Center */}
      <div className="hidden sm:flex items-center flex-1 max-w-[720px] mx-10">
        <Skeleton className="h-10 flex-1 rounded-l-full bg-surface-container-high" />
        <Skeleton className="w-16 h-10 rounded-r-full bg-surface-container-high ml-[1px]" />
        <Skeleton className="ml-4 w-10 h-10 rounded-full bg-surface-container-high" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 shrink-0">
        <Skeleton className="w-10 h-10 rounded-full bg-surface-container-high" />
        <Skeleton className="w-10 h-10 rounded-full bg-surface-container-high" />
        <Skeleton className="w-8 h-8 rounded-full bg-surface-container-high" />
      </div>

    </header>
  );
};

export default HeaderSkeleton;