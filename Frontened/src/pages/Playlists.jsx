import React, { useState } from 'react';

const Playlists = () => {
  // Use these to test the loading and empty states
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const mockPlaylists = [
    {
      id: 1,
      title: "UI/UX Design Masterclass",
      description: "A complete guide to designing modern web and mobile interfaces from scratch.",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      videoCount: 24,
      lastUpdated: "Updated 2 days ago"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      description: "Deep dive into performance optimization, custom hooks, and state management.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      videoCount: 12,
      lastUpdated: "Updated 1 week ago"
    },
    {
      id: 3,
      title: "Backend Architecture",
      description: "System design, database modeling, and scalable microservices infrastructure.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
      videoCount: 8,
      lastUpdated: "Updated 3 weeks ago"
    },
    {
      id: 4,
      title: "Cybersecurity Basics",
      description: "Network security, cryptography, and ethical hacking fundamentals.",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      videoCount: 15,
      lastUpdated: "Updated 1 month ago"
    }
  ];

  const PlaylistSkeleton = () => (
    <div className="flex flex-col gap-3">
      <div className="aspect-video w-full rounded-xl bg-surface-container-high animate-pulse"></div>
      <div className="flex justify-between items-start pt-1">
        <div className="flex flex-col gap-2 w-full pr-4">
          <div className="h-5 w-3/4 bg-surface-container-high rounded animate-pulse"></div>
          <div className="h-4 w-full bg-surface-container-high rounded animate-pulse"></div>
          <div className="flex gap-4 mt-1">
            <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-surface-container-high rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-surface-container-high animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen text-on-background font-body-lg">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-outline/10 pb-6">
          <div>
            <h1 className="text-display-lg font-display-lg font-extrabold text-on-surface tracking-tight mb-2">
              Your Playlists
            </h1>
            <p className="text-body-lg text-secondary">
              Organize your favorite videos, tutorials, and content into custom collections.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-container text-on-primary-container font-label-lg rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary-container/20 whitespace-nowrap">
            <span className="material-symbols-outlined">add</span>
            Create Playlist
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <PlaylistSkeleton key={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-32 h-32 mb-6 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                playlist_play
              </span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-3">
              No playlists created yet
            </h2>
            <p className="text-body-md text-secondary max-w-md mb-8">
              Save your favorite videos or organize content by topics. Playlists make it easy to find what you're looking for later.
            </p>
            <button className="flex items-center gap-2 px-8 py-3 bg-surface-container-highest text-on-surface font-label-lg rounded-full hover:bg-surface-variant transition-colors border border-outline/20">
              <span className="material-symbols-outlined">add</span>
              Create your first playlist
            </button>
          </div>
        )}

        {/* Playlists Grid */}
        {!isLoading && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
            {mockPlaylists.map((playlist) => (
              <div key={playlist.id} className="group cursor-pointer flex flex-col gap-3">
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-container-low transition-transform duration-300 group-hover:scale-[1.02]">
                  <img 
                    src={playlist.thumbnail} 
                    alt={playlist.title}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  {/* Overlay for playlist indicator */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
                    <span className="text-white font-label-lg uppercase tracking-wider">Play All</span>
                  </div>
                  {/* Video Count Badge */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-white text-[12px] font-bold">
                    <span className="material-symbols-outlined text-[14px]">playlist_play</span>
                    {playlist.videoCount}
                  </div>
                </div>

                {/* Details */}
                <div className="flex justify-between items-start pt-1">
                  <div className="flex flex-col pr-4">
                    <h3 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {playlist.title}
                    </h3>
                    <p className="text-label-sm text-secondary mt-1 line-clamp-2">
                      {playlist.description}
                    </p>
                    <span className="text-label-sm text-tertiary-container mt-2">
                      {playlist.lastUpdated}
                    </span>
                  </div>
                  
                  {/* Action Menu */}
                  <button className="p-1.5 text-secondary hover:text-on-surface hover:bg-surface-variant/40 rounded-full transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Playlists;
