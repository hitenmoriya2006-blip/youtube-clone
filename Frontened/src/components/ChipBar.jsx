import React from 'react';

const ChipBar = () => {
  const chips = [
    'All', 'Gaming', 'Music', 'Live', 'Mixes', 'Podcasts',
    'Gadgets', 'Programming', 'Thoughts', 'Recently uploaded',
    'Watched', 'New to you'
  ];

  return (
    <div className="sticky top-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-[8px] py-3 px-6 flex items-center gap-3 overflow-x-auto hide-scrollbar">
      {chips.map((chip, index) => (
        <button key={index} className={`bg-surface-container-highest text-on-surface px-3 py-1.5 rounded-lg text-[14px] font-medium font-body-md whitespace-nowrap border-none cursor-pointer transition-colors shrink-0 hover:bg-[#4a4949] ${index === 0 ? '!bg-on-surface !text-background hover:!bg-[#d4d4d4]' : ''}`}>
          {chip}
        </button>
      ))}
    </div>
  );
};

export default ChipBar;
