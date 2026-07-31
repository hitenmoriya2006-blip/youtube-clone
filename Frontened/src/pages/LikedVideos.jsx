import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockVideos = [
  {
    _id: '1',
    title: 'The Quantum Leap: Nexus Core v4.0 Revealed',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    duration: '12:45',
    channel: 'Nexus Tech Labs',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    views: '1.2M',
    uploadedAt: '2 days ago',
  },
  {
    _id: '2',
    title: 'Building the World\'s Fastest AI Processor',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    duration: '18:22',
    channel: 'Silicon Dreams',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    views: '845K',
    uploadedAt: '1 week ago',
  },
  {
    _id: '3',
    title: 'Data Privacy in the Age of Neural Networks',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    duration: '09:15',
    channel: 'Privacy Protocols',
    channelAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100',
    views: '210K',
    uploadedAt: '3 days ago',
  },
  {
    _id: '4',
    title: 'Web 4.0: Beyond the Blockchain',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    duration: '24:50',
    channel: 'Future Theory',
    channelAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=100',
    views: '5.2M',
    uploadedAt: '1 month ago',
  },
  {
    _id: '5',
    title: 'Auto-Pilot 2.0: Real World Stress Test',
    thumbnail: 'https://images.unsplash.com/photo-1620714223084-8fcacc2523ce?auto=format&fit=crop&q=80&w=800',
    duration: '15:30',
    channel: 'EV Revolution',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    views: '1.8M',
    uploadedAt: '5 days ago',
  },
  {
    _id: '6',
    title: 'The Perfect Tech Setup: 2024 Edition',
    thumbnail: 'https://images.unsplash.com/photo-1593640408182-31c228b82bf7?auto=format&fit=crop&q=80&w=800',
    duration: '32:10',
    channel: 'Desk Space',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    views: '900K',
    uploadedAt: '2 weeks ago',
  },
];

const coverImage = mockVideos[0].thumbnail;

const LikedVideos = () => {
  const [activeFilter, setActiveFilter] = useState('Recently added');

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md">
      <div className="flex flex-col lg:flex-row min-h-screen relative">

        {/* ── Left: Cinematic Hero Sidebar ── */}
        <section className="w-full lg:w-[400px] flex-shrink-0 relative overflow-hidden">
          {/* Blurred cinematic background */}
          <div className="absolute inset-0 z-0">
            <img
              src={coverImage}
              alt="Background Blur"
              className="w-full h-full object-cover scale-125 opacity-40"
              style={{ filter: 'blur(80px)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            {/* Glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 20% 30%, rgba(255,85,64,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(192,1,0,0.10) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Sticky content */}
          <div className="relative z-10 p-6 lg:p-8 flex flex-col gap-8 lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
            {/* Glass card */}
            <div
              className="p-6 rounded-2xl shadow-2xl overflow-hidden group border border-white/5"
              style={{ background: 'rgba(30,32,32,0.6)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            >
              {/* Cover thumbnail */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-8 shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={coverImage}
                  alt="Playlist Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-white text-[18px]">playlist_play</span>
                  <span className="text-white font-label-lg text-sm">{mockVideos.length} videos</span>
                </div>
              </div>

              {/* Title & meta */}
              <div className="flex flex-col gap-2">
                <h1 className="font-headline-lg text-on-surface font-extrabold text-3xl tracking-tight">Liked videos</h1>
                <div className="flex items-center gap-2 text-on-surface-variant text-label-lg text-sm">
                  <span className="font-bold text-on-surface">You</span>
                  <span className="w-1 h-1 bg-on-surface-variant rounded-full inline-block" />
                  <span>Updated today</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <button
                  className="w-full bg-white text-black py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all"
                  style={{ boxShadow: '0 0 15px rgba(255,85,64,0.3)', transition: 'all 0.3s ease' }}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Play all
                </button>
                <button className="w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-surface-variant/60 active:scale-[0.98] transition-all border border-white/10 backdrop-blur-sm text-on-surface"
                  style={{ background: 'rgba(51,53,53,0.4)' }}
                >
                  <span className="material-symbols-outlined">shuffle</span>
                  Shuffle
                </button>
              </div>

              {/* Extra actions */}
              <div className="mt-8 flex items-center justify-between px-2">
                <div className="flex gap-1">
                  <button className="p-3 rounded-full hover:bg-surface-variant/40 transition-colors text-on-surface" style={{ background: 'rgba(51,53,53,0.2)' }} title="Download">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <button className="p-3 rounded-full hover:bg-surface-variant/40 transition-colors text-on-surface" style={{ background: 'rgba(51,53,53,0.2)' }} title="Share">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
                <button className="p-3 rounded-full hover:bg-surface-variant/40 transition-colors text-on-surface" style={{ background: 'rgba(51,53,53,0.2)' }}>
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Right: Video Grid Collection ── */}
        <section className="flex-grow p-6 lg:py-8 lg:pr-10">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h2 className="font-headline-lg text-on-surface font-extrabold text-2xl">Collection</h2>
            <div className="flex items-center gap-1 bg-surface-container rounded-full p-1 border border-white/5">
              {['Recently added', 'Most popular'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full font-label-lg text-sm transition-all ${
                    activeFilter === filter
                      ? 'bg-surface-variant text-on-surface shadow-lg border border-white/10'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
            {mockVideos.map((video) => (
              <Link key={video._id} to={`/watch/${video._id}`} className="group cursor-pointer flex flex-col gap-4">
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-container border border-white/5 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:-translate-y-1">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Red tint overlay on hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[12px] px-2 py-0.5 rounded-lg font-bold border border-white/10">
                    {video.duration}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex gap-3 px-1">
                  <div className="w-11 h-11 rounded-full bg-surface-container-high flex-shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/40 transition-all shadow-lg">
                    <img src={video.channelAvatar} alt={video.channel} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex flex-col">
                      <p className="text-label-lg font-medium text-on-surface-variant hover:text-on-surface transition-colors text-sm">{video.channel}</p>
                      <p className="text-label-sm text-on-surface-variant/70 text-xs">{video.views} views • {video.uploadedAt}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load more indicator */}
          <div className="mt-16 flex justify-center pb-10">
            <div className="flex items-center gap-3 text-on-surface-variant font-label-lg opacity-60 text-sm">
              <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <span>Discovering more content...</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LikedVideos;
