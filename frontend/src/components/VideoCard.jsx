import React from 'react';
import { formatDuration, timeAgo } from '../utils/formatter.js'
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ _id,title, views, duration, avatar, thumbnail, isLive, owner, createdAt }) => {

  const navigate = useNavigate()

  return (
    <div onClick={() =>{navigate(`/watch/${_id}`)}}  className="flex flex-col gap-3 cursor-pointer w-full rounded-xl p-2.5 transition-colors duration-300 hover:bg-surface-container-highest">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-highest">
        <img alt={title} className="w-full h-full object-cover " src={thumbnail} />
        {isLive ? (
          <div className="absolute bottom-1 right-16 bg-red-600/90 text-white text-[12px] font-bold py-0.5 px-1.5 rounded flex items-center gap-1 leading-[1.2]">
            <span className="material-symbols-outlined text-[14px]">sensors</span>
            LIVE
          </div>
        ) : (
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[12px] font-semibold py-0.5 px-1 rounded leading-[1.2]">
            {formatDuration(duration)}
          </div>
        )}
      </div>

      <div className="flex gap-3 pr-6">
        <img alt={owner?.avatar} className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5" src={owner?.avatar} />
        <div className="flex flex-col min-w-0">
          <h3 className="font-headline-md text-[16px] font-bold leading-[22px] text-on-surface line-clamp-2 transition-colors group-hover:text-white">
            {title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-[14px] color-on-surface-variant transition-colors group-hover:text-on-surface text-on-surface-variant">
            {owner?.fullName}
            <span className="material-symbols-outlined text-[14px] text-[#aaa]" style={{ fontVariationSettings: "'FILL' 1" }}></span>
          </div>
          <div className="text-[14px] text-on-surface-variant flex items-center">
            {isLive ? (
              <span className="text-[#ff0000] font-bold">12K watching</span>
            ) : (
              <>
                {views} <span className="mx-1 text-[10px]">•</span> {timeAgo(createdAt)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
