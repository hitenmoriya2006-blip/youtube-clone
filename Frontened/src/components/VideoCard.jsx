import React from 'react';

const VideoCard = ({ title, channel, views, time, duration, thumbnail, avatar, isLive }) => {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-highest">
        <img alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={thumbnail} />
        {isLive ? (
          <div className="absolute bottom-1 right-16 bg-red-600/90 text-white text-[12px] font-bold py-0.5 px-1.5 rounded flex items-center gap-1 leading-[1.2]">
            <span className="material-symbols-outlined text-[14px]">sensors</span>
            LIVE
          </div>
        ) : (
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[12px] font-semibold py-0.5 px-1 rounded leading-[1.2]">
            {duration}
          </div>
        )}
      </div>

      <div className="flex gap-3 pr-6">
        <img alt={channel} className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5" src={avatar} />
        <div className="flex flex-col min-w-0">
          <h3 className="font-headline-md text-[16px] font-bold leading-[22px] text-on-surface line-clamp-2 transition-colors group-hover:text-white">
            {title}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-[14px] color-on-surface-variant transition-colors group-hover:text-on-surface text-on-surface-variant">
            {channel}
            <span className="material-symbols-outlined text-[14px] text-[#aaa]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="text-[14px] text-on-surface-variant flex items-center">
            {isLive ? (
              <span className="text-[#ff0000] font-bold">12K watching</span>
            ) : (
              <>
                {views} <span className="mx-1 text-[10px]">•</span> {time}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
