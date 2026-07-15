import React,{useState,useEffect} from 'react';
import axios from 'axios'

const SearchResults = () => {
  const chips = ['All', 'Recent', 'Tech', 'AI', 'Tutorials', 'Gaming', 'Review'];
  
  const results = [
    {
      title: "Inside the Nexus Tech Lab: 2024 AI Evolution & Architecture Deep Dive",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      duration: "15:42",
      views: "1.2M views",
      time: "2 days ago",
      channelAvatar: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
      channelName: "Nexus Tech Lab",
      description: "Explore the cutting-edge infrastructure powering our latest AI models. From liquid-cooled server racks to neural processing units, we're building the future of computation.",
      badges: ["4K", "CC"]
    },
    {
      title: "Mastering Neural Pipelines: A Step-by-Step Developer Tutorial",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      duration: "08:20",
      views: "850K views",
      time: "5 days ago",
      channelAvatar: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
      channelName: "Nexus Tech Lab",
      description: "Learn how to optimize your data processing pipelines for maximum efficiency. We walk through the exact tech stack used in our lab for real-time inference.",
      badges: ["4K"]
    },
    {
      title: "Quantum Computing: Breaking the Efficiency Barrier in 2024",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      duration: "22:15",
      views: "2.4M views",
      time: "1 week ago",
      channelAvatar: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
      channelName: "Nexus Tech Lab",
      description: "We push the limits of what's possible with our new quantum processor prototype. This breakthrough could redefine how we approach complex cryptographic problems.",
      badges: ["4K", "CC"]
    },
    {
      title: "Nexus Studio Tour: Building the Ultimate Creator Environment",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      duration: "12:10",
      views: "450K views",
      time: "3 weeks ago",
      channelAvatar: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
      channelName: "Nexus Tech Lab",
      description: "Take a look behind the scenes at where the magic happens. We've optimized every square inch for maximum creative flow and technological integration.",
      badges: ["4K"]
    }
  ];

  return (
    <div className="bg-background min-h-screen text-on-background font-body-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-4 py-4">
        {/* Filter Chips */}
        <div className="sticky top-0 bg-background z-40 py-4 flex gap-3 overflow-x-auto no-scrollbar mb-6">
          {chips.map((chip, index) => (
            <button
              key={index}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg font-label-lg transition-colors ${
                index === 0
                  ? 'bg-on-surface text-background hover:bg-on-surface-variant'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant/40'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {results.map((result, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-4 group cursor-pointer ${idx > 0 ? 'mt-4' : ''}`}>
              <div className="relative w-full md:w-[360px] aspect-video flex-shrink-0 overflow-hidden rounded-xl bg-surface-container-low transition-transform duration-300 group-hover:scale-[1.02]">
                {idx === 2 && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-primary-container/10"></div>
                )}
                <img className="w-full h-full object-cover" src={result.thumbnail} alt={result.title} />
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-medium rounded">
                  {result.duration}
                </div>
              </div>
              
              <div className="flex flex-col py-1">
                <h2 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {result.title}
                </h2>
                <div className="mt-1 text-label-sm text-secondary flex items-center gap-1">
                  <span>{result.views}</span>
                  <span className="text-[8px]">•</span>
                  <span>{result.time}</span>
                </div>
                
                <div className="flex items-center gap-2 my-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={result.channelAvatar} alt={result.channelName} />
                  </div>
                  <span className="text-label-lg text-secondary flex items-center gap-1">
                    {result.channelName}
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </span>
                </div>
                
                <p className="text-body-md text-secondary line-clamp-2 max-w-2xl mb-2">
                  {result.description}
                </p>
                
                <div className="flex gap-2">
                  {result.badges.map((badge, bIdx) => (
                    <span key={bIdx} className="px-1 py-0.5 rounded bg-surface-container-highest text-[10px] font-bold text-secondary">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex flex-col items-center justify-center py-16 border-t border-outline/10 mt-8">
          <span className="material-symbols-outlined text-secondary text-[32px] mb-2">check_circle</span>
          <p className="text-secondary font-label-lg">You've reached the end of the results</p>
          <button className="mt-4 px-6 py-2 rounded-full border border-outline/30 text-on-surface font-label-lg hover:bg-surface-variant/20 transition-colors">
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
