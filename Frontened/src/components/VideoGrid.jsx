import React, { useState } from 'react';
import VideoCard from './VideoCard';
import VideoCardSkeleton from '@/skeleton/VideoCardSkeleton';


const VideoGrid = ({ videos, loading }) => {

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
        {Array.from({ length: 6 }).map((_, index) => (
         <VideoCardSkeleton key={index}/>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 pb-12 grid gap-x-4 gap-y-8"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))"
      }}>
      {videos.map((video) => (
        <VideoCard key={video._id} {...video} />
      ))}
    </div>
  );
};

export default VideoGrid;



