import React from 'react';

const ShortsShelf = ({ shorts }) => {
  return (
    <div className="col-span-full py-4 border-y border-white/10 my-2">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-[24px] text-[#ff0000]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
        <h2 className="font-headline-md text-[20px] font-bold text-on-surface">Shorts</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        {shorts.map((short) => (
          <div key={short.id} className="min-w-[200px] w-[200px] shrink-0 snap-start cursor-pointer group">
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-surface-container-highest">
              <img alt={short.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src={short.thumbnail} />
              <div className="absolute bottom-2 left-2 right-4 flex flex-col gap-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                <h3 className="font-headline-md text-[16px] font-bold leading-[20px] line-clamp-2 overflow-hidden">{short.title}</h3>
                <span className="text-[14px] text-[#ccc]">{short.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortsShelf;
