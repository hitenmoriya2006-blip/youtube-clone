import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/api/axios';
import { formatDuration, timeAgo } from '../utils/formatter.js'


const VisibilityBadge = ({ visibility }) => {
  if (visibility === true) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-500/10 rounded-full justify-center border border-green-500/20 w-28 sm:w-32">
        <span className="material-symbols-outlined text-green-400 text-[16px] sm:text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
        <span className="text-[10px] sm:text-label-sm font-bold text-green-400/90 uppercase tracking-wider">Public</span>
      </div>
    );
  }
  if (visibility === false) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 rounded-full justify-center border border-white/10 opacity-60 w-28 sm:w-32">
        <span className="material-symbols-outlined text-on-surface-variant text-[16px] sm:text-[18px]">visibility_off</span>
        <span className="text-[10px] sm:text-label-sm font-bold uppercase tracking-wider">Private</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-yellow-500/10 rounded-full justify-center border border-yellow-500/20 w-28 sm:w-32">
      <span className="material-symbols-outlined text-yellow-400 text-[16px] sm:text-[18px]">link</span>
      <span className="text-[10px] sm:text-label-sm font-bold text-yellow-400/90 uppercase tracking-wider">Unlisted</span>
    </div>
  );
};

const RestrictionBadge = ({ restriction }) => {
  if (restriction === 'None') {
    return <span className="text-body-md text-on-surface-variant font-medium opacity-60">None</span>;
  }
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full w-fit border border-primary/20">
      <span className="material-symbols-outlined text-primary text-[16px]">copyright</span>
      <span className="text-label-sm font-bold text-primary uppercase tracking-wider">{restriction}</span>
    </div>
  );
};

