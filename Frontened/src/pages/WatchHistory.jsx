import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from "date-fns";
import HistoryVideoSkeleton from '@/skeleton/HistoryVideoSkeleton';
import { toast } from 'sonner'
import api from '@/api/axios';



const WatchHistory = () => {

  const [historyData, setHistoryData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true)

  const handleClearAll = async () => {
    try {
     await api.delete('/users/history/clear',
        {
          withCredentials: true
        }
      )
    } catch (error) {
      console.log(error);
    }
  };

  const removeVideoFromHistory = async (videoId) => {
    try {
      const response = await api.delete(`/users/history/remove/${videoId}`,
        { withCredentials: true }
      )
      
      setHistoryData((prev) =>
        prev.filter((video) => video._id !== videoId)
      );
      toast.success(response.data?.message)
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message)
    }
  }

  const isEmpty = historyData.length === 0

  useEffect(() => {
    const fetchWatchedHistory = async () => {
      try {
        setLoading(true)
        const response = await api.get('/users/history',
          {
            withCredentials: true
          }
        )
        if (response) setHistoryData(response.data.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchWatchedHistory()
  }, [])

  const formatDuration = (duration) => {
    const totalSeconds = Math.floor(duration);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const timeAgo = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
      return "";
    }

    return formatDistanceToNowStrict(new Date(date), {
      addSuffix: true,
    });
  };

  return (
    <div className="bg-background min-h-screen text-on-background font-body-md">
      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 py-8 max-w-[1400px] mx-auto">

        {/* Left: Watch History Feed */}
        <div className="flex-1 max-w-4xl space-y-8">
          <header className="mb-4">
            <h1 className="text-display-sm font-headline-lg font-extrabold text-on-surface">Watch history</h1>
          </header>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-surface-container-low rounded-2xl border border-outline/5 border-dashed">
              <div className="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-secondary">history</span>
              </div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">
                No watch history yet
              </h2>
            </div>
          ) :
            (
              loading ? <div className="flex flex-col gap-10">
                {Array.from({ length: 8 }).map((_, index) => (
                  <HistoryVideoSkeleton key={index} />
                ))}
              </div> :
                <section className="space-y-4">
                  {historyData.map((video) => (
                    <div
                      key={video._id}
                      className="group flex flex-col sm:flex-row gap-4 max-h-[151px] p-2 rounded-xl hover:bg-surface-container-low transition-all relative"
                    >
                      {/* Thumbnail */}
                      <Link to={`/watch/${video._id}`} className="relative flex-shrink-0 w-full sm:w-60 aspect-video rounded-lg overflow-hidden border border-white/5 block">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                          {formatDuration(video.duration)}
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start gap-4">
                          <Link to={`/watch/${video._id}`}>
                            <h3 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                              {video.title}
                            </h3>
                          </Link>

                          {/* Three-dot dropdown */}
                          <div className="relative flex-shrink-0">
                            <button
                              onClick={() => setOpenDropdown(openDropdown === video._id ? null : video._id)}
                              className={`p-1 hover:bg-white/10 rounded-full transition-all flex-shrink-0 ${openDropdown === video._id ? 'opacity-100 bg-white/10' : 'opacity-0 group-hover:opacity-100'}`}
                            >
                              <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                            </button>

                            {openDropdown === video._id && (
                              <div className="absolute right-0 top-full mt-1 w-52 bg-surface-container-highest rounded-lg shadow-xl border border-white/5 py-1 z-50">
                                <button
                                  onClick={() => removeVideoFromHistory(video._id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-label-lg text-error hover:bg-white/5 transition-colors text-left"
                                >
                                  <span className="material-symbols-outlined text-error text-[20px]">delete</span>
                                  Remove from history
                                </button>

                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-label-sm font-label-sm text-on-surface-variant">
                          <span>{video.owner?.fullName}</span>
                          <span className="w-1 h-1 bg-on-surface-variant rounded-full"></span>
                          <span>{video.views} views</span>
                          <span className="w-1 h-1 bg-on-surface-variant rounded-full"></span>
                          <span>{timeAgo(video.createdAt)}</span>
                        </div>
                        <p className="mt-2 text-body-md text-secondary line-clamp-2 hidden sm:block">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}

                </section>

            )
          }
        </div>

        {/* Right: History Controls Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-4 space-y-6">

            {/* Search History Input */}
            <div className="relative flex items-center group">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>

            </div>

            {/* History Actions */}
            <div className="space-y-1">
              <button
                onClick={handleClearAll}
                className="w-full flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all group hover:scale-[1.01]"
              >
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">delete</span>
                <span className="text-label-lg font-label-lg">Clear all watch history</span>
              </button>
            </div>



            {/* Privacy Focus Card */}
            <div
              className="p-6 rounded-2xl relative overflow-hidden group border border-white/5"
              style={{ background: 'rgba(33, 33, 33, 0.6)', backdropFilter: 'blur(12px)' }}
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <h4 className="text-headline-md font-headline-md text-primary mb-2">Privacy Focus</h4>
                <p className="text-body-md text-on-surface-variant">
                  PulseStream ensures your data stays your data. Learn how we use Differential Privacy.
                </p>
                <button className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-full text-label-lg font-label-lg hover:brightness-110 active:scale-95 transition-all">
                  Learn More
                </button>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
};

export default WatchHistory;




