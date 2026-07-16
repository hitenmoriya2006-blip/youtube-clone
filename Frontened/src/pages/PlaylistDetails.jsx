import React, { useState } from 'react';

const PlaylistDetails = () => {
  // Use these to test the loading and empty states
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // Mock Data
  const playlistInfo = {
    title: "UI/UX Design Masterclass 2024",
    description: "A comprehensive journey from the basics of wireframing to advanced prototyping using Figma and modern design principles. Perfect for beginners and intermediate designers.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    videoCount: 12,
    lastUpdated: "Updated 2 days ago",
    owner: {
      name: "Nexus Tech Lab",
      avatar: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
    }
  };

  const playlistVideos = [
    {
      id: 1,
      title: "1. Introduction to Modern UI Design principles",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800",
      duration: "14:20",
      views: "124K views",
      time: "2 months ago",
      channelName: "Nexus Tech Lab",
      description: "Learn the foundational principles of modern UI design, including layout, spacing, typography, and color theory."
    },
    {
      id: 2,
      title: "2. Mastering Auto Layout in Figma",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      duration: "22:15",
      views: "89K views",
      time: "2 months ago",
      channelName: "Nexus Tech Lab",
      description: "A deep dive into Figma's Auto Layout feature to build responsive and scalable components."
    },
    {
      id: 3,
      title: "3. Creating a Design System from Scratch",
      thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      duration: "45:10",
      views: "210K views",
      time: "1 month ago",
      channelName: "Nexus Tech Lab",
      description: "Step-by-step guide to establishing a robust design system with tokens, components, and variants."
    },
    {
      id: 4,
      title: "4. Advanced Prototyping & Micro-interactions",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      duration: "31:05",
      views: "156K views",
      time: "3 weeks ago",
      channelName: "Nexus Tech Lab",
      description: "Bring your designs to life using smart animate, interactive components, and micro-interactions."
    }
  ];

  // Skeletons
  const HeaderSkeleton = () => (
    <div className="flex flex-col md:flex-row gap-8 mb-10">
      <div className="w-full md:w-[400px] xl:w-[480px] aspect-video rounded-xl bg-surface-container-high animate-pulse flex-shrink-0"></div>
      <div className="flex flex-col gap-4 w-full pt-2">
        <div className="h-8 w-3/4 bg-surface-container-high rounded animate-pulse"></div>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-high animate-pulse"></div>
          <div className="h-4 w-32 bg-surface-container-high rounded animate-pulse"></div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-surface-container-high rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-surface-container-high rounded animate-pulse"></div>
        </div>
        <div className="flex gap-4 mt-6">
          <div className="h-10 w-32 bg-surface-container-high rounded-full animate-pulse"></div>
          <div className="h-10 w-32 bg-surface-container-high rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const VideoSkeleton = () => (
    <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl">
      <div className="w-full sm:w-[240px] md:w-[280px] aspect-video bg-surface-container-high rounded-xl animate-pulse flex-shrink-0"></div>
      <div className="flex flex-col gap-2 w-full pt-1">
        <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse"></div>
        <div className="h-4 w-1/3 bg-surface-container-high rounded animate-pulse"></div>
        <div className="h-3 w-2/3 bg-surface-container-high rounded animate-pulse mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen text-on-background font-body-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
        
        {/* Loading State */}
        {isLoading && (
          <div>
            <HeaderSkeleton />
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => <VideoSkeleton key={i} />)}
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Playlist Header (Cinematic Banner Enhanced) */}
            <div className="flex flex-col md:flex-row gap-8 mb-10 bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline/10 relative overflow-hidden">
              {/* Blurred Background effect */}
              <div 
                className="absolute inset-0 opacity-10 blur-3xl saturate-200 pointer-events-none"
                style={{ backgroundImage: `url(${playlistInfo.thumbnail})`, backgroundSize: 'cover' }}
              ></div>
              
              {/* Cover Image */}
              <div className="w-full md:w-[400px] xl:w-[480px] aspect-video rounded-xl overflow-hidden flex-shrink-0 shadow-2xl relative z-10 group">
                <img 
                  src={playlistInfo.thumbnail} 
                  alt={playlistInfo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="flex flex-col w-full z-10">
                <h1 className="text-display-lg font-display-lg font-extrabold text-on-surface tracking-tight mb-4 leading-tight">
                  {playlistInfo.title}
                </h1>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
                    <img src={playlistInfo.owner.avatar} alt={playlistInfo.owner.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-label-lg text-on-surface font-bold">{playlistInfo.owner.name}</span>
                  <span className="text-secondary text-[12px]">•</span>
                  <span className="text-secondary text-label-sm">{playlistInfo.videoCount} videos</span>
                  <span className="text-secondary text-[12px]">•</span>
                  <span className="text-secondary text-label-sm">{playlistInfo.lastUpdated}</span>
                </div>

                <p className="text-body-md text-secondary mb-8 max-w-2xl leading-relaxed">
                  {playlistInfo.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-on-surface text-background font-label-lg font-bold hover:bg-on-surface-variant transition-colors shadow-lg active:scale-95">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    Play All
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface font-label-lg hover:bg-surface-variant/50 border border-outline/20 transition-colors active:scale-95">
                    <span className="material-symbols-outlined">shuffle</span>
                    Shuffle
                  </button>
                  
                  <div className="h-8 w-[1px] bg-outline/20 mx-2 hidden sm:block"></div>
                  
                  <button className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant/50 border border-outline/20 transition-colors" title="Edit Playlist">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant/50 border border-outline/20 transition-colors" title="Share Playlist">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                  <button className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-error/20 hover:text-error hover:border-error/30 border border-outline/20 transition-colors ml-auto md:ml-0" title="Delete Playlist">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-surface-container-lowest rounded-2xl border border-outline/5 border-dashed">
                <div className="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-secondary">video_library</span>
                </div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                  This playlist is empty
                </h2>
                <p className="text-body-md text-secondary max-w-md mb-6">
                  Start adding videos to your playlist to watch them here later or share them with others.
                </p>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container font-label-lg rounded-full hover:brightness-110 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                  Add Videos
                </button>
              </div>
            ) : (
              /* Video List */
              <div className="flex flex-col gap-2">
                {playlistVideos.map((video, index) => (
                  <div 
                    key={video.id} 
                    className="group flex flex-col sm:flex-row gap-4 p-3 rounded-xl hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline/5"
                  >
                    {/* Index / Grabber */}
                    <div className="hidden md:flex items-center justify-center w-8 text-secondary font-label-lg opacity-50 group-hover:opacity-100">
                      <span className="group-hover:hidden">{index + 1}</span>
                      <span className="material-symbols-outlined hidden group-hover:block cursor-grab">drag_indicator</span>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-[240px] md:w-[280px] aspect-video bg-surface-container-low rounded-xl overflow-hidden flex-shrink-0">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/80 text-white text-[12px] font-medium rounded backdrop-blur-sm">
                        {video.duration}
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-4xl">play_arrow</span>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="flex flex-col flex-1 py-1 pr-2">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {video.title}
                        </h3>
                        <button className="p-1.5 text-secondary hover:text-on-surface hover:bg-surface-variant/40 rounded-full transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-label-sm text-secondary">
                        <span className="hover:text-on-surface transition-colors">{video.channelName}</span>
                        <span className="text-[10px]">•</span>
                        <span>{video.views}</span>
                        <span className="text-[10px]">•</span>
                        <span>{video.time}</span>
                      </div>

                      <p className="mt-2 text-body-md text-secondary line-clamp-2 hidden sm:block">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetails;