const YourVideos = () => {

  const [limit, setLimit] = useState(3);
  const [channelVideos, setChannelVideos] = useState([])
  const [pagination, setPagination] = useState()

  const [page, setPage] = useState(1)


  const [statsData, setStatsData] = useState({})
  const navigate = useNavigate();

  const tabs = [
  { label: "Videos", path: "" },
  { label: "Playlists", path: "/playlist" }
];

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await api.get(`/dashboard/c/stats`,
          {
            withCredentials: true
          }
        )
        if (response) setStatsData(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchChannelData()
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get(`/dashboard/c/all-videos?page=${page}&limit=${limit}`,
          { withCredentials: true }
        )

        if (response) setChannelVideos(response.data.data.docs)
        if (response) setPagination(response.data.data)
        console.log(response.data.data);
      } catch (error) {
        console.log(error.response?.data?.status);
        console.log(error.response?.data?.message);
      }
    }

    fetchVideos()
  }, [page, limit])

  const start = (pagination?.page - 1) * pagination?.limit + 1;
  const end = Math.min(
    pagination?.page * pagination?.limit,
    pagination?.totalDocs
  );

  const deleteVideo = async (videoId) => {
    try {
      const response = await api.delete(`/videos/delete/${videoId}`,
        {
          withCredentials: true
        }
      )

      if (response) toast.success('video successfully deleted')
    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message)
    }
  }


  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface antialiased">
      <div className="max-w-[1440px] mx-auto p-4 sm:p-6 md:p-10">

        {/* ── Page Header ── */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5 tracking-tight">Channel content</h1>
            {/* Tabs */}
            <div className="flex gap-6 sm:gap-8 border-b border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => navigate(tab.path)}
                  className={`pb-3 font-label-lg transition-all relative ${location.pathname === tab.path
                      ? "text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                    }`}
                >
                  {tab.label}

                  {location.pathname === tab.path && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-sm"
                      style={{
                        background: "#ffb4a8",
                        boxShadow: "0 -2px 10px rgba(255,180,168,0.3)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Upload button */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center gap-2 bg-primary text-on-primary font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:brightness-110 transition-all active:scale-95 group text-sm sm:text-base"
              style={{ boxShadow: '0 0 0 rgba(255,180,168,0)' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(255,180,168,0.4)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 0 rgba(255,180,168,0)'}
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">upload</span>
              <span className="tracking-wide">CREATE</span>
            </button>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-white/5 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-surface-variant/40 rounded-xl transition-all text-on-surface border border-white/5 shadow-sm w-fit">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="font-label-lg">Filter</span>
          </button>
          <div className="text-on-surface-variant text-xs sm:text-body-md font-medium italic">
            Showing {channelVideos.length} videos across your timeline
          </div>
        </div>

        {/* ── Video Management Table ── */}
        <div className="bg-surface-container/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm overflow-x-auto">

          {/* Table Header (Desktop Only) */}
          <div
            className="px-8 py-5 border-b border-white/10 text-on-surface-variant font-bold text-[11px] uppercase tracking-[0.15em] hidden md:grid"
            style={{ gridTemplateColumns: 'minmax(360px, 2fr) 140px 150px 150px 100px 110px 90px' }}
          >
            <div>Video</div>
            <div>Visibility</div>
            <div>Restrictions</div>
            <div>Date</div>
            <div className="text-right">Views</div>
            <div className="text-right">Comments</div>
            <div className="text-right">Likes</div>
          </div>

          {/* Video Rows */}
          <div className="flex flex-col">
            {channelVideos.map((video, idx) => {

              return (
                <div
                  key={video._id}
                  className="group flex flex-col md:grid px-4 sm:px-6 md:px-8 py-4 md:py-5 border-b border-white/5 transition-all duration-300 hover:bg-white/[0.03]"
                  style={{ gridTemplateColumns: 'minmax(360px, 2fr) 140px 150px 150px 100px 110px 90px' }}
                >
                  {/* Video info cell */}
                  <div className="flex gap-4 sm:gap-5 items-start md:items-center min-w-0 pr-0 md:pr-6 mb-4 md:mb-0">
                    <Link to={`/watch/${video._id}`} className="relative w-24 sm:w-36 md:w-40 aspect-video rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest shadow-lg group-hover:shadow-primary/10 transition-all">
                      <img
                        src={video?.thumbnail}
                        alt={video?.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 bg-black/90 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md font-bold backdrop-blur-sm border border-white/10">
                        {formatDuration(video?.duration)}
                      </div>
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                          <span className="material-symbols-outlined text-black text-lg sm:text-xl">play_arrow</span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex flex-col min-w-0 flex-1">
                      <Link to={`/watch/${video._id}`}>
                        <span className="font-bold text-sm sm:text-base text-on-surface group-hover:text-primary transition-colors truncate block">{video?.title}</span>
                      </Link>
                      <span className="text-on-surface-variant text-xs sm:text-sm truncate mt-1 opacity-70">{video.description}</span>
                      
                      {/* Action buttons (always visible on mobile, hover reveal on desktop) */}
                      <div className="flex items-center gap-2 mt-2 md:mt-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/edit-video/${video._id}`}
                          className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full hover:bg-surface-variant transition-colors text-xs text-on-surface"
                        >
                          <span className="material-symbols-outlined text-[14px] sm:text-[16px]">edit</span>
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteVideo(video._id)}
                          className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full hover:bg-error/20 hover:text-error transition-colors text-xs text-on-surface"
                        >
                          <span className="material-symbols-outlined text-[14px] sm:text-[16px]">delete</span>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only details wrapper */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 pt-3 border-t border-white/5 md:hidden text-xs text-on-surface-variant">
                    <VisibilityBadge visibility={video?.isPublished} />
                    <RestrictionBadge restriction={video.restriction} />
                    <div className="text-xs opacity-60">
                      Uploaded {timeAgo(video?.createdAt)}
                    </div>
                    <div className="flex gap-3 ml-auto text-xs font-medium">
                      <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                        <span className="material-symbols-outlined text-[14px]">visibility</span> {video.views}
                      </span>
                      <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                        <span className="material-symbols-outlined text-[14px]">chat_bubble</span> {video.commentsCount}
                      </span>
                      <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                        <span className="material-symbols-outlined text-[14px]">thumb_up</span> {video.likesCount}
                      </span>
                    </div>
                  </div>

                  {/* Desktop columns (hidden on mobile) */}
                  {/* Visibility */}
                  <div className="hidden md:flex items-center">
                    <VisibilityBadge visibility={video?.isPublished} />
                  </div>

                  {/* Restrictions */}
                  <div className="hidden md:flex items-center">
                    <RestrictionBadge restriction={video.restriction} />
                  </div>

                  {/* Date */}
                  <div className="hidden md:flex flex-col justify-center">
                    <p className="text-on-surface font-bold text-body-md">{video.date}</p>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-0.5">{timeAgo(video?.createdAt)}</p>
                  </div>

                  {/* Views */}
                  <div className="hidden md:block text-right font-headline-md text-on-surface self-center">
                    <span>{video.views}</span>
                  </div>

                  {/* Comments */}
                  <div className="hidden md:block text-right font-headline-md text-on-surface self-center">
                    <span>{video.commentsCount}</span>
                  </div>

                  {/* Likes */}
                  <div className="hidden md:block text-right font-headline-md text-on-surface self-center">
                    <span>{video?.likesCount}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination footer */}
          <div className="px-4 sm:px-8 py-4 sm:py-5 bg-surface-container-high/30 flex justify-between sm:justify-end items-center gap-4 sm:gap-8 border-t border-white/5 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3 text-on-surface-variant font-bold text-[11px] sm:text-[12px] uppercase tracking-wider">
              Rows per page:
              <select
                value={limit}
                onChange={e => setLimit(Number(e.target.value))}
                className="bg-transparent border-none focus:ring-0 text-primary font-bold cursor-pointer"
              >
                <option className='text-black'>3</option>
                <option className='text-black'>5</option>
                <option className='text-black'>8</option>
              </select>
            </div>
            <div className="text-on-surface-variant font-bold text-[11px] sm:text-[12px] tracking-widest">{start}-{end} of {pagination?.totalDocs}</div>
            <div className="flex gap-2">
              <button
                disabled={!pagination?.hasPrevPage}
                onClick={() => setPage(pagination?.prevPage)}
                className={`p-1 hover:bg-surface-variant rounded-lg disabled:text-gray-700`} >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                disabled={!pagination?.hasNextPage}
                onClick={() => setPage(pagination?.nextPage)}
                className="p-1.5 hover:bg-surface-variant text-white rounded-lg  disabled:text-gray-700">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Performance Summary Cards ── */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pb-12">
          {/* Total Views */}
          <div
            className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex flex-col justify-between group hover:border-primary/20 transition-all duration-500 border border-white/5"
            style={{ background: 'rgba(30,32,32,0.6)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-on-surface-variant font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-1">Channel Stats</span>
                <span className="text-on-surface-variant font-label-lg">Total Views</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white group-hover:text-primary transition-colors duration-500">{statsData?.totalViews}</h2>
            </div>
          </div>

          {/* Subscribers */}
          <div
            className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex flex-col justify-between group hover:border-primary/20 transition-all duration-500 border border-white/5"
            style={{ background: 'rgba(30,32,32,0.6)', backdropFilter: 'blur(16px)' }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-on-surface-variant font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-1">Growth</span>
                <span className="text-on-surface-variant font-label-lg">Subscribers</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white group-hover:text-primary transition-colors duration-500">{statsData?.totalSubscribers}</h2>
              <p className="text-on-surface-variant text-xs sm:text-body-md mt-2 font-medium">Active community</p>
            </div>
          </div>

          {/* Revenue */}
          <div
            className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-all duration-500 border border-white/5 col-span-1 sm:col-span-2 md:col-span-1"
            style={{ background: 'rgba(30,32,32,0.6)', backdropFilter: 'blur(16px)' }}
          >
            <div className="relative z-10 flex flex-col mb-6">
              <span className="text-on-surface-variant font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-1">Monetization</span>
              <span className="text-on-surface-variant font-label-lg">Estimated Revenue</span>
            </div>
            <div className="mt-4 relative z-10">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-primary">$ --</h2>
              <p className="text-on-surface-variant text-xs sm:text-body-md mt-2 font-medium">Secured & ready for payout</p>
            </div>
            {/* Ambient glow */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/10 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000 group-hover:bg-primary/20" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default YourVideos;
