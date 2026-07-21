import React from 'react';
import VideoCard from './VideoCard';


const VideoGrid = ({ videos }) => {
  return (
    <div className="p-4 sm:p-6 pb-12 grid gap-x-4 gap-y-8"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))"
      }}>
      {videos.map((video) => (
        <VideoCard key={video._id} {...video} />
      ))}

      {/* <ShortsShelf shorts={shorts} /> */}

      {/* {videos.slice(4).map((video) => (
        <VideoCard key={video.id} {...video} />
      ))} */}
    </div>
  );
};

export default VideoGrid;



