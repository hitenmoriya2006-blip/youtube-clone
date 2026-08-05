import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDuration, timeAgo } from '../utils/formatter.js'
import { toast } from 'sonner'
import LikedVideoSkeleton from '@/skeleton/LikedVideoSkeleton';
import api from '@/api/axios';
import EmptyLikedVideos from '@/components/empty-states/EmptyLikedVideos';


const LikedVideos = () => {

  const [likedVideos, setLikedVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLikedVideo = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/like/liked-video`,
          {
            withCredentials: true
          }
        )
        if (response) setLikedVideos(response.data.data)
      } catch (error) {
        toast.error('something went wrong')
        console.log(error.response?.data);
      } finally {
        setLoading(false)
      }
    }
    fetchLikedVideo()
  }, [])

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md">
      <div className="flex flex-col lg:flex-row min-h-screen relative">

        {/* ── Left: Cinematic Hero Sidebar ── */}
        <section className="w-full lg:w-[400px] flex-shrink-0 relative overflow-hidden">
          {/* Blurred cinematic background */}
          <div className="absolute inset-0 z-0">
            <img
              src={likedVideos[0]?.thumbnail}
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
                  src={likedVideos[0]?.thumbnail}
                  alt="Playlist Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="material-symbols-outlined text-white text-[18px]">playlist_play</span>
                  <span className="text-white font-label-lg text-sm">{likedVideos.length} videos</span>
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
                <Link to={`/watch/${likedVideos[0]?._id}`}>
                  <button
                  disabled={likedVideos.length ===0}
                    className="w-full bg-white text-black py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all"
                    style={{ boxShadow: '0 0 15px rgba(255,85,64,0.3)', transition: 'all 0.3s ease' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    Play all
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Right: Video Grid Collection ── */}
        <section className="flex-grow p-6 lg:py-8 lg:pr-10">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h2 className="font-headline-lg text-on-surface font-extrabold text-2xl">Collection</h2>
          </div>

          {/* Video grid */}

          {
          loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <LikedVideoSkeleton key={index} />
            ))}
          </div>
          ) :
         likedVideos.length === 0 ? (
          <EmptyLikedVideos />
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
            {
              likedVideos.map((video) => (

                <Link key={video._id} to={`/watch/${video._id}`} className="group cursor-pointer flex flex-col gap-4">
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-container border border-white/5 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Red tint overlay on hover */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-[12px] px-2 py-0.5 rounded-lg font-bold border border-white/10">
                      {formatDuration(video.duration)}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex gap-3 px-1">
                    <div className="w-11 h-11 rounded-full bg-surface-container-high flex-shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-primary/40 transition-all shadow-lg">
                      <img src={video.owner.avatar} alt={video.channel} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="font-headline-md text-headline-md text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex flex-col">
                        <p className="text-label-lg font-medium text-on-surface-variant hover:text-on-surface transition-colors text-sm">{video.channel}</p>
                        <p className="text-label-sm text-on-surface-variant/70 text-xs">{video.views} views • {timeAgo(video.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
         )
          }


        </section>

      </div>
    </div>
  );
};

export default LikedVideos;




