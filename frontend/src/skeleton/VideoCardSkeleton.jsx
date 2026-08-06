import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const VideoCardSkeleton = () => {
    return (
      <div className="flex flex-col gap-3 p-2.5 w-full">
     
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full rounded-xl bg-surface-container-highest" />

       
        <Skeleton className="absolute bottom-2 right-2 h-5 w-10 rounded bg-surface-container-high" />
      </div>

     
      <div className="flex gap-3">
      
        <Skeleton className="w-9 h-9 rounded-full shrink-0 mt-0.5 bg-surface-container-high" />

        <div className="flex-1 space-y-2 overflow-hidden">
        
          <Skeleton className="h-4 w-[95%] rounded bg-surface-container-high" />

        
          <Skeleton className="h-4 w-[65%] rounded bg-surface-container-high" />

        
          <Skeleton className="h-3 w-[40%] rounded bg-surface-container-high" />

          <Skeleton className="h-3 w-[55%] rounded bg-surface-container-high" />
        </div>
      </div>
    </div>
    )
}

export default VideoCardSkeleton